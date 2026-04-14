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
  descriptionEs: string;
  descriptionRu: string;
  /** Ordered list of docPaths, e.g. ["encyclopedia/abc", "sales/training"]. */
  docs: string[];
  /** How many docs of this phase must be completed before the next unlocks. */
  requiredForNext: number;
}

export interface LearningPathBadge {
  titleEs: string;
  titleRu: string;
  descriptionEs: string;
  descriptionRu: string;
}

export interface LearningPath {
  roleId: string;
  titleEs: string;
  titleRu: string;
  descriptionEs: string;
  descriptionRu: string;
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
    descriptionEs: 'Todo lo que necesitas para vender NEOMAAA Markets con confianza: fundamentos del broker, tecnicas de venta, mercados, competencia y operaciones.',
    descriptionRu: 'Всё необходимое для уверенных продаж NEOMAAA Markets: основы брокера, техники продаж, рынки, конкуренты и операции.',
    estimatedHours: 12,
    phases: [
      {
        id: 'fundamentals',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        descriptionEs: 'Entende como funciona un broker, sus productos y su marco regulatorio antes de hablar con un cliente.',
        descriptionRu: 'Разберитесь, как работает брокер, его продукты и регулирование, прежде чем общаться с клиентом.',
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
        descriptionEs: 'El playbook de ventas: plan de contacto, primer llamado, objeciones, comisiones y FAQ.',
        descriptionRu: 'Playbook продаж: план контактов, первый звонок, возражения, комиссии и FAQ.',
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
        descriptionEs: 'ICP por region, battle cards contra competidores, impacto de noticias y psicologia del trader.',
        descriptionRu: 'ICP по регионам, battle cards против конкурентов, влияние новостей и психология трейдера.',
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
        descriptionEs: 'Contexto operativo que un vendedor debe dominar: workflow de compliance, A-Book, dealing desk y PSPs.',
        descriptionRu: 'Операционный контекст, который должен знать продавец: workflow комплаенса, A-Book, dealing desk и PSPs.',
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
      descriptionEs: 'Completaste la ruta completa de ventas. Dominas el producto, el pitch, el mercado y las operaciones.',
      descriptionRu: 'Вы прошли полный путь продаж. Вы знаете продукт, pitch, рынок и операции.',
    },
  },

