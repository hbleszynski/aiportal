import styled, { keyframes } from 'styled-components';

// Fade in animation
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
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
  z-index: 1050;
  animation: ${fadeIn} 0.3s ease;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme.sidebar};
  color: ${props => props.theme.text};
  border-radius: 16px;
  width: 90vw;
  max-width: 1600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  
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
    max-width: 95%;
    width: 95%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid ${props => props.theme.border};
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.sidebar};
  z-index: 1;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px 16px 0 0;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  opacity: 0.7;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    opacity: 1;
    background: rgba(0,0,0,0.05);
  }
`;

export const ModalBody = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

export const SettingsSection = styled.div`
  margin-bottom: 40px;
  position: relative;
  padding: 20px;
  background-color: ${props => props.theme.cardBackground || 'rgba(0,0,0,0.02)'};
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 25px 0;
  font-size: 1.15rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: ${props => props.theme.primary};
    margin-right: 10px;
    border-radius: 4px;
  }
`;

export const SettingGroup = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingLabel = styled.h4`
  margin: 0 0 16px 0;
  font-size: 1.05rem;
  font-weight: 500;
  color: ${props => props.theme.text}dd;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: ${props => props.isSelected ? 
    `${props.theme.primary}15` : 
    'rgba(0, 0, 0, 0.03)'};
  border: 1px solid ${props => props.isSelected ? 
    props.theme.primary : 
    'transparent'};
  transition: all 0.2s ease;
  font-size: 0.95rem;
  
  &:hover {
    background-color: ${props => props.isSelected ? 
      `${props.theme.primary}20` : 
      'rgba(0, 0, 0, 0.05)'};
  }
  
  input {
    margin-right: 10px;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 10px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  margin-right: 12px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

// More animated slider
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? props.theme.primary : 'rgba(0,0,0,0.15)'};
  background-image: ${props => props.checked ? 
    `linear-gradient(to right, ${props.theme.primary}90, ${props.theme.primary})` : 
    'none'};
  transition: 0.3s;
  border-radius: 26px;
  overflow: visible;
  
  &:before {
    position: absolute;
    content: "";
    height: ${props => props.checked ? '22px' : '20px'};
    width: ${props => props.checked ? '22px' : '20px'};
    left: ${props => props.checked ? '2px' : '3px'};
    bottom: ${props => props.checked ? '2px' : '3px'};
    background-color: ${props => props.checked ? '#4caf50' : 'white'};
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: ${props => props.checked ? 
      `0 2px 5px rgba(0,0,0,0.2)` : 
      '0 2px 5px rgba(0,0,0,0.2)'};
    transform: ${props => props.checked ? 'translateX(22px)' : 'translateX(0)'};
  }
  
  /* Visual indicator on track */
  &:after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.checked ? 'white' : 'transparent'};
    top: 10px;
    left: 9px;
    opacity: ${props => props.checked ? '0.7' : '0'};
    transition: 0.3s;
  }
