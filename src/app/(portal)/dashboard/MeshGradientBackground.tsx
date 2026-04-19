'use client';

/**
 * Animated mesh gradient background — 4 colored blobs with heavy blur that
 * drift slowly, giving the whole dashboard a "breathing" feel without any
 * canvas/WebGL overhead. Inspired by linear.app and vercel.com landing pages.
 *
 * Fixed-position, behind everything, pointer-events-none.
 */
export default function MeshGradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Base dark */}
      <div className="absolute inset-0" style={{ background: '#070A12' }} />

      {/* 4 drifting blobs */}
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
      <div className="mesh-blob mesh-blob-3" />

      {/* Subtle grid overlay for that "technical" vibe */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette so edges darken */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      <style jsx>{`
        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.55;
          will-change: transform;
        }
        .mesh-blob-1 {
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, #98283A 0%, transparent 70%);
          top: -10%;
          left: -5%;
          animation: drift1 22s ease-in-out infinite;
        }
        .mesh-blob-2 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, #7A2030 0%, transparent 70%);
          top: 15%;
          right: -8%;
          animation: drift2 28s ease-in-out infinite;
          opacity: 0.5;
        }
        .mesh-blob-3 {
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, #98283A 0%, transparent 70%);
          bottom: -10%;
          left: 25%;
          animation: drift3 32s ease-in-out infinite;
          opacity: 0.2;
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(120px, 80px) scale(1.15); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-100px, 120px) scale(0.9); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(80px, -100px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
