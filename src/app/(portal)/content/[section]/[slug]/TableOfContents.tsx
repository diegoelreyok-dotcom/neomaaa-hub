'use client';

import { useEffect, useMemo, useState } from 'react';
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
    if (/^```/.test(line.trim())) { inFence = !inFence; continue; }
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

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));
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
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const label = lang === 'ru' ? 'Содержание' : lang === 'en' ? 'On this page' : 'En esta página';

  return (
    <nav className="neo-toc" aria-label={label}>
      <div className="neo-toc-title">{label}</div>
      <ul className="neo-toc-list">
        {items.map((item) => (
          <li key={item.id} className="neo-toc-item">
            <a
              href={`#${item.id}`}
              className={`neo-toc-link ${item.level === 3 ? 'neo-toc-link--h3' : ''} ${activeId === item.id ? 'is-active' : ''}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
