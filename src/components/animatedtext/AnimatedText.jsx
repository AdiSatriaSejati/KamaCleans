import React from 'react';
import './AnimatedText.css';

const AnimatedText = () => {
  return (
    <div className="animated-text-container">
      <svg viewBox="0 0 600 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="50%" dy=".35em" className="text--line">
            kama cleans
          </text>
        </symbol>

        <clipPath id="cp-text">
          <text textAnchor="middle" x="50%" y="50%" dy=".35em" className="text--line">
            kama cleans
          </text>
        </clipPath>

        <pattern id="p-circles" width="40" height="40" viewBox="0 0 40 40" patternUnits="userSpaceOnUse">
          <circle r="12" cx="20" cy="20" className="c-ring"></circle>
          <circle r="5" cx="20" cy="20" className="c-ring c-ring--fill"></circle>

          <circle r="12" cx="0" cy="0" className="c-ring"></circle>
          <circle r="12" cx="40" cy="0" className="c-ring"></circle>
          <circle r="12" cx="40" cy="40" className="c-ring"></circle>
          <circle r="12" cx="0" cy="40" className="c-ring"></circle>

          <circle r="5" cx="0" cy="0" className="c-ring"></circle>
          <circle r="5" cx="40" cy="0" className="c-ring"></circle>
          <circle r="5" cx="40" cy="40" className="c-ring"></circle>
          <circle r="5" cx="0" cy="40" className="c-ring"></circle>
        </pattern>

        <use xlinkHref="#s-text" className="text-copy--shadow"></use>

        <g clipPath="url(#cp-text)">
          <circle r="70%" cx="300" cy="150" className="r-fill"></circle>
        </g>

        <use xlinkHref="#s-text" className="text-copy--stroke"></use>
      </svg>
    </div>
  );
};

export default AnimatedText;