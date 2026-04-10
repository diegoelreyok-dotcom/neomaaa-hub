import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUser, getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const userId = (session.user as any).userId;
  const user = await getUser(userId);
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const role = await getRole(user.roleId);
  if (!role) {
    return NextResponse.json({ error: 'Rol no encontrado' }, { status: 404 });
  }

  const sections = getVisibleSections(role);
  return NextResponse.json(sections);
}
