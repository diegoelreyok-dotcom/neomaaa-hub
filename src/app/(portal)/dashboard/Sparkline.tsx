'use client';

import { useEffect, useState } from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

/**
 * Mini area chart that draws itself on mount — data[] is arbitrary values,
 * the chart auto-scales to its own min/max. Used inside KPI cards to give
 * each metric a "pulse" feel (last 7 days of activity, certificates, etc).
 */
export default function Sparkline({ data, color, width = 120, height = 36 }: SparklineProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1000;
    const tick = (t: number) => {
      const elapsed = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(eased);
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!data.length) return null;

  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  // Smooth path via bezier
  const pathD = points
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = points[i - 1];
      const cpx = (px + x) / 2;
      return `Q ${cpx} ${py} ${x} ${y} T ${x} ${y}`;
    })
    .join(' ');

  const areaD = pathD + ` L ${width} ${height} L 0 ${height} Z`;

  const visibleWidth = width * progress;

  const lastPoint = points[points.length - 1];

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`spark-clip-${color.replace('#', '')}`}>
          <rect x="0" y="0" width={visibleWidth} height={height} />
        </clipPath>
      </defs>

      <g clipPath={`url(#spark-clip-${color.replace('#', '')})`}>
        <path d={areaD} fill={`url(#spark-${color.replace('#', '')})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Dot at last point */}
      {progress >= 0.95 && lastPoint && (
        <>
          <circle cx={lastPoint[0]} cy={lastPoint[1]} r="6" fill={color} opacity="0.25">
            <animate attributeName="r" values="4;9;4" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2.5" fill={color} />
        </>
      )}
    </svg>
  );
}
