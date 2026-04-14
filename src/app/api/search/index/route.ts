/**
 * GET /api/search/index
 *
 * Auth-gated replacement for the old public /search-index.json.
 *
 * - Requires a valid NextAuth session (middleware enforces this, but we
 *   double-check here defensively).
 * - Filters the in-memory search index to entries whose `section` is in the
 *   user's role.sections (admins see everything).
 * - Responds with `Cache-Control: private, max-age=300` so browsers can
 *   reuse the filtered index for 5 minutes per session.
 *
 * Perf notes:
 * - Index is a singleton in kb-search.ts (loaded once per cold start).
 * - Filtering is O(n) over ~few hundred entries; negligible.
 * - Vercel applies gzip automatically based on Accept-Encoding.
 */

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { getIndex } from '@/lib/kb-search';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user as any;
  const roleId = user.roleId as string | undefined;
  const isAdmin = !!user.isAdmin;

  // Resolve allowed sections from role (admins get everything)
  let allowedSections: string[] | null = null;
  if (!isAdmin) {
    const role = roleId ? await getRole(roleId).catch(() => null) : null;
    allowedSections = Array.isArray(role?.sections) ? (role!.sections as string[]) : [];
  }

  const index = getIndex();
  const filtered = allowedSections
    ? index.filter((e) => allowedSections!.includes(e.section))
    : index;

  return new NextResponse(JSON.stringify(filtered), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, max-age=300',
      // Discourage intermediaries/CDN from caching per-user payloads
      'Vary': 'Cookie',
    },
  });
}
