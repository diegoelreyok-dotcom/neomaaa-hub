import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

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

  const navLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/users', label: 'Usuarios' },
    { href: '/admin/roles', label: 'Roles' },
    { href: '/admin/registrations', label: 'Solicitudes' },
    { href: '/admin/progress', label: 'Progreso' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
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
                Admin
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
                Volver al Portal
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
