// Shared SWR fetcher + types for admin panel.
// Centralizing here avoids every page duplicating fetches of users, roles, session.

export async function jsonFetcher<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    throw err;
  }
  return res.json();
}

export interface AdminUser {
  id: string;
  name: string;
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  nameRu: string;
  sections: string[];
  isAdmin: boolean;
}

export interface AdminProgress {
  userId: string;
  documentPath: string;
  firstAccessed: string;
  lastAccessed: string;
  accessCount: number;
  completed: boolean;
}

export interface AdminRegistration {
  id: string;
  name: string;
  email: string;
  lang: 'es' | 'ru';
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
