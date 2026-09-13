'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * SpatialStructures — The unified TECHCORE Reactor + restrained compositional accents.
 *
 * Design language: Precision engineering digital environment.
 * ONE signature multi-layered orbital structure occupying right-center negative space,
 * plus two minimal accent pieces that imply environmental continuity.
 *
 * TECHCORE Reactor anatomy (inside → out):
 *   1. Dark metallic inner sphere core
 *   2. Three interlocked geodesic arc rings (independent rotation axes)
 *   3. Middle orbital torus — single slow planar rotation
 *   4. Outer low-poly structural cage (icosahedral wireframe)
 *   5. Eight emissive data-point indicators on an orbital path
 */

// Pre-compute emissive indicator positions on a circle in the XZ plane
const INDICATOR_POSITIONS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const radius = 1.0;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle * 0.5) * 0.2, // slight vertical undulation
    Math.sin(angle) * radius
  );
});

export function SpatialStructures() {
  // TECHCORE Reactor refs
  const reactorGroupRef = useRef<THREE.Group>(null);
  const arc1Ref = useRef<THREE.Mesh>(null);
  const arc2Ref = useRef<THREE.Mesh>(null);
  const arc3Ref = useRef<THREE.Mesh>(null);
  const orbitalRingRef = useRef<THREE.Mesh>(null);
  const indicatorsGroupRef = useRef<THREE.Group>(null);

  // Accent refs
  const accentARef = useRef<THREE.Group>(null);
  const accentBRef = useRef<THREE.Mesh>(null);

  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const tier = usePerformanceStore((state) => state.tier);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.elapsedTime;

    // ── TECHCORE Reactor: slow harmonic breathe ──────────────────
    if (reactorGroupRef.current) {
      // Very slow top-level group idle breathe — subtle Y oscillation
      reactorGroupRef.current.position.y = 0.6 + Math.sin(time * 0.22) * 0.06;
    }

    // Arc ring 1 — rotates around Y axis
    if (arc1Ref.current) {
      arc1Ref.current.rotation.y += delta * 0.04;
    }
    // Arc ring 2 — rotates around X axis (orthogonal to arc1)
    if (arc2Ref.current) {
      arc2Ref.current.rotation.x += delta * 0.03;
    }
    // Arc ring 3 — rotates around Z axis (third dimension)
    if (arc3Ref.current) {
      arc3Ref.current.rotation.z -= delta * 0.025;
    }

    // Middle orbital ring — very slow single-plane spin
    if (orbitalRingRef.current) {
      orbitalRingRef.current.rotation.y += delta * 0.015;
    }

    // Indicators — orbit around the TECHCORE core
    if (indicatorsGroupRef.current) {
      indicatorsGroupRef.current.rotation.y = time * 0.12;
    }

    // Accent A (distant ring) — barely perceptible slow tilt
    if (accentARef.current) {
      accentARef.current.rotation.z = Math.sin(time * 0.08) * 0.04;
    }

    // Accent B (near small octahedron)
    if (accentBRef.current) {
      accentBRef.current.rotation.x += delta * 0.04;
      accentBRef.current.rotation.y += delta * 0.06;
    }
  });

  if (tier === 'LOW') {
    // Minimal single-structure fallback
    return (
      <group position={[4.2, 0.6, -10]}>
        <mesh>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshBasicMaterial color="#0d1f35" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.3, 0.015, 4, 40]} />
          <meshBasicMaterial color="#1e4d6b" transparent opacity={0.18} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* ═══════════════════════════════════════════════════════
          TECHCORE REACTOR — signature structure
          Position: [4.2, 0.6, -10] (right-center negative space)
          Partially exits viewport right edge → compositional framing
          ═══════════════════════════════════════════════════════ */}
      <group ref={reactorGroupRef} position={[4.2, 0.6, -10]}>

        {/* 1. Solid inner core — dark metallic, reacts to key light */}
        <mesh>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshStandardMaterial
            color="#0d1f35"
            emissive="#091525"
            emissiveIntensity={0.9}
            metalness={0.98}
            roughness={0.08}
          />
        </mesh>

        {/* 2a. Geodesic arc ring — Y-axis rotation */}
        <mesh ref={arc1Ref}>
          <torusGeometry args={[0.78, 0.012, 8, 72]} />
          <meshStandardMaterial
            color="#1e4d6b"
            emissive="#0369a1"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* 2b. Geodesic arc ring — X-axis rotation (orthogonal) */}
        <mesh ref={arc2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.78, 0.009, 8, 72]} />
          <meshStandardMaterial
            color="#164e63"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* 2c. Geodesic arc ring — Z-axis rotation (third dimension) */}
        <mesh ref={arc3Ref} rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[0.78, 0.007, 8, 64]} />
          <meshStandardMaterial
            color="#0f3451"
            emissive="#0369a1"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.25}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* 3. Middle orbital ring — flat plane, very slow rotation */}
        <mesh ref={orbitalRingRef} rotation={[Math.PI * 0.08, 0, 0]}>
          <torusGeometry args={[1.3, 0.018, 8, 80]} />
          <meshStandardMaterial
            color="#0c4a6e"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* 4. Outer structural cage — icosahedral wireframe */}
        <mesh>
          <icosahedronGeometry args={[1.85, 1]} />
          <meshBasicMaterial
            color="#1e3a5f"
            wireframe
            transparent
            opacity={0.10}
          />
        </mesh>

        {/* 5. Data emissive indicators — 8 orbital position markers */}
        <group ref={indicatorsGroupRef}>
          {INDICATOR_POSITIONS.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={2.2}
                metalness={0}
                roughness={0}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ═══════════════════════════════════════════════════════
          ACCENT A — Distant ultra-thin ring (far-left depth plane)
          Barely visible. Establishes that the environment extends far.
          Position: [-6.5, 1.8, -18]
          ═══════════════════════════════════════════════════════ */}
      <group ref={accentARef} position={[-6.5, 1.8, -18]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.4, 0.01, 6, 48]} />
          <meshBasicMaterial
            color="#164e63"
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>

      {/* ═══════════════════════════════════════════════════════
          ACCENT B — Near-foreground tiny octahedron (lower-left)
          Implies the 3D environment extends in front of the far structure.
          Tiny, very low opacity — depth indicator only.
          Position: [-3.5, -2.5, -6]
          ═══════════════════════════════════════════════════════ */}
      <mesh ref={accentBRef} position={[-3.5, -2.5, -6]} scale={0.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#1e4d6b"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}
