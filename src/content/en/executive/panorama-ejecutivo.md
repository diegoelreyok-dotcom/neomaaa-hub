# Executive Overview — How a Professional Broker Operates

**Strategic document — RESTRICTED ACCESS OWNERS**
**Neomaaa Ltd (IBC 15968) | AOFA License L15968/N**
**Audience:** Diego Loyola (CEO), Angel Ortega (Co-Founder), Yulia (Ops Principal), Stanislav (Equity Principal)
**Version:** 1.0 | Date: April 13, 2026
**Classification:** CONFIDENTIAL — do not distribute outside the board

> [!DANGER]
> This document contains the executive view of the end-to-end broker business. Strategic information, industry numbers, and internal mechanics that should NOT be shared with the extended team, partners, or clients. Principals and advisors under NDA only.

> [!INFO]
> **Purpose:** enable a new owner joining the business to understand, in 30 minutes of reading, how a professional retail forex/CFD broker works, where the money sits, where the risks are, what decisions belong to them, and what they look at weekly. This is not an operating manual — it is the executive snapshot that enables decision-making without diving into detail.

---

## 1. The retail broker business on one page

A **retail forex/CFD broker** is a company that provides retail clients (individuals, not institutions) the technical and legal infrastructure to speculate on the price of financial instruments (currencies, indices, commodities, stocks, crypto) without owning the underlying asset. The client opens an account, deposits margin, trades CFD (Contract for Difference) contracts, and their P&L settles in cash in their account.

The broker is NOT a bank nor an exchange. It is a **technology intermediary + hybrid counterparty**: it provides the platform (MT5 in our case), connection to market prices via liquidity providers, segregated accounts to protect client funds, payment processing, support, and the regulatory framework under which it operates legally.

### 1.1 How it differs from an institutional market maker

- An **institutional market maker** (like a Goldman Sachs, Citi, or JP Morgan dealer) operates with institutional counterparties, tickets of $10M+, uses its own balance sheet, is subject to Tier 1 regulation (Basel III, MiFID II, Dodd-Frank), and its end client is another bank, hedge fund, or corporation.
- A **retail broker** operates with individual clients, typical tickets of $100-$50K, uses offshore or Tier 2/3 licensing (Anjouan, Seychelles, BVI, Mauritius, Cyprus IFSC, etc.), accesses liquidity by passing flow to upstream LPs, and its end client is retail.

The key difference: the institutional market maker has a massive balance sheet and constantly acts as **principal**; the retail broker operates in a **hybrid A-Book / B-Book** model where part of the client's flow is passed to market (A-Book) and part is kept internal (B-Book). We are a **hybrid ECN/STP with principal component**, per our official T&Cs.

### 1.2 Revenue model — where every dollar comes from

A retail broker generates revenue through five channels:

1. **Spread markup.** The broker receives a bid/ask price from its LPs and rebroadcasts it to the client with a markup. E.g.: LP quotes EUR/USD 1.0800/1.0801 (1 pip spread), broker quotes to client 1.07995/1.08015 (2 pip spread). The additional pip is pure markup. This is the largest revenue line for most brokers.
2. **Explicit commission.** In ECN/RAW-type accounts (low spread), the broker charges a fixed commission per lot traded. E.g.: $3-7 USD per round-turn lot. Transparent, the client sees it on their statement.
3. **Swap / overnight financing.** If the client leaves a position open past UTC midnight, a swap is charged/paid. The broker typically keeps a markup on the swap (spread between long swap and short swap).
4. **B-Book net P&L.** Flow that the broker does NOT pass to LP and decides to absorb internally. If the client loses, the broker gains that P&L directly. If the client wins, the broker pays. Historical industry net positive: 65-80% of retail clients lose, so the B-Book is highly profitable if risk is well managed.
5. **Operational fees.** Deposit/withdrawal fees on certain methods, inactivity fee on dormant accounts, FX conversion fees, admin fees. Smaller in volume but recurring.

### 1.3 Cost structure — where every dollar goes

