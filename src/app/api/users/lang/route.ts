import { auth } from '@/lib/auth';
import { updateUser } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { lang } = await req.json();
    if (lang !== 'es' && lang !== 'ru') {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    const userId = (session.user as any).userId;
    await updateUser(userId, { lang });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
