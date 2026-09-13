'use client';

import React, { useEffect } from 'react';
import { detectDeviceTier } from '@/lib/deviceTier';
import { checkWebGLSupport } from '@/lib/webgl';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { FireworkCursor } from '@/components/ui/FireworkCursor';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const setTier = usePerformanceStore((state) => state.setTier);
  const setWebGLSupport = usePerformanceStore((state) => state.setWebGLSupport);
  const setReducedMotion = usePerformanceStore((state) => state.setReducedMotion);

  useEffect(() => {
    // 1. WebGL Support
    const webgl = checkWebGLSupport();
    setWebGLSupport(webgl.supported, webgl.version);

    // 2. Hardware Tier
    const caps = detectDeviceTier();
    setTier(caps.tier);

    // 3. Prefers-Reduced-Motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [setTier, setWebGLSupport, setReducedMotion]);

  return (
    <>
      <FireworkCursor />
      {children}
    </>
  );
}
