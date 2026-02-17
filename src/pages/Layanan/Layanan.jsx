import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import './Layanan.css';
import { addPassiveEventListener } from '../../utils/utils';

const layanan = [
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
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/helmet.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9oZWxtZXQud2VicCIsImlhdCI6MTc3MTMzMzg4MCwiZXhwIjoxODAyODY5ODgwfQ.Aagwgq14GuLb8LuPcMhP5VhqhjrLc0JK0ILxoplbYaM"
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
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/shoes.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9zaG9lcy53ZWJwIiwiaWF0IjoxNzcxMzMzODQ1LCJleHAiOjE4MDI4Njk4NDV9.bdFpZcM9igYjDEDCxiJdXAIHTHcpujWQmLbpypnWb2k"
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
    image: "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/services/caps.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9zZXJ2aWNlcy9jYXBzLndlYnAiLCJpYXQiOjE3NzEzMzM4ODgsImV4cCI6MTgwMjg2OTg4OH0.Jju9AOleVXRffeBY-yGXMJesZW1WPU35s_y-8S5VkKk"
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
      className="layanan-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="layanan-image-container">
        <motion.img 
          src={service.image} 
          alt={service.title}
          style={{ y }}
        />
        <div className="layanan-price">Rp {service.price}</div>
      </div>
      
      <div className="layanan-content">
        <h2 className="layanan-title">{service.title}</h2>
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

const Layanan = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // ... existing scroll logic ...
    };

    const cleanup = addPassiveEventListener(window, 'scroll', handleScroll);
    
    return cleanup;
  }, []);

  return (
    <div className="layanan-container">
      <div className="layanan-background">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere"></div>
      </div>

      <motion.h1 
        className="layanan-title"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Layanan Kami
        <div className="glowing-line"></div>
      </motion.h1>

      <div className="layanan-grid">
        {layanan.map((service, index) => (
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

export default Layanan;