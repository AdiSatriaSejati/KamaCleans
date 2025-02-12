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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const { isDarkMode, changeDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setIsScrolled(window.scrollY > 50);

      // Get all sections
      const sections = navigationRoutes.map(route => {
        const element = document.getElementById(sectionIds[route]);
        if (element) {
          return {
            id: route.toLowerCase(),
            top: element.offsetTop - 100,
            bottom: element.offsetTop + element.offsetHeight - 100
          };
        }
        return null;
      }).filter(Boolean); // Filter out null values

      // Check if hero section is visible
      const heroSection = document.getElementById('home-section');
      if (heroSection) {
        setIsHeroVisible(
          window.scrollY < (heroSection.offsetTop + heroSection.offsetHeight - 100)
        );
      }

      // Find active section
      if (sections.length > 0) {
        const currentPosition = window.scrollY + window.innerHeight / 2;
        const activeSection = sections.reduce((acc, section) => {
          if (currentPosition >= section.top && currentPosition <= section.bottom) {
            return section.id;
          }
          return acc;
        }, 'home'); // Provide 'home' as initial value

        setActiveSection(activeSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (route) => {
    const sectionId = sectionIds[route];
    const section = document.getElementById(sectionId);
    
    if (section) {
      if (isOpen) {
        setIsOpen(false);
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
      <div className="nav-content">
        {/* Hamburger Menu */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
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
          {isOpen && (
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
    </nav>
  );
};

export default Navbar;