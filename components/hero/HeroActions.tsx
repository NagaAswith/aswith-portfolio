'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { personal } from '@/data/personal';
import { usePerformanceStore } from '@/store/usePerformanceStore';

interface HeroActionsProps {
  isVisible: boolean;
  delay?: number;
  onAboutMe: () => void;
  onExploreWork: () => void;
}

/**
 * HeroActions — two primary portfolio CTAs.
 *
 * "About Me"       → opens self-intro video overlay
 * "Explore My Work" → triggers portfolio section navigation
 *
 * Keyboard: Enter / Space on focused button activates it.
 * Styling: editorial, minimal, premium — NOT generic button shapes.
 */
export function HeroActions({
  isVisible,
  delay = 1.2,
  onAboutMe,
  onExploreWork,
}: HeroActionsProps) {
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  const handleAboutMeKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAboutMe();
    }
  }, [onAboutMe]);

  const handleExploreKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onExploreWork();
    }
  }, [onExploreWork]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.6,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="flex flex-wrap gap-4 pt-4"
    >
      {/*
        PRIMARY — About Me
        Subtle filled treatment: dim white surface, very slight glow on hover.
      */}
      <button
        onClick={onAboutMe}
        onKeyDown={handleAboutMeKey}
        aria-label={`${personal.cta.primary.label} — watch self-introduction video`}
        id="hero-about-me"
        className={[
          'group relative inline-flex items-center gap-2.5',
          'px-6 py-3 rounded-none',  // no rounding — editorial
          'text-sm font-light tracking-[0.12em] uppercase text-white',
          'bg-white/[0.07] border-b border-white/20',
          'hover:bg-white/[0.12] hover:border-white/40',
          'transition-all duration-400 ease-out',
          'cursor-pointer',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'overflow-hidden',
        ].join(' ')}
      >
        {/* Shimmer sweep on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <span>{personal.cta.primary.label}</span>
        <span
          className="text-white/30 transition-transform duration-400 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </button>

      {/*
        SECONDARY — Explore My Work
        Pure text treatment — just a label with a moving arrow.
      */}
      <button
        onClick={onExploreWork}
        onKeyDown={handleExploreKey}
        aria-label={`${personal.cta.secondary.label} — navigate to projects section`}
        id="hero-explore-work"
        className={[
          'group inline-flex items-center gap-2.5',
          'px-0 py-3',
          'text-sm font-light tracking-[0.12em] uppercase',
          'text-white/45 border-b border-transparent',
          'hover:text-white/75 hover:border-white/15',
          'transition-all duration-400 ease-out',
          'cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        ].join(' ')}
      >
        <span>{personal.cta.secondary.label}</span>
        <span
          className="text-white/20 transition-transform duration-400 group-hover:translate-x-1"
          aria-hidden="true"
        >
          ↓
        </span>
      </button>
    </motion.div>
  );
}
