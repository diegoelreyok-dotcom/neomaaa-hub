# MT5 y productos de NEOMAAA — Guía técnica para todo el equipo

> [!INFO]
> MT5 (MetaTrader 5) es la plataforma donde opera 100% de nuestros clientes. Si no la entendés, no podés hacer soporte, ventas ni retención. Este documento cubre lo que tiene que saber cualquier persona del equipo, sin importar su rol.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="2,000+" data-label="Instrumentos"></div>
<div className="neo-stat" data-value="4" data-label="Tipos de cuenta"></div>
<div className="neo-stat" data-value="1:1000" data-label="Leverage máximo"></div>
<div className="neo-stat" data-value="24/5" data-label="Mercados activos"></div>
</div>

## MT5 vs MT4 — ¿por qué NEOMAAA usa MT5?

MetaTrader 4 salió en 2005. Fue (y sigue siendo) el estándar de facto en forex retail. MetaTrader 5 salió en 2010, pero tardó una década en desplazar a su antecesor. Hoy, brokers nuevos eligen MT5 por razones concretas.

| Característica | MT4 | MT5 |
|----------------|-----|-----|
| Clases de activos | Forex + CFDs básicos | Forex + CFDs + futuros + stocks + cripto |
| Tipos de órdenes | 4 | 6 (agrega Buy Stop Limit y Sell Stop Limit) |
| Timeframes | 9 | 21 |
| Depth of Market | No | Sí |
| Calendario económico integrado | No | Sí |
| Hedging y Netting | Solo hedging | Ambos |
| Lenguaje de programación | MQL4 | MQL5 (más potente) |
| Multithreading en backtesting | No | Sí |
| Regulación friendly | Menos | Más (cumple mejor con NBP, reporte, etc.) |

**NEOMAAA elige MT5** por: mejor soporte regulatorio, DOM nativo, compatibilidad con stocks y cripto CFDs sin forzar el sistema, y porque es la plataforma que MetaQuotes sigue desarrollando (MT4 está en mantenimiento).

## Tipos de cuenta (GOLD SOURCE)

> [!WARNING]
> **Esta es la tabla maestra de tipos de cuenta de NEOMAAA.** Cualquier doc del portal (FAQ ventas, objeciones, soporte, marketing, training) que mencione Cent / Standard / Raw / Institutional debe linkear aqui. Ante discrepancia, esta tabla prevalece.

NEOMAAA ofrece **4 tipos de cuenta** diseñados para perfiles distintos de trader. El cliente elige al abrir la cuenta y puede tener varias cuentas de distintos tipos bajo el mismo login de Client Portal.

| Cuenta | Depósito mínimo | Spread (desde) | Comisión | Leverage máx | Ideal para |
|--------|----------------|----------------|----------|--------------|------------|
| **Cent** | $5 | 1.0 pip | $0 (incluida en spread) | 1:1000 | Principiantes, demo real, probar estrategia con riesgo mínimo |
| **Standard** | $50 | 1.0 pip | $0 (incluida en spread) | 1:1000 | Trader retail regular, volumen moderado |
| **Raw** | $500 | 0.0 pips | $3/lote/lado ($6 round-turn) | 1:500 | Scalpers, algos, traders activos que priorizan spread bajo |
| **Institutional** | $50,000 | 0.0 pips | Custom (negociable) | Negociable | Fondos, money managers, clientes institucionales |

**Diferencia clave Standard vs Raw:**
- Standard: sin comisión, spread mayor (1.0 pip típico en EURUSD). Costo total ≈ $10/lote.
- Raw: spread casi cero + comisión fija $3/lado. Costo total ≈ $6/lote en instrumentos liquidos. Más barato para volumen alto.

**Cuenta Cent — nota técnica:**
En la cuenta Cent los lotes están expresados en centavos: 1 lote Cent = 1,000 unidades (no 100,000). Permite operar con tamaños muy pequeños y ver el P&L magnificado (útil para educar). No es recomendable para traders serios porque el volumen nocional es bajo.

