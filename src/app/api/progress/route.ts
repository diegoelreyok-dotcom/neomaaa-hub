import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { recordAccess, getUserProgress, getAllProgress, markCompleted } from '@/lib/db';

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

    const userId = (session.user as any).userId;
    const result = await markCompleted(userId, documentPath);

    return NextResponse.json({ success: true, progress: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al marcar como completado' },
      { status: 500 }
    );
  }
}
