'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lang, setLang] = useState<'es' | 'ru' | 'en'>('es');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const T = {
    es: {
      subtitle: 'Solicitar acceso al portal',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email (opcional)',
      langLabel: 'Idioma preferido',
      langEs: 'Español',
      langRu: 'Русский',
      langEn: 'English',
      msgLabel: 'Mensaje para el administrador (opcional)',
      msgPlaceholder: 'Tu rol en el equipo, area, etc.',
      submitting: 'Enviando...',
      submit: 'Solicitar acceso',
      backLogin: 'Ya tengo acceso — Iniciar sesion',
      requestSentTitle: 'Solicitud enviada',
      requestSentBody:
        'Tu solicitud de acceso ha sido enviada. Un administrador la revisará y te asignará un rol. Recibirás tu código de acceso pronto.',
      goLogin: 'Ir al login',
      connError: 'Error de conexion. Intenta de nuevo.',
    },
    ru: {
      subtitle: 'Запросить доступ к порталу',
      nameLabel: 'Полное имя',
      namePlaceholder: 'Ваше имя',
      emailLabel: 'Email (необязательно)',
      langLabel: 'Предпочитаемый язык',
      langEs: 'Español',
      langRu: 'Русский',
      langEn: 'English',
      msgLabel: 'Сообщение администратору (необязательно)',
      msgPlaceholder: 'Ваша роль в команде, отдел и т.д.',
      submitting: 'Отправка...',
      submit: 'Запросить доступ',
      backLogin: 'У меня уже есть доступ — Войти',
      requestSentTitle: 'Заявка отправлена',
      requestSentBody:
        'Ваша заявка на доступ отправлена. Администратор рассмотрит её и назначит вам роль. Вы скоро получите код доступа.',
      goLogin: 'Перейти к входу',
      connError: 'Ошибка соединения. Попробуйте снова.',
    },
    en: {
      subtitle: 'Request portal access',
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email (optional)',
      langLabel: 'Preferred language',
      langEs: 'Español',
      langRu: 'Русский',
      langEn: 'English',
      msgLabel: 'Message for the administrator (optional)',
      msgPlaceholder: 'Your team role, area, etc.',
      submitting: 'Sending...',
      submit: 'Request access',
      backLogin: 'I already have access — Sign in',
      requestSentTitle: 'Request sent',
      requestSentBody:
        'Your access request has been sent. An administrator will review it and assign you a role. You will receive your access code soon.',
      goLogin: 'Go to login',
      connError: 'Connection error. Try again.',
    },
  } as const;
  const t = T[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), lang, message: message.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.connError);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t.connError);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neo-dark flex items-center justify-center p-4">
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-neo-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neo-text mb-2">
            {t.requestSentTitle}
          </h2>
          <p className="text-neo-text-secondary text-sm mb-6">
            {t.requestSentBody}
          </p>
          <Link
            href="/login"
            className="text-neo-primary text-sm hover:underline"
          >
            {t.goLogin}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-dark flex items-center justify-center p-4">
      <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold">
            <span className="text-neo-text">NEO</span>
            <span className="text-neo-primary">MAAA</span>
            <span className="text-neo-text-muted text-sm font-light ml-2 tracking-widest">HUB</span>
          </h1>
          <p className="text-neo-text-muted text-sm mt-1">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-neo-text-secondary text-xs font-medium mb-1.5">
              {t.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neo-dark-3 border border-neo-dark-4 rounded-lg px-3.5 py-2.5 text-neo-text text-sm focus:border-neo-primary focus:ring-1 focus:ring-neo-primary/30 outline-none transition-all"
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          {/* Email (optional) */}
          <div>
            <label className="block text-neo-text-secondary text-xs font-medium mb-1.5">
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neo-dark-3 border border-neo-dark-4 rounded-lg px-3.5 py-2.5 text-neo-text text-sm focus:border-neo-primary focus:ring-1 focus:ring-neo-primary/30 outline-none transition-all"
              placeholder="nombre@ejemplo.com"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-neo-text-secondary text-xs font-medium mb-1.5">
              {t.langLabel}
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  lang === 'es'
                    ? 'bg-neo-primary/10 border-neo-primary text-neo-primary'
                    : 'bg-neo-dark-3 border-neo-dark-4 text-neo-text-secondary hover:border-neo-dark-5'
                }`}
              >
                <img src="/flags/es.svg" alt="" width="20" height="13" loading="eager" className="rounded-sm object-cover" />
                {t.langEs}
              </button>
              <button
                type="button"
                onClick={() => setLang('ru')}
                aria-pressed={lang === 'ru'}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  lang === 'ru'
                    ? 'bg-neo-primary/10 border-neo-primary text-neo-primary'
                    : 'bg-neo-dark-3 border-neo-dark-4 text-neo-text-secondary hover:border-neo-dark-5'
                }`}
              >
                <img src="/flags/ru.svg" alt="" width="20" height="13" loading="eager" className="rounded-sm object-cover" />
                {t.langRu}
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  lang === 'en'
                    ? 'bg-neo-primary/10 border-neo-primary text-neo-primary'
                    : 'bg-neo-dark-3 border-neo-dark-4 text-neo-text-secondary hover:border-neo-dark-5'
                }`}
              >
                <img src="/flags/en.svg" alt="" width="20" height="13" loading="eager" className="rounded-sm object-cover" />
                {t.langEn}
              </button>
            </div>
          </div>

          {/* Message (optional) */}
          <div>
            <label className="block text-neo-text-secondary text-xs font-medium mb-1.5">
              {t.msgLabel}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full bg-neo-dark-3 border border-neo-dark-4 rounded-lg px-3.5 py-2.5 text-neo-text text-sm focus:border-neo-primary focus:ring-1 focus:ring-neo-primary/30 outline-none transition-all resize-none"
              placeholder={t.msgPlaceholder}
            />
          </div>

          {/* Error */}
          {error && (
            <div role="alert" aria-live="polite" className="bg-neo-danger/10 border border-neo-danger/30 rounded-lg p-3 text-neo-danger text-xs">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full bg-neo-primary text-white font-semibold py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? t.submitting : t.submit}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center mt-5">
          <Link href="/login" className="text-neo-text-muted text-xs hover:text-neo-primary transition-colors">
            {t.backLogin}
          </Link>
        </div>
      </div>
    </div>
  );
}
