import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative base path for universal static hosting (GitHub Pages, Netlify, Vercel, etc.)
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
