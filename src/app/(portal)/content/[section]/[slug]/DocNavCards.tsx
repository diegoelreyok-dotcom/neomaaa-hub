'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/types';

interface NavDoc {
  slug: string;
  title: string;
}

interface DocNavCardsProps {
  sectionId: string;
  prev: NavDoc | null;
  next: NavDoc | null;
  lang: Lang;
}

function NavCard({
  href,
  label,
  title,
  direction,
}: {
  href: string;
  label: string;
  title: string;
  direction: 'prev' | 'next';
}) {
  const isNext = direction === 'next';
  const accent = isNext ? '#C94A5C' : '#7A2030';
  const glow = isNext ? 'rgba(201, 74, 92, 0.3)' : 'rgba(122, 32, 48, 0.3)';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative"
    >
      <Link
        href={href}
        className="relative block overflow-hidden rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Hover gradient glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isNext
              ? `radial-gradient(circle at 85% 50%, ${glow} 0%, transparent 60%)`
              : `radial-gradient(circle at 15% 50%, ${glow} 0%, transparent 60%)`,
          }}
        />

        {/* Edge accent bar */}
        <span
          aria-hidden
          className="absolute bottom-3 top-3 w-[2px] rounded-full opacity-50 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            left: isNext ? 'auto' : 0,
            right: isNext ? 0 : 'auto',
            background: isNext
              ? `linear-gradient(180deg, transparent, ${accent}, transparent)`
              : `linear-gradient(180deg, transparent, ${accent}, transparent)`,
            boxShadow: `0 0 8px ${glow}`,
          }}
        />

        <div
          className={`flex items-center gap-4 p-4 sm:p-5 ${isNext ? 'flex-row-reverse text-right' : ''}`}
        >
          {/* Arrow icon */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
              border: `1px solid ${accent}40`,
              color: accent,
              boxShadow: `0 0 14px ${glow}`,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300"
              style={{
                transform: isNext
                  ? 'translateX(0)'
                  : 'translateX(0)',
              }}
            >
              {isNext ? (
                <polyline points="9 18 15 12 9 6" />
              ) : (
                <polyline points="15 18 9 12 15 6" />
              )}
            </svg>
          </span>

          <div className="min-w-0 flex-1">
            <div
              className="mb-1 text-[10px] font-bold uppercase"
              style={{
                color: '#6B7280',
                letterSpacing: '0.12em',
              }}
            >
              {label}
            </div>
            <div
              className="truncate text-sm font-semibold transition-colors duration-200 group-hover:text-white"
              style={{ color: '#94A3B8' }}
            >
              {title}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DocNavCards({
  sectionId,
  prev,
  next,
  lang,
}: DocNavCardsProps) {
  const prevLabel =
    lang === 'ru' ? 'Предыдущий' : lang === 'en' ? 'Previous' : 'Anterior';
  const nextLabel =
    lang === 'ru' ? 'Следующий' : lang === 'en' ? 'Next' : 'Siguiente';
  const backHome =
    lang === 'ru'
      ? 'Вернуться на главную'
      : lang === 'en'
        ? 'Back to home'
        : 'Volver al inicio';

  return (
    <div className="mt-12">
      {/* Divider gradient */}
      <div
        aria-hidden
        className="mb-6 h-[1px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prev ? (
          <NavCard
            href={`/content/${sectionId}/${prev.slug}`}
            label={prevLabel}
            title={prev.title}
            direction="prev"
          />
        ) : (
          <div />
        )}

        {next ? (
          <NavCard
            href={`/content/${sectionId}/${next.slug}`}
            label={nextLabel}
            title={next.title}
            direction="next"
          />
        ) : (
          <div />
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-white"
          style={{ color: '#6B7280' }}
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {backHome}
        </Link>
      </div>
    </div>
  );
}
