import React, { useEffect, useState } from 'react';

const GoogleMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps script hanya ketika komponen dimount
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsMapLoaded(true);
      document.body.appendChild(script);
    };

    // Intersection Observer untuk lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadGoogleMaps();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.querySelector('.map-container'));

    return () => observer.disconnect();
  }, []);

  if (!isMapLoaded) return <div className="map-loading">Loading map...</div>;

  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.92748864637807!2d106.56910651294285!3d-6.152201943834907!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff67d732ae63%3A0x3c77b1f64e21c464!2sKAMACLEANS%20(LAUNDRY%20SEPATU%2C%20HELM%2C%20DAN%20TOPI)!5e0!3m2!1sid!2sid!4v1739201992192!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap; 