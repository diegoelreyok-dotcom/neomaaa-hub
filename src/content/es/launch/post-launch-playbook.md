# Post-Launch Playbook — Semanas 1 a 4 de operación NEOMAAA Markets

**Entidad:** Neomaaa Ltd — L15968/N AOFA Anjouan
**Aplica a:** Mes 1 post Go-Live del broker (MT5 + Skale + Sumsub + Intercom operativos)
**Equipo principal:** Principals (Diego, Angel, Yulia, Stanislav) + Heads (Pepe Dealing, Susana Compliance, Edward Sales/Support, `[DATO: Finance Manager por contratar]`, `[DATO: Marketing Manager por contratar]`)
**Ritmo obligatorio:** Daily snapshot 19:00 UAE + Stand-up Lunes 09:00 UAE + Retro Viernes 16:00 UAE

Las primeras cuatro semanas despues de abrir un broker son las que definen si el lanzamiento fue un exito, un experimento caro, o un desastre. Este documento toma el relevo donde termina el [runbook del dia D + checklist maestro pre-launch](/content/es/operations/go-live-runbook): que hacer desde la manana del dia 2 hasta el cierre del mes 1.

No es un calendario sugerido. Es el estandar operativo interno para los primeros 30 dias de NEOMAAA Markets.

---

## Introducción

### Por que las primeras 4 semanas definen el launch

Un broker nace con inercia: la narrativa publica, la energia del equipo, los afiliados activados, la campana de ads corriendo, los primeros clientes curiosos. Esa inercia dura entre 20 y 40 dias. En ese periodo se define casi todo:

- **El CAC real** — no el estimado del pitch, el que pagan las tarjetas.
- **El retention temprano** — si los FTDs vuelven a depositar o se pierden.
- **La reputacion en la red** — 20 clientes insatisfechos publicando en Telegram hacen mas dano que seis meses de content marketing.
- **La moral del equipo** — los primeros 30 dias definen si los 16 de NEOMAAA se enchufan o se queman.
- **La confianza de los principals** (Diego, Angel, Yulia, Stanislav) — cada semana sin datos claros genera ansiedad y decisiones apuradas.

Si las cuatro semanas se operan con disciplina, el broker entra al mes 2 con un playbook operativo real, targets ajustados a la realidad, y capacidad de escalar. Si se operan en modo reactivo, el mes 2 empieza apagando fuegos del mes 1 y el equipo termina quemado antes del trimestre.

### Tres principios no negociables

<div className="neo-step-list">

**Principio 1 — Medir todo desde el dia 1.** Sin data real cada decision se toma por sensacion. Los dashboards (Skale + Google Sheets + MT5 Admin + Intercom) tienen que estar corriendo y capturando KPIs desde el primer deposito. No hay "lo configuramos la semana que viene". Owner: `[DATO: Finance Manager por contratar]` o Yulia en interino.

**Principio 2 — No cambiar estrategia en la primera semana.** La tentacion es enorme: un canal underperform, un agent con pipeline flojo, una landing con conversion baja. La regla es dejar correr. Una semana no es una muestra estadistica — es ruido. Cualquier cambio forzado dentro de los primeros 7 dias es emocion, no estrategia.

**Principio 3 — Retro semanal obligatoria con Principals + Heads.** Viernes 16:00 UAE, sin excepciones. Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward + Finance/Marketing Managers. 90 minutos. Sin esta reunion fija, el ritmo se pierde, las decisiones se postergan, y los departamentos dejan de estar alineados.

</div>

> [!WARNING]
> La tentacion mas peligrosa del launch es actuar rapido sin datos. Un ajuste de pricing en el dia 3, una campana pausada el dia 5, un rol contratado el dia 7 "porque parece que lo necesitamos" — cada una de esas decisiones sin data de respaldo puede destruir el plan entero. La disciplina es: observar, medir, decidir.

---

## Cadencia de comunicacion fija (mes 1)

