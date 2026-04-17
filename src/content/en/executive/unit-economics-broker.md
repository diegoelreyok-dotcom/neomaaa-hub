# Unit Economics — How a Retail Broker Makes Money

**Executive document — CONFIDENTIAL OWNERS**
**Neomaaa Ltd (IBC 15968) | License L15968/N | AOFA Anjouan**
**Audience: Diego, Angel, Yulia, Stanislav**
**Version: 1.0 | Date: April 2026**

---

> **NOTICE:** This document describes structural unit economics mechanics of retail FX/CFD brokers based on public industry ranges (ESMA, ASIC, NFA, annual reports of listed brokers). It does not contain internal NEOMAAA numbers. The `[DATA:]` marks places where owners must complete with their own figures at the close of each fiscal month.

> [!WARNING]
> **Industry benchmarks (CAC, LTV, churn, payout ratios, LP margins) are April 2026 snapshot estimates** based on public reports of listed brokers, consultancy research and ESMA/ASIC data. These numbers **vary significantly** by market cycle (crypto bull, recession, news cycles), by geographic market (LATAM vs EU vs Asia), by acquisition channel (paid vs organic vs IB) and by client type (retail vs institutional). Use as general direction, **not as literal operational target**. Revalidate against updated benchmarks each quarter before making capex/opex decisions based on these numbers.

---

## INDEX

1. The retail broker P&L on one page
2. Revenue streams explained in detail
3. Costs explained in detail
4. CAC — Customer Acquisition Cost
5. LTV — Lifetime Value
6. LTV:CAC ratio — the most important KPI
7. Payback Period
8. Cohort analysis — how to see the truth
9. Numerical example — typical retail broker client
10. The five indicators Diego watches every Monday
11. Targets for NEOMAAA year 1
12. When NOT to scale marketing
13. When to scale aggressively

---

## 1. The retail broker P&L on one page

Retail broker business looks complicated from the outside but reduces to a very simple equation: revenue per client minus cost per client minus fixed costs. What makes it twisted is that revenue has five sources, costs have six, and everything moves with the client's volume which in turn moves with onboarding quality, service, and market luck.

The correct way to read a retail broker P&L is top to bottom, stopping at each margin:

```
REVENUE (gross):
+ Spread markup revenue
+ Commission revenue (Raw accounts $3/side)
+ Swap revenue net (overnight financing)
+ B-Book flow absorbed (net client PnL lost)
+ Inactivity fees (if applicable)
+ Conversion fees (FX between accounts)
+ Deposit/Withdrawal fees (rare, almost all free)

- COSTS (direct):
- Liquidity Provider costs (interbank markup ~0.2-0.5 pip)
- PSP processing fees (2-5% of deposit)
- Chargeback costs (1-3% card volume)
- Affiliate commissions (30-50% revenue share IB tiers)
- Bonus costs (if given — e.g. Raw commission rebates)

= GROSS PROFIT (healthy margin 40-60%)

- OPERATING COSTS:
- Payroll (40-60% of gross profit typical)
- Tech/MT5 license ($10-20K/month)
- Compliance (Sumsub, Refinitiv, legal)
- Marketing budget (30-50% of revenue for scale)
- Office, travel, misc

= EBITDA (healthy margin 10-30% post scale)

- NON-OPERATING:
- Interest on reserves
- FX gains/losses
- Regulatory fees/fines
- Tax (offshore: ~0-10%, depends)

= NET INCOME
```

Three structural observations that matter for strategic thinking:

**Observation 1 — Revenue is not homogeneous.** A Standard client generates revenue mostly via spread markup and B-Book; a Raw/Institutional client generates mostly via commission and some swap. This means product mix determines margin: 100 Raw clients are not worth the same as 100 Standard clients.

**Observation 2 — Healthy gross margin is between 40% and 60%.** Below 40% indicates either expensive LP, or poorly managed B-Book (clients winning), or heavy mix of expensive PSPs. Above 60% probably indicates too much absorbed B-Book without hedge — which is long-term unsustainable due to risk.

**Observation 3 — Healthy post-scale EBITDA is between 10% and 30%.** Very efficient brokers with affiliates outsourcing sales reach 25-35%. Brokers with large internal sales and expensive marketing stay at 10-15%. This defines how much payroll the business can support at steady state.

