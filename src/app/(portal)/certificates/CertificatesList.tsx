'use client';

import Link from 'next/link';
import type { Certificate } from '@/lib/quiz-types';
import type { Lang } from '@/lib/types';

interface Props {
  certs: Certificate[];
  lang: Lang;
  docIndex: Record<string, { sectionName: string; sectionNameRu: string }>;
}

export default function CertificatesList({ certs, lang, docIndex }: Props) {
  const t = {
    es: {
      title: 'Certificados',
      subtitle: (n: number) => (n === 1 ? '1 certificado obtenido' : `${n} certificados obtenidos`),
      empty: 'Aun no has obtenido certificados. Completa los quizzes de cada documento para conseguirlos.',
      exploreBtn: 'Explorar documentos',
      section: 'Seccion',
      score: 'Puntaje',
      issued: 'Emitido',
      viewBtn: 'Ver / Descargar PDF',
    },
    ru: {
      title: 'Сертификаты',
      subtitle: (n: number) => (n === 1 ? '1 сертификат получен' : `${n} сертификатов получено`),
      empty: 'У вас пока нет сертификатов. Пройдите квизы по документам, чтобы получить их.',
      exploreBtn: 'Перейти к документам',
      section: 'Раздел',
      score: 'Результат',
      issued: 'Выдан',
      viewBtn: 'Посмотреть / Скачать PDF',
    },
  }[lang];

  const locale = lang === 'ru' ? 'ru-RU' : 'es-ES';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neo-text tracking-tight">{t.title}</h1>
        <p className="text-neo-text-muted text-sm mt-1.5">{t.subtitle(certs.length)}</p>
      </div>

      {certs.length === 0 ? (
        <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-neo-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-neo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
          </div>
          <p className="text-neo-text-body text-[15px] mb-5 max-w-md mx-auto">{t.empty}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neo-primary hover:bg-neo-primary-dark text-white font-semibold text-sm transition-colors"
          >
            {t.exploreBtn}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {certs.map((cert) => {
            const meta = docIndex[cert.docPath];
            const sectionName = meta
              ? lang === 'ru'
                ? meta.sectionNameRu
                : meta.sectionName
              : '—';
            const dateStr = new Date(cert.issuedAt).toLocaleDateString(locale, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <Link
                key={cert.id}
                href={`/certificates/${cert.id}`}
                className="group bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl overflow-hidden hover:border-neo-primary/40 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Mini preview */}
                <div
                  className="relative aspect-[1123/794] w-full overflow-hidden"
                  style={{ background: '#FAFAF7' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      border: '4px solid #98283A',
                      margin: '10px',
                    }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{ color: '#0A0E1A' }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.25em',
                        color: '#98283A',
                        fontWeight: 800,
                        marginBottom: '4px',
                      }}
                    >
                      {lang === 'ru' ? 'СЕРТИФИКАТ' : 'CERTIFICADO'}
                    </div>
                    <div
                      style={{
                        width: '60px',
                        height: '1px',
                        background: '#98283A',
                        margin: '4px auto 10px',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '20px',
                        color: '#98283A',
                        marginBottom: '6px',
                        lineHeight: 1.1,
                      }}
                    >
                      {cert.userName}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#0A0E1A',
                        maxWidth: '85%',
                        lineHeight: 1.3,
                      }}
                    >
                      {cert.docTitle}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[15px] font-semibold text-neo-text mb-1 truncate group-hover:text-neo-primary transition-colors">
                    {cert.docTitle}
                  </div>
                  <div className="text-[12px] text-neo-text-muted mb-3">
                    {t.section}: {sectionName}
                  </div>

                  <div className="flex items-center gap-4 text-[12px] text-neo-text-secondary mb-4">
                    <span>
                      {t.score}:{' '}
                      <span className="font-semibold text-neo-text">
                        {cert.score}/{cert.totalQuestions}
                      </span>
                    </span>
                    <span className="text-neo-text-muted/50">·</span>
                    <span>
                      {t.issued}: <span className="text-neo-text-body">{dateStr}</span>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neo-primary group-hover:gap-2.5 transition-all">
                    {t.viewBtn}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
