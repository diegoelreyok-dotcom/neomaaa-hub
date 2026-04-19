'use client';

import { useEffect, useState } from 'react';

interface ProgressRingProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
}

/**
 * Animated circular progress ring. Fills from 0% → percent on mount.
 * Used in the roadmap hero to show overall path completion.
 */
export default function ProgressRing({
  percent,
  size = 148,
  stroke = 10,
  color = '#98283A',
  trackColor = 'rgba(255,255,255,0.08)',
}: ProgressRingProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setAnimated(eased * percent);
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - animated / 100);

  const displayPct = Math.round(animated);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow behind */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}33 0%, transparent 65%)`,
          filter: 'blur(18px)',
        }}
      />
      <svg
        width={size}
        height={size}
        className="relative -rotate-90"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#C94A5C" />
          </linearGradient>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        {/* Glow copy */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          filter="url(#ring-glow)"
          opacity="0.6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-black tabular-nums leading-none"
          style={{
            background: `linear-gradient(135deg, #FFFFFF 0%, ${color} 140%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayPct}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neo-text-muted mt-1">
          %
        </span>
      </div>
    </div>
  );
}
