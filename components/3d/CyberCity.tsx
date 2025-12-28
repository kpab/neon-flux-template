'use client';

import { useEffect, useRef } from 'react';

export default function CyberCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create initial gradient
    let bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#0D0221');
    bgGradient.addColorStop(1, '#0A0A0A');

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-cache gradient on resize
      bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#0D0221');
      bgGradient.addColorStop(1, '#0A0A0A');
    };
    window.addEventListener('resize', setCanvasSize);

    // Building data with antenna flag pre-determined
    interface Building {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      windows: Array<{ x: number; y: number; lit: boolean }>;
      hasAntenna: boolean;
    }

    const buildings: Building[] = [];
    const colors = ['#FF10F0', '#00FFF0', '#B026FF', '#00D4FF'];
    const buildingCount = 25; // Reduced for performance

    // Generate buildings
    for (let i = 0; i < buildingCount; i++) {
      const bWidth = 40 + Math.random() * 60;
      const bHeight = 100 + Math.random() * 300;
      const x = (width / buildingCount) * i;
      const y = height - bHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Generate windows
      const windows = [];
      const windowRows = Math.floor(bHeight / 20);
      const windowCols = Math.floor(bWidth / 15);

      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          windows.push({
            x: x + col * 15 + 5,
            y: y + row * 20 + 5,
            lit: Math.random() > 0.3,
          });
        }
      }

      buildings.push({
        x, y, width: bWidth, height: bHeight, color, windows,
        hasAntenna: Math.random() > 0.7 // Pre-determine antenna
      });
    }

    // Animation variables
    let animationFrame: number;
    let time = 0;

    // Stars - reduced count
    const stars: Array<{ x: number; y: number; size: number; phaseOffset: number }> = [];
    for (let i = 0; i < 60; i++) { // Reduced from 100
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6,
        size: Math.random() * 2,
        phaseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Grid
    const gridSpacing = 50;

    // If reduced motion, draw static scene once
    if (prefersReducedMotion) {
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Static stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
      });

      // Static buildings
      buildings.forEach((building) => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
        ctx.fillRect(building.x, building.y, building.width, building.height);
        ctx.strokeStyle = building.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(building.x, building.y, building.width, building.height);

        building.windows.forEach((win) => {
          if (win.lit) {
            ctx.fillStyle = 'rgba(0, 255, 240, 0.6)';
            ctx.fillRect(win.x, win.y, 8, 8);
          }
        });
      });
      return;
    }

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Clear with cached gradient
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars with pre-calculated phase
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 2 + star.phaseOffset) * 0.5})`;
        ctx.fill();
      }

      // Draw perspective grid
      ctx.lineWidth = 1;
      const horizon = height * 0.6;

      // Horizontal lines
      for (let i = 0; i < 10; i++) {
        const y = horizon + i * 30;
        const perspective = (y - horizon) / (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(0, 255, 240, ${0.05 + perspective * 0.1})`;
        ctx.stroke();
      }

      // Vertical lines
      const vanishingPointX = width / 2;
      for (let i = -10; i <= 10; i++) {
        const x = width / 2 + i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(vanishingPointX + (x - vanishingPointX) * 0.3, horizon);
        ctx.strokeStyle = 'rgba(0, 255, 240, 0.05)';
        ctx.stroke();
      }

      // Draw buildings - batch similar operations
      ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
      for (let i = 0; i < buildings.length; i++) {
        const building = buildings[i];
        ctx.fillRect(building.x, building.y, building.width, building.height);
      }

      // Building borders and details
      for (let i = 0; i < buildings.length; i++) {
        const building = buildings[i];

        // Neon border
        ctx.strokeStyle = building.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = building.color;
        ctx.shadowBlur = 10;
        ctx.strokeRect(building.x, building.y, building.width, building.height);
        ctx.shadowBlur = 0;

        // Windows - batch by lit state
        ctx.fillStyle = 'rgba(0, 255, 240, 0.6)';
        for (let j = 0; j < building.windows.length; j++) {
          const win = building.windows[j];
          if (win.lit) {
            ctx.fillRect(win.x, win.y, 8, 8);
          }
        }

        // Antenna (pre-determined)
        if (building.hasAntenna) {
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
      }

      // Scanline effect
      ctx.fillStyle = 'rgba(0, 255, 240, 0.02)';
      const scanlineY = (time * 100) % height;
      ctx.fillRect(0, scanlineY, width, 2);

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
