'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * HeroEnvironment — the 3D backdrop for the portfolio hero.
 *
 * Design:
 *   - Large dark reflective floor plane with very low reflectivity
 *   - One singular, distant, slowly rotating geometric accent (NOT the focus)
 *   - Subtle depth fog handled in HeroWorld
 */
export function HeroEnvironment() {
  const floatingRef = useRef<THREE.Mesh>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  useFrame((state, delta) => {
    if (!floatingRef.current || reducedMotion) return;

    // Very slow, elegant rotation — not distracting
    floatingRef.current.rotation.x += delta * 0.08;
    floatingRef.current.rotation.y += delta * 0.12;

    // Barely perceptible float
    floatingRef.current.position.y =
      -2.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group>
      {/* Floor plane — dark, very slight reflectivity */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#050810"
          metalness={0.3}
          roughness={0.85}
          envMapIntensity={0.2}
        />
      </mesh>

      {/* 
        Singular deep-background geometric accent.
        Small, distant, barely visible — establishes depth and dimensionality.
        This is NOT meant to be seen clearly — it adds spatial presence.
      */}
      <mesh
        ref={floatingRef}
        position={[4.5, -2.5, -8]}
        scale={0.9}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#060d1a"
          emissive="#0a1628"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.2}
          wireframe={false}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Wire frame version — very faint, gives tech depth */}
      <mesh position={[4.5, -2.5, -8]} scale={0.91}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#1e3a5f"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}
