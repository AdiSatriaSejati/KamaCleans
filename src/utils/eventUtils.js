// Deteksi dukungan passive event listeners
export const supportsPassiveEvents = () => {
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

// Helper untuk menambahkan event listener dengan passive support
export const addPassiveEventListener = (element, eventName, callback) => {
  const options = supportsPassiveEvents() ? { passive: true } : false;
  element.addEventListener(eventName, callback, options);
  return () => element.removeEventListener(eventName, callback, options);
}; 