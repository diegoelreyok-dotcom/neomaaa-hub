'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/types';
import {
  useAdminUsers,
  useAdminRoles,
} from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';
import {
  AdminPageHeader,
  AdminBadge,
  btnPrimary,
} from '@/components/admin/AdminUI';
import {
  AdminTable,
  AdminTableColumn,
} from '@/components/admin/AdminTable';
import type { AdminUser } from '@/components/admin/fetcher';

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
  subtitle: (n: number) => string;
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
    subtitle: (n) => `${n} ${n !== 1 ? 'usuarios registrados' : 'usuario registrado'}`,
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
    confirmDelete: (name) => `Seguro que deseas eliminar al usuario "${name}"?`,
    modalTitle: 'Agregar Usuario',
    modalSuccess: 'Usuario creado exitosamente',
    modalFormHelper: 'Completa los datos del nuevo miembro',
    accessCode: 'Codigo de Acceso',
    copy: 'Copiar',
    copied: 'Copiado',
    codeOnce: 'Este codigo solo se muestra una vez. Compartelo de forma segura.',
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
    subtitle: (n) => `${n} ${n !== 1 ? 'зарегистрированных пользователей' : 'зарегистрированный пользователь'}`,
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
    confirmDelete: (name) => `Удалить пользователя "${name}"?`,
    modalTitle: 'Добавить пользователя',
    modalSuccess: 'Пользователь успешно создан',
    modalFormHelper: 'Заполните данные нового участника',
    accessCode: 'Код доступа',
    copy: 'Копировать',
    copied: 'Скопировано',
    codeOnce: 'Код показывается только один раз. Передайте его безопасно.',
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
  en: {
    title: 'Users',
    subtitle: (n) => `${n} ${n !== 1 ? 'registered users' : 'registered user'}`,
    addUser: 'Add user',
    searchPlaceholder: 'Search by name, ID or role...',
    colName: 'Name',
    colRole: 'Role',
    colLanguage: 'Language',
    colLastAccess: 'Last login',
    colStatus: 'Status',
    colActions: 'Actions',
    emptyWithSearch: 'No users match that search.',
    emptyNoUsers: 'No registered users.',
    active: 'Active',
    inactive: 'Inactive',
    deactivate: 'Deactivate',
    activate: 'Activate',
    deleteBtn: 'Delete',
    confirmDelete: (name) => `Delete user "${name}"?`,
    modalTitle: 'Add user',
    modalSuccess: 'User created successfully',
    modalFormHelper: 'Fill in the new team member details',
    accessCode: 'Access code',
    copy: 'Copy',
    copied: 'Copied',
    codeOnce: 'This code is shown only once. Share it securely.',
    close: 'Close',
    nameLabel: 'Name',
    namePlaceholder: 'Full name',
    roleLabel: 'Role',
    selectRole: 'Select role...',
    languageLabel: 'Language',
    spanish: 'Spanish (ES)',
    russian: 'Russian (RU)',
    cancel: 'Cancel',
    createBtn: 'Create user',
    creating: 'Creating...',
  },
};

function generateIdFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function UsersPage() {
  const lang = useAdminLang();
  const t = labels[lang];
  const { users, isLoading, mutate: mutateUsers } = useAdminUsers();
  const { roles } = useAdminRoles();

  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [createdUserName, setCreatedUserName] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formName, setFormName] = useState('');
  const [formRoleId, setFormRoleId] = useState('');
  const [formLang, setFormLang] = useState<'es' | 'ru' | 'en'>('es');

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
        mutateUsers();
      }
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(user: AdminUser) {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      });
      if (res.ok) {
        mutateUsers(
          (prev) => prev?.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)),
          false,
        );
      }
    } catch {}
  }

  async function handleDelete(user: AdminUser) {
    const confirmed = window.confirm(t.confirmDelete(user.name));
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/users?id=${user.id}`, { method: 'DELETE' });
      if (res.ok) {
        mutateUsers((prev) => prev?.filter((u) => u.id !== user.id), false);
      }
    } catch {}
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

  const columns: AdminTableColumn<AdminUser>[] = [
    {
      key: 'name',
      header: t.colName,
      render: (user, idx) => {
        const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
        return (
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white/90 font-bold text-xs flex-shrink-0`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{user.name}</div>
              <div className="text-[#666666] text-xs">{user.id}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'role',
      header: t.colRole,
      render: (user) =>
        isAdminRole(user.roleId) ? (
          <AdminBadge variant="burgundy">{getRoleName(user.roleId)}</AdminBadge>
        ) : (
          <AdminBadge variant="neutral">{getRoleName(user.roleId)}</AdminBadge>
        ),
    },
    {
      key: 'lang',
      header: t.colLanguage,
      render: (user) => (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#A0A0A0] bg-[#1A1A1A] uppercase">
          {user.lang}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      header: t.colLastAccess,
      render: (user) => (
        <span className="text-[#A0A0A0] text-sm">{formatDate(user.lastLogin)}</span>
      ),
    },
    {
      key: 'status',
      header: t.colStatus,
      render: (user) => (
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
            user.isActive ? 'text-[#38CC97]' : 'text-[#666666]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              user.isActive ? 'bg-[#38CC97]' : 'bg-[#666666]'
            }`}
          />
          {user.isActive ? t.active : t.inactive}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t.colActions,
      align: 'right',
      render: (user) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleActive(user);
            }}
            className="text-xs font-medium px-2.5 py-1 rounded text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            {user.isActive ? t.deactivate : t.activate}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user);
            }}
            className="text-xs font-medium px-2.5 py-1 rounded text-[#C44545] hover:bg-[#C44545]/10 transition-colors"
          >
            {t.deleteBtn}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t.title}
        subtitle={t.subtitle(users.length)}
        actions={
          <button onClick={() => setShowModal(true)} className={btnPrimary}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t.addUser}
          </button>
        }
      />

      <AdminTable
        columns={columns}
        data={users}
        rowKey={(u) => u.id}
        loading={isLoading}
        searchable={{
          placeholder: t.searchPlaceholder,
          fields: (u) => [u.name, u.id, getRoleName(u.roleId)],
        }}
        pageSize={25}
        emptyTitle={t.emptyNoUsers}
      />

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-white">{t.modalTitle}</h2>
              <p className="text-[#666666] text-sm mt-1">
                {generatedCode ? t.modalSuccess : t.modalFormHelper}
              </p>
            </div>
            <div className="border-b border-[#1A1A1A] mx-6" />

            {generatedCode ? (
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-[#38CC97]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#38CC97]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#A0A0A0] text-sm mb-4 text-center">
                  Usuario <span className="text-white font-semibold">{createdUserName}</span>{' '}
                  {lang === 'ru' ? 'создан' : 'creado'}.
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
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                        copied
                          ? 'bg-[#38CC97]/20 text-[#38CC97]'
                          : 'bg-[#38CC97]/10 text-[#38CC97] hover:bg-[#38CC97]/20'
                      }`}
                    >
                      {copied ? t.copied : t.copy}
                    </button>
                  </div>
                </div>
                <p className="text-[#666666] text-xs mt-3 text-center">{t.codeOnce}</p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-[#1A1A1A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#2A2A2A] transition-colors"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-colors"
                  />
                  {formName.trim() && (
                    <p className="text-[#666666] text-xs mt-1.5">
                      ID: <span className="font-mono text-[#A0A0A0]">{generateIdFromName(formName)}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.roleLabel}
                  </label>
                  <select
                    value={formRoleId}
                    onChange={(e) => setFormRoleId(e.target.value)}
                    className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-colors"
                  >
                    <option value="">{t.selectRole}</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {lang === 'ru' ? (role.nameRu || role.name) : role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                    {t.languageLabel}
                  </label>
                  <div className="flex gap-3">
                    {(['es', 'ru', 'en'] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setFormLang(l)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-150 ${
                          formLang === l
                            ? 'bg-[#98283A]/10 border-[#98283A]/30 text-[#98283A]'
                            : 'bg-[#1A1A1A]/50 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#2A2A2A] hover:text-white'
                        }`}
                      >
                        {l === 'es' ? t.spanish : l === 'ru' ? t.russian : 'English (EN)'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-transparent text-[#A0A0A0] font-semibold text-sm px-5 py-2.5 rounded-lg border border-[#1E1E1E] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!formName.trim() || !formRoleId || creating}
                    className="bg-[#98283A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#B33347] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
