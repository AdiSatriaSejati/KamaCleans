import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useDarkMode } from '../../context/darkModeContext';
import FooterWave from './FooterWave';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useDarkMode();

  return (
    <footer className="footer">
      <div className="footer-wave-container">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <Suspense fallback={null}>
            <FooterWave />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="footer-content">
        <div className="footer-logo">
          <img 
            src={isDarkMode ? '/images/logo-light.webp' : '/images/logo-dark.webp'}
            alt="KamaCleans Logo" 
            className="footer-logo-img"
          />
        </div>
        
        <div className="footer-copyright">
          <p>© {currentYear} KamaCleans. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 