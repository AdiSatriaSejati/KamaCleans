import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react';
import SocialBar from '../../components/socialbar/SocialBar';
import { useDarkMode } from '../../context/darkModeContext';

import './Beranda.css';

const Beranda = () => {
  const { isDarkMode } = useDarkMode();
  
  const handleScrollToLayanan = (e) => {
    e.preventDefault();
    const layananSection = document.getElementById('layanan-section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Dapatkan tinggi navbar
    
    if (layananSection) {
      const elementPosition = layananSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="beranda-container">
      <div className="hero-content">
        <motion.div 
          className="logo-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={isDarkMode ? 
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk0NzQwMjYsImV4cCI6MTc3MTAxMDAyNn0.obTkNApOTpoYmcQCg3tFEVDEYezbFJJw5Wr_7HDJ37E" :
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTQ3NDAzNywiZXhwIjoxNzcxMDEwMDM3fQ.iHY1XnWOV2gb8TcHvGkyC17RtyWMcxUvo-1E_m0MwN0"
            }
            alt="KamaCleans Logo"
            width="250"
            height="250"
          />
        </motion.div>

        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1>LAYANAN CUCI SEPATU, HELM, DAN TOPI</h1>
          <p>KAMACLEANS ADALAH LAYANAN CUCI SEPATU PROFESIONAL DI KUTABUMI, REGENCY, DAN TOMANG YANG SIAP MENJAGA SEPATU ANDA TETAP BERSIH, RAPI, DAN TAHAN LAMA</p>
          
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
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="feature">
            <IconMapPin className="feature-icon" />
            <span>Kutabumi, Tangerang</span>
          </div>
          <div className="feature">
            <IconClock className="feature-icon" />
            <span>Buka 10:00 - 19:00</span>
          </div>
          <div className="feature">
            <IconBrandWhatsapp className="feature-icon" />
            <span>+62 852-8286-6479</span>
          </div>
        </motion.div>
      </div>
      <SocialBar />
    </div>
  );
};

export default Beranda; 