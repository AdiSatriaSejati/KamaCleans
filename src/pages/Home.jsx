import React, { lazy } from 'react';
const ImageSlider = lazy(() => import('../components/slider/ImageSlider'));
const SocialBar = lazy(() => import('../components/socialbar/SocialBar'));


const Home = () => {
  return (
    <div className="page-container">
      <SocialBar />
      <ImageSlider />
    </div>
  );
};

export default Home;