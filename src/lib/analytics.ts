/**
 * Analytics helper — computes portal usage metrics from KV data.
 *
 * Reads:
 *   - user:*        → users
 *   - role:*        → roles (to map sections to docs)
 *   - progress:*    → read progress (accessCount, completed, dates)
 *   - cert:*        → certificates (score, issuedAt, attempts)
 *
 * Intended for admin analytics dashboard only. Results are memoized with a
 * short TTL (60s) so repeat hits within the minute are O(1).
 */

import type { User, Role, ReadProgress } from './types';
import type { Certificate } from './quiz-types';
import { SECTIONS, getAllDocs } from './sections';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AnalyticsOverview {
  totalUsers: number;
  activeUsers: number;
  docsCompleted: number;
  certsIssued: number;
  avgCompletionRate: number;
  avgQuizPassRate: number;
}

export interface TopDoc {
  docPath: string;
  title: string;
  readCount: number;
  completionRate: number;
}

export interface LeastReadDoc {
  docPath: string;
  title: string;
  readCount: number;
}

export interface QuizStatEntry {
  docPath: string;
  title: string;
  attempts: number;
  passes: number;
  avgScore: number;
  passRate: number;
}

export interface UserRankingEntry {
  userId: string;
  userName: string;
  roleId: string;
  roleName: string;
  docsCompleted: number;
  certsEarned: number;
  lastActive: string;
  completionScore: number;
}

export interface EngagementPoint {
  date: string;
  logins: number;
  docReads: number;
  quizzesTaken: number;
  certsIssued: number;
}

export interface RoleCompletionEntry {
  roleId: string;
  roleName: string;
  userCount: number;
  avgCompletionPct: number;
}

export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  topDocs: TopDoc[];
  leastReadDocs: LeastReadDoc[];
  quizStats: QuizStatEntry[];
  userRanking: UserRankingEntry[];
  engagementOverTime: EngagementPoint[];
  roleCompletion: RoleCompletionEntry[];
  generatedAt: string;
}

export interface AnalyticsFilters {
  days?: number; // restrict engagement chart window (default 30)
  roleId?: string;
  sectionId?: string;
}

// ---------------------------------------------------------------------------
// KV accessors (direct, to avoid duplicate network round-trips)
// ---------------------------------------------------------------------------

const memStore: Record<string, string> = {};

async function kvGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get<T>(key);
    return val ?? null;
  } catch {
    const raw = memStore[key];
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as T;
    }
  }
}

async function kvKeys(pattern: string): Promise<string[]> {
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.keys(pattern);
  } catch {
    const prefix = pattern.replace('*', '');
    return Object.keys(memStore).filter((k) => k.startsWith(prefix));
  }
}

