'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageFlipperProps {
  frontImage: string;
  altText: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function ImageFlipper({
  frontImage,
  altText,
  className = '',
  title = 'Ranga Naga Aswith',
  subtitle = 'Electronics & Communication Engineer',
}: ImageFlipperProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative group w-full cursor-pointer perspective-1000 ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={`${altText} — click to flip portrait`}
    >
      <motion.div
        className="w-full h-full relative duration-700 preserve-3d shadow-2xl rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 backface-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={frontImage}
            alt={altText}
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 380px"
            className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
            quality={95}
          />
          {/* Subtle Depth Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          {/* Flip Hint */}
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
            FLIP ↺
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/20 p-6 flex flex-col justify-between backface-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.15), transparent 70%)',
            }}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
                PROFILE SPECIFICATION
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-light text-white tracking-tight">{title}</h3>
              <p className="text-xs font-mono text-white/50 mt-1">{subtitle}</p>
            </div>

            <div className="space-y-2 text-xs font-mono text-white/70 pt-2 border-t border-white/10">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">DEGREE</span>
                <span className="text-white font-medium">B.Tech ECE</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">CGPA</span>
                <span className="text-emerald-400 font-bold">8.79 / 10</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">PRIMARY</span>
                <span className="text-white">Python • IoT • Web</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>Click to flip back</span>
            <span className="text-white/70">↺</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
