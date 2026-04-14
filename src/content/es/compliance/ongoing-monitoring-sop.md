# Ongoing Monitoring SOP — Monitoreo Continuo de Cuentas

**Documento operativo interno — CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

> **PROPOSITO DEL DOCUMENTO**
>
> KYC no termina cuando el cliente se onboardea. FATF Recommendation 10 exige **ongoing due diligence** — monitoreo continuo durante toda la vida del cliente. Este SOP le da a Susana:
>
> - Que monitoreamos exactamente (transactional, identity, behavioral)
> - Que dispara cambios de risk category post-onboarding
> - Proceso mensual paso a paso de monitoring cycle
> - Checklist HIGH RISK para revision individual
> - Triggers de accion inmediata fuera del ciclo mensual
> - Templates de actions (freeze, re-categorizar, close)

---

## 1. Que es ongoing monitoring y por que es obligatorio

El ongoing monitoring es el proceso continuo de vigilancia sobre un cliente ya onboardeado. Cubre:

- Coherencia de transacciones con el perfil declarado al abrir cuenta
- Deteccion de cambios materiales en identidad, status, comportamiento
- Identificacion de red flags que no existian en onboarding pero emergen despues
- Ajuste de risk category segun evoluciona la relacion

### 1.1 Fundamento regulatorio

**FATF Recommendation 10 — Customer Due Diligence (CDD):**

> "Financial institutions should conduct ongoing due diligence on the business relationship and scrutiny of transactions undertaken throughout the course of that relationship to ensure that the transactions being conducted are consistent with the institution's knowledge of the customer, their business and risk profile, including, where necessary, the source of funds."

Traducido a lo operativo: **NEOMAAA debe vigilar cada cuenta activa, de forma continua, verificando que la actividad sigue siendo consistente con lo que el cliente declaro**.

### 1.2 Por que es critico

| Escenario | Sin monitoring | Con monitoring |
|---|---|---|
| Cliente LOW RISK que empieza a lavar fondos 6 meses post-onboarding | Se detecta tarde o nunca — riesgo regulatorio enorme | Se detecta en el siguiente monthly review, accion |
| Cliente que se vuelve PEP post-onboarding | NEOMAAA no lo sabe, sigue en LOW RISK | Re-scan mensual lo detecta, se escala a HIGH |
| Cliente aparece en sanctions list nueva | Violacion de sanciones sin saberlo | Re-scan mensual bloquea a tiempo |
| Patron de trading cambia a wash trading | Dealing lo nota tarde | Monthly review lo detecta |

Sin ongoing monitoring, NEOMAAA pierde control total de su base de riesgo en cuanto se cierra el onboarding. Con monitoring, el broker tiene pulso constante.

---

## 2. Que monitoreamos — las 3 dimensiones

### 2.1 Dimension TRANSACTIONAL

Todo lo que tiene que ver con dinero moviendose.

| Aspecto | Que se vigila |
|---|---|
| Depositos | Monto, frecuencia, metodos usados, fuente del fondo, jurisdiccion origen |
| Trading | Volumen, frecuencia, instrumentos operados, P&L, patron win/loss |
| Retiros | Destino, frecuencia, monto, metodo, jurisdiccion destino |
| Fees | Comisiones pagadas, consistencia con volumen |
| Transferencias internas | Entre cuentas del mismo cliente o entre clientes |

### 2.2 Dimension IDENTITY

Todo lo que tiene que ver con quien es el cliente.

| Aspecto | Que se vigila |
|---|---|
| Datos personales | Cambios de direccion, nombre, email, telefono |
| Documentacion | Vencimiento de pasaporte / ID / POA |
| Nacionalidad | Cambio de nacionalidad o residencia |
| PEP status | Aparicion post-onboarding como PEP (propio o familiar) |
| Sanctions | Nuevo match en listas OFAC / UN / EU |
| Adverse media | Publicaciones negativas sobre el cliente |
| UBO (corporate) | Cambios en beneficial ownership |

### 2.3 Dimension BEHAVIORAL

Todo lo que tiene que ver con como actua el cliente.

