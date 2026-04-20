'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import type { Certificate } from '@/lib/quiz-types';
import { useAdminLang } from '@/components/admin/AdminContext';
import { adminConfirm, adminAlert } from '@/components/admin/adminPrompts';
import {
  AdminPageHeader,
  AdminSkeleton,
  btnGhost,
  btnDanger,
} from '@/components/admin/AdminUI';
import { AdminCard } from '@/components/admin/AdminCard';
import AdminStagger, { AdminStaggerItem } from '@/components/admin/AdminStagger';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/components/admin/AdminTable';

interface Filters {
  user: string;
  doc: string;
  from: string;
  to: string;
}

export default function AdminCertificatesPage() {
  const lang = useAdminLang();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ user: '', doc: '', from: '', to: '' });
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/certificates?all=1');
        if (!res.ok) {
          const res2 = await fetch('/api/certificates');
          if (!res2.ok) throw new Error('failed');
          const data = await res2.json();
          if (!cancelled) setCerts(Array.isArray(data) ? data : []);
        } else {
          const data = await res.json();
          if (!cancelled) setCerts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setError('No se pudieron cargar los certificados');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return certs.filter((c) => {
      if (filters.user && !c.userName.toLowerCase().includes(filters.user.toLowerCase()) && !c.userId.toLowerCase().includes(filters.user.toLowerCase())) {
        return false;
      }
      if (filters.doc && !c.docTitle.toLowerCase().includes(filters.doc.toLowerCase()) && !c.docPath.toLowerCase().includes(filters.doc.toLowerCase())) {
        return false;
      }
      if (filters.from && new Date(c.issuedAt) < new Date(filters.from)) return false;
      if (filters.to && new Date(c.issuedAt) > new Date(filters.to + 'T23:59:59')) return false;
      return true;
    });
  }, [certs, filters]);

  async function handleRevoke(id: string) {
    if (!adminConfirm('revoke_certificate', lang)) return;
    setRevoking(id);
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('failed');
      setCerts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      adminAlert('generic_error', lang);
    } finally {
      setRevoking(null);
    }
  }

  const t = {
    es: {
      title: 'Certificados Emitidos',
      subtitle: 'Gestion de todos los certificados del sistema',
      total: 'Total',
      filterUser: 'Usuario',
      filterDoc: 'Documento',
      from: 'Desde',
      to: 'Hasta',
      clear: 'Limpiar',
      user: 'Usuario',
      doc: 'Documento',
      score: 'Puntaje',
      issued: 'Emitido',
      actions: 'Acciones',
      view: 'Ver',
      revoke: 'Revocar',
      loading: 'Cargando...',
      empty: 'No hay certificados emitidos.',
    },
    ru: {
      title: 'Выданные сертификаты',
      subtitle: 'Управление всеми сертификатами системы',
      total: 'Всего',
      filterUser: 'Пользователь',
      filterDoc: 'Документ',
      from: 'С',
      to: 'По',
      clear: 'Сбросить',
      user: 'Пользователь',
      doc: 'Документ',
      score: 'Результат',
      issued: 'Выдан',
      actions: 'Действия',
      view: 'Открыть',
      revoke: 'Отозвать',
      loading: 'Загрузка...',
      empty: 'Нет выданных сертификатов.',
    },
    en: {
      title: 'Issued Certificates',
      subtitle: 'Manage all system certificates',
      total: 'Total',
      filterUser: 'User',
      filterDoc: 'Document',
      from: 'From',
      to: 'To',
      clear: 'Clear',
      user: 'User',
      doc: 'Document',
      score: 'Score',
      issued: 'Issued',
      actions: 'Actions',
      view: 'View',
      revoke: 'Revoke',
      loading: 'Loading...',
      empty: 'No certificates issued.',
    },
  }[lang];

  const locale = lang === 'ru' ? 'ru-RU' : 'es-ES';

  const inputCls =
    'px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#98283A]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(152,40,58,0.15)] transition-all duration-200';

  const columns: AdminTableColumn<Certificate>[] = [
    {
      key: 'user',
      header: t.user,
      render: (cert) => (
        <div>
          <div className="text-white text-sm font-medium">{cert.userName}</div>
          <div className="text-[#6B7280] text-xs">{cert.userId}</div>
        </div>
      ),
    },
    {
      key: 'doc',
      header: t.doc,
      render: (cert) => (
        <div>
          <div className="text-white text-sm">{cert.docTitle}</div>
          <div className="text-[#6B7280] text-xs">{cert.docPath}</div>
        </div>
      ),
    },
    {
      key: 'score',
      header: t.score,
      render: (cert) => (
        <span className="text-[#C94A5C] font-bold text-sm tabular-nums">
          {cert.score}/{cert.totalQuestions}
        </span>
      ),
    },
    {
      key: 'issued',
      header: t.issued,
      render: (cert) => (
        <span className="text-[#94A3B8] text-sm tabular-nums">
          {new Date(cert.issuedAt).toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t.actions,
      align: 'right',
      render: (cert) => (
        <div className="flex items-center justify-end gap-1">
          <Link href={`/certificates/${cert.id}`} className={btnGhost}>
            {t.view}
          </Link>
          <button
            onClick={() => handleRevoke(cert.id)}
            disabled={revoking === cert.id}
            className={`${btnDanger} disabled:opacity-50`}
          >
            {t.revoke}
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
          subtitle={t.subtitle}
          counter={`${filtered.length} ${t.total}`}
        />
      </AdminStaggerItem>

      {/* Filters */}
      <AdminStaggerItem>
        <div className="mb-6">
          <AdminCard padding="md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder={t.filterUser}
                value={filters.user}
                onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))}
                className={inputCls}
              />
              <input
                type="text"
                placeholder={t.filterDoc}
                value={filters.doc}
                onChange={(e) => setFilters((f) => ({ ...f, doc: e.target.value }))}
                className={inputCls}
              />
              <input
                type="date"
                value={filters.from}
                onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
                className={inputCls}
              />
              <input
                type="date"
                value={filters.to}
                onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
                className={inputCls}
              />
              <button
                onClick={() => setFilters({ user: '', doc: '', from: '', to: '' })}
                className="px-3 py-2 text-sm text-[#94A3B8] hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                {t.clear}
              </button>
            </div>
          </AdminCard>
        </div>
      </AdminStaggerItem>

      {/* Table */}
      <AdminStaggerItem>
        {loading ? (
          <AdminSkeleton className="h-96" />
        ) : error ? (
          <AdminCard padding="lg">
            <p className="text-[#C94A5C] text-center text-sm py-6">{error}</p>
          </AdminCard>
        ) : (
          <AdminTable
            columns={columns}
            data={filtered}
            rowKey={(c) => c.id}
            loading={false}
            pageSize={25}
            emptyTitle={t.empty}
          />
        )}
      </AdminStaggerItem>
    </AdminStagger>
  );
}
