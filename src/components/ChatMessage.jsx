import React, { useState, useMemo, useRef, useEffect } from 'react';
// Styled components are now imported from external file
import ModelIcon from './ModelIcon';
import {
  CodeBlock,
  CodeHeader,
  CodeLanguage,
  CopyButton,
  Pre,
  Message,
  Avatar,
  MessageWrapper,
  Content,
  Timestamp,
  MessageActions,
  ActionButton,
  ErrorMessage,
  ThinkingContainer,
  SpinnerIcon,
  LoadingDots,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  BulletList,
  NumberedList,
  Blockquote,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  HorizontalRule,
  MessageImage,
  FlowchartContainer,
  FlowchartButton,
  FlowchartPreview,
  FileAttachmentContainer,
  FileIcon,
  FileName,
  SourcesContainer,
  SourceButton,
  SourceFavicon,
  ThinkingDropdownContainer,
  ThinkingHeader,
  ThinkingArrow,
  ThinkingContent,
  ToolActivitySection,
  ToolActivitySectionHeader,
  ToolActivityItemHeader,
  ToolActivityItem,
  ToolActivityIcon,
  ToolActivityName,
  ToolActivityStatus,
  ToolActivityDetail,
  ToolActivityLabel,
  ToolActivityValue,
  ToolActivityError,
  ThinkingSection,
  ThinkingSectionHeader
} from './ChatMessage.styled';
import StreamingMarkdownRenderer from './StreamingMarkdownRenderer';
import { extractSourcesFromResponse } from '../utils/sourceExtractor';
import { processCodeBlocks } from '../utils/codeBlockProcessor';
import CodeBlockWithExecution from './CodeBlockWithExecution';
import useSupportedLanguages from '../hooks/useSupportedLanguages';
import ReactKatex from '@pkasila/react-katex';
import 'katex/dist/katex.min.css';

// Helper function to parse and render LaTeX
const renderLatex = (latex, displayMode, keyPrefix = 'latex') => (
  <ReactKatex key={`${keyPrefix}-${latex.length}-${displayMode}`} displayMode={displayMode}>
    {latex}
  </ReactKatex>
);

// Format markdown text including bold, italic, bullet points and code blocks
const robustFormatContent = (content, isLanguageExecutable = null, supportedLanguages = [], theme = {}) => {
  if (!content) return '';
  
  // Extract thinking content if present
  const thinkingRegex = /<think>([\s\S]*?)<\/think>/;
  const thinkingMatch = content.match(thinkingRegex);
  
  let mainContent = content;
  let thinkingContent = null;
  
  if (thinkingMatch) {
    thinkingContent = thinkingMatch[1];
    // Remove the thinking tags and their content from the main content
    mainContent = content.replace(thinkingRegex, '').trim();
  }
  
  // If we have thinking content, return an object with both processed contents
  if (thinkingContent) {
    return {
      main: processText(mainContent, true, isLanguageExecutable, supportedLanguages, theme),
      thinking: processText(thinkingContent, true, isLanguageExecutable, supportedLanguages, theme)
    };
  }
  
  // Otherwise, just process the content normally
  return processText(mainContent, true, isLanguageExecutable, supportedLanguages, theme);
};

// Convert markdown syntax to HTML using a more straightforward approach
const processText = (text, enableCodeExecution = true, isLanguageExecutable = null, supportedLanguages = [], theme = {}) => {
  // Use the new code block processor for consistency
  return processCodeBlocks(text, {
    onCodeBlock: ({ language, content: codeContent, isComplete, key, theme: blockTheme }) => {
      // Use CodeBlockWithExecution if code execution is enabled and language is executable
      if (enableCodeExecution && isLanguageExecutable && isLanguageExecutable(language)) {
        return (
          <CodeBlockWithExecution
            key={key}
            language={language}
            content={codeContent}
            theme={blockTheme || theme}
            supportedLanguages={supportedLanguages}
            onExecutionComplete={(result, error, executionTime) => {
              console.log('Code execution completed:', { result, error, executionTime });
            }}
          />
        );
      }
      
      // Fall back to regular code block for non-executable languages
      return (
        <CodeBlock key={key} theme={blockTheme || theme}>
          <CodeHeader theme={blockTheme || theme}>
            <CodeLanguage theme={blockTheme || theme}>{language}</CodeLanguage>
            <CopyButton theme={blockTheme || theme} onClick={() => navigator.clipboard.writeText(codeContent)}>
              Copy
            </CopyButton>
          </CodeHeader>
          <Pre theme={blockTheme || theme}>{codeContent}</Pre>
        </CodeBlock>
      );
    },
    onTextSegment: (textSegment) => processMarkdown(textSegment, theme),
    theme
  });
};

