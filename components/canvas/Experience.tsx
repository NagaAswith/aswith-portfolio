'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';
import { HeroCamera } from './HeroCamera';
import { Lighting } from './Lighting';
import { HeroWorld } from './HeroWorld';
import { PostProcessing } from './PostProcessing';
import { PerformanceMonitor } from './PerformanceMonitor';

export function Experience() {
  const dpr = usePerformanceStore((state) => state.dpr);
  const shadowsEnabled = usePerformanceStore((state) => state.shadowsEnabled);
  const introState = useIntroStore((state) => state.introState);

  // Canvas is completely hidden and not rendered during intro to save GPU
  const isHidden =
    introState === 'INTRO_PLAYING' ||
    introState === 'MESSAGE_READY' ||
    introState === 'MESSAGE_CLICKED';

  // Canvas fades in during PORTFOLIO_REVEAL, fully visible at PORTFOLIO_ACTIVE
  const opacity =
    introState === 'TRANSITIONING'
      ? 0
      : introState === 'PORTFOLIO_REVEAL'
      ? 1
      : introState === 'PORTFOLIO_ACTIVE'
      ? 1
      : 0;

  if (isHidden) return null;

  return (
    <div
      className="fixed inset-0 z-0 bg-[#020409] overflow-hidden"
      style={{
        opacity,
        transition: 'opacity 1.0s cubic-bezier(0.16,1,0.3,1)',
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        shadows={shadowsEnabled}
        frameloop="always"
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#020409', 1);
        }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor />
          <HeroCamera />
          <Lighting />
          <HeroWorld />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
}
