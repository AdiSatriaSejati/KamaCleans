import React from 'react';
import { Instagram } from 'lucide-react';
import './SocialBar.css'

const SocialBar = () => {
  return (
    <div className="social-bar">
      <a href="https://www.instagram.com/kamacleans/" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__instagram">
          <Instagram size={30} color="white" />
        </div>
      </a>
    </div>
  );
};

export default SocialBar;