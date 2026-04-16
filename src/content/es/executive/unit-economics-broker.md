# Unit Economics — Cómo Gana Dinero un Broker Retail

**Documento ejecutivo — CONFIDENCIAL OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA Anjouan**
**Audiencia: Diego, Angel, Yulia, Stanislav**
**Versión: 1.0 | Fecha: abril 2026**

---

> **AVISO:** Este documento describe mecánicas estructurales de unit economics de brokers retail de FX/CFDs basadas en rangos públicos de la industria (ESMA, ASIC, NFA, reportes anuales de brokers listados). No contiene números internos de NEOMAAA. Los `[DATO:]` marcan lugares donde owners deben completar con cifras propias al cerrar cada mes fiscal.

> [!WARNING]
> **Benchmarks de industria (CAC, LTV, churn, payout ratios, margenes LP) son estimaciones snapshot de Abril 2026** basadas en reportes publicos de brokers listados, research de consultoras y datos ESMA/ASIC. Estos numeros **varian significativamente** por ciclo de mercado (bull crypto, recesion, news cycles), por mercado geografico (LATAM vs EU vs Asia), por canal de adquisicion (paid vs organic vs IB) y por tipo de cliente (retail vs institutional). Usar como direccion general, **no como target operativo literal**. Revalidar contra benchmarks actualizados cada trimestre antes de tomar decisiones de capex/opex basadas en estos numeros.

---

## ÍNDICE

1. El P&L del broker retail en una página
2. Revenue streams explicados en detalle
3. Costos explicados en detalle
4. CAC — Customer Acquisition Cost
5. LTV — Lifetime Value
6. LTV:CAC ratio — el KPI más importante
7. Payback Period
8. Cohort analysis — cómo ver la verdad
9. Ejemplo numérico — cliente típico broker retail
10. Los cinco indicadores que Diego mira cada lunes
11. Targets para NEOMAAA año 1
12. Cuándo NO escalar marketing
13. Cuándo escalar agresivo

---

## 1. El P&L del broker retail en una página

El negocio del broker retail parece complicado desde afuera pero se reduce a una ecuación muy simple: revenue por cliente menos costo por cliente menos costos fijos. Lo que lo hace retorcido es que el revenue tiene cinco fuentes, los costos tienen seis, y todo se mueve con el volumen del cliente que a su vez se mueve con la calidad del onboarding, el servicio, y la suerte del mercado.

La forma correcta de leer un P&L de broker retail es de arriba hacia abajo, deteniéndose en cada margen:

```
REVENUE (gross):
+ Spread markup revenue
+ Commission revenue (cuentas Raw $3/lado)
+ Swap revenue net (overnight financing)
+ B-Book flow absorbido (PnL cliente neto perdido)
+ Inactivity fees (si aplica)
+ Conversion fees (FX entre cuentas)
+ Deposit/Withdrawal fees (raro, casi todos free)

- COSTS (direct):
- Liquidity Provider costs (markup interbancario ~0.2-0.5 pip)
- PSP processing fees (2-5% del depósito)
- Chargeback costs (1-3% volumen card)
- Affiliate commissions (30-50% revenue share tiers IB)
- Bonus costs (si se dan — ej. Raw commission rebates)

= GROSS PROFIT (margen 40-60% healthy)

- OPERATING COSTS:
- Payroll (40-60% del gross profit típico)
- Tech/MT5 license ($10-20K/mes)
- Compliance (Sumsub, Refinitiv, legal)
- Marketing budget (30-50% del revenue para scale)
- Office, travel, misc

= EBITDA (margen 10-30% healthy post scale)

- NON-OPERATING:
- Interest on reserves
- FX gains/losses
- Regulatory fees/fines
- Tax (offshore: ~0-10%, depende)

= NET INCOME
```

Tres observaciones estructurales que importan para pensar estratégicamente:

**Observación 1 — El revenue no es homogéneo.** Un cliente Standard genera revenue mayoritariamente vía spread markup y B-Book; un cliente Raw/Institutional genera mayoritariamente vía commission y algo de swap. Esto significa que la mezcla de producto determina el margen: 100 clientes Raw no valen lo mismo que 100 clientes Standard.

