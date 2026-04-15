# Controles Financieros Ejecutivos — Daily / Weekly / Monthly / Quarterly / Annual

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego (CEO), Angel, Yulia, Stanislav + Finance Manager cuando se contrate
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — uso exclusivo principals + Head of Finance + External Auditor

> [!DANGER]
> Este documento define el sistema de controles financieros formales que Diego y Yulia ejecutan hoy (pre-launch + primeros meses post-launch) y que el Finance Manager hereda cuando se contrate. **Zero improvisación** — cada control tiene cadencia, owner, checklist y escalation path. La existencia y ejecución disciplinada de estos controles es la diferencia entre un broker auditable y una empresa que pierde licencia en el primer audit.

> [!INFO]
> **Propósito:** establecer el framework de controles financieros de NEOMAAA Markets con cadencias claras (daily, weekly, monthly, quarterly, annual), owners asignados, checklists ejecutables y red flags con escalation. Complementa a [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) (qué wallets existen) con el "cómo se controla lo que pasa en esos wallets".

---

## 1. Por qué controles financieros formales

Muchos brokers offshore operan con controles informales hasta que revienta el primer problema — y cuando revienta, revienta entero. NEOMAAA no es ese broker. Los controles formales existen por cuatro razones estructurales, no por burocracia.

### 1.1 Requerimiento del regulador AOFA

La licencia AOFA L15968/N exige que Neomaaa Ltd mantenga un sistema de controles financieros internos documentado, ejecutado, y auditable. En cualquier regulatory inspection, el primer pedido es el **"Internal Control Manual"** — si no existe, o existe pero no hay evidencia de ejecución (logs, reconciliations firmados, minutas de board), es finding automático. Findings serios gatillan suspension o revocación.

### 1.2 Fraud prevention

La mayoría del fraude interno en brokers se detecta (tarde) cuando falta algo en Client Funds. Los controles daily/weekly/monthly cierran las ventanas de tiempo durante las cuales se puede ocultar un desvío. Un empleado deshonesto sabe si el broker reconcilia a diario (imposible ocultarlo más de 24h) vs reconcilia trimestral (puede ocultar meses). El control no es paranoia — es disciplina operativa.

### 1.3 Decision basis

Diego toma decisiones ejecutivas semanalmente: aumentar presupuesto marketing, renegociar con un LP, cambiar política de spread, despedir o contratar gente. Todas son decisiones **matemáticas** — dependen de datos limpios y actualizados. Sin controles formales, las decisiones se toman sobre intuition — que en matemáticas puras es jugar a ciegas.

### 1.4 M&A y capital raise prep

Cuando NEOMAAA alcance escala (año 2-3) y aparezcan ofertas de acquisition, inversión o crédito, lo primero que se pide en due diligence es **24 meses de financial controls con evidencia de ejecución**. Empresas sin controls formales pierden 30-50% de valuation vs empresas con. El control que Diego impone hoy es la diferencia entre vender un broker a USD 15M vs USD 30M cuando corresponda.

---

## 2. Daily Controls (15-30 min cada mañana)

**Cadencia:** todos los días laborales 09:00 Dubai.
**Owner actual:** Yulia.
**Owner futuro:** Finance Manager (con Yulia oversight).
**Tiempo objetivo:** 15-30 min.
**Output:** daily checklist firmada + entry en log interno.

### 2.1 Checklist Daily — ejecutable

<div className="neo-step-list">

**Paso 1 — Client Funds reconciliation (5 min)**

- Abrir bank statement `NEOMAAA LTD — CLIENT FUNDS` → captura de balance.
- Abrir wallet `CLIENT_FUNDS_SEGREGATED` en Fireblocks → captura de balance.
- Sumar fiat USD + USDT + USDC → total Client Funds actual.
- Abrir MT5 backoffice → total equity de cuentas cliente (fondos depositados + PnL no realizado).
- Calcular diferencia: `Client Funds wallet total - MT5 equity total`.
- **Tolerancia aceptable:** diferencia <0.5% (razones legítimas: timing de liquidación PSP, fees in-transit).
- **Log any difference >0.5%** → incidente compliance, escalation automática a Susana + Diego.

**Paso 2 — Operating balance check (3 min)**

- Balance `NEOMAAA LTD — OPERATING` fiat.
- Balance `OPERATING_TREASURY` Fireblocks.
- Verificar que esté dentro del threshold (mín 3 meses burn rate).
- Si debajo del threshold → flag para top-up desde Reserves esa misma semana.

