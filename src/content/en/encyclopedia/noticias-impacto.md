# Economic news and its impact on price

> [!INFO]
> Every relevant macroeconomic release is, potentially, a market event. Prices move fast, spreads widen, stops execute far away. A support agent has to understand **why this happens** to explain it to the customer without getting defensive or lying.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="7" data-label="High-impact releases"></div>
<div className="neo-stat" data-value="30-60 min" data-label="Pre-news window"></div>
<div className="neo-stat" data-value="5-20 pips" data-label="Spreads during event"></div>
<div className="neo-stat" data-value="8/year" data-label="FOMC meetings"></div>
</div>

## Why news moves the market

The price of an asset reflects, at all times, the **sum of expectations** from millions of participants about that asset's future. When news comes out, two things happen in milliseconds:

1. Reality is compared with the prior expectation (the "consensus").
2. Each participant recalculates their projections and reacts.

The price **does not move based on the absolute number**, it moves based on the **surprise** versus what was expected.

> [!EXAMPLE]
> Market consensus expects NFP (US employment) to create 180,000 jobs.
> The release comes out: **250,000 jobs created**.
> Positive surprise for USD → USD strengthens → EUR/USD **falls**.
> Even if the absolute number is good for the economy, what matters is that it beat expectations.

If consensus was 180k and the release was 180k, impact is minimal because the price already "had it priced in".

## The 7 highest-impact news releases

### 1. NFP — Non-Farm Payrolls
- **What it is:** number of non-farm jobs created in the US in the last month.
- **When:** first Friday of each month, 13:30 GMT.
- **Why it matters:** it's the strongest proxy of US employment conditions, and employment is one of the Fed's dual-mandate pillars.
- **Moves:** anything with USD (EUR/USD, GBP/USD, USD/JPY, gold).

