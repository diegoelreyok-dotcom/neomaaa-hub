import Link from 'next/link';
import { getUserProgress } from '@/lib/db';
import { LEARNING_PATHS, computePathState } from '@/lib/learning-paths';
import { SECTIONS } from '@/lib/sections';
import type { Lang } from '@/lib/types';

interface Props {
  userId: string;
  roleId: string;
  lang: Lang;
}

/**
 * Server component. Renders "Tu Ruta de Aprendizaje" card with phase + next doc.
 * Returns null if the user has no path configured for their role.
 */
export default async function LearningPathCard({ userId, roleId, lang }: Props) {
  const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];
  if (!path) return null;

  const progressEntries = await getUserProgress(userId);
  const completedSet = new Set<string>(
    progressEntries
      .filter((p) => p.completed)
      .map((p) => p.documentPath.replace(/\.md$/, ''))
  );
  const state = computePathState(path, completedSet);

  // Resolve next doc title from SECTIONS
  let nextDocTitle: string | null = null;
  let nextDocHref: string | null = null;
  if (state.nextDoc) {
    const [section, slug] = state.nextDoc.docPath.split('/');
    nextDocHref = `/content/${section}/${slug}`;
    for (const s of SECTIONS) {
      if (s.id !== section) continue;
      const doc = s.documents.find((d) => d.slug === slug);
      if (doc) {
        nextDocTitle =
          lang === 'ru'
            ? doc.titleRu
            : lang === 'en'
              ? (doc.titleEn || doc.titleEs)
              : doc.titleEs;
        break;
      }
    }
  }

  const activePhase = state.phases.find((p) => p.isActive) ?? null;
  const activePhaseTitle = activePhase
    ? lang === 'ru'
      ? activePhase.phase.titleRu
      : activePhase.phase.titleEs
    : null;

  const pathTitle = lang === 'ru' ? path.titleRu : path.titleEs;

  const t = lang === 'ru'
    ? {
        kicker: 'Ваш путь обучения',
        continueBtn: 'Продолжить путь',
        nextUp: 'Следующий документ:',
        pathComplete: 'Путь завершён',
        seeBadge: 'Посмотреть значок',
        progressLabel: 'Прогресс',
      }
    : lang === 'en'
      ? {
          kicker: 'Your learning path',
          continueBtn: 'Continue path',
          nextUp: 'Next document:',
          pathComplete: 'Path complete',
          seeBadge: 'View badge',
          progressLabel: 'Progress',
        }
      : {
          kicker: 'Tu ruta de aprendizaje',
          continueBtn: 'Continuar ruta',
          nextUp: 'Siguiente documento:',
          pathComplete: 'Ruta completa',
          seeBadge: 'Ver badge',
          progressLabel: 'Progreso',
        };

  return (
    <div className="relative overflow-hidden rounded-xl border border-neo-primary/30 bg-gradient-to-br from-neo-primary/[0.06] to-neo-dark-2 p-5">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neo-primary mb-1.5">
            {t.kicker}
          </div>
          <h3 className="text-lg font-bold text-neo-text leading-tight mb-0.5">
            {pathTitle}
          </h3>
          {activePhaseTitle && !state.pathComplete && (
            <div className="text-[12px] text-neo-text-muted">
              {activePhaseTitle}
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-extrabold text-neo-primary">{state.percent}%</div>
          <div className="text-[10px] text-neo-text-muted uppercase tracking-wider">
            {state.completedCount} / {state.totalDocs}
          </div>
        </div>
      </div>

      <div className="h-2 bg-neo-dark-3 rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neo-primary/80 to-neo-primary transition-all duration-700 ease-out"
          style={{ width: `${state.percent}%` }}
        />
      </div>

      {state.pathComplete ? (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            {t.pathComplete}
          </div>
          <Link
            href="/learning"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-sm font-semibold transition-colors"
          >
            {t.seeBadge}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            {nextDocTitle && (
              <>
                <div className="text-[10px] text-neo-text-muted uppercase tracking-wider mb-0.5">
                  {t.nextUp}
                </div>
                <div className="text-sm text-neo-text-body truncate">{nextDocTitle}</div>
              </>
            )}
          </div>
          <Link
            href={nextDocHref || '/learning'}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neo-primary hover:bg-neo-primary-dark text-white text-sm font-semibold transition-colors flex-shrink-0"
          >
            {t.continueBtn}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
