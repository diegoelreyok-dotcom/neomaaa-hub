import { auth } from '@/lib/auth';
import { updateUser } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { lang } = await req.json();
    if (lang !== 'es' && lang !== 'ru' && lang !== 'en') {
      return NextResponse.json({ error: 'Invalid language', code: 'INVALID_LANG' }, { status: 400 });
    }

    const userId = (session.user as any).userId;
    await updateUser(userId, { lang });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
