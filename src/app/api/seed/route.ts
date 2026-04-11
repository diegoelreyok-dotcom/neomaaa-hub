import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { seedDefaultData, getRole, getUser } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Require admin authentication
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    await seedDefaultData();

    // Verify the data exists (do NOT expose credentials in response)
    const adminRole = await getRole('admin');
    const diegoUser = await getUser('diego');

    const allUserIds = [
      'diego', 'yulia', 'stanislav', 'pepe', 'susana',
      'edward', 'franco', 'luis', 'rocio', 'marilyn',
      'alexa', 'alexb', 'gleb', 'dimitri',
    ];
    const userChecks: Record<string, boolean> = {};
    for (const uid of allUserIds) {
      const u = await getUser(uid);
      userChecks[uid] = !!u;
    }

    return NextResponse.json({
      message: 'Seed completado',
      adminRoleExists: !!adminRole,
      diegoExists: !!diegoUser,
      allRoles: ['admin', 'principal', 'sales', 'compliance', 'support-role', 'dealing', 'marketing-role', 'dev'],
      users: userChecks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al ejecutar seed', details: process.env.NODE_ENV === 'development' ? error?.message : 'Internal error' },
      { status: 500 }
    );
  }
}
