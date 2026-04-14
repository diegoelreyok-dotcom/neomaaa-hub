# AUDIT3 — Compliance + Frases (con gold source oficial Neomaaa Ltd)

**Fecha:** 13 de abril 2026
**Auditor:** Claude (compliance + frases scope)
**Gold source:** Datos oficiales recibidos de Diego (entidad, licencia, sede, disclaimers, jurisdicciones restringidas)
**Estado typecheck:** npx tsc --noEmit → EXIT 0 (limpio)

---

## Gold source oficial (autoridad absoluta)

| Campo | Valor oficial exacto |
|---|---|
| Entidad | Neomaaa Ltd |
| IBC | 15968 (Union of Comoros) |
| Licencia | L15968/N (International Brokerage License) |
| Regulador | Anjouan Offshore Finance Authority (AOFA) |
| Sede | Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros |
| Web | neomaaa.com |
| Soporte | help.neomaaa.com |
| Legal | neomaaa.com/about/legal-documentation |
| Productos | CFDs, Forex, Commodities, Indices, Metales, Energies, Cryptocurrencies |
| Base operativa | Execution-only (NO investment advice) |
| Modelo ejecucion | Principal o counterparty (A-Book/B-Book hibrido admitido OFICIALMENTE en T&Cs) |
| Riesgo admitido | Slippage, latency, requotes, delayed execution |
| Riesgo estadistico | 70-80% retail clients pierden dinero |
| Jurisdicciones restringidas | USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan, sancionados internacionales |

---

## Lista maestra consolidada

### Frases PROHIBIDAS (NUNCA — 28 ya codificadas en manual-susana §8.2)

1. "Te garantizo que vas a ganar dinero" / ganancias garantizadas / rentabilidad asegurada
2. "Sin riesgo" / "riesgo cero" / "riesgo minimo"
3. "Somos FCA / CySEC / ASIC / BaFin / CNV / CNMV / BCRA" o cualquier regulador tier-1 o nacional (MENTIRA — solo AOFA L15968/N)
4. "Nunca perdemos" / "100% win rate" / "sistema infalible" / "señales que nunca fallan"
5. Comparaciones denigrantes con competidores ("X es estafa", "somos mejores que Y")
6. Asesoria de inversion personalizada ("compra/vende ahora", "yo te digo cuando entrar")
7. "Duplica tu dinero" / "duplica tu cuenta" / "triplica tu capital" / cualquier cifra de rendimiento
8. "Tu dinero esta 100% seguro con nosotros"
9. "Es mejor que un banco" / comparacion regulatoria inapropiada
10. "Te voy a manejar la cuenta" / gestion no autorizada
11. "Pedi plata prestada para invertir" / induccion a endeudamiento
12. "Te puedo acelerar la verificacion" / "el KYC es solo tramite"
13. "Deposita mas y vas a ganar mas"
14. "Apalancamiento ilimitado" / "deposito minimo $0" / "retiros instantaneos sin comision" (ofertas falsas)
15. Urgencia artificial ("oportunidad unica, no te la pierdas")
16. "No necesitas experiencia para ganar"
17. "Somos 100% A-Book" (FALSO — ningun broker retail lo es, confirmado en dealing-desk-publico.md)
18. Prometer tiempos exactos de retiro o aprobacion KYC

### Frases APROBADAS (textos oficiales exactos, gold source)

**Identidad legal:**
- "Neomaaa Ltd, International Business Company registrada en Union of Comoros (reg. 15968), licencia International Brokerage L15968/N otorgada por la Anjouan Offshore Finance Authority (AOFA)."
- "Sede registrada: Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros."

**Base de operacion:**
- "Neomaaa Ltd opera sobre base execution-only: no ofrecemos asesoramiento de inversion, recomendaciones personalizadas, señales de trading ni gestion de portafolios."
- "Neomaaa Ltd puede actuar como principal o counterparty en las operaciones de sus clientes, dentro de su politica de ejecucion publicada."
- "Modelo hibrido ECN/STP, auditable en MetaTrader 5."

