'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { useMusicStore } from '@/store/useMusicStore';
import { useIntroStore } from '@/store/useIntroStore';

export function MusicControlWidget() {
  const introState = useIntroStore((state) => state.introState);
  const isPortfolioActive = introState === 'PORTFOLIO_ACTIVE';

  const isPlaying = useMusicStore((state) => state.isPlaying);
  const isMuted = useMusicStore((state) => state.isMuted);
  const volume = useMusicStore((state) => state.volume);
  const togglePlay = useMusicStore((state) => state.togglePlay);
  const toggleMuted = useMusicStore((state) => state.toggleMuted);
  const setVolume = useMusicStore((state) => state.setVolume);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Only render once the visitor has entered the main website
  if (!isPortfolioActive) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 pointer-events-auto"
      role="region"
      aria-label="Background music controls"
    >
      <div className="flex items-center gap-1.5 p-1.5 bg-zinc-950/80 backdrop-blur-xl border border-white/15 rounded-full shadow-2xl hover:border-cyan-500/40 transition-all">
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>

        {/* Mute / Unmute Button */}
        <button
          onClick={toggleMuted}
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Waveform Animation / Status */}
        <button
          onClick={() => setShowVolumeSlider((prev) => !prev)}
          aria-label="Toggle volume slider"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Music className="w-3 h-3 text-cyan-400" />
          {isPlaying && !isMuted ? (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
            </span>
          ) : (
            <span>{isMuted ? 'Muted' : isPlaying ? 'Playing' : 'Paused'}</span>
          )}
        </button>

        {/* Volume Slider Popup */}
        {showVolumeSlider && (
          <div className="flex items-center gap-2 pl-2 pr-3 py-1 border-l border-white/10 animate-fade-in">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Background music volume"
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] font-mono text-white/50 w-7 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