| Aspecto | Que se vigila |
|---|---|
| Contacto con soporte | Frecuencia, tipo de consultas, tono |
| Quejas | Cantidad, motivos, escalamientos |
| Reports internos | Sales / Support / Dealing reportan algo raro |
| Cambios de patron | Cliente que operaba moderado empieza a operar agresivo sin razon |
| Intentos de ofuscacion | Preguntas evasivas, cambios de version, etc. |
| Login patterns | IPs sospechosas, paises distintos a residencia, VPN intensivo |

---

## 3. Automatizado vs manual — quien hace que

El monitoring combina automatizacion (Sumsub + CRM + alertas) con revision humana (Susana).

### 3.1 Automatizado (Sumsub + Skale CRM)

| Funcion | Frecuencia | Output |
|---|---|---|
| PEP re-scan sobre base completa | Mensual | Lista de PEP matches nuevos |
| Sanctions re-scan sobre base completa | Mensual | Lista de sanctions matches nuevos |
| Adverse media re-scan | Mensual | Lista de menciones negativas nuevas |
| Transaction threshold alerts | Real-time | Alertas cuando deposito > threshold, retiro > threshold, etc. |
| Geographic anomaly alerts | Real-time | Login desde pais distinto al de residencia |
| Volume spike alerts | Real-time | Trading volume > X veces el promedio del cliente |

### 3.2 Manual (Susana)

| Funcion | Frecuencia | Output |
|---|---|---|
| Review HIGH RISK uno por uno | Mensual | Checklist completado + decision (mantener/downgrade/escalar) |
| Review MEDIUM RISK muestreo | Mensual | Sample review + ajustes |
| Review LOW RISK masivo | Anual | Verificacion de que siguen siendo LOW |
| Investigation de alerts automaticas | Continuo | Case file + resolucion |
| Escalamiento a EDD | Segun trigger | EDD case abierto |
| Escalamiento a SAR | Segun trigger | SAR preparado |

---

## 4. Triggers que cambian risk category post-onboarding

El risk profile de un cliente no es estatico. Se ajusta segun evolucion. Estos son los triggers concretos.

### 4.1 Se mantiene o baja riesgo

| Situacion | Efecto |
|---|---|
| 12+ meses trading normal, sin issues, sin alertas | LOW se confirma y se consolida; MEDIUM puede downgrade a LOW despues de 24 meses sin issues |
| Documentacion updated y consistent | Mantiene categoria actual |
| Stable pattern de trading y depositos | Mantiene categoria actual |
| PEP que termino cargo hace >24 meses + sin issues | HIGH puede downgrade a MEDIUM |

### 4.2 Sube riesgo LOW → MEDIUM

| Trigger | Por que |
|---|---|
| Depositos empiezan desde pais FATF grey list | Jurisdiccion de mayor riesgo |
| Cliente cambia metodo principal a crypto sin explicacion | Menor trazabilidad |
| Volumen trading > 5x el perfil declarado | Inconsistencia con KYC |
| Cliente cambia residencia a pais de mayor riesgo | Cambio geografico de riesgo |
| Nuevo match PEP de familiar cercano | Exposicion politica indirecta |
| Cliente tiene multiples tickets de soporte con preguntas evasivas | Patron behavioral sospechoso |
| Cliente se vuelve IB activo (trae otros clientes) | Mayor exposure a network |

### 4.3 Sube riesgo MEDIUM → HIGH

| Trigger | Por que |
|---|---|
| Cliente ahora PEP confirmado (el mismo) | Exposicion politica directa |
| Sanctions match real (no false positive) | Obligacion legal |
| Adverse media con signos de crimen | Riesgo reputacional + real |
| Suspicious pattern detectado (structuring, wash trading) | Senal fuerte de lavado |
| Cliente reportado en investigacion criminal (publica o subpoena) | Riesgo directo |
| Multiples retiros a jurisdicciones distintas sin explicacion | Patron de ofuscacion |
| Cliente se niega a responder pedidos de info adicional | Falta de cooperacion |

### 4.4 Accion inmediata independiente de categoria

| Trigger | Accion |
|---|---|
| Sanctions match confirmado | Freeze inmediato + SAR evaluation |
| Orden judicial / subpoena | Ejecutar segun orden legal |
| Regulador (AOFA) solicita freeze | Freeze inmediato |
| Denuncia interna con evidencia concreta | Investigation inmediata |

---

## 5. Proceso mensual paso a paso (monthly monitoring cycle)

