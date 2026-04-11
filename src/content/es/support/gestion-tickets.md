# Workflow de Gestion de Tickets — NEOMAAA Markets

**Documento interno — Equipo de Soporte**
**Version:** 1.0
**Ultima actualizacion:** Abril 2026
**Herramienta:** Intercom
**Aplica a:** Rocio, Marilyn (soporte), Edward (supervision)

---

## INDICE

1. [Ciclo de Vida de un Ticket](#1-ciclo-de-vida-de-un-ticket)
2. [Creacion y Clasificacion](#2-creacion-y-clasificacion)
3. [Asignacion](#3-asignacion)
4. [Gestion Activa del Ticket](#4-gestion-activa-del-ticket)
5. [Escalamiento](#5-escalamiento)
6. [Resolucion](#6-resolucion)
7. [Cierre y Seguimiento](#7-cierre-y-seguimiento)
8. [Encuesta de Satisfaccion](#8-encuesta-de-satisfaccion)
9. [Gestion de Cola y Priorizacion](#9-gestion-de-cola-y-priorizacion)
10. [Reportes y Metricas](#10-reportes-y-metricas)
11. [Higiene de Tickets](#11-higiene-de-tickets)
12. [Checklist Diario del Agente](#12-checklist-diario-del-agente)

---

## 1. Ciclo de Vida de un Ticket

### 1.1 Estados del Ticket

Todo ticket en Intercom pasa por los siguientes estados:

```
NUEVO → EN PROCESO → ESPERANDO → ESCALADO → RESUELTO → CERRADO
 (1)      (2)         (3)         (4)        (5)        (6)
```

| Estado | Definicion | Quien lo Controla | Tiempo Maximo en Este Estado |
|--------|-----------|-------------------|------------------------------|
| **Nuevo** | Ticket recien creado, sin asignar o sin respuesta | Sistema / Agente | SLA de primera respuesta |
| **En proceso** | Agente esta trabajando activamente en el ticket | Agente asignado | Segun SLA de resolucion |
| **Esperando cliente** | Agente respondio, espera informacion del cliente | Agente | 48 horas antes de recordatorio |
| **Esperando interno** | Agente espera respuesta de L2 (Susana, Pepe, Finance) | Agente + L2 | 4 horas antes de follow-up |
| **Escalado** | Transferido a nivel superior | L2/L3 | Segun SLA de escalamiento |
| **Resuelto** | Problema solucionado, esperando confirmacion del cliente | Agente | 48 horas antes de cerrar |
| **Cerrado** | Cliente confirmo resolucion o timeout de confirmacion | Sistema / Agente | Permanente |

### 1.2 Flujo Visual

```
Cliente envia mensaje
        |
        v
[NUEVO] Ticket creado automaticamente en Intercom
        |
        v
Routing automatico por idioma (Regla 1/2 del playbook)
        |
        v
Agente ve ticket en su cola
        |
        v
Agente abre ticket → [EN PROCESO]
        |
        +--→ Puede resolverlo? --SI--→ Resuelve → [RESUELTO] → Confirmacion → [CERRADO]
        |
        +--→ Necesita info del cliente? → Pide info → [ESPERANDO CLIENTE]
        |                                                   |
        |                                   Cliente responde? --SI--→ [EN PROCESO]
        |                                                   |
        |                                          --NO (48h)--→ Recordatorio → (48h mas) → [CERRADO]
        |
        +--→ Necesita info interna? → Escala/consulta → [ESPERANDO INTERNO]
        |                                                   |
        |                                    L2 responde? --SI--→ [EN PROCESO]
        |                                                   |
        |                                          --NO (4h)--→ Follow-up Slack → (4h mas) → Principals
        |
        +--→ Fuera de su nivel? → [ESCALADO]
                                      |
                                      v
                              L2 toma control → Resuelve → [RESUELTO] → [CERRADO]
```

---

## 2. Creacion y Clasificacion

### 2.1 Como se Crea un Ticket

| Origen | Creacion | Tag Automatico |
|--------|----------|---------------|
| Chat en vivo (Intercom Messenger) | Automatica | Ninguno (agente debe taggear) |
| Email a [email protected] | Automatica (Intercom captura) | `email` |
| Formulario de contacto web | Automatica | `web-form` |
| Agente crea manualmente (de WhatsApp o llamada) | Manual | Agente debe taggear |

### 2.2 Clasificacion Inmediata

En los primeros 2 minutos de abrir un ticket, el agente debe:

1. **Leer el mensaje completo** — no responder sin entender
2. **Asignar tags obligatorios:**
   - Tag de tipo: `kyc`, `deposit`, `withdrawal`, `mt5-platform`, etc.
   - Tag de prioridad: `priority:urgent`, `priority:high`, `priority:medium`, `priority:low`
   - Tag de idioma: `lang:es`, `lang:en`
3. **Verificar si es VIP:** Revisar atributo `vip` en el perfil del contacto
4. **Revisar historial:** Buscar tickets anteriores del mismo cliente

### 2.3 Criterios de Prioridad (Referencia Rapida)

| Prioridad | Criterio Rapido | Ejemplo |
|-----------|----------------|---------|
| **Urgente** | Dinero en riesgo AHORA | Deposito >24h sin acreditar, no puede cerrar posicion |
| **Alta** | Impide operar | KYC rechazado, MT5 no conecta, retiro demorado >48h |
| **Media** | Puede operar pero tiene friccion | Pregunta sobre metodo de pago, cambio de apalancamiento |
| **Baja** | Informativo | Horarios de trading, tipos de cuenta, pre-registro |

---

## 3. Asignacion

### 3.1 Reglas de Asignacion Automatica

| Condicion | Asignacion |
|-----------|-----------|
| Idioma espanol | Agente 1 (LATAM) |
| Idioma ingles | Agente 2 (Europa/ME) |
| Cliente VIP Gold/Platinum | Account manager asignado (Rocio/Marilyn) |
| Fuera de horario | Sin asignar → primer agente del siguiente turno |

### 3.2 Reasignacion Manual

Un ticket se reasigna cuando:
- El agente original no puede resolverlo y necesita otro agente con conocimiento especifico
- Es handoff de turno (ver protocolo de handoff en playbook)
- El cliente pide hablar con otra persona (respetarlo siempre)

**Proceso de reasignacion:**
1. Agregar nota interna con resumen del caso
2. Cambiar agente asignado en Intercom
3. Notificar al nuevo agente por Slack
4. Informar al cliente: "Te voy a transferir a [nombre] que es especialista en [area]"

### 3.3 Tickets Sin Asignar

Los tickets sin asignar son responsabilidad del primer agente que inicie turno.

**Protocolo al iniciar turno:**
1. Revisar cola de tickets sin asignar
2. Ordenar por antiguedad (mas viejo primero)
3. Filtrar por prioridad (urgente primero)
4. Asignarse los tickets correspondientes a su idioma/region
5. Responder a los urgentes en los primeros 10 minutos del turno

---

## 4. Gestion Activa del Ticket

### 4.1 Primera Respuesta

La primera respuesta es la mas critica. Define la percepcion del cliente sobre el servicio.

**Checklist de primera respuesta:**
- [ ] Saludo con nombre del cliente
- [ ] Confirmar que entiendo su consulta (parafrasear si es compleja)
- [ ] Dar respuesta o informar que estoy investigando
- [ ] Si estoy investigando, dar tiempo estimado de actualizacion
- [ ] Preguntar si hay algo adicional

### 4.2 Actualizaciones en Proceso

Si el ticket no se resuelve en la primera interaccion:

| Situacion | Accion | Frecuencia |
|-----------|--------|-----------|
| Investigando internamente | Informar al cliente que estoy en ello | Cada 2 horas |
| Esperando respuesta de L2 | Informar al cliente y dar timeframe | Al escalar + cada 4 horas |
| Proceso toma mas de 1 dia | Enviar actualizacion aunque no haya novedad | Cada 12 horas |
| Ticket VIP | Actualizacion mas frecuente | Cada 2 horas minimo |

**Template de actualizacion:**
```
Hola [nombre], queria darte una actualizacion sobre tu caso.

Estamos [accion en curso]. Todavia no tenemos la resolucion final 
pero te confirmo que tu caso esta siendo atendido activamente.

Te informo en cuanto tenga novedades. Tiempo estimado: [tiempo].
```

### 4.3 Notas Internas

Cada accion significativa en un ticket debe tener una nota interna en Intercom.

**Que documentar en notas internas:**
- Resumen de lo que el cliente reporta
- Acciones tomadas (que verifique, donde busque, a quien consulte)
- Resultado de la verificacion
- Si se escalo: a quien, cuando, por que
- Si se recibio respuesta de L2: que dijo

**Formato de nota interna:**
```
[FECHA] [AGENTE]
Accion: [que hice]
Resultado: [que encontre]
Siguiente: [que falta / que espero]
```

---

## 5. Escalamiento

### 5.1 Cuando Escalar

Escalar cuando:
- No puedes resolver en 15 minutos con las herramientas de L1
- Requiere acceso o autorizacion que no tienes
- Es un tema de compliance, regulatorio o legal
- El cliente pidio hablar con un supervisor
- Es una queja formal (ver protocolo en `manejo-quejas.md`)

### 5.2 Proceso de Escalamiento

1. **Documentar en nota interna:**
   - Que intente resolver
   - Que informacion tengo
   - Por que escalo
   - Que necesito de L2

2. **Comunicar al L2 por Slack:**
   ```
   @[persona] — Ticket escalado: [link al ticket]
   Cliente: [nombre] — Cuenta: [MT5#]
   Problema: [resumen en 1 linea]
   Lo que intente: [resumen]
   Lo que necesito: [accion de L2]
   Prioridad: [urgente/alta/media]
   ```

3. **Informar al cliente:**
   ```
   [nombre], he transferido tu caso al equipo de [area] que tiene 
   acceso a las herramientas necesarias para resolver esto.
   
   Te doy seguimiento personalmente en [tiempo]. Tu numero de caso 
   sigue siendo #[numero].
   ```

4. **Agregar tags:** `escalated` + `waiting-internal`

5. **Seguimiento:** Si L2 no responde en 2 horas, enviar follow-up por Slack. Si no responde en 4 horas, escalar a Principals via Susana.

### 5.3 Matriz de Escalamiento (Referencia Rapida)

| Problema | Escalar a | Canal |
|----------|-----------|-------|
| KYC / Compliance / AML | Susana | Slack DM + email |
| Ejecucion / MT5 tecnico | Pepe | Slack DM |
| Depositos / Retiros / Pagos | Finance Manager | Slack #finance |
| Ventas / Upgrade / IB | Edward, Franco, Luis | Slack #sales |
| Queja regulatoria / legal | Susana | Slack DM + email (URGENTE) |
| Todo lo demas sin resolucion | Edward | Slack DM |

---

## 6. Resolucion

### 6.1 Que Significa "Resuelto"

Un ticket esta resuelto cuando:
- La pregunta del cliente fue respondida de manera completa y correcta
- El problema tecnico fue solucionado y el cliente confirmo
- El deposito/retiro se proceso correctamente
- La queja fue investigada y se comunico el resultado
- El cliente tiene toda la informacion necesaria para proceder

### 6.2 Comunicacion de Resolucion

**Checklist de cierre:**
- [ ] Resumir lo que se resolvio
- [ ] Confirmar que el cliente esta satisfecho
- [ ] Preguntar si hay algo mas
- [ ] Ofrecer canal para futuras consultas

**Template de resolucion:**
```
Hola [nombre],

Tu caso ha sido resuelto. [Resumen de la resolucion].

[Si aplica: detalle de lo que se hizo]

Si tienes alguna pregunta adicional o si algo no quedo bien, no dudes 
en escribirme. Estoy aqui para ayudarte.
```

### 6.3 Tickets que No se Pueden Resolver

Si la resolucion no es favorable para el cliente (queja improcedente, funcionalidad no disponible, etc.):

```
Hola [nombre],

Despues de revisar tu caso, [explicacion clara y honesta de la situacion].

Entiendo que no es la respuesta que esperabas. [Si hay alternativa: 
"Lo que si puedo ofrecerte es..." / Si no: "Lamento no poder ayudarte 
de otra forma en este caso."]

Si no estas satisfecho con esta respuesta, puedes solicitar una revision 
adicional y tu caso sera evaluado por nuestro equipo de [compliance/direction].
```

---

## 7. Cierre y Seguimiento

### 7.1 Proceso de Cierre

| Paso | Accion | Tiempo |
|------|--------|--------|
| 1 | Comunicar resolucion al cliente | Inmediato |
| 2 | Esperar confirmacion del cliente | 48 horas |
| 3 | Si confirma: cerrar ticket | Inmediato post-confirmacion |
| 4 | Si no responde: enviar recordatorio | A las 48 horas |
| 5 | Si no responde al recordatorio: cerrar automaticamente | 48 horas despues del recordatorio |

**Template de recordatorio pre-cierre:**
```
Hola [nombre], solo queria verificar que tu caso quedo resuelto. 
Si no he recibido respuesta en las proximas 48 horas, cerrare el 
ticket. Puedes reabrirlo en cualquier momento si necesitas ayuda 
adicional.
```

### 7.2 Tags de Cierre

Al cerrar, agregar tags de resultado:

| Tag | Significado |
|-----|------------|
| `resolved-l1` | Resuelto por agente L1 |
| `resolved-l2` | Resuelto con intervencion de L2 |
| `resolved-client-confirmed` | Cliente confirmo satisfaccion |
| `resolved-no-response` | Cliente no respondio, cerrado por timeout |
| `unresolved-client-choice` | Cliente decidio no continuar |
| `complaint-resolved` | Queja resuelta |

### 7.3 Seguimiento Post-Cierre

Para tickets de prioridad alta o urgente, y para todos los tickets VIP:

| Seguimiento | Tiempo | Accion |
|------------|--------|--------|
| Primer seguimiento | 48h post-cierre | "Todo sigue bien con [tema del ticket]?" |
| Encuesta de satisfaccion | 7 dias post-cierre | Envio automatico desde Intercom |

---

## 8. Encuesta de Satisfaccion

### 8.1 Configuracion en Intercom

**Activar:** Intercom > Settings > Messenger > Customer Satisfaction (CSAT)

**Trigger:** Automatico 24 horas despues de que el ticket se marca como cerrado

**Pregunta:** "Como calificarias la atencion que recibiste?" (5 estrellas)

**Pregunta abierta:** "Quieres compartir algun comentario adicional?"

### 8.2 Uso de Resultados

| Calificacion | Accion |
|-------------|--------|
| 5 estrellas | Registrar. Considerar solicitar review publica (con permiso). |
| 4 estrellas | Registrar. Sin accion especial. |
| 3 estrellas | Edward revisa el ticket para identificar area de mejora. |
| 1-2 estrellas | Edward contacta al cliente para entender la insatisfaccion. Se revisa el ticket internamente. |

### 8.3 Meta de CSAT

- **Meta global:** 4.2+ de promedio mensual
- **Meta por agente:** 4.0+ de promedio mensual
- **Tasa de respuesta:** 30%+ (es normal que no todos contesten)

---

## 9. Gestion de Cola y Priorizacion

### 9.1 Regla de Priorizacion

Los tickets se atienden en este orden:

1. **Urgentes** — Siempre primero, sin excepcion
2. **VIP con cualquier prioridad** — Segundo
3. **Alta prioridad** — Tercero
4. **Tickets con mayor tiempo de espera** — Cuarto (FIFO dentro de cada nivel)
5. **Media y baja prioridad** — Ultimo

### 9.2 Gestion de Picos

Si la cola tiene mas tickets de los que un agente puede manejar:

1. Enviar acuse de recibo rapido a todos los tickets nuevos: "Hemos recibido tu mensaje. Un agente te atendera en breve."
2. Priorizar segun regla de priorizacion
3. Notificar a Edward si hay mas de 10 tickets sin respuesta
4. Durante solapamiento de turnos, ambos agentes atacan la cola juntos

### 9.3 Limites de Tickets Simultaneos

| Tipo de Agente | Tickets Activos Max | Tickets en Espera Max |
|---------------|--------------------|-----------------------|
| Agente de soporte | 5 simultaneos | 15 en su cola |
| Account manager VIP | 3 simultaneos | 10 en su cola |

Si se excede el limite, notificar a Edward para redistribucion.

---

## 10. Reportes y Metricas

### 10.1 Metricas Diarias (Dashboard de Intercom)

| Metrica | Meta |
|---------|------|
| Tickets recibidos | Tracking |
| Tickets resueltos | >80% de los recibidos |
| Tiempo promedio de primera respuesta | <5 min (chat), <2h (email) |
| Tiempo promedio de resolucion | <12h |
| Tickets escalados | <20% del total |
| Tickets en cola sin respuesta | 0 al final del turno |

### 10.2 Reporte Semanal (Edward)

```
REPORTE SEMANAL SOPORTE — Semana [#]

Tickets totales: ___
Resueltos: ___
Pendientes: ___
Escalados: ___

Por categoria:
- KYC: ___
- Depositos: ___
- Retiros: ___
- MT5: ___
- Quejas: ___
- Otros: ___

SLA cumplido: ___%
CSAT promedio: ___/5

Tickets fuera de SLA: ___
Top 3 problemas de la semana:
1. ___
2. ___
3. ___

Acciones requeridas:
- ___
```

### 10.3 Reporte Mensual

Incluye todo lo semanal mas:
- Tendencia mes a mes
- Analisis de categorias crecientes/decrecientes
- Necesidades de capacitacion detectadas
- Necesidades de personal
- Feedback de encuestas de satisfaccion

---

## 11. Higiene de Tickets

### 11.1 Limpieza Semanal

Cada viernes, el agente debe:

| Accion | Criterio |
|--------|----------|
| Cerrar tickets en "Esperando cliente" sin respuesta >7 dias | Enviar template de cierre primero |
| Hacer follow-up a tickets en "Esperando interno" >48h | Contactar L2 nuevamente |
| Revisar tickets asignados sin actividad >72h | Actualizar o cerrar |
| Verificar tags correctos | Todo ticket debe tener tipo + prioridad + idioma |
| Limpiar tickets duplicados | Fusionar si el mismo cliente abrio multiples |

### 11.2 Reglas de Fusion de Tickets

Si un cliente abrio multiples tickets sobre el mismo tema:
1. Identificar el ticket principal (el mas completo)
2. Copiar informacion relevante del duplicado al principal
3. Cerrar el duplicado con nota interna: "Fusionado con ticket #[principal]"
4. Informar al cliente: "He consolidado tus consultas en un solo caso #[numero]"

---

## 12. Checklist Diario del Agente

### Al Iniciar Turno (primeros 15 minutos)

- [ ] Revisar tickets sin asignar en la cola
- [ ] Leer notas de handoff del agente del turno anterior
- [ ] Asignarme tickets de mi idioma/region
- [ ] Responder urgentes primero (meta: 10 min)
- [ ] Revisar tickets en "Esperando interno" que necesiten follow-up
- [ ] Verificar tickets VIP activos

### Durante el Turno

- [ ] Mantener maximo 5 tickets activos simultaneamente
- [ ] Documentar toda accion en notas internas
- [ ] Cumplir SLAs de actualizacion
- [ ] Escalar a tiempo (no retener tickets que no puedo resolver)
- [ ] Personalizar cada respuesta (nunca copy-paste sin adaptar)

### Al Terminar Turno (ultimos 15 minutos)

- [ ] Revisar todos mis tickets abiertos
- [ ] Agregar nota de handoff en tickets que requieren continuidad
- [ ] Reasignar tickets urgentes al agente del siguiente turno
- [ ] Actualizar estado de todos los tickets (no dejar ninguno en "Nuevo")
- [ ] Verificar que no hay tickets sin respuesta que deberian haberse respondido

---

*Documento preparado para uso interno de NEOMAAA Markets.*
*Complementa el Support Playbook y debe usarse en conjunto.*
*Revision mensual obligatoria.* [REVISAR: Programar primera revision]
