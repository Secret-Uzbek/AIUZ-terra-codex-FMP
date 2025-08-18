# React Component Export

This ZIP file contains the exported React component from your Hatch canvas.

## Files:
- component.jsx: The main React component source code
- component.js: The compiled/executable JavaScript version
- index.html: Ready-to-run HTML file with fallback inline code and data
- storedState.json: Initial state data


## Quick Start:
1. **Immediate Preview**:
   - **File mode**: Double-click `index.html` - works locally with file:// URLs!
   - **Server mode**: Serve from a local web server for cleaner file separation:
     - `python -m http.server 8000`
     - `npx serve .`
     - `php -S localhost:8000`

2. **Development Setup**:

## Usage:
```jsx
import Component from './component';

function App() {
  return <Component />;
}
```

## Hatch Runtime Features:
The exported component includes support for Hatch's `useStoredState` hook:
- `useStoredState(key, defaultValue)` - Persistent state storage using localStorage
- Loads external files when served from a web server
- Falls back to inline data for file:// URLs
- State persists across browser sessions

The `index.html` file provides a complete Hatch-compatible runtime environment that works both when served from a web server (using external files) and when opened directly as file:// URLs (using inline fallbacks).

Generated on: 01.08.2025, 09:08:32
