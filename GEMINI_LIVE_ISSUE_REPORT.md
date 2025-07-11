# Gemini Live Issue Report

**Date:** December 2024  
**Issue:** Gemini Live functionality not working on website  
**Priority:** High  

## Executive Summary

The Gemini Live feature is not working because the **backend API endpoints are missing**. The frontend is properly implemented and configured to connect to `https://api.sculptorai.org/api/v1/live-audio`, but this backend service does not exist or is not running.

## Current Architecture Analysis

### Frontend Implementation ✅
The frontend implementation is **complete and properly configured**:

1. **GeminiLiveService** (`src/services/geminiLiveService.js`)
   - Connects to `https://api.sculptorai.org/api/v1/live-audio`
   - Implements REST API calls for session management
   - Handles audio recording and streaming
   - Proper error handling and fallback mechanisms

2. **React Hook** (`src/hooks/useGeminiLive.js`)
   - Manages connection state and session lifecycle
   - Provides clean API for React components
   - Handles audio recording and transcription

3. **UI Components** (`src/components/LiveModeUI.jsx`)
   - Real-time transcription display
   - Status indicators and controls
   - Integration with existing chat interface

### Backend Implementation ❌
**The backend is completely missing.** The current `server.js` only serves static files and has no API endpoints.

## Detailed Issues Found

### 1. Missing Backend API Endpoints
**Status:** ❌ Critical  
**Impact:** Complete functionality failure

The frontend expects these endpoints to exist:
- `GET /api/v1/live-audio/sessions`
- `POST /api/v1/live-audio/session/start`
- `POST /api/v1/live-audio/transcribe`
- `POST /api/v1/live-audio/session/end`
- `GET /api/v1/live-audio/session/{session_id}/status`

**Current Behavior:** All API calls return the main HTML page (404 fallback)

### 2. Missing WebSocket Server
**Status:** ❌ Critical  
**Impact:** No real-time audio streaming

The frontend is configured for WebSocket connections to:
- `ws://localhost:3000/ws/live-audio` (development)
- `wss://api.sculptorai.org/ws/live-audio` (production)

**Current Behavior:** WebSocket connections fail immediately

### 3. Missing Google API Integration
**Status:** ❌ Critical  
**Impact:** No actual Gemini Live API calls

The backend needs to:
- Integrate with Google's Gemini Live API
- Handle API key management
- Process audio format conversion
- Manage session lifecycle

### 4. Port Configuration Mismatch
**Status:** ⚠️ Minor  
**Impact:** Development environment confusion

- Frontend server runs on port 3009
- Tests expect backend on port 3000
- Documentation mentions both ports

## Technical Requirements for Backend

### 1. Required Dependencies
```json
{
  "express": "^4.18.2",
  "ws": "^8.14.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "@google/generative-ai": "^0.2.0"
}
```

### 2. Environment Variables
```bash
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Required API Endpoints

#### REST Endpoints
```javascript
// Session Management
POST /api/v1/live-audio/session/start
GET /api/v1/live-audio/sessions
POST /api/v1/live-audio/session/end
GET /api/v1/live-audio/session/{session_id}/status

// Audio Processing
POST /api/v1/live-audio/transcribe
```

#### WebSocket Endpoint
```javascript
// Real-time streaming
ws://localhost:3000/ws/live-audio
```

### 4. Required Features

#### Session Management
- Create and manage 15-minute sessions
- Automatic session cleanup
- Session state persistence
- Error handling for expired sessions

#### Audio Processing
- Convert audio to 16-bit PCM, 16kHz, mono
- Support WebM, WAV, and PCM formats
- Base64 encoding/decoding
- Audio chunk processing

#### Gemini Live Integration
- Google API authentication
- Real-time audio streaming
- Transcription handling
- Response processing

## Implementation Recommendations

### 1. Create Backend Server
Create a new `backend-server.js` with:

```javascript
import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API Routes
app.use('/api/v1/live-audio', liveAudioRoutes);

