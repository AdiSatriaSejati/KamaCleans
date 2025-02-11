import React from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Services.css';

const services = [
  {
    title: "CUCI HELM",
    price: "35.000,00",
    description: "Kamacleans menyediakan layanan cuci helm yang higienis dan detail. Helm dibersihkan menyeluruh, baik bagian luar maupun dalam, dengan teknik khusus yang menjaga material helm tetap aman dan nyaman dipakai.",
    features: [
      "Deep cleaning interior & exterior",
      "Penghilang bau bakteri",
      "Treatment anti jamur",
      "Pengering khusus helm"
    ],
    images: [
      "/images/services/helmet/1.webp",
      "/images/services/helmet/2.webp",
      "/images/services/helmet/3.webp"
    ],
    icon: "helmet-icon.svg"
  },
  {
    title: "CUCI SEPATU",
    price: "35.000,00",
    description: "Layanan cuci sepatu Kamacleans dirancang untuk membersihkan dan merawat sepatu dengan bahan dan teknik khusus. Mulai dari sneakers hingga sepatu kulit.",
    features: [
      "Deep cleaning upper & sole",
      "Penghilang noda membandel",
      "Treatment sesuai material",
      "Pengering khusus sepatu"
    ],
    images: [
      "/images/gallery/shoes/1.jpg", 
      "/images/gallery/shoes/2.jpg",
      "/images/gallery/shoes/3.jpg"
    ],
    icon: "/images/logo.svg"
  },
  {
    title: "CUCI TOPI",
    price: "15.000,00", 
    description: "Topi favorit Anda sering kotor atau berbau? Kamacleans menawarkan layanan khusus cuci topi yang mampu mengangkat noda tanpa merusak bentuk atau warna.",
    features: [
      "Deep cleaning interior & exterior",
      "Penghilang noda & bau",
      "Treatment khusus topi",
      "Pengering bentuk topi"
    ],
    images: [
      "/images/services/cap/1.webp",
      "/images/services/cap/2.webp", 
      "/images/services/cap/3.webp"
    ],
    icon: "cap-icon.svg"
  }
];

const Services = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="services-container">
      <motion.h1 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
        <div className="glowing-line-2"></div>
      </motion.h1>

      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={service.title}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="service-header">
              <img 
                src={service.icon} 
                alt={service.title} 
                className="service-icon"
              />
              <h2>{service.title}</h2>
              <div className="price">Rp {service.price}</div>
            </div>

            <div className="service-images">
              {service.images.map((img, i) => (
                <div key={i} className="image-container">
                  <img src={img} alt={`${service.title} ${i+1}`} />
                </div>
              ))}
            </div>

            <div className="service-content">
              <p className="description">{service.description}</p>
              <ul className="features-list">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button 
                className="book-button"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=6285282866479', '_blank')}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;