import styled, { keyframes } from 'styled-components';

// Keyframes
export const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const pulseAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

// Code Block Styles
export const CodeBlock = styled.div`
  background: ${props => props.theme.name === 'light' ? 'rgba(246, 248, 250, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 12px;
  margin: 12px 0;
  overflow: hidden;
  border: 1px solid ${props => props.theme.border};
  max-width: 100%;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: ${props => props.theme.name === 'light' ? 'rgba(240, 240, 240, 0.8)' : 'rgba(45, 45, 45, 0.8)'};
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const CodeLanguage = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary.split(',')[0].replace('linear-gradient(145deg', '').trim()};
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Pre = styled.pre`
  margin: 0;
  padding: 14px;
  overflow-x: auto;
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 100%;
  word-wrap: normal;
  white-space: pre;
  text-overflow: ellipsis;
  
  /* Stylish scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 3px;
  }
`;

// Message Layout Styles
export const Message = styled.div`
  display: flex;
  flex-direction: ${props => props.$alignment === 'right' ? 'column' : 'row'};
  margin-bottom: ${props => {
    // Apply message spacing settings
    const spacing = props.theme.messageSpacing || 'comfortable';
    switch (spacing) {
      case 'compact': return '16px';
      case 'spacious': return '32px';
      default: return '24px'; // comfortable
    }
  }};
  align-items: ${props => props.$alignment === 'right' ? 'flex-end' : 'flex-start'};
  max-width: 100%;
  width: 100%;
  justify-content: ${props => props.$alignment === 'right' ? 'flex-end' : 'flex-start'};
  padding: 0;
  padding-right: ${props => props.$alignment === 'right' ? '20px' : '0'};
`;

export const Avatar = styled.div`
  width: ${props => props.role === 'user' ? '24px' : '36px'};
  height: ${props => props.role === 'user' ? '24px' : '36px'};
  border-radius: ${props => props.$useModelIcon ? '0' : '50%'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.role === 'user' ? '0' : '14px'};
  margin-left: ${props => props.role === 'user' ? '0' : '20px'};
  margin-top: ${props => props.role === 'user' ? '8px' : '0'};
  font-weight: 600;
  flex-shrink: 0;
  background: ${props => props.$useModelIcon 
    ? 'transparent' 
    : (props.role === 'user' 
        ? props.theme.buttonGradient 
        : props.theme.secondary)};
  color: ${props => props.role === 'user' ? props.theme.text : 'white'};
  transition: all 0.2s ease;
  box-shadow: ${props => props.role === 'user' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  order: ${props => props.role === 'user' ? '2' : '1'};
  opacity: ${props => props.role === 'user' ? '0.6' : '1'};
  
  &:hover {
    transform: ${props => props.role === 'user' ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.role === 'user' ? 'none' : '0 3px 10px rgba(0, 0, 0, 0.15)'};
    opacity: ${props => props.role === 'user' ? '0.8' : '1'};
  }
  
  svg {
    width: ${props => props.role === 'user' ? '16px' : '20px'};
    height: ${props => props.role === 'user' ? '16px' : '20px'};
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.role === 'user' ? '70%' : 'calc(100% - 60px)'};
  flex: ${props => props.role === 'user' ? '0 1 auto' : '1'};
  order: ${props => props.role === 'user' ? '1' : '2'};
  align-items: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  
  @media (max-width: 768px) {
    max-width: ${props => props.role === 'user' ? '85%' : 'calc(100% - 60px)'};
  }
`;

export const Content = styled.div`
  padding: ${props => props.role === 'user' ? '15px 18px' : '0'};
  padding-right: ${props => props.role === 'user' ? '18px' : '40px'};
  border-radius: ${props => props.role === 'user' ? '20px 20px 4px 20px' : '0'};
  width: fit-content;
  white-space: pre-wrap;
  background: ${props => {
    // User messages have background, AI messages are transparent
    if (props.role === 'user') {
      // For dark/oled themes, use darker backgrounds
      if (props.theme.name === 'dark' || props.theme.name === 'oled') {
        return 'rgba(40, 40, 45, 0.95)';
      }
      return props.theme.messageUser;
    } else {
      // AI messages have no background
      return 'transparent';
    }
  }};
  color: ${props => props.theme.text};
  box-shadow: ${props => {
    // Only user messages have shadow
    if (props.role === 'user') {
      return `0 2px 10px ${props.theme.shadow}`;
    }
    return 'none';
  }};
  line-height: var(--line-height, 1.6);
  overflow: hidden;
  flex: 1;
  backdrop-filter: ${props => props.role === 'user' ? 'blur(5px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.role === 'user' ? 'blur(5px)' : 'none'};
  border: ${props => props.role === 'user' ? `1px solid ${props.theme.border}` : 'none'};
  margin-left: ${props => props.role === 'user' ? 'auto' : '0'};
  margin-right: ${props => props.role === 'user' ? '0' : '0'};
  position: relative;
  
  /* Bubble pointer for user messages */
  ${props => props.role === 'user' && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid ${props.theme.name === 'dark' || props.theme.name === 'oled' 
        ? 'rgba(40, 40, 45, 0.95)' 
        : props.theme.messageUser};
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  `}
  
  /* Special border for bisexual theme */
  ${props => props.theme.name === 'bisexual' && props.role === 'user' && `
    border: none;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(145deg, #D60270, #9B4F96);
      border-radius: 19px;
      z-index: -1;
      opacity: 0.3;
    }
    
    &::after {
      border-left-color: #D60270;
    }
  `}
  
  /* Force code blocks to stay within container width */
  & > ${CodeBlock} {
    max-width: 100%;
  }
  
  /* Style for AI model signatures */
  & > em:last-child {
    display: block;
    margin-top: 12px;
    opacity: 0.7;
    font-size: 0.85em;
    text-align: right;
    font-style: normal;
    color: ${props => props.theme.text}aa;
    ${props => props.theme.name === 'bisexual' && `
      background: ${props.theme.accentGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.9;
    `}
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: ${props => props.role === 'user' ? '12px 14px' : '0'};
    padding-right: ${props => props.role === 'user' ? '14px' : '20px'};
    margin-right: ${props => props.role === 'user' ? '0' : '0'};
  }
`;

export const Timestamp = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.text}80;
  display: flex;
  align-items: center;
`;

export const MessageActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 0;
  opacity: 1;
  width: fit-content;
  max-width: 100%;
  align-self: flex-start;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: ${props => props.theme.text}60;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.theme.text}10;
    color: ${props => props.theme.text}90;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ErrorMessage = styled(Content)`
  background: rgba(255, 240, 240, 0.8);
  border: 1px solid rgba(255, 200, 200, 0.4);
`;

// Thinking and Loading Styles
export const ThinkingContainer = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.7;
  font-style: italic;
`;

export const SpinnerIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.theme.text}40;
  border-top: 2px solid ${props => props.theme.text};
  border-radius: 50%;
  margin-right: 8px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingDots = styled.span`
  display: inline-block;
  animation: ${pulse} 1.5s infinite;
`;

