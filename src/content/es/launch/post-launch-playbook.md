# Post-Launch Playbook — Semanas 1 a 4 de operación

Las primeras cuatro semanas despues de abrir un broker son las que definen si el lanzamiento fue un exito, un experimento caro, o un desastre. Este documento toma el relevo donde terminan el [master checklist pre-launch](./checklist.md) y el [runbook del dia D](../operations/go-live-runbook.md): que hacer desde la manana del dia 2 hasta el cierre del mes 1.

No es un calendario sugerido. Es el estandar operativo interno para los primeros 30 dias de NEOMAAA Markets.

---

## Introducción

### Por que las primeras 4 semanas definen el launch

Un broker nace con inercia: la narrativa publica, la energia del equipo, los afiliados activados, la campana de ads corriendo, los primeros clientes curiosos. Esa inercia dura entre 20 y 40 dias. En ese periodo se define casi todo:

- **El CAC real** — no el estimado del pitch, el que pagan las tarjetas.
- **El retention temprano** — si los FTDs vuelven a depositar o se pierden.
- **La reputacion en la red** — 20 clientes insatisfechos publicando en Telegram hacen mas dano que seis meses de content marketing.
- **La moral del equipo** — los primeros 30 dias definen si el equipo se enchufa o se quema.
- **La confianza de los principals** — cada semana sin datos claros genera ansiedad y decisiones apuradas.

Si las cuatro semanas se operan con disciplina, el broker entra al mes 2 con un playbook operativo real, targets ajustados a la realidad, y capacidad de escalar. Si se operan en modo reactivo, el mes 2 empieza apagando fuegos del mes 1 y el equipo termina quemado antes del trimestre.

### Tres principios no negociables

<div className="neo-step-list">

**Principio 1 — Medir todo desde el dia 1.** Sin data real cada decision se toma por sensacion. Los dashboards tienen que estar corriendo y capturando KPIs desde el primer deposito. No hay "lo configuramos la semana que viene". Sin data, las decisiones son emocionales y casi siempre estan mal.

**Principio 2 — No cambiar estrategia en la primera semana.** La tentacion es enorme: un canal underperform, un agent con pipeline flojo, una landing con conversion baja. La regla es dejar correr. Una semana no es una muestra estadistica — es ruido. Cualquier cambio forzado dentro de los primeros 7 dias es emocion, no estrategia.

**Principio 3 — Revision semanal obligatoria con todos los principals.** Viernes 16:00 UAE, sin excepciones. Diego, Angel, Yulia, Stanislav, Pepe, Susana. 90 minutos. Sin esta reunion fija, el ritmo se pierde, las decisiones se postergan, y los departamentos dejan de estar alineados.

</div>

> [!WARNING]
> La tentacion mas peligrosa del launch es actuar rapido sin datos. Un ajuste de pricing en el dia 3, una campana pausada el dia 5, un rol contratado el dia 7 "porque parece que lo necesitamos" — cada una de esas decisiones sin data de respaldo puede destruir el plan entero. La disciplina es: observar, medir, decidir.

---

## KPIs que miramos

Los KPIs se dividen en tres niveles de cadencia: diarios (se revisan todos los dias del mes 1), semanales (se revisan viernes en la retrospectiva), y mensuales (se revisan en el month-in-review al cierre del mes 1).

### KPIs diarios

Todos los dias del mes 1, a las 19:00 UAE, el Finance Manager manda el daily snapshot al Telegram `#launch-principals`. Formato tabla, sin narrativa.

| KPI | Meta ideal | Meta aceptable | Red flag |
|---|---|---|---|
| Registros nuevos | 30/dia | 15/dia | <5/dia |
| KYC pass rate | >70% | >50% | <40% |
| FTD rate (de KYC aprobados) | >40% | >25% | <15% |
| FTD promedio (USD) | >$150 | >$80 | <$50 |
| Tickets/cliente activo | <0.5 | <1 | >1.5 |
| Tiempo primera respuesta ticket | <5 min | <30 min | >2h |
| NPS soporte (encuesta post-ticket) | >50 | >30 | <10 |
| MT5 uptime | 100% | >99.5% | <99% |
| PSP success rate (todos los metodos) | >90% | >80% | <70% |

> [!INFO]
> Estas metas son rangos realistas del retail broker market para un launch. Un broker con 2+ anos de operacion y marca establecida deberia apuntar mas arriba (FTD rate >50%, retention >45%). Para un launch, pasar del "aceptable" es ya un buen resultado.

