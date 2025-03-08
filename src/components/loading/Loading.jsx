import React, { useEffect, useState, useRef } from 'react';
import { useDarkMode } from '../../context/darkModeContext';
import './Loading.css';

// URL gambar dari environment variables atau config
const LOGO_LIGHT_URL = import.meta.env.VITE_LOGO_LIGHT_URL || 
  "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk0NzQwMjYsImV4cCI6MTc3MTAxMDAyNn0.obTkNApOTpoYmcQCg3tFEVDEYezbFJJw5Wr_7HDJ37E";
const LOGO_DARK_URL = import.meta.env.VITE_LOGO_DARK_URL || 
  "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTQ3NDAzNywiZXhwIjoxNzcxMDEwMDM3fQ.iHY1XnWOV2gb8TcHvGkyC17RtyWMcxUvo-1E_m0MwN0";

const Loading = () => {
  const { isDarkMode } = useDarkMode();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Preload images dengan Promise.all
    const preloadImages = async () => {
      const images = [LOGO_LIGHT_URL, LOGO_DARK_URL];
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
        // Deteksi loading cepat dan percepat animasi jika perlu
        const loadTime = Date.now() - startTimeRef.current;
        if (loadTime < 500) {
          setProgress(70); // Mulai dari 70% jika loading cepat
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };
    
    preloadImages();

    // Adaptive timer speed berdasarkan performa device
    const interval = window.navigator.hardwareConcurrency > 4 ? 15 : 25;

    timerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timerRef.current);
          return 100;
        }
        
        // Percepat animasi jika sudah tidak loading
        const increment = !isLoading ? 5 : 1;
        return Math.min(prevProgress + increment, 100);
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading]);
  
  return (
    <div className={`loader ${isDarkMode ? 'dark' : 'light'}`}>
      <img 
        src={isDarkMode ? LOGO_LIGHT_URL : LOGO_DARK_URL}
        alt="KamaCleans" 
        width="208" 
        height="208"
        decoding="async"
        loading="eager"
      />
      <p>Memuat... {progress}%</p>
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;