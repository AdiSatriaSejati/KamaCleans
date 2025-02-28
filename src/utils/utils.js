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

// Utility untuk mengecek dukungan passive event listeners
export const supportsPassive = () => {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
};

// Utility untuk menambahkan event listener dengan passive support
export const addPassiveEventListener = (element, eventName, callback) => {
  const options = supportsPassive() ? { passive: true } : false;
  element.addEventListener(eventName, callback, options);
  return () => element.removeEventListener(eventName, callback, options);
};

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