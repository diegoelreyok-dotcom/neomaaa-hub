'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/types';

/**
 * Full-page search experience for the portal.
 *
 * Reuses the same auth-gated /api/search/index endpoint as the Cmd+K modal
 * (SearchBar.tsx). Client-side scoring mirrors server to keep responses
 * instant after the initial index load.
 */

interface SearchEntry {
  docPath: string;
  section: string;
  slug: string;
  titleEs: string;
  titleRu: string;
  titleEn?: string;
  language: 'es' | 'ru' | 'en';
  body: string;
  wordCount: number;
}

interface ScoredResult extends SearchEntry {
  score: number;
  snippet: string;
  readingMin: number;
}

interface Props {
  lang: Lang;
  allowedSections: string[];
}

const L = {
  es: {
    title: 'Buscar',
    subtitle: 'Encuentra cualquier cosa en la base de conocimiento del equipo.',
    placeholder: 'Buscar documentos, procesos, comisiones, FAQs...',
    hint: 'Empieza a escribir para ver resultados en tiempo real.',
    hintSub: 'Tip: usa',
    hintKbd: 'para abrir el buscador rapido desde cualquier pagina.',
    loading: 'Indexando documentos...',
    empty: 'No hay coincidencias',
    emptyHelp: 'Intenta con otra palabra o un termino mas amplio.',
    docsIndexed: 'documentos indexados',
    resultsFor: 'resultados para',
    noQuery: 'Empieza a buscar',
    noQuerySub: 'Prueba con:',
    examples: ['comisiones', 'deposito', 'onboarding', 'compliance'],
    min: 'min',
  },
  ru: {
    title: 'Поиск',
    subtitle: 'Найдите что угодно в базе знаний команды.',
    placeholder: 'Поиск документов, процессов, комиссий, FAQ...',
    hint: 'Начните вводить, чтобы видеть результаты в реальном времени.',
    hintSub: 'Совет: используйте',
    hintKbd: 'для открытия быстрого поиска на любой странице.',
    loading: 'Индексация документов...',
    empty: 'Совпадений не найдено',
    emptyHelp: 'Попробуйте другое слово или более широкий термин.',
    docsIndexed: 'документов в индексе',
    resultsFor: 'результатов для',
    noQuery: 'Начните поиск',
    noQuerySub: 'Попробуйте:',
    examples: ['комиссии', 'депозит', 'онбординг', 'комплаенс'],
    min: 'мин',
  },
  en: {
    title: 'Search',
    subtitle: 'Find anything in the team knowledge base.',
    placeholder: 'Search docs, processes, commissions, FAQs...',
    hint: 'Start typing to see live results.',
    hintSub: 'Tip: hit',
    hintKbd: 'to open quick search from anywhere.',
    loading: 'Indexing documents...',
    empty: 'No matches',
    emptyHelp: 'Try another keyword or a broader term.',
    docsIndexed: 'documents indexed',
    resultsFor: 'results for',
    noQuery: 'Start searching',
    noQuerySub: 'Try:',
    examples: ['commissions', 'deposit', 'onboarding', 'compliance'],
    min: 'min',
  },
} as const;

// Section color mapping — stable per section, matches brand palette.
const SECTION_COLORS: Record<string, { stroke: string; bg: string }> = {
  sales: { stroke: '#98283A', bg: 'rgba(152, 40, 58, 0.12)' },
  compliance: { stroke: '#C94A5C', bg: 'rgba(201, 74, 92, 0.12)' },
  support: { stroke: '#FBBF24', bg: 'rgba(251, 191, 36, 0.12)' },
  operations: { stroke: '#7A2030', bg: 'rgba(122, 32, 48, 0.12)' },
  marketing: { stroke: '#C94A5C', bg: 'rgba(201, 74, 92, 0.12)' },
  hiring: { stroke: '#7A2030', bg: 'rgba(122, 32, 48, 0.12)' },
  partners: { stroke: '#FBBF24', bg: 'rgba(251, 191, 36, 0.12)' },
  legal: { stroke: '#98283A', bg: 'rgba(152, 40, 58, 0.12)' },
  launch: { stroke: '#98283A', bg: 'rgba(152, 40, 58, 0.18)' },
  encyclopedia: { stroke: '#C94A5C', bg: 'rgba(201, 74, 92, 0.12)' },
  executive: { stroke: '#7A2030', bg: 'rgba(122, 32, 48, 0.18)' },
};
const DEFAULT_SECTION_COLOR = { stroke: '#94A3B8', bg: 'rgba(148, 163, 184, 0.12)' };

