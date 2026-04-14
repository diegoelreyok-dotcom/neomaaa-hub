# AUDIT3 -- Compliance + Frases Prohibidas/Aprobadas + Procedimientos

**Fecha:** 2026-04-13
**Scope:** `src/content/es/` (portal NEOMAAA Markets)
**Objetivo:** Garantizar que las reglas de compliance (frases prohibidas, aprobadas, escalamiento, AML thresholds, A-Book/B-Book publico) son IDENTICAS y referencian una fuente de verdad unica.

---

## Gold source (post-audit)

La autoridad unica para compliance operativo queda fijada en:

| Tema | Documento canonico | Seccion |
|---|---|---|
| Frases prohibidas (28 frases consolidadas) | `compliance/manual-susana.md` | 8.2 |
| Frases aprobadas (alternativas) | `compliance/manual-susana.md` | 8.2 columna derecha |
| Disclaimers obligatorios (corto, largo, apalancamiento) | `compliance/manual-susana.md` | 8.3 |
| A-Book/B-Book -- que se puede decir publicamente | `compliance/manual-susana.md` | 8.3.bis (nuevo) |
| Canales donde aplican las reglas | `compliance/manual-susana.md` | 8.4 |
| Tiers onboarding ($0-$1K, $1K-$10K, $10K-$50K, $50K+) | `compliance/manual-susana.md` | 3.1 |
| Triggers EDD | `compliance/manual-susana.md` | 4.1 |
| SAR timing por urgencia | `compliance/manual-susana.md` | 9.1 (actualizado) |
| Canal escalamiento Susana (4 niveles urgencia) | `compliance/manual-susana.md` | Anexo B.2 (nuevo) |
| Politica A-Book/B-Book interna (CONFIDENCIAL dealing desk) | `compliance/ab-book-policy.md` | Todo el doc -- NO tocar |
| Politica AML/KYC formal (version publica/legal) | `legal/aml-kyc-policy.md` | Todo el doc |

El Manual ahora lleva un callout explicito "GOLD SOURCE -- FUENTE DE VERDAD UNICA" en su encabezado. Los demas docs en compliance/, sales/, partners/, support/, marketing/ deben referenciarlo, no duplicarlo.

---

## Lista maestra CONSOLIDADA

### Frases PROHIBIDAS (28 frases -- manual-susana.md seccion 8.2 post-audit)

Consolidadas desde todos los docs. Numeradas segun el manual:

1. "Te garantizo que vas a ganar dinero"
2. "Es imposible perder con esta estrategia"
3. "Nuestros clientes ganan un X% mensual"
4. "Deposita mas y vas a ganar mas"
5. "El mercado va a subir/bajar, es seguro" (consejo de inversion)
6. "Yo opero esto y me va muy bien" (consejo implicito)
7. "No hay riesgo" / "Es muy seguro" / "Riesgo minimo"
8. "Puedes retirar tu dinero cuando quieras sin problemas"
9. "Somos el mejor broker del mercado"
10. "Tu dinero esta 100% seguro con nosotros"
11. "Te voy a manejar la cuenta" / "Yo opero por ti"
12. "Compra/vende [instrumento] ahora"
13. "Con apalancamiento 1:1000 puedes ganar mucho con poco" (sin mencion de riesgo)
14. "No te preocupes por las perdidas, se recuperan facil"
15. "Este trade es una oportunidad unica" / "No te la pierdas" (urgencia artificial)
16. "Forex es mejor que tener el dinero en el banco"
17. "Te doy una senal de trading"
18. "Con nosotros no hay spreads ocultos" (si no es verificable)
19. "Vamos a duplicar tu deposito" (refiriendose a bonos)
20. "No necesitas experiencia para ganar en forex"
21. **[NUEVO]** "Somos regulados por FCA / CySEC / ASIC / BaFin / BCRA / CNV / CNMV" (o cualquier regulador que NO poseemos -- solo tenemos Anjouan L15968/N)
22. **[NUEVO]** "Duplica tu dinero" / "Duplica tu cuenta en X dias" / "Triplica tu capital"
23. **[NUEVO]** "NEOMAAA es mejor que [competidor]" / "[X] es una estafa, venite a NEOMAAA" / bashing directo por nombre
24. **[NUEVO]** "Rentabilidad asegurada" / "Senales que nunca fallan" / "Sistema infalible" / "100% win rate"
25. **[NUEVO]** "Apalancamiento ilimitado" / "Deposito minimo $0" / "Retiros instantaneos sin comision" (ofertas falsas)
26. **[NUEVO]** "Pedi plata prestada para invertir" / "Usa tu tarjeta de credito para depositar mas"
27. **[NUEVO]** "No te preocupes por el KYC, es solo tramite" / "Te puedo acelerar la verificacion"
28. **[NUEVO]** "Te doy un consejo de inversion" / "Yo te digo cuando entrar y salir"