| Evento | Dia / Hora (UAE) | Duracion | Owner | Canal | Participantes |
|---|---|---|---|---|---|
| **Daily snapshot** | Todos los dias 19:00 | 5 min async | Finance Manager (o Yulia interino) | Telegram `#launch-principals` | Principals + Heads |
| **Morning stand-up** | Lun-Vie 09:00 | 15 min | Diego | Telegram voice / videollamada | Pepe, Susana, Edward, Finance, Marketing |
| **Stand-up extendido lunes** | Lun 09:00 | 45 min | Diego | Video | Todos Principals + Heads |
| **Dealing sync** | Mar/Jue 14:00 | 30 min | Pepe | Video | Pepe + Stanislav + Dealing team |
| **Compliance sync** | Mie 10:00 | 30 min | Susana | Video | Susana + Angel + Yulia |
| **Support daily** | Todos los dias 12:00 UAE (overlap turnos) | 15 min | Edward | Telegram `#support` | Rocio + Marilyn + Edward |
| **Retro semanal** | Viernes 16:00 | 90 min | Angel / Diego rotativo | Video | Principals + todos los Heads |

---

## KPIs que miramos

Los KPIs se dividen en tres niveles de cadencia: diarios (revisados todos los dias del mes 1), semanales (viernes en la retrospectiva), mensuales (month-in-review al cierre del mes 1).

### KPIs diarios

Todos los dias del mes 1, a las **19:00 UAE**, el Finance Manager (o Yulia interino) manda el daily snapshot al Telegram `#launch-principals`. Formato tabla, sin narrativa.

| KPI | Meta ideal | Meta aceptable | Red flag | Fuente | Owner data |
|---|---|---|---|---|---|
| Registros nuevos | 30/dia | 15/dia | <5/dia | Skale | Edward |
| KYC pass rate | >70% | >50% | <40% | Sumsub dashboard | Susana |
| FTD rate (de KYC aprobados) | >40% | >25% | <15% | Skale + PSP panels | Finance Mgr |
| FTD promedio (USD) | >$150 | >$80 | <$50 | Skale | Finance Mgr |
| Tickets/cliente activo | <0.5 | <1 | >1.5 | Intercom | Edward |
| FRT chat | <5 min | <30 min | >2h | Intercom | Edward |
| NPS post-ticket | >50 | >30 | <10 | Intercom CSAT | Edward |
| MT5 uptime | 100% | >99.5% | <99% | MT5 Admin + Equinix monitoring | Stanislav |
| PSP success rate | >90% | >80% | <70% | PSP panels + Skale | Yulia |
| Volumen MT5 diario (lotes) | Tracking | — | caida >50% dia a dia | MT5 Admin | Pepe |

**Target SLA infraestructura:** 99.9% uptime MT5/portal (owner Stanislav + Equinix DC).

> [!INFO]
> Estas metas son rangos realistas del retail broker market para un launch. Un broker con 2+ anos de operacion y marca establecida deberia apuntar mas arriba (FTD rate >50%, retention >45%). Para un launch NEOMAAA, pasar del "aceptable" es ya un buen resultado.

### KPIs semanales

Se revisan viernes 16:00 UAE en la retro. Cada KPI se compara contra la semana anterior y contra la meta del mes.

- **CAC por canal** — SEM, paid social (Meta/TikTok), organico, IB (introducing brokers / afiliados), referidos de clientes. Cada canal trackeado por separado en Skale + Google Sheets. Owner: Marketing Mgr.
- **Conversion lead-to-FTD por canal** — cuantos leads de cada canal terminan depositando. Filtro real de calidad.
- **Retention semana 1 / semana 2** — % de FTDs que volvieron a operar o depositar dentro de 7 / 14 dias.
- **Churn rate** — clientes que cerraron cuenta o inactivos 14+ dias sobre total FTDs del periodo.
- **Volumen trading** — lotes en MT5 por instrumento (FX majors/minors, indices, cripto CFDs, metales). Owner: Pepe.
- **Spread revenue vs comision revenue** — donde gana el broker.
- **Cost per FTD por canal** — gasto ads / FTDs atribuidos.
- **LTV temprano (semanas 1-2)** — proxy: depositos + comisiones/spread generados por cohorte.

### KPIs mensuales (cierre mes 1)

