'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/animations/Hero';
import CyberNav from '@/components/ui/CyberNav';
import ScanLines from '@/components/effects/ScanLines';
import CyberGrid from '@/components/animations/CyberGrid';

// Dynamic imports for 3D components (client-side only)
const CyberCity = dynamic(() => import('@/components/3d/CyberCity'), {
  ssr: false,
  loading: () => <div className="canvas-container bg-cyber-black" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cyber-black overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <ScanLines />
      <CyberCity />

      {/* Navigation */}
      <CyberNav />

      {/* Main Content */}
      <Hero />

      {/* Additional sections will be added here */}
      <section id="features" className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-orbitron text-center neon-text-cyan mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "3D Graphics", desc: "Powered by Three.js" },
              { title: "Animations", desc: "GSAP & Framer Motion" },
              { title: "Neon Effects", desc: "Custom cyberpunk styling" },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass p-8 rounded-lg neon-border hover:neon-border-pink transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <h3 className="text-2xl font-orbitron text-neon-pink mb-4">
                  {feature.title}
                </h3>
                <p className="text-neon-cyan">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-orbitron glitch neon-text-pink mb-8" data-text="About Neon Flux">
            About Neon Flux
          </h2>
          <p className="text-xl text-neon-cyan max-w-3xl mx-auto leading-relaxed">
            A cutting-edge Next.js template designed for the cyberpunk era.
            Featuring stunning 3D graphics, smooth animations, and a complete
            design system ready for your next futuristic project.
          </p>
        </div>
      </section>

      <footer className="relative z-10 py-8 border-t border-neon-cyan/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neon-cyan font-space-mono">
            &copy; {new Date().getFullYear()} Neon Flux Template. Built with Next.js 15
          </p>
        </div>
      </footer>
    </main>
  );
}