// Markdown Formatting Styles
export const Bold = styled.span`
  font-weight: 700;
  color: ${props => props.theme.text};
`;

export const Italic = styled.span`
  font-style: italic;
  color: ${props => props.theme.text};
`;

export const Heading1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 1.5rem 0 1rem 0;
  color: ${props => props.theme.text};
  border-bottom: 2px solid ${props => props.theme.border};
  padding-bottom: 0.5rem;
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Heading2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.3rem 0 0.8rem 0;
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.border};
  padding-bottom: 0.4rem;
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Heading3 = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.1rem 0 0.6rem 0;
  color: ${props => props.theme.text};
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Heading4 = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  color: ${props => props.theme.text};
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Heading5 = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.9rem 0 0.4rem 0;
  color: ${props => props.theme.text};
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Heading6 = styled.h6`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0.8rem 0 0.3rem 0;
  color: ${props => props.theme.text};
  line-height: 1.3;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const Paragraph = styled.p`
  margin: 0.8rem 0;
  line-height: 1.6;
  color: ${props => props.theme.text};
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const BulletList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0.8rem 0;
  
  li {
    position: relative;
    padding-left: 1.5em;
    margin: 0.5em 0;
    line-height: 1.6;
    color: ${props => props.theme.text};
    
    &:before {
      content: "•";
      position: absolute;
      left: 0.3em;
      color: ${props => props.theme.primary};
      font-weight: bold;
      font-size: 1.2em;
    }
  }
`;

export const NumberedList = styled.ol`
  padding-left: 1.5em;
  margin: 0.8rem 0;
  
  li {
    margin: 0.5em 0;
    line-height: 1.6;
    color: ${props => props.theme.text};
  }
`;

export const Blockquote = styled.blockquote`
  border-left: 4px solid ${props => props.theme.primary};
  margin: 1rem 0;
  padding: 0.8rem 0 0.8rem 1.2rem;
  background: ${props => props.theme.name === 'light' ? 'rgba(0, 122, 255, 0.05)' : 'rgba(10, 132, 255, 0.1)'};
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: ${props => props.theme.text};
  
  p {
    margin: 0;
    line-height: 1.6;
  }
`;

export const Link = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 0.2s ease;
  
  &:hover {
    border-bottom-color: ${props => props.theme.primary};
  }
`;

// Table Styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

export const TableHeader = styled.th`
  background: ${props => props.theme.name === 'light' ? 'rgba(240, 240, 240, 0.8)' : 'rgba(45, 45, 45, 0.8)'};
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
  
  &:hover {
    background: ${props => props.theme.name === 'light' ? 'rgba(0, 122, 255, 0.05)' : 'rgba(10, 132, 255, 0.1)'};
  }
`;

