import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/lib/db';

function generateCode(length = 6): string {
  // Use crypto for better randomness in code generation
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const users = await getAllUsers();
  // Strip loginCode hashes from response
  const safeUsers = users.map(({ loginCode, ...rest }) => rest);
  return NextResponse.json(safeUsers);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, name, roleId, lang, isActive } = body;

    if (!id || typeof id !== 'string' || !name || typeof name !== 'string' || !roleId || typeof roleId !== 'string') {
      return NextResponse.json(
        { error: 'Faltan campos: id, name, roleId' },
        { status: 400 }
      );
    }

    // Validate id format (alphanumeric + hyphens, max 50 chars)
    if (!/^[a-zA-Z0-9-]+$/.test(id) || id.length > 50) {
      return NextResponse.json(
        { error: 'ID invalido. Solo letras, numeros y guiones (max 50 caracteres)' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Nombre demasiado largo (max 100 caracteres)' },
        { status: 400 }
      );
    }

    // Validate lang
    const validLang = lang === 'ru' ? 'ru' : 'es';

    const code = generateCode();
    const result = await createUser(
      {
        id: id.toLowerCase(),
        name,
        roleId,
        lang: validLang,
        isActive: isActive !== undefined ? isActive : true,
      },
      code
    );

    // Return the user and the plain code (only time it's visible)
    const { loginCode, ...safeUser } = result.user;
    return NextResponse.json({ user: safeUser, code: result.code }, { status: 201 });
  } catch (error: any) {
    const message = error?.message === 'User already exists'
      ? 'Ya existe un usuario con ese ID'
      : 'Error al crear usuario';
    const status = error?.message === 'User already exists' ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Falta campo: id' }, { status: 400 });
    }

    // Only allow specific safe fields to be updated
    const allowedFields = ['name', 'roleId', 'lang', 'isActive'];
    const safeUpdates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        safeUpdates[field] = updates[field];
      }
    }

    // Validate lang if provided
    if (safeUpdates.lang && safeUpdates.lang !== 'es' && safeUpdates.lang !== 'ru') {
      return NextResponse.json({ error: 'Idioma invalido' }, { status: 400 });
    }

    const updated = await updateUser(id, safeUpdates);
    if (!updated) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const { loginCode, ...safeUser } = updated;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Falta parametro: id' }, { status: 400 });
    }

    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}
