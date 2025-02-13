import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeContainer, popUp } from '../../utils/FramerMotionVariants';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const [visibleImages, setVisibleImages] = useState(6); // Jumlah gambar yang ditampilkan awal
  const containerRef = useRef(null);

  const images = {
    shoes: [
      { id: 1, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEuanBnIiwiaWF0IjoxNzM5NDc0OTI2LCJleHAiOjE3NzEwMTA5MjZ9.XGh2JFYNpmqySeqTfgNamq95D-Ql0j7Y-085B_CjNII', category: 'shoes' },
      { id: 2, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIuanBnIiwiaWF0IjoxNzM5NDc0OTUzLCJleHAiOjE3NzEwMTA5NTN9.qGULD19o63cWur9bmtGJG1s1zFHwFIWnFHSpjqJ8NWc', category: 'shoes' },
      { id: 3, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMuanBnIiwiaWF0IjoxNzM5NDc0OTY1LCJleHAiOjE3NzEwMTA5NjV9.gofhMw67c2RUTTnv4hP64MhOO9xj2B3-DVM7tRabcuw', category: 'shoes' },
      { id: 4, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/4.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzQuanBnIiwiaWF0IjoxNzM5NDc0OTgwLCJleHAiOjE3NzEwMTA5ODB9.TzArUCZbCvTpPT6ZfMdF5JcqyxTY0Ppg3ig6e_roxrw', category: 'shoes' },
      { id: 5, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/5.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzUuanBnIiwiaWF0IjoxNzM5NDc0OTg5LCJleHAiOjE3NzEwMTA5ODl9.ZRuxxvoTu3qhEDwar8Jq6fcvRwEE9MSRv9PZFEMD0dM', category: 'shoes' },
      { id: 6, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/6.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzYuanBnIiwiaWF0IjoxNzM5NDc0OTk3LCJleHAiOjE3NzEwMTA5OTd9.YgwYpQc3lAkrl0n2bHb6SHlnyOmUFkLHwBWJa0pm_O0', category: 'shoes' },
      { id: 7, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/7.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzcuanBnIiwiaWF0IjoxNzM5NDc1MDE2LCJleHAiOjE3NzEwMTEwMTZ9.22Qplnm_0obXcrYHpXncbZH2Ed8DUvlgpaGk8djECUs', category: 'shoes' },
      { id: 8, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/8.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzguanBnIiwiaWF0IjoxNzM5NDc1MDMxLCJleHAiOjE3NzEwMTEwMzF9.8wmGJK7Kd0B6GoZwInyr15un8OhO3dC-abDxjf34HYM', category: 'shoes' },
      { id: 9, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/9.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzkuanBnIiwiaWF0IjoxNzM5NDc1MDQzLCJleHAiOjE3NzEwMTEwNDN9.70L0_8Mdv4AIAyrlSWh_xqXudt3YZcMcdPYpDT_yfFo', category: 'shoes' },
      { id: 10, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/10.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwLmpwZyIsImlhdCI6MTczOTQ3NTE2NSwiZXhwIjoxNzcxMDExMTY1fQ.SHMJ-GwvjKHZOFaDWDeHt57Ht6Sf4ekFVLwXlj9kCI0', category: 'shoes' },
      { id: 11, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/11.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzExLmpwZyIsImlhdCI6MTczOTQ3NTE3NCwiZXhwIjoxNzcxMDExMTc0fQ.T7enyISAd3fJHKqY7tnXnYGgNOsmXzwtNiCfcYTux8A', category: 'shoes' },
      { id: 12, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/12.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEyLmpwZyIsImlhdCI6MTczOTQ3NTE4MiwiZXhwIjoxNzcxMDExMTgyfQ.6T4C6m4m0QAdVm-Vbpn3T96n4SofYoTkUPy2v7RCBeQ', category: 'shoes' },
      { id: 13, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/13.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEzLmpwZyIsImlhdCI6MTczOTQ3NTE5NCwiZXhwIjoxNzcxMDExMTk0fQ.IiY7UIQH7nGl3imej3sYH4SoLLa1Cd8Xvp9RLLffUnc', category: 'shoes' },
      { id: 14, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/14.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE0LmpwZyIsImlhdCI6MTczOTQ3NTIwMywiZXhwIjoxNzcxMDExMjAzfQ.MedqAvx8bGk7bYKc05DTWq4IoL79wXPjCu-Zgy-LuS8', category: 'shoes' },
      { id: 15, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/15.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE1LmpwZyIsImlhdCI6MTczOTQ3NTIxMCwiZXhwIjoxNzcxMDExMjEwfQ.42LSfbkeVabxtIZEPlsT0-2tiLlUcVqsynSfSbic_Yk', category: 'shoes' },
      { id: 16, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/16.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE2LmpwZyIsImlhdCI6MTczOTQ3NTI2MywiZXhwIjoxNzcxMDExMjYzfQ.Z4DSGh8IlFkmfjXgvt5qMNROwVRi6r0kQtqcaYdntug', category: 'shoes' },
      { id: 17, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/17.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE3LmpwZyIsImlhdCI6MTczOTQ3NTI3MSwiZXhwIjoxNzcxMDExMjcxfQ.QGGtUJ4dFZZEHQ62JijepiwDnzGK_yooiON3uqfciWs', category: 'shoes' },
      { id: 18, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/18.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE4LmpwZyIsImlhdCI6MTczOTQ3NTI4MCwiZXhwIjoxNzcxMDExMjgwfQ.h_nAvifIR96hd9VkgS5JLJiCm0Pg4ZJqwYceQ2IFhEg', category: 'shoes' },
      { id: 19, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/19.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE5LmpwZyIsImlhdCI6MTczOTQ3NTI4OCwiZXhwIjoxNzcxMDExMjg4fQ.Vp6iG5AHZW33ose9iO_evxHJqNxjXx8NYrYjVlK4Z8o', category: 'shoes' },
      { id: 20, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/20.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIwLmpwZyIsImlhdCI6MTczOTQ3NTMwMSwiZXhwIjoxNzcxMDExMzAxfQ.GVEdRkR4COfEoOQfc_nEoWHyu4BaUR1evSkITlpHGAs', category: 'shoes' },
      { id: 21, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/21.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIxLmpwZyIsImlhdCI6MTczOTQ3NTMzMiwiZXhwIjoxNzcxMDExMzMyfQ.dRj1mOzTaaJCCphao32HUAG_HHqh9dVj1q-vvqkqkDI', category: 'shoes' },
      { id: 22, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/22.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIyLmpwZyIsImlhdCI6MTczOTQ3NTM0OSwiZXhwIjoxNzcxMDExMzQ5fQ.siAjxsEDIXMb5ON_KWXpGyzIk7TuubeeTc_mOy1sAAc', category: 'shoes' },
      { id: 23, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/23.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIzLmpwZyIsImlhdCI6MTczOTQ3NTM1NiwiZXhwIjoxNzcxMDExMzU2fQ.L_FoQR14aUDiUquOp4XpuR4FfNUfoc2qEnJU7_WzT-A', category: 'shoes' },
      { id: 24, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/24.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI0LmpwZyIsImlhdCI6MTczOTQ3NTM2NSwiZXhwIjoxNzcxMDExMzY1fQ.dgIBdIqyr10XoHxPDFL9Scm9TkUeVaL_My4ktD6FFuA', category: 'shoes' },
      { id: 25, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/25.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI1LmpwZyIsImlhdCI6MTczOTQ3NTM4MiwiZXhwIjoxNzcxMDExMzgyfQ.Xuy3ZZrGFyLEMME614mucLejfnqPR_xvfgUz0e-ZD-0', category: 'shoes' },
      { id: 26, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/26.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI2LmpwZyIsImlhdCI6MTczOTQ3NTQwMiwiZXhwIjoxNzcxMDExNDAyfQ.raFC5MZS8AYkGsbNInPIUzXWRRMPNJRoJ2eP6hDw8SI', category: 'shoes' },
      { id: 27, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/27.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI3LmpwZyIsImlhdCI6MTczOTQ3NTQxMywiZXhwIjoxNzcxMDExNDEzfQ.wdCK0rlQxo6vpPKK_WzrcnjlH4yKUA2-iVnLAelEbGw', category: 'shoes' },
      { id: 28, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/28.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI4LmpwZyIsImlhdCI6MTczOTQ3NTQyMywiZXhwIjoxNzcxMDExNDIzfQ.-ipPSsuXw3iZTMB48xVR2-MPF3sWP8aN-kUB-6WPjeM', category: 'shoes' },
      { id: 29, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/29.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI5LmpwZyIsImlhdCI6MTczOTQ3NTQzNiwiZXhwIjoxNzcxMDExNDM2fQ.a19Q4xemWcpbDdPGxeED5ur1MSdbI4t4oxXjs-k8Mmg', category: 'shoes' },
      { id: 30, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/30.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMwLmpwZyIsImlhdCI6MTczOTQ3NTQ0NCwiZXhwIjoxNzcxMDExNDQ0fQ.As7BMWsz4NvU98zuUdA5XV7Y1sybGGK6i8nWbD3F5g4', category: 'shoes' },
      { id: 31, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/31.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMxLmpwZyIsImlhdCI6MTczOTQ3NTQ1MiwiZXhwIjoxNzcxMDExNDUyfQ.HvaJ3qObaYNvNlRfzN2ECaLv-MM33WYT_sB90MdH0zY', category: 'shoes' },


      { id: 1000, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDAuanBnIiwiaWF0IjoxNzM5NDc0NzMzLCJleHAiOjE3NzEwMTA3MzN9.aRUUnTblCQEN2aWo5gj_5j2orJj-A88mISvH2wVB-jE', category: 'shoes' },
      { id: 1001, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDEuanBnIiwiaWF0IjoxNzM5NDc0NzY0LCJleHAiOjE3NzEwMTA3NjR9.mlfO6xdaCQn0_7q-m1ZK6FKO5U3aonszj-ZtYobhV0I', category: 'shoes' },
      { id: 1002, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1002.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDIuanBnIiwiaWF0IjoxNzM5NDc0Nzc4LCJleHAiOjE3NzEwMTA3Nzh9.C1aXVxGK4vedwlQ-uT4hHvapftZohp1y-KeXLxWblb0', category: 'shoes' },
      { id: 1003, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1003.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDMuanBnIiwiaWF0IjoxNzM5NDc0Nzg5LCJleHAiOjE3NzEwMTA3ODl9.VR4WilN-FdzuRJMWhSTqQ0An0kfdekyQyWNe8UOAOD4', category: 'shoes' },
      { id: 1004, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1004.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDQuanBnIiwiaWF0IjoxNzM5NDc0Nzk5LCJleHAiOjE3NzEwMTA3OTl9.H3WWZUWJcqSlZKQDUNcnCHkQK73CI-an-fArGhHJlT8', category: 'shoes' },
      { id: 1005, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1005.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDUuanBnIiwiaWF0IjoxNzM5NDc0ODA5LCJleHAiOjE3NzEwMTA4MDl9.kRR9QJDIdR6RYh3kM5UqGLQHDBDonyxgNRuIsbHZ67M', category: 'shoes' },
      { id: 1006, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1006.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDYuanBnIiwiaWF0IjoxNzM5NDc0ODE3LCJleHAiOjE3NzEwMTA4MTd9.DwwITmL_i8MOnvlQWdhmj7f5Nafe3J13ElX2jyPzKH4', category: 'shoes' },
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
    <div className="page-container gallery-container">
      <motion.h1 
        className="gallery-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glowing-line-2"></div>
        Our Gallery
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
        className="gallery-grid" 
        ref={containerRef}
        variants={FadeContainer}
        initial="hidden"
        animate="visible"
      >
        {displayedImages.map((image) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            variants={popUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={`Gallery item ${image.id}`}
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
                alt={`Gallery item ${selectedImage.id}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;