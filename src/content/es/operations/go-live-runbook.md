# Runbook del Dia de Lanzamiento — NEOMAAA Markets

**Documento:** Runbook operativo para Go-Live
**Version:** 1.1
**Clasificacion:** [SOLO USO INTERNO]
**Ultima actualizacion:** Abril 2026
**Entidad:** Neomaaa Ltd — **L15968/N AOFA Anjouan**
**Responsable:** Principals (Diego Loyola, Angel Ortega, Yulia, Stanislav)
**Aprobacion final requerida:** Diego (CEO) + Angel (CCO) + Yulia (Ops) + Susana (Compliance) + Pepe (Dealing)

---

## Objetivo

Este documento define el plan minuto a minuto para el dia de lanzamiento publico de NEOMAAA Markets. Cubre desde las verificaciones del dia previo (D-1) hasta las operaciones de la primera semana. Cada miembro del equipo debe leer, entender, y **confirmar por Telegram** su comprension del documento antes del lanzamiento.

Zona horaria de referencia: **UAE (GMT+4)** donde opera HQ (Dubai). Conversiones LATAM (GMT-3) indicadas cuando aplica.

---

> [!INFO]
> **Documentos relacionados (lectura obligatoria pre-launch):**
> - [Post-Launch Playbook](/content/es/launch/post-launch-playbook) — semanas 1-4
> - [Manual de Crisis](/content/es/operations/manual-crisis)
> - [Manual de Depositos](/content/es/operations/depositos)
> - [Compliance Calendar AOFA](/content/es/compliance/compliance-calendar)
> - [A/B Book Policy](/content/es/executive/ab-book-policy)
> - [Financial Controls](/content/es/executive/financial-controls)
> - [Gestion de Tickets Support](/content/es/support/gestion-tickets)

---

## Equipo de War Room

| Rol | Persona | Responsabilidad | Canal primario | Backup |
|---|---|---|---|---|
| **Decision Final / Go-No Go** | **Diego Loyola** (CEO/Founder) | Aprobacion go-live, decisiones criticas, crisis | Telegram + Telefono `[DATO: Diego confirma telefono personal para emergencia]` | Angel |
| **Co-founder / CCO / Compliance estrategico** | **Angel Ortega** | Segundo en mando, compliance strategy, comunicacion externa | Telegram + Telefono `[DATO: Angel confirma telefono]` | Diego |
| **Operaciones / PSPs / Reconciliacion** | **Yulia** (Operations Director) | KYC Sumsub oversight, PSPs, retiros, liquidez | Telegram + Telefono `[DATO: Yulia confirma telefono]` | Stanislav |
| **Tecnologia / MT5 / Infra** | **Stanislav** (Principal) | Servidores MT5, conectividad LP, Equinix data centers, SSL, uptime | Telegram + Telefono `[DATO: Stanislav confirma telefono]` | Alex A |
| **Dealing / Ejecucion** | **Pepe** (Head of Dealing, 20+ anos) | MT5 Manager, risk flow, A/B Book, hedging LPs | Telegram DM | Stanislav |
| **Compliance Operativo** | **Susana** (Compliance Officer) | KYC approvals, AML flags, notificaciones AOFA, quejas regulatorias | Telegram DM + compliance@neomaaa.com | Angel |
| **Sales Lead + Head of Support interino** | **Edward** (Head of Sales) | Coordinacion Franco/Luis/Rocio/Marilyn, supervision Intercom | Telegram + WhatsApp | Angel |
| **Sales Agents** | **Franco, Luis** | Contacto primeros leads VIP, objeciones, cierre | Telegram + Skale CRM | Edward |
| **Support L1 ES** | **Rocio** | Chat Intercom espanol, KYC support, depositos | Intercom + Telegram | Marilyn |
| **Support L1 ES/EN** | **Marilyn** | Chat Intercom ingles + ES overflow | Intercom + Telegram | Rocio |
| **Dev Team** | **Alex A, Alex B** (dev principal) | Portal, API, integracion Skale-MT5 | Telegram `#dev` | Stanislav |
| **Dev Team RU** | **Gleb, Dimitri** | Backend, integraciones Sumsub, PSPs | Telegram `#dev` | Alex A |
| **Finance Manager** | `[DATO: Por contratar — Yulia cubre interino]` | PSPs reconciliacion, depositos/retiros | Telegram | Yulia |
| **Marketing** | `[DATO: Marketing Mgr por asignar/freelance]` | Campanas paid, redes sociales, emails lanzamiento | Telegram | Angel |