export const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background: ${props => props.theme.border};
  margin: 2rem 0;
  border-radius: 1px;
`;

// Media and Attachment Styles
export const MessageImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  margin-bottom: 12px;
  object-fit: contain;
  background: ${props => props.theme.name === 'light' ? 'rgba(246, 248, 250, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
`;

export const FlowchartContainer = styled.div`
  margin: 12px 0;
  padding: 16px;
  background: ${props => props.theme.name === 'light' ? 'rgba(246, 248, 250, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
`;

export const FlowchartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  svg {
    flex-shrink: 0;
  }
`;

export const FlowchartPreview = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(45, 45, 45, 0.5)'};
  border-radius: 6px;
  border: 1px dashed ${props => props.theme.border};
`;

export const FileAttachmentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${props => props.theme.name === 'light' ? 'rgba(246, 248, 250, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
  border: 1px solid ${props => props.theme.border};
  max-width: fit-content;
`;

export const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #e64a3b; /* PDF red color */
`;

export const FileName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  word-break: break-word;
`;

// Sources Display Styles
export const SourcesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const SourceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.name === 'light' ? 'rgba(246, 248, 250, 0.8)' : 'rgba(30, 30, 30, 0.8)'};
  color: ${props => props.theme.text};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.name === 'light' ? 'rgba(240, 240, 240, 0.9)' : 'rgba(45, 45, 45, 0.9)'};
    border-color: ${props => props.theme.primary.split(',')[0].replace('linear-gradient(145deg', '').trim()};
  }
`;

export const SourceFavicon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 2px;
`;

// Thinking Dropdown Styles
export const ThinkingDropdownContainer = styled.div`
  margin: 10px 0;
  border-radius: 12px;
  overflow: hidden;
  border: none;
`;

export const ThinkingHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  color: ${props => props.theme.text}aa;
  justify-content: flex-start;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

export const ThinkingArrow = styled.span`
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: 12px;
  display: inline-block;
  width: 16px;
  text-align: center;
`;

export const ThinkingContent = styled.div`
  padding: ${props => props.expanded ? '10px 0 10px 16px' : '0'};
  max-height: ${props => props.expanded ? '1000px' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
  border-top: none;
  margin-bottom: ${props => props.expanded ? '15px' : '0'};
  margin-left: 10px;
  border-left: ${props => props.expanded ? `2px solid ${props.theme.text}30` : 'none'};
`;

// Tool Activity Styles
export const ToolActivitySection = styled.div`
  margin-bottom: 15px;
`;

export const ToolActivitySectionHeader = styled.div`
  font-size: 0.9em;
  font-weight: 600;
  color: ${props => props.theme.text}dd;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ToolActivityItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

export const ToolActivityItem = styled.div`
  background: ${props => props.theme.name === 'light' ? 'rgba(248, 249, 250, 0.8)' : 'rgba(32, 33, 36, 0.8)'};
  border: 1px solid ${props => props.theme.border || '#e1e5e9'};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ToolActivityIcon = styled.span`
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const ToolActivityName = styled.span`
  font-weight: 500;
  color: ${props => props.theme.text};
  flex: 1;
`;

export const ToolActivityStatus = styled.span`
  font-size: 0.75em;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: rgba(251, 191, 36, 0.2);
          color: #f59e0b;
          border: 1px solid rgba(251, 191, 36, 0.3);
        `;
      case 'executing':
        return `
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
          animation: ${pulseAnimation} 2s infinite;
        `;
      case 'completed':
        return `
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        `;
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.3);
        `;
    }
  }}
`;

export const ToolActivityDetail = styled.div`
  margin-top: 8px;
`;

export const ToolActivityLabel = styled.div`
  font-size: 0.8em;
  font-weight: 500;
  color: ${props => props.theme.text}aa;
  margin-bottom: 4px;
`;

export const ToolActivityValue = styled.div`
  font-size: 0.8em;
  background: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(20, 21, 24, 0.7)'};
  border: 1px solid ${props => props.theme.border}50;
  border-radius: 4px;
  padding: 6px 8px;
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 80px;
  overflow-y: auto;
  color: ${props => props.theme.text}dd;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 2px;
  }
`;

export const ToolActivityError = styled.div`
  font-size: 0.8em;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 4px;
  padding: 6px 8px;
  color: #ef4444;
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ThinkingSection = styled.div`
  ${props => props.hasToolActivity ? 'border-top: 1px solid ' + (props.theme.border || '#e1e5e9') + '30; padding-top: 15px; margin-top: 5px;' : ''}
`;

export const ThinkingSectionHeader = styled.div`
  font-size: 0.9em;
  font-weight: 600;
  color: ${props => props.theme.text}dd;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;