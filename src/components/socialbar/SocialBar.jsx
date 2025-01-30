import React from 'react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import './SocialBar.css'

const SocialBar = () => {
  return (
    <div className="social-bar">
      <a href="https://www.instagram.com/kamacleans/" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__instagram">
        <IconBrandInstagram stroke={2} size={30} color="white" />
        </div>
      </a>
      <a href="https://api.whatsapp.com/send?phone=6285282866479" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__whatsapp">
        <IconBrandWhatsapp stroke={2} size={30} color="white" />
        </div>
      </a>
    </div>
  );
};

export default SocialBar;