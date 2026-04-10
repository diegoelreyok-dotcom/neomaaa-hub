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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-neo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    {
      label: 'Usuarios',
      value: stats?.totalUsers ?? 0,
      href: '/admin/users',
      color: 'text-neo-primary',
    },
    {
      label: 'Roles',
      value: stats?.totalRoles ?? 0,
      href: '/admin/roles',
      color: 'text-neo-info',
    },
    {
      label: 'Documentos',
      value: stats?.totalDocuments ?? 0,
      href: '#',
      color: 'text-neo-accent',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neo-text">Panel de Administracion</h1>
        <p className="text-neo-text-muted text-sm mt-1">
          Gestion de usuarios, roles y permisos de NEOMAAA Hub
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-neo-dark-2 border border-neo-dark-3 border-t-2 border-t-neo-primary rounded-lg p-6 text-center hover:border-neo-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className={`text-4xl font-extrabold ${kpi.color}`}>
              {kpi.value}
            </div>
            <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mt-2">
              {kpi.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-neo-text mb-4">Acciones Rapidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/users"
            className="bg-neo-primary text-neo-dark font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-primary-dark transition-all duration-200"
          >
            Agregar Usuario
          </Link>
          <Link
            href="/admin/roles"
            className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
          >
            Crear Rol
          </Link>
          <button
            onClick={handleSeed}
            className="bg-neo-dark-3 text-neo-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-dark-4 transition-all duration-200"
          >
            Seed Data
          </button>
        </div>
        {seedStatus && (
          <div className="mt-3 text-sm text-neo-primary bg-neo-dark-2 border border-neo-dark-3 rounded-lg px-4 py-2 inline-block">
            {seedStatus}
          </div>
        )}
      </div>

      {/* Recent activity placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-neo-text mb-4">Actividad Reciente</h2>
        <div className="bg-neo-dark-2 border border-neo-dark-3 rounded-lg p-8 text-center">
          <p className="text-neo-text-muted text-sm">
            El registro de actividad se mostrara aqui una vez que los usuarios comiencen a interactuar con la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
