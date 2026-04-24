# Wallet Structure NEOMAAA — Setup Específico

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego (CEO), Angel, Yulia, Stanislav
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — uso exclusivo principals + Head of Finance cuando se contrate

> [!DANGER]
> Este documento define el setup **específico y ejecutable** del treasury de NEOMAAA Ltd. Los wallets descritos aquí son los que tienen que existir antes del go-live. Los placeholders marcados como `[DATO: ...]` son decisiones que requieren firma de Diego + Yulia antes de abrir cuentas. Cualquier improvisación en esta capa compromete la licencia, la relación con LPs y la credibilidad frente a PSPs.

> [!INFO]
> **Propósito:** aterrizar el framework genérico de [`treasury-management.md`](/content/executive/treasury-management) al caso concreto NEOMAAA Markets. Este documento responde: cuántos wallets exactos, qué banco en qué jurisdicción, qué custodian de crypto, cuánto cash en cada uno, quién firma qué, y en qué orden se abren. Es el runbook de treasury pre-launch + primeros 12 meses.

---

## 1. Estado actual pre-launch

Hoy (abril 2026) NEOMAAA Markets está en fase **pre-lanzamiento** con el siguiente estado operativo real:

- **Sociedad constituida:** Neomaaa Ltd, IBC 15968 Anjouan, licencia AOFA L15968/N activa.
- **Team:** 16 personas entre remote y Dubai hub. Principals: Diego (CEO), Angel (co-fundador / CEO Espana), Yulia (ops & finance), Stanislav (equity partner). Pepe Head of Dealing, Susana Compliance.
- **Registros portal:** ~250 pre-registrados, la mayoría heredados del ecosistema Funded.
- **Tech stack:** MT5 licenciado, Skale CRM, Sumsub KYC, Intercom soporte, portal Docsify + Next.js hub.
- **Runway proyectado:** 6 semanas al go-live fase 1 (LATAM + CIS + MENA). Asia es fase 2 (+3-6 meses).
- **Treasury actual:** cero. No hay cuentas corporativas segregadas para Neomaaa Ltd todavía. Todo lo que existe hoy es la estructura operativa de NEOMAAA Funded (prop trading), que es un negocio separado con su propio treasury limitado.

> [!WARNING]
> **Gap crítico pre-launch:** sin wallets segregados abiertos y funcionando (con al menos una transacción de prueba end-to-end), **no se puede aceptar el primer depósito de cliente real**. Aceptar depósitos antes de tener segregación operativa es commingling de facto y invalida la licencia. El milestone "wallets operativos" bloquea el go-live.

### 1.1 Decisiones previas ya tomadas por los principals

<div className="neo-stat-grid">

**Jurisdicción bancaria principal: Dubai.**
Por presencia física de Diego, acceso a bancos profesionales (Mashreq, ADCB, ENBD), infraestructura de pagos AED/USD y proximidad regulatoria AOFA-friendly.

**Moneda base de operación: USD.**
MT5 se opera USD-denominated, clientes de los 4 mercados target están cómodos con USD, LPs cotizan en USD.

**Custody dual: bank + crypto.**
Un pie en banking tradicional (fiat) y otro en crypto custody institucional (stables + BTC/ETH tesorería). Razón: 40%+ de depósitos esperados vienen en USDT (LATAM + CIS + MENA lo usan como default).

**Multisig para Reserves y Cold.**
Decisión principal ya tomada: la reserva estratégica (>$500K equivalente) siempre vive en multisig 3-of-3 Diego/Yulia/Stanislav. No hay excepción.

**Audit externo obligatorio año 1.**
Ya decidido que se contrata auditor externo antes de cerrar el primer año fiscal. Candidatos en sección 5.

</div>

### 1.2 Decisiones pendientes que bloquean treasury setup

Listado de decisiones que Diego + Yulia tienen que cerrar en las próximas 2-3 semanas para no bloquear el go-live:

1. **Banco primario Dubai** — Mashreq vs ADCB vs ENBD. Onboarding corporate banking tarda 4-8 semanas. Hay que arrancar YA.
2. **Custodian crypto** — Fireblocks vs BitGo vs Copper. Cada uno tiene onboarding propio y fees distintos.
3. **PSP primario + secundario** — cada PSP genera un settlement account separado, hay que alinear con el banco primario.
4. **LPs confirmados** — afecta cuánto margin se reserva en wallet LP Margin y con qué banco se liquida.
5. **Finance Manager fulltime** — hoy Yulia + Diego manual. A 6 meses post-launch es insostenible.

