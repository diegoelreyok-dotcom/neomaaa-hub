import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/lib/auth';
import { loadQuizPool } from '@/lib/quiz-pools';
import { createQuizSession } from '@/lib/quiz-storage';
import {
  QuizLanguage,
  QuizSession,
  QuizSessionQuestion,
  QUIZ_QUESTIONS_PER_ATTEMPT,
} from '@/lib/quiz-types';

function shuffle<T>(arr: T[]): T[] {
  // Fisher-Yates using crypto-strong randomness.
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newSessionId(): string {
  return `sess_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
}

function validLanguage(v: unknown): v is QuizLanguage {
  return v === 'es' || v === 'ru';
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  let body: { docPath?: unknown; language?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const docPath = typeof body.docPath === 'string' ? body.docPath : '';
  const language = body.language;
  if (!docPath || !validLanguage(language)) {
    return NextResponse.json(
      { error: 'Parametros invalidos: docPath, language' },
      { status: 400 }
    );
  }

  const pool = loadQuizPool(docPath, language);
  if (!pool) {
    return NextResponse.json(
      { error: 'Quiz no disponible para este documento' },
      { status: 404 }
    );
  }
  if (pool.questions.length < QUIZ_QUESTIONS_PER_ATTEMPT) {
    return NextResponse.json(
      { error: 'Pool de preguntas insuficiente' },
      { status: 500 }
    );
  }

  // Pick N random questions from the pool, then shuffle options for each.
  const picked = shuffle(pool.questions).slice(0, QUIZ_QUESTIONS_PER_ATTEMPT);

  const sessionQuestions: QuizSessionQuestion[] = picked.map((q) => {
    // indexMap[i] === original index of option now at position i
    const indexMap = shuffle([0, 1, 2, 3]);
    const shuffledOptions = indexMap.map((origIdx) => q.options[origIdx]);
    const correctShown = indexMap.indexOf(q.correctIndex);
    return {
      questionId: q.id,
      question: q.question,
      shuffledOptions,
      optionMapping: indexMap,
      correctIndex: correctShown,
    };
  });

  const userId = (session.user as any).userId as string;

  const sessionId = newSessionId();
  const fullSession: QuizSession = {
    sessionId,
    userId,
    docPath: pool.docPath,
    language,
    questions: sessionQuestions,
    startedAt: new Date().toISOString(),
  };

  await createQuizSession(fullSession);

  // Strip correctIndex / optionMapping from the client payload.
  return NextResponse.json({
    sessionId,
    docPath: pool.docPath,
    language,
    totalQuestions: sessionQuestions.length,
    questions: sessionQuestions.map((q) => ({
      id: q.questionId,
      question: q.question,
      options: q.shuffledOptions,
    })),
  });
}
