# Calendario de Compliance — Tareas Periodicas

**Documento operativo interno — CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

> **PROPOSITO DEL DOCUMENTO**
>
> Este es el calendario operativo de Susana. Le dice exactamente que tareas hacer cada dia, semana, mes, trimestre y ano — con checklist accionable y tiempo estimado. Todo pensado para que Susana no tenga que inventar ni recordar nada: abre este doc, ve que toca hoy, lo ejecuta.
>
> Soporta tambien el escalamiento: cuando llegue el momento de contratar un Junior Compliance Analyst, este calendario es la lista de delegacion.

---

## 1. Por que este calendario

AOFA — como todo regulador serio — espera que Compliance opere con **rutina documentada**. No basta con "hacer las cosas cuando pintan"; hace falta:

- Cadencia fija y verificable
- Evidencia de que cada tarea se ejecuto (checklist firmada, logs)
- Trazabilidad historica (que se reviso, cuando, por quien)
- Procesos que sobreviven a la persona (cualquier auditor puede tomar este doc y verificar)

Ademas este calendario protege a Susana: si manana un regulador audita y pregunta "mostrame el review HIGH RISK de marzo", existe una checklist completada con fecha y firma. Sin este doc, todo es palabra contra palabra.

### 1.1 Como usar este calendario dia a dia

1. **Lunes a viernes (manana):** ejecutar bloque DIARIO (~30 min)
2. **Viernes (tarde):** ejecutar bloque SEMANAL (~2h)
3. **Primer viernes del mes (full day):** ejecutar bloque MENSUAL
4. **Primer viernes de enero, abril, julio, octubre (~2 dias):** ejecutar bloque TRIMESTRAL
5. **Primera semana de enero (~1 semana):** ejecutar bloque ANUAL

Todo queda registrado en carpeta `Compliance/Calendar/YYYY/MM/` con evidencia.

---

## 2. Resumen visual — tabla maestra

| Frecuencia | # Tareas | Tiempo total estimado | Cuando se ejecuta |
|---|---|---|---|
| Diario | 3 | ~30 min | Lunes a viernes, primera hora |
| Semanal | 5 | ~2 horas | Viernes por la tarde |
| Mensual | 8 | ~1 dia completo | Primer viernes del mes |
| Trimestral | 6 | ~2 dias | Primer viernes de enero, abril, julio, octubre |
| Anual | 5 | ~1 semana | Primera semana de enero |
| Emergencias | Ad-hoc | Variable | Inmediato cuando se dispara |

---

## 3. Tareas DIARIAS (lunes a viernes, ~30 min)

Checklist que Susana corre cada manana antes de cualquier otra cosa. Si un dia no puede por razones mayores, compensar al siguiente.

### 3.1 Tarea D1 — Revisar alerts Sumsub

**Tiempo estimado:** 10-15 min
**Cuando:** Primera cosa de la manana

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Abrir dashboard"><div>Entrar al Sumsub dashboard con credenciales de Compliance Officer.</div></div>
<div className="neo-step" data-num="2" data-title="Filtrar pendientes"><div>Filtrar casos con status "Pending" o "Manual Review Required" del ultimo dia.</div></div>
<div className="neo-step" data-num="3" data-title="Triage por categoria"><div>Revisar en orden: HIGH RISK primero, luego MEDIUM, luego LOW. Aplicar risk-matrix.md para categorizar.</div></div>
<div className="neo-step" data-num="4" data-title="Decisiones"><div>Aprobar / Rechazar / Escalar a EDD / Abrir caso SAR segun corresponda.</div></div>
<div className="neo-step" data-num="5" data-title="Documentar"><div>Cada decision queda logueada en Sumsub + nota interna si es HIGH RISK.</div></div>
</div>

**Criterios de escalamiento inmediato:**
- Sanctions match → ACCION INMEDIATA (ver pep-sanctions-sop.md)
- Adverse media con signos de crimen → escalar a caso SAR
- PEP match no declarado → EDD obligatorio
- Documentos falsificados sospechosos → rechazo + documentar como potencial fraude

### 3.2 Tarea D2 — Revisar canales de comunicacion compliance

