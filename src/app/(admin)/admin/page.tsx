'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalRoles: number;
  totalDocuments: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/roles'),
        ]);

        const users = usersRes.ok ? await usersRes.json() : [];
        const roles = rolesRes.ok ? await rolesRes.json() : [];

        setStats({
          totalUsers: Array.isArray(users) ? users.length : 0,
          totalRoles: Array.isArray(roles) ? roles.length : 0,
          totalDocuments: 28,
        });
      } catch {
        setStats({ totalUsers: 0, totalRoles: 0, totalDocuments: 28 });
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  async function handleSeed() {
    setSeedStatus('Ejecutando seed...');
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedStatus(data.message || 'Seed completado');
      // Reload stats after seed
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch {
      setSeedStatus('Error al ejecutar seed');
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="mb-8">
          <div className="h-8 w-64 bg-[#1A1A1A] rounded-lg mb-2" />
          <div className="h-4 w-96 bg-[#1A1A1A]/60 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
              <div className="h-10 w-16 bg-[#1A1A1A] rounded-lg mb-3 mx-auto" />
              <div className="h-4 w-20 bg-[#1A1A1A]/50 rounded mx-auto" />
            </div>
          ))}
        </div>
        <div className="h-5 w-40 bg-[#1A1A1A] rounded-lg mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[#111111] border border-[#1E1E1E] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: 'Usuarios',
      value: stats?.totalUsers ?? 0,
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      label: 'Roles',
      value: stats?.totalRoles ?? 0,
      href: '/admin/roles',
      icon: (
        <svg className="w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      label: 'Documentos',
      value: stats?.totalDocuments ?? 0,
      href: '/admin/settings',
      icon: (
        <svg className="w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      label: 'Agregar Usuario',
      href: '/admin/users',
      description: 'Crear nuevo miembro del equipo',
      primary: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      ),
    },
    {
      label: 'Crear Rol',
      href: '/admin/roles',
      description: 'Definir permisos por seccion',
      primary: false,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      label: 'Ver Progreso',
      href: '/admin/progress',
      description: 'Avance de lectura del equipo',
      primary: false,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Panel de Administracion</h1>
        <p className="text-[#666666] text-sm mt-1">
          Gestion de usuarios, roles y permisos de NEOMAAA Hub
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6 hover:border-[#2A2A2A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#1E1E1E] transition-all duration-200">
                {kpi.icon}
              </div>
              <svg className="w-4 h-4 text-[#666666] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="text-4xl font-extrabold text-white">
              {kpi.value}
            </div>
            <div className="text-[#666666] text-xs font-semibold uppercase tracking-wider mt-2">
              {kpi.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Acciones Rapidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`rounded-xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group ${
                action.primary
                  ? 'bg-[#98283A]/10 border-[#98283A]/20 hover:border-[#98283A]/40 hover:shadow-[#98283A]/5'
                  : 'bg-[#111111] border-[#1E1E1E] hover:border-[#2A2A2A] hover:shadow-black/20'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                action.primary
                  ? 'bg-[#98283A]/15 text-[#98283A]'
                  : 'bg-[#1A1A1A] text-[#666666] group-hover:text-[#A0A0A0]'
              } transition-all duration-200`}>
                {action.icon}
              </div>
              <div className={`text-sm font-semibold mb-1 ${
                action.primary ? 'text-[#98283A]' : 'text-white'
              } transition-colors duration-200`}>
                {action.label}
              </div>
              <div className="text-[#666666] text-xs">
                {action.description}
              </div>
            </Link>
          ))}
        </div>

        {/* Seed button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSeed}
            className="bg-[#111111] border border-[#1E1E1E] text-[#A0A0A0] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#161616] hover:text-white hover:border-[#2A2A2A] transition-all duration-200"
          >
            Seed Data
          </button>
          {seedStatus && (
            <span className="text-sm text-[#A0A0A0] bg-[#1A1A1A] border border-[#1E1E1E] rounded-lg px-4 py-2 font-medium animate-pulse">
              {seedStatus}
            </span>
          )}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h2>
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[#666666] text-sm">
            El registro de actividad se mostrara aqui una vez que los usuarios comiencen a interactuar con la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
