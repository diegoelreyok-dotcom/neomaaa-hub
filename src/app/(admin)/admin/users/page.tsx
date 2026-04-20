'use client';

import { useMemo, useState } from 'react';
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
import AdminStagger, { AdminStaggerItem } from '@/components/admin/AdminStagger';
import InviteModal from '@/components/admin/InviteModal';
import type { AdminUser, AdminRole } from '@/components/admin/fetcher';
import { SECTIONS } from '@/lib/sections';

const AVATAR_GRADIENTS = [
  'from-slate-600 to-slate-700',
  'from-zinc-600 to-zinc-700',
  'from-gray-600 to-gray-700',
  'from-neutral-600 to-neutral-700',
  'from-stone-600 to-stone-700',
  'from-slate-500 to-gray-700',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labels: Record<Lang, {
  title: string;
  subtitle: (n: number) => string;
  addUser: string;
  searchPlaceholder: string;
  colName: string;
  colEmail: string;
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
  editBtn: string;
  confirmDelete: (name: string) => string;
  modalTitle: string;
  editModalTitle: string;
  modalSuccess: string;
  editSuccess: string;
  modalFormHelper: string;
  editFormHelper: string;
  accessCode: string;
  copy: string;
  copied: string;
  codeOnce: string;
  close: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalid: string;
  roleLabel: string;
  selectRole: string;
  languageLabel: string;
  spanish: string;
  russian: string;
  cancel: string;
  createBtn: string;
  creating: string;
  saveBtn: string;
  saving: string;
  extraSectionsLabel: string;
  extraSectionsHelp: string;
  includedByRole: string;
  extraBadge: (n: number) => string;
  activeLabel: string;
  copyEmail: string;
  emailCopied: string;
  inviteBtn: string;
}> = {
  es: {
    title: 'Usuarios',
    subtitle: (n) => `${n} ${n !== 1 ? 'usuarios registrados' : 'usuario registrado'}`,
    addUser: 'Agregar Usuario',
    searchPlaceholder: 'Buscar por nombre, ID, email o rol...',
    colName: 'Nombre',
    colEmail: 'Email',
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
    editBtn: 'Editar',
    confirmDelete: (name) => `Seguro que deseas eliminar al usuario "${name}"?`,
    modalTitle: 'Agregar Usuario',
    editModalTitle: 'Editar Usuario',
    modalSuccess: 'Usuario creado exitosamente',
    editSuccess: 'Usuario actualizado',
    modalFormHelper: 'Completa los datos del nuevo miembro',
    editFormHelper: 'Actualiza datos, rol y accesos adicionales',
    accessCode: 'Codigo de Acceso',
    copy: 'Copiar',
    copied: 'Copiado',
    codeOnce: 'Este codigo solo se muestra una vez. Compartelo de forma segura.',
    close: 'Cerrar',
    nameLabel: 'Nombre',
    namePlaceholder: 'Nombre completo',
    emailLabel: 'Email',
    emailPlaceholder: 'usuario@neomaaa.com',
    emailInvalid: 'Email invalido',
    roleLabel: 'Rol primario',
    selectRole: 'Seleccionar rol...',
    languageLabel: 'Idioma',
    spanish: 'Español (ES)',
    russian: 'Ruso (RU)',
    cancel: 'Cancelar',
    createBtn: 'Crear Usuario',
    creating: 'Creando...',
    saveBtn: 'Guardar',
    saving: 'Guardando...',
    extraSectionsLabel: 'Secciones adicionales',
    extraSectionsHelp: 'Accesos extra mas alla del rol primario. Las incluidas por rol aparecen fijas.',
    includedByRole: 'incluida por rol',
    extraBadge: (n) => `+${n} extra`,
    activeLabel: 'Usuario activo',
    copyEmail: 'Copiar email',
    emailCopied: 'Email copiado',
    inviteBtn: 'Invitar',
  },
  ru: {
    title: 'Пользователи',
    subtitle: (n) => `${n} ${n !== 1 ? 'зарегистрированных пользователей' : 'зарегистрированный пользователь'}`,
    addUser: 'Добавить пользователя',
    searchPlaceholder: 'Поиск по имени, ID, email или роли...',
    colName: 'Имя',
    colEmail: 'Email',
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
    editBtn: 'Изменить',
    confirmDelete: (name) => `Удалить пользователя "${name}"?`,
    modalTitle: 'Добавить пользователя',
    editModalTitle: 'Изменить пользователя',
    modalSuccess: 'Пользователь успешно создан',
    editSuccess: 'Пользователь обновлён',
    modalFormHelper: 'Заполните данные нового участника',
    editFormHelper: 'Обновите данные, роль и дополнительные доступы',
    accessCode: 'Код доступа',
    copy: 'Копировать',
    copied: 'Скопировано',
    codeOnce: 'Код показывается только один раз. Передайте его безопасно.',
    close: 'Закрыть',
    nameLabel: 'Имя',
    namePlaceholder: 'Полное имя',
    emailLabel: 'Email',
    emailPlaceholder: 'user@neomaaa.com',
    emailInvalid: 'Некорректный email',
    roleLabel: 'Основная роль',
    selectRole: 'Выберите роль...',
    languageLabel: 'Язык',
    spanish: 'Испанский (ES)',
    russian: 'Русский (RU)',
    cancel: 'Отменить',
    createBtn: 'Создать пользователя',
    creating: 'Создание...',
    saveBtn: 'Сохранить',
    saving: 'Сохранение...',
    extraSectionsLabel: 'Дополнительные секции',
    extraSectionsHelp: 'Дополнительные доступы сверх основной роли. Секции из роли отмечены и заблокированы.',
    includedByRole: 'включено ролью',
    extraBadge: (n) => `+${n} доп.`,
    activeLabel: 'Активен',
    copyEmail: 'Скопировать email',
    emailCopied: 'Email скопирован',
    inviteBtn: 'Пригласить',
  },
  en: {
    title: 'Users',
    subtitle: (n) => `${n} ${n !== 1 ? 'registered users' : 'registered user'}`,
    addUser: 'Add user',
    searchPlaceholder: 'Search by name, ID, email or role...',
    colName: 'Name',
    colEmail: 'Email',
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
    editBtn: 'Edit',
    confirmDelete: (name) => `Delete user "${name}"?`,
    modalTitle: 'Add user',
    editModalTitle: 'Edit user',
    modalSuccess: 'User created successfully',
    editSuccess: 'User updated',
    modalFormHelper: 'Fill in the new team member details',
    editFormHelper: 'Update details, role and extra access',
    accessCode: 'Access code',
    copy: 'Copy',
    copied: 'Copied',
    codeOnce: 'This code is shown only once. Share it securely.',
    close: 'Close',
    nameLabel: 'Name',
    namePlaceholder: 'Full name',
    emailLabel: 'Email',
    emailPlaceholder: 'user@neomaaa.com',
    emailInvalid: 'Invalid email',
    roleLabel: 'Primary role',
    selectRole: 'Select role...',
    languageLabel: 'Language',
    spanish: 'Spanish (ES)',
    russian: 'Russian (RU)',
    cancel: 'Cancel',
    createBtn: 'Create user',
    creating: 'Creating...',
    saveBtn: 'Save',
    saving: 'Saving...',
    extraSectionsLabel: 'Extra sections',
    extraSectionsHelp: 'Extra access beyond the primary role. Role-included sections are fixed.',
    includedByRole: 'included by role',
    extraBadge: (n) => `+${n} extra`,
    activeLabel: 'User active',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
    inviteBtn: 'Invite',
  },
};

function generateIdFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getSectionTitle(
  section: (typeof SECTIONS)[number],
  lang: Lang,
): string {
  if (lang === 'ru') return section.nameRu;
  if (lang === 'en') return section.nameEn || section.nameEs;
  return section.nameEs;
}

// Form state shared by create + edit modals.
interface UserFormState {
  name: string;
  email: string;
  roleId: string;
  lang: 'es' | 'ru' | 'en';
  isActive: boolean;
  extraSections: string[];
}

const EMPTY_FORM: UserFormState = {
  name: '',
  email: '',
  roleId: '',
  lang: 'es',
  isActive: true,
  extraSections: [],
};

export default function UsersPage() {
  const lang = useAdminLang();
  const t = labels[lang];
  const { users, isLoading, mutate: mutateUsers } = useAdminUsers();
  const { roles } = useAdminRoles();

  // Create modal state
  const [showCreate, setShowCreate] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [createdUserName, setCreatedUserName] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createForm, setCreateForm] = useState<UserFormState>(EMPTY_FORM);
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit modal state
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<UserFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Email copy feedback
  const [copiedEmailFor, setCopiedEmailFor] = useState<string | null>(null);

  // Invite modal state
  const [invitingUser, setInvitingUser] = useState<AdminUser | null>(null);

  const sortedSections = useMemo(
    () => [...SECTIONS].sort((a, b) => a.order - b.order),
    [],
  );

  function getRoleName(roleId: string): string {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return roleId;
    return lang === 'ru' ? (role.nameRu || role.name) : role.name;
  }

  function isAdminRole(roleId: string): boolean {
    return roles.find((r) => r.id === roleId)?.isAdmin || false;
  }

  function getRoleSections(roleId: string): string[] {
    const role = roles.find((r) => r.id === roleId);
    return role?.sections ?? [];
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

  function validateForm(form: UserFormState): string | null {
    if (!form.name.trim()) return t.nameLabel;
    if (!form.roleId) return t.selectRole;
    if (form.email && !EMAIL_REGEX.test(form.email.trim())) return t.emailInvalid;
    return null;
  }

  // --- CREATE ---
  async function handleCreate() {
    const err = validateForm(createForm);
    if (err) {
      setCreateError(err);
      return;
    }
    setCreateError(null);
    setCreating(true);
    const userId = generateIdFromName(createForm.name);
    // Strip extraSections that are already in role.sections (clean UX)
    const roleSections = new Set(getRoleSections(createForm.roleId));
    const cleanExtras = createForm.extraSections.filter(
      (s) => !roleSections.has(s),
    );

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          name: createForm.name.trim(),
          email: createForm.email.trim() || undefined,
          roleId: createForm.roleId,
          lang: createForm.lang,
          isActive: createForm.isActive,
          extraSections: cleanExtras,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedCode(data.code);
        setCreatedUserName(createForm.name.trim());
        mutateUsers();
      } else {
        const data = await res.json().catch(() => ({}));
        setCreateError(data?.error || 'Error');
      }
    } finally {
      setCreating(false);
    }
  }

  // --- EDIT ---
  function openEdit(user: AdminUser) {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email ?? '',
      roleId: user.roleId,
      lang: user.lang,
      isActive: user.isActive,
      extraSections: user.extraSections ?? [],
    });
    setEditError(null);
  }

  function closeEdit() {
    setEditingUser(null);
    setEditForm(EMPTY_FORM);
    setEditError(null);
  }

  async function handleSaveEdit() {
    if (!editingUser) return;
    const err = validateForm(editForm);
    if (err) {
      setEditError(err);
      return;
    }
    setEditError(null);
    setSaving(true);
    const roleSections = new Set(getRoleSections(editForm.roleId));
    const cleanExtras = editForm.extraSections.filter(
      (s) => !roleSections.has(s),
    );

    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser.id,
          name: editForm.name.trim(),
          email: editForm.email.trim() || null,
          roleId: editForm.roleId,
          lang: editForm.lang,
          isActive: editForm.isActive,
          extraSections: cleanExtras,
        }),
      });
      if (res.ok) {
        mutateUsers();
        closeEdit();
      } else {
        const data = await res.json().catch(() => ({}));
        setEditError(data?.error || 'Error');
      }
    } finally {
      setSaving(false);
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

  function handleCopyEmail(email: string, userId: string) {
    navigator.clipboard.writeText(email);
    setCopiedEmailFor(userId);
    setTimeout(() => setCopiedEmailFor((curr) => (curr === userId ? null : curr)), 1800);
  }

  function closeCreate() {
    setShowCreate(false);
    setGeneratedCode(null);
    setCreatedUserName('');
    setCopied(false);
    setCreateForm(EMPTY_FORM);
    setCreateError(null);
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
      key: 'email',
      header: t.colEmail,
      render: (user) => {
        if (!user.email) {
          return <span className="text-[#666666] text-sm">—</span>;
        }
        const isCopied = copiedEmailFor === user.id;
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyEmail(user.email!, user.id);
            }}
            className="text-[#A0A0A0] text-xs font-mono hover:text-white transition-colors truncate max-w-[200px] inline-block text-left"
            title={isCopied ? t.emailCopied : t.copyEmail}
          >
            {isCopied ? t.emailCopied : user.email}
          </button>
        );
      },
    },
    {
      key: 'role',
      header: t.colRole,
      render: (user) => {
        const extraCount = user.extraSections?.length ?? 0;
        const extraTitles = (user.extraSections ?? [])
          .map((id) => SECTIONS.find((s) => s.id === id))
          .filter((s): s is (typeof SECTIONS)[number] => !!s)
          .map((s) => getSectionTitle(s, lang))
          .join(', ');
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            {isAdminRole(user.roleId) ? (
              <AdminBadge variant="burgundy">{getRoleName(user.roleId)}</AdminBadge>
            ) : (
              <AdminBadge variant="neutral">{getRoleName(user.roleId)}</AdminBadge>
            )}
            {extraCount > 0 && (
              <span title={extraTitles}>
                <AdminBadge variant="green">{t.extraBadge(extraCount)}</AdminBadge>
              </span>
            )}
          </div>
        );
      },
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
            user.isActive ? 'text-[#10B981]' : 'text-[#666666]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              user.isActive ? 'bg-[#10B981]' : 'bg-[#666666]'
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
              openEdit(user);
            }}
            className="text-xs font-medium px-2.5 py-1 rounded text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            {t.editBtn}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setInvitingUser(user);
            }}
            className="text-xs font-semibold px-2.5 py-1 rounded text-[#C94A5C] hover:bg-[#C94A5C]/10 border border-transparent hover:border-[#C94A5C]/25 transition-colors"
          >
            {t.inviteBtn}
          </button>
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
    <AdminStagger>
      <AdminStaggerItem>
        <AdminPageHeader
          title={t.title}
          subtitle={t.subtitle(users.length)}
          counter={users.length > 0 ? users.length : undefined}
          actions={
            <button onClick={() => setShowCreate(true)} className={btnPrimary}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t.addUser}
            </button>
          }
        />
      </AdminStaggerItem>

      <AdminStaggerItem>
      <AdminTable
        columns={columns}
        data={users}
        rowKey={(u) => u.id}
        loading={isLoading}
        searchable={{
          placeholder: t.searchPlaceholder,
          fields: (u) => [u.name, u.id, u.email ?? '', getRoleName(u.roleId)],
        }}
        pageSize={25}
        emptyTitle={t.emptyNoUsers}
      />
      </AdminStaggerItem>

      {/* Create User Modal */}
      {showCreate && (
        <UserModal
          mode="create"
          t={t}
          lang={lang}
          roles={roles}
          sections={sortedSections}
          form={createForm}
          setForm={setCreateForm}
          error={createError}
          submitting={creating}
          generatedCode={generatedCode}
          createdUserName={createdUserName}
          copied={copied}
          onCopyCode={handleCopyCode}
          onClose={closeCreate}
          onSubmit={handleCreate}
        />
      )}

      {/* Invite Modal */}
      {invitingUser && (
        <InviteModal
          user={invitingUser}
          onClose={() => setInvitingUser(null)}
        />
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <UserModal
          mode="edit"
          t={t}
          lang={lang}
          roles={roles}
          sections={sortedSections}
          form={editForm}
          setForm={setEditForm}
          error={editError}
          submitting={saving}
          generatedCode={null}
          createdUserName=""
          copied={false}
          editingUserId={editingUser.id}
          onCopyCode={() => {}}
          onClose={closeEdit}
          onSubmit={handleSaveEdit}
        />
      )}
    </AdminStagger>
  );
}

