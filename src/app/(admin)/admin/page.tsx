'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/types';
import {
  useAdminUsers,
  useAdminRoles,
  useAdminProgress,
  useAdminRegistrations,
} from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';
import { AdminKpi, AdminPageHeader, AdminSkeleton, btnSecondary } from '@/components/admin/AdminUI';

const labels: Record<Lang, {
  title: string;
  subtitle: string;
  usersKpi: string;
  usersKpiHint: string;
  rolesKpi: string;
  rolesKpiHint: string;
  documentsKpi: string;
  documentsKpiHint: string;
  pendingKpi: string;
  pendingKpiHint: string;
  quickActions: string;
  addUser: string;
  addUserDesc: string;
  createRole: string;
  createRoleDesc: string;
  viewProgress: string;
  viewProgressDesc: string;
  viewRegistrations: string;
  viewRegistrationsDesc: string;
  seedData: string;
  seeding: string;
  seedDone: string;
  seedError: string;
  recentActivity: string;
  activityPlaceholder: string;
  readActivity: string;
  active: string;
  inactive: string;
}> = {
  es: {
    title: 'Panel de Administracion',
    subtitle: 'Gestion de usuarios, roles y permisos de NEOMAAA Hub',
    usersKpi: 'Usuarios',
    usersKpiHint: 'total registrados',
    rolesKpi: 'Roles',
    rolesKpiHint: 'configurados',
    documentsKpi: 'Documentos',
    documentsKpiHint: 'en la plataforma',
    pendingKpi: 'Solicitudes',
    pendingKpiHint: 'pendientes de revisar',
    quickActions: 'Acciones Rapidas',
    addUser: 'Agregar Usuario',
    addUserDesc: 'Crear nuevo miembro del equipo',
    createRole: 'Crear Rol',
    createRoleDesc: 'Definir permisos por seccion',
    viewProgress: 'Ver Progreso',
    viewProgressDesc: 'Avance de lectura del equipo',
    viewRegistrations: 'Revisar Solicitudes',
    viewRegistrationsDesc: 'Aprobar nuevos accesos',
    seedData: 'Cargar datos de ejemplo',
    seeding: 'Ejecutando seed...',
    seedDone: 'Seed completado',
    seedError: 'Error al ejecutar seed',
    recentActivity: 'Actividad Reciente',
    activityPlaceholder: 'El registro de actividad se mostrara aqui una vez que los usuarios comiencen a interactuar con la plataforma.',
    readActivity: 'lecturas registradas en las ultimas semanas',
    active: 'activos',
    inactive: 'inactivos',
  },
  ru: {
    title: 'Панель администрирования',
    subtitle: 'Управление пользователями, ролями и разрешениями NEOMAAA Hub',
    usersKpi: 'Пользователи',
    usersKpiHint: 'всего зарегистрировано',
    rolesKpi: 'Роли',
    rolesKpiHint: 'настроено',
    documentsKpi: 'Документы',
    documentsKpiHint: 'на платформе',
    pendingKpi: 'Заявки',
    pendingKpiHint: 'ожидают рассмотрения',
    quickActions: 'Быстрые действия',
    addUser: 'Добавить пользователя',
    addUserDesc: 'Создать нового участника команды',
    createRole: 'Создать роль',
    createRoleDesc: 'Настроить разрешения по разделам',
    viewProgress: 'Посмотреть прогресс',
    viewProgressDesc: 'Прогресс чтения команды',
    viewRegistrations: 'Проверить заявки',
    viewRegistrationsDesc: 'Одобрить новые доступы',
    seedData: 'Загрузить тестовые данные',
    seeding: 'Выполняется загрузка...',
    seedDone: 'Загрузка завершена',
    seedError: 'Ошибка при загрузке данных',
    recentActivity: 'Недавняя активность',
    activityPlaceholder: 'Журнал активности появится здесь, как только пользователи начнут взаимодействовать с платформой.',
    readActivity: 'обращений к документам за последние недели',
    active: 'активны',
    inactive: 'неактивны',
  },
};

const TOTAL_DOCUMENTS = 28;

