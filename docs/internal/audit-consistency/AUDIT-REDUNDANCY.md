# Auditoría de Redundancia — Abril 2026

**Alcance:** 89 docs `src/content/es/**/*.md` — 325,989 palabras.
**Objetivo:** identificar duplicación funcional, temas repetidos entre docs, stubs débiles y oportunidades de consolidación. **No se ejecuta nada**; solo reporte accionable.

---

## Resumen ejecutivo

- Docs ES: **89**
- Palabras: **~326K**
- Docs candidatos a eliminar o fusionar (alta confianza): **11**
- Docs candidatos a adelgazar con gold source + link: **~20**
- Reducción estimada si se ejecuta Fase 1 + Fase 2: **~55-70K palabras** (17-21% del total)

La duplicación del portal no es catastrófica pero sí sistémica. Los patrones más tóxicos:

1. **Compliance over-fragmentado.** El framework Susana (7 docs nuevos) solapa 40-60% con `manual-susana.md` (8.8K palabras). Dos workflows de compliance cubren lo mismo con ángulos distintos.
2. **Legal stubs post-fundacionales (Abril 2026).** 8 docs nuevos (≈9.5K palabras totales) duplican secciones ya cubiertas en `terms-conditions.md` + `client-agreement.md`. Muchos son necesarios **por compliance** (AOFA los exige públicos), pero internamente no aportan nada que no esté ya en otros docs.
3. **Glosarios duplicados.** `encyclopedia/abc.md` (2.6K) vs `encyclopedia/glosario-trilingue.md` (6.6K) cubren el mismo set de términos, uno en ES y otro en ES/EN/RU.
4. **Competidores con dos docs.** `competidores-broker.md` (3.8K) vs `competidores-deep-dive.md` (8.3K) — el segundo es superset del primero.
5. **Listas repetidas 5-10 veces** sin anchor al gold source (países, tipos de cuenta, licencia, frases prohibidas, 70-80% retail, métodos de pago).

---

## Duplicados funcionales (mismo tema, docs separados)

### Caso 1: Workflow compliance doble

- `compliance/workflow.md` — 5,895 palabras. Estructura: plan capacitación + flujo KYC + comunicación ventas-compliance + retiros + checklist mensual + matriz prohibidas.
- `compliance/workflow-sales-compliance.md` — 6,170 palabras. Estructura: roles, journey cliente, KYC, depósitos, retiros, red flags, SLAs, scripts.
- **Overlap:** ~55%. Ambos cubren KYC paso a paso, retiros, comunicación sales↔compliance, matriz de quién puede hacer qué. El segundo es más operativo (flowcharts, scripts) y el primero más formativo (capacitación Susana + anexos).
- **Recomendación:** fusionar. Mantener `workflow-sales-compliance.md` como gold (más ejecutable), mover plan de capacitación (sección 1 del `workflow.md`) a `hiring/onboarding-5-dias.md` o a un anexo, eliminar `workflow.md`.
- **Impacto:** -3,000 a -4,000 palabras.
- **Riesgo:** bajo. El plan de capacitación de Susana ya está cubierto parcialmente en `compliance/susana-playbook.md` sección 9.

### Caso 2: Manual Susana vs framework Susana (7 docs)

- `compliance/manual-susana.md` — 8,876 palabras. Es el manual "todo-en-uno" pre-framework.
- Framework nuevo: `susana-playbook.md` (6,625), `risk-matrix.md` (2,756), `edd-triggers.md` (3,370), `pep-sanctions-sop.md` (3,436), `sar-reporting.md` (3,374), `compliance-calendar.md` (3,044), `ongoing-monitoring-sop.md` (3,679). **Total framework: 26,284 palabras.**
- **Overlap manual↔framework:** 50-65%. El manual tiene secciones 3 (categorías de riesgo) = risk-matrix; 4 (EDD) = edd-triggers; 6 (monitoreo continuo) = ongoing-monitoring-sop; 9 (SARs) = sar-reporting; 12 (capacitación) + 14 (checklists) = compliance-calendar.
- **Qué sólo está en manual-susana:** sección 7 (países restringidos — pero ya hay GOLD SOURCE en `screening-sanciones.md:666`), sección 8 (frases prohibidas), sección 13 (preparación AOFA), anexos A y B.
- **Recomendación:** convertir `manual-susana.md` en un **índice navegacional** (~1,500 palabras) que linkee a cada SOP del framework, conservar solo las 3 secciones únicas (frases prohibidas, prep AOFA, anexos).
- **Impacto:** -6,500 a -7,000 palabras.
- **Riesgo:** medio. Susana probablemente tiene el manual marcado como referencia única. Mover con cuidado, dejar redirect.

