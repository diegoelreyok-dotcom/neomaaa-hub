# Playbook de Compliance — Guía operativa diaria de Susana

**Documento operativo — uso interno**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Versión: 1.0 | Fecha: 13 de abril 2026**
**Autora: Susana (Compliance Officer)**
**Para:** Susana, como primer punto de entrada cada mañana.

> **Este es tu menú diario. No es un manual formal — es tu mapa operativo.**
> Si tienes dudas, empieza acá. Desde este doc vas a saltar al SOP específico que necesites.

---

## 1. Bienvenida + cómo usar este playbook

Hola Susana. Este documento es **tu punto de partida todos los días**. No tiene que leerse entero — está hecho para que lo abras y **en 30 segundos sepas qué hacer**.

Cómo funciona:

1. **Arrancás la mañana** → vas a la sección **"Mi día típico"** (sección 2) y ejecutás el checklist.
2. **Te llega un caso raro** → vas al **menú "Qué hago si…"** (sección 3), identificás la situación, y el menú te linkea al SOP que corresponde.
3. **Necesitás escribir un email al cliente** → vas a **"Plantillas de email"** (sección 5), copiás, editás, enviás.
4. **Te preguntan algo desde Sales/Support/Dealing** → vas a **"Plantillas de respuesta al equipo"** (sección 6).
5. **Sentís que te comés un marrón** → **escalás a Diego**. No sos vos sola. Sección 10.

> **Regla de oro:** ante la duda, documentar y escalar. Documentación + buena fe = protegida. Decisiones sin papel = expuesta.

---

## 2. Mi día típico — Daily routine Susana

### Primera hora del día (30–45 min)

```
□ Abrir este playbook
□ Abrir Sumsub dashboard → revisar alerts nuevos (PEP, Sanctions, EDD pendientes)
□ Revisar inbox compliance@neomaaa.com → emergentes urgentes
□ Revisar inbox legal@neomaaa.com (email oficial legal del broker publicado en neomaaa.com) → subpoenas, requests de reguladores, notificaciones formales
□ Revisar inbox support@neomaaa.com si hay escalaciones de soporte que tocan compliance
□ Revisar estado de casos EDD abiertos — ¿alguno venció SLA?
□ Revisar pings del equipo (Sales, Support, Dealing, Marketing) del día anterior
□ Revisar compliance-calendar.md → ¿qué toca hoy?
```

### Durante el día (on demand)

- Atender consultas del equipo sobre clientes específicos.
- Avanzar casos EDD: solicitar info faltante, revisar docs recibidos, decidir y documentar.
- Revisar alerts que van entrando en Sumsub.
- Revisar retiros inusuales si Dealing los flagea.
- Actualizar monitoreo continuo de cuentas HIGH RISK según el calendario.

### Emergencias (interrumpen todo)

Drop everything si ocurre:

- **Sanctions match confirmado** (UN, OFAC, EU, UK, Anjouan).
- **Email o llamada de AOFA** (regulador).
- **Orden judicial / subpoena.**
- **Prensa negativa** sobre un cliente activo.
- **Structuring claro** (patrón de lavado en curso).

Para todas estas → ver sección 3.4 (Situaciones regulatorias) + escalamiento inmediato a Diego.

### Final del día (15 min)

```
□ Log de casos trabajados hoy (cuaderno interno o Notion compliance log)
□ Follow-ups pendientes para mañana (lista corta)
□ Marcar alerts Sumsub pendientes → priorizar para mañana
□ Cerrar email compliance con zero inbox si es posible
```

> **Tip:** Si trabajás más de 10 horas, algo falla. O tenés demasiada carga (pedir junior) o te estás dispersando. Compliance bien hecho cabe en 7–8h/día salvo crisis puntuales.

---

## 3. Menú — "Qué hago si…"

Este es **el índice de situaciones reales**. Buscá la tuya, leé la acción rápida, y si necesitás más detalle seguí el link al SOP.

### 3.1 Situaciones de onboarding

#### Cliente nuevo viene de país restringido

- **Acción rápida:** rechazo automático. No se abre cuenta. No se acepta depósito.
- **Ver:** [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones) (lista países prohibidos) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) sección 5.
- **Plantilla email:** plantilla #4 (rechazo) con redacción genérica — **nunca** decir la razón específica.

#### Cliente nuevo con Sumsub "clean" (todo verde)

- **Acción rápida:** aprobación automática si risk-matrix lo clasifica LOW. Verificar en Sumsub que los 3 pilares estén verdes: ID, liveness, proof of address.
- **Ver:** [`/content/compliance/proceso-kyc-sumsub`](/content/compliance/proceso-kyc-sumsub) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix).
- **Tiempo esperado:** 5 minutos por cliente.

#### Cliente nuevo con Sumsub "alert" PEP

- **Acción rápida:** **no rechazar automático**. Abrir caso EDD. Investigar si PEP es doméstico, foreign, o international organization. Revisar family members y close associates.
- **Ver:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) sección 3 + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).
- **Decisión final:** requiere aprobación escrita de Diego (Director designado).
- **Tiempo esperado:** 3–7 días.

#### Cliente nuevo con Sumsub "alert" Sanctions

- **Acción rápida:** 🚨 **INMEDIATO**. Freeze preventivo. No procesar depósito. No responder al cliente detalles. Escalar a Diego en la hora.
- **Ver:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) sección 4.
- **Si es true positive:** SAR obligatorio → [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).
- **Si es false positive:** documentar en Sumsub y liberar. **Siempre con evidencia escrita.**

#### Cliente nuevo con profesión alto riesgo

Ejemplos: casino dealer, arms dealer, crypto OTC operator, MSB independiente, joyería mayorista cash-intensive, diamantes, arte de alto valor.

- **Acción rápida:** categoría HIGH RISK automática. EDD obligatorio. Source of funds documentado.
- **Ver:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) categoría HIGH + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).

#### Cliente nuevo corporate con estructura opaca

Indicadores de opacidad: trust offshore sin UBO claro, shell company en jurisdicción no cooperativa, nominee directors, varias capas sin explicación comercial.

- **Acción rápida:** EDD obligatorio con identificación de todos los UBOs >10% + carta explicativa de estructura.
- **Ver:** [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers) + formulario corporate EDD.
- **Regla:** si después de EDD la estructura sigue sin tener sentido económico → **rechazar**.

#### Cliente nuevo referido por IB

- **Acción rápida:** aplicar risk-matrix normal al cliente. **Adicional:** revisar track record del IB (si trae muchos clientes con red flags, escalar IB review).
- **Ver:** [`/content/partners/playbook-ib`](/content/partners/playbook-ib) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix).

### 3.2 Situaciones de clientes existentes

#### Cliente existente tiene transaction rara

