# Treasury Management — Multi-Wallet Strategy para Brokers

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego, Angel, Yulia, Stanislav
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — uso exclusivo principals + Head of Finance cuando se contrate

> [!DANGER]
> Este documento establece la arquitectura de treasury de un broker profesional. Los principios descritos aquí NO son opcionales — son requisitos regulatorios (AOFA, FATF) y son las prácticas que separan a los brokers que sobreviven de los que quiebran. Cualquier desviación requiere aprobación formal del board.

> [!INFO]
> **Propósito:** establecer el framework de treasury de NEOMAAA Ltd alineado con best practices industria (IC Markets, Pepperstone, Exness, Tickmill, LMAX). Define qué wallets existen, para qué sirven, cómo se segregan, quién tiene signing authority y cómo se reconcilian. Este doc es teoría + framework. Para el setup específico NEOMAAA ver `executive/wallet-structure-neomaaa.md`.

---

## 1. Por qué Multi-Wallet es obligatorio

Un broker retail maneja simultáneamente cinco pools de dinero con propósitos, riesgos y dueños económicos diferentes. Mezclarlos es la definición técnica de **commingling** y es la violación más grave que un broker puede cometer.

### 1.1 Las razones regulatorias, operativas y de supervivencia

**Regulación exige segregación de Client Funds.**
AOFA L15968/N requiere que los fondos de clientes estén segregados del balance propio del broker. FATF Recommendations 10, 11 y 22 refuerzan el principio. Cualquier audit (interno o regulatorio) que encuentre commingling dispara revocación de licencia inmediata. Esto no es negociable — es ground zero de operar un broker legalmente.

**Reduce risk operativo.**
Separar cuentas reduce la probabilidad de error humano catastrófico. Si un empleado transfiere por error desde Client Funds a Operating, es detectable inmediatamente con reconciliation diaria. Si todo está en una sola cuenta, el error puede pasar desapercibido semanas y escalar a fraude aparente frente al regulador.

**Facilita auditoría externa.**
Los external auditors necesitan ver claramente qué es client money y qué no. Cuentas separadas hacen el audit barato y rápido (días) vs caro y doloroso (semanas, con findings).

**Protege de fraude interno.**
Un empleado deshonesto en una estructura multi-wallet con signatories separados necesita colusión de múltiples personas para robar. En una estructura single-wallet, basta con comprometer una credencial.

**AOFA + FATF requirement explícito.**
AML/CFT guidelines globales requieren que el broker pueda demostrar en cualquier momento que puede devolver a todos los clientes sus fondos depositados + PnL pendiente. Eso solo es posible con segregación.

### 1.2 Consecuencias históricas del commingling

Casos reales de la industria:
- **Broker tier 2 offshore (2019)** — usó Client Funds para cubrir B-Book drawdown de cliente VIP. Descubierto en audit, licencia revocada, directores procesados criminalmente.
- **Broker con licencia CySEC (2021)** — commingled client money con operating durante 18 meses. CySEC aplicó multa de €1.5M + suspensión. Empresa quebró.
- **Broker offshore Seychelles (2023)** — freeze de PSP descubrió que el broker no podía pagar retiros porque el Client Funds balance estaba artificialmente inflado con operating. Liquidación.

El patrón es consistente: commingling siempre se descubre. Tarde o temprano.

---

## 2. Los 5 wallets/accounts mínimos de un broker profesional

### 2.1 Wallet 1 — Client Funds (Segregated)

**Propósito**
Contener los depósitos de clientes hasta que los operen o los retiren. Es el pool más sensible del broker porque económicamente pertenece al cliente, no al broker.

**Status legal**
Segregated. Cannot commingle. Separado por regulación AOFA y FATF Rec. 10.

**Ubicación ideal**
- Corporate bank account dedicado, idealmente en banco reputado (Tier 1 o top tier offshore con tradición financiera: Dubai — Mashreq, ADCB; Singapore — DBS, OCBC; Switzerland — tier offshore compliance).
- Wallet crypto multisig para depósitos en USDT/BTC. Custodio enterprise (Fireblocks, BitGo).
- Separación por moneda: USD account, EUR account, USDT wallet, BTC wallet.

