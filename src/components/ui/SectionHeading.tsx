import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'primary' | 'gold' | 'emerald' | 'slate';
  title: string;
  subtitle?: string;
  align?: 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'primary',
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto' : 'text-right',
        className
      )}
    >
      {badge && (
        <div className="mb-3.5 inline-block">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-[1.3]',
          align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
