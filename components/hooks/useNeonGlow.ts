'use client';

import { useState, useCallback } from 'react';

export function useNeonGlow() {
  const [isGlowing, setIsGlowing] = useState(false);

  const startGlow = useCallback(() => {
    setIsGlowing(true);
  }, []);

  const stopGlow = useCallback(() => {
    setIsGlowing(false);
  }, []);

  const toggleGlow = useCallback(() => {
    setIsGlowing((prev) => !prev);
  }, []);

  const glowClasses = isGlowing
    ? 'shadow-neon-cyan brightness-125 scale-105'
    : '';

  return {
    isGlowing,
    startGlow,
    stopGlow,
    toggleGlow,
    glowClasses,
  };
}
