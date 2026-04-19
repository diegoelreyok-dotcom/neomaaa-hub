'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/types';
import { useAdminRegistrations, useAdminRoles } from '@/components/admin/useAdminData';
import { useAdminLang } from '@/components/admin/AdminContext';
import type {
  AdminRegistration as Registration,
  AdminRole as Role,
} from '@/components/admin/fetcher';
import {
  AdminPageHeader,
  AdminEmpty,
  btnPrimary,
  btnSecondary,
} from '@/components/admin/AdminUI';
import { AdminCard } from '@/components/admin/AdminCard';
import AdminStagger, { AdminStaggerItem } from '@/components/admin/AdminStagger';

const labels: Record<Lang, {
  title: string;
  subtitle: string;
  pendingLabelOne: string;
  pendingLabelMany: string;
  noPending: string;
  noEmail: string;
  approve: string;
  reject: string;
  confirmReject: string;
  confirmDelete: string;
  errorApprove: string;
  errorReject: string;
  errorDelete: string;
  history: string;
  approved: string;
  rejected: string;
  approveModalTitle: (name: string) => string;
  approveModalHelper: string;
  roleLabel: string;
  selectRole: string;
  approveConfirm: string;
  creating: string;
  cancel: string;
  userCreated: string;
  shareData: string;
  userLabel: string;
  codeLabel: string;
  copyData: string;
  copiedData: string;
  close: string;
}> = {
  es: {
    title: 'Solicitudes de Registro',
    subtitle: 'Gestiona las solicitudes de acceso a la plataforma',
    pendingLabelOne: 'pendiente',
    pendingLabelMany: 'pendientes',
    noPending: 'No hay solicitudes pendientes',
    noEmail: 'Sin email',
    approve: 'Aprobar',
    reject: 'Rechazar',
    confirmReject: 'Rechazar esta solicitud?',
    confirmDelete: 'Eliminar esta solicitud permanentemente?',
    errorApprove: 'Error al aprobar',
    errorReject: 'Error al rechazar',
    errorDelete: 'Error al eliminar',
    history: 'Historial',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    approveModalTitle: (name) => `Aprobar a ${name}`,
    approveModalHelper: 'Selecciona el rol que tendra en la plataforma',
    roleLabel: 'Rol',
    selectRole: 'Seleccionar rol...',
    approveConfirm: 'Aprobar y crear usuario',
    creating: 'Creando...',
    cancel: 'Cancelar',
    userCreated: 'Usuario creado',
    shareData: 'Comparte estos datos con la persona',
    userLabel: 'Usuario',
    codeLabel: 'Codigo',
    copyData: 'Copiar datos',
    copiedData: 'Datos copiados',
    close: 'Cerrar',
  },
  ru: {
    title: 'Заявки на регистрацию',
    subtitle: 'Управляйте заявками на доступ к платформе',
    pendingLabelOne: 'ожидает',
    pendingLabelMany: 'ожидают',
    noPending: 'Заявок в ожидании нет',
    noEmail: 'Без email',
    approve: 'Одобрить',
    reject: 'Отклонить',
    confirmReject: 'Отклонить эту заявку?',
    confirmDelete: 'Удалить эту заявку навсегда?',
    errorApprove: 'Ошибка при одобрении',
    errorReject: 'Ошибка при отклонении',
    errorDelete: 'Ошибка при удалении',
    history: 'История',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    approveModalTitle: (name) => `Одобрить ${name}`,
    approveModalHelper: 'Выберите роль, которую получит пользователь',
    roleLabel: 'Роль',
    selectRole: 'Выберите роль...',
    approveConfirm: 'Одобрить и создать пользователя',
    creating: 'Создание...',
    cancel: 'Отменить',
    userCreated: 'Пользователь создан',
    shareData: 'Передайте эти данные пользователю',
    userLabel: 'Пользователь',
    codeLabel: 'Код',
    copyData: 'Копировать данные',
    copiedData: 'Данные скопированы',
    close: 'Закрыть',
  },
  en: {
    title: 'Registration Requests',
    subtitle: 'Manage platform access requests',
    pendingLabelOne: 'pending',
    pendingLabelMany: 'pending',
    noPending: 'No pending requests',
    noEmail: 'No email',
    approve: 'Approve',
    reject: 'Reject',
    confirmReject: 'Reject this request?',
    confirmDelete: 'Permanently delete this request?',
    errorApprove: 'Approval failed',
    errorReject: 'Rejection failed',
    errorDelete: 'Deletion failed',
    history: 'History',
    approved: 'Approved',
    rejected: 'Rejected',
    approveModalTitle: (name) => `Approve ${name}`,
    approveModalHelper: 'Select the role this user will have',
    roleLabel: 'Role',
    selectRole: 'Select role...',
    approveConfirm: 'Approve and create user',
    creating: 'Creating...',
    cancel: 'Cancel',
    userCreated: 'User created',
    shareData: 'Share these credentials with the user',
    userLabel: 'Username',
    codeLabel: 'Code',
    copyData: 'Copy credentials',
    copiedData: 'Credentials copied',
    close: 'Close',
  },
};

