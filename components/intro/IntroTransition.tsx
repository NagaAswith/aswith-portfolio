'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroStore } from '@/store/useIntroStore';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function IntroTransition() {
  const introState = useIntroStore((state) => state.introState);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Active from click through reveal
  const isActive =
    introState === 'MESSAGE_CLICKED' ||
    introState === 'TRANSITIONING' ||
    introState === 'PORTFOLIO_REVEAL';

  // During PORTFOLIO_REVEAL, fade the overlay itself out so 3D canvas shows
  const overlayOpacity =
    introState === 'PORTFOLIO_REVEAL' ? 0 : introState === 'MESSAGE_CLICKED' ? 0 : 1;

  if (reducedMotion) {
    // Minimal: just a quick fade-to-black and back
    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: introState === 'TRANSITIONING' ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {/* Radial depth portal bloom — expands from center outward */}
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{
              scale: [0.1, 1.0, 2.5],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.35, 1],
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Horizontal lens flare sweep */}
          <motion.div
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: '110%', opacity: [0, 0.45, 0] }}
            transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.15 }}
            className="absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(200,200,255,0.18), transparent)',
              filter: 'blur(20px)',
              transform: 'translateY(-50%) rotate(-8deg)',
            }}
          />

          {/* Deep vignette that holds the darkness around the portal center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: overlayOpacity }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Full-black reveal layer — rises during TRANSITIONING, falls during PORTFOLIO_REVEAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                introState === 'TRANSITIONING'
                  ? 1
                  : 0,
            }}
            transition={{
              duration: introState === 'TRANSITIONING' ? 0.5 : 0.9,
              ease: introState === 'TRANSITIONING' ? 'easeIn' : 'easeOut',
            }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