---

## 2. Revenue streams explained in detail

### Stream 1 — Spread markup

The broker adds a number of basis points (bps) or pips to the spread received from the Liquidity Provider (LP). It is the oldest and most transparent retail monetization mechanism. Example: the LP quotes EURUSD at 0.2 pip, NEOMAAA quotes 1.0 pip to the client → the markup is 0.8 pip. In a typical Standard account the aggregate markup is between 0.5 and 1.5 pips for majors, 2-5 pips for minors, and 5-20 pips or more for exotics and CFDs.

Practical formula:

```
Spread markup revenue = markup_in_pips × pip_value_USD × lots_traded
```

For 1 EURUSD round-turn lot with 0.8 pip markup: 0.8 × $10 × 1 = $8 of revenue.

If a client trades 100 lots/month with that markup: $800/month of revenue just from spread. That number inflates quickly for active clients and is linear with volume.

This is the dominant revenue for Standard/Cent accounts, where the client pays all the cost in the spread and there is no explicit commission. It is also the most stable revenue month to month because it does not depend on the client losing (like B-Book) or on macro events.

### Stream 2 — Commission (Raw accounts)

Raw/ECN accounts offer raw LP spread plus a commission per lot. The industry standard model is $3-$7 per side (i.e. $6-$14 round-turn). NEOMAAA charges $3/side = $6 round-turn.

The LP typically charges the broker between $1 and $2 per side for that raw execution. Therefore the broker's net margin on commission is $1-$2 per side, or $2-$4 round-turn. For 100 lots:

- Gross revenue: 100 × $6 = $600
- LP cost: 100 × ~$2 (combined) = $200
- Net commission revenue: $400

Margin on gross commission is typically 60-70%. This is the dominant revenue for Raw / Institutional accounts, and for scalpers and high-volume algorithmic clients. Scales linearly with lots traded, same as spread markup but with lower per-trade markup (raw spread).

### Stream 3 — Swap (overnight financing)

When a client keeps a position open at the close of the trading day (17:00 NY), a swap charge or credit is applied based on the interest rate differential of the two currencies in the pair. The broker adds an additional markup of 0.5% to 2% annualized on top of that differential.

General formula:

```
Swap = (long_currency_rate - short_currency_rate + broker_markup) / 360 × notional
```

Swap is silent but huge revenue on clients who trade swing or multi-year hold. Typical retail clients have no awareness of swap cost and absorb it without complaining.

Wednesdays swap is charged triple to compensate for weekend settlement. For carry trades (AUDJPY, NZDJPY), swap can represent 30-40% of the effective trader cost over months.

### Stream 4 — B-Book flow absorbed

This is the most profitable and most volatile component. When a client trades in B-Book mode (the broker is counterparty), their losses are direct broker revenue. Public ESMA data for 2018-2024 shows that 74-89% of retail clients lose. This means that if the broker absorbs flow in B-Book with criteria, the mathematical expectation is positive.

Contribution range of B-Book to total revenue in well-operated retail brokers: **30% to 60%**. That is why no retail broker is 100% A-Book despite what they say in marketing — the business becomes economically unviable if disciplined B-Book is abandoned.

B-Book risk is that a client wins big. That is why the dealing desk (owner: Pepe) applies partial or total hedging for clients showing systematic profitability. See `ab-book-policy.md` for the complete routing policy.

### Stream 5 — Others (minor but relevant)

- **Inactivity fee:** $5-10/month after 3-6 months of inactive account. Standard model. Contributes 1-3% of total revenue but is pure revenue (100% margin).
- **FX conversion fee:** when the client deposits in one currency and trades in another, a conversion spread is charged (1-2%). Minor revenue but relevant in markets where local deposit is frequent (PIX in Brazil, Astropay in LATAM).
- **Deposit/withdrawal fees:** most retail brokers absorb the cost to maintain UX. If charged, it is to disincentivize micro-withdrawals. Not strategic revenue.
- **Unpaid affiliate rebates:** when an IB stops bringing clients for X months, their commission is withheld or expires. Not explicit revenue but reduces costs.

---

## 3. Costs explained in detail

