'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Layers } from 'lucide-react';
import { ProjectItem } from '@/data/projects';
import { BoxCarousel } from '@/components/ui/BoxCarousel';
import { ProjectModal } from './ProjectModal';
import { usePortfolioContent } from '@/store/usePortfolioContent';

const categories = ['ALL', 'SOFTWARE', 'AI', 'WEB', 'IOT', 'EMBEDDED'] as const;
type CategoryType = (typeof categories)[number];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const projects = usePortfolioContent((state) => state.projects);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter(
      (p) =>
        p.category === activeCategory ||
        p.categories.includes(activeCategory as Exclude<CategoryType, 'ALL'>)
    );
  }, [activeCategory, projects]);

  return (
    <section
      id="work"
      className="relative z-20 py-20 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-visible"
      aria-label="Selected Engineering Projects Showcase"
    >
      {/* Environmental Depth Background — Dark Navy & Subtle Cyan Illumination */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20 blur-[130px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(56,189,248,0.25) 0%, rgba(30,58,138,0.15) 50%, transparent 80%)',
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[400px] opacity-15 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(14,165,233,0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Section Header — Protected Stacking Context above Coverflow */}
      <div className="relative z-30 space-y-4 mb-10 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
            Engineering Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-cyan-400/50 mr-1 hidden sm:inline-block" />
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-400/50 font-medium shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20',
                ].join(' ')}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Coverflow Bounded Viewport Container */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 isolate my-4 overflow-visible"
      >
        <BoxCarousel
          projects={filteredProjects}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-white/10 rounded-2xl bg-zinc-950/50 backdrop-blur-md">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            No engineering projects found in this filter category
          </span>
        </div>
      )}

      {/* Cinematic Detail View Expansion */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