<div className="neo-stat-grid">

**Revenue total broker** — spread + comisiones + FX markup neto de rebates IBs. Owner: Finance Mgr / Yulia.

**Gross margin** — revenue menos PSP fees + LP fees + hedging. Mide eficiencia A/B Book (ver `/content/es/executive/ab-book-policy`).

**CAC blended** — ads + salarios sales + retainers marketing / FTDs totales.

**LTV:CAC ratio** — minimo 3:1. Si mes 1 esta en 1.5:1 o peor, problema estructural.

**Concentracion top 10** — % revenue de los 10 clientes mas grandes. >50% = riesgo concentracion.

**Regulatory incidents** — ideal 0. Uno solo = tema Principals + posible notificacion AOFA.

</div>

> [!DANGER]
> LTV:CAC <1:1 sostenido por 4 semanas significa que cada cliente nuevo hace perder dinero. Si llegamos al cierre de mes 1 con ese ratio, **NO se escalan ads** — se pausa y se rearma la strategy antes de quemar cash del funding. Trigger automatico de meeting Diego + Angel + Marketing Mgr + Finance Mgr.

---

## Dashboard de Principals

### Que se ve en la reunion del lunes 09:00 UAE

Durante el mes 1, ademas de la retro de los viernes, **stand-up extendido lunes 09:00 UAE de 45 min**. No reemplaza la retro: es para arrancar la semana con el mismo mapa.

<div className="neo-step-list">

**1. Numeros de la semana** (10 min) — tabla resumen con los 10 KPIs diarios promediados, vs semana anterior. Owner: **Finance Manager** (o Yulia interino).

**2. Top 3 wins + Top 3 problemas** (10 min) — cada Head trae:
- Pepe: dealing (ejecucion, flow toxico, spread)
- Susana: compliance (KYC pass rate, AML flags, quejas regulatorias)
- Edward: ventas + support (FTD rate, pipeline, CSAT)
- Marketing: CAC, calidad leads
- Finance: cash, PSPs, reconciliacion

**3. Decisiones pendientes** (10 min) — que necesita voto Principals: aprobar PSP nuevo, autorizar hiring, ajustar comisiones, aprobar bonus a equipo.

**4. Recurso pedido por departamento** (10 min) — dinero, gente, tiempo. Cada Head dice que necesita.

**5. Revision OKRs del mes** (5 min) — donde estamos vs objetivos mes 1. OKR en rojo → flag para retro viernes.

</div>

### Herramientas

**Mes 1:**
- **Skale dashboards** — registro, KYC, FTD funnel por canal/afiliado
- **MT5 Admin** — volumen, P&L dealer, flow analysis (Pepe)
- **Google Sheets** — P&L consolidado + CAC por canal (actualiza Finance Mgr a mano 19:00 UAE diario)
- **Intercom Reports** — FRT, CSAT, volumen tickets
- **Sumsub dashboard** — KYC funnel, razones de rechazo (Susana)
- **Notion `Work HQ NEOMAAA`** — log decisiones, actas retro, OKRs

**Mes 2+:** evaluar Mixpanel o Amplitude cuando volumen justifique. No vale antes.

> [!TIP]
> El dashboard del mes 1 tiene que ser feo y funcional. Nadie se impresiona con un Notion bonito — los principals quieren ver los numeros en 30 segundos. Una tabla en Google Sheets compartida al Telegram `#launch-principals` a las 19:00 UAE es mejor que un dashboard fancy que se actualiza cada 3 dias.

---

## Semana por semana

<div className="neo-timeline">
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Semana 1 — Supervivencia</span><span className="neo-timeline-step-desc">Que todo funcione. No escalar nada.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Semana 2 — Estabilizacion</span><span className="neo-timeline-step-desc">Arreglar fuegos criticos, empezar a escalar lo que funciono.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Semana 3 — Optimizacion</span><span className="neo-timeline-step-desc">Mover la aguja en KPIs. Optimizar en serio.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Semana 4 — Reset</span><span className="neo-timeline-step-desc">Month-in-review y plan del mes 2.</span></div>
</div>