**Observación 2 — El gross margin sano está entre 40% y 60%.** Abajo de 40% indica o LP caro, o B-Book mal gestionado (clientes ganando), o mix pesado de PSPs caros. Arriba de 60% indica probablemente demasiado B-Book absorbido sin hedge — lo que es insostenible a largo plazo por riesgo.

**Observación 3 — EBITDA healthy post-scale está entre 10% y 30%.** Brokers muy eficientes con afiliados tercerizando ventas llegan a 25-35%. Brokers con ventas internas grandes y marketing caro quedan en 10-15%. Esto define cuánto payroll puede soportar el negocio en régimen.

---

## 2. Revenue streams explicados en detalle

### Stream 1 — Spread markup

El broker suma un número de basis points (bps) o pips al spread que recibe del Liquidity Provider (LP). Es el mecanismo más antiguo y transparente de monetización retail. Ejemplo: el LP cotiza EURUSD a 0.2 pip, NEOMAAA cotiza 1.0 pip al cliente → el markup es 0.8 pip. En una cuenta Standard típica el markup agregado está entre 0.5 y 1.5 pips para majors, 2-5 pips para minors, y 5-20 pips o más para exotics y CFDs.

Fórmula práctica:

```
Revenue spread markup = markup_en_pips × valor_pip_USD × lotes_operados
```

Por 1 lote EURUSD round-turn con 0.8 pip markup: 0.8 × $10 × 1 = $8 de revenue.

Si un cliente opera 100 lotes/mes con ese markup: $800/mes de revenue solo por spread. Ese número se infla rápido en clientes activos y es lineal con el volumen.

Este es el revenue dominante para cuentas Standard/Cent, donde el cliente paga todo el costo en el spread y no hay comisión explícita. Es también el revenue más estable mes a mes porque no depende de que el cliente pierda (como B-Book) ni de eventos macro.

### Stream 2 — Commission (cuentas Raw)

Las cuentas Raw/ECN ofrecen spread crudo del LP más una comisión por lote. El modelo estándar de la industria es $3-$7 por lado (es decir, $6-$14 round-turn). NEOMAAA cobra $3/lado = $6 round-turn.

El LP típicamente cobra al broker entre $1 y $2 por lado por esa ejecución cruda. Por lo tanto el margen neto del broker en la comisión es de $1-$2 por lado, o $2-$4 round-turn. Para 100 lotes:

- Revenue bruto: 100 × $6 = $600
- Costo LP: 100 × ~$2 (combined) = $200
- Revenue neto de commission: $400

El margen sobre la comisión bruta es típicamente 60-70%. Este es el revenue dominante para cuentas Raw / Institutional, y para scalpers y clientes algorítmicos de alto volumen. Escala linealmente con los lotes operados, igual que el spread markup pero con menor markup por trade (spread crudo).

### Stream 3 — Swap (overnight financing)

Cuando un cliente mantiene una posición abierta al cerrar el día de trading (17:00 NY), se aplica un cargo o abono de swap basado en el diferencial de tasas de las dos divisas del par. El broker agrega un markup adicional de 0.5% a 2% anualizado sobre ese diferencial.

Fórmula general:

```
Swap = (tasa_divisa_long - tasa_divisa_short + markup_broker) / 360 × notional
```

El swap es revenue silenciosa pero enorme en clientes que operan swing o hold plurianual. Clientes retail típicos no tienen conciencia del costo de swap y lo absorben sin reclamar.

Los miércoles se cobra swap triple para compensar la liquidación del fin de semana. Para carry trades (AUDJPY, NZDJPY), el swap puede representar 30-40% del costo efectivo del trader a lo largo de meses.

### Stream 4 — B-Book flow absorbido

Este es el componente más rentable y más volátil. Cuando un cliente opera en modo B-Book (el broker es contraparte), sus pérdidas son revenue directo del broker. El dato público ESMA de 2018-2024 muestra que 74-89% de clientes retail pierden. Esto significa que si el broker absorbe flujo en B-Book con criterio, la expectativa matemática es positiva.

Rango de contribución del B-Book al revenue total en brokers retail bien operados: **30% a 60%**. Por eso ningún broker retail es 100% A-Book aunque digan lo contrario en marketing — el negocio se vuelve económicamente inviable si se renuncia al B-Book disciplinado.

