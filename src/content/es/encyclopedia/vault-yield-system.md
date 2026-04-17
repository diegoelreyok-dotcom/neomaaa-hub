# Vault Yield System — Sistema de Yield Pasivo NEOMAAA

**Version:** 1.0
**Fecha:** 15 Abril 2026
**Audiencia:** Equipo completo (sales, support, compliance, marketing, ops)
**Clasificacion:** Uso interno — apta para entrenamiento de equipo

> [!INFO]
> **Documento fuente:** La feature esta publicada oficialmente en **neomaaa.com** como "Vault Yield System". Los terminos y condiciones legales definitivos viven en `legal/vault-yield-terms.md` y en https://neomaaa.com/about/legal-documentation. Este documento interno es una guia operativa/comercial — no reemplaza el contrato legal.

---

## 1. Que es el Vault Yield System

El **Vault Yield System** (en adelante, "el Vault") es una feature oficial de NEOMAAA Markets que permite al cliente **depositar fondos en una wallet dedicada no-trading ("vault") y ganar un rendimiento anualizado (yield) sobre el balance mantenido**. Es un producto de yield pasivo, similar en concepto a:

- **Binance Earn** (Flexible Savings)
- **Crypto.com Earn**
- **Nexo Earn**
- **Coinbase Rewards (USDC Earn)**

La idea central: el cliente que no esta operando activamente puede **hacer trabajar su capital** en lugar de dejarlo idle en la cuenta de trading. NEOMAAA paga un interes periodico por los fondos bloqueados o semi-bloqueados en el Vault.

> [!WARNING]
> **Atencion:** El Vault Yield System **NO es trading, NO es deposito bancario regulado, NO es una IMF garantizada.** Es un producto de yield operado por el broker, con riesgos propios que el cliente debe entender antes de usarlo. Ver seccion 6 (Riesgos).

---

## 2. Como funciona — Mecanica general

### 2.1 Flujo del cliente (alto nivel)

<div className="neo-flow">
<div className="neo-step" data-num="1"><strong>El cliente deposita</strong> fondos en NEOMAAA (via PSP tradicional o crypto rail).</div>
<div className="neo-step" data-num="2"><strong>Transfiere al Vault</strong> desde el portal del cliente — elige monto y plazo (flexible o locked, dependiendo del plan vigente).</div>
<div className="neo-step" data-num="3"><strong>Devenga yield</strong> diariamente al rate publicado en la pagina del producto.</div>
<div className="neo-step" data-num="4"><strong>Retira o compone</strong> — puede solicitar retiro de capital + intereses segun reglas del plan, o dejarlo componer.</div>
</div>

### 2.2 Activo subyacente

El Vault opera tipicamente sobre **stablecoins (USDT / USDC)** porque:
- Son el activo de ingreso crypto principal del broker (la mayor parte de depositos crypto entran en USDT).
- Permiten rendimiento en protocolos DeFi regulados, staking institucional, o lending desk de contraparte.
- Ofrecen estabilidad de valor (no expone al cliente a volatilidad crypto-spot mientras devenga yield).

[DATO: confirmar con Diego/Finance si el Vault tambien acepta USD fiat, BTC, o multi-asset. A la fecha de este doc, la asuncion operativa es USDT como core.]

### 2.3 Plazos

Modelos tipicos de la industria (NEOMAAA probablemente usa 1 o mas de estos):

| Plan | Lock-up | Yield relativo |
|---|---|---|
| **Flexible** | Sin lock — retiro 24/7 | Menor (base) |
| **Locked 30d** | 30 dias sin retiro | +~1-2% sobre flexible |
| **Locked 90d** | 90 dias | +~2-3% sobre flexible |
| **Locked 180d/365d** | 6-12 meses | +3-5% sobre flexible |

[DATO: estructura de plazos exacta publicada — confirmar con Diego/Finance. Rate base y rates por plazo son variables y se actualizan en la pagina oficial del producto.]

### 2.4 Calculo del yield

**Formula general (estandar industria):**

```
Yield_diario = Balance_vault × (APY / 365)
Yield_acumulado = Sum(Yield_diario) durante el periodo
```

- **APY** = Annual Percentage Yield, neto de fees del producto.
- **APR vs APY:** si el yield se compone automaticamente (reinvierte), se expresa como APY. Si se paga sin componer, es APR.
- **Pago:** daily accrual, con payout tipicamente diario o al termino del lock.

[DATO: APY exacto vigente, metodo de calculo (APR vs APY), frecuencia de payout, y si hay compounding automatico — confirmar en la pagina del producto.]

---

## 3. Elegibilidad

