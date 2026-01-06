# Description

This is a personal project to create a custom rich text editor for React using Slate.

# Roadmap

## Simple, low cost:
- [ ] Headings (H1, H2, H3):
- [ ] Lists (Bulleted & Numbered)
- [ ] Links
- [ ] Blockquotes
- [ ] Video Embeds
- [ ] File Attachments
- [ ] Drag and Drop
- [ ] Tables

## Advanced, potentially high cost: 
- [ ] Floating/Bubble Menu: Instead of a fixed toolbar at the top, show a small menu near the text selection (like Medium or Notion).
- [ ] Slash Commands: Implement a / listener to allow users to insert blocks without leaving the keyboard.
- [ ] Placeholder Text: Show a "Type / to browse blocks..." prompt when a line is empty.
- [ ] Markdown Shortcuts: Auto-transform text as the user types (e.g., typing # at the start of a line automatically turns it into an H1).
- [ ] Auto-save & Debouncing: Syncing the state to a database (like Supabase or Firebase) without lagging the UI.
- [ ] Collaborative Editing (CRDTs): Use a library like Yjs or Automerge to allow multiple users to edit the same document in real-time (Google Docs style).
- [ ] Export Options: A "Print to PDF" feature or a "Copy as Markdown" utility.

# Screenshots

![screenshot_1](./screenshots/ss1.png)
