#!/bin/bash

# Create the new file with updated imports and the component code
cat > src/components/NewSettingsPanel.jsx << 'EOF'
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

EOF

# Append the component code (from line 1027 onwards)
sed -n '1027,$p' src/components/NewSettingsPanel.jsx >> src/components/NewSettingsPanel.jsx.new
mv src/components/NewSettingsPanel.jsx.new src/components/NewSettingsPanel.jsx