El riesgo del B-Book es que un cliente gane mucho. Por eso el dealing desk (responsable: Pepe) aplica hedging parcial o total para clientes que muestran profitabilidad sistemática. Ver `ab-book-policy.md` para la política completa de enrutamiento.

### Stream 5 — Otros (menores pero relevantes)

- **Inactivity fee:** $5-10/mes después de 3-6 meses de cuenta inactiva. Modelo estándar. Aporta 1-3% del revenue total pero es revenue pura (margen 100%).
- **FX conversion fee:** cuando el cliente deposita en una divisa y opera en otra, se cobra un spread de conversión (1-2%). Revenue menor pero relevante en mercados donde el depósito local es frecuente (PIX en Brasil, Astropay en LATAM).
- **Deposit/withdrawal fees:** la mayoría de brokers retail absorben el costo para mantener UX. Si se cobra, es para desincentivar micro-retiros. No es revenue estratégico.
- **Affiliate rebates no pagados:** cuando un IB deja de traer clientes durante X meses, su comisión se retiene o expira. No es revenue explícito pero reduce costos.

---

## 3. Costos explicados en detalle

### Costo 1 — Liquidity Provider fees

El LP cobra al broker por la ejecución, ya sea vía markup interbancario o comisión explícita. Para cuentas A-Book este es el costo dominante.

Rangos típicos de markup LP sobre mid-market institucional:

| Categoría | LP markup típico |
|---|---|
| Majors FX (EURUSD, GBPUSD) | 0.1 – 0.3 pip |
| Minors FX (EURJPY, GBPAUD) | 0.3 – 0.8 pip |
| Exotics FX (USDTRY, USDZAR) | 2 – 10 pips |
| Metals (XAUUSD) | 15 – 25 cents |
| Indices (US30, NAS100) | 0.5 – 1.5 pts |
| Crypto CFD (BTCUSD) | 10 – 40 USD |

Fórmula:

```
Costo LP = markup_LP_pips × valor_pip × lotes_A-Book
```

Típicamente el costo LP es 30-50% del spread markup bruto del broker en A-Book. Para B-Book el costo LP se reduce drásticamente porque no se rutea al LP — pero aparece costo de hedge parcial cuando es necesario.

### Costo 2 — PSP processing fees

Los Payment Service Providers cobran por procesar depósitos y retiros. Es un costo directo que crece con el volumen de funding, no con el volumen de trading.

Rangos típicos:

| Método | Costo por transacción | Rolling reserve |
|---|---|---|
| Visa/Mastercard (card) | 2.5 – 4.5% + $0.30 flat | 5 – 10% por 6 meses |
| Wire SEPA | 0.5 – 1% + $1-5 flat | 0% |
| Wire SWIFT | $15-40 flat | 0% |
| Crypto (USDT/BTC) | 0.5 – 1.5% total | 0% |
| PIX (Brasil) | 1.5 – 3% | 5% por 3 meses |
| Astropay (LATAM) | 2 – 4% | 5-10% por 3-6 meses |
| Open Banking (EU) | 0.5 – 1.5% | 0-5% |

Dato crítico para treasury: **las rolling reserves locked son capital efectivamente congelado**. Un broker que procesa $2M/mes por card con 8% rolling reserve tiene $960K (6 meses × 8% × $2M) parados en cada merchant account. Esto afecta cash runway real.

Estimado típico: **1.5-4% del volumen de depósitos procesados se pierde en fees PSP**, más reservas. Retiros típicamente tienen costos similares, aunque muchos PSPs cobran solo el depósito.

### Costo 3 — Chargebacks

El chargeback es cuando el cliente disputa la transacción con su banco. El banco devuelve el dinero y el broker pierde el depósito, más un fee PSP de $25-50 por dispute, más daño al merchant rating.

Tasa de chargeback típica en retail FX/CFD (categorizado como high-risk por Visa/MC): **1-3%**. Si el broker supera 2% sostenido, el PSP puede:

1. Aumentar rolling reserve
2. Aumentar processing fee
3. Terminar la merchant account (catástrofe)

