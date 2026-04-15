# Dealing desk — Cómo funciona la ejecución en NEOMAAA

**Versión:** 1.0
**Fecha:** Abril 2026
**Audiencia:** Ventas, Soporte, Marketing, Partners
**Clasificación:** Uso interno no confidencial — apto para entrenar equipos de cara al cliente
**Qué NO está acá:** umbrales específicos de routing, nombres de liquidity providers, ratios internos, P&L del dealing. Eso vive en el documento confidencial bajo custodia de Pepe (Head of Dealing) y Compliance.

---

## Tabla de Contenidos

1. [Por qué existe este documento](#1-por-que-existe-este-documento)
2. [Modelos de ejecución en la industria](#2-modelos-de-ejecucion-en-la-industria)
3. [Cómo opera NEOMAAA — híbrido ECN/STP](#3-como-opera-neomaaa--hibrido-ecnstp)
4. [Conceptos clave para explicar al cliente](#4-conceptos-clave-para-explicar-al-cliente)
5. [Cómo responder objeciones típicas](#5-como-responder-objeciones-tipicas)
6. [Frases aprobadas](#6-frases-aprobadas)
7. [Frases prohibidas](#7-frases-prohibidas)
8. [Escalamiento a dealing desk](#8-escalamiento-a-dealing-desk)
9. [Transparencia con el cliente](#9-transparencia-con-el-cliente)

---

## 1. Por qué existe este documento

Todos los brokers del mundo tienen alguna forma de **execution mix**. Ninguno es 100% A-Book puro. El broker que te diga lo contrario, te está mintiendo (y además, legalmente, el supervisor regulatorio le va a encontrar la mentira).

El problema no es el execution mix en sí — el problema es cuando el equipo de cara al cliente no sabe explicarlo sin mentir. Este documento existe para que **ventas, soporte y marketing puedan responder preguntas técnicas con precisión, sin revelar información sensible y sin comprometer al broker**.

> [!INFO]
> El cliente sofisticado (institucional, IB grande, trader profesional) sabe cómo funciona la industria. Si le mentís, te detecta al segundo y se va con otro broker. La honestidad técnica es ventaja competitiva.

### Qué está en este doc

- Explicación educativa de los modelos de ejecución (A-Book, B-Book, híbrido)
- Cómo se posiciona NEOMAAA en esa lógica (sin datos operativos sensibles)
- Conceptos que el cliente pregunta: spread, slippage, requotes, swap, gaps, widening
- Cómo responder objeciones habituales sin prometer lo que no se puede cumplir
- Frases listas para usar y frases que nunca deben decirse
- Cuándo escalar al dealing desk y cómo

### Qué NO está en este doc

- Umbrales específicos de categorización de flow
- Nombres y contratos con los liquidity providers
- Ratios exactos de routing A-Book / B-Book
- Márgenes de markup o economía interna del dealing
- Reportes internos de P&L por cliente o por mesa

Todo eso vive en `compliance/ab-book-policy.md` — documento confidencial con acceso restringido a Pepe (Head of Dealing), Susana (Compliance), Angel (Co-founder), Diego (Founder) y auditores regulatorios.

---

## 2. Modelos de ejecución en la industria

Para entender cómo opera NEOMAAA, primero hay que entender los tres modelos que existen en la industria retail de forex/CFDs.

### A-Book (STP / ECN)

El broker **pasa la orden al mercado**. Actúa como intermediario entre el cliente y uno o más liquidity providers (bancos, prime brokers, ECN institucionales). El broker no toma el otro lado del trade.

**Cómo gana el broker:**
- Markup sobre el spread (agrega 0.1–0.5 pips al spread institucional)
- Comisión fija por lote (típico en cuentas Raw/ECN)
- Combinación de ambas

**Cuándo es la mejor opción:**
- Clientes con tamaños grandes que el broker no puede absorber sin hedge
- Estrategias predecibles y ganadoras donde el broker prefiere ser intermediario
- Mercados muy líquidos (majors FX, índices principales)

**Ventaja:** cero conflicto de interés con el cliente. Al broker le conviene que el cliente tradee mucho y dure mucho tiempo — no que pierda.

**Típico de:** brokers regulados por Tier 1 (ASIC, FCA, CySEC) en sus cuentas institucionales o Raw.

### B-Book (Market Maker)

El broker **es la contraparte** del cliente. Toma el otro lado del trade internamente, sin pasar la orden al mercado. El P&L del cliente es el P&L inverso del broker.

**Cómo gana el broker:**
- Gana cuando el cliente pierde
- Spread capturado en cada operación

**Cuándo se usa (en la industria):**
- Flow de retail pequeño donde pasar cada orden al mercado tiene fricción operativa absurda
- Clientes estadísticamente perdedores (el broker prefiere ser contraparte y capturar el edge)
- Mercados donde los LPs cobran caro o no hay liquidez profunda

**El problema:** genera conflicto de interés estructural. Por eso los reguladores serios lo vigilan con lupa y exigen best execution documentada.

**Típico de:** brokers offshore sin regulación seria, o el "bucket" retail de cualquier broker hybrid (más sobre esto abajo).

### Híbrido — el modelo real de la industria

**Todo broker moderno usa un modelo híbrido.** No hay excepciones serias. El broker analiza el flow y decide, orden por orden o cliente por cliente, qué pasa al mercado y qué queda internalizado.

<div className="neo-compare">

**A-Book puro**
- Cero conflicto de interés
- Costo operativo alto
- Menos rentable en flow retail
- Comercialmente: imposible como único modelo

**B-Book puro**
- Máximo conflicto de interés
- Muy rentable sobre flow retail perdedor
- Fatal en clientes ganadores grandes
- Regulatoriamente: bandera roja inmediata

**Híbrido (lo que hacen todos)**
- Mix según criterios internos
- Ganadores grandes → A-Book (no querés ser contraparte)
- Retail perdedor → B-Book o internal matching
- Best execution sigue siendo obligatorio
- Regulatoriamente: aceptado si está documentado

</div>

**Criterios típicos que usa la industria** (ejemplos educativos, no los específicos de NEOMAAA):

- **Historial del cliente:** ganadores consistentes → A-Book; perdedores consistentes (alrededor del 70% del flow retail según estadísticas públicas de la industria) → B-Book o internal matching
- **Volumen:** size muy grande → A-Book obligado (hedge regulatorio)
- **Tipo de operativa:** scalping de alta frecuencia → B-Book (el spread genera el edge del broker)
- **Instrumento:** majors líquidos más fácil A-Book; exóticos o CFDs OTC típicamente B-Book
- **Horario:** news events → a menudo ruteo distinto por risk management
- **Cuenta:** Raw/ECN típicamente A-Book; Standard típicamente híbrido

> [!TIP]
> Todos los reguladores serios (FCA, ASIC, CySEC, MAS) **aceptan el modelo híbrido** siempre que:
> 1. El broker tenga política de best execution documentada
> 2. El cliente reciba un precio de ejecución justo vs el mercado de referencia
> 3. El broker divulgue en términos y condiciones que opera como contraparte en parte del flow

---

## 3. Cómo opera NEOMAAA — híbrido ECN/STP

NEOMAAA Markets opera un **modelo híbrido ECN/STP**, con routing por defecto hacia múltiples liquidity providers. Es la estructura estándar de cualquier broker moderno que quiera dar ejecución competitiva sin quebrar en el primer cliente grande.

### Lo que podés decir al cliente sobre NEOMAAA

- **Operamos con múltiples liquidity providers** para asegurar profundidad y mejores precios
- **El routing por defecto es A-Book vía LPs**, especialmente en cuentas Raw/ECN y en majors líquidos
- **El dealing desk** (bajo supervisión de Pepe + Compliance) analiza el flow y optimiza ejecución según best execution policy
- **La política de ejecución está documentada** en `legal/order-execution-policy.md` y es pública para cualquier cliente que la pida
- **El cliente puede solicitar un execution report** de cualquiera de sus operaciones — Pepe lo genera desde el servidor MT5
- **Cuentas islámicas (swap-free)** disponibles bajo solicitud para clientes que lo requieran por convicción religiosa
- **Infraestructura tecnológica**: servidores MT5 alojados en **data centers Equinix** (NY4, LD5) con proximidad física a los principales LPs y venues, conexiones cross-connect de baja latencia. Esto es un diferenciador técnico real vs brokers low-tier que corren en VPS genéricos.
- **SLA de disponibilidad target**: 99.9% uptime oficial publicado en neomaaa.com. Redundancia geográfica y failover automático enterprise-grade.

### Lo que NO podés decir al cliente sobre NEOMAAA

- Qué porcentaje exacto del flow va A-Book vs internalizado
- Quiénes son los liquidity providers específicos
- Qué umbrales (monto, volumen, P&L, etc.) activan un cambio de routing
- Cómo se categoriza a cada cliente
- Cuánto gana el broker por categoría de cliente o por instrumento

> [!WARNING]
> Si un cliente insiste en datos sensibles ("¿cuántos LPs?", "¿qué porcentaje internalizan?"), la respuesta correcta es:
>
> *"Por políticas de confidencialidad comercial no divulgamos la estructura específica de liquidity. Lo que sí podemos garantizar es best execution documentada, que el equipo de compliance supervisa. Si querés un execution report de tus operaciones, te lo generamos."*
>
> No es evasión — es la respuesta estándar en cualquier broker serio del mundo.

---

## 4. Conceptos clave para explicar al cliente

El 80% de las objeciones y dudas del cliente giran alrededor de cinco conceptos: spread, slippage, requotes, swap y gaps. Si el equipo domina estos cinco, el soporte y la venta son 10 veces más fáciles.

### 4.1 Spread

**Qué es:** la diferencia entre el precio bid (al que se vende) y el ask (al que se compra). Es el costo estructural de cada trade.

**Por qué varía:**
- **Liquidez del instrumento:** EUR/USD tiene spread mínimo; exóticos o CFDs menos líquidos tienen spread más amplio
- **Volatilidad:** durante noticias el spread se amplía en todos los brokers
- **Horario:** overlap Londres–Nueva York = mejor spread; madrugada asiática = spread más amplio
- **Tipo de cuenta:** Raw vs Standard

**Raw vs Standard (explicación para cliente):**

| Concepto | Cuenta Raw/ECN | Cuenta Standard |
|----------|----------------|-----------------|
| Spread típico | Institucional (desde 0.0 pips) | Con markup (desde 0.8–1.5 pips) |
| Comisión | Sí (por lote) | No |
| Ideal para | Scalping, alta frecuencia, volumen grande | Swing trading, principiantes |
| Costo total por trade | Variable según comisión | Incluido en el spread |

> [!TIP]
> Para el cliente: "No hay cuenta gratis. En Raw pagás comisión explícita y spread institucional. En Standard pagás spread más amplio sin comisión. El costo total al final de un mes activo es similar — la elección depende de tu estilo."

### 4.2 Slippage

**Qué es:** diferencia entre el precio que pediste y el precio al que ejecutaste.

- **Slippage positivo:** ejecutaste **mejor** de lo que pediste. Pasa menos, pero pasa (alrededor del 10–20% de las órdenes en condiciones normales según estadísticas públicas de la industria).
- **Slippage negativo:** ejecutaste **peor**. Común durante news events, gaps y baja liquidez.

**Slippage simétrico vs asimétrico:**

<div className="neo-compare">

**Simétrico (NEOMAAA)**
- Reportás positivo y negativo igual
- El cliente recibe el mejor precio cuando el mercado se mueve a su favor
- Estándar de la industria regulada

**Asimétrico (RED FLAG)**
- Solo te dan slippage negativo
- Si el precio mejora, lo ejecutan al precio pedido (y se quedan con la diferencia)
- Si el precio empeora, te lo pasan al cliente
- Un competidor que hace esto = bandera roja para Compliance

</div>

**NEOMAAA opera con slippage simétrico.** Esto no es favor, es estándar regulatorio. Si el cliente pregunta, se le puede decir sin problema.

### 4.3 Requotes

**Qué es:** cuando el cliente intenta ejecutar a un precio y el broker le responde "ese precio ya no está disponible, ¿querés ejecutar a este otro?".

**Cuándo pasan:**
- News events de alto impacto (NFP, CPI, FOMC, ECB)
- Gaps de mercado (apertura del domingo, cierre del viernes)
- Flash moves (movimientos violentos fuera de news)
- Instrumentos con liquidez limitada

**Por qué pasan técnicamente:**
El LP no tiene precio disponible en el momento exacto en que el cliente manda la orden. El broker no puede ejecutar a un precio que no existe.

**En NEOMAAA:** los requotes son mínimos porque se trabaja con múltiples LPs, pero no son cero — ningún broker del mundo tiene cero requotes en news de alto impacto.

### 4.4 Swap (overnight)

**Qué es:** el interés diferencial entre las dos monedas de un par de divisas, o el costo de financiamiento de un CFD overnight. Se cobra (o se paga) por mantener una posición abierta al cierre del día.

**Cuándo se cobra:**
- Diariamente a las **22:00 GMT** (rollover del servidor)
- **Triple swap los miércoles** — ajuste para compensar el weekend (sábado y domingo no hay rollover pero sí se devenga interés)

**Cómo se calcula:**

```
Swap = rate del banco central de cada moneda + markup del broker
```

- En pares long (compra) con moneda base de mayor tasa → swap positivo (te pagan)
- En pares short (venta) con moneda base de mayor tasa → swap negativo (pagás)
- El markup del broker aplica en ambas direcciones

**Islamic accounts (swap-free):**
Alternativa para clientes musulmanes cuya religión prohíbe cobrar/pagar interés. NEOMAAA ofrece cuentas swap-free bajo solicitud y verificación. En vez de swap se aplica una comisión administrativa fija si la posición se mantiene más de X días (definido en la política interna).

### 4.5 Gaps de fin de semana

**Qué es:** el forex cierra el **viernes 22:00 GMT** y abre el **domingo 22:00 GMT**. Si durante el fin de semana pasa un evento macro relevante (elección, default, atentado, declaración de guerra), el precio **no abre igual a donde cerró** — abre con gap.

**Qué pasa con tus stops:**
- Si tenés un stop colocado y el precio abre el domingo más allá de tu stop → el stop se ejecuta al **primer precio disponible**, no al precio de tu stop
- Esto puede significar pérdida mayor a la que esperabas

> [!DANGER]
> Esto NO es slippage del broker — es cómo funciona el mercado. Todo broker del mundo funciona así. Si un cliente te reclama un "stop mal ejecutado" en gap de fin de semana, la respuesta técnica correcta es explicar el gap, no pedir perdón.

### 4.6 Spread widening en news

**Qué pasa:** en noticias de alto impacto (NFP, CPI, FOMC, ECB, BoE) los spreads se **amplían drásticamente** en todos los brokers del mundo.

**Duración típica:** 5 a 60 segundos antes, durante y después del anuncio.

**Causa:**
Los liquidity providers **retiran temporalmente liquidez** porque no saben dónde va a saltar el precio. Es risk management de los LPs, no decisión del broker.

**Qué comunicar al cliente:**
- Es universal — no es NEOMAAA haciendo trampa
- Dura segundos, no minutos
- La solución táctica: no operar con órdenes de mercado durante la ventana de news (usar limit orders o esperar que se normalice el spread)

---

## 5. Cómo responder objeciones típicas

Esta es la parte operativa que más usa soporte y ventas. Cinco objeciones cubren el 80% de los casos.

### 5.1 "Mi stop saltó mal, me hiciste stop hunting"

**Qué NO hacer:** negar de plano, decir "es lo que hay", mandar al cliente a leer términos.

**Qué hacer:**
1. Tomar los datos: instrumento, timestamp exacto, precio del stop, precio ejecutado
2. Explicar técnicamente: "En gaps o news events, el primer precio disponible puede estar por debajo/encima del stop"
3. Ofrecer execution report: "Te lo solicito a Pepe y te mando el detalle de cómo se ejecutó tu orden contra los LPs"
4. Si hay sospecha real de error: escalar a dealing desk para revisión

**Frase modelo:**
> *"Entiendo la preocupación. NEOMAAA no hace stop hunting — el dealing desk está supervisado por compliance y opera bajo política documentada. Dame el timestamp de tu orden y te genero el execution report para que veamos exactamente cómo se ejecutó. Si hay cualquier error del broker, lo compensamos."*

### 5.2 "El spread se abrió justo cuando iba a entrar"

**Qué NO hacer:** decir "es el mercado" sin más contexto.

**Qué hacer:**
1. Verificar horario: ¿coincide con un news event conocido? ¿rollover 22:00 GMT?
2. Mostrar data histórica de spread del instrumento en ese horario si está disponible
3. Si efectivamente fue un spread anormal sin causa de mercado: escalar a dealing, considerar compensación manual

**Frase modelo:**
> *"Todos los brokers tienen spread variable. Déjame ver exactamente qué instrumento y qué horario para confirmar si coincide con alguna ventana de widening conocida. Si fue algo raro, escalamos y revisamos."*

### 5.3 "No me dejan cerrar la posición"

**Posibles causas reales:**
1. **Server gap momentáneo** — todos los brokers lo tienen, duración típica segundos
2. **Margen insuficiente** — la plataforma MT5 bloquea cierre si no hay margen libre para cubrir la operación de cierre
3. **Instrumento en auction/halt** — el mercado subyacente está en subasta o suspendido

**Lo que NUNCA debería ser causa:** broker congelando la cuenta por razones arbitrarias. Si el cliente lo reporta y no hay explicación técnica clara, **escalar urgente a Pepe** — puede ser un bug del servidor MT5 o un problema real de conectividad con LP.

### 5.4 "Tengo requotes constantes"

**Checklist del soporte:**
1. ¿Qué instrumento? (exóticos tienen más requotes por diseño)
2. ¿Qué horario? (madrugada asiática = menos liquidez = más requotes)
3. ¿Qué tipo de cuenta? (Standard puede tener más que Raw)
4. ¿Qué volumen por orden? (tamaños muy grandes en instrumentos ilíquidos = requote casi garantizado)

Si el cliente está operando un exótico a las 3 AM GMT con tamaño grande → educar, no es un bug.
Si está operando EUR/USD a las 15:00 GMT con 1 lote y tiene requotes constantes → **escalar a dealing, hay algo raro**.

### 5.5 "Ustedes ganan cuando yo pierdo"

Esta es la objeción más delicada y la que más mal se responde en la industria.

**Qué NO decir:**
- "Somos 100% A-Book" (mentira)
- "Nunca ganamos con los clientes" (legalmente incorrecto)
- "Nuestro modelo de negocio es que vos ganes" (sutilmente falso)

**Qué decir:**
> *"NEOMAAA opera con modelo híbrido ECN/STP, como cualquier broker moderno. En parte del flow somos contraparte, en parte ruteamos a LPs — la política de ejecución está documentada y supervisada por compliance. El conflicto de interés estructural existe en toda la industria retail, por eso los reguladores exigen best execution. Lo importante: el precio que recibís es competitivo vs el mercado, y podés pedir execution report cuando quieras."*

Esa respuesta es **verdadera, técnica y honesta**. El cliente sofisticado la acepta. El cliente que busca excusas para salirse se va igual con cualquier respuesta.

---

## 6. Frases aprobadas

> [!SUCCESS]
> Estas 15 frases estan revisadas por Compliance y Dealing. Son de uso libre en soporte, ventas, webinars y material de marketing. Preferirlas a cualquier improvisacion.

Lista de frases revisadas por Compliance y Dealing. Se pueden usar en soporte, ventas, webinars, material de marketing y respuestas escritas.

1. *"NEOMAAA Markets opera con modelo híbrido ECN/STP usando múltiples liquidity providers para asegurar best execution."*
2. *"Nuestro dealing desk está supervisado por compliance y sigue la política de ejecución documentada en la Order Execution Policy."*
3. *"El spread se amplía durante noticias de alto impacto por comportamiento del mercado, no por decisión del broker."*
4. *"NEOMAAA aplica slippage simétrico — ejecutamos tanto positivo como negativo según las condiciones reales del mercado."*
5. *"Podés solicitar un execution report de cualquiera de tus operaciones — el dealing desk lo genera desde el servidor MT5."*
6. *"La Order Execution Policy es pública y está disponible en la sección legal del sitio para cualquier cliente."*
7. *"En cuentas Raw pagás spread institucional más una comisión fija. En cuentas Standard pagás el spread con markup sin comisión. El costo total es similar para operativas comparables."*
8. *"Trabajamos con múltiples liquidity providers para dar profundidad y estabilidad de precios incluso en horarios de menor liquidez."*
9. *"Ofrecemos cuentas islámicas swap-free para clientes que lo requieran por convicción religiosa."*
10. *"El rollover se procesa a las 22:00 GMT. Los miércoles se aplica triple swap para compensar el devengamiento del fin de semana."*
11. *"Los gaps de fin de semana son un fenómeno de mercado — el precio abre el domingo donde la liquidez lo permite, y los stops se ejecutan al primer precio disponible."*
12. *"Si hay cualquier error del broker en la ejecución, lo investigamos y compensamos. La política es resolver el reclamo legítimo, no esconderlo."*
13. *"El conflicto de interés estructural existe en todo broker retail del mundo — por eso los reguladores exigen best execution, y NEOMAAA cumple con ese estándar."*
14. *"Nuestra licencia (Anjouan L15968/N) nos obliga a documentar la política de ejecución y ponerla a disposición del cliente."*
15. *"Si tenés dudas sobre cómo se ejecutó una operación específica, mandanos el timestamp y te generamos el reporte de ejecución sin costo."*

---

## 7. Frases prohibidas

Estas frases son **prohibidas** en cualquier canal (soporte, ventas, webinars, social media, material impreso, email). Usarlas expone al broker a reclamos regulatorios, demandas civiles y pérdida de reputación.

> [!DANGER]
> Cada una de estas frases puede terminar en reporte a regulador o demanda del cliente. Son de uso **prohibido absoluto**.

- **"Somos 100% A-Book."** → Mentira. Ningún broker retail lo es. Si lo decís y el regulador audita, es causal directo de sanción.
- **"Nosotros nunca ganamos cuando el cliente pierde."** → Legalmente incorrecto. Incluso en un A-Book puro, el spread markup implica que el broker tiene un edge estructural vs el cliente.
- **"Tu stop saltó porque el mercado se movió, no puedo hacer nada."** → Respuesta robot. Hay que investigar, ofrecer execution report y escalar si corresponde.
- **"Los requotes son normales, aguantalos."** → Hay que diagnosticar, no mandar al cliente a masticar vidrio.
- **"Nuestro broker es mejor porque no hay conflicto de interés."** → Falso. El conflicto existe en toda la industria retail. La ventaja real es tener compliance serio y best execution documentada.
- **"Podemos garantizar ejecución sin slippage."** → Imposible. Ningún broker puede garantizar eso.
- **"Nuestros spreads son siempre los más bajos del mercado."** → Claim medible que el cliente va a verificar. Si no es exactamente cierto en cada momento, es publicidad engañosa.
- **"El dealing desk no existe, todo va directo al mercado."** → Falso. El dealing desk existe y se encarga, entre otras cosas, de supervisar la ejecución.
- **Cualquier afirmación numérica sobre ratios internos** ("70% va a LPs", "solo el 5% se internaliza", etc.) → Si no está en material oficial firmado por Compliance, no se dice.
- **Cualquier mención a nombres de liquidity providers específicos.** → Información confidencial comercial.

---

## 8. Escalamiento a dealing desk

El dealing desk no es inalcanzable. Pepe y su equipo existen justamente para resolver problemas que el soporte de primera línea no puede. Escalar bien es parte del trabajo.

### Cuándo escalar

| Situación | Escalar? | Quién |
|-----------|----------|-------|
| Cliente reporta slippage sistemáticamente mayor al promedio esperable | Sí | Support → Supervisor → Pepe |
| Execution report con datos que no cuadran | Sí | Support → Pepe directo |
| Reclamo por error de ejecución > $500 | Sí | Support → Supervisor → Pepe |
| Cliente amenaza con ir a regulador o redes sociales | Sí — urgente | Support → Supervisor → Pepe + Susana |
| Patrón de múltiples clientes con el mismo problema el mismo día | Sí — urgente | Quien detecte → Pepe + Angel |
| Posición no se puede cerrar sin causa técnica clara | Sí — urgente | Support → Pepe directo |
| Pregunta general sobre cómo funciona el broker | No | Responde con este documento |
| Cliente pide execution report | Sí — rutinario | Support lo solicita a Pepe vía ticket |

### Cómo escalar

**Canal oficial:** Telegram directo a Pepe para urgencias, ticket interno (vía CRM Skale) para rutina.

**Cadena por área:**
- **Support:** agente → supervisor de soporte → Pepe
- **Sales:** vendedor → Edward (Sales Lead) → Pepe
- **Partners:** IB manager → Angel → Pepe

**Tiempo de respuesta esperado:**
- Urgencias (cliente en reclamo activo, amenaza pública, múltiples clientes afectados): **<2 horas en horario operativo**
- Rutinas (execution report, consulta técnica): **<24 horas**

**Qué mandar al escalar:**
1. ID del cliente / cuenta MT5
2. Instrumento
3. Timestamp exacto (con zona horaria)
4. Precio solicitado vs precio ejecutado
5. Screenshot o export de la orden desde MT5
6. Conversación completa con el cliente (no parafrasear)
7. Qué pide el cliente (compensación, explicación, reporte, etc.)

> [!TIP]
> Cuanto más completo el escalamiento, más rápido lo resuelve Pepe. Escalamientos incompletos generan ida y vuelta de preguntas y retrasan la respuesta al cliente.

---

## 9. Transparencia con el cliente

La política de NEOMAAA en reclamos de ejecución es **compensar el reclamo legítimo** antes que generar un reclamo público. Un cliente enojado en redes sociales o ante un regulador cuesta más que cualquier compensación razonable.

### Lo que el cliente puede pedir

- **Execution report** de cualquiera de sus operaciones — Pepe lo genera desde el servidor MT5
- **Copia de la Order Execution Policy** — pública, en `legal/order-execution-policy.md` del sitio
- **Explicación del spread en un momento específico** — data histórica del broker
- **Aclaración sobre swap aplicado** — cálculo detallado del rollover
- **Proceso de reclamo formal** — documentado en `legal/complaint-handling.md`

### Principios

1. **No se esconden datos de ejecución.** Si el cliente los pide, se le dan. Punto.
2. **Mejor compensar que litigar.** Un reclamo de $200 por error de ejecución se compensa sin discusión. Litigarlo cuesta más en tiempo, reputación y carga operativa.
3. **Lo que no se puede divulgar, se dice que no se puede divulgar — con motivo.** "Confidencialidad comercial" es una respuesta legítima para preguntas sobre LPs, ratios de routing o datos operativos internos.
4. **La honestidad técnica escala mejor que la creatividad.** El cliente sofisticado premia la honestidad; el cliente principiante no distingue — así que la honestidad no cuesta nada y evita problemas en el 100% de los casos.

> [!INFO]
> Este documento se actualiza cada vez que cambie la Order Execution Policy o cuando Compliance identifique nuevas frases prohibidas o aprobadas. Última revisión por Pepe (Head of Dealing) y Susana (Compliance Officer): abril 2026.

---

**Documentos relacionados:**
- `legal/order-execution-policy.md` — Política de ejecución pública y completa
- `legal/complaint-handling.md` — Proceso formal de reclamos
- `operations/manual-crisis.md` — Protocolo si hay un incidente masivo de ejecución
- `compliance/workflow.md` — Workflow general de compliance
- `compliance/ab-book-policy.md` — **CONFIDENCIAL** — solo Pepe, Susana, Angel, Diego
