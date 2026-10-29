import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FormField, inputClass } from '../ui/FormField';
import { Button } from '../ui/Button';
import { ApplicationFormData, PrimaryArea } from '../../types';
import { validateStep1, validateStep2, validateStep3, ValidationErrors } from '../../lib/validation';
import { submitApplication, SubmissionResponse } from '../../lib/applicationService';
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  FileText,
  Lock,
  Sparkles,
  ClipboardCheck,
  Check,
} from 'lucide-react';
import mawthiqLogoImg from '../../assets/mawthiq-logo.jpg';

const INITIAL_FORM_DATA: ApplicationFormData = {
  fullName: '',
  email: '',
  profileUrl: '',
  primaryArea: '',
  otherAreaDetail: '',

  keyAchievements: '',
  whyFoundingPartner: '',
  targetOpportunityOrProblem: '',
  customerNeedApproach: '',
  valueContribution: '',
  handlingUncertainty: '',

  weeklyTimeCommitment: '',
  comfortableResponsibilities: '',
  feedbackAndDisagreements: '',
  expectationsFromOpportunity: '',
  privacyConsent: false,
};

const AREA_OPTIONS: { id: PrimaryArea; label: string; desc: string }[] = [
  {
    id: 'commercial_strategy',
    label: 'التفكير التجاري والاستراتيجي',
    desc: 'دراسة السوق، تحليل الفرص والجدوى، وصياغة نماذج العمل.',
  },
  {
    id: 'tech_products',
    label: 'تطوير الحلول والمنتجات البرمجية',
    desc: 'هندسة البرمجيات، تصميم المنتج، والربط التقني المتقن.',
  },
  {
    id: 'operations_management',
    label: 'التشغيل والإدارة وتطوير الأعمال',
    desc: 'بناء العمليات اليومية، تنظيم الموارد، وتوسيع الشراكات.',
  },
  {
    id: 'marketing_growth',
    label: 'التسويق واكتساب العملاء والنمو',
    desc: 'استراتيجيات الوصول للسوق، قنوات الجذب، والعلاقات التجارية.',
  },
  {
    id: 'other',
    label: 'مجال تخصصي آخر',
    desc: 'مساهمة نوعية أو خبرة استشارية فريدة ترغب في إضافتها.',
  },
];

const TIME_OPTIONS = [
  { value: '5-10', label: '٥ إلى ١٠ ساعات أسبوعياً (مساهمة استشارية استراتيجية مركزة)' },
  { value: '10-20', label: '١٠ إلى ٢٠ ساعة أسبوعياً (مساهمة تأسيسية جزئية منتظمة)' },
  { value: '20-30', label: '٢٠ إلى ٣٠ ساعة أسبوعياً (مشاركة تنفيذية مكثفة)' },
  { value: '30+', label: 'أكثر من ٣٠ ساعة أسبوعياً (تفرغ شبه كامل أو كامل لمسار التأسيس)' },
];

