import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import { SECTIONS } from '@/lib/sections';
import type { Lang, Role } from '@/lib/types';
import PortalShell from './PortalShell';

// Fallback roles for when DB is unavailable (serverless cold start).
// MUST stay in sync with seedDefaultData() in src/lib/db.ts. If you change one,
// change the other — otherwise users see different sections depending on whether
// KV is reachable at request time.
// Note: `dev` does NOT get `executive` (seed matches). `compliance` gets `legal`
// (added via scripts/add-legal-to-compliance.ts, already in KV).
const FALLBACK_ROLES: Record<string, Role> = {
  admin: {
    id: 'admin',
    name: 'Administrador',
    nameRu: 'Администратор',
    sections: ['launch', 'sales', 'compliance', 'support', 'operations', 'marketing', 'hiring', 'partners', 'legal', 'encyclopedia', 'executive'],
    isAdmin: true,
  },
  principal: {
    id: 'principal',
    name: 'Principal',
    nameRu: 'Принципал',
    sections: ['launch', 'sales', 'compliance', 'support', 'operations', 'marketing', 'hiring', 'partners', 'legal', 'encyclopedia', 'executive'],
    isAdmin: false,
  },
  sales: {
    id: 'sales',
    name: 'Ventas',
    nameRu: 'Продажи',
    sections: ['sales', 'encyclopedia', 'support'],
    isAdmin: false,
  },
  compliance: {
    id: 'compliance',
    name: 'Compliance',
    nameRu: 'Комплаенс',
    sections: ['compliance', 'encyclopedia', 'support', 'legal'],
    isAdmin: false,
  },
  'support-role': {
    id: 'support-role',
    name: 'Soporte',
    nameRu: 'Поддержка',
    sections: ['support', 'operations', 'encyclopedia'],
    isAdmin: false,
  },
  dealing: {
    id: 'dealing',
    name: 'Dealing',
    nameRu: 'Дилинг',
    sections: ['compliance', 'operations', 'encyclopedia'],
    isAdmin: false,
  },
  'marketing-role': {
    id: 'marketing-role',
    name: 'Marketing',
    nameRu: 'Маркетинг',
    sections: ['marketing', 'encyclopedia'],
    isAdmin: false,
  },
  dev: {
    id: 'dev',
    name: 'Desarrollo',
    nameRu: 'Разработка',
    sections: ['launch', 'sales', 'compliance', 'support', 'operations', 'marketing', 'hiring', 'partners', 'legal', 'encyclopedia'],
    isAdmin: false,
  },
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
  const extraSections: string[] = Array.isArray(user.extraSections) ? user.extraSections : [];

  // Try DB first, fall back to hardcoded roles
  // SECURITY: Fall back to most restrictive role, not admin
  let role = await getRole(roleId);
  if (!role) {
    role = FALLBACK_ROLES[roleId] || (isAdmin ? FALLBACK_ROLES['admin'] : FALLBACK_ROLES['sales']);
  }

  const sections = getVisibleSections(role, extraSections);

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
