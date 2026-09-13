'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';

interface SelfIntroVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SelfIntroVideo — Premium cinematic self-introduction video overlay.
 */
export function SelfIntroVideo({ isOpen, onClose }: SelfIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const selfIntroVideo = usePortfolioContent(
    (state) => state.personalInfo.selfIntroVideo
  );

  // Attempt autoplay when overlay opens
  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;

    video
      .play()
      .then(() => {
        setIsMuted(false);
      })
      .catch(() => {
        // Autoplay blocked — retry muted
        video.muted = true;
        setIsMuted(true);
        video.play().catch((err: unknown) => {
          console.warn('SelfIntroVideo: playback failed', err);
        });
      });
  }, [isOpen]);

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Pause and reset video when overlay closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleEnded = useCallback(() => {
    // Video finished naturally — return to hero
    onClose();
  }, [onClose]);

  const handleError = useCallback(() => {
    setVideoError(true);
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const transition = reducedMotion
    ? { duration: 0.15 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Self introduction video"
        >
          {/* Video layer */}
          {!videoError ? (
            <video
              ref={videoRef}
              src={selfIntroVideo}
              playsInline
              disablePictureInPicture
              onEnded={handleEnded}
              onError={handleError}
              className="w-full h-full object-contain"
              style={{ display: 'block', background: '#000' }}
            />
          ) : (
            /* Graceful error state — video file not found or unplayable */
            <div className="flex flex-col items-center gap-6 text-white/40 text-center px-8">
              <div
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-2xl">▶</span>
              </div>
              <p className="text-sm font-mono tracking-widest uppercase">
                Video unavailable
              </p>
              <p className="text-xs text-white/20 max-w-xs">
                Place the self-introduction video at:{' '}
                <code className="text-white/30">{selfIntroVideo}</code>
              </p>
            </div>
          )}

          {/* Top gradient — for control readability */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
            }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            }}
          />

          {/* Controls row — top */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-3">
            {/* Mute/unmute */}
            <button
              onClick={handleToggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Close — early exit */}
            <button
              onClick={onClose}
              aria-label="Close self-introduction video and return to portfolio"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
