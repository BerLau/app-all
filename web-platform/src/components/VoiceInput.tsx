import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import aiService from '../services/aiService';
import './VoiceInput.css';

interface VoiceInputProps {
  onCodeGenerated: (code: string) => void;
  language: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onCodeGenerated, language }) => {
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

  const handleVoiceCommand = useCallback(async (command: string) => {
    setIsProcessing(true);
    setLastCommand(command);
    
    try {
      const generatedCode = await aiService.generateCode(command, language);
      onCodeGenerated(generatedCode);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsProcessing(false);
      resetTranscript();
    }
  }, [language, onCodeGenerated, resetTranscript]);

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
          Voice Coding Assistant
        </h3>
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
        <p><strong>Try saying:</strong></p>
        <ul>
          <li>"Create a hello world function"</li>
          <li>"Make a button with click handler"</li>
          <li>"Create a React component"</li>
          <li>"Write a fetch API example"</li>
        </ul>
      </div>
    </div>
  );
};
