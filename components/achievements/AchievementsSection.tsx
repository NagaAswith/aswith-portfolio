'use client';

import React from 'react';
import { SpatialCard } from '@/components/ui/SpatialCard';
import { usePortfolioContent } from '@/store/usePortfolioContent';

export function AchievementsSection() {
  const achievements = usePortfolioContent((state) => state.achievements);

  return (
    <section
      id="achievements"
      className="relative z-20 py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto"
      aria-label="Honors & Achievements"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Achievements &amp; Recognition
        </h2>
      </div>

      {/* Achievements Grid — 100% Equal Height & Uniform Card Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {achievements.map((item, idx) => (
          <SpatialCard
            key={item.id}
            depth="md"
            delay={idx * 0.08}
            interactive={true}
            className="h-full flex flex-col justify-between"
          >
            <div className="flex flex-col justify-between h-full space-y-4 flex-1">
              {/* Uniform Header Block */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 min-h-[48px] shrink-0 gap-2">
                <span className="text-lg sm:text-2xl font-extralight font-mono text-emerald-400 tracking-tight shrink-0">
                  {item.metric}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/90 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-500/30 shrink-0 text-right">
                  {item.category}
                </span>
              </div>

              {/* Uniform Body Block */}
              <div className="flex-1 flex flex-col justify-between pt-1">
                <h3 className="text-base sm:text-lg font-light text-white leading-snug min-h-[52px] flex items-center">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-white/60 leading-relaxed mt-2.5 flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          </SpatialCard>
        ))}
      </div>
    </section>
  );
}
