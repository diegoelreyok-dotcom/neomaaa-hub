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

const ROLE_GRADIENTS = [
  'from-slate-600 to-slate-700',
  'from-zinc-600 to-zinc-700',
  'from-gray-600 to-gray-700',
  'from-neutral-600 to-neutral-700',
  'from-stone-600 to-stone-700',
  'from-slate-500 to-gray-700',
];

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
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-24 bg-[#1A1A1A] rounded-lg mb-2" />
            <div className="h-4 w-40 bg-[#1A1A1A]/60 rounded-lg" />
          </div>
          <div className="h-10 w-28 bg-[#1A1A1A] rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A]/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-[#1A1A1A]/40 rounded" />
                  <div className="h-3 w-16 bg-[#1A1A1A]/30 rounded" />
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="h-6 w-20 bg-[#1A1A1A]/40 rounded-full" />
                <div className="h-6 w-24 bg-[#1A1A1A]/40 rounded-full" />
              </div>
              <div className="h-9 bg-[#1A1A1A]/30 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Roles</h1>
          <p className="text-[#666666] text-sm mt-1">
            {roles.length} rol{roles.length !== 1 ? 'es' : ''} configurado{roles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#98283A] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#98283A]/20 transition-all duration-200"
        >
          Crear Rol
        </button>
      </div>

      {/* Roles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, idx) => {
          const userCount = getUserCountForRole(role.id);
          const gradient = ROLE_GRADIENTS[idx % ROLE_GRADIENTS.length];

          return (
            <div
              key={role.id}
              className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5 hover:border-[#98283A]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 group"
            >
              {/* Card header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg cursor-pointer`}
                  onClick={() => router.push(`/admin/roles/${role.id}`)}
                >
                  {role.name.charAt(0).toUpperCase()}
                </div>
                <div
                  className="cursor-pointer flex-1 min-w-0"
                  onClick={() => router.push(`/admin/roles/${role.id}`)}
                >
                  <h3 className="text-white font-semibold text-sm group-hover:text-white transition-colors duration-200 truncate">
                    {role.name}
                  </h3>
                  {role.nameRu !== role.name && (
                    <p className="text-[#666666] text-xs mt-0.5 truncate">{role.nameRu}</p>
                  )}
                </div>
                {role.isAdmin && (
                  <span className="bg-[#98283A]/15 text-[#98283A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 border border-[#98283A]/20">
                    Admin
                  </span>
                )}
              </div>

              {/* Stats pills */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[#666666] text-xs bg-[#1A1A1A]/40 px-2.5 py-1 rounded-full font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                  {userCount} usuario{userCount !== 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#666666] text-xs bg-[#1A1A1A]/40 px-2.5 py-1 rounded-full font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                  </svg>
                  {role.sections.length} seccion{role.sections.length !== 1 ? 'es' : ''}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/admin/roles/${role.id}`)}
                  className="flex-1 text-center text-xs font-medium px-3 py-2.5 rounded-lg bg-[#1A1A1A]/50 text-[#A0A0A0] hover:text-white hover:bg-[#1E1E1E] border border-[#1E1E1E]/30 hover:border-[#98283A]/30 transition-all duration-200"
                >
                  Configurar Permisos
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(role);
                  }}
                  className="text-xs font-medium px-3 py-2.5 rounded-lg bg-[#C44545]/10 text-[#C44545] hover:bg-[#C44545]/20 border border-[#C44545]/20 hover:border-[#C44545]/30 transition-all duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {roles.length === 0 && (
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-12 text-center mt-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <p className="text-[#666666] text-sm">
            No hay roles configurados. Ejecuta el Seed desde el Dashboard o crea un rol manualmente.
          </p>
        </div>
      )}

      {/* Create Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-white">Crear Rol</h2>
              <p className="text-[#666666] text-sm mt-1">
                Define un nuevo rol y sus permisos base
              </p>
            </div>

            <div className="border-b border-[#1A1A1A]/40 mx-6" />

            <div className="p-6 space-y-5">
              {/* Name ES */}
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                  Nombre (Espanol)
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nombre del rol"
                  className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
                />
                {formName.trim() && (
                  <p className="text-[#666666] text-xs mt-1.5">
                    ID: <span className="font-mono text-[#A0A0A0]">{generateIdFromName(formName)}</span>
                  </p>
                )}
              </div>

              {/* Name RU */}
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                  Nombre (Ruso)
                </label>
                <input
                  type="text"
                  value={formNameRu}
                  onChange={(e) => setFormNameRu(e.target.value)}
                  placeholder="Opcional -- se usa el nombre ES si se deja vacio"
                  className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
                />
              </div>

              {/* Is Admin toggle */}
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                  Permisos
                </label>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A]/20 border border-[#1A1A1A]/30">
                  <button
                    type="button"
                    onClick={() => setFormIsAdmin(!formIsAdmin)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
                      formIsAdmin ? 'bg-[#98283A] shadow-lg shadow-[#98283A]/20' : 'bg-[#1E1E1E]'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                        formIsAdmin ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                  <div>
                    <span className="text-white text-sm font-medium">
                      {formIsAdmin ? 'Administrador' : 'Usuario normal'}
                    </span>
                    <p className="text-[#666666] text-xs mt-0.5">
                      {formIsAdmin ? 'Acceso completo al panel de administracion' : 'Solo accede a secciones asignadas'}
                    </p>
                  </div>
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
                  className="bg-[#1A1A1A] text-[#A0A0A0] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#1E1E1E] hover:text-white transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!formName.trim() || creating}
                  className="bg-[#98283A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#98283A]/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
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