**Tiempo estimado:** 5-10 min
**Cuando:** Despues de D1

Revisar en orden:
- Email corporativo (compliance@neomaaa.com) — mensajes urgentes AOFA, legal, partners
- Canal Telegram #compliance-alerts (si existe)
- Mensajes directos de Directors con asuntos compliance
- Tickets Intercom escalados a compliance por soporte

Si algo requiere accion en el dia, marcarlo como prioridad. Si puede esperar, agendar para el bloque semanal.

### 3.3 Tarea D3 — Atender consultas del equipo

**Tiempo estimado:** 10-15 min (promedio)
**Cuando:** Durante el dia, segun lleguen

Susana es el punto de consulta para:

| Equipo | Pregunta tipica |
|---|---|
| Soporte | "Cliente X me dice Y, es sospechoso?" |
| Sales | "Puedo cerrar con este cliente, parece PEP" |
| Dealing | "Patron de trading raro en cuenta X" |
| Finanzas | "Este metodo de deposito es aceptable?" |
| Marketing | "Puedo usar este claim en la landing?" |

**Regla de respuesta:**
- Simple (si/no con justificacion corta): responder en el momento
- Compleja: abrir caso, investigar, responder en maximo 48h
- Documentar siempre la consulta + respuesta en log semanal (soporta audit trail)

---

## 4. Tareas SEMANALES (viernes por la tarde, ~2h)

### 4.1 Tarea S1 — Review casos EDD abiertos

**Tiempo:** 30-45 min

- Listar todos los casos EDD pendientes de la semana
- Para cada uno: update status, nota de avance, proxima accion
- Seguimiento con cliente si falta documentacion
- Escalar a Director cualquier caso que lleve >14 dias sin resolver

### 4.2 Tarea S2 — Review reportes sospechosos del equipo

**Tiempo:** 20-30 min

- Agregar todos los "esto me parece raro" que llegaron durante la semana (Sales, Support, Dealing)
- Investigar cada uno: es sospecha real o falso positivo?
- Documentar conclusion + accion tomada
- Si alguno escala a SAR → abrir caso segun sar-reporting.md

### 4.3 Tarea S3 — Update tracking de clientes HIGH RISK

**Tiempo:** 20-30 min

- Abrir la lista de HIGH RISK activos
- Revisar activity de la semana (trading, depositos, retiros)
- Flag cualquier cambio inusual
- Actualizar notas en la ficha del cliente

### 4.4 Tarea S4 — Review FATF / sanctions updates

**Tiempo:** 15 min

- Revisar pagina oficial FATF (fatf-gafi.org) por publicaciones nuevas
- Revisar updates de OFAC, UN, EU sanctions
- Si hay cambios relevantes: agendar actualizacion de docs internos para bloque mensual
- Si hay update urgente (ej. nueva sancion que afecta cliente actual): accion inmediata

### 4.5 Tarea S5 — Weekly summary al Director

**Tiempo:** 15-20 min

Redactar email corto a Diego con template fijo:

```markdown
# Compliance Weekly Summary — Semana del [DD/MM]

## Numeros
- Alerts Sumsub procesados: [#]
- EDD abiertos / cerrados / pending: [#] / [#] / [#]
- SARs submitidos esta semana: [#]
- HIGH RISK activos: [#]

## Top concern de la semana
[1-2 parrafos — lo mas importante que el Director debe saber]

## Action items proxima semana
- [ ] [item 1]
- [ ] [item 2]

## Heads-up / flags
[Cualquier cosa que puede escalar proxima semana]

---
Susana — Compliance Officer
```

---

## 5. Tareas MENSUALES (primer viernes del mes, ~1 dia)

### 5.1 Tarea M1 — Full scan sanctions de base de clientes existentes

**Tiempo:** 1-2 horas

- Verificar que Sumsub corrio el scan automatico mensual sobre toda la base
- Revisar cualquier match nuevo (incluso false positives se documentan)
- Spot check manual: exportar 10% de clientes al azar → check en OFAC web search como cross-validation
- Documentar: "Scan corrido el [fecha], X clientes revisados, Y matches nuevos, Z resueltos"

