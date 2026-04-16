# Workflow de Gestion de Tickets — NEOMAAA Markets

**Documento interno — Equipo de Soporte**
**Version:** 1.1
**Ultima actualizacion:** Abril 2026
**Herramientas:** Intercom (canal principal cliente) + Skale (CRM view del cliente) + Sumsub (KYC) + MT5 Manager (trading)
**Aplica a:** Rocio, Marilyn (soporte L1), Edward (Head of Sales actua como Head of Support interino), escalamiento a Susana (Compliance), Pepe (Dealing), Diego (CEO)
**Entidad:** Neomaaa Ltd — L15968/N AOFA Anjouan

---

> [!INFO]
> **Documentos relacionados (lectura obligatoria primer dia):**
> - [Support Playbook](/content/es/support/playbook) — templates completos de respuesta, tonos por idioma, macros Intercom
> - [Enciclopedia de Soporte](/content/es/support/enciclopedia-soporte) — base de conocimiento (depositos, retiros, MT5, KYC)
> - [Manual de Depositos](/content/es/operations/depositos) — PSPs, flujos, troubleshooting
> - [FAQ Interno Operations](/content/es/operations/faq-interno) — 87 preguntas resueltas del equipo
> - [Manual de Crisis](/content/es/operations/manual-crisis) — protocolo cuando escalamiento normal no aplica

---

## INDICE