export default function RegistrationsPage() {
  const lang = useAdminLang();
  const { registrations, isLoading: loadingRegs, mutate: mutateRegs } = useAdminRegistrations();
  const { roles } = useAdminRoles();
  const loading = loadingRegs;
  const [approvalModal, setApprovalModal] = useState<{ reg: Registration; roleId: string } | null>(null);
  const [generatedCode, setGeneratedCode] = useState<{ userId: string; code: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const t = labels[lang];

  const handleApprove = async () => {
    if (!approvalModal) return;
    setProcessing(true);

    try {
      const res = await fetch('/api/register', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: approvalModal.reg.id,
          action: 'approve',
          roleId: approvalModal.roleId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGeneratedCode({ userId: data.userId, code: data.code });
        mutateRegs(
          (prev) => prev?.map(r => r.id === approvalModal.reg.id ? { ...r, status: 'approved' } : r),
          false,
        );
      }
    } catch {
      alert(t.errorApprove);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm(t.confirmReject)) return;

    try {
      const res = await fetch('/api/register', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'reject' }),
      });

      if (res.ok) {
        mutateRegs(
          (prev) => prev?.map(r => r.id === id ? { ...r, status: 'rejected' } : r),
          false,
        );
      }
    } catch {
      alert(t.errorReject);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;

    try {
      const res = await fetch(`/api/register?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutateRegs((prev) => prev?.filter(r => r.id !== id), false);
      }
    } catch {
      alert(t.errorDelete);
    }
  };

  const pending = registrations.filter(r => r.status === 'pending');
  const processed = registrations.filter(r => r.status !== 'pending');

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-64 bg-[#1A1A1A] rounded-lg" />
          <div className="h-6 w-28 bg-[#1A1A1A]/50 rounded-full" />
        </div>
        <div className="space-y-3 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 bg-[#1A1A1A]/40 rounded" />
                  <div className="h-3 w-48 bg-[#1A1A1A]/30 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-6 w-24 bg-[#1A1A1A]/50 rounded-lg mb-3" />
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="h-14 bg-[#111111] border border-[#1E1E1E] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const localeCode = lang === 'ru' ? 'ru-RU' : 'es-ES';

  return (
    <AdminStagger>
      {/* Header */}
      <AdminStaggerItem>
        <AdminPageHeader
          title={t.title}
          subtitle={t.subtitle}
          counter={
            pending.length > 0 ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
                {pending.length} {pending.length !== 1 ? t.pendingLabelMany : t.pendingLabelOne}
              </span>
            ) : undefined
          }
        />
      </AdminStaggerItem>

      {/* Pending */}
      {pending.length === 0 ? (
        <AdminStaggerItem>
          <div className="mb-8">
            <AdminEmpty title={t.noPending} />
          </div>
        </AdminStaggerItem>
      ) : (
        <AdminStaggerItem>
        <div className="space-y-3 mb-8">
          {pending.map(reg => (
            <AdminCard key={reg.id} accent="amber" padding="md" hover>
              <div
              className="-m-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-sm">{reg.name}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#1A1A1A]/40 text-[#A0A0A0] uppercase">
                        {reg.lang === 'ru' ? 'RU' : 'ES'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#666666] text-xs">
                      <span>{reg.email || t.noEmail}</span>
                      <span className="w-1 h-1 rounded-full bg-[#1E1E1E] inline-block" />
                      <span>{new Date(reg.createdAt).toLocaleDateString(localeCode, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {reg.message && (
                      <div className="mt-2.5 p-3 rounded-lg bg-[#1A1A1A]/20 border border-[#1A1A1A]/30">
                        <p className="text-[#A0A0A0] text-xs italic leading-relaxed">&quot;{reg.message}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setApprovalModal({ reg, roleId: roles.find(r => !r.isAdmin)?.id || '' })}
                    className={btnPrimary}
                  >
                    {t.approve}
                  </button>
                  <button
                    onClick={() => handleReject(reg.id)}
                    className={btnSecondary}
                  >
                    {t.reject}
                  </button>
                </div>
              </div>
              </div>
            </AdminCard>
          ))}
        </div>
        </AdminStaggerItem>
      )}

      {/* Processed history */}
      {processed.length > 0 && (
        <AdminStaggerItem>
        <div>
          <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.12em] mb-4">{t.history}</h2>
          <div
            className="rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(18,22,38,0.6), rgba(8,11,22,0.6))',
              backdropFilter: 'blur(10px)',
            }}
          >
            {processed.map((reg, idx) => (
              <div
                key={reg.id}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-[#1A1A1A]/20 transition-all duration-200 ${
                  idx < processed.length - 1 ? 'border-b border-[#1A1A1A]/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center text-[#666666] text-xs font-bold">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[#A0A0A0] text-sm font-medium">{reg.name}</span>
                    <div className="text-[#666666] text-xs mt-0.5">
                      {reg.email || t.noEmail}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    reg.status === 'approved'
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                      : 'bg-[#C44545]/10 text-[#C44545] border border-[#C44545]/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      reg.status === 'approved' ? 'bg-[#10B981]' : 'bg-[#C44545]'
                    }`} />
                    {reg.status === 'approved' ? t.approved : t.rejected}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#666666] text-xs">
                    {new Date(reg.createdAt).toLocaleDateString(localeCode, { day: '2-digit', month: 'short' })}
                  </span>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="text-[#666666] text-xs hover:text-[#C44545] transition-colors duration-200 p-1.5 rounded-lg hover:bg-[#C44545]/10"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </AdminStaggerItem>
      )}

      {/* Approval Modal */}
      {approvalModal && !generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setApprovalModal(null)}>
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/40" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                {approvalModal.reg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.approveModalTitle(approvalModal.reg.name)}</h3>
                <p className="text-[#666666] text-xs">{t.approveModalHelper}</p>
              </div>
            </div>

            {/* Role selector */}
            <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">{t.roleLabel}</label>
            <select
              value={approvalModal.roleId}
              onChange={e => setApprovalModal({ ...approvalModal, roleId: e.target.value })}
              className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E]/50 rounded-lg px-4 py-2.5 text-white text-sm mb-5 outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
            >
              <option value="">{t.selectRole}</option>
              {roles.map(r => {
                const rn = lang === 'ru' ? (r.nameRu || r.name) : r.name;
                return (
                  <option key={r.id} value={r.id}>{rn} {r.isAdmin ? '(Admin)' : ''}</option>
                );
              })}
            </select>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={!approvalModal.roleId || processing}
                className="flex-1 bg-[#98283A] text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#98283A]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm"
              >
                {processing ? t.creating : t.approveConfirm}
              </button>
              <button
                onClick={() => setApprovalModal(null)}
                className="bg-[#1A1A1A] text-[#A0A0A0] font-medium py-2.5 px-4 rounded-lg hover:bg-[#1E1E1E] hover:text-white transition-all duration-200 text-sm"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Generated Modal */}
      {generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/40 text-center">
            {/* Success icon */}
            <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4 border border-[#10B981]/20">
              <svg className="w-7 h-7 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t.userCreated}</h3>
            <p className="text-[#666666] text-xs mb-5">{t.shareData}</p>

            {/* Credentials card */}
            <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-5 mb-5 text-left">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#10B981]/10">
                <span className="text-[#666666] text-xs font-medium uppercase tracking-wider">{t.userLabel}</span>
                <span className="text-white font-mono text-sm font-semibold">{generatedCode.userId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#666666] text-xs font-medium uppercase tracking-wider">{t.codeLabel}</span>
                <span className="text-[#10B981] font-mono text-xl font-bold tracking-widest">{generatedCode.code}</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${t.userLabel}: ${generatedCode.userId}\n${t.codeLabel}: ${generatedCode.code}`);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className={`w-full font-medium py-2.5 rounded-lg transition-all duration-200 text-sm mb-3 ${
                copiedCode
                  ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20'
                  : 'bg-[#1A1A1A]/50 text-[#A0A0A0] border border-[#1E1E1E]/30 hover:bg-[#1E1E1E]/50 hover:text-white'
              }`}
            >
              {copiedCode ? t.copiedData : t.copyData}
            </button>

            {/* Close button */}
            <button
              onClick={() => { setGeneratedCode(null); setApprovalModal(null); setCopiedCode(false); }}
              className="w-full bg-[#98283A] text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#98283A]/20 transition-all duration-200 text-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </AdminStagger>
  );
}
