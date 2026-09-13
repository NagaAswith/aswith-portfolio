'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function FallbackNotice() {
  const webglSupported = usePerformanceStore((state) => state.webglSupported);
  const webglContextLost = usePerformanceStore((state) => state.webglContextLost);

  if (webglSupported && !webglContextLost) return null;

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl text-center space-y-6"
      >
        <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {!webglSupported
              ? 'Hardware Acceleration Required'
              : 'Graphics Context Disconnected'}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {!webglSupported
              ? 'Your browser or device does not support WebGL hardware acceleration required for the full 3D interactive portfolio.'
              : 'The 3D graphics context was temporarily lost. You can reload the page to restore hardware acceleration.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReload}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-zinc-200 active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Graphics
          </button>
        </div>

        <p className="text-xs text-zinc-600 font-mono">
          Architecture fallback mode active
        </p>
      </motion.div>
    </div>
  );
}
