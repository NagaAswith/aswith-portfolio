'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * HeroParticles — Multi-layered atmospheric dust + deep space cosmic stars.
 *
 * Depth Bands:
 *   Cosmic Stars  (Z: -36 to -58): 85 micro-points, furthest, majestic depth
 *   Far Band      (Z: -18 to -28): 36 particles, faint space dust
 *   Mid Band      (Z:  -8 to -18): 26 particles, midground atmospheric motes
 *   Near Band     (Z:  -2 to  -8): 16 particles, subtle foreground depth indicators
 */

function createBandData(
  count: number,
  zMin: number,
  zMax: number,
  spreadX: number,
  spreadY: number
) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Deterministic seeded pseudo-random distribution
    const s1 = Math.abs(Math.sin(i * 9.301 + zMin * 1.7) * 43758.5453 % 1);
    const s2 = Math.abs(Math.sin(i * 7.211 + zMax * 2.3) * 43758.5453 % 1);
    const s3 = Math.abs(Math.sin(i * 5.127 + count * 0.9) * 43758.5453 % 1);

    positions[i * 3 + 0] = (s1 - 0.5) * spreadX;
    positions[i * 3 + 1] = (s2 - 0.5) * spreadY;
    positions[i * 3 + 2] = zMin + s3 * (zMax - zMin);
  }

  return { positions };
}

// Pre-compute datasets for HIGH and MEDIUM performance tiers
const STARS_HIGH = createBandData(90, -36, -58, 48, 28);
const FAR_HIGH   = createBandData(36, -18, -28, 32, 18);
const MID_HIGH   = createBandData(24,  -8, -18, 24, 14);
const NEAR_HIGH  = createBandData(16,  -2,  -8, 16, 10);

const STARS_MED  = createBandData(45, -36, -58, 44, 26);
const FAR_MED    = createBandData(18, -18, -28, 28, 16);
const MID_MED    = createBandData(12,  -8, -18, 20, 12);
const NEAR_MED   = createBandData(8,   -2,  -8, 14, 8);

interface BandProps {
  positions: Float32Array;
  size: number;
  color: string;
  opacity: number;
  driftSpeed: number;
  reducedMotion: boolean;
}

function ParticleBand({ positions, size, color, opacity, driftSpeed, reducedMotion }: BandProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const basePositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    // Gentle independent floating drift
    pointsRef.current.position.y = Math.sin(t * driftSpeed) * 0.08;
    pointsRef.current.position.x = Math.cos(t * driftSpeed * 0.7) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[basePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroParticles() {
  const tier = usePerformanceStore((state) => state.tier);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  if (tier === 'LOW' || reducedMotion) return null;

  const isHigh = tier === 'HIGH';
  const stars = isHigh ? STARS_HIGH : STARS_MED;
  const far   = isHigh ? FAR_HIGH   : FAR_MED;
  const mid   = isHigh ? MID_HIGH   : MID_MED;
  const near  = isHigh ? NEAR_HIGH  : NEAR_MED;

  return (
    <group>
      {/* ── Layer 1: Cosmic Deep Space Stars (Slowest, deepest) ───────────── */}
      <ParticleBand
        positions={stars.positions}
        size={0.018}
        color="#bae6fd"
        opacity={0.28}
        driftSpeed={0.015}
        reducedMotion={reducedMotion}
      />

      {/* ── Layer 4a: Far Atmospheric Dust ────────────────────────────────── */}
      <ParticleBand
        positions={far.positions}
        size={0.022}
        color="#38bdf8"
        opacity={0.16}
        driftSpeed={0.035}
        reducedMotion={reducedMotion}
      />

      {/* ── Layer 4b: Mid Atmospheric Floating Particles ──────────────────── */}
      <ParticleBand
        positions={mid.positions}
        size={0.026}
        color="#818cf8"
        opacity={0.18}
        driftSpeed={0.055}
        reducedMotion={reducedMotion}
      />

      {/* ── Layer 4c: Near Fine Foreground Dust ───────────────────────────── */}
      <ParticleBand
        positions={near.positions}
        size={0.032}
        color="#38bdf8"
        opacity={0.22}
        driftSpeed={0.08}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