Las 8 ultimas existian en distintos docs pero NO en manual-susana. Ahora agregadas al gold source.

### Frases APROBADAS (templates)

- "NEOMAAA Markets opera bajo Neomaaa Ltd (IBC 15968), licencia L15968/N otorgada por la Anjouan Offshore Finance Authority (AOFA)"
- "El trading de CFDs y forex conlleva un alto riesgo de perdida. Puede perder todo su capital. No invierta dinero que no pueda permitirse perder." (disclaimer corto -- obligatorio)
- "Advertencia de riesgo: Los contratos por diferencia (CFDs) y el trading de divisas..." (disclaimer largo -- obligatorio en emails/landings/materiales)
- "El apalancamiento amplifica tanto las ganancias potenciales como las perdidas potenciales..." (disclaimer apalancamiento)
- "El rendimiento pasado no es indicativo de resultados futuros"
- "Te recomendamos operar solo con capital que pueda permitirse perder"
- "NEOMAAA opera un modelo hibrido ECN/STP" (respuesta publica aprobada a pregunta A-Book/B-Book)
- "Operamos bajo politica de ejecucion publicada que puedes revisar en legal/order-execution-policy"
- "Los fondos de clientes se mantienen en cuentas segregadas"

---

## Inconsistencias encontradas

| Fuente | Dice | Gold source dice | Fix |
|---|---|---|---|
| `compliance/workflow.md:112` | EDD trigger: deposito acumulado > **$25,000** | EDD desde **Tier 3 = $10,001** (manual-susana 3.1 + 4.1) | FIXED -- actualizado workflow.md a $10K con nota de referencia |
| `compliance/manual-susana.md:822` Anexo B | Canal Susana: "[Definir: Slack/WhatsApp/email]" | N/A -- requeria definicion | FIXED -- agregado Anexo B.2 con matriz unica 4 niveles (critica/alta/media/baja) |
| `compliance/workflow.md:357` | Slack `#compliance-kyc` + `#compliance-urgente` | Canal unificado `#compliance-sales` + WhatsApp `Compliance Urgente` para criticos | Referenciado gold en header. Nombres de canales de Slack son legacy, no criticos -- Susana decide nombres finales al configurar Slack |
| `compliance/workflow-sales-compliance.md:483` | Slack `#compliance-sales` + WhatsApp `Compliance Urgente` | Mismo | CONSISTENTE (este era el modelo correcto, ahora adoptado en manual-susana) |
| `compliance/workflow.md` | Frases prohibidas NO listadas aqui (solo matriz de acciones por rol) | Lista completa en manual-susana | OK -- no duplica, correcto |
| `compliance/workflow.md:310` | SAR a AOFA **en 48 horas** si hay sospecha fraude/lavado | Manual-susana ahora: critico=mismo dia, alto=24h, medio=48h | FIXED -- actualizado manual-susana 9.1 con tabla granular de timing por urgencia |
| `compliance/mejores-practicas-compliance.md:248` | "Presentacion SAR: Industry 24h / NEOMAAA inicio 48h" | Manual-susana: critico=24h max, mismo dia para terrorismo | ACEPTABLE -- es benchmark de industria, no regla operativa. Referencia a gold source agregada al header |
| `legal/aml-kyc-policy.md:43-49` | **Tiers distintos**: T1=$5K, T2=$5K-$25K, T3=>$25K | Manual-susana: T1=$1K, T2=$1K-$10K, T3=$10K-$50K, T4=$50K+ | **PENDIENTE out-of-scope** -- aml-kyc-policy es version publica/legal, requiere sign-off legal + Principals. FLAG para audit4 legal |
| `compliance/proceso-kyc-sumsub.md:141,163,442` | T1=$1K (consistente), upgrade a T3 en **$15,000** | Manual-susana: T3 arranca en $10,001 | **PENDIENTE out-of-scope** (solo read) -- actualizar proceso-kyc-sumsub para alinear umbral a $10K |
| `sales/objections-broker.md:490-511` | 15 frases prohibidas (subset) | Manual tiene 28 | FIXED -- agregadas 9 frases faltantes al playbook + referenciado gold source |
| `sales/training.md:162-171` | 8 frases prohibidas (subset muy reducido) | Manual tiene 28 | FIXED -- agregadas 7 frases criticas faltantes + referenciado gold source |
| `sales/training.md:236` Obj 9 | "Lo que si puedo **garantizarte** son las mejores condiciones" | Palabra "garantizar" en contexto trading es problematica | FIXED -- reemplazado "garantizarte" por "te puedo ofrecer" |
| `partners/playbook-ib.md:295-329` | 12 frases prohibidas (subset bueno, incluye bashing + regulatory false) | OK con gold source | **OK out-of-scope** -- contenido consistente, pero deberia agregar referencia a gold source |
| `marketing/copy-broker.md:615-640` | 8+ frases prohibidas | Consistente (incluye "Garantizado", "Sin riesgo", numeros especificos) | **OK out-of-scope** -- consistente, agregar referencia a gold source |
| `support/playbook.md:246-283` | Escalation a Susana via "Slack + email" (sin WhatsApp urgencia) | Canal gold: Slack + WA + email segun urgencia | **PENDIENTE out-of-scope** -- actualizar support/playbook para adoptar matriz de 4 urgencias |
| `support/guia-tono-comunicacion.md:127-141` | "Vocabulario Aprobado y Prohibido" (seccion) | Probable subset alineado | **PENDIENTE revision completa out-of-scope** -- confirmar alineacion detallada |
| `hiring/onboarding-5-dias.md:367-376` | A-Book/B-Book: "modelo hibrido ECN/STP regulado. No entres en mas detalle. Si insiste, escala a Pepe" | CONSISTENTE con manual-susana 8.3.bis | OK |
| `compliance/ab-book-policy.md` | Politica interna A/B Book | CONFIDENCIAL -- solo dealing desk | NO TOCAR (respetado) |