### KPIs semanales

Se revisan viernes 16:00 UAE en la retrospectiva. Cada KPI se compara contra la semana anterior y contra la meta del mes.

- **CAC por canal** — SEM, paid social (Meta/TikTok), organico, IB (introducing brokers), referidos de clientes. Cada canal se trackea por separado. Sin esto, el presupuesto de ads se asigna a ciegas.
- **Conversion lead-to-FTD por canal** — cuantos leads de cada canal terminan haciendo deposito. Es el filtro real de calidad, no el volumen.
- **Retention semana 1 / semana 2** — % de FTDs que volvieron a operar o depositar dentro de los primeros 7 / 14 dias.
- **Churn rate** — clientes que cerraron cuenta o estan inactivos 14+ dias sobre el total de FTDs del periodo.
- **Volumen de trading total** — lotes operados en MT5, separado por tipo de instrumento (FX majors, minors, indices, cripto CFDs, metales).
- **Spread revenue vs comision revenue** — donde esta ganando realmente el broker. Si el mix es 95% spread / 5% comision, probablemente el producto no esta atrayendo traders de volumen (que eligen cuentas ECN con comision).
- **Cost per FTD por canal** — gasto total de ads dividido por FTDs atribuidos a ese canal.
- **LTV temprano (semanas 1-2)** — proxy: depositos totales + comisiones/spread generados por cohorte. No es el LTV real (ese toma 3-6 meses en madurar), pero sirve como senal temprana.

### KPIs mensuales

Se calculan al cierre del mes 1 y son el input del plan de mes 2.

<div className="neo-stat-grid">

**Revenue total broker** — spread + comisiones + FX markup en conversiones, neto de rebates a IBs. Es el numero que los principals miran primero.

**Gross margin** — revenue menos PSP fees, liquidity provider fees, hedging costs. Mide la eficiencia del A/B Book real.

**CAC blended** — costo total de adquisicion (ads + salarios de sales + retainers de marketing) dividido por FTDs totales del mes.

**LTV:CAC ratio** — objetivo minimo 3:1. Si al cierre del mes 1 esta en 1.5:1 o peor, el problema es estructural.

**Concentracion top 10** — % del revenue generado por los 10 clientes mas grandes. Si es >50%, el broker tiene riesgo de concentracion.

**Regulatory incidents** — idealmente 0. Uno solo ya es tema de principals.

</div>

> [!DANGER]
> LTV:CAC <1:1 sostenido por 4 semanas significa que cada cliente nuevo hace perder dinero al broker. Si llegamos al cierre de mes 1 con ese ratio, NO se escalan ads — se pausa y se rearma la strategy antes de quemar cash del funding.

---

## Dashboard de Principals

### Que se ve en la reunion del lunes 9:00 UAE

Durante el mes 1, ademas de la retro de los viernes, hay un stand-up corto los lunes 9:00 UAE de 45 minutos. No reemplaza la retro: es para arrancar la semana con el mismo mapa.

<div className="neo-step-list">

**1. Numeros de la semana** (10 min) — tabla resumen con los 10 KPIs diarios promediados, vs la semana anterior. Owner: Finance Manager.

**2. Top 3 wins + Top 3 problemas** (10 min) — los heads traen lo bueno y lo malo concreto. No narrativa, hechos: "cerramos 12 FTDs de Brasil via PIX" vs "el PSP de tarjetas rechazo 38% de los intentos el jueves".

**3. Decisiones pendientes** (10 min) — cosas que necesitan voto de principals: aprobar nuevo PSP, autorizar hiring, ajustar comisiones, aprobar bonus. Cada item se decide o se agenda con deadline.

**4. Recurso pedido por departamento** (10 min) — dinero, gente, tiempo. Cada Head dice que necesita para no trabarse la semana siguiente.

**5. Revision de OKRs del mes** (5 min) — donde estamos vs los objetivos del mes 1. Si algun OKR esta en rojo, se flaggea para la retro del viernes.

</div>

### Herramientas recomendadas

**Mes 1:** Notion dashboard + Google Sheets agregado manual. No vale la pena montar Mixpanel/Amplitude en la primera semana — la data es poca y cambiante. Una spreadsheet actualizada a mano por el Finance Manager es suficiente.

**Mes 2+:** migrar a Mixpanel o Amplitude cuando el volumen justifique la complejidad. Antes de eso, el setup te consume mas tiempo del que te ahorra.

