import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeContainer, popUp } from '../../utils/FramerMotionVariants';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const containerRef = useRef(null);

  const images = {
    shoes: [
      { id: 1, src: '/images/gallery/shoes/1.jpg', category: 'shoes' },
      { id: 2, src: '/images/gallery/shoes/2.jpg', category: 'shoes' },
      { id: 3, src: '/images/gallery/shoes/3.jpg', category: 'shoes' },
      { id: 4, src: '/images/gallery/shoes/4.jpg', category: 'shoes' },
      { id: 5, src: '/images/gallery/shoes/5.jpg', category: 'shoes' },
      { id: 6, src: '/images/gallery/shoes/6.jpg', category: 'shoes' },
      { id: 7, src: '/images/gallery/shoes/7.jpg', category: 'shoes' },
      { id: 8, src: '/images/gallery/shoes/8.jpg', category: 'shoes' },
      { id: 9, src: '/images/gallery/shoes/9.jpg', category: 'shoes' },
      { id: 10, src: '/images/gallery/shoes/10.jpg', category: 'shoes' },
      { id: 11, src: '/images/gallery/shoes/11.jpg', category: 'shoes' },
      { id: 12, src: '/images/gallery/shoes/12.jpg', category: 'shoes' },
      { id: 13, src: '/images/gallery/shoes/13.jpg', category: 'shoes' },
      { id: 14, src: '/images/gallery/shoes/14.jpg', category: 'shoes' },
      { id: 15, src: '/images/gallery/shoes/15.jpg', category: 'shoes' },
      { id: 16, src: '/images/gallery/shoes/16.jpg', category: 'shoes' },
      { id: 17, src: '/images/gallery/shoes/17.jpg', category: 'shoes' },
      { id: 18, src: '/images/gallery/shoes/18.jpg', category: 'shoes' },
      { id: 19, src: '/images/gallery/shoes/19.jpg', category: 'shoes' },
      { id: 20, src: '/images/gallery/shoes/20.jpg', category: 'shoes' },
      { id: 21, src: '/images/gallery/shoes/21.jpg', category: 'shoes' },
      { id: 22, src: '/images/gallery/shoes/22.jpg', category: 'shoes' },
      { id: 23, src: '/images/gallery/shoes/23.jpg', category: 'shoes' },
      { id: 24, src: '/images/gallery/shoes/24.jpg', category: 'shoes' },
      { id: 25, src: '/images/gallery/shoes/25.jpg', category: 'shoes' },
      { id: 26, src: '/images/gallery/shoes/26.jpg', category: 'shoes' },
      { id: 27, src: '/images/gallery/shoes/27.jpg', category: 'shoes' },
      { id: 28, src: '/images/gallery/shoes/28.jpg', category: 'shoes' },
      { id: 29, src: '/images/gallery/shoes/29.jpg', category: 'shoes' },
      { id: 30, src: '/images/gallery/shoes/30.jpg', category: 'shoes' },
      { id: 31, src: '/images/gallery/shoes/31.jpg', category: 'shoes' },


      { id: 1000, src: '/images/gallery/shoes/1000.jpg', category: 'shoes' },
      { id: 1001, src: '/images/gallery/shoes/1001.jpg', category: 'shoes' },
      { id: 1002, src: '/images/gallery/shoes/1002.jpg', category: 'shoes' },
      { id: 1003, src: '/images/gallery/shoes/1003.jpg', category: 'shoes' },
      { id: 1004, src: '/images/gallery/shoes/1004.jpg', category: 'shoes' },
      { id: 1005, src: '/images/gallery/shoes/1005.jpg', category: 'shoes' },
      { id: 1006, src: '/images/gallery/shoes/1006.jpg', category: 'shoes' },
    ],
    helmets: [
    ],
    caps: [
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