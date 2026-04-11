'use client';

import { useState, useEffect } from 'react';

interface Registration {
  id: string;
  name: string;
  email: string;
  lang: 'es' | 'ru';
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Role {
  id: string;
  name: string;
  nameRu: string;
  isAdmin: boolean;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvalModal, setApprovalModal] = useState<{ reg: Registration; roleId: string } | null>(null);
  const [generatedCode, setGeneratedCode] = useState<{ userId: string; code: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/register').then(r => r.json()),
      fetch('/api/roles').then(r => r.json()),
    ]).then(([regs, rls]) => {
      setRegistrations(Array.isArray(regs) ? regs : []);
      setRoles(Array.isArray(rls) ? rls : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
        setRegistrations(prev =>
          prev.map(r => r.id === approvalModal.reg.id ? { ...r, status: 'approved' } : r)
        );
      }
    } catch {
      alert('Error al aprobar');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Rechazar esta solicitud?')) return;

    try {
      const res = await fetch('/api/register', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'reject' }),
      });

      if (res.ok) {
        setRegistrations(prev =>
          prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r)
        );
      }
    } catch {
      alert('Error al rechazar');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar esta solicitud permanentemente?')) return;

    try {
      const res = await fetch(`/api/register?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRegistrations(prev => prev.filter(r => r.id !== id));
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const pending = registrations.filter(r => r.status === 'pending');
  const processed = registrations.filter(r => r.status !== 'pending');

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-64 bg-neo-dark-3 rounded-lg" />
          <div className="h-6 w-28 bg-neo-dark-3/50 rounded-full" />
        </div>
        <div className="space-y-3 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-neo-dark-3/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 bg-neo-dark-3/40 rounded" />
                  <div className="h-3 w-48 bg-neo-dark-3/30 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-6 w-24 bg-neo-dark-3/50 rounded-lg mb-3" />
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="h-14 bg-neo-dark-2 border border-neo-dark-3/60 rounded-lg" />
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
          <h1 className="text-2xl font-bold text-neo-text">Solicitudes de Registro</h1>
          <p className="text-neo-text-muted text-sm mt-1">
            Gestiona las solicitudes de acceso a la plataforma
          </p>
        </div>
        {pending.length > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            {pending.length} pendiente{pending.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Pending */}
      {pending.length === 0 ? (
        <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl p-12 text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-neo-dark-3/50 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-neo-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-neo-text-muted text-sm">No hay solicitudes pendientes</p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {pending.map(reg => (
            <div
              key={reg.id}
              className="bg-neo-dark-2 border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/30 transition-all duration-200 shadow-[0_0_12px_rgba(245,158,11,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-neo-text font-semibold text-sm">{reg.name}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-neo-dark-3/40 text-neo-text-secondary uppercase">
                        {reg.lang === 'ru' ? 'RU' : 'ES'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neo-text-muted text-xs">
                      <span>{reg.email || 'Sin email'}</span>
                      <span className="w-1 h-1 rounded-full bg-neo-dark-4 inline-block" />
                      <span>{new Date(reg.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {reg.message && (
                      <div className="mt-2.5 p-3 rounded-lg bg-neo-dark-3/20 border border-neo-dark-3/30">
                        <p className="text-neo-text-secondary text-xs italic leading-relaxed">&quot;{reg.message}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setApprovalModal({ reg, roleId: roles.find(r => !r.isAdmin)?.id || '' })}
                    className="bg-neo-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-neo-primary/20 transition-all duration-200"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(reg.id)}
                    className="bg-neo-dark-3/50 text-neo-text-secondary text-xs font-semibold px-4 py-2 rounded-lg border border-neo-dark-4/30 hover:bg-neo-dark-4/50 hover:text-neo-text transition-all duration-200"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Processed history */}
      {processed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neo-text mb-3">Historial</h2>
          <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-xl overflow-hidden">
            {processed.map((reg, idx) => (
              <div
                key={reg.id}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-neo-dark-3/20 transition-all duration-200 ${
                  idx < processed.length - 1 ? 'border-b border-neo-dark-3/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neo-dark-3/50 flex items-center justify-center text-neo-text-muted text-xs font-bold">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-neo-text-secondary text-sm font-medium">{reg.name}</span>
                    <div className="text-neo-text-muted text-xs mt-0.5">
                      {reg.email || 'Sin email'}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    reg.status === 'approved'
                      ? 'bg-neo-success/10 text-neo-success border border-neo-success/20'
                      : 'bg-neo-danger/10 text-neo-danger border border-neo-danger/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      reg.status === 'approved' ? 'bg-neo-success' : 'bg-neo-danger'
                    }`} />
                    {reg.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neo-text-muted text-xs">
                    {new Date(reg.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </span>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="text-neo-text-muted text-xs hover:text-neo-danger transition-colors duration-200 p-1.5 rounded-lg hover:bg-neo-danger/10"
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
      )}

      {/* Approval Modal */}
      {approvalModal && !generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setApprovalModal(null)}>
          <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/40" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neo-primary to-neo-primary-light flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">
                {approvalModal.reg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neo-text">Aprobar a {approvalModal.reg.name}</h3>
                <p className="text-neo-text-muted text-xs">Selecciona el rol que tendra en la plataforma</p>
              </div>
            </div>

            {/* Role selector */}
            <label className="block text-xs uppercase tracking-wide text-neo-text-muted font-medium mb-2">Rol</label>
            <select
              value={approvalModal.roleId}
              onChange={e => setApprovalModal({ ...approvalModal, roleId: e.target.value })}
              className="w-full bg-neo-dark-3/50 border border-neo-dark-4/50 rounded-lg px-4 py-2.5 text-neo-text text-sm mb-5 outline-none focus:border-neo-primary/50 focus:ring-2 focus:ring-neo-primary/10 transition-all duration-200"
            >
              <option value="">Seleccionar rol...</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name} {r.isAdmin ? '(Admin)' : ''}</option>
              ))}
            </select>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={!approvalModal.roleId || processing}
                className="flex-1 bg-neo-primary text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-neo-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm"
              >
                {processing ? 'Creando...' : 'Aprobar y crear usuario'}
              </button>
              <button
                onClick={() => setApprovalModal(null)}
                className="bg-neo-dark-3 text-neo-text-secondary font-medium py-2.5 px-4 rounded-lg hover:bg-neo-dark-4 hover:text-neo-text transition-all duration-200 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Generated Modal */}
      {generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neo-dark-2 border border-neo-dark-3/60 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/40 text-center">
            {/* Success icon */}
            <div className="w-14 h-14 rounded-full bg-neo-success/10 flex items-center justify-center mx-auto mb-4 border border-neo-success/20">
              <svg className="w-7 h-7 text-neo-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neo-text mb-1">Usuario creado</h3>
            <p className="text-neo-text-muted text-xs mb-5">Comparte estos datos con la persona</p>

            {/* Credentials card */}
            <div className="bg-neo-success/5 border border-neo-success/20 rounded-xl p-5 mb-5 text-left">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-neo-success/10">
                <span className="text-neo-text-muted text-xs font-medium uppercase tracking-wider">Usuario</span>
                <span className="text-neo-text font-mono text-sm font-semibold">{generatedCode.userId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neo-text-muted text-xs font-medium uppercase tracking-wider">Codigo</span>
                <span className="text-neo-success font-mono text-xl font-bold tracking-widest">{generatedCode.code}</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`Usuario: ${generatedCode.userId}\nCodigo: ${generatedCode.code}`);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className={`w-full font-medium py-2.5 rounded-lg transition-all duration-200 text-sm mb-3 ${
                copiedCode
                  ? 'bg-neo-success/15 text-neo-success border border-neo-success/20'
                  : 'bg-neo-dark-3/50 text-neo-text-secondary border border-neo-dark-4/30 hover:bg-neo-dark-4/50 hover:text-neo-text'
              }`}
            >
              {copiedCode ? 'Datos copiados' : 'Copiar datos'}
            </button>

            {/* Close button */}
            <button
              onClick={() => { setGeneratedCode(null); setApprovalModal(null); setCopiedCode(false); }}
              className="w-full bg-neo-primary text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-neo-primary/20 transition-all duration-200 text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
