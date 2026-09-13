'use client';

import React from 'react';

interface NeonBorderProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

/**
 * NeonBorder — animated perimeter-light border using gold/cyan conic-gradient sweep.
 * When active, a bright light sweeps around the card border perimeter.
 */
export function NeonBorder({
  children,
  active = true,
  className = '',
}: NeonBorderProps) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <div className={`relative group ${className}`}>
      <style>{`
        @keyframes neonBorderSweep {
          0%   { --neon-border-angle: 0deg; }
          100% { --neon-border-angle: 360deg; }
        }
        @property --neon-border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .neon-border-sweep {
          position: relative;
        }
        .neon-border-sweep::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 16px;
          padding: 1.5px;
          background: conic-gradient(
            from var(--neon-border-angle),
            transparent 0deg,
            rgba(245, 158, 11, 0.0) 50deg,
            rgba(251, 191, 36, 0.95) 110deg,
            rgba(56, 189, 248, 0.8) 170deg,
            rgba(251, 191, 36, 0.95) 230deg,
            rgba(245, 158, 11, 0.0) 290deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: neonBorderSweep 3.5s linear infinite;
          pointer-events: none;
          z-index: 40;
        }
        .neon-border-sweep::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 20px;
          background: conic-gradient(
            from var(--neon-border-angle),
            transparent 0deg,
            rgba(245, 158, 11, 0.0) 50deg,
            rgba(251, 191, 36, 0.18) 110deg,
            rgba(56, 189, 248, 0.12) 170deg,
            rgba(251, 191, 36, 0.18) 230deg,
            rgba(245, 158, 11, 0.0) 290deg,
            transparent 360deg
          );
          filter: blur(6px);
          animation: neonBorderSweep 3.5s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .neon-border-sweep::before,
          .neon-border-sweep::after {
            animation: none;
          }
        }
      `}</style>

      {/* Perimeter sweep wrapper */}
      <div className="neon-border-sweep w-full h-full overflow-hidden rounded-2xl">
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
