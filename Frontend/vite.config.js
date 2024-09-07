import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]', // For CSS and other assets
        entryFileNames: 'assets/[name].[hash].js',        // For JS files
      }
    }
  },
  server: {
    historyApiFallback: true
  }
});