**Canal principal coordinacion:** Telegram `#war-room-golive` (grupo dedicado)
**Canal escalacion Principals:** Telegram grupo privado `#principals` (Diego + Angel + Yulia + Stanislav)
**Canal dealing:** Telegram `#dealing` (Pepe + Stanislav + dev)
**Canal support:** Telegram `#support` (Edward + Rocio + Marilyn)
**Autoridad de decision:** **Diego tiene la palabra final.** En su ausencia: Angel. En ausencia de ambos: Yulia. En ausencia de los tres: Stanislav.

---

## FASE 1: Pre-Lanzamiento (D-1)

### Verificaciones Tecnologicas — Owner: Stanislav + Alex A/Alex B

| Hora UAE | Accion | Herramienta / URL | Estado | Owner |
|---|---|---|---|---|
| 09:00 | Verificar servidores MT5 operativos | MT5 Admin — `[DATO: Stanislav confirma URL admin MT5]` + Equinix DC monitoring | [ ] | Stanislav |
| 09:30 | Prueba apertura cuenta demo + real cada tipo (Cent, Standard, Raw ECN) | Portal client + Skale + MT5 Admin | [ ] | Alex A |
| 10:00 | Verificar conectividad feed precios con LPs (liquidity providers) | MT5 Admin > Feeders | [ ] | Pepe + Stanislav |
| 10:30 | Sitio web online, SSL activo, formularios funcionando | neomaaa.com + app.neomaaa.com | [ ] | Alex B |
| 11:00 | Flujo completo: formulario web → Skale CRM → cuenta MT5 creada → Sumsub KYC triggered | End-to-end test con cuenta real | [ ] | Alex A + Yulia |
| 11:30 | Intercom widget visible y funcional | neomaaa.com homepage + app.neomaaa.com | [ ] | Edward |
| 12:00 | Telefono soporte [DATO: teléfono oficial Dubai — Diego confirma] activo y redirige | Call de prueba | [ ] | Edward |
| 12:30 | Prueba de carga: simular 50 registros simultaneos | Script dev team | [ ] | Gleb / Dimitri |
| 13:00 | Documentar issues encontrados + estado resolucion | Notion `Work HQ > Launch > Issues Log D-1` | [ ] | Stanislav |

### Verificaciones PSPs y Finanzas — Owner: Yulia + Finance Manager

| Hora UAE | Accion | Herramienta | Estado | Owner |
|---|---|---|---|---|
| 09:00 | Confirmar con cada PSP (120+ metodos deposito) que estan listos para live | PSP account managers + dashboards | [ ] | Yulia |
| 10:00 | Deposito prueba $10 USD con 3+ metodos principales (tarjeta, crypto, wire) | Skale + PSP panels + MT5 | [ ] | Finance Mgr / Yulia |
| 11:00 | Retiro prueba $5 USD — flujo completo | Skale + PSP | [ ] | Finance Mgr / Yulia |
| 12:00 | Depositos prueba reflejan correctamente en Skale CRM y MT5 | Skale ↔ MT5 sync check | [ ] | Yulia |
| 13:00 | Saldos cuentas corporativas + liquidez operacion | Bank statements + Fireblocks (target crypto custody) | [ ] | Yulia + Diego |

### Verificaciones KYC/Compliance — Owner: Susana + Angel

| Hora UAE | Accion | Herramienta | Estado | Owner |
|---|---|---|---|---|
| 09:00 | Sumsub configurado y procesando correctamente | Sumsub dashboard | [ ] | Susana |
| 10:00 | KYC prueba con documento test (PEP check, sanctions screening, geo blocking) | Sumsub + Skale sync | [ ] | Susana |
| 11:00 | Docs legales publicados en sitio: Terms, Privacy, Risk Disclosure, AML Policy, Client Agreement | neomaaa.com/legal | [ ] | Susana + Angel |
| 12:00 | Formulario registro con disclaimers regulatorios AOFA L15968/N + geo-blocking de mercados restringidos (USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan) | Portal registro | [ ] | Susana + Alex A |
| 12:30 | **Notificacion pre-launch AOFA enviada** (si corresponde a regulacion) | Email regulador + copia legal@neomaaa.com | [ ] | Susana + Angel |
| 13:00 | Compliance calendar cargado con obligaciones post-launch | [Compliance Calendar](/content/es/compliance/compliance-calendar) | [ ] | Susana |

### Verificaciones Soporte — Owner: Edward

