import {
  Certificate,
  QuizSession,
  QUIZ_SESSION_TTL_SECONDS,
} from './quiz-types';

// In-memory fallback store (mirrors src/lib/db.ts pattern).
const memStore: Record<string, { value: string; expiresAt?: number }> = {};

function memExpired(key: string): boolean {
  const entry = memStore[key];
  if (!entry) return true;
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    delete memStore[key];
    return true;
  }
  return false;
}

async function kvGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get<T>(key);
    return val ?? null;
  } catch {
    if (memExpired(key)) return null;
    try {
      return JSON.parse(memStore[key].value) as T;
    } catch {
      return null;
    }
  }
}

async function kvSet(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    if (ttlSeconds && ttlSeconds > 0) {
      await kv.set(key, value, { ex: ttlSeconds });
    } else {
      await kv.set(key, value);
    }
  } catch {
    memStore[key] = {
      value: JSON.stringify(value),
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    };
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
    return Object.keys(memStore).filter((k) => k.startsWith(prefix) && !memExpired(k));
  }
}

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------

function sanitizeUserId(userId: string): string {
  return userId.replace(/[^a-zA-Z0-9_-]/g, '');
}

function sanitizeDocPath(docPath: string): string {
  return docPath.replace(/[^a-zA-Z0-9_\-/]/g, '');
}

function sessionKey(sessionId: string): string {
  return `quiz_session:${sessionId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

function certKey(userId: string, docPath: string): string {
  return `cert:${sanitizeUserId(userId)}:${sanitizeDocPath(docPath)}`;
}

function certIndexKey(certId: string): string {
  return `cert_index:${certId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

function cooldownKey(userId: string, docPath: string): string {
  return `quiz_cooldown:${sanitizeUserId(userId)}:${sanitizeDocPath(docPath)}`;
}

// ---------------------------------------------------------------------------
// Sessions (TTL 30 min)
// ---------------------------------------------------------------------------

export async function createQuizSession(session: QuizSession): Promise<void> {
  await kvSet(sessionKey(session.sessionId), session, QUIZ_SESSION_TTL_SECONDS);
}

export async function getQuizSession(sessionId: string): Promise<QuizSession | null> {
  return await kvGet<QuizSession>(sessionKey(sessionId));
}

export async function deleteQuizSession(sessionId: string): Promise<void> {
  await kvDel(sessionKey(sessionId));
}

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export async function saveCertificate(cert: Certificate): Promise<void> {
  await kvSet(certKey(cert.userId, cert.docPath), cert);
  await kvSet(
    certIndexKey(cert.id),
    `${sanitizeUserId(cert.userId)}:${sanitizeDocPath(cert.docPath)}`
  );
}

export async function getCertificate(
  userId: string,
  docPath: string
): Promise<Certificate | null> {
  return await kvGet<Certificate>(certKey(userId, docPath));
}

export async function getAllCertificates(userId: string): Promise<Certificate[]> {
  const safeUserId = sanitizeUserId(userId);
  const keys = await kvKeys(`cert:${safeUserId}:*`);
  const certs: Certificate[] = [];
  for (const key of keys) {
    const c = await kvGet<Certificate>(key);
    if (c) certs.push(c);
  }
  certs.sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1));
  return certs;
}

export async function deleteCertificate(
  userId: string,
  docPath: string
): Promise<void> {
  const existing = await getCertificate(userId, docPath);
  await kvDel(certKey(userId, docPath));
  if (existing) {
    await kvDel(certIndexKey(existing.id));
  }
}

export async function getCertificateById(certId: string): Promise<Certificate | null> {
  const pointer = await kvGet<string>(certIndexKey(certId));
  if (!pointer) return null;
  const [userId, ...rest] = pointer.split(':');
  const docPath = rest.join(':'); // docPath has '/', never ':'
  if (!userId || !docPath) return null;
  return await getCertificate(userId, docPath);
}

// ---------------------------------------------------------------------------
// Cooldowns (set when a user fails a quiz; blocks re-attempts for N seconds)
// ---------------------------------------------------------------------------

export async function setCooldown(
  userId: string,
  docPath: string,
  seconds: number
): Promise<void> {
  const expiresAt = Date.now() + seconds * 1000;
  await kvSet(cooldownKey(userId, docPath), { expiresAt }, seconds);
}

export async function getCooldown(
  userId: string,
  docPath: string
): Promise<{ expiresAt: number } | null> {
  const entry = await kvGet<{ expiresAt: number }>(cooldownKey(userId, docPath));
  if (!entry || typeof entry.expiresAt !== 'number') return null;
  if (entry.expiresAt <= Date.now()) {
    // expired: best-effort cleanup
    await kvDel(cooldownKey(userId, docPath));
    return null;
  }
  return entry;
}

export async function clearCooldown(userId: string, docPath: string): Promise<void> {
  await kvDel(cooldownKey(userId, docPath));
}
