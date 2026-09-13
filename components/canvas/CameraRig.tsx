'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/store/usePerformanceStore';
import { useIntroStore } from '@/store/useIntroStore';

export function CameraRig() {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  const currentPos = useRef(new THREE.Vector3(0, 0, 12));
  const reducedMotion = usePerformanceStore((state) => state.reducedMotion);
  const introState = useIntroStore((state) => state.introState);

  useFrame((state, delta) => {
    const { pointer, camera } = state;

    // Determine base Z camera position based on intro state
    let baseZ = 5;
    if (introState === 'INTRO_PLAYING' || introState === 'MESSAGE_READY') {
      baseZ = 9;
    } else if (introState === 'MESSAGE_CLICKED' || introState === 'TRANSITIONING') {
      baseZ = 3.5; // Zoom in during transition
    } else {
      baseZ = 5;
    }

    if (reducedMotion) {
      targetPos.current.set(0, 0, baseZ);
    } else {
      // Mouse parallax offsets
      const mouseX = pointer.x * 0.5;
      const mouseY = pointer.y * 0.5;
      targetPos.current.set(mouseX, mouseY, baseZ);
    }

    // Smooth damping (lerp) camera position
    const dampingSpeed = delta * 3.5;
    currentPos.current.lerp(targetPos.current, Math.min(dampingSpeed, 1));
    camera.position.copy(currentPos.current);

    // Look slightly towards center
    camera.lookAt(0, 0, 0);
  });

  return null;
}
