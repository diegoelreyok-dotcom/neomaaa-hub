'use client';

import { useEffect, useState } from 'react';
import { useAdminLang } from '@/components/admin/AdminContext';
import {
  AdminPageHeader,
  AdminBadge,
  btnPrimary,
} from '@/components/admin/AdminUI';
import { AdminTable, AdminTableColumn } from '@/components/admin/AdminTable';
import type { Lang } from '@/lib/types';

interface ApiKeyRow {
  id: string;
  name: string;
  lastChars: string;
  createdAt: string;
  createdBy: string;
  lastUsed: string | null;
  enabled: boolean;
}

const L: Record<Lang, {
  title: string;
  subtitle: string;
  newKey: string;
  name: string;
  lastUsed: string;
  status: string;
  preview: string;
  createdAt: string;
  actions: string;
  enabled: string;
  disabled: string;
  enable: string;
  disable: string;
  delete: string;
  never: string;
  empty: string;
  modalTitle: string;
  modalHint: string;
  nameLabel: string;
  namePlaceholder: string;
  cancel: string;
  create: string;
  creating: string;
  created: string;
  copyOnce: string;
  copy: string;
  copied: string;
  close: string;
  confirmDelete: (n: string) => string;
}> = {
  es: {
    title: 'API Keys',
    subtitle: 'Claves para integraciones externas con la Knowledge Base',
    newKey: 'Crear API Key',
    name: 'Nombre',
    lastUsed: 'Último uso',
    status: 'Estado',
    preview: 'Clave',
    createdAt: 'Creada',
    actions: 'Acciones',
    enabled: 'Activa',
    disabled: 'Deshabilitada',
    enable: 'Activar',
    disable: 'Deshabilitar',
    delete: 'Eliminar',
    never: 'Nunca',
    empty: 'Aún no hay API Keys creadas.',
    modalTitle: 'Crear nueva API Key',
    modalHint: 'Dale un nombre descriptivo (ej: "Claude MCP", "Agente externo").',
    nameLabel: 'Nombre',
    namePlaceholder: 'Claude MCP',
    cancel: 'Cancelar',
    create: 'Crear',
    creating: 'Creando...',
    created: 'Clave creada',
    copyOnce: 'Esta clave solo se muestra UNA vez. Copiala ahora — después no la vas a poder ver.',
    copy: 'Copiar',
    copied: 'Copiado',
    close: 'Cerrar',
    confirmDelete: (n) => `Eliminar la API Key "${n}"? Cualquier integración que la use dejará de funcionar.`,
  },
  ru: {
    title: 'API-ключи',
    subtitle: 'Ключи для внешних интеграций с базой знаний',
    newKey: 'Создать API-ключ',
    name: 'Название',
    lastUsed: 'Последнее использование',
    status: 'Статус',
    preview: 'Ключ',
    createdAt: 'Создан',
    actions: 'Действия',
    enabled: 'Активен',
    disabled: 'Отключён',
    enable: 'Включить',
    disable: 'Отключить',
    delete: 'Удалить',
    never: 'Никогда',
    empty: 'API-ключей ещё нет.',
    modalTitle: 'Новый API-ключ',
    modalHint: 'Дайте описательное имя (напр.: «Claude MCP», «Внешний агент»).',
    nameLabel: 'Название',
    namePlaceholder: 'Claude MCP',
    cancel: 'Отмена',
    create: 'Создать',
    creating: 'Создание...',
    created: 'Ключ создан',
    copyOnce: 'Этот ключ показывается только ОДИН раз. Скопируйте сейчас — позже его нельзя будет увидеть.',
    copy: 'Копировать',
    copied: 'Скопировано',
    close: 'Закрыть',
    confirmDelete: (n) => `Удалить API-ключ "${n}"? Все интеграции, использующие его, перестанут работать.`,
  },
  en: {
    title: 'API Keys',
    subtitle: 'Keys for external Knowledge Base integrations',
    newKey: 'Create API Key',
    name: 'Name',
    lastUsed: 'Last used',
    status: 'Status',
    preview: 'Key',
    createdAt: 'Created',
    actions: 'Actions',
    enabled: 'Active',
    disabled: 'Disabled',
    enable: 'Enable',
    disable: 'Disable',
    delete: 'Delete',
    never: 'Never',
    empty: 'No API Keys yet.',
    modalTitle: 'Create new API Key',
    modalHint: 'Give it a descriptive name (e.g. "Claude MCP", "External agent").',
    nameLabel: 'Name',
    namePlaceholder: 'Claude MCP',
    cancel: 'Cancel',
    create: 'Create',
    creating: 'Creating...',
    created: 'Key created',
    copyOnce: 'This key is shown ONLY once. Copy it now — you will not be able to view it again.',
    copy: 'Copy',
    copied: 'Copied',
    close: 'Close',
    confirmDelete: (n) => `Delete API Key "${n}"? Any integration using it will stop working.`,
  },
};

