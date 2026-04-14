'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Section, Lang } from '@/lib/types';

interface SidebarProps {
  sections: Section[];
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  completedDocs?: string[];
  accessedDocs?: string[];
}

export default function Sidebar({ sections, lang, isOpen, onClose, completedDocs = [], accessedDocs = [] }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Auto-expand the section that contains the current page
    const initial: Record<string, boolean> = {};
    for (const section of sections) {
      const isCurrentSection = section.documents.some(
        (doc) => pathname === `/content/${section.id}/${doc.slug}`
      );
      initial[section.id] = isCurrentSection || section.documents.length <= 4;
    }
    return initial;
  });

  function toggleSection(id: string) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function getSectionName(section: Section): string {
    return lang === 'ru' ? section.nameRu : section.nameEs;
  }

  function getDocTitle(doc: { titleEs: string; titleRu: string }): string {
    return lang === 'ru' ? doc.titleRu : doc.titleEs;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px]
          bg-neo-dark-2 border-r border-neo-dark-3/80
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neo-dark-3/80">
          <Link href="/dashboard" className="flex items-center gap-0 group" onClick={onClose}>
            <span className="text-xl font-extrabold tracking-tight text-neo-text group-hover:text-neo-text transition-colors duration-200">NEO</span>
            <span className="text-xl font-extrabold tracking-tight text-neo-primary">MAAA</span>
            <span className="text-xl font-extrabold tracking-tight text-neo-text-muted ml-1 group-hover:text-neo-text-secondary transition-colors duration-200">HUB</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-neo-text-muted hover:text-neo-text hover:bg-neo-dark-3/50 rounded-lg transition-all duration-200"
            aria-label="Cerrar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Dashboard link */}
        <div className="px-3 pt-4 pb-2 space-y-1">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === '/dashboard'
                ? 'bg-neo-primary/10 text-neo-primary shadow-sm shadow-neo-primary/5'
                : 'text-neo-text-secondary hover:bg-neo-dark-3/50 hover:text-neo-text'
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {lang === 'ru' ? 'Главная' : 'Inicio'}
          </Link>

          <Link
            href="/learning"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname.startsWith('/learning')
                ? 'bg-neo-primary/10 text-neo-primary shadow-sm shadow-neo-primary/5'
                : 'text-neo-text-secondary hover:bg-neo-dark-3/50 hover:text-neo-text'
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
            {lang === 'ru' ? 'Мой путь' : 'Mi Ruta'}
          </Link>

          <Link
            href="/certificates"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname.startsWith('/certificates')
                ? 'bg-neo-primary/10 text-neo-primary shadow-sm shadow-neo-primary/5'
                : 'text-neo-text-secondary hover:bg-neo-dark-3/50 hover:text-neo-text'
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            {lang === 'ru' ? 'Сертификаты' : 'Mis Certificados'}
          </Link>
        </div>

        {/* Section divider label */}
        <div className="px-6 pt-3 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neo-text-muted/50">
            {lang === 'ru' ? 'Документация' : 'Documentacion'}
          </span>
        </div>

        {/* Sections */}
        <div className="relative flex-1 min-h-0">
          <nav className="h-full overflow-y-auto px-3 pb-6 sidebar-nav-scroll">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const isAnySectionDocActive = section.documents.some(
                  (d) => pathname === `/content/${section.id}/${d.slug}`
                );

                // Count completed docs in this section
                const sectionCompletedCount = section.documents.filter(
                  (d) => completedDocs.includes(d.filePath)
                ).length;
                const sectionTotal = section.documents.length;
                const sectionProgress = sectionTotal > 0 ? Math.round((sectionCompletedCount / sectionTotal) * 100) : 0;

                return (
                  <div key={section.id} className="mb-0.5">
                    {/* Section header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`
                        flex items-center justify-between w-full px-3 py-2
                        text-[11px] font-semibold uppercase tracking-wider
                        rounded-lg
                        transition-all duration-200
                        ${isAnySectionDocActive
                          ? 'text-neo-primary bg-neo-primary/5'
                          : 'text-neo-text-muted hover:text-neo-text-secondary hover:bg-neo-dark-3/30'
                        }
                      `}
                    >
                      <span className="truncate">{getSectionName(section)}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        {/* Section progress count */}
                        <span className={`
                          text-[9px] font-bold rounded-full min-w-[18px] h-[18px]
                          flex items-center justify-center px-1
                          ${sectionCompletedCount === sectionTotal && sectionTotal > 0
                            ? 'bg-neo-success/15 text-neo-success'
                            : isAnySectionDocActive
                              ? 'bg-neo-primary/15 text-neo-primary'
                              : 'bg-neo-dark-3/60 text-neo-text-muted'
                          }
                        `}>
                          {sectionCompletedCount}/{sectionTotal}
                        </span>
                        {/* Chevron */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-200 ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Section mini progress bar */}
                    {(sectionCompletedCount > 0 || accessedDocs.some(d => section.documents.some(sd => sd.filePath === d))) && (
                      <div className="mx-3 mt-0.5 mb-1">
                        <div className="h-[2px] bg-neo-dark-3/40 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              sectionCompletedCount === sectionTotal && sectionTotal > 0
                                ? 'bg-neo-success'
                                : 'bg-neo-primary/60'
                            }`}
                            style={{ width: `${sectionProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${expandedSections[section.id] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="py-0.5">
                        {section.documents.map((doc) => {
                          const href = `/content/${section.id}/${doc.slug}`;
                          const isActive = pathname === href;
                          const isDocCompleted = completedDocs.includes(doc.filePath);
                          const isDocAccessed = accessedDocs.includes(doc.filePath);

                          return (
                            <Link
                              key={doc.slug}
                              href={href}
                              onClick={onClose}
                              className={`
                                flex items-center gap-2 px-3 py-[7px] ml-3 text-[13px] rounded-lg
                                transition-all duration-200 border-l-2
                                ${isActive
                                  ? 'border-neo-primary bg-neo-primary/5 text-neo-primary font-medium'
                                  : 'border-transparent text-neo-text-body hover:border-neo-dark-4 hover:bg-neo-dark-3/30 hover:text-neo-text'
                                }
                              `}
                            >
                              {/* Progress indicator */}
                              {isDocCompleted ? (
                                <span className="w-4 h-4 rounded-full bg-neo-success/20 flex items-center justify-center flex-shrink-0">
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-neo-success">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </span>
                              ) : isDocAccessed ? (
                                <span className="w-4 h-4 rounded-full border-2 border-amber-400/60 flex-shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-neo-dark-4 flex-shrink-0" />
                              )}
                              <span className="truncate">{getDocTitle(doc)}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </nav>
          {/* Bottom fade gradient for scroll indication */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neo-dark-2 to-transparent" />
        </div>
      </aside>
    </>
  );
}