### Semana 1 — Supervivencia

**Objetivo:** que todo funcione. NO escalar nada.
**Target NEOMAAA semana 1:** 50–100 FTDs acumulados, MT5 uptime >99.5%, FRT chat <5 min mantenido.

La semana 1 es defensa pura. El sistema se esta estresando por primera vez con trafico real.

**Dia 1 (post-launch — ya cubierto en [runbook del dia D](/content/es/operations/go-live-runbook)):**
- Todos los hands on deck: Pepe (dealing), Rocio+Marilyn (support), Susana (compliance), Edward (sales), Yulia (ops).
- Monitoring 24h de: MT5 (Stanislav), PSPs (Yulia), client portal (Alex A/B dev team), Skale CRM (Yulia), Sumsub (Susana), Intercom (Edward).
- War room en Telegram `#launch` activo 48h consecutivas.
- Regla absoluta: decision de cambiar algo = NO. Owner: Diego.

**Dias 2-3 — Primera ola de feedback:**
- **Lunes Semana 1, 09:00 UAE:** Daily sync Diego + Yulia + Pepe + Susana + Edward. 30 min. Status MT5, KYC pipeline Sumsub, primeros tickets Intercom.
- Support (Rocio+Marilyn) empieza a recibir los primeros tickets no triviales. Edward supervisa.
- Triage de cada ticket: bug real, UX confusa, falta de entendimiento producto?
- Edward carga TODOS los pain points en Notion `Work HQ NEOMAAA > Support > Pain Points Log`, sin filtrar.

**Dias 4-5 — Observacion y ajuste mental:**
- Pipeline de ventas (Skale) empieza a mostrar patrones. Edward reporta martes y jueves en el dealing sync: que objeciones se repiten, que tipo de cliente convierte, que canal trae leads calificados.
- **Pepe identifica flow toxico temprano** (clientes con scalping/arbitraje). Registra en MT5 Manager con tag `flow-review`. No se actua todavia. Revision formal viernes retro. Ver [A/B Book Policy](/content/es/executive/ab-book-policy).
- Finance Manager (o Yulia) reconcilia PSPs primera vez: fondos acreditados vs settlements reales.

**Dias 6-7 — Primera retrospectiva:**
- **Viernes Semana 1, 16:00 UAE, 90 min.** Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward + Marketing/Finance.
- Que rompio? Que funciono? (No "que mejoraria" — eso es semana 2).
- Fixes criticos deploy fin de semana: solo bugs bloqueantes, nada mas. Dev team (Alex A/B/Gleb/Dimitri) ejecuta.
- Reporte semana a Principals: KPIs, wins, problemas, decisiones pendientes → Notion.

**Red flags semana 1 — cualquiera activa reunion extraordinaria:**

| Red flag | Decision trigger NEOMAAA | Accion inmediata |
|---|---|---|
| MT5 caido >2h total acumulado | **Stanislav + Pepe + Diego** call emergencia | Review proveedor Equinix + failover |
| PSP falla >20% transacciones | **Yulia + Finance Mgr** llaman account manager PSP | Pausar ese PSP, activar backup |
| FTD rate <10% sostenido 3 dias | Trigger automatico: **meeting Diego + Angel + Edward + Marketing inmediato** (<24h) | Review funnel end-to-end |
| FTDs <40 primera semana (bajo minimo) | **Trigger: meeting Diego + Angel + Edward inmediato** | Review messaging + canales + ICP |
| >5 clientes amenazan ir a redes/regulador | **Pepe + Susana toman control** | Response plan <4h. Activar [Manual de Crisis](/content/es/operations/manual-crisis). |
| Cualquier incidente compliance | **Susana pausa actividad relacionada** | Reporte a Principals <24h. Notificacion AOFA si aplica. |

**Que NO hacer en semana 1:**
- NO lanzar nuevas campanas ads
- NO contratar gente nueva (ni acelerar procesos existentes)
- NO cambiar pricing, comisiones, spreads, producto
- NO prometer features nuevas a clientes
- NO tomar decisiones de "matar" un canal — demasiado pronto