export default function AdminDashboardPage() {
  const lang = useAdminLang();
  const t = labels[lang];

  const { users, isLoading: loadingUsers } = useAdminUsers();
  const { roles, isLoading: loadingRoles } = useAdminRoles();
  const { progress } = useAdminProgress();
  const { registrations } = useAdminRegistrations();

  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const loading = loadingUsers || loadingRoles;
  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const pending = registrations.filter((r) => r.status === 'pending').length;

  async function handleSeed() {
    setSeeding(true);
    setSeedStatus(t.seeding);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedStatus(data.message || t.seedDone);
      setTimeout(() => window.location.reload(), 1200);
    } catch {
      setSeedStatus(t.seedError);
    } finally {
      setSeeding(false);
    }
  }

  const quickActions = [
    {
      label: t.addUser,
      href: '/admin/users',
      description: t.addUserDesc,
      primary: true,
    },
    {
      label: t.createRole,
      href: '/admin/roles',
      description: t.createRoleDesc,
      primary: false,
    },
    {
      label: t.viewProgress,
      href: '/admin/progress',
      description: t.viewProgressDesc,
      primary: false,
    },
    {
      label: t.viewRegistrations,
      href: '/admin/registrations',
      description: t.viewRegistrationsDesc,
      primary: pending > 0,
    },
  ];

  return (
    <div>
      <AdminPageHeader title={t.title} subtitle={t.subtitle} />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <AdminSkeleton key={i} className="h-28" />
          ))
        ) : (
          <>
            <Link href="/admin/users">
              <AdminKpi
                label={t.usersKpi}
                value={users.length}
                hint={
                  <span>
                    <span className="text-[#38CC97] font-medium">{activeUsers}</span> {t.active}
                    {inactiveUsers > 0 && <> · {inactiveUsers} {t.inactive}</>}
                  </span>
                }
              />
            </Link>
            <Link href="/admin/roles">
              <AdminKpi label={t.rolesKpi} value={roles.length} hint={t.rolesKpiHint} />
            </Link>
            <Link href="/admin/settings">
              <AdminKpi
                label={t.documentsKpi}
                value={TOTAL_DOCUMENTS}
                hint={t.documentsKpiHint}
              />
            </Link>
            <Link href="/admin/registrations">
              <AdminKpi
                label={t.pendingKpi}
                value={pending}
                hint={t.pendingKpiHint}
                accent={pending > 0 ? 'amber' : 'neutral'}
              />
            </Link>
          </>
        )}
      </div>

      {/* Progress stat strip */}
      {!loading && progress.length > 0 && (
        <div className="mb-8 bg-[#111111] border border-[#1E1E1E] rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#98283A]/15 text-[#98283A] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-semibold">
              {progress.length} {t.readActivity}
            </div>
          </div>
          <Link
            href="/admin/progress"
            className="text-[#98283A] hover:text-[#B33347] text-sm font-semibold transition-colors"
          >
            →
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-white mb-3">{t.quickActions}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`rounded-lg p-4 border transition-colors duration-150 ${
                action.primary
                  ? 'bg-[#98283A]/10 border-[#98283A]/25 hover:border-[#98283A]/40'
                  : 'bg-[#111111] border-[#1E1E1E] hover:border-[#2A2A2A]'
              }`}
            >
              <div
                className={`text-sm font-semibold mb-1 ${
                  action.primary ? 'text-[#98283A]' : 'text-white'
                }`}
              >
                {action.label}
              </div>
              <div className="text-[#666666] text-xs leading-relaxed">
                {action.description}
              </div>
            </Link>
          ))}
        </div>

        {/* Seed button */}
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button onClick={handleSeed} disabled={seeding} className={btnSecondary}>
            {t.seedData}
          </button>
          {seedStatus && (
            <span className="text-xs text-[#A0A0A0] bg-[#111111] border border-[#1E1E1E] rounded-md px-3 py-1.5">
              {seedStatus}
            </span>
          )}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">{t.recentActivity}</h2>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-8 text-center">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[#666666] text-sm">{t.activityPlaceholder}</p>
        </div>
      </div>
    </div>
  );
}
