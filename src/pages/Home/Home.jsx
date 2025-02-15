import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react';
import SocialBar from '../../components/socialbar/SocialBar';
import './Home.css';

const Home = () => {
  // Base URL untuk gambar
  const shoesUrl = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/shoes.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9zaG9lcy53ZWJwIiwiaWF0IjoxNzM5NTMyMTM5LCJleHAiOjE3NzEwNjgxMzl9.FXI_MBbC6vQ2E4hCIFPpAU97eaky6oFqvHZHpmXc4rA";
  const helmetUrl = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/helmet.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9oZWxtZXQud2VicCIsImlhdCI6MTczOTYzOTkxNiwiZXhwIjoxNzcxMTc1OTE2fQ.nBvbYCUWS9wesJO2vybsrdUJOSXsDVnP2WjjdSzNH88";
  const capsUrl = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/caps.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9jYXBzLndlYnAiLCJpYXQiOjE3Mzk2Mzk0ODAsImV4cCI6MTc3MTE3NTQ4MH0.Lm010spLKFBA7s8wWD5H39NcCqej8V9s_A9zgTGQe4s";
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 
            className="hero-title"
          >
            Premium Cleaning Service
          </h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Buat Sepatu, Helm & Topi Anda Seperti Baru Kembali
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://api.whatsapp.com/send?phone=6285282866479" className="cta-button">
              <IconBrandWhatsapp size={20} />
              Pesan Sekarang
            </a>
          </motion.div>

          <motion.div 
            className="trust-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="badge">
              <span className="badge-number">100+</span>
              <span className="badge-text">Pelanggan Puas</span>
            </div>
            <div className="badge">
              <span className="badge-number">5.0</span>
              <span className="badge-text">Rating Google</span>
            </div>
            <div className="badge">
              <span className="badge-number">1+</span>
              <span className="badge-text">Tahun Pengalaman</span>
            </div>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              const aboutSection = document.getElementById('about-section');
              const offset = 50; // Sesuaikan dengan tinggi navbar
              const elementPosition = aboutSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            <motion.div 
              className="chevron"
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="chevron"
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="hero-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="info-item">
            <IconMapPin size={24} />
            <p>Tangerang, Indonesia</p>
          </div>
          <div className="info-item">
            <IconClock size={24} />
            <p>Buka: 00.00 - 23.59 WIB</p>
          </div>
        </motion.div>
      </div>

      <div className="floating-images">
        {/* Shoes Image */}
        <img 
          src={shoesUrl}
          alt="Shoes"
          className="float-image shoes animate-float-left"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          width="400"
          height="400"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Helmet Image */}
        <motion.img 
          src={helmetUrl}
          alt="Helmet"
          className="float-image helmet"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Cap Image */}
        <motion.img 
          src={capsUrl}
          alt="Cap"
          className="float-image cap"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      <SocialBar />
    </div>
  );
};

export default Home; 