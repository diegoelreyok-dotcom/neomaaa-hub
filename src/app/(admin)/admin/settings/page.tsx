'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { SECTIONS } from '@/lib/sections';

/* ───────────────────────── Types ───────────────────────── */

interface RoleData {
  id: string;
  name: string;
  nameRu: string;
  sections: string[];
  isAdmin: boolean;
}

interface UserData {
  id: string;
  name: string;
  roleId: string;
  lang: 'es' | 'ru';
  isActive: boolean;
  lastLogin?: string;
}

interface BrokerInfo {
  nombre: string;
  entidad: string;
  licencia: string;
  dominio: string;
  helpCenter: string;
  telefono: string;
  plataforma: string;
  crm: string;
  kycProvider: string;
  chat: string;
  partnerTracking: string;
}

/* ───────────────────────── Constants ───────────────────────── */

const DEFAULT_BROKER: BrokerInfo = {
  nombre: 'NEOMAAA Markets',
  entidad: 'Neomaaa Ltd (IBC 15968)',
  licencia: 'L15968/N — AOFA',
  dominio: 'neomaaa.com',
  helpCenter: 'help.neomaaa.com',
  telefono: '+41 44 707 9633',
  plataforma: 'MetaTrader 5',
  crm: 'Skale CRM',
  kycProvider: 'Sumsub',
  chat: 'Intercom',
  partnerTracking: 'Cellxpert',
};

const LANG_FLAG: Record<string, string> = {
  es: '\uD83C\uDDEA\uD83C\uDDF8',
  ru: '\uD83C\uDDF7\uD83C\uDDFA',
};

const SECTION_NAV = [
  { id: 'broker', label: 'Broker' },
  { id: 'roles', label: 'Roles' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'idiomas', label: 'Idiomas' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'links', label: 'Links' },
];

const ADMIN_LINKS = [
  { href: '/admin/users', title: 'Usuarios', desc: 'Gestionar cuentas, roles y permisos de los usuarios del equipo.' },
  { href: '/admin/roles', title: 'Roles', desc: 'Configurar roles y las secciones que cada rol puede ver.' },
  { href: '/admin/registrations', title: 'Solicitudes', desc: 'Revisar y aprobar solicitudes de registro nuevas.' },
  { href: '/admin/progress', title: 'Progreso', desc: 'Ver el avance de lectura de cada usuario por seccion.' },
  { href: '/dashboard', title: 'Portal', desc: 'Ir al portal de contenido visible para los usuarios del equipo.' },
  { href: '/api/seed', title: 'Seed Data', desc: 'Re-ejecutar el seed para restaurar datos por defecto.', external: true },
];

/* ───────────────────────── Helpers ───────────────────────── */

