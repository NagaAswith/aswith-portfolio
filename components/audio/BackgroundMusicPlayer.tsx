'use client';

import React, { useEffect, useRef } from 'react';
import { useMusicStore } from '@/store/useMusicStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

export function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const isPlaying = useMusicStore((state) => state.isPlaying);
  const isMuted = useMusicStore((state) => state.isMuted);
  const volume = useMusicStore((state) => state.volume);
  const isEnabled = useMusicStore((state) => state.isEnabled);
  const hasStarted = useMusicStore((state) => state.hasStarted);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const setTrackUrl = useMusicStore((state) => state.setTrackUrl);

  // Authoritative CMS media mapping
  const media = usePortfolioContent((state) => state.media);
  const rawTrack = (media as any)?.backgroundMusic || '/media/back_music/pirate.mp3';
  const resolvedTrackUrl = resolveSupabaseMediaUrl(rawTrack);

  useEffect(() => {
    if (resolvedTrackUrl) {
      setTrackUrl(resolvedTrackUrl);
    }
  }, [resolvedTrackUrl, setTrackUrl]);

  // Sync volume & muted state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Handle play / pause based on store state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && isEnabled && hasStarted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Background music autoplay blocked or waiting for user interaction:', err);
          setPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isEnabled, hasStarted, setPlaying]);

  return (
    <audio
      ref={audioRef}
      src={resolvedTrackUrl || '/media/back_music/pirate.mp3'}
      loop
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
}
