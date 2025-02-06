import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sliderRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const initSlicebox = async () => {
      try {
        const $ = window.jQuery;
        // Import Slicebox
        await import('../utils/jquery.slicebox');

        const $navArrows = $('#nav-arrows').hide();
        const $shadow = $(shadowRef.current).hide();
        
        const slicebox = $(sliderRef.current).slicebox({
          onReady: function() {
            $navArrows.show();
            $shadow.show();
          },
          orientation: 'r',
          cuboidsRandom: true,
          disperseFactor: 30,
          autoplay: true,
          interval: 3000
        });
      } catch (error) {
        console.error('Error initializing Slicebox:', error);
      }
    };

    // Tunggu sampai jQuery tersedia
    const checkJQuery = setInterval(() => {
      if (window.jQuery) {
        clearInterval(checkJQuery);
        initSlicebox();
      }
    }, 100);

    return () => {
      clearInterval(checkJQuery);
    };
  }, []);

  return (
    <div className="page-container">
      <h1>About Us</h1>
      <div className="about-wrapper">
        <ul ref={sliderRef} className="sb-slider">
          <li>
            <img src="/images/about/1.jpg" alt="image1"/>
          </li>
          <li>
            <img src="/images/about/2.jpg" alt="image2"/>
          </li>
          <li>
            <img src="/images/about/3.jpg" alt="image3"/>
          </li>
          <li>
            <img src="/images/about/4.jpg" alt="image4"/>
          </li>
          <li>
            <img src="/images/about/5.jpg" alt="image5"/>
          </li>
        </ul>
        <div ref={shadowRef} className="shadow"></div>
      </div>
    </div>
  );
};

export default About;