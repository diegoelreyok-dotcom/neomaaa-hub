import { NextResponse } from 'next/server';
import { compareSync } from 'bcryptjs';
import { auth } from '@/lib/auth';
import { getUser, regenerateCode, updateUser } from '@/lib/db';

/**
 * POST /api/users/change-code
 *
 * Lets a logged-in user rotate their own 6-digit login code. Required when
 * `mustChangeCode: true` is set (default staff seeded with 000000, or users
 * approved via registration with an admin-issued temporary code).
 *
 * Body: { newCode: string } — exactly 6 numeric digits.
 * Rules:
 *   - newCode must be 6 digits, numeric only
 *   - newCode must not be "000000"
 *   - newCode must differ from the current code
 *   - on success: regenerates hash, clears mustChangeCode, returns { success: true }
 */
export async function POST(req: Request) {
  const session = await auth();
  const userId = (session?.user as any)?.userId as string | undefined;
  if (!session?.user || !userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON invalido' }, { status: 400 });
  }

  const newCode = typeof body?.newCode === 'string' ? body.newCode.trim() : '';

  // Strict validation: exactly 6 digits.
  if (!/^[0-9]{6}$/.test(newCode)) {
    return NextResponse.json(
      { error: 'El codigo debe tener exactamente 6 digitos numericos' },
      { status: 400 }
    );
  }

  // Block the well-known default.
  if (newCode === '000000') {
    return NextResponse.json(
      { error: 'No puedes usar 000000 como codigo' },
      { status: 400 }
    );
  }

  const user = await getUser(userId);
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  // Reject reusing the current code.
  if (user.loginCode && compareSync(newCode, user.loginCode)) {
    return NextResponse.json(
      { error: 'El nuevo codigo debe ser distinto al actual' },
      { status: 400 }
    );
  }

  const ok = await regenerateCode(userId, newCode);
  if (!ok) {
    return NextResponse.json({ error: 'Error al actualizar codigo' }, { status: 500 });
  }

  await updateUser(userId, { mustChangeCode: false });

  return NextResponse.json({ success: true });
}