Esto es lo que Susana ejecuta el primer viernes de cada mes (ligado a compliance-calendar.md tareas M1-M4).

### 5.1 Flujo completo del ciclo mensual

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Setup del mes"><div>Exportar lista completa de clientes activos del CRM. Filtrar por risk category (LOW / MEDIUM / HIGH). Preparar dashboard de monitoring con los KPIs del mes anterior para comparar.</div></div>
<div className="neo-step" data-num="2" data-title="Review HIGH RISK (semana 1)"><div>Uno por uno, aplicar el checklist de seccion 6. Es revision exhaustiva, no muestreo. Todos los HIGH RISK se tocan cada mes.</div></div>
<div className="neo-step" data-num="3" data-title="Review MEDIUM RISK (semana 2)"><div>Muestreo: top 20% por volumen del mes + aleatorio 10% del resto. Review mas light pero estructurado. Foco en cambios de patron.</div></div>
<div className="neo-step" data-num="4" data-title="Automated alerts review (continuous)"><div>Revisar alerts del CRM del mes: deposits anomalies, withdrawal patterns, trading spikes, geo anomalies. Cada alert: investigar, documentar, decidir accion.</div></div>
<div className="neo-step" data-num="5" data-title="Sumsub automated scans"><div>Verificar que corrieron los scans mensuales (PEP, sanctions, adverse media). Revisar matches nuevos. Resolver cada uno: false positive / investigar / escalar.</div></div>
<div className="neo-step" data-num="6" data-title="Reclasificacion"><div>Clientes que cambiaron de perfil material → update risk category en CRM + Sumsub. Documentar razon en el file del cliente.</div></div>
<div className="neo-step" data-num="7" data-title="Escalamientos"><div>Clientes nuevos en HIGH RISK → notificar Director. Casos que llegan a nivel SAR → abrir proceso segun sar-reporting.md. EDD nuevo → abrir caso EDD.</div></div>
<div className="neo-step" data-num="8" data-title="Documentacion + report"><div>Archivar todos los checklists del mes. Integrar metricas al monthly report al Director (compliance-calendar.md M8).</div></div>
</div>

### 5.2 Asignacion semanal del ciclo mensual

| Semana del mes | Foco |
|---|---|
| Semana 1 (primer viernes + lunes-jueves siguiente) | Setup + HIGH RISK review |
| Semana 2 | MEDIUM RISK muestreo + investigations |
| Semana 3 | LOW RISK spot check + documentation housekeeping |
| Semana 4 | Alerts review acumulados + prep monthly report |

---

## 6. Checklist operativo HIGH RISK — monthly review

Para cada cliente HIGH RISK, Susana completa **este checklist completo, cada mes**. Es evidencia formal de cumplimiento.

```markdown
# HIGH RISK CLIENT — MONTHLY REVIEW

**Cliente:** [nombre completo]
**Account ID (CRM):** [ ]
**Risk category:** HIGH RISK
**Fecha review:** [DD/MM/YYYY]
**Reviewer:** Susana — Compliance Officer
**Periodo revisado:** [01/MM/YYYY — ultimo dia/MM/YYYY]

---

## 1. Transactional review

**Depositos del periodo:**
- Cantidad: [ ]
- Monto total: [ ]
- Metodos usados: [ ]
- Jurisdicciones de origen: [ ]
- Consistent con profile: [ ] YES [ ] NO — si NO, explicar: [ ]

**Trading del periodo:**
- Volumen total: [ ]
- Instrumentos operados: [ ]
- P&L neto: [ ]
- Patron (agresivo / moderado / pasivo): [ ]
- Consistent con profile: [ ] YES [ ] NO — si NO, explicar: [ ]

**Retiros del periodo:**
- Cantidad: [ ]
- Monto total: [ ]
- Destinos (jurisdiccion + metodo): [ ]
- Beneficiario coincide con cliente: [ ] YES [ ] NO
- Consistent con profile: [ ] YES [ ] NO — si NO, explicar: [ ]

---

## 2. Identity review

- [ ] Documentacion aun vigente (ID, pasaporte, POA no expirados)
- [ ] No cambios de direccion no declarados
- [ ] No cambios de nacionalidad / residencia
- [ ] Sumsub PEP re-scan corrido este mes: [ ] YES [ ] NO — resultado: [ ]
- [ ] Sumsub sanctions re-scan corrido este mes: [ ] YES [ ] NO — resultado: [ ]
- [ ] Adverse media search corrido: [ ] YES [ ] NO — resultado: [ ]

---

## 3. Behavioral review

- [ ] Sin tickets de soporte sospechosos este mes
- [ ] Sin quejas materiales
- [ ] Sin reports internos negativos (Sales / Dealing)
- [ ] Patron de login consistente (IPs, paises, device)

---

## 4. Overall assessment

**Decision:**
- [ ] MAINTAIN HIGH RISK (continuar monitoring nivel actual)
- [ ] DOWNGRADE TO MEDIUM RISK (justificacion abajo)
- [ ] ESCALATE (acciones: freeze / EDD adicional / SAR / close)

**Justificacion de la decision:**
[parrafo explicativo]

**Red flags observados este mes (si aplica):**
[lista]

**Proximo review programado:** [DD/MM/YYYY] (siempre primer viernes del mes siguiente para HIGH)

---

**Reviewer signature:** Susana _________________ Date: [ ]
**Director approval (if escalated):** _________________ Date: [ ]

**Archivado en:** Compliance/HighRisk/[YYYY]/[nombre cliente]/[MM-YYYY].md
**Retencion:** 7 anos desde closure de la cuenta
```

