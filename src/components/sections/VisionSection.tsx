import React, { useState } from 'react';
import { WHAT_WE_ARE_BUILDING } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Eye, Code2, ArrowUpRight, Check, ShieldAlert, Sparkles } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState(WHAT_WE_ARE_BUILDING.pillars[0].id);

  const icons = [Eye, Code2, ArrowUpRight];

  return (
    <section id="vision" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="الرؤية والاتجاه الاستراتيجي"
          badgeVariant="primary"
          title={WHAT_WE_ARE_BUILDING.sectionTitle}
          subtitle={WHAT_WE_ARE_BUILDING.sectionSubtitle}
        />

        {/* Asymmetrical Editorial Composition: Strategic Manifesto + Layered Strata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column (5 cols): Editorial Manifesto Statement */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-4">
                <Sparkles className="w-4 h-4" />
                <span>البيان التأسيسي للكيان</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 leading-snug font-heading">
                الابتعاد عن البريق الآني نحو قيمة تجارية حقيقية
              </h3>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  نلاحظ في السوق كثرة المبادرات التي تبدأ بضجة تسويقية سريعة، وسرعان ما تفقد زخمها لغياب الأساس البرمجي والتجاري المتين.
                </p>
                <p>
                  في <span className="text-white font-semibold">مَوْثِق</span>، نتبنى مساراً مغايراً: بناء كيان جديد يقوم على حل مشكلات حقيقية، تطوير حلول برمجية نوعية قابلة للشراء والاستخدام التجاري، وإرساء نموذج عمل قابل للنمو التدريجي المستدام.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-200">معيار النجاح الحاكم:</span>
                <span className="text-cyan-400 font-mono">القيمة الفعلية المضافة</span>
              </div>
            </div>

            {/* Confidentiality Reminder Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                تنويه: تفاصيل المنتجات والحلول البرمجية قيد التطوير تُناقش حصرياً ضمن إطار جلسات الاستكشاف المشترك بعد توقيع اتفاقات عدم الإفصاح المعتمدة.
              </p>
            </div>
          </div>

          {/* Left Column (7 cols): Layered Structural Stack (طبقات البناء الثلاث) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-right mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                طبقات البناء التأسيسية الثلاث (اضغط للاستكشاف):
              </span>
            </div>

            {WHAT_WE_ARE_BUILDING.pillars.map((pillar, idx) => {
              const Icon = icons[idx];
              const isSelected = pillar.id === selectedPillarId;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer text-right ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-500/50 shadow-glow-primary ring-1 ring-cyan-500/20'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          isSelected
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white leading-snug">
                          {pillar.title}
                        </h4>
                        <span className="text-[11px] font-mono text-cyan-400/90">
                          {pillar.tag}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-mono font-bold text-slate-600">
                      {pillar.number}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  {/* Detail Checklist shown when selected */}
                  {isSelected && (
                    <div className="mt-5 pt-4 border-t border-slate-850 space-y-2.5 animate-fade-in">
                      <span className="text-xs font-semibold text-cyan-300 block mb-1">
                        مرتكزات هذه الطبقة:
                      </span>
                      {pillar.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
