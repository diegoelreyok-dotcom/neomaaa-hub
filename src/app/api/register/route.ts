import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { checkRateLimit, consumeRateLimit } from '@/lib/rate-limit';

// In-memory pending registrations (will move to KV when configured)
const pendingStore: Record<string, string> = {};

// NOTE: Vercel KV auto-serializes/deserializes JSON. Do NOT double-stringify.
async function kvSet(key: string, value: unknown): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, value);
  } catch {
    pendingStore[key] = JSON.stringify(value);
  }
}

async function kvGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get<T>(key);
    return val ?? null;
  } catch {
    const raw = pendingStore[key];
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return raw as T; }
  }
}

async function kvKeys(pattern: string): Promise<string[]> {
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.keys(pattern);
  } catch {
    const prefix = pattern.replace('*', '');
    return Object.keys(pendingStore).filter(k => k.startsWith(prefix));
  }
}

async function kvDel(key: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(key);
  } catch {
    delete pendingStore[key];
  }
}

export interface PendingRegistration {
  id: string;
  name: string;
  email: string;
  lang: 'es' | 'ru' | 'en';
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// KV-backed rate limit for public registration endpoint.
// Tighter than login (register is unauthenticated): 5 per 15min per IP.
const REGISTER_MAX_PER_WINDOW = 5;
const REGISTER_WINDOW_SECONDS = 15 * 60;

/**
 * Extract the client IP from request headers. On Vercel, `x-forwarded-for` is
 * set by the platform and the leftmost value is the original client. We also
 * fall back to `x-real-ip`. IP spoofing is still possible in environments
 * without a trusted proxy; Vercel guarantees these headers on deployed apps.
 */
function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const xri = req.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

// POST — submit a new registration request (public, no auth)
export async function POST(req: Request) {
  try {
    // Rate limit by IP (KV-backed so it survives cold starts)
    const ip = getClientIp(req);
    const rlKey = `ratelimit:register:${ip}`;
    const rl = await checkRateLimit(rlKey, REGISTER_MAX_PER_WINDOW, REGISTER_WINDOW_SECONDS);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Demasiadas solicitudes. Intenta mas tarde.', code: 'RATE_LIMITED' }, { status: 429 });
    }
    // Consume one slot up front: a submission (valid or not) counts toward
    // the limit, otherwise attackers could spray with bad payloads for free.
    await consumeRateLimit(rlKey, REGISTER_MAX_PER_WINDOW, REGISTER_WINDOW_SECONDS);

    const body = await req.json();
    const { name, email, lang, message } = body;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: 'Nombre requerido (2-100 caracteres)', code: 'NAME_REQUIRED' }, { status: 400 });
    }

    // Validate email if provided
    if (email && typeof email === 'string' && email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || email.length > 200) {
        return NextResponse.json({ error: 'Email invalido', code: 'INVALID_EMAIL' }, { status: 400 });
      }
    }

    // Validate message length
    if (message && typeof message === 'string' && message.length > 1000) {
      return NextResponse.json({ error: 'Mensaje demasiado largo (max 1000 caracteres)', code: 'MESSAGE_TOO_LONG' }, { status: 400 });
    }

    const id = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36);

    const registration: PendingRegistration = {
      id,
      name: name.trim().substring(0, 100),
      email: email?.trim()?.substring(0, 200) || '',
      lang: lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'es',
      message: message?.trim()?.substring(0, 1000) || '',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    await kvSet(`pending:${id}`, registration);

    // Don't return the internal ID to the public
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error al procesar solicitud', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

// GET — list all pending registrations (admin only)
export async function GET() {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const keys = await kvKeys('pending:*');
    const registrations: PendingRegistration[] = [];
    for (const key of keys) {
      const data = await kvGet<PendingRegistration>(key);
      if (data) registrations.push(data);
    }
    // Sort by date, newest first
    registrations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json({ error: 'Server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

// PATCH — approve or reject a registration (admin only)
export async function PATCH(req: Request) {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { id, action, roleId } = await req.json();

    if (!id || typeof id !== 'string' || !action || typeof action !== 'string') {
      return NextResponse.json({ error: 'ID and action required', code: 'MISSING_FIELDS' }, { status: 400 });
    }

    // Validate action is one of the allowed values
    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action. Must be "approve" or "reject"', code: 'INVALID_ACTION' }, { status: 400 });
    }

    const data = await kvGet<PendingRegistration>(`pending:${id}`);
    if (!data) {
      return NextResponse.json({ error: 'Registration not found', code: 'REGISTRATION_NOT_FOUND' }, { status: 404 });
    }

    const registration = data;

    // Prevent re-processing already handled registrations
    if (registration.status !== 'pending') {
      return NextResponse.json({ error: `Registration already ${registration.status}`, code: 'REGISTRATION_ALREADY_PROCESSED' }, { status: 409 });
    }

    if (action === 'reject') {
      registration.status = 'rejected';
      await kvSet(`pending:${id}`, registration);
      return NextResponse.json({ success: true, status: 'rejected' });
    }

    if (action === 'approve') {
      if (!roleId || typeof roleId !== 'string') {
        return NextResponse.json({ error: 'roleId required for approval', code: 'ROLE_ID_REQUIRED' }, { status: 400 });
      }

      // Validate the role exists
      const { getRole, getUser, createUser } = await import('@/lib/db');
      const role = await getRole(roleId);
      if (!role) {
        return NextResponse.json({ error: 'Role not found', code: 'ROLE_NOT_FOUND' }, { status: 400 });
      }

      // Generate a secure code (6 digits) using crypto, not Math.random.
      const code = randomInt(100000, 1000000).toString();
      const baseUserId = registration.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '').substring(0, 15);

      // Handle userId collisions by appending a crypto-random suffix
      let userId = baseUserId;
      const existingUser = await getUser(userId);
      if (existingUser) {
        // 4 hex chars from 16 random bits — plenty for collision avoidance here
        const suffix = randomInt(0, 0x10000).toString(16).padStart(4, '0');
        userId = baseUserId + '-' + suffix;
      }

      await createUser(
        {
          id: userId,
          name: registration.name,
          roleId,
          lang: registration.lang,
          isActive: true,
          // Admin hands the generated code to the user. That code is known to
          // the admin and transmitted out-of-band, so the user must rotate it
          // on first login.
          mustChangeCode: true,
        },
        code
      );

      // Mark registration as approved
      registration.status = 'approved';
      await kvSet(`pending:${id}`, registration);

      // Return the generated code (admin gives it to the user)
      return NextResponse.json({ success: true, status: 'approved', userId, code });
    }

    return NextResponse.json({ error: 'Invalid action', code: 'INVALID_ACTION' }, { status: 400 });
  } catch (err) {
    console.error('Registration PATCH error:', err);
    return NextResponse.json({ error: 'Server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

// DELETE — remove a registration (admin only)
export async function DELETE(req: Request) {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID required', code: 'MISSING_FIELDS' }, { status: 400 });
    }

    await kvDel(`pending:${id}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
