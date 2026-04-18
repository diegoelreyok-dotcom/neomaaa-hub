import { Role, Section } from './types';
import { SECTIONS } from './sections';

/**
 * Compute effective sections for a user: union of role.sections and
 * user.extraSections. Admin role bypasses the filter and sees everything.
 */
function effectiveSections(role: Role, extraSections?: string[]): Set<string> {
  const set = new Set<string>(role.sections || []);
  for (const s of extraSections || []) set.add(s);
  return set;
}

export function getVisibleSections(role: Role, extraSections?: string[]): Section[] {
  if (role.isAdmin) return SECTIONS;
  const eff = effectiveSections(role, extraSections);
  return SECTIONS.filter((s) => eff.has(s.id));
}

export function canAccessSection(role: Role, sectionId: string, extraSections?: string[]): boolean {
  if (role.isAdmin) return true;
  return effectiveSections(role, extraSections).has(sectionId);
}

export function canAccessDocument(role: Role, sectionId: string, _slug: string, extraSections?: string[]): boolean {
  return canAccessSection(role, sectionId, extraSections);
}
