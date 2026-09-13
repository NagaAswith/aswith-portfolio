'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMouseParallax } from './useMouseParallax';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { personal } from '@/data/personal';

interface ProfilePortraitProps {
  isVisible: boolean;
  delay?: number;
}

/**
 * ProfilePortrait — displays the actual profile image.
 *
 * Uses the real image at /media/profile/profile.jpeg.
 * Integrated as an editorial element — tall format, minimal frame,
 * aligned with the open text composition on the right.
 */
export function ProfilePortrait({ isVisible, delay = 0.0 }: ProfilePortraitProps) {
  const mousePos = useMouseParallax();
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Pointer parallax — portrait moves slightly less than card = depth layering
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const update = () => {
      if (frameRef.current) {
        const { x, y } = mousePos.current;
        const tx = x * 5;
        const ty = y * 3.5;
        frameRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -28, scale: 0.97 }}
      animate={
        isVisible
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -28, scale: 0.97 }
      }
      transition={{
        duration: reducedMotion ? 0.2 : 1.0,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="relative flex items-start justify-center flex-shrink-0"
    >
      {/* Parallax wrapper */}
      <div
        ref={frameRef}
        style={{ willChange: 'transform', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Portrait frame — tall editorial format */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 'clamp(200px, 24vw, 320px)',
            aspectRatio: '3/4',
            // Thin inner highlight suggests presence in 3D space
            boxShadow: [
              '0 2px 0 0 rgba(255,255,255,0.05) inset',
              '0 0 0 1px rgba(255,255,255,0.06)',
              '0 40px 100px rgba(0,0,0,0.8)',
              '0 12px 40px rgba(0,0,0,0.6)',
            ].join(', '),
          }}
        >
          <Image
            src="/media/profile/profile.jpeg"
            alt={`${personal.fullName} — ${personal.roles[0]}`}
            fill
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 26vw, 320px"
            className="object-cover object-top"
            quality={95}
          />

          {/* Inner vignette — blends portrait edges into scene */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 65%, rgba(0,0,0,0.45) 100%)',
                'linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.1) 100%)',
              ].join(', '),
            }}
          />

          {/* Top highlight — subtle glass depth */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
