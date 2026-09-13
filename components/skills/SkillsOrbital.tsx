'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillNode } from '@/data/skills';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { Sparkles, Check } from 'lucide-react';

export function SkillsOrbital() {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [angleOffset, setAngleOffset] = useState(0);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const skills = usePortfolioContent((state) => state.skills);

  // Smooth orbital rotation
  useEffect(() => {
    if (reducedMotion || activeSkill !== null) return;
    const interval = setInterval(() => {
      setAngleOffset((prev) => (prev + 0.2) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [activeSkill, reducedMotion]);

  const categories = useMemo(() => {
    const defaultCats = [
      'Programming & Logic',
      'AI & Automation',
      'Embedded & IoT',
      'Web & Frontend',
      'Tools & Workflows',
    ];
    const presentCats = Array.from(new Set(skills.map((s) => s.category)));
    const merged = Array.from(new Set([...defaultCats, ...presentCats]));
    return ['ALL', ...merged];
  }, [skills]);

  return (
    <div className="w-full space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={[
                'px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer',
                isSelected
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10 hover:border-white/20',
              ].join(' ')}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Central Matrix Orbital Visualization */}
      <div className="relative aspect-square max-w-[500px] mx-auto w-full flex items-center justify-center py-2">
        {/* Orbital Concentric Rings */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/10 pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/15 pointer-events-none" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-cyan-500/20 pointer-events-none" />

        {/* Central Hub */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="z-10 w-36 h-36 rounded-full bg-zinc-950/90 border border-amber-500/30 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_50px_rgba(245,158,11,0.15)] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400 mb-1 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            TECHNICAL MATRIX
          </span>
          <span className="text-base font-light tracking-tight text-white font-mono">
            SKILLS
          </span>
          <span className="text-[10px] font-mono text-amber-400 font-semibold mt-0.5">
            {skills.length} VERIFIED
          </span>
        </motion.div>

        {/* Orbiting Skill Nodes — Percentage hidden until hover/interaction */}
        {skills.map((skill, index) => {
          const count = skills.length;
          const baseAngle = (index / count) * 360;
          const currentAngle = ((baseAngle + angleOffset) * Math.PI) / 180;

          // Dual radius distribution
          const r = index % 2 === 0 ? 200 : 135;
          const x = Math.cos(currentAngle) * r;
          const y = Math.sin(currentAngle) * r;

          const isHovered = activeSkill?.id === skill.id;
          const isConnected =
            activeSkill &&
            (activeSkill.connectedIds?.includes(skill.id) ||
              skill.connectedIds?.includes(activeSkill.id));

          const isCategoryMatch =
            selectedCategory === 'ALL' || skill.category === selectedCategory;

          const isDimmed = activeSkill ? !isHovered && !isConnected : !isCategoryMatch;

          return (
            <motion.div
              key={skill.id}
              style={{ x, y, position: 'absolute' }}
              animate={{
                scale: isHovered ? 1.2 : isConnected ? 1.05 : isCategoryMatch ? 1 : 0.75,
                opacity: isDimmed ? 0.2 : 1,
                zIndex: isHovered ? 40 : isConnected ? 30 : 20,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              className={[
                'px-3.5 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md cursor-pointer border transition-all duration-300 shadow-xl whitespace-nowrap',
                isHovered
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                  : isConnected
                  ? 'bg-zinc-900 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : isCategoryMatch
                  ? 'bg-zinc-950/85 text-white/90 border-white/20 hover:border-white/50'
                  : 'bg-zinc-950/40 text-white/30 border-white/5',
              ].join(' ')}
            >
              <div className="flex items-center gap-1.5">
                <span>{skill.name}</span>
                {/* Reveal percentage ONLY when hovered or connected */}
                <AnimatePresence>
                  {(isHovered || isConnected) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className={`font-bold ml-1 ${isHovered ? 'text-black' : 'text-amber-400'}`}
                    >
                      — {skill.proficiency}%
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hover Callout — Reveals percentage & category on pointer hover */}
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 text-xs font-mono flex items-center justify-between text-white shadow-[0_0_25px_rgba(245,158,11,0.15)]"
            >
              <span className="font-bold text-amber-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" /> {activeSkill.name} — {activeSkill.proficiency}%
              </span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest">
                {activeSkill.category}
              </span>
            </motion.div>
          ) : (
            <div className="text-center text-xs font-mono text-white/30 py-2">
              Hover any matrix node to inspect proficiency metrics &amp; connections
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
