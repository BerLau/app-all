import { useState } from 'react';
import { Header } from './components/Header';
import { VoiceInput } from './components/VoiceInput';
import { CodeEditor } from './components/CodeEditor';
import { FileExplorer } from './components/FileExplorer';
import './App.css';

function App() {
  const [code, setCode] = useState(`// Welcome to AI-Assisted Coding Platform!
// All code is written with Flutter (Dart)

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hello Flutter'),
        ),
        body: Center(
          child: Text('Welcome to Flutter development!'),
        ),
      ),
    );
  }
}
`);

  const handleCodeGenerated = (generatedCode: string) => {
    setCode(generatedCode);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleFileSelect = (path: string, content: string, extension: string) => {
    console.log('Loading file:', path);
    setCode(content);
    // Map file extension to language
    const extensionToLanguage: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'py': 'python',
      'html': 'html',
      'dart': 'dart',
      'yaml': 'yaml',
      'yml': 'yaml',
      'json': 'json',
      'md': 'markdown',
      'css': 'css',
    };
    const newLanguage = extensionToLanguage[extension] || 'javascript';
    setLanguage(newLanguage);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Update code template based on language
    const templates: Record<string, string> = {
      javascript: `// JavaScript Code\nconsole.log('Hello, World!');`,
      typescript: `// TypeScript Code\nconst greeting: string = 'Hello, World!';\nconsole.log(greeting);`,
      python: `# Python Code\nprint('Hello, World!')`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
    };
    setCode(templates[newLanguage] || templates.javascript);
  };

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
        <div className="explorer-panel">
          <FileExplorer onFileSelect={handleFileSelect} />
        </div>

        <div className="left-panel">
          <VoiceInput onCodeGenerated={handleCodeGenerated} />
        </div>
        
        <div className="right-panel">
          <CodeEditor code={code} onCodeChange={handleCodeChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
