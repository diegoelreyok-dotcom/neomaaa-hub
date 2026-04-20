'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import type { Section, Lang } from '@/lib/types';
import { pathOrderedDocs } from '@/lib/permissions';
import SidebarOrb from './SidebarOrb';

interface SidebarProps {
  sections: Section[];
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  completedDocs?: string[];
  accessedDocs?: string[];
  onSwitchLang?: (lang: Lang) => void;
  roleId?: string;
  isAdmin?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const RAIL_ITEMS = [
  {
    href: '/dashboard',
    match: (p: string) => p === '/dashboard',
    label: { es: 'Inicio', ru: 'Главная', en: 'Home' },
    icon: (
      <svg
        width="16"
        height="16"
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
    ),
  },
  {
    href: '/learning',
    match: (p: string) => p.startsWith('/learning'),
    label: { es: 'Mi Ruta', ru: 'Мой путь', en: 'My Path' },
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    ),
  },
  {
    href: '/certificates',
    match: (p: string) => p.startsWith('/certificates'),
    label: { es: 'Certificados', ru: 'Сертификаты', en: 'Certificates' },
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

export default function Sidebar({
  sections,
  lang,
  isOpen,
  onClose,
  completedDocs = [],
  accessedDocs = [],
  onSwitchLang,
  roleId,
  isAdmin = false,
}: SidebarProps) {
  const pathname = usePathname();

  // Compute locked doc paths based on the user's learning path.
  // Admins see everything unlocked. Docs outside the path are never locked.
  // completedDocs comes in as filePaths ("section/slug.md"); normalize to "section/slug".
  const { lockedDocs, requiredDocByLocked } = useMemo(() => {
    const locked = new Set<string>();
    const required = new Map<string, string>();
    if (isAdmin || !roleId) return { lockedDocs: locked, requiredDocByLocked: required };
    const ordered = pathOrderedDocs(roleId);
    if (ordered.length === 0) return { lockedDocs: locked, requiredDocByLocked: required };

    const completedSet = new Set(
      completedDocs.map((p) => p.replace(/\.md$/, ''))
    );
    // Walk in order; first uncompleted index is the "gate". Everything after
    // is locked with requiredDoc = first missing prior.
    let firstMissing: string | null = null;
    for (const doc of ordered) {
      if (!completedSet.has(doc)) {
        if (firstMissing === null) {
          firstMissing = doc;
          // This doc itself is reachable (it's the active gate).
          continue;
        }
        locked.add(doc);
        required.set(doc, firstMissing);
      }
    }
    return { lockedDocs: locked, requiredDocByLocked: required };
  }, [roleId, isAdmin, completedDocs]);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of sections) {
      const isCurrentSection = section.documents.some(
        (doc) => pathname === `/content/${section.id}/${doc.slug}`,
      );
      initial[section.id] = isCurrentSection || section.documents.length <= 4;
    }
    return initial;
  });

  function toggleSection(id: string) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function getSectionName(section: Section): string {
    if (lang === 'ru') return section.nameRu;
    if (lang === 'en') return section.nameEn || section.nameEs;
    return section.nameEs;
  }

  function getDocTitle(doc: { titleEs: string; titleRu: string; titleEn?: string }): string {
    if (lang === 'ru') return doc.titleRu;
    if (lang === 'en') return doc.titleEn || doc.titleEs;
    return doc.titleEs;
  }

  const docLabel =
    lang === 'ru' ? 'Документация' : lang === 'en' ? 'Documentation' : 'Documentacion';

  return (
    <LayoutGroup>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px]
          flex flex-col overflow-hidden
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background:
            'linear-gradient(180deg, rgba(18,22,38,0.85) 0%, rgba(10,14,26,0.92) 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Subtle top edge inner glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(152,40,58,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Ambient vertical accent (left edge) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(152,40,58,0.4) 20%, rgba(122,32,48,0.25) 60%, transparent 100%)',
          }}
        />

        {/* Brand */}
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
            onClick={onClose}
          >
            <SidebarOrb />
            <div className="flex items-baseline gap-0">
              <span className="text-[15px] font-black tracking-tight text-white">NEO</span>
              <span
                className="text-[15px] font-black tracking-tight"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #C94A5C 50%, #98283A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MAAA
              </span>
              <span className="text-[15px] font-black tracking-tight text-neo-text-muted/80 ml-1">
                HUB
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-1 text-neo-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all"
            aria-label="Cerrar menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Top rail: glass pill group */}
        <div className="relative px-4 pt-4 pb-3">
          <div
            className="relative rounded-xl p-1 flex items-center gap-0.5"
            style={{
              background:
                'linear-gradient(135deg, rgba(18,22,38,0.6), rgba(8,11,22,0.6))',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {RAIL_ITEMS.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="relative flex-1 group"
                >
                  {active && (
                    <motion.div
                      layoutId="railActive"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(152,40,58,0.25), rgba(122,32,48,0.15))',
                        border: '1px solid rgba(152,40,58,0.5)',
                        boxShadow:
                          '0 0 16px rgba(152,40,58,0.35), inset 0 0 12px rgba(152,40,58,0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div
                    className={`relative flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg text-[10px] font-semibold tracking-wide transition-colors ${
                      active
                        ? 'text-[#C94A5C]'
                        : 'text-neo-text-muted group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate">{item.label[lang]}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 pt-2 pb-2 flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              background:
                'linear-gradient(90deg, #C94A5C, #98283A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {docLabel}
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(90deg, rgba(152,40,58,0.5), transparent)',
            }}
          />
        </div>

        {/* Sections */}
        <div className="relative flex-1 min-h-0">
          <nav className="h-full overflow-y-auto px-3 pb-4 sidebar-nav-scroll">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const isAnySectionDocActive = section.documents.some(
                  (d) => pathname === `/content/${section.id}/${d.slug}`,
                );
                const sectionCompletedCount = section.documents.filter((d) =>
                  completedDocs.includes(d.filePath),
                ).length;
                const sectionTotal = section.documents.length;
                const sectionProgress =
                  sectionTotal > 0
                    ? Math.round((sectionCompletedCount / sectionTotal) * 100)
                    : 0;
                const isOpen = expandedSections[section.id];
                const isComplete =
                  sectionCompletedCount === sectionTotal && sectionTotal > 0;

                return (
                  <div key={section.id} className="mb-1 relative">
                    {/* Left edge indicator when open/active */}
                    {(isAnySectionDocActive || isOpen) && (
                      <motion.div
                        layoutId={`sect-edge-${section.id}`}
                        className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                        style={{
                          background: isAnySectionDocActive
                            ? 'linear-gradient(180deg, #C94A5C, #98283A)'
                            : 'rgba(255,255,255,0.08)',
                          boxShadow: isAnySectionDocActive
                            ? '0 0 8px rgba(152,40,58,0.7)'
                            : 'none',
                        }}
                      />
                    )}

                    {/* Section header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`group flex items-center justify-between w-full pl-3 pr-2 py-2 rounded-lg transition-all duration-200 ${
                        isAnySectionDocActive
                          ? 'bg-white/[0.04]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.14em] truncate ${
                          isAnySectionDocActive
                            ? 'text-white'
                            : 'text-neo-text-muted group-hover:text-neo-text-secondary'
                        }`}
                      >
                        {getSectionName(section)}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        {/* Progress pill */}
                        <span
                          className="text-[9px] font-bold rounded-full min-w-[22px] h-[16px] flex items-center justify-center px-1.5 tabular-nums"
                          style={
                            isComplete
                              ? {
                                  background:
                                    'linear-gradient(135deg, rgba(152,40,58,0.3), rgba(152,40,58,0.15))',
                                  color: '#C94A5C',
                                  border: '1px solid rgba(152,40,58,0.45)',
                                  boxShadow: '0 0 8px rgba(152,40,58,0.35)',
                                }
                              : isAnySectionDocActive
                              ? {
                                  background: 'rgba(152,40,58,0.15)',
                                  color: '#C94A5C',
                                  border: '1px solid rgba(152,40,58,0.3)',
                                }
                              : {
                                  background: 'rgba(255,255,255,0.04)',
                                  color: '#6B7280',
                                  border: '1px solid rgba(255,255,255,0.06)',
                                }
                          }
                        >
                          {sectionCompletedCount}/{sectionTotal}
                        </span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`text-neo-text-muted transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Progress bar */}
                    {(sectionCompletedCount > 0 ||
                      accessedDocs.some((d) =>
                        section.documents.some((sd) => sd.filePath === d),
                      )) && (
                      <div className="mx-3 mt-0.5 mb-1">
                        <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sectionProgress}%` }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="h-full rounded-full"
                            style={{
                              background: isComplete
                                ? 'linear-gradient(90deg, #98283A, #C94A5C)'
                                : 'linear-gradient(90deg, rgba(152,40,58,0.75), rgba(122,32,48,0.75))',
                              boxShadow: isComplete
                                ? '0 0 6px rgba(152,40,58,0.55)'
                                : 'none',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="py-1 space-y-0.5">
                            {section.documents.map((doc) => {
                              const docKey = `${section.id}/${doc.slug}`;
                              const locked = lockedDocs.has(docKey);
                              const reqKey = locked ? requiredDocByLocked.get(docKey) : undefined;
                              let reqTitle = '';
                              if (reqKey) {
                                const [rs, rsl] = reqKey.split('/');
                                const found = sections
                                  .find((s) => s.id === rs)
                                  ?.documents.find((d) => d.slug === rsl);
                                if (found) reqTitle = getDocTitle(found);
                              }
                              return (
                                <SidebarDocLink
                                  key={doc.slug}
                                  href={`/content/${section.id}/${doc.slug}`}
                                  title={getDocTitle(doc)}
                                  active={
                                    pathname === `/content/${section.id}/${doc.slug}`
                                  }
                                  completed={completedDocs.includes(doc.filePath)}
                                  accessed={accessedDocs.includes(doc.filePath)}
                                  locked={locked}
                                  requiredTitle={reqTitle}
                                  lockedTooltip={
                                    lang === 'ru'
                                      ? 'Сначала завершите'
                                      : lang === 'en'
                                        ? 'Complete first'
                                        : 'Completa primero'
                                  }
                                  onNavigate={onClose}
                                />
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </nav>
          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(10,14,26,0.9))',
            }}
          />
        </div>

        {/* Language switcher */}
        {onSwitchLang && (
          <div className="relative px-4 pt-2 pb-2 border-t border-white/5">
            <LayoutGroup id="lang-switcher">
              <div
                className="flex items-center gap-0.5 rounded-lg p-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(18,22,38,0.6), rgba(8,11,22,0.6))',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                role="group"
                aria-label={lang === 'ru' ? 'Язык' : lang === 'en' ? 'Language' : 'Idioma'}
              >
                {(['es', 'ru', 'en'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => onSwitchLang(code)}
                    aria-label={code}
                    aria-pressed={lang === code}
                    className={`relative flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${
                      lang === code
                        ? 'text-white'
                        : 'text-neo-text-muted hover:text-neo-text-secondary'
                    }`}
                  >
                    <img
                      src={`/flags/${code}.svg`}
                      width="14"
                      height="11"
                      alt=""
                      loading="eager"
                      className="rounded-sm object-cover relative z-10"
                    />
                    <span className="relative z-10 uppercase tracking-wide">
                      {code}
                    </span>
                    {lang === code && (
                      <motion.div
                        layoutId="langActivePill"
                        className="absolute inset-0 rounded-md"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(152,40,58,0.25), rgba(122,32,48,0.15))',
                          border: '1px solid rgba(152,40,58,0.5)',
                          boxShadow: '0 0 10px rgba(152,40,58,0.3)',
                        }}
                      />
                    )}
                    {lang === code && (
                      <motion.div
                        layoutId="langActiveUnderline"
                        className="absolute -bottom-px left-2 right-2 h-[2px] rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, #C94A5C, transparent)',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>
        )}
      </aside>
    </LayoutGroup>
  );
}

/* ---------------- Internal: Doc link with cursor-tracking radial hover ---------------- */

interface SidebarDocLinkProps {
  href: string;
  title: string;
  active: boolean;
  completed: boolean;
  accessed: boolean;
  locked?: boolean;
  requiredTitle?: string;
  lockedTooltip?: string;
  onNavigate: () => void;
}

function SidebarDocLink({
  href,
  title,
  active,
  completed,
  accessed,
  locked = false,
  requiredTitle = '',
  lockedTooltip = '',
  onNavigate,
}: SidebarDocLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  // Locked variant: render a non-clickable div with muted style + lock icon.
  if (locked) {
    const tooltip = requiredTitle
      ? `${lockedTooltip}: ${requiredTitle}`
      : lockedTooltip;
    return (
      <div
        title={tooltip}
        aria-disabled="true"
        className="relative flex items-center gap-2 pl-5 pr-3 py-[7px] ml-3 text-[12.5px] rounded-lg text-neo-text-muted/60 cursor-not-allowed select-none"
      >
        <span
          className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted/70">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <span className="relative z-10 truncate italic">{title}</span>
      </div>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onNavigate}
      onMouseMove={handleMouseMove}
      className={`sb-doc-link relative flex items-center gap-2 pl-5 pr-3 py-[7px] ml-3 text-[12.5px] rounded-lg transition-all duration-200 ${
        active
          ? 'text-white font-semibold'
          : 'text-neo-text-body hover:text-white'
      }`}
      style={{
        transform: active ? 'translateX(2px)' : undefined,
      }}
    >
      {/* Hover radial glow (cursor tracked) */}
      <span
        aria-hidden
        className="sb-doc-glow pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200"
      />

      {/* Active gradient bar on left */}
      {active && (
        <motion.span
          layoutId="docActiveBar"
          aria-hidden
          className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #C94A5C, #98283A)',
            boxShadow: '0 0 10px rgba(152,40,58,0.7)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}

      {/* Status pill */}
      {completed ? (
        <span
          className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.12))',
            border: '1px solid rgba(16,185,129,0.5)',
            boxShadow: '0 0 8px rgba(16,185,129,0.4)',
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      ) : accessed ? (
        <span
          className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.5)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#FBBF24',
              boxShadow: '0 0 6px rgba(251,191,36,0.6)',
            }}
          />
        </span>
      ) : (
        <span
          className="relative z-10 w-4 h-4 rounded-full flex-shrink-0"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />
      )}

      <span className="relative z-10 truncate">{title}</span>

      <style jsx>{`
        .sb-doc-link:hover .sb-doc-glow {
          opacity: 1;
        }
        .sb-doc-glow {
          background: radial-gradient(
            220px circle at var(--mx, 50%) var(--my, 50%),
            rgba(152, 40, 58, 0.14),
            transparent 55%
          );
        }
      `}</style>
    </Link>
  );
}