**Cambio de tipo de cuenta:**
El cliente NO puede convertir una cuenta existente. Debe abrir una segunda cuenta del tipo nuevo y transferir fondos internamente (instantáneo desde Client Portal).

> [!INFO]
> Depósitos mínimos, spreads, comisiones y leverage máximos son valores oficiales vigentes a abril 2026. Cualquier cambio requiere aprobación de Pepe (Dealing) + Susana (Compliance) y actualización simultánea de este doc + landing pages.

## Instrumentos disponibles en NEOMAAA

NEOMAAA ofrece **2,000+ instrumentos** agrupados en 8 categorías (confirmado en neomaaa.com):

- Forex (CFDs de divisas)
- Metales
- Índices
- Commodities
- Cryptocurrencies (CFDs)
- **Stocks CFDs** (acciones individuales) — confirmado como asset class oficial en neomaaa.com
- **ETFs** (fondos cotizados vía CFD) — confirmado como asset class oficial en neomaaa.com
- Energies (WTI, Brent, NatGas)

Detalle por categoría:

### 1. Forex

| Subcategoría | Ejemplos | Spread típico |
|--------------|----------|---------------|
| Majors | EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD | 0.0–1.5 pips |
| Minors / crosses | EUR/GBP, EUR/JPY, GBP/JPY, AUD/NZD | 0.8–3 pips |
| Exóticos | USD/MXN, USD/ZAR, USD/TRY, EUR/TRY, USD/HKD, USD/SGD | 10–50 pips |

### 2. Metales

- **XAU/USD** (oro vs dólar) — el instrumento más tradeado después de EUR/USD.
- **XAG/USD** (plata vs dólar) — muy volátil.
- **XPT/USD** (platino) y **XPD/USD** (paladio) — disponibles pero baja liquidez.

### 3. Índices

Contratos por diferencia sobre índices bursátiles. No son los futuros reales; son CFDs referenciados al índice.

| Símbolo | Qué representa | Sesiones clave |
|---------|----------------|----------------|
| SPX500 / US500 | S&P 500 | NY 14:30–21:00 GMT |
| NAS100 / US100 | Nasdaq 100 | NY 14:30–21:00 GMT |
| US30 / DJI | Dow Jones 30 | NY 14:30–21:00 GMT |
| GER40 / DE40 | DAX alemán | Frankfurt 08:00–16:30 GMT |
| UK100 | FTSE 100 | Londres 08:00–16:30 GMT |
| JP225 | Nikkei | Tokio 00:00–06:00 GMT |

### 4. Commodities

- **USOil / WTI** — crudo americano.
- **UKOil / Brent** — crudo europeo.
- **NatGas** — gas natural (altísima volatilidad).

### 5. Crypto CFDs

CFDs sobre cripto, **no** cripto real. El cliente no recibe el activo; es especulación sobre el precio.

- BTC/USD, ETH/USD, XRP/USD, LTC/USD, BCH/USD, SOL/USD [DATO: confirmar lista completa con Pepe/Dealing].
- 24/7 (no cierran los fines de semana).
- Spreads más altos que forex — volatilidad compensa.

### 6. Stocks CFDs

Acciones individuales vía CFD. El cliente no compra la acción real (sin derecho a voto, sin dividendos como accionista — aunque sí hay ajuste de dividendos en la posición CFD). Confirmado en neomaaa.com como asset class oficial.

- FAANG (Meta, Apple, Amazon, Netflix, Google/Alphabet), grandes tech (Microsoft, NVIDIA, Tesla).
- Bancos US (JPMorgan, Bank of America, Citi, Goldman Sachs).
- Empresas europeas principales (LVMH, SAP, Siemens, Nestlé, Shell).
- Trading en horario de la bolsa correspondiente (NYSE/NASDAQ 14:30–21:00 GMT; bolsas EU 08:00–16:30 GMT aprox).
- [DATO: lista exacta de tickers disponibles — confirmar con Pepe/Dealing].

