'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Globe, Cpu, MousePointer } from 'lucide-react';
import { ProjectItem } from '@/data/projects';
import { formatImageUrl } from '@/data/assetManifest';

interface BoxCarouselProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectImageCover({ project, isActive }: { project: ProjectItem; isActive: boolean }) {
  const [imgError, setImgError] = useState(false);
  const mainImageSrc = formatImageUrl(project.images.main);

  const Icon =
    project.category === 'EMBEDDED' || project.category === 'IOT'
      ? Cpu
      : project.category === 'WEB'
      ? Globe
      : Code2;

  return (
    <div className="relative h-[230px] sm:h-[255px] w-full overflow-hidden bg-zinc-950/90 flex items-center justify-center border-b border-white/10 pointer-events-none">
      {!imgError && mainImageSrc ? (
        <Image
          src={mainImageSrc}
          alt={project.title}
          fill
          priority={isActive}
          sizes="(max-width: 768px) 100vw, 600px"
          className={`object-cover object-center transition-all duration-700 pointer-events-none ${
            isActive ? 'scale-105 opacity-100 brightness-105' : 'scale-100 opacity-60 grayscale-[25%]'
          }`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black pointer-events-none">
          <div className="p-3.5 rounded-full bg-white/5 border border-white/15 text-cyan-400/90 mb-3 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Icon className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono text-white/90 uppercase tracking-widest font-semibold">
            {project.title.split('–')[0].trim()}
          </span>
          <span className="text-[10px] font-mono text-cyan-400/70 mt-1">
            {project.domain}
          </span>
        </div>
      )}

      {/* Dark glass gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.2) 65%, transparent 100%)',
        }}
      />

      {/* Category and Number Badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white/90 uppercase shadow-lg">
          {project.category}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-cyan-950/60 backdrop-blur-md text-[10px] font-mono text-cyan-300/80 border border-cyan-500/20 shadow-sm">
          #{project.number}
        </span>
      </div>
    </div>
  );
}

/**
 * Senior-level Pure Mouse-Driven Originkit Coverflow Carousel Component
 * 
 * Features:
 * - 100% Pure Mouse-Driven Coverflow: Arrow navigation completely removed.
 * - High-Performance Stage Pointer Geometry Engine (< 1 frame response):
 *   Tracks pointer X coordinate over Coverflow stage and identifies closest visible project card.
 * - Stage-Level & Card-Level Click Handler:
 *   Clicking ANY visible side or back card updates activeIndex, smoothly moving the clicked card to front/center.
 * - Single-click focuses/selects card to front; Double-click opens project details.
 */
export function BoxCarousel({ projects, onSelectProject }: BoxCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Single vs Double click disambiguation timer
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  // Clamp activeIndex when list updates
  const safeIndex = projects && projects.length > 0 ? Math.min(activeIndex, projects.length - 1) : 0;
  useEffect(() => {
    if (projects && projects.length > 0 && safeIndex !== activeIndex) {
      setActiveIndex(safeIndex);
    }
  }, [projects, activeIndex, safeIndex]);

  // Preload project images in background
  useEffect(() => {
    if (!projects) return;
    projects.forEach((p) => {
      if (p.images.main) {
        const img = new window.Image();
        img.src = p.images.main;
      }
      if (p.images.gallery) {
        p.images.gallery.forEach((g) => {
          const img = new window.Image();
          img.src = g;
        });
      }
    });
  }, [projects]);

  // Keyboard controls
  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Enter' && projects[safeIndex]) {
        onSelectProject(projects[safeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects, safeIndex, onSelectProject]);

  // Zero-Re-render Stage Pointer Geometry Tracking Engine
  const handleStagePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current || !projects || projects.length === 0) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const stageCenterX = rect.left + rect.width / 2;
      const pointerXRel = clientX - stageCenterX;

      // Card horizontal step in 3D Coverflow geometry
      const stepX = 330;
      const len = projects.length;

      let closestIdx: number | null = null;
      let minDistance = Infinity;

      projects.forEach((_, idx) => {
        let offset = idx - safeIndex;
        if (len > 0) {
          if (offset < -Math.floor(len / 2)) offset += len;
          if (offset > Math.floor((len - 1) / 2)) offset -= len;
        }

        if (Math.abs(offset) <= 3) {
          const cardCenterX = offset * stepX;
          const dist = Math.abs(pointerXRel - cardCenterX);

          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      if (closestIdx !== null && closestIdx !== hoveredIndex) {
        setHoveredIndex(closestIdx);
      }

      // Smooth direct DOM update on tiltRef (INNER div) for parallax sheen & micro tilt
      // (ZERO React state re-renders, ZERO interference with Framer Motion outer style.transform)
      if (tiltRef.current) {
        const cardRect = tiltRef.current.getBoundingClientRect();
        const normX = Math.max(0, Math.min(1, (clientX - cardRect.left) / cardRect.width));
        const normY = Math.max(0, Math.min(1, (clientY - cardRect.top) / cardRect.height));
        const rotateXVal = (normY - 0.5) * -8;
        const rotateYVal = (normX - 0.5) * 8;

        tiltRef.current.style.setProperty('--sheen-x', `${normX * 100}%`);
        tiltRef.current.style.setProperty('--sheen-y', `${normY * 100}%`);
        tiltRef.current.style.transform = `rotateX(${rotateXVal}deg) rotateY(${rotateYVal}deg)`;
      }
    });
  }, [projects, safeIndex, hoveredIndex]);

  const handleStagePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tiltRef.current) {
      tiltRef.current.style.setProperty('--sheen-x', '50%');
      tiltRef.current.style.setProperty('--sheen-y', '50%');
      tiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
    setHoveredIndex(null);
  }, []);

