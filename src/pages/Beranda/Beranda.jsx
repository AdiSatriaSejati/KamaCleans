import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react';
import SocialBar from '../../components/socialbar/SocialBar';
import { useDarkMode } from '../../context/darkModeContext';

import './Beranda.css';

// Preload gambar
const preloadImages = () => {
  const images = [
    "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/KAMA-LIGHT.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL0tBTUEtTElHSFQucG5nIiwiaWF0IjoxNzQwNTkwOTMyLCJleHAiOjE3NzIxMjY5MzJ9.BoTMHe0ty4TYgd747hpKBASWZ0VkXOwnWZ5LF9LLEAA",
    "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/KAMA.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL0tBTUEucG5nIiwiaWF0IjoxNzQwNTkwNDY0LCJleHAiOjE3NzIxMjY0NjR9.MZgseaQ5T03ABHAzv3eI447UHgzGrNudbEVe3VpSJOI"
  ];
  
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

const Beranda = () => {
  const { isDarkMode } = useDarkMode();
  
  React.useEffect(() => {
    preloadImages();
  }, []);

  const handleScrollToLayanan = (e) => {
    e.preventDefault();
    const layananSection = document.getElementById('layanan-section');
    
    if (layananSection) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = layananSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="beranda-container">
      <div className="hero-content">
        <motion.div 
          className="logo-beranda"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={isDarkMode ? 
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/KAMA-LIGHT.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL0tBTUEtTElHSFQucG5nIiwiaWF0IjoxNzQwNTkwOTMyLCJleHAiOjE3NzIxMjY5MzJ9.BoTMHe0ty4TYgd747hpKBASWZ0VkXOwnWZ5LF9LLEAA" :
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/KAMA-DARK.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL0tBTUEtREFSSy5wbmciLCJpYXQiOjE3NDA1OTA4MzksImV4cCI6MTc3MjEyNjgzOX0.cgrb473Q_BvGcX5YnfKbRtVCiogmnAHlOpH8aGXUQGo"
            }
            alt="KamaCleans Logo"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>LAYANAN CUCI SEPATU, HELM, DAN TOPI</h1>
          <p>
            <strong>KAMACLEANS ADALAH LAYANAN CUCI SEPATU PROFESIONAL DI KUTABUMI, REGENCY, DAN TOMANG YANG SIAP MENJAGA SEPATU ANDA TETAP BERSIH, RAPI, DAN TAHAN LAMA</strong>
          </p>
          
          <motion.button 
            onClick={handleScrollToLayanan}
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Layanan Kama
          </motion.button>
        </motion.div>

        <motion.div 
          className="hero-features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="feature">
            <IconMapPin className="feature-icon" aria-hidden="true" />
            <span>Kutabumi, Tangerang</span>
          </div>
          <div className="feature">
            <IconClock className="feature-icon" aria-hidden="true" />
            <span>Buka 10:00 - 19:00</span>
          </div>
          <div className="feature">
            <IconBrandWhatsapp className="feature-icon" aria-hidden="true" />
            <span>+62 852-8286-6479</span>
          </div>
        </motion.div>
      </div>
      <SocialBar />
    </div>
  );
};

export default Beranda; 