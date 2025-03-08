import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cek apakah ada preferensi yang tersimpan
    const savedPreference = localStorage.getItem('darkMode');
    
    if (savedPreference !== null) {
      // Gunakan preferensi yang tersimpan
      const isDark = savedPreference === 'true';
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // Jika tidak ada, gunakan preferensi sistem
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const isDark = mediaQuery.matches;
      setIsDarkMode(isDark);
      applyTheme(isDark);
      
      // Listen untuk perubahan preferensi sistem
      const updateTheme = (e) => {
        const isDark = e.matches;
        setIsDarkMode(isDark);
        applyTheme(isDark);
      };
      
      mediaQuery.addEventListener('change', updateTheme);
      
      // Cleanup
      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    }
  }, []);

  // Fungsi untuk menerapkan tema
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Trigger event untuk update favicon dan UI lainnya
    document.documentElement.dispatchEvent(new Event('change-theme'));
  };

  // Toggle dark mode
  const changeDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
    
    // Simpan preferensi
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, changeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};