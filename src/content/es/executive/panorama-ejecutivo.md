# Panorama Ejecutivo — Cómo se Opera un Broker Profesional

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego Loyola (CEO), Angel Ortega (Co-Founder), Yulia (Ops Principal), Stanislav (Equity Principal)
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — no distribuir fuera del board

> [!DANGER]
> Este documento contiene la visión ejecutiva del negocio broker end-to-end. Información estratégica, números de industria y mecánica interna que NO debe compartirse con el equipo extendido, partners ni clientes. Solo principals y advisors bajo NDA.

> [!INFO]
> **Propósito:** que un owner que llega nuevo al negocio entienda, en 30 minutos de lectura, cómo funciona un broker retail de forex/CFD profesional, dónde está el dinero, dónde están los riesgos, qué decisiones le tocan a él y qué mira semanalmente. No es manual operativo — es la foto ejecutiva que permite tomar decisiones sin meterse en el detalle.

---

## 1. El negocio de un broker retail en una página

Un **broker retail de forex/CFDs** es una empresa que provee a clientes minoristas (personas, no instituciones) la infraestructura técnica y legal para especular sobre el precio de instrumentos financieros (divisas, índices, commodities, acciones, crypto) sin poseer el activo subyacente. El cliente abre una cuenta, deposita margen, opera contratos CFD (Contract for Difference), y su PnL se liquida en su cuenta en cash.

El broker NO es un banco ni una bolsa. Es un **intermediario tecnológico + contraparte hybrida**: provee la plataforma (MT5 en nuestro caso), la conexión a precios de mercado vía liquidity providers, las cuentas segregadas para proteger los fondos del cliente, el procesamiento de pagos, el soporte y el marco regulatorio bajo el cual opera legalmente.

### 1.1 Cómo se diferencia de un market maker institucional

- Un **market maker institucional** (como un dealer de Goldman Sachs, Citi, JP Morgan) opera con contrapartes institucionales, tickets de $10M+, usa su balance sheet propio, está sujeto a regulación Tier 1 (Basel III, MiFID II, Dodd-Frank), y su cliente final es otro banco, hedge fund o corporación.
- Un **broker retail** opera con clientes personas, tickets típicos de $100-$50K, usa licencia offshore o Tier 2/3 (Anjouan, Seychelles, BVI, Mauritius, Cyprus IFSC, etc.), accede a liquidez pasando flow a LPs upstream, y su cliente final es retail.

La diferencia clave: el market maker institucional tiene balance sheet masivo y actúa como **principal** constantemente; el broker retail opera en un modelo **híbrido A-Book / B-Book** donde parte del flow del cliente se pasa al mercado (A-Book) y parte se queda interno (B-Book). Nosotros somos **híbrido ECN/STP con componente principal**, conforme a nuestros T&Cs oficiales.

### 1.2 Revenue model — de dónde sale cada dólar

Un broker retail genera revenue por cinco vías:

1. **Spread markup.** El broker recibe un precio bid/ask de sus LPs y lo rebroadcastea al cliente con un markup. Ej: LP cotiza EUR/USD 1.0800/1.0801 (spread 1 pip), el broker cotiza al cliente 1.07995/1.08015 (spread 2 pips). El pip adicional es markup puro. Es la línea de revenue más grande de la mayoría de brokers.
2. **Comisión explícita.** En cuentas tipo ECN/RAW (spread bajo), el broker cobra comisión fija por lote operado. Ej: $3-7 USD por lote round-turn. Transparente, el cliente la ve en su estado de cuenta.
3. **Swap / overnight financing.** Si el cliente deja una posición abierta pasada la medianoche UTC, se le cobra/paga un swap. El broker típicamente queda con markup en el swap (spread entre swap largo y swap corto).
4. **B-Book PnL net.** El flow que el broker NO pasa a LP y decide absorber internamente. Si el cliente pierde, el broker gana ese PnL directo. Si el cliente gana, el broker paga. Net positivo histórico de industria: 65-80% de clientes retail pierden, por lo que el B-Book es altamente rentable si se gestiona bien el riesgo.
5. **Fees operativos.** Deposit/withdrawal fees en ciertos métodos, inactivity fee en cuentas dormidas, conversion fees FX, admin fees. Menor en volumen pero recurrente.

