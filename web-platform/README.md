# AI-Assisted Coding Platform

A revolutionary web platform that provides verbal coding with AI assistance, instant preview and code adjustment, and automatic deployment to web and mobile devices.

## Features

### 🎤 Verbal Coding with AI Assistance
- **Voice Commands**: Use natural language to generate code
- **Speech Recognition**: Built-in Web Speech API integration
- **AI Code Generation**: Simulated AI service for code generation (extensible to OpenAI, Anthropic, etc.)
- **Real-time Feedback**: Visual indicators for listening and processing states

### ⚡ Instant Preview & Code Adjustment
- **Monaco Editor**: Professional code editor with syntax highlighting
- **Multiple Languages**: Support for JavaScript, TypeScript, Python, and HTML
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

### Configuration

#### AI Model Selection

The platform supports multiple AI models:

1. **Simulated AI (Demo)**: Default mode with pre-defined code templates
2. **DeepSeek**: Integration with DeepSeek LLM API

To use DeepSeek integration:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your DeepSeek API credentials in `.env`:
   ```
   VITE_DEEPSEEK_API=https://api.deepseek.com/v1/chat/completions
   VITE_DEEPSEEK_KEY=your_api_key_here
   ```

**Security Note**: API keys configured via environment variables are embedded in the client-side code and exposed in the browser. For production use, consider implementing a backend proxy to securely handle API calls and protect your credentials.

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

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

### Voice Coding

1. **Select AI Model**: Choose between "Simulated AI (Demo)" or "DeepSeek" from the model selector
2. Type your coding request in the text input or click the "Start Voice Command" button
3. For voice: Speak your coding request (e.g., "Create a hello world function")
4. The AI will generate code based on your command
5. The code will automatically appear in the editor

### Example Voice Commands

- "Create a hello world function"
- "Make a button with click handler"
- "Create a React component"
- "Write a fetch API example"
- "Create a Python class"

### Code Editing

- Edit the generated code directly in the Monaco editor
- The editor supports syntax highlighting for multiple languages
- Use the language selector to switch between JavaScript, TypeScript, Python, and HTML

### Preview & Run

- Click "Run & Preview" to see your code in action
- The code will open in a new window with proper execution

### Deployment

- **Deploy Web**: Deploy your code to a web hosting service
- **Deploy Mobile**: Create a PWA version for mobile devices
- **Download**: Save your code as a file

## Architecture

### Components

- **VoiceInput**: Handles speech recognition and voice commands
- **CodeEditor**: Monaco-based code editor with toolbar
- **Header**: Application header with language selector
- **AIService**: Simulated AI code generation service
- **DeploymentService**: Handles deployment to various platforms

### Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
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
