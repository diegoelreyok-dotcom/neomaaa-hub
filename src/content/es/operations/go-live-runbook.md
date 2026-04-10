# Runbook del Dia de Lanzamiento — NEOMAAA Markets

**Documento:** Runbook operativo para Go-Live
**Version:** 1.0
**Clasificacion:** [SOLO USO INTERNO]
**Ultima actualizacion:** Abril 2026
**Responsable:** Principals (Diego, Yulia, Stanislav)

---

## Objetivo

Este documento define el plan minuto a minuto para el dia de lanzamiento publico de NEOMAAA Markets. Cubre desde las verificaciones del dia previo hasta las operaciones de la primera semana. Cada miembro del equipo debe leer, entender, y confirmar su comprension de este documento antes del lanzamiento.

---

## Equipo de War Room

| Rol | Persona | Responsabilidad Principal | Canal de Contacto |
|---|---|---|---|
| Decision Final | Diego | Aprobacion de go/no-go, decisiones criticas | Slack + Telefono |
| Operaciones / Compliance | Yulia | KYC, compliance, Sumsub, regulacion | Slack + Telefono |
| Tecnologia / MT5 | Stanislav | Servidores MT5, conectividad, plataforma | Slack + Telefono |
| Finance Manager | [Por contratar] | PSPs, depositos, retiros, reconciliacion | Slack |
| Head of Support | [Asignado] | Coordinacion de agentes de soporte | Slack + Intercom |
| Support ES | [Asignado] | Chat en vivo espanol | Intercom + WhatsApp |
| Support EN | [Asignado] | Chat en vivo ingles | Intercom + WhatsApp |
| Marketing | [Asignado/Freelance] | Activacion de campanas, redes sociales | Slack |
| Sales Lead | [Asignado] | Contacto con primeros leads calificados | Slack + CRM |

**Canal principal de coordinacion:** Canal dedicado en Slack: #war-room-golive
**Canal de escalacion:** Grupo de Principals en Slack/WhatsApp
**Autoridad de decision:** Diego tiene la palabra final. En su ausencia: Yulia. En ausencia de ambos: Stanislav.

---

## FASE 1: Pre-Lanzamiento (Dia Anterior, D-1)

### Verificaciones Tecnologicas (Responsable: Stanislav)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 09:00 | Verificar que servidores MT5 estan operativos y respondiendo | [ ] |
| 09:30 | Ejecutar prueba de apertura de cuenta demo y real de cada tipo (Cent, Standard, Raw) | [ ] |
| 10:00 | Verificar conectividad de feed de precios con proveedores de liquidez | [ ] |
| 10:30 | Verificar que el sitio web esta online, SSL activo, formularios de registro funcionando | [ ] |
| 11:00 | Probar flujo completo de registro: formulario web > Skale CRM > cuenta MT5 creada | [ ] |
| 11:30 | Verificar que Intercom widget esta visible y funcional en el sitio web | [ ] |
| 12:00 | Confirmar que el telefono de soporte (+41 44 707 9633) esta activo y redirige correctamente | [ ] |
| 12:30 | Ejecutar prueba de carga basica: simular 50 registros simultaneos | [ ] |
| 13:00 | Documentar cualquier issue encontrado y su estado de resolucion | [ ] |

### Verificaciones de PSPs y Finanzas (Responsable: Finance Manager / Diego)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 09:00 | Confirmar con cada PSP activo que estan listos para procesar transacciones en vivo | [ ] |
| 10:00 | Ejecutar deposito de prueba de $10 USD con al menos 3 metodos de pago principales | [ ] |
| 11:00 | Ejecutar retiro de prueba de $5 USD para verificar flujo completo | [ ] |
| 12:00 | Verificar que los depositos de prueba se reflejan correctamente en Skale CRM y MT5 | [ ] |
| 13:00 | Confirmar saldos en cuentas corporativas y liquidez disponible para operaciones | [ ] |

