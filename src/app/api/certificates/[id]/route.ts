import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deleteCertificate, getCertificateById } from '@/lib/quiz-storage';

type RouteParams = { params: { id: string } };

export async function GET(_req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const cert = await getCertificateById(params.id);
  if (!cert) {
    return NextResponse.json({ error: 'Certificado no encontrado' }, { status: 404 });
  }

  const userId = (session.user as any).userId as string;
  const isAdmin = (session.user as any).isAdmin as boolean;
  if (!isAdmin && cert.userId !== userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  return NextResponse.json(cert);
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const isAdmin = (session.user as any).isAdmin as boolean;
  if (!isAdmin) {
    return NextResponse.json({ error: 'Solo admin' }, { status: 403 });
  }

  const cert = await getCertificateById(params.id);
  if (!cert) {
    return NextResponse.json({ error: 'Certificado no encontrado' }, { status: 404 });
  }

  await deleteCertificate(cert.userId, cert.docPath);
  return NextResponse.json({ success: true });
}