### 5.2 Tarea M2 — Review HIGH RISK clients (uno por uno)

**Tiempo:** 2-3 horas

Usar el checklist de ongoing-monitoring-sop.md seccion 6. Para cada HIGH RISK:
- Activity review del mes
- Update risk assessment
- Decidir: mantener HIGH / downgrade / escalar

### 5.3 Tarea M3 — Review PEP status updates

**Tiempo:** 30-45 min

- Sumsub actualiza database PEP mensualmente — verificar que corrio
- Revisar cambios (PEP termino cargo? nuevo PEP en lista? familiar cercano paso a ser PEP?)
- Ajustar risk category de afectados

### 5.4 Tarea M4 — Transactions monitoring review

**Tiempo:** 1-2 horas

- Extraer reporte de transacciones del mes pasado del CRM
- Identificar outliers: top depositos, top retiros, top volumen trading
- Cross-check contra risk categories
- Flag cualquier discrepancia material (cliente LOW que aparece en top 5 volumen → investigar)

### 5.5 Tarea M5 — IB compliance review

**Tiempo:** 30-45 min

- Revisar IBs activos: que clientes estan trayendo, cual es el risk profile promedio
- Si algun IB tiene patron de traer HIGH RISK repetidamente → flag
- Verificar que IBs cumplen con obligaciones contractuales compliance
- Documentar hallazgos

### 5.6 Tarea M6 — Internal training (si hay empleados nuevos)

**Tiempo:** Variable (1-2 horas si hay training a dar)

- Si hay hires nuevos este mes: onboarding compliance (sesion 1h + material)
- Si hubo incidente relevante: refresher al equipo afectado
- Si no aplica este mes: saltar

### 5.7 Tarea M7 — Documentation housekeeping

**Tiempo:** 30-45 min

- Archivar casos cerrados del mes pasado en carpeta historica
- Verificar backups Sumsub + carpeta compliance
- Confirmar retencion 7 anos esta operativa
- Limpiar inbox compliance: cerrar tickets, archivar threads resueltos

### 5.8 Tarea M8 — Monthly compliance report al Director + Board

**Tiempo:** 1-2 horas

Redactar reporte 2-4 paginas. Template en seccion 9.1.

---

## 6. Tareas TRIMESTRALES (primer viernes de ene / abr / jul / oct, ~2 dias)

### 6.1 Tarea T1 — Actualizacion FATF black / grey lists

**Tiempo:** 2-3 horas

- Revisar publicacion FATF oficial del trimestre (se publican en Feb, Jun, Oct aprox)
- Update internal docs (risk-matrix.md seccion paises)
- Comunicar cambios al equipo (email + session corta si es material)
- Re-categorizar clientes afectados por cambios de lista

### 6.2 Tarea T2 — Re-check PEP status existentes

**Tiempo:** 2-3 horas

- Lista de todos los clientes actualmente PEP
- Cargo sigue vigente? termino? duracion post-PEP completada?
- Ajustar risk category de los que dejaron de ser PEP hace >12 meses (downgrade posible)
- Documentar decisiones

### 6.3 Tarea T3 — Compliance training refresher al equipo

**Tiempo:** 2 horas (sesion 1h + prep)

- Sesion 1 hora con todo el equipo client-facing
- Casos anonimizados del trimestre (que aprendimos)
- Regulations nuevas / cambios
- Q&A
- Registro de asistencia (firmado — evidencia para audit)

### 6.4 Tarea T4 — Audit interno compliance

**Tiempo:** 1 dia completo

- Muestreo aleatorio: 20-30 casos KYC cerrados en el trimestre
- Verificar:
  - Documentacion completa y vigente
  - Risk category justificada
  - Sanctions + PEP screening documentado
  - Decisiones bien soportadas
- Identificar patrones de fallo (ej. "20% de los casos HIGH no tienen SOF documentado")
- Plan de remediacion para proximo trimestre

### 6.5 Tarea T5 — Review politicas internas

**Tiempo:** 3-4 horas

