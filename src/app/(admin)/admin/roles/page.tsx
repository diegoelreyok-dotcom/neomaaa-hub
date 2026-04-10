'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface RoleData {
  id: string;
  name: string;
  nameRu: string;
  sections: string[];
  isAdmin: boolean;
}

interface UserData {
  id: string;
  name: string;
  roleId: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  // Form state
  const [formName, setFormName] = useState('');
  const [formNameRu, setFormNameRu] = useState('');
  const [formIsAdmin, setFormIsAdmin] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [rolesRes, usersRes] = await Promise.all([
        fetch('/api/roles'),
        fetch('/api/users'),
      ]);
      const rolesData = rolesRes.ok ? await rolesRes.json() : [];
      const usersData = usersRes.ok ? await usersRes.json() : [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function getUserCountForRole(roleId: string): number {
    return users.filter((u) => u.roleId === roleId).length;
  }

  function generateIdFromName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  async function handleCreate() {
    if (!formName.trim()) return;
    setCreating(true);

    const roleId = generateIdFromName(formName);

    try {
      const res = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: roleId,
          name: formName.trim(),
          nameRu: formNameRu.trim() || formName.trim(),
          sections: [],
          isAdmin: formIsAdmin,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setFormName('');
        setFormNameRu('');
        setFormIsAdmin(false);
        await loadData();
      }
    } catch {
      // Silent fail
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(role: RoleData) {
    const userCount = getUserCountForRole(role.id);
    if (userCount > 0) {
      window.alert(
        `No se puede eliminar el rol "${role.name}" porque tiene ${userCount} usuario${userCount !== 1 ? 's' : ''} asignado${userCount !== 1 ? 's' : ''}. Reasigna los usuarios primero.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Seguro que deseas eliminar el rol "${role.name}"? Esta accion no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/roles?id=${role.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRoles((prev) => prev.filter((r) => r.id !== role.id));
      }
    } catch {
      // Silent fail
    }
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
          <h1 className="text-2xl font-bold text-neo-text">Roles</h1>
          <p className="text-neo-text-muted text-sm mt-1">
            {roles.length} rol{roles.length !== 1 ? 'es' : ''} configurado{roles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-neo-primary text-neo-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all duration-200"
        >
          Crear Rol
        </button>
      </div>

      {/* Roles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => {
          const userCount = getUserCountForRole(role.id);

          return (
            <div
              key={role.id}
              className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg p-5 hover:border-neo-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => router.push(`/admin/roles/${role.id}`)}
                >
                  <h3 className="text-neo-text font-semibold text-base group-hover:text-neo-primary transition-colors duration-200">
                    {role.name}
                  </h3>
                  {role.nameRu !== role.name && (
                    <p className="text-neo-text-muted text-xs mt-0.5">{role.nameRu}</p>
                  )}
                </div>
                {role.isAdmin && (
                  <span className="bg-neo-accent/15 text-neo-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-neo-text font-bold text-lg">{userCount}</div>
                  <div className="text-neo-text-muted text-xs">
                    Usuario{userCount !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="w-px h-8 bg-neo-dark-3" />
                <div className="text-center">
                  <div className="text-neo-text font-bold text-lg">{role.sections.length}</div>
                  <div className="text-neo-text-muted text-xs">
                    Seccion{role.sections.length !== 1 ? 'es' : ''}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/admin/roles/${role.id}`)}
                  className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-md bg-neo-dark-3 text-neo-text-secondary hover:text-neo-primary hover:bg-neo-dark-4 transition-all duration-200"
                >
                  Configurar Permisos
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(role);
                  }}
                  className="text-xs font-medium px-3 py-2 rounded-md bg-neo-danger/10 text-neo-danger hover:bg-neo-danger/20 transition-all duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {roles.length === 0 && (
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg p-8 text-center mt-4">
          <p className="text-neo-text-muted text-sm">
            No hay roles configurados. Ejecuta el Seed desde el Dashboard o crea un rol manualmente.
          </p>
        </div>
      )}

      {/* Create Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg w-full max-w-md shadow-xl">
            <div className="px-6 py-4 border-b border-neo-dark-3">
              <h2 className="text-lg font-semibold text-neo-text">Crear Rol</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Name ES */}
              <div>
                <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Nombre (Espanol)
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nombre del rol"
                  className="w-full bg-neo-dark border border-neo-dark-3 text-neo-text-body rounded-md px-4 py-2.5 text-sm placeholder:text-neo-text-muted focus:outline-none focus:border-neo-primary transition-all duration-200"
                />
                {formName.trim() && (
                  <p className="text-neo-text-muted text-xs mt-1">
                    ID: {generateIdFromName(formName)}
                  </p>
                )}
              </div>

              {/* Name RU */}
              <div>
                <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Nombre (Ruso)
                </label>
                <input
                  type="text"
                  value={formNameRu}
                  onChange={(e) => setFormNameRu(e.target.value)}
                  placeholder="Opcional — se usa el nombre ES si se deja vacio"
                  className="w-full bg-neo-dark border border-neo-dark-3 text-neo-text-body rounded-md px-4 py-2.5 text-sm placeholder:text-neo-text-muted focus:outline-none focus:border-neo-primary transition-all duration-200"
                />
              </div>

              {/* Is Admin toggle */}
              <div>
                <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Permisos
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormIsAdmin(!formIsAdmin)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                      formIsAdmin ? 'bg-neo-primary' : 'bg-neo-dark-4'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                        formIsAdmin ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                  <span className="text-neo-text-body text-sm">
                    {formIsAdmin ? 'Administrador' : 'Usuario normal'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormName('');
                    setFormNameRu('');
                    setFormIsAdmin(false);
                  }}
                  className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!formName.trim() || creating}
                  className="bg-neo-primary text-neo-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creando...' : 'Crear Rol'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
