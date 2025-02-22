import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../context/darkModeContext';
import './Loading.css';

const Loading = () => {
  const { isDarkMode } = useDarkMode();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const logoLight = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk0NzQwMjYsImV4cCI6MTc3MTAxMDAyNn0.obTkNApOTpoYmcQCg3tFEVDEYezbFJJw5Wr_7HDJ37E";
  const logoDark = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTQ3NDAzNywiZXhwIjoxNzcxMDEwMDM3fQ.iHY1XnWOV2gb8TcHvGkyC17RtyWMcxUvo-1E_m0MwN0";

  useEffect(() => {
    // Preload images dengan Promise.all
    const preloadImages = async () => {
      const images = [logoLight, logoDark];
      try {
        await Promise.all(
          images.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };
    
    preloadImages();

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={`loader ${isDarkMode ? 'dark' : 'light'}`}>
      <img 
        src={isDarkMode ? logoLight : logoDark}
        alt="KamaCleans" 
        width="208" 
        height="208"
        fetchPriority="high"
        decoding="sync"
      />
      <p>Memuat... {progress}%</p>
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