# AUDIT4 — KYC + Pagos + Paises

**Fecha:** 2026-04-13
**Scope:** Consistencia KYC + depositos/retiros + PSPs + paises restringidos + timing operativo.
**Agente:** auditor consistency #4

---

## Gold sources (fuentes de verdad declaradas)

| Tema | Gold source | Razon |
|---|---|---|
| Proceso KYC operativo | `src/content/es/compliance/proceso-kyc-sumsub.md` | Doc mas granular, responsable: Susana. Incluye tiers alineados al manual operativo. |
| Tiers de KYC (umbrales y docs) | `compliance/proceso-kyc-sumsub.md` seccion 3 + `compliance/manual-susana.md` + `compliance/workflow.md` | Tres docs coinciden en 4-tier scheme ($1K / $10K / $50K / $50K+). |
| Lista consolidada de paises | `compliance/screening-sanciones.md` seccion 12.5 (NUEVA — creada en este audit) | Superset de todos los docs. Doc de compliance. |
| Depositos y retiros operativos | `operations/deposits.md` + `legal/refund-policy.md` | deposits tiene procedimientos reales; refund-policy es la version legal publica. |
| PSPs detallados | `operations/psps-explicados.md` (con placeholders `[DATO:]`) | Unico doc con profundidad tecnica. |
| FAQ consolidado cara-cliente interno | `operations/faq-interno.md` | Referencia rapida para soporte. |

---

## Timing consolidado (conservador)

### KYC
- **Submission -> decision automatica:** 1-3 minutos (la mayoria).
- **Revision manual (Tier 1 con flag menor):** hasta 48 horas habiles.
- **Tier 2 (aprobacion con SoF declarada):** 24-48 horas habiles.
- **Tier 3 (EDD con docs SoF):** 2-5 dias habiles.
- **Tier 4 (SoW + Principals):** 5-10 dias habiles.

**Comunicacion al cliente (regla de oro):** "24-48 horas" como estandar. Nunca prometer "minutos" como SLA garantizado.

### Depositos
| Metodo | Acreditacion cliente | Min | Fee broker |
|---|---|---|---|
| Visa/Mastercard | 1-5 min (instant) | $50 (metodo) / cuenta aplica | $0 |
| Wire SWIFT | 1-5 dias habiles | $100 | $0 |
| SEPA (EUR) | 1-3 dias habiles | $100 | $0 |
| USDT TRC-20 | 5-30 min | $20 | $0 |
| USDT ERC-20 | 5-30 min | $50 | $0 |
| Bitcoin | 10-60 min | $50 | $0 |
| PIX (BR) | 1-5 min | R$50 (~$10) | $0 |
| PSE (CO) | 15-30 min | COP 50,000 | $0 |
| Nequi (CO) | Instant | COP 20,000 | $0 |
| SPEI (MX) | 5-30 min | MXN 200 | $0 |
| OXXO (MX) | 1-24 h | MXN 200 | $0 |
| Yape (PE) | Instant | PEN 50 | $0 |
| Mercado Pago (AR) | 5-30 min | ARS 5,000 | $0 |
| Skrill / Neteller | Instant | [DATO: min por definir] | $0 |

**Regla dual minimos:** prevalece el mayor entre minimo de cuenta (Cent $5 / Standard $50 / Raw $500 / Institutional $50K) y minimo del metodo.

### Retiros
- **Timing aprobacion interna:** 24-48 h habiles (tras aprobacion del tier requerido).
- **Same-method rule (AML):** obligatoria. Retiro va al mismo metodo de deposito hasta cubrir el monto depositado.
- **Cooling period tarjetas:** 5 dias habiles minimo desde deposito card antes de retirar (previene chargeback).
- **Minimos retiro:** crypto/e-wallet $10, wire $50, card refund $10.
- **Fee broker retiro:** $0. Banco/PSP destino puede aplicar fees propios.
- **Batch:** retiros se procesan 2x/dia (10am, 4pm server time).

---

## Paises restringidos (lista consolidada — GOLD)

Publicada en `compliance/screening-sanciones.md` seccion 12.5 (nueva). Superset de todos los docs.

