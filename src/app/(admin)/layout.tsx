import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import type { Lang } from '@/lib/types';

const labels: Record<Lang, {
  admin: string;
  dashboard: string;
  users: string;
  roles: string;
  registrations: string;
  progress: string;
  settings: string;
  backToPortal: string;
}> = {
  es: {
    admin: 'Admin',
    dashboard: 'Dashboard',
    users: 'Usuarios',
    roles: 'Roles',
    registrations: 'Solicitudes',
    progress: 'Progreso',
    settings: 'Settings',
    backToPortal: 'Volver al Portal',
  },
  ru: {
    admin: 'Админ',
    dashboard: 'Панель',
    users: 'Пользователи',
    roles: 'Роли',
    registrations: 'Заявки',
    progress: 'Прогресс',
    settings: 'Настройки',
    backToPortal: 'Вернуться в портал',
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as any;
  if (!user.isAdmin) {
    redirect('/dashboard');
  }

  const lang: Lang = user.lang === 'ru' ? 'ru' : 'es';
  const t = labels[lang];

  const navLinks = [
    { href: '/admin', label: t.dashboard },
    { href: '/admin/users', label: t.users },
    { href: '/admin/roles', label: t.roles },
    { href: '/admin/registrations', label: t.registrations },
    { href: '/admin/progress', label: t.progress },
    { href: '/admin/settings', label: t.settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-admin-lang={lang}>
      {/* Admin top navigation bar */}
      <nav className="bg-[#111111] border-b border-[#1E1E1E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo + brand */}
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-lg tracking-tight">
                NEOMAAA
              </span>
              <span className="text-[#666666] text-xs font-medium uppercase tracking-widest border border-[#1E1E1E] rounded px-2 py-0.5">
                {t.admin}
              </span>
            </div>

            {/* Navigation links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-[#A0A0A0] hover:text-white hover:bg-[#161616] rounded-md transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-6 bg-[#1E1E1E] mx-2" />
              <Link
                href="/dashboard"
                className="px-3 py-1.5 text-sm font-medium text-[#666666] hover:text-white hover:bg-[#161616] rounded-md transition-all duration-200"
              >
                {t.backToPortal}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
