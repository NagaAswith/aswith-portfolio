'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';

interface AtmosphericSectionConfig {
  id: string;
  primaryColor: [number, number, number];   // RGB
  secondaryColor: [number, number, number]; // RGB
  primaryPos: [number, number];            // Percentage [x, y]
  secondaryPos: [number, number];          // Percentage [x, y]
  primaryOpacity: number;
  secondaryOpacity: number;
}

// Section atmospheric palette — subtle, deep, tailored for premium dark mode
const SECTION_CONFIGS: AtmosphericSectionConfig[] = [
  {
    id: 'hero',
    primaryColor: [14, 165, 233],     // Electric Cyan / Sky
    secondaryColor: [15, 23, 42],     // Deep Midnight Slate
    primaryPos: [50, 25],
    secondaryPos: [80, 60],
    primaryOpacity: 0.08,
    secondaryOpacity: 0.12,
  },
  {
    id: 'work',
    primaryColor: [2, 132, 199],      // Deep Cyan Accent
    secondaryColor: [30, 58, 138],    // Deep Royal Navy
    primaryPos: [45, 40],
    secondaryPos: [75, 65],
    primaryOpacity: 0.10,
    secondaryOpacity: 0.13,
  },
  {
    id: 'skills',
    primaryColor: [99, 102, 241],     // Subtle Violet / Indigo
    secondaryColor: [30, 41, 59],     // Deep Cobalt Slate
    primaryPos: [55, 35],
    secondaryPos: [25, 60],
    primaryOpacity: 0.08,
    secondaryOpacity: 0.11,
  },
  {
    id: 'experience',
    primaryColor: [37, 99, 235],      // Electric Blue
    secondaryColor: [15, 23, 42],     // Midnight Slate
    primaryPos: [35, 45],
    secondaryPos: [70, 30],
    primaryOpacity: 0.08,
    secondaryOpacity: 0.12,
  },
  {
    id: 'certificates',
    primaryColor: [6, 182, 212],      // Luminous Cyan
    secondaryColor: [30, 58, 138],    // Midnight Navy
    primaryPos: [50, 45],
    secondaryPos: [25, 60],
    primaryOpacity: 0.09,
    secondaryOpacity: 0.12,
  },
  {
    id: 'achievements',
    primaryColor: [129, 140, 248],    // Subtle Violet
    secondaryColor: [15, 23, 42],     // Deep Navy
    primaryPos: [65, 35],
    secondaryPos: [35, 65],
    primaryOpacity: 0.08,
    secondaryOpacity: 0.10,
  },
  {
    id: 'contact',
    primaryColor: [79, 70, 229],      // Deep Indigo
    secondaryColor: [15, 23, 42],     // Deep Charcoal
    primaryPos: [50, 50],
    secondaryPos: [80, 30],
    primaryOpacity: 0.09,
    secondaryOpacity: 0.14,
  },
];

