# Liquidity Providers — Relación B2B Estratégica

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego, Angel, Yulia, Stanislav + Pepe (Head of Dealing)
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — uso exclusivo principals + Dealing

> [!DANGER]
> Los Liquidity Providers (LPs) son infrastructure crítica. Sin LPs no hay broker — es literal. Un LP mal elegido o una relación mal gestionada puede significar spreads malos para el cliente (→ churn), costos altos (→ margen comprimido), ejecución deficiente (→ reputación destruida), o exposure no cubierta (→ pérdida material). Este documento consolida cómo se eligen, contratan, gestionan y diversifican los LPs de NEOMAAA Ltd.

> [!WARNING]
> **Benchmarks de markup LP, comisiones B2B, minimos de volumen y estructura de contratos son snapshot Abril 2026.** El mercado LP tiene ciclos: en periodos de alta volatilidad los LPs suben markups y endurecen colaterales; en periodos de compresion compiten agresivamente por flow. Revalidar numeros con al menos 2-3 LPs vivos antes de renegociar cualquier contrato material. Cifras mencionadas aqui son direccionales, no operacionales literales.

> [!INFO]
> **Propósito:** marco estratégico completo para la gestión de la relación B2B con Liquidity Providers. Define qué es un LP y su rol, los 3 tiers de LPs disponibles en el mercado, criterios de selección, proceso de contratación, política de diversificación obligatoria, gestión operativa day-to-day, tactics de negociación, cláusulas contractuales críticas, red flags para terminación, estado y target NEOMAAA, y KPIs de performance que Pepe monitorea.

---

## 1. Qué es un Liquidity Provider y su rol en el broker

Un Liquidity Provider (LP) es la contraparte institucional que suministra las quotes (bid/ask) sobre las cuales el broker cotiza a los clientes, y que absorbe el riesgo cuando el broker decide hacer hedge (A-Book) de ese flow. En términos simples, cuando un cliente compra EURUSD a 1.0850, NEOMAAA tiene dos opciones: (1) ser contraparte directa del cliente (B-Book, el broker gana si el cliente pierde) o (2) replicar ese trade contra el LP simultáneamente (A-Book, el broker cobra el markup y el LP es la contraparte económica).

### 1.1 Qué hace funcionalmente el LP

- **Price feed:** provee quotes continuas en todos los instrumentos del broker, con profundidad (market depth) en Level 2.
- **Execution venue:** acepta órdenes del broker (hedge) y las ejecuta contra su propio pool de liquidez o pasa a un tier superior.
- **Warehouse de riesgo:** absorbe el riesgo de posiciones del broker cuando éste decide no mantenerlas en B-Book.
- **Technology:** proporciona conectividad FIX API o MT5 bridge para ejecución low-latency.
- **Margin facility:** acepta margin parked del broker y permite apalancamiento institucional (tipicamente 50:1 a 200:1 vs el 1:1 retail).
- **Reporting:** entrega datos raw de ejecución, PnL del flow, breakdowns para compliance.

### 1.2 Por qué es infrastructure, no un proveedor más

Cambiar de LP no es como cambiar de proveedor de email. Un LP involucra:
- Integración técnica (FIX API setup toma 2-4 semanas, MT5 bridge otro 1-2 semanas)
- Margin parked (típicamente $100K-500K+ que tenés que mover)
- Contrato negociado con términos específicos (markup, volumen, SLA)
- Legal review (master agreement, ISDA si aplica)
- Compliance review (background del LP, jurisdicción, auditor)
- Operational muscle memory (Pepe aprendió cómo ruteaba, cómo respondía a requotes, quirks del bridge)

Cambiar de LP es un proyecto de 2-3 meses. Por eso la selección inicial importa muchísimo y la diversificación desde día 1 no es opcional.

---

## 2. Los 3 Tiers de LPs disponibles

El ecosistema de liquidez forex/CFDs se organiza en una pirámide jerárquica. En la cima están los bancos Tier 1 que son market makers globales. En la base están los agregadores retail-friendly. Cada tier tiene trade-offs específicos.

### 2.1 Tier 1 — bancos globales y prime brokers

**Ejemplos:** LMAX Exchange, Saxo Bank, Goldman Sachs, UBS, Citi, JP Morgan, Bank of America, Deutsche Bank, Morgan Stanley, Barclays.

**Características:**
- Liquidez premium, spreads más tight del mercado (EURUSD 0.1-0.3 pip raw).
- Execution quality tier 1 (<10ms latency, fill rate >99%).
- Reputación e imagen tier institucional.
- Markup típico 0.1-0.3 pip sobre raw.

**Requisitos:**
- **Minimum volume:** $100M-500M+/mes típicamente. Algunos aceptan $50M+ si hay roadmap claro.
- **Minimum margin:** $1M-10M parked.
- **Regulatory standing:** broker debe tener licencia Tier 1 (CySEC, FCA, ASIC) o Tier 2+ con track record impecable. Offshore-only (Anjouan, Comoros, Vanuatu standalone) generalmente no califica en Tier 1 directo.
- **Fit & proper:** directors backgrounds checked, no lawsuits abiertos, no regulatory actions.
- **Operational maturity:** audit trail, compliance framework, KYC framework demostrado.

