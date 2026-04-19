'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const GLASS_BG =
  'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)';

/**
 * Glass card with optional gradient border.
 * Default = plain glass. Pass `accent` to get a tinted gradient border.
 */
export function AdminCard({
  children,
  className = '',
  accent,
  hover = false,
  padding = 'md',
}: {
  children: ReactNode;
  className?: string;
  accent?: 'cyan' | 'burgundy' | 'amber' | 'purple' | 'blue' | 'green';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}) {
  const accentMap: Record<string, string> = {
    cyan: 'rgba(152,40,58,0.4)',
    burgundy: 'rgba(201,74,92,0.4)',
    amber: 'rgba(251,191,36,0.4)',
    purple: 'rgba(122,32,48,0.4)',
    blue: 'rgba(201,74,92,0.4)',
    green: 'rgba(56,204,151,0.4)',
  };
  const pad = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }[padding];

  const borderColor = accent ? accentMap[accent] : 'rgba(255,255,255,0.1)';

  const content = (
    <>
      {accent ? (
        <>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${borderColor}, transparent 50%, ${borderColor}66)`,
              padding: '1px',
            }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{ background: GLASS_BG, backdropFilter: 'blur(10px)' }}
            />
          </div>
          <div className={`relative ${pad}`}>{children}</div>
        </>
      ) : (
        <div
          className={`rounded-2xl border border-white/10 ${pad}`}
          style={{ background: GLASS_BG, backdropFilter: 'blur(10px)' }}
        >
          {children}
        </div>
      )}
    </>
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-2xl overflow-hidden ${className}`}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {content}
    </div>
  );
}

/**
 * Section card with title + subtitle + optional header action.
 * Glass, gradient title.
 */
export function AdminSectionCard({
  title,
  subtitle,
  headerRight,
  children,
  accent,
  padding = 'md',
  className = '',
}: {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  accent?: 'cyan' | 'burgundy' | 'amber' | 'purple' | 'blue' | 'green';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <AdminCard accent={accent} padding="none" className={className}>
      <div
        className={
          padding === 'lg' ? 'p-6' : padding === 'sm' ? 'p-4' : 'p-5'
        }
      >
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h2 className="text-white font-semibold text-sm tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#6B7280] text-xs mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerRight && <div className="flex-shrink-0">{headerRight}</div>}
        </div>
        <div>{children}</div>
      </div>
    </AdminCard>
  );
}
