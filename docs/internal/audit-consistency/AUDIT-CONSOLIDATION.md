# AUDIT-CONSOLIDATION — Propagacion del Gold Source Oficial

**Fecha:** 2026-04-13
**Autor:** Claude (audit de consolidacion)
**Scope:** Propagar el gold source oficial de Neomaaa Ltd (entidad legal, licencia, jurisdicciones restringidas, servicios) a docs que quedaron fuera del scope de AUDIT1-5.
**Estado:** TypeScript `tsc --noEmit` OK | `next build` OK.

---

## 1. Gold Source aplicado

```
Entidad legal: Neomaaa Ltd
Tipo: IBC 15968 — Union of Comoros
Licencia: L15968/N — Anjouan Offshore Finance Authority (AOFA)
Sede: Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros

Web: neomaaa.com
Soporte: help.neomaaa.com
Legal: neomaaa.com/about/legal-documentation

Servicios: CFDs, Forex, Commodities, Indices, Metales, Energy, Cryptocurrencies
Modo de ejecucion: execution-only; principal/counterparty admitido (A-Book/B-Book hibrido)

Jurisdicciones RESTRINGIDAS: USA, Canada, EEA (30 paises), UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan + sancionadas.
```

---

## 2. Archivos modificados

| # | Archivo | Cambio aplicado |
|---|---------|-----------------|
| 1 | `src/content/es/legal/terms-conditions.md` | "Union de Comoras" → "Union of Comoros" (3 ocurrencias) |
| 2 | `src/content/es/legal/client-agreement.md` | "Union de Comoras" → "Union of Comoros" (3 ocurrencias) |
| 3 | `src/content/es/legal/aml-kyc-policy.md` | (a) Tiers KYC: 3-tier → **4-tier** consolidado con operativo ($1K / $10K / $50K / $50K+). (b) Timing revisiones manuales: "24h" → "48-72h conservador". (c) Comoros ingles. |
| 4 | `src/content/es/legal/risk-disclosure.md` | "Union de Comoras" → "Union of Comoros" (2 ocurrencias) |
| 5 | `src/content/es/legal/order-execution-policy.md` | (a) Agregada seccion **2.1.1 "Actuacion como Principal o Contraparte"** admitiendo oficialmente principal/counterparty hibrido + base execution-only. (b) Comoros ingles. |
| 6 | `src/content/es/legal/privacy-policy.md` | "Union de Comoras" → "Union of Comoros" |
| 7 | `src/content/es/legal/refund-policy.md` | "Union de Comoras" → "Union of Comoros" |
| 8 | `src/content/es/legal/affiliate-terms.md` | "Union de Comoras" → "Union of Comoros" (2 ocurrencias). Payout minimo $100 ya presente. |
| 9 | `src/content/es/legal/complaint-handling.md` | "Union de Comoras" → "Union of Comoros" |
| 10 | `src/content/es/support/playbook.md` | **Tabla leverage ES + EN corregida**: Standard 1:500 → **1:1000**, Institutional 1:200 → **Custom** (en ambas tablas: CR-16 leverage + comparacion de cuentas ES/EN) |
| 11 | `src/content/es/hiring/support-es.md` | Requisito MT5: "MetaTrader 4 o MetaTrader 5" → "MT5 (NEOMAAA opera solo en MT5), experiencia previa con MT4 valorable" |
| 12 | `src/content/es/hiring/support-en.md` | Idem soporte EN |
| 13 | `src/content/es/hiring/onboarding-5-dias.md` | "Unión de las Comoras" → "Union of Comoros" |
| 14 | `src/content/es/hiring/finance-manager.md` | "Anjouan, Comoros" → "Anjouan, Union of Comoros" |
| 15 | `src/content/es/dashboard.md` | "Unión de las Comoras" → "Union of Comoros" |
| 16 | `src/content/es/encyclopedia/regulacion-jurisdicciones.md` | "Unión de las Comoras" → "Union of Comoros" (2 ocurrencias) |
| 17 | `src/content/es/marketing/competidores-deep-dive.md` | Tier 4 pyramid: "AOFA Anjouan, Comoras, Mwali" → "AOFA Anjouan, Union of Comoros, Mwali" |
| 18 | `src/content/es/marketing/icps-por-mercado.md` | **Agregado callout WARNING al inicio**: España es EEA restringida; contenido estrategico se mantiene por valor pero adquisicion directa prohibida. Se listan mercados operativos aceptables (LATAM, CIS selectivo, Asia fase 2, Middle East, Africa) |
| 19 | `src/content/es/operations/faq-interno.md` | 4 ocurrencias de "Comoras/Comoros" normalizadas a "Union of Comoros" |
| 20 | `src/content/es/compliance/mejores-practicas-compliance.md` | "capacitacion AML (18 personas)" → "(16 personas)" |

