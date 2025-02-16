import React, { createContext, useContext, useState, useEffect } from 'react';
import { hasConsent, setCookie, getCookie, COOKIE_NAMES } from '../utils/cookieUtils';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (hasConsent('PREFERENCES')) {
      const savedMode = getCookie('theme_preference');
      if (savedMode) return savedMode === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Deteksi preferensi sistem
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set mode awal
    const updateTheme = (e) => {
      const isDark = e.matches;
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Trigger event untuk update favicon
      document.documentElement.dispatchEvent(new Event('change-theme'));
    };

    // Set mode awal
    updateTheme(mediaQuery);

    // Listen untuk perubahan preferensi sistem
    mediaQuery.addEventListener('change', updateTheme);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  const changeDarkMode = (value) => {
    setIsDarkMode(value);
    if (hasConsent('PREFERENCES')) {
      setCookie('theme_preference', value ? 'dark' : 'light');
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, changeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};