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
        <div className="text-center">
          <p className="text-neo-danger text-sm font-medium">Error de autenticacion</p>
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
          <p className="text-sm text-neo-text-muted">
            {lang === 'ru'
              ? 'У вас нет доступа к этому разделу. Обратитесь к администратору.'
              : 'No tienes acceso a esta seccion. Contacta al administrador.'
            }
          </p>
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
          <h2 className="text-lg font-semibold text-neo-text mb-2">
            {lang === 'ru' ? 'Документ не найден' : 'Documento no encontrado'}
          </h2>
          <p className="text-sm text-neo-text-muted">
            {lang === 'ru'
              ? 'Запрашиваемый документ не существует.'
              : 'El documento solicitado no existe.'
            }
          </p>
        </div>
      </div>
    );
  }

  // Read content
  const content = getMarkdownContent(doc.filePath, lang);
  const docTitle = lang === 'ru' ? doc.titleRu : doc.titleEs;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neo-text-muted mb-4">
        <span>{lang === 'ru' ? section.nameRu : section.nameEs}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-neo-text-secondary">{docTitle}</span>
      </div>

      {/* PDF Download */}
      {doc.pdfSlug && <PdfDownloadButton pdfSlug={doc.pdfSlug} />}

      {/* Markdown content */}
      <MarkdownRenderer content={content} />

      {/* Progress tracker (client component) */}
      <ProgressTracker documentPath={doc.filePath} />
    </div>
  );
}
