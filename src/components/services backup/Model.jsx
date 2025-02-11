import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Model = ({ path, onLoad }) => {
  const { scene } = useGLTF(path);
  
  useEffect(() => {
    if (scene) {
      onLoad?.();
    }
  }, [scene, onLoad]);

  return <primitive object={scene} />;
};

export default Model;