Por eso el compliance y el fraud filtering son inseparables del unit economics. Un broker con 3% de chargebacks quema su margen en disputes y se arriesga a perder la capacidad de aceptar tarjetas.

Costo estimado total: **1-2% del volumen depósito card** termina saliendo como chargebacks netos (pérdida del depósito + fee + tiempo).

### Costo 4 — Affiliate commissions

El modelo IB de NEOMAAA usa tiers Bronze 30% / Silver 40% / Senior 45% / Elite 50% del broker revenue por cliente referido. Se paga mensualmente con retroactividad.

Para un broker con fuerte canal IB (el modelo estándar LATAM), **el 30-50% del gross revenue se paga en comisiones de afiliados**. Este es el costo variable más grande del negocio después del LP.

El trade-off es estratégico:

- **CAC afiliado efectivo** (blended): $100-300 per FTD
- **CAC paid marketing** (Meta, Google): $200-500 per FTD

El IB sale más barato pero come margen perpetuo sobre el revenue del cliente. El paid marketing cuesta más upfront pero el cliente es 100% propio. La mayoría de brokers sanos operan con un mix de 40-60% canal IB / resto orgánico + paid.

### Costo 5 — Bonus y rebates (opcional)

Algunos brokers dan:
- Bono de depósito (típicamente 20-100% del depósito, no retirable hasta tradear X lotes)
- Cashback por volumen ($0.5-2 por lote operado)
- Loyalty programs
- Contest prizes

El costo real de un programa de bonus bien estructurado es 5-15% del revenue, porque la mayoría de clientes nunca alcanzan el umbral de release del bono. El costo percibido por el cliente es mucho mayor que el costo real del broker.

NEOMAAA debe decidir estrategia de bonos en conjunto dealing / marketing. El riesgo es atraer bonus-hunters (chargeback-prone) y no clientes genuinos.

### Operating costs estimados mensuales (broker mid-size año 1)

| Categoría | Rango mensual USD |
|---|---|
| Payroll (15-20 personas) | $40-100K |
| Tech (MT5 license + infra + tools) | $10-20K |
| Compliance (Sumsub + Refinitiv + legal retainer) | $5-10K |
| Marketing (variable, depende de burn) | $30-150K |
| Office/ops | $3-8K |
| Legal/accounting externo | $3-5K |
| **Total OpEx** | **$90K – $300K/mes** |

El rango amplio refleja la decisión estratégica de cuánto acelerar: un broker que gasta $90K/mes está en modo "survive and validate", uno que gasta $300K/mes está en modo "scale hard". Diego debe definir cuál es el régimen en cada trimestre.

---

## 4. CAC — Customer Acquisition Cost

CAC es el costo total de adquirir un cliente que hace First Time Deposit (FTD). **La métrica canónica es "cost per FTD", no cost per signup.** Un signup sin depósito vale cero.

Fórmula:

```
CAC = (spend_marketing + payroll_sales_attribuible + tooling + overhead_attribuible) / FTDs_del_periodo
```

Rangos de la industria retail FX/CFD por canal:

| Canal | CAC típico por FTD |
|---|---|
| Organic (SEO, content) | $50 – $150 |
| Paid Meta Ads | $200 – $500 |
| Paid Google Ads | $250 – $600 |
| Affiliate / IB (blended) | $100 – $300 |
| Influencer campaigns | $300 – $700 |
| Email marketing (base existente) | $30 – $80 |
| Paid Telegram / Discord | $150 – $400 |
| Eventos / Expos | $500 – $1,500 |

**Benchmark blended total en un broker retail sano: $150 – $400 por FTD.**

NEOMAAA opera en mercados (LATAM, CIS, MENA, Asia fase 2) donde el CAC tiende al rango bajo del benchmark — especialmente via IBs locales, canal orgánico de Traders Hub podcast, y Franco como embajador. Los mercados más caros serían España y Europa continental (que no son prioritarios en el año 1).

Regla heurística: si el CAC crece 20%+ mes a mes sostenido, o si FTDs caen mientras spend sube, hay que cortar el canal problema y revisar.

---

## 5. LTV — Lifetime Value

LTV es el revenue neto total que un cliente genera en toda su vida como cliente del broker. Se calcula por cohorts (clientes onboardeados en el mismo mes) y se sigue 12-18 meses.

