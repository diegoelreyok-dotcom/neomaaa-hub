# Liquidity Providers — Strategic B2B Relationship

**Strategic document — RESTRICTED ACCESS OWNERS**
**Neomaaa Ltd (IBC 15968) | AOFA License L15968/N**
**Audience:** Diego, Angel, Yulia, Stanislav + Pepe (Head of Dealing)
**Version:** 1.0 | Date: April 13, 2026
**Classification:** CONFIDENTIAL — exclusive use principals + Dealing

> [!DANGER]
> Liquidity Providers (LPs) are critical infrastructure. Without LPs there is no broker — literally. A poorly chosen LP or mismanaged relationship can mean bad spreads for the client (→ churn), high costs (→ compressed margin), deficient execution (→ destroyed reputation), or uncovered exposure (→ material loss). This document consolidates how NEOMAAA Ltd's LPs are selected, contracted, managed, and diversified.

> [!WARNING]
> **LP markup benchmarks, B2B commissions, volume minimums, and contract structures are April 2026 snapshot.** The LP market has cycles: in high volatility periods LPs raise markups and tighten collateral; in compression periods they compete aggressively for flow. Revalidate numbers with at least 2-3 live LPs before renegotiating any material contract. Figures mentioned here are directional, not operational literals.

> [!INFO]
> **Purpose:** complete strategic framework for the B2B relationship management with Liquidity Providers. Defines what an LP is and its role, the 3 LP tiers available in the market, selection criteria, contracting process, mandatory diversification policy, day-to-day operational management, negotiation tactics, critical contractual clauses, red flags for termination, NEOMAAA status and target, and performance KPIs that Pepe monitors.

---

## 1. What a Liquidity Provider is and its role in the broker

A Liquidity Provider (LP) is the institutional counterparty that supplies the quotes (bid/ask) on which the broker quotes to clients, and which absorbs the risk when the broker decides to hedge (A-Book) that flow. In simple terms, when a client buys EURUSD at 1.0850, NEOMAAA has two options: (1) be direct counterparty to the client (B-Book, the broker wins if the client loses) or (2) replicate that trade against the LP simultaneously (A-Book, the broker charges the markup and the LP is the economic counterparty).

### 1.1 What the LP does functionally

- **Price feed:** provides continuous quotes on all broker instruments, with depth (market depth) in Level 2.
- **Execution venue:** accepts orders from the broker (hedge) and executes them against its own liquidity pool or passes to a higher tier.
- **Risk warehouse:** absorbs the risk of broker positions when the broker decides not to keep them in B-Book.
- **Technology:** provides FIX API or MT5 bridge connectivity for low-latency execution.
- **Margin facility:** accepts margin parked from the broker and allows institutional leverage (typically 50:1 to 200:1 vs 1:1 retail).
- **Reporting:** delivers raw execution data, flow PnL, breakdowns for compliance.

### 1.2 Why it is infrastructure, not just another vendor

Changing LP is not like changing an email provider. An LP involves:
- Technical integration (FIX API setup takes 2-4 weeks, MT5 bridge another 1-2 weeks)
- Margin parked (typically $100K-500K+ that you have to move)
- Negotiated contract with specific terms (markup, volume, SLA)
- Legal review (master agreement, ISDA if applicable)
- Compliance review (LP background, jurisdiction, auditor)
- Operational muscle memory (Pepe learned how it routed, how it responded to requotes, bridge quirks)

Changing LP is a 2-3 month project. That's why initial selection matters enormously and diversification from day 1 is not optional.

---

## 2. The 3 LP Tiers available

The forex/CFDs liquidity ecosystem is organized in a hierarchical pyramid. At the top are Tier 1 banks that are global market makers. At the base are retail-friendly aggregators. Each tier has specific trade-offs.

### 2.1 Tier 1 — global banks and prime brokers

**Examples:** LMAX Exchange, Saxo Bank, Goldman Sachs, UBS, Citi, JP Morgan, Bank of America, Deutsche Bank, Morgan Stanley, Barclays.

**Characteristics:**
- Premium liquidity, tightest spreads in the market (EURUSD 0.1-0.3 pip raw).
- Tier 1 execution quality (<10ms latency, fill rate >99%).
- Institutional tier reputation and image.
- Typical markup 0.1-0.3 pip over raw.

**Requirements:**
- **Minimum volume:** typically $100M-500M+/month. Some accept $50M+ if there is a clear roadmap.
- **Minimum margin:** $1M-10M parked.
- **Regulatory standing:** broker must have Tier 1 license (CySEC, FCA, ASIC) or Tier 2+ with impeccable track record. Offshore-only (Anjouan, Comoros, Vanuatu standalone) generally does not qualify in direct Tier 1.
- **Fit & proper:** directors' backgrounds checked, no open lawsuits, no regulatory actions.
- **Operational maturity:** audit trail, compliance framework, demonstrated KYC framework.

