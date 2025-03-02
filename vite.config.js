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
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'three-core': ['three'],
          'three-extras': ['@react-three/drei', '@react-three/fiber'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'supabase': ['@supabase/supabase-js'],
          'utils': [
            '@tabler/icons-react',
            'react-toggle-dark-mode',
            'react-type-animation'
          ]
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
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@react-three/drei',
      '@react-three/fiber'
    ]
  }
})