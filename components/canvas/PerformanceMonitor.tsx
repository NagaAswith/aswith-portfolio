'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function PerformanceMonitor() {
  const setFPS = usePerformanceStore((state) => state.setFPS);
  const degradeTier = usePerformanceStore((state) => state.degradeTier);

  const frameCount = useRef(0);
  const elapsedTime = useRef(0);
  const lowFpsDuration = useRef(0);

  useFrame((_, delta) => {
    frameCount.current += 1;
    elapsedTime.current += delta;

    // Evaluate FPS once every 1 second
    if (elapsedTime.current >= 1.0) {
      const currentFps = Math.round(
        frameCount.current / elapsedTime.current
      );
      setFPS(currentFps);

      // Track sustained low FPS (<30 FPS for >4 seconds)
      if (currentFps < 30) {
        lowFpsDuration.current += elapsedTime.current;
        if (lowFpsDuration.current >= 4.0) {
          degradeTier();
          lowFpsDuration.current = 0;
        }
      } else {
        lowFpsDuration.current = 0;
      }

      frameCount.current = 0;
      elapsedTime.current = 0;
    }
  });

  return null;
}
