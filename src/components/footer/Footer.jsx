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
            src={isDarkMode ? 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk0NzQwOTEsImV4cCI6MTc3MTAxMDA5MX0.oZoccywLCVrIqdF97lhr_V8GQJg2eLCYSEWWgRcDgy8' : 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTQ3NDAzNywiZXhwIjoxNzcxMDEwMDM3fQ.iHY1XnWOV2gb8TcHvGkyC17RtyWMcxUvo-1E_m0MwN0'}
            alt="KamaCleans Logo" 
            className="footer-logo-img"
            width="120"
            height="120"
            loading="lazy"
            decoding="async"
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