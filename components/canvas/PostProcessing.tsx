'use client';

import React from 'react';
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import { usePerformanceStore } from '@/store/usePerformanceStore';

/**
 * PostProcessing — Restrained cinematic post-processing stack.
 *
 * Philosophy: premium cinematic, NOT gaming/VR look.
 *   - Bloom: low intensity, high threshold — only genuinely bright emissives glow
 *   - Vignette: subtle darkening, not dramatic darkness
 *   - No ChromaticAberration (adds VR/gaming feel)
 *   - No DepthOfField by default (can cause content blur on scroll)
 */
export function PostProcessing() {
  const postProcessingEnabled = usePerformanceStore(
    (state) => state.postProcessingEnabled
  );
  const bloomEnabled = usePerformanceStore((state) => state.bloomEnabled);

  if (!postProcessingEnabled) return null;

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      {bloomEnabled && (
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.78}
          luminanceSmoothing={0.6}
          mipmapBlur
        />
      )}

      {/* Subtle cinematic vignette — frames the scene, not overpowers it */}
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
    </EffectComposer>
  );
}
