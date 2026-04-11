import { NextResponse } from 'next/server';

// In-memory pending registrations (will move to KV when configured)
const pendingStore: Record<string, string> = {};

async function kvSet(key: string, value: any): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, JSON.stringify(value));
  } catch {
    pendingStore[key] = JSON.stringify(value);
  }
}

async function kvGet(key: string): Promise<string | null> {
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.get(key);
  } catch {
    return pendingStore[key] || null;
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
  lang: 'es' | 'ru';
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// POST — submit a new registration request (public, no auth)
export async function POST(req: Request) {
  try {
    const { name, email, lang, message } = await req.json();

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nombre requerido (minimo 2 caracteres)' }, { status: 400 });
    }

    const id = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36);

    const registration: PendingRegistration = {
      id,
      name: name.trim(),
      email: email?.trim() || '',
      lang: lang === 'ru' ? 'ru' : 'es',
      message: message?.trim() || '',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    await kvSet(`pending:${id}`, registration);

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: 'Error al procesar solicitud' }, { status: 500 });
  }
}

// GET — list all pending registrations (admin only)
export async function GET(req: Request) {
  // Simple auth check via header (admin panel sends session cookie)
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const keys = await kvKeys('pending:*');
    const registrations: PendingRegistration[] = [];
    for (const key of keys) {
      const data = await kvGet(key);
      if (data) registrations.push(data as any);
    }
    // Sort by date, newest first
    registrations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH — approve or reject a registration (admin only)
export async function PATCH(req: Request) {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, action, roleId } = await req.json();

    if (!id || !action) {
      return NextResponse.json({ error: 'ID and action required' }, { status: 400 });
    }

    const data = await kvGet(`pending:${id}`);
    if (!data) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    const registration: PendingRegistration = data as any;

    if (action === 'reject') {
      registration.status = 'rejected';
      await kvSet(`pending:${id}`, registration);
      return NextResponse.json({ success: true, status: 'rejected' });
    }

    if (action === 'approve') {
      if (!roleId) {
        return NextResponse.json({ error: 'roleId required for approval' }, { status: 400 });
      }

      // Create the user with a generated code
      const { createUser } = await import('@/lib/db');
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const userId = registration.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '').substring(0, 15);

      await createUser(
        {
          id: userId,
          name: registration.name,
          roleId,
          lang: registration.lang,
          isActive: true,
        },
        code
      );

      // Mark registration as approved
      registration.status = 'approved';
      await kvSet(`pending:${id}`, registration);

      // Return the generated code (admin gives it to the user)
      return NextResponse.json({ success: true, status: 'approved', userId, code });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Registration PATCH error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE — remove a registration (admin only)
export async function DELETE(req: Request) {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await kvDel(`pending:${id}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