### 3.1 Clientes elegibles

- Cliente con cuenta NEOMAAA Markets **KYC aprobado** (Tier completo).
- Residencia en jurisdiccion **no restringida** (ver `compliance/risk-matrix.md` seccion 5).
- [DATO: si requiere tier minimo de cuenta (Standard/Raw/Institutional) o si Cent tambien accede].

### 3.2 Clientes NO elegibles

- Residentes en **USA, Canada, EEA (incluido Espana), UK, Australia** (mismas restricciones generales del broker).
- Jurisdicciones OFAC comprehensive (Cuba, Iran, Siria, Corea del Norte, Myanmar, Sudan, Crimea).
- Clientes bajo flag EDD sin resolver en compliance.
- Menores de edad o cuentas corporativas sin habilitacion explicita (corporate vault terms vive aparte).

### 3.3 Limites operativos tipicos

- **Minimo de deposito al Vault:** [DATO: confirmar — estandar industria $100-$500 USDT].
- **Maximo por cliente:** [DATO: confirmar — puede haber cap por tier o por deteccion de AML].
- **Maximo agregado del producto:** decidido por Finance/Treasury segun capacidad de rendimiento del pool.

---

## 4. Beneficios comerciales (sales angle)

> [!TIP]
> **Uso comercial:** El Vault es una palanca poderosa de **retencion y LTV**. Un cliente que tiene capital en el Vault es estructuralmente menos propenso al churn porque hay un costo de oportunidad en irse.

### Para el cliente
- **Capital idle trabajando** — en vez de dejar el saldo sin operar, lo hace generar yield.
- **Alternativa a plazo fijo bancario** — potencialmente mas competitivo que bancos tradicionales en LATAM.
- **Liquidez flexible** (en plan flexible) — puede retirar cuando quiera para operar.
- **Refugio en periodos de no-trading** — vacaciones, mercado en rango, drawdown psicologico.

### Para el broker (uso interno)
- **Retencion:** cliente con capital en Vault es mas "pegajoso".
- **Float:** el broker gestiona el float del pool Vault, generando diferencial entre yield pagado al cliente y yield generado en el backend (ver seccion 7).
- **Cross-sell:** el Vault es puerta de entrada a traders que vienen de crypto/DeFi y prefieren yield passive antes que trading activo.

---

## 5. Angulos para sales y support

### Que SI podes decir al cliente
- "El Vault es una feature oficial de NEOMAAA que te permite ganar yield sobre tu balance no utilizado."
- "El rate actual esta publicado en la pagina del producto y puede actualizarse. Los terminos legales estan en neomaaa.com/about/legal-documentation."
- "Es un producto de yield, no es un deposito bancario garantizado. Los terminos de lock-up, minimos y riesgos estan en los Vault Yield Terms."
- "Podes ver tu balance y yield acumulado en el portal del cliente."

### Que NO podes decir al cliente
- ❌ "Yield garantizado" — el yield se publica pero esta sujeto a terminos y puede ajustarse.
- ❌ "Protegido / asegurado" — NO hay seguro de deposito tipo FDIC.
- ❌ "Libre de riesgo" — el producto tiene riesgos operativos y de contraparte.
- ❌ "Vas a ganar X% seguro por los proximos 12 meses" — el rate es variable.
- ❌ "Es igual que un plazo fijo bancario" — **NO es** un producto bancario regulado.

### Plantilla de respuesta (chat/email)
> *"El Vault Yield System te permite hacer que tu balance no-operativo genere un rendimiento anualizado. El rate actual y las condiciones estan publicados en la pagina del producto en neomaaa.com. Los terminos legales completos estan en nuestros Vault Yield Terms. Tene en cuenta que es un producto de yield, distinto de un deposito bancario regulado — implica ciertos riesgos que vale la pena leer antes de usar. Si queres te paso el link directo a los terminos o te explico un caso concreto."*

---

## 6. Riesgos (transparencia con el cliente y compliance)

### 6.1 Riesgos operativos
- **No es deposito bancario garantizado.** NO hay FDIC, NO hay fondo de garantia regulatorio.
- **Lock-up:** en planes locked, el cliente no puede retirar antes del vencimiento (o paga penalidad).
- **Variabilidad del rate:** el APY publicado puede ajustarse con notificacion previa segun los terminos.

### 6.2 Riesgos de contraparte
- El yield se genera porque los fondos del pool Vault se despliegan en estrategias de rendimiento: staking institucional, lending a desks, protocolos DeFi whitelisted, o tesoreria propia. Cada una tiene un riesgo de contraparte distinto.
- [DATO: composicion del backend del pool — confirmar con Finance/Treasury para documentacion regulatoria interna].