### Caso 3: Competidores doble

- `marketing/competidores-broker.md` — 3,796 palabras. 9 secciones: tabla comparativa, análisis por competidor, precios, LATAM, gaps, amenazas, estrategia, plan acción, resumen ejecutivo.
- `marketing/competidores-deep-dive.md` — 8,342 palabras. Battle cards + matriz + estrategia por cliente + objeciones + red flags + reglas comunicación competitiva.
- **Overlap:** 40%. El deep-dive es más operativo (battle cards listos para vender); el broker es más analítico (SWOT, gaps de mercado).
- **Recomendación:** fusionar en UN doc `competidores.md`. Las 9 secciones del primero caben como apéndice analítico al deep-dive. Eliminar `competidores-broker.md`.
- **Impacto:** -2,500 palabras.
- **Riesgo:** bajo.

### Caso 4: Glosarios duplicados

- `encyclopedia/abc.md` — 2,649 palabras. Glosario A-Z en español + frases prohibidas + números clave.
- `encyclopedia/glosario-trilingue.md` — 6,658 palabras. Glosario ES/EN/RU organizado por temas (10 secciones).
- **Overlap terminológico:** ~80% de los términos del ABC están en el trilingüe.
- **Recomendación:** mantener `glosario-trilingue.md` como gold (superset, soporta equipo bilingüe). Convertir `abc.md` en referencia rápida de "números clave + frases prohibidas" (~600 palabras) o eliminar y mover su contenido único (frases prohibidas) al gold source (`manual-susana.md` sección 8 o `copy-broker.md` sección 7).
- **Impacto:** -2,000 palabras.
- **Riesgo:** bajo. El ABC es amable para agentes nuevos pero es duplicación pura.

### Caso 5: Vault Yield — sistema vs términos

- `encyclopedia/vault-yield-system.md` — 1,903 palabras. Explicación operativa + sales angles + riesgos + operativa interna.
- `legal/vault-yield-terms.md` — 1,521 palabras. Términos legales completos (elegibilidad, APY, abuso, geografía, fees, terminación).
- **Overlap:** ~25% (riesgos y elegibilidad).
- **Recomendación:** **mantener ambos.** Audiencias distintas: sistema es para equipo/sales, terms es para cliente. La duplicación es sana.

### Caso 6: Complaint handling — doble

- `support/manejo-quejas.md` — 3,008 palabras. Operativo: definición, proceso, SLAs, scripts, compensaciones.
- `legal/complaint-handling.md` — 1,163 palabras. Política pública hacia cliente: canales, plazos, escalamiento AOFA.
- **Overlap:** ~30%.
- **Recomendación:** **mantener ambos.** Uno es público (legal), otro es interno (support). Separación correcta.

### Caso 7: Tres docs de launch que solapan

- `launch/checklist.md` — 873 palabras. Master checklist pre go-live.
- `launch/post-launch-playbook.md` — 4,487 palabras. Semanas 1-4 post go-live.
- `operations/go-live-runbook.md` — 4,061 palabras. D-1, D-0, primeras 24h, primera semana, rollback.
- **Overlap checklist↔runbook:** 60% (runbook absorbe el checklist entero).
- **Overlap runbook↔post-launch (semana 1):** 30%.
- **Recomendación:** eliminar `launch/checklist.md` (queda absorbido por `go-live-runbook.md` sección "Checklist Final Pre-Launch"). Mantener post-launch separado (arranca D+7).
- **Impacto:** -900 palabras.
- **Riesgo:** mínimo.

### Caso 8: Support — dos mega docs

