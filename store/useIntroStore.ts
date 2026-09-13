import { create } from 'zustand';

export type IntroState =
  | 'INTRO_PLAYING'
  | 'MESSAGE_READY'
  | 'MESSAGE_CLICKED'
  | 'TRANSITIONING'
  | 'PORTFOLIO_REVEAL'
  | 'PORTFOLIO_ACTIVE';

interface IntroStore {
  introState: IntroState;
  isMuted: boolean;

  setIntroState: (state: IntroState) => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
  triggerMessageClick: () => void;
}

export const useIntroStore = create<IntroStore>((set, get) => ({
  introState: 'INTRO_PLAYING',
  /**
   * Audio default: UNMUTED.
   * IntroVideo.tsx will attempt autoplay with audio and fall back to muted
   * silently if the browser's autoplay policy blocks it.
   */
  isMuted: false,

  setIntroState: (introState) => set({ introState }),
  setMuted: (isMuted) => set({ isMuted }),
  toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),

  triggerMessageClick: () => {
    const { introState } = get();
    if (introState !== 'MESSAGE_READY') return;

    // Step 1 — immediately mark as clicked (starts visual FX + hides message)
    set({ introState: 'MESSAGE_CLICKED' });

    // Step 2 — 600ms: portal bloom has expanded, begin black hold
    setTimeout(() => {
      set({ introState: 'TRANSITIONING' });
    }, 600);

    // Step 3 — 1400ms: black hold complete, reveal 3D canvas beneath
    setTimeout(() => {
      set({ introState: 'PORTFOLIO_REVEAL' });
    }, 1400);

    // Step 4 — 2400ms: reveal animation complete, portfolio fully active
    setTimeout(() => {
      set({ introState: 'PORTFOLIO_ACTIVE' });
    }, 2400);
  },
}));
