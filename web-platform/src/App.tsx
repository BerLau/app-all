import { useState } from 'react';
import { Header } from './components/Header';
import { VoiceInput } from './components/VoiceInput';
import { CodeEditor } from './components/CodeEditor';
import './App.css';

function App() {
  const [code, setCode] = useState(`// Welcome to AI-Assisted Coding Platform!
// All code is written with Flutter (Dart)

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

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
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
