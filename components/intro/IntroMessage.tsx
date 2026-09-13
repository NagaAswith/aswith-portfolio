'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroStore } from '@/store/useIntroStore';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function IntroMessage() {
  const introState = useIntroStore((state) => state.introState);
  const triggerMessageClick = useIntroStore((state) => state.triggerMessageClick);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  const isVisible = introState === 'MESSAGE_READY';
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Move keyboard focus to the interactive message when it appears
  useEffect(() => {
    if (isVisible && buttonRef.current) {
      // Small delay so animation settles first
      const id = setTimeout(() => {
        buttonRef.current?.focus({ preventScroll: true });
      }, 600);
      return () => clearTimeout(id);
    }
  }, [isVisible]);

  const handleActivate = () => {
    triggerMessageClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate();
    }
  };

  const enterAnimation = reducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  const initialAnimation = reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24, scale: 0.97 };

  const transition = reducedMotion
    ? { duration: 0.2 }
    : { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={initialAnimation}
          animate={enterAnimation}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
          transition={transition}
          className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none pb-20 sm:pb-24 px-6"
          aria-live="polite"
        >
          {/* The interactive message element */}
          <div className="pointer-events-auto w-full max-w-sm">
            <button
              ref={buttonRef}
              onClick={handleActivate}
              onKeyDown={handleKeyDown}
              aria-label="Enter the portfolio — press Enter or click to continue"
              className={[
                // Layout
                'group relative w-full flex flex-col items-center gap-3 py-6 px-8',
                // Visual
                'rounded-2xl',
                'bg-white/5 backdrop-blur-xl',
                'border border-white/12',
                // Shadow glow
                'shadow-[0_0_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]',
                // Hover state
                'hover:bg-white/8 hover:border-white/18',
                'hover:shadow-[0_0_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)]',
                // Transitions
                'transition-all duration-500 ease-out',
                // Cursor / focus
                'cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
              ].join(' ')}
            >
              {/* Ambient glow that pulses gently */}
              {!reducedMotion && (
                <span
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.12) 0%, transparent 70%)',
                  }}
                />
              )}

              {/* Floating dot indicator */}
              <span className="flex items-center gap-2 text-white/40 text-[11px] font-mono uppercase tracking-[0.2em]">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-white/60 ${reducedMotion ? '' : 'animate-pulse'}`}
                />
                continue
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-white/60 ${reducedMotion ? '' : 'animate-pulse'}`}
                  style={{ animationDelay: '0.5s' }}
                />
              </span>

              {/* Main message text */}
              <span className="text-white text-xl sm:text-2xl font-light tracking-tight leading-snug text-center">
                Enter the world
              </span>

              {/* Subtle arrow */}
              <span
                className={`text-white/30 transition-transform duration-500 ${reducedMotion ? '' : 'group-hover:translate-y-1'}`}
              >
                ↓
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
