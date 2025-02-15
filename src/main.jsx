import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './context/darkModeContext'
import App from './App'

// Disable StrictMode in production
const Root = process.env.NODE_ENV === 'production' ? 
  ({ children }) => children : 
  StrictMode;

createRoot(document.getElementById('root')).render(
  <Root>
    <DarkModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DarkModeProvider>
  </Root>
)