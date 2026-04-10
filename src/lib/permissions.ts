import { Role, Section } from './types';
import { SECTIONS } from './sections';

export function getVisibleSections(role: Role): Section[] {
  if (role.isAdmin) return SECTIONS;
  return SECTIONS.filter((s) => role.sections.includes(s.id));
}

export function canAccessSection(role: Role, sectionId: string): boolean {
  if (role.isAdmin) return true;
  return role.sections.includes(sectionId);
}

export function canAccessDocument(role: Role, sectionId: string, _slug: string): boolean {
  return canAccessSection(role, sectionId);
}