> [!WARNING]
> La semana 1 es la mas peligrosa para decisiones emocionales. Cualquier principal (Diego, Angel, Yulia, Stanislav) que diga "esto no funciona, cambiemos X" el martes tiene que escuchar "dejalo correr hasta el viernes". Sin excepciones. Owner de enforcar esta regla: **Angel**.

### Semana 2 — Estabilizacion

**Objetivo:** arreglar fuegos criticos identificados semana 1, empezar a escalar lo que funciono.
**Target NEOMAAA semana 2:** FTDs acumulados 150-250, retention FTDs semana 1 >35%, CSAT >80%.

**Que se hace:**
- Deploy fixes criticos identificados en retro viernes. Prioriza bugs que afectan conversion/retention, no UX cosmetica. Owner: Alex A/B/Gleb/Dimitri (dev) + Stanislav (sign-off).
- Canal ads con CAC aceptable + volumen leads calificados → **escalar presupuesto 20%**. No 100%, no 50% — **20%**. Owner: Marketing Mgr.
- Canal ads no funcionando → **PAUSAR, no matar**. Se mata dia 30.
- **1:1 con top 5 clientes por volumen** — Pepe + Edward. Feedback cualitativo. 20 min c/u.
- Review funnel ventas por agent (Franco, Luis, Rocio, Marilyn escucha/sales): % leads asignados convierten a FTD, tiempo primer contacto, razones no cierre. Owner: Edward.
- Support: revisar FRT por agent, tasa escalamiento, tickets recurrentes. Owner: Edward.

**KPIs foco semana 2:**
- Retention cohorte FTD semana 1 — primera senal real product-market fit.
- CAC realista por canal con data de 2 semanas.
- Volumen tickets recurrentes: mismo ticket 5+ veces → fix producto o FAQ pendiente.

**Red flags semana 2:**

| Red flag | Decision trigger NEOMAAA |
|---|---|
| Retention cohorte semana 1 <30% | **Reunion Edward + Pepe + Susana + Marketing <48h.** Problema de producto, onboarding, o expectativas vendidas? |
| CAC blended > LTV temprano proyectado | Quemando dinero. **Marketing + Finance Mgr** pausan peores canales. Review messaging. |
| Volumen tickets creciendo dia sobre dia | Producto rompe o comunicacion mala. **Root cause analysis <48h — Edward + dev team.** |
| 10+ clientes con mismo reclamo | Bug real o feature critica falta. **Dev (Alex A/B) prioriza sobre todo.** Stanislav sign-off. |

> [!TIP]
> El 1:1 con top 5 clientes semana 2 es la fuente mas valiosa de feedback cualitativo del mes 1. 20 min por cliente, agenda fija: que funciono, que rompio, que esperabas, nos recomendarias. **Pepe + Edward hacen la call juntos** — Pepe aporta credibilidad dealing, Edward cierra feedback accionable. Notas a Notion.

### Semana 3 — Optimizacion

**Objetivo:** mover aguja en KPIs. Optimizar en serio.
**Target NEOMAAA semana 3:** FTDs acumulados 225-400, LTV:CAC proyectado >2:1, MT5 volumen diario estable.

**Que se hace:**
- A/B testing landings si hay volumen (minimo 500 visitas/variante/semana). Owner: Marketing Mgr + Alex A/B.
- Refinar ICPs basado en data real: que tipo convierte, que churnea, que genera mas volumen. Owner: Edward + Marketing.
- Review commission scheme ventas (Franco, Luis, Rocio, Marilyn): alineado con comportamiento deseado? Si premiamos solo FTD, optimiza volumen de FTD chicos. Si premiamos FTD + retention 30d, se alinea con LTV. Owner: Edward + Angel.
- Activar programa de referidos si no esta. Owner: Edward + `[DATO: Partner Manager por contratar]`. Ver [programa de partners](/content/es/partners/programa).
- Primer contenido educativo retention: guia "primeros 30 dias", webinar MT5, explicacion spreads/comisiones. Owner: Marketing Mgr.

**Decisiones criticas (retro viernes semana 3):**

<div className="neo-step-list">