**Paso 3 — LP margin check (5 min)**

- Para cada LP (3 cuentas):
  - Daily statement del LP → margin balance actual.
  - Margin utilization ratio = posiciones abiertas / margin depositado.
  - Si utilization >70% → flag inmediata a Pepe para evaluar top-up.
  - Si utilization <30% sostenido 2 semanas → flag para evaluar withdrawal de exceso.
- Cross-check margin utilization con exposure report de Pepe.

**Paso 4 — PSP status (3 min)**

- Dashboard PSP primario: pending deposits, failed deposits, settlements en route.
- Dashboard PSP secundario: idem.
- Cualquier settlement que lleva >48h pending → flag para follow-up.
- Chargeback alerts → screenshot + escalation Angel + Susana.

**Paso 5 — Trading anomalies (3-5 min)**

- Report Pepe: PnL del día anterior A-Book + B-Book split.
- Top 5 cuentas con mayor PnL positivo (posibles profitable traders a watchlist).
- Top 5 cuentas con mayor drawdown (posibles margin calls).
- Cualquier cuenta con leverage anómalo (>límite interno) → flag a Pepe.
- Cualquier símbolo con spread ampliado fuera de horario → flag a dealing desk.

**Paso 6 — Log + firma (2 min)**

- Entry en `daily_treasury_log_YYYY-MM.xlsx` (template estándar).
- Fecha, ejecutor, hora, métricas clave, cualquier flag generada.
- Firma digital (initial + timestamp) = Yulia o FM.
- Si hay flag → enviar email 1-pager a Diego + Susana antes de las 10:00.

</div>

> [!WARNING]
> **Log any difference >0.5% en Client Funds reconciliation es mandatory.** Ocultar una diferencia, aunque parezca timing benigno, es violación grave del control interno. La regla es: se documenta, se investiga, se resuelve. Nunca se silencia.

### 2.2 Daily dashboard Diego mira (5 min)

Diego no ejecuta la daily checklist — Yulia/FM la ejecuta. Diego mira un **dashboard resumido** diariamente que agrega los 5 KPIs más importantes.

Ver sección 7.1 para el dashboard exacto.

---

## 3. Weekly Controls (2-3 horas viernes)

**Cadencia:** viernes 14:00-17:00 Dubai.
**Owner actual:** Yulia.
**Owner futuro:** FM + Yulia co-review.
**Output:** weekly report 1-pager a Diego + board snapshot email los 3 principals.

### 3.1 Weekly cashflow report

Consolidación de la semana en 1 tabla:

| Categoría | Lunes | Martes | Miércoles | Jueves | Viernes | Total semana | vs semana anterior |
|---|---|---|---|---|---|---|---|
| Depósitos clientes (fiat + crypto) | | | | | | | |
| Retiros clientes | | | | | | | |
| Net flow cliente | | | | | | | |
| Revenue (spread + commission) | | | | | | | |
| LP margin movements | | | | | | | |
| OPEX pagado | | | | | | | |
| Affiliate commissions devengadas | | | | | | | |
| Operating balance cambio | | | | | | | |

Export de Xero + bank statements + Fireblocks + MT5. Tiempo ejecución: 45 min si los datos están limpios.

### 3.2 Client activity summary

| KPI | Valor semana | vs semana anterior | vs target |
|---|---|---|---|
| FTDs (first-time depositors) | | | |
| Volume total trading (lots) | | | |
| MAU (monthly active users rolling) | | | |
| Churn (cuentas inactivas >30 días que pasan a >60 días) | | | |
| Avg deposit ticket | | | |
| Ratio deposits crypto vs fiat | | | |

Export Skale CRM + MT5.

### 3.3 Marketing performance — CAC por channel

| Channel | Spend semana | Leads | FTDs | CAC blended | CAC FTD |
|---|---|---|---|---|---|
| Ads Meta | | | | | |
| Ads Google | | | | | |
| Afiliados | | | | | |
| Orgánico / referral | | | | | |
| Partnerships | | | | | |

Cross-check con [`unit-economics-broker.md`](/content/executive/unit-economics-broker) targets.

### 3.4 Compliance week summary

Cortesía de Susana a Yulia los viernes 12:00:

- KYC/AML — cuántos casos aprobados, rechazados, en EDD pending.
- Sanctions hits — cuántos bloqueados + outcome.
- Chargebacks — cuántos abiertos, ganados, perdidos.
- Cualquier incidente reportable a AOFA.

### 3.5 Weekly board snapshot (email 1-pager)

Email viernes 18:00 a los 3 principals + Angel. Formato fijo:

```
Asunto: [NEOMAAA Treasury] Week X — snapshot

TL;DR (3 líneas)
- Client Funds: USD X.XM (+/- vs sem anterior)
- Operating: USD X.XK (runway: X meses cubiertos)
- Net flow semana: +/- USD X.XK

KPIs
- FTDs: X (target XX)
- CAC blended: USD XXX (target USD XXX)
- LP margin utilization promedio: XX%
- Chargebacks: X abiertos / X ganados sem

FLAGS & ACCIONES
- [Flag 1 con acción]
- [Flag 2 con acción]

PRÓXIMA SEMANA
- [Top 2-3 cosas a cerrar]
```

> [!TIP]
> **Regla inviolable:** el email sale SIEMPRE viernes, hay o no hay noticias relevantes. Silencio = preocupación. La consistencia del ritmo es parte del control.

---

## 4. Monthly Controls (full day primera semana del mes)

**Cadencia:** primer viernes de cada mes, full day.
**Owner actual:** Yulia + Diego co-review.
**Owner futuro:** FM ejecuta + Yulia valida + Diego co-review.
**Output:** Monthly P&L + Monthly Reconciliation + Monthly KPI Dashboard + Monthly Board Report.

### 4.1 Monthly P&L completa — template

```markdown
# NEOMAAA Markets — Monthly P&L — [Month YYYY]

## Revenue
| Línea | Mes actual | Mes anterior | Var % | YTD | Budget YTD | Var vs budget |
|---|---|---|---|---|---|---|
| Spread revenue | | | | | | |
| Commission revenue | | | | | | |
| Swap revenue | | | | | | |
| Inactivity fees | | | | | | |
| B-Book net PnL | | | | | | |
| **Revenue total** | | | | | | |

## Costos variables
| Línea | Mes actual | Mes anterior | Var % |
|---|---|---|---|
| LP costs (spread markup paid) | | | |
| PSP fees | | | |
| Crypto processing fees | | | |
| Affiliate commissions | | | |
| Bonuses payout | | | |
| **Total COGS** | | | |

## Gross Profit
| | Mes | % | Mes ant | % |
|---|---|---|---|---|
| Gross Profit | | | | |

## OPEX
| Línea | Mes |
|---|---|
| Sueldos + benefits | |
| Tech vendors (MT5, Skale, Sumsub, Intercom, Fireblocks, Xero) | |
| Marketing spend | |
| Legal + compliance | |
| Rent Dubai hub | |
| Travel | |
| Accounting + audit | |
| Otros | |
| **Total OPEX** | |

## EBITDA
| | Mes | % revenue |
|---|---|---|

## Net Income
| | Mes | YTD |
|---|---|---|
```

Export source: Xero + MT5 reports + Fireblocks audit log + Wise/Airwallex.

### 4.2 Monthly reconciliation (bank + crypto + LP)

Reconciliation formal de los 5 wallets contra el ledger interno.

<div className="neo-step-list">

**Bank reconciliation — cada cuenta bancaria**
- Bank statement del mes completo descargado PDF + CSV.
- Matching line-by-line con Xero entries.
- Identificar cualquier item reconciling (in-transit, bank fees no categorizados).
- Firma: Yulia/FM + Diego co-sign.

**Crypto reconciliation — cada wallet Fireblocks + Gnosis Safe**
- Export audit log mensual completo.
- Matching con Xero entries (cada tx categorizada).
- Verificación on-chain de los balances terminales (block explorer).
- Firma: Yulia/FM + Diego co-sign.

**LP reconciliation — cada LP**
- Monthly statement del LP.
- Matching con daily P&L book + margin movements registrados.
- Verificación fees cobrados por LP = contrato firmado.
- Firma: Pepe + Yulia/FM.

**Client equity reconciliation — full**
- MT5 export full client equity snapshot fin de mes.
- Suma total = Client Funds wallet total (tolerancia <0.5%).
- Cualquier diferencia >0.5% documentada con root cause.
- Firma: Yulia/FM + Susana.

</div>

### 4.3 Monthly KPI dashboard — 15 KPIs

