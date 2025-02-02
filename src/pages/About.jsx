import React from 'react';
import TestimonialsCarousel from '../components/testimonials/TestimonialsCarousel';

const About = () => {
  return (
    <div className="page-container">
      <h1>About US </h1>
      <h2 className='section-title'>What Clients Say</h2>
      <TestimonialsCarousel />
    </div>
  );
};

export default About;