async function fetchAll<T>(pattern: string): Promise<T[]> {
  const keys = await kvKeys(pattern);
  if (keys.length === 0) return [];
  const out: T[] = [];
  // Batched awaits (Promise.all) — KV client is async; 50-item chunks keep us safe
  const CHUNK = 50;
  for (let i = 0; i < keys.length; i += CHUNK) {
    const slice = keys.slice(i, i + CHUNK);
    const results = await Promise.all(slice.map((k) => kvGet<T>(k)));
    for (const r of results) {
      if (r) out.push(r);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// In-memory cache (per-runtime). On Vercel, each lambda instance caches
// independently — fine for our scale. TTL = 60s.
// ---------------------------------------------------------------------------

const ANALYTICS_TTL_MS = 60_000;
let cache: { data: AnalyticsResponse; expiresAt: number; filterKey: string } | null = null;

function filterCacheKey(f?: AnalyticsFilters): string {
  if (!f) return 'default';
  return `${f.days ?? 30}|${f.roleId ?? ''}|${f.sectionId ?? ''}`;
}

// ---------------------------------------------------------------------------
// Main entrypoint
// ---------------------------------------------------------------------------

export async function computeAnalytics(
  filters?: AnalyticsFilters
): Promise<AnalyticsResponse> {
  const key = filterCacheKey(filters);
  const now = Date.now();
  if (cache && cache.filterKey === key && cache.expiresAt > now) {
    return cache.data;
  }

  const days = filters?.days && filters.days > 0 ? filters.days : 30;

  // Fire all reads in parallel
  const [users, roles, progress, certs] = await Promise.all([
    fetchAll<User>('user:*'),
    fetchAll<Role>('role:*'),
    fetchAll<ReadProgress>('progress:*'),
    fetchAll<Certificate>('cert:*').then((list) =>
      // cert_index:* keys exist too but fetchAll of cert:* only matches the
      // primary cert records; index entries are under cert_index:*.
      list.filter((c) => c && typeof c === 'object' && 'userId' in c)
    ),
  ]);

  const allDocs = getAllDocs();
  const docTitleByPath: Record<string, string> = {};
  const docSectionByPath: Record<string, string> = {};
  for (const { section, doc } of allDocs) {
    const path = doc.filePath.replace(/\.md$/, '');
    docTitleByPath[path] = doc.titleEs;
    docSectionByPath[path] = section.id;
  }

  // --- Apply role/section filters if present ---
  let scopedUsers = users;
  if (filters?.roleId) {
    scopedUsers = users.filter((u) => u.roleId === filters.roleId);
  }

  let scopedProgress = progress;
  let scopedCerts = certs;
  if (filters?.sectionId) {
    const inSection = (p: string) => docSectionByPath[p] === filters.sectionId;
    scopedProgress = progress.filter((p) => inSection(p.documentPath));
    scopedCerts = certs.filter((c) => inSection(c.docPath));
  }
  // Restrict progress/certs to scoped users (if role filter was applied)
  if (filters?.roleId) {
    const uids = new Set(scopedUsers.map((u) => u.id));
    scopedProgress = scopedProgress.filter((p) => uids.has(p.userId));
    scopedCerts = scopedCerts.filter((c) => uids.has(c.userId));
  }

  // Role map (id → role)
  const roleById: Record<string, Role> = {};
  for (const r of roles) roleById[r.id] = r;

  // Section doc counts — how many docs live in each section
  const sectionDocCounts: Record<string, number> = {};
  for (const s of SECTIONS) {
    sectionDocCounts[s.id] = s.documents.length;
  }
  const TOTAL_DOCS = SECTIONS.reduce((sum, s) => sum + s.documents.length, 0);

  // Allowed-doc-count per role (sum of docs across assigned sections)
  function docsForRole(roleId: string): number {
    const role = roleById[roleId];
    if (!role) return TOTAL_DOCS;
    return role.sections.reduce(
      (sum, sid) => sum + (sectionDocCounts[sid] ?? 0),
      0
    );
  }

  // ---------------------------------------------------------------------------
  // Overview
  // ---------------------------------------------------------------------------
  const nowMs = Date.now();
  const sevenDaysAgo = nowMs - 7 * 24 * 60 * 60 * 1000;
  const activeUsers = scopedUsers.filter((u) => {
    if (!u.lastLogin) return false;
    const t = new Date(u.lastLogin).getTime();
    return !isNaN(t) && t >= sevenDaysAgo;
  }).length;

  const docsCompletedTotal = scopedProgress.filter((p) => p.completed).length;
  const certsIssued = scopedCerts.length;

  // Avg completion rate = per user → (docs completed / docs allowed by role)
  let avgCompletionRate = 0;
  if (scopedUsers.length > 0) {
    const perUserPct = scopedUsers.map((u) => {
      const total = docsForRole(u.roleId) || TOTAL_DOCS;
      const done = scopedProgress.filter(
        (p) => p.userId === u.id && p.completed
      ).length;
      return total > 0 ? (done / total) * 100 : 0;
    });
    avgCompletionRate = Math.round(
      perUserPct.reduce((a, b) => a + b, 0) / perUserPct.length
    );
  }

  // Quiz pass rate = passes / total attempts. Attempts ≈ sum of cert.attempts
  // (each cert's `attempts` records how many tries it took). Since only
  // passes produce cert rows, we derive pass rate = certs / sum(attempts).
  let totalAttempts = 0;
  let totalPasses = 0;
  for (const c of scopedCerts) {
    totalAttempts += Math.max(1, c.attempts ?? 1);
    totalPasses += 1;
  }
  const avgQuizPassRate =
    totalAttempts > 0 ? Math.round((totalPasses / totalAttempts) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Doc aggregates: reads/completes per docPath
  // ---------------------------------------------------------------------------
  const docStats: Record<
    string,
    { reads: number; completes: number; accessors: Set<string> }
  > = {};
  for (const p of scopedProgress) {
    const k = p.documentPath;
    if (!docStats[k]) {
      docStats[k] = { reads: 0, completes: 0, accessors: new Set() };
    }
    docStats[k].reads += p.accessCount || 1;
    docStats[k].accessors.add(p.userId);
    if (p.completed) docStats[k].completes += 1;
  }

  const knownPaths = Object.keys(docTitleByPath);
  // Include all known docs, even unread (reads=0) — so leastReadDocs surfaces docs nobody touched.
  for (const path of knownPaths) {
    if (!docStats[path]) {
      docStats[path] = { reads: 0, completes: 0, accessors: new Set() };
    }
  }

  const docRows = Object.entries(docStats).map(([docPath, s]) => {
    const uniqReaders = s.accessors.size;
    return {
      docPath,
      title: docTitleByPath[docPath] || docPath,
      readCount: s.reads,
      uniqReaders,
      completes: s.completes,
      completionRate:
        uniqReaders > 0 ? Math.round((s.completes / uniqReaders) * 100) : 0,
    };
  });

  const topDocs: TopDoc[] = [...docRows]
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, 10)
    .map(({ docPath, title, readCount, completionRate }) => ({
      docPath,
      title,
      readCount,
      completionRate,
    }));

  // Only include docs from our known catalog for "ignored" — prevents
  // stale KV keys from polluting the signal.
  const leastReadDocs: LeastReadDoc[] = [...docRows]
    .filter((d) => knownPaths.includes(d.docPath))
    .sort((a, b) => a.readCount - b.readCount)
    .slice(0, 5)
    .map(({ docPath, title, readCount }) => ({ docPath, title, readCount }));

  // ---------------------------------------------------------------------------
  // Quiz stats (per doc)
  // Passes = one per cert. Attempts = sum(cert.attempts). avgScore = mean of cert.score as % of total.
  // ---------------------------------------------------------------------------
  const quizByDoc: Record<
    string,
    { attempts: number; passes: number; scoreSum: number; scoreCount: number }
  > = {};
  for (const c of scopedCerts) {
    const k = c.docPath;
    if (!quizByDoc[k]) {
      quizByDoc[k] = { attempts: 0, passes: 0, scoreSum: 0, scoreCount: 0 };
    }
    const atts = Math.max(1, c.attempts ?? 1);
    quizByDoc[k].attempts += atts;
    quizByDoc[k].passes += 1;
    const pct = c.totalQuestions > 0 ? (c.score / c.totalQuestions) * 100 : 0;
    quizByDoc[k].scoreSum += pct;
    quizByDoc[k].scoreCount += 1;
  }
  const quizStats: QuizStatEntry[] = Object.entries(quizByDoc)
    .map(([docPath, s]) => ({
      docPath,
      title: docTitleByPath[docPath] || docPath,
      attempts: s.attempts,
      passes: s.passes,
      avgScore:
        s.scoreCount > 0 ? Math.round(s.scoreSum / s.scoreCount) : 0,
      passRate: s.attempts > 0 ? Math.round((s.passes / s.attempts) * 100) : 0,
    }))
    // Worst (hardest) quizzes first — highest-leverage training gap.
    .sort((a, b) => a.passRate - b.passRate);

  // ---------------------------------------------------------------------------
  // User ranking
  // completionScore = pct of docs-allowed-by-role that user has completed.
  // ---------------------------------------------------------------------------
  const userRanking: UserRankingEntry[] = scopedUsers.map((u) => {
    const userProg = scopedProgress.filter((p) => p.userId === u.id);
    const userCerts = scopedCerts.filter((c) => c.userId === u.id);
    const completed = userProg.filter((p) => p.completed).length;
    const totalDocs = docsForRole(u.roleId) || TOTAL_DOCS;
    const lastActive = userProg.length
      ? userProg.reduce((latest, p) =>
          new Date(p.lastAccessed) > new Date(latest.lastAccessed) ? p : latest
        ).lastAccessed
      : u.lastLogin || '';
    const role = roleById[u.roleId];
    return {
      userId: u.id,
      userName: u.name,
      roleId: u.roleId,
      roleName: role?.name || u.roleId,
      docsCompleted: completed,
      certsEarned: userCerts.length,
      lastActive: lastActive || '',
      completionScore:
        totalDocs > 0 ? Math.round((completed / totalDocs) * 100) : 0,
    };
  });
  userRanking.sort((a, b) => b.completionScore - a.completionScore);

  // ---------------------------------------------------------------------------
  // Role completion
  // ---------------------------------------------------------------------------
  const byRole: Record<string, { users: User[] }> = {};
  for (const u of scopedUsers) {
    if (!byRole[u.roleId]) byRole[u.roleId] = { users: [] };
    byRole[u.roleId].users.push(u);
  }
  const roleCompletion: RoleCompletionEntry[] = Object.entries(byRole).map(
    ([roleId, { users: list }]) => {
      const role = roleById[roleId];
      const total = docsForRole(roleId) || TOTAL_DOCS;
      const perUser = list.map((u) => {
        const done = scopedProgress.filter(
          (p) => p.userId === u.id && p.completed
        ).length;
        return total > 0 ? (done / total) * 100 : 0;
      });
      return {
        roleId,
        roleName: role?.name || roleId,
        userCount: list.length,
        avgCompletionPct:
          perUser.length > 0
            ? Math.round(perUser.reduce((a, b) => a + b, 0) / perUser.length)
            : 0,
      };
    }
  );
  roleCompletion.sort((a, b) => b.avgCompletionPct - a.avgCompletionPct);

  // ---------------------------------------------------------------------------
  // Engagement over time (last N days)
  // ---------------------------------------------------------------------------
  const engagement: Record<
    string,
    { logins: number; docReads: number; quizzesTaken: number; certsIssued: number }
  > = {};
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    engagement[key] = { logins: 0, docReads: 0, quizzesTaken: 0, certsIssued: 0 };
  }

  function bucket(iso?: string): string | null {
    if (!iso) return null;
    const t = new Date(iso);
    if (isNaN(t.getTime())) return null;
    const key = t.toISOString().slice(0, 10);
    return key in engagement ? key : null;
  }

  // Logins: we only have lastLogin (not a log), so it's a weak signal — count
  // users whose lastLogin falls in the bucket.
  for (const u of scopedUsers) {
    const k = bucket(u.lastLogin);
    if (k) engagement[k].logins += 1;
  }
  // Doc reads: use lastAccessed for each progress row. Better proxy would be a
  // log, but this is what we have.
  for (const p of scopedProgress) {
    const k = bucket(p.lastAccessed);
    if (k) engagement[k].docReads += p.accessCount || 1;
  }
  // Quiz attempts: each cert.attempts is total tries, all concluded at issuedAt.
  for (const c of scopedCerts) {
    const k = bucket(c.issuedAt);
    if (k) {
      engagement[k].quizzesTaken += Math.max(1, c.attempts ?? 1);
      engagement[k].certsIssued += 1;
    }
  }

  const engagementOverTime: EngagementPoint[] = Object.entries(engagement)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, v]) => ({ date, ...v }));

  // ---------------------------------------------------------------------------
  // Assemble + cache
  // ---------------------------------------------------------------------------
  const response: AnalyticsResponse = {
    overview: {
      totalUsers: scopedUsers.length,
      activeUsers,
      docsCompleted: docsCompletedTotal,
      certsIssued,
      avgCompletionRate,
      avgQuizPassRate,
    },
    topDocs,
    leastReadDocs,
    quizStats,
    userRanking,
    engagementOverTime,
    roleCompletion,
    generatedAt: new Date().toISOString(),
  };

  cache = { data: response, expiresAt: now + ANALYTICS_TTL_MS, filterKey: key };
  return response;
}
