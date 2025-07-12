import styled from 'styled-components';

export const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 102;
`;

export const SettingsContainer = styled.div`
  background-color: ${props => 
    props.theme.name === 'dark' || props.theme.name === 'oled' ? 
    '#222' : 
    props.theme.sidebar || props.theme.background || '#f5f5f7'};
  color: ${props => props.theme.text};
  border-radius: 16px;
  width: 900px;
  height: 650px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    border: 2px solid;
    border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    box-shadow: none;
  `}
  
  /* This forces dropdown options to match the background for dark themes */
  option {
    background-color: ${props => 
      props.theme.name === 'dark' || props.theme.name === 'oled' ? 
      '#333' : 
      props.theme.background || '#f5f5f7'};
    color: ${props => props.theme.text};
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    width: 95%;
    height: 90vh;
    flex-direction: column;
  }
`;

export const SettingsSidebar = styled.div`
  width: 230px;
  height: 650px;
  border-right: 1px solid ${props => props.theme.border};
  padding: 20px 0;
  overflow-y: auto;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-right: 1px solid ${props.theme.buttonShadowDark};
    padding: 2px 0;
  `}
  
  &::-webkit-scrollbar {
    width: 6px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      width: 16px;
    `}
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background: ${props.theme.scrollbarTrack};
      border: 1px solid;
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    `}
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 10px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background: ${props.theme.scrollbarThumb};
      border-radius: 0;
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    `}
  }
  
  /* Add scroll buttons for retro theme */
  ${props => props.theme.name === 'retro' && `
    &::-webkit-scrollbar-button {
      display: block;
      background-color: ${props.theme.buttonFace};
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
      height: 16px;
      width: 16px;
    }
    
    &::-webkit-scrollbar-button:vertical:start {
      background-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10L8 6L12 10" stroke="black" stroke-width="1"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
    }
    
    &::-webkit-scrollbar-button:vertical:end {
      background-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="black" stroke-width="1"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
    }
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.border};
    padding: 10px 0;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      padding: 2px 0;
      border-bottom: 1px solid ${props.theme.buttonShadowDark};
    `}
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    padding: 2px 4px;
    background-color: ${props.theme.windowTitleBarBackground};
    color: ${props.theme.windowTitleBarText};
  `}
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    font-size: 1rem;
    color: ${props.theme.windowTitleBarText};
  `}
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  opacity: 0.7;
  transition: all 0.2s ease;
  padding: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    background-color: ${props.theme.buttonFace};
    border: 1px solid;
    border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonHighlightSoft} inset, -1px -1px 0 0 ${props.theme.buttonShadowSoft} inset;
    border-radius: 0 !important;
    opacity: 1;
    font-size: 1rem;
    width: 16px;
    height: 13px;
    color: ${props.theme.text};
  `}
  
  &:hover {
    opacity: 1;
    background-color: ${props => props.theme.text}10;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background-color: ${props.theme.buttonFace};
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
      box-shadow: none;
    `}
  }
  
  &:active {
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
      box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    `}
  }
`;

export const NavItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.border}20;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? props.theme.text + '10' : 'transparent'};
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    padding: 2px 4px;
    border-bottom: none;
    font-weight: normal;
    background-color: ${props.active ? props.theme.buttonFace : 'transparent'};
    color: ${props.theme.text};
    
    ${props.active && `
      border: 1px solid;
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
      box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    `}
  `}
  
  &:hover {
    background-color: ${props => props.theme.text}15;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background-color: ${props.theme.buttonFace};
    `}
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: 650px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    padding: 4px;
  `}
  
  &::-webkit-scrollbar {
    width: 6px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      width: 16px;
    `}
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background: ${props.theme.scrollbarTrack};
      border: 1px solid;
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    `}
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 10px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background: ${props.theme.scrollbarThumb};
      border-radius: 0;
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    `}
  }
  
  /* Add scroll buttons for retro theme */
  ${props => props.theme.name === 'retro' && `
    &::-webkit-scrollbar-button {
      display: block;
      background-color: ${props.theme.buttonFace};
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
      height: 16px;
      width: 16px;
    }
    
    &::-webkit-scrollbar-button:vertical:start {
      background-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10L8 6L12 10" stroke="black" stroke-width="1"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
    }
    
    &::-webkit-scrollbar-button:vertical:end {
      background-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="black" stroke-width="1"/></svg>');
      background-repeat: no-repeat;
      background-position: center;
    }
  `}
  
  @media (max-width: 768px) {
    height: auto;
    flex: 1;
    padding: 15px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      padding: 4px;
    `}
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${props => props.theme.text};
`;

export const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const SettingsLabel = styled.div`
  color: ${props => props.theme.text};