### Cost 1 — Liquidity Provider fees

The LP charges the broker for execution, either via interbank markup or explicit commission. For A-Book accounts this is the dominant cost.

Typical LP markup ranges over institutional mid-market:

| Category | Typical LP markup |
|---|---|
| Majors FX (EURUSD, GBPUSD) | 0.1 – 0.3 pip |
| Minors FX (EURJPY, GBPAUD) | 0.3 – 0.8 pip |
| Exotics FX (USDTRY, USDZAR) | 2 – 10 pips |
| Metals (XAUUSD) | 15 – 25 cents |
| Indices (US30, NAS100) | 0.5 – 1.5 pts |
| Crypto CFD (BTCUSD) | 10 – 40 USD |

Formula:

```
LP cost = LP_markup_pips × pip_value × A-Book_lots
```

Typically LP cost is 30-50% of broker's gross spread markup in A-Book. For B-Book the LP cost reduces drastically because it is not routed to LP — but partial hedge cost appears when necessary.

### Cost 2 — PSP processing fees

Payment Service Providers charge for processing deposits and withdrawals. It is a direct cost that grows with funding volume, not with trading volume.

Typical ranges:

| Method | Cost per transaction | Rolling reserve |
|---|---|---|
| Visa/Mastercard (card) | 2.5 – 4.5% + $0.30 flat | 5 – 10% for 6 months |
| SEPA wire | 0.5 – 1% + $1-5 flat | 0% |
| SWIFT wire | $15-40 flat | 0% |
| Crypto (USDT/BTC) | 0.5 – 1.5% total | 0% |
| PIX (Brazil) | 1.5 – 3% | 5% for 3 months |
| Astropay (LATAM) | 2 – 4% | 5-10% for 3-6 months |
| Open Banking (EU) | 0.5 – 1.5% | 0-5% |

Critical treasury data point: **locked rolling reserves are effectively frozen capital**. A broker processing $2M/month by card with 8% rolling reserve has $960K (6 months × 8% × $2M) tied up in each merchant account. This affects real cash runway.

Typical estimate: **1.5-4% of processed deposit volume is lost in PSP fees**, plus reserves. Withdrawals typically have similar costs, although many PSPs only charge the deposit.

### Cost 3 — Chargebacks

Chargeback is when the client disputes the transaction with their bank. The bank returns the money and the broker loses the deposit, plus a PSP dispute fee of $25-50, plus damage to merchant rating.

Typical chargeback rate in retail FX/CFD (categorized as high-risk by Visa/MC): **1-3%**. If the broker exceeds 2% sustained, the PSP can:

1. Increase rolling reserve
2. Increase processing fee
3. Terminate the merchant account (catastrophe)

That is why compliance and fraud filtering are inseparable from unit economics. A broker with 3% chargebacks burns its margin in disputes and risks losing the ability to accept cards.

Total estimated cost: **1-2% of card deposit volume** ends up leaving as net chargebacks (loss of deposit + fee + time).

### Cost 4 — Affiliate commissions

NEOMAAA's IB model uses Bronze 30% / Silver 40% / Senior 45% / Elite 50% tiers of broker revenue per referred client. Paid monthly with retroactivity.

For a broker with strong IB channel (LATAM standard model), **30-50% of gross revenue is paid in affiliate commissions**. This is the largest variable cost of the business after LP.

The trade-off is strategic:

- **Effective affiliate CAC** (blended): $100-300 per FTD
- **Paid marketing CAC** (Meta, Google): $200-500 per FTD

IB is cheaper but eats perpetual margin on client revenue. Paid marketing costs more upfront but the client is 100% owned. Most healthy brokers operate with a mix of 40-60% IB channel / rest organic + paid.

### Cost 5 — Bonus and rebates (optional)

Some brokers give:
- Deposit bonus (typically 20-100% of deposit, non-withdrawable until trading X lots)
- Volume cashback ($0.5-2 per lot traded)
- Loyalty programs
- Contest prizes

The real cost of a well-structured bonus program is 5-15% of revenue, because most clients never reach the bonus release threshold. The cost perceived by the client is much greater than the real cost to the broker.

NEOMAAA must decide bonus strategy jointly between dealing / marketing. The risk is attracting bonus-hunters (chargeback-prone) and not genuine clients.

