import React, { useState } from 'react';
import { PARTNER_CAPABILITIES } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Check, Info, Sparkles } from 'lucide-react';

export const PartnerProfileSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState('A');
  const activeCap = PARTNER_CAPABILITIES.find((c) => c.letter === activeLetter) || PARTNER_CAPABILITIES[0];

  return (
    <section id="partner-profile" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ملف الكفاءات المستهدفة"
          badgeVariant="primary"
          title="هل تمتلك العقلية المناسبة للبناء معنا؟"
          subtitle="خبرة تأسيس الشركات السابقة ليست شرطاً إلزامياً؛ ما يهمنا هو طريقة تفكيرك وعمق فهمك ورغبتك في الإنجاز"
        />

        {/* Reassurance Callout: No need to possess all four at expert level */}
        <div className="max-w-4xl mx-auto mb-12 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center gap-3 shadow-subtle">
          <Info className="w-5 h-5 text-cyan-400 shrink-0" />
          <p className="leading-relaxed">
            <span className="font-semibold text-white ml-1">توضيح مهم:</span>
            لا يُشترط أن يمتلك شخص واحد جميع هذه القدرات بمستوى خبير متقدم؛ الهدف هو استكشاف مكامن قوتك والمجال الذي تستطيع فيه إحداث التأثير الأكبر وتكامل دورك مع بقية الشركاء.
          </p>
        </div>

        {/* Interactive Capability Matrix Layout */}
        <div className="max-w-5xl mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Right Column: 4 Capability Selectors (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 block text-right mb-2">
                اختر المحور لاستعراض التفاصيل:
              </span>

              {PARTNER_CAPABILITIES.map((cap) => {
                const isSelected = cap.letter === activeLetter;
                return (
                  <div
                    key={cap.letter}
                    onClick={() => setActiveLetter(cap.letter)}
                    className={`p-4 rounded-2xl border text-right cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-500/50 shadow-glow-primary ring-1 ring-cyan-500/20'
                        : 'bg-slate-950/60 border-slate-850 hover:border-slate-750 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center font-mono ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {cap.letter}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {cap.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {cap.titleEn}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 pr-8">
                      {cap.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Left Column: Active Capability Deep-Dive View (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 sm:p-7 text-right space-y-6 shadow-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                    {activeCap.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeCap.titleEn}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-600 font-bold">
                  محور {activeCap.letter}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {activeCap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {activeCap.description}
                </p>
              </div>

              {/* Behavioral Indicators */}
              <div className="space-y-3 pt-3 border-t border-slate-850">
                <span className="text-xs font-bold text-cyan-300 block">
                  أبرز ملامح الممارسة والمساهمة في هذا المحور:
                </span>
                <div className="space-y-2.5">
                  {activeCap.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="p-0.5 rounded-full bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflection Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  إذا كانت قوتك تكمن في هذا المحور، ستجد في نموذج التقديم مساحة مخصصة لشرح كيف طبقت ذلك عملياً وما الفارق الذي تستطيع إحداثه.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
