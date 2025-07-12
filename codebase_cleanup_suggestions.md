# Codebase Cleanup Suggestions

This document outlines files that are potentially unused, bloated, or otherwise unnecessary. Review these suggestions before deleting any files.

## Unused Files

### Backup Files

- **File:** `src/services/aiService.js.backup` ✅ **COMPLETED**
  - **Reasoning:** This appears to be a backup file of `aiService.js`. It's not actively used by the application and can be safely deleted.

### Test Files

- **File:** `test-code-block-streaming.js` ✅ **COMPLETED**
  - **Reasoning:** This is a test file for verifying code block streaming functionality. While useful for development, it's not required for the production build and can be removed to reduce clutter.

- **File:** `test-integration.js` ✅ **COMPLETED**
  - **Reasoning:** This file tests the Gemini Live API integration. It is not a part of the core application and can be removed.

- **File:** `test-markdown-formatting.js` ✅ **COMPLETED**
  - **Reasoning:** Used for testing markdown rendering, this file is not essential for the application and can be deleted.

- **File:** `testSearch.js` ✅ **COMPLETED**
  - **Reasoning:** This script tests the search functionality of the application. It can be removed.

### Unused Images

- **File:** `public/images/retroTheme/settingsIcon.png` ✅ **COMPLETED**
  - **Reasoning:** This image is not referenced anywhere in the codebase and can be safely removed.

- **File:** `public/images/retroTheme/signinIcon.png` ✅ **COMPLETED**
  - **Reasoning:** This image is not referenced anywhere in the codebase and can be safely removed.

## Unused Directories

- **Directory:** `documentation/` ✅ **COMPLETED**
  - **Reasoning:** This directory contains a static documentation site, which is not part of the core application. It can be removed to reduce the repository size.

- **Directory:** `backend/` ✅ **COMPLETED**
  - **Reasoning:** Contains only a .DS_Store file and possibly an empty node_modules directory. Appears to be an empty or redundant directory and can be safely removed.

## Miscellaneous Files

- **Files:** ✅ **COMPLETED (except CLAUDE.md - kept as it contains project instructions)**
  - `CHAT_INITIALIZATION_FIX.md` ✅
  - `CLAUDE.md` (KEPT - contains important project instructions)
  - `CODE_BLOCK_STREAMING_FIXES.md` ✅
  - `CODE_EXECUTION_INTEGRATION.md` ✅
  - `GEMINI_LIVE_INTEGRATION.md` ✅
  - `MARKDOWN_FORMATTING_FIXES.md` ✅
  - `MARKDOWN_STYLING_IMPROVEMENTS.md` ✅
  - `QUICK_TEST.md` ✅
  - `REAL_GEMINI_LIVE_SETUP.md` ✅
  - `SCULPTOR_AI_SYSTEM_PROMPT.md` ✅
  - **Reasoning:** These markdown files appear to be temporary notes, documentation, or test files that are likely no longer relevant. They should be reviewed and likely removed.

- **File:** `public/pdf.worker.min.mjs` ✅ **COMPLETED**
  - **Reasoning:** Not referenced anywhere in the codebase, likely a leftover from a PDF viewer integration.

- **File:** `public/images/README.md` ✅ **COMPLETED**
  - **Reasoning:** This README file in the images directory is not referenced and serves no purpose in the application.

## Unused Components

- **Component:** `src/components/CodeBlockDebugger.jsx` ✅ **COMPLETED**
  - **Reasoning:** This component is not imported or used anywhere in the application. It seems to be a debugging tool that is no longer needed.

- **Component:** `src/components/CodeExecutionDemo.jsx` ✅ **COMPLETED**
  - **Reasoning:** This component is not imported or used anywhere in the application. It appears to be a demonstration component that is no longer needed.

- **Component:** `src/components/ImageGenerator.jsx` ✅ **COMPLETED**
  - **Reasoning:** This component is not imported or used anywhere in the application. It appears to be a standalone component that is not currently integrated.

- **Component:** `src/components/TextDiffusionAnimation.jsx` ✅ **COMPLETED**
  - **Reasoning:** This component is imported in `ChatMessage.jsx` but is not actually used. It can be removed.

## Bloated Files

- **File:** `src/components/ChatMessage.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** This is a massive 2000+ line component responsible for rendering all message types, including complex markdown parsing, LaTeX, code blocks, and tool calls. It also contains over 1000 lines of styled-components.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved all `styled-components` definitions to a separate `ChatMessage.styled.js` file. Reduced file from 2167 lines to 1371 lines (796 lines removed, 37% reduction).
    - **Create a Content Formatting Utility:** Move the complex markdown and LaTeX parsing functions into a dedicated utility file (e.g., `src/utils/contentFormatter.js`).
    - **Create Sub-components for Message Types:** Extract the rendering logic for different message types (`generated-image`, `deep-research`, `generated-flowchart`) into their own dedicated components.
    - **Simplify Action Buttons:** The message action buttons have placeholder `console.log` handlers that could be connected to functionality or simplified.

- **File:** `src/components/NewSettingsPanel.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** This component is over 1600 lines long, containing a large number of settings and complex state management logic. The file also defines many styled-components.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved all `styled-components` definitions to a separate `NewSettingsPanel.styled.js` file. Reduced file complexity and improved maintainability.
    - **Break Down into Smaller Components:** Split the settings panel into smaller, more manageable components, each handling a specific section of the settings (e.g., `ProfileSettings`, `ThemeSettings`, `MessageSettings`).
    - **Simplify State Management:** Consolidate related state into a more structured object or use a state management hook to simplify the logic.

