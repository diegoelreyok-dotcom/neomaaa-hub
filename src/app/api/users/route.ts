import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { revalidateTag } from 'next/cache';
import { auth } from '@/lib/auth';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteAllProgressForUser,
} from '@/lib/db';
import { deleteAllCertsForUser } from '@/lib/quiz-storage';
import { deleteAllBadgesForUser } from '@/lib/role-badges';

function generateCode(length = 6): string {
  // Crypto-secure RNG (randomInt) — Math.random() is predictable.
  // Ambiguous chars (0/O, 1/l/I) kept out for readability.
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(randomInt(0, chars.length));
  }
  return code;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado', code: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado', code: 'FORBIDDEN' }, { status: 403 });
  }

  const users = await getAllUsers();
  // Strip loginCode hashes from response
  const safeUsers = users.map(({ loginCode, ...rest }) => rest);
  return NextResponse.json(safeUsers);
}

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
    const { id, name, roleId, lang, isActive, email, extraSections } = body;

    if (!id || typeof id !== 'string' || !name || typeof name !== 'string' || !roleId || typeof roleId !== 'string') {
      return NextResponse.json(
        { error: 'Faltan campos: id, name, roleId', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Validate id format (alphanumeric + hyphens, max 50 chars)
    if (!/^[a-zA-Z0-9-]+$/.test(id) || id.length > 50) {
      return NextResponse.json(
        { error: 'ID invalido. Solo letras, numeros y guiones (max 50 caracteres)', code: 'INVALID_ID_FORMAT' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Nombre demasiado largo (max 100 caracteres)', code: 'NAME_TOO_LONG' },
        { status: 400 }
      );
    }

    // Validate lang
    const validLang: 'es' | 'ru' | 'en' = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'es';

    const validExtraSections = Array.isArray(extraSections)
      ? extraSections.filter((s: unknown) => typeof s === 'string')
      : undefined;

    const code = generateCode();
    const result = await createUser(
      {
        id: id.toLowerCase(),
        name,
        roleId,
        lang: validLang,
        isActive: isActive !== undefined ? isActive : true,
        ...(typeof email === 'string' && email.trim() ? { email: email.trim() } : {}),
        ...(validExtraSections ? { extraSections: validExtraSections } : {}),
      },
      code
    );

    // Return the user and the plain code (only time it's visible)
    const { loginCode, ...safeUser } = result.user;
    return NextResponse.json({ user: safeUser, code: result.code }, { status: 201 });
  } catch (error: any) {
    const isDup = error?.message === 'User already exists';
    const message = isDup ? 'Ya existe un usuario con ese ID' : 'Error al crear usuario';
    const code = isDup ? 'USER_ALREADY_EXISTS' : 'INTERNAL_ERROR';
    const status = isDup ? 409 : 500;
    return NextResponse.json({ error: message, code }, { status });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado', code: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado', code: 'FORBIDDEN' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Falta campo: id', code: 'MISSING_FIELDS' }, { status: 400 });
    }

    // Only allow specific safe fields to be updated
    const allowedFields = ['name', 'roleId', 'lang', 'isActive', 'email', 'extraSections'];
    const safeUpdates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        safeUpdates[field] = updates[field];
      }
    }

    // Validate extraSections is array of strings
    if (safeUpdates.extraSections !== undefined) {
      if (!Array.isArray(safeUpdates.extraSections) ||
          !safeUpdates.extraSections.every((s: unknown) => typeof s === 'string')) {
        return NextResponse.json(
          { error: 'extraSections debe ser un array de strings', code: 'INVALID_EXTRA_SECTIONS' },
          { status: 400 }
        );
      }
    }

    // Validate email format if provided
    if (safeUpdates.email !== undefined && safeUpdates.email !== null) {
      if (typeof safeUpdates.email !== 'string' || safeUpdates.email.length > 200) {
        return NextResponse.json({ error: 'Email invalido', code: 'INVALID_EMAIL' }, { status: 400 });
      }
    }

    // Validate lang if provided
    if (
      safeUpdates.lang &&
      safeUpdates.lang !== 'es' &&
      safeUpdates.lang !== 'ru' &&
      safeUpdates.lang !== 'en'
    ) {
      return NextResponse.json({ error: 'Idioma invalido', code: 'INVALID_LANG' }, { status: 400 });
    }

    const updated = await updateUser(id, safeUpdates);
    if (!updated) {
      return NextResponse.json({ error: 'Usuario no encontrado', code: 'USER_NOT_FOUND' }, { status: 404 });
    }

    const { loginCode, ...safeUser } = updated;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar usuario', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado', code: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado', code: 'FORBIDDEN' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Falta parametro: id', code: 'MISSING_FIELDS' }, { status: 400 });
    }

    // Prevent admin from deleting themselves.
    const selfId = (session.user as any).userId as string | undefined;
    if (selfId && selfId === id) {
      return NextResponse.json(
        { error: 'No puedes eliminar tu propio usuario', code: 'CANNOT_DELETE_SELF' },
        { status: 400 }
      );
    }

    // Cascade delete: clean up all per-user KV state BEFORE removing the
    // user record, so an intermediate failure never leaves a live user
    // with broken references.
    const certs = await deleteAllCertsForUser(id).catch((err) => {
      console.error('[users DELETE] cert cascade failed', id, err);
      return 0;
    });
    const badges = await deleteAllBadgesForUser(id).catch((err) => {
      console.error('[users DELETE] badge cascade failed', id, err);
      return 0;
    });
    const progress = await deleteAllProgressForUser(id).catch((err) => {
      console.error('[users DELETE] progress cascade failed', id, err);
      return 0;
    });

    await deleteUser(id);

    console.log(
      `[users DELETE] ${id} — removed user + ${certs} certs + ${badges} badges + ${progress} progress records`
    );

    return NextResponse.json({
      success: true,
      cascade: { certs, badges, progress },
    });
  } catch (error) {
    console.error('[users DELETE] error', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
