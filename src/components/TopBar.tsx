'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Lang } from '@/lib/types';

interface TopBarProps {
  userName: string;
  isAdmin: boolean;
  lang: Lang;
  onToggleSidebar: () => void;
  onSwitchLang: (lang: Lang) => void;
}

export default function TopBar({ userName, isAdmin, lang, onToggleSidebar, onSwitchLang }: TopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    const { signOut } = await import('next-auth/react');
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <header className="sticky top-0 z-30 h-14 bg-neo-dark-2/95 backdrop-blur-sm border-b border-neo-dark-3 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Hamburger (mobile) */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-neo-text-secondary hover:text-neo-text transition-colors p-1"
        aria-label="Abrir menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Spacer for desktop (no hamburger) */}
      <div className="hidden lg:block" />

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-neo-dark-3 rounded-lg p-0.5">
          <button
            onClick={() => onSwitchLang('es')}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'es'
                ? 'bg-neo-dark-4 text-neo-text shadow-sm'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
            aria-label="Espanol"
          >
            <img
              src="https://flagcdn.com/w20/es.png"
              srcSet="https://flagcdn.com/w40/es.png 2x"
              width="16"
              height="12"
              alt="ES"
              className="rounded-sm"
            />
            <span>ES</span>
          </button>
          <button
            onClick={() => onSwitchLang('ru')}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'ru'
                ? 'bg-neo-dark-4 text-neo-text shadow-sm'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
            aria-label="Ruso"
          >
            <img
              src="https://flagcdn.com/w20/ru.png"
              srcSet="https://flagcdn.com/w40/ru.png 2x"
              width="16"
              height="12"
              alt="RU"
              className="rounded-sm"
            />
            <span>RU</span>
          </button>
        </div>

        {/* Admin link */}
        {isAdmin && (
          <Link
            href="/admin"
            className="
              hidden sm:flex items-center gap-1.5 px-3 py-1.5
              text-xs font-medium text-neo-accent
              bg-neo-accent/10 hover:bg-neo-accent/20
              rounded-lg transition-colors duration-200
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Admin
          </Link>
        )}

        {/* User info */}
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-neo-dark-3/50 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-neo-primary/20 flex items-center justify-center text-neo-primary text-[10px] font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:inline text-xs font-medium text-neo-text-secondary truncate max-w-[120px]">{userName}</span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-1.5 px-3 py-1.5
            text-xs font-medium text-neo-text-muted
            hover:text-neo-danger hover:bg-neo-danger/10
            rounded-lg transition-colors duration-200
          "
          aria-label={lang === 'ru' ? 'Выйти' : 'Cerrar sesion'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="hidden sm:inline">{lang === 'ru' ? 'Выйти' : 'Salir'}</span>
        </button>
      </div>
    </header>
  );
}
