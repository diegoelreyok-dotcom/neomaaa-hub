'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Lang } from '@/lib/types';
import { useAdminRoles } from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';
import type { AdminRole as RoleData } from '@/components/admin/fetcher';

interface SectionInfo {
  id: string;
  nameEs: string;
  nameRu: string;
  documentCount: number;
  documents: string[];
}

const labels: Record<Lang, {
  errorLoading: string;
  notFound: string;
  connError: string;
  backToRoles: string;
  admin: string;
  configureDesc: string;
  enableAll: string;
  disableAll: string;
  documentOne: string;
  documentMany: string;
  toggleEnable: string;
  toggleDisable: string;
  sectionsLabel: string;
  docsAccessible: string;
  noneEnabled: string;
  moreSuffix: string;
}> = {
  es: {
    errorLoading: 'Error al cargar roles',
    notFound: 'Rol no encontrado',
    connError: 'Error de conexion',
    backToRoles: 'Volver a Roles',
    admin: 'Admin',
    configureDesc: 'Configura las secciones que este rol puede ver',
    enableAll: 'Activar todas',
    disableAll: 'Desactivar todas',
    documentOne: 'documento',
    documentMany: 'documentos',
    toggleEnable: 'Habilitar',
    toggleDisable: 'Deshabilitar',
    sectionsLabel: 'secciones',
    docsAccessible: 'documentos accesibles',
    noneEnabled: 'Ninguna seccion habilitada',
    moreSuffix: 'mas',
  },
  ru: {
    errorLoading: 'Ошибка загрузки ролей',
    notFound: 'Роль не найдена',
    connError: 'Ошибка соединения',
    backToRoles: 'Назад к ролям',
    admin: 'Админ',
    configureDesc: 'Настройте разделы, доступные этой роли',
    enableAll: 'Включить все',
    disableAll: 'Отключить все',
    documentOne: 'документ',
    documentMany: 'документов',
    toggleEnable: 'Включить',
    toggleDisable: 'Отключить',
    sectionsLabel: 'разделов',
    docsAccessible: 'доступных документов',
    noneEnabled: 'Нет включённых разделов',
    moreSuffix: 'ещё',
  },
  en: {
    errorLoading: 'Error loading roles',
    notFound: 'Role not found',
    connError: 'Connection error',
    backToRoles: 'Back to Roles',
    admin: 'Admin',
    configureDesc: 'Configure the sections this role can view',
    enableAll: 'Enable all',
    disableAll: 'Disable all',
    documentOne: 'document',
    documentMany: 'documents',
    toggleEnable: 'Enable',
    toggleDisable: 'Disable',
    sectionsLabel: 'sections',
    docsAccessible: 'accessible documents',
    noneEnabled: 'No sections enabled',
    moreSuffix: 'more',
  },
};

// Mirror of SECTIONS from sections.ts -- used client-side
const ALL_SECTIONS: SectionInfo[] = [
  { id: 'launch', nameEs: 'Master Checklist', nameRu: 'Мастер-чеклист', documentCount: 1, documents: ['Checklist Maestro de Lanzamiento'] },
  { id: 'sales', nameEs: 'Ventas', nameRu: 'Продажи', documentCount: 5, documents: ['Sales Playbook', 'Guion de Llamadas', 'Objeciones Frecuentes', 'Pipeline CRM', 'Metricas de Ventas'] },
  { id: 'compliance', nameEs: 'Compliance', nameRu: 'Комплаенс', documentCount: 5, documents: ['Politica AML/KYC', 'Procedimiento KYC', 'Onboarding Compliance', 'Monitoreo de Transacciones', 'Reportes Regulatorios'] },
  { id: 'support', nameEs: 'Soporte', nameRu: 'Поддержка', documentCount: 2, documents: ['Manual de Soporte', 'Escalamiento de Tickets'] },
  { id: 'operations', nameEs: 'Operaciones', nameRu: 'Операции', documentCount: 3, documents: ['Operaciones Diarias', 'Gestion de Liquidez', 'Mantenimiento de Plataforma'] },
  { id: 'marketing', nameEs: 'Marketing', nameRu: 'Маркетинг', documentCount: 4, documents: ['Estrategia de Marketing', 'Contenido y SEO', 'Redes Sociales', 'Email Marketing'] },
  { id: 'hiring', nameEs: 'Hiring', nameRu: 'Найм персонала', documentCount: 4, documents: ['Plan de Contratacion', 'Perfiles de Puesto', 'Proceso de Entrevistas', 'Onboarding de Equipo'] },
  { id: 'partners', nameEs: 'Partners', nameRu: 'Партнёры', documentCount: 3, documents: ['Programa de Partners', 'Comisiones IB', 'Onboarding de Partners'] },
  { id: 'encyclopedia', nameEs: 'Enciclopedia', nameRu: 'Энциклопедия', documentCount: 1, documents: ['Glosario General'] },
];

