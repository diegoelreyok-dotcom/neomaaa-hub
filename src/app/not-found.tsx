import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neo-dark flex items-center justify-center px-4 relative">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neo-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[480px] text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-0 mb-8">
          <span className="text-2xl font-extrabold tracking-tight text-neo-text">NEO</span>
          <span className="text-2xl font-extrabold tracking-tight text-neo-primary">MAAA</span>
          <span className="text-2xl font-extrabold tracking-tight text-neo-text-muted ml-1.5">HUB</span>
        </div>

        {/* 404 big */}
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none tracking-tight bg-gradient-to-br from-neo-primary via-neo-primary-light to-neo-primary-dark bg-clip-text text-transparent select-none">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-neo-text mb-2">
          Pagina no encontrada
        </h2>
        <p className="text-sm text-neo-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          La pagina que buscas no existe o fue movida. Vuelve al inicio para seguir navegando.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neo-primary hover:bg-neo-primary-dark text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-neo-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Ir al inicio
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neo-dark-3 text-neo-text-secondary hover:text-neo-text hover:border-neo-dark-4 hover:bg-neo-dark-2 font-medium text-sm transition-all duration-200"
          >
            Iniciar sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
