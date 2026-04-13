# ABC del Broker — Enciclopedia NEOMAAA

> Todo lo que el equipo necesita saber para operar como broker. Si tienes una duda, busca aqui primero.

---

## A

### A-Book
Modelo de ejecucion donde el broker envia las ordenes del cliente directamente al mercado (liquidity provider). El broker gana solo con comisiones/spread markup, no con las perdidas del cliente. Opuesto a B-Book.

### Account Types (Tipos de Cuenta)
NEOMAAA ofrece 4 tipos:

| Cuenta | Deposito Minimo | Spread | Comision | Ideal para |
|--------|----------------|--------|----------|------------|
| **Cent** | $5 | Desde 1.0 pip | $0 | Principiantes, probar la plataforma |
| **Standard** | $50 | Desde 1.0 pip | $0 | Traders retail regulares |
| **Raw** | $500 | Desde 0.0 pips | $3/lote/lado | Traders activos, scalpers |
| **Institutional** | $50,000 | Desde 0.0 pips | Custom | Fondos, gestores, institucionales |

### AML (Anti-Money Laundering)
Politicas contra lavado de dinero. Obligatorio por regulacion. Susana es responsable. Incluye: verificacion de origen de fondos, monitoreo de transacciones sospechosas, reportes a la AOFA.

### AOFA (Anjouan Offshore Finance Authority)
Nuestro regulador. Emitio la licencia L15968/N a Neomaaa Ltd. Supervisa cumplimiento de regulaciones financieras offshore.

### Ask Price
Precio al que puedes COMPRAR un instrumento. Siempre es el precio mas alto del par bid/ask.

---

## B

### B-Book
Modelo donde el broker actua como contraparte del cliente. El broker "absorbe" la orden internamente sin enviarla al mercado. El broker gana cuando el cliente pierde y viceversa. Se usa para ordenes pequenas o flow predecible.

### Balance
Dinero total en la cuenta del cliente, sin contar posiciones abiertas. Diferente al Equity.

### Bid Price
Precio al que puedes VENDER un instrumento. Siempre es el precio mas bajo del par bid/ask.

### Broker
Intermediario financiero que permite a los clientes operar instrumentos financieros (forex, acciones, crypto, etc.) a traves de una plataforma. Eso somos nosotros.

---

## C

### CFD (Contract for Difference)
Contrato derivado que permite especular sobre el precio de un activo sin poseerlo. La mayoria de nuestros instrumentos son CFDs. El cliente gana o pierde la diferencia entre precio de entrada y salida.

### Client Portal
La interfaz web donde el cliente:
- Se registra y crea su cuenta
- Sube documentos para KYC
- Deposita y retira fondos
- Accede a MT5
- Ve su historial de operaciones

### Commission (Comision)
Cargo fijo por operacion. Solo aplica en cuenta Raw ($3/lote/lado = $6 round trip). Las cuentas Cent y Standard no tienen comision — el costo esta incluido en el spread.

### Compliance
Departamento que asegura que operamos dentro de la ley. Responsable: Susana. Incluye: KYC, AML, monitoreo de actividad sospechosa, restricciones por pais, frases que NO podemos decir.

### Copy Trading
Funcion que permite a un cliente copiar automaticamente las operaciones de otro trader. NEOMAAA lo ofrece como feature especial.

### CRM (Customer Relationship Management)
Sistema para gestionar leads y clientes. Usamos Skale CRM. Aqui se trackea: estado del lead, KYC, depositos, agente asignado, notas de llamadas.

### Cross Rate
Par de divisas que no incluye USD. Ejemplo: EUR/GBP, AUD/JPY.

---

## D

### Dealing Desk
Area operativa donde se gestionan las ordenes y la exposicion del broker. Responsable: Pepe. Decide que se envia al mercado (A-Book) y que se queda interno (B-Book).

### Demo Account
Cuenta con dinero virtual para practicar. El cliente puede operar sin riesgo. Utili para capacitacion de sales tambien.