**Trade-offs:**
- Restrictivo: dictan términos, negociación limitada al start, reaccionan mal a toxic flow (clientes news-trading, arbitrageurs, scalpers agresivos).
- Si flow es tóxico, suben markup rápido o cortan la relación.
- Onboarding largo (3-6 meses).

**Uso típico en broker mid-size:** no se accede directamente. Se accede vía PoP (Prime of Prime) Tier 2 que agrega y ofrece al broker.

### 2.2 Tier 2 — Prime of Prime (PoP)

**Ejemplos:** Match-Prime (ex-Match-Trade), Advanced Markets, Finalto (ex-Playtech), TopFX, Swissquote Bank (institutional), IS Prime, CFH Clearing, Invast Financial Services.

**Características:**
- Los PoP conectan mid-size brokers a liquidez Tier 1 agregada.
- Ellos tienen la relación directa con Goldman / UBS / Citi y la agregan para sus clientes brokers.
- Spreads competitivos (EURUSD 0.2-0.5 pip con markup incluido).
- Markup típico PoP: 0.2-0.5 pip sobre Tier 1 raw.

**Requisitos:**
- Minimum volume $5M-50M/mes (mucho más accesible que Tier 1).
- Minimum margin $50K-500K.
- Broker con licencia activa (offshore OK, CySEC/FCA mejor).
- KYC/AML framework del broker demostrado.
- Compliance fit (PoP hace DD al broker).

**Trade-offs positivos:**
- Mucho más accesible para brokers nuevos/medianos.
- Negociación razonable (pueden bajar markup 10-30% con volumen).
- Aceptan amplia variedad de flow (menos estricto que Tier 1 directo).
- Onboarding más rápido (1-3 meses).
- Relación más colaborativa (PoP quiere que crezcas, ellos ganan markup sobre más volumen).

**Trade-offs negativos:**
- Markup extra (el PoP cobra su margen sobre el Tier 1 raw).
- Latencia adicional (hop extra entre broker → PoP → Tier 1).
- Execution quality depende del PoP (la mayoría son buenos, algunos tienen bridges legacy con lag).

**Uso típico:** **este es el sweet spot para NEOMAAA al go-live.** Broker nuevo-mediano con licencia Anjouan arranca con PoPs Tier 2.

### 2.3 Tier 3 — Agregadores retail-focused

**Ejemplos:** oneZero Financial Systems, PrimeXM (XCore), Gold-i (Matrix Engine), B2Broker, Fortex, Leverate, Centroid Solutions, TickTrader Liquidity Aggregator.

**Características:**
- Son tecnología + liquidez agregada de múltiples LPs Tier 2/3 retail-friendly.
- Integración MT5 nativa, configuración rápida.
- Spreads más wide (EURUSD 0.3-0.8 pip con markup).
- Markup 0.3-0.8 pip típicamente.

**Requisitos:**
- Minimum volume bajo ($1M-10M/mes).
- Minimum margin $20K-100K.
- Licencia válida (offshore completamente OK).
- DD ligera.

**Trade-offs:**
- Accesible para brokers muy nuevos o small. Cuasi plug-and-play con MT5.
- Ejecución razonable pero no tier 1.
- Útil como backup, como LP secundario o para productos específicos (crypto CFDs).
- No es óptimo para el flow principal de un broker que quiera competir en spread.

**Uso típico:** backup LP, LP especializado (crypto, ejemplo B2Broker), o LP inicial mientras se onboardea Tier 2.

### 2.4 Tabla resumen 3 Tiers

| Dimensión | Tier 1 (Bank) | Tier 2 (PoP) | Tier 3 (Aggregator) |
|-----------|---------------|--------------|---------------------|
| Ejemplos | LMAX, Saxo, Goldman, UBS | Match-Prime, Finalto, TopFX | oneZero, PrimeXM, B2Broker |
| Markup típico | 0.1-0.3 pip | 0.2-0.5 pip | 0.3-0.8 pip |
| Min volume | $100M+/mo | $5-50M/mo | $1-10M/mo |
| Min margin | $1-10M | $50-500K | $20-100K |
| Licencia broker req. | Tier 1-2 | Offshore OK | Offshore OK |
| Onboarding | 3-6 meses | 1-3 meses | 2-6 semanas |
| Execution | 99%+ fill, <10ms | 98%+ fill, <20ms | 95%+ fill, <50ms |
| Uso NEOMAAA año 1 | ❌ no accesible | ✅ core LPs | ✅ backup + crypto |

> [!TIP]
> El objetivo año 1 de NEOMAAA es tener 2-3 PoPs Tier 2 como core, un Tier 3 backup generalista, y un Tier 3 especializado en crypto. Tier 1 directo se evalúa año 2-3 cuando volumen y licencia lo habiliten.

---

## 3. Criterios de selección de un LP — los 10 items obligatorios

Cualquier evaluación de un LP nuevo debe pasar por estos 10 criterios. Cada uno se califica y el conjunto decide go/no-go.

### 3.1 Costo (markup sobre raw)

