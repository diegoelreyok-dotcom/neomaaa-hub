'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import type {
  QuizResult,
  QuizResultQuestion,
  QuizSessionQuestion,
} from '@/lib/quiz-types';

export interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  docPath: string; // "section/slug", e.g. "encyclopedia/abc"
  docTitle: string;
  language: 'es' | 'ru';
}

type ViewState =
  | 'intro'
  | 'loading'
  | 'in_progress'
  | 'submitting'
  | 'result'
  | 'error';

interface QuizStrings {
  title: string;
  introLead: string;
  questions: string;
  noTime: string;
  pass: string;
  warnAbandon: string;
  cancel: string;
  start: string;
  loading: string;
  questionOf: (a: number, b: number) => string;
  previous: string;
  next: string;
  submit: string;
  submitting: string;
  confirmLeaveTitle: string;
  confirmLeaveBody: string;
  stay: string;
  leave: string;
  approved: string;
  notApproved: string;
  scoreLabel: string;
  needScore: (n: number) => string;
  certificateIssued: string;
  certificatePreview: (doc: string) => string;
  viewCertificate: string;
  close: string;
  reviewErrors: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  noAnswer: string;
  study: string;
  retry: string;
  errorTitle: string;
  errorBody: string;
  tryAgain: string;
}

const i18n: Record<'es' | 'ru', QuizStrings> = {
  es: {
    title: 'Quiz de evaluacion',
    introLead: 'Para marcar este documento como completado, debes responder un quiz.',
    questions: '10 preguntas',
    noTime: 'Sin tiempo limite',
    pass: 'Apruebas con 7/10',
    warnAbandon:
      'Si abandonas el quiz, perderas el progreso y deberas empezar de cero.',
    cancel: 'Cancelar',
    start: 'Comenzar Quiz',
    loading: 'Preparando preguntas...',
    questionOf: (a: number, b: number) => `Pregunta ${a} de ${b}`,
    previous: 'Anterior',
    next: 'Siguiente',
    submit: 'Enviar respuestas',
    submitting: 'Enviando respuestas...',
    confirmLeaveTitle: 'Seguro que quieres salir?',
    confirmLeaveBody:
      'Si sales ahora perderas todo el progreso del quiz y deberas empezar desde cero.',
    stay: 'Seguir con el quiz',
    leave: 'Salir y perder progreso',
    approved: 'Aprobado',
    notApproved: 'No aprobado',
    scoreLabel: 'Puntaje',
    needScore: (n: number) => `Necesitas ${n} para aprobar`,
    certificateIssued: 'Has obtenido el certificado',
    certificatePreview: (doc: string) => `Certificado de ${doc} — NEOMAAA Markets`,
    viewCertificate: 'Ver certificado completo',
    close: 'Cerrar',
    reviewErrors: 'Revisa las preguntas que erraste',
    yourAnswer: 'Tu respuesta',
    correctAnswer: 'Correcta',
    explanation: 'Explicacion',
    noAnswer: 'Sin responder',
    study: 'Estudiar otra vez',
    retry: 'Reintentar quiz',
    errorTitle: 'Ocurrio un error',
    errorBody:
      'No pudimos procesar tu solicitud. Verifica tu conexion e intenta nuevamente.',
    tryAgain: 'Reintentar',
  },
  ru: {
    title: 'Тест для оценки',
    introLead:
      'Чтобы отметить документ как завершённый, вы должны пройти тест.',
    questions: '10 вопросов',
    noTime: 'Без ограничения времени',
    pass: 'Проходной балл: 7 из 10',
    warnAbandon:
      'Если вы прервёте тест, прогресс будет потерян, и начать придётся заново.',
    cancel: 'Отмена',
    start: 'Начать тест',
    loading: 'Загрузка вопросов...',
    questionOf: (a: number, b: number) => `Вопрос ${a} из ${b}`,
    previous: 'Назад',
    next: 'Далее',
    submit: 'Отправить ответы',
    submitting: 'Отправка ответов...',
    confirmLeaveTitle: 'Вы уверены, что хотите выйти?',
    confirmLeaveBody:
      'Если выйти сейчас, весь прогресс будет потерян, и придётся начать заново.',
    stay: 'Продолжить тест',
    leave: 'Выйти и потерять прогресс',
    approved: 'Пройдено',
    notApproved: 'Не пройдено',
    scoreLabel: 'Результат',
    needScore: (n: number) => `Нужно ${n} для прохождения`,
    certificateIssued: 'Вы получили сертификат',
    certificatePreview: (doc: string) => `Сертификат: ${doc} — NEOMAAA Markets`,
    viewCertificate: 'Посмотреть сертификат',
    close: 'Закрыть',
    reviewErrors: 'Просмотр ошибок',
    yourAnswer: 'Ваш ответ',
    correctAnswer: 'Правильный',
    explanation: 'Пояснение',
    noAnswer: 'Нет ответа',
    study: 'Изучить снова',
    retry: 'Пройти заново',
    errorTitle: 'Произошла ошибка',
    errorBody:
      'Не удалось обработать запрос. Проверьте соединение и попробуйте снова.',
    tryAgain: 'Повторить',
  },
};

