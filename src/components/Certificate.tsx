'use client';

import { forwardRef } from 'react';
import type { Certificate as CertificateType } from '@/lib/quiz-types';

interface CertificateProps {
  cert: CertificateType;
  sectionName?: string;
}

/**
 * NEOMAAA Markets — Certificate of Completion.
 *
 * Rendered both on-screen and exported to PDF via html2pdf.js.
 * A4 landscape (1123 x 794 px at 96dpi ~= 297 x 210 mm).
 *
 * All styling is inline so the html2pdf canvas capture is deterministic
 * and does not depend on whether the Tailwind runtime is attached to the
 * cloned element.
 */
const Certificate = forwardRef<HTMLDivElement, CertificateProps>(function Certificate(
  { cert, sectionName },
  ref
) {
  const issued = new Date(cert.issuedAt);
  const lang = cert.language;

  const locale = lang === 'ru' ? 'ru-RU' : 'es-ES';
  const dateFormatted = issued.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const t = {
    es: {
      title: 'CERTIFICADO DE COMPLETAMIENTO',
      issuedTo: 'Se otorga el presente a',
      completed: 'por haber completado satisfactoriamente el modulo',
      section: 'Seccion',
      score: 'con una calificacion de',
      outOf: 'en el examen final.',
      founder: 'Founder & CEO',
      compliance: 'Compliance Officer',
      dateLabel: 'Fecha de emision',
      idLabel: 'ID',
      legal: 'NEOMAAA Markets — Anjouan License L15968/N',
      verified: 'VERIFICADO',
    },
    ru: {
      title: 'СЕРТИФИКАТ О ПРОХОЖДЕНИИ',
      issuedTo: 'Настоящий сертификат выдан',
      completed: 'за успешное прохождение модуля',
      section: 'Раздел',
      score: 'с результатом',
      outOf: 'в итоговом экзамене.',
      founder: 'Founder & CEO',
      compliance: 'Compliance Officer',
      dateLabel: 'Дата выдачи',
      idLabel: 'ID',
      legal: 'NEOMAAA Markets — Anjouan License L15968/N',
      verified: 'VERIFIED',
    },
  }[lang];

  const burgundy = '#98283A';
  const burgundyDark = '#7A2030';
  const accent = '#00D4AA';
  const paper = '#FAFAF7';
  const ink = '#0A0E1A';
  const subtle = '#6B5D65';

  return (
    <div
      ref={ref}
      data-certificate
      style={{
        width: '1123px',
        height: '794px',
        background: paper,
        color: ink,
        position: 'relative',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Outer double border */}
      <div
        style={{
          position: 'absolute',
          inset: '24px',
          border: `4px solid ${burgundy}`,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '36px',
          border: `1px solid ${burgundy}`,
          boxSizing: 'border-box',
        }}
      />

      {/* Corner geometric flourishes */}
      {([
        { pos: { top: '24px', left: '24px' }, rotate: 0 },
        { pos: { top: '24px', right: '24px' }, rotate: 90 },
        { pos: { bottom: '24px', right: '24px' }, rotate: 180 },
        { pos: { bottom: '24px', left: '24px' }, rotate: 270 },
      ] as const).map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...c.pos,
            width: '80px',
            height: '80px',
            transform: `rotate(${c.rotate}deg)`,
            pointerEvents: 'none',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 H40 M0 0 V40" stroke={burgundy} strokeWidth="1.5" fill="none" />
            <path d="M12 12 H30 M12 12 V30" stroke={accent} strokeWidth="1" fill="none" />
            <circle cx="12" cy="12" r="2" fill={burgundy} />
          </svg>
        </div>
      ))}

      {/* Watermark logo — centered, low opacity */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
          fontSize: '180px',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: ink,
          fontFamily: "'Inter', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        NEOMAAA
      </div>

      {/* Logo — top left */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: burgundy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: paper,
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          NM
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.02em',
              color: ink,
            }}
          >
            NEOMAAA
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: subtle,
              textTransform: 'uppercase',
            }}
          >
            Markets
          </div>
        </div>
      </div>

      {/* Main content column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '150px 100px 110px',
          textAlign: 'center',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '0.28em',
            color: burgundy,
            margin: 0,
            marginBottom: '10px',
            fontFamily: "'Inter', sans-serif",
            textTransform: 'uppercase',
          }}
        >
          {t.title}
        </h1>

        {/* Rule under title */}
        <div
          style={{
            width: '240px',
            height: '2px',
            background: burgundy,
            margin: '0 auto 44px',
          }}
        />

        {/* Issued to */}
        <div
          style={{
            fontSize: '15px',
            color: subtle,
            letterSpacing: '0.05em',
            marginBottom: '22px',
            fontStyle: 'italic',
          }}
        >
          {t.issuedTo}
        </div>

        {/* User name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 400,
            color: burgundy,
            margin: 0,
            marginBottom: '36px',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            lineHeight: 1.1,
          }}
        >
          {cert.userName}
        </div>

        {/* Completed */}
        <div
          style={{
            fontSize: '15px',
            color: ink,
            marginBottom: '18px',
          }}
        >
          {t.completed}:
        </div>

        {/* Doc title */}
        <div
          style={{
            fontSize: '26px',
            fontWeight: 700,
            color: ink,
            marginBottom: '10px',
            letterSpacing: '-0.01em',
          }}
        >
          &ldquo;{cert.docTitle}&rdquo;
        </div>

        {sectionName && (
          <div
            style={{
              fontSize: '13px',
              color: subtle,
              marginBottom: '24px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {t.section}: {sectionName}
          </div>
        )}

        {/* Score */}
        <div
          style={{
            fontSize: '15px',
            color: ink,
            marginBottom: '50px',
          }}
        >
          {t.score}{' '}
          <span style={{ fontWeight: 700, color: burgundy }}>
            {cert.score}/{cert.totalQuestions}
          </span>{' '}
          {t.outOf}
        </div>

        {/* Spacer pushes signatures + footer to bottom */}
        <div style={{ flex: 1 }} />

        {/* Signatures */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 40px',
            marginBottom: '28px',
          }}
        >
          <div style={{ textAlign: 'center', width: '260px' }}>
            <div
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: 'italic',
                fontSize: '22px',
                color: ink,
                marginBottom: '4px',
                minHeight: '28px',
              }}
            >
              Diego Loyola
            </div>
            <div style={{ borderTop: `1px solid ${ink}`, paddingTop: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: ink }}>
                Diego Loyola
              </div>
              <div style={{ fontSize: '10px', color: subtle, letterSpacing: '0.05em' }}>
                {t.founder}
              </div>
            </div>
          </div>

          {/* Seal */}
          <div style={{ textAlign: 'center', padding: '0 12px' }}>
            <div
              style={{
                position: 'relative',
                width: '110px',
                height: '110px',
                margin: '0 auto',
              }}
            >
              <svg width="110" height="110" viewBox="0 0 110 110">
                <defs>
                  <path
                    id={`circlePath-${cert.id}`}
                    d="M 55,55 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <circle
                  cx="55"
                  cy="55"
                  r="50"
                  fill="none"
                  stroke={burgundy}
                  strokeWidth="1.5"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="46"
                  fill="none"
                  stroke={burgundy}
                  strokeWidth="0.8"
                />
                <circle cx="55" cy="55" r="26" fill={burgundy} />
                {/* Inner monogram — clean single letter */}
                <text
                  x="55"
                  y="63"
                  textAnchor="middle"
                  fill={paper}
                  fontSize="26"
                  fontWeight="900"
                  letterSpacing="0"
                  fontFamily="Inter, sans-serif"
                >
                  N
                </text>
                {/* Circular ring text */}
                <text fill={burgundyDark} fontSize="7" fontWeight="700" letterSpacing="2">
                  <textPath href={`#circlePath-${cert.id}`} startOffset="50%" textAnchor="middle">
                    {`NEOMAAA MARKETS · ${t.verified}`}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <div style={{ textAlign: 'center', width: '260px' }}>
            <div
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: 'italic',
                fontSize: '22px',
                color: ink,
                marginBottom: '4px',
                minHeight: '28px',
              }}
            >
              Susana
            </div>
            <div style={{ borderTop: `1px solid ${ink}`, paddingTop: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: ink }}>
                Susana
              </div>
              <div style={{ fontSize: '10px', color: subtle, letterSpacing: '0.05em' }}>
                {t.compliance}
              </div>
            </div>
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            fontSize: '10px',
            color: subtle,
            lineHeight: 1.7,
            letterSpacing: '0.03em',
          }}
        >
          <div>
            {t.dateLabel}: {dateFormatted} &nbsp;·&nbsp; {t.idLabel}: {cert.id}
          </div>
          <div style={{ marginTop: '2px', color: burgundy, fontWeight: 600 }}>{t.legal}</div>
        </div>
      </div>
    </div>
  );
});

export default Certificate;
