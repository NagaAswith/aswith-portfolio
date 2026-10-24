'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';

const PARTICLE_TUNNEL_ASSET = '/media/background/Particle_tunnel_portfolio_video___20261024144915.mp4';

/**
 * ParticleTunnelBackground
 *
 * Implements Requirement 4:
 * - Scroll-driven video timeline synchronization (scroll down advances video, scroll up reverses it).
 * - Smooth frame updates via requestAnimationFrame and asynchronous seek locking.
 * - Coordinated premium white-and-blue visual system with icy blue, electric blue, soft gradients, and deep navy accents.
 * - Full text readability preserved over moving background via translucent optical diffusion layers.
 * - Respects prefers-reduced-motion and provides graceful degradation on unsupported devices.
 * - Does not block page load or interfere with 3D Digital Twin canvas.
 */
export function ParticleTunnelBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const introState = useIntroStore((state) => state.introState);
  const isPortfolioVisible =
    introState === 'PORTFOLIO_REVEAL' || introState === 'PORTFOLIO_ACTIVE';

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasDecodeError, setHasDecodeError] = useState(false);

  const durationRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // 1. Load video metadata
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current && videoRef.current.duration) {
      durationRef.current = videoRef.current.duration;
      setIsVideoReady(true);
      // Ensure video is paused so it only responds to scroll timeline
      videoRef.current.pause();
    }
  }, []);

  const handleVideoError = useCallback(() => {
    console.warn('Particle tunnel background video unavailable or decode failed. Falling back to dynamic gradient.');
    setHasDecodeError(true);
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
  }, []);

  // 2. Scroll event listener: maps scroll progress to video timeline
  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion || hasDecodeError) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (durationRef.current > 0) {
        targetTimeRef.current = progress * durationRef.current;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, hasDecodeError]);

  // 3. requestAnimationFrame loop: smooth interpolation and frame seeking without collision
  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion || hasDecodeError) return;

    const render = () => {
      const video = videoRef.current;
      if (video && durationRef.current > 0 && !isSeekingRef.current && !video.seeking) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const diff = target - current;

        // Apply a gentle threshold to avoid microscopic seeks that choke GPU/decoder
        if (Math.abs(diff) > 0.035) {
          // Smooth step towards target time
          const nextTime = current + diff * 0.25;
          const clampedTime = Math.min(durationRef.current - 0.01, Math.max(0, nextTime));

          try {
            isSeekingRef.current = true;
            video.currentTime = clampedTime;
            currentTimeRef.current = clampedTime;
          } catch {
            isSeekingRef.current = false;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion, hasDecodeError]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        opacity: isPortfolioVisible ? 1 : 0,
        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Scroll-Driven Video Layer */}
      {!hasDecodeError && (
        <video
          ref={videoRef}
          src={PARTICLE_TUNNEL_ASSET}
          preload="metadata"
          muted
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onSeeked={handleSeeked}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
          style={{
            opacity: isVideoReady ? 0.38 : 0,
            filter: 'contrast(1.1) brightness(1.05) saturate(1.2)',
          }}
        />
      )}

      {/* ── WHITE & BLUE VISUAL SYSTEM OVERLAYS ── */}

      {/* Layer 1: Electric & Icy Blue Volumetric Atmospheric Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)',
        }}
      />

      {/* Layer 2: Deep Navy & Cobalt Optical Density Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(3, 7, 18, 0.45) 0%, rgba(2, 6, 23, 0.75) 60%, rgba(1, 4, 14, 0.94) 100%)',
        }}
      />

      {/* Layer 3: Soft Blue Horizon Lighting */}
      <div
        className="absolute bottom-0 inset-x-0 h-[35vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(14, 165, 233, 0.08) 0%, rgba(3, 7, 18, 0.6) 50%, transparent 100%)',
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
