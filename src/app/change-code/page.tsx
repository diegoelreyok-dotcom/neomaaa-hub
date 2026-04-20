'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MeshGradientBackground from '@/app/(portal)/dashboard/MeshGradientBackground';
import { translateApiError } from '@/lib/api-errors';

type LangCC = 'es' | 'ru' | 'en';

export default function ChangeCodePage() {
  const router = useRouter();
  const [lang, setLang] = useState<LangCC>('es');

  const [newCode, setNewCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = {
    es: {
      title: 'Cambiar código de acceso',
      subtitle: 'Por seguridad, debes cambiar tu código antes de continuar.',
      newCode: 'Nuevo código (6 dígitos)',
      confirm: 'Confirmar código',
      save: 'Guardar código',
      saving: 'Guardando...',
      signOut: 'Cerrar sesión',
      mismatch: 'Los códigos no coinciden',
      invalid: 'El código debe tener exactamente 6 dígitos numéricos',
      forbidden: 'No puedes usar 000000',
      check6: 'Exactamente 6 dígitos numéricos',
      checkMatch: 'Los códigos coinciden',
      checkNotTrivial: 'No puede ser 000000',
    },
    ru: {
      title: 'Смена кода доступа',
      subtitle: 'В целях безопасности необходимо сменить код перед продолжением.',
      newCode: 'Новый код (6 цифр)',
      confirm: 'Подтверждение',
      save: 'Сохранить код',
      saving: 'Сохранение...',
      signOut: 'Выйти',
      mismatch: 'Коды не совпадают',
      invalid: 'Код должен состоять ровно из 6 цифр',
      forbidden: 'Нельзя использовать 000000',
      check6: 'Ровно 6 цифр',
      checkMatch: 'Коды совпадают',
      checkNotTrivial: 'Не может быть 000000',
    },
    en: {
      title: 'Change access code',
      subtitle: 'For security reasons, you must change your code before continuing.',
      newCode: 'New code (6 digits)',
      confirm: 'Confirm code',
      save: 'Save code',
      saving: 'Saving...',
      signOut: 'Sign out',
      mismatch: 'Codes do not match',
      invalid: 'Code must be exactly 6 digits',
      forbidden: 'Cannot use 000000',
      check6: 'Exactly 6 digits',
      checkMatch: 'Codes match',
      checkNotTrivial: 'Cannot be 000000',
    },
  }[lang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!/^[0-9]{6}$/.test(newCode)) {
      setError(t.invalid);
      return;
    }
    if (newCode === '000000') {
      setError(t.forbidden);
      return;
    }
    if (newCode !== confirmCode) {
      setError(t.mismatch);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users/change-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newCode }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(translateApiError(data, lang, t.invalid));
        return;
      }
      await signOut({ redirect: false });
      router.push('/login');
    } catch {
      setError(t.invalid);
    } finally {
      setLoading(false);
    }
  }

  const valid6 = /^[0-9]{6}$/.test(newCode);
  const notTrivial = newCode !== '000000';
  const codesMatch = newCode.length > 0 && newCode === confirmCode;
  const canSubmit = valid6 && notTrivial && codesMatch && !loading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">
      <MeshGradientBackground />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[460px]"
      >
        <div className="relative rounded-3xl p-[1px] overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl opacity-80"
            style={{
              background:
                'conic-gradient(from 140deg at 50% 50%, rgba(152,40,58,0.6), rgba(122,32,48,0.35) 25%, rgba(201,74,92,0.55) 50%, rgba(152,40,58,0.5) 85%, rgba(152,40,58,0.6))',
              animation: 'ccBorderSpin 14s linear infinite',
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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-center mb-7"
            >
              <div className="flex items-center justify-center gap-0 mb-3">
                <span className="text-[28px] font-extrabold tracking-tight text-white">NEO</span>
                <span
                  className="text-[28px] font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 140%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MAAA
                </span>
                <span className="text-[28px] font-extrabold tracking-tight text-neo-text-muted/70 ml-1.5">
                  HUB
                </span>
              </div>
              <h1
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 140%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.title}
              </h1>
              <p className="text-xs text-neo-text-muted leading-relaxed mt-2 max-w-[320px] mx-auto">
                {t.subtitle}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              >
                <label
                  htmlFor="newCode"
                  className="block text-[10px] font-bold text-neo-text-muted mb-2 uppercase tracking-[0.16em]"
                >
                  {t.newCode}
                </label>
                <input
                  id="newCode"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={newCode}
                  onChange={(e) => {
                    setNewCode(e.target.value.replace(/[^0-9]/g, ''));
                    setError('');
                  }}
                  autoFocus
                  required
                  className="cc-input w-full px-4 py-3 rounded-xl text-neo-text text-base focus:outline-none transition-all duration-200 tracking-[0.4em] text-center"
                  placeholder="------"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              >
                <label
                  htmlFor="confirmCode"
                  className="block text-[10px] font-bold text-neo-text-muted mb-2 uppercase tracking-[0.16em]"
                >
                  {t.confirm}
                </label>
                <input
                  id="confirmCode"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={confirmCode}
                  onChange={(e) => {
                    setConfirmCode(e.target.value.replace(/[^0-9]/g, ''));
                    setError('');
                  }}
                  required
                  className="cc-input w-full px-4 py-3 rounded-xl text-neo-text text-base focus:outline-none transition-all duration-200 tracking-[0.4em] text-center"
                  placeholder="------"
                />
              </motion.div>

              {/* Live validation criteria */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-1.5 pl-0.5"
              >
                <CriterionRow ok={valid6} label={t.check6} />
                <CriterionRow ok={notTrivial && newCode.length > 0} label={t.checkNotTrivial} />
                <CriterionRow ok={codesMatch} label={t.checkMatch} />
              </motion.ul>

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

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
                whileHover={canSubmit ? { y: -1 } : undefined}
                whileTap={canSubmit ? { scale: 0.985 } : undefined}
                type="submit"
                disabled={!canSubmit}
                className="relative w-full py-3.5 px-4 rounded-xl mt-2 text-white font-semibold text-sm overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #98283A 0%, #7A2030 100%)',
                  boxShadow: canSubmit
                    ? '0 10px 30px rgba(152, 40, 58, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : 'none',
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
                      {t.saving}
                    </>
                  ) : (
                    t.save
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-1.5 mt-6"
        >
          {(['es', 'ru', 'en'] as LangCC[]).map((l) => {
            const active = lang === l;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={l}
                aria-pressed={active}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active ? 'text-white' : 'text-neo-text-muted hover:text-neo-text-secondary'
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
                    layoutId="ccLangUnderline"
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

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center mt-4"
        >
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="inline-flex items-center gap-1.5 text-neo-text-muted text-xs transition-all duration-200 hover:text-[#C94A5C]"
          >
            {t.signOut}
          </button>
        </motion.div>

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
        .cc-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .cc-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .cc-input:focus {
          background: rgba(152, 40, 58, 0.06);
          border-color: rgba(152, 40, 58, 0.55);
          box-shadow: 0 0 0 4px rgba(152, 40, 58, 0.15),
            0 0 25px rgba(152, 40, 58, 0.2);
        }
        @keyframes ccBorderSpin {
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

function CriterionRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-[11.5px]">
      <motion.span
        animate={{ scale: ok ? 1.05 : 1, rotate: ok ? 0 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
        style={{
          background: ok ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${ok ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
          color: ok ? '#10B981' : 'rgba(255,255,255,0.35)',
        }}
      >
        {ok ? (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </motion.span>
      <span
        className="transition-colors duration-200"
        style={{ color: ok ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </span>
    </li>
  );
}
