'use client';

import { Fragment, useState } from 'react';
import type { Lang } from '@/lib/types';
import {
  useAdminUsers,
  useAdminRoles,
  useAdminProgress,
} from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';

const labels: Record<Lang, {
  title: string;
  subtitle: string;
  exportCSV: string;
  activeUsers: string;
  ofTotal: string;
  docsRead: string;
  accessesRegistered: string;
  avgProgress: string;
  advance: string;
  colUser: string;
  colRole: string;
  colRead: string;
  colProgress: string;
  colLastAccess: string;
  emptyNoUsers: string;
  noAccessYet: string;
  docsAccessedLabel: (count: number) => string;
  accessOne: string;
  accessMany: string;
  csvHeaders: string[];
  csvFileName: string;
}> = {
  es: {
    title: 'Progreso',
    subtitle: 'Vista general del avance de lectura por usuario',
    exportCSV: 'Exportar CSV',
    activeUsers: 'Usuarios Activos',
    ofTotal: 'de',
    docsRead: 'Documentos Leidos',
    accessesRegistered: 'accesos registrados',
    avgProgress: 'Promedio General',
    advance: 'de avance',
    colUser: 'Usuario',
    colRole: 'Rol',
    colRead: 'Leidos',
    colProgress: 'Progreso',
    colLastAccess: 'Ultimo Acceso',
    emptyNoUsers: 'No hay usuarios registrados.',
    noAccessYet: 'Este usuario no ha accedido a ningun documento todavia.',
    docsAccessedLabel: (c) => `Documentos accedidos (${c})`,
    accessOne: 'acceso',
    accessMany: 'accesos',
    csvHeaders: ['Usuario', 'Rol', 'Documentos Leidos', 'Total Documentos', 'Porcentaje', 'Ultimo Acceso'],
    csvFileName: 'neomaaa-progreso',
  },
  ru: {
    title: 'Прогресс',
    subtitle: 'Общий обзор прогресса чтения по пользователям',
    exportCSV: 'Экспорт CSV',
    activeUsers: 'Активные пользователи',
    ofTotal: 'из',
    docsRead: 'Прочитано документов',
    accessesRegistered: 'зарегистрированных обращений',
    avgProgress: 'Средний прогресс',
    advance: 'прогресса',
    colUser: 'Пользователь',
    colRole: 'Роль',
    colRead: 'Прочитано',
    colProgress: 'Прогресс',
    colLastAccess: 'Последний вход',
    emptyNoUsers: 'Зарегистрированных пользователей нет.',
    noAccessYet: 'Этот пользователь ещё не открывал ни одного документа.',
    docsAccessedLabel: (c) => `Открытые документы (${c})`,
    accessOne: 'обращение',
    accessMany: 'обращений',
    csvHeaders: ['Пользователь', 'Роль', 'Прочитано документов', 'Всего документов', 'Процент', 'Последний вход'],
    csvFileName: 'neomaaa-progress',
  },
};

interface UserData {
  id: string;
  name: string;
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  lastLogin?: string;
}

interface ProgressData {
  userId: string;
  documentPath: string;
  firstAccessed: string;
  lastAccessed: string;
  accessCount: number;
  completed: boolean;
}

interface RoleData {
  id: string;
  name: string;
  nameRu?: string;
  sections: string[];
  isAdmin: boolean;
}

// Total document count per section (mirrors sections.ts)
const SECTION_DOC_COUNTS: Record<string, number> = {
  launch: 1,
  sales: 5,
  compliance: 5,
  support: 2,
  operations: 3,
  marketing: 4,
  hiring: 4,
  partners: 3,
  encyclopedia: 1,
};

const TOTAL_DOCUMENTS = 28;

const AVATAR_GRADIENTS = [
  'from-slate-600 to-slate-700',
  'from-zinc-600 to-zinc-700',
  'from-gray-600 to-gray-700',
  'from-neutral-600 to-neutral-700',
  'from-stone-600 to-stone-700',
  'from-slate-500 to-gray-700',
];

