import { ApplicationFormData, SubmittedApplication } from '../types';

export interface SubmissionResponse {
  success: boolean;
  referenceId?: string;
  submittedAt?: string;
  errorMessage?: string;
  isDemoMode: boolean;
}

const STORAGE_KEY = 'mawthiq_partnership_applications_demo';

/**
 * Application Submission Service
 * 
 * In Demo / Prototype mode:
 * - Persists application securely in local browser storage for test review.
 * - Generates an authentic formatted application reference code (MWTQ-XXXX).
 * - Emulates standard network request lifecycle with loading states.
 * 
 * To connect to a Production Backend API:
 * - Set the environment variable VITE_API_ENDPOINT in .env
 * - Replace the demo branch with a fetch/axios POST call to your secure endpoint.
 */
export async function submitApplication(
  data: ApplicationFormData
): Promise<SubmissionResponse> {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  // If a real backend endpoint is configured, send the payload securely
  if (apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          clientUserAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'تعذر إرسال الطلب عبر الخادم، يرجى المحاولة لاحقاً');
      }

      const result = await response.json();
      return {
        success: true,
        referenceId: result.referenceId || `MWTQ-${Date.now().toString().slice(-6)}`,
        submittedAt: new Date().toISOString(),
        isDemoMode: false,
      };
    } catch (err) {
      return {
        success: false,
        errorMessage: err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء إرسال الطلب',
        isDemoMode: false,
      };
    }
  }

  // Development / Demo Simulation Mode
  await new Promise((resolve) => setTimeout(resolve, 1100)); // Simulate realistic network roundtrip

  try {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `MWTQ-${new Date().getFullYear()}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const newRecord: SubmittedApplication = {
      id: referenceId,
      submittedAt: timestamp,
      status: 'new',
      data: { ...data },
    };

    // Store in localStorage for prototype demonstration & review
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existingList: SubmittedApplication[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));

    return {
      success: true,
      referenceId,
      submittedAt: timestamp,
      isDemoMode: true,
    };
  } catch {
    return {
      success: false,
      errorMessage: 'تعذر حفظ الطلب في التخزين المحلي التجريبي.',
      isDemoMode: true,
    };
  }
}

/**
 * Retrieve local demo submissions (for internal testing/reviewer inspection)
 */
export function getDemoSubmissions(): SubmittedApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear local demo submissions
 */
export function clearDemoSubmissions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