// Update processMarkdown to handle LaTeX
const processMarkdown = (text, theme = {}) => {
  const parts = [];
  let lastIndex = 0;
  let keyCounter = 0;

  // Regex for display math: $$\n?...$$\n? or $$...$$
  const displayRegex = /\$\$\s*([\s\S]*?)\s*\$\$/g;
  // Regex for inline math: $...$ (not starting/ending with space)
  const inlineRegex = /\$([^\s].*?[^\s])\$/g;

  // First handle display math
  let match;
  while ((match = displayRegex.exec(text)) !== null) {
    // Add text before
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${keyCounter++}`}>
          {processMarkdownText(text.substring(lastIndex, match.index), theme)}
        </span>
      );
    }
    // Add LaTeX
    parts.push(renderLatex(match[1], true, `display-${keyCounter++}`));
    lastIndex = match.index + match[0].length;
  }
  // Add remaining after display
  let remaining = text.substring(lastIndex);

  // Now handle inline in the remaining parts
  lastIndex = 0;
  while ((match = inlineRegex.exec(remaining)) !== null) {
    // Add text before
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${keyCounter++}`}>
          {processMarkdownText(remaining.substring(lastIndex, match.index), theme)}
        </span>
      );
    }
    // Add inline LaTeX
    parts.push(renderLatex(match[1], false, `inline-${keyCounter++}`));
    lastIndex = match.index + match[0].length;
  }
  // Add final remaining
  if (lastIndex < remaining.length) {
    parts.push(
      <span key={`text-${keyCounter++}`}>
        {processMarkdownText(remaining.substring(lastIndex), theme)}
      </span>
    );
  }

  return <>{parts}</>;
};

