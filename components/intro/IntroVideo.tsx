'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useIntroStore } from '@/store/useIntroStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const introState = useIntroStore((state) => state.introState);
  const isMuted = useIntroStore((state) => state.isMuted);
  const setMuted = useIntroStore((state) => state.setMuted);
  const setIntroState = useIntroStore((state) => state.setIntroState);

  // Authoritative CMS media mappings
  const media = usePortfolioContent((state) => state.media);
  const desktopVideoUrl = resolveSupabaseMediaUrl(
    media?.introVideo || '/media/intro/intro-video.mp4'
  );
  const mobileVideoUrl = resolveSupabaseMediaUrl(
    media?.mobileIntroVideo || '/media/mobileintro/Mobileintro.mp4'
  );

  // Responsive device/orientation detection (mobile portrait vs desktop/landscape)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches ||
        (window.innerWidth <= 768 && window.innerHeight > window.innerWidth)
      );
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px) and (orientation: portrait)');
    const updateOrientation = () => {
      setIsMobile(
        mql.matches || (window.innerWidth <= 768 && window.innerHeight > window.innerWidth)
      );
    };
    updateOrientation();
    mql.addEventListener('change', updateOrientation);
    window.addEventListener('resize', updateOrientation);
    return () => {
      mql.removeEventListener('change', updateOrientation);
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  const activeVideoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;

  // Sync muted state to video element imperatively — avoids re-renders
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle actual video ended event or error — the only valid signal to show Enter the World
  const handleEnded = useCallback(() => {
    setIntroState('MESSAGE_READY');
  }, [setIntroState]);

  // Attempt playback on mount with robust mobile and desktop handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted state is active on mount for mobile autoplay compliance
    video.muted = isMuted;

    const startPlayback = async () => {
      try {
        await video.play();

        // Check if on mobile device
        const isMobileDevice =
          typeof navigator !== 'undefined' &&
          /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (!isMobileDevice && !isMuted) {
          // On desktop, attempt unmuting if policy allows
          video.muted = false;
          video.play().catch(() => {
            // Audio blocked on desktop; retain muted
            video.muted = true;
            setMuted(true);
          });
        } else if (isMobileDevice && !isMuted) {
          // On mobile, retain muted by default per OS policy
          setMuted(true);
        }
      } catch (err: unknown) {
        // Browser autoplay policy blocked initial attempt.
        // Fall back to strictly muted playback.
        setMuted(true);
        video.muted = true;
        video.play().catch((retryErr: unknown) => {
          console.warn('Intro video: playback unavailable, activating fallback.', retryErr);
          // Video cannot play (e.g. low power mode) — transition immediately to message ready
          handleEnded();
        });
      }
    };

    startPlayback();
  }, [activeVideoUrl, isMuted, setMuted, handleEnded]);

  // Failsafe: if video fails to load/play or stalls, ensure the experience does not hang indefinitely on black screen
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (useIntroStore.getState().introState === 'INTRO_PLAYING') {
        setIntroState('MESSAGE_READY');
      }
    }, 10000);
    return () => clearTimeout(failsafeTimer);
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

  const resolvedSource = activeVideoUrl;
  const handlePlaybackError = handleEnded;

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
        key={resolvedSource}
        src={resolvedSource}
        data-testid="intro-video-element"
        data-active-source={resolvedSource}
        data-viewport-mode={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        playsInline
        webkit-playsinline="true"
        muted
        disablePictureInPicture
        preload="auto"
        onEnded={handleEnded}
        onError={handlePlaybackError}
        // no loop — stays on final frame after ended
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      >
        <source media="(max-width: 768px) and (orientation: portrait)" src={mobileVideoUrl} type="video/mp4" />
        <source media="(min-width: 769px), (orientation: landscape)" src={desktopVideoUrl} type="video/mp4" />
        <source src={desktopVideoUrl} type="video/mp4" />
      </video>
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