---

## Cambios aplicados en mi scope

### `compliance/manual-susana.md` (v1.0 -> v1.1)
- **Nuevo header** con callout "GOLD SOURCE -- FUENTE DE VERDAD UNICA" listando que es autoritativo
- **8 frases prohibidas nuevas** (21-28) agregadas a seccion 8.2: regulatory false (FCA/CySEC), duplicar dinero, bashing competencia, senales infalibles, ofertas falsas, pedir prestado, minimizar KYC, consejo inversion
- **Nueva seccion 8.3.bis** "A-Book/B-Book -- Que se puede decir publicamente" con matriz de preguntas aprobadas/prohibidas
- **Seccion 9.1 actualizada** con tabla granular de SAR timing por urgencia (critico=mismo dia, alto=24h, medio=48h)
- **Anexo B.2 nuevo** "Canal Unico de Escalamiento" con matriz de 4 niveles (critica/alta/media/baja) + SLA por nivel + regla de oro "todo por escrito"
- **Anexo B.1 completado** con canales reales: Slack + email + WhatsApp, horario Lun-Vie 9-18

### `compliance/workflow.md` (v1.0 -> v1.1)
- Header actualizado con referencia a manual-susana como autoridad unica
- Seccion 1.4 (EDD triggers): corregido umbral de $25K a $10K (alineado con Tier 3 del manual)
- Agregado trigger 6 (inconsistencias documentacion, multiples cuentas, fondos desde jurisdiccion diferente)
- Frases prohibidas NO duplicadas aqui (correctamente referenciadas al manual)

### `compliance/workflow-sales-compliance.md` (v1.0 -> v1.1)
- Header actualizado con referencia a manual-susana
- Contenido consistente con gold source (ya tenia el modelo de canal correcto WhatsApp+Slack)

### `compliance/mejores-practicas-compliance.md` (v1.0 -> v1.1)
- Header actualizado: aclara que es benchmark/plan, NO redefine reglas operativas

