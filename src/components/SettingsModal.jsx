import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  SettingsSection,
  SectionTitle,
  SettingGroup,
  SettingLabel,
  RadioGroup,
  RadioOption,
  ToggleWrapper,
  Toggle,
  Slider,
  ThemeOption,
  AboutSection,
  VersionText,
  RainbowText,
  FontSizeOption,
  ColorPickerOption,
  SelectBox
} from './SettingsModal.styled';

const SettingsModal = ({ settings, updateSettings, closeModal }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  
  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };
  
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Settings</ModalTitle>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <SettingsSection>
            <SectionTitle>Appearance</SectionTitle>
            
            <SettingGroup>
              <SettingLabel>Theme</SettingLabel>
              <RadioGroup>
                <ThemeOption 
                  isSelected={localSettings.theme === 'light'}
                  className="light-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={localSettings.theme === 'light'}
                    onChange={() => handleChange('theme', 'light')}
                  />
                  Light
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'dark'}
                  className="dark-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={localSettings.theme === 'dark'}
                    onChange={() => handleChange('theme', 'dark')}
                  />
                  Dark
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'oled'}
                  className="oled-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="oled"
                    checked={localSettings.theme === 'oled'}
                    onChange={() => handleChange('theme', 'oled')}
                  />
                  OLED
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'ocean'}
                  className="ocean-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="ocean"
                    checked={localSettings.theme === 'ocean'}
                    onChange={() => handleChange('theme', 'ocean')}
                  />
                  Ocean
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'forest'}
                  className="forest-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="forest"
                    checked={localSettings.theme === 'forest'}
                    onChange={() => handleChange('theme', 'forest')}
                  />
                  Forest
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'pride'}
                  className="pride-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="pride"
                    checked={localSettings.theme === 'pride'}
                    onChange={() => handleChange('theme', 'pride')}
                  />
                  Pride
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'trans'}
                  className="trans-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="trans"
                    checked={localSettings.theme === 'trans'}
                    onChange={() => handleChange('theme', 'trans')}
                  />
                  Trans
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'bisexual'}
                  className="bisexual-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="bisexual"
                    checked={localSettings.theme === 'bisexual'}
                    onChange={() => handleChange('theme', 'bisexual')}
                  />
                  Bisexual
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'lakeside'}
                  className="lakeside-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="lakeside"
                    checked={localSettings.theme === 'lakeside'}
                    onChange={() => handleChange('theme', 'lakeside')}
                  />
                  Lakeside
                </ThemeOption>
                <ThemeOption 
                  isSelected={localSettings.theme === 'retro'}
                  className="retro-theme"
                >
                  <input
                    type="radio"
                    name="theme"
                    value="retro"
                    checked={localSettings.theme === 'retro'}
                    onChange={() => handleChange('theme', 'retro')}
                  />
                  Retro
                </ThemeOption>
              </RadioGroup>
            </SettingGroup>
            
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

            {/* Add new Font Family setting */}
            <SettingGroup>
              <SettingLabel>Font Family</SettingLabel>
              <SelectBox
                value={localSettings.fontFamily || 'system'}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
              >
                <option value="system">System Default</option>
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="opensans">Open Sans</option>
                <option value="georgia">Georgia</option>
                <option value="merriweather">Merriweather</option>
              </SelectBox>
            </SettingGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>Chat</SectionTitle>
            
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
          </SettingsSection>

          {/* Add a new Interface section */}
          <SettingsSection>
            <SectionTitle>Interface</SectionTitle>
            
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
          </SettingsSection>

          {/* Add an Accessibility section */}
          <SettingsSection isLast={true}>
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
          </SettingsSection>
          
          <AboutSection>
            <VersionText>Version: 0.1.0</VersionText>
            <div>Made with <RainbowText>Pride</RainbowText></div>
          </AboutSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;