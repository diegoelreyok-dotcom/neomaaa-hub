import fs from 'fs';
import path from 'path';
import { QuizLanguage, QuizPool } from './quiz-types';

const QUIZ_DIR = path.join(process.cwd(), 'src', 'content', 'quizzes');

function sanitizeDocPath(docPath: string): string | null {
  // Allow only segments like "section/slug" — letters, digits, dashes, underscores, one slash.
  if (!docPath || typeof docPath !== 'string') return null;
  if (docPath.length > 120) return null;
  if (!/^[a-z0-9_-]+\/[a-z0-9_-]+$/i.test(docPath)) return null;
  return docPath;
}

function poolFilePath(language: QuizLanguage, docPath: string): string {
  return path.join(QUIZ_DIR, language, `${docPath}.json`);
}

/**
 * Load the quiz pool for a given doc + language.
 * Returns null if the pool does not exist or is malformed.
 */
export function loadQuizPool(
  docPath: string,
  language: QuizLanguage
): QuizPool | null {
  const safeDoc = sanitizeDocPath(docPath);
  if (!safeDoc) return null;
  const filePath = poolFilePath(language, safeDoc);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !Array.isArray(parsed.questions) ||
      parsed.questions.length === 0
    ) {
      return null;
    }
    // Normalize / trust the on-disk shape.
    const pool: QuizPool = {
      docPath: safeDoc,
      language,
      questions: parsed.questions,
    };
    return pool;
  } catch {
    return null;
  }
}

export function quizExists(docPath: string, language: QuizLanguage): boolean {
  const safeDoc = sanitizeDocPath(docPath);
  if (!safeDoc) return false;
  return fs.existsSync(poolFilePath(language, safeDoc));
}

/**
 * Enumerate every quiz pool on disk.
 * Returns `[{ docPath: "section/slug", language: "es" }, ...]`.
 */
export function getAllQuizPaths(): Array<{ docPath: string; language: QuizLanguage }> {
  const result: Array<{ docPath: string; language: QuizLanguage }> = [];
  if (!fs.existsSync(QUIZ_DIR)) return result;

  for (const language of ['es', 'ru'] as QuizLanguage[]) {
    const langDir = path.join(QUIZ_DIR, language);
    if (!fs.existsSync(langDir)) continue;
    for (const section of fs.readdirSync(langDir)) {
      const sectionDir = path.join(langDir, section);
      if (!fs.statSync(sectionDir).isDirectory()) continue;
      for (const file of fs.readdirSync(sectionDir)) {
        if (!file.endsWith('.json')) continue;
        const slug = file.replace(/\.json$/, '');
        result.push({ docPath: `${section}/${slug}`, language });
      }
    }
  }
  return result;
}