**Riesgo:**
- "Los CFDs son instrumentos complejos con alto riesgo de perder dinero debido al apalancamiento."
- "El 70-80% de los clientes minoristas pierden dinero operando CFDs con este tipo de proveedor."
- "Pueden producirse slippage, latencia, requotes y demoras en la ejecucion, propios de los mercados OTC."
- "El rendimiento pasado no es indicativo de resultados futuros."

**Jurisdicciones:**
- "Neomaaa Ltd no presta servicios a residentes de USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, Corea del Norte, Sudan ni paises sancionados internacionalmente."

La lista maestra completa (con 15 entradas tabuladas) vive en `src/content/es/compliance/manual-susana.md` §8.2.bis — nueva seccion creada en este audit.

---

## Fixes aplicados (6 archivos en scope)

### 1. `src/content/es/compliance/manual-susana.md` (6 cambios)
- **§1.1** tabla identidad: reescrita con datos oficiales exactos. Agregadas filas: Sede registrada (Hamchako/Mutsamudu), Web, Soporte, Legal, Base operativa (execution-only), Modelo ejecucion (principal o counterparty). Productos alineados a gold source. Cambiado "Anjouan, Union de las Comoras" → "The Autonomous Island of Anjouan, Union of Comoros".
- **§7.1** cabecera jurisdicciones restringidas: agregada frase gold source oficial listando los 11 paises/regiones exactos.
- **§8.2 frase #21**: actualizada la columna "que decir en su lugar" con el texto completo oficial incluyendo sede.
- **§8.2.bis NUEVA**: agregada tabla maestra de Frases APROBADAS con 15 textos exactos oficiales (identidad larga/corta, sede, canales, execution-only, modelo ejecucion, riesgo CFDs, 70-80% retail, slippage, performance, productos, jurisdicciones, KYC/AML).
- **§8.3** disclaimers: reescrito corto y largo con el 70-80% retail integrado, execution-only integrado, slippage/latency/requotes mencionados, sede completa en disclaimer largo. Agregados dos disclaimers nuevos: "execution-only" y "contraparte".
- **§8.3.bis** A-Book/B-Book: reescrita intro reconociendo que T&Cs OFICIALMENTE admite "principal or counterparty", por lo tanto hablar del modelo hibrido es publico. Solo son confidenciales umbrales/ratios/clasificacion individual.

### 2. `src/content/es/sales/objections-broker.md` (3 cambios)
- **Objecion 1** (confianza): respuesta reescrita con nombre legal completo + IBC + sede + AOFA + link legal documentation.
- **Objecion 4** (A-Book/B-Book): respuesta reescrita para admitir transparentemente el modelo hibrido (alineado a T&Cs oficiales), sin negar que Neomaaa puede actuar como counterparty.
- **Frases APROBADAS** (seccion final): expandida de 6 bullets a 17 bullets estructurados en 4 categorias (identidad/regulacion, modelo ejecucion, riesgo, operativa). Cada una alineada al gold source. Referencia a manual-susana §8.2.bis.

### 3. `src/content/es/sales/training.md` (2 cambios)
- **Semana 3 Dia 1** (Regulacion Basica): reescrito con identidad legal completa oficial, base execution-only, modelo principal/counterparty, productos exactos, lista de paises restringidos completa, y disclaimer oficial 70-80% retail.
- **Tabla frases prohibidas Semana 3 Dia 2**: frase "Somos regulados por FCA..." → alternativa actualizada con nombre legal completo oficial.

### 4. `src/content/es/compliance/workflow.md` (0 cambios directos)
- Ya referencia manual-susana como gold source en callout inicial. No requiere fixes de frases (todas delegadas a manual-susana). Referencias a "Anjouan" en modulos de capacitacion son correctas.

### 5. `src/content/es/compliance/workflow-sales-compliance.md` (0 cambios directos)
- Ya referencia manual-susana como gold source. Reglas operativas (scripts, SLAs, permisos) no requieren fix regulatorio.

### 6. `src/content/es/compliance/mejores-practicas-compliance.md` (0 cambios)
- Documento de benchmark de industria + plan implementacion. Ya aclara en callout inicial que NO redefine reglas operativas (gold source = manual-susana). Coherente.

**Total:** 11 ediciones en 3 archivos. Los otros 3 en scope ya estaban correctamente referenciando manual-susana como gold source; no requerian cambios.

