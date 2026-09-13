'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useIntroStore } from '@/store/useIntroStore';

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const introState = useIntroStore((state) => state.introState);
  const isMuted = useIntroStore((state) => state.isMuted);
  const setMuted = useIntroStore((state) => state.setMuted);
  const setIntroState = useIntroStore((state) => state.setIntroState);

  // Sync muted state to video element imperatively — avoids re-renders
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Attempt playback on mount — unmuted first, fall back to muted if blocked
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try unmuted autoplay first (isMuted defaults to false in store)
    video.muted = false;

    video
      .play()
      .then(() => {
        // Autoplay with audio succeeded — keep unmuted
      })
      .catch((err: unknown) => {
        // Browser autoplay policy blocked audio.
        // Retry with muted — this is always permitted.
        const name =
          err instanceof Error ? err.name : typeof err === 'string' ? err : '';
        if (
          name === 'NotAllowedError' ||
          name === 'AbortError' ||
          String(err).toLowerCase().includes('autoplay')
        ) {
          setMuted(true);
          video.muted = true;
          video.play().catch((retryErr: unknown) => {
            console.warn('Intro video: playback unavailable.', retryErr);
          });
        } else {
          console.warn('Intro video: play error:', err);
        }
      });
  }, [setMuted]);

  // Handle actual video ended event — the only valid signal to show Enter the World
  const handleEnded = useCallback(() => {
    setIntroState('MESSAGE_READY');
  }, [setIntroState]);

  // Determine transition phase visibility
  const isBeforeTransition =
    introState === 'INTRO_PLAYING' ||
    introState === 'MESSAGE_READY';

  const isDuringTransition =
    introState === 'MESSAGE_CLICKED' ||
    introState === 'TRANSITIONING' ||
    introState === 'PORTFOLIO_REVEAL';

  // Once fully in portfolio, remove video from DOM entirely
  if (introState === 'PORTFOLIO_ACTIVE') return null;

  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden bg-black"
      style={{
        // During transition: scale up and fade out
        transform: isDuringTransition ? 'scale(1.08)' : 'scale(1)',
        opacity: isDuringTransition ? 0 : 1,
        filter: isDuringTransition ? 'blur(8px)' : 'none',
        transition: isDuringTransition
          ? 'transform 1.4s cubic-bezier(0.16,1,0.3,1), opacity 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.0s ease-out'
          : isBeforeTransition
          ? 'opacity 0.8s ease-out'
          : 'none',
      }}
    >
      <video
        ref={videoRef}
        src="/media/intro/intro-video.mp4"
        autoPlay
        playsInline
        disablePictureInPicture
        // muted controlled imperatively via useEffect to allow audio autoplay
        preload="auto"
        onEnded={handleEnded}
        // no loop — stays on final frame after ended
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      {/* Very subtle bottom gradient — only for readability of message text above */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
