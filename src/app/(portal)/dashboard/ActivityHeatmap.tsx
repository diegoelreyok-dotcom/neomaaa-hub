'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { Lang } from '@/lib/types';

interface ActivityHeatmapProps {
  /** ISO date strings (one per activity event — accessed or completed). */
  activityDates: string[];
  lang: Lang;
}

const WEEKS = 12;
const DAYS = 7;

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const T = {
  es: { title: 'Tu actividad', sub: 'Ultimos 12 semanas', none: 'Sin actividad', one: 'actividad', many: 'actividades' },
  ru: { title: 'Активность', sub: 'Последние 12 недель', none: 'Нет активности', one: 'событие', many: 'событий' },
  en: { title: 'Your activity', sub: 'Last 12 weeks', none: 'No activity', one: 'event', many: 'events' },
};

export default function ActivityHeatmap({ activityDates, lang }: ActivityHeatmapProps) {
  const t = T[lang] || T.es;

  const { grid, totalDays, maxCount } = useMemo(() => {
    // Count events per day
    const counts = new Map<string, number>();
    for (const iso of activityDates) {
      const d = new Date(iso);
      if (!Number.isFinite(d.getTime())) continue;
      const k = dateKey(d);
      counts.set(k, (counts.get(k) || 0) + 1);
    }

    // Build grid: WEEKS columns x DAYS rows, ending today.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Align end of grid to end of current week (Sunday-ended for simplicity)
    const todayDow = today.getDay(); // 0 Sun .. 6 Sat
    const cells: { date: Date; count: number; key: string }[][] = [];
    let max = 0;
    let active = 0;

    for (let w = WEEKS - 1; w >= 0; w--) {
      const col: typeof cells[number] = [];
      for (let d = 0; d < DAYS; d++) {
        const cellDate = new Date(today);
        const daysBack = w * DAYS + (DAYS - 1 - d) - (DAYS - 1 - todayDow);
        cellDate.setDate(today.getDate() - daysBack);
        const k = dateKey(cellDate);
        const c = counts.get(k) || 0;
        if (c > 0) active++;
        if (c > max) max = c;
        col.push({ date: cellDate, count: c, key: k });
      }
      cells.push(col);
    }
    // cells: oldest week first
    cells.reverse(); // So first column in render = oldest, last = most recent
    // Actually we want oldest left, newest right. Loop above went from w=WEEKS-1 (oldest) to w=0 (newest), we pushed in that order, then reverse. Now newest is first. Reverse again.
    cells.reverse();

    return { grid: cells, totalDays: active, maxCount: max };
  }, [activityDates]);

  function intensity(count: number): number {
    if (count === 0) return 0;
    if (maxCount <= 1) return 1;
    return Math.min(4, Math.ceil((count / maxCount) * 4));
  }

  const colors = [
    'rgba(255,255,255,0.04)',  // 0
    'rgba(152,40,58,0.2)',     // 1
    'rgba(152,40,58,0.4)',     // 2
    'rgba(152,40,58,0.7)',     // 3
    '#98283A',                 // 4
  ];

  const cellSize = 12;
  const gap = 3;

  return (
    <div
      className="rounded-2xl border border-white/10 p-5 h-full"
      style={{
        background: 'linear-gradient(135deg, rgba(20,24,40,0.55) 0%, rgba(10,14,26,0.55) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-white">{t.title}</div>
          <div className="text-[11px] text-neo-text-muted mt-0.5">
            {totalDays > 0
              ? `${totalDays} ${totalDays === 1 ? t.one : t.many} · ${t.sub}`
              : t.none}
          </div>
        </div>
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-1 text-[9px] text-neo-text-muted">
          <span className="mr-1">−</span>
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: c,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
          <span className="ml-1">+</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={WEEKS * (cellSize + gap)}
          height={DAYS * (cellSize + gap)}
          style={{ display: 'block' }}
        >
          {grid.map((col, w) =>
            col.map((cell, d) => {
              const lvl = intensity(cell.count);
              return (
                <motion.rect
                  key={cell.key}
                  x={w * (cellSize + gap)}
                  y={d * (cellSize + gap)}
                  width={cellSize}
                  height={cellSize}
                  rx={2.5}
                  ry={2.5}
                  fill={colors[lvl]}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * DAYS + d) * 0.003, duration: 0.25 }}
                >
                  <title>{`${cell.key} — ${cell.count} ${cell.count === 1 ? t.one : t.many}`}</title>
                </motion.rect>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
