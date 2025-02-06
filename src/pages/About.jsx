import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './About.css';

const About = () => {
  const sliderRef = useRef(null);
  const [isSliceboxInitialized, setIsSliceboxInitialized] = useState(false);

  useEffect(() => {
    let slicebox = null;
    
    const initSlicebox = async () => {
      try {
        const $ = window.jQuery;
        await import('../utils/jquery.slicebox');
        
        if (sliderRef.current && !isSliceboxInitialized) {
          // Destroy existing instance if any
          if (slicebox) {
            $(sliderRef.current).slicebox('destroy');
          }

          // Initialize new instance with more stable options
          slicebox = $(sliderRef.current).slicebox({
            orientation: 'r',
            cuboidsRandom: true,
            disperseFactor: 30,
            autoplay: true,
            interval: 4000, // Lebih lama untuk stabilitas
            speed: 800, // Lebih cepat untuk transisi
            fallbackFadeSpeed: 300,
            perspective: 1200,
            colorHiddenSides: '#333',
            easing: 'ease', // Gunakan easing yang lebih smooth
          });
          
          setIsSliceboxInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing Slicebox:', error);
      }
    };

    // Tambahkan delay kecil sebelum inisialisasi
    const timer = setTimeout(() => {
      if (window.jQuery) {
        initSlicebox();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (window.jQuery && slicebox) {
        window.jQuery(sliderRef.current).slicebox('destroy');
      }
    };
  }, [isSliceboxInitialized]);

  return (
    <div className="page-container about-container">
      <div className="about-content">
        <motion.div 
          className="about-text-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glowing-line"></div>
          <h2 className="about-title">
            <TypeAnimation
              sequence={[
                'About KamaCleans',
                1000,
                'Professional Cleaning',
                1000,
                'Quality Service',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <div className="about-description">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              KamaCleans adalah layanan profesional yang mengkhususkan diri dalam 
              pembersihan sepatu, helm, dan topi dengan standar kualitas tinggi.
            </motion.p>
            <motion.div 
              className="stats-container"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Items Cleaned</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="about-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ul ref={sliderRef} className="sb-slider">
            <li><img src="/images/about.jpg" alt="image1"/></li>
            <li><img src="/images/about.jpg" alt="image2"/></li>
            <li><img src="/images/about.jpg" alt="image3"/></li>
            <li><img src="/images/about.jpg" alt="image4"/></li>
            <li><img src="/images/about.jpg" alt="image5"/></li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default About;