Rangos típicos de la industria retail:

| Segmento | LTV típico |
|---|---|
| LTV promedio blended | $500 – $2,000 |
| Top 20% clients (Pareto) | $5,000 – $50,000 |
| Bottom 80% clients | $50 – $300 |
| Top 1% whales | $100K+ |

**La curva es extremadamente asimétrica.** El cliente promedio no existe: lo que existe es una mezcla de muchos clientes pequeños que pierden rápido + un puñado de clientes que tradean mucho tiempo y compensan con creces. Optimizar para retención del top 20% es mucho más valioso que intentar mejorar el LTV promedio del bottom 80%.

Curva típica de churn:

| Punto | Churn acumulado |
|---|---|
| 3 meses | 70% |
| 6 meses | 85% |
| 12 meses | 92% |
| 24 meses | 96% |

Los clientes que siguen activos a los 12 meses son los que hacen el negocio rentable. Por eso el win real del producto y servicio no está en captar sino en retener la cohorte de traders disciplinados que tradearán 12-36+ meses.

---

## 6. LTV:CAC ratio — el KPI más importante

Este ratio resume la viabilidad económica del broker en un número.

```
LTV:CAC = LTV_blended / CAC_blended
```

Interpretación:

| Ratio | Diagnóstico | Acción |
|---|---|---|
| < 2:1 | Quemando capital, no sostenible | Parar scale, revisar canales |
| 2:1 – 3:1 | Break-even lento | Optimizar retention, bajar CAC |
| 3:1 – 5:1 | Healthy | Reinvertir en crecimiento |
| > 5:1 | Excelente | Escalar agresivo |

**El target operacional para un broker retail sano es >3:1.** Por debajo de 2:1, incluso si el top-line crece, el broker destruye valor y depende de financing externo para sobrevivir.

NEOMAAA debe medir este ratio por canal y por mercado. Puede pasar que el blended esté en 3:1 pero un mercado específico esté en 1.5:1 y otro en 6:1 — en ese caso se redistribuye spend al canal/mercado rentable.

---

## 7. Payback Period

El payback period es cuántos meses tarda el revenue de un cliente en recuperar el CAC que costó adquirirlo. Es el complemento del LTV:CAC: mide velocidad de recuperación.

Rangos industria:

| Payback | Diagnóstico |
|---|---|
| < 6 meses | Excelente — el cash se recicla rápido |
| 6 – 12 meses | Healthy benchmark industria |
| 12 – 18 meses | Viable pero requiere capital de trabajo alto |
| > 18 meses | Problemático — revisar canal o modelo |

El payback importa porque determina cuánto capital de trabajo necesita el broker para sostener crecimiento. Un CAC de $300 con payback 3 meses permite escalar con poco capital. Un CAC de $300 con payback 15 meses requiere financing serio para seguir adquiriendo.

Payback corto también reduce riesgo de PSP freeze o crisis regulatoria: el cash ya se recuperó antes de que el cliente pudiera causar problemas.

---

## 8. Cohort analysis — cómo ver la verdad

Los promedios mienten. La verdad del negocio se ve en cohorts.

Proceso estándar:

1. Agrupar clientes por mes de onboarding (cohorte abril 2026, mayo 2026, etc.)
2. Seguir cada cohorte trimestre a trimestre:
   - Mes 1: depósitos iniciales, trades, revenue
   - Mes 3: % aún activos, revenue acumulado
   - Mes 6: LTV parcial, churn rate
   - Mes 12: LTV, churn final, composición del top 20%

Lo que se busca:

- **Las cohorts recientes mejoran o empeoran?** Si el LTV mes-3 de la cohorte abril 2026 es peor que el de enero 2026, hay degradación del producto o del mix de canal.
- **Qué canal produce cohorts de mayor LTV?** El CAC puede ser el mismo pero el LTV por canal diverge mucho.
- **Qué mercado tiene retention mejor?** LATAM vs MENA vs CIS — se ve después de 3-6 meses de operación.
- **El top 20% se está manteniendo?** Si el top empieza a churneado antes, el negocio se desacelera estructuralmente.

Sin cohort analysis formal, el broker vuela a ciegas. Es la herramienta que separa management riguroso de gestión intuitiva.

