import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import type { Lang } from '@/lib/types';
import { AdminShell } from '@/components/admin/AdminShell';

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
  const userName: string = user.name || user.id || '';

  return (
    <AdminShell lang={lang} userName={userName}>
      {children}
    </AdminShell>
  );
}
