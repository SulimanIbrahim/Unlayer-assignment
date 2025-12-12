# Unlayer Email Editor Integration Tutorial

## Introduction

This tutorial walks you through building a complete email editor web application using Unlayer's Email Editor. By the end, you'll have a fully functional editor with save/load capabilities, export features, and custom configurations.

**What You'll Build:**
- A React application with Unlayer Email Editor
- Save and export functionality (HTML + JSON)
- Load sample templates
- Visual save indicator using events
- Custom merge tags for personalization

**Prerequisites:**
- Node.js 18+ installed
- Basic knowledge of React and TypeScript
- Familiarity with npm/package managers

**Time to Complete:** ~30 minutes

---

## Setup Steps

### 1. Initialize Your Project

First, create a new Vite project with React and TypeScript:

```bash
npm create vite@latest unlayer-demo -- --template react-ts
cd unlayer-demo
npm install
```

Or if you're using the provided project structure, simply run:

```bash
make
```

This will install all dependencies and start the development server.

### 2. Install Dependencies

Install the Unlayer React Email Editor package:

```bash
npm install react-email-editor
```

Or if using the Makefile:

```bash
make install
```

This package provides a React wrapper around Unlayer's editor, making integration seamless.

### 3. Project Structure

Your project should have this structure:

```
unlayer-demo/
├── src/
│   ├── App.tsx          # Main component
│   ├── App.css          # Styles
│   ├── sample.ts        # Sample template
│   └── main.tsx         # Entry point
├── package.json
└── vite.config.ts
```

---

## Implementation

### Step 1: Create the Sample Template

Create `src/sample.ts` with a basic email template:

```typescript
const SAMPLE_TEMPLATE = {
  counters: {
    u_column: 1,
    u_row: 1,
    u_content_text: 1
  },
  body: {
    id: "sample_body",
    rows: [
      {
        id: "sample_row",
        cells: [1],
        columns: [
          {
            id: "sample_column",
            contents: [
              {
                id: "sample_text",
                type: "text",
                values: {
                  containerPadding: "10px",
                  text: "<h1>Welcome to Unlayer!</h1><p>This is a sample email template.</p>"
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

export default SAMPLE_TEMPLATE;
```

**Why this format?** Unlayer uses a JSON structure to represent email designs. The `counters` track component IDs, `body` contains the layout (rows and columns), and `contents` define individual elements.

### Step 2: Build the Main Component

Create `src/App.tsx`:

```typescript
import React, { useRef, useState, useEffect } from 'react';
import { EmailEditor, EditorRef, EmailEditorProps } from 'react-email-editor';
import SAMPLE_TEMPLATE from './sample';
import './App.css';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

const App: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast notification helper
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Initialize editor when ready
  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log('Email editor ready');
    
    // Track unsaved changes
    unlayer?.addEventListener('design:updated', () => {
      setHasUnsavedChanges(true);
    });
  };

  return (
    <div className="app-container">
      {/* Your UI components here */}
    </div>
  );
};

export default App;
```

**Key Concepts:**
- `useRef<EditorRef>`: Provides access to the editor instance
- `onReady` callback: Fires when editor loads, perfect for event listeners
- `design:updated` event: Detects any changes to the design

### Step 3: Implement Save Design

Add the save functionality to persist designs to localStorage:

```typescript
const handleSaveToLocal = () => {
  const unlayer = emailEditorRef.current?.editor;
  
  unlayer?.saveDesign((design: any) => {
    localStorage.setItem('email-template', JSON.stringify(design));
    setHasUnsavedChanges(false);
    showToast('Design saved successfully!', 'success');
  });
};
```

**Why localStorage?** For this demo, localStorage provides simple client-side persistence. In production, you'd save to a database via API.

### Step 4: Implement Export HTML

Add HTML export with download capability:

```typescript
const handleDownloadHTML = () => {
  const unlayer = emailEditorRef.current?.editor;
  
  unlayer?.exportHtml((data) => {
    const { html } = data;
    
    // Create downloadable file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-design-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('HTML downloaded successfully!', 'success');
  });
};
```