export default function ApiKeysPage() {
  const lang = useAdminLang();
  const t = L[lang];

  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [creating, setCreating] = useState(false);
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/api-keys');
      if (res.ok) setKeys(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate() {
    if (!formName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setPlaintext(data.plaintext);
        setFormName('');
        load();
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(row: ApiKeyRow) {
    const res = await fetch(`/api/admin/api-keys/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !row.enabled }),
    });
    if (res.ok) load();
  }

  async function handleDelete(row: ApiKeyRow) {
    if (!confirm(t.confirmDelete(row.name))) return;
    const res = await fetch(`/api/admin/api-keys/${row.id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  function closeModal() {
    setShowModal(false);
    setFormName('');
    setPlaintext(null);
    setCopied(false);
  }

  function copyKey() {
    if (!plaintext) return;
    navigator.clipboard.writeText(plaintext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(d: string | null | undefined): string {
    if (!d) return t.never;
    return new Date(d).toLocaleString(lang === 'ru' ? 'ru-RU' : 'es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const columns: AdminTableColumn<ApiKeyRow>[] = [
    {
      key: 'name',
      header: t.name,
      render: (r) => (
        <div>
          <div className="text-white text-sm font-medium">{r.name}</div>
          <div className="text-[#666666] text-xs">{r.id}</div>
        </div>
      ),
    },
    {
      key: 'preview',
      header: t.preview,
      render: (r) => (
        <span className="font-mono text-xs text-[#A0A0A0]">
          neo_live_••••{r.lastChars}
        </span>
      ),
    },
    {
      key: 'lastUsed',
      header: t.lastUsed,
      render: (r) => <span className="text-[#A0A0A0] text-sm">{formatDate(r.lastUsed)}</span>,
    },
    {
      key: 'createdAt',
      header: t.createdAt,
      render: (r) => <span className="text-[#A0A0A0] text-sm">{formatDate(r.createdAt)}</span>,
    },
    {
      key: 'status',
      header: t.status,
      render: (r) =>
        r.enabled ? (
          <AdminBadge variant="green">{t.enabled}</AdminBadge>
        ) : (
          <AdminBadge variant="neutral">{t.disabled}</AdminBadge>
        ),
    },
    {
      key: 'actions',
      header: t.actions,
      align: 'right',
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleToggle(r)}
            className="text-xs font-medium px-2.5 py-1 rounded text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            {r.enabled ? t.disable : t.enable}
          </button>
          <button
            onClick={() => handleDelete(r)}
            className="text-xs font-medium px-2.5 py-1 rounded text-[#C44545] hover:bg-[#C44545]/10 transition-colors"
          >
            {t.delete}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t.title}
        subtitle={t.subtitle}
        actions={
          <button onClick={() => setShowModal(true)} className={btnPrimary}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t.newKey}
          </button>
        }
      />

      <AdminTable
        columns={columns}
        data={keys}
        rowKey={(r) => r.id}
        loading={loading}
        pageSize={25}
        emptyTitle={t.empty}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-white">
                {plaintext ? t.created : t.modalTitle}
              </h2>
              <p className="text-[#666666] text-sm mt-1">
                {plaintext ? t.copyOnce : t.modalHint}
              </p>
            </div>
            <div className="border-b border-[#1A1A1A] mx-6" />

            {plaintext ? (
              <div className="p-6">
                <div className="bg-[#38CC97]/5 border border-[#38CC97]/20 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-[#38CC97] font-mono text-xs font-bold break-all">
                      {plaintext}
                    </code>
                    <button
                      onClick={copyKey}
                      className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                        copied
                          ? 'bg-[#38CC97]/20 text-[#38CC97]'
                          : 'bg-[#38CC97]/10 text-[#38CC97] hover:bg-[#38CC97]/20'
                      }`}
                    >
                      {copied ? t.copied : t.copy}
                    </button>
                  </div>
                </div>
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
                    autoFocus
                  />
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
                    disabled={!formName.trim() || creating}
                    className="bg-[#98283A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#B33347] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {creating ? t.creating : t.create}
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
