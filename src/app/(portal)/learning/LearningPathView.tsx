'use client';

import Link from 'next/link';
import useSWR from 'swr';
import type { LearningPathState } from '@/lib/learning-paths';
import type { RoleBadge } from '@/lib/role-badges';
import type { Lang } from '@/lib/types';

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

export default function LearningPathView({
  lang,
  userName,
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

  const t = lang === 'ru'
    ? {
        heading: 'Ваш путь',
        progress: 'Прогресс',
        docsDone: (c: number, tot: number) => `${c} из ${tot} документов`,
        estHours: (h: number) => `≈ ${h} ч. обучения`,
        finalLabel: 'Финал:',
        phase: 'Фаза',
        locked: 'Заблокировано',
        completed: 'Завершено',
        active: 'Активная фаза',
        continue: 'Продолжить',
        toUnlock: 'Завершите предыдущую фазу',
        docCompleted: 'Завершён',
        badgeLocked: (n: number) => `Осталось ${n} документов`,
        badgeEarned: 'Получено',
        downloadBadge: 'Скачать PDF значка',
        pathCompleteTitle: 'Полный путь завершён',
        open: 'Открыть',
      }
    : lang === 'en'
      ? {
          heading: 'Your path',
          progress: 'Progress',
          docsDone: (c: number, tot: number) => `${c} of ${tot} documents`,
          estHours: (h: number) => `≈ ${h} h of study`,
          finalLabel: 'Final:',
          phase: 'Phase',
          locked: 'Locked',
          completed: 'Completed',
          active: 'Active phase',
          continue: 'Continue',
          toUnlock: 'Complete the previous phase',
          docCompleted: 'Completed',
          badgeLocked: (n: number) => `${n} documents remaining`,
          badgeEarned: 'Earned',
          downloadBadge: 'Download badge PDF',
          pathCompleteTitle: 'Path complete',
          open: 'Open',
        }
      : {
          heading: 'Tu ruta',
          progress: 'Progreso',
          docsDone: (c: number, tot: number) => `${c} de ${tot} documentos`,
          estHours: (h: number) => `≈ ${h} h de estudio`,
          finalLabel: 'Final:',
          phase: 'Fase',
          locked: 'Bloqueada',
          completed: 'Completado',
          active: 'Fase activa',
          continue: 'Continuar',
          toUnlock: 'Completa la fase anterior',
          docCompleted: 'Completado',
          badgeLocked: (n: number) => `Faltan ${n} documentos`,
          badgeEarned: 'Obtenido',
          downloadBadge: 'Descargar badge PDF',
          pathCompleteTitle: 'Ruta completa',
          open: 'Abrir',
        };

  const title = lang === 'ru' ? path.titleRu : path.titleEs;
  const description = lang === 'ru' ? path.descriptionRu : path.descriptionEs;
  const finalBadgeTitle = lang === 'ru' ? path.finalBadge.titleRu : path.finalBadge.titleEs;
  const finalBadgeDesc = lang === 'ru'
    ? path.finalBadge.descriptionRu
    : path.finalBadge.descriptionEs;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neo-primary/80 pt-1">
            {t.heading}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neo-text tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-neo-text-muted text-sm max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress bar card */}
      <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-extrabold text-neo-text">
              {state.completedCount}
              <span className="text-base font-medium text-neo-text-muted ml-1">
                / {state.totalDocs}
              </span>
            </div>
            <div className="text-[11px] text-neo-text-muted font-medium uppercase tracking-wider mt-0.5">
              {t.progress}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-neo-primary">{state.percent}%</div>
          </div>
        </div>
        <div className="h-3 bg-neo-dark-3 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neo-primary/80 to-neo-primary transition-all duration-700 ease-out"
            style={{ width: `${state.percent}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neo-dark-3/60 text-neo-text-muted border border-neo-dark-4/40">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {t.estHours(path.estimatedHours)}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/20">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            {t.finalLabel} {finalBadgeTitle}
          </span>
        </div>
      </div>

      {/* Phases list */}
      <div className="space-y-4">
        {state.phases.map((phaseState, idx) => {
          const phase = phaseState.phase;
          const phaseTitle = lang === 'ru' ? phase.titleRu : phase.titleEs;
          const phaseDesc = lang === 'ru' ? phase.descriptionRu : phase.descriptionEs;

          // Determine visual state
          const borderColor = !phaseState.isUnlocked
            ? 'border-neo-dark-3/60'
            : phaseState.isComplete
              ? 'border-neo-success/40'
              : phaseState.isActive
                ? 'border-neo-primary'
                : 'border-neo-dark-3/60';

          const bgColor = phaseState.isActive
            ? 'bg-gradient-to-br from-neo-primary/5 to-neo-dark-2'
            : 'bg-neo-dark-2';

          const opacityCls = !phaseState.isUnlocked ? 'opacity-60' : 'opacity-100';

          return (
            <div
              key={phase.id}
              className={`
                ${bgColor} ${borderColor} ${opacityCls}
                border-2 rounded-xl overflow-hidden
                transition-all duration-300
              `}
            >
              {/* Phase header */}
              <div className="p-5 border-b border-neo-dark-3/40">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status icon */}
                    {!phaseState.isUnlocked ? (
                      <span className="w-10 h-10 rounded-lg bg-neo-dark-3/60 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-neo-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                    ) : phaseState.isComplete ? (
                      <span className="w-10 h-10 rounded-lg bg-neo-success/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-neo-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className="w-10 h-10 rounded-lg bg-neo-primary/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-neo-primary font-extrabold text-lg">{idx + 1}</span>
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neo-text-muted">
                          {t.phase} {idx + 1}
                        </span>
                        {phaseState.isActive && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neo-primary bg-neo-primary/10 px-1.5 py-0.5 rounded">
                            {t.active}
                          </span>
                        )}
                        {phaseState.isComplete && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neo-success bg-neo-success/10 px-1.5 py-0.5 rounded">
                            {t.completed}
                          </span>
                        )}
                        {!phaseState.isUnlocked && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neo-text-muted bg-neo-dark-3/60 px-1.5 py-0.5 rounded">
                            {t.locked}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-neo-text leading-tight">
                        {phaseTitle}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-neo-text">
                      {phaseState.completedCount}/{phaseState.totalDocs}
                    </div>
                    <div className="text-[10px] text-neo-text-muted uppercase tracking-wider">
                      {phaseState.percent}%
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-neo-text-muted leading-relaxed">
                  {phaseDesc}
                </p>

                {/* Phase mini progress bar */}
                <div className="mt-3 h-1.5 bg-neo-dark-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      phaseState.isComplete
                        ? 'bg-neo-success'
                        : phaseState.isActive
                          ? 'bg-neo-primary'
                          : 'bg-neo-text-muted/40'
                    }`}
                    style={{ width: `${phaseState.percent}%` }}
                  />
                </div>
              </div>

              {/* Docs list */}
              <div className="p-3">
                {phase.docs.map((docPath, docIdx) => {
                  const done = phaseState.completedDocs.includes(docPath);
                  const title = docTitles[docPath];
                  const docTitleTxt = title ? (lang === 'ru' ? title.ru : title.es) : docPath;
                  const [section, slug] = docPath.split('/');
                  const href = `/content/${section}/${slug}`;

                  // The first non-done doc in the active phase is the "Continue" doc
                  const isContinueDoc =
                    phaseState.isActive &&
                    !done &&
                    phase.docs.slice(0, docIdx).every((d) => phaseState.completedDocs.includes(d));

                  if (!phaseState.isUnlocked) {
                    return (
                      <div
                        key={docPath}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neo-text-muted text-sm"
                      >
                        <span className="w-5 h-5 rounded-full border border-neo-dark-4 flex-shrink-0" />
                        <span className="truncate">{docTitleTxt}</span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={docPath}
                      href={href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                        transition-all duration-200
                        ${done
                          ? 'text-neo-text-body hover:bg-neo-dark-3/40'
                          : isContinueDoc
                            ? 'bg-neo-primary/10 text-neo-text hover:bg-neo-primary/15 font-medium'
                            : 'text-neo-text-body hover:bg-neo-dark-3/40'
                        }
                      `}
                    >
                      {done ? (
                        <span className="w-5 h-5 rounded-full bg-neo-success/20 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      ) : (
                        <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${isContinueDoc ? 'border-neo-primary' : 'border-neo-dark-4'}`} />
                      )}
                      <span className="truncate flex-1">{docTitleTxt}</span>
                      {isContinueDoc && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neo-primary flex-shrink-0">
                          {t.continue}
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
          );
        })}
      </div>

      {/* Final badge */}
      <div className="mt-8">
        {state.pathComplete ? (
          <div
            className="relative overflow-hidden rounded-2xl border-2 p-8 text-center"
            style={{
              borderColor: '#F59E0B',
              background:
                'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(152,40,58,0.05) 100%)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at 30% 20%, rgba(245,158,11,0.15), transparent 60%)',
            }} />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-amber-400/15 border border-amber-400/40">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">
                {t.pathCompleteTitle}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neo-text mb-2">
                {finalBadgeTitle}
              </h2>
              <p className="text-sm text-neo-text-muted max-w-md mx-auto leading-relaxed mb-4">
                {finalBadgeDesc}
              </p>
              {badge && (
                <div className="text-[12px] text-neo-text-muted mb-5">
                  {t.badgeEarned}:{' '}
                  <span className="text-neo-text-body font-medium">
                    {new Date(badge.issuedAt).toLocaleDateString(
                      lang === 'ru' ? 'ru-RU' : 'es-ES',
                      { day: '2-digit', month: 'long', year: 'numeric' }
                    )}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center gap-3 text-[13px] text-neo-text-muted">
                {userName}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-neo-dark-3/80 p-6 text-center bg-neo-dark-2/40">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-neo-dark-3/60">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-neo-text-muted mb-1.5">
              {t.finalLabel}
            </div>
            <div className="text-lg font-bold text-neo-text-body mb-1">
              {finalBadgeTitle}
            </div>
            <div className="text-[12px] text-neo-text-muted">
              {t.badgeLocked(state.totalDocs - state.completedCount)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
