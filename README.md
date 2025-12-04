# Unlayer Email Editor - Complete Integration & Custom Tools

A comprehensive demonstration of Unlayer Email Editor integration, featuring both basic implementation and advanced custom tool development.

**Author:** Suliman Ibrahim  
**Date:** December 2025  
**Repository:** [github.com/SulimanIbrahim/Unlayer-assignment](https://github.com/SulimanIbrahim/Unlayer-assignment)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Part 1: Email Editor Integration](#part-1-email-editor-integration)
- [Part 2: Custom Tool Development](#part-2-custom-tool-development)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Running the Projects](#running-the-projects)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Documentation](#documentation)
- [License](#license)

---

## 🎯 Overview

This repository contains two complete projects demonstrating Unlayer Email Editor capabilities:

1. **Part 1**: Basic integration with save/load/export functionality
2. **Part 2**: Advanced custom tool development (Golden Ticket coupon component)

Both projects showcase production-ready implementations with comprehensive documentation, tutorials, and real-world problem-solving.

---

## 📁 Project Structure

```
```
Unlayer-assignment/
├── README.md                          ← Main entry point (NEW!)
├── part-1-integration/
│   ├── TUTORIAL.md                    ← Updated with Makefile
│   └── README.md
└── part-2-custom-tool/
    ├── README.md
    └── CUSTOM-TOOL-CHALLENGES.md
```

---

## 🚀 Part 1: Email Editor Integration

A complete React + TypeScript application demonstrating Unlayer Email Editor integration.

### Features

✅ **Full Editor Integration** - Unlayer Email Editor embedded in React  
✅ **Save/Load Functionality** - Persist designs to localStorage  
✅ **HTML Export** - Download production-ready HTML emails  
✅ **JSON Export** - Save design JSON for later editing  
✅ **Sample Templates** - Pre-built email templates to get started  
✅ **Unsaved Changes Indicator** - Visual feedback for pending changes  
✅ **Custom Merge Tags** - Personalization variables (name, email, etc.)  
✅ **Toast Notifications** - User-friendly success/error messages  

### Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **react-email-editor** package
- **CSS3** for styling

### What You'll Learn

- How to integrate Unlayer Editor in React
- Working with editor refs and TypeScript types
- Implementing save/export functionality
- Handling editor events
- Configuring merge tags and appearance

📖 **[Read Full Tutorial](./part-1-integration/TUTORIAL.md)**

---

## 🎨 Part 2: Custom Tool Development

An advanced project demonstrating custom tool creation with the **Golden Ticket** coupon component.

### Features

✅ **Custom Golden Ticket Tool** - Premium coupon component for promotional emails  
✅ **Fully Customizable** - Edit company name, coupon code, discount, expiry date  
✅ **Color Customization** - Gold accent, background, and text colors  
✅ **Interactive Design** - Hover effects and transitions  
✅ **Google Fonts Integration** - Elegant Playfair Display typography  
✅ **Email-Safe HTML** - Inline styles for maximum compatibility  
✅ **CDN Deployment** - Hosted on GitHub Gist with GitHack  

### The Golden Ticket Tool

A luxury-styled coupon card featuring:

- Company branding header
- Large discount text (e.g., "25% OFF")
- Prominent coupon code display
- Expiry date footer
- Click-through URL support
- Gradient backgrounds
- Metallic gold accents
- Mobile-responsive design

### Tech Stack

- **React 18** with JavaScript
- **Vite** for fast development
- **Unlayer Custom Tools API**
- **GitHub Gist** for tool hosting
- **GitHack CDN** for HTTPS delivery

### What You'll Learn

- How to register custom tools with Unlayer
- Defining configuration options (text, colors, URLs)
- Building template functions with dynamic values
- Handling iframe context and CORS
- Email-safe HTML/CSS best practices
- Deploying custom tools via CDN

📖 **[Read Custom Tool Documentation](./part-2-custom-tool/README.md)**  
📖 **[Technical Challenges & Solutions](./part-2-custom-tool/CUSTOM-TOOL-CHALLENGES.md)**

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **make** (optional, for simplified commands)

### Clone the Repository

```bash
git clone https://github.com/SulimanIbrahim/Unlayer-assignment.git
cd Unlayer-assignment
```

### Run Part 1 (Integration)

```bash
cd part-1-integration
make
```

The app will open at `http://localhost:5173`

### Run Part 2 (Custom Tool)

```bash
cd part-2-custom-tool
make
```

The app will open at `http://localhost:5174`

---

## 📦 Installation

### Using Makefile (Recommended)

Both projects include Makefiles for streamlined commands:

```bash
# Install dependencies and start dev server
make

# Install dependencies only
make install

# Start development server
make dev

# Build for production
make build
```

### Using npm Directly

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🏃 Running the Projects

### Part 1: Email Editor Integration

```bash
cd part-1-integration
make
```

**Available Commands:**

| Command | Description |
|---------|-------------|
| `make` | Install dependencies and start dev server |
| `make install` | Install dependencies only |
| `make dev` | Start development server |
| `make build` | Build for production |

**What to Try:**

1. Click "Load Sample Design" to load a template
2. Edit text, add images, customize colors
3. Click "Save Design" to persist to localStorage
4. Click "Download HTML" to export production HTML
5. Click "Download JSON" to export design JSON
6. Use merge tags in text elements (e.g., {{first_name}})

### Part 2: Custom Tool Development

```bash
cd part-2-custom-tool
make
```

**Available Commands:** (Same as Part 1)

**What to Try:**

1. Find "Golden Ticket" in the Content panel (left sidebar)
2. Drag it onto the canvas
3. Click on the ticket to open properties panel (right sidebar)
4. Customize:
   - Company Name
   - Coupon Code
   - Discount Offer
   - Expiry Date
   - Link URL
   - Gold Accent color
   - Background color
   - Text color
5. Click "Preview" to see how it renders
6. Click "Download HTML" to export

---

## 🛠️ Technologies Used

### Frontend

- **React** 18 - Component-based UI framework
- **TypeScript** (Part 1) - Type-safe JavaScript
- **JavaScript** (Part 2) - Dynamic scripting
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling

### Libraries & APIs

- **react-email-editor** - Official Unlayer React wrapper
- **Unlayer Email Editor** - Drag-and-drop email builder
- **Unlayer Custom Tools API** - Custom component framework

### Development Tools

- **ESLint** - Code linting
- **Make** - Build automation
- **Git** - Version control
- **GitHub Gist** - Tool hosting
- **GitHack CDN** - HTTPS delivery

---

## ✨ Key Features

### Part 1 Highlights

- **TypeScript Integration** - Full type safety with EditorRef
- **Event Handling** - Real-time design:updated events
- **LocalStorage Persistence** - Client-side design storage
- **File Downloads** - Programmatic HTML/JSON exports
- **Toast Notifications** - Elegant user feedback
- **Merge Tag System** - Dynamic email personalization
- **Sample Templates** - Quick-start designs

### Part 2 Highlights

- **Custom Tool Registration** - unlayer.registerTool() API
- **Configuration Options** - Text inputs, color pickers, URL fields
- **Dynamic Rendering** - Template literals with value injection
- **Google Fonts** - @import for custom typography
- **CSS Transitions** - Hover and active states
- **Inline Styles** - Email client compatibility
- **CDN Deployment** - GitHub Gist + GitHack hosting
- **CORS Handling** - Proper HTTPS delivery

---

## 📚 Documentation

Each part includes comprehensive documentation:

### Part 1 Documentation

- **[TUTORIAL.md](./part-1-integration/TUTORIAL.md)** - Complete step-by-step guide
  - Setup instructions
  - Implementation walkthrough
  - Issues encountered and solutions
  - Troubleshooting guide
  - Key concepts explained

### Part 2 Documentation

- **[README.md](./part-2-custom-tool/README.md)** - Project overview and setup
- **[CUSTOM-TOOL-CHALLENGES.md](./part-2-custom-tool/CUSTOM-TOOL-CHALLENGES.md)** - Technical challenges
  - Problems encountered
  - Solutions implemented
  - Lessons learned

---

## 🎓 Learning Outcomes

By exploring this repository, you'll learn:

### Basic Skills

- Integrating third-party editors in React
- Working with refs and imperative APIs
- Handling file downloads in the browser
- Using localStorage for persistence
- Event-driven UI updates

### Advanced Skills

- Building custom Unlayer tools from scratch
- Iframe context and scope management
- CORS policy handling
- CDN deployment strategies
- Email HTML best practices
- Template literal rendering
- Dynamic value injection

### Professional Skills

- Writing comprehensive documentation
- Debugging integration issues
- Performance optimization
- Production deployment considerations
- Technical presentation skills

---

## 🐛 Common Issues & Solutions

### Issue: Editor Not Loading

**Solution:** Check network tab for blocked requests. Disable ad blockers.

### Issue: Custom Tool Not Appearing

**Solution:** Verify HTTPS URL in customJS option. Check browser console for errors.

### Issue: Properties Not Editable

**Solution:** Ensure `values` object is defined in tool registration.

### Issue: TypeScript Errors

**Solution:** Import `EditorRef` type from react-email-editor and use optional chaining.

See full troubleshooting guides in individual TUTORIAL.md files.

---

## 📝 Project Highlights

### Problem-Solving Examples

1. **Editor Height Issues** - Solved with flexbox and calc() for responsive layouts
2. **TypeScript Null Safety** - Implemented optional chaining for ref access
3. **CORS Restrictions** - Deployed custom tools via GitHack CDN
4. **Widget Type Errors** - Fixed invalid 'url' widget by using 'text'
5. **Value Access** - Corrected nested options/values structure

### Code Quality

- ✅ Clean, readable code with comments
- ✅ Proper error handling
- ✅ Type safety (Part 1)
- ✅ Responsive design
- ✅ Production-ready implementations

---

## 🚀 Deployment

### Part 1 Deployment

```bash
cd part-1-integration
make build
```

Deploy the `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Part 2 Deployment

**App Deployment:** Same as Part 1

**Custom Tool Deployment:**
1. Create GitHub Gist with custom.js
2. Get raw URL from Gist
3. Convert to GitHack CDN URL
4. Update customJS option in App.jsx

---

## 📄 License

This project is created as a demonstration for educational purposes.

---

## 🤝 Contributing

This is a demonstration project, but feedback and suggestions are welcome!

---

## 📞 Contact

**Suliman Ibrahim**

- GitHub: [@SulimanIbrahim](https://github.com/SulimanIbrahim)


---

## 🙏 Acknowledgments

- **Unlayer** - For providing an excellent email editor and comprehensive documentation
- **React Email Editor** - For the official React wrapper
- **Vite** - For blazing-fast development experience

---

## 📖 Additional Resources

- [Unlayer Documentation](https://docs.unlayer.com/)
- [Unlayer Custom Tools Guide](https://docs.unlayer.com/docs/custom-tools)
- [React Email Editor GitHub](https://github.com/unlayer/react-email-editor)
- [Vite Documentation](https://vitejs.dev/)

---

**Made with ❤️ by Suliman Ibrahim**

*Last Updated: December 4, 2025*
