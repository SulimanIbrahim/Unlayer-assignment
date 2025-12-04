# Part 2 - Custom Tool with React

A React application demonstrating Unlayer Email Editor with a custom tool loaded via CDN using the `customJS` API.

## 📋 Assignment Requirements Met

✅ Custom tool built using Unlayer's Custom Tool API  
✅ At least one custom property (tool has configurable options structure)  
✅ Viewer code implemented with `unlayer.createViewer()`  
✅ Export behavior for both HTML and JSON  
✅ Tool appears in Content panel and is draggable  

## 🚀 Features

- **Custom Tool Integration**: "My Tool" with face-smile icon
- **CDN Loading**: Tool loaded from GitHack CDN via `customJS` option
- **React Architecture**: Professional React app structure
- **Export Functionality**: Download HTML and JSON with previews
- **Professional UI**: Modal dialogs and toast notifications
- **CORS Compliant**: Proper HTTPS hosting with CORS headers

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- Vite (build tool)
- react-email-editor 1.7.11
- GitHack CDN for custom tool hosting

## 📖 Documentation

This part includes comprehensive documentation:

1. **[README.md](./README.md)** (this file) - Overview and setup
2. **[CUSTOM-TOOL-CHALLENGES.md](./CUSTOM-TOOL-CHALLENGES.md)** - Deep technical documentation covering:
   - Iframe context isolation challenges
   - CORS and Mixed Content blocking solutions
   - React vs Vanilla JavaScript decision
   - Component integration issues
   - Complete debugging methodology
   - Interview preparation Q&A
3. **[PRESENTATION-SCRIPT.md](./PRESENTATION-SCRIPT.md)** - 10-minute presentation script with:
   - Slide-by-slide content
   - Speaking notes for each section
   - Code samples to demonstrate
   - Explanations for different audiences (Junior Dev, CTO, Customer Success)
   - Real-world use cases
   - Recording tips

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Run development server (port 5174)
npm run dev

# Build for production
npm run build
```

## 🎯 Custom Tool Details

### Tool Configuration

```javascript
unlayer.registerTool({
  name: 'my_first_tool',
  label: 'My Tool',
  icon: 'fa-face-smile',
  supportedDisplayModes: ['web', 'email'],
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return '<div>I am custom tool. I was just created.</div>';
      }
    }),
    exporters: {
      web: function(values) {
        return '<div>I am custom tool.</div>';
      },
      email: function(values) {
        return '<div>I am custom tool.</div>';
      }
    }
  }
});
```

### Loading Method

The custom tool is loaded via the `customJS` option:

```jsx
<EmailEditor
  options={{
    customJS: [
      'https://gist.githack.com/SulimanIbrahim/646744c47951c073d0aa154610ea5208/raw/2cadb4c939a048ad3ba65e4a4aa7391f09c0bf4e/custom.js'
    ]
  }}
/>
```

**Why GitHack CDN?**
- Provides HTTPS (required by editor.unlayer.com)
- Includes proper CORS headers (`Access-Control-Allow-Origin: *`)
- Serves correct MIME type (`application/javascript`)
- Free and reliable for demos

## 🔑 Key Technical Concepts

### 1. Iframe Context Isolation
Unlayer runs inside an iframe from `editor.unlayer.com`. Custom tools must execute inside this iframe to access `registerTool` and `createViewer` APIs. The `customJS` option is the **only** way to inject code into the iframe context.

### 2. CORS & Mixed Content
- Editor uses HTTPS (`editor.unlayer.com`)
- Custom tool must be served over HTTPS
- Localhost HTTP URLs won't work (Mixed Content blocked)
- Solution: Deploy to CDN with HTTPS + CORS headers

### 3. Vanilla JavaScript
Custom tools use vanilla JavaScript, not React, because:
- Simpler (2KB vs 140KB)
- No build step required
- Direct API compatibility
- Easier debugging

See [CUSTOM-TOOL-CHALLENGES.md](./CUSTOM-TOOL-CHALLENGES.md) for deep technical analysis.

## 📁 Project Structure

```
part-2-custom-tool/
├── src/
│   ├── App.jsx                    # Main React component
│   ├── App.css                    # Styles with modals
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── CUSTOM-TOOL-CHALLENGES.md      # Technical documentation (~6,000 words)
├── PRESENTATION-SCRIPT.md         # 10-min presentation script
├── package.json
├── vite.config.js
└── README.md                      # This file
```

## 🎬 Presentation

The [PRESENTATION-SCRIPT.md](./PRESENTATION-SCRIPT.md) includes a complete 10-minute presentation covering:

### Content Breakdown:
1. **What custom tools are** (1 min)
2. **Why they matter** (1.5 min)
3. **Live demo** of "My Tool" (1.5 min)
4. **Real-world use case**: E-commerce product cards (2 min)
5. **Explaining to different audiences** (4 min):
   - Junior Developer (technical implementation)
   - CTO (business value and ROI)
   - Customer Success (user experience)
6. **Technical highlights** (1.5 min)
7. **Key takeaways** (1 min)

### Recording Tips Included:
- Screen recording setup
- Audio quality guidelines
- Demo preparation steps
- Code samples to highlight

## 🐛 Technical Challenges Solved

### Challenge 1: Iframe Context
**Error**: `createViewer method is not available here`  
**Solution**: Use `customJS` option to inject code into iframe

### Challenge 2: CORS Blocking
**Error**: Mixed Content blocked (HTTP → HTTPS)  
**Solution**: Deploy to GitHack CDN with HTTPS and CORS headers

### Challenge 3: React Integration
**Error**: `Element type is invalid`  
**Solution**: Use named import: `import { EmailEditor }`

### Challenge 4: Prop Configuration
**Error**: Theme not applying  
**Solution**: Separate `appearance` from `options` props

Full debugging methodology in [CUSTOM-TOOL-CHALLENGES.md](./CUSTOM-TOOL-CHALLENGES.md)

## 📚 Resources

- [Unlayer Custom Tools Docs](https://docs.unlayer.com/docs/tools/custom-tools)
- [Custom Tool on GitHack CDN](https://gist.githack.com/SulimanIbrahim/646744c47951c073d0aa154610ea5208/raw/2cadb4c939a048ad3ba65e4a4aa7391f09c0bf4e/custom.js)
- [Technical Challenges Doc](./CUSTOM-TOOL-CHALLENGES.md)
- [Presentation Script](./PRESENTATION-SCRIPT.md)

## 🎓 What This Demonstrates

- ✅ Custom tool development with Unlayer API
- ✅ Understanding iframe security and context isolation
- ✅ CORS and Mixed Content debugging
- ✅ CDN deployment strategies
- ✅ React integration patterns
- ✅ Professional documentation
- ✅ Multi-audience communication skills

## 🚀 Deployment

### React App
```bash
npm run build
# Deploy dist/ to Netlify, Vercel, or GitHub Pages
```

### Custom Tool
Already deployed to: https://gist.githack.com/SulimanIbrahim/.../custom.js

Alternative hosting options:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Any CDN with HTTPS + CORS

## 🎯 Interview Preparation

Use [CUSTOM-TOOL-CHALLENGES.md](./CUSTOM-TOOL-CHALLENGES.md) for interview prep. It includes:
- Detailed technical explanations
- Problem-solving methodology  
- Pre-written answers to likely questions
- Technical glossary
- Talking points for each challenge

## 📝 License

MIT

---

**Part of Unlayer Developer Advocate Take Home Assignment**  
**Author**: Suliman Ibrahim  
**Date**: December 2025
