// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { navigationRoutes } from '../../utils/utils';
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from '../../utils/FramerMotionVariants';
import './Navbar.css';
import logo from '/images/logo.svg'; // Sesuaikan path logo

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleClick = () => {
    setNavOpen(!navOpen);
    document.body.classList.toggle('lock-scroll');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={handleClick}>
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
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="nav-items"
          >
            {navigationRoutes.map((route, index) => (
              <Link
                key={index}
                to={route === 'home' ? '/' : `/${route}`}
                className={`nav-item ${
                  location.pathname === (route === 'home' ? '/' : `/${route}`)
                    ? 'active'
                    : ''
                }`}
              >
                <motion.span variants={popUp} className="capitalize">
                  {route}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Dark Mode Toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popUp}
          className="theme-switch"
        >
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={24}
          />
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
                <Link
                  key={index}
                  to={route === 'home' ? '/' : `/${route}`}
                  className="mobile-nav-item"
                  onClick={handleClick}
                >
                  <motion.span variants={mobileNavItemSideways}>
                    {route}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;