'use client';

import React from 'react';
import { useIntroStore } from '@/store/useIntroStore';
import { IntroVideo } from './IntroVideo';
import { IntroControls } from './IntroControls';
import { IntroTransition } from './IntroTransition';
import { IntroMessage } from './IntroMessage';

export function IntroExperience() {
  const introState = useIntroStore((state) => state.introState);

  // When fully in portfolio, this entire layer is gone
  if (introState === 'PORTFOLIO_ACTIVE') return null;

  return (
    <div
      className="fixed inset-0 z-10"
      style={{
        // Block pointer events during the cinematic transition sequence
        pointerEvents:
          introState === 'MESSAGE_CLICKED' ||
          introState === 'TRANSITIONING' ||
          introState === 'PORTFOLIO_REVEAL'
            ? 'none'
            : 'auto',
      }}
    >
      {/* 1. Video — sits behind everything */}
      <IntroVideo />

      {/* 2. Minimal sound control */}
      <IntroControls />

      {/* 3. Cinematic transition FX overlay */}
      <IntroTransition />

      {/* 4. "Enter the World" interaction — appears on video end */}
      <IntroMessage />
    </div>
  );
}
