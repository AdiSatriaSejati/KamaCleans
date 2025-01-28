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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Mendeteksi section yang aktif
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
          setActiveSection(section.getAttribute('id'));
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

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${activeSection === 'home-section' ? 'on-hero' : ''}`}>
      <div className="nav-content">
         {/* Mobile Navigation Toggle */}
         <button 
          className={`hamburger ${navOpen ? 'active' : ''}`} 
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="mobile-nav-links">
                {navigationRoutes.map(route => (
                  <motion.button
                    key={route}
                    onClick={() => scrollToSection(route)}
                    className={`nav-item ${sectionIds[route] === activeSection ? 'active' : ''}`}
                    variants={mobileNavItemSideways}
                  >
                    {route}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <img 
          src={isDarkMode ? logoLight : logoDark} 
          alt="Logo" 
          className="nav-logo"
          onClick={() => scrollToSection('Home')}
        />

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          {navigationRoutes.map(route => (
            <button
              key={route}
              onClick={() => scrollToSection(route)}
              className={`nav-item ${sectionIds[route] === activeSection ? 'active' : ''}`}
            >
              {route}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="nav-controls">
          <MusicBox />
          <DarkModeSwitch
            className='Mode'
            checked={isDarkMode}
            onChange={changeDarkMode}
            size={24}
            moonColor={navOpen ? (isDarkMode ? "#fff" : "#000") : (isDarkMode ? "#fff" : "#000")}
            sunColor={navOpen ? (isDarkMode ? "#fff" : "#000") : (isDarkMode ? "#fff" : "#000")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;