### `sales/objections-broker.md`
- Header actualizado con referencia a manual-susana + aviso de subset operativo
- **9 frases prohibidas nuevas** agregadas a tabla "Frases Prohibidas (Compliance)": regulatory false, duplicar, bashing, senales infalibles, pedir prestado, acelerar KYC, consejo inversion, ofertas falsas
- Total: de 15 frases a 24 frases

### `sales/training.md`
- Header actualizado con referencia a manual-susana (modulo Semana 3 es resumen, no autoridad)
- **7 frases prohibidas nuevas** agregadas a tabla Dia 2 Semana 3: regulatory false, duplicar, bashing, senales, acelerar KYC, ofertas falsas
- Total: de 8 a 15 frases en tabla training
- Fix critico: objecion 9 (Cuanto voy a ganar?) -- removida palabra "garantizarte"

---

## Pendientes out-of-scope (reportar, no tocar)

Alta prioridad:
- [ ] **`legal/aml-kyc-policy.md` (seccion 3.2)** -- Tiers DIVERGEN con gold source: legal dice T1=$5K/T2=$5K-$25K/T3=>$25K; manual-susana dice T1=$1K/T2=$1K-$10K/T3=$10K-$50K/T4=$50K+. Requiere sign-off legal + Principals para alinear. Riesgo regulatorio si cliente/auditor compara.
- [ ] **`compliance/proceso-kyc-sumsub.md` (linea 442)** -- "Upgrade a Tier 3 + EDD cuando deposito > $15,000". Gold dice Tier 3 arranca en $10,001. Pedir a Susana actualizar.
- [ ] **`support/playbook.md` (lineas 246-283)** -- adoptar matriz de 4 urgencias del manual-susana Anexo B.2 (actualmente solo Slack + email generico)

Media prioridad:
- [ ] **`support/guia-tono-comunicacion.md`** -- revisar seccion "Vocabulario Aprobado y Prohibido" contra lista maestra de 28 frases y completar gaps
- [ ] **`partners/playbook-ib.md:295-329`** -- contenido de frases prohibidas es consistente pero falta callout de referencia al gold source + se puede expandir de 12 a 28 frases
- [ ] **`marketing/copy-broker.md:615-640`** -- misma observacion: consistente pero falta referencia al gold source y se puede expandir

Baja prioridad:
- [ ] **`compliance/expansion-regulatoria.md`**, **`compliance/registro-compliance.md`**, **`compliance/screening-sanciones.md`**, **`compliance/onboarding.md`** -- no revisados a fondo en este audit. Pasada rapida recomendada en audit4.
- [ ] **`legal/risk-disclosure.md`**, **`legal/client-agreement.md`**, **`legal/terms-conditions.md`** -- usan "garantiz" en contexto legal (clausulas correctas). Verificar con abogado.

---

## AML thresholds consolidados (gold source post-audit)

| Umbral | Valor canonico | Fuente principal | Fuentes divergentes (a alinear) |
|---|---|---|---|
| **Tier 1 (basico)** | $0 - $1,000 acumulado | manual-susana.md 3.1 | aml-kyc-policy dice T1=$5K [DIVERGE]; proceso-kyc-sumsub dice $1,000 [OK] |
| **Tier 2 (intermedio)** | $1,001 - $10,000 | manual-susana.md 3.1 | aml-kyc-policy dice T2=$5K-$25K [DIVERGE] |
| **Tier 3 (alto, EDD con evidencia)** | $10,001 - $50,000 | manual-susana.md 3.1 | workflow.md decia EDD>$25K [FIXED]; proceso-kyc-sumsub dice upgrade T3 en $15K [DIVERGE] |
| **Tier 4 (institucional)** | $50,001+ | manual-susana.md 3.1 | aml-kyc-policy no tiene T4 [DIVERGE -- inconsistencia estructural] |
| **EDD trigger por monto** | $10,001 (Tier 3) | manual-susana.md 4.1 | workflow.md decia $25K [FIXED]; workflow.md red flag tabla "Deposito>$10K sin SoF: pausar" [OK] |
| **EDD trigger PEP** | Cualquier monto | manual-susana.md 4.1 | Consistente en todos los docs |
| **SAR trigger timing critico** (terrorismo, sanciones, criminal confirmado) | Mismo dia | manual-susana.md 9.1 (actualizado) | workflow.md decia "48 horas" [resuelto via header de referencia + update en manual] |
| **SAR trigger timing alto** (lavado, fraude, docs falsos) | 24 horas desde decision interna | manual-susana.md 9.1 | Consistente |
| **SAR trigger timing medio** (sin logica economica, cliente desaparece) | 48 horas desde decision interna | manual-susana.md 9.1 | Consistente |
| **Retiro aprobacion automatica** | Hasta $500 USD | workflow.md 4.2 | Consistente |
| **Retiro Susana revisa** | $501 - $5,000 | workflow.md 4.2 | Consistente |
| **Retiro Susana + Diego** | $5,001 - $25,000 | workflow.md 4.2 | workflow-sales-compliance 6.2 tiene bandas distintas (>$5K revisa, >$25K Principals) -- ambas compatibles |
| **Retiro Susana + Diego + EDD completo** | > $25,000 | workflow.md 4.2 | Consistente |
| **Deposito crypto sospechoso** | > $5,000 trigger investigacion | workflow-sales-compliance 5.2 | Consistente |
| **Primer deposito inusualmente alto** | > $5,000 sin perfil | manual-susana.md 6.1 | Consistente |

