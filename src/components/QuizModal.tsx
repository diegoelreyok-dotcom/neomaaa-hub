'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type {
  QuizResult,
  QuizResultQuestion,
} from '@/lib/quiz-types';
import { translateApiError } from '@/lib/api-errors';

export interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  docPath: string; // "section/slug", e.g. "encyclopedia/abc"
  docTitle: string;
  language: 'es' | 'ru' | 'en';
  /** Shown in the "¡Felicitaciones, {name}!" passed screen. */
  userName?: string;
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
  questionsDesc: string;
  noTime: string;
  noTimeDesc: string;
  pass: string;
  passDesc: string;
  warnAbandon: string;
  warnAbandonDesc: string;
  cancel: string;
  start: string;
  loading: string;
  progressOf: (a: number, b: number) => string;
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
  congrats: (name: string) => string;
  congratsNoName: string;
  almost: string;
  almostBody: (score: number, threshold: number) => string;
  scoreLabel: string;
  needScore: (n: number) => string;
  certificateIssued: string;
  certificatePreview: (doc: string) => string;
  viewCertificate: string;
  viewCertificateNow: string;
  redirectingIn: (n: number) => string;
  close: string;
  reviewErrors: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  noAnswer: string;
  study: string;
  retry: string;
  retryIn: (mm: string, ss: string) => string;
  cooldownError: (mm: string, ss: string) => string;
  errorTitle: string;
  errorBody: string;
  tryAgain: string;
}

