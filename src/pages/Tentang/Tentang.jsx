import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Testimonials from '../../components/testimonials/Testimonials';
import './Tentang.css';

const Tentang = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { number: "500+", label: "Clients" },
    { number: "1000+", label: "Items Cleaned" },
    { number: "100%", label: "Satisfaction" }
  ];

  return (
    <div className="tentang-container" ref={sectionRef}>
      <motion.div 
        className="tentang-content"
        style={{ y, opacity }}
      >
        <div className="tentang-wrapper">
          <motion.h2 
            className="tentang-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Tentang Kama
          </motion.h2>
          
          <div className="glowing-line"></div>

          <div className="tentang-grid">
            <motion.div 
              className="tentang-text-section"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TypeAnimation
                sequence={[
                  'KamaCleans adalah layanan profesional yang mengkhususkan diri dalam pembersihan sepatu, helm, dan topi dengan standar kualitas tinggi.',
                  1000
                ]}
                wrapper="p"
                speed={50}
                className="tentang-description"
              />
              <p className="tentang-detail">
                Bergabung sejak September 2024, kami telah berkomitmen untuk memberikan layanan terbaik dengan metode pembersihan khusus dan bahan ramah lingkungan. Kami tidak hanya membersihkan, tetapi juga merawat dan memastikan setiap item pelanggan terjaga kualitasnya. Dengan layanan pickup dan delivery, kami hadir untuk memberikan kemudahan dan kenyamanan bagi pelanggan kami.
              </p>

              <div className="stats-container">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="tentang-image-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="image-container">
                <img 
                  src="https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/about-kama.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9hYm91dC1rYW1hLndlYnAiLCJpYXQiOjE3NDAwMDkwMTcsImV4cCI6MTc3MTU0NTAxN30.7pj3d276N-9I9ifpU67xDwRuZsoegRnLbIAmE1r1LKE" 
                  alt="KamaCleans Service"
                  className="tentang-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="established-date">Est. 2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="testimonials-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Testimonials />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tentang;