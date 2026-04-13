import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllCertificates } from '@/lib/quiz-storage';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const userId = (session.user as any).userId as string;
  const certs = await getAllCertificates(userId);
  return NextResponse.json(certs);
}
