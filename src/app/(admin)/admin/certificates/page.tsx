'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import type { Certificate } from '@/lib/quiz-types';
import { useAdminLang } from '@/components/admin/AdminContext';

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
  const [page, setPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/certificates?all=1');
        if (!res.ok) {
          // Fallback: try without query param
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
    if (!confirm(lang === 'ru' ? 'Отозвать сертификат?' : '¿Revocar certificado?')) return;
    setRevoking(id);
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('failed');
      setCerts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Error');
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
  }[lang];

  const locale = lang === 'ru' ? 'ru-RU' : 'es-ES';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-[#666666] text-sm mt-1">{t.subtitle}</p>
      </div>

      {/* Stats + filters */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5 mb-6">
        <div className="flex items-center gap-6 mb-4">
          <div>
            <div className="text-3xl font-extrabold text-white">{filtered.length}</div>
            <div className="text-[11px] text-[#666666] uppercase tracking-wider">{t.total}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder={t.filterUser}
            value={filters.user}
            onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))}
            className="px-3 py-2 bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#98283A]/60"
          />
          <input
            type="text"
            placeholder={t.filterDoc}
            value={filters.doc}
            onChange={(e) => setFilters((f) => ({ ...f, doc: e.target.value }))}
            className="px-3 py-2 bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#98283A]/60"
          />
          <input
            type="date"
            placeholder={t.from}
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
            className="px-3 py-2 bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#98283A]/60"
          />
          <input
            type="date"
            placeholder={t.to}
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
            className="px-3 py-2 bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#98283A]/60"
          />
          <button
            onClick={() => setFilters({ user: '', doc: '', from: '', to: '' })}
            className="px-3 py-2 bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg text-sm text-[#A0A0A0] hover:text-white hover:border-[#2A2A2A]"
          >
            {t.clear}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-[#666666]">{t.loading}</div>
        ) : error ? (
          <div className="p-10 text-center text-[#C44545]">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-[#666666]">{t.empty}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0A0A0A] border-b border-[#1E1E1E]">
                <tr className="text-left">
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-[#666666] font-semibold">{t.user}</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-[#666666] font-semibold">{t.doc}</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-[#666666] font-semibold">{t.score}</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-[#666666] font-semibold">{t.issued}</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-[#666666] font-semibold text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice((page - 1) * pageSize, page * pageSize).map((cert) => (
                  <tr key={cert.id} className="border-b border-[#1E1E1E] last:border-0 hover:bg-[#161616]">
                    <td className="px-4 py-3 text-white">
                      <div className="font-medium">{cert.userName}</div>
                      <div className="text-[11px] text-[#666666]">{cert.userId}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white">{cert.docTitle}</div>
                      <div className="text-[11px] text-[#666666]">{cert.docPath}</div>
                    </td>
                    <td className="px-4 py-3 text-white font-semibold">
                      {cert.score}/{cert.totalQuestions}
                    </td>
                    <td className="px-4 py-3 text-[#A0A0A0]">
                      {new Date(cert.issuedAt).toLocaleDateString(locale, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/certificates/${cert.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded-md transition-colors"
                        >
                          {t.view}
                        </Link>
                        <button
                          onClick={() => handleRevoke(cert.id)}
                          disabled={revoking === cert.id}
                          className="px-3 py-1.5 text-xs font-medium text-[#C44545] hover:bg-[#C44545]/10 rounded-md transition-colors disabled:opacity-50"
                        >
                          {t.revoke}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > pageSize && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#1E1E1E] bg-[#0A0A0A]">
                <div className="text-xs text-[#666666]">
                  {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} / {filtered.length}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  <span className="text-xs text-[#A0A0A0] px-2">
                    {page} / {Math.max(1, Math.ceil(filtered.length / pageSize))}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(Math.ceil(filtered.length / pageSize), p + 1))}
                    disabled={page >= Math.ceil(filtered.length / pageSize)}
                    className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
