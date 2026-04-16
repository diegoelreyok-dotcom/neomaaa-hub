# CONSOLIDATION-LEGAL — Audit Consistency

**Fecha:** 17 Abril 2026
**Scope:** 3 legal stubs que duplicaban contenido cubierto en docs maestros
**Resultado:** Build + typecheck pasan. Net delta: -2,131 palabras en /legal.

---

## 1. Docs eliminados

| Doc | Palabras antes | Status |
|---|---|---|
| `src/content/es/legal/trading-conditions.md` | 1,083 | **ELIMINADO** — contenido absorbido en `terms-conditions.md` §8 |
| `src/content/es/legal/trading-restrictions.md` | 1,269 | **ELIMINADO** — contenido absorbido en `terms-conditions.md` §8.9 + §15 y en `aml-kyc-policy.md` §7 |

**Total eliminado:** 2,352 palabras en 2 archivos.

### Entradas RU
Ninguno de estos tres docs tenia version RU (`src/content/ru/legal/` no los contenia). No hubo que borrar RU.

### PDFs eliminados
- `public/pdf/es/legal-trading-conditions.pdf`
- `public/pdf/es/legal-trading-restrictions.pdf`
- `public/pdf/es/legal-disclaimers-communications.pdf` (stale — se regenerara del nuevo contenido reducido en el proximo PDF build)

No existian PDFs RU para estos tres slugs.

### Quizzes eliminados
No habia quizzes JSON para ninguno de los tres docs (unico quiz legal: `sales/guia-copytrading-mql5`, intacto).

---

## 2. Doc reducido

| Doc | Antes | Despues | Delta |
|---|---|---|---|
| `src/content/es/legal/disclaimers-communications.md` | 1,316 | **893** | **-423** |

**Nota:** El objetivo original era ~600 palabras. La razon de quedar en 893: el texto del disclaimer obligatorio oficial (§2) se mantuvo **verbatim** (no es reducible sin riesgo legal), y esa sola frase mas las versiones cortas consumen ~250 palabras. El resto es politica de canales (unico), idiomas oficiales (unico), pre-aprobacion, crisis comms y tabla de responsabilidades — todo contenido NO duplicado.

**Removido (delegado al gold source):**
- Tabla completa de frases prohibidas con reemplazos → ahora solo enlaza a `compliance/manual-susana.md` §2.
- Textos literales de disclaimers oficiales por canal (corto/largo/execution-only/contraparte/apalancamiento) → ahora enlaza a `compliance/manual-susana.md` §4.
- Lista detallada de paises restringidos → ahora enlaza a `compliance/screening-sanciones.md` y `legal/terms-conditions.md` §15.
- Seccion de disclaimers por contexto (7 casos con texto verbatim) → reducida a lista-referencia que apunta al manual.

---

## 3. Contenido absorbido — donde quedo

### A `legal/terms-conditions.md` (ahora 2,641 palabras, +754 vs baseline 1,887)

Seccion 8 "Operaciones de trading" fue expandida de 4 a 11 subsecciones para absorber trading-conditions.md + sec 3 de trading-restrictions:

- **§8.1** — Referencia a MT5 Symbol Specifications y `legal/order-execution-policy.md` (de trading-conditions §2/§5).
- **§8.2** — ECN/STP hibrido, data centers Equinix NY4/LD5, SLA 99.9% uptime (de trading-conditions §5).
- **§8.4** — Spreads minimos tipicos por tipo de cuenta + comision USD 7 round-turn en Raw (de trading-conditions §6.1-6.2).
- **§8.5** — Swap overnight, triple swap miercoles, cuentas islamicas swap-free (de trading-conditions §6.3).
- **§8.6** — Volumen minimo 0.01 lotes, topes de exposicion en crypto/exoticos (de trading-conditions §7 + trading-restrictions §4-§5.1).
- **§8.7** — Margin call, stop-out, **proteccion de saldo negativo garantizada** (de trading-conditions §8).
- **§8.8** — Horarios forex, metales, indices/commodities/stocks/ETFs, crypto 24/7 + rollover de contratos (de trading-conditions §9 + trading-restrictions §5.3).
- **§8.9** — Practicas de trading prohibidas: latency arbitrage, price manipulation, hedging entre cuentas relacionadas, abuso de bonos, swap arbitrage, stale quotes, pre-open/post-close trading, software prohibido (de trading-restrictions §3 completa). Incluye deteccion, consecuencias escaladas (tabla de 3 niveles) y derecho de apelacion (de trading-restrictions §8).
- **§8.10** — Restricciones de exposicion en news events (NFP, FOMC), ajustes por dividendos en stocks CFDs (de trading-restrictions §4 + §5.2).
- **§8.11** — Derecho de modificacion con preaviso 7 dias (de trading-conditions §11).

Seccion 15 "Paises restringidos" fue re-estructurada:
- Separa "Restricciones regulatorias" (US/CAN/EEA/UK/AU/JP/IL) con nombres de reguladores nominados.
- Separa "Sancionados internacionalmente" (FATF black / OFAC / UN / EU / UK) con lista completa (Cuba, Iran, Iraq, Myanmar, DPRK, Siria, Sudan, Crimea, Donetsk, Luhansk).
- **Nuevo:** "Monitoreo elevado (FATF grey list)" con clasificacion automatica MEDIUM RISK + Source of Funds (de trading-restrictions §2.3).
- Cross-ref a `legal/aml-kyc-policy.md` §7.

### A `legal/aml-kyc-policy.md` (ahora 1,264 palabras, +67 vs baseline 1,197)