---

## Preguntas abiertas (requieren decision Diego/Susana/abogado)

1. **TIERS DISCORDANTES manual vs legal/aml-kyc-policy:** El manual-susana (interno operativo) tiene tiers mas granulares ($1K/$10K/$50K) mientras el doc legal publico tiene tiers mas amplios ($5K/$25K). Cual es el regime vinculante para AOFA? **Recomendacion:** Susana + abogado deben armonizar. Probablemente manual-susana (mas estricto) es el real operativo y legal/aml-kyc-policy tiene valores "viejos" pre-implementacion.

2. **Canales Slack reales:** Manual-susana 8.3.bis/Anexo B.2 asume que existe `#compliance-sales` y `#compliance-urgente` en Slack. Confirmar con Angel/IT que estos canales existen y tienen miembros correctos.

3. **WhatsApp grupo "Compliance Urgente":** Confirmar que existe y tiene a Susana + Diego + Edward como miembros minimos.

4. **"Cuentas segregadas":** Se usa esta frase en objections-broker (multiple veces) y en el disclaimer. Susana + Pepe deben confirmar que LEGALMENTE los fondos estan en cuentas segregadas con banco tier-1 (si decimos esto publicamente, DEBE ser verificable). Es un riesgo de afirmacion publica.

5. **"Hasta 5% anual Vault":** objections-broker menciona "Vault con hasta 5% p.a." varias veces. Susana debe validar que esto no infringe normativa AOFA de productos de ahorro/interes.

6. **Capital de Neomaaa Ltd:** No se menciona en ningun doc publico. Preguntar si se requiere revelar capital minimo bajo AOFA.

7. **Jurisdicciones de alto riesgo (no restringidas):** Manual seccion 7.3 lista Venezuela, Nigeria, Pakistan, Afganistan, DR Congo, Somalia, Yemen, Libia. Workflow seccion 1.4 lista Venezuela, Nigeria, Pakistan, **Bangladesh**. Bangladesh aparece solo en workflow.md -- confirmar si esta en la lista o es error.

---

## Resumen ejecutivo

- **Gold source establecido:** `manual-susana.md` con callout explicito, referenciado por los otros 5 docs de mi scope.
- **Frases prohibidas:** consolidadas de 20 a 28 en gold source. Subsets en sales/objections (15->24) y training (8->15) actualizados.
- **Canal de escalamiento:** definido por primera vez formalmente con matriz 4 niveles (critica/alta/media/baja) en Anexo B.2 del manual.
- **SAR timing:** granular por urgencia (mismo dia / 24h / 48h) -- antes era solo "48h" generico en workflow.
- **EDD trigger:** corregido en workflow.md de $25K a $10K (Tier 3 del gold source).
- **A-Book/B-Book publico:** agregado seccion 8.3.bis con scripts aprobados de que responder a preguntas de clientes.
- **Fix critico:** removida palabra "garantizarte" en training.md objecion 9 (era compliance violation sutil).
- **Pendientes out-of-scope:** 3 de alta prioridad (legal/aml-kyc-policy tiers divergentes, proceso-kyc-sumsub $15K vs $10K, support/playbook escalamiento) + 3 de media/baja.
- **Preguntas abiertas:** 7 items que requieren decision de Susana/Diego/abogado antes del go-live.
