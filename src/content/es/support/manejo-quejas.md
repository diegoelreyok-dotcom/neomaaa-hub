# Protocolo de Manejo de Quejas — NEOMAAA Markets

**Documento interno — Equipo de Soporte, Compliance y Direccion**
**Version:** 1.0
**Ultima actualizacion:** Abril 2026
**Aplica a:** Rocio, Marilyn (soporte), Susana (compliance), Edward (sales lead)

---

## INDICE

1. [Definicion y Clasificacion de Quejas](#1-definicion-y-clasificacion-de-quejas)
2. [Proceso Formal de Manejo de Quejas](#2-proceso-formal-de-manejo-de-quejas)
3. [Niveles de Severidad](#3-niveles-de-severidad)
4. [SLAs de Quejas](#4-slas-de-quejas)
5. [Scripts por Tipo de Queja](#5-scripts-por-tipo-de-queja)
6. [Registro y Documentacion](#6-registro-y-documentacion)
7. [Analisis y Prevencion](#7-analisis-y-prevencion)
8. [Quejas Regulatorias y Legales](#8-quejas-regulatorias-y-legales)
9. [Compensaciones y Goodwill](#9-compensaciones-y-goodwill)
10. [Indicadores de Gestion de Quejas](#10-indicadores-de-gestion-de-quejas)

---

## 1. Definicion y Clasificacion de Quejas

### 1.1 Que es una Queja

Una queja es cualquier expresion de insatisfaccion de un cliente sobre un servicio, producto, proceso o trato recibido por parte de NEOMAAA Markets, que requiere una respuesta o accion correctiva.

**Diferencia entre consulta y queja:**

| Tipo | Ejemplo | Tratamiento |
|------|---------|-------------|
| **Consulta** | "Cuanto tardan los retiros?" | Respuesta informativa, flujo normal de soporte |
| **Queja operativa** | "Mi retiro lleva 5 dias y no me responden" | Protocolo de quejas nivel 1 |
| **Queja grave** | "Me cobraron una comision que no deberian" | Protocolo de quejas nivel 2 |
| **Queja regulatoria** | "Voy a reportarlos al regulador" | Protocolo de quejas nivel 3 — escalar a compliance inmediatamente |

### 1.2 Clasificacion por Categoria

| Categoria | Descripcion | Ejemplos |
|-----------|------------|---------|
| **Depositos/Retiros** | Problemas con movimientos de dinero | Retiro demorado, deposito no acreditado, comision inesperada |
| **Ejecucion** | Problemas con la operacion de trading | Slippage excesivo, requotes, ordenes no ejecutadas, stop loss no respetado |
| **Plataforma** | Problemas tecnicos con MT5 | Caida de plataforma, desconexiones, errores de login |
| **Atencion al cliente** | Insatisfaccion con el servicio recibido | Respuesta lenta, informacion incorrecta, trato inadecuado |
| **KYC/Cuenta** | Problemas con verificacion o configuracion | KYC rechazado sin razon clara, cuenta bloqueada, datos incorrectos |
| **Comisiones/Spreads** | Discrepancias en costos | Spread mayor al anunciado, comisiones no informadas, swaps incorrectos |
| **Compliance** | Quejas de naturaleza regulatoria | Uso indebido de datos, promesas de rendimiento por un agente, presion indebida |

---

## 2. Proceso Formal de Manejo de Quejas

### 2.1 Las 7 Etapas

```
RECEPCION → ACUSE → CLASIFICACION → INVESTIGACION → RESOLUCION → COMUNICACION → SEGUIMIENTO
   (1)       (2)       (3)            (4)             (5)          (6)            (7)
```

### Etapa 1: Recepcion

**Quien:** Agente de soporte (L1)
**Tiempo:** Inmediato al recibir la queja

**Acciones:**
1. Identificar que se trata de una queja (no una consulta)
2. Registrar en Intercom con tag `complaint`
3. Asignar prioridad inicial segun matriz de severidad (seccion 3)
4. Documentar textualmente lo que el cliente reporta — sin interpretar ni resumir

**Que decirle al cliente:**
```
Hola [nombre], he recibido tu queja y quiero que sepas que la tomamos 
muy en serio. Voy a documentar todo lo que me has compartido y 
asegurarme de que reciba la atencion adecuada.
```

### Etapa 2: Acuse de Recibo

**Quien:** Agente de soporte (L1)
**Tiempo:** Dentro de los primeros 30 minutos desde la recepcion

**Acciones:**
1. Enviar confirmacion formal al cliente con numero de caso
2. Informar tiempo estimado de investigacion segun severidad
3. Proporcionar canal de seguimiento

**Template de acuse:**
```
Hola [nombre],

Confirmo la recepcion de tu queja relacionada con [tema resumido].

Tu numero de caso es: #[numero_ticket]

Nuestro equipo esta revisando tu caso. Te proporcionare una actualizacion 
dentro de [tiempo segun severidad].

Si tienes informacion adicional que pueda ayudar a la investigacion 
(capturas de pantalla, comprobantes, numeros de transaccion), por favor 
envialos aqui.

[Nombre del agente]
NEOMAAA Markets — Soporte
```

### Etapa 3: Clasificacion

**Quien:** Agente L1 (quejas nivel 1) o Susana/Edward (nivel 2-3)
**Tiempo:** Dentro de 1 hora desde la recepcion

**Acciones:**
1. Asignar categoria (seccion 1.2)
2. Asignar nivel de severidad (seccion 3)
3. Determinar si requiere escalamiento
4. Asignar responsable de investigacion
5. Actualizar tags en Intercom: `complaint` + `complaint-[categoria]` + `severity-[nivel]`

### Etapa 4: Investigacion

**Quien:** Responsable asignado segun categoria

| Categoria | Investigador Principal | Consulta a |
|-----------|----------------------|------------|
| Depositos/Retiros | Finance Manager | PSP, banco |
| Ejecucion | Pepe (Dealing) | Logs de MT5, proveedor de liquidez |
| Plataforma | Pepe (Dealing) | Equipo tecnico |
| Atencion al cliente | Edward (Sales Lead) | Agente involucrado |
| KYC/Cuenta | Susana (Compliance) | Sumsub |
| Comisiones/Spreads | Pepe (Dealing) | Logs de MT5 |
| Compliance | Susana (Compliance) | Agente involucrado, registros |

**Proceso de investigacion:**
1. Recopilar toda la evidencia disponible (logs, tickets, grabaciones, registros CRM)
2. Obtener la version del equipo interno involucrado
3. Cruzar informacion del cliente con los sistemas (Skale, MT5, Sumsub, PSP)
4. Determinar si la queja es procedente, parcialmente procedente, o improcedente
5. Documentar hallazgos en nota interna del ticket

### Etapa 5: Resolucion

**Quien:** Responsable de investigacion + aprobacion de Edward o Susana si involucra compensacion

**Opciones de resolucion:**

| Resultado | Accion |
|-----------|--------|
| Queja procedente — error de NEOMAAA | Corregir el error + disculpa + compensacion si aplica |
| Queja procedente — error de tercero (PSP, banco) | Explicar al cliente, ofrecer alternativas, asistir con la resolucion |
| Queja parcialmente procedente | Corregir lo que corresponda, explicar lo que no |
| Queja improcedente | Explicar con datos y evidencia por que, con tono respetuoso |

### Etapa 6: Comunicacion de Resolucion

**Quien:** Agente de soporte original (para mantener continuidad)
**Tiempo:** Segun SLA de severidad

**Template de resolucion:**
```
Hola [nombre],

Quiero darte una actualizacion sobre tu caso #[numero].

Despues de investigar tu queja sobre [resumen del problema], encontramos 
lo siguiente:

[Explicacion clara y factual de lo que se encontro]

La resolucion que hemos aplicado es:
[Descripcion de la accion correctiva]

[Si aplica compensacion:] 
Adicionalmente, como gesto por la inconveniencia causada, hemos [detalle 
de compensacion].

Si no estas satisfecho con esta resolucion o tienes preguntas adicionales, 
por favor respondeme aqui. Tu caso seguira abierto hasta que confirmes 
que estas conforme.

[Nombre del agente]
NEOMAAA Markets — Soporte
```

### Etapa 7: Seguimiento

**Quien:** Agente de soporte
**Tiempo:** 48 horas despues de comunicar la resolucion, y luego a los 7 dias

**Acciones:**
1. Contactar al cliente para confirmar satisfaccion
2. Si el cliente no responde en 48h, enviar un recordatorio
3. Si el cliente confirma satisfaccion, cerrar el ticket con tag `complaint-resolved`
4. Si el cliente no esta satisfecho, reabrir investigacion o escalar a nivel superior
5. A los 7 dias, enviar encuesta de satisfaccion breve

**Template de seguimiento:**
```
Hola [nombre],

Queria verificar que tu caso #[numero] haya quedado resuelto 
satisfactoriamente. 

La solucion que aplicamos fue: [resumen breve].

Todo bien o hay algo mas que pueda hacer por ti?
```

---

## 3. Niveles de Severidad

| Nivel | Nombre | Criterio | Ejemplo | Responsable |
|-------|--------|----------|---------|-------------|
| **1** | Baja | Inconveniencia menor, no involucra dinero | Respuesta lenta a una consulta, informacion confusa | Agente L1 |
| **2** | Media | Impacta operatividad, involucra dinero pero no perdida | Retiro demorado (dentro de SLA), deposito lento, problema tecnico temporal | Agente L1 + L2 |
| **3** | Alta | Perdida potencial o real de dinero, incumplimiento de SLA | Retiro demorado fuera de SLA, deposito no acreditado >48h, ejecucion erronea | L2 + Edward |
| **4** | Critica | Amenaza legal, mencion de regulador, perdida financiera significativa, queja de compliance | "Voy a reportar al regulador", "Me prometieron ganancias", perdida >$5,000 por error de plataforma | Susana + Principals |

---

## 4. SLAs de Quejas

### Tiempos Maximos por Nivel

| Nivel | Acuse de Recibo | Primera Actualizacion | Resolucion Final |
|-------|----------------|----------------------|-----------------|
| 1 — Baja | 30 minutos | 4 horas | 24 horas habiles |
| 2 — Media | 30 minutos | 2 horas | 12 horas habiles |
| 3 — Alta | 15 minutos | 1 hora | 8 horas habiles |
| 4 — Critica | Inmediato | 30 minutos | 4 horas habiles (accion inicial) |

### Escalamiento Automatico

| Condicion | Accion |
|-----------|--------|
| Queja sin acuse en 30 min | Auto-escalar a Edward |
| Queja sin actualizacion en el doble del SLA | Auto-escalar a Principals via Susana |
| Cliente envio 3+ mensajes sin respuesta sobre una queja | Reclasificar como nivel superior |
| Queja que menciona regulador, abogado, o autoridades | Nivel 4 automatico, escalar a Susana inmediatamente |

---

## 5. Scripts por Tipo de Queja

### 5.1 Retiro Demorado

```
Hola [nombre], lamento la demora con tu retiro.

He verificado tu solicitud #[numero] por $[monto] y su estado actual 
es [estado]. Voy a priorizar la revision con nuestro equipo de finanzas 
ahora mismo.

Te confirmo una actualizacion dentro de [tiempo]. Si necesito 
informacion adicional de tu parte, te la solicito de inmediato.

Entiendo que esperar por tu dinero genera ansiedad y quiero que sepas 
que es nuestra prioridad resolverlo.
```

### 5.2 Deposito No Acreditado

```
Hola [nombre], entiendo tu preocupacion. Vamos a resolver esto.

Para poder rastrear tu deposito necesito:
1. Metodo de pago utilizado
2. Monto exacto depositado
3. Fecha y hora aproximada
4. Comprobante de la transaccion (captura o TX hash si fue crypto)

Con esta informacion verifico directamente con el procesador de pagos. 
Te confirmo el resultado en [tiempo].
```

### 5.3 Problema de Ejecucion

```
Hola [nombre], tomo nota de tu reporte sobre la ejecucion de tu operacion.

Para investigar necesito los siguientes datos:
- Numero de cuenta MT5
- Numero de orden/ticket de la operacion
- Instrumento operado (par, indice, etc.)
- Hora exacta de la operacion
- Que esperabas vs. que paso
- Captura de pantalla si la tienes

Este tipo de reporte lo revisa nuestro equipo de dealing con acceso 
a los logs de ejecucion. Te doy un resultado dentro de [tiempo].
```

### 5.4 Trato Inadecuado de un Agente

```
Hola [nombre], lamento la experiencia que describes.

Tomo muy en serio este tipo de feedback. Voy a revisar la conversacion 
con el equipo y asegurarme de que se tomen las medidas necesarias.

Puedo ayudarte ahora con lo que necesitabas resolver originalmente? 
Quiero asegurarme de que tu consulta quede resuelta ademas de atender 
tu queja.
```

### 5.5 Comisiones o Cargos Inesperados

```
Hola [nombre], entiendo tu preocupacion sobre los cargos en tu cuenta.

He verificado tu cuenta MT5 #[numero] y encontre lo siguiente:
[Detallar los cargos y su origen — swap, comision, spread, etc.]

[Si el cargo es correcto:]
Este cargo corresponde a [explicacion]. Es una condicion estandar que 
aplica a [circunstancia]. Puedes verificar las condiciones de cada 
instrumento en MT5 haciendo clic derecho > Especificacion.

[Si el cargo es incorrecto:]
He identificado una discrepancia en [detalle]. Estoy escalando este caso 
para que se corrija lo antes posible. Te confirmo cuando se aplique el 
ajuste.
```

### 5.6 Queja Repetida / Cliente Insatisfecho con Resolucion Previa

```
Hola [nombre], veo que este tema no quedo resuelto a tu satisfaccion 
en tu caso anterior #[numero].

Quiero escuchar directamente de ti que es lo que falta para que esto 
quede correctamente resuelto. Revisare todo el historial de tu caso y 
me comprometo a darte una respuesta definitiva en [tiempo].

Tu satisfaccion es importante para nosotros y no quiero que esto quede 
sin resolver.
```

---

## 6. Registro y Documentacion

### 6.1 Datos Obligatorios en Cada Queja

Todo ticket de queja en Intercom debe tener:

| Campo | Obligatorio | Ejemplo |
|-------|-------------|---------|
| Tag `complaint` | Si | — |
| Tag de categoria | Si | `complaint-withdrawal`, `complaint-execution` |
| Tag de severidad | Si | `severity-1`, `severity-2`, `severity-3`, `severity-4` |
| Numero de cuenta MT5 | Si (si tiene cuenta) | 12345678 |
| Descripcion textual del cliente | Si | Copiar textualmente |
| Fecha de recepcion | Si (automatico) | — |
| Agente asignado | Si | Rocio |
| Estado de investigacion | Si | pendiente / en proceso / resuelto / cerrado |
| Resultado de investigacion | Si (al resolver) | procedente / improcedente / parcial |
| Accion correctiva aplicada | Si (si aplica) | Ajuste de balance, compensacion, disculpa |
| Fecha de resolucion | Si | — |
| Confirmacion de satisfaccion del cliente | Si | Si / No / Sin respuesta |

### 6.2 Registro Mensual de Quejas

Edward debe mantener un registro mensual con:

| Dato | Proposito |
|------|-----------|
| Total de quejas recibidas | Volumen |
| Quejas por categoria | Detectar areas problematicas |
| Quejas por severidad | Medir gravedad |
| Tiempo promedio de resolucion | Eficiencia |
| % de quejas resueltas dentro de SLA | Cumplimiento |
| % de clientes satisfechos con la resolucion | Calidad |
| Quejas repetidas del mismo cliente | Detectar problemas sistemicos |
| Quejas escaladas a nivel 4 | Riesgo regulatorio |

---

## 7. Analisis y Prevencion

### 7.1 Revision Mensual de Quejas

**Frecuencia:** Primer lunes de cada mes
**Participantes:** Edward, Susana, representante de soporte
**Duracion:** 30 minutos

**Agenda:**
1. Revision de metricas del mes (seccion 10)
2. Top 3 categorias de quejas — que las causa?
3. Quejas recurrentes — hay un problema sistemico?
4. Acciones preventivas para el mes siguiente
5. Reconocer mejoras logradas

### 7.2 Acciones Preventivas Comunes

| Queja Recurrente | Accion Preventiva |
|-----------------|-------------------|
| Retiros demorados | Revisar proceso con PSP, mejorar comunicacion proactiva |
| Depositos no acreditados | Mejorar guias de deposito, agregar alertas automaticas |
| Mala ejecucion | Revisar configuracion con proveedor de liquidez, auditar logs |
| Informacion incorrecta de agentes | Sesion de capacitacion, actualizar documentacion interna |
| Tiempo de respuesta largo | Revisar carga de trabajo, considerar tercer agente |

---

## 8. Quejas Regulatorias y Legales

### 8.1 Definicion

Una queja regulatoria es cualquier queja que:
- Menciona al regulador (AOFA, o cualquier otro)
- Menciona abogados o acciones legales
- Involucra alegaciones de fraude, manipulacion, o engano
- Menciona la proteccion de datos o privacidad
- Viene directamente del regulador o de una autoridad

### 8.2 Protocolo Inmediato

1. **Detener cualquier respuesta al fondo.** Solo confirmar recepcion.
2. **Documentar textualmente** todo lo que el cliente ha dicho/escrito.
3. **Escalar a Susana inmediatamente** via Slack + email con el asunto: "QUEJA REGULATORIA — [nombre cliente] — #[ticket]"
4. **No discutir, no argumentar, no prometer.** Solo acusar recibo.
5. **Susana toma control del caso** dentro de las siguientes 2 horas.

**Script de acuse para quejas regulatorias:**
```
Hola [nombre],

He recibido tu comunicacion y la tomo con la seriedad que merece.

Tu caso ha sido transferido a nuestro equipo de compliance, que se 
pondra en contacto contigo directamente. El numero de tu caso es 
#[numero].

[Nombre del agente]
NEOMAAA Markets
```

**Lo que el agente de soporte NO debe hacer:**
- No opinar sobre si la queja tiene fundamento
- No dar explicaciones legales o regulatorias
- No prometer compensaciones o resoluciones
- No pedir al cliente que "no escale"
- No minimizar la queja

### 8.3 Quejas ante el Regulador (AOFA)

Si NEOMAAA recibe una queja formal de la AOFA:
1. Susana coordina la respuesta con Principals
2. Plazo de respuesta segun los requerimientos de AOFA
3. Toda comunicacion con el regulador pasa por Susana
4. Se documenta en el registro de compliance separado del registro de quejas operativas

---

## 9. Compensaciones y Goodwill

### 9.1 Quien Puede Autorizar

| Tipo de Compensacion | Monto Maximo | Quien Autoriza |
|---------------------|-------------|----------------|
| Disculpa formal (sin compensacion economica) | $0 | Agente L1 |
| Reversion de comision o swap | Hasta $50 USD | Edward |
| Credito de goodwill en cuenta | Hasta $100 USD | Edward + Susana |
| Credito de goodwill > $100 | Sin limite | Principals |
| Ajuste de balance por error comprobado | Monto del error | Finance Manager + Susana |

### 9.2 Criterios para Compensar

| Criterio | Aplica Compensacion | No Aplica |
|----------|-------------------|-----------|
| Error comprobado de NEOMAAA (deposito no acreditado, ejecucion erronea) | Si — monto del error + goodwill | — |
| Demora fuera de SLA sin comunicacion proactiva | Si — goodwill proporcional | — |
| Error del cliente (envio a red incorrecta, mala orden) | No — pero se asiste en lo posible | Si |
| Condiciones normales de mercado (slippage, gap) | No | Si |
| Queja sobre trato de un agente | Disculpa formal, posible goodwill | — |

### 9.3 Documentacion de Compensaciones

Toda compensacion debe registrarse con:
- Numero de ticket
- Monto compensado
- Razon de la compensacion
- Quien lo autorizo
- Fecha

[REVISAR: Definir plantilla de registro de compensaciones en Skale CRM]

---

## 10. Indicadores de Gestion de Quejas

### KPIs Mensuales

| Indicador | Meta | Formula |
|-----------|------|---------|
| Total de quejas | Tendencia descendente | Conteo mensual |
| Tasa de resolucion dentro de SLA | >90% | Quejas resueltas en SLA / Total quejas |
| Satisfaccion del cliente con resolucion | >80% | Respuestas positivas / Total respuestas |
| Quejas nivel 4 (criticas) | <2 por mes | Conteo mensual |
| Quejas recurrentes del mismo cliente | <5% | Clientes con 2+ quejas / Total clientes con quejas |
| Tiempo promedio de resolucion | Nivel 1: <24h, Nivel 2: <12h, Nivel 3: <8h | Promedio |
| Tasa de compensaciones | Seguimiento (no meta fija) | Compensaciones / Total quejas |

### Reporte Semanal de Quejas (Edward)

```
REPORTE SEMANAL QUEJAS — Semana [#]

Quejas nuevas: ___
Quejas resueltas: ___
Quejas pendientes: ___
Quejas escaladas a nivel 3-4: ___

Top categorias:
1. ___
2. ___
3. ___

Quejas fuera de SLA: ___
Compensaciones otorgadas: $___

Acciones correctivas en proceso:
- ___
```

---

*Documento preparado para uso interno de NEOMAAA Markets.*
*Toda queja debe tratarse como una oportunidad de mejora y de fortalecer la relacion con el cliente.*
*Revision trimestral obligatoria.* [REVISAR: Programar primera revision trimestral]
