import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getUserProgress } from '@/lib/db';
import {
  LEARNING_PATHS,
  computePathState,
} from '@/lib/learning-paths';
import { getRoleBadge } from '@/lib/role-badges';
import { SECTIONS } from '@/lib/sections';
import type { Lang } from '@/lib/types';
import LearningPathView from './LearningPathView';

export const dynamic = 'force-dynamic';

export default async function LearningPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = session.user as any;
  const lang: Lang = user.lang || 'es';
  const userId: string = user.userId;
  const userName: string = user.name || userId;
  const roleId: string = user.roleId || 'admin';

  const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];

  // Build doc title index so the client doesn't need to know the sections.
  const docTitles: Record<string, { es: string; ru: string }> = {};
  for (const section of SECTIONS) {
    for (const doc of section.documents) {
      docTitles[`${section.id}/${doc.slug}`] = {
        es: doc.titleEs,
        ru: doc.titleRu,
      };
    }
  }

  // Initial fetch (SWR hydrates from this).
  const progressEntries = await getUserProgress(userId);
  const completedSet = new Set<string>(
    progressEntries
      .filter((p) => p.completed)
      .map((p) => p.documentPath.replace(/\.md$/, ''))
  );
  const initialState = computePathState(path, completedSet);
  const initialBadge = await getRoleBadge(userId, path.roleId);

  return (
    <LearningPathView
      lang={lang}
      userName={userName}
      initialState={initialState}
      initialBadge={initialBadge}
      docTitles={docTitles}
    />
  );
}