---

## Inconsistencias en otros scopes (FLAG — no tocadas)

### `src/content/es/legal/aml-kyc-policy.md`
- §3.2 Tiers publicos: Tier 1 hasta $5,000, Tier 2 $5,001-$25,000, Tier 3 $25,000+.
- `manual-susana.md` §3 (gold source INTERNO): Tier 1 $0-$1,000, Tier 2 $1,001-$10,000, Tier 3 $10,001-$50,000, Tier 4 $50,000+.
- **DISCREPANCIA REAL.** El doc legal publico tiene 3 tiers con umbrales mas laxos, el manual operativo interno tiene 4 tiers mas estrictos. Los umbrales DEBEN reconciliarse. Probablemente el operativo es el correcto (mas conservador). **Pregunta abierta para Susana + legal.**

### `src/content/es/legal/terms-conditions.md`
- §1 definiciones: "Anjouan, Union de Comoras" (variante del nombre oficial). Revisar en pase legal para usar "Union of Comoros" consistentemente.
- Verificar que contenga mencion explicita de "principal or counterparty" (el gold source dice que T&Cs lo admite OFICIALMENTE).
- Verificar que contenga el 70-80% retail en risk disclosure.

### `src/content/es/legal/risk-disclosure.md`
- No leido en este audit. Flag: verificar que contenga la frase oficial 70-80% retail, execution-only, slippage/latency/requotes/delayed execution.

### `src/content/es/legal/order-execution-policy.md`
- No leido. Flag: verificar que describa explicitamente el modelo hibrido principal/counterparty publicamente.

### `src/content/es/sales/primer-contacto.md` / `plan-contacto.md` / `faq-ventas.md` / `commissions.md`
- No auditados en este scope. Flag para AUDIT futuro: verificar que no usen frases prohibidas y que toda mencion de licencia use el texto gold source.

### `src/content/es/sales/guia-copytrading-mql5.md`
- No auditado. Flag: copy trading tiene alto riesgo de frases prohibidas tipo "este signal provider nunca falla". Revisar.

### `src/content/es/support/playbook.md` / `enciclopedia-soporte.md`
- No auditados. Flag: el subset de frases prohibidas en support debe coincidir con manual-susana §8.2 o referenciar.

### `src/content/es/marketing/copy-broker.md` / `funnel.md` / `retencion.md`
- No auditados. **Flag CRITICO:** marketing es el scope con mas riesgo de frases prohibidas. Debe pasar auditoria completa antes del go-live.

### `src/content/es/partners/playbook-ib.md` / `programa.md` / `modelo-financiero.md`
- No auditados. Flag: partners/IBs son canal no controlado directamente. Necesitan copy aprobado y lista de frases prohibidas explicita. Alto riesgo regulatorio.

### `src/content/es/operations/dealing-desk-publico.md`
- Verificado puntualmente: ya dice explicitamente "Somos 100% A-Book = mentira" y alinea narrativa del modelo hibrido. OK.

### `src/content/es/compliance/ab-book-policy.md`
- No auditado directamente. Flag: verificar que separe claramente lo publico (modelo hibrido admitido) de lo confidencial (umbrales/ratios/clasificacion individual). Con el fix §8.3.bis del manual-susana ya queda claro el principio; este doc debe alinearse.

---

## AML thresholds consolidados (gold source interna = manual-susana)

| Umbral | Monto | Documentos | Aprobacion | SAR timing si sospecha |
|---|---|---|---|---|
| Tier 1 | $0 - $1,000 | ID + POA + Selfie (Sumsub) | Automatica | 24-48h desde deteccion |
| Tier 2 | $1,001 - $10,000 | Tier 1 + declaracion SoF | Susana | 24-48h |
| Tier 3 | $10,001 - $50,000 | Tier 2 + evidencia SoF | Susana con evidencia | 24-48h |
| Tier 4 | $50,001+ | Tier 3 + docs corporativos + entrevista | Susana + Principals | Mismo dia si critico |
| EDD trigger | PEP, pais alto riesgo, $10K+, patrones sospechosos, inconsistencias | Documentacion reforzada | Susana 24-48h, Tier 4 + Principals | Segun §9.1 manual-susana |
| SAR critico | Terrorismo, sanciones confirmadas, crimen probado | Formulario SAR + evidencia | Susana | **Mismo dia (inmediato)** |
| SAR alto | Lavado, structuring, docs falsos | Formulario SAR | Susana | 24h desde decision interna |
| SAR medio | Cliente desaparece, sin logica economica | Formulario SAR | Susana | 48h desde decision interna |

