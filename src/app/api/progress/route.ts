import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { recordAccess, getUserProgress, getAllProgress } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const userId = (session.user as any).userId;
  const isAdmin = (session.user as any).isAdmin;

  // Admins can optionally request all users' progress via ?all=true
  const progress = isAdmin
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

    if (!documentPath) {
      return NextResponse.json(
        { error: 'Falta campo: documentPath' },
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