// New function for processing non-LaTeX markdown text (lines, bullets, etc.)
const processMarkdownText = (text, theme = {}) => {
  const lines = text.split('\n');
  const result = [];
  let inList = false;
  let inNumberedList = false;
  let listItems = [];
  let numberedListItems = [];
  
  // Process line by line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Headings
    if (line.startsWith('# ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading1 key={`h1-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(2), theme)}
        </Heading1>
      );
      continue;
    }
    
    if (line.startsWith('## ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading2 key={`h2-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(3), theme)}
        </Heading2>
      );
      continue;
    }
    
    if (line.startsWith('### ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading3 key={`h3-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(4), theme)}
        </Heading3>
      );
      continue;
    }
    
    if (line.startsWith('#### ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading4 key={`h4-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(5), theme)}
        </Heading4>
      );
      continue;
    }
    
    if (line.startsWith('##### ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading5 key={`h5-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(6), theme)}
        </Heading5>
      );
      continue;
    }
    
    if (line.startsWith('###### ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Heading6 key={`h6-${i}`} theme={theme}>
          {processInlineFormatting(line.substring(7), theme)}
        </Heading6>
      );
      continue;
    }
    
    // Horizontal rule
    if (line === '---' || line === '***' || line === '___') {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(<HorizontalRule key={`hr-${i}`} theme={theme} />);
      continue;
    }
    
    // Blockquote
    if (line.startsWith('> ')) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      result.push(
        <Blockquote key={`quote-${i}`} theme={theme}>
          <Paragraph theme={theme}>
            {processInlineFormatting(line.substring(2), theme)}
          </Paragraph>
        </Blockquote>
      );
      continue;
    }
    
    // Bullet point
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      inList = true;
      const itemContent = line.substring(2);
      listItems.push(
        <li key={`item-${i}`}>{processInlineFormatting(itemContent, theme)}</li>
      );
      continue;
    }
    
    // Numbered list
    const numberedMatch = line.match(/^(\d+)\.\s/);
    if (numberedMatch) {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      inNumberedList = true;
      const itemContent = line.substring(numberedMatch[0].length);
      numberedListItems.push(
        <li key={`nitem-${i}`}>{processInlineFormatting(itemContent, theme)}</li>
      );
      continue;
    }
    
    // End of lists
    if ((inList || inNumberedList) && line === '') {
      if (inList) {
        result.push(
          <BulletList key={`list-${i}`} theme={theme}>
            {listItems}
          </BulletList>
        );
        inList = false;
        listItems = [];
      }
      if (inNumberedList) {
        result.push(
          <NumberedList key={`nlist-${i}`} theme={theme}>
            {numberedListItems}
          </NumberedList>
        );
        inNumberedList = false;
        numberedListItems = [];
      }
      continue;
    }
    
    // Regular text line
    if (!inList && !inNumberedList && line !== '') {
      result.push(
        <Paragraph key={`p-${i}`} theme={theme}>
          {processInlineFormatting(line, theme)}
        </Paragraph>
      );
    } else if (!inList && !inNumberedList) {
      // Empty line
      result.push(<br key={`br-${i}`} />);
    }
  }
  
  // Add any remaining list items
  if (inList && listItems.length > 0) {
    result.push(
      <BulletList key="list-end" theme={theme}>
        {listItems}
      </BulletList>
    );
  }
  
  if (inNumberedList && numberedListItems.length > 0) {
    result.push(
      <NumberedList key="nlist-end" theme={theme}>
        {numberedListItems}
      </NumberedList>
    );
  }
  
  return <>{result}</>;
};

// Process inline formatting (bold, italic, links)
const processInlineFormatting = (text, theme = {}) => {
  const parts = [];
  let lastIndex = 0;
  let keyCounter = 0;
  
  // Handle links first
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      parts.push(<span key={`text-${keyCounter++}`}>{processBoldItalic(beforeText, theme)}</span>);
    }
    
    // Add the link
    parts.push(
      <Link key={`link-${keyCounter++}`} href={match[2]} target="_blank" rel="noopener noreferrer" theme={theme}>
        {processBoldItalic(match[1], theme)}
      </Link>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    parts.push(<span key={`text-${keyCounter++}`}>{processBoldItalic(remainingText, theme)}</span>);
  }
  
  return parts.length > 0 ? <>{parts}</> : processBoldItalic(text, theme);
};

// Process bold and italic formatting
const processBoldItalic = (text, theme = {}) => {
  // First handle bold text
  const boldPattern = /\*\*(.*?)\*\*/g;
  const parts = [];
  let lastIndex = 0;
  let keyCounter = 0;
  let match;
  
  while ((match = boldPattern.exec(text)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${keyCounter++}`}>{processItalic(text.substring(lastIndex, match.index), theme)}</span>);
    }
    
    // Add the bold text (also process any italic within it)
    parts.push(<Bold key={`bold-${keyCounter++}`} theme={theme}>{processItalic(match[1], theme)}</Bold>);
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${keyCounter++}`}>{processItalic(text.substring(lastIndex), theme)}</span>);
  }
  
  return parts.length > 0 ? <>{parts}</> : processItalic(text, theme);
};