- **File:** `src/components/Sidebar.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** At over 1300 lines, this component manages conversations, projects, and navigation, making it overly complex. It also has a large number of styled-components defined within the file.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved all 39 `styled-components` definitions to a separate `Sidebar.styled.js` file. Reduced file from 1301 lines to 519 lines (782 lines removed, 60% reduction).
    - **Create Sub-components:** Break down the sidebar into smaller components for conversation history, project management, and navigation controls.
    - **Separate Logic:** Extract the business logic for managing conversations and projects into custom hooks to simplify the component.

- **File:** `src/pages/NewsPage.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** This page component is over 1000 lines long and contains a mix of data fetching, state management, and rendering logic, along with many styled-components.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved all 42 `styled-components` definitions to a separate `NewsPage.styled.js` file. Reduced file from 1089 lines to 477 lines (612 lines removed, 56% reduction).
    - **Separate Data Fetching:** Move the article fetching and content loading logic into a custom hook (e.g., `useNewsData`).
    - **Create Smaller Components:** Break down the UI into smaller components for the category selector, article list, and article viewer.

- **File:** `src/components/SettingsModal.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** This component is nearly 1000 lines long and handles a wide variety of application settings. It defines all of its styled-components in the same file.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved all `styled-components` definitions to a separate `SettingsModal.styled.js` file. Reduced file from 987 lines to 511 lines (476 lines removed, 48% reduction).
    - **Component-Specific Settings:** Consider moving settings into the components they affect, where appropriate, to reduce the centralization of settings management.
    - **Break Down into Sections:** Split the settings into logical sections, each managed by a smaller sub-component.

- **File:** `src/App.jsx`
  - **Reasoning:** This is a monolithic component over 1100 lines long, responsible for managing the entire application's state, routing, and component orchestration. It has an excessive number of state variables, `useEffect` hooks, and a deeply nested return statement.
  - **Suggestions:**
    - **Extract State Management to Hooks:** Move the state and effects for chats, projects, and settings into their own custom hooks (e.g., `useChatState`, `useProjectState`, `useSettingsState`).
    - **Create a Modal Manager:** Use a dedicated context or component to manage the open/closed state of all modals and panels, removing that logic from the main app.
    - **Separate Routing:** Move the routing logic into a dedicated `AppRoutes.jsx` file to simplify the main component's render method.
    - **Move Utility Functions:** Relocate helper functions like `safeStringify` and `useIsMobile` to the `src/utils` directory.

- **File:** `src/components/ChatInputArea.jsx` ✅ **PARTIALLY COMPLETED (Styled-Components Extracted)**
  - **Reasoning:** At over 740 lines, this component is bloated with a mix of UI rendering, state management, and complex event handling. It manages a large number of state variables and receives over 30 props, making it tightly coupled and difficult to maintain.
  - **Suggestions:**
    - **Extract Styled-Components:** ✅ **COMPLETED** - Moved 19 `styled-components` definitions to a separate `ChatInputArea.styled.js` file. Component functionality remains exactly the same.
    - **Extract Action Chips Component:** Move the logic for rendering and managing action chips into a new `ActionChips.jsx` component.
    - **Create a Toolbar Component:** Extract the toolbar UI and logic into a dedicated `Toolbar.jsx` component.
    - **Use a Reducer for Input Modes:** Manage the various input modes (e.g., `isImagePromptMode`, `isFlowchartPromptMode`) with a `useReducer` hook to simplify state transitions.
    - **Consolidate Props:** Reduce the number of props by passing down a single context object or by using a more centralized state management solution.

- **File:** `src/styles/themes.js`
  - **Reasoning:** This file defines all application themes and a large, monolithic `GlobalStyles` component. There is significant code duplication across themes, and the global styles contain complex, theme-specific logic that makes it difficult to maintain.
  - **Suggestions:**
    - **Create a Base Theme:** Define a `baseTheme` with all common properties and have specific themes extend it to reduce code duplication.
    - **Split GlobalStyles:** Move theme-specific global styles (like the `retro` theme's UI) into separate files that can be conditionally imported.
    - **Introduce Design Tokens:** Replace hardcoded values with a system of design tokens for colors, fonts, and spacing to improve consistency and maintainability.

- **File:** `src/components/ChatWindow.styled.js` ✅ **PARTIALLY COMPLETED (Split into Component-Specific Files)**
  - **Reasoning:** At over 870 lines, this file has become a monolithic stylesheet for multiple components, including the chat window, input area, action chips, and toolbar. It contains mixed component styles, complex conditional styling, and redundant CSS.
  - **Suggestions:**
    - **Split into Multiple Files:** ✅ **COMPLETED** - Split ChatWindow.styled.js into component-specific files. Created `ChatInputArea.styled.js` for input-related components. Reduced ChatWindow.styled.js from ~872 lines to 174 lines.
    - **Create a Base Button Component:** Consolidate redundant button styles into a reusable `BaseButton` component that other buttons can extend.
    - **Refactor Conditional Styling:** Simplify the complex theme-specific logic (especially for the `retro` theme) by using `css` helpers or by creating theme-specific style objects.

- **Component:** `src/components/StreamingTypingAnimation.jsx` ✅ **COMPLETED**
  - **Reasoning:** No imports or usages found in the codebase.

### Unused Fonts

- **File:** `public/fonts/Segoe-UI.ttf` ✅ **COMPLETED**
  - **Reasoning:** Not referenced in any CSS files.

- **File:** `public/fonts/MSW98UI-Regular.ttf` ✅ **COMPLETED**
  - **Reasoning:** Not referenced in any CSS files.

### Unused Hooks

- **File:** `src/hooks/useMessageMender.js` ✅ **COMPLETED**
  - **Reasoning:** File is essentially empty (1 byte) and has no imports or usages in the codebase.

### Unused Prompts

- **File:** `src/prompts/test-system-prompt.js` ✅ **COMPLETED**
  - **Reasoning:** Imported only in `main.jsx` for console access, but not actively used in the application. Can be removed.

## Test Files

- **File:** `test-live-mode.html` ✅ **COMPLETED**
  - **Reasoning:** This appears to be a test file for live mode functionality. Not referenced anywhere and can be removed.

- **File:** `src/pages/WorkspacePage.jsx`
  - **Reasoning:** At over 900 lines, this is a monolithic component that contains the UI, state management, and business logic for the entire "Models" workspace. It mixes styled-components with logic and manages all state in a single file.
  - **Suggestions:**
    - **Extract Styled-Components:** Move all styled-components to `WorkspacePage.styled.js`.
    - **Create a `ModelCard` Component:** The UI for each model in the grid should be extracted into a `ModelCard.jsx` component.
    - **Create a `ModelEditorModal` Component:** The modal for creating and editing models should be moved to its own `ModelEditorModal.jsx` file, along with its form state and validation logic.
    - **Use a Custom Hook for Model Management:** The logic for fetching, creating, updating, and deleting models should be extracted into a `useCustomModels.js` hook.

- **File:** `src/hooks/useMessageSender.js`
  - **Reasoning:** This hook is over 600 lines long, with a monolithic `submitMessage` function that handles all message sending logic. It has mixed responsibilities, including UI side effects, and is tightly coupled to the components that use it due to excessive prop drilling.
  - **Suggestions:**
    - **Split the `submitMessage` Function:** Break down the `submitMessage` function into smaller, more focused functions for each message type (e.g., `handleImageGeneration`, `handleFlowchartCreation`, `handleDeepResearch`).
    - **Create Specialized Hooks:** Extract the logic for each message type into its own dedicated hook (e.g., `useImageGenerator`, `useFlowchartCreator`) to improve reusability and testing.
    - **Use a Reducer for Chat Actions:** Manage all chat-related actions with a `useReducer` hook to simplify state management and reduce prop drilling.
    - **Separate UI Concerns:** Move UI-related logic, such as showing alerts and scrolling, out of the hook and into the component layer.

- **File:** `src/pages/AdminPage.jsx`
  - **Reasoning:** This is a monolithic component over 800 lines long that contains the UI, state management, and business logic for the entire admin dashboard. It mixes styled-components with logic and manages all state in a single file.
  - **Suggestions:**
    - **Extract Styled-Components:** Move all styled-components to `AdminPage.styled.js`.
    - **Create a `UserTable` Component:** Extract the user table and its related logic into a `UserTable.jsx` component.
    - **Create a `UserEditModal` Component:** The modal for editing users should be moved to its own `UserEditModal.jsx` file.
    - **Use a Custom Hook for User Management:** The logic for fetching, updating, and filtering users should be extracted into a `useAdminUsers.js` hook.
    - **Move Helper Functions to Utilities:** Relocate the helper functions (`getAvatarInitials`, `formatDate`, etc.) to a separate utility file.

- **File:** `src/services/aiService.js`
  - **Reasoning:** At 600 lines, this service has become a monolithic hub for all AI-related functionality. The `sendMessageToBackendStream` function is over 300 lines long, and the file mixes responsibilities, including message sending, model fetching, and chat title generation.
  - **Suggestions:**
    - **Split `sendMessageToBackendStream`:** Break down the function into smaller, more focused functions for preparing the request, handling authentication, and processing the stream.
    - **Create Separate Services:** Split the functionality into multiple services based on concern (e.g., `messageService.js`, `modelService.js`, `titleService.js`).
    - **Centralize Authentication:** Move the repeated authentication logic into a dedicated `authService.js` or a utility module.
    - **Remove Hardcoded API Key:** The hardcoded fallback API key should be removed and replaced with a proper configuration management solution.

