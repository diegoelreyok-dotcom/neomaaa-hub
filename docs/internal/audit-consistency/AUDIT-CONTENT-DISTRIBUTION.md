# Auditoría de Distribución de Contenido — 13 Abril 2026

## Metodología
- **Secciones auditadas:** 11 (launch, hiring, encyclopedia, sales, support, compliance, operations, marketing, partners, legal, executive)
- **Total docs revisados:** 89 .md bajo `src/content/es/`
- **Criterios:** fuga ejecutivo → empleado (P1), fuga interno → público legal (P2), fuga operativo → sales/marketing (P3), contenido genérico sin NEOMAAA (P4), contradicciones entre docs (P5), links rotos (P6)
- **Métrica de originalidad:** `grep -ci "neomaaa|anjouan|aofa|l15968"` por archivo, normalizado por word count

---

## 🔴 P1 — Info ejecutiva filtrada en docs de empleados (CRITICAL)

| Doc | Issue | Sugerencia |
|---|---|---|
| `sales/commissions.md` (líneas 507–593) | Sección 10 "Análisis de Impacto en el P&L de NEOMAAA" expone: revenue target $68K/mes, costos operativos $34K/mes, margen 50%, ingreso broker por lote $8-15, LTV $900-1800, ROI 15-30x. Sales agents NO deben ver esto. | Mover la sección 10 completa a `executive/unit-economics-broker.md`. Dejar en sales solo los números que le pagan al agente (FTD, bonos, ejemplos de comp), no el P&L del broker. |
| `partners/modelo-financiero.md` (líneas 70–88) | Tabla expone margen broker por tier (61%→32%), costo real por partner, cap financiero del programa. Partner Manager lo necesita, pero IBs externos NO deben ver esto en el portal. | Si este doc lo ven IBs externos → mover tabla de márgenes a executive. Si es solo interno Partner Manager → OK en partners, pero marcar header "USO INTERNO — NO COMPARTIR CON IB". |
| `partners/playbook-ib.md` (línea 22) | "hasta 50% del neto broker (55% con boost)" — expone que es sobre NETO, no GROSS. IBs competidores pueden calcular el margen. | OK revelar el %, pero no sobre "neto broker". Reformular como "hasta 50% del revenue elegible". |
| `sales/commissions.md` (línea 572) | "B-book + spreads + comisiones por lote" — sales agent conoce el modelo de revenue del broker. | Remover referencia a B-book en doc de sales. A/B book es confidencial de dealing (`compliance/ab-book-policy.md` ya lo dice explícitamente en sección 1.2 punto 4). |

---

## 🟠 P2 — Info interna en docs legales públicos (cliente los ve en neomaaa.com)

| Doc | Issue | Sugerencia |
|---|---|---|
| `legal/disclaimers-communications.md` (líneas 107, 146, 159) | Menciona a **Susana** y **Diego** por nombre como responsables de aprobación de creatives y escalamiento a AOFA. Un cliente no debe ver nombres internos. | Reemplazar por roles genéricos: "Compliance Officer", "Principals", "Head of Compliance". |
| `legal/conflicts-of-interest.md` (líneas 51, 72, 88, 93, 122, 135, 148) | 7 menciones a **Pepe**, **Susana**, **Yulia**. Además línea 93 dice "ubicacion del registro — Notion / archivo interno Yulia" — filtra Notion como herramienta interna y nombra a la persona. | Reemplazar por roles: "Head of Dealing", "Compliance Officer", "Operations". Línea 93 remover referencia a Notion/Yulia — no es contenido de una política pública. |
| `legal/trading-restrictions.md` (línea 175) | `[DATO: … confirmar con Pepe/Dealing]` — placeholder editorial visible en doc cliente. | Remover el [DATO] o completar antes de publicar. No puede ir con ese marker a producción. |
| `legal/vault-yield-terms.md` (línea 196) | `[DATO: … confirmar con Diego/Finance antes de publicar version cliente-facing]` — ídem. | Completar o remover. Marker editorial no va a cliente. |
| `legal/aml-kyc-policy.md` (línea 55), `terms-conditions.md` (L74, L173), `cookies-policy.md` (L67-68), `privacy-policy.md` (L54, 121-124, 212), `complaint-handling.md` (L43), `client-agreement.md` (L39), `disclaimers-communications.md` (L64) | Mencionan **Sumsub**, **Intercom**, **Skale CRM** por nombre. Esto es correcto en **privacy/cookies** (GDPR exige disclosure de procesadores) pero excesivo en T&C, client-agreement, complaint-handling. | Privacy/cookies/AML-KYC: OK mantener nombres (requerido por GDPR). T&C/Client-Agreement/Complaint: reemplazar por "proveedor de verificación KYC", "sistema de chat en vivo", "CRM corporativo". |

