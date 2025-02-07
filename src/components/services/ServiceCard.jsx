import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import './ServiceCard.css';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

const ServiceCard = ({ title, price, description, modelPath, index }) => {
  const cardRef = useRef();

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
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="model-container">
        <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Stage environment="city" intensity={0.6}>
              <Model path={modelPath} />
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