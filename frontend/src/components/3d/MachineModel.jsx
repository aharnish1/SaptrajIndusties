import React, {
  forwardRef,
  useEffect,
  useMemo,
  memo,
} from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MachineModel = memo(
  forwardRef(
    (
      {
        serviceType,
        hovered,
        onHover,
      },
      ref
    ) => {

      // Load model
      const { scene } = useGLTF(
        '/models/machine_demo.glb'
      );

     
      const clonedScene = useMemo(() => {
  if (!scene) return null;

  const clone = scene.clone();

  // Center the model
  const box = new THREE.Box3().setFromObject(clone);
  const center = box.getCenter(new THREE.Vector3());

  clone.position.x -= center.x;
  clone.position.y -= center.y;
  clone.position.z -= center.z;

  return clone;

}, [scene]);

      // Material configuration
      const getMaterialConfig = (type) => {

        switch (type) {

          case 'cnc-laser-cutting':
            return {
              metalColor: '#1a1a1a',
              emissiveColor: '#FFD000',
              metalness: 0.85,
              roughness: 0.2,
            };

          case 'cnc-bending':
            return {
              metalColor: '#2a2a2a',
              emissiveColor: '#FFD000',
              metalness: 0.9,
              roughness: 0.15,
            };

          case 'mig-arc-welding':
            return {
              metalColor: '#111111',
              emissiveColor: '#FF6B35',
              metalness: 0.7,
              roughness: 0.3,
            };

          case 'structural-fabrication':
            return {
              metalColor: '#202020',
              emissiveColor: '#FFD000',
              metalness: 0.8,
              roughness: 0.25,
            };

          case 'sheet-metal-fabrication':
            return {
              metalColor: '#2c2c2c',
              emissiveColor: '#FFD000',
              metalness: 0.75,
              roughness: 0.3,
            };

          case 'electric-panel-fabrication':
            return {
              metalColor: '#101010',
              emissiveColor: '#FFD000',
              metalness: 0.65,
              roughness: 0.35,
            };

          default:
            return {
              metalColor: '#1a1a1a',
              emissiveColor: '#FFD000',
              metalness: 0.8,
              roughness: 0.2,
            };
        }
      };

      const materialConfig =
        getMaterialConfig(serviceType);

      // Apply materials
      useEffect(() => {

        if (!clonedScene) return;

        clonedScene.traverse((child) => {

          if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

            child.material =
              new THREE.MeshStandardMaterial({

                color: new THREE.Color(
                  materialConfig.metalColor
                ),

                metalness:
                  materialConfig.metalness,

                roughness:
                  materialConfig.roughness,

                emissive: new THREE.Color(
                  materialConfig.emissiveColor
                ),

                emissiveIntensity:
                  hovered ? 0.35 : 0.12,

              });
          }
        });

      }, [
        clonedScene,
        hovered,
        materialConfig,
      ]);

      // Prevent render crash
      if (!clonedScene) return null;

      return (
        <group
          ref={ref}
          onPointerOver={() => onHover(true)}
          onPointerOut={() => onHover(false)}
          scale={hovered ? 1.05 : 1}
        >

          <primitive
            object={clonedScene}
            scale={[0.5, 0.5, 0.5]}
            position={[-2.2, -1.8, 0]}
          />

        </group>
      );
    }
  )
);

// Preload model
useGLTF.preload(
  '/models/machine_demo.glb'
);

export default MachineModel;