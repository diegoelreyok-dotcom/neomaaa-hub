export interface User {
  id: string;
  name: string;
  loginCode: string; // bcrypt hash
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Role {
  id: string;
  name: string;
  nameRu: string;
  sections: string[]; // array of section IDs
  isAdmin: boolean;
}

export interface Section {
  id: string;
  nameEs: string;
  nameRu: string;
  documents: DocMeta[];
  order: number;
}

export interface DocMeta {
  slug: string;
  titleEs: string;
  titleRu: string;
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
}

export type Lang = 'es' | 'ru';
