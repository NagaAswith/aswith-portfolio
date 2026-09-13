'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceStore } from '@/store/usePerformanceStore';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

/**
 * SectionTransition — Wraps major portfolio sections to deliver a smooth cinematic
 * 3D entrance transition as the user scrolls into each section.
 * Uses subtle depth elevation, scale, translateY, and progressive opacity reveal.
 */
export function SectionTransition({
  children,
  className = '',
  id,
  delay = 0,
}: SectionTransitionProps) {
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  if (reducedMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative w-full ${className}`}
      style={{ perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
}
