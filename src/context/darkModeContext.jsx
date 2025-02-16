import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Hapus fungsi manual change karena kita hanya mengikuti sistem
  const changeDarkMode = () => {
    console.warn('Manual dark mode change is disabled. System preference is used instead.');
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