Presentados al board en tabla única vs prior month + vs target:

| # | KPI | Mes | Prior | Var | Target | Status |
|---|---|---|---|---|---|---|
| 1 | Total clientes activos (MAU) | | | | | |
| 2 | FTDs mes | | | | | |
| 3 | Total deposits mes | | | | | |
| 4 | Total withdrawals mes | | | | | |
| 5 | Net deposit flow | | | | | |
| 6 | Avg deposit ticket | | | | | |
| 7 | Trading volume (lots) | | | | | |
| 8 | Revenue total | | | | | |
| 9 | Gross margin % | | | | | |
| 10 | CAC blended | | | | | |
| 11 | LTV estimado | | | | | |
| 12 | LTV/CAC ratio | | | | | |
| 13 | EBITDA margin | | | | | |
| 14 | Cash runway meses | | | | | |
| 15 | Churn rate mensual | | | | | |

Status = semáforo (green/yellow/red) según gap vs target.

### 4.4 Monthly board report 5-10 pages

Estructura fija:

1. **Executive summary** (1 page) — TL;DR del mes, top 3 wins, top 3 issues.
2. **Financials** (2 pages) — P&L, cashflow, balance wallets.
3. **KPIs** (1-2 pages) — dashboard de los 15 KPIs con comentario.
4. **Operations** (1 page) — updates marketing, sales, dealing, support.
5. **Compliance** (1 page) — summary Susana + cualquier incidente.
6. **Treasury** (1 page) — estado de los 5 wallets, reconciliation status, movements relevantes.
7. **Próximo mes** (1 page) — prioridades, decisiones pendientes de board, OKRs.

---

## 5. Quarterly Controls

**Cadencia:** última semana de cada quarter (Q1 apr, Q2 jul, Q3 oct, Q4 ene).
**Owner:** principals.

### 5.1 Strategic review offsite (Diego + Angel + Yulia + Stanislav — 2 días)

Offsite formal, preferentemente fuera de Dubai (Madrid, Cyprus o destino neutral). Agenda estándar:

- **Día 1 mañana:** review financials Q completo (Yulia presenta).
- **Día 1 tarde:** review operations + compliance (Angel + Susana presenta).
- **Día 2 mañana:** revisión estratégica — qué está funcionando, qué no, qué pivotamos.
- **Día 2 tarde:** decisiones Q siguiente — budget, hires, market entries, producto.

**Outputs:**
- Minutas formales firmadas por los 4 principals.
- Budget reforecast Q siguiente aprobado.
- Top 5 decisiones estratégicas Q siguiente con owner + deadline.
- Actualización de [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo).

### 5.2 Quarterly compliance review

Susana presenta al board:
- KYC/AML stats quarter (aprobaciones, rechazos, EDD).
- Incidentes compliance.
- Regulatory changes aplicables a AOFA / jurisdicciones target.
- Retention & records status.
- Training status del equipo.

### 5.3 Quarterly budget reforecast

Yulia (o FM) re-proyecta:
- Revenue próximos 2 quarters basado en actuals + trend.
- OPEX próximo quarter ajustado.
- Cash runway actualizado.
- CAPEX aprobado para Q siguiente.

---

## 6. Annual Controls

**Cadencia:** Q4 cada año (Nov-Dic) + audit externo Q1 del año siguiente.
**Owner:** principals + external auditor.

### 6.1 Annual external audit

> [!WARNING]
> Annual audit externo es **altamente recomendado** incluso si AOFA no lo exige formalmente año 1 — hacerlo desde año 1 construye track record auditable que sirve para M&A, banking relationships, y regulatory credibility.

Candidatos ya shortlisted en [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) sección 5.3:

| Auditor | Fee estimado |
|---|---|
| Baker Tilly | USD 40-60K |
| BDO UAE | USD 50-70K |
| Mazars Offshore | USD 30-50K |
| Grant Thornton UAE | USD 60-80K |

Rango total expected: **USD 30-80K/año**.

**Proceso:**
- Q3: selección firma + engagement letter firmada.
- Q4: pre-audit prep interno (FM + Susana + Yulia).
- Q1 año siguiente: fieldwork auditor (2-4 semanas).
- Q1 año siguiente: audit report finalizado + firmado.

### 6.2 Annual risk assessment formal board-approved

