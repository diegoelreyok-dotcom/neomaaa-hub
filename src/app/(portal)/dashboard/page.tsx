import { auth } from '@/lib/auth';
import { getRole, getUserProgress, getAllProgress, getAllUsers } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import { LEARNING_PATHS, computePathState } from '@/lib/learning-paths';
import { getAllCertificates } from '@/lib/quiz-storage';
import type { Lang, Role, ReadProgress, User } from '@/lib/types';
import { SECTIONS, getSectionById, getDocByPath } from '@/lib/sections';
import DashboardProgress from './DashboardProgress';
import LearningPathCard from './LearningPathCard';
import HeroSection from './HeroSection';
import KpiCard from './KpiCard';
import QuickActions from './QuickActions';
import ActivityHeatmap from './ActivityHeatmap';
import ActivityFeed, { type ActivityEvent } from './ActivityFeed';
import DashboardStagger, { StaggerItem } from './DashboardStagger';
import MeshGradientBackground from './MeshGradientBackground';

// Target go-live date — update as schedule firms up.
const LAUNCH_DATE_ISO = '2026-05-31T00:00:00Z';

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

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Build N-length series of daily event counts, oldest → newest.
 * Each iso timestamp in `timestamps` contributes 1 to its bucket.
 */
function buildDailySeries(timestamps: string[], days: number): number[] {
  const series = new Array(days).fill(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const byDay = new Map<string, number>();
  for (const iso of timestamps) {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) continue;
    const k = dateKey(d);
    byDay.set(k, (byDay.get(k) || 0) + 1);
  }
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    series[i] = byDay.get(dateKey(d)) || 0;
  }
  return series;
}