### Estimated monthly operating costs (mid-size broker year 1)

| Category | Monthly range USD |
|---|---|
| Payroll (15-20 people) | $40-100K |
| Tech (MT5 license + infra + tools) | $10-20K |
| Compliance (Sumsub + Refinitiv + legal retainer) | $5-10K |
| Marketing (variable, depends on burn) | $30-150K |
| Office/ops | $3-8K |
| External legal/accounting | $3-5K |
| **Total OpEx** | **$90K – $300K/month** |

The wide range reflects the strategic decision of how much to accelerate: a broker spending $90K/month is in "survive and validate" mode, one spending $300K/month is in "scale hard" mode. Diego must define which regime applies each quarter.

---

## 4. CAC — Customer Acquisition Cost

CAC is the total cost of acquiring a client who makes a First Time Deposit (FTD). **The canonical metric is "cost per FTD", not cost per signup.** A signup without deposit is worth zero.

Formula:

```
CAC = (marketing_spend + attributable_sales_payroll + tooling + attributable_overhead) / FTDs_in_period
```

Industry ranges for retail FX/CFD by channel:

| Channel | Typical CAC per FTD |
|---|---|
| Organic (SEO, content) | $50 – $150 |
| Paid Meta Ads | $200 – $500 |
| Paid Google Ads | $250 – $600 |
| Affiliate / IB (blended) | $100 – $300 |
| Influencer campaigns | $300 – $700 |
| Email marketing (existing base) | $30 – $80 |
| Paid Telegram / Discord | $150 – $400 |
| Events / Expos | $500 – $1,500 |

**Healthy blended benchmark total in a retail broker: $150 – $400 per FTD.**

NEOMAAA operates in markets (LATAM, CIS, MENA, Asia phase 2) where CAC tends to the lower end of the benchmark — especially via local IBs, organic channel from Traders Hub podcast, and Franco as ambassador. The most expensive markets would be Spain and continental Europe (which are not priority in year 1).

Heuristic rule: if CAC grows 20%+ month over month sustained, or if FTDs fall while spend rises, cut the problem channel and review.

---

## 5. LTV — Lifetime Value

LTV is the total net revenue a client generates throughout their entire life as broker client. Calculated by cohorts (clients onboarded in the same month) and tracked 12-18 months.

Typical industry ranges for retail:

| Segment | Typical LTV |
|---|---|
| Blended average LTV | $500 – $2,000 |
| Top 20% clients (Pareto) | $5,000 – $50,000 |
| Bottom 80% clients | $50 – $300 |
| Top 1% whales | $100K+ |

**The curve is extremely asymmetric.** The average client does not exist: what exists is a mix of many small clients who lose quickly + a handful of clients who trade for a long time and more than compensate. Optimizing for retention of the top 20% is much more valuable than trying to improve the average LTV of the bottom 80%.

Typical churn curve:

| Point | Cumulative churn |
|---|---|
| 3 months | 70% |
| 6 months | 85% |
| 12 months | 92% |
| 24 months | 96% |

Clients who are still active at 12 months are the ones who make the business profitable. That is why the real product and service win is not in capturing but in retaining the cohort of disciplined traders who will trade 12-36+ months.

---

## 6. LTV:CAC ratio — the most important KPI

This ratio summarizes the broker's economic viability in one number.

```
LTV:CAC = LTV_blended / CAC_blended
```

Interpretation:

| Ratio | Diagnosis | Action |
|---|---|---|
| < 2:1 | Burning capital, not sustainable | Stop scale, review channels |
| 2:1 – 3:1 | Slow break-even | Optimize retention, lower CAC |
| 3:1 – 5:1 | Healthy | Reinvest in growth |
| > 5:1 | Excellent | Scale aggressively |

**The operational target for a healthy retail broker is >3:1.** Below 2:1, even if top-line grows, the broker destroys value and depends on external financing to survive.

NEOMAAA must measure this ratio by channel and market. It may happen that blended is at 3:1 but a specific market is at 1.5:1 and another at 6:1 — in that case spend is redistributed to the profitable channel/market.

---

## 7. Payback Period