### 1.3 Cost structure — dónde se va cada dólar

1. **Liquidity costs.** Lo que los LPs cobran al broker: spread institucional + comisión institucional. Típico 30-50% del revenue bruto si el broker corre mucho A-Book.
2. **PSP fees.** Procesadores de pago (card, crypto, wire, PSPs locales). 0.5%-4.5% según método. Ver doc operations/psps-explicados.
3. **Chargebacks.** Cuando un cliente disputa un pago con la tarjeta. Costo directo (la plata se devuelve al cliente) más fee del PSP ($15-40 por disputa). Target industria <0.5% del volumen card.
4. **Tech infrastructure.** Licencia MT5 (white label ~$5-12K/mes), bridges a LPs, servidores, CRM (Skale), KYC (Sumsub), soporte (Intercom), email, hosting, seguridad.
5. **Compliance & legal.** Licencia renewal, outside counsel, audits, monitoring software, Compliance Officer salary.
6. **Personal / payroll.** Equipo. Con 16 personas actual: ~$50-80K/mes.
7. **Marketing.** Paid ads, contenido, influencers, IB payouts (las IB comisiones son técnicamente cost of acquisition).
8. **Office & admin.** Rent, utilities, travel, legal corporate, accounting.

### 1.4 Margen típico industria

| Estado del broker | Margen EBITDA |
|---|---|
| Problema / burn mode | <10% |
| Healthy | 15-30% |
| Excelente (IC Markets, Exness tier) | 40%+ |
| Top 1% mundial | 50-60%+ (Exness reporta >55% histórico) |

Los brokers offshore mid-size bien manejados operan en 25-40% EBITDA. Brokers en problema usualmente es por CAC inflado, B-Book mal gestionado, o over-staffed.

---

## 2. El flujo del dinero — end to end

Entender dónde está físicamente cada dólar en cada momento del flujo es lo más importante que un owner puede saber. La mayoría de brokers que quebraron, quebraron por confusión o mal manejo de este flujo.

<div className="neo-timeline">

1. **Cliente deposita** en el Client Portal. Elige método (card, crypto USDT, wire, PIX, SPEI, etc.) y monto.
2. **PSP procesa el pago.** El PSP (ej. Praxis, B2BinPay, PagSmile) corre fraud checks, 3DS si aplica, y cobra al cliente.
3. **PSP descuenta su fee** y hace settlement al broker. El timing varía: crypto T+0, card T+1-3, wire mismo día, OXXO T+1-2.
4. **Fondos aterrizan en la cuenta corporativa** del broker (banking partner o wallet crypto).
5. **Broker segrega inmediatamente** a dos buckets: (a) **Client Funds Account** — separado por regulación AOFA, (b) **Operating Account** — acá entra solo revenue del broker, no capital de clientes.
6. **Cliente opera en MT5.** El margin requerido por la posición se "bloquea" lógicamente en Client Funds (no sale físicamente), y el trading server ejecuta la orden.
7. **Decisión A-Book vs B-Book.** En tiempo real, el bridge del broker decide si pasa la orden al LP (A-Book) o la absorbe internamente (B-Book). Ver doc dealing-desk-publico.
8. **Si A-Book**: la orden va al LP. El LP ejecuta contra el mercado interbancario. El broker cobra el markup entre precio LP y precio cliente.
9. **Si B-Book**: el broker es contraparte directa del cliente. Si cliente gana, broker paga; si cliente pierde, broker se queda el PnL.
10. **Cliente cierra posición.** PnL se liquida en Client Funds. Si ganó, su balance sube; si perdió, baja.
11. **Cliente solicita retiro.** Ventas/Operations valida KYC, Compliance aprueba si aplica (Medium/High Risk), Treasury ejecuta.
12. **Retiro sale de Client Funds** (nunca de Operating), vía PSP, al cliente. Típicamente mismo método que depósito (anti money laundering requirement).

</div>

### 2.1 La regla de oro: segregación absoluta

