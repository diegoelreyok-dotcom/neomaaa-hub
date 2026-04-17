'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import type { Lang } from '@/lib/types';
import {
  useAdminUsers,
  useAdminRegistrations,
} from './useAdminData';
import { AdminProvider } from './AdminContext';

interface NavLabels {
  admin: string;
  dashboard: string;
  users: string;
  roles: string;
  registrations: string;
  progress: string;
  certificates: string;
  analytics: string;
  apiKeys: string;
  settings: string;
  backToPortal: string;
  signedAs: string;
}

const L: Record<Lang, NavLabels> = {
  es: {
    admin: 'Admin',
    dashboard: 'Dashboard',
    users: 'Usuarios',
    roles: 'Roles',
    registrations: 'Solicitudes',
    progress: 'Progreso',
    certificates: 'Certificados',
    analytics: 'Analytics',
    apiKeys: 'API Keys',
    settings: 'Settings',
    backToPortal: 'Volver al Portal',
    signedAs: 'Conectado',
  },
  ru: {
    admin: 'Админ',
    dashboard: 'Панель',
    users: 'Пользователи',
    roles: 'Роли',
    registrations: 'Заявки',
    progress: 'Прогресс',
    certificates: 'Сертификаты',
    analytics: 'Аналитика',
    apiKeys: 'API-ключи',
    settings: 'Настройки',
    backToPortal: 'Вернуться в портал',
    signedAs: 'Вошли как',
  },
  en: {
    admin: 'Admin',
    dashboard: 'Dashboard',
    users: 'Users',
    roles: 'Roles',
    registrations: 'Requests',
    progress: 'Progress',
    certificates: 'Certificates',
    analytics: 'Analytics',
    apiKeys: 'API Keys',
    settings: 'Settings',
    backToPortal: 'Back to Portal',
    signedAs: 'Signed in',
  },
};

const icons = {
  dashboard: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v9H3V3zm0 13h7v5H3v-5zm11-13h7v5h-7V3zm0 9h7v9h-7v-9z" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  roles: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  registrations: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
  ),
  progress: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  certificates: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m8.25 0V10.5c0-.621-.504-1.125-1.125-1.125H6.75a1.125 1.125 0 00-1.125 1.125v8.25m12.75 0V6a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6v12.75" />
    </svg>
  ),
  analytics: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 4 4 5-6" />
    </svg>
  ),
  apiKeys: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  ),
  settings: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

function Badge({ count, variant }: { count: number; variant: 'amber' | 'burgundy' | 'neutral' }) {
  if (count === 0) return null;
  const v = {
    amber: 'bg-[#D4A03A]/15 text-[#D4A03A]',
    burgundy: 'bg-[#98283A]/20 text-[#98283A]',
    neutral: 'bg-[#1E1E1E] text-[#A0A0A0]',
  }[variant];
  return (
    <span
      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${v} min-w-[20px] text-center`}
    >
      {count}
    </span>
  );
}

export function AdminShell({
  lang,
  userName,
  children,
}: {
  lang: Lang;
  userName: string;
  children: ReactNode;
}) {
  const t = L[lang];
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // These fetches are shared across the whole admin surface via SWR.
  // They populate nav badges and are reused by pages -- zero duplicate fetches.
  const { users } = useAdminUsers();
  const { registrations } = useAdminRegistrations();
  const pendingCount = registrations.filter((r) => r.status === 'pending').length;

  const navItems = [
    { href: '/admin', label: t.dashboard, icon: icons.dashboard, count: 0, badgeVariant: 'neutral' as const, exact: true },
    { href: '/admin/users', label: t.users, icon: icons.users, count: users.length, badgeVariant: 'neutral' as const },
    { href: '/admin/roles', label: t.roles, icon: icons.roles, count: 0, badgeVariant: 'neutral' as const },
    { href: '/admin/registrations', label: t.registrations, icon: icons.registrations, count: pendingCount, badgeVariant: 'amber' as const },
    { href: '/admin/progress', label: t.progress, icon: icons.progress, count: 0, badgeVariant: 'neutral' as const },
    { href: '/admin/certificates', label: t.certificates, icon: icons.certificates, count: 0, badgeVariant: 'neutral' as const },
    { href: '/admin/analytics', label: t.analytics, icon: icons.analytics, count: 0, badgeVariant: 'neutral' as const },
    { href: '/admin/api-keys', label: t.apiKeys, icon: icons.apiKeys, count: 0, badgeVariant: 'neutral' as const },
    { href: '/admin/settings', label: t.settings, icon: icons.settings, count: 0, badgeVariant: 'neutral' as const },
  ];

  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <AdminProvider lang={lang} userName={userName}>
      <div className="min-h-screen bg-[#080808] flex" data-admin-lang={lang}>
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0B0B0B] border-r border-[#1A1A1A] flex flex-col z-40 transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="px-5 h-14 flex items-center border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#98283A] flex items-center justify-center text-white font-extrabold text-sm">
                N
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-tight leading-tight">
                  NEOMAAA
                </div>
                <div className="text-[#666666] text-[10px] font-semibold uppercase tracking-widest leading-tight">
                  {t.admin}
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      prefetch
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-100 ${
                        active
                          ? 'bg-[#98283A]/15 text-[#98283A]'
                          : 'text-[#A0A0A0] hover:text-white hover:bg-[#141414]'
                      }`}
                    >
                      <span className={active ? 'text-[#98283A]' : 'text-[#666666]'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                      <Badge count={item.count} variant={item.badgeVariant} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer: user + back to portal */}
          <div className="p-3 border-t border-[#1A1A1A] space-y-2">
            <Link
              prefetch
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-[#666666] hover:text-white hover:bg-[#141414] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t.backToPortal}
            </Link>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-[#111111] border border-[#1A1A1A]">
              <div className="w-7 h-7 rounded-full bg-[#98283A] flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0">
                {initials || '?'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-[#666666] uppercase tracking-wider leading-none">
                  {t.signedAs}
                </div>
                <div className="text-xs text-white font-medium truncate mt-0.5">
                  {userName}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            aria-label="Close menu"
          />
        )}

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Mobile topbar */}
          <div className="lg:hidden bg-[#0B0B0B] border-b border-[#1A1A1A] h-12 flex items-center px-4 sticky top-0 z-20">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-[#A0A0A0] hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <span className="ml-3 text-white font-bold text-sm">NEOMAAA · {t.admin}</span>
          </div>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl w-full">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
