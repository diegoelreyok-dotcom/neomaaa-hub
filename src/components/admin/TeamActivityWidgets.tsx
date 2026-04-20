'use client';

import { useMemo } from 'react';
import type { Lang } from '@/lib/types';
import type { AdminUser, AdminRole, AdminProgress } from './fetcher';
import { AdminCard } from './AdminCard';
import { AdminBadge } from './AdminUI';

const AVATAR_GRADIENTS = [
  'from-slate-600 to-slate-700',
  'from-zinc-600 to-zinc-700',
  'from-gray-600 to-gray-700',
  'from-neutral-600 to-neutral-700',
  'from-stone-600 to-stone-700',
];

type TeamActivityLabels = {
  sectionTitle: string;
  sectionSubtitle: string;
  recentSignIns: string;
  recentSignInsHint: string;
  stuckUsers: string;
  stuckUsersHint: string;
  completionsWeek: string;
  completionsWeekHint: string;
  activeNow: string;
  neverLoggedIn: string;
  noStuck: string;
  noRecent: string;
  daysAgo: (n: number) => string;
  hoursAgo: (n: number) => string;
  minutesAgo: (n: number) => string;
  justNow: string;
  completionsThisWeek: string;
  perDay: string;
};

export const TEAM_ACTIVITY_LABELS: Record<Lang, TeamActivityLabels> = {
  es: {
    sectionTitle: 'Actividad del equipo',
    sectionSubtitle: 'Quien esta dentro, quien esta atascado, que se esta completando',
    recentSignIns: 'Ingresos recientes',
    recentSignInsHint: 'Ultimos 10 inicios de sesion',
    stuckUsers: 'Usuarios atascados',
    stuckUsersHint: '3+ dias sin entrar',
    completionsWeek: 'Completados (7d)',
    completionsWeekHint: 'Modulos terminados esta semana',
    activeNow: 'activo',
    neverLoggedIn: 'Nunca ha entrado',
    noStuck: 'Ningun usuario atascado. Todo al dia.',
    noRecent: 'Aun no hay ingresos registrados.',
    daysAgo: (n) => `hace ${n} ${n === 1 ? 'dia' : 'dias'}`,
    hoursAgo: (n) => `hace ${n} h`,
    minutesAgo: (n) => `hace ${n} min`,
    justNow: 'ahora',
    completionsThisWeek: 'esta semana',
    perDay: 'por dia',
  },
  ru: {
    sectionTitle: 'Активность команды',
    sectionSubtitle: 'Кто внутри, кто застрял, что завершается',
    recentSignIns: 'Недавние входы',
    recentSignInsHint: 'Последние 10 входов',
    stuckUsers: 'Застрявшие пользователи',
    stuckUsersHint: '3+ дня без входа',
    completionsWeek: 'Завершено (7д)',
    completionsWeekHint: 'Модулей завершено на этой неделе',
    activeNow: 'активен',
    neverLoggedIn: 'Никогда не заходил',
    noStuck: 'Никто не застрял. Все в порядке.',
    noRecent: 'Входов пока нет.',
    daysAgo: (n) => `${n} ${n === 1 ? 'день' : 'дн.'} назад`,
    hoursAgo: (n) => `${n} ч назад`,
    minutesAgo: (n) => `${n} мин назад`,
    justNow: 'сейчас',
    completionsThisWeek: 'на этой неделе',
    perDay: 'в день',
  },
  en: {
    sectionTitle: 'Team activity',
    sectionSubtitle: 'Who is in, who is stuck, what is getting done',
    recentSignIns: 'Recent sign-ins',
    recentSignInsHint: 'Last 10 logins',
    stuckUsers: 'Stuck users',
    stuckUsersHint: '3+ days idle',
    completionsWeek: 'Completions (7d)',
    completionsWeekHint: 'Modules finished this week',
    activeNow: 'active',
    neverLoggedIn: 'Never logged in',
    noStuck: 'No stuck users. All caught up.',
    noRecent: 'No sign-ins recorded yet.',
    daysAgo: (n) => `${n}d ago`,
    hoursAgo: (n) => `${n}h ago`,
    minutesAgo: (n) => `${n}m ago`,
    justNow: 'just now',
    completionsThisWeek: 'this week',
    perDay: 'per day',
  },
};