**Qué entra**
- Depósitos brutos de clientes via PSP (después que el PSP hace settlement y descontó fees)
- Transferencias entre cuentas del mismo cliente
- PnL realizado positivo cuando gana (queda en Client Funds hasta retiro)

**Qué sale (SOLO estas salidas son válidas)**
- Retiros aprobados del propio cliente (al cliente, same method)
- Transferencias entre cuentas del mismo cliente
- Ejecución de margin hacia trading server cuando el cliente opera (internal lógico, no físico)
- Pago de comisiones/spread markup al broker (del Client Funds al Operating, cuando el cliente cierra trade y el broker "cobra")

**Qué NUNCA puede salir de acá**
- Pagos a proveedores
- Salarios / payroll
- Bonuses
- Dividendos a principals
- Reserves movement
- LP margin top-up
- Marketing
- Cualquier gasto operativo

**Reconciliation**
- Diaria a primera hora AM
- Match: Sumsub + MT5 + CRM + bank balance
- Diferencia tolerada: ±0.5% (para errores de timing PSP, FX intraday)
- Diferencia >0.5% = investigación inmediata ese día
- Firma diaria de quien reconcilia (Yulia, luego Finance Manager)

**Segregación por moneda**
- USD account principal
- EUR account secundario
- USDT wallet principal crypto
- BTC wallet (opcional, según client mix)

Un cliente que depositó EUR debe poder retirar EUR. FX conversion intermedia no se permite sin consent del cliente por riesgo de FX loss.

**Red flag crítico**
Si el balance baja por debajo de (depósitos pending + open positions margin requirement + retiros pendientes + PnL acumulado positivo de clientes), hay fraude, error grave o mismanagement. Alerta inmediata al CEO.

---

### 2.2 Wallet 2 — Operating / Corporate

**Propósito**
P&L real del broker. Revenue - costs. Acá es donde vive el profit operativo.

**Status legal**
Propiedad del broker. Libre uso para propósitos corporativos legítimos.

**Ubicación ideal**
- Corporate bank account en jurisdicción amigable al broker y eficiente fiscalmente (Dubai, Singapore, Cayman, BVI, Delaware según estructura)
- Stablecoin treasury (USDT/USDC) para liquidez operativa rápida
- Opcional: BTC opportunistic allocation (10-20% del Operating)

**Entradas**
- Spread markup recibido (vía transferencia desde Client Funds cuando el cliente cierra trade)
- Comisiones cobradas
- Swap net markup
- B-Book flow absorbido (net positive después de un período mensual)
- Fees operativos (inactivity, deposit/withdrawal si aplica, conversion markup)

**Salidas**
- Payroll (salarios, bonos, contractors)
- PSP fees
- LP costs
- Marketing spend (ads, content, agencies, IB commissions)
- Rent, utilities, office
- Tech infrastructure (MT5, bridges, CRM, Sumsub, Intercom, email, hosting)
- Legal + compliance (external counsel, audits, compliance software)
- Corporate taxes
- Travel, training, admin

**Size healthy**
6-12 meses operating cost en reserva (overlap con Reserves wallet — ver abajo). Para NEOMAAA con ~$70K/mes payroll + tech, eso significa $400K-$850K disponibles solo en Operating.

**Cuenta bancaria — elección jurisdicción**
- **Dubai**: Mashreq, ADCB, Emirates NBD. Ventajas: banking infrastructure fuerte, USD friendly, compliance exigible pero clara, tax-efficient.
- **Singapore / HK**: DBS, OCBC. Ventajas: reputación Tier 1, bancos grandes. Desventajas: más difícil onboarding para Anjouan licensed entity.
- **Cayman / BVI**: estructura corporativa tax-efficient, cuentas más restringidas hoy post-CRS.
- **Switzerland / Liechtenstein**: estabilidad + confidencialidad, costo alto.

**Best practice:** operating principal en UAE (Dubai), con cuenta espejo secundaria en otra jurisdicción como backup.

---

### 2.3 Wallet 3 — Affiliate Payouts

**Propósito**
Pool dedicado a pagos mensuales a IBs/afiliados. Separado del Operating por tres razones: contabilidad limpia, evitar que un mes malo de cashflow afecte relación con IBs, y reporting accuracy.