### NO aceptar (sanciones internacionales)
1. Cuba
2. Irak
3. Iran
4. Corea del Norte
5. Myanmar (Birmania)
6. Siria
7. Sudan
8. Crimea (region ocupada)
9. Donetsk (region ocupada)
10. Luhansk (region ocupada)

### NO aceptar (restricciones regulatorias Tier 1 sin licencia)
1. Estados Unidos (USA)
2. Canada
3. Reino Unido (UK)
4. Espacio Economico Europeo (EEA) -- 30 paises (lista en gold source)
5. Australia
6. Japon
7. Israel

### Con restricciones especiales -- caso por caso con EDD
1. Rusia -- screening exhaustivo, aprobacion Principals, [VERIFICAR CON ABOGADO] trimestralmente
2. Venezuela -- EDD obligatorio
3. Nigeria -- EDD obligatorio
4. Pakistan -- EDD obligatorio
5. Bangladesh -- EDD obligatorio
6. Turquia -- EDD obligatorio
7. Belarus -- caso por caso, [VERIFICAR CON ABOGADO]
8. Afganistan -- evaluar si escalar a restringido, [VERIFICAR CON ABOGADO]
9. Yemen, Libia, Somalia, RD Congo -- EDD obligatorio
10. Cualquier pais en lista gris/negra GAFI vigente

---

## Inconsistencias encontradas (antes de fix)

| Fuente | Decia | Gold dice | Accion |
|---|---|---|---|
| `legal/aml-kyc-policy.md` 3.2 | Tier 1 $0-$5K / Tier 2 $5-$25K / Tier 3 >$25K (3 tiers) | 4 tiers: $1K / $10K / $50K / >$50K | **FLAG** -- fuera de scope (legal), requiere actualizacion del equipo legal |
| `compliance/proceso-kyc-sumsub.md` 3 (antes) | Tier 1 $1K / Tier 2 $15K / Tier 3 >$15K (3 tiers) | 4 tiers | **FIXED** -- alineado al esquema 4-tier |
| `compliance/manual-susana.md` 3.1 | Tier 1 $1K / Tier 2 $10K / Tier 3 $50K / Tier 4 >$50K | = gold | **OK** |
| `compliance/workflow.md` | Consistente con manual-susana | = gold | **OK** |
| KYC timing en `compliance/proceso-kyc-sumsub.md` 2.1 | "hasta 24h" manual | hasta 48h conservador | **FIXED** |
| KYC timing en `operations/faq-interno.md` 5.3 | auto "minutos", manual "48h" | auto 1-3min, manual 48h, EDD 5 dias | **FIXED** |
| `legal/aml-kyc-policy.md` 3.4 | "hasta 24 horas habiles" manual | 48h conservador | **FLAG** -- fuera de scope legal |
| Paises `legal/aml-kyc-policy.md` 7 | Lista incluye Cuba/Irak/Myanmar/NK/Sudan/Siria/Iran/Crimea/Donetsk/Luhansk + USA/Canada/EEA/UK/Australia/Japon/Israel | = superset gold | **OK** -- aml-kyc-policy ya tiene superset completo |
| Paises `compliance/manual-susana.md` 7.1 | No menciona Crimea/Donetsk/Luhansk explicitamente, no menciona Japon/Israel | Superset completo | **FLAG** -- otro agente, requiere agregar Crimea/Donetsk/Luhansk/Japon/Israel |
| Paises `compliance/onboarding.md` 1 | USA/Canada/EEA/UK/Australia/Cuba/Iraq/Myanmar/NK/Sudan + OFAC/ONU generico | Superset completo | **FIXED** -- ahora referencia gold + menciona Irán/Siria/Crimea |
| Paises `compliance/workflow.md` 2.2 | Lista basica (USA/Canada/EEA/UK/Australia/Cuba/Irak/Myanmar/NK) -- falta Sudan/Siria/Iran/Japon/Israel/Crimea/Donetsk/Luhansk | Superset completo | **FLAG** -- fuera de scope |
| Paises `operations/faq-interno.md` 1.4 | "No USA/Canada/UE/UK" (muy incompleto) | Superset completo | **FIXED** |
| Minimo deposito en `operations/deposits.md` tabla | Visa $50 / Wire $100 / USDT TRC-20 $20 / ERC-20 $50 / BTC $50 | Igual | **OK** + nota sobre regla dual (cuenta vs metodo) |
| Minimo cuenta `operations/faq-interno.md` 3.2 | Cent $5 / Standard $50 / Raw $500 / Inst $50K | = consistente con onboarding/manual-susana | **OK** |
| Fee retiro `operations/faq-interno.md` 4.4 | Ambiguo: "depende del PSP" | Fee broker $0, PSP/banco destino puede cobrar | **FIXED** |
| EDD trigger deposits.md 5.1 | >$10K individual | Alineado con Tier 3 de KYC | **FIXED** con nota de cross-reference |
| PSPs `operations/psps-explicados.md` 8 | `[DATO: Praxis, Checkout o similar]` | Placeholders consistentes por categoria | **FIXED** -- normalizado formato `[DATO: PSP <cat> — candidatos: ...]` + regla de consistencia |
| Mencion PSPs otros docs | Generico "120+ metodos", no menciona PSPs | Bien -- placeholders solo en psps-explicados.md | **OK** |