---

## 9. Ejemplo numérico — cliente típico broker retail

Ejemplo ilustrativo de un cliente Standard promedio (basado en medias de industria, no en datos NEOMAAA):

**Perfil:** deposita $500 inicial, opera 5 lotes/mes, dura 6 meses antes de blow-up o churn.

**Revenue bruto por mes:**

- Spread markup: 5 lotes × 1.2 pip × $10/pip = $60
- Swap (posiciones overnight ocasionales): $5
- Total mensual: $65
- Total 6 meses: **$390** revenue bruto

**Costos directos del cliente:**

- LP markup (50% del spread si A-Book): -$30
- PSP fees (2% del depósito inicial): -$10
- Affiliate commission si vino vía IB Silver (40%): -$156
- **Costos directos totales: -$196**

**Gross revenue neto del cliente (antes de CAC):** $390 - $196 = **$194**

**CAC asumido:** $250

**Contribución neta del cliente:** $194 - $250 = **-$56 (pérdida)**

**Observación crítica:** este cliente individual deja pérdida. El broker es rentable porque la cohorte incluye también al top 20% que compensa. Si el 80% pierde $56 y el top 20% aporta $1,200/cliente en promedio:

```
Cohorte 100 clientes:
- 80 × (-$56) = -$4,480
- 20 × $1,200 = +$24,000
- Neto cohorte: +$19,520
- Por cliente: $195 neto
```

Este es el verdadero LTV blended y por qué el marketing retail vive del Pareto. Si el top 20% se degrada (porque se van a un competidor, o porque el dealing hostiliza sus trades), todo el modelo se rompe aunque los volúmenes totales se vean bien.

---

## 10. Los cinco indicadores que Diego mira cada lunes

La obligación semanal del founder. Diez minutos, un email, cinco números:

1. **Revenue WoW (week over week)** — tendencia cruda. Crece, plana, cae?
2. **FTDs contados esta semana + CAC total** — si FTDs cae y CAC sube, problema inmediato.
3. **Cash burn / cashflow neto** — cuánto cash entró vs cuánto salió. Runway estimado.
4. **Chargeback rate semana** — alarma si >1.5%, crítico si >2%.
5. **Client fund balance stability** — matches entre cuenta cliente y obligaciones. Diferencia >0.5% es bandera roja.

Si estos cinco están sanos, el negocio está sano a nivel semanal. Si alguno se desvía, el lunes se convierte en revisión táctica inmediata con el equipo correspondiente (marketing, dealing, compliance, finance).

---

## 11. Targets para NEOMAAA año 1

Basados en benchmark de industria retail FX/CFD con broker fresh-launch en mercados LATAM + CIS + MENA:

| KPI | Target mes 1 | Target mes 6 | Target mes 12 |
|---|---|---|---|
| FTDs mensuales | 200 – 500 | 1,000 – 2,000 | 2,500 – 5,000 |
| CAC blended | < $400 | < $300 | < $250 |
| LTV blended (12m projected) | n/a | > $600 | > $900 |
| LTV:CAC ratio | n/a | > 2.5:1 | > 3.5:1 |
| Gross margin | > 35% | > 45% | > 50% |
| EBITDA margin | negativo | break-even | positivo 10-20% |
| Chargeback rate | < 2% | < 1.5% | < 1% |
| Churn 3 meses | < 75% | < 70% | < 65% |

Estos son targets de planeación, no compromisos. Si el mes 6 NEOMAAA está en LTV:CAC 2:1 no es panic inmediato — es señal para revisar canales y apretar retention. Si mes 12 sigue abajo de 3:1, entonces sí requiere cambio de estrategia.

**[DATO: cash runway actual al cierre de abril 2026]**
**[DATO: target revenue mensual mes 6 acordado owners]**
**[DATO: budget marketing mes 1-6 aprobado por Yulia/Stanislav]**

---

## 12. Cuándo NO escalar marketing

Reglas duras. Si se cumple cualquiera, se frena o reduce spend hasta corregir:

