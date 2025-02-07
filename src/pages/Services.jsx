import React, { lazy } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const ServiceCard = lazy(() => import('../components/services/ServiceCard'));

const services = [
  {
    title: "CUCI HELM",
    price: "35.000,00",
    description: "Kamacleans menyediakan layanan cuci helm yang higienis dan detail. Helm dibersihkan menyeluruh, baik bagian luar maupun dalam, dengan teknik khusus yang menjaga material helm tetap aman dan nyaman dipakai. Kami juga menggunakan bahan anti-bakteri untuk menghilangkan bau dan menjaga kebersihan helm untuk keamanan berkendara.",
    modelPath: "/models/helmet.glb"
  },
  {
    title: "CUCI SEPATU",
    price: "35.000,00",
    description: "Layanan cuci sepatu Kamacleans dirancang untuk membersihkan dan merawat sepatu dengan bahan dan teknik khusus. Mulai dari sneakers hingga sepatu kulit, kami membersihkan noda, menghilangkan bau tak sedap, dan merawat detail sepatu agar tetap awet dan nyaman dipakai.",
    modelPath: "/models/shoes.glb"
  },
  {
    title: "CUCI TOPI",
    price: "15.000,00",
    description: "Topi favorit Anda sering kotor atau berbau? Kamacleans menawarkan layanan khusus cuci topi yang mampu mengangkat noda tanpa merusak bentuk atau warna. Dengan teknik dan bahan yang aman, kami memastikan topi Anda tetap segar dan nyaman dipakai.",
    modelPath: "/models/cap.glb"
  }
];

const Services = () => {
  return (
    <div className="page-container services-container">
      
      <motion.h1 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glowing-line-2"></div>
        Our Services
      </motion.h1>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.title}
            {...service}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;