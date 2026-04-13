'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Certificate from '@/components/Certificate';
import type { Certificate as CertificateType } from '@/lib/quiz-types';
import type { Lang } from '@/lib/types';

interface Props {
  cert: CertificateType;
  sectionName?: string;
  lang: Lang;
}

export default function CertificateView({ cert, sectionName, lang }: Props) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const t = {
    es: {
      back: 'Volver',
      download: 'Descargar PDF',
      downloading: 'Generando PDF...',
      id: 'ID',
      issued: 'Emitido',
      score: 'Puntaje',
      attempts: 'Intentos',
      openPdf: 'Abrir como PDF',
    },
    ru: {
      back: 'Назад',
      download: 'Скачать PDF',
      downloading: 'Генерация PDF...',
      id: 'ID',
      issued: 'Выдан',
      score: 'Результат',
      attempts: 'Попыток',
      openPdf: 'Открыть как PDF',
    },
  }[lang];

  const locale = lang === 'ru' ? 'ru-RU' : 'es-ES';
  const issuedFull = new Date(cert.issuedAt).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  async function handleDownload() {
    if (!certRef.current || downloading) return;
    setDownloading(true);

    try {
      const html2pdfMod = await import('html2pdf.js');
      const html2pdf = (html2pdfMod as any).default || html2pdfMod;

      const docSlug = cert.docPath.split('/').pop() || 'certificado';
      const safeName = cert.userName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const dateStr = new Date(cert.issuedAt).toISOString().slice(0, 10);
      const filename = `Certificado-${docSlug}-${safeName}-${dateStr}.pdf`;

      // html2canvas requires the element to be attached to the DOM.
      // The certificate is already in the DOM (rendered on screen).
      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#FAFAF7',
          logging: false,
          windowWidth: 1123,
        },
        jsPDF: {
          unit: 'px',
          format: [1123, 794],
          orientation: 'landscape',
          hotfixes: ['px_scaling'],
        },
      };

      await html2pdf().set(opt).from(certRef.current).save();
    } catch (err) {
      console.error('PDF generation failed', err);
      // Fallback: print
      window.print();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Link
          href="/certificates"
          className="inline-flex items-center gap-1.5 text-sm text-neo-text-secondary hover:text-neo-text transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {t.back}
        </Link>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neo-primary hover:bg-neo-primary-dark disabled:opacity-60 disabled:cursor-wait text-white font-semibold text-sm transition-colors"
        >
          {downloading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {t.downloading}
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.download}
            </>
          )}
        </button>
      </div>

      {/* Certificate — responsive scaling wrapper */}
      <div className="w-full overflow-x-auto bg-neo-dark-3/30 rounded-xl p-4 sm:p-6 flex justify-center print:p-0 print:bg-white">
        <div
          className="certificate-scale"
          style={{
            transformOrigin: 'top center',
          }}
        >
          <Certificate ref={certRef} cert={cert} sectionName={sectionName} />
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5 no-print">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-neo-text-muted font-semibold mb-1">
              {t.id}
            </div>
            <div className="text-neo-text font-mono text-[12px] break-all">{cert.id}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-neo-text-muted font-semibold mb-1">
              {t.issued}
            </div>
            <div className="text-neo-text">{issuedFull}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-neo-text-muted font-semibold mb-1">
              {t.score}
            </div>
            <div className="text-neo-text font-semibold">
              {cert.score}/{cert.totalQuestions}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-neo-text-muted font-semibold mb-1">
              {t.attempts}
            </div>
            <div className="text-neo-text">{cert.attempts}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .certificate-scale {
          transform: scale(var(--cert-scale, 1));
        }
        @media (max-width: 1220px) {
          .certificate-scale {
            --cert-scale: 0.82;
          }
        }
        @media (max-width: 1000px) {
          .certificate-scale {
            --cert-scale: 0.66;
          }
        }
        @media (max-width: 820px) {
          .certificate-scale {
            --cert-scale: 0.5;
          }
        }
        @media (max-width: 640px) {
          .certificate-scale {
            --cert-scale: 0.38;
          }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .certificate-scale {
            --cert-scale: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
