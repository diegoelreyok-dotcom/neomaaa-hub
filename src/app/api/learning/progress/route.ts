import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserProgress } from '@/lib/db';
import {
  LEARNING_PATHS,
  computePathState,
  type LearningPathState,
} from '@/lib/learning-paths';
import { getRoleBadge } from '@/lib/role-badges';

export const dynamic = 'force-dynamic';

/**
 * GET /api/learning/progress
 *
 * Returns the current LearningPathState for the authenticated user's role,
 * plus the role badge (if any) once the path is fully completed.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = session.user as any;
  const userId: string = user.userId;
  const roleId: string = user.roleId || 'admin';

  // Pick the path for the user's role. Fall back to admin (the most complete
  // path) if we don't have a curated one for this role.
  const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];
  if (!path) {
    return NextResponse.json({ error: 'No hay ruta para este rol' }, { status: 404 });
  }

  // Build the completed set. Progress docPath comes as "section/slug.md",
  // but path docs are "section/slug" without extension — normalize.
  const progressEntries = await getUserProgress(userId);
  const completedSet = new Set<string>(
    progressEntries
      .filter((p) => p.completed)
      .map((p) => p.documentPath.replace(/\.md$/, ''))
  );

  const state: LearningPathState = computePathState(path, completedSet);

  // Check for an already-emitted role badge
  const badge = await getRoleBadge(userId, path.roleId);

  return NextResponse.json({
    state,
    roleBadge: badge,
  });
}