// --------------- UserModal (inline component) ---------------

interface UserModalProps {
  mode: 'create' | 'edit';
  t: (typeof labels)[Lang];
  lang: Lang;
  roles: AdminRole[];
  sections: typeof SECTIONS;
  form: UserFormState;
  setForm: (updater: (prev: UserFormState) => UserFormState) => void;
  error: string | null;
  submitting: boolean;
  generatedCode: string | null;
  createdUserName: string;
  copied: boolean;
  editingUserId?: string;
  onCopyCode: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

function UserModal({
  mode,
  t,
  lang,
  roles,
  sections,
  form,
  setForm,
  error,
  submitting,
  generatedCode,
  createdUserName,
  copied,
  onCopyCode,
  onClose,
  onSubmit,
}: UserModalProps) {
  const selectedRole = roles.find((r) => r.id === form.roleId);
  const roleSectionIds = new Set(selectedRole?.sections ?? []);

  function toggleExtra(sectionId: string) {
    // Cannot toggle sections that are in the role
    if (roleSectionIds.has(sectionId)) return;
    setForm((prev) => {
      const has = prev.extraSections.includes(sectionId);
      return {
        ...prev,
        extraSections: has
          ? prev.extraSections.filter((s) => s !== sectionId)
          : [...prev.extraSections, sectionId],
      };
    });
  }

  const isSuccess = mode === 'create' && !!generatedCode;
  const modalTitle = mode === 'edit' ? t.editModalTitle : t.modalTitle;
  const subtitle = isSuccess
    ? t.modalSuccess
    : mode === 'edit'
      ? t.editFormHelper
      : t.modalFormHelper;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,6,14,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl shadow-black/40"
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(152,40,58,0.4), transparent 50%, rgba(152,40,58,0.26))',
            padding: '1px',
          }}
        >
          <div
            className="w-full h-full rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(22,26,42,0.85), rgba(10,14,26,0.85))',
              backdropFilter: 'blur(14px)',
            }}
          />
        </div>
        <div className="relative max-h-[90vh] overflow-y-auto">
        <div
          className="px-6 pt-6 pb-4 sticky top-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(22,26,42,0.85), rgba(10,14,26,0.85))',
            backdropFilter: 'blur(14px)',
          }}
        >
          <h2 className="text-lg font-semibold text-white">{modalTitle}</h2>
          <p className="text-[#94A3B8] text-sm mt-1">{subtitle}</p>
        </div>
        <div className="border-b border-white/[0.06] mx-6" />

        {isSuccess ? (
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#A0A0A0] text-sm mb-4 text-center">
              Usuario <span className="text-white font-semibold">{createdUserName}</span>{' '}
              {lang === 'ru' ? 'создан' : lang === 'en' ? 'created' : 'creado'}.
            </p>
            <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-5">
              <label className="block text-xs uppercase tracking-wide text-[#10B981]/70 font-medium mb-2">
                {t.accessCode}
              </label>
              <div className="flex items-center justify-between">
                <span className="text-[#10B981] font-mono text-3xl font-bold tracking-widest">
                  {generatedCode}
                </span>
                <button
                  onClick={onCopyCode}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                    copied
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20'
                  }`}
                >
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            </div>
            <p className="text-[#666666] text-xs mt-3 text-center">{t.codeOnce}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#1A1A1A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#2A2A2A] transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={t.namePlaceholder}
                className="w-full bg-white/[0.04] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#98283A]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(152,40,58,0.15)] transition-all duration-200"
              />
              {mode === 'create' && form.name.trim() && (
                <p className="text-[#666666] text-xs mt-1.5">
                  ID:{' '}
                  <span className="font-mono text-[#A0A0A0]">
                    {generateIdFromName(form.name)}
                  </span>
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={t.emailPlaceholder}
                className="w-full bg-white/[0.04] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#98283A]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(152,40,58,0.15)] transition-all duration-200"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.roleLabel}
              </label>
              <select
                value={form.roleId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, roleId: e.target.value }))
                }
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

            {/* Extra sections */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-1.5">
                {t.extraSectionsLabel}
              </label>
              <p className="text-[#666666] text-xs mb-3">{t.extraSectionsHelp}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded-lg p-3 max-h-60 overflow-y-auto">
                {sections.map((section) => {
                  const includedByRole = roleSectionIds.has(section.id);
                  const isExtra = form.extraSections.includes(section.id);
                  const checked = includedByRole || isExtra;
                  return (
                    <label
                      key={section.id}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                        includedByRole
                          ? 'text-[#666666] cursor-not-allowed'
                          : 'text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={includedByRole}
                        onChange={() => toggleExtra(section.id)}
                        className="w-3.5 h-3.5 rounded border-[#2A2A2A] bg-[#1A1A1A] accent-[#98283A] cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="flex-1 truncate">
                        {getSectionTitle(section, lang)}
                      </span>
                      {includedByRole && (
                        <span className="text-[9px] uppercase tracking-wider text-[#666666] bg-[#1A1A1A] px-1.5 py-0.5 rounded">
                          {t.includedByRole}
                        </span>
                      )}
                      {!includedByRole && isExtra && (
                        <span className="text-[9px] uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                          + extra
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.languageLabel}
              </label>
              <div className="flex gap-3">
                {(['es', 'ru', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, lang: l }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-150 ${
                      form.lang === l
                        ? 'bg-[#98283A]/10 border-[#98283A]/30 text-[#98283A]'
                        : 'bg-[#1A1A1A]/50 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#2A2A2A] hover:text-white'
                    }`}
                  >
                    {l === 'es' ? t.spanish : l === 'ru' ? t.russian : 'English (EN)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Active toggle (edit mode only — create defaults to active) */}
            {mode === 'edit' && (
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, isActive: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1A1A1A] accent-[#98283A] cursor-pointer"
                  />
                  <span className="text-sm text-white">{t.activeLabel}</span>
                </label>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-[#C44545] text-xs bg-[#C44545]/10 border border-[#C44545]/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="bg-transparent text-[#94A3B8] font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                {t.cancel}
              </button>
              <button
                onClick={onSubmit}
                disabled={!form.name.trim() || !form.roleId || submitting}
                className="bg-gradient-to-br from-[#98283A] to-[#7A2030] hover:from-[#B33347] hover:to-[#98283A] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-[0_0_18px_rgba(152,40,58,0.35)] hover:shadow-[0_0_26px_rgba(152,40,58,0.5)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {mode === 'edit'
                  ? submitting
                    ? t.saving
                    : t.saveBtn
                  : submitting
                    ? t.creating
                    : t.createBtn}
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
