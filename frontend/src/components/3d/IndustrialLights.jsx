import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

const IndustrialLights = () => {
  return (
    <>
      {/* Main Industrial Yellow Rim Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#FFD000"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
      />

      {/* White Cinematic Key Light */}
      <directionalLight
        position={[-5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
      />

      {/* Ambient Metallic Lighting */}
      <ambientLight
        intensity={0.3}
        color="#b0b0b0"
      />

      {/* Industrial Yellow Point Light */}
      <pointLight
        position={[0, 3, 0]}
        intensity={0.5}
        color="#FFD000"
        distance={10}
        decay={2}
      />

      {/* Cinematic Spotlight */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      
      />

      {/* Additional Rim Lights */}
      <pointLight
        position={[3, 2, -3]}
        intensity={0.3}
        color="#FFD000"
        distance={8}
        decay={2}
      />

      <pointLight
        position={[-3, 2, -3]}
        intensity={0.3}
        color="#FFD000"
        distance={8}
        decay={2}
      />
    </>
  );
};

export default IndustrialLights;