Ej: depósito 10x mayor al histórico, wire desde banco nuevo, retiro a cuenta distinta a la de depósito original.

- **Acción rápida:** abrir monitoring case. Investigar 48h. Si es explicable y documentable → cerrar caso. Si no → SAR consideration.
- **Ver:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Cliente existente cambió de país a uno high risk

- **Acción rápida:** re-categorización inmediata. Si el nuevo país está en FATF grey/black list o es restricted → puede requerir cierre de cuenta o freeze.
- **Ver:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) sección 5 + [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones).

#### Cliente existente ahora es PEP

Ocurre cuando el cliente entra a política, gana elección, asume cargo público, o se descubre que siempre lo fue.

- **Acción rápida:** upgrade a HIGH RISK. Abrir EDD retrospectivo. Requerir source of funds actualizado. Aprobación Diego.
- **Ver:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).

#### Cliente existente: sanctions match nuevo

Ocurre cuando en un re-screening periódico aparece el match.

- **Acción rápida:** 🚨 FREEZE inmediato. NO tip off. Escalar Diego en la hora. Preparar SAR.
- **Ver:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) sección 4 + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Cliente existente retira rápido post-depósito sin trading

Patrón clásico de layering (money laundering fase 2).

- **Acción rápida:** hold retiro. Solicitar explicación al cliente vía email genérico (sin revelar sospecha). Si la explicación no es coherente o no responde → SAR.
- **Ver:** [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Cliente existente: trading patterns inusuales

Ej: operaciones sistemáticamente a contramercado sin lógica, trades sintéticos entre cuentas del mismo beneficial owner, "wash trading" para mover dinero.

- **Acción rápida:** monitoring deep con Pepe (Head of Dealing). Revisar si hay daisy-chain entre cuentas. Consideración SAR.
- **Ver:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop).

### 3.3 Situaciones del equipo

#### Sales agent: "¿puedo cerrar con este cliente PEP?"

- **Respuesta rápida:** "No auto-rechazar. Mandame el nombre y país, abro caso EDD. Proceso típico 5–7 días. Si pasa, cierras; si no, te aviso."
- **Plantilla respuesta:** ver sección 6.1.

#### Soporte: "cliente X dice Y, ¿te parece raro?"

- **Respuesta rápida:** "Gracias por el ping. Abro investigación. SLA 48h. No interactúen con el cliente sobre esto hasta que les dé luz verde."
- **Plantilla respuesta:** ver sección 6.2.

#### Dealing/Pepe: "patrón raro en cuenta Z"

- **Respuesta rápida:** "Lo reviso en 24h. Si es urgente para freeze (ej. retiro pending), avisame ya."
- **Plantilla respuesta:** ver sección 6.3.

#### Marketing: "¿podemos targetear ads en país X?"

- **Acción rápida:** verificar `screening-sanciones.md`. Si es restricted → NO. Si es grey list → consulta antes de campaña grande.
- **Ver:** [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones) + [`/content/marketing/copy-broker`](/content/marketing/copy-broker).

#### IB: "me traje 5 clientes de [región]"

- **Acción rápida:** review IB pattern. Si los 5 son LOW → ok. Si hay >1 HIGH RISK → review IB quality + posible warning. Si hay patrón repetido de red flags → review IB relationship.
- **Ver:** [`/content/partners/playbook-ib`](/content/partners/playbook-ib).

### 3.4 Situaciones regulatorias

#### Email o llamada de AOFA (regulador)

- **Acción rápida:** 🚨 inmediato. Notificar a Diego antes de responder nada. Consultar con abogado externo si el requerimiento es formal.
- **Regla:** nunca responder a AOFA sin autorización de Diego. Nunca improvisar. Todo por escrito.
- **Ver:** [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar) sección regulatorios + sección 10 de este playbook.

#### Subpoena u orden legal

- **Acción rápida:** 🚨 inmediato. Notificar Diego + abogado externo. No devolver fondos del cliente afectado sin autorización judicial o legal advice. No contactar al cliente.
- **Documentación:** archivar subpoena en carpeta legal + crear case file.

#### Audit AOFA (programado o sorpresivo)

- **Acción rápida:** preparar documentación según checklist anual de [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar).
- **Documentos clave a tener a mano:** AML/KYC policy vigente, risk assessment, SAR log, training records, ongoing monitoring reports, SOPs, minutes de compliance meetings.

#### Media coverage negativo de un cliente

Ej: el cliente sale en un diario por fraude, corrupción, narcotráfico.

- **Acción rápida:** abrir monitoring case. Evaluar si hay que freeze preventivo. SAR si la prensa da pie a sospecha razonable.
- **Ver:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Cambio en FATF grey/black list

FATF actualiza listas 3 veces al año (febrero, junio, octubre).

- **Acción rápida:** actualizar `risk-matrix.md` sección 5. Re-categorizar clientes afectados. Reevaluar cuentas HIGH RISK con nueva exposición.
- **Ver:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) + [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar) sección trimestral.

---

## 4. Links rápidos — todos los docs compliance

| Doc | Para qué sirve | Cuándo lo uso |
|---|---|---|
| [`risk-matrix`](/content/compliance/risk-matrix) | Categorizar cliente LOW / MEDIUM / HIGH | En cada cliente nuevo |
| [`edd-triggers`](/content/compliance/edd-triggers) | Proceso EDD + formulario | Cliente HIGH RISK o trigger detectado |
| [`pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) | Screening PEP + Sanctions | Al recibir alerts Sumsub |
| [`sar-reporting`](/content/compliance/sar-reporting) | Reportar actividad sospechosa | Cuando detecto red flag |
| [`compliance-calendar`](/content/compliance/compliance-calendar) | Rutina periódica (diaria/semanal/mensual/trimestral/anual) | Para planificar y no olvidar tareas recurrentes |
| [`ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) | Monitoreo post-onboarding | Revisiones mensuales / trigger based |
| [`screening-sanciones`](/content/compliance/screening-sanciones) | Lista países restringidos | Verificar cualquier cliente / país |
| [`workflow`](/content/compliance/workflow) | Workflow general compliance | Referencia de procesos |
| [`workflow-sales-compliance`](/content/compliance/workflow-sales-compliance) | Handoff Sales → Compliance | Flujo cliente nuevo |
| [`manual-susana`](/content/compliance/manual-susana) | Manual de compliance oficial (gold source) | Frases prohibidas, tiers onboarding, escalamiento |
| [`proceso-kyc-sumsub`](/content/compliance/proceso-kyc-sumsub) | SOP técnico Sumsub | Cómo operar Sumsub paso a paso |
| [`ab-book-policy`](/content/compliance/ab-book-policy) | Política A-Book / B-Book | Consultas de dealing y regulatorios |
| [`onboarding`](/content/compliance/onboarding) | Onboarding clientes detallado | Proceso completo de alta |
| [`expansion-regulatoria`](/content/compliance/expansion-regulatoria) | Regulación por región | Antes de abrir mercado nuevo |
| [`legal/aml-kyc-policy`](/content/legal/aml-kyc-policy) | Política AML/KYC oficial (legal) | Referencia formal para auditorías |
| [`legal/terms-conditions`](/content/legal/terms-conditions) | T&C oficiales | Lo que el cliente acepta al registrarse |

