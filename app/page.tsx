'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/animations/Hero';
import CyberNav from '@/components/ui/CyberNav';
import ScanLines from '@/components/effects/ScanLines';
import CyberGrid from '@/components/animations/CyberGrid';
import HologramCard from '@/components/ui/HologramCard';
import Terminal from '@/components/ui/Terminal';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

// Dynamic imports for 3D components (client-side only)
const CyberCity = dynamic(() => import('@/components/3d/CyberCity'), {
  ssr: false,
  loading: () => <div className="canvas-container bg-cyber-black" />,
});

// Sample portfolio projects
const projects = [
  {
    title: 'Neural Network Dashboard',
    description: 'Real-time AI monitoring system with cyberpunk aesthetics. Features live data visualization and neural network status tracking.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'WebGL'],
    link: '#',
  },
  {
    title: 'Crypto Trading Platform',
    description: 'Futuristic cryptocurrency trading interface with real-time market data and advanced charting capabilities.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'WebSocket', 'TailwindCSS'],
    link: '#',
  },
  {
    title: 'Holographic Portfolio',
    description: '3D interactive portfolio showcasing projects in a holographic interface with gesture controls.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    tags: ['Three.js', 'GSAP', 'React', 'Framer Motion'],
    link: '#',
  },
];

// Sample blog posts
const blogPosts = [
  {
    title: 'Building Cyberpunk UIs with Next.js',
    description: 'A comprehensive guide to creating stunning neon-themed interfaces using modern web technologies.',
    tags: ['Tutorial', 'Next.js', 'CSS'],
    link: '#',
  },
  {
    title: 'The Future of Web Animations',
    description: 'Exploring cutting-edge animation techniques using GSAP, Framer Motion, and Three.js.',
    tags: ['Animation', 'WebGL', 'Performance'],
    link: '#',
  },
  {
    title: 'Optimizing 3D Graphics for the Web',
    description: 'Best practices for implementing performant 3D graphics in React applications.',
    tags: ['Three.js', 'Optimization', 'React'],
    link: '#',
  },
];

// Tech stack / Skills
const skills = [
  { name: 'Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'React', level: 95 },
  { name: 'Three.js', level: 85 },
  { name: 'GSAP', level: 80 },
  { name: 'TailwindCSS', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'WebGL', level: 75 },
];

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-cyber-black overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <ScanLines />
      <CyberCity />

      {/* Navigation */}
      <CyberNav />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio/Projects Section */}
      <section id="portfolio" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-orbitron text-center neon-text-cyan mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-neon-cyan/70 mb-12 max-w-2xl mx-auto">
            Cutting-edge digital experiences powered by modern web technologies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <HologramCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-orbitron text-center neon-text-pink mb-12">
            Tech Stack
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Skills bars */}
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-neon-cyan font-space-mono">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: '0 0 10px currentColor',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <Terminal />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-orbitron text-center neon-text-yellow mb-4">
            Latest Articles
          </h2>
          <p className="text-center text-neon-cyan/70 mb-12 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <HologramCard
                key={index}
                title={post.title}
                description={post.description}
                tags={post.tags}
                link={post.link}
                delay={index * 0.15}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('blog')}
              className="neon-button"
            >
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass rounded-lg p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-orbitron glitch neon-text-cyan mb-8" data-text="About">
              About
            </h2>
            <div className="space-y-4 text-lg text-neon-cyan/80 leading-relaxed">
              <p>
                Welcome to the future of web development. This cyberpunk-themed portfolio template
                combines cutting-edge design with powerful modern technologies.
              </p>
              <p>
                Built with <span className="text-neon-pink font-semibold">Next.js 15</span>, featuring
                stunning <span className="text-neon-yellow font-semibold">canvas-based graphics</span>, smooth
                animations, and a complete design system that&apos;s ready to showcase your projects.
              </p>
              <p>
                Whether you&apos;re a developer, designer, or creative professional, this template provides
                everything you need to create an unforgettable digital presence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: 'Projects', value: '50+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Experience', value: '5 Years' },
                { label: 'Coffee', value: '∞' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-orbitron text-neon-pink mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neon-cyan/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-neon-cyan/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              {[
                { name: 'GitHub', icon: Github, link: 'https://github.com' },
                { name: 'Twitter', icon: Twitter, link: 'https://twitter.com' },
                { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com' },
                { name: 'Email', icon: Mail, link: 'mailto:hello@example.com' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center glass rounded-full cursor-pointer text-neon-cyan hover:text-neon-pink hover:shadow-neon-pink hover:border-neon-pink/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-cyber-black"
                    title={social.name}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-neon-cyan font-space-mono text-sm">
                &copy; {new Date().getFullYear()} Neon Flux Template. Built with Next.js 15
              </p>
              <div className="flex gap-6 text-sm text-neon-cyan/60">
                <a href="#" className="hover:text-neon-pink transition-colors cursor-pointer focus:outline-none focus:text-neon-pink">
                  Privacy
                </a>
                <a href="#" className="hover:text-neon-pink transition-colors cursor-pointer focus:outline-none focus:text-neon-pink">
                  Terms
                </a>
                <a
                  href="https://github.com/yourusername/neon-flux-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-pink transition-colors cursor-pointer focus:outline-none focus:text-neon-pink"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
