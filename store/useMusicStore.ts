'use client';

import { create } from 'zustand';

interface MusicStore {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number; // 0 to 1
  trackUrl: string;
  isEnabled: boolean;
  hasStarted: boolean;
  userPaused: boolean;

  setPlaying: (playing: boolean) => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setTrackUrl: (url: string) => void;
  setEnabled: (enabled: boolean) => void;
  startMusicOnEnter: () => void;
}

const DEFAULT_TRACK = '/media/back_music/pirate.mp3';
const DEFAULT_VOLUME = 0.35; // 35% comfortable default level

export const useMusicStore = create<MusicStore>((set, get) => {
  // Load saved preferences if in browser
  let initialMuted = false;
  let initialVolume = DEFAULT_VOLUME;
  let initialEnabled = true;

  if (typeof window !== 'undefined') {
    try {
      const savedMuted = localStorage.getItem('aswith_music_muted');
      if (savedMuted !== null) initialMuted = savedMuted === 'true';

      const savedVol = localStorage.getItem('aswith_music_volume');
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) initialVolume = parsed;
      }

      const savedEnabled = localStorage.getItem('aswith_music_enabled');
      if (savedEnabled !== null) initialEnabled = savedEnabled === 'true';
    } catch {}
  }

  return {
    isPlaying: false,
    isMuted: initialMuted,
    volume: initialVolume,
    trackUrl: DEFAULT_TRACK,
    isEnabled: initialEnabled,
    hasStarted: false,
    userPaused: false,

    setPlaying: (isPlaying) => set({ isPlaying }),

    setMuted: (isMuted) => {
      set({ isMuted });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('aswith_music_muted', String(isMuted));
        } catch {}
      }
    },

    toggleMuted: () => {
      const next = !get().isMuted;
      set({ isMuted: next });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('aswith_music_muted', String(next));
        } catch {}
      }
    },

    togglePlay: () => {
      const { isPlaying } = get();
      if (isPlaying) {
        set({ isPlaying: false, userPaused: true });
      } else {
        set({ isPlaying: true, userPaused: false, hasStarted: true });
      }
    },

    setVolume: (volume) => {
      const clamped = Math.min(1, Math.max(0, volume));
      set({ volume: clamped, isMuted: clamped === 0 ? true : get().isMuted });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('aswith_music_volume', String(clamped));
        } catch {}
      }
    },

    setTrackUrl: (trackUrl) => set({ trackUrl }),

    setEnabled: (isEnabled) => {
      set({ isEnabled, isPlaying: isEnabled ? get().isPlaying : false });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('aswith_music_enabled', String(isEnabled));
        } catch {}
      }
    },

    startMusicOnEnter: () => {
      const { isEnabled, userPaused } = get();
      if (!isEnabled || userPaused) return;
      set({ hasStarted: true, isPlaying: true });
    },
  };
});
