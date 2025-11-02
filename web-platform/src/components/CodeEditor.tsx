import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Download, Smartphone, Globe } from 'lucide-react';
import deploymentService from '../services/deploymentService';
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string>('');

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value);
    }
  };

  const handleRunCode = () => {
    // Open preview in a new window/tab
    const blob = new Blob([getPreviewHTML()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'main.dart';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDeployWeb = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Deploying to web...');
    
    try {
      const result = await deploymentService.deployToWeb(code, 'my-project');
      setDeploymentStatus(`✓ Deployed to: ${result.url}`);
      setTimeout(() => setDeploymentStatus(''), 5000);
    } catch {
      setDeploymentStatus('✗ Deployment failed');
      setTimeout(() => setDeploymentStatus(''), 3000);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDeployMobile = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Deploying to mobile...');
    
    try {
      const result = await deploymentService.deployToMobile(code, 'my-project');
      setDeploymentStatus(`✓ Deployed as: ${result.platforms.join(', ')}`);
      setTimeout(() => setDeploymentStatus(''), 5000);
    } catch {
      setDeploymentStatus('✗ Deployment failed');
      setTimeout(() => setDeploymentStatus(''), 3000);
    } finally {
      setIsDeploying(false);
    }
  };

  const getPreviewHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dart Code Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>Dart Code Preview</h1>
    <div id="output"></div>
    <pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
</body>
</html>`;
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-toolbar">
        <button onClick={handleRunCode} className="toolbar-button run-button">
          <Play size={18} />
          Run & Preview
        </button>
        <button onClick={handleDownload} className="toolbar-button">
          <Download size={18} />
          Download
        </button>
        <button 
          onClick={handleDeployWeb} 
          className="toolbar-button deploy-button"
          disabled={isDeploying}
        >
          <Globe size={18} />
          Deploy Web
        </button>
        <button 
          onClick={handleDeployMobile} 
          className="toolbar-button deploy-button"
          disabled={isDeploying}
        >
          <Smartphone size={18} />
          Deploy Mobile
        </button>
      </div>

      {deploymentStatus && (
        <div className={`deployment-status ${deploymentStatus.includes('✓') ? 'success' : ''}`}>
          {deploymentStatus}
        </div>
      )}

      <div className="editor-wrapper">
        <Editor
          height="100%"
          language="dart"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};
