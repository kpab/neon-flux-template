'use client';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <h1
      className={`glitch neon-text-pink ${className}`}
      data-text={text}
    >
      {text}
    </h1>
  );
}
