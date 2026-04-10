'use client';

import { Fragment, useEffect, useState, useCallback } from 'react';

interface UserData {
  id: string;
  name: string;
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  lastLogin?: string;
}

interface ProgressData {
  userId: string;
  documentPath: string;
  firstAccessed: string;
  lastAccessed: string;
  accessCount: number;
  completed: boolean;
}

interface RoleData {
  id: string;
  name: string;
  sections: string[];
}

// Total document count per section (mirrors sections.ts)
const SECTION_DOC_COUNTS: Record<string, number> = {
  launch: 1,
  sales: 5,
  compliance: 5,
  support: 2,
  operations: 3,
  marketing: 4,
  hiring: 4,
  partners: 3,
  encyclopedia: 1,
};

const TOTAL_DOCUMENTS = 28;

export default function ProgressPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [usersRes, rolesRes, progressRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/roles'),
        fetch('/api/progress'),
      ]);

      const usersData = usersRes.ok ? await usersRes.json() : [];
      const rolesData = rolesRes.ok ? await rolesRes.json() : [];
      const progressData = progressRes.ok ? await progressRes.json() : [];

      setUsers(Array.isArray(usersData) ? usersData : []);
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setProgress(Array.isArray(progressData) ? progressData : []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function getRoleName(roleId: string): string {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  }

  function getTotalDocsForRole(roleId: string): number {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return TOTAL_DOCUMENTS;
    if (role.sections.length === Object.keys(SECTION_DOC_COUNTS).length) {
      return TOTAL_DOCUMENTS;
    }
    return role.sections.reduce((sum, sid) => sum + (SECTION_DOC_COUNTS[sid] || 0), 0);
  }

  function getUserProgress(userId: string): ProgressData[] {
    return progress.filter((p) => p.userId === userId);
  }

  function formatDate(dateStr?: string): string {
    if (!dateStr) return '---';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function handleExportCSV() {
    const headers = ['Usuario', 'Rol', 'Documentos Leidos', 'Total Documentos', 'Porcentaje', 'Ultimo Acceso'];
    const rows = users.map((user) => {
      const userProg = getUserProgress(user.id);
      const totalDocs = getTotalDocsForRole(user.roleId);
      const readCount = userProg.length;
      const pct = totalDocs > 0 ? Math.round((readCount / totalDocs) * 100) : 0;
      const lastActive = userProg.length > 0
        ? userProg.reduce((latest, p) =>
            new Date(p.lastAccessed) > new Date(latest.lastAccessed) ? p : latest
          ).lastAccessed
        : '';

      return [
        user.name,
        getRoleName(user.roleId),
        readCount.toString(),
        totalDocs.toString(),
        `${pct}%`,
        lastActive ? formatDate(lastActive) : '---',
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neomaaa-progreso-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-neo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neo-text">Progreso</h1>
          <p className="text-neo-text-muted text-sm mt-1">
            Vista general del avance de lectura por usuario
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
        >
          Exportar CSV
        </button>
      </div>

      {/* Progress table */}
      <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neo-dark-3">
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Usuario
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Rol
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Docs. Leidos
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Total Docs.
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3 min-w-[180px]">
                  Progreso
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Ultimo Acceso
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neo-text-muted text-sm">
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => {
                  const userProg = getUserProgress(user.id);
                  const totalDocs = getTotalDocsForRole(user.roleId);
                  const readCount = userProg.length;
                  const pct = totalDocs > 0 ? Math.round((readCount / totalDocs) * 100) : 0;
                  const isExpanded = expandedUser === user.id;

                  const lastActive = userProg.length > 0
                    ? userProg.reduce((latest, p) =>
                        new Date(p.lastAccessed) > new Date(latest.lastAccessed) ? p : latest
                      ).lastAccessed
                    : undefined;

                  return (
                    <Fragment key={user.id}>
                      <tr
                        onClick={() =>
                          setExpandedUser(isExpanded ? null : user.id)
                        }
                        className={`border-t border-neo-dark-3 cursor-pointer ${
                          idx % 2 === 0 ? 'bg-neo-dark-2' : 'bg-neo-dark-2/50'
                        } hover:bg-neo-dark-3/40 transition-colors duration-150`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neo-primary-dark to-neo-primary-light flex items-center justify-center text-neo-dark font-bold text-xs">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-neo-text text-sm font-medium">{user.name}</div>
                              <div className="text-neo-text-muted text-xs">{user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-neo-text-body text-sm">
                          {getRoleName(user.roleId)}
                        </td>
                        <td className="px-4 py-3 text-neo-text text-sm font-semibold">
                          {readCount}
                        </td>
                        <td className="px-4 py-3 text-neo-text-muted text-sm">
                          {totalDocs}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-neo-dark-3 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  pct >= 75
                                    ? 'bg-gradient-to-r from-neo-success to-neo-primary'
                                    : pct >= 40
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                                    : 'bg-gradient-to-r from-neo-danger to-red-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-neo-text-secondary text-xs font-medium min-w-[36px] text-right">
                              {pct}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-neo-text-muted text-sm">
                          {formatDate(lastActive)}
                        </td>
                      </tr>

                      {/* Expanded row — document details */}
                      {isExpanded && (
                        <tr className="border-t border-neo-dark-3">
                          <td colSpan={6} className="px-4 py-4 bg-neo-dark/50">
                            {userProg.length === 0 ? (
                              <p className="text-neo-text-muted text-sm text-center py-2">
                                Este usuario no ha accedido a ningun documento todavia.
                              </p>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {userProg
                                  .sort(
                                    (a, b) =>
                                      new Date(b.lastAccessed).getTime() -
                                      new Date(a.lastAccessed).getTime()
                                  )
                                  .map((p) => (
                                    <div
                                      key={p.documentPath}
                                      className="bg-neo-dark-2 border border-neo-dark-3 rounded-md px-3 py-2"
                                    >
                                      <div className="text-neo-text text-xs font-medium truncate">
                                        {p.documentPath}
                                      </div>
                                      <div className="flex items-center gap-3 mt-1">
                                        <span className="text-neo-text-muted text-xs">
                                          {p.accessCount} acceso{p.accessCount !== 1 ? 's' : ''}
                                        </span>
                                        <span className="text-neo-text-muted text-xs">
                                          {formatDate(p.lastAccessed)}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

