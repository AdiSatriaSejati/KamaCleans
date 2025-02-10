import React, { lazy } from 'react';
import './Home.css';
const ImageSlider = lazy(() => import('../components/slider/ImageSlider'));
const SocialBar = lazy(() => import('../components/socialbar/SocialBar'));


const Home = () => {
  return (
    <div className="page-container home-container">
      <SocialBar />
      <ImageSlider />
    </div>
  );
};

export default Home;