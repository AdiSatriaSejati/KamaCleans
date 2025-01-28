import React from 'react';
import './Loading.css';
import logo from '../../../public/images/logo-dark.webp';

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