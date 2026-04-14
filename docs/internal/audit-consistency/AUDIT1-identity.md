# AUDIT1 — Identidad del Broker

> Auditoría de consistencia de identidad del broker a través de todos los docs del portal ES.
> Fecha: 2026-04-13
> Gold source: `src/content/es/legal/terms-conditions.md`, `src/content/es/legal/client-agreement.md`, `CLAUDE.md`.

---

## Valores autoritativos (gold source)

| Campo | Valor autoritativo | Fuente |
|---|---|---|
| Nombre legal | **Neomaaa Ltd** | legal/terms-conditions.md:16, legal/client-agreement.md:14 |
| Marca comercial | **NEOMAAA Markets** | dashboard.md, hiring/*, marketing/* |
| Número de licencia | **L15968/N** | legal/terms-conditions.md:3, legal/client-agreement.md:3 |
| IBC number | **IBC 15968** | legal/terms-conditions.md:3 |
| Jurisdicción (forma legal) | **Anjouan, Unión de las Comoras** (los docs legales usan "Union de Comoras" sin acentos — mismo significado) | legal/client-agreement.md:14 |
| Regulador | **Anjouan Offshore Finance Authority (AOFA)** | legal/client-agreement.md:14 |
| Plataforma | **MetaTrader 5 (MT5)** — NO MT4 | legal/client-agreement.md:24, 34 |
| Modelo ejecución | **ECN/STP híbrido** | legal/client-agreement.md:82 |
| Instrumentos | **2,000+** | legal/client-agreement.md:35 |
| Métodos de depósito | **120+** | legal/client-agreement.md:36 |
| KYC provider | **Sumsub** | legal/terms-conditions.md:74 |
| CRM | **Skale** | CLAUDE.md |
| Soporte | **Intercom + email + teléfono** | legal/client-agreement.md:39 |
| Pepe experiencia | **20 años** | CLAUDE.md, onboarding-5-dias.md:54 |
| Registrados Funded | **40,000+** | CLAUDE.md |
| Pre-registrados Markets | **~250** | CLAUDE.md |
| Equipo | **16 personas** (12 actuales + 4 vacantes) | CLAUDE.md, finance-manager.md:125 |
| Go-live | **2026** (licencia obtenida 2024) | onboarding-5-dias.md:39 |
| Sede Diego | **Dubai (UAE)** | onboarding-5-dias.md:45, 67 |
| Principals | Diego Loyola (Founder), Angel Ortega (Co-founder), Yulia, Stanislav | onboarding-5-dias.md:44-48 |
| Head of Dealing | **Pepe** (20 años) | CLAUDE.md |
| Compliance Officer | **Susana** | CLAUDE.md |

---

## Inconsistencias encontradas

### 1. Tamaño del equipo (16 vs 18)

| Archivo | Línea | Valor | Correcto? |
|---|---|---|---|
| dashboard.md | 8 | `18` | ❌ — debía ser 16 |
| hiring/roles-broker-completo.md | 14 | `hoy 16 personas` | ✅ OK |
| hiring/finance-manager.md | 125 | `16 personas (12 actuales + 4 vacantes)` | ✅ OK |
| hiring/onboarding-5-dias.md | 39 | `~16 personas` | ✅ OK |
| compliance/mejores-practicas-compliance.md | 331 | `TODO el equipo (18 personas)` | ❌ — otro scope, flaggear |

### 2. Nombre legal — mayúsculas

| Archivo | Línea | Valor | Correcto? |
|---|---|---|---|
| legal/*.md (todos) | header | `Neomaaa Ltd` | ✅ gold |
| encyclopedia/abc.md | 231, 368 | `Neomaaa Ltd` | ✅ OK |
| dashboard.md | 174 (previo) | `Neomaaa Ltd (IBC 15968)` — sin marca comercial | ⚠️ mejorable (ahora actualizado) |
| hiring/onboarding-5-dias.md | 32, 292 | `Neomaaa Ltd (IBC 15968)` | ✅ OK |
| hiring/finance-manager.md, marketing-manager.md, support-es.md, support-en.md | — | `NEOMAAA Markets ... licencia en Anjouan (AOFA)` | ✅ OK (usa marca comercial, licencia correcta) |

**No se encontraron instancias de `NEOMAAA Ltd` en mayúsculas.** Consistente.

### 3. Jurisdicción — con/sin "las"

| Archivo | Línea | Valor |
|---|---|---|
| legal/client-agreement.md | 14, 215 | `Anjouan, Union de Comoras` |
| legal/terms-conditions.md | 16, 237 | `Anjouan, Union de Comoras` |
| legal/*.md (footers) | — | `AOFA, Anjouan, Union de Comoras` |
| compliance/manual-susana.md | 43 | `Anjouan, Union de las Comoras` |
| encyclopedia/regulacion-jurisdicciones.md | 103 | `Anjouan, Unión de las Comoras` |
| hiring/onboarding-5-dias.md | 292 | `Unión de las Comoras` |

**Ambigüedad:** los docs legales usan `Union de Comoras` (sin "las"); docs operativos/educativos usan `Unión de las Comoras` (con "las"). Ambas son usos aceptables en español pero convendría estandarizar. **Recomendación a Diego:** usar `Unión de las Comoras` (forma oficial del país "Unión de las Comoras" / "Comoros") en TODOS los docs, incluyendo legales. Pendiente decisión.

### 4. MT4 mencionado como familiaridad (no como oferta)

| Archivo | Línea | Contexto |
|---|---|---|
| hiring/support-es.md | 60 | "Familiaridad con MetaTrader 4 o MetaTrader 5" (requisito del candidato) |
| hiring/support-en.md | 64 | Idem |

**Evaluación:** estas son referencias a experiencia del candidato, NO se ofrece MT4 como plataforma. Aceptable pero confuso. **Recomendación:** cambiar a "Familiaridad con MetaTrader 5 (MT4 deseable pero no requerido)" para evitar señal de que NEOMAAA ofrece MT4. Fuera de mi scope — flag.

### 5. Teléfono soporte — cargo internacional

| Archivo | Línea | Valor | Nota |
|---|---|---|---|
| operations/go-live-runbook.md | 347 | `+41 44 707 9633` | ⚠️ Prefijo +41 = Suiza. Broker es Anjouan + sede operativa Dubai (UAE, +971). Pendiente confirmación. |

### 6. Tier 4 regulación: "NEOMAAA" vs "NEOMAAA Markets"

| Archivo | Línea | Valor anterior | Acción |
|---|---|---|---|
| encyclopedia/regulacion-jurisdicciones.md | 92 | `AOFA \| Anjouan (Comoras) — **NEOMAAA**` | Actualizado a `Anjouan, Unión de las Comoras — **NEOMAAA Markets**` |

### 7. Dominio web (Markets vs Funded)

Todos los docs del broker usan `neomaaa.com` (y subdominios `account.neomaaa.com`, `mt5.neomaaa.com`, `help.neomaaa.com`, `portal.neomaaa.com`). Consistente. `neomaaafunded.com` no aparece en los docs del broker (correctamente separado).

### 8. Emails de contacto

| Email | Dónde aparece | Consistente? |
|---|---|---|
| `support@neomaaa.com` | operations, partners, sales/guia-copytrading | ✅ |
| `compliance@neomaaa.com` | operations/deposits, compliance/workflow | ✅ |
| `soporte@neomaaa.com` | compliance/workflow-sales-compliance:352, manual-susana:280 | ❌ Debería ser `support@neomaaa.com` (inconsistencia tipográfica — versión española del alias) |
| `susana@neomaaa.com` | compliance/workflow-sales-compliance:486 | ⚠️ Email personal sin confirmar |
| `withdrawals@neomaaa.com` | partners/playbook-ib:495, 502 | ⚠️ Sin confirmar que exista ese alias |
| `partners@neomaaa.com` | partners/playbook-ib | ⚠️ Sin confirmar |

**Recomendación:** consolidar todos los alias a un único formato oficial (español vs inglés). Pendiente Diego.

---

## Cambios aplicados en MI scope (4 archivos)

### `src/content/es/dashboard.md`
- **Línea 8**: `data-value="18"` → `data-value="16"` (team members).
- **Línea 174**: `Neomaaa Ltd (IBC 15968)` → `Neomaaa Ltd (IBC 15968) — marca comercial: NEOMAAA Markets` (distinguir entidad legal vs marca).
- **Línea 175**: `L15968/N — Anjouan Offshore Finance Authority (vigente hasta Feb 2027)` → `L15968/N — Anjouan Offshore Finance Authority (AOFA), Anjouan, Unión de las Comoras` (añadir jurisdicción formal; eliminado "vigente hasta Feb 2027" por ser dato no verificado — pendiente confirmación Diego).

### `src/content/es/encyclopedia/regulacion-jurisdicciones.md`
- **Línea 92**: `AOFA | Anjouan (Comoras) — **NEOMAAA**` → `AOFA | Anjouan, Unión de las Comoras — **NEOMAAA Markets**` (jurisdicción completa + marca comercial correcta).

### `src/content/es/compliance/expansion-regulatoria.md`
- **Sin cambios necesarios.** El header ya usa el valor autoritativo `Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA`. La jurisdicción `Anjouan (AOFA)` es consistente. No hay inconsistencias.

### `src/content/es/hiring/onboarding-5-dias.md`
- **Sin cambios necesarios.** Usa valores autoritativos: "licencia (Anjouan, AOFA L15968/N) bajo Neomaaa Ltd (IBC 15968)" (línea 32), "Licencia L15968/N de Neomaaa Ltd (IBC 15968)" (línea 292), team "~16 personas" (línea 39), Pepe "20 años" (línea 54). Todo consistente.

**Total: 3 cambios aplicados en 2 archivos de mi scope (4 total).**

---

## Pendientes en OTROS scopes (no tocados)

### Equipo (16 vs 18)
- `src/content/es/compliance/mejores-practicas-compliance.md:331` — dice "TODO el equipo (18 personas)". Debería ser **16 personas**.

### Jurisdicción (estandarización "Unión de las Comoras")
- `src/content/es/legal/terms-conditions.md:16, 237, 255` — usa "Union de Comoras".
- `src/content/es/legal/client-agreement.md:14, 215, 233` — usa "Union de Comoras".
- `src/content/es/legal/*.md` (todos los footers) — usan "Union de Comoras".
- Estos docs también carecen de acentos en general ("Condiciones", "régimen", etc.). Probablemente intencional por compatibilidad. **Decisión Diego:** ¿estandarizar todos los docs a formato con acentos, o mantener la convención legal sin acentos?

### MT4 en requisitos de support
- `src/content/es/hiring/support-es.md:60` — "Familiaridad con MetaTrader 4 o MetaTrader 5".
- `src/content/es/hiring/support-en.md:64` — idem.
- **Recomendación:** cambiar a "Familiaridad con MetaTrader 5 (MT4 deseable, no requerido)".

### Email alias inconsistente
- `src/content/es/compliance/workflow-sales-compliance.md:352` — `soporte@neomaaa.com` (debería ser `support@neomaaa.com`).
- `src/content/es/compliance/manual-susana.md:280` — idem.

### Teléfono soporte Swiss (+41)
- `src/content/es/operations/go-live-runbook.md:347` — `+41 44 707 9633`. Confirmar con Diego si ese número es real o placeholder.

### Vigencia licencia "Feb 2027"
- Dato aparecía en `dashboard.md:175` (eliminado en este audit). Si Diego lo quiere mostrar, confirmar fecha exacta de vencimiento de licencia.

---

## Preguntas abiertas / ambigüedades — para Diego

1. **"Unión de las Comoras" vs "Union de Comoras"** — estandarizar a una sola forma. Recomendación: con acentos + "las" (`Unión de las Comoras`, nombre oficial del país).
2. **Año fundación broker** — ¿"2024" (registro de licencia AOFA) o "2026" (go-live)? En marketing/ventas cuando digamos "fundados en", ¿qué fecha usar? Competidores-deep-dive.md:934 usa "2024" ("Como entidad NEOMAAA Markets, desde 2024"). Recomiendo mantener **2024** como fecha de fundación legal.
3. **Vigencia licencia AOFA** — ¿`Feb 2027` es correcto? Eliminé ese dato del dashboard hasta confirmación.
4. **Emails oficiales del broker** — ¿cuáles existen realmente y cuáles son placeholder? Lista para confirmar: `support@`, `compliance@`, `withdrawals@`, `partners@`, `susana@`, `soporte@` (o es alias español de `support@`).
5. **Teléfono soporte** — ¿`+41 44 707 9633` es real?
6. **MT4 en requisitos de hiring** — ¿mantener MT4 como "nice to have" o eliminar completamente para reforzar que NEOMAAA es MT5 only?

---

## Resumen numérico

- **Inconsistencias identificadas:** 8 categorías mayores.
- **Cambios aplicados en mi scope:** 3 edits en 2 archivos (dashboard.md, regulacion-jurisdicciones.md). `expansion-regulatoria.md` y `onboarding-5-dias.md` ya estaban alineados con el gold source.
- **Pendientes en otros scopes:** 6 items (mejores-practicas-compliance team size, legal jurisdicción "las", hiring MT4, compliance email alias, go-live-runbook teléfono, vigencia licencia).
- **Preguntas abiertas para Diego:** 6.
