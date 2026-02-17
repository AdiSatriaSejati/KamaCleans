import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeContainer, popUp } from '../../utils/FramerMotionVariants';
import './Galeri.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const [visibleImages, setVisibleImages] = useState(6); // Jumlah gambar yang ditampilkan awal
  const containerRef = useRef(null);

  const images = {
    shoes: [
      { id: 1, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEud2VicCIsImlhdCI6MTc3MTMzNDEzNywiZXhwIjoxODAyODcwMTM3fQ.H6_VUCK3F0TitWZQf4Q8lNFRIRYbsuBbv1EkJVvkLd0', category: 'shoes' },
      { id: 2, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIud2VicCIsImlhdCI6MTc3MTMzNDE1MiwiZXhwIjoxODAyODcwMTUyfQ.82B2F98k9ibkSNSArFe6EMAU7xkKS2Cc1EF0v8ZiZVE', category: 'shoes' },
      { id: 3, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMud2VicCIsImlhdCI6MTc3MTMzNDE2MSwiZXhwIjoxODAyODcwMTYxfQ.gKabV1x6o23Dr1Nr6-LyNW_cgkgmdwHfWcd6YbT0zHU', category: 'shoes' },
      { id: 4, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/4.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzQud2VicCIsImlhdCI6MTc3MTMzNDE2OSwiZXhwIjoxODAyODcwMTY5fQ.g1-fEICWWQWSVGBSMV4QR5X_XJVr6-tOyHSQyxRroXg', category: 'shoes' },
      { id: 5, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/5.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzUud2VicCIsImlhdCI6MTc3MTMzNDE4MCwiZXhwIjoxODAyODcwMTgwfQ.JAsQc5X1xggdHerrB-S3Rb8NjazeHfEOZcMFyg1bsuc', category: 'shoes' },
      { id: 6, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/6.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzYud2VicCIsImlhdCI6MTc3MTMzNDE5MiwiZXhwIjoxODAyODcwMTkyfQ.KhwWOuxSfSBr5hLHgKBiI2X379U-rCgQPKvsP1RY9mU', category: 'shoes' },
      { id: 7, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/7.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzcud2VicCIsImlhdCI6MTc3MTMzNDIwNiwiZXhwIjoxODAyODcwMjA2fQ.c1OlpUMkGLGc6-lBH08sc76M0M22t-hXjgo8lo8jqYo', category: 'shoes' },
      { id: 8, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/8.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzgud2VicCIsImlhdCI6MTc3MTMzNDIxMywiZXhwIjoxODAyODcwMjEzfQ.Ii4PDfBBVBMv5yEvXF80hSTLHQVZA3HcqY-Xgbu2Nn4', category: 'shoes' },
      { id: 9, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/9.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzkud2VicCIsImlhdCI6MTc3MTMzNDIyMSwiZXhwIjoxODAyODcwMjIxfQ.jWb73l7YVs4xROw1C3bazUCSBQt5aCyxDzRAppqDurg', category: 'shoes' },
      { id: 10, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/10.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwLndlYnAiLCJpYXQiOjE3NzEzMzQyMzgsImV4cCI6MTgwMjg3MDIzOH0.lx70rFeDHLcHvbvjqTGyQc-rjrHBZ08C6O94gYLbb_U', category: 'shoes' },
      { id: 11, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/11.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzExLndlYnAiLCJpYXQiOjE3NzEzMzQyNDcsImV4cCI6MTgwMjg3MDI0N30.5bxxbBTQ-RJP4NkJp3NkP7-lAlUn3pSfNanfnm6Sviw', category: 'shoes' },
      { id: 12, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/12.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEyLndlYnAiLCJpYXQiOjE3NzEzMzQyNTQsImV4cCI6MTgwMjg3MDI1NH0.rJT08k-IuNVZadn8_dJEEgG4upA0DtvYnc-pLZl9Fh4', category: 'shoes' },
      { id: 13, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/13.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEzLndlYnAiLCJpYXQiOjE3NzEzMzQyNzEsImV4cCI6MTgwMjg3MDI3MX0.iEPYq3yZv01sfSkOxBPkY0-J9Yu1e-vFZeErDPFmijo', category: 'shoes' },
      { id: 14, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/14.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE0LndlYnAiLCJpYXQiOjE3NzEzMzQyODAsImV4cCI6MTgwMjg3MDI4MH0.QlVWvn8wu0pzsyUmF1O9M23yjWBS8lGZNYpt2VOEvqc', category: 'shoes' },
      { id: 15, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/15.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE1LndlYnAiLCJpYXQiOjE3NzEzMzQyODcsImV4cCI6MTgwMjg3MDI4N30.myQ0oSZo82HVNLWPE46gb1NHcyri0toSOBUUvY5k2F8', category: 'shoes' },
      { id: 16, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/16.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE2LndlYnAiLCJpYXQiOjE3NzEzMzQyOTQsImV4cCI6MTgwMjg3MDI5NH0.ipZ0tGDJX75MNcT3X9SfSK8k7z9BLAJ5BQR7wELZ8DU', category: 'shoes' },
      { id: 17, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/17.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE3LndlYnAiLCJpYXQiOjE3NzEzMzQzMDAsImV4cCI6MTgwMjg3MDMwMH0.ipU3LVHIzgUR5hivfSqrHmoQX3oSz-joinVpAZEeiJI', category: 'shoes' },
      { id: 18, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/18.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE4LndlYnAiLCJpYXQiOjE3NzEzMzQzMTEsImV4cCI6MTgwMjg3MDMxMX0.7_lEZTPMQ2rnDm-Q6fawmAElJGrhsop8p8VjwakQH1I', category: 'shoes' },
      { id: 19, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/19.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE5LndlYnAiLCJpYXQiOjE3NzEzMzQzMjAsImV4cCI6MTgwMjg3MDMyMH0.qguTA-WRNmPIT7DvjfB13EZfMUYB7kKwoVDvCSg2w4g', category: 'shoes' },
      { id: 20, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/20.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIwLndlYnAiLCJpYXQiOjE3NzEzMzQzMzIsImV4cCI6MTgwMjg3MDMzMn0.t8VUxXPD5tMPTb3Um3VELOz42tXCHPDS1ZfWRofkqM0', category: 'shoes' },
      { id: 21, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/21.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIxLndlYnAiLCJpYXQiOjE3NzEzMzQzNDAsImV4cCI6MTgwMjg3MDM0MH0.Fw6e4mST62htRaDdqfg65htFS0JYDzwNrLKPpiMr6D4', category: 'shoes' },
      { id: 22, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/22.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIyLndlYnAiLCJpYXQiOjE3NzEzMzQzNTAsImV4cCI6MTgwMjg3MDM1MH0.hXGiuN2YdkgXFPVHwkpqTZEOFw_wrzXGE2ofGEoyWrQ', category: 'shoes' },
      { id: 23, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/23.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIzLndlYnAiLCJpYXQiOjE3NzEzMzQzNTgsImV4cCI6MTgwMjg3MDM1OH0.P6HK2xmrSLObLMAku-hAyCMcSBMHF6aiSCIakXd1IQY', category: 'shoes' },
      { id: 24, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/24.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI0LndlYnAiLCJpYXQiOjE3NzEzMzQzNjUsImV4cCI6MTgwMjg3MDM2NX0.zxWsTKk6VNx660K7f-050mgkbGfBSvqH3ih7Q86RUww', category: 'shoes' },
      { id: 25, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/25.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI1LndlYnAiLCJpYXQiOjE3NzEzMzQzNzIsImV4cCI6MTgwMjg3MDM3Mn0.nuvUNmZZyap-BYND4MrGXZiabON-k1yasqkzfxEXFE4', category: 'shoes' },
      { id: 26, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/26.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI2LndlYnAiLCJpYXQiOjE3NzEzMzQzNzgsImV4cCI6MTgwMjg3MDM3OH0.qgxI2ZnV9aD6QWCzW6Nn_4wGMdiQtuydrn76v7av4Uc', category: 'shoes' },
      { id: 27, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/27.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI3LndlYnAiLCJpYXQiOjE3NzEzMzQzODUsImV4cCI6MTgwMjg3MDM4NX0.n3Ke1XorXvdgiV5J9U11DscSU_-UuRKZ5_ZpDBcOPDo', category: 'shoes' },
      { id: 28, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/28.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI4LndlYnAiLCJpYXQiOjE3NzEzMzQzOTIsImV4cCI6MTgwMjg3MDM5Mn0.IrLiTulUk3aJYOa1J6sjvp6ary3jAuWjbsb639YVcwI', category: 'shoes' },
      { id: 29, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/29.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI5LndlYnAiLCJpYXQiOjE3NzEzMzQzOTksImV4cCI6MTgwMjg3MDM5OX0.nncP58mi9pW-U5xxbKmO9xnqHtj-SjyUYl3mFoQVd48', category: 'shoes' },
      { id: 30, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/30.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMwLndlYnAiLCJpYXQiOjE3NzEzMzQ0MTEsImV4cCI6MTgwMjg3MDQxMX0.DeDcUfwHGMSHbtKlYsgm8Hfyqstm9OE3nBgO6i7XGYo', category: 'shoes' },
      { id: 31, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/31.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjU2M2I5Yi01NzUxLTRhMzYtOGU3YS0xYWRhYWFmZjMzYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMxLndlYnAiLCJpYXQiOjE3NzEzMzQ0MTksImV4cCI6MTgwMjg3MDQxOX0.HgnjLoKZoNCq-iE9m7Qa218kEZ-vp4uAtEA_D_Vuj7Q', category: 'shoes' }
    ],
    helmets: [
    ],
    caps: [
    ]
  };

  const allImages = [...images.shoes, ...images.helmets, ...images.caps];

  const filteredImages = category === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === category);

  const displayedImages = filteredImages.slice(0, visibleImages);
  const hasMore = filteredImages.length > visibleImages;

  const loadMore = () => {
    setVisibleImages(prev => prev + 6); // Tambah 6 gambar setiap klik
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="galeri-container">
      <motion.h1 
        className="galeri-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Galeri Kami
        <div className="glowing-line"></div>
      </motion.h1>
      
      <motion.div 
        className="category-filters"
        variants={FadeContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          className={`filter-btn ${category === 'all' ? 'active' : ''}`}
          onClick={() => {
            setCategory('all');
            setVisibleImages(6); // Reset jumlah gambar saat ganti kategori
          }}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'shoes' ? 'active' : ''}`}
          onClick={() => {
            setCategory('shoes');
            setVisibleImages(6); // Reset jumlah gambar saat ganti kategori
          }}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shoes
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'helmets' ? 'active' : ''}`}
          onClick={() => {
            setCategory('helmets');
            setVisibleImages(6); // Reset jumlah gambar saat ganti kategori
          }}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Helmets
        </motion.button>
        <motion.button 
          className={`filter-btn ${category === 'caps' ? 'active' : ''}`}
          onClick={() => {
            setCategory('caps');
            setVisibleImages(6); // Reset jumlah gambar saat ganti kategori
          }}
          variants={popUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Caps
        </motion.button>
      </motion.div>

      <motion.div 
        className="galeri-grid" 
        ref={containerRef}
        variants={FadeContainer}
        initial="hidden"
        animate="visible"
      >
        {displayedImages.map((image) => (
          <motion.div
            key={image.id}
            className="galeri-item"
            variants={popUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={`galeri item ${image.id}`}
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.button
          className="load-more-btn"
          onClick={loadMore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </motion.button>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeModal}>×</button>
              <img 
                src={selectedImage.src} 
                alt={`galeri item ${selectedImage.id}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;