**Trade-offs:**
- Restrictive: they dictate terms, negotiation limited at start, react badly to toxic flow (news-trading clients, arbitrageurs, aggressive scalpers).
- If flow is toxic, they raise markup fast or cut the relationship.
- Long onboarding (3-6 months).

**Typical use in mid-size broker:** not accessed directly. Accessed via Tier 2 PoP (Prime of Prime) that aggregates and offers to the broker.

### 2.2 Tier 2 — Prime of Prime (PoP)

**Examples:** Match-Prime (ex-Match-Trade), Advanced Markets, Finalto (ex-Playtech), TopFX, Swissquote Bank (institutional), IS Prime, CFH Clearing, Invast Financial Services.

**Characteristics:**
- PoPs connect mid-size brokers to aggregated Tier 1 liquidity.
- They have the direct relationship with Goldman / UBS / Citi and aggregate it for their broker clients.
- Competitive spreads (EURUSD 0.2-0.5 pip with markup included).
- Typical PoP markup: 0.2-0.5 pip over Tier 1 raw.

**Requirements:**
- Minimum volume $5M-50M/month (much more accessible than Tier 1).
- Minimum margin $50K-500K.
- Broker with active license (offshore OK, CySEC/FCA better).
- Demonstrated broker KYC/AML framework.
- Compliance fit (PoP does DD on the broker).

**Positive trade-offs:**
- Much more accessible for new/medium brokers.
- Reasonable negotiation (can lower markup 10-30% with volume).
- Accept wide variety of flow (less strict than direct Tier 1).
- Faster onboarding (1-3 months).
- More collaborative relationship (PoP wants you to grow, they earn markup on more volume).

**Negative trade-offs:**
- Extra markup (the PoP charges its margin over Tier 1 raw).
- Additional latency (extra hop between broker → PoP → Tier 1).
- Execution quality depends on the PoP (most are good, some have legacy bridges with lag).

**Typical use:** **this is the sweet spot for NEOMAAA at go-live.** New-medium broker with Anjouan license starts with Tier 2 PoPs.

### 2.3 Tier 3 — Retail-focused aggregators

**Examples:** oneZero Financial Systems, PrimeXM (XCore), Gold-i (Matrix Engine), B2Broker, Fortex, Leverate, Centroid Solutions, TickTrader Liquidity Aggregator.

**Characteristics:**
- They are technology + liquidity aggregated from multiple retail-friendly Tier 2/3 LPs.
- Native MT5 integration, fast configuration.
- Wider spreads (EURUSD 0.3-0.8 pip with markup).
- Markup typically 0.3-0.8 pip.

**Requirements:**
- Low minimum volume ($1M-10M/month).
- Minimum margin $20K-100K.
- Valid license (offshore completely OK).
- Light DD.

**Trade-offs:**
- Accessible for very new or small brokers. Quasi plug-and-play with MT5.
- Reasonable but not tier 1 execution.
- Useful as backup, as secondary LP, or for specific products (crypto CFDs).
- Not optimal for the main flow of a broker that wants to compete on spread.

**Typical use:** backup LP, specialized LP (crypto, example B2Broker), or initial LP while onboarding Tier 2.

### 2.4 3 Tiers summary table

| Dimension | Tier 1 (Bank) | Tier 2 (PoP) | Tier 3 (Aggregator) |
|-----------|---------------|--------------|---------------------|
| Examples | LMAX, Saxo, Goldman, UBS | Match-Prime, Finalto, TopFX | oneZero, PrimeXM, B2Broker |
| Typical markup | 0.1-0.3 pip | 0.2-0.5 pip | 0.3-0.8 pip |
| Min volume | $100M+/mo | $5-50M/mo | $1-10M/mo |
| Min margin | $1-10M | $50-500K | $20-100K |
| Required broker license | Tier 1-2 | Offshore OK | Offshore OK |
| Onboarding | 3-6 months | 1-3 months | 2-6 weeks |
| Execution | 99%+ fill, <10ms | 98%+ fill, <20ms | 95%+ fill, <50ms |
| NEOMAAA year 1 use | Not accessible | Core LPs | Backup + crypto |

> [!TIP]
> NEOMAAA's year 1 goal is to have 2-3 Tier 2 PoPs as core, one generalist Tier 3 backup, and one Tier 3 specialized in crypto. Direct Tier 1 is evaluated year 2-3 when volume and license enable it.

