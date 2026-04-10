import fs from 'fs';
import path from 'path';
import { Lang } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export function getMarkdownContent(filePath: string, lang: Lang): string {
  const fullPath = path.join(CONTENT_DIR, lang, filePath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    // Fallback to Spanish if Russian file doesn't exist
    if (lang === 'ru') {
      const fallbackPath = path.join(CONTENT_DIR, 'es', filePath);
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