Revisar y actualizar:
- risk-matrix.md
- edd-triggers.md
- pep-sanctions-sop.md
- sar-reporting.md (este documento)
- ongoing-monitoring-sop.md
- aml-kyc-policy.md (legal)

Cambios material requieren aprobacion Director.

### 6.6 Tarea T6 — Reporte trimestral a AOFA (si requerido)

**Tiempo:** 2-3 horas

[SUSANA COMPLETA: confirmar que reportes trimestrales AOFA exige — nombre, formato, deadline]

---

## 7. Tareas ANUALES (primera semana de enero, ~1 semana)

### 7.1 Tarea A1 — AML / KYC Policy review completo

**Tiempo:** 2 dias

- Review exhaustivo de todo el framework AML/KYC
- Update contra regulaciones nuevas del ano
- Risk matrix updated
- Board approval formal (minuta firmada)

### 7.2 Tarea A2 — External audit AML

**Tiempo:** 1-2 semanas (coordinado con auditor externo)

- [SUSANA COMPLETA: confirmar si se contrata auditor externo AML anual — nombre + periodo]
- Auditor revisa programa compliance completo
- Findings + remediation plan
- Report archivado para AOFA

### 7.3 Tarea A3 — Risk assessment empresa completa

**Tiempo:** 2-3 dias

- Top risks NEOMAAA del ano (by volume, geography, client type, product)
- Mitigation strategies en vigor
- Gaps identificados
- Plan de mitigacion ano siguiente
- Report formal al Board

### 7.4 Tarea A4 — Staff training mandatory anual

**Tiempo:** 1 dia (sesion larga + asessment)

- Todo el staff client-facing debe tomar AML training anual
- Assessment final (quiz) — resultado archivado por persona
- Certificacion interna emitida
- Si alguien falla: re-training obligatorio

### 7.5 Tarea A5 — Annual compliance report al Board + AOFA

**Tiempo:** 3-4 dias

- Highlights del ano
- Metricas agregadas (SARs, EDDs, alerts, HIGH RISK count evolution)
- Risk assessment
- Audit findings + remediation status
- Plans para ano siguiente
- Presentacion al Board
- Submision a AOFA si se requiere

---

## 8. Emergencias (ad-hoc)

Cuando pasa algo no planeado, este calendario se pausa y se ejecuta el protocolo de emergencia.

### 8.1 Triggers de emergencia y SLA

| Evento | SLA de respuesta | Accion |
|---|---|---|
| Sanctions match real (confirmado) | Inmediato | Freeze cuenta, reporte interno, evaluar SAR |
| SAR finding durante investigacion | Inmediato | Proceso completo SAR (ver sar-reporting.md) |
| Regulador (AOFA) pide info | 5-10 dias habiles tipico | Cooperacion completa, coordinar con legal |
| Subpoena / orden judicial | Inmediato | Legal + Director, ejecutar orden |
| Media coverage negativo de cliente activo | 24h | Investigar, evaluar accion (freeze, SAR, nada) |
| Data breach con impacto KYC | Inmediato | Incident response, notificacion a afectados + regulador si aplica |
| Denuncia interna (whistleblower) | 24-48h | Investigacion confidencial |

### 8.2 Regla general de emergencia

1. **Parar todo** — la emergencia tiene prioridad sobre cualquier tarea del calendario
2. **Documentar desde minuto 1** — abrir caso, timeline, evidencia
3. **Escalar a Director** — aunque sea a las 3 AM, los casos criticos no esperan
4. **No improvisar** — seguir el SOP que corresponda (SAR, sanctions, etc.)
5. **Post-mortem** — una vez resuelto, escribir lecciones aprendidas + ajustar procesos

---

## 9. Plantillas de reportes

### 9.1 Monthly Report al Director (template)

