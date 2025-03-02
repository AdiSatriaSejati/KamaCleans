import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/database'],
          'three-core': ['three'],
          'three-extras': ['@react-three/fiber', '@react-three/drei'],
          'motion': ['framer-motion'],
          'supabase': ['@supabase/supabase-js']
        }
      },
      onwarn(warning, warn) {
        if (warning.code === 'EVAL' && warning.id?.includes('three-stdlib')) {
          return;
        }
        warn(warning);
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
  experimental: {
    renderBuiltUrl(filename) {
      return `/${filename}`
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
})