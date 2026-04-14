'use client';

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

/* ─────────────────────────────────────────────
   Sanitization schema — HAST-level allowlist
   Runs AFTER rehype-raw parses any inline HTML. Blocks script/style/iframe/
   object/embed/form/input/link/meta/base and all on* event handlers. Strips
   javascript:/data: URLs on href (defaultSchema enforces safe protocols).
   ───────────────────────────────────────────── */
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'div', 'span', 'section', 'article', 'aside', 'figure', 'figcaption',
  ],
  attributes: {
    ...(defaultSchema.attributes || {}),
    '*': [
      ...((defaultSchema.attributes && defaultSchema.attributes['*']) || []),
      'className', 'id',
      'dataValue', 'dataLabel', 'dataTitle', 'dataNum',
      ['data-value'], ['data-label'], ['data-title'], ['data-num'],
    ],
    div: ['className', 'id', 'dataValue', 'dataLabel', 'dataTitle', 'dataNum'],
    span: ['className', 'id', 'dataValue', 'dataLabel', 'dataTitle', 'dataNum'],
    section: ['className', 'id'],
    article: ['className', 'id'],
    aside: ['className', 'id', 'role', 'ariaLabel'],
    a: [
      ...((defaultSchema.attributes && defaultSchema.attributes.a) || []),
      'target', 'rel', 'className',
    ],
    img: [
      ...((defaultSchema.attributes && defaultSchema.attributes.img) || []),
      'className', 'loading',
    ],
    code: [
      ...((defaultSchema.attributes && defaultSchema.attributes.code) || []),
      'className',
    ],
    input: ['type', 'checked', 'disabled'],
  },
  // Allow GFM task-list checkboxes explicitly.
  // defaultSchema forbids <style> tag; we also never include it in tagNames.
  // Do NOT allow: script, style, iframe, object, embed, form, link, meta, base
  // event handler attributes (on*) are stripped by default.
};

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

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

function extractText(node: any): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node?.props?.children) return extractText(node.props.children);
  return '';
}

/** Detect heading patterns (SEMANA N / DÍA N / PASO N / FASE N / MÓDULO N) */
function detectHeadingPattern(text: string): { type: string | null; num: string | null; icon: string } {
  const patterns: Array<{ re: RegExp; type: string; icon: string }> = [
    { re: /^(semana)\s+(\d+)/i, type: 'SEMANA', icon: 'calendar' },
    { re: /^(d[íi]a)\s+(\d+)/i, type: 'DÍA', icon: 'sun' },
    { re: /^(paso)\s+(\d+)/i, type: 'PASO', icon: 'footsteps' },
    { re: /^(fase)\s+(\d+)/i, type: 'FASE', icon: 'layers' },
    { re: /^(m[óo]dulo)\s+(\d+)/i, type: 'MÓDULO', icon: 'grid' },
    { re: /^(unidad)\s+(\d+)/i, type: 'UNIDAD', icon: 'box' },
    { re: /^(cap[íi]tulo)\s+(\d+)/i, type: 'CAPÍTULO', icon: 'book' },
  ];
  for (const p of patterns) {
    const m = text.match(p.re);
    if (m) return { type: p.type, num: m[2], icon: p.icon };
  }
  return { type: null, num: null, icon: '' };
}

/** Detect callout type from blockquote children */
function detectCalloutType(children: any): { type: string; content: any } | null {
  // Find first text in children
  const flat = Array.isArray(children) ? children : [children];
  // react-markdown passes <p> elements — peek at the first
  const first = flat.find((c: any) => c && typeof c === 'object' && c.props);
  if (!first) return null;
  const firstChildren = first.props?.children;
  const firstText = extractText(firstChildren);
  const match = firstText.match(/^\s*\[!(\w+)\]\s*(.*)/);
  if (!match) return null;
  const type = match[1].toUpperCase();
  const remainder = match[2];

  // Rebuild children with the [!TYPE] marker stripped from the first paragraph
  const rebuiltChildren = flat.map((c: any, i: number) => {
    if (i !== flat.indexOf(first)) return c;
    if (!c || typeof c !== 'object') return c;
    // Replace first text child of the first paragraph
    const kids = c.props?.children;
    const newKids = stripFirstMarker(kids);
    return { ...c, props: { ...c.props, children: newKids } };
  });

  // Filter out empty leading paragraph if remainder was empty
  const cleaned = rebuiltChildren.filter((c: any) => {
    if (!c || typeof c !== 'object') return true;
    const kids = c.props?.children;
    if (kids == null) return false;
    if (typeof kids === 'string' && kids.trim() === '') return false;
    if (Array.isArray(kids) && kids.length === 0) return false;
    return true;
  });

  return { type, content: cleaned.length ? cleaned : [remainder] };
}