Ver sección 9 para el listado completo de `[DATO:]` abiertos.

---

## 2. Los 5 wallets propuestos para NEOMAAA

Extensión del framework genérico de [`treasury-management.md`](/content/executive/treasury-management) al setup concreto NEOMAAA. Cada wallet tiene propósito regulatorio, infraestructura técnica definida, y reglas de flujo claras.

### 2.1 Wallet #1 — Client Funds (Segregado)

**Propósito:** custodia exclusiva de dinero depositado por clientes. Todo lo que entra vía PSP o wire/crypto de un cliente cae acá. De acá sale **únicamente** hacia (a) retiros al mismo cliente, (b) margin-out al dealing flow cuando el cliente operó (nunca antes), (c) auditoría/inspection regulatoria.

**Infraestructura NEOMAAA:**

- **Capa fiat:** cuenta corporativa segregada etiquetada `NEOMAAA LTD — CLIENT FUNDS` en banco primario Dubai. `[DATO: banco primario confirmado — Mashreq / ADCB / ENBD]`. Cuenta documentada en carpeta compliance, cargada en Skale como settlement account.
- **Capa crypto:** sub-wallet dedicado en custodian institucional, multisig 2-of-3 Diego/Yulia/Pepe, etiquetado `CLIENT_FUNDS_SEGREGATED`. `[DATO: custodian confirmado — Fireblocks / BitGo / Copper]`.
- **Moneda:** 100% USD (fiat) + 100% stablecoins USDT/USDC (crypto). **Prohibido especular** con este wallet. Ver sección 6.
- **Threshold efectivo esperado:** en peak mes 6-12, equivalente a depósitos netos acumulados. Estimación conservadora mes 6: USD 1.5-3M. Mes 12: USD 4-8M. `[DATO: estimación validada por Yulia post-primer mes real]`.

**Reglas de flujo (inviolables):**

> [!WARNING]
> **Prohibiciones absolutas sobre Client Funds:**
> - No se transfiere a Operating jamás, por ningún motivo, sin que haya una orden ejecutada y liquidada del cliente.
> - No se usa como colateral de nada.
> - No genera yield ni staking. Los stablecoins quedan idle.
> - No se presta a LPs ni a partners.
> - Toda salida requiere reconciliation contra ledger interno dentro de las 24h.

**Reconciliation:** daily (Yulia o Finance Manager). Bank balance + crypto balance vs ledger interno MT5 (equity total clientes). Tolerancia: <0.5% diaria. Cualquier gap >0.5% es incidente compliance, se escala a Susana y se documenta.

### 2.2 Wallet #2 — Operating

**Propósito:** dinero del broker. Paga sueldos, tech vendors (MT5, Skale, Sumsub, Intercom), marketing, legal, rent Dubai hub, viajes, todo OPEX.

**Infraestructura NEOMAAA:**

- **Capa fiat:** cuenta corporativa separada `NEOMAAA LTD — OPERATING` en mismo banco primario. Puede ser sub-cuenta del banco principal pero con IBAN/account number distinto y etiqueta explícita.
- **Capa crypto (treasury operativo):** wallet Fireblocks/BitGo etiquetado `OPERATING_TREASURY` para pagos crypto a vendors y colaboradores que prefieren USDT. Single-sig con MPC y approval rules 1-of-2 (Yulia o Diego) para montos <USD 25K; 2-of-2 (Yulia + Diego) para montos ≥USD 25K.
- **Moneda:** mix según sección 6 — 20% BTC / 60% USDT / 20% fiat USD. La razón: se espera que OPEX se pague mayoritariamente USD/USDT; el 20% BTC es reserva estratégica de crecimiento de valor.
- **Threshold objetivo:** mantener **3 meses de burn rate** cubiertos acá. `[DATO: burn rate mensual validado Q2 2026 — estimación preliminar USD 180-250K/mes]`. Implica mantener USD 600-750K en Operating.

**Reglas de flujo:**

- Entra: transfers desde Reserves (funding inicial), fees/commissions cobradas al cliente (spread markup, swap, inactivity), PnL neto del B-Book flow.
- Sale: sueldos (Wise / bank transfer), vendors, afiliados (vía Affiliate Payouts después de approval), retiros a Reserves cuando el balance excede el threshold.

### 2.3 Wallet #3 — Affiliate Payouts

