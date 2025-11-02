import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  extension?: string;
}

export interface FileTreeResponse {
  success: boolean;
  path: string;
  data: FileNode[];
}

export interface FileContentResponse {
  success: boolean;
  path: string;
  content: string;
  extension: string;
}

class FileService {
  async getFileTree(path: string = ''): Promise<FileNode[]> {
    try {
      const response = await axios.get<FileTreeResponse>(`${API_BASE_URL}/api/files`, {
        params: { path }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching file tree:', error);
      throw error;
    }
  }

  async getFileContent(path: string): Promise<FileContentResponse> {
    try {
      const response = await axios.get<FileContentResponse>(`${API_BASE_URL}/api/file-content`, {
        params: { path }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching file content:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      return response.data.status === 'ok';
    } catch {
      return false;
    }
  }
}

export default new FileService();
