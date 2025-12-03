# Part 2 - Custom Tool with React

This React application demonstrates how to integrate Unlayer Email Editor with a custom tool loaded via the `customJS` option.

## Key Concepts

### Custom Tool Loading
The custom tool is loaded from a GitHack CDN URL via the `customJS` option:

```jsx
<EmailEditor
  options={{
    customJS: [
      'https://gist.githack.com/SulimanIbrahim/646744c47951c073d0aa154610ea5208/raw/2cadb4c939a048ad3ba65e4a4aa7391f09c0bf4e/custom.js'
    ]
  }}
/>
```

### Why This Works
- The `customJS` option injects scripts into Unlayer's iframe context
- The custom tool script has access to `unlayer.registerTool()` and `unlayer.createViewer()`
- Using a CDN (GitHack) solves CORS issues (HTTPS + proper headers)
- React manages the editor component while the custom tool runs in the iframe

## Setup

```bash
# Install dependencies
npm install

# Run development server (port 5174)
npm run dev

# Build for production
npm run build
```

## Features

- ✅ React component structure for maintainability
- ✅ Custom tool loaded via `customJS` from CDN
- ✅ Export HTML functionality
- ✅ Save design functionality
- ✅ Modern UI with action buttons
- ✅ Consistent with Part 1 structure

## Architecture

```
React App (localhost:5174)
└── EmailEditor Component
    └── Unlayer Iframe (editor.unlayer.com)
        └── Custom Tool (loaded via customJS from GitHack CDN)
```

The key difference from Part 1:
- Part 1: Basic integration with default tools
- Part 2: Custom tool injection via `customJS` option

## Custom Tool

The custom tool "My Tool" appears in the Content panel with a face-smile icon and can be dragged into email templates.

Custom tool source: https://gist.githack.com/SulimanIbrahim/646744c47951c073d0aa154610ea5208/raw/2cadb4c939a048ad3ba65e4a4aa7391f09c0bf4e/custom.js