  // Stage & Card Click Handler:
  // Single click on side card = moves card smoothly to front/center.
  // Double click = opens project detail modal.
  const handleStageClick = useCallback((e: React.MouseEvent, explicitIdx?: number) => {
    e.stopPropagation();

    const targetIdx = explicitIdx !== undefined ? explicitIdx : hoveredIndex;
    if (targetIdx === null) return;

    if (targetIdx !== safeIndex) {
      // Clicked side/back card -> Immediately set activeIndex to targetIdx to animate card to center/front
      setActiveIndex(targetIdx);
      return;
    }

    // Clicked active center card -> Disambiguate single vs double click
    const now = e.timeStamp;
    const timeSinceLastClick = now - lastClickTimeRef.current;

    if (timeSinceLastClick > 0 && timeSinceLastClick < 350) {
      // DOUBLE CLICK on active center card -> Open Detail View
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
      lastClickTimeRef.current = 0;
      if (projects[safeIndex]) {
        onSelectProject(projects[safeIndex]);
      }
    } else {
      // SINGLE CLICK on active center card -> Maintain focus
      lastClickTimeRef.current = now;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null;
      }, 350);
    }
  }, [hoveredIndex, safeIndex, projects, onSelectProject]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[safeIndex];

  return (
    <div className="relative w-full py-6 space-y-8">
      {/* 3D Coverflow Viewport Stage — Pure Mouse-Driven Perspective Container */}
      <div
        ref={stageRef}
        onPointerMove={handleStagePointerMove}
        onPointerLeave={handleStagePointerLeave}
        onClick={handleStageClick}
        className="relative w-full flex items-center justify-center h-[480px] sm:h-[510px] overflow-visible px-4 cursor-pointer touch-pan-y"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          isolation: 'isolate',
        }}
      >
        {projects.map((project, idx) => {
          // Circular Relative Index Math (Shortest Path Loop)
          const len = projects.length;
          let offset = idx - safeIndex;
          if (len > 0) {
            if (offset < -Math.floor(len / 2)) offset += len;
            if (offset > Math.floor((len - 1) / 2)) offset -= len;
          }
          const absOffset = Math.abs(offset);

          if (absOffset > 3) return null;

          const isActive = idx === safeIndex;
          const isHovered = hoveredIndex === idx;

          // Coverflow 3D Spatial Parameters — Identical Center Target for ALL active cards (translateX = 0)
          const rotateYVal = isActive ? 0 : (offset < 0 ? 30 : -30);
          const translateX = offset * 330;
          const translateZ = isActive ? 60 : absOffset * -140;
          const scaleVal = isActive ? 1.02 : (isHovered ? 0.92 : Math.max(0.72, 1 - absOffset * 0.14));
          const opacityVal = isActive ? 1 : (isHovered ? 0.95 : Math.max(0.45, 1 - absOffset * 0.22));
          
          // Continuous 3D Stacking Order — zIndex is dynamically derived from 3D depth (translateZ)
          // so Framer Motion interpolates zIndex continuously along the exact same spring curve as 3D spatial coordinates (x, z)
          const zIndexVal = Math.round(translateZ + 500) + (isHovered && !isActive ? 25 : 0);

          return (
            <motion.div
              key={project.id}
              onClick={(e) => handleStageClick(e, idx)}
              initial={false}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateYVal,
                scale: scaleVal,
                opacity: opacityVal,
                zIndex: zIndexVal,
              }}
              transition={{
                type: 'spring',
                stiffness: 175,
                damping: 24,
                mass: 0.8,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className={[
                'group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[450px] sm:h-[470px] rounded-2xl cursor-pointer select-none pointer-events-auto',
                isActive
                  ? 'bg-zinc-950/85 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_0_45px_-8px_rgba(56,189,248,0.28),0_30px_90px_-20px_rgba(0,0,0,0.95)] hover:border-cyan-300/70'
                  : isHovered
                  ? 'bg-zinc-950/95 backdrop-blur-xl border border-cyan-400/40 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                  : 'bg-zinc-950/90 backdrop-blur-lg border border-white/10 hover:border-white/30 shadow-2xl',
              ].join(' ')}
            >
              {/* Inner Ref Wrapper for Hover Micro-Tilt — Decoupled from Framer Motion's outer style.transform */}
              <div
                ref={isActive ? tiltRef : null}
                className="w-full h-full rounded-2xl relative transition-transform duration-150 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Internal Glass Body Layers */}
                
                {/* Layer 1: Ambient Cool Radial Backlight for Hero Card */}
                {isActive && (
                  <div
                    className="absolute -inset-6 pointer-events-none rounded-3xl opacity-40 blur-2xl z-0 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 30%, rgba(56,189,248,0.3) 0%, rgba(14,165,233,0.15) 50%, transparent 80%)',
                    }}
                  />
                )}

                {/* Layer 2: Dynamic Mouse-Responding Glass Sheen (Hero Card only) */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(800px circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.14) 0%, rgba(56,189,248,0.05) 40%, transparent 80%)`,
                    }}
                  />
                )}

                {/* Layer 3: Directional Illuminated Top Edge Highlight */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none border transition-opacity duration-300 z-20 ${
                    isActive
                      ? 'border-cyan-400/50 bg-gradient-to-b from-cyan-300/30 via-white/10 to-transparent opacity-95'
                      : 'border-white/10 bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-50 group-hover:opacity-80'
                  }`}
                />

                {/* Double Click Helper Badge on Hover */}
                {isActive && (
                  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300/90 border border-cyan-500/30 pointer-events-none shadow-lg">
                    <MousePointer className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Double-click to open details</span>
                  </div>
                )}

                {/* Main Card Content Container */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between bg-zinc-950/70 pointer-events-none">
                  <ProjectImageCover project={project} isActive={isActive} />

                  {/* Card Footer Info */}
                  <div className="p-5 sm:p-6 space-y-3.5 flex flex-col justify-between flex-1 bg-zinc-950/90 backdrop-blur-xl border-t border-white/5 pointer-events-none">
                    <div>
                      <h3 className={`text-lg sm:text-xl font-light leading-snug line-clamp-1 transition-colors ${
                        isActive ? 'text-white group-hover:text-cyan-200' : 'text-white/80 group-hover:text-white'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-white/50 mt-1 line-clamp-1">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/70 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform ${
                        isActive ? 'text-cyan-400' : 'text-white/60 group-hover:text-cyan-400'
                      }`}>
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls Indicator & Action Button (Pure Mouse Navigation, Arrow Buttons Completely Removed) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto px-4 relative z-30">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-cyan-400/90">
            0{safeIndex + 1} <span className="text-white/30">/</span> 0{projects.length}
          </span>
        </div>

        {currentProject && (
          <button
            onClick={() => onSelectProject(currentProject)}
            className="px-6 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 font-mono text-xs uppercase tracking-widest font-semibold border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-[0_0_25px_rgba(56,189,248,0.15)] cursor-pointer"
          >
            Open Project Details →
          </button>
        )}
      </div>
    </div>
  );
}
