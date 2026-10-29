import React from 'react';
import { FAQ_DATA } from '../../data/faq';
import { SectionHeading } from '../ui/SectionHeading';
import { Accordion } from '../ui/Accordion';
import { HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-900/30 border-t border-slate-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="الوضوح والشفافية"
          badgeVariant="gold"
          title="الأسئلة الشائعة"
          subtitle="إجابات صريحة ومباشرة حول نموذج الفرصة، معايير التقييم، وتفاصيل الشراكة والتأسيس"
        />

        <div className="mt-8">
          <Accordion items={FAQ_DATA} />
        </div>

        {/* Reassurance note */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            هل لديك استفسار آخر لم تتم الإجابة عنه هنا؟ يمكنك إرفاقه في حقل التوقعات داخل نموذج التقديم وسنناقشه معك في الجلسة الاستكشافية.
          </span>
        </div>
      </div>
    </section>
  );
};
