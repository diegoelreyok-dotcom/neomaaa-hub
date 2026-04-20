/**
 * Learning Paths — "Duolingo path" suggested reading order per role.
 *
 * Each path has several phases. Each phase has a list of docs (docPath format:
 * "{section}/{slug}", matching ReadProgress.documentPath and Certificate.docPath).
 *
 * A phase is unlocked when the previous phase reached its `requiredForNext`
 * count of completed docs. A doc counts as "completed" when the user has a
 * cert for it OR their ReadProgress has `completed: true`.
 *
 * When all docs of all phases are completed, the user earns a role badge
 * (separate from per-doc certificates).
 */

export interface LearningPathPhase {
  id: string;
  titleEs: string;
  titleRu: string;
  titleEn?: string;
  descriptionEs: string;
  descriptionRu: string;
  descriptionEn?: string;
  /** Ordered list of docPaths, e.g. ["encyclopedia/abc", "sales/training"]. */
  docs: string[];
  /** How many docs of this phase must be completed before the next unlocks. */
  requiredForNext: number;
}

export interface LearningPathBadge {
  titleEs: string;
  titleRu: string;
  titleEn?: string;
  descriptionEs: string;
  descriptionRu: string;
  descriptionEn?: string;
}

export interface LearningPath {
  roleId: string;
  titleEs: string;
  titleRu: string;
  titleEn?: string;
  descriptionEs: string;
  descriptionRu: string;
  descriptionEn?: string;
  estimatedHours: number;
  phases: LearningPathPhase[];
  finalBadge: LearningPathBadge;
}

