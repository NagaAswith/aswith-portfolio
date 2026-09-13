'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';

const vertexShader = `
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor;
  uniform vec3 uHorizonColor;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vec2 coord = vWorldPosition.xz;

    // Subtle slow forward progression
    coord.y += uTime * 0.05 + uScroll * 0.0018;

    // Major grid lines — crisp, restrained engineering lines
    vec2 fwMajor = max(fwidth(coord / 2.0), vec2(0.001));
    vec2 gridMajor = abs(fract(coord / 2.0 - 0.5) - 0.5) / fwMajor;
    float lineMajor = 1.0 - min(min(gridMajor.x, gridMajor.y), 1.0);

    // Minor subdivision
    vec2 fwMinor = max(fwidth(coord / 0.5), vec2(0.001));
    vec2 gridMinor = abs(fract(coord / 0.5 - 0.5) - 0.5) / fwMinor;
    float lineMinor = 1.0 - min(min(gridMinor.x, gridMinor.y), 1.0);

    float line = lineMajor * 0.85 + lineMinor * 0.12;

    // Distance attenuation — smooth horizon dissolve
    float dist = length(vWorldPosition.xyz);
    float depthFade = smoothstep(28.0, 5.0, dist);

    // Near camera fade — no clipping directly under lens
    float nearFade = smoothstep(0.8, 4.0, dist);

    // Lateral corridor falloff
    float lateralFade = exp(-pow(vWorldPosition.x / 11.0, 2.0));

    // Color gradient across perspective depth
    float horizonMix = smoothstep(6.0, 22.0, dist);
    vec3 finalColor = mix(uColor, uHorizonColor, horizonMix);

    float alpha = line * depthFade * nearFade * lateralFade * 0.18;

    // Horizon subtle technology glow
    float horizonGlow = smoothstep(-18.0, -25.0, vWorldPosition.z) *
                        smoothstep(-32.0, -25.0, vWorldPosition.z) *
                        lateralFade * 0.09;

    finalColor += uHorizonColor * horizonGlow * 0.7;
    alpha = max(alpha, horizonGlow * 0.12);

    if (alpha <= 0.001) discard;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function PerspectiveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const tier = usePerformanceStore((state) => state.tier);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color('#0ea5e9') },       // Electric Sky
      uHorizonColor: { value: new THREE.Color('#1e1b4b') }, // Midnight Indigo
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    if (!reducedMotion) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (typeof window !== 'undefined') {
      materialRef.current.uniforms.uScroll.value = window.scrollY;
    }
  });

  if (tier === 'LOW') {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.25, -10]}>
        <planeGeometry args={[44, 44, 8, 8]} />
        <meshBasicMaterial
          color="#0c2340"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    );
  }

  return (
    <group position={[0, -3.25, -10]}>
      {/* ── 1. Physical Dark Reflective Ground Substrate ─────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[65, 65]} />
        <meshStandardMaterial
          color="#010308"
          roughness={0.82}
          metalness={0.35}
        />
      </mesh>

      {/* ── 2. Atmospheric Perspective Grid Shader Plane ─────────────────────── */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[56, 56, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
