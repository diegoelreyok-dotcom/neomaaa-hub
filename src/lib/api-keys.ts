/**
 * API Keys storage + validation (KV-backed).
 *
 * Storage layout:
 *   apikey:{id}                -> ApiKey record
 *   apikey_hash:{sha256(key)}  -> id  (for O(1) lookup on validation)
 *
 * Key format: neo_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  (32 hex chars entropy)
 *
 * Plaintext is NEVER stored. Only sha256 hash. We show it once on creation.
 */

import { createHash, randomBytes } from 'node:crypto';

export interface ApiKey {
  id: string; // "key_<8hex>"
  name: string;
  keyHash: string; // sha256 hex
  lastChars: string; // last 4 chars of plaintext
  createdAt: string;
  createdBy: string;
  lastUsed: string | null;
  enabled: boolean;
}

const PREFIX = 'neo_live_';

// In-memory fallback (dev without KV)
const mem: Record<string, string> = {};

async function kvGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get<T>(key);
    return val ?? null;
  } catch {
    const raw = mem[key];
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as T;
    }
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, value);
  } catch {
    mem[key] = JSON.stringify(value);
  }
}

async function kvDel(key: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(key);
  } catch {
    delete mem[key];
  }
}

async function kvIncr(key: string, ttlSeconds?: number): Promise<number> {
  try {
    const { kv } = await import('@vercel/kv');
    const next = await kv.incr(key);
    if (next === 1 && ttlSeconds) await kv.expire(key, ttlSeconds);
    return next;
  } catch {
    const cur = Number(mem[key] || 0) + 1;
    mem[key] = String(cur);
    return cur;
  }
}

async function kvKeys(pattern: string): Promise<string[]> {
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.keys(pattern);
  } catch {
    const prefix = pattern.replace('*', '');
    return Object.keys(mem).filter((k) => k.startsWith(prefix));
  }
}

function sha256(s: string): string {
  return createHash('sha256').update(s).digest('hex');
}

function genId(): string {
  return `key_${randomBytes(4).toString('hex')}`;
}

function genPlaintext(): string {
  return `${PREFIX}${randomBytes(16).toString('hex')}`;
}

export async function createApiKey(
  name: string,
  createdBy: string,
): Promise<{ key: ApiKey; plaintext: string }> {
  const safeName = (name || '').trim().slice(0, 80);
  if (!safeName) throw new Error('Name required');

  const plaintext = genPlaintext();
  const id = genId();
  const keyHash = sha256(plaintext);

  const key: ApiKey = {
    id,
    name: safeName,
    keyHash,
    lastChars: plaintext.slice(-4),
    createdAt: new Date().toISOString(),
    createdBy,
    lastUsed: null,
    enabled: true,
  };

  await kvSet(`apikey:${id}`, key);
  await kvSet(`apikey_hash:${keyHash}`, id);

  return { key, plaintext };
}

export async function validateApiKey(plaintext: string): Promise<ApiKey | null> {
  if (!plaintext || typeof plaintext !== 'string') return null;
  if (!plaintext.startsWith(PREFIX)) return null;
  const keyHash = sha256(plaintext);
  const id = await kvGet<string>(`apikey_hash:${keyHash}`);
  if (!id) return null;
  const key = await kvGet<ApiKey>(`apikey:${id}`);
  if (!key || !key.enabled) return null;
  return key;
}

export async function recordApiKeyUse(id: string): Promise<void> {
  const key = await kvGet<ApiKey>(`apikey:${id}`);
  if (!key) return;
  key.lastUsed = new Date().toISOString();
  await kvSet(`apikey:${id}`, key);
}

export async function getAllApiKeys(): Promise<ApiKey[]> {
  const ids = await kvKeys('apikey:*');
  const out: ApiKey[] = [];
  for (const id of ids) {
    // Exclude the apikey_hash:* keys (different prefix)
    if (!id.startsWith('apikey:')) continue;
    const k = await kvGet<ApiKey>(id);
    if (k) out.push(k);
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getApiKeyById(id: string): Promise<ApiKey | null> {
  return kvGet<ApiKey>(`apikey:${id}`);
}

export async function deleteApiKey(id: string): Promise<void> {
  const key = await kvGet<ApiKey>(`apikey:${id}`);
  if (!key) return;
  await kvDel(`apikey_hash:${key.keyHash}`);
  await kvDel(`apikey:${id}`);
}

export async function toggleApiKey(id: string, enabled: boolean): Promise<ApiKey | null> {
  const key = await kvGet<ApiKey>(`apikey:${id}`);
  if (!key) return null;
  key.enabled = enabled;
  await kvSet(`apikey:${id}`, key);
  return key;
}

/**
 * Rate limit: increments a per-key-per-hour counter.
 * Returns { allowed, count, limit }.
 */
export const RATE_LIMIT_PER_HOUR = 100;

export async function checkRateLimit(
  keyId: string,
): Promise<{ allowed: boolean; count: number; limit: number }> {
  const hour = Math.floor(Date.now() / 3600_000);
  const count = await kvIncr(`ratelimit:${keyId}:${hour}`, 3600);
  return {
    allowed: count <= RATE_LIMIT_PER_HOUR,
    count,
    limit: RATE_LIMIT_PER_HOUR,
  };
}
