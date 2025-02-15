import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScrollToTop.css';
import { addPassiveEventListener } from '../../utils/eventUtils';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      // Tampilkan button ketika scroll > 500px
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const cleanup = addPassiveEventListener(window, 'scroll', toggleVisibility);
    
    return cleanup;
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-top-btn"
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="scroll-icon"
          >
            <motion.path
              d="M12 4l8 8-1.4 1.4-5.6-5.6V20h-2V7.8L5.4 13.4 4 12l8-8z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </svg>
          <div className="scroll-ripple"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 