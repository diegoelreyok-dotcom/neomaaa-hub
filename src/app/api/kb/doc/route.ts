import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { validateKbRequest } from '@/lib/kb-auth';
import { getIndex } from '@/lib/kb-search';
import { trackDocPath } from '@/lib/api-keys';

export const runtime = 'nodejs';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

/** Path-traversal-safe resolver (mirrors src/lib/content.ts). */
function safeResolve(filePath: string, lang: 'es' | 'ru' | 'en'): string | null {
  if (!filePath || typeof filePath !== 'string' || filePath.includes('\0')) return null;
  const resolved = path.resolve(CONTENT_DIR, lang, filePath);
  const expected = path.resolve(CONTENT_DIR, lang) + path.sep;
  if (!resolved.startsWith(expected)) return null;
  if (!resolved.endsWith('.md')) return null;
  return resolved;
}

export async function GET(req: Request) {
  const auth = await validateKbRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const url = new URL(req.url);
  const docPath = (url.searchParams.get('path') || '').trim();
  const rawLang = (url.searchParams.get('lang') || 'es').toLowerCase();
  const lang: 'es' | 'ru' | 'en' = rawLang === 'ru' ? 'ru' : rawLang === 'en' ? 'en' : 'es';

  if (!docPath) {
    return NextResponse.json({ error: 'Missing "path" param (e.g. "encyclopedia/abc")' }, { status: 400 });
  }

  // Accept either "section/slug" or "section/slug.md"
  const filePath = docPath.endsWith('.md') ? docPath : `${docPath}.md`;
  const full = safeResolve(filePath, lang);
  if (!full) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  let content: string;
  try {
    content = fs.readFileSync(full, 'utf-8');
  } catch {
    // Fallback to ES if RU or EN is missing
    if (lang === 'ru' || lang === 'en') {
      const fb = safeResolve(filePath, 'es');
      if (fb) {
        try {
          content = fs.readFileSync(fb, 'utf-8');
        } catch {
          return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }
      } else {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
  }

  // Pull titles from index (canonical)
  const normalized = filePath.replace(/\.md$/, '');
  const [section, slug] = normalized.split('/');
  const entry = getIndex().find(
    (e) => e.section === section && e.slug === slug && e.language === 'es',
  );

  // Scraping detection — track unique paths per key per hour. Fire-and-forget
  // but we await to ensure the temp-disable kicks in before the NEXT request.
  const scrape = await trackDocPath(auth.key.id, `${section}/${slug}`).catch(() => ({
    flagged: false,
    unique: 0,
  }));
  if (scrape.flagged) {
    return NextResponse.json(
      { error: 'Scraping pattern detected. Key temporarily disabled for 24h.' },
      { status: 429 },
    );
  }

  // Watermark: partial key id for post-hoc leak attribution
  const keyIdPartial = auth.key.id.slice(-6);
  return NextResponse.json(
    {
      docPath: `${section}/${slug}`,
      section,
      slug,
      titleEs: entry?.titleEs || slug,
      titleRu: entry?.titleRu || slug,
      titleEn: entry?.titleEn || entry?.titleEs || slug,
      language: lang,
      content,
      wordCount: entry?.wordCount ?? content.split(/\s+/).length,
    },
    {
      headers: {
        'X-KB-Key-Id': keyIdPartial,
      },
    },
  );
}
