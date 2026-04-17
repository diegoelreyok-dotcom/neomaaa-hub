# MT5 and NEOMAAA products — Technical guide for the whole team

> [!INFO]
> MT5 (MetaTrader 5) is the platform 100% of our clients trade on. If you don't understand it, you can't do support, sales, or retention. This document covers what anyone on the team needs to know, regardless of their role.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="2,000+" data-label="Instruments"></div>
<div className="neo-stat" data-value="4" data-label="Account types"></div>
<div className="neo-stat" data-value="1:1000" data-label="Max leverage"></div>
<div className="neo-stat" data-value="24/5" data-label="Active markets"></div>
</div>

## MT5 vs MT4 — why does NEOMAAA use MT5?

MetaTrader 4 was released in 2005. It was (and remains) the de facto standard in retail forex. MetaTrader 5 came out in 2010, but it took a decade to displace its predecessor. Today, new brokers choose MT5 for concrete reasons.

| Feature | MT4 | MT5 |
|----------------|-----|-----|
| Asset classes | Forex + basic CFDs | Forex + CFDs + futures + stocks + crypto |
| Order types | 4 | 6 (adds Buy Stop Limit and Sell Stop Limit) |
| Timeframes | 9 | 21 |
| Depth of Market | No | Yes |
| Built-in economic calendar | No | Yes |
| Hedging and Netting | Hedging only | Both |
| Programming language | MQL4 | MQL5 (more powerful) |
| Multithreading in backtesting | No | Yes |
| Regulation friendly | Less | More (better NBP compliance, reporting, etc.) |

**NEOMAAA chose MT5** because of: better regulatory support, native DOM, compatibility with stocks and crypto CFDs without forcing the system, and because it's the platform MetaQuotes keeps developing (MT4 is in maintenance mode).

## Account types (GOLD SOURCE)

> [!WARNING]
> **This is the master table of NEOMAAA account types.** Any portal doc (sales FAQ, objections, support, marketing, training) that mentions Cent / Standard / Raw / Institutional must link here. In case of discrepancy, this table prevails.

NEOMAAA offers **4 account types** designed for different trader profiles. The client chooses when opening the account and can hold multiple accounts of different types under the same Client Portal login.

| Account | Minimum deposit | Spread (from) | Commission | Max leverage | Ideal for |
|--------|----------------|----------------|----------|--------------|------------|
| **Cent** | $5 | 1.0 pip | $0 (included in spread) | 1:1000 | Beginners, real-money demo, testing strategy with minimum risk |
| **Standard** | $50 | 1.0 pip | $0 (included in spread) | 1:1000 | Regular retail trader, moderate volume |
| **Raw** | $500 | 0.0 pips | $3/lot/side ($6 round-turn) | 1:500 | Scalpers, algos, active traders prioritizing low spread |
| **Institutional** | $50,000 | 0.0 pips | Custom (negotiable) | Negotiable | Funds, money managers, institutional clients |

**Key Standard vs Raw difference:**
- Standard: no commission, wider spread (1.0 pip typical on EURUSD). Total cost ≈ $10/lot.
- Raw: near-zero spread + fixed $3/side commission. Total cost ≈ $6/lot on liquid instruments. Cheaper at high volume.

**Cent account — technical note:**
On the Cent account, lots are expressed in cents: 1 Cent lot = 1,000 units (not 100,000). Allows trading very small sizes and seeing P&L magnified (useful for education). Not recommended for serious traders because notional volume is low.

**Account type change:**
The client CANNOT convert an existing account. They must open a second account of the new type and transfer funds internally (instant from Client Portal).

> [!INFO]
> Minimum deposits, spreads, commissions and max leverage are official values in effect as of April 2026. Any change requires approval from Pepe (Dealing) + Susana (Compliance) and simultaneous update of this doc + landing pages.

## Instruments available at NEOMAAA

NEOMAAA offers **2,000+ instruments** grouped into 8 categories (confirmed on neomaaa.com):