const SECTION_ICONS: Record<string, React.ReactNode> = {
  launch: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  sales: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  compliance: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  support: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  operations: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 5.384a2.625 2.625 0 01-3.712-3.712l5.384-5.384M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5" />
    </svg>
  ),
  marketing: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
    </svg>
  ),
  hiring: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  partners: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  encyclopedia: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
};

export default function RolePermissionsPage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params.id as string;
  const lang = useAdminLang();
  const { roles, isLoading, error: rolesError, mutate: mutateRoles } = useAdminRoles();

  const t = labels[lang];

  const foundRole = useMemo(
    () => roles.find((r) => r.id === roleId) || null,
    [roles, roleId],
  );

  const [localRole, setLocalRole] = useState<RoleData | null>(null);
  useEffect(() => {
    if (foundRole) setLocalRole(foundRole);
  }, [foundRole]);

  const role = localRole;
  const loading = isLoading;
  const error = rolesError ? t.errorLoading : !isLoading && !foundRole ? t.notFound : null;
  const setRole = setLocalRole;

  const [saving, setSaving] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  async function handleToggle(sectionId: string) {
    if (!role) return;

    const currentlyEnabled = role.sections.includes(sectionId);
    const newSections = currentlyEnabled
      ? role.sections.filter((s) => s !== sectionId)
      : [...role.sections, sectionId];

    // Optimistic update
    setRole({ ...role, sections: newSections });
    setSaving(sectionId);

    try {
      const res = await fetch('/api/roles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: role.id,
          sections: newSections,
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setRole({ ...role, sections: role.sections });
      } else {
        mutateRoles();
      }
    } catch {
      // Revert on failure
      setRole({ ...role, sections: role.sections });
    } finally {
      setSaving(null);
    }
  }

  async function handleToggleAll(enable: boolean) {
    if (!role) return;
    const newSections = enable ? ALL_SECTIONS.map((s) => s.id) : [];
    setRole({ ...role, sections: newSections });
    setSaving('all');

    try {
      const res = await fetch('/api/roles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: role.id,
          sections: newSections,
        }),
      });

      if (!res.ok) {
        setRole({ ...role, sections: role.sections });
      } else {
        mutateRoles();
      }
    } catch {
      setRole({ ...role, sections: role.sections });
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 w-32 bg-[#1A1A1A]/40 rounded mb-4" />
        <div className="h-8 w-48 bg-[#1A1A1A] rounded-lg mb-2" />
        <div className="h-4 w-64 bg-[#1A1A1A]/60 rounded-lg mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5 h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-[#C44545]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#C44545]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-[#C44545] text-sm font-medium mb-2">{error || t.notFound}</p>
        <Link
          href="/admin/roles"
          className="text-[#98283A] text-sm hover:text-[#B33347] transition-colors duration-200 font-medium"
        >
          {t.backToRoles}
        </Link>
      </div>
    );
  }

  const enabledCount = role.sections.length;
  const totalSections = ALL_SECTIONS.length;
  const totalDocsEnabled = ALL_SECTIONS
    .filter((s) => role.sections.includes(s.id))
    .reduce((sum, s) => sum + s.documentCount, 0);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/roles"
          className="inline-flex items-center gap-1.5 text-[#666666] text-sm hover:text-white transition-colors duration-200 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t.backToRoles}
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{lang === 'ru' ? (role.nameRu || role.name) : role.name}</h1>
              {role.isAdmin && (
                <span className="bg-[#98283A]/15 text-[#98283A] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#98283A]/20">
                  {t.admin}
                </span>
              )}
            </div>
            {role.nameRu !== role.name && (
              <p className="text-[#666666] text-sm mt-0.5">{lang === 'ru' ? role.name : role.nameRu}</p>
            )}
            <p className="text-[#A0A0A0] text-sm mt-2">
              {t.configureDesc}
            </p>
          </div>

          {/* Quick toggle all */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleAll(true)}
              disabled={enabledCount === totalSections || saving === 'all'}
              className="text-xs font-medium px-3 py-2 rounded-lg bg-[#98283A]/10 text-[#98283A] hover:bg-[#98283A]/20 border border-[#98283A]/20 hover:border-[#98283A]/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.enableAll}
            </button>
            <button
              onClick={() => handleToggleAll(false)}
              disabled={enabledCount === 0 || saving === 'all'}
              className="text-xs font-medium px-3 py-2 rounded-lg bg-[#1A1A1A]/50 text-[#A0A0A0] hover:text-white hover:bg-[#1E1E1E]/50 border border-[#1E1E1E]/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.disableAll}
            </button>
          </div>
        </div>
      </div>

      {/* Section toggle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_SECTIONS.map((section) => {
          const isEnabled = role.sections.includes(section.id);
          const isSaving = saving === section.id;
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              className={`rounded-2xl transition-all duration-300 border ${
                isEnabled
                  ? 'border-[#98283A]/45 shadow-[0_0_24px_rgba(152,40,58,0.18)]'
                  : 'border-white/10'
              } ${isExpanded ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              style={{
                background: 'linear-gradient(135deg, rgba(18,22,38,0.6), rgba(8,11,22,0.6))',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Section icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isEnabled
                        ? 'bg-[#98283A]/15 text-[#C94A5C] border border-[#98283A]/35 shadow-[0_0_14px_rgba(152,40,58,0.25)]'
                        : 'bg-white/5 text-[#6B7280] border border-white/10'
                    }`}>
                      {SECTION_ICONS[section.id] || (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm transition-colors duration-200 ${isEnabled ? 'text-white' : 'text-[#666666]'}`}>
                        {lang === 'ru' ? section.nameRu : section.nameEs}
                      </h3>
                      <p className="text-[#666666] text-xs mt-0.5">
                        {lang === 'ru' ? section.nameEs : section.nameRu}
                      </p>
                      {/* Document count pill */}
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        className={`inline-flex items-center gap-1 text-xs mt-2 px-2 py-0.5 rounded-md transition-all duration-200 ${
                          isEnabled
                            ? 'text-[#A0A0A0] bg-[#1A1A1A]/40 hover:bg-[#1A1A1A]/60'
                            : 'text-[#666666] bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40'
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        {section.documentCount} {section.documentCount !== 1 ? t.documentMany : t.documentOne}
                        <svg className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Toggle switch */}
                  <button
                    type="button"
                    onClick={() => handleToggle(section.id)}
                    disabled={isSaving}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 ml-3 ${
                      isEnabled
                        ? 'bg-gradient-to-br from-[#98283A] to-[#7A2030] shadow-[0_0_18px_rgba(152,40,58,0.45)]'
                        : 'bg-white/10 hover:bg-white/15'
                    } ${isSaving ? 'opacity-50' : ''}`}
                    aria-label={`${isEnabled ? t.toggleDisable : t.toggleEnable} ${lang === 'ru' ? section.nameRu : section.nameEs}`}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                        isEnabled ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded document list */}
              {isExpanded && (
                <div className="px-5 pb-5">
                  <div className="border-t border-[#1A1A1A]/40 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {section.documents.map((doc, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isEnabled
                              ? 'bg-[#98283A]/5 border border-[#98283A]/10'
                              : 'bg-[#1A1A1A]/20 border border-[#1A1A1A]/20'
                          }`}
                        >
                          <svg className={`w-3.5 h-3.5 flex-shrink-0 ${isEnabled ? 'text-[#98283A]' : 'text-[#666666]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                          <span className={`text-xs font-medium ${isEnabled ? 'text-white' : 'text-[#666666]'}`}>
                            {doc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky summary bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto px-4 pb-4">
          <div
            className="rounded-2xl p-4 shadow-2xl shadow-black/40 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(22,26,42,0.85), rgba(10,14,26,0.85))',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-white tabular-nums">
                    <span className="text-[#C94A5C] font-bold text-lg">{enabledCount}</span>
                    <span className="text-[#6B7280]"> / {totalSections} {t.sectionsLabel}</span>
                  </div>
                  <div className="text-[#94A3B8] text-xs mt-0.5 tabular-nums">
                    {totalDocsEnabled} {t.docsAccessible}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-32 bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#98283A] to-[#C94A5C] transition-all duration-500"
                      style={{ width: `${(enabledCount / totalSections) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#D1D5DB] font-medium tabular-nums">
                    {Math.round((enabledCount / totalSections) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-end">
                {role.sections.length === 0 ? (
                  <span className="text-xs text-[#666666]">{t.noneEnabled}</span>
                ) : (
                  role.sections.slice(0, 5).map((sid) => {
                    const sec = ALL_SECTIONS.find((s) => s.id === sid);
                    return (
                      <span
                        key={sid}
                        className="text-xs bg-[#98283A]/12 text-[#C94A5C] px-2.5 py-1 rounded-lg font-medium border border-[#98283A]/30"
                      >
                        {sec ? (lang === 'ru' ? sec.nameRu : sec.nameEs) : sid}
                      </span>
                    );
                  })
                )}
                {role.sections.length > 5 && (
                  <span className="text-xs bg-[#1A1A1A]/50 text-[#666666] px-2.5 py-1 rounded-lg font-medium">
                    +{role.sections.length - 5} {t.moreSuffix}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
