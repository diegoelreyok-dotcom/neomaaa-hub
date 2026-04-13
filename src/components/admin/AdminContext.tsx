'use client';

import { createContext, useContext } from 'react';
import type { Lang } from '@/lib/types';

interface AdminCtx {
  lang: Lang;
  userName: string;
}

const Ctx = createContext<AdminCtx>({ lang: 'es', userName: '' });

export function AdminProvider({
  lang,
  userName,
  children,
}: {
  lang: Lang;
  userName: string;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={{ lang, userName }}>{children}</Ctx.Provider>;
}

export function useAdminCtx() {
  return useContext(Ctx);
}

export function useAdminLang(): Lang {
  return useContext(Ctx).lang;
}