`;

export const ThemeSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

export const ThemeOption = styled.label`
  position: relative;
  cursor: pointer;
  
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .theme-preview {
    width: 120px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      border-radius: 0;
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    `}
    
    &.selected {
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 1px ${props => props.theme.primary};
      
      /* Specific styling for the retro theme */
      ${props => props.theme.name === 'retro' && `
        border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
        box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
      `}
    }
    
    .theme-header {
      height: 20px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: 10px;
      font-weight: 500;
    }
    
    .theme-content {
      flex: 1;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .theme-message {
      height: 8px;
      border-radius: 4px;
      
      /* Specific styling for the retro theme */
      ${props => props.theme.name === 'retro' && `
        border-radius: 0;
      `}
    }
    
    .theme-input {
      height: 6px;
      border-radius: 4px;
      margin-top: auto;
      
      /* Specific styling for the retro theme */
      ${props => props.theme.name === 'retro' && `
        border-radius: 0;
      `}
    }
  }
  
  .theme-name {
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: ${props => props.theme.text};
  }
  
  &:hover .theme-preview {
    transform: scale(1.02);
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      transform: none;
    `}
  }
`;

export const SelectBox = styled.select`
  background-color: ${props => 
    props.theme.name === 'dark' || props.theme.name === 'oled' ? 
    '#333' : 
    props.theme.background || '#f5f5f7'};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  min-width: 120px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    border: 1px solid;
    border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    background-color: ${props.theme.buttonFace};
    padding: 1px 2px;
  `}
  
  &:focus {
    border-color: ${props => props.theme.primary};
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    `}
  }
  
  option {
    background-color: ${props => 
      props.theme.name === 'dark' || props.theme.name === 'oled' ? 
      '#333' : 
      props.theme.background || '#f5f5f7'};
    color: ${props => props.theme.text};
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background-color: ${props.theme.buttonFace};
    `}
  }
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    padding: 2px;
  `}
  
  &:hover {
    background-color: ${props => props.theme.text}10;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background-color: ${props.theme.buttonFace};
    `}
  }
  
  input[type="radio"] {
    margin-right: 12px;
    width: 16px;
    height: 16px;
    accent-color: ${props => props.theme.primary};
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      margin-right: 4px;
      width: 12px;
      height: 12px;
    `}
  }
  
  span {
    color: ${props => props.theme.text};
    font-size: 14px;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      font-size: 11px;
    `}
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    gap: 4px;
  `}
  
  .toggle-label {
    color: ${props => props.theme.text};
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      font-size: 11px;
    `}
  }
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    width: 32px;
    height: 16px;
  `}
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.text}30;
  transition: .4s;
  border-radius: 24px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    border: 1px solid;
    border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    background-color: ${props.theme.buttonFace};
  `}
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      height: 12px;
      width: 12px;
      left: 1px;
      bottom: 1px;
      border-radius: 0;
      background-color: ${props.theme.buttonFace};
      border: 1px solid;
      border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
      box-shadow: 1px 1px 0 0 ${props.theme.buttonHighlightSoft} inset, -1px -1px 0 0 ${props.theme.buttonShadowSoft} inset;
    `}
  }
  
  input:checked + & {
    background-color: ${props => props.theme.primary};
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      background-color: ${props.theme.buttonFace};
    `}
  }
  
  input:checked + &:before {
    transform: translateX(20px);
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      transform: translateX(14px);
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
      box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    `}
  }
