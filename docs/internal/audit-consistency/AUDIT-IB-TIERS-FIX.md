# Fix Tiers IB: Bronze/Silver/Senior/Elite + margen sostenible

**Fecha:** 2026-04-13
**Decisión:** Diego
**Estado:** Aplicado en docs + quizzes. Pending: contratos IB + Cellxpert config.

---

## Cambios de nombres

| Antes | Ahora | Contexto |
|---|---|---|
| Gold | Senior | Tier IB |
| Diamond | Elite | Tier IB |
| Platinum (residual en quizzes) | Senior/Elite según contexto | Tier IB |

**No renombrado** (commodity, no tier):
- `programa-completo.md` línea 197: "Gold/XAU (por lote)" — header de columna commodity
- `modelo-financiero.md` línea 32: "Gold y crypto generan mayor ingreso por lote" — commodity
- `support/playbook.md`, `support/atencion-vip.md`, `marketing/retencion-broker.md`, `support/gestion-tickets.md`: **VIP client tiers (Silver/Gold/Platinum)**, no IB tiers → NO tocados
- `marketing/competidores-broker.md` línea 435: "EUR/USD, Gold, BTC" — commodity
- `sales/guia-copytrading-mql5.md`: "Diego's Gold Strategy" — ejemplo de nombre de señal

---

## Cambios de porcentajes (rev share)

| Tier | Antes | Ahora | Δ |
|---|---|---|---|
| Bronze | 30% | 30% | — |
| Silver | 40% | 40% | — |
| Senior (ex Gold) | 50% | 45% | −5pp |
| Elite (ex Diamond) | 60% + bonos sin cap | 50% + bono fijo $2K/mes (cap en variables) | −10pp base + cap bonos |

## Cap total (base + boost)

**55% máximo**. Boost Brasil mantenido (+10%) pero cap absoluto en 55%:

- Bronze (30%) + Brasil = 40%
- Silver (40%) + Brasil = 50% (bajo cap)
- Senior (45%) + Brasil = **55%** (cap aplicado, boost efectivo +10%)
- Elite (50%) + Brasil = **55%** (cap aplicado, boost efectivo +5%)

## Bonos variables

- Elite: **cap $2K/mes** en bonos variables (milestones, swap share, achievements)
- Excedentes redirigidos a: bono fijo mensual garantizado ($2K), cobertura total evento anual (vuelo+hotel+stipend), consideración de equity al mes 12
- Senior y tiers bajos: milestones siguen como antes

---

## Archivos modificados

### Docs markdown (ES) — 4 archivos

| Archivo | Cambios |
|---|---|
| `src/content/es/partners/playbook-ib.md` | Pyramid + stat grid + tabla detallada: Gold→Senior, Diamond→Elite, 50→45, 60→50 + bono fijo. Rev share máximo: "hasta 60%" → "hasta 50% (55% con boost)". Nota actualización abril 2026. FAQ #7, #12, #19: renombrados tiers. Checklist evento anual: Diamond→Elite. |
| `src/content/es/partners/modelo-financiero.md` | Tabla Opción A (Rev Share): Gold→Senior 45%, Diamond→Elite 50% + bono fijo. Tabla Opción B (rebate): Gold→Senior, Diamond→Elite. Margenes recalculados: Elite base 37% (vs 27% antes). Break-even table: Gold→Senior, Diamond→Elite. Nota >[!INFO] oficial. |
| `src/content/es/partners/programa-completo.md` | Tabla tiers: Gold→Senior 45%, Diamond→Elite 50% + bono fijo. Nota consistencia reemplazada con actualización oficial abril 2026. Boost con cap 55% + 3 ejemplos. Opción B rebate tier rename. Auto-Rebate, Swap Share, Monthly Milestones, Calendario Pagos: todos renombrados. Milestones Elite cappeado $2K. Comparación competidores: "60% + bonos" → "55% (con boost) + bono fijo". Margen NEOMAAA: "40%-70%" → "35%-70%". |
| `src/content/es/partners/guia-operativa.md` | Tabla SLA aprobación: IB Gold→Senior, IB Diamond→Elite. "Gold+" → "Senior+" en 3 lugares (regla videollamada, upgrade criteria, matriz escalación). |