> [!TIP]
> El dashboard del mes 1 tiene que ser feo y funcional. Nadie se impresiona con un Notion bonito — los principals quieren ver los numeros en 30 segundos. Una tabla en Sheets compartida por Slack/Telegram a las 19:00 es mejor que un dashboard fancy que se actualiza cada 3 dias.

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

La semana 1 es defensa pura. El sistema se esta estresando por primera vez con trafico real, y lo que se rompe se rompe. Intentar optimizar en esta semana es pelearse con el fuego mientras se construye la casa.

**Dia 1 (post-launch — ya cubierto en el [runbook del dia D](../operations/go-live-runbook.md)):**
- Todos los hands on deck: ventas, soporte, dealing, compliance.
- Monitoring 24h de MT5, PSPs, client portal, Skale CRM.
- War room en Telegram `#launch` activo 48h consecutivas.
- Regla absoluta: decision de cambiar algo = NO.

**Dias 2-3 — Primera ola de feedback:**
- Support empieza a recibir los primeros tickets no triviales (los del dia 1 suelen ser preguntas obvias).
- Triage de cada ticket: ¿es bug real? ¿es UX confusa? ¿es falta de entendimiento del producto?
- El Head of Support carga TODOS los pain points en un doc compartido (Notion o Google Doc), sin filtrar. La disciplina de capturar todo aca es la que permite tomar decisiones informadas la semana 2.

**Dias 4-5 — Observacion y ajuste mental:**
- El pipeline de ventas deberia empezar a mostrar patrones: que objeciones se repiten, que tipo de cliente convierte mejor, que canal trae leads mas calificados.
- Dealing identifica si hay flow toxico temprano (clientes con patrones de scalping/arbitraje). No se actua todavia, solo se registra.
- Finance Manager empieza a reconciliar PSPs por primera vez: fondos acreditados vs settlements reales.

**Dias 6-7 — Primera retrospectiva:**
- Viernes 16:00 UAE, 90 minutos, todos los principals + heads.
- Que rompio? Que funciono? (No "que mejoraria" — eso es semana 2).
- Fixes criticos para deploy del fin de semana: solo bugs bloqueantes, nada mas.
- Reporte de la semana a principals en formato fijo: KPIs, wins, problemas, decisiones pendientes.

**Red flags semana 1 — cualquiera de estos activa reunion extraordinaria:**

| Red flag | Accion |
|---|---|
| MT5 caido >2h total acumulado | Dealing + tech call de emergencia. Review del proveedor de hosting. |
| PSP falla >20% de transacciones | Pausar ese PSP, activar backup, contactar account manager del PSP. |
| FTD rate <10% sostenido 3 dias | Ventas + marketing call. Review del funnel end-to-end. |
| >5 clientes amenazan ir a redes o regulador | Pepe + Susana toman control. Response plan en <4h. |
| Cualquier incidente de compliance | Susana pausa actividad relacionada. Reporte al board en <24h. |

**Que NO hacer en la semana 1:**
- NO lanzar nuevas campanas de ads.
- NO contratar gente nueva (ni acelerar procesos existentes).
- NO cambiar pricing, comisiones, spreads, ni estructura del producto.
- NO prometer features nuevas a clientes.
- NO tomar decisiones de "matar" un canal — es demasiado pronto.

> [!WARNING]
> La semana 1 es la mas peligrosa para decisiones emocionales. Cualquier principal que diga "esto no esta funcionando, cambiemos X" el martes tiene que escuchar "dejalo correr hasta el viernes". Sin excepciones.

### Semana 2 — Estabilizacion

**Objetivo:** arreglar los fuegos criticos identificados en la semana 1, empezar a escalar lo que funciono.

Ahora si se puede tocar. La semana 1 dio data suficiente para identificar que esta roto y que esta funcionando. La semana 2 es para consolidar.

**Que se hace:**
- Deploy de fixes criticos identificados en la retro del viernes. Priorizar bugs que afecten conversion o retention, no UX cosmetica.
- Si un canal de ads mostro CAC aceptable y volumen de leads calificados → escalar presupuesto 20%. No 100%, no 50% — 20%. Probar con pasos cortos.
- Si un canal de ads no esta funcionando → PAUSAR, no matar. Se mata al dia 30 si sigue mal.
- Primera reunion 1:1 con el top 5 de clientes por volumen (Pepe + Head of Sales). Feedback cualitativo: que funciono del onboarding, que les rompio, que esperaban y no tuvieron.
- Review del funnel de ventas por agent: que % de leads asignados convierten a FTD, tiempo medio de primer contacto, razones de no cierre.
- Support: revisar tiempo de respuesta por agent, tasa de escalamiento, y tickets recurrentes.

