'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/types';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  content: string;
  lang: Lang;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseHeadings(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const items: TocItem[] = [];
  let inFence = false;
  for (const raw of lines) {
    const line = raw;
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[*_`]/g, '').trim();
      const id = slugify(text);
      if (id) items.push({ id, text, level });
    }
  }
  return items;
}

export default function TableOfContents({ content, lang }: Props) {
  const items = useMemo(() => parseHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Track "passed" headings (scrolled past the top)
    const updatePassed = () => {
      const passed = new Set<string>();
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < 120) passed.add(item.id);
      });
      setPassedIds(passed);
    };
    updatePassed();
    window.addEventListener('scroll', updatePassed, { passive: true });
    window.addEventListener('resize', updatePassed);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updatePassed);
      window.removeEventListener('resize', updatePassed);
    };
  }, [items]);

  if (items.length < 2) return null;

  const label =
    lang === 'ru' ? 'Содержание' : lang === 'en' ? 'On this page' : 'En esta página';

  return (
    <motion.nav
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-label={label}
      className="neo-toc-glass relative sticky top-24 self-start overflow-hidden rounded-2xl"
      style={{
        background:
          'linear-gradient(135deg, rgba(18,22,38,0.6) 0%, rgba(8,11,22,0.6) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxHeight: 'calc(100vh - 120px)',
      }}
    >
      {/* Gradient mesh bar at top */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #C94A5C 35%, #98283A 65%, transparent 100%)',
          opacity: 0.7,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-5 pb-3 pt-5">
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-md"
          style={{
            background: 'rgba(152, 40, 58, 0.15)',
            border: '1px solid rgba(152, 40, 58, 0.3)',
            color: '#C94A5C',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </span>
        <span
          className="text-[10px] font-bold uppercase"
          style={{
            letterSpacing: '0.12em',
            color: '#94A3B8',
          }}
        >
          {label}
        </span>
      </div>

      {/* List */}
      <ul
        className="list-none space-y-0.5 overflow-y-auto px-2 pb-5"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          const isPassed = passedIds.has(item.id);
          const isH3 = item.level === 3;

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + idx * 0.03,
              }}
              className="relative"
            >
              <a
                href={`#${item.id}`}
                className="group relative flex items-center gap-2 rounded-lg py-1.5 pl-3 pr-2 transition-all duration-200"
                style={{
                  paddingLeft: isH3 ? 22 : 12,
                  color: isActive
                    ? '#FFFFFF'
                    : isPassed
                      ? '#94A3B8'
                      : '#6B7280',
                  fontSize: isH3 ? 11.5 : 13,
                  fontWeight: isActive ? 600 : isH3 ? 400 : 500,
                  lineHeight: 1.4,
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(152,40,58,0.15) 0%, rgba(152,40,58,0.03) 100%)'
                    : 'transparent',
                }}
              >
                {/* Active accent bar */}
                <span
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 w-[2px] rounded-full transition-all duration-300"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, #C94A5C 0%, #98283A 100%)'
                      : 'transparent',
                    boxShadow: isActive
                      ? '0 0 8px rgba(152, 40, 58, 0.7)'
                      : 'none',
                    transform: isActive ? 'scaleY(1)' : 'scaleY(0.3)',
                    transformOrigin: 'center',
                  }}
                />

                {/* Progress dot */}
                <span
                  aria-hidden
                  className="flex h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
                  style={{
                    background: isActive
                      ? '#C94A5C'
                      : isPassed
                        ? 'rgba(152, 40, 58, 0.5)'
                        : 'rgba(107, 114, 128, 0.35)',
                    boxShadow: isActive
                      ? '0 0 8px rgba(152, 40, 58, 0.8)'
                      : 'none',
                  }}
                />

                <span className="truncate">{item.text}</span>
              </a>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
