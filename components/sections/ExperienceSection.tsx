'use client';

import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SpatialCard } from '@/components/ui/SpatialCard';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
      aria-label="Experience & Milestones"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-16 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block">
          03 / HISTORY & EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Experience & Education
        </h2>
      </div>

      {/* Spatial Timeline Grid */}
      <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
        {portfolioData.experience.map((item, idx) => {
          const Icon = item.type === 'Education' ? GraduationCap : Briefcase;

          return (
            <div key={item.id} className="relative">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <SpatialCard depth="md" delay={idx * 0.15}>
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white/60">
                      <Icon className="w-4 h-4 text-white/40" />
                      <span className="uppercase tracking-wider">{item.type}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono">
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-white/40 mt-1">{item.organization}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.keyAchivements && item.keyAchivements.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-white/10">
                      {item.keyAchivements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs text-white/70 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </SpatialCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
