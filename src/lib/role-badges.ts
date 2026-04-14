/**
 * Role badges — awarded when a user completes their full learning path.
 *
 * Storage key: role_badge:{userId}:{roleId}
 * Keyed per-role so admins/dev can collect multiple over time if roleId changes.
 */

export interface RoleBadge {
  userId: string;
  userName: string;
  roleId: string;
  pathId: string;
  roleNameEs: string;
  roleNameRu: string;
  titleEs: string;
  titleRu: string;
  issuedAt: string; // ISO
}

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
      return null;
    }
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, value);
  } catch {
    memStore[key] = JSON.stringify(value);
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

function sanitize(v: string): string {
  return v.replace(/[^a-zA-Z0-9_-]/g, '');
}

function badgeKey(userId: string, roleId: string): string {
  return `role_badge:${sanitize(userId)}:${sanitize(roleId)}`;
}

export async function getRoleBadge(
  userId: string,
  roleId: string
): Promise<RoleBadge | null> {
  return await kvGet<RoleBadge>(badgeKey(userId, roleId));
}

export async function saveRoleBadge(badge: RoleBadge): Promise<void> {
  await kvSet(badgeKey(badge.userId, badge.roleId), badge);
}

export async function getAllRoleBadges(userId: string): Promise<RoleBadge[]> {
  const safe = sanitize(userId);
  const keys = await kvKeys(`role_badge:${safe}:*`);
  const badges: RoleBadge[] = [];
  for (const key of keys) {
    const b = await kvGet<RoleBadge>(key);
    if (b) badges.push(b);
  }
  badges.sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1));
  return badges;
}
