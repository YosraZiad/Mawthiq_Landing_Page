import React from 'react';
import { OPPORTUNITY_NATURE } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { ShieldCheck, UserCheck, Flame, Hammer, Users2, X, Check } from 'lucide-react';

export const OpportunitySection: React.FC = () => {
  const dimensionIcons = [UserCheck, Flame, Hammer, Users2];

  return (
    <section id="opportunity" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="طبيعة الفرصة والمسؤولية"
          badgeVariant="gold"
          title={OPPORTUNITY_NATURE.sectionTitle}
          subtitle={OPPORTUNITY_NATURE.sectionSubtitle}
        />

        {/* High-visibility Institutional Clarification Callout */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-7 rounded-3xl bg-amber-950/20 border border-amber-500/30 shadow-subtle relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 text-right">
              <h3 className="text-base sm:text-lg font-bold text-amber-200">
                {OPPORTUNITY_NATURE.clarificationBanner.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-amber-100/80 leading-relaxed font-normal">
                {OPPORTUNITY_NATURE.clarificationBanner.text}
              </p>
            </div>
          </div>
        </div>

        {/* Bilateral Contrast Ledger: Conventional Job vs Founding Partner */}
        <div className="max-w-5xl mx-auto mb-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-right mb-6 pb-4 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white">
              الفارق الجوهري بين المسارين
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              لماذا يتطلب تأسيس كيان جديد عقلية مغايرة تماماً عن العمل في شركة قائمة ومستقرة؟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: Conventional Job */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 text-right space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-slate-400 text-xs font-semibold border border-slate-800">
                <X className="w-3.5 h-3.5 text-red-400" />
                <span>ما لا تعنيه هذه الفرصة (التوظيف التقليدي)</span>
              </div>
              
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 pt-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span>انتظار مهام يومية محددة ووصف وظيفي روتيني من مدير مباشر.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span>توقع رواتب شهرية ثابتة أو عوائد مالية قبل إتمام الاتفاق المعتمد.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span>البحث عن لقب قيادي شكلي للتفاخر دون بذل جهد تنفيذي حقيقي.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                  <span>التعامل مع المشكلات باعتبارها مسؤولية أطراف أخرى لا تعنيه.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Founding Partner */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-cyan-500/40 text-right space-y-4 shadow-glow-primary">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>ما نبنيه معاً (شراكة التأسيس والبناء)</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 pt-2 font-normal">
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>المساهمة الفعلية في وضع اللبنات التأسيسية لكيان تجاري مستقل.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>أخذ زمام المبادرة وسد الفجوات التشغيلية والبرمجية والتجارية.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>علاقة شراكة طويلة الأمد تُؤطر حقوقها والتزاماتها باتفاق مكتوب محدد.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>روح الملكية المعنوية والمسؤولية الكاملة عن المخرجات وجودتها.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Contribution (Horizontal Grid with diverse styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OPPORTUNITY_NATURE.dimensions.map((dim, idx) => {
            const Icon = dimensionIcons[idx];
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between text-right group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {dim.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {dim.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
