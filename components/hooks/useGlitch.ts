'use client';

import { useEffect, useState } from 'react';

interface UseGlitchOptions {
  interval?: number;
  duration?: number;
}

export function useGlitch(options: UseGlitchOptions = {}) {
  const { interval = 3000, duration = 300 } = options;
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, duration);
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [interval, duration]);

  return isGlitching;
}