```markdown
# Compliance Monthly Report — [MES YYYY]

**Reporting period:** [01/MM/YYYY — ultimo dia/MM/YYYY]
**Prepared by:** Susana — Compliance Officer
**Recipients:** Diego, Yulia, Stanislav

---

## 1. Executive summary
[3-5 lineas — lo mas importante del mes]

## 2. Metricas del mes
| Metric | Mes actual | Mes anterior | Delta |
|---|---|---|---|
| Alerts Sumsub procesados | [ ] | [ ] | [ ] |
| New EDD cases opened | [ ] | [ ] | [ ] |
| EDD cases closed (aprobados) | [ ] | [ ] | [ ] |
| EDD cases closed (rechazados) | [ ] | [ ] | [ ] |
| SARs submitted | [ ] | [ ] | [ ] |
| New HIGH RISK clients | [ ] | [ ] | [ ] |
| Active HIGH RISK clients (total) | [ ] | [ ] | [ ] |
| Sanctions matches (incluyendo FP) | [ ] | [ ] | [ ] |
| PEP matches new | [ ] | [ ] | [ ] |

## 3. Top issues del mes
1. [issue 1 + descripcion corta + accion tomada]
2. [issue 2]
3. [issue 3]

## 4. Risk trends observed
[Narrativa — que patrones emergieron, que jurisdicciones, que productos]

## 5. Action items proximo mes
- [ ] [item 1]
- [ ] [item 2]
- [ ] [item 3]

## 6. Red flags para atencion del Director
[Lista corta de cosas que requieren decision o escalamiento]

## 7. Regulatory updates del mes
[Cambios FATF, AOFA, OFAC, UN, EU relevantes]

---
Signed: Susana — Compliance Officer
Date: [ ]
```

### 9.2 Weekly Summary (template corto)

```
Semana del [DD/MM]:

NUMEROS
- Alerts Sumsub: X procesados
- EDD: X abiertos, X cerrados
- SAR: X submitidos
- HIGH RISK activos: X

TOP CONCERN
[1-2 lineas]

PROXIMA SEMANA
- [item 1]
- [item 2]

FLAGS
[heads-up al Director]
```

### 9.3 Daily log (template minimo)

```
Fecha: [DD/MM/YYYY]

D1 Sumsub alerts: [X procesados, Y escalados]
D2 Canales: [nada / X urgente]
D3 Consultas equipo: [X respondidas, Y abiertas]

Observaciones del dia:
[notas]

Pendiente para manana:
[items]
```

---

## 10. Registro de ejecucion del calendario

Para evidencia de auditoria, Susana mantiene un registro simple de que tareas ejecuto cada periodo.

### 10.1 Template de registro mensual

```markdown
# Compliance Calendar Execution — [MES YYYY]

## Diarias (20 dias habiles del mes)
- Dias completados: [X / 20]
- Dias perdidos + razon: [ ]

## Semanales (4-5 semanas)
- [ ] Semana 1 — completada [DD/MM]
- [ ] Semana 2 — completada [DD/MM]
- [ ] Semana 3 — completada [DD/MM]
- [ ] Semana 4 — completada [DD/MM]
- [ ] Semana 5 (si aplica) — completada [DD/MM]

## Mensuales
- [ ] M1 Full scan sanctions — [DD/MM]
- [ ] M2 Review HIGH RISK — [DD/MM]
- [ ] M3 PEP updates — [DD/MM]
- [ ] M4 Transactions monitoring — [DD/MM]
- [ ] M5 IB compliance review — [DD/MM]
- [ ] M6 Internal training — [DD/MM o N/A]
- [ ] M7 Documentation housekeeping — [DD/MM]
- [ ] M8 Monthly report — [DD/MM]

Firma: Susana _________________ Fecha: [ ]
```

---

## 11. Escalamiento del equipo compliance

Este calendario esta disenado para que Susana lo ejecute sola **al inicio**. Cuando NEOMAAA crezca y sea necesario, se delega en este orden:

| Crecimiento base clientes | Equipo compliance | Delegacion |
|---|---|---|
| 0 - 5,000 clientes | Susana sola | Todo lo ejecuta Susana |
| 5,000 - 20,000 clientes | Susana + Junior Analyst | Junior hace Diarias + parte Semanales, Susana supervisa + Mensual / Trimestral / Anual |
| 20,000 - 50,000 clientes | Susana + 2 Juniors | Juniors cubren Diarias + Semanales + parte Mensuales, Susana estrategia + reportes |
| 50,000+ clientes | Equipo 3+ con Head AML | Susana rol de direccion compliance, no operativo |

