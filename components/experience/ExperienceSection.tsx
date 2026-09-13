'use client';

import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SpatialCard } from '@/components/ui/SpatialCard';
import { usePortfolioContent } from '@/store/usePortfolioContent';

export function ExperienceSection() {
  const education = usePortfolioContent((state) => state.education);
  const experience = usePortfolioContent((state) => state.experience);

  return (
    <section
      id="experience"
      className="relative z-20 py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto"
      aria-label="Experience & Education"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Experience &amp; Education
        </h2>
      </div>

      {/* Spatial Vertical Timeline */}
      <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
        {/* 1. Education Milestones */}
        {education.map((edu, eduIdx) => (
          <div key={edu.id} className="relative">
            <div className="absolute -left-[31px] sm:-left-[55px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <SpatialCard depth="lg" delay={0.1 + eduIdx * 0.1}>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span className="uppercase tracking-wider">{edu.institution || 'ACADEMIC INSTITUTION'}</span>
                  </div>
                  {edu.cgpa && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-mono text-white/40 mt-1">
                    Expected Graduation: {edu.expectedGraduation || edu.period}
                  </p>
                </div>

                {edu.field && (
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {edu.field}
                  </p>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </SpatialCard>
          </div>
        ))}

        {/* 2. Real Experience Items */}
        {experience.map((exp, idx) => {
          const isJobSim = exp.type === 'JOB SIMULATION';
          const Icon = isJobSim ? ShieldCheck : Briefcase;

          return (
            <div key={exp.id} className="relative">
              <div className="absolute -left-[31px] sm:-left-[55px] top-6 w-4 h-4 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <SpatialCard depth="md" delay={0.2 + idx * 0.15}>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white/60">
                      <Icon className="w-4 h-4 text-white/40" />
                      <span
                        className={
                          isJobSim
                            ? 'px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold'
                            : 'uppercase tracking-wider'
                        }
                      >
                        {exp.type}
                      </span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono">
                      {exp.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-mono text-white/40 mt-1">{exp.organization}</p>
                  </div>

                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-white/10">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs text-white/70 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
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
