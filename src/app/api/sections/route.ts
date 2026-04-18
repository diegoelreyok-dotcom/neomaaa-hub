import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUser, getRole } from '@/lib/db';
import { getVisibleSections } from '@/lib/permissions';
import { SECTIONS } from '@/lib/sections';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const sessionUser = session.user as any;
  const userId = sessionUser.userId;
  const roleId = sessionUser.roleId;

  // Hardcoded admins may not exist in DB — use session roleId directly
  if (sessionUser.isAdmin) {
    return NextResponse.json(SECTIONS);
  }

  const user = await getUser(userId);
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const role = await getRole(user.roleId || roleId);
  if (!role) {
    return NextResponse.json({ error: 'Rol no encontrado' }, { status: 404 });
  }

  const sections = getVisibleSections(role, user.extraSections);
  return NextResponse.json(sections);
}
