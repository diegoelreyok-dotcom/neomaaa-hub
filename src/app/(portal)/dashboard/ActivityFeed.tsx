'use client';

import { motion } from 'framer-motion';
import type { Lang } from '@/lib/types';

export interface ActivityEvent {
  userName: string;
  userInitials: string;
  action: 'accessed' | 'completed';
  docTitle: string;
  sectionName: string;
  timestamp: string; // ISO
  href?: string;
}

interface ActivityFeedProps {
  events: ActivityEvent[];
  lang: Lang;
}

const T = {
  es: {
    title: 'Actividad del equipo',
    sub: 'Ultimas acciones',
    empty: 'Aun no hay actividad reciente',
    accessed: 'vio',
    completed: 'completo',
    ago: {
      now: 'ahora',
      min: 'm',
      hr: 'h',
      day: 'd',
    },
  },
  ru: {
    title: 'Активность команды',
    sub: 'Последние действия',
    empty: 'Пока нет активности',
    accessed: 'открыл',
    completed: 'завершил',
    ago: { now: 'сейчас', min: 'м', hr: 'ч', day: 'д' },
  },
  en: {
    title: 'Team activity',
    sub: 'Latest actions',
    empty: 'No recent activity yet',
    accessed: 'viewed',
    completed: 'completed',
    ago: { now: 'now', min: 'm', hr: 'h', day: 'd' },
  },
};

function timeAgo(iso: string, t: (typeof T)['es']['ago']): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return '';
  const diffSec = Math.max(0, Math.floor((now - then) / 1000));
  if (diffSec < 60) return t.now;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}${t.min}`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}${t.hr}`;
  return `${Math.floor(diffHr / 24)}${t.day}`;
}

function avatarColor(initials: string): string {
  // Deterministic color from initials
  const palette = [
    'linear-gradient(135deg, #98283A, #C94A5C)',
    'linear-gradient(135deg, #7A2030, #98283A)',
    'linear-gradient(135deg, #C94A5C, #98283A)',
    'linear-gradient(135deg, #98283A, #7A2030)',
    'linear-gradient(135deg, #FBBF24, #F59E0B)',
    'linear-gradient(135deg, #98283A, #7A2030)',
  ];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = (hash << 5) - hash + initials.charCodeAt(i);
    hash |= 0;
  }
  return palette[Math.abs(hash) % palette.length];
}

export default function ActivityFeed({ events, lang }: ActivityFeedProps) {
  const t = T[lang] || T.es;

  return (
    <div
      className="rounded-2xl border border-white/10 p-5 h-full flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(20,24,40,0.55) 0%, rgba(10,14,26,0.55) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neo-success" />
            </span>
            <div className="text-sm font-semibold text-white">{t.title}</div>
          </div>
          <div className="text-[11px] text-neo-text-muted mt-0.5">{t.sub}</div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-xs text-neo-text-muted/60 py-8">
          {t.empty}
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto pr-1 -mr-1 max-h-[340px]">
          {events.map((e, i) => (
            <motion.div
              key={`${e.userName}-${e.docTitle}-${e.timestamp}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ background: avatarColor(e.userInitials) }}
              >
                {e.userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-neo-text-secondary leading-tight">
                  <span className="font-semibold text-white">{e.userName}</span>{' '}
                  <span className="text-neo-text-muted">
                    {e.action === 'completed' ? t.completed : t.accessed}
                  </span>{' '}
                  <span className="text-white/90">{e.docTitle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-neo-text-muted/70 uppercase tracking-wider">
                    {e.sectionName}
                  </span>
                  <span className="text-[10px] text-neo-text-muted/50">·</span>
                  <span className="text-[10px] text-neo-text-muted tabular-nums">
                    {timeAgo(e.timestamp, t.ago)}
                  </span>
                  {e.action === 'completed' && (
                    <span className="text-[10px] text-neo-success">✓</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
