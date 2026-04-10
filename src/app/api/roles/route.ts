import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllRoles, createRole, updateRole, deleteRole } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const roles = await getAllRoles();
  return NextResponse.json(roles);
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
    const { id, name, nameRu, sections, isAdmin } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Faltan campos: id, name' },
        { status: 400 }
      );
    }

    const role = await createRole({
      id,
      name,
      nameRu: nameRu || name,
      sections: sections || [],
      isAdmin: isAdmin || false,
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear rol' },
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

    const updated = await updateRole(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Rol no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar rol' },
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

    await deleteRole(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar rol' },
      { status: 500 }
    );
  }
}