The payback period is how many months client revenue takes to recover the CAC it cost to acquire them. It is the complement of LTV:CAC: measures recovery speed.

Industry ranges:

| Payback | Diagnosis |
|---|---|
| < 6 months | Excellent — cash recycles fast |
| 6 – 12 months | Healthy industry benchmark |
| 12 – 18 months | Viable but requires high working capital |
| > 18 months | Problematic — review channel or model |

Payback matters because it determines how much working capital the broker needs to sustain growth. A CAC of $300 with 3-month payback allows scaling with little capital. A CAC of $300 with 15-month payback requires serious financing to continue acquiring.

Short payback also reduces risk of PSP freeze or regulatory crisis: cash has already been recovered before the client could cause problems.

---

## 8. Cohort analysis — how to see the truth

Averages lie. The business truth is seen in cohorts.

Standard process:

1. Group clients by onboarding month (April 2026 cohort, May 2026, etc.)
2. Follow each cohort quarter to quarter:
   - Month 1: initial deposits, trades, revenue
   - Month 3: % still active, accumulated revenue
   - Month 6: partial LTV, churn rate
   - Month 12: LTV, final churn, top 20% composition

What to look for:

- **Do recent cohorts improve or worsen?** If month-3 LTV of April 2026 cohort is worse than January 2026, there is product or channel mix degradation.
- **Which channel produces cohorts of highest LTV?** CAC can be the same but LTV per channel diverges a lot.
- **Which market has better retention?** LATAM vs MENA vs CIS — seen after 3-6 months of operation.
- **Is the top 20% being maintained?** If the top starts churning earlier, the business decelerates structurally.

Without formal cohort analysis, the broker flies blind. It is the tool that separates rigorous management from intuitive management.

---

## 9. Numerical example — typical retail broker client

Illustrative example of an average Standard client (based on industry averages, not NEOMAAA data):

**Profile:** deposits initial $500, trades 5 lots/month, lasts 6 months before blow-up or churn.

**Gross monthly revenue:**

- Spread markup: 5 lots × 1.2 pip × $10/pip = $60
- Swap (occasional overnight positions): $5
- Monthly total: $65
- 6-month total: **$390** gross revenue

**Direct client costs:**

- LP markup (50% of spread if A-Book): -$30
- PSP fees (2% of initial deposit): -$10
- Affiliate commission if came via IB Silver (40%): -$156
- **Total direct costs: -$196**

**Net gross client revenue (before CAC):** $390 - $196 = **$194**

**Assumed CAC:** $250

**Net client contribution:** $194 - $250 = **-$56 (loss)**

**Critical observation:** this individual client leaves a loss. The broker is profitable because the cohort also includes the top 20% who compensate. If the 80% loses $56 and the top 20% contributes $1,200/client on average:

```
Cohort 100 clients:
- 80 × (-$56) = -$4,480
- 20 × $1,200 = +$24,000
- Cohort net: +$19,520
- Per client: $195 net
```

This is the real blended LTV and why retail marketing lives off Pareto. If the top 20% degrades (because they leave to a competitor, or because dealing harasses their trades), the whole model breaks even if total volumes look fine.

---

## 10. The five indicators Diego watches every Monday

The founder's weekly obligation. Ten minutes, one email, five numbers:

1. **Revenue WoW (week over week)** — raw trend. Growing, flat, falling?
2. **FTDs counted this week + total CAC** — if FTDs falls and CAC rises, immediate problem.
3. **Cash burn / net cashflow** — how much cash came in vs how much went out. Estimated runway.
4. **Weekly chargeback rate** — alarm if >1.5%, critical if >2%.
5. **Client fund balance stability** — matches between client account and obligations. Difference >0.5% is red flag.

If these five are healthy, the business is healthy weekly. If any deviates, Monday turns into immediate tactical review with the corresponding team (marketing, dealing, compliance, finance).

---

## 11. Targets for NEOMAAA year 1

Based on industry retail FX/CFD benchmark with fresh-launch broker in LATAM + CIS + MENA markets:

| KPI | Month 1 target | Month 6 target | Month 12 target |
|---|---|---|---|
| Monthly FTDs | 200 – 500 | 1,000 – 2,000 | 2,500 – 5,000 |
| Blended CAC | < $400 | < $300 | < $250 |
| Blended LTV (12m projected) | n/a | > $600 | > $900 |
| LTV:CAC ratio | n/a | > 2.5:1 | > 3.5:1 |
| Gross margin | > 35% | > 45% | > 50% |
| EBITDA margin | negative | break-even | positive 10-20% |
| Chargeback rate | < 2% | < 1.5% | < 1% |
| 3-month churn | < 75% | < 70% | < 65% |

These are planning targets, not commitments. If at month 6 NEOMAAA is at LTV:CAC 2:1 it is not immediate panic — it is signal to review channels and tighten retention. If month 12 remains below 3:1, then it does require strategy change.

**[DATA: current cash runway at close of April 2026]**
**[DATA: owners-agreed month 6 monthly revenue target]**
**[DATA: month 1-6 marketing budget approved by Yulia/Stanislav]**

---

## 12. When NOT to scale marketing

Hard rules. If any is met, slow or reduce spend until corrected:

- **CAC > 1/3 of projected LTV.** Negative economics, every marketing dollar destroys value.
- **Chargeback rate >2% sustained 2+ weeks.** The problem is targeting or onboarding, not lack of spend.
- **Month 1 retention < 40%.** New clients do not come back to trade after the first month — product or support failing.
- **New market with LTV:CAC < 2:1 after 3 months.** That market is not profitable with the current playbook.
- **PSPs with active tension** (rolling reserve increased, merchant review, threat termination). More volume worsens the problem.
- **Saturated support team** (response times >24h sustained). Scaling onboarding destroys retention.
- **Compliance with growing backlog** (KYC pending >48h, unreviewed alerts). Overloaded regulatory risk.

---

## 13. When to scale aggressively

Rules to press the accelerator:

- **LTV:CAC > 3:1 sustained 3 consecutive cohorts.** The model has real traction.
- **Stable chargeback < 1%.** Fraud control and solid targeting.
- **Stable PSPs with headroom** (rolling reserves at standard plan, no tensions).
- **Support team with proven capacity** (response times < 4h, NPS > 40).
- **Compliance without findings** in last 2 reviews.
- **Positive cashflow 2+ months** or explicitly available funding.
- **Identified new low-CAC channels** with successful pilot tests.

When all are met, the correct decision is 3x the marketing budget next quarter. The scaling window in retail FX is short (12-24 months); not taking advantage of it is giving market to competitors.

---

## Appendix — placeholders for owners

**[DATA: primary and secondary LP contracted at month close]**
**[DATA: active PSPs with volume per provider]**
**[DATA: external accountant — firm and monthly contact]**
**[DATA: A-Book / B-Book mix decided by dealing desk at month close]**
**[DATA: top 3 acquisition channels by FTD volume at month close]**
**[DATA: total cash position across all wallets (operating + client + affiliate)]**

---

**Signature and version control**

| Version | Date | Changes | Approved |
|---|---|---|---|
| 1.0 | April 2026 | Initial owners document | Pending Diego, Angel, Yulia, Stanislav |

**Next review:** quarterly, at next Q offsite.

---

## 14. NEOMAAA Case — Unit Economics per Sales Agent (Stage 1 launch)

> **Restricted to owners (Diego, Angel, Yulia, Stanislav).** This section crosses the variable compensation costs of the sales team against the Stage 1 revenue targets of the broker. Specific per-agent commission data lives in `sales/commissions.md` (sanitized version accessible to the team). The P&L, margin and ROI numbers live only here.

### 14.1 Stage 1 financial reference context

Launch Playbook data, reference framework to calibrate commission policy:

- **Stage 1 operating costs:** ~$34,000/month
- **Revenue target (gross margin ~50%):** ~$68,000/month
- **Base salaries of the 3 agents (Franco, Edward, Luis):** $3,000/month (already included in $34K)

### 14.2 Commission cost per scenario (3-agent team)

**Conservative Scenario — average month**

| Concept | Per Agent | x3 Agents |
|----------|-----------|------------|
| FTD Commissions | $230 | $690 |
| Volume Bonus | $150 | $450 |
| Team Bonus | $100 | $300 |
| **Total commissions** | **$480** | **$1,440** |