---

## 3. LP selection criteria — the 10 mandatory items

Any new LP evaluation must pass through these 10 criteria. Each is scored and the set decides go/no-go.

### 3.1 Cost (markup over raw)

The effective markup is what you add to Tier 1 raw spread. Measured in pips. Pepe requests cost sheets and compares them head-to-head:

**2026 benchmark Tier 2 PoPs:**
- EURUSD markup: 0.2-0.5 pip
- GBPUSD: 0.3-0.6 pip
- Gold (XAUUSD): 8-15 cents
- Indices (US30, NAS100): 0.5-1.5 points
- Crypto (BTCUSD): $5-30 spread

An LP quoting markup clearly out of range (>2x the market) is discarded without additional analysis.

### 3.2 Execution quality

**Key metrics:**
- Fill rate (% of orders executed without rejection): target >98%
- Requote rate (% of quotes requiring confirmation due to slippage): target <2%
- Latency (time from order sent to fill): target <20ms
- Slippage (positive vs negative): must be symmetric, not always negative
- Rejection rate by reason (liquidity, market closed, off-quote): analyze patterns

Pepe obtains this data from the bridge + LP execution reports. An LP with >5% rejections or systematically negative slippage = red flag.

### 3.3 Available instruments

The LP must cover everything NEOMAAA wants to offer:
- **Forex majors + minors + exotics** (minimum 50 pairs)
- **Metals** (XAU, XAG, XPT, XPD)
- **Indices** (US30, SPX500, NAS100, GER40, UK100, JPN225, HK50, etc.)
- **Commodities** (WTI, Brent, natural gas)
- **Stocks** (CFDs on 50-500 blue chip stocks)
- **Crypto** (if the LP covers it, otherwise complement with crypto-specialized LP)
- **Bonds** (US10Y typically the only relevant retail)

NEOMAAA lists 2000+ instruments → likely 1 LP will not cover everything and we will need to combine 2-3.

### 3.4 Leverage acceptance

What leverage does the LP accept for the broker to pass to the client?
- Tier 1 banks: 50:1 to 100:1 typically.
- Tier 2 PoPs: 100:1 to 200:1.
- Tier 3 aggregators: 200:1 to 500:1 in majors, lower in exotics.

NEOMAAA offers leverage up to [DATA: commercialized maximum leverage] to retail client. We need LP that allows leverage ≥ to what we offer, with sufficient margin parked.

### 3.5 LP B-Book risk management

How does the LP manage its own risk? This matters because if the LP B-Books on our A-Book and goes bankrupt, we are exposed. Evaluate:
- LP jurisdiction and regulation (CySEC, FCA better than offshore)
- External auditor (Big 4 vs regional)
- Financial statements (request or at least credit rating)
- Track record (years in market, reputation in institutional forums)
- Capital adequacy (some institutional brokers publish Tier 1 capital ratio)

### 3.6 Technology (FIX API / MT5 bridge)

**Technical questions:**
- FIX API: version 4.4 or 5.0? Documentation? Test environment available?
- MT5 bridge: MetaQuotes certified? Latency overhead?
- Market depth Level 2 available?
- Post-trade reporting data feed?
- Contractual uptime SLA? (target 99.9%)
- Recovery mechanism if bridge goes down (failover, queueing)?

Angel (interim CTO) evaluates technically. An LP with legacy or poorly documented tech is operational nightmare.

### 3.7 LP financial stability

We need confidence the LP will be here in 2-3 years. Red flags:
- Recent ownership changes without clear explanation
- High senior staff turnover
- News of lawsuits or regulatory actions
- Reported cash flow problems
- Parent company with problems

### 3.8 Regulation

**Regulatory tiers (best to worst for counterparty):**
- Tier 1: FCA (UK), CySEC (Cyprus), ASIC (Australia), FINRA/CFTC (USA), MAS (Singapore), FINMA (Switzerland)
- Tier 2: DFSA (Dubai), SCA (UAE), BVI FSC, MFSA (Malta), JFSA (Japan)
- Tier 3: offshore generic (FSC Mauritius, Seychelles FSA, Anjouan AOFA, SVG FSA)

We prefer Tier 1-2 LP. Tier 3 LP acceptable only if complementary (backup, specialized) and with clear justification.

### 3.9 Minimum volume requirement

What monthly minimum volume does the LP require?
- If it requires $20M/mo and I start with $2M → no fit.
- If it requires $5M/mo and I have a projection of $8M at 3 months → OK, negotiate ramp-up period.

### 3.10 Margin requirement and margin policies

