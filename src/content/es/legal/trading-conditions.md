# Trading Conditions — Condiciones de Trading

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 15 Abril 2026**

> [!INFO]
> **Documento fuente:** El texto legal definitivo y las condiciones vigentes estan publicadas en https://neomaaa.com/about/legal-documentation y en la pagina de especificaciones de cada tipo de cuenta. Este documento interno es una sinopsis para el equipo. Ante discrepancia, prevalece el documento oficial.

---

## 1. Alcance

Este documento resume las **condiciones de trading oficiales** aplicables a las cuentas de **Neomaaa Ltd** en la plataforma MetaTrader 5. Complementa:

- `legal/client-agreement.md` (Client Agreement)
- `legal/order-execution-policy.md` (Order Execution Policy)
- `legal/terms-conditions.md` (T&C generales)
- `encyclopedia/productos-mt5.md` (guia tecnica de productos)

---

## 2. Plataforma de trading

- **Plataforma unica:** MetaTrader 5 (MT5) — desktop (Windows, macOS vía wrapper), web terminal, y movil (iOS, Android).
- **No se ofrece MT4** ni otra plataforma.
- **Horarios del servidor:** tipicamente GMT+2/+3 segun daylight saving. El cliente puede consultar en el panel de MT5.

---

## 3. Tipos de cuenta oficiales

Neomaaa Ltd ofrece **4 tipos de cuenta oficiales** (confirmado en neomaaa.com):

| Cuenta | Deposito minimo | Perfil |
|---|---|---|
| **Cent** | USD 5 | Beginner / test |
| **Standard** | USD 50 | Retail general |
| **Raw** | USD 500 | Scalper / intraday pro |
| **Institutional** | USD 50,000 | Alto volumen / corporates |

[DATO: detalle exacto de spreads tipicos, comisiones por lote, leverage maximo por cuenta — publicado en la pagina de especificaciones de cuenta en neomaaa.com].

### 3.1 Apalancamiento
- **Hasta 1:1000** para cuentas retail (dependiendo del instrumento).
- Apalancamiento efectivo puede ser menor en: cryptocurrencies, stocks CFDs, ETFs, indices menos liquidos, y overnight en weekends.
- El cliente puede solicitar un **apalancamiento menor** por gestion de riesgo personal.

### 3.2 Moneda base
[DATO: USD, EUR, USDT como opciones — confirmar con Finance].

---

## 4. Instrumentos disponibles — 8 asset classes oficiales

Mas de **2,000 instrumentos** agrupados en las siguientes asset classes (confirmado en neomaaa.com):

1. **Forex** (CFDs) — majors, minors, exotics.
2. **Metales** — XAU/USD (oro), XAG/USD (plata), XPT, XPD.
3. **Indices** — S&P 500, NASDAQ, DAX, FTSE, Nikkei, etc.
4. **Commodities** — agricolas, metales industriales.
5. **Stocks CFDs** — acciones individuales (FAANG, bancos, europeas).
6. **ETFs** (CFDs) — SPY, QQQ, sectoriales, geograficos.
7. **Cryptocurrencies** (CFDs) — BTC, ETH, XRP, SOL, LTC, etc.
8. **Energies** — WTI, Brent, gas natural.

Detalle tecnico en `encyclopedia/productos-mt5.md`.

---

## 5. Ejecucion

- **Modelo:** hibrido **ECN/STP**, con routing a multiples liquidity providers.
- **Data centers:** servidores en **Equinix** (NY4, LD5) para baja latencia.
- **SLA de disponibilidad:** target **99.9% uptime** publicado en neomaaa.com.
- **Tipo de ejecucion:** market execution por defecto; instant execution disponible en ciertos instrumentos.
- **Requotes:** no hay requotes en market execution.

Detalle completo en `legal/order-execution-policy.md` y explicacion educativa en `operations/dealing-desk-publico.md`.

---

## 6. Spreads y comisiones

### 6.1 Spreads
- **Variables (floating)** — reflejan condiciones de mercado en tiempo real.
- **Minimos tipicos:**
  - Cuenta Raw: desde **0.0 pips** en EUR/USD (con comision fija por lote).
  - Cuenta Standard: desde **~1.0 pips** en EUR/USD (sin comision).
  - Cuenta Cent: spread equivalente al Standard, con lotes en centesimos.
