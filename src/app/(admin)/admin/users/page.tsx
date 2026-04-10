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
          <h1 className="text-2xl font-bold text-neo-text">Usuarios</h1>
          <p className="text-neo-text-muted text-sm mt-1">
            {users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-neo-primary text-neo-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all duration-200"
        >
          Agregar Usuario
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, ID o rol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-neo-dark-2 border border-neo-dark-3 text-neo-text-body rounded-md px-4 py-2.5 text-sm placeholder:text-neo-text-muted focus:outline-none focus:border-neo-primary transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neo-dark-3">
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Nombre
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Rol
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Idioma
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Ultimo Acceso
                </th>
                <th className="text-left text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Estado
                </th>
                <th className="text-right text-neo-primary text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neo-text-muted text-sm">
                    {search ? 'No se encontraron usuarios con ese criterio.' : 'No hay usuarios registrados.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`border-t border-neo-dark-3 ${
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
                    <td className="px-4 py-3 text-neo-text-body text-sm uppercase">
                      {user.lang}
                    </td>
                    <td className="px-4 py-3 text-neo-text-muted text-sm">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? 'bg-neo-success/15 text-neo-success'
                            : 'bg-neo-danger/15 text-neo-danger'
                        }`}
                      >
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActive(user)}
                          className="text-xs font-medium px-3 py-1.5 rounded-md bg-neo-dark-3 text-neo-text-secondary hover:text-neo-text hover:bg-neo-dark-4 transition-all duration-200"
                        >
                          {user.isActive ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-xs font-medium px-3 py-1.5 rounded-md bg-neo-danger/10 text-neo-danger hover:bg-neo-danger/20 transition-all duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg w-full max-w-md shadow-xl">
            <div className="px-6 py-4 border-b border-neo-dark-3">
              <h2 className="text-lg font-semibold text-neo-text">Agregar Usuario</h2>
            </div>

            {generatedCode ? (
              /* Success view — show generated code */
              <div className="p-6">
                <p className="text-neo-text-body text-sm mb-4">
                  Usuario <span className="text-neo-text font-semibold">{createdUserName}</span> creado correctamente. El codigo de acceso es:
                </p>
                <div className="bg-neo-success/10 border border-neo-success/30 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-neo-success font-mono text-2xl font-bold tracking-widest">
                    {generatedCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="text-xs font-medium px-3 py-1.5 rounded-md bg-neo-success/20 text-neo-success hover:bg-neo-success/30 transition-all duration-200"
                  >
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <p className="text-neo-text-muted text-xs mt-3">
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
              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-neo-dark border border-neo-dark-3 text-neo-text-body rounded-md px-4 py-2.5 text-sm placeholder:text-neo-text-muted focus:outline-none focus:border-neo-primary transition-all duration-200"
                  />
                  {formName.trim() && (
                    <p className="text-neo-text-muted text-xs mt-1">
                      ID: {generateIdFromName(formName)}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Rol
                  </label>
                  <select
                    value={formRoleId}
                    onChange={(e) => setFormRoleId(e.target.value)}
                    className="w-full bg-neo-dark border border-neo-dark-3 text-neo-text-body rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-neo-primary transition-all duration-200"
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
                  <label className="block text-neo-text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Idioma
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lang"
                        value="es"
                        checked={formLang === 'es'}
                        onChange={() => setFormLang('es')}
                        className="accent-neo-primary"
                      />
                      <span className="text-neo-text-body text-sm">Espanol (ES)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lang"
                        value="ru"
                        checked={formLang === 'ru'}
                        onChange={() => setFormLang('ru')}
                        className="accent-neo-primary"
                      />
                      <span className="text-neo-text-body text-sm">Ruso (RU)</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!formName.trim() || !formRoleId || creating}
                    className="bg-neo-primary text-neo-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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
