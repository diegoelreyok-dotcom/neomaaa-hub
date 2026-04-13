import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCooldown } from '@/lib/quiz-storage';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const docPath = searchParams.get('docPath') || '';

  if (!docPath) {
    return NextResponse.json({ error: 'Falta docPath' }, { status: 400 });
  }

  const userId = (session.user as any).userId as string;
  const entry = await getCooldown(userId, docPath);

  if (!entry) {
    return NextResponse.json({ active: false, secondsLeft: 0 });
  }

  const secondsLeft = Math.max(
    0,
    Math.ceil((entry.expiresAt - Date.now()) / 1000)
  );

  return NextResponse.json({
    active: secondsLeft > 0,
    secondsLeft,
  });
}
