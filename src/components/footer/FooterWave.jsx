import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDarkMode } from '../../context/darkModeContext';
import * as THREE from 'three';

const FooterWave = () => {
  const { isDarkMode } = useDarkMode();
  const meshRef = useRef();
  const materialRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Membuat geometri yang lebih detail
  const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);
  
  // Custom shader untuk efek gelombang yang lebih smooth
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      
      // Calculate distance from mouse
      vec2 mouseEffect = (position.xy - uMouse) * 0.1;
      float mouseDistance = length(mouseEffect);
      
      // Create wave effect
      float elevation = sin(position.x * 2.0 + uTime) * 0.2
                     + sin(position.y * 2.0 + uTime) * 0.2;
                     
      // Add noise
      float noise = snoise(vec2(position.x * 2.0 + uTime * 0.5, 
                               position.y * 2.0 + uTime * 0.5)) * 0.1;
                               
      // Combine effects
      elevation += noise;
      
      // Add mouse interaction
      elevation += (0.5 / (mouseDistance + 0.2)) * 0.05;
      
      vElevation = elevation;
      
      vec3 newPosition = position + normal * elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec3 color = mix(uColorStart, uColorEnd, vUv.x + vElevation);
      float alpha = 0.8 + vElevation * 0.3;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value = [
        mousePosition.current.x,
        mousePosition.current.y
      ];
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI * 0.5;
      meshRef.current.position.y = -0.5;
    }
  });

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: [0, 0] },
      uColorStart: { value: isDarkMode ? 
        new THREE.Color('#1a1a1a') : 
        new THREE.Color('#4A90E2') 
      },
      uColorEnd: { value: isDarkMode ? 
        new THREE.Color('#2a2a2a') : 
        new THREE.Color('#5EA2FF') 
      }
    },
    transparent: true,
    side: THREE.DoubleSide
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </mesh>
  );
};

export default FooterWave; 