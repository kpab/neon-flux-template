'use client';

import { ButtonHTMLAttributes } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function NeonButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: NeonButtonProps) {
  const baseClasses = 'neon-button neon-pulse';
  const variantClasses = variant === 'primary' ? '' : 'neon-border-pink text-neon-pink';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