**Propósito:** pagar a afiliados e IBs sus comisiones mensuales. Separado de Operating porque:
- Ritmo distinto (payout mensual batch vs flujo continuo).
- Auditoría más simple (un ledger específico de commission statements).
- Compliance KYC afiliado es su propio flow (cada affiliate tiene AML check antes de recibir primer payout).

**Infraestructura NEOMAAA:**

- **Capa crypto (principal):** wallet USDT en Fireblocks/BitGo etiquetado `AFFILIATE_PAYOUTS`. Razón: 80%+ de afiliados NEOMAAA vienen de LATAM, Rusia, MENA — todos pagan/cobran en USDT. Fees de red (<1% vs 3-5% fiat wire) es el diferencial económico.
- **Capa fiat (residual):** Wise Business + Airwallex para los afiliados que piden wire en EUR/USD/GBP. Estimación: <20% de payouts totales.
- **Moneda:** 100% USDT en el wallet crypto, multi-currency fiat en Wise/Airwallex según destino.
- **Threshold:** batch mensual. Se carga al wallet entre el 1-3 de cada mes el monto total de commissions calculadas, se paga todo antes del día 7, se vacía. No se mantiene cash idle acá.

**Approvals:**

- Batch mensual completo <USD 100K: Yulia aprueba.
- Batch mensual >USD 100K: Yulia + Diego co-sign.
- Payout individual anómalo (ej: afiliado pide adelanto fuera de ciclo): siempre requiere Diego approval explícito.

### 2.4 Wallet #4 — LP Margin

**Propósito:** colateral depositado en los Liquidity Providers para cubrir posiciones abiertas del flujo A-Book (pass-through). NEOMAAA opera modelo híbrido ECN/STP — la porción A-Book pasa a LPs reales y requiere margin depositado con ellos.

**Infraestructura NEOMAAA:**

- **Estructura:** **un wallet separado por LP**. NEOMAAA target fase 1: **3 LPs** para redundancia. `[DATO: LP #1 confirmado — candidatos: LMAX, CFH, Swissquote PB]` `[DATO: LP #2 confirmado]` `[DATO: LP #3 confirmado]`.
- **Tipo de cuenta:** margin account institucional, reporta daily statement al broker.
- **Moneda:** USD 100%. Stablecoins no aplican (los LPs institucionales no aceptan USDT como margin).
- **Threshold por LP:** **USD 250-500K** por LP al arranque. Total sistema 3 LPs: USD 750K - 1.5M. Este es CAPEX inicial que sale de Reserves vía Operating.

**Reglas de flujo:**

- Funding inicial: transfer one-time desde Reserves al momento de onboarding LP.
- Top-up: cuando el utilization ratio del margin supera 70%, Pepe (Head of Dealing) pide top-up a Yulia. Yulia aprueba <USD 100K; Yulia+Diego co-sign >USD 100K.
- Withdrawal: se retira exceso de margin cuando el utilization cae bajo 30% sostenido por 2 semanas. Devuelve a Operating o Reserves según estado de cash.

> [!INFO]
> **Diversificación LPs:** no concentrar más del 50% del volumen en un solo LP. Si un LP tiene freeze/issue técnico, los otros dos absorben. Esta es decisión principals — no negociable.

### 2.5 Wallet #5 — Reserves (Cold Storage)

**Propósito:** reserva estratégica para supervivencia de la empresa. Runway extendido + war chest para oportunidades (ej: adquisición de cartera de afiliados, licencia adicional jurisdicción tier 1, expansión mercado nuevo).

**Infraestructura NEOMAAA:**

- **Capa fiat:** cuenta bancaria en **jurisdicción separada de Dubai** — **Swiss bank o Liechtenstein private bank**. Razón: diversificación jurisdiccional contra cualquier acción sobre el banco Dubai primario. `[DATO: banco reserve confirmado — candidatos: Swissquote, Dukascopy, LGT, VP Bank]`.
- **Capa crypto:** **multisig 3-of-3** en hardware wallets — Diego / Yulia / Stanislav. Infraestructura: Gnosis Safe sobre Ethereum (USDT/USDC/ETH) + custodian institucional para BTC (Fireblocks cold storage o Casa multisig).
- **Moneda:** mix 40% BTC / 40% (ETH + stables) / 20% fiat. Ver sección 6 para rationale.
- **Threshold:** mínimo **6 meses de OPEX cubierto** siempre. Target año 1: USD 1.5-2M en Reserves. Año 2: USD 3-5M.

