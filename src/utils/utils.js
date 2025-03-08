// Import fungsi dari eventUtils.js untuk menghindari duplikasi
import { supportsPassiveEvents as supportsPassive, addPassiveEventListener } from './eventUtils.js';

export const navigationRoutes = [
  "Beranda",
  "Tentang Kama",
  "Layanan",
  "Galeri",
  "Kontak"
];

export const sectionIds = {
  "Beranda": "beranda-section",
  "Tentang Kama": "tentang-section", 
  "Layanan": "layanan-section",
  "Galeri": "galeri-section",
  "Kontak": "kontak-section"
};

// Re-export fungsi untuk kompatibilitas kode yang sudah ada
export { supportsPassive, addPassiveEventListener };

export const smoothScroll = (targetId, offset = 0) => {
  const target = document.getElementById(targetId);
  if (target) {
    const targetPosition = target.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};