### Verificaciones de KYC/Compliance (Responsable: Yulia)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 09:00 | Verificar que Sumsub esta configurado y procesando verificaciones correctamente | [ ] |
| 10:00 | Ejecutar verificacion KYC de prueba con documento de test | [ ] |
| 11:00 | Confirmar que los documentos legales estan publicados en el sitio: Terms, Privacy Policy, Risk Disclosure, AML Policy | [ ] |
| 12:00 | Verificar que el formulario de registro incluye los disclaimers regulatorios requeridos | [ ] |

### Verificaciones de Soporte (Responsable: Head of Support)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 14:00 | Confirmar que todos los agentes de soporte tienen acceso a Intercom, Skale CRM, y Sumsub | [ ] |
| 14:30 | Distribuir FAQ Interno actualizado a todos los agentes | [ ] |
| 15:00 | Realizar simulacro de atencion: cada agente responde 3 escenarios de prueba | [ ] |
| 15:30 | Confirmar horarios de turno para el dia de lanzamiento | [ ] |
| 16:00 | Verificar que macros de Intercom estan configuradas para respuestas frecuentes | [ ] |

### Verificaciones de Marketing (Responsable: Marketing)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 14:00 | Confirmar que campanas de paid media estan listas para activacion (NO activar todavia) | [ ] |
| 15:00 | Verificar que landing pages estan online y tracking pixels estan funcionando | [ ] |
| 16:00 | Preparar publicaciones de redes sociales para el anuncio de lanzamiento (NO publicar todavia) | [ ] |
| 17:00 | Confirmar que email de anuncio esta listo para enviar a lista de pre-registro (si aplica) | [ ] |

### Briefing del Equipo (Responsable: Diego)

| Hora (CET) | Accion | Estado |
|---|---|---|
| 18:00 | Videollamada con todo el equipo (30 min): revisar plan, confirmar roles, resolver dudas | [ ] |
| 18:30 | Cada persona confirma por Slack que esta lista para manana | [ ] |
| 19:00 | Diego toma decision GO / NO-GO basado en estado de verificaciones | [ ] |

**Criterios de GO:** Todas las verificaciones tecnologicas, de PSPs, y de KYC completadas exitosamente. Cualquier issue menor documentado con workaround.

**Criterios de NO-GO:** Fallo critico en MT5, PSPs principales no operativos, Sumsub no funcional, sitio web caido, o issue de compliance sin resolver.

---

## FASE 2: Dia de Lanzamiento (D-0)

### T-60 min: Verificaciones Finales

| Hora (CET) | Responsable | Accion |
|---|---|---|
| 08:00 | Stanislav | Verificacion rapida de servidores MT5, sitio web, y CRM |
| 08:10 | Finance Manager | Verificacion rapida de PSPs operativos |
| 08:20 | Yulia | Verificacion rapida de Sumsub operativo |
| 08:30 | Head of Support | Confirmar que agentes de soporte estan online (EN y ES) |
| 08:40 | Marketing | Confirmar que campanas y publicaciones estan listas para activacion |
| 08:50 | Todos | Confirmar en #war-room-golive: "Listo" |

### T-0: Activacion (09:00 CET)

| Hora (CET) | Responsable | Accion |
|---|---|---|
| 09:00 | Diego | Confirma GO FINAL en #war-room-golive |
| 09:01 | Stanislav | Habilita registro de cuentas reales en el sitio web (si estaba deshabilitado) |
| 09:02 | Marketing | Activa campanas de paid media |
| 09:03 | Marketing | Publica anuncio de lanzamiento en todas las redes sociales |
| 09:05 | Marketing | Envia email de lanzamiento a lista de pre-registro |
| 09:10 | Head of Support | Confirma que Intercom esta en modo activo con agentes disponibles |
| 09:15 | Diego | Publica mensaje en #war-room-golive: "NEOMAAA Markets esta LIVE" |

### T+0 a T+2h: Monitoreo Intensivo (09:00 – 11:00 CET)

