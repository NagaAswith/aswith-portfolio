'use client';

/**
 * CertificateModal — Senior-Level Independent Viewport Inspection Showcase
 *
 * Positioning & Architecture:
 * 1. Mounted via React Portal (createPortal) directly to document.body.
 *    100% decoupled from parent transforms, section perspectives, and carousel coordinates.
 * 2. Deterministic Viewport Centering:
 *    Uses fixed inset-0 flex layout with safe navbar offset (pt-[72px] pb-6).
 *    Final inspection position is ALWAYS identical regardless of which certificate was selected.
 * 3. Zero Vertical Travel (NO off-screen initial state):
 *    Animation uses scale + rotateX + rotateY + opacity with y: 0 across all states.
 *    Motion feels like pure 3D depth expansion rather than upward vertical scrolling.
 * 4. Viewport-Safe Constraint:
 *    Shell uses max-h-[calc(100vh-96px)] / max-w-[820px] ensuring full visibility with no clipping.
 * 5. Isolated Internal Scrolling & Body Scroll Lock:
 *    Body scroll locked on open, exact scroll position preserved and restored on close.
 *    Internal content scrolls independently with overscroll-contain.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  ExternalLink,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Hash,
} from 'lucide-react';
import { CertificateItem } from '@/data/certificates';
import { formatImageUrl } from '@/data/assetManifest';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Premium Image Fallback (Monogram + Geometric Grid + Deterministic Gradient)
   ───────────────────────────────────────────────────────────────────────────── */
