import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  recordAccess,
  getUserProgress,
  getAllProgress,
  markCompleted,
  getRole,
  getProgressEntry,
} from '@/lib/db';
import { LEARNING_PATHS, computePathState } from '@/lib/learning-paths';
import { getRoleBadge, saveRoleBadgeIfNotExists } from '@/lib/role-badges';

/** Minimum seconds between firstAccessed and completion via PATCH. */
const MIN_READ_SECONDS = 60;

/**
 * Check if the user has now completed their full learning path and emit a
 * role badge if so. Fire-and-forget from the PATCH handler — non-critical.
 */
async function maybeIssueRoleBadge(userId: string, userName: string, roleId: string): Promise<void> {
  try {
    const path = LEARNING_PATHS[roleId] || LEARNING_PATHS['admin'];
    if (!path) return;
    const existing = await getRoleBadge(userId, path.roleId);
    if (existing) return;
    const progressEntries = await getUserProgress(userId);
    const completedSet = new Set<string>(
      progressEntries
        .filter((p) => p.completed)
        .map((p) => p.documentPath.replace(/\.md$/, ''))
    );
    const state = computePathState(path, completedSet);
    if (!state.pathComplete) return;

    const role = await getRole(roleId).catch(() => null);
    const roleNameEs = role?.name || path.titleEs;
    const roleNameRu = role?.nameRu || path.titleRu;

    // Atomic-ish: only writes if no badge exists yet (prevents duplicates
    // when two PATCH requests land simultaneously).
    await saveRoleBadgeIfNotExists({
      userId,
      userName,
      roleId: path.roleId,
      pathId: path.roleId,
      roleNameEs,
      roleNameRu,
      titleEs: path.finalBadge.titleEs,
      titleRu: path.finalBadge.titleRu,
      issuedAt: new Date().toISOString(),
    });
  } catch {
    // non-critical
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const userId = (session.user as any).userId;
  const isAdmin = (session.user as any).isAdmin;

  // Admins can optionally request all users' progress via ?all=true
  const { searchParams } = new URL(req.url);
  const requestAll = searchParams.get('all') === 'true';

  const progress = (isAdmin && requestAll)
    ? await getAllProgress()
    : await getUserProgress(userId);

  return NextResponse.json(progress);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { documentPath } = body;

    if (!documentPath || typeof documentPath !== 'string') {
      return NextResponse.json(
        { error: 'Falta campo: documentPath' },
        { status: 400 }
      );
    }

    // Validate documentPath format (prevent arbitrary key injection)
    if (documentPath.length > 200 || !/^[a-zA-Z0-9_\-./]+$/.test(documentPath)) {
      return NextResponse.json(
        { error: 'documentPath invalido' },
        { status: 400 }
      );
    }

    const userId = (session.user as any).userId;
    await recordAccess(userId, documentPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al registrar progreso' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { documentPath, completed } = body;

    if (!documentPath || typeof documentPath !== 'string') {
      return NextResponse.json(
        { error: 'Falta campo: documentPath' },
        { status: 400 }
      );
    }

    // Validate documentPath format
    if (documentPath.length > 200 || !/^[a-zA-Z0-9_\-./]+$/.test(documentPath)) {
      return NextResponse.json(
        { error: 'documentPath invalido' },
        { status: 400 }
      );
    }

    if (completed !== true) {
      return NextResponse.json(
        { error: 'Solo se soporta completed: true' },
        { status: 400 }
      );
    }

    const user = session.user as any;
    const userId: string = user.userId;
    const userName: string = user.name || userId;
    const roleId: string = user.roleId || 'admin';
    const isAdmin: boolean = !!user.isAdmin;

    // 1. Section permission check (same as /api/quiz/start).
    if (!isAdmin && roleId !== 'admin') {
      const section = documentPath.split('/')[0];
      if (!section) {
        return NextResponse.json(
          { error: 'forbidden', message: 'No tienes acceso a esta sección' },
          { status: 403 }
        );
      }
      const role = await getRole(roleId).catch(() => null);
      const extraSections = (session.user as any).extraSections as string[] | undefined;
      const hasAccess =
        role && (
          role.sections.includes(section) ||
          (Array.isArray(extraSections) && extraSections.includes(section))
        );
      if (!hasAccess) {
        return NextResponse.json(
          { error: 'forbidden', message: 'No tienes acceso a esta sección' },
          { status: 403 }
        );
      }
    }

    // 2. Must have accessed the doc first (via POST).
    const existing = await getProgressEntry(userId, documentPath);
    if (!existing) {
      return NextResponse.json(
        {
          error: 'no_access',
          message: 'Debes leer el documento antes de marcarlo completado',
        },
        { status: 400 }
      );
    }

    // 3. Proof-of-reading heuristic: either multiple accesses OR >=60s since
    // first access. Prevents 1-tick "POST then PATCH" cheating.
    const firstAccessMs = Date.parse(existing.firstAccessed);
    const elapsedSec = Number.isFinite(firstAccessMs)
      ? Math.floor((Date.now() - firstAccessMs) / 1000)
      : 0;
    const enoughReads = (existing.accessCount || 0) >= 3;
    const enoughTime = elapsedSec >= MIN_READ_SECONDS;
    if (!enoughReads && !enoughTime) {
      return NextResponse.json(
        {
          error: 'read_too_fast',
          message: 'Debes pasar más tiempo leyendo antes de marcarlo completado',
          minSeconds: MIN_READ_SECONDS,
        },
        { status: 400 }
      );
    }

    const result = await markCompleted(userId, documentPath);

    // Fire-and-forget: check if path is now complete and emit badge.
    void maybeIssueRoleBadge(userId, userName, roleId);

    return NextResponse.json({ success: true, progress: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al marcar como completado' },
      { status: 500 }
    );
  }
}
