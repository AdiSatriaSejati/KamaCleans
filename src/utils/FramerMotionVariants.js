export const touchConfig = {
  touchStart: { passive: true },
  touchMove: { passive: true },
  touchEnd: { passive: true }
};

export const FadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.3,
      ...touchConfig 
    }
  }
};

export const hamFastFadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.15,
      ...touchConfig 
    }
  },
};

export const mobileNavItemSideways = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const popUp = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.3,
      ...touchConfig
    }
  }
};

export const loadAnimations = async () => {
  const { motion } = await import('framer-motion');
  return {
    FadeContainer: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
    // ... animasi lainnya
  };
};