import React from 'react';
import { cn } from '../../lib/utils';
import mawthiqLogoImg from '../../assets/mawthiq-logo.jpg';

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'full' | 'compact' | 'light-container';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  showSubtitle = true,
  variant = 'full',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('inline-flex items-center gap-3 select-none text-right', className)}>
      {/* Official Mawthiq Emblem Container */}
      <div
        className={cn(
          'relative rounded-xl overflow-hidden bg-white p-0.5 shadow-md shrink-0 border border-slate-750 transition-transform group-hover:scale-105 duration-200',
          iconSizes[size]
        )}
      >
        <img
          src={mawthiqLogoImg}
          alt="شعار مَوْثِق الرسمي"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-bold tracking-tight text-white leading-none font-heading',
                textSizes[size]
              )}
            >
              مَوْثِق
            </span>
            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded leading-none">
              جسر الخبرة
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[11px] text-slate-400 mt-1 font-normal tracking-wide">
              مبادرة استقطاب شركاء التأسيس والبناء
            </span>
          )}
        </div>
      )}
    </div>
  );
};
