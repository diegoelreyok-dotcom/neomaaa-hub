'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface RoleData {
  id: string;
  name: string;
  nameRu: string;
  sections: string[];
  isAdmin: boolean;
}

interface SectionInfo {
  id: string;
  nameEs: string;
  nameRu: string;
  documentCount: number;
}

// Mirror of SECTIONS from sections.ts — used client-side
const ALL_SECTIONS: SectionInfo[] = [
  { id: 'launch', nameEs: 'Master Checklist', nameRu: 'Мастер-чеклист', documentCount: 1 },
  { id: 'sales', nameEs: 'Ventas', nameRu: 'Продажи', documentCount: 5 },
  { id: 'compliance', nameEs: 'Compliance', nameRu: 'Комплаенс', documentCount: 5 },
  { id: 'support', nameEs: 'Soporte', nameRu: 'Поддержка', documentCount: 2 },
  { id: 'operations', nameEs: 'Operaciones', nameRu: 'Операции', documentCount: 3 },
  { id: 'marketing', nameEs: 'Marketing', nameRu: 'Маркетинг', documentCount: 4 },
  { id: 'hiring', nameEs: 'Hiring', nameRu: 'Найм персонала', documentCount: 4 },
  { id: 'partners', nameEs: 'Partners', nameRu: 'Партнёры', documentCount: 3 },
  { id: 'encyclopedia', nameEs: 'Enciclopedia', nameRu: 'Энциклопедия', documentCount: 1 },
];

export default function RolePermissionsPage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params.id as string;

  const [role, setRole] = useState<RoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRole = useCallback(async () => {
    try {
      const res = await fetch('/api/roles');
      if (!res.ok) {
        setError('Error al cargar roles');
        return;
      }
      const roles: RoleData[] = await res.json();
      const found = roles.find((r) => r.id === roleId);
      if (found) {
        setRole(found);
      } else {
        setError('Rol no encontrado');
      }
    } catch {
      setError('Error de conexion');
    } finally {
      setLoading(false);
    }
  }, [roleId]);

  useEffect(() => {
    loadRole();
  }, [loadRole]);

  async function handleToggle(sectionId: string) {
    if (!role) return;

    const currentlyEnabled = role.sections.includes(sectionId);
    const newSections = currentlyEnabled
      ? role.sections.filter((s) => s !== sectionId)
      : [...role.sections, sectionId];

    // Optimistic update
    setRole({ ...role, sections: newSections });
    setSaving(sectionId);

    try {
      const res = await fetch('/api/roles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: role.id,
          sections: newSections,
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setRole({ ...role, sections: role.sections });
      }
    } catch {
      // Revert on failure
      setRole({ ...role, sections: role.sections });
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-neo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="text-center py-16">
        <p className="text-neo-danger text-sm mb-4">{error || 'Rol no encontrado'}</p>
        <Link
          href="/admin/roles"
          className="text-neo-primary text-sm hover:underline"
        >
          Volver a Roles
        </Link>
      </div>
    );
  }

  const enabledCount = role.sections.length;
  const totalSections = ALL_SECTIONS.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/roles"
          className="text-neo-text-muted text-sm hover:text-neo-primary transition-colors duration-200 mb-3 inline-block"
        >
          &larr; Volver a Roles
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neo-text">{role.name}</h1>
          {role.isAdmin && (
            <span className="bg-neo-accent/15 text-neo-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Admin
            </span>
          )}
        </div>
        {role.nameRu !== role.name && (
          <p className="text-neo-text-muted text-sm mt-0.5">{role.nameRu}</p>
        )}
        <p className="text-neo-text-secondary text-sm mt-2">
          {enabledCount} de {totalSections} secciones habilitadas
        </p>
      </div>

      {/* Section toggle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_SECTIONS.map((section) => {
          const isEnabled = role.sections.includes(section.id);
          const isSaving = saving === section.id;

          return (
            <div
              key={section.id}
              className={`bg-neo-dark-2 border rounded-lg p-5 transition-all duration-200 ${
                isEnabled
                  ? 'border-neo-primary/40 shadow-[0_0_12px_rgba(0,212,170,0.08)]'
                  : 'border-neo-dark-3'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${isEnabled ? 'text-neo-text' : 'text-neo-text-muted'}`}>
                    {section.nameEs}
                  </h3>
                  <p className="text-neo-text-muted text-xs mt-0.5">
                    {section.nameRu}
                  </p>
                  <p className={`text-xs mt-2 ${isEnabled ? 'text-neo-text-secondary' : 'text-neo-text-muted'}`}>
                    {section.documentCount} documento{section.documentCount !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => handleToggle(section.id)}
                  disabled={isSaving}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ml-3 ${
                    isEnabled ? 'bg-neo-primary' : 'bg-neo-dark-4'
                  } ${isSaving ? 'opacity-50' : ''}`}
                  aria-label={`${isEnabled ? 'Deshabilitar' : 'Habilitar'} ${section.nameEs}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                      isEnabled ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="mt-8 bg-neo-dark-2 border border-neo-dark-3 rounded-lg p-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-neo-text-muted">Secciones activas:</span>{' '}
          <span className="text-neo-primary font-semibold">{enabledCount}</span>
          <span className="text-neo-text-muted"> / {totalSections}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {role.sections.map((sid) => {
            const sec = ALL_SECTIONS.find((s) => s.id === sid);
            return (
              <span
                key={sid}
                className="text-xs bg-neo-primary/10 text-neo-primary px-2 py-0.5 rounded"
              >
                {sec?.nameEs || sid}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
