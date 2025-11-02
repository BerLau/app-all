import { useState } from 'react';
import { Header } from './components/Header';
import { VoiceInput } from './components/VoiceInput';
import { CodeEditor } from './components/CodeEditor';
import './App.css';

function App() {
  const [code, setCode] = useState(`// Welcome to AI-Assisted Coding Platform!
// Try using voice commands to generate code

function greet(name) {
  return \`Hello, \${name}! Welcome to the future of coding.\`;
}

console.log(greet('Developer'));
`);
  const [language, setLanguage] = useState('javascript');

  const handleCodeGenerated = (generatedCode: string) => {
    setCode(generatedCode);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
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
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <div className="app-container">
        <div className="left-panel">
          <VoiceInput onCodeGenerated={handleCodeGenerated} language={language} />
        </div>
        
        <div className="right-panel">
          <CodeEditor code={code} language={language} onCodeChange={handleCodeChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
