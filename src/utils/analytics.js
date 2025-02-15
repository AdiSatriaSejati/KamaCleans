// Utility file untuk analytics
export const initializeAnalytics = () => {
  // Inisialisasi dataLayer jika belum ada
  window.dataLayer = window.dataLayer || [];

  // Fungsi helper untuk push events
  const gtag = function() {
    window.dataLayer.push(arguments);
  }

  // Basic pageview tracking
  const trackPageview = (path) => {
    if (!window.dataLayer) return;
    
    gtag('event', 'page_view', {
      page_path: path,
      send_to: 'G-VZ7PJGJZ08'
    });
  }

  // Event tracking dengan throttling
  const trackEvent = (category, action, label) => {
    if (!window.dataLayer) return;
    
    requestIdleCallback(() => {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    });
  }

  return {
    trackPageview,
    trackEvent
  };
}; 