**Contable**
Provision mensual de commissions devengadas, pagadas día 15 del mes siguiente. Si el programa tiene varios tiers (Bronze/Silver/Senior/Elite), cada uno con su factor, el cálculo es:

Commissions devengadas mes N = sum over partners of (client volume in month N × commission rate per tier)

**Ubicación ideal**
- USDT principalmente (método preferido por IBs internacionales, rápido, bajo fee)
- Wise Business / Airwallex para IBs que piden fiat
- Bank transfer para IBs institucionales grandes

**Pre-funding recomendado**
2 meses de payouts mensuales en el wallet. Esto smoothea ops:
- Si un mes hay cashflow tight, los IBs cobran igual en día 15
- Reputación del programa IB intacta (IBs son fuente de referrals constantes)
- Reduce stress del team finance

**Separación del Operating**
Contabilidad trata las IB commissions como cost of acquisition. Tener wallet separado ayuda a:
- Reporting mensual claro
- Evitar que team operations tire dinero por error
- Facilitar audit
- Si se decide vender/M&A el broker, el valor de la base de IBs es más fácil de demostrar

---

### 2.4 Wallet 4 — Liquidity Provider Margin

**Propósito**
Margin requerido por los LPs para ejecutar órdenes A-Book. Los LPs tratan al broker como su cliente institucional, y requieren margin para exposure que el broker toma con ellos.

**Monto**
Varía según volumen y agreement con LP. Típicamente:
- 5-10% del notional mensual operado A-Book por ese LP
- Margin call threshold: 70-80% utilization
- Mid-size broker con $500M-$1B volumen/mes A-Book: $50K-$500K por LP, distribuido entre 2-4 LPs

**Cuenta**
Directamente en el broker prime / LP. NO es cuenta bancaria propia — es margin account AT el LP. La cuenta pertenece al broker pero los fondos están físicamente custodiados por el LP.

**Monitoreo diario**
Pepe + Yulia monitoran:
- Utilización actual vs threshold
- P&L intradía y overnight en cada LP
- Margin calls si exposure spike
- Rebalanceo entre LPs si uno tiene mejor pricing que otro

**Riesgo principal**
LP insolvency / freeze. Ejemplo histórico: Alpari UK (2015, SNB shock), Axedo, otros. Mitigar con:
- Multi-LP (nunca 1 solo)
- Due diligence anual de cada LP (balance sheet, regulatory status)
- Hedging diversificado

---

### 2.5 Wallet 5 — Reserves (Emergency + Regulatory)

**Propósito**
Buffer de último recurso para crisis. Es el colchón que decide si el broker sobrevive o no en un mes malo.

**Escenarios que dispararían uso del Reserves**
- PSP principal freezea fondos del broker ($500K-$2M trapped)
- Chargeback masivo mensual (>3% del volumen card, PSP aumenta rolling reserve a 20%)
- Cliente VIP pierde mucho y amenaza con publicidad negativa — compensación goodwill
- Regulador AOFA pide audit inesperado + capital adequacy check
- B-Book drawdown extraordinario (semana de volatilidad tipo Swiss franc 2015)
- Cyber attack con operational downtime
- Litigation con partner disenchant

**Monto**
3-6 meses operating cost **adicional** al buffer que ya tiene el Operating. Para NEOMAAA target: $500K-$800K en Reserves.

**Ubicación**
- Jurisdicción separada del Operating. Idea: si cierran la cuenta operating (compliance issue bancario), los Reserves siguen accesibles.
- Mix recomendado: 40-60% fiat en Switzerland/Liechtenstein/Singapore + 40-60% crypto treasury (BTC cold + stablecoins hot)
- Multisig 3-of-3 para cualquier movement (Diego + Yulia + Stanislav)

**Regla de oro**
**Nunca tocar salvo emergencia aprobada por Board.** Cualquier movement requiere:
- Justificación escrita
- Aprobación unánime de los 3 principals
- Reporte posterior al board con plan de replenishment
- Target replenishment: 6-12 meses

---

## 3. Wallets adicionales recomendados (setup avanzado)

### 3.1 Wallet 6 — Tax Reserves

Incluso siendo offshore, un broker genera obligaciones fiscales en:
- La jurisdicción de incorporación (Anjouan: fee annual + compliance)
- Las jurisdicciones donde tiene operaciones (UAE corporate tax post-2023 9%, etc.)
- Las jurisdicciones de los principals (personal tax residency)
- VAT/GST si aplica en servicios recibidos