const i18n: Record<'es' | 'ru' | 'en', QuizStrings> = {
  es: {
    title: 'Quiz de evaluacion',
    introLead: 'Para marcar este documento como completado, debes responder un quiz.',
    questions: '10 preguntas',
    questionsDesc: 'Seleccionadas al azar del banco',
    noTime: 'Sin tiempo limite',
    noTimeDesc: 'Tomate el tiempo que necesites',
    pass: 'Apruebas con 7/10',
    passDesc: 'Certificado automatico al aprobar',
    warnAbandon: 'Si abandonas, pierdes el progreso',
    warnAbandonDesc: 'Deberas empezar desde cero',
    cancel: 'Cancelar',
    start: 'Comenzar Quiz',
    loading: 'Preparando preguntas...',
    progressOf: (a: number, b: number) => `${a}/${b}`,
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
    congrats: (name: string) => `Felicitaciones, ${name}!`,
    congratsNoName: 'Felicitaciones!',
    almost: 'Casi',
    almostBody: (score: number, threshold: number) =>
      `Has respondido correctamente ${score} de 10 preguntas. Necesitas ${threshold}/10. Estudia el material y vuelve a intentarlo en 1 hora.`,
    scoreLabel: 'Puntaje',
    needScore: (n: number) => `Necesitas ${n} para aprobar`,
    certificateIssued: 'Has obtenido el certificado',
    certificatePreview: (doc: string) => `Certificado de ${doc} — NEOMAAA Markets`,
    viewCertificate: 'Ver certificado completo',
    viewCertificateNow: 'Ver certificado ahora',
    redirectingIn: (n: number) => `Redirigiendo en ${n}...`,
    close: 'Cerrar',
    reviewErrors: 'Revisa las preguntas que erraste',
    yourAnswer: 'Tu respuesta',
    correctAnswer: 'Correcta',
    explanation: 'Explicacion',
    noAnswer: 'Sin responder',
    study: 'Estudiar otra vez',
    retry: 'Reintentar quiz',
    retryIn: (mm: string, ss: string) => `Puedes reintentar en ${mm}:${ss}`,
    cooldownError: (mm: string, ss: string) =>
      `Debes esperar ${mm}:${ss} antes de reintentar este quiz.`,
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
    questionsDesc: 'Случайная выборка из банка',
    noTime: 'Без ограничения времени',
    noTimeDesc: 'Не спешите',
    pass: 'Проходной балл: 7 из 10',
    passDesc: 'Сертификат выдаётся автоматически',
    warnAbandon: 'Выход означает потерю прогресса',
    warnAbandonDesc: 'Придётся начать заново',
    cancel: 'Отмена',
    start: 'Начать тест',
    loading: 'Загрузка вопросов...',
    progressOf: (a: number, b: number) => `${a}/${b}`,
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
    congrats: (name: string) => `Поздравляем, ${name}!`,
    congratsNoName: 'Поздравляем!',
    almost: 'Почти',
    almostBody: (score: number, threshold: number) =>
      `Вы ответили правильно на ${score} из 10 вопросов. Нужно ${threshold}/10. Изучите материал и попробуйте снова через 1 час.`,
    scoreLabel: 'Результат',
    needScore: (n: number) => `Нужно ${n} для прохождения`,
    certificateIssued: 'Вы получили сертификат',
    certificatePreview: (doc: string) => `Сертификат: ${doc} — NEOMAAA Markets`,
    viewCertificate: 'Посмотреть сертификат',
    viewCertificateNow: 'Посмотреть сертификат',
    redirectingIn: (n: number) => `Перенаправление через ${n}...`,
    close: 'Закрыть',
    reviewErrors: 'Просмотр ошибок',
    yourAnswer: 'Ваш ответ',
    correctAnswer: 'Правильный',
    explanation: 'Пояснение',
    noAnswer: 'Нет ответа',
    study: 'Изучить снова',
    retry: 'Пройти заново',
    retryIn: (mm: string, ss: string) => `Повтор через ${mm}:${ss}`,
    cooldownError: (mm: string, ss: string) =>
      `Подождите ${mm}:${ss} прежде чем пройти тест снова.`,
    errorTitle: 'Произошла ошибка',
    errorBody:
      'Не удалось обработать запрос. Проверьте соединение и попробуйте снова.',
    tryAgain: 'Повторить',
  },
  en: {
    title: 'Evaluation quiz',
    introLead: 'To mark this document as completed, you must pass a quiz.',
    questions: '10 questions',
    questionsDesc: 'Randomly selected from the question bank',
    noTime: 'No time limit',
    noTimeDesc: 'Take all the time you need',
    pass: 'Pass with 7/10',
    passDesc: 'Automatic certificate on pass',
    warnAbandon: 'If you leave, you lose your progress',
    warnAbandonDesc: 'You will have to start over',
    cancel: 'Cancel',
    start: 'Start quiz',
    loading: 'Preparing questions...',
    progressOf: (a: number, b: number) => `${a}/${b}`,
    questionOf: (a: number, b: number) => `Question ${a} of ${b}`,
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit answers',
    submitting: 'Submitting answers...',
    confirmLeaveTitle: 'Are you sure you want to leave?',
    confirmLeaveBody:
      'If you leave now you will lose all quiz progress and must start over.',
    stay: 'Continue quiz',
    leave: 'Leave and lose progress',
    approved: 'Passed',
    notApproved: 'Not passed',
    congrats: (name: string) => `Congratulations, ${name}!`,
    congratsNoName: 'Congratulations!',
    almost: 'Almost',
    almostBody: (score: number, threshold: number) =>
      `You answered ${score} of 10 correctly. You need ${threshold}/10. Review the material and try again in 1 hour.`,
    scoreLabel: 'Score',
    needScore: (n: number) => `Need ${n} to pass`,
    certificateIssued: 'You earned the certificate',
    certificatePreview: (doc: string) => `${doc} certificate — NEOMAAA Markets`,
    viewCertificate: 'View full certificate',
    viewCertificateNow: 'View certificate now',
    redirectingIn: (n: number) => `Redirecting in ${n}...`,
    close: 'Close',
    reviewErrors: 'Review the questions you missed',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct',
    explanation: 'Explanation',
    noAnswer: 'No answer',
    study: 'Study again',
    retry: 'Retry quiz',
    retryIn: (mm: string, ss: string) => `You can retry in ${mm}:${ss}`,
    cooldownError: (mm: string, ss: string) =>
      `You must wait ${mm}:${ss} before retrying this quiz.`,
    errorTitle: 'An error occurred',
    errorBody:
      'We could not process your request. Check your connection and try again.',
    tryAgain: 'Retry',
  },
};

