'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Cpu, Globe, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/data/projects';
import { formatImageUrl } from '@/data/assetManifest';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Safe Image Component with SVG Fallback — guarantees ZERO broken image icons anywhere.
 */
function GalleryImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);
  const formattedSrc = formatImageUrl(src);

  if (error || !formattedSrc) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 text-center">
        <Layers className="w-8 h-8 text-cyan-400/60 mb-2" />
        <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider">
          System Preview
        </span>
      </div>
    );
  }

  return (
    <Image
      src={formattedSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}

/**
 * ProjectModal — Senior-Level Independent Viewport Detail Showcase.
 *
 * Features:
 * - Mounted via React Portal (createPortal) directly to document.body for 100% position independence from parent transforms.
 * - Perfectly centered in the usable viewport area below the fixed navbar.
 * - Isolated Scroll Experience: Body Scroll Lock with exact scroll position preservation.
 * - Stopped event propagation preventing main page scrolling or section jumping.
 * - Gallery thumbnails display ACTUAL IMAGE visual previews + EXACT labels: Image 1, Image 2, Image 3.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allImages = useMemo(() => {
    if (!project) return [];
    const rawList = [project.images.main, ...(project.images.gallery || [])];
    const formattedList = rawList
      .map((url) => formatImageUrl(url))
      .filter((url) => Boolean(url) && !url.toLowerCase().includes('.gitkeep'));

    return Array.from(new Set(formattedList));
  }, [project]);

  // Reset gallery index on project change
  useEffect(() => {
    setSelectedGalleryIdx(0);
  }, [project]);

  // Isolated Body Scroll Lock & Scroll Position Preservation
  useEffect(() => {
    if (!project) return;

    // Save exact page scroll position before locking
    scrollPosRef.current = window.scrollY;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;

      // Restore exact scroll position on detail close
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [project]);

  // Keyboard navigation & ESC key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && allImages.length > 1) {
        setSelectedGalleryIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight' && allImages.length > 1) {
        setSelectedGalleryIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, allImages]);

  // Preload images
  useEffect(() => {
    if (project && allImages.length > 0) {
      allImages.forEach((url) => {
        const img = new window.Image();
        img.src = url;
      });
    }
  }, [project, allImages]);

  if (!project || !mounted) return null;

  const currentImage = allImages[selectedGalleryIdx] || project.images.main;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGalleryIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGalleryIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const CategoryIcon =
    project.category === 'EMBEDDED' || project.category === 'IOT'
      ? Cpu
      : project.category === 'WEB'
      ? Globe
      : Code2;

  // Staggered Layer Motion Variants
  const layerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 + custom * 0.06,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center pt-[64px] sm:pt-[72px] pb-4 sm:pb-6 px-3 sm:px-6 md:px-8 bg-black/94 backdrop-blur-3xl overflow-hidden overscroll-contain"
          style={{ touchAction: 'none' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Ambient Environmental Backdrop Glow */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.22) 0%, rgba(15,23,42,0.85) 70%, transparent 100%)',
            }}
          />

          {/* Independent Viewport-Centered Card Showcase Shell */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ touchAction: 'pan-y' }}
            className="relative z-10 w-full max-w-5xl lg:max-w-6xl bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_35px_110px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[calc(100dvh-5rem)] text-white overscroll-contain my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Sheen Edge Highlight */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none border border-white/10 bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-60 z-20" />

            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4.5 border-b border-white/10 shrink-0 bg-zinc-950/90 backdrop-blur-md relative z-30">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  PROJECT #{project.number}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-white/10 text-white/80 border border-white/15">
                  {project.category}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close project modal (ESC)"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isolated Internal Scrollable Main Content Layout */}
            <div
              className="overflow-y-auto overscroll-contain p-4 sm:p-8 md:p-9 flex-1 relative z-30 space-y-6 sm:space-y-8 focus:outline-none scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
              style={{ touchAction: 'pan-y' }}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Primary Grid Layout: Left Large Image Hero Showcase / Right Project Info Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Hero Area (Lg: 7 cols) */}
                <motion.div
                  variants={layerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="lg:col-span-7 space-y-5"
                >
                  {/* Main Project Hero Image Container */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900/90 border border-white/15 shadow-2xl flex items-center justify-center group">
                    <GalleryImage
                      key={currentImage}
                      src={currentImage}
                      alt={`${project.title} screenshot ${selectedGalleryIdx + 1}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 750px"
                      className="object-cover object-center transition-all duration-500"
                    />

                    {/* Image Controls Overlay */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-all cursor-pointer shadow-xl opacity-90 hover:scale-105"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          onClick={handleNextImage}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-all cursor-pointer shadow-xl opacity-90 hover:scale-105"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                          {selectedGalleryIdx + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery Row */}
                  {allImages.length > 1 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                        PROJECT GALLERY PREVIEWS
                      </span>

                      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
                        {allImages.map((imgUrl, idx) => {
                          const isSelected = idx === selectedGalleryIdx;

                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedGalleryIdx(idx)}
                              className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer ${
                                isSelected
                                  ? 'border-cyan-400 ring-2 ring-cyan-500/40 scale-105 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                                  : 'border-white/15 opacity-65 hover:opacity-100 hover:border-white/40'
                              }`}
                              style={{ width: '120px' }}
                            >
                              {/* Actual Image Preview Box */}
                              <div className="relative w-full h-[68px] bg-zinc-900 overflow-hidden">
                                <GalleryImage
                                  src={imgUrl}
                                  alt={`Image ${idx + 1}`}
                                  fill
                                  sizes="120px"
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Exact Thumbnail Label: "Image 1", "Image 2", "Image 3", etc. */}
                              <div className="w-full py-1.5 bg-zinc-950 text-center border-t border-white/10">
                                <span
                                  className={`text-[11px] font-mono tracking-wider font-medium ${
                                    isSelected ? 'text-cyan-300 font-semibold' : 'text-white/70'
                                  }`}
                                >
                                  Image {idx + 1}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Project Info Header Column (Lg: 5 cols) */}
                <motion.div
                  variants={layerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="lg:col-span-5 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <CategoryIcon className="w-4 h-4" />
                      <span className="tracking-wider uppercase">{project.domain}</span>
                    </div>

                    <h1
                      id="project-modal-title"
                      className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight tracking-tight"
                    >
                      {project.title}
                    </h1>

                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                        Status: <strong className="text-cyan-300 font-normal">{project.status}</strong>
                      </span>
                      <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                        Year: <strong className="text-white font-normal">{project.year}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions / External Links */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-cyan-950/60 text-cyan-200 font-mono text-xs font-semibold uppercase tracking-widest hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] cursor-pointer"
                      >
                        <span>Launch Live Platform</span>
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 text-white/80 font-mono text-xs font-semibold uppercase tracking-widest hover:bg-white/15 border border-white/15 transition-all cursor-pointer"
                      >
                        <Code2 className="w-4 h-4 text-white/70" />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* System Architecture Overview & Features Grid */}
              <motion.div
                variants={layerVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-8"
              >
                {/* Full Architecture Overview (Lg: 7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    SYSTEM ARCHITECTURE OVERVIEW
                  </h3>
                  <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed font-sans">
                    {project.fullDescription || project.shortDescription}
                  </p>
                </div>

                {/* Key Capabilities / Features (Lg: 5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    KEY ENGINEERING HIGHLIGHTS
                  </h3>
                  <ul className="space-y-2.5">
                    {project.features.map((featureItem, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{featureItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Technology Stack Tags */}
              <motion.div
                variants={layerVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="border-t border-white/10 pt-6 space-y-3"
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
                  TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/85 hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}




