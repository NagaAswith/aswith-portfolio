'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Code2, Globe, Cpu } from 'lucide-react';
import { ProjectItem } from '@/data/projects';
import { SpatialCard } from '@/components/ui/SpatialCard';
import { formatImageUrl } from '@/data/assetManifest';

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, featured = false, onSelect }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const mainImageSrc = formatImageUrl(project.images.main);

  return (
    <SpatialCard
      depth={featured ? 'lg' : 'md'}
      onClick={() => onSelect(project)}
      className="h-full flex flex-col justify-between overflow-hidden"
    >
      <div className="space-y-6">
        {/* Header Row: Number & Category */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
          <span className="text-white/40 tracking-widest font-bold">#{project.number}</span>
          <div className="flex items-center gap-1.5">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-0.5 rounded-full uppercase bg-white/5 text-white/80 border border-white/15 text-[10px] tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Media Showcase / Neutral Placeholder */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900/80 border border-white/10 group-hover:border-white/25 transition-all flex items-center justify-center">
          {!imgError && mainImageSrc ? (
            <Image
              src={mainImageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Clean Neutral Media Placeholder State */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-950">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 mb-2">
                {project.category === 'EMBEDDED' || project.category === 'IOT' ? (
                  <Cpu className="w-6 h-6" />
                ) : project.category === 'WEB' ? (
                  <Globe className="w-6 h-6" />
                ) : (
                  <Code2 className="w-6 h-6" />
                )}
              </div>
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                IMAGE COMING SOON
              </span>
              <span className="text-[10px] font-mono text-white/30 mt-1">
                {project.domain}
              </span>
            </div>
          )}
        </div>

        {/* Title & Domain */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-light text-white leading-tight group-hover:text-white/90">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0 mt-1" />
          </div>
          <p className="text-xs font-mono text-emerald-400/90 tracking-wider">
            {project.domain}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-sm text-white/60 font-light leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Footer & Technologies */}
      <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10 text-[10px]">
              {tech}
            </span>
          ))}
        </div>
        <span className="text-white/40 uppercase tracking-widest">{project.year}</span>
      </div>
    </SpatialCard>
  );
}