| Hora (CET) | Responsable | Accion |
|---|---|---|
| 09:00-11:00 | Stanislav | Monitorear servidores MT5 cada 15 min: CPU, memoria, conexiones activas |
| 09:00-11:00 | Head of Support | Monitorear cola de Intercom: tiempo de respuesta, volumen de chats |
| 09:15 | Stanislav | Reportar: primer registro recibido? Si/No |
| 09:30 | Yulia | Reportar: primer KYC iniciado en Sumsub? Si/No |
| 09:45 | Finance Manager | Reportar: primer deposito recibido? Si/No |
| 10:00 | Diego | Primer check-in en #war-room-golive: estado general, issues detectados |
| 10:30 | Stanislav | Reportar: primera operacion de trading ejecutada? Si/No |
| 11:00 | Diego | Segundo check-in: metricas de las primeras 2 horas |

**Checklist de Primeras 2 Horas:**
- [ ] Primer registro completado exitosamente
- [ ] Primer KYC aprobado
- [ ] Primer deposito procesado y reflejado en MT5
- [ ] Primera operacion de trading ejecutada
- [ ] Soporte respondiendo dentro de KPIs (< 2 min chat)
- [ ] Cero errores criticos de plataforma
- [ ] Campanas de marketing corriendo sin errores
- [ ] Sitio web estable y sin caidas

---

## FASE 3: Primeras 24 Horas (D-0 completo)

### KPIs a Rastrear (cada 4 horas)

| Metrica | Fuente | Responsable |
|---|---|---|
| Registros totales | Skale CRM | Marketing |
| KYCs iniciados / aprobados / rechazados | Sumsub | Yulia |
| Depositos: cantidad y monto total | Skale CRM / PSP panels | Finance Manager |
| Retiros: cantidad y monto total | Skale CRM / PSP panels | Finance Manager |
| Operaciones ejecutadas en MT5 | MT5 Manager | Stanislav |
| Tickets de soporte: volumen, tiempo de respuesta, CSAT | Intercom | Head of Support |
| Errores de plataforma o servidor | MT5 logs / monitoring | Stanislav |
| Trafico web: visitas, bounce rate, conversion | Google Analytics | Marketing |
| Gasto publicitario vs. registros | Ad platforms | Marketing |

### Plan de Escalacion

| Nivel | Trigger | Accion | Quien Decide |
|---|---|---|---|
| Nivel 1 — Incidencia Menor | Ticket individual de soporte no resuelto en 30 min | Agente escala al Head of Support | Head of Support |
| Nivel 2 — Problema Operativo | Patron de multiples tickets sobre el mismo tema | Head of Support notifica en #war-room-golive | Diego o Yulia |
| Nivel 3 — Incidencia Mayor | PSP no procesando, MT5 con errores de ejecucion, Sumsub caido | Stanislav/Finance Manager ejecutan diagnostico inmediato | Diego |
| Nivel 4 — Critico | Sitio web caido, MT5 inaccesible, brecha de seguridad, issue regulatorio | Activar protocolo de rollback (ver abajo) | Diego (unica autoridad) |

### Comunicaciones en Primeras 24 Horas

| Hora (CET) | Accion |
|---|---|
| 13:00 | Check-in #3: Diego revisa metricas acumuladas, ajustes necesarios |
| 17:00 | Check-in #4: cierre de turno CET, traspaso a cobertura LATAM |
| 21:00 | Check-in #5 (async): resumen del dia en #war-room-golive |
| 09:00 (D+1) | Reunion de equipo completo: retrospectiva de primeras 24 horas |

---

## FASE 4: Primera Semana (D+1 a D+7)

### Standup Diario

**Horario:** 09:00 CET / 02:00 COL (o ajustado segun equipo)
**Duracion:** 15 minutos maximo
**Canal:** Videollamada + resumen escrito en #war-room-golive

**Agenda del Standup:**

1. **Metricas del dia anterior** (2 min)
   - Registros, KYCs, depositos, retiros, operaciones
   - Tickets de soporte: volumen y tiempo de respuesta
   - Issues reportados y su estado

