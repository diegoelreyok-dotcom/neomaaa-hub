'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/types';

interface TopBarUserMenuProps {
  userName: string;
  isAdmin: boolean;
  lang: Lang;
}

const T = {
  es: {
    admin: 'ADMIN',
    changeCode: 'Cambiar codigo',
    signOut: 'Cerrar sesion',
    role: 'Equipo NEOMAAA',
  },
  ru: {
    admin: 'АДМИН',
    changeCode: 'Сменить код',
    signOut: 'Выйти',
    role: 'Команда NEOMAAA',
  },
  en: {
    admin: 'ADMIN',
    changeCode: 'Change code',
    signOut: 'Sign out',
    role: 'NEOMAAA team',
  },
} as const;

// Deterministic gradient per user name (stable hash)
function gradientForName(name: string): string {
  const palettes = [
    ['#98283A', '#C94A5C'],
    ['#7A2030', '#98283A'],
    ['#C94A5C', '#7A2030'],
    ['#98283A', '#7A2030'],
    ['#C94A5C', '#98283A'],
    ['#7A2030', '#C94A5C'],
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  const [a, b] = palettes[h % palettes.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function TopBarUserMenu({
  userName,
  isAdmin,
  lang,
}: TopBarUserMenuProps) {
  const t = T[lang] || T.es;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onDoc);
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  async function handleLogout() {
    const { signOut } = await import('next-auth/react');
    await signOut({ callbackUrl: '/login' });
  }

  const gradient = gradientForName(userName);
  const initials = initialsOf(userName);

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/10"
        aria-label="User menu"
        aria-expanded={open}
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black tracking-wider shadow-lg"
          style={{
            background: gradient,
            boxShadow: '0 0 12px rgba(152,40,58,0.3), inset 0 0 6px rgba(255,255,255,0.12)',
          }}
        >
          {initials}
        </div>
        {isAdmin && (
          <span
            className="hidden sm:inline-flex items-center text-[9px] font-black tracking-[0.15em] px-1.5 py-0.5 rounded-md"
            style={{
              color: '#FBBF24',
              background: 'rgba(251,191,36,0.12)',
              border: '1px solid rgba(251,191,36,0.35)',
              boxShadow: '0 0 8px rgba(251,191,36,0.15)',
            }}
          >
            {t.admin}
          </span>
        )}
        <span className="hidden md:inline text-[12.5px] font-medium text-neo-text-secondary truncate max-w-[120px]">
          {userName}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-neo-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-64 z-50 overflow-hidden rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(18,22,38,0.92), rgba(8,11,22,0.92))',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(152,40,58,0.12)',
            }}
          >
            {/* User block */}
            <div className="px-4 py-3.5 border-b border-white/5 flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[13px] font-black shrink-0"
                style={{ background: gradient }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white truncate">
                  {userName}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                    style={{
                      color: isAdmin ? '#FBBF24' : '#C94A5C',
                      background: isAdmin
                        ? 'rgba(251,191,36,0.1)'
                        : 'rgba(152,40,58,0.12)',
                      border: `1px solid ${isAdmin ? 'rgba(251,191,36,0.3)' : 'rgba(152,40,58,0.35)'}`,
                    }}
                  >
                    {isAdmin ? t.admin : t.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-1.5">
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-neo-text-secondary hover:text-white hover:bg-white/5 transition-all"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: '#FBBF24' }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Admin
                </Link>
              )}
              <Link
                href="/change-code"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-neo-text-secondary hover:text-white hover:bg-white/5 transition-all"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#C94A5C' }}
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t.changeCode}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-neo-text-secondary transition-all group"
                style={{
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(152,40,58,0.12)';
                  e.currentTarget.style.color = '#C94A5C';
                  e.currentTarget.style.boxShadow =
                    '0 0 12px rgba(152,40,58,0.2), inset 0 0 12px rgba(152,40,58,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                {t.signOut}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
