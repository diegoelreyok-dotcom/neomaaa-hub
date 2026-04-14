'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ChangeCodePage() {
  const router = useRouter();
  // Bilingual toggle (no SessionProvider in the app — we'd need one for
  // useSession). ES is the default; user can flip to RU if needed.
  const [lang, setLang] = useState<'es' | 'ru'>('es');

  const [newCode, setNewCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const t = {
    es: {
      title: 'Cambiar codigo de acceso',
      subtitle: 'Por seguridad, debes cambiar tu codigo antes de continuar.',
      newCode: 'Nuevo codigo (6 digitos)',
      confirm: 'Confirmar codigo',
      save: 'Guardar codigo',
      saving: 'Guardando...',
      signOut: 'Cerrar sesion',
      mismatch: 'Los codigos no coinciden',
      invalid: 'El codigo debe tener exactamente 6 digitos numericos',
      forbidden: 'No puedes usar 000000',
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
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || t.invalid);
        return;
      }
      // Force re-auth so the JWT loses mustChangeCode — cleanest way with JWT
      // sessions (no per-request DB hit needed). User logs back in with the
      // new code and gets a fresh token.
      await signOut({ redirect: false });
      router.push('/login');
    } catch {
      setError(t.invalid);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neo-dark flex items-center justify-center px-4">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neo-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[400px] animate-[fadeInContent_0.4s_ease-out]">
        <div className="bg-neo-dark-2 border border-neo-dark-3/80 rounded-2xl p-8 sm:p-9 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-0 mb-3">
              <span className="text-3xl font-extrabold tracking-tight text-neo-text">NEO</span>
              <span className="text-3xl font-extrabold tracking-tight text-neo-primary">MAAA</span>
              <span className="text-3xl font-extrabold tracking-tight text-neo-text-muted ml-1.5">HUB</span>
            </div>
            <h1 className="text-base font-semibold text-neo-text mb-1">{t.title}</h1>
            <p className="text-xs text-neo-text-muted leading-relaxed">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newCode" className="block text-[11px] font-semibold text-neo-text-secondary mb-1.5 uppercase tracking-wider">
                {t.newCode}
              </label>
              <input
                id="newCode"
                type="password"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                value={newCode}
                onChange={(e) => { setNewCode(e.target.value.replace(/[^0-9]/g, '')); setError(''); }}
                autoFocus
                required
                className="w-full px-4 py-3 rounded-lg bg-neo-dark-3/70 border border-neo-dark-4/60 text-neo-text text-sm placeholder-neo-text-muted/50 tracking-[0.3em] text-center focus:outline-none focus:border-neo-primary/60 focus:ring-1 focus:ring-neo-primary/20 focus:bg-neo-dark-3 transition-all duration-200"
                placeholder="------"
              />
            </div>

            <div>
              <label htmlFor="confirmCode" className="block text-[11px] font-semibold text-neo-text-secondary mb-1.5 uppercase tracking-wider">
                {t.confirm}
              </label>
              <input
                id="confirmCode"
                type="password"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                value={confirmCode}
                onChange={(e) => { setConfirmCode(e.target.value.replace(/[^0-9]/g, '')); setError(''); }}
                required
                className="w-full px-4 py-3 rounded-lg bg-neo-dark-3/70 border border-neo-dark-4/60 text-neo-text text-sm placeholder-neo-text-muted/50 tracking-[0.3em] text-center focus:outline-none focus:border-neo-primary/60 focus:ring-1 focus:ring-neo-primary/20 focus:bg-neo-dark-3 transition-all duration-200"
                placeholder="------"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-neo-danger/8 border border-neo-danger/15 animate-[fadeInContent_0.2s_ease-out]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-[13px] text-neo-danger font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || newCode.length !== 6 || confirmCode.length !== 6}
              className="w-full py-3 px-4 rounded-lg mt-2 bg-neo-primary text-white font-semibold text-sm hover:bg-neo-primary-dark hover:shadow-lg hover:shadow-neo-primary/20 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 transition-all duration-200"
            >
              {loading ? t.saving : t.save}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setLang('es')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${lang === 'es' ? 'bg-neo-dark-2 text-neo-text border border-neo-dark-3' : 'text-neo-text-muted hover:text-neo-text-secondary border border-transparent'}`}
          >
            ES
          </button>
          <button
            onClick={() => setLang('ru')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${lang === 'ru' ? 'bg-neo-dark-2 text-neo-text border border-neo-dark-3' : 'text-neo-text-muted hover:text-neo-text-secondary border border-transparent'}`}
          >
            RU
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="inline-flex items-center gap-1.5 text-neo-text-muted text-xs hover:text-neo-primary transition-colors duration-200 border-b border-transparent hover:border-neo-primary/30 pb-0.5"
          >
            {t.signOut}
          </button>
        </div>
      </div>
    </div>
  );
}
