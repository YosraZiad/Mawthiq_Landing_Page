import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { BRAND_INFO } from '../../data/landingPageContent';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-slate-850">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4 text-right">
            <BrandLogo size="lg" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md pt-2 font-normal">
              {BRAND_INFO.shortDescription}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>باب التقديم والمراجعة الأولية مفتوح حالياً للكفاءات المستهدفة</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-right">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              أقسام الصفحة
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#vision" className="hover:text-cyan-300 transition-colors">
                  ماذا نبني في مَوْثِق؟
                </a>
              </li>
              <li>
                <a href="#opportunity" className="hover:text-cyan-300 transition-colors">
                  طبيعة الفرصة والشراكة
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-cyan-300 transition-colors">
                  قيم العمل الحاكمة
                </a>
              </li>
              <li>
                <a href="#partner-profile" className="hover:text-cyan-300 transition-colors">
                  عقلية الشريك المناسب
                </a>
              </li>
              <li>
                <a href="#expectations" className="hover:text-cyan-300 transition-colors">
                  التوقعات المتبادلة
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Process & Legal */}
          <div className="space-y-3 text-right">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              المسار والشفافية
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#process" className="hover:text-cyan-300 transition-colors">
                  مراحل الانضمام
                </a>
              </li>
              <li>
                <a href="#self-assessment" className="hover:text-cyan-300 transition-colors">
                  التقييم الذاتي الاسترشادي
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#application-form" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  تقديم طلب الشراكة
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional & Legal Notice Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3 text-right">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300 ml-1">تنويه مؤسسي معتمد:</span>
            <span>
              {BRAND_INFO.legalNotice} هذه الصفحة مخصصة للاستقطاب الأولي وبناء التوافق الفكري والمهني، ولا تشكل بأي حال عرض عمل وظيفي تقليدي أو عقداً نهائياً ملزماً قبل توقيعه واعتماده.
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 مَوْثِق — جسر الخبرة. جميع الحقوق محفوظة.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            aria-label="الرجوع إلى أعلى الصفحة"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
