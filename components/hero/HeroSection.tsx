'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ProfilePortrait } from './ProfilePortrait';
import { MovingGradientButton } from '@/components/ui/MovingGradientButton';
import { SelfIntroVideo } from './SelfIntroVideo';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  isActive: boolean;
}

export function HeroSection({ isActive }: HeroSectionProps) {
  const [revealed, setRevealed] = useState(false);
  const [selfIntroOpen, setSelfIntroOpen] = useState(false);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const personal = usePortfolioContent((state) => state.personalInfo);

  useEffect(() => {
    if (!isActive) return;
    const id = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(id);
  }, [isActive]);

  const handleAboutMe = useCallback(() => {
    setSelfIntroOpen(true);
  }, []);

  const handleCloseSelfIntro = useCallback(() => {
    setSelfIntroOpen(false);
  }, []);

  const handleExploreWork = useCallback(() => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!isActive) return null;

  return (
    <>
      <section
        className="relative z-20 min-h-[100dvh] w-full flex items-center justify-center px-4 min-[380px]:px-6 sm:px-12 py-20 sm:py-24 lg:py-32 max-w-7xl mx-auto overflow-hidden"
        aria-label={`Hero — Portfolio of ${personal.fullName}`}
      >
        {/* Asymmetric Grid Composition */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* LEFT: Profile Portrait — cinematic reveal with parallax depth (Col 1-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <ProfilePortrait isVisible={revealed} delay={0.0} />
          </div>

          {/* RIGHT: Professional Engineering Intro (Col 6-12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: reducedMotion ? 0.2 : 1.0,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Eyebrow & Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-white/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{personal.greeting}</span>
              </div>
              <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.05] break-words">
                {personal.fullName}
              </h1>
            </div>

            {/* Role Title & Concise Professional Intro */}
            <div className="space-y-4 border-l-2 border-white/20 pl-4 sm:pl-6 py-1">
              <p className="text-base sm:text-lg font-mono text-white/90 tracking-wide">
                {personal.title}
              </p>
              <p className="text-sm sm:text-base font-light leading-relaxed text-white/60 max-w-xl">
                {personal.description}
              </p>
            </div>

            {/* Action Buttons with Originkit Moving Gradient Button */}
            <div className="flex flex-wrap gap-4 pt-4">
              <MovingGradientButton
                variant="primary"
                onClick={handleAboutMe}
                ariaLabel="About Me — watch self-introduction video"
              >
                <span>About Me</span>
                <ArrowRight className="w-4 h-4" />
              </MovingGradientButton>

              <MovingGradientButton
                variant="outline"
                onClick={handleExploreWork}
                ariaLabel="Explore My Work — scroll to selected projects"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-white/40" />
              </MovingGradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Self Intro Video Overlay */}
      <SelfIntroVideo isOpen={selfIntroOpen} onClose={handleCloseSelfIntro} />
    </>
  );
}