| Hora UAE | Accion | Herramienta | Estado | Owner |
|---|---|---|---|---|
| 14:00 | Rocio, Marilyn, Edward, Franco, Luis con acceso Intercom + Skale + Sumsub read-only + MT5 support view | Pruebas login | [ ] | Edward |
| 14:30 | Distribuir FAQ Interno actualizado + [Enciclopedia Soporte](/content/es/support/enciclopedia-soporte) | Portal broker + Telegram `#support` | [ ] | Edward |
| 15:00 | Simulacro atencion: cada agente responde 3 escenarios prueba (KYC, deposito, MT5 login) | Intercom test workspace | [ ] | Edward |
| 15:30 | Horarios turno dia de lanzamiento confirmados | Ver [gestion-tickets](/content/es/support/gestion-tickets) cap 0 | [ ] | Edward |
| 16:00 | Macros Intercom configuradas (saludo, KYC, deposito, retiro, escalation) | Intercom Settings > Macros | [ ] | Edward |

### Verificaciones Marketing — Owner: Marketing Manager (o Angel interino)

| Hora UAE | Accion | Estado | Owner |
|---|---|---|---|
| 14:00 | Campanas paid media listas (NO activar aun): Meta, TikTok, Google Ads | [ ] | Marketing |
| 15:00 | Landing pages online + tracking pixels (Meta, Google, TikTok) | [ ] | Marketing + Alex B |
| 16:00 | Publicaciones redes sociales preparadas (NO publicar): LinkedIn, Instagram @neomaaamarkets, Twitter, Telegram | [ ] | Marketing |
| 17:00 | Email lanzamiento listo para enviar a lista pre-registro (~250 registrados actuales) | [ ] | Marketing |

### Briefing del Equipo — Owner: Diego

| Hora UAE | Accion | Participantes | Estado |
|---|---|---|---|
| 18:00 | Videollamada equipo completo (30 min): revisar plan, confirmar roles, resolver dudas | Todos los 16 | [ ] |
| 18:30 | Cada persona confirma por Telegram `#war-room-golive`: "Listo para manana — [nombre]" | Todos | [ ] |
| 19:00 | **Diego toma decision GO / NO-GO** basado en estado verificaciones. **Firman aprobacion: Diego + Angel + Yulia + Susana + Pepe** (mensaje firmado en Telegram `#principals` + email a legal@neomaaa.com) | Principals + Pepe + Susana | [ ] |

**Criterios GO:**
- [ ] Todas verificaciones tecnologicas completadas (MT5, portal, sitio)
- [ ] PSPs principales operativos (minimo 3 metodos testeados exitosamente)
- [ ] Sumsub operativo + KYC de prueba aprobado
- [ ] Susana confirma compliance AOFA L15968/N en orden
- [ ] Pepe confirma MT5 Admin + LPs conectados
- [ ] Edward confirma support team ready
- [ ] **Firma digital (Telegram voto) de Diego, Angel, Yulia, Susana, Pepe**

**Criterios NO-GO (cualquiera activa posponer):**
- Fallo critico MT5
- PSPs principales no operativos (<3 metodos funcionando)
- Sumsub no funcional
- Sitio web caido o SSL invalido
- Issue compliance sin resolver (especialmente geo-blocking de mercados restringidos)
- Ausencia de cualquier firma obligatoria

---

## FASE 2: Dia de Lanzamiento (D-0)

### T-60 min: Verificaciones Finales

| Hora UAE | Owner | Accion |
|---|---|---|
| 08:00 | Stanislav | Verificacion rapida servidores MT5, sitio, CRM Skale, Equinix DC |
| 08:10 | Yulia / Finance Mgr | Verificacion rapida PSPs operativos (dashboard quick check) |
| 08:20 | Susana | Verificacion rapida Sumsub operativo + geo-blocking activo |
| 08:30 | Edward | Confirmar Rocio + Marilyn online en Intercom, turno EN + ES cubierto |
| 08:40 | Marketing | Confirmar campanas y publicaciones listas activacion |
| 08:50 | Todos | Confirmar en `#war-room-golive`: "Listo — [rol] — [nombre]" |

### T-0: Activacion (09:00 UAE)

| Hora UAE | Owner | Accion |
|---|---|---|
| **09:00** | **Diego** | **GO FINAL confirmado en `#war-room-golive`: "NEOMAAA Markets — GO LIVE"** |
| 09:01 | Stanislav + Alex A | Habilita registro cuentas reales si estaba deshabilitado |
| 09:02 | Marketing | Activa campanas paid media (Meta, TikTok, Google Ads) |
| 09:03 | Marketing | Publica anuncio lanzamiento: LinkedIn, Instagram, Twitter, Telegram public |
| 09:05 | Marketing | Envia email lanzamiento a lista pre-registro (~250) |
| 09:10 | Edward | Confirma Intercom modo activo + Rocio/Marilyn disponibles |
| 09:15 | Diego | Publica en `#war-room-golive`: "NEOMAAA Markets esta LIVE. Objetivo semana 1: 50-100 FTDs." |

