# AUDIT5 — Partners / IB / Afiliados

**Fecha:** 2026-04-13
**Scope:** Programa IB, Afiliados, Partners
**Gold source legal:** `src/content/es/legal/affiliate-terms.md` (no tocado)
**Gold source operativo:** `src/content/es/partners/playbook-ib.md` (mantenido como referencia, otros docs alineados)

---

## Hallazgo principal

Antes del fix: **los 4 docs de partners contradecían entre sí en casi todos los datos numéricos del IB Program.** Los tiers, %s, frecuencia de pago, y estructura de sub-IBs estaban desalineados. Lo único consistente era Bronze/Silver/Gold como nombres (los dos docs internos usaban "Platinum" como top tier, el playbook externo usa "Diamond").

**Decisión de gold source:** se tomó `playbook-ib.md` como fuente de verdad operativa porque es el documento publicable al IB. Los otros 3 docs se alinearon a esa estructura. El playbook ya tenía un [DATO:] flag pidiendo confirmación a Diego/Finance — ese flag se propagó a todos los docs.

---

## Estructura consolidada (post-fix)

### Tiers del IB Program

| Tier | Volumen mensual (USD) | Revenue Share | Swap Share | Beneficios extra |
|---|---|---|---|---|
| **Bronze** | 0 – $50.000 | 30% | 0% | Acceso estándar, dashboard Cellxpert |
| **Silver** | $50.001 – $250.000 | 40% | 5% | Partner Manager asignado |
| **Gold** | $250.001 – $1.000.000 | 50% | 10% | Co-branding + marketing co-funding |
| **Diamond** | > $1.000.000 | 60% + bonos | 15% | Evento anual pagado + milestones + override ampliado sub-IBs |

### Boost por mercado prioritario (+10%)

Brasil, México, España, Argentina, Colombia (confirmado por KYC address). Se suma al % base del tier. Ej.: Silver (40%) + Brasil = 44% efectivo lifetime sobre ese cliente.

### Cálculo de comisión

```
Comisión IB = (Spread markup + Comisiones Raw) × % tier vigente [+ boost si aplica]
```

### Payout

- **Corte:** último día del mes calendario, 23:59 UTC
- **Cálculo:** días 1–10 del mes siguiente
- **Payment day:** día 15 del mes siguiente (si cae fin de semana, siguiente hábil)
- **Mínimo payout:** $100 USD (rollea al siguiente mes si no llega)
- **Procesamiento bancario:** 1–3 días hábiles post día 15
- **Métodos:** USDT (TRC20 / ERC20 / BEP20), Wire, Wise, Skrill

### Sub-IBs

- **2 niveles** (no 3 como decía programa-completo)
- **Split:** 70% master / 30% sub-IB sobre el revenue share total
- Pagos separados automáticos a cada parte el día 15
- Responsabilidad de compliance del master sobre su red

### Causales de terminación (playbook-ib + legal/affiliate-terms)

- Violación repetida de frases prohibidas / disclaimers obligatorios (3 strikes)
- Afirmación regulatoria falsa (FCA/CySEC/ASIC/BCRA/CNV/CNMV) — cese inmediato
- Fraude: bots, leads fake, auto-referral, incentivos informales (rebating prohibido)
- Spam masivo, black hat SEO, cloaking
- **Inactividad: 6 meses consecutivos sin volumen** (coincide con legal sec. 11.2)
- Reclamos masivos >5 fundados en 3 meses
- Uso no autorizado de marca
- Gestión discrecional de cuentas de clientes
- Bait-and-switch hacia otro broker

### Disclaimers obligatorios

- Aviso de riesgo del trading de CFDs
- "Entre 70% y 80% de los clientes retail pierden dinero operando CFDs"
- Licencia Anjouan (L15968/N)
- Link T&Cs: https://neomaaa.com/legal/terms
- ID de afiliado único (ej. `NM-IB-00245`)

### Frases prohibidas (alineadas a compliance/manual-susana.md)

Coinciden: "garantías de rentabilidad", "sin riesgo", "imposible perder", "100% seguro", "el mejor broker", "duplicá tu cuenta", "señales infalibles", "100% win rate", afirmaciones regulatorias falsas (FCA/CySEC/ASIC/BCRA/CNV/CNMV), comparaciones directas con competidores, testimonios sin disclaimer de riesgo, videos de cuentas funded sin aclaración.

---

## Inconsistencias encontradas y resueltas

