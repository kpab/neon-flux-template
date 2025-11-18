'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HologramCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  children?: ReactNode;
  delay?: number;
}

export default function HologramCard({
  title,
  description,
  image,
  tags = [],
  link,
  children,
  delay = 0,
}: HologramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative glass rounded-lg p-6 hover:scale-105 transition-all duration-300"
    >
      {/* Hologram border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <div className="relative z-10">
        {/* Image */}
        {image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-cyber-dark">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-orbitron font-bold text-neon-cyan mb-3 group-hover:text-neon-pink transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-neon-cyan/80 mb-4 leading-relaxed">{description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-space-mono bg-cyber-dark border border-neon-cyan/30 text-neon-cyan rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Custom children */}
        {children}

        {/* Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-neon-pink hover:text-neon-yellow transition-colors font-space-mono"
          >
            View Project →
          </a>
        )}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />
    </motion.div>
  );
}
