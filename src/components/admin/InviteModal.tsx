'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';
import type { AdminUser } from './fetcher';

interface Props {
  user: AdminUser;
  onClose: () => void;
}

type InviteLabels = {
  title: string;
  subtitle: string;
  generating: string;
  errorTitle: string;
  retry: string;
  codeLabel: string;
  messageLabel: string;
  copyMessage: string;
  copyCode: string;
  copied: string;
  close: string;
  warning: string;
  template: (args: { name: string; id: string; code: string }) => string;
};

const labels: Record<Lang, InviteLabels> = {
  es: {
    title: 'Invitar al Hub',
    subtitle: 'Genera un codigo nuevo y copia el mensaje para enviarselo.',
    generating: 'Generando codigo...',
    errorTitle: 'Error al generar el codigo.',
    retry: 'Reintentar',
    codeLabel: 'Codigo de un solo uso',
    messageLabel: 'Mensaje listo para enviar',
    copyMessage: 'Copiar mensaje',
    copyCode: 'Copiar solo codigo',
    copied: 'Copiado',
    close: 'Cerrar',
    warning:
      'El codigo anterior ya no funciona. El usuario debera cambiarlo al entrar.',
    template: ({ name, id, code }) =>
      `Hola ${name}!\nTu acceso a NEOMAAA Hub:\nUsuario: ${id}\nCodigo: ${code}\nEntra en https://neomaaa-hub.vercel.app\n(te pedira cambiar el codigo al entrar)`,
  },
  ru: {
    title: 'Пригласить в Hub',
    subtitle: 'Сгенерируйте новый код и скопируйте сообщение для отправки.',
    generating: 'Генерация кода...',
    errorTitle: 'Не удалось сгенерировать код.',
    retry: 'Повторить',
    codeLabel: 'Одноразовый код',
    messageLabel: 'Готовое сообщение',
    copyMessage: 'Скопировать сообщение',
    copyCode: 'Скопировать только код',
    copied: 'Скопировано',
    close: 'Закрыть',
    warning:
      'Старый код больше не работает. Пользователь должен сменить его при входе.',
    template: ({ name, id, code }) =>
      `Привет, ${name}!\nТвой доступ к NEOMAAA Hub:\nПользователь: ${id}\nКод: ${code}\nВойди на https://neomaaa-hub.vercel.app\n(при входе потребуется сменить код)`,
  },
  en: {
    title: 'Invite to the Hub',
    subtitle: 'Generate a fresh code and copy the message to send.',
    generating: 'Generating code...',
    errorTitle: 'Could not generate the code.',
    retry: 'Retry',
    codeLabel: 'One-time code',
    messageLabel: 'Ready-to-send message',
    copyMessage: 'Copy message',
    copyCode: 'Copy code only',
    copied: 'Copied',
    close: 'Close',
    warning:
      'The previous code no longer works. The user must change it on first login.',
    template: ({ name, id, code }) =>
      `Hi ${name}!\nYour access to NEOMAAA Hub:\nUser: ${id}\nCode: ${code}\nGo to https://neomaaa-hub.vercel.app\n(you will be asked to change your code on first login)`,
  },
};

export default function InviteModal({ user, onClose }: Props) {
  // Default to 'es' when user.lang is missing/unknown.
  const modalLang: Lang =
    user.lang === 'ru' || user.lang === 'en' ? user.lang : 'es';
  const t = labels[modalLang];

  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  async function regenerate() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/users/regenerate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setCode(data.code as string);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const message = code
    ? t.template({ name: user.name, id: user.id, code })
    : '';

  function handleCopyMessage() {
    if (!message) return;
    navigator.clipboard.writeText(message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 1800);
  }

  function handleCopyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,6,14,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(201,74,92,0.45), transparent 50%, rgba(152,40,58,0.25))',
            padding: '1px',
          }}
        >
          <div
            className="w-full h-full rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(22,26,42,0.92), rgba(10,14,26,0.92))',
              backdropFilter: 'blur(14px)',
            }}
          />
        </div>

        <div className="relative p-6">
          <h2 className="text-lg font-semibold text-white">{t.title}</h2>
          <p className="text-[#94A3B8] text-sm mt-1">{t.subtitle}</p>

          <div className="mt-5">
            {loading ? (
              <div className="py-10 text-center text-[#94A3B8] text-sm">
                {t.generating}
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="text-[#C44545] text-sm mb-3">{t.errorTitle}</p>
                <button
                  onClick={regenerate}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                >
                  {t.retry}
                </button>
              </div>
            ) : (
              code && (
                <>
                  {/* Big code block */}
                  <div
                    className="rounded-xl p-5 mb-4"
                    style={{
                      background: 'rgba(201,74,92,0.08)',
                      border: '1px solid rgba(201,74,92,0.35)',
                      boxShadow: '0 0 24px rgba(201,74,92,0.18)',
                    }}
                  >
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C94A5C]/80 font-semibold mb-2">
                      {t.codeLabel}
                    </label>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="font-mono font-bold tracking-widest"
                        style={{
                          color: '#C94A5C',
                          fontSize: 32,
                          textShadow: '0 0 18px rgba(201,74,92,0.35)',
                        }}
                      >
                        {code}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                          copiedCode
                            ? 'bg-[#C94A5C]/20 text-white'
                            : 'bg-[#C94A5C]/10 text-[#C94A5C] hover:bg-[#C94A5C]/20'
                        }`}
                      >
                        {copiedCode ? t.copied : t.copyCode}
                      </button>
                    </div>
                  </div>

                  {/* Message preview */}
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] font-semibold mb-2">
                    {t.messageLabel}
                  </label>
                  <pre
                    className="text-[13px] text-white/90 whitespace-pre-wrap break-words rounded-xl p-4 font-mono leading-relaxed"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily:
                        'ui-monospace, "JetBrains Mono", "Fira Code", Menlo, monospace',
                    }}
                  >
                    {message}
                  </pre>

                  <p className="text-[11px] text-[#94A3B8] mt-3">{t.warning}</p>

                  <div className="mt-5 flex items-center justify-end gap-2">
                    <button
                      onClick={onClose}
                      className="text-sm font-medium px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#D1D5DB] transition-colors"
                    >
                      {t.close}
                    </button>
                    <button
                      onClick={handleCopyMessage}
                      className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all bg-gradient-to-br from-[#98283A] to-[#7A2030] hover:from-[#B33347] hover:to-[#98283A] shadow-[0_0_18px_rgba(152,40,58,0.3)]"
                    >
                      {copiedMessage ? t.copied : t.copyMessage}
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
