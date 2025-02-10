import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cek preferensi sistem saat pertama kali
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Listener untuk perubahan preferensi sistem secara realtime
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Update mode hanya jika tidak ada preferensi yang tersimpan
      if (!localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        // Trigger event untuk update favicon
        document.documentElement.dispatchEvent(new Event('change-theme'));
      }
    };

    // Tambahkan event listener dengan kompatibilitas lintas browser
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback untuk browser lama
      mediaQuery.addListener(handleChange);
    }

    // Cek localStorage saat refresh
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      const isDark = savedMode === 'true';
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Jika tidak ada preferensi tersimpan, gunakan preferensi sistem
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback untuk browser lama
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const changeDarkMode = (value) => {
    setIsDarkMode(value);
    localStorage.setItem('darkMode', value);
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Trigger event untuk update favicon
    document.documentElement.dispatchEvent(new Event('change-theme'));
  };

  const resetToSystemPreference = () => {
    // Hapus preferensi yang tersimpan
    localStorage.removeItem('darkMode');
    // Set mode sesuai preferensi sistem
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(systemPrefersDark);
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Trigger event untuk update favicon
    document.documentElement.dispatchEvent(new Event('change-theme'));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, changeDarkMode, resetToSystemPreference }}>
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