El markup efectivo es lo que sumás al raw spread Tier 1. Se mide en pips. Pepe pide las cost sheets y las compara cabeza a cabeza:

**Benchmark 2026 PoPs Tier 2:**
- EURUSD markup: 0.2-0.5 pip
- GBPUSD: 0.3-0.6 pip
- Gold (XAUUSD): 8-15 cents
- Índices (US30, NAS100): 0.5-1.5 points
- Crypto (BTCUSD): $5-30 spread

Un LP que cotiza markup claramente fuera de rango (>2x el mercado) queda descartado sin análisis adicional.

### 3.2 Execution quality

**Métricas clave:**
- Fill rate (% órdenes ejecutadas sin rechazar): target >98%
- Requote rate (% quotes que requieren confirmación por slippage): target <2%
- Latency (tiempo desde order sent hasta fill): target <20ms
- Slippage (positive vs negative): debe ser simétrico, no siempre negativo
- Rejection rate por motivo (liquidity, market closed, off-quote): analizar patrones

Pepe obtiene estos datos del bridge + execution reports del LP. Un LP con >5% rejections o slippage sistemáticamente negativo = red flag.

### 3.3 Instrumentos disponibles

El LP debe cubrir todo lo que NEOMAAA quiere ofrecer:
- **Forex majors + minors + exotics** (mínimo 50 pares)
- **Metales** (XAU, XAG, XPT, XPD)
- **Índices** (US30, SPX500, NAS100, GER40, UK100, JPN225, HK50, etc)
- **Commodities** (WTI, Brent, gas natural)
- **Acciones** (CFDs sobre 50-500 acciones blue chip)
- **Crypto** (si el LP lo cubre, sino complementar con LP crypto-especializado)
- **Bonos** (US10Y típicamente el único relevante retail)

NEOMAAA lista 2000+ instrumentos → es probable que 1 LP no cubra todo y necesitemos combinar 2-3.

### 3.4 Leverage acceptance

¿Qué leverage acepta el LP para que el broker pase al cliente?
- Tier 1 bancos: 50:1 a 100:1 típicamente.
- Tier 2 PoPs: 100:1 a 200:1.
- Tier 3 aggregators: 200:1 a 500:1 en majors, menor en exotics.

NEOMAAA ofrece leverage hasta [DATO: leverage máximo comercializado] al cliente retail. Necesitamos LP que permita leverage ≥ al que ofrecemos, con margin sufficient parked.

### 3.5 B-Book risk management del LP

¿Cómo gestiona el LP su propio risk? Esto importa porque si el LP hace B-Book sobre nuestro A-Book y quiebra, estamos expuestos. Evaluar:
- Jurisdicción y regulación del LP (CySEC, FCA mejor que offshore)
- Auditor externo (Big 4 vs regional)
- Financial statements (piden o al menos credit rating)
- Track record (años en mercado, reputación en foros institucionales)
- Capital adequacy (algunos brokers institucionales publican Tier 1 capital ratio)

### 3.6 Tecnología (FIX API / MT5 bridge)

**Preguntas técnicas:**
- FIX API: versión 4.4 o 5.0? Documentación? Test environment disponible?
- MT5 bridge: certificado MetaQuotes? Latency overhead?
- Market depth Level 2 disponible?
- Post-trade reporting data feed?
- Uptime SLA contractual? (target 99.9%)
- Recovery mechanism si bridge cae (failover, queueing)?

Angel (CTO interino) evalúa técnicamente. Un LP con tech legacy o mal documentada es nightmare operacional.

### 3.7 Financial stability del LP

Necesitamos confianza de que el LP estará acá en 2-3 años. Red flags:
- Cambios de ownership recientes sin explicación clara
- Rotación alta de senior staff
- Noticias de lawsuits o regulatory actions
- Cash flow problems reportados
- Compañía madre con problemas

### 3.8 Regulación

**Tiers regulatorios (de mejor a menor para contraparte):**
- Tier 1: FCA (UK), CySEC (Cyprus), ASIC (Australia), FINRA/CFTC (USA), MAS (Singapore), FINMA (Switzerland)
- Tier 2: DFSA (Dubai), SCA (UAE), BVI FSC, MFSA (Malta), JFSA (Japan)
- Tier 3: offshore generic (FSC Mauritius, Seychelles FSA, Anjouan AOFA, SVG FSA)

Preferimos LP Tier 1-2. LP Tier 3 acceptable solo si es complementario (backup, especializado) y con justificación clara.

### 3.9 Minimum volume requirement

¿Qué volumen mensual mínimo requiere el LP?
- Si requiere $20M/mo y arranco con $2M → no fit.
- Si requiere $5M/mo y tengo proyección de $8M a los 3 meses → OK, negociar ramp-up period.

### 3.10 Margin requirement y margin policies

- Cuánto margin parked requiere inicialmente
- Cómo calcula margin requirement por posición abierta (%, fórmula, stress tests)
- Margin call policy (cuánta anticipación, en qué moneda)
- Retirada del margin al cierre relación (timeline, condiciones)

**[DATO: benchmarks de margin requirements actuales negociados con los LPs candidatos]**

---

## 4. Matriz comparativa — ejemplo de evaluación LP

