'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useIntroStore } from '@/store/useIntroStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

// Safety ceiling for video failure recovery (only triggers if video completely hangs/fails to emit ended or error)
const FAILSAFE_DURATION = 90000;

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

  const [playbackFailed, setPlaybackFailed] = useState<boolean>(false);
  const hasEndedRef = useRef<boolean>(false);

  // Responsive device/orientation detection (phones, tablets, and desktop)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isPortraitPhone =
        window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches ||
        (window.innerWidth <= 768 && window.innerHeight > window.innerWidth);
      const isPortraitTablet =
        window.innerWidth > 768 &&
        window.innerWidth <= 1024 &&
        window.innerHeight > window.innerWidth;
      return isPortraitPhone || isPortraitTablet;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px) and (orientation: portrait)');
    const updateOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallOrTablet = window.innerWidth <= 1024;
      setIsMobile(mql.matches || (isSmallOrTablet && isPortrait));
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

  // Sync muted state to video element imperatively
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle actual video ended event — the authoritative signal to reveal "Enter the World"
  const handleEnded = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setIntroState('MESSAGE_READY');
  }, [setIntroState]);

  // Handle media playback error gracefully so screen is never permanently blocked
  const handlePlaybackError = useCallback(() => {
    console.warn('Intro video playback error encountered. Activating graceful fallback.');
    setPlaybackFailed(true);
    handleEnded();
  }, [handleEnded]);

  // Attempt playback on mount with unmuted sound first (Requirement 4.2)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    hasEndedRef.current = false;
    setPlaybackFailed(false);

    const startPlayback = async () => {
      try {
        // Attempt unmuted playback directly on both desktop and mobile
        video.muted = false;
        await video.play();
        setMuted(false);
      } catch (err: unknown) {
        // Autoplay with sound denied by browser policy -> fall back cleanly to muted playback
        console.info('Unmuted autoplay restricted by browser policy; starting muted.', err);
        try {
          video.muted = true;
          setMuted(true);
          await video.play();
        } catch (retryErr: unknown) {
          console.warn('Muted playback also failed, enabling recovery fallback.', retryErr);
          handlePlaybackError();
        }
      }
    };

    startPlayback();

    // Safe fallback timer: If playback stalls or metadata fails to fire ended, recover cleanly after generous upper bound
    const failsafeTimer = setTimeout(() => {
      if (!hasEndedRef.current) {
        console.info('Intro safe fallback timer triggered.');
        handleEnded();
      }
    }, 25000);

    return () => clearTimeout(failsafeTimer);
  }, [activeVideoUrl, setMuted, handlePlaybackError, handleEnded]);

  // If initial audio autoplay was restricted, unmute upon user's first natural interaction
  useEffect(() => {
    if (introState !== 'INTRO_PLAYING' || !isMuted) return;

    const handleFirstGesture = () => {
      const video = videoRef.current;
      if (video && video.muted) {
        video.muted = false;
        setMuted(false);
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    return () => window.removeEventListener('pointerdown', handleFirstGesture);
  }, [introState, isMuted, setMuted]);

  // Failsafe timer: only fires if video fails to complete within generous timeout
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (useIntroStore.getState().introState === 'INTRO_PLAYING' && !hasEndedRef.current) {
        console.warn('Intro video failsafe timer reached. Transitioning to ready state.');
        handleEnded();
      }
    }, FAILSAFE_DURATION);
    return () => clearTimeout(failsafeTimer);
  }, [handleEnded]);

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

  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden bg-black"
      style={{
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

      {/* Playback Failure Recovery Notice */}
      {playbackFailed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/80 backdrop-blur-md">
          <p className="text-sm font-mono text-cyan-400 mb-4">
            Direct video playback unavailable on this device.
          </p>
          <button
            onClick={handleEnded}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs cursor-pointer hover:bg-cyan-300 transition-colors"
          >
            Continue to Portfolio
          </button>
        </div>
      )}

      {/* Subtle bottom gradient for readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