function ModalImageFallback({ cert }: { cert: CertificateItem }) {
  const initials = cert.issuer
    .split(/[\s/,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const gradients = [
    'from-emerald-900/70 via-zinc-900 to-zinc-950',
    'from-sky-900/70 via-zinc-900 to-zinc-950',
    'from-violet-900/70 via-zinc-900 to-zinc-950',
    'from-amber-900/70 via-zinc-900 to-zinc-950',
    'from-rose-900/50 via-zinc-900 to-zinc-950',
  ];
  const gradClass = gradients[(parseInt(cert.number, 10) - 1) % gradients.length];

  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${gradClass}`}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.12) 30px, rgba(255,255,255,0.12) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.12) 30px, rgba(255,255,255,0.12) 31px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 text-2xl font-light tracking-widest">
          {initials || <Award className="w-8 h-8 text-emerald-400" />}
        </div>
        <div className="text-center space-y-1">
          <p className="text-white/60 font-light text-sm">{cert.title}</p>
          <p className="text-white/35 font-mono text-xs">{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Certificate Inspection Modal
   ───────────────────────────────────────────────────────────────────────────── */
export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Reset image states whenever a new certificate is opened ───────────────
  useEffect(() => {
    if (certificate) {
      setImgError(false);
      setImgLoaded(false);
    }
  }, [certificate?.id]);

  // ── Isolated Body Scroll Lock & Scroll Position Preservation ───────────────
  useEffect(() => {
    if (!certificate) return;

    // Save exact scroll position before locking
    scrollPosRef.current = window.scrollY;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;

      // Restore exact scroll position on close
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [certificate]);

  // ── Keyboard ESC handler ──────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!certificate) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [certificate, handleClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {certificate && (
        /*
         * ── Dedicated Portal Backdrop ──────────────────────────────────────
         * Direct child of document.body — zero interference from parent
         * section transforms, 3D carousel contexts, or scroll offsets.
         * Perfectly centered in viewport with top navbar clearance.
         */
        <motion.div
          key="cert-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center pt-[72px] pb-6 px-4 sm:px-6 md:px-8 bg-black/92 backdrop-blur-3xl overflow-hidden overscroll-contain"
          style={{ touchAction: 'none' }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          {/* Ambient Emerald Environmental Glow */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.22) 0%, rgba(9,9,11,0.85) 70%, transparent 100%)',
            }}
          />

          {/*
           * ── 3D Perspective Shell Wrapper ─────────────────────────────────
           * Wraps ONLY the inspection card.
           * Sits in the exact flex-center of the viewport from frame 0.
           */}
          <div
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
              width: '100%',
              maxWidth: '820px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="relative z-10 my-auto"
          >
            {/*
             * ── Cinematic 3D Inspection Card ─────────────────────────────
             * Motion Rules:
             * - y is STRICTLY 0 in initial, animate, and exit.
             * - Zero upward travel; motion is pure 3D depth expansion.
             * - Duration: 550ms with luxury deceleration ease [0.16, 1, 0.3, 1].
             * - Max-height: calc(100vh - 96px) ensures 100% viewport safety.
             */}
            <motion.div
              key={`cert-modal-card-${certificate.id}`}
              initial={{
                scale: 0.82,
                rotateX: 12,
                rotateY: -8,
                opacity: 0,
                y: 0,
              }}
              animate={{
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.85,
                rotateX: 10,
                rotateY: 6,
                opacity: 0,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                width: '100%',
                maxWidth: '820px',
                maxHeight: 'calc(100vh - 96px)',
                touchAction: 'pan-y',
              }}
              className="relative flex flex-col rounded-3xl overflow-hidden text-white bg-zinc-950/95 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_35px_120px_rgba(0,0,0,0.98),0_0_60px_rgba(52,211,153,0.12)] overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass sweep highlight (cinematic expansion flash) */}
              <motion.div
                initial={{ x: '-120%', opacity: 0 }}
                animate={{ x: '220%', opacity: [0, 0.5, 0] }}
                transition={{ delay: 0.15, duration: 0.65, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none z-50"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)',
                  borderRadius: 'inherit',
                }}
              />

              {/* Solid 100% Opaque Surface + Emerald Sheen */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-0"
                style={{
                  backgroundColor: '#09090b',
                  backgroundImage:
                    'linear-gradient(160deg, rgba(52,211,153,0.10) 0%, rgba(9,9,11,0.98) 40%, rgb(9,9,11) 100%)',
                }}
              />

              {/* Top Sheen Edge Highlight */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none border border-emerald-400/20 bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-60 z-20" />

              {/* ── Fixed Inspection Card Header ───────────────────────── */}
              <div className="relative z-30 flex items-center justify-between px-6 sm:px-8 py-4.5 border-b border-white/10 shrink-0 bg-zinc-950/90 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    CREDENTIAL #{certificate.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    VERIFIED
                  </span>
                  {certificate.certificationTier && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 hidden sm:inline-block">
                      {certificate.certificationTier}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleClose}
                  aria-label="Close certificate inspection (ESC)"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Isolated Internal Scroll Container ─────────────────── */}
              <div
                className="overflow-y-auto overscroll-contain p-6 sm:p-8 flex-1 relative z-30 space-y-6 focus:outline-none scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent"
                style={{ touchAction: 'pan-y' }}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Certificate Image Hero Showcase */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center"
                  style={{ aspectRatio: '16/10' }}
                >
                  {!imgError && formatImageUrl(certificate.image) ? (
                    <>
                      <Image
                        src={formatImageUrl(certificate.image)}
                        alt={certificate.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 820px"
                        className={`object-contain p-3 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                      />
                      {!imgLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border-2 border-emerald-400/40 border-t-emerald-400 animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <ModalImageFallback cert={certificate} />
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="space-y-3">
                  <h3
                    id="cert-modal-title"
                    className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-snug tracking-tight"
                  >
                    {certificate.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono">
                    <span className="text-emerald-400 font-medium">{certificate.issuer}</span>
                    <span className="flex items-center gap-1.5 text-white/50">
                      <Calendar className="w-3.5 h-3.5" />
                      {certificate.date}
                    </span>
                    {certificate.duration && (
                      <span className="flex items-center gap-1.5 text-white/50">
                        <Clock className="w-3.5 h-3.5" />
                        {certificate.duration}
                      </span>
                    )}
                    {certificate.score && (
                      <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                        Score: {certificate.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Specialization Description */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest block">
                    SPECIALIZATION & DOMAIN OVERVIEW
                  </span>
                  <p className="text-sm sm:text-base font-light text-white/75 leading-relaxed">
                    {certificate.description}
                  </p>
                </div>

                {/* Verified Key Competencies */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                      VERIFIED CORE COMPETENCIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {certificate.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Credential ID & External Verification CTA */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {certificate.credentialId && (
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <Hash className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/30">ID:</span>
                      <span className="text-white/70 tracking-wide">{certificate.credentialId}</span>
                    </div>
                  )}

                  {certificate.verificationUrl && (
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-950/60 text-emerald-200 font-mono text-xs font-semibold uppercase tracking-widest hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-[0_0_20px_rgba(52,211,153,0.2)] cursor-pointer shrink-0 ml-auto"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
