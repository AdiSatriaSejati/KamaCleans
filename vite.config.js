import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'animation': ['framer-motion'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'utils': ['@popperjs/core']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      'react-reconciler': path.resolve(__dirname, 'node_modules/react-reconciler'),
      'react-reconciler/constants': path.resolve(__dirname, 'node_modules/react-reconciler/constants')
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-reconciler',
      'react-reconciler/constants'
    ]
  }
})
