'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export function LoadingScreen({
  isLoading,
  progress = 100,
  message = 'PREPARING EXPERIENCE',
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black px-8 py-12 text-white pointer-events-none select-none"
        >
          {/* Header identity */}
          <div className="w-full max-w-7xl flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              PORTFOLIO ARCHITECTURE v1.0
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 animate-pulse">
              INITIALIZING
            </span>
          </div>

          {/* Central loading content */}
          <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full text-center">
            {/* Minimal glowing spinner / symbol */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-t-cyan-400 border-r-transparent border-b-cyan-500/20 border-l-transparent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-t-purple-400 border-r-transparent border-b-purple-500/20 border-l-transparent"
              />
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </div>

            {/* Label */}
            <div className="space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-300">
                {message}
              </h2>
              <p className="text-xs text-zinc-500 font-mono">
                {Math.round(progress)}%
              </p>
            </div>

            {/* Minimalist progress bar */}
            <div className="w-48 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              />
            </div>
          </div>

          {/* Footer copyright */}
          <div className="w-full max-w-7xl flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Interactive 3D Experience • Designed for WebGL
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
