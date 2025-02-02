import React from 'react';
import TestimonialsCarousel from '../components/testimonials/TestimonialsCarousel';

const Testimonials = () => {
  return (
    <div id='testimonials' className="page-container">
      <h1 className='section-title'>What Clients Say</h1>
      <TestimonialsCarousel />
    </div>
  );
};

export default Testimonials;