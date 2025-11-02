import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  extension?: string;
}

// Helper function to check if path is safe (prevent directory traversal)
function isSafePath(requestedPath: string, basePath: string): boolean {
  const resolvedPath = path.resolve(basePath, requestedPath);
  return resolvedPath.startsWith(basePath);
}

// Helper function to get file tree
function getFileTree(dirPath: string, basePath: string, maxDepth: number = 5, currentDepth: number = 0): FileNode[] {
  if (currentDepth >= maxDepth) {
    return [];
  }

  try {
    const items = fs.readdirSync(dirPath);
    const fileTree: FileNode[] = [];

    for (const item of items) {
      // Skip hidden files and common directories to ignore
      if (item.startsWith('.') || ['node_modules', 'build', 'dist', '.dart_tool', '.idea'].includes(item)) {
        continue;
      }

      const fullPath = path.join(dirPath, item);
      const relativePath = path.relative(basePath, fullPath);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        const node: FileNode = {
          name: item,
          path: relativePath,
          type: 'directory',
          children: getFileTree(fullPath, basePath, maxDepth, currentDepth + 1)
        };
        fileTree.push(node);
      } else if (stats.isFile()) {
        const node: FileNode = {
          name: item,
          path: relativePath,
          type: 'file',
          extension: path.extname(item).substring(1)
        };
        fileTree.push(node);
      }
    }

    // Sort: directories first, then files, both alphabetically
    return fileTree.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// API Routes

// Get file tree structure
app.get('/api/files', (req: Request, res: Response) => {
  const requestedPath = req.query.path as string || '';
  const projectRoot = process.env.PROJECT_ROOT || path.join(__dirname, '../../');
  const basePath = path.resolve(projectRoot);

  // Safety check
  const fullPath = path.resolve(basePath, requestedPath);
  if (!isSafePath(requestedPath, basePath)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const fileTree = getFileTree(fullPath, basePath);
    res.json({
      success: true,
      path: requestedPath,
      data: fileTree
    });
  } catch (error) {
    console.error('Error getting file tree:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to read file system' 
    });
  }
});

// Get file content
app.get('/api/file-content', (req: Request, res: Response) => {
  const requestedPath = req.query.path as string;
  
  if (!requestedPath) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  const projectRoot = process.env.PROJECT_ROOT || path.join(__dirname, '../../');
  const basePath = path.resolve(projectRoot);
  const fullPath = path.resolve(basePath, requestedPath);

  // Safety check
  if (!isSafePath(requestedPath, basePath)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      return res.status(400).json({ error: 'Path is not a file' });
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    res.json({
      success: true,
      path: requestedPath,
      content: content,
      extension: path.extname(fullPath).substring(1)
    });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to read file' 
    });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Project root: ${process.env.PROJECT_ROOT || path.join(__dirname, '../../')}`);
});