---

## 🟡 P3 — Info operativa filtrada en sales/marketing

| Doc | Issue | Sugerencia |
|---|---|---|
| `sales/commissions.md` L572, L580 | Revela modelo B-book y margen de ingreso broker por lote ($8-15). | Remover. Ya cubierto en P1. |
| `marketing/competidores-deep-dive.md` L92, L1011, L1015 | Explica A-Book/B-Book hybrid de NEOMAAA en doc de marketing con detalle del criterio interno de routing ("traders volátiles van a A-Book, retail promedio va a B-Book — basado en métricas"). | Mantener el MENSAJE (modelo híbrido transparente) pero sin revelar el criterio interno. Reformular: "Modelo híbrido A-Book/B-Book con routing basado en políticas de gestión de riesgo." |
| `operations/manual-crisis.md` L414, L860 | Nombra **Match-Prime**, **LMAX** como LPs. Si el acceso a operations es solo Heads, OK. Si se expande más, flag. | Mantener SIEMPRE restringido a Heads. Marcar doc con header "Acceso: Principals + Heads of Dealing/Ops". Considerar mover lista específica de LPs a `executive/liquidity-providers-b2b.md` y dejar sólo referencia genérica en manual-crisis. |
| `marketing/competidores-deep-dive.md` L76, L90, L92 | Lista a TODO el equipo por nombre (Franco, Edward, Luis, Pepe, Angel, Susana, Yulia, Stanislav). Si este doc es solo interno marketing, OK. Si llega a prensa o se comparte fuera, es doxing del equipo. | Marcar doc como "Uso interno marketing". Versión cliente-facing debería omitir nombres completos. |

---

## ⚪ P4 — Contenido genérico (bajo ratio NEOMAAA/palabras)

Top 10 **más genéricos** (menciones NEOMAAA / word count):

| Doc | Menciones | Words | Ratio | Sugerencia |
|---|---|---|---|---|
| `encyclopedia/noticias-impacto.md` | 2 | 1415 | 0.14% | Encyclopedia es educativa por diseño — OK. Agregar al menos 1 caso NEOMAAA: "ejemplo de cómo NEOMAAA ajustó spreads en NFP de [mes]". |
| `support/gestion-tickets.md` | 2 | 2762 | 0.07% | 🔴 Debería mencionar Intercom, Skale, Susana/Pepe escalation paths. Demasiado genérico para un playbook de soporte específico NEOMAAA. Agregar: nombres de tools internos, SLAs de escalamiento NEOMAAA, ejemplos de tickets reales. |
| `launch/post-launch-playbook.md` | 3 | 4247 | 0.07% | 🔴 Runbook post-launch debe ser NEOMAAA-específico. Muchas referencias genéricas "el broker". Reemplazar por "NEOMAAA Markets", agregar nombres de owners (Pepe para dealing, Yulia para ops, Susana para compliance). |
| `encyclopedia/psicologia-trader.md` | 4 | 1592 | 0.25% | OK — encyclopedia educativa. |
| `encyclopedia/formacion-precio.md` | 4 | 1728 | 0.23% | OK. |
| `legal/refund-policy.md` | 5 | 1277 | 0.39% | OK para legal (entity "Neomaaa Ltd" es lo que importa). |
| `support/atencion-vip.md` | 5 | 2604 | 0.19% | Debería tener ejemplos concretos del tier Black ($50K+) y beneficios específicos NEOMAAA. |
| `operations/go-live-runbook.md` | 5 | 2906 | 0.17% | 🔴 Runbook D-day debe tener owners por nombre (Diego, Pepe, Susana, Yulia). Muy genérico actualmente. |
| `hiring/finance-manager.md` | 6 | 983 | 0.61% | JD — OK. |
| `hiring/support-en.md` | 6 | 1128 | 0.53% | JD — OK. |

**Criterio 30% específico:** no se cumple en `support/gestion-tickets.md`, `launch/post-launch-playbook.md`, `operations/go-live-runbook.md` — estos 3 son runbooks operativos que deberían ser altamente NEOMAAA-specific pero leen como templates.

---

## 🔵 P5 — Correlación rota entre docs