- How much margin parked required initially
- How it calculates margin requirement per open position (%, formula, stress tests)
- Margin call policy (how much anticipation, in what currency)
- Margin withdrawal at relationship close (timeline, conditions)

**[DATA: current margin requirement benchmarks negotiated with candidate LPs]**

---

## 4. Comparative matrix — LP evaluation example

To illustrate how to compare objectively, example with 4 hypothetical LPs evaluated on same criteria (illustrative numbers, not real data).

| Criterion | LP-A (Match-Prime PoP) | LP-B (Finalto PoP) | LP-C (TopFX PoP) | LP-D (B2Broker crypto) |
|----------|------------------------|-------------------|------------------|------------------------|
| Tier | 2 | 2 | 2 | 3 |
| EURUSD markup | 0.25 pip | 0.30 pip | 0.35 pip | 0.8 pip |
| XAUUSD markup | 12 cents | 10 cents | 15 cents | 30 cents |
| Instruments | 1,500 FX+CFDs | 2,000+ | 1,800+ | 200 (crypto focused) |
| Max pass-through leverage | 200:1 | 100:1 | 200:1 | 100:1 (crypto) |
| Min volume | $10M/mo | $25M/mo | $5M/mo | $2M/mo |
| Min margin | $200K | $500K | $100K | $50K |
| MT5 bridge | Native cert | Native cert | Native cert | Via partner |
| Average latency | 12ms | 15ms | 18ms | 40ms |
| Fill rate | 99.2% | 98.8% | 98.5% | 96% |
| Regulation | CySEC + Malta | FCA + CySEC | CySEC | IBC BVI + partners |
| Onboarding timeline | 8 weeks | 12 weeks | 6 weeks | 4 weeks |
| Recommendation | Primary core | Secondary core | Backup | Specialized crypto |

In this example, the strategy would be:
- **LP-A Match-Prime** = 50-60% of flow (best markup + fill rate + assumable margin balance)
- **LP-C TopFX** = 30-40% of flow (diversification, low min volume to start)
- **LP-D B2Broker** = 100% of crypto flow (specialized)
- **LP-B Finalto** = consider year 2 when volume justifies $500K margin

**[DATA: real NEOMAAA comparison with LPs evaluated by Pepe, signed cost sheets, closed negotiations]**

---

## 5. LP contracting process — 2 to 4 months

### 5.1 Month 1 — Discovery

**Objective:** identify and contact 5-10 candidate LPs.

**Actions:**
- Market mapping: list all relevant Tier 2 PoPs with LATAM/global presence.
- Initial outreach via LinkedIn, industry referrals, conferences (iFX Expo Dubai, Cyprus; Finance Magnates Barcelona, London Summit).
- First 30-min call with LP sales (mutual pitch).
- Request cost sheet + overview package.
- Filter: discard those that clearly don't fit (absurd min volume, out-of-market markup, legacy tech).
- Month 1 exit: shortlist of 3-5 LPs with data to evaluate.

### 5.2 Month 2 — Mutual DD

**Objective:** deeply evaluate the 3-5 shortlisted + the LP evaluates us.

**Broker actions:**
- Technical deep-dive (Angel + dev team): API docs, bridge setup, test environment, real latency benchmarks.
- Financial DD on the LP: financial statements if available, credit rating, license verified with regulator, legal history.
- Reference calls: talk to 2-3 brokers that use the LP (the LP provides referrals, we also seek independent ones).
- Execution quality test: if the LP allows, demo account with real flow for 2 weeks to measure fill rate, latency, slippage.

**LP actions (what they ask us):**
- Corporate KYB of Neomaaa Ltd (incorporation docs, AOFA license, ownership structure)
- Personal KYC of directors (Diego, Angel, Yulia, Stanislav)
- Neomaaa financial statements (even if pre-launch broker, projections + bank statements)
- Compliance framework (AML, KYC policies)
- Volume projection and typical customer profile
- Business plan / pitch deck

**Month 2 exit:** 2-3 LPs with complete DD and go-ahead from both sides.

### 5.3 Month 3 — Negotiation

**Objective:** close economic and contractual terms.

