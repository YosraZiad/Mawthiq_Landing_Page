import React from 'react';
import { JOINING_PROCESS_STEPS } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const JoiningProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="مسار الشراكة المنظم"
          badgeVariant="primary"
          title="كيف تبدأ رحلتك معنا؟"
          subtitle="خطوات عملية وشفافة تضمن التوافق المتبادل قبل اتخاذ أي التزامات رسمية"
        />

        {/* Clear non-guarantee notice */}
        <div className="max-w-4xl mx-auto mb-16 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center gap-3 shadow-subtle">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="leading-relaxed">
            <span className="font-semibold text-white ml-1">تأكيد إجرائي:</span>
            تقديم الطلب هو خطوة تعارف مهني واستكشاف أولية، ولا يعني تلقائياً القبول النهائي أو التزاماً مسبقاً بالشراكة؛ هدف المسار هو التأكد من ملاءمة الرؤية لكلا الطرفين.
          </p>
        </div>

        {/* Interconnected Milestone Pipeline (Timeline Sequence) */}
        <div className="max-w-5xl mx-auto space-y-6">
          {JOINING_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 hover:border-slate-750 transition-all text-right flex flex-col md:flex-row md:items-center justify-between gap-6 group relative shadow-subtle"
            >
              {/* Left/Right content */}
              <div className="flex items-start gap-4 sm:gap-6 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-lg text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/20 transition-colors shrink-0">
                  {step.stepNumber}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </h3>
                    {step.durationEstimate && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{step.durationEstimate}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Milestone Outcome Callout */}
              <div className="md:w-72 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-850 shrink-0 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 ml-1">مخرج المرحلة:</span>
                    <span className="text-slate-400 block mt-0.5">{step.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Step indicator connecting line */}
              {idx < JOINING_PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute -bottom-6 right-11 w-0.5 h-6 bg-slate-800 group-hover:bg-cyan-500/30 transition-colors" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
