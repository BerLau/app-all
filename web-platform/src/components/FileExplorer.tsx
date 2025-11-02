import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  File, 
  Folder, 
  FolderOpen,
  FileCode,
  FileJson,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import fileService, { type FileNode } from '../services/fileService';
import './FileExplorer.css';

interface FileExplorerProps {
  onFileSelect: (path: string, content: string) => void;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onFileSelect: (path: string) => void;
  selectedPath: string | null;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ node, level, onFileSelect, selectedPath }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDirectory = node.type === 'directory';
  const isSelected = selectedPath === node.path;

  const handleClick = () => {
    if (isDirectory) {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(node.path);
    }
  };

  const getFileIcon = () => {
    if (isDirectory) {
      return isExpanded ? <FolderOpen size={16} color="#dcb67a" /> : <Folder size={16} color="#dcb67a" />;
    }

    // File icons based on extension
    const ext = node.extension?.toLowerCase();
    switch (ext) {
      case 'dart':
        return <FileCode size={16} color="#0175c2" />;
      case 'yaml':
      case 'yml':
        return <FileCode size={16} color="#cb171e" />;
      case 'json':
        return <FileJson size={16} color="#f1c40f" />;
      case 'md':
      case 'txt':
        return <FileText size={16} color="#858585" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <ImageIcon size={16} color="#4EC9B0" />;
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
        return <FileCode size={16} color="#f1e05a" />;
      case 'html':
      case 'css':
        return <FileCode size={16} color="#e44d26" />;
      case 'py':
        return <FileCode size={16} color="#3776ab" />;
      default:
        return <File size={16} color="#858585" />;
    }
  };

  return (
    <li className="file-tree-item">
      <div 
        className={`file-tree-item-content ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {isDirectory && (
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            <ChevronRight size={16} />
          </span>
        )}
        {!isDirectory && <span style={{ width: '16px', marginRight: '2px' }} />}
        <span className="file-icon">{getFileIcon()}</span>
        <span className="file-name">{node.name}</span>
      </div>
      {isDirectory && isExpanded && node.children && node.children.length > 0 && (
        <ul className="file-tree-children">
          {node.children.map((child, index) => (
            <FileTreeItem
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedPath={selectedPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect }) => {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [serverConnected, setServerConnected] = useState(false);

  const loadFileTree = async () => {
    setLoading(true);
    setError(null);
    try {
      const tree = await fileService.getFileTree();
      setFileTree(tree);
      setServerConnected(true);
    } catch (err) {
      setError('Failed to load file tree. Make sure the server is running.');
      setServerConnected(false);
      console.error('Error loading file tree:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (path: string) => {
    setSelectedPath(path);
    try {
      const response = await fileService.getFileContent(path);
      onFileSelect(path, response.content);
    } catch (err) {
      console.error('Error loading file content:', err);
      setError('Failed to load file content.');
    }
  };

  useEffect(() => {
    loadFileTree();
    
    // Check server health periodically
    const healthCheckInterval = setInterval(async () => {
      const isHealthy = await fileService.checkHealth();
      setServerConnected(isHealthy);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(healthCheckInterval);
  }, []);

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>Explorer</span>
        <div className="file-explorer-status">
          <span className={`status-indicator ${serverConnected ? '' : 'disconnected'}`} />
          <span>{serverConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      <div className="file-explorer-content">
        {loading && (
          <div className="loading-state">Loading file tree...</div>
        )}
        {error && (
          <div className="error-state">
            <div>{error}</div>
            <button onClick={loadFileTree}>Retry</button>
          </div>
        )}
        {!loading && !error && fileTree.length === 0 && (
          <div className="empty-state">No files found</div>
        )}
        {!loading && !error && fileTree.length > 0 && (
          <ul className="file-tree">
            {fileTree.map((node, index) => (
              <FileTreeItem
                key={`${node.path}-${index}`}
                node={node}
                level={0}
                onFileSelect={handleFileSelect}
                selectedPath={selectedPath}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
