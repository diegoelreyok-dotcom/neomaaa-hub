# CONSOLIDACIÓN TRANSVERSAL — Gold Sources

**Fecha:** 17 de abril 2026
**Alcance:** 4 temas transversales duplicados en 40+ docs → gold sources dedicados + links

---

## Gold Sources Establecidos

| Tema | Gold Source | Status |
|------|-------------|--------|
| **Frases prohibidas + aprobadas + disclaimers** | `compliance/frases-prohibidas.md` | **NUEVO** (creado) |
| **Países restringidos** | `compliance/screening-sanciones.md` sección 12.5 | Existente, reforzado |
| **Tipos de cuenta (Cent/Standard/Raw/Institutional)** | `encyclopedia/productos-mt5.md` sección "Tipos de cuenta" | **NUEVO** (agregada sección) |
| **Framework AML 3 categorías (LOW/MEDIUM/HIGH)** | `compliance/risk-matrix.md` | Existente |

Agregado a `src/lib/sections.ts`: nuevo doc `frases-prohibidas` bajo compliance.

---

## TAREA D1 — `compliance/frases-prohibidas.md` (NUEVO)

**Acciones:**
- Creado doc dedicado con 28 frases prohibidas + 14 aprobadas (texto exacto) + 5 disclaimers oficiales + regla de aplicación.
- Agregado a `sections.ts` como entrada compliance.
- Actualizado `manual-susana.md`: sección 2/3/4 colapsadas en una sola sección de 15 líneas con link al gold source. Renumerado (secciones 5/6/7 → 3/4/5).

**Palabras:** `frases-prohibidas.md` = 2,191. `manual-susana.md` reducido de ~2,200 → 1,171 (-1,029).

---

## TAREA D2 — Países restringidos → gold source

**Docs modificados:**
- `compliance/onboarding.md` — lista larga (USA/Canada/EEA...) reemplazada por callout WARNING + link.
- `compliance/manual-susana.md` — ya no tiene lista (removida en D1).
- `partners/playbook-ib.md` — callout DANGER actualizado + link; lista secundaria en Anti-ICP reemplazada por link.
- `encyclopedia/regulacion-jurisdicciones.md` — sección "Países que NO podemos aceptar" reducida de 25 líneas a callout WARNING + 3 bullets resumen.
- `operations/faq-interno.md` — listas regulatorias + sanciones + alto riesgo reemplazadas por callout WARNING + link.
- `marketing/icps-por-mercado.md` — callout DANGER inicial + Anti-ICP de países reemplazados por callout WARNING + link.

**Criterio respetado:** docs legales (`legal/*`) NO modificados — mantienen lista completa por exigencia regulatoria.

**Palabras reducidas aprox:** -1,400 (listas largas reemplazadas por callout de 2-3 líneas).

---

## TAREA D3 — Tipos de cuenta → gold source

**Gold source creado:** sección "Tipos de cuenta" en `encyclopedia/productos-mt5.md` con tabla oficial (4 cuentas × depósito/spread/comisión/leverage/perfil), diferencia Standard vs Raw, nota Cent (lotes en centavos), política de cambio entre tipos.

**Docs modificados:**
- `sales/faq-ventas.md` — P1 "Qué tipos de cuenta" reemplazado por resumen 1-línea + link.
- `sales/objections-broker.md` — agregado bloque INFO con gold sources al inicio; mentions contextuales intactos (correctas).
- `operations/faq-interno.md` — sección 2.1 tabla completa reemplazada por resumen + link (valores conflictivos eliminados). 7.2 comisiones actualizada a $3 (antes $3.5 — inconsistente con gold).
- `encyclopedia/abc.md` — entrada "Account Types" tabla reemplazada por resumen + link.
- `support/enciclopedia-soporte.md` — Apéndice A "Resumen por tipo de cuenta" reducido: removidos campos duplicados (depósito, spreads, comisión, leverage, ideal-para). Mantenidos solo **parámetros específicos de soporte** (margin call, stop out, Vault, VPS, soporte prioritario, islámica, moneda base).
- `support/playbook.md` — CR-17 template: valores de spread y comisión corregidos para alinear con gold source ($3/lote/lado, Raw 1:500).

**NO modificado:** mentions contextuales tipo "cliente Raw puede...", "ofrecele la Cent de $5" — se mantienen.

**Palabras reducidas aprox:** -900.

---

## TAREA D4 — Framework AML → risk-matrix

**Docs modificados:**
- `compliance/proceso-kyc-sumsub.md` — sección 3 (CATEGORIAS DE RIESGO DEL CLIENTE) reducida drásticamente. Antes: 3.1/3.2/3.3/3.4 con definiciones completas de LOW/MEDIUM/HIGH + tabla de 12 filas (≈80 líneas). Ahora: 1 bloque INFO + 3 párrafos cortos por categoría (qué hace Sumsub en cada una) + tabla resumen 3 filas. Links a risk-matrix y edd-triggers.
- `compliance/manual-susana.md` — ya lista a risk-matrix en su índice del framework.
- `compliance/onboarding.md` — NO tenía framework AML, sin cambios.
- `compliance/workflow.md` — usa terminología GREEN/YELLOW/RED (estados Sumsub) pero no duplica LOW/MEDIUM/HIGH. Sin cambios.
- `legal/aml-kyc-policy.md` — **NO MODIFICADO** (doc legal; ya linkea correctamente al risk-matrix y mantiene definiciones necesarias para auditores bajo exigencia regulatoria).

