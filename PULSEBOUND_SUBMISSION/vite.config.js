import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pulsebound/', // GitHub Pages base path
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
