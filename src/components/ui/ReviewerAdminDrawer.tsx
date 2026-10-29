import React, { useState, useEffect } from 'react';
import { SubmittedApplication, ApplicationStatus } from '../../types';
import { getDemoSubmissions, clearDemoSubmissions } from '../../lib/applicationService';
import {
  Users,
  X,
  Mail,
  ExternalLink,
  Trash2,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const ReviewerAdminDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmittedApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<SubmittedApplication | null>(null);

  const refreshList = () => {
    const list = getDemoSubmissions();
    setSubmissions(list);
    if (selectedApp) {
      const updated = list.find((a) => a.id === selectedApp.id) || null;
      setSelectedApp(updated);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshList();
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع الطلبات التجريبية المحلية؟')) {
      clearDemoSubmissions();
      refreshList();
      setSelectedApp(null);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const map = {
      new: { label: 'جديد', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
      under_review: { label: 'قيد المراجعة', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
      interview: { label: 'جلسة استكشاف', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      additional_eval: { label: 'تقييم إضافي', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      closed: { label: 'مغلق', color: 'bg-slate-800 text-slate-400 border-slate-700' },
    };
    const s = map[status] || map.new;
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${s.color}`}>
        {s.label}
      </span>
    );
  };

  return (
    <>
      {/* Floating Toggle Button for Reviewers/Demonstration */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-750 shadow-xl backdrop-blur-md text-xs font-medium transition-all group active:scale-95"
          title="معاينة الطلبات الواردة (لأغراض المراجعة والتجربة)"
        >
          <Users className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">معاينة الطلبات (لجنة الاستقطاب)</span>
          <span className="sm:hidden">الطلبات</span>
          {submissions.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-mawthiq-600 text-white text-[10px] flex items-center justify-center font-bold">
              {submissions.length}
            </span>
          )}
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="لوحة استعراض الطلبات الواردة"
        >
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-2xl w-full bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col z-10 text-right">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>الطلبات الواردة (النمط التجريبي)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      لجنة الاستقطاب
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    استعراض طلبات الشركاء المسجلة محلياً في هذا المتصفح
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={refreshList}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  title="تحديث القائمة"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                {submissions.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/30"
                    title="مسح الطلبات"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {submissions.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-300">
                    لا توجد طلبات واردة حالياً
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    قم بتعبئة نموذج التقديم في أسفل الصفحة لتجربة حفظ واستعراض الطلب كمرشح حقيقي.
                  </p>
                </div>
              ) : selectedApp ? (
                /* Detail View of an application */
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="text-xs text-mawthiq-400 hover:text-mawthiq-300 flex items-center gap-1 font-medium mb-2"
                  >
                    <span>← العودة لقائمة الطلبات</span>
                  </button>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {selectedApp.data.fullName}
                      </span>
                      {getStatusBadge(selectedApp.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-mono text-mawthiq-400">{selectedApp.id}</span>
                      <span>•</span>
                      <span>
                        {new Date(selectedApp.submittedAt).toLocaleDateString('ar-EG', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2 text-xs">
                      <a
                        href={`mailto:${selectedApp.data.email}`}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-white bg-slate-900 px-2 py-1 rounded border border-slate-800"
                      >
                        <Mail className="w-3 h-3 text-mawthiq-400" />
                        <span>{selectedApp.data.email}</span>
                      </a>
                      {selectedApp.data.profileUrl && (
                        <a
                          href={selectedApp.data.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-slate-300 hover:text-white bg-slate-900 px-2 py-1 rounded border border-slate-800"
                        >
                          <ExternalLink className="w-3 h-3 text-amber-400" />
                          <span>الملف المهني</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Section: Basic info */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-slate-200 block text-sm">مجال المساهمة والالتزام الزمني</span>
                    <p className="text-slate-300">
                      <strong className="text-slate-400">المجال الأساسي: </strong>
                      {selectedApp.data.primaryArea === 'commercial_strategy' && 'التفكير التجاري والاستراتيجي'}
                      {selectedApp.data.primaryArea === 'tech_products' && 'تطوير الحلول والمنتجات البرمجية'}
                      {selectedApp.data.primaryArea === 'operations_management' && 'التشغيل والإدارة وتطوير الأعمال'}
                      {selectedApp.data.primaryArea === 'marketing_growth' && 'التسويق واكتساب العملاء والنمو'}
                      {selectedApp.data.primaryArea === 'other' && `تخصص آخر (${selectedApp.data.otherAreaDetail})`}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-slate-400">الوقت المتاح أسبوعياً: </strong>
                      {selectedApp.data.weeklyTimeCommitment} ساعات أسبوعياً
                    </p>
                  </div>

                  {/* Section: Thinking */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4 text-xs leading-relaxed">
                    <span className="font-bold text-slate-200 block text-sm">إجابات التفكير والقيمة المضافة</span>
                    
                    <div>
                      <strong className="text-slate-400 block mb-1">أبرز الخبرات والإنجازات:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.keyAchievements}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">دافع الشراكة والتأسيس:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.whyFoundingPartner}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">المشكلة أو فرصة السوق المستهدفة:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.targetOpportunityOrProblem}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">منهجية فهم احتياج العميل:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.customerNeedApproach}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">القيمة النوعية المضافة:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.valueContribution}
                      </p>
                    </div>

                    {selectedApp.data.handlingUncertainty && (
                      <div>
                        <strong className="text-slate-400 block mb-1">إدارة عدم اليقين:</strong>
                        <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                          {selectedApp.data.handlingUncertainty}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Section: Readiness */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4 text-xs leading-relaxed">
                    <span className="font-bold text-slate-200 block text-sm">المسؤوليات والتوقعات</span>
                    
                    <div>
                      <strong className="text-slate-400 block mb-1">المسؤوليات المريحة:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.comfortableResponsibilities}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">التعامل مع الاختلاف والملاحظات:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.feedbackAndDisagreements}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-1">التوقعات الشخصية والمهنية:</strong>
                      <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-850">
                        {selectedApp.data.expectationsFromOpportunity}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* List of applications */
                submissions.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-mawthiq-300 transition-colors">
                        {app.data.fullName}
                      </h4>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-mawthiq-400">{app.id}</span>
                      <span>
                        {new Date(app.submittedAt).toLocaleDateString('ar-EG', {
                          dateStyle: 'short',
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 truncate">
                      {app.data.targetOpportunityOrProblem || app.data.valueContribution}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-850">
                      <span>اضغط لاستعراض التفاصيل الكاملة</span>
                      <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
