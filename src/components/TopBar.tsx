'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';
import type { Lang } from '@/lib/types';

interface TopBarProps {
  userName: string;
  isAdmin: boolean;
  lang: Lang;
  allowedSections: string[];
  onToggleSidebar: () => void;
  onSwitchLang: (lang: Lang) => void;
}

export default function TopBar({ userName, isAdmin, lang, allowedSections, onToggleSidebar, onSwitchLang }: TopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    const { signOut } = await import('next-auth/react');
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <header className="sticky top-0 z-30 h-14 bg-neo-dark/90 backdrop-blur-md border-b border-neo-dark-3/60 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Hamburger (mobile) */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-neo-text-secondary hover:text-neo-text hover:bg-neo-dark-3/50 p-2.5 -ml-1 rounded-lg transition-all duration-200"
        aria-label={lang === 'ru' ? 'Открыть меню' : 'Abrir menu'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Spacer for desktop (no hamburger) */}
      <div className="hidden lg:block" />

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global search (Cmd+K) */}
        <SearchBar lang={lang} allowedSections={allowedSections} />

        {/* Language switcher */}
        <div className="flex items-center bg-neo-dark-3/60 rounded-lg p-0.5 border border-neo-dark-3/40" role="group" aria-label={lang === 'ru' ? 'Язык' : 'Idioma'}>
          <button
            onClick={() => onSwitchLang('es')}
            aria-label="Español"
            aria-pressed={lang === 'es'}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'es'
                ? 'bg-neo-dark-4/80 text-neo-text shadow-sm'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
          >
            <img
              src="/flags/es.svg"
              width="16"
              height="12"
              alt=""
              loading="eager"
              className="rounded-sm object-cover"
            />
            <span className="hidden sm:inline">ES</span>
          </button>
          <button
            onClick={() => onSwitchLang('ru')}
            aria-label="Русский"
            aria-pressed={lang === 'ru'}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
              transition-all duration-200
              ${lang === 'ru'
                ? 'bg-neo-dark-4/80 text-neo-text shadow-sm'
                : 'text-neo-text-muted hover:text-neo-text-secondary'
              }
            `}
          >
            <img
              src="/flags/ru.svg"
              width="16"
              height="12"
              alt=""
              loading="eager"
              className="rounded-sm object-cover"
            />
            <span className="hidden sm:inline">RU</span>
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
              border border-neo-accent/20 hover:border-neo-accent/30
              rounded-lg transition-all duration-200
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Admin
          </Link>
        )}

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-neo-dark-3/50" />

        {/* User info */}
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-neo-dark-3/30 transition-colors duration-200">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neo-primary/30 to-neo-primary/10 border border-neo-primary/20 flex items-center justify-center text-neo-primary text-[11px] font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:inline text-[13px] font-medium text-neo-text-secondary truncate max-w-[120px]">
            {userName}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5
            text-xs font-medium text-neo-text-muted
            hover:text-neo-danger hover:bg-neo-danger/5
            rounded-lg transition-all duration-200
            border border-transparent hover:border-neo-danger/10
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