function timeAgo(iso: string | undefined, t: TeamActivityLabels): string {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return '—';
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return t.justNow;
  if (mins < 60) return t.minutesAgo(mins);
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t.hoursAgo(hours);
  const days = Math.floor(hours / 24);
  return t.daysAgo(days);
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface Props {
  lang: Lang;
  users: AdminUser[];
  roles: AdminRole[];
  progress: AdminProgress[];
}

export default function TeamActivityWidgets({ lang, users, roles, progress }: Props) {
  const t = TEAM_ACTIVITY_LABELS[lang];

  const adminRoleIds = useMemo(
    () => new Set(roles.filter((r) => r.isAdmin).map((r) => r.id)),
    [roles]
  );

  function roleName(roleId: string): string {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return roleId;
    return lang === 'ru' ? role.nameRu || role.name : role.name;
  }

  // Widget A — recent sign-ins (top 10 by lastLogin desc, only users with a lastLogin)
  const recentSignIns = useMemo(() => {
    return users
      .filter((u) => !!u.lastLogin)
      .sort((a, b) => (b.lastLogin || '').localeCompare(a.lastLogin || ''))
      .slice(0, 10);
  }, [users]);

  // Widget B — stuck users: idle 3+ days OR never logged in. Exclude admins.
  const stuckUsers = useMemo(() => {
    const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return users
      .filter((u) => u.isActive && !adminRoleIds.has(u.roleId))
      .filter((u) => {
        if (!u.lastLogin) return true;
        const then = new Date(u.lastLogin).getTime();
        if (!Number.isFinite(then)) return true;
        return now - then >= THREE_DAYS_MS;
      })
      .sort((a, b) => {
        // Never-logged-in first (oldest first), then by oldest lastLogin
        if (!a.lastLogin && !b.lastLogin) return 0;
        if (!a.lastLogin) return -1;
        if (!b.lastLogin) return 1;
        return (a.lastLogin || '').localeCompare(b.lastLogin || '');
      })
      .slice(0, 10);
  }, [users, adminRoleIds]);

  // Widget C — completions in last 7 days + daily sparkline
  const { completionsCount, completionsSeries } = useMemo(() => {
    const now = new Date();
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const cutoff = todayMid.getTime() - 6 * 24 * 60 * 60 * 1000; // start of 7d window (inclusive today)

    const series = new Array(7).fill(0);
    const byDay = new Map<string, number>();

    let count = 0;
    for (const p of progress) {
      if (!p.completed) continue;
      const ts = p.lastAccessed;
      if (!ts) continue;
      const then = new Date(ts).getTime();
      if (!Number.isFinite(then)) continue;
      if (then < cutoff) continue;
      count += 1;
      const d = new Date(ts);
      const k = dateKey(d);
      byDay.set(k, (byDay.get(k) || 0) + 1);
    }
    for (let i = 0; i < 7; i++) {
      const d = new Date(todayMid);
      d.setDate(todayMid.getDate() - (6 - i));
      series[i] = byDay.get(dateKey(d)) || 0;
    }
    return { completionsCount: count, completionsSeries: series };
  }, [progress]);

  return (
    <div>
      <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.12em] mb-1">
        {t.sectionTitle}
      </h2>
      <p className="text-[#6B7280] text-xs mb-4">{t.sectionSubtitle}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Widget A — Recent sign-ins */}
        <AdminCard accent="burgundy" padding="md">
          <div className="mb-3">
            <h3 className="text-white text-sm font-semibold">{t.recentSignIns}</h3>
            <p className="text-[#6B7280] text-xs mt-0.5">{t.recentSignInsHint}</p>
          </div>
          {recentSignIns.length === 0 ? (
            <p className="text-[#6B7280] text-xs py-4 text-center">{t.noRecent}</p>
          ) : (
            <ul className="space-y-2">
              {recentSignIns.map((u, idx) => {
                const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
                const isActive =
                  !!u.lastLogin &&
                  Date.now() - new Date(u.lastLogin).getTime() < 24 * 60 * 60 * 1000;
                return (
                  <li
                    key={u.id}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white/90 font-bold text-[10px] flex-shrink-0`}
                    >
                      {initials(u.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white text-[13px] font-medium truncate">
                          {u.name}
                        </span>
                        {isActive && (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#C94A5C]"
                            title={t.activeNow}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{
                                background: '#C94A5C',
                                boxShadow: '0 0 6px rgba(201,74,92,0.8)',
                              }}
                            />
                            {t.activeNow}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#6B7280] truncate">
                        {roleName(u.roleId)}
                      </div>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] tabular-nums flex-shrink-0">
                      {timeAgo(u.lastLogin, t)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </AdminCard>

        {/* Widget B — Stuck users */}
        <AdminCard accent="amber" padding="md">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-white text-sm font-semibold">{t.stuckUsers}</h3>
              <p className="text-[#6B7280] text-xs mt-0.5">{t.stuckUsersHint}</p>
            </div>
            {stuckUsers.length > 0 && (
              <AdminBadge variant="amber">{stuckUsers.length}</AdminBadge>
            )}
          </div>
          {stuckUsers.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-[#6B7280] text-xs">{t.noStuck}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {stuckUsers.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                    style={{
                      background: 'rgba(251,191,36,0.1)',
                      border: '1px solid rgba(251,191,36,0.3)',
                      color: '#FBBF24',
                    }}
                  >
                    {initials(u.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-[13px] font-medium truncate">
                      {u.name}
                    </div>
                    <div className="text-[10px] text-[#6B7280] truncate">
                      {roleName(u.roleId)}
                    </div>
                  </div>
                  <div className="text-[10px] flex-shrink-0 text-right">
                    {u.lastLogin ? (
                      <span className="text-[#FBBF24] tabular-nums">
                        {timeAgo(u.lastLogin, t)}
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider"
                        style={{
                          background: 'rgba(201,74,92,0.12)',
                          border: '1px solid rgba(201,74,92,0.3)',
                          color: '#C94A5C',
                        }}
                      >
                        {t.neverLoggedIn}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        {/* Widget C — Completions this week */}
        <AdminCard accent="burgundy" padding="md">
          <div className="mb-3">
            <h3 className="text-white text-sm font-semibold">{t.completionsWeek}</h3>
            <p className="text-[#6B7280] text-xs mt-0.5">{t.completionsWeekHint}</p>
          </div>
          <div className="flex items-end gap-4 mt-2">
            <div>
              <div
                className="text-4xl font-black tabular-nums leading-none"
                style={{ color: '#C94A5C' }}
              >
                {completionsCount}
              </div>
              <div className="text-[10px] text-[#6B7280] uppercase tracking-[0.12em] mt-1.5">
                {t.completionsThisWeek}
              </div>
            </div>
            <div className="flex-1">
              <Sparkline series={completionsSeries} />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

/** Simple burgundy bar sparkline for 7 daily buckets. */
function Sparkline({ series }: { series: number[] }) {
  const max = Math.max(1, ...series);
  return (
    <div className="flex items-end justify-between gap-1 h-12">
      {series.map((v, i) => {
        const h = Math.max(2, Math.round((v / max) * 44));
        const isToday = i === series.length - 1;
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}px`,
              background: isToday
                ? 'linear-gradient(to top, #C94A5C, #B33347)'
                : 'linear-gradient(to top, rgba(201,74,92,0.55), rgba(152,40,58,0.35))',
              boxShadow: isToday
                ? '0 0 8px rgba(201,74,92,0.5)'
                : undefined,
              minHeight: 2,
            }}
            title={`${v}`}
          />
        );
      })}
    </div>
  );
}
