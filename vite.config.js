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
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          'maps': ['@react-google-maps/api'],
          'animations': [
            'framer-motion',
            '@react-spring/three',
            '@react-three/drei',
            '@react-three/fiber'
          ],
          'analytics': []
        }
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
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
