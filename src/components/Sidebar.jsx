import React, { useState, useEffect } from 'react';
import { withTheme } from 'styled-components';
import ModelIcon from './ModelIcon'; // Assuming ModelIcon is correctly imported
import { useLocation } from 'react-router-dom';
import {
  SidebarContainer,
  LogoContainer,
  LogoText,
  CollapseButton,
  TopBarContainer,
  MobileLogoContainer,
  MobileLogoText,
  NewChatButton,
  ScrollableContent,
  ChatList,
  ChatItem,
  ChatTitle,
  ShareButton,
  DeleteButton,
  ButtonContainer,
  BottomSection,
  SectionHeader,
  ModelDropdownContainer,
  ModelDropdownButton,
  ModelDropdownText,
  ModelDropdownContent,
  ModelOption,
  ModelInfo,
  ModelName,
  ModelDescription,
  SidebarButton,
  ProfileButton,
  MobileToggleButton,
  SidebarSection,
  NavLink,
  SearchInputContainer,
  SearchInputWrapper,
  SearchInput,
  SearchCloseButton,
  NoResultsMessage,
  ProfileDropdownContainer,
  ProfileDropdown,
  ProfileDropdownItem,
  ProfileAvatar
} from './Sidebar.styled';

// --- React Component ---

const Sidebar = ({
  chats = [], // Default to empty array
  activeChat,
  setActiveChat,
  createNewChat,
  deleteChat,
  availableModels = [], // Default to empty array
  selectedModel,
  setSelectedModel,
  toggleSettings,
  toggleProfile,
  isLoggedIn,
  username,
  isAdmin = false,
  collapsed: $collapsed,
  setCollapsed,
  theme,
  settings = {}
}) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true); // Show hamburger
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem('profilePicture') || null
  );
  const location = useLocation();

  // Ensure sidebar is always expanded in retro theme
  useEffect(() => {
    if (theme && theme.name === 'retro' && $collapsed) {
      setCollapsed(false);
    }
  }, [theme, $collapsed, setCollapsed]);

  // Listen for profile picture changes
  useEffect(() => {
    const handleProfilePictureChange = (event) => {
      setProfilePicture(event.detail.profilePicture);
    };

    window.addEventListener('profilePictureChanged', handleProfilePictureChange);
    return () => {
      window.removeEventListener('profilePictureChanged', handleProfilePictureChange);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicking outside
      if (isProfileDropdownOpen && !event.target.closest('[data-profile-dropdown]')) {
        setIsProfileDropdownOpen(false);
      }
      // Close model dropdown if clicking outside  
      if (isModelDropdownOpen && !event.target.closest('[data-model-dropdown]')) {
        setIsModelDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen, isModelDropdownOpen]);

  // Toggle mobile content visibility
  const toggleMobileExpanded = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  // Toggle desktop sidebar collapsed state
  const toggleCollapsed = () => {
    // Don't allow collapsing if retro theme
    if (theme && theme.name === 'retro') return;
    
    const newState = !$collapsed;
    setCollapsed(newState);
    setIsModelDropdownOpen(false); // Close dropdown when collapsing/expanding

    // Hamburger visibility logic for transition
    if (!newState) { // If expanding
      // No special logic needed on expand
    } else { // If collapsing
      setShowHamburger(false);
      setTimeout(() => setShowHamburger(true), 300); // Show after transition duration
    }
  };

  // Handle model selection from dropdown
  const handleSelectModel = (modelId) => {
    setSelectedModel(modelId);
    setIsModelDropdownOpen(false); // Close dropdown after selection
  };

  // Find the currently selected model object for display
  const currentModel = availableModels.find(m => m.id === selectedModel);

  // Handle sharing a chat
  const handleShareChat = async (chatId) => {
    // Updated share functionality: copy a static link to the clipboard
    const shareUrl = `${window.location.origin}/share-view?id=${chatId}`; // Use query param for ID
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Static share link copied to clipboard! You need to implement the /share-view route.');
    } catch (err) {
      console.error('Failed to copy share link: ', err);
      alert('Could not copy share link.');
    }
  };

  // Handle search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle profile dropdown
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSettingsClick = () => {
    setIsProfileDropdownOpen(false);
    toggleSettings();
  };

  const handleInfoClick = () => {
    setIsProfileDropdownOpen(false);
    toggleProfile();
  };

  const handleSignOutClick = () => {
    setIsProfileDropdownOpen(false);
    // Add sign out logic here
    console.log('Sign out clicked');
  };

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true;
    const chatTitle = chat.title || `Chat ${chat.id.substring(0, 4)}`;
    return chatTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Main Sidebar container */}
      <SidebarContainer 
        $isExpanded={isMobileExpanded} 
        $collapsed={theme && theme.name === 'retro' ? false : $collapsed}
        $sidebarStyle={settings.sidebarStyle || 'floating'}
      >
        {/* Top Bar for Desktop */}
        <TopBarContainer className="desktop-top-bar" style={{ padding: '20px 15px 10px 15px', alignItems: 'center' }}>
           <LogoContainer>
             <img 
               src={'/images/sculptor.svg'} 
               alt={'Sculptor AI'} 
             />
           </LogoContainer>
           
           {/* Left Collapse Button (now on the right) - hidden for retro theme */}
           {!$collapsed && theme && theme.name !== 'retro' && (
             <CollapseButton 
               onClick={toggleCollapsed} 
               $collapsed={$collapsed} 
               title="Collapse Sidebar"
               style={{ marginLeft: 'auto' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>
               </svg>
             </CollapseButton>
           )}
        </TopBarContainer>
        
        {/* New Chat Button Section */}
        {(!$collapsed || (theme && theme.name === 'retro')) && (
          <SidebarSection style={{ paddingTop: '8px', paddingBottom: '4px', borderTop: 'none' }}>
            <SidebarButton onClick={createNewChat}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>New Chat</span>
            </SidebarButton>
          </SidebarSection>
        )}

        {/* Persistent Search Input Section */}
        {(!$collapsed || (theme && theme.name === 'retro')) && (
          <SearchInputContainer>
            <SearchInputWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px', opacity: 0.6, color: 'currentColor' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <SearchInput
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <SearchCloseButton onClick={() => setSearchTerm('')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </SearchCloseButton>
              )}
            </SearchInputWrapper>
          </SearchInputContainer>
        )}

        {/* --- Navigation Section --- */}
        {(!$collapsed || (theme && theme.name === 'retro')) && (
          <SidebarSection style={{ paddingTop: '8px', paddingBottom: '16px', borderTop: 'none' }}>
            {location.pathname !== '/' && (
              <NavLink to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Chat</span>
              </NavLink>
            )}
            {location.pathname !== '/media' && (
              <NavLink to="/media">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Media</span>
              </NavLink>
            )}
            {location.pathname !== '/news' && (
              <NavLink to="/news">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>News</span>
              </NavLink>
            )}
            {location.pathname !== '/projects' && (
              <NavLink to="/projects">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                </svg>
                <span>Projects</span>
              </NavLink>
            )}
            {location.pathname !== '/workspace' && (
              <NavLink to="/workspace">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <span>Workspace</span>
              </NavLink>
            )}
            {isAdmin && location.pathname !== '/admin' && (
              <NavLink to="/admin">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Admin</span>
              </NavLink>
            )}
          </SidebarSection>
        )}

        {/* Top Bar for Mobile (Logo + Expander) */}
        <TopBarContainer className="mobile-top-bar" style={{ display: 'none' }}> {/* Managed by CSS */}
          <MobileLogoContainer>
            <img 
              src={'/images/sculptor.svg'} 
              alt={'Sculptor AI'} 
            />
          </MobileLogoContainer>
          {/* Toggle Button */}
          <MobileToggleButton
              onClick={toggleMobileExpanded}
              $isExpanded={isMobileExpanded}
              title={isMobileExpanded ? "Collapse Menu" : "Expand Menu"}
              style={{ marginLeft: 'auto' }}
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 {isMobileExpanded
                   ? <polyline points="18 15 12 9 6 15"></polyline> // Up arrow
                   : <polyline points="6 9 12 15 18 9"></polyline> // Down arrow
                 }
              </svg>
          </MobileToggleButton>
        </TopBarContainer>


        {/* --- START: Main content area (Scrollable + Bottom fixed) --- */}
        {/* This fragment wrapper is crucial for the original error fix */}
        {(!$collapsed || (theme && theme.name === 'retro')) && (
          <>
            {/* Scrollable Area (Models, Chats) */}
            <ScrollableContent $isExpanded={isMobileExpanded || (theme && theme.name === 'retro')}>
              
              {/* New Chat Button for Mobile */}
              <div className="mobile-only" style={{ display: 'none' }}>
                <SidebarSection style={{ paddingTop: '8px', paddingBottom: '4px', borderTop: 'none' }}>
                  <SidebarButton onClick={createNewChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <span>New Chat</span>
                  </SidebarButton>
                </SidebarSection>

                {/* Persistent Search Input for Mobile */}
                <SearchInputContainer>
                  <SearchInputWrapper>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px', opacity: 0.6, color: 'currentColor' }}>
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <SearchInput
                      type="text"
                      placeholder="Search chats..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {searchTerm && (
                      <SearchCloseButton onClick={() => setSearchTerm('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </SearchCloseButton>
                    )}
                  </SearchInputWrapper>
                </SearchInputContainer>
              </div>

              {/* Models Section removed as requested */}

              {/* Section header for chats */}
              <SectionHeader $collapsed={$collapsed}>
                Chats
              </SectionHeader>

              {/* --- Chats Section --- */}
              <ChatList $collapsed={$collapsed}>
                {filteredChats.length === 0 && searchTerm && (
                  <NoResultsMessage>
                    No chats found for "{searchTerm}"
                  </NoResultsMessage>
                )}
                {filteredChats.map(chat => (
                  <ChatItem
                    key={chat.id}
                    $active={activeChat === chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    $collapsed={$collapsed}
                    title={chat.title || `Chat ${chat.id.substring(0, 4)}`}
                  >
                    {/* TODO: Add chat icon if desired */}
                    <ChatTitle $collapsed={$collapsed}>{chat.title || `Chat ${chat.id.substring(0, 4)}`}</ChatTitle>
                    {/* Container for action buttons */}
                    <ButtonContainer $collapsed={$collapsed}>
                      <ShareButton
                        title="Share Chat"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent chat selection
                          handleShareChat(chat.id);
                        }}
                        $collapsed={$collapsed}
                      >
                        {/* Share Icon (Feather Icons) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                      </ShareButton>
                      <DeleteButton
                        title="Delete Chat"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent chat selection
                          deleteChat(chat.id);
                        }}
                        $collapsed={$collapsed}
                      >
                        {/* Trash Icon (Feather Icons) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </DeleteButton>
                    </ButtonContainer>
                  </ChatItem>
                ))}
              </ChatList>
              {/* Display copy status message */}
              {copyStatus && <div style={{ padding: '5px 10px', fontSize: '11px', color: '#aaa', textAlign: 'center' }}>{copyStatus}</div>}
            </ScrollableContent>

            {/* --- Bottom Buttons Section (Profile with Dropdown) --- */}
            {/* Rendered outside ScrollableContent to stick to bottom */}
            <SidebarSection style={{ borderTop: 'none' }}>
                {/* Profile / Sign In Button with Dropdown */}
                <ProfileDropdownContainer data-profile-dropdown>
                  <ProfileButton
                    onClick={handleProfileClick}
                    title={isLoggedIn ? `View profile: ${username}` : "Sign In"}
                  >
                     {isLoggedIn ? (
                       <ProfileAvatar $profilePicture={profilePicture}>
                         {!profilePicture && username.charAt(0).toUpperCase()}
                       </ProfileAvatar>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                       </svg>
                     )}
                     <span>{isLoggedIn ? username : 'Sign In'}</span>
                  </ProfileButton>

                  {/* Profile Dropdown Menu */}
                  <ProfileDropdown $isOpen={isProfileDropdownOpen}>
                    <ProfileDropdownItem onClick={handleSettingsClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      <span>Settings</span>
                    </ProfileDropdownItem>
                    
                    <ProfileDropdownItem onClick={handleInfoClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span>Info</span>
                    </ProfileDropdownItem>
                    
                    {isLoggedIn && (
                      <ProfileDropdownItem onClick={handleSignOutClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Sign Out</span>
                      </ProfileDropdownItem>
                    )}
                  </ProfileDropdown>
                </ProfileDropdownContainer>
            </SidebarSection>
          </>
        )}
        {/* --- END: Main content area --- */}

      </SidebarContainer>
    </>
  );
};

// Wrap our component with withTheme HOC to access the theme context
export default withTheme(Sidebar);