### 7. ETFs (Exchange-Traded Funds) vía CFD

Fondos cotizados operados como CFD. Confirmado en neomaaa.com como asset class oficial.

- Índices amplios: SPY (S&P 500), QQQ (Nasdaq 100), DIA (Dow 30), IWM (Russell 2000).
- Sectoriales: XLF (financieros), XLE (energía), XLK (tech), XLV (salud).
- Geográficos: EEM (emergentes), FXI (China), EWZ (Brasil), VGK (Europa).
- Commodities ETFs: GLD (oro), SLV (plata), USO (petróleo).
- [DATO: lista exacta de ETFs disponibles — confirmar con Pepe/Dealing].

### 8. Energies

Instrumentos de energía, CFDs sobre futuros de energía.

- **USOil / WTI** — crudo americano.
- **UKOil / Brent** — crudo europeo.
- **NatGas** — gas natural (altísima volatilidad).
- [DATO: si hay otros contratos como heating oil, gasoline].

## Leverage — Cómo funciona realmente

> [!WARNING]
> **Desmitificación.** El leverage NO multiplica tu capital. No te da "poder de compra extra". Lo que hace el leverage es **reducir el requisito de margen** por un factor de 1/leverage. Es un concepto de margen, no de multiplicación.

La frase "con $250 y leverage 1:500 controlás $125,000" es engañosa. Lo correcto: con $250 de margen libre podés abrir una posición cuyo tamaño nocional no exceda el margen × leverage disponible.

### Ejemplo real — 1 lote EUR/USD

- 1 lote EUR/USD = 100,000 EUR nocionales.
- Si EUR/USD cotiza a 1.15 → valor nocional ≈ **USD 115,000**.
- **Sin leverage:** necesitás USD 115,000 para abrir esa posición.
- **Con leverage 1:500:** margen requerido = 115,000 / 500 = **USD 230**.
- Con USD 230 de margen libre inmovilizado podés abrir ese lote. El "poder de compra" de la posición sigue siendo USD 115,000 (notional) — lo que cambia es lo que inmovilizás de tu cuenta.

Fórmula general:

<div className="neo-formula">Margen requerido = Tamaño nocional / Leverage</div>

### Leverage típico por tipo de instrumento

| Instrumento | Leverage máximo típico (offshore) | Leverage Tier 1 retail (FCA/ESMA) |
|-------------|-----------------------------------|-----------------------------------|
| Forex majors | 1:500 | 1:30 |
| Forex minors / exóticos | 1:200 | 1:20 |
| Metales (oro, plata) | 1:200 | 1:20 |
| Índices mayores | 1:100 | 1:20 |
| Índices menores | 1:50 | 1:10 |
| Commodities (oil, gas) | 1:100 | 1:10 |
| Crypto CFDs | 1:20 | 1:2 |
| Stocks CFDs | 1:10 | 1:5 |

### Por qué al broker le importa el leverage

- El broker **provee el leverage que recibe de su LP** (liquidity provider). No lo inventa.
- **Leverage alto → cliente abre con menos depósito → broker recibe menos capital.** Menos float, menos cushion.
- **Leverage alto → cliente pierde más rápido** (menor margen libre frente al mismo movimiento adverso) → aumenta el churn y el riesgo operativo/reputacional del broker.
- Por eso los reguladores **Tier 1 (FCA, ESMA, ASIC)** limitan el leverage retail a **1:30** en forex major — no para proteger al broker, sino al cliente retail del wipeout rápido.
- Offshore (Anjouan, SVG, Vanuatu) el leverage alto es legal y comercialmente atractivo para retail. NEOMAAA opera bajo este modelo.

## Tipos de órdenes en MT5

### Órdenes a mercado

**Market Order (Buy / Sell)** — se ejecuta **al precio actual disponible**. Bid si vendés, ask si comprás. Incluye el slippage potencial si el mercado está en movimiento.

