'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/types';
import QuizModal from '@/components/QuizModal';

interface CompletionButtonProps {
  documentPath: string; // doc.filePath, e.g. "sales/training.md"
  quizDocPath: string; // "{section}/{slug}", e.g. "sales/training"
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
    markCompleteQuiz:
      '\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u043E\u0435 (\u043F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442)',
    completed: '\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E',
    completing: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F...',
    takeQuizForCert:
      '\u041F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430',
    docCompleted: '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D',
    keepStudying:
      '\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044E \u044D\u0442\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.',
    error:
      '\u041E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.',
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

// Deterministic pseudo-random so SSR matches CSR
function rand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const CONFETTI_COLORS = ['#98283A', '#C94A5C', '#FBBF24', '#7A2030', '#FFFFFF', '#10B981'];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => {
        const angle = rand(i * 3.3) * Math.PI * 2;
        const distance = 80 + rand(i * 5.1) * 140;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.7 - 20,
          rot: rand(i * 7.7) * 540 - 270,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          delay: rand(i * 2.1) * 0.15,
          size: 5 + rand(i * 11) * 4,
        };
      }),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.6 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [0, 1, 1, 0],
            rotate: p.rot,
            scale: [0.6, 1, 1, 0.5],
          }}
          transition={{
            duration: 1.4,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.15, 0.7, 1],
          }}
          style={{
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 1,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

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

  // Quiz question banks exist only in es/ru; EN users get ES questions.
  // The Modal UI chrome still switches to EN via the `language` prop.
  const quizLang: 'es' | 'ru' = lang === 'ru' ? 'ru' : 'es';
  const modalLang: 'es' | 'ru' | 'en' = lang;
  useEffect(() => {
    let cancelled = false;
    fetch(
      `/api/quiz/available?docPath=${encodeURIComponent(quizDocPath)}&language=${quizLang}`
    )
      .then(async (r) => {
        if (!r.ok) return { exists: false };
        return r.json().catch(() => ({ exists: false }));
      })
      .then((data) => {
        if (cancelled) return;
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

  const handleQuizSuccess = useCallback(() => {
    setCompleted(true);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 4000);
    fetch('/api/progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentPath, completed: true }),
    }).catch(() => {
      /* non-critical */
    });
  }, [documentPath]);

  // --------- SUCCESS (just completed, with confetti) ---------
  if (justCompleted) {
    return (
      <div className="mb-4 mt-10">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.08) 40%, rgba(8,11,22,0.6) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            boxShadow:
              '0 0 32px rgba(16, 185, 129, 0.25), inset 0 0 40px rgba(16, 185, 129, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Mesh accent */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, #10B981 30%, #34D399 50%, #10B981 70%, transparent)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-3 py-8 px-6">
            {/* Expanding ring */}
            <motion.div
              aria-hidden
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute left-1/2 top-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 72,
                height: 72,
                border: '2px solid rgba(16, 185, 129, 0.7)',
              }}
            />

            <Confetti />

            {/* Check icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 16,
                delay: 0.15,
              }}
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                boxShadow:
                  '0 0 28px rgba(16, 185, 129, 0.6), 0 0 8px rgba(255,255,255,0.4) inset',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A0E1A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="text-center"
            >
              <p
                className="text-base font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #34D399 120%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.docCompleted}
              </p>
              <p className="mt-1 text-xs" style={{ color: '#94A3B8' }}>
                {t.keepStudying}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // --------- ALREADY COMPLETED (persistent success) ---------
  if (completed) {
    return (
      <>
        <div className="mb-4 mt-10 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(8,11,22,0.6) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #10B981, transparent)',
              }}
            />
            <div className="flex items-center justify-center gap-3 px-6 py-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  boxShadow: '0 0 18px rgba(16, 185, 129, 0.5)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0A0E1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: '#34D399', letterSpacing: '0.02em' }}
              >
                {t.completed}
              </span>
            </div>
          </motion.div>

          {quizAvailable && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setModalOpen(true)}
              className="relative w-full overflow-hidden rounded-2xl px-6 py-3.5"
              style={{
                background:
                  'linear-gradient(135deg, rgba(122,32,48,0.2), rgba(8,11,22,0.6))',
                border: '1px solid rgba(122, 32, 48, 0.45)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <span className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: '#E8A4B0' }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                {t.takeQuizForCert}
              </span>
            </motion.button>
          )}
        </div>

        <QuizModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleQuizSuccess}
          docPath={quizDocPath}
          docTitle={docTitle}
          language={modalLang}
          userName={userName}
        />
      </>
    );
  }

  // --------- PRIMARY CTA (not yet completed) ---------
  const buttonLabel = quizAvailable ? t.markCompleteQuiz : t.markComplete;
  const disabled = loading || quizAvailable === null;

  return (
    <>
      <div className="mb-4 mt-10">
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 text-center text-xs"
              style={{ color: '#F87171' }}
            >
              {t.error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={disabled ? {} : { y: -2 }}
          whileTap={disabled ? {} : { scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={handleClick}
          disabled={disabled}
          className="group relative w-full overflow-hidden rounded-2xl"
          style={{ cursor: disabled ? 'wait' : 'pointer' }}
        >
          {/* Glow pulse (behind) */}
          {!disabled && (
            <span
              aria-hidden
              className="absolute -inset-1 rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, #C94A5C 0%, #98283A 50%, #7A2030 100%)',
                filter: 'blur(18px)',
                opacity: 0.55,
                animation: 'neo-cta-glow 2.6s ease-in-out infinite',
              }}
            />
          )}

          {/* Gradient border */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              padding: '1px',
              background: disabled
                ? 'linear-gradient(135deg, rgba(152,40,58,0.3), rgba(122,32,48,0.3))'
                : 'linear-gradient(135deg, #C94A5C 0%, #98283A 50%, #7A2030 100%)',
            }}
          >
            <span
              className="block h-full w-full rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(18,22,38,0.85) 0%, rgba(8,11,22,0.85) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />
          </span>

          {/* Sheen sweep */}
          {!disabled && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
                backgroundSize: '250% 100%',
                animation: 'neo-cta-sheen 1.8s linear infinite',
              }}
            />
          )}

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2.5 px-6 py-4">
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-base font-bold text-white/80">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
                {t.completing}
              </span>
            ) : (
              <>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(152,40,58,0.3), rgba(152,40,58,0.1))',
                    border: '1px solid rgba(152,40,58,0.45)',
                    color: '#FFD4DB',
                    boxShadow: '0 0 12px rgba(152, 40, 58, 0.45)',
                  }}
                >
                  {quizAvailable ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span
                  className="text-base font-bold tracking-tight"
                  style={{
                    background:
                      'linear-gradient(135deg, #FFFFFF 0%, #E0FFF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {buttonLabel}
                </span>
              </>
            )}
          </span>
        </motion.button>

        <style jsx>{`
          @keyframes neo-cta-glow {
            0%, 100% {
              opacity: 0.35;
              transform: scale(0.99);
            }
            50% {
              opacity: 0.65;
              transform: scale(1.01);
            }
          }
          @keyframes neo-cta-sheen {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </div>

      <QuizModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleQuizSuccess}
        docPath={quizDocPath}
        docTitle={docTitle}
        language={modalLang}
      />
    </>
  );
}
