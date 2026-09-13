'use client';

/**
 * CoverflowCarousel — Premium 3D Certificate Archive Carousel
 *
 * Architecture principles:
 * - ONE source of truth: `activeIndex` drives all card positions
 * - Pointer geometry engine: RAF-gated, zero React re-renders during mouse move
 * - Every visible card is clickable (pointer-geometry based targeting)
 * - Continuous z-index derived from translateZ (prevents back-card bleed)
 * - Scroll-safe: no body scroll interaction
 * - Auto-advance: 3s, pauses on hover / modal open
 * - Premium fallback for missing/errored certificate images
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { CertificateItem } from '@/data/certificates';
import { formatImageUrl } from '@/data/assetManifest';

interface CoverflowCarouselProps {
  certificates: CertificateItem[];
  onSelectCert: (cert: CertificateItem) => void;
  isModalOpen?: boolean;
}

const AUTO_ADVANCE_MS = 2000;
// How many cards are rendered on each side of center
const VISIBLE_SIDE = 3;
// Horizontal step between cards (px in 3D space)
const STEP_X = 210;
// How far back each additional offset pushes the card (Z depth, px)
const DEPTH_PER_OFFSET = 160;
// How much each side card rotates (deg) — reduced for readability
const ROTATE_Y_PER_SIDE = 32;

/* ─────────────────────────────────────────────────────────
   Premium Certificate Image Fallback
   ───────────────────────────────────────────────────────── */
