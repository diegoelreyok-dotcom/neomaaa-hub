# Manual de Crisis — Respuesta a incidentes operativos

**Version:** 1.0
**Fecha:** Abril 2026
**Audiencia:** Todo el equipo NEOMAAA Markets (con roles claros segun tipo de crisis)
**Proposito:** Protocolo de respuesta estandar cuando algo se rompe. No improvisar. No esconder.

---

## Tabla de Contenidos

1. [Introduccion — por que este doc existe](#1-introduccion)
2. [Principios rectores en crisis](#2-principios-rectores)
3. [Cadena de mando por tipo de crisis](#3-cadena-de-mando)
4. [Herramientas esenciales](#4-herramientas-esenciales)
5. [Escenario 1 — MT5 caido](#5-escenario-1--mt5-caido)
6. [Escenario 2 — PSP bloquea fondos](#6-escenario-2--psp-bloquea-fondos)
7. [Escenario 3 — Ataque phishing / cuentas hackeadas](#7-escenario-3--ataque-phishing)
8. [Escenario 4 — Feed corrupto / precios absurdos](#8-escenario-4--feed-corrupto)
9. [Escenario 5 — Cliente VIP enojado](#9-escenario-5--cliente-vip-enojado)
10. [Escenario 6 — Noticia negativa / reseña viral](#10-escenario-6--noticia-negativa)
11. [Escenario 7 — Notificacion regulatoria (AOFA)](#11-escenario-7--notificacion-regulatoria)
12. [Escenario 8 — Filtracion interna / empleado toxico](#12-escenario-8--filtracion-interna)
13. [Template de post-mortem](#13-template-de-post-mortem)
14. [Checklist de preparacion pre-crisis](#14-checklist-de-preparacion)
15. [Anti-patterns — que NO hacer nunca](#15-anti-patterns)
16. [Anexos — contactos y templates](#16-anexos)

---

## 1. Introduccion

En un broker retail de forex / CFDs, las crisis no son eventos raros — son parte del negocio. MT5 se cae. El PSP principal congela la cuenta merchant. Una noticia negativa se vuelve viral en TikTok. Un cliente VIP pierde $80k y amenaza con demandarnos. Un empleado se va enojado y filtra datos internos.

Hoy, si pasa algo de esto, se improvisa. Cada crisis nueva se resuelve de cero, el equipo no sabe quien decide, la comunicacion publica sale tarde o mal, y el dano a la reputacion es mayor al necesario.

Este documento existe para cambiar eso.

El objetivo no es prevenir crisis (imposible), es **responder bien cuando pasan**. Brokers que sobrevivieron 20 anos no son los que evitaron crisis — son los que las manejaron con protocolo claro.

> [!INFO]
> Este manual se alimenta de casos reales de la industria (FTX, Alpari UK post-CHF, Plus500 suspensiones FCA, eToro outages, IC Markets chargebacks masivos, firmas prop que colapsaron en 2024). No reinventamos la rueda: copiamos lo que funciono y evitamos lo que fallo.

### Audiencia

Este documento lo lee cualquier empleado de NEOMAAA Markets. Cualquiera puede detectar una crisis primero — soporte que ve quejas iguales de 50 clientes en 10 minutos, sales que recibe un screenshot raro, dealing que ve un spread imposible. La persona que detecta NO necesita saber como resolver la crisis. Necesita saber **como escalarla correctamente**.

---

## 2. Principios rectores

Cuatro principios gobiernan toda respuesta a crisis en NEOMAAA. No son negociables.

### Principio 1 — Transparencia interna absoluta

NUNCA ocultar una crisis al equipo. No hay "la parte que no conviene que sepan". En el momento que se detecta algo serio, entra al canal `#crisis-neomaaa` en Telegram y el equipo relevante se entera.

Razones:
- Esconder info retrasa soluciones (la persona que puede arreglarlo no se entera)
- El equipo se entera igual pero por canales informales (rumores, chisme)
- Si hay investigacion posterior, el "se quiso tapar" multiplica el dano legal

Transparencia interna no significa comunicacion externa inmediata. Primero se contiene, despues se comunica publico. Pero internamente, dia 1, hora 1.

### Principio 2 — Un lider decide, el resto ejecuta

En crisis no hay democracia. Se asigna un **Incident Commander (IC)** segun el tipo de crisis (tabla abajo), y durante la ventana de crisis esa persona tiene autoridad de decision total sobre ese incidente.

El IC puede delegar, consultar, pedir opinion. Pero la decision final es suya. Y el equipo ejecuta sin debate mientras dura la crisis.

Post-mortem es el momento de cuestionar decisiones. Durante la crisis, no.

### Principio 3 — Frenar primero, investigar despues, comunicar publico ultimo

Orden estricto:

<div className="neo-timeline">

1. **Contener la hemorragia** — lo que sea que este pasando, pararlo o limitarlo. Si MT5 gritea precios locos, parar trading. Si PSP hace chargeback masivo, cambiar PSP. Si un hacker esta entrando, cortar accesos.
2. **Investigar causa raiz** — con la hemorragia frenada, entender que paso. Logs, timeline, evidencia.
3. **Decidir accion correctiva** — con causa clara, decidir que cambia. Rollback, patch, policy nueva, compensacion a clientes.
4. **Comunicar publico** — SOLO cuando hay mensaje claro y accion concreta. Comunicar antes solo genera mas panico.

</div>

El error clasico es invertir este orden: "tenemos que salir a comunicar ya". No. Primero contener. Un silencio de 30 minutos mientras se contiene es aceptable. Un comunicado confuso sin plan de accion es catastrofico.

### Principio 4 — Documentar todo desde minuto 1

Apenas arranca una crisis, se abre un **documento compartido timestamped** (Google Doc o Notion) con:

- Hora exacta de cada evento
- Quien detecto, quien decidio, quien ejecuto
- Que se probo y que resultado dio
- Comunicaciones enviadas (internas y externas)
- Cambios en sistemas

Este log sirve para:
- Post-mortem (reconstruir que paso)
- Comunicacion regulatoria (AOFA puede pedir timeline)
- Defensa legal si hay demanda
- Aprendizaje para futuras crisis

> [!WARNING]
> Si no esta documentado, no paso. En crisis regulatorias o legales, la falta de documentacion se interpreta en contra del broker. Documentar mientras pasa es mas facil que reconstruir despues.

---

## 3. Cadena de mando

Cada tipo de crisis tiene roles definidos. El **Incident Commander (IC)** decide. El **Operational Lead** ejecuta la parte tecnica/operativa. **Communications** maneja el mensaje interno y externo.

| Tipo de crisis | Incident Commander | Operational Lead | Communications |
|---|---|---|---|
| Tecnica (MT5, portal, CRM) | Dev Lead (Alex A / Gleb) | Dev team | Diego + Yulia |
| Financiera (PSP, fondos) | Finance Manager (o Diego si no hay) | Pepe + Susana | Diego |
| Regulatoria (AOFA, sancion) | Susana | Diego | Diego (publico) + Susana (regulador) |
| Reputacional (prensa, redes) | Diego | Marketing Manager | Diego + Marketing |
| Cliente VIP enojado | Pepe o Head of Sales (Edward) | Support Lead | Pepe |
| Seguridad (hack, phishing) | Diego | Dev Lead + Gleb | Diego + Legal externo |
| Filtracion interna | Diego | Dev Lead (accesos) + Legal | Diego |
| Feed / precios corruptos | Pepe (Dealing) + Dev Lead | Dev team + Liquidity provider | Diego |

### Procedimiento general (aplica a todas las crisis)

<div className="neo-timeline">

1. **Deteccion (T+0)** — Quien sea que detecta algo anormal postea en Telegram `#crisis-neomaaa` con: que vio, cuando, evidencia (screenshot / log). NO necesita diagnostico, solo reportar.
2. **Reconocimiento (T+5 min)** — Al menos un principal (Diego / Yulia / Stanislav) confirma recepcion del mensaje. Si nadie responde en 5 min, escalar por WhatsApp directo al IC del tipo de crisis.
3. **Asuncion de IC (T+10 min)** — El Incident Commander correspondiente asume formalmente: escribe en el canal "IC asumido por [nombre]" y toma control.
4. **War room abierto (T+15 min)** — El IC abre voice de Telegram + documento compartido. Invita a operativos criticos. Todo lo demas (meetings, tareas) se pausa.
5. **Contencion (T+15 a T+60 min)** — Objetivo unico: parar la hemorragia. Nada de comunicacion publica todavia.
6. **Comunicacion interna (T+30 min)** — Update al equipo completo via canal general: "Estamos trabajando en [X]. Mas info en [horario]". Sin detalles operativos.
7. **Comunicacion externa (cuando hay plan)** — Status message en Intercom + redes + email base. SIEMPRE aprobado por IC + Diego antes de publicar.
8. **Resolucion + comunicado final** — Cuando se cerro la crisis: update publico, compensacion si aplica, agradecimiento al equipo.
9. **Post-mortem (48h despues)** — Sesion de 1h minimo con el template del seccion 13.

</div>

> [!DANGER]
> Comunicacion externa SIEMPRE pasa por IC + Diego antes de publicarse. Un tweet impulsivo de soporte, un mensaje de Intercom sin aprobar, un comentario en Instagram respondiendo enojado — cualquiera de esos puede costar 6 meses de trabajo de brand. Regla simple: **si no lo aprobo Diego o el IC, no sale**.

---

## 4. Herramientas esenciales

Lo que tiene que estar listo ANTES de que pase algo:

### Canal Telegram `#crisis-neomaaa`

- Todos los principals: Diego, Yulia, Stanislav, Pepe, Susana, Edward
- Dev leads: Alex A, Gleb
- Leads operativos: Head of Support, Head of Sales, Marketing Manager, Finance Manager
- **Notificaciones prendidas 24/7 para todos los miembros.** Este es el unico canal donde el silencio no es opcion.
- Solo se usa para crisis. No chat casual, no broadcasts generales.

### Documento compartido en tiempo real

- Google Doc con template pre-armado: Timeline / Status actual / Decisiones / Comunicaciones / Accion items
- Link permanente guardado en el pin del canal Telegram
- Editable por todos los principals
- Cada entrada con timestamp (UTC + hora local Dubai)

### Intercom status banner

- Template pre-aprobado con 3 variantes: "investigando" / "identificado" / "resuelto"
- Se activa en 30 segundos desde el admin panel
- Multi-idioma (ES/EN/RU)

### Templates de comunicacion pre-aprobados

Carpeta `/comunicacion-crisis/` con borradores para:
- Email masivo a base (3 variantes: tecnica, financiera, generica)
- Post para Instagram / X / Facebook
- Mensaje de Intercom a cliente individual afectado
- Respuesta a prensa (si contactan)
- Notificacion a AOFA (si aplica)

### Monitoring y alertas automaticas

- Uptime monitoring de MT5, portal, CRM (Pingdom / UptimeRobot)
- Alerta en Slack / Telegram cuando un servicio se cae > 2 minutos
- Dashboard de PSPs con success rate real-time
- Social listening (Mention.com o similar) para detectar viralidad negativa

> [!TIP]
> La mayoria de crisis se detectan 30-60 min antes por el equipo de soporte o dealing (los clientes reportan primero). El dashboard ayuda a confirmar, pero el **oido del equipo operativo** es la alerta mas rapida. Entrenar a soporte a escalar cuando ven patrones raros, no esperar instrucciones.

---

## 5. Escenario 1 — MT5 caido

**Sintomas:**
- Clientes reportan que no pueden loguearse
- Ordenes no ejecutan, o ejecutan con delay anormal
- Ping al servidor MT5 no responde
- Feed de precios congelado o desfasado
- Soporte recibe 10+ tickets identicos en minutos

**Incident Commander:** Dev Lead (Alex A o Gleb, segun quien este disponible primero).

### Accion inmediata (0-15 min)

<div className="neo-timeline">

1. **Verificar estado real** — ping al servidor MT5, acceso al Manager Terminal, chequeo de procesos. Confirmar que es caida real y no percepcion.
2. **Determinar scope** — es el servidor principal? backup tambien caido? un tipo de cuenta especifico? solo login o tambien ejecucion?
3. **Status message publico inmediato** — Intercom: "Estamos investigando un problema con la plataforma MT5. Actualizaremos en 30 minutos." Sin causa, sin timing.
4. **Centralizar soporte** — canal de soporte pausa respuestas individuales, usa respuesta unica preaprobada. Evitar que 5 agents den 5 versiones distintas.
5. **Escalar al provider MT5** — abrir ticket urgente con MetaQuotes / el hosting provider (Equinix / Finotec / whoever corresponda). Llamar, no solo email.
6. **Decidir si parar registros nuevos** — si MT5 esta caido, los nuevos registros se traban. Mejor pausar el formulario web que generar 200 cuentas zombie.

</div>

### Accion continua (15-60 min)

1. Identificar causa raiz: es provider side (ellos), nuestro side (nosotros), o tercero (DDoS, conectividad ISP)?
2. Si es provider side:
   - Escalar a su nivel L2/L3
   - Confirmar ETA de resolucion
   - Comunicar al cliente con ETA **solo si el provider lo confirmo por escrito** — nunca reportar timing en base a promesas verbales
3. Si es nuestro side:
   - Rollback del ultimo cambio desplegado (si hubo deploy reciente)
   - Escalar a Stanislav / Dev Lead senior
   - Restart controlado, nunca "a ver si con esto anda"
4. Si es DDoS o conectividad:
   - Activar Cloudflare / proteccion DDoS si aplica
   - Contactar ISP
   - Ponerse en contacto con proveedores de hosting para failover

### Accion post-incidente (primeras 48h)

1. **Comunicado publico con timeline real** — email a toda la base afectada: que paso, cuando, como se resolvio, que hacemos para que no vuelva a pasar. Tono: profesional, factual, zero excusas.
2. **Identificar clientes afectados financieramente** — ordenes trabadas, stop-loss no ejecutados, etc.
3. **Compensacion caso por caso:**
   - Stop-loss no ejecutado que causo perdida medible → reembolso o credito
   - Posicion abierta que no se pudo cerrar → revision por dealing (Pepe), ajuste manual si corresponde
   - Perdida de oportunidad (no pudo abrir trade) → generalmente NO se compensa (imposible probar)
4. **Post-mortem en 48h** — usar template seccion 13.
5. **Update del runbook tecnico** — lecciones aprendidas, nuevos procedimientos.

### Que NO hacer

> [!DANGER]
> - NO minimizar publicamente ("es algo menor, ya esta resuelto") si no lo esta. Los clientes ven la realidad, el gap genera desconfianza permanente.
> - NO echar culpa publica al provider sin evidencia documentada. Legal risk.
> - NO dejar que agents de soporte improvisen mensajes. Canal unico, mensaje unico.
> - NO prometer ETA de resolucion hasta tenerla confirmada por quien va a ejecutar la resolucion.
> - NO hacer deploy de fixes nuevos en plena crisis sin testing en staging. "Apagar un fuego con nafta".

---

## 6. Escenario 2 — PSP bloquea fondos

**Sintomas:**
- Account manager del PSP (Checkout, Stripe, PagSmile, etc.) notifica hold, freeze, suspension
- Depositos rechazados en masa (success rate cae >50%)
- Retiros al PSP devueltos
- Email del PSP solicitando "documentacion adicional urgente"
- En peor caso: cuenta merchant congelada sin previo aviso

**Incident Commander:** Finance Manager. Si el rol no esta contratado todavia: Diego directo.

### Causas tipicas

<div className="neo-stat-grid">

**Chargeback rate supero threshold** — card networks (Visa/MC) castigan si chargebacks > 1% del volumen. Hold preventivo del PSP mientras investigan.

**Volumen cambio bruscamente** — si pasas de $50k/mes a $500k/mes en 2 semanas, PSP asume fraude o lavado y holdea para revisar.

**KYC del PSP disputa info** — el PSP pide docs actualizados (licencia AOFA, beneficial owners, proof of office). No responder rapido = hold.

**Cliente final disputo con su banco** — chargebacks acumulados de 10+ clientes en pocos dias dispara alarma automatica.

**Regulatorio** — PSP recibio notificacion de autoridad sobre NEOMAAA (aunque sea investigacion preliminar).

**Sector prohibido / re-classificacion** — algunos PSPs cambian politica y dejan de aceptar brokers forex. Hold es paso previo a terminacion.

</div>

### Accion inmediata (0-30 min)

<div className="neo-timeline">

1. **Contactar account manager del PSP en minutos.** WhatsApp, llamada, email — lo que sea que responda mas rapido. No esperar que contesten ticket standard.
2. **Pedir razon especifica por escrito.** "Hold de compliance review" no sirve. Necesitas: que clausula, que evidencia, que requieren, cuanto dura.
3. **Estimar impacto financiero:**
   - Cuantos depositos afectados (volumen $ + cantidad)
   - Cuantos retiros en cola
   - Dias de rolling reserve si se extiende
   - Clientes afectados individualmente
4. **Activar PSP backup.** NEOMAAA debe tener siempre minimo 2 PSPs por categoria (card / crypto / bank / local). Reroute inmediato.
5. **Pausar campanas de marketing** que dirijan a ese metodo de pago especifico.
6. **Comunicar proactivamente a clientes afectados** — email o Intercom con: "detectamos un problema con [metodo]. Temporalmente usa [alternativa]. Tu saldo esta seguro."

</div>

### Accion continua (horas a dias)

1. **Negociar con el PSP:**
   - Presentar evidencia de compliance (licencia, auditorias, KYC policy, chargeback management)
   - Ofrecer rolling reserve mas alto si eso resuelve
   - Proponer monitoring adicional que de confort al PSP
   - Escalar al VP de compliance del PSP si account manager no resuelve
2. **Si es freeze permanente (terminacion):**
   - Legal review inmediato para recuperar fondos retenidos
   - Revisar contrato: clausulas de terminacion, plazos de retencion, jurisdiccion de disputa
   - Plan de 30/60/90 dias para recuperar el dinero (rolling reserve liberation)
3. **Ruteo alternativo para clientes afectados:**
   - Comunicacion personalizada por region (clientes LATAM → PIX / SPEI / crypto)
   - Soporte dedicado para casos complejos
   - Bonificacion goodwill si el cliente esta muy afectado (ej. retraso en retiro)

### Accion post-incidente

1. **Diversificar mas.** Si caiste con 1 PSP, aumentar a 3 PSPs minimo por categoria.
2. **Monitorear chargeback rate semanal** (no mensual). Alerta auto si pasa de 0.5%.
3. **KYC interno de clientes con mas de $10k volumen** — reduce chargeback risk.
4. **Relacion activa con 2-3 account managers por PSP** — no depender de una sola persona.

> [!WARNING]
> El peor escenario PSP no es que te corten el servicio — es que te holdeen $500k-1M durante 180 dias. Sin ese cashflow, muchos brokers no sobreviven 6 meses. Por eso es critico tener **cash reserve corporativo de 3-6 meses de opex** independiente de PSPs.

---

## 7. Escenario 3 — Ataque phishing

**Sintomas:**
- Cliente reporta retiro no autorizado desde su cuenta
- Multiples clientes con misma queja en horas
- Email de phishing imitando dominio NEOMAAA detectado (neomaaa-withdraw.com, neomaa-support.com)
- Login attempts desde IPs anomalas en masa
- Cambios de password / 2FA sin que el cliente los haya hecho

**Incident Commander:** Diego. **Operational Lead:** Dev Lead + Gleb (seguridad).

### Accion inmediata (0-30 min)

<div className="neo-timeline">

1. **Freezar cuentas afectadas** — suspender trading + retiros. Mejor freeze temporal injusto que plata robada.
2. **Revisar logs:** desde que IP, que tiempo, que acciones. Identificar patron.
3. **Aislar el vector:**
   - Phishing email (dominio imitador) → reportar a registrar para takedown
   - Credential stuffing → bloquear IPs + rate limiting agresivo
   - Vulnerabilidad del portal → hotfix + freeze de funcionalidad afectada
   - Sim swap / SMS intercept → forzar 2FA via app (TOTP), no SMS
4. **Forzar password reset + 2FA** para todas las cuentas potencialmente afectadas. Email masivo con link seguro.
5. **Si es ataque generalizado:** reset forzado para toda la base de clientes + bloqueo de retiros 24h.
6. **Warning publico inmediato** — Intercom + email + redes: "Detectamos intentos de phishing imitando a NEOMAAA. Nunca te pediremos password por email / chat. Link oficial: neomaaamarkets.com"

</div>

### Accion continua

1. **Investigacion forense:**
   - Cuantas cuentas afectadas
   - Que datos vieron los atacantes (solo balance? personal data? documentos KYC?)
   - Vector exacto de entrada
   - Si fue targeted (VIP especifico) o masivo
2. **Breach notification legal** — si hay data leak confirmado que afecta datos personales:
   - Reportar a AOFA dentro del plazo regulatorio (72h tipico)
   - Notificar a clientes afectados individualmente
   - Segun GDPR aplica a clientes europeos — legal review urgente
3. **Legal review de responsabilidad:**
   - Si el atacante obtuvo creds por phishing (cliente cayo) → responsabilidad limitada del broker, igual se compensa por goodwill en casos severos
   - Si hubo vulnerabilidad en nuestro sistema → responsabilidad completa del broker
4. **Compensacion:**
   - Fondos robados retornados desde el PSP si se puede (fraude confirmado con evidencia)
   - Si no se recupera via PSP → broker compensa (reputacion > costo)
   - Caso por caso, firma NDA con el cliente si la compensacion es alta

### Que NO hacer

> [!DANGER]
> - NO negar publicamente ("no pasa nada, es un rumor") si hay evidencia real. Streisand effect garantizado.
> - NO esperar a tener toda la info para comunicar. Comunicar temprano con lo que se sabe: "detectamos intentos, estamos investigando, aca estan las medidas." Los clientes perdonan falta de info. No perdonan ocultamiento.
> - NO prometer "esto no vuelve a pasar". Prometer medidas concretas tomadas.
> - NO culpar al cliente en el comunicado ("el usuario dio su password"). Aunque sea verdad, suena pesimo publicamente.

---

## 8. Escenario 4 — Feed corrupto / precios absurdos

**Sintomas:**
- EURUSD cotiza a 0.5 por 3 segundos
- Spread de 500 pips donde deberian haber 0.5
- Cliente ejecuta orden a precio imposible (compro oro a $100/oz)
- Dealing detecta ordenes inusuales en ventana pequena
- Post-trade reports muestran execution prices fuera de mercado

**Incident Commander:** Pepe (Dealing) + Dev Lead en conjunto.

Este es el **escenario mas peligroso financieramente** del manual. Un feed corrupto sin reaccion rapida puede costar $500k-5M en minutos. Casos historicos: varios brokers quebraron o estuvieron cerca por eventos similares (SNB unpeg del CHF en 2015, flash crashes, outages de liquidez).

### Accion inmediata (0-5 min — literalmente minutos)

<div className="neo-timeline">

1. **PAUSAR TRADING INMEDIATAMENTE.** Emergency stop en el servidor MT5. Mejor 30 min sin trading que perder millones. Esta decision la toma Pepe o Stanislav sin consultar.
2. **Identificar feed provider corrupto.** NEOMAAA tiene feed agregado de multiples liquidity providers (Match-Prime, LMAX, otros). Identificar cual dio el precio loco.
3. **Cambiar a feed backup.** Rerouteo de feed principal a backup. Validar que backup da precios normales.
4. **Quote back al feed correcto.** Prices vuelven a rango normal antes de reabrir trading.
5. **Snapshot de ordenes ejecutadas en la ventana corrupta.** Exportar desde MT5 Manager todas las trades en el periodo de corrupcion + 5 min antes y despues.
6. **Status message publico breve:** "Plataforma en mantenimiento por validacion de feed. Reabrimos en [ETA]."

</div>

### Accion continua (minutos a horas)

1. **Reversion de trades fraudulentos.** Los clientes que **explotaron el error deliberadamente** (ej. compraron oro a $100/oz con tamano 100 lotes) se les reversan las operaciones. Esto esta cubierto por clausula "clearly erroneous trades" en los T&Cs — validar con Susana que esta activa.
2. **Honor a trades legitimos.** Clientes que operaron normal con precios normales: sus trades se mantienen. No se los toca.
3. **Como distinguir:**
   - Trade ejecutado en spread normal, tamano normal → honor
   - Trade ejecutado en spread imposible + tamano muy superior al promedio del cliente → reversion
   - Trade en ventana de 2 segundos con tamano 10x promedio → reversion casi seguro
   - Borderline cases → Pepe decide caso por caso
4. **Comunicado a clientes afectados:**
   - Honor: "Trade X confirmado, tu balance es correcto."
   - Reversion: "Trade X reversado por precio claramente erroneo segun T&Cs clausula 14.3. Tu balance se ajusta a estado pre-trade. Lamentamos el inconveniente."
5. **Legal preparado** — clientes van a reclamar las reversiones. T&Cs solidos + documentacion del incidente + comunicacion clara = defensa solida.
6. **Post-mortem con liquidity provider.** Por que dio el precio roto? Que compensacion corresponde de su lado? Ajuste de contrato si se repite.

### Que NO hacer

> [!DANGER]
> - NO reabrir trading hasta confirmar precios validos. Peor que la perdida es "recaida" 5 minutos despues.
> - NO reversar trades legitimos para "minimizar perdidas del broker". Los clientes notan, se vuelve escandalo, reguladores investigan. Reversiones SOLO cuando hay evidencia clara de explotacion del error.
> - NO comunicar "feed roto, sorry" sin accion. El comunicado debe incluir que se hizo y que pasa con trades.
> - NO culpar al liquidity provider publicamente. Discusion privada.

> [!INFO]
> La defensa legal del broker en estos casos descansa en 3 pilares: (1) clausula de clearly erroneous trades en T&Cs firmados, (2) documentacion timestamped del evento, (3) comunicacion consistente con todos los clientes afectados. Si falta alguno, la defensa se cae.

---

## 9. Escenario 5 — Cliente VIP enojado

**Sintomas:**
- Cliente con deposito acumulado $50k-500k pierde gran parte en dias/semanas
- Amenazas: "voy a publicar esto en redes", "voy a demandar", "voy a hacer chargeback masivo"
- Tickets escalados por soporte a management
- En redes: ya posteo algo o amenaza hacerlo
- Pidio retiro de saldo restante y quiere "hablar con el dueno"

**Incident Commander:** Pepe (Dealing) para revision tecnica, o Diego si la amenaza es publica/legal.

### Accion inmediata (primeras horas)

<div className="neo-timeline">

1. **Escalar a Pepe o Head of Sales (Edward) en minutos.** Un agent de soporte junior respondiendo a este cliente es el peor escenario posible. Pausa de respuestas estandar hasta que asuma quien corresponda.
2. **Videollamada urgente con el cliente.** Si acepta, siempre mejor que chat. Humaniza, baja temperatura. Agendar dentro de 24h maximo.
3. **Escuchar TODO antes de responder.** No defender. No justificar. No explicar. Solo escuchar y tomar notas. El cliente necesita ser escuchado mas que necesita explicaciones.
4. **Revisar logs tecnicos exhaustivamente ANTES de la llamada:**
   - Hubo slippage injusto en alguna orden?
   - Problema de ejecucion documentable?
   - Error del sistema que afecto al cliente?
   - Spread anormal en sus trades criticos?
   - Quotes fuera de mercado?
5. **Determinar realidad objetiva del caso:**
   - **A:** Cliente perdio por su propia decision (trading normal, ejecucion correcta, risk management suyo)
   - **B:** Hubo error del broker que impacto resultado (ejecucion mala, problema MT5, slippage injusto)
   - **C:** Zona gris (ejecucion legal pero subopima, cliente tiene punto valido en comunicacion)

</div>

### Accion segun clasificacion

**Caso A — Cliente perdio por su decision:**

- En la llamada: empatia real + datos claros. "Veo la frustracion, es dificil perder esa cantidad. Vamos a revisar juntos las operaciones." Mostrar logs, execution, spreads de cada trade.
- Evidencia de ejecucion correcta: timestamps, spread en el momento, precios de mercado paralelos.
- NO ofrecer compensacion en este caso. Sentar precedente de "si amenazas publicamente te pago" destruye el negocio.
- Si cliente igual quiere publicar en redes: "Entendemos. Nos comprometemos a asistirte en lo que necesites dentro de nuestras responsabilidades contractuales. Cualquier queja formal la canalizamos via [proceso de complaints]."
- Flag interno: cliente toxico, no volver a aceptar depositos si retira y quiere volver.

**Caso B — Hubo error del broker:**

- Reconocer error claramente: "Tenes razon. Hubo [X] que impacto tu trade. Nos hacemos cargo."
- Compensacion proporcional al dano: reembolso del monto perdido por el error, no necesariamente toda la perdida.
- Gesto de goodwill: bonus adicional, trading free de comisiones por X tiempo, otro beneficio razonable.
- Si amenaza pasa: firmar NDA + acuerdo de compensacion.
- Documentar caso interno: cambios en proceso para evitar repeticion.

**Caso C — Zona gris:**

- Pepe + Diego revisan juntos. Decision caso por caso.
- Si el cliente tiene punto valido (aunque no error del broker puro), goodwill parcial suele ser la mejor decision.
- Objetivo: que no quede enojado publicamente, aunque legalmente no correspondiera nada.

### Manejo de amenazas especificas

- **"Voy a publicar en redes"** — respuesta: "Es tu derecho. Nosotros estamos disponibles para responder cualquier consulta publica con transparencia. Tenemos X,XXX clientes satisfechos que pueden hablar por la calidad del servicio." No rogar. No amenazar de vuelta.
- **"Voy a demandar"** — respuesta: "Entendemos. Si preferis canal legal, nuestro equipo legal respondera por esa via. Te sugerimos revisar la clausula 22 de los T&Cs sobre resolucion de disputas antes." Legal review interno preparado.
- **"Voy a hacer chargeback masivo"** — respuesta: "Cada transaccion tiene evidencia de ejecucion correcta. Chargeback fraudulento tiene consecuencias legales y bancarias para vos. Preferimos resolver directo."

### Que NO hacer

> [!DANGER]
> - NO pelear en el chat. Nunca. Bajar el tono, ser profesional, aunque el cliente sea agresivo.
> - NO ofrecer compensacion en primer contacto sin revisar evidencia. Seta precedente.
> - NO ignorar la amenaza asumiendo que no va a cumplir. Asumir que SI va a publicar, preparar respuesta.
> - NO poner el caso solo en manos de soporte. Management responsable, siempre.
> - NO responder publicamente si el cliente posteo en redes, hasta validar interno y preparar mensaje coordinado.

### Aprendizaje sistemico

Si tenes 3+ casos de clientes VIP enojados en 6 meses, el problema no son los clientes — es el marketing y onboarding. Atraes el perfil equivocado, onboardeas sin expectativas claras, o no hay risk management adecuado.

Revisar:
- Copy de ads — promete returns o solo herramientas?
- Onboarding — se le explica risk disclosure real o se firma sin leer?
- Risk limits — hay alertas cuando cliente pierde 30/50/70% del deposito?
- Perfil target — cliente adecuado para los productos que ofrecemos?

---

## 10. Escenario 6 — Noticia negativa / reseña viral

**Sintomas:**
- Thread en X / post en Instagram / video en TikTok acusando a NEOMAAA de scam con views virales (>10k)
- Comentarios negativos masivos en redes de NEOMAAA
- Increase de tickets de soporte preguntando "es scam?"
- Google Trends spike negativo del nombre
- Competidores rebotando la noticia

**Incident Commander:** Diego. **Operational Lead:** Marketing Manager.

### Accion inmediata (primeras horas)

<div className="neo-timeline">

1. **NO responder impulsivamente desde cuenta oficial.** Un tweet emocional multiplica la viralidad 10x. Pausa minimo 2 horas antes de respuesta publica.
2. **Evaluar el reclamo:**
   - Es real? — cliente existente con problema documentable
   - Es FUD competidor? — cuentas sin historia, patron repetitivo
   - Es bot / automatizado? — actividad anormal, horarios raros, copia-pega
3. **Identificar autor y alegaciones especificas.** Nombre, handle, si es cliente (chequear CRM), que dice concretamente. Screenshot TODO (pueden borrar).
4. **Investigar internamente el caso si es real.** Buscar al cliente en CRM, revisar operaciones, soporte historico, KYC, todo.
5. **Alertar al equipo internamente** — canal interno: "hay issue viral en X, estamos investigando, no responder individualmente, sharing no."

</div>

### Accion continua

**Si el reclamo tiene razon real:**

1. **Contactar al cliente directamente (DM o email).** Ofrecer resolver: revision del caso, compensacion si corresponde, call con management.
2. **Si se resuelve el caso:** pedir que edite o borre el post, o postee un update. Muchos lo hacen si se los trato bien.
3. **Respuesta publica si el post sigue viral:** comentar en el post original con tono tranquilo: "Hola [nombre], lamentamos tu experiencia. Te contactamos por DM para resolverlo. Cualquier cliente con reclamo puede escribirnos a [email] para asistencia directa."

**Si es difamacion / FUD sin base:**

1. **Legal review** — el post contiene acusaciones falsas documentables? Takedown request via legal es opcion.
2. **Contrarrespuesta con datos** — publicar stats reales: numero de clientes, tiempo operando, regulacion, etc. Tono calmo, no defensivo.
3. **Activar testimonios reales** — clientes satisfechos ya preparados responden organicamente. NUNCA comprar comentarios falsos (se detecta).
4. **Amplificar el mensaje positivo** — contenido existente de clientes reales, reviews en Trustpilot, etc.

**Si es bot / ataque coordinado:**

1. Reportar cuentas a plataforma (X, Instagram, TikTok todos tienen report para spam/bot)
2. Activar engagement genuino de la comunidad
3. Evitar respuesta emocional — los bots no responden, solo generan ruido, el ruido muere solo en 48-72h si no lo alimentas

### Principio general de respuesta publica

Tono en toda respuesta publica:
- Calmo, nunca emocional
- Con datos, no con adjetivos
- Breve, sin listas largas de justificaciones
- Agradecido si hay feedback legitimo, firme si hay difamacion

> [!TIP]
> El peor error en crisis de reputacion es actuar como si fuera personal. Es negocio, es estadistica de comunicacion, es brand management. Diego o Marketing Manager responden con cabeza fria, nunca desde el ego.

### Accion post-crisis

1. **Analisis de viralidad:** por que escalo? que trigger lo amplifico? influencer que lo rebootio?
2. **Ajuste de brand strategy** si aparecieron patrones repetidos
3. **Plan de contenido positivo** post-crisis: no para tapar, sino para seguir construyendo reputacion

---

## 11. Escenario 7 — Notificacion regulatoria

**Sintomas:**
- Email oficial de AOFA (Anjouan Offshore Finance Authority) o regulador paralelo
- Requerimiento de informacion (cliente especifico, AML, operativa)
- Notificacion de investigacion abierta
- En peor caso: suspension cautelar de licencia
- Contacto de un abogado representante de regulador o cliente con accion formal

**Incident Commander:** Susana (Compliance Officer). **Diego** informado desde minuto 1.

### Accion inmediata (primeras 24h)

<div className="neo-timeline">

1. **Leer la notificacion completa y calma.** No reaccionar emocionalmente. Los reguladores mandan muchos requerimientos rutinarios — no todo es escalada.
2. **Identificar plazo de respuesta.** 7 dias, 15 dias, 30 dias. El plazo es inflexible.
3. **NO responder antes de consultar abogado regulatorio.** Una respuesta mal redactada puede empeorar posicion. Abogado externo antes que improvisar.
4. **Clasificar tipo de notificacion:**
   - Requerimiento de info rutinario (AML report anual, cliente especifico de KYC) → respuesta estandar con docs
   - Investigacion preliminar (preguntas sobre operativa) → respuesta cuidadosa, legal review, documentar
   - Investigacion formal con alegaciones → legal externo obligatorio, plan de defensa
   - Accion cautelar (suspension, congelamiento) → crisis maxima, Diego + Susana + Legal full time
5. **Reunir info solicitada.** Exactamente lo pedido, ni mas ni menos. Info de mas puede abrir nuevos frentes.
6. **Comunicacion interna limitada.** Equipo sabe "hay requerimiento regulatorio, proceso normal, Susana lo maneja". Sin detalles especificos hasta que Susana apruebe share.

</div>

### Accion continua

1. **Respuesta formal dentro del plazo.** Susana + legal externo redactan, Diego aprueba, se envia.
2. **Si es investigacion:**
   - Cooperar 100% — jugar en contra del regulador es suicida en jurisdiccion offshore
   - Nombrar punto unico de contacto (Susana) — evitar que el regulador hable con 5 personas distintas
   - Legal externo presente en toda comunicacion
3. **Preparar comunicacion publica SOLO si la noticia sale a prensa.** Nunca proactiva. Template: "NEOMAAA Markets opera en pleno cumplimiento de su licencia AOFA. Colaboramos con el regulador en cualquier requerimiento rutinario, como es practica estandar en la industria. Los fondos de clientes estan segregados y seguros."
4. **No discutir detalles publicamente** — aunque tengas razon. Discutir con regulador en publico = perder licencia mas rapido.

### Si hay suspension / sancion

1. **Plan de contingencia de 24-48h:**
   - Comunicacion a clientes: operativa normal continua si es posible
   - Trading normal si el regulador no lo suspendio
   - Retiros normales si el regulador no los suspendio
   - Preparar plan B: jurisdiccion alternativa ya prevista en expansion regulatoria
2. **Legal plan:**
   - Apelacion formal si corresponde
   - Cumplimiento de requerimientos regulador
   - Timeline de resolucion

### Que NO hacer

> [!DANGER]
> - NO responder al regulador sin abogado regulatorio. Nunca.
> - NO ocultar info al regulador. Se detecta, agrava.
> - NO comunicar publicamente detalles de la investigacion. Puede ser violacion de confidencialidad legal.
> - NO permitir que empleados comenten el tema externamente (redes, calls con clientes).
> - NO destruir documentos post-notificacion. Obstruccion de investigacion, delito.

---

## 12. Escenario 8 — Filtracion interna

**Sintomas:**
- Ex-empleado (o empleado actual saliendo) se va en malos terminos
- Amenaza de filtrar data / publicar info interna
- Post negativo en LinkedIn / Glassdoor con info especifica
- Data interna aparece en redes o competencia
- Evidencia de descarga masiva de info antes de salida

**Incident Commander:** Diego.

### Accion inmediata (minutos a horas)

<div className="neo-timeline">

1. **Revoke de accesos INMEDIATO.** Lista completa:
   - CRM (Skale)
   - Intercom
   - Google Workspace (Gmail, Drive, Calendar)
   - Portal interno (Docsify)
   - VPN corporativa
   - Slack / Telegram corporativos
   - Panel de admin de MT5 / servidor
   - PSPs y acquirer dashboards
   - Repositorios GitHub
   - Password manager corporativo (1Password / LastPass)
2. **Cambio de passwords criticos** — admin de sistemas clave. No porque sepa el password, sino por si tiene sesiones abiertas en otros devices.
3. **Backup de info que manejaba** — emails, docs, conversaciones. Preservar evidencia.
4. **Audit de accesos recientes:**
   - Que descargo en los 30 dias previos a salida
   - Que emails reenvio a personal
   - Que docs exporto de Drive
   - Login anomalos
5. **Legal review de NDA firmado** — que clausulas aplica, que acciones disponibles, en que jurisdiccion.

</div>

### Accion continua

**Si no hay filtracion confirmada todavia, solo amenaza:**

1. Carta formal de legal externo recordandole obligaciones de NDA + consecuencias.
2. Monitoreo activo de sus cuentas publicas.
3. Nada publico de nuestro lado — no validar amenaza con reaccion.

**Si hay filtracion confirmada de data no sensible (internal process, strategy doc):**

1. Legal action por breach de NDA — carta de cease and desist, escalada si no cumple.
2. No responder publicamente al leak — lo amplifica.
3. Revisar que no haya mas por venir.

**Si hay filtracion de data sensible de clientes:**

1. **Breach notification a AOFA** dentro del plazo regulatorio.
2. **Notificacion a clientes afectados** — email personalizado, lista de datos comprometidos, acciones recomendadas (password reset, monitoreo de fraude), linea de soporte dedicada.
3. **Legal action agresivo** — data theft es penal en casi todas las jurisdicciones.
4. **Comunicacion publica** — aca NO se puede ocultar. Reconocer: "Un ex-empleado filtro data interna. Tomamos [acciones]. Contactamos a clientes afectados directamente."
5. **Investigacion de compliance** — como llego a esa data? fue violacion de politica interna de accesos? que cambia?

### Prevencion estructural post-evento

1. **Need-to-know strict** — empleados acceden solo a data que necesitan. Segmentacion granular.
2. **Offboarding checklist riguroso** — lista de 40+ items para ejecutar en dia de salida.
3. **Exit interview con compliance presente** — recordatorio de NDA, firma de acuse de recibo.
4. **Monitoreo de downloads anormales** — alertas auto si alguien baja >X archivos en Y tiempo.
5. **Deleted accounts auditing** — revision trimestral de accounts que deberian estar inactivos.

> [!INFO]
> La mejor defensa contra filtracion interna no es legal despues — es cultura antes. Empleados que se sienten valorados y tratados con dignidad no se van en malos terminos. La mayoria de filtraciones viene de despidos humillantes, salarios impagos, o conflictos personales mal manejados. Invertir en people ops es mas barato que litigar leaks.

---

## 13. Template de post-mortem

Despues de cada crisis, sesion formal de 1h minimo. Participantes: IC + Operational Lead + Communications + cualquier afectado directo. Facilitador neutral si aplica.

### Estructura del post-mortem

**1. Timeline reconstruido (15 min)**
- Minuto a minuto de lo que paso
- Cuando se detecto, quien, como
- Cuando se escalo, a quien
- Cuando se asumio IC
- Cuando se contuvo
- Cuando se comunico externamente
- Cuando se cerro

**2. Que salio bien (10 min)**
- Que funciono del protocolo
- Quien ejecuto bien
- Sistemas / herramientas que ayudaron
- Decisiones correctas bajo presion

**3. Que salio mal (20 min)**
- Donde hubo delay innecesario
- Que decisiones fueron incorrectas
- Que comunicacion fallo
- Que sistemas fallaron

**4. Cost total (5 min)**
- Financiero: $ directo + oportunidad
- Reputacional: clientes perdidos, menciones negativas
- Cliente: cuantos afectados, tickets, churn
- Tiempo: horas de equipo, oportunidad de otros proyectos

**5. Cambios concretos (10 min)**
- Que cambia en proceso
- Que cambia en sistema
- Que cambia en gente (rol, responsabilidad)
- Owner de cada cambio + deadline

### Reglas del post-mortem

- **Blameless.** No se culpa personas, se culpa sistemas. Si una persona fallo, probablemente el sistema permitia que fallara. Fix del sistema.
- **Documentado.** Output: doc formal con todo lo anterior, firmado por IC, guardado en `/crisis-postmortems/`.
- **Action items con owner.** Sin owner con nombre + fecha = no va a pasar.
- **Review trimestral.** Cada quarter, revisar post-mortems del trimestre y validar que los changes se implementaron.

> [!WARNING]
> Post-mortem sin changes concretos es peor que no hacerlo. Si la conclusion es "la proxima vez lo hacemos mejor" sin especificar QUE cambia — la crisis va a repetirse casi identica.

---

## 14. Checklist de preparacion

Lista de cosas que tienen que estar activas ANTES de que pase cualquier crisis. Revisar trimestralmente.

### Infraestructura de respuesta
- [ ] Canal Telegram `#crisis-neomaaa` creado, todos los principals adentro, notificaciones prendidas
- [ ] Documento compartido Google Doc con template pre-armado, link en pin del canal
- [ ] Incident Commander primary + backup asignado por tipo de crisis (tabla seccion 3)
- [ ] Intercom status message templates en 3 idiomas (ES/EN/RU), aprobados
- [ ] Carpeta `/comunicacion-crisis/` con templates de email, redes, respuesta prensa
- [ ] Monitoring activo de uptime (MT5, portal, CRM) con alertas auto
- [ ] Social listening configurado (Mention.com o similar) para nombre NEOMAAA

### Contactos externos criticos (tener a mano 24/7)
- [ ] Soporte L2/L3 de MetaQuotes / hosting MT5 provider — telefono + email
- [ ] Account managers de cada PSP activo — telefono + WhatsApp + email
- [ ] Abogado regulatorio (jurisdiccion AOFA) — contactabilidad urgente
- [ ] Abogado general (disputas civiles, clientes) — contactabilidad normal
- [ ] Abogado especializado en data breach / ciberseguridad — para casos 3 y 8
- [ ] Contacto AOFA (Susana tiene acceso directo)
- [ ] PR / crisis comms agency (para escenario 6 si escala) — [DATO: evaluar contratar]

### Redundancia operativa
- [ ] PSP backup activo por categoria: minimo 2 card, 2 crypto, 2 bank, 2 local
- [ ] Feed de precios con multiple liquidity providers (minimo 3)
- [ ] Servidor MT5 con hot backup
- [ ] Cash reserve corporativo de minimo 3 meses de opex (para freeze de PSPs)
- [ ] Multi-cloud / multi-region si aplica

### Entrenamiento
- [ ] Drill de crisis minimo 1x por trimestre — simulacro con escenario aleatorio
- [ ] Onboarding de nuevos empleados incluye lectura de este manual
- [ ] Leads operativos (Head Support, Sales, Marketing) tienen review anual de procedimiento
- [ ] Susana actualiza templates regulatorios cada 6 meses

### Documentacion continua
- [ ] Post-mortems guardados y accesibles
- [ ] Update de este manual despues de cada crisis real (leccion aprendida = nuevo procedimiento)
- [ ] Contactos externos verificados cada 6 meses (la gente cambia de trabajo)

---

## 15. Anti-patterns

Lo que NUNCA se hace en crisis, sin importar la presion del momento:

1. **Esconder info al equipo durante crisis.** Genera rumor, desconfianza, mal comportamiento. Transparencia interna es inegociable.

2. **Responder publicamente emocional.** Un tweet enojado destruye 12 meses de brand. Si sentis la necesidad de responder ahora, es el momento exacto de NO responder.

3. **Prometer timing sin certeza.** "Se resuelve en 30 min" cuando no sabes → pierdes credibilidad cuando son 3 horas. Mejor "actualizamos en 30 min" que "resolvemos en 30 min".

4. **Echar culpas publicas sin evidencia.** "Fue culpa del proveedor X" sin docs firmados → lawsuit del proveedor. Defensas publicas requieren evidencia documentada.

5. **Dejar que un junior maneje crisis sin supervisor.** Soporte junior no decide. Sales junior no decide. Siempre hay un lead responsable al lado.

6. **Ignorar signals tempranas.** "Esto no es grave, ya se arregla" mientras se acumulan 20 tickets del mismo tipo. Tratar cada cluster raro como potencial crisis hasta descartar.

7. **Post-mortem sin changes reales.** "Lessons learned" sin cambios concretos en proceso / sistema / gente = garantia de repeticion.

8. **Culpar a una sola persona en post-mortem.** Si una persona fallo, el sistema permitio el fallo. Fix del sistema. Individual blame genera cultura de ocultamiento en la proxima.

9. **Trabajar 72h seguidas en crisis.** Equipo quemado toma malas decisiones. Rotar gente, mandar gente a dormir, no glorificar el overtime.

10. **Tratar cada crisis como aislada.** Cada crisis es input al sistema. Patrones repetidos indican problemas estructurales (marketing que atrae clientes equivocados, onboarding debil, infra sin redundancia). Zoom out cada 6 meses.

---

## 16. Anexos

### A. Contactos criticos

> [!INFO]
> Esta seccion se mantiene actualizada en documento separado `/anexos-crisis/contactos-externos.md`. Revision trimestral obligatoria.

| Categoria | Contacto | Responsable interno |
|---|---|---|
| MT5 Provider — L2 Support | [DATO: confirmar con Stanislav] | Stanislav |
| Liquidity Provider — Match-Prime | [DATO: confirmar con Pepe] | Pepe |
| Liquidity Provider — Backup | [DATO: confirmar con Pepe] | Pepe |
| PSP principal card | [DATO: confirmar con Finance Manager / Diego] | Finance Manager |
| PSP backup card | [DATO: confirmar con Finance Manager / Diego] | Finance Manager |
| PSP crypto | [DATO: confirmar con Finance Manager / Diego] | Finance Manager |
| PSP local LATAM | [DATO: confirmar con Finance Manager / Diego] | Finance Manager |
| Legal externo — regulatorio AOFA | [DATO: confirmar con Susana] | Susana |
| Legal externo — disputas civiles | [DATO: confirmar con Diego] | Diego |
| Legal externo — ciberseguridad / data breach | [DATO: contratar / identificar] | Diego |
| Contacto directo AOFA | Susana (contacto directo confidencial) | Susana |
| PR / crisis comms agency | [DATO: evaluar contratacion] | Marketing Manager |
| Cloudflare / proteccion DDoS | [DATO: confirmar con Dev Lead] | Dev Lead |

### B. Templates de comunicacion

Carpeta `/comunicacion-crisis/` contiene:

1. `email-base-generico.md` — email a toda la base, plantilla neutra
2. `email-base-tecnico.md` — outage, downtime, problema tecnico
3. `email-base-financiero.md` — PSP issue, retiros afectados
4. `intercom-status-investigando.md`
5. `intercom-status-identificado.md`
6. `intercom-status-resuelto.md`
7. `social-media-outage.md` — post para X / Instagram / Facebook
8. `social-media-respuesta-difamacion.md` — respuesta calma a acusaciones publicas
9. `respuesta-prensa-generica.md` — para cuando contacta periodista
10. `notificacion-cliente-individual-breach.md` — caso de data affected
11. `notificacion-aofa-breach.md` — template regulatorio

### C. Drill plan (simulacros trimestrales)

**Formato:** 2 horas, facilitado por un principal distinto cada vez. Escenario aleatorio del seccion 5-12. Participantes: roles relevantes al escenario.

**Reglas del drill:**
- Sorpresa (fecha anunciada, escenario no)
- Tiempo real (no pausas para pensar)
- Usa canales reales (Telegram dedicado del drill, no el de prod)
- Facilitador toma notas de delays, errores, falta de claridad
- Debrief al final: que funciono, que no, que se ajusta del manual

**Escenarios a rotar:**
- Q1: escenario 1 (MT5 caido)
- Q2: escenario 5 (VIP enojado)
- Q3: escenario 3 (phishing masivo)
- Q4: escenario 4 (feed corrupto — el mas critico financieramente)

Otros escenarios (2, 6, 7, 8) se trabajan via table-top exercises (conversacion guiada, sin simulacro real) en reuniones mensuales de management.

### D. Links relacionados

- [Go-Live Runbook](go-live-runbook.md) — protocolo para lanzamiento, complementario a este manual
- [FAQ Interno](faq-interno.md) — preguntas operativas del dia a dia
- [Depositos y Retiros](deposits.md) — para escenario 2
- [Manual Compliance](../compliance/manual-susana.md) — para escenario 7
- [Manejo de Quejas](../support/manejo-quejas.md) — para escenario 5
- [Politica A-Book / B-Book](../compliance/ab-book-policy.md) — relevante para escenario 4

---

**Version control:**
- v1.0 — Abril 2026. Version inicial pre-go-live.
- Proximas updates: post-cada-crisis-real + review trimestral + ajuste de contactos externos.

**Revisado por:** [DATO: firmas de Diego, Susana, Stanislav, Pepe antes de go-live]
