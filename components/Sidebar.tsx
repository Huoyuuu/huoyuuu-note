import React from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react';
import { FileNode, FileType } from '../types';

interface SidebarProps {
  nodes: FileNode[];
  onSelect: (node: FileNode) => void;
  selectedId: string | null;
  className?: string;
  onToggleExpand: (nodeId: string) => void;
}

const FileTreeNode: React.FC<{
  node: FileNode;
  depth: number;
  onSelect: (node: FileNode) => void;
  selectedId: string | null;
  onToggleExpand: (nodeId: string) => void;
}> = ({ node, depth, onSelect, selectedId, onToggleExpand }) => {
  const isSelected = selectedId === node.id;
  const isFolder = node.type === FileType.FOLDER;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      onToggleExpand(node.id);
    } else {
      onSelect(node);
    }
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        className={`
          group flex items-center py-1.5 px-2 cursor-pointer transition-all duration-200
          ${isSelected ? 'bg-stone-200/60 text-stone-900 font-semibold' : 'text-stone-600 hover:bg-stone-200/40 hover:text-stone-800'}
        `}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
          {isFolder ? (
            node.isOpen ? <FolderOpen size={16} /> : <Folder size={16} />
          ) : (
            <FileText size={16} />
          )}
        </span>
        
        <span className="flex-1 truncate text-sm tracking-wide">
          {node.name}
        </span>

        {isFolder && (
          <span className="ml-2 opacity-40">
            {node.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
      </div>

      {/* Recursive Render for Children */}
      {isFolder && node.isOpen && node.children && (
        <div className="border-l border-stone-300/50 ml-4">
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ nodes, onSelect, selectedId, className, onToggleExpand }) => {
  return (
    <div className={`h-full overflow-y-auto bg-[#f7f5f0] border-r border-stone-200/60 ${className}`}>
      <div className="p-6 sticky top-0 bg-[#f7f5f0] z-10">
        <h1 className="text-2xl font-bold text-stone-900 font-serif tracking-tighter">目录</h1>
        <div className="h-1 w-12 bg-stone-800 mt-2 rounded-full opacity-80"></div>
      </div>
      <div className="pb-10">
        {nodes.map((node) => (
          <FileTreeNode
            key={node.id}
            node={node}
            depth={0}
            onSelect={onSelect}
            selectedId={selectedId}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </div>
    </div>
  );
};