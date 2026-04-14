# AUDIT2 — Producto y Cuentas

**Fecha:** 2026-04-13
**Scope writable:** `src/content/es/encyclopedia/abc.md`, `productos-mt5.md`, `sales/commissions.md`, `faq-ventas.md`, `objections-broker.md`, `primer-contacto.md`, `plan-contacto.md`
**Autoridad:** `abc.md` (cuentas) + `productos-mt5.md` (specs técnicas) + `commissions.md` (comisiones de agentes)

---

## 1. Matriz maestra — valores autoritativos

### Tipos de cuenta

| Cuenta | Min Deposit | Spread desde | Comisión | Leverage Max |
|---|---|---|---|---|
| **Cent** | $5 | 1.0 pip | $0 | 1:1000 |
| **Standard** | $50 | 1.0 pip | $0 | 1:1000 |
| **Raw** | $500 | 0.0 pips | $3/lote/lado ($6 RT) | 1:500 |
| **Institutional** | $50,000 | 0.0 pips | Custom | Custom |

### Leverage por clase de activo (offshore máximo típico — productos-mt5.md)

| Clase | Leverage típico offshore |
|---|---|
| Forex majors | 1:500 |
| Forex minors/exóticos | 1:200 |
| Metales (oro, plata) | 1:200 |
| Índices mayores | 1:100 |
| Índices menores | 1:50 |
| Commodities (oil, gas) | 1:100 |
| Crypto CFDs | 1:20 |
| Stocks CFDs | 1:10 |

> Nota: esta tabla de productos-mt5 es referencia genérica offshore. La tabla autoritativa POR CUENTA es la de abc.md (arriba). El hero "1:1000 leverage máximo" aplica a cuentas Cent/Standard en forex majors cuando el LP lo permite. Diego debe decidir si publicar una tabla NEOMAAA-específica de leverage por instrumento × por cuenta — actualmente NO existe en ningún doc.

### Plataforma
- **MT5 único** (desktop Windows/Mac, webtrader, iOS, Android). NO MT4.
- Copy Trading: **MQL5 Signals** (sistema nativo MetaQuotes). NEOMAAA **NO ofrece MAM/PAMM**.
- Expert Advisors, VPS hosting, 30+ indicadores nativos.

### Instrumentos
- **2,000+ instrumentos**: forex, metales, índices, commodities, crypto CFDs, stocks CFDs.

### Swaps
- **Overnight** estándar.
- **Triple swap los miércoles** (cubre fin de semana).
- **Cuentas swap-free / islámicas**: disponibles bajo solicitud, con comisión administrativa fija en lugar de swap.

### Depósito mínimo global
- **$5** (cuenta Cent).
- 120+ métodos de pago.

---

## 2. Inconsistencias encontradas

### DENTRO DEL SCOPE (fixes aplicados)

| Tópico | Archivo:línea | Valor encontrado | Valor correcto | Fix aplicado |
|---|---|---|---|---|
| Raw commission | `productos-mt5.md:164` | "USD 7 round-turn (Raw)" | "USD 6 round-turn (Raw: $3/lote/lado)" | SI |

> Nota: productos-mt5.md tenía `USD 7 round-turn` en la tabla de contract specs de EURUSD, contradiciendo a abc.md, commissions.md, faq-ventas.md, objections-broker.md y plan-contacto.md que dicen uniformemente "$3/lado = $6 RT". Corregido.

### FUERA DEL SCOPE (pendientes para Diego consolidar)

| Tópico | Archivo:línea | Valor encontrado | Valor autoritativo | Severidad |
|---|---|---|---|---|
| Raw commission | `operations/psps-explicados.md:245` | $3.50 en ejemplo OXXO | Ambiguo: el $3.50 se refiere a fee OXXO (3-4%), no a Raw commission. FALSO positivo — OK | — |
| Leverage por cuenta | `support/playbook.md:932-957` | Standard 1:500 / Raw 1:500 / Institutional 1:200 | Standard 1:1000 / Raw 1:500 / Institutional Custom | **ALTA** |
| Leverage por cuenta | `operations/faq-interno.md:76-79, 256-259` | Standard 1:500 / Raw 1:200 / Institutional 1:100 | Standard 1:1000 / Raw 1:500 / Institutional Custom | **CRÍTICA** |
| Raw commission | `operations/faq-interno.md:78, 239` | $3.5/lote/lado ($7 RT) | $3/lote/lado ($6 RT) | **CRÍTICA** |
| Spread Cent | `operations/faq-interno.md:76` | 1.5 pips | 1.0 pip (según abc.md) | ALTA |
| Leverage forex local | `operations/go-live-runbook.md`, `support/playbook.md:1332,1354,2184` | Ejemplos con 1:500 | OK como ejemplo didáctico, no claim autoritativo | BAJA |
| Apalancamiento max tabla competitiva | `marketing/competidores-deep-dive.md:776` | 1:1000 | Correcto | — |
| Raw commission comparativa | `marketing/competidores-broker.md:17,59` | "$3/lote/lado" NEOMAAA | Correcto | — |

### Notas adicionales

