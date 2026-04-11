'use client';

import { useEffect, useState } from 'react';
import type { Lang, ReadProgress } from '@/lib/types';

interface DashboardProgressProps {
  totalDocs: number;
  lang: Lang;
}

interface LevelInfo {
  nameEs: string;
  nameRu: string;
  color: string;
  bgColor: string;
}

const LEVELS: { threshold: number; info: LevelInfo }[] = [
  { threshold: 0, info: { nameEs: 'Principiante', nameRu: '\u041D\u043E\u0432\u0438\u0447\u043E\u043A', color: 'text-neo-text-muted', bgColor: 'bg-neo-dark-4/50 border-neo-dark-4' } },
  { threshold: 26, info: { nameEs: 'En progreso', nameRu: '\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435', color: 'text-amber-400', bgColor: 'bg-amber-400/10 border-amber-400/30' } },
  { threshold: 51, info: { nameEs: 'Avanzado', nameRu: '\u041F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439', color: 'text-neo-primary', bgColor: 'bg-neo-primary/10 border-neo-primary/30' } },
  { threshold: 76, info: { nameEs: 'Experto', nameRu: '\u042D\u043A\u0441\u043F\u0435\u0440\u0442', color: 'text-neo-success', bgColor: 'bg-neo-success/10 border-neo-success/30' } },
];

function getLevel(percentage: number): LevelInfo {
  let level = LEVELS[0].info;
  for (const l of LEVELS) {
    if (percentage >= l.threshold) {
      level = l.info;
    }
  }
  return level;
}

export default function DashboardProgress({ totalDocs, lang }: DashboardProgressProps) {
  const [completedCount, setCompletedCount] = useState<number | null>(null);
  const [readCount, setReadCount] = useState<number | null>(null);
  const [recentCompleted, setRecentCompleted] = useState<{ path: string; completedAt: string }[]>([]);

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data: ReadProgress[]) => {
        if (Array.isArray(data)) {
          const uniquePaths = new Set(data.map((p) => p.documentPath));
          setReadCount(uniquePaths.size);

          const completed = data.filter((p) => p.completed);
          setCompletedCount(completed.length);

          // Get recently completed, sorted by completedAt descending
          const recent = completed
            .filter((p) => p.completedAt)
            .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))
            .slice(0, 5)
            .map((p) => ({ path: p.documentPath, completedAt: p.completedAt || p.lastAccessed }));
          setRecentCompleted(recent);
        }
      })
      .catch(() => {
        setCompletedCount(0);
        setReadCount(0);
      });
  }, []);

  const completed = completedCount ?? 0;
  const percentage = totalDocs > 0
    ? Math.round((completed / totalDocs) * 100)
    : 0;

  const isLoading = completedCount === null;
  const level = getLevel(percentage);
  const levelName = lang === 'ru' ? level.nameRu : level.nameEs;

  // Extract a human-readable name from a document path like "sales/training.md"
  function formatDocName(path: string): string {
    const parts = path.replace('.md', '').split('/');
    const name = parts[parts.length - 1] || path;
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 group hover:border-neo-dark-3 transition-all duration-200">
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-neo-dark-3 rounded" />
          <div className="h-4 w-full bg-neo-dark-3/50 rounded" />
          <div className="h-4 w-3/4 bg-neo-dark-3/30 rounded" />
        </div>
      ) : (
        <>
          {/* Top row: stats + level badge */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neo-success/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-neo-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-neo-text">
                  {completed}
                  <span className="text-sm font-medium text-neo-text-muted ml-1">/ {totalDocs}</span>
                </div>
                <div className="text-[11px] text-neo-text-muted font-medium uppercase tracking-wider">
                  {lang === 'ru' ? '\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E' : 'Completados'}
                </div>
              </div>
            </div>

            {/* Level badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${level.bgColor} ${level.color}`}>
              {percentage >= 76 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              )}
              {levelName}
            </div>
          </div>

          {/* Percentage + progress bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-neo-text-muted font-medium uppercase tracking-wider">
                {lang === 'ru' ? '\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441' : 'Progreso'}
              </span>
              <span className="text-lg font-extrabold text-neo-text">
                {percentage}%
              </span>
            </div>
            <div className="h-2.5 bg-neo-dark-3 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neo-success/80 to-neo-success transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Accessed vs completed stats */}
          <div className="flex items-center gap-4 mb-5 text-xs">
            <div className="flex items-center gap-1.5 text-neo-text-muted">
              <span className="w-2 h-2 rounded-full bg-amber-400/60" />
              {lang === 'ru' ? '\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E' : 'Leidos'}: {readCount ?? 0}
            </div>
            <div className="flex items-center gap-1.5 text-neo-text-muted">
              <span className="w-2 h-2 rounded-full bg-neo-success" />
              {lang === 'ru' ? '\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E' : 'Completados'}: {completed}
            </div>
          </div>

          {/* Recently completed */}
          {recentCompleted.length > 0 && (
            <div className="border-t border-neo-dark-3/40 pt-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-neo-text-muted/50 mb-2.5">
                {lang === 'ru' ? '\u041D\u0435\u0434\u0430\u0432\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435' : 'Completados recientemente'}
              </h4>
              <div className="space-y-1.5">
                {recentCompleted.map((item) => (
                  <div key={item.path} className="flex items-center gap-2 text-xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-neo-success/15 flex items-center justify-center flex-shrink-0">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-neo-text-body truncate">{formatDocName(item.path)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
