import React from 'react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import './SocialBar.css'
import { trackSocialClick } from '../../utils/analytics';

const SocialBar = () => {
  const handleSocialClick = (platform) => {
    trackSocialClick(platform);
  };

  return (
    <div className="social-bar">
      <a 
        onClick={() => handleSocialClick('instagram')}
        href="https://www.instagram.com/kamacleans/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
      >
        <div className="social-bar__item social-bar__instagram">
          <IconBrandInstagram 
            stroke={2} 
            size={30} 
            aria-hidden="true"
          />
        </div>
      </a>
      <a 
        onClick={() => handleSocialClick('whatsapp')}
        href="https://api.whatsapp.com/send?phone=6285282866479" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <div className="social-bar__item social-bar__whatsapp">
          <IconBrandWhatsapp 
            stroke={2} 
            size={30} 
            aria-hidden="true"
          />
        </div>
      </a>
    </div>
  );
};

export default SocialBar;