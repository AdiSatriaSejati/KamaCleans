import React, { useState } from 'react';
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

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleClick = () => {
    setNavOpen(!navOpen);
    document.body.classList.toggle('lock-scroll');
  };

  const scrollToSection = (route) => {
    const sectionId = sectionIds[route];
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Close mobile menu if open
      if (navOpen) {
        setNavOpen(false);
        document.body.classList.remove('lock-scroll');
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Hamburger Menu */}
        <div className={`hamburger ${navOpen ? 'open' : ''}`} onClick={handleClick}>
          {!navOpen ? (
            <svg className="ham-icon" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="ham-icon" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Logo */}
        <div onClick={() => scrollToSection('Home')} className="logo-container" style={{cursor: 'pointer'}}>
          <img 
            src={navOpen ? (isDarkMode ? logoLight : logoDark) : (isDarkMode ? logoLight : logoDark)} 
            alt="Logo" 
            className="nav-logo" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="nav-items"
          >
            {navigationRoutes.map((route, index) => (
              <div
                key={index}
                onClick={() => scrollToSection(route)}
                className="nav-item"
                style={{cursor: 'pointer'}}
              >
                <motion.span variants={popUp} className="capitalize">
                  {route}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              className="mobile-menu"
              variants={hamFastFadeContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="mobile-nav">
                {navigationRoutes.map((route, index) => (
                  <div
                    key={index}
                    onClick={() => scrollToSection(route)}
                    className="mobile-nav"
                  >
                    <motion.span variants={mobileNavItemSideways}>
                      {route}
                    </motion.span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Container */}
        <div className="controls-container">
          <MusicBox />
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
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