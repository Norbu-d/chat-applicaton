import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Fix manualChunks - it should be a function, not an object
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})