**Reglas de flujo:**

> [!WARNING]
> **Reserves es intocable sin aprobación formal de los 3 principals (Diego + Yulia + Stanislav).** Todo movimiento de salida requiere:
> - Email escrito con justificación.
> - Aprobación explícita de los 3 por separado.
> - Documentación en acta de decisiones (`05-DECISIONES` Obsidian).
> - Multisig execution con 3 hardware wallets físicos.

**Única excepción:** freeze del banco primario Dubai — en ese caso se puede activar contingency plan pre-aprobado para cubrir operating urgente. Contingency plan es un doc separado que tiene que firmarse antes del go-live.

---

## 3. Matriz de signatories

Quién puede aprobar qué monto en cada wallet. Esta matriz es vinculante y se replica en los sistemas bancarios (approval rules) y en Fireblocks/BitGo (policy engine).

| Wallet | <USD 10K | USD 10K-50K | USD 50K-250K | USD 250K-1M | >USD 1M |
|---|---|---|---|---|---|
| **Client Funds** | Yulia o Pepe (solo retiros a clientes) | Yulia + Pepe | Yulia + Pepe + log a Susana | Yulia + Pepe + Diego | Los 3 principals + Susana notificada |
| **Operating** | Yulia | Yulia | Yulia + Diego | Yulia + Diego | Yulia + Diego + Stanislav |
| **Affiliate Payouts** | Yulia | Yulia | Yulia + Diego | Yulia + Diego | Bloqueado — dividir en 2 batches |
| **LP Margin** | Pepe + Yulia | Pepe + Yulia | Pepe + Yulia | Yulia + Diego | Los 3 principals |
| **Reserves** | N/A — no hay movimientos <USD 10K | N/A | 3 principals multisig | 3 principals multisig | 3 principals multisig + acta formal |

> [!TIP]
> **Regla mnemónica:** "10K solo / 50K doble / 250K triple / 1M board". Cualquier excepción a esta regla se escala a Diego por escrito.

### 3.1 Usuarios en el sistema bancario y Fireblocks

Cada principal y operador tiene su propia credencial con role definido. **Prohibido compartir credenciales** — incluye 2FA devices.

| Usuario | Rol | Wallets con acceso | Nivel de aprobación |
|---|---|---|---|
| Diego (CEO) | Principal | Todos | Hasta el límite de cada wallet |
| Yulia | Principal + Ops | Todos | Hasta el límite de cada wallet |
| Stanislav | Principal | Reserves + Operating (view) + Client Funds (view) | Solo multisig Reserves |
| Angel | Co-fundador | Operating (view) + reports | Sin signing authority |
| Pepe (Head Dealing) | Operador | LP Margin + Client Funds (flujo margin) | Approvals conjuntas con Yulia |
| Susana (Compliance) | Oversight | Todos en read-only | Sin signing authority, approval sobre exceptions |
| `[DATO: Finance Manager cuando se contrate]` | Ops diaria | Operating + Affiliate Payouts + reconciliation en Client Funds | Hasta USD 50K Operating, co-sign con Yulia para resto |

---

## 4. Daily ops treasury

Quién ejecuta qué en el día a día. Separar **quién hace** de **quién aprueba** es el principio de control interno básico (segregation of duties).

### 4.1 Pre-launch + primeros 6 meses (sin Finance Manager)

<div className="neo-step-list">

**Yulia — owner operativo del treasury.**
- Daily reconciliation (30 min cada mañana 09:00 Dubai).
- Procesa payouts a afiliados los primeros 7 días de cada mes.
- Mantiene ledger interno paralelo al core MT5 para auditar retiros de clientes.
- Ejecuta transfers <USD 50K directamente.
- Escala a Diego cualquier movimiento ≥USD 50K.
- Reporting mensual a los 3 principals.

**Diego — co-aprobador y visión estratégica.**
- Co-sign movimientos ≥USD 50K.
- Revisa daily dashboard (ver [`financial-controls.md`](/content/executive/financial-controls)) — 5 min por día.
- Board decisions Reserves.

**Pepe — operador técnico del flow dealing/LP.**
- Monitorea margin utilization en cada LP.
- Pide top-ups a Yulia cuando aplica.
- Reporta a Diego cualquier anomalía en el flujo dealing.