// Process italic text
const processItalic = (text, theme = {}) => {
  if (!text) return null;
  
  const italicPattern = /\*((?!\*).+?)\*/g;
  const parts = [];
  let lastIndex = 0;
  let keyCounter = 0;
  let match;
  
  while ((match = italicPattern.exec(text)) !== null) {
    // Add text before the italic part
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${keyCounter++}`}>{text.substring(lastIndex, match.index)}</span>);
    }
    
    // Add the italic text
    parts.push(<Italic key={`italic-${keyCounter++}`} theme={theme}>{match[1]}</Italic>);
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${keyCounter++}`}>{text.substring(lastIndex)}</span>);
  }
  
  return <>{parts.length > 0 ? parts : text}</>;
};
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ThinkingDropdown = ({ thinkingContent, toolCalls }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const hasThinking = thinkingContent && thinkingContent.toString().trim();
  const hasToolActivity = toolCalls && toolCalls.length > 0;
  
  if (!hasThinking && !hasToolActivity) {
    return null;
  }
  
  const getHeaderTitle = () => {
    if (hasThinking && hasToolActivity) return 'Thoughts & Tools';
    if (hasThinking) return 'Thoughts';
    return 'Tool Activity';
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'executing': return '⚙️';
      case 'completed': return '✅';
      case 'error': return '❌';
      default: return '🔧';
    }
  };
  
  return (
    <ThinkingDropdownContainer>
      <ThinkingHeader onClick={toggleExpanded}>
        <span>{getHeaderTitle()}</span>
        <ThinkingArrow expanded={expanded}>▾</ThinkingArrow>
      </ThinkingHeader>
      <ThinkingContent expanded={expanded}>
        {hasToolActivity && (
          <ToolActivitySection>
            <ToolActivitySectionHeader>🛠️ Tool Activity</ToolActivitySectionHeader>
            {toolCalls.map((toolCall, index) => (
              <ToolActivityItem key={toolCall.tool_id || index}>
                <ToolActivityItemHeader>
                  <ToolActivityIcon>
                    {getStatusIcon(toolCall.status)}
                  </ToolActivityIcon>
                  <ToolActivityName>
                    {toolCall.tool_name || 'Unknown Tool'}
                  </ToolActivityName>
                  <ToolActivityStatus status={toolCall.status}>
                    {toolCall.status || 'pending'}
                  </ToolActivityStatus>
                </ToolActivityItemHeader>
                
                {toolCall.parameters && Object.keys(toolCall.parameters).length > 0 && (
                  <ToolActivityDetail>
                    <ToolActivityLabel>Parameters:</ToolActivityLabel>
                    <ToolActivityValue>
                      {JSON.stringify(toolCall.parameters, null, 2)}
                    </ToolActivityValue>
                  </ToolActivityDetail>
                )}
                
                {toolCall.result && toolCall.status === 'completed' && (
                  <ToolActivityDetail>
                    <ToolActivityLabel>Result:</ToolActivityLabel>
                    <ToolActivityValue>
                      {typeof toolCall.result === 'string' ? toolCall.result : JSON.stringify(toolCall.result, null, 2)}
                    </ToolActivityValue>
                  </ToolActivityDetail>
                )}
                
                {toolCall.error && toolCall.status === 'error' && (
                  <ToolActivityDetail>
                    <ToolActivityLabel>Error:</ToolActivityLabel>
                    <ToolActivityError>
                      {toolCall.error}
                    </ToolActivityError>
                  </ToolActivityDetail>
                )}
              </ToolActivityItem>
            ))}
          </ToolActivitySection>
        )}
        
        {hasThinking && (
          <ThinkingSection hasToolActivity={hasToolActivity}>
            {hasToolActivity && <ThinkingSectionHeader>💭 Reasoning</ThinkingSectionHeader>}
            {thinkingContent}
          </ThinkingSection>
        )}
      </ThinkingContent>
    </ThinkingDropdownContainer>
  );
};

