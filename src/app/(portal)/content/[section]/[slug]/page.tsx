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

interface ContentPageProps {
  params: { section: string; slug: string };
}

function estimateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default async function ContentPage({ params }: ContentPageProps) {
  const session = await auth();
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
            {lang === 'ru' ? 'Ошибка аутентификации' : 'Error de autenticacion'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'Не удалось проверить вашу роль. Попробуйте войти снова.'
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
            {lang === 'ru' ? 'Вернуться' : 'Volver al inicio'}
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
            {lang === 'ru' ? 'Доступ ограничен' : 'Acceso restringido'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'У вас нет доступа к этому разделу. Обратитесь к администратору.'
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
            {lang === 'ru' ? 'Вернуться' : 'Volver al inicio'}
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
            {lang === 'ru' ? 'Документ не найден' : 'Documento no encontrado'}
          </h2>
          <p className="text-sm text-neo-text-muted mb-5">
            {lang === 'ru'
              ? 'Запрашиваемый документ не существует.'
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
            {lang === 'ru' ? 'Вернуться' : 'Volver al inicio'}
          </Link>
        </div>
      </div>
    );
  }

  // Read content
  const content = getMarkdownContent(doc.filePath, lang);
  const docTitle = lang === 'ru' ? doc.titleRu : doc.titleEs;
  const sectionName = lang === 'ru' ? section.nameRu : section.nameEs;

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
  const nextDoc = docIndex < section.documents.length - 1 ? section.documents[docIndex + 1] : null;

  return (
    <div>
      {/* Reading progress bar (fixed top) */}
      <ReadingProgressBar />

      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-2 text-[13px] mb-6" aria-label="Breadcrumb">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-neo-text-muted hover:text-neo-primary transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="hidden sm:inline">{lang === 'ru' ? 'Главная' : 'Inicio'}</span>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-dark-5 flex-shrink-0">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-neo-text-muted">{sectionName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-dark-5 flex-shrink-0">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-neo-text font-medium">{docTitle}</span>
      </nav>

      {/* Document header with meta */}
      <div className="mb-6 pb-5 border-b border-neo-dark-3/50">
        <div className="flex items-center flex-wrap gap-3">
          {/* Reading time badge */}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neo-text-muted bg-neo-dark-2 border border-neo-dark-3/60 rounded-full px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readingTime} min {lang === 'ru' ? 'чтения' : 'de lectura'}
          </span>

          {/* Section badge */}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neo-primary/80 bg-neo-primary/5 border border-neo-primary/10 rounded-full px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75" />
              <path d="M13.06 6.31l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            {sectionName}
          </span>

          {/* Doc position indicator */}
          <span className="text-[11px] text-neo-text-muted/60">
            {docIndex + 1} / {section.documents.length}
          </span>
        </div>
      </div>

      {/* PDF Download */}
      {doc.pdfSlug && <PdfDownloadButton pdfSlug={doc.pdfSlug} lang={lang} />}

      {/* Content + sticky TOC (desktop only) */}
      <div className="neo-content-layout">
        <div>
          <MarkdownRenderer content={content} />
        </div>
        <aside className="hidden xl:block">
          <TableOfContents content={content} lang={lang} />
        </aside>
      </div>

      {/* Completion button */}
      <CompletionButton
        documentPath={doc.filePath}
        quizDocPath={`${sectionId}/${slug}`}
        docTitle={docTitle}
        lang={lang}
        isCompleted={isCompleted}
        userName={user?.name || ''}
      />

      {/* Previous / Next navigation */}
      <div className="mt-12 pt-6 border-t border-neo-dark-3/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous */}
          {prevDoc ? (
            <Link
              href={`/content/${sectionId}/${prevDoc.slug}`}
              className="group flex items-center gap-3 p-4 rounded-xl bg-neo-dark-2 border border-neo-dark-3/60 hover:border-neo-dark-3 hover:bg-neo-dark-2/80 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-neo-dark-3/50 flex items-center justify-center group-hover:bg-neo-dark-3/80 transition-colors duration-200 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted group-hover:text-neo-text transition-colors duration-200">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-medium text-neo-text-muted uppercase tracking-wider mb-0.5">
                  {lang === 'ru' ? 'Предыдущий' : 'Anterior'}
                </div>
                <div className="text-sm font-medium text-neo-text-secondary group-hover:text-neo-text transition-colors duration-200 truncate">
                  {lang === 'ru' ? prevDoc.titleRu : prevDoc.titleEs}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextDoc ? (
            <Link
              href={`/content/${sectionId}/${nextDoc.slug}`}
              className="group flex items-center justify-end gap-3 p-4 rounded-xl bg-neo-dark-2 border border-neo-dark-3/60 hover:border-neo-primary/30 hover:bg-neo-dark-2/80 transition-all duration-200 text-right"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-medium text-neo-text-muted uppercase tracking-wider mb-0.5">
                  {lang === 'ru' ? 'Следующий' : 'Siguiente'}
                </div>
                <div className="text-sm font-medium text-neo-text-secondary group-hover:text-neo-primary transition-colors duration-200 truncate">
                  {lang === 'ru' ? nextDoc.titleRu : nextDoc.titleEs}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-neo-dark-3/50 flex items-center justify-center group-hover:bg-neo-primary/10 transition-colors duration-200 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-text-muted group-hover:text-neo-primary transition-colors duration-200">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to dashboard link */}
        <div className="mt-6 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-neo-text-muted hover:text-neo-primary transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {lang === 'ru' ? 'Вернуться на главную' : 'Volver al inicio'}
          </Link>
        </div>
      </div>

      {/* Progress tracker (client component) */}
      <ProgressTracker documentPath={doc.filePath} />
    </div>
  );
}