### 6.3 Riesgos de mercado
- Si el activo subyacente es una stablecoin, el riesgo principal es **de-peg** (evento extremo) o **freeze** regulatorio del emisor (USDT, USDC). Monitorear con Treasury.

### 6.4 Riesgos regulatorios
- Productos de yield sobre stablecoins han recibido escrutinio de reguladores (SEC en USA contra BlockFi/Celsius/Gemini). La licencia AOFA permite este producto bajo ciertos terminos, pero **no se ofrece a residentes EEA/USA/UK** para evitar clasificacion como security.

### 6.5 Disclosures obligatorios (sales/marketing)
Cualquier comunicacion comercial del Vault debe incluir el disclaimer:

> *"El Vault Yield System es un producto de yield operado por Neomaaa Ltd. NO es un deposito bancario garantizado. El rendimiento publicado es variable y esta sujeto a los Vault Yield Terms. El producto no esta disponible para residentes de USA, Canada, EEA, UK, Australia ni jurisdicciones sancionadas. Rendimientos pasados no garantizan rendimientos futuros. Lee los terminos completos antes de participar."*

---

## 7. Operativa interna (solo ops/finance/compliance)

### 7.1 Gestion del pool
- El pool Vault es una wallet segregada del trading flow del broker (evitar comingling de client funds con trading P&L del broker).
- [DATO: estructura exacta — segregated wallet crypto, cuenta bancaria dedicada, o hibrido — confirmar con Treasury y wallet-structure-neomaaa.md].

### 7.2 Reconciliacion
- Daily: reconciliar balance del pool Vault contra suma de balances individuales de clientes en Vault + yield accrued.
- Weekly: reporte a Principals (Diego / Yulia / Stanislav) de AUM Vault, yield pagado, margen neto del producto.
- Monthly: audit interno (Yulia) + log en Notion/compliance tracker.

### 7.3 Compliance y AML
- Depositos grandes al Vault pueden disparar EDD segun `compliance/edd-triggers.md` (mismo threshold que deposito comun).
- Retiros del Vault hacia wallets externas → screening obligatorio Chainalysis/TRM (ver `compliance/screening-sanciones.md`).
- Cliente que mueve fondos Vault ↔ trading ↔ externo en patron sospechoso → escalar a Susana (posible SAR).

### 7.4 Handling de queja sobre Vault
- Primer nivel: Support explica el producto y consulta rate publicado.
- Segundo nivel: Finance revisa calculo de yield en el portal.
- Tercer nivel: Compliance (si hay claim de malpractice o ejecucion incorrecta del yield) → puede derivar a `legal/complaint-handling.md`.

---

## 8. Links relacionados

- `legal/vault-yield-terms.md` — Terminos legales del Vault Yield System (doc legal oficial).
- `legal/client-agreement.md` — Acuerdo del cliente (marco contractual general).
- `legal/terms-conditions.md` — T&C generales.
- `encyclopedia/abc.md` — Entrada "Vault Yield System" en el glosario.
- `executive/wallet-structure-neomaaa.md` — Estructura de wallets que soporta el Vault (incluye gestion del float).
- `compliance/edd-triggers.md` — Triggers EDD para depositos Vault grandes.

---

## 9. Pendientes de confirmacion (placeholder list)

El siguiente conjunto de datos debe confirmarse con **Diego / Yulia / Stanislav / Finance** antes de considerar este doc "locked":

- [ ] **APY exacto vigente** (base y por plazo).
- [ ] **Frecuencia de payout** (daily accrual, monthly payout, compounding automatico).
- [ ] **Minimos de entrada** (en USDT o equivalente).
- [ ] **Maximos por cliente y globales**.
- [ ] **Plazos ofrecidos** (flexible, locked 30d / 90d / 180d / 365d).
- [ ] **Asset mix del backend** (staking, lending desk, DeFi whitelisted) + riesgo de contraparte asociado.
- [ ] **Jurisdicciones exactamente restringidas** para el producto (mas alla del baseline del broker).
- [ ] **Penalidades por early withdrawal** (si aplica en locked).
- [ ] **Tier minimo de cuenta** requerido (Cent accede o solo Standard+).
- [ ] **Link directo al Vault Yield Terms** en neomaaa.com/about/legal-documentation.

Cuando estos datos esten confirmados, actualizar este doc y el doc legal `legal/vault-yield-terms.md`.

---

> [!INFO]
> Ultima auditoria de consistencia: 15 Abril 2026 (auditoria de actualidad contra neomaaa.com).
