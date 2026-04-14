'use client';

import { useMemo, useState } from 'react';
import {
  useAdminAnalytics,
  useAdminRoles,
  type AnalyticsRange,
} from '@/components/admin/useAdminData';
import {
  AdminKpi,
  AdminPageHeader,
  AdminSkeleton,
  AdminEmpty,
  btnSecondary,
} from '@/components/admin/AdminUI';
import { AdminTable, type AdminTableColumn } from '@/components/admin/AdminTable';
import type {
  TopDoc,
  LeastReadDoc,
  QuizStatEntry,
  UserRankingEntry,
  EngagementPoint,
  RoleCompletionEntry,
} from '@/lib/analytics';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function shortDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}

function downloadCsv(filename: string, rows: string[][]) {
  const content = rows
    .map((row) =>
      row
        .map((cell) => {
          const v = (cell ?? '').toString();
          // Always quote to keep commas/newlines safe
          return `"${v.replace(/"/g, '""')}"`;
        })
        .join(','),
    )
    .join('\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionCard({
  title,
  subtitle,
  children,
  tone = 'default',
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: 'default' | 'warning';
}) {
  const border =
    tone === 'warning' ? 'border-[#D4A03A]/30' : 'border-[#1E1E1E]';
  return (
    <div
      className={`bg-[#111111] border ${border} rounded-xl p-5 flex flex-col`}
    >
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <h2 className="text-white font-semibold text-sm tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#666666] text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

function TopDocsBarList({ docs }: { docs: TopDoc[] }) {
  if (!docs.length) {
    return <AdminEmpty title="Sin lecturas registradas" />;
  }
  const max = Math.max(...docs.map((d) => d.readCount), 1);
  return (
    <ul className="space-y-2.5">
      {docs.map((d, idx) => {
        const pct = Math.round((d.readCount / max) * 100);
        return (
          <li key={d.docPath} className="group">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-white text-xs font-medium truncate">
                <span className="text-[#666666] mr-2">{idx + 1}.</span>
                {d.title}
              </span>
              <span className="text-[#A0A0A0] text-xs font-semibold flex-shrink-0">
                {d.readCount}
              </span>
            </div>
            <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#98283A] to-[#B33347] rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-[#666666]">
              <span>{d.docPath}</span>
              <span>{d.completionRate}% completion</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function IgnoredDocsList({ docs }: { docs: LeastReadDoc[] }) {
  if (!docs.length) {
    return <AdminEmpty title="Todos los docs tienen lecturas" />;
  }
  return (
    <ul className="space-y-2">
      {docs.map((d) => (
        <li
          key={d.docPath}
          className="flex items-center justify-between gap-3 bg-[#0A0A0A] border border-[#D4A03A]/20 rounded-md px-3 py-2.5"
        >
          <div className="min-w-0">
            <div className="text-white text-xs font-medium truncate">
              {d.title}
            </div>
            <div className="text-[#666666] text-[10px] truncate mt-0.5">
              {d.docPath}
            </div>
          </div>
          <span className="text-[#D4A03A] text-xs font-bold flex-shrink-0">
            {d.readCount} lecturas
          </span>
        </li>
      ))}
    </ul>
  );
}

function QuizDifficultyList({ quizzes }: { quizzes: QuizStatEntry[] }) {
  if (!quizzes.length) {
    return <AdminEmpty title="Aun no hay quizzes rendidos" />;
  }
  const slice = quizzes.slice(0, 8);
  return (
    <ul className="space-y-2.5">
      {slice.map((q) => {
        const color =
          q.passRate >= 75
            ? 'bg-[#38CC97]'
            : q.passRate >= 50
              ? 'bg-[#D4A03A]'
              : 'bg-[#C44545]';
        return (
          <li key={q.docPath}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-white text-xs font-medium truncate">
                {q.title}
              </span>
              <span className="text-[#A0A0A0] text-xs font-semibold flex-shrink-0">
                {q.passRate}%
              </span>
            </div>
            <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${q.passRate}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-[#666666]">
              <span>
                {q.passes} aprobados / {q.attempts} intentos
              </span>
              <span>avg {q.avgScore}%</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CertTrendStat({
  engagement,
  totalCerts,
}: {
  engagement: EngagementPoint[];
  totalCerts: number;
}) {
  const now = Date.now();
  const week = now - 7 * 24 * 60 * 60 * 1000;
  const month = now - 30 * 24 * 60 * 60 * 1000;
  let weekCount = 0;
  let monthCount = 0;
  for (const e of engagement) {
    const t = new Date(e.date).getTime();
    if (isNaN(t)) continue;
    if (t >= week) weekCount += e.certsIssued;
    if (t >= month) monthCount += e.certsIssued;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-[#38CC97]">
          {weekCount}
        </span>
        <span className="text-[#666666] text-xs">esta semana</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{monthCount}</span>
        <span className="text-[#666666] text-xs">este mes</span>
      </div>
      <div className="pt-2 border-t border-[#1A1A1A]">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-[#A0A0A0]">
            {totalCerts}
          </span>
          <span className="text-[#666666] text-xs">total emitidos</span>
        </div>
      </div>
    </div>
  );
}

function RoleCompletionBars({ roles }: { roles: RoleCompletionEntry[] }) {
  if (!roles.length) {
    return <AdminEmpty title="Sin roles con usuarios" />;
  }
  return (
    <ul className="space-y-3">
      {roles.map((r) => (
        <li key={r.roleId}>
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="min-w-0">
              <span className="text-white text-sm font-medium">
                {r.roleName}
              </span>
              <span className="text-[#666666] text-xs ml-2">
                {r.userCount} {r.userCount === 1 ? 'usuario' : 'usuarios'}
              </span>
            </div>
            <span className="text-[#A0A0A0] text-xs font-bold flex-shrink-0">
              {r.avgCompletionPct}%
            </span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#98283A] to-[#B33347] rounded-full transition-all duration-500"
              style={{ width: `${r.avgCompletionPct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EngagementChart({ points }: { points: EngagementPoint[] }) {
  if (!points.length) {
    return <AdminEmpty title="Sin datos de engagement" />;
  }
  const maxLogins = Math.max(...points.map((p) => p.logins), 1);
  const maxReads = Math.max(...points.map((p) => p.docReads), 1);
  const max = Math.max(maxLogins, maxReads);

  return (
    <div>
      <div className="flex items-end gap-1 h-40 px-1">
        {points.map((p) => {
          const loginH = (p.logins / max) * 100;
          const readH = (p.docReads / max) * 100;
          return (
            <div
              key={p.date}
              className="flex-1 min-w-0 flex flex-col justify-end gap-0.5 group relative"
              title={`${p.date}\nLogins: ${p.logins}\nDoc reads: ${p.docReads}\nQuizzes: ${p.quizzesTaken}`}
            >
              <div
                className="w-full bg-[#98283A]/90 rounded-sm transition-all duration-150 group-hover:bg-[#B33347]"
                style={{ height: `${readH}%`, minHeight: p.docReads ? '2px' : '0' }}
              />
              <div
                className="w-full bg-[#38CC97]/80 rounded-sm transition-all duration-150 group-hover:bg-[#38CC97]"
                style={{ height: `${loginH}%`, minHeight: p.logins ? '2px' : '0' }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3 text-[10px] text-[#666666]">
        <span>{shortDate(points[0].date)}</span>
        <span>{shortDate(points[points.length - 1].date)}</span>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#98283A] rounded-sm" />
          <span className="text-[#A0A0A0]">Doc reads</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#38CC97] rounded-sm" />
          <span className="text-[#A0A0A0]">Logins</span>
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const RANGES: { id: AnalyticsRange; label: string }[] = [
  { id: '7d', label: '7 dias' },
  { id: '30d', label: '30 dias' },
  { id: '90d', label: '90 dias' },
];

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>('30d');
  const [roleFilter, setRoleFilter] = useState<string>('');

  const { roles } = useAdminRoles();
  const {
    analytics,
    isLoading,
    error,
  } = useAdminAnalytics(range, roleFilter || undefined);

  const overview = analytics?.overview;

  const handleExportCsv = () => {
    if (!analytics) return;
    const header = [
      'userId',
      'userName',
      'role',
      'docsCompleted',
      'certsEarned',
      'lastActive',
      'completionScore',
    ];
    const rows = analytics.userRanking.map((u) => [
      u.userId,
      u.userName,
      u.roleName,
      u.docsCompleted.toString(),
      u.certsEarned.toString(),
      u.lastActive ? formatDate(u.lastActive) : '',
      `${u.completionScore}%`,
    ]);
    const today = new Date().toISOString().slice(0, 10);
    downloadCsv(`neomaaa-analytics-${today}.csv`, [header, ...rows]);
  };

  // User ranking table config
  const rankingColumns: AdminTableColumn<UserRankingEntry>[] = useMemo(
    () => [
      {
        key: 'user',
        header: 'Usuario',
        render: (u) => (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#98283A]/20 text-[#98283A] flex items-center justify-center font-bold text-[11px] flex-shrink-0">
              {u.userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {u.userName}
              </div>
              <div className="text-[#666666] text-[11px] truncate">
                {u.userId}
              </div>
            </div>
          </div>
        ),
        sortValue: (u) => u.userName.toLowerCase(),
      },
      {
        key: 'role',
        header: 'Rol',
        render: (u) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1A1A] text-[#A0A0A0] border border-[#1E1E1E]">
            {u.roleName}
          </span>
        ),
      },
      {
        key: 'docs',
        header: 'Docs',
        render: (u) => (
          <span className="text-white font-semibold text-sm">
            {u.docsCompleted}
          </span>
        ),
      },
      {
        key: 'certs',
        header: 'Certs',
        render: (u) => (
          <span className="text-[#38CC97] font-semibold text-sm">
            {u.certsEarned}
          </span>
        ),
      },
      {
        key: 'lastActive',
        header: 'Ultimo',
        render: (u) => (
          <span className="text-[#A0A0A0] text-xs">
            {formatDate(u.lastActive)}
          </span>
        ),
      },
      {
        key: 'score',
        header: 'Completion',
        render: (u) => {
          const color =
            u.completionScore >= 75
              ? 'from-[#38CC97] to-[#2BA87A]'
              : u.completionScore >= 40
                ? 'from-[#D4A03A] to-[#B8892F]'
                : 'from-[#C44545] to-[#A33838]';
          return (
            <div className="flex items-center gap-2 min-w-[140px]">
              <div className="flex-1 bg-[#1A1A1A] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${color}`}
                  style={{ width: `${u.completionScore}%` }}
                />
              </div>
              <span className="text-white text-xs font-bold w-9 text-right">
                {u.completionScore}%
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );

  // ---------------- Render ----------------

  if (error) {
    return (
      <div>
        <AdminPageHeader title="Analytics" subtitle="Portal insights" />
        <AdminEmpty
          title="Error al cargar analiticas"
          hint="Revisa la consola o reintenta en un momento."
        />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        subtitle="Visibilidad del portal — usuarios, docs, quizzes y certificados"
        actions={
          <button onClick={handleExportCsv} disabled={!analytics} className={btnSecondary}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export CSV
          </button>
        }
      />

      {/* Filters bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="inline-flex bg-[#111111] border border-[#1E1E1E] rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                range === r.id
                  ? 'bg-[#98283A] text-white'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-[#111111] border border-[#1E1E1E] text-white rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#98283A]/50"
        >
          <option value="">Todos los roles</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {isLoading && (
          <span className="text-[10px] text-[#666666] uppercase tracking-wider">
            Actualizando...
          </span>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {!overview || isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <AdminSkeleton key={i} className="h-28" />
          ))
        ) : (
          <>
            <AdminKpi label="Total Users" value={overview.totalUsers} />
            <AdminKpi
              label="Activos 7d"
              value={overview.activeUsers}
              accent="green"
              hint="con login reciente"
            />
            <AdminKpi
              label="Docs Completados"
              value={overview.docsCompleted}
              hint="marcados como leidos"
            />
            <AdminKpi
              label="Certificados"
              value={overview.certsIssued}
              accent="burgundy"
            />
            <AdminKpi
              label="Avg Completion"
              value={`${overview.avgCompletionRate}%`}
              accent={
                overview.avgCompletionRate >= 75
                  ? 'green'
                  : overview.avgCompletionRate >= 40
                    ? 'amber'
                    : 'red'
              }
              hint={`quiz pass rate ${overview.avgQuizPassRate}%`}
            />
          </>
        )}
      </div>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <SectionCard
          title="Top 10 Docs Leidos"
          subtitle="Mas accedidos en el rango"
        >
          {!analytics || isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <AdminSkeleton key={i} className="h-8" />
              ))}
            </div>
          ) : (
            <TopDocsBarList docs={analytics.topDocs} />
          )}
        </SectionCard>

        <SectionCard
          title="Docs Ignorados"
          subtitle="Bottom 5 — posibles gaps de training"
          tone="warning"
        >
          {!analytics || isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <AdminSkeleton key={i} className="h-12" />
              ))}
            </div>
          ) : (
            <IgnoredDocsList docs={analytics.leastReadDocs} />
          )}
        </SectionCard>

        <SectionCard
          title="Quizzes Dificiles"
          subtitle="Ordenados por pass rate ascendente"
        >
          {!analytics || isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <AdminSkeleton key={i} className="h-8" />
              ))}
            </div>
          ) : (
            <QuizDifficultyList quizzes={analytics.quizStats} />
          )}
        </SectionCard>

        <SectionCard
          title="Tendencia de Certificados"
          subtitle="Emision reciente"
        >
          {!analytics || isLoading ? (
            <AdminSkeleton className="h-32" />
          ) : (
            <CertTrendStat
              engagement={analytics.engagementOverTime}
              totalCerts={analytics.overview.certsIssued}
            />
          )}
        </SectionCard>
      </div>

      {/* Role completion */}
      <SectionCard
        title="Completion por Rol"
        subtitle="Promedio del equipo sobre docs asignados"
      >
        {!analytics || isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <AdminSkeleton key={i} className="h-10" />
            ))}
          </div>
        ) : (
          <RoleCompletionBars roles={analytics.roleCompletion} />
        )}
      </SectionCard>

      <div className="mt-6">
        <SectionCard
          title={`Engagement (${range})`}
          subtitle="Doc reads + logins por dia"
        >
          {!analytics || isLoading ? (
            <AdminSkeleton className="h-48" />
          ) : (
            <EngagementChart points={analytics.engagementOverTime} />
          )}
        </SectionCard>
      </div>

      {/* User ranking */}
      <div className="mt-6">
        <h2 className="text-base font-semibold text-white mb-3">
          Ranking de Usuarios
        </h2>
        <AdminTable
          columns={rankingColumns}
          data={analytics?.userRanking ?? []}
          rowKey={(u) => u.userId}
          loading={isLoading}
          searchable={{
            placeholder: 'Buscar usuario o rol...',
            fields: (u) => [u.userName, u.userId, u.roleName],
          }}
          pageSize={20}
          emptyTitle="Sin usuarios"
          emptyHint="Ajusta el filtro de rol o rango."
        />
      </div>

      {analytics?.generatedAt && (
        <p className="text-[10px] text-[#666666] mt-6 text-right">
          Generado: {new Date(analytics.generatedAt).toLocaleString('es-ES')}
        </p>
      )}
    </div>
  );
}
