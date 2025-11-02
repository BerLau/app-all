import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Sparkles, Send } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import aiService from '../services/aiService';
import './VoiceInput.css';

interface VoiceInputProps {
  onCodeGenerated: (code: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onCodeGenerated }) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleVoiceCommand = useCallback(async (command: string) => {
    setIsProcessing(true);
    setLastCommand(command);
    
    try {
      const generatedCode = await aiService.generateCode(command);
      onCodeGenerated(generatedCode);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsProcessing(false);
      resetTranscript();
    }
  }, [onCodeGenerated, resetTranscript]);

  useEffect(() => {
    if (transcript && !isListening && transcript !== lastCommand) {
      handleVoiceCommand(transcript);
    }
  }, [transcript, isListening, lastCommand, handleVoiceCommand]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setLastCommand(textInput);
    
    try {
      const generatedCode = await aiService.generateCode(textInput);
      onCodeGenerated(generatedCode);
      setTextInput('');
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="voice-input-container">
        <div className="voice-input-error">
          <p>Speech recognition is not supported in this browser.</p>
          <p>Please use Chrome, Edge, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-input-container">
      <div className="voice-input-header">
        <h3>
          <Sparkles size={20} />
          AI Coding Assistant
        </h3>
      </div>

      <form onSubmit={handleTextSubmit} className="text-input-form">
        <div className="text-input-wrapper">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your Flutter/Dart coding request here..."
            className="text-input"
            disabled={isProcessing}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={!textInput.trim() || isProcessing}
            title="Generate code"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      <div className="input-divider">
        <span>OR</span>
      </div>

      <div className="voice-input-controls">
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          onClick={handleToggleListening}
          disabled={isProcessing}
        >
          {isListening ? (
            <>
              <MicOff size={24} />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Mic size={24} />
              <span>Start Voice Command</span>
            </>
          )}
        </button>
      </div>

      <div className="voice-input-feedback">
        {isListening && (
          <div className="listening-indicator">
            <div className="pulse"></div>
            <span>Listening...</span>
          </div>
        )}

        {isProcessing && (
          <div className="processing-indicator">
            <div className="spinner"></div>
            <span>Generating code...</span>
          </div>
        )}

        {(transcript || interimTranscript) && (
          <div className="transcript">
            <strong>You said:</strong>
            <p>
              {transcript}
              {interimTranscript && (
                <span className="interim">{interimTranscript}</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="voice-input-tips">
        <p><strong>Try typing or saying:</strong></p>
        <ul>
          <li>"Create a Flutter stateless widget"</li>
          <li>"Make a button with onPressed handler"</li>
          <li>"Create a Flutter stateful widget with counter"</li>
          <li>"Write a ListView example"</li>
        </ul>
      </div>
    </div>
  );
};
