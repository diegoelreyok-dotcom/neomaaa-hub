import { NextResponse } from 'next/server';
import { validateKbRequest } from '@/lib/kb-auth';
import { search, buildSnippet } from '@/lib/kb-search';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = await validateKbRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const url = new URL(req.url);
  const query = (url.searchParams.get('q') || '').trim();
  const limit = Math.min(Number(url.searchParams.get('limit') || '5') || 5, 50);
  const rawLang = (url.searchParams.get('lang') || 'es').toLowerCase();
  const lang: 'es' | 'ru' | 'en' = rawLang === 'ru' ? 'ru' : rawLang === 'en' ? 'en' : 'es';

  if (!query) {
    return NextResponse.json({ error: 'Missing query param "q"' }, { status: 400 });
  }

  const t0 = Date.now();
  const hits = search(query, { lang, limit });
  const tookMs = Date.now() - t0;

  const origin = url.origin;
  const results = hits.map((h) => ({
    docPath: h.docPath,
    section: h.section,
    titleEs: h.titleEs,
    titleRu: h.titleRu,
    titleEn: h.titleEn,
    url: `${origin}/content/${h.section}/${h.slug}`,
    relevance: h.score,
    snippet: buildSnippet(h.body, query),
  }));

  return NextResponse.json({
    query,
    lang,
    results,
    total: results.length,
    tookMs,
  });
}