---

## 12. Seccion Susana completa

Campos que Susana debe confirmar / definir antes de finalizar el calendario:

- [SUSANA: confirmar dia fijo semanal para S5 weekly summary — default viernes 16:00]
- [SUSANA: confirmar dia fijo mensual para M8 monthly report — default primer viernes del mes]
- [SUSANA: confirmar si AOFA exige reports periodicos y con que frecuencia / formato]
- [SUSANA: confirmar si se contrata auditor externo AML anual — nombre + periodo contratado]
- [SUSANA: confirmar canal seguro de transmision de reportes sensibles a Directors]
- [SUSANA: decidir formato final de registro de ejecucion — Notion DB / spreadsheet / carpeta Obsidian]
- [SUSANA: definir protocolo de cobertura si esta de vacaciones > 1 semana (backup temporal)]

---

## 13. Record Keeping y Retention

> [!INFO]
> **Si no esta documentado, no paso.** En compliance, la documentacion no es una tarea administrativa secundaria. Es la prueba de que el broker cumple con sus obligaciones. Ante auditoria AOFA, lo que importa no es solo haber hecho el trabajo correcto, sino poder demostrarlo. Cada decision compliance debe tener registro que incluya: **que se decidio, quien lo decidio, cuando, por que, y con que evidencia**.

### 13.1 Registro Maestro de Compliance — estructura

**Nombre del archivo:** `NEOMAAA_Compliance_Register_YYYY.xlsx` (Google Sheets recomendado — acceso compartido, historial versiones automatico, acceso multidispositivo).

**Hojas del archivo:**

| Tab | Contenido | Responsable |
|---|---|---|
| Dashboard | Resumen de metricas y contadores | Automatico (formulas) |
| KYC_Decisions | Todas las decisiones de KYC | Susana |
| Sanctions_Screening | Resultados de screening con match (no clean) | Susana |
| Suspicious_Activity | Actividad sospechosa + SARs | Susana |
| Training_Log | Capacitaciones realizadas | Susana |
| Complaints | Quejas relacionadas con compliance | Susana |
| Audit_Trail | Acciones, cambios, accesos relevantes | Susana |
| Config | Listas de referencia y validaciones | Susana |

### 13.2 Columnas obligatorias — KYC_Decisions