> [!DANGER]
> **Client Funds NUNCA, bajo ninguna circunstancia, se usan para pagar gastos operativos del broker.** Ni salarios, ni marketing, ni proveedores, ni dividendos. Ni siquiera en emergencia. Hacerlo es fraude (misappropriation of client funds) y es la razón #1 por la que brokers offshore pierden la licencia y van a la cárcel.

Los Client Funds son **fiduciary assets** del broker. Están bajo custodia del broker pero NO son propiedad del broker. Solo los retornos (spread, comisiones, B-Book net PnL) son del broker, y esos van al Operating Account.

---

## 3. Los 4 pilares operativos del broker

Un broker se gestiona a través de 4 pilares. Cada uno con su head y su propio KPI dashboard.

### 3.1 Treasury / Finanzas
Dueña: Yulia (con finance manager a contratar mes 6). Responsable de:

- Segregación Client Funds vs Operating
- Reconciliación diaria: Sumsub + MT5 + CRM + bank
- Liquidez operativa — garantizar que hay cash para retiros, LP margin, payroll
- Cashflow forecasting — 13-week rolling forecast
- Banking relationships — multi-jurisdicción, multi-proveedor
- Gestión de crypto treasury
- Reporting a principals semanal

Ver doc `executive/treasury-management.md` para el detalle.

### 3.2 Dealing / Trading
Dueño: Pepe (Head of Dealing, 20 años experiencia). Responsable de:

- Decisión A-Book vs B-Book en tiempo real
- Risk limits por cliente, por instrumento, por sesión
- Relación con LPs — pricing, quality of execution, margin calls
- Spread management por tier de cuenta
- Swap policy
- Monitoreo de dealing P&L diario
- Hedge de exposición direccional si excede umbrales

### 3.3 Compliance / Legal
Dueña: Susana (Compliance Officer). Responsable de:

- Licencia AOFA — mantener en regla, renovación, reportes trimestrales
- KYC de cada cliente (via Sumsub + review manual medium/high risk)
- AML monitoring — transaction patterns, SARs, STRs
- Sanctions screening continuo (OFAC, UN, EU, UK)
- Retenciones legales — records 7 años
- Relaciones con regulador AOFA + Financial Intelligence Unit
- Training del equipo en AML/CFT
- Ver docs `compliance/*`

### 3.4 Crecimiento
Dueño: Diego + Angel (compartido). Responsable de:

- Marketing paid + orgánico + contenido
- Ventas directas (Luis, Edward, Franco)
- Programa de partners / IBs
- Retención (reducir churn de clientes activos)
- CAC por canal, LTV tracking
- Mercados nuevos
- Producto — qué instrumentos, qué cuentas, qué promos

---

## 4. Ciclos operativos típicos

### 4.1 Diario
- Treasury: reconciliación Client Funds vs Operating (Yulia AM)
- Dealing: review de P&L del día anterior, exposure check AM, risk limits adjustment si aplica (Pepe)
- Compliance: KYC queue de la noche, SARs urgentes, screening refresh
- Ventas: standups, nuevos leads
- Soporte: tickets
- Marketing: campaign health

### 4.2 Semanal
- Board check-in (Diego + Angel + Yulia) — 30 min, números clave
- Cashflow review — forecast 13 semanas
- Dealing review — profit/loss desk, clientes top, clientes outliers
- Compliance weekly — queue pending, pending SARs, PEP/sanctions
- Marketing performance — CAC, FTD, ROAS por canal
- Sales performance — closed deals, pipeline
- Partners — IBs activos, crecimiento, churn

### 4.3 Mensual
- P&L completa — revenue, costs, EBITDA, margin
- Board report formal (escrito) al full board
- Compliance monthly review — KYC sample audit, transaction monitoring report, filed SARs
- Risk assessment — top 10 cuentas de riesgo, LP exposure, FX exposure
- Payroll + affiliate payouts (día 15)
- PSP review — fees, conversion rate, chargebacks
- Treasury audit interna pairwise (Diego + Yulia)

### 4.4 Trimestral
- Strategic review — qué funcionó, qué no, qué cambiar
- Regulator quarterly report a AOFA
- Budget review + realocación
- HR cycle — performance reviews, raises, bonuses
- Tax provisions review
- Reserves target check

