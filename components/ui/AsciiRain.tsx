'use client';

import React, { useEffect, useRef } from 'react';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function AsciiRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tier = usePerformanceStore((state) => state.tier);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion || tier === 'LOW') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let paused = false;

    const handleVisibilityChange = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const fontSize = tier === 'HIGH' ? 13 : 14;

    // Column density: HIGH = 1 col per fontSize px, MEDIUM = 1 col per fontSize*1.5px
    const columnStride = tier === 'HIGH' ? 1 : 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const totalColumns = Math.floor(canvas.width / fontSize);
    const activeColumns = Math.ceil(totalColumns / columnStride);

    interface Stream {
      col: number;      // pixel column
      y: number;        // current head position in rows
      speed: number;    // rows per tick
      length: number;   // stream length
      opacity: number;  // base opacity for this stream
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]</>+=*#_|\\:;?!@$%&';

    const streams: Stream[] = [];
    for (let i = 0; i < activeColumns; i++) {
      streams.push({
        col: i,
        y: Math.floor(Math.random() * -80), // stagger starts above screen
        speed: 0.25 + Math.random() * 0.45,
        length: 8 + Math.floor(Math.random() * 18),
        opacity: 0.12 + Math.random() * 0.35,
      });
    }

    let lastTime = 0;
    const targetInterval = tier === 'HIGH' ? 45 : 70;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      if (paused) return;
      if (currentTime - lastTime < targetInterval) return;
      lastTime = currentTime;

      // Dark fade canvas for smooth trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (const stream of streams) {
        const x = stream.col * fontSize * columnStride;

        for (let row = 0; row < stream.length; row++) {
          const posY = (stream.y - row) * fontSize;
          if (posY < -fontSize || posY > canvas.height + fontSize) continue;

          const char = chars[Math.floor(Math.random() * chars.length)];

          if (row === 0) {
            // Luminous cyan head
            ctx.fillStyle = `rgba(56, 189, 248, ${stream.opacity * 0.9})`;
          } else if (row < 3) {
            // Luminous teal body
            ctx.fillStyle = `rgba(52, 211, 153, ${stream.opacity * (1 - row * 0.15) * 0.7})`;
          } else {
            // Fading dark olive tail
            const fade = 1 - row / stream.length;
            ctx.fillStyle = `rgba(20, 83, 45, ${stream.opacity * fade * 0.4})`;
          }

          ctx.fillText(char, x, posY);
        }

        stream.y += stream.speed;

        if ((stream.y - stream.length) * fontSize > canvas.height) {
          stream.y = Math.floor(Math.random() * -30);
          stream.speed = 0.25 + Math.random() * 0.45;
          stream.length = 8 + Math.floor(Math.random() * 18);
          stream.opacity = 0.12 + Math.random() * 0.35;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tier, reducedMotion]);

  if (reducedMotion || tier === 'LOW') return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
}
