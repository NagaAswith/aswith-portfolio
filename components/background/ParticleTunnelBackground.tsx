'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

const PARTICLE_TUNNEL_ASSET = '/media/background/Particle_tunnel_portfolio_video___20261024144915.mp4';
const BASE_RATE = 1.0;
const MAX_RATE = 2.3;

/**
 * ParticleTunnelBackground
 *
 * Implements Master Directive Stage Three:
 * - Continuous playback at normal speed when page is stationary (never freezes).
 * - Smooth scroll-responsive speed increase based on scroll velocity.
 * - Smooth deceleration back to normal continuous playback when scrolling stops.
 * - Hardware-accelerated continuous playback without frame scrubbing or seeking.
 * - Bounded dynamic energy scaling for a cinematic warp-tunnel effect.
 * - Coordinated icy blue & navy visual atmosphere preserving full text contrast.
 * - Graceful degradation and prefers-reduced-motion support.
 */
export function ParticleTunnelBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const introState = useIntroStore((state) => state.introState);
  const isPortfolioVisible =
    introState === 'PORTFOLIO_REVEAL' || introState === 'PORTFOLIO_ACTIVE';

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasDecodeError, setHasDecodeError] = useState(false);

  // Motion energy refs for zero-overhead animation loop
  const scrollEnergyRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);
  const currentRateRef = useRef<number>(BASE_RATE);
  const animFrameRef = useRef<number | null>(null);

  const resolvedCloudUrl = resolveSupabaseMediaUrl(PARTICLE_TUNNEL_ASSET);

  // 1. Loaded metadata: start continuous playback immediately
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = BASE_RATE;
      video
        .play()
        .then(() => {
          setIsVideoReady(true);
        })
        .catch(() => {
          // Autoplay fallback (muted video)
          video.muted = true;
          video.play().then(() => setIsVideoReady(true)).catch(() => {});
        });
    }
  }, []);

  const handleVideoError = useCallback(() => {
    console.warn('Particle tunnel background video error. Falling back to ambient gradient.');
    setHasDecodeError(true);
  }, []);

  // 2. Track scroll velocity and convert to responsive visual energy
  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion || hasDecodeError) return;

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0;
    lastScrollTimeRef.current = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const now = performance.now();
      const dt = Math.max(16, now - lastScrollTimeRef.current);
      const dy = Math.abs(currentScrollY - lastScrollYRef.current);

      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = now;

      // Calculate instantaneous scroll velocity (px / ms)
      const velocity = dy / dt;
      // Add bounded energy spike (smoothly capped)
      const energyDelta = Math.min(1.0, velocity * 0.45);
      scrollEnergyRef.current = Math.min(1.0, scrollEnergyRef.current + energyDelta);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, hasDecodeError]);

  // 3. requestAnimationFrame loop: continuous smooth playback rate lerp + subtle energy scale
  useEffect(() => {
    if (typeof window === 'undefined' || hasDecodeError) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const video = videoRef.current;
      if (video && !reducedMotion) {
        // Smooth exponential energy decay
        scrollEnergyRef.current *= 0.92;
        if (scrollEnergyRef.current < 0.005) {
          scrollEnergyRef.current = 0;
        }

        // Target playback rate: BASE_RATE (1.0x) + velocity boost (up to 2.3x)
        const targetRate = BASE_RATE + scrollEnergyRef.current * (MAX_RATE - BASE_RATE);
        currentRateRef.current += (targetRate - currentRateRef.current) * 0.12;

        if (Math.abs(video.playbackRate - currentRateRef.current) > 0.02) {
          try {
            video.playbackRate = currentRateRef.current;
          } catch {
            // Ignore browser playback rate set exceptions
          }
        }

        // Apply subtle bounded optical energy scale (max 4% zoom on high speed scroll)
        if (containerRef.current) {
          const scale = 1 + scrollEnergyRef.current * 0.035;
          containerRef.current.style.transform = `scale(${scale.toFixed(4)})`;
        }

        // Keep video playing continuously when tab is visible
        if (video.paused && !document.hidden && isPortfolioVisible) {
          video.play().catch(() => {});
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion, hasDecodeError, isPortfolioVisible]);

  // 4. Page visibility listener: pause when tab hidden to save GPU, resume when focused
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
      } else if (isPortfolioVisible) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPortfolioVisible]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        opacity: isPortfolioVisible ? 1 : 0,
        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dynamic Energy Scaled Video Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-150 ease-out"
        style={{ transformOrigin: 'center center' }}
      >
        {!hasDecodeError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: isVideoReady ? 0.45 : 0,
              filter: 'contrast(1.12) brightness(1.06) saturate(1.22)',
              transition: 'opacity 1.2s ease-out',
            }}
          >
            <source src={resolvedCloudUrl} type="video/mp4" />
            <source src={PARTICLE_TUNNEL_ASSET} type="video/mp4" />
          </video>
        )}
      </div>

      {/* ── WHITE & BLUE VISUAL SYSTEM OVERLAYS ── */}

      {/* Layer 1: Electric & Icy Blue Volumetric Atmospheric Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 18%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.06) 40%, transparent 75%)',
        }}
      />

      {/* Layer 2: Deep Navy & Cobalt Optical Density Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(3, 7, 18, 0.38) 0%, rgba(2, 6, 23, 0.68) 60%, rgba(1, 4, 14, 0.88) 100%)',
        }}
      />

      {/* Layer 3: Soft Blue Horizon Lighting */}
      <div
        className="absolute bottom-0 inset-x-0 h-[35vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(14, 165, 233, 0.08) 0%, rgba(3, 7, 18, 0.45) 50%, transparent 100%)',
        }}
      />

      {/* Layer 4: Micro-mesh text-contrast diffusion layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
