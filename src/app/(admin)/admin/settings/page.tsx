'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { SECTIONS } from '@/lib/sections';
import type { Lang } from '@/lib/types';

const labels: Record<Lang, {
  // Page header
  pageTitle: string;
  pageSubtitle: string;
  // Groups
  groupConfig: string;
  groupContent: string;
  groupSystem: string;
  // Categories
  catGeneral: string;
  catTeam: string;
  catRoles: string;
  catContent: string;
  catLanguages: string;
  catSecurity: string;
  catIntegrations: string;
  catPlatform: string;
  catDocuments: string;
  // General card
  generalTitle: string;
  generalDesc: string;
  save: string;
  brokerName: string;
  legalEntity: string;
  licenseNumber: string;
  mainDomain: string;
  supportPhone: string;
  // Team card
  teamTitle: string;
  teamDescCount: (n: number) => string;
  invite: string;
  noUsers: string;
  active: string;
  inactive: string;
  owner: string;
  admin: string;
  // Roles card
  rolesTitle: string;
  rolesDescCount: (n: number) => string;
  createRole: string;
  noRoles: string;
  sectionOne: string;
  sectionMany: string;
  userOne: string;
  userMany: string;
  // Content card
  contentTitle: string;
  contentDescCount: (sec: number, docs: number) => string;
  // Languages card
  languagesTitle: string;
  languagesDesc: string;
  langSpanish: string;
  langRussian: string;
  documentsLabel: string;
  activeStatus: string;
  // Security
  securityTitle: string;
  securityDesc: string;
  authMethod: string;
  authValue: string;
  sessionDuration: string;
  sessionValue: string;
  adminAccountsTitle: string;
  adminAccountsDesc: string;
  tableUser: string;
  tableLang: string;
  tableStatus: string;
  notFound: string;
  securityNote: (link: React.ReactNode) => React.ReactNode;
  usersLinkText: string;
  seedTitle: string;
  seedDesc: string;
  seedRun: string;
  seedRunning: string;
  seedDone: string;
  seedError: string;
  // Integrations
  integrationsTitle: string;
  integrationsDesc: string;
  statusConnected: string;
  statusPartial: string;
  statusPending: string;
  statusNotConnected: string;
  // Platform
  platformTitle: string;
  platformDesc: string;
  platformPortal: string;
  platformGitHub: string;
  platformVercel: string;
  platformVersion: string;
  platformFramework: string;
  platformHosting: string;
  // Integration descriptions
  integrationDescs: Record<string, string>;
}> = {
  es: {
    pageTitle: 'Configuración',
    pageSubtitle: 'Configura tu plataforma, equipo e integraciones.',
    groupConfig: 'Configuracion',
    groupContent: 'Contenido',
    groupSystem: 'Sistema',
    catGeneral: 'General',
    catTeam: 'Equipo',
    catRoles: 'Roles',
    catContent: 'Contenido',
    catLanguages: 'Idiomas',
    catSecurity: 'Seguridad',
    catIntegrations: 'Integraciones',
    catPlatform: 'Plataforma',
    catDocuments: 'Documentos',
    generalTitle: 'Informacion General',
    generalDesc: 'Datos corporativos, licencia y contacto del broker.',
    save: 'Guardar',
    brokerName: 'Nombre del Broker',
    legalEntity: 'Entidad Legal',
    licenseNumber: 'Numero de Licencia',
    mainDomain: 'Dominio Principal',
    supportPhone: 'Telefono de Soporte',
    teamTitle: 'Equipo',
    teamDescCount: (n) => `${n} miembro${n !== 1 ? 's' : ''} registrado${n !== 1 ? 's' : ''} en la plataforma.`,
    invite: 'Invitar',
    noUsers: 'No hay usuarios registrados.',
    active: 'Activo',
    inactive: 'Inactivo',
    owner: 'Owner',
    admin: 'Admin',
    rolesTitle: 'Roles',
    rolesDescCount: (n) => `${n} rol${n !== 1 ? 'es' : ''} configurado${n !== 1 ? 's' : ''} con permisos por seccion.`,
    createRole: 'Crear rol',
    noRoles: 'No hay roles configurados.',
    sectionOne: 'seccion',
    sectionMany: 'secciones',
    userOne: 'usuario',
    userMany: 'usuarios',
    contentTitle: 'Contenido',
    contentDescCount: (sec, docs) => `${sec} secciones con ${docs} documentos en total.`,
    languagesTitle: 'Idiomas',
    languagesDesc: 'Idiomas soportados y estado del contenido traducido.',
    langSpanish: 'Español',
    langRussian: 'Ruso',
    documentsLabel: 'documentos',
    activeStatus: 'Activo',
    securityTitle: 'Seguridad',
    securityDesc: 'Autenticacion, sesiones y control de acceso.',
    authMethod: 'Metodo de Autenticacion',
    authValue: 'Login codes (6 digitos)',
    sessionDuration: 'Duracion de Sesion',
    sessionValue: '30 dias',
    adminAccountsTitle: 'Cuentas de Administrador',
    adminAccountsDesc: 'Usuarios con acceso completo al panel de administracion.',
    tableUser: 'Usuario',
    tableLang: 'Idioma',
    tableStatus: 'Estado',
    notFound: 'No encontrado',
    securityNote: (link) => (<>Los codigos de acceso se asignan al crear usuarios. Usa la pagina de {link} para regenerarlos.</>),
    usersLinkText: 'Usuarios',
    seedTitle: 'Seed de Datos',
    seedDesc: 'Re-inicializar los datos base del sistema.',
    seedRun: 'Re-ejecutar Seed',
    seedRunning: 'Ejecutando seed...',
    seedDone: 'Seed completado',
    seedError: 'Error al ejecutar seed',
    integrationsTitle: 'Integraciones',
    integrationsDesc: 'Servicios y APIs conectados al ecosistema del broker.',
    statusConnected: 'Conectado',
    statusPartial: 'Parcial',
    statusPending: 'Pendiente',
    statusNotConnected: 'No conectado',
    platformTitle: 'Plataforma',
    platformDesc: 'Informacion tecnica del deploy y repositorio.',
    platformPortal: 'Portal URL',
    platformGitHub: 'GitHub Repo',
    platformVercel: 'Vercel Dashboard',
    platformVersion: 'Version',
    platformFramework: 'Framework',
    platformHosting: 'Hosting',
    integrationDescs: {
      Intercom: 'Chat en vivo y soporte',
      Vercel: 'Hosting y deploy',
      GitHub: 'Codigo fuente',
      'MetaTrader 5': 'Plataforma de trading',
      'Skale CRM': 'Gestion de clientes',
      Sumsub: 'Verificacion KYC',
      Cellxpert: 'Tracking de afiliados',
    },
  },
  ru: {
    pageTitle: 'Настройки',
    pageSubtitle: 'Настройте платформу, команду и интеграции.',
    groupConfig: 'Настройки',
    groupContent: 'Контент',
    groupSystem: 'Система',
    catGeneral: 'Общие',
    catTeam: 'Команда',
    catRoles: 'Роли',
    catContent: 'Контент',
    catLanguages: 'Языки',
    catSecurity: 'Безопасность',
    catIntegrations: 'Интеграции',
    catPlatform: 'Платформа',
    catDocuments: 'Документы',
    generalTitle: 'Общая информация',
    generalDesc: 'Корпоративные данные, лицензия и контакты брокера.',
    save: 'Сохранить',
    brokerName: 'Название брокера',
    legalEntity: 'Юридическое лицо',
    licenseNumber: 'Номер лицензии',
    mainDomain: 'Основной домен',
    supportPhone: 'Телефон поддержки',
    teamTitle: 'Команда',
    teamDescCount: (n) => `${n} зарегистрированны${n !== 1 ? 'х' : 'й'} участник${n !== 1 ? 'ов' : ''} на платформе.`,
    invite: 'Пригласить',
    noUsers: 'Зарегистрированных пользователей нет.',
    active: 'Активен',
    inactive: 'Неактивен',
    owner: 'Владелец',
    admin: 'Админ',
    rolesTitle: 'Роли',
    rolesDescCount: (n) => `Настроено ${n} рол${n !== 1 ? 'ей' : 'ь'} с правами по разделам.`,
    createRole: 'Создать роль',
    noRoles: 'Ролей пока нет.',
    sectionOne: 'раздел',
    sectionMany: 'разделов',
    userOne: 'пользователь',
    userMany: 'пользователей',
    contentTitle: 'Контент',
    contentDescCount: (sec, docs) => `${sec} разделов, всего ${docs} документов.`,
    languagesTitle: 'Языки',
    languagesDesc: 'Поддерживаемые языки и статус переведённого контента.',
    langSpanish: 'Испанский',
    langRussian: 'Русский',
    documentsLabel: 'документов',
    activeStatus: 'Активно',
    securityTitle: 'Безопасность',
    securityDesc: 'Аутентификация, сессии и контроль доступа.',
    authMethod: 'Метод аутентификации',
    authValue: 'Коды входа (6 цифр)',
    sessionDuration: 'Длительность сессии',
    sessionValue: '30 дней',
    adminAccountsTitle: 'Учётные записи администраторов',
    adminAccountsDesc: 'Пользователи с полным доступом к админ-панели.',
    tableUser: 'Пользователь',
    tableLang: 'Язык',
    tableStatus: 'Статус',
    notFound: 'Не найдено',
    securityNote: (link) => (<>Коды доступа выдаются при создании пользователей. Для их обновления откройте страницу {link}.</>),
    usersLinkText: 'Пользователи',
    seedTitle: 'Инициализация данных',
    seedDesc: 'Переинициализировать базовые данные системы.',
    seedRun: 'Запустить сид',
    seedRunning: 'Выполняется сид...',
    seedDone: 'Сид завершён',
    seedError: 'Ошибка при запуске сида',
    integrationsTitle: 'Интеграции',
    integrationsDesc: 'Сервисы и API, подключённые к экосистеме брокера.',
    statusConnected: 'Подключено',
    statusPartial: 'Частично',
    statusPending: 'В ожидании',
    statusNotConnected: 'Не подключено',
    platformTitle: 'Платформа',
    platformDesc: 'Техническая информация о деплое и репозитории.',
    platformPortal: 'URL портала',
    platformGitHub: 'Репозиторий GitHub',
    platformVercel: 'Панель Vercel',
    platformVersion: 'Версия',
    platformFramework: 'Фреймворк',
    platformHosting: 'Хостинг',
    integrationDescs: {
      Intercom: 'Живой чат и поддержка',
      Vercel: 'Хостинг и деплой',
      GitHub: 'Исходный код',
      'MetaTrader 5': 'Торговая платформа',
      'Skale CRM': 'Управление клиентами',
      Sumsub: 'Проверка KYC',
      Cellxpert: 'Трекинг партнёров',
    },
  },
};

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
  telefono: string;
}