| Col | Campo | Validacion |
|---|---|---|
| A | ID_Registro (KYC-YYYY-####, auto-incremento) | Texto |
| B | Fecha_Decision | YYYY-MM-DD |
| C | Hora_Decision | HH:MM |
| D | ID_Cliente_Skale | Texto |
| E | Nombre_Cliente | Texto |
| F | Pais_Cliente | Lista desplegable |
| G | Nacionalidad | Lista desplegable |
| H | Risk_Category | LOW / MEDIUM / HIGH |
| I | Docs_Presentados | Texto |
| J | Resultado_Sumsub | GREEN / RETRY / RED / PENDING |
| K | Screening_Sanciones | Clean / Hit-FP / Hit-TM / PEP |
| L | Decision_Final | Aprobado / Rechazado / Retry / En EDD / Escalado |
| M | Razon_Decision (min 20 caracteres, OBLIGATORIO) | Texto |
| N | Revisor | Susana / Automatico / Principals |
| O | EDD_Requerido | Si / No |
| P | Notas_Adicionales | Texto |
| Q | ID_Sumsub | Texto |
| R | Proximo_Review | YYYY-MM-DD |

**Codificacion por colores:** verde = aprobado, amarillo = retry/pendiente, naranja = EDD/escalado, rojo claro = rechazado, rojo oscuro = match sanciones confirmado.

### 13.3 Columnas obligatorias — Sanctions_Screening (solo con match)

Esta hoja registra SOLO screenings con alerta (match/PEP/adverse media). Los clean solo van en KYC_Decisions.

Campos clave: ID (SCR-YYYY-####), Fecha_Alerta, ID_Cliente, Tipo_Alerta (Sanctions/PEP/Adverse Media), Lista_Origen (OFAC/UN/EU/UK/AOFA), Detalle_Match, Score_Match (0-100), Analisis (min 50 caracteres), Conclusion (True Match / False Positive / Inconcluso), Decision, Escalado_A, Fecha_Resolucion, Evidencia (capturas), Tipo_Screening (Onboarding/Upgrade/Periodico/Ad-hoc), Reportado_AOFA (Si/No/N/A).

**Regla de oro del analisis:** no basta "false positive". Debe decir algo como: "False positive. Nombre coincide parcialmente pero fecha de nacimiento difiere (cliente: 1985-03-15, lista: 1962-08-22). Pais distinto (cliente: Colombia, lista: Libia). Conclusion: homonimo."

### 13.4 Columnas obligatorias — Suspicious_Activity / SAR

Campos clave: ID (SAR-YYYY-####), Fecha_Deteccion, ID_Cliente, Tipo_Actividad (ver tipologias abajo), Descripcion (min 100 caracteres), Monto_Involucrado, Periodo, Fuente_Deteccion, Evaluacion_Riesgo (Bajo/Medio/Alto/Critico), Accion_Tomada, SAR_Presentado (Si/No/En evaluacion), Fecha_SAR, Ref_SAR, Estado, Revisor, Notas_Seguimiento, Fecha_Cierre.

**Tipologias de actividad sospechosa (lista validada):**

| Tipo | Nivel de riesgo tipico |
|---|---|
| Structuring (multiples depositos pequenos que evitan thresholds) | Alto |
| Deposito-retiro rapido sin trading | Alto |
| Terceros (deposito o retiro desde/hacia cuenta de otra persona) | Alto |
| Volumen incoherente con perfil | Medio-Alto |
| Cambio abrupto de patron de trading | Medio |
| Pais de alto riesgo | Medio-Alto |
| Documentos sospechosos | Alto |
| Multiples cuentas del mismo individuo | Medio |
| Solicitud inusual (transferencia a tercero, etc.) | Medio |
| Reporte interno del equipo | Variable |

Ver proceso completo en [sar-reporting.md](/content/compliance/sar-reporting).

### 13.5 Audit Trail — que se registra

| Accion | Cuando se registra |
|---|---|
| Modificacion de registro | Cualquier cambio a fila existente en cualquier hoja |
| Cambio de decision | Una decision KYC se revierte (rechazado a aprobado, etc.) |
| Acceso a datos sensibles | Acceso a documentos de un cliente por razon no rutinaria |
| Exportacion de datos | Cuando se exportan datos del registro |
| Cambio de configuracion | Modificacion de listas validacion, paises, reglas |
| Escalacion | Cada vez que un caso se escala |
| Comunicacion con regulador | Cada comunicacion enviada a o recibida de AOFA |
| Cambio de politica | Cualquier cambio en politicas o procedimientos compliance |

Campos: ID (AUD-YYYY-####), Fecha, Hora, Usuario, Accion, Detalle, Registro_Afectado (KYC-XXX/SCR-XXX/etc.), Valor_Anterior, Valor_Nuevo, Razon_Cambio.

**Por que es critico:** el regulador quiere ver (1) que las decisiones fueron correctas Y (2) que nadie manipulo los registros despues. El audit trail demuestra lo segundo. Registro sin audit trail pierde credibilidad.

### 13.6 Politica de Retencion — minimos obligatorios

| Tipo de Registro | Retencion Minima | Base |
|---|---|---|
| Documentos KYC (ID, POA, selfie) | 7 anos desde cierre de cuenta | FATF + AOFA |
| Formularios de origen de fondos (SoF/SoW) | 7 anos desde cierre | FATF + AOFA |
| Historial de transacciones (depositos/retiros) | 7 anos desde transaccion | FATF + AOFA |
| Historial de trading (MT5) | 7 anos desde cierre cuenta | FATF + AOFA |
| Comunicaciones con clientes (emails, chat) | 5 anos desde comunicacion | Practica industria |
| SARs y documentacion asociada | 7 anos desde presentacion (minimo); 10 anos recomendado | FATF + best practice |
| Quejas y resoluciones | 5 anos desde resolucion | Practica industria |
| Reportes a AOFA | 7 anos desde presentacion; 10 anos recomendado | FATF + best practice |
| Contratos y terminos con clientes | 5 anos desde cierre cuenta | Practica industria |
| Registros de capacitacion del personal | 5 anos desde capacitacion | Practica industria |
| Decisiones de EDD | 7 anos desde decision | FATF + AOFA |
| Monthly HIGH RISK checklists | 7 anos desde cierre cuenta | FATF |
| Audit trail | 7 anos | Practica industria |
| Risk category change logs | 7 anos | FATF |
| Registros de screening con match | 7 anos desde cierre | FATF |

> [!WARNING]
> **Estandar interno NEOMAAA: 7 anos minimo para todo lo vinculado a KYC/AML/SAR/audit** (alineado con FATF R.11 y requisitos AOFA). No bajar este umbral sin aprobacion Director + abogado externo.

### 13.7 Seguridad de los registros

| Medida | Implementacion |
|---|---|
| Backup diario automatico | Google Workspace (automatico) + export semanal a Excel en Drive |
| Acceso restringido | Solo Susana + Principals tienen acceso al Registro Maestro. SARs y EDD: acceso restringido a Susana + Principals unicamente |
| Autenticacion | Google Workspace con 2FA activado obligatorio |
| Historial de versiones | Google Sheets mantiene automatico |
| Encriptacion | Registros KYC en Sumsub encriptados por el proveedor. Drive de compliance: Google Workspace encryption at rest |
| Pantalla limpia | Susana no deja Registro abierto cuando se aleja del escritorio |
| Dispositivos seguros | Solo acceder desde dispositivos autorizados (laptop corporativa, no personal) |
| Permisos por rol en Skale CRM | Ventas/soporte NO pueden ver documentos de compliance |
| Prueba de restauracion de backup | Trimestral (ver bloque T4 audit interno) |

### 13.8 Destruccion de registros

Al cumplirse el periodo de retencion:

1. Susana identifica los registros elegibles para destruccion
2. Verifica que no haya investigaciones o disputas abiertas sobre el cliente
3. Destruccion segura: borrado permanente digital + destruccion fisica si aplica
4. Se documenta la destruccion en audit trail: que se destruyo, cuando, por quien, con que metodo
5. Aprobacion dual obligatoria (Susana + Director) para destrucciones masivas

### 13.9 Rutina de mantenimiento del Registro

| Tarea | Frecuencia | Incluido en bloque |
|---|---|---|
| Registrar decisiones KYC del dia | Diaria | D1 (ver seccion 3.1) |
| Verificar Dashboard muestra datos correctos | Semanal | S1 |
| Backup del archivo (export a Excel) | Semanal | S1 |
| Verificar integridad de datos (sin celdas vacias obligatorias) | Mensual | M7 |
| Reconciliar Sumsub-Skale-Registro | Mensual | M7 |
| Revisar y actualizar listas de Config | Trimestral | T5 |
| Crear nuevo archivo del ano siguiente | Anual (diciembre) | A1 |
| Archivar archivo del ano anterior | Anual (enero) | A1 |

### 13.10 Reportes a AOFA desde el Registro

El Registro es la fuente de datos para los reportes regulatorios. Los bloques T6 (trimestral) y A5 (anual) del calendario consumen directamente:

| Seccion del reporte | Fuente de datos |
|---|---|
| Resumen ejecutivo | Dashboard |
| Estadisticas KYC | KYC_Decisions |
| Screening de sanciones | Sanctions_Screening |
| Actividad sospechosa | Suspicious_Activity |
| Capacitaciones | Training_Log |
| Quejas | Complaints |
| Cambios de politica | Audit_Trail |

---

**Version:** 1.1
**Fecha:** 13 de abril 2026 (v1.0) / 17 de abril 2026 (v1.1 -- absorbe record-keeping de registro-compliance.md)
**Proxima revision:** 13 de abril 2027 (anual) o ante cambio regulatorio material
**Responsable:** Susana — Compliance Officer
**Aprobado por:** Principals