function CertImageFallback({ cert }: { cert: CertificateItem }) {
  // Extract initials from issuer for a clean monogram
  const initials = cert.issuer
    .split(/[\s/,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const gradients = [
    'from-emerald-900/80 via-zinc-900 to-zinc-950',
    'from-sky-900/80 via-zinc-900 to-zinc-950',
    'from-violet-900/80 via-zinc-900 to-zinc-950',
    'from-amber-900/80 via-zinc-900 to-zinc-950',
    'from-rose-900/60 via-zinc-900 to-zinc-950',
  ];
  // Deterministic gradient based on cert number
  const gradClass = gradients[(parseInt(cert.number, 10) - 1) % gradients.length];

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${gradClass} pointer-events-none`}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.15) 24px, rgba(255,255,255,0.15) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.15) 24px, rgba(255,255,255,0.15) 25px)',
        }}
      />
      {/* Monogram */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 text-lg font-light tracking-widest">
          {initials}
        </div>
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] text-center px-4 line-clamp-1">
          {cert.issuer.split('/')[0].trim()}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Certificate Card Face
   ───────────────────────────────────────────────────────── */
interface CertCardProps {
  cert: CertificateItem;
  isActive: boolean;
  isHovered: boolean;
  isModalOpen: boolean;
  onClick: () => void;
  tiltRef?: React.RefObject<HTMLDivElement | null>;
}

function CertCard({
  cert,
  isActive,
  isHovered,
  onClick,
  tiltRef,
}: CertCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden relative cursor-pointer select-none bg-zinc-950"
      onClick={onClick}
    >
      {/* ── Inner tilt wrapper (parallax, zero React re-render) ── */}
      <div
        ref={isActive ? tiltRef : undefined}
        className="w-full h-full relative bg-zinc-950"
      >
        {/* ── Glass card surface — 100% opaque base to block ALL rear-card bleed ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-zinc-950"
          style={{
            backgroundColor: '#09090b',
            backgroundImage: isActive
              ? 'linear-gradient(160deg, rgba(52,211,153,0.14) 0%, rgba(16,185,129,0.05) 40%, transparent 100%)'
              : 'none',
          }}
        />

        {/* ── Ambient glow (active only) ── */}
        {isActive && (
          <div
            className="absolute -inset-4 pointer-events-none rounded-3xl z-0 opacity-35 blur-2xl transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at 50% 35%, rgba(52,211,153,0.32) 0%, rgba(16,185,129,0.14) 55%, transparent 80%)',
            }}
          />
        )}

        {/* ── Mouse-responsive glass sheen (active only) ── */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-20"
            style={{
              background: `radial-gradient(700px circle at var(--sheen-x,50%) var(--sheen-y,50%), rgba(255,255,255,0.12) 0%, rgba(52,211,153,0.04) 42%, transparent 78%)`,
            }}
          />
        )}

        {/* ── Edge highlight ── */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${
            isActive
              ? 'bg-gradient-to-b from-emerald-300/25 via-white/8 to-transparent opacity-100'
              : isHovered
              ? 'bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-85'
              : 'bg-gradient-to-b from-white/8 via-transparent to-transparent opacity-50'
          }`}
          style={{ border: isActive ? '1px solid rgba(52,211,153,0.35)' : '1px solid rgba(255,255,255,0.12)' }}
        />

        {/* ── Certificate image area ── */}
        <div className="relative w-full h-[55%] overflow-hidden bg-black/60 rounded-t-2xl">
          {!imgError && formatImageUrl(cert.image) ? (
            <>
              <Image
                src={formatImageUrl(cert.image)}
                alt={cert.title}
                fill
                priority={isActive}
                sizes="(max-width: 640px) 300px, 380px"
                className={`object-contain transition-all duration-700 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                } ${isActive ? 'scale-[1.02]' : 'scale-100 brightness-75 saturate-75'}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
              {/* Loading shimmer */}
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              )}
            </>
          ) : (
            <CertImageFallback cert={cert} />
          )}

          {/* Gradient fade to card body */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.25) 55%, transparent 100%)',
            }}
          />

          {/* Number badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-400/30 text-[10px] font-mono text-emerald-300 pointer-events-none">
            <Award className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>#{cert.number}</span>
          </div>
        </div>

        {/* ── Card text body ── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-2 rounded-b-2xl z-10">
          <div className="space-y-1">
            <h4
              className={`text-sm sm:text-[15px] font-light leading-snug line-clamp-2 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/75'
              }`}
            >
              {cert.title}
            </h4>
            <p className="text-[11px] font-mono text-white/45 line-clamp-1">
              {cert.issuer}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-2.5 mt-0.5">
            <span className="text-[10px] font-mono text-white/35">
              {cert.date}
            </span>
            <span
              className={`text-[10px] font-mono font-semibold uppercase tracking-widest transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 translate-x-0 group-hover:translate-x-0.5'
                  : 'text-white/40'
              }`}
            >
              {isActive ? 'Inspect →' : '· · ·'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Carousel
   ───────────────────────────────────────────────────────── */
export function CoverflowCarousel({
  certificates,
  onSelectCert,
  isModalOpen = false,
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether user recently interacted (to give grace period before auto-advance)
  const userInteractedRef = useRef(false);

  const total = certificates?.length ?? 0;

  // Clamp index when certificate list changes (filter)
  const safeIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;
  useEffect(() => {
    if (total > 0 && safeIndex !== activeIndex) setActiveIndex(safeIndex);
  }, [total, activeIndex, safeIndex]);

  // Preload current + adjacent certificate images
  useEffect(() => {
    if (!certificates || total === 0) return;
    [-2, -1, 0, 1, 2].forEach((offset) => {
      const idx = (safeIndex + offset + total) % total;
      const src = certificates[idx]?.image;
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [safeIndex, certificates, total]);

  // ── Auto-advance: 2s interval (ref-based, no stale closure) ────────────
  // Store latest values in refs so the timer callback always sees current state
  const totalRef = useRef(total);
  const isModalOpenRef = useRef(isModalOpen);
  const hoveredIndexRef = useRef(hoveredIndex);
  useEffect(() => { totalRef.current = total; }, [total]);
  useEffect(() => { isModalOpenRef.current = isModalOpen; }, [isModalOpen]);
  useEffect(() => { hoveredIndexRef.current = hoveredIndex; }, [hoveredIndex]);

  // Helper to restart the 2s timer cleanly on user interaction
  const resetAutoTimer = useCallback(() => {
    userInteractedRef.current = true;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      userInteractedRef.current = false;
      if (isModalOpenRef.current || hoveredIndexRef.current !== null) return;
      setActiveIndex((prev) => {
        const t = totalRef.current;
        return t <= 1 ? 0 : prev === t - 1 ? 0 : prev + 1;
      });
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    if (total <= 1 || isModalOpen || hoveredIndex !== null) {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      return;
    }

    const tick = () => {
      // Always read latest values via refs
      if (isModalOpenRef.current || hoveredIndexRef.current !== null) {
        // Conditions changed — stop; the effect will restart when deps change
        return;
      }
      if (!userInteractedRef.current) {
        setActiveIndex((prev) => {
          const t = totalRef.current;
          return t <= 1 ? 0 : prev === t - 1 ? 0 : prev + 1;
        });
      }
      userInteractedRef.current = false;
      autoTimerRef.current = setTimeout(tick, AUTO_ADVANCE_MS);
    };

    autoTimerRef.current = setTimeout(tick, AUTO_ADVANCE_MS);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [isModalOpen, hoveredIndex, total]);

  // ── Pointer geometry engine (RAF-gated, zero re-renders) ────────────────
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!stageRef.current || total === 0) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafRef.current = requestAnimationFrame(() => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const pointerXRel = clientX - stageCenterX;

        // Find closest visible card to pointer
        let closestIdx: number | null = null;
        let minDist = Infinity;

        for (let i = 0; i < total; i++) {
          let offset = i - safeIndex;
          const half = Math.floor(total / 2);
          if (offset < -half) offset += total;
          if (offset > Math.floor((total - 1) / 2)) offset -= total;

          if (Math.abs(offset) <= VISIBLE_SIDE) {
            const cardCenterX = offset * STEP_X;
            const dist = Math.abs(pointerXRel - cardCenterX);
            if (dist < minDist) {
              minDist = dist;
              closestIdx = i;
            }
          }
        }

        if (closestIdx !== null && closestIdx !== hoveredIndex) {
          setHoveredIndex(closestIdx);
        }

        // Parallax tilt on active card (direct DOM, no React state)
        if (tiltRef.current) {
          const cardRect = tiltRef.current.getBoundingClientRect();
          const nx = Math.max(0, Math.min(1, (clientX - cardRect.left) / Math.max(1, cardRect.width)));
          const ny = Math.max(0, Math.min(1, (clientY - cardRect.top) / Math.max(1, cardRect.height)));
          const rx = (ny - 0.5) * -6; // very subtle
          const ry = (nx - 0.5) * 6;
          tiltRef.current.style.setProperty('--sheen-x', `${nx * 100}%`);
          tiltRef.current.style.setProperty('--sheen-y', `${ny * 100}%`);
          tiltRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      });
    },
    [total, safeIndex, hoveredIndex]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tiltRef.current) {
      tiltRef.current.style.removeProperty('--sheen-x');
      tiltRef.current.style.removeProperty('--sheen-y');
      tiltRef.current.style.transform = '';
    }
    setHoveredIndex(null);
  }, []);

  // ── Stage click handler ───────────────────────────────────────────────
  const handleCardClick = useCallback(
    (idx: number) => {
      resetAutoTimer();
      if (idx !== safeIndex) {
        // Side card clicked → bring to center
        setActiveIndex(idx);
      } else {
        // Active card clicked → open inspect
        onSelectCert(certificates[safeIndex]);
      }
    },
    [safeIndex, certificates, onSelectCert, resetAutoTimer]
  );

  // ── Keyboard nav ──────────────────────────────────────────────────────
  useEffect(() => {
    if (total === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        resetAutoTimer();
        setActiveIndex((p) => (p === 0 ? total - 1 : p - 1));
      } else if (e.key === 'ArrowRight') {
        resetAutoTimer();
        setActiveIndex((p) => (p === total - 1 ? 0 : p + 1));
      } else if (e.key === 'Enter') {
        onSelectCert(certificates[safeIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total, safeIndex, certificates, onSelectCert, resetAutoTimer]);

  // ── Compute card transforms ───────────────────────────────────────────
  const cardTransforms = useMemo(() => {
    if (total === 0) return [];
    const half = Math.floor(total / 2);
    return certificates.map((_, idx) => {
      let offset = idx - safeIndex;
      if (offset < -half) offset += total;
      if (offset > Math.floor((total - 1) / 2)) offset -= total;

      const absOffset = Math.abs(offset);
      const isActive = idx === safeIndex;
      const isHov = hoveredIndex === idx;
      const isInspecting = isModalOpen;

      // During inspection: recede side cards more dramatically
      const inspectDepthBoost = isInspecting && !isActive ? -80 : 0;

      const translateX = offset * STEP_X;
      const translateZ = isActive
        ? 80
        : -(absOffset * DEPTH_PER_OFFSET) + inspectDepthBoost;
      const rotateY = isActive ? 0 : offset < 0 ? ROTATE_Y_PER_SIDE : -ROTATE_Y_PER_SIDE;
      const scale = isActive
        ? isInspecting ? 0.96 : 1.04
        : isHov
        ? Math.max(0.80, 1 - absOffset * 0.11)
        : Math.max(0.70, 1 - absOffset * 0.14);
      const opacity = isActive
        ? 1
        : isInspecting
        ? Math.max(0.10, 0.5 - absOffset * 0.18)
        : isHov
        ? Math.max(0.75, 1 - absOffset * 0.18)
        : Math.max(0.40, 1 - absOffset * 0.22);

      // Deterministic depth hierarchy:
      // Active center card = 1000 (highest in carousel)
      // Side cards = strictly lower by offset distance
      const zIndex = isActive
        ? 1000
        : Math.max(1, 500 - absOffset * 100) + (isHov && !isActive ? 15 : 0);

      return { offset: absOffset, isActive, translateX, translateZ, rotateY, scale, opacity, zIndex };
    });
  }, [total, safeIndex, hoveredIndex, isModalOpen, certificates]);

  if (total === 0) return null;

  return (
    <div
      className="relative w-full py-4 space-y-6"
    >
      {/* ── 3D Stage ────────────────────────────────────────────────── */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full flex items-center justify-center overflow-visible"
        style={{
          height: 'clamp(340px, 50vw, 460px)',
          perspective: '1300px',
          isolation: 'isolate',
        }}
      >
        {certificates.map((cert, idx) => {
          const t = cardTransforms[idx];
          if (!t) return null;
          if (t.offset > VISIBLE_SIDE) return null;

          return (
            <motion.div
              key={cert.id}
              initial={false}
              animate={{
                x: t.translateX,
                z: t.translateZ,
                rotateY: t.rotateY,
                scale: t.scale,
                opacity: t.opacity,
                zIndex: t.zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 28,
                mass: 0.9,
              }}
              className="absolute group"
              style={{
                background: 'rgb(9,9,11)',
                borderRadius: '1rem',
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                contain: 'paint',
                width: 'clamp(260px, 30vw, 340px)',
                height: 'clamp(320px, 42vw, 420px)',
                top: '50%',
                left: '50%',
                marginTop: 'calc(clamp(320px, 42vw, 420px) / -2)',
                marginLeft: 'calc(clamp(260px, 30vw, 340px) / -2)',
                cursor: t.isActive ? 'default' : 'pointer',
                pointerEvents: 'auto',
              }}
            >
              <CertCard
                cert={cert}
                isActive={t.isActive}
                isHovered={hoveredIndex === idx}
                isModalOpen={isModalOpen}
                onClick={() => handleCardClick(idx)}
                tiltRef={tiltRef}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Dot navigation ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Certificate navigation">
        {certificates.map((cert, idx) => (
          <button
            key={cert.id}
            role="tab"
            aria-selected={idx === safeIndex}
            aria-label={`Select certificate ${idx + 1}: ${cert.title}`}
            onClick={() => {
              resetAutoTimer();
              setActiveIndex(idx);
            }}
            className={[
              'rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/60',
              idx === safeIndex
                ? 'w-6 h-1.5 bg-emerald-400'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40',
            ].join(' ')}
          />
        ))}
      </div>

      {/* ── Info bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between max-w-md mx-auto px-4 gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-mono tracking-widest text-emerald-400/80">
            {String(safeIndex + 1).padStart(2, '0')}{' '}
            <span className="text-white/25">/</span>{' '}
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={() => {
            resetAutoTimer();
            onSelectCert(certificates[safeIndex]);
          }}
          className="px-5 py-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-200 font-mono text-[11px] uppercase tracking-widest font-semibold border border-emerald-500/30 hover:border-emerald-400/55 transition-all shadow-[0_0_20px_rgba(52,211,153,0.12)] cursor-pointer"
        >
          Inspect Credential →
        </button>
      </div>
    </div>
  );
}