### T+0 a T+2h: Monitoreo Intensivo (09:00 – 11:00 UAE)

| Hora UAE | Owner | Accion |
|---|---|---|
| 09:00-11:00 | Stanislav | Monitorea MT5 cada 15 min: CPU, memoria, conexiones activas, latencia LP |
| 09:00-11:00 | Pepe | Monitorea MT5 Manager: primeras operaciones, flow, slippage |
| 09:00-11:00 | Edward | Monitorea Intercom: FRT, volumen chats, escalaciones |
| 09:15 | Stanislav / Alex A | Reporta en war-room: primer registro recibido? Si/No + ID Skale |
| 09:30 | Susana / Yulia | Reporta: primer KYC iniciado Sumsub? Si/No |
| 09:45 | Yulia / Finance Mgr | Reporta: primer deposito recibido? Si/No + monto + PSP |
| 10:00 | **Diego** | **Check-in #1 en war-room:** estado general, issues detectados |
| 10:30 | Pepe / Stanislav | Reporta: primera operacion trading ejecutada? Si/No + instrumento + size |
| 11:00 | Diego | Check-in #2: metricas primeras 2 horas |

**Checklist Primeras 2 Horas (verificar en war-room):**
- [ ] Primer registro Skale completado
- [ ] Primer KYC Sumsub aprobado
- [ ] Primer deposito procesado + reflejado en MT5
- [ ] Primera operacion MT5 ejecutada
- [ ] Soporte respondiendo dentro de SLA (<5 min chat)
- [ ] Cero errores criticos plataforma
- [ ] Campanas marketing corriendo sin errores (Meta/TikTok/Google)
- [ ] Sitio web estable, sin caidas

---

## FASE 3: Primeras 24 Horas

### KPIs a Rastrear (cada 4 horas)

| Metrica | Fuente | Owner reporta |
|---|---|---|
| Registros totales | Skale CRM | Edward |
| KYCs iniciados / aprobados / rechazados | Sumsub dashboard | Susana |
| Depositos: cantidad + monto total | Skale + PSP panels | Yulia / Finance Mgr |
| Retiros: cantidad + monto total | Skale + PSP panels | Yulia / Finance Mgr |
| Operaciones ejecutadas MT5 | MT5 Manager | Pepe |
| Tickets Intercom: volumen, FRT, CSAT | Intercom Reports | Edward |
| Errores plataforma / server | MT5 logs + Equinix monitoring | Stanislav |
| Trafico web: visitas, bounce, conversion | Google Analytics | Marketing |
| Gasto publicitario vs registros (CAC preliminar) | Ad platforms + Skale | Marketing |

### Plan de Escalacion

| Nivel | Trigger | Accion | Decision |
|---|---|---|---|
| **L1 — Incidencia Menor** | Ticket individual soporte no resuelto 30 min | Rocio/Marilyn escala a Edward | Edward |
| **L2 — Problema Operativo** | Patron multiples tickets mismo tema | Edward notifica en `#war-room-golive` | Diego o Yulia |
| **L3 — Incidencia Mayor** | PSP no procesando / MT5 errores ejecucion / Sumsub caido | Stanislav + Yulia + Pepe diagnostico inmediato | Diego |
| **L4 — Critico** | Sitio caido / MT5 inaccesible / brecha seguridad / issue regulatorio AOFA | **Activar protocolo rollback** (ver FASE 5) | **Diego (unica autoridad)** |

### Comunicaciones Primeras 24 Horas

| Hora UAE | Accion | Owner |
|---|---|---|
| 13:00 | Check-in #3: metricas acumuladas, ajustes necesarios | Diego |
| 17:00 | Check-in #4: cierre turno UAE, traspaso a cobertura LATAM (Rocio + Franco LATAM evening) | Diego + Edward |
| 21:00 | Check-in #5 (async): resumen dia en `#war-room-golive` | Diego |
| D+1 09:00 | Reunion equipo completo: retrospectiva primeras 24h | Todos Principals + Heads |

---

## FASE 4: Primera Semana (D+1 a D+7)

