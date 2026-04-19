'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import TopBarUserMenu from './TopBarUserMenu';
import type { Lang } from '@/lib/types';

interface TopBarProps {
  userName: string;
  isAdmin: boolean;
  lang: Lang;
  allowedSections: string[];
  onToggleSidebar: () => void;
}

const CRUMB = {
  es: {
    dashboard: 'Panorama',
    learning: 'Mi Ruta',
    certificates: 'Certificados',
    search: 'Busqueda',
    admin: 'Admin',
    content: 'Contenido',
    changeCode: 'Cambiar codigo',
    home: 'Inicio',
  },
  ru: {
    dashboard: 'Панорама',
    learning: 'Мой путь',
    certificates: 'Сертификаты',
    search: 'Поиск',
    admin: 'Админ',
    content: 'Документация',
    changeCode: 'Сменить код',
    home: 'Главная',
  },
  en: {
    dashboard: 'Overview',
    learning: 'My Path',
    certificates: 'Certificates',
    search: 'Search',
    admin: 'Admin',
    content: 'Docs',
    changeCode: 'Change code',
    home: 'Home',
  },
} as const;

function buildBreadcrumb(
  pathname: string,
  lang: Lang,
): { label: string; href?: string }[] {
  const t = CRUMB[lang] || CRUMB.es;
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href?: string }[] = [
    { label: t.home, href: '/dashboard' },
  ];

  if (parts.length === 0) return crumbs;

  const head = parts[0];
  if (head === 'dashboard') {
    crumbs[0] = { label: t.home };
    crumbs.push({ label: t.dashboard });
  } else if (head === 'learning') {
    crumbs.push({ label: t.learning });
  } else if (head === 'certificates') {
    crumbs.push({ label: t.certificates });
  } else if (head === 'search') {
    crumbs.push({ label: t.search });
  } else if (head === 'admin') {
    crumbs.push({ label: t.admin });
  } else if (head === 'change-code') {
    crumbs.push({ label: t.changeCode });
  } else if (head === 'content') {
    crumbs.push({ label: t.content });
    if (parts[1]) {
      crumbs.push({ label: prettify(parts[1]) });
    }
    if (parts[2]) {
      crumbs.push({ label: prettify(parts[2]) });
    }
  }
  return crumbs;
}

function prettify(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TopBar({
  userName,
  isAdmin,
  lang,
  allowedSections,
  onToggleSidebar,
}: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const crumbs = buildBreadcrumb(pathname, lang);

  return (
    <header
      className="sticky top-0 z-30 h-14 flex items-center justify-between px-3 sm:px-4 lg:px-6 transition-all duration-300"
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(10,14,26,0.88), rgba(10,14,26,0.78))'
          : 'linear-gradient(180deg, rgba(10,14,26,0.55), rgba(10,14,26,0.35))',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'blur(8px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
        boxShadow: scrolled
          ? '0 8px 24px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(152,40,58,0.06)'
          : 'none',
      }}
    >
      {/* Subtle animated accent line at bottom when scrolled */}
      {scrolled && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(152,40,58,0.5), transparent)',
          }}
        />
      )}

      {/* Left: mobile hamburger + breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden shrink-0 p-2 rounded-lg text-neo-text-secondary hover:text-white transition-all"
          style={{
            background:
              'linear-gradient(135deg, rgba(18,22,38,0.6), rgba(8,11,22,0.6))',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
          }}
          aria-label={
            lang === 'ru' ? 'Открыть меню' : lang === 'en' ? 'Open menu' : 'Abrir menu'
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="hidden sm:flex items-center gap-1.5 min-w-0 text-[12px]"
        >
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <div key={i} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neo-text-muted/40 shrink-0"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
                {c.href && !last ? (
                  <button
                    onClick={() => c.href && router.push(c.href)}
                    className="truncate text-neo-text-muted hover:text-neo-text-secondary transition-colors font-medium uppercase tracking-[0.1em] text-[10.5px]"
                  >
                    {c.label}
                  </button>
                ) : (
                  <span
                    className={`truncate font-semibold uppercase tracking-[0.1em] text-[10.5px] ${
                      last ? 'text-white' : 'text-neo-text-muted'
                    }`}
                    style={
                      last
                        ? {
                            background:
                              'linear-gradient(135deg, #FFFFFF 0%, rgba(201,74,92,0.95) 160%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : undefined
                    }
                  >
                    {c.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <SearchBar lang={lang} allowedSections={allowedSections} />

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-white/10" />

        <TopBarUserMenu userName={userName} isAdmin={isAdmin} lang={lang} />
      </div>
    </header>
  );
}
