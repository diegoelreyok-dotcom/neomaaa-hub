import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getRole } from '@/lib/db';
import { canAccessDocument } from '@/lib/permissions';
import { getSectionById, getDocByPath } from '@/lib/sections';
import { getMarkdownContent } from '@/lib/content';
import type { Lang } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import ProgressTracker from './ProgressTracker';

interface ContentPageProps {
  params: { section: string; slug: string };
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

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs mb-5" aria-label="Breadcrumb">
        <Link
          href="/dashboard"
          className="text-neo-text-muted hover:text-neo-primary transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-dark-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-neo-text-muted">{sectionName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-dark-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-neo-text-secondary font-medium">{docTitle}</span>
      </nav>

      {/* PDF Download */}
      {doc.pdfSlug && <PdfDownloadButton pdfSlug={doc.pdfSlug} lang={lang} />}

      {/* Markdown content */}
      <MarkdownRenderer content={content} />

      {/* Back to top / navigation */}
      <div className="mt-10 pt-6 border-t border-neo-dark-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-neo-text-muted hover:text-neo-primary transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {lang === 'ru' ? 'Вернуться на главную' : 'Volver al inicio'}
        </Link>
      </div>

      {/* Progress tracker (client component) */}
      <ProgressTracker documentPath={doc.filePath} />
    </div>
  );
}
