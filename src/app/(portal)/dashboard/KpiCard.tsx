'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sparkline from './Sparkline';

interface KpiCardProps {
  value: number;
  label: string;
  suffix?: string; // e.g. "%", "/75"
  color: 'primary' | 'blue' | 'amber' | 'burgundy';
  icon: React.ReactNode;
  trendData: number[]; // sparkline series
  trendLabel?: string; // e.g. "+12% esta semana"
  trendDirection?: 'up' | 'down' | 'flat';
}

const COLORS = {
  primary: { stroke: '#98283A', glow: 'rgba(152, 40, 58, 0.4)', bg: 'rgba(152, 40, 58, 0.08)' },
  blue: { stroke: '#C94A5C', glow: 'rgba(201, 74, 92, 0.4)', bg: 'rgba(201, 74, 92, 0.08)' },
  amber: { stroke: '#FBBF24', glow: 'rgba(251, 191, 36, 0.35)', bg: 'rgba(251, 191, 36, 0.08)' },
  burgundy: { stroke: '#7A2030', glow: 'rgba(122, 32, 48, 0.4)', bg: 'rgba(122, 32, 48, 0.08)' },
};

export default function KpiCard({
  value,
  label,
  suffix,
  color,
  icon,
  trendData,
  trendLabel,
  trendDirection = 'flat',
}: KpiCardProps) {
  const c = COLORS[color];
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
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

  const trendArrow =
    trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→';
  const trendColor =
    trendDirection === 'up' ? '#10B981' : trendDirection === 'down' ? '#C94A5C' : '#6B7280';

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${c.stroke}66, transparent 40%, ${c.stroke}33)`,
          padding: '1px',
        }}
      >
        <div
          className="w-full h-full rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(18, 22, 38, 0.95) 0%, rgba(8, 11, 22, 0.95) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative p-4 sm:p-5 backdrop-blur-xl">
        {/* Top row: icon + trend pill */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: c.bg,
              color: c.stroke,
              border: `1px solid ${c.stroke}33`,
              boxShadow: `0 0 20px ${c.glow}, inset 0 0 20px ${c.stroke}11`,
            }}
          >
            {icon}
          </div>
          {trendLabel && (
            <div
              className="text-[10px] font-bold px-2 py-1 rounded-md tabular-nums"
              style={{
                color: trendColor,
                background: `${trendColor}15`,
                border: `1px solid ${trendColor}30`,
              }}
            >
              {trendArrow} {trendLabel}
            </div>
          )}
        </div>

        {/* Big number */}
        <div className="flex items-baseline gap-1 mb-0.5">
          <span
            className="text-4xl font-black tabular-nums leading-none"
            style={{
              background: `linear-gradient(135deg, #FFFFFF 0%, ${c.stroke} 140%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {displayValue}
          </span>
          {suffix && (
            <span className="text-lg font-bold text-neo-text-muted/80">{suffix}</span>
          )}
        </div>

        <div className="text-[11px] text-neo-text-muted font-semibold uppercase tracking-[0.12em] mb-3">
          {label}
        </div>

        {/* Sparkline */}
        <div className="relative h-9 -mx-1">
          <Sparkline data={trendData} color={c.stroke} width={240} height={36} />
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${c.glow} 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