### Quizzes JSON (ES) — 3 archivos

| Archivo | Cambios |
|---|---|
| `src/content/quizzes/es/partners/playbook-ib.json` | q1: rev share máx 60% → 55% (cap con boost). q3, q4, q5: options renombrados + explicación q5 ajustada (Senior 45%). q24 option: "Gold+"→"Senior+". q37 explanation: Diamond→Elite, Gold→Senior. q38 option: "Gold+"→"Senior+". |
| `src/content/quizzes/es/partners/guia-operativa.json` | q5: pregunta "IB Gold o Platinum"→"IB Senior o Elite", explanation actualizada. q6: "IB Gold+"→"IB Senior+". |
| `src/content/quizzes/es/partners/programa-completo.json` | q27 explanation: Gold→Senior. q28: Platinum→Elite. q29: options Gold/Platinum→Senior/Elite. q30: Gold→Senior en pregunta + explanation con cap Elite $2K. q31: reemplazada (Monthly Milestone Senior $5K). q32: reemplazada (cap Elite $2K abril 2026). q35 explanation: Gold→Senior. q36: pregunta reformulada a "frecuencia unificada" = Mensual día 15. |
| `src/content/quizzes/es/partners/modelo-financiero.json` | q15: "IB Platinum (35%+15%+bonos)" → "IB Elite (50% base + bono fijo $2K)" margen 37→32%. q16: Platinum→Elite. q28: Monthly Milestone Platinum $15K → Elite target $15K/cap efectivo $2K. |

**Total:** 4 markdown + 4 JSON = **8 archivos modificados**.

---

## Archivos revisados y NO tocados

- `src/content/es/marketing/icps-por-mercado.md`: sin menciones de tiers IB
- `src/content/es/marketing/funnel-broker.md`: sin menciones de tiers IB
- `src/content/es/hiring/roles-broker-completo.md`: sin menciones de tiers IB
- `src/content/es/encyclopedia/abc.md`: sin menciones de tiers IB
- `src/content/es/legal/affiliate-terms.md`: sin menciones Gold/Diamond
- `src/content/es/support/*`: VIP client tiers ≠ IB tiers (Silver/Gold/Platinum de clientes, no tocar)
- `src/content/es/marketing/retencion-broker.md`: VIP client tiers, no tocar
- `src/content/ru/*`: scope de esta fix es ES. Pending para RU si se replica decisión.

---

## Impacto financiero

### Margen broker tier Elite

| Escenario | Antes | Ahora |
|---|---|---|
| Elite base (60% vs 50%) | 27% | 37% |
| Elite + boost Brasil (70% vs 55% cap) | 17% | 32% |
| Elite + bonos plenos ($15K milestone) | **<20%** INSOSTENIBLE | ~32% SOSTENIBLE |

### Atractivo IB Elite vs mercado

- NEOMAAA Elite: 50% base + bono fijo $2K + evento anual full + equity path
- Mayoría brokers: 40-50% (XM, FXTM, Exness cap ~40%)
- Competitividad: **top del mercado** mantenida; cap en bonos variables no afecta prop value inicial

### Boost Brasil

- Mantenido (+10%) pero cappeado a 55%. Anteriormente podía llegar a 70% (Elite 60% + 10% no cappeado).
- Impacto en IB Senior en Brasil: mismo rev share efectivo (55%) que antes (50%+10% sin cap vs 45%+10% con cap = ambos 55%).
- Impacto en IB Elite en Brasil: 55% vs antes 70% → pérdida −15pp en boost, pero base ahora 50% (vs 60%) + bono fijo compensa.

---

## Verificación técnica

- `npx tsc --noEmit`: **pasa** sin errores
- `npx next build`: **pasa** sin errores

---

## Pending (out of scope técnico)

- Actualizar contratos IB con plantilla nueva (Legal/Susana)
- Reconfigurar Cellxpert: tiers + rules + cap logic 55%
- Comunicar cambio a IBs actuales con 60 días de anticipación (regla del propio playbook) + clientes grandfathered 6 meses
- Replicar fix en `src/content/ru/*` si se valida la decisión para el mercado ruso