### Deposit (Deposito)
Fondos que el cliente envia a su cuenta de trading. Aceptamos 120+ metodos: Visa/MC, crypto (USDT), PIX, PSE, OXXO, Nequi, Yape, Mercado Pago, Western Union, transferencia bancaria.

---

## E

### ECN (Electronic Communication Network)
Red electronica que conecta a compradores y vendedores directamente. Nuestro modelo es ECN/STP hibrido — las ordenes van al pool de liquidez de nuestros LPs.

### Equity
Balance + ganancias/perdidas de posiciones abiertas. Si tienes $1,000 de balance y una posicion abierta con -$200, tu equity es $800.

### Execution (Ejecucion)
El proceso de completar una orden. Puede ser:
- **Market Execution**: al precio disponible en el momento (nuestro modelo)
- **Instant Execution**: al precio exacto solicitado (con posibles recotizaciones)

---

## F

### FTD (First Time Deposit)
Primer deposito de un cliente. Es la metrica MAS importante para ventas. Un lead se convierte en "cliente" cuando hace su FTD.

### Forex (Foreign Exchange)
Mercado de divisas. El mercado financiero mas grande del mundo (~$7.5 trillones/dia). Pares como EUR/USD, GBP/USD, USD/JPY.

### Free Margin
Equity menos el margen usado. Es el dinero disponible para abrir nuevas posiciones o absorber perdidas.

---

## G

### Gap
Salto brusco en el precio, generalmente al abrir el mercado los domingos (para forex). Peligroso para posiciones con stop loss ajustado.

---

## H

### Hedging
Abrir una posicion opuesta para reducir riesgo. Ejemplo: si tienes 1 lote long EUR/USD, abres 1 lote short EUR/USD. MT5 permite hedging.

---

## I

### IBC (International Business Company)
Tipo de entidad juridica. Neomaaa Ltd esta registrada como IBC 15968 en Anjouan.

### Intercom
Plataforma de soporte al cliente. Usamos Intercom para:
- Chat en vivo en el sitio web
- Tickets de soporte
- Respuestas automatizadas
- Routing de conversaciones (ES/EN)

---

## K

### KYC (Know Your Customer)
Proceso de verificacion de identidad del cliente. Obligatorio antes de permitir depositos/retiros. Usamos Sumsub. Requiere:
1. Documento de identidad (pasaporte, DNI, licencia)
2. Comprobante de domicilio (utility bill, estado de cuenta)
3. Selfie con documento (dependiendo del nivel de riesgo)

**Estados de KYC:**
- **Approved** — puede operar y depositar/retirar
- **Retry** — documentos rechazados, puede reintentar
- **Rejected** — rechazado definitivamente, escalar a Susana

---

## L

### Leverage (Apalancamiento)
**Reductor del requisito de margen** por un factor de 1/N. **NO es un multiplicador de tu capital.** Con leverage 1:500, el margen requerido para abrir una posicion = valor nocional / 500. Ejemplo correcto: 1 lote EUR/USD representa ~USD 115,000 nocionales; con 1:500 necesitas solo **USD 230 de margen libre** para abrirlo. El "poder de compra" de la posicion sigue siendo el nocional (USD 115,000), lo que cambia es cuanto de tu cuenta queda inmovilizado. Mayor leverage = menor margen requerido = menor colchon antes del stop out. El broker provee el leverage que recibe de su LP. Reguladores Tier 1 (FCA, ESMA) limitan el leverage retail a 1:30 en forex major para proteger al cliente del wipeout rapido.

| Cuenta | Apalancamiento maximo |
|--------|----------------------|
| Cent | Hasta 1:1000 |
| Standard | Hasta 1:1000 |
| Raw | Hasta 1:500 |
| Institutional | Custom |

> **CUIDADO en ventas:** Nunca prometas que el apalancamiento garantiza ganancias. Siempre mencionar que "mayor apalancamiento = mayor riesgo".

