import React, { useState, useEffect } from 'react';
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
import logoDark from '/images/logo-dark.png';
import logoLight from '/images/logo-light.png';
import MusicBox from '../music/MusicBox';
import { useDarkMode } from '../../context/darkModeContext';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');
  const { isDarkMode, changeDarkMode } = useDarkMode();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll detection
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection with Intersection Observer
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
          setIsHeroVisible(section.getAttribute('id') === 'home-section');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    document.body.classList.toggle('lock-scroll');
  };

  const scrollToSection = (route) => {
    const sectionId = sectionIds[route];
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      if (navOpen) {
        setNavOpen(false);
        document.body.classList.remove('lock-scroll');
      }
    }
  };

  const navClassName = `navbar ${isScrolled ? 'scrolled' : ''} ${isHeroVisible ? 'on-hero' : ''}`;

  return (
    <nav className={navClassName}>
      <div className="nav-content">
        {/* Hamburger Menu */}
        <button 
          className={`hamburger ${navOpen ? 'active' : ''}`} 
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <motion.img 
          src={isDarkMode ? logoLight : logoDark} 
          alt="Logo" 
          className="nav-logo"
          onClick={() => scrollToSection('Home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />

        {/* Desktop Navigation */}
        <motion.div 
          className="nav-links desktop"
          initial="hidden"
          animate="visible"
          variants={FadeContainer}
        >
          {navigationRoutes.map((route, index) => (
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
              className="mobile-nav"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-nav-links">
                {navigationRoutes.map((route, index) => (
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="nav-controls">
          <MusicBox />
          <DarkModeSwitch
            className="Mode"
            checked={isDarkMode}
            onChange={changeDarkMode}
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