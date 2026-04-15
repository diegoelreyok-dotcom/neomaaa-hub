'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Lang } from '@/lib/types';

/**
 * Global search modal (Cmd+K / Ctrl+K).
 *
 * - Lazy-fetches /api/search/index on first open (auth-gated, role-filtered).
 * - Filters by allowedSections (user's role.sections) — defense in depth;
 *   the endpoint already returns only allowed sections for the user.
 * - Client-side scoring mirrors server: title (×10) + body occurrences (×1).
 */

interface SearchEntry {
  docPath: string;
  section: string;
  slug: string;
  titleEs: string;
  titleRu: string;
  language: 'es' | 'ru';
  body: string;
  wordCount: number;
}

interface ScoredResult extends SearchEntry {
  score: number;
  snippet: string;
}

interface SearchBarProps {
  lang: Lang;
  allowedSections: string[];
}

const L = {
  es: {
    trigger: 'Buscar',
    placeholder: 'Buscar en la base de conocimiento...',
    loading: 'Cargando índice...',
    empty: 'No se encontraron resultados.',
    hint: 'Escribe para buscar por título o contenido',
    kbd: '⌘K',
    navTip: '↑↓ navegar · Enter abrir · Esc cerrar',
  },
  ru: {
    trigger: 'Поиск',
    placeholder: 'Поиск по базе знаний...',
    loading: 'Загрузка индекса...',
    empty: 'Ничего не найдено.',
    hint: 'Начните вводить для поиска по заголовку или содержимому',
    kbd: '⌘K',
    navTip: '↑↓ перемещение · Enter открыть · Esc закрыть',
  },
} as const;

function scoreEntry(entry: SearchEntry, q: string, lang: 'es' | 'ru'): number {
  const title = (lang === 'ru' ? entry.titleRu : entry.titleEs).toLowerCase();
  const body = entry.body.toLowerCase();
  let score = 0;
  if (title.includes(q)) score += 10;

  let idx = 0;
  let occ = 0;
  while (occ < 50) {
    const i = body.indexOf(q, idx);
    if (i < 0) break;
    occ += 1;
    idx = i + q.length;
  }
  score += occ;
  return score;
}

function buildSnippet(body: string, q: string, chars = 150): string {
  const lower = body.toLowerCase();
  const i = lower.indexOf(q);
  if (i < 0) return body.slice(0, chars) + (body.length > chars ? '…' : '');
  const start = Math.max(0, i - Math.floor((chars - q.length) / 2));
  const end = Math.min(body.length, start + chars);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < body.length ? '…' : '';
  return prefix + body.slice(start, end) + suffix;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const re = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark key={i} className="bg-neo-primary/25 text-white px-0.5 rounded-sm">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function SearchBar({ lang, allowedSections }: SearchBarProps) {
  const t = L[lang];
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Lazy-load the index on first open
  useEffect(() => {
    if (!open || index || loading) return;
    setLoading(true);
    fetch('/api/search/index', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchEntry[]) => setIndex(Array.isArray(data) ? data : []))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [open, index, loading]);

  // Cmd+K / Ctrl+K toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      setQuery('');
    }
  }, [open]);

  const results: ScoredResult[] = useMemo(() => {
    if (!index) return [];
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const allowSet = new Set(allowedSections);
    const scored: ScoredResult[] = [];
    for (const e of index) {
      if (e.language !== lang) continue;
      if (!allowSet.has(e.section)) continue;
      const score = scoreEntry(e, q, lang);
      if (score > 0) {
        scored.push({ ...e, score, snippet: buildSnippet(e.body, q) });
      }
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 10);
  }, [index, query, lang, allowedSections]);

  // Keep selected in range
  useEffect(() => {
    if (selected >= results.length) setSelected(0);
  }, [results.length, selected]);

  // Scroll selected into view
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-idx="${selected}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const go = useCallback(
    (r: ScoredResult) => {
      setOpen(false);
      router.push(`/content/${r.section}/${r.slug}`);
    },
    [router],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(results.length - 1, s + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(0, s - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = results[selected];
      if (r) go(r);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neo-text-muted bg-neo-dark-3/40 hover:bg-neo-dark-3/70 hover:text-neo-text-secondary border border-neo-dark-3/40 rounded-lg transition-all duration-200"
        aria-label={t.trigger}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>{t.trigger}</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 text-[10px] font-mono text-neo-text-muted/80 bg-neo-dark-4/60 border border-neo-dark-3/50 rounded">
          {t.kbd}
        </kbd>
      </button>

      {/* Mobile: icon-only trigger */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden text-neo-text-secondary hover:text-neo-text hover:bg-neo-dark-3/50 p-2.5 rounded-lg transition-all"
        aria-label={t.trigger}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-neo-dark-2 border border-neo-dark-3/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 h-14 border-b border-neo-dark-3/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent text-neo-text text-base placeholder:text-neo-text-muted focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs font-mono px-2 py-1 rounded text-neo-text-muted bg-neo-dark-3/40 hover:bg-neo-dark-3/70 border border-neo-dark-3/50"
              >
                esc
              </button>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto"
            >
              {loading && (
                <div className="px-4 py-8 text-center text-sm text-neo-text-muted">
                  {t.loading}
                </div>
              )}
              {!loading && !query.trim() && (
                <div className="px-4 py-8 text-center text-sm text-neo-text-muted">
                  {t.hint}
                </div>
              )}
              {!loading && query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-neo-text-muted">
                  {t.empty}
                </div>
              )}
              {results.map((r, i) => {
                const title = lang === 'ru' ? r.titleRu : r.titleEs;
                const active = i === selected;
                return (
                  <button
                    key={r.docPath}
                    data-idx={i}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => go(r)}
                    className={`w-full text-left px-4 py-3 border-b border-neo-dark-3/30 transition-colors ${
                      active ? 'bg-neo-primary/10' : 'hover:bg-neo-dark-3/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-sm font-semibold text-neo-text truncate">
                        <HighlightedText text={title} query={query} />
                      </span>
                      <span className="flex-shrink-0 text-[10px] uppercase tracking-wider font-bold text-neo-primary/80 bg-neo-primary/10 border border-neo-primary/20 px-1.5 py-0.5 rounded">
                        {r.section}
                      </span>
                    </div>
                    <p className="text-xs text-neo-text-muted leading-relaxed line-clamp-2">
                      <HighlightedText text={r.snippet} query={query} />
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="px-4 h-9 flex items-center justify-between text-[11px] text-neo-text-muted/70 bg-neo-dark-3/20 border-t border-neo-dark-3/40">
              <span>{t.navTip}</span>
              {index && <span>{index.filter((e) => e.language === lang).length} docs</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