Impact: $1,440/month additional over $3,000 base → **$4,440 total in sales comp**. Represents **6.5%** of the $68K revenue target.

**Optimistic Scenario — good month**

| Concept | Per Agent | x3 Agents |
|----------|-----------|------------|
| FTD Commissions | $491 | $1,473 |
| Volume Bonus | $350 | $1,050 |
| Team Bonus | $200 | $600 |
| **Total commissions** | **$1,041** | **$3,123** |

Impact: $3,123/month additional → **$6,123 total in sales comp**. Represents **9.0%** of revenue target.

**Exceptional Scenario — great month**

| Concept | Per Agent | x3 Agents |
|----------|-----------|------------|
| FTD Commissions | $846 | $2,538 |
| Volume Bonus | $600 | $1,800 |
| Team Bonus | $350 | $1,050 |
| **Total commissions** | **$1,796** | **$5,388** |

Impact: $5,388/month additional → **$8,388 total in sales comp**. Represents **12.3%** of revenue target.

### 14.3 P&L impact summary table

| Scenario | Team FTDs | Total Team Dep. | Commission Cost | Total Sales Cost | % of Revenue Target |
|-----------|------------|---------------------|------------------|-------------------|---------------------|
| Conservative | 30 | ~$16,000 | $1,440 | $4,440 | 6.5% |
| Optimistic | 54 | ~$35,000 | $3,123 | $6,123 | 9.0% |
| Exceptional | 75 | ~$82,000 | $5,388 | $8,388 | 12.3% |

### 14.4 Sustainability reading

General retail broker industry rule: acquisition + sales compensation cost should be between **8-15% of gross revenue**. All NEOMAAA model scenarios are within or below that range:

| Scenario | % Revenue | Within range? |
|-----------|-----------|-------------------|
| Conservative | 6.5% | Yes — below (safety margin) |
| Optimistic | 9.0% | Yes — ideal range |
| Exceptional | 12.3% | Yes — within acceptable ceiling |

**Critical point to monitor:** if the 3 agents reach "exceptional month" but real revenue stays below $68K, the % rises out of range. Mitigant: if the agents generate $82K in deposits, broker revenue should be proportional (B-Book flow absorbed + spreads + per-lot commissions), so the scheme is self-regulating — **more deposits = more commissions for agents BUT also more revenue for the broker**.

### 14.5 ROI of commission scheme per agent

```
Revenue per average active client (Stage 1 LATAM estimate):
- Average deposit: $300
- Lots traded/month: 5-10 (typical retail)
- Broker income per lot (spread + internalized commission): ~$8-15
- Monthly revenue per active client: $40-150

If the agent brings 10 FTDs/month and 60% stay active:
- 6 active clients × $75 average revenue = $450/month recurring revenue
- Commission paid to agent for those 10 FTDs: ~$230 (one-off)
- FTD commission payback: ~2-3 weeks of client trading

Estimated LTV active client (12 months): $900 - $1,800
Sales channel CAC (FTD commission per client): $15 - $60
Sales channel LTV:CAC: 15x - 30x
```

### 14.6 Strategic implications for owners

1. **The direct sales channel has excellent LTV:CAC in Stage 1** (15-30x), well above the paid marketing benchmark (3-5x). Justifies maintaining and scaling the sales team before pushing aggressive paid ads.
2. **The FTD clawback (section 5 of the sales doc)** is calibrated to protect the real payback period: if the client does not trade in the first 2-3 weeks, the commission is reversed and the broker does not run at a loss.
3. **The total compensation ceiling ($3,000-$4,000/month per top agent)** is aligned with the margin a productive agent generates for the broker. Raising it without evidence of incremental revenue breaks the 8-15% ratio.
4. **Recommended monitoring:** review monthly the ratio (total sales comp) / (revenue attributed to sales) per agent. If an individual agent exceeds 15% for 2 consecutive months without bringing measurable quality clients (retention + volume), review the case.

### 14.7 Alignment with the public sales document

The version the sales team sees in `sales/commissions.md` **does not expose** broker's revenue target, margin, operating costs, LTV, CAC or ROI numbers. It only shows their personal commissions, tiers, payment mechanics and clawback rules. This separation is intentional for operational and competitive confidentiality.
