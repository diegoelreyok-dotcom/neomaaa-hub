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

/**
 * Atomic set-if-not-exists. Returns true if written, false if a value already
 * existed. Uses Upstash KV `nx` option; falls back to best-effort check+set
 * on the in-memory dev store.
 */
async function kvSetNX(key: string, value: unknown): Promise<boolean> {
  try {
    const { kv } = await import('@vercel/kv');
    // Upstash supports `{ nx: true }` — returns null if key already exists,
    // "OK" otherwise. Works with JSON values.
    const res = await kv.set(key, value, { nx: true } as any);
    return res !== null;
  } catch {
    if (memStore[key] !== undefined) return false;
    memStore[key] = JSON.stringify(value);
    return true;
  }
}

async function kvDel(key: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(key);
  } catch {
    delete memStore[key];
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

/**
 * Write the badge only if no badge already exists for this (userId, roleId).
 * Returns true if the badge was written, false if one already existed.
 *
 * Use this instead of getRoleBadge()-then-saveRoleBadge() to prevent race
 * conditions when two concurrent check-completion calls both pass the
 * existence check and end up writing duplicate badges.
 */
export async function saveRoleBadgeIfNotExists(badge: RoleBadge): Promise<boolean> {
  return await kvSetNX(badgeKey(badge.userId, badge.roleId), badge);
}

/**
 * Delete all role badges for a user. Used during cascade user delete.
 * Returns the number of keys deleted.
 */
export async function deleteAllBadgesForUser(userId: string): Promise<number> {
  const safe = sanitize(userId);
  if (!safe) return 0;
  const keys = await kvKeys(`role_badge:${safe}:*`);
  let count = 0;
  for (const key of keys) {
    await kvDel(key);
    count += 1;
  }
  return count;
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
