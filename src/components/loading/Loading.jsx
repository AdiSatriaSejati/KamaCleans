// src/components/loading/Loading.jsx
import React from 'react';
import './Loading.css'; // Pastikan untuk membuat file CSS jika diperlukan
import logo from '../../../public/images/logo.svg'; // Import logo.svg

const Loading = () => {
  return (
    <div className="loader">
      <img src={logo} alt="Loading..." width="208" height="208" /> {/* Ganti SVG dengan logo */}
      <p>Loading... Please wait</p>
      <div className="progress"></div>
    </div>
  );
};

export default Loading;