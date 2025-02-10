import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../context/darkModeContext';
import './Loading.css';

const Loading = () => {
  const { isDarkMode } = useDarkMode();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20); // Setiap 20ms progress bertambah 1%

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={`loader ${isDarkMode ? 'dark' : 'light'}`}>
      <img 
        src={isDarkMode ? '/images/logo-light.webp' : '/images/logo-dark.webp'} 
        alt="KamaCleans" 
        width="208" 
        height="208" 
      />
      <p>Loading... {progress}%</p>
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Loading;