- **faq-interno.md** es el doc MÁS inconsistente con la verdad autoritativa (contradice deposit spreads, comisiones Raw, y leverage por cuenta). Este archivo parece escrito por alguien (el agente PSPs?) usando $3.5 como placeholder. Necesita rewrite completo tomando abc.md + productos-mt5.md como fuente.
- **support/playbook.md** tiene tabla bilingüe ES/EN con leverage por cuenta incorrecto (Standard 1:500 vs autoritativo 1:1000). Necesita fix en ambos idiomas.
- **sales/training.md:230** dice "$3 por lote por lado" ✅ consistente con autoritativo.
- **sales/guia-copytrading-mql5.md:184** tiene $3.50 en tabla de Gold pip value → contexto de trading, NO Raw commission. FALSO positivo.

---

## 3. Preguntas abiertas (decidir con Pepe / Diego)

1. **Leverage por instrumento × por cuenta — tabla NEOMAAA-específica**
   Actualmente productos-mt5 tiene tabla genérica offshore. ABC tiene leverage MAX por cuenta. Falta la intersección: por ejemplo, ¿cuenta Cent en crypto CFD es 1:20 o 1:1000? ¿Cuenta Raw en metales es 1:200 o 1:500? Hay que publicar UNA tabla consolidada.

2. **Leverage 1:1000 vs 1:500 — comunicación marketing**
   ABC dice Cent/Standard=1:1000 y Raw=1:500. Marketing/hero usa "1:1000" universal. Se acepta como marketing headline (el max posible), pero en ventas técnicas hay que decir: "1:1000 en Cent/Standard; 1:500 en Raw". Confirmar con Angel si el copy público debe cambiar o no.

3. **Commission Raw — $3 vs $3.5**
   Valor autoritativo NEOMAAA = **$3/lado ($6 RT)**. El $3.5/lado usado en faq-interno.md debe haber sido copy-paste de research de Exness/IC Markets/Pepperstone ($3.5 es su estándar). Fixear faq-interno.md.

4. **Spread EURUSD en Cent vs Standard**
   ABC dice "Desde 1.0 pip" para ambas. faq-interno.md dice "1.5 pips (Cent)" + "1.0 pip (Standard)". ¿Son iguales o Cent tiene +0.5 markup? Diego/Pepe deciden.

5. **Cuentas swap-free**
   Mencionadas en compliance/onboarding, faq-interno, support/playbook. ¿Es un toggle sobre la cuenta existente (mantiene tipo Cent/Standard/Raw/Institutional) o es una cuenta separada? En docs se trata como toggle. Confirmar.

6. **Institutional leverage**
   ABC dice "Custom". Support/playbook dice "1:200". faq-interno dice "1:100". Pepe debe definir el default o confirmar que es negociable.

7. **VIP / Demo**
   Demo: sí confirmado (gratis, MT5).
   VIP: NO existe como tipo de cuenta; Institutional cubre ese segmento. ¿Queremos un tier VIP explícito entre Raw e Institutional?

---

## 4. Cambios en mi scope

| Archivo | Cambios |
|---|---|
| `abc.md` | 0 — ya estaba correcto (autoritativo). |
| `productos-mt5.md` | 1 — fix comisión Raw tabla EURUSD (USD 7 → USD 6 con nota $3/lado). |
| `commissions.md` | 0 — habla de comisiones a agentes de ventas, no specs de producto. Consistente. |
| `faq-ventas.md` | 0 — todo consistente con autoritativo. |
| `objections-broker.md` | 0 — todo consistente. |
| `primer-contacto.md` | 0 — todo consistente. |
| `plan-contacto.md` | 0 — todo consistente. |

**Total fixes en scope: 1 cambio (productos-mt5.md línea 164).**

---

## 5. Pendientes para Diego consolidar (fuera de mi scope)

- [ ] **`operations/faq-interno.md`** — CRÍTICO: reescribir tabla de tipos de cuenta (líneas 76-79, 256-259, 239). Corregir leverage Standard 1:500→1:1000, Raw 1:200→1:500, Institutional 1:100→Custom, Raw commission $3.5→$3, Cent spread 1.5→1.0 pip.
- [ ] **`support/playbook.md`** — ALTA: corregir tablas de leverage bilingües (líneas 932-957) para reflejar Standard 1:1000 y Institutional Custom.
- [ ] **Nueva tabla NEOMAAA-específica** leverage × cuenta × instrumento — publicar en abc.md o productos-mt5.md cuando Pepe confirme.
- [ ] **Revisión Pepe**: spread EURUSD exacto en Cent vs Standard; leverage por clase de instrumento por cada tipo de cuenta; tarifa administrativa de cuentas swap-free.
- [ ] **Audit legal docs** (`legal/client-agreement.md`, `terms-conditions.md`, `risk-disclosure.md`) — no audité contenido pero son los docs que LEGALMENTE definen el producto. Si divergen de ABC, hay que alinearlos.

---

## 6. Verificación

No aplica `npx tsc --noEmit` a esta auditoría — solo se tocó 1 archivo `.md` (productos-mt5.md). Los archivos markdown no son compilados por TypeScript.

## 7. Resumen ejecutivo

- **Consistencia global scope ventas/encyclopedia**: 95%. Los 7 docs del scope están alineados con abc.md como fuente autoritativa.
- **Único fix aplicado**: `productos-mt5.md:164` — comisión Raw USD 7 RT → USD 6 RT ($3/lado).
- **Hot zone fuera de scope**: `operations/faq-interno.md` tiene CUATRO claims incorrectos (leverage por cuenta, comisión Raw, spread Cent). Prioridad 1 para Diego.
- **Gap en docs autoritativos**: no existe tabla consolidada de leverage por cuenta × por instrumento. Necesita input de Pepe.
