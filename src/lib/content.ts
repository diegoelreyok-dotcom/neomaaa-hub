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

export function getMarkdownContent(filePath: string, lang: Lang): string {
  const fullPath = safeResolvePath(filePath, lang);
  if (!fullPath) return '';

  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    // Fallback to Spanish if Russian file doesn't exist
    if (lang === 'ru') {
      const fallbackPath = safeResolvePath(filePath, 'es');
      if (!fallbackPath) return '';
      try {
        return fs.readFileSync(fallbackPath, 'utf-8');
      } catch {
        return '';
      }
    }
    return '';
  }
}

export function getDashboardContent(lang: Lang): string {
  return getMarkdownContent('dashboard.md', lang);
}