**The Process:**
1. `exportHtml()` generates production-ready HTML
2. Create a Blob (binary data) from the HTML string
3. Generate a temporary download URL
4. Programmatically trigger download
5. Clean up the temporary URL

### Step 5: Implement Load Sample

Load pre-made templates into the editor:

```typescript
const handleLoadSample = () => {
  const unlayer = emailEditorRef.current?.editor;
  
  try {
    unlayer?.loadDesign(SAMPLE_TEMPLATE as any);
    setHasUnsavedChanges(false);
    showToast('Sample template loaded!', 'success');
  } catch (error) {
    console.error('Error loading sample:', error);
    showToast('Failed to load sample template', 'error');
  }
};
```

### Step 6: Configure the Editor

Add the EmailEditor component with customizations:

```typescript
<EmailEditor 
  ref={emailEditorRef} 
  onReady={onReady}
  minHeight={'calc(100vh - 80px)'}
  options={{
    displayMode: 'email',
    appearance: {
      panels: {
        tools: { dock: 'left' }
      }
    },
    features: {
      preview: true, 
    },
    mergeTags: {
      first_name: {
        name: 'First Name',
        value: '{{first_name}}',
      },
      last_name: {
        name: 'Last Name',
        value: '{{last_name}}',
      },
      email: {
        name: 'Email Address',
        value: '{{email}}',
      },
      company: {
        name: 'Company Name',
        value: '{{company}}',
      },
      phone: {
        name: 'Phone Number',
        value: '{{phone}}',
      },
    },
  }}
/>
```

**Configuration Explained:**
- `displayMode: 'email'`: Optimizes for email vs web
- `appearance.panels.tools.dock`: Position of tools panel
- `features.preview`: Enable preview mode
- `mergeTags`: Custom variables for personalization (e.g., {{first_name}})

### Step 7: Build the UI

Add action buttons:

```typescript
<div className="header">
  <h1>Email Designer</h1>
  
  <div className="button-group">
    <button onClick={handleLoadSample}>
      Load Sample Design
    </button>
    
    <button 
      onClick={handleSaveToLocal}
      className={hasUnsavedChanges ? 'btn-unsaved' : ''}
    >
      Save Design
      {hasUnsavedChanges && <span className="unsaved-indicator">●</span>}
    </button>
    
    <button onClick={handleDownloadHTML}>
      Download HTML
    </button>
  </div>
</div>
```

**Visual Feedback:** The unsaved indicator (●) appears when `hasUnsavedChanges` is true, leveraging the `design:updated` event.

---

## Issues Encountered and Solutions

### Issue 1: Editor Not Rendering Properly

**Problem:** When I first integrated the EmailEditor component, it appeared as a small box instead of filling the viewport.

**Error Symptoms:**
- Editor loaded but was unusable
- Content clipped or scrolling issues
- Header buttons overlapping editor

**Root Cause:** The EmailEditor component needs explicit height constraints. By default, it doesn't expand to fill available space.

**Solution:**

```css
/* App.css */
#root {
  width: 100vw;
  height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

```typescript
// App.tsx
<EmailEditor 
  minHeight={'calc(100vh - 80px)'}  // 80px for header
  // ...other props
/>
```

**Key Takeaway:** Always set explicit dimensions for embedded editors. Use flexbox to create fluid layouts and `calc()` for precise calculations.

### Issue 2: TypeScript Errors with Editor Ref

**Problem:** TypeScript complained about accessing the editor instance through refs.

**Error Message:**
```
Property 'editor' does not exist on type 'EditorRef | null'
```

**Root Cause:** The ref could be `null` before the editor initializes, and TypeScript's strict null checks caught this.

**Solution:**

```typescript
// ❌ Wrong - doesn't handle null
const unlayer = emailEditorRef.current.editor;

// ✅ Correct - uses optional chaining
const unlayer = emailEditorRef.current?.editor;

// Then use optional chaining for methods too
unlayer?.saveDesign((design) => {
  // ...
});
```

**Additional Fix:** Import correct types:

```typescript
import { EmailEditor, EditorRef, EmailEditorProps } from 'react-email-editor';

