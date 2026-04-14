import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deleteApiKey, toggleApiKey, getApiKeyById } from '@/lib/api-keys';

export const runtime = 'nodejs';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return { ok: false as const, status: 401, error: 'Unauthorized' };
  if (!(session.user as any).isAdmin) return { ok: false as const, status: 403, error: 'Forbidden' };
  return { ok: true as const };
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const a = await requireAdmin();
  if (!a.ok) return NextResponse.json({ error: a.error }, { status: a.status });

  const existing = await getApiKeyById(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await deleteApiKey(params.id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const a = await requireAdmin();
  if (!a.ok) return NextResponse.json({ error: a.error }, { status: a.status });

  let body: { enabled?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body.enabled !== 'boolean') {
    return NextResponse.json({ error: 'enabled (boolean) required' }, { status: 400 });
  }

  const updated = await toggleApiKey(params.id, body.enabled);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { keyHash, ...safe } = updated;
  return NextResponse.json(safe);
}
