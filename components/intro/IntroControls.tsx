'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useIntroStore } from '@/store/useIntroStore';
import { usePerformanceStore } from '@/store/usePerformanceStore';

export function IntroControls() {
  const introState = useIntroStore((state) => state.introState);
  const isMuted = useIntroStore((state) => state.isMuted);
  const toggleMuted = useIntroStore((state) => state.toggleMuted);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);

  // Only show during active video playback or on final frame (not during transition)
  const showControls =
    introState === 'INTRO_PLAYING' ||
    introState === 'MESSAGE_READY';

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="absolute bottom-6 right-6 z-30 pointer-events-auto"
        >
          <button
            onClick={toggleMuted}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
