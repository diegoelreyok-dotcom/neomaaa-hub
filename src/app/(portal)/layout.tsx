import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import type { Lang } from '@/lib/types';
import PortalShell from './PortalShell';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as any;
  const userId: string = user.userId;
  const roleId: string = user.roleId;
  const isAdmin: boolean = user.isAdmin || false;
  const lang: Lang = user.lang || 'es';
  const userName: string = user.name || userId;

  const role = await getRole(roleId);
  if (!role) {
    redirect('/login');
  }

  const sections = getVisibleSections(role);

  return (
    <PortalShell
      sections={sections}
      userName={userName}
      isAdmin={isAdmin}
      lang={lang}
    >
      {children}
    </PortalShell>
  );
}
