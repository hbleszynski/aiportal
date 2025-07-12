import styled, { keyframes, css } from 'styled-components';

export const ChatWindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-left: ${props => props.$sidebarCollapsed ? '0' : '300px'}; /* 280px sidebar + 20px margin */
  transition: margin-left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  background: ${props => props.theme.sidebar};
  font-size: ${props => {
    switch(props.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.1rem';
      default: return '1rem';
    }
  }};
  position: relative;
  z-index: 5; // Added z-index to be above MainGreeting
  /* Use visible overflow so dropdown menus (e.g., model selector) aren't clipped */
  overflow: visible;
  
  @media (max-width: 768px) {
    margin-left: 0; /* No margin on mobile - sidebar overlays */
  }
`;

export const ChatHeader = styled.div`
  padding: 5px 20px 15px ${props => props.$sidebarCollapsed ? '45px' : '20px'}; // Adjust left padding based on sidebar state
  display: flex;
  align-items: flex-start; // Change from center to flex-start for better alignment
  justify-content: flex-start;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 101; // Changed from 10 to 101
  position: relative;
  transition: padding-left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const ChatTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px; // Use gap instead of margin for more consistent spacing
  padding-left: ${props => props.$sidebarCollapsed ? '20px' : '0px'}; // Reset padding when sidebar is open
  transition: padding-left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const ChatTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.name === 'retro' ? '#FFFFFF' : props.theme.text};
  flex: 1;
  line-height: 1.4; // Improve line height for better visual balance
`;

export const ModelSelectorWrapper = styled.div`
  // Remove the margin-top and use the parent's gap instead
  max-width: 240px;
  z-index: 10;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
  padding-bottom: ${props => props.theme.name === 'retro' ? '140px' : '115px'}; /* Add extra padding for retro theme */
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: ${props => {
    if (props.theme.name === 'dark' || props.theme.name === 'oled') {
      return 'transparent';
    }
    return props.theme.name === 'retro' ? 'transparent' : 'rgba(255, 255, 255, 0.05)';
  }};
  
  /* Stylish scrollbar */
  &::-webkit-scrollbar {
    width: ${props => props.theme.name === 'retro' ? '16px' : '5px'};
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.name === 'retro' ? props.theme.buttonFace : 'transparent'};
    border: ${props => props.theme.name === 'retro' ? `1px solid ${props.theme.border}` : 'none'};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.name === 'retro' ? props.theme.buttonFace : props.theme.border};
    border-radius: ${props => props.theme.name === 'retro' ? '0' : '10px'};
    border: ${props => props.theme.name === 'retro' ? 
      `1px solid ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight}` : 
      'none'};
    box-shadow: ${props => props.theme.name === 'retro' ? 
      `1px 1px 0 0 ${props.theme.buttonHighlightSoft} inset, -1px -1px 0 0 ${props.theme.buttonShadowSoft} inset` : 
      'none'};
  }
`;

export const emptyStateExitAnimation = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -55%); /* Fade and move slightly up */
  }
`;

export const EmptyState = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.name === 'retro' ? '#FFFFFF' : props.theme.text}aa;
  text-align: center;
  padding: 20px;
  /* backdrop-filter: blur(5px); */ // Apply blur effect to elements behind
  /* -webkit-backdrop-filter: blur(5px); */ // Vendor prefix for backdrop-filter
  width: 100%;
  max-width: 600px;
  z-index: 8; // Lower than MainGreeting (10) but higher than ChatWindowContainer (5)
  pointer-events: none; /* Allow clicks to pass through */
  opacity: 1; /* Default opacity */

  ${({ $isExiting }) => $isExiting && css`
    animation: ${emptyStateExitAnimation} 0.5s ease-out forwards;
  `}
  
  h3 {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 1.5rem;
  }
  
  p {
    max-width: 500px;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

export const ChipDropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 3px;
  cursor: pointer;
  
  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
  
  &:hover svg {
    opacity: 1;
  }
`;