---

## Cambios realizados en mi scope (6 archivos)

### 1. `compliance/proceso-kyc-sumsub.md`
- Seccion 2.2: Tabla de estados actualizada a 4 tiers con umbrales correctos.
- Seccion 2.1 paso 5: Timing manual revisado de 24h a 48h (conservador).
- Seccion 3: Estructura de tiers completa re-escrita. Ahora Tier 1 $1K, Tier 2 $10K, Tier 3 $50K, **NUEVO Tier 4 $50K+**. Cada tier con timing alineado. Tier 1 ahora requiere PoA desde onboarding.
- Seccion 3.5 (tabla resumen): Columnas 1-4, timings conservadores, flags de aprobacion actualizados.
- Nota de alineacion con `manual-susana.md` y `workflow.md` + flag al equipo legal para alinear aml-kyc-policy.md.

### 2. `compliance/onboarding.md`
- Seccion 1 (Etapa 1): Lista de paises restringidos ampliada (agrega Iran, Siria, Japon, Israel, Crimea/Donetsk/Luhansk) + referencia a gold source.
- Tabla de tiempos objetivo (seccion 1): KYC Tier 1 / Tier 2+ desdoblado con timings realistas.
- Etapa 3 flujo KYC: Timing manual ajustado a 48h + trigger EDD explicito.

### 3. `compliance/screening-sanciones.md`
- **NUEVA seccion 12.5** -- "Lista consolidada de paises restringidos (Gold source)".
- Subsecciones: 12.5.1 sancionados, 12.5.2 regulatorios, 12.5.3 alto riesgo con EDD, 12.5.4 criterio de rechazo (union), 12.5.5 excepciones (doble nacionalidad, IP vs docs, residencia vs nacionalidad).

### 4. `operations/deposits.md`
- Seccion 1 (intro): Nota sobre regla dual de minimos + fee broker $0 explicito.
- Seccion 5.1 (EDD triggers): Cross-reference a Tiers KYC de proceso-kyc-sumsub.md. Agregado umbral Tier 4 ($50K+).

### 5. `operations/psps-explicados.md`
- Seccion 8 (stack actual): Placeholders `[DATO:]` normalizados con formato consistente por categoria. Lista explicita de candidatos (Praxis/Checkout para card; PagSmile/EBANX/DLocal para LATAM; B2BinPay/CoinsPaid para crypto). Regla de consistencia documentada.

### 6. `operations/faq-interno.md`
- Seccion 1.4 (paises): Lista completa con restringidos + alto riesgo + referencia a gold source.
- Seccion 3.4 (fee deposito): Clarificado fee broker $0, cross-reference a psps-explicados.
- Seccion 4.3 (min retiro): Tabla por metodo con valores consistentes.
- Seccion 4.4 (fee retiro): Politica clarificada (fee broker $0, PSP/banco destino puede cobrar).
- Seccion 5.3 (timing KYC): Auto 1-3 min, manual 48h, EDD 5 dias. Regla de comunicacion al cliente.
- Seccion 5.5 (KYC obligatorio): Cambiado de "puede depositar sin KYC" a **NO** (alineado con AML policy) + tiers explicitos.

