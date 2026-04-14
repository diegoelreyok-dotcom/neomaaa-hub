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
  const lang = (url.searchParams.get('lang') || 'es').toLowerCase() === 'ru' ? 'ru' : 'es';

  const docs = getIndex()
    .filter((e) => e.language === lang)
    .map((e) => ({
      docPath: e.docPath,
      section: e.section,
      slug: e.slug,
      titleEs: e.titleEs,
      titleRu: e.titleRu,
      language: e.language,
      wordCount: e.wordCount,
      url: `${url.origin}/content/${e.section}/${e.slug}`,
    }));

  return NextResponse.json({
    total: docs.length,
    docs,
  });
}
