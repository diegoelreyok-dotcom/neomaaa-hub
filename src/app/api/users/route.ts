import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/lib/db';

function generateCode(length = 6): string {
  const chars = '0123456789';
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

    if (!id || !name || !roleId) {
      return NextResponse.json(
        { error: 'Faltan campos: id, name, roleId' },
        { status: 400 }
      );
    }

    const code = generateCode();
    const result = await createUser(
      {
        id,
        name,
        roleId,
        lang: lang || 'es',
        isActive: isActive !== undefined ? isActive : true,
      },
      code
    );

    // Return the user and the plain code (only time it's visible)
    const { loginCode, ...safeUser } = result.user;
    return NextResponse.json({ user: safeUser, code: result.code }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
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

    if (!id) {
      return NextResponse.json({ error: 'Falta campo: id' }, { status: 400 });
    }

    // Don't allow direct loginCode updates through this endpoint
    delete updates.loginCode;

    const updated = await updateUser(id, updates);
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
