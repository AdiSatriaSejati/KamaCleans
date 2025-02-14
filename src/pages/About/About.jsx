import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './About.css';

// Lazy load components
const Testimonials = lazy(() => import('../../components/testimonials/Testimonials'));

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="loading-placeholder">
    <div className="spinner"></div>
    <span>Loading...</span>
  </div>
);

const About = () => {
  const sliderRef = useRef(null);
  const [isSliderLoading, setIsSliderLoading] = useState(true);

  useEffect(() => {
    const initSlicebox = async () => {
      try {
        const $ = window.jQuery;
        await import('../../utils/jquery.slicebox');
        
        const slicebox = $(sliderRef.current).slicebox({
          orientation: 'r',
          cuboidsRandom: true,
          disperseFactor: 30,
          autoplay: true,
          interval: 3000
        });
        
        setIsSliderLoading(false);
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
            <div className="slider-wrapper">
              <div className="slider-placeholder">
                <div className="sb-perspective">
                  <ul className="sb-slider">
                    <li>
                      <img 
                        src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/about.jpg" 
                        alt="About KamaCleans 1" 
                      />
                    </li>
                    <li>
                      <img 
                        src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/about.jpg" 
                        alt="About KamaCleans 2" 
                      />
                    </li>
                    <li>
                      <img 
                        src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/about.jpg" 
                        alt="About KamaCleans 3" 
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="testimonials-section">
        <Suspense fallback={<LoadingPlaceholder />}>
          <Testimonials />
        </Suspense>
      </section>
    </div>
  );
};

export default About;