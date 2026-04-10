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
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-neo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neo-text">Solicitudes de Registro</h1>
        {pending.length > 0 && (
          <span className="bg-neo-warning/20 text-neo-warning text-xs font-semibold px-3 py-1 rounded-full">
            {pending.length} pendiente{pending.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Pending */}
      {pending.length === 0 ? (
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-8 text-center">
          <p className="text-neo-text-muted text-sm">No hay solicitudes pendientes</p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {pending.map(reg => (
            <div key={reg.id} className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-full bg-neo-primary/20 flex items-center justify-center text-neo-primary text-sm font-bold">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-neo-text font-semibold text-sm">{reg.name}</p>
                    <p className="text-neo-text-muted text-xs">
                      {reg.email || 'Sin email'} — {reg.lang === 'ru' ? 'Ruso' : 'Espanol'} — {new Date(reg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {reg.message && (
                  <p className="text-neo-text-secondary text-xs mt-2 ml-12 italic">&quot;{reg.message}&quot;</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setApprovalModal({ reg, roleId: roles.find(r => !r.isAdmin)?.id || '' })}
                  className="bg-neo-primary text-neo-dark text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-neo-primary-dark transition-all"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleReject(reg.id)}
                  className="bg-neo-dark-3 text-neo-text-secondary text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-neo-dark-4 transition-all"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Processed */}
      {processed.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-neo-text-secondary mb-3">Historial</h2>
          <div className="space-y-2">
            {processed.map(reg => (
              <div key={reg.id} className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg p-3 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-neo-dark-4 flex items-center justify-center text-neo-text-muted text-xs font-bold">
                    {reg.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-neo-text-secondary text-sm">{reg.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    reg.status === 'approved'
                      ? 'bg-neo-success/20 text-neo-success'
                      : 'bg-neo-danger/20 text-neo-danger'
                  }`}>
                    {reg.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(reg.id)}
                  className="text-neo-text-muted text-xs hover:text-neo-danger transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Approval Modal */}
      {approvalModal && !generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setApprovalModal(null)}>
          <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-2xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-neo-text mb-1">Aprobar a {approvalModal.reg.name}</h3>
            <p className="text-neo-text-muted text-xs mb-4">Selecciona el rol que tendra en la plataforma</p>

            <label className="block text-neo-text-secondary text-xs font-medium mb-1.5">Rol</label>
            <select
              value={approvalModal.roleId}
              onChange={e => setApprovalModal({ ...approvalModal, roleId: e.target.value })}
              className="w-full bg-neo-dark-3 border border-neo-dark-4 rounded-lg px-3 py-2.5 text-neo-text text-sm mb-4 outline-none focus:border-neo-primary"
            >
              <option value="">Seleccionar rol...</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name} {r.isAdmin ? '(Admin)' : ''}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={!approvalModal.roleId || processing}
                className="flex-1 bg-neo-primary text-neo-dark font-semibold py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all disabled:opacity-50 text-sm"
              >
                {processing ? 'Creando...' : 'Aprobar y crear usuario'}
              </button>
              <button
                onClick={() => setApprovalModal(null)}
                className="bg-neo-dark-3 text-neo-text-secondary font-medium py-2.5 px-4 rounded-lg hover:bg-neo-dark-4 transition-all text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Generated Modal */}
      {generatedCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-2xl p-6 max-w-sm w-full mx-4 text-center">
            <div className="w-12 h-12 rounded-full bg-neo-success/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-neo-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neo-text mb-1">Usuario creado</h3>
            <p className="text-neo-text-muted text-xs mb-4">Comparte estos datos con la persona</p>

            <div className="bg-neo-dark-3 rounded-lg p-4 mb-4 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neo-text-muted text-xs">Usuario</span>
                <span className="text-neo-text font-mono text-sm">{generatedCode.userId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neo-text-muted text-xs">Codigo</span>
                <span className="text-neo-primary font-mono text-lg font-bold tracking-wider">{generatedCode.code}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`Usuario: ${generatedCode.userId}\nCodigo: ${generatedCode.code}`);
              }}
              className="w-full bg-neo-dark-3 text-neo-text-secondary font-medium py-2 rounded-lg hover:bg-neo-dark-4 transition-all text-sm mb-3"
            >
              Copiar datos
            </button>

            <button
              onClick={() => { setGeneratedCode(null); setApprovalModal(null); }}
              className="w-full bg-neo-primary text-neo-dark font-semibold py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