| # | Fuente (pre-fix) | Decía | Gold (playbook-ib) | Acción |
|---|---|---|---|---|
| 1 | `programa-completo.md:L173-L176` | IB tiers: Bronze 25% / Silver 30% / Gold 33% / Platinum 35% | Bronze 30% / Silver 40% / Gold 50% / Diamond 60%+bonos | FIX: alineado a playbook |
| 2 | `programa-completo.md:L20` | "Sub-IBs: Hasta 3 niveles (diferencial)" para IB | "2 niveles, split 70/30 master/sub-IB" | FIX: corregido a 2 niveles |
| 3 | `programa-completo.md:L237-L239` | Ejemplo sub-IB por diferencial (33% - 25% = 8% override) | Split 70/30 sobre el revenue total | FIX: reescrito con ejemplo 70/30 |
| 4 | `programa-completo.md:L242-L248` | Pagos Bronze/Silver/Gold semanales, Platinum diario | Mensual día 15 para todos los tiers | FIX: unificado. [DATO:] flag para confirmar si Diamond abre excepción |
| 5 | `programa-completo.md:L215-L220` | Milestones con tier "Platinum/Diamond/Legend" | Tier top = Diamond | FIX: renombrado a Diamond/Diamond Elite/Legend |
| 6 | `programa-completo.md:L270` | "Revenue Share máximo 35%" en tabla comparativa vs competidores | 60% + bonos en playbook | FIX: actualizado a "60% + bonos" |
| 7 | `programa-completo.md:L304` | "IB Program margen 63%-74%" | Con rev share 30-60% + bonos + swap, el margen real es ~40%-70% base (puede caer <20% en Diamond con todos los bonos) | FIX: margen ajustado |
| 8 | `programa-completo.md` | No mencionaba boost +10% por mercado prioritario | Playbook lo tiene como core | FIX: agregado bloque de boost |
| 9 | `modelo-financiero.md:L66-L74` | IB Opción A: Bronze 25% / Silver 30%+5%swap / Gold 33%+10%swap / Platinum 35%+15%swap | Bronze 30% / Silver 40% / Gold 50% / Diamond 60% + swap | FIX: alineado con nota de gap interno/externo |
| 10 | `modelo-financiero.md:L78-L83` | Rebate lote: tier Platinum | Tier Diamond | FIX: renombrado. [DATO:] flag para confirmar si Opción B sigue vigente |
| 11 | `modelo-financiero.md:L136` | "Margen IB Bronze (Rev Share) 60% vs 66%" | Con nuevos %s, Bronze = 61% base | FIX: recalculado a 55% vs 61% |
| 12 | `modelo-financiero.md:L211` | "Platinum ($15,000 milestone)" | Diamond | FIX: renombrado |
| 13 | `guia-operativa.md:L50` | Aprobación IB Platinum por Principals | IB Diamond | FIX: renombrado (2 ocurrencias) |
| 14 | `guia-operativa.md:L104` | "Pagos semanales (Silver+, IB) Martes" | Mensual día 15 | FIX: unificado a pagos mensuales día 15 |

---

## Cambios en mi scope

1. **`partners/programa-completo.md`** — alineación completa del IB Program al playbook-ib. Renombrado Platinum → Diamond, %s actualizados, sub-IBs 2 niveles 70/30, pagos unificados día 15, boost +10% agregado, tabla comparativa de competidores actualizada. Nota de consistencia al inicio del documento.
2. **`partners/modelo-financiero.md`** — IB Opción A alineada a tiers/%s del playbook. Márgenes recalculados. Flag crítico agregado: **margen Diamond con boost + bonos + swap puede caer <20%** — requiere decisión Diego antes de lanzamiento.
3. **`partners/guia-operativa.md`** — Platinum → Diamond (2 ocurrencias en tabla de aprobación). Pagos semanales IB → mensuales día 15.
4. **`partners/playbook-ib.md`** — NO modificado (ya era el gold source, sus [DATO:] flags se propagaron a los demás docs).

---

## Pendientes en otros scopes

- [ ] **`legal/affiliate-terms.md`** — legal NO tiene estructura de tiers (dice "se define en acuerdo individual"). Compatible con lo que armamos, pero sería deseable tener un anexo legal con los tiers Bronze/Silver/Gold/Diamond confirmados una vez aprobados por Diego.
- [ ] **`legal/affiliate-terms.md:L77`** — dice "dentro de los primeros 15 días hábiles del mes siguiente" (rango), playbook dice "día 15 exacto". No es contradicción estricta pero sería más limpio alinear a "día 15 del mes siguiente".
- [ ] **`hiring/roles-broker-completo.md`** — no define el rol de "Partner Manager" que el playbook menciona como figura clave. Edward cubre de facto pero no hay job description formal.
- [ ] **`compliance/manual-susana.md`** — frases prohibidas generales coinciden con las de partners, pero no hay sección específica de "compliance de IBs" con las responsabilidades del master sobre sus sub-IBs. Recomendado agregar.

