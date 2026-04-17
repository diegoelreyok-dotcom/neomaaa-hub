import { NextResponse } from 'next/server';
import { validateKbRequest } from '@/lib/kb-auth';
import { getIndex } from '@/lib/kb-search';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = await validateKbRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const url = new URL(req.url);
  const rawLang = (url.searchParams.get('lang') || 'es').toLowerCase();
  const lang: 'es' | 'ru' | 'en' = rawLang === 'ru' ? 'ru' : rawLang === 'en' ? 'en' : 'es';

  // Intentionally minimal: docPath + section + slug only (no titles, no previews).
  // Titles/snippets are available via /api/kb/search (rate-limited per-query).
  const docs = getIndex()
    .filter((e) => e.language === lang)
    .map((e) => ({
      docPath: e.docPath,
      section: e.section,
      slug: e.slug,
      language: e.language,
    }));

  const keyIdPartial = auth.key.id.slice(-6);
  return NextResponse.json(
    { total: docs.length, docs },
    { headers: { 'X-KB-Key-Id': keyIdPartial } },
  );
}
