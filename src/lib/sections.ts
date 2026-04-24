import { Section, DocMeta, Lang } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'launch',
    nameEs: 'Lanzamiento y Go-Live',
    nameRu: 'Запуск и Go-Live',
    nameEn: 'Launch & Go-Live', // TODO: EN translation
    order: 0,
    documents: [
      { slug: 'post-launch-playbook', titleEs: 'Post-Launch Playbook (Semanas 1-4)', titleRu: 'Playbook после запуска (недели 1-4)', titleEn: 'Post-Launch Playbook (Weeks 1-4)', filePath: 'launch/post-launch-playbook.md', pdfSlug: 'launch-post-launch-playbook' }, // TODO: EN translation
    ],
  },
  {
    id: 'hiring',
    nameEs: 'Hiring',
    nameRu: 'Найм персонала',
    nameEn: 'Hiring', // TODO: EN translation
    order: 1,
    documents: [
      { slug: 'onboarding-5-dias', titleEs: 'Onboarding NEOMAAA en 5 días', titleRu: 'Онбординг NEOMAAA — 5 дней', titleEn: 'NEOMAAA Onboarding in 5 days', filePath: 'hiring/onboarding-5-dias.md', pdfSlug: 'hiring-onboarding-5-dias' }, // TODO: EN translation
      { slug: 'roles-broker-completo', titleEs: 'Roles de un Broker — Estructura Completa', titleRu: 'Роли в брокере — Полная структура', titleEn: 'Broker Roles — Full Structure', filePath: 'hiring/roles-broker-completo.md', pdfSlug: 'hiring-roles-broker-completo' }, // TODO: EN translation
      { slug: 'finance-manager', titleEs: 'Finance Manager', titleRu: 'Финансовый менеджер', titleEn: 'Finance Manager', filePath: 'hiring/finance-manager.md', pdfSlug: 'hiring-finance-manager' }, // TODO: EN translation
      { slug: 'support-es', titleEs: 'Support Agent ES', titleRu: 'Агент поддержки (ES)', titleEn: 'Support Agent ES', filePath: 'hiring/support-es.md', pdfSlug: 'hiring-support-es' }, // TODO: EN translation
      { slug: 'support-en', titleEs: 'Support Agent EN', titleRu: 'Агент поддержки (EN)', titleEn: 'Support Agent EN', filePath: 'hiring/support-en.md', pdfSlug: 'hiring-support-en' }, // TODO: EN translation
      { slug: 'marketing-manager', titleEs: 'Marketing Manager', titleRu: 'Менеджер по маркетингу', titleEn: 'Marketing Manager', filePath: 'hiring/marketing-manager.md', pdfSlug: 'hiring-marketing-manager' }, // TODO: EN translation
    ],
  },
  {
    id: 'encyclopedia',
    nameEs: 'Enciclopedia',
    nameRu: 'Энциклопедия',
    nameEn: 'Encyclopedia', // TODO: EN translation
    order: 2,
    documents: [
      { slug: 'abc', titleEs: 'ABC del Broker', titleRu: 'ABC брокера', titleEn: 'Broker ABC', filePath: 'encyclopedia/abc.md', pdfSlug: 'encyclopedia-abc' }, // TODO: EN translation
      { slug: 'formacion-precio', titleEs: 'Formación del Precio de Mercado', titleRu: 'Формирование рыночной цены', titleEn: 'Market Price Formation', filePath: 'encyclopedia/formacion-precio.md', pdfSlug: 'encyclopedia-formacion-precio' }, // TODO: EN translation
      { slug: 'noticias-impacto', titleEs: 'Noticias Económicas e Impacto', titleRu: 'Экономические новости и их влияние', titleEn: 'Economic News & Impact', filePath: 'encyclopedia/noticias-impacto.md', pdfSlug: 'encyclopedia-noticias-impacto' }, // TODO: EN translation
      { slug: 'productos-mt5', titleEs: 'MT5 y Productos NEOMAAA', titleRu: 'MT5 и продукты NEOMAAA', titleEn: 'MT5 & NEOMAAA Products', filePath: 'encyclopedia/productos-mt5.md', pdfSlug: 'encyclopedia-productos-mt5' }, // TODO: EN translation
      { slug: 'regulacion-jurisdicciones', titleEs: 'Regulación y Jurisdicciones', titleRu: 'Регулирование и юрисдикции', titleEn: 'Regulation & Jurisdictions', filePath: 'encyclopedia/regulacion-jurisdicciones.md', pdfSlug: 'encyclopedia-regulacion-jurisdicciones' }, // TODO: EN translation
      { slug: 'psicologia-trader', titleEs: 'Psicología del Trader Retail', titleRu: 'Психология розничного трейдера', titleEn: 'Retail Trader Psychology', filePath: 'encyclopedia/psicologia-trader.md', pdfSlug: 'encyclopedia-psicologia-trader' }, // TODO: EN translation
      { slug: 'knowledge-base-api', titleEs: 'Knowledge Base API', titleRu: 'Knowledge Base API', titleEn: 'Knowledge Base API', filePath: 'encyclopedia/knowledge-base-api.md', pdfSlug: 'encyclopedia-knowledge-base-api' }, // TODO: EN translation
      { slug: 'vault-yield-system', titleEs: 'Vault Yield System (Sistema de Yield)', titleRu: 'Vault Yield System (Система доходности)', titleEn: 'Vault Yield System', filePath: 'encyclopedia/vault-yield-system.md', pdfSlug: 'encyclopedia-vault-yield-system' }, // TODO: EN translation
    ],
  },
  {
    id: 'sales',
    nameEs: 'Ventas',
    nameRu: 'Продажи',
    nameEn: 'Sales', // TODO: EN translation
    order: 3,
    documents: [
      { slug: 'training', titleEs: 'Training Program (6 sem)', titleRu: 'Программа обучения (6 нед)', titleEn: 'Training Program (6 weeks)', filePath: 'sales/training.md', pdfSlug: 'sales-training' }, // TODO: EN translation
      { slug: 'plan-contacto', titleEs: 'Plan de Contacto — Etapa 1', titleRu: 'План контактов — Этап 1', titleEn: 'Contact Plan — Stage 1', filePath: 'sales/plan-contacto.md', pdfSlug: 'sales-plan-contacto' }, // TODO: EN translation
      { slug: 'primer-contacto', titleEs: 'Primer Contacto', titleRu: 'Первый контакт', titleEn: 'First Contact', filePath: 'sales/primer-contacto.md', pdfSlug: 'sales-primer-contacto' }, // TODO: EN translation
      { slug: 'faq-ventas', titleEs: 'FAQ Ventas', titleRu: 'FAQ отдела продаж', titleEn: 'Sales FAQ', filePath: 'sales/faq-ventas.md', pdfSlug: 'sales-faq-ventas' }, // TODO: EN translation
      { slug: 'commissions', titleEs: 'Esquema de Comisiones', titleRu: 'Схема комиссий', titleEn: 'Commission Scheme', filePath: 'sales/commissions.md', pdfSlug: 'sales-commissions' }, // TODO: EN translation
      { slug: 'objections-broker', titleEs: 'Objeciones Broker', titleRu: 'Возражения клиентов', titleEn: 'Broker Objections', filePath: 'sales/objections-broker.md', pdfSlug: 'sales-objections-broker' }, // TODO: EN translation
      { slug: 'guia-copytrading-mql5', titleEs: 'Guía Copy Trading MQL5 (paso a paso)', titleRu: 'Руководство Copy Trading MQL5 (пошагово)', titleEn: 'MQL5 Copy Trading Guide (step by step)', filePath: 'sales/guia-copytrading-mql5.md', pdfSlug: 'sales-guia-copytrading-mql5' }, // TODO: EN translation
    ],
  },
  {
    id: 'support',
    nameEs: 'Soporte',
    nameRu: 'Поддержка',
    nameEn: 'Support', // TODO: EN translation
    order: 4,
    documents: [
      { slug: 'playbook', titleEs: 'Support Playbook', titleRu: 'Playbook поддержки', titleEn: 'Support Playbook', filePath: 'support/playbook.md', pdfSlug: 'support-playbook' }, // TODO: EN translation
      { slug: 'enciclopedia-soporte', titleEs: 'Enciclopedia de Soporte', titleRu: 'Энциклопедия поддержки', titleEn: 'Support Encyclopedia', filePath: 'support/enciclopedia-soporte.md', pdfSlug: 'support-enciclopedia-soporte' }, // TODO: EN translation
      { slug: 'guia-tono-comunicacion', titleEs: 'Guía de Tono y Comunicación', titleRu: 'Руководство по тону коммуникации', titleEn: 'Tone & Communication Guide', filePath: 'support/guia-tono-comunicacion.md', pdfSlug: 'support-guia-tono-comunicacion' }, // TODO: EN translation
      { slug: 'manejo-quejas', titleEs: 'Manejo de Quejas', titleRu: 'Управление жалобами', titleEn: 'Complaint Handling', filePath: 'support/manejo-quejas.md', pdfSlug: 'support-manejo-quejas' }, // TODO: EN translation
      { slug: 'atencion-vip', titleEs: 'Atención VIP', titleRu: 'VIP обслуживание', titleEn: 'VIP Service', filePath: 'support/atencion-vip.md', pdfSlug: 'support-atencion-vip' }, // TODO: EN translation
      { slug: 'gestion-tickets', titleEs: 'Gestión de Tickets', titleRu: 'Управление тикетами', titleEn: 'Ticket Management', filePath: 'support/gestion-tickets.md', pdfSlug: 'support-gestion-tickets' }, // TODO: EN translation
    ],
  },
  {
    id: 'compliance',
    nameEs: 'Compliance',
    nameRu: 'Комплаенс',
    nameEn: 'Compliance', // TODO: EN translation
    order: 5,
    documents: [
      { slug: 'susana-playbook', titleEs: '📋 Playbook Susana (Guía Diaria)', titleRu: '📋 Playbook Susana (ежедневно)', titleEn: '📋 Susana Playbook (Daily Guide)', filePath: 'compliance/susana-playbook.md', pdfSlug: 'compliance-susana-playbook' }, // TODO: EN translation
      { slug: 'workflow', titleEs: 'Workflow Operativo', titleRu: 'Операционный workflow', titleEn: 'Operational Workflow', filePath: 'compliance/workflow.md', pdfSlug: 'compliance-workflow' }, // TODO: EN translation
      { slug: 'risk-matrix', titleEs: 'Matriz de Riesgo AML/KYC', titleRu: 'Матрица риска AML/KYC', titleEn: 'AML/KYC Risk Matrix', filePath: 'compliance/risk-matrix.md', pdfSlug: 'compliance-risk-matrix' }, // TODO: EN translation
      { slug: 'edd-triggers', titleEs: 'EDD — Enhanced Due Diligence', titleRu: 'EDD — Улучшенная проверка', titleEn: 'EDD — Enhanced Due Diligence', filePath: 'compliance/edd-triggers.md', pdfSlug: 'compliance-edd-triggers' }, // TODO: EN translation
      { slug: 'pep-sanctions-sop', titleEs: 'PEP + Sanctions SOP', titleRu: 'PEP + Санкции SOP', titleEn: 'PEP + Sanctions SOP', filePath: 'compliance/pep-sanctions-sop.md', pdfSlug: 'compliance-pep-sanctions-sop' }, // TODO: EN translation
      { slug: 'sar-reporting', titleEs: 'SAR — Reporte Actividad Sospechosa', titleRu: 'SAR — Отчёт о подозрительной активности', titleEn: 'SAR — Suspicious Activity Reporting', filePath: 'compliance/sar-reporting.md', pdfSlug: 'compliance-sar-reporting' }, // TODO: EN translation
      { slug: 'ongoing-monitoring-sop', titleEs: 'Monitoreo Continuo SOP', titleRu: 'Постоянный мониторинг SOP', titleEn: 'Ongoing Monitoring SOP', filePath: 'compliance/ongoing-monitoring-sop.md', pdfSlug: 'compliance-ongoing-monitoring-sop' }, // TODO: EN translation
      { slug: 'compliance-calendar', titleEs: 'Calendario de Compliance', titleRu: 'Календарь комплаенса', titleEn: 'Compliance Calendar', filePath: 'compliance/compliance-calendar.md', pdfSlug: 'compliance-compliance-calendar' }, // TODO: EN translation
      { slug: 'onboarding', titleEs: 'Client Onboarding', titleRu: 'Онбординг клиентов', titleEn: 'Client Onboarding', filePath: 'compliance/onboarding.md', pdfSlug: 'compliance-onboarding' }, // TODO: EN translation
      { slug: 'manual-susana', titleEs: 'Manual Compliance', titleRu: 'Руководство по комплаенсу', titleEn: 'Compliance Manual', filePath: 'compliance/manual-susana.md', pdfSlug: 'compliance-manual-susana' }, // TODO: EN translation
      { slug: 'frases-prohibidas', titleEs: 'Frases Prohibidas y Aprobadas (Gold Source)', titleRu: 'Запрещённые и одобренные фразы (Gold Source)', titleEn: 'Prohibited & Approved Phrases (Gold Source)', filePath: 'compliance/frases-prohibidas.md', pdfSlug: 'compliance-frases-prohibidas' }, // TODO: EN translation
      { slug: 'proceso-kyc-sumsub', titleEs: 'Proceso KYC Completo con Sumsub', titleRu: 'Полный процесс KYC с Sumsub', titleEn: 'Full KYC Process with Sumsub', filePath: 'compliance/proceso-kyc-sumsub.md', pdfSlug: 'compliance-proceso-kyc-sumsub' }, // TODO: EN translation
      { slug: 'screening-sanciones', titleEs: 'Screening de Sanciones', titleRu: 'Скрининг санкций', titleEn: 'Sanctions Screening', filePath: 'compliance/screening-sanciones.md', pdfSlug: 'compliance-screening-sanciones' }, // TODO: EN translation
      { slug: 'expansion-regulatoria', titleEs: 'Plan de Expansión Regulatoria', titleRu: 'План регуляторного расширения', titleEn: 'Regulatory Expansion Plan', filePath: 'compliance/expansion-regulatoria.md', pdfSlug: 'compliance-expansion-regulatoria' }, // TODO: EN translation
    ],
  },
  {
    id: 'operations',
    nameEs: 'Operaciones',
    nameRu: 'Операции',
    nameEn: 'Operations', // TODO: EN translation
    order: 6,
    documents: [
      { slug: 'go-live-runbook', titleEs: 'Go-Live Runbook', titleRu: 'Go-Live Runbook', titleEn: 'Go-Live Runbook', filePath: 'operations/go-live-runbook.md', pdfSlug: 'operations-go-live-runbook' }, // TODO: EN translation
      { slug: 'faq-interno', titleEs: 'FAQ Interno', titleRu: 'Внутренний FAQ', titleEn: 'Internal FAQ', filePath: 'operations/faq-interno.md', pdfSlug: 'operations-faq-interno' }, // TODO: EN translation
      { slug: 'deposits', titleEs: 'Depósitos y Retiros', titleRu: 'Депозиты и выводы', titleEn: 'Deposits & Withdrawals', filePath: 'operations/deposits.md', pdfSlug: 'operations-deposits' }, // TODO: EN translation
      { slug: 'psps-explicados', titleEs: 'PSPs Explicados', titleRu: 'PSP объяснение', titleEn: 'PSPs Explained', filePath: 'operations/psps-explicados.md', pdfSlug: 'operations-psps-explicados' }, // TODO: EN translation
      { slug: 'dealing-desk-publico', titleEs: 'Dealing Desk — Ejecución NEOMAAA', titleRu: 'Dealing Desk — исполнение NEOMAAA', titleEn: 'Dealing Desk — NEOMAAA Execution', filePath: 'operations/dealing-desk-publico.md', pdfSlug: 'operations-dealing-desk-publico' }, // TODO: EN translation
      { slug: 'manual-crisis', titleEs: 'Manual de Crisis', titleRu: 'Руководство по кризисам', titleEn: 'Crisis Manual', filePath: 'operations/manual-crisis.md', pdfSlug: 'operations-manual-crisis' }, // TODO: EN translation
    ],
  },
  {
    id: 'marketing',
    nameEs: 'Marketing',
    nameRu: 'Маркетинг',
    nameEn: 'Marketing', // TODO: EN translation
    order: 7,
    documents: [
      { slug: 'icps-por-mercado', titleEs: 'ICPs por Mercado', titleRu: 'ICP по рынкам', titleEn: 'ICPs by Market', filePath: 'marketing/icps-por-mercado.md', pdfSlug: 'marketing-icps-por-mercado' }, // TODO: EN translation
      { slug: 'funnel-broker', titleEs: 'Funnel de Conversión', titleRu: 'Воронка конверсии', titleEn: 'Conversion Funnel', filePath: 'marketing/funnel-broker.md', pdfSlug: 'marketing-funnel-broker' }, // TODO: EN translation
      { slug: 'retencion-broker', titleEs: 'Estrategia Retención', titleRu: 'Стратегия удержания', titleEn: 'Retention Strategy', filePath: 'marketing/retencion-broker.md', pdfSlug: 'marketing-retencion-broker' }, // TODO: EN translation
      { slug: 'copy-broker', titleEs: 'Copy y Mensajes', titleRu: 'Копирайтинг', titleEn: 'Copy & Messaging', filePath: 'marketing/copy-broker.md', pdfSlug: 'marketing-copy-broker' }, // TODO: EN translation
      { slug: 'competidores-deep-dive', titleEs: 'Análisis Competidores', titleRu: 'Конкурентный анализ', titleEn: 'Competitor Analysis', filePath: 'marketing/competidores-deep-dive.md', pdfSlug: 'marketing-competidores-deep-dive' }, // TODO: EN translation
    ],
  },
  {
    id: 'partners',
    nameEs: 'Partners',
    nameRu: 'Партнёры',
    nameEn: 'Partners', // TODO: EN translation
    order: 8,
    documents: [
      { slug: 'programa-completo', titleEs: 'Programa Completo', titleRu: 'Полная программа', titleEn: 'Full Program', filePath: 'partners/programa-completo.md', pdfSlug: 'partners-programa-completo' }, // TODO: EN translation
      { slug: 'guia-operativa', titleEs: 'Guía Operativa Partners', titleRu: 'Операционное руководство', titleEn: 'Partners Operational Guide', filePath: 'partners/guia-operativa.md', pdfSlug: 'partners-guia-operativa' }, // TODO: EN translation
      { slug: 'playbook-ib', titleEs: 'Playbook del IB', titleRu: 'Playbook для IB', titleEn: 'IB Playbook', filePath: 'partners/playbook-ib.md', pdfSlug: 'partners-playbook-ib' }, // TODO: EN translation
    ],
  },
  {
    id: 'legal',
    nameEs: 'Documentos Legales',
    nameRu: 'Юридические документы',
    nameEn: 'Legal Documents', // TODO: EN translation
    order: 98,
    documents: [
      { slug: 'risk-disclosure', titleEs: 'Divulgación de Riesgos', titleRu: 'Раскрытие рисков', titleEn: 'Risk Disclosure', filePath: 'legal/risk-disclosure.md', pdfSlug: 'legal-risk-disclosure' }, // TODO: EN translation
      { slug: 'terms-conditions', titleEs: 'Términos y Condiciones', titleRu: 'Условия использования', titleEn: 'Terms & Conditions', filePath: 'legal/terms-conditions.md', pdfSlug: 'legal-terms-conditions' }, // TODO: EN translation
      { slug: 'privacy-policy', titleEs: 'Política de Privacidad', titleRu: 'Политика конфиденциальности', titleEn: 'Privacy Policy', filePath: 'legal/privacy-policy.md', pdfSlug: 'legal-privacy-policy' }, // TODO: EN translation
      { slug: 'client-agreement', titleEs: 'Acuerdo del Cliente', titleRu: 'Клиентское соглашение', titleEn: 'Client Agreement', filePath: 'legal/client-agreement.md', pdfSlug: 'legal-client-agreement' }, // TODO: EN translation
      { slug: 'aml-kyc-policy', titleEs: 'Política AML/KYC', titleRu: 'Политика AML/KYC', titleEn: 'AML/KYC Policy', filePath: 'legal/aml-kyc-policy.md', pdfSlug: 'legal-aml-kyc-policy' }, // TODO: EN translation
      { slug: 'order-execution-policy', titleEs: 'Política de Ejecución', titleRu: 'Политика исполнения ордеров', titleEn: 'Order Execution Policy', filePath: 'legal/order-execution-policy.md', pdfSlug: 'legal-order-execution-policy' }, // TODO: EN translation
      { slug: 'complaint-handling', titleEs: 'Manejo de Quejas', titleRu: 'Обработка жалоб', titleEn: 'Complaint Handling', filePath: 'legal/complaint-handling.md', pdfSlug: 'legal-complaint-handling' }, // TODO: EN translation
      { slug: 'refund-policy', titleEs: 'Política de Reembolsos', titleRu: 'Политика возвратов', titleEn: 'Refund Policy', filePath: 'legal/refund-policy.md', pdfSlug: 'legal-refund-policy' }, // TODO: EN translation
      { slug: 'affiliate-terms', titleEs: 'Términos de Afiliados', titleRu: 'Условия партнёрской программы', titleEn: 'Affiliate Terms', filePath: 'legal/affiliate-terms.md', pdfSlug: 'legal-affiliate-terms' }, // TODO: EN translation
      { slug: 'terms-of-use', titleEs: 'Terms of Use (Uso del Sitio)', titleRu: 'Условия использования сайта', titleEn: 'Terms of Use (Website)', filePath: 'legal/terms-of-use.md', pdfSlug: 'legal-terms-of-use' }, // TODO: EN translation
      { slug: 'bonus-terms', titleEs: 'Términos de Bonos y Promociones', titleRu: 'Условия бонусов и промоакций', titleEn: 'Bonus & Promotions Terms', filePath: 'legal/bonus-terms.md', pdfSlug: 'legal-bonus-terms' }, // TODO: EN translation
      { slug: 'cookies-policy', titleEs: 'Política de Cookies', titleRu: 'Политика cookies', titleEn: 'Cookies Policy', filePath: 'legal/cookies-policy.md', pdfSlug: 'legal-cookies-policy' }, // TODO: EN translation
      { slug: 'conflicts-of-interest', titleEs: 'Conflictos de Interés', titleRu: 'Конфликт интересов', titleEn: 'Conflicts of Interest', filePath: 'legal/conflicts-of-interest.md', pdfSlug: 'legal-conflicts-of-interest' }, // TODO: EN translation
      { slug: 'disclaimers-communications', titleEs: 'Disclaimers y Comunicaciones', titleRu: 'Disclaimers и коммуникации', titleEn: 'Disclaimers & Communications', filePath: 'legal/disclaimers-communications.md', pdfSlug: 'legal-disclaimers-communications' }, // TODO: EN translation
      { slug: 'vault-yield-terms', titleEs: 'Vault Yield Terms', titleRu: 'Условия Vault Yield', titleEn: 'Vault Yield Terms', filePath: 'legal/vault-yield-terms.md', pdfSlug: 'legal-vault-yield-terms' }, // TODO: EN translation
    ],
  },
  {
    id: 'executive',
    nameEs: '🔒 Executive (Owners)',
    nameRu: '🔒 Executive (Владельцы)',
    nameEn: '🔒 Executive (Owners)', // TODO: EN translation
    order: 99,
    documents: [
      { slug: 'panorama-ejecutivo', titleEs: 'Panorama Ejecutivo — Operar un Broker', titleRu: 'Исполнительный обзор — Управление брокером', titleEn: 'Executive Overview — Running a Broker', filePath: 'executive/panorama-ejecutivo.md', pdfSlug: 'executive-panorama' }, // TODO: EN translation
      { slug: 'wallet-structure-neomaaa', titleEs: 'Wallet Structure NEOMAAA (Setup Específico)', titleRu: 'Структура кошельков NEOMAAA', titleEn: 'NEOMAAA Wallet Structure (Specific Setup)', filePath: 'executive/wallet-structure-neomaaa.md', pdfSlug: 'executive-wallets-neomaaa' }, // TODO: EN translation
      { slug: 'unit-economics-broker', titleEs: 'Unit Economics — Cómo Gana Dinero un Broker', titleRu: 'Unit Economics — Как зарабатывает брокер', titleEn: 'Unit Economics — How a Broker Makes Money', filePath: 'executive/unit-economics-broker.md', pdfSlug: 'executive-unit-economics' }, // TODO: EN translation
      { slug: 'financial-controls', titleEs: 'Controles Financieros Ejecutivos', titleRu: 'Исполнительные финансовые контроли', titleEn: 'Executive Financial Controls', filePath: 'executive/financial-controls.md', pdfSlug: 'executive-financial-controls' }, // TODO: EN translation
      { slug: 'risk-management-owner', titleEs: 'Risk Management — Vista del Owner', titleRu: 'Управление рисками — взгляд владельца', titleEn: 'Risk Management — Owner View', filePath: 'executive/risk-management-owner.md', pdfSlug: 'executive-risk-management' }, // TODO: EN translation
      { slug: 'liquidity-providers-b2b', titleEs: 'Liquidity Providers — Relación B2B Estratégica', titleRu: 'Поставщики ликвидности — B2B стратегия', titleEn: 'Liquidity Providers — Strategic B2B Relationship', filePath: 'executive/liquidity-providers-b2b.md', pdfSlug: 'executive-liquidity-providers' }, // TODO: EN translation
      { slug: 'escalamiento-y-crecimiento', titleEs: 'Escalamiento y Crecimiento Sostenible', titleRu: 'Масштабирование и устойчивый рост', titleEn: 'Scaling & Sustainable Growth', filePath: 'executive/escalamiento-y-crecimiento.md', pdfSlug: 'executive-escalamiento' }, // TODO: EN translation
      { slug: 'ab-book-policy', titleEs: 'Política A-Book / B-Book (Interno)', titleRu: 'Политика A-Book / B-Book (Внутр.)', titleEn: 'A-Book / B-Book Policy (Internal)', filePath: 'executive/ab-book-policy.md', pdfSlug: 'executive-ab-book-policy' },
      { slug: 'modelo-financiero-partners', titleEs: 'Modelo Financiero — Programa Partners', titleRu: 'Финансовая модель — программа партнеров', titleEn: 'Financial Model — Partners Program', filePath: 'executive/modelo-financiero-partners.md', pdfSlug: 'executive-modelo-financiero-partners' },
    ],
  },
];

export function getSectionById(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}

export function getDocByPath(sectionId: string, slug: string): DocMeta | undefined {
  const section = getSectionById(sectionId);
  return section?.documents.find((d) => d.slug === slug);
}

export function getAllDocs(): { section: Section; doc: DocMeta }[] {
  return SECTIONS.flatMap((s) => s.documents.map((d) => ({ section: s, doc: d })));
}

/**
 * Resolve a section display name for the given language. EN falls back to ES
 * when `nameEn` is missing (phase-1 infrastructure: titles may not be fully
 * translated yet).
 */
export function getSectionName(section: Section, lang: Lang): string {
  if (lang === 'ru') return section.nameRu;
  if (lang === 'en') return section.nameEn || section.nameEs;
  return section.nameEs;
}

/**
 * Resolve a document title for the given language. EN falls back to ES when
 * `titleEn` is missing.
 */
export function getDocTitle(doc: DocMeta, lang: Lang): string {
  if (lang === 'ru') return doc.titleRu;
  if (lang === 'en') return doc.titleEn || doc.titleEs;
  return doc.titleEs;
}
