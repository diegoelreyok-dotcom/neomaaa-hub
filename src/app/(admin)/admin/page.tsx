'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/types';
import {
  useAdminUsers,
  useAdminRoles,
  useAdminProgress,
  useAdminRegistrations,
} from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';
import {
  AdminKpi,
  AdminPageHeader,
  AdminSkeleton,
  btnSecondary,
} from '@/components/admin/AdminUI';
import { AdminCard } from '@/components/admin/AdminCard';
import AdminStagger, { AdminStaggerItem } from '@/components/admin/AdminStagger';

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
  en: {
    title: 'Admin Dashboard',
    subtitle: 'Manage NEOMAAA Hub users, roles, and permissions',
    usersKpi: 'Users',
    usersKpiHint: 'total registered',
    rolesKpi: 'Roles',
    rolesKpiHint: 'configured',
    documentsKpi: 'Documents',
    documentsKpiHint: 'on the platform',
    pendingKpi: 'Requests',
    pendingKpiHint: 'pending review',
    quickActions: 'Quick Actions',
    addUser: 'Add User',
    addUserDesc: 'Create a new team member',
    createRole: 'Create Role',
    createRoleDesc: 'Define section permissions',
    viewProgress: 'View Progress',
    viewProgressDesc: 'Team reading progress',
    viewRegistrations: 'Review Requests',
    viewRegistrationsDesc: 'Approve new access',
    seedData: 'Load seed data',
    seeding: 'Seeding...',
    seedDone: 'Seed complete',
    seedError: 'Seed error',
    recentActivity: 'Recent Activity',
    activityPlaceholder: 'Activity will appear here once users start interacting with the platform.',
    readActivity: 'reads tracked in the last weeks',
    active: 'active',
    inactive: 'inactive',
  },
};

const TOTAL_DOCUMENTS = 28;

const iconUsers = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);
const iconRoles = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const iconDocs = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const iconPending = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

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

  const quickActions: Array<{
    label: string;
    href: string;
    description: string;
    accent: 'cyan' | 'burgundy' | 'amber' | 'purple';
  }> = [
    {
      label: t.addUser,
      href: '/admin/users',
      description: t.addUserDesc,
      accent: 'cyan',
    },
    {
      label: t.createRole,
      href: '/admin/roles',
      description: t.createRoleDesc,
      accent: 'purple',
    },
    {
      label: t.viewProgress,
      href: '/admin/progress',
      description: t.viewProgressDesc,
      accent: 'burgundy',
    },
    {
      label: t.viewRegistrations,
      href: '/admin/registrations',
      description: t.viewRegistrationsDesc,
      accent: pending > 0 ? 'amber' : 'cyan',
    },
  ];

  return (
    <AdminStagger>
      <AdminStaggerItem>
        <AdminPageHeader title={t.title} subtitle={t.subtitle} />
      </AdminStaggerItem>

      {/* KPIs */}
      <AdminStaggerItem>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <AdminSkeleton key={i} className="h-32" />
            ))
          ) : (
            <>
              <Link href="/admin/users">
                <AdminKpi
                  label={t.usersKpi}
                  value={users.length}
                  icon={iconUsers}
                  accent="cyan"
                  hint={
                    <span>
                      <span className="text-[#10B981] font-semibold">{activeUsers}</span> {t.active}
                      {inactiveUsers > 0 && <> · {inactiveUsers} {t.inactive}</>}
                    </span>
                  }
                />
              </Link>
              <Link href="/admin/roles">
                <AdminKpi
                  label={t.rolesKpi}
                  value={roles.length}
                  icon={iconRoles}
                  accent="purple"
                  hint={t.rolesKpiHint}
                />
              </Link>
              <Link href="/admin/settings">
                <AdminKpi
                  label={t.documentsKpi}
                  value={TOTAL_DOCUMENTS}
                  icon={iconDocs}
                  accent="blue"
                  hint={t.documentsKpiHint}
                />
              </Link>
              <Link href="/admin/registrations">
                <AdminKpi
                  label={t.pendingKpi}
                  value={pending}
                  icon={iconPending}
                  accent={pending > 0 ? 'amber' : 'neutral'}
                  hint={t.pendingKpiHint}
                />
              </Link>
            </>
          )}
        </div>
      </AdminStaggerItem>

      {/* Progress stat strip */}
      {!loading && progress.length > 0 && (
        <AdminStaggerItem>
          <div className="mb-8">
            <AdminCard accent="burgundy" padding="md">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(201,74,92,0.12)',
                    border: '1px solid rgba(201,74,92,0.3)',
                    color: '#C94A5C',
                    boxShadow: '0 0 16px rgba(201,74,92,0.25)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold tabular-nums">
                    {progress.length} {t.readActivity}
                  </div>
                </div>
                <Link
                  href="/admin/progress"
                  className="text-[#C94A5C] hover:text-[#B33347] text-lg font-bold transition-colors px-3 py-1 rounded-lg hover:bg-[#98283A]/12"
                >
                  →
                </Link>
              </div>
            </AdminCard>
          </div>
        </AdminStaggerItem>
      )}

      {/* Quick actions */}
      <AdminStaggerItem>
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.12em] mb-4">
            {t.quickActions}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="block">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AdminCard accent={action.accent} padding="md">
                    <div className="text-white text-sm font-semibold mb-1">
                      {action.label}
                    </div>
                    <div className="text-[#94A3B8] text-xs leading-relaxed">
                      {action.description}
                    </div>
                  </AdminCard>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Seed button */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button onClick={handleSeed} disabled={seeding} className={btnSecondary}>
              {t.seedData}
            </button>
            {seedStatus && (
              <span className="text-xs text-[#94A3B8] bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                {seedStatus}
              </span>
            )}
          </div>
        </div>
      </AdminStaggerItem>

      {/* Recent activity placeholder */}
      <AdminStaggerItem>
        <div>
          <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.12em] mb-4">
            {t.recentActivity}
          </h2>
          <AdminCard padding="lg">
            <div className="text-center py-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#98283A]"
                style={{
                  background: 'rgba(152,40,58,0.1)',
                  border: '1px solid rgba(152,40,58,0.3)',
                  boxShadow: '0 0 20px rgba(152,40,58,0.25)',
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#94A3B8] text-sm">{t.activityPlaceholder}</p>
            </div>
          </AdminCard>
        </div>
      </AdminStaggerItem>
    </AdminStagger>
  );
}
