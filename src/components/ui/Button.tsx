import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl active:scale-[0.98]';

    const variants = {
      primary:
        'bg-gradient-to-r from-mawthiq-700 via-mawthiq-600 to-cyan-500 hover:from-mawthiq-800 hover:to-cyan-400 text-white shadow-glow-primary border border-cyan-400/40 font-semibold',
      secondary:
        'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-750 hover:border-slate-700 shadow-sm font-medium',
      accent:
        'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-glow-gold border border-amber-300/40',
      outline:
        'border border-slate-750 hover:border-slate-600 text-slate-200 hover:bg-slate-900/60 hover:text-white',
      ghost:
        'text-slate-300 hover:text-white hover:bg-slate-850',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>جاري المعالجة...</span>
          </>
        ) : (
          <>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            <span>{children}</span>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
