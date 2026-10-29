import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'gold' | 'emerald' | 'slate' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const variants = {
    primary: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/80',
    gold: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    slate: 'bg-slate-900 text-slate-300 border-slate-800',
    outline: 'bg-transparent text-slate-300 border-slate-750',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-xs md:text-sm px-3.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border shadow-xs select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