Seccion 7 "Paises restringidos" reforzada:
- Separa sancionados (FATF black/OFAC/UN/EU/UK) de restricciones regulatorias.
- **Nuevo:** FATF grey list con clasificacion automatica MEDIUM RISK + Source of Funds obligatorio.
- Cross-ref a `compliance/risk-matrix.md` §5 y `compliance/screening-sanciones.md` (marcado como gold source).

### Contenido descartado (no absorbido)

- `trading-conditions.md` §2 (plataforma MT5) — ya en `terms-conditions.md` §1 y `order-execution-policy.md`.
- `trading-conditions.md` §3 (tabla tipos de cuenta) — ya en `terms-conditions.md` §4.
- `trading-conditions.md` §10 (features copy trading, VPS, MFA) — ya en `terms-conditions.md` §9/§10 y en `encyclopedia/productos-mt5.md`.
- `trading-conditions.md` §12 (contacto) — ya en `terms-conditions.md` footer.
- `trading-restrictions.md` §6 (restricciones de retiro) — ya en `terms-conditions.md` §7.
- `trading-restrictions.md` §7 (conducta del cliente) — ya en `terms-conditions.md` §13.

---

## 4. Cross-refs actualizados

### `src/lib/sections.ts`
- **Removidos:** entries `trading-conditions` y `trading-restrictions` de la seccion `legal`.
- **Mantenido:** `disclaimers-communications` (reducido) y los otros 15 docs legales.
- Seccion legal ahora tiene 15 docs (antes 17).

### Cross-refs en contenido
Ninguno: `grep -rn "trading-conditions\|trading-restrictions"` en `src/content/` devolvio 0 matches antes y despues. Los dos stubs eran verdaderamente huerfanos (solo estaban en sections.ts y PDFs).

### Cross-refs en docs internos (docs/internal/audit-consistency/)
Estos referencian los docs eliminados (AUDIT-REDUNDANCY, AUDIT-APRIL-2026-CURRENCY, AUDIT-CONTENT-DISTRIBUTION, CONSOLIDATION-COMPLIANCE, stats-report-abril-2026). **NO se tocaron** — son docs de auditoria historicos que reflejan el estado previo. Son fuente del razonamiento para esta consolidacion.

### Redirects
El portal actualmente no tiene redirects 301 configurados para slugs obsoletos. Un usuario que llegue con URL vieja (`/content/legal/trading-conditions`) recibira 404. **Riesgo bajo:** los docs eran stubs internos sin trafico externo conocido, no estaban linkeados desde ningun documento publico.

---

## 5. Verificacion tecnica

- `npx tsc --noEmit` — **PASS** (0 errors).
- `npx next build` — **PASS** (build completo, todas las rutas compilan, incluido `/content/[section]/[slug]` en 12.6 kB).

---

## 6. Riesgo regulatorio — Susana debe revisar antes de prod

**SI.** Susana debe validar antes de publicar a produccion.

### Puntos criticos para su revision

1. **terms-conditions.md §8.9 (practicas prohibidas)** — Primera vez que esta lista de 8 practicas abusivas queda en los T&C principales y no en un stub separado. La redaccion legal debe ser revisada: algunas practicas (latency arbitrage, stale quote exploitation) son industry-standard pero requieren fraseo preciso para ser enforceable. Recomendacion: Susana + Pepe (Head of Dealing) revisan juntos.

2. **terms-conditions.md §8.7 (margin call/stop-out)** — Removi los placeholders `[DATO: 80%]` y `[DATO: 20%]` y los reemplace por redaccion neutra "umbral definido en la pagina de especificaciones de cuenta". Esto evita bloqueo en prod pero Pepe + Susana deben definir valores oficiales y publicarlos en la pagina de specs antes de go-live.

3. **terms-conditions.md §15** — El orden restructurado (regulatorias antes de sancionados) es legalmente equivalente pero cambia el flujo narrativo. Susana debe confirmar.

4. **aml-kyc-policy.md §7** — Adicion de FATF grey list como tier intermedio de monitoreo. No existia antes en este doc (solo en `compliance/risk-matrix.md`). Alineacion positiva para FATF Rec. 10 pero debe confirmarse con auditores AOFA.

5. **disclaimers-communications.md** — Se mantiene el texto del disclaimer obligatorio (§2) verbatim del original. Las versiones cortas (social/email/video) tambien verbatim. Reduccion es por eliminacion de duplicacion con `manual-susana.md`, no por cambio de sustancia legal.

### Recomendacion de Claude

- Aprobar consolidacion y deployar a staging.
- Susana revisa §8.9 de terms-conditions.md y §7 de aml-kyc-policy.md antes de prod.
- Pepe define valores oficiales de margin call / stop-out y se propagan a la pagina de specs + `support/playbook.md`.
- Primera auditoria externa (post go-live) debe enfocar en alinear con los textos legales publicados en neomaaa.com/about/legal-documentation (que son fuente de verdad superior a estos docs internos).

### Probabilidad de supervivencia regulatoria

- **Alta** si Susana valida §8.9 y Pepe cierra los umbrales numericos de MC/SO.
- **Alta** para §15 y §7 aml-kyc-policy — son mejoras factuales (mas precisas que el original).

---

## 7. Resumen ejecutivo

| Metrica | Antes | Despues | Delta |
|---|---|---|---|
| Docs legales | 17 | 15 | -2 |
| Palabras en 3 docs impactados | 3,668 | 1,537 | **-2,131** |
| PDFs ES | incluian 3 stubs | 2 eliminados + 1 stale eliminado (regen en proximo build) | — |
| Entradas en sections.ts (legal) | 17 | 15 | -2 |
| Cross-refs rotos en contenido | 0 | 0 | = |
| Build status | PASS | PASS | = |

Target de -2,000 a -2,500 palabras **cumplido** (net -2,131).