**Setup recomendado:**
- Set aside automático 5-10% del net revenue mensual
- Cuenta separada del Operating (evita tentación de usar)
- Revisión anual con tax counsel para ajustar

### 3.2 Wallet 7 — M&A / Growth Capital

Si los principals están planeando:
- Adquirir otro broker
- Aplicar a licencia Tier 1 (FCA UK ~$2M+, CySEC ~$1M, ASIC ~$1.5M+)
- Expandir a nuevos mercados con grandes inversiones
- Hacer acquihire

Separar este capital del Operating evita confusión entre costos operativos y capital deployment estratégico. Transparencia para board y potenciales investors.

---

## 4. Reconciliación diaria — el proceso crítico

Reconciliation es el "backbone" de treasury management. Un broker que no reconcilia diario está jugando a la ruleta rusa.

### 4.1 Daily reconciliation (AM, primera hora)

**Paso 1: Snapshot Client Funds Account balance**
- Bank balance EOD día anterior
- Crypto wallet balance EOD día anterior

**Paso 2: Calcular balance esperado**
Balance esperado = Σ(depósitos acreditados clientes) - Σ(retiros pagados) + Σ(PnL acumulado clientes) - Σ(margin en uso por open positions)

**Paso 3: Matchear**
- Diferencia <0.5%: OK, loguear
- Diferencia 0.5%-1%: investigar antes del mediodía
- Diferencia >1%: alerta inmediata al CEO + Head of Dealing + freeze de operaciones sensibles

**Paso 4: Log formal**
- Archivo reconciliation (spreadsheet inicial, luego Xero/NetSuite)
- Firma digital del reconciler
- Review semanal por Yulia

### 4.2 Weekly reconciliation

- Operating Account balance vs P&L esperada del dealing desk (spread, comisiones, swap, B-Book net)
- Affiliate provision vs commissions generadas
- Check de cualquier timing mismatch entre PSP settlement y book

### 4.3 Monthly full reconciliation

- Todas las cuentas bancarias reconciled vs accounting system
- Intercompany entries reconciliadas
- Accruals revisados
- Firma de Finance Manager (o Yulia) + CEO

### 4.4 Automatización — el camino

- **Mes 1-6:** Manual con spreadsheets. Yulia + Claude + CEO oversight.
- **Mes 6-12:** Xero o NetSuite bank feed + manual reconcile script daily
- **Año 2+:** Trintech, BlackLine, o similar treasury software + finance team dedicado

---

## 5. Multi-jurisdicción: dónde tener cuentas

Concentrar todo en una sola jurisdicción es riesgo terminal. Un freeze (por error, por compliance, por política) y se cae el broker.

### 5.1 Setup recomendado geográfico

**UAE (Dubai) — Hub primario**
- Operating corporate account
- Ventajas: infrastructure bancaria excelente, USD friendly, timezone que cubre Europa + Asia, tax advantages (corporate tax 9% solo sobre net profit post-2023), regulador CB UAE respetado.
- Bancos: Mashreq, ADCB, Emirates NBD, RAKBank, Commercial Bank of Dubai. Algunos onboardean brokers offshore, otros no.

**Singapore / Hong Kong — Secondary banking**
- Client Funds segregated account o Operating backup
- Ventajas: reputación Tier 1 global, banks grandes (DBS, OCBC, HSBC), stable legal system
- Desventaja: onboarding estricto, puede rechazar entidades Anjouan-licensed

**Switzerland / Liechtenstein — Reserves**
- Wallet 5 fiat + crypto
- Ventajas: estabilidad histórica, banking secrecy residual, mentalidad de preservación de capital
- Desventaja: fees altos, onboarding complejo, relationship-based

**Anjouan (local) — Compliance presence**
- Banking local opcional (AOFA no lo exige estrictamente, pero buena práctica)
- Permite demostrar substance en la jurisdicción de licencia

**Crypto wallets — paralelos a todo lo anterior**
- Fireblocks multisig enterprise (recomendado)
- Wallet hot operational + wallet cold reserves
- Stablecoins (USDT, USDC) para liquidez
- BTC/ETH opportunistic allocation