### 4.5 Anual
- External audit (idealmente Big 4 regional o firma offshore reputada)
- Licencia AOFA renewal (fee + documentation)
- Strategic planning año siguiente
- Salary review full cycle
- Policy document review — todos los docs compliance, AML, risk
- Board composition review

---

## 5. KPIs que el owner mira semanalmente

Esta es la **master dashboard** del CEO. En una sola vista, el estado del broker.

<div className="neo-stat-grid">

**Revenue broker week** — Sum de spread markup + comisión + swap + B-Book net PnL. Target: trending up WoW, alerta si cae >15% WoW sin razón obvia.

**Volumen trading (lotes / week)** — Total lotes operados por todos los clientes. Proxy de actividad. Alerta si cae >20% WoW.

**Clientes activos semanales (MAU)** — Cuentas que operaron al menos 1 trade en la semana. Target healthy: creciendo 5-15% MoM.

**FTD rate** — % de registros nuevos que depositaron por primera vez. Industria: 25-40%. <25% = funnel roto.

**CAC blended** — Total marketing/sales cost ÷ new FTDs. Varía por canal, blended target <$250-400 dependiendo del mercado.

**LTV estimado** — Revenue promedio por cliente proyectado a 12 meses. Industria retail: $800-$2,500. LTV/CAC target >3:1.

**Client Funds balance** — Balance total segregado. Debe matchear con (depósitos + open PnL - retiros) al 99.5%+.

**Chargeback rate** — Chargebacks ÷ volumen card. Target <0.5%. >1% = PSP puede cortar relación.

**LP margin utilization** — % usado de margin en cada LP. >80% = rebalancear, <30% = capital inmovilizado.

**Retiros pendientes** — Retiros solicitados sin pagar. >48h sin pagar = problema, genera tickets y churn.

**Chargeback reserve** — % retenido por PSPs (rolling reserve). Cash trapped no disponible para ops.

**Cash runway** — Operating cash ÷ monthly burn. Target mínimo 6 meses, ideal 12 meses.

</div>

---

## 6. Decisiones típicas del owner — week by week

Como principal, estas son las decisiones que SOLO vos podés tomar. Ni Angel, ni Yulia, ni Pepe deberían tomarlas solos.

1. **Ajustes de spread/comisión por instrumento.** Pepe propone, Diego aprueba. Especialmente en cambios que afecten >5% del revenue.
2. **Aprobar clientes HIGH RISK.** Junto con Susana. Cualquier cliente clasificado HIGH requiere firma del owner.
3. **Aprobar retiros > umbral.** Retiros >$25K requieren doble firma (Yulia + Diego). Ver matriz de signatories en `executive/wallet-structure-neomaaa.md`.
4. **Presupuesto marketing mensual.** Diego asigna, Angel ejecuta, se revisa cada mes.
5. **Hedging decisions.** Si B-Book exposure excede X% del equity del broker, Diego decide si hedgear o absorber.
6. **Nuevos PSPs / métodos de pago.** Yulia y Pepe recomiendan, Diego aprueba integración nueva.
7. **Contrataciones clave.** Roles C-level, head of, country manager. Diego entrevista final.
8. **Respuestas a regulador AOFA.** Cualquier communication formal a regulador requiere review de Diego + legal counsel.
9. **Cambios estructurales en LPs.** Agregar/cortar LP, cambiar mix A-Book/B-Book policy, requires Diego decision.
10. **Reserves movement.** Cualquier movimiento del Wallet 5 (Reserves) requiere 3-of-3 signature: Diego + Yulia + Stanislav.

---

## 7. Los 3 errores más comunes de brokers nuevos

Estos son los errores que matan brokers en sus primeros 24 meses. Aprendidos de ver fracasar a decenas de competidores offshore.

### 7.1 Under-capitalización
No tener reservas suficientes para cubrir:
- Drawdown del B-Book en semana mala
- PSP freeze / rolling reserve aumentado
- Retiros masivos simultáneos (ej. mes de volatilidad extrema)
- Contingencia regulatoria (fine, investigation)