interface StartResponse {
  sessionId: string;
  questions: Array<Pick<QuizSessionQuestion, 'questionId' | 'question' | 'shuffledOptions'>>;
  totalQuestions: number;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizModal({
  open,
  onClose,
  onSuccess,
  docPath,
  docTitle,
  language,
}: QuizModalProps) {
  const t = i18n[language];

  const [view, setView] = useState<ViewState>('intro');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<StartResponse['questions']>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmLeave, setConfirmLeave] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const hasNotifiedSuccessRef = useRef(false);

  const inProgressActive = view === 'in_progress' || view === 'submitting';

  // Reset internal state when modal closes from the outside.
  useEffect(() => {
    if (!open) {
      // allow exit animation then reset
      const timer = setTimeout(() => {
        setView('intro');
        setSessionId(null);
        setQuestions([]);
        setAnswers([]);
        setCurrentIdx(0);
        setResult(null);
        setErrorMsg('');
        setConfirmLeave(false);
        hasNotifiedSuccessRef.current = false;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // beforeunload guard while quiz is in progress.
  useEffect(() => {
    if (!inProgressActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [inProgressActive]);

  // Scroll modal content to top whenever we change question or view.
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIdx, view]);

  const attemptClose = useCallback(() => {
    if (inProgressActive) {
      setConfirmLeave(true);
    } else {
      onClose();
    }
  }, [inProgressActive, onClose]);

  // ESC key closes (with guard) and Arrow/Enter keyboard nav for options.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (confirmLeave) {
          setConfirmLeave(false);
          return;
        }
        attemptClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, attemptClose, confirmLeave]);

  const startQuiz = useCallback(async () => {
    setView('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docPath, language }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as StartResponse;
      if (!data?.questions?.length) throw new Error('Empty question set');
      setSessionId(data.sessionId);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(-1));
      setCurrentIdx(0);
      setResult(null);
      setView('in_progress');
    } catch (err: any) {
      setErrorMsg(err?.message || 'unknown');
      setView('error');
    }
  }, [docPath, language]);

  const submitQuiz = useCallback(async () => {
    if (!sessionId) return;
    setView('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answers }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as QuizResult;
      setResult(data);
      setView('result');
      if (data.passed && !hasNotifiedSuccessRef.current) {
        hasNotifiedSuccessRef.current = true;
        try {
          onSuccess();
        } catch {
          /* noop */
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'unknown');
      setView('error');
    }
  }, [sessionId, answers, onSuccess]);

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const goNext = () => {
    if (currentIdx >= questions.length - 1) {
      submitQuiz();
    } else {
      setCurrentIdx((i) => Math.min(questions.length - 1, i + 1));
    }
  };

  const setAnswer = (value: number) => {
    setAnswers((prev) => {
      const n = prev.slice();
      n[currentIdx] = value;
      return n;
    });
  };

  const retry = () => {
    setResult(null);
    setAnswers([]);
    setCurrentIdx(0);
    setSessionId(null);
    startQuiz();
  };

  if (!open) return null;

  const progressPct = questions.length
    ? Math.round(((currentIdx + 1) / questions.length) * 100)
    : 0;

  const currentQuestion = questions[currentIdx];
  const currentAnswer = answers[currentIdx] ?? -1;
  const canAdvance = currentAnswer >= 0;
  const isLast = currentIdx === questions.length - 1;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-6 sm:py-10 animate-quiz-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neo-dark/85 backdrop-blur-sm"
        onClick={attemptClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-2xl border border-neo-dark-3 bg-neo-dark-2 shadow-2xl shadow-black/60 animate-quiz-pop"
      >
        {view === 'intro' && (
          <IntroView
            t={t}
            docTitle={docTitle}
            onCancel={onClose}
            onStart={startQuiz}
          />
        )}

        {view === 'loading' && <LoadingView label={t.loading} />}

        {view === 'in_progress' && currentQuestion && (
          <InProgressView
            t={t}
            idx={currentIdx}
            total={questions.length}
            progressPct={progressPct}
            question={currentQuestion}
            currentAnswer={currentAnswer}
            isLast={isLast}
            canAdvance={canAdvance}
            onClose={attemptClose}
            onPrev={goPrev}
            onNext={goNext}
            onSelect={setAnswer}
          />
        )}

        {view === 'submitting' && <LoadingView label={t.submitting} />}

        {view === 'result' && result && (
          <ResultView
            t={t}
            result={result}
            questions={questions}
            answers={answers}
            docTitle={docTitle}
            language={language}
            onClose={onClose}
            onRetry={retry}
          />
        )}

        {view === 'error' && (
          <ErrorView
            t={t}
            message={errorMsg}
            onClose={onClose}
            onRetry={view === 'error' ? startQuiz : undefined}
          />
        )}

        {confirmLeave && (
          <ConfirmLeaveDialog
            t={t}
            onStay={() => setConfirmLeave(false)}
            onLeave={() => {
              setConfirmLeave(false);
              onClose();
            }}
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes quiz-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes quiz-pop-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-quiz-fade {
          animation: quiz-fade-in 0.18s ease-out both;
        }
        .animate-quiz-pop {
          animation: quiz-pop-in 0.22s ease-out both;
        }
      `}</style>
    </div>
  );
}

/* ---------- Sub views ---------- */

function IntroView({
  t,
  docTitle,
  onCancel,
  onStart,
}: {
  t: QuizStrings;
  docTitle: string;
  onCancel: () => void;
  onStart: () => void;
}) {
  return (
    <div className="p-8 sm:p-10">
      <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-neo-text-muted">
        {t.title}
      </div>
      <h2
        id="quiz-modal-title"
        className="text-2xl sm:text-[26px] font-bold text-neo-text leading-tight"
      >
        {docTitle}
      </h2>
      <p className="mt-4 text-sm text-neo-text-body leading-relaxed">
        {t.introLead}
      </p>

      <ul className="mt-6 space-y-3">
        <IntroItem icon={<IconList />} label={t.questions} />
        <IntroItem icon={<IconClock />} label={t.noTime} />
        <IntroItem icon={<IconCheck />} label={t.pass} />
        <IntroItem
          icon={<IconAlert />}
          label={t.warnAbandon}
          tone="warning"
        />
      </ul>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-secondary hover:text-neo-text border border-neo-dark-3 hover:border-neo-dark-4 bg-transparent transition-colors"
        >
          {t.cancel}
        </button>
        <button
          onClick={onStart}
          className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors shadow-lg shadow-neo-primary/20"
        >
          {t.start}
          <span aria-hidden="true" className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}

function IntroItem({
  icon,
  label,
  tone = 'neutral',
}: {
  icon: React.ReactNode;
  label: string;
  tone?: 'neutral' | 'warning';
}) {
  const color =
    tone === 'warning' ? 'text-neo-warning' : 'text-neo-primary-light';
  return (
    <li className="flex items-start gap-3">
      <span className={`flex-shrink-0 mt-0.5 ${color}`}>{icon}</span>
      <span className="text-sm text-neo-text-body leading-relaxed">
        {label}
      </span>
    </li>
  );
}

function LoadingView({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      <svg
        className="animate-spin w-10 h-10 text-neo-primary mb-5"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-25"
        />
        <path
          d="M4 12a8 8 0 018-8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm text-neo-text-muted">{label}</p>
    </div>
  );
}

function InProgressView({
  t,
  idx,
  total,
  progressPct,
  question,
  currentAnswer,
  isLast,
  canAdvance,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  t: QuizStrings;
  idx: number;
  total: number;
  progressPct: number;
  question: { questionId: string; question: string; shuffledOptions: string[] };
  currentAnswer: number;
  isLast: boolean;
  canAdvance: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (v: number) => void;
}) {
  // Arrow keys change option; Enter goes next if allowed.
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nxt = currentAnswer < 0 ? 0 : Math.min(question.shuffledOptions.length - 1, currentAnswer + 1);
      onSelect(nxt);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nxt = currentAnswer <= 0 ? 0 : currentAnswer - 1;
      onSelect(nxt);
    } else if (e.key === 'Enter' && canAdvance) {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <div
      className="flex flex-col min-h-[480px]"
      tabIndex={-1}
      onKeyDown={onKey}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-3">
        <div className="text-xs font-medium text-neo-text-muted tracking-wide">
          {t.questionOf(idx + 1, total)}
        </div>
        <button
          onClick={onClose}
          aria-label={t.close}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-neo-text-muted hover:text-neo-text hover:bg-neo-dark-3/50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6 sm:px-8">
        <div className="h-1.5 w-full rounded-full bg-neo-dark-3 overflow-hidden">
          <div
            className="h-full bg-neo-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="px-6 sm:px-8 pt-6 pb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-neo-text leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="px-6 sm:px-8 py-4 flex-1 space-y-2.5">
        {question.shuffledOptions.map((opt, i) => {
          const selected = currentAnswer === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`
                w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-150
                ${selected
                  ? 'border-neo-primary bg-neo-primary/10'
                  : 'border-neo-dark-3 hover:border-neo-dark-4 bg-neo-dark-3/20 hover:bg-neo-dark-3/40'
                }
              `}
            >
              <span
                className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold mt-0.5
                  ${selected
                    ? 'border-neo-primary bg-neo-primary text-white'
                    : 'border-neo-dark-4 text-neo-text-muted'
                  }
                `}
                aria-hidden="true"
              >
                {OPTION_LETTERS[i]}
              </span>
              <span className="text-sm text-neo-text-body leading-relaxed pt-0.5">
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-6 sm:px-8 py-5 border-t border-neo-dark-3/60 flex items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={idx === 0}
          className={`
            px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
            ${idx === 0
              ? 'text-neo-text-muted/40 cursor-not-allowed'
              : 'text-neo-text-secondary hover:text-neo-text hover:bg-neo-dark-3/50'
            }
          `}
        >
          <span aria-hidden="true" className="mr-1">←</span> {t.previous}
        </button>
        <button
          onClick={onNext}
          disabled={!canAdvance}
          className={`
            px-5 py-2.5 rounded-lg text-sm font-bold transition-all
            ${canAdvance
              ? 'bg-neo-primary text-white hover:bg-neo-primary-light shadow-md shadow-neo-primary/20'
              : 'bg-neo-dark-3 text-neo-text-muted/60 cursor-not-allowed'
            }
          `}
        >
          {isLast ? t.submit : (
            <>
              {t.next} <span aria-hidden="true" className="ml-1">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ResultView({
  t,
  result,
  questions,
  answers,
  docTitle,
  language,
  onClose,
  onRetry,
}: {
  t: QuizStrings;
  result: QuizResult;
  questions: StartResponse['questions'];
  answers: number[];
  docTitle: string;
  language: 'es' | 'ru';
  onClose: () => void;
  onRetry: () => void;
}) {
  const passed = result.passed;

  const wrongPerQ: QuizResultQuestion[] = useMemo(
    () => result.perQuestion.filter((p) => !p.correct),
    [result.perQuestion]
  );

  return (
    <div className="p-8 sm:p-10">
      {/* Header with icon */}
      <div className="flex flex-col items-center text-center">
        {passed ? (
          <div className="w-16 h-16 rounded-full bg-neo-success/15 flex items-center justify-center mb-4 animate-quiz-check">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-neo-warning/15 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neo-warning">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        )}
        <h2
          id="quiz-modal-title"
          className={`text-2xl font-bold ${passed ? 'text-neo-success' : 'text-neo-warning'}`}
        >
          {passed ? t.approved : t.notApproved}
        </h2>
        <p className="mt-2 text-sm text-neo-text-body">
          {t.scoreLabel}:{' '}
          <span className="font-semibold text-neo-text">
            {result.score}/{result.totalQuestions}
          </span>
          {!passed && (
            <>
              {' — '}
              <span className="text-neo-text-muted">
                {t.needScore(result.passThreshold)}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Certificate (if passed) */}
      {passed && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-neo-text-muted text-center mb-3">
            {t.certificateIssued}
          </p>
          <div className="rounded-xl border border-neo-primary/30 bg-gradient-to-br from-neo-dark-3/60 to-neo-dark-2 p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-neo-primary/15 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-primary-light">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-neo-text truncate">
                  {t.certificatePreview(docTitle)}
                </div>
                {result.certificateId && (
                  <div className="text-[11px] text-neo-text-muted font-mono mt-1 truncate">
                    ID: {result.certificateId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wrong questions review (if failed) */}
      {!passed && wrongPerQ.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-neo-text-muted mb-3">
            {t.reviewErrors}
          </p>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {wrongPerQ.map((pq, i) => {
              const qIdx = questions.findIndex(
                (q) => q.questionId === pq.questionId
              );
              const q = qIdx >= 0 ? questions[qIdx] : null;
              const userLabel =
                pq.userAnswer >= 0
                  ? OPTION_LETTERS[pq.userAnswer]
                  : t.noAnswer;
              const correctLabel = OPTION_LETTERS[pq.correctAnswer];
              return (
                <div
                  key={pq.questionId}
                  className="rounded-lg border border-neo-dark-3 bg-neo-dark-3/30 p-4"
                >
                  <div className="text-sm font-medium text-neo-text mb-2">
                    {qIdx >= 0 ? `${qIdx + 1}. ` : ''}
                    {q?.question || ''}
                  </div>
                  <div className="text-[12px] text-neo-text-muted space-y-1">
                    <div>
                      <span className="text-neo-danger">●</span>{' '}
                      <span className="text-neo-text-secondary">
                        {t.yourAnswer}:
                      </span>{' '}
                      <span className="text-neo-text-body">
                        {userLabel}
                        {pq.userAnswer >= 0 && q
                          ? `. ${q.shuffledOptions[pq.userAnswer]}`
                          : ''}
                      </span>
                    </div>
                    <div>
                      <span className="text-neo-success">●</span>{' '}
                      <span className="text-neo-text-secondary">
                        {t.correctAnswer}:
                      </span>{' '}
                      <span className="text-neo-text-body">
                        {correctLabel}
                        {q ? `. ${q.shuffledOptions[pq.correctAnswer]}` : ''}
                      </span>
                    </div>
                    {pq.explanation && (
                      <div className="mt-2 pt-2 border-t border-neo-dark-3/70 text-neo-text-body/90">
                        <span className="text-neo-text-secondary">
                          {t.explanation}:
                        </span>{' '}
                        {pq.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {passed ? (
          <>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-secondary hover:text-neo-text border border-neo-dark-3 hover:border-neo-dark-4 transition-colors"
            >
              {t.close}
            </button>
            {result.certificateId && (
              <Link
                href={`/certificates/${encodeURIComponent(result.certificateId)}`}
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors shadow-lg shadow-neo-primary/20 text-center"
              >
                {t.viewCertificate}
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            )}
          </>
        ) : (
          <>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-secondary hover:text-neo-text border border-neo-dark-3 hover:border-neo-dark-4 transition-colors"
            >
              {t.study}
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors shadow-lg shadow-neo-primary/20"
            >
              {t.retry}
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes quiz-check-pop {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          60% {
            transform: scale(1.12);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-quiz-check {
          animation: quiz-check-pop 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
        }
      `}</style>
    </div>
  );
}

function ErrorView({
  t,
  message,
  onClose,
  onRetry,
}: {
  t: QuizStrings;
  message: string;
  onClose: () => void;
  onRetry?: () => void;
}) {
  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-neo-danger/15 flex items-center justify-center mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 id="quiz-modal-title" className="text-xl font-bold text-neo-text">
          {t.errorTitle}
        </h2>
        <p className="mt-2 text-sm text-neo-text-body">{t.errorBody}</p>
        {message && (
          <p className="mt-3 text-[11px] text-neo-text-muted/70 font-mono break-all">
            {message}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-secondary hover:text-neo-text border border-neo-dark-3 hover:border-neo-dark-4 transition-colors"
        >
          {t.close}
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors shadow-lg shadow-neo-primary/20"
          >
            {t.tryAgain}
          </button>
        )}
      </div>
    </div>
  );
}

function ConfirmLeaveDialog({
  t,
  onStay,
  onLeave,
}: {
  t: QuizStrings;
  onStay: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center px-4"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-neo-dark/80 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-[420px] rounded-xl border border-neo-dark-3 bg-neo-dark-2 p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-neo-warning/15 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-warning">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-neo-text">
              {t.confirmLeaveTitle}
            </h3>
            <p className="mt-1 text-sm text-neo-text-body leading-relaxed">
              {t.confirmLeaveBody}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            onClick={onLeave}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-neo-danger hover:text-white hover:bg-neo-danger/80 border border-neo-danger/50 transition-colors"
          >
            {t.leave}
          </button>
          <button
            onClick={onStay}
            className="px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors"
          >
            {t.stay}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

function IconList() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconAlert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
