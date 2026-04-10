import { NextResponse } from 'next/server';
import { seedDefaultData, getRole } from '@/lib/db';

export async function GET() {
  try {
    // Only seed if admin role doesn't exist yet
    const existingAdmin = await getRole('admin');
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Datos ya inicializados. Seed no necesario.' },
        { status: 200 }
      );
    }

    await seedDefaultData();

    return NextResponse.json({
      message: 'Seed completado exitosamente',
      seeded: {
        roles: ['admin', 'principal', 'sales', 'compliance', 'support-role', 'dealing', 'marketing-role', 'dev'],
        users: ['diego', 'yulia', 'stanislav'],
        defaultCode: '123456',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al ejecutar seed' },
      { status: 500 }
    );
  }
}
