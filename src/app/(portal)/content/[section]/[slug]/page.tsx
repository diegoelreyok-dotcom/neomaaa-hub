import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getRole, getUserProgress } from '@/lib/db';
import { canAccessDocument } from '@/lib/permissions';
import { getSectionById, getDocByPath } from '@/lib/sections';
import { getMarkdownContent } from '@/lib/content';
import type { Lang } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import ProgressTracker from './ProgressTracker';
import CompletionButton from './CompletionButton';
import ReadingProgressBar from './ReadingProgressBar';
import TableOfContents from './TableOfContents';
import ContentStagger, { ContentStaggerItem } from './ContentStagger';
import DocHeader from './DocHeader';
import DocNavCards from './DocNavCards';

interface ContentPageProps {
  params: { section: string; slug: string };
}

function estimateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default async function ContentPage({ params }: ContentPageProps) {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = session?.user as any;
  const roleId: string = user?.roleId;
  const lang: Lang = user?.lang || 'es';

  const role = await getRole(roleId);
  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-8 max-w-md text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neo-danger/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-neo-text mb-2">
            {lang === 'ru' ? 'Ошибка аутентификации' : lang === 'en' ? 'Authentication error' : 'Error de autenticacion'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'Не удалось проверить вашу роль. Попробуйте войти снова.'
              : lang === 'en'
                ? 'Could not verify your role. Please sign in again.'
                : 'No se pudo verificar tu rol. Intenta iniciar sesion de nuevo.'
            }
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-neo-primary hover:text-neo-primary-light transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {lang === 'ru' ? 'Вернуться' : lang === 'en' ? 'Go back' : 'Volver al inicio'}
          </Link>
        </div>
      </div>
    );
  }

  const { section: sectionId, slug } = params;

  // Check access
  if (!canAccessDocument(role, sectionId, slug)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-8 max-w-md text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neo-danger/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-danger">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-neo-text mb-2">
            {lang === 'ru' ? 'Доступ ограничен' : lang === 'en' ? 'Access restricted' : 'Acceso restringido'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'У вас нет доступа к этому разделу. Обратитесь к администратору.'
              : lang === 'en'
                ? 'You do not have access to this section. Contact your administrator.'
                : 'No tienes acceso a esta seccion. Contacta al administrador.'
            }
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-neo-primary hover:text-neo-primary-light transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {lang === 'ru' ? 'Вернуться' : lang === 'en' ? 'Go back' : 'Volver al inicio'}
          </Link>
        </div>
      </div>
    );
  }

  // Get section and document metadata
  const section = getSectionById(sectionId);
  const doc = getDocByPath(sectionId, slug);

  if (!section || !doc) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-8 max-w-md text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neo-warning/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-warning">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-neo-text mb-2">
            {lang === 'ru' ? 'Документ не найден' : lang === 'en' ? 'Document not found' : 'Documento no encontrado'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'Запрашиваемый документ не существует.'
              : lang === 'en'
                ? 'The requested document does not exist.'
                : 'El documento solicitado no existe.'
            }
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-neo-primary hover:text-neo-primary-light transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {lang === 'ru' ? 'Вернуться' : lang === 'en' ? 'Go back' : 'Volver al inicio'}
          </Link>
        </div>
      </div>
    );
  }

  // Read content
  const content = getMarkdownContent(doc.filePath, lang);
  const docTitle =
    lang === 'ru' ? doc.titleRu : lang === 'en' ? (doc.titleEn || doc.titleEs) : doc.titleEs;
  const sectionName =
    lang === 'ru' ? section.nameRu : lang === 'en' ? (section.nameEn || section.nameEs) : section.nameEs;

  // Calculate reading time
  const readingTime = estimateReadingTime(content);

  // Check if user has already completed this document
  const userId = user?.userId;
  let isCompleted = false;
  if (userId) {
    try {
      const progress = await getUserProgress(userId);
      const docProgress = progress.find((p) => p.documentPath === doc.filePath);
      isCompleted = docProgress?.completed === true;
    } catch {
      // Non-critical — default to not completed
    }
  }

  // Previous / Next navigation within the section
  const docIndex = section.documents.findIndex((d) => d.slug === slug);
  const prevDoc = docIndex > 0 ? section.documents[docIndex - 1] : null;
  const nextDoc =
    docIndex < section.documents.length - 1 ? section.documents[docIndex + 1] : null;

  const prevTitle = prevDoc
    ? lang === 'ru'
      ? prevDoc.titleRu
      : lang === 'en'
        ? prevDoc.titleEn || prevDoc.titleEs
        : prevDoc.titleEs
    : '';
  const nextTitle = nextDoc
    ? lang === 'ru'
      ? nextDoc.titleRu
      : lang === 'en'
        ? nextDoc.titleEn || nextDoc.titleEs
        : nextDoc.titleEs
    : '';

  return (
    <div>
      {/* Reading progress bar (fixed top, cyan → burgundy gradient) */}
      <ReadingProgressBar />

      <ContentStagger>
        {/* Glass command header */}
        <ContentStaggerItem>
          <DocHeader
            lang={lang}
            sectionName={sectionName}
            docTitle={docTitle}
            readingTime={readingTime}
            docIndex={docIndex}
            docTotal={section.documents.length}
            pdfSlot={doc.pdfSlug ? <PdfDownloadButton pdfSlug={doc.pdfSlug} lang={lang} /> : null}
          />
        </ContentStaggerItem>

        {/* Content + sticky TOC (desktop only) */}
        <ContentStaggerItem>
          <div className="neo-content-layout">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(18,22,38,0.35) 0%, rgba(8,11,22,0.35) 100%)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <MarkdownRenderer content={content} />
              </div>
            </div>
            <aside className="hidden xl:block">
              <TableOfContents content={content} lang={lang} />
            </aside>
          </div>
        </ContentStaggerItem>

        {/* Completion button */}
        <ContentStaggerItem>
          <CompletionButton
            documentPath={doc.filePath}
            quizDocPath={`${sectionId}/${slug}`}
            docTitle={docTitle}
            lang={lang}
            isCompleted={isCompleted}
            userName={user?.name || ''}
          />
        </ContentStaggerItem>

        {/* Previous / Next navigation */}
        <ContentStaggerItem>
          <DocNavCards
            sectionId={sectionId}
            prev={prevDoc ? { slug: prevDoc.slug, title: prevTitle } : null}
            next={nextDoc ? { slug: nextDoc.slug, title: nextTitle } : null}
            lang={lang}
          />
        </ContentStaggerItem>
      </ContentStagger>

      {/* Progress tracker (client component, renders null) */}
      <ProgressTracker documentPath={doc.filePath} />
    </div>
  );
}