**Palabras reducidas aprox:** -700.

---

## TAREA D5 — `sales/training.md` → syllabus

**Antes:** 3,993 palabras. Contenido técnico duplicado: Semana 1-2 repetía productos-mt5/abc, Semana 3 replicaba la tabla de frases prohibidas de manual-susana, Semana 4 traía las 15 objeciones completas de objections-broker.

**Ahora:** 1,606 palabras. Estructura:
- Intro (por qué transición propfirm → broker).
- 6 secciones de semana con: objetivo, lecturas obligatorias (links a gold sources), temas por día (titulares), ejercicios prácticos explícitos, formato/aprobación del examen.
- Materiales necesarios.
- Cierre con certificación.

**Reducción:** 3,993 → 1,606 = **-2,387 palabras** (-60%).

**Contenido técnico movido a:**
- Semana 1-2 (producto/MT5) → `encyclopedia/productos-mt5`, `encyclopedia/abc`, `support/enciclopedia-soporte`
- Semana 3 (compliance) → `compliance/manual-susana`, `compliance/frases-prohibidas` (NUEVO), `compliance/screening-sanciones`, `compliance/risk-matrix`
- Semana 4 (ventas) → `sales/objections-broker`, `sales/faq-ventas`, `sales/primer-contacto`, `sales/plan-contacto`
- Semana 5 (ops) → `operations/faq-interno`, `compliance/onboarding`

---

## Totales

| Métrica | Valor |
|---------|-------|
| **Docs modificados** | 13 |
| **Docs creados** | 1 (frases-prohibidas) |
| **Entradas `sections.ts` agregadas** | 1 |
| **Palabras reducidas (neto)** | ~-5,400 (training -2,400, consolidaciones transversales -3,000) |
| **Palabras agregadas (gold sources nuevos)** | +2,500 (frases-prohibidas 2,191 + sección tipos de cuenta en productos-mt5 ~250) |
| **Neto palabras portal** | ≈-2,900 |

## Verificación

- `npx tsc --noEmit` → pasa (sin output, exit 0)
- `npx next build` → pasa (build completo exitoso)

## Riesgos detectados

1. **Disparidades numéricas en tipos de cuenta:** antes de la consolidación había 3 versiones conflictivas de la tabla (productos-mt5 no la tenía, abc decía $3/lado Raw / 1:1000 todos, faq-interno decía $3.5/lado Raw / leverages distintos por cuenta, enciclopedia-soporte decía $3/lado Raw / 1:200). Ahora todas linkean al gold source (productos-mt5: Raw 1:500 + $3/lado). **Si Pepe confirma otros valores, ajustar SOLO en productos-mt5 y el resto se actualiza automáticamente.**

2. **Manual-susana quedó muy liviano (1,171 palabras).** Todavía cumple su rol de índice + principios + A-Book público/confidencial + canales + escalamiento. Si en auditoría se considera insuficiente, mergear todo en frases-prohibidas + risk-matrix + otros docs del framework y eliminar manual-susana. Por ahora se mantiene como entry point histórico.

3. **Enciclopedia-soporte Apéndice A:** al remover duplicación quedaron solo parámetros específicos de soporte (margin call, stop out, Vault, VPS, islámica). Validar con Pepe que esos valores son correctos (no son parte del gold source de productos-mt5).

4. **Support/playbook.md CR-17 template cliente-facing:** se corrigió inconsistencia de comisión Raw ($3.5 → $3). Confirmar con Susana antes de usar en Intercom.

5. **legal/aml-kyc-policy.md NO tocado** (doc legal). Mantiene definiciones LOW/MEDIUM/HIGH por exigencia regulatoria. Si auditor externo pide coherencia estricta con risk-matrix, revisar en futuro.

6. **Docs legales con listas de países NO tocados** (decisión explícita del brief). Seguirán teniendo la lista completa expandida (USA/Canada/EEA/UK/Australia/Cuba/Iraq/Myanmar/NK/Sudan + sancionados) en cada T&C público.

---

## Próximos pasos sugeridos (fuera de scope de esta pasada)

- Traducir los 13 docs modificados + `frases-prohibidas.md` a RU (política proyecto: ES primero, RU al final en una pasada).
- Actualizar `_sidebar.md` de RU con entrada `frases-prohibidas`.
- Auditoría de consistencia post-consolidación: correr una nueva pasada de Grep sobre "Cent.*Standard.*Raw" y "Estados Unidos|USA|EEA" para verificar que no queden duplicados grandes.
- Considerar si vale extraer "disclaimers oficiales" como un 5to gold source dedicado (actualmente subset de frases-prohibidas).

---

*Generado 2026-04-17 — post-consolidación transversal*