> **Tip:** marcá los primeros 6 docs como favoritos en el browser. Son el 90% de tu consulta diaria.

---

## 5. Plantillas de email — listas para copiar

Todas las plantillas asumen que firmás como **Susana, Compliance Officer, Neomaaa Ltd — L15968/N**.

### 5.1 Solicitud de documentación adicional (MEDIUM o EDD)

```
Asunto: Neomaaa Markets — Documentación adicional requerida para tu cuenta

Estimado/a [Nombre],

Gracias por abrir tu cuenta con Neomaaa Markets.

Para completar la verificación de tu cuenta conforme a nuestras
políticas AML/KYC y los requerimientos de nuestro regulador (AOFA),
necesitamos documentación adicional:

[Lista específica según risk-matrix, por ejemplo:]
- Comprobante de fuente de fondos (source of funds): últimos 3 recibos
  de sueldo, declaración jurada, o estado de cuenta bancaria que muestre
  origen de los fondos depositados.
- Comprobante de domicilio actualizado (últimos 3 meses): servicio
  público, extracto bancario o contrato de alquiler/escritura.
- [Otros documentos específicos del caso].

Por favor, envía los documentos a compliance@neomaaa.com dentro de los
próximos 7 días hábiles.

Si tienes consultas sobre qué documentación sirve, respondé a este
correo y te orientamos.

Saludos cordiales,
Susana — Compliance Officer
Neomaaa Ltd — Licencia L15968/N (AOFA)
compliance@neomaaa.com
```

### 5.2 Follow-up si no respondió (día 7)

```
Asunto: Re: Neomaaa Markets — Recordatorio documentación pendiente

Estimado/a [Nombre],

Te escribo nuevamente respecto a la documentación adicional solicitada
el [fecha]. Aún no hemos recibido los documentos.

Sin esa documentación no podemos aprobar la verificación de tu cuenta
ni procesar operaciones o retiros.

Si tenés alguna dificultad en enviarlos, respondé este correo y
buscamos una alternativa juntos.

Saludos,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.3 Follow-up final (día 14) — antes de cierre

```
Asunto: URGENTE — Neomaaa Markets — Cierre de cuenta inminente

Estimado/a [Nombre],

Este es nuestro último intento de contacto respecto a la documentación
pendiente desde el [fecha].

Si no recibimos los documentos solicitados dentro de los próximos
3 días hábiles, deberemos proceder a:

1. Cerrar tu cuenta por incumplimiento de requisitos regulatorios.
2. Devolver los fondos depositados al método de pago original, descontando
   cualquier cargo bancario aplicable.
3. Informar a nuestros registros internos conforme a obligaciones
   regulatorias.

Podés evitar esta acción enviando la documentación a
compliance@neomaaa.com hoy mismo.

Saludos,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.4 Aprobación con restricciones

```
Asunto: Neomaaa Markets — Cuenta aprobada

Estimado/a [Nombre],

Hemos completado la verificación de tu cuenta.

Tu cuenta ha sido aprobada con los siguientes términos:

- Categoría de riesgo interna: [MEDIUM / HIGH]
- Monitoreo continuo conforme a nuestras políticas AML/KYC.
- [Límites operativos si aplica, ej: depósito mensual máx $X hasta
  próxima revisión].
- Re-revisión periódica cada [3 / 6 / 12] meses.

Podés comenzar a operar desde la plataforma MT5. Cualquier cambio
significativo en tu patrón de actividad (depósitos, retiros, origen
de fondos) será revisado conforme a nuestras obligaciones regulatorias.

Si tenés consultas, respondé a este correo.

Saludos cordiales,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N (AOFA)
```

### 5.5 Rechazo (cliente no pasó EDD o decisión final de no onboardear)

⚠️ **Importante:** nunca dar la razón específica. La ley protege al broker de tener que explicar decisiones de compliance.

```
Asunto: Neomaaa Markets — Resultado de verificación

Estimado/a [Nombre],

Hemos completado nuestro proceso de verificación interna.

Lamentamos informarte que no podemos continuar con la apertura de tu
cuenta en Neomaaa Markets. Esta decisión se basa en nuestra evaluación
interna conforme a nuestras políticas AML/KYC y obligaciones regulatorias,
y no podemos proporcionar detalles específicos.

Cualquier fondo depositado será devuelto al método de pago original
dentro de 5–10 días hábiles. Si el método de pago original no está
disponible, te contactaremos para coordinar alternativa.

Agradecemos tu interés en Neomaaa Markets.

Saludos cordiales,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.6 Request info a cliente existente (ongoing monitoring / periodic review)

```
Asunto: Neomaaa Markets — Actualización periódica de documentación

Estimado/a [Nombre],

Como parte de nuestras revisiones periódicas de cumplimiento (conforme
a nuestras obligaciones regulatorias bajo AOFA), necesitamos actualizar
cierta documentación de tu cuenta.

Por favor, enviá lo siguiente dentro de los próximos 14 días hábiles:

- [Documento 1, ej: proof of address actualizado]
- [Documento 2, ej: source of funds para últimos depósitos]
- [Otro según caso]

Esta es una revisión estándar, no implica ningún problema con tu cuenta.
Podés continuar operando normalmente mientras completás la actualización.

Saludos cordiales,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.7 Freeze de cuenta (CUIDADO con tipping off)

⚠️ **CRÍTICO:** si el freeze es por sospecha AML o sanctions, **NO notificar al cliente la razón**. Usar excusa administrativa genérica. **Tipping off es crimen bajo cualquier jurisdicción AML** (incluyendo Anjouan).

```
Asunto: Neomaaa Markets — Revisión de cuenta en curso

Estimado/a [Nombre],

Te informamos que tu cuenta ha sido temporalmente pausada mientras
realizamos una revisión rutinaria de cumplimiento.

Durante este período no podrás realizar depósitos, retiros ni
operaciones nuevas. Las posiciones abiertas previamente se
mantienen bajo condiciones normales de mercado.

Este proceso puede tardar hasta [X] días hábiles. Te contactaremos
al finalizar la revisión.

Agradecemos tu paciencia.

Saludos,
Neomaaa Markets — Compliance
```