interface ClientQuestion {
  id: string;
  question: string;
  options: string[];
}

interface StartResponse {
  sessionId: string;
  questions: ClientQuestion[];
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
  userName,
}: QuizModalProps) {
  const t = i18n[language];
  const router = useRouter();

  const [view, setView] = useState<ViewState>('intro');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<StartResponse['questions']>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmLeave, setConfirmLeave] = useState(false);
  /** Seconds until user can re-attempt this quiz. null means no cooldown. */
  const [cooldownLeft, setCooldownLeft] = useState<number | null>(null);

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
        setCooldownLeft(null);
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

  // Tick down cooldown every second (used by failed result + 409 error screens).
  useEffect(() => {
    if (cooldownLeft === null || cooldownLeft <= 0) return;
    const id = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownLeft]);

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
      // Questions only exist in es/ru; EN users get ES quiz content
      // while UI chrome stays in EN via i18n[language].
      const questionLang = language === 'ru' ? 'ru' : 'es';
      const res = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docPath, language: questionLang }),
      });
      if (res.status === 409) {
        const body = await res.json().catch(() => null);
        const secs = Number(body?.retryAfter) || 0;
        const mm = String(Math.floor(secs / 60)).padStart(2, '0');
        const ss = String(secs % 60).padStart(2, '0');
        setCooldownLeft(secs);
        setErrorMsg(t.cooldownError(mm, ss));
        setView('error');
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(translateApiError(body, language, `HTTP ${res.status}`));
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
  }, [docPath, language, t]);

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
        throw new Error(translateApiError(body, language, `HTTP ${res.status}`));
      }
      const data = (await res.json()) as QuizResult;
      setResult(data);
      setView('result');
      if (data.passed) {
        setCooldownLeft(null);
        if (!hasNotifiedSuccessRef.current) {
          hasNotifiedSuccessRef.current = true;
          try {
            onSuccess();
          } catch {
            /* noop */
          }
        }
      } else {
        // Start the 1h cooldown countdown using backend-authoritative value.
        const secs = typeof data.retryAfter === 'number' ? data.retryAfter : 3600;
        setCooldownLeft(secs);
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
            userName={userName}
            cooldownLeft={cooldownLeft}
            onClose={onClose}
            onRetry={retry}
            router={router}
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
      {/* Header — bigger hierarchy */}
      <h2
        id="quiz-modal-title"
        className="text-3xl sm:text-[34px] font-extrabold text-neo-text leading-tight tracking-tight"
      >
        {t.title}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-neo-primary/15 text-neo-primary-light border border-neo-primary/25">
          {docTitle}
        </span>
      </div>
      <p className="mt-5 text-sm text-neo-text-body leading-relaxed">
        {t.introLead}
      </p>

      {/* 2x2 grid */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <IntroCard
          icon={<IconList />}
          title={t.questions}
          desc={t.questionsDesc}
        />
        <IntroCard
          icon={<IconClock />}
          title={t.noTime}
          desc={t.noTimeDesc}
        />
        <IntroCard
          icon={<IconCheck />}
          title={t.pass}
          desc={t.passDesc}
          tone="success"
        />
        <IntroCard
          icon={<IconAlert />}
          title={t.warnAbandon}
          desc={t.warnAbandonDesc}
          tone="warning"
        />
      </div>

      {/* CTAs — prominent burgundy start, ghost cancel */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onCancel}
          className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-muted hover:text-neo-text bg-transparent hover:bg-neo-dark-3/40 transition-colors"
        >
          {t.cancel}
        </button>
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-white transition-all shadow-xl active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #98283A 0%, #7a1d2d 100%)',
            boxShadow: '0 10px 30px -10px rgba(152, 40, 58, 0.6)',
          }}
        >
          {t.start}
          <span aria-hidden="true" className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}

