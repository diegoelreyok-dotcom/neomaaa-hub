'use client';

/**
 * Scoped mesh gradient background for /certificates — amber/burgundy bias
 * to feel like a trophy hall.
 */
export default function MeshBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: '#070A12' }} />
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
      <div className="mesh-blob mesh-blob-3" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
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
          filter: blur(110px);
          opacity: 0.5;
          will-change: transform;
        }
        .mesh-blob-1 {
          width: 560px; height: 560px;
          background: radial-gradient(circle, #98283A 0%, transparent 70%);
          top: -15%; left: -8%;
          animation: drift1 24s ease-in-out infinite;
          opacity: 0.5;
        }
        .mesh-blob-2 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #7A2030 0%, transparent 70%);
          top: 10%; right: -10%;
          animation: drift2 28s ease-in-out infinite;
          opacity: 0.5;
        }
        .mesh-blob-3 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #FBBF24 0%, transparent 70%);
          bottom: -10%; left: 30%;
          animation: drift3 32s ease-in-out infinite;
          opacity: 0.2;
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(100px, 60px) scale(1.12); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-90px, 120px) scale(0.92); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(70px, -110px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
