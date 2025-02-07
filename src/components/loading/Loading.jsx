import React, { Suspense, lazy } from 'react';
import './Loading.css';
// Loading placeholder
const LogoPlaceholder = () => (
  <div className="logo-placeholder" style={{
    width: '208px',
    height: '208px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px'
  }}></div>
);

const Loading = () => {
  return (
    <div className="loader">
      <Suspense fallback={<LogoPlaceholder />}>
        <Logo />
      </Suspense>
      <p>Loading... Please wait</p>
      <div className="progress"></div>
    </div>
  );
};

// Buat komponen Logo terpisah
const Logo = () => (
  <img 
    src="/images/logo-dark.webp" 
    alt="KamaCleans" 
    width="208" 
    height="208"
    loading="lazy"
  />
);

export default Loading;