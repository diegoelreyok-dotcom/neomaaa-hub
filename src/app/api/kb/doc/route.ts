import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { validateKbRequest } from '@/lib/kb-auth';
import { getIndex } from '@/lib/kb-search';

export const runtime = 'nodejs';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

/** Path-traversal-safe resolver (mirrors src/lib/content.ts). */
function safeResolve(filePath: string, lang: 'es' | 'ru'): string | null {
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
  const lang = (url.searchParams.get('lang') || 'es').toLowerCase() === 'ru' ? 'ru' : 'es';

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
    // Fallback to ES if RU is missing
    if (lang === 'ru') {
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

  return NextResponse.json({
    docPath: `${section}/${slug}`,
    section,
    slug,
    titleEs: entry?.titleEs || slug,
    titleRu: entry?.titleRu || slug,
    language: lang,
    content,
    wordCount: entry?.wordCount ?? content.split(/\s+/).length,
  });
}
