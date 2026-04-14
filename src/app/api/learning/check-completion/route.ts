import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserProgress, getRole } from '@/lib/db';
import {
  LEARNING_PATHS,
  computePathState,
} from '@/lib/learning-paths';
import { getRoleBadge, saveRoleBadge } from '@/lib/role-badges';

export const dynamic = 'force-dynamic';

/**
 * POST /api/learning/check-completion
 *
 * Checks if the authenticated user has completed their full learning path.
 * If yes and no badge exists yet, emits the role badge. Fire-and-forget safe.
 *
 * Returns: { pathComplete, badgeIssued, badge? }
 */
export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = session.user as any;
  const userId: string = user.userId;
  const userName: string = user.name || userId;
  const roleId: string = user.roleId || 'admin';

  const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];
  if (!path) {
    return NextResponse.json({ pathComplete: false, badgeIssued: false });
  }

  const progressEntries = await getUserProgress(userId);
  const completedSet = new Set<string>(
    progressEntries
      .filter((p) => p.completed)
      .map((p) => p.documentPath.replace(/\.md$/, ''))
  );

  const state = computePathState(path, completedSet);

  if (!state.pathComplete) {
    return NextResponse.json({ pathComplete: false, badgeIssued: false });
  }

  // Already issued?
  const existing = await getRoleBadge(userId, path.roleId);
  if (existing) {
    return NextResponse.json({ pathComplete: true, badgeIssued: false, badge: existing });
  }

  // Resolve role display name from DB (best effort)
  const role = await getRole(roleId).catch(() => null);
  const roleNameEs = role?.name || path.titleEs;
  const roleNameRu = role?.nameRu || path.titleRu;

  const badge = {
    userId,
    userName,
    roleId: path.roleId,
    pathId: path.roleId,
    roleNameEs,
    roleNameRu,
    titleEs: path.finalBadge.titleEs,
    titleRu: path.finalBadge.titleRu,
    issuedAt: new Date().toISOString(),
  };

  await saveRoleBadge(badge);

  return NextResponse.json({ pathComplete: true, badgeIssued: true, badge });
}
