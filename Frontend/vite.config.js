import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify:'terser',
    terserOptions:{
      compress:{
        drop_console:true
      },
      output:{
        comments:false
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',  // Output file name for entry points
        chunkFileNames: 'assets/[name].js',  // Output file name for chunks
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name].css';  // Output file name for CSS files
          }
          return 'assets/[name].[ext]';  // Output file name for other assets
        },
        // Optional: you can add other output configuration options here
      },
    },
  },
});
