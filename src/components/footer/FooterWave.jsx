import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../../shaders/footer/shaders';

const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#4A90E2'),
    uColorEnd: new THREE.Color('#5EA2FF')
  },
  vertexShader,
  fragmentShader
);

extend({ WaveMaterial });

const FooterWave = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <waveMaterial ref={materialRef} />
    </mesh>
  );
};

export default FooterWave; 