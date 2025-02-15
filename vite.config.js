import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), visualizer({
    open: true,
    gzipSize: true
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          maps: ['google-maps']
        }
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    }
  },
})
