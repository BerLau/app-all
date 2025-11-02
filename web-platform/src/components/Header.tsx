import React from 'react';
import { Code2, Zap } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
  ];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <Zap size={32} />
          <h1>AI Coding Platform</h1>
        </div>
        <p className="tagline">Code with your voice • Preview instantly • Deploy everywhere</p>
      </div>
      
      <div className="header-right">
        <div className="language-selector">
          <Code2 size={18} />
          <select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
