import React from 'react';
import './LoadingPlaceholder.css';

const LoadingPlaceholder = () => {
  return (
    <div className="loading-placeholder">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p>Memuat...</p>
    </div>
  );
};

export default LoadingPlaceholder; 