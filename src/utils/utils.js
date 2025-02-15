export const navigationRoutes = [
  "Home",
  "About",
  "Services",
  "Gallery",
  "Contact"
];

export const sectionIds = {
  "Home": "home-section",
  "About": "about-section", 
  "Services": "services-section",
  "Gallery": "gallery-section",
  "Contact": "contact-section"
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