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
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Cleaning Service
          </motion.h1>
          
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
        <motion.img 
          src="/images/services/shoes.png"
          alt="Shoes"
          className="float-image shoes"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.img 
          src="/images/services/helmet.png"
          alt="Helmet"
          className="float-image helmet"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.img 
          src="/images/services/caps.png"
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