**Susana — oversight compliance.**
- Revisa weekly si la segregación de Client Funds está intacta (reconciliation check).
- Revisa AML/KYC de afiliados antes de que reciban primer payout.
- Valida que los statements mensuales del treasury sean consistentes con el ledger de clientes.

**External accountant part-time** — `[DATO: firma elegida — candidatos: PKF Dubai, Crowe Dubai, BDO UAE]`.
- Monthly close bookkeeping.
- Reconciliation revisión independiente mensual.
- Preparación para auditoría anual.

</div>

### 4.2 Mes 6-12 (con Finance Manager fulltime)

Con un Finance Manager (FM) in-house, Yulia se libera para enfocarse en operaciones generales de la empresa. La división queda:

- **FM (fulltime):** todo el daily treasury, reconciliation, payouts, vendor payments, bookkeeping con el accountant externo, preparación del monthly board report.
- **Yulia:** oversight del FM, aprobación de montos medios (USD 50K-250K), relación con bancos y custodian, reporta a Diego y board.
- **Diego:** aprobaciones de montos grandes, estrategia, board level.
- **Pepe:** LP margin sin cambios.
- **Susana:** compliance sin cambios.
- **External accountant:** sigue part-time, pero con FM como contraparte directa (no Yulia).

> [!INFO]
> **Hire deadline Finance Manager:** `[DATO: mes objetivo hire — recomendación ejecutiva Month 5-6 post-launch]`. Retrasarlo más carga a Yulia a un punto insostenible y genera errores por sobrecarga.

### 4.3 Año 2+ (estructura finance completa)

Ver [`financial-controls.md`](/content/executive/financial-controls) sección 10 — "Escalamiento del equipo finance" — para la proyección año 2 y año 3.

---

## 5. Shortlist banking y custody providers a evaluar

No se decide en este doc. Se deja shortlist fundamentada para que Diego + Yulia hagan due diligence y decidan en las próximas 2 semanas.

### 5.1 Banco primario Dubai — 3 candidatos

| Banco | Pros | Contras | Onboarding time |
|---|---|---|---|
| **Mashreq Bank** | Corporate banking maduro, SWIFT directo, friendly con empresas offshore licenciadas, NEO Biz es fintech-friendly | Exige visita física, requiere Emirates ID del signatory | 4-6 semanas |
| **ADCB (Abu Dhabi Commercial Bank)** | Muy estable, bueno para USD settlement, buena reputación frente a regulador | Más conservador con empresas IBC offshore, puede pedir más docs | 6-8 semanas |
| **Emirates NBD** | Red grande, integración con Wise/Airwallex, multi-currency nativo | Fee schedule alto vs alternativas, KYC extenso | 5-8 semanas |

**Recomendación ejecutiva:** abrir **dos cuentas en paralelo** — Mashreq como primario + ADCB como secundario/redundancia. El setup dual reduce riesgo operativo si un banco tiene freeze técnico. CAPEX incremental mínimo, beneficio enorme.

### 5.2 Banco Reserve (fuera Dubai) — 2 candidatos

| Banco | Jurisdicción | Pros | Contras |
|---|---|---|---|
| **Swissquote Bank** | Suiza | Fintech-friendly, integración con crypto, multi-currency, solid reputation | Mínimo depósito USD 500K para corporate, fees altos |
| **VP Bank Liechtenstein** | Liechtenstein | Private banking premium, discreción, estable, experiencia con crypto clients | Oneroso — compliance muy exigente, requiere referidos |

**Recomendación ejecutiva:** arrancar con Swissquote por menor fricción de onboarding. Evaluar migration a VP Bank año 2 cuando Reserves pase USD 2M.

### 5.3 Custody crypto institucional — 3 candidatos

| Provider | Pros | Contras | Fees |
|---|---|---|---|
| **Fireblocks** | Standard de industria, MPC + policy engine robusto, ~1,800 clientes institucionales, integraciones native con LPs/exchanges | Caro, requiere mínimo volumen | USD 30-100K setup + variable |
| **BitGo** | Custody qualified (NY Trust), seguro hasta USD 250M, audit trail fuerte, más barato que Fireblocks | Menos integraciones DeFi, UI más lenta | USD 15-50K setup + variable |
| **Copper** | UK-based, institutional, premium service, strong OTC desk | Más boutique, menos volumen retail | Custom pricing, en general premium |

**Recomendación ejecutiva:** **Fireblocks** para el tier 1 de custody (Operating + Affiliate Payouts + Client Funds crypto). **Gnosis Safe self-custody multisig 3-of-3** para Reserves — la crítica se mantiene bajo los 3 principals, sin dependencia de tercero para el balance más sensible.