### Órdenes pendientes

Son órdenes que esperan que el precio llegue a un nivel, y solo ahí se ejecutan.

| Tipo | Cuándo se usa |
|------|---------------|
| **Buy Limit** | Querés comprar **por debajo** del precio actual (pensás que va a bajar y rebotar). |
| **Sell Limit** | Querés vender **por encima** del precio actual (pensás que va a subir y caer). |
| **Buy Stop** | Querés comprar **por encima** del precio actual (confirmación de breakout alcista). |
| **Sell Stop** | Querés vender **por debajo** del precio actual (confirmación de breakout bajista). |
| **Buy Stop Limit** | Combinación: cuando el precio toque X, coloca un Buy Limit en Y. Solo MT5. |
| **Sell Stop Limit** | Idem al revés. Solo MT5. |

### Gestión de riesgo asociada a cada orden

- **Stop Loss (SL)** — nivel de pérdida máxima aceptada. Se adjunta a la orden principal.
- **Take Profit (TP)** — nivel de ganancia objetivo. Se adjunta a la orden principal.
- **Trailing Stop** — un stop que se mueve automáticamente a favor de la posición cuando esta gana. No se mueve en contra. **Importante**: en MT5 el trailing stop se ejecuta en el lado del cliente (depende de que MT5 esté abierto), a diferencia del SL que vive en el servidor del broker.

## Contract specs — qué significa cada campo

Cada instrumento tiene una "hoja técnica" que define cómo funciona. Ejemplo para EUR/USD:

| Campo | Valor típico | Qué significa |
|-------|--------------|---------------|
| Symbol | EURUSD | Nombre del par |
| Contract size | 100,000 EUR | 1 lote estándar = 100,000 unidades de la base |
| Tick size | 0.00001 | Incremento mínimo de precio |
| Pip value (1 lote) | USD 10 | Cuánto mueve el PnL por cada pip |
| Leverage | hasta 1:1000 | Margen requerido vs tamaño de posición |
| Margin per lot (1:500) | USD 216 | Ejemplo con precio 1.08 y leverage 1:500 |
| Swap long | –0.5 points/día | Cuánto pagás/cobrás si dejás un lote comprado overnight |
| Swap short | +0.2 points/día | Idem para posición vendida |
| Triple swap day | Miércoles | Día que se cobra 3x swap (por el fin de semana) |
| Commission | USD 0 (Cent/Standard) / USD 6 round-turn (Raw: $3/lote/lado) | Cobro por volumen |
| Session | Lun 22:00 – Vie 22:00 GMT | Horarios de mercado |

## Ejemplo numérico — abrir 0.1 lote de EUR/USD

Supongamos:
- Precio actual EUR/USD: **1.0850**
- Leverage cuenta: **1:500**
- Tamaño de orden: **0.1 lote** = 10,000 EUR
- Cuenta denominada en **USD**

### Margin requerido

`Margin = (Tamaño × Precio) / Leverage`
`Margin = (10,000 × 1.0850) / 500 = USD 21.70`

Con USD 21.70 de margen, el cliente controla 10,000 EUR (USD 10,850) de valor nocional.

### Valor por pip

Para 0.1 lote de EUR/USD: **USD 1 por pip**.
Si el precio sube 50 pips → +USD 50 de ganancia.
Si el precio baja 30 pips → –USD 30 de pérdida.

### Swap overnight

Asumiendo swap long de –0.5 puntos/día, 0.1 lote:
Costo diario ≈ –0.5 × 0.1 × USD pip value ≈ –**USD 0.05/día**.
Para 7 días: –USD 0.35.
Los miércoles se cobra 3x (triple swap) para cubrir el fin de semana (sábado y domingo los swaps se acumulan porque los bancos no operan, pero el cálculo se asienta los miércoles).

## Horarios de mercado — las 4 sesiones

