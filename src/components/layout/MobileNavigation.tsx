import React, { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { Button } from '../ui/Button';

interface NavItem {
  label: string;
  href: string;
}

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="قائمة التصفح للجوال"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-10">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <BrandLogo size="sm" />
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق القائمة"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowLeft className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Button
            className="w-full"
            variant="primary"
            onClick={() => {
              onClose();
              const el = document.getElementById('application-form');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            اكتشف الفرصة وقدّم الآن
          </Button>
          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            مَوْثِق — جسر الخبرة | دعوة لشركاء التأسيس والبناء
          </p>
        </div>
      </div>
    </div>
  );
};