Para ilustrar cómo se compara objetivamente, ejemplo con 4 LPs hipotéticos evaluados en mismos criterios (números ilustrativos, no datos reales).

| Criterio | LP-A (Match-Prime PoP) | LP-B (Finalto PoP) | LP-C (TopFX PoP) | LP-D (B2Broker crypto) |
|----------|------------------------|-------------------|------------------|------------------------|
| Tier | 2 | 2 | 2 | 3 |
| Markup EURUSD | 0.25 pip | 0.30 pip | 0.35 pip | 0.8 pip |
| Markup XAUUSD | 12 cents | 10 cents | 15 cents | 30 cents |
| Instrumentos | 1,500 FX+CFDs | 2,000+ | 1,800+ | 200 (crypto focused) |
| Leverage max pass-through | 200:1 | 100:1 | 200:1 | 100:1 (crypto) |
| Min volume | $10M/mo | $25M/mo | $5M/mo | $2M/mo |
| Min margin | $200K | $500K | $100K | $50K |
| MT5 bridge | Native cert | Native cert | Native cert | Via partner |
| Latency promedio | 12ms | 15ms | 18ms | 40ms |
| Fill rate | 99.2% | 98.8% | 98.5% | 96% |
| Regulación | CySEC + Malta | FCA + CySEC | CySEC | IBC BVI + partners |
| Onboarding timeline | 8 semanas | 12 semanas | 6 semanas | 4 semanas |
| Recomendación | Core principal | Core secundario | Backup | Crypto especializado |

En este ejemplo, la estrategia sería:
- **LP-A Match-Prime** = 50-60% del flow (mejor balance markup + fill rate + margin asumible)
- **LP-C TopFX** = 30-40% del flow (diversificación, min volume bajo para empezar)
- **LP-D B2Broker** = 100% del crypto flow (especializado)
- **LP-B Finalto** = considerar año 2 cuando volumen justifique $500K margin

**[DATO: comparativa real NEOMAAA con LPs evaluados por Pepe, cost sheets firmadas, negociaciones cerradas]**

---

## 5. Proceso de contratación LP — 2 a 4 meses

### 5.1 Mes 1 — Discovery

**Objetivo:** identificar y contactar 5-10 LPs candidatos.

**Acciones:**
- Mapping del mercado: listar todos los PoPs Tier 2 relevantes con presencia LATAM/global.
- Outreach inicial vía LinkedIn, referidos de industria, conferencias (iFX Expo Dubai, Cyprus; Finance Magnates Barcelona, London Summit).
- Primera call de 30 min con sales del LP (pitch mutuo).
- Request de cost sheet + overview package.
- Filtro: descartar los que claramente no fit (min volume absurdo, markup fuera de mercado, tech legacy).
- Salida mes 1: shortlist de 3-5 LPs con data para evaluar.

### 5.2 Mes 2 — DD mutua

**Objetivo:** evaluar profundamente los 3-5 shortlisted + el LP nos evalúa.

**Acciones del broker:**
- Technical deep-dive (Angel + dev team): API docs, bridge setup, test environment, latency benchmarks reales.
- Financial DD al LP: estados financieros si disponibles, credit rating, licencia verificada con regulador, historial legal.
- Reference calls: hablar con 2-3 brokers que usan el LP (el LP provee referrals, también buscamos independientes).
- Execution quality test: si el LP lo permite, demo account con flow real por 2 semanas para medir fill rate, latency, slippage.

**Acciones del LP (lo que nos piden):**
- KYB corporate de Neomaaa Ltd (incorporation docs, licencia AOFA, ownership structure)
- KYC personal de directores (Diego, Angel, Yulia, Stanislav)
- Financial statements Neomaaa (aunque sea broker en pre-launch, proyecciones + bank statements)
- Compliance framework (policies AML, KYC)
- Proyección de volumen y perfil de cliente típico
- Business plan / pitch deck

**Salida mes 2:** 2-3 LPs con DD completa y go-ahead de ambos lados.

### 5.3 Mes 3 — Negociación

**Objetivo:** cerrar términos económicos y contractuales.

**Puntos a negociar:**
- **Markup:** pedir reducción 10-30% del rack card. Un broker serio no paga el markup list-price salvo que no tenga volumen ni leverage de negociación.
- **Minimum volume commitment:** comprometer un target realista a 12 meses a cambio de markup más bajo.
- **Margin requirement inicial:** pedir ramp-up (ej. $100K inicial, sube a $300K en 6m con volumen).
- **Margin interest:** algunos LPs pagan interés sobre margin parked (libor + spread). Pedir.
- **Volume rebates:** después de X volumen mensual, markup baja Y%. Incentivar crecimiento.
- **Termination notice:** 30-60 días (corto para flexibilidad) ambos lados.
- **Dispute resolution:** arbitraje en jurisdicción neutral (London LCIA, Singapore SIAC, Cyprus).
- **SLA execution:** fill rate mínimo 98%, latency <20ms, uptime 99.9% — con penalidades si se incumple.
- **Credit line:** rarísimo conseguir credit, pero si nuestro volumen lo justifica vale pedirlo.
- **Information rights:** data raw de execution, no solo reports consolidados. Importante para auditoría y compliance interno.
- **Exclusivity clauses:** evitar cualquier cláusula de exclusividad. Queremos multi-LP.
- **Change of control:** si el LP es adquirido, tenemos derecho a terminar sin penalty.

