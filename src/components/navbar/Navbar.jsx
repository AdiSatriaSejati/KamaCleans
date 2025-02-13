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
import logoDark from '/images/logo-dark.webp';
import logoLight from '/images/logo-light.webp';
import { useDarkMode } from '../../context/darkModeContext';

// Lazy load MusicBox karena tidak selalu dibutuhkan segera
const MusicBox = lazy(() => import('../music/MusicBox'));

// Loading placeholder untuk MusicBox
const MusicBoxPlaceholder = () => (
  <div className="music-box-placeholder" style={{ width: '24px', height: '24px' }}></div>
);

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');
  const { isDarkMode } = useDarkMode();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

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

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
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

  return (
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
            src={isDarkMode ? logoLight : logoDark} 
            alt="KamaCleans" 
            className="nav-logo"
            onClick={() => scrollToSection('Home')}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;