**Nota:** El doc legal publico `aml-kyc-policy.md` tiene 3 tiers con umbrales mas laxos ($5K, $25K). Hay que reconciliar — pregunta abierta abajo.

---

## Escalation procedure a compliance (Susana) — gold source manual-susana §Anexo B.2

| Urgencia | Canal | SLA Susana |
|---|---|---|
| CRITICA (fraude, amenaza legal, sanciones confirmadas, terrorismo/criminal) | WhatsApp grupo "Compliance Urgente" + llamada + ping en Slack `#compliance-urgente` | 30 min (24/7 incluido fin de semana) |
| ALTA (PEP, deposito $10K+ sospechoso, red flag activa, retiro con reclamo) | Slack `#compliance-sales` + mencion `@Susana` | 2h habiles |
| MEDIA (KYC pendiente, RETRY 3er intento, Tier 2-3) | Slack `#compliance-sales` | 4h habiles |
| BAJA (docs formales, SoF por email, reportes) | Email `compliance@neomaaa.com` | 24h habiles |

Regla de oro: TODO queda por escrito. Llamadas y audios requieren resumen posterior en Slack.

---

## Preguntas abiertas para Diego

1. **Canal de escalamiento a Susana**: el gold source interno define Slack + WhatsApp grupo "Compliance Urgente" + email `compliance@neomaaa.com`. ¿Se mantiene este stack o migrar todo a Telegram (canal interno del equipo segun CLAUDE.md global)?

2. **SLA respuesta compliance en hora laboral**: manual-susana dice 2h para ALTA, 4h para MEDIA. ¿Confirmas o queres tightenear a 1h/2h?

3. **Tiers AML — reconciliar legal vs operativo**: el doc publico `legal/aml-kyc-policy.md` tiene 3 tiers ($5K/$25K) vs el manual operativo interno con 4 tiers ($1K/$10K/$50K). ¿Cual es el oficial? Si es el operativo (mas estricto), hay que actualizar el legal publico antes del go-live.

4. **Certificacion ACAMS/ICA para Susana**: manual-susana §13.1 lo marca como "evaluar". ¿Decision tomada? ¿Presupuesto?

5. **Auditor externo compliance**: ¿contratado? Fase 3 (expansion) lo requiere, pero ayuda desde ya para Fase 1.

6. **Risk disclosure publico**: ¿confirmamos que `legal/risk-disclosure.md` ya tiene el 70-80% retail + execution-only + slippage/latency? No auditado en este scope.

7. **Marketing copy audit**: marketing es el scope mas critico regulatoriamente y NO fue auditado. ¿Lo hacemos en un AUDIT nuevo antes del go-live?

8. **Partners/IB**: playbook de IBs fuera de scope. ¿Queda auditado antes del lanzamiento del programa de partners?

---

## Resumen ejecutivo

- **11 fixes aplicados** en 3 de 6 archivos de scope (los otros 3 ya referenciaban gold source correctamente)
- **1 seccion nueva** creada: manual-susana §8.2.bis (frases APROBADAS con textos oficiales exactos)
- **1 principio clarificado**: el modelo hibrido A-Book/B-Book es comunicacion PUBLICA aprobada (lo admite T&Cs oficial); solo son confidenciales umbrales, ratios y clasificacion individual
- **Identidad oficial corregida**: "Union of Comoros" + sede "Hamchako, Mutsamudu" + productos alineados + execution-only + 70-80% retail oficializados
- **Typecheck**: npx tsc --noEmit → EXIT 0 (limpio)
- **Flags criticos pendientes** (fuera de scope): legal (tiers reconciliar, risk-disclosure, T&Cs), marketing copy, partners playbook, support playbook — deben auditarse antes del go-live