function stripFirstMarker(children: any): any {
  if (typeof children === 'string') {
    return children.replace(/^\s*\[!\w+\]\s*/, '');
  }
  if (Array.isArray(children)) {
    if (children.length === 0) return children;
    const [first, ...rest] = children;
    if (typeof first === 'string') {
      const stripped = first.replace(/^\s*\[!\w+\]\s*/, '');
      return stripped ? [stripped, ...rest] : rest;
    }
    return [stripFirstMarker(first), ...rest];
  }
  if (children?.props?.children !== undefined) {
    return { ...children, props: { ...children.props, children: stripFirstMarker(children.props.children) } };
  }
  return children;
}

/* ─────────────────────────────────────────────
   Inline SVG icons (no external deps)
   ───────────────────────────────────────────── */
function Icon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };
  switch (name) {
    case 'info':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
    case 'warning':
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case 'alert':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    case 'lightbulb':
      return <svg {...common}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.4.4.7.9.8 1.4l.2.9h6l.2-.9c.1-.5.4-1 .8-1.4A7 7 0 0 0 12 2z" /></svg>;
    case 'flask':
      return <svg {...common}><path d="M9 2v6l-5 9a3 3 0 0 0 3 4h10a3 3 0 0 0 3-4l-5-9V2" /><line x1="9" y1="2" x2="15" y2="2" /><line x1="6" y1="14" x2="18" y2="14" /></svg>;
    case 'quote':
      return <svg {...common}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.8-2-2-2H4c-1 0-2 1-2 2v5c0 1 1 2 2 2h2.5c.5 0 1 .3 1 1 0 3-1 5-4 5" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.8-2-2-2h-4c-1 0-2 1-2 2v5c0 1 1 2 2 2h2.5c.5 0 1 .3 1 1 0 3-1 5-4 5" /></svg>;
    case 'calendar':
      return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case 'sun':
      return <svg {...common}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
    case 'footsteps':
      return <svg {...common}><polyline points="9 18 15 12 9 6" /></svg>;
    case 'layers':
      return <svg {...common}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
    case 'grid':
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
    case 'box':
      return <svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>;
    case 'book':
      return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case 'external':
      return <svg {...common}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
    case 'check':
      return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
    case 'arrow':
      return <svg {...common}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
    case 'copy':
      return <svg {...common}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────
   Callout component
   ───────────────────────────────────────────── */
const CALLOUT_CONFIG: Record<string, { icon: string; label: string; className: string }> = {
  INFO:    { icon: 'info',       label: 'Info',        className: 'neo-callout neo-callout-info' },
  NOTE:    { icon: 'info',       label: 'Nota',        className: 'neo-callout neo-callout-info' },
  WARNING: { icon: 'warning',    label: 'Atención',    className: 'neo-callout neo-callout-warning' },
  DANGER:  { icon: 'alert',      label: 'Peligro',     className: 'neo-callout neo-callout-danger' },
  ERROR:   { icon: 'alert',      label: 'Error',       className: 'neo-callout neo-callout-danger' },
  TIP:     { icon: 'lightbulb',  label: 'Tip',         className: 'neo-callout neo-callout-tip' },
  SUCCESS: { icon: 'check',      label: 'Éxito',       className: 'neo-callout neo-callout-tip' },
  EXAMPLE: { icon: 'flask',      label: 'Ejemplo',     className: 'neo-callout neo-callout-example' },
  QUOTE:   { icon: 'quote',      label: 'Cita',        className: 'neo-callout neo-callout-quote' },
};

function Callout({ type, children }: { type: string; children: any }) {
  const cfg = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.QUOTE;
  return (
    <aside className={cfg.className} role="note" aria-label={cfg.label}>
      <div className="neo-callout-icon"><Icon name={cfg.icon} className="w-[18px] h-[18px]" /></div>
      <div className="neo-callout-body">
        <div className="neo-callout-title">{cfg.label}</div>
        <div className="neo-callout-content">{children}</div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   Copy-button code block
   ───────────────────────────────────────────── */
function CodeBlock({ lang, code }: { lang: string | null; code: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  }, [code]);

  return (
    <div className="neo-code-wrapper">
      <div className="neo-code-header">
        <span className="neo-code-lang">{lang || 'code'}</span>
        <button
          type="button"
          onClick={onCopy}
          className="neo-code-copy"
          aria-label={copied ? 'Copiado' : 'Copiar código'}
        >
          <Icon name={copied ? 'check' : 'copy'} className="w-3.5 h-3.5" />
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>
      <pre className="neo-code-pre"><code>{code}</code></pre>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Components map
   ───────────────────────────────────────────── */
const components: Components = {
  h1: ({ children, ...rest }) => {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h1 id={id} className="neo-h1" {...(rest as any)}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...rest }) => {
    const text = extractText(children);
    const id = slugify(text);
    const pattern = detectHeadingPattern(text);
    const cleanedText = pattern.type && pattern.num
      ? text.replace(new RegExp(`^${pattern.type}\\s+${pattern.num}\\s*[:.-]?\\s*`, 'i'), '').trim()
      : text;

    return (
      <h2 id={id} className="neo-h2" {...(rest as any)}>
        {pattern.type && pattern.num ? (
          <>
            <span className="neo-h2-badge" aria-hidden>
              <Icon name={pattern.icon} className="w-3.5 h-3.5" />
              <span className="neo-h2-badge-type">{pattern.type}</span>
              <span className="neo-h2-badge-num">{pattern.num}</span>
            </span>
            <span className="neo-h2-text">{cleanedText || children}</span>
          </>
        ) : (
          <>
            <span className="neo-h2-bar" aria-hidden />
            <span className="neo-h2-text">{children}</span>
          </>
        )}
      </h2>
    );
  },
  h3: ({ children, ...rest }) => {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h3 id={id} className="neo-h3" {...(rest as any)}>
        <span className="neo-h3-dot" aria-hidden />
        <span>{children}</span>
      </h3>
    );
  },
  h4: ({ children, ...rest }) => {
    const text = extractText(children);
    const id = slugify(text);
    return <h4 id={id} className="neo-h4" {...(rest as any)}>{children}</h4>;
  },

  blockquote: ({ children, ...rest }) => {
    const detected = detectCalloutType(children);
    if (detected) return <Callout type={detected.type}>{detected.content}</Callout>;
    return <blockquote className="neo-blockquote" {...(rest as any)}>{children}</blockquote>;
  },

  hr: () => (
    <div className="neo-hr" role="separator" aria-hidden>
      <span className="neo-hr-dot" />
    </div>
  ),

  a: ({ href, children, ...rest }) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="neo-link"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as any)}
      >
        {children}
        {isExternal && <Icon name="external" className="neo-link-icon" />}
      </a>
    );
  },

  img: ({ src, alt, ...rest }) => (
    <figure className="neo-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src as string} alt={alt || ''} loading="lazy" className="neo-img" {...(rest as any)} />
      {alt && <figcaption className="neo-figcaption">{alt}</figcaption>}
    </figure>
  ),

  table: ({ children, ...rest }) => (
    <div className="neo-table-wrapper">
      <table className="neo-table" {...(rest as any)}>{children}</table>
    </div>
  ),

  code: ({ inline, className, children, ...rest }: any) => {
    // react-markdown v9+ removed the `inline` prop. Detect block code by the
    // presence of a `language-*` className (added by remark for fenced blocks).
    // Without that, treat as inline to avoid <div> inside <p> hydration errors.
    const match = /language-(\w+)/.exec(className || '');
    const isBlock = !!match || (typeof children === 'string' && children.includes('\n'));
    if (inline || !isBlock) {
      return <code className="neo-code-inline" {...rest}>{children}</code>;
    }
    const lang = match ? match[1] : null;
    const code = String(children).replace(/\n$/, '');
    return <CodeBlock lang={lang} code={code} />;
  },

  pre: ({ children }) => <>{children}</>,

  ul: ({ children, ...rest }) => {
    // Detect task list by looking for checkbox input descendants
    const rawChildren = Array.isArray(children) ? children : [children];
    const hasTask = rawChildren.some((c: any) => {
      const kids = c?.props?.children;
      if (!kids) return false;
      const arr = Array.isArray(kids) ? kids : [kids];
      return arr.some((k: any) => k?.props?.type === 'checkbox' || k?.type === 'input');
    });
    return <ul className={hasTask ? 'neo-ul neo-ul-task' : 'neo-ul'} {...(rest as any)}>{children}</ul>;
  },

  ol: ({ children, ...rest }) => <ol className="neo-ol" {...(rest as any)}>{children}</ol>,

  li: ({ children, ...rest }: any) => {
    // Strip default GFM checkbox rendering and replace with custom
    const kids = Array.isArray(children) ? children : [children];
    const checkboxIdx = kids.findIndex((k: any) => k?.props?.type === 'checkbox');
    if (checkboxIdx !== -1) {
      const checkbox = kids[checkboxIdx];
      const isChecked = !!checkbox.props?.checked;
      const rest2 = kids.filter((_: any, i: number) => i !== checkboxIdx);
      return (
        <li className={`neo-li-task ${isChecked ? 'is-checked' : ''}`} {...(rest as any)}>
          <span className="neo-task-box" aria-hidden>
            {isChecked && <Icon name="check" className="w-3 h-3" />}
          </span>
          <span>{rest2}</span>
        </li>
      );
    }
    return <li className="neo-li" {...(rest as any)}>{children}</li>;
  },
};

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-section neo-markdown">
      <ReactMarkdown
        // Order matters: rehypeRaw parses inline HTML into HAST nodes first,
        // then rehypeSanitize strips anything not in the allowlist.
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