> **Nota Susana:** firmá como "Compliance" genérico en este caso, **no personal**. No des teléfono. Si el cliente insiste por detalles → respuesta estándar: "No podemos compartir detalles del proceso interno."

### 5.8 Comunicación con AOFA (SAR u otros)

```
Asunto: [SAR-YYYY-###] — Suspicious Activity Report Submission

To: [COMPLETAR: AOFA contact email oficial]
CC: [COMPLETAR: Director Neomaaa Ltd — Diego]

Estimado/a [Contacto AOFA],

Adjuntamos Suspicious Activity Report (SAR) conforme a nuestras
obligaciones regulatorias bajo la licencia L15968/N otorgada por la
Autoridad de Anjouan Offshore Finance (AOFA).

Referencia interna: NEOMAAA-SAR-[YYYY]-[###]
Fecha de detección: [YYYY-MM-DD]
Fecha de submission: [YYYY-MM-DD]

Resumen del caso:
[3–5 líneas neutras describiendo hechos, no opiniones.
Ej: "El 2026-03-10 detectamos actividad inusual en la cuenta de
un cliente retail KYC'd en noviembre 2025. Patrón de depósitos
fraccionados (12 operaciones <$10K en 14 días) seguido de retiro
del 80% de los fondos a cuenta bancaria distinta del depósito original.
Cliente no respondió a solicitud de aclaración."]

Documentación adjunta:
- SAR report completo (formato estándar)
- Logs de transacciones
- Copias de KYC inicial
- Evidencia de comunicaciones con el cliente
- Cualquier evidencia adicional relevante

Quedamos a disposición para cualquier requerimiento adicional o
información complementaria.

Atentamente,
Susana [APELLIDO COMPLETO]
Compliance Officer
Neomaaa Ltd — IBC 15968 — Licencia L15968/N
compliance@neomaaa.com
[COMPLETAR: Teléfono oficial]
```

### 5.9 Reactivación de cuenta tras freeze (cuando la revisión resolvió a favor)

```
Asunto: Neomaaa Markets — Cuenta reactivada

Estimado/a [Nombre],

Te informamos que hemos completado la revisión de tu cuenta.

Tu cuenta ha sido reactivada y podés continuar operando normalmente.

[Opcional — si aplican restricciones:] Tené en cuenta los siguientes
términos operativos actualizados: [listar].

Gracias por tu paciencia durante el proceso.

Saludos cordiales,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.10 Respuesta genérica a cliente que presiona por detalles

```
Estimado/a [Nombre],

Gracias por tu mensaje. Como indicamos previamente, no podemos
compartir detalles específicos del proceso interno de cumplimiento,
conforme a nuestras políticas AML/KYC y obligaciones regulatorias.

Te avisaremos apenas la revisión esté completa.

Apreciamos tu paciencia.

Saludos,
Neomaaa Markets — Compliance
```

---

## 6. Plantillas de respuesta al equipo

### 6.1 Para Sales que pregunta sobre cliente

```
Hola [agent],

Revisé el caso de [Cliente — nombre/email].

Categoría de riesgo: [LOW / MEDIUM / HIGH].
Acción: [puede cerrar ya / necesita EDD antes / no podemos aceptar].
Razón breve: [una línea, sin detalles legales].

[Si EDD:] Proceso estimado 5–7 días. Necesitamos del cliente:
[docs específicos]. Podés pedírselos vos o te los pido yo directamente,
como prefieras.

Si hay updates importantes en la conversación con el cliente (cambios
en fuente de fondos, país, estructura) avisame para re-evaluar.

Saludos,
Susana
```

### 6.2 Para Support que reporta cliente sospechoso

```
Hola [agent],

Gracias por el report. Abro investigación interna — SLA 48h.

