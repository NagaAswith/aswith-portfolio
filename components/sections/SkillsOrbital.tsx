'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, SkillNode } from '@/data/portfolioData';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function SkillsOrbital() {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Slow orbital rotation
  useEffect(() => {
    if (reducedMotion || activeSkill !== null) return;
    const interval = setInterval(() => {
      setAngleOffset((prev) => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [activeSkill, reducedMotion]);

  const skills = portfolioData.skills;
  const radius = 160; // Orbit radius in px

  return (
    <div className="relative w-full max-w-2xl aspect-square mx-auto flex items-center justify-center my-8">
      {/* Outer Orbit Ring Indicator */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-white/10 pointer-events-none animate-spin-slow" />

      {/* Central Core Hub */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="z-10 w-32 h-32 rounded-full bg-zinc-950/90 border border-white/30 backdrop-blur-xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_50px_rgba(255,255,255,0.1)] cursor-pointer"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          CORE HUB
        </span>
        <span className="text-base font-light tracking-tight text-white mt-0.5">
          MY SKILLS
        </span>
        <span className="text-[10px] font-mono text-emerald-400 mt-1">
          {skills.length} DOMAINS
        </span>
      </motion.div>

      {/* Orbiting Skill Nodes */}
      {skills.map((skill, index) => {
        const count = skills.length;
        const baseAngle = (index / count) * 360;
        const currentAngle = ((baseAngle + angleOffset) * Math.PI) / 180;

        const x = Math.cos(currentAngle) * radius;
        const y = Math.sin(currentAngle) * radius;

        const isHovered = activeSkill?.id === skill.id;
        const isConnected = activeSkill?.connectedIds.includes(skill.id);

        return (
          <motion.div
            key={skill.id}
            style={{
              x,
              y,
              position: 'absolute',
            }}
            animate={{
              scale: isHovered ? 1.25 : isConnected ? 1.1 : 1,
              zIndex: isHovered ? 30 : 20,
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
            className={[
              'px-3.5 py-2 rounded-xl text-xs font-mono backdrop-blur-md cursor-pointer border transition-all duration-300 shadow-xl',
              isHovered
                ? 'bg-white text-black font-medium border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                : isConnected
                ? 'bg-white/20 text-white border-white/40'
                : 'bg-zinc-950/80 text-white/70 border-white/15 hover:border-white/40',
            ].join(' ')}
          >
            <div className="flex items-center gap-2">
              <span>{skill.name}</span>
              {isHovered && (
                <span className="px-1.5 py-0.5 text-[9px] rounded bg-black text-white font-mono">
                  {skill.proficiency}%
                </span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Skill Detail Card Overlay on Hover */}
      {activeSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-12 inset-x-0 mx-auto max-w-sm p-4 rounded-xl bg-zinc-950/95 border border-white/20 backdrop-blur-2xl text-center shadow-2xl z-40"
        >
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2 mb-2">
            <span className="text-white/40 uppercase tracking-widest">{activeSkill.category}</span>
            <span className="text-emerald-400 font-bold">{activeSkill.proficiency}% Proficiency</span>
          </div>
          <p className="text-xs text-white/80 font-light">
            Integrated with {activeSkill.connectedIds.length} complementary system components.
          </p>
        </motion.div>
      )}
    </div>
  );
}