Documento formal que evalúa:
- Riesgos operativos (dealing, IT, fraud, talent).
- Riesgos financieros (liquidity, counterparty, market).
- Riesgos regulatorios (license, compliance, tax).
- Riesgos reputacionales (PR, client complaints, social).

Cada risk con probability × impact + mitigation plan. Aprobado por los 4 principals. Revisado quarterly.

### 6.3 Annual budget + strategy (Q4 planning)

Sesión anual dedicada en Q4 para:
- Budget año siguiente (revenue + COGS + OPEX + CAPEX).
- Plan estratégico año siguiente (market entries, producto, team).
- OKRs anuales por área.
- Hires plan año siguiente.

### 6.4 Annual compliance review full

Susana coordina:
- Review completa policies + procedures vs regulación actual.
- Update AML/KYC framework.
- Training anual obligatorio todo el equipo (AOFA AML, sanctions, data protection).
- Review contracts vendors + partners.
- Review AOFA license renewal (si aplica).

---

## 7. KPIs críticos Diego mira

Tres niveles de dashboard para Diego — cada uno con tiempo máximo de consulta objetivo.

### 7.1 Daily dashboard (5 min/día)

Mobile-friendly, Metabase o Looker Studio. Diego lo abre cada mañana.

| KPI | Fuente | Alert si... |
|---|---|---|
| Client Funds balance total | Wallets + bank feed | <5% vs ayer sin razón |
| Operating cash | Bank feed + Fireblocks | <3 meses burn |
| Net flow ayer | MT5 + PSP | Negativo 3 días seguidos |
| Trading volume ayer | MT5 | <50% del promedio 30d |
| FTDs ayer | Skale + MT5 | 0 en día laboral |
| LP margin utilization max | LP statements | >80% en cualquier LP |
| Open chargebacks | PSP dashboards | >5 abiertos |

### 7.2 Weekly dashboard (30 min viernes)

Además del weekly report sección 3, Diego revisa:

- CAC blended semana vs 4-week moving avg.
- Affiliate pipeline (top 10 affiliates por producción).
- Revenue mix (spread/commission/swap/B-book) vs target.
- Cash burn actual vs budget.

### 7.3 Monthly dashboard (1h primer lunes)

- El Monthly board report completo (sección 4.4).
- Deep dive 1 KPI específico que se eligió monitorear ese mes.
- Deep dive 1 riesgo específico identificado en quarterly risk.

---

## 8. Red flags — when to escalate

Tabla de red flags con acción + escalation path. Este es el "incident response" treasury.

| Red flag | Severidad | Acción inmediata | Escalation path | Deadline |
|---|---|---|---|---|
| Client Funds reconciliation diff >0.5% | Crítica | Freeze outgoing from Client Funds hasta root cause | Yulia → Susana → Diego | 4h |
| Operating balance <2 meses burn | Alta | Alert principals, preparar top-up desde Reserves | Yulia → Diego | 24h |
| LP margin utilization >80% | Alta | Pepe evalúa posiciones, prepara top-up | Pepe → Yulia → Diego | 4h |
| PSP freeze deposits | Crítica | Activar PSP secundario inmediato, comunicación clientes | Angel → Yulia → Diego → Susana | 2h |
| Sanctions hit no resuelto <48h | Crítica | Freeze cuenta + escalation regulatoria si aplica | Susana → Diego | 24h |
| Chargebacks >1% del volumen mes | Alta | Review KYC process + PSP risk settings | Angel + Susana → Diego | 48h |
| FTDs 0 en 3 días laborales | Media | Review funnel + marketing | Marketing → Yulia → Diego | 72h |
| Empleado signatory deja empresa | Crítica | Revocar accesos bank + Fireblocks <24h | Yulia → Diego + IT | 24h |
| Bank statement no llega en fecha | Media | Follow-up al banco + escalation | Yulia | 48h |
| External auditor findings "serio" | Crítica | Remediation plan + board meeting | Diego + auditor → board | 7 días |
| Empleado reporta sospecha fraude | Crítica | Whistleblower flow, Susana + Diego review | Susana + Diego | 24h |
| LP pide collateral adicional fuera ciclo | Alta | Review relación + evaluación si seguir con LP | Pepe + Diego | 48h |
| Revenue mes < 70% del budget | Alta | Emergency ops review | Yulia + Diego | 7 días |
| Ciber incident (brecha, phishing, ransomware) | Crítica | Activar IR plan + legal | IT + Susana + Diego | 2h |