**¿Que canal matamos definitivamente?** CAC >2x del mejor canal + volumen insuficiente por 3 semanas → apagar. Owner decision: Diego + Marketing.

**¿Que canal 2x en inversion?** CAC aceptable + calidad leads buena + capacidad escalar → duplicar budget mes 2. Owner: Diego + Angel.

**¿Contratamos 1 support mas o esperamos?** Tickets/cliente activo >1 sostenido → contratar. <0.5 → esperar. Owner decision: Edward + Yulia.

**¿Abrimos mercado nuevo?** Solo si mercado actual con retention >40% + FTD rate estable. Ver [escalamiento progresivo](#escalamiento-progresivo). Owner decision: Diego + Angel + Susana (compliance review del nuevo mercado).

</div>

> [!INFO]
> Semana 3 es cuando los Principals empiezan a pedir proyecciones mes 2. **Regla: no se presenta plan mes 2 hasta viernes semana 4, con data completa mes 1.** Cualquier proyeccion antes es adivinanza. Angel enforce.

### Semana 4 — Reset

**Objetivo:** primer "month in review" + plan mes 2.
**Target NEOMAAA mes 1:** **300–500 FTDs acumulados**, LTV:CAC >2:1, MT5 uptime >99.5% mensual, CSAT >80%, 0 incidentes regulatorios.

**Entregables finales mes 1:**

<div className="neo-step-list">

**1. Reporte completo de launch** — presentacion Board (20-30 slides). KPIs mensuales, funnel completo, comparacion vs plan original, unit economics reales. Owner: Finance Mgr + Angel.

**2. KPIs finales mes vs meta** — tabla clara: meta original, resultado real, % cumplimiento, explicacion gap. Owner: Finance Mgr.

**3. Decisiones tomadas y pendientes** — log completo del mes 1. Pendientes se agendan con deadline mes 2. Owner: Angel (facilita retro).

**4. Lecciones aprendidas** — bueno / malo / feo. Sin diplomacia. Owner: Diego (aporta vision dura).

**5. Plan mes 2 con OKRs actualizados** — objetivos por departamento, owner, deadline. Owner: Angel + cada Head.

**6. Presupuesto mes 2 re-asignado** — basado en CAC real + calidad leads mes 1. Owner: Finance Mgr + Marketing + Diego sign-off.

</div>

**Reunion planning mes 2:**
- **Dia:** Viernes semana 4, 10:00 UAE
- **Duracion:** 4 horas
- **Participantes:** Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward, Finance Mgr, Marketing Mgr
- **Output:** roadmap mes 2 en Notion + targets numericos + budget asignado + OKRs con owner

> [!WARNING]
> La reunion mes 2 NO es opcional y NO se acorta. Sin este cierre formal, el equipo entra al mes 2 con el plan del mes 1 que ya no aplica. Saltar este cierre garantiza que el mes 2 sea copia improvisada del mes 1. Owner enforcement: **Angel**.

---

## Decisiones criticas tempranas (triggers)

Durante el mes 1, hay triggers que NO esperan a la retro del viernes. Cuando pasan, se actua.

| Trigger | Decision inmediata NEOMAAA | Owner accion |
|---|---|---|
| FTDs <40 primera semana | Meeting urgente **Diego + Angel + Edward + Marketing <24h**. Pausar canal peor. Review messaging. | Diego convoca |
| FTD rate <10% dia 5 | Pausar ads canal peor. Review funnel. Meeting dealing + ventas + marketing. | Marketing + Edward |
| CAC >3x LTV temprano proyectado | Pausar canal. Investigar calidad leads + conversion + messaging. | Marketing + Finance |
| Tickets soporte >1.5/cliente activo | Support sobrecargado. Opciones: contratar agent, simplificar producto, mejorar FAQ/videos. | Edward convoca meeting |
| 10+ clientes mismo reclamo | Bug o feature critica falta. **Dev (Alex A/B) prioriza sobre todo.** | Stanislav sign-off |
| Regulador contacta (AOFA o cualquier otro) | **Susana toma control exclusivo.** Pausar actividades relacionadas. Principals informados <4h. | Susana → Angel → Diego |
| PSP bloquea fondos broker | Activar [Manual de Crisis](/content/es/operations/manual-crisis). Backup PSP <24h. | Yulia + Finance Mgr |
| Cliente VIP ($10k+ depositos) amenaza irse | **Pepe + Diego call personal <24h.** Retencion priority #1. | Edward escala |
| Partner/IB se queja formal | **Partner Manager** o **Edward/Diego** si no hay PM contacta <24h. | Edward / Diego |
| Contenido negativo viral Telegram/Twitter/Instagram | **Marketing + Diego + Angel** arman plan comunicacion <12h. No responder en caliente. | Marketing + Diego |
| Chargeback rate >1% semanal | **Yulia + Susana.** Review origen. Riesgo perder PSP. | Yulia |

> [!DANGER]
> Si se activan 3+ triggers en la misma semana = **crisis meeting Principals <24h** (Diego + Angel + Yulia + Stanislav). No es "mala suerte", es senal estructural. Ver [Manual de Crisis](/content/es/operations/manual-crisis) + [Financial Controls](/content/es/executive/financial-controls).

---

## Escalamiento progresivo

No se abre nada nuevo en mes 1 "porque es obvio". Cada expansion requiere criterios claros.

### Abrir nuevo mercado geografico

Condiciones (TODAS deben cumplirse):
- Mercado actual con retention >40% y FTD rate estable 2+ semanas
- Recurso language support disponible (1 agent nativo del nuevo mercado). Edward evalua.
- PSP local operativo testeado (PIX Brasil, SPEI Mexico, PSE Colombia, bancos locales Espana). Yulia confirma.
- Plan ads nuevo mercado con budget + landing localizada (ES, PT-BR, RU segun aplique). Marketing Mgr.
- **Compliance review del nuevo mercado** — Susana confirma: no esta en lista restringida (USA/Canada/EEA/UK/Australia/Cuba/Iraq/Myanmar/North Korea/Sudan), documentacion KYC adecuada a AOFA L15968/N.

### Contratar nuevo rol

- Rol actual trabajando >50h/semana sostenido 2+ semanas
- Budget disponible: LTV mes 1 soporta el costo 6+ meses. Finance Mgr valida.
- Candidato identificado, listo onboarding <2 semanas
- [Onboarding del rol](/content/es/hiring) documentado (sin doc, el hire pierde el primer mes)

### Abrir nuevo producto

- Producto actual estable: churn <10%/mes + tickets <0.5/cliente activo
- Demanda confirmada: 30+ clientes existentes preguntaron explicitamente (Edward valida con Skale)
- **Compliance (Susana) aprobo nuevo producto bajo licencia AOFA L15968/N**
- Dev team con capacidad real (no "podriamos si..."). Alex A/B/Gleb/Dimitri commit.

> [!TIP]
> Tentacion de abrir cosas nuevas en mes 1 es constante — "tenemos demanda Colombia", "deberiamos ofrecer staking cripto Fireblocks". Regla: si no cumple TODOS los criterios, se agenda mes 2 o 3. Abrir algo con producto base inestable = forma mas rapida de perder el launch.

---

## Red flags de launch fallido

Si al cierre de alguna semana se ven **TRES o mas** de estas senales, se convoca **crisis meeting Principals** (Diego + Angel + Yulia + Stanislav) y se replantea approach:

- FTD rate <10% sostenido 2 semanas consecutivas
- Retention <25% cohorte semana 1
- NPS <0 (mas detractores que promotores)
- Churn >50% al mes 1
- Cost per FTD >$500 blended
- CAC blended >$200
- Tickets soporte >2/cliente activo
- Cualquier incidente serio compliance (notificacion AOFA, queja regulatoria, AML escalation)
- Perdida financiera neta > planned burn del launch

Si se ven **CINCO o mas** → replantear launch completo. No "pivotar feature" o "cambiar messaging". Revisar approach: posicionamiento, mercado, producto, unit economics. Mejor reset honesto fin de mes 1 que arrastrar launch roto 3 meses mas.

> [!DANGER]
> Peor resultado mes 1 no es fracaso claro — es mediocre desapercibido. Fracaso claro fuerza revisar. Mediocre genera "sigamos probando" por 4 meses quemando cash. Disciplina: reconocer el mediocre y tratarlo como fracaso. Owner del veredicto: **Diego**.

---

## Retrospectiva semanal — formato estandar

**Dia:** Viernes 16:00 UAE (90 min, sin excepciones)
**Participantes:** Principals (Diego, Angel, Yulia, Stanislav) + Heads (Pepe Dealing, Susana Compliance, Edward Sales/Support, Finance Mgr, Marketing Mgr)
**Facilitador:** rota Angel / Diego

### Agenda fija (90 min)

| Bloque | Duracion | Owner |
|---|---|---|
| Review KPIs vs meta | 15 min | Finance Manager |
| What went well | 15 min | Rotativo por Head |
| What went wrong | 20 min | Rotativo por Head |
| What we'll change next week | 15 min | Facilitador (Angel/Diego) |
| Decisiones pendientes | 15 min | Principals |
| Resource asks | 10 min | Cada Head |

### Output de la retro

Inmediatamente despues:
- Doc retro en Notion `Work HQ NEOMAAA > Launch > Retros` (template fijo): resumen, decisiones, acciones con owner + deadline
- Acciones flag P0/P1/P2
- Ajustes a targets mes si aplica (documentar cambio + motivo)

> [!INFO]
> Retro viernes = unica reunion mes 1 donde ausentarse tiene costo. Principal o Head que no puede asistir manda delegado con autoridad de decidir. Retro sin quorum → re-agenda sabado.

---

## Celebracion de milestones

El launch no es solo numeros — el equipo (16 personas NEOMAAA) necesita wins visibles.

| Milestone | Celebracion |
|---|---|
| 100 FTDs acumulados | Regalo equipo (merch premium + bonus simbolico) |
| $100k volumen trading mensual | Bonus monetario al equipo (pool distribuido por Head) |
| $250k volumen mensual | Segundo bonus, mas grande |
| $1M volumen mensual | Viaje team (Dubai, Buenos Aires, destino a elegir) |
| Primer cliente VIP ($50k+ volumen mensual) | Reconocimiento publico al agent (Franco/Luis/Rocio/Marilyn) + retention bonus |

Anuncios en Telegram `#neomaaa-general`. Comunicacion externa solo cuando numeros son comodos de defender publicamente (owner: Diego + Marketing).

---

## Cierre del mes 1

Mes 1 no termina con launch "vivo". Termina con:
- Data real 30 dias completos
- Plan mes 2 documentado (OKRs, budget, hiring, expansion)
- Equipo alineado con claridad de prioridades
- Principals con vision unificada del estado

Si esas 4 condiciones se cumplen, mes 2 empieza con momentum real. Si alguna falla, mes 2 es continuacion improvisada del 1 — diferencia entre broker que escala y uno que se estanca.

La disciplina del mes 1 no es opcional. Es la base sobre la que se construye todo NEOMAAA Markets.

---

> [!INFO]
> **Documentos relacionados:**
> - [Go-Live Runbook + Checklist Maestro pre-launch](/content/es/operations/go-live-runbook) — dia D minuto a minuto + 6 bloques pre-launch
> - [Manual de Crisis](/content/es/operations/manual-crisis) — cuando triggers no son suficiente
> - [Financial Controls](/content/es/executive/financial-controls) — dashboards P&L y reconciliaciones
> - [Compliance Calendar](/content/es/compliance/compliance-calendar) — obligaciones AOFA L15968/N
> - [A/B Book Policy](/content/es/executive/ab-book-policy) — flow toxico y risk management
> - [Gestion de Tickets](/content/es/support/gestion-tickets) — SLAs soporte
> - [Programa de Partners](/content/es/partners/programa) — IBs y afiliados

*Documento interno de NEOMAAA Markets — Neomaaa Ltd L15968/N AOFA Anjouan.*
*Revision: despues de cada launch. Owner: Angel Ortega + Diego Loyola.*
