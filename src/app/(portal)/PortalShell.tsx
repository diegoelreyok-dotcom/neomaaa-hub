'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import type { Section, Lang, ReadProgress } from '@/lib/types';

interface PortalShellProps {
  sections: Section[];
  userName: string;
  isAdmin: boolean;
  lang: Lang;
  children: React.ReactNode;
}

export default function PortalShell({
  sections,
  userName,
  isAdmin,
  lang: initialLang,
  children,
}: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [completedDocs, setCompletedDocs] = useState<string[]>([]);
  const [accessedDocs, setAccessedDocs] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const fetchProgress = useCallback(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data: ReadProgress[]) => {
        if (Array.isArray(data)) {
          const completed = data.filter((p) => p.completed).map((p) => p.documentPath);
          const accessed = data.filter((p) => !p.completed).map((p) => p.documentPath);
          setCompletedDocs(completed);
          setAccessedDocs(accessed);
        }
      })
      .catch(() => {
        // Silently fail
      });
  }, []);

  // Fetch progress on mount and when pathname changes (doc completion triggers navigation refresh)
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress, pathname]);

  function handleSwitchLang(newLang: Lang) {
    setLang(newLang);
    fetch('/api/users/lang', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: newLang }),
    }).then(() => {
      router.refresh();
    }).catch(() => {
      // Silently fail — UI already updated
    });
  }

  return (
    <div className="min-h-screen bg-neo-dark">
      <Sidebar
        sections={sections}
        lang={lang}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        completedDocs={completedDocs}
        accessedDocs={accessedDocs}
      />

      <div className="lg:ml-[280px] flex flex-col min-h-screen transition-[margin] duration-300">
        <TopBar
          userName={userName}
          isAdmin={isAdmin}
          lang={lang}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onSwitchLang={handleSwitchLang}
        />

        <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-5 border-t border-neo-dark-3/30">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <p className="text-[11px] text-neo-text-muted/60">
              NEOMAAA Hub &mdash; Portal interno del equipo
            </p>
            <p className="text-[11px] text-neo-text-muted/40">
              {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