1. **Liquidity costs.** What LPs charge the broker: institutional spread + institutional commission. Typical 30-50% of gross revenue if the broker runs heavy A-Book.
2. **PSP fees.** Payment processors (card, crypto, wire, local PSPs). 0.5%-4.5% depending on method. See operations/psps-explicados doc.
3. **Chargebacks.** When a client disputes a card payment. Direct cost (money returned to client) plus PSP fee ($15-40 per dispute). Industry target <0.5% of card volume.
4. **Tech infrastructure.** MT5 license (white label ~$5-12K/month), LP bridges, servers, CRM (Skale), KYC (Sumsub), support (Intercom), email, hosting, security.
5. **Compliance & legal.** License renewal, outside counsel, audits, monitoring software, Compliance Officer salary.
6. **Personnel / payroll.** Team. With 16 people currently: ~$50-80K/month.
7. **Marketing.** Paid ads, content, influencers, IB payouts (IB commissions are technically cost of acquisition).
8. **Office & admin.** Rent, utilities, travel, corporate legal, accounting.

### 1.4 Typical industry margin

| Broker state | EBITDA margin |
|---|---|
| Problem / burn mode | <10% |
| Healthy | 15-30% |
| Excellent (IC Markets, Exness tier) | 40%+ |
| Top 1% worldwide | 50-60%+ (Exness reports >55% historically) |

Well-managed mid-size offshore brokers operate in 25-40% EBITDA. Brokers in trouble are usually so because of inflated CAC, mismanaged B-Book, or being over-staffed.

---

## 2. Money flow — end to end

Understanding where every dollar physically sits at each stage of the flow is the most important thing an owner can know. Most brokers that went under did so because of confusion or mismanagement of this flow.

<div className="neo-timeline">

