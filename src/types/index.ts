export type PrimaryArea = 
  | 'commercial_strategy'
  | 'tech_products'
  | 'operations_management'
  | 'marketing_growth'
  | 'other';

export interface ApplicationFormData {
  // Step 1: Basic Information
  fullName: string;
  email: string;
  profileUrl: string;
  primaryArea: PrimaryArea | '';
  otherAreaDetail: string;

  // Step 2: Thinking & Contribution
  keyAchievements: string;
  whyFoundingPartner: string;
  targetOpportunityOrProblem: string;
  customerNeedApproach: string;
  valueContribution: string;
  handlingUncertainty: string;

  // Step 3: Readiness & Expectations
  weeklyTimeCommitment: string;
  comfortableResponsibilities: string;
  feedbackAndDisagreements: string;
  expectationsFromOpportunity: string;
  privacyConsent: boolean;
}

export type ApplicationStatus = 
  | 'new'
  | 'under_review'
  | 'interview'
  | 'additional_eval'
  | 'closed';

export interface SubmittedApplication {
  id: string;
  submittedAt: string;
  data: ApplicationFormData;
  status: ApplicationStatus;
  notes?: string;
}

export interface SelfAssessmentQuestion {
  id: number;
  question: string;
  subtext: string;
  positivePerspective: string;
  considerationNote: string;
}

export interface ValueItem {
  number: string;
  title: string;
  summary: string;
  details: string;
}

export interface PartnerCapability {
  letter: string;
  title: string;
  titleEn: string;
  badge: string;
  description: string;
  keyPoints: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isClarification?: boolean;
}

export interface JoiningStep {
  stepNumber: string;
  title: string;
  durationEstimate?: string;
  description: string;
  outcome: string;
}
