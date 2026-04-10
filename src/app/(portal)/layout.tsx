import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import { SECTIONS } from '@/lib/sections';
import type { Lang, Role } from '@/lib/types';
import PortalShell from './PortalShell';

// Fallback roles for when DB is unavailable (serverless cold start)
const FALLBACK_ROLES: Record<string, Role> = {
  admin: { id: 'admin', name: 'Administrador', nameRu: 'Администратор', sections: SECTIONS.map(s => s.id), isAdmin: true },
  principal: { id: 'principal', name: 'Principal', nameRu: 'Принципал', sections: SECTIONS.map(s => s.id), isAdmin: false },
  sales: { id: 'sales', name: 'Ventas', nameRu: 'Продажи', sections: ['sales', 'encyclopedia', 'support'], isAdmin: false },
  compliance: { id: 'compliance', name: 'Compliance', nameRu: 'Комплаенс', sections: ['compliance', 'encyclopedia', 'support'], isAdmin: false },
  'support-role': { id: 'support-role', name: 'Soporte', nameRu: 'Поддержка', sections: ['support', 'operations', 'encyclopedia'], isAdmin: false },
  dealing: { id: 'dealing', name: 'Dealing', nameRu: 'Дилинг', sections: ['compliance', 'operations', 'encyclopedia'], isAdmin: false },
  'marketing-role': { id: 'marketing-role', name: 'Marketing', nameRu: 'Маркетинг', sections: ['marketing', 'encyclopedia'], isAdmin: false },
  dev: { id: 'dev', name: 'Desarrollo', nameRu: 'Разработка', sections: SECTIONS.map(s => s.id), isAdmin: false },
};

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
  const roleId: string = user.roleId || 'admin';
  const isAdmin: boolean = user.isAdmin || false;
  const lang: Lang = user.lang || 'es';
  const userName: string = user.name || userId;

  // Try DB first, fall back to hardcoded roles
  let role = await getRole(roleId);
  if (!role) {
    role = FALLBACK_ROLES[roleId] || FALLBACK_ROLES['admin'];
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
