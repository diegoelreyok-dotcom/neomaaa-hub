# Cómo se forma el precio de mercado

> [!INFO]
> Este documento explica cómo se construye cada precio que ve un trader en MT5. Después de leerlo vas a entender por qué hay dos precios (bid y ask), por qué el spread se abre en ciertos momentos, qué pasa cuando hay slippage y por qué NEOMAAA puede ofrecer condiciones distintas según el tipo de cuenta.

El precio de un instrumento no es un número mágico que baja de una pizarra central. Es el resultado de miles de ofertas de compra y venta chocando entre sí, en tiempo real, en múltiples pools de liquidez distribuidos por todo el mundo. Si entendés cómo se arma, entendés el 80% de las preguntas que un cliente le puede hacer a soporte.

## Bid, Ask y Spread

En cualquier par o instrumento siempre hay **dos precios simultáneos**:

- **Bid** → el precio al que el mercado está dispuesto a **comprarte** a vos. Es decir, si vos querés **vender**, lo hacés al bid.
- **Ask** (o Offer) → el precio al que el mercado está dispuesto a **venderte** a vos. Si querés **comprar**, lo hacés al ask.

La diferencia entre ambos se llama **spread**, y es la primera forma de costo que paga cualquier trader.

### Ejemplo numérico — EUR/USD

Supongamos que en tu plataforma ves:

| Lado | Precio |
|------|--------|
| Bid  | 1.08542 |
| Ask  | 1.08545 |

El spread es `1.08545 - 1.08542 = 0.00003` → **0.3 pips**.

Si abrís una posición de **compra** (BUY) de 1 lote (100,000 EUR):

1. Entrás al ask → 1.08545
2. En el instante en que abriste, tu posición ya vale el bid → 1.08542
3. Estás en pérdida de 3 puntos = 0.3 pips = **USD 3**

Es por eso que toda posición "nace" en rojo: estás pagando el spread al entrar. Para estar en ganancia el precio tiene que moverse **a favor** más de lo que costó el spread.

## Qué es la liquidez y por qué importa

La liquidez es, simplemente, **cuánta gente está dispuesta a comprar y vender en un momento dado**, y con cuánto volumen. Cuando hay muchos participantes activos (bancos, fondos, market makers, retail), el order book está lleno de órdenes en cada nivel de precio: el spread es mínimo y podés mover tamaños grandes sin afectar el precio.

Cuando la liquidez baja, pasa lo opuesto: hay pocas órdenes, los niveles de precio quedan huecos, y cualquier orden razonable de tamaño "empuja" el precio varios puntos.

Analogía: la liquidez es el **agua en una pileta**. Si la pileta está llena (mucha liquidez), podés tirar una piedra y apenas hace ondas. Si está casi vacía (poca liquidez), la misma piedra hace un ruido enorme y salpica agua en todas direcciones.

### Momentos típicos de baja liquidez

| Momento | Por qué |
|---------|---------|
| Cierre de NY (21:00 GMT) | Termina la sesión americana, Asia todavía no entró con fuerza |
| Sesión asiática en pares europeos | EUR/GBP, por ejemplo, casi no se opera de madrugada Europa |
| Feriados bancarios de EEUU o UK | Se va la mitad del volumen global |
| Primeros minutos del domingo al abrir | Recién arrancan las mesas asiáticas |
| 30 segundos antes de una noticia de alto impacto | Los market makers retiran órdenes para no quedar pisados |

En todos estos momentos, el spread se **abre** (pasa de 0.3 pips a 2, 5 o incluso 20 pips en casos extremos), y la ejecución de órdenes a mercado puede venir con slippage.

## Market Makers, ECN y STP — tres modelos de ejecución

### Market Maker (Dealing Desk)

El broker **es la contraparte** del cliente. Cuando vos comprás, el broker "te vende" desde su propio libro. Si vos ganás, el broker pierde (y viceversa). Cotiza sus propios precios, suele tener spreads fijos más amplios, y gana con el spread + con las pérdidas de los clientes.

Problema típico: conflicto de interés. Si el 80% de los clientes pierde (lo cual es real), el broker gana el 80% de las veces que opera en contra.

### ECN (Electronic Communication Network)

El broker **conecta directamente** al cliente con un pool de liquidez global: bancos, fondos, otros brokers, otros traders. El precio que ve el cliente es el mejor bid/ask disponible en ese pool agregado. El broker no toma la otra punta: solo cobra una **comisión fija por lote** (ej. USD 3.5 por lado por lote).

Ventajas: spreads ultra ajustados (0.0–0.2 pips en majors), sin conflicto de interés, transparencia.
Contras: la comisión puede ser relevante para scalpers, y en momentos de muy baja liquidez el spread sí se abre (porque lo que ves es el mercado real).

### STP (Straight-Through Processing)

El broker recibe la orden del cliente y la **reenvía** directamente a uno o varios liquidity providers. No hay dealing desk ni intervención manual. El broker gana con un **markup** pequeño sobre el spread del LP (ej. el LP ofrece 0.1 pips, el broker muestra 0.5 pips al cliente).

