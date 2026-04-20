import { Role, Section } from './types';
import { SECTIONS } from './sections';
import { LEARNING_PATHS } from './learning-paths';

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

/**
 * Sequential learning-path gate.
 *
 * A doc inside the user's role learning path can only be accessed once every
 * prior doc in that path is completed. Docs that are not part of the user's
 * path are NOT gated (outside the path = free access as long as section
 * permission allows).
 *
 * @param roleId       The user's role id (e.g. 'sales', 'support-role', 'admin')
 * @param docPath      Path in "{section}/{slug}" form, no ".md" suffix.
 *                     E.g. "sales/plan-contacto"
 * @param completedDocs Set of completed doc paths, normalized (no ".md"). Order
 *                     does not matter — we just test membership.
 * @param isAdmin      If true, bypass.
 */
export function canAccessPathDoc(
  roleId: string,
  docPath: string,
  completedDocs: Set<string>,
  isAdmin: boolean
): { allowed: boolean; reason?: 'locked_by_path'; requiredDoc?: string } {
  // Admins always bypass the path gate.
  if (isAdmin || roleId === 'admin') {
    return { allowed: true };
  }

  const path = LEARNING_PATHS[roleId];
  if (!path) {
    // No path defined for this role → nothing to gate.
    return { allowed: true };
  }

  // Flatten the path into its ordered doc sequence (dedup, preserving order).
  const ordered: string[] = [];
  const seen = new Set<string>();
  for (const phase of path.phases) {
    for (const d of phase.docs) {
      if (!seen.has(d)) {
        seen.add(d);
        ordered.push(d);
      }
    }
  }

  const idx = ordered.indexOf(docPath);
  if (idx === -1) {
    // Doc is not part of the user's path — not gated by learning path.
    return { allowed: true };
  }
  // The first doc in the path is always accessible.
  if (idx === 0) {
    return { allowed: true };
  }

  // Walk priors; first missing doc is the one the user must complete next.
  for (let i = 0; i < idx; i++) {
    const prior = ordered[i];
    if (!completedDocs.has(prior)) {
      return { allowed: false, reason: 'locked_by_path', requiredDoc: prior };
    }
  }
  return { allowed: true };
}

/**
 * Build the ordered doc list for a role's learning path (dedup, preserving order).
 * Utility for UIs (e.g. Sidebar) that need to derive the locked set client-side.
 */
export function pathOrderedDocs(roleId: string): string[] {
  const path = LEARNING_PATHS[roleId];
  if (!path) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const phase of path.phases) {
    for (const d of phase.docs) {
      if (!seen.has(d)) {
        seen.add(d);
        out.push(d);
      }
    }
  }
  return out;
}
