import { create } from 'zustand';
import { DeviceTier } from '@/lib/deviceTier';

interface PerformanceStore {
  tier: DeviceTier;
  fps: number;
  webglSupported: boolean;
  webglVersion: 0 | 1 | 2;
  webglContextLost: boolean;
  reducedMotion: boolean;
  dpr: [number, number];
  postProcessingEnabled: boolean;
  bloomEnabled: boolean;
  depthOfFieldEnabled: boolean;
  chromaticAberrationEnabled: boolean;
  particleScale: number;
  shadowsEnabled: boolean;

  setTier: (tier: DeviceTier) => void;
  setFPS: (fps: number) => void;
  setWebGLSupport: (supported: boolean, version?: 0 | 1 | 2) => void;
  setWebGLContextLost: (lost: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  degradeTier: () => void;
}

export const usePerformanceStore = create<PerformanceStore>((set, get) => ({
  tier: 'HIGH',
  fps: 60,
  webglSupported: true,
  webglVersion: 2,
  webglContextLost: false,
  reducedMotion: false,
  dpr: [1, 2],
  postProcessingEnabled: true,
  bloomEnabled: true,
  depthOfFieldEnabled: true,
  chromaticAberrationEnabled: true,
  particleScale: 1.0,
  shadowsEnabled: true,

  setTier: (tier: DeviceTier) => {
    switch (tier) {
      case 'HIGH':
        set({
          tier: 'HIGH',
          dpr: [1, 2],
          postProcessingEnabled: true,
          bloomEnabled: true,
          depthOfFieldEnabled: true,
          chromaticAberrationEnabled: true,
          particleScale: 1.0,
          shadowsEnabled: true,
        });
        break;
      case 'MEDIUM':
        set({
          tier: 'MEDIUM',
          dpr: [1, 1.5],
          postProcessingEnabled: true,
          bloomEnabled: true,
          depthOfFieldEnabled: false,
          chromaticAberrationEnabled: true,
          particleScale: 0.75,
          shadowsEnabled: true,
        });
        break;
      case 'LOW':
        set({
          tier: 'LOW',
          dpr: [1, 1],
          postProcessingEnabled: false,
          bloomEnabled: false,
          depthOfFieldEnabled: false,
          chromaticAberrationEnabled: false,
          particleScale: 0.5,
          shadowsEnabled: false,
        });
        break;
    }
  },

  setFPS: (fps: number) => set({ fps }),
  setWebGLSupport: (webglSupported, webglVersion = 2) =>
    set({ webglSupported, webglVersion }),
  setWebGLContextLost: (webglContextLost) => set({ webglContextLost }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  degradeTier: () => {
    const { tier, setTier } = get();
    if (tier === 'HIGH') {
      console.warn('Performance degrade: HIGH -> MEDIUM');
      setTier('MEDIUM');
    } else if (tier === 'MEDIUM') {
      console.warn('Performance degrade: MEDIUM -> LOW');
      setTier('LOW');
    }
  },
}));