- Forex (currency CFDs)
- Metals
- Indices
- Commodities
- Cryptocurrencies (CFDs)
- **Stocks CFDs** (individual equities) — confirmed as an official asset class on neomaaa.com
- **ETFs** (exchange-traded funds via CFD) — confirmed as an official asset class on neomaaa.com
- Energies (WTI, Brent, NatGas)

Detail by category:

### 1. Forex

| Subcategory | Examples | Typical spread |
|--------------|----------|---------------|
| Majors | EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD | 0.0–1.5 pips |
| Minors / crosses | EUR/GBP, EUR/JPY, GBP/JPY, AUD/NZD | 0.8–3 pips |
| Exotics | USD/MXN, USD/ZAR, USD/TRY, EUR/TRY, USD/HKD, USD/SGD | 10–50 pips |

### 2. Metals

- **XAU/USD** (gold vs dollar) — the most traded instrument after EUR/USD.
- **XAG/USD** (silver vs dollar) — very volatile.
- **XPT/USD** (platinum) and **XPD/USD** (palladium) — available but low liquidity.

### 3. Indices

Contracts for difference on stock indices. They are not the real futures; they are CFDs referenced to the index.

| Symbol | What it represents | Key sessions |
|---------|----------------|----------------|
| SPX500 / US500 | S&P 500 | NY 14:30–21:00 GMT |
| NAS100 / US100 | Nasdaq 100 | NY 14:30–21:00 GMT |
| US30 / DJI | Dow Jones 30 | NY 14:30–21:00 GMT |
| GER40 / DE40 | German DAX | Frankfurt 08:00–16:30 GMT |
| UK100 | FTSE 100 | London 08:00–16:30 GMT |
| JP225 | Nikkei | Tokyo 00:00–06:00 GMT |

### 4. Commodities

- **USOil / WTI** — American crude.
- **UKOil / Brent** — European crude.
- **NatGas** — natural gas (extremely volatile).

### 5. Crypto CFDs

CFDs on crypto, **not** real crypto. The client doesn't receive the asset; it's price speculation.

