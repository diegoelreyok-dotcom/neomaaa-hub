import Link from 'next/link';
import type { Lang } from '@/lib/types';

interface QuickActionsProps {
  lang: Lang;
}

const T = {
  es: {
    title: 'Acciones rapidas',
    search: { title: 'Buscar', desc: 'En toda la base de conocimiento' },
    myPath: { title: 'Mi ruta', desc: 'Continua donde dejaste' },
    certs: { title: 'Certificados', desc: 'Mis completados' },
    kb: { title: 'Exploradas', desc: 'Secciones disponibles' },
  },
  ru: {
    title: 'Быстрые действия',
    search: { title: 'Поиск', desc: 'По всей базе знаний' },
    myPath: { title: 'Мой путь', desc: 'Продолжить с того же места' },
    certs: { title: 'Сертификаты', desc: 'Мои достижения' },
    kb: { title: 'Разделы', desc: 'Доступные материалы' },
  },
  en: {
    title: 'Quick actions',
    search: { title: 'Search', desc: 'Across the knowledge base' },
    myPath: { title: 'My path', desc: 'Pick up where you left off' },
    certs: { title: 'Certificates', desc: 'My completed modules' },
    kb: { title: 'Sections', desc: 'Available to you' },
  },
};

export default function QuickActions({ lang }: QuickActionsProps) {
  const t = T[lang] || T.es;

  const actions = [
    {
      href: '/search',
      title: t.search.title,
      desc: t.search.desc,
      color: '#C94A5C',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      href: '/learning',
      title: t.myPath.title,
      desc: t.myPath.desc,
      color: '#98283A',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <polyline points="9 9 12 6 15 9" />
          <line x1="12" y1="6" x2="12" y2="14" />
        </svg>
      ),
    },
    {
      href: '/certificates',
      title: t.certs.title,
      desc: t.certs.desc,
      color: '#FBBF24',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      href: '#sections',
      title: t.kb.title,
      desc: t.kb.desc,
      color: '#7A2030',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group relative overflow-hidden rounded-xl p-4 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background:
                'linear-gradient(135deg, rgba(20, 24, 40, 0.5) 0%, rgba(10, 14, 26, 0.5) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${action.color}18 0%, transparent 60%)`,
              }}
            />
            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${action.color}15`,
                  color: action.color,
                  border: `1px solid ${action.color}30`,
                }}
              >
                {action.icon}
              </div>
              <div className="text-sm font-semibold text-white mb-0.5 truncate">
                {action.title}
              </div>
              <div className="text-[11px] text-neo-text-muted truncate">{action.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
