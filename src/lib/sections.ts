import { Section, DocMeta } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'launch',
    nameEs: 'Master Checklist',
    nameRu: 'Мастер-чеклист',
    order: 0,
    documents: [
      { slug: 'checklist', titleEs: 'Master Checklist Pre Go-Live', titleRu: 'Мастер-чеклист запуска', filePath: 'launch/checklist.md', pdfSlug: 'launch-checklist' },
      { slug: 'post-launch-playbook', titleEs: 'Post-Launch Playbook (Semanas 1-4)', titleRu: 'Playbook после запуска (недели 1-4)', filePath: 'launch/post-launch-playbook.md', pdfSlug: 'launch-post-launch-playbook' },
    ],
  },
  {
    id: 'hiring',
    nameEs: 'Hiring',
    nameRu: 'Найм персонала',
    order: 1,
    documents: [
      { slug: 'onboarding-5-dias', titleEs: 'Onboarding NEOMAAA en 5 días', titleRu: 'Онбординг NEOMAAA — 5 дней', filePath: 'hiring/onboarding-5-dias.md', pdfSlug: 'hiring-onboarding-5-dias' },
      { slug: 'roles-broker-completo', titleEs: 'Roles de un Broker — Estructura Completa', titleRu: 'Роли в брокере — Полная структура', filePath: 'hiring/roles-broker-completo.md', pdfSlug: 'hiring-roles-broker-completo' },
      { slug: 'finance-manager', titleEs: 'Finance Manager', titleRu: 'Финансовый менеджер', filePath: 'hiring/finance-manager.md', pdfSlug: 'hiring-finance-manager' },
      { slug: 'support-es', titleEs: 'Support Agent ES', titleRu: 'Агент поддержки (ES)', filePath: 'hiring/support-es.md', pdfSlug: 'hiring-support-es' },
      { slug: 'support-en', titleEs: 'Support Agent EN', titleRu: 'Агент поддержки (EN)', filePath: 'hiring/support-en.md', pdfSlug: 'hiring-support-en' },
      { slug: 'marketing-manager', titleEs: 'Marketing Manager', titleRu: 'Менеджер по маркетингу', filePath: 'hiring/marketing-manager.md', pdfSlug: 'hiring-marketing-manager' },
    ],
  },
  {
    id: 'encyclopedia',
    nameEs: 'Enciclopedia',
    nameRu: 'Энциклопедия',
    order: 2,
    documents: [
      { slug: 'abc', titleEs: 'ABC del Broker', titleRu: 'ABC брокера', filePath: 'encyclopedia/abc.md', pdfSlug: 'encyclopedia-abc' },
      { slug: 'glosario-trilingue', titleEs: 'Glosario Trilingüe ES/EN/RU', titleRu: 'Трёхъязычный глоссарий ES/EN/RU', filePath: 'encyclopedia/glosario-trilingue.md', pdfSlug: 'encyclopedia-glosario-trilingue' },
      { slug: 'formacion-precio', titleEs: 'Formación del Precio de Mercado', titleRu: 'Формирование рыночной цены', filePath: 'encyclopedia/formacion-precio.md', pdfSlug: 'encyclopedia-formacion-precio' },
      { slug: 'noticias-impacto', titleEs: 'Noticias Económicas e Impacto', titleRu: 'Экономические новости и их влияние', filePath: 'encyclopedia/noticias-impacto.md', pdfSlug: 'encyclopedia-noticias-impacto' },
      { slug: 'productos-mt5', titleEs: 'MT5 y Productos NEOMAAA', titleRu: 'MT5 и продукты NEOMAAA', filePath: 'encyclopedia/productos-mt5.md', pdfSlug: 'encyclopedia-productos-mt5' },
      { slug: 'regulacion-jurisdicciones', titleEs: 'Regulación y Jurisdicciones', titleRu: 'Регулирование и юрисдикции', filePath: 'encyclopedia/regulacion-jurisdicciones.md', pdfSlug: 'encyclopedia-regulacion-jurisdicciones' },
      { slug: 'psicologia-trader', titleEs: 'Psicología del Trader Retail', titleRu: 'Психология розничного трейдера', filePath: 'encyclopedia/psicologia-trader.md', pdfSlug: 'encyclopedia-psicologia-trader' },
      { slug: 'knowledge-base-api', titleEs: 'Knowledge Base API', titleRu: 'Knowledge Base API', filePath: 'encyclopedia/knowledge-base-api.md', pdfSlug: 'encyclopedia-knowledge-base-api' },
    ],
  },
  {
    id: 'sales',
    nameEs: 'Ventas',
    nameRu: 'Продажи',
    order: 3,
    documents: [
      { slug: 'training', titleEs: 'Training Program (6 sem)', titleRu: 'Программа обучения (6 нед)', filePath: 'sales/training.md', pdfSlug: 'sales-training' },
      { slug: 'plan-contacto', titleEs: 'Plan de Contacto — Etapa 1', titleRu: 'План контактов — Этап 1', filePath: 'sales/plan-contacto.md', pdfSlug: 'sales-plan-contacto' },
      { slug: 'primer-contacto', titleEs: 'Primer Contacto', titleRu: 'Первый контакт', filePath: 'sales/primer-contacto.md', pdfSlug: 'sales-primer-contacto' },
      { slug: 'faq-ventas', titleEs: 'FAQ Ventas', titleRu: 'FAQ отдела продаж', filePath: 'sales/faq-ventas.md', pdfSlug: 'sales-faq-ventas' },
      { slug: 'commissions', titleEs: 'Esquema de Comisiones', titleRu: 'Схема комиссий', filePath: 'sales/commissions.md', pdfSlug: 'sales-commissions' },
      { slug: 'objections-broker', titleEs: 'Objeciones Broker', titleRu: 'Возражения клиентов', filePath: 'sales/objections-broker.md', pdfSlug: 'sales-objections-broker' },
      { slug: 'guia-copytrading-mql5', titleEs: 'Guía Copy Trading MQL5 (paso a paso)', titleRu: 'Руководство Copy Trading MQL5 (пошагово)', filePath: 'sales/guia-copytrading-mql5.md', pdfSlug: 'sales-guia-copytrading-mql5' },
    ],
  },
  {
    id: 'support',
    nameEs: 'Soporte',
    nameRu: 'Поддержка',
    order: 4,
    documents: [
      { slug: 'playbook', titleEs: 'Support Playbook', titleRu: 'Playbook поддержки', filePath: 'support/playbook.md', pdfSlug: 'support-playbook' },
      { slug: 'enciclopedia-soporte', titleEs: 'Enciclopedia de Soporte', titleRu: 'Энциклопедия поддержки', filePath: 'support/enciclopedia-soporte.md', pdfSlug: 'support-enciclopedia-soporte' },
      { slug: 'guia-tono-comunicacion', titleEs: 'Guía de Tono y Comunicación', titleRu: 'Руководство по тону коммуникации', filePath: 'support/guia-tono-comunicacion.md', pdfSlug: 'support-guia-tono-comunicacion' },
      { slug: 'manejo-quejas', titleEs: 'Manejo de Quejas', titleRu: 'Управление жалобами', filePath: 'support/manejo-quejas.md', pdfSlug: 'support-manejo-quejas' },
      { slug: 'atencion-vip', titleEs: 'Atención VIP', titleRu: 'VIP обслуживание', filePath: 'support/atencion-vip.md', pdfSlug: 'support-atencion-vip' },
      { slug: 'gestion-tickets', titleEs: 'Gestión de Tickets', titleRu: 'Управление тикетами', filePath: 'support/gestion-tickets.md', pdfSlug: 'support-gestion-tickets' },
    ],
  },
  {
    id: 'compliance',
    nameEs: 'Compliance',
    nameRu: 'Комплаенс',
    order: 5,
    documents: [
      { slug: 'susana-playbook', titleEs: '📋 Playbook Susana (Guía Diaria)', titleRu: '📋 Playbook Susana (ежедневно)', filePath: 'compliance/susana-playbook.md', pdfSlug: 'compliance-susana-playbook' },
      { slug: 'workflow', titleEs: 'Workflow Operativo', titleRu: 'Операционный workflow', filePath: 'compliance/workflow.md', pdfSlug: 'compliance-workflow' },
      { slug: 'risk-matrix', titleEs: 'Matriz de Riesgo AML/KYC', titleRu: 'Матрица риска AML/KYC', filePath: 'compliance/risk-matrix.md', pdfSlug: 'compliance-risk-matrix' },
      { slug: 'edd-triggers', titleEs: 'EDD — Enhanced Due Diligence', titleRu: 'EDD — Улучшенная проверка', filePath: 'compliance/edd-triggers.md', pdfSlug: 'compliance-edd-triggers' },
      { slug: 'pep-sanctions-sop', titleEs: 'PEP + Sanctions SOP', titleRu: 'PEP + Санкции SOP', filePath: 'compliance/pep-sanctions-sop.md', pdfSlug: 'compliance-pep-sanctions-sop' },
      { slug: 'sar-reporting', titleEs: 'SAR — Reporte Actividad Sospechosa', titleRu: 'SAR — Отчёт о подозрительной активности', filePath: 'compliance/sar-reporting.md', pdfSlug: 'compliance-sar-reporting' },
      { slug: 'ongoing-monitoring-sop', titleEs: 'Monitoreo Continuo SOP', titleRu: 'Постоянный мониторинг SOP', filePath: 'compliance/ongoing-monitoring-sop.md', pdfSlug: 'compliance-ongoing-monitoring-sop' },
      { slug: 'compliance-calendar', titleEs: 'Calendario de Compliance', titleRu: 'Календарь комплаенса', filePath: 'compliance/compliance-calendar.md', pdfSlug: 'compliance-compliance-calendar' },
      { slug: 'onboarding', titleEs: 'Client Onboarding', titleRu: 'Онбординг клиентов', filePath: 'compliance/onboarding.md', pdfSlug: 'compliance-onboarding' },
      { slug: 'manual-susana', titleEs: 'Manual Compliance', titleRu: 'Руководство по комплаенсу', filePath: 'compliance/manual-susana.md', pdfSlug: 'compliance-manual-susana' },
      { slug: 'ab-book-policy', titleEs: 'Política A-Book / B-Book', titleRu: 'Политика A-Book / B-Book', filePath: 'compliance/ab-book-policy.md', pdfSlug: 'compliance-ab-book-policy' },
      { slug: 'workflow-sales-compliance', titleEs: 'Workflow Sales-Compliance', titleRu: 'Workflow Продажи-Комплаенс', filePath: 'compliance/workflow-sales-compliance.md', pdfSlug: 'compliance-workflow-sales-compliance' },
      { slug: 'proceso-kyc-sumsub', titleEs: 'Proceso KYC Completo con Sumsub', titleRu: 'Полный процесс KYC с Sumsub', filePath: 'compliance/proceso-kyc-sumsub.md', pdfSlug: 'compliance-proceso-kyc-sumsub' },
      { slug: 'screening-sanciones', titleEs: 'Screening de Sanciones', titleRu: 'Скрининг санкций', filePath: 'compliance/screening-sanciones.md', pdfSlug: 'compliance-screening-sanciones' },
      { slug: 'registro-compliance', titleEs: 'Registro y Documentación', titleRu: 'Реестр и документация', filePath: 'compliance/registro-compliance.md', pdfSlug: 'compliance-registro-compliance' },
      { slug: 'mejores-practicas-compliance', titleEs: 'Mejores Prácticas Compliance', titleRu: 'Лучшие практики комплаенса', filePath: 'compliance/mejores-practicas-compliance.md', pdfSlug: 'compliance-mejores-practicas' },
      { slug: 'expansion-regulatoria', titleEs: 'Plan de Expansión Regulatoria', titleRu: 'План регуляторного расширения', filePath: 'compliance/expansion-regulatoria.md', pdfSlug: 'compliance-expansion-regulatoria' },
    ],
  },
  {
    id: 'operations',
    nameEs: 'Operaciones',
    nameRu: 'Операции',
    order: 6,
    documents: [
      { slug: 'go-live-runbook', titleEs: 'Go-Live Runbook', titleRu: 'Go-Live Runbook', filePath: 'operations/go-live-runbook.md', pdfSlug: 'operations-go-live-runbook' },
      { slug: 'faq-interno', titleEs: 'FAQ Interno', titleRu: 'Внутренний FAQ', filePath: 'operations/faq-interno.md', pdfSlug: 'operations-faq-interno' },
      { slug: 'deposits', titleEs: 'Depósitos y Retiros', titleRu: 'Депозиты и выводы', filePath: 'operations/deposits.md', pdfSlug: 'operations-deposits' },
      { slug: 'psps-explicados', titleEs: 'PSPs Explicados', titleRu: 'PSP объяснение', filePath: 'operations/psps-explicados.md', pdfSlug: 'operations-psps-explicados' },
      { slug: 'dealing-desk-publico', titleEs: 'Dealing Desk — Ejecución NEOMAAA', titleRu: 'Dealing Desk — исполнение NEOMAAA', filePath: 'operations/dealing-desk-publico.md', pdfSlug: 'operations-dealing-desk-publico' },
      { slug: 'manual-crisis', titleEs: 'Manual de Crisis', titleRu: 'Руководство по кризисам', filePath: 'operations/manual-crisis.md', pdfSlug: 'operations-manual-crisis' },
    ],
  },
  {
    id: 'marketing',
    nameEs: 'Marketing',
    nameRu: 'Маркетинг',
    order: 7,
    documents: [
      { slug: 'icps-por-mercado', titleEs: 'ICPs por Mercado', titleRu: 'ICP по рынкам', filePath: 'marketing/icps-por-mercado.md', pdfSlug: 'marketing-icps-por-mercado' },
      { slug: 'funnel-broker', titleEs: 'Funnel de Conversión', titleRu: 'Воронка конверсии', filePath: 'marketing/funnel-broker.md', pdfSlug: 'marketing-funnel-broker' },
      { slug: 'retencion-broker', titleEs: 'Estrategia Retención', titleRu: 'Стратегия удержания', filePath: 'marketing/retencion-broker.md', pdfSlug: 'marketing-retencion-broker' },
      { slug: 'copy-broker', titleEs: 'Copy y Mensajes', titleRu: 'Копирайтинг', filePath: 'marketing/copy-broker.md', pdfSlug: 'marketing-copy-broker' },
      { slug: 'competidores-broker', titleEs: 'Análisis Competidores', titleRu: 'Конкурентный анализ', filePath: 'marketing/competidores-broker.md', pdfSlug: 'marketing-competidores-broker' },
      { slug: 'competidores-deep-dive', titleEs: 'Competidores — Battle Cards', titleRu: 'Конкуренты — Battle Cards', filePath: 'marketing/competidores-deep-dive.md', pdfSlug: 'marketing-competidores-deep-dive' },
    ],
  },
  {
    id: 'partners',
    nameEs: 'Partners',
    nameRu: 'Партнёры',
    order: 8,
    documents: [
      { slug: 'programa-completo', titleEs: 'Programa Completo', titleRu: 'Полная программа', filePath: 'partners/programa-completo.md', pdfSlug: 'partners-programa-completo' },
      { slug: 'modelo-financiero', titleEs: 'Modelo Financiero', titleRu: 'Финансовая модель', filePath: 'partners/modelo-financiero.md', pdfSlug: 'partners-modelo-financiero' },
      { slug: 'guia-operativa', titleEs: 'Guía Operativa Partners', titleRu: 'Операционное руководство', filePath: 'partners/guia-operativa.md', pdfSlug: 'partners-guia-operativa' },
      { slug: 'playbook-ib', titleEs: 'Playbook del IB', titleRu: 'Playbook для IB', filePath: 'partners/playbook-ib.md', pdfSlug: 'partners-playbook-ib' },
    ],
  },
  {
    id: 'legal',
    nameEs: 'Documentos Legales',
    nameRu: 'Юридические документы',
    order: 98,
    documents: [
      { slug: 'risk-disclosure', titleEs: 'Divulgación de Riesgos', titleRu: 'Раскрытие рисков', filePath: 'legal/risk-disclosure.md', pdfSlug: 'legal-risk-disclosure' },
      { slug: 'terms-conditions', titleEs: 'Términos y Condiciones', titleRu: 'Условия использования', filePath: 'legal/terms-conditions.md', pdfSlug: 'legal-terms-conditions' },
      { slug: 'privacy-policy', titleEs: 'Política de Privacidad', titleRu: 'Политика конфиденциальности', filePath: 'legal/privacy-policy.md', pdfSlug: 'legal-privacy-policy' },
      { slug: 'client-agreement', titleEs: 'Acuerdo del Cliente', titleRu: 'Клиентское соглашение', filePath: 'legal/client-agreement.md', pdfSlug: 'legal-client-agreement' },
      { slug: 'aml-kyc-policy', titleEs: 'Política AML/KYC', titleRu: 'Политика AML/KYC', filePath: 'legal/aml-kyc-policy.md', pdfSlug: 'legal-aml-kyc-policy' },
      { slug: 'order-execution-policy', titleEs: 'Política de Ejecución', titleRu: 'Политика исполнения ордеров', filePath: 'legal/order-execution-policy.md', pdfSlug: 'legal-order-execution-policy' },
      { slug: 'complaint-handling', titleEs: 'Manejo de Quejas', titleRu: 'Обработка жалоб', filePath: 'legal/complaint-handling.md', pdfSlug: 'legal-complaint-handling' },
      { slug: 'refund-policy', titleEs: 'Política de Reembolsos', titleRu: 'Политика возвратов', filePath: 'legal/refund-policy.md', pdfSlug: 'legal-refund-policy' },
      { slug: 'affiliate-terms', titleEs: 'Términos de Afiliados', titleRu: 'Условия партнёрской программы', filePath: 'legal/affiliate-terms.md', pdfSlug: 'legal-affiliate-terms' },
    ],
  },
  {
    id: 'executive',
    nameEs: '🔒 Executive (Owners)',
    nameRu: '🔒 Executive (Владельцы)',
    order: 99,
    documents: [
      { slug: 'panorama-ejecutivo', titleEs: 'Panorama Ejecutivo — Operar un Broker', titleRu: 'Исполнительный обзор — Управление брокером', filePath: 'executive/panorama-ejecutivo.md', pdfSlug: 'executive-panorama' },
      { slug: 'treasury-management', titleEs: 'Treasury Management — Multi-Wallet Strategy', titleRu: 'Treasury Management — Стратегия мульти-кошелька', filePath: 'executive/treasury-management.md', pdfSlug: 'executive-treasury' },
      { slug: 'unit-economics-broker', titleEs: 'Unit Economics — Cómo Gana Dinero un Broker', titleRu: 'Unit Economics — Как зарабатывает брокер', filePath: 'executive/unit-economics-broker.md', pdfSlug: 'executive-unit-economics' },
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
