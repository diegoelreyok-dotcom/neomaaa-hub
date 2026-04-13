/**
 * Quiz + Certificate type definitions.
 *
 * Quiz pools live in:
 *   src/content/quizzes/{language}/{docPath}.json
 * where docPath is "{section}/{slug}" (e.g. "encyclopedia/abc").
 */

export type QuizLanguage = 'es' | 'ru';

/** One question in the master pool. 30-50 questions per pool. */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[]; // exactly 4
  correctIndex: number; // 0..3 into options
  explanation?: string;
}

/** The full JSON-on-disk pool for one doc + language. */
export interface QuizPool {
  docPath: string; // e.g. "encyclopedia/abc"
  language: QuizLanguage;
  questions: QuizQuestion[]; // 30-50
}

/**
 * Stored in Redis while user is taking the quiz.
 * TTL: 30 min. If user closes the tab, session is lost (no resume).
 *
 * optionMapping: for each displayed question, an array of length 4 where
 * optionMapping[shownIndex] === originalIndex in the pool question.options.
 * correctIndex on this object is the correctIndex inside shuffledOptions.
 */
export interface QuizSessionQuestion {
  questionId: string;
  question: string;
  shuffledOptions: string[];
  optionMapping: number[];
  correctIndex: number;
}

export interface QuizSession {
  sessionId: string;
  userId: string;
  docPath: string;
  language: QuizLanguage;
  questions: QuizSessionQuestion[];
  startedAt: string;
}

/** POST /api/quiz/submit body. */
export interface QuizSubmission {
  sessionId: string;
  answers: number[]; // length === session.questions.length; each 0..3
}

/** Per-question detail in the result. */
export interface QuizResultQuestion {
  questionId: string;
  userAnswer: number; // index in shuffledOptions, or -1 if unanswered
  correct: boolean;
  correctAnswer: number; // index in shuffledOptions
  explanation?: string;
}

/** What the submit endpoint returns. */
export interface QuizResult {
  score: number; // 0..totalQuestions
  totalQuestions: number;
  passed: boolean; // score >= passThreshold
  passThreshold: number; // 7 of 10
  perQuestion: QuizResultQuestion[];
  certificateId?: string;
  /** Seconds the user must wait before retrying. Only present when !passed. */
  retryAfter?: number;
}

/** Emitted + persisted on passing. Overwritten only if new score is higher. */
export interface Certificate {
  id: string; // "CERT-{userId}-{slug}-{timestamp}" or crypto.randomUUID()
  userId: string;
  userName: string;
  docPath: string;
  docTitle: string;
  score: number;
  totalQuestions: number;
  language: QuizLanguage;
  issuedAt: string; // ISO timestamp
  attempts: number;
}

/** Constants. */
export const QUIZ_QUESTIONS_PER_ATTEMPT = 10;
export const QUIZ_PASS_THRESHOLD = 7;
export const QUIZ_SESSION_TTL_SECONDS = 30 * 60;
/** How long to block re-attempts after a failed quiz (1 hour). */
export const QUIZ_COOLDOWN_SECONDS = 60 * 60;
