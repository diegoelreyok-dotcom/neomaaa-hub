'use client';

/**
 * Holographic orb — pure SVG + CSS animation, no WebGL.
 * Rotating ring with gradient + pulsing glow + "N" monogram centered.
 * Represents the NEOMAAA broker "live" entity.
 */
export default function HolographicOrb() {
  return (
    <div className="relative" style={{ width: 140, height: 140 }}>
      {/* Outer glow pulse */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(152,40,58,0.45) 0%, transparent 60%)',
          filter: 'blur(20px)',
          animation: 'orbPulse 3s ease-in-out infinite',
        }}
      />

      <svg width="140" height="140" viewBox="0 0 140 140" className="relative">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C94A5C" />
            <stop offset="50%" stopColor="#98283A" />
            <stop offset="100%" stopColor="#7A2030" />
          </linearGradient>
          <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A0E1D" />
            <stop offset="100%" stopColor="#0A0E1A" />
          </linearGradient>
          <filter id="orbGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rotating outer ring */}
        <g style={{ animation: 'orbRotate 12s linear infinite', transformOrigin: '70px 70px' }}>
          <circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="2"
            strokeDasharray="180 70"
            filter="url(#orbGlow)"
          />
          <circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="#98283A"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.6"
          />
        </g>

        {/* Counter-rotating mid ring */}
        <g style={{ animation: 'orbRotateReverse 18s linear infinite', transformOrigin: '70px 70px' }}>
          <circle
            cx="70"
            cy="70"
            r="52"
            fill="none"
            stroke="#C94A5C"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.7"
          />
        </g>

        {/* Inner sphere */}
        <circle cx="70" cy="70" r="42" fill="url(#innerGrad)" stroke="#98283A" strokeWidth="1" opacity="0.95" />
        <circle cx="70" cy="70" r="42" fill="none" stroke="#98283A" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="42;46;42" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Monogram */}
        <text
          x="70"
          y="82"
          textAnchor="middle"
          fill="white"
          fontSize="36"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          filter="url(#orbGlow)"
          style={{
            textShadow: '0 0 8px rgba(152,40,58,0.9)',
          }}
        >
          N
        </text>

        {/* Scanning line */}
        <line
          x1="8"
          y1="70"
          x2="132"
          y2="70"
          stroke="#98283A"
          strokeWidth="1"
          opacity="0.55"
          style={{ animation: 'orbScan 3s ease-in-out infinite' }}
        />
      </svg>

      <style jsx>{`
        @keyframes orbRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbRotateReverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes orbPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes orbScan {
          0%, 100% { transform: translateY(-40px); opacity: 0; }
          50%      { transform: translateY(40px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