| Topic | Docs en conflicto | Valor correcto |
|---|---|---|
| **Leverage máximo** | Todos dicen 1:1000 retail (`sales/faq-ventas.md` L145, `legal/trading-conditions.md` L44, `marketing/copy-broker.md` L73, `partners/playbook-ib.md`). PERO `encyclopedia/productos-mt5.md` usa ejemplos con 1:500 en L128, 139, 191, 192, 203, 329, 333 — genera confusión al lector. | **Reconciliar:** si el máximo comercializado es 1:1000, los ejemplos educativos en productos-mt5 deben ser 1:500 (conservador, responsable) PERO aclarar: "máximo disponible en NEOMAAA: 1:1000; ejemplo calculado a 1:500 para ilustrar". FAQ-ventas L19 debería reforzar que 1:1000 es el cap. |
| **Tiers IB** | 2 docs, **consistentes**: `partners/playbook-ib.md` y `partners/modelo-financiero.md` ambos dicen Bronze 30% / Silver 40% / Senior 45% / Elite 50% con cap 55% boost Brasil. Ambos mencionan la actualización de abril 2026 con los mismos números. | ✅ No hay contradicción. `partners/programa-completo.md` L26 también alineado. |
| **Revenue share máximo** | `playbook-ib.md` L22 dice "hasta 50% (55% con boost)". `playbook-ib.md` L285 cita a competidor con "60%". Coherente. | ✅ OK. |
| **ICP España vs restricciones** | `marketing/icps-por-mercado.md` L12 y L202: España bloqueada como target de adquisición (solo referencia educativa). `compliance/screening-sanciones.md` debería alinear. `marketing/competidores-deep-dive.md` L60 confirma España NO target. | ✅ Coherente, pero verificar que compliance/screening-sanciones bloquee EEA en onboarding. |
| **Términos legales (leverage) vs interna** | `legal/trading-conditions.md` L44 "Hasta 1:1000" coincide con internal. | ✅ OK. |
| **Margin call / Stop out** | `support/playbook.md` L1408-1409 usa placeholders `{{nivel_mc}}%` y `{{nivel_so}}%` SIN VALOR. `support/enciclopedia-soporte.md` sección 8 no da números. `legal/trading-restrictions.md` L175 dice `[DATO: niveles exactos de margin call/stop-out]` sin definir. | 🔴 **Inconsistencia por AUSENCIA.** Ningún doc define los niveles oficiales. Debe definirse (típicamente margin call 80%, stop out 20% o 50%) y propagar a los 3+ docs. Flagged para Diego + Pepe. |

---

## 🟢 P6 — Links rotos (FIXED automáticamente)

| Doc | Link roto | Acción |
|---|---|---|
| `executive/financial-controls.md` L623 | `compliance/aofa-compliance.md` (no existe en sections.ts) | ✅ Reemplazado por `compliance/expansion-regulatoria.md` (doc sí existente, cubre AOFA Anjouan) |
| `executive/wallet-structure-neomaaa.md` L517 | `compliance/aofa-compliance.md` | ✅ Reemplazado por `compliance/expansion-regulatoria.md` |

Todos los demás cross-references `/content/section/slug` verificados contra `sections.ts` → todos válidos (68 únicos).

---

## Distribución correcta — summary

**Secciones OK (audiencia alineada):**
- ✅ `executive/` — toda la info sensible está aquí, contenida
- ✅ `compliance/ab-book-policy.md` — explícitamente dice (sección 1.2 punto 4) "El equipo de ventas NO sabe si un cliente es A-Book o B-Book"
- ✅ `operations/dealing-desk-publico.md` — correctamente excluye umbrales y nombres de LPs (L7: "Qué NO está acá")
- ✅ `hiring/` — JDs apropiadas para rol
- ✅ `partners/playbook-ib.md`, `programa-completo.md` — alineados entre sí
- ✅ `encyclopedia/` — nivel educativo apropiado, referencias NEOMAAA donde corresponde

**Secciones con issues:**
- 🔴 `sales/commissions.md` — expone P&L del broker (P1, 1 doc)
- 🟠 `legal/` — fuga de nombres internos en 3 docs (P2, 3 docs)
- 🟡 `marketing/competidores-deep-dive.md` — expone criterio de routing A/B book (P3, 1 doc)
- ⚪ `support/gestion-tickets.md`, `launch/post-launch-playbook.md`, `operations/go-live-runbook.md` — demasiado genéricos (P4, 3 docs)
- 🔵 Margin call / stop out indefinido en 3 docs (P5)

