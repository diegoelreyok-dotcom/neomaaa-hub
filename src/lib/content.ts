import fs from 'fs';
import path from 'path';
import { Lang } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

/**
 * Safely resolve a content file path, preventing directory traversal attacks.
 * Returns null if the resolved path escapes the content directory.
 */
function safeResolvePath(filePath: string, lang: Lang): string | null {
  // Reject obviously malicious input
  if (!filePath || typeof filePath !== 'string') return null;
  if (filePath.includes('\0')) return null; // null byte injection

  // Normalize and resolve the full path
  const resolved = path.resolve(CONTENT_DIR, lang, filePath);

  // Ensure the resolved path is within CONTENT_DIR
  const expectedPrefix = path.resolve(CONTENT_DIR, lang) + path.sep;
  if (!resolved.startsWith(expectedPrefix)) return null;

  // Only allow .md files
  if (!resolved.endsWith('.md')) return null;

  return resolved;
}

/**
 * Banner prepended to the markdown when we fall back to ES content because the
 * user's preferred language does not have a translation yet. Kept as a GitHub-
 * style blockquote so MarkdownRenderer picks it up without extra plumbing.
 */
const FALLBACK_BANNERS: Partial<Record<Lang, string>> = {
  en: [
    '> [!INFO] English translation coming soon. Showing Spanish version.',
    '',
    '',
  ].join('\n'),
};

export function getMarkdownContent(filePath: string, lang: Lang): string {
  const fullPath = safeResolvePath(filePath, lang);
  if (!fullPath) {
    // Can still fall through to ES fallback below when lang resolution failed.
  } else {
    try {
      return fs.readFileSync(fullPath, 'utf-8');
    } catch {
      // fall through to ES fallback
    }
  }

  // Fallback to Spanish if the requested language's file doesn't exist.
  if (lang === 'ru' || lang === 'en') {
    const fallbackPath = safeResolvePath(filePath, 'es');
    if (!fallbackPath) return '';
    try {
      const es = fs.readFileSync(fallbackPath, 'utf-8');
      const banner = FALLBACK_BANNERS[lang];
      return banner ? banner + es : es;
    } catch {
      return '';
    }
  }
  return '';
}

export function getDashboardContent(lang: Lang): string {
  return getMarkdownContent('dashboard.md', lang);
}
