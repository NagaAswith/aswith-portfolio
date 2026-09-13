'use client';

import React from 'react';
import { SkillsOrbital } from './SkillsOrbital';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Skills & Expertise Network"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-12 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block">
          02 / TECHNICAL ARCHITECTURE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Skills & Technical Matrix
        </h2>
      </div>

      {/* Orbital Visualization */}
      <SkillsOrbital />
    </section>
  );
}
