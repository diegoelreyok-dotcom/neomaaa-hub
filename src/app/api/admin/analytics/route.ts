import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { computeAnalytics, type AnalyticsResponse } from '@/lib/analytics';

// KV-backed response cache. Shared across lambda instances so hammering
// /admin/analytics costs one compute per minute at most.
const KV_CACHE_TTL_SECONDS = 60;

function parseRangeDays(range: string | null): number {
  switch (range) {
    case '7d':
      return 7;
    case '90d':
      return 90;
    case '30d':
    default:
      return 30;
  }
}

function cacheKey(days: number, roleId: string, sectionId: string): string {
  return `analytics:latest:${days}:${roleId || 'all'}:${sectionId || 'all'}`;
}

async function kvReadCache(key: string): Promise<AnalyticsResponse | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const cached = await kv.get<AnalyticsResponse>(key);
    return cached ?? null;
  } catch {
    return null;
  }
}

async function kvWriteCache(key: string, payload: AnalyticsResponse): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, payload, { ex: KV_CACHE_TTL_SECONDS });
  } catch {
    // KV unavailable (local dev without env) — fall through silently.
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado', code: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado', code: 'FORBIDDEN' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range');
  const roleId = searchParams.get('role') || '';
  const sectionId = searchParams.get('section') || '';
  const days = parseRangeDays(range);

  const key = cacheKey(days, roleId, sectionId);

  // 1) Try KV cache
  const cached = await kvReadCache(key);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        'x-analytics-cache': 'hit',
        'Cache-Control': 'private, max-age=0, must-revalidate',
      },
    });
  }

  // 2) Compute + cache
  try {
    const data = await computeAnalytics({
      days,
      roleId: roleId || undefined,
      sectionId: sectionId || undefined,
    });
    // Fire-and-forget cache write (await to guarantee persistence within lambda life)
    await kvWriteCache(key, data);
    return NextResponse.json(data, {
      headers: {
        'x-analytics-cache': 'miss',
        'Cache-Control': 'private, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[admin/analytics] compute failed', error);
    return NextResponse.json(
      { error: 'Error al calcular analiticas', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
