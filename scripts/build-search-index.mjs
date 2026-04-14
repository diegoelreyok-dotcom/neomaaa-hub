#!/usr/bin/env node
/**
 * Build static search index.
 *
 * Reads every markdown doc under src/content/{es,ru}/**, strips markdown
 * down to plain text for token-based scoring, cross-references with
 * src/lib/sections.ts for canonical titles/slugs, and emits
 * public/search-index.json.
 *
 * Consumed by:
 *   - Client-side (SearchBar component, lazy fetch on first Cmd+K)
 *   - Server-side (/api/kb/search, cached in-memory singleton)
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// jiti lets us import the TS sections file without a separate build step.
const jiti = require('jiti')(ROOT, { interopDefault: true, esmResolve: true });
const { SECTIONS } = jiti(path.join(ROOT, 'src/lib/sections.ts'));

const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const OUT_FILE = path.join(ROOT, 'public', 'search-index.json');

/**
 * Strip markdown formatting to plain text (retains semantic words only).
 * Order matters — strip block-level first, then inline, then cleanup.
 */
function stripMarkdown(md) {
  let t = md;

  // Remove frontmatter (--- ... --- at top)
  t = t.replace(/^---[\s\S]*?---\n/, '');

  // Remove fenced code blocks
  t = t.replace(/```[\s\S]*?```/g, ' ');
  // Remove inline code
  t = t.replace(/`[^`\n]+`/g, ' ');

  // Remove HTML tags (incl multi-line) — components like <div>, <br/>, JSX-ish
  t = t.replace(/<[^>]+>/g, ' ');

  // Remove images ![alt](src) and links [text](url) keeping the text
  t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, ' ');
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

  // Obsidian-style callouts: lines starting "> [!INFO]" etc
  t = t.replace(/^\s*>\s*\[![A-Z]+\][^\n]*/gim, ' ');
  // Blockquote markers
  t = t.replace(/^\s*>\s?/gim, '');

  // Table pipes and separator rows
  t = t.replace(/^\s*\|?[\s-:|]+\|?\s*$/gim, ' '); // separator rows with only - : |
  t = t.replace(/\|/g, ' ');

  // Headings, list markers, HR
  t = t.replace(/^#+\s*/gim, '');
  t = t.replace(/^[-*+]\s+/gim, '');
  t = t.replace(/^\d+\.\s+/gim, '');
  t = t.replace(/^---+$/gim, ' ');

  // Bold/italic/strike markers (keep the text)
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
  t = t.replace(/\*([^*]+)\*/g, '$1');
  t = t.replace(/__([^_]+)__/g, '$1');
  t = t.replace(/_([^_\n]+)_/g, '$1');
  t = t.replace(/~~([^~]+)~~/g, '$1');

  // HTML entities we care about
  t = t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  // Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim();

  return t;
}

function extractTitle(md) {
  // First H1, skipping frontmatter
  const withoutFm = md.replace(/^---[\s\S]*?---\n/, '');
  const m = withoutFm.match(/^\s*#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}

/** Build a lookup: "section/slug.md" -> { sectionId, slug, titleEs, titleRu } */
function buildDocIndex() {
  const byFilePath = new Map();
  for (const section of SECTIONS) {
    for (const doc of section.documents) {
      byFilePath.set(doc.filePath, {
        sectionId: section.id,
        slug: doc.slug,
        titleEs: doc.titleEs,
        titleRu: doc.titleRu,
      });
    }
  }
  return byFilePath;
}

function walkMarkdown(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile() && e.name.endsWith('.md')) out.push(full);
    }
  }
  return out;
}

function buildForLang(lang, docIndex) {
  const langDir = path.join(CONTENT_DIR, lang);
  const files = walkMarkdown(langDir);
  const entries = [];

  for (const file of files) {
    const rel = path.relative(langDir, file).split(path.sep).join('/');
    const meta = docIndex.get(rel);

    // Skip top-level stragglers not in sections.ts (like dashboard.md).
    // We still index them but without canonical titles — using H1 as fallback.
    const md = fs.readFileSync(file, 'utf-8');
    const h1 = extractTitle(md) || rel.replace(/\.md$/, '');
    const body = stripMarkdown(md);
    const wordCount = body ? body.split(/\s+/).length : 0;

    const sectionId = meta?.sectionId || rel.split('/')[0] || 'misc';
    const slug = meta?.slug || path.basename(rel, '.md');
    const titleEs = meta?.titleEs || h1;
    const titleRu = meta?.titleRu || h1;
    const docPath = `${sectionId}/${slug}`;

    entries.push({
      docPath,
      section: sectionId,
      slug,
      titleEs,
      titleRu,
      language: lang,
      body,
      wordCount,
    });
  }

  return entries;
}

function main() {
  const docIndex = buildDocIndex();
  const es = buildForLang('es', docIndex);
  const ru = buildForLang('ru', docIndex);
  const all = [...es, ...ru];

  if (es.length < 20) {
    console.warn(
      `[build-search-index] WARNING: only ${es.length} ES docs indexed — expected 20+. Check src/content/es/.`,
    );
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(all));

  const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  console.log(
    `[build-search-index] wrote ${all.length} entries (${es.length} ES, ${ru.length} RU) -> ${path.relative(ROOT, OUT_FILE)} (${sizeKb} KB)`,
  );
}

main();
