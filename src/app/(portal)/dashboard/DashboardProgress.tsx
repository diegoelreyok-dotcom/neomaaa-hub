'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';

interface DashboardProgressProps {
  totalDocs: number;
  lang: Lang;
}

export default function DashboardProgress({ totalDocs, lang }: DashboardProgressProps) {
  const [readCount, setReadCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Count unique document paths
          const uniquePaths = new Set(data.map((p: any) => p.documentPath));
          setReadCount(uniquePaths.size);
        }
      })
      .catch(() => {
        setReadCount(0);
      });
  }, []);

  const percentage = readCount !== null && totalDocs > 0
    ? Math.round((readCount / totalDocs) * 100)
    : 0;

  const isLoading = readCount === null;

  return (
    <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 group hover:border-neo-dark-3 transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <svg className="w-[18px] h-[18px] text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 w-12 bg-neo-dark-3 rounded mb-1" />
              <div className="h-3 w-20 bg-neo-dark-3/50 rounded" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-extrabold text-neo-text">
                {readCount}
                <span className="text-sm font-medium text-neo-text-muted ml-1">/ {totalDocs}</span>
              </div>
              <div className="text-[11px] text-neo-text-muted font-medium uppercase tracking-wider">
                {lang === 'ru' ? 'Прочитано' : 'Leidos'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {!isLoading && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-neo-text-muted font-medium uppercase tracking-wider">
              {lang === 'ru' ? 'Прогресс' : 'Progreso'}
            </span>
            <span className="text-[10px] text-neo-text-secondary font-semibold">
              {percentage}%
            </span>
          </div>
          <div className="h-1.5 bg-neo-dark-3 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neo-primary to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