export const ApplicationSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);

  // Auto-restore draft from localStorage
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('mawthiq_partner_form_draft');
      if (savedDraft) {
        setFormData((prev) => ({ ...prev, ...JSON.parse(savedDraft) }));
      }
    } catch {
      // Ignore draft read errors
    }
  }, []);

  // Auto-save draft changes
  const updateFormField = <K extends keyof ApplicationFormData>(
    field: K,
    value: ApplicationFormData[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem('mawthiq_partner_form_draft', JSON.stringify(updated));
      } catch {
        // Ignore draft write errors
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const stepErrors = validateStep1(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setCurrentStep(2);
      window.scrollTo({ top: (document.getElementById('application-form')?.offsetTop || 200) - 80, behavior: 'smooth' });
    } else if (currentStep === 2) {
      const stepErrors = validateStep2(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setCurrentStep(3);
      window.scrollTo({ top: (document.getElementById('application-form')?.offsetTop || 200) - 80, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      setErrors({});
      window.scrollTo({ top: (document.getElementById('application-form')?.offsetTop || 200) - 80, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep3(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitApplication(formData);
      setSubmissionResult(result);
      if (result.success) {
        try {
          localStorage.removeItem('mawthiq_partner_form_draft');
        } catch {
          // Ignore
        }
      }
    } catch {
      setSubmissionResult({
        success: false,
        errorMessage: 'حدث خطأ غير متوقع أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.',
        isDemoMode: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmissionResult(null);
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <section id="application-form" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="طلب الانضمام والمساهمة التأسيسية"
          badgeVariant="primary"
          title="هل ترى نفسك شريكًا في البناء؟"
          subtitle="إذا كنت مستعدًا للمساهمة والتعلم وتحمل المسؤولية، أخبرنا عن خبراتك وطريقة تفكيرك والقيمة التي تستطيع إضافتها"
        />

        {/* Success Confirmation View */}
        {submissionResult && submissionResult.success ? (
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-fade-in text-right">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6">
              <ClipboardCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 font-heading">
              تم استلام طلب الشراكة بنجاح
            </h3>

            <p className="text-slate-300 text-sm sm:text-base text-center max-w-xl mx-auto leading-relaxed mb-8 font-normal">
              شكراً لاهتمامك ووقتك في مشاركة تفاصيل خبرتك ورؤيتك معنا. بياناتك الآن في عهدة لجنة الاستقطاب والتأسيس في مَوْثِق.
            </p>

            {/* Reference Box */}
            <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-8 text-center shadow-subtle">
              <span className="text-xs text-slate-400 block mb-1">الرقم المرجعي للطلب:</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 tracking-wider">
                {submissionResult.referenceId}
              </span>
              <span className="text-[11px] text-slate-500 block mt-2">
                تاريخ الاستلام: {new Date().toLocaleDateString('ar-EG', { dateStyle: 'full' })}
              </span>
            </div>

            {/* What to expect next */}
            <div className="max-w-xl mx-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-xs sm:text-sm text-slate-300 space-y-3 mb-8">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>الخطوات القادمة:</span>
              </h4>
              <p className="leading-relaxed text-slate-400 font-normal">
                ١. ستقوم لجنة التأسيس بدراسة طلبك خلال فترة الفرز الأولي (٣ - ٥ أيام عمل).
              </p>
              <p className="leading-relaxed text-slate-400 font-normal">
                ٢. في حال ملاءمة خلفيتك وطريقة تفكيرك لاحتياجات المرحلة الحالية، سنتواصل معك عبر بريدك الإلكتروني لتنسيق جلسة استكشافية أولية.
              </p>
            </div>

            {submissionResult.isDemoMode && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300/80 text-center mb-6">
                نمط النموذج تجريبي للعرض والمراجعة، تم حفظ طلبك محلياً بنجاح ويمكن مراجعته عبر زر &quot;معاينة الطلبات&quot; العائم.
              </div>
            )}

            <div className="flex justify-center">
              <Button variant="secondary" onClick={handleResetForm}>
                إرسال طلب آخر أو العودة
              </Button>
            </div>
          </div>
        ) : (
          /* Multi-step Application Form */
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            {/* Step Progress Header */}
            <div className="mb-10 pb-6 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 shrink-0 border border-slate-750 shadow-xs">
                    <img src={mawthiqLogoImg} alt="Mawthiq" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        الخطوة {currentStep} من ٣
                      </span>
                      <span className="text-sm font-bold text-white">
                        {currentStep === 1 && 'المعلومات الأساسية ومجال المساهمة'}
                        {currentStep === 2 && 'التفكير التجاري والقيمة المضافة'}
                        {currentStep === 3 && 'الاستعداد والتوقعات المتبادلة'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>معالجة سرية وآمنة</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step <= currentStep ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submission Error Banner */}
            {submissionResult && !submissionResult.success && (
              <div className="mb-8 p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{submissionResult.errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      id="fullName"
                      label="الاسم الكامل"
                      required
                      helperText="الاسم الثلاثي أو الثنائي كما يظهر مهنياً"
                      error={errors.fullName}
                    >
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => updateFormField('fullName', e.target.value)}
                        placeholder="مثال: عبد الله بن أحمد العتيبي"
                        className={inputClass(!!errors.fullName)}
                      />
                    </FormField>

                    <FormField
                      id="email"
                      label="البريد الإلكتروني"
                      required
                      helperText="سنستخدم هذا البريد للتواصل المباشر بشأن الطلب"
                      error={errors.email}
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={formData.email}
                        onChange={(e) => updateFormField('email', e.target.value)}
                        placeholder="name@example.com"
                        className={inputClass(!!errors.email)}
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="profileUrl"
                    label="رابط الملف المهني (LinkedIn أو Portfolio)"
                    optionalLabel="اختياري لكن يُنصح به بشدة"
                    helperText="يساعد اللجنة على الاطلاع على محطاتك المهنية وسياق خبراتك"
                    error={errors.profileUrl}
                  >
                    <input
                      id="profileUrl"
                      type="url"
                      dir="ltr"
                      value={formData.profileUrl}
                      onChange={(e) => updateFormField('profileUrl', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className={inputClass(!!errors.profileUrl)}
                    />
                  </FormField>

                  <div className="space-y-3 pt-2">
                    <label className="block text-sm font-medium text-slate-200 text-right">
                      مجال الخبرة الأساسي أو نوع المساهمة المقصودة
                      <span className="text-red-400 mr-1">*</span>
                    </label>
                    <p className="text-xs text-slate-400 text-right">
                      اختر المجال الأقرب لخبرتك ونوع القيمة التي تتطلع لقيادتها أو تقديمها
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {AREA_OPTIONS.map((area) => {
                        const isSelected = formData.primaryArea === area.id;
                        return (
                          <div
                            key={area.id}
                            onClick={() => updateFormField('primaryArea', area.id)}
                            className={`p-4 rounded-2xl border text-right cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-slate-950 border-cyan-500 shadow-glow-primary ring-1 ring-cyan-500/20'
                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-750'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={`text-sm font-bold ${
                                  isSelected ? 'text-white' : 'text-slate-200'
                                }`}
                              >
                                {area.label}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? 'border-cyan-500 bg-cyan-500 text-white'
                                    : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-normal">
                              {area.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {errors.primaryArea && (
                      <p className="text-xs text-red-400 mt-1.5 text-right">
                        {errors.primaryArea}
                      </p>
                    )}

                    {formData.primaryArea === 'other' && (
                      <FormField
                        id="otherAreaDetail"
                        label="توضيح مجال التخصص الآخر"
                        required
                        error={errors.otherAreaDetail}
                        className="mt-3"
                      >
                        <input
                          id="otherAreaDetail"
                          type="text"
                          value={formData.otherAreaDetail}
                          onChange={(e) => updateFormField('otherAreaDetail', e.target.value)}
                          placeholder="مثال: الاستشارات القانونية وحوكمة الشركات التقنية"
                          className={inputClass(!!errors.otherAreaDetail)}
                        />
                      </FormField>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Thinking & Contribution */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-850 text-xs text-slate-400 leading-relaxed text-right">
                    <p>
                      نولي في هذه الخطوة اهتماماً كبيراً لأسلوب تحليلك وكيفية مقاربتك للفرص الواقعية. الإجابات العميقة والمحددة تفيدنا أكثر بكثير من الكلمات الإنشائية العامة.
                    </p>
                  </div>

                  <FormField
                    id="keyAchievements"
                    label="ما أبرز خبراتك أو إنجازاتك العملية السابقة؟"
                    required
                    helperText="اذكر سياقاً محدداً أو مشروعاً شاركت في بنائه أو مسألة معقدة نجحت في حلها"
                    error={errors.keyAchievements}
                  >
                    <textarea
                      id="keyAchievements"
                      rows={3}
                      value={formData.keyAchievements}
                      onChange={(e) => updateFormField('keyAchievements', e.target.value)}
                      placeholder="خلال مسيرتي، قمت بـ..."
                      className={inputClass(!!errors.keyAchievements)}
                    />
                  </FormField>

                  <FormField
                    id="whyFoundingPartner"
                    label="لماذا ترغب في المشاركة في تأسيس كيان جديد بدلاً من الانضمام لشركة قائمة؟"
                    required
                    helperText="ما الذي يحفزك في مسار البناء من الصفر وتحمل المسؤولية المشتركة؟"
                    error={errors.whyFoundingPartner}
                  >
                    <textarea
                      id="whyFoundingPartner"
                      rows={3}
                      value={formData.whyFoundingPartner}
                      onChange={(e) => updateFormField('whyFoundingPartner', e.target.value)}
                      placeholder="أبحث عن مسار التأسيس لأن..."
                      className={inputClass(!!errors.whyFoundingPartner)}
                    />
                  </FormField>

                  <FormField
                    id="targetOpportunityOrProblem"
                    label="ما الفرصة أو حاجة العميل أو المشكلة التي تود المساعدة في تحويلها إلى عمل تجاري؟"
                    required
                    helperText="صف التحدي الذي تراه في السوق وترى أن بناء حل نوعي له يمثل بزنس حقيقي"
                    error={errors.targetOpportunityOrProblem}
                  >
                    <textarea
                      id="targetOpportunityOrProblem"
                      rows={3}
                      value={formData.targetOpportunityOrProblem}
                      onChange={(e) => updateFormField('targetOpportunityOrProblem', e.target.value)}
                      placeholder="أرى أن هناك فجوة واضحة في..."
                      className={inputClass(!!errors.targetOpportunityOrProblem)}
                    />
                  </FormField>

                  <FormField
                    id="customerNeedApproach"
                    label="كيف تفهم احتياجات العميل بعمق قبل اقتراح الحل البرمجي أو التجاري؟"
                    required
                    helperText="ما منهجيتك للتأكد من أننا نبني ما يحل مشكلة العميل فعلاً وليس مجرد افتراضاتنا؟"
                    error={errors.customerNeedApproach}
                  >
                    <textarea
                      id="customerNeedApproach"
                      rows={3}
                      value={formData.customerNeedApproach}
                      onChange={(e) => updateFormField('customerNeedApproach', e.target.value)}
                      placeholder="أبدأ عادةً بـ..."
                      className={inputClass(!!errors.customerNeedApproach)}
                    />
                  </FormField>

                  <FormField
                    id="valueContribution"
                    label="ما القيمة النوعية والإضافة الملموسة التي تستطيع تقديمها للكيان؟"
                    required
                    helperText="ما النتيجة التي ستبدو أفضل أو أسرع بفضل مساهمتك المباشرة؟"
                    error={errors.valueContribution}
                  >
                    <textarea
                      id="valueContribution"
                      rows={3}
                      value={formData.valueContribution}
                      onChange={(e) => updateFormField('valueContribution', e.target.value)}
                      placeholder="أستطيع المساهمة تحديداً في..."
                      className={inputClass(!!errors.valueContribution)}
                    />
                  </FormField>

                  <FormField
                    id="handlingUncertainty"
                    label="كيف تتعامل مع فرصة تجارية غير مكتملة التفاصيل بعد؟"
                    optionalLabel="اختياري"
                    helperText="في بدايات التأسيس تكون المعطيات متغيرة؛ كيف تدير هذا الغموض؟"
                    error={errors.handlingUncertainty}
                  >
                    <textarea
                      id="handlingUncertainty"
                      rows={2}
                      value={formData.handlingUncertainty}
                      onChange={(e) => updateFormField('handlingUncertainty', e.target.value)}
                      placeholder="أسلوبي في إدارة عدم اليقين هو..."
                      className={inputClass(!!errors.handlingUncertainty)}
                    />
                  </FormField>
                </div>
              )}

              {/* STEP 3: Readiness & Expectations */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-200 text-right">
                      ما مقدار الوقت الذي يمكنك المساهمة به واقعياً أسبوعياً؟
                      <span className="text-red-400 mr-1">*</span>
                    </label>
                    <p className="text-xs text-slate-400 text-right">
                      الوضوح هنا يحمي التوقعات المتبادلة؛ نقدّر الالتزام الصادق أياً كان مقداره.
                    </p>

                    <div className="space-y-2 pt-1">
                      {TIME_OPTIONS.map((opt) => {
                        const isSelected = formData.weeklyTimeCommitment === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => updateFormField('weeklyTimeCommitment', opt.value)}
                            className={`p-3.5 rounded-2xl border text-right cursor-pointer flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-slate-950 border-cyan-500 shadow-glow-primary'
                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-750'
                            }`}
                          >
                            <span className="text-xs sm:text-sm text-slate-200 font-medium">
                              {opt.label}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-[10px] ${
                                isSelected
                                  ? 'border-cyan-500 bg-cyan-500 text-white'
                                  : 'border-slate-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.weeklyTimeCommitment && (
                      <p className="text-xs text-red-400 mt-1.5 text-right">
                        {errors.weeklyTimeCommitment}
                      </p>
                    )}
                  </div>

                  <FormField
                    id="comfortableResponsibilities"
                    label="ما المسؤوليات والمهام التي تجد نفسك مرتاحًا ومتحمسًا لتحملها؟"
                    required
                    helperText="أين ترتاح أكثر؟ في بناء البرمجيات، إدارة العلاقات والعملاء، الاستراتيجية، أم التنسيق التشغيلي؟"
                    error={errors.comfortableResponsibilities}
                  >
                    <textarea
                      id="comfortableResponsibilities"
                      rows={3}
                      value={formData.comfortableResponsibilities}
                      onChange={(e) => updateFormField('comfortableResponsibilities', e.target.value)}
                      placeholder="أجد نفسي قادراً ومتحمساً لتحمل..."
                      className={inputClass(!!errors.comfortableResponsibilities)}
                    />
                  </FormField>

                  <FormField
                    id="feedbackAndDisagreements"
                    label="كيف تتعامل مع اختلاف وجهات النظر وتغير الأولويات والملاحظات النقدية؟"
                    required
                    helperText="شاركنا موقفاً عملياً اختلفت فيه مع شريك أو زميل وكيف وصلتم لحل موضوعي"
                    error={errors.feedbackAndDisagreements}
                  >
                    <textarea
                      id="feedbackAndDisagreements"
                      rows={3}
                      value={formData.feedbackAndDisagreements}
                      onChange={(e) => updateFormField('feedbackAndDisagreements', e.target.value)}
                      placeholder="عندما يطرأ اختلاف في الرأي، فإن طريقتي هي..."
                      className={inputClass(!!errors.feedbackAndDisagreements)}
                    />
                  </FormField>

                  <FormField
                    id="expectationsFromOpportunity"
                    label="ما توقعاتك الشخصية والمهنية من هذه الفرصة؟"
                    required
                    helperText="ما الذي تتمنى أن تحققه لنفسك ولمسيرتك المهنية عبر هذه الشراكة؟"
                    error={errors.expectationsFromOpportunity}
                  >
                    <textarea
                      id="expectationsFromOpportunity"
                      rows={3}
                      value={formData.expectationsFromOpportunity}
                      onChange={(e) => updateFormField('expectationsFromOpportunity', e.target.value)}
                      placeholder="أتوقع من هذه الفرصة أن..."
                      className={inputClass(!!errors.expectationsFromOpportunity)}
                    />
                  </FormField>

                  {/* Privacy Notice & Consent Checkbox */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right space-y-3">
                      <div className="flex items-start gap-3">
                        <input
                          id="privacyConsent"
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) => updateFormField('privacyConsent', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-slate-950 mt-1 cursor-pointer"
                        />
                        <label
                          htmlFor="privacyConsent"
                          className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer select-none font-normal"
                        >
                          <span className="font-semibold text-white">إقرار الخصوصية والتفاهم: </span>
                          أوافق على معالجة البيانات المقدمة لأغراض دراسة وتقييم طلب الشراكة من قبل لجنة التأسيس في مَوْثِق. وأتفهم أن تقديم هذا الطلب يمثل خطوة استكشاف أولية ولا يشكل عرض عمل ملزماً أو عقداً نهائياً، كما أتفهم أن الشراكة وحقوقها والتزاماتها كافة تخضع لاتفاق رسمي مخصص في حينه.
                        </label>
                      </div>
                      {errors.privacyConsent && (
                        <p className="text-xs text-red-400 pr-7">
                          {errors.privacyConsent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    الخطوة السابقة
                  </Button>
                ) : (
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>يتم حفظ المسودة تلقائياً في متصفحك</span>
                  </div>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleNextStep}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    المتابعة للخطوة التالية
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="accent"
                    isLoading={isSubmitting}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    إرسال طلب الشراكة النهائي
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