**Total: 20 archivos modificados.**

---

## 3. Archivos revisados SIN cambios necesarios (ya alineados)

| Archivo | Razon |
|---------|-------|
| `src/content/es/compliance/manual-susana.md` | Ya incluye Crimea, Donetsk, Luhansk + lista completa EEA/USA/Canada/UK/Australia y gold source completo. |
| `src/content/es/compliance/workflow.md` | Lista de paises restringidos completa (EEA, USA, Canada, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan + OFAC/ONU/UE). |
| `src/content/es/compliance/ab-book-policy.md` | Ya alineado con gold source (hibrido ECN/STP, sin revelar umbrales internos publicamente). |
| `src/content/es/sales/faq-ventas.md` | Leverage correcto (1:1000 retail). Raw $3/lote/lado correcto. Depositos min $5/$50/$500/$50K correctos. |
| `src/content/es/sales/commissions.md` | Doc de comisiones de agentes, no del cliente. No aplicable. |
| `src/content/es/sales/training.md` | Identidad legal ya con "Union of Comoros" y license L15968/N. |
| `src/content/es/sales/objections-broker.md` | Identidad legal ya con "Union of Comoros". |
| `src/content/es/partners/playbook-ib.md` | Payout minimo $100 correcto. Disclaimers oficiales presentes. |
| `src/content/es/partners/programa-completo.md` | Payout minimo $100 correcto. |
| `src/content/es/marketing/copy-broker.md` | Seccion "Palabras prohibidas" ya bloquea "100% seguro", "rentabilidad garantizada", "exito garantizado", etc. |
| `src/content/es/hiring/roles-broker-completo.md` | "hoy 16 personas" correcto. |
| `src/content/es/hiring/finance-manager.md` | "16 personas (12 + 4 vacantes)" correcto. |

---

## 4. CONFLICTOS CRITICOS — decision pendiente de Diego

### 4.1 Estrategia España (EEA restringida)

**Conflicto:** España aparece como ICP #2, mercado core en `icps-por-mercado.md` con datos operativos (targeting, copy, presupuestos ads EUR, agentes asignados a franja CET, SEM EUR 500-4,000). Pero EEA es jurisdiccion **RESTRINGIDA** bajo gold source.

**Mitigacion aplicada:** Callout WARNING al inicio del doc. Contenido preservado por valor estrategico (lecciones ESMA, perfil del trader hispanohablante sofisticado, benchmarks competitivos).

**Pregunta a Diego:**
- (a) ¿Remover completamente España como ICP operativo del doc y moverlo a un apendice "mercados estudiados, no operativos"?
- (b) ¿Mantener como ahora (callout + narrativa) porque el plan real es captar hispanohablantes residentes en LATAM o fuera de EEA con perfil cultural similar?
- (c) ¿Hay una entidad futura con licencia EEA planeada (MiFID II) que justifique mantener esto como roadmap?