### Liquidity Provider (LP)
Instituciones financieras que nos proveen precios y liquidez. Nuestras ordenes A-Book se envian a los LPs.

### Lot
Unidad de medida para el tamano de una operacion.
- **Standard Lot**: 100,000 unidades de la moneda base
- **Mini Lot**: 10,000 unidades (0.1 lotes)
- **Micro Lot**: 1,000 unidades (0.01 lotes)

---

## M

### Margin
Cantidad de dinero requerida como "garantia" para abrir una posicion apalancada. Se calcula segun el tamano de la posicion y el apalancamiento.

### Margin Call
Alerta cuando el equity cae a un nivel peligroso respecto al margen usado. El cliente debe depositar mas o cerrar posiciones.

### Margin Level
(Equity / Margen Usado) x 100. Si cae por debajo de cierto nivel (generalmente 50%), se activa el Stop Out.

### MetaTrader 5 (MT5)
Nuestra plataforma de trading. Software de MetaQuotes que permite:
- Operar forex, CFDs, crypto, acciones, etc.
- Usar indicadores y robots (Expert Advisors)
- Ver graficos y analisis tecnico
- Copy trading

**Descarga:** disponible para Windows, Mac, iOS, Android, y web.

---

## N

### Neomaaa Ltd
Nuestra entidad legal. IBC 15968, registrada en Anjouan. Titular de la licencia L15968/N.

---

## O

### Order Types (Tipos de Orden)
| Tipo | Descripcion |
|------|------------|
| **Market Order** | Compra/vende inmediatamente al precio actual |
| **Limit Order** | Compra/vende cuando el precio llegue a un nivel especifico |
| **Stop Order** | Activa una market order cuando el precio toque cierto nivel |
| **Stop Loss** | Cierra automaticamente para limitar perdidas |
| **Take Profit** | Cierra automaticamente para asegurar ganancias |

---

## P

### Pip
Unidad minima de movimiento del precio. Para la mayoria de pares forex: el 4to decimal (0.0001). Ejemplo: si EUR/USD se mueve de 1.0850 a 1.0851, se movio 1 pip.

**Excepcion:** pares con JPY — el pip es el 2do decimal (0.01).

### PIX
Sistema de pago instantaneo de Brasil. Uno de nuestros metodos de deposito para clientes brasileros.

### PSP (Payment Service Provider)
Empresas que procesan nuestros depositos y retiros. Ejemplos: procesadores de tarjeta, crypto gateways, transferencias locales.

---

## R

### Restricted Countries (Paises Restringidos)
NO podemos aceptar clientes de:
- USA, Canada
- EEA (Union Europea), UK, Australia
- Cuba, Iraq, Myanmar, North Korea, Sudan
- Cualquier jurisdiccion sancionada

> **CRITICO para Sales:** Si un lead es de estos paises, NO continuar. Escalar a Susana inmediatamente.

### Rollover / Swap
Cargo o credito por mantener una posicion abierta de un dia al siguiente. Triple swap los miercoles (por el fin de semana).

---

## S

### Scalping
Estrategia de trading que busca ganancias pequenas con muchas operaciones rapidas. Ideal para cuenta Raw (spreads bajos + comision fija).

### Segregated Accounts (Cuentas Segregadas)
Los fondos de los clientes se mantienen separados de los fondos operativos del broker. Requisito regulatorio. Importante mencionarlo cuando un cliente pregunta por seguridad de sus fondos.

### Skale CRM
Nuestro CRM. Se usa para:
- Registrar y clasificar leads
- Trackear estado de KYC
- Registrar depositos y FTDs
- Asignar leads a agentes de ventas
- Programar follow-ups
- Generar reportes

### Slippage
Diferencia entre el precio esperado y el precio real de ejecucion. Puede ser positivo o negativo. Comun en mercados volatiles o durante noticias.