> [!WARNING]
> **Principio de escalation:** ante duda, escalar. Un falso positivo cuesta 30 min de Diego. Un falso negativo puede costar la licencia. La cultura es "escalar early, resolver fast".

---

## 9. Tools / software recomendado

Stack tool completo para ejecutar el framework de controles.

| Función | Tool recomendado | Costo estimado | Owner |
|---|---|---|---|
| Accounting general multi-currency | **Xero** | USD 70-200/mes | FM / Yulia |
| FX + wires internacionales vendors | **Wise Business** | Fee variable (0.4-1%) | Yulia |
| Multi-currency account + payroll | **Airwallex** | Fee variable | Yulia |
| Crypto custody + audit trail | **Fireblocks** | USD 30-100K setup + var | Diego + Yulia |
| Multisig self-custody Reserves | **Gnosis Safe** (free) + hardware wallets Ledger (USD 150 c/u) | Mínimo | Principals |
| BI + dashboards | **Metabase** self-hosted / **Looker Studio** | USD 0-200/mes | FM |
| Document storage retention 7 años | **Google Workspace Enterprise** | USD 18-25/user/mes | Yulia |
| E-signature docs corporate | **DocuSign** / **Dropbox Sign** | USD 10-30/user/mes | Yulia |
| Bookkeeping automation | **Xero + Dext** (Dext importa receipts) | USD 20/mes adicional | FM |
| CRM clientes | **Skale** (ya contratado) | Contrato existente | Angel |
| KYC/AML | **Sumsub** (ya contratado) | Contrato existente | Susana |
| Soporte cliente | **Intercom** (ya contratado) | Contrato existente | Support lead |
| MT5 server | MetaQuotes licensing | Contrato existente | Pepe / IT |
| Incident management IR | **PagerDuty** / alternativa | USD 20-50/user/mes | IT |

**Costo treasury tools approx año 1:** USD 80-150K total (incluye Fireblocks setup único).

---

## 10. Escalamiento del equipo finance

La estructura finance no es estática — escala con la empresa. Roadmap concreto:

### 10.1 Pre-launch — HOY (abril 2026)

- **Yulia + Diego manual.**
- Xero + Wise + Airwallex configurados.
- Sin accountant externo todavía (se contrata Month 0-1).
- Reconciliations en Excel + Xero.

### 10.2 Mes 1-6 post-launch

- **Yulia (ops + finance head) + external accountant part-time.**
- External accountant: 10-20h/mes, foco en bookkeeping clean + monthly close + audit prep.
- Yulia sigue owner del daily treasury, accountant revisa.
- Herramientas: Xero full + Dext + Fireblocks operativo.

### 10.3 Mes 6-12

- **+ Finance Manager fulltime.**
- FM asume daily + weekly + monthly controls bajo supervisión Yulia.
- Yulia pasa a oversight + strategic.
- External accountant sigue (ya como contraparte de FM).
- Profile ideal FM: 5-7 años experiencia, preferentemente en broker/fintech/PSP, trilingüe ES/EN/RU deseable, experiencia con Xero + multi-currency + crypto accounting. Rango salarial `[DATO: USD XX-YYK/año confirmado según mercado Dubai]`.

### 10.4 Año 2

- **+ Junior accountant (in-house).**
- Junior ejecuta bookkeeping diario + data entry + receipts.
- FM pasa a reporting + strategic + audit liaison.
- **+ Internal auditor part-time** (consultor o hire fractional). Función: auditorías internas quarterly anticipando auditor externo, test de controles.

### 10.5 Año 3

- **+ CFO dedicated.**
- Estructura: CFO → FM → Junior accountant.
- Internal auditor fulltime.
- Tax advisor retainer.
- Corporate treasurer specialist si el volumen lo requiere.

> [!INFO]
> **Señal para hire CFO:** cuando EBITDA mensual sostenido supere USD 500K o cuando haya proceso activo de capital raise / M&A. Antes de eso, FM + external CFO advisor fractional es más eficiente.

---

## 11. Finance ceremonies calendarized

Tabla consolidada de todas las ceremonias de control — qué, cuándo, quién.

