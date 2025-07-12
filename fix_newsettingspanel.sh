#!/bin/bash

# First, update the imports
sed -i '' 's/import styled from '\''styled-components'\'';/import {\
  SettingsOverlay,\
  SettingsContainer,\
  SettingsSidebar,\
  Header,\
  Title,\
  CloseButton,\
  NavItem,\
  MainContent,\
  SectionTitle,\
  SettingsRow,\
  SettingsLabel,\
  ThemeSelect,\
  ThemeOption,\
  SelectBox,\
  RadioOption,\
  ToggleWrapper,\
  Toggle,\
  Slider,\
  FontSizeOption,\
  LanguageSelect,\
  TranslateLink,\
  NotificationToggle,\
  SystemPromptArea,\
  AdvancedButton,\
  ChevronIcon,\
  SaveButton,\
  RainbowText,\
  AboutContainer,\
  AboutTitle,\
  AboutText,\
  VersionText,\
  LogoContainer,\
  LogoIcon,\
  LogoTitle,\
  RadioGroup,\
  SettingGroup,\
  SettingLabel,\
  InputField,\
  SettingDescription\
} from '\''\.\/NewSettingsPanel\.styled'\'';/' src/components/NewSettingsPanel.jsx

# Now remove the large block of styled components from line 6 to line 1026
sed -i '' '6,1026d' src/components/NewSettingsPanel.jsx