**Legal review:** despacho especializado en financial services revisa master agreement antes de firmar. No firmar sin legal review.

**Salida mes 3:** contrato firmado con LP #1 (y paralelo con LP #2).

### 5.4 Mes 4 — Onboarding técnico

**Objetivo:** go-live con flow real.

**Acciones:**
- Setup FIX API / MT5 bridge en environment staging.
- Tests unitarios y de integración (ejecución de orders diversos, cancel, modify, partial fill).
- Migración de credenciales a producción.
- Test en producción con size pequeño (órdenes $100-500 notional).
- Reconciliación post-trade: nuestro record vs el del LP debe matchear 100%.
- Ramp-up gradual: semana 1 con 5% del flow, semana 2 25%, semana 3 50%, semana 4 target.
- Monitoreo cercano primeras 4 semanas (Pepe daily review).
- Ajustes y optimizaciones en routing.

**Salida mes 4:** LP operativo en producción con flow estable.

---

## 6. Diversificación de LPs — por qué múltiples

Nunca 1 LP único. La regla es inviolable. Las razones:

### 6.1 Riesgo operacional

Si el único LP tiene outage técnico (bridge down, DDoS, maintenance no planeada), el broker no puede hedgear ni cotizar en ciertos instrumentos. Flow se detiene → clientes no pueden operar → quejas + reputacional.

### 6.2 Riesgo contraparte

Si el LP quiebra, es sancionado, o tiene problema regulatorio súbito, el margin parked puede quedar bloqueado 30-180 días. La empresa se queda sin capacidad de hedge y potencialmente sin ese capital circulante.

### 6.3 Price competition

Múltiples LPs te dan quotes comparables en tiempo real. El sistema rutea al que tiene mejor precio en cada momento (smart order routing). Esto mejora ejecución para el cliente y negocia para el broker.

### 6.4 Negotiation leverage

Cuando un LP sabe que sos multi-LP, se esmera en mantener tu flow. Si sabe que dependés de él, te trata peor en renegociación. "Estamos evaluando aumentar share a LP-B" es la frase que resetea todas las negociaciones.

### 6.5 Flexibilidad de producto

Cada LP tiene fortalezas: uno es bueno en FX majors, otro en metales, otro en crypto, otro en exotics. Distribuyendo el flow usás el mejor en cada clase.

### 6.6 Setup recomendado NEOMAAA año 1

- **LP #1 Principal (PoP Tier 2, tipo Match-Prime / TopFX):** 50-60% del flow. Core de ejecución en FX majors + índices + metales.
- **LP #2 Secundario (PoP Tier 2 distinto, tipo Finalto):** 30-40%. Backup activo + diversificación jurisdicción.
- **LP #3 Crypto especializado (B2Broker / FXCM crypto):** 100% del flow crypto, 10-20% del total del broker si crypto es producto relevante.
- **LP #4 Backup small relationship:** 0-5% del flow. Mantener relación activa (mínimo volumen, integración lista) por si un core falla.

**Target año 2:** agregar LP #5 Tier 2 o quizás PoP con acceso Tier 1 agregado, para empezar a acceder liquidez Tier 1 sin contratar directo.

**Target año 3:** si volumen >$100M/mo y licencia evoluciona (considerar adding DFSA Dubai, SCA UAE, o secondary CySEC), evaluar Tier 1 directo (LMAX o Saxo por ejemplo).

> [!WARNING]
> Tener 2 LPs "registrados" pero uno inactivo no cuenta como diversificado. Ambos deben tener flow actual y margin parked (aunque sea pequeño). Un LP que no ve flow en 6 meses empieza a perder interés y cuando lo necesités en emergencia te trata como cliente nuevo.

---

## 7. Gestión operativa day-to-day

### 7.1 Daily — Pepe (Head of Dealing) + Yulia (Margin)

**Pepe:**
- Revisar execution reports de LPs del día anterior
- Fill rate, slippage, latency por LP en dashboard
- Cualquier instrument flag (mucho rechazo, spread atípico)
- Net exposure por instrumento y ajuste si necesario

**Yulia:**
- Margin utilization por LP (nunca cerca del 90%)
- Anticipar necesidad de top-up margin si utilization sube
- Reconcile diario: balance margin según nuestro record vs el del LP

### 7.2 Weekly — Pepe

- Review de performance por LP en semana completa
- Rebalanceo de routing si un LP está performando mal (ej. LP-A tiene 10% más slippage últimos 7 días → reducir share temporalmente)
- Call semanal o bi-semanal con account manager del LP (relationship maintenance)
- Review de cambios de mercado (nuevo instrumento pedido por clientes, cambios en spread structure)

### 7.3 Monthly — Pepe + Yulia + Diego

- Invoice review (LPs facturan markup + fees)
- Detectar cargos no esperados (hidden fees, rate changes sin notificación)
- Reconcile total volumen reported por LP vs nuestro record
- Relationship call formal con senior del LP (no solo el account manager)
- Revenue del broker atribuible a spread LP#1 vs LP#2 vs LP#3

