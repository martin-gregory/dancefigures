// vite.config.js
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // project root
  publicDir: 'assets', // Vite automatically copies this to dist
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      // exclude avif
      exclude: /\.avif$/,
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        format: 'es',
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
  server: {
    port: 8000,
  },
  define: {
    'Reflect.decorate': 'undefined',
  },
});