### 5.2 Riesgos a mitigar con multi-jurisdicción

- **Single jurisdiction risk:** si la jurisdicción cambia política (ej. UAE endurece banking para offshore), el broker queda atrapado.
- **Single bank risk:** si el banco te cierra la cuenta (sucede por cambios de risk appetite del banco, independiente del broker), operaciones paran.
- **Single crypto exchange risk:** custodia en CEX (Binance, etc.) = counterparty risk (ver FTX 2022).

### 5.3 Regla operacional

**Ninguna wallet individual debe tener más del 40% del total cash del broker.** Si un freeze te corta el 40%, el 60% restante (distribuido) te permite seguir operando.

---

## 6. Red flags que indican problema treasury

Señales tempranas de que hay un problema estructural en el treasury.

| Red flag | Lo que significa | Acción |
|---|---|---|
| Client Funds balance decrece sin razón legítima | Commingling o fraude | Freeze ops + investigation inmediata |
| Operating balance recurrentemente negativo o cero | Unit economics rotos o over-spending | Emergency cashflow review |
| Reconciliation difference >1% recurrente | Errores de proceso o data integrity issues | Audit interno del workflow reconciliation |
| PSP freezes recurrentes | Chargebacks altos o compliance issues | Review fraud patterns, diversificar PSPs |
| Retrasos en affiliate payouts | Cashflow problem o pre-funding insuficiente | Aumentar pre-funding, review cashflow |
| Incapacidad de procesar retiros >$25K en 24-48h | Liquidez insuficiente | Replanear Reserves, revisar LP margin locked |
| Salary payments con retraso | Runway critically low | Emergency planning, posible capital injection |
| Stress del CFO/Yulia al reportar | Problemas estructurales no dichos | Executive session con board |

---

## 7. Best practices industria

### 7.1 Big 3 brokers (IC Markets, Pepperstone, Exness tier)

Setup típico de los top-tier brokers retail offshore/semi-regulados:

- **Client funds** en banks Tier 1 (Barclays, HSBC, UBS, DBS)
- **Operating funds** en jurisdicción fiscal óptima (Bahamas, Seychelles + Australia para algunos, Cyprus para CySEC-regulated)
- **Crypto treasury** diversificado (30-50% en stablecoins + BTC reserves)
- **Annual audit** por Big 4 (KPMG, PwC, Deloitte, EY)
- **Daily automated reconciliation** via enterprise software
- **Segregated accounts por moneda** (no solo USD)
- **Insurance policies** (professional indemnity, cyber, E&O)
- **Banking relationships** cultivated personalmente por CEO/CFO con top-5 bancos de la jurisdicción

### 7.2 Brokers offshore mid-size (nuestro peer group)

Donde NEOMAAA se posiciona al launch:

- **Client funds** en banks reputados offshore (Dubai, Mauritius, Cayman)
- **Operating** en Dubai/BVI/Singapore
- **Crypto treasury** 50-70% (por necesidad — banking traditional limitado)
- **Annual audit** por firma especializada offshore (second-tier reputada, típico $15K-40K/año)
- **Manual daily reconciliation** (OK hasta $10M+ AUM)
- **Multi-PSP** desde día 1 (3+ activos)
- **Board oversight formal** mensual mínimo

### 7.3 Brokers tier 2 regulados (CySEC, FSC Mauritius)

Para cuando NEOMAAA eventualmente suba de licencia:

- **Additional**: segregated client money report trimestral al regulador
- **Additional**: capital adequacy report (broker debe mantener mínimo regulatorio de capital propio)
- **Additional**: protección investor compensation scheme fund
- **Additional**: external audit trimestral o al menos semestral
- **Additional**: regulatory returns periódicos

### 7.4 Brokers Tier 1 (FCA UK, ASIC AU, CySEC strict)

Aspirational para año 5+:

- Pool trust accounts con banking Tier 1 exclusivamente
- Daily automated reconciliation con external verification
- Mandatory external audit Big 4
- Capital adequacy 10%+ assets
- Client money under FSCS/compensation scheme coverage
- Compliance monitoring reports mensuales
- Stress testing trimestral

---

## 8. Stack tecnológico treasury recomendado