const ChatMessage = ({ message, showModelIcons = true, settings = {}, theme = {} }) => {
  const { role, content, timestamp, isError, isLoading, modelId, image, file, sources, type, status, imageUrl, prompt: imagePrompt, flowchartData, id, toolCalls, availableTools } = message;
  const { supportedLanguages, isLanguageExecutable } = useSupportedLanguages();
  
  // Debug logging
  if (role === 'assistant' && sources) {
    console.log('[ChatMessage] Message has sources:', sources);
  }
  
  // Get the prompt for both image and flowchart messages
  const prompt = message.prompt;
  
  // Extract sources from content if this is an assistant message and not loading
  const { cleanedContent, sources: extractedSources } = useMemo(() => {
    if (role === 'assistant' && content && !isLoading) {
      const result = extractSourcesFromResponse(content);
      console.log('[ChatMessage] Extracted sources from content:', result);
      return result;
    }
    return { cleanedContent: content, sources: [] };
  }, [content, role, isLoading]);
  
  // Use cleaned content if available, otherwise use original content
  const contentToProcess = cleanedContent || content;
  
  const is3DScene = useMemo(() => {
    if (role !== 'assistant' || isLoading || !content) return false;
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) return false;
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      return Array.isArray(parsed) && parsed.every(obj => 
        obj.id && obj.type && obj.position && obj.rotation && obj.scale
      );
    } catch (e) {
      return false;
    }
  }, [content, role, isLoading]);
  
  const getAvatar = () => {
    if (role === 'user') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    } else if (showModelIcons && modelId) {
      const modelIconProps = {
        modelId,
        size: "small",
        $inMessage: true,
      };
      
      return <ModelIcon {...modelIconProps} />;
    } else {
      return 'AI';
    }
  };
  
  // Determine if we should use a model icon (for AI messages with a modelId)
  const useModelIcon = role === 'assistant' && showModelIcons && modelId;

  // Get message alignment from settings, but default user messages to right
  const messageAlignment = role === 'user' ? 'right' : (settings.messageAlignment || 'left');

  // Get bubble style from settings
  const bubbleStyle = settings.bubbleStyle || 'modern';

  // Apply high contrast mode if set
  const highContrast = settings.highContrast || false;

  // Check if there's a PDF file attached to the message
  const hasPdfAttachment = file && file.type === 'pdf';
  
  // Check if there's a text file attached to the message
  const hasTextAttachment = file && file.type === 'text';

  // Function to handle copying message content
  const handleCopyText = () => {
    const textToCopy = cleanedContent || content;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Could add toast notification here if desired
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // TTS state for toggle
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Function to handle text-to-speech (toggle)
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const textToRead = cleanedContent || content;
      const utterance = new window.SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
      speechSynthesisRef.current = utterance;
    } else {
      console.error('Text-to-speech not supported in this browser');
    }
  };

  // Ensure TTS state resets if user navigates away or message changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [content, cleanedContent]);

  // Determine if the message has sources to display
  const displaySources = extractedSources.length > 0 ? extractedSources : (Array.isArray(sources) ? sources : []);
  const hasSources = role === 'assistant' && displaySources.length > 0;
  
  console.log('[ChatMessage] Display sources:', {
    extractedSources,
    propsSources: sources,
    displaySources,
    hasSources,
    isLoading,
    role
  });

  // Extract domain from URL for displaying source name and favicon
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch (e) {
      console.error('Error extracting domain:', e);
      return url;
    }
  };

  // Get favicon URL for a domain
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).origin;
      return `${domain}/favicon.ico`;
    } catch (e) {
      return 'https://www.google.com/s2/favicons?domain=' + url;
    }
  };

  // Handle generated flowchart message type
  if (type === 'generated-flowchart') {
    let generatedFlowchartContent;
    if (status === 'loading') {
      generatedFlowchartContent = (
        <ThinkingContainer>
          <SpinnerIcon />
          Creating flowchart for: "{prompt || 'your request'}"...
        </ThinkingContainer>
      );
    } else if (status === 'completed' && flowchartData) {
      generatedFlowchartContent = (
        <>
          {prompt && (
            <p style={{ margin: '0 0 8px 0', opacity: 0.85, fontSize: '0.9em' }}>
              Request: "{prompt}"
            </p>
          )}
          <FlowchartContainer>
            <FlowchartButton onClick={() => window.dispatchEvent(new CustomEvent('openFlowchartModal', { detail: { flowchartData } }))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                <path d="M12 12v3"></path>
              </svg>
              Open Flowchart Builder
            </FlowchartButton>
            <FlowchartPreview>
              <p style={{ fontSize: '0.9em', opacity: 0.7 }}>
                Flowchart instructions generated. Click "Open Flowchart Builder" to visualize and edit.
              </p>
            </FlowchartPreview>
          </FlowchartContainer>
        </>
      );
    } else if (status === 'error') {
      generatedFlowchartContent = (
        <div>
          <p style={{ fontWeight: 'bold', color: '#dc3545', marginBottom: '4px' }}>
            Flowchart Generation Failed
          </p>
          {prompt && <p style={{ margin: '4px 0', opacity: 0.85 }}>Request: "{prompt}"</p>}
          {content && <p style={{ margin: '4px 0', opacity: 0.85 }}>Error: {content}</p>}
        </div>
      );
    }

    return (
      <Message $alignment={messageAlignment}>
        {role !== 'user' && <Avatar role={role} $useModelIcon={useModelIcon}>{getAvatar()}</Avatar>}
        <MessageWrapper role={role}>
          <Content role={role} $bubbleStyle={bubbleStyle}>
            {generatedFlowchartContent}
            {timestamp && settings.showTimestamps && (status === 'completed' || status === 'error') && (
              <MessageActions role={role}>
                <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
                {status === 'completed' && flowchartData && (
                  <>
                    <div style={{ flexGrow: 1 }}></div>
                    <ActionButton onClick={() => navigator.clipboard.writeText(flowchartData).then(() => console.log('Flowchart data copied'))}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy Instructions
                    </ActionButton>
                  </>
                )}
              </MessageActions>
            )}
          </Content>
        </MessageWrapper>
      </Message>
    );
  }

  // Handle deep research message type
  if (type === 'deep-research') {
    let deepResearchContent;
    if (status === 'loading') {
      deepResearchContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SpinnerIcon />
            <span>Performing deep research...</span>
          </div>
          <div style={{ fontSize: '0.9em', opacity: 0.7 }}>
            Query: "{content || 'your query'}"
          </div>
          {message.progress !== undefined && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85em', opacity: 0.8 }}>
                  {message.statusMessage || 'Initializing...'}
                </span>
                <span style={{ fontSize: '0.8em', opacity: 0.6 }}>
                  {message.progress}%
                </span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: theme.border || '#e0e0e0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${message.progress || 0}%`,
                  height: '100%',
                  backgroundColor: theme.primary || '#007bff',
                  transition: 'width 0.3s ease',
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          )}
        </div>
      );
    } else if (status === 'completed' && content) {
      deepResearchContent = (
        <>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
              Deep Research Results
            </div>
            {message.subQuestions && message.subQuestions.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.9em', fontWeight: '500', marginBottom: '6px', opacity: 0.8 }}>
                  Research Questions ({message.subQuestions.length}):
                </div>
                <ul style={{ 
                  margin: '0', 
                  paddingLeft: '20px', 
                  fontSize: '0.85em', 
                  opacity: 0.7,
                  lineHeight: '1.4'
                }}>
                  {message.subQuestions.map((question, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
            {message.agentResults && message.agentResults.length > 0 && (
              <div style={{ fontSize: '0.85em', opacity: 0.7, marginBottom: '12px' }}>
                Analyzed by {message.agentResults.length} research agents
              </div>
            )}
          </div>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {robustFormatContent(contentToProcess, isLanguageExecutable, supportedLanguages, theme)}
          </div>
        </>
      );
    } else if (status === 'error') {
      deepResearchContent = (
        <div>
          <p style={{ fontWeight: 'bold', color: '#dc3545', marginBottom: '4px' }}>
            Deep Research Failed
          </p>
          <p style={{ margin: '4px 0', opacity: 0.85 }}>Query: "{content || 'your query'}"</p>
          {message.content && <p style={{ margin: '4px 0', opacity: 0.85 }}>Error: {message.content}</p>}
        </div>
      );
    }

    return (
      <Message $alignment={messageAlignment}>
        {role !== 'user' && <Avatar role={role} $useModelIcon={useModelIcon}>{getAvatar()}</Avatar>}
        <MessageWrapper role={role}>
          <Content role={role} $bubbleStyle={bubbleStyle}>
            {deepResearchContent}
            {/* Show sources if available */}
            {hasSources && status === 'completed' && (
              <SourcesContainer>
                {displaySources.map((source, index) => (
                  <SourceButton
                    key={index}
                    onClick={() => window.open(source.url, '_blank')}
                    title={source.title}
                  >
                    <SourceFavicon 
                      src={getFaviconUrl(source.url)}
                      alt=""
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {source.title || extractDomain(source.url)}
                    </span>
                  </SourceButton>
                ))}
              </SourcesContainer>
            )}
            {timestamp && settings.showTimestamps && (status === 'completed' || status === 'error') && (
              <MessageActions role={role}>
                <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
                {status === 'completed' && content && (
                  <>
                    <div style={{ flexGrow: 1 }}></div>
                    <ActionButton onClick={() => navigator.clipboard.writeText(content).then(() => console.log('Research results copied'))}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy Results
                    </ActionButton>
                  </>
                )}
              </MessageActions>
            )}
          </Content>
          </MessageWrapper>
      </Message>
    );
  }

  // Handle generated image message type
  if (type === 'generated-image') {
    let generatedImageContent;
    if (status === 'loading') {
      generatedImageContent = (
        <ThinkingContainer>
          <SpinnerIcon />
          Generating image for: "{imagePrompt || 'your prompt'}"...
        </ThinkingContainer>
      );
    } else if (status === 'completed' && imageUrl) {
      generatedImageContent = (
        <>
          {imagePrompt && (
            <p style={{ margin: '0 0 8px 0', opacity: 0.85, fontSize: '0.9em' }}>
              Prompt: "{imagePrompt}"
            </p>
          )}
          <MessageImage src={imageUrl} alt={imagePrompt || 'Generated AI image'} style={{ maxHeight: '400px' }} />
        </>
      );
    } else if (status === 'error') {
      generatedImageContent = (
        <div>
          <p style={{ fontWeight: 'bold', color: '#dc3545', marginBottom: '4px' }}>
            Image Generation Failed
          </p>
          {imagePrompt && <p style={{ margin: '4px 0', opacity: 0.85 }}>Prompt: "{imagePrompt}"</p>}
          {content && <p style={{ margin: '4px 0', opacity: 0.85 }}>Error: {content}</p>}
        </div>
      );
    }

    return (
      <Message $alignment={messageAlignment}>
        {role !== 'user' && <Avatar role={role} $useModelIcon={useModelIcon}>{getAvatar()}</Avatar>}
        <MessageWrapper role={role}>
          <Content role={role} $bubbleStyle={bubbleStyle} className={highContrast ? 'high-contrast' : ''}>
            {generatedImageContent}
            {timestamp && settings.showTimestamps && (status === 'completed' || status === 'error') && (
              <MessageActions role={role}>
                <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
                {status === 'completed' && imageUrl && (
                  <>
                    <div style={{ flexGrow: 1 }}></div>
                    <ActionButton onClick={() => navigator.clipboard.writeText(imageUrl).then(() => console.log('Image URL copied'))}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy URL
                    </ActionButton>
                  </>
                )}
              </MessageActions>
            )}
          </Content>
          </MessageWrapper>
      </Message>
    );
  }

  return (
    <Message $alignment={messageAlignment}>
      {messageAlignment !== 'right' && <Avatar role={role} $useModelIcon={useModelIcon}>{getAvatar()}</Avatar>}
      {isError ? (
        <ErrorMessage role={role} $bubbleStyle={bubbleStyle}>
          {content}
          {timestamp && settings.showTimestamps && <Timestamp>{formatTimestamp(timestamp)}</Timestamp>}
        </ErrorMessage>
      ) : (
        <MessageWrapper role={role}>
          <Content role={role} $bubbleStyle={bubbleStyle} className={highContrast ? 'high-contrast' : ''}>
            {image && (
              <MessageImage src={image} alt="Uploaded image" />
            )}
            {hasPdfAttachment && (
              <FileAttachmentContainer>
                <FileIcon style={{ color: '#e64a3b' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M9 15h6"></path>
                    <path d="M9 11h6"></path>
                  </svg>
                </FileIcon>
                <FileName>{file.name || 'document.pdf'}</FileName>
              </FileAttachmentContainer>
            )}
            {hasTextAttachment && (
              <FileAttachmentContainer>
                <FileIcon style={{ color: '#4285F4' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </FileIcon>
                <FileName>{file.name || 'document.txt'}</FileName>
              </FileAttachmentContainer>
            )}
            {(() => {
              // If loading and no content yet, show thinking indicator
              if (isLoading && !content) {
                return (
                  <ThinkingContainer>
                    <SpinnerIcon />
                    Thinking
                  </ThinkingContainer>
                );
              }
              
              // Process content and show main content + thinking dropdown if applicable
              const processedContent = robustFormatContent(contentToProcess, isLanguageExecutable, supportedLanguages, theme);
              const isMercury = modelId?.toLowerCase().includes('mercury');
              
              if (typeof processedContent === 'object' && processedContent.main && processedContent.thinking) {
                // If content has thinking tags, show thinking dropdown first, then main content
                return (
                  <>
                    <ThinkingDropdown thinkingContent={processedContent.thinking} toolCalls={toolCalls} />
                    <StreamingMarkdownRenderer 
                      text={typeof processedContent.main === 'string' ? processedContent.main : contentToProcess}
                      isStreaming={isLoading}
                      theme={theme}
                    />
                  </>
                );
              }
              // If content has no thinking tags, but may have tool activity
              const hasToolActivity = toolCalls && toolCalls.length > 0;
              return (
                <>
                  {hasToolActivity && (
                    <ThinkingDropdown thinkingContent={null} toolCalls={toolCalls} />
                  )}
                  <StreamingMarkdownRenderer 
                    text={contentToProcess}
                    isStreaming={isLoading}
                    theme={theme}
                  />
                </>
              );
            })()}
          </Content>
          
          
          {/* Sources section */}
          {hasSources && !isLoading && (
            <SourcesContainer>
              {displaySources.map((source, index) => (
                <SourceButton key={`source-${index}`} onClick={() => window.open(source.url, '_blank')}>
                  <SourceFavicon src={getFaviconUrl(source.url)} alt="" onError={(e) => e.target.src='https://www.google.com/s2/favicons?domain=' + source.url} />
                  {source.domain || extractDomain(source.url)}
                </SourceButton>
              ))}
            </SourcesContainer>
          )}
          
          {/* Message action buttons - only show for completed AI messages (not loading) */}
          {!isLoading && contentToProcess && role === 'assistant' && (
            <MessageActions role={role}>
              {timestamp && settings.showTimestamps && <Timestamp>{formatTimestamp(timestamp)}</Timestamp>}
              <div style={{ flexGrow: 1 }}></div>
              {role === 'assistant' && (
                <ActionButton onClick={() => window.location.reload()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </ActionButton>
              )}
              <ActionButton onClick={handleCopyText}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </ActionButton>
              <ActionButton onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: 'AI Chat Message',
                    text: contentToProcess
                  });
                }
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </ActionButton>
              {role === 'assistant' && (
                <>
                  <ActionButton onClick={() => console.log('Thumbs up')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </ActionButton>
                  <ActionButton onClick={() => console.log('Thumbs down')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                    </svg>
                  </ActionButton>
                </>
              )}
              <ActionButton onClick={handleReadAloud} title={isSpeaking ? 'Stop speaking' : 'Read aloud'}>
                {isSpeaking ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                )}
              </ActionButton>
              <ActionButton onClick={() => console.log('More options')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </ActionButton>
              {is3DScene && (
                <ActionButton onClick={() => {
                  const jsonMatch = contentToProcess.match(/```json\n([\s\S]*?)\n```/);
                  if (jsonMatch) {
                    try {
                      const parsed = JSON.parse(jsonMatch[1]);
                      if (Array.isArray(parsed)) {
                        window.dispatchEvent(new CustomEvent('load3DScene', { detail: { objects: parsed } }));
                      }
                    } catch (e) {
                      console.error('Failed to parse 3D scene JSON', e);
                    }
                  }
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  Load in 3D
                </ActionButton>
              )}
            </MessageActions>
          )}
        </MessageWrapper>
      )}
    </Message>
  );
};

export default ChatMessage;