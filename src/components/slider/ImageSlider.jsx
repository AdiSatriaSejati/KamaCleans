import { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [working, setWorking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const slides = [
    {
      image: '/images/1.png',
      heading: 'FRESH FOR MORE MOVE'
    },
    {
      image: '/images/2.png',
      heading: 'FRESH FOR MORE CHILL'
    },
    {
      image: '/images/3.png',
      heading: 'FRESH FOR MORE MILES'
    }
  ];

  const length = slides.length;
  const slideDuration = 1400;

  useEffect(() => {
    // Observer untuk mengecek visibility home section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger ketika 50% section terlihat
    );

    const homeSection = document.getElementById('home-section');
    if (homeSection) {
      observer.observe(homeSection);
    }

    return () => {
      if (homeSection) {
        observer.unobserve(homeSection);
      }
    };
  }, []);

  useEffect(() => {
    const autoInterval = setInterval(updateNext, 5000);
    return () => clearInterval(autoInterval);
  }, [current]);

  useEffect(() => {
    // Tambahkan fallback untuk Firefox dan Edge
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || 
        document.documentMode || 
        /Edge/.test(navigator.userAgent)) {
      document.body.classList.add('outdated');
    }
  }, []);

  const updateNext = () => {
    if (working) return;
    const nextIndex = (current + 1) % length;
    processSlide(nextIndex);
  };

  const updatePrevious = () => {
    if (working) return;
    const nextIndex = current - 1 < 0 ? length - 1 : current - 1;
    processSlide(nextIndex);
  };

  const processSlide = (nextIndex) => {
    setWorking(true);
    setNext(nextIndex);

    setTimeout(() => {
      setCurrent(nextIndex);
      setWorking(false);
    }, slideDuration);
  };

  return (
    <div className={`page-view ${!isVisible ? 'hidden' : ''}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`project ${index === current && working ? 'hide' : ''}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            zIndex: index === current ? 30 : index === next ? 20 : 10
          }}
        >
          <div className="slide-content">
            <h1>{slide.heading}</h1>
          </div>
        </div>
      ))}
      
      <div className="bullets">
        <div className="arrow previous" onClick={updatePrevious}>
          <svg viewBox="0 0 100 100">
            <polygon points="5.9,49.5 59.4,2.8 59.4,96.2"></polygon>
          </svg>
        </div>
        <div className="arrow next" onClick={updateNext}>
          <svg viewBox="0 0 100 100">
            <polygon points="5.9,49.5 59.4,2.8 59.4,96.2"></polygon>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;