import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { IconBrandWhatsapp, IconBrandInstagram, IconMapPin, IconClock, IconPhone } from '@tabler/icons-react';
import './Contact.css';

// Lazy load Google Maps component
const GoogleMap = lazy(() => import('../../components/GoogleMap'));

const Contact = () => {
  const mapRef = useRef(null);

  const contactInfo = [
    {
      icon: <IconPhone size={24} />,
      title: "Telepon",
      content: "+62 852-8286-6479",
      link: "tel:+6285282866479"
    },
    {
      icon: <IconClock size={24} />,
      title: "Jam Operasional",
      content: "Senin - Minggu: 00:00 - 23:59"
    },
    {
      icon: <IconMapPin size={24} />,
      title: "Lokasi",
      content: "Jl. Teratai 2 no. 21 rt 07 rw 08 blok b 33, Kutabumi, Kec. Ps. Kemis, Kabupaten Tangerang, Banten 15560"
    }
  ];

  const socialLinks = [
    {
      icon: <IconBrandWhatsapp size={32} />,
      name: "WhatsApp",
      link: "https://api.whatsapp.com/send?phone=6285282866479",
      color: "#0f8038"
    },
    {
      icon: <IconBrandInstagram size={32} />,
      name: "Instagram",
      link: "https://www.instagram.com/kamacleans/",
      color: "#d12e4c"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="page-container contact-container">
      <motion.div 
        className="contact-content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h2 
          className="contact-title"
          variants={fadeInUp}
        >
          Contact Us
          <div className="glowing-line-4"></div>
        </motion.h2>

        <motion.div 
          className="contact-grid"
          variants={staggerContainer}
        >
          <motion.div 
            className="contact-info"
            variants={fadeInUp}
          >
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="info-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <h3 className="info-title">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link}>{info.content}</a>
                  ) : (
                    <p>{info.content}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div 
              className="social-links"
              variants={fadeInUp}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button"
                  style={{ backgroundColor: social.color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="map-container"
            variants={fadeInUp}
            ref={mapRef}
          >
            {/* Lazy load map */}
            <Suspense fallback={<div className="map-loading">Loading map...</div>}>
              <GoogleMap />
            </Suspense>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;