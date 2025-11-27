import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = { ...process.env, ...loadEnv(mode, '.', '') } as Record<string, string | undefined>;
    const formatBasePath = (value?: string | null) => {
      if (!value) return null;
      const prefixed = value.startsWith('/') ? value : `/${value}`;
      return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
    };
    const repoBase = formatBasePath(process.env.GITHUB_REPOSITORY?.split('/')?.[1] || null);
    const envBase = formatBasePath(env.VITE_BASE_PATH || null);
    const basePath = mode === 'production' ? (envBase || repoBase || '/') : '/';
    return {
      base: basePath,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
