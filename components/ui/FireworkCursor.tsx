'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  hue: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export function FireworkCursor() {
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const tier = usePerformanceStore((state) => state.tier);

  // Device detection: only disable on pure touch devices that lack a fine pointer
  const [isTouchOnly, setIsTouchOnly] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasFine = window.matchMedia('(pointer: fine)').matches;
      return hasCoarse && !hasFine;
    }
    return false;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const targetPosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const hueRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const interactiveTypeRef = useRef<'button' | 'card' | 'input' | null>(null);
  const hoverScaleRef = useRef(1);
  const isVisibleRef = useRef(false);
  const hasMovedRef = useRef(false);
  const tierRef = useRef(tier);

  // Keep tier ref synchronized without restarting animation loops
  useEffect(() => {
    tierRef.current = tier;
  }, [tier]);

  // The custom cursor is a core global UI component — active on desktop regardless of 3D canvas tier
  const isEnabled = !reducedMotion;

  // Pointer media query detection for hybrid laptop/tablet mode changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const fineQuery = window.matchMedia('(pointer: fine)');

    const updatePointerType = () => {
      setIsTouchOnly(coarseQuery.matches && !fineQuery.matches);
    };

    coarseQuery.addEventListener('change', updatePointerType);
    fineQuery.addEventListener('change', updatePointerType);

    return () => {
      coarseQuery.removeEventListener('change', updatePointerType);
      fineQuery.removeEventListener('change', updatePointerType);
    };
  }, []);

  // Inject desktop cursor:none stylesheet globally
  useEffect(() => {
    if (!isEnabled || isTouchOnly) return;

    const styleId = 'custom-cursor-hide';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    // Restrict cursor hiding strictly to fine pointer environments
    styleEl.textContent = `
      @media (pointer: fine) {
        html, body, *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, [isEnabled, isTouchOnly]);

  // Global mouse & scroll tracking without triggering React re-renders
  useEffect(() => {
    if (!isEnabled || isTouchOnly) return;

    const updateInteractiveTarget = (target: HTMLElement | null) => {
      if (!target) {
        isHoveredRef.current = false;
        interactiveTypeRef.current = null;
        return;
      }

      const button = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
      const input = target.closest('input, textarea, select, [contenteditable="true"]');
      const card = target.closest('.preserve-3d, .group, [role="dialog"], [data-interactive="true"]');

      if (button) {
        isHoveredRef.current = true;
        interactiveTypeRef.current = 'button';
      } else if (input) {
        isHoveredRef.current = true;
        interactiveTypeRef.current = 'input';
      } else if (card) {
        isHoveredRef.current = true;
        interactiveTypeRef.current = 'card';
      } else {
        isHoveredRef.current = false;
        interactiveTypeRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      if (!hasMovedRef.current) {
        currentPosRef.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = true;
      }

      isVisibleRef.current = true;
      updateInteractiveTarget(e.target as HTMLElement | null);
    };

    const handleScroll = () => {
      // When page scrolls under a stationary mouse, update hover element dynamically
      if (isVisibleRef.current && hasMovedRef.current) {
        const el = document.elementFromPoint(
          targetPosRef.current.x,
          targetPosRef.current.y
        ) as HTMLElement | null;
        updateInteractiveTarget(el);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Energy burst on select/click, scaled with tier
      const currentTier = tierRef.current;
      const count = currentTier === 'HIGH' ? 14 : currentTier === 'MEDIUM' ? 10 : 6;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2.5 + Math.random() * 3.5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 6,
          maxSize: 14 + Math.random() * 8,
          hue: (hueRef.current + i * 25) % 360,
          alpha: 0.85,
          life: 0,
          maxLife: 30 + Math.random() * 20,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Cleanly detect cursor leaving viewport (e.g. into browser chrome or another window)
      const toEl = (e as unknown as { toElement?: Element | null }).toElement;
      if (!e.relatedTarget && !toEl) {
        isVisibleRef.current = false;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isVisibleRef.current = true;
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        currentPosRef.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isEnabled, isTouchOnly]);

  // Persistent 60 FPS Render Loop
  useEffect(() => {
    if (!isEnabled || isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isVisible = isVisibleRef.current && hasMovedRef.current;

      // Smooth lerp pointer position for natural fluid inertia
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;
      currentPosRef.current.x += dx * 0.35;
      currentPosRef.current.y += dy * 0.35;

      const dist = Math.hypot(dx, dy);

      // Cycle rainbow spectrum hue
      hueRef.current = (hueRef.current + 1.5) % 360;

      const isHovered = isHoveredRef.current;
      const interactiveType = interactiveTypeRef.current;

      // Smooth scale interpolation for hover transitions
      const targetScale = isHovered
        ? interactiveType === 'button'
          ? 1.5
          : interactiveType === 'input'
          ? 1.2
          : 1.3
        : 1.0;
      hoverScaleRef.current += (targetScale - hoverScaleRef.current) * 0.2;
      const scale = hoverScaleRef.current;

      // Spawn trail particles based on pointer movement and current performance tier
      if (isVisible && (dist > 1 || Math.random() < 0.2)) {
        const currentTier = tierRef.current;
        const spawnCount = currentTier === 'HIGH'
          ? (isHovered ? 3 : 2)
          : currentTier === 'MEDIUM'
          ? (isHovered ? 2 : 1)
          : 1;

        for (let i = 0; i < spawnCount; i++) {
          const spread = isHovered ? 4 : 2;
          particlesRef.current.push({
            x: currentPosRef.current.x + (Math.random() - 0.5) * spread,
            y: currentPosRef.current.y + (Math.random() - 0.5) * spread,
            vx: (Math.random() - 0.5) * 0.8 - dx * 0.05,
            vy: (Math.random() - 0.5) * 0.8 - dy * 0.05 - 0.2, // slight upward float
            size: interactiveType === 'button' ? 8 : interactiveType === 'card' ? 7 : 5,
            maxSize: isHovered ? 16 : 11,
            hue: (hueRef.current + Math.random() * 40) % 360,
            alpha: isHovered ? 0.65 : 0.45,
            life: 0,
            maxLife: isHovered ? 35 : 25,
          });
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // 1. Render fluid smoke particles
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        const currentSize = p.size + (p.maxSize - p.size) * Math.sin(progress * Math.PI);
        const currentAlpha = p.alpha * (1 - progress);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${currentAlpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 85%, 55%, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 45%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render luminous core pointer & glow aura (always visible when mouse is active)
      if (isVisible) {
        const cx = currentPosRef.current.x;
        const cy = currentPosRef.current.y;
        const currentHue = hueRef.current;

        // Outer ambient glow aura
        const outerAuraSize = 16 * scale;
        const auraGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerAuraSize);
        auraGradient.addColorStop(0, `hsla(${currentHue}, 90%, 65%, ${isHovered ? 0.35 : 0.22})`);
        auraGradient.addColorStop(0.5, `hsla(${currentHue}, 85%, 55%, ${isHovered ? 0.16 : 0.08})`);
        auraGradient.addColorStop(1, `hsla(${currentHue}, 80%, 45%, 0)`);
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, outerAuraSize, 0, Math.PI * 2);
        ctx.fill();

        // Focused luminous core tip
        const coreSize = 3.5 * scale;
        const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
        coreGradient.addColorStop(0, '#ffffff'); // crisp radiant center
        coreGradient.addColorStop(0.4, `hsla(${currentHue}, 100%, 75%, 0.95)`);
        coreGradient.addColorStop(1, `hsla(${currentHue}, 90%, 60%, 0)`);
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
        ctx.fill();

        // Subtle interactive resonance ring on hover
        if (isHovered) {
          const ringSize = 13 * scale;
          ctx.strokeStyle = `hsla(${currentHue}, 95%, 70%, 0.45)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx, cy, ringSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled, isTouchOnly]);

  if (!isEnabled || isTouchOnly) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
