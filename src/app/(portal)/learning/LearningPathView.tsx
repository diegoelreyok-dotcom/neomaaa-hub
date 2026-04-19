'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import type { LearningPathState, PhaseState } from '@/lib/learning-paths';
import type { RoleBadge } from '@/lib/role-badges';
import type { Lang } from '@/lib/types';
import MeshBackground from './MeshBackground';
import ProgressRing from './ProgressRing';

interface Props {
  lang: Lang;
  userName: string;
  initialState: LearningPathState;
  initialBadge: RoleBadge | null;
  docTitles: Record<string, { es: string; ru: string }>;
}

interface ApiResponse {
  state: LearningPathState;
  roleBadge: RoleBadge | null;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Gradient palette rotated per phase
const PHASE_COLORS = ['#98283A', '#C94A5C', '#7A2030', '#FBBF24', '#B33347'];

export default function LearningPathView({
  lang,
  userName: _userName,
  initialState,
  initialBadge,
  docTitles,
}: Props) {
  const { data } = useSWR<ApiResponse>('/api/learning/progress', fetcher, {
    fallbackData: { state: initialState, roleBadge: initialBadge },
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const state = data?.state ?? initialState;
  const badge = data?.roleBadge ?? initialBadge;
  const path = state.path;

  const t =
    lang === 'ru'
      ? {
          mission: 'Миссия',
          heading: 'Ваш путь',
          progress: 'Прогресс',
          overall: 'Общий прогресс',
          docsDone: (c: number, tot: number) => `${c} из ${tot} документов`,
          estHours: (h: number) => `≈ ${h} ч. обучения`,
          estHoursShort: 'Часов',
          remaining: 'Осталось',
          finalLabel: 'Финал:',
          phase: 'Фаза',
          locked: 'Заблокировано',
          completed: 'Завершено',
          active: 'Активная фаза',
          continue: 'Продолжить',
          continueHere: 'ПРОДОЛЖИТЬ ЗДЕСЬ',
          toUnlock: 'Завершите предыдущую фазу',
          docCompleted: 'Завершён',
          badgeLocked: (n: number) => `Осталось ${n} документов`,
          badgeEarned: 'Получено',
          pathCompleteTitle: 'Полный путь завершён',
          open: 'Открыть',
          modules: (n: number) => `${n} модулей`,
          ready: 'Готово к запуску',
          mapTitle: 'Карта миссии',
          startHere: 'Начать здесь',
        }
      : lang === 'en'
      ? {
          mission: 'Mission',
          heading: 'Your path',
          progress: 'Progress',
          overall: 'Overall progress',
          docsDone: (c: number, tot: number) => `${c} of ${tot} documents`,
          estHours: (h: number) => `≈ ${h} h of study`,
          estHoursShort: 'Hours',
          remaining: 'Remaining',
          finalLabel: 'Final:',
          phase: 'Phase',
          locked: 'Locked',
          completed: 'Completed',
          active: 'Active phase',
          continue: 'Continue',
          continueHere: 'CONTINUE HERE',
          toUnlock: 'Complete the previous phase',
          docCompleted: 'Completed',
          badgeLocked: (n: number) => `${n} documents remaining`,
          badgeEarned: 'Earned',
          pathCompleteTitle: 'Path complete',
          open: 'Open',
          modules: (n: number) => `${n} modules`,
          ready: 'Ready to launch',
          mapTitle: 'Mission map',
          startHere: 'Start here',
        }
      : {
          mission: 'Mision',
          heading: 'Tu ruta',
          progress: 'Progreso',
          overall: 'Progreso general',
          docsDone: (c: number, tot: number) => `${c} de ${tot} documentos`,
          estHours: (h: number) => `≈ ${h} h de estudio`,
          estHoursShort: 'Horas',
          remaining: 'Restante',
          finalLabel: 'Final:',
          phase: 'Fase',
          locked: 'Bloqueada',
          completed: 'Completado',
          active: 'Fase activa',
          continue: 'Continuar',
          continueHere: 'CONTINUAR AQUI',
          toUnlock: 'Completa la fase anterior',
          docCompleted: 'Completado',
          badgeLocked: (n: number) => `Faltan ${n} documentos`,
          badgeEarned: 'Obtenido',
          pathCompleteTitle: 'Ruta completa',
          open: 'Abrir',
          modules: (n: number) => `${n} modulos`,
          ready: 'Listo para despegar',
          mapTitle: 'Mapa de mision',
          startHere: 'Empezar aqui',
        };

  const title = lang === 'ru' ? path.titleRu : path.titleEs;
  const description = lang === 'ru' ? path.descriptionRu : path.descriptionEs;
  const finalBadgeTitle = lang === 'ru' ? path.finalBadge.titleRu : path.finalBadge.titleEs;
  const finalBadgeDesc = lang === 'ru'
    ? path.finalBadge.descriptionRu
    : path.finalBadge.descriptionEs;

  const remainingDocs = Math.max(0, state.totalDocs - state.completedCount);
  const etaHours = Math.max(
    0,
    Math.round((path.estimatedHours * remainingDocs) / Math.max(1, state.totalDocs))
  );

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
        className="relative"
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
                  'linear-gradient(135deg, #0A0E1A 0%, #1A0E1D 30%, #2E1220 55%, #0F1A28 100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 82% 30%, rgba(201,74,92,0.3), transparent 55%), radial-gradient(circle at 10% 80%, rgba(152,40,58,0.35), transparent 55%)',
              }}
            />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 px-6 sm:px-8 py-7 sm:py-8 flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-neo-primary/10 border border-neo-primary/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neo-primary" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-neo-primary uppercase">
                    {t.mission}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 140%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {title}
                  </span>
                </h1>
                <p className="text-neo-text-muted text-sm mt-2 max-w-2xl leading-relaxed">
                  {description}
                </p>

                {/* Stat chips */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="font-semibold text-white tabular-nums">{state.completedCount}</span>
                    <span className="text-neo-text-muted">/ {state.totalDocs}</span>
                    <span className="text-neo-text-muted/80">·</span>
                    <span className="text-neo-text-muted uppercase tracking-[0.12em] text-[10px]">{t.progress}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-semibold text-white tabular-nums">{etaHours}</span>
                    <span className="text-neo-text-muted uppercase tracking-[0.12em] text-[10px]">{t.estHoursShort}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 backdrop-blur-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    <span className="text-amber-300 text-[11px] font-medium">{finalBadgeTitle}</span>
                  </div>
                </div>
              </div>

              {/* Ring */}
              <div className="shrink-0 self-center lg:self-start">
                <ProgressRing percent={state.percent} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAP HEADER */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neo-primary">
            {t.mapTitle}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-neo-primary/40 via-white/5 to-transparent" />
        </motion.div>

        {/* ROADMAP TIMELINE */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[22px] sm:left-[26px] top-4 bottom-8 w-[2px] rounded-full pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(201,74,92,0.6), rgba(152,40,58,0.55), rgba(122,32,48,0.45), rgba(251,191,36,0.3))',
              boxShadow: '0 0 12px rgba(152,40,58,0.35)',
            }}
            aria-hidden
          />

