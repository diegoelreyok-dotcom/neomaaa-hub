# Broker ABC — NEOMAAA Encyclopedia

> Everything the team needs to know to operate as a broker. If you have a question, look here first.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="2,000+" data-label="Instruments"></div>
<div className="neo-stat" data-value="120+" data-label="Payment methods"></div>
<div className="neo-stat" data-value="4" data-label="Account types"></div>
<div className="neo-stat" data-value="1:1000" data-label="Max leverage"></div>
</div>

> [!INFO]
> This glossary is organized alphabetically. Terms that are critical for compliance (KYC, AML, B-Book, prohibited phrases) are flagged with callouts. If what you're looking for isn't here, ask your supervisor before improvising.

---

## A

### A-Book
Execution model where the broker sends client orders directly to the market (liquidity provider). The broker earns only through commissions/spread markup, not from client losses. Opposite of B-Book.

**Neomaaa operates a hybrid A-Book/B-Book model**, officially disclosed in its public Terms and Conditions (see `legal/terms-conditions.md` and `legal/order-execution-policy.md`). The ECN/STP model is the prioritized route; the Company may act as principal or counterparty under certain circumstances.

### Account Types
NEOMAAA offers 4 types: **Cent** ($5), **Standard** ($50), **Raw** ($500 — 0.0 pips + $3/side), **Institutional** ($50,000, custom).

Full table with spreads, commissions, leverage and profiles (gold source): [`encyclopedia/productos-mt5`](/content/encyclopedia/productos-mt5) section "Account types".

### AML (Anti-Money Laundering)
Policies against money laundering. Mandatory by regulation. Susana is the responsible officer. Includes: source of funds verification, suspicious transaction monitoring, reporting to AOFA.

> [!WARNING]
> AML is not a formality. Ignoring an alert or helping a client bypass controls is grounds for immediate dismissal + reporting to AOFA. When in doubt, escalate to Susana.

### AOFA (Anjouan Offshore Finance Authority)
Our regulator. Issued license L15968/N to Neomaaa Ltd. Supervises compliance with offshore financial regulations.

### Ask Price
The price at which you can BUY an instrument. Always the higher price of the bid/ask pair.

---

## B

### B-Book
Model where the broker acts as counterparty to the client. The broker "absorbs" the order internally without sending it to the market. The broker earns when the client loses and vice versa. Used for small orders or predictable flow.

> [!INFO]
> **Approved policy:** Neomaaa Ltd OFFICIALLY acknowledges in its T&C that it may act as principal or counterparty. The client may be told we operate a "hybrid execution model (STP/ECN or principal/counterparty depending on market conditions)" citing the published Execution Policy. What IS confidential: internal routing criteria, thresholds, ratios, and A/B classification of individual clients (see `compliance/ab-book-policy.md`). Never say "we are 100% A-Book" or "we are never counterparty" — that is false and contradicts the T&C.

### Balance
Total money in the client's account, not counting open positions. Different from Equity.

### Bid Price
The price at which you can SELL an instrument. Always the lower price of the bid/ask pair.

### Broker
Financial intermediary that allows clients to trade financial instruments (forex, commodities, metals, stocks, ETFs, indices, cryptocurrencies, energies) through a platform. That's what we are. We cover the 8 official asset classes published on neomaaa.com.

---

## C

### CFD (Contract for Difference)
Derivative contract that allows speculating on the price of an asset without owning it. Most of our instruments are CFDs. The client gains or loses the difference between entry and exit price.

### Client Portal
The web interface where the client:
- Registers and creates the account
- Uploads documents for KYC
- Deposits and withdraws funds
- Accesses MT5
- Views trade history

### Commission
Fixed charge per trade. Only applies on Raw account ($3/lot/side = $6 round trip). Cent and Standard accounts have no commission — the cost is included in the spread.