---

## Conflictos CRÍTICOS (requieren decisión Diego)

### 1. MARGEN DIAMOND INSOSTENIBLE

Los %s del playbook (30/40/50/60 + boost +10% + bonos + swap share 0-15%) dan un margen para NEOMAAA en tier Diamond que puede caer por debajo del 20% una vez sumadas todas las capas (rev share + boost + swap + monthly milestones + super-bonus). Esto contradice el modelo financiero conservador interno que asumía 63-74% de margen.

**Decisión requerida:**
- (a) Bajar el rev share del playbook (ej. Diamond 50% en vez de 60%)
- (b) Limitar el boost +10% (ej. solo aplicable hasta tier Silver)
- (c) Eliminar milestones para los %s altos
- (d) Aceptar margen bajo en Diamond a cambio de volumen

Sin decisión, el programa puede ser deficitario en tiers altos.

### 2. FRECUENCIA DE PAGO TIER DIAMOND

El doc interno histórico ofrecía pagos semanales (Silver+) y diarios (Diamond). El playbook externo unificó todo a mensual día 15. Si el programa se lanza como "mensual día 15 para todos", hay que confirmarlo — algunos IBs top competidores pagan semanal.

**Decisión requerida:** ¿se mantiene "día 15 mensual" para todos o se abre excepción para Diamond (semanal/diario)?

### 3. OPCIÓN B (REBATE POR LOTE) — ¿VIGENTE?

El playbook-ib.md NO menciona la Opción B (rebate por lote en USD). El doc interno sí la tiene detallada. Dos posibilidades:
- (a) Se deprecó en favor de Rev Share puro → hay que eliminarla del modelo-financiero
- (b) Sigue disponible por negociación → hay que agregarla al playbook-ib

Por ahora quedó con [DATO:] flag en modelo-financiero.

### 4. SUB-IBs: 2 vs 3 NIVELES

Históricamente programa-completo decía "hasta 3 niveles" para IB. Playbook dice 2. El cambio a 2 es más conservador y típico del mercado. Confirmado en el fix, pero si Diego prefería 3 niveles como diferencial competitivo, hay que revertir.

### 5. MONTHLY MILESTONES — ¿SE COMUNICAN AL IB?

Los Monthly Milestones ($500/$1.500/$5.000/$15.000 por tier) están en el doc interno pero NO en el playbook externo. Esto significa que los IBs no los conocen de antemano — quedan como "bonos discrecionales" o "sorpresa". ¿Es intencional o se deben agregar al playbook?

---

## [DATO:] placeholders consistentes

Los flags que quedan en los 4 docs de partners y requieren data real:

- Partner Manager asignado a cada IB: [DATO: rol a asignar — Edward en etapa 1?]
- Dashboard Cellxpert URL real: [DATO: pendiente cuando esté live]
- Pack de materiales marketing: [DATO: links S3/Drive/Canva cuando esté publicado]
- Contacto Partner Manager (Telegram directo): [DATO: configurar en onboarding]
- Tiers definitivos: [DATO: confirmar con Diego/Finance antes de firmar contratos]
- Opción B rebate por lote: [DATO: confirmar vigencia]
- Pagos semanales/diarios tier Diamond: [DATO: confirmar si abre excepción al "día 15 mensual"]
- Monthly Milestones comunicados al IB: [DATO: confirmar si son públicos al onboarding o internos]

---

## Resumen ejecutivo

- **14 inconsistencias críticas encontradas, 14 fix en scope.**
- **Gold source establecido:** playbook-ib.md (operativo externo) + affiliate-terms.md (legal).
- **Frases prohibidas y disclaimers:** alineados con manual-susana.md (compliance gold).
- **Conflictos críticos:** 5 decisiones pendientes de Diego (margen Diamond, frecuencia pago, Opción B, sub-IB niveles, Monthly Milestones públicos).
- **Pendientes fuera de scope:** 4 items (legal, hiring, compliance) para alinear en auditorías siguientes.

**Estado del programa antes de lanzar:** NO se deberían firmar contratos IB hasta resolver los 5 conflictos críticos. El playbook con los %s actuales expone al broker a margen negativo en tier Diamond.