**KPIs foco de la semana 2:**
- Retention de la cohorte FTD de la semana 1. Esta es la primera senal real de product-market fit: ¿los primeros clientes volvieron a operar o a depositar?
- CAC realista por canal, calculado con data de 2 semanas.
- Volumen de tickets repetitivos: si el mismo ticket aparece 5+ veces, hay un fix de producto o de FAQ pendiente.

**Red flags semana 2:**

| Red flag | Decision |
|---|---|
| Retention cohorte semana 1 <30% | Mayoria de FTDs no vuelven. Reunion ventas + dealing + support: es problema de producto, de onboarding, o de expectativas vendidas? |
| CAC blended > LTV temprano proyectado | Quemando dinero. Pausar canales de peor performance. Revisar messaging. |
| Volumen de tickets creciendo dia sobre dia | Producto rompiendo o comunicacion mala. Root cause analysis en <48h. |
| 10+ clientes con el mismo reclamo | Bug real o falta de feature critica. Dev prioriza sobre cualquier otra cosa. |

> [!TIP]
> El 1:1 con los top 5 clientes de la semana 2 es la fuente de feedback cualitativo mas valiosa del mes 1. 20 minutos por cliente, agenda fija: que funciono, que rompio, que esperabas, nos recomendarias. El Head of Sales toma notas y las sube al doc de feedback.

### Semana 3 — Optimizacion

**Objetivo:** mover la aguja en los KPIs. Empezar a optimizar en serio.

Con 2 semanas de data real, la semana 3 es para hacer cambios informados.

**Que se hace:**
- A/B testing de landings si hay volumen suficiente (minimo 500 visitas/variante/semana para resultados confiables).
- Refinar los ICPs (Ideal Customer Profiles) basado en data real: que tipo de cliente convierte, que tipo churnea, que tipo genera mas volumen.
- Revisar el commission scheme de ventas: estan alineadas con el comportamiento deseado? (Ejemplo: si premiamos solo FTD, ventas optimiza por volumen de FTD chicos. Si premiamos FTD + retention a 30 dias, el incentivo se alinea con el LTV real).
- Iniciar programa de referidos si no esta activo ya. El mes 2 va a depender en parte del boca a boca generado aca.
- Publicar el primer contenido educativo para retention: guia de "primeros 30 dias operando", webinar de MT5, explicacion de spreads/comisiones.

**Decisiones criticas de esta semana (se toman en la retro del viernes de semana 3):**

<div className="neo-step-list">

**¿Que canal matamos definitivamente?** Si despues de 3 semanas un canal tiene CAC >2x del mejor canal y volumen insuficiente para testear, se apaga.

**¿Que canal 2x en inversion?** Si un canal tiene CAC aceptable, calidad de leads buena, y capacidad de escalar — se duplica presupuesto para el mes 2.

**¿Contratamos 1 support mas o esperamos?** Si tickets/cliente activo >1 sostenido, se contrata. Si <0.5, se espera al mes 2.

