import { ApplicationFormData } from '../types';

export type ValidationErrors = Partial<Record<keyof ApplicationFormData, string>>;

export function validateStep1(data: Partial<ApplicationFormData>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'يرجى كتابة الاسم الكامل (٣ أحرف على الأقل)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'يرجى إدخال عنوان بريد إلكتروني صحيح للتواصل';
  }

  if (data.profileUrl && data.profileUrl.trim().length > 0) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(data.profileUrl.trim())) {
      errors.profileUrl = 'يرجى التأكد من كتابة رابط صحيح (مثل رابط حسابك في LinkedIn أو موقعك الشخصي)';
    }
  }

  if (!data.primaryArea) {
    errors.primaryArea = 'يرجى اختيار مجال خبرتك أو مساهمتك الأساسية';
  } else if (data.primaryArea === 'other' && (!data.otherAreaDetail || data.otherAreaDetail.trim().length < 3)) {
    errors.otherAreaDetail = 'يرجى توضيح مجال خبرتك بالتفصيل';
  }

  return errors;
}

export function validateStep2(data: Partial<ApplicationFormData>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.keyAchievements || data.keyAchievements.trim().length < 15) {
    errors.keyAchievements = 'يرجى تقديم نبذة موجزة ومحددة عن أبرز خبراتك أو إنجازاتك (١٥ حرفاً على الأقل)';
  }

  if (!data.whyFoundingPartner || data.whyFoundingPartner.trim().length < 15) {
    errors.whyFoundingPartner = 'يرجى توضيح دافعك للمشاركة في تأسيس كيان جديد بدلاً من الوظيفة التقليدية';
  }

  if (!data.targetOpportunityOrProblem || data.targetOpportunityOrProblem.trim().length < 15) {
    errors.targetOpportunityOrProblem = 'يرجى وصف المشكلة أو فرصة السوق التي ترغب في المساعدة في معالجتها';
  }

  if (!data.customerNeedApproach || data.customerNeedApproach.trim().length < 15) {
    errors.customerNeedApproach = 'يرجى شرح كيف تفهم احتياجات العميل الحقيقية قبل طرح الحلول';
  }

  if (!data.valueContribution || data.valueContribution.trim().length < 15) {
    errors.valueContribution = 'يرجى توضيح القيمة النوعية والإضافة الملموسة التي تستطيع تقديمها للكيان';
  }

  return errors;
}

export function validateStep3(data: Partial<ApplicationFormData>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.weeklyTimeCommitment) {
    errors.weeklyTimeCommitment = 'يرجى تحديد مقدار الوقت الذي يمكنك المساهمة به واقعياً أسبوعياً';
  }

  if (!data.comfortableResponsibilities || data.comfortableResponsibilities.trim().length < 15) {
    errors.comfortableResponsibilities = 'يرجى تحديد المسؤوليات والمهام التي تجد نفسك مرتاحاً لقيادتها أو تنفيذها';
  }

  if (!data.feedbackAndDisagreements || data.feedbackAndDisagreements.trim().length < 15) {
    errors.feedbackAndDisagreements = 'يرجى توضيح أسلوبك في التعامل مع اختلاف الآراء وتقييم الأداء';
  }

  if (!data.expectationsFromOpportunity || data.expectationsFromOpportunity.trim().length < 15) {
    errors.expectationsFromOpportunity = 'يرجى مشاركتنا توقعاتك الشخصية والمهنية من هذه الشراكة';
  }

  if (!data.privacyConsent) {
    errors.privacyConsent = 'يجب الموافقة على إشعار الخصوصية وشروط معالجة طلب التقديم للمتابعة';
  }

  return errors;
}

export function validateEntireForm(data: ApplicationFormData): ValidationErrors {
  return {
    ...validateStep1(data),
    ...validateStep2(data),
    ...validateStep3(data),
  };
}
