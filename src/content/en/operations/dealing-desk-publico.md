# Dealing Desk — How Execution Works at NEOMAAA

**Version:** 1.0
**Date:** April 2026
**Audience:** Sales, Support, Marketing, Partners
**Classification:** Internal non-confidential use — suitable for training client-facing teams
**What is NOT here:** specific routing thresholds, liquidity provider names, internal ratios, dealing P&L. That lives in the confidential document under custody of Pepe (Head of Dealing) and Compliance.

---

## Table of Contents

1. [Why this document exists](#1-why-this-document-exists)
2. [Execution models in the industry](#2-execution-models-in-the-industry)
3. [How NEOMAAA operates — hybrid ECN/STP](#3-how-neomaaa-operates--hybrid-ecnstp)
4. [Key concepts to explain to clients](#4-key-concepts-to-explain-to-clients)
5. [How to respond to typical objections](#5-how-to-respond-to-typical-objections)
6. [Approved phrases](#6-approved-phrases)
7. [Prohibited phrases](#7-prohibited-phrases)
8. [Escalation to dealing desk](#8-escalation-to-dealing-desk)
9. [Client transparency](#9-client-transparency)

---

## 1. Why this document exists

Every broker in the world has some form of **execution mix**. None is 100% pure A-Book. Any broker telling you otherwise is lying (and legally, the regulatory supervisor will catch the lie).

The problem isn't the execution mix itself — the problem is when the client-facing team can't explain it without lying. This document exists so **sales, support, and marketing can answer technical questions accurately, without revealing sensitive information and without compromising the broker**.

> [!INFO]
> The sophisticated client (institutional, large IB, professional trader) knows how the industry works. If you lie, they detect it instantly and leave for another broker. Technical honesty is a competitive advantage.

### What's in this doc

- Educational explanation of execution models (A-Book, B-Book, hybrid)
- How NEOMAAA positions itself in that logic (without sensitive operational data)
- Concepts clients ask about: spread, slippage, requotes, swap, gaps, widening
- How to respond to common objections without promising what can't be delivered
- Ready-to-use phrases and phrases that must never be said
- When to escalate to the dealing desk and how

### What's NOT in this doc

- Specific flow categorization thresholds
- Names and contracts with liquidity providers
- Exact A-Book / B-Book routing ratios
- Markup margins or internal dealing economics
- Internal P&L reports by client or by desk

All that lives in `executive/ab-book-policy.md` — confidential document with restricted access to Pepe (Head of Dealing), Susana (Compliance), Angel (Co-founder), Diego (Founder), and regulatory auditors.

---

## 2. Execution models in the industry

To understand how NEOMAAA operates, you first need to understand the three models that exist in retail forex/CFD industry.

### A-Book (STP / ECN)

The broker **passes the order to the market**. Acts as intermediary between the client and one or more liquidity providers (banks, prime brokers, institutional ECNs). The broker does not take the other side of the trade.

**How the broker earns:**
- Markup on the spread (adds 0.1–0.5 pips to institutional spread)
- Fixed commission per lot (typical in Raw/ECN accounts)
- Combination of both

**When it's the best option:**
- Clients with large sizes the broker cannot absorb without hedge
- Predictable winning strategies where the broker prefers to be intermediary
- Very liquid markets (FX majors, main indices)

**Advantage:** zero conflict of interest with the client. The broker benefits if the client trades a lot and lasts a long time — not if they lose.

**Typical of:** Tier 1 regulated brokers (ASIC, FCA, CySEC) in their institutional or Raw accounts.

### B-Book (Market Maker)

The broker **is the counterparty** to the client. Takes the other side of the trade internally, without passing the order to the market. The client's P&L is the broker's inverse P&L.

**How the broker earns:**
- Earns when the client loses
- Spread captured on each trade

**When it's used (in the industry):**
- Small retail flow where passing each order to the market has absurd operational friction
- Statistically losing clients (the broker prefers to be counterparty and capture the edge)
- Markets where LPs charge high or there's no deep liquidity

**The problem:** generates structural conflict of interest. That's why serious regulators watch it closely and require documented best execution.

**Typical of:** offshore brokers without serious regulation, or the retail "bucket" of any hybrid broker (more on this below).

### Hybrid — the real industry model

**Every modern broker uses a hybrid model.** There are no serious exceptions. The broker analyzes flow and decides, order by order or client by client, what goes to market and what stays internalized.

<div className="neo-compare">

**Pure A-Book**
- Zero conflict of interest
- High operational cost
- Less profitable on retail flow
- Commercially: impossible as sole model

**Pure B-Book**
- Maximum conflict of interest
- Very profitable on losing retail flow
- Fatal with large winning clients
- Regulatorily: immediate red flag

**Hybrid (what everyone does)**
- Mix based on internal criteria
- Large winners → A-Book (you don't want to be counterparty)
- Retail losers → B-Book or internal matching
- Best execution still mandatory
- Regulatorily: accepted if documented

</div>

**Typical criteria the industry uses** (educational examples, not NEOMAAA's specifics):

- **Client history:** consistent winners → A-Book; consistent losers (around 70% of retail flow according to public industry statistics) → B-Book or internal matching
- **Volume:** very large size → mandatory A-Book (regulatory hedge)
- **Type of activity:** high-frequency scalping → B-Book (spread generates the broker's edge)
- **Instrument:** liquid majors easier A-Book; exotics or OTC CFDs typically B-Book
- **Schedule:** news events → often different routing for risk management
- **Account:** Raw/ECN typically A-Book; Standard typically hybrid

> [!TIP]
> All serious regulators (FCA, ASIC, CySEC, MAS) **accept the hybrid model** provided:
> 1. The broker has a documented best execution policy
> 2. The client receives fair execution price vs the reference market
> 3. The broker discloses in terms and conditions that it operates as counterparty on part of the flow

---

## 3. How NEOMAAA operates — hybrid ECN/STP

NEOMAAA Markets operates a **hybrid ECN/STP model**, with default routing to multiple liquidity providers. It's the standard structure of any modern broker that wants to deliver competitive execution without breaking on the first big client.

### What you CAN say to the client about NEOMAAA

- **We operate with multiple liquidity providers** to ensure depth and better prices
- **Default routing is A-Book via LPs**, especially in Raw/ECN accounts and liquid majors
- **The dealing desk** (under Pepe + Compliance supervision) analyzes flow and optimizes execution according to best execution policy
- **The execution policy is documented** in `legal/order-execution-policy.md` and is public for any client who requests it
- **The client can request an execution report** for any of their trades — Pepe generates it from the MT5 server
- **Islamic accounts (swap-free)** available upon request for clients who require it for religious conviction
- **Technological infrastructure**: MT5 servers hosted in **Equinix data centers** (NY4, LD5) with physical proximity to main LPs and venues, low-latency cross-connect connections. This is a real technical differentiator vs low-tier brokers running on generic VPS.
- **Availability target SLA**: 99.9% uptime officially published at neomaaa.com. Geographic redundancy and enterprise-grade automatic failover.

### What you CANNOT say to the client about NEOMAAA

- What exact percentage of flow goes A-Book vs internalized
- Who the specific liquidity providers are
- What thresholds (amount, volume, P&L, etc.) trigger a routing change
- How each client is categorized
- How much the broker earns per client category or per instrument

> [!WARNING]
> If a client insists on sensitive data ("how many LPs?", "what percentage do you internalize?"), the correct answer is:
>
> *"Due to commercial confidentiality policies, we do not disclose the specific liquidity structure. What we can guarantee is documented best execution, supervised by the compliance team. If you want an execution report of your trades, we'll generate it."*
>
> It's not evasion — it's the standard answer at any serious broker in the world.

---

## 4. Key concepts to explain to clients

80% of client objections and doubts revolve around five concepts: spread, slippage, requotes, swap, and gaps. If the team masters these five, support and sales are 10 times easier.

### 4.1 Spread

**What it is:** the difference between the bid price (at which it's sold) and the ask (at which it's bought). It's the structural cost of every trade.

**Why it varies:**
- **Instrument liquidity:** EURUSD has minimum spread; less liquid exotics or CFDs have wider spread
- **Volatility:** during news, spread widens at all brokers
- **Schedule:** London–New York overlap = best spread; Asian pre-dawn = wider spread
- **Account type:** Raw vs Standard

**Raw vs Standard (explanation for client):**

| Concept | Raw/ECN Account | Standard Account |
|---------|-----------------|------------------|
| Typical spread | Institutional (from 0.0 pips) | With markup (from 0.8–1.5 pips) |
| Commission | Yes (per lot) | No |
| Ideal for | Scalping, high frequency, large volume | Swing trading, beginners |
| Total cost per trade | Variable depending on commission | Included in spread |

> [!TIP]
> For the client: "There's no free account. In Raw you pay explicit commission and institutional spread. In Standard you pay wider spread without commission. Total cost at the end of an active month is similar — the choice depends on your style."

### 4.2 Slippage

**What it is:** difference between the price you requested and the price at which you executed.

- **Positive slippage:** you executed **better** than requested. Happens less, but it happens (around 10–20% of orders in normal conditions according to public industry statistics).
- **Negative slippage:** you executed **worse**. Common during news events, gaps, and low liquidity.

**Symmetric vs asymmetric slippage:**

<div className="neo-compare">

**Symmetric (NEOMAAA)**
- Reports positive and negative equally
- The client receives the best price when market moves in their favor
- Regulated industry standard

**Asymmetric (RED FLAG)**
- Only give you negative slippage
- If price improves, execute at requested price (keeping the difference)
- If price worsens, pass it to the client
- A competitor doing this = red flag for Compliance

</div>

**NEOMAAA operates with symmetric slippage.** This isn't a favor, it's regulatory standard. If the client asks, it can be said without issue.

### 4.3 Requotes

**What it is:** when the client tries to execute at a price and the broker responds "that price is no longer available, do you want to execute at this other one?".

**When they happen:**
- High-impact news events (NFP, CPI, FOMC, ECB)
- Market gaps (Sunday open, Friday close)
- Flash moves (violent movements outside news)
- Instruments with limited liquidity

**Why they happen technically:**
The LP doesn't have a price available at the exact moment the client sends the order. The broker can't execute at a price that doesn't exist.

**At NEOMAAA:** requotes are minimal because we work with multiple LPs, but they're not zero — no broker in the world has zero requotes on high-impact news.

### 4.4 Swap (overnight)

**What it is:** the differential interest between the two currencies of a forex pair, or the overnight financing cost of a CFD. Charged (or paid) for holding a position open at day close.

**When it's charged:**
- Daily at **22:00 GMT** (server rollover)
- **Triple swap on Wednesdays** — adjustment to compensate for the weekend (Saturday and Sunday have no rollover but interest still accrues)

**How it's calculated:**

```
Swap = central bank rate of each currency + broker markup
```

- On long pairs (buy) with higher-rate base currency → positive swap (you get paid)
- On short pairs (sell) with higher-rate base currency → negative swap (you pay)
- Broker markup applies in both directions

**Islamic accounts (swap-free):**
Alternative for Muslim clients whose religion prohibits charging/paying interest. NEOMAAA offers swap-free accounts upon request and verification. Instead of swap, a fixed administrative commission applies if the position is held more than X days (defined in internal policy).

### 4.5 Weekend gaps

**What it is:** forex closes **Friday 22:00 GMT** and opens **Sunday 22:00 GMT**. If a relevant macro event happens over the weekend (election, default, attack, declaration of war), the price **does not open at the same place it closed** — it opens with a gap.

**What happens with your stops:**
- If you have a stop placed and the price opens Sunday beyond your stop → the stop executes at the **first available price**, not at your stop price
- This can mean a loss greater than expected

> [!DANGER]
> This is NOT broker slippage — it's how the market works. Every broker in the world works this way. If a client complains about a "mis-executed stop" in a weekend gap, the correct technical response is to explain the gap, not apologize.

### 4.6 Spread widening on news

**What happens:** during high-impact news (NFP, CPI, FOMC, ECB, BoE) spreads **widen drastically** at every broker in the world.

**Typical duration:** 5 to 60 seconds before, during, and after the announcement.

**Cause:**
Liquidity providers **temporarily withdraw liquidity** because they don't know where the price will jump. It's LP risk management, not broker decision.

**What to communicate to the client:**
- It's universal — NEOMAAA isn't cheating
- Lasts seconds, not minutes
- Tactical solution: don't trade with market orders during news window (use limit orders or wait for spread to normalize)

---

## 5. How to respond to typical objections

This is the operational part most used by support and sales. Five objections cover 80% of cases.

### 5.1 "My stop jumped wrong, you stop-hunted me"

**What NOT to do:** flat-out deny, say "that's how it is", send the client to read terms.

**What to do:**
1. Take the data: instrument, exact timestamp, stop price, executed price
2. Explain technically: "In gaps or news events, the first available price may be below/above the stop"
3. Offer execution report: "I'll request it from Pepe and send you detail of how your order was executed against the LPs"
4. If there's real suspicion of error: escalate to dealing desk for review

**Template phrase:**
> *"I understand the concern. NEOMAAA does not stop-hunt — the dealing desk is supervised by compliance and operates under documented policy. Give me the timestamp of your order and I'll generate the execution report so we can see exactly how it was executed. If there's any broker error, we'll compensate."*

### 5.2 "The spread widened right when I was about to enter"

**What NOT to do:** say "it's the market" without further context.

**What to do:**
1. Verify timing: does it coincide with a known news event? 22:00 GMT rollover?
2. Show historical spread data of the instrument at that time if available
3. If it was indeed an abnormal spread without market cause: escalate to dealing, consider manual compensation

**Template phrase:**
> *"All brokers have variable spreads. Let me see exactly what instrument and time to confirm if it coincides with a known widening window. If it was something unusual, we escalate and review."*

### 5.3 "They won't let me close the position"

**Possible real causes:**
1. **Momentary server gap** — all brokers have it, typical duration seconds
2. **Insufficient margin** — the MT5 platform blocks close if there's no free margin to cover the close trade
3. **Instrument in auction/halt** — the underlying market is in auction or suspended

**What should NEVER be a cause:** broker freezing the account for arbitrary reasons. If the client reports it and there's no clear technical explanation, **urgent escalation to Pepe** — it may be an MT5 server bug or a real LP connectivity issue.

### 5.4 "I'm getting constant requotes"

**Support checklist:**
1. What instrument? (exotics have more requotes by design)
2. What time? (Asian pre-dawn = less liquidity = more requotes)
3. What account type? (Standard may have more than Raw)
4. What volume per order? (very large sizes in illiquid instruments = almost guaranteed requote)

If the client is trading an exotic at 3 AM GMT with large size → educate, it's not a bug.
If they're trading EURUSD at 15:00 GMT with 1 lot and getting constant requotes → **escalate to dealing, something's off**.

### 5.5 "You guys win when I lose"

This is the most delicate objection and the one most poorly answered in the industry.

**What NOT to say:**
- "We're 100% A-Book" (lie)
- "We never win with clients" (legally incorrect)
- "Our business model is for you to win" (subtly false)

**What to say:**
> *"NEOMAAA operates with a hybrid ECN/STP model, like any modern broker. In part of the flow we're counterparty, in part we route to LPs — the execution policy is documented and supervised by compliance. Structural conflict of interest exists in all retail industry, which is why regulators require best execution. The important thing: the price you receive is competitive vs the market, and you can request execution reports whenever you want."*

That answer is **true, technical, and honest**. The sophisticated client accepts it. The client looking for excuses to leave will leave anyway with any answer.

---

## 6. Approved phrases

> [!SUCCESS]
> These 15 phrases have been reviewed by Compliance and Dealing. They are for free use in support, sales, webinars, and marketing material. Prefer them to any improvisation.

List of phrases reviewed by Compliance and Dealing. Can be used in support, sales, webinars, marketing material, and written responses.

1. *"NEOMAAA Markets operates with a hybrid ECN/STP model using multiple liquidity providers to ensure best execution."*
2. *"Our dealing desk is supervised by compliance and follows the execution policy documented in the Order Execution Policy."*
3. *"The spread widens during high-impact news due to market behavior, not broker decision."*
4. *"NEOMAAA applies symmetric slippage — we execute both positive and negative according to real market conditions."*
5. *"You can request an execution report of any of your trades — the dealing desk generates it from the MT5 server."*
6. *"The Order Execution Policy is public and available in the legal section of the site for any client."*
7. *"In Raw accounts you pay institutional spread plus a fixed commission. In Standard accounts you pay spread with markup without commission. Total cost is similar for comparable trading."*
8. *"We work with multiple liquidity providers to provide depth and price stability even during lower liquidity hours."*
9. *"We offer Islamic swap-free accounts for clients who require it for religious conviction."*
10. *"Rollover is processed at 22:00 GMT. On Wednesdays triple swap is applied to compensate for weekend accrual."*
11. *"Weekend gaps are a market phenomenon — the price opens Sunday where liquidity allows, and stops execute at the first available price."*
12. *"If there's any broker error in execution, we investigate and compensate. The policy is to resolve legitimate claims, not hide them."*
13. *"Structural conflict of interest exists at every retail broker in the world — which is why regulators require best execution, and NEOMAAA meets that standard."*
14. *"Our license (Anjouan L15968/N) requires us to document the execution policy and make it available to the client."*
15. *"If you have doubts about how a specific trade was executed, send us the timestamp and we'll generate the execution report at no cost."*

---

## 7. Prohibited phrases

These phrases are **prohibited** on any channel (support, sales, webinars, social media, printed material, email). Using them exposes the broker to regulatory claims, civil lawsuits, and reputational loss.

> [!DANGER]
> Each of these phrases can end in a regulator report or client lawsuit. They are of **absolute prohibited use**.

- **"We're 100% A-Book."** → Lie. No retail broker is. If you say it and the regulator audits, it's direct cause for sanction.
- **"We never win when the client loses."** → Legally incorrect. Even in pure A-Book, the spread markup implies the broker has a structural edge vs the client.
- **"Your stop jumped because the market moved, I can't do anything."** → Robot response. Investigate, offer execution report, escalate if appropriate.
- **"Requotes are normal, deal with it."** → Diagnose, don't send the client to chew glass.
- **"Our broker is better because there's no conflict of interest."** → False. The conflict exists across the retail industry. The real advantage is having serious compliance and documented best execution.
- **"We can guarantee execution without slippage."** → Impossible. No broker can guarantee that.
- **"Our spreads are always the lowest in the market."** → Measurable claim the client will verify. If not exactly true at every moment, it's misleading advertising.
- **"The dealing desk doesn't exist, everything goes directly to market."** → False. The dealing desk exists and is responsible, among other things, for supervising execution.
- **Any numerical statement about internal ratios** ("70% goes to LPs", "only 5% is internalized", etc.) → If not in official material signed by Compliance, don't say it.
- **Any mention of specific liquidity provider names.** → Confidential commercial information.

---

## 8. Escalation to dealing desk

The dealing desk isn't unreachable. Pepe and his team exist precisely to solve problems frontline support can't. Escalating well is part of the job.

### When to escalate

| Situation | Escalate? | Who |
|-----------|-----------|-----|
| Client reports slippage systematically higher than expected average | Yes | Support → Supervisor → Pepe |
| Execution report with data that doesn't add up | Yes | Support → Pepe directly |
| Execution error claim > $500 | Yes | Support → Supervisor → Pepe |
| Client threatens to go to regulator or social media | Yes — urgent | Support → Supervisor → Pepe + Susana |
| Pattern of multiple clients with same problem same day | Yes — urgent | Whoever detects it → Pepe + Angel |
| Position can't be closed without clear technical cause | Yes — urgent | Support → Pepe directly |
| General question about how the broker works | No | Answer with this document |
| Client requests execution report | Yes — routine | Support requests it from Pepe via ticket |

### How to escalate

**Official channel:** direct Telegram to Pepe for urgencies, internal ticket (via Skale CRM) for routine.

**Chain by area:**
- **Support:** agent → support supervisor → Pepe
- **Sales:** salesperson → Edward (Sales Lead) → Pepe
- **Partners:** IB manager → Angel → Pepe

**Expected response time:**
- Urgencies (client in active complaint, public threat, multiple affected clients): **<2 hours during operating hours**
- Routine (execution report, technical inquiry): **<24 hours**

**What to send when escalating:**
1. Client ID / MT5 account
2. Instrument
3. Exact timestamp (with timezone)
4. Requested price vs executed price
5. Screenshot or order export from MT5
6. Complete conversation with client (don't paraphrase)
7. What the client requests (compensation, explanation, report, etc.)

> [!TIP]
> The more complete the escalation, the faster Pepe resolves it. Incomplete escalations generate back-and-forth of questions and delay the response to the client.

---

## 9. Client transparency

NEOMAAA's policy on execution claims is **compensate the legitimate claim** rather than generate a public complaint. An angry client on social media or before a regulator costs more than any reasonable compensation.

### What the client can request

- **Execution report** of any of their trades — Pepe generates it from the MT5 server
- **Copy of the Order Execution Policy** — public, in `legal/order-execution-policy.md` on the site
- **Spread explanation at a specific moment** — broker historical data
- **Clarification on applied swap** — detailed rollover calculation
- **Formal complaint process** — documented in `legal/complaint-handling.md`

### Principles

1. **Execution data is not hidden.** If the client requests it, it's given. Period.
2. **Better to compensate than litigate.** A $200 claim for execution error is compensated without discussion. Litigating it costs more in time, reputation, and operational burden.
3. **What can't be disclosed, say it can't be disclosed — with reason.** "Commercial confidentiality" is a legitimate answer for questions about LPs, routing ratios, or internal operational data.
4. **Technical honesty scales better than creativity.** The sophisticated client rewards honesty; the beginner client doesn't distinguish — so honesty costs nothing and prevents problems in 100% of cases.

> [!INFO]
> This document is updated whenever the Order Execution Policy changes or when Compliance identifies new prohibited or approved phrases. Last reviewed by Pepe (Head of Dealing) and Susana (Compliance Officer): April 2026.

---

**Related documents:**
- `legal/order-execution-policy.md` — Public and complete execution policy
- `legal/complaint-handling.md` — Formal complaint process
- `operations/manual-crisis.md` — Protocol if there's a massive execution incident
- `compliance/workflow.md` — General compliance workflow
- `executive/ab-book-policy.md` — **CONFIDENTIAL** — only Pepe, Susana, Angel, Diego
