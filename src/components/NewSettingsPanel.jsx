import React, { useState } from 'react';
import TetrisGame from './TetrisGame';
import { useAuth } from '../contexts/AuthContext';
import {
  SettingsOverlay,
  SettingsContainer,
  SettingsSidebar,
  Header,
  Title,
  CloseButton,
  NavItem,
  MainContent,
  SectionTitle,
  SettingsRow,
  SettingsLabel,
  ThemeSelect,
  ThemeOption,
  SelectBox,
  RadioOption,
  ToggleWrapper,
  Toggle,
  Slider,
  FontSizeOption,
  LanguageSelect,
  TranslateLink,
  NotificationToggle,
  SystemPromptArea,
  AdvancedButton,
  ChevronIcon,
  SaveButton,
  RainbowText,
  AboutContainer,
  AboutTitle,
  AboutText,
  VersionText,
  LogoContainer,
  LogoIcon,
  LogoTitle,
  RadioGroup,
  SettingGroup,
  SettingLabel,
  InputField,
  SettingDescription
} from './NewSettingsPanel.styled';

const NewSettingsPanel = ({ settings, updateSettings, closeModal, onRestartOnboarding }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [localSettings, setLocalSettings] = useState(settings || {});
  const [showTetris, setShowTetris] = useState(false);
  const { adminUser } = useAuth();
  
  // Add a helper function to determine if in dark mode
  const isDarkMode = () => {
    return localSettings.theme === 'dark' || 
           localSettings.theme === 'oled' || 
           localSettings.theme === 'bisexual' ||
           localSettings.theme === 'ocean' ||
           localSettings.theme === 'lakeside';
  };
  
  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    // Remove immediate parent update to prevent re-renders
    // updateSettings(newSettings);
  };

  const handleSave = () => {
    updateSettings(localSettings);
    closeModal();
  };

  const handleClose = () => {
    // Save settings when closing to maintain current UX behavior
    updateSettings(localSettings);
    closeModal();
  };

  const handleEasterEgg = () => {
    setShowTetris(true);
  };

  const handleExitTetris = () => {
    setShowTetris(false);
  };

  return (
    <SettingsOverlay>
      <SettingsContainer>
        <SettingsSidebar>
          <Header>
            <Title>Settings</Title>
          </Header>
          
          <NavItem 
            onClick={() => setActiveSection('general')} 
            $active={activeSection === 'general'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            General
          </NavItem>
          
          <NavItem 
            onClick={() => setActiveSection('appearance')} 
            $active={activeSection === 'appearance'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
            Appearance
          </NavItem>
          
          <NavItem 
            onClick={() => setActiveSection('interface')} 
            $active={activeSection === 'interface'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
            Interface
          </NavItem>
          
          <NavItem 
            onClick={() => setActiveSection('chats')} 
            $active={activeSection === 'chats'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Chats
          </NavItem>
          
          
          <NavItem 
            onClick={() => setActiveSection('accessibility')} 
            $active={activeSection === 'accessibility'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Accessibility
          </NavItem>
          
          {adminUser && (
            <NavItem 
              onClick={() => setActiveSection('developer')} 
              $active={activeSection === 'developer'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Developer
            </NavItem>
          )}
          
          <NavItem 
            onClick={() => setActiveSection('about')} 
            $active={activeSection === 'about'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            About
          </NavItem>
        </SettingsSidebar>
        
        <MainContent>
          <CloseButton onClick={handleClose}>×</CloseButton>
          
          {activeSection === 'general' && (
            <div>
              <SectionTitle>General</SectionTitle>
              
              <SettingsRow>
                <SettingsLabel>Theme</SettingsLabel>
                <SelectBox 
                  value={localSettings.theme || 'light'}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  style={{ 
                    backgroundColor: isDarkMode() ? '#333' : '#f5f5f7',
                    color: isDarkMode() ? '#fff' : '#000'
                  }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="oled">OLED</option>
                  <option value="ocean">Ocean</option>
                  <option value="forest">Forest</option>
                  <option value="bisexual">Bisexual</option>
                  <option value="pride">Pride</option>
                  <option value="trans">Trans</option>
                  <option value="lakeside">Lakeside</option>
                  <option value="retro">Retro</option>
                  <option value="galaxy">Galaxy</option>
                  <option value="sunset">Sunset</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="bubblegum">Bubblegum</option>
                  <option value="desert">Desert</option>
                  <option value="matrix">Matrix</option>
                  <option value="comic-book">Comic Book</option>
                </SelectBox>
              </SettingsRow>
              
              <SettingsRow>
                <SettingsLabel>Language</SettingsLabel>
                <LanguageSelect 
                  value={localSettings.language || 'en-US'} 
                  onChange={e => handleChange('language', e.target.value)}
                  style={{ 
                    backgroundColor: isDarkMode() ? '#333' : '#f5f5f7',
                    color: isDarkMode() ? '#fff' : '#000'
                  }}
                >
                  <option value="en-US">English (US)</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </LanguageSelect>
              </SettingsRow>
                            
              <SettingsRow>
                <SettingsLabel>Notifications</SettingsLabel>
                <NotificationToggle 
                  $isOn={localSettings.notifications || false} 
                  onClick={() => handleChange('notifications', !localSettings.notifications)}
                />
              </SettingsRow>
            </div>
          )}
          
          {activeSection === 'appearance' && (
            <div>
              <SectionTitle>Appearance</SectionTitle>
              
              <SettingGroup>
                <SettingLabel>Font Size</SettingLabel>
                <RadioGroup>
                  <FontSizeOption isSelected={localSettings.fontSize === 'small'}>
                    <input
                      type="radio"
                      name="fontSize"
                      value="small"
                      checked={localSettings.fontSize === 'small'}
                      onChange={() => handleChange('fontSize', 'small')}
                    />
                    <div className="sample-text small">Aa</div>
                    <div className="size-label">Small</div>
                  </FontSizeOption>
                  <FontSizeOption isSelected={localSettings.fontSize === 'medium'}>
                    <input
                      type="radio"
                      name="fontSize"
                      value="medium"
                      checked={localSettings.fontSize === 'medium'}
                      onChange={() => handleChange('fontSize', 'medium')}
                    />
                    <div className="sample-text medium">Aa</div>
                    <div className="size-label">Medium</div>
                  </FontSizeOption>
                  <FontSizeOption isSelected={localSettings.fontSize === 'large'}>
                    <input
                      type="radio"
                      name="fontSize"
                      value="large"
                      checked={localSettings.fontSize === 'large'}
                      onChange={() => handleChange('fontSize', 'large')}
                    />
                    <div className="sample-text large">Aa</div>
                    <div className="size-label">Large</div>
                  </FontSizeOption>
                </RadioGroup>
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>Font Family</SettingLabel>
                <SelectBox
                  value={localSettings.fontFamily || 'system'}
                  onChange={(e) => handleChange('fontFamily', e.target.value)}
                  style={{ 
                    backgroundColor: isDarkMode() ? '#333' : '#f5f5f7',
                    color: isDarkMode() ? '#fff' : '#000'
                  }}
                >
                  <option value="system">System Default</option>
                  <option value="inter">Inter</option>
                  <option value="roboto">Roboto</option>
                  <option value="opensans">Open Sans</option>
                  <option value="georgia">Georgia</option>
                  <option value="merriweather">Merriweather</option>
                </SelectBox>
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>Sidebar Style</SettingLabel>
                <RadioGroup>
                  <RadioOption isSelected={localSettings.sidebarStyle === 'floating' || !localSettings.sidebarStyle}>
                    <input
                      type="radio"
                      name="sidebarStyle"
                      value="floating"
                      checked={localSettings.sidebarStyle === 'floating' || !localSettings.sidebarStyle}
                      onChange={() => handleChange('sidebarStyle', 'floating')}
                    />
                    Floating
                  </RadioOption>
                  <RadioOption isSelected={localSettings.sidebarStyle === 'traditional'}>
                    <input
                      type="radio"
                      name="sidebarStyle"
                      value="traditional"
                      checked={localSettings.sidebarStyle === 'traditional'}
                      onChange={() => handleChange('sidebarStyle', 'traditional')}
                    />
                    Traditional
                  </RadioOption>
                </RadioGroup>
                <SettingDescription>
                  Choose between a floating sidebar with rounded corners and margins, or a traditional sidebar that connects to the side of the screen.
                </SettingDescription>
              </SettingGroup>
            </div>
          )}
          
          {activeSection === 'chats' && (
            <div>
              <SectionTitle>Chat Settings</SectionTitle>
              
              <SettingGroup>
                <SettingLabel>Message Features</SettingLabel>
                
                <ToggleWrapper>
                  <Toggle checked={localSettings.showTimestamps}>
                    <input
                      type="checkbox"
                      checked={localSettings.showTimestamps}
                      onChange={() => handleChange('showTimestamps', !localSettings.showTimestamps)}
                    />
                    <Slider checked={localSettings.showTimestamps} />
                  </Toggle>
                  Show message timestamps
                </ToggleWrapper>
                
                <ToggleWrapper>
                  <Toggle checked={localSettings.showModelIcons}>
                    <input
                      type="checkbox"
                      checked={localSettings.showModelIcons}
                      onChange={() => handleChange('showModelIcons', !localSettings.showModelIcons)}
                    />
                    <Slider checked={localSettings.showModelIcons} />
                  </Toggle>
                  Show model icons in messages
                </ToggleWrapper>
                
                <ToggleWrapper>
                  <Toggle checked={localSettings.codeHighlighting}>
                    <input
                      type="checkbox"
                      checked={localSettings.codeHighlighting}
                      onChange={() => handleChange('codeHighlighting', !localSettings.codeHighlighting)}
                    />
                    <Slider checked={localSettings.codeHighlighting} />
                  </Toggle>
                  Enable code syntax highlighting
                </ToggleWrapper>
              </SettingGroup>
              
              <SettingGroup>
                <SettingLabel>Message Sending</SettingLabel>
                <ToggleWrapper>
                  <Toggle checked={localSettings.sendWithEnter}>
                    <input
                      type="checkbox"
                      checked={localSettings.sendWithEnter}
                      onChange={() => handleChange('sendWithEnter', !localSettings.sendWithEnter)}
                    />
                    <Slider checked={localSettings.sendWithEnter} />
                  </Toggle>
                  Send message with Enter (use Shift+Enter for new line)
                </ToggleWrapper>
              </SettingGroup>
              
              <SettingGroup>
                <SettingLabel>Message Alignment</SettingLabel>
                <RadioGroup>
                  <RadioOption isSelected={localSettings.messageAlignment === 'left'}>
                    <input
                      type="radio"
                      name="messageAlignment"
                      value="left"
                      checked={localSettings.messageAlignment === 'left'}
                      onChange={() => handleChange('messageAlignment', 'left')}
                    />
                    Left
                  </RadioOption>
                  <RadioOption isSelected={localSettings.messageAlignment === 'right'}>
                    <input
                      type="radio"
                      name="messageAlignment"
                      value="right"
                      checked={localSettings.messageAlignment === 'right'}
                      onChange={() => handleChange('messageAlignment', 'right')}
                    />
                    Right
                  </RadioOption>
                </RadioGroup>
              </SettingGroup>
            </div>
          )}
          
          {activeSection === 'interface' && (
            <div>
              <SectionTitle>Interface Settings</SectionTitle>
              
              <SettingGroup>
                <SettingLabel>Layout</SettingLabel>
                <ToggleWrapper>
                  <Toggle checked={localSettings.sidebarAutoCollapse || false}>
                    <input
                      type="checkbox"
                      checked={localSettings.sidebarAutoCollapse || false}
                      onChange={() => handleChange('sidebarAutoCollapse', !localSettings.sidebarAutoCollapse)}
                    />
                    <Slider checked={localSettings.sidebarAutoCollapse || false} />
                  </Toggle>
                  Auto-collapse sidebar when chatting
                </ToggleWrapper>
                
                <ToggleWrapper>
                  <Toggle checked={localSettings.focusMode || false}>
                    <input
                      type="checkbox"
                      checked={localSettings.focusMode || false}
                      onChange={() => handleChange('focusMode', !localSettings.focusMode)}
                    />
                    <Slider checked={localSettings.focusMode || false} />
                  </Toggle>
                  Focus mode (hide UI elements while typing)
                </ToggleWrapper>

                <ToggleWrapper>
                  <Toggle checked={localSettings.showGreeting !== false}>
                    <input
                      type="checkbox"
                      checked={localSettings.showGreeting !== false}
                      onChange={() => handleChange('showGreeting', localSettings.showGreeting === false ? true : false)}
                    />
                    <Slider checked={localSettings.showGreeting !== false} />
                  </Toggle>
                  Show greeting message on empty chat
                </ToggleWrapper>
              </SettingGroup>
              
              <SettingGroup>
                <SettingLabel>Message Bubbles</SettingLabel>
                <RadioGroup>
                  <RadioOption isSelected={localSettings.bubbleStyle === 'modern' || !localSettings.bubbleStyle}>
                    <input
                      type="radio"
                      name="bubbleStyle"
                      value="modern"
                      checked={localSettings.bubbleStyle === 'modern' || !localSettings.bubbleStyle}
                      onChange={() => handleChange('bubbleStyle', 'modern')}
                    />
                    Modern (rounded)
                  </RadioOption>
                  <RadioOption isSelected={localSettings.bubbleStyle === 'classic'}>
                    <input
                      type="radio"
                      name="bubbleStyle"
                      value="classic"
                      checked={localSettings.bubbleStyle === 'classic'}
                      onChange={() => handleChange('bubbleStyle', 'classic')}
                    />
                    Classic (rectangle)
                  </RadioOption>
                  <RadioOption isSelected={localSettings.bubbleStyle === 'minimal'}>
                    <input
                      type="radio"
                      name="bubbleStyle"
                      value="minimal"
                      checked={localSettings.bubbleStyle === 'minimal'}
                      onChange={() => handleChange('bubbleStyle', 'minimal')}
                    />
                    Minimal (no bubbles)
                  </RadioOption>
                </RadioGroup>
              </SettingGroup>
              
              <SettingGroup>
                <SettingLabel>Message Spacing</SettingLabel>
                <RadioGroup>
                  <RadioOption isSelected={localSettings.messageSpacing === 'compact'}>
                    <input
                      type="radio"
                      name="messageSpacing"
                      value="compact"
                      checked={localSettings.messageSpacing === 'compact'}
                      onChange={() => handleChange('messageSpacing', 'compact')}
                    />
                    Compact
                  </RadioOption>
                  <RadioOption isSelected={localSettings.messageSpacing === 'comfortable' || !localSettings.messageSpacing}>
                    <input
                      type="radio"
                      name="messageSpacing"
                      value="comfortable"
                      checked={localSettings.messageSpacing === 'comfortable' || !localSettings.messageSpacing}
                      onChange={() => handleChange('messageSpacing', 'comfortable')}
                    />
                    Comfortable
                  </RadioOption>
                  <RadioOption isSelected={localSettings.messageSpacing === 'spacious'}>
                    <input
                      type="radio"
                      name="messageSpacing"
                      value="spacious"
                      checked={localSettings.messageSpacing === 'spacious'}
                      onChange={() => handleChange('messageSpacing', 'spacious')}
                    />
                    Spacious
                  </RadioOption>
                </RadioGroup>
              </SettingGroup>
            </div>
          )}
          
          {activeSection === 'accessibility' && (
            <div>
              <SectionTitle>Accessibility</SectionTitle>
              
              <SettingGroup>
                <SettingLabel>Visual Comfort</SettingLabel>
                <ToggleWrapper>
                  <Toggle checked={localSettings.highContrast || false}>
                    <input
                      type="checkbox"
                      checked={localSettings.highContrast || false}
                      onChange={() => handleChange('highContrast', !localSettings.highContrast)}
                    />
                    <Slider checked={localSettings.highContrast || false} />
                  </Toggle>
                  High Contrast Mode
                </ToggleWrapper>
                
                <ToggleWrapper>
                  <Toggle checked={localSettings.reducedMotion || false}>
                    <input
                      type="checkbox"
                      checked={localSettings.reducedMotion || false}
                      onChange={() => handleChange('reducedMotion', !localSettings.reducedMotion)}
                    />
                    <Slider checked={localSettings.reducedMotion || false} />
                  </Toggle>
                  Reduce animations and motion
                </ToggleWrapper>
              </SettingGroup>
              
              <SettingGroup>
                <SettingLabel>Text Spacing</SettingLabel>
                <RadioGroup>
                  <RadioOption isSelected={localSettings.lineSpacing === 'normal' || !localSettings.lineSpacing}>
                    <input
                      type="radio"
                      name="lineSpacing"
                      value="normal"
                      checked={localSettings.lineSpacing === 'normal' || !localSettings.lineSpacing}
                      onChange={() => handleChange('lineSpacing', 'normal')}
                    />
                    Normal
                  </RadioOption>
                  <RadioOption isSelected={localSettings.lineSpacing === 'relaxed'}>
                    <input
                      type="radio"
                      name="lineSpacing"
                      value="relaxed"
                      checked={localSettings.lineSpacing === 'relaxed'}
                      onChange={() => handleChange('lineSpacing', 'relaxed')}
                    />
                    Relaxed
                  </RadioOption>
                  <RadioOption isSelected={localSettings.lineSpacing === 'loose'}>
                    <input
                      type="radio"
                      name="lineSpacing"
                      value="loose"
                      checked={localSettings.lineSpacing === 'loose'}
                      onChange={() => handleChange('lineSpacing', 'loose')}
                    />
                    Loose
                  </RadioOption>
                </RadioGroup>
              </SettingGroup>
            </div>
          )}
          
          {activeSection === 'developer' && adminUser && (
            <div>
              <SectionTitle>Developer</SectionTitle>
              
              <SettingGroup>
                <SettingLabel>Onboarding</SettingLabel>
                <SettingDescription>
                  Reset the onboarding flow for testing purposes. This will show the welcome tutorial again.
                </SettingDescription>
                <SaveButton 
                  onClick={() => {
                    if (onRestartOnboarding) {
                      onRestartOnboarding();
                      closeModal();
                    }
                  }}
                  style={{ 
                    position: 'relative',
                    bottom: 'auto',
                    right: 'auto',
                    marginTop: '10px'
                  }}
                >
                  Restart Onboarding
                </SaveButton>
              </SettingGroup>
            </div>
          )}
          
          {activeSection === 'about' && (
            <AboutContainer>
              <SectionTitle>About</SectionTitle>
              
              <LogoContainer>
                <LogoIcon onClick={handleEasterEgg}>
                  <img 
                    src={localSettings.theme === 'lakeside' ? 'https://demo-andromeda.me/static/favicon.png' : '/sculptor.svg'} 
                    alt={localSettings.theme === 'lakeside' ? 'Andromeda Logo' : 'Sculptor Logo'} 
                    style={localSettings.theme === 'lakeside' ? {
                      filter: 'brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(804%) hue-rotate(20deg) brightness(91%) contrast(85%)'
                    } : {}}
                  />
                </LogoIcon>
                <LogoTitle 
                  onClick={handleEasterEgg}
                  style={localSettings.theme === 'lakeside' ? { color: 'rgb(198, 146, 20)' } : {}}
                >
                  {localSettings.theme === 'lakeside' ? 'Andromeda' : 'Sculptor'}
                </LogoTitle>
              </LogoContainer>
              
              <AboutTitle>Made with <RainbowText>Pride</RainbowText></AboutTitle>
              
              <AboutText>From the Andromeda Team, with ❤️</AboutText>
              
              <VersionText>Sculptor Alpha 0.0.6</VersionText>
            </AboutContainer>
          )}
          
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </MainContent>
      </SettingsContainer>
      
      {showTetris && (
        <TetrisGame onExit={handleExitTetris} />
      )}
    </SettingsOverlay>
  );
};

export default NewSettingsPanel; 