Ver detalle completo en [Post-Launch Playbook — Semana 1](/content/es/launch/post-launch-playbook#semana-1--supervivencia).

### Standup Diario

**Horario:** 09:00 UAE / 02:00 ART (Buenos Aires) / 00:00 CST (Mexico). Ajustado segun equipo LATAM.
**Duracion:** 15 min max
**Canal:** Videollamada + resumen escrito en `#war-room-golive`
**Facilitador:** Diego (o Angel si Diego no disponible)

**Agenda del Standup:**

1. **Metricas dia anterior (2 min)** — Registros, KYCs, depositos, retiros, operaciones, FRT + CSAT Intercom, issues + estado
2. **Problemas activos (5 min)** — Que esta roto, que necesita atencion inmediata
3. **Acciones del dia (5 min)** — Que hace cada persona hoy, bloqueos
4. **Decision items (3 min)** — Decisiones que solo Principals pueden tomar

### Plantilla Reporte Diario (Telegram `#war-room-golive` 21:00 UAE)

```
REPORTE DIARIO — NEOMAAA Markets
Fecha: [DD/MM/YYYY]  |  Dia operacion: [D+N]
Entidad: Neomaaa Ltd L15968/N AOFA Anjouan

METRICAS
- Registros hoy: [X] | Acumulado: [X]
- KYC aprobados hoy: [X] | Acumulado: [X] | Pass rate: [X]%
- Depositos hoy: [X] x $[X] USD | Acumulado: [X] x $[X] USD
- Retiros hoy: [X] x $[X] USD | Acumulado: [X] x $[X] USD
- Operaciones MT5 hoy: [X] | Volumen lotes: [X]
- Tickets Intercom hoy: [X] | FRT promedio: [X] min
- CSAT: [X]/5 | MT5 uptime: [X]%

ISSUES ACTIVOS
1. [Descripcion] — Estado: [Abierto/En progreso/Resuelto] — Owner: [Nombre]

ACCIONES COMPLETADAS HOY
1. [Accion] — [Resultado]

ACCIONES PENDIENTES PARA MANANA
1. [Accion] — Owner: [Nombre]

DECISIONES NECESARIAS (Principals)
1. [Tema] — Contexto — Recomendacion: [X]

NOTAS / PATRONES DETECTADOS
[Observaciones — flow toxico detectado, canal que underperform, etc.]
```

Se archiva en Notion `Work HQ NEOMAAA > Launch > Daily Reports`.

### Log de Issues

Google Sheets compartido (owner Yulia):

| ID | Fecha | Descripcion | Severidad | Owner | Estado | Resolucion | Fecha Cierre |
|---|---|---|---|---|---|---|---|
| 001 | DD/MM | ... | Critico/Mayor/Menor | Nombre | Abierto/Resuelto | ... | DD/MM |

---

## FASE 5: Plan de Rollback

Este plan se activa **SOLO bajo decision de Diego** (o Angel en su ausencia) cuando ocurre un evento critico que pone en riesgo clientes, fondos, o la licencia AOFA L15968/N.

### Triggers de Rollback

- **Servidores MT5 inaccesibles >30 min sin solucion a la vista** (owner trigger: Stanislav + Pepe)
- **Brecha de seguridad confirmada** — acceso no autorizado a datos clientes / fondos (owner: Stanislav + Angel)
- **PSPs procesando transacciones incorrectamente** — montos erroneos, duplicados, retiros a cuentas erradas (owner: Yulia)
- **Issue regulatorio que requiere suspension inmediata** — contacto AOFA, cease & desist, sancion (owner: Susana + Angel)
- **Error critico Skale CRM** que impide rastrear clientes/transacciones (owner: Alex A + Yulia)
- **Fuga de fondos corporativos / Fireblocks comprometido** (owner: Yulia + Diego)

### Procedimiento Rollback

| Paso | Accion | Owner | Tiempo Max |
|---|---|---|---|
| 1 | **Diego anuncia ROLLBACK** en `#war-room-golive` + `#principals` + call grupal | Diego | Inmediato |
| 2 | Deshabilitar registro nuevos clientes en sitio | Stanislav / Alex A | 5 min |
| 3 | Pausar todas las campanas paid media | Marketing | 10 min |
| 4 | Publicar mensaje mantenimiento en neomaaa.com + app.neomaaa.com | Alex B | 15 min |
| 5 | Notificar clientes registrados via email: "mantenimiento programado, servicios temporalmente limitados" | Edward + Marketing | 30 min |
| 6 | Issue de PSP → suspender depositos/retiros + notificar account manager PSP | Yulia / Finance Mgr | 15 min |
| 7 | Issue de MT5 → cerrar acceso trading, documentar posiciones abiertas clientes | Pepe + Stanislav | 15 min |
| 8 | Issue compliance/regulatorio → **Susana notifica AOFA + legal@neomaaa.com** | Susana + Angel | <2h |
| 9 | Diagnosticar problema raiz | Equipo tecnico relevante | Variable |
| 10 | Implementar solucion + verificar ambiente staging | Dev team + Stanislav sign-off | Variable |
| 11 | **Diego decide re-activacion** cuando problema esta resuelto y verificado | Diego + Angel | Variable |

### Comunicacion Durante Rollback

- **Internamente:** updates cada 30 min en `#war-room-golive`. Owner: Diego.
- **A clientes:** cada 2h via email (support@neomaaa.com) + redes (@neomaaamarkets). Mensaje generico sin detalles tecnicos. Owner: Edward + Marketing.
- **A PSPs:** notificacion directa si involucra. Owner: Yulia.
- **A regulador (AOFA)** si aplica: Susana + Angel, copia a Diego.

### Contactos Emergencia Rollback

| Persona | Rol | Canal Primario | Canal Emergencia |
|---|---|---|---|
| Diego Loyola | CEO / Decision final | Telegram | Telefono `[DATO: Diego confirma telefono]` |
| Angel Ortega | CCO / Co-founder | Telegram | Telefono `[DATO: Angel confirma telefono]` |
| Yulia | Ops Director | Telegram | Telefono `[DATO: Yulia confirma telefono]` |
| Stanislav | Tech Principal | Telegram | Telefono `[DATO: Stanislav confirma telefono]` |
| Pepe | Head of Dealing | Telegram DM | `[DATO: Pepe confirma telefono]` |
| Susana | Compliance | Telegram DM + compliance@neomaaa.com | `[DATO: Susana confirma telefono]` |
| Edward | Head of Sales | Telegram + WhatsApp | `[DATO: Edward confirma telefono]` |

### Post-Rollback

1. Documentar incidente completo: causa raiz, timeline, acciones, resolucion. Notion `Work HQ > Crisis Log`.
2. **Post-mortem <24h** con equipo involucrado. Owner: Angel facilita.
3. Actualizar este runbook con lecciones aprendidas.
4. Verificar que ningun cliente fue afectado financieramente; si lo fue, resolver inmediatamente y notificar Susana (reporte regulatorio).

---

## Timeline Consolidado — Dia de Lanzamiento

| Hora UAE | Fase | Accion | Owner |
|---|---|---|---|
| D-1 09:00 | Pre-launch | Inicio verificaciones tecnologicas | Stanislav + Alex A |
| D-1 09:00 | Pre-launch | Inicio verificaciones PSPs | Yulia / Finance Mgr |
| D-1 09:00 | Pre-launch | Inicio verificaciones compliance | Susana |
| D-1 14:00 | Pre-launch | Inicio verificaciones soporte | Edward |
| D-1 14:00 | Pre-launch | Inicio verificaciones marketing | Marketing |
| D-1 18:00 | Pre-launch | Briefing general equipo (16 personas) | Diego |
| **D-1 19:00** | **Pre-launch** | **Decision GO/NO-GO + firmas Diego + Angel + Yulia + Susana + Pepe** | **Principals** |
| D-0 08:00 | Go-Live | Verificaciones finales rapidas | Todos |
| D-0 08:50 | Go-Live | Confirmacion "Listo" cada equipo | Todos |
| **D-0 09:00** | **Go-Live** | **GO FINAL confirmado — NEOMAAA Markets LIVE** | **Diego** |
| D-0 09:01 | Go-Live | Registro habilitado | Stanislav + Alex A |
| D-0 09:02 | Go-Live | Campanas activadas (Meta/TikTok/Google) | Marketing |
| D-0 09:03 | Go-Live | Anuncio redes (LinkedIn/IG/Twitter/Telegram) | Marketing |
| D-0 09:05 | Go-Live | Email lanzamiento a pre-registro | Marketing |
| D-0 09:10 | Go-Live | Soporte modo activo (Rocio + Marilyn) | Edward |
| D-0 09:15 | Monitoreo | Primer registro verificado? | Stanislav / Alex A |
| D-0 09:30 | Monitoreo | Primer KYC verificado? | Susana |
| D-0 09:45 | Monitoreo | Primer deposito verificado? | Yulia |
| D-0 10:00 | Monitoreo | Check-in #1 | Diego |
| D-0 10:30 | Monitoreo | Primera operacion verificada? | Pepe |
| D-0 11:00 | Monitoreo | Check-in #2: metricas primeras 2h | Diego |
| D-0 13:00 | Monitoreo | Check-in #3: metricas acumuladas | Diego |
| D-0 17:00 | Monitoreo | Check-in #4: cierre turno UAE | Diego + Edward |
| D-0 21:00 | Monitoreo | Check-in #5 async: resumen dia | Diego |
| D+1 09:00 | Retrospectiva | Reunion equipo: primeras 24h | Todos |
| D+1 a D+7 | Primera semana | Standups diarios 09:00 UAE | Diego |
| D+7 16:00 | Cierre semana 1 | Primera retro formal — ver [Post-Launch Playbook](/content/es/launch/post-launch-playbook) | Todos Principals + Heads |

---

## Checklist Maestro Pre-Launch (6 Semanas al Go-Live)

> Este es el checklist completo de requisitos a cumplir desde T-6 semanas hasta D-1. Complementa (no reemplaza) las verificaciones D-1 descritas en la FASE 1 de este runbook. Los bloques 1-5 deben estar 100% completados antes de la decision GO/NO-GO.

### Bloque 1: Fundamentos (Semanas 1-2)
*Sin esto no se puede avanzar con nada mas.*

- [ ] **Politica A-Book / B-Book documentada** (Pepe) — % B-Book, umbrales pase a A-Book, tratamiento toxic flow, politica hedging. Ver [ab-book-policy](/content/es/executive/ab-book-policy).
- [ ] **Esquema de comisiones cerrado** — aprobado por Principals. Ver [commissions](/content/es/sales/commissions).
- [ ] **PSPs activos confirmados** — lista final de procesadores live dia 1. Minimo: 1 crypto (USDT), 1 tarjeta, 1 transferencia local LATAM (PIX/PSE/SPEI).
- [ ] **Skale CRM configurado** — campos custom: tipo cuenta, FTD date/amount, depositos totales, ultimo deposito, KYC status, assigned agent, lead source.
- [ ] **Intercom configurado** — workflows soporte, respuestas automaticas, horarios, routing ES/EN. Ver [support/playbook](/content/es/support/playbook).
- [ ] **Sumsub flows finalizados** — KYC flow broker (diferente al prop), documentos aceptados por pais, thresholds de verificacion.

### Bloque 2: Capacitacion (Semanas 2-6)
*Se ejecuta en paralelo con el bloque 1.*

- [ ] **Sales Training semana 1/6** completada (Producto broker basico)
- [ ] **Sales Training semana 2/6** completada (MT5 hands-on)
- [ ] **Sales Training semana 3/6** completada (Compliance + que NO decir)
- [ ] **Sales Training semana 4/6** completada (Pitch + objeciones)
- [ ] **Sales Training semana 5/6** completada (CRM + flujo operativo)
- [ ] **Sales Training semana 6/6** completada (Simulaciones + examen)
- [ ] **Capacitacion Susana** completada (Compliance broker vs prop)
- [ ] **Capacitacion Support Agents** completada (Intercom + flujos)

Ver detalle completo: [sales/training](/content/es/sales/training).

### Bloque 3: Documentos Operativos (Semanas 3-5)

- [ ] **Sales Playbook** finalizado — scripts, objeciones, pitch, KPIs. Ver [sales/training](/content/es/sales/training).
- [ ] **Compliance Manual** finalizado — KYC/AML, frases prohibidas, escalaciones. Ver [compliance/workflow](/content/es/compliance/workflow).
- [ ] **Support Playbook** finalizado — respuestas tipo, escalaciones, SLAs. Ver [support/playbook](/content/es/support/playbook).
- [ ] **Client Onboarding Flow** documentado. Ver [compliance/onboarding](/content/es/compliance/onboarding).
- [ ] **Deposit/Withdrawal Process** documentado. Ver [operations/deposits](/content/es/operations/deposits).
- [ ] **FAQ interno** para Support + Sales. Ver [operations/faq-interno](/content/es/operations/faq-interno).

### Bloque 4: Hiring Critico (Semanas 1-4)

- [ ] **Finance Manager contratado** — PRIORIDAD #1. Sin el, el broker opera a ciegas.
- [ ] **Support Agent #1 contratado** (LATAM, espanol) — Rocio
- [ ] **Support Agent #2 contratado** (MENA/Africa/Asia, ingles — NO atiende EEA/UK: jurisdicciones restringidas) — Marilyn
- [ ] **Marketing Manager** — decision hire vs freelance tomada y ejecutada

### Bloque 5: Testing Pre-Live (Semana 5-6)
*Nada sale a produccion sin testear.*

- [ ] **Test end-to-end del flujo completo**: Registro → KYC → Deposito → Abrir trade → Cerrar trade → Retiro
- [ ] **Test de cada PSP** con transaccion real (deposito + retiro)
- [ ] **Test de Intercom** — ticket de prueba recorre todo el flujo de escalacion
- [ ] **Test de CRM** — lead entra, se asigna, se trackea hasta FTD
- [ ] **Simulacion de llamada de ventas** — cada agent hace 3 llamadas mock evaluadas
- [ ] **Simulacion de KYC** — Susana procesa 10 KYCs de prueba con distintos escenarios (aprobado, retry, rechazado)
- [ ] **Load test basico** de plataforma MT5 + client portal

### Cronograma visual (6 semanas al Go-Live)

```
Semana 1  |==FUNDAMENTOS==|  |==HIRING==|  |=SALES TRAINING S1=|
Semana 2  |==FUNDAMENTOS==|  |==HIRING==|  |=SALES TRAINING S2=|  |=SUSANA TRAINING=|
Semana 3  |===DOCS OPS====|  |==HIRING==|  |=SALES TRAINING S3=|  |=SUSANA TRAINING=|
Semana 4  |===DOCS OPS====|  |==HIRING==|  |=SALES TRAINING S4=|  |=SUPPORT TRAINING=|
Semana 5  |===TESTING=====|              |=SALES TRAINING S5=|  |=SUPPORT TRAINING=|
Semana 6  |===TESTING=====|  |GO-LIVE|  |=SALES TRAINING S6=|
```

---

## Bloque 6: Checklist de Firmas Finales (D-1 19:00 UAE)

Las verificaciones operativas detalladas estan en la FASE 1 de este runbook (tecnologia, PSPs, compliance, soporte, marketing). Este bloque es la **firma final** de los owners tras verificar que los bloques 1-5 estan completos.

- [ ] **Diego Loyola** (CEO) — Aprobacion final go-live
- [ ] **Angel Ortega** (CCO) — Compliance + strategy sign-off
- [ ] **Yulia** (Ops Director) — PSPs + reconciliacion + liquidez sign-off
- [ ] **Susana** (Compliance Officer) — AOFA L15968/N compliance + Sumsub + geo-blocking activo
- [ ] **Pepe** (Head of Dealing) — MT5 + LPs + A/B Book + hedging sign-off
- [ ] **Stanislav** (Principal Tech) — Infra + Equinix + MT5 uptime sign-off
- [ ] **Edward** (Head of Sales/Support) — Team ready + Intercom configured

**Sin las 7 firmas en Telegram `#principals` antes de las 19:00 UAE D-1, el launch se pospone.**

---

## Contactos de Emergencia

| Persona | Rol | Telefono | Email | Disponibilidad |
|---|---|---|---|---|
| Diego | CEO / Decision Final | `[DATO: Diego confirma]` | dl@neomaaa.com | 24/7 Go-Live week |
| Angel | CCO / Co-founder | `[DATO: Angel confirma]` | angel@neomaaa.com | 24/7 Go-Live week |
| Yulia | Operations Director | `[DATO: Yulia confirma]` | ys@neomaaa.com | 24/7 Go-Live week |
| Stanislav | Principal / Tech | `[DATO: Stanislav confirma]` | sk@neomaaa.com | 24/7 Go-Live week |
| Pepe | Head of Dealing | `[DATO: Pepe confirma]` | pepe@neomaaa.com | Mercado abierto + on-call |
| Susana | Compliance Officer | `[DATO: Susana confirma]` | compliance@neomaaa.com | Horario laboral + on-call critico |
| Edward | Head of Sales/Support | `[DATO: Edward confirma]` | edward@neomaaa.com | Horario laboral extendido |
| **Soporte General** | NEOMAAA Markets | **[DATO: teléfono oficial Dubai — Diego confirma]** | **support@neomaaa.com** | Horario soporte |
| **Legal** | — | — | **legal@neomaaa.com** | Email 24/7 |
| **Compliance** | — | — | **compliance@neomaaa.com** | Email 24/7 |

---

*Documento interno de Neomaaa Ltd — Licencia AOFA L15968/N Anjouan.*
*Debe ser revisado y aprobado por los 4 Principals + Susana + Pepe antes del lanzamiento.*
*Cada miembro del equipo debe confirmar por Telegram `#war-room-golive` que lo ha leido y entendido.*
*Proxima revision: post-launch review D+7 (owner: Angel).*
