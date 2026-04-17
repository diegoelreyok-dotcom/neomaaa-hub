'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';
import QuizModal from '@/components/QuizModal';

interface CompletionButtonProps {
  documentPath: string; // doc.filePath, e.g. "sales/training.md"
  quizDocPath: string;  // "{section}/{slug}", e.g. "sales/training"
  docTitle: string;
  lang: Lang;
  isCompleted: boolean;
  userName?: string;
}

const i18n = {
  es: {
    markComplete: 'Marcar como completado',
    markCompleteQuiz: 'Marcar como completado (tomar quiz)',
    takeQuizForCert: 'Tomar quiz para obtener certificado',
    completed: 'Completado',
    completing: 'Registrando...',
    docCompleted: 'Documento completado',
    keepStudying: 'Puedes volver a estudiar este documento en cualquier momento.',
    error: 'Error al registrar. Intenta de nuevo.',
  },
  ru: {
    markComplete: '\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u043E\u0435',
    markCompleteQuiz: '\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u043E\u0435 (\u043F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442)',
    completed: '\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E',
    completing: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F...',
    takeQuizForCert: '\u041F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430',
    docCompleted: '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D',
    keepStudying: '\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044E \u044D\u0442\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.',
    error: '\u041E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.',
  },
  en: {
    markComplete: 'Mark as completed',
    markCompleteQuiz: 'Mark as completed (take quiz)',
    takeQuizForCert: 'Take quiz to earn certificate',
    completed: 'Completed',
    completing: 'Saving...',
    docCompleted: 'Document completed',
    keepStudying: 'You can revisit this document anytime.',
    error: 'Error saving progress. Try again.',
  },
};

export default function CompletionButton({
  documentPath,
  quizDocPath,
  docTitle,
  lang,
  isCompleted: initialCompleted,
  userName,
}: CompletionButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [quizAvailable, setQuizAvailable] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const t = i18n[lang];

  // Check whether a quiz exists for this document.
  // Quiz pools only exist in ES and RU. EN users take the ES quiz.
  const quizLang: 'es' | 'ru' = lang === 'ru' ? 'ru' : 'es';
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/quiz/available?docPath=${encodeURIComponent(quizDocPath)}&language=${quizLang}`)
      .then(async (r) => {
        if (!r.ok) return { exists: false };
        return r.json().catch(() => ({ exists: false }));
      })
      .then((data) => {
        if (cancelled) return;
        // Backend returns { exists, language, es, ru } — quiz available if exists in current lang or "both"
        const inLang = quizLang === 'es' ? data?.es : data?.ru;
        setQuizAvailable(Boolean(data?.exists && inLang));
      })
      .catch(() => {
        if (!cancelled) setQuizAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [quizDocPath, quizLang]);

  const markCompletedDirect = useCallback(async () => {
    if (loading || completed) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentPath, completed: true }),
      });
      if (!res.ok) throw new Error('Failed');
      setCompleted(true);
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 4000);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [documentPath, loading, completed]);

  const handleClick = useCallback(() => {
    if (completed || loading) return;
    if (quizAvailable) {
      setModalOpen(true);
    } else {
      void markCompletedDirect();
    }
  }, [completed, loading, quizAvailable, markCompletedDirect]);

  // When quiz is passed, mark the doc as completed (quiz server already issues cert,
  // but we still record progress so the UI reflects completion).
  const handleQuizSuccess = useCallback(() => {
    setCompleted(true);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 4000);
    // fire-and-forget: keep local progress store in sync
    fetch('/api/progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentPath, completed: true }),
    }).catch(() => { /* non-critical */ });
  }, [documentPath]);

  // Already completed (loaded from server or just marked)
  if (completed && !justCompleted) {
    return (
      <>
        <div className="mt-10 mb-4 space-y-3">
          <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl border-2 border-neo-success/30 bg-neo-success/5">
            <span className="w-6 h-6 rounded-full bg-neo-success/20 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-neo-success">{t.completed}</span>
          </div>
          {quizAvailable && (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3 px-6 rounded-xl border border-neo-primary/40 bg-neo-primary/5 text-sm font-semibold text-neo-primary hover:bg-neo-primary/10 transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                {t.takeQuizForCert}
              </span>
            </button>
          )}
        </div>
        <QuizModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleQuizSuccess}
          docPath={quizDocPath}
          docTitle={docTitle}
          language={quizLang}
          userName={userName}
        />
      </>
    );
  }

  // Just completed — success animation
  if (justCompleted) {
    return (
      <div className="mt-10 mb-4">
        <div className="completion-success-container relative flex flex-col items-center justify-center w-full py-6 px-6 rounded-xl border-2 border-neo-success/40 bg-neo-success/5 overflow-hidden">
          <div className="completion-ring absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full border-2 border-neo-success/60 animate-completion-ring" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-neo-success/20 flex items-center justify-center animate-completion-check">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-neo-success animate-completion-text">{t.docCompleted}</p>
              <p className="text-xs text-neo-text-muted mt-1">{t.keepStudying}</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes completion-ring {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
          }
          @keyframes completion-check {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes completion-text {
            0% { transform: translateY(8px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-completion-ring { animation: completion-ring 0.8s ease-out forwards; }
          .animate-completion-check { animation: completion-check 0.5s ease-out 0.2s both; }
          .animate-completion-text { animation: completion-text 0.4s ease-out 0.4s both; }
        `}</style>
      </div>
    );
  }

  const buttonLabel = quizAvailable ? t.markCompleteQuiz : t.markComplete;

  return (
    <>
      <div className="mt-10 mb-4">
        {error && (
          <p className="text-xs text-neo-danger text-center mb-3">{t.error}</p>
        )}
        <button
          onClick={handleClick}
          disabled={loading || quizAvailable === null}
          className={`
            w-full py-4 px-6 rounded-xl text-base font-bold
            transition-all duration-200
            ${loading || quizAvailable === null
              ? 'bg-neo-primary/50 text-white/60 cursor-wait'
              : 'bg-neo-primary text-white hover:bg-neo-primary-light hover:shadow-lg hover:shadow-neo-primary/20 active:scale-[0.98]'
            }
          `}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {t.completing}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {quizAvailable ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {buttonLabel}
            </span>
          )}
        </button>
      </div>

      <QuizModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleQuizSuccess}
        docPath={quizDocPath}
        docTitle={docTitle}
        language={quizLang}
      />
    </>
  );
}
