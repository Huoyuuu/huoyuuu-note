import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MarkdownViewer } from './components/MarkdownViewer';
import { FileNode, FileType } from './types';
import { MOCK_FILE_SYSTEM } from './constants';
import { Menu, Search, Settings, Github, User, ArrowLeft } from 'lucide-react';

export default function App() {
  const [fileSystem, setFileSystem] = useState<FileNode[]>(MOCK_FILE_SYSTEM);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Helper to deep clone and update open state
  const toggleFolder = (nodes: FileNode[], targetId: string): FileNode[] => {
    return nodes.map(node => {
      if (node.id === targetId && node.type === FileType.FOLDER) {
        return { ...node, isOpen: !node.isOpen };
      }
      if (node.children) {
        return { ...node, children: toggleFolder(node.children, targetId) };
      }
      return node;
    });
  };

  const handleToggleExpand = (id: string) => {
    setFileSystem(prev => toggleFolder(prev, id));
  };

  const handleSelectFile = (node: FileNode) => {
    setSelectedFile(node);
    if (isMobile) {
        setIsSidebarOpen(false);
    }
  };

  // Resolve markdown file URL so it works with the Vite base path (e.g. GitHub Pages)
  const buildFileUrl = (rawPath: string) => {
    const normalizedPath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
    return new URL(normalizedPath, import.meta.env.BASE_URL).toString();
  };

  // Effect to fetch file content when selectedFile changes
  useEffect(() => {
    if (selectedFile?.type === FileType.FILE && selectedFile.path) {
        setIsLoadingFile(true);
        const fileUrl = buildFileUrl(selectedFile.path);
        fetch(fileUrl)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load file');
                return res.text();
            })
            .then(text => {
                setFileContent(text);
                setIsLoadingFile(false);
            })
            .catch(err => {
                console.error(err);
                setFileContent(`# Error\n\nCould not load the file: ${selectedFile.path}\n\nPlease ensure the file exists in the \`public\` folder.`);
                setIsLoadingFile(false);
            });
    } else {
        setFileContent('');
    }
  }, [selectedFile]);

  // Default selection on load
  useEffect(() => {
    // Find the first file to open
    const findFirstFile = (nodes: FileNode[]): FileNode | null => {
        for(const node of nodes) {
            if (node.type === FileType.FILE) return node;
            if (node.children) {
                const res = findFirstFile(node.children);
                if(res) return res;
            }
        }
        return null;
    };
    
    // Attempt to open the first Calc chapter
    const calc = fileSystem[0].children?.[0]?.children?.[0]?.children?.[0];
    if (calc) setSelectedFile(calc);
    else {
        const first = findFirstFile(fileSystem);
        if(first) setSelectedFile(first);
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
        else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#f2f0e9] overflow-hidden relative">
      
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
            className="absolute inset-0 bg-stone-900/20 z-20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Navigation */}
      <aside 
        className={`
            fixed md:relative z-30 h-full bg-[#f7f5f0] shadow-lg md:shadow-none
            transition-all duration-300 ease-in-out border-r border-stone-300/50
            flex flex-col
            ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:-translate-x-72'}
        `}
      >
        <div className="flex-1 overflow-hidden">
            <div className="w-72 h-full flex flex-col">
                <Sidebar 
                    nodes={fileSystem[0].children || []} 
                    onSelect={handleSelectFile} 
                    selectedId={selectedFile?.id || null}
                    onToggleExpand={handleToggleExpand}
                    className="flex-1"
                />
                
                {/* Sidebar Footer Controls */}
                <div className="p-4 border-t border-stone-200/60 bg-[#f7f5f0]">
                    <div className="flex flex-col space-y-4">
                        <button className="flex items-center text-stone-500 hover:text-stone-800 transition-colors">
                            <Settings size={18} className="mr-3" />
                            <span className="text-sm">设置 (Settings)</span>
                        </button>
                         <button className="flex items-center text-stone-500 hover:text-stone-800 transition-colors">
                            <Search size={18} className="mr-3" />
                            <span className="text-sm">搜索 (Search)</span>
                        </button>
                        <button className="flex items-center text-stone-500 hover:text-stone-800 transition-colors">
                            <Github size={18} className="mr-3" />
                            <span className="text-sm">GitHub Repo</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Top Navigation / Toolbar */}
        <header className="h-14 flex items-center justify-between px-4 md:px-8 border-b border-stone-200/50 bg-[#f2f0e9]/90 backdrop-blur z-10 shrink-0">
            <div className="flex items-center">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-stone-200 rounded-md text-stone-600 transition-colors"
                >
                    {isSidebarOpen ? <ArrowLeft size={20} /> : <Menu size={20} />}
                </button>
            </div>
            
            <div className="flex items-center space-x-4 text-stone-500">
                <div className="flex items-center px-3 py-1 bg-white/50 rounded-full border border-stone-200/50 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span>Ready</span>
                </div>
                <button className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                    <User size={18} />
                </button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth bg-[#e8e6df]">
            <div className="min-h-full p-4 md:p-8 flex justify-center">
                <MarkdownViewer 
                    file={selectedFile} 
                    content={fileContent} 
                    isLoading={isLoadingFile}
                />
            </div>
            
            <div className="h-20 w-full shrink-0"></div> {/* Bottom spacer */}
        </div>

      </main>
    </div>
  );
}