  'support-role': {
    roleId: 'support-role',
    titleEs: 'Ruta de Soporte NEOMAAA',
    titleRu: 'Путь Поддержка NEOMAAA',
    descriptionEs: 'Convertite en el primer punto de contacto que resuelve: producto, tono, tickets, crisis y operaciones.',
    descriptionRu: 'Станьте первой точкой контакта, которая решает: продукт, тон, тикеты, кризис и операции.',
    estimatedHours: 10,
    phases: [
      {
        id: 'foundations',
        titleEs: 'Fundamentos del Producto',
        titleRu: 'Основы продукта',
        descriptionEs: 'Que es un broker, como funciona el precio y MT5. Lo que un cliente te va a preguntar a diario.',
        descriptionRu: 'Что такое брокер, как формируется цена и MT5. То, что клиент спросит каждый день.',
        docs: [
          'encyclopedia/abc',
          'encyclopedia/productos-mt5',
          'encyclopedia/formacion-precio',
          'encyclopedia/glosario-trilingue',
        ],
        requiredForNext: 4,
      },
      {
        id: 'support-core',
        titleEs: 'Playbook de Soporte',
        titleRu: 'Playbook поддержки',
        descriptionEs: 'Los cuatro documentos que definen como trabajamos: playbook, enciclopedia, tono y tickets.',
        descriptionRu: 'Четыре документа, определяющие нашу работу: playbook, энциклопедия, тон и тикеты.',
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
        descriptionEs: 'VIPs, quejas y entender la cabeza del trader retail para no quemarte.',
        descriptionRu: 'VIP, жалобы и понимание розничного трейдера.',
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
        descriptionEs: 'Depositos, PSPs, onboarding y manual de crisis. Para cuando el ticket escala.',
        descriptionRu: 'Депозиты, PSPs, онбординг и руководство по кризисам. Для эскалаций.',
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
      descriptionEs: 'Dominas el producto, el tono, los tickets y las crisis. Listo para resolver en primera linea.',
      descriptionRu: 'Вы владеете продуктом, тоном, тикетами и кризисами. Готовы решать на передовой.',
    },
  },

  compliance: {
    roleId: 'compliance',
    titleEs: 'Ruta de Compliance NEOMAAA',
    titleRu: 'Путь Комплаенс NEOMAAA',
    descriptionEs: 'Todo el framework regulatorio, KYC/AML, sanciones y A-Book/B-Book para proteger la licencia.',
    descriptionRu: 'Весь регуляторный фреймворк, KYC/AML, санкции и A-Book/B-Book для защиты лицензии.',
    estimatedHours: 14,
    phases: [
      {
        id: 'regulatory-foundations',
        titleEs: 'Fundamentos Regulatorios',
        titleRu: 'Основы регулирования',
        descriptionEs: 'ABC del broker, jurisdicciones y marco legal. Sin esto, no hay compliance posible.',
        descriptionRu: 'ABC брокера, юрисдикции и правовая база.',
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
        descriptionEs: 'Manual, workflow y onboarding del cliente. El dia a dia del oficial de compliance.',
        descriptionRu: 'Руководство, workflow и онбординг клиента.',
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
        descriptionEs: 'Screening de sanciones, registro, A-Book/B-Book y mejores practicas.',
        descriptionRu: 'Скрининг санкций, реестр, A-Book/B-Book.',
        docs: [
          'compliance/screening-sanciones',
          'compliance/registro-compliance',
          'compliance/ab-book-policy',
          'compliance/mejores-practicas-compliance',
        ],
        requiredForNext: 4,
      },
      {
        id: 'expansion-legal',
        titleEs: 'Expansion y Marco Legal',
        titleRu: 'Расширение и правовая база',
        descriptionEs: 'Expansion regulatoria, manejo de quejas y politicas legales completas.',
        descriptionRu: 'Регуляторное расширение, обработка жалоб и правовые политики.',
        docs: [
          'compliance/expansion-regulatoria',
          'compliance/workflow-sales-compliance',
          'legal/complaint-handling',
          'legal/order-execution-policy',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Compliance NEOMAAA',
      titleRu: 'Сертифицированный комплаенс NEOMAAA',
      descriptionEs: 'Dominas el marco regulatorio de NEOMAAA Markets. Guardian de la licencia.',
      descriptionRu: 'Вы знаете регуляторный фреймворк NEOMAAA Markets.',
    },
  },

  'marketing-role': {
    roleId: 'marketing-role',
    titleEs: 'Ruta de Marketing NEOMAAA',
    titleRu: 'Путь Маркетинг NEOMAAA',
    descriptionEs: 'ICP, funnel, retencion, copy y competidores. Para construir la maquina de adquisicion del broker.',
    descriptionRu: 'ICP, воронка, удержание, копирайтинг и конкуренты.',
    estimatedHours: 8,
    phases: [
      {
        id: 'product-context',
        titleEs: 'Contexto del Producto',
        titleRu: 'Контекст продукта',
        descriptionEs: 'No podes vender lo que no entendes. ABC, MT5 y psicologia del trader.',
        descriptionRu: 'Нельзя продавать то, чего не понимаешь.',
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
        descriptionEs: 'Quien compra, por donde entra y como se convierte.',
        descriptionRu: 'Кто покупает, как входит и как конвертируется.',
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
        descriptionEs: 'Como no perder el cliente y como posicionarse contra los grandes.',
        descriptionRu: 'Как не терять клиента и позиционироваться.',
        docs: [
          'marketing/retencion-broker',
          'marketing/competidores-broker',
          'marketing/competidores-deep-dive',
        ],
        requiredForNext: 3,
      },
    ],
    finalBadge: {
      titleEs: 'Certified Marketing NEOMAAA',
      titleRu: 'Сертифицированный маркетинг NEOMAAA',
      descriptionEs: 'Entendes el producto, el cliente, el funnel y la competencia. Listo para construir demanda.',
      descriptionRu: 'Вы знаете продукт, клиента, воронку и конкурентов.',
    },
  },

  dealing: {
    roleId: 'dealing',
    titleEs: 'Ruta de Dealing NEOMAAA',
    titleRu: 'Путь Дилинг NEOMAAA',
    descriptionEs: 'Formacion de precio, productos MT5, ejecucion, PSPs y crisis. El corazon operativo del broker.',
    descriptionRu: 'Формирование цены, продукты MT5, исполнение, PSPs и кризис.',
    estimatedHours: 10,
    phases: [
      {
        id: 'market-mechanics',
        titleEs: 'Mecanica del Mercado',
        titleRu: 'Механика рынка',
        descriptionEs: 'Como se forma el precio, productos MT5 y noticias que mueven el book.',
        descriptionRu: 'Как формируется цена, продукты MT5 и новости.',
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
        descriptionEs: 'Dealing desk publico, politica A-Book/B-Book y workflow operativo.',
        descriptionRu: 'Dealing desk, политика A-Book/B-Book.',
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
        descriptionEs: 'Depositos, PSPs y manual de crisis. Cuando algo rompe, sabes que hacer.',
        descriptionRu: 'Депозиты, PSPs и руководство по кризисам.',
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
      descriptionEs: 'Dominas ejecucion, A-Book/B-Book, pagos y crisis. El nucleo del broker.',
      descriptionRu: 'Вы владеете исполнением, A-Book/B-Book, платежами и кризисом.',
    },
  },

  principal: {
    roleId: 'principal',
    titleEs: 'Ruta Principal — Vision Completa',
    titleRu: 'Путь Принципал — Полная картина',
    descriptionEs: 'El broker de punta a punta: fundamentos, ventas, compliance, operaciones, marketing, partners y lanzamiento.',
    descriptionRu: 'Брокер от и до: основы, продажи, комплаенс, операции, маркетинг, партнёры и запуск.',
    estimatedHours: 20,
    phases: [
      {
        id: 'broker-foundations',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        descriptionEs: 'Lo que todo dueno de broker debe saber: producto, precio, regulacion, MT5.',
        descriptionRu: 'Что должен знать владелец брокера.',
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
        descriptionEs: 'Ventas, marketing, ICP, competencia y funnel. De donde sale el revenue.',
        descriptionRu: 'Продажи, маркетинг, ICP, конкуренция и воронка.',
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
        descriptionEs: 'A-Book/B-Book, dealing, depositos, PSPs, KYC. El chasis legal y operativo.',
        descriptionRu: 'A-Book/B-Book, дилинг, депозиты, PSPs, KYC.',
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
        descriptionEs: 'Programa de partners, modelo financiero y los dos checklists de lanzamiento.',
        descriptionRu: 'Программа партнёров, финмодель и чеклисты запуска.',
        docs: [
          'partners/programa-completo',
          'partners/modelo-financiero',
          'launch/checklist',
          'launch/post-launch-playbook',
          'operations/manual-crisis',
        ],
        requiredForNext: 5,
      },
    ],
    finalBadge: {
      titleEs: 'Principal Certified NEOMAAA',
      titleRu: 'Сертифицированный принципал NEOMAAA',
      descriptionEs: 'Vision completa del broker. Todas las piezas del negocio dominadas.',
      descriptionRu: 'Полное владение бизнесом брокера.',
    },
  },

  admin: {
    roleId: 'admin',
    titleEs: 'Ruta Admin — Vision Completa',
    titleRu: 'Путь Админ — Полная картина',
    descriptionEs: 'Misma ruta que Principal: el broker de punta a punta.',
    descriptionRu: 'Тот же путь, что и у Принципала.',
    estimatedHours: 20,
    phases: [
      {
        id: 'broker-foundations',
        titleEs: 'Fundamentos del Broker',
        titleRu: 'Основы брокера',
        descriptionEs: 'Producto, precio, regulacion y MT5.',
        descriptionRu: 'Продукт, цена, регулирование и MT5.',
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
        descriptionEs: 'Ventas, marketing y competencia.',
        descriptionRu: 'Продажи, маркетинг и конкуренция.',
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
        descriptionEs: 'A-Book, dealing, pagos y KYC.',
        descriptionRu: 'A-Book, дилинг, платежи и KYC.',
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
        descriptionEs: 'Partners, financiero y checklists.',
        descriptionRu: 'Партнёры, финансы и чеклисты.',
        docs: [
          'partners/programa-completo',
          'partners/modelo-financiero',
          'launch/checklist',
          'launch/post-launch-playbook',
        ],
        requiredForNext: 4,
      },
    ],
    finalBadge: {
      titleEs: 'Admin Certified NEOMAAA',
      titleRu: 'Сертифицированный администратор NEOMAAA',
      descriptionEs: 'Vision completa del broker y sus operaciones.',
      descriptionRu: 'Полное владение бизнесом.',
    },
  },

  dev: {
    roleId: 'dev',
    titleEs: 'Ruta Dev — Contexto del Negocio',
    titleRu: 'Путь Dev — Контекст бизнеса',
    descriptionEs: 'Para construir el portal y las integraciones necesitas entender el negocio: producto, clientes, operaciones, compliance.',
    descriptionRu: 'Чтобы строить портал и интеграции, нужен бизнес-контекст.',
    estimatedHours: 8,
    phases: [
      {
        id: 'product-basics',
        titleEs: 'Producto y Negocio',
        titleRu: 'Продукт и бизнес',
        descriptionEs: 'Que vendemos, a quien y como se comportan.',
        descriptionRu: 'Что, кому и как продаём.',
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
        descriptionEs: 'PSPs, depositos, KYC Sumsub, dealing desk. Lo que vas a integrar.',
        descriptionRu: 'PSPs, депозиты, KYC Sumsub, dealing desk.',
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
        descriptionEs: 'Runbook, checklist y manual de crisis. Para cuando estes on-call.',
        descriptionRu: 'Runbook, чеклист и руководство по кризисам.',
        docs: [
          'operations/go-live-runbook',
          'launch/checklist',
          'operations/manual-crisis',
        ],
        requiredForNext: 3,
      },
    ],
    finalBadge: {
      titleEs: 'Dev Certified NEOMAAA',
      titleRu: 'Сертифицированный разработчик NEOMAAA',
      descriptionEs: 'Tenes el contexto de negocio para construir bien. No estas haciendo tickets a ciegas.',
      descriptionRu: 'У вас есть бизнес-контекст для качественной разработки.',
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
