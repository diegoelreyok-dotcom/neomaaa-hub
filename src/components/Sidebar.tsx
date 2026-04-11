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
}

export default function Sidebar({ sections, lang, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of sections) {
      initial[section.id] = true;
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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px]
          bg-neo-dark-2 border-r border-neo-dark-3
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neo-dark-3">
          <Link href="/dashboard" className="flex items-center gap-0" onClick={onClose}>
            <span className="text-xl font-extrabold tracking-tight text-neo-text">NEO</span>
            <span className="text-xl font-extrabold tracking-tight text-neo-primary">MAAA</span>
            <span className="text-xl font-extrabold tracking-tight text-neo-text-muted ml-1">HUB</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-neo-text-muted hover:text-neo-text transition-colors"
            aria-label="Cerrar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Dashboard link */}
        <div className="px-3 pt-4 pb-2">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === '/dashboard'
                ? 'bg-neo-primary/10 text-neo-primary'
                : 'text-neo-text-secondary hover:bg-neo-dark-3 hover:text-neo-text'
              }
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {lang === 'ru' ? 'Главная' : 'Inicio'}
          </Link>
        </div>

        {/* Sections */}
        <div className="relative flex-1 min-h-0">
          <nav className="h-full overflow-y-auto px-3 pb-6 sidebar-nav-scroll">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div key={section.id} className="mb-1">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="
                      flex items-center justify-between w-full px-3 py-2.5
                      text-xs font-semibold uppercase tracking-wider
                      text-neo-text-muted hover:text-neo-text-secondary
                      transition-colors duration-200 rounded-lg
                      hover:bg-neo-dark-3/50
                    "
                  >
                    <span>{getSectionName(section)}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 flex-shrink-0 ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Documents */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedSections[section.id] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    {section.documents.map((doc) => {
                      const href = `/content/${section.id}/${doc.slug}`;
                      const isActive = pathname === href;

                      return (
                        <Link
                          key={doc.slug}
                          href={href}
                          onClick={onClose}
                          className={`
                            block px-3 py-2 ml-3 text-[13px] rounded-lg
                            transition-all duration-200 border-l-2
                            ${isActive
                              ? 'border-neo-primary bg-neo-primary/5 text-neo-primary font-medium'
                              : 'border-transparent text-neo-text-body hover:border-neo-dark-4 hover:bg-neo-dark-3/50 hover:text-neo-text'
                            }
                          `}
                        >
                          {getDocTitle(doc)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
          </nav>
          {/* Bottom fade gradient for scroll indication */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neo-dark-2 to-transparent" />
        </div>
      </aside>
    </>
  );
}