/** Convenience getter. Returns total distinct docs across all phases. */
export function pathTotalDocs(path: LearningPath): number {
  const set = new Set<string>();
  for (const phase of path.phases) {
    for (const d of phase.docs) set.add(d);
  }
  return set.size;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

export const LEARNING_PATHS: Record<string, LearningPath> = {
  sales: {
    roleId: 'sales',
    titleEs: 'Ruta de Ventas NEOMAAA',
    titleRu: 'Путь Продажи NEOMAAA',
    titleEn: 'NEOMAAA Sales Path',
    descriptionEs: 'Todo lo que necesitas para vender NEOMAAA Markets con confianza: fundamentos del broker, tecnicas de venta, mercados, competencia y operaciones.',
    descriptionRu: 'Всё необходимое для уверенных продаж NEOMAAA Markets: основы брокера, техники продаж, рынки, конкуренты и операции.',
    descriptionEn: 'Everything you need to sell NEOMAAA Markets with confidence: broker fundamentals, sales techniques, markets, competition, and operations.',
    estimatedHours: 12,
    phases: [
      {
        id: 'fundamentals',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        titleEn: 'Broker Fundamentals',
        descriptionEs: 'Entende como funciona un broker, sus productos y su marco regulatorio antes de hablar con un cliente.',
        descriptionRu: 'Разберитесь, как работает брокер, его продукты и регулирование, прежде чем общаться с клиентом.',
        descriptionEn: 'Understand how a broker works, its products, and its regulatory framework before talking to a client.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/formacion-precio',
          'encyclopedia/productos-mt5',
          'encyclopedia/regulacion-jurisdicciones',
        ],
        requiredForNext: 4,
      },
      {
        id: 'sales-specific',
        titleEs: 'Tecnicas de Venta',
        titleRu: 'Техники продаж',
        titleEn: 'Sales Techniques',
        descriptionEs: 'El playbook de ventas: plan de contacto, primer llamado, objeciones, comisiones y FAQ.',
        descriptionRu: 'Playbook продаж: план контактов, первый звонок, возражения, комиссии и FAQ.',
        descriptionEn: 'The sales playbook: contact plan, first call, objections, commissions, and FAQ.',
        docs: [
          'sales/training',
          'sales/plan-contacto',
          'sales/primer-contacto',
          'sales/commissions',
          'sales/objections-broker',
          'sales/faq-ventas',
        ],
        requiredForNext: 6,
      },
      {
        id: 'market-mastery',
        titleEs: 'Mercados y Competencia',
        titleRu: 'Рынки и конкуренты',
        titleEn: 'Markets and Competition',
        descriptionEs: 'ICP por region, battle cards contra competidores, impacto de noticias y psicologia del trader.',
        descriptionRu: 'ICP по регионам, battle cards против конкурентов, влияние новостей и психология трейдера.',
        descriptionEn: 'ICP by region, battle cards against competitors, news impact, and trader psychology.',
        docs: [
          'marketing/icps-por-mercado',
          'marketing/competidores-deep-dive',
          'encyclopedia/psicologia-trader',
          'encyclopedia/noticias-impacto',
        ],
        requiredForNext: 4,
      },
      {
        id: 'ops-knowledge',
        titleEs: 'Operaciones y Compliance',
        titleRu: 'Операции и комплаенс',
        titleEn: 'Operations and Compliance',
        descriptionEs: 'Contexto operativo que un vendedor debe dominar: workflow de compliance, A-Book, dealing desk y PSPs.',
        descriptionRu: 'Операционный контекст, который должен знать продавец: workflow комплаенса, A-Book, dealing desk и PSPs.',
        descriptionEn: 'Operational context every salesperson must master: compliance workflow, A-Book, dealing desk, and PSPs.',
        docs: [
          'compliance/workflow',
          'compliance/ab-book-policy',
          'operations/dealing-desk-publico',
          'operations/psps-explicados',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Sales NEOMAAA',
      titleRu: 'Сертифицированный продавец NEOMAAA',
      titleEn: 'NEOMAAA Certified Sales',
      descriptionEs: 'Completaste la ruta completa de ventas. Dominas el producto, el pitch, el mercado y las operaciones.',
      descriptionRu: 'Вы прошли полный путь продаж. Вы знаете продукт, pitch, рынок и операции.',
      descriptionEn: 'You completed the full sales path. You master the product, the pitch, the market, and operations.',
    },
  },

  'support-role': {
    roleId: 'support-role',
    titleEs: 'Ruta de Soporte NEOMAAA',
    titleRu: 'Путь Поддержка NEOMAAA',
    titleEn: 'NEOMAAA Support Path',
    descriptionEs: 'Convertite en el primer punto de contacto que resuelve: producto, tono, tickets, crisis y operaciones.',
    descriptionRu: 'Станьте первой точкой контакта, которая решает: продукт, тон, тикеты, кризис и операции.',
    descriptionEn: 'Become the first point of contact that resolves: product, tone, tickets, crisis, and operations.',
    estimatedHours: 10,
    phases: [
      {
        id: 'foundations',
        titleEs: 'Fundamentos del Producto',
        titleRu: 'Основы продукта',
        titleEn: 'Product Fundamentals',
        descriptionEs: 'Que es un broker, como funciona el precio y MT5. Lo que un cliente te va a preguntar a diario.',
        descriptionRu: 'Что такое брокер, как формируется цена и MT5. То, что клиент спросит каждый день.',
        descriptionEn: 'What a broker is, how pricing works, and MT5. What clients will ask you every day.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/productos-mt5',
          'encyclopedia/formacion-precio',
          'encyclopedia/regulacion-jurisdicciones',
        ],
        requiredForNext: 4,
      },
      {
        id: 'support-core',
        titleEs: 'Playbook de Soporte',
        titleRu: 'Playbook поддержки',
        titleEn: 'Support Playbook',
        descriptionEs: 'Los cuatro documentos que definen como trabajamos: playbook, enciclopedia, tono y tickets.',
        descriptionRu: 'Четыре документа, определяющие нашу работу: playbook, энциклопедия, тон и тикеты.',
        descriptionEn: 'The four documents that define how we work: playbook, encyclopedia, tone, and tickets.',
        docs: [
          'support/playbook',
          'support/enciclopedia-soporte',
          'support/guia-tono-comunicacion',
          'support/gestion-tickets',
        ],
        requiredForNext: 4,
      },
      {
        id: 'customer-handling',
        titleEs: 'Manejo del Cliente',
        titleRu: 'Работа с клиентом',
        titleEn: 'Customer Handling',
        descriptionEs: 'VIPs, quejas y entender la cabeza del trader retail para no quemarte.',
        descriptionRu: 'VIP, жалобы и понимание розничного трейдера.',
        descriptionEn: 'VIPs, complaints, and understanding the retail trader mindset so you do not burn out.',
        docs: [
          'support/atencion-vip',
          'support/manejo-quejas',
          'encyclopedia/psicologia-trader',
        ],
        requiredForNext: 3,
      },
      {
        id: 'operational-context',
        titleEs: 'Contexto Operativo',
        titleRu: 'Операционный контекст',
        titleEn: 'Operational Context',
        descriptionEs: 'Depositos, PSPs, onboarding y manual de crisis. Para cuando el ticket escala.',
        descriptionRu: 'Депозиты, PSPs, онбординг и руководство по кризисам. Для эскалаций.',
        descriptionEn: 'Deposits, PSPs, onboarding, and crisis manual. For when the ticket escalates.',
        docs: [
          'operations/deposits',
          'operations/psps-explicados',
          'compliance/onboarding',
          'operations/manual-crisis',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Support NEOMAAA',
      titleRu: 'Сертифицированная поддержка NEOMAAA',
      titleEn: 'NEOMAAA Certified Support',
      descriptionEs: 'Dominas el producto, el tono, los tickets y las crisis. Listo para resolver en primera linea.',
      descriptionRu: 'Вы владеете продуктом, тоном, тикетами и кризисами. Готовы решать на передовой.',
      descriptionEn: 'You master the product, the tone, tickets, and crises. Ready to resolve on the front line.',
    },
  },

  compliance: {
    roleId: 'compliance',
    titleEs: 'Ruta de Compliance NEOMAAA',
    titleRu: 'Путь Комплаенс NEOMAAA',
    titleEn: 'NEOMAAA Compliance Path',
    descriptionEs: 'Todo el framework regulatorio, KYC/AML, sanciones y A-Book/B-Book para proteger la licencia.',
    descriptionRu: 'Весь регуляторный фреймворк, KYC/AML, санкции и A-Book/B-Book для защиты лицензии.',
    descriptionEn: 'The full regulatory framework, KYC/AML, sanctions, and A-Book/B-Book to protect the license.',
    estimatedHours: 14,
    phases: [
      {
        id: 'regulatory-foundations',
        titleEs: 'Fundamentos Regulatorios',
        titleRu: 'Основы регулирования',
        titleEn: 'Regulatory Fundamentals',
        descriptionEs: 'ABC del broker, jurisdicciones y marco legal. Sin esto, no hay compliance posible.',
        descriptionRu: 'ABC брокера, юрисдикции и правовая база.',
        descriptionEn: 'Broker ABCs, jurisdictions, and legal framework. Without this, compliance is impossible.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/regulacion-jurisdicciones',
          'legal/aml-kyc-policy',
          'legal/risk-disclosure',
        ],
        requiredForNext: 4,
      },
      {
        id: 'compliance-core',
        titleEs: 'Core de Compliance',
        titleRu: 'Ядро комплаенса',
        titleEn: 'Compliance Core',
        descriptionEs: 'Manual, workflow y onboarding del cliente. El dia a dia del oficial de compliance.',
        descriptionRu: 'Руководство, workflow и онбординг клиента.',
        descriptionEn: 'Manual, workflow, and client onboarding. The day-to-day of the compliance officer.',
        docs: [
          'compliance/manual-susana',
          'compliance/workflow',
          'compliance/onboarding',
          'compliance/proceso-kyc-sumsub',
        ],
        requiredForNext: 4,
      },
      {
        id: 'risk-screening',
        titleEs: 'Riesgo y Screening',
        titleRu: 'Риск и скрининг',
        titleEn: 'Risk and Screening',
        descriptionEs: 'Screening de sanciones, calendario de compliance (record keeping) y A-Book/B-Book.',
        descriptionRu: 'Скрининг санкций, календарь комплаенса (record keeping) и A-Book/B-Book.',
        descriptionEn: 'Sanctions screening, compliance calendar (record keeping), and A-Book/B-Book.',
        docs: [
          'compliance/screening-sanciones',
          'compliance/compliance-calendar',
          'compliance/ab-book-policy',
        ],
        requiredForNext: 3,
      },
      {
        id: 'expansion-legal',
        titleEs: 'Expansion y Marco Legal',
        titleRu: 'Расширение и правовая база',
        titleEn: 'Expansion and Legal Framework',
        descriptionEs: 'Expansion regulatoria, manejo de quejas y politicas legales completas.',
        descriptionRu: 'Регуляторное расширение, обработка жалоб и правовые политики.',
        descriptionEn: 'Regulatory expansion, complaint handling, and complete legal policies.',
        docs: [
          'compliance/expansion-regulatoria',
          'legal/complaint-handling',
          'legal/order-execution-policy',
        ],
        requiredForNext: 3,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Compliance NEOMAAA',
      titleRu: 'Сертифицированный комплаенс NEOMAAA',
      titleEn: 'NEOMAAA Certified Compliance',
      descriptionEs: 'Dominas el marco regulatorio de NEOMAAA Markets. Guardian de la licencia.',
      descriptionRu: 'Вы знаете регуляторный фреймворк NEOMAAA Markets.',
      descriptionEn: 'You master the regulatory framework of NEOMAAA Markets. Guardian of the license.',
    },
  },

  'marketing-role': {
    roleId: 'marketing-role',
    titleEs: 'Ruta de Marketing NEOMAAA',
    titleRu: 'Путь Маркетинг NEOMAAA',
    titleEn: 'NEOMAAA Marketing Path',
    descriptionEs: 'ICP, funnel, retencion, copy y competidores. Para construir la maquina de adquisicion del broker.',
    descriptionRu: 'ICP, воронка, удержание, копирайтинг и конкуренты.',
    descriptionEn: 'ICP, funnel, retention, copy, and competitors. To build the broker acquisition machine.',
    estimatedHours: 8,
    phases: [
      {
        id: 'product-context',
        titleEs: 'Contexto del Producto',
        titleRu: 'Контекст продукта',
        titleEn: 'Product Context',
        descriptionEs: 'No podes vender lo que no entendes. ABC, MT5 y psicologia del trader.',
        descriptionRu: 'Нельзя продавать то, чего не понимаешь.',
        descriptionEn: 'You cannot sell what you do not understand. ABCs, MT5, and trader psychology.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/productos-mt5',
          'encyclopedia/psicologia-trader',
        ],
        requiredForNext: 3,
      },
      {
        id: 'icp-funnel',
        titleEs: 'ICP y Funnel',
        titleRu: 'ICP и воронка',
        titleEn: 'ICP and Funnel',
        descriptionEs: 'Quien compra, por donde entra y como se convierte.',
        descriptionRu: 'Кто покупает, как входит и как конвертируется.',
        descriptionEn: 'Who buys, where they enter, and how they convert.',
        docs: [
          'marketing/icps-por-mercado',
          'marketing/funnel-broker',
          'marketing/copy-broker',
        ],
        requiredForNext: 3,
      },
      {
        id: 'retention-competitors',
        titleEs: 'Retencion y Competencia',
        titleRu: 'Удержание и конкуренция',
        titleEn: 'Retention and Competition',
        descriptionEs: 'Como no perder el cliente y como posicionarse contra los grandes.',
        descriptionRu: 'Как не терять клиента и позиционироваться.',
        descriptionEn: 'How to keep the client and how to position against the big players.',
        docs: [
          'marketing/retencion-broker',
          'marketing/competidores-deep-dive',
        ],
        requiredForNext: 2,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Marketing NEOMAAA',
      titleRu: 'Сертифицированный маркетинг NEOMAAA',
      titleEn: 'NEOMAAA Certified Marketing',
      descriptionEs: 'Entendes el producto, el cliente, el funnel y la competencia. Listo para construir demanda.',
      descriptionRu: 'Вы знаете продукт, клиента, воронку и конкурентов.',
      descriptionEn: 'You understand the product, the client, the funnel, and the competition. Ready to build demand.',
    },
  },

  dealing: {
    roleId: 'dealing',
    titleEs: 'Ruta de Dealing NEOMAAA',
    titleRu: 'Путь Дилинг NEOMAAA',
    titleEn: 'NEOMAAA Dealing Path',
    descriptionEs: 'Formacion de precio, productos MT5, ejecucion, PSPs y crisis. El corazon operativo del broker.',
    descriptionRu: 'Формирование цены, продукты MT5, исполнение, PSPs и кризис.',
    descriptionEn: 'Price formation, MT5 products, execution, PSPs, and crisis. The operational heart of the broker.',
    estimatedHours: 10,
    phases: [
      {
        id: 'market-mechanics',
        titleEs: 'Mecanica del Mercado',
        titleRu: 'Механика рынка',
        titleEn: 'Market Mechanics',
        descriptionEs: 'Como se forma el precio, productos MT5 y noticias que mueven el book.',
        descriptionRu: 'Как формируется цена, продукты MT5 и новости.',
        descriptionEn: 'How price is formed, MT5 products, and news that moves the book.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/formacion-precio',
          'encyclopedia/productos-mt5',
          'encyclopedia/noticias-impacto',
        ],
        requiredForNext: 4,
      },
      {
        id: 'execution-core',
        titleEs: 'Ejecucion y A-Book/B-Book',
        titleRu: 'Исполнение и A-Book/B-Book',
        titleEn: 'Execution and A-Book/B-Book',
        descriptionEs: 'Dealing desk publico, politica A-Book/B-Book y workflow operativo.',
        descriptionRu: 'Dealing desk, политика A-Book/B-Book.',
        descriptionEn: 'Public dealing desk, A-Book/B-Book policy, and operational workflow.',
        docs: [
          'operations/dealing-desk-publico',
          'compliance/ab-book-policy',
          'compliance/workflow',
          'legal/order-execution-policy',
        ],
        requiredForNext: 4,
      },
      {
        id: 'payments-crisis',
        titleEs: 'Pagos y Crisis',
        titleRu: 'Платежи и кризис',
        titleEn: 'Payments and Crisis',
        descriptionEs: 'Depositos, PSPs y manual de crisis. Cuando algo rompe, sabes que hacer.',
        descriptionRu: 'Депозиты, PSPs и руководство по кризисам.',
        descriptionEn: 'Deposits, PSPs, and crisis manual. When something breaks, you know what to do.',
        docs: [
          'operations/deposits',
          'operations/psps-explicados',
          'operations/manual-crisis',
          'operations/go-live-runbook',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Dealing NEOMAAA',
      titleRu: 'Сертифицированный дилинг NEOMAAA',
      titleEn: 'NEOMAAA Certified Dealing',
      descriptionEs: 'Dominas ejecucion, A-Book/B-Book, pagos y crisis. El nucleo del broker.',
      descriptionRu: 'Вы владеете исполнением, A-Book/B-Book, платежами и кризисом.',
      descriptionEn: 'You master execution, A-Book/B-Book, payments, and crisis. The core of the broker.',
    },
  },

  principal: {
    roleId: 'principal',
    titleEs: 'Ruta Principal — Vision Completa',
    titleRu: 'Путь Принципал — Полная картина',
    titleEn: 'Principal Path — Full Vision',
    descriptionEs: 'El broker de punta a punta: fundamentos, ventas, compliance, operaciones, marketing, partners y lanzamiento.',
    descriptionRu: 'Брокер от и до: основы, продажи, комплаенс, операции, маркетинг, партнёры и запуск.',
    descriptionEn: 'The broker end to end: fundamentals, sales, compliance, operations, marketing, partners, and launch.',
    estimatedHours: 20,
    phases: [
      {
        id: 'broker-foundations',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        titleEn: 'Broker Fundamentals',
        descriptionEs: 'Lo que todo dueno de broker debe saber: producto, precio, regulacion, MT5.',
        descriptionRu: 'Что должен знать владелец брокера.',
        descriptionEn: 'What every broker owner must know: product, pricing, regulation, MT5.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/formacion-precio',
          'encyclopedia/productos-mt5',
          'encyclopedia/regulacion-jurisdicciones',
          'encyclopedia/psicologia-trader',
        ],
        requiredForNext: 5,
      },
      {
        id: 'revenue-engine',
        titleEs: 'Motor de Ingresos',
        titleRu: 'Движок дохода',
        titleEn: 'Revenue Engine',
        descriptionEs: 'Ventas, marketing, ICP, competencia y funnel. De donde sale el revenue.',
        descriptionRu: 'Продажи, маркетинг, ICP, конкуренция и воронка.',
        descriptionEn: 'Sales, marketing, ICP, competition, and funnel. Where revenue comes from.',
        docs: [
          'sales/training',
          'sales/commissions',
          'marketing/icps-por-mercado',
          'marketing/funnel-broker',
          'marketing/competidores-deep-dive',
        ],
        requiredForNext: 5,
      },
      {
        id: 'operations-compliance',
        titleEs: 'Operaciones y Compliance',
        titleRu: 'Операции и комплаенс',
        titleEn: 'Operations and Compliance',
        descriptionEs: 'A-Book/B-Book, dealing, depositos, PSPs, KYC. El chasis legal y operativo.',
        descriptionRu: 'A-Book/B-Book, дилинг, депозиты, PSPs, KYC.',
        descriptionEn: 'A-Book/B-Book, dealing, deposits, PSPs, KYC. The legal and operational chassis.',
        docs: [
          'compliance/ab-book-policy',
          'compliance/workflow',
          'operations/dealing-desk-publico',
          'operations/deposits',
          'operations/psps-explicados',
          'compliance/proceso-kyc-sumsub',
        ],
        requiredForNext: 6,
      },
      {
        id: 'partners-launch',
        titleEs: 'Partners y Lanzamiento',
        titleRu: 'Партнёры и запуск',
        titleEn: 'Partners and Launch',
        descriptionEs: 'Programa de partners, modelo financiero y los dos checklists de lanzamiento.',
        descriptionRu: 'Программа партнёров, финмодель и чеклисты запуска.',
        descriptionEn: 'Partner program, financial model, and the two launch checklists.',
        docs: [
          'partners/programa-completo',
          'partners/modelo-financiero',
          'operations/go-live-runbook',
          'launch/post-launch-playbook',
          'operations/manual-crisis',
        ],
        requiredForNext: 5,
      },
    ],
    finalBadge: {
      titleEs: 'Principal Certified NEOMAAA',
      titleRu: 'Сертифицированный принципал NEOMAAA',
      titleEn: 'NEOMAAA Certified Principal',
      descriptionEs: 'Vision completa del broker. Todas las piezas del negocio dominadas.',
      descriptionRu: 'Полное владение бизнесом брокера.',
      descriptionEn: 'Full vision of the broker. Every piece of the business mastered.',
    },
  },

  admin: {
    roleId: 'admin',
    titleEs: 'Ruta Admin — Vision Completa',
    titleRu: 'Путь Админ — Полная картина',
    titleEn: 'Admin Path — Full Vision',
    descriptionEs: 'Misma ruta que Principal: el broker de punta a punta.',
    descriptionRu: 'Тот же путь, что и у Принципала.',
    descriptionEn: 'Same path as Principal: the broker end to end.',
    estimatedHours: 20,
    phases: [
      {
        id: 'broker-foundations',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        titleEn: 'Broker Fundamentals',
        descriptionEs: 'Producto, precio, regulacion y MT5.',
        descriptionRu: 'Продукт, цена, регулирование и MT5.',
        descriptionEn: 'Product, pricing, regulation, and MT5.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/formacion-precio',
          'encyclopedia/productos-mt5',
          'encyclopedia/regulacion-jurisdicciones',
        ],
        requiredForNext: 4,
      },
      {
        id: 'revenue-engine',
        titleEs: 'Motor de Ingresos',
        titleRu: 'Движок дохода',
        titleEn: 'Revenue Engine',
        descriptionEs: 'Ventas, marketing y competencia.',
        descriptionRu: 'Продажи, маркетинг и конкуренция.',
        descriptionEn: 'Sales, marketing, and competition.',
        docs: [
          'sales/training',
          'sales/commissions',
          'marketing/icps-por-mercado',
          'marketing/funnel-broker',
          'marketing/competidores-deep-dive',
        ],
        requiredForNext: 5,
      },
      {
        id: 'operations-compliance',
        titleEs: 'Operaciones y Compliance',
        titleRu: 'Операции и комплаенс',
        titleEn: 'Operations and Compliance',
        descriptionEs: 'A-Book, dealing, pagos y KYC.',
        descriptionRu: 'A-Book, дилинг, платежи и KYC.',
        descriptionEn: 'A-Book, dealing, payments, and KYC.',
        docs: [
          'compliance/ab-book-policy',
          'compliance/workflow',
          'operations/dealing-desk-publico',
          'operations/deposits',
          'operations/psps-explicados',
        ],
        requiredForNext: 5,
      },
      {
        id: 'partners-launch',
        titleEs: 'Partners y Lanzamiento',
        titleRu: 'Партнёры и запуск',
        titleEn: 'Partners and Launch',
        descriptionEs: 'Partners, financiero y checklists.',
        descriptionRu: 'Партнёры, финансы и чеклисты.',
        descriptionEn: 'Partners, finance, and checklists.',
        docs: [
          'partners/programa-completo',
          'partners/modelo-financiero',
          'operations/go-live-runbook',
          'launch/post-launch-playbook',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Admin Certified NEOMAAA',
      titleRu: 'Сертифицированный администратор NEOMAAA',
      titleEn: 'NEOMAAA Certified Admin',
      descriptionEs: 'Vision completa del broker y sus operaciones.',
      descriptionRu: 'Полное владение бизнесом.',
      descriptionEn: 'Full vision of the broker and its operations.',
    },
  },

  dev: {
    roleId: 'dev',
    titleEs: 'Ruta Dev — Contexto del Negocio',
    titleRu: 'Путь Dev — Контекст бизнеса',
    titleEn: 'Dev Path — Business Context',
    descriptionEs: 'Para construir el portal y las integraciones necesitas entender el negocio: producto, clientes, operaciones, compliance.',
    descriptionRu: 'Чтобы строить портал и интеграции, нужен бизнес-контекст.',
    descriptionEn: 'To build the portal and its integrations you need to understand the business: product, clients, operations, compliance.',
    estimatedHours: 8,
    phases: [
      {
        id: 'product-basics',
        titleEs: 'Producto y Negocio',
        titleRu: 'Продукт и бизнес',
        titleEn: 'Product and Business',
        descriptionEs: 'Que vendemos, a quien y como se comportan.',
        descriptionRu: 'Что, кому и как продаём.',
        descriptionEn: 'What we sell, who we sell to, and how they behave.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/productos-mt5',
          'encyclopedia/psicologia-trader',
          'marketing/icps-por-mercado',
        ],
        requiredForNext: 4,
      },
      {
        id: 'integrations-ops',
        titleEs: 'Integraciones y Operaciones',
        titleRu: 'Интеграции и операции',
        titleEn: 'Integrations and Operations',
        descriptionEs: 'PSPs, depositos, KYC Sumsub, dealing desk. Lo que vas a integrar.',
        descriptionRu: 'PSPs, депозиты, KYC Sumsub, dealing desk.',
        descriptionEn: 'PSPs, deposits, KYC Sumsub, dealing desk. What you will integrate.',
        docs: [
          'operations/psps-explicados',
          'operations/deposits',
          'compliance/proceso-kyc-sumsub',
          'operations/dealing-desk-publico',
        ],
        requiredForNext: 4,
      },
      {
        id: 'launch-crisis',
        titleEs: 'Lanzamiento y Crisis',
        titleRu: 'Запуск и кризис',
        titleEn: 'Launch and Crisis',
        descriptionEs: 'Runbook, checklist y manual de crisis. Para cuando estes on-call.',
        descriptionRu: 'Runbook, чеклист и руководство по кризисам.',
        descriptionEn: 'Runbook, checklist, and crisis manual. For when you are on call.',
        docs: [
          'operations/go-live-runbook',
          'operations/manual-crisis',
        ],
        requiredForNext: 2,
      },
    ],
    finalBadge: {
      titleEs: 'Dev Certified NEOMAAA',
      titleRu: 'Сертифицированный разработчик NEOMAAA',
      titleEn: 'NEOMAAA Certified Dev',
      descriptionEs: 'Tenes el contexto de negocio para construir bien. No estas haciendo tickets a ciegas.',
      descriptionRu: 'У вас есть бизнес-контекст для качественной разработки.',
      descriptionEn: 'You have the business context to build well. You are not working tickets in the dark.',
    },
  },
};

// ---------------------------------------------------------------------------
// Computed state
// ---------------------------------------------------------------------------

export interface PhaseState {
  phase: LearningPathPhase;
  completedDocs: string[];
  totalDocs: number;
  completedCount: number;
  percent: number; // 0-100
  isComplete: boolean;
  isUnlocked: boolean;
  isActive: boolean; // the first non-complete unlocked phase
}

export interface LearningPathState {
  path: LearningPath;
  phases: PhaseState[];
  totalDocs: number;
  completedCount: number;
  percent: number;
  pathComplete: boolean;
  /** First unlocked, not-complete doc — what to continue with. */
  nextDoc: { phaseId: string; docPath: string } | null;
}

/**
 * Compute state from a path and a Set of completed docPaths.
 * A phase unlocks when the previous phase has completed >= requiredForNext.
 */
export function computePathState(
  path: LearningPath,
  completedSet: Set<string>
): LearningPathState {
  const phaseStates: PhaseState[] = [];
  let previousPhaseUnlocksNext: boolean = true; // phase 0 is always unlocked

  for (const phase of path.phases) {
    const completedInPhase = phase.docs.filter((d) => completedSet.has(d));
    const totalInPhase = phase.docs.length;
    const isComplete: boolean = completedInPhase.length >= phase.requiredForNext;
    const isUnlocked: boolean = previousPhaseUnlocksNext;
    phaseStates.push({
      phase,
      completedDocs: completedInPhase,
      totalDocs: totalInPhase,
      completedCount: completedInPhase.length,
      percent: totalInPhase > 0 ? Math.round((completedInPhase.length / totalInPhase) * 100) : 0,
      isComplete,
      isUnlocked,
      isActive: false, // set below
    });
    previousPhaseUnlocksNext = isUnlocked && isComplete;
  }

  // Mark the first unlocked, not-complete phase as active.
  const activeIdx = phaseStates.findIndex((ps) => ps.isUnlocked && !ps.isComplete);
  if (activeIdx >= 0) phaseStates[activeIdx].isActive = true;

  // Aggregate counts (de-duped across phases).
  const allDocs = new Set<string>();
  const allCompleted = new Set<string>();
  for (const phase of path.phases) {
    for (const d of phase.docs) {
      allDocs.add(d);
      if (completedSet.has(d)) allCompleted.add(d);
    }
  }
  const totalDocs = allDocs.size;
  const completedCount = allCompleted.size;
  const pathComplete = phaseStates.every((ps) => ps.isComplete);

  // Find next doc to continue with.
  let nextDoc: { phaseId: string; docPath: string } | null = null;
  for (const ps of phaseStates) {
    if (!ps.isUnlocked) break;
    if (ps.isComplete) continue;
    const next = ps.phase.docs.find((d) => !completedSet.has(d));
    if (next) {
      nextDoc = { phaseId: ps.phase.id, docPath: next };
      break;
    }
  }

  return {
    path,
    phases: phaseStates,
    totalDocs,
    completedCount,
    percent: totalDocs > 0 ? Math.round((completedCount / totalDocs) * 100) : 0,
    pathComplete,
    nextDoc,
  };
}

export function getPathForRole(roleId: string): LearningPath | null {
  return LEARNING_PATHS[roleId] || null;
}
