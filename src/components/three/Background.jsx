import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ServicesBackground = () => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  
  useEffect(() => {
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 3;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return <canvas ref={canvasRef} className="services-canvas" />;
};

export default ServicesBackground; 