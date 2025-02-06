import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './About.css';

const About = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const initSlicebox = async () => {
      try {
        const $ = window.jQuery;
        // Import Slicebox
        await import('../utils/jquery.slicebox');
        
        const slicebox = $(sliderRef.current).slicebox({
          orientation: 'r',
          cuboidsRandom: true,
          disperseFactor: 30,
          autoplay: true,
          interval: 3000
        });
      } catch (error) {
        console.error('Error initializing Slicebox:', error);
      }
    };

    // Tunggu sampai jQuery tersedia
    const checkJQuery = setInterval(() => {
      if (window.jQuery) {
        clearInterval(checkJQuery);
        initSlicebox();
      }
    }, 100);

    return () => {
      clearInterval(checkJQuery);
    };
  }, []);

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