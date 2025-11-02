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

  const handleFileSelect = (path: string, content: string) => {
    console.log('Loading file:', path);
    setCode(content);
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
