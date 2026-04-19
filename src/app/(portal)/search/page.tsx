import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import { SECTIONS } from '@/lib/sections';
import type { Lang, Role } from '@/lib/types';
import SearchView from './SearchView';

const FALLBACK_ROLES: Record<string, Role> = {
  admin: { id: 'admin', name: 'Administrador', nameRu: 'Администратор', sections: SECTIONS.map(s => s.id), isAdmin: true },
  principal: { id: 'principal', name: 'Principal', nameRu: 'Принципал', sections: SECTIONS.map(s => s.id), isAdmin: false },
  sales: { id: 'sales', name: 'Ventas', nameRu: 'Продажи', sections: ['sales', 'encyclopedia', 'support'], isAdmin: false },
  compliance: { id: 'compliance', name: 'Compliance', nameRu: 'Комплаенс', sections: ['compliance', 'encyclopedia', 'support', 'legal'], isAdmin: false },
  'support-role': { id: 'support-role', name: 'Soporte', nameRu: 'Поддержка', sections: ['support', 'operations', 'encyclopedia'], isAdmin: false },
  dealing: { id: 'dealing', name: 'Dealing', nameRu: 'Дилинг', sections: ['compliance', 'operations', 'encyclopedia'], isAdmin: false },
  'marketing-role': { id: 'marketing-role', name: 'Marketing', nameRu: 'Маркетинг', sections: ['marketing', 'encyclopedia'], isAdmin: false },
  dev: { id: 'dev', name: 'Desarrollo', nameRu: 'Разработка', sections: SECTIONS.map(s => s.id), isAdmin: false },
};

export default async function SearchPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = session.user as {
    userId?: string;
    roleId?: string;
    isAdmin?: boolean;
    lang?: Lang;
    extraSections?: string[];
  };

  const roleId = user.roleId || 'admin';
  const isAdmin = user.isAdmin || false;
  const lang: Lang = user.lang || 'es';
  const extraSections = Array.isArray(user.extraSections) ? user.extraSections : [];

  let role = await getRole(roleId);
  if (!role) {
    role = FALLBACK_ROLES[roleId] || (isAdmin ? FALLBACK_ROLES.admin : FALLBACK_ROLES.sales);
  }
  const sections = getVisibleSections(role, extraSections);
  const allowedSections = sections.map((s) => s.id);

  return <SearchView lang={lang} allowedSections={allowedSections} />;
}