/* ───────────────────────── Constants ───────────────────────── */

const DEFAULT_BROKER: BrokerInfo = {
  nombre: 'NEOMAAA Markets',
  entidad: 'Neomaaa Ltd (IBC 15968)',
  licencia: 'L15968/N — AOFA',
  dominio: 'neomaaa.com',
  telefono: '+41 44 707 9633',
};

type CategoryId = 'general' | 'team' | 'roles' | 'content' | 'languages' | 'security' | 'integrations' | 'platform';
type GroupKey = 'config' | 'content' | 'system';

interface CategoryGroup {
  key: GroupKey;
  items: { id: CategoryId; icon: React.ReactNode }[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: 'config',
    items: [
      {
        id: 'general',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844.141 1.206-.067l.72-.431a1.146 1.146 0 011.47.228l.774.774c.394.394.48.99.228 1.47l-.431.72a1.38 1.38 0 00-.067 1.206c.166.396.506.71.93.78l.894.15c.542.09.94.56.94 1.109v1.094c0 .55-.398 1.02-.94 1.11l-.894.149a1.38 1.38 0 00-.93.78 1.38 1.38 0 00.067 1.206l.431.72c.252.48.166 1.076-.228 1.47l-.774.774a1.146 1.146 0 01-1.47.228l-.72-.431a1.38 1.38 0 00-1.206-.067 1.38 1.38 0 00-.78.93l-.15.894c-.09.542-.56.94-1.109.94h-1.094c-.55 0-1.02-.398-1.11-.94l-.148-.894a1.38 1.38 0 00-.78-.93 1.38 1.38 0 00-1.207.067l-.72.431a1.146 1.146 0 01-1.47-.228l-.773-.774a1.146 1.146 0 01-.228-1.47l.43-.72a1.38 1.38 0 00.068-1.206 1.38 1.38 0 00-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.148a1.38 1.38 0 00.93-.78 1.38 1.38 0 00-.067-1.207l-.431-.72a1.146 1.146 0 01.228-1.47l.774-.773a1.146 1.146 0 011.47-.228l.72.43a1.38 1.38 0 001.206.068.38.38 0 00.78-.93l.15-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        id: 'team',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        ),
      },
      {
        id: 'roles',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        ),
      },
    ],
  },
  {
    key: 'content',
    items: [
      {
        id: 'content',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        ),
      },
      {
        id: 'languages',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
          </svg>
        ),
      },
    ],
  },
  {
    key: 'system',
    items: [
      {
        id: 'security',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        ),
      },
      {
        id: 'integrations',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        ),
      },
      {
        id: 'platform',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        ),
      },
    ],
  },
];

