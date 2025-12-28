'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Intersection Observer to pause when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let isRunning = true;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system - reduced count for better performance
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }> = [];

    const colors = ['#FF10F0', '#00FFF0', '#FFFF00'];
    const particleCount = 50; // Reduced from 80

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Spatial grid for O(n) neighbor lookup
    const CELL_SIZE = 150;
    const getGridKey = (x: number, y: number) =>
      `${Math.floor(x / CELL_SIZE)},${Math.floor(y / CELL_SIZE)}`;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Build spatial grid
      const grid: Map<string, number[]> = new Map();
      particles.forEach((particle, i) => {
        const key = getGridKey(particle.x, particle.y);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(i);
      });

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse repulsion
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.x -= (dx / distance) * 2;
          particle.y -= (dy / distance) * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections - only check neighboring cells
        const cellX = Math.floor(particle.x / CELL_SIZE);
        const cellY = Math.floor(particle.y / CELL_SIZE);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const neighborKey = `${cellX + ox},${cellY + oy}`;
            const neighbors = grid.get(neighborKey);
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (i >= j) continue; // Avoid duplicate lines

              const other = particles[j];
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(0, 255, 240, ${0.3 * (1 - dist / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
        }
      });

      if (isRunning) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
