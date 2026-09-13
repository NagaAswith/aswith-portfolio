'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * Generate a procedural geometric mountain ridge geometry.
 */
function createMountainGeometry(
  width: number,
  depth: number,
  segmentsX: number,
  segmentsZ: number,
  maxHeight: number,
  seedOffset: number
) {
  const geom = new THREE.PlaneGeometry(width, depth, segmentsX, segmentsZ);
  geom.rotateX(-Math.PI / 2); // Orient flat on XZ plane

  const pos = geom.attributes.position;
  const count = pos.count;

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    // Lateral attenuation: mountains taper down at the far outer edges
    const lateralFalloff = Math.exp(-Math.pow(x / (width * 0.46), 2));

    // Longitudinal falloff: front edge sinks smoothly into the ground
    const frontFalloff = THREE.MathUtils.smoothstep(z, -depth * 0.5, depth * 0.2);

    // Multi-frequency harmonic ridge generation
    const nx = (x + seedOffset) * 0.12;
    const nz = (z + seedOffset) * 0.18;

    const wave1 = Math.sin(nx * 1.0) * Math.cos(nz * 1.1);
    const wave2 = Math.sin(nx * 2.3 + 1.2) * Math.cos(nz * 2.1) * 0.45;
    const wave3 = Math.abs(Math.sin(nx * 4.1)) * 0.25; // sharp ridge tops

    const elevation = Math.max(0, (wave1 + wave2 + wave3)) * maxHeight * lateralFalloff * frontFalloff;

    pos.setY(i, elevation);
  }

  geom.computeVertexNormals();
  return geom;
}

export function DistantMountains() {
  const tier = usePerformanceStore((state) => state.tier);

  // Far backdrop mountain range
  const farGeometry = useMemo(() => {
    const segs = tier === 'HIGH' ? 36 : 24;
    return createMountainGeometry(75, 24, segs, 14, 4.2, 10.5);
  }, [tier]);

  // Mid-distant secondary silhouette ridge (adds parallax depth)
  const midGeometry = useMemo(() => {
    const segs = tier === 'HIGH' ? 32 : 20;
    return createMountainGeometry(65, 18, segs, 12, 2.6, 45.2);
  }, [tier]);

  if (tier === 'LOW') {
    return (
      <group position={[0, -3.4, -28]}>
        <mesh geometry={farGeometry}>
          <meshBasicMaterial
            color="#040b18"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* ── 1. Far Mountain Ridge (Deepest Horizon plane, Z = -32) ─────────── */}
      <group position={[0, -3.3, -32]}>
        {/* Solid faceted mountain body */}
        <mesh geometry={farGeometry}>
          <meshStandardMaterial
            color="#020713"
            roughness={0.92}
            metalness={0.1}
            flatShading
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Minimal luminous ridge lines */}
        <mesh geometry={farGeometry}>
          <meshBasicMaterial
            color="#0284c7"
            wireframe
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ── 2. Mid-Distant Ridge (Foreground silhouette, Z = -24) ──────────── */}
      <group position={[3.0, -3.35, -24]}>
        <mesh geometry={midGeometry}>
          <meshStandardMaterial
            color="#030b1c"
            roughness={0.88}
            metalness={0.15}
            flatShading
            transparent
            opacity={0.82}
          />
        </mesh>

        <mesh geometry={midGeometry}>
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