### Spread
Diferencia entre el precio Bid y Ask. Es el costo principal de operar. Se mide en pips.
- Cuenta Cent/Standard: desde 1.0 pip (sin comision adicional)
- Cuenta Raw: desde 0.0 pips (+ $3/lote/lado de comision)

### Stop Out
Cierre automatico de posiciones cuando el Margin Level cae por debajo del nivel minimo. Protege al cliente (y al broker) de perdidas mayores.

### STP (Straight Through Processing)
Modelo donde las ordenes del cliente se envian directamente al LP sin intervencion del broker. Parte de nuestro modelo ECN/STP.

### Sumsub
Plataforma de KYC que usamos para verificar la identidad de los clientes. Automatiza: verificacion de documentos, deteccion de fraude, liveness check, screening de sanciones.

### Swap-Free
Cuentas sin cargos de swap/rollover. Disponible para clientes que lo soliciten (cuentas islamicas o por preferencia).

---

## T

### Take Profit (TP)
Orden automatica para cerrar una posicion cuando alcanza cierto nivel de ganancia.

### Trading Volume
Cantidad total operada, medida en lotes. KPI importante para el broker (mas volumen = mas comisiones/spread revenue).

---

## U

### USDT (Tether)
Stablecoin vinculada al dolar USD. Uno de nuestros metodos principales de deposito/retiro crypto.

---

## V

### Vault Yield System
Feature especial de NEOMAAA. Los clientes pueden depositar fondos en el "vault" y ganar hasta 5% p.a. de rendimiento.

### Volatility (Volatilidad)
Medida de cuanto fluctua el precio de un instrumento. Alta volatilidad = mas oportunidades pero tambien mas riesgo.

### VPS (Virtual Private Server)
Servidor virtual que permite ejecutar MT5 las 24 horas sin tener la computadora encendida. NEOMAAA ofrece VPS hosting como feature especial.

---

## W

### Withdrawal (Retiro)
Proceso de retirar fondos de la cuenta de trading. Reglas:
- Se procesa en 24h habiles
- Mismo metodo que el deposito original (hasta el monto del deposito)
- Ganancias se pueden retirar por cualquier metodo
- KYC debe estar aprobado

---

## Numeros Clave que Todo el Equipo Debe Saber

| Dato | Valor |
|------|-------|
| Licencia | L15968/N — AOFA (Anjouan) |
| Entidad | Neomaaa Ltd — IBC 15968 |
| Instrumentos | 2,000+ |
| Plataforma | MT5 (unica) |
| Deposito minimo | $5 (Cent) |
| Apalancamiento maximo | 1:1000 |
| Spread minimo | 0.0 pips (Raw) |
| Metodos de pago | 120+ |
| Tiempo de retiro | 24h habiles |
| Soporte | Intercom, email, telefono |
| Telefono | +41 44 707 9633 |

---

## Frases PROHIBIDAS (Compliance)

> **Ninguno en el equipo puede decir esto a un cliente — NUNCA:**

| PROHIBIDO | ALTERNATIVA |
|-------------|---------------|
| "Te garantizo ganancias" | "El trading implica riesgo, los resultados varian" |
| "Es imposible perder" | "Con buena gestion de riesgo puedes proteger tu capital" |
| "Vas a recuperar tu dinero" | "Podemos revisar tu estrategia juntos" |
| "Deposita todo lo que tengas" | "Invierte solo lo que puedas permitirte perder" |
| "Nuestro broker es el mejor" | "Tenemos condiciones competitivas que puedes comparar" |
| "El mercado siempre sube" | "Los mercados fluctuan, hay oportunidades en ambas direcciones" |
| Asesoramiento de inversion especifico | "No damos asesoria de inversion, pero te facilito la plataforma" |

---

*Enciclopedia NEOMAAA Broker — Version 1.0 — Abril 2026*
*Si algo no esta aqui, preguntale a tu supervisor o busca en este portal.*
