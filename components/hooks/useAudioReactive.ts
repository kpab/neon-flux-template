'use client';

import { useEffect, useState, useRef } from 'react';

interface AudioReactiveData {
  volume: number;
  frequency: number;
}

export function useAudioReactive(enabled: boolean = false) {
  const [audioData, setAudioData] = useState<AudioReactiveData>({
    volume: 0,
    frequency: 0,
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 256;
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

        const updateAudioData = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          const volume =
            dataArrayRef.current.reduce((sum, value) => sum + value, 0) /
            dataArrayRef.current.length;

          const frequency = dataArrayRef.current[0];

          setAudioData({ volume: volume / 255, frequency: frequency / 255 });

          requestAnimationFrame(updateAudioData);
        };

        updateAudioData();
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };

    setupAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  return audioData;
}
