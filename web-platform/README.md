# AI-Assisted Coding Platform

A revolutionary web platform that provides verbal coding with AI assistance, instant preview and code adjustment, and automatic deployment to web and mobile devices.

## Features

### 📁 Project File Explorer
- **File Tree View**: Browse your project's file hierarchy in real-time
- **Flutter Support**: Specifically designed to navigate Flutter project structures
- **Syntax Highlighting**: Different icons for various file types (Dart, YAML, JSON, etc.)
- **Expand/Collapse**: Interactive tree navigation with folder expansion
- **One-Click Load**: Click any file to load it directly into the code editor
- **Server Connection**: Real-time connection status indicator

### 🎤 Verbal Coding with AI Assistance
- **Voice Commands**: Use natural language to generate code
- **Speech Recognition**: Built-in Web Speech API integration
- **AI Code Generation**: Simulated AI service for code generation (extensible to OpenAI, Anthropic, etc.)
- **Real-time Feedback**: Visual indicators for listening and processing states

### ⚡ Instant Preview & Code Adjustment
- **Monaco Editor**: Professional code editor with syntax highlighting
- **Multiple Languages**: Support for JavaScript, TypeScript, Python, HTML, Dart, and more
- **Live Editing**: Real-time code modification
- **Code Preview**: Instant preview of your code output

### 🚀 Auto-Deployment
- **Web Deployment**: One-click deployment to web platforms
- **Mobile Deployment**: Progressive Web App (PWA) support
- **Download**: Export your code as files
- **Multi-Platform**: Deploy to web and mobile simultaneously

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm 10+
- Modern web browser with Speech Recognition support (Chrome, Edge, or Safari)

### Installation

```bash
cd web-platform
npm install
```

### Development

```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Express) servers:
- **Frontend**: Available at `http://localhost:5173`
- **Backend API**: Running at `http://localhost:3001`

The file explorer requires both servers to be running.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### File Explorer

1. The file explorer panel is on the left side of the interface
2. It displays your project's file hierarchy in real-time
3. Click on folders to expand/collapse them
4. Click on any file to load it into the code editor
5. The connection status indicator shows if the backend server is running
6. Supports Flutter projects with proper syntax highlighting for Dart files

**Supported File Types:**
- Dart (`.dart`) - Flutter source files
- YAML (`.yaml`, `.yml`) - Configuration files like `pubspec.yaml`
- JSON (`.json`) - Configuration and data files
- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- Python (`.py`)
- HTML/CSS (`.html`, `.css`)
- Markdown (`.md`)
- Images (`.png`, `.jpg`, `.svg`, etc.)

### Voice Coding

1. Click the "Start Voice Command" button
2. Speak your coding request (e.g., "Create a hello world function")
3. The AI will generate code based on your command
4. The code will automatically appear in the editor

### Example Voice Commands

- "Create a hello world function"
- "Make a button with click handler"
- "Create a React component"
- "Write a fetch API example"
- "Create a Python class"

### Code Editing

- Edit the generated code directly in the Monaco editor
- The editor supports syntax highlighting for multiple languages
- Use the language selector to switch between JavaScript, TypeScript, Python, HTML, and more
- Files loaded from the explorer automatically set the correct language mode

### Preview & Run

- Click "Run & Preview" to see your code in action
- The code will open in a new window with proper execution

### Deployment

- **Deploy Web**: Deploy your code to a web hosting service
- **Deploy Mobile**: Create a PWA version for mobile devices
- **Download**: Save your code as a file

## Architecture

### Components

- **FileExplorer**: Interactive file tree viewer with real-time updates
- **VoiceInput**: Handles speech recognition and voice commands
- **CodeEditor**: Monaco-based code editor with toolbar
- **Header**: Application header with language selector
- **FileService**: API client for file system operations
- **AIService**: Simulated AI code generation service
- **DeploymentService**: Handles deployment to various platforms

### Backend API

The backend server (Express.js) provides the following endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/files?path=<path>` - Get file tree structure
- `GET /api/file-content?path=<path>` - Get file content

### Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Express.js**: Backend API server for file system operations
- **Node.js**: Server runtime
- **Monaco Editor**: Professional code editor
- **Web Speech API**: Voice recognition
- **Lucide React**: Beautiful icons

## Future Enhancements

- Integration with real AI services (OpenAI, Anthropic, etc.)
- Code collaboration features
- Version control integration
- Advanced deployment options (Vercel, Netlify, AWS)
- Mobile app development (React Native, Flutter)
- Code templates and snippets
- Project management
- User authentication
- Cloud storage

## Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Voice Recognition | ✅ | ✅ | ✅ | ❌ |
| Code Editor | ✅ | ✅ | ✅ | ✅ |
| Deployment | ✅ | ✅ | ✅ | ✅ |

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
