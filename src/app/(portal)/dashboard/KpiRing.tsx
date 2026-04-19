'use client';

import { useEffect, useState } from 'react';

interface KpiRingProps {
  value: number;
  total?: number; // if set, renders X/Total and percent-based ring
  label: string;
  sublabel?: string;
  color: 'primary' | 'blue' | 'amber' | 'burgundy';
  icon: React.ReactNode;
  percent?: number; // explicit percent override (0-100)
}

const COLORS = {
  primary: { stroke: '#98283A', glow: 'rgba(152, 40, 58, 0.3)', text: '#98283A' },
  blue: { stroke: '#C94A5C', glow: 'rgba(201, 74, 92, 0.3)', text: '#C94A5C' },
  amber: { stroke: '#FBBF24', glow: 'rgba(251, 191, 36, 0.25)', text: '#FBBF24' },
  burgundy: { stroke: '#7A2030', glow: 'rgba(122, 32, 48, 0.3)', text: '#7A2030' },
};

export default function KpiRing({
  value,
  total,
  label,
  sublabel,
  color,
  icon,
  percent: percentOverride,
}: KpiRingProps) {
  const [mounted, setMounted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Count-up animation
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplayValue(Math.round(eased * value));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const c = COLORS[color];
  const size = 64;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const rawPercent =
    typeof percentOverride === 'number'
      ? percentOverride
      : total && total > 0
        ? (value / total) * 100
        : value > 0
          ? 100
          : 0;
  const pct = Math.min(100, Math.max(0, rawPercent));
  const dashoffset = mounted ? circumference - (pct / 100) * circumference : circumference;

  return (
    <div
      className="group relative rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(20, 24, 40, 0.6) 0%, rgba(12, 15, 25, 0.6) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-3">
        {/* Ring */}
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={c.stroke}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              style={{
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: `drop-shadow(0 0 6px ${c.glow})`,
              }}
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: c.text }}
          >
            <div className="scale-75">{icon}</div>
          </div>
        </div>

        {/* Numbers */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-[26px] font-black text-white tabular-nums leading-none">
              {displayValue}
            </span>
            {typeof total === 'number' && (
              <span className="text-sm font-medium text-neo-text-muted tabular-nums">
                /{total}
              </span>
            )}
            {typeof percentOverride === 'number' && typeof total !== 'number' && (
              <span className="text-base font-bold text-neo-text-muted">%</span>
            )}
          </div>
          <div className="text-[10px] sm:text-[11px] text-neo-text-muted font-semibold uppercase tracking-[0.12em] mt-1.5 truncate">
            {label}
          </div>
          {sublabel && (
            <div className="text-[10px] text-neo-text-muted/60 mt-0.5 truncate">{sublabel}</div>
          )}
        </div>
      </div>
    </div>
  );
}
