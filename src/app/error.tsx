'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console; in prod this is where you'd hook Sentry/logger.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neo-dark flex items-center justify-center px-4 relative">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neo-danger/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[480px] text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-neo-danger/10 border border-neo-danger/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neo-text mb-2">
          Algo salio mal
        </h2>
        <p className="text-sm text-neo-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          Ocurrio un error inesperado. Intenta de nuevo o vuelve al inicio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neo-primary hover:bg-neo-primary-dark text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-neo-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Reintentar
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neo-dark-3 text-neo-text-secondary hover:text-neo-text hover:border-neo-dark-4 hover:bg-neo-dark-2 font-medium text-sm transition-all duration-200"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