function sectionColor(section: string) {
  return SECTION_COLORS[section] || DEFAULT_SECTION_COLOR;
}

function scoreEntry(entry: SearchEntry, q: string, lang: 'es' | 'ru' | 'en'): number {
  const title = (
    lang === 'ru'
      ? entry.titleRu
      : lang === 'en'
        ? (entry.titleEn || entry.titleEs)
        : entry.titleEs
  ).toLowerCase();
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

function buildSnippet(body: string, q: string, chars = 180): string {
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

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const re = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark
            key={i}
            className="px-1 py-0.5 rounded font-semibold"
            style={{
              background: 'rgba(152, 40, 58, 0.3)',
              color: '#FFFFFF',
              boxShadow: '0 0 0 1px rgba(152, 40, 58, 0.45)',
            }}
          >
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function SearchView({ lang, allowedSections }: Props) {
  const t = L[lang] || L.es;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);

  // Load index on mount
  useEffect(() => {
    let cancelled = false;
    fetch('/api/search/index', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchEntry[]) => {
        if (cancelled) return;
        setIndex(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setIndex([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Autofocus input
  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, []);

  // Effective language with EN fallback to ES if no EN entries exist.
  const effectiveLang: 'es' | 'ru' | 'en' = useMemo(() => {
    if (!index) return lang;
    const hasEn = lang === 'en' && index.some((e) => e.language === 'en');
    return lang === 'en' && !hasEn ? 'es' : lang;
  }, [index, lang]);

  const totalDocs = useMemo(() => {
    if (!index) return 0;
    const allow = new Set(allowedSections);
    return index.filter((e) => e.language === effectiveLang && allow.has(e.section)).length;
  }, [index, effectiveLang, allowedSections]);

  const results: ScoredResult[] = useMemo(() => {
    if (!index) return [];
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const allow = new Set(allowedSections);
    const scored: ScoredResult[] = [];
    for (const e of index) {
      if (e.language !== effectiveLang) continue;
      if (!allow.has(e.section)) continue;
      const score = scoreEntry(e, q, lang);
      if (score > 0) {
        scored.push({
          ...e,
          score,
          snippet: buildSnippet(e.body, q),
          readingMin: Math.max(1, Math.round((e.wordCount || 0) / 220)),
        });
      }
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 30);
  }, [index, query, lang, effectiveLang, allowedSections]);

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const isMac =
    typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const kbdKey = isMac ? '⌘K' : 'Ctrl+K';

  function go(r: ScoredResult) {
    router.push(`/content/${r.section}/${r.slug}`);
  }

  return (
    <div className="relative">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: 'rgba(152, 40, 58, 0.15)',
              color: '#C94A5C',
              border: '1px solid rgba(152, 40, 58, 0.3)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C94A5C] opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C94A5C]" />
            </span>
            Search
          </span>
          <span className="text-[11px] text-neo-text-muted tabular-nums">
            {loading ? t.loading : `${totalDocs} ${t.docsIndexed}`}
          </span>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 140%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t.title}
        </h1>
        <p className="text-neo-text-muted text-sm mt-2 max-w-xl">{t.subtitle}</p>
      </motion.div>

      {/* Glass search bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative mb-6"
      >
        {/* Gradient border wrapper */}
        <div
          className="rounded-2xl p-[1px] transition-all duration-300"
          style={{
            background: focused
              ? 'linear-gradient(135deg, rgba(152,40,58,0.9), rgba(122,32,48,0.4) 60%, rgba(152,40,58,0.2))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
            boxShadow: focused
              ? '0 0 40px rgba(152, 40, 58, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            className="rounded-2xl flex items-center gap-3 px-5 h-16"
            style={{
              background:
                'linear-gradient(135deg, rgba(18,22,38,0.85) 0%, rgba(8,11,22,0.85) 100%)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`flex-shrink-0 transition-colors ${focused ? 'text-[#C94A5C]' : 'text-neo-text-muted'}`}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent text-neo-text text-base placeholder:text-neo-text-muted/70 focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-xs text-neo-text-muted hover:text-neo-text transition-colors px-2 py-1 rounded-md hover:bg-white/5"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
            <kbd
              className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-semibold rounded-md"
              style={{
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {kbdKey}
            </kbd>
          </div>
        </div>
      </motion.div>

      {/* Results area */}
      <AnimatePresence mode="wait">
        {!hasQuery ? (
          <motion.div
            key="empty-initial"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-[1px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
            }}
          >
            <div
              className="rounded-2xl px-6 py-12 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Illustration-ish SVG */}
              <div className="relative mx-auto w-20 h-20 mb-5">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(152,40,58,0.4) 0%, transparent 70%)',
                    filter: 'blur(18px)',
                  }}
                />
                <svg
                  viewBox="0 0 80 80"
                  className="relative w-20 h-20"
                  fill="none"
                  stroke="url(#searchGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C94A5C" />
                      <stop offset="100%" stopColor="#7A2030" />
                    </linearGradient>
                  </defs>
                  <circle cx="34" cy="34" r="22" />
                  <line x1="50" y1="50" x2="66" y2="66" />
                  <circle cx="34" cy="34" r="8" opacity="0.5">
                    <animate
                      attributeName="r"
                      values="8;14;8"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0;0.5"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neo-text mb-1.5">{t.noQuery}</h2>
              <p className="text-sm text-neo-text-muted mb-5">{t.hint}</p>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="text-[11px] text-neo-text-muted uppercase tracking-wider font-semibold">
                  {t.noQuerySub}
                </span>
                {t.examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setQuery(ex);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                    style={{
                      background: 'rgba(152, 40, 58, 0.12)',
                      color: '#C94A5C',
                      border: '1px solid rgba(152, 40, 58, 0.25)',
                    }}
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-neo-text-muted/70">
                {t.hintSub}{' '}
                <kbd
                  className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-[10px] font-mono font-semibold rounded"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {kbdKey}
                </kbd>{' '}
                {t.hintKbd}
              </p>
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div
            key="empty-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-[1px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
            }}
          >
            <div
              className="rounded-2xl px-6 py-10 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-3xl mb-2">◌</div>
              <h3 className="text-base font-semibold text-neo-text mb-1">{t.empty}</h3>
              <p className="text-sm text-neo-text-muted">{t.emptyHelp}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.05 },
              },
            }}
          >
            <div className="flex items-baseline justify-between mb-3 px-1">
              <span className="text-[11px] text-neo-text-muted uppercase tracking-[0.14em] font-semibold">
                {results.length} {t.resultsFor} <span className="text-neo-text">&ldquo;{trimmed}&rdquo;</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {results.map((r) => {
                const title =
                  lang === 'ru'
                    ? r.titleRu
                    : lang === 'en'
                      ? (r.titleEn || r.titleEs)
                      : r.titleEs;
                const sc = sectionColor(r.section);
                return (
                  <motion.button
                    key={r.docPath}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={() => go(r)}
                    className="group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer"
                  >
                    {/* Gradient border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${sc.stroke}55, transparent 45%, ${sc.stroke}22)`,
                        padding: '1px',
                      }}
                    >
                      <div
                        className="w-full h-full rounded-2xl"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(18,22,38,0.75) 0%, rgba(8,11,22,0.75) 100%)',
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="relative px-5 py-4 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[0.12em]"
                          style={{
                            color: sc.stroke,
                            background: sc.bg,
                            border: `1px solid ${sc.stroke}33`,
                          }}
                        >
                          {r.section}
                        </span>
                        <span className="text-[11px] text-neo-text-muted/80 tabular-nums">
                          {r.readingMin} {t.min}
                        </span>
                        <span className="ml-auto text-[10px] text-neo-text-muted/50 font-mono">
                          {r.score.toFixed(0)}
                        </span>
                      </div>

                      <h3 className="text-[15px] sm:text-base font-semibold text-neo-text leading-snug mb-1.5">
                        <Highlight text={title} query={query} />
                      </h3>

                      <p className="text-xs sm:text-[13px] text-neo-text-muted leading-relaxed line-clamp-2">
                        <Highlight text={r.snippet} query={query} />
                      </p>

                      {/* Arrow slides in on hover */}
                      <div
                        className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
                        style={{ color: sc.stroke }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${sc.stroke}33 0%, transparent 60%)`,
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
