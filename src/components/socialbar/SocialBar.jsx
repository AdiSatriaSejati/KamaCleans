import React from 'react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import './SocialBar.css'

const SocialBar = () => {
  return (
    <div className="social-bar">
      <a 
        href="https://www.instagram.com/kamacleans/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
      >
        <div className="social-bar__item social-bar__instagram">
          <IconBrandInstagram 
            stroke={2} 
            size={30} 
            color="white"
            aria-hidden="true"
          />
        </div>
      </a>
      <a 
        href="https://api.whatsapp.com/send?phone=6285282866479" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <div className="social-bar__item social-bar__whatsapp">
          <IconBrandWhatsapp 
            stroke={2} 
            size={30} 
            color="white"
            aria-hidden="true"
          />
        </div>
      </a>
    </div>
  );
};

export default SocialBar;