- **CAC > 1/3 del LTV projectado.** Economics negativas, cada dólar de marketing destruye valor.
- **Chargeback rate >2% sostenido 2+ semanas.** El problema es de targeting o de onboarding, no de falta de spend.
- **Retention mes 1 < 40%.** Los clientes nuevos no vuelven a tradear después del primer mes — producto o soporte falla.
- **Nuevo mercado con LTV:CAC < 2:1 después de 3 meses.** Ese mercado no es rentable con el playbook actual.
- **PSPs con tensión activa** (rolling reserve aumentado, merchant review, threat termination). Más volumen empeora el problema.
- **Equipo de soporte saturado** (tiempos de respuesta >24h sostenido). Escalar onboarding destruye retention.
- **Compliance con backlog creciente** (KYC pending >48h, alertas sin revisar). Riesgo regulatorio overloaded.

---

## 13. Cuándo escalar agresivo

Reglas para apretar el acelerador:

- **LTV:CAC > 3:1 sostenido 3 cohorts consecutivas.** El modelo tiene tracción real.
- **Chargeback estable < 1%.** Control de fraud y targeting sólido.
- **PSPs estables con headroom** (rolling reserves en plan standard, sin tensiones).
- **Equipo de support con capacidad probada** (tiempos respuesta < 4h, NPS > 40).
- **Compliance sin findings** en últimas 2 revisiones.
- **Cashflow positivo 2+ meses** o funding disponible explícito.
- **Nuevos canales de baja CAC identificados** con pruebas piloto exitosas.

Cuando se cumplen todos, la decisión correcta es 3x el budget de marketing el próximo trimestre. La ventana de escalamiento en retail FX es corta (12-24 meses); no aprovecharla es regalarle mercado a los competidores.

---

## Apéndice — placeholders para owners

**[DATO: LP primario y secundario contratados al cierre del mes]**
**[DATO: PSPs activos con volumen por provider]**
**[DATO: external accountant — firma y contacto mensual]**
**[DATO: mix A-Book / B-Book decidido por dealing desk al cierre del mes]**
**[DATO: top 3 canales de adquisición por volumen FTDs al cierre del mes]**
**[DATO: cash position total across all wallets (operating + client + affiliate)]**

---

**Firma y control de versiones**

| Versión | Fecha | Cambios | Aprobado |
|---|---|---|---|
| 1.0 | abril 2026 | Documento inicial owners | Pendiente Diego, Angel, Yulia, Stanislav |

**Próxima revisión:** trimestral, en el offsite Q siguiente.

---

## 14. Caso NEOMAAA — Unit Economics por Sales Agent (Stage 1 lanzamiento)

> **Restringido a owners (Diego, Angel, Yulia, Stanislav).** Esta sección cruza los costos de compensación variable del equipo de sales contra los targets de revenue del Stage 1 del broker. Los datos específicos de comisiones por agente viven en `sales/commissions.md` (versión sanitizada accesible al equipo). Los números de P&L, márgenes y ROI viven únicamente acá.

### 14.1 Contexto financiero de referencia (Stage 1)

Datos del Playbook de Lanzamiento, marco de referencia para calibrar la política de comisiones:

- **Costos operativos Stage 1:** ~$34,000/mes
- **Revenue target (margen bruto ~50%):** ~$68,000/mes
- **Salarios base de los 3 agentes (Franco, Edward, Luis):** $3,000/mes (ya incluido en los $34K)

### 14.2 Costo de comisiones por escenario (equipo de 3 agentes)

**Escenario Conservador — mes promedio**

| Concepto | Por Agente | x3 Agentes |
|----------|-----------|------------|
| Comisiones FTD | $230 | $690 |
| Bono Volumen | $150 | $450 |
| Bono Equipo | $100 | $300 |
| **Total comisiones** | **$480** | **$1,440** |

Impacto: $1,440/mes adicional sobre los $3,000 de base → **$4,440 total en comp de ventas**. Representa **6.5%** del revenue target de $68K.

**Escenario Optimista — buen mes**

| Concepto | Por Agente | x3 Agentes |
|----------|-----------|------------|
| Comisiones FTD | $491 | $1,473 |
| Bono Volumen | $350 | $1,050 |
| Bono Equipo | $200 | $600 |
| **Total comisiones** | **$1,041** | **$3,123** |

Impacto: $3,123/mes adicional → **$6,123 total en comp de ventas**. Representa **9.0%** del revenue target.