1. **Client deposits** at the Client Portal. Chooses method (card, USDT crypto, wire, PIX, SPEI, etc.) and amount.
2. **PSP processes the payment.** The PSP (e.g., Praxis, B2BinPay, PagSmile) runs fraud checks, 3DS if applicable, and charges the client.
3. **PSP deducts its fee** and settles to the broker. Timing varies: crypto T+0, card T+1-3, wire same day, OXXO T+1-2.
4. **Funds land in the corporate account** of the broker (banking partner or crypto wallet).
5. **Broker segregates immediately** into two buckets: (a) **Client Funds Account** — separated per AOFA regulation, (b) **Operating Account** — only broker revenue enters here, no client capital.
6. **Client trades on MT5.** Margin required by the position is "locked" logically in Client Funds (doesn't physically leave), and the trading server executes the order.
7. **A-Book vs B-Book decision.** In real time, the broker's bridge decides whether to pass the order to the LP (A-Book) or absorb it internally (B-Book). See dealing-desk-publico doc.
8. **If A-Book**: order goes to LP. LP executes against the interbank market. Broker earns the markup between LP price and client price.
9. **If B-Book**: broker is direct counterparty to the client. If client wins, broker pays; if client loses, broker keeps the P&L.
10. **Client closes position.** P&L settles in Client Funds. If gained, balance rises; if lost, it falls.
11. **Client requests withdrawal.** Sales/Operations validates KYC, Compliance approves if applicable (Medium/High Risk), Treasury executes.
12. **Withdrawal exits Client Funds** (never Operating), via PSP, to the client. Typically same method as deposit (anti-money laundering requirement).

</div>

### 2.1 The golden rule: absolute segregation

> [!DANGER]
> **Client Funds NEVER, under any circumstance, are used to pay broker operating expenses.** Not salaries, not marketing, not vendors, not dividends. Not even in emergency. Doing so is fraud (misappropriation of client funds) and is the #1 reason offshore brokers lose their license and go to jail.

Client Funds are **fiduciary assets** of the broker. Held in custody by the broker but NOT owned by the broker. Only the returns (spread, commissions, B-Book net P&L) belong to the broker, and those go to the Operating Account.

---

## 3. The 4 operational pillars of the broker

A broker is managed through 4 pillars. Each with its head and own KPI dashboard.

### 3.1 Treasury / Finance
Owner: Yulia (with finance manager to be hired month 6). Responsible for:

- Client Funds vs Operating segregation
- Daily reconciliation: Sumsub + MT5 + CRM + bank
- Operational liquidity — ensure there's cash for withdrawals, LP margin, payroll
- Cashflow forecasting — 13-week rolling forecast
- Banking relationships — multi-jurisdiction, multi-provider
- Crypto treasury management
- Weekly reporting to principals

See `executive/treasury-management.md` doc for detail.

### 3.2 Dealing / Trading
Owner: Pepe (Head of Dealing, 20 years experience). Responsible for:

- Real-time A-Book vs B-Book decision
- Risk limits per client, per instrument, per session
- LP relationship — pricing, quality of execution, margin calls
- Spread management by account tier
- Swap policy
- Daily dealing P&L monitoring
- Hedging directional exposure if exceeds thresholds

### 3.3 Compliance / Legal
Owner: Susana (Compliance Officer). Responsible for:

- AOFA License — keep in good standing, renewal, quarterly reports
- KYC of every client (via Sumsub + manual review medium/high risk)
- AML monitoring — transaction patterns, SARs, STRs
- Continuous sanctions screening (OFAC, UN, EU, UK)
- Legal retention — records 7 years
- Regulator AOFA + Financial Intelligence Unit relationships
- Team training on AML/CFT
- See `compliance/*` docs

### 3.4 Growth
Owner: Diego + Angel (shared). Responsible for:

- Paid + organic + content marketing
- Direct sales (Luis, Edward, Franco)
- Partner / IB program
- Retention (reduce active client churn)
- CAC by channel, LTV tracking
- New markets
- Product — what instruments, what accounts, what promos

---

## 4. Typical operational cycles

### 4.1 Daily
- Treasury: Client Funds vs Operating reconciliation (Yulia AM)
- Dealing: previous day P&L review, AM exposure check, risk limits adjustment if applicable (Pepe)
- Compliance: overnight KYC queue, urgent SARs, screening refresh
- Sales: standups, new leads
- Support: tickets
- Marketing: campaign health

### 4.2 Weekly
- Board check-in (Diego + Angel + Yulia) — 30 min, key numbers
- Cashflow review — 13-week forecast
- Dealing review — desk P&L, top clients, outlier clients
- Compliance weekly — queue pending, pending SARs, PEP/sanctions
- Marketing performance — CAC, FTD, ROAS by channel
- Sales performance — closed deals, pipeline
- Partners — active IBs, growth, churn

### 4.3 Monthly
- Full P&L — revenue, costs, EBITDA, margin
- Formal board report (written) to full board
- Compliance monthly review — KYC sample audit, transaction monitoring report, filed SARs
- Risk assessment — top 10 risk accounts, LP exposure, FX exposure
- Payroll + affiliate payouts (day 15)
- PSP review — fees, conversion rate, chargebacks
- Internal pairwise treasury audit (Diego + Yulia)

### 4.4 Quarterly
- Strategic review — what worked, what didn't, what to change
- Regulator quarterly report to AOFA
- Budget review + reallocation
- HR cycle — performance reviews, raises, bonuses
- Tax provisions review
- Reserves target check

### 4.5 Annual
- External audit (ideally Big 4 regional or reputable offshore firm)
- AOFA License renewal (fee + documentation)
- Strategic planning for the following year
- Full-cycle salary review
- Policy document review — all compliance, AML, risk docs
- Board composition review

---

## 5. KPIs the owner looks at weekly

This is the **master CEO dashboard**. In a single view, the state of the broker.

<div className="neo-stat-grid">

**Weekly broker revenue** — Sum of spread markup + commission + swap + B-Book net P&L. Target: trending up WoW, alert if it drops >15% WoW without obvious reason.

**Trading volume (lots / week)** — Total lots traded by all clients. Activity proxy. Alert if it drops >20% WoW.

**Weekly active clients (MAU)** — Accounts that traded at least 1 trade in the week. Healthy target: growing 5-15% MoM.

**FTD rate** — % of new registrations that deposit for the first time. Industry: 25-40%. <25% = broken funnel.

**Blended CAC** — Total marketing/sales cost ÷ new FTDs. Varies by channel, blended target <$250-400 depending on market.

**Estimated LTV** — Average revenue per client projected to 12 months. Retail industry: $800-$2,500. LTV/CAC target >3:1.

**Client Funds balance** — Total segregated balance. Must match (deposits + open P&L - withdrawals) at 99.5%+.

**Chargeback rate** — Chargebacks ÷ card volume. Target <0.5%. >1% = PSP may cut the relationship.

**LP margin utilization** — % of margin used at each LP. >80% = rebalance, <30% = capital tied up.

**Pending withdrawals** — Withdrawals requested and not paid. >48h without payment = problem, generates tickets and churn.

**Chargeback reserve** — % retained by PSPs (rolling reserve). Cash trapped unavailable for ops.

**Cash runway** — Operating cash ÷ monthly burn. Minimum target 6 months, ideal 12 months.

</div>

---

## 6. Typical owner decisions — week by week

As principal, these are the decisions that ONLY you can make. Neither Angel, nor Yulia, nor Pepe should make these alone.

1. **Spread/commission adjustments by instrument.** Pepe proposes, Diego approves. Especially for changes affecting >5% of revenue.
2. **Approve HIGH RISK clients.** Together with Susana. Any client classified HIGH requires owner signature.
3. **Approve withdrawals > threshold.** Withdrawals >$25K require double signature (Yulia + Diego). See signatory matrix in `executive/wallet-structure-neomaaa.md`.
4. **Monthly marketing budget.** Diego allocates, Angel executes, reviewed monthly.
5. **Hedging decisions.** If B-Book exposure exceeds X% of broker equity, Diego decides to hedge or absorb.
6. **New PSPs / payment methods.** Yulia and Pepe recommend, Diego approves new integration.
7. **Key hires.** C-level roles, head of, country manager. Diego final interview.
8. **Responses to AOFA regulator.** Any formal communication to regulator requires review from Diego + legal counsel.
9. **Structural LP changes.** Add/cut LP, change A-Book/B-Book policy mix, requires Diego decision.
10. **Reserves movement.** Any Wallet 5 (Reserves) movement requires 3-of-3 signature: Diego + Yulia + Stanislav.

---

## 7. The 3 most common mistakes of new brokers

These are the mistakes that kill brokers in their first 24 months. Learned from seeing dozens of offshore competitors fail.

### 7.1 Under-capitalization
Not having enough reserves to cover:
- B-Book drawdown in a bad week
- PSP freeze / increased rolling reserve
- Simultaneous massive withdrawals (e.g., month of extreme volatility)
- Regulatory contingency (fine, investigation)

**Industry rule:** a broker needs a minimum of 6 months of operating cost + 2x the historical worst-case weekly B-Book drawdown as reserve. For a broker our size, that means a minimum of $400K-$800K in liquid reserves at launch.

**How failure looks:** broker has a bad B-Book week, ran out of operating cash, can't pay large withdrawals, word spreads, bank run, closure in 30-90 days.

### 7.2 Over-promising
Promising spreads, leverage, execution, or bonuses that aren't sustainable:
- 0.0 pip spreads without commission → impossible to monetize
- 1:3000 leverage without hedge → an adverse move blows you up
- 100% bonuses without conditions → blows up the B-Book
- "Instant" execution without slippage → impossible in high volatility

**How failure looks:** broker attracts volume fast, clients win (or broker can't monetize), negative P&L, withdrawal freeze, complaints on social media, regulator investigates.

### 7.3 Weak compliance
Not having formal processes for KYC, AML, sanctions, SARs. Typical errors:
- Onboarding client without full ID verification
- Not renewing KYC annually
- Not screening against updated sanctions lists
- Not filing SARs when required
- Not retaining records for 7 years
- Part-time Compliance Officer or without real authority

**How failure looks:** regulator does audit (or correspondent bank requests AML evidence), finds gaps, revokes license or fines heavily. Broker loses ability to operate.

---

## 8. The 3 principles successful brokers follow

### 8.1 Absolute segregation
Client Funds NEVER touched for operating. Not even in emergency. Top brokers (IC Markets, Pepperstone, Exness) have dedicated reserve accounts for emergency withdrawal coverage that NEVER touch Client Funds.

### 8.2 LP diversification
Minimum 3 different LPs. Shift flow by cost/quality quarterly. Single-LP risk is terminal: if that LP cuts you off (their commercial decision), you're left without execution. Recommend: 1 Tier 1 institutional LP + 2 secondary LPs.

### 8.3 Proactive compliance
Get ahead of the regulator, don't react. Brokers that survive 5+ years are those with an active regulator relationship, filing preventively, auditing internally before the external audit arrives. Cost: a serious Compliance Officer + monitoring software. Benefit: intact license, banking partners that don't cut you, reputation.

---

## 9. How a retail broker survives over time

### 9.1 Year 1-2: survival
Objective: positive cashflow before burning initial runway. Key metrics:
- Operating break-even (revenue > fixed operating cost) in month 6-12
- Churn <20% monthly (retention >80% of clients who make FTD)
- LTV/CAC >2:1 minimum, ideally >3:1
- Intact license, zero serious compliance findings
- Diversified PSPs (min 3 active)

**Killer risks year 1-2:** inflated CAC, PSP cuts, compliance fail, B-Book drawdown without reserves.

### 9.2 Year 3-5: scale
Objective: volume growth + operational efficiency. Key metrics:
- Revenue 3-5x year 1
- EBITDA margin 20%+ sustained
- Expansion to 2-3 new markets
- Team scaling to 30-50 people
- Tier 2 licensing considered (Mauritius FSC, Cyprus CIF, Seychelles FSA upgrade)

**Killer risks year 3-5:** culture breakdown from growth, compliance scaling issues, LP churn, regulator tightens.

### 9.3 Year 5+: strategic options
- **Cash cow mode:** maintain operation, harvest EBITDA, dividends to principals.
- **Tier 1 upgrade:** apply to FCA UK, ASIC AU, CySEC. Cost: $2M-5M+, benefit: access to regulated markets and premium branding.
- **M&A / exit:** sale to larger broker (IC Markets bought Pepperstone mid-size in 2023 pattern) or PE firm. Typical multiple: 3-8x EBITDA.
- **Diversification:** launch complementary lines (prop firm, education, crypto exchange, wealth management).

### 9.4 Long-term survival keys
- Reserves minimum 6-12 months operating cost, ideally 12+
- Multi-PSP: never just 1 (ideal 5+ active, rotatable)
- Multi-LP: never just 1 (ideal 3+)
- Compliance clean: never a serious finding
- Treasury discipline: sacred segregation
- Positive unit economics from month 12 (do NOT burn capital indefinitely)
- Ownership culture: principals involved, not absent
- Regulator relationship: proactive, not reactive

---

## 10. Cross-references — executive reading roadmap

The `executive/` area docs are the mandatory complement to this overview. Read in this order:

| # | Doc | For | Time |
|---|---|---|---|
| 1 | [Executive Overview](/content/executive/panorama-ejecutivo) | This doc — macro snapshot | 30 min |
| 2 | [Treasury Management](/content/executive/treasury-management) | Industry multi-wallet strategy | 45 min |
| 3 | [Wallet Structure NEOMAAA](/content/executive/wallet-structure-neomaaa) | Our specific setup | 30 min |
| 4 | [Broker Unit Economics](/content/executive/unit-economics-broker) | How the broker makes money | 30 min |
| 5 | [Financial Controls](/content/executive/financial-controls) | Executive internal controls | 30 min |
| 6 | [Risk Management — Owner view](/content/executive/risk-management-owner) | Risks and mitigation | 45 min |
| 7 | [Liquidity Providers B2B](/content/executive/liquidity-providers-b2b) | Relationship with LPs | 30 min |
| 8 | [Scaling and Growth](/content/executive/escalamiento-y-crecimiento) | Year 1 → year 5 | 30 min |

Recommended operational docs for complementary context (not executive-only):

- [Compliance Workflow](/content/compliance/workflow) — how Susana operates
- [Crisis Manual](/content/operations/manual-crisis) — what to do if something blows up
- [PSPs Explained](/content/operations/psps-explicados) — payments mechanics
- [Client Risk Matrix](/content/compliance/risk-matrix) — KYC tiers
- [SAR Reporting](/content/compliance/sar-reporting) — AML reporting
- [Dealing Desk](/content/operations/dealing-desk-publico) — how Pepe operates
- [Go-Live Runbook](/content/operations/go-live-runbook) — launch checklist

---

## 11. Closing — owner non-negotiable principles

If in 2 years you lose the detail of the business, remember these 7 principles:

1. **Client Funds segregation is sacred.** No exception.
2. **Multi-PSP and multi-LP from day 1.** Single-vendor risk is terminal.
3. **Proactive compliance.** Invest in Susana + software + external counsel. It's the best ROI investment for the broker.
4. **Reserves 6-12 months minimum.** Don't grow at the expense of runway.
5. **Conservative dealing.** B-Book exposure has limits. Hedge when it passes the threshold.
6. **Unit economics > growth.** LTV/CAC >3:1 before scaling marketing.
7. **Weekly + monthly board cadence.** Without cadence, the broker drifts.

> [!SUCCESS]
> **Final rule:** a well-managed offshore broker is one of the best ROE businesses in the world. 30-50% margins, scalable to 8-9 figures, clear exit options. A poorly managed broker is the worst possible business: revocable overnight, reputation risk, possible criminal exposure. The difference lies in discipline on the above principles. Nothing else.

---

**Version:** 1.0 | **Last review:** April 13, 2026 | **Next review:** July 30, 2026
**Owner:** Diego Loyola (CEO) | **Co-approver:** Angel Ortega, Yulia, Stanislav
