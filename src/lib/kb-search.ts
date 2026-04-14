/**
 * Shared search-index singleton + scoring.
 *
 * Loaded once per cold start, reused across requests.
 * The same scoring function is mirrored in SearchBar.tsx so server + client
 * rankings are consistent.
 */

import fs from 'node:fs';
import path from 'node:path';

export interface SearchEntry {
  docPath: string;
  section: string;
  slug: string;
  titleEs: string;
  titleRu: string;
  language: 'es' | 'ru';
  body: string;
  wordCount: number;
}

let INDEX: SearchEntry[] | null = null;

export function getIndex(): SearchEntry[] {
  if (INDEX) return INDEX;
  // Primary: data/search-index.json (SEC1 — moved out of /public for auth gate)
  // Fallback: legacy public/search-index.json (for local dev if still around)
  const candidates = [
    path.join(process.cwd(), 'data', 'search-index.json'),
    path.join(process.cwd(), 'public', 'search-index.json'),
  ];
  for (const file of candidates) {
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      INDEX = JSON.parse(raw) as SearchEntry[];
      return INDEX;
    } catch {
      // try next
    }
  }
  INDEX = [];
  return INDEX;
}

export interface ScoredResult extends SearchEntry {
  score: number;
}

/** Score = title matches (×10) + body occurrences (×1). */
export function scoreEntry(entry: SearchEntry, query: string, lang: 'es' | 'ru'): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const title = (lang === 'ru' ? entry.titleRu : entry.titleEs).toLowerCase();
  const body = entry.body.toLowerCase();

  let score = 0;
  if (title.includes(q)) score += 10;

  // Count body occurrences (capped to avoid quadratic blowup).
  let idx = 0;
  let occ = 0;
  while (occ < 50) {
    const found = body.indexOf(q, idx);
    if (found < 0) break;
    occ += 1;
    idx = found + q.length;
  }
  score += occ;

  return score;
}

export function search(
  query: string,
  opts: { lang?: 'es' | 'ru'; limit?: number; allowedSections?: string[] } = {},
): ScoredResult[] {
  const lang = opts.lang || 'es';
  const limit = Math.min(Math.max(1, opts.limit || 10), 50);
  const allowed = opts.allowedSections;

  const index = getIndex();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: ScoredResult[] = [];
  for (const e of index) {
    if (e.language !== lang) continue;
    if (allowed && !allowed.includes(e.section)) continue;
    const score = scoreEntry(e, q, lang);
    if (score > 0) results.push({ ...e, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

/** Return a ~150-char plain-text snippet around the first match. */
export function buildSnippet(body: string, query: string, chars = 150): string {
  const q = query.toLowerCase();
  const lower = body.toLowerCase();
  const i = lower.indexOf(q);
  if (i < 0) return body.slice(0, chars) + (body.length > chars ? '…' : '');

  const start = Math.max(0, i - Math.floor((chars - q.length) / 2));
  const end = Math.min(body.length, start + chars);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < body.length ? '…' : '';
  return prefix + body.slice(start, end) + suffix;
}