### Compliance
Department that ensures we operate within the law. Responsible: Susana. Includes: KYC, AML, suspicious activity monitoring, country restrictions, phrases we CANNOT say.

### Copy Trading
Feature that allows a client to automatically copy another trader's trades. NEOMAAA offers it as a special feature.

### CRM (Customer Relationship Management)
System to manage leads and clients. We use Skale CRM. This is where we track: lead status, KYC, deposits, assigned agent, call notes.

### Cross Rate
Currency pair that does not include USD. Example: EUR/GBP, AUD/JPY.

---

## D

### Dealing Desk
Operational area where orders and broker exposure are managed. Responsible: Pepe. Decides what is sent to the market (A-Book) and what stays internal (B-Book).

### Demo Account
Account with virtual money for practice. The client can trade risk-free. Useful for sales training as well.

### Deposit
Funds the client sends to their trading account. We accept 120+ methods: Visa/MC, crypto (USDT), PIX, PSE, OXXO, Nequi, Yape, Mercado Pago, Western Union, bank transfer.

---

## E

### ECN (Electronic Communication Network)
Electronic network that connects buyers and sellers directly. Our model is hybrid ECN/STP — orders go to the liquidity pool of our LPs.

### Equity
Balance + profit/loss of open positions. If you have $1,000 balance and an open position with -$200, your equity is $800.

### Execution
The process of completing an order. Can be:
- **Market Execution**: at the price available at that moment (our model)
- **Instant Execution**: at the exact price requested (with possible requotes)

---

## F

### FTD (First Time Deposit)
First deposit from a client. It is the MOST important sales metric. A lead becomes a "client" when they make their FTD.

### Forex (Foreign Exchange)
Currency market. The largest financial market in the world (~$7.5 trillion/day). Pairs like EUR/USD, GBP/USD, USD/JPY.

### Free Margin
Equity minus used margin. It is the money available to open new positions or absorb losses.

---

## G

### Gap
Sharp jump in price, typically when the market opens on Sundays (for forex). Dangerous for positions with tight stop losses.

---

## H

### Hedging
Opening an opposite position to reduce risk. Example: if you have 1 lot long EUR/USD, you open 1 lot short EUR/USD. MT5 allows hedging.

---

## I

### IBC (International Business Company)
Type of legal entity. Neomaaa Ltd is registered as IBC 15968 in Anjouan.

### Intercom
Customer support platform. We use Intercom for:
- Live chat on the website
- Support tickets
- Automated responses
- Conversation routing (ES/EN)

---

## K

