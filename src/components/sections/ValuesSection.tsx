import React from 'react';
import { VALUES_LIST } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, CheckSquare, Briefcase, GraduationCap, Eye, HeartHandshake } from 'lucide-react';

export const ValuesSection: React.FC = () => {
  const valueIcons = [
    Award,
    CheckSquare,
    Briefcase,
    GraduationCap,
    Eye,
    HeartHandshake,
  ];

  return (
    <section id="values" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="المبادئ الحاكمة لبيئة العمل"
          badgeVariant="emerald"
          title="نبني طريقة عمل تقوم على الثقة"
          subtitle="قيم عملية صارمة نعيشها يومياً في قراراتنا ونقاشاتنا ومخرجاتنا، وليست مجرد شعارات تسويقية معلقة"
        />

        {/* Executive Governance Charter Layout (Structured Divided Ledger) */}
        <div className="max-w-5xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl divide-y divide-slate-850">
          <div className="pb-8 text-right flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                ميثاق العمل التأسيسي
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                الركائز الست للبناء المشترك
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              هذه المبادئ تمثل العقد الأخلاقي والمهني غير المكتوب الذي يضبط تفاعلنا اليومي في بناء هذا الكيان.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-10">
            {VALUES_LIST.map((value, idx) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={value.number}
                  className="text-right flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {value.title}
                      </h4>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        {value.number}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-emerald-400/90">
                      {value.summary}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal pt-1">
                      {value.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
