import styled from 'styled-components';

export const NewsContainer = styled.div`
  flex: 1;
  padding: 40px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  overflow-y: auto;
  width: ${props => (props.$collapsed ? '100%' : 'calc(100% - 320px)')};
  margin-left: ${props => (props.$collapsed ? '0' : '320px')};
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const Header = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const RefreshButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.primary || '#007bff'};
    color: white;
    border-color: ${props => props.theme.primary || '#007bff'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    animation: ${props => props.$loading ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterButton = styled.button`
  background-color: ${props => props.$active ? 'rgba(0,0,0,0.1)' : 'transparent'};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(0,0,0,0.05);
  }

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.8;
  }
`;

export const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(280px, auto);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(250px, auto);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(220px, auto);
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 15px;
  }
`;

export const ArticleCard = styled.div`
  background-color: ${props => props.theme.sidebar};
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  min-height: 250px;

  &:hover {
    transform: translateY(-5px);
  }

  /* Size variants */
  ${props => props.$size === 'featured' && `
    grid-column: span 2;
    grid-row: span 2;
    min-height: 400px;
    
    @media (max-width: 768px) {
      grid-column: span 2;
      grid-row: span 1;
      min-height: 320px;
    }
    
    @media (max-width: 480px) {
      grid-column: span 1;
      grid-row: auto;
      min-height: 280px;
    }
  `}

  ${props => props.$size === 'wide' && `
    grid-column: span 2;
    grid-row: span 1;
    min-height: 280px;
    
    @media (max-width: 768px) {
      grid-column: span 2;
      min-height: 250px;
    }
    
    @media (max-width: 480px) {
      grid-column: span 1;
      min-height: 280px;
    }
  `}

  ${props => props.$size === 'tall' && `
    grid-column: span 1;
    grid-row: span 2;
    min-height: 400px;
    
    @media (max-width: 768px) {
      grid-row: span 1;
      min-height: 280px;
    }
    
    @media (max-width: 480px) {
      grid-row: auto;
      min-height: 280px;
    }
  `}

  ${props => props.$size === 'compact' && `
    grid-column: span 1;
    grid-row: span 1;
    min-height: 250px;
  `}

  ${props => props.$size === 'standard' && `
    grid-column: span 1;
    grid-row: span 1;
    min-height: 280px;
  `}
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: ${props => {
    switch(props.$size) {
      case 'featured': return '220px';
      case 'wide': return '160px';
      case 'tall': return '200px';
      case 'compact': return '140px';
      default: return '180px';
    }
  }};
  object-fit: cover;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    height: ${props => {
      switch(props.$size) {
        case 'featured': return '180px';
        case 'wide': return '140px';
        case 'tall': return '160px';
        case 'compact': return '120px';
        default: return '150px';
      }
    }};
  }
  
  @media (max-width: 480px) {
    height: 140px;
  }
`;

export const ArticleContent = styled.div`
  padding: ${props => {
    switch(props.$size) {
      case 'featured': return '20px';
      case 'compact': return '16px';
      default: return '18px';
    }
  }};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: ${props => {
      switch(props.$size) {
        case 'featured': return '18px';
        case 'compact': return '14px';
        default: return '16px';
      }
    }};
  }
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const ArticleTag = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 500;

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
`;

export const ArticleTitle = styled.h3`
  font-size: ${props => {
    switch(props.$size) {
      case 'featured': return '1.4rem';
      case 'wide': return '1.3rem';
      case 'tall': return '1.2rem';
      case 'compact': return '1.05rem';
      default: return '1.2rem';
    }
  }};
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: ${props => {
    switch(props.$size) {
      case 'featured': return '3';
      case 'wide': return '2';
      case 'compact': return '2';
      default: return '2';
    }
  }};
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: ${props => {
      switch(props.$size) {
        case 'featured': return '1.25rem';
        case 'wide': return '1.2rem';
        default: return '1.1rem';
      }
    }};
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    -webkit-line-clamp: 2;
  }
`;

export const ArticleDescription = styled.p`
  font-size: ${props => {
    switch(props.$size) {
      case 'featured': return '1rem';
      case 'wide': return '0.95rem';
      case 'tall': return '0.9rem';
      case 'compact': return '0.85rem';
      default: return '0.9rem';
    }
  }};
  color: ${props => props.theme.textSecondary};
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: ${props => {
    switch(props.$size) {
      case 'featured': return '4';
      case 'wide': return '3';
      case 'tall': return '3';
      case 'compact': return '2';
      default: return '3';
    }
  }};
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    -webkit-line-clamp: ${props => {
      switch(props.$size) {
        case 'featured': return '3';
        case 'wide': return '2';
        default: return '2';
      }
    }};
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
    margin-bottom: 10px;
  }
`;

export const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
`;

export const ArticleSource = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
`;

export const BookmarkIcon = styled.div`
  cursor: pointer;
`;

export const ArticleDetailOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ArticleDetailContainer = styled.div`
  background-color: ${props => props.theme.name === 'light' ? '#f8f9fa' : '#2c2c2e'};
  color: ${props => props.theme.text};
  width: 90%;
  max-width: 1000px;
  height: 90vh;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ArticleDetailContent = styled.div`
  padding: 50px 60px;
  overflow-y: auto;
  flex-grow: 1;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: white;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(0,0,0,0.4);
  }
`;

export const DetailTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 20px;
  color: ${props => props.theme.text};
`;

export const DetailBody = styled.div`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${props => props.theme.name === 'light' ? '#343a40' : '#e0e0e0'};
  
  p {
    margin-bottom: 18px;
    text-align: justify;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin: 30px 0;
`;

export const DetailIntro = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.name === 'light' ? '#495057' : '#d1d1d1'};
  margin-bottom: 25px;
  font-weight: 400;
`;

export const ArticleMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.name === 'light' ? '#e9ecef' : '#404040'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AuthorName = styled.span`
  font-weight: 500;
  color: ${props => props.theme.text};
  font-size: 0.95rem;
`;

export const ReadTime = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.textSecondary};
`;

export const MetadataRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.85rem;
  color: ${props => props.theme.textSecondary};
`;

export const PublishTime = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:before {
    content: "🕒";
  }
`;

export const SourceTags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

export const SourceTag = styled.span`
  background-color: ${props => props.theme.name === 'light' ? '#007bff' : '#0056b3'};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:first-child {
    background-color: ${props => props.theme.name === 'light' ? '#dc3545' : '#c82333'};
  }
  
  &:nth-child(2) {
    background-color: ${props => props.theme.name === 'light' ? '#28a745' : '#1e7e34'};
  }
  
  &:nth-child(3) {
    background-color: ${props => props.theme.name === 'light' ? '#ffc107' : '#e0a800'};
    color: #000;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.border};
  border-top: 3px solid ${props => props.theme.primary || '#007bff'};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.error || '#dc3545'};
`;

export const RetryButton = styled.button`
  background-color: ${props => props.theme.primary || '#007bff'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.primaryHover || '#0056b3'};
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  text-align: center;
`;

export const EmptyStateMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
`;