- `support/playbook.md` — 13,538 palabras. MAYOR doc del portal. 8 secciones + 4 apéndices (Intercom, canned responses, top 20 problemas, métricas).
- `support/enciclopedia-soporte.md` — 12,780 palabras. Segundo mayor doc. 14 secciones + 5 apéndices (cuentas, KYC, depósitos, MT5, trading, spreads, leverage, instrumentos, reglas, seguridad, Vault, problemas, contacto).
- **Overlap:** ~45%. Ambos cubren tipos de cuenta, KYC, MT5, depósitos, problemas comunes, escalación. La enciclopedia es más profunda en producto; el playbook es más procesal (Intercom, canned, SLAs).
- **Recomendación:** reestructurar — playbook = **proceso** (Intercom, SLAs, escalación, canned responses, métricas, checklists). Enciclopedia = **conocimiento** (qué responder técnicamente). Quitar las 4 secciones redundantes de enciclopedia del playbook (secciones 1-5 del playbook actual tienen mucho contenido producto que repite enciclopedia).
- **Impacto:** -4,000 a -5,000 palabras si se limpia correctamente.
- **Riesgo:** medio. Agentes usan los dos; hay que re-anclar.

### Caso 9: Partners — affiliate-terms vs programa-completo vs playbook-ib

- `partners/programa-completo.md` — 2,231 palabras. Arquitectura de los 3 programas, tracking, márgenes.
- `partners/playbook-ib.md` — 4,821 palabras. Guía operativa para IBs (superset).
- `legal/affiliate-terms.md` — 1,665 palabras. T&C legal para afiliados.
- `partners/guia-operativa.md` — 2,912 palabras. Onboarding + Cellxpert + compliance.
- `partners/modelo-financiero.md` — 2,219 palabras. Unit economics.
- **Overlap programa-completo ↔ playbook-ib:** ~40% (estructura comisiones, tiers). El playbook-ib ya cubre estructura comisiones, frases prohibidas, disclaimers.
- **Recomendación:** eliminar `programa-completo.md` o reducir a 500 palabras (tabla comparativa de los 3 programas). El playbook-ib ya es el gold operativo para IBs; la guía operativa es para el equipo interno; el affiliate-terms es legal. Programa-completo duplica sin ángulo único.
- **Impacto:** -1,700 palabras.
- **Riesgo:** bajo.

### Caso 10: Legal stubs nuevos (Abril 2026)

8 docs post-fundacionales, todos en `legal/`:

| Doc | Palabras | Único (no cubierto en otro doc) |
|---|---|---|
| `terms-of-use.md` | 1,039 | Parcial — uso del sitio web (diferente de `terms-conditions.md` del servicio) |
| `bonus-terms.md` | 1,036 | Sí — turnover, bonus abuse. Único. |
| `cookies-policy.md` | 839 | Sí (GDPR requiere doc separado) |
| `conflicts-of-interest.md` | 1,169 | Sí (AOFA lo exige) |
| `trading-conditions.md` | 1,083 | NO — todo está en `terms-conditions.md` sección 8 + `order-execution-policy.md` |
| `trading-restrictions.md` | 1,269 | Parcial — restricciones geográficas ya están en `terms-conditions.md` sección 15 y `aml-kyc-policy.md` sección 7 |
| `disclaimers-communications.md` | 1,310 | Parcial — frases prohibidas ya están en `manual-susana.md` sección 8 + `copy-broker.md` sección 7 |
| `vault-yield-terms.md` | 1,521 | Sí (producto único requiere terms dedicados) |

- **Overlap stubs ↔ terms-conditions maestro:** ~35%.
- **Recomendación:**
  - **Mantener (legal/regulatorio):** bonus-terms, cookies-policy, conflicts-of-interest, vault-yield-terms, terms-of-use.
  - **Consolidar a `terms-conditions.md`:** trading-conditions (absorber como anexo) y trading-restrictions (ya está en sección 15, eliminar stub).
  - **Consolidar a `manual-susana.md` + `copy-broker.md`:** disclaimers-communications (las frases prohibidas ya están duplicadas 3 veces; dejar el disclaimer público mínimo en `risk-disclosure.md`).
- **Impacto:** -3,000 a -3,700 palabras.
- **Riesgo:** medio. Antes de eliminar un legal, verificar con Susana que AOFA no exija doc separado. Si AOFA pide doc público específico, mantener pero adelgazar al mínimo requerido.

### Caso 11: PSPs vs Deposits — parcial

- `operations/deposits.md` — 6,486 palabras. Procesos depósitos y retiros completos.
- `operations/psps-explicados.md` — 4,099 palabras. Qué es un PSP, anatomía, chargebacks, stack NEOMAAA.
- **Overlap:** ~20%. El primero es proceso; el segundo es conceptual.
- **Recomendación:** mantener ambos. Separación correcta por audiencia (ops diaria vs formación).

