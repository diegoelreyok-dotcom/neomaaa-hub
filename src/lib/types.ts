export interface User {
  id: string;
  name: string;
  email?: string; // Corporate email (e.g. dl@neomaaa.com). Metadata only — login uses id+code.
  loginCode: string; // bcrypt hash
  roleId: string;
  /**
   * Additional sections this user can access beyond their role.sections.
   * Admin UI adds these ad-hoc (e.g. Edward is `sales` but also gets `marketing`).
   * Effective sections = role.sections ∪ user.extraSections.
   */
  extraSections?: string[];
  lang: 'es' | 'ru' | 'en';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  /**
   * When true, the user is forced to rotate their login code before accessing
   * the rest of the portal. Set at creation for staff with default codes and
   * for users approved via the registration flow. Cleared by /api/users/change-code.
   */
  mustChangeCode?: boolean;
}

export interface Role {
  id: string;
  name: string;
  nameRu: string;
  nameEn?: string;
  sections: string[]; // array of section IDs
  isAdmin: boolean;
}

export interface Section {
  id: string;
  nameEs: string;
  nameRu: string;
  nameEn?: string;
  documents: DocMeta[];
  order: number;
}

export interface DocMeta {
  slug: string;
  titleEs: string;
  titleRu: string;
  titleEn?: string;
  filePath: string; // relative: "sales/training.md"
  pdfSlug: string; // "sales-training"
}

export interface ReadProgress {
  userId: string;
  documentPath: string;
  firstAccessed: string;
  lastAccessed: string;
  accessCount: number;
  completed: boolean;
  completedAt?: string;
}

export type Lang = 'es' | 'ru' | 'en';