**Regla de industria:** un broker necesita mínimo 6 meses de operating cost + 2x el worst-case weekly B-Book drawdown histórico como reserve. Para un broker de nuestro tamaño, eso significa mínimo $400K-$800K en reservas líquidas al lanzar.

**Cómo se ve el fracaso:** el broker tiene una semana mala de B-Book, agotó el operating cash, no puede pagar retiros grandes, se corre la voz, corrida bancaria, cierre en 30-90 días.

### 7.2 Over-promising
Prometer spreads, leverage, ejecución o bonos que no son sostenibles:
- Spreads 0.0 pips sin comisión → imposible de monetizar
- Leverage 1:3000 sin hedge → un movimiento adverso te funde
- Bonos 100% sin condiciones → explota el B-Book
- Ejecución "instant" sin slippage → impossible en volatilidad alta

**Cómo se ve el fracaso:** el broker atrae volumen rápido, los clientes ganan (o el broker no puede monetizar), P&L negativo, freeze de retiros, reclamos en redes, regulador investiga.

### 7.3 Weak compliance
No tener procesos formales para KYC, AML, sanctions, SARs. Errores típicos:
- Onboarding cliente sin ID verification completa
- No renovar KYC anualmente
- No screenear contra sanctions lists actualizadas
- No filear SARs cuando corresponde
- No retener records por 7 años
- Compliance Officer a tiempo parcial o sin autoridad real

**Cómo se ve el fracaso:** regulador hace audit (o banco corresponsal pide evidencia AML), encuentra gaps, revoca licencia o fineea heavy. El broker pierde ability to operate.

---

## 8. Los 3 principios que los brokers exitosos siguen

### 8.1 Segregación absoluta
Client Funds NUNCA se tocan para operating. Ni siquiera en emergencia. Los brokers top (IC Markets, Pepperstone, Exness) tienen reserve accounts dedicados para emergency withdrawal coverage que NUNCA tocan Client Funds.

### 8.2 Diversificación de LPs
Mínimo 3 LPs distintos. Cambiar flow según cost/quality trimestralmente. Single-LP risk es terminal: si ese LP te corta (decisión comercial de ellos), te quedás sin ejecución. Recommend: 1 LP tier 1 institucional + 2 LPs secundarios.

### 8.3 Compliance proactivo
Adelantarse al regulador, no reaccionar. Los brokers que sobreviven 5+ años son los que tienen relación activa con regulador, filean preventivamente, auditan internamente antes que llegue el external audit. Costo: un Compliance Officer serio + software monitoring. Beneficio: licencia intacta, banking partners que no te cortan, reputación.

---

## 9. Cómo sobrevive un broker retail en el tiempo

### 9.1 Año 1-2: supervivencia
Objetivo: cashflow positivo antes de quemar runway inicial. Métricas clave:
- Break-even operativo (revenue > operating cost fixed) en mes 6-12
- Churn <20% mensual (retención >80% de clientes que hacen FTD)
- LTV/CAC >2:1 mínimo, idealmente >3:1
- Licencia intacta, cero findings compliance graves
- PSPs diversificados (min 3 activos)

**Killer risks año 1-2:** CAC inflado, PSP cortes, compliance fail, B-Book drawdown sin reserves.

### 9.2 Año 3-5: escala
Objetivo: volumen growth + eficiencia operativa. Métricas clave:
- Revenue 3-5x año 1
- EBITDA margin 20%+ sostenido
- Expansión a 2-3 mercados nuevos
- Team scaling a 30-50 personas
- Tier 2 licensing considerado (Mauritius FSC, Cyprus CIF, Seychelles FSA upgrade)

**Killer risks año 3-5:** culture breakdown por crecimiento, compliance scaling issues, LP churn, regulator tightens.

### 9.3 Año 5+: opciones estratégicas
- **Cash cow mode:** mantener operación, cosechar EBITDA, dividendos a principals.
- **Tier 1 upgrade:** aplicar a FCA UK, ASIC AU, CySEC. Costo: $2M-5M+, beneficio: acceso a mercados regulados y premium branding.
- **M&A / exit:** venta a broker más grande (IC Markets compró Pepperstone mid-size en 2023 pattern) o PE firm. Múltiplo típico: 3-8x EBITDA.
- **Diversificación:** lanzar líneas complementarias (prop firm, educación, crypto exchange, wealth management).

