import Cookies from 'js-cookie';

// Cookie names
export const COOKIE_NAMES = {
  ANALYTICS: 'kamacleans_analytics',
  PREFERENCES: 'kamacleans_preferences',
  MARKETING: 'kamacleans_marketing',
  FUNCTIONAL: 'kamacleans_functional',
  CONSENT_SHOWN: 'kamacleans_consent_shown'
};

// Deteksi environment
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
const isHttps = window.location.protocol === 'https:';

// Cookie options berdasarkan environment
const getCookieOptions = () => ({
  expires: 365,
  secure: isHttps, // secure cookie hanya untuk HTTPS
  sameSite: isHttps ? 'strict' : 'lax',
  path: '/',
  // domain tidak perlu diset untuk localhost
  domain: isLocalhost ? undefined : window.location.hostname
});

// Set cookie dengan opsi yang sesuai environment
export const setCookie = (name, value) => {
  Cookies.set(name, value, getCookieOptions());
};

// Get cookie value
export const getCookie = (name) => {
  return Cookies.get(name);
};

// Remove cookie
export const removeCookie = (name) => {
  Cookies.remove(name, getCookieOptions());
};

// Check if consent is given
export const hasConsent = (type) => {
  return getCookie(COOKIE_NAMES[type]) === 'true';
};

// Set all cookie preferences
export const setAllCookiePreferences = (preferences) => {
  Object.entries(preferences).forEach(([key, value]) => {
    setCookie(COOKIE_NAMES[key], value);
  });
};

// Get all cookie preferences
export const getAllCookiePreferences = () => {
  return {
    ANALYTICS: getCookie(COOKIE_NAMES.ANALYTICS) === 'true',
    PREFERENCES: getCookie(COOKIE_NAMES.PREFERENCES) === 'true',
    MARKETING: getCookie(COOKIE_NAMES.MARKETING) === 'true',
    FUNCTIONAL: getCookie(COOKIE_NAMES.FUNCTIONAL) === 'true'
  };
};

// Tambahan untuk debugging di localhost
if (isLocalhost) {
  window.debugCookies = {
    getAll: Cookies.get,
    remove: Cookies.remove,
    set: Cookies.set
  };
  console.log('Cookie debug mode active for localhost');
} 