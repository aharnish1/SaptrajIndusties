import React, { Suspense, useRef, useState, memo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  Float,
  Environment,
  ContactShadows,
  OrbitControls,
  Html,
} from '@react-three/drei';

import MachineModel from './MachineModel';
import IndustrialLights from './IndustrialLights';

const AnimatedMachine = memo(({ modelPath, serviceType }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handleHover = useCallback((hover) => {
    setHovered(hover);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15; // Reduced rotation speed

      // Optimized floating animation
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Reduced amplitude
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <MachineModel
        ref={meshRef}
        modelPath={modelPath}
        serviceType={serviceType}
        hovered={hovered}
        onHover={handleHover}
      />
    </Float>
  );
});

const Loader = () => {
  return (
    <Html center>
      <div className="text-industrial-yellow text-lg font-semibold bg-black/80 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-industrial-yellow rounded-full animate-pulse"></div>
          Loading Industrial Machine...
        </div>
      </div>
    </Html>
  );
};

const Hero3DScene = ({ modelPath, serviceType }) => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 40 }}
        className="w-full h-full"
        dpr={[1, 1.5]} // Optimize pixel ratio
        performance={{ min: 0.5 }} // Performance optimization
      >
        {/* Stars Background - Optimized */}
        <Stars
          radius={50}
          depth={30}
          count={200} // Reduced from 1000
          factor={2}
          saturation={0}
          fade
          speed={1}
        />

        {/* Industrial Lighting */}
        <IndustrialLights />

        {/* Main Machine */}
        <Suspense fallback={<Loader />}>
          <AnimatedMachine
            modelPath={modelPath}
            serviceType={serviceType}
          />
        </Suspense>

        {/* Floating Glow Particle 1 - Optimized */}
        <Float
          speed={4}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <mesh position={[1.5, 0.5, -1]}>
            <sphereGeometry args={[0.015, 8, 8]} /> {/* Reduced segments */}
            <meshStandardMaterial
              color="#FFD000"
              emissive="#FFD000"
              emissiveIntensity={1.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>

        {/* Floating Glow Particle 2 - Optimized */}
        <Float
          speed={3}
          rotationIntensity={0.8}
          floatIntensity={1.5}
        >
          <mesh position={[-1.5, 0.2, -0.8]}>
            <sphereGeometry args={[0.01, 8, 8]} /> {/* Reduced segments */}
            <meshStandardMaterial
              color="#FFD000"
              emissive="#FFD000"
              emissiveIntensity={1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>

        {/* Environment */}
        <Environment preset="warehouse" />

        {/* Controls - Optimized */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={8}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;