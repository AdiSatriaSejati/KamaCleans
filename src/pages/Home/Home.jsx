import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react';
import SocialBar from '../../components/socialbar/SocialBar';
import './Home.css';

const Home = () => {
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
        <img 
          src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/shoes.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9zaG9lcy53ZWJwIiwiaWF0IjoxNzM5NTMyMTM5LCJleHAiOjE3NzEwNjgxMzl9.FXI_MBbC6vQ2E4hCIFPpAU97eaky6oFqvHZHpmXc4rA"
          alt="Shoes"
          className="float-image shoes animate-float-left"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          width="400"
          height="400"
        />
        <motion.img 
          src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/helmet.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9oZWxtZXQud2VicCIsImlhdCI6MTczOTUzMjExMiwiZXhwIjoxNzcxMDY4MTEyfQ.5etuoR_CalsWWIEYUince3_aOOo1H1Bp88JIdVpYc-8"
          alt="Helmet"
          className="float-image helmet"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          loading="lazy"
          decoding="async"
        />
        <motion.img 
          src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/caps.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9jYXBzLndlYnAiLCJpYXQiOjE3Mzk1MzIwODAsImV4cCI6MTc3MTA2ODA4MH0.lxebtInOOCfxNXJ3XSWi1rKtvyUmM3FXcxaSnTzgS6g"
          alt="Cap"
          className="float-image cap"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </div>

      <SocialBar />
    </div>
  );
};

export default Home; 