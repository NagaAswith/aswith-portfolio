'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceStore } from '@/store/usePerformanceStore';

interface SpatialCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  delay?: number;
}

/**
 * SpatialCard — Physical layer card system with mouse tilt depth, soft shadow elevation,
 * controlled perspective, and progressive scroll reveal.
 */
export function SpatialCard({
  children,
  className = '',
  depth = 'md',
  interactive = true,
  onClick,
  delay = 0,
}: SpatialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const maxDegree = depth === 'lg' ? 6 : depth === 'md' ? 4 : 2;
    const rX = ((mouseY / height) - 0.5) * -maxDegree;
    const rY = ((mouseX / width) - 0.5) * maxDegree;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const depthShadows = {
    sm: 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] border-white/10',
    md: 'shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] border-white/15',
    lg: 'shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] border-white/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.8,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1000 }}
      className="w-full h-full flex flex-col"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={[
          'group relative rounded-xl bg-zinc-950/70 backdrop-blur-xl border p-6 sm:p-8 h-full flex flex-col',
          'transition-all duration-400 ease-out',
          interactive ? 'hover:bg-zinc-900/80 hover:border-white/30 cursor-pointer' : '',
          depthShadows[depth],
          className,
        ].join(' ')}
      >
        {/* Subtle Ambient Light Reflection */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 75%)',
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
