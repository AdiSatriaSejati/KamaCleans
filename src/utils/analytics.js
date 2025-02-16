import { hasConsent, COOKIE_NAMES } from './cookieUtils';

const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';

// Fungsi helper untuk logging di localhost
const localLog = (eventName, params) => {
  if (isLocalhost) {
    console.log(`[Analytics Event]: ${eventName}`, params);
  }
};

// Fungsi untuk tracking page views
export const trackPageView = () => {
  if (hasConsent('ANALYTICS')) {
    if (isLocalhost) {
      localLog('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    } else {
      window.gtag?.('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }
};

// Fungsi untuk tracking interaksi layanan
export const trackServiceClick = (serviceName) => {
  if (hasConsent('ANALYTICS')) {
    if (isLocalhost) {
      localLog('service_click', {
        service_name: serviceName,
        timestamp: new Date().toISOString()
      });
    } else {
      window.gtag?.('event', 'service_click', {
        service_name: serviceName,
        timestamp: new Date().toISOString()
      });
    }
  }
};

// Fungsi untuk tracking form submissions
export const trackFormSubmission = (formType) => {
  if (hasConsent('ANALYTICS')) {
    window.gtag('event', 'form_submit', {
      form_type: formType
    });
  }
};

// Fungsi untuk tracking social media clicks
export const trackSocialClick = (platform) => {
  if (hasConsent('ANALYTICS')) {
    window.gtag('event', 'social_click', {
      platform: platform
    });
  }
}; 