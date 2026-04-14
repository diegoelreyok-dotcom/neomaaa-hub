import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { getDashboardContent } from '@/lib/content';
import { getVisibleSections } from '@/lib/permissions';
import type { Lang, Role } from '@/lib/types';
import { SECTIONS } from '@/lib/sections';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import DashboardProgress from './DashboardProgress';
import LearningPathCard from './LearningPathCard';

// Fallback roles (same as layout)
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

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user as any;
  const lang: Lang = user?.lang || 'es';
  const userName: string = user?.name || user?.userId || '';
  const userId: string = user?.userId || '';
  const roleId: string = user?.roleId || 'admin';
  const isAdmin: boolean = user?.isAdmin || false;

  const content = getDashboardContent(lang);

  // Calculate total accessible documents
  let role = await getRole(roleId);
  if (!role) {
    role = FALLBACK_ROLES[roleId] || (isAdmin ? FALLBACK_ROLES['admin'] : FALLBACK_ROLES['sales']);
  }
  const visibleSections = getVisibleSections(role);
  const totalDocs = visibleSections.reduce((sum, s) => sum + s.documents.length, 0);
  const totalSections = visibleSections.length;

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neo-text tracking-tight">
              {lang === 'ru' ? 'Добро пожаловать' : 'Bienvenido'},{' '}
              <span className="bg-gradient-to-r from-neo-primary to-neo-primary-light bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="text-neo-text-muted text-sm mt-1.5">
              {lang === 'ru'
                ? 'Внутренний портал команды NEOMAAA'
                : 'Portal interno del equipo NEOMAAA'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Sections accessible */}
        <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 group hover:border-neo-dark-3 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-neo-primary/10 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-neo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-neo-text">{totalSections}</div>
              <div className="text-[11px] text-neo-text-muted font-medium uppercase tracking-wider">
                {lang === 'ru' ? '\u0420\u0430\u0437\u0434\u0435\u043B\u043E\u0432' : 'Secciones'}
              </div>
            </div>
          </div>
        </div>

        {/* Total docs */}
        <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 group hover:border-neo-dark-3 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-neo-text">{totalDocs}</div>
              <div className="text-[11px] text-neo-text-muted font-medium uppercase tracking-wider">
                {lang === 'ru' ? '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432' : 'Documentos'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning path card (server-rendered so SSR has the right state) */}
      {userId && (
        <div className="mb-4">
          <LearningPathCard userId={userId} roleId={roleId} lang={lang} />
        </div>
      )}

      {/* Progress card — full width, client component */}
      <div className="mb-8">
        <DashboardProgress totalDocs={totalDocs} lang={lang} />
      </div>

      {/* Markdown content below */}
      <MarkdownRenderer content={content} />
    </div>
  );
}