### Caso 12: Trainings, objections, primer-contacto (sales)

- `sales/training.md` — 3,993 palabras. 6 semanas de capacitación (producto + MT5 + compliance + vender + ops).
- `sales/primer-contacto.md` — 2,912 palabras. Playbook primer contacto end-to-end.
- `sales/objections-broker.md` — 4,857 palabras. Objeciones + frases prohibidas + red flags.
- `sales/faq-ventas.md` — 3,013 palabras. FAQ top 10 + 10 categorías.
- **Overlap:** la semana 1-2 de `training.md` (producto, MT5) duplica parcialmente `encyclopedia/productos-mt5.md` + `encyclopedia/abc.md`. Semana 3 (compliance) duplica `manual-susana.md` secciones 7-8.
- **Recomendación:** `training.md` debería ser un **plan de estudios** que linkee a los docs existentes, no replicar su contenido. Reducir training.md de 4K a ~1.5K palabras (solo syllabus + ejercicios + examen), con todo el contenido técnico enlazado a `productos-mt5.md`, `abc.md`, `manual-susana.md`, `primer-contacto.md`.
- **Impacto:** -2,500 palabras.
- **Riesgo:** bajo.

---

## Secciones repetidas entre docs (temas transversales)

### Países restringidos

- **Gold source ya existe:** `compliance/screening-sanciones.md` sección 12.5 (línea 666) — explícitamente marcado como "LISTA CONSOLIDADA DE PAISES RESTRINGIDOS (GOLD SOURCE)".
- **Aparece (lista completa con nombres) en:** `manual-susana.md`, `legal/aml-kyc-policy.md`, `legal/terms-conditions.md`, `legal/client-agreement.md`, `legal/trading-restrictions.md`, `legal/affiliate-terms.md`, `legal/risk-disclosure.md`, `legal/bonus-terms.md`, `legal/vault-yield-terms.md`, `legal/terms-of-use.md`, `compliance/onboarding.md`, `partners/playbook-ib.md`, `encyclopedia/regulacion-jurisdicciones.md`, `operations/faq-interno.md`, `marketing/icps-por-mercado.md`. **15 duplicados.**
- **Recomendación:** los docs legales deben mantener la lista completa (exigencia regulatoria de que el cliente vea los países excluidos en cada doc que firma). Los docs internos (operations, encyclopedia, partners, marketing, compliance no-legal) deben linkear al gold source. Candidatos a linkear: faq-interno, icps-por-mercado, regulacion-jurisdicciones, playbook-ib, onboarding.
- **Impacto:** -2,000 palabras (aprox. 150 palabras x 5-10 docs internos).

### Tipos de cuenta Cent/Standard/Raw/Institutional

- **Aparece con detalle (spreads, comisiones, mínimos) en 36 docs.**
- **Gold source candidato:** `encyclopedia/abc.md` (sección "Tipos de cuenta") o mejor `legal/trading-conditions.md` sección 3 (oficial) o `encyclopedia/productos-mt5.md`.
- **Recomendación:** gold = `legal/trading-conditions.md` sección 3 (oficial, versionado). Docs internos linkean. Candidatos a simplificar: `faq-ventas.md`, `faq-interno.md`, `objections-broker.md`, `support/playbook.md` apéndice A, `support/enciclopedia-soporte.md` apéndice A, `marketing/icps-por-mercado.md`, `encyclopedia/abc.md`, `encyclopedia/productos-mt5.md`.
- **Impacto:** -1,500 a -2,500 palabras si se reemplaza tabla completa por tabla resumida + link.

### Licencia L15968/N / Neomaaa Ltd / AOFA / Anjouan

- **Aparece en 76 docs** (casi todos).
- **Gold source:** `legal/terms-conditions.md` encabezado.
- **Recomendación:** mantener el encabezado corto "Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA" en todos los docs legales y público-facing (ya es una línea, no hay desperdicio). Docs internos operativos NO necesitan repetir el párrafo regulatorio largo. Auditar: `manual-susana.md` sección 1 (118 líneas) es el único que necesita el marco regulatorio completo.
- **Impacto:** <500 palabras (es duplicación barata, una línea cada doc).

