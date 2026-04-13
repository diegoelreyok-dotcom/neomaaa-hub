import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SECTIONS } from '@/lib/sections';
import type { Lang } from '@/lib/types';
import type { Certificate } from '@/lib/quiz-types';
import { headers } from 'next/headers';
import CertificatesList from './CertificatesList';

export const dynamic = 'force-dynamic';

async function fetchCertificates(cookie: string): Promise<Certificate[]> {
  const h = headers();
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') || 'http';
  const base = `${proto}://${host}`;

  try {
    const res = await fetch(`${base}/api/certificates`, {
      headers: { cookie },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function CertificatesPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = session.user as any;
  const lang: Lang = user.lang || 'es';
  const cookie = headers().get('cookie') || '';

  const certs = await fetchCertificates(cookie);

  // Build helpers to enrich cert info with section name
  const docIndex = new Map<string, { sectionName: string; sectionNameRu: string }>();
  for (const s of SECTIONS) {
    for (const d of s.documents) {
      const key = `${s.id}/${d.slug}`;
      docIndex.set(key, { sectionName: s.nameEs, sectionNameRu: s.nameRu });
    }
  }

  return <CertificatesList certs={certs} lang={lang} docIndex={Object.fromEntries(docIndex)} />;
}
