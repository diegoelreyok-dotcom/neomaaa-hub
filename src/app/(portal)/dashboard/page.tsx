import { auth } from '@/lib/auth';
import { getDashboardContent } from '@/lib/content';
import type { Lang } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default async function DashboardPage() {
  const session = await auth();
  const lang: Lang = (session?.user as any)?.lang || 'es';

  const content = getDashboardContent(lang);

  return <MarkdownRenderer content={content} />;
}
