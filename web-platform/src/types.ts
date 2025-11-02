export interface Project {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface VoiceCommand {
  transcript: string;
  confidence: number;
  timestamp: Date;
}