### Frases prohibidas (compliance)

- **Aparecen listadas con 7-15 items en:** `manual-susana.md` sec.8, `copy-broker.md` sec.7, `objections-broker.md`, `abc.md`, `sales/training.md` semana 3, `partners/playbook-ib.md`, `legal/affiliate-terms.md` sec.6, `legal/disclaimers-communications.md`, `compliance/workflow.md` sec.6, `compliance/workflow-sales-compliance.md` sec.13, `sales/guia-copytrading-mql5.md`.
- **Gold source propuesto:** `manual-susana.md` sección 8 (más exhaustivo). Alternativa: crear `compliance/frases-prohibidas.md` como doc corto (~400 palabras) que sea el único con la tabla maestra.
- **Recomendación:** crear doc corto dedicado, todos los demás linkean. La lista evoluciona (Susana agrega frases nuevas); single source of truth evita que unos docs estén desactualizados vs otros.
- **Impacto:** -1,000 palabras + reducción de riesgo regulatorio (versiones inconsistentes).

### Disclaimer "70-80% retail pierden"

- **Aparece en 25 docs.**
- **Gold source:** `legal/risk-disclosure.md` (doc oficial).
- **Recomendación:** el disclaimer es **obligatorio en materiales public-facing** (marketing, copy, landing). Docs internos (playbook support, faq-interno, executive) no lo necesitan. Auditar: executive/*, encyclopedia/psicologia-trader.md, compliance/* — estos pueden linkear.
- **Impacto:** <500 palabras.

### Framework AML/KYC 3 categorías de riesgo (Bajo/Medio/Alto)

- **Aparece en 11 docs.**
- **Gold source candidato:** `compliance/risk-matrix.md` (creado específicamente para esto, 2,756 palabras).
- **Docs que actualmente duplican la matriz:** `manual-susana.md` sec.3, `compliance/onboarding.md`, `compliance/workflow.md`, `compliance/workflow-sales-compliance.md`, `compliance/proceso-kyc-sumsub.md` sec.3, `legal/aml-kyc-policy.md` sec.3.
- **Recomendación:** `risk-matrix.md` es gold. Los demás linkean con 1-párrafo summary (no replican la tabla completa).
- **Impacto:** -1,500 palabras.

### Métodos de pago

- **Aparece lista completa en 25 docs.**
- **Gold source candidato:** `operations/deposits.md` sección 1 o `operations/psps-explicados.md` sección 8.
- **Recomendación:** deposits.md es gold (incluye tabla con fees, timing, límites). Docs como `faq-ventas`, `faq-interno`, `objections-broker`, `support/playbook`, `sales/primer-contacto` deben linkear con una tabla resumida de 4 filas máximo.
- **Impacto:** -1,000 palabras.

### Emails support@ / compliance@ / legal@

- **Aparece en 21 docs.**
- Es duplicación barata (una línea). Mantener.

### Red flags AML

- **Aparece en 25 docs.**
- **Gold source:** `compliance/ongoing-monitoring-sop.md` + `compliance/edd-triggers.md`.
- **Recomendación:** estos dos son los docs formales de red flags. Otros docs (support, operations, sales) deben linkear, no replicar.
- **Impacto:** -800 palabras.

---

## FAQs repetidas

"¿Qué es KYC?", "¿Cómo deposito?", "¿Qué leverage?", "¿Por qué no USA?" aparecen respondidas en:
- `operations/faq-interno.md` (gold — 20 categorías, 150+ preguntas)
- `sales/faq-ventas.md` (10 categorías, 60+ preguntas)
- `support/playbook.md` sección 5 (canned responses)
- `support/enciclopedia-soporte.md` sección 13 (problemas frecuentes)
- `compliance/susana-playbook.md` sección 8 (FAQ Susana)

**Overlap faq-ventas ↔ faq-interno:** ~55% preguntas. `faq-interno` es superset.

**Recomendación:** `faq-interno.md` es el gold. `faq-ventas.md` debe ser un subset con solo las 10 preguntas de objeción comercial no técnicas (ya lo es parcialmente en sección 10). Reducir faq-ventas de 3K a ~1.5K palabras eliminando categorías 3-9 (cubiertas en faq-interno).

**Impacto:** -1,500 palabras.

---

## Docs genéricos / stubs sin sustancia NEOMAAA

- `legal/trading-conditions.md` — 1,083 palabras. Repite `terms-conditions.md`. **Candidato a absorber.**
- `legal/trading-restrictions.md` — 1,269 palabras. Repite países restringidos + secciones de `terms-conditions.md`. **Candidato a absorber.**
- `legal/terms-of-use.md` — 1,039 palabras. Limítrofe: uso del website es distinto de uso del servicio, puede justificar doc separado.
- `legal/disclaimers-communications.md` — 1,310 palabras. Mezcla disclaimer público (1 párrafo) + política interna de comunicación (lo resto). El contenido interno no debería ser un "legal" público.
- `encyclopedia/abc.md` — 2,649 palabras. Duplica glosario-trilingue. **Candidato a reducir drásticamente.**
- `launch/checklist.md` — 873 palabras. Absorbido por `go-live-runbook.md`. **Candidato a eliminar.**

---

## Docs executive extensos — overlap interno

Los 8 docs executive = **39K palabras** (12% del portal).

| Doc | Palabras | Overlap con... |
|---|---|---|
| `panorama-ejecutivo.md` | 3,434 | 25% con `unit-economics-broker.md` (secciones "flujo del dinero" y "pilares operativos") |
| `unit-economics-broker.md` | 5,063 | Standalone — único. |
| `wallet-structure-neomaaa.md` | 4,795 | 40% con `treasury-management.md` (los 5 wallets) |
| `treasury-management.md` | 4,060 | 40% con `wallet-structure-neomaaa.md` |
| `financial-controls.md` | 4,658 | 20% con `risk-management-owner.md` (daily KPIs, red flags) y `compliance-calendar.md` (rutinas diarias/semanales) |
| `risk-management-owner.md` | 7,005 | 15% con `operations/manual-crisis.md` (crisis playbook) |
| `escalamiento-y-crecimiento.md` | 5,290 | Standalone — único. |
| `liquidity-providers-b2b.md` | 5,877 | Standalone — único. |

**Recomendaciones:**

1. **Fusionar `wallet-structure-neomaaa.md` + `treasury-management.md`**: el primero es el "caso NEOMAAA", el segundo es el framework genérico. Un solo doc de 6,000 palabras con framework + aplicación NEOMAAA es más útil. **-2,500 a -3,000 palabras.**
2. **Mantener separado `panorama-ejecutivo.md`** (overview didáctico) y `unit-economics-broker.md` (profundidad financiera). La redundancia es sana: uno sirve de onboarding ejecutivo.
3. **Cruzar `financial-controls.md` daily routine con `compliance-calendar.md` daily routine**: decidir cuál es gold. Propongo `financial-controls.md` = gold ejecutivo; `compliance-calendar.md` = gold operativo compliance. Linkear bidireccional, no duplicar.

**Impacto total executive:** -2,500 a -3,500 palabras.

---

## Canonical sources — propuesta de gold por tema

| Tema | Gold source propuesto | Docs que sólo deberían linkear |
|---|---|---|
| Países restringidos | `compliance/screening-sanciones.md` sec. 12.5 (ya marcado como gold) | faq-interno, icps-por-mercado, regulacion-jurisdicciones, playbook-ib, onboarding compliance, training |
| Tipos de cuenta | `legal/trading-conditions.md` sec. 3 (oficial) | faq-ventas, faq-interno, objections-broker, support/playbook apéndice A, enciclopedia-soporte apéndice A, icps-por-mercado, abc, productos-mt5 |
| Frases prohibidas | Nuevo doc `compliance/frases-prohibidas.md` (~400 palabras) | manual-susana, copy-broker, objections-broker, abc, training, playbook-ib, workflow-sales-compliance, guia-copytrading |
| Matriz riesgo AML (3 categorías) | `compliance/risk-matrix.md` | manual-susana, onboarding, workflow, workflow-sales-compliance, proceso-kyc-sumsub, aml-kyc-policy |
| Red flags AML | `compliance/ongoing-monitoring-sop.md` + `edd-triggers.md` | manual-susana, sar-reporting, susana-playbook, workflow-sales-compliance, support/gestion-tickets, operations/manual-crisis, compliance-calendar, partners/guia-operativa |
| Entidad/Licencia (1 línea) | `legal/terms-conditions.md` (header oficial) | todos los docs legales y público-facing (mantener línea). Internos operativos NO necesitan. |
| Métodos de pago | `operations/deposits.md` sec. 1 | faq-ventas, faq-interno, objections-broker, support/playbook, primer-contacto |
| 70-80% retail disclaimer | `legal/risk-disclosure.md` | copy-broker (sí), public landing (sí). Internos (executive, compliance, psicologia-trader) linkean. |
| Frase entidad completa (párrafo regulatorio) | `compliance/manual-susana.md` sec. 1 | todos los demás linkean |
| Tipos de ordenes / ejecución | `legal/order-execution-policy.md` | faq-ventas, enciclopedia-soporte, training |
| Vault Yield (producto) | `encyclopedia/vault-yield-system.md` | faq-ventas, faq-interno, copy-broker |
| Glosario trilingüe | `encyclopedia/glosario-trilingue.md` | abc absorbe o se reduce |
| IBs / Partners operativo | `partners/playbook-ib.md` | programa-completo absorbe |
| Competidores | `marketing/competidores-deep-dive.md` | competidores-broker absorbe |

---

## Duplicación NECESARIA (no tocar)

| Caso | Por qué mantener |
|---|---|
| `support/manejo-quejas.md` vs `legal/complaint-handling.md` | Audiencias distintas (interno vs público/regulatorio) |
| `encyclopedia/vault-yield-system.md` vs `legal/vault-yield-terms.md` | Audiencias distintas (equipo vs cliente) |
| `operations/psps-explicados.md` vs `operations/deposits.md` | Uno es conceptual (formación), otro es proceso (ops diaria) |
| `sales/faq-ventas.md` + `operations/faq-interno.md` + `support/playbook.md` canned responses | Aunque overlap 40-50%, cada audiencia necesita su angle. Adelgazar, no fusionar. |
| `hiring/support-es.md` + `hiring/support-en.md` | Idioma target distinto (LATAM/Europa-Asia) |
| `encyclopedia/productos-mt5.md` vs partes de `support/enciclopedia-soporte.md` sección 5 | Primero es guía técnica del equipo, segundo es respuestas para cliente |
| `legal/terms-conditions.md` encabezado (Neomaaa Ltd + licencia) repetido en todos los legales | Es requerido jurídicamente que cada doc firmado tenga la identidad de la contraparte |
| Lista de países completa en cada doc legal público (aml-kyc-policy, terms-conditions, client-agreement, affiliate-terms, risk-disclosure) | Requerimiento regulatorio: cliente debe ver la restricción en cada doc que firma |

---

## Recomendaciones priorizadas

### Alta prioridad / bajo riesgo (Fase 1 — 2-3h de trabajo)

1. **Eliminar `launch/checklist.md`** (absorbido por `go-live-runbook.md`). Actualizar `_sidebar.md`. **-900 palabras.**
2. **Fusionar `marketing/competidores-broker.md` en `competidores-deep-dive.md`.** Renombrar a `competidores.md`. **-2,500 palabras.**
3. **Convertir `encyclopedia/abc.md` en doc corto** (solo frases prohibidas + números clave, ~600 palabras) o eliminar. **-2,000 palabras.**
4. **Eliminar `partners/programa-completo.md`** o reducir a 500 palabras (tabla de los 3 programas). El gold operativo es `playbook-ib.md`. **-1,700 palabras.**
5. **Reducir FAQ ventas** (categorías 3-9 ya están en faq-interno, dejar solo cat 1, 10). **-1,500 palabras.**
6. **Crear `compliance/frases-prohibidas.md`** (~400 palabras) como single source. Reemplazar las 11 duplicaciones por link. **-1,000 palabras.**

**Subtotal Fase 1: -9,600 palabras, ~-3% del portal.**

### Media prioridad / riesgo medio (Fase 2 — 4-6h)

7. **Fusionar `wallet-structure-neomaaa.md` + `treasury-management.md`.** **-2,500 palabras.**
8. **Fusionar `compliance/workflow.md` + `workflow-sales-compliance.md`.** Mover plan capacitación a onboarding-5-dias. **-3,500 palabras.**
9. **Reducir `manual-susana.md`** de 8.8K a ~1.5K palabras (índice + secciones únicas). **-6,500 palabras.**
10. **Adelgazar `sales/training.md`** (syllabus + links, no replicar contenido). **-2,500 palabras.**
11. **Limpiar stubs legales:** absorber `trading-conditions.md` y `trading-restrictions.md` en `terms-conditions.md`. Absorber parte interna de `disclaimers-communications.md` en `manual-susana.md`. **-3,000 palabras.**
12. **Reestructurar `support/playbook.md` vs `enciclopedia-soporte.md`** (proceso vs conocimiento, quitar overlap). **-4,500 palabras.**
13. **Aplicar canonical sources** (Fase 3 efectivamente): reemplazar tablas completas por tabla resumida + link en docs listados. **-5,000 palabras estimadas.**

**Subtotal Fase 2: -27,500 palabras, ~-8% del portal.**

### Documentar como "mantener tal cual"

- Los 8 docs executive core (salvo fusión treasury+wallet)
- Los 4 docs legales únicos (bonus-terms, cookies-policy, conflicts-of-interest, privacy-policy, risk-disclosure, order-execution-policy, refund-policy, affiliate-terms, aml-kyc-policy, client-agreement, terms-conditions, terms-of-use, complaint-handling, vault-yield-terms)
- Framework Susana (risk-matrix, edd-triggers, pep-sanctions-sop, sar-reporting, compliance-calendar, ongoing-monitoring-sop, susana-playbook) — son SOPs operativos diferenciados, aunque overlap con manual-susana
- Hiring (6 docs) — cada job description es único
- Encyclopedia (glosario-trilingue, noticias-impacto, formacion-precio, psicologia-trader, regulacion-jurisdicciones, productos-mt5, vault-yield-system, knowledge-base-api) — formación
- Marketing (icps-por-mercado, retencion-broker, funnel-broker, copy-broker) — cada uno es un ángulo operativo único

---

## Plan de acción (si Diego aprueba)

**Fase 1 (2-3h):** items 1-6. Riesgo bajo, -9.6K palabras, impacto inmediato.

**Fase 2 (4-6h):** items 7-13. Requiere validación con Susana y equipo support. -27.5K palabras.

**Fase 3 (ongoing):** disciplina editorial.
- Regla de sidebar: todo doc nuevo debe declarar qué **no cubre** (linkear al gold source).
- Agregar header a cada gold source: `> **GOLD SOURCE.** Esta es la fuente canónica de [tema]. Otros docs deben linkear aquí.`
- Checklist PR: antes de merge, preguntar "¿este contenido ya existe en un gold source?"
- Revisión trimestral: Claude audita nuevas duplicaciones.

**Reducción total potencial ejecutando Fase 1 + 2:** ~37K palabras (~11% del portal). Portal queda en ~289K palabras, 80-82 docs.

---

## Resumen ejecutivo final (200 palabras)

**El portal tiene 326K palabras en 89 docs. 11% es reducible sin pérdida informativa.**

**Top 5 consolidaciones obvias (Fase 1):**
1. `launch/checklist.md` → eliminar, ya está en go-live-runbook (-900 palabras).
2. `marketing/competidores-broker.md` + `competidores-deep-dive.md` → fusionar (-2.5K).
3. `encyclopedia/abc.md` → reducir o eliminar, duplica glosario-trilingue (-2K).
4. `partners/programa-completo.md` → eliminar, playbook-ib es gold (-1.7K).
5. `sales/faq-ventas.md` → adelgazar, faq-interno es superset (-1.5K).

**Fase 1 completa:** -9.6K palabras, 2-3h de trabajo, riesgo bajo.

**Fase 2 mayor (4-6h):** reducir `manual-susana.md` drásticamente (ya está todo en el framework Susana de 7 docs nuevos), fusionar treasury+wallet, consolidar stubs legales, limpiar support playbook vs enciclopedia. **-27.5K palabras.**

**Canonical sources:** ya existe un gold source marcado para países restringidos (`screening-sanciones.md` sec. 12.5). Replicar el patrón para 8 temas transversales (tipos cuenta, frases prohibidas, matriz riesgo, métodos pago, red flags AML, entidad/licencia, disclaimer retail, tipos de órdenes) reduce duplicación sistémica.

**Decisión para Diego:** aprobar **Fase 1** (bajo riesgo, impacto rápido) y **reducción de manual-susana** en Fase 2 (el ahorro más grande, requiere 30 min de chequeo con Susana antes). El resto puede esperar.