### 5.4 Accounting software + ERP

| Tool | Uso | Costo aproximado |
|---|---|---|
| **Xero** | Accounting corporate general, multi-currency, integración bank feeds | USD 70-200/mes |
| **Wise Business** | FX + wires internacionales vendors/afiliados | Fee por transacción |
| **Airwallex** | Multi-currency account + payroll internacional | Fee por transacción |
| **Fireblocks Workspace** | Crypto treasury control + audit trail | Incluido en custody |
| **Metabase / Looker Studio** | BI sobre data CRM + treasury | USD 0-200/mes |

**Stack recomendado:** Xero (accounting central) + Wise Business (FX/wires) + Airwallex (multi-currency + payroll) + Fireblocks (crypto) + Metabase (dashboards).

---

## 6. Crypto treasury split sugerido

NEOMAAA tiene exposición crypto por dos vías: (a) clientes que depositan/retiran en USDT, (b) tesorería propia (Operating + Reserves) que mantiene posiciones. La split por wallet es intencional.

### 6.1 Reserves — 40% BTC / 40% (ETH + stables) / 20% fiat

**Rationale:**
- 40% BTC: tesis de largo plazo (multi-año). Correlación baja con negocio operativo, hedge contra inflación USD. Hold sin especulación corto plazo.
- 40% ETH + stables: 20% ETH (expuesto a smart contract ecosystem — optionality real) + 20% USDC/USDT (liquidez inmediata sin tener que mover BTC en mercado bajista).
- 20% fiat: USD en Swiss bank — liquidez regulatoria y opcionalidad M&A.

> [!TIP]
> **Rebalance:** evaluar composition quarterly. Si BTC sube 50%+ en un quarter y la split pasa a 55/35/10, rebalancear vendiendo parte del BTC a USDC. No hacer market timing fino — solo rebalance disciplinado.

### 6.2 Operating — 20% BTC / 60% USDT / 20% fiat

**Rationale:**
- 60% USDT: la mayoría de OPEX se paga en USDT (afiliados, vendors crypto, colaboradores LATAM/CIS/MENA).
- 20% BTC: reserva de valor operativa. Se vende proporcionalmente cuando se usa OPEX.
- 20% fiat USD: sueldos Dubai hub, vendors tradicionales (MT5, Skale, Sumsub), rent, legal.

### 6.3 Client Funds — 100% stables (USDT + USDC)

> [!WARNING]
> **Cero especulación sobre Client Funds.** Todo lo que entra en crypto vía deposit cliente queda en USDT o USDC en el sub-wallet `CLIENT_FUNDS_SEGREGATED`. No se convierte a BTC/ETH. No se hace staking. No genera yield. La única métrica relevante es: **1 USDT depositado = 1 USDT en wallet**. Cualquier desviación es commingling económico.

**Split estable:** 60% USDT / 40% USDC. Razón: diversificación contra single-issuer risk (Tether freeze event, USDC de-peg). Si uno colapsa temporalmente, el 40% del otro absorbe.

### 6.4 Affiliate Payouts — 100% USDT

Operativo puro — entra desde Operating el día 1-3 de cada mes, sale el día 1-7. No se mantiene idle.

### 6.5 LP Margin — 100% USD fiat

Los LPs institucionales no aceptan stablecoins como margin. USD bank wire únicamente.

---

## 7. Compliance considerations

NEOMAAA opera bajo **AOFA L15968/N** y las estructuras de treasury tienen que cumplir los siguientes requisitos específicos.

### 7.1 Segregación obligatoria de Client Funds (AOFA)

Regulatory requirement: Client Funds físicamente segregados del balance propio del broker. No es "contable" — es operacional. El banco y el custodian tienen que etiquetar la cuenta explícitamente como "Client Funds".

**Evidence esperada en audit:**
- Account opening docs del banco con el etiquetado visible.
- Transfer history que demuestre cero commingling.
- Monthly reconciliation firmadas por Yulia + Susana.
- Ledger interno que demuestre que balance wallet = suma equity clientes MT5.

### 7.2 Retention 7 años

AOFA + FATF requieren que todos los records de transacciones, reconciliation, KYC/AML estén disponibles por **7 años** desde la fecha de la transacción.

