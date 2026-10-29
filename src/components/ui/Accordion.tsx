import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, ShieldAlert } from 'lucide-react';
import { FAQItem } from '../../types';

export interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn('space-y-3.5', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headingId = `heading-${item.id}`;
        const contentId = `content-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'border rounded-2xl transition-all duration-200 overflow-hidden',
              isOpen
                ? 'bg-slate-900 border-cyan-500/40 shadow-subtle'
                : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-750 hover:bg-slate-900/50'
            )}
          >
            <button
              type="button"
              id={headingId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between text-right p-5 sm:p-6 text-sm sm:text-base font-semibold text-slate-100 hover:text-cyan-300 transition-colors gap-4"
            >
              <div className="flex items-center gap-3">
                {item.isClarification && (
                  <span
                    className="shrink-0 text-amber-400 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20"
                    title="توضيح جوهري"
                  >
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                )}
                <span className="leading-snug">{item.question}</span>
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200',
                  isOpen && 'transform -rotate-180 text-cyan-400'
                )}
              />
            </button>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headingId}
                className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 font-normal"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
