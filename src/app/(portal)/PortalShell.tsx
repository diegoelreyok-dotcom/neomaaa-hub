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
    // Persist language change via API
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-neo-dark-3/50">
          <p className="text-[11px] text-neo-text-muted text-center">
            NEOMAAA Hub &mdash; Portal interno del equipo
          </p>
        </footer>
      </div>
    </div>
  );
}