| Frecuencia | Tarea | Owner primario | Co-owner / reviewer | Tiempo objetivo |
|---|---|---|---|---|
| Daily 09:00 Dubai | Daily reconciliation 6-step checklist | Yulia / FM | Diego (dashboard) | 15-30 min |
| Daily 09:30 | Diego abre daily dashboard | Diego | — | 5 min |
| Daily end-of-day | Pepe reporta dealing PnL + anomalías | Pepe | Yulia | 10 min |
| Semanal viernes 14:00 | Weekly cashflow report | Yulia / FM | Diego | 1h |
| Semanal viernes 15:00 | Weekly client activity + marketing | Yulia / FM | Diego + Angel | 1h |
| Semanal viernes 17:00 | Weekly board snapshot email | Yulia / FM | Diego | 30 min |
| Semanal viernes 16:00 | Compliance summary | Susana | Yulia | 30 min |
| Mensual primer viernes | Monthly P&L + reconciliation | FM / Yulia | Diego + external accountant | Full day |
| Mensual primer lunes | Diego revisa monthly dashboard | Diego | — | 1h |
| Mensual primera semana | Monthly board report | FM / Yulia | Diego | 4h writing |
| Quarterly última semana | Strategic review offsite | Principals | — | 2 días |
| Quarterly última semana | Compliance review | Susana | Principals | 3h |
| Quarterly última semana | Budget reforecast | FM / Yulia | Diego | 1 día |
| Annual Q3 | Auditor engagement | Diego | FM + Susana | 2h |
| Annual Q4 | Pre-audit prep | FM + Susana | Yulia | 2 semanas |
| Annual Q1 (año sig) | Audit fieldwork | External auditor | FM + Susana + Yulia | 2-4 semanas |
| Annual Q4 | Risk assessment formal | Principals + Susana | Diego | 1 día |
| Annual Q4 | Budget + strategy año sig | Principals | FM | 2 días |
| Annual Q4 | Compliance review full | Susana | Principals | 3 días |

---

## 12. Placeholders `[DATO:]` — decisiones pendientes

Listado de `[DATO:]` que owners completan:

| ID | Dato | Owner | Deadline recomendado |
|---|---|---|---|
| C-01 | Cash position actual (bank + crypto) pre-launch | Yulia | Week 1 |
| C-02 | External accountant part-time confirmado | Yulia | Week 2 |
| C-03 | Finance Manager hire month objetivo | Diego + Yulia | Month 3 (job post) |
| C-04 | Finance Manager rango salarial confirmado mercado Dubai | Yulia | Month 3 |
| C-05 | External auditor año 1 confirmado | Diego + Yulia | Month 6 |
| C-06 | Board meeting cadence formal (mensual / quarterly) | Principals | Week 2 |
| C-07 | Burn rate mensual validado Q2 2026 | Yulia | Month 2 |
| C-08 | Budget year 1 aprobado | Principals | Pre-launch |
| C-09 | CFO hire target date year 2 | Principals | Q4 year 1 |
| C-10 | Metabase / Looker Studio confirmado | Yulia + IT | Month 1 |
| C-11 | PagerDuty u otro incident management tool | IT + Diego | Month 2 |
| C-12 | Whistleblower channel formal | Susana + Diego | Month 2 |

---

## 13. Gobernanza del documento

- **Ownership:** Yulia owner operativo. Diego owner estratégico. FM owner de ejecución cuando se contrate.
- **Revisión:** quarterly + ad-hoc cuando cambie cadencia, tool, o responsable.
- **Versioning:** semver. 1.0 → 1.x minor changes. 2.0 major rewrite.
- **Distribución:** principals + FM + Susana + external accountant + external auditor (read-only).
- **Evidence keeping:** cada control ejecutado genera log. Logs retenidos 7 años en Google Workspace + Xero audit trail + Fireblocks audit log.

---

**Documentos relacionados:**
- [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo) — vista macro del broker
- [`treasury-management.md`](/content/executive/treasury-management) — framework genérico multi-wallet
- [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) — setup específico wallets NEOMAAA
- [`unit-economics-broker.md`](/content/executive/unit-economics-broker) — CAC / LTV / margen
- [`compliance/aofa-compliance.md`](/content/compliance/aofa-compliance) — requisitos regulatorios AOFA
- [`compliance/ab-book-policy.md`](/content/compliance/ab-book-policy) — policy hibrida A/B book

---

**Última revisión:** 13 abril 2026 — Claude (preparación pre-launch)
**Próxima revisión obligatoria:** Month 1 post-launch (validar que daily checklist se ejecutó 20+ días seguidos sin gap)