### 8.1 Banking API / Multi-currency
- **Airwallex** — excelente para multi-currency, multi-jurisdicción. Recomendado.
- **Wise Business** — barato, bueno para mid-market, limitado en volumes altos
- **Revolut Business** — mid-tier, buena UX
- **Traditional banking API** — via cada banco individual (Mashreq, DBS, etc.)

### 8.2 Crypto custody
- **Fireblocks** — enterprise, $3-10K/mes depending on AUM, multisig, insurance, compliance tools. **Recomendado** para NEOMAAA.
- **BitGo** — similar tier, más crypto-native
- **Coinbase Custody** — más caro ($10K+/mes), más institucional, SOC 2
- **Anchorage** — US-regulated custody, más for funds
- **Custom multisig (Gnosis Safe, etc.)** — gratis pero operational risk + less user-friendly

### 8.3 Accounting / ERP
- **Xero** — $50-100/mes, ideal hasta 10-20 personas finance team, multi-currency
- **QuickBooks Enterprise** — similar, más US-centric
- **NetSuite** — enterprise, overkill pre-escala (>$500K ARR accounting spend)
- **Sage Intacct** — alternative a NetSuite

### 8.4 Reconciliation software
- **Trintech (Cadency)** — enterprise recon, $30K+/año
- **BlackLine** — similar tier
- **Custom scripts + Xero bank feed** — barato, works hasta mid-scale
- **Manual** — OK hasta $10M AUM o 6-12 mes launch

### 8.5 Reporting / BI
- **Tableau / Looker** — enterprise BI
- **Power BI** — Microsoft ecosystem, mid-tier
- **Metabase** — free/open source, excellent para startup phase
- **Retool** — custom dashboards rápidos

### 8.6 Treasury mgmt avanzado
- **Kyriba** — enterprise TMS
- **GTreasury** — similar
- **Custom con Fireblocks API + Xero API + Airwallex API** — recomendado para NEOMAAA pre-escala

---

## 9. Escalamiento del treasury

### 9.1 Fase 1: Mes 1-6 (launch + early stabilization)

- Owner (Yulia) hace reconciliation daily manual con CEO oversight
- Spreadsheets centrales + Xero
- No dedicated finance hire aún
- Board review monthly
- Tools: Xero + spreadsheets + Fireblocks

### 9.2 Fase 2: Mes 6-12 (stabilization)

- Contratación de **Finance Manager dedicado** (senior accountant con broker/forex experience si posible)
- Implementar reconciliation software (Xero advanced + scripts, o NetSuite entry level)
- Automated bank feeds todos los accounts
- Monthly P&L + board report formal

### 9.3 Fase 3: Año 2 (scaling)

- CFO hire (o Head of Finance senior)
- Team: senior accountant + junior + compliance finance role
- External audit contratado annual
- Treasury policies documentadas formalmente
- Insurance policies complete (professional indemnity, cyber, E&O)

### 9.4 Fase 4: Año 3+ (mature)

- Internal audit function
- External audit Big 4 (if eligible)
- Treasury committee formal con board oversight
- Stress testing programs
- M&A readiness / exit optionality

---

## 10. Crisis scenarios y response framework

Cada uno de estos escenarios debería tener un playbook detallado. Aquí el framework macro.

### 10.1 Scenario A: Cliente VIP pierde $500K y amenaza publicidad negativa

**Assessment (0-24h):**
- Dealing review: ¿la ejecución fue correcta? Spread, slippage, stops hit correctamente?
- Account review: ¿el cliente entendía lo que operaba? ¿leverage appropriate para su perfil?
- Communications log: ¿el broker prometió algo por email/chat que no cumplió?

**Response path A (ejecución correcta, cliente solo perdió):**
- Empatía + explicación técnica
- NO refund (sentaría precedente destructivo)
- Opcional: goodwill gesture simbólico ($500-2K deposit bonus para próxima cuenta si continúa)
- NDA si cliente acepta

**Response path B (broker tuvo error):**
- Full refund de las operaciones afectadas
- Carta formal de disculpa del CEO
- NDA + compensación adicional si el error fue grave
- Post-mortem internal + cambio de proceso

### 10.2 Scenario B: PSP principal congela fondos ($2M)

