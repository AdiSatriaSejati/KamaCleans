import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import './Services.css';

const services = [
  {
    title: "CUCI HELM",
    price: "35.000,00",
    description: "Kamacleans menyediakan layanan cuci helm yang higienis dan detail. Helm dibersihkan menyeluruh, baik bagian luar maupun dalam, dengan teknik khusus yang menjaga material helm tetap aman.",
    features: [
      "Deep cleaning interior & exterior",
      "Sanitasi anti-bakteri",
      "Pewangi premium",
      "Perawatan visor khusus"
    ],
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/helmet.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9oZWxtZXQud2VicCIsImlhdCI6MTczOTUzMDcxNywiZXhwIjoxNzcxMDY2NzE3fQ.QSTnBGxDEp1GKq3snJtWAxDzYHcSePxLe3VWhaB6KRw"
  },
  {
    title: "CUCI SEPATU",
    price: "35.000,00",
    description: "Layanan cuci sepatu Kamacleans dirancang untuk membersihkan dan merawat sepatu dengan bahan dan teknik khusus. Kami menangani berbagai jenis sepatu dengan perawatan spesifik.",
    features: [
      "Deep cleaning upper & sole",
      "Pembersihan detail",
      "Pewangi premium",
      "Treatment khusus material"
    ],
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/shoes.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9zaG9lcy53ZWJwIiwiaWF0IjoxNzM5NTMwNzUxLCJleHAiOjE3NzEwNjY3NTF9.rDdyFtXYhMTrSMm2gNFmNT4uG7ksDV1csTzH4bMk_9U"
  },
  {
    title: "CUCI TOPI",
    price: "15.000,00",
    description: "Topi favorit Anda akan kembali bersih dan fresh dengan layanan cuci topi kami. Menggunakan teknik dan bahan yang aman untuk menjaga bentuk dan warna tetap terjaga.",
    features: [
      "Deep cleaning menyeluruh",
      "Perawatan bahan khusus",
      "Pewangi premium",
      "Menjaga bentuk original"
    ],
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/caps.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9jYXBzLndlYnAiLCJpYXQiOjE3Mzk1MzA2MDcsImV4cCI6MTc3MTA2NjYwN30.Iv6QPPKHVD4H7EeNxTZBSwOqhj01TrpttaXccFdzQgg"
  }
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="service-image-container">
        <motion.img 
          src={service.image} 
          alt={service.title}
          style={{ y }}
        />
        <div className="service-price">Rp {service.price}</div>
      </div>
      
      <div className="service-content">
        <h2 className="service-title">{service.title}</h2>
        <p className="description">{service.description}</p>
        
        <ul className="features-list">
          {service.features.map((feature, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * idx }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>

        <motion.button
          className="book-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://api.whatsapp.com/send?phone=6285282866479', '_blank')}
        >
          <IconBrandWhatsapp size={20} />
          Pesan Sekarang
        </motion.button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-background">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere"></div>
      </div>

      <motion.h1 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Services
        <div className="glowing-line-2"></div>
      </motion.h1>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.title} 
            service={service} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default Services;