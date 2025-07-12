import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.$collapsed ? '0' : '280px'};
  height: ${props => props.$sidebarStyle === 'traditional' ? '100vh' : 'calc(100vh - 40px)'};
  background: ${props => props.theme.sidebar};
  color: ${props => props.theme.text};
  border: ${props => props.$sidebarStyle === 'traditional' ? 'none' : `1px solid ${props.theme.border}`};
  border-right: ${props => props.$sidebarStyle === 'traditional' ? `1px solid ${props.theme.border}` : 'none'};
  border-radius: ${props => props.$sidebarStyle === 'traditional' ? '0' : '20px'};
  overflow: hidden;
  transition: all 0.3s ease;
  position: fixed;
  top: ${props => props.$sidebarStyle === 'traditional' ? '0' : '20px'};
  left: ${props => {
    if (props.$collapsed) {
      return '-280px';
    }
    return props.$sidebarStyle === 'traditional' ? '0' : '20px';
  }};
  z-index: 101;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  box-shadow: ${props => props.$sidebarStyle === 'traditional' ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  
  @media (max-width: 768px) {
    left: ${props => (props.$collapsed ? '-100%' : '0')};
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    border: none;
    border-radius: 0;
    box-shadow: none;
    transition: all 0.3s ease;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;

  img {
    height: 32px;
    width: 32px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoText = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
`;

export const CollapseButton = styled.button`
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  display: ${props => props.theme.name === 'retro' ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: ${props => props.$collapsed ? 'fixed' : 'relative'};
  top: ${props => props.$collapsed ? '16px' : '0'};
  left: ${props => props.$collapsed ? '16px' : '0'};
  z-index: 30;
  opacity: 0.6;
  border-radius: 4px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 12px 16px;
  width: 100%;
  justify-content: space-between;
  flex-shrink: 0;

  @media (max-width: 768px) {
    &.mobile-top-bar {
        display: flex !important;
        padding: 16px;
        width: 100%;
        justify-content: space-between;
    }
    &.desktop-top-bar {
        display: none;
    }
  }
`;

export const MobileLogoContainer = styled.div`
  display: none;
  align-items: center;
  margin-right: 10px;

  img {
    height: 32px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileLogoText = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
`;

export const NewChatButton = styled.button`
  background: ${props => {
    if (props.theme.name === 'retro') return props.theme.buttonFace;
    if (props.theme.name === 'lakeside') return 'rgba(198, 146, 20, 0.1)';
    if (props.theme.name === 'dark') return 'rgba(255,255,255,0.06)';
    return 'rgba(0,0,0,0.03)';
  }};
  color: ${props => {
    if (props.theme.name === 'lakeside') return 'rgb(198, 146, 20)';
    return props.theme.text;
  }};
  border: ${props => {
    if (props.theme.name === 'retro') {
      return `1px solid ${props.theme.buttonHighlightLight} ${props.theme.buttonShadowDark} ${props.theme.buttonShadowDark} ${props.theme.buttonHighlightLight}`;
    }
    return '1px solid rgba(0,0,0,0.06)';
  }};
  padding: ${props => props.theme.name === 'retro' ? '8px 15px' : '10px 12px'};
  border-radius: ${props => props.theme.name === 'retro' ? '0' : '6px'};
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  transition: all 0.2s ease;
  margin: 0 16px 16px;
  width: calc(100% - 32px);
  flex-shrink: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: ${props => {
      if (props.theme.name === 'retro') return props.theme.buttonFace;
      if (props.theme.name === 'lakeside') return 'rgba(198, 146, 20, 0.15)';
      if (props.theme.name === 'dark') return 'rgba(255,255,255,0.1)';
      return 'rgba(0,0,0,0.06)';
    }};
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  span {
    opacity: ${props => props.$collapsed ? '0' : '1'};
    visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
    transition: opacity 0.2s ease;
  }

  @media (max-width: 768px) {
    width: auto;
    margin: 0 10px 10px auto;
    padding: 10px 12px;
    
    span {
        opacity: 1;
        visibility: visible;
    }
  }
`;

export const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .mobile-only {
    display: none !important;
  }

  @media (max-width: 768px) {
    display: ${props => props.$isExpanded ? 'flex' : 'none'};
    overflow-y: auto;
    max-height: calc(40vh - 60px);
    
    .mobile-only {
      display: block !important;
    }
  }
`;

export const ChatList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  gap: 2px;

  @media (max-width: 768px) {
     max-height: none;
     padding: 0 16px;
     flex-grow: 0;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 2px;
  }
`;

export const ChatItem = styled.div`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => {
    if (!props.$active) return 'transparent';
    if (props.theme.name === 'lakeside') return 'rgba(198, 146, 20, 0.1)';
    if (props.theme.name === 'dark') return 'rgba(255, 255, 255, 0.08)';
    return 'rgba(0, 0, 0, 0.04)';
  }};
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
  
  &:hover {
    background: ${props => {
      if (props.$active) {
        if (props.theme.name === 'lakeside') return 'rgba(198, 146, 20, 0.15)';
        if (props.theme.name === 'dark') return 'rgba(255, 255, 255, 0.12)';
        return 'rgba(0, 0, 0, 0.06)';
      } else {
        if (props.theme.name === 'lakeside') return 'rgba(198, 146, 20, 0.05)';
        if (props.theme.name === 'dark') return 'rgba(255, 255, 255, 0.04)';
        return 'rgba(0, 0, 0, 0.02)';
      }
    }};
  }

  @media (max-width: 768px) {
      justify-content: space-between;
  }
`;

export const ChatTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  transition: opacity 0.2s ease;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 'inherit'};
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
      opacity: 1;
      visibility: visible;
  }
`;

export const ShareButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${ChatItem}:hover & {
      opacity: ${props => props.$collapsed ? '0' : '0.6'};
      visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  }

  &:hover {
    opacity: 1 !important;
    background-color: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }

  @media (max-width: 768px) {
      opacity: 0.6;
      visibility: visible;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${ChatItem}:hover & {
      opacity: ${props => props.$collapsed ? '0' : '0.6'};
      visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  }

  &:hover {
    opacity: 1 !important;
    background-color: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }

  @media (max-width: 768px) {
      opacity: 0.6;
      visibility: visible;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  ${ChatItem}:hover & {
      opacity: ${props => props.$collapsed ? '0' : '1'};
      visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  }

  @media (max-width: 768px) {
      opacity: 1;
      visibility: visible;
  }
`;

export const BottomSection = styled.div`
  padding: ${props => props.$collapsed ? '8px' : '12px 16px'};
  margin-top: auto;
  flex-shrink: 0;

  @media (max-width: 768px) {
      padding: 8px 16px;
  }
`;

export const SectionHeader = styled.div`
  padding: 0 16px;
  margin: 12px 0 8px 0;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  opacity: ${props => props.$collapsed ? '0' : '0.6'};
  visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  transition: opacity 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
      opacity: 0.6;
      visibility: visible;
  }
`;

export const ModelDropdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 16px;

  @media (max-width: 768px) {
    padding: 0 16px 8px;
  }
`;

export const ModelDropdownButton = styled.button`
  width: 100%;
  background: ${props => props.theme.name === 'lakeside' ? 'rgba(91, 0, 25, 1)' : props.theme.inputBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  padding: ${props => props.$collapsed ? '8px' : '8px 12px'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'space-between'};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    border-color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};
  }

  > div {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow: hidden;
  }

  > svg:last-child {
      transition: transform 0.2s;
      transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
      flex-shrink: 0;
      opacity: ${props => props.$collapsed ? '0' : '1'};
      visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  }

  @media (max-width: 768px) {
      justify-content: space-between;
      padding: 8px 12px;
       > svg:last-child {
           opacity: 1;
           visibility: visible;
       }
  }
`;

export const ModelDropdownText = styled.span`
  opacity: ${props => props.$collapsed ? '0' : '1'};
  visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  transition: opacity 0.2s ease;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
      opacity: 1;
      visibility: visible;
  }
`;

export const ModelDropdownContent = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 16px;
  right: 16px;
  background: ${props => props.theme.name === 'lakeside' ? 'rgba(91, 0, 25, 1)' : props.theme.inputBackground};
  border-radius: 6px;
  border: 1px solid ${props => props.theme.border};
  z-index: 30;
  overflow: hidden;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
      left: 16px;
      right: 16px;
  }
`;

export const ModelOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${props => {
    if (props.$isSelected) {
      return props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.1)' : 'rgba(0,0,0,0.06)';
    }
    return 'transparent';
  }};
  border-radius: 4px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};

  &:hover {
    background: ${props => props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.08)' : 'rgba(0,0,0,0.04)'};
  }
`;

export const ModelInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  visibility: ${props => props.$collapsed ? 'hidden' : 'visible'};
  transition: opacity 0.2s ease;

  @media (max-width: 768px) {
      opacity: 1;
      visibility: visible;
  }
`;

export const ModelName = styled.span`
  font-weight: ${props => props.$isSelected ? '500' : '400'};
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ModelDescription = styled.span`
  font-size: 12px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.7)' : `${props.theme.text}80`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
  }
  
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    opacity: 0.7;
    color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 'currentColor'};
  }
`;

export const ProfileButton = styled(SidebarButton)`
 /* Inherits all styles from SidebarButton */
`;

export const MobileToggleButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: ${props => props.theme.name === 'retro' ? 'none' : 'flex'};
    margin-left: 8px;
  }

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const SidebarSection = styled.div`
  border-top: 1px solid ${props => props.theme.border};
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: flex-start;
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
  }
  
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    opacity: 0.7;
    color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 'currentColor'};
  }
`;

export const SearchInputContainer = styled.div`
  padding: 4px 16px;
  margin-bottom: 4px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${props => 
    props.theme.name === 'lakeside' ? 'rgba(91, 0, 25, 1)' : 
    props.theme.inputBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.2s ease;
  min-height: 32px;

  &:focus-within {
    border-color: ${props => 
      props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 
      props.theme.text};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 6px 8px 6px 4px;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => 
    props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 
    props.theme.text};
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &::placeholder {
    color: ${props => 
      props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.5)' : 
      `${props.theme.text}60`};
  }
`;

export const SearchCloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => 
    props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.7)' : 
    `${props.theme.text}60`};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => 
      props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 
      props.theme.text};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: ${props => 
    props.theme.name === 'lakeside' ? 'rgba(198, 146, 20, 0.7)' : 
    `${props.theme.text}60`};
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ProfileDropdownContainer = styled.div`
  position: relative;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${props => 
    props.theme.name === 'lakeside' ? 'rgba(91, 0, 25, 1)' : 
    props.theme.inputBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  z-index: 30;
  overflow: hidden;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  animation: fadeIn 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ProfileDropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : props.theme.text};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
  }
  
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    opacity: 0.7;
    color: ${props => props.theme.name === 'lakeside' ? 'rgb(198, 146, 20)' : 'currentColor'};
  }
`;

export const ProfileAvatar = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  margin-right: 8px;
  background-image: ${props => props.$profilePicture ? `url(${props.$profilePicture})` : 'none'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;