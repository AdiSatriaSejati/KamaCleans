import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeContainer, popUp } from '../utils/FramerMotionVariants';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const containerRef = useRef(null);

  const images = {
    shoes: [
      { id: 1, src: '/images/slider/1.webp', category: 'shoes' },
      { id: 2, src: '/images/slider/2.webp', category: 'shoes' },
      { id: 3, src: '/images/slider/3.webp', category: 'shoes' },
      { id: 4, src: '/images/slider/1.webp', category: 'shoes' },
      { id: 5, src: '/images/slider/2.webp', category: 'shoes' },
      { id: 6, src: '/images/slider/3.webp', category: 'shoes' },
    ],
    helmets: [
      { id: 7, src: '/images/slider/1.webp', category: 'helmets' },
      { id: 8, src: '/images/slider/2.webp', category: 'helmets' },
      { id: 9, src: '/images/slider/3.webp', category: 'helmets' },
    ],
    caps: [
      { id: 10, src: '/images/slider/1.webp', category: 'caps' },
      { id: 11, src: '/images/slider/2.webp', category: 'caps' },
      { id: 12, src: '/images/slider/3.webp', category: 'caps' },
    ]
  };

  const allImages = [...images.shoes, ...images.helmets, ...images.caps];

  const filteredImages = category === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === category);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="page-container gallery-container">
      <motion.h1 
        className="gallery-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glowing-line-2"></div>
        Our Gallery
      </motion.h1>

      <motion.div 
        className="category-filters"
        variants={FadeContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          className={`filter-btn ${category === 'all' ? 'active' : ''}`}
          onClick={() => setCategory('all')}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'shoes' ? 'active' : ''}`}
          onClick={() => setCategory('shoes')}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shoes
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'helmets' ? 'active' : ''}`}
          onClick={() => setCategory('helmets')}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Helmets
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'caps' ? 'active' : ''}`}
          onClick={() => setCategory('caps')}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Caps
        </motion.button>
      </motion.div>

      <motion.div 
        className="gallery-grid" 
        ref={containerRef}
        variants={FadeContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            variants={popUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={`Gallery item ${image.id}`}
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeModal}>×</button>
              <img 
                src={selectedImage.src} 
                alt={`Gallery item ${selectedImage.id}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;