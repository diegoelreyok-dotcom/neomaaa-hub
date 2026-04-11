'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import type { Section, Lang } from '@/lib/types';

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
  const router = useRouter();

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