### 7.4 Quarterly — todos los principals + Pepe

- Full LP meeting in-person idealmente (conferencia, o visita Dubai/Limassol/Londres)
- Renegociación de rates si volumen creció (cada cuatrimestre es ciclo de ajuste)
- Review de adición de nuevo LP o remover uno
- Actualización de Risk Register (LP counterparty risk score)

### 7.5 Annual

- Review completa de contrato y renovación
- Comparación con ofertas alternativas del mercado (DD activa de 2-3 LPs nuevos)
- Decision go/no-go de continuar con cada LP

---

## 8. Negociación con LPs — power dynamics y tactics

La relación con un LP no es fija. El equilibrio de poder cambia con volumen, tiempo, y contexto competitivo. Entender en qué fase estamos dicta la negociación.

### 8.1 Fase inicial — el LP tiene poder

Broker nuevo, sin track record, con licencia offshore, volumen proyectado pero no demostrado. El LP acepta la relación con términos rack card (markup alto, margin full, volumen comprometido). El broker negocia poco, acepta el standard para subirse al barco.

**Estrategia:** foco en elegir el menos peor de los disponibles. Aceptar los términos iniciales pero firmar con cláusulas de review a los 3/6 meses. La negociación real empieza cuando tenés data.

### 8.2 Fase de tracción — equilibrio

Broker con 3-6 meses operando, volumen creciendo, flow medible y "no tóxico" (no puro scalper news-trader). Acá el LP se da cuenta que sos cliente valioso.

**Estrategia:** primera renegociación formal. Con data de volumen real + flow quality demostrado, pedir:
- Reducción markup 10-20% en instrumentos principales
- Liberación parcial de margin (si crecimos, el margin requirement % sobre volumen baja)
- Volume rebates (tier pricing)
- Acceso a más instrumentos o leverage mayor

### 8.3 Fase establecida — el broker tiene poder

Broker con 12+ meses operando, volumen $20M+/mo consistente, flow quality bueno, múltiples LPs onboardeados (pasarías flow a otro si hace falta).

**Estrategia:** renegociaciones duras pero respetuosas. Uso de tactics específicos:

**Tactic 1 — "tengo una quote más barata":**
"LP-C me está ofreciendo markup 0.20 pip en EURUSD vs tus 0.25. Si igualás te mantengo volumen, sino migro 30%." Funciona si realmente tenés la quote de LP-C (no mentir, se descubre fácil en esta industria).

**Tactic 2 — "commit volume por markup":**
"Si me bajás markup a 0.18 pip, firmo commitment de $15M/mes próximos 12 meses con cláusula penalty si bajo." LP valora certeza de volumen.

**Tactic 3 — "reducí margin parked":**
"Ya llevamos 18 meses, track record limpio, volumen predecible. Reducí margin requirement del 10% al 5% del volumen. O pagame interés sobre el exceso."

**Tactic 4 — "necesito crypto support":**
"Nuestros clientes piden crypto más agresivo. Si agregás BTCUSD/ETHUSD con markup sub-$20 me consolido acá, sino voy a LP crypto-especializado y bajo tu share." Negociación de expansión de producto + pricing juntos.

**Tactic 5 — "termination notice corto":**
Siempre pedir termination con 30-60 días notice, no 6-12 meses. Da flexibilidad si la relación se deteriora.

**Tactic 6 — "referencia mutua":**
Si sos broker con presencia LATAM y el LP quiere entrar en LATAM, hay valor en reference + intros. Usalo como chip de negociación.

### 8.4 Qué no hacer en negociación

- **Amenazar sin tener alternativa real.** Si bluffeás y el LP te llama el bluff, perdés credibilidad para próximas negociaciones.
- **Pedir todo al mismo tiempo.** Concentrate en 2-3 puntos por renegociación. Si pedís 10 cosas, conseguís 2 aguadas.
- **Faltar el respeto o poner al account manager en situación incómoda públicamente.** Esta industria es chica; tu reputación vale más que un 0.05 pip.
- **Cerrar sin legal review.** Nunca.

---

## 9. Cláusulas contractuales críticas

El master agreement con un LP es un documento denso de 30-80 páginas. No todas las cláusulas son críticas pero hay 7 que deben estar bien escritas y revisadas.

### 9.1 Termination clause

**Qué debe decir:**
- Termination por cualquier lado con 30-90 días notice (preferimos 30-60).
- Termination por breach con cure period 15-30 días.
- Retiro de margin al cierre dentro de 30-60 días post-cierre efectivo, condicionado a no tener positions abiertas.
- Definición clara de "material breach" (non-payment, insolvency, regulatory action, fraud).

**Qué evitar:**
- Periodos de lock-up largo (no firmar minimum term >12 meses).
- Penalties de salida excesivos (ok tener fee administrativa, no penalty del 20% del margin).

### 9.2 Dispute resolution

**Preferencia:**
- Arbitraje internacional (LCIA London, SIAC Singapore, CCBC Cyprus) vs corte local.
- Ley aplicable preferentemente: English law o Cyprus law (maduras y predecibles).
- Idioma del arbitraje: inglés.

