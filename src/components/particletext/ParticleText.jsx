import { useEffect, useRef, useState } from 'react';

const ParticleText = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Function to calculate font size based on screen width
  const calculateFontSize = () => {
    const width = window.innerWidth;
    if (width <= 480) return 48; // Mobile
    if (width <= 768) return 64; // Tablet
    if (width <= 1024) return 96; // Small desktop
    return 128; // Large desktop
  };

  // Function to calculate point count based on screen width
  const calculatePointCount = () => {
    const width = window.innerWidth;
    if (width <= 480) return 2000; // Mobile
    if (width <= 768) return 3000; // Tablet
    if (width <= 1024) return 3000; // Small desktop
    return 3000; // Large desktop
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let mask;
    let animationFrameId;
    const str = "KamaCleans";
    const pointCount = calculatePointCount();
    const whitePixels = [];
    const points = [];
    
    // Handle resize
    const handleResize = () => {
      const fontSize = calculateFontSize();
      const fontStr = `bold ${fontSize}pt Helvetica Neue, Helvetica, Arial, sans-serif`;
      ctx.font = fontStr;
      
      // Update canvas dimensions
      const textWidth = ctx.measureText(str).width;
      const canvasWidth = Math.min(textWidth, window.innerWidth * 0.9);
      const canvasHeight = fontSize;
      
      setDimensions({ width: canvasWidth, height: canvasHeight });
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Reinitialize points
      points.length = 0;
      whitePixels.length = 0;
      init();
    };

    function Point(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx || 1;
      this.vy = vy || 1;
    }

    Point.prototype.update = function() {
      const particleSize = window.innerWidth <= 768 ? 0.5 : 1;
      const lineWidthNear = window.innerWidth <= 768 ? 0.1 : 0.2;
      const lineWidthFar = window.innerWidth <= 768 ? 0.05 : 0.1;
      const connectionDistanceNear = window.innerWidth <= 768 ? 3 : 5;
      const connectionDistanceFar = window.innerWidth <= 768 ? 15 : 20;

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(this.x, this.y, particleSize, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      if (this.x + this.vx >= canvas.width || this.x + this.vx < 0 || mask.data[coordsToI(this.x + this.vx, this.y, mask.width)] != 255) {
        this.vx *= -1;
        this.x += this.vx * 2;
      }
      if (this.y + this.vy >= canvas.height || this.y + this.vy < 0 || mask.data[coordsToI(this.x, this.y + this.vy, mask.width)] != 255) {
        this.vy *= -1;
        this.y += this.vy * 2;
      }

      for (let k = 0; k < points.length; k++) {
        if (points[k] === this) continue;

        const d = Math.sqrt(Math.pow(this.x - points[k].x, 2) + Math.pow(this.y - points[k].y, 2));
        if (d < connectionDistanceNear) {
          ctx.lineWidth = lineWidthNear;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(points[k].x, points[k].y);
          ctx.stroke();
        }
        if (d < connectionDistanceFar) {
          ctx.lineWidth = lineWidthFar;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(points[k].x, points[k].y);
          ctx.stroke();
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    };

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let k = 0; k < points.length; k++) {
        points[k].update();
      }
      animationFrameId = requestAnimationFrame(loop);
    }

    function init() {
      const fontSize = calculateFontSize();
      const fontStr = `bold ${fontSize}pt Helvetica Neue, Helvetica, Arial, sans-serif`;
      
      // Draw text
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      ctx.font = fontStr;
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.fillText(str, 0, canvas.height / 2 + (canvas.height / 2));
      ctx.closePath();

      // Save mask
      mask = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save white pixels
      for (let i = 0; i < mask.data.length; i += 4) {
        if (mask.data[i] === 255 && mask.data[i + 1] === 255 && mask.data[i + 2] === 255 && mask.data[i + 3] === 255) {
          whitePixels.push([iToX(i, mask.width), iToY(i, mask.width)]);
        }
      }

      for (let k = 0; k < pointCount; k++) {
        addPoint();
      }
    }

    function addPoint() {
      const spawn = whitePixels[Math.floor(Math.random() * whitePixels.length)];
      const p = new Point(
        spawn[0],
        spawn[1],
        (Math.random() * 2 - 1) * (window.innerWidth <= 768 ? 0.5 : 1),
        (Math.random() * 2 - 1) * (window.innerWidth <= 768 ? 0.5 : 1)
      );
      points.push(p);
    }

    function iToX(i, w) {
      return ((i % (4 * w)) / 4);
    }

    function iToY(i, w) {
      return (Math.floor(i / (4 * w)));
    }

    function coordsToI(x, y, w) {
      return ((mask.width * y) + x) * 4;
    }

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 40,
        maxWidth: '90vw'
      }}
    />
  );
};

export default ParticleText;