const emailEditorRef = useRef<EditorRef>(null);
```

**Key Takeaway:** Always handle null cases with optional chaining (`?.`) when working with refs in React. Import type definitions to get proper TypeScript support.

---

## Troubleshooting

### Editor Shows Loading Spinner Forever

**Symptoms:** Editor never fully initializes, spinner keeps spinning.

**Possible Causes:**
1. Network issue loading Unlayer CDN
2. Ad blocker blocking editor.unlayer.com
3. Browser console shows CORS errors

**Solutions:**
- Check browser DevTools → Network tab for failed requests
- Temporarily disable ad blockers
- Ensure you have internet connection
- Try a different browser

### Save/Export Functions Not Working

**Symptoms:** Clicking buttons does nothing or throws errors.

**Debugging Steps:**

```typescript
const unlayer = emailEditorRef.current?.editor;

// Add logging
console.log('Editor instance:', unlayer);

if (!unlayer) {
  console.error('Editor not initialized yet!');
  return;
}
```

**Common Fixes:**
- Ensure `onReady` has fired before calling methods
- Check that ref is properly attached to EmailEditor
- Verify button onClick handlers are correctly bound

### Merge Tags Not Appearing

**Symptoms:** Custom merge tags don't show in the editor.

**Check Your Configuration:**

```typescript
// Make sure mergeTags is inside options, not appearance
options={{
  mergeTags: {
    // your tags here
  }
}}
```

**Verify Usage:**
1. Click any text element in editor
2. Look for "Merge Tags" dropdown in properties panel
3. Your custom tags should appear in the list

### Design:Updated Event Not Firing

**Symptoms:** Save indicator never shows up.

**Solution:** Ensure event listener is added in `onReady`:

```typescript
const onReady: EmailEditorProps['onReady'] = (unlayer) => {
  console.log('Adding event listener');
  
  unlayer?.addEventListener('design:updated', () => {
    console.log('Design updated!');
    setHasUnsavedChanges(true);
  });
};
```

If you see "Adding event listener" but not "Design updated!", check:
- Make changes in the editor (drag elements, edit text)
- Verify your React version supports the callback pattern

---

## Running Your Application

This project includes a Makefile for easy command execution.

### Quick Start (Install + Run)

```bash
make
```

This single command will install dependencies and start the development server.

### Development Mode

```bash
make dev
```

Or using npm directly:
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Install Dependencies Only

```bash
make install
```

### Production Build

```bash
make build
```

Or using npm:
```bash
npm run build
npm run preview
```

The build output goes to the `dist/` folder, ready for deployment.

---

## Next Steps

Now that you have a working editor, consider these enhancements:

1. **Add User Authentication**: Save designs per user with a backend
2. **Template Library**: Create a gallery of pre-made templates
3. **Team Collaboration**: Allow multiple users to edit designs
4. **A/B Testing**: Create variants of emails for testing
5. **Custom Tools**: Build domain-specific components (Part 2 of this assignment!)

---

## Key Concepts Recap

- **EditorRef**: React reference to access Unlayer instance imperatively
- **saveDesign()**: Exports JSON representation of design
- **exportHtml()**: Generates production-ready HTML
- **loadDesign()**: Loads JSON design into editor
- **design:updated**: Event fired when user makes changes
- **mergeTags**: Dynamic variables for email personalization

---

## Resources

- [Unlayer Documentation](https://docs.unlayer.com/)
- [React Email Editor GitHub](https://github.com/unlayer/react-email-editor)
- [Working Demo Code](https://github.com/SulimanIbrahim/Unlayer-assignment)

---

## Conclusion

You've successfully built a complete email editor integration! You learned how to:
- Initialize and configure Unlayer Email Editor
- Implement save/load functionality
- Export production-ready HTML
- Handle events for UI feedback
- Debug common integration issues

This foundation prepares you for advanced features like custom tools (covered in Part 2) and building production email platforms.

**Questions?** Check the [Unlayer documentation](https://docs.unlayer.com/) or open an issue on GitHub.

---

**Author:** Suliman Ibrahim  
**Last Updated:** December 3, 2025
