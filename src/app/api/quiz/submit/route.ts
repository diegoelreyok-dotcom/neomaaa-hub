import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/lib/auth';
import {
  clearCooldown,
  deleteQuizSession,
  getCertificate,
  getQuizSession,
  saveCertificate,
  setCooldown,
} from '@/lib/quiz-storage';
import { loadQuizPool } from '@/lib/quiz-pools';
import { getDocByPath } from '@/lib/sections';
import { getRole, markCompleted } from '@/lib/db';
import {
  Certificate,
  QuizResult,
  QuizResultQuestion,
  QUIZ_COOLDOWN_SECONDS,
  QUIZ_PASS_THRESHOLD,
} from '@/lib/quiz-types';

function newCertId(userId: string, docPath: string): string {
  const slug = docPath.replace(/\//g, '-').replace(/[^a-zA-Z0-9_-]/g, '');
  const safeUser = userId.replace(/[^a-zA-Z0-9_-]/g, '');
  const rand = crypto.randomBytes(4).toString('hex');
  return `CERT-${safeUser}-${slug}-${Date.now()}-${rand}`;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  let body: { sessionId?: unknown; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  const answersRaw = body.answers;

  if (!sessionId || !Array.isArray(answersRaw)) {
    return NextResponse.json(
      { error: 'Parametros invalidos: sessionId, answers' },
      { status: 400 }
    );
  }

  const quizSession = await getQuizSession(sessionId);
  if (!quizSession) {
    return NextResponse.json(
      { error: 'Sesion expirada o invalida' },
      { status: 404 }
    );
  }

  const userId = (session.user as any).userId as string;
  const userName = (session.user as any).name || session.user.name || userId;

  if (quizSession.userId !== userId) {
    return NextResponse.json({ error: 'Sesion de otro usuario' }, { status: 403 });
  }

  // Section-level permission check as second layer (role may have changed
  // between /start and /submit, revoking access).
  const roleId = (session.user as any).roleId as string | undefined;
  const isAdmin = (session.user as any).isAdmin as boolean | undefined;
  if (!isAdmin && roleId !== 'admin') {
    const section = quizSession.docPath.split('/')[0];
    if (!section) {
      return NextResponse.json(
        { error: 'forbidden', message: 'No tienes acceso a esta sección' },
        { status: 403 }
      );
    }
    const role = roleId ? await getRole(roleId) : null;
    if (!role || !Array.isArray(role.sections) || !role.sections.includes(section)) {
      return NextResponse.json(
        { error: 'forbidden', message: 'No tienes acceso a esta sección' },
        { status: 403 }
      );
    }
  }

  if (answersRaw.length !== quizSession.questions.length) {
    return NextResponse.json(
      {
        error: `Se esperan ${quizSession.questions.length} respuestas, se recibieron ${answersRaw.length}`,
      },
      { status: 400 }
    );
  }

  // Normalize + validate answers. -1 means unanswered.
  const answers: number[] = answersRaw.map((a) => {
    const n = typeof a === 'number' ? a : parseInt(String(a), 10);
    if (Number.isNaN(n)) return -1;
    if (n < 0 || n > 3) return -1;
    return n;
  });

  // Pull original pool so we can attach explanations to the result.
  const pool = loadQuizPool(quizSession.docPath, quizSession.language);
  const explanationById = new Map<string, string | undefined>();
  if (pool) {
    for (const q of pool.questions) {
      explanationById.set(q.id, q.explanation);
    }
  }

  let score = 0;
  const perQuestion: QuizResultQuestion[] = quizSession.questions.map((q, i) => {
    const userAnswer = answers[i];
    const correct = userAnswer === q.correctIndex;
    if (correct) score += 1;
    return {
      questionId: q.questionId,
      userAnswer,
      correct,
      correctAnswer: q.correctIndex,
      explanation: explanationById.get(q.questionId),
    };
  });

  const totalQuestions = quizSession.questions.length;
  const passed = score >= QUIZ_PASS_THRESHOLD;

  let certificateId: string | undefined;
  let retryAfter: number | undefined;

  if (passed) {
    // Clean up any stale cooldown from previous failures.
    await clearCooldown(userId, quizSession.docPath);
    // Passing the quiz is itself proof of reading → mark progress completed.
    // This bypasses /api/progress PATCH strict checks intentionally.
    try {
      await markCompleted(userId, quizSession.docPath);
    } catch {
      // non-critical
    }
  } else {
    await setCooldown(userId, quizSession.docPath, QUIZ_COOLDOWN_SECONDS);
    retryAfter = QUIZ_COOLDOWN_SECONDS;
  }

  if (passed) {
    // Resolve doc title (defensive: docPath = "section/slug").
    const [sectionId, slug] = quizSession.docPath.split('/');
    const docMeta = getDocByPath(sectionId, slug);
    const docTitle =
      docMeta?.[quizSession.language === 'ru' ? 'titleRu' : 'titleEs'] ||
      quizSession.docPath;

    const existing = await getCertificate(userId, quizSession.docPath);

    if (!existing) {
      const newCert: Certificate = {
        id: newCertId(userId, quizSession.docPath),
        userId,
        userName,
        docPath: quizSession.docPath,
        docTitle,
        score,
        totalQuestions,
        language: quizSession.language,
        issuedAt: new Date().toISOString(),
        attempts: 1,
      };
      await saveCertificate(newCert);
      certificateId = newCert.id;
    } else {
      // Always bump attempts; overwrite score + issuedAt only if improved.
      const improved = score > existing.score;
      const updated: Certificate = {
        ...existing,
        userName, // keep name fresh
        docTitle,
        score: improved ? score : existing.score,
        totalQuestions,
        language: quizSession.language,
        issuedAt: improved ? new Date().toISOString() : existing.issuedAt,
        attempts: (existing.attempts || 1) + 1,
      };
      await saveCertificate(updated);
      certificateId = updated.id;
    }
  }

  // Consume the session regardless of outcome (no partial resume).
  await deleteQuizSession(sessionId);

  // Redact correctAnswer + explanation on fail to prevent cheating.
  // Only reveal answers when the user has passed.
  const perQuestionSafe: QuizResultQuestion[] = passed
    ? perQuestion
    : perQuestion.map((pq) => ({
        questionId: pq.questionId,
        userAnswer: pq.userAnswer,
        correct: pq.correct,
        // correctAnswer + explanation intentionally omitted on failure.
      })) as QuizResultQuestion[];

  const result: QuizResult = {
    score,
    totalQuestions,
    passed,
    passThreshold: QUIZ_PASS_THRESHOLD,
    perQuestion: perQuestionSafe,
    certificateId,
    retryAfter,
  };

  return NextResponse.json(result);
}
