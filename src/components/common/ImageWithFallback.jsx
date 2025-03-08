import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen ImageWithFallback untuk mencegah layout shift dan menangani loading
 * 
 * @param {Object} props
 * @param {string} props.src - URL gambar utama
 * @param {string} props.fallbackSrc - URL gambar fallback jika gambar utama gagal dimuat
 * @param {string} props.alt - Alt text untuk accessibility
 * @param {number} props.width - Lebar gambar untuk mencegah layout shift
 * @param {number} props.height - Tinggi gambar untuk mencegah layout shift
 * @param {string} props.className - Class CSS tambahan
 * @param {boolean} props.lazy - Apakah menggunakan lazy loading
 * @param {string} props.objectFit - Nilai CSS object-fit
 */
const ImageWithFallback = ({
  src,
  fallbackSrc = '',
  alt,
  width,
  height,
  className = '',
  lazy = true,
  objectFit = 'cover',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const containerClass = `image-container ${className} ${isLoaded ? 'image-loaded' : 'image-loading'}`;
  
  // Pastikan ratio tetap konsisten untuk mencegah layout shift
  const aspectRatio = (height / width) * 100;
  
  return (
    <div 
      className={containerClass} 
      style={{ 
        paddingTop: `${aspectRatio}%`,
        background: '#f0f0f0' // Placeholder color
      }}
    >
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'async' : 'sync'}
        style={{ objectFit }}
        {...rest}
      />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  objectFit: PropTypes.string
};

export default ImageWithFallback; 