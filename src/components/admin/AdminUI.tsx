'use client';

import { ReactNode } from 'react';

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
  accent?: 'burgundy' | 'green' | 'amber' | 'red' | 'neutral';
}) {
  const accentMap = {
    burgundy: 'text-[#98283A]',
    green: 'text-[#38CC97]',
    amber: 'text-[#D4A03A]',
    red: 'text-[#C44545]',
    neutral: 'text-white',
  };
  const color = accentMap[accent || 'neutral'];

  const body = (
    <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5 hover:border-[#2A2A2A] transition-colors duration-150 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-semibold text-[#666666] uppercase tracking-wider">
          {label}
        </div>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#A0A0A0]">
            {icon}
          </div>
        )}
      </div>
      <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
      {hint && (
        <div className="text-[#666666] text-xs mt-1">{hint}</div>
      )}
    </div>
  );

  if (href) {
    // Can't use Link here w/o importing; caller wraps if needed.
    return (
      <a href={href} className="block">
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
  variant?: 'neutral' | 'burgundy' | 'green' | 'amber' | 'red';
}) {
  const variants = {
    neutral: 'bg-[#1A1A1A] text-[#A0A0A0] border-[#1E1E1E]',
    burgundy: 'bg-[#98283A]/15 text-[#98283A] border-[#98283A]/25',
    green: 'bg-[#38CC97]/10 text-[#38CC97] border-[#38CC97]/20',
    amber: 'bg-[#D4A03A]/10 text-[#D4A03A] border-[#D4A03A]/20',
    red: 'bg-[#C44545]/10 text-[#C44545] border-[#C44545]/20',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border ${variants[variant]}`}
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
    <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl px-6 py-12 text-center">
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3 text-[#666666]">
          {icon}
        </div>
      )}
      <p className="text-white text-sm font-medium">{title}</p>
      {hint && <p className="text-[#666666] text-sm mt-1">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ---------- Shimmer skeleton ----------
export function AdminSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#1A1A1A] rounded animate-pulse ${className}`}
      aria-hidden
    />
  );
}

// ---------- Section heading ----------
export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-[#666666] text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

// ---------- Primary / secondary button styles (for consistency) ----------
export const btnPrimary =
  'inline-flex items-center gap-2 bg-[#98283A] text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#B33347] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed';

export const btnSecondary =
  'inline-flex items-center gap-2 bg-[#1A1A1A] text-[#A0A0A0] font-medium text-sm px-4 py-2 rounded-lg hover:bg-[#222222] hover:text-white border border-[#1E1E1E] transition-colors duration-150';

export const btnGhost =
  'inline-flex items-center gap-2 text-[#A0A0A0] font-medium text-sm px-3 py-1.5 rounded-md hover:bg-[#1A1A1A] hover:text-white transition-colors duration-150';

export const btnDanger =
  'inline-flex items-center gap-2 text-[#C44545] font-medium text-sm px-3 py-1.5 rounded-md hover:bg-[#C44545]/10 transition-colors duration-150';
