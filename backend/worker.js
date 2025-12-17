/**
 * Cloudflare Worker Entry Point
 *
 * This file serves as the entry point for the Cloudflare Worker.
 * All application logic is organized in the src/ directory.
 *
 * File Structure:
 * - src/index.js         - Main app with route mounting
 * - src/state.js         - In-memory state management
 * - src/middleware/      - Middleware (CORS, etc.)
 * - src/routes/          - Route handlers
 *   - health.js          - Health check & models
 *   - auth.js            - User authentication
 *   - admin.js           - Admin APIs
 *   - rss.js             - RSS feed routes
 *   - chat.js            - Chat completions
 *   - image.js           - Image generation
 *   - video.js           - Video generation
 *   - static.js          - Static assets & SPA
 * - src/services/        - Business logic services
 *   - gemini.js          - Gemini API handling
 *   - geminiLive.js      - Gemini Live WebSocket proxy
 *   - rss.js             - RSS feed parsing
 * - src/utils/           - Utility functions
 *   - helpers.js         - Common helpers
 *   - auth.js            - Auth utilities
 *
 * - Proxies WebSocket traffic for Gemini Live (/api/v1/live)
 * - Serves the Hono app for REST APIs and static assets
 */

import app from './src/index.js';

const GEMINI_LIVE_WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent';
const MAX_CLIENT_MESSAGE_BYTES = 1024 * 1024; // 1MB per client message
const MAX_MESSAGE_QUEUE = 64; // Prevent unbounded buffering while reconnecting
const MAX_RECONNECT_ATTEMPTS = 2;

function jsonResponse(body, status = 200, origin = '*') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin
    }
  });
}

