import { NextResponse } from 'next/server';
import { seedDefaultData, getRole, getUser } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await seedDefaultData();

    // Verify the data exists
    const adminRole = await getRole('admin');
    const diegoUser = await getUser('diego');

    return NextResponse.json({
      message: 'Seed completado',
      adminRoleExists: !!adminRole,
      diegoExists: !!diegoUser,
      loginWith: {
        usuario: 'diego',
        codigo: '123456',
      },
      allUsers: ['diego', 'yulia', 'stanislav'],
      allRoles: ['admin', 'principal', 'sales', 'compliance', 'support-role', 'dealing', 'marketing-role', 'dev'],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al ejecutar seed', details: error?.message || 'Unknown' },
      { status: 500 }
    );
  }
}
