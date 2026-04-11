# REGISTRO Y DOCUMENTACION DE COMPLIANCE -- GUIA OPERATIVA

**Documento interno -- CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

---

## INDICE

1. [Principio Fundamental: Si No Esta Documentado, No Paso](#1-principio-fundamental-si-no-esta-documentado-no-paso)
2. [Registro Maestro de Compliance](#2-registro-maestro-de-compliance)
3. [Log de Decisiones KYC](#3-log-de-decisiones-kyc)
4. [Log de Screening de Sanciones](#4-log-de-screening-de-sanciones)
5. [Log de Actividad Sospechosa](#5-log-de-actividad-sospechosa)
6. [Log de Capacitacion](#6-log-de-capacitacion)
7. [Log de Quejas de Compliance](#7-log-de-quejas-de-compliance)
8. [Audit Trail](#8-audit-trail)
9. [Instrucciones para Crear los Spreadsheets](#9-instrucciones-para-crear-los-spreadsheets)
10. [Reportes para AOFA](#10-reportes-para-aofa)
11. [Almacenamiento y Seguridad](#11-almacenamiento-y-seguridad)
12. [Calendario de Revision de Registros](#12-calendario-de-revision-de-registros)

---

## 1. PRINCIPIO FUNDAMENTAL: SI NO ESTA DOCUMENTADO, NO PASO

En compliance, la documentacion no es una tarea administrativa secundaria. Es la prueba de que el broker esta cumpliendo con sus obligaciones. Ante una auditoria de AOFA (o de cualquier futuro regulador), lo que importa no es solo que se haya hecho el trabajo correcto, sino que se pueda demostrar.

**Regla de oro:** Cada decision de compliance debe tener un registro que incluya:
- Que se decidio.
- Quien lo decidio.
- Cuando se decidio.
- Por que se decidio (la razon).
- Que evidencia se considero.

Si un auditor pregunta "por que aprobaron a este cliente?" y la respuesta es "porque paso Sumsub", eso no es suficiente. La respuesta correcta es: "Fue aprobado el [fecha] por [persona] porque la verificacion automatica de Sumsub confirmo la identidad del documento [tipo], el liveness check fue exitoso, el screening de sanciones fue limpio, y el cliente no presenta indicadores de riesgo elevado. El registro completo esta en [ubicacion]."

---

## 2. REGISTRO MAESTRO DE COMPLIANCE

### 2.1 Que Es

El Registro Maestro de Compliance es el archivo central que consolida toda la actividad de compliance de NEOMAAA. Esta compuesto por multiples hojas/tabs dentro de un mismo archivo (Google Sheets o Excel), cada una dedicada a un tipo de registro.

### 2.2 Estructura del Archivo

**Nombre del archivo:** `NEOMAAA_Compliance_Register_2026.xlsx` (o Google Sheets equivalente)

**Hojas/Tabs del archivo:**

| Tab | Contenido | Responsable de Mantener |
|---|---|---|
| Dashboard | Resumen de metricas y contadores | Automatico (formulas) |
| KYC_Decisions | Todas las decisiones de KYC | Susana |
| Sanctions_Screening | Todos los resultados de screening con match | Susana |
| Suspicious_Activity | Actividad sospechosa detectada y SARs | Susana |
| Training_Log | Capacitaciones realizadas | Susana |
| Complaints | Quejas relacionadas con compliance | Susana |
| Audit_Trail | Acciones y cambios relevantes | Susana |
| Config | Listas de referencia y validaciones | Susana (configuracion inicial) |

### 2.3 Tab: Dashboard

El Dashboard es una hoja resumen que usa formulas para extraer datos de las demas hojas. Debe mostrar:

| Metrica | Formula Base | Frecuencia |
|---|---|---|
| Total clientes aprobados (mes actual) | COUNTIFS en KYC_Decisions | Automatico |
| Total clientes rechazados (mes actual) | COUNTIFS en KYC_Decisions | Automatico |
| Total en revision (pendientes) | COUNTIFS en KYC_Decisions | Automatico |
| Sanctions hits del mes | COUNTIFS en Sanctions_Screening | Automatico |
| False positives del mes | COUNTIFS en Sanctions_Screening | Automatico |
| True matches del mes | COUNTIFS en Sanctions_Screening | Automatico |
| SARs presentados (trimestre) | COUNTIFS en Suspicious_Activity | Automatico |
| Casos pendientes >24h (ALERTA) | COUNTIFS con condicion de fecha | Automatico |
| Promedio tiempo de revision | AVERAGE con filtro | Automatico |

---

## 3. LOG DE DECISIONES KYC

### 3.1 Estructura de la Hoja "KYC_Decisions"

| Columna | Nombre | Tipo de Dato | Validacion | Descripcion |
|---|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (KYC-2026-0001) | Identificador unico del registro |
| B | Fecha_Decision | Fecha | Formato YYYY-MM-DD | Fecha en que se tomo la decision |
| C | Hora_Decision | Hora | Formato HH:MM | Hora de la decision |
| D | ID_Cliente_Skale | Texto | -- | ID del cliente en Skale CRM |
| E | Nombre_Cliente | Texto | -- | Nombre completo del cliente |
| F | Pais_Cliente | Texto | Lista desplegable de paises | Pais de residencia |
| G | Nacionalidad | Texto | Lista desplegable de paises | Nacionalidad del documento |
| H | Tier_Solicitado | Lista | Tier 1 / Tier 2 / Tier 3 | Tier al que aplica la decision |
| I | Docs_Presentados | Texto | -- | Lista de documentos recibidos |
| J | Resultado_Sumsub | Lista | GREEN / RETRY / RED / PENDING | Resultado automatico de Sumsub |
| K | Screening_Sanciones | Lista | Clean / Hit - FP / Hit - TM / PEP | Resultado del screening |
| L | Decision_Final | Lista | Aprobado / Rechazado / Retry / En EDD / Escalado | Decision tomada |
| M | Razon_Decision | Texto | Minimo 20 caracteres | Explicacion detallada de la razon |
| N | Revisor | Lista | Susana / Automatico / Principals | Quien tomo la decision |
| O | EDD_Requerido | Lista | Si / No | Si se activo proceso de EDD |
| P | Notas_Adicionales | Texto | -- | Cualquier informacion relevante adicional |
| Q | ID_Sumsub | Texto | -- | Referencia del applicant en Sumsub |
| R | Proximo_Review | Fecha | Formato YYYY-MM-DD | Fecha de proxima re-verificacion |

### 3.2 Codificacion por Colores

| Color de Fila | Significado |
|---|---|
| Verde claro (#C6EFCE) | Aprobado -- sin incidencias |
| Amarillo (#FFEB9C) | En revision / Retry / Pendiente |
| Naranja (#FCD5B4) | En EDD / Escalado a Principals |
| Rojo claro (#FFC7CE) | Rechazado |
| Rojo oscuro (#C0504D, texto blanco) | Match de sanciones confirmado |

### 3.3 Reglas de Uso

1. **Cada decision KYC genera una fila.** No importa si es automatica o manual.
2. **Las aprobaciones automaticas se registran por lote.** Al final del dia, Susana exporta las aprobaciones automaticas de Sumsub y las registra con Revisor = "Automatico".
3. **Las revisiones manuales se registran individualmente** en el momento de la decision.
4. **La columna "Razon_Decision" es obligatoria.** Incluso para aprobaciones: "Verificacion automatica exitosa. ID [tipo], liveness OK, screening limpio."
5. **No borrar filas.** Si hay un error, se agrega una nota correctiva, no se elimina el registro original.

---

## 4. LOG DE SCREENING DE SANCIONES

### 4.1 Estructura de la Hoja "Sanctions_Screening"

Esta hoja SOLO registra screenings que generaron algun tipo de alerta (match, PEP, media adversa). Los screenings limpios (clean) se registran unicamente en la hoja KYC_Decisions.

| Columna | Nombre | Tipo de Dato | Validacion | Descripcion |
|---|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (SCR-2026-0001) | Identificador unico |
| B | Fecha_Alerta | Fecha | YYYY-MM-DD | Fecha de deteccion |
| C | ID_Cliente_Skale | Texto | -- | ID del cliente |
| D | Nombre_Cliente | Texto | -- | Nombre completo |
| E | Tipo_Alerta | Lista | Sanctions / PEP / Adverse Media | Tipo de match |
| F | Lista_Origen | Texto | -- | Que lista genero el match (OFAC, ONU, etc.) |
| G | Detalle_Match | Texto | -- | Datos de la entrada en la lista |
| H | Score_Match | Numero | 0-100 | Porcentaje de coincidencia de Sumsub |
| I | Analisis | Texto | Minimo 50 caracteres | Analisis detallado de Susana |
| J | Datos_Comparados | Texto | -- | Que datos se compararon (nombre, DOB, pais) |
| K | Conclusion | Lista | True Match / False Positive / Inconcluso | Resultado del analisis |
| L | Decision | Lista | Bloquear / Aprobar con EDD / Aprobar / Escalar | Accion tomada |
| M | Escalado_A | Lista | No / Principals / Abogado / AOFA | Si se escalo, a quien |
| N | Fecha_Resolucion | Fecha | YYYY-MM-DD | Fecha en que se resolvio |
| O | Revisor | Lista | Susana / Principals | Quien resolvio |
| P | Evidencia | Texto | -- | Referencia a capturas de pantalla u otros archivos |
| Q | ID_Sumsub | Texto | -- | Referencia en Sumsub |
| R | Tipo_Screening | Lista | Onboarding / Upgrade / Periodico / Ad-hoc | Cuando se ejecuto el screening |
| S | Reportado_AOFA | Lista | Si / No / N/A | Si se reporto al regulador |

### 4.2 Codificacion por Colores

| Color de Fila | Significado |
|---|---|
| Gris claro (#D9D9D9) | False positive resuelto |
| Naranja (#FCD5B4) | En analisis / pendiente de resolucion |
| Rojo oscuro (#C0504D, texto blanco) | True match confirmado |
| Azul claro (#BDD7EE) | PEP aprobado con EDD |
| Amarillo (#FFEB9C) | Media adversa en evaluacion |

### 4.3 Reglas de Uso

1. **Cada match genera una fila.** Si un cliente genera matches en multiples listas, cada match es una fila separada.
2. **El campo "Analisis" debe ser detallado.** No basta con "false positive". Debe decir: "False positive. El nombre coincide parcialmente pero la fecha de nacimiento difiere (cliente: 1985-03-15, lista: 1962-08-22). Pais de nacimiento diferente (cliente: Colombia, lista: Libia). Conclusion: homonimo, no es la misma persona."
3. **Las capturas de pantalla se guardan** en una carpeta organizada por fecha y ID de cliente.
4. **Los true matches tienen fila roja y nunca se eliminan.**

---

## 5. LOG DE ACTIVIDAD SOSPECHOSA

### 5.1 Estructura de la Hoja "Suspicious_Activity"

| Columna | Nombre | Tipo de Dato | Validacion | Descripcion |
|---|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (SAR-2026-0001) | Identificador unico |
| B | Fecha_Deteccion | Fecha | YYYY-MM-DD | Cuando se detecto |
| C | ID_Cliente_Skale | Texto | -- | ID del cliente |
| D | Nombre_Cliente | Texto | -- | Nombre completo |
| E | Tipo_Actividad | Lista | Ver lista abajo | Tipo de actividad sospechosa |
| F | Descripcion | Texto | Minimo 100 caracteres | Descripcion detallada de la actividad |
| G | Monto_Involucrado | Numero | USD | Monto total involucrado |
| H | Periodo | Texto | -- | Periodo durante el cual ocurrio |
| I | Fuente_Deteccion | Lista | Monitoreo manual / Alerta Skale / Alerta Sumsub / Reporte de equipo | Como se detecto |
| J | Evaluacion_Riesgo | Lista | Bajo / Medio / Alto / Critico | Nivel de riesgo evaluado |
| K | Accion_Tomada | Texto | -- | Que se hizo al respecto |
| L | SAR_Presentado | Lista | Si / No / En evaluacion | Si se presento SAR al regulador |
| M | Fecha_SAR | Fecha | YYYY-MM-DD | Fecha de presentacion del SAR |
| N | Ref_SAR | Texto | -- | Numero de referencia del SAR |
| O | Estado | Lista | Abierto / En investigacion / Cerrado / Reportado | Estado actual |
| P | Revisor | Lista | Susana / Principals | Quien maneja el caso |
| Q | Notas_Seguimiento | Texto | -- | Actualizaciones del caso |
| R | Fecha_Cierre | Fecha | YYYY-MM-DD | Fecha de cierre del caso |

### 5.2 Tipos de Actividad Sospechosa (Lista de Validacion)

| Tipo | Descripcion | Nivel de Riesgo Tipico |
|---|---|---|
| Structuring | Multiples depositos pequenos que evitan umbrales de reporte | Alto |
| Deposito-retiro rapido | Deposito seguido de retiro sin actividad de trading | Alto |
| Terceros | Deposito o retiro desde/hacia cuenta de otra persona | Alto |
| Volumen incoherente | Volumen de deposito incoherente con perfil del cliente | Medio-Alto |
| Cambio de patron | Cambio abrupto en comportamiento de trading | Medio |
| Pais de alto riesgo | Transacciones vinculadas a paises de alto riesgo | Medio-Alto |
| Documentos sospechosos | Documentos que parecen alterados o inconsistentes | Alto |
| Multiples cuentas | Intento de abrir multiples cuentas | Medio |
| Solicitud inusual | Cliente solicita algo inusual (transferencia a tercero, etc.) | Medio |
| Reporte de equipo | Miembro del equipo reporta comportamiento sospechoso de cliente | Variable |

### 5.3 Cuando Presentar un SAR (Suspicious Activity Report)

Un SAR debe presentarse a AOFA cuando: [VERIFICAR CON ABOGADO]

1. Se tiene sospecha razonable de que los fondos provienen de actividad criminal.
2. Se tiene sospecha de que el cliente esta utilizando la cuenta para lavado de dinero.
3. Se tiene sospecha de financiamiento al terrorismo.
4. El cliente intenta evadir controles de compliance (structuring).
5. Se descubre que el cliente proporciono informacion falsa durante el KYC.

**Importante:** La decision de presentar un SAR es de Susana, con consulta a Principals. El SAR se presenta al regulador, NO se notifica al cliente. Notificar al cliente de la existencia de un SAR es un delito en la mayoria de las jurisdicciones (tipping off). [VERIFICAR CON ABOGADO]

---

## 6. LOG DE CAPACITACION

### 6.1 Estructura de la Hoja "Training_Log"

| Columna | Nombre | Tipo de Dato | Descripcion |
|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (TRN-2026-0001) |
| B | Fecha | Fecha | Fecha de la capacitacion |
| C | Tema | Texto | Tema de la capacitacion |
| D | Tipo | Lista | Induccion / Actualizacion / Regulatoria / Tecnica |
| E | Participantes | Texto | Nombres de los participantes |
| F | Instructor | Texto | Quien dio la capacitacion |
| G | Duracion | Numero | Horas |
| H | Material | Texto | Referencia al material utilizado |
| I | Evaluacion | Lista | Aprobado / No aplica | Si hubo evaluacion |
| J | Notas | Texto | Observaciones |

### 6.2 Capacitaciones Requeridas

| Capacitacion | Audiencia | Frecuencia | Contenido |
|---|---|---|---|
| Induccion AML/KYC | Todo empleado nuevo | Al ingreso | Conceptos basicos de AML, obligaciones del broker, frases prohibidas |
| AML para equipo de ventas | Ventas (Franco, Edward, Luis) | Semestral | Que NO decir al cliente, como detectar banderas rojas, cuando escalar |
| AML para soporte | Equipo de soporte | Semestral | Manejo de quejas de compliance, que informacion no revelar |
| Actualizacion regulatoria | Susana + Principals | Trimestral | Cambios en regulacion, nuevas listas, actualizaciones de AOFA |
| Uso de Sumsub | Susana | Al onboarding + cuando hay updates | Funcionalidades nuevas, configuracion, mejores practicas |
| Simulacro de SAR | Susana + Principals | Anual | Practica de presentacion de SAR |

---

## 7. LOG DE QUEJAS DE COMPLIANCE

### 7.1 Estructura de la Hoja "Complaints"

| Columna | Nombre | Tipo de Dato | Descripcion |
|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (CMP-2026-0001) |
| B | Fecha_Recepcion | Fecha | Cuando se recibio la queja |
| C | ID_Cliente_Skale | Texto | ID del cliente |
| D | Nombre_Cliente | Texto | Nombre completo |
| E | Canal | Lista | Email / Chat / Telefono / Redes / AOFA | Por donde llego la queja |
| F | Tipo_Queja | Lista | KYC demora / KYC rechazo / Cuenta bloqueada / Retiro bloqueado / Otro | Categoria |
| G | Descripcion | Texto | Detalle de la queja |
| H | Justificacion_Compliance | Texto | Por que se tomo la accion que genero la queja |
| I | Accion_Tomada | Texto | Que se hizo para resolver |
| J | Estado | Lista | Abierto / En proceso / Resuelto / Escalado a AOFA | Estado actual |
| K | Fecha_Resolucion | Fecha | Cuando se resolvio |
| L | Resolucion | Texto | Como se resolvio |
| M | Satisfaccion_Cliente | Lista | Satisfecho / No satisfecho / N/A | Resultado |
| N | Revisor | Lista | Susana / Principals | Quien manejo la queja |

### 7.2 Quejas Tipicas y Como Manejarlas

| Queja | Respuesta Correcta | Lo que NO decir |
|---|---|---|
| "Mi KYC tarda mucho" | "Estamos revisando tu documentacion. Te informaremos en un maximo de [SLA]." | "Estan revisando tus sanciones." |
| "Me rechazaron y mi documento es real" | "Lamentamos el inconveniente. Puedes contactarnos en [email] para explorar opciones." | "Nuestro sistema detecto que tu documento es falso." |
| "Me bloquearon la cuenta sin razon" | "Tu cuenta esta bajo revision por cumplimiento regulatorio. Te contactaremos con mas informacion." | "Sospechamos de lavado de dinero." |
| "No puedo retirar mi dinero" | "Estamos revisando tu solicitud. Los retiros requieren verificacion adicional en ciertos casos." | "Tus fondos estan congelados por sanciones." |
| "Quiero hablar con compliance" | "Nuestro equipo de compliance esta revisando tu caso. Te contactaremos por email." | "Susana esta revisando tu caso de sanciones." |

**Regla absoluta:** NUNCA revelar informacion de compliance interna al cliente. Ni el equipo de ventas, ni soporte, ni nadie mas que Susana y Principals puede dar detalles sobre decisiones de compliance.

---

## 8. AUDIT TRAIL

### 8.1 Estructura de la Hoja "Audit_Trail"

| Columna | Nombre | Tipo de Dato | Descripcion |
|---|---|---|---|
| A | ID_Registro | Texto | Auto-incremento (AUD-2026-0001) |
| B | Fecha | Fecha | YYYY-MM-DD |
| C | Hora | Hora | HH:MM |
| D | Usuario | Lista | Susana / Principals / Sistema | Quien realizo la accion |
| E | Accion | Lista | Ver lista abajo | Tipo de accion |
| F | Detalle | Texto | Descripcion de la accion |
| G | Registro_Afectado | Texto | ID del registro modificado (KYC-xxx, SCR-xxx, etc.) |
| H | Valor_Anterior | Texto | Valor antes del cambio (si aplica) |
| I | Valor_Nuevo | Texto | Valor despues del cambio (si aplica) |
| J | Razon_Cambio | Texto | Por que se hizo el cambio |

### 8.2 Acciones a Registrar en Audit Trail

| Accion | Cuando se Registra |
|---|---|
| Modificacion de registro | Cualquier cambio a una fila existente en cualquier hoja |
| Cambio de decision | Una decision KYC se revierte (ej. de rechazado a aprobado) |
| Acceso a datos sensibles | Cuando alguien accede a documentos de un cliente especifico por razon no rutinaria |
| Exportacion de datos | Cuando se exportan datos del registro |
| Cambio de configuracion | Modificacion de listas de validacion, paises, reglas |
| Escalacion | Cada vez que un caso se escala |
| Comunicacion con regulador | Cada comunicacion enviada a o recibida de AOFA |
| Cambio de politica | Cualquier cambio en politicas o procedimientos de compliance |

### 8.3 Por Que el Audit Trail es Critico

En una auditoria, el regulador quiere ver dos cosas:
1. Que las decisiones fueron correctas.
2. Que nadie manipulo los registros despues del hecho.

El audit trail demuestra lo segundo. Si un registro fue modificado, debe quedar constancia de quien lo modifico, cuando y por que. Un registro sin audit trail pierde credibilidad ante un auditor.

---

## 9. INSTRUCCIONES PARA CREAR LOS SPREADSHEETS

### 9.1 Configuracion General

**Plataforma recomendada:** Google Sheets (permite acceso compartido, historial de versiones automatico, acceso desde cualquier dispositivo).

**Alternativa:** Excel en OneDrive/SharePoint (si se prefiere Microsoft).

**Permisos de acceso:**
| Persona | Nivel de Acceso |
|---|---|
| Susana | Editor (todas las hojas) |
| Principals | Editor (todas las hojas) |
| Equipo de ventas | Solo lectura de la hoja Dashboard (si se comparte) |
| Soporte | Sin acceso |
| Auditores externos | Solo lectura (temporal, cuando se otorgue) |

### 9.2 Pasos para Crear el Archivo

**Paso 1:** Crear nuevo Google Sheet llamado "NEOMAAA_Compliance_Register_2026".

**Paso 2:** Crear las siguientes hojas (tabs):
- Dashboard
- KYC_Decisions
- Sanctions_Screening
- Suspicious_Activity
- Training_Log
- Complaints
- Audit_Trail
- Config

**Paso 3:** En la hoja "Config", crear las listas de validacion:

| Celda Inicial | Lista | Valores |
|---|---|---|
| A1 | Tiers | Tier 1, Tier 2, Tier 3 |
| B1 | Resultados_Sumsub | GREEN, RETRY, RED, PENDING |
| C1 | Screening_Results | Clean, Hit - FP, Hit - TM, PEP, Adverse Media |
| D1 | Decisiones | Aprobado, Rechazado, Retry, En EDD, Escalado |
| E1 | Revisores | Susana, Automatico, Principals |
| F1 | Si_No | Si, No |
| G1 | Riesgo | Bajo, Medio, Alto, Critico |
| H1 | Estado_Caso | Abierto, En investigacion, Cerrado, Reportado |
| I1 | Paises | [Lista completa de paises] |
| J1 | Canal_Queja | Email, Chat, Telefono, Redes, AOFA |

**Paso 4:** En cada hoja de datos, configurar:
- Fila 1: Encabezados (congelar fila).
- Validacion de datos: vincular columnas tipo "Lista" a las listas de la hoja Config.
- Formato condicional: aplicar codificacion de colores segun las reglas de cada seccion.
- Filtros: habilitar filtros en todas las columnas.

**Paso 5:** En la hoja Dashboard, crear formulas de resumen:

```
Total Aprobados (mes actual):
=COUNTIFS(KYC_Decisions!L:L,"Aprobado",KYC_Decisions!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))

Total Rechazados (mes actual):
=COUNTIFS(KYC_Decisions!L:L,"Rechazado",KYC_Decisions!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))

Sanctions Hits (mes actual):
=COUNTIFS(Sanctions_Screening!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))

False Positives (mes actual):
=COUNTIFS(Sanctions_Screening!K:K,"False Positive",Sanctions_Screening!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))

Casos Pendientes >24h (ALERTA):
=COUNTIFS(KYC_Decisions!L:L,"En EDD",KYC_Decisions!B:B,"<"&TODAY()-1) + COUNTIFS(KYC_Decisions!L:L,"Escalado",KYC_Decisions!B:B,"<"&TODAY()-1)
```

**Paso 6:** Proteger la hoja Config para que solo Susana pueda modificarla.

**Paso 7:** Habilitar historial de versiones (automatico en Google Sheets).

### 9.3 Mantenimiento del Archivo

| Tarea | Frecuencia | Responsable |
|---|---|---|
| Registrar decisiones KYC del dia | Diaria | Susana |
| Verificar que Dashboard muestra datos correctos | Semanal | Susana |
| Backup del archivo (exportar a Excel) | Semanal | Susana |
| Crear nuevo archivo para el ano siguiente | Anual (diciembre) | Susana |
| Archivar archivo del ano anterior | Anual (enero) | Susana |
| Revisar y actualizar listas de Config | Trimestral | Susana |

---

## 10. REPORTES PARA AOFA

### 10.1 Reporte Trimestral de Cumplimiento AML

**Deadline:** 15 dias despues del cierre del trimestre.

**Contenido requerido:** [VERIFICAR CON ABOGADO] -- Confirmar formato exacto que AOFA exige.

| Seccion | Contenido | Fuente de Datos |
|---|---|---|
| 1. Resumen ejecutivo | Resumen de actividad del trimestre | Dashboard |
| 2. Estadisticas KYC | Total de verificaciones, aprobaciones, rechazos, por tier | KYC_Decisions |
| 3. Screening de sanciones | Total de screenings, matches, false positives, true matches | Sanctions_Screening |
| 4. Actividad sospechosa | SARs presentados, investigaciones en curso | Suspicious_Activity |
| 5. Capacitaciones | Capacitaciones realizadas en el trimestre | Training_Log |
| 6. Quejas | Quejas recibidas y su resolucion | Complaints |
| 7. Incidentes | Cualquier incidente relevante | Varios |
| 8. Cambios de politica | Cambios realizados en politicas de compliance | Audit_Trail |
| 9. Plan para siguiente trimestre | Acciones planeadas | Manual |

### 10.2 Reporte Anual

**Deadline:** 90 dias despues del cierre fiscal. [VERIFICAR CON ABOGADO]

**Contenido adicional al trimestral:**
- Estados financieros auditados de la entidad.
- Declaracion de directores y beneficiarios finales.
- Evaluacion anual de riesgo de lavado de dinero.
- Plan de compliance para el siguiente ano.
- Resultados de auditorias internas o externas.

### 10.3 Reportes Ad-Hoc

| Evento | Reporte | Plazo |
|---|---|---|
| True match de sanciones | Notificacion inmediata a AOFA | Mismo dia [VERIFICAR CON ABOGADO] |
| SAR de alto riesgo (terrorismo) | Reporte inmediato | Mismo dia |
| Cambio de directores/accionistas | Notificacion | 14 dias |
| Cambio de Compliance Officer | Notificacion | 7 dias |
| Incidente de seguridad de datos | Notificacion | 72 horas |

---

## 11. ALMACENAMIENTO Y SEGURIDAD

### 11.1 Ubicaciones de Almacenamiento

| Tipo de Dato | Ubicacion Principal | Backup | Retencion |
|---|---|---|---|
| Registro Maestro de Compliance | Google Sheets (Drive compartido) | Export semanal a Excel en Drive | 7 anos |
| Documentos de clientes (ID, PoA, SoF) | Sumsub | Sumsub mantiene backup | 5 anos post cierre |
| Capturas de pantalla de screening | Google Drive (carpeta Compliance) | -- | 7 anos |
| Comunicaciones con AOFA | Email + copia en Drive | -- | 10 anos |
| Politicas y procedimientos (este documento y similares) | neomaaa-hub (repositorio) | Git history | Permanente |
| SARs presentados | Copia digital en Drive protegido | -- | 10 anos |

### 11.2 Seguridad

| Medida | Implementacion |
|---|---|
| Acceso restringido | Solo Susana y Principals tienen acceso al Registro Maestro |
| Autenticacion | Google Workspace con 2FA activado |
| Historial de versiones | Google Sheets mantiene automaticamente |
| No compartir por email | Los registros de compliance nunca se envian por email sin cifrar |
| Pantalla limpia | Susana no debe dejar el Registro abierto cuando se aleja de su escritorio |
| Dispositivos seguros | Solo acceder desde dispositivos autorizados |

### 11.3 Periodos de Retencion

| Tipo de Registro | Retencion Minima | Base Legal |
|---|---|---|
| Registros KYC | 5 anos desde cierre de cuenta | Estandar AML internacional [VERIFICAR CON ABOGADO] |
| Registros de screening con match | 7 anos desde cierre de cuenta | Practica de industria |
| SARs | 10 anos | Practica de industria [VERIFICAR CON ABOGADO] |
| Registros de capacitacion | 5 anos | Practica de industria |
| Quejas de compliance | 5 anos desde resolucion | Practica de industria |
| Comunicaciones con regulador | 10 anos | Practica de industria |
| Audit trail | 7 anos | Practica de industria |

---

## 12. CALENDARIO DE REVISION DE REGISTROS

### 12.1 Revision Diaria

| Hora | Tarea |
|---|---|
| 9:00 | Registrar decisiones pendientes del dia anterior que no se hayan registrado |
| 17:00 | Registrar decisiones del dia. Verificar que no hay campos vacios obligatorios. |

### 12.2 Revision Semanal (Viernes)

- [ ] Verificar que todas las decisiones KYC de la semana estan registradas.
- [ ] Verificar que todos los screening matches de la semana estan en la hoja de sanciones.
- [ ] Verificar que el Dashboard muestra datos coherentes.
- [ ] Hacer backup semanal (export a Excel).
- [ ] Verificar que no hay casos abiertos de mas de 7 dias sin actualizacion.

### 12.3 Revision Mensual (Ultimo Viernes del Mes)

- [ ] Compilar estadisticas del mes para el Dashboard.
- [ ] Verificar integridad de datos: no hay celdas vacias en campos obligatorios.
- [ ] Reconciliar con Sumsub: el numero de decisiones en el registro coincide con Sumsub.
- [ ] Reconciliar con Skale: los estados de clientes en Skale coinciden con el registro.
- [ ] Preparar resumen mensual para Principals.

### 12.4 Revision Trimestral (Antes del Reporte a AOFA)

- [ ] Revision completa de todos los registros del trimestre.
- [ ] Verificar que todos los SARs estan documentados.
- [ ] Verificar que todos los true matches de sanciones estan reportados.
- [ ] Preparar reporte trimestral para AOFA.
- [ ] Actualizar listas de validacion en Config si hubo cambios.
- [ ] Archivar documentos del trimestre.

### 12.5 Revision Anual (Diciembre)

- [ ] Revision completa del ano.
- [ ] Crear archivo para el siguiente ano.
- [ ] Archivar el archivo del ano que termina.
- [ ] Preparar insumos para el reporte anual.
- [ ] Evaluar si la estructura del registro necesita cambios para el siguiente ano.
- [ ] Evaluar si es momento de migrar a un sistema dedicado de compliance (si el volumen lo justifica).

---

**FIN DEL DOCUMENTO**

*Ultima actualizacion: 8 de abril de 2026*
*Proxima revision programada: 8 de julio de 2026*
*Responsable: Susana (Compliance Officer)*
*Aprobado por: Principals*