import { FileNode, FileType } from './types';

// This structure maps your UI sidebar to the actual markdown files in the public/md folder.
// When you add a new file in public/md, add an entry here so it shows up in the sidebar.

export const MOCK_FILE_SYSTEM: FileNode[] = [
  {
    id: 'root',
    name: 'Root',
    type: FileType.FOLDER,
    children: [
      {
        id: 'math',
        name: 'Math Notes (数学笔记)',
        type: FileType.FOLDER,
        isOpen: true,
        children: [
          {
            id: 'calc',
            name: 'Calculus (微积分)',
            type: FileType.FOLDER,
            isOpen: true,
            children: [
              {
                id: 'calc-ch1',
                name: 'Chapter 1: Limits & Continuity',
                type: FileType.FILE,
                path: '/md/math/calculus/limits.md'
              },
              {
                id: 'calc-ch2',
                name: 'Chapter 2: Derivatives',
                type: FileType.FILE,
                path: '/md/math/calculus/derivatives.md'
              }
            ]
          },
          {
            id: 'linalg',
            name: 'Linear Algebra (线性代数)',
            type: FileType.FOLDER,
            children: [
              {
                id: 'linalg-1',
                name: 'Matrices',
                type: FileType.FILE,
                path: '/md/math/linear_algebra/matrices.md'
              }
            ]
          }
        ]
      },
      {
        id: 'physics',
        name: 'Physics (物理笔记)',
        type: FileType.FOLDER,
        children: [
          {
            id: 'relativity',
            name: 'Special Relativity',
            type: FileType.FILE,
            path: '/md/physics/relativity.md'
          }
        ]
      },
      {
        id: 'cs',
        name: 'Algorithms (算法导论)',
        type: FileType.FOLDER,
        children: [
          {
            id: 'sorting',
            name: 'Quick Sort',
            type: FileType.FILE,
            path: '/md/cs/algorithms/quicksort.md'
          }
        ]
      },
      {
        id: 'journal',
        name: 'About (关于模板)',
        type: FileType.FILE,
        path: '/md/about.md'
      }
    ]
  }
];