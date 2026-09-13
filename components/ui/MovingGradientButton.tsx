'use client';

import React from 'react';

interface MovingGradientButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  ariaLabel?: string;
}

export function MovingGradientButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  ariaLabel,
}: MovingGradientButtonProps) {
  const baseStyles =
    'relative group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-medium overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-98';

  const variantStyles = {
    primary:
      'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_45px_rgba(255,255,255,0.35)] hover:bg-zinc-100',
    secondary:
      'bg-zinc-900 text-white border border-white/15 hover:border-white/30 hover:bg-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]',
    outline:
      'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 backdrop-blur-md',
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Moving Ambient Gradient Glow on Hover */}
      <span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(90deg, rgba(168,85,247,0.15), rgba(56,189,248,0.2), rgba(52,211,153,0.15))',
          backgroundSize: '200% 200%',
          animation: 'movingGradient 3s ease infinite',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