### 9.4 Claves de supervivencia largo plazo
- Reserves mínimo 6-12 meses operating cost, idealmente 12+
- Multi-PSP: nunca 1 solo (ideal 5+ activos, rotables)
- Multi-LP: nunca 1 solo (ideal 3+)
- Compliance clean: nunca un finding serio
- Treasury discipline: segregación sagrada
- Unit economics positivos desde mes 12 (NO quemar capital indefinidamente)
- Cultura ownership: principals involucrados, no absent
- Regulator relationship: proactivo, no reactivo

---

## 10. Referencias cruzadas — roadmap executive reading

Los docs del área `executive/` son el complemento obligatorio de este panorama. Leer en este orden:

| # | Doc | Para qué | Tiempo |
|---|---|---|---|
| 1 | [Panorama Ejecutivo](/content/executive/panorama-ejecutivo) | Este doc — foto macro | 30 min |
| 2 | [Treasury Management](/content/executive/treasury-management) | Multi-wallet strategy industria | 45 min |
| 3 | [Wallet Structure NEOMAAA](/content/executive/wallet-structure-neomaaa) | Setup específico nuestro | 30 min |
| 4 | [Unit Economics Broker](/content/executive/unit-economics-broker) | Cómo gana dinero el broker | 30 min |
| 5 | [Financial Controls](/content/executive/financial-controls) | Controles internos ejecutivos | 30 min |
| 6 | [Risk Management — Owner view](/content/executive/risk-management-owner) | Riesgos y mitigation | 45 min |
| 7 | [Liquidity Providers B2B](/content/executive/liquidity-providers-b2b) | Relación con LPs | 30 min |
| 8 | [Escalamiento y Crecimiento](/content/executive/escalamiento-y-crecimiento) | Año 1 → año 5 | 30 min |

Docs operativos recomendados para contexto complementario (no executive-only):

- [Workflow Compliance](/content/compliance/workflow) — cómo opera Susana
- [Manual de Crisis](/content/operations/manual-crisis) — qué hacer si algo explota
- [PSPs Explicados](/content/operations/psps-explicados) — mecánica pagos
- [Risk Matrix Clientes](/content/compliance/risk-matrix) — KYC tiers
- [SAR Reporting](/content/compliance/sar-reporting) — AML reporting
- [Dealing Desk](/content/operations/dealing-desk-publico) — cómo opera Pepe
- [Go-Live Runbook](/content/operations/go-live-runbook) — checklist launch

---

## 11. Cierre — principios no-negociables del owner

Si en 2 años te perdés el detalle del negocio, recordá estos 7 principios:

1. **Segregación de Client Funds es sagrada.** No hay excepción.
2. **Multi-PSP y multi-LP desde el día 1.** Single-vendor risk es terminal.
3. **Compliance proactivo.** Invertir en Susana + software + external counsel. Es la inversión con mejor ROI del broker.
4. **Reserves 6-12 meses mínimo.** No crecer a costa de runway.
5. **Dealing conservador.** B-Book exposure tiene límites. Hedgear cuando pasa el threshold.
6. **Unit economics > growth.** LTV/CAC >3:1 antes de escalar marketing.
7. **Board cadence semanal + mensual.** Sin cadence, el broker drifta.

> [!SUCCESS]
> **Regla final:** un broker offshore bien manejado es uno de los negocios de mejor ROE del mundo. Margenes 30-50%, escalable a 8-9 figuras, exit options claras. Un broker mal manejado es el peor negocio posible: revocable overnight, reputation risk, posible exposure penal. La diferencia está en disciplina de los principios de arriba. Nada más.

---

**Versión:** 1.0 | **Última revisión:** 13 abril 2026 | **Próxima revisión:** 30 julio 2026
**Owner:** Diego Loyola (CEO) | **Co-approver:** Angel Ortega, Yulia, Stanislav
