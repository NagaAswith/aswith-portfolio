'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * Generate points evenly distributed on a sphere using the Fibonacci sphere algorithm.
 */
function createFibonacciSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  const color1 = new THREE.Color('#38bdf8'); // Electric sky/cyan
  const color2 = new THREE.Color('#818cf8'); // Subtle violet/indigo
  const colorDark = new THREE.Color('#1e3a8a'); // Deep cobalt

  const tempColor = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const r = Math.sqrt(Math.max(0, 1 - y * y)); // radius at y
    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    positions[i * 3 + 0] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;

    // Color gradient based on latitude & subtle noise
    const latFactor = (y + 1) * 0.5;
    const pseudoRandom = Math.sin(i * 12.9898) * 0.5 + 0.5;

    if (pseudoRandom > 0.82) {
      tempColor.copy(color2); // violet accent dots
    } else if (pseudoRandom > 0.35) {
      tempColor.copy(color1); // electric blue dots
    } else {
      tempColor.copy(colorDark); // deep navy background dots
    }

    // Blend slightly towards violet near the upper pole
    tempColor.lerp(color2, latFactor * 0.35);

    colors[i * 3 + 0] = tempColor.r;
    colors[i * 3 + 1] = tempColor.g;
    colors[i * 3 + 2] = tempColor.b;
  }

  return { positions, colors };
}

export function PlanetaryGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const tier = usePerformanceStore((state) => state.tier);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Determine point density by tier
  const pointCount = tier === 'HIGH' ? 1200 : tier === 'MEDIUM' ? 650 : 250;
  const sphereRadius = 3.4;

  const sphereData = useMemo(() => {
    return createFibonacciSpherePoints(pointCount, sphereRadius);
  }, [pointCount, sphereRadius]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.elapsedTime;

    // Subtle group idle breathing in Y
    if (groupRef.current) {
      groupRef.current.position.y = 1.0 + Math.sin(time * 0.18) * 0.08;
    }

    // Slow axial rotation of the digital sphere
    if (dotsRef.current) {
      dotsRef.current.rotation.y += delta * 0.028;
      dotsRef.current.rotation.x = Math.sin(time * 0.05) * 0.03;
    }

    // Orbital rings independent counter-rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.015;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.02;
    }

    // Subtle atmospheric pulsing
    if (atmosphereRef.current) {
      const scale = 1.0 + Math.sin(time * 0.35) * 0.008;
      atmosphereRef.current.scale.set(scale, scale, scale);
    }
  });

  if (tier === 'LOW') {
    return (
      <group position={[4.5, 1.0, -19]}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sphereData.positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#38bdf8"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </points>
      </group>
    );
  }

  return (
    <group
      ref={groupRef}
      position={[4.5, 1.0, -19]}
      rotation={[0.2, -0.3, 0.15]}
    >
      {/* ── 1. Solid Dark Planetary Core (occludes back-facing points & catches lighting) */}
      <mesh>
        <sphereGeometry args={[sphereRadius * 0.985, 32, 32]} />
        <meshStandardMaterial
          color="#020612"
          roughness={0.85}
          metalness={0.2}
        />
      </mesh>

      {/* ── 2. Digital Dotted Matrix Sphere ───────────────────────────────── */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sphereData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[sphereData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.042}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── 3. Atmospheric Rim Glow ───────────────────────────────────────── */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[sphereRadius * 1.04, 32, 32]} />
        <meshStandardMaterial
          color="#0369a1"
          emissive="#38bdf8"
          emissiveIntensity={0.65}
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── 4. Inner Atmospheric Violet Rim ───────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[sphereRadius * 1.02, 28, 28]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#6366f1"
          emissiveIntensity={0.4}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── 5. Primary Orbital Ring (tilted thin vector line) ─────────────── */}
      <mesh
        ref={ring1Ref}
        rotation={[Math.PI * 0.42, 0.25, 0]}
      >
        <torusGeometry args={[sphereRadius * 1.55, 0.012, 8, 120]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── 6. Secondary Orbital Ring (counter-inclined, ultra-subtle violet) ── */}
      <mesh
        ref={ring2Ref}
        rotation={[-Math.PI * 0.38, -0.35, 0.2]}
      >
        <torusGeometry args={[sphereRadius * 1.78, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.5}
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── 7. Equator Data Ring (faint dotted circumference) ─────────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[sphereRadius * 1.08, sphereRadius * 1.088, 64]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
