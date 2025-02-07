import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Testimonials from '../components/testimonials/Testimonials';
import './About.css';

const About = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const initSlicebox = async () => {
      try {
        const $ = window.jQuery;
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
      <section className="about-section">
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
            <div className="slider-placeholder" style={{ 
              width: '100%', 
              paddingTop: '100%', 
              position: 'relative', 
              background: 'var(--background)',
              borderRadius: '20px', // Added border radius
              overflow: 'hidden' // Ensures child elements respect border radius
            }}>
              <ul ref={sliderRef} className="sb-slider" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}>
                <li><img src="/images/about.jpg" alt="image1" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/></li>
                <li><img src="/images/about.jpg" alt="image2" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/></li>
                <li><img src="/images/about.jpg" alt="image3" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/></li>
                <li><img src="/images/about.jpg" alt="image4" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/></li>
                <li><img src="/images/about.jpg" alt="image5" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/></li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="testimonials-section">
        <Testimonials />
      </section>
    </div>
  );
};

export default About;