function SectionCard({ id, title, subtitle, children }: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-neo-dark-2 border border-neo-dark-3 rounded-xl p-6 scroll-mt-24">
      <div className="mb-5">
        <h2 className="text-neo-text font-bold text-lg">{title}</h2>
        <p className="text-neo-text-muted text-sm mt-0.5">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function InfoField({ label, value, editable, onChange }: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
        {label}
      </div>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-neo-dark border border-neo-dark-3 text-neo-text-body rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neo-primary transition-all duration-200"
        />
      ) : (
        <div className="text-neo-text text-sm">{value}</div>
      )}
    </div>
  );
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        active ? 'bg-neo-success' : 'bg-neo-dark-4'
      }`}
    />
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

export default function SettingsPage() {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [broker, setBroker] = useState<BrokerInfo>(DEFAULT_BROKER);
  const [editingBroker, setEditingBroker] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [langToggles, setLangToggles] = useState<Record<string, boolean>>({ es: true, ru: true });

  /* ── Fetch data ── */
  const loadData = useCallback(async () => {
    try {
      const [rolesRes, usersRes] = await Promise.all([
        fetch('/api/roles'),
        fetch('/api/users'),
      ]);
      const rolesData = rolesRes.ok ? await rolesRes.json() : [];
      const usersData = usersRes.ok ? await usersRes.json() : [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Load broker info from localStorage
    const stored = localStorage.getItem('neomaaa-broker-info');
    if (stored) {
      try {
        setBroker(JSON.parse(stored));
      } catch { /* ignore */ }
    }
  }, [loadData]);

  /* ── Broker save ── */
  function saveBroker() {
    localStorage.setItem('neomaaa-broker-info', JSON.stringify(broker));
    setEditingBroker(false);
    setSavedMsg('Informacion guardada');
    setTimeout(() => setSavedMsg(null), 2500);
  }

  function cancelBrokerEdit() {
    const stored = localStorage.getItem('neomaaa-broker-info');
    if (stored) {
      try { setBroker(JSON.parse(stored)); } catch { setBroker(DEFAULT_BROKER); }
    } else {
      setBroker(DEFAULT_BROKER);
    }
    setEditingBroker(false);
  }

  /* ── Seed ── */
  async function handleSeed() {
    setSeedStatus('Ejecutando seed...');
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedStatus(data.message || 'Seed completado');
      await loadData();
      setTimeout(() => setSeedStatus(null), 3000);
    } catch {
      setSeedStatus('Error al ejecutar seed');
      setTimeout(() => setSeedStatus(null), 3000);
    }
  }

  /* ── Content section toggle ── */
  function toggleContentSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ── Nav scroll ── */
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  /* ── Derived data ── */
  function usersForRole(roleId: string) {
    return users.filter((u) => u.roleId === roleId);
  }

  const esContentCount = SECTIONS.reduce((acc, s) => acc + s.documents.length, 0);
  const ruContentCount = esContentCount; // mirror

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-neo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neo-text">Settings</h1>
        <p className="text-neo-text-muted text-sm mt-1">
          Centro de configuracion de NEOMAAA Hub — broker, equipo, contenido y plataforma.
        </p>
      </div>

      {/* ── Section Nav Pills ── */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-14 z-40 bg-neo-dark py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-neo-dark-3">
        {SECTION_NAV.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neo-dark-2 border border-neo-dark-3 text-neo-text-secondary hover:text-neo-primary hover:border-neo-primary transition-all duration-200"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Sections Stack ── */}
      <div className="space-y-6">

        {/* ═══════════════ 1. BROKER INFO ═══════════════ */}
        <SectionCard
          id="broker"
          title="Informacion General del Broker"
          subtitle="Datos corporativos, licencia y proveedores tecnologicos."
        >
          <div className="flex items-center justify-between mb-4">
            {savedMsg && (
              <span className="text-neo-primary text-xs font-medium bg-neo-primary/10 px-3 py-1 rounded-full">
                {savedMsg}
              </span>
            )}
            {!savedMsg && <span />}
            {editingBroker ? (
              <div className="flex gap-2">
                <button
                  onClick={cancelBrokerEdit}
                  className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-neo-dark-3 text-neo-text-secondary hover:bg-neo-dark-4 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveBroker}
                  className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-neo-primary text-neo-dark hover:bg-neo-primary-dark transition-all duration-200"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingBroker(true)}
                className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-neo-dark-3 text-neo-text-secondary hover:text-neo-primary hover:bg-neo-dark-4 transition-all duration-200"
              >
                Editar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {([
              ['Nombre del broker', 'nombre'],
              ['Entidad legal', 'entidad'],
              ['Licencia', 'licencia'],
              ['Dominio', 'dominio'],
              ['Help Center', 'helpCenter'],
              ['Telefono soporte', 'telefono'],
              ['Plataforma', 'plataforma'],
              ['CRM', 'crm'],
              ['KYC Provider', 'kycProvider'],
              ['Chat', 'chat'],
              ['Partner Tracking', 'partnerTracking'],
            ] as [string, keyof BrokerInfo][]).map(([label, key]) => (
              <InfoField
                key={key}
                label={label}
                value={broker[key]}
                editable={editingBroker}
                onChange={(v) => setBroker((prev) => ({ ...prev, [key]: v }))}
              />
            ))}
          </div>
        </SectionCard>

        {/* ═══════════════ 2. ROLES ═══════════════ */}
        <SectionCard
          id="roles"
          title="Roles — Resumen Visual"
          subtitle={`${roles.length} rol${roles.length !== 1 ? 'es' : ''} configurado${roles.length !== 1 ? 's' : ''}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span />
            <Link
              href="/admin/roles"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-neo-primary text-neo-dark hover:bg-neo-primary-dark transition-all duration-200"
            >
              Crear Rol
            </Link>
          </div>

          {roles.length === 0 ? (
            <p className="text-neo-text-muted text-sm text-center py-4">
              No hay roles configurados. Ejecuta el Seed primero.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {roles.map((role) => {
                const count = usersForRole(role.id).length;
                return (
                  <Link
                    key={role.id}
                    href={`/admin/roles/${role.id}`}
                    className="bg-neo-dark border border-neo-dark-3 rounded-lg p-4 hover:border-neo-primary transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-neo-text font-semibold text-sm group-hover:text-neo-primary transition-colors duration-200 truncate">
                        {role.name}
                      </h4>
                      {role.isAdmin && (
                        <span className="bg-neo-accent/15 text-neo-accent text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                          Admin
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neo-text-muted">
                      <span>{role.sections.length} seccion{role.sections.length !== 1 ? 'es' : ''}</span>
                      <span className="text-neo-dark-4">|</span>
                      <span>{count} usuario{count !== 1 ? 's' : ''}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* ═══════════════ 3. EQUIPO ═══════════════ */}
        <SectionCard
          id="equipo"
          title="Equipo — Overview"
          subtitle={`${users.length} miembro${users.length !== 1 ? 's' : ''} del equipo`}
        >
          <div className="flex items-center justify-between mb-4">
            <span />
            <Link
              href="/admin/users"
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-neo-primary text-neo-dark hover:bg-neo-primary-dark transition-all duration-200"
            >
              Agregar Usuario
            </Link>
          </div>

          {users.length === 0 ? (
            <p className="text-neo-text-muted text-sm text-center py-4">
              No hay usuarios. Ejecuta el Seed o agrega usuarios manualmente.
            </p>
          ) : (
            <div className="space-y-5">
              {roles.map((role) => {
                const roleUsers = usersForRole(role.id);
                if (roleUsers.length === 0) return null;
                return (
                  <div key={role.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-neo-text-secondary text-xs font-semibold uppercase tracking-wider">
                        {role.name}
                      </h4>
                      <span className="text-neo-text-muted text-xs">({roleUsers.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {roleUsers.map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center gap-3 bg-neo-dark border border-neo-dark-3 rounded-lg px-4 py-3"
                        >
                          <StatusDot active={u.isActive} />
                          <div className="flex-1 min-w-0">
                            <div className="text-neo-text text-sm font-medium truncate">{u.name}</div>
                            <div className="text-neo-text-muted text-xs truncate">{u.id}</div>
                          </div>
                          <span className="text-lg flex-shrink-0" title={u.lang === 'es' ? 'Espanol' : 'Ruso'}>
                            {LANG_FLAG[u.lang] || u.lang}
                          </span>
                          {role.isAdmin && (
                            <span className="bg-neo-accent/15 text-neo-accent text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                              Admin
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Users with unmatched roles */}
              {(() => {
                const roleIds = new Set(roles.map((r) => r.id));
                const orphans = users.filter((u) => !roleIds.has(u.roleId));
                if (orphans.length === 0) return null;
                return (
                  <div>
                    <h4 className="text-neo-warning text-xs font-semibold uppercase tracking-wider mb-2">
                      Sin rol valido
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {orphans.map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center gap-3 bg-neo-dark border border-neo-warning/30 rounded-lg px-4 py-3"
                        >
                          <StatusDot active={u.isActive} />
                          <div className="flex-1 min-w-0">
                            <div className="text-neo-text text-sm font-medium truncate">{u.name}</div>
                            <div className="text-neo-text-muted text-xs truncate">Rol: {u.roleId}</div>
                          </div>
                          <span className="text-lg flex-shrink-0">{LANG_FLAG[u.lang] || u.lang}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </SectionCard>

        {/* ═══════════════ 4. SECCIONES DE CONTENIDO ═══════════════ */}
        <SectionCard
          id="contenido"
          title="Secciones de Contenido"
          subtitle={`${SECTIONS.length} secciones, ${esContentCount} documentos por idioma`}
        >
          <div className="space-y-2">
            {SECTIONS.map((section) => {
              const isOpen = expandedSections.has(section.id);
              return (
                <div
                  key={section.id}
                  className="bg-neo-dark border border-neo-dark-3 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleContentSection(section.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-neo-dark-3/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-4 h-4 text-neo-text-muted transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="text-left">
                        <span className="text-neo-text text-sm font-medium">{section.nameEs}</span>
                        <span className="text-neo-text-muted text-xs ml-2">{section.nameRu}</span>
                      </div>
                    </div>
                    <span className="text-neo-text-muted text-xs font-medium bg-neo-dark-3 px-2.5 py-0.5 rounded-full">
                      {section.documents.length} doc{section.documents.length !== 1 ? 's' : ''}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3 border-t border-neo-dark-3">
                      <div className="mt-3 space-y-1.5">
                        {section.documents.map((doc) => (
                          <div
                            key={doc.slug}
                            className="flex items-center gap-2 text-sm"
                          >
                            <svg className="w-3.5 h-3.5 text-neo-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-neo-text-body">{doc.titleEs}</span>
                            <span className="text-neo-text-muted text-xs">/ {doc.titleRu}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* ═══════════════ 5. IDIOMAS ═══════════════ */}
        <SectionCard
          id="idiomas"
          title="Idiomas"
          subtitle="Idiomas soportados y estado del contenido."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Espanol */}
            <div className="bg-neo-dark border border-neo-dark-3 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{LANG_FLAG.es}</span>
                  <div>
                    <div className="text-neo-text font-semibold text-sm">Espanol (ES)</div>
                    <div className="text-neo-text-muted text-xs">{esContentCount} documentos</div>
                  </div>
                </div>
                <button
                  onClick={() => setLangToggles((p) => ({ ...p, es: !p.es }))}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 ${langToggles.es ? 'bg-neo-primary' : 'bg-neo-dark-4'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${langToggles.es ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot active={langToggles.es} />
                <span className={`text-xs font-medium ${langToggles.es ? 'text-neo-success' : 'text-neo-text-muted'}`}>
                  {langToggles.es ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            {/* Ruso */}
            <div className="bg-neo-dark border border-neo-dark-3 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{LANG_FLAG.ru}</span>
                  <div>
                    <div className="text-neo-text font-semibold text-sm">Ruso (RU)</div>
                    <div className="text-neo-text-muted text-xs">{ruContentCount} documentos</div>
                  </div>
                </div>
                <button
                  onClick={() => setLangToggles((p) => ({ ...p, ru: !p.ru }))}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 ${langToggles.ru ? 'bg-neo-primary' : 'bg-neo-dark-4'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${langToggles.ru ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot active={langToggles.ru} />
                <span className={`text-xs font-medium ${langToggles.ru ? 'text-neo-success' : 'text-neo-text-muted'}`}>
                  {langToggles.ru ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════ 6. SEGURIDAD ═══════════════ */}
        <SectionCard
          id="seguridad"
          title="Seguridad"
          subtitle="Autenticacion, sesiones y cuentas de administrador."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6">
            <InfoField label="Metodo de autenticacion" value="Login codes (6 digitos)" />
            <InfoField label="Duracion de sesion" value="30 dias" />
            <InfoField label="Proveedor de sesiones" value="NextAuth.js" />
          </div>

          <div className="mb-5">
            <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-3">
              Cuentas de administrador
            </div>
            <div className="bg-neo-dark border border-neo-dark-3 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neo-dark-3">
                    <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-2.5">Usuario</th>
                    <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-2.5">Nombre</th>
                    <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-2.5">Idioma</th>
                    <th className="text-left text-neo-text-muted text-xs font-semibold uppercase tracking-wider px-4 py-2.5">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neo-dark-3">
                  {[
                    { id: 'diego', name: 'Diego', lang: 'es' },
                    { id: 'yulia', name: 'Yulia', lang: 'ru' },
                    { id: 'stanislav', name: 'Stanislav', lang: 'ru' },
                  ].map((acc) => {
                    const user = users.find((u) => u.id === acc.id);
                    return (
                      <tr key={acc.id}>
                        <td className="px-4 py-2.5 text-neo-text font-medium">{acc.id}</td>
                        <td className="px-4 py-2.5 text-neo-text-body">{acc.name}</td>
                        <td className="px-4 py-2.5">
                          <span className="text-lg">{LANG_FLAG[acc.lang]}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <StatusDot active={user?.isActive ?? false} />
                            <span className={`text-xs font-medium ${user?.isActive ? 'text-neo-success' : 'text-neo-text-muted'}`}>
                              {user ? (user.isActive ? 'Activo' : 'Inactivo') : 'No encontrado'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-neo-warning/80 text-xs mt-2">
              Los codigos de acceso se asignan al crear usuarios. Usa la pagina de Usuarios para regenerarlos.
            </p>
          </div>

          <div>
            <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
              Seed de datos
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSeed}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-neo-dark-3 text-neo-text-secondary hover:text-neo-primary hover:bg-neo-dark-4 transition-all duration-200"
              >
                Re-ejecutar Seed
              </button>
              {seedStatus && (
                <span className="text-neo-primary text-xs font-medium bg-neo-primary/10 px-3 py-1 rounded-full">
                  {seedStatus}
                </span>
              )}
            </div>
            <p className="text-neo-text-muted text-xs mt-1.5">
              Restaura roles y usuarios por defecto (diego, yulia, stanislav + 8 roles).
            </p>
          </div>
        </SectionCard>

        {/* ═══════════════ 7. PLATAFORMA ═══════════════ */}
        <SectionCard
          id="plataforma"
          title="Plataforma"
          subtitle="Informacion tecnica del deploy y repositorio."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Portal URL</div>
              <a
                href="https://neomaaa-hub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neo-primary text-sm hover:underline"
              >
                neomaaa-hub.vercel.app
              </a>
            </div>
            <div>
              <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Docsify Portal (legacy)</div>
              <a
                href="https://neomaaa-broker.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neo-primary text-sm hover:underline"
              >
                neomaaa-broker.vercel.app
              </a>
            </div>
            <div>
              <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">GitHub Repo</div>
              <a
                href="https://github.com/diegoelreyok-dotcom/neomaaa-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neo-primary text-sm hover:underline"
              >
                diegoelreyok-dotcom/neomaaa-hub
              </a>
            </div>
            <div>
              <div className="text-neo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Deploy</div>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neo-primary text-sm hover:underline"
              >
                Vercel Dashboard
              </a>
            </div>
            <InfoField label="Version" value="v1.0" />
            <InfoField label="Framework" value="Next.js 14 (App Router)" />
          </div>
        </SectionCard>

        {/* ═══════════════ 8. LINKS RAPIDOS ═══════════════ */}
        <SectionCard
          id="links"
          title="Links Rapidos (Admin)"
          subtitle="Acceso directo a las secciones principales de administracion."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ADMIN_LINKS.map((link) => {
              const isExternal = 'external' in link && link.external;
              const Tag = isExternal ? 'a' : Link;
              const extraProps = isExternal
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: link.href };

              return (
                <Tag
                  key={link.href}
                  {...(extraProps as any)}
                  className="bg-neo-dark border border-neo-dark-3 rounded-lg p-4 hover:border-neo-primary transition-all duration-200 hover:-translate-y-0.5 group flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-neo-text font-semibold text-sm group-hover:text-neo-primary transition-colors duration-200">
                      {link.title}
                    </h4>
                    <p className="text-neo-text-muted text-xs mt-1 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-neo-text-muted group-hover:text-neo-primary transition-colors duration-200 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Tag>
              );
            })}
          </div>
        </SectionCard>

      </div>

      {/* ── Footer ── */}
      <div className="mt-10 pb-4 text-center">
        <p className="text-neo-text-muted text-xs">
          NEOMAAA Hub v1.0 — Admin Settings
        </p>
      </div>
    </div>
  );
}
