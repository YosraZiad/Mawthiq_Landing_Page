import React from 'react';
import { MUTUAL_EXPECTATIONS } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { CheckCircle2, AlertOctagon, HelpCircle, ShieldCheck } from 'lucide-react';

export const ExpectationsSection: React.FC = () => {
  return (
    <section id="expectations" className="py-20 md:py-28 bg-slate-900/30 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="الشفافية والتوافق المؤسسي"
          badgeVariant="gold"
          title={MUTUAL_EXPECTATIONS.sectionTitle}
          subtitle={MUTUAL_EXPECTATIONS.sectionSubtitle}
        />

        {/* Bilateral Covenant Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch max-w-6xl mx-auto">
          {/* Column 1: What We Expect From You */}
          <div className="p-7 sm:p-9 rounded-3xl bg-slate-950 border border-slate-800 text-right flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-850 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {MUTUAL_EXPECTATIONS.whatWeExpect.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                  التزامات الشريك
                </span>
              </div>

              <div className="space-y-3.5">
                {MUTUAL_EXPECTATIONS.whatWeExpect.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-800 transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-100 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed pr-3.5 font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-850 text-xs text-slate-500 flex items-center justify-between">
              <span>الانضباط والوفاء بالكلمة أساس الشراكة</span>
              <span className="font-mono text-cyan-400">05/05 بنود</span>
            </div>
          </div>

          {/* Column 2: What You Should Understand About This Opportunity */}
          <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/30 text-right flex flex-col justify-between shadow-glow-gold">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-850 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-200">
                    {MUTUAL_EXPECTATIONS.whatYouShouldUnderstand.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-950/40 text-amber-300 border border-amber-500/30">
                  حدود وإطار الفرصة
                </span>
              </div>

              {/* Explicit placeholder & legal framing notice */}
              <div className="mb-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5 shadow-xs">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{MUTUAL_EXPECTATIONS.whatYouShouldUnderstand.placeholderNotice}</span>
              </div>

              <div className="space-y-3.5">
                {MUTUAL_EXPECTATIONS.whatYouShouldUnderstand.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-750 transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-100 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed pr-3.5 font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-850 text-xs text-amber-400/80 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>لا توجد وعود مسبقة؛ العقود الرسمية المعتمدة هي الحاكمة.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
