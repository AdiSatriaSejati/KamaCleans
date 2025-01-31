import React from 'react';
import ImageSlider from '../components/slider/ImageSlider';
import SocialBar from '../components/socialbar/SocialBar';

const Home = () => {
  return (
    <div className="page-container">
      <SocialBar />
      <ImageSlider />
    </div>
  );
};

export default Home;