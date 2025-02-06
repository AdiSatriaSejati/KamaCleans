import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconStarFilled, IconQuote, IconBrandGoogleMaps } from '@tabler/icons-react';
import testimonialData from '../../data/testimonials.json';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  const { testimonials } = testimonialData;

  // Navigation handlers
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  // Autoplay effect
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [isAutoplay]);

  return (
    <div className="testimonials-container">
      <motion.div 
        className="testimonials-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div 
          className="testimonials-slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-header">
                <div className="user-info">
                  <div className="user-image">
                    <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                  </div>
                  <div className="user-details">
                    <h3>{testimonials[currentIndex].name}</h3>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <IconStarFilled
                          key={i}
                          size={20}
                          className={i < testimonials[currentIndex].rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <a 
                  href={testimonials[currentIndex].googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-link"
                >
                  <IconBrandGoogleMaps size={24} />
                  <span>View on Google Maps</span>
                </a>
              </div>

              <div className="testimonial-content">
                <IconQuote className="quote-icon" size={40} />
                <p>{testimonials[currentIndex].comment}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="slider-controls">
            <button onClick={prevSlide} className="control-btn prev">
              <svg viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="control-btn next">
              <svg viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;