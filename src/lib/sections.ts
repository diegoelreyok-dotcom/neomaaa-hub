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
    id: 'encyclopedia',
    nameEs: 'Enciclopedia',
    nameRu: 'Энциклопедия',
    order: 8,
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