type IntegrationStatus = 'connected' | 'partial' | 'pending' | 'not_connected';

const INTEGRATIONS: { name: string; status: IntegrationStatus; initial: string; color: string }[] = [
  { name: 'Intercom', status: 'partial', initial: 'IC', color: 'from-slate-500 to-slate-600' },
  { name: 'Vercel', status: 'connected', initial: 'VC', color: 'from-gray-400 to-gray-600' },
  { name: 'GitHub', status: 'connected', initial: 'GH', color: 'from-gray-500 to-gray-700' },
  { name: 'MetaTrader 5', status: 'not_connected', initial: 'MT', color: 'from-zinc-500 to-zinc-600' },
  { name: 'Skale CRM', status: 'not_connected', initial: 'SK', color: 'from-neutral-500 to-neutral-600' },
  { name: 'Sumsub', status: 'not_connected', initial: 'SS', color: 'from-stone-500 to-stone-600' },
  { name: 'Cellxpert', status: 'pending', initial: 'CX', color: 'from-gray-500 to-gray-600' },
];

/* ───────────────────────── Skeleton Loader ───────────────────────── */

function SettingsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-32 bg-[#1A1A1A] rounded-lg mb-2" />
        <div className="h-4 w-64 bg-[#1A1A1A]/60 rounded-lg" />
      </div>
      <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
        {/* Sidebar skeleton */}
        <div className="w-60 flex-shrink-0">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-4 space-y-6">
            {[1, 2, 3].map((g) => (
              <div key={g} className="space-y-2">
                <div className="h-3 w-20 bg-[#1A1A1A]/40 rounded mb-3" />
                {[1, 2, 3].slice(0, g === 2 ? 2 : 3).map((i) => (
                  <div key={i} className="h-9 bg-[#1A1A1A]/30 rounded-lg" />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="flex-1 max-w-3xl space-y-6">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6">
            <div className="h-6 w-48 bg-[#1A1A1A] rounded-lg mb-2" />
            <div className="h-4 w-72 bg-[#1A1A1A]/50 rounded-lg mb-8" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-[#1A1A1A]/40 rounded" />
                  <div className="h-10 bg-[#1A1A1A]/30 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Card Wrapper ───────────────────────── */

function SettingsCard({
  title,
  description,
  children,
  headerRight,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="px-6 pt-6 pb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
          <p className="text-[#666666] text-sm mt-1 leading-relaxed">{description}</p>
        </div>
        {headerRight && <div className="flex-shrink-0 ml-4">{headerRight}</div>}
      </div>
      {/* Divider */}
      <div className="border-b border-[#1A1A1A]/40 mx-6" />
      {/* Card body */}
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<CategoryId>('general');
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [broker, setBroker] = useState<BrokerInfo>(DEFAULT_BROKER);
  const [originalBroker, setOriginalBroker] = useState<BrokerInfo>(DEFAULT_BROKER);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const l = data?.user?.lang;
        if (l === 'ru' || l === 'es') setLang(l);
      })
      .catch(() => {});
  }, []);

  const t = labels[lang];

  const hasChanges = JSON.stringify(broker) !== JSON.stringify(originalBroker);

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
    const stored = localStorage.getItem('neomaaa-broker-info');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBroker(parsed);
        setOriginalBroker(parsed);
      } catch { /* ignore */ }
    }
  }, [loadData]);

  /* ── Save broker ── */
  function saveBroker() {
    localStorage.setItem('neomaaa-broker-info', JSON.stringify(broker));
    setOriginalBroker({ ...broker });
  }

  /* ── Seed ── */
  async function handleSeed() {
    setSeedStatus(t.seedRunning);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedStatus(data.message || t.seedDone);
      await loadData();
      setTimeout(() => setSeedStatus(null), 3000);
    } catch {
      setSeedStatus(t.seedError);
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

  /* ── Derived data ── */
  const esContentCount = SECTIONS.reduce((acc, s) => acc + s.documents.length, 0);

  function getRoleName(roleId: string) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return roleId;
    return lang === 'ru' ? (role.nameRu || role.name) : role.name;
  }

  function isAdminRole(roleId: string) {
    return roles.find((r) => r.id === roleId)?.isAdmin || false;
  }

  /* ── Loading state ── */
  if (loading) {
    return <SettingsSkeleton />;
  }

  /* ── Section renderers ── */

  function renderGeneral() {
    const fields: { label: string; key: keyof BrokerInfo; span?: boolean }[] = [
      { label: t.brokerName, key: 'nombre' },
      { label: t.legalEntity, key: 'entidad' },
      { label: t.licenseNumber, key: 'licencia' },
      { label: t.mainDomain, key: 'dominio' },
      { label: t.supportPhone, key: 'telefono' },
    ];

    return (
      <SettingsCard
        title={t.generalTitle}
        description={t.generalDesc}
        headerRight={
          hasChanges ? (
            <button
              onClick={saveBroker}
              className="inline-flex items-center gap-2 bg-[#98283A] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#B33347] transition-all duration-200 text-sm shadow-lg shadow-[#98283A]/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {t.save}
            </button>
          ) : undefined
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          {fields.map(({ label, key }) => (
            <div key={key}>
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {label}
              </label>
              <input
                type="text"
                value={broker[key]}
                onChange={(e) => setBroker((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full bg-[#1A1A1A]/50 border border-[#1E1E1E] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#666666]/50 focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </SettingsCard>
    );
  }

  function renderTeam() {
    const avatarGradients = [
      'from-slate-600 to-slate-700',
      'from-zinc-600 to-zinc-700',
      'from-gray-600 to-gray-700',
      'from-neutral-600 to-neutral-700',
      'from-stone-600 to-stone-700',
      'from-slate-500 to-gray-700',
    ];

    return (
      <SettingsCard
        title={t.teamTitle}
        description={t.teamDescCount(users.length)}
        headerRight={
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#98283A] hover:text-[#B33347] transition-all duration-200 bg-[#98283A]/10 hover:bg-[#98283A]/15 px-4 py-2 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t.invite}
          </Link>
        }
      >
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="text-[#666666] text-sm">{t.noUsers}</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {users.map((user, idx) => {
              const initial = user.name.charAt(0).toUpperCase();
              const admin = isAdminRole(user.roleId);
              const roleName = getRoleName(user.roleId);
              const isOwner = user.id === 'diego';
              const gradient = avatarGradients[idx % avatarGradients.length];

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-4 py-3.5 px-3 -mx-3 rounded-lg hover:bg-[#1A1A1A]/30 transition-all duration-200 group"
                >
                  {/* Avatar with gradient */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg`}>
                    {initial}
                  </div>

                  {/* Name + email */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium group-hover:text-white transition-colors">
                      {user.name}
                    </div>
                    <div className="text-[#666666] text-xs mt-0.5">{user.id}@neomaaa.com</div>
                  </div>

                  {/* Status dot */}
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${user.isActive ? 'bg-[#38CC97]' : 'bg-[#333333]'}`} />
                    <span className={`text-xs ${user.isActive ? 'text-[#38CC97]' : 'text-[#666666]'}`}>
                      {user.isActive ? t.active : t.inactive}
                    </span>
                  </div>

                  {/* Role badge */}
                  {isOwner ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#6C5CE7]/20 to-violet-500/20 text-[#6C5CE7] border border-[#6C5CE7]/20">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {t.owner}
                    </span>
                  ) : admin ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#98283A]/15 text-[#98283A] border border-[#98283A]/20">
                      {t.admin}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1A1A1A]/50 text-[#A0A0A0] border border-[#1E1E1E]/30">
                      {roleName}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SettingsCard>
    );
  }

  function renderRoles() {
    return (
      <SettingsCard
        title={t.rolesTitle}
        description={t.rolesDescCount(roles.length)}
        headerRight={
          <Link
            href="/admin/roles"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#98283A] hover:text-[#B33347] transition-all duration-200 bg-[#98283A]/10 hover:bg-[#98283A]/15 px-4 py-2 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t.createRole}
          </Link>
        }
      >
        {roles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <p className="text-[#666666] text-sm">{t.noRoles}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roles.map((role) => {
              const assignedUsers = users.filter((u) => u.roleId === role.id).length;
              return (
                <Link
                  key={role.id}
                  href={`/admin/roles/${role.id}`}
                  className="group relative flex flex-col gap-3 p-4 rounded-xl border border-[#1E1E1E]/50 bg-[#1A1A1A]/20 hover:border-[#98283A]/30 hover:bg-[#1A1A1A]/40 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-semibold group-hover:text-white transition-colors">
                      {lang === 'ru' ? (role.nameRu || role.name) : role.name}
                    </span>
                    {role.isAdmin && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#98283A]/15 text-[#98283A] uppercase tracking-wider">
                        {t.admin}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[#666666] text-xs bg-[#1E1E1E]/40 px-2 py-0.5 rounded-md">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                      </svg>
                      {role.sections.length} {role.sections.length !== 1 ? t.sectionMany : t.sectionOne}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#666666] text-xs bg-[#1E1E1E]/40 px-2 py-0.5 rounded-md">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                      </svg>
                      {assignedUsers} {assignedUsers !== 1 ? t.userMany : t.userOne}
                    </span>
                  </div>
                  {/* Hover arrow */}
                  <svg className="absolute right-3 top-4 w-4 h-4 text-[#666666] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </SettingsCard>
    );
  }

  function renderContent() {
    return (
      <SettingsCard
        title={t.contentTitle}
        description={t.contentDescCount(SECTIONS.length, esContentCount)}
      >
        <div className="space-y-0.5">
          {SECTIONS.map((section) => {
            const isOpen = expandedSections.has(section.id);
            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleContentSection(section.id)}
                  className="w-full flex items-center justify-between py-3 px-3 -mx-0 rounded-lg hover:bg-[#1A1A1A]/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className={`w-3.5 h-3.5 text-[#666666] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white text-sm font-medium group-hover:text-white transition-colors">
                      {lang === 'ru' ? section.nameRu : section.nameEs}
                    </span>
                  </div>
                  <span className="text-[#666666] text-xs bg-[#1E1E1E]/40 px-2.5 py-0.5 rounded-full font-medium">
                    {section.documents.length}
                  </span>
                </button>

                {isOpen && (
                  <div className="ml-10 mr-3 mb-2 space-y-0.5 border-l-2 border-[#1E1E1E]/50 pl-4">
                    {section.documents.map((doc) => (
                      <div key={doc.slug} className="flex items-center gap-2.5 py-2 px-2 rounded-md hover:bg-[#1A1A1A]/20 transition-all duration-150">
                        <svg className="w-3.5 h-3.5 text-[#666666] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[#A0A0A0] text-sm">{lang === 'ru' ? doc.titleRu : doc.titleEs}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SettingsCard>
    );
  }

  function renderLanguages() {
    const languages = [
      { code: 'es', name: t.langSpanish, flag: 'https://flagcdn.com/w40/es.png', count: esContentCount, active: true },
      { code: 'ru', name: t.langRussian, flag: 'https://flagcdn.com/w40/ru.png', count: esContentCount, active: true },
    ];

    return (
      <SettingsCard
        title={t.languagesTitle}
        description={t.languagesDesc}
      >
        <div className="space-y-0">
          {languages.map((lang, idx) => (
            <div key={lang.code}>
              <div className="flex items-center gap-4 py-4 px-3 -mx-3 rounded-lg hover:bg-[#1A1A1A]/20 transition-all duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-9 h-7 rounded-md object-cover flex-shrink-0 shadow-sm ring-1 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{lang.name}</div>
                  <div className="text-[#666666] text-xs mt-0.5">{lang.code.toUpperCase()} -- {lang.count} {t.documentsLabel}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#38CC97]/10 text-[#38CC97] border border-[#38CC97]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38CC97] inline-block" />
                  {t.activeStatus}
                </span>
              </div>
              {idx < languages.length - 1 && (
                <div className="border-b border-[#1A1A1A]/30 mx-3" />
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    );
  }

  function renderSecurity() {
    const admins = [
      { id: 'diego', name: 'Diego', lang: 'ES' },
      { id: 'yulia', name: 'Yulia', lang: 'RU' },
      { id: 'stanislav', name: 'Stanislav', lang: 'RU' },
    ];

    return (
      <div className="space-y-6">
        {/* Auth & Sessions Card */}
        <SettingsCard
          title={t.securityTitle}
          description={t.securityDesc}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-lg bg-[#1A1A1A]/20 border border-[#1A1A1A]/30">
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.authMethod}
              </label>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#98283A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
                <div className="text-white text-sm font-medium">{t.authValue}</div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#1A1A1A]/20 border border-[#1A1A1A]/30">
              <label className="block text-xs uppercase tracking-wide text-[#666666] font-medium mb-2">
                {t.sessionDuration}
              </label>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#98283A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-white text-sm font-medium">{t.sessionValue}</div>
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Admin Accounts Card */}
        <SettingsCard
          title={t.adminAccountsTitle}
          description={t.adminAccountsDesc}
        >
          <div className="overflow-hidden rounded-lg border border-[#1A1A1A]/40">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2.5 bg-[#1A1A1A]/30 border-b border-[#1A1A1A]/40">
              <div className="col-span-5 text-xs uppercase tracking-wide text-[#666666] font-medium">{t.tableUser}</div>
              <div className="col-span-3 text-xs uppercase tracking-wide text-[#666666] font-medium">{t.tableLang}</div>
              <div className="col-span-4 text-xs uppercase tracking-wide text-[#666666] font-medium text-right">{t.tableStatus}</div>
            </div>
            {/* Table rows */}
            {admins.map((acc, idx) => {
              const user = users.find((u) => u.id === acc.id);
              const gradients = ['from-slate-600 to-slate-700', 'from-zinc-600 to-zinc-700', 'from-gray-600 to-gray-700'];
              return (
                <div
                  key={acc.id}
                  className={`grid grid-cols-12 gap-4 px-4 py-3.5 items-center hover:bg-[#1A1A1A]/20 transition-all duration-150 ${
                    idx < admins.length - 1 ? 'border-b border-[#1A1A1A]/30' : ''
                  }`}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {acc.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{acc.name}</div>
                      <div className="text-[#666666] text-xs">{acc.id}@neomaaa.com</div>
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#1E1E1E]/30 text-[#A0A0A0]">
                      {acc.lang}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center justify-end gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${user?.isActive ? 'bg-[#38CC97]' : 'bg-[#333333]'}`} />
                    <span className={`text-xs font-medium ${user?.isActive ? 'text-[#38CC97]' : 'text-[#666666]'}`}>
                      {user ? (user.isActive ? t.active : t.inactive) : t.notFound}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning note */}
          <div className="mt-5 flex gap-3 p-4 rounded-lg bg-neo-warning/5 border-l-2 border-neo-warning/60">
            <svg className="w-4 h-4 text-neo-warning flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-[#A0A0A0] text-xs leading-relaxed">
              {t.securityNote(<Link href="/admin/users" className="text-[#98283A] hover:text-[#B33347] transition-colors font-medium">{t.usersLinkText}</Link>)}
            </p>
          </div>

          {/* Seed action */}
          <div className="mt-5 pt-5 border-t border-[#1A1A1A]/40">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wide text-[#666666] font-medium mb-1">{t.seedTitle}</h4>
                <p className="text-[#666666] text-xs">{t.seedDesc}</p>
              </div>
              <div className="flex items-center gap-3">
                {seedStatus && (
                  <span className="text-[#98283A] text-xs font-medium animate-pulse">{seedStatus}</span>
                )}
                <button
                  onClick={handleSeed}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[#1A1A1A]/50 text-[#A0A0A0] hover:text-white hover:bg-[#1E1E1E] border border-[#1E1E1E]/30 hover:border-[#1E1E1E] transition-all duration-200"
                >
                  {t.seedRun}
                </button>
              </div>
            </div>
          </div>
        </SettingsCard>
      </div>
    );
  }

  function renderIntegrations() {
    const statusLabel: Record<IntegrationStatus, string> = {
      connected: t.statusConnected,
      partial: t.statusPartial,
      pending: t.statusPending,
      not_connected: t.statusNotConnected,
    };

    return (
      <SettingsCard
        title={t.integrationsTitle}
        description={t.integrationsDesc}
      >
        <div className="space-y-0">
          {INTEGRATIONS.map((integration, idx) => (
            <div key={integration.name}>
              <div className="flex items-center gap-4 py-4 px-3 -mx-3 rounded-lg hover:bg-[#1A1A1A]/20 transition-all duration-200 group">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${integration.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}>
                  {integration.initial}
                </div>

                {/* Name + desc */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium group-hover:text-white transition-colors">
                    {integration.name}
                  </div>
                  <div className="text-[#666666] text-xs mt-0.5">{t.integrationDescs[integration.name] || ''}</div>
                </div>

                {/* Status */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  integration.status === 'connected'
                    ? 'bg-[#38CC97]/10 text-[#38CC97] border border-[#38CC97]/20'
                    : integration.status === 'partial' || integration.status === 'pending'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-[#1A1A1A]/50 text-[#666666] border border-[#1E1E1E]/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    integration.status === 'connected'
                      ? 'bg-[#38CC97]'
                      : integration.status === 'partial' || integration.status === 'pending'
                      ? 'bg-amber-400'
                      : 'bg-[#666666]/50'
                  }`} />
                  {statusLabel[integration.status]}
                </span>
              </div>
              {idx < INTEGRATIONS.length - 1 && (
                <div className="border-b border-[#1A1A1A]/30 mx-3" />
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    );
  }

  function renderPlatform() {
    const platformData = [
      {
        label: t.platformPortal,
        value: 'neomaaa-hub.vercel.app',
        href: 'https://neomaaa-hub.vercel.app',
        isLink: true,
      },
      {
        label: t.platformGitHub,
        value: 'diegoelreyok-dotcom/neomaaa-hub',
        href: 'https://github.com/diegoelreyok-dotcom/neomaaa-hub',
        isLink: true,
      },
      {
        label: t.platformVercel,
        value: 'vercel.com/dashboard',
        href: 'https://vercel.com/dashboard',
        isLink: true,
      },
      {
        label: t.platformVersion,
        value: 'v1.0',
        isLink: false,
        badge: true,
      },
      {
        label: t.platformFramework,
        value: 'Next.js 14 + TypeScript',
        isLink: false,
      },
      {
        label: t.platformHosting,
        value: 'Vercel (Edge)',
        isLink: false,
      },
    ];

    return (
      <SettingsCard
        title={t.platformTitle}
        description={t.platformDesc}
      >
        <div className="overflow-hidden rounded-lg border border-[#1A1A1A]/40">
          {platformData.map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-3.5 hover:bg-[#1A1A1A]/20 transition-all duration-150 ${
                idx < platformData.length - 1 ? 'border-b border-[#1A1A1A]/30' : ''
              }`}
            >
              <span className="text-xs uppercase tracking-wide text-[#666666] font-medium">
                {item.label}
              </span>
              {item.isLink ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#98283A] text-sm font-medium hover:text-[#B33347] transition-colors"
                >
                  {item.value}
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ) : item.badge ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#98283A]/15 text-[#98283A] border border-[#98283A]/20">
                  {item.value}
                </span>
              ) : (
                <span className="text-white text-sm">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    );
  }

  const sectionRenderers: Record<CategoryId, () => React.ReactNode> = {
    general: renderGeneral,
    team: renderTeam,
    roles: renderRoles,
    content: renderContent,
    languages: renderLanguages,
    security: renderSecurity,
    integrations: renderIntegrations,
    platform: renderPlatform,
  };

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">{t.pageTitle}</h1>
        <p className="text-[#666666] text-sm mt-1">{t.pageSubtitle}</p>
      </div>

      {/* ── Main layout: sidebar + content ── */}
      <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
        {/* Left sidebar */}
        <div className="w-60 flex-shrink-0">
          <div className="sticky top-6">
            <nav className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-3 space-y-5">
              {CATEGORY_GROUPS.map((group) => {
                const groupLabel = group.key === 'config' ? t.groupConfig : group.key === 'content' ? t.groupContent : t.groupSystem;
                return (
                <div key={group.key}>
                  <div className="px-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#666666]/60 font-semibold">
                      {groupLabel}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map((cat) => {
                      const isActive = activeSection === cat.id;
                      const catLabel =
                        cat.id === 'general' ? t.catGeneral :
                        cat.id === 'team' ? t.catTeam :
                        cat.id === 'roles' ? t.catRoles :
                        cat.id === 'content' ? t.catDocuments :
                        cat.id === 'languages' ? t.catLanguages :
                        cat.id === 'security' ? t.catSecurity :
                        cat.id === 'integrations' ? t.catIntegrations :
                        t.catPlatform;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveSection(cat.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-[#98283A]/10 text-[#98283A] font-medium border border-[#98283A]/20'
                              : 'text-[#A0A0A0] hover:bg-[#1A1A1A]/50 hover:text-white border border-transparent'
                          }`}
                        >
                          <span className={`flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-[#98283A]' : 'text-[#666666]'}`}>
                            {cat.icon}
                          </span>
                          {catLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 max-w-3xl">
          {sectionRenderers[activeSection]()}
        </div>
      </div>
    </div>
  );
}