---

## 7. Triggers de accion inmediata (no esperan monthly review)

Algunos eventos **no pueden esperar** al ciclo mensual. Se actua en el momento.

### 7.1 Accion inmediata (mismo dia)

| Evento | Accion |
|---|---|
| Sanctions match confirmado (no false positive) | Freeze cuenta + notificar Director + evaluar SAR |
| Cliente aparece en investigacion criminal publica | Freeze + legal review |
| Request legal oficial (subpoena, freeze order, court order) | Ejecutar orden + coordinar con legal |
| Transaccion sospechosa de monto muy grande en curso | Pausar transaccion si posible + investigar |
| Whistleblower interno con evidencia | Investigacion confidencial inmediata |

### 7.2 Accion en 48h

| Evento | Accion |
|---|---|
| PEP match nuevo (cliente o familiar directo) | EDD + update risk category |
| Adverse media publicado con signos de crimen | Investigation + evaluar SAR |
| Reporte sospechoso del equipo (Sales/Support/Dealing) | Abrir caso + investigar |
| Cambio brusco de patron trading o depositos | Investigation + posible contacto cliente |

### 7.3 Accion en 1 semana

| Evento | Accion |
|---|---|
| Risk category upgrade propuesto (MEDIUM → HIGH) | Review + documentar + aplicar |
| Pattern change observado (no urgente) | Investigation en siguiente monthly cycle |
| Documentacion por vencer en < 30 dias | Contactar cliente para renovacion |

---

## 8. Templates de actions

### 8.1 Template — Request info adicional al cliente post-onboarding

```markdown
Asunto: Actualizacion de informacion de tu cuenta NEOMAAA

Hola [Nombre],

Como parte de nuestras obligaciones regulatorias continuas bajo la
licencia L15968/N, necesitamos actualizar informacion de tu cuenta.

Por favor, enviar los siguientes documentos / aclaraciones:

- [item 1]
- [item 2]
- [item 3]

Plazo: 7 dias desde la fecha de este email.

Si tienes consultas sobre este pedido, responde a este mismo hilo.

Importante: La no respuesta en el plazo puede resultar en limitacion
temporal de la cuenta hasta completar la informacion.

Gracias por tu cooperacion,
[Firma — equipo soporte o compliance segun corresponda]
```

**Nota importante:** Este email NO debe sugerir que el cliente esta siendo investigado. Tono neutro, regulatorio-rutinario.

### 8.2 Template — Internal freeze notification (a Dev / Ops)

```markdown
Asunto: [COMPLIANCE] Freeze cuenta — urgente

**Cliente:** [nombre]
**Account ID:** [ ]
**Fecha freeze:** [DD/MM/YYYY HH:MM]
**Tipo de freeze:**
  [ ] Full freeze (no deposits, no trading, no withdrawals)
  [ ] Partial freeze (trading allowed, withdrawals blocked)
  [ ] Withdrawal-only freeze (retiros bloqueados, resto permitido)

**Razon (interna — NO compartir con cliente):**
[breve descripcion]

**Duracion:**
  [ ] Indefinido pendiente resolucion compliance
  [ ] Hasta [DD/MM/YYYY]
  [ ] Hasta recibir instruccion de AOFA

**Accion si el cliente pregunta:**
Responder con guion estandar: "Tu cuenta esta bajo revision rutinaria
de compliance. Te contactaremos en cuanto concluya." NO dar mas detalles.

**Aprobado por:** Susana — Compliance Officer
**Director notificado:** [ ] YES [ ] NO
```