**Evitar:**
- Jurisdicción doméstica del LP sin reciprocidad (ej. corte de Cyprus si LP es Cyprus-based).

### 9.3 SLA de ejecución con penalidades

Las promesas verbales no valen. El contrato debe especificar:
- Fill rate mínimo (ej. 98%)
- Latency promedio máximo (ej. 25ms en condiciones normales)
- Uptime del bridge (ej. 99.9% en horas de mercado)
- **Penalidades si se incumple** (ej. service credit del 5-15% del markup mensual por mes de incumplimiento).

Sin penalidades, el SLA es aspiracional. Con penalidades, tenés derecho compensable.

### 9.4 Margin recovery si el LP tiene problema

¿Qué pasa con tu margin si el LP quiebra, es sancionado, o tiene cuenta congelada?
- Segregation del margin en cuenta separada (no en el balance operativo del LP).
- Trust account o escrow si es posible.
- Prioridad en caso de liquidación (nivel senior creditor).
- Insurance de counterparty credit si el LP lo ofrece.

En la práctica, la protección real depende de la jurisdicción del LP. Offshore genérico = protección baja. Tier 1 regulado = protección alta.

### 9.5 Information rights

El broker debe tener derecho contractual a:
- Raw execution data (no solo summary reports)
- Monthly reconciliation statements detalladas
- On-demand data pull via API o portal
- Audit trail accesible 7+ años

Útil para compliance (tenemos que poder producir data histórica si regulator pregunta) y para renegociaciones (tenemos metrics reales, no solo lo que el LP quiere mostrar).

### 9.6 Credit line (si aplica)

Raro que un LP nuevo te dé crédito, pero si sos broker establecido pedí:
- Credit line para temporary shortfall de margin (ej. $500K línea, intereses mercado)
- Uso: evita tener que parkear el máximo margin siempre.

### 9.7 Pricing transparency

- "No hidden fees" cláusula explícita
- Toda fee debe estar en schedule anexo al contrato
- Cambios de pricing requieren 30+ días notice por escrito
- Volume rebates escritos, no "discretional"

**[DATO: cláusulas específicas negociadas en contratos actuales/pendientes con LPs NEOMAAA, incluyendo términos económicos]**

---

## 10. Red flags — cuándo considerar salida

Un LP puede empezar excelente y deteriorarse. Señales de alarma que requieren escalación:

### 10.1 Retrasos en settlements

Settlement de flow a fin de día o semana debería ser predecible. Si empiezan a haber retrasos, especialmente en pagos del broker (rebates, credits), es señal de problema de liquidez del LP.

### 10.2 Pricing inconsistente o deteriorado

Markups que suben sin notificación formal. Spreads anormalmente anchos en momentos estándar. Quotes que desaparecen en volatilidad moderada. Puede indicar que el LP está teniendo problemas con sus propios LPs upstream.

### 10.3 Comunicación deteriorada

Account manager deja de responder rápido. Rotación alta de staff en el LP. Senior management difícil de alcanzar. Reuniones trimestrales canceladas o pospuestas.

### 10.4 Bad news pública

- Lawsuit contra el LP
- Regulatory action (multa, warning, investigation)
- Cambio de ownership no explicado
- Cambio de auditor sin razón
- Reportes en foros industriales (FinanceMagnates, Leaprate) negativos

### 10.5 Margin requirements suben sin justificación

El LP pide más margin sin que nuestro volumen o profile haya cambiado. Puede significar que el LP está teniendo problemas de capital y quiere parkear más cash del broker para usarlo.

### 10.6 Execution degrada

Fill rate baja, latency sube, slippage empeora. Si persiste >4 semanas y no hay causa externa (mercado extremo), el LP está teniendo problemas técnicos o prioritizando otros brokers.

### 10.7 Acciones cuando red flag confirmada

1. **Escalación interna:** Pepe flaggea a Diego + Yulia + Angel.
2. **Confrontación formal:** meeting con senior del LP pidiendo explicación por escrito.
3. **Reducir share de flow:** bajar participación de ese LP a 10-20% mientras se evalúa.
4. **Acelerar LP alternativo:** si no había LP alternativo activo, acelerar onboarding de uno.
5. **Preparar termination:** si no hay remediación clara en 30-60 días, preparar exit.
6. **Retiro de margin:** coordinar retiro ordenado de margin parked.
7. **Documentar todo:** correspondence por escrito para proteger al broker legal si hay dispute.

---

## 11. NEOMAAA — LP stack estado actual y target

### 11.1 Estado actual pre-launch

**[DATO: LPs contratados/firmados a fecha]**
- LP #1: [nombre, tier, markup negociado, min volume, margin, estado onboarding]
- LP #2: [mismo]
- LP #3: [mismo si aplica]

### 11.2 Target año 1 post-launch

- 3 LPs diversificados operativos
- Distribución target: 50% LP#1 / 35% LP#2 / 15% LP#3 (crypto)
- Margin total parked: $300-800K según volumen real
- Markup efectivo blended (weighted): <0.35 pip EURUSD
- Fill rate agregado: >98.5%
- Latency promedio: <20ms