**Points to negotiate:**
- **Markup:** ask for 10-30% reduction from rack card. A serious broker does not pay list-price markup unless they have no volume or negotiation leverage.
- **Minimum volume commitment:** commit to a realistic 12-month target in exchange for lower markup.
- **Initial margin requirement:** ask for ramp-up (e.g. $100K initial, rises to $300K in 6m with volume).
- **Margin interest:** some LPs pay interest on parked margin (libor + spread). Ask.
- **Volume rebates:** after X monthly volume, markup drops Y%. Incentivize growth.
- **Termination notice:** 30-60 days (short for flexibility) both sides.
- **Dispute resolution:** arbitration in neutral jurisdiction (London LCIA, Singapore SIAC, Cyprus).
- **Execution SLA:** minimum fill rate 98%, latency <20ms, uptime 99.9% — with penalties if breached.
- **Credit line:** very rare to get credit, but if our volume justifies it, worth asking.
- **Information rights:** raw execution data, not just consolidated reports. Important for audit and internal compliance.
- **Exclusivity clauses:** avoid any exclusivity clause. We want multi-LP.
- **Change of control:** if the LP is acquired, we have the right to terminate without penalty.

**Legal review:** firm specialized in financial services reviews master agreement before signing. Do not sign without legal review.

**Month 3 exit:** signed contract with LP #1 (and parallel with LP #2).

### 5.4 Month 4 — Technical onboarding

**Objective:** go-live with real flow.

**Actions:**
- FIX API / MT5 bridge setup in staging environment.
- Unit and integration tests (diverse order execution, cancel, modify, partial fill).
- Credentials migration to production.
- Production test with small size (orders $100-500 notional).
- Post-trade reconciliation: our record vs LP's must match 100%.
- Gradual ramp-up: week 1 with 5% of flow, week 2 25%, week 3 50%, week 4 target.
- Close monitoring first 4 weeks (Pepe daily review).
- Adjustments and optimizations in routing.

**Month 4 exit:** LP operational in production with stable flow.

---

## 6. LP diversification — why multiple

Never 1 single LP. The rule is inviolable. The reasons:

### 6.1 Operational risk

If the single LP has a technical outage (bridge down, DDoS, unplanned maintenance), the broker cannot hedge or quote on certain instruments. Flow stops → clients cannot trade → complaints + reputational.

### 6.2 Counterparty risk

If the LP goes bankrupt, is sanctioned, or has sudden regulatory problem, the parked margin can be frozen 30-180 days. The company is left without hedging capacity and potentially without that working capital.

### 6.3 Price competition

Multiple LPs give you comparable quotes in real time. The system routes to the one with the best price at each moment (smart order routing). This improves execution for the client and negotiates for the broker.

### 6.4 Negotiation leverage

When an LP knows you are multi-LP, they work harder to maintain your flow. If they know you depend on them, they treat you worse in renegotiation. "We are evaluating increasing share to LP-B" is the phrase that resets all negotiations.

### 6.5 Product flexibility

Each LP has strengths: one is good at FX majors, another at metals, another at crypto, another at exotics. Distributing the flow uses the best in each class.

### 6.6 Recommended NEOMAAA year 1 setup

- **LP #1 Primary (Tier 2 PoP, type Match-Prime / TopFX):** 50-60% of flow. Execution core in FX majors + indices + metals.
- **LP #2 Secondary (different Tier 2 PoP, type Finalto):** 30-40%. Active backup + jurisdiction diversification.
- **LP #3 Specialized crypto (B2Broker / FXCM crypto):** 100% of crypto flow, 10-20% of broker total if crypto is relevant product.
- **LP #4 Small backup relationship:** 0-5% of flow. Maintain active relationship (minimum volume, integration ready) in case a core fails.

**Year 2 target:** add LP #5 Tier 2 or perhaps PoP with access to aggregated Tier 1, to start accessing Tier 1 liquidity without contracting directly.

**Year 3 target:** if volume >$100M/mo and license evolves (consider adding DFSA Dubai, SCA UAE, or secondary CySEC), evaluate direct Tier 1 (LMAX or Saxo for example).

> [!WARNING]
> Having 2 "registered" LPs but one inactive does not count as diversified. Both must have current flow and parked margin (even if small). An LP that does not see flow for 6 months starts losing interest and when you need them in emergency treats you like a new client.

---

## 7. Day-to-day operational management

### 7.1 Daily — Pepe (Head of Dealing) + Yulia (Margin)

**Pepe:**
- Review LP execution reports from previous day
- Fill rate, slippage, latency per LP on dashboard
- Any instrument flag (lots of rejection, atypical spread)
- Net exposure per instrument and adjustment if needed

**Yulia:**
- Margin utilization per LP (never close to 90%)
- Anticipate need for margin top-up if utilization rises
- Daily reconcile: margin balance per our record vs LP's

### 7.2 Weekly — Pepe

- Review per-LP performance in complete week
- Routing rebalancing if an LP is performing poorly (e.g. LP-A has 10% more slippage last 7 days → reduce share temporarily)
- Weekly or bi-weekly call with LP account manager (relationship maintenance)
- Market change review (new instrument requested by clients, changes in spread structure)

