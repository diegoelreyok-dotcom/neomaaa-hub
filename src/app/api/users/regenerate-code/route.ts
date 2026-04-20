import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUser, regenerateCode, updateUser } from '@/lib/db';
import { generateCode } from '@/lib/codes';

/**
 * POST /api/users/regenerate-code
 * Admin-only. Generates a fresh one-time code for a user, invalidating the
 * old code, and forces mustChangeCode=true so the user must rotate on first
 * login. Returns the plain code once — it's never visible again.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado', code: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado', code: 'FORBIDDEN' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Falta campo: id', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    const existing = await getUser(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Usuario no encontrado', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const newCode = generateCode();
    const stored = await regenerateCode(id, newCode);
    if (!stored) {
      return NextResponse.json(
        { error: 'Error al regenerar codigo', code: 'INTERNAL_ERROR' },
        { status: 500 }
      );
    }

    // Force rotation on first login so the admin-visible code is single-use.
    await updateUser(id, { mustChangeCode: true });

    return NextResponse.json({ code: newCode });
  } catch (error) {
    console.error('[users regenerate-code] error', error);
    return NextResponse.json(
      { error: 'Error al regenerar codigo', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