function IntroCard({
  icon,
  title,
  desc,
  tone = 'neutral',
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone?: 'neutral' | 'warning' | 'success';
}) {
  const ringColor =
    tone === 'warning'
      ? 'border-neo-warning/25 bg-neo-warning/5'
      : tone === 'success'
      ? 'border-neo-success/25 bg-neo-success/5'
      : 'border-neo-dark-3 bg-neo-dark-3/30';
  const iconColor =
    tone === 'warning'
      ? 'text-neo-warning bg-neo-warning/15'
      : tone === 'success'
      ? 'text-neo-success bg-neo-success/15'
      : 'text-neo-primary-light bg-neo-primary/15';
  return (
    <div className={`rounded-xl border p-4 transition-colors ${ringColor}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconColor}`}>
        <span className="[&_svg]:w-5 [&_svg]:h-5">{icon}</span>
      </div>
      <div className="text-[13px] font-bold text-neo-text leading-snug">
        {title}
      </div>
      <div className="mt-1 text-[12px] text-neo-text-muted leading-relaxed">
        {desc}
      </div>
    </div>
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
  question: { id: string; question: string; options: string[] };
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
      const nxt = currentAnswer < 0 ? 0 : Math.min(question.options.length - 1, currentAnswer + 1);
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

      {/* Progress bar with "X/10" label above */}
      <div className="px-6 sm:px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-neo-text-muted">
            {t.scoreLabel /* reused as "progreso" short label */}
          </span>
          <span className="text-[13px] font-bold text-neo-primary-light tabular-nums">
            {t.progressOf(idx + 1, total)}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-neo-dark-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neo-primary to-neo-primary-light transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question — generous top padding + fade-in on change */}
      <div key={`q-${idx}`} className="px-6 sm:px-8 pt-10 pb-3 animate-question-in">
        <h3 className="text-lg sm:text-xl font-semibold text-neo-text leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options — more padding, check icon when selected */}
      <div key={`opts-${idx}`} className="px-6 sm:px-8 py-4 flex-1 space-y-3 animate-question-in">
        {question.options.map((opt, i) => {
          const selected = currentAnswer === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`
                group w-full text-left flex items-start gap-3 px-5 py-4 rounded-xl border-2 transition-all duration-150
                ${selected
                  ? 'border-neo-primary bg-neo-primary/10 shadow-md shadow-neo-primary/10'
                  : 'border-neo-dark-3 hover:border-neo-primary/50 bg-neo-dark-3/20 hover:bg-neo-dark-3/50 hover:-translate-y-[1px]'
                }
              `}
            >
              <span
                className={`
                  flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-[12px] font-bold mt-0.5 transition-all
                  ${selected
                    ? 'border-neo-primary bg-neo-primary text-white'
                    : 'border-neo-dark-4 text-neo-text-muted group-hover:border-neo-primary/50'
                  }
                `}
                aria-hidden="true"
              >
                {selected ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  OPTION_LETTERS[i]
                )}
              </span>
              <span className="text-sm text-neo-text-body leading-relaxed pt-1">
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom actions — better spacing; submit-final in success green */}
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
            px-6 py-3 rounded-lg text-sm font-bold transition-all active:scale-[0.98]
            ${!canAdvance
              ? 'bg-neo-dark-3 text-neo-text-muted/60 cursor-not-allowed'
              : isLast
                ? 'bg-neo-success text-white hover:brightness-110 shadow-lg shadow-neo-success/25'
                : 'bg-neo-primary text-white hover:bg-neo-primary-light shadow-md shadow-neo-primary/20'
            }
          `}
        >
          {isLast ? (
            <>
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t.submit}
              </span>
            </>
          ) : (
            <>
              {t.next} <span aria-hidden="true" className="ml-1">→</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes question-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-question-in {
          animation: question-in 0.28s ease-out both;
        }
      `}</style>
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
  userName,
  cooldownLeft,
  onClose,
  onRetry,
  router,
}: {
  t: QuizStrings;
  result: QuizResult;
  questions: StartResponse['questions'];
  answers: number[];
  docTitle: string;
  language: 'es' | 'ru' | 'en';
  userName?: string;
  cooldownLeft: number | null;
  onClose: () => void;
  onRetry: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  const passed = result.passed;

  const wrongPerQ: QuizResultQuestion[] = useMemo(
    () => result.perQuestion.filter((p) => !p.correct),
    [result.perQuestion]
  );

  // Auto-redirect countdown for passed result (3 -> 2 -> 1 -> navigate).
  const [redirectIn, setRedirectIn] = useState<number>(passed ? 3 : 0);
  const certHref = result.certificateId
    ? `/certificates/${encodeURIComponent(result.certificateId)}`
    : null;

  useEffect(() => {
    if (!passed || !certHref) return;
    if (redirectIn <= 0) {
      router.push(certHref);
      return;
    }
    const id = setTimeout(() => setRedirectIn((n) => n - 1), 1000);
    return () => clearTimeout(id);
  }, [passed, redirectIn, certHref, router]);

  // Format cooldownLeft as MM:SS (for failed result).
  const cooldownFmt = useMemo(() => {
    const s = Math.max(0, cooldownLeft ?? 0);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return { mm, ss, total: s };
  }, [cooldownLeft]);

  const displayName = (userName || '').trim();

  if (passed) {
    return (
      <div className="p-8 sm:p-10 relative overflow-hidden">
        {/* Confetti — subtle CSS-only */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${(i / 14) * 100}%`,
                animationDelay: `${(i % 5) * 0.12}s`,
                background:
                  ['#98283A', '#C94A5C', '#7A2030', '#F5B041', '#10B981'][i % 5],
              }}
            />
          ))}
        </div>

        {/* Big check icon */}
        <div className="relative flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-neo-success/15 flex items-center justify-center mb-5 animate-quiz-check ring-4 ring-neo-success/10">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {/* Big APPROVED badge */}
          <div className="mb-3 px-5 py-1.5 rounded-full bg-neo-success text-white text-xs font-black uppercase tracking-[0.2em]">
            {t.approved}
          </div>
          <h2
            id="quiz-modal-title"
            className="text-3xl sm:text-[34px] font-extrabold text-neo-text leading-tight tracking-tight"
          >
            {displayName ? t.congrats(displayName) : t.congratsNoName}
          </h2>
          {/* Display score — huge */}
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-7xl sm:text-8xl font-black text-neo-success tabular-nums leading-none">
              {result.score}
            </span>
            <span className="text-3xl font-bold text-neo-text-muted">
              /{result.totalQuestions}
            </span>
          </div>
          <p className="mt-3 text-sm text-neo-text-muted uppercase tracking-[0.14em] font-semibold">
            {t.scoreLabel}
          </p>
        </div>

        {/* Certificate preview */}
        <div className="relative mt-8">
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

        {/* Redirect countdown + actions */}
        {certHref && (
          <div className="relative mt-4 text-center text-[12px] text-neo-text-muted">
            {t.redirectingIn(Math.max(0, redirectIn))}
          </div>
        )}

        <div className="relative mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-muted hover:text-neo-text bg-transparent hover:bg-neo-dark-3/40 transition-colors"
          >
            {t.close}
          </button>
          {certHref && (
            <Link
              href={certHref}
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-neo-primary hover:bg-neo-primary-light transition-colors shadow-lg shadow-neo-primary/20 text-center"
            >
              {t.viewCertificateNow}
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          )}
        </div>

        <style jsx>{`
          @keyframes quiz-check-pop {
            0% { transform: scale(0.4); opacity: 0; }
            60% { transform: scale(1.12); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-quiz-check {
            animation: quiz-check-pop 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(420px) rotate(540deg); opacity: 0; }
          }
          .confetti-piece {
            position: absolute;
            top: -10px;
            width: 8px;
            height: 14px;
            border-radius: 2px;
            animation: confetti-fall 2.2s ease-in forwards;
          }
        `}</style>
      </div>
    );
  }

  // -------- FAILED branch --------
  const canRetry = cooldownFmt.total <= 0;

  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-neo-danger/15 flex items-center justify-center mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        {/* Big NOT APPROVED badge */}
        <div className="mb-3 px-5 py-1.5 rounded-full bg-neo-danger text-white text-xs font-black uppercase tracking-[0.2em]">
          {t.notApproved}
        </div>
        <h2
          id="quiz-modal-title"
          className="text-3xl sm:text-[34px] font-extrabold text-neo-warning leading-tight tracking-tight"
        >
          {t.almost}
        </h2>
        <p className="mt-3 text-sm text-neo-text-body leading-relaxed max-w-md">
          {t.almostBody(result.score, result.passThreshold)}
        </p>

        {/* Big score */}
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-6xl font-black text-neo-text tabular-nums leading-none">
            {result.score}
          </span>
          <span className="text-2xl font-bold text-neo-text-muted">
            /{result.totalQuestions}
          </span>
        </div>

        {/* Live cooldown countdown */}
        {cooldownLeft !== null && cooldownFmt.total > 0 && (
          <div className="mt-5 px-4 py-2.5 rounded-lg bg-neo-dark-3/60 border border-neo-dark-4/60 inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-warning">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-semibold text-neo-text tabular-nums">
              {t.retryIn(cooldownFmt.mm, cooldownFmt.ss)}
            </span>
          </div>
        )}
      </div>

      {/*
        Wrong-questions review is shown ONLY when the user has passed —
        revealing correct answers after a failed attempt would let the user
        simply retry and submit the memorized answers. On failure the API
        omits correctAnswer/explanation entirely and we show only the score.
      */}
      {passed && wrongPerQ.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-neo-text-muted mb-3">
            {t.reviewErrors}
          </p>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {wrongPerQ.map((pq, i) => {
              const qIdx = questions.findIndex(
                (q) => q.id === pq.questionId
              );
              const q = qIdx >= 0 ? questions[qIdx] : null;
              const userLabel =
                pq.userAnswer >= 0
                  ? OPTION_LETTERS[pq.userAnswer]
                  : t.noAnswer;
              const hasCorrect = typeof pq.correctAnswer === 'number';
              const correctLabel = hasCorrect
                ? OPTION_LETTERS[pq.correctAnswer]
                : '';
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
                          ? `. ${q.options[pq.userAnswer]}`
                          : ''}
                      </span>
                    </div>
                    {hasCorrect && (
                      <div>
                        <span className="text-neo-success">●</span>{' '}
                        <span className="text-neo-text-secondary">
                          {t.correctAnswer}:
                        </span>{' '}
                        <span className="text-neo-text-body">
                          {correctLabel}
                          {q ? `. ${q.options[pq.correctAnswer]}` : ''}
                        </span>
                      </div>
                    )}
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

      {/* Actions — failed branch */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-3 rounded-lg text-sm font-medium text-neo-text-secondary hover:text-neo-text border border-neo-dark-3 hover:border-neo-dark-4 transition-colors"
        >
          {t.study}
        </button>
        <button
          onClick={onRetry}
          disabled={!canRetry}
          className={`
            px-6 py-3 rounded-lg text-sm font-bold transition-all
            ${canRetry
              ? 'bg-neo-primary text-white hover:bg-neo-primary-light shadow-lg shadow-neo-primary/20'
              : 'bg-neo-dark-3 text-neo-text-muted/60 cursor-not-allowed'
            }
          `}
          title={canRetry ? undefined : t.retryIn(cooldownFmt.mm, cooldownFmt.ss)}
        >
          {canRetry ? t.retry : `${t.retry} · ${cooldownFmt.mm}:${cooldownFmt.ss}`}
        </button>
      </div>
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
