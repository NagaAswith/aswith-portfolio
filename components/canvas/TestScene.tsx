'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function TestScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    // Elegant slow floating & rotation oscillation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.4;
      innerRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Elegant Geometric Artifact */}
      <mesh ref={meshRef} castShadow receiveShadow scale={1.2}>
        <icosahedronGeometry args={[1.4, 2]} />
        <meshPhysicalMaterial
          color="#0f172a"
          emissive="#0284c7"
          emissiveIntensity={0.15}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={false}
          flatShading={false}
        />
      </mesh>

      {/* Internal Glowing Core Monolith */}
      <mesh ref={innerRef} scale={0.7}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.5}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}
