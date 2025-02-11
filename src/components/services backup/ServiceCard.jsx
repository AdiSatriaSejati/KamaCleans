import React, { useRef, useEffect, Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls } from '@react-three/drei';
import './ServiceCard.css';

// Lazy load Model component
const Model = lazy(() => import('./Model'));

const ServiceCard = ({ title, price, description, modelPath, index }) => {
  const cardRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const card = cardRef.current;
    
    gsap.fromTo(card,
      { 
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.3,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <motion.div 
      ref={cardRef}
      className="service-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="model-container">
        {isLoading && (
          <div className="loading-placeholder">
            <div className="spinner"></div>
            <span>Loading 3D Model...</span>
          </div>
        )}
        
        <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 0.1, 0]}
            polar={[-Math.PI / 0.1, Math.PI / 0.1]}
            azimuth={[-Math.PI / 0.1, Math.PI / 0.1]}>
            <Stage environment="city" intensity={0.6}>
              <Suspense fallback={null}>
                <Model 
                  path={modelPath} 
                  onLoad={() => setIsLoading(false)}
                />
              </Suspense>
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>

      <div className="service-info">
        <h2>{title}</h2>
        <div className="price">Rp {price}</div>
        <p>{description}</p>
        <motion.button 
          className="book-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://api.whatsapp.com/send?phone=6285282866479', '_blank')}
        >
          Pesan Sekarang
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;