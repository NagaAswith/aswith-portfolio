'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';

/**
 * HeroCamera — Cinematic 3D Flight Camera
 *
 * Three synchronized inputs:
 *   1. Intro reveal: eases in from Z=8.5
 *   2. Scroll flight: camera travels through depth as user scrolls
 *   3. Mouse parallax: subtle depth-layered environmental response
 *
 * Idle breathe: very slight Y oscillation when at top of page
 */
export function HeroCamera() {
  const targetPosRef  = useRef(new THREE.Vector3(0, 0, 5.2));
  const currentPosRef = useRef(new THREE.Vector3(0, 0, 8.5));
  const targetLookRef  = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookRef = useRef(new THREE.Vector3(0, 0, 0));

  const scrollProgressRef = useRef(0);

  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const introState    = useIntroStore((state) => state.introState);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current =
        maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    const { pointer, camera, clock } = state;

    const isRevealing =
      introState === 'TRANSITIONING' ||
      introState === 'PORTFOLIO_REVEAL';

    const p = scrollProgressRef.current;
    const t = clock.elapsedTime;

    // ── Base scroll flight ──────────────────────────────────────
    // Y descends as we scroll. Z pulls back mid-scroll for expanded perspective.
    const scrollY = -p * 2.4;
    const scrollX = Math.sin(p * Math.PI * 1.2) * 0.22;
    const scrollZ = isRevealing
      ? 6.5
      : 5.0 + Math.sin(p * Math.PI * 0.8) * 0.9;

    // ── Idle environmental breathe (only near top of page) ──────
    const idleInfluence = 1.0 - Math.min(p * 6, 1.0); // fades out after first ~16% scroll
    const idleDrift = reducedMotion ? 0 : Math.sin(t * 0.14) * 0.04 * idleInfluence;

    // ── Mouse parallax — restrained ────────────────────────────
    const mx = reducedMotion ? 0 : pointer.x * 0.28;
    const my = reducedMotion ? 0 : pointer.y * 0.20;

    targetPosRef.current.set(
      scrollX + mx,
      scrollY + my + idleDrift,
      scrollZ
    );

    // Look target follows camera descent, looks slightly into the horizon
    targetLookRef.current.set(
      mx * 0.15,
      scrollY * 0.82 + my * 0.12,
      -3.5
    );

    const lerpFactor = Math.min(delta * (isRevealing ? 1.2 : 2.2), 1);
    currentPosRef.current.lerp(targetPosRef.current, lerpFactor);
    currentLookRef.current.lerp(targetLookRef.current, lerpFactor);

    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentLookRef.current);
  });

  return null;
}