El forex opera 24/5. Se divide en 4 sesiones que se solapan parcialmente.

| Sesión | Horario GMT | Características |
|--------|-------------|-----------------|
| Sídney | 22:00 – 07:00 | Baja liquidez. Poca volatilidad salvo eventos asiáticos. |
| Tokio | 00:00 – 09:00 | Domina pares con JPY. AUD/USD activo. |
| Londres | 08:00 – 17:00 | Mayor volumen global. Movimientos grandes en EUR, GBP, CHF. |
| Nueva York | 13:00 – 22:00 | Segundo volumen. Solapa con Londres 13:00–17:00 (oro!). |

**Solapamiento Londres–NY (13:00–17:00 GMT)** es el momento de máxima liquidez global, spreads más ajustados, y mayor volumen. Es cuando la mayoría de setups intradía funcionan mejor.

Tras el cierre de NY y antes de Tokio (21:00–00:00 GMT): **valle de liquidez**. Spreads se abren. No es buen momento para entrar a mercado.

## Copy Trading vía MQL5 Signals

> [!INFO]
> NEOMAAA **no opera un sistema propio de copy trading**. El copy trading disponible para nuestros clientes es el sistema nativo de MT5: **MQL5 Signals**, el marketplace oficial de MetaQuotes. Link oficial: https://www.mql5.com/en/signals

### Cómo funciona (pasos)

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Abrir cuenta real"><div>Un trader abre su cuenta NEOMAAA real y opera en MT5.</div></div>
<div className="neo-step" data-num="2" data-title="Publicar señal"><div>Habilita la cuenta como <strong>proveedor de señal</strong> y la publica en <a href="https://www.mql5.com/en/signals">MQL5 Signals</a>. Puede cobrar una <strong>suscripción mensual</strong> (el precio lo pone el proveedor; MetaQuotes se queda con una parte).</div></div>
<div className="neo-step" data-num="3" data-title="Suscripción"><div>Otros clientes NEOMAAA (u otros brokers que usan MT5) se <strong>suscriben</strong> a esa señal desde su propio MT5.</div></div>
<div className="neo-step" data-num="4" data-title="Copia proporcional"><div>Las órdenes del proveedor se <strong>copian proporcionalmente al balance</strong> de cada suscriptor.</div></div>
</div>

El proveedor no ve las cuentas de los suscriptores; los suscriptores no ven la estrategia ni el sizing absoluto del proveedor. Todo lo maneja MetaQuotes via su infraestructura MQL5.

### Para comunidades e influencers

Patrón frecuente: un influencer quiere "setupar su cuenta en NEOMAAA y que su audiencia deposite y copie sus trades".

- **Forma correcta (lo que se puede hacer hoy):**
  1. El influencer crea su cuenta NEOMAAA.
  2. Publica su señal en MQL5 Signals.
  3. Su audiencia se registra en NEOMAAA (funnel de IB si está afiliado) y **se suscribe desde su propio MT5** a la señal del influencer.
  4. Cada follower controla su propia cuenta, su propio riesgo, su propia suscripción.

- **Forma incorrecta (lo que NEOMAAA NO hace):**
  - Un sistema centralizado donde NEOMAAA gestiona automáticamente el copy de un influencer hacia sus followers — eso sería **MAM o PAMM**, y **NEOMAAA no ofrece MAM/PAMM actualmente**.

### Riesgos del modelo

> [!WARNING]
> - Si el proveedor tiene una mala racha, cada suscriptor pierde proporcionalmente.
> - El suscriptor **no controla** la estrategia — solo decide cuánto capital asignar y si desuscribirse.
> - Las comisiones de NEOMAAA se aplican normalmente sobre cada trade copiado (cada follower paga su propio spread/commission en su cuenta).

## Features avanzadas de MT5

### Expert Advisors (EAs)

Son **programas automatizados** que operan sin intervención humana, según lógica programada en MQL5. El cliente los puede comprar en el Market de MetaQuotes o programarlos.

