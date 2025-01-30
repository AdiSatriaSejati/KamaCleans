import React from 'react';
import ImageSlider from '../components/slider/ImageSlider';
import SocialBar from '../components/socialbar/SocialBar';
import ParticleText from '../components/particletext/ParticleText';

const Home = () => {
  return (
    <div className="page-container">
      <ParticleText />
      <SocialBar />
      <ImageSlider />
    </div>
  );
};

export default Home;