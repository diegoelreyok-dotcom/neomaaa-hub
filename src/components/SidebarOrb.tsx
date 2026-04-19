'use client';

/**
 * Tiny 28px version of HolographicOrb — used as the brand mark in the sidebar.
 * Pure SVG/CSS, no framer needed.
 */
export default function SidebarOrb() {
  return (
    <div className="relative shrink-0" style={{ width: 28, height: 28 }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(152,40,58,0.6) 0%, transparent 65%)',
          filter: 'blur(6px)',
          animation: 'sbOrbPulse 3s ease-in-out infinite',
        }}
      />
      <svg width="28" height="28" viewBox="0 0 28 28" className="relative">
        <defs>
          <linearGradient id="sbRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C94A5C" />
            <stop offset="50%" stopColor="#98283A" />
            <stop offset="100%" stopColor="#7A2030" />
          </linearGradient>
          <linearGradient id="sbInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A0E1D" />
            <stop offset="100%" stopColor="#0A0E1A" />
          </linearGradient>
        </defs>
        <g
          style={{
            animation: 'sbOrbRotate 10s linear infinite',
            transformOrigin: '14px 14px',
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke="url(#sbRingGrad)"
            strokeWidth="1.2"
            strokeDasharray="32 14"
          />
        </g>
        <circle
          cx="14"
          cy="14"
          r="8"
          fill="url(#sbInnerGrad)"
          stroke="#98283A"
          strokeWidth="0.7"
          opacity="0.95"
        />
        <text
          x="14"
          y="18"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          N
        </text>
      </svg>
      <style jsx>{`
        @keyframes sbOrbRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sbOrbPulse {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.12);
          }
        }
      `}</style>
    </div>
  );
}
