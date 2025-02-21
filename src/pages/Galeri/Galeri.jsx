import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeContainer, popUp } from '../../utils/FramerMotionVariants';
import { addPassiveEventListener } from '../../utils/utils';
import './Galeri.css';

const Galeri = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const [visibleImages, setVisibleImages] = useState(6); // Jumlah gambar yang ditampilkan awal
  const containerRef = useRef(null);

  const images = {
    shoes: [
      { id: 1, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEud2VicCIsImlhdCI6MTczOTUzODI5OSwiZXhwIjoxNzcxMDc0Mjk5fQ.Htl51VlKHJbJZ1Xd_0X9IuOB5wWQWstW-daNJQKiSQ4', category: 'shoes' },
      { id: 2, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/2.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIud2VicCIsImlhdCI6MTczOTUzODMxMywiZXhwIjoxNzcxMDc0MzEzfQ.p1dE9LXkt_ZV_H-npdDpkHBqHEllqIWoBAmP-MtsRKE', category: 'shoes' },
      { id: 3, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/3.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMud2VicCIsImlhdCI6MTczOTUzODMyNCwiZXhwIjoxNzcxMDc0MzI0fQ._pQ8y5NfchbC9X5B0EAKLK_dbvdfW4wNsbbsI-GIr74', category: 'shoes' },
      { id: 4, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/4.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzQud2VicCIsImlhdCI6MTczOTUzODMzMiwiZXhwIjoxNzcxMDc0MzMyfQ.lzfXJli7N8UhL8qIHhDWW1WnTnOYQzM_sctSatfFv1M', category: 'shoes' },
      { id: 5, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/5.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzUud2VicCIsImlhdCI6MTczOTUzODM0MCwiZXhwIjoxNzcxMDc0MzQwfQ.PH3HISGqxBUPSn8sGlBBWCmG0FoA2w5YpjULCLy7nhU', category: 'shoes' },
      { id: 6, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/6.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzYud2VicCIsImlhdCI6MTczOTUzODM1OSwiZXhwIjoxNzcxMDc0MzU5fQ.Of19Ogx3QCZG71AHtwr6F7uRJmyROCjnz-B0Grf7XeU', category: 'shoes' },
      { id: 7, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/7.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzcud2VicCIsImlhdCI6MTczOTUzODM2NSwiZXhwIjoxNzcxMDc0MzY1fQ.rZ6_YJzIoPCjQdpRHHrdSWYxOqknJRDLt0QSwnyW7w0', category: 'shoes' },
      { id: 8, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/8.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzgud2VicCIsImlhdCI6MTczOTUzODM3MiwiZXhwIjoxNzcxMDc0MzcyfQ.bvIoSaAu7lbLOC0xYxeJtNuKhomC2wI0DwDWlKHQax0', category: 'shoes' },
      { id: 9, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/9.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzkud2VicCIsImlhdCI6MTczOTU0MDk3MSwiZXhwIjoxNzcxMDc2OTcxfQ.krbLWFIM8ovOoRpuO00ll8474WvMWyeHGSZLUxH5e2s', category: 'shoes' },
      { id: 10, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/10.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwLndlYnAiLCJpYXQiOjE3Mzk1MzgzOTUsImV4cCI6MTc3MTA3NDM5NX0.VZ-6ldlrz_Q3dSWICxd0MSzNUJEu0BMqa_TyLTqY5dc', category: 'shoes' },
      { id: 11, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/11.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzExLndlYnAiLCJpYXQiOjE3Mzk1NDI3NDksImV4cCI6MTc3MTA3ODc0OX0.w87QhWFo_E1byJPvmrGuxCMHQakeO5EKVYRwttBbYtM', category: 'shoes' },
      { id: 12, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/12.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEyLndlYnAiLCJpYXQiOjE3Mzk1NDI3NTcsImV4cCI6MTc3MTA3ODc1N30.OjLry81SQUpLdkZOL9ZlJ3rfnFEsizJHMIGnXhfRpDE', category: 'shoes' },
      { id: 13, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/13.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEzLndlYnAiLCJpYXQiOjE3Mzk1NDI4MjAsImV4cCI6MTc3MTA3ODgyMH0.xHSf3pzX1llGe_SZ-S6P0Zo9Bgmj3duJAeKtgHKGcqE', category: 'shoes' },
      { id: 14, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/14.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE0LndlYnAiLCJpYXQiOjE3Mzk1NDI4MzQsImV4cCI6MTc3MTA3ODgzNH0.Y6hGfz3Fwpi-Ew0JfOYPZwO0l-ZwFA3PMckMl7rdbXM', category: 'shoes' },
      { id: 15, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/15.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE1LndlYnAiLCJpYXQiOjE3Mzk1NDI4NDAsImV4cCI6MTc3MTA3ODg0MH0.EXHOKsIpY7Vl-s5Z0UlcBpvMK_de4yZeEpve__-tq38', category: 'shoes' },
      { id: 16, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/16.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE2LndlYnAiLCJpYXQiOjE3Mzk1NDI4NDksImV4cCI6MTc3MTA3ODg0OX0.1mqXUOnDqxUQ9yjZUyEFXOVx_KWNSaXPx3-cy_MjE-k', category: 'shoes' },
      { id: 17, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/16.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE2LndlYnAiLCJpYXQiOjE3Mzk1NDI4NDksImV4cCI6MTc3MTA3ODg0OX0.1mqXUOnDqxUQ9yjZUyEFXOVx_KWNSaXPx3-cy_MjE-k', category: 'shoes' },
      { id: 18, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/18.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE4LndlYnAiLCJpYXQiOjE3Mzk1NDI4NjYsImV4cCI6MTc3MTA3ODg2Nn0.UO4MSkeunyyzhsGw33sYNomq2aDRZkRdemmJV2YwDws', category: 'shoes' },
      { id: 19, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/18.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzE4LndlYnAiLCJpYXQiOjE3Mzk1NDI4NjYsImV4cCI6MTc3MTA3ODg2Nn0.UO4MSkeunyyzhsGw33sYNomq2aDRZkRdemmJV2YwDws', category: 'shoes' },
      { id: 20, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/20.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIwLndlYnAiLCJpYXQiOjE3Mzk1NDI4ODMsImV4cCI6MTc3MTA3ODg4M30.-lKUTBrNJy1exxTLbPsaJM_I4U46F7yO_qgEVTjAU4s', category: 'shoes' },
      { id: 21, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/21.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIxLndlYnAiLCJpYXQiOjE3Mzk1NDI5NzUsImV4cCI6MTc3MTA3ODk3NX0.FX2ohEwgO51rcqcwhuym6VXwxS7tKAXjv6zfWDMDsGQ', category: 'shoes' },
      { id: 22, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/22.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIyLndlYnAiLCJpYXQiOjE3Mzk1NDI5ODIsImV4cCI6MTc3MTA3ODk4Mn0.WujxZZe6QvBKueN2NMPSQX7-BE-oPHUEgmEeI65kBKY', category: 'shoes' },
      { id: 23, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/23.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzIzLndlYnAiLCJpYXQiOjE3Mzk1NDMxNDAsImV4cCI6MTc3MTA3OTE0MH0.Xl7wxB4nqHHhqxUnX7AY7gp1KaEpe4qzVIsGVt1buKg', category: 'shoes' },
      { id: 24, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/24.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI0LndlYnAiLCJpYXQiOjE3Mzk1NDI5OTQsImV4cCI6MTc3MTA3ODk5NH0.QgawwFmR23lJElu4dwdMzgKxbuqopPwr-XUszTIm58Y', category: 'shoes' },
      { id: 25, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/25.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI1LndlYnAiLCJpYXQiOjE3Mzk1NDMxNDgsImV4cCI6MTc3MTA3OTE0OH0.ISB853StP1pMTPiBiehe72FJM8WfPmI8jaJTmLrvE7Q', category: 'shoes' },
      { id: 26, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/26.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI2LndlYnAiLCJpYXQiOjE3Mzk1NDMwMDgsImV4cCI6MTc3MTA3OTAwOH0.k69mamcnRHJmfJdPR2u3j5KIV1z5ZboANKglTt3x_pg', category: 'shoes' },
      { id: 27, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/27.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI3LndlYnAiLCJpYXQiOjE3Mzk1NDMwMTUsImV4cCI6MTc3MTA3OTAxNX0.pDiU2q1VulFQxSf5-BVfjsN0rx4oUR3dh3deqxsmMk8', category: 'shoes' },
      { id: 28, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/28.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI4LndlYnAiLCJpYXQiOjE3Mzk1NDMwMjMsImV4cCI6MTc3MTA3OTAyM30.met3Ru40SWmUCWrCM5lG52Z0AsXTXmqyW-5oH9bRRjI', category: 'shoes' },
      { id: 29, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/29.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzI5LndlYnAiLCJpYXQiOjE3Mzk1NDMwMzIsImV4cCI6MTc3MTA3OTAzMn0.erFYFdwVdsF8ja_yDCq3hDNukQUqYvY-NSsB_HFEVRs', category: 'shoes' },
      { id: 30, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/30.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMwLndlYnAiLCJpYXQiOjE3Mzk1NDMxNjgsImV4cCI6MTc3MTA3OTE2OH0.LK4a6156-fyEIUpYnCUEXSMRbMO-Dhi5vJMYZFtsP5c', category: 'shoes' },
      { id: 31, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/31.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzMxLndlYnAiLCJpYXQiOjE3Mzk1NDMxNzYsImV4cCI6MTc3MTA3OTE3Nn0.vBB-uTuUoFPUhcuIK7vlBraUfmIhdlnVmuBnLgq-YC0', category: 'shoes' },


      { id: 1000, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1000.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDAud2VicCIsImlhdCI6MTczOTU0MjQ5NywiZXhwIjoxNzcxMDc4NDk3fQ.IHpv1id_lddcM69ud-O1iojjWtSHHf380GJtyBmcrko', category: 'shoes' },
      { id: 1001, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1001.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDEud2VicCIsImlhdCI6MTczOTU0MjUxMCwiZXhwIjoxNzcxMDc4NTEwfQ.Eg3XjgLrPzFgc8X9UtjZ1q55KcmsPlHXi6z7IIeLOmg', category: 'shoes' },
      { id: 1002, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1002.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDIud2VicCIsImlhdCI6MTczOTU0MjUxNiwiZXhwIjoxNzcxMDc4NTE2fQ.xMeRhaHdI9szkbLz2wF85pB5tAEu_glhU6H_msZsqnM', category: 'shoes' },
      { id: 1003, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1003.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDMud2VicCIsImlhdCI6MTczOTU0MjYwMywiZXhwIjoxNzcxMDc4NjAzfQ._RJAlBWAQ-WhhDY3nkiuIM-b4HjIi3Bh2cs9rvyru-s', category: 'shoes' },
      { id: 1004, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1004.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDQud2VicCIsImlhdCI6MTczOTU0MjYxMiwiZXhwIjoxNzcxMDc4NjEyfQ.8PobJuj-O99WGnfvQ3m72nSqvKvEaBhAXFBrNak3k7g', category: 'shoes' },
      { id: 1005, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1005.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDUud2VicCIsImlhdCI6MTczOTU0MjYyMSwiZXhwIjoxNzcxMDc4NjIxfQ.VFjaK27P8TvR5GA-lpUjA4fVFf9XEa4KaPHM1SQY0Nc', category: 'shoes' },
      { id: 1006, src: 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/images/gallery/shoes/1006.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ltYWdlcy9nYWxsZXJ5L3Nob2VzLzEwMDYud2VicCIsImlhdCI6MTczOTU0MjYyNywiZXhwIjoxNzcxMDc4NjI3fQ.XJnSVF1G527C83RrTVd-tQR57Ro64dO8EPhnS0zg27A', category: 'shoes' },
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

  useEffect(() => {
    const handleScroll = () => {
      // ... existing scroll logic ...
    };

    const cleanup = addPassiveEventListener(window, 'scroll', handleScroll);
    
    return cleanup;
  }, []);

  // Handle touch events dengan passive
  useEffect(() => {
    const handleTouch = () => {
      // ... touch handling logic
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  // Fungsi untuk mengoptimalkan loading gambar
  const optimizeImage = (src, width = 720) => {
    // Menambahkan parameter resize ke URL Supabase
    const baseUrl = src.split('?')[0];
    const token = src.split('?')[1];
    return `${baseUrl}?width=${width}&${token}`;
  };

  // Preload gambar
  useEffect(() => {
    const preloadImages = (imagesToPreload) => {
      imagesToPreload.forEach(image => {
        const img = new Image();
        img.src = optimizeImage(image.src);
      });
    };

    // Preload beberapa gambar pertama
    preloadImages(images.shoes.slice(0, 6));
  }, []);

  return (
    <div className="galeri-container">
      <motion.h1 
        className="galeri-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glowing-line-2"></div>
        Galeri Kami
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
              src={optimizeImage(image.src)}
              alt={`Galeri item ${image.id}`}
              loading="lazy"
              width="720"
              height="1280"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = image.src; // Fallback ke original jika optimisasi gagal
              }}
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
                alt={`Galeri item ${selectedImage.id}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Galeri;