**Implementación NEOMAAA:**
- Xero retiene automáticamente bookkeeping por 7+ años.
- Bank statements descargados mensualmente a encrypted storage (Google Workspace con retention policy custom).
- Crypto audit trail: Fireblocks audit log exportado mensual a storage con retention 7 años.
- Skale CRM + MT5 logs con archival configurado.

**Owner:** Susana (Compliance) — responsable operacional del cumplimiento retention.

### 7.3 Annual external audit

NEOMAAA contrata auditor externo para firmar el año fiscal. Candidatos:

| Auditor | Pros | Fees estimados |
|---|---|---|
| **Baker Tilly** | Global, experiencia brokers offshore | USD 40-60K/año |
| **BDO UAE** | Presencia Dubai, buen conocimiento AOFA | USD 50-70K/año |
| **Mazars Offshore** | Especializado offshore licensing | USD 30-50K/año |
| **Grant Thornton UAE** | Premium tier 2 | USD 60-80K/año |

`[DATO: auditor confirmado — decision pendiente Diego + Yulia]`.

### 7.4 AML/CFT — Source of Funds

Cada deposit cliente ≥USD 10K pasa por enhanced due diligence (EDD) automáticamente via Sumsub. El flow de cash hacia Client Funds está linkeado al KYC record. Si falla el source-of-funds check, deposit se queda en holding y se escala a Susana antes de acreditar en MT5.

### 7.5 Sanctions screening

Cada payment (in + out) pasa por sanctions screening (OFAC, UN, EU, UK). Implementado a nivel PSP + Sumsub + Fireblocks policy engine. Any hit bloquea transacción, se escala a Susana, se documenta.

---

## 8. Milestones treasury año 1

Roadmap ejecutable desde hoy hasta Month 12. Cada milestone tiene owner y deadline.

<div className="neo-timeline">

**Month 0 (pre-launch, HOY) — Setup cuentas**
- Apertura bank primario Dubai (Mashreq + ADCB paralelo). Owner: Yulia.
- Onboarding custodian crypto (Fireblocks). Owner: Yulia + Diego.
- Apertura bank Reserve (Swissquote). Owner: Diego.
- Setup Wise Business + Airwallex. Owner: Yulia.
- Setup Gnosis Safe 3-of-3 Diego/Yulia/Stanislav. Owner: Diego + tech advisor.

**Month 1 — Primera transacción end-to-end**
- Test deposit cliente USD (fiat) → reconciliation → test withdrawal. Owner: Yulia + Pepe.
- Test deposit cliente USDT → reconciliation → test withdrawal USDT. Owner: Yulia + Pepe.
- Primera carga LP margin (USD 250K en cada LP). Owner: Pepe.
- First month close + reconciliation formal. Owner: Yulia + external accountant.

**Month 2 — Primer batch afiliados**
- Payouts primer ciclo completo a afiliados. Owner: Yulia.
- Primera reconciliation mensual formal presentada a los 3 principals. Owner: Yulia.

**Month 3 — Primer board report treasury**
- Board report Q1 con state of treasury. Owner: Yulia + Diego.
- Quarterly rebalance crypto (primera iteración). Owner: Diego + Yulia.

**Month 4-5 — Finance Manager hire**
- Job description publicada. Owner: Diego + Yulia.
- Shortlist + interviews. Owner: Yulia.
- Hire FM + onboarding. Owner: Yulia + FM.

**Month 6 — FM operativo**
- FM asume daily treasury. Owner: FM + Yulia oversight.
- Primer quarter-end con FM en control. Owner: FM.

**Month 9 — Preparación auditoría anual**
- Pre-audit internal review. Owner: FM + Susana.
- Audit firm engagement letter signed. Owner: Diego.

**Month 10-11 — External audit**
- Auditor on-site en Dubai (o remoto con docs). Owner: FM + Susana + Yulia.
- Findings review + remediation. Owner: Diego + Yulia.

**Month 12 — Close year 1 + plan year 2**
- Audit report firmado. Owner: Diego + auditor.
- Year 1 financials publicados al board. Owner: FM + Yulia.
- Budget + treasury plan year 2 aprobado. Owner: principals.

</div>

---

## 9. Placeholders `[DATO:]` — decisiones pendientes

Lista consolidada de todos los `[DATO:]` de este documento. Diego y Yulia completan antes del go-live.