// WebSocket Server
const wss = new WebSocketServer({ port: 3001 });

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
```

### 2. Implement Live Audio Controller
Create `controllers/liveAudioController.js`:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const startSession = async (req, res) => {
  try {
    const { session_id, model, response_modality } = req.body;
    
    // Initialize Gemini Live session
    const model = genAI.getGenerativeModel({ model: model || 'gemini-live-2.5-flash-preview' });
    
    // Store session data
    sessions.set(session_id, {
      model,
      response_modality,
      startTime: Date.now(),
      isActive: true
    });
    
    res.json({ success: true, session_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const transcribeAudio = async (req, res) => {
  try {
    const { session_id, audio_data, format } = req.body;
    
    // Process audio and send to Gemini Live
    const result = await processAudioChunk(session_id, audio_data, format);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 3. Implement WebSocket Handler
Create `websocket/liveAudioHandler.js`:

```javascript
import { WebSocketServer } from 'ws';

export const setupWebSocket = (wss) => {
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
        
        switch (message.type) {
          case 'start_session':
            await handleStartSession(ws, message);
            break;
          case 'audio_chunk':
            await handleAudioChunk(ws, message);
            break;
          case 'end_session':
            await handleEndSession(ws, message);
            break;
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', error: error.message }));
      }
    });
  });
};
```

### 4. Audio Processing Service
Create `services/audioProcessor.js`:

```javascript
import { spawn } from 'child_process';

export const convertAudioFormat = async (audioBuffer, fromFormat, toFormat) => {
  // Use FFmpeg for audio conversion
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-f', fromFormat,
      '-i', 'pipe:0',
      '-f', toFormat,
      '-ar', '16000',
      '-ac', '1',
      '-acodec', 'pcm_s16le',
      'pipe:1'
    ]);
    
    ffmpeg.stdin.write(audioBuffer);
    ffmpeg.stdin.end();
    
    let output = Buffer.alloc(0);
    ffmpeg.stdout.on('data', (chunk) => {
      output = Buffer.concat([output, chunk]);
    });
    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`FFmpeg failed with code ${code}`));
      }
    });
  });
};
```

## Testing Strategy

### 1. Unit Tests
```javascript
// Test session management
describe('Live Audio Session', () => {
  test('should create new session', async () => {
    const response = await request(app)
      .post('/api/v1/live-audio/session/start')
      .send({
        session_id: 'test_session',
        model: 'gemini-live-2.5-flash-preview'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.session_id).toBe('test_session');
  });
});
```

### 2. Integration Tests
```javascript
// Test WebSocket connection
test('WebSocket should handle audio streaming', (done) => {
  const ws = new WebSocket('ws://localhost:3001');
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: 'start_session',
      session_id: 'test_ws_session'
    }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    expect(data.type).toBe('session_started');
    ws.close();
    done();
  };
});
```

## Deployment Checklist

### Development Environment
- [ ] Install required dependencies
- [ ] Set up environment variables
- [ ] Configure Google API key
- [ ] Test local development server
- [ ] Verify WebSocket connections
- [ ] Test audio processing pipeline

### Production Environment
- [ ] Set up HTTPS/WSS for secure connections
- [ ] Configure CORS for production domain
- [ ] Set up proper logging and monitoring
- [ ] Implement rate limiting
- [ ] Set up session cleanup cron jobs
- [ ] Configure load balancing if needed

## Estimated Implementation Time

- **Backend API endpoints**: 2-3 days
- **WebSocket implementation**: 1-2 days
- **Audio processing**: 1-2 days
- **Testing and debugging**: 1-2 days
- **Total estimated time**: 5-9 days

## Next Steps

1. **Immediate Action Required**: Create the backend server with basic API endpoints
2. **Priority 1**: Implement session management and basic audio processing
3. **Priority 2**: Add WebSocket support for real-time streaming
4. **Priority 3**: Integrate with Google Gemini Live API
5. **Priority 4**: Add comprehensive error handling and testing

## Contact Information

For questions about this report or implementation details, please refer to:
- Frontend code: `src/services/geminiLiveService.js`
- Documentation: `documentation/docs/GEMINI_LIVE_API_README.md`
- Test files: `test-integration.js`

---

**Report Generated:** December 2024  
**Status:** Ready for backend implementation  
**Priority:** High - Blocking feature functionality