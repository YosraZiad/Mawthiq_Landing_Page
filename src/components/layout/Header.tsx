import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { Button } from '../ui/Button';
import { MobileNavigation } from './MobileNavigation';

const NAV_ITEMS = [
  { label: 'ماذا نبني؟', href: '#vision' },
  { label: 'طبيعة الفرصة', href: '#opportunity' },
  { label: 'ميثاق العمل', href: '#values' },
  { label: 'عقلية الشريك', href: '#partner-profile' },
  { label: 'التوقعات', href: '#expectations' },
  { label: 'مسار الانضمام', href: '#process' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('application-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-md py-3'
            : 'bg-transparent border-b border-slate-800/40 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Official Mawthiq Emblem */}
            <a href="#" className="flex items-center gap-2 group focus:outline-none">
              <BrandLogo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="التصفح الرئيسي">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Header CTA Button & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex text-xs md:text-sm font-semibold"
                onClick={scrollToApply}
              >
                اكتشف الفرصة وقدّم الآن
              </Button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-300 hover:text-white lg:hidden rounded-xl hover:bg-slate-800 border border-slate-800 focus:outline-none"
                aria-label="فتح القائمة الرئيسية"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={NAV_ITEMS}
      />
    </>
  );
};
