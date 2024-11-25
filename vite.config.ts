import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // For aliasing src directory
    },
  },
  build: {
    outDir: 'dist', // Output directory for build
    sourcemap: true, // Optional: Include sourcemaps for debugging
  },
});
