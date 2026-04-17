/**
 * i18n coverage report for EN translations.
 *
 * Walks src/content/es/ and checks which files have matching EN files
 * under src/content/en/. Prints a per-section coverage summary plus a list
 * of missing docs.
 *
 * Usage:
 *   npx tsx scripts/i18n-coverage.ts
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');
const ES_DIR = path.join(ROOT, 'src', 'content', 'es');
const EN_DIR = path.join(ROOT, 'src', 'content', 'en');

interface DocInfo {
  section: string;
  slug: string;
  relPath: string; // "sales/training.md"
}

function walkMarkdown(baseDir: string): DocInfo[] {
  const out: DocInfo[] = [];
  if (!fs.existsSync(baseDir)) return out;
  for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const sectionDir = path.join(baseDir, entry.name);
    for (const file of fs.readdirSync(sectionDir)) {
      if (!file.endsWith('.md')) continue;
      out.push({
        section: entry.name,
        slug: file.replace(/\.md$/, ''),
        relPath: `${entry.name}/${file}`,
      });
    }
  }
  return out;
}

function main() {
  const esDocs = walkMarkdown(ES_DIR);
  const enDocs = walkMarkdown(EN_DIR);
  const enSet = new Set(enDocs.map((d) => d.relPath));

  const bySection: Record<string, { total: number; translated: number; missing: string[] }> = {};
  for (const doc of esDocs) {
    const b = (bySection[doc.section] ??= { total: 0, translated: 0, missing: [] });
    b.total += 1;
    if (enSet.has(doc.relPath)) {
      b.translated += 1;
    } else {
      b.missing.push(doc.relPath);
    }
  }

  const sections = Object.keys(bySection).sort();
  let total = 0;
  let translated = 0;

  console.log('EN translation coverage');
  console.log('=======================');
  console.log('');
  console.log(`${'Section'.padEnd(18)} ${'Translated'.padStart(12)} ${'Total'.padStart(6)} ${'Coverage'.padStart(10)}`);
  console.log('-'.repeat(50));
  for (const s of sections) {
    const b = bySection[s];
    total += b.total;
    translated += b.translated;
    const pct = b.total > 0 ? Math.round((b.translated / b.total) * 100) : 0;
    console.log(`${s.padEnd(18)} ${String(b.translated).padStart(12)} ${String(b.total).padStart(6)} ${(pct + '%').padStart(10)}`);
  }
  console.log('-'.repeat(50));
  const overallPct = total > 0 ? Math.round((translated / total) * 100) : 0;
  console.log(`${'TOTAL'.padEnd(18)} ${String(translated).padStart(12)} ${String(total).padStart(6)} ${(overallPct + '%').padStart(10)}`);
  console.log('');

  // Missing list
  const missingTotal = total - translated;
  if (missingTotal > 0) {
    console.log(`Missing (${missingTotal}):`);
    for (const s of sections) {
      const b = bySection[s];
      for (const m of b.missing) {
        console.log(`  - ${m}`);
      }
    }
  } else {
    console.log('No missing documents — EN coverage at 100%.');
  }
}

main();
