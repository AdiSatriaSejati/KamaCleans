import React, { useEffect, useRef } from 'react';
import './AnimatedText.css';

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Preload font
      const font = new FontFace('Open Sans', 'url(/fonts/OpenSans-Bold.woff2)');
      font.load().then(() => {
        document.fonts.add(font);
      });
    }
  }, []);

  return (
    <div className="animated-text-container">
      <svg 
        viewBox="0 0 600 300"
        aria-label="Kama Cleans"
        role="img"
      >
        <defs>
          <clipPath id="cp-text">
            <text
              textAnchor="middle"
              x="50%"
              y="50%"
              dy=".35em"
              className="text--line"
              ref={textRef}
              style={{
                fontDisplay: 'swap'
              }}
            >
              kama cleans
            </text>
          </clipPath>
        </defs>

        <text
          textAnchor="middle"
          x="50%"
          y="50%"
          dy=".35em"
          className="text--line"
        >
          kama cleans
        </text>

        <g clipPath="url(#cp-text)">
          <circle
            r="70%"
            cx="300"
            cy="150"
            className="r-fill"
          />
        </g>

        <use
          xlinkHref="#s-text"
          className="text-copy--stroke"
        />
      </svg>
    </div>
  );
};

export default AnimatedText;