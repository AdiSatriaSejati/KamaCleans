import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
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
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import { LOGO_LIGHT_URL, LOGO_DARK_URL } from '../../config/urls';

// Fungsi throttle untuk mengoptimalkan kinerja scroll
const throttle = (func, delay) => {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
};

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
  const { isDarkMode, changeDarkMode } = useDarkMode();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, signOut } = useAuth();

  // Fungsi untuk mengecek apakah elemen berada dalam viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight / 2) &&
      rect.bottom >= (window.innerHeight / 2)
    );
  };

  // Menggunakan useCallback dengan throttling untuk scroll handler
  const handleScroll = useCallback(throttle(() => {
    // Update scroll state
    setIsScrolled(window.scrollY > 50);
    
    // Check each section
    const sections = document.querySelectorAll('section[id]');
    let foundActive = false;

    sections.forEach(section => {
      if (isElementInViewport(section)) {
        const sectionId = section.getAttribute('id');
        setActiveSection(sectionId);
        setIsHeroVisible(sectionId === 'beranda-section');
        foundActive = true;
      }
    });

    // If no section is in viewport, default to last active section
    if (!foundActive) {
      const lastSection = Array.from(sections).reduce((prev, current) => {
        return (prev.offsetTop > current.offsetTop) ? prev : current;
      });
      setActiveSection(lastSection.getAttribute('id'));
      setIsHeroVisible(lastSection.getAttribute('id') === 'beranda-section');
    }
  }, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Panggil sekali pada mount untuk set keadaan awal
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
      setIsHeroVisible(sectionId === 'beranda-section');
    }
  };

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      setShowLoginModal(true);
    }
  };

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
              src={isDarkMode ? LOGO_LIGHT_URL : LOGO_DARK_URL} 
              alt="KamaCleans" 
              className="nav-logo"
              onClick={() => scrollToSection('Beranda')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              loading="eager"
              width="48"
              height="48"
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
                onChange={changeDarkMode}
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