### 8.3 Template — Update risk category en CRM (steps)

1. Abrir ficha del cliente en Skale CRM
2. Ir a tab "Compliance" / "Risk Profile"
3. Cambiar campo "Risk Category" a nueva categoria
4. En el campo "Change reason" escribir: "[fecha] — [razon corta] — Susana"
5. Guardar
6. Verificar que Sumsub sincronizo el cambio (si no, forzar manual)
7. Si subida a HIGH: configurar alerts mas estrictos en CRM (threshold mas bajos)
8. Si bajada a LOW: mantener flag historico "previously HIGH RISK" por 24 meses
9. Documentar en file compliance del cliente: `Compliance/RiskChanges/[YYYY]/[cliente]-[MM-DD].md`

### 8.4 Template — Close account (cliente rechazado post-onboarding)

**Email al cliente:**

```markdown
Asunto: Cierre de tu cuenta NEOMAAA

Hola [Nombre],

Tras revision interna, hemos decidido finalizar nuestra relacion
comercial y proceder al cierre de tu cuenta NEOMAAA (ID: [ ]).

Esta decision es definitiva y no requiere explicacion adicional,
segun los terminos y condiciones aceptados al abrir la cuenta
(clausula de cierre unilateral).

**Proximos pasos:**
1. Posiciones abiertas seran cerradas a precio de mercado en [fecha]
2. Fondos remanentes seran devueltos al metodo de deposito original,
   sujetos a verificacion compliance
3. Plazo estimado: [X] dias habiles

Si los fondos no pueden ser devueltos al metodo original, se
coordinara metodo alternativo conforme a nuestras obligaciones
regulatorias.

Gracias,
[Firma]
```

**Proceso interno:**

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Aprobacion Director"><div>Cierre de cuenta requiere aprobacion Director (Diego o Yulia). Documentar en caso.</div></div>
<div className="neo-step" data-num="2" data-title="Notificar cliente"><div>Enviar email de cierre con template 8.4. No dar detalles especificos de la razon.</div></div>
<div className="neo-step" data-num="3" data-title="Cerrar posiciones"><div>Coordinar con Dealing para cierre ordenado de posiciones abiertas.</div></div>
<div className="neo-step" data-num="4" data-title="Compliance check fondos"><div>Verificar que los fondos a devolver son legitimos. Si hay sospecha → no devolver, escalar a SAR.</div></div>
<div className="neo-step" data-num="5" data-title="Devolver fondos"><div>Si todo limpio, devolver al metodo original. Documentar fecha + monto + referencia.</div></div>
<div className="neo-step" data-num="6" data-title="Cerrar cuenta en CRM"><div>Status "CLOSED — COMPLIANCE". Flag historico. No permitir reapertura sin aprobacion Susana + Director.</div></div>
<div className="neo-step" data-num="7" data-title="Archivar documentacion"><div>Todo el file del cliente queda archivado en Compliance/Closed/[YYYY]/. Retencion 7 anos minimo.</div></div>
</div>

---

## 9. Records y retention

### 9.1 Que se documenta por cada client activity review

| Campo | Detalle |
|---|---|
| Date of review | Fecha exacta del review |
| Reviewer name | Susana (o en futuro, Junior Analyst asignado) |
| Action taken | Mantener / Downgrade / Upgrade / Freeze / Close / EDD / SAR |
| Rationale | Por que se tomo la decision (evidencia + razonamiento) |
| Evidence reviewed | Lista de fuentes consultadas |
| Next review date | Cuando toca el proximo review |

### 9.2 Retencion

| Tipo de record | Retencion minima |
|---|---|
| Monthly HIGH RISK checklists | 7 anos desde closure de la cuenta |
| Alerts investigations | 7 anos |
| Risk category change logs | 7 anos |
| EDD case files | 7 anos |
| SAR files | 7 anos |
| Cuentas cerradas | 7 anos post-closure |