export default function ProgressPage() {
  const lang = useAdminLang();
  const { users, isLoading: loadingUsers } = useAdminUsers();
  const { roles } = useAdminRoles() as { roles: RoleData[] };
  const { progress, isLoading: loadingProgress } = useAdminProgress();
  const loading = loadingUsers || loadingProgress;
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const t = labels[lang];

  function getRoleName(roleId: string): string {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return roleId;
    return lang === 'ru' ? (role.nameRu || role.name) : role.name;
  }

  function isAdminRole(roleId: string): boolean {
    return roles.find((r) => r.id === roleId)?.isAdmin || false;
  }

  function getTotalDocsForRole(roleId: string): number {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return TOTAL_DOCUMENTS;
    if (role.sections.length === Object.keys(SECTION_DOC_COUNTS).length) {
      return TOTAL_DOCUMENTS;
    }
    return role.sections.reduce((sum, sid) => sum + (SECTION_DOC_COUNTS[sid] || 0), 0);
  }

  function getUserProgress(userId: string): ProgressData[] {
    return progress.filter((p) => p.userId === userId);
  }

  function formatDate(dateStr?: string): string {
    if (!dateStr) return '---';
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getProgressColor(pct: number): string {
    if (pct >= 75) return 'bg-gradient-to-r from-[#38CC97] to-[#2BA87A]';
    if (pct >= 40) return 'bg-gradient-to-r from-[#D4A03A] to-[#B8892F]';
    return 'bg-gradient-to-r from-[#C44545] to-[#A33838]';
  }

  function getProgressTextColor(pct: number): string {
    if (pct >= 75) return 'text-[#38CC97]';
    if (pct >= 40) return 'text-[#D4A03A]';
    return 'text-[#C44545]';
  }

  function handleExportCSV() {
    const headers = t.csvHeaders;
    const rows = users.map((user) => {
      const userProg = getUserProgress(user.id);
      const totalDocs = getTotalDocsForRole(user.roleId);
      const readCount = userProg.length;
      const pct = totalDocs > 0 ? Math.round((readCount / totalDocs) * 100) : 0;
      const lastActive = userProg.length > 0
        ? userProg.reduce((latest, p) =>
            new Date(p.lastAccessed) > new Date(latest.lastAccessed) ? p : latest
          ).lastAccessed
        : '';

      return [
        user.name,
        getRoleName(user.roleId),
        readCount.toString(),
        totalDocs.toString(),
        `${pct}%`,
        lastActive ? formatDate(lastActive) : '---',
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${t.csvFileName}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-32 bg-[#1A1A1A] rounded-lg mb-2" />
            <div className="h-4 w-64 bg-[#1A1A1A]/60 rounded-lg" />
          </div>
          <div className="h-10 w-32 bg-[#1A1A1A] rounded-lg" />
        </div>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
          <div className="h-10 bg-[#1A1A1A]/50" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-t border-[#1A1A1A]/30">
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A]/50" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 bg-[#1A1A1A]/40 rounded" />
                <div className="h-3 w-20 bg-[#1A1A1A]/30 rounded" />
              </div>
              <div className="h-5 w-16 bg-[#1A1A1A]/40 rounded-full" />
              <div className="w-32 h-2 bg-[#1A1A1A]/40 rounded-full" />
              <div className="h-4 w-10 bg-[#1A1A1A]/40 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate overall stats
  const totalReadDocs = users.reduce((sum, u) => sum + getUserProgress(u.id).length, 0);
  const avgProgress = users.length > 0
    ? Math.round(
        users.reduce((sum, u) => {
          const total = getTotalDocsForRole(u.roleId);
          const read = getUserProgress(u.id).length;
          return sum + (total > 0 ? (read / total) * 100 : 0);
        }, 0) / users.length
      )
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          <p className="text-[#666666] text-sm mt-1">
            {t.subtitle}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 bg-[#111111] border border-[#1E1E1E] text-[#A0A0A0] font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-[#1A1A1A]/50 hover:text-white hover:border-[#1E1E1E] transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {t.exportCSV}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
          <div className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-2">{t.activeUsers}</div>
          <div className="text-2xl font-bold text-white">{users.filter(u => u.isActive).length}</div>
          <div className="text-[#666666] text-xs mt-1">{t.ofTotal} {users.length}</div>
        </div>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
          <div className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-2">{t.docsRead}</div>
          <div className="text-2xl font-bold text-white">{totalReadDocs}</div>
          <div className="text-[#666666] text-xs mt-1">{t.accessesRegistered}</div>
        </div>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
          <div className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-2">{t.avgProgress}</div>
          <div className={`text-2xl font-bold ${getProgressTextColor(avgProgress)}`}>{avgProgress}%</div>
          <div className="text-[#666666] text-xs mt-1">{t.advance}</div>
        </div>
      </div>

      {/* Progress table */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A]">
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colUser}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colRole}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colRead}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3 min-w-[200px]">
                  {t.colProgress}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colLastAccess}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                      </svg>
                    </div>
                    <p className="text-[#666666] text-sm">{t.emptyNoUsers}</p>
                  </td>
                </tr>
              ) : (
                users.slice((page - 1) * pageSize, page * pageSize).map((user, idx) => {
                  const userProg = getUserProgress(user.id);
                  const totalDocs = getTotalDocsForRole(user.roleId);
                  const readCount = userProg.length;
                  const pct = totalDocs > 0 ? Math.round((readCount / totalDocs) * 100) : 0;
                  const isExpanded = expandedUser === user.id;
                  const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
                  const admin = isAdminRole(user.roleId);

                  const lastActive = userProg.length > 0
                    ? userProg.reduce((latest, p) =>
                        new Date(p.lastAccessed) > new Date(latest.lastAccessed) ? p : latest
                      ).lastAccessed
                    : undefined;

                  return (
                    <Fragment key={user.id}>
                      <tr
                        onClick={() =>
                          setExpandedUser(isExpanded ? null : user.id)
                        }
                        className={`border-t border-[#1A1A1A]/40 cursor-pointer ${
                          idx % 2 === 0 ? 'bg-[#111111]' : 'bg-[#111111]/50'
                        } hover:bg-[#1A1A1A]/30 transition-all duration-200`}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg`}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">{user.name}</div>
                              <div className="text-[#666666] text-xs">{user.id}</div>
                            </div>
                            {/* Expand indicator */}
                            <svg className={`w-4 h-4 text-[#666666] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            admin
                              ? 'bg-[#98283A]/15 text-[#98283A] border border-[#98283A]/20'
                              : 'bg-[#1A1A1A]/50 text-[#A0A0A0] border border-[#1E1E1E]/30'
                          }`}>
                            {getRoleName(user.roleId)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-white text-sm font-semibold">{readCount}</span>
                          <span className="text-[#666666] text-sm"> / {totalDocs}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-[#1A1A1A]/50 rounded-full h-2.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(pct)}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold min-w-[40px] text-right ${getProgressTextColor(pct)}`}>
                              {pct}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[#666666] text-sm">
                          {formatDate(lastActive)}
                        </td>
                      </tr>

                      {/* Expanded row -- document details */}
                      {isExpanded && (
                        <tr className="border-t border-[#1A1A1A]/30">
                          <td colSpan={5} className="px-4 py-5 bg-[#0A0A0A]/30">
                            {userProg.length === 0 ? (
                              <div className="text-center py-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-5 h-5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                </div>
                                <p className="text-[#666666] text-sm">
                                  {t.noAccessYet}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <div className="text-xs text-[#666666] font-medium uppercase tracking-wider mb-3">
                                  {t.docsAccessedLabel(userProg.length)}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {userProg
                                    .sort(
                                      (a, b) =>
                                        new Date(b.lastAccessed).getTime() -
                                        new Date(a.lastAccessed).getTime()
                                    )
                                    .map((p) => (
                                      <div
                                        key={p.documentPath}
                                        className="bg-[#111111] border border-[#1A1A1A]/40 rounded-lg px-3.5 py-3 hover:border-[#1E1E1E] transition-all duration-200"
                                      >
                                        <div className="flex items-start gap-2.5">
                                          <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                            p.completed
                                              ? 'bg-[#38CC97]/15 text-[#38CC97]'
                                              : 'bg-[#1A1A1A]/50 text-[#666666]'
                                          }`}>
                                            {p.completed ? (
                                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                              </svg>
                                            ) : (
                                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                              </svg>
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-white text-xs font-medium truncate">
                                              {p.documentPath}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5">
                                              <span className="text-[#666666] text-xs">
                                                {p.accessCount} {p.accessCount !== 1 ? t.accessMany : t.accessOne}
                                              </span>
                                              <span className="text-[#666666] text-xs">
                                                {formatDate(p.lastAccessed)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {users.length > pageSize && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#1A1A1A]/40 bg-[#0A0A0A]">
            <div className="text-xs text-[#666666]">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, users.length)} / {users.length}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ‹
              </button>
              <span className="text-xs text-[#A0A0A0] px-2">
                {page} / {Math.max(1, Math.ceil(users.length / pageSize))}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(Math.ceil(users.length / pageSize), p + 1))}
                disabled={page >= Math.ceil(users.length / pageSize)}
                className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