- **Widening en news events, opening/closing** — standard industria.

### 6.2 Comisiones
- **Raw / ECN:** comision fija por lote operado (ej. USD 7 round-turn por lote forex).
- **Standard / Cent:** sin comision, el costo esta en el spread.
- **Institutional:** negociable por volumen.

[DATO: tabla exacta de comisiones por instrumento y cuenta — publicada en neomaaa.com].

### 6.3 Swap (financiacion overnight)
- Posiciones abiertas a la hora de rollover (tipicamente 21:00 GMT) reciben cargo o credito de swap segun la tasa de interes diferencial.
- **Triple swap** el miercoles (cubre el rollover del fin de semana).
- **Cuentas swap-free (islamicas)** disponibles bajo solicitud para clientes con fundamento religioso. Aplica tarifa administrativa alternativa.

### 6.4 Otras comisiones
- Deposito: **sin fee del broker** (el PSP puede cobrar su propia tarifa).
- Retiro: **sin fee del broker** (el PSP puede cobrar su propia tarifa); inactividad puede generar cargos [DATO: confirmar].
- Conversion de moneda: tipo de cambio interbank + [DATO: spread aplicado — confirmar].

---

## 7. Tamano de orden

- **Volumen minimo:** 0.01 lotes (micro lote) en la mayoria de instrumentos; 0.01 en Cent equivale a 0.0001 lotes estandar.
- **Volumen maximo por orden:** varia segun instrumento y tipo de cuenta. [DATO: publicado en especificaciones].
- **Numero de posiciones simultaneas:** sujeto al margen libre de la cuenta; no hay limite por politica salvo en instrumentos con capacity constraint.

---

## 8. Margin call y stop-out

- **Margin call:** nivel de margen ≤ [DATO: ej. 80%] → el cliente recibe alerta pero puede seguir operando.
- **Stop-out:** nivel de margen ≤ [DATO: ej. 20%] → el sistema empieza a cerrar posiciones automaticamente, comenzando por la de mayor perdida, hasta recuperar margen sano.
- **Proteccion de saldo negativo:** garantizada — si el mercado se gapea y el saldo queda negativo, se repone a cero. El cliente no debe dinero al broker.

---

## 9. Horarios de trading

- **Forex:** 24 horas, de domingo 22:00 GMT a viernes 22:00 GMT.
- **Metales:** similar a forex con breaks.
- **Indices / commodities / stocks / ETFs:** siguen horario del mercado subyacente.
- **Crypto CFDs:** 24/7 (no cierran weekends).
- Horarios exactos de cada simbolo consultables en MT5 → Symbol Specifications.

---

## 10. Features y herramientas oficiales

- **Copy Trading** via MQL5 Signals (guia: `sales/guia-copytrading-mql5.md`).
- **VPS Hosting** — servicio optimizado para MT5, proximo a servidores del broker (baja latencia para EAs 24/7).
- **Trading Calendars** — calendario economico integrado en MT5.
- **Currency Conversion tools** — herramientas de conversion en el portal.
- **AI-driven analytics** — analisis y alertas generadas por AI (feature oficial).
- **Vault Yield System** — sistema de yield pasivo (`legal/vault-yield-terms.md`).
- **MFA** — autenticacion multi-factor obligatoria en el portal.

---

## 11. Modificaciones

La Empresa puede modificar las condiciones de trading con **notificacion previa de al menos 7 dias** [DATO: plazo exacto segun Client Agreement], salvo modificaciones requeridas por circunstancias extraordinarias de mercado (volatilidad extrema, disrupcion del LP, accion regulatoria) en cuyo caso pueden aplicar de inmediato.

---

## 12. Contacto

- Consultas operativas: `support@neomaaa.com`
- Disputas formales: `legal@neomaaa.com`
- Direccion: Hamchako, Mutsamudu, Anjouan, Union of Comoros.

---

[PENDIENTE: texto legal final y tabla detallada de specs por cuenta desde neomaaa.com/about/legal-documentation]
[DATO: comisiones exactas por instrumento, niveles exactos de margin call y stop-out, fees de inactividad, margenes swap — ver pagina oficial de specs de cuenta]