`;

export const FontSizeOption = styled(RadioOption)`
  font-size: ${props => {
    switch(props.value) {
      case 'small': return '12px';
      case 'large': return '18px';
      default: return '14px';
    }
  }};
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && props.value === 'small' && `
    font-size: 9px;
  `}
  
  ${props => props.theme.name === 'retro' && props.value === 'medium' && `
    font-size: 11px;
  `}
  
  ${props => props.theme.name === 'retro' && props.value === 'large' && `
    font-size: 14px;
  `}
`;

export const LanguageSelect = styled.select`
  background-color: ${props => 
    props.theme.name === 'dark' || props.theme.name === 'oled' ? 
    '#333' : 
    props.theme.background || '#f5f5f7'};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  min-width: 120px;
`;

export const TranslateLink = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: 12px;
  margin-left: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const NotificationToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.theme.text}05;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    gap: 4px;
    padding: 2px;
    background-color: ${props.theme.buttonFace};
    border: 1px solid;
    border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonHighlightSoft} inset, -1px -1px 0 0 ${props.theme.buttonShadowSoft} inset;
  `}
  
  .notification-label {
    color: ${props => props.theme.text};
    font-weight: 500;
  }
`;

export const SystemPromptArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.primary};
  }
`;

export const AdvancedButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${props => props.theme.text}05;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.text}10;
  }
`;

export const ChevronIcon = styled.span`
  transition: transform 0.2s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: 14px;
`;

export const SaveButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    border: 1px solid;
    border-color: ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonHighlightSoft} inset, -1px -1px 0 0 ${props.theme.buttonShadowSoft} inset;
    background-color: ${props.theme.buttonFace};
    color: ${props.theme.text};
    padding: 2px 4px;
    font-size: 11px;
  `}
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      opacity: 1;
      transform: none;
    `}
  }
  
  &:active {
    transform: translateY(0px);
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
      box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    `}
  }
`;

export const RainbowText = styled.span`
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #9400d3
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbow 3s ease-in-out infinite;
  
  @keyframes rainbow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

export const AboutContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const AboutTitle = styled.h2`
  margin: 0 0 20px 0;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
`;

export const AboutText = styled.p`
  color: ${props => props.theme.text};
  margin-bottom: 16px;
  line-height: 1.5;
`;

export const VersionText = styled.div`
  color: ${props => props.theme.text}80;
  font-size: 0.9rem;
  margin-bottom: 20px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    font-size: 11px;
  `}
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const LogoIcon = styled.div`
  font-size: 2rem;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    font-size: 1.5rem;
  `}
`;

export const LogoTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    font-size: 1.2rem;
  `}
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    gap: 2px;
  `}
`;

export const SettingGroup = styled.div`
  margin-bottom: 24px;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    margin-bottom: 8px;
  `}
`;

export const SettingLabel = styled.h4`
  margin: 0 0 12px 0;
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: 600;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background-color: ${props => 
    props.theme.name === 'dark' || props.theme.name === 'oled' ? 
    '#333' : 
    props.theme.background || '#f5f5f7'};
  color: ${props => props.theme.text};
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    border-radius: 0;
    border: 1px solid;
    border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    box-shadow: 1px 1px 0 0 ${props.theme.buttonShadowSoft} inset;
    background-color: ${props.theme.buttonFace};
    padding: 1px 2px;
    font-size: 11px;
  `}
  
  &:focus {
    border-color: ${props => props.theme.primary};
    
    /* Specific styling for the retro theme */
    ${props => props.theme.name === 'retro' && `
      border-color: ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight} ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark};
    `}
  }
  
  &::placeholder {
    color: ${props => props.theme.text}60;
  }
`;

export const SettingDescription = styled.p`
  color: ${props => props.theme.text}80;
  font-size: 12px;
  margin: 8px 0 0 0;
  line-height: 1.4;
  
  /* Specific styling for the retro theme */
  ${props => props.theme.name === 'retro' && `
    font-size: 9px;
  `}
`;