### 7.3 Monthly — Pepe + Yulia + Diego

- Invoice review (LPs bill markup + fees)
- Detect unexpected charges (hidden fees, rate changes without notification)
- Reconcile total volume reported by LP vs our record
- Formal relationship call with LP senior (not just account manager)
- Broker revenue attributable to spread LP#1 vs LP#2 vs LP#3

### 7.4 Quarterly — all principals + Pepe

- Full LP meeting ideally in-person (conference, or visit Dubai/Limassol/London)
- Rate renegotiation if volume grew (every quarter is adjustment cycle)
- Review of adding new LP or removing one
- Risk Register update (LP counterparty risk score)

### 7.5 Annual

- Full contract review and renewal
- Comparison with market alternative offers (active DD of 2-3 new LPs)
- Go/no-go decision to continue with each LP

---

## 8. Negotiating with LPs — power dynamics and tactics

The relationship with an LP is not fixed. The balance of power changes with volume, time, and competitive context. Understanding what phase we are in dictates the negotiation.

### 8.1 Initial phase — the LP has power

New broker, without track record, with offshore license, projected but undemonstrated volume. The LP accepts the relationship with rack card terms (high markup, full margin, committed volume). The broker negotiates little, accepts the standard to get on board.

**Strategy:** focus on choosing the least bad of those available. Accept initial terms but sign with review clauses at 3/6 months. Real negotiation starts when you have data.

### 8.2 Traction phase — balance

Broker with 3-6 months operating, growing volume, measurable flow and "not toxic" (not pure scalper news-trader). Here the LP realizes you are a valuable client.

**Strategy:** first formal renegotiation. With data of real volume + demonstrated flow quality, ask for:
- Markup reduction 10-20% on main instruments
- Partial margin release (if we grew, margin requirement % over volume drops)
- Volume rebates (tier pricing)
- Access to more instruments or higher leverage

### 8.3 Established phase — the broker has power

Broker with 12+ months operating, consistent $20M+/mo volume, good flow quality, multiple LPs onboarded (you would pass flow to another if needed).

**Strategy:** hard but respectful renegotiations. Use of specific tactics:

