'use client';

import React from 'react';
import { SkillsOrbital } from './SkillsOrbital';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-20 py-12 sm:py-16 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Skills & Technical Matrix"
    >
      {/* Section Header */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Skills &amp; Technical Matrix
        </h2>
      </div>

      {/* Orbital Network & Matrix */}
      <SkillsOrbital />
    </section>
  );
}
