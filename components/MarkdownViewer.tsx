import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { FileNode } from '../types';
import { Calendar, Tag } from 'lucide-react';

interface MarkdownViewerProps {
  file: FileNode | null;
  content: string; // Now receives content as a prop
  isLoading: boolean;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ file, content, isLoading }) => {
  if (!file) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-stone-400">
        <div className="text-6xl mb-4 opacity-20">❦</div>
        <p className="font-serif italic text-lg">Select a note to begin reading</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen bg-[#fdfbf7] shadow-xl shadow-stone-200/50 relative overflow-hidden">
        
        {/* Header Section */}
        <div className="px-8 md:px-16 pt-16 pb-8 border-b border-stone-100">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-serif leading-tight">
                {file.name}
            </h1>
            <div className="flex items-center space-x-6 text-xs md:text-sm text-stone-500 font-serif uppercase tracking-widest">
                <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    <span>2023.10.24</span>
                </div>
                <div className="flex items-center">
                    <Tag size={14} className="mr-2" />
                    <span>Markdown</span>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="px-8 md:px-16 py-10 min-h-[50vh]">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-40 space-y-4">
                     <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-500 rounded-full animate-spin"></div>
                     <p className="text-stone-400 font-serif italic">Loading ink...</p>
                </div>
            ) : (
                <article className="prose prose-stone prose-lg max-w-none font-serif leading-relaxed">
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-8 mb-4 border-l-4 border-stone-800 pl-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-4 text-stone-800 border-b border-stone-200 pb-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-6 mb-3 text-stone-700 italic" {...props} />,
                            p: ({node, ...props}) => <p className="mb-4 text-stone-800/90 text-justify" {...props} />,
                            blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-2 border-red-800/30 bg-stone-100/50 pl-6 py-2 my-6 italic text-stone-600 rounded-r-lg" {...props} />
                            ),
                            code: ({node, inline, className, children, ...props}: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline ? (
                                    <div className="my-6 rounded-md overflow-hidden border border-stone-200 shadow-sm bg-[#f4f4f4]">
                                        <div className="px-4 py-1 bg-stone-200/50 text-xs text-stone-500 font-mono border-b border-stone-200">
                                            {match ? match[1] : 'code'}
                                        </div>
                                        <code className={`${className} block p-4 overflow-x-auto text-sm font-mono text-stone-800 bg-transparent`} {...props}>
                                            {children}
                                        </code>
                                    </div>
                                ) : (
                                    <code className="bg-stone-200/60 px-1.5 py-0.5 rounded text-stone-800 text-sm font-mono" {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            img: ({node, ...props}) => (
                                <div className="my-8 p-2 bg-white shadow-md rotate-1 transform transition-transform hover:rotate-0 duration-500">
                                    <img className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" {...props} alt={props.alt || ''} />
                                    {props.alt && <p className="text-center text-xs text-stone-400 mt-2 italic">{props.alt}</p>}
                                </div>
                            ),
                            table: ({node, ...props}) => (
                                <div className="overflow-x-auto my-6 border border-stone-200 rounded-lg">
                                    <table className="min-w-full text-sm text-left text-stone-700" {...props} />
                                </div>
                            ),
                            thead: ({node, ...props}) => <thead className="bg-stone-100 uppercase font-bold" {...props} />,
                            th: ({node, ...props}) => <th className="px-6 py-3 border-b border-stone-200" {...props} />,
                            td: ({node, ...props}) => <td className="px-6 py-4 border-b border-stone-100" {...props} />
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </article>
            )}

            {/* Footer / End of Paper */}
            <div className="mt-20 pt-8 border-t border-stone-200 flex justify-center opacity-50">
                <div className="h-2 w-2 rounded-full bg-stone-300 mx-1"></div>
                <div className="h-2 w-2 rounded-full bg-stone-300 mx-1"></div>
                <div className="h-2 w-2 rounded-full bg-stone-300 mx-1"></div>
            </div>
        </div>
    </div>
  );
};