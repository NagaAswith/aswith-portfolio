'use client';

import React from 'react';
import { PerspectiveGrid } from './PerspectiveGrid';
import { SpatialStructures } from './SpatialStructures';
import { HeroParticles } from './HeroParticles';
import { PlanetaryGlobe } from './PlanetaryGlobe';
import { DistantMountains } from './DistantMountains';
import { ConstellationNetwork } from './ConstellationNetwork';

/**
 * HeroWorld — Unified 6-Layer 3D Digital Environment.
 *
 * Scene composition (back to front):
 *   1. Atmospheric exponential depth fog (#020409, 0.024)
 *   2. Layer 1 (Cosmic Stars) & Layer 4 (Atmosphere) — HeroParticles
 *   3. Layer 2 (Distant Environment) — DistantMountains (Z: -24 to -32)
 *   4. Layer 6 (Planetary Element) — PlanetaryGlobe (Z: -19, Right-Center Negative Space)
 *   5. Layer 5 (Network Structure) — ConstellationNetwork (Z: -7.5 to -16)
 *   6. Layer 3 (Reflective Ground) — PerspectiveGrid (Y: -3.25)
 *   7. Signature Spatial Reactor — SpatialStructures (Z: -10)
 */
export function HeroWorld() {
  return (
    <group>
      {/* ── Atmospheric exponential depth haze ─────────────────────────── */}
      <fogExp2 attach="fog" args={['#020409', 0.024]} />

      {/* ── Layer 2: Distant geometric mountain ridges ─────────────────── */}
      <DistantMountains />

      {/* ── Layer 6: Large futuristic planetary/globe element ──────────── */}
      <PlanetaryGlobe />

      {/* ── Layer 5: Sparse constellation network vectors ──────────────── */}
      <ConstellationNetwork />

      {/* ── Layer 3: Dark reflective ground + perspective grid ─────────── */}
      <PerspectiveGrid />

      {/* ── Core spatial architecture: TECHCORE Reactor & accents ──────── */}
      <SpatialStructures />

      {/* ── Layers 1 & 4: Cosmic stars and stratified atmospheric dust ─── */}
      <HeroParticles />
    </group>
  );
}