| ID | Dato | Owner | Deadline recomendado |
|---|---|---|---|
| D-01 | Banco primario Dubai (Mashreq / ADCB / ENBD) | Diego + Yulia | Semana 1 |
| D-02 | Banco Reserve (Swissquote / Dukascopy / VP Bank) | Diego | Semana 2 |
| D-03 | Custodian crypto (Fireblocks / BitGo / Copper) | Diego + Yulia | Semana 1 |
| D-04 | LP #1 confirmado | Diego + Pepe | Semana 2 |
| D-05 | LP #2 confirmado | Diego + Pepe | Semana 2 |
| D-06 | LP #3 confirmado | Diego + Pepe | Semana 3 |
| D-07 | External accountant part-time (PKF / Crowe / BDO) | Yulia | Semana 2 |
| D-08 | External auditor anual (Baker Tilly / BDO / Mazars / GT) | Diego + Yulia | Month 6 |
| D-09 | Finance Manager hire — job description + start date | Diego + Yulia | Job post Month 3, hire Month 5-6 |
| D-10 | Burn rate mensual validado Q2 2026 | Yulia | Month 2 |
| D-11 | Threshold deposits estimado mes 6/12 post-launch | Yulia + Diego | Month 3 |
| D-12 | PSP primario + secundario | Angel + Diego | Semana 3 |
| D-13 | Gnosis Safe multisig — addresses de las 3 hardware wallets | Diego + Yulia + Stanislav | Semana 2 |
| D-14 | Monthly board meeting cadence + fecha recurring | Principals | Semana 4 |
| D-15 | Contingency plan freeze banco primario — doc separado | Yulia + Susana | Month 1 |

> [!TIP]
> Cada `[DATO:]` resuelto se reemplaza en este documento con la info confirmada y se firma una entrada en `05-DECISIONES` Obsidian con tipo `treasury-decision`.

---

## 10. Next steps ejecutivos

Acciones concretas que Diego + Yulia ejecutan esta semana y la próxima.

### 10.1 Esta semana (Week 1)

1. **Diego + Yulia:** llamar a Mashreq Bank + ADCB para arrancar corporate banking onboarding. Pedir docs list.
2. **Diego:** email a Fireblocks sales pidiendo proposal + Gnosis Safe setup interno.
3. **Yulia:** preparar carpeta docs corporate (COI, AML policy, KYC de los 4 principals, AOFA license copy, Anjouan registry proof).
4. **Pepe:** shortlist 3 LPs con term sheets pedidos.
5. **Angel:** confirmar PSPs primario + secundario.

### 10.2 Week 2

1. Onboarding en paralelo Mashreq + ADCB + Swissquote.
2. Fireblocks onboarding kickoff.
3. Gnosis Safe deployment + 3 hardware wallets configurados (Ledger / Trezor).
4. Test interno: transfer USD 100 end-to-end entre wallets (Operating → Affiliate Payouts → externa wallet personal → devuelta). Documentar tiempos y fees.

### 10.3 Week 3-4

1. First test deposit + withdrawal cliente real (interno — Diego como cliente test).
2. LP margin funding primer LP.
3. Primera reconciliation end-to-end documentada.
4. Revisión de este documento con `[DATO:]` ya cerrados, commit versión 1.1.

### 10.4 Gobernanza del documento

- **Ownership:** Yulia es owner operativo, Diego es owner estratégico.
- **Revisión:** quarterly mínimo, o ad-hoc cuando cambie un wallet / provider / threshold.
- **Versioning:** cada revisión bumpea versión semver (1.0 → 1.1 → 2.0 si hay cambio estructural).
- **Access control:** este doc vive en `/content/es/executive/` con acceso restringido a los 4 principals + Head of Finance (cuando se contrate) + Susana (Compliance, read-only).

---

**Documentos relacionados:**
- [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo) — vista macro del broker
- [`treasury-management.md`](/content/executive/treasury-management) — framework genérico multi-wallet
- [`unit-economics-broker.md`](/content/executive/unit-economics-broker) — CAC/LTV/margen bruto
- [`financial-controls.md`](/content/executive/financial-controls) — sistema de controles diarios/semanales/mensuales
- [`executive/ab-book-policy.md`](/content/executive/ab-book-policy) — policy hibrida A/B book
- [`compliance/expansion-regulatoria.md`](/content/compliance/expansion-regulatoria) — requisitos regulatorios AOFA Anjouan

---

**Última revisión:** 13 abril 2026 — Claude (preparación pre-launch)
**Próxima revisión obligatoria:** semana del primer deposit real (Month 1)