Storage: carpeta Compliance cifrada, con backup redundante. Acceso restringido a Compliance Officer + Director.

---

## 10. Coordinacion con otros equipos

Ongoing monitoring no es silo — depende de inputs de todo el broker.

### 10.1 Inputs de otros equipos a compliance

| Equipo | Que reporta | Cuando |
|---|---|---|
| Dealing | Patrones de trading sospechosos | En el momento + weekly summary |
| Support / Intercom | Clientes con comportamiento raro, preguntas evasivas | En el momento |
| Sales | Clientes que hablan de cosas raras (lavado, evasion) | En el momento |
| Finanzas | Anomalias en depositos / retiros / PSP | Diario |
| Marketing | Clientes detectados en adverse media por monitoring externo | En el momento |

### 10.2 Outputs de compliance a otros equipos

| Destino | Que se comunica | Cuando |
|---|---|---|
| Dealing | Freeze orders, limitaciones de trading | En el momento |
| Support | Guion estandar para clientes con cuenta bajo review | En el momento |
| Finanzas | Freeze de retiros, bloqueo de metodos | En el momento |
| Director | Monthly report, casos HIGH RISK, SARs | Mensual + eventos |
| Sales | Clientes bloqueados (no contactar), bajadas de prioridad | Mensual |

---

## 11. Metricas clave del monitoring

Para medir si el sistema funciona, Susana trackea estas metricas mensualmente (se incluyen en monthly report).

| Metric | Target saludable | Flag si... |
|---|---|---|
| % HIGH RISK clients reviewed on time | 100% | < 95% (se estan escapando reviews) |
| Alerts resolved within SLA | > 90% | < 80% |
| Average time to resolve alert | < 48h | > 72h |
| False positive rate sanctions | < 10% | > 20% (configuracion Sumsub mal) |
| New HIGH RISK per month | Stable | Spike 3x promedio (algo cambio) |
| SARs per month | Tipicamente 0-3 | Spike > 10 o 0 persistente (cerramos ojos?) |
| EDD conversion (abiertos → SAR) | 5-15% | > 30% (muy permisivos al abrir EDD) o < 2% (no detectamos) |

---

## 12. Errores comunes en ongoing monitoring

| Error | Consecuencia | Como evitarlo |
|---|---|---|
| Confiar solo en alertas automaticas | Patterns sutiles no se detectan | Complementar siempre con review manual |
| No documentar revisiones de LOW RISK | Si auditoria pregunta "y los LOW?" no hay evidencia | Anual spot check minimo, documentado |
| Cambiar risk category sin justificacion escrita | Compromete defensa en auditoria | Siempre justificar por escrito, con evidencia |
| No comunicar freezes al equipo | Soporte da info contradictoria al cliente | Canal interno + guion estandar |
| Revisar HIGH RISK "a ojo" | Inconsistencia, gaps | Usar checklist formal cada vez |
| Postponer reviews por carga | Acumulacion + riesgo | Priorizar monitoring sobre otras tareas no-criticas |
| Confiar en declaracion del cliente sin verificar | Cliente miente, queda en file | Cross-check con fuentes independientes |

---

## 13. Seccion Susana completa

Campos que Susana debe definir / validar antes de que este SOP quede finalizado:

- [SUSANA: definir los alerts CRM especificos a configurar — thresholds exactos]
- [SUSANA: confirmar frecuencia de reports al Director fuera del monthly standard]
- [SUSANA: definir procedimiento exacto de coordinacion con Dealing para monitoring transaccional]
- [SUSANA: establecer SLA interno para resolucion de alerts por categoria]
- [SUSANA: definir formato final del HIGH RISK checklist — Notion DB / Markdown / spreadsheet]
- [SUSANA: confirmar periodicidad del spot check LOW RISK — anual default]
- [SUSANA: coordinar con IT / Dev la configuracion tecnica de alerts en Skale CRM]
- [SUSANA: protocolo de backup en vacaciones (quien cubre monitoring)]

---

**Version:** 1.0
**Fecha:** 13 de abril 2026
**Proxima revision:** 13 de abril 2027 (anual) o ante cambio regulatorio material
**Responsable:** Susana — Compliance Officer
**Aprobado por:** Principals