**Paso 1 (primeras 24h):**
- Activar backup PSP inmediato para nuevos depósitos
- Communicate con legal del PSP: qué razón, qué documentación necesitan
- Notificar a board

**Paso 2 (24-72h):**
- Legal counsel escalates
- Compliance envía toda la documentación requerida (AML files, KYC, etc.)
- Treasury asegura que retiros pending puedan pagarse desde Reserves si necesario

**Paso 3 (1-4 semanas):**
- Negociación con PSP
- Si el freeze es definitivo, activar reserve substitution y rollback todos los pending transactions
- Comunicación a clientes afectados con transparencia

**Prevención:** multi-PSP desde día 1 (nunca un PSP >30% del volumen total)

### 10.3 Scenario C: Chargeback masivo (5% del volumen mensual)

**Alerta:** PSP notifica chargeback rate elevado + puede aumentar rolling reserve a 15-20%

**Response:**
- Identificar patron: ¿mismo método? ¿misma campaña de marketing? ¿mismo IB?
- Pausar campaña/canal ofensivo si identificado
- Implementar 3DS más estricto (sacrifice conversion por reducción de risk)
- Implementar velocity limits en deposits
- Fortalecer fraud review en Compliance

**Prevención:** monitoring continuo de chargeback rate semanal

### 10.4 Scenario D: Reguladora (AOFA) pide audit inesperado

**Paso 1 (0-48h):**
- Activar compliance emergency plan
- Susana coordina con external counsel (retainer pre-existente)
- Preparar docs: licence file, KYC samples, SAR filings, transaction monitoring reports, client segregation reports

**Paso 2 (durante audit):**
- Cooperar full, nunca obstruir ni ocultar
- Todos los requests documentados
- CEO presente para meetings clave
- No comunicar externamente (NDA implícito)

**Paso 3 (post-audit):**
- Responder a findings dentro de deadlines
- Remediation plan formal si hay gaps
- Board review de lessons learned

**Prevención:** compliance proactivo + internal audit annual

### 10.5 Scenario E: B-Book drawdown extremo semanal

**Alerta:** dealing P&L net negativo >$200K en una semana

**Response:**
- Dealing committee emergency (Pepe + Diego)
- Review de clientes que más ganaron — ¿toxic flow? ¿arbitrage? ¿news trading abuse?
- Decision: hedgear exposure direccional con LP, cambiar B/A mix policy, o absorber
- Reserves deben estar disponibles para cubrir si es necesario

**Prevención:** risk limits claros, toxic flow detection, B-Book capacity limits

---

## 11. Cierre — checklist treasury del CEO

Lo que Diego (o el principal) debería poder responder con Sí cada semana:

- [ ] Client Funds reconciliation hecha diaria últimos 7 días
- [ ] Operating balance suficiente para next 4 weeks payroll + PSP + LP
- [ ] Reserves intact, no movements no autorizados
- [ ] Multi-PSP activo (min 3 operativos)
- [ ] Multi-LP activo (min 2 funding margin)
- [ ] Chargeback rate <0.5%
- [ ] No retiros pending >48h
- [ ] Affiliate payouts on track para día 15
- [ ] Cashflow forecast 13-week actualizado
- [ ] Board monthly report preparado y firmado

Si alguno es NO, es prioridad 0 para la semana.

---

## 12. Referencias cruzadas

- [Wallet Structure NEOMAAA](/content/executive/wallet-structure-neomaaa) — setup específico nuestro
- [Panorama Ejecutivo](/content/executive/panorama-ejecutivo) — big picture
- [Unit Economics](/content/executive/unit-economics-broker) — cómo gana dinero el broker
- [Risk Management Owner](/content/executive/risk-management-owner) — riesgos a monitorear
- [Liquidity Providers B2B](/content/executive/liquidity-providers-b2b) — relación LPs
- [PSPs Explicados](/content/operations/psps-explicados) — mecánica pagos
- [Risk Matrix Clientes](/content/compliance/risk-matrix) — KYC tiers
- [Manual de Crisis](/content/operations/manual-crisis) — response playbook

---

**Versión:** 1.0 | **Última revisión:** 13 abril 2026 | **Próxima revisión:** 30 julio 2026
**Owner:** Yulia (Ops Principal) + Diego (CEO) | **Approvers:** Angel, Stanislav
