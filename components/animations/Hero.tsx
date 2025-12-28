'use client';

import { useEffect, useState } from 'react';
import GlitchText from './GlitchText';
import NeonButton from '../ui/NeonButton';
import Particles from '../effects/Particles';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Hide scroll indicator after user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center pt-20"
    >
      {/* Particles Background */}
      {mounted && <Particles />}

      <div className="container mx-auto px-4 text-center">
        <div className="space-y-8 fade-in">
          {/* Main Title with Glitch Effect */}
          <GlitchText
            text="NEON FLUX"
            className="text-5xl md:text-7xl lg:text-9xl font-orbitron font-bold"
          />

          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl font-rajdhani text-neon-cyan text-shadow-neon-cyan">
            Cyberpunk Portfolio Template
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-neon-cyan/80 max-w-2xl mx-auto font-space-mono">
            Showcase your projects with stunning graphics, smooth animations,
            and cyberpunk aesthetics. Built with Next.js 15 & TypeScript.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <NeonButton
              variant="primary"
              onClick={() => scrollToSection('portfolio')}
            >
              View Portfolio
            </NeonButton>
            <NeonButton
              variant="secondary"
              onClick={() => scrollToSection('blog')}
            >
              Read Blog
            </NeonButton>
          </div>

          {/* Scroll Indicator - hidden after scroll */}
          {showScrollIndicator && (
            <div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer transition-opacity duration-300"
              onClick={() => scrollToSection('portfolio')}
            >
              <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
                <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
