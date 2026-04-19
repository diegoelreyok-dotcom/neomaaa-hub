import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Lang } from '@/lib/types';

interface DocHeaderProps {
  lang: Lang;
  sectionName: string;
  docTitle: string;
  readingTime: number;
  docIndex: number; // zero-based
  docTotal: number;
  pdfSlot?: ReactNode; // slot for PDF download button on the right side
}

/**
 * Glass "command center" header for a document. Gradient mesh bar, breadcrumb,
 * gradient title, meta row with reading time / section / doc position +
 * horizontal progress, and a right-side slot for the PDF button. Server safe
 * (no hooks, no 'use client').
 */
export default function DocHeader({
  lang,
  sectionName,
  docTitle,
  readingTime,
  docIndex,
  docTotal,
  pdfSlot,
}: DocHeaderProps) {
  const home = lang === 'ru' ? 'Главная' : lang === 'en' ? 'Home' : 'Inicio';
  const readLabel =
    lang === 'ru' ? 'чтения' : lang === 'en' ? 'read' : 'de lectura';
  const posLabel =
    lang === 'ru' ? 'Документ' : lang === 'en' ? 'Document' : 'Documento';

  const positionPct = docTotal > 0 ? ((docIndex + 1) / docTotal) * 100 : 0;

  return (
    <header
      className="relative mb-6 overflow-hidden rounded-2xl"
      style={{
        background:
          'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Top gradient mesh bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #C94A5C 25%, #98283A 55%, #7A2030 80%, transparent 100%)',
          opacity: 0.85,
        }}
      />

      {/* Background soft radial accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, rgba(201,74,92,0.15), transparent 45%), radial-gradient(circle at 10% 90%, rgba(152,40,58,0.2), transparent 50%)',
        }}
      />

      <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-6">
        {/* Breadcrumb */}
        <nav
          className="mb-4 flex flex-wrap items-center gap-2 text-[12px]"
          aria-label="Breadcrumb"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
            style={{ color: '#6B7280' }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="hidden sm:inline">{home}</span>
          </Link>
          <svg
            aria-hidden
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#3A3A3A' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span style={{ color: '#94A3B8' }}>{sectionName}</span>
          <svg
            aria-hidden
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#3A3A3A' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="truncate font-medium" style={{ color: '#FFFFFF' }}>
            {docTitle}
          </span>
        </nav>

        {/* Title row + PDF slot */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl font-bold leading-tight tracking-tight sm:text-[28px]"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #FFE0E6 45%, #C94A5C 120%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {docTitle}
            </h1>
          </div>

          {pdfSlot && (
            <div
              className="shrink-0"
              style={{
                // light glass bg for the PDF button area
                alignSelf: 'flex-start',
              }}
            >
              {pdfSlot}
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {/* Reading time */}
          <span
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94A3B8',
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="tabular-nums">{readingTime}</span>
            <span>
              min <span style={{ color: '#6B7280' }}>{readLabel}</span>
            </span>
          </span>

          {/* Section badge */}
          <span
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1"
            style={{
              background: 'rgba(152, 40, 58, 0.12)',
              border: '1px solid rgba(152, 40, 58, 0.3)',
              color: '#C94A5C',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75" />
              <path d="M13.06 6.31l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            {sectionName}
          </span>

          {/* Doc position with horizontal progress */}
          <span
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ color: '#6B7280', letterSpacing: '0.12em' }}
            >
              {posLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="tabular-nums"
                style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 700 }}
              >
                {docIndex + 1}
              </span>
              <span style={{ color: '#6B7280', fontSize: 11 }}>/</span>
              <span
                className="tabular-nums"
                style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              >
                {docTotal}
              </span>
            </span>
            {/* Tiny progress bar */}
            <span
              aria-hidden
              className="relative block h-[3px] w-16 overflow-hidden rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <span
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${positionPct}%`,
                  background:
                    'linear-gradient(90deg, #C94A5C 0%, #98283A 100%)',
                  boxShadow: '0 0 6px rgba(152, 40, 58, 0.6)',
                  transition: 'width 0.4s ease',
                }}
              />
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