**Escenario Excepcional — gran mes**

| Concepto | Por Agente | x3 Agentes |
|----------|-----------|------------|
| Comisiones FTD | $846 | $2,538 |
| Bono Volumen | $600 | $1,800 |
| Bono Equipo | $350 | $1,050 |
| **Total comisiones** | **$1,796** | **$5,388** |

Impacto: $5,388/mes adicional → **$8,388 total en comp de ventas**. Representa **12.3%** del revenue target.

### 14.3 Tabla resumen de impacto al P&L

| Escenario | FTDs Equipo | Dep. Totales Equipo | Costo Comisiones | Costo Total Sales | % de Revenue Target |
|-----------|------------|---------------------|------------------|-------------------|---------------------|
| Conservador | 30 | ~$16,000 | $1,440 | $4,440 | 6.5% |
| Optimista | 54 | ~$35,000 | $3,123 | $6,123 | 9.0% |
| Excepcional | 75 | ~$82,000 | $5,388 | $8,388 | 12.3% |

### 14.4 Lectura de sostenibilidad

Regla general de la industria de brokers retail: el costo de adquisición + compensación de sales debería estar entre **8-15% del revenue bruto**. Todos los escenarios del modelo NEOMAAA quedan dentro o por debajo de ese rango:

| Escenario | % Revenue | Dentro del rango? |
|-----------|-----------|-------------------|
| Conservador | 6.5% | Sí — por debajo (margen de seguridad) |
| Optimista | 9.0% | Sí — rango ideal |
| Excepcional | 12.3% | Sí — dentro del techo aceptable |

**Punto crítico para monitorear:** si los 3 agentes alcanzan "mes excepcional" pero el revenue real queda debajo de $68K, el % sube fuera de rango. Mitigante: si los agentes generan $82K en depósitos, el revenue del broker debería ser proporcional (B-Book flow absorbido + spreads + comisiones por lote), por lo que el esquema es auto-regulante — **más depósitos = más comisiones para agentes PERO también más revenue para el broker**.

### 14.5 ROI del esquema de comisiones por agente

```
Revenue por cliente activo promedio (estimación Stage 1 LATAM):
- Depósito promedio: $300
- Lotes operados/mes: 5-10 (retail típico)
- Ingreso broker por lote (spread + comisión internalizada): ~$8-15
- Revenue mensual por cliente activo: $40-150

Si el agente trae 10 FTDs/mes y 60% se mantienen activos:
- 6 clientes activos × $75 revenue promedio = $450/mes revenue recurrente
- Comisión pagada al agente por esos 10 FTDs: ~$230 (one-off)
- Payback de la comisión FTD: ~2-3 semanas de operación del cliente

LTV estimado cliente activo (12 meses): $900 - $1,800
CAC del canal sales (comisión FTD por cliente): $15 - $60
LTV:CAC del canal sales: 15x - 30x
```

### 14.6 Implicancias estratégicas para owners

1. **El canal sales directo tiene LTV:CAC excelente en Stage 1** (15-30x), muy por encima del benchmark de marketing paid (3-5x). Justifica mantener y escalar el equipo de sales antes que empujar paid ads agresivos.
2. **El clawback del FTD (sección 5 del doc sales)** está calibrado para proteger el payback period real: si el cliente no opera en las primeras 2-3 semanas, la comisión se revierte y el broker no queda en pérdida.
3. **El techo de compensación total ($3,000-$4,000/mes por agente top)** está alineado con el margen que un agente productivo genera al broker. Subirlo sin evidencia de revenue incremental rompe el ratio 8-15%.
4. **Monitoreo recomendado:** revisar mensualmente el ratio (comp total sales) / (revenue atribuido a sales) por agente. Si un agente individual supera 15% durante 2 meses consecutivos sin traer clientes de calidad medible (retención + volumen), revisar caso.

### 14.7 Alineación con el documento público de sales

La versión que ve el equipo de sales en `sales/commissions.md` **no expone** los números de revenue target, margen, costos operativos, LTV, CAC ni ROI del broker. Sólo muestra sus comisiones personales, tiers, mecánica de pago y reglas de clawback. Esta separación es intencional por confidencialidad operativa y competitiva.
