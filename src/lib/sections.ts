import { Section, DocMeta } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'launch',
    nameEs: 'Master Checklist',
    nameRu: 'Мастер-чеклист',
    order: 0,
    documents: [
      { slug: 'checklist', titleEs: 'Master Checklist Pre Go-Live', titleRu: 'Мастер-чеклист запуска', filePath: 'launch/checklist.md', pdfSlug: 'launch-checklist' },
    ],
  },
  {
    id: 'sales',
    nameEs: 'Ventas',
    nameRu: 'Продажи',
    order: 1,
    documents: [
      { slug: 'plan-contacto', titleEs: 'Plan de Contacto — Etapa 1', titleRu: 'План контактов — Этап 1', filePath: 'sales/plan-contacto.md', pdfSlug: 'sales-plan-contacto' },
      { slug: 'training', titleEs: 'Training Program (6 sem)', titleRu: 'Программа обучения (6 нед)', filePath: 'sales/training.md', pdfSlug: 'sales-training' },
      { slug: 'commissions', titleEs: 'Esquema de Comisiones', titleRu: 'Схема комиссий', filePath: 'sales/commissions.md', pdfSlug: 'sales-commissions' },
      { slug: 'objections-broker', titleEs: 'Objeciones Broker', titleRu: 'Возражения клиентов', filePath: 'sales/objections-broker.md', pdfSlug: 'sales-objections-broker' },
      { slug: 'faq-ventas', titleEs: 'FAQ Ventas', titleRu: 'FAQ отдела продаж', filePath: 'sales/faq-ventas.md', pdfSlug: 'sales-faq-ventas' },
      { slug: 'primer-contacto', titleEs: 'Primer Contacto', titleRu: 'Первый контакт', filePath: 'sales/primer-contacto.md', pdfSlug: 'sales-primer-contacto' },
    ],
  },
  {
    id: 'compliance',
    nameEs: 'Compliance',
    nameRu: 'Комплаенс',
    order: 2,
    documents: [
      { slug: 'workflow', titleEs: 'Workflow Operativo', titleRu: 'Операционный workflow', filePath: 'compliance/workflow.md', pdfSlug: 'compliance-workflow' },
      { slug: 'onboarding', titleEs: 'Client Onboarding', titleRu: 'Онбординг клиентов', filePath: 'compliance/onboarding.md', pdfSlug: 'compliance-onboarding' },
      { slug: 'ab-book-policy', titleEs: 'Politica A-Book / B-Book', titleRu: 'Политика A-Book / B-Book', filePath: 'compliance/ab-book-policy.md', pdfSlug: 'compliance-ab-book-policy' },
      { slug: 'manual-susana', titleEs: 'Manual Compliance', titleRu: 'Руководство по комплаенсу', filePath: 'compliance/manual-susana.md', pdfSlug: 'compliance-manual-susana' },
      { slug: 'workflow-sales-compliance', titleEs: 'Workflow Sales-Compliance', titleRu: 'Workflow Продажи-Комплаенс', filePath: 'compliance/workflow-sales-compliance.md', pdfSlug: 'compliance-workflow-sales-compliance' },
      { slug: 'proceso-kyc-sumsub', titleEs: 'Proceso KYC Completo con Sumsub', titleRu: 'Полный процесс KYC с Sumsub', filePath: 'compliance/proceso-kyc-sumsub.md', pdfSlug: 'compliance-proceso-kyc-sumsub' },
      { slug: 'screening-sanciones', titleEs: 'Screening de Sanciones', titleRu: 'Скрининг санкций', filePath: 'compliance/screening-sanciones.md', pdfSlug: 'compliance-screening-sanciones' },
      { slug: 'registro-compliance', titleEs: 'Registro y Documentacion', titleRu: 'Реестр и документация', filePath: 'compliance/registro-compliance.md', pdfSlug: 'compliance-registro-compliance' },
      { slug: 'mejores-practicas-compliance', titleEs: 'Mejores Practicas Compliance', titleRu: 'Лучшие практики комплаенса', filePath: 'compliance/mejores-practicas-compliance.md', pdfSlug: 'compliance-mejores-practicas' },
      { slug: 'expansion-regulatoria', titleEs: 'Plan de Expansion Regulatoria', titleRu: 'План регуляторного расширения', filePath: 'compliance/expansion-regulatoria.md', pdfSlug: 'compliance-expansion-regulatoria' },
    ],
  },
  {
    id: 'support',
    nameEs: 'Soporte',
    nameRu: 'Поддержка',
    order: 3,
    documents: [
      { slug: 'playbook', titleEs: 'Support Playbook', titleRu: 'Playbook поддержки', filePath: 'support/playbook.md', pdfSlug: 'support-playbook' },
      { slug: 'enciclopedia-soporte', titleEs: 'Enciclopedia de Soporte', titleRu: 'Энциклопедия поддержки', filePath: 'support/enciclopedia-soporte.md', pdfSlug: 'support-enciclopedia-soporte' },
      { slug: 'guia-tono-comunicacion', titleEs: 'Guia de Tono y Comunicacion', titleRu: 'Руководство по тону коммуникации', filePath: 'support/guia-tono-comunicacion.md', pdfSlug: 'support-guia-tono-comunicacion' },
      { slug: 'manejo-quejas', titleEs: 'Manejo de Quejas', titleRu: 'Управление жалобами', filePath: 'support/manejo-quejas.md', pdfSlug: 'support-manejo-quejas' },
      { slug: 'atencion-vip', titleEs: 'Atencion VIP', titleRu: 'VIP обслуживание', filePath: 'support/atencion-vip.md', pdfSlug: 'support-atencion-vip' },
      { slug: 'gestion-tickets', titleEs: 'Gestion de Tickets', titleRu: 'Управление тикетами', filePath: 'support/gestion-tickets.md', pdfSlug: 'support-gestion-tickets' },
    ],
  },
  {
    id: 'operations',
    nameEs: 'Operaciones',
    nameRu: 'Операции',
    order: 4,
    documents: [
      { slug: 'deposits', titleEs: 'Depositos y Retiros', titleRu: 'Депозиты и выводы', filePath: 'operations/deposits.md', pdfSlug: 'operations-deposits' },
      { slug: 'go-live-runbook', titleEs: 'Go-Live Runbook', titleRu: 'Go-Live Runbook', filePath: 'operations/go-live-runbook.md', pdfSlug: 'operations-go-live-runbook' },
      { slug: 'faq-interno', titleEs: 'FAQ Interno', titleRu: 'Внутренний FAQ', filePath: 'operations/faq-interno.md', pdfSlug: 'operations-faq-interno' },
    ],
  },
  {
    id: 'marketing',
    nameEs: 'Marketing',
    nameRu: 'Маркетинг',
    order: 5,
    documents: [
      { slug: 'retencion-broker', titleEs: 'Estrategia Retencion', titleRu: 'Стратегия удержания', filePath: 'marketing/retencion-broker.md', pdfSlug: 'marketing-retencion-broker' },
      { slug: 'funnel-broker', titleEs: 'Funnel de Conversion', titleRu: 'Воронка конверсии', filePath: 'marketing/funnel-broker.md', pdfSlug: 'marketing-funnel-broker' },
      { slug: 'copy-broker', titleEs: 'Copy y Mensajes', titleRu: 'Копирайтинг', filePath: 'marketing/copy-broker.md', pdfSlug: 'marketing-copy-broker' },
      { slug: 'competidores-broker', titleEs: 'Analisis Competidores', titleRu: 'Конкурентный анализ', filePath: 'marketing/competidores-broker.md', pdfSlug: 'marketing-competidores-broker' },
    ],
  },
  {
    id: 'hiring',
    nameEs: 'Hiring',
    nameRu: 'Найм персонала',
    order: 6,
    documents: [
      { slug: 'finance-manager', titleEs: 'Finance Manager', titleRu: 'Финансовый менеджер', filePath: 'hiring/finance-manager.md', pdfSlug: 'hiring-finance-manager' },
      { slug: 'support-es', titleEs: 'Support Agent ES', titleRu: 'Агент поддержки (ES)', filePath: 'hiring/support-es.md', pdfSlug: 'hiring-support-es' },
      { slug: 'support-en', titleEs: 'Support Agent EN', titleRu: 'Агент поддержки (EN)', filePath: 'hiring/support-en.md', pdfSlug: 'hiring-support-en' },
      { slug: 'marketing-manager', titleEs: 'Marketing Manager', titleRu: 'Менеджер по маркетингу', filePath: 'hiring/marketing-manager.md', pdfSlug: 'hiring-marketing-manager' },
    ],
  },
  {
    id: 'partners',
    nameEs: 'Partners',
    nameRu: 'Партнёры',
    order: 7,
    documents: [
      { slug: 'programa-completo', titleEs: 'Programa Completo', titleRu: 'Полная программа', filePath: 'partners/programa-completo.md', pdfSlug: 'partners-programa-completo' },
      { slug: 'modelo-financiero', titleEs: 'Modelo Financiero', titleRu: 'Финансовая модель', filePath: 'partners/modelo-financiero.md', pdfSlug: 'partners-modelo-financiero' },
      { slug: 'guia-operativa', titleEs: 'Guia Operativa Partners', titleRu: 'Операционное руководство', filePath: 'partners/guia-operativa.md', pdfSlug: 'partners-guia-operativa' },
    ],
  },
  {
    id: 'legal',
    nameEs: 'Legal',
    nameRu: 'Юридические документы',
    order: 8,
    documents: [
      { slug: 'risk-disclosure', titleEs: 'Divulgacion de Riesgos', titleRu: 'Раскрытие рисков', filePath: 'legal/risk-disclosure.md', pdfSlug: 'legal-risk-disclosure' },
      { slug: 'terms-conditions', titleEs: 'Terminos y Condiciones', titleRu: 'Условия использования', filePath: 'legal/terms-conditions.md', pdfSlug: 'legal-terms-conditions' },
      { slug: 'privacy-policy', titleEs: 'Politica de Privacidad', titleRu: 'Политика конфиденциальности', filePath: 'legal/privacy-policy.md', pdfSlug: 'legal-privacy-policy' },
      { slug: 'client-agreement', titleEs: 'Acuerdo del Cliente', titleRu: 'Клиентское соглашение', filePath: 'legal/client-agreement.md', pdfSlug: 'legal-client-agreement' },
      { slug: 'aml-kyc-policy', titleEs: 'Politica AML/KYC', titleRu: 'Политика AML/KYC', filePath: 'legal/aml-kyc-policy.md', pdfSlug: 'legal-aml-kyc-policy' },
      { slug: 'order-execution-policy', titleEs: 'Politica de Ejecucion', titleRu: 'Политика исполнения ордеров', filePath: 'legal/order-execution-policy.md', pdfSlug: 'legal-order-execution-policy' },
      { slug: 'complaint-handling', titleEs: 'Manejo de Quejas', titleRu: 'Обработка жалоб', filePath: 'legal/complaint-handling.md', pdfSlug: 'legal-complaint-handling' },
      { slug: 'refund-policy', titleEs: 'Politica de Reembolsos', titleRu: 'Политика возвратов', filePath: 'legal/refund-policy.md', pdfSlug: 'legal-refund-policy' },
      { slug: 'affiliate-terms', titleEs: 'Terminos de Afiliados', titleRu: 'Условия партнёрской программы', filePath: 'legal/affiliate-terms.md', pdfSlug: 'legal-affiliate-terms' },
    ],
  },
  {
    id: 'encyclopedia',
    nameEs: 'Enciclopedia',
    nameRu: 'Энциклопедия',
    order: 9,
    documents: [
      { slug: 'abc', titleEs: 'ABC del Broker', titleRu: 'ABC брокера', filePath: 'encyclopedia/abc.md', pdfSlug: 'encyclopedia-abc' },
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
