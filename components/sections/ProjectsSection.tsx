'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import { portfolioData, ProjectItem } from '@/data/portfolioData';
import { SpatialCard } from '@/components/ui/SpatialCard';
import { ProjectModal } from './ProjectModal';

const categories = ['ALL', 'SOFTWARE', 'AI', 'IOT', 'WEB', 'OTHER'] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return portfolioData.projects;
    return portfolioData.projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="work"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
      aria-label="Projects & Case Studies"
    >
      {/* Section Header */}
      <div className="space-y-4 mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block">
            01 / PORTFOLIO WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white mt-2">
            Selected Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-white/30 mr-2 hidden sm:inline-block" />
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300',
                  isActive
                    ? 'bg-white text-black font-medium shadow-lg'
                    : 'bg-white/5 text-white/50 hover:text-white border border-white/10 hover:border-white/20',
                ].join(' ')}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            // Asymmetric layout logic: featured item takes 12 cols, others take 6 cols
            const colSpan = idx === 0 ? 'lg:col-span-12' : 'lg:col-span-6';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={colSpan}
              >
                <SpatialCard
                  depth={idx === 0 ? 'lg' : 'md'}
                  onClick={() => setSelectedProject(project)}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Number & Category */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                      <span className="text-white/30 tracking-widest">#{project.number}</span>
                      <span className="px-2.5 py-0.5 rounded-full uppercase bg-white/5 text-white/70 border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-light text-white leading-tight group-hover:text-white/90">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Footer & Tech Stack */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-white/40">
                          #{tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-white/30 uppercase tracking-widest">{project.year}</span>
                  </div>
                </SpatialCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
