import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IconBrandWhatsapp, IconBrandInstagram, IconMapPin, IconClock, IconPhone } from '@tabler/icons-react';
import './Contact.css';

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
      color: "#25D366"
    },
    {
      icon: <IconBrandInstagram size={32} />,
      name: "Instagram",
      link: "https://www.instagram.com/kamacleans/",
      color: "#E4405F"
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
        <motion.h1 
          className="contact-title"
          variants={fadeInUp}
        >
          Contact Us
          <div className="glowing-line-4"></div>
        </motion.h1>

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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.92748864637807!2d106.56910651294285!3d-6.152201943834907!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff67d732ae63%3A0x3c77b1f64e21c464!2sKAMACLEANS%20(LAUNDRY%20SEPATU%2C%20HELM%2C%20DAN%20TOPI)!5e0!3m2!1sid!2sid!4v1739201992192!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KamaCleans Location Map"
              aria-label="Map showing KamaCleans location"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;