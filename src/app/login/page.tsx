'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
      code: 'Codigo de acceso',
      enter: 'Entrar',
      error: 'Usuario o codigo incorrecto',
    },
    ru: {
      subtitle: 'Внутренний портал команды',
      username: 'Пользователь',
      code: 'Код доступа',
      enter: 'Войти',
      error: 'Неверный пользователь или код',
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
    <div className="min-h-screen bg-neo-dark flex items-center justify-center px-4">
      {/* Background subtle grid */}
      <div className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-[380px]">
        {/* Card */}
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-0 mb-3">
              <span className="text-3xl font-extrabold tracking-tight text-neo-text">NEO</span>
              <span className="text-3xl font-extrabold tracking-tight text-neo-primary">MAAA</span>
              <span className="text-3xl font-extrabold tracking-tight text-neo-text-muted ml-1.5">HUB</span>
            </div>
            <p className="text-sm text-neo-text-muted">{t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="userId"
                className="block text-xs font-medium text-neo-text-secondary mb-1.5 uppercase tracking-wider"
              >
                {t.username}
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="username"
                autoFocus
                required
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-neo-dark-3 border border-neo-dark-4
                  text-neo-text text-sm placeholder-neo-text-muted
                  focus:outline-none focus:border-neo-primary focus:ring-1 focus:ring-neo-primary/30
                  transition-colors duration-200
                "
                placeholder={lang === 'ru' ? 'Введите имя' : 'Ingresa tu usuario'}
              />
            </div>

            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="block text-xs font-medium text-neo-text-secondary mb-1.5 uppercase tracking-wider"
              >
                {t.code}
              </label>
              <input
                id="code"
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="current-password"
                required
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-neo-dark-3 border border-neo-dark-4
                  text-neo-text text-sm placeholder-neo-text-muted tracking-[0.3em] text-center
                  focus:outline-none focus:border-neo-primary focus:ring-1 focus:ring-neo-primary/30
                  transition-colors duration-200
                "
                placeholder="------"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neo-danger/10 border border-neo-danger/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-xs text-neo-danger">{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !userId || !code}
              className="
                w-full py-3 px-4 rounded-lg
                bg-neo-primary text-neo-dark
                font-semibold text-sm
                hover:bg-neo-primary-dark
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200
                mt-2
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {lang === 'ru' ? 'Вход...' : 'Entrando...'}
                </span>
              ) : (
                t.enter
              )}
            </button>
          </form>
        </div>

        {/* Language switcher below card */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setLang('es')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'es'
                ? 'bg-neo-dark-3 text-neo-text border border-neo-dark-4'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
          >
            <img
              src="https://flagcdn.com/w20/es.png"
              srcSet="https://flagcdn.com/w40/es.png 2x"
              width="16"
              height="12"
              alt="ES"
              className="rounded-sm"
            />
            ES
          </button>
          <button
            onClick={() => setLang('ru')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'ru'
                ? 'bg-neo-dark-3 text-neo-text border border-neo-dark-4'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
          >
            <img
              src="https://flagcdn.com/w20/ru.png"
              srcSet="https://flagcdn.com/w40/ru.png 2x"
              width="16"
              height="12"
              alt="RU"
              className="rounded-sm"
            />
            RU
          </button>
        </div>

        {/* Register link */}
        <div className="text-center mt-4">
          <a href="/register" className="text-neo-text-muted text-xs hover:text-neo-primary transition-colors">
            {lang === 'es' ? 'No tengo acceso — Solicitar registro' : 'У меня нет доступа — Запросить регистрацию'}
          </a>
        </div>
      </div>
    </div>
  );
}
