# app-all

An online AADE (AI Assistant Development Environment) for developing, deploying and publishing apps for web and mobile all in one.

## Project Structure

- **web-platform**: AI-Assisted Coding Platform
  - Voice-controlled coding with AI assistance
  - Instant code preview and editing
  - Auto-deployment to web and mobile platforms

## Features

🎤 **Verbal Coding**: Code with your voice using natural language commands  
⚡ **Instant Preview**: Real-time code editing and preview with Monaco Editor  
🚀 **Auto-Deploy**: One-click deployment to web and mobile (PWA)  
🤖 **AI Assistance**: Intelligent code generation based on voice commands  
💻 **Multi-Language**: Support for JavaScript, TypeScript, Python, and HTML  

## Quick Start

```bash
cd web-platform
npm install
npm run dev
```

See [web-platform/README.md](web-platform/README.md) for detailed documentation.

## Technology Stack

- React 19 + TypeScript
- Vite for fast development
- Monaco Editor for code editing
- Web Speech API for voice recognition
- Progressive Web App (PWA) support

## Development Status

✅ Voice-controlled code generation  
✅ Multi-language support  
✅ Real-time code editing  
✅ Code preview and execution  
✅ Web deployment simulation  
✅ Mobile deployment simulation (PWA)  

## Deployment

This project is configured for automatic deployment to Vercel via GitHub Actions. Every push to the `main` branch triggers a production deployment, and pull requests create preview deployments.

For setup instructions, see [.github/VERCEL_DEPLOYMENT.md](.github/VERCEL_DEPLOYMENT.md).

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

