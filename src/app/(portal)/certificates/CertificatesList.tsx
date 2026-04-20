'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Certificate } from '@/lib/quiz-types';
import type { Lang } from '@/lib/types';
import MeshBackground from './MeshBackground';
import MiniSparkline from './MiniSparkline';

interface Props {
  certs: Certificate[];
  lang: Lang;
  docIndex: Record<string, { sectionName: string; sectionNameRu: string; sectionNameEn: string }>;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** Build a 12-month series of cert counts, oldest → newest. */
function buildMonthlySeries(certs: Certificate[]): number[] {
  const months = 12;
  const series = new Array(months).fill(0);
  const now = new Date();
  const byMonth = new Map<string, number>();
  for (const c of certs) {
    const d = new Date(c.issuedAt);
    if (!Number.isFinite(d.getTime())) continue;
    const k = monthKey(d);
    byMonth.set(k, (byMonth.get(k) || 0) + 1);
  }
  for (let i = 0; i < months; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    series[i] = byMonth.get(monthKey(d)) || 0;
  }
  return series;
}

function avgScorePct(certs: Certificate[]): number {
  if (!certs.length) return 0;
  const sum = certs.reduce((acc, c) => acc + (c.score / Math.max(1, c.totalQuestions)) * 100, 0);
  return Math.round(sum / certs.length);
}

function bestScorePct(certs: Certificate[]): number {
  if (!certs.length) return 0;
  return Math.round(
    Math.max(...certs.map((c) => (c.score / Math.max(1, c.totalQuestions)) * 100))
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export default function CertificatesList({ certs, lang, docIndex }: Props) {
  const t = {
    es: {
      title: 'Galeria de Trofeos',
      subtitle: (n: number) =>
        n === 0
          ? 'Aun no has ganado trofeos'
          : n === 1
          ? '1 certificado en tu coleccion'
          : `${n} certificados en tu coleccion`,
      missionLabel: 'Coleccion',
      empty:
        'Aun no has obtenido certificados. Completa un modulo y aproba el quiz para conseguir tu primer trofeo.',
      emptyHeadline: 'Aun no tienes certificados',
      emptySub:
        'Completa modulos y aprueba los quizzes para obtener tu primer certificado oficial NEOMAAA Markets',
      emptyCta: 'Empezar mi ruta',
      section: 'Seccion',
      score: 'Puntaje',
      issued: 'Emitido',
      viewBtn: 'Ver / Descargar',
      totalLabel: 'Totales',
      avgLabel: 'Promedio',
      bestLabel: 'Mejor',
      perMonth: 'Por mes',
      certificateSmall: 'CERTIFICADO',
      verified: 'VERIFICADO',
    },
    ru: {
      title: 'Галерея трофеев',
      subtitle: (n: number) =>
        n === 0
          ? 'У вас пока нет трофеев'
          : n === 1
          ? '1 сертификат в вашей коллекции'
          : `${n} сертификатов в вашей коллекции`,
      missionLabel: 'Коллекция',
      empty:
        'У вас пока нет сертификатов. Пройдите модуль и сдайте квиз, чтобы получить первый трофей.',
      emptyHeadline: 'У вас пока нет сертификатов',
      emptySub:
        'Завершайте модули и сдавайте тесты, чтобы получить первый официальный сертификат NEOMAAA Markets',
      emptyCta: 'Начать путь',
      section: 'Раздел',
      score: 'Результат',
      issued: 'Выдан',
      viewBtn: 'Посмотреть / Скачать',
      totalLabel: 'Всего',
      avgLabel: 'Средний',
      bestLabel: 'Лучший',
      perMonth: 'По месяцам',
      certificateSmall: 'СЕРТИФИКАТ',
      verified: 'ПРОВЕРЕНО',
    },
    en: {
      title: 'Trophy Gallery',
      subtitle: (n: number) =>
        n === 0
          ? 'No trophies yet'
          : n === 1
          ? '1 certificate in your collection'
          : `${n} certificates in your collection`,
      missionLabel: 'Collection',
      empty:
        'You have no certificates yet. Complete a module and pass the quiz to earn your first trophy.',
      emptyHeadline: 'No certificates yet',
      emptySub:
        'Complete modules and pass the quizzes to earn your first official NEOMAAA Markets certificate',
      emptyCta: 'Start my path',
      section: 'Section',
      score: 'Score',
      issued: 'Issued',
      viewBtn: 'View / Download',
      totalLabel: 'Total',
      avgLabel: 'Average',
      bestLabel: 'Best',
      perMonth: 'Per month',
      certificateSmall: 'CERTIFICATE',
      verified: 'VERIFIED',
    },
  }[lang];

  const locale = lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'es-ES';
  const monthlySeries = buildMonthlySeries(certs);
  const avg = avgScorePct(certs);
  const best = bestScorePct(certs);

  return (
    <>
      <MeshBackground />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
          },
        }}
      >
        {/* HERO */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div className="relative overflow-hidden rounded-2xl mb-6 border border-white/10">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #0A0E1A 0%, #1F1412 35%, #2E1F0A 60%, #0F1A28 100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 85% 25%, rgba(251,191,36,0.22), transparent 55%), radial-gradient(circle at 10% 80%, rgba(152,40,58,0.25), transparent 55%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 px-6 sm:px-8 py-7 sm:py-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-[0.22em] text-amber-300 uppercase">
                      {t.missionLabel}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    <span
                      style={{
                        background:
                          'linear-gradient(135deg, #FFFFFF 0%, #FBBF24 140%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {t.title}
                    </span>
                  </h1>
                  <p className="text-neo-text-muted text-sm mt-2 max-w-xl leading-relaxed">
                    {t.subtitle(certs.length)}
                  </p>

                  {/* Stats row */}
                  <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                    <StatTile
                      label={t.totalLabel}
                      value={certs.length}
                      color="#FBBF24"
                    />
                    <StatTile
                      label={t.avgLabel}
                      value={avg}
                      suffix="%"
                      color="#98283A"
                    />
                    <StatTile
                      label={t.bestLabel}
                      value={best}
                      suffix="%"
                      color="#C94A5C"
                    />
                  </div>
                </div>

                {/* Sparkline panel */}
                <div className="shrink-0 w-full lg:w-auto">
                  <div
                    className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-4 min-w-[280px]"
                    style={{
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neo-text-muted">
                        {t.perMonth}
                      </span>
                      <span className="text-[10px] text-neo-text-muted tabular-nums">12M</span>
                    </div>
                    <MiniSparkline data={monthlySeries} color="#FBBF24" width={280} height={56} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GRID OR EMPTY STATE */}
        {certs.length === 0 ? (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <EmptyState
              headline={t.emptyHeadline}
              sub={t.emptySub}
              cta={t.emptyCta}
            />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {certs.map((cert, idx) => {
              const meta = docIndex[cert.docPath];
              const sectionName = meta
                ? lang === 'ru'
                  ? meta.sectionNameRu
                  : lang === 'en'
                    ? meta.sectionNameEn
                    : meta.sectionName
                : '—';
              const dateStr = new Date(cert.issuedAt).toLocaleDateString(locale, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
              const scorePct = Math.round(
                (cert.score / Math.max(1, cert.totalQuestions)) * 100
              );

              return (
                <motion.div
                  key={cert.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <TrophyCard
                    cert={cert}
                    idx={idx}
                    sectionName={sectionName}
                    dateStr={dateStr}
                    scorePct={scorePct}
                    lang={lang}
                    t={t}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}

// -----------------------------------------------------------------------------
// StatTile
// -----------------------------------------------------------------------------

function StatTile({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl px-3 py-2.5 border"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-baseline gap-0.5 mb-0.5">
        <span
          className="text-2xl font-black tabular-nums leading-none"
          style={{
            background: `linear-gradient(135deg, #FFFFFF 0%, ${color} 150%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-sm font-bold text-neo-text-muted/80">{suffix}</span>
        )}
      </div>
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neo-text-muted">
        {label}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TrophyCard
// -----------------------------------------------------------------------------

interface TrophyCardProps {
  cert: Certificate;
  idx: number;
  sectionName: string;
  dateStr: string;
  scorePct: number;
  lang: Lang;
  t: {
    section: string;
    score: string;
    issued: string;
    viewBtn: string;
    certificateSmall: string;
    verified: string;
  };
}

function TrophyCard({
  cert,
  idx: _idx,
  sectionName,
  dateStr,
  scorePct,
  lang,
  t,
}: TrophyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl overflow-hidden h-full"
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: '1px',
          background:
            'linear-gradient(135deg, rgba(251,191,36,0.5), transparent 35%, rgba(152,40,58,0.45) 65%, rgba(251,191,36,0.35))',
        }}
      >
        <div
          className="w-full h-full rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(18,22,38,0.85) 0%, rgba(8,11,22,0.85) 100%)',
          }}
        />
      </div>

      {/* Shimmer band */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 h-full w-1/3"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.15) 50%, transparent 100%)',
            animation: 'shimmer 1.6s ease-in-out infinite',
          }}
        />
      </div>

      <Link
        href={`/certificates/${cert.id}`}
        className="relative block backdrop-blur-xl"
      >
        {/* Seal preview — holographic mini certificate */}
        <div
          className="relative aspect-[1123/794] w-full overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #FAFAF7 0%, #F5F3EB 60%, #EADBB7 100%)',
          }}
        >
          {/* Holographic shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 48%, transparent 70%)',
              mixBlendMode: 'overlay',
              animation: 'holo 5s ease-in-out infinite',
            }}
          />
          {/* Double border frame */}
          <div
            className="absolute"
            style={{
              inset: 10,
              border: '3px solid #98283A',
              boxShadow: 'inset 0 0 0 1px rgba(251,191,36,0.6)',
            }}
          />
          {/* Corner ornaments */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: '#98283A',
                fontWeight: 800,
              }}
            >
              {t.certificateSmall}
            </div>
            <div
              style={{
                width: '50px',
                height: '1px',
                background: '#98283A',
                margin: '6px auto 8px',
              }}
            />
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(15px, 2.2vw, 22px)',
                color: '#98283A',
                fontStyle: 'italic',
                lineHeight: 1.1,
                maxWidth: '85%',
              }}
            >
              {cert.userName}
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#0A0E1A',
                maxWidth: '82%',
                lineHeight: 1.3,
                marginTop: '8px',
              }}
            >
              {cert.docTitle}
            </div>

            {/* Verified seal */}
            <div
              className="absolute"
              style={{
                bottom: 18,
                right: 22,
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '2px solid #98283A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(250,250,247,0.9) 80%)',
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: '0.1em',
                  color: '#98283A',
                  fontWeight: 900,
                  textAlign: 'center',
                  lineHeight: 1.1,
                }}
              >
                {t.verified}
              </div>
            </div>

            {/* Score chip */}
            <div
              className="absolute"
              style={{
                top: 18,
                right: 22,
                padding: '4px 10px',
                borderRadius: 999,
                background: '#98283A',
                color: 'white',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                boxShadow: '0 4px 10px rgba(152,40,58,0.4)',
              }}
            >
              {scorePct}%
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400/80 mb-1">
                {sectionName}
              </div>
              <div className="text-[15px] font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                {cert.docTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neo-text-muted mb-3">
            <span className="inline-flex items-center gap-1 tabular-nums">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-white font-semibold">
                {cert.score}/{cert.totalQuestions}
              </span>
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dateStr}
            </span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-amber-300 group-hover:gap-2.5 transition-all"
          >
            {t.viewBtn}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Hover halo */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.25) 0%, transparent 60%)',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(420%); }
        }
        @keyframes holo {
          0%, 100% { transform: translateX(-40%); }
          50%      { transform: translateX(40%); }
        }
      `}</style>
    </motion.div>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: '#FBBF24',
    borderStyle: 'solid',
    borderWidth: 0,
    ...{
      tl: { top: 16, left: 16, borderTopWidth: 2, borderLeftWidth: 2 },
      tr: { top: 16, right: 16, borderTopWidth: 2, borderRightWidth: 2 },
      bl: { bottom: 16, left: 16, borderBottomWidth: 2, borderLeftWidth: 2 },
      br: { bottom: 16, right: 16, borderBottomWidth: 2, borderRightWidth: 2 },
    }[pos],
  };
  return <div style={style} />;
}

// -----------------------------------------------------------------------------
// EmptyState
// -----------------------------------------------------------------------------

function EmptyState({
  headline,
  sub,
  cta,
}: {
  headline: string;
  sub: string;
  cta: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-10 sm:p-14 text-center"
      style={{
        borderColor: 'rgba(201,74,92,0.3)',
        background:
          'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(201,74,92,0.22) 0%, transparent 55%)',
        }}
      />

      <div className="relative">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-5 relative"
          style={{
            background:
              'radial-gradient(circle, rgba(201,74,92,0.35) 0%, transparent 85%)',
            border: '1px solid rgba(201,74,92,0.55)',
            boxShadow:
              '0 0 36px rgba(201,74,92,0.4), inset 0 0 18px rgba(201,74,92,0.22)',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C94A5C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
          {headline}
        </h2>
        <p className="text-white/70 text-[14px] sm:text-[15px] mb-6 max-w-lg mx-auto leading-relaxed">
          {sub}
        </p>

        <Link
          href="/learning"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #98283A 0%, #C94A5C 100%)',
            color: '#FFFFFF',
            boxShadow:
              '0 0 20px rgba(152,40,58,0.55), 0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