function trendFromSeries(series: number[]): { label: string; direction: 'up' | 'down' | 'flat' } {
  if (series.length < 2) return { label: '', direction: 'flat' };
  const half = Math.floor(series.length / 2);
  const firstHalf = series.slice(0, half).reduce((a, b) => a + b, 0);
  const secondHalf = series.slice(half).reduce((a, b) => a + b, 0);
  if (firstHalf === 0 && secondHalf === 0) return { label: '', direction: 'flat' };
  if (firstHalf === 0) return { label: 'new', direction: 'up' };
  const pct = Math.round(((secondHalf - firstHalf) / firstHalf) * 100);
  if (pct > 5) return { label: `${pct}%`, direction: 'up' };
  if (pct < -5) return { label: `${pct}%`, direction: 'down' };
  return { label: '0%', direction: 'flat' };
}

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user as any;
  const lang: Lang = user?.lang || 'es';
  const userName: string = user?.name || user?.userId || '';
  const userId: string = user?.userId || '';
  const roleId: string = user?.roleId || 'admin';
  const isAdmin: boolean = user?.isAdmin || false;
  const extraSections: string[] = Array.isArray(user?.extraSections) ? user.extraSections : [];

  let role = await getRole(roleId);
  if (!role) {
    role = FALLBACK_ROLES[roleId] || (isAdmin ? FALLBACK_ROLES['admin'] : FALLBACK_ROLES['sales']);
  }
  const visibleSections = getVisibleSections(role, extraSections);
  const totalDocs = visibleSections.reduce((sum, s) => sum + s.documents.length, 0);
  const totalSections = visibleSections.length;

  // Data for KPIs, heatmap, feed
  let certsCount = 0;
  let pathPercent = 0;
  let userProgress: ReadProgress[] = [];
  let allProgress: ReadProgress[] = [];
  let allUsers: User[] = [];

  if (userId) {
    try {
      const [certs, ownProgress, globalProgress, users] = await Promise.all([
        getAllCertificates(userId),
        getUserProgress(userId),
        getAllProgress(),
        getAllUsers(),
      ]);
      certsCount = Array.isArray(certs) ? certs.length : 0;
      userProgress = ownProgress;
      allProgress = globalProgress;
      allUsers = users;

      const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];
      if (path) {
        const completedSet = new Set<string>(
          ownProgress.filter((p) => p.completed).map((p) => p.documentPath.replace(/\.md$/, ''))
        );
        pathPercent = computePathState(path, completedSet).percent;
      }
    } catch {
      // Silently degrade
    }
  }

  // Sparkline series (last 14 days) per KPI
  const userAccessTs = userProgress.map((p) => p.lastAccessed || p.firstAccessed).filter(Boolean);
  const userCompletedTs = userProgress.filter((p) => p.completed).map((p) => p.lastAccessed).filter(Boolean);

  const accessSeries = buildDailySeries(userAccessTs, 14);
  const completedSeries = buildDailySeries(userCompletedTs, 14);
  // Cumulative version for pathPercent (monotonic upward series)
  const cumPathSeries = completedSeries.reduce<number[]>((acc, v, i) => {
    const prev = i === 0 ? 0 : acc[i - 1];
    acc.push(prev + v);
    return acc;
  }, []);
  // Sections: synthetic flat-ish series of user's sections usage (count unique sections touched daily)
  const sectionsSeries = buildDailySeries(userAccessTs, 14);

  const accessTrend = trendFromSeries(accessSeries);
  const completedTrend = trendFromSeries(completedSeries);

  // Heatmap dates: every time the user touched a doc
  const heatmapDates = userAccessTs;

  // Activity feed: take last 15 events across all users, resolve names + doc titles
  const userMap = new Map<string, User>();
  for (const u of allUsers) userMap.set(u.id, u);

  const events: ActivityEvent[] = allProgress
    .filter((p) => !!p.lastAccessed)
    .sort((a, b) => (b.lastAccessed || '').localeCompare(a.lastAccessed || ''))
    .slice(0, 15)
    .map((p) => {
      const u = userMap.get(p.userId);
      const displayName = u?.name || p.userId;
      const docPath = p.documentPath.replace(/\.md$/, '');
      const [sectionId, slug] = docPath.split('/', 2);
      const section = sectionId ? getSectionById(sectionId) : null;
      const doc = sectionId && slug ? getDocByPath(sectionId, slug) : null;
      const docTitle =
        doc
          ? (lang === 'ru' ? doc.titleRu : lang === 'en' ? (doc.titleEn || doc.titleEs) : doc.titleEs)
          : docPath;
      const sectionName =
        section
          ? (lang === 'ru' ? section.nameRu : lang === 'en' ? (section.nameEn || section.nameEs) : section.nameEs)
          : sectionId || '';
      return {
        userName: displayName,
        userInitials: initialsFrom(displayName),
        action: p.completed ? ('completed' as const) : ('accessed' as const),
        docTitle,
        sectionName,
        timestamp: p.lastAccessed || p.firstAccessed,
        href: sectionId && slug ? `/content/${sectionId}/${slug}` : undefined,
      };
    });

  const roleName =
    lang === 'ru' ? role.nameRu || role.name : lang === 'en' ? role.name : role.name;

  // KPI icons
  const iconSections = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
  const iconDocs = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
  const iconCerts = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
  const iconPath = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const labelSections = lang === 'ru' ? 'Разделов' : lang === 'en' ? 'Sections' : 'Secciones';
  const labelDocs = lang === 'ru' ? 'Документов' : lang === 'en' ? 'Documents' : 'Documentos';
  const labelCerts = lang === 'ru' ? 'Сертификаты' : lang === 'en' ? 'Certificates' : 'Certificados';
  const labelPath = lang === 'ru' ? 'Мой путь' : lang === 'en' ? 'My Path' : 'Mi Ruta';

  return (
    <>
      <MeshGradientBackground />

      <DashboardStagger>
        <StaggerItem>
          <HeroSection
            userName={userName}
            roleName={roleName}
            lang={lang}
            launchDateIso={LAUNCH_DATE_ISO}
          />
        </StaggerItem>

        {/* KPI cards with sparklines */}
        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <KpiCard
              value={totalSections}
              suffix={`/${SECTIONS.length}`}
              label={labelSections}
              color="primary"
              icon={iconSections}
              trendData={sectionsSeries}
            />
            <KpiCard
              value={totalDocs}
              label={labelDocs}
              color="blue"
              icon={iconDocs}
              trendData={accessSeries}
              trendLabel={accessTrend.label}
              trendDirection={accessTrend.direction}
            />
            <KpiCard
              value={certsCount}
              label={labelCerts}
              color="amber"
              icon={iconCerts}
              trendData={completedSeries}
              trendLabel={completedTrend.label}
              trendDirection={completedTrend.direction}
            />
            <KpiCard
              value={pathPercent}
              suffix="%"
              label={labelPath}
              color="burgundy"
              icon={iconPath}
              trendData={cumPathSeries}
              trendDirection={pathPercent > 0 ? 'up' : 'flat'}
            />
          </div>
        </StaggerItem>

        {/* Learning path promoted — right after KPIs */}
        {userId && (
          <StaggerItem>
            <div className="mb-6">
              <LearningPathCard userId={userId} roleId={roleId} lang={lang} />
            </div>
          </StaggerItem>
        )}

        {/* Heatmap + Activity feed side by side */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-4 mb-6">
            <ActivityHeatmap activityDates={heatmapDates} lang={lang} />
            <ActivityFeed events={events} lang={lang} />
          </div>
        </StaggerItem>

        <StaggerItem>
          <QuickActions lang={lang} />
        </StaggerItem>

        <StaggerItem>
          <div className="mb-8">
            <DashboardProgress totalDocs={totalDocs} lang={lang} />
          </div>
        </StaggerItem>
      </DashboardStagger>
    </>
  );
}