### 11.3 Target año 2

- Agregar 1 LP crypto-especializado separado si crypto se vuelve producto relevante
- Renegociar markup en base a volumen real (target -15% vs año 1)
- Evaluar 1 LP de backup Tier 2 europeo
- Considerar adding DFSA Dubai secondary licensing para acceder mejores LPs

### 11.4 Target año 3

- Si volumen >$100M/mo, evaluar Tier 1 directo (LMAX, Saxo)
- Si expandimos a Asia fase 2, agregar LP asiático (Swissquote Asia, OSTC)
- Agregar institucional relationships si arrancamos white-label / IB institutional

**[DATO: Diego + Pepe confirman timeline y montos exactos por trimestre]**

---

## 12. KPIs de LP performance — el dashboard que Pepe mira

### 12.1 Execution KPIs (daily/weekly)

| KPI | Target | Rango aceptable | Rango alerta | Rango crítico |
|-----|--------|----------------|--------------|---------------|
| Fill rate | >99% | 98-99% | 95-98% | <95% |
| Requote rate | <1% | 1-3% | 3-5% | >5% |
| Average latency | <15ms | 15-25ms | 25-50ms | >50ms |
| Slippage promedio | ±0.1 pip | ±0.3 pip | ±0.5 pip | >±0.5 pip |
| Rejection rate | <1% | 1-2% | 2-5% | >5% |
| Uptime bridge | 99.95% | 99.9% | 99.5% | <99.5% |

### 12.2 Business KPIs (monthly)

| KPI | Medición |
|-----|----------|
| Volumen mensual por LP | $ total / notional |
| Markup efectivo vs contract | Cost actual / (volumen × markup contratado) |
| Share del flow total | % de volumen que va al LP |
| P&L del flow routed al LP | Revenue del broker atribuible al spread de ese LP |
| Margin utilization promedio | Daily average utilization / 100 |
| Reconciliation discrepancies | # discrepancias encontradas en reconcile mensual |
| Fees inesperadas | $ de cargos no previstos en invoice |

### 12.3 Relationship KPIs (quarterly)

| KPI | Medición |
|-----|----------|
| Response time a consultas | SLA horas hábiles |
| Frequency de contact proactivo del LP | Calls/meetings iniciados por el LP |
| Negotiation outcomes | % de pedidos del broker atendidos positivamente |
| New products/features agregados | Count de instrumentos o mejoras |
| Issues escalados y resueltos | # issues + tiempo de resolución |

### 12.4 Alertas automáticas (en sistema)

- Fill rate <95% en ventana 1h → email a Pepe
- Latency >50ms sostenido 30min → email a Pepe + Angel
- Margin utilization >80% → email a Yulia + Pepe
- Reconcile mensual con discrepancia >$1000 → email a Pepe + Yulia + CFO/Finance
- Uptime bridge <99% rolling 24h → alert + llamada

> [!TIP]
> Los KPIs son el early warning system. Un LP que performa dentro de target en todos los KPIs es buen LP. Uno que se desvía en 2+ KPIs simultáneamente requiere meeting inmediato. Uno que se desvía en 3+ por >2 semanas es candidato a reducción/termination.

---

## 13. Cross-references

- `executive/panorama-ejecutivo.md` — vista general del broker
- `executive/treasury-management.md` — margin parked es parte del treasury
- `executive/risk-management-owner.md` — LP counterparty risk detallado
- `executive/financial-controls.md` — controles sobre pagos a/desde LPs
- `executive/unit-economics-broker.md` — impacto del markup LP en P&L
- `compliance/ab-book-policy.md` — política A-Book / B-Book y cuándo hedgear
- `operations/*` — runbooks operativos de Pepe

---

## 14. Resumen ejecutivo para el owner

Un broker sin LPs no existe. NEOMAAA necesita 2-3 LPs Tier 2 operativos desde go-live, más un LP crypto especializado si cryptos son producto relevante, más un LP backup warm (con integración lista aunque no flow).

La selección de LPs no se delega; es decisión de Pepe + Diego con Angel validando la parte técnica. Cada contrato requiere legal review obligatorio antes de firmar. Cada renegociación trimestral es oportunidad de mejorar economics.

La diversificación no es opcional: single LP es riesgo existencial. Mínimo 2 LPs con flow activo, mínimo 3 si volumen >$10M/mo, mínimo 4 cuando crypto se agrega como producto core.

El dashboard de Pepe debe existir desde día 1 con los 20+ KPIs listados. Los 7 KPIs críticos (fill rate, latency, slippage, uptime, margin util, reconciliation, unexpected fees) se revisan diario. Los KPIs de relationship se revisan mensual/trimestral.

Las red flags se toman en serio siempre. Un LP que se deteriora rara vez mejora. Cuanto antes se escalone, más protegido está el capital parked.

El objetivo a 3 años: graduar de "broker que paga markup alto a PoPs" a "broker con acceso directo Tier 1 negociando desde posición de fuerza". Ese camino requiere volumen, licencia evolving, y disciplina en la gestión de estos partners B2B críticos.

---

*Fin del documento. Versión 1.0 — 13 abril 2026. Next review: julio 2026.*
