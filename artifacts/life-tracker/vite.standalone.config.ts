/**
 * Standalone build config — no Replit env vars required.
 * Use this to build for GitHub Pages, Netlify, Vercel, or local hosting.
 *
 * Commands:
 *   pnpm --filter @workspace/life-tracker build:standalone   → builds to dist-standalone/
 *   pnpm --filter @workspace/life-tracker serve:standalone   → preview build locally
 *
 * For GitHub Pages set base to: /<your-repo-name>/
 * For Netlify / Vercel / local server keep base as: /
 */
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Change this if deploying to GitHub Pages: e.g. '/life-tracker/'
const BASE = process.env.VITE_BASE ?? '/';

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist-standalone'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
