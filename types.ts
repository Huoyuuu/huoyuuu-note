export enum FileType {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  path?: string; // Path to the static .md file (e.g., '/md/math/intro.md')
  children?: FileNode[]; // Only folders have children
  isOpen?: boolean; // UI state for folders
}

export interface BreadcrumbItem {
  id: string;
  name: string;
}