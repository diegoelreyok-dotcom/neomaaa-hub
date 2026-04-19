'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// ---------- Shared tokens ----------
const GLASS_BG =
  'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)';

// ---------- KPI card ----------
export function AdminKpi({
  label,
  value,
  hint,
  icon,
  href,
  accent,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  href?: string;
  accent?: 'burgundy' | 'green' | 'amber' | 'red' | 'neutral' | 'cyan' | 'purple' | 'blue';
}) {
  const accentMap: Record<string, { value: string; glow: string; border: string }> = {
    burgundy: {
      value: 'text-[#C94A5C]',
      glow: 'rgba(201,74,92,0.35)',
      border: 'rgba(201,74,92,0.4)',
    },
    green: {
      value: 'text-[#10B981]',
      glow: 'rgba(56,204,151,0.3)',
      border: 'rgba(56,204,151,0.35)',
    },
    amber: {
      value: 'text-[#FBBF24]',
      glow: 'rgba(251,191,36,0.3)',
      border: 'rgba(251,191,36,0.35)',
    },
    red: {
      value: 'text-[#C44545]',
      glow: 'rgba(196,69,69,0.3)',
      border: 'rgba(196,69,69,0.35)',
    },
    cyan: {
      value: 'text-[#98283A]',
      glow: 'rgba(152,40,58,0.3)',
      border: 'rgba(152,40,58,0.35)',
    },
    purple: {
      value: 'text-[#7A2030]',
      glow: 'rgba(122,32,48,0.3)',
      border: 'rgba(122,32,48,0.35)',
    },
    blue: {
      value: 'text-[#C94A5C]',
      glow: 'rgba(201,74,92,0.3)',
      border: 'rgba(201,74,92,0.35)',
    },
    neutral: {
      value: 'text-white',
      glow: 'rgba(152,40,58,0.15)',
      border: 'rgba(255,255,255,0.1)',
    },
  };
  const tone = accentMap[accent || 'neutral'];

  const body = (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden h-full group"
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${tone.border}, transparent 50%, ${tone.border}66)`,
          padding: '1px',
        }}
      >
        <div
          className="w-full h-full rounded-2xl"
          style={{ background: GLASS_BG, backdropFilter: 'blur(10px)' }}
        />
      </div>

      {/* Content */}
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.12em]">
            {label}
          </div>
          {icon && (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#98283A]"
              style={{
                background: 'rgba(152,40,58,0.1)',
                border: '1px solid rgba(152,40,58,0.25)',
                boxShadow: `0 0 14px ${tone.glow}`,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        <div className={`text-3xl font-black tabular-nums leading-none ${tone.value}`}>
          {value}
        </div>
        {hint && <div className="text-[#6B7280] text-xs mt-2">{hint}</div>}
      </div>

      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${tone.glow} 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {body}
      </a>
    );
  }
  return body;
}

// ---------- Badge ----------
export function AdminBadge({
  children,
  variant = 'neutral',
}: {
  children: ReactNode;
  variant?: 'neutral' | 'burgundy' | 'green' | 'amber' | 'red' | 'cyan' | 'purple' | 'blue';
}) {
  const variants: Record<string, string> = {
    neutral: 'bg-white/5 text-[#94A3B8] border-white/10',
    burgundy: 'bg-[#C94A5C]/12 text-[#C94A5C] border-[#C94A5C]/25',
    green: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
    amber: 'bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/25',
    red: 'bg-[#C44545]/10 text-[#C44545] border-[#C44545]/25',
    cyan: 'bg-[#98283A]/10 text-[#98283A] border-[#98283A]/25',
    purple: 'bg-[#7A2030]/10 text-[#7A2030] border-[#7A2030]/25',
    blue: 'bg-[#C94A5C]/10 text-[#C94A5C] border-[#C94A5C]/25',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border tabular-nums ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// ---------- Empty state ----------
export function AdminEmpty({
  icon,
  title,
  hint,
  action,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl px-6 py-12 text-center border border-white/10"
      style={{ background: GLASS_BG, backdropFilter: 'blur(10px)' }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#98283A]"
        style={{
          background: 'rgba(152,40,58,0.1)',
          border: '1px solid rgba(152,40,58,0.28)',
          boxShadow: '0 0 20px rgba(152,40,58,0.3)',
        }}
      >
        {icon || (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <p className="text-white text-sm font-semibold">{title}</p>
      {hint && <p className="text-[#94A3B8] text-sm mt-1.5">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ---------- Shimmer skeleton ----------
export function AdminSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl animate-pulse ${className}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-hidden
    />
  );
}

// ---------- Section heading ----------
export function AdminPageHeader({
  title,
  subtitle,
  actions,
  counter,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Optional chip shown next to title (e.g. total count) */
  counter?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between gap-4 mb-8 flex-wrap"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h1
            className="text-[28px] font-black tracking-tight leading-none"
            style={{
              background:
                'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 110%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h1>
          {counter && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#98283A]/35 text-[#C94A5C] bg-[#98283A]/10 tabular-nums">
              {counter}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[#94A3B8] text-sm mt-2">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </motion.div>
  );
}

// ---------- Primary / secondary button styles (for consistency) ----------
export const btnPrimary =
  'inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-br from-[#98283A] to-[#7A2030] hover:from-[#B33347] hover:to-[#98283A] shadow-[0_0_18px_rgba(152,40,58,0.3)] hover:shadow-[0_0_26px_rgba(152,40,58,0.45)]';

export const btnSecondary =
  'inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl text-[#D1D5DB] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur';

export const btnGhost =
  'inline-flex items-center gap-2 text-[#94A3B8] font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors duration-150';

export const btnDanger =
  'inline-flex items-center gap-2 text-[#C94A5C] font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-[#C94A5C]/12 transition-colors duration-150 border border-transparent hover:border-[#C94A5C]/25';

export const btnBurgundy =
  'inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-br from-[#98283A] to-[#7A2030] hover:from-[#B33347] hover:to-[#98283A] shadow-[0_0_18px_rgba(152,40,58,0.25)] hover:shadow-[0_0_26px_rgba(152,40,58,0.4)]';