### 2. CPI — Consumer Price Index
- **What it is:** consumer price inflation.
- **When:** monthly, approximately mid-month.
- **Why it matters:** the Fed decides rates based (among other things) on inflation. If CPI comes in hotter than expected, the market prices in more rate hikes and USD strengthens.
- **Variants:** headline CPI, Core CPI (excluding food and energy, the most watched), PCE (the Fed's favorite indicator).

### 3. FOMC — Federal Reserve rate decision
- **What it is:** Federal Open Market Committee meeting. Sets the benchmark interest rate.
- **When:** 8 times a year, Wednesdays, 18:00 GMT (+ press conference 30 min later).
- **Why it matters:** it's the most important event of the month it falls in. Moves all markets.
- **Warning:** the statement and Powell's press conference move the market **more** than the decision itself. The tone (hawkish/dovish) sets expectations for the next 6 months.

### 4. ECB — European Central Bank rate decision
- **When:** ~8 times a year, Thursdays, 12:15 GMT (+ press conference at 13:00).
- **Moves:** anything with EUR. Lagarde's speech can move EUR/USD 60–100 pips in minutes.

### 5. GDP — Gross Domestic Product
- **What it is:** economic growth of the country.
- **When:** quarterly, with subsequent revisions.
- **Impact:** medium-high. Less immediate than employment or inflation but affects the long-term view.

### 6. ISM Manufacturing PMI
- **What it is:** manufacturing-sector purchasing managers' index. A value > 50 = expansion, < 50 = contraction.
- **When:** first business day of the month.
- **Impact:** medium-high — it's a leading indicator (anticipates recessions).

### 7. Retail Sales
- **What it is:** US retail sales.
- **When:** monthly, around the 15th.
- **Impact:** medium. Measures consumer health, which is 70% of US GDP.

## How to read an economic calendar

The two most-used calendars are **Forex Factory** and **Investing.com**. Every event has:

| Field | What it means |
|-------|---------------|
| Time | Exact release time |
| Currency | Currency affected (USD, EUR, GBP…) |
| Impact | Low / Medium / High (three color levels) |
| Actual | Released number |
| Forecast | Analyst consensus |
| Previous | Prior month's number |

General rule: **only high-impact events (red) justify strong precautions**. Medium ones mostly affect intraday traders; low ones are noise.

## Pre, during and post-news behavior

<div className="neo-timeline">
<div className="neo-timeline-step"><span className="neo-timeline-step-title">PRE (30–60 min before)</span><span className="neo-timeline-step-desc">Volume drops, spreads start widening, large positions get trimmed, "false" anticipation moves appear.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">DURING (sec 0 → min 3)</span><span className="neo-timeline-step-desc">Whipsaw 30–80 pips. Spreads explode (0.3 → 5–15 pips on majors, 20+ on exotics). Negative slippage on stops almost guaranteed.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">POST (min 3 → 30)</span><span className="neo-timeline-step-desc">The market "digests" the data and picks a direction. Spreads normalize. The continuation or retracement appears.</span></div>
</div>

### Real example — NFP

> [!EXAMPLE]
> NFP comes in at 250k vs 180k expected. EUR/USD was at 1.0850.
> **Minute 1:** violent drop to 1.0810 (-40 pips) with spread widened to 5 pips.
> **Minute 5:** bounce to 1.0830, people closing shorts for a quick profit.
> **Minute 30:** resumes the drop to 1.0795 with the market fully digested.
> A client with a stop loss at 1.0820 was filled at 1.0815 (5 pips slippage) → perfectly normal.

## Risk strategy and what to communicate to the customer

| Recommendation | Why |
|---------------|---------|
| Close short-term positions before high-impact events | Avoid random whipsaw |
| Reduce leverage before the news | Stop has more room to breathe |
| Don't use "tight" stops: give room or use mental stops | Tight stops fill with slippage |
| Know the spread will widen | Don't panic when you see a 10-pip spread |

## Black swan events — why NBP and safeguards matter

Some events nobody expects, and they break normal risk models. Historical examples:

- **SNB 2015 (Swiss National Bank):** the Swiss bank removed the 1.20 floor on EUR/CHF. EUR/CHF dropped from 1.2000 to 0.8500 **in minutes**, with no liquidity. Client accounts went negative. Brokers like Alpari UK went bankrupt.
- **COVID March 2020:** SPX500 drops of 10% in a day. Oil futures trading at **negative** (−37 USD) for the first time in history.
- **Flash crashes:** GBP/USD on October 7, 2016, fell 6% in 2 minutes at 4 AM GMT due to a miscalibrated algorithm.

In these events, a leveraged client can lose **more than they deposited**. That's why two concepts are key:

- **NBP (Negative Balance Protection):** the broker commits to resetting any negative balance to zero. NEOMAAA offers NBP on standard retail accounts.
- **Segregation of funds:** client capital sits in accounts separate from the broker's operating capital. If the broker goes bankrupt, the client recovers their funds.

## What to say when the customer asks "why did my stop get hit"

> [!WARNING]
> Support must NEVER say "it was our fault" or "it was your fault". Both are incorrect.

The model response:

> "I understand the frustration. What happened is that during [event X / a violent move / low liquidity], the price moved faster than the system could update your stop. Your stop was set at [level], but when it executed, the next available price on the market was [filled level]. This is called slippage and it's a normal feature of the market, not a broker error. Your contract [order execution policy] documents how these cases are handled. Would you like to review the exact timestamp of the trade together to confirm?"

Three things **not** to say:
- "That's how the market works" (sounds dismissive)
- "You should have used a wider stop" (it's judgment, not information)
- "The broker has nothing to do with it" (defensive, creates distrust)

## Operational summary for the team

> [!TIP]
> - News moves the market through **surprise** vs expectation, not through the absolute number.
> - There are 7 events that move almost everything: NFP, CPI, FOMC, ECB, GDP, ISM, Retail Sales.
> - During a high-impact release, spreads widen, slippage is normal, stops can fill far from the set price.
> - Black swans exist: NEOMAAA protects with NBP and segregation of funds.
> - Support doesn't defend or blame: it explains how the market works with empathy.
