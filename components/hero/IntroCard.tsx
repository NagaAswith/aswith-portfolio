'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personal } from '@/data/personal';
import { HeroActions } from './HeroActions';
import { useMouseParallax } from './useMouseParallax';
import { usePerformanceStore } from '@/store/usePerformanceStore';

interface IntroCardProps {
  isVisible: boolean;
  delay?: number;
  onAboutMe: () => void;
  onExploreWork: () => void;
}

/**
 * IntroCard — Editorial personal introduction panel.
 *
 * Redesigned from a glass-card box to an open, editorial text layout.
 * No visible card border. Text directly on the 3D scene.
 * Typography-driven hierarchy: name large, role smaller, tagline subtle.
 */
export function IntroCard({
  isVisible,
  delay = 0.7,
  onAboutMe,
  onExploreWork,
}: IntroCardProps) {
  const mousePos = useMouseParallax();
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Pointer parallax — card moves slightly more than portrait = depth layering
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const update = () => {
      if (cardRef.current) {
        const { x, y } = mousePos.current;
        const tx = x * 8;
        const ty = y * 5;
        cardRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos, reducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0, x: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 1.0,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariant = (lineDelay: number) => ({
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.7,
        delay: reducedMotion ? 0 : delay + lineDelay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="relative flex-1 min-w-0"
    >
      {/* Parallax wrapper */}
      <div
        ref={cardRef}
        style={{ willChange: 'transform', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Editorial text composition — no card border, no backdrop blur */}
        <div className="relative space-y-8 py-2">

          {/* Name block */}
          <motion.div variants={lineVariant(0.05)} className="space-y-2">
            {/* Role eyebrow */}
            <p
              className="text-white/35 font-mono tracking-[0.22em] uppercase"
              style={{ fontSize: '11px' }}
            >
              {personal.greeting}
            </p>
            {/* Display name — large, editorial weight */}
            <h1
              className="text-white font-extralight leading-none tracking-tight"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              {personal.name}
            </h1>
          </motion.div>

          {/* Thin rule */}
          <motion.div
            variants={lineVariant(0.15)}
            className="h-px"
            style={{
              width: 'clamp(40px, 8vw, 80px)',
              background: 'linear-gradient(to right, rgba(255,255,255,0.25), transparent)',
            }}
          />

          {/* Roles — editorial, medium weight */}
          <motion.div variants={lineVariant(0.25)} className="space-y-0.5">
            {personal.roles.map((role, i) => (
              <p
                key={role}
                className="font-light leading-snug text-white"
                style={{
                  fontSize: 'clamp(14px, 1.8vw, 20px)',
                  // First role is more prominent
                  opacity: i === 0 ? 0.7 : 0.4,
                  letterSpacing: '0.03em',
                }}
              >
                {role}
              </p>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={lineVariant(0.38)}
            className="font-light leading-relaxed text-white/30 max-w-sm"
            style={{
              fontSize: 'clamp(12px, 1.3vw, 15px)',
              whiteSpace: 'pre-line',
            }}
          >
            {personal.tagline}
          </motion.p>

          {/* Actions */}
          <HeroActions
            isVisible={isVisible}
            delay={delay + 0.5}
            onAboutMe={onAboutMe}
            onExploreWork={onExploreWork}
          />
        </div>
      </div>
    </motion.div>
  );
}
