'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HolographicOrb from './HolographicOrb';
import type { Lang } from '@/lib/types';

interface HeroSectionProps {
  userName: string;
  roleName: string;
  lang: Lang;
  launchDateIso: string; // ISO date string of target go-live
}

const T = {
  es: {
    morning: 'Buenos dias',
    afternoon: 'Buenas tardes',
    evening: 'Buenas noches',
    subtitle: 'Portal interno del equipo NEOMAAA',
    daysTo: 'dias al go-live',
    dayTo: 'dia al go-live',
    live: 'EN VIVO',
    dubaiTime: 'Hora Dubai',
  },
  ru: {
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    subtitle: 'Внутренний портал команды NEOMAAA',
    daysTo: 'дней до запуска',
    dayTo: 'день до запуска',
    live: 'В ЭФИРЕ',
    dubaiTime: 'Время Дубай',
  },
  en: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    subtitle: 'NEOMAAA team internal portal',
    daysTo: 'days to go-live',
    dayTo: 'day to go-live',
    live: 'LIVE',
    dubaiTime: 'Dubai time',
  },
};

export default function HeroSection({ userName, roleName, lang, launchDateIso }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  const t = T[lang] || T.es;

  // Clock ticking — update every second
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const count = window.innerWidth < 768 ? 0 : 30;
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.1,
      }));
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);
      // Connecting lines within threshold
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 74, 92, ${p.a})`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 10000) {
            const alpha = (1 - d2 / 10000) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(152, 40, 58, ${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    resize();
    seed();
    step();

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const hour = now ? now.getHours() : 8;
  const greeting = hour < 12 ? t.morning : hour < 19 ? t.afternoon : t.evening;

  // Dubai time (UTC+4)
  const dubai = now
    ? new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
    : '--:--:--';

  // Countdown
  const launchDate = new Date(launchDateIso);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysToLaunch = Math.max(0, Math.ceil((launchDate.getTime() - today.getTime()) / msPerDay));

  return (
    <div className="relative overflow-hidden rounded-2xl mb-6 border border-neo-dark-3/60">
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0A0E1A 0%, #1A0E1D 30%, #2E1220 55%, #0F1A28 100%)',
        }}
      />
      {/* Soft burgundy radial */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 18% 50%, rgba(152,40,58,0.4), transparent 55%), radial-gradient(circle at 82% 20%, rgba(201,74,92,0.25), transparent 60%)',
        }}
      />
      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' seed='3'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-8 py-8 sm:py-9 flex flex-col lg:flex-row gap-6 items-start justify-between">
        {/* Left: Greeting + clock */}
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-neo-success/10 border border-neo-success/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neo-success" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] text-neo-success">
              {t.live}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            {greeting},{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 50%, #98283A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {userName}
            </span>
          </h1>
          <p className="text-neo-text-muted text-sm mt-2 max-w-xl">{t.subtitle}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#C94A5C' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-mono text-white tabular-nums tracking-wider">{dubai}</span>
              <span className="text-neo-text-muted/70">{t.dubaiTime}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neo-text-muted">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
              </svg>
              <span className="text-neo-text-secondary">{roleName}</span>
            </div>
          </div>
        </div>

        {/* Right: Orb + Countdown */}
        <div className="shrink-0 flex items-center gap-5">
          <HolographicOrb />
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-xl blur opacity-60"
              style={{ background: 'linear-gradient(135deg, rgba(152,40,58,0.4), rgba(122,32,48,0.4))' }}
            />
            <div
              className="relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 min-w-[150px] text-center"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="text-[10px] font-bold tracking-[0.25em] text-neo-text-muted uppercase mb-1">
                Go-Live
              </div>
              <motion.div
                key={daysToLaunch}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="text-5xl font-black leading-none tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF, #C94A5C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {daysToLaunch}
              </motion.div>
              <div className="text-[11px] text-neo-text-muted mt-1">
                {daysToLaunch === 1 ? t.dayTo : t.daysTo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
