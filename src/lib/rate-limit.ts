/**
 * KV-backed rate limiter.
 *
 * Replaces in-memory Maps that don't survive serverless cold starts and are
 * trivially bypassable on Vercel (each lambda has its own memory).
 *
 * Strategy:
 *   - Key format: `ratelimit:{purpose}:{identifier}`
 *   - Value: number counter
 *   - First write sets TTL = windowSeconds via `set(key, 1, { ex })`.
 *   - Subsequent writes use `incr` (which preserves existing TTL in Redis/Upstash).
 *   - If KV is unavailable (dev), degrade gracefully to an in-memory fallback.
 *
 * Two-phase API:
 *   - checkRateLimit: observes current counter, does NOT increment. Use to decide
 *     whether to allow the request and what to tell the client.
 *   - consumeRateLimit: increments the counter. Call when an attempt actually
 *     happens (e.g. failed login, registration submission).
 */

// In-process fallback for local dev without KV (and hard-failure tolerance).
const memFallback: Map<string, { count: number; expiresAt: number }> = new Map();

function memGet(key: string): number | null {
  const entry = memFallback.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memFallback.delete(key);
    return null;
  }
  return entry.count;
}

function memIncr(key: string, windowSeconds: number): number {
  const now = Date.now();
  const entry = memFallback.get(key);
  if (!entry || now > entry.expiresAt) {
    memFallback.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

function memTtl(key: string): number {
  const entry = memFallback.get(key);
  if (!entry) return 0;
  return Math.max(0, Math.ceil((entry.expiresAt - Date.now()) / 1000));
}

type KV = {
  get: <T = unknown>(k: string) => Promise<T | null>;
  incr: (k: string) => Promise<number>;
  expire: (k: string, seconds: number) => Promise<number>;
  ttl: (k: string) => Promise<number>;
  set: (k: string, v: unknown, opts?: { ex?: number }) => Promise<unknown>;
};

async function getKv(): Promise<KV | null> {
  try {
    const mod = await import('@vercel/kv');
    return mod.kv as unknown as KV;
  } catch {
    return null;
  }
}

export interface RateLimitStatus {
  allowed: boolean;
  remaining: number;
  resetAt: number; // epoch ms when the window resets
}

/**
 * Read-only check: is this key currently under the limit?
 *
 * NOTE: does NOT increment the counter. Call `consumeRateLimit` separately when
 * an attempt actually happens. Splitting read/write lets callers short-circuit
 * early (e.g. reject login before hashing) without double-counting.
 */
export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowSeconds: number
): Promise<RateLimitStatus> {
  const kv = await getKv();
  let count = 0;
  let ttlSeconds = 0;

  if (kv) {
    try {
      const raw = await kv.get<number | string>(key);
      count = typeof raw === 'number' ? raw : raw ? parseInt(String(raw), 10) || 0 : 0;
      ttlSeconds = count > 0 ? await kv.ttl(key) : 0;
    } catch {
      count = memGet(key) ?? 0;
      ttlSeconds = memTtl(key);
    }
  } else {
    count = memGet(key) ?? 0;
    ttlSeconds = memTtl(key);
  }

  const remaining = Math.max(0, maxAttempts - count);
  const resetAt = Date.now() + Math.max(0, ttlSeconds) * 1000;
  return {
    allowed: count < maxAttempts,
    remaining,
    resetAt: ttlSeconds > 0 ? resetAt : Date.now() + windowSeconds * 1000,
  };
}

/**
 * Record an attempt. Increments the counter and sets/preserves TTL.
 *
 * Implementation note: we use INCR then EXPIRE. If the key didn't exist before
 * the INCR, the counter is 1 and we set expiry. If it existed, EXPIRE is still
 * safe to call (Upstash preserves the semantics; re-setting TTL slightly extends
 * the window but only on actual attempts, which is acceptable behaviour for
 * lockouts — keeps aggressive attackers locked out).
 */
export async function consumeRateLimit(
  key: string,
  _maxAttempts: number,
  windowSeconds: number
): Promise<void> {
  const kv = await getKv();
  if (!kv) {
    memIncr(key, windowSeconds);
    return;
  }
  try {
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, windowSeconds);
    }
  } catch {
    memIncr(key, windowSeconds);
  }
}
