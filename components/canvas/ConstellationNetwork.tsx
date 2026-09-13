'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * Generate a deterministic sparse 3D constellation network graph.
 */
function createNetworkGraph(nodeCount: number, maxDistance: number) {
  const nodes: THREE.Vector3[] = [];

  // Seeded deterministic distribution across midground negative spaces
  for (let i = 0; i < nodeCount; i++) {
    const s1 = Math.abs(Math.sin(i * 14.23 + 1.8) * 43758.5453 % 1);
    const s2 = Math.abs(Math.sin(i * 21.71 + 3.4) * 43758.5453 % 1);
    const s3 = Math.abs(Math.sin(i * 35.19 + 7.2) * 43758.5453 % 1);

    const x = (s1 - 0.5) * 26;
    const y = -1.8 + s2 * 5.2;
    const z = -7.5 - s3 * 8.5; // Z between -7.5 and -16

    nodes.push(new THREE.Vector3(x, y, z));
  }

  // Find connecting edges within distance threshold
  const linePositions: number[] = [];
  const nodePositions: number[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const p1 = nodes[i];
    nodePositions.push(p1.x, p1.y, p1.z);

    let connections = 0;
    for (let j = i + 1; j < nodeCount; j++) {
      const p2 = nodes[j];
      const dist = p1.distanceTo(p2);

      if (dist < maxDistance && connections < 3) {
        linePositions.push(p1.x, p1.y, p1.z);
        linePositions.push(p2.x, p2.y, p2.z);
        connections++;
      }
    }
  }

  return {
    lineArray: new Float32Array(linePositions),
    nodeArray: new Float32Array(nodePositions),
  };
}

export function ConstellationNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const tier = usePerformanceStore((state) => state.tier);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  const nodeCount = tier === 'HIGH' ? 32 : tier === 'MEDIUM' ? 20 : 12;
  const maxDistance = 4.8;

  const { lineArray, nodeArray } = useMemo(() => {
    return createNetworkGraph(nodeCount, maxDistance);
  }, [nodeCount, maxDistance]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const t = state.clock.elapsedTime;
    // Ultra-slow cinematic drift
    groupRef.current.position.y = Math.sin(t * 0.12) * 0.08;
    groupRef.current.position.x = Math.cos(t * 0.09) * 0.06;
    groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.02;
  });

  if (tier === 'LOW') {
    return null; // Skip network layer on low-tier mobile devices for maximum performance
  }

  return (
    <group ref={groupRef}>
      {/* ── 1. Sparse Thin Network Vectors ─────────────────────────────────── */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineArray, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* ── 2. Subtle Nodal Signal Vertices ───────────────────────────────── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodeArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#818cf8"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
