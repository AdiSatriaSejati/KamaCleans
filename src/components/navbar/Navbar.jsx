import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { navigationRoutes, sectionIds } from '../../utils/utils';
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from '../../utils/FramerMotionVariants';
import './Navbar.css';
import { useDarkMode } from '../../context/darkModeContext';
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../auth/LoginModal'

// Lazy load MusicBox karena tidak selalu dibutuhkan segera
const MusicBox = lazy(() => import('../music/MusicBox'));

// Loading placeholder untuk MusicBox
const MusicBoxPlaceholder = () => (
  <div className="music-box-placeholder" style={{ width: '24px', height: '24px' }}></div>
);

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda-section');
  const { isDarkMode } = useDarkMode();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, signOut } = useAuth()

  // Fungsi untuk mengecek apakah elemen berada dalam viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight / 2) &&
      rect.bottom >= (window.innerHeight / 2)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > 50);
      
      // Check each section
      const sections = document.querySelectorAll('section[id]');
      let foundActive = false;

      sections.forEach(section => {
        if (isElementInViewport(section)) {
          const sectionId = section.getAttribute('id');
          setActiveSection(sectionId);
          setIsHeroVisible(sectionId === 'home-section');
          foundActive = true;
        }
      });

      // If no section is in viewport, default to last active section
      if (!foundActive) {
        const lastSection = Array.from(sections).reduce((prev, current) => {
          return (prev.offsetTop > current.offsetTop) ? prev : current;
        });
        setActiveSection(lastSection.getAttribute('id'));
        setIsHeroVisible(lastSection.getAttribute('id') === 'home-section');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (route) => {
    const sectionId = sectionIds[route];
    const section = document.getElementById(sectionId);
    
    if (section) {
      if (navOpen) {
        setNavOpen(false);
      }
      
      const yOffset = -50;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      // Update active section immediately
      setActiveSection(sectionId);
      setIsHeroVisible(sectionId === 'home-section');
    }
  };

  const handleAuth = async () => {
    if (user) {
      await signOut()
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHeroVisible ? 'on-hero' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            {/* Hamburger Menu */}
            <button 
              className={`hamburger ${navOpen ? 'active' : ''}`} 
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              <span className={isHeroVisible ? 'light-span' : 'dark-span'}></span>
              <span className={isHeroVisible ? 'light-span' : 'dark-span'}></span>
              <span className={isHeroVisible ? 'light-span' : 'dark-span'}></span>
            </button>

            {/* Logo */}
            <motion.img 
              src={isDarkMode ? 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-light.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWxpZ2h0LndlYnAiLCJpYXQiOjE3Mzk1NDUxNzMsImV4cCI6MTc3MTA4MTE3M30.mLBjBtimomTc-zCrTdb-PavoJ2PPq4D8_TzaKMjm9gc' : 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/logo-dark.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9sb2dvLWRhcmsud2VicCIsImlhdCI6MTczOTU0NTE0MywiZXhwIjoxNzcxMDgxMTQzfQ.5ZkZOJEeg6xa2P49IoGpXljMPKLk-dJiAf8FLa4g-Fg'} 
              alt="KamaCleans" 
              className="nav-logo"
              onClick={() => scrollToSection('Beranda')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />

            {/* Navigation Links */}
            <motion.div 
              className="nav-links"
              initial="hidden"
              animate="visible"
              variants={FadeContainer}
            >
              {navigationRoutes.map((route) => (
                <motion.button
                  key={route}
                  onClick={() => scrollToSection(route)}
                  className={`nav-item ${sectionIds[route] === activeSection ? 'active' : ''}`}
                  variants={popUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {route}
                </motion.button>
              ))}
            </motion.div>
            <button 
              className="auth-button"
              onClick={handleAuth}
            >
              {user ? 'Keluar' : 'Masuk'}
            </button>
            {/* Controls dengan Suspense untuk MusicBox */}
            <div className="nav-controls">
              <Suspense fallback={<MusicBoxPlaceholder />}>
                <MusicBox />
              </Suspense>
              <DarkModeSwitch
                className="Mode"
                checked={isDarkMode}
                onChange={() => {}}
                disabled={true}
                size={24}
                moonColor={isHeroVisible ? "#fff" : (isDarkMode ? "#fff" : "#000")}
                sunColor={isHeroVisible ? "#fff" : (isDarkMode ? "#fff" : "#000")}
              />
             {/* Mobile Navigation */}
    <AnimatePresence>
              {navOpen && (
                <motion.div
                  className={`mobile-nav ${isHeroVisible ? 'hero-visible' : ''}`}
                  initial={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: 1 }}
                  exit={{ opacity: 0, x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                >
                  <motion.div 
                    className="mobile-nav-links"
                    variants={hamFastFadeContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.button
                      className="mobile-auth-button"
                      onClick={handleAuth}
                      variants={mobileNavItemSideways}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {user ? 'Keluar' : 'Masuk'}
                    </motion.button>
                    {navigationRoutes.map((route) => (
                      <motion.button
                        key={route}
                        onClick={() => scrollToSection(route)}
                        className={`nav-item ${sectionIds[route] === activeSection ? 'active' : ''}`}
                        variants={mobileNavItemSideways}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {route}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;