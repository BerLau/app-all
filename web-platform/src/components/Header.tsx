import React from 'react';
import { Zap } from 'lucide-react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <Zap size={32} />
          <h1>AI Coding Platform</h1>
        </div>
        <p className="tagline">Code with your voice • Preview instantly • Deploy everywhere</p>
      </div>
    </header>
  );
};