export function CinematicBackground() {
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const introState = useIntroStore((state) => state.introState);
  const isPortfolioActive = introState === 'PORTFOLIO_ACTIVE';

  // Responsive pointer check
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: fine)').matches;
    }
    return true;
  });

  const animFrameRef = useRef<number | null>(null);

  // Mouse parallax state stored in refs for zero React re-renders
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });

  // Interpolated atmospheric lighting state
  const currentAtmosphereRef = useRef({
    pColor: [...SECTION_CONFIGS[0].primaryColor] as [number, number, number],
    sColor: [...SECTION_CONFIGS[0].secondaryColor] as [number, number, number],
    pPos: [...SECTION_CONFIGS[0].primaryPos] as [number, number],
    sPos: [...SECTION_CONFIGS[0].secondaryPos] as [number, number],
    pOpacity: SECTION_CONFIGS[0].primaryOpacity,
    sOpacity: SECTION_CONFIGS[0].secondaryOpacity,
  });

  const targetAtmosphereRef = useRef(SECTION_CONFIGS[0]);

  // DOM elements for GPU-accelerated CSS transforms
  const orbPrimaryRef = useRef<HTMLDivElement>(null);
  const orbSecondaryRef = useRef<HTMLDivElement>(null);
  const orbAmbientRef = useRef<HTMLDivElement>(null);

  // 1. Pointer type listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fineQuery = window.matchMedia('(pointer: fine)');
    const handleFineChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    fineQuery.addEventListener('change', handleFineChange);
    return () => fineQuery.removeEventListener('change', handleFineChange);
  }, []);

  // 2. Mouse parallax listener (Desktop only, restrained dampening)
  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTargetRef.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, reducedMotion]);

  // 3. Section-aware scroll observer for continuous atmospheric interpolation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = ['about', 'work', 'skills', 'experience', 'certificates', 'achievements', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const midPoint = scrollY + windowHeight * 0.4;

      let activeSectionId = 'hero';

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          if (midPoint >= top) {
            activeSectionId = sectionIds[i] === 'about' ? 'hero' : sectionIds[i];
            break;
          }
        }
      }

      const match = SECTION_CONFIGS.find((c) => c.id === activeSectionId) || SECTION_CONFIGS[0];
      targetAtmosphereRef.current = match;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Main unified 60 FPS animation loop (smooth atmospheric lerp)
  useEffect(() => {
    let clock = 0;

    const render = () => {
      clock += 0.016;

      // ── A. Mouse Parallax Lerp ──────────────────────────────
      if (!reducedMotion && isDesktop) {
        mouseCurrentRef.current.x +=
          (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.04;
        mouseCurrentRef.current.y +=
          (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.04;
      }

      const mx = mouseCurrentRef.current.x;
      const my = mouseCurrentRef.current.y;

      // ── B. Section Atmospheric Interpolation ────────────────
      const current = currentAtmosphereRef.current;
      const target = targetAtmosphereRef.current;
      const lerpSpeed = 0.035;

      for (let i = 0; i < 3; i++) {
        current.pColor[i] += (target.primaryColor[i] - current.pColor[i]) * lerpSpeed;
        current.sColor[i] += (target.secondaryColor[i] - current.sColor[i]) * lerpSpeed;
      }
      current.pPos[0] += (target.primaryPos[0] - current.pPos[0]) * lerpSpeed;
      current.pPos[1] += (target.primaryPos[1] - current.pPos[1]) * lerpSpeed;
      current.sPos[0] += (target.secondaryPos[0] - current.sPos[0]) * lerpSpeed;
      current.sPos[1] += (target.secondaryPos[1] - current.sPos[1]) * lerpSpeed;
      current.pOpacity += (target.primaryOpacity - current.pOpacity) * lerpSpeed;
      current.sOpacity += (target.secondaryOpacity - current.sOpacity) * lerpSpeed;

      // ── C. Apply Volumetric Lighting Styles ─────────────────
      const breath1 = Math.sin(clock * 0.25) * 16;
      const breath2 = Math.cos(clock * 0.18) * 20;

      if (orbPrimaryRef.current) {
        const pr = Math.round(current.pColor[0]);
        const pg = Math.round(current.pColor[1]);
        const pb = Math.round(current.pColor[2]);
        const pOp = current.pOpacity;

        const tx = -mx * 12 + breath1;
        const ty = -my * 8 + breath2;

        orbPrimaryRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        orbPrimaryRef.current.style.left = `${current.pPos[0]}%`;
        orbPrimaryRef.current.style.top = `${current.pPos[1]}%`;
        orbPrimaryRef.current.style.background = `radial-gradient(ellipse at center, rgba(${pr},${pg},${pb},${pOp}) 0%, rgba(${pr},${pg},${pb},${pOp * 0.4}) 45%, transparent 75%)`;
      }

      if (orbSecondaryRef.current) {
        const sr = Math.round(current.sColor[0]);
        const sg = Math.round(current.sColor[1]);
        const sb = Math.round(current.sColor[2]);
        const sOp = current.sOpacity;

        const tx = mx * 8 - breath2;
        const ty = my * 6 - breath1;

        orbSecondaryRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        orbSecondaryRef.current.style.left = `${current.sPos[0]}%`;
        orbSecondaryRef.current.style.top = `${current.sPos[1]}%`;
        orbSecondaryRef.current.style.background = `radial-gradient(ellipse at center, rgba(${sr},${sg},${sb},${sOp}) 0%, rgba(${sr},${sg},${sb},${sOp * 0.3}) 50%, transparent 80%)`;
      }

      if (orbAmbientRef.current) {
        const pr = Math.round(current.pColor[0]);
        const pg = Math.round(current.pColor[1]);
        const pb = Math.round(current.pColor[2]);
        orbAmbientRef.current.style.background = `radial-gradient(ellipse at 50% 100%, rgba(${pr},${pg},${pb},0.06) 0%, transparent 60%)`;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDesktop, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        opacity: isPortfolioActive ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ── LAYER 1: Deep Perimeter Radial Vignette ───────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(0, 0, 0, 0.55) 75%, rgba(0, 0, 0, 0.92) 100%)',
        }}
      />

      {/* ── LAYER 2: Micro-Dither Film Grain Texture ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── LAYER 3: Volumetric Ambient Radiance Fields ──────── */}
      {/* Primary Atmospheric Orb */}
      <div
        ref={orbPrimaryRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[1200px] h-[55vw] max-h-[900px] rounded-full blur-[140px] will-change-transform"
        style={{
          transition: 'opacity 1.2s ease-out',
        }}
      />

      {/* Secondary Atmospheric Orb */}
      <div
        ref={orbSecondaryRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[1000px] h-[50vw] max-h-[800px] rounded-full blur-[160px] will-change-transform"
        style={{
          transition: 'opacity 1.2s ease-out',
        }}
      />

      {/* Horizon Ambient Wash */}
      <div
        ref={orbAmbientRef}
        className="absolute bottom-0 inset-x-0 h-[45vh] pointer-events-none blur-[100px]"
      />
    </div>
  );
}
