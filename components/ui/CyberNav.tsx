'use client';

import { useState, useEffect } from 'react';

export default function CyberNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'About', href: '#about' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-xl ${
        isScrolled ? 'glass backdrop-blur-md shadow-lg shadow-neon-cyan/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="font-orbitron text-2xl font-bold text-neon-cyan cursor-pointer"
          >
            <span className="neon-text-cyan">NEON</span>
            <span className="neon-text-pink ml-2">FLUX</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                  }}
                  className="font-rajdhani text-lg text-neon-cyan hover:text-neon-pink transition-colors duration-300 neon-glow-hover cursor-pointer focus:outline-none focus:text-neon-pink"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className="hidden md:block neon-button text-sm"
            onClick={() => scrollToSection('portfolio')}
          >
            View Portfolio
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neon-cyan cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-cyber-black rounded-md p-1"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass rounded-lg mt-2 mb-4 p-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                    className="block font-rajdhani text-lg text-neon-cyan hover:text-neon-pink transition-colors duration-300 cursor-pointer focus:outline-none focus:text-neon-pink"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
