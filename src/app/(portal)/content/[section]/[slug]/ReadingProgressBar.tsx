'use client';

import { useEffect, useState } from 'react';

/**
 * Reading progress bar — gradient cyan → burgundy with glow + pulsing
 * leading edge. Tracks scroll progress, pinned to top of the viewport.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
      setProgress(pct);
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Track (subtle) */}
      <div
        aria-hidden
        className="neo-reading-progress-track pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        }}
      />

      {/* Actual bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de lectura"
        className="pointer-events-none fixed left-0 top-0 z-[61] h-[3px]"
        style={{
          width: `${progress}%`,
          background:
            'linear-gradient(90deg, #C94A5C 0%, #98283A 50%, #7A2030 100%)',
          boxShadow:
            '0 0 10px rgba(152, 40, 58, 0.5), 0 0 22px rgba(152, 40, 58, 0.35)',
          transition: 'width 0.08s linear',
        }}
      >
        {/* Leading edge glow + pulse */}
        {progress > 0 && (
          <span
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(152, 40, 58, 0.9))' }}
          >
            <span
              className="block rounded-full"
              style={{
                width: 10,
                height: 10,
                background:
                  'radial-gradient(circle, #FFFFFF 0%, #C94A5C 45%, rgba(152, 40, 58, 0) 75%)',
                animation: 'neo-reading-pulse 1.6s ease-in-out infinite',
              }}
            />
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes neo-reading-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.6);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
