'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CertificateItem } from '@/data/certificates';
import { CoverflowCarousel } from '@/components/ui/CoverflowCarousel';
import { CertificateModal } from './CertificateModal';
import { usePortfolioContent } from '@/store/usePortfolioContent';

/* ─────────────────────────────────────────────────────────
   Category definitions (derived from real data only)
   ───────────────────────────────────────────────────────── */
const ALL_LABEL = 'ALL';

// Short display labels for filter pills
const CATEGORY_SHORT: Record<string, string> = {
  'Programming & Computational Logic': 'Programming',
  'Cloud Computing & Infrastructure Automation': 'Cloud',
  'Embedded Systems, Automotive & IoT': 'Embedded',
  'Artificial Intelligence & Machine Learning': 'AI / ML',
  'Hackathons & National Competitions': 'Hackathons',
};

/* ─────────────────────────────────────────────────────────
   CertificatesSection
   ───────────────────────────────────────────────────────── */
export function CertificatesSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  // Grace delay: briefly blocks auto-advance after modal closes
  const [postCloseGrace, setPostCloseGrace] = useState(false);
  const certificates = usePortfolioContent((state) => state.certificates);

  // Build unique ordered category list from dynamic data
  const orderedCategories = useMemo(() => {
    return Array.from(new Set(certificates.map((c) => c.category)));
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    if (activeCategory === ALL_LABEL) return certificates;
    return certificates.filter((c) => c.category === activeCategory);
  }, [activeCategory, certificates]);

  // Count per category (dynamic, from real data)
  const countForCategory = useCallback(
    (cat: string) => {
      if (cat === ALL_LABEL) return certificates.length;
      return certificates.filter((c) => c.category === cat).length;
    },
    [certificates]
  );

  // Handle modal close with grace period
  const handleModalClose = useCallback(() => {
    setSelectedCert(null);
    setPostCloseGrace(true);
  }, []);

  useEffect(() => {
    if (!postCloseGrace) return;
    const t = setTimeout(() => setPostCloseGrace(false), 1500);
    return () => clearTimeout(t);
  }, [postCloseGrace]);

  const isModalOpen = !!selectedCert;
  // Treat grace period same as modal open so auto-advance doesn't restart immediately
  const suspendAutoPlay = isModalOpen || postCloseGrace;

  return (
    <section
      id="certificates"
      className="relative z-20 py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto"
      aria-label="Certificates & Verified Credentials"
    >
      {/* ── Section Header ──────────────────────────────────────────── */}
      <div className="space-y-6 mb-10 border-b border-white/10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-2">
              VERIFIED ACHIEVEMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
              Certificates &amp; Specializations
            </h2>
          </div>
          {/* Total badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-emerald-300/80 tracking-widest">
              {certificates.length} CREDENTIALS
            </span>
          </div>
        </div>

        {/* ── Filter Pill Tabs ─────────────────────────────────────── */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter certificates by category"
        >
          {/* "All" pill */}
          <button
            role="tab"
            aria-selected={activeCategory === ALL_LABEL}
            onClick={() => setActiveCategory(ALL_LABEL)}
            className={[
              'px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40',
              activeCategory === ALL_LABEL
                ? 'bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.18)]'
                : 'bg-white/[0.06] text-white/55 border border-white/15 hover:bg-white/10 hover:text-white/80',
            ].join(' ')}
          >
            All ({certificates.length})
          </button>

          {orderedCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                'px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/40',
                activeCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_16px_rgba(52,211,153,0.14)]'
                : 'bg-white/[0.04] text-white/45 border border-white/10 hover:bg-white/8 hover:text-white/70',
              ].join(' ')}
            >
              {CATEGORY_SHORT[cat] ?? cat} ({countForCategory(cat)})
            </button>
          ))}
        </div>
      </div>

      {/* ── Coverflow Carousel ──────────────────────────────────────── */}
      {filteredCertificates.length > 0 ? (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CoverflowCarousel
            certificates={filteredCertificates}
            onSelectCert={(cert) => setSelectedCert(cert)}
            isModalOpen={suspendAutoPlay}
          />
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-white/25">
            No certificates in this category
          </span>
        </div>
      )}

      {/* ── Certificate Inspection Modal ────────────────────────────── */}
      <CertificateModal
        certificate={selectedCert}
        onClose={handleModalClose}
      />
    </section>
  );
}