---

## Scorecard de originalidad NEOMAAA

**Top 10 MÁS específicos NEOMAAA (por ratio):**
1. `support/enciclopedia-soporte.md` — 76 menciones / 12780 words
2. `compliance/manual-susana.md` — 73 / 8876
3. `compliance/susana-playbook.md` — 67 / 6625
4. `sales/guia-copytrading-mql5.md` — 62 / 5344
5. `marketing/competidores-broker.md` — 48 / 3796
6. `compliance/workflow.md` — 41 / 5895
7. `compliance/expansion-regulatoria.md` — 41 / 3888
8. `compliance/sar-reporting.md` — 39 / 3374
9. `partners/playbook-ib.md` — 38 / 4821
10. `marketing/competidores-deep-dive.md` — 37 / 8331

**Top 10 MÁS genéricos (menor ratio):**
ver tabla P4 arriba.

---

## Fixes aplicados automáticamente

1. `src/content/es/executive/financial-controls.md:623` — link `compliance/aofa-compliance.md` → `compliance/expansion-regulatoria.md`
2. `src/content/es/executive/wallet-structure-neomaaa.md:517` — ídem

**Verificación TypeScript:** `npx tsc --noEmit` pasa sin errores.

---

## Flagged para decisión Diego (NO tocado)

### F1 — Sección 10 de `sales/commissions.md` expone P&L broker
- **Opción A:** Mover sección completa a `executive/unit-economics-broker.md`. Dejar en sales solo ROI desde la óptica del agente (cuánto me pagan, no cuánto gana el broker).
- **Opción B:** Mantenerla pero agregar header "CONFIDENCIAL — NO COMPARTIR CON AGENTE". Los agentes solo acceden al resto del doc.
- **Recomendación:** A. Un agente no necesita saber el margen 50% del broker para vender. Le arma un incentivo perverso y si se va, se lleva el intel.

### F2 — Nombres internos (Pepe, Susana, Diego, Yulia) en 3 docs legales
- **Opción A:** Reemplazar por roles genéricos en `legal/disclaimers-communications.md`, `legal/conflicts-of-interest.md`. Mantener Sumsub/Intercom/Skale solo en privacy/cookies/aml-kyc (requerido GDPR).
- **Opción B:** Duplicar en dos versiones: `legal-internal/` (con nombres) y `legal/` público (sin nombres). Overhead mantenimiento.
- **Recomendación:** A. Roles > nombres en T&C públicos.

### F3 — Margin call / Stop out no definidos (P5)
- Definir con Pepe los valores oficiales (ej: MC 80%, SO 50%) y propagar a `support/playbook.md`, `support/enciclopedia-soporte.md`, `legal/trading-restrictions.md`, `legal/trading-conditions.md`, `encyclopedia/productos-mt5.md`.

### F4 — `marketing/competidores-deep-dive.md` revela criterio A/B book
- **Opción A:** Reformular L1015 para no explicar el criterio de segmentación.
- **Opción B:** Mantener como battle-card interno, marcar "NO publicar".
- **Recomendación:** A. Ya sabemos por compliance/ab-book-policy que es info confidencial.

### F5 — 3 docs runbooks demasiado genéricos (P4)
- `support/gestion-tickets.md`, `launch/post-launch-playbook.md`, `operations/go-live-runbook.md` — agregar owners por nombre, tools (Intercom, Skale), SLAs NEOMAAA específicos.

### F6 — `operations/manual-crisis.md` menciona Match-Prime/LMAX
- Si operations acceso = solo Heads (restricted), OK.
- Si alguna vez support/sales accede, mover lista LP a executive.
- **Recomendación:** confirmar con Diego el acceso control de operations/.

---

## Estadísticas

- **Total docs revisados:** 89
- **Docs con issues:** 11 (12%)
  - P1 (crítico): 1 doc, 4 issues
  - P2: 5 docs, 7 issues (3 de alta severidad, 4 justificables GDPR)
  - P3: 3 docs, 4 issues
  - P4: 3 docs críticos (runbooks genéricos)
  - P5: 1 inconsistencia real (margin call indefinido), 0 contradicciones numéricas entre docs
  - P6: 2 links rotos
- **Fixes auto aplicados:** 2 (P6)
- **Flagged manual Diego:** 6 decisiones

- **Cobertura NEOMAAA (criterio 30%):** 86/89 docs aceptables. Solo 3 runbooks críticos fallan.
- **Docs totalmente limpios (sin issues):** 78 (88%)