          <div className="space-y-4">
            {state.phases.map((phaseState, idx) => (
              <motion.div
                key={phaseState.phase.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <PhaseNode
                  phaseState={phaseState}
                  index={idx}
                  lang={lang}
                  docTitles={docTitles}
                  t={t}
                  color={PHASE_COLORS[idx % PHASE_COLORS.length]}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINAL BADGE */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mt-8"
        >
          {state.pathComplete ? (
            <div
              className="relative overflow-hidden rounded-2xl border p-8 text-center"
              style={{
                borderColor: 'rgba(245,158,11,0.5)',
                background:
                  'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(152,40,58,0.08) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(245,158,11,0.2), transparent 60%)',
                }}
              />
              <div className="relative">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 relative"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.05) 80%)',
                    border: '1px solid rgba(245,158,11,0.5)',
                    boxShadow:
                      '0 0 30px rgba(245,158,11,0.35), inset 0 0 15px rgba(245,158,11,0.15)',
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-2">
                  {t.pathCompleteTitle}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FBBF24 140%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {finalBadgeTitle}
                </h2>
                <p className="text-sm text-neo-text-muted max-w-md mx-auto leading-relaxed mb-4">
                  {finalBadgeDesc}
                </p>
                {badge && (
                  <div className="text-[12px] text-neo-text-muted">
                    {t.badgeEarned}:{' '}
                    <span className="text-neo-text-body font-medium">
                      {new Date(badge.issuedAt).toLocaleDateString(
                        lang === 'ru' ? 'ru-RU' : 'es-ES',
                        { day: '2-digit', month: 'long', year: 'numeric' }
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-dashed p-6 text-center"
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                background:
                  'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-white/5 border border-white/10">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neo-text-muted mb-1.5">
                {t.finalLabel}
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {finalBadgeTitle}
              </div>
              <div className="text-[12px] text-neo-text-muted">
                {t.badgeLocked(remainingDocs)}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

// ---------------------------------------------------------------------------
// PhaseNode component
// ---------------------------------------------------------------------------

interface PhaseNodeProps {
  phaseState: PhaseState;
  index: number;
  lang: Lang;
  docTitles: Record<string, { es: string; ru: string }>;
  color: string;
  t: {
    phase: string;
    active: string;
    completed: string;
    locked: string;
    continue: string;
    continueHere: string;
    modules: (n: number) => string;
    toUnlock: string;
  };
}

function PhaseNode({ phaseState, index, lang, docTitles, color, t }: PhaseNodeProps) {
  const phase = phaseState.phase;
  const phaseTitle = lang === 'ru' ? phase.titleRu : phase.titleEs;
  const phaseDesc = lang === 'ru' ? phase.descriptionRu : phase.descriptionEs;

  const status: 'locked' | 'completed' | 'active' | 'available' = !phaseState.isUnlocked
    ? 'locked'
    : phaseState.isComplete
    ? 'completed'
    : phaseState.isActive
    ? 'active'
    : 'available';

  return (
    <div className="relative pl-12 sm:pl-14">
      {/* Node bullet (on the timeline) */}
      <div className="absolute left-0 top-4 flex items-center justify-center" style={{ width: 46, height: 46 }}>
        <NodeIcon status={status} index={index} color={color} />
      </div>

      {/* Card wrapper with optional gradient border */}
      <div
        className={`relative rounded-2xl ${status === 'active' ? 'shadow-lg' : ''}`}
        style={{
          padding: status === 'active' ? '1.5px' : '1px',
          background:
            status === 'active'
              ? `linear-gradient(135deg, ${color}, transparent 45%, ${color}88)`
              : status === 'completed'
              ? 'linear-gradient(135deg, rgba(152,40,58,0.4), transparent 50%, rgba(152,40,58,0.15))'
              : status === 'locked'
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.14), transparent 50%, rgba(255,255,255,0.06))',
        }}
      >
        {/* Pulse glow for active */}
        {status === 'active' && (
          <div
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${color}44 0%, transparent 70%)`,
              animation: 'nodePulse 2.5s ease-in-out infinite',
            }}
          />
        )}

        <div
          className={`relative rounded-2xl overflow-hidden ${status === 'locked' ? 'opacity-55' : ''}`}
          style={{
            background:
              'linear-gradient(135deg, rgba(18,22,38,0.72) 0%, rgba(8,11,22,0.72) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* HEADER */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neo-text-muted">
                    {t.phase} {index + 1}
                  </span>
                  {status === 'active' && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                      style={{
                        color,
                        background: `${color}18`,
                        border: `1px solid ${color}44`,
                      }}
                    >
                      {t.active}
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neo-primary bg-neo-primary/10 border border-neo-primary/30 px-1.5 py-0.5 rounded">
                      {t.completed}
                    </span>
                  )}
                  {status === 'locked' && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neo-text-muted bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                      {t.locked}
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {phaseTitle}
                </h2>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-white tabular-nums">
                  {phaseState.completedCount}
                  <span className="text-neo-text-muted">/{phaseState.totalDocs}</span>
                </div>
                <div className="text-[10px] text-neo-text-muted uppercase tracking-[0.12em] tabular-nums">
                  {phaseState.percent}%
                </div>
              </div>
            </div>
            <p className="text-[13px] text-neo-text-muted leading-relaxed">
              {phaseDesc}
            </p>

            {/* Meta row */}
            <div className="mt-3 flex items-center gap-3 text-[11px] text-neo-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {t.modules(phaseState.totalDocs)}
              </span>
            </div>

            {/* Mini progress bar */}
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${phaseState.percent}%`,
                  background:
                    status === 'completed'
                      ? 'linear-gradient(90deg, #98283A, #C94A5C)'
                      : `linear-gradient(90deg, ${color}, ${color}cc)`,
                  boxShadow:
                    status === 'active' ? `0 0 10px ${color}80` : undefined,
                }}
              />
            </div>
          </div>

          {/* DOC LIST */}
          <div className="p-3">
            {status === 'locked' && (
              <div className="px-3 py-2 text-[11px] text-neo-text-muted italic">
                {t.toUnlock}
              </div>
            )}
            {phase.docs.map((docPath, docIdx) => {
              const done = phaseState.completedDocs.includes(docPath);
              const titleRec = docTitles[docPath];
              const docTitleTxt = titleRec
                ? lang === 'ru'
                  ? titleRec.ru
                  : titleRec.es
                : docPath;
              const [section, slug] = docPath.split('/');
              const href = `/content/${section}/${slug}`;

              const isContinueDoc =
                phaseState.isActive &&
                !done &&
                phase.docs.slice(0, docIdx).every((d) =>
                  phaseState.completedDocs.includes(d)
                );

              if (status === 'locked') {
                return (
                  <div
                    key={docPath}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neo-text-muted text-sm"
                  >
                    <span className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0" />
                    <span className="truncate">{docTitleTxt}</span>
                  </div>
                );
              }

              return (
                <Link
                  key={docPath}
                  href={href}
                  className={`
                    group/doc flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                    transition-all duration-200
                    ${
                      done
                        ? 'text-neo-text-body hover:bg-white/5'
                        : isContinueDoc
                        ? 'bg-white/[0.04] text-white hover:bg-white/[0.08] font-medium'
                        : 'text-neo-text-body hover:bg-white/5'
                    }
                  `}
                  style={
                    isContinueDoc
                      ? {
                          boxShadow: `inset 0 0 0 1px ${color}44`,
                        }
                      : undefined
                  }
                >
                  {done ? (
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(16,185,129,0.2)',
                        boxShadow: '0 0 8px rgba(16,185,129,0.5)',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: isContinueDoc ? color : 'rgba(255,255,255,0.15)',
                        boxShadow: isContinueDoc ? `0 0 6px ${color}66` : undefined,
                      }}
                    />
                  )}
                  <span className="truncate flex-1">{docTitleTxt}</span>
                  {isContinueDoc && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] flex-shrink-0 uppercase"
                      style={{ color }}
                    >
                      {t.continueHere}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function NodeIcon({
  status,
  index,
  color,
}: {
  status: 'locked' | 'completed' | 'active' | 'available';
  index: number;
  color: string;
}) {
  if (status === 'completed') {
    return (
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center relative"
        style={{
          background: 'radial-gradient(circle, rgba(152,40,58,0.4) 0%, rgba(152,40,58,0.12) 80%)',
          border: '2px solid #98283A',
          boxShadow: '0 0 16px rgba(152,40,58,0.6), inset 0 0 8px rgba(152,40,58,0.25)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#98283A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}66 0%, transparent 70%)`,
            filter: 'blur(8px)',
            animation: 'nodeGlow 2.5s ease-in-out infinite',
          }}
        />
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center relative tabular-nums"
          style={{
            background: `radial-gradient(circle, ${color}33 0%, rgba(10,14,26,0.9) 85%)`,
            border: `2px solid ${color}`,
            color,
            fontWeight: 900,
            fontSize: 15,
            boxShadow: `0 0 18px ${color}80, inset 0 0 10px ${color}30`,
          }}
        >
          {index + 1}
        </div>
        <style jsx>{`
          @keyframes nodeGlow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50%      { opacity: 1;   transform: scale(1.18); }
          }
        `}</style>
      </div>
    );
  }

  if (status === 'locked') {
    return (
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
    );
  }

  // available (unlocked, not active)
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center tabular-nums"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '2px solid rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 800,
        fontSize: 14,
      }}
    >
      {index + 1}
    </div>
  );
}
