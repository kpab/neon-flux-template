'use client';

import { useEffect, useRef } from 'react';

export default function CyberCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Building data
    interface Building {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      windows: Array<{ x: number; y: number; lit: boolean }>;
    }

    const buildings: Building[] = [];
    const colors = ['#FF10F0', '#00FFF0', '#B026FF', '#00D4FF'];
    const buildingCount = 30;

    // Generate buildings
    for (let i = 0; i < buildingCount; i++) {
      const width = 40 + Math.random() * 60;
      const height = 100 + Math.random() * 300;
      const x = (canvas.width / buildingCount) * i;
      const y = canvas.height - height;
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Generate windows
      const windows = [];
      const windowRows = Math.floor(height / 20);
      const windowCols = Math.floor(width / 15);

      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          windows.push({
            x: x + col * 15 + 5,
            y: y + row * 20 + 5,
            lit: Math.random() > 0.3,
          });
        }
      }

      buildings.push({ x, y, width, height, color, windows });
    }

    // Animation variables
    let animationFrame: number;
    let time = 0;

    // Stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6,
        size: Math.random() * 2,
        opacity: Math.random(),
      });
    }

    // Grid
    const gridSpacing = 50;

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Clear with dark background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0D0221');
      gradient.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 2 + star.x) * 0.5})`;
        ctx.fill();
      });

      // Draw perspective grid
      ctx.strokeStyle = 'rgba(0, 255, 240, 0.1)';
      ctx.lineWidth = 1;

      // Horizontal lines (perspective)
      const horizon = canvas.height * 0.6;
      for (let i = 0; i < 10; i++) {
        const y = horizon + i * 30;
        const perspective = (y - horizon) / (canvas.height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(0, 255, 240, ${0.05 + perspective * 0.1})`;
        ctx.stroke();
      }

      // Vertical lines (converging to center)
      const vanishingPointX = canvas.width / 2;
      for (let i = -10; i <= 10; i++) {
        const x = canvas.width / 2 + i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(vanishingPointX + (x - vanishingPointX) * 0.3, horizon);
        ctx.strokeStyle = 'rgba(0, 255, 240, 0.05)';
        ctx.stroke();
      }

      // Draw buildings
      buildings.forEach((building) => {
        // Building outline
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
        ctx.fillRect(building.x, building.y, building.width, building.height);

        // Neon border with glow
        ctx.strokeStyle = building.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = building.color;
        ctx.shadowBlur = 10;
        ctx.strokeRect(building.x, building.y, building.width, building.height);
        ctx.shadowBlur = 0;

        // Windows
        building.windows.forEach((window) => {
          if (window.lit) {
            const flicker = Math.random() > 0.95 ? 0.5 : 1;
            ctx.fillStyle = `rgba(0, 255, 240, ${0.6 * flicker})`;
            ctx.fillRect(window.x, window.y, 8, 8);

            // Window glow
            ctx.shadowColor = '#00FFF0';
            ctx.shadowBlur = 5;
            ctx.fillRect(window.x, window.y, 8, 8);
            ctx.shadowBlur = 0;
          }
        });

        // Occasional antenna on top
        if (Math.random() > 0.7) {
          const antennaX = building.x + building.width / 2;
          const antennaHeight = 20;

          ctx.strokeStyle = building.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(antennaX, building.y);
          ctx.lineTo(antennaX, building.y - antennaHeight);
          ctx.stroke();

          // Blinking light
          if (Math.sin(time * 5) > 0.5) {
            ctx.fillStyle = '#FF10F0';
            ctx.shadowColor = '#FF10F0';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(antennaX, building.y - antennaHeight, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Scanline effect
      ctx.fillStyle = 'rgba(0, 255, 240, 0.02)';
      const scanlineY = (time * 100) % canvas.height;
      ctx.fillRect(0, scanlineY, canvas.width, 2);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}
