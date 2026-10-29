import React, { useState } from 'react';
import { HERO_CONTENT } from '../../data/landingPageContent';
import { Button } from '../ui/Button';
import { ArrowLeft, Sparkles, Compass, Cpu, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import mawthiqLogoImg from '../../assets/mawthiq-logo.jpg';

export const HeroSection: React.FC = () => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const activeSegment = HERO_CONTENT.perspectives[activeSegmentIndex];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const transformationStages = [
    {
      step: '٠١',
      phase: 'الفرصة والاحتياج',
      title: 'استكشاف فجوة السوق',
      icon: Sparkles,
      desc: 'فهم عميق لمشاكل العملاء الحقيقية دون افتراضات سطحية',
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-transparent',
      badge: 'نقطة الانطلاق',
    },
    {
      step: '٠٢',
      phase: 'الاستراتيجية ونموذج العمل',
      title: 'صياغة المسار والجدوى',
      icon: Compass,
      desc: 'تحديد الأولويات واقتصادات الوحدة وبناء خارطة طريق واقعية',
      color: 'text-sky-400',
      bgGlow: 'from-sky-500/10 to-transparent',
      badge: 'التأطير المؤسسي',
    },
    {
      step: '٠٣',
      phase: 'الحلول البرمجية والتشغيل',
      title: 'التنفيذ البرمجي عالي الجودة',
      icon: Cpu,
      desc: 'بناء منتجات برمجية قابلة للشراء والاستخدام التجاري الفعلي',
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-transparent',
      badge: 'المحرك التقني',
    },
    {
      step: '٠٤',
      phase: 'الكيان التجاري المستقل',
      title: 'بناء عمل مستدام وقابل للنمو',
      icon: TrendingUp,
      desc: 'تحويل العمليات إلى أصول دائمة ونمو مؤسسي مستقر',
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      badge: 'الأفق المستقبلي',
    },
  ];

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-slate-950">
      {/* Editorial subtle background light glows */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-mawthiq-glow pointer-events-none opacity-70" />
      <div className="absolute top-28 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Institutional Badge with Mawthiq Official Emblem */}
        <div className="flex items-center justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-750 shadow-subtle text-xs text-slate-300">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-white p-0.5 shrink-0 shadow-xs">
              <img src={mawthiqLogoImg} alt="Mawthiq" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-white">مَوْثِق — جسر الخبرة</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-cyan-400 font-medium">مبادرة استقطاب شركاء التأسيس والبناء</span>
          </div>
        </div>

        {/* Asymmetrical 2-Column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column: Editorial Manifesto & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-right space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.25] text-balance font-heading">
              {HERO_CONTENT.headline}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              {HERO_CONTENT.subheadline}
            </p>

            {/* Management Welcome Quote Integration with signature style */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/40 border-r-4 border-r-cyan-500 border border-slate-800 text-sm text-slate-300 leading-relaxed max-w-2xl relative shadow-subtle">
              <p className="italic font-normal">
                {HERO_CONTENT.welcomeQuote}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
                <span className="font-semibold text-cyan-400">لجنة التأسيس والاستقطاب</span>
                <span className="text-slate-400">مَوْثِق — جسر الخبرة</span>
              </div>
            </div>

            {/* Actions & Trust Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="text-base font-semibold"
                onClick={() => scrollToSection('application-form')}
                leftIcon={<ArrowLeft className="w-5 h-5" />}
              >
                {HERO_CONTENT.primaryCta}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="text-base font-medium"
                onClick={() => scrollToSection('vision')}
              >
                {HERO_CONTENT.secondaryCta}
              </Button>
            </div>

            {/* Micro guarantees / Trust notes */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>مراجعة شخصية متأنية لكل طلب</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>سرية تامة للبيانات والرؤى المطروحة</span>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Architectural Progression Visual (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                    معمارية التأسيس
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    مسار الانتقال من الفكرة إلى الكيان
                  </h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Perspective Segment Switcher */}
              <div className="mb-6 p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                {HERO_CONTENT.perspectives.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveSegmentIndex(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                      activeSegmentIndex === idx
                        ? 'bg-mawthiq-700 text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    aria-pressed={activeSegmentIndex === idx}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Active Segment Summary Insight */}
              <div className="mb-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed text-right">
                <span className="font-semibold text-cyan-300 block mb-1">
                  تركيز {activeSegment.roleTitle}:
                </span>
                <p className="text-slate-400 font-normal">
                  {activeSegment.summary}
                </p>
              </div>

              {/* 4 Connected Blueprint Phases */}
              <div className="space-y-3 relative">
                {transformationStages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.step}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-slate-700 transition-all flex items-start justify-between gap-3 text-right group"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${stage.color} shrink-0 mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {stage.title}
                            </h4>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                              {stage.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                            {stage.desc}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-600 shrink-0">
                        {stage.step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