- BTC/USD, ETH/USD, XRP/USD, LTC/USD, BCH/USD, SOL/USD [DATA: confirm full list with Pepe/Dealing].
- 24/7 (don't close on weekends).
- Higher spreads than forex — volatility compensates.

### 6. Stocks CFDs

Individual stocks via CFD. The client doesn't buy the real share (no voting rights, no dividends as a shareholder — although there is a dividend adjustment on the CFD position). Confirmed on neomaaa.com as an official asset class.

- FAANG (Meta, Apple, Amazon, Netflix, Google/Alphabet), major tech (Microsoft, NVIDIA, Tesla).
- US banks (JPMorgan, Bank of America, Citi, Goldman Sachs).
- Major European companies (LVMH, SAP, Siemens, Nestlé, Shell).
- Trading during the corresponding exchange hours (NYSE/NASDAQ 14:30–21:00 GMT; EU exchanges approx 08:00–16:30 GMT).
- [DATA: exact list of available tickers — confirm with Pepe/Dealing].

### 7. ETFs (Exchange-Traded Funds) via CFD

Exchange-traded funds traded as CFDs. Confirmed on neomaaa.com as an official asset class.

- Broad indices: SPY (S&P 500), QQQ (Nasdaq 100), DIA (Dow 30), IWM (Russell 2000).
- Sector: XLF (financials), XLE (energy), XLK (tech), XLV (healthcare).
- Geographic: EEM (emerging markets), FXI (China), EWZ (Brazil), VGK (Europe).
- Commodity ETFs: GLD (gold), SLV (silver), USO (oil).
- [DATA: exact list of available ETFs — confirm with Pepe/Dealing].

### 8. Energies

Energy instruments, CFDs on energy futures.

- **USOil / WTI** — American crude.
- **UKOil / Brent** — European crude.
- **NatGas** — natural gas (extremely volatile).
- [DATA: whether there are other contracts like heating oil, gasoline].

## Leverage — How it really works

> [!WARNING]
> **Demystification.** Leverage does NOT multiply your capital. It does not give you "extra buying power". What leverage does is **reduce the margin requirement** by a factor of 1/leverage. It's a margin concept, not a multiplier.

The phrase "with $250 and 1:500 leverage you control $125,000" is misleading. The correct framing: with $250 of free margin you can open a position whose notional size does not exceed available margin × leverage.

### Real example — 1 lot EUR/USD

- 1 lot EUR/USD = 100,000 EUR notional.
- If EUR/USD trades at 1.15 → notional value ≈ **USD 115,000**.
- **Without leverage:** you need USD 115,000 to open that position.
- **With 1:500 leverage:** margin required = 115,000 / 500 = **USD 230**.
- With USD 230 of free margin locked up, you can open that lot. The "buying power" of the position is still USD 115,000 (notional) — what changes is what you lock up from your account.

General formula:

<div className="neo-formula">Margin required = Notional size / Leverage</div>

### Typical leverage by instrument type

| Instrument | Typical max leverage (offshore) | Tier 1 retail leverage (FCA/ESMA) |
|-------------|-----------------------------------|-----------------------------------|
| Forex majors | 1:500 | 1:30 |
| Forex minors / exotics | 1:200 | 1:20 |
| Metals (gold, silver) | 1:200 | 1:20 |
| Major indices | 1:100 | 1:20 |
| Minor indices | 1:50 | 1:10 |
| Commodities (oil, gas) | 1:100 | 1:10 |
| Crypto CFDs | 1:20 | 1:2 |
| Stocks CFDs | 1:10 | 1:5 |

### Why the broker cares about leverage

- The broker **provides the leverage it receives from its LP** (liquidity provider). It doesn't invent it.
- **High leverage → client opens with smaller deposit → broker receives less capital.** Less float, less cushion.
- **High leverage → client loses faster** (less free margin against the same adverse move) → increases churn and operational/reputational risk for the broker.
- That's why **Tier 1 regulators (FCA, ESMA, ASIC)** cap retail leverage at **1:30** on major forex — not to protect the broker, but to protect the retail client from fast wipeout.
- Offshore (Anjouan, SVG, Vanuatu) high leverage is legal and commercially attractive for retail. NEOMAAA operates under this model.

## Order types in MT5

### Market orders

**Market Order (Buy / Sell)** — executes **at the current available price**. Bid if you sell, ask if you buy. Includes potential slippage if the market is moving.

### Pending orders

Orders that wait for the price to reach a level, and only execute there.

| Type | When used |
|------|---------------|
| **Buy Limit** | You want to buy **below** the current price (you expect it to drop and bounce). |
| **Sell Limit** | You want to sell **above** the current price (you expect it to rise and fall). |
| **Buy Stop** | You want to buy **above** the current price (bullish breakout confirmation). |
| **Sell Stop** | You want to sell **below** the current price (bearish breakout confirmation). |
| **Buy Stop Limit** | Combination: when price touches X, place a Buy Limit at Y. MT5 only. |
| **Sell Stop Limit** | Same but reversed. MT5 only. |

### Risk management attached to each order

- **Stop Loss (SL)** — maximum acceptable loss level. Attached to the main order.
- **Take Profit (TP)** — target profit level. Attached to the main order.
- **Trailing Stop** — a stop that moves automatically in favor of the position when it's winning. It doesn't move against. **Important**: in MT5 the trailing stop executes on the client side (requires MT5 to be open), unlike the SL which lives on the broker's server.

## Contract specs — what each field means

Each instrument has a "spec sheet" defining how it works. Example for EUR/USD:

| Field | Typical value | What it means |
|-------|--------------|---------------|
| Symbol | EURUSD | Pair name |
| Contract size | 100,000 EUR | 1 standard lot = 100,000 units of the base |
| Tick size | 0.00001 | Minimum price increment |
| Pip value (1 lot) | USD 10 | How much PnL moves per pip |
| Leverage | up to 1:1000 | Margin required vs position size |
| Margin per lot (1:500) | USD 216 | Example at price 1.08 and 1:500 leverage |
| Swap long | –0.5 points/day | How much you pay/earn holding 1 lot long overnight |
| Swap short | +0.2 points/day | Same for short position |
| Triple swap day | Wednesday | Day with 3x swap (covers the weekend) |
| Commission | USD 0 (Cent/Standard) / USD 6 round-turn (Raw: $3/lot/side) | Volume charge |
| Session | Mon 22:00 – Fri 22:00 GMT | Market hours |

## Numerical example — opening 0.1 lot of EUR/USD

Assume:
- Current EUR/USD price: **1.0850**
- Account leverage: **1:500**
- Order size: **0.1 lot** = 10,000 EUR
- USD-denominated account

### Required margin

`Margin = (Size × Price) / Leverage`
`Margin = (10,000 × 1.0850) / 500 = USD 21.70`

With USD 21.70 of margin, the client controls 10,000 EUR (USD 10,850) of notional value.

### Pip value

For 0.1 lot of EUR/USD: **USD 1 per pip**.
If price rises 50 pips → +USD 50 profit.
If price drops 30 pips → –USD 30 loss.

### Overnight swap

Assuming swap long of –0.5 points/day, 0.1 lot:
Daily cost ≈ –0.5 × 0.1 × USD pip value ≈ –**USD 0.05/day**.
Over 7 days: –USD 0.35.
On Wednesdays 3x (triple swap) is charged to cover the weekend (Saturday and Sunday swaps accumulate because banks don't operate, but the calculation is booked on Wednesdays).

## Market hours — the 4 sessions

Forex operates 24/5. It's split into 4 sessions that partially overlap.

| Session | GMT hours | Characteristics |
|--------|-------------|-----------------|
| Sydney | 22:00 – 07:00 | Low liquidity. Low volatility except Asian events. |
| Tokyo | 00:00 – 09:00 | Dominates JPY pairs. AUD/USD active. |
| London | 08:00 – 17:00 | Highest global volume. Big moves on EUR, GBP, CHF. |
| New York | 13:00 – 22:00 | Second highest volume. Overlaps with London 13:00–17:00 (gold!). |

**London–NY overlap (13:00–17:00 GMT)** is the moment of peak global liquidity, tightest spreads, and highest volume. It's when most intraday setups work best.

After NY close and before Tokyo (21:00–00:00 GMT): **liquidity valley**. Spreads widen. Not a good time to enter at market.

## Copy Trading via MQL5 Signals

> [!INFO]
> NEOMAAA **does not operate a proprietary copy-trading system**. The copy trading available to our clients is MT5's native system: **MQL5 Signals**, MetaQuotes' official marketplace. Official link: https://www.mql5.com/en/signals

### How it works (steps)

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Open real account"><div>A trader opens their real NEOMAAA account and trades on MT5.</div></div>
<div className="neo-step" data-num="2" data-title="Publish signal"><div>They enable the account as a <strong>signal provider</strong> and publish it on <a href="https://www.mql5.com/en/signals">MQL5 Signals</a>. They can charge a <strong>monthly subscription</strong> (the price is set by the provider; MetaQuotes takes a share).</div></div>
<div className="neo-step" data-num="3" data-title="Subscription"><div>Other NEOMAAA clients (or clients from other brokers using MT5) <strong>subscribe</strong> to that signal from their own MT5.</div></div>
<div className="neo-step" data-num="4" data-title="Proportional copy"><div>The provider's orders are <strong>copied proportionally to each subscriber's balance</strong>.</div></div>
</div>

The provider doesn't see subscribers' accounts; subscribers don't see the provider's strategy or absolute sizing. Everything is handled by MetaQuotes via its MQL5 infrastructure.

### For communities and influencers

Common pattern: an influencer wants to "set up their account at NEOMAAA and have their audience deposit and copy their trades".

- **Correct way (what can be done today):**
  1. The influencer creates their NEOMAAA account.
  2. Publishes their signal on MQL5 Signals.
  3. Their audience signs up at NEOMAAA (IB funnel if affiliated) and **subscribes from their own MT5** to the influencer's signal.
  4. Each follower controls their own account, their own risk, their own subscription.

- **Incorrect way (what NEOMAAA does NOT do):**
  - A centralized system where NEOMAAA automatically manages the copy from an influencer to their followers — that would be **MAM or PAMM**, and **NEOMAAA does not currently offer MAM/PAMM**.

### Model risks

> [!WARNING]
> - If the provider has a bad streak, every subscriber loses proportionally.
> - The subscriber **does not control** the strategy — they only decide how much capital to allocate and whether to unsubscribe.
> - NEOMAAA commissions apply normally on every copied trade (each follower pays their own spread/commission on their account).

## Advanced MT5 features

### Expert Advisors (EAs)

**Automated programs** that trade without human intervention, following logic programmed in MQL5. The client can buy them on the MetaQuotes Market or code them.

Considerations:
- The EA runs on the client's PC — if MT5 shuts down, the EA stops trading.
- To trade 24/5 uninterrupted, the client needs a **VPS** (virtual server). NEOMAAA may offer a free VPS on certain account levels [DATA: confirm conditions with Pepe/Dealing].
- EAs are the source of many complaints: client "coded it wrong", volatility blew it up, or loaded one without understanding it.

### Custom indicators

MT5 ships with 30+ native indicators (RSI, MACD, Bollinger Bands, etc.). Traders can download or buy thousands more from the Market.

### MultiTerminal

Lets a trader (or account manager) operate **multiple accounts simultaneously** with a single click. Useful for account managers handling capital for several clients (this touches regulation — at NEOMAAA you must check with compliance before enabling).

## Access platforms

The client can access their account from:

| Platform | When to recommend it |
|-----------|---------------------|
| **MT5 Desktop** (native Windows / Mac or via wrapper) | Primary trader. Full features. |
| **MT5 WebTrader** (browser) | Quick access from any PC. No install. Limitations: doesn't run EAs. |
| **MT5 Mobile iOS** | Monitoring and basic trading. Good ergonomics on iPad. |
| **MT5 Mobile Android** | Same on Android. |

All platforms use the same login (account number + server + password). The client can be logged in on several at once.

## Errors and concepts support hears often

| Message / complaint | What it means |
|-----------------|---------------|
| "Off quotes" | The price moved between the request and server processing. Retry. |
| "Requote" | The broker returns a new price; the client decides whether to accept. |
| "Not enough money" | Not enough free margin. Reduce size or close other positions. |
| "Market closed" | Instrument outside its session. Wait. |
| "Invalid stops" | Stop loss/take profit too close to price (minimum distance per instrument). |
| "No connection" | Disconnection from server. Client network issue, not ours. |
| "Trade disabled" | Compliance or Dealing blocked the account. Escalate. |

## Operational summary

> [!TIP]
> - MT5 is our single platform. Client accesses from desktop, web, or mobile.
> - 2,000+ instruments: forex, metals, indices, commodities, crypto CFDs, stocks CFDs.
> - Orders: market + 6 pending types + SL/TP/Trailing.
> - Standard lot = 100,000 units. 0.1 lot = 10,000 units = ~USD 1 per pip on majors.
> - Margin = (size × price) / leverage. With 1:500, 0.1 lot EUR/USD requires ~USD 22.
> - Peak liquidity session: London–NY overlap (13:00–17:00 GMT).
> - Swap = overnight cost. Wednesday is triple swap.
> - EAs, VPS, copy trading (MQL5 Signals), indicators: MT5 features advanced clients ask about.
> - Leverage = margin reducer (1/N), not a capital multiplier. With 1:500, 1 lot EUR/USD needs ~USD 230 margin.
> - Copy trading = via MQL5 Signals (MetaQuotes native system). NEOMAAA does NOT currently offer MAM/PAMM.
> - If support receives an execution complaint: first check timestamp, price, spread at that moment, order type. Objective data resolves 80% of complaints.

> [!INFO]
> Technical information verified with Pepe (Head of Dealing NEOMAAA).