1. [Team Roster y Responsabilidades](#0-team-roster-y-responsabilidades)
2. [Ciclo de Vida de un Ticket](#1-ciclo-de-vida-de-un-ticket)
3. [Creacion y Clasificacion](#2-creacion-y-clasificacion)
4. [Asignacion](#3-asignacion)
5. [Gestion Activa del Ticket](#4-gestion-activa-del-ticket)
6. [Escalamiento](#5-escalamiento)
7. [Resolucion](#6-resolucion)
8. [Cierre y Seguimiento](#7-cierre-y-seguimiento)
9. [Encuesta de Satisfaccion](#8-encuesta-de-satisfaccion)
10. [Gestion de Cola y Priorizacion](#9-gestion-de-cola-y-priorizacion)
11. [Reportes y Metricas](#10-reportes-y-metricas)
12. [Higiene de Tickets](#11-higiene-de-tickets)
13. [Checklist del Agente (Primer dia + diario)](#12-checklist-del-agente)

---

## 0. Team Roster y Responsabilidades

**NEOMAAA Markets — 16 personas. Equipo de soporte y escalation inmediato:**

| Nombre | Rol | Responsabilidad en Soporte | Contacto prioritario |
|---|---|---|---|
| **Rocio** | Support L1 — ES | Tickets en espanol (LATAM / Espana), primer contacto, macros Intercom | Intercom + Telegram |
| **Marilyn** | Support L1 — ES/EN | Tickets espanol + ingles, cobertura horarios amplios | Intercom + Telegram |
| **Edward** | Head of Sales (actua como Head of Support interino) | Supervision, escalamiento L2, revision CSAT <4, ticketing quejas | Telegram + WhatsApp |
| **Susana** | Compliance Officer | L2 compliance: KYC rechazos complejos, AML flags, quejas regulatorias | Telegram DM + compliance@neomaaa.com |
| **Pepe** | Head of Dealing | L2 dealing: ejecucion MT5, slippage, requotes, spread disputes, swap | Telegram DM |
| **Yulia** | Operations Director | L2 operaciones: PSPs, retiros trabados, reconciliaciones | Telegram DM |
| **Franco, Luis** | Sales Agents | Escalamiento tickets de ventas/upgrades VIP | Telegram |
| **Alex A, Alex B, Gleb, Dimitri** | Dev Team | L3 bugs reales (portal, API, integraciones) | Telegram #dev |
| **Angel Ortega** | Co-founder, CCO | Escalation critica, decisiones de cuenta VIP | Telegram DM |
| **Diego Loyola** | Founder & CEO | Escalation final (queja publica, crisis, cliente amenaza regulador) | Telegram + telefono `[DATO: Diego confirma numero para roster interno]` |

**Mercados soportados:** LATAM (excluye USA/Canada), CIS con screening, MENA (excluye Iraq), Asia (fase 2), Africa (excluye Sudan).
**NO aceptamos:** USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan. Si llega ticket de estos mercados → responder con template "no service" + cerrar + tag `restricted-geo`.

**Horarios de cobertura (objetivo):**

| Turno | Horario (UAE / GMT+4) | Horario LATAM (GMT-3) | Agente principal |
|---|---|---|---|
| Turno 1 — LATAM morning | 14:00–22:00 UAE | 07:00–15:00 ART | Rocio |
| Turno 2 — EU/ME + LATAM afternoon | 10:00–18:00 UAE | 03:00–11:00 ART | Marilyn |
| Turno 3 — Asia + EU morning | 04:00–12:00 UAE | `[DATO: Edward define rotacion Asia fase 2]` | `[DATO: por contratar Asia hiring]` |

Cobertura weekend: on-call rotativo Rocio/Marilyn, SLA relajado a <30min chat / <6h email. Urgencias financieras: escalar directo a Yulia.

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
| **Nuevo** | Ticket recien creado en Intercom, sin asignar o sin respuesta | Sistema / Agente | SLA de primera respuesta (ver 1.3) |
| **En proceso** | Agente trabajando activamente | Agente asignado | Segun SLA de resolucion por prioridad |
| **Esperando cliente** | Agente respondio, espera info del cliente | Agente | 48h antes de recordatorio |
| **Esperando interno** | Agente espera respuesta de L2 (Susana/Pepe/Yulia/Dev) | Agente + L2 | 2h (urgente) / 4h (alta) / 24h (media) |
| **Escalado** | Transferido a Edward o directo a L2 | Edward / L2 | Segun prioridad, ver matriz 5.3 |
| **Resuelto** | Problema solucionado, esperando confirmacion del cliente | Agente | 48h antes de cerrar |
| **Cerrado** | Cliente confirmo o timeout 96h | Sistema / Agente | Permanente |

### 1.2 Flujo Visual

```
Cliente envia mensaje via Intercom / email support@neomaaa.com / WhatsApp
        |
        v
[NUEVO] Ticket creado en Intercom (auto-sync con Skale via contact email)
        |
        v
Routing automatico por idioma (lang:es → Rocio; lang:en → Marilyn)
        |
        v
Agente abre ticket → consulta contacto en Skale (ver historial, saldo, estado KYC Sumsub)
        |
        v
[EN PROCESO]
        |
        +--→ Resolucion directa con macro? SI → responde → [RESUELTO] → 48h → [CERRADO]
        |
        +--→ Necesita info cliente? → [ESPERANDO CLIENTE] (48h timeout)
        |
        +--→ Necesita info interna? → tag L2 por Telegram DM → [ESPERANDO INTERNO]
        |
        +--→ Fuera de nivel L1? → [ESCALADO] a Edward/Susana/Pepe segun matriz
```

### 1.3 SLAs por canal y prioridad (OBJETIVO NEOMAAA)

| Canal | Prioridad | First Response Time (FRT) | Full Resolution Time (FRT) |
|---|---|---|---|
| **Intercom chat** (cliente logged-in) | Urgente | **<5 min** | <2h |
| Intercom chat | Alta | <10 min | <8h |
| Intercom chat | Media | <30 min | <24h |
| Intercom chat | Baja | <1h | <48h |
| **Email** (support@neomaaa.com) | Urgente | **<30 min** | <4h |
| Email | Alta | **<2h** | <12h |
| Email | Media | <6h | <48h |
| Email | Baja | <24h | <72h |
| **WhatsApp** (soporte informal) | Cualquier | <15 min horario laboral | Triage → mover a Intercom |

**Metrica global objetivo mensual:** FRT promedio chat <5 min, email <2h, CSAT >85%, tickets/cliente activo <0.5.

---

## 2. Creacion y Clasificacion

### 2.1 Como se Crea un Ticket

| Origen | Creacion | Tag Automatico |
|--------|----------|---------------|
| Chat en vivo (Intercom Messenger en app.neomaaa.com / neomaaa.com) | Automatica | `source:chat` |
| Email a support@neomaaa.com | Automatica (Intercom captura) | `source:email` |
| Email a compliance@neomaaa.com | Manual (forward de Susana a Intercom) | `source:compliance` |
| Formulario de contacto web | Automatica | `source:web-form` |
| WhatsApp Business NEOMAAA (agente crea) | Manual | `source:whatsapp` |
| Telegram grupo/DM (agente crea) | Manual | `source:telegram` |

### 2.2 Clasificacion Inmediata (primeros 2 min)

1. **Leer mensaje completo + revisar contacto en Skale** (saldo, estado KYC en Sumsub, cuentas MT5 asociadas, historial de tickets)
2. **Asignar tags obligatorios:**
   - **Tipo (Intercom custom tags):** `kyc`, `deposit`, `withdrawal`, `mt5-login`, `mt5-execution`, `mt5-ea`, `account-type`, `leverage-change`, `spread-issue`, `swap`, `bonus`, `ib-partner`, `complaint`, `pre-registration`
   - **Prioridad:** `priority:urgent` / `priority:high` / `priority:medium` / `priority:low`
   - **Idioma:** `lang:es` / `lang:en` / `lang:ru` / `lang:pt`
   - **Mercado:** `market:latam` / `market:es` / `market:mena` / `market:cis` / `market:asia`
3. **Verificar VIP:** atributo custom `vip_tier` en Intercom (Gold = $10k+ acumulado, Platinum = $50k+ mensual). VIP → asignar a Edward directo.
4. **Revisar historial:** buscar tickets anteriores del contact.email en Intercom + notas en Skale.

### 2.3 Criterios de Prioridad (Referencia Rapida NEOMAAA)

| Prioridad | Criterio | Ejemplo tipico NEOMAAA | SLA FRT |
|-----------|----------|------------------------|---------|
| **Urgente** | Dinero en riesgo AHORA o compliance critico | Deposito >24h sin acreditar / cliente no cierra posicion MT5 / sospecha fraude / cliente amenaza regulador | <5 min chat |
| **Alta** | Impide operar | KYC rechazado Sumsub / MT5 no conecta / retiro >48h trabado / spread-off error | <10 min chat |
| **Media** | Friccion operable | Pregunta sobre PSPs / cambio apalancamiento / consulta swap | <30 min chat |
| **Baja** | Informativo / pre-venta | Horarios mercados / tipos cuenta / pre-registro | <1h chat |

---

## 3. Asignacion

### 3.1 Reglas de Asignacion Automatica (Intercom Workflow)

| Condicion | Asignacion |
|-----------|-----------|
| `lang:es` | Rocio (turno LATAM) / Marilyn (turno EU-overlap) |
| `lang:en` | Marilyn |
| `lang:ru` | `[DATO: Gleb o Dimitri triage dev → passthrough a Marilyn con traduccion]` |
| `lang:pt` (Brasil) | Rocio con fallback Marilyn |
| VIP Gold/Platinum | Edward (directo, skip L1) |
| Queja formal (`tag:complaint`) | Edward + copia Susana |
| `tag:kyc` con rechazo repetido | Susana (directo) |
| Fuera de horario cobertura | Cola → primer agente del siguiente turno atiende |

### 3.2 Reasignacion Manual

**Cuando reasignar:**
- Agente original no puede resolver + conocimiento especifico requerido de otro agente
- Handoff de turno (ver protocolo en [Support Playbook](/content/es/support/playbook))
- Cliente pide hablar con otra persona → respetarlo siempre
- Escalacion a L2 o Edward

**Proceso:**
1. Agregar nota interna en Intercom con resumen + link al contacto Skale
2. Cambiar "Assignee" en Intercom
3. Notificar al nuevo agente por Telegram DM: `@nombre ticket [link] - resumen 1 linea - accion requerida`
4. Informar cliente: "Te transfiero a [nombre] que es especialista en [area]. Tu numero de caso sigue siendo #[Intercom ID]."

### 3.3 Tickets Sin Asignar al Inicio de Turno

**Protocolo primer 15 min del turno (Rocio/Marilyn):**
1. Intercom Inbox → filtro "Unassigned"
2. Ordenar por `created_at asc` (mas viejo primero)
3. Filtrar `priority:urgent` primero → responder en <10 min
4. Asignarse los del idioma correspondiente
5. Cualquier urgente sin asignar >15 min → alertar a Edward por Telegram

---

## 4. Gestion Activa del Ticket

### 4.1 Primera Respuesta (la mas critica — define CSAT)

**Checklist de primera respuesta:**
- [ ] Saludo con nombre del cliente (Intercom muestra el nombre de Skale sync)
- [ ] Confirmar que entiendo (parafrasear si es complejo)
- [ ] Dar respuesta directa o informar que estoy investigando
- [ ] Si investigo: dar tiempo estimado concreto ("te confirmo en 15 min" / "antes de las 18:00 UAE")
- [ ] Preguntar si hay algo mas

**NUNCA responder sin:**
- Haber abierto el perfil en Skale
- Haber revisado estado KYC en Sumsub (si el ticket lo amerita)
- Haber verificado cuentas MT5 asociadas (si aplica)

### 4.2 Actualizaciones en Proceso

| Situacion | Accion | Frecuencia |
|-----------|--------|-----------|
| Investigando internamente | Update al cliente "estoy en ello" | Cada 2h |
| Esperando respuesta L2 (Susana/Pepe/Yulia/Dev) | Update + timeframe | Al escalar + cada 4h |
| Proceso toma >1 dia | Update aunque no haya novedad | Cada 12h |
| Ticket VIP | Update mas frecuente | Cada 2h minimo |

**Template de actualizacion (macro Intercom "update-in-progress"):**
```
Hola [nombre], queria darte una actualizacion sobre tu caso #[ID].

Estamos [accion en curso — ej: "verificando con el equipo de dealing 
la ejecucion de tu orden en MT5"]. Todavia no tenemos resolucion final 
pero tu caso esta siendo atendido activamente.

Proxima actualizacion: [tiempo especifico].

Equipo NEOMAAA Markets
```

### 4.3 Notas Internas (Intercom "Note")

**Formato estandar:**
```
[YYYY-MM-DD HH:mm UAE] [Rocio/Marilyn/Edward]
Accion: [que hice — ej: "verifique deposit en Skale + consulte Yulia por reconciliacion PSP"]
Resultado: [que encontre — ej: "PSP confirma settlement el 2026-04-12, Skale no sincronizo"]
Siguiente: [que falta — ej: "Yulia reenvia sync manual, ETA 2h"]
```

Cada accion significativa → 1 nota interna. Sin excepcion. Edward audita semanalmente.

---

## 5. Escalamiento

### 5.1 Cuando Escalar

- No puedes resolver en 15 min con herramientas L1 (Intercom + Skale + Sumsub + Enciclopedia)
- Requiere acceso que no tenes (MT5 Manager admin, Fireblocks, PSP dashboard directo)
- Tema compliance / regulatorio / legal
- Cliente pidio supervisor
- Queja formal (ver `manejo-quejas.md` y [Manual de Crisis](/content/es/operations/manual-crisis))

### 5.2 Proceso de Escalamiento

1. **Nota interna en Intercom** con: intento previo, info disponible, razon de escalar, accion requerida de L2
2. **Comunicar al L2 por Telegram DM** (no grupo):
   ```
   @[persona] — Ticket escalado: [link Intercom]
   Cliente: [nombre] — MT5#: [numero] — Skale ID: [ID]
   Problema: [1 linea]
   Intente: [resumen]
   Necesito: [accion L2]
   Prioridad: [urgente/alta/media]
   SLA: responder antes de [hora]
   ```
3. **Informar cliente** (macro Intercom "escalation-to-l2"):
   ```
   [nombre], he transferido tu caso al equipo de [compliance/dealing/ops] 
   que tiene acceso a las herramientas necesarias. 
   Te doy seguimiento personalmente en [tiempo].
   Numero de caso: #[Intercom ID].
   ```
4. **Tags:** `escalated` + `waiting-internal` + `l2:<persona>`
5. **Seguimiento:** L2 no responde en 2h → follow-up Telegram. Si 4h → escalar a Edward. Si 6h (urgente) → Angel o Diego.

### 5.3 Matriz de Escalamiento (Referencia Rapida NEOMAAA)

| Problema | L2 directo | Canal | Fallback si no responde en SLA |
|----------|-----------|-------|-------------------------------|
| KYC rechazo / AML flag / sanciones | **Susana** | Telegram DM + compliance@neomaaa.com | Angel (CCO) |
| MT5 ejecucion / slippage / requote / spread disputa | **Pepe** | Telegram DM | Stanislav (Principal tech) |
| Deposito no acreditado / retiro trabado / PSP rechazo | **Yulia** | Telegram DM | `[DATO: Finance Manager por contratar]` |
| Bug portal / API / Skale sync | **Alex A / Alex B / Gleb / Dimitri** (dev team) | Telegram `#dev` | Stanislav |
| Upgrade VIP / cambio esquema comisiones | **Edward** → Franco/Luis | Telegram `#sales` | Angel |
| Queja regulatoria / amenaza legal | **Susana** | Telegram DM URGENTE + legal@neomaaa.com | **Diego directo** |
| Cliente VIP amenaza irse | **Edward + Pepe** call personal <24h | Telefono | Diego |
| Crisis publica / viral Telegram-Twitter | **Diego + Angel** | Telefono | Activar [Manual de Crisis](/content/es/operations/manual-crisis) |
| Todo lo demas sin resolucion L1 | **Edward** (Head of Support interino) | Telegram DM | Angel |

---

## 6. Resolucion

### 6.1 Que Significa "Resuelto"

- Pregunta respondida completa y correctamente (con data real de Skale/MT5/Sumsub, no generica)
- Problema tecnico solucionado + cliente confirmo
- Deposito/retiro procesado y reflejado en MT5
- Queja investigada + resultado comunicado
- Cliente tiene toda la info para proceder

### 6.2 Comunicacion de Resolucion

**Checklist cierre:**
- [ ] Resumir lo resuelto
- [ ] Confirmar satisfaccion
- [ ] Preguntar si hay algo mas
- [ ] Ofrecer canal para futuras consultas (Intercom app.neomaaa.com / support@neomaaa.com)

**Template resolucion (macro Intercom "resolution"):**
```
Hola [nombre],

Tu caso #[ID] ha sido resuelto. [Resumen de la resolucion].

[Si aplica: detalle tecnico — "tu deposito de $500 USDT fue acreditado 
en tu cuenta MT5 #5123456 a las 14:32 UAE"]

Si hay algo mas o si no quedo del todo claro, estoy aca.

Equipo NEOMAAA Markets — support@neomaaa.com
```

### 6.3 Tickets No Resueltos Favorablemente

Si la resolucion no es favorable (queja improcedente, funcionalidad no disponible, restriccion regulatoria):

```
Hola [nombre],

Despues de revisar tu caso con el equipo de [compliance/dealing], 
[explicacion clara y honesta].

Entiendo que no es la respuesta esperada. [Si hay alternativa: "Lo que 
si puedo ofrecerte es..."] [Si no: "Lamento no poder ayudarte de otra 
forma."]

Si no estas satisfecho, podes solicitar revision adicional via 
compliance@neomaaa.com — tu caso sera evaluado por Susana 
(Compliance Officer) + Angel Ortega (CCO).

Equipo NEOMAAA Markets
```

---

## 7. Cierre y Seguimiento

### 7.1 Proceso de Cierre

| Paso | Accion | Tiempo |
|------|--------|--------|
| 1 | Comunicar resolucion | Inmediato |
| 2 | Esperar confirmacion cliente | 48h |
| 3 | Confirma → cerrar | Inmediato |
| 4 | No responde → recordatorio | A 48h |
| 5 | No responde al recordatorio → cierre auto | 48h post-recordatorio (total 96h) |

**Template recordatorio pre-cierre (macro "pre-close-reminder"):**
```
Hola [nombre], solo verifico que tu caso #[ID] quedo resuelto. 
Si no hay respuesta en 48h lo cierro automaticamente. 
Podes reabrirlo cuando quieras desde app.neomaaa.com o 
support@neomaaa.com.
```

### 7.2 Tags de Cierre

| Tag | Significado |
|-----|------------|
| `resolved-l1` | Resuelto por Rocio/Marilyn |
| `resolved-l2` | Con intervencion de Susana/Pepe/Yulia/Dev |
| `resolved-l3` | Con intervencion de Angel/Diego |
| `resolved-client-confirmed` | Cliente confirmo satisfaccion |
| `resolved-no-response` | Timeout 96h sin respuesta |
| `unresolved-client-choice` | Cliente decidio no continuar |
| `complaint-resolved` | Queja resuelta |
| `restricted-geo` | Cerrado por restriccion geografica (USA/UK/EEA/etc) |

### 7.3 Seguimiento Post-Cierre (VIP + prioridad alta/urgente)

| Seguimiento | Tiempo | Accion |
|------------|--------|--------|
| Primero | 48h post-cierre | "Todo sigue bien con [tema]?" |
| CSAT survey | 24h post-cierre | Automatico desde Intercom |
| VIP check-in | 7 dias post-cierre | Edward hace call/message personal |

---

## 8. Encuesta de Satisfaccion

### 8.1 Configuracion en Intercom

**Ruta:** Intercom > Settings > Messenger > Customer Satisfaction (CSAT)
**Trigger:** 24h despues de cerrar
**Pregunta:** "Como calificarias la atencion que recibiste?" (5 estrellas)
**Pregunta abierta:** "Algun comentario adicional?"

### 8.2 Uso de Resultados

| Calificacion | Accion | Owner |
|-------------|--------|-------|
| 5 | Registrar. Considerar review publica con permiso. | Rocio/Marilyn |
| 4 | Registrar sin accion especial | — |
| 3 | **Edward revisa el ticket** para identificar mejora | Edward |
| 1-2 | **Edward contacta al cliente** para entender insatisfaccion. Caso revisado internamente con Susana/Pepe segun aplique | Edward + L2 |

### 8.3 Metas CSAT NEOMAAA

- **Meta global:** >85% CSAT positivo (4-5 estrellas) mensual
- **Meta por agente:** >80% positivo
- **Tasa de respuesta:** >30%
- **NPS post-ticket:** >50

---

## 9. Gestion de Cola y Priorizacion

### 9.1 Regla de Priorizacion

1. **Urgentes** — primero, sin excepcion
2. **VIP Gold/Platinum** con cualquier prioridad — segundo
3. **Alta prioridad** — tercero
4. **FIFO dentro del mismo nivel**
5. **Media/baja** — ultimo

### 9.2 Gestion de Picos

Cola > capacidad del agente:
1. Auto-reply Intercom: "Recibimos tu mensaje. Un agente te atiende en breve."
2. Priorizar segun 9.1
3. **>10 tickets sin respuesta → alertar Edward por Telegram** (Edward puede mover a Franco/Luis temporalmente si estan libres)
4. Solapamiento de turnos → ambos agentes a la cola

### 9.3 Limites de Tickets Simultaneos

| Tipo de Agente | Activos Max | En Cola Max |
|---------------|-------------|-------------|
| Rocio/Marilyn (L1) | 5 simultaneos | 15 en cola |
| Edward (Head / VIP manager) | 3 simultaneos | 10 en cola |

Exceso de limite → Edward redistribuye.

---

## 10. Reportes y Metricas

### 10.1 Metricas Diarias (Dashboard Intercom + Edward reporta en Telegram `#war-room`)

| Metrica | Meta NEOMAAA | Red flag |
|---------|--------------|----------|
| Tickets recibidos | Tracking | — |
| Tickets resueltos | >80% de recibidos | <60% |
| FRT chat | <5 min | >15 min |
| FRT email | <2h | >6h |
| Tiempo resolucion promedio | <12h | >24h |
| % escalados | <20% | >35% |
| Tickets en cola fin de turno | 0 | >5 |
| Tickets/cliente activo | <0.5 | >1.5 |

### 10.2 Reporte Semanal (Edward → Principals viernes 16:00 UAE)

```
REPORTE SEMANAL SOPORTE — Semana [#] — NEOMAAA Markets

Tickets totales: ___
Resueltos: ___ (__% vs meta 80%)
Pendientes: ___
Escalados: ___

Por categoria:
- KYC (Sumsub): ___
- Depositos (PSPs): ___
- Retiros: ___
- MT5 (ejecucion/login): ___
- Compliance/Quejas: ___
- Otros: ___

SLA cumplido: ___%
CSAT promedio: ___/5.0 (meta 85% positivo)
NPS: ___

Tickets fuera de SLA: ___
Top 3 problemas recurrentes:
1. ___
2. ___
3. ___

Acciones requeridas (owner + deadline):
- ___
```

Se sube a Notion `Work HQ NEOMAAA > Support > Weekly Reports`.

### 10.3 Reporte Mensual

Todo lo semanal + tendencias mes-a-mes + analisis de categorias + necesidades de capacitacion + necesidades de hiring + feedback CSAT abierto.

---

## 11. Higiene de Tickets

### 11.1 Limpieza Semanal (Viernes ultima hora de turno)

| Accion | Criterio |
|--------|----------|
| Cerrar "Esperando cliente" >7 dias | Enviar template de cierre primero |
| Follow-up "Esperando interno" >48h | Contactar L2 nuevamente (Telegram) |
| Revisar tickets asignados sin actividad >72h | Update o cerrar |
| Verificar tags | Todo ticket: tipo + prioridad + idioma + mercado |
| Limpiar duplicados | Fusionar tickets del mismo cliente sobre el mismo tema |

### 11.2 Fusion de Tickets

1. Identificar ticket principal (mas completo / mas viejo)
2. Copiar info del duplicado al principal
3. Cerrar duplicado: nota "Fusionado con ticket #[principal]"
4. Informar cliente: "He consolidado tus consultas en un solo caso #[ID]"

---

## 12. Checklist del Agente

### Checklist Primer Dia (agente nuevo — Rocio o Marilyn onboarding)

- [ ] Acceso a Intercom (owner: Edward solicita al dev team)
- [ ] Acceso a Skale CRM (owner: Yulia aprueba)
- [ ] Acceso a Sumsub dashboard read-only (owner: Susana aprueba)
- [ ] Acceso MT5 Manager modo "Support" (owner: Pepe aprueba, solo consulta)
- [ ] Alta en Telegram grupos: `#war-room`, `#support`, `#sales`, `#dev`
- [ ] Alta en WhatsApp NEOMAAA business account
- [ ] Email @neomaaa.com creado (support@ + alias personal)
- [ ] Lectura obligatoria:
  - [ ] Este doc (gestion-tickets.md)
  - [ ] [Support Playbook](/content/es/support/playbook)
  - [ ] [Enciclopedia Soporte](/content/es/support/enciclopedia-soporte)
  - [ ] [Manual Depositos](/content/es/operations/depositos)
  - [ ] [FAQ Interno Ops](/content/es/operations/faq-interno)
- [ ] Simulacro con Edward: 5 tickets de prueba, feedback en vivo
- [ ] Shadowing 1 turno completo con Rocio o Marilyn
- [ ] Primer turno solo con Edward on-call para dudas

### Al Iniciar Turno (primeros 15 minutos)

- [ ] Revisar cola unassigned en Intercom
- [ ] Leer notas handoff del turno anterior (Telegram `#support` + Intercom notas)
- [ ] Asignarme tickets de mi idioma/region
- [ ] Responder urgentes primero (meta: <10 min primer respuesta)
- [ ] Revisar "Esperando interno" para follow-up a L2
- [ ] Verificar tickets VIP activos en Skale

### Durante el Turno

- [ ] Max 5 tickets activos simultaneos
- [ ] Documentar cada accion en notas internas (formato 4.3)
- [ ] Cumplir SLAs 1.3
- [ ] Escalar a tiempo (no retener lo que no puedo resolver)
- [ ] Personalizar cada respuesta (macros = base, no copy-paste literal)

### Al Terminar Turno (ultimos 15 min)

- [ ] Review todos mis tickets abiertos
- [ ] Nota handoff en tickets que requieren continuidad
- [ ] Reasignar urgentes al siguiente agente (o Edward si gap)
- [ ] Actualizar estado (ningun ticket en "Nuevo")
- [ ] Mensaje en Telegram `#support`: "Termino turno. X tickets activos, Y urgentes pendientes, Z escalados a [L2]."

---

*Documento interno de NEOMAAA Markets — Neomaaa Ltd L15968/N AOFA Anjouan.*
*Complementa el [Support Playbook](/content/es/support/playbook) y la [Enciclopedia de Soporte](/content/es/support/enciclopedia-soporte).*
*Revision mensual obligatoria — owner: Edward. Proxima revision: `[DATO: Edward agenda fecha]`.*