---

## Pendientes en otros scopes (flags cross-agent)

- [ ] `legal/aml-kyc-policy.md` seccion 3.2 (tiers): Actualizar al esquema 4-tier (scope: legal / Susana).
- [ ] `legal/aml-kyc-policy.md` seccion 3.4 (timing): "hasta 24h" -> "hasta 48h habiles" conservador (scope: legal).
- [ ] `legal/aml-kyc-policy.md` seccion 7 (paises): OK como superset. Solo agregar "Las fuentes operativas autoritativas son compliance/screening-sanciones.md".
- [ ] `compliance/manual-susana.md` seccion 7.1: Agregar Crimea/Donetsk/Luhansk, Japon, Israel a lista sancionados/restringidos regulatorios. (Scope: otro agente).
- [ ] `compliance/workflow.md` seccion 2.2: Extender lista de paises restringidos al superset (agregar Sudan, Siria, Iran, Japon, Israel, Crimea/Donetsk/Luhansk). (Scope: otro agente).
- [ ] `support/playbook.md` si existe: Alinear respuestas al cliente sobre timing KYC con "24-48 horas".
- [ ] Legal/compliance: Confirmar formalmente con abogado si Rusia va a "restringido" o sigue en "alto riesgo caso por caso". Tiene implicaciones operativas inmediatas.

---

## Placeholders `[DATO: pendiente]` creados / normalizados

En `operations/psps-explicados.md` seccion 8:
- PSP card: `[DATO: PSP card a confirmar con Diego/Angel — candidatos: Praxis Cashier, Checkout.com]`
- PSP LATAM: `[DATO: PSP LATAM a confirmar — candidatos: PagSmile, EBANX, DLocal]`
- PSP cripto: `[DATO: PSP crypto a confirmar — candidatos: B2BinPay, CoinsPaid]`
- Banking partner: `[DATO: banking partner a confirmar]`

En otros docs (deposits/faq-interno/onboarding): NO se crean placeholders PSP-especificos (se usa terminologia generica "el PSP", "metodos locales") -- consistente con decision: solo psps-explicados tiene el placeholder.

---

## Preguntas abiertas para Diego / Susana / Angel

1. **PSPs:** Confirmar stack final. Hoy todos estan como placeholder. Decision critica pre-launch.
2. **Rusia:** Sigue como "caso por caso con EDD" o pasa a restringido? Con guerra Ucrania vigente y sanciones UE/UK/US endurecidas, la postura conservadora seria restringir.
3. **Banking partner:** Que banco corporativo se usara para wire SWIFT/SEPA? Afecta timing real al cliente y capacidad de settlement.
4. **Tiers KYC en AML Policy publica:** Discrepancia 3-tier vs 4-tier entre el doc legal publico y el operativo interno. Debe alinearse antes de publicar la AML policy externamente (riesgo regulatorio y de credibilidad).
5. **Cooling period tarjetas 5 dias:** Se mantiene en 5 dias o se extiende a 7 o 10? Buena practica de la industria es 7-14 dias para minimizar chargeback risk.
6. **Minimo retiro Skrill/Neteller:** Sin definir. Confirmar con PSP cuando se firme.

---

## Metrica post-audit

- Archivos en mi scope editados: 6/6
- Inconsistencias fixed en scope: 10
- Inconsistencias flagged fuera de scope: 5
- Placeholders nuevos: 4 (todos en psps-explicados.md)
- Docs que quedan inconsistentes (otro scope): 3 (aml-kyc-policy, manual-susana, workflow)

**Estado de consistencia post-audit:** los 6 archivos bajo mi scope estan alineados entre si en tiers, timing, paises, fees y PSPs. La inconsistencia residual esta entre mi scope y los docs legales/de compliance de otros agentes -- flaggeada arriba para seguimiento.
