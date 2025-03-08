import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './context/darkModeContext'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

// Deteksi environment dengan Vite
const isProduction = import.meta.env.MODE === 'production';

// Disable StrictMode in production
const Root = isProduction ? 
  ({ children }) => children : 
  StrictMode;

createRoot(document.getElementById('root')).render(
  <Root>
    <HelmetProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </HelmetProvider>
  </Root>
)