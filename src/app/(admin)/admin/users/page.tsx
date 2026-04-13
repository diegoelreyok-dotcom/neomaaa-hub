'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Lang } from '@/lib/types';

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
  'from-slate-600 to-slate-700',
  'from-zinc-600 to-zinc-700',
  'from-gray-600 to-gray-700',
  'from-neutral-600 to-neutral-700',
  'from-stone-600 to-stone-700',
  'from-slate-500 to-gray-700',
];

const labels: Record<Lang, {
  title: string;
  registeredOne: string;
  registeredMany: string;
  addUser: string;
  searchPlaceholder: string;
  colName: string;
  colRole: string;
  colLanguage: string;
  colLastAccess: string;
  colStatus: string;
  colActions: string;
  emptyWithSearch: string;
  emptyNoUsers: string;
  active: string;
  inactive: string;
  deactivate: string;
  activate: string;
  deleteBtn: string;
  confirmDelete: (name: string) => string;
  modalTitle: string;
  modalSuccess: string;
  modalFormHelper: string;
  createdOk: (name: string) => React.ReactNode;
  accessCode: string;
  copy: string;
  copied: string;
  codeOnce: string;
  close: string;
  nameLabel: string;
  namePlaceholder: string;
  roleLabel: string;
  selectRole: string;
  languageLabel: string;
  spanish: string;
  russian: string;
  cancel: string;
  createBtn: string;
  creating: string;
}> = {
  es: {
    title: 'Usuarios',
    registeredOne: 'usuario registrado',
    registeredMany: 'usuarios registrados',
    addUser: 'Agregar Usuario',
    searchPlaceholder: 'Buscar por nombre, ID o rol...',
    colName: 'Nombre',
    colRole: 'Rol',
    colLanguage: 'Idioma',
    colLastAccess: 'Ultimo Acceso',
    colStatus: 'Estado',
    colActions: 'Acciones',
    emptyWithSearch: 'No se encontraron usuarios con ese criterio.',
    emptyNoUsers: 'No hay usuarios registrados.',
    active: 'Activo',
    inactive: 'Inactivo',
    deactivate: 'Desactivar',
    activate: 'Activar',
    deleteBtn: 'Eliminar',
    confirmDelete: (name) => `Seguro que deseas eliminar al usuario "${name}"? Esta accion no se puede deshacer.`,
    modalTitle: 'Agregar Usuario',
    modalSuccess: 'Usuario creado exitosamente',
    modalFormHelper: 'Completa los datos del nuevo miembro',
    createdOk: (name) => (<>Usuario <span className="text-white font-semibold">{name}</span> creado correctamente.</>),
    accessCode: 'Codigo de Acceso',
    copy: 'Copiar',
    copied: 'Copiado',
    codeOnce: 'Este codigo solo se muestra una vez. Compartelo de forma segura con el usuario.',
    close: 'Cerrar',
    nameLabel: 'Nombre',
    namePlaceholder: 'Nombre completo',
    roleLabel: 'Rol',
    selectRole: 'Seleccionar rol...',
    languageLabel: 'Idioma',
    spanish: 'Español (ES)',
    russian: 'Ruso (RU)',
    cancel: 'Cancelar',
    createBtn: 'Crear Usuario',
    creating: 'Creando...',
  },
  ru: {
    title: 'Пользователи',
    registeredOne: 'зарегистрированный пользователь',
    registeredMany: 'зарегистрированных пользователей',
    addUser: 'Добавить пользователя',
    searchPlaceholder: 'Поиск по имени, ID или роли...',
    colName: 'Имя',
    colRole: 'Роль',
    colLanguage: 'Язык',
    colLastAccess: 'Последний вход',
    colStatus: 'Статус',
    colActions: 'Действия',
    emptyWithSearch: 'Пользователи по этим критериям не найдены.',
    emptyNoUsers: 'Зарегистрированных пользователей нет.',
    active: 'Активен',
    inactive: 'Неактивен',
    deactivate: 'Деактивировать',
    activate: 'Активировать',
    deleteBtn: 'Удалить',
    confirmDelete: (name) => `Точно хотите удалить пользователя "${name}"? Это действие нельзя отменить.`,
    modalTitle: 'Добавить пользователя',
    modalSuccess: 'Пользователь успешно создан',
    modalFormHelper: 'Заполните данные нового участника',
    createdOk: (name) => (<>Пользователь <span className="text-white font-semibold">{name}</span> успешно создан.</>),
    accessCode: 'Код доступа',
    copy: 'Копировать',
    copied: 'Скопировано',
    codeOnce: 'Этот код показывается только один раз. Передайте его пользователю безопасным способом.',
    close: 'Закрыть',
    nameLabel: 'Имя',
    namePlaceholder: 'Полное имя',
    roleLabel: 'Роль',
    selectRole: 'Выберите роль...',
    languageLabel: 'Язык',
    spanish: 'Испанский (ES)',
    russian: 'Русский (RU)',
    cancel: 'Отменить',
    createBtn: 'Создать пользователя',
    creating: 'Создание...',
  },
};

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
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const l = data?.user?.lang;
        if (l === 'ru' || l === 'es') setLang(l);
      })
      .catch(() => {});
  }, []);

  const t = labels[lang];

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
    if (!role) return roleId;
    return lang === 'ru' ? (role.nameRu || role.name) : role.name;
  }

  function isAdminRole(roleId: string): boolean {
    return roles.find((r) => r.id === roleId)?.isAdmin || false;
  }

  function formatDate(dateStr?: string): string {
    if (!dateStr) return '---';
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'es-ES', {
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
    const confirmed = window.confirm(t.confirmDelete(user.name));
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
            <div className="h-8 w-32 bg-[#1A1A1A] rounded-lg mb-2" />
            <div className="h-4 w-48 bg-[#1A1A1A]/60 rounded-lg" />
          </div>
          <div className="h-10 w-36 bg-[#1A1A1A] rounded-lg" />
        </div>
        <div className="h-10 w-80 bg-[#1A1A1A]/50 rounded-lg mb-4" />
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
          <div className="h-10 bg-[#1A1A1A]/50" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-t border-[#1A1A1A]/30">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/50" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-[#1A1A1A]/40 rounded" />
                <div className="h-3 w-24 bg-[#1A1A1A]/30 rounded" />
              </div>
              <div className="h-4 w-20 bg-[#1A1A1A]/40 rounded" />
              <div className="h-5 w-14 bg-[#1A1A1A]/40 rounded-full" />
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
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          <p className="text-[#666666] text-sm mt-1">
            {users.length} {users.length !== 1 ? t.registeredMany : t.registeredOne}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#98283A] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#B33347] transition-all duration-200"
        >
          {t.addUser}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A]">
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colName}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colRole}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colLanguage}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colLastAccess}
                </th>
                <th className="text-left text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colStatus}
                </th>
                <th className="text-right text-[#666666] text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {t.colActions}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <p className="text-[#666666] text-sm">
                      {search ? t.emptyWithSearch : t.emptyNoUsers}
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
                      className="border-t border-[#1A1A1A]/40 hover:bg-[#161616] transition-all duration-200"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white/90 font-bold text-xs flex-shrink-0`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{user.name}</div>
                            <div className="text-[#666666] text-xs">{user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          admin
                            ? 'text-[#A0A0A0] border border-[#2A2A2A] bg-[#1A1A1A]'
                            : 'text-[#A0A0A0] border border-[#1E1E1E] bg-transparent'
                        }`}>
                          {getRoleName(user.roleId)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[#A0A0A0] bg-[#1A1A1A]/40 uppercase">
                          {user.lang}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#666666] text-sm">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${
                            user.isActive
                              ? 'text-[#38CC97]'
                              : 'text-[#666666]'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                            user.isActive ? 'bg-[#38CC97]' : 'bg-[#666666]'
                          }`} />
                          {user.isActive ? t.active : t.inactive}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleActive(user)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] border border-transparent hover:border-[#1E1E1E] transition-all duration-200"
                          >
                            {user.isActive ? t.deactivate : t.activate}
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg text-[#C44545] hover:text-[#C44545] hover:bg-[#C44545]/10 border border-transparent hover:border-[#C44545]/20 transition-all duration-200"
                          >
                            {t.deleteBtn}
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
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-white">{t.modalTitle}</h2>
              <p className="text-[#666666] text-sm mt-1">
                {generatedCode ? t.modalSuccess : t.modalFormHelper}
              </p>
            </div>

            <div className="border-b border-[#1A1A1A] mx-6" />

            {generatedCode ? (
              /* Success view */
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-[#38CC97]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#38CC97]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-[#A0A0A0] text-sm mb-4 text-center">
                  {t.createdOk(createdUserName)}
                </p>

                <div className="bg-[#38CC97]/5 border border-[#38CC97]/20 rounded-xl p-5">
                  <label className="block text-xs uppercase tracking-wide text-[#38CC97]/70 font-medium mb-2">
                    {t.accessCode}
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-[#38CC97] font-mono text-3xl font-bold tracking-widest">
                      {generatedCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        copied
                          ? 'bg-[#38CC97]/20 text-[#38CC97]'
                          : 'bg-[#38CC97]/10 text-[#38CC97] hover:bg-[#38CC97]/20'
                      }`}
                    >
                      {copied ? t.copied : t.copy}
                    </button>
                  </div>
                </div>

                <p className="text-[#666666] text-xs mt-3 text-center">
                  {t.codeOnce}
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-[#1A1A1A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#2A2A2A] transition-all duration-200"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            ) : (
              /* Form view */
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
                  />
                  {formName.trim() && (
                    <p className="text-[#666666] text-xs mt-1.5">
                      ID: <span className="font-mono text-[#A0A0A0]">{generateIdFromName(formName)}</span>
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.roleLabel}
                  </label>
                  <select
                    value={formRoleId}
                    onChange={(e) => setFormRoleId(e.target.value)}
                    className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
                  >
                    <option value="">{t.selectRole}</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {lang === 'ru' ? (role.nameRu || role.name) : role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.languageLabel}
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormLang('es')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        formLang === 'es'
                          ? 'bg-[#98283A]/10 border-[#98283A]/30 text-[#98283A]'
                          : 'bg-[#1A1A1A]/50 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#2A2A2A] hover:text-white'
                      }`}
                    >
                      {t.spanish}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormLang('ru')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        formLang === 'ru'
                          ? 'bg-[#98283A]/10 border-[#98283A]/30 text-[#98283A]'
                          : 'bg-[#1A1A1A]/50 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#2A2A2A] hover:text-white'
                      }`}
                    >
                      {t.russian}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-transparent text-[#A0A0A0] font-semibold text-sm px-5 py-2.5 rounded-lg border border-[#1E1E1E] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!formName.trim() || !formRoleId || creating}
                    className="bg-[#98283A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#B33347] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {creating ? t.creating : t.createBtn}
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
