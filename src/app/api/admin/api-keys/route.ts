import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createApiKey, getAllApiKeys } from '@/lib/api-keys';

export const runtime = 'nodejs';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return { ok: false as const, status: 401, error: 'Unauthorized' };
  if (!(session.user as any).isAdmin) return { ok: false as const, status: 403, error: 'Forbidden' };
  return { ok: true as const, userId: (session.user as any).userId as string };
}

export async function GET() {
  const a = await requireAdmin();
  if (!a.ok) return NextResponse.json({ error: a.error }, { status: a.status });

  const keys = await getAllApiKeys();
  // Never return the hash
  const safe = keys.map(({ keyHash, ...rest }) => rest);
  return NextResponse.json(safe);
}

export async function POST(req: Request) {
  const a = await requireAdmin();
  if (!a.ok) return NextResponse.json({ error: a.error }, { status: a.status });

  let body: { name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

  try {
    const { key, plaintext } = await createApiKey(name, a.userId);
    const { keyHash, ...safe } = key;
    // plaintext is ONLY returned here, once. Admin must copy it now.
    return NextResponse.json({ ...safe, plaintext });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to create key' }, { status: 400 });
  }
}
