import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { SECTIONS } from '@/lib/sections';
import type { Lang } from '@/lib/types';
import type { Certificate } from '@/lib/quiz-types';
import CertificateView from './CertificateView';

export const dynamic = 'force-dynamic';

async function fetchCertificate(id: string, cookie: string): Promise<Certificate | null> {
  const h = headers();
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') || 'http';
  const base = `${proto}://${host}`;

  try {
    const res = await fetch(`${base}/api/certificates/${encodeURIComponent(id)}`, {
      headers: { cookie },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as Certificate;
  } catch {
    return null;
  }
}

export default async function CertificateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = session.user as any;
  const lang: Lang = user.lang || 'es';
  const isAdmin: boolean = !!user.isAdmin;
  const userId: string = user.userId;

  const cookie = headers().get('cookie') || '';
  const cert = await fetchCertificate(params.id, cookie);

  if (!cert) notFound();
  if (cert.userId !== userId && !isAdmin) notFound();

  const section = SECTIONS.find((s) => cert.docPath.startsWith(`${s.id}/`));
  const sectionName = section ? (lang === 'ru' ? section.nameRu : section.nameEs) : undefined;

  return <CertificateView cert={cert} sectionName={sectionName} lang={lang} />;
}