`;

export const ThemeOption = styled.label`
  display: flex;
  align-items: center;
  padding: 16px 12px;
  border-radius: 10px;
  border: 2px solid ${props => props.isSelected ? props.theme.primary : 'transparent'};
  background: ${props => props.isSelected ? props.theme.cardBackground : 'rgba(0,0,0,0.03)'};
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100px;
  justify-content: center;
  position: relative;
  box-shadow: ${props => props.isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};
  transform: ${props => props.isSelected ? 'translateY(-2px)' : 'none'};
  margin-bottom: 8px;
  
  /* Make bisexual theme option wider */
  &.bisexual-theme {
    width: 110px;
  }
  
  input {
    position: relative;
    opacity: 1;
    margin-right: 6px;
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background: ${props => props.isSelected ? props.theme.cardBackground : 'rgba(0,0,0,0.05)'};
    transform: ${props => props.isSelected ? 'translateY(-3px)' : 'translateY(-1px)'};
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  /* Keep existing theme-specific styles but enhance them */
  &.light-theme {
    background: ${props => props.isSelected ? '#ffffff' : '#f5f5f7'};
    color: #222222;
    border-color: ${props => props.isSelected ? '#0078d7' : 'transparent'};
  }
  
  &.dark-theme {
    background: ${props => props.isSelected ? '#222222' : '#333333'};
    color: #ffffff;
    border-color: ${props => props.isSelected ? '#0078d7' : 'transparent'};
  }
  
  &.oled-theme {
    background: ${props => props.isSelected ? '#000000' : '#0a0a0a'};
    color: #ffffff;
    border-color: ${props => props.isSelected ? '#0078d7' : 'transparent'};
  }
  
  &.ocean-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #0277bd, #039be5, #4fc3f7)' : 
      'linear-gradient(135deg, #0277bd80, #039be580, #4fc3f780)'};
    color: white;
    border-color: ${props => props.isSelected ? '#0277bd' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  &.forest-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #2e7d32, #388e3c, #4caf50)' : 
      'linear-gradient(135deg, #2e7d3280, #388e3c80, #4caf5080)'};
    color: white;
    border-color: ${props => props.isSelected ? '#2e7d32' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  &.bisexual-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #D60270, #9B4F96, #0038A8)' : 
      'linear-gradient(135deg, #D6027080, #9B4F9680, #0038A880)'};
    color: white;
    border-color: ${props => props.isSelected ? '#D60270' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  &.lakeside-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #121218, #1a1a22)' : 
      'linear-gradient(135deg, #12121880, #1a1a2280)'};
    color: white;
    border-color: ${props => props.isSelected ? '#DAA520' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  &.pride-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff)' : 
      'linear-gradient(135deg, #ff000080, #ff990080, #ffff0080, #33cc3380, #3399ff80, #9933ff80)'};
    color: white;
    border-color: ${props => props.isSelected ? '#ff0000' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  &.trans-theme {
    background: ${props => props.isSelected ? 
      'linear-gradient(135deg, #5BCEFA, #F5A9B8, #FFFFFF, #F5A9B8, #5BCEFA)' : 
      'linear-gradient(135deg, #5BCEFA80, #F5A9B880, #FFFFFF80, #F5A9B880, #5BCEFA80)'};
    color: #333;
    border-color: ${props => props.isSelected ? '#5BCEFA' : 'transparent'};
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  &.retro-theme {
    background: ${props => props.isSelected ? '#008080' : '#C0C0C0'};
    color: ${props => props.isSelected ? '#FFFFFF' : '#000000'};
    border-color: ${props => props.isSelected ? '#000080' : 'transparent'};
    font-family: "'MS Sans Serif', Tahoma, sans-serif"; /* Optional: specific font for the button */
  }
`;

export const AboutSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  grid-column: 1 / -1;
  background-color: ${props => props.theme.cardBackground || 'rgba(0,0,0,0.02)'};
  border-radius: 12px;
`;

export const VersionText = styled.div`
  opacity: 0.6;
  font-size: 0.85rem;
`;

export const pulseAnimation = keyframes`
  0% { background-position: 0% center; }
  100% { background-position: 400% center; }
`;

export const RainbowText = styled.span`
  background: ${props => {
    if (props.theme.name === 'bisexual') {
      return 'linear-gradient(to right, #D60270, #9B4F96, #0038A8, #9B4F96, #D60270)';
    } else if (props.theme.name === 'trans') {
      return 'linear-gradient(to right, #5BCEFA, #F5A9B8, #FFFFFF, #F5A9B8, #5BCEFA)';
    } else {
      return 'linear-gradient(to right, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff, #ff33cc, #ff0000)';
    }
  }};
  background-size: 400% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${pulseAnimation} 8s linear infinite;
  font-weight: 600;
`;

// First, let's add some visual representation to font size options
export const FontSizeOption = styled(RadioOption)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 20px;
  width: auto;
  min-width: 110px;
  
  .size-label {
    margin-top: 10px;
    font-weight: 500;
  }
  
  .sample-text {
    margin-top: 6px;
    white-space: nowrap;
    font-weight: 600;
  }
  
  .small {
    font-size: 0.9rem;
  }
  
  .medium {
    font-size: 1rem;
  }
  
  .large {
    font-size: 1.1rem;
  }
`;

// Add new components for additional settings
export const ColorPickerOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  label {
    flex: 1;
  }
  
  input[type="color"] {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    padding: 0;
    overflow: hidden;
  }
`;

export const SelectBox = styled.select`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background}80;
  color: ${props => props.theme.text};
  font-family: inherit;
  width: 100%;
  margin-bottom: 15px;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}30;
  }
`;