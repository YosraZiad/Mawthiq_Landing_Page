import React, { useState } from 'react';
import { SELF_ASSESSMENT_QUESTIONS } from '../../data/landingPageContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { HelpCircle, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

export const SelfAssessmentSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentQ = SELF_ASSESSMENT_QUESTIONS[currentIdx];
  const totalQuestions = SELF_ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isFinished = answeredCount === totalQuestions;

  const handleAnswer = (value: boolean) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
  };

  const yesCount = Object.values(answers).filter(Boolean).length;

  const scrollToApply = () => {
    const el = document.getElementById('application-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="self-assessment" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="التقييم الذاتي الاسترشادي"
          badgeVariant="slate"
          title="قبل أن تتقدم، اسأل نفسك"
          subtitle="خطوة استرشادية لمساعدتك على تقييم مدى توافق هذه التجربة مع تطلعاتك وطاقتك الحالية، دون مجاملة أو وعود زائفة"
        />

        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
          {/* Top Info Notice */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>تقييم تأملي شخصي (ليس امتحاناً مفاضلاً أو معيار قبول نهائي)</span>
            </div>
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs"
                title="إعادة التقييم"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة البدء</span>
              </button>
            )}
          </div>

          {!isFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>السؤال {currentIdx + 1} من {totalQuestions}</span>
                  <span className="text-cyan-400 font-bold">{Math.round(((currentIdx + 1) / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-mawthiq-700 to-cyan-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="space-y-4 my-8 text-right min-h-[130px]">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-heading">
                  {currentQ.question}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {currentQ.subtext}
                </p>
              </div>

              {/* Question Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900 text-right transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                      نعم، هذا ما يمثلني ويحفزني
                    </span>
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {currentQ.positivePerspective}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-right transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
                      أفضل الاستقرار والمهام الجاهزة
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-xs">
                      –
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {currentQ.considerationNote}
                  </p>
                </button>
              </div>

              {/* Steps indicator */}
              <div className="flex justify-center gap-1.5 mt-8">
                {SELF_ASSESSMENT_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIdx
                        ? 'w-6 bg-cyan-400'
                        : answers[q.id] !== undefined
                        ? 'w-2 bg-slate-600'
                        : 'w-2 bg-slate-800'
                    }`}
                    aria-label={`الانتقال للسؤال ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Result Summary */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center shadow-glow-primary">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-heading">
                  خلاصة تأملك الذاتي: {yesCount} من {totalQuestions} محاور متوافقة مع عقلية التأسيس
                </h3>
                <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
                  {yesCount >= 4
                    ? 'إجاباتك تشير إلى توافق عالٍ مع طبيعة بيئة البناء والتأسيس، حيث تبرز رغبتك في المبادرة وتحمل المسؤولية والتعامل مع الغموض بمرونة وتكامل.'
                    : 'إجاباتك تعكس وضوحاً في تفضيلك للاستقرار والوضوح الإجرائي المسبق، وهو مسار مهني معتبر، وإن كان مسار تأسيس كيان تجاري جديد يتطلب قدراً أعلى من استقلالية القرار والمبادرة الذاتية.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-lg mx-auto text-right">
                <p>
                  تذكير: هذا الاستبيان استرشادي لك وحدك ولا يسجل كشرط إلزامي للطلب. القرار في النهاية لك في مدى رغبتك واستعدادك لخوض هذه التجربة التأسيسية.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={scrollToApply}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  الانتقال لنموذج التقديم
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleReset}
                >
                  إعادة التأمل من البداية
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