**¿Abrimos un mercado mas?** Solo si el mercado actual tiene retention >40% + FTD rate estable. Ver criterios de [escalamiento progresivo](#escalamiento-progresivo).

</div>

> [!INFO]
> Semana 3 es la semana donde los principals empiezan a pedir proyecciones para el mes 2. La regla es: no se presenta plan de mes 2 hasta el viernes de semana 4, con data completa del mes 1. Cualquier proyeccion antes es adivinanza.

### Semana 4 — Reset

**Objetivo:** hacer el primer "month in review" y definir el plan del mes 2.

La semana 4 tiene una semana normal de operacion + el cierre formal del launch. El viernes de semana 4 es el dia mas importante del mes.

**Entregables finales del mes 1:**

<div className="neo-step-list">

**1. Reporte completo de launch** — formato presentacion para board (20-30 slides). KPIs mensuales finales, funnel completo, comparacion vs plan original, unit economics reales.

**2. KPIs finales mes vs meta** — tabla clara de cada KPI mensual, meta original, resultado real, % de cumplimiento, explicacion del gap.

**3. Decisiones tomadas y pendientes** — log de todas las decisiones de principals del mes 1. Lo que quedo pendiente se agenda con deadline al mes 2.

**4. Lecciones aprendidas** — bueno / malo / feo. Sin diplomacia, sin suavizar. Si el canal X fue un fracaso, se dice; si el equipo de support no alcanzo el SLA, se dice.

**5. Plan mes 2 con OKRs actualizados** — objetivos mensuales, por departamento, con owner y deadline.

**6. Presupuesto mes 2 re-asignado por canal** — basado en CAC real y calidad de leads del mes 1, no en el plan original.

</div>

**Reunion de planning mes 2:**
- Dia: viernes de semana 4, 10:00 UAE.
- Duracion: 4 horas.
- Participantes: Diego, Angel, Yulia, Stanislav + todos los Heads (Dealing, Sales, Support, Marketing, Compliance, Finance).
- Output: roadmap mes 2 documentado + targets numericos + budget asignado.

> [!WARNING]
> La reunion de mes 2 NO es opcional y NO se acorta. Sin este cierre formal, el equipo entra al mes 2 operando con el plan del mes 1, que ya no aplica porque la data lo contradice. Saltarse este cierre garantiza que el mes 2 sea una copia improvisada del mes 1.

---

## Decisiones criticas tempranas (triggers)

Durante el mes 1, hay triggers que NO esperan a la retro del viernes. Cuando pasan, se actua.

| Trigger | Decision inmediata |
|---|---|
| FTD rate <10% dia 5 | Pausar ads del canal de peor performance. Reunion urgente: dealing + ventas + marketing. Review de messaging. |
| CAC >3x LTV temprano proyectado | Pausar ese canal. Investigar: calidad de leads, conversion del funnel, messaging. |
| Tickets de soporte >1.5/cliente activo | Support sobrecargado. Opciones: contratar agent extra, simplificar producto, mejorar self-service (FAQ, videos). |
| 10+ clientes con el mismo reclamo concreto | Bug real o falta de feature critica. Dev prioriza sobre cualquier otra cosa en curso. |
| Regulador contacta por cualquier motivo | Susana toma control exclusivo. Pausar actividades relacionadas con el tema. Principals informados en <4h. |
| PSP bloquea fondos del broker | Activar [manual de crisis](../operations/manual-crisis.md). Backup PSP en marcha en <24h. Finance Manager coordina. |
| Cliente VIP ($10k+ en depositos) amenaza irse | Pepe + Diego hacen call personal en <24h. Retencion priority #1. |
| Partner/IB se queja formalmente | Partner Manager (o Diego si no hay Partner Manager aun) contacta en <24h. |
| Contenido negativo viral en Telegram/Twitter/Instagram | Marketing Manager + Diego arman plan de comunicacion en <12h. No se responde en caliente. |
| Chargeback rate >1% semanal | Finance + Compliance. Review de origen de los chargebacks. Riesgo de perder el PSP. |

> [!DANGER]
> Si se activan 3+ triggers en la misma semana = crisis meeting de principals en <24h. No es "mala suerte", es senal de que el sistema tiene un problema estructural.

---

## Escalamiento progresivo

No se abre nada nuevo en el mes 1 "porque es obvio". Cada expansion requiere que se cumplan criterios claros.

### Abrir nuevo mercado geografico

Todas estas condiciones deben cumplirse:
- Mercado actual con retention >40% y FTD rate estable por 2+ semanas consecutivas.
- Recurso disponible para language support (al menos 1 support agent nativo del nuevo mercado).
- PSP local operativo y testeado para el nuevo mercado (PIX para Brasil, SPEI para Mexico, PSE para Colombia, etc.).
- Plan de ads del nuevo mercado definido con presupuesto especifico y landing localizada.
- Compliance review del nuevo mercado: restricciones regulatorias, prohibiciones, documentacion KYC especifica.

### Contratar nuevo rol

- El rol actual trabajando >50h/semana de forma sostenida por 2+ semanas.
- Budget disponible: LTV acumulado del mes 1 soporta el costo del nuevo rol al menos 6 meses.
- Candidato ya identificado y listo para onboarding en <2 semanas.
- El [onboarding del rol](../hiring/) documentado (sin documentacion, el nuevo hire pierde el primer mes).

### Abrir nuevo producto

- Producto actual estable: churn <10%/mes y tickets <0.5/cliente activo.
- Demanda real confirmada: 30+ clientes existentes preguntaron explicitamente.
- Compliance aprobo el nuevo producto bajo la licencia actual (Anjouan L15968/N).
- Dev team con capacidad real (no "podriamos hacerlo si...").

> [!TIP]
> La tentacion de abrir cosas nuevas en el mes 1 es constante — "tenemos demanda de Colombia", "deberiamos ofrecer staking de cripto". La regla: si no cumple TODOS los criterios de arriba, se agenda para mes 2 o mes 3. Abrir algo nuevo con el producto base inestable es la forma mas rapida de perder el launch.

---

## Red flags de launch fallido

Si al cierre de alguna semana se ven TRES o mas de estas senales, se convoca crisis meeting de principals y se replantea seriamente el approach:

- FTD rate <10% sostenido 2 semanas consecutivas.
- Retention <25% de la cohorte de la semana 1.
- NPS <0 (mas detractores que promotores).
- Churn >50% al mes 1.
- Cost per FTD >$500 blended.
- CAC blended >$200.
- Tickets de soporte >2/cliente activo.
- Cualquier incidente serio de compliance.
- Perdida financiera neta >planned burn del launch.

Si se ven **CINCO o mas** → replantear el launch completo. No es "pivotar feature" o "cambiar messaging". Es revisar el approach: posicionamiento, mercado, producto, unit economics. Es mejor hacer un reset honesto al final del mes 1 que arrastrar un launch roto tres meses mas.

> [!DANGER]
> El peor resultado posible del mes 1 no es un fracaso claro — es un mediocre que pase desapercibido. Un fracaso claro fuerza a revisar. Un mediocre genera "sigamos probando" por 4 meses quemando cash. La disciplina es reconocer el mediocre y tratarlo como fracaso.

---

## Retrospectiva semanal — formato estandar

**Dia:** Viernes 16:00 UAE (1.5h, sin excepciones).
**Participantes:** Principals (Diego, Angel, Yulia, Stanislav) + Heads (Dealing, Sales, Support, Marketing, Compliance, Finance).
**Facilitador:** rota entre Angel y Diego.

### Agenda fija (90 min)

| Bloque | Duracion | Owner |
|---|---|---|
| Review de KPIs vs meta | 15 min | Finance Manager |
| What went well | 15 min | Rotativo por Head |
| What went wrong | 20 min | Rotativo por Head |
| What we'll change next week | 15 min | Facilitador |
| Decisiones pendientes | 15 min | Principals |
| Resource asks | 10 min | Cada Head |

### Output de la retro

Inmediatamente despues de la reunion:
- Doc de la retro compartido en Notion (template fijo): resumen, decisiones tomadas, acciones con owner + deadline.
- Acciones flaggeadas con prioridad P0/P1/P2.
- Ajustes a targets del mes si aplica (se documenta el cambio y el motivo).

> [!INFO]
> La retro del viernes es la unica reunion del mes 1 donde ausentarse tiene costo. Si un principal o Head no puede asistir, manda delegado con autoridad de decidir. Una retro sin quorum se re-agenda el sabado.

---

## Celebracion de milestones

El launch no es solo numeros — el equipo necesita wins visibles. Hitos y celebraciones pre-definidas:

| Milestone | Celebracion |
|---|---|
| 100 FTDs acumulados | Regalo al equipo (merchandising premium + bonus simbolico). |
| $100k en volumen de trading en un mes | Bonus monetario al equipo (pool distribuido por Head). |
| $250k en volumen de trading en un mes | Segundo bonus, mas grande. |
| $1M en volumen de trading en un mes | Viaje de team (Dubai, Buenos Aires, o destino a elegir por el equipo). |
| Primer cliente VIP ($50k+ en volumen mensual) | Reconocimiento publico al agent + retention bonus. |

Los milestones se anuncian por Telegram `#neomaaa-general` y se comunican externamente solo cuando los numeros son comodos de defender publicamente.

---

## Cierre del mes 1

El mes 1 no termina con el launch "vivo". Termina con:
- Data real de 30 dias completos.
- Plan de mes 2 documentado con OKRs, budget, hiring, y expansion definidos.
- Equipo alineado y con claridad de prioridades.
- Principals con vision unificada del estado del broker.

Si esas cuatro condiciones se cumplen, el mes 2 empieza con momentum real. Si alguna no se cumple, el mes 2 es una continuacion improvisada del mes 1 — y eso es la diferencia entre un broker que escala y uno que se estanca.

La disciplina del mes 1 no es opcional. Es la base sobre la que se construye todo.
