'use client';

import React from 'react';

/**
 * Lighting — Cinematic deep-space technical lighting rig.
 *
 * Design philosophy:
 *   Cool technical white key → deep navy fill → celestial violet rim → restrained cyan technical accent.
 *   Provides crisp separation across foreground structures, midground network, and background planet/mountains.
 */
export function Lighting() {
  return (
    <group>
      {/* 1. Key Light — cool technical white, high directionality from upper-right-front */}
      <directionalLight
        position={[8, 6, 4]}
        intensity={1.8}
        color="#eef2ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* 2. Fill Light — deep navy, dimensionalizes shadows without flattening */}
      <directionalLight
        position={[-6, 2, 3]}
        intensity={0.55}
        color="#0a1628"
      />

      {/* 3. Celestial Rim Light — subtle violet rim illuminating planetary element & horizon */}
      <directionalLight
        position={[6, 4, -14]}
        intensity={0.9}
        color="#818cf8"
      />

      {/* 4. Technical Accent — restrained cyan underside light, grounds structures */}
      <directionalLight
        position={[2, -5, -8]}
        intensity={1.2}
        color="#0ea5e9"
      />

      {/* 5. Ultra-low ambient — preserves deep space black values */}
      <ambientLight intensity={0.10} color="#020609" />

      {/* 6. Sky bounce — deep sapphire-navy gradient */}
      <hemisphereLight args={['#0c1832', '#000000', 0.25]} />
    </group>
  );
}