**Tactic 1 — "I have a cheaper quote":**
"LP-C is offering me 0.20 pip markup on EURUSD vs your 0.25. If you match I keep volume, otherwise I migrate 30%." Works if you actually have the LP-C quote (do not lie, it's discovered easily in this industry).

**Tactic 2 — "commit volume for markup":**
"If you lower my markup to 0.18 pip, I sign commitment of $15M/month next 12 months with penalty clause if I drop below." LP values certainty of volume.

**Tactic 3 — "reduce parked margin":**
"We've had 18 months, clean track record, predictable volume. Reduce margin requirement from 10% to 5% of volume. Or pay me interest on the excess."

**Tactic 4 — "I need crypto support":**
"Our clients ask for more aggressive crypto. If you add BTCUSD/ETHUSD with sub-$20 markup I consolidate here, otherwise I go to crypto-specialized LP and lower your share." Negotiation of product expansion + pricing together.

**Tactic 5 — "short termination notice":**
Always ask for termination with 30-60 days notice, not 6-12 months. Gives flexibility if the relationship deteriorates.

**Tactic 6 — "mutual reference":**
If you are a broker with LATAM presence and the LP wants to enter LATAM, there is value in reference + intros. Use it as negotiation chip.

### 8.4 What NOT to do in negotiation

- **Threaten without having real alternative.** If you bluff and the LP calls your bluff, you lose credibility for future negotiations.
- **Ask for everything at once.** Focus on 2-3 points per renegotiation. If you ask for 10 things, you get 2 watered down.
- **Disrespect or put the account manager in an awkward situation publicly.** This industry is small; your reputation is worth more than 0.05 pip.
- **Close without legal review.** Never.

---

## 9. Critical contractual clauses

The master agreement with an LP is a dense document of 30-80 pages. Not all clauses are critical but there are 7 that must be well written and reviewed.

### 9.1 Termination clause

**What it must say:**
- Termination by either side with 30-90 days notice (we prefer 30-60).
- Termination for breach with 15-30 day cure period.
- Margin withdrawal at close within 30-60 days post-effective close, conditioned on no open positions.
- Clear definition of "material breach" (non-payment, insolvency, regulatory action, fraud).

**What to avoid:**
- Long lock-up periods (do not sign minimum term >12 months).
- Excessive exit penalties (OK to have administrative fee, not 20% penalty of margin).

### 9.2 Dispute resolution

**Preference:**
- International arbitration (LCIA London, SIAC Singapore, CCBC Cyprus) vs local court.
- Applicable law preferably: English law or Cyprus law (mature and predictable).
- Arbitration language: English.

**Avoid:**
- LP's domestic jurisdiction without reciprocity (e.g. Cyprus court if LP is Cyprus-based).

### 9.3 Execution SLA with penalties

Verbal promises do not count. The contract must specify:
- Minimum fill rate (e.g. 98%)
- Maximum average latency (e.g. 25ms in normal conditions)
- Bridge uptime (e.g. 99.9% in market hours)
- **Penalties if breached** (e.g. service credit of 5-15% of monthly markup per month of non-compliance).

Without penalties, the SLA is aspirational. With penalties, you have compensable right.

### 9.4 Margin recovery if the LP has problem

What happens to your margin if the LP goes bankrupt, is sanctioned, or has account frozen?
- Margin segregation in separate account (not in the LP's operating balance).
- Trust account or escrow if possible.
- Priority in liquidation (senior creditor level).
- Counterparty credit insurance if the LP offers it.

In practice, real protection depends on the LP's jurisdiction. Generic offshore = low protection. Tier 1 regulated = high protection.

### 9.5 Information rights

The broker must have contractual right to:
- Raw execution data (not just summary reports)
- Detailed monthly reconciliation statements
- On-demand data pull via API or portal
- 7+ year accessible audit trail

Useful for compliance (we must be able to produce historical data if regulator asks) and for renegotiations (we have real metrics, not just what the LP wants to show).

### 9.6 Credit line (if applicable)

Rare for a new LP to give you credit, but if you are established broker ask for:
- Credit line for temporary margin shortfall (e.g. $500K line, market interest)
- Use: avoids having to park the maximum margin always.

### 9.7 Pricing transparency

- Explicit "no hidden fees" clause
- Every fee must be in schedule annexed to contract
- Pricing changes require 30+ days notice in writing
- Volume rebates written, not "discretional"

**[DATA: specific clauses negotiated in current/pending contracts with NEOMAAA LPs, including economic terms]**

---

## 10. Red flags — when to consider exit

An LP can start excellent and deteriorate. Alarm signals requiring escalation:

### 10.1 Settlement delays

End-of-day or end-of-week flow settlement should be predictable. If delays start appearing, especially in broker payments (rebates, credits), it's a sign of LP liquidity problem.

### 10.2 Inconsistent or deteriorated pricing

Markups rising without formal notification. Abnormally wide spreads in standard moments. Quotes disappearing in moderate volatility. May indicate the LP is having problems with its own upstream LPs.

### 10.3 Deteriorated communication

Account manager stops responding quickly. High staff turnover at the LP. Senior management hard to reach. Quarterly meetings canceled or postponed.

### 10.4 Public bad news

- Lawsuit against the LP
- Regulatory action (fine, warning, investigation)
- Unexplained ownership change
- Auditor change without reason
- Negative reports in industry forums (FinanceMagnates, Leaprate)

### 10.5 Margin requirements rise without justification

LP asks for more margin without our volume or profile changing. May mean the LP is having capital problems and wants to park more broker cash to use it.

### 10.6 Execution degrades

Fill rate drops, latency rises, slippage worsens. If persists >4 weeks and there is no external cause (extreme market), the LP is having technical problems or prioritizing other brokers.

### 10.7 Actions when red flag confirmed

1. **Internal escalation:** Pepe flags to Diego + Yulia + Angel.
2. **Formal confrontation:** meeting with LP senior asking written explanation.
3. **Reduce flow share:** lower that LP's participation to 10-20% while evaluating.
4. **Accelerate alternative LP:** if there was no active alternative LP, accelerate onboarding of one.
5. **Prepare termination:** if there is no clear remediation in 30-60 days, prepare exit.
6. **Margin withdrawal:** coordinate orderly withdrawal of parked margin.
7. **Document everything:** written correspondence to legally protect the broker if there is a dispute.

---

## 11. NEOMAAA — LP stack current status and target

### 11.1 Current pre-launch status

**[DATA: LPs contracted/signed to date]**
- LP #1: [name, tier, negotiated markup, min volume, margin, onboarding status]
- LP #2: [same]
- LP #3: [same if applicable]

### 11.2 Year 1 post-launch target

- 3 diversified LPs operational
- Target distribution: 50% LP#1 / 35% LP#2 / 15% LP#3 (crypto)
- Total parked margin: $300-800K per real volume
- Effective blended markup (weighted): <0.35 pip EURUSD
- Aggregate fill rate: >98.5%
- Average latency: <20ms

### 11.3 Year 2 target

- Add 1 separated crypto-specialized LP if crypto becomes relevant product
- Renegotiate markup based on real volume (target -15% vs year 1)
- Evaluate 1 European Tier 2 backup LP
- Consider adding DFSA Dubai secondary licensing to access better LPs

### 11.4 Year 3 target

- If volume >$100M/mo, evaluate direct Tier 1 (LMAX, Saxo)
- If expanding to Asia phase 2, add Asian LP (Swissquote Asia, OSTC)
- Add institutional relationships if starting white-label / IB institutional

**[DATA: Diego + Pepe confirm exact timeline and amounts per quarter]**

---

## 12. LP performance KPIs — the dashboard Pepe watches

### 12.1 Execution KPIs (daily/weekly)

| KPI | Target | Acceptable range | Alert range | Critical range |
|-----|--------|----------------|--------------|---------------|
| Fill rate | >99% | 98-99% | 95-98% | <95% |
| Requote rate | <1% | 1-3% | 3-5% | >5% |
| Average latency | <15ms | 15-25ms | 25-50ms | >50ms |
| Average slippage | ±0.1 pip | ±0.3 pip | ±0.5 pip | >±0.5 pip |
| Rejection rate | <1% | 1-2% | 2-5% | >5% |
| Bridge uptime | 99.95% | 99.9% | 99.5% | <99.5% |

### 12.2 Business KPIs (monthly)

| KPI | Measurement |
|-----|----------|
| Monthly volume per LP | $ total / notional |
| Effective markup vs contract | Actual cost / (volume × contracted markup) |
| Share of total flow | % of volume going to the LP |
| P&L of flow routed to the LP | Broker revenue attributable to that LP's spread |
| Average margin utilization | Daily average utilization / 100 |
| Reconciliation discrepancies | # discrepancies found in monthly reconcile |
| Unexpected fees | $ of unforeseen charges in invoice |

### 12.3 Relationship KPIs (quarterly)

| KPI | Measurement |
|-----|----------|
| Response time to queries | SLA business hours |
| LP proactive contact frequency | Calls/meetings initiated by the LP |
| Negotiation outcomes | % of broker requests positively addressed |
| New products/features added | Count of instruments or improvements |
| Escalated and resolved issues | # issues + resolution time |

### 12.4 Automatic alerts (in system)

- Fill rate <95% in 1h window → email to Pepe
- Latency >50ms sustained 30min → email to Pepe + Angel
- Margin utilization >80% → email to Yulia + Pepe
- Monthly reconcile with discrepancy >$1000 → email to Pepe + Yulia + CFO/Finance
- Bridge uptime <99% rolling 24h → alert + call

> [!TIP]
> KPIs are the early warning system. An LP performing within target on all KPIs is a good LP. One deviating in 2+ KPIs simultaneously requires immediate meeting. One deviating in 3+ for >2 weeks is reduction/termination candidate.

---

## 13. Cross-references

- `executive/panorama-ejecutivo.md` — broker overview
- `executive/treasury-management.md` — parked margin is part of treasury
- `executive/risk-management-owner.md` — detailed LP counterparty risk
- `executive/financial-controls.md` — controls on payments to/from LPs
- `executive/unit-economics-broker.md` — LP markup impact on P&L
- `executive/ab-book-policy.md` — A-Book / B-Book policy and when to hedge
- `operations/*` — Pepe's operational runbooks

---

## 14. Executive summary for the owner

A broker without LPs does not exist. NEOMAAA needs 2-3 Tier 2 LPs operational from go-live, plus a specialized crypto LP if cryptos are relevant product, plus a warm backup LP (with integration ready even if no flow).

LP selection is not delegated; it is Pepe + Diego's decision with Angel validating the technical part. Each contract requires mandatory legal review before signing. Each quarterly renegotiation is an opportunity to improve economics.

Diversification is not optional: single LP is existential risk. Minimum 2 LPs with active flow, minimum 3 if volume >$10M/mo, minimum 4 when crypto is added as core product.

Pepe's dashboard must exist from day 1 with the 20+ KPIs listed. The 7 critical KPIs (fill rate, latency, slippage, uptime, margin util, reconciliation, unexpected fees) are reviewed daily. Relationship KPIs are reviewed monthly/quarterly.

Red flags are taken seriously always. A deteriorating LP rarely improves. The sooner you escalate, the more protected the parked capital is.

The 3-year goal: graduate from "broker paying high markup to PoPs" to "broker with direct Tier 1 access negotiating from position of strength". That path requires volume, evolving license, and discipline in managing these critical B2B partners.

---

*End of document. Version 1.0 — April 13, 2026. Next review: July 2026.*
