import React, { useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCookie, IconSettings, IconX } from '@tabler/icons-react';
import { COOKIE_NAMES, setAllCookiePreferences, getAllCookiePreferences } from '../../utils/cookieUtils';
import './CookieConsent.css';

const CookieConsentBanner = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(() => getAllCookiePreferences());

  const handleAcceptAll = () => {
    const allEnabled = {
      ANALYTICS: true,
      PREFERENCES: true,
      MARKETING: true,
      FUNCTIONAL: true
    };
    setAllCookiePreferences(allEnabled);
    setPreferences(allEnabled);
  };

  const handleSavePreferences = () => {
    setAllCookiePreferences(preferences);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const allDisabled = {
      ANALYTICS: false,
      PREFERENCES: false,
      MARKETING: false,
      FUNCTIONAL: true // Functional cookies selalu diaktifkan
    };
    setAllCookiePreferences(allDisabled);
    setPreferences(allDisabled);
  };

  return (
    <AnimatePresence>
      <CookieConsent
        location="bottom"
        buttonText="Terima Semua"
        declineButtonText="Tolak"
        cookieName={COOKIE_NAMES.CONSENT_SHOWN}
        style={{ background: 'var(--background)', color: 'var(--text-primary)' }}
        buttonStyle={{
          background: '#4A90E2',
          color: 'white',
          fontSize: '14px',
          borderRadius: '6px',
          padding: '8px 16px'
        }}
        declineButtonStyle={{
          background: 'transparent',
          border: '1px solid var(--text-primary)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          borderRadius: '6px',
          padding: '8px 16px'
        }}
        expires={365}
        onAccept={handleAcceptAll}
        onDecline={handleRejectAll}
      >
        <motion.div 
          className="cookie-banner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="cookie-header">
            <IconCookie size={24} />
            <h3>Pengaturan Cookie</h3>
          </div>
          <p>
            Kami menggunakan cookie untuk meningkatkan pengalaman Anda di website kami. 
            Beberapa cookie diperlukan untuk fungsionalitas website, sementara yang lain 
            membantu kami memahami bagaimana Anda berinteraksi dengan website.
          </p>
          
          <button 
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
          >
            <IconSettings size={20} />
            Atur Preferensi
          </button>

          {showSettings && (
            <motion.div 
              className="cookie-settings"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="cookie-option">
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.FUNCTIONAL}
                    disabled
                  />
                  Fungsional (Diperlukan)
                </label>
                <p>Cookie yang diperlukan untuk fungsi dasar website.</p>
              </div>

              <div className="cookie-option">
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.ANALYTICS}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      ANALYTICS: e.target.checked
                    })}
                  />
                  Analitik
                </label>
                <p>Membantu kami memahami bagaimana pengunjung menggunakan website.</p>
              </div>

              <div className="cookie-option">
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.PREFERENCES}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      PREFERENCES: e.target.checked
                    })}
                  />
                  Preferensi
                </label>
                <p>Menyimpan preferensi Anda untuk meningkatkan pengalaman.</p>
              </div>

              <div className="cookie-option">
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.MARKETING}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      MARKETING: e.target.checked
                    })}
                  />
                  Marketing
                </label>
                <p>Digunakan untuk iklan yang lebih relevan.</p>
              </div>

              <button 
                className="save-preferences"
                onClick={handleSavePreferences}
              >
                Simpan Preferensi
              </button>
            </motion.div>
          )}
        </motion.div>
      </CookieConsent>
    </AnimatePresence>
  );
};

export default CookieConsentBanner; 