### KYC (Know Your Customer)
Client identity verification process. Mandatory before allowing deposits/withdrawals. We use Sumsub. Requires:
1. Identity document (passport, ID, driver's license)
2. Proof of address (utility bill, bank statement)
3. Selfie with document (depending on risk level)

**KYC statuses:**
- **Approved** — can trade and deposit/withdraw
- **Retry** — documents rejected, can retry
- **Rejected** — definitively rejected, escalate to Susana

> [!WARNING]
> Sales NEVER approves or rejects KYC. Nor does it disclose the specific reason for a final rejection (sanctions, fraud, PEP). Only says "regulatory requirements" and escalates.

---

## L

### Leverage
**Reducer of the margin requirement** by a factor of 1/N. **It is NOT a multiplier of your capital.** With 1:500 leverage, the margin required to open a position = notional value / 500. Correct example: 1 lot EUR/USD represents ~USD 115,000 notional; with 1:500 you only need **USD 230 of free margin** to open it. The position's "buying power" remains the notional (USD 115,000); what changes is how much of your account is tied up. Higher leverage = lower margin requirement = smaller cushion before stop out. The broker provides the leverage it receives from its LP. Tier 1 regulators (FCA, ESMA) cap retail leverage at 1:30 on major forex to protect the client from fast wipeout.

| Account | Max leverage |
|--------|----------------------|
| Cent | Up to 1:1000 |
| Standard | Up to 1:1000 |
| Raw | Up to 1:500 |
| Institutional | Custom |

> **CAUTION in sales:** Never promise that leverage guarantees profits. Always mention that "higher leverage = higher risk".

### Liquidity Provider (LP)
Financial institutions that provide us with prices and liquidity. Our A-Book orders are sent to the LPs.

### Lot
Unit of measure for trade size.
- **Standard Lot**: 100,000 units of the base currency
- **Mini Lot**: 10,000 units (0.1 lots)
- **Micro Lot**: 1,000 units (0.01 lots)

---

## M

### Margin
Amount of money required as "collateral" to open a leveraged position. Calculated based on position size and leverage.

### Margin Call
Alert when equity falls to a dangerous level relative to used margin. The client must deposit more or close positions.

### Margin Level
(Equity / Used Margin) x 100. If it falls below a certain level (typically 50%), Stop Out is triggered.

### MetaTrader 5 (MT5)
Our trading platform. MetaQuotes software that allows:
- Trading forex, CFDs, crypto, stocks, etc.
- Using indicators and robots (Expert Advisors)
- Viewing charts and technical analysis
- Copy trading

**Download:** available for Windows, Mac, iOS, Android, and web.

---

## N

### Neomaaa Ltd
Our legal entity. IBC 15968, registered in Anjouan. Holder of license L15968/N.

---

## O

### Order Types
| Type | Description |
|------|------------|
| **Market Order** | Buys/sells immediately at current price |
| **Limit Order** | Buys/sells when the price reaches a specific level |
| **Stop Order** | Triggers a market order when the price hits a certain level |
| **Stop Loss** | Automatically closes to limit losses |
| **Take Profit** | Automatically closes to lock in profits |

---

## P

### Pip
Minimum unit of price movement. For most forex pairs: the 4th decimal (0.0001). Example: if EUR/USD moves from 1.0850 to 1.0851, it moved 1 pip.

**Exception:** JPY pairs — the pip is the 2nd decimal (0.01).

### PIX
Brazil's instant payment system. One of our deposit methods for Brazilian clients.

### PSP (Payment Service Provider)
Companies that process our deposits and withdrawals. Examples: card processors, crypto gateways, local transfers.

---

## R

### Restricted Countries
We CANNOT accept clients from:
- **USA, Canada**
- **EEA (30 countries of the European Economic Area — including Spain, Germany, France, Italy, Portugal, Netherlands, etc.)**
- **UK (United Kingdom), Australia**
- **Cuba, Iraq, Myanmar, North Korea, Sudan**
- Any sanctioned jurisdiction (OFAC/EU/UK/UN)

**Confirmed OPERATING markets (April 2026):** LATAM (excl. USA/Canada), CIS with screening, MENA (excl. Iraq), Asia phase 2 (excl. NK/Myanmar), Africa (excl. Sudan).

> **CRITICAL for Sales:** If a lead is from a restricted country, **DO NOT continue, DO NOT promise a solution, DO NOT suggest workarounds** (fake addresses, VPN, alternative passport — that is regulatory fraud). Escalate to Susana immediately and close with rejection template CR-26.

> **Diego decision (April 2026):** "We cannot operate as a broker with clients from Spain/Europe without the regulations those countries require." Spain is in EEA — **NOT operational** until NEOMAAA has equivalent EEA license.

### Rollover / Swap
Charge or credit for keeping a position open from one day to the next. Triple swap on Wednesdays (to cover the weekend).

---

## S

### Scalping
Trading strategy that seeks small profits with many fast trades. Ideal for Raw account (low spreads + fixed commission).

### Segregated Accounts
Client funds are kept separate from the broker's operational funds. Regulatory requirement. Important to mention when a client asks about fund safety.

### Skale CRM
Our CRM. Used to:
- Register and classify leads
- Track KYC status
- Register deposits and FTDs
- Assign leads to sales agents
- Schedule follow-ups
- Generate reports

### Slippage
Difference between the expected price and the actual execution price. Can be positive or negative. Common in volatile markets or during news.

> [!WARNING]
> If a client complains about slippage or requote, sales/support does NOT give technical execution explanations. Document (exact time, pair, volume, expected vs executed price, screenshot) and escalate to Pepe.

### Spread
Difference between the Bid and Ask price. It is the main cost of trading. Measured in pips.
- Cent/Standard account: from 1.0 pip (no additional commission)
- Raw account: from 0.0 pips (+ $3/lot/side commission)

### Stop Out
Automatic closing of positions when Margin Level falls below the minimum level. Protects the client (and the broker) from larger losses.

### STP (Straight Through Processing)
Model where client orders are sent directly to the LP without broker intervention. Part of our ECN/STP model.

### Sumsub
KYC platform we use to verify client identity. Automates: document verification, fraud detection, liveness check, sanctions screening.

### Swap-Free
Accounts with no swap/rollover charges. Available for clients who request it (Islamic accounts or by preference).

---

## T

### Take Profit (TP)
Automatic order to close a position when it reaches a certain profit level.

### Trading Volume
Total amount traded, measured in lots. Important KPI for the broker (more volume = more commission/spread revenue).

---

## U

### USDT (Tether)
Stablecoin pegged to the USD. One of our main crypto deposit/withdrawal methods.

---

## V

### Vault Yield System
Official NEOMAAA Markets feature. Passive yield system for clients: they deposit funds (typically USDT or another stablecoin) into the "vault" and earn an annualized return ([DATA: exact rate — check with Finance/Diego]). Similar in concept to Binance Earn, Crypto.com Earn or Nexo Earn, but operated internally by the broker. See full doc in encyclopedia/vault-yield-system.md and legal terms in legal/vault-yield-terms.md.

### Volatility
Measure of how much an instrument's price fluctuates. High volatility = more opportunities but also more risk.

### VPS (Virtual Private Server)
Virtual server that allows running MT5 24/7 without keeping your computer on. NEOMAAA offers VPS hosting as a special feature.

---

## W

### Withdrawal
Process of withdrawing funds from the trading account. Rules:
- Processed within 24 business hours
- Same method as the original deposit (up to the deposit amount)
- Profits can be withdrawn via any method
- KYC must be approved

---

## Key Numbers Every Team Member Must Know

| Item | Value |
|------|-------|
| License | L15968/N — AOFA (Anjouan) |
| Entity | Neomaaa Ltd — IBC 15968 |
| Instruments | 2,000+ |
| Platform | MT5 (only) |
| Minimum deposit | $5 (Cent) |
| Maximum leverage | 1:1000 |
| Minimum spread | 0.0 pips (Raw) |
| Payment methods | 120+ |
| Withdrawal time | 24 business hours |
| Support | Intercom, email, phone |
| Phone | [DATA: official Dubai phone — Diego to confirm] |

---

## PROHIBITED Phrases (Compliance)

> [!DANGER]
> No team member may say this to a client — EVER. Saying it once is grounds for written warning; saying it with a witness (client recording it, compliance audit) can cost the license.

| PROHIBITED | ALTERNATIVE |
|-------------|---------------|
| "I guarantee you profits" | "Trading involves risk, results vary" |
| "It's impossible to lose" | "With good risk management you can protect your capital" |
| "You will get your money back" | "We can review your strategy together" |
| "Deposit everything you have" | "Only invest what you can afford to lose" |
| "Our broker is the best" | "We have competitive conditions you can compare" |
| "The market always goes up" | "Markets fluctuate, there are opportunities in both directions" |
| Specific investment advice | "We don't give investment advice, but I provide you the platform" |

---

*NEOMAAA Broker Encyclopedia — Version 1.0 — April 2026*
*If something isn't here, ask your supervisor or search this portal.*
