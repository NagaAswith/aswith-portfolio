'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  CASE STUDY #{project.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/10 text-white/80 border border-white/15">
                  {project.category}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              {/* Title & Status */}
              <div>
                <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white leading-tight">
                  {project.title}
                </h2>
                <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                  Year: {project.year} • Status: {project.status}
                </p>
              </div>

              {/* Full Description */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 border-b border-white/10 pb-2">
                  OVERVIEW
                </h3>
                <p className="text-base text-white/70 font-light leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 border-b border-white/10 pb-2">
                    KEY HIGHLIGHTS & METRICS
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 border-b border-white/10 pb-2">
                  TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all"
                  >
                    <Code2 className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-wider font-medium transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