function isOriginAllowed(request, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;

  const allowList = (env.LIVE_WS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (allowList.length === 0) {
    const url = new URL(request.url);
    return origin === `${url.protocol}//${url.host}`;
  }

  return allowList.includes(origin);
}

function authorizeLive(request, env) {
  const sharedSecret = env.LIVE_WS_SHARED_SECRET;
  if (!sharedSecret) return { ok: true };

  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (token === sharedSecret) return { ok: true };

  return { ok: false, status: 401, message: 'Unauthorized live access' };
}

/**
 * Handle WebSocket upgrade for Gemini Live
 * Uses fetch() with Upgrade header for Cloudflare Workers compatibility
 */
async function handleGeminiLiveWebSocket(request, env) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'Gemini API key not configured' }, 500);
  }

  if (!isOriginAllowed(request, env)) {
    return jsonResponse({ error: 'Forbidden origin' }, 403);
  }

  const auth = authorizeLive(request, env);
  if (!auth.ok) {
    return jsonResponse({ error: auth.message }, auth.status);
  }

  // Create WebSocket pair for client connection
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  // Accept the server side of the WebSocket
  server.accept();

  // Connect to Gemini using fetch with WebSocket upgrade
  const geminiUrl = `${GEMINI_LIVE_WS_URL}?key=${apiKey}`;

  let geminiWs = null;
  let messageQueue = [];
  let reconnectAttempts = 0;
  let closed = false;

  const forwardToClient = (payload) => {
    if (server.readyState === WebSocket.OPEN) {
      server.send(JSON.stringify(payload));
    }
  };

  const closeBoth = (code, reason) => {
    if (closed) return;
    closed = true;

    try {
      if (server.readyState === WebSocket.OPEN) {
        server.close(code, reason);
      }
    } catch (err) {
      console.error('[GeminiLive] Error closing client socket:', err);
    }

    try {
      if (geminiWs && geminiWs.readyState === WebSocket.OPEN) {
        geminiWs.close(code, reason);
      }
    } catch (err) {
      console.error('[GeminiLive] Error closing upstream socket:', err);
    }
  };

  // Function to connect to Gemini
  const connectToGemini = async () => {
    try {
      console.log('[GeminiLive] Connecting to Gemini API...');
      const geminiResponse = await fetch(geminiUrl, {
        headers: { 'Upgrade': 'websocket' }
      });

      if (geminiResponse.status !== 101 || !geminiResponse.webSocket) {
        throw new Error(`Failed to upgrade: ${geminiResponse.status} ${geminiResponse.statusText}`);
      }

      geminiWs = geminiResponse.webSocket;
      geminiWs.accept();
      console.log('[GeminiLive] Connected to Gemini API');
      reconnectAttempts = 0;

      // Send any queued messages
      while (messageQueue.length > 0 && geminiWs.readyState === WebSocket.OPEN) {
        geminiWs.send(messageQueue.shift());
      }

      // Forward messages from Gemini to client
      geminiWs.addEventListener('message', (event) => {
        if (server.readyState === WebSocket.OPEN) {
          server.send(event.data);
        }
      });

      geminiWs.addEventListener('close', (event) => {
        console.warn('[GeminiLive] Gemini closed:', event.code, event.reason);

        if (closed) return;

        if (server.readyState === WebSocket.OPEN && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts += 1;
          forwardToClient({
            reconnecting: true,
            attempt: reconnectAttempts,
            reason: event.reason || 'Upstream closed'
          });
          connectToGemini().catch((err) => {
            forwardToClient({ error: { message: err.message || 'Failed to reconnect to Gemini' } });
            closeBoth(1011, 'Upstream unavailable');
          });
          return;
        }

        forwardToClient({
          connectionClosed: {
            code: event.code,
            reason: event.reason || 'Gemini connection closed'
          }
        });
        closeBoth(1011, 'Upstream closed');
      });

      geminiWs.addEventListener('error', (error) => {
        console.error('[GeminiLive] Gemini error:', error);
        forwardToClient({ error: { message: 'Gemini WebSocket error' } });
      });

    } catch (error) {
      console.error('[GeminiLive] Connection error:', error);
      forwardToClient({ error: { message: `Failed to connect to Gemini: ${error.message}` } });
      closeBoth(1011, 'Upstream connect error');
    }
  };

  // Connect to Gemini immediately
  await connectToGemini();

  // Handle messages from client
  server.addEventListener('message', (event) => {
    if (closed) return;

    const size = typeof event.data === 'string'
      ? event.data.length
      : (event.data instanceof ArrayBuffer ? event.data.byteLength : (event.data?.byteLength || 0));
    if (size > MAX_CLIENT_MESSAGE_BYTES) {
      forwardToClient({ error: { message: 'Payload too large' } });
      closeBoth(1009, 'Payload too large');
      return;
    }

    if (geminiWs && geminiWs.readyState === WebSocket.OPEN) {
      geminiWs.send(event.data);
    } else {
      if (messageQueue.length >= MAX_MESSAGE_QUEUE) {
        forwardToClient({ error: { message: 'Upstream unavailable' } });
        closeBoth(1013, 'Message queue overflow');
        return;
      }
      messageQueue.push(event.data);
    }
  });

  // Handle client disconnect
  server.addEventListener('close', (event) => {
    if (closed) return;
    closeBoth(event.code || 1000, event.reason || 'Client disconnected');
  });

  server.addEventListener('error', (error) => {
    console.error('[GeminiLive] Client error:', error);
    closeBoth(1011, 'Client error');
  });

  // Return WebSocket upgrade response to client
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle WebSocket upgrade for Gemini Live
    if (url.pathname === '/api/v1/live') {
      const upgradeHeader = request.headers.get('Upgrade');
      if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
        return handleGeminiLiveWebSocket(request, env);
      }

      // Non-WebSocket request - return status
      return jsonResponse({
        available: !!env.GEMINI_API_KEY,
        endpoint: '/api/v1/live',
        hint: 'Connect via WebSocket to use Gemini Live'
      });
    }

    // Provide Gemini Live config for local development (no API key leakage)
    if (url.pathname === '/api/v1/live/config') {
      const originAllowed = isOriginAllowed(request, env);
      if (!originAllowed) {
        return jsonResponse({ error: 'Forbidden origin' }, 403);
      }

      const auth = authorizeLive(request, env);
      if (!auth.ok) {
        return jsonResponse({ error: auth.message }, auth.status);
      }

      const requestOrigin = request.headers.get('Origin') || url.origin;

      // Restrict config exposure unless explicitly enabled or running locally
      const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
      const allowConfig = env.ALLOW_LIVE_CONFIG === 'true' || isLocal;

      if (!allowConfig) {
        return jsonResponse({ error: 'Live config endpoint disabled' }, 403);
      }

      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': requestOrigin,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      }

      return jsonResponse({
        proxyEndpoint: '/api/v1/live',
        model: 'models/gemini-2.5-flash-preview-native-audio',
        note: 'Connect to proxy endpoint; API key remains server-side.'
      }, 200, requestOrigin);
    }

    // Pass all other requests to Hono app
    return app.fetch(request, env, ctx);
  }
};