Consideraciones:
- El EA corre en la PC del cliente, si se apaga MT5, el EA deja de operar.
- Para operar 24/5 sin interrupciones, el cliente necesita un **VPS** (servidor virtual). NEOMAAA puede ofrecer VPS gratuito en cuentas de cierto nivel [DATO: confirmar condiciones con Pepe/Dealing].
- Los EAs son el origen de muchas reclamaciones: cliente "lo programó mal", la volatilidad lo reventó, o cargó uno sin entenderlo.

### Indicadores personalizados

MT5 viene con 30+ indicadores nativos (RSI, MACD, Bollinger Bands, etc.). Los traders pueden descargar o comprar miles más del Market.

### MultiTerminal

Permite a un trader (o manager de cuentas) operar **múltiples cuentas simultáneamente** con un solo clic. Útil para account managers que manejan capital de varios clientes (esto toca regulación — en NEOMAAA hay que revisar con compliance antes de activar).

## Plataformas de acceso

El cliente puede acceder a su cuenta desde:

| Plataforma | Cuándo recomendarla |
|-----------|---------------------|
| **MT5 Desktop** (Windows / Mac nativo o vía wrapper) | Trader principal. Full features. |
| **MT5 WebTrader** (navegador) | Acceso rápido desde cualquier PC. Sin instalar. Limitaciones: no corre EAs. |
| **MT5 Mobile iOS** | Monitoreo y trading básico. Buena ergonomía en iPad. |
| **MT5 Mobile Android** | Idem Android. |

Todas las plataformas usan el mismo login (número de cuenta + server + password). El cliente puede estar logueado en varias simultáneamente.

## Errores y conceptos que soporte escucha seguido

| Mensaje / queja | Qué significa |
|-----------------|---------------|
| "Off quotes" | El precio se movió entre que pediste y el servidor procesó. Reintentar. |
| "Requote" | El broker devuelve un nuevo precio; el cliente decide si acepta. |
| "Not enough money" | No hay margen libre suficiente. Reducir tamaño o cerrar otras posiciones. |
| "Market closed" | Instrumento fuera de su sesión. Esperar. |
| "Invalid stops" | Stop loss/take profit demasiado cerca del precio (hay una distancia mínima por instrumento). |
| "No connection" | Desconexión del servidor. Problema de red del cliente, no nuestro. |
| "Trade disabled" | Compliance o Dealing bloqueó la cuenta. Escalar. |

## Resumen operativo

> [!TIP]
> - MT5 es nuestra plataforma única. Cliente accede desde desktop, web, o móvil.
> - 2,000+ instrumentos: forex, metales, índices, commodities, cripto CFDs, stocks CFDs.
> - Órdenes: mercado + 6 tipos pendientes + SL/TP/Trailing.
> - Lote estándar = 100,000 unidades. 0.1 lote = 10,000 unidades = ~USD 1 por pip en majors.
> - Margen = (tamaño × precio) / leverage. Con 1:500, 0.1 lote EUR/USD requiere ~USD 22.
> - Sesión de máxima liquidez: solapamiento Londres–NY (13:00–17:00 GMT).
> - Swap = costo overnight. Miércoles es triple swap.
> - EAs, VPS, copy trading (MQL5 Signals), indicadores: features de MT5 que el cliente avanzado pregunta.
> - Leverage = reductor de margen (1/N), no multiplicador de capital. Con 1:500, 1 lote EUR/USD pide ~USD 230 de margen.
> - Copy trading = vía MQL5 Signals (sistema nativo MetaQuotes). NEOMAAA NO ofrece MAM/PAMM actualmente.
> - Si soporte recibe una queja de ejecución: primero revisar timestamp, precio, spread en ese momento, tipo de orden. Los datos objetivos resuelven el 80% de las quejas.

> [!INFO]
> Información técnica verificada con Pepe (Head of Dealing NEOMAAA).
