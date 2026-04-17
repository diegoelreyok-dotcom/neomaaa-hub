# ORDER EXECUTION POLICY

**Neomaaa Ltd (IBC 15968) | License L15968/N | AOFA**
**Version: 1.0 | Date: April 8, 2026**

> INTERNAL REFERENCE DOCUMENT — Subject to legal review prior to publication.

---

## 1. INTRODUCTION

This Order Execution Policy describes how Neomaaa Ltd (IBC 15968), holder of license L15968/N issued by the Anjouan Offshore Finance Authority (AOFA), executes client orders in the financial instruments available through the MetaTrader 5 (MT5) platform.

The purpose of this policy is to provide transparency regarding the execution process and the factors that may influence execution quality.

---

## 2. EXECUTION MODEL

### 2.1 Hybrid ECN/STP

NEOMAAA operates under a hybrid ECN/STP (Electronic Communication Network / Straight Through Processing) execution model. This means that:

- Client orders are routed to external liquidity providers (LPs) for execution.
- The Company acts as an intermediary between the client and the liquidity providers.
- The Company aggregates liquidity from multiple providers in order to offer the best prices available.

### 2.1.1 Acting as Principal or Counterparty

The Client acknowledges and accepts that, under this hybrid model, **Neomaaa Ltd may in certain circumstances act as principal or counterparty to the Client's trades**. This means that not all orders are necessarily routed to an external liquidity provider; a portion may be executed internally by the Company. The Company adopts internal policies to manage any conflict of interest arising from this structure (see Section 9).

Execution is subject to: slippage (positive or negative), latency, requotes (under exceptional circumstances), delayed execution, and prevailing market conditions.

This service is provided on an **execution-only** basis: the Company does not provide investment advice, personalized recommendations, or portfolio management.

### 2.2 Market Execution

All orders are executed under the Market Execution model. This entails that:

- Orders are executed at the best price available at the time of execution.
- There are no requotes.
- Slippage (positive or negative) may occur between the requested price and the execution price.

---

## 3. EXECUTION FACTORS

The Company considers the following factors when executing orders:

| Factor | Description | Priority |
|--------|-----------|----------|
| **Price** | The best price available from liquidity providers | High |
| **Speed** | Order execution time | High |
| **Likelihood of execution** | Likelihood that the order will be completed at the requested price | High |
| **Total cost** | Spread + commission + applicable swap | Medium |
| **Order size** | Impact of the size on available liquidity | Medium |
| **Nature of the order** | Order type (market, limit, stop) | Medium |

---

## 4. ORDER TYPES

### 4.1 Market Orders

Executed immediately at the best price available. These are the fastest orders but are subject to slippage.

### 4.2 Pending Orders

| Type | Description | Execution |
|------|-----------|----------|
| **Buy Limit** | Purchase at a price lower than the current price | Triggered when the ask price reaches the specified level |
| **Sell Limit** | Sale at a price higher than the current price | Triggered when the bid price reaches the specified level |
| **Buy Stop** | Purchase at a price higher than the current price | Triggered when the ask price reaches the specified level |
| **Sell Stop** | Sale at a price lower than the current price | Triggered when the bid price reaches the specified level |
| **Buy Stop Limit** | Combination of Buy Stop and Buy Limit | A Buy Limit is placed once the trigger price is reached |
| **Sell Stop Limit** | Combination of Sell Stop and Sell Limit | A Sell Limit is placed once the trigger price is reached |

### 4.3 Stop Loss and Take Profit Orders

- **Stop Loss:** Automatically closes the position when the price reaches a predetermined level in order to limit losses.
- **Take Profit:** Automatically closes the position when the price reaches a predetermined level in order to lock in gains.

These orders do not guarantee execution at the exact specified price. In the event of gaps or high volatility, they may be executed at the next available price.

---

## 5. SLIPPAGE

### 5.1 Definition

Slippage is the difference between the price requested by the client and the actual execution price. It may be:

- **Positive:** The client obtains a better price than requested.
- **Negative:** The client obtains a worse price than requested.

### 5.2 Causes of Slippage

- High market volatility (economic news, geopolitical events).
- Low liquidity (off-peak trading hours, thinly traded instruments).
- Price gaps (market open, weekends).
- Order size (large orders may impact available liquidity).

### 5.3 Slippage Policy

The Company applies slippage symmetrically: both positive and negative slippage are passed through to the client. The Company does not manipulate slippage for its own benefit.

---

## 6. PRICES AND QUOTES

### 6.1 Source of Prices

The prices displayed on the MetaTrader 5 platform are derived from the quotes provided by the Company's liquidity providers. The Company aggregates prices from multiple sources in order to offer the best bid and ask prices available.

### 6.2 Spread

The spread (the difference between the bid and ask price) is variable and depends on:

- The instrument traded.
- Market conditions (liquidity, volatility).
- The client's account type.
- Trading hours.

Indicative spreads published by the Company are averages or minimums and may widen under adverse market conditions.

### 6.3 Error Quote

In the event that an order is executed at a manifestly erroneous price due to an error in the liquidity provider's quote, the Company reserves the right to:

- Correct the execution price to the correct market price.
- Cancel the trade in its entirety.

The Company will notify the client in the event that a correction is applied for an error quote.

---

## 7. TRADING HOURS

7.1 Forex markets operate Monday through Friday, 24 hours a day (except during server maintenance periods).

7.2 Trading hours vary by instrument. Specific hours are available on the MT5 platform and on the NEOMAAA website.

7.3 During market session opens and closes, liquidity may be lower and spreads may be wider.

7.4 Pending orders may not be executed during market closure periods or price gaps.

---

## 8. MARGIN CALL AND STOP OUT

### 8.1 Margin Call

When the margin level of the client's account falls below the established Margin Call level, the system generates an alert. The client must:

- Deposit additional funds, or
- Close positions to free up margin.

### 8.2 Stop Out

When the margin level falls below the Stop Out level, the system automatically closes open positions, starting with the position showing the largest loss, until the margin level recovers above the threshold.

The Margin Call and Stop Out levels are published on the NEOMAAA website and platform for each account type.

---

## 9. CONFLICTS OF INTEREST

### 9.1 Identification

The Company acknowledges that potential conflicts of interest may arise from its business model. These include:

- The Company derives revenue from spreads and commissions, which could create an incentive to encourage greater trading volume.
- In certain circumstances, the Company may act as counterparty to client trades.

### 9.2 Mitigation

To mitigate conflicts of interest, the Company:

- Maintains internal risk management policies and procedures.
- Segregates trading, compliance, and client service functions.
- Does not incentivize sales personnel based on client losses.
- Provides transparency regarding its trading conditions.
- Publishes this execution policy for client information.

---

## 10. EXCEPTIONAL CIRCUMSTANCES

In exceptional market circumstances, the Company may:

- Widen spreads significantly.
- Restrict or suspend trading in certain instruments.
- Modify leverage levels.
- Temporarily suspend the platform.

Such measures will be taken to protect both clients and the Company and will be communicated to the extent reasonably possible.

---

## 11. REVIEW

This policy is reviewed at least once a year or whenever material changes occur in market conditions, liquidity providers, or the Company's execution model.

---

**Neomaaa Ltd** | IBC 15968 | License L15968/N | AOFA, Anjouan, Union of Comoros

*Last updated: April 2026*