**Impacto:** Si el plan es (a), se deben ajustar tambien `marketing/funnel-broker.md`, `marketing/retencion-broker.md`, `sales/plan-contacto.md` que referencian España como mercado. Hoy NO se aplicaron cambios alli hasta tener tu decision.

---

### 4.2 Tiers KYC — legal consolidado 4-tier

**Estado actual:** Doc legal `aml-kyc-policy.md` ya CONSOLIDADO a 4-tier (Tier 1 <$1K, Tier 2 $1K-$10K, Tier 3 $10K-$50K, Tier 4 >$50K). Timing movido a 48-72h.

**Pregunta a Diego:**
- ¿Los umbrales operativos $1K/$10K/$50K/$50K+ son los que quieres en el doc publico? Si Susana tiene umbrales distintos operativamente, hay que reconciliar **antes de que el doc legal vaya live**.
- Confirmar: ¿Tier 4 requiere EDD (enhanced due diligence) completo o es solo threshold informativo?

---

### 4.3 Payout minimo IB — resuelto

**Estado:** Tanto `legal/affiliate-terms.md` como `partners/playbook-ib.md` y `partners/programa-completo.md` tienen **$100 USD** como minimo consistente. No hay conflicto de $50 vs $100. **Sin decision pendiente.**

---

### 4.4 Margen Diamond IB — revisar modelo financiero

**Flag heredado del brief:** "Margen Diamond IB <20% con rev share 60% + boost + bonos".

**Estado:** No se encontraron tiers "Diamond" en `partners/programa-completo.md` ni `modelo-financiero.md` (los tiers son Bronze 30%, Silver 40%, Senior, Elite). Los % superan 30%+.

**Pregunta a Diego:**
- ¿El tier "Diamond" existe o fue renombrado a "Elite" (35%)?
- El modelo financiero del partners/modelo-financiero.md asume hasta 20% rev share con margen broker saludable. Si hay Diamond 60% + boosts, el margen NEOMAAA puede caer por debajo del 20% — posible perdida operativa por cliente. Revisar con Yulia y Stanislav antes de publicar el programa.

---

### 4.5 Telefono de soporte oficial

**Estado:** `operations/go-live-runbook.md` linea 49 y 347 muestran **+41 44 707 9633** (telefono suizo). Gold source no especifica telefono.

**Pregunta a Diego:** ¿+41 44 707 9633 es el telefono oficial de soporte? Si no, enviar el numero correcto para actualizar antes del go-live.

---

### 4.6 Admision principal/counterparty ahora publicada

**Cambio aplicado:** Seccion 2.1.1 agregada en `order-execution-policy.md` admitiendo oficialmente que Neomaaa Ltd puede actuar como principal o counterparty (alineado con gold source disclaimer).

**Riesgo/beneficio:**
- BENEFICIO: transparencia legal, protege ante disputas de slippage/ejecucion interna. Match con disclaimer oficial del gold source.
- RIESGO: algunos clientes sofisticados pueden leerlo como "hacen B-Book contra mi". Coordinar con marketing/sales el messaging.

**Pregunta a Diego:** ¿Confirma publicar o prefiere linguaje mas suave tipo "puede agregar liquidez internamente" sin usar la palabra "counterparty"?

---

## 5. Preguntas rapidas a Diego

1. **España como mercado (4.1):** eliminar, mantener con warning, o roadmap futuro?
2. **Tiers KYC 4.2:** los umbrales legales consolidados coinciden con operativo?
3. **Diamond IB 4.4:** existe ese tier? margen sostenible?
4. **Telefono 4.5:** +41 44 707 9633 es oficial?
5. **Principal/counterparty 4.6:** publicar con el texto legal (ya aplicado) o suavizar?

---

## 6. Verificacion

```bash
cd /Users/gsiglobalteamevent/neomaaa-hub
./node_modules/.bin/tsc --noEmit    # EXIT 0 ✓
./node_modules/.bin/next build      # OK ✓
```

Ambos pasan sin errores.