2. **Problemas activos** (5 min)
   - Que esta roto o no funciona como se esperaba?
   - Que necesita atencion inmediata?

3. **Acciones del dia** (5 min)
   - Que va a hacer cada persona hoy?
   - Hay bloqueos que necesitan resolucion?

4. **Decision items** (3 min)
   - Decisiones que solo los Principals pueden tomar

### Plantilla de Reporte Diario

```
REPORTE DIARIO — NEOMAAA Markets
Fecha: [DD/MM/YYYY]
Dia de operacion: [D+N]

METRICAS
- Registros hoy: [X] | Acumulado: [X]
- KYC aprobados hoy: [X] | Acumulado: [X]
- Depositos hoy: [X] por $[X] USD | Acumulado: [X] por $[X] USD
- Retiros hoy: [X] por $[X] USD | Acumulado: [X] por $[X] USD
- Operaciones MT5 hoy: [X] | Acumulado: [X]
- Tickets soporte hoy: [X] | Tiempo promedio respuesta: [X] min
- CSAT promedio: [X]/5.0

ISSUES ACTIVOS
1. [Descripcion] — Estado: [Abierto/En progreso/Resuelto] — Responsable: [Nombre]
2. ...

ACCIONES COMPLETADAS HOY
1. [Accion] — [Resultado]
2. ...

ACCIONES PENDIENTES PARA MANANA
1. [Accion] — Responsable: [Nombre]
2. ...

DECISIONES NECESARIAS
1. [Tema] — Contexto: [Breve] — Opcion recomendada: [X]

NOTAS
[Observaciones generales, patrones detectados, sugerencias]
```

### Log de Issues

Mantener un documento compartido (Google Sheet) con las siguientes columnas:

| ID | Fecha | Descripcion | Severidad | Responsable | Estado | Resolucion | Fecha Cierre |
|---|---|---|---|---|---|---|---|
| 001 | DD/MM | ... | Critico/Mayor/Menor | Nombre | Abierto/Resuelto | ... | DD/MM |

---

## FASE 5: Plan de Rollback

Este plan se activa SOLO bajo decision de Diego cuando ocurre un evento critico que pone en riesgo a los clientes o la integridad del broker.

### Triggers de Rollback

- Servidores MT5 inaccesibles por mas de 30 minutos sin solucion a la vista.
- Brecha de seguridad confirmada (acceso no autorizado a datos de clientes o fondos).
- PSPs procesando transacciones incorrectamente (montos erroneos, duplicados).
- Issue regulatorio que requiere suspension inmediata de operaciones.
- Error critico en Skale CRM que impide rastrear clientes o transacciones.

### Procedimiento de Rollback

| Paso | Accion | Responsable | Tiempo Maximo |
|---|---|---|---|
| 1 | Diego anuncia ROLLBACK en #war-room-golive y grupo de Principals | Diego | Inmediato |
| 2 | Deshabilitar registro de nuevos clientes en el sitio web | Stanislav | 5 min |
| 3 | Pausar todas las campanas de marketing pagadas | Marketing | 10 min |
| 4 | Publicar mensaje de mantenimiento en el sitio web | Stanislav | 15 min |
| 5 | Notificar a clientes registrados via email: "mantenimiento programado, servicios temporalmente limitados" | Head of Support | 30 min |
| 6 | Si el issue es de PSP: suspender depositos/retiros y notificar al PSP | Finance Manager | 15 min |
| 7 | Si el issue es de MT5: cerrar acceso a trading, documentar posiciones abiertas de clientes | Stanislav | 15 min |
| 8 | Diagnosticar el problema raiz | Equipo tecnico relevante | Variable |
| 9 | Implementar solucion y verificar en ambiente de prueba | Equipo tecnico relevante | Variable |
| 10 | Diego decide re-activacion cuando el problema esta resuelto y verificado | Diego | Variable |

### Comunicacion Durante Rollback

