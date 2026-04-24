# A-BOOK / B-BOOK POLICY -- NEOMAAA MARKETS

**Internal document -- CONFIDENTIAL**
**Neomaaa Ltd (IBC 15968) | License L15968/N | AOFA**
**Version: 1.0 | Date: April 8, 2026**
**Owner: Pepe (Head of Dealing)**
**Status: DRAFT FOR PEPE'S REVIEW**

---

> **CONFIDENTIALITY NOTICE:** This document is for the exclusive use of the Dealing Desk and Principals of NEOMAAA Markets. Under NO circumstances should it be shared with the sales team, support, clients, IBs or third parties. Unauthorized disclosure constitutes gross misconduct and grounds for immediate termination.

---

## INDEX

1. [Definitions and Execution Model](#1-definitions-and-execution-model)
2. [NEOMAAA Hybrid Model](#2-neomaaa-hybrid-model)
3. [Order Routing Criteria](#3-order-routing-criteria)
4. [Thresholds and Classification Tables](#4-thresholds-and-classification-tables)
5. [Risk Management and Exposure Limits](#5-risk-management-and-exposure-limits)
6. [Toxic Flow Handling](#6-toxic-flow-handling)
7. [Hedging Policy](#7-hedging-policy)
8. [Liquidity Provider Relationships](#8-liquidity-provider-relationships)
9. [Monitoring, Reporting and Alerts](#9-monitoring-reporting-and-alerts)
10. [Escalation to Principals](#10-escalation-to-principals)
11. [Document Review and Updates](#11-document-review-and-updates)

---

## 1. DEFINITIONS AND EXECUTION MODEL

### 1.1 A-Book (Straight Through Processing / STP)

In the A-Book model, client orders are routed directly to a Liquidity Provider (LP). NEOMAAA acts as a pure intermediary:

- The client order is transmitted to the LP in real time.
- NEOMAAA does not take the opposite side of the client.
- Revenue comes exclusively from spread markup and/or per-lot commissions.
- Market risk is borne by the LP, not NEOMAAA.
- The client receives execution at interbank market prices (with markup).

**Advantages:** Zero market risk for NEOMAAA. Full alignment of interests with the client.

**Disadvantages:** Revenue limited to spread/commission. Volume dependent.

### 1.2 B-Book (Internalization / Market Making)

In the B-Book model, NEOMAAA acts as the counterparty to the client's order:

- The order is executed internally against NEOMAAA's book.
- NEOMAAA takes the opposite side of the client.
- Revenue includes spread, commissions AND the net result of the internalized positions.
- Market risk is borne by NEOMAAA.
- The client receives execution at the price quoted by NEOMAAA (based on LP feed).

**Advantages:** Higher revenue per client. Full control of execution.

**Disadvantages:** Exposure to market risk. Requires active position management.

### 1.3 Hybrid Model (A/B Book)

NEOMAAA operates a hybrid model where each order is classified and routed based on predefined criteria. Some orders go to the LP (A-Book) and others are internalized (B-Book). The routing decision is automatic based on rules, with manual override capability by Pepe.

---

## 2. NEOMAAA HYBRID MODEL

### 2.1 Operating Principles

1. **Sustainable profitability:** The model must generate predictable revenue without catastrophic exposure.
2. **Risk management first:** Book stability is never sacrificed to maximize short-term gain.
3. **Automation with oversight:** Routing rules are automatic, but Pepe has full override.
4. **Information segregation:** The sales team does NOT know whether a client is A-Book or B-Book. This information is exclusive to the Dealing Desk.

### 2.2 Routing Decision Flow

```
CLIENT ORDER
       |
       v
[Rules Engine MT5/Bridge]
       |
       +---> Evaluates client profile (classification)
       +---> Evaluates instrument
       +---> Evaluates order size
       +---> Evaluates market conditions
       |
       v
+------------------+     +------------------+
| A-BOOK CRITERIA  |     | B-BOOK CRITERIA  |
| - Profitable     |     | - New client     |
| - Large trade    |     | - Net loser      |
| - Toxic flow     |     | - Small trade    |
| - Institutional  |     | - Cent/Standard  |
+------------------+     +------------------+
       |                         |
       v                         v
    ROUTE TO LP            INTERNALIZE
       |                         |
       v                         v
  LP executes            NEOMAAA counterparty
  (markup/commission)    (spread + net P&L)
       |                         |
       +----------+--------------+
                  |
                  v
         [Continuous monitoring]
         [Rebalance if needed]
```

---

## 3. ORDER ROUTING CRITERIA

### 3.1 By Account Type

| Account Type | Minimum Deposit | Default Routing | Rationale |
|---|---|---|---|
| Cent | $5 | B-Book 100% | Micro trades, LP cost not justified |
| Standard | $50 | B-Book default, A-Book if criteria met | Client volume, profitability through internalization |
| Raw | $500 | Hybrid (70% B / 30% A) [PEPE: DEFINE RATIO] | Balance between profitability and risk |
| Institutional | $50,000 | A-Book 100% [PEPE: DEFINE EXCEPTIONS] | Risk too high to internalize |

### 3.2 By Client Profitability Profile

Classification is based on the client's trading history measured over 30-day periods:

| Classification | Criteria | Routing |
|---|---|---|
| New (0-30 days) | No sufficient history | B-Book |
| Consistent loser | Win rate < 40% OR negative net P&L for 3 consecutive months | B-Book |
| Neutral | Win rate 40-55%, fluctuating P&L | B-Book with monitoring |
| Profitable | Win rate > 55% OR positive net P&L for 3 consecutive months | Progressive migration to A-Book |
| Highly profitable | Win rate > 65% OR P&L > $5,000/month consistent | Mandatory A-Book |
| Toxic flow | Detected by indicators (see section 6) | Immediate A-Book + alerts |

[PEPE: DEFINE -- Confirm win rate and P&L thresholds. Adjust based on expected LATAM client mix.]

### 3.3 By Instrument

| Category | Instruments | Suggested Routing | Notes |
|---|---|---|---|
| Forex Majors | EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, NZD/USD, USD/CAD | Hybrid | High liquidity, competitive spread with LPs |
| Forex Minors | EUR/GBP, EUR/JPY, GBP/JPY, etc. | B-Book preferred | Wider spread, higher margin |
| Forex Exotics | USD/MXN, USD/BRL, USD/TRY, USD/ZAR, etc. | B-Book [PEPE: DEFINE] | Wide spread but gap risk |
| Gold (XAU/USD) | XAU/USD | Hybrid | High volume instrument, requires special attention |
| Silver (XAG/USD) | XAG/USD | B-Book preferred | Lower liquidity than gold |
| Indices | US30, US500, US100, GER40, UK100 | Hybrid | High volume, news correlation |
| Crypto | BTC/USD, ETH/USD, etc. | B-Book preferred [PEPE: DEFINE] | High volatility, wide spread, frequent gaps |
| Stocks/ETFs | 1,500+ stock CFDs | B-Book 100% | Small trades, LP cost not justified |
| Energy | WTI Oil, Brent, Natural Gas | B-Book with limits [PEPE: DEFINE] | Extreme volatility during events |
| Futures | Various | [PEPE: FULLY DEFINE] | Define which are offered and how they execute |

### 3.4 By Order Size

| Order Size (Standard Lots) | Routing |
|---|---|
| Micro (0.01 - 0.09) | B-Book 100% |
| Mini (0.10 - 0.99) | B-Book default |
| Standard (1.00 - 4.99) | Hybrid (based on profile) |
| Large (5.00 - 19.99) | A-Book preferred |
| Very large (20.00+) | Mandatory A-Book |

[PEPE: DEFINE -- Confirm these ranges. Consider whether size relative to account equity should also be a criterion.]

### 3.5 By Market Conditions

| Condition | Action |
|---|---|
| Normal market | Standard routing rules |
| Pre-news (NFP, FOMC, ECB, etc.) | [PEPE: DEFINE] Options: temporarily migrate to A-Book, widen spreads, limit size |
| High volatility (VIX > 25) | [PEPE: DEFINE] Increase A-Book percentage, temporarily reduce leverage |
| Weekend gap | Close B-Book exposure before Friday close [PEPE: DEFINE cutoff time] |
| Flash crash | Pepe manual override, everything to A-Book until stabilized |

---

## 4. THRESHOLDS AND CLASSIFICATION TABLES

### 4.1 Client Classification (Dealing Risk Score)

Each client receives a score of 1-100 that determines treatment:

| Factor | Weight | Metric |
|---|---|---|
| P&L history | 30% | Positive = higher score (more risk for B-Book) |
| Win rate | 20% | Higher win rate = higher score |
| Average trade size | 15% | Larger size = higher score |
| Trading frequency | 10% | Higher frequency = higher score (scalpers) |
| Holding time | 10% | Shorter time = higher score (HFT/scalping) |
| News trading behavior | 10% | Aggressive news trading = higher score |
| Total cumulative deposit | 5% | Higher deposit = higher score |

| Score Range | Classification | Routing |
|---|---|---|
| 0-25 | Low risk | Full B-Book |
| 26-50 | Moderate risk | B-Book with monitoring |
| 51-70 | Elevated risk | Hybrid (50/50) [PEPE: DEFINE RATIO] |
| 71-85 | High risk | Predominantly A-Book (80%+) |
| 86-100 | Toxic flow | 100% A-Book + manual review |

[PEPE: DEFINE -- Validate weights and ranges. Define how often the score is recalculated (suggested: weekly).]

### 4.2 Exposure Limits per Instrument (B-Book)

| Instrument | Max Net B-Book Exposure (USD equiv.) | Alert at 70% | Alert at 90% |
|---|---|---|---|
| EUR/USD | [PEPE: DEFINE] Suggested: $500,000 | $350,000 | $450,000 |
| GBP/USD | [PEPE: DEFINE] Suggested: $400,000 | $280,000 | $360,000 |
| USD/JPY | [PEPE: DEFINE] Suggested: $400,000 | $280,000 | $360,000 |
| XAU/USD | [PEPE: DEFINE] Suggested: $300,000 | $210,000 | $270,000 |
| BTC/USD | [PEPE: DEFINE] Suggested: $200,000 | $140,000 | $180,000 |
| Indices (each) | [PEPE: DEFINE] Suggested: $250,000 | $175,000 | $225,000 |
| Other forex | [PEPE: DEFINE] Suggested: $200,000 | $140,000 | $180,000 |
| **TOTAL AGGREGATE EXPOSURE** | **[PEPE: DEFINE] Suggested: $2,000,000** | **$1,400,000** | **$1,800,000** |

### 4.3 Exposure Limits per Client (B-Book)

| Account Type | Max B-Book Exposure per Client |
|---|---|
| Cent | $500 |
| Standard | $5,000 [PEPE: DEFINE] |
| Raw | $25,000 [PEPE: DEFINE] |
| Institutional | N/A (always A-Book) |

---

## 5. RISK MANAGEMENT AND EXPOSURE LIMITS

### 5.1 Risk Management Principles

1. **Natural diversification:** The LATAM client base tends to be diversified across instruments and directions. Natural netting reduces real exposure.
2. **Daily loss limit:** The Dealing Desk must not exceed a daily loss of [PEPE: DEFINE] on the B-book. Suggested: $10,000 for initial phase.
3. **Monthly loss limit:** Must not exceed [PEPE: DEFINE]. Suggested: $50,000 for initial phase.
4. **Reserve capital:** Maintain a capital buffer of at least [PEPE: DEFINE]x maximum aggregate exposure.

### 5.2 Mandatory Daily Metrics

Pepe must review and document the following metrics every day before 10:00 AM (server time):

| Metric | Frequency | Alert Threshold |
|---|---|---|
| B-Book P&L (previous day) | Daily | Loss > [PEPE: DEFINE] |
| Net exposure per instrument | Daily | > 70% of limit |
| Net aggregate exposure | Daily | > 70% of total limit |
| Top 10 clients by exposure | Daily | Any client > 50% of their limit |
| Clients with daily positive P&L > $1,000 | Daily | Classification review |
| Daily A-Book/B-Book ratio | Daily | Deviation > 15% from target |
| Total volume per instrument | Daily | Unusual peaks |

### 5.3 Alert Level Actions

| Level | Condition | Action |
|---|---|---|
| Green | Exposure < 50% of limits, P&L within range | Normal operation |
| Yellow | Exposure 50-70% of limits OR daily loss > 50% of limit | Monitor every 2 hours, consider partial hedging |
| Orange | Exposure 70-90% of limits OR daily loss > 75% of limit | Mandatory hedging of new positions, notify Principals |
| Red | Exposure > 90% OR daily loss reaches limit | All new orders to A-Book, close hedges, emergency meeting with Principals |

---

## 6. TOXIC FLOW HANDLING

### 6.1 Definition of Toxic Flow

Toxic flow refers to client orders that consistently result in losses for the B-Book. These orders come from traders with informational advantage, arbitrage strategies, or trading patterns that exploit latency or inefficiencies.

### 6.2 Toxic Flow Indicators

| Indicator | Description | Detection Threshold |
|---|---|---|
| Favorable Mark-to-Market | Price moves in client's favor within the first seconds | > 70% of trades with positive MTM at 60 seconds |
| Latency arbitrage | Client consistently executes at prices that change milliseconds later | Pattern detected by bridge/plugin [PEPE: DEFINE tool] |
| Aggressive news trading | Massive orders in the 30 seconds before/after news | > 5 trades in news window per month |
| High-frequency scalping | Trades with duration < 60 seconds that are consistently profitable | > 50 trades/day with duration < 1 minute and win rate > 60% |
| Correlation with LP requotes | Client is profitable specifically during wide-spread moments | Manual analysis required |
| Sustained positive P&L | Consistent month-over-month profitability | Positive P&L > $2,000/month for 3 months [PEPE: DEFINE] |

### 6.3 Actions upon Detected Toxic Flow

| Step | Action | Owner |
|---|---|---|
| 1 | Automatic or manual pattern detection | System / Pepe |
| 2 | Immediate migration of all client orders to A-Book | Pepe |
| 3 | Document the case: client, pattern detected, evidence, date | Pepe |
| 4 | Review spread/commissions applied to the client | Pepe |
| 5 | Assess whether trading conditions (spread, leverage) should be adjusted | Pepe + Principals |
| 6 | Continuous monitoring of the client in A-Book | Pepe |
| 7 | Quarterly review: may be reclassified if the pattern changes | Pepe |

**IMPORTANT:** Under NO circumstances will client orders be rejected or accounts closed for being profitable. The only action is migration to A-Book. Rejecting orders or closing accounts for profitability generates complaints, negative reviews and regulatory issues.

[PEPE: DEFINE -- Specific toxic flow detection tools. MT5 plugins available? Bridge with analysis capability?]

---

## 7. HEDGING POLICY

### 7.1 When Hedging Is Performed

| Scenario | Hedging Action |
|---|---|
| Net exposure per instrument > 70% of limit | Partial hedge to reduce to < 50% |
| Aggregate exposure > 70% of total limit | Hedge the largest positions |
| Pre-high-impact event (NFP, FOMC, etc.) | Hedge all B-Book exposure or temporary migration to A-Book |
| Individual client exceeds 50% of their B-Book limit | Hedge that client's position |
| Daily loss exceeds 75% of limit | Full hedge of all open B-Book positions |

### 7.2 Hedging Instruments

[PEPE: DEFINE -- How are hedges executed? Options:]

| Method | Description | When to Use |
|---|---|---|
| Direct LP | Open opposite position with primary LP | Fast hedging, liquid instruments |
| Secondary LP | Open position with secondary LP | If primary LP has no capacity |
| Cross-hedging | Use correlated instrument to cover | Illiquid instruments (e.g., hedge NZD/USD with AUD/USD) |
| Internal netting | Offset opposing positions between B-Book clients | Always as first option before external hedge |

### 7.3 Hedge Execution Process

1. **Automatic netting:** The system first offsets opposing positions within the B-book.
2. **Net exposure evaluation:** Only the exposure that is not offset requires a decision.
3. **Hedge decision:** Pepe evaluates whether the remaining exposure requires external coverage.
4. **Execution:** The order is placed with the corresponding LP.
5. **Documentation:** The hedge is logged in the daily record with: instrument, size, LP, time, reason.

[PEPE: DEFINE -- Software/tool for hedge tracking. Manual spreadsheet? MT5 plugin? Separate system?]

---

## 8. LIQUIDITY PROVIDER RELATIONSHIPS

### 8.1 Current LPs

| LP | Instruments | Connection Type | Status |
|---|---|---|---|
| [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] |
| [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] |
| [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] | [PEPE: COMPLETE] |

### 8.2 LP Selection Criteria

| Criterion | Weight | Notes |
|---|---|---|
| Competitive spreads | 25% | Compare with market feed |
| Execution speed | 20% | < 50ms ideal |
| Order rejection (rejection rate) | 20% | < 1% acceptable |
| Slippage | 15% | Symmetric (positive and negative slippage) |
| Instrument coverage | 10% | Must cover our main instruments |
| Stability/uptime | 10% | > 99.9% uptime |

### 8.3 LP Monitoring

- **Daily:** Verify that price feed is competitive vs benchmarks.
- **Weekly:** Review execution statistics (fill rate, slippage, rejections).
- **Monthly:** Compare total execution costs between LPs.
- **Quarterly:** Meeting with each LP to negotiate terms.

[PEPE: COMPLETE -- This entire section requires actual data from LPs contracted or under negotiation.]

---

## 9. MONITORING, REPORTING AND ALERTS

### 9.1 Daily Reports (Generated by Pepe or Automated)

| Report | Content | Recipient | Delivery Time |
|---|---|---|---|
| Daily B-Book P&L | P&L per instrument, per top 10 clients, total | Pepe + Principals | 10:00 AM next business day |
| Closing Exposure | B-Book open positions, net exposure per instrument | Pepe | At market close |
| Execution Report | Fill rate, average slippage, rejections, per LP | Pepe | 10:00 AM next business day |
| A/B Migrated Clients | Clients who changed classification during the day | Pepe | Continuous (alerts) |

### 9.2 Weekly Reports

| Report | Content | Recipient |
|---|---|---|
| Consolidated Weekly P&L | Cumulative B-Book P&L, trend, comparison with previous week | Principals |
| Classification Review | Clients whose score changed significantly | Pepe |
| Flow Analysis | A-Book vs B-Book percentage, gross margin per type | Principals |

### 9.3 Monthly Reports

| Report | Content | Recipient |
|---|---|---|
| Monthly B-Book P&L | Total P&L, breakdown per instrument, MoM comparison | Principals |
| Profitability per Account Type | A-Book revenue (commissions/spread) vs B-Book (net P&L) | Principals |
| Limits Review | Assessment of whether current limits are adequate | Pepe + Principals |
| LP Performance | Comparison of costs and execution quality | Pepe |

### 9.4 Real-Time Alert System

| Alert | Condition | Notification |
|---|---|---|
| Critical exposure | > 90% of any limit | Pepe: immediate SMS + email |
| Daily loss exceeded | B-Book daily P&L exceeds limit | Pepe + Principals: SMS + email |
| Toxic flow client detected | Score > 86 or arbitrage pattern | Pepe: dashboard alert |
| LP disconnected | Price feed interrupted > 30 sec | Pepe: immediate SMS + email |
| Unusually large order | > 20 lots in any instrument | Pepe: dashboard alert |
| Volatility spike | Move > 2% in < 5 min in any major | Pepe: dashboard alert |

[PEPE: DEFINE -- Available monitoring and alert tools. Is there an integrated dashboard in the bridge? Is anything additional needed?]

---

## 10. ESCALATION TO PRINCIPALS

### 10.1 Situations Requiring Immediate Escalation

| Situation | Escalation Time | Channel |
|---|---|---|
| B-Book daily loss reaches limit | Immediate | Phone call + message |
| B-Book monthly loss reaches 80% of limit | Immediate | Phone call + message |
| Primary LP disconnected > 5 minutes | Immediate | Message + email |
| Detection of possible market manipulation by client | Within 1 hour | Message + written report |
| Institutional account request > $100,000 | Before accepting client | Email with report |
| Any technical incident affecting execution | Immediate | Phone call |

### 10.2 Situations Requiring Consultation (Not Immediate)

| Situation | Escalation Time | Channel |
|---|---|---|
| Proposal to change exposure limits | Next weekly meeting | Email with proposal |
| Reclassification of institutional client | Within 48 hours | Email with justification |
| LP change or addition of new LP | Before implementing | Dedicated meeting |
| Update of routing rules | Before implementing | Dedicated meeting |
| Quarterly review of A/B Book policy | Quarterly (scheduled) | Meeting + document |

### 10.3 Pepe Decision vs Principals Decision

| Scope | Pepe Decides Alone | Requires Principals Approval |
|---|---|---|
| A/B routing of individual clients | Yes | No |
| Hedging within approved limits | Yes | No |
| Change of exposure limits | No | Yes |
| Suspension of trading of an instrument | Temporary (< 1 hour): Yes / Permanent: No | Yes for permanent |
| Change of spreads/commissions | No | Yes |
| LP change | No | Yes |
| Change of routing rules | No | Yes |
| Manual execution override | Yes (with documentation) | No |

---

## 11. DOCUMENT REVIEW AND UPDATES

### 11.1 Review Schedule

| Frequency | Type of Review | Owner |
|---|---|---|
| Weekly | Review of thresholds and alerts (minor adjustments) | Pepe |
| Monthly | Review of client classification and A/B ratios | Pepe |
| Quarterly | Full policy review | Pepe + Principals |
| Annual | Audit and major update | Pepe + Principals + Compliance |
| Ad hoc | After any significant incident | Pepe + Principals |

### 11.2 Version Control

| Version | Date | Changes | Approved by |
|---|---|---|---|
| 1.0 (Draft) | April 8, 2026 | Initial document for Pepe's review | Pending |
| | | | |
| | | | |

---

## SUMMARY OF PENDING ITEMS FOR PEPE

The following lists all points marked [PEPE: DEFINE] or [PEPE: COMPLETE] that require your input:

| # | Section | Item | Priority |
|---|---|---|---|
| 1 | 3.1 | B/A ratio for Raw account | High |
| 2 | 3.1 | A-Book exceptions for Institutional | High |
| 3 | 3.2 | Win rate and P&L thresholds for classification | High |
| 4 | 3.3 | Definitive routing for exotics, crypto, energy, futures | High |
| 5 | 3.4 | Confirmation of order size ranges | Medium |
| 6 | 3.5 | Pre-news and high-volatility protocol | High |
| 7 | 3.5 | Weekend gap cutoff time | High |
| 8 | 4.1 | Validation of risk score weights and ranges | High |
| 9 | 4.1 | Score recalculation frequency | Medium |
| 10 | 4.2 | Exposure limits per instrument (all) | Critical |
| 11 | 4.2 | Total aggregate exposure limit | Critical |
| 12 | 5.1 | B-Book daily loss limit | Critical |
| 13 | 5.1 | B-Book monthly loss limit | Critical |
| 14 | 5.1 | Required reserve capital | High |
| 15 | 6.2 | Toxic flow detection tools | High |
| 16 | 6.2 | Sustained positive P&L threshold | Medium |
| 17 | 7.2 | Hedging methods and instruments | High |
| 18 | 7.3 | Software for hedge tracking | Medium |
| 19 | 8.1 | Full LP data (entire section) | Critical |
| 20 | 9.4 | Available monitoring and alert tools | High |

**Pepe: Please review this complete document, fill in the marked fields, and return to Principals for final approval.**

---

*Document generated on April 8, 2026. Draft v1.0 -- Do not implement without approval from Pepe and Principals.*