En la práctica, STP y ECN se mezclan — muchos brokers se llaman "ECN/STP híbrido" porque agregan liquidez de múltiples LPs (comportamiento ECN) y la enrutan automáticamente (comportamiento STP). **NEOMAAA opera bajo este modelo híbrido ECN/STP.**

## Slippage: positivo y negativo

El slippage es la diferencia entre el precio al que **pediste** ejecutar una orden y el precio al que **efectivamente** se ejecutó.

### Slippage negativo (en contra del trader)

> [!EXAMPLE]
> Pedís comprar EUR/USD a mercado cuando el ask está en 1.08545. Entre que apretaste "Buy" y la orden llegó al LP, el precio saltó a 1.08560. Te ejecutan ahí.
> **Slippage negativo = 15 puntos = USD 15 de costo extra en 1 lote.**

Ocurre típicamente en:
- Órdenes de stop loss durante movimientos violentos
- Ejecución durante noticias de alto impacto
- Gaps de fin de semana

### Slippage positivo (a favor del trader)

El precio mejora entre que enviaste la orden y se ejecutó. Pasa menos seguido pero pasa, y un broker honesto te lo pasa entero al cliente (NEOMAAA tiene política de slippage simétrico: el cliente recibe el slippage positivo cuando existe).

## Gap de mercado

El forex cierra de viernes 22:00 GMT a domingo 22:00 GMT. Durante esas 48 horas, **el mundo sigue moviéndose**: pasa una elección, un atentado, un default de un país, y el lunes el precio abre en un nivel muy distinto al del cierre.

> [!EXAMPLE]
> EUR/USD cierra el viernes en 1.0850. El domingo, resultado electoral sorpresa en Francia. Lunes abre en 1.0720.
> Hay un "gap" de 130 pips.
> Si un cliente tenía un stop loss en 1.0830, **no se ejecutó en 1.0830**: se ejecutó en el primer precio disponible del lunes, es decir, 1.0720. El cliente perdió 110 pips **extra** que no previó.

Este es uno de los riesgos más difíciles de explicar al cliente retail y es responsabilidad de soporte saberlo explicar sin defenderse: fue un evento de mercado, no un error del broker.

## Profundidad de mercado (DOM)

El DOM (Depth of Market) es una vista que muestra, para cada nivel de precio por encima del ask y por debajo del bid, cuánto volumen hay pendiente para ejecutar.

Un trader institucional no mira solo bid/ask: mira la "escalera" completa. Si ve que en el ask 1.08545 hay 2 millones de EUR, pero en 1.08550 hay 50 millones, sabe que hay una muralla de oferta ahí. Eso le dice dónde es probable que el precio se frene, y dónde probablemente haya un "barrido" de stops.

El trader retail típico no tiene esta info (MT5 sí muestra DOM parcial pero pocos lo usan). Entender que **existe** es importante para contextualizar por qué el precio se mueve como se mueve.

## Por qué NEOMAAA puede ofrecer spreads más ajustados en ciertas cuentas

Los spreads que ve un cliente no son fijos: dependen del tipo de cuenta y del modelo de costo que elige.

| Cuenta | Spread típico EUR/USD | Comisión | Lógica |
|--------|----------------------|----------|--------|
| Standard | desde 1.2 pips | USD 0 | El costo va dentro del spread |
| Raw / ECN | desde 0.0 pips | [DATO: pedir a Pepe/Dealing — ej. USD 3.5/lado/lote] | El spread es el del LP, el broker cobra aparte |

### Ejemplo: 1 lote EUR/USD ida y vuelta

**Cuenta Standard:**
- Spread promedio ~1.2 pips en entrada = USD 12
- Sin comisión
- **Costo total ida y vuelta: ~USD 12**

**Cuenta Raw:**
- Spread promedio ~0.1 pips = USD 1
- Comisión [DATO: pedir a Pepe/Dealing] — asumiendo USD 7 ida y vuelta
- **Costo total ida y vuelta: ~USD 8**

Para scalpers y traders de alta frecuencia, la cuenta Raw es más barata. Para traders de swing que operan pocas veces al día, la Standard puede ser más simple. Conocer esta diferencia es clave para que ventas y soporte orienten al cliente al producto correcto.

## Lo que tiene que saber soporte sí o sí

> [!TIP]
> - Spread = diferencia entre bid y ask. Se mide en pips. Es el primer costo del trade.
> - Liquidez baja → spread abre. Es mercado, no es el broker "inventando".
> - Slippage en noticias o en stops durante movimientos fuertes es normal. No es un bug.
> - Gap de fin de semana puede ejecutar stops muy lejos del nivel original. El cliente tiene que saberlo antes de operar.
> - Raw/ECN tiene spreads bajos + comisión; Standard tiene spreads más altos + cero comisión. Son dos formas de cobrar lo mismo, con ventajas distintas según el estilo.