Mientras tanto:
- NO interactuar con el cliente sobre este tema.
- Si el cliente escribe de nuevo sobre el mismo asunto, mandame el
  ticket y respondés con mensaje neutro ("estamos revisando, te
  contactamos pronto").
- NO mencionar "compliance" ni "investigación" al cliente.

Te aviso en 48h con la decisión.

Saludos,
Susana
```

### 6.3 Para Dealing/Pepe sobre patrón raro

```
Hola Pepe,

Ok, revisé la cuenta [ID].

[Caso A — es pattern normal:]
Es pattern consistente con [explicación: scalper, swing trader, tamaño
típico del cliente]. No hay red flag AML. Cerramos el ping acá.

[Caso B — es sospechoso:]
Es sospechoso. Abro investigación. Mientras tanto:
- [Freeze retiros pending / Limit leverage / etc. según caso]
- Mantené el trading monitoring activo en esta cuenta.
- Si hay más movimientos raros avisame inmediatamente (no esperes al
  end-of-day).

Te actualizo en [24h / 48h].

Saludos,
Susana
```

### 6.4 Para Marketing sobre targeting geográfico

```
Hola [agent],

Sobre targeting en [país]:

[País OK:] Sin restricciones. Podés correr campaña normal. Aplicá
disclaimers estándar conforme a marketing/copy-broker.md.

[País grey list FATF / medium risk:] Podés correr, pero:
- Revisá copy conmigo antes de lanzar.
- Leads de ese país entran con flag MEDIUM por default.

[País restricted:] NO. No podemos aceptar clientes de ese país.
No correr ads ni orgánico ahí.

Saludos,
Susana
```

### 6.5 Para IB/Partners sobre quality

```
Hola [IB name],

Gracias por traer los clientes. Review rápido:

- Clientes aprobados LOW RISK: [cantidad]
- Clientes en EDD: [cantidad]
- Clientes rechazados: [cantidad y razón genérica]

[Si quality es buena:] Todo ok, seguí trayendo clientes con ese perfil.
[Si hay issues:] Notamos que [X% de tus leads] terminaron en EDD o
rechazo por [razón genérica — sin detalles individuales]. Podríamos
ajustar el targeting para traer perfiles más alineados. ¿Charlamos?

Saludos,
Susana
```

---

## 7. Casos prácticos — ejemplos reales (anonimizados)

Estos son casos reales (alterados para privacidad). Léelos al menos 1 vez para internalizar patrones.

### Caso 1: PEP detectado durante onboarding (foreign PEP)

**Qué pasó:** Sumsub levantó alert PEP en un cliente brasileño durante KYC inicial.

**Investigación:**
- Source check: era asesor económico del gobernador de São Paulo (figura PEP doméstica en Brasil, **foreign PEP** desde la óptica de Anjouan).
- Verificación en bases: LinkedIn coincidía, press mentions confirmaban el rol.
- Source of funds: proporcionó contratos de consultoría privada + declaración jurada firmada.
- Family & associates: declaró que su esposa también trabajaba en administración pública (family PEP).

**Decisión:** se abrió caso EDD completo. Cliente entregó documentación en 5 días. Aprobado como HIGH RISK con:
- Monitoreo trimestral de transacciones.
- Límite mensual de depósito revisado a los 6 meses.
- Aprobación escrita de Diego archivada en case file.

**Lessons:**
- Siempre verificar PEP status + family members + close associates (spouse, hijos adultos, socios comerciales).
- No rechazar automático — PEP no es delito, es mayor due diligence.
- La decisión HIGH RISK va firmada por Diego, no sola.

### Caso 2: Sanctions match — false positive

**Qué pasó:** cliente argentino con nombre idéntico (primer y segundo nombre + apellido paterno) a una persona sancionada por OFAC (listada por narcotráfico).

**Investigación:**
- DNI argentino: CUIT y fecha de nacimiento no coincidían con la ficha OFAC.
- Foto de liveness Sumsub: persona físicamente distinta (edad, rasgos).
- Profession check: el cliente es ingeniero en una empresa mainstream, el sancionado tenía un perfil totalmente diferente.
- Ubicación: ciudades distintas.

**Decisión:** documentado como **false positive** en Sumsub con evidencia adjunta (comparativo DNI vs OFAC, fotos, biografía). Cliente aprobado LOW. Screening periódico activado por precaución.

**Lessons:**
- Nombres comunes en Latam (José López, María García) dan false positives constantemente.
- Validar SIEMPRE con combinación de: documento oficial + foto + DOB + país.
- Documentar la decisión de "false positive" con evidencia — si después aparece algo, cubrís tu espalda.

### Caso 3: Sanctions match real — acción inmediata

**Qué pasó:** cliente recién onboardeado, depósito $3K vía crypto. En re-screening semanal de la semana siguiente, Sumsub levanta match con lista UN (sanción multilateral por evasión de sanciones a un régimen específico).

**Investigación:**
- Match confirmado: misma persona (DOB + país + documento coincidían).
- El cliente había sido añadido a la lista UN 48h después del onboarding inicial.

**Decisión:**
1. **FREEZE inmediato** (misma hora de la detección).
2. Notificación a Diego (Director) vía Telegram + email.
3. NO comunicación al cliente sobre la razón (tipping off).
4. SAR preparado y enviado a AOFA en 48h.
5. Fondos retenidos — consulta legal sobre cómo proceder (no devolución automática, depende de guidance AOFA).

**Lessons:**
- Sanctions match real = 🚨 **drop everything**.
- NO devolver fondos automáticamente — puede ser "facilitación" de delito.
- SAR es obligatorio, no opcional.
- Re-screening periódico es crítico — el mundo cambia después del onboarding.

### Caso 4: Structuring (lavado por fraccionamiento) — SAR

**Qué pasó:** cliente LOW RISK aprobado en enero, operaba normal 2 meses ($500 depósitos eventuales). De repente en marzo hizo 22 depósitos en 14 días, todos entre $2.000 y $4.500.

**Investigación:**
- Patrón claro de **structuring**: fraccionamiento para evitar umbrales de reporte.
- Los depósitos venían de 3 cuentas bancarias distintas (beneficial owner aparentemente el mismo).
- Cliente intentó retiro de $60K a una cuarta cuenta bancaria distinta.

**Decisión:**
1. Hold del retiro.
2. Email genérico al cliente solicitando "clarificación sobre fuente de fondos" (plantilla 5.6, sin revelar sospecha).
3. Cliente respondió con historia inconsistente (primero dijo "trading de crypto", después "venta de auto", después "préstamo familiar").
4. SAR submitted a AOFA.
5. Cuenta cerrada, fondos retenidos pendiente guidance AOFA.

**Lessons:**
- Patterns matter más que transacciones individuales.
- Si el cliente da 3 historias distintas de SOF → red flag enorme.
- Documentá TODAS las comunicaciones con el cliente — son evidencia del SAR.
- Umbral de "muchos depósitos pequeños" es subjetivo, pero cambio drástico vs comportamiento histórico es señal.

### Caso 5: Retiro rápido post-depósito sin trading (layering)

**Qué pasó:** cliente depositó $8.000 vía wire, hizo 2 trades minúsculos (0.01 lotes total), y a los 3 días pidió retiro del 70% ($5.600) a una cuenta bancaria distinta a la del depósito.

**Investigación:**
- Patrón clásico de **layering** (segunda fase money laundering: mover dinero para dificultar rastreo).
- Hold del retiro.
- Email al cliente pidiendo explicación + documentación de la cuenta receptora.
- Cliente respondió "cambié de banco" pero no pudo documentar la cuenta nueva como propia (nombre distinto en beneficiario).

**Decisión:**
- SAR submitted.
- Cuenta cerrada.
- Fondos retenidos pendiente AOFA.

**Lessons:**
- Regla operativa: **retiros deben ir a la misma cuenta/método del depósito original** (first-in, first-out, same-destination). Si el cliente pide destino distinto → hold + investigación.
- Poco trading + retiro rápido = red flag.
- Escalá estos casos rápido. Cada día que pasa es más riesgo.

### Caso 6: Cliente corporate con estructura opaca — rechazado

**Qué pasó:** solicitud de apertura corporate: LLC en Delaware, owned por trust en Jersey, owned por otra LLC en BVI, owned por "private foundation" en Liechtenstein. UBO final declarado pero documentación del trust intermedio no verificable.

**Investigación:**
- 4 capas de structure sin justificación comercial evidente.
- UBO declarado era una persona real con perfil legítimo, pero la estructura parecía diseñada para ocultar.
- EDD solicitó: (a) contrato constitutivo de cada capa, (b) carta explicativa del propósito económico, (c) certificación de directors y nominees.
- Cliente entregó parte, pero el trust de Jersey se negó a proveer documentación interna.

**Decisión:** rechazado por incapacidad de verificar UBO end-to-end. Plantilla 5.5 enviada.

**Lessons:**
- Estructuras de 3+ capas sin propósito comercial claro = red flag default.
- "Privacidad" no es excusa suficiente. Neomaaa debe poder ver hasta el UBO real.
- No te impresiones con complejidad. Si no podés dormir tranquila con el cliente, rechazo.

### Caso 7: Media coverage negativo post-onboarding

**Qué pasó:** cliente LOW RISK operando hace 4 meses sin issues. Un domingo aparece en portada de un diario regional como investigado por "participación en esquema de corrupción pública".

**Investigación:**
- Búsqueda de fuentes: noticia aparece en 3 medios independientes, tone neutral-investigativo (no tabloide).
- Hay investigación judicial abierta pero no condena.
- Cliente no ha sido formalmente imputado aún.

**Decisión:**
- Re-categorización a HIGH RISK (escalamiento trigger).
- Ongoing monitoring intensificado.
- No freeze inmediato (aún no hay sanction ni imputación), pero monitoring semanal.
- Case file abierto en espera de evolución.
- Si hay imputación formal → freeze + SAR.

**Lessons:**
- Prensa seria = señal aún sin condena.
- No reaccionar exagerado (cliente innocent hasta prueba), pero documentar y watchar.
- Si no documentás y después hay mierda, se ve como negligencia.

---

## 8. FAQ Susana — preguntas que te vas a hacer

**P: ¿Puedo escalar a Diego sin preocuparle o molestarlo?**
R: **Sí, siempre.** Para decisiones HIGH RISK, sanctions matches, SARs, o comunicaciones con AOFA, Diego debe firmar como Director designado. No es molestia — es parte formal del proceso regulatorio. Telegram o email, lo que le sea más rápido de ver. Si es 🚨 urgente, Telegram + tag.

**P: ¿Cómo sé si un país está en grey o black list?**
R:
1. Primero: [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) sección 5 — mi versión actualizada internamente.
2. Segundo (verify source): [FATF oficial](https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html).
3. Tercero (sanctions específicas): UN, OFAC (USA), EU, UK, OFSI listas consolidadas.
4. **Actualizá el risk-matrix.md** cada trimestre (feb, jun, oct) tras publicación FATF.

**P: ¿Qué hago si Sales me presiona para aprobar rápido (quieren cerrar el mes)?**
R: **Tu job es compliance, no sales.** Si el caso requiere EDD, cumplís el proceso completo. Si Sales presiona:
1. Respondeles en canal de equipo (con copia a Diego si sigue): "Este caso requiere EDD por [razón]. Proceso estimado 5–7 días. No puedo saltearlo."
2. Si siguen presionando, escalá a Diego directo.
3. NO te comprometés. Si apruebas algo que no deberías y después explota, la responsable sos vos legalmente, no el sales agent. Eso es lo más importante que tenés que entender.

**P: ¿Cuándo contrato un Compliance Junior?**
R: Triggers:
- 200+ casos/mes y ya te saturás → empezar búsqueda.
- 500+ casos/mes → urgente, ya deberías tenerlo.
- Menos de 200 y tenés tiempo → enfocate en refinar SOPs, hacer certificaciones, auditar casos cerrados.
- Conversar con Diego con datos reales, no sensaciones.

**P: ¿Puedo usar IA (Claude, ChatGPT) para compliance?**
R:
- **Para research background:** sí (ej. "hazme un resumen de FATF recommendations 10"). No metas datos personales de clientes.
- **Para redactar plantillas y emails:** sí.
- **Para decisiones finales:** NO. Todo debe tener tu judgment humano documentado. Si un auditor te pregunta "por qué aprobaste este cliente" y tu respuesta es "porque Claude dijo que sí", perdés.
- **Regla:** IA es asistente, no Compliance Officer.
- **Privacidad:** no pegues DNIs, fotos, direcciones, datos bancarios en prompts públicos. Usá proveedor enterprise / on-premise si es dato sensible.

**P: ¿Qué pasa si me equivoco en una decisión?**
R:
- **Error con proceso documentado + good faith = sin penalización personal.** La industria lo entiende, los reguladores también. Documentá tu razonamiento siempre.
- **Error por negligencia (no hiciste el proceso) = exposición.** Tu firma personal está en juego.
- **Error por fraude o colusión = cárcel.** No es broma. En AML/KYC la responsabilidad personal del Compliance Officer es real.
- Moraleja: mejor un "no" documentado que un "sí" sin papel.

**P: ¿Qué es "tipping off" exactamente?**
R: Es el delito de **avisar al cliente que estamos investigándolo o que presentamos un SAR**. Es crimen independiente del lavado. Aunque el cliente sea inocente, si le avisás de la investigación, cometés delito.
- NUNCA decir "estamos reportando tu actividad a AOFA".
- NUNCA decir "suspecha de lavado".
- NUNCA decir "presentamos un SAR".
- NUNCA reenviar emails internos a clientes.
- Siempre usar lenguaje administrativo genérico (plantilla 5.7).

**P: Si un cliente me demanda por la decisión de rechazar o cerrar, ¿qué pasa?**
R:
- Neomaaa tiene el derecho contractual (T&C) y regulatorio de rechazar/cerrar cuentas por razones de compliance sin explicación detallada.
- La demanda típicamente se desestima si tenés documentación del proceso.
- **Por eso documentás todo.** El archivo del caso es tu defensa.
- Escalá a Diego apenas recibís amenaza legal — responde el abogado, no vos sola.

**P: ¿Qué hago si siento que Diego o Angel me piden aprobar algo "porque es un amigo" o "porque es importante"?**
R:
- Lo escribís y pedís por escrito. "Diego, me pedís aprobar la cuenta de X sin EDD completo. ¿Podés confirmármelo por escrito?"
- Si acepta → archivá el email. En caso de auditoría, es la responsabilidad del Director, no tuya.
- Si no quiere ponerlo por escrito → **NO lo hagas.** Eso es señal de que él mismo sabe que está mal.
- Tu integridad es tu activo. Perderla una vez = perdés credibilidad para siempre con reguladores y equipo.

**P: ¿Puedo compartir info de casos con otros equipos (Sales, Support)?**
R:
- **Need-to-know basis.** Solo lo estrictamente necesario para que ellos hagan su trabajo.
- Ejemplo ok: "El cliente X está en EDD, no cerrar todavía."
- Ejemplo NO ok: "El cliente X tiene alerta PEP porque fue asesor del gobierno de Y, además su esposa trabaja en Z." (ese nivel de detalle solo lo necesitás vos).
- En case files: datos completos. En comunicación al equipo: lo mínimo.

**P: ¿Qué herramientas debo dominar sí o sí?**
R:
1. **Sumsub** (KYC / screening principal).
2. **Skale CRM** (donde están los clientes).
3. **MT5 back office** (ver trading data para investigations).
4. **Excel / Google Sheets** (logs, SAR tracking).
5. **Notion** (case files internos, SOPs).
6. **Intercom** (lectura de conversaciones con clientes cuando hacés investigation).

### Stack tecnológico compliance — por fase de crecimiento

**Fase 1 (actual — 0 a 500 clientes):**
- Sumsub (KYC + screening + ongoing monitoring).
- Skale CRM (gestión de clientes).
- Google Sheets (registro de compliance — ver [compliance-calendar sección Record Keeping](/content/compliance/compliance-calendar)).
- Procesos manuales de Susana para monitoreo.

**Fase 2 (500 a 2.000 clientes):**
- Todo lo de Fase 1.
- Agregar: sistema de case management (Hummingbird, ComplyAdvantage o similar) cuando spreadsheets se queden cortos.
- Agregar: monitoreo semi-automatizado de transacciones (reglas en Skale o herramienta dedicada).
- Agregar: dashboard automatizado de compliance.
- Contratar: segundo compliance analyst (ver [compliance-calendar sección 11](/content/compliance/compliance-calendar)).

**Fase 3 (2.000+ clientes o expansión a Mauritius/Seychelles/CySEC/FCA):**
- Todo lo anterior.
- Evaluar: Refinitiv World-Check como complemento de screening.
- Implementar: sistema de transaction monitoring dedicado (NICE Actimize o equivalente).
- Implementar: programa de capacitación formalizado con evaluaciones por rol.
- Contratar: compliance team 3-5 personas según jurisdicciones + MLRO dedicado por entidad regulada.
- Evaluar: Onfido como backup/complemento de Sumsub si expansión a jurisdicción exige doble proveedor.

### Benchmarks de industria — qué hacen los mejores brokers

Los siguientes estándares salen de benchmark de Exness (CySEC+FCA+FSCA+FSA), IC Markets (ASIC+CySEC+FSA+SCB), Pepperstone (FCA+ASIC+CySEC+BaFin+DFSA). **NEOMAAA hoy opera con licencia Anjouan (requisitos menos estrictos), pero construye infraestructura escalable desde ahora** para:

1. Preparar expansión regulatoria sin retrofitting doloroso.
2. Mejorar relaciones bancarias y PSPs (evalúan compliance robusto).
3. Proteger el negocio ante incidentes.

**Tiempos de respuesta — target NEOMAAA (inicio → maduro):**

| Proceso | Industry standard top brokers | NEOMAAA inicio | NEOMAAA maduro |
|---|---|---|---|
| Verificación KYC Tier 1 | <60 segundos (automático) | <5 minutos | <60 segundos |
| Verificación KYC Tier 2 | <4 horas | <24 horas | <4 horas |
| Verificación KYC Tier 3 (EDD) | 1-3 días hábiles | 1-5 días hábiles | 1-3 días hábiles |
| Revisión de sanctions hit | <4 horas | <24 horas (mismo día críticos) | <4 horas |
| Resolución false positive | <2 horas | <24 horas | <4 horas |
| Presentación de SAR | Dentro 24h de decisión | Dentro 48h | Dentro 24h |

**Modelo de tres líneas de defensa (Pepperstone / FCA estándar):**
- 1ra línea: front office (ventas, soporte, dealing) — identifican riesgos en su área.
- 2da línea: Susana (compliance) — monitorea, revisa, hace cumplir.
- 3ra línea: auditoría trimestral de Principals (Diego + Yulia) — evalúa la efectividad de las primeras dos.

**Ratios de personal compliance (industry standard):**
- 2-5 personas de compliance por cada 1.000 clientes activos.
- NEOMAAA actual: 1 persona (Susana) — adecuado hasta ~500 clientes.
- MLRO dedicado por cada jurisdicción regulada (relevante cuando haya expansión).

**Capacitación (industry standard):**
- Compliance officer: trimestral + continua (self-study + certs).
- Todo el equipo client-facing: semestral mínimo (NEOMAAA) / trimestral (top brokers).
- Inducción AML obligatoria el primer día antes de interactuar con clientes.
- Test post-capacitación con umbral mínimo 80%.

**Dónde NEOMAAA debe superar el mínimo AOFA:**

| Área | Por qué superar el mínimo | Beneficio |
|---|---|---|
| Documentación de decisiones | AOFA no especifica formato pero ante auditoría es crítico | Preparación auditorías + expansión |
| Ongoing monitoring de sanciones | Las listas se actualizan constantemente | Protección contra riesgo sanciones |
| Capacitación del equipo | AOFA no especifica frecuencia | Reduce riesgo incumplimiento accidental |
| Monitoreo de transacciones | AOFA pide básico | Protección contra lavado / fraude |
| Risk scoring por cliente | Permite decisiones más informadas | Mejor gestión de riesgo |

**Principios adoptados de Exness / IC Markets / Pepperstone implementados en NEOMAAA:**

- Política AML con estructura modular (global + adendas jurisdicción) — ya preparado aunque solo haya una jurisdicción hoy.
- Liveness check obligatorio en todos los tiers — implementado con Sumsub.
- Comité de compliance mensual (Susana + Principals) — ver [compliance-calendar M8](/content/compliance/compliance-calendar).
- Capacitación AML para TODOS los empleados, no solo compliance — ver [compliance-calendar secciones M6 + A4](/content/compliance/compliance-calendar).
- Risk scoring manual por cliente — ver [risk-matrix](/content/compliance/risk-matrix).
- Dashboards manuales en Google Sheets hoy, automatizados cuando volumen lo justifique.

**P: ¿Cada cuánto tengo que actualizar los SOPs?**
R:
- **Risk-matrix:** cada vez que FATF actualiza listas (3x año).
- **SAR procedure:** anual o cuando cambia regulación AOFA.
- **Manual compliance:** anual, con sign-off de Diego.
- **Playbook (este doc):** mensual, agregando lessons learned.
- Más detalle: [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar).

**P: ¿Qué hago si AOFA me pide info y no sé si puedo dársela?**
R: **NUNCA respondas sola a AOFA.** Los pasos son:
1. Acusar recibo del email / llamada sin dar información.
2. Notificar Diego inmediato.
3. Consultar con abogado externo si es requerimiento formal.
4. Responder solo lo que esté autorizado, por escrito, con sign-off de Diego.
- Regla: si dudás si podés decir algo → **no lo digas**. Siempre mejor "necesito verificar con mi Director y respondo en X horas."

---

## 9. Auto-aprendizaje — tu training continuo

Compliance es un rol que **nunca termina de aprenderse**. El que no se actualiza se queda atrás en 12 meses.

### Week 1–4 (onboarding intensivo)

- [ ] Leer todos los docs de `/content/compliance/*` en orden (empezando por `manual-susana.md`).
- [ ] Leer `/content/legal/aml-kyc-policy.md` y `/content/legal/terms-conditions.md`.
- [ ] Shadow Diego en 3–5 decisiones de compliance (observar sin intervenir).
- [ ] Setup herramientas: Sumsub dashboard, OFAC + UN + EU sanctions lists bookmarks, Skale CRM, MT5 back office.
- [ ] Crear tu case file template personal (Notion o Excel) para tracking diario.
- [ ] Conocer al equipo: Sales (Franco, Edward, Luis), Pepe (Dealing), Angel, Yulia.

### Month 2–3 (manejo autónomo LOW/MEDIUM)

- [ ] Manejar casos LOW y MEDIUM sin supervisión (con escalamiento opcional a Diego).
- [ ] HIGH RISK: escalamiento obligatorio a Diego, pero vos ya hacés la investigación previa.
- [ ] Primer monthly report interno (casos trabajados, categorías, alerts, tendencias).
- [ ] Familiarizarte con Sumsub avanzado (custom rules, re-screening automático).

### Month 4–6 (autonomía HIGH RISK y SARs)

- [ ] Manejar casos HIGH RISK con aprobación escrita Diego.
- [ ] Primer SAR (si aplica). Repasar el proceso con Diego antes de submit.
- [ ] Refinar SOPs con lessons learned. Agregar al playbook y a los docs relevantes.
- [ ] Iniciar estudio para certificación (ACAMS CAMS recomendado).

### Month 6+ (rol senior)

- [ ] Evaluar contratación Junior si el volumen lo justifica.
- [ ] Iniciar training formal (ACAMS o ICA — ver abajo).
- [ ] Participar en industry updates: FATF newsletters, ACAMS webinars, AOFA updates.
- [ ] Hacer 1 audit interno trimestral de tus propios casos cerrados (self-review).
- [ ] Liderar trainings internos al equipo (Sales, Support) — 1x por trimestre.

### Certificaciones recomendadas (en orden de prioridad)

| Cert | Costo | Duración | Por qué |
|---|---|---|---|
| **ACAMS CAMS** (Certified Anti-Money Laundering Specialist) | ~$1.500 USD | 6 meses study | Estándar global. Si tenés UNA sola cert, que sea esta. Te da credibilidad inmediata ante reguladores y clientes corporate. |
| **ICA Diploma in Anti Money Laundering** (International Compliance Association) | ~£2.000 GBP | 9 meses | Más profundidad teórica. Buena si planeás hacer carrera en compliance internacional. |
| **FATF training modules** | Free | 10–20h total | No da cert formal pero es gold-source. Hacerlos siempre. |
| **FINRA / SEC webinars** (free) | Free | On demand | Para regulación USA — útil si expandimos a mercado americano. |
| **AOFA specific training** (si existe) | Varies | Varies | Verificar con AOFA directamente. |

**Propuesta:** arrancar CAMS en mes 6. Completar en mes 12. Después CAMS-Audit o CAMS-Risk Management especialización en año 2.

### Recursos gratuitos útiles (para leer en dead time)

- [FATF.org](https://www.fatf-gafi.org) — recomendaciones, tipologies, country reports.
- [Wolfsberg Group papers](https://www.wolfsberg-principles.com) — best practices banca privada (aplicable a broker retail y HNW).
- [ACAMS Today](https://www.acamstoday.org) — magazine free con casos reales.
- [Transparency International](https://www.transparency.org) — corruption perceptions index (útil para risk-matrix).
- [OCCRP](https://www.occrp.org) — investigaciones de crimen organizado (entender cómo opera real el lavado).

---

## 10. Contactos rápidos

| Situación | Contacto primario | Backup |
|---|---|---|
| 🚨 Emergencia compliance (sanctions match, AOFA request, subpoena) | Diego — Telegram + email | Yulia |
| Aprobación HIGH RISK o SAR | Diego (Director designado) | Yulia (si Diego no disponible >4h) |
| Consulta técnica KYC / Sumsub | Sumsub support (chat dashboard) | [COMPLETAR: Customer Success Manager asignado] |
| Consulta legal compleja | [COMPLETAR: nombre + email abogado externo] | Diego |
| Cliente pregunta sobre mi decisión | Reenviar a compliance@neomaaa.com (vos misma) | — |
| IT issues (Sumsub / Skale / MT5 back office) | [COMPLETAR: contacto IT / Angel] | Angel |
| AOFA oficial (cualquier comunicación) | [COMPLETAR: email + teléfono oficial AOFA] | Via abogado externo |
| Dealing / trading patterns | Pepe (Head of Dealing) | — |
| Sales team escalation | Franco / Edward / Luis (lead que corresponda) | Diego |
| Marketing targeting | [Marketing lead] | Diego |
| Partners / IB issues | [Partners lead] | Diego |

---

## 11. Mi info personal operativa

Sección para que Susana complete con su data. Mantener actualizada.

- **Email oficial:** compliance@neomaaa.com ✓ activo
- **Email personal backup (interno):** [COMPLETAR]
- **Telegram / WhatsApp para emergencias equipo:** [COMPLETAR]
- **Teléfono oficial declarado a AOFA:** [COMPLETAR]
- **Director designado (primera línea):** Diego Loyola
- **Backup Director (si Diego no disponible >4h):** Yulia
- **Abogado externo (compliance / regulatorio):** [COMPLETAR: nombre, firma, email, teléfono]
- **Abogado externo (litigios):** [COMPLETAR]
- **Mi certification target próximos 12 meses:** [COMPLETAR — recomendación default: ACAMS CAMS]
- **Mi próxima revisión con Diego (quarterly):** [COMPLETAR: fecha]
- **Carpeta personal de case files:** [COMPLETAR: ubicación — Google Drive / Notion / local encryptada]
- **Vault de passwords compliance tools:** [COMPLETAR: 1Password / Bitwarden]

---

## 12. Reglas de oro (no olvidar nunca)

1. **Documentá todo.** Email, decisión, razonamiento, evidencia. Papel es defensa.
2. **Ante la duda, escalá.** Diego prefiere 10 escalamientos innecesarios a 1 error grave.
3. **NO tipping off.** Nunca avises al cliente que está bajo investigación o SAR.
4. **Tu firma es tu responsabilidad.** Si aprobás algo, sos responsable legalmente. Si rechazás con buen criterio documentado, estás protegida.
5. **Compliance no negocia con Sales.** El proceso es el proceso. Presión comercial no cambia riesgo regulatorio.
6. **Los patrones importan más que las transacciones individuales.** Pensá en tendencia y contexto, no solo en la operación aislada.
7. **Actualización continua.** Lo que era best practice hace 2 años hoy puede ser insuficiente. FATF, AOFA, OFAC cambian.
8. **Integridad > popularidad interna.** Vas a decir "no" más veces de las que vas a decir "sí". Está bien.
9. **Privacidad del cliente se cuida hasta el final.** Incluso cuando lo estás investigando. Need-to-know basis.
10. **Si no podés dormir tranquila con una decisión → no la tomes.** Escalá o rechazá. Tu intuición es señal.

---

**Este playbook se actualiza mensualmente.** Cualquier nuevo caso que genere learnings importantes → agregar a sección 7 (casos prácticos). Cualquier pregunta frecuente nueva del equipo → agregar a sección 8 (FAQ). Cualquier plantilla que uses >3 veces → agregar a sección 5 o 6.

**Versión:** 1.0 — 2026-04-13.
**Próxima revisión programada:** 2026-05-13.
**Approved by:** Diego (Director Neomaaa Ltd).
