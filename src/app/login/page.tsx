'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MeshGradientBackground from '@/app/(portal)/dashboard/MeshGradientBackground';
import type { Lang } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Lang>('es');

  const labels = {
    es: {
      subtitle: 'Portal interno del equipo',
      username: 'Usuario',
      code: 'Código de acceso',
      enter: 'Entrar',
      entering: 'Entrando...',
      error: 'Usuario o código incorrecto',
      placeholder: 'Ingresa tu usuario',
      registerCta: 'No tengo acceso — Solicitar registro',
    },
    ru: {
      subtitle: 'Внутренний портал команды',
      username: 'Пользователь',
      code: 'Код доступа',
      enter: 'Войти',
      entering: 'Вход...',
      error: 'Неверный пользователь или код',
      placeholder: 'Введите имя',
      registerCta: 'У меня нет доступа — Запросить регистрацию',
    },
    en: {
      subtitle: 'Internal team portal',
      username: 'Username',
      code: 'Access code',
      enter: 'Sign in',
      entering: 'Signing in...',
      error: 'Invalid username or code',
      placeholder: 'Enter your username',
      registerCta: "I don't have access — Request registration",
    },
  };

  const t = labels[lang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        userId: userId.trim().toLowerCase(),
        code: code.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError(t.error);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">
      <MeshGradientBackground />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px]"
      >
        {/* Pulsing gradient border wrapper */}
        <div className="relative rounded-3xl p-[1px] overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl opacity-80"
            style={{
              background:
                'conic-gradient(from 140deg at 50% 50%, rgba(152,40,58,0.6), rgba(122,32,48,0.35) 25%, rgba(201,74,92,0.55) 50%, rgba(152,40,58,0.5) 85%, rgba(152,40,58,0.6))',
              animation: 'loginBorderSpin 12s linear infinite',
            }}
          />

          <div
            className="relative rounded-3xl p-8 sm:p-10"
            style={{
              background:
                'linear-gradient(135deg, rgba(18,22,38,0.85) 0%, rgba(8,11,22,0.85) 100%)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(152, 40, 58, 0.12)',
            }}
          >
            {/* Logo + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-0 mb-2">
                <span className="text-[32px] font-extrabold tracking-tight text-white">NEO</span>
                <span
                  className="text-[32px] font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 140%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MAAA
                </span>
                <span className="text-[32px] font-extrabold tracking-tight text-neo-text-muted/70 ml-1.5">
                  HUB
                </span>
              </div>
              <p className="text-xs text-neo-text-muted tracking-wide">{t.subtitle}</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              >
                <label
                  htmlFor="userId"
                  className="block text-[10px] font-bold text-neo-text-muted mb-2 uppercase tracking-[0.16em]"
                >
                  {t.username}
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setError('');
                  }}
                  autoComplete="username"
                  autoFocus
                  required
                  className="login-input w-full px-4 py-3 rounded-xl text-neo-text text-sm focus:outline-none transition-all duration-200"
                  placeholder={t.placeholder}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              >
                <label
                  htmlFor="code"
                  className="block text-[10px] font-bold text-neo-text-muted mb-2 uppercase tracking-[0.16em]"
                >
                  {t.code}
                </label>
                <input
                  id="code"
                  type="password"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  autoComplete="current-password"
                  required
                  className="login-input w-full px-4 py-3 rounded-xl text-neo-text text-base focus:outline-none transition-all duration-200 tracking-[0.4em] text-center"
                  placeholder="------"
                />
              </motion.div>

              {/* Error pill */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    role="alert"
                    aria-live="polite"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                    style={{
                      background: 'rgba(152, 40, 58, 0.14)',
                      border: '1px solid rgba(152, 40, 58, 0.35)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0"
                      style={{ color: '#FF7A8A' }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-[12.5px] font-medium" style={{ color: '#FFB0BB' }}>
                      {error}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                disabled={
                  loading ||
                  !userId.trim() ||
                  code.length !== 6 ||
                  !/^\d{6}$/.test(code)
                }
                className="relative w-full py-3.5 px-4 rounded-xl mt-2 text-white font-semibold text-sm overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #98283A 0%, #7A2030 100%)',
                  boxShadow:
                    '0 10px 30px rgba(152, 40, 58, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t.entering}
                    </>
                  ) : (
                    t.enter
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </div>

        {/* Language toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex items-center justify-center gap-1.5 mt-6"
        >
          {(['es', 'ru', 'en'] as Lang[]).map((l) => {
            const active = lang === l;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={l}
                aria-pressed={active}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'text-white'
                    : 'text-neo-text-muted hover:text-neo-text-secondary'
                }`}
                style={{
                  background: active ? 'rgba(152, 40, 58, 0.15)' : 'transparent',
                  border: active
                    ? '1px solid rgba(152, 40, 58, 0.4)'
                    : '1px solid transparent',
                }}
              >
                <img
                  src={`/flags/${l}.svg`}
                  width="16"
                  height="12"
                  alt=""
                  loading="eager"
                  className="rounded-sm object-cover"
                />
                <span className="uppercase">{l}</span>
                {active && (
                  <motion.span
                    layoutId="langUnderline"
                    className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #C94A5C, transparent)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Register link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="text-center mt-4"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-neo-text-muted text-xs transition-all duration-200 hover:text-[#C94A5C]"
            style={{ textShadow: 'none' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            {t.registerCta}
          </Link>
        </motion.div>

        {/* Compliance footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-5 text-[10px] text-neo-text-muted/50 tracking-wide"
        >
          NEOMAAA Ltd &middot; Anjouan L15968/N
        </motion.p>
      </motion.div>

      <style jsx global>{`
        .login-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .login-input:focus {
          background: rgba(152, 40, 58, 0.06);
          border-color: rgba(152, 40, 58, 0.55);
          box-shadow: 0 0 0 4px rgba(152, 40, 58, 0.15),
            0 0 25px rgba(152, 40, 58, 0.2);
        }
        @keyframes loginBorderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
