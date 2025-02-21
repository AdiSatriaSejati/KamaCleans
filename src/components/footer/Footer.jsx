import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useDarkMode } from '../../context/darkModeContext';
import FooterWave from './FooterWave';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useDarkMode();

  const scrollToHome = (e) => {
    e.preventDefault();
    const homeSection = document.getElementById('beranda-section');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-wave-container">
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <FooterWave />
          </Suspense>
        </Canvas>
      </div>

      <div className="footer-content">
        <a href="#beranda-section" 
           onClick={scrollToHome} 
           className="footer-logo-link"
           aria-label="Scroll to top">
          <img
            src={isDarkMode ? 
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk0NzQwMjYsImV4cCI6MTc3MTAxMDAyNn0.obTkNApOTpoYmcQCg3tFEVDEYezbFJJw5Wr_7HDJ37E" :
              "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTQ3NDAzNywiZXhwIjoxNzcxMDEwMDM3fQ.iHY1XnWOV2gb8TcHvGkyC17RtyWMcxUvo-1E_m0MwN0"
            }
            alt="KamaCleans Logo"
            className="footer-logo"
            width="120"
            height="120"
          />
        </a>
        
        <div className="footer-copyright">
          <p>© {currentYear} KamaCleans. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 