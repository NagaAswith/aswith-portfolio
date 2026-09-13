'use client';

import { useEffect, useRef } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export interface MousePosition {
  x: number; // –1 to 1
  y: number; // –1 to 1
}

/**
 * Tracks normalised mouse position for parallax effects.
 * Returns (0, 0) when:
 * – prefers-reduced-motion is active
 * – on mobile/touch devices
 */
export function useMouseParallax(): React.RefObject<MousePosition> {
  const posRef = useRef<MousePosition>({ x: 0, y: 0 });
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  useEffect(() => {
    // Disable on touch-primary devices
    const isTouchDevice =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    if (reducedMotion || isTouchDevice) {
      posRef.current = { x: 0, y: 0 };
      return;
    }

    const handleMove = (e: MouseEvent) => {
      posRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reducedMotion]);

  return posRef;
}
