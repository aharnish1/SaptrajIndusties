import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import MachineModel from './MachineModel';
import IndustrialLights from './IndustrialLights';

const MachineCanvas = ({ modelPath, serviceType }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Auto-rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full"
        shadows
      >
        {/* Industrial Lighting Setup */}
        <IndustrialLights />

        {/* 3D Machine Model */}
        <Suspense fallback={<div className="text-industrial-yellow">Loading Machine...</div>}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <MachineModel
              ref={meshRef}
              modelPath={modelPath}
              serviceType={serviceType}
              hovered={hovered}
              onHover={setHovered}
            />
          </Float>
        </Suspense>

        {/* Environment and Controls */}
        <Environment preset="warehouse" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
        />
      </Canvas>
    </div>
  );
};

export default MachineCanvas;
