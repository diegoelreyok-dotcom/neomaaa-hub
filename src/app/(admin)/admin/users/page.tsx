'use client';

import { useEffect, useState, useCallback } from 'react';

interface UserData {
  id: string;
  name: string;
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface RoleData {
  id: string;
  name: string;
  nameRu: string;
  sections: string[];
  isAdmin: boolean;
}

const AVATAR_GRADIENTS = [
  'from-neo-primary to-neo-primary-light',
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-teal-600',
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [createdUserName, setCreatedUserName] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formRoleId, setFormRoleId] = useState('');
  const [formLang, setFormLang] = useState<'es' | 'ru'>('es');

  const loadData = useCallback(async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/roles'),
      ]);
      const usersData = usersRes.ok ? await usersRes.json() : [];
      const rolesData = rolesRes.ok ? await rolesRes.json() : [];
      setUsers(Array.isArray(usersData) ? usersData : []);
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function generateIdFromName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  function getRoleName(roleId: string): string {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  }

  function isAdminRole(roleId: string): boolean {
    return roles.find((r) => r.id === roleId)?.isAdmin || false;
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

  async function handleCreate() {
    if (!formName.trim() || !formRoleId) return;
    setCreating(true);

    const userId = generateIdFromName(formName);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          name: formName.trim(),
          roleId: formRoleId,
          lang: formLang,
          isActive: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedCode(data.code);
        setCreatedUserName(formName.trim());
        setFormName('');
        setFormRoleId('');
        setFormLang('es');
        await loadData();
      }
    } catch {
      // Silent fail
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(user: UserData) {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, isActive: !u.isActive } : u
          )
        );
      }
    } catch {
      // Silent fail
    }
  }

  async function handleDelete(user: UserData) {
    const confirmed = window.confirm(
      `Seguro que deseas eliminar al usuario "${user.name}"? Esta accion no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users?id=${user.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      }
    } catch {
      // Silent fail
    }
  }

  function handleCopyCode() {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function closeModal() {
    setShowModal(false);
    setGeneratedCode(null);
    setCreatedUserName('');
    setCopied(false);
    setFormName('');
    setFormRoleId('');
    setFormLang('es');
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()) ||
      getRoleName(u.roleId).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-32 bg-neo-dark-3 rounded-lg mb-2" />
            <div className="h-4 w-48 bg-neo-dark-3/60 rounded-lg" />
          </div>
          <div className="h-10 w-36 bg-neo-dark-3 rounded-lg" />
        </div>
        <div className="h-10 w-80 bg-neo-dark-3/50 rounded-lg mb-4" />
        <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl overflow-hidden">
          <div className="h-10 bg-neo-dark-3/50" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-t border-neo-dark-3/30">
              <div className="w-8 h-8 rounded-full bg-neo-dark-3/50" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-neo-dark-3/40 rounded" />
                <div className="h-3 w-24 bg-neo-dark-3/30 rounded" />
              </div>
              <div className="h-4 w-20 bg-neo-dark-3/40 rounded" />
              <div className="h-5 w-14 bg-neo-dark-3/40 rounded-full" />
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
          <h1 className="text-2xl font-bold text-neo-text">Usuarios</h1>
          <p className="text-neo-text-muted text-sm mt-1">
            {users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-neo-primary text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-neo-primary/20 transition-all duration-200"
        >
          Agregar Usuario
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neo-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, ID o rol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neo-dark-3/50 border border-neo-dark-4/50 text-neo-text rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-neo-text-muted/50 focus:outline-none focus:border-neo-primary/50 focus:ring-2 focus:ring-neo-primary/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neo-dark-3/50">
                <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Nombre
                </th>
                <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Rol
                </th>
                <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Idioma
                </th>
                <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Ultimo Acceso
                </th>
                <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Estado
                </th>
                <th className="text-right text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-neo-dark-3/50 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-neo-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <p className="text-neo-text-muted text-sm">
                      {search ? 'No se encontraron usuarios con ese criterio.' : 'No hay usuarios registrados.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => {
                  const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
                  const admin = isAdminRole(user.roleId);

                  return (
                    <tr
                      key={user.id}
                      className={`border-t border-neo-dark-3/40 ${
                        idx % 2 === 0 ? 'bg-neo-dark-2' : 'bg-neo-dark-2/50'
                      } hover:bg-neo-dark-3/30 transition-all duration-200`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-neo-text text-sm font-medium">{user.name}</div>
                            <div className="text-neo-text-muted text-xs">{user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          admin
                            ? 'bg-neo-primary/15 text-neo-primary border border-neo-primary/20'
                            : 'bg-neo-dark-3/50 text-neo-text-secondary border border-neo-dark-4/30'
                        }`}>
                          {getRoleName(user.roleId)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-neo-dark-3/40 text-neo-text-secondary uppercase">
                          {user.lang}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-neo-text-muted text-sm">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isActive
                              ? 'bg-neo-success/10 text-neo-success border border-neo-success/20'
                              : 'bg-neo-danger/10 text-neo-danger border border-neo-danger/20'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                            user.isActive ? 'bg-neo-success' : 'bg-neo-danger'
                          }`} />
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleActive(user)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-neo-dark-3/50 text-neo-text-secondary hover:text-neo-text hover:bg-neo-dark-4/50 border border-neo-dark-4/30 hover:border-neo-dark-4/60 transition-all duration-200"
                          >
                            {user.isActive ? 'Desactivar' : 'Activar'}
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-neo-danger/10 text-neo-danger hover:bg-neo-danger/20 border border-neo-danger/20 hover:border-neo-danger/30 transition-all duration-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-neo-text">Agregar Usuario</h2>
              <p className="text-neo-text-muted text-sm mt-1">
                {generatedCode ? 'Usuario creado exitosamente' : 'Completa los datos del nuevo miembro'}
              </p>
            </div>

            <div className="border-b border-neo-dark-3/40 mx-6" />

            {generatedCode ? (
              /* Success view */
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-neo-success/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-neo-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-neo-text-body text-sm mb-4 text-center">
                  Usuario <span className="text-neo-text font-semibold">{createdUserName}</span> creado correctamente.
                </p>

                <div className="bg-neo-success/5 border border-neo-success/20 rounded-xl p-5">
                  <label className="block text-xs uppercase tracking-wide text-neo-success/70 font-medium mb-2">
                    Codigo de Acceso
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-neo-success font-mono text-3xl font-bold tracking-widest">
                      {generatedCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        copied
                          ? 'bg-neo-success/20 text-neo-success'
                          : 'bg-neo-success/10 text-neo-success hover:bg-neo-success/20'
                      }`}
                    >
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <p className="text-neo-text-muted text-xs mt-3 text-center">
                  Este codigo solo se muestra una vez. Compartelo de forma segura con el usuario.
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              /* Form view */
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-neo-text-muted font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-neo-dark-3/50 border border-neo-dark-4/50 text-neo-text rounded-lg px-4 py-2.5 text-sm placeholder:text-neo-text-muted/50 focus:outline-none focus:border-neo-primary/50 focus:ring-2 focus:ring-neo-primary/10 transition-all duration-200"
                  />
                  {formName.trim() && (
                    <p className="text-neo-text-muted text-xs mt-1.5">
                      ID: <span className="font-mono text-neo-text-secondary">{generateIdFromName(formName)}</span>
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-neo-text-muted font-medium mb-2">
                    Rol
                  </label>
                  <select
                    value={formRoleId}
                    onChange={(e) => setFormRoleId(e.target.value)}
                    className="w-full bg-neo-dark-3/50 border border-neo-dark-4/50 text-neo-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neo-primary/50 focus:ring-2 focus:ring-neo-primary/10 transition-all duration-200"
                  >
                    <option value="">Seleccionar rol...</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-neo-text-muted font-medium mb-2">
                    Idioma
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormLang('es')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        formLang === 'es'
                          ? 'bg-neo-primary/10 border-neo-primary/30 text-neo-primary'
                          : 'bg-neo-dark-3/50 border-neo-dark-4/50 text-neo-text-secondary hover:border-neo-dark-4 hover:text-neo-text'
                      }`}
                    >
                      Espanol (ES)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormLang('ru')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        formLang === 'ru'
                          ? 'bg-neo-primary/10 border-neo-primary/30 text-neo-primary'
                          : 'bg-neo-dark-3/50 border-neo-dark-4/50 text-neo-text-secondary hover:border-neo-dark-4 hover:text-neo-text'
                      }`}
                    >
                      Ruso (RU)
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-neo-dark-3 text-neo-text-secondary font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 hover:text-neo-text transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!formName.trim() || !formRoleId || creating}
                    className="bg-neo-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-neo-primary/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {creating ? 'Creando...' : 'Crear Usuario'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
