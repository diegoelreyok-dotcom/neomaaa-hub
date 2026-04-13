import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { quizExists } from '@/lib/quiz-pools';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const docPath = searchParams.get('docPath') || '';

  if (!docPath) {
    return NextResponse.json({ error: 'Falta docPath' }, { status: 400 });
  }

  const hasEs = quizExists(docPath, 'es');
  const hasRu = quizExists(docPath, 'ru');

  let language: 'es' | 'ru' | 'both' | null = null;
  if (hasEs && hasRu) language = 'both';
  else if (hasEs) language = 'es';
  else if (hasRu) language = 'ru';

  return NextResponse.json({
    exists: hasEs || hasRu,
    language,
    es: hasEs,
    ru: hasRu,
  });
}