- Internamente: actualizaciones cada 30 minutos en #war-room-golive.
- A clientes: actualizacion cada 2 horas via email y redes sociales (mensaje generico de mantenimiento, sin detalles tecnicos).
- A PSPs: notificacion directa si el issue les involucra.

### Post-Rollback

Una vez resuelto el incidente y restauradas las operaciones:

1. Documentar el incidente completo: causa raiz, timeline, acciones tomadas, resolucion.
2. Reunion de post-mortem dentro de las 24 horas siguientes con todo el equipo involucrado.
3. Actualizar este runbook con lecciones aprendidas y ajustes al plan.
4. Verificar que ningun cliente fue afectado financieramente; si lo fue, resolver inmediatamente.

---

## Timeline Consolidado — Dia de Lanzamiento

| Hora (CET) | Fase | Accion | Responsable |
|---|---|---|---|
| D-1 09:00 | Pre-launch | Inicio verificaciones tecnologicas | Stanislav |
| D-1 09:00 | Pre-launch | Inicio verificaciones PSPs | Finance Manager |
| D-1 09:00 | Pre-launch | Inicio verificaciones compliance | Yulia |
| D-1 14:00 | Pre-launch | Inicio verificaciones soporte | Head of Support |
| D-1 14:00 | Pre-launch | Inicio verificaciones marketing | Marketing |
| D-1 18:00 | Pre-launch | Briefing general del equipo | Diego |
| D-1 19:00 | Pre-launch | Decision GO/NO-GO | Diego |
| D-0 08:00 | Go-Live | Verificaciones finales rapidas | Todos |
| D-0 08:50 | Go-Live | Confirmacion "Listo" de cada equipo | Todos |
| D-0 09:00 | Go-Live | GO FINAL confirmado | Diego |
| D-0 09:01 | Go-Live | Registro habilitado | Stanislav |
| D-0 09:02 | Go-Live | Campanas activadas | Marketing |
| D-0 09:03 | Go-Live | Anuncio en redes sociales | Marketing |
| D-0 09:05 | Go-Live | Email de lanzamiento enviado | Marketing |
| D-0 09:10 | Go-Live | Soporte en modo activo | Head of Support |
| D-0 09:15 | Monitoreo | Primer registro verificado? | Stanislav |
| D-0 09:30 | Monitoreo | Primer KYC verificado? | Yulia |
| D-0 09:45 | Monitoreo | Primer deposito verificado? | Finance Manager |
| D-0 10:00 | Monitoreo | Check-in #1 | Diego |
| D-0 10:30 | Monitoreo | Primera operacion verificada? | Stanislav |
| D-0 11:00 | Monitoreo | Check-in #2: metricas primeras 2h | Diego |
| D-0 13:00 | Monitoreo | Check-in #3: metricas acumuladas | Diego |
| D-0 17:00 | Monitoreo | Check-in #4: cierre turno CET | Diego |
| D-0 21:00 | Monitoreo | Check-in #5: resumen del dia (async) | Diego |
| D+1 09:00 | Retrospectiva | Reunion equipo: primeras 24 horas | Diego |
| D+1 a D+7 | Primera semana | Standups diarios 09:00 CET | Diego |
| D+7 | Cierre | Retrospectiva de primera semana completa | Todos |

---

## Contactos de Emergencia

| Persona | Rol | Telefono | Email | Disponibilidad |
|---|---|---|---|---|
| Diego | Principal / Decision Final | [Privado] | [Privado] | 24/7 durante Go-Live |
| Yulia | Principal / Compliance | [Privado] | [Privado] | 24/7 durante Go-Live |
| Stanislav | Principal / Tech | [Privado] | [Privado] | 24/7 durante Go-Live |
| Soporte General | NEOMAAA | +41 44 707 9633 | support@neomaaa.com | Horario de soporte |

---

*Este documento debe ser revisado y aprobado por los tres Principals antes del lanzamiento. Cada miembro del equipo debe confirmar por escrito (Slack) que lo ha leido y entendido.*
