# Getting Started with AI-Assisted Coding Platform

Welcome to the AI-Assisted Coding Platform! This guide will help you get up and running quickly.

## Quick Start

### 1. Installation

```bash
# Navigate to the web platform directory
cd web-platform

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or next available port).

### 3. Using Voice Commands

**Important**: Voice recognition requires Chrome, Edge, or Safari browser.

1. Click the green "Start Voice Command" button
2. Allow microphone access when prompted
3. Speak your coding request clearly
4. Wait for the AI to generate code
5. The code will appear in the editor automatically

### Example Voice Commands to Try

- "Create a hello world function"
- "Make a button with click handler"
- "Create a React component"
- "Write a fetch API example"
- "Create a Python class"

## Features Overview

### Voice Coding
- Natural language code generation
- Real-time speech transcription
- Visual feedback during listening and processing

### Code Editor
- Syntax highlighting for multiple languages
- Auto-completion and IntelliSense
- Dark theme for comfortable coding
- Live editing with instant updates

### Preview & Testing
- **Run & Preview**: Opens your code in a new window
- **Download**: Save your code as a file
- **Deploy Web**: Simulate web deployment
- **Deploy Mobile**: Simulate mobile (PWA) deployment

### Language Support
Use the language selector in the header to switch between:
- JavaScript
- TypeScript
- Python
- HTML

## Tips for Best Results

### Voice Recognition Tips
1. Speak clearly and at a moderate pace
2. Use natural language (no need for technical jargon)
3. Be specific about what you want to create
4. Wait for the "Listening..." indicator before speaking
5. Click "Stop Listening" when done

### Code Editing Tips
1. The editor supports all standard keyboard shortcuts
2. Use Ctrl/Cmd + F to find text
3. Code is auto-saved as you type
4. Switch languages to get language-specific templates

## Troubleshooting

### Voice Recognition Not Working
- **Check browser**: Use Chrome, Edge, or Safari
- **Allow microphone**: Grant permission when prompted
- **Check microphone**: Ensure it's working in system settings
- **Try HTTPS**: Voice API requires secure context

### Monaco Editor Shows "Loading..."
- Wait a few seconds for the editor to initialize
- Check browser console for errors
- Ensure you have a stable internet connection (for CDN resources)

### Code Preview Not Working
- Check if pop-ups are blocked in your browser
- Ensure JavaScript is enabled
- Try a different browser

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
web-platform/
├── src/
│   ├── components/       # React components
│   │   ├── VoiceInput.tsx
│   │   ├── CodeEditor.tsx
│   │   └── Header.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useSpeechRecognition.ts
│   ├── services/        # Business logic
│   │   ├── aiService.ts
│   │   └── deploymentService.ts
│   ├── types.ts         # TypeScript types
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── package.json         # Dependencies
```

## Extending the Platform

### Add Real AI Integration

Replace the simulated AI service with a real API:

```typescript
// In src/services/aiService.ts
import OpenAI from 'openai';

async generateCode(prompt: string, language: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: `You are a code generator. Generate ${language} code.` },
      { role: "user", content: prompt }
    ],
  });
  return completion.choices[0].message.content;
}
```

### Add Real Deployment

Integrate with deployment services:

```typescript
// For Vercel deployment
import { deploy } from '@vercel/client';

async deployToWeb(code: string, projectName: string) {
  const result = await deploy({
    name: projectName,
    files: [{ file: 'index.html', data: code }],
  });
  return result.url;
}
```

## Next Steps

1. **Explore voice commands**: Try different coding requests
2. **Edit generated code**: Refine AI-generated code in the editor
3. **Test deployment**: Try the deployment simulation features
4. **Customize**: Modify components to fit your needs
5. **Extend**: Add new languages, AI providers, or deployment targets

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the code in `src/` for implementation details
- Submit issues on GitHub for bugs or feature requests

## License

MIT License - Feel free to use and modify as needed.
