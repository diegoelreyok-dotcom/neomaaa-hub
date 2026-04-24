# Executive Financial Controls — Daily / Weekly / Monthly / Quarterly / Annual

**Strategic document — RESTRICTED ACCESS OWNERS**
**Neomaaa Ltd (IBC 15968) | AOFA License L15968/N**
**Audience:** Diego (CEO), Angel, Yulia, Stanislav + Finance Manager when hired
**Version:** 1.0 | Date: April 13, 2026
**Classification:** CONFIDENTIAL — exclusive use principals + Head of Finance + External Auditor

> [!DANGER]
> This document defines the formal financial controls system that Diego and Yulia execute today (pre-launch + first months post-launch) and which the Finance Manager inherits when hired. **Zero improvisation** — each control has a cadence, owner, checklist, and escalation path. The existence and disciplined execution of these controls is the difference between an auditable broker and a company that loses its license in the first audit.

> [!INFO]
> **Purpose:** establish the NEOMAAA Markets financial control framework with clear cadences (daily, weekly, monthly, quarterly, annual), assigned owners, executable checklists, and red flags with escalation. Complements [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) (which wallets exist) with the "how to control what happens in those wallets".

---

## 1. Why formal financial controls

Many offshore brokers operate with informal controls until the first problem blows up — and when it blows up, it blows up entirely. NEOMAAA is not that broker. Formal controls exist for four structural reasons, not for bureaucracy.

### 1.1 AOFA regulator requirement

The AOFA License L15968/N requires Neomaaa Ltd to maintain a documented, executed, and auditable internal financial control system. In any regulatory inspection, the first request is the **"Internal Control Manual"** — if it does not exist, or exists but there is no evidence of execution (logs, signed reconciliations, board minutes), it is an automatic finding. Serious findings trigger suspension or revocation.

### 1.2 Fraud prevention

Most internal fraud at brokers is detected (late) when something is missing from Client Funds. Daily/weekly/monthly controls close the time windows during which a diversion can be hidden. A dishonest employee knows if the broker reconciles daily (impossible to hide it more than 24h) vs reconciles quarterly (can hide months). The control is not paranoia — it is operational discipline.

### 1.3 Decision basis

Diego makes executive decisions weekly: increase marketing budget, renegotiate with an LP, change spread policy, fire or hire people. All are **mathematical** decisions — they depend on clean, up-to-date data. Without formal controls, decisions are made on intuition — which in pure math is playing blind.

### 1.4 M&A and capital raise prep

When NEOMAAA reaches scale (year 2-3) and acquisition, investment or credit offers appear, the first thing requested in due diligence is **24 months of financial controls with evidence of execution**. Companies without formal controls lose 30-50% of valuation vs companies with them. The control Diego imposes today is the difference between selling a broker for USD 15M vs USD 30M when the time comes.

---

## 2. Daily Controls (15-30 min each morning)

**Cadence:** every business day 09:00 Dubai.
**Current owner:** Yulia.
**Future owner:** Finance Manager (with Yulia oversight).
**Target time:** 15-30 min.
**Output:** signed daily checklist + entry in internal log.

### 2.1 Daily Checklist — executable

<div className="neo-step-list">

**Step 1 — Client Funds reconciliation (5 min)**

- Open bank statement `NEOMAAA LTD — CLIENT FUNDS` → balance capture.
- Open wallet `CLIENT_FUNDS_SEGREGATED` in Fireblocks → balance capture.
- Sum fiat USD + USDT + USDC → total current Client Funds.
- Open MT5 backoffice → total equity of client accounts (deposited funds + unrealized PnL).
- Calculate difference: `Client Funds wallet total - MT5 equity total`.
- **Acceptable tolerance:** difference <0.5% (legitimate reasons: PSP settlement timing, fees in-transit).
- **Log any difference >0.5%** → compliance incident, automatic escalation to Susana + Diego.

**Step 2 — Operating balance check (3 min)**

- Balance `NEOMAAA LTD — OPERATING` fiat.
- Balance `OPERATING_TREASURY` Fireblocks.
- Verify it is within threshold (min 3 months burn rate).
- If below threshold → flag for top-up from Reserves that same week.

**Step 3 — LP margin check (5 min)**

- For each LP (3 accounts):
  - LP daily statement → current margin balance.
  - Margin utilization ratio = open positions / deposited margin.
  - If utilization >70% → immediate flag to Pepe to evaluate top-up.
  - If utilization <30% sustained 2 weeks → flag to evaluate withdrawal of excess.
- Cross-check margin utilization with Pepe's exposure report.

**Step 4 — PSP status (3 min)**

- Primary PSP dashboard: pending deposits, failed deposits, settlements en route.
- Secondary PSP dashboard: same.
- Any settlement >48h pending → flag for follow-up.
- Chargeback alerts → screenshot + escalation Angel + Susana.

**Step 5 — Trading anomalies (3-5 min)**

- Pepe's report: previous day PnL A-Book + B-Book split.
- Top 5 accounts with highest positive PnL (possible profitable traders to watchlist).
- Top 5 accounts with highest drawdown (possible margin calls).
- Any account with anomalous leverage (>internal limit) → flag to Pepe.
- Any symbol with widened spread outside hours → flag to dealing desk.

**Step 6 — Log + sign (2 min)**

- Entry in `daily_treasury_log_YYYY-MM.xlsx` (standard template).
- Date, executor, hour, key metrics, any flag generated.
- Digital signature (initial + timestamp) = Yulia or FM.
- If there is a flag → send 1-pager email to Diego + Susana before 10:00.

</div>

> [!WARNING]
> **Logging any difference >0.5% in Client Funds reconciliation is mandatory.** Hiding a difference, even if it looks like benign timing, is a serious violation of internal control. The rule is: document, investigate, resolve. Never silenced.

### 2.2 Daily dashboard Diego looks at (5 min)

Diego does not execute the daily checklist — Yulia/FM executes it. Diego looks at a **summary dashboard** daily that aggregates the 5 most important KPIs.

See section 7.1 for the exact dashboard.

---

## 3. Weekly Controls (2-3 hours Friday)

**Cadence:** Friday 14:00-17:00 Dubai.
**Current owner:** Yulia.
**Future owner:** FM + Yulia co-review.
**Output:** weekly 1-pager report to Diego + board snapshot email to the 3 principals.

### 3.1 Weekly cashflow report

Week consolidation in 1 table:

| Category | Monday | Tuesday | Wednesday | Thursday | Friday | Week total | vs previous week |
|---|---|---|---|---|---|---|---|
| Customer deposits (fiat + crypto) | | | | | | | |
| Customer withdrawals | | | | | | | |
| Customer net flow | | | | | | | |
| Revenue (spread + commission) | | | | | | | |
| LP margin movements | | | | | | | |
| OPEX paid | | | | | | | |
| Affiliate commissions accrued | | | | | | | |
| Operating balance change | | | | | | | |

Export from Xero + bank statements + Fireblocks + MT5. Execution time: 45 min if data is clean.

### 3.2 Client activity summary

| KPI | Week value | vs previous week | vs target |
|---|---|---|---|
| FTDs (first-time depositors) | | | |
| Total trading volume (lots) | | | |
| MAU (rolling monthly active users) | | | |
| Churn (inactive accounts >30 days moving to >60 days) | | | |
| Avg deposit ticket | | | |
| Crypto vs fiat deposits ratio | | | |

Export Skale CRM + MT5.

### 3.3 Marketing performance — CAC per channel

| Channel | Week spend | Leads | FTDs | CAC blended | CAC FTD |
|---|---|---|---|---|---|
| Meta Ads | | | | | |
| Google Ads | | | | | |
| Affiliates | | | | | |
| Organic / referral | | | | | |
| Partnerships | | | | | |

Cross-check with [`unit-economics-broker.md`](/content/executive/unit-economics-broker) targets.

### 3.4 Compliance week summary

Courtesy of Susana to Yulia on Fridays at 12:00:

- KYC/AML — how many cases approved, rejected, pending EDD.
- Sanctions hits — how many blocked + outcome.
- Chargebacks — how many open, won, lost.
- Any incident reportable to AOFA.

### 3.5 Weekly board snapshot (1-pager email)

Email Friday 18:00 to the 3 principals + Angel. Fixed format:

```
Subject: [NEOMAAA Treasury] Week X — snapshot

TL;DR (3 lines)
- Client Funds: USD X.XM (+/- vs prev week)
- Operating: USD X.XK (runway: X months covered)
- Week net flow: +/- USD X.XK

KPIs
- FTDs: X (target XX)
- CAC blended: USD XXX (target USD XXX)
- Avg LP margin utilization: XX%
- Chargebacks: X open / X won this week

FLAGS & ACTIONS
- [Flag 1 with action]
- [Flag 2 with action]

NEXT WEEK
- [Top 2-3 items to close]
```

> [!TIP]
> **Inviolable rule:** the email goes out ALWAYS on Friday, whether or not there is relevant news. Silence = concern. Rhythm consistency is part of the control.

---

## 4. Monthly Controls (full day first week of month)

**Cadence:** first Friday of each month, full day.
**Current owner:** Yulia + Diego co-review.
**Future owner:** FM executes + Yulia validates + Diego co-review.
**Output:** Monthly P&L + Monthly Reconciliation + Monthly KPI Dashboard + Monthly Board Report.

### 4.1 Full Monthly P&L — template

```markdown
# NEOMAAA Markets — Monthly P&L — [Month YYYY]

## Revenue
| Line | Current month | Previous month | Var % | YTD | Budget YTD | Var vs budget |
|---|---|---|---|---|---|---|
| Spread revenue | | | | | | |
| Commission revenue | | | | | | |
| Swap revenue | | | | | | |
| Inactivity fees | | | | | | |
| B-Book net PnL | | | | | | |
| **Total revenue** | | | | | | |

## Variable costs
| Line | Current month | Previous month | Var % |
|---|---|---|---|
| LP costs (spread markup paid) | | | |
| PSP fees | | | |
| Crypto processing fees | | | |
| Affiliate commissions | | | |
| Bonuses payout | | | |
| **Total COGS** | | | |

## Gross Profit
| | Month | % | Prev Month | % |
|---|---|---|---|---|
| Gross Profit | | | | |

## OPEX
| Line | Month |
|---|---|
| Salaries + benefits | |
| Tech vendors (MT5, Skale, Sumsub, Intercom, Fireblocks, Xero) | |
| Marketing spend | |
| Legal + compliance | |
| Rent Dubai hub | |
| Travel | |
| Accounting + audit | |
| Other | |
| **Total OPEX** | |

## EBITDA
| | Month | % revenue |
|---|---|---|

## Net Income
| | Month | YTD |
|---|---|---|
```

Source export: Xero + MT5 reports + Fireblocks audit log + Wise/Airwallex.

### 4.2 Monthly reconciliation (bank + crypto + LP)

Formal reconciliation of the 5 wallets against the internal ledger.

<div className="neo-step-list">

**Bank reconciliation — each bank account**
- Full month bank statement downloaded PDF + CSV.
- Line-by-line matching with Xero entries.
- Identify any reconciling item (in-transit, uncategorized bank fees).
- Signature: Yulia/FM + Diego co-sign.

**Crypto reconciliation — each Fireblocks + Gnosis Safe wallet**
- Export full monthly audit log.
- Matching with Xero entries (each tx categorized).
- On-chain verification of terminal balances (block explorer).
- Signature: Yulia/FM + Diego co-sign.

**LP reconciliation — each LP**
- LP monthly statement.
- Matching with daily P&L book + recorded margin movements.
- Verification of fees charged by LP = signed contract.
- Signature: Pepe + Yulia/FM.

**Client equity reconciliation — full**
- MT5 export full client equity snapshot end of month.
- Total sum = Client Funds wallet total (tolerance <0.5%).
- Any difference >0.5% documented with root cause.
- Signature: Yulia/FM + Susana.

</div>

### 4.3 Monthly KPI dashboard — 15 KPIs

Presented to the board in a single table vs prior month + vs target:

| # | KPI | Month | Prior | Var | Target | Status |
|---|---|---|---|---|---|---|
| 1 | Total active clients (MAU) | | | | | |
| 2 | FTDs month | | | | | |
| 3 | Total deposits month | | | | | |
| 4 | Total withdrawals month | | | | | |
| 5 | Net deposit flow | | | | | |
| 6 | Avg deposit ticket | | | | | |
| 7 | Trading volume (lots) | | | | | |
| 8 | Total revenue | | | | | |
| 9 | Gross margin % | | | | | |
| 10 | CAC blended | | | | | |
| 11 | Estimated LTV | | | | | |
| 12 | LTV/CAC ratio | | | | | |
| 13 | EBITDA margin | | | | | |
| 14 | Cash runway months | | | | | |
| 15 | Monthly churn rate | | | | | |

Status = traffic light (green/yellow/red) based on gap vs target.

### 4.4 Monthly board report 5-10 pages

Fixed structure:

1. **Executive summary** (1 page) — TL;DR of the month, top 3 wins, top 3 issues.
2. **Financials** (2 pages) — P&L, cashflow, wallet balances.
3. **KPIs** (1-2 pages) — dashboard of the 15 KPIs with commentary.
4. **Operations** (1 page) — marketing, sales, dealing, support updates.
5. **Compliance** (1 page) — Susana summary + any incident.
6. **Treasury** (1 page) — state of the 5 wallets, reconciliation status, relevant movements.
7. **Next month** (1 page) — priorities, board decisions pending, OKRs.

---

## 5. Quarterly Controls

**Cadence:** last week of each quarter (Q1 apr, Q2 jul, Q3 oct, Q4 jan).
**Owner:** principals.

### 5.1 Strategic review offsite (Diego + Angel + Yulia + Stanislav — 2 days)

Formal offsite, preferably outside Dubai (Madrid, Cyprus or neutral destination). Standard agenda:

- **Day 1 morning:** full Q financials review (Yulia presents).
- **Day 1 afternoon:** operations + compliance review (Angel + Susana presents).
- **Day 2 morning:** strategic review — what is working, what is not, what we pivot.
- **Day 2 afternoon:** next Q decisions — budget, hires, market entries, product.

**Outputs:**
- Formal minutes signed by the 4 principals.
- Approved next Q budget reforecast.
- Top 5 strategic decisions next Q with owner + deadline.
- Update of [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo).

### 5.2 Quarterly compliance review

Susana presents to the board:
- KYC/AML quarter stats (approvals, rejections, EDD).
- Compliance incidents.
- Regulatory changes applicable to AOFA / target jurisdictions.
- Retention & records status.
- Team training status.

### 5.3 Quarterly budget reforecast

Yulia (or FM) re-projects:
- Revenue next 2 quarters based on actuals + trend.
- Next quarter OPEX adjusted.
- Updated cash runway.
- Approved CAPEX for next Q.

---

## 6. Annual Controls

**Cadence:** Q4 each year (Nov-Dec) + external audit Q1 following year.
**Owner:** principals + external auditor.

### 6.1 Annual external audit

> [!WARNING]
> Annual external audit is **highly recommended** even if AOFA does not formally require it year 1 — doing it from year 1 builds auditable track record useful for M&A, banking relationships, and regulatory credibility.

Candidates already shortlisted in [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) section 5.3:

| Auditor | Estimated fee |
|---|---|
| Baker Tilly | USD 40-60K |
| BDO UAE | USD 50-70K |
| Mazars Offshore | USD 30-50K |
| Grant Thornton UAE | USD 60-80K |

Expected total range: **USD 30-80K/year**.

**Process:**
- Q3: firm selection + signed engagement letter.
- Q4: internal pre-audit prep (FM + Susana + Yulia).
- Q1 following year: auditor fieldwork (2-4 weeks).
- Q1 following year: audit report finalized + signed.

### 6.2 Formal board-approved annual risk assessment

Formal document that evaluates:
- Operational risks (dealing, IT, fraud, talent).
- Financial risks (liquidity, counterparty, market).
- Regulatory risks (license, compliance, tax).
- Reputational risks (PR, client complaints, social).

Each risk with probability × impact + mitigation plan. Approved by the 4 principals. Reviewed quarterly.

### 6.3 Annual budget + strategy (Q4 planning)

Dedicated annual session in Q4 for:
- Next year budget (revenue + COGS + OPEX + CAPEX).
- Next year strategic plan (market entries, product, team).
- Annual OKRs per area.
- Next year hires plan.

### 6.4 Full annual compliance review

Susana coordinates:
- Full policy + procedure review vs current regulation.
- AML/KYC framework update.
- Mandatory annual training for the whole team (AOFA AML, sanctions, data protection).
- Vendor + partner contract review.
- AOFA license renewal review (if applicable).

---

## 7. Critical KPIs Diego watches

Three levels of dashboard for Diego — each with a target maximum consultation time.

### 7.1 Daily dashboard (5 min/day)

Mobile-friendly, Metabase or Looker Studio. Diego opens it every morning.

| KPI | Source | Alert if... |
|---|---|---|
| Total Client Funds balance | Wallets + bank feed | <5% vs yesterday without reason |
| Operating cash | Bank feed + Fireblocks | <3 months burn |
| Yesterday net flow | MT5 + PSP | Negative 3 days in a row |
| Yesterday trading volume | MT5 | <50% of the 30d average |
| Yesterday FTDs | Skale + MT5 | 0 on business day |
| LP max margin utilization | LP statements | >80% in any LP |
| Open chargebacks | PSP dashboards | >5 open |

### 7.2 Weekly dashboard (30 min Friday)

In addition to the weekly report section 3, Diego reviews:

- CAC blended week vs 4-week moving avg.
- Affiliate pipeline (top 10 affiliates by production).
- Revenue mix (spread/commission/swap/B-book) vs target.
- Actual cash burn vs budget.

### 7.3 Monthly dashboard (1h first Monday)

- Full Monthly board report (section 4.4).
- Deep dive 1 specific KPI chosen to monitor that month.
- Deep dive 1 specific risk identified in the quarterly risk.

---

## 8. Red flags — when to escalate

Red flag table with action + escalation path. This is the treasury "incident response".

| Red flag | Severity | Immediate action | Escalation path | Deadline |
|---|---|---|---|---|
| Client Funds reconciliation diff >0.5% | Critical | Freeze outgoing from Client Funds until root cause | Yulia → Susana → Diego | 4h |
| Operating balance <2 months burn | High | Alert principals, prepare top-up from Reserves | Yulia → Diego | 24h |
| LP margin utilization >80% | High | Pepe evaluates positions, prepares top-up | Pepe → Yulia → Diego | 4h |
| PSP freeze deposits | Critical | Activate secondary PSP immediately, customer communication | Angel → Yulia → Diego → Susana | 2h |
| Sanctions hit not resolved <48h | Critical | Freeze account + regulatory escalation if applicable | Susana → Diego | 24h |
| Chargebacks >1% of month volume | High | Review KYC process + PSP risk settings | Angel + Susana → Diego | 48h |
| FTDs 0 on 3 business days | Medium | Review funnel + marketing | Marketing → Yulia → Diego | 72h |
| Signatory employee leaves company | Critical | Revoke bank + Fireblocks access <24h | Yulia → Diego + IT | 24h |
| Bank statement does not arrive on date | Medium | Follow-up to bank + escalation | Yulia | 48h |
| External auditor "serious" findings | Critical | Remediation plan + board meeting | Diego + auditor → board | 7 days |
| Employee reports fraud suspicion | Critical | Whistleblower flow, Susana + Diego review | Susana + Diego | 24h |
| LP requests additional collateral outside cycle | High | Review relationship + evaluate continuing with LP | Pepe + Diego | 48h |
| Month revenue < 70% of budget | High | Emergency ops review | Yulia + Diego | 7 days |
| Cyber incident (breach, phishing, ransomware) | Critical | Activate IR plan + legal | IT + Susana + Diego | 2h |

> [!WARNING]
> **Escalation principle:** when in doubt, escalate. A false positive costs 30 min of Diego's time. A false negative can cost the license. The culture is "escalate early, resolve fast".

---

## 9. Recommended tools / software

Complete tool stack to execute the control framework.

| Function | Recommended tool | Estimated cost | Owner |
|---|---|---|---|
| Multi-currency general accounting | **Xero** | USD 70-200/mo | FM / Yulia |
| FX + international vendor wires | **Wise Business** | Variable fee (0.4-1%) | Yulia |
| Multi-currency account + payroll | **Airwallex** | Variable fee | Yulia |
| Crypto custody + audit trail | **Fireblocks** | USD 30-100K setup + var | Diego + Yulia |
| Self-custody multisig Reserves | **Gnosis Safe** (free) + Ledger hardware wallets (USD 150 each) | Minimal | Principals |
| BI + dashboards | **Metabase** self-hosted / **Looker Studio** | USD 0-200/mo | FM |
| 7-year document retention storage | **Google Workspace Enterprise** | USD 18-25/user/mo | Yulia |
| Corporate document e-signature | **DocuSign** / **Dropbox Sign** | USD 10-30/user/mo | Yulia |
| Bookkeeping automation | **Xero + Dext** (Dext imports receipts) | USD 20/mo additional | FM |
| Client CRM | **Skale** (already contracted) | Existing contract | Angel |
| KYC/AML | **Sumsub** (already contracted) | Existing contract | Susana |
| Customer support | **Intercom** (already contracted) | Existing contract | Support lead |
| MT5 server | MetaQuotes licensing | Existing contract | Pepe / IT |
| Incident management IR | **PagerDuty** / alternative | USD 20-50/user/mo | IT |

**Approximate treasury tools cost year 1:** USD 80-150K total (includes one-time Fireblocks setup).

---

## 10. Finance team scaling

Finance structure is not static — it scales with the company. Concrete roadmap:

### 10.1 Pre-launch — TODAY (April 2026)

- **Yulia + Diego manual.**
- Xero + Wise + Airwallex configured.
- No external accountant yet (hired Month 0-1).
- Reconciliations in Excel + Xero.

### 10.2 Month 1-6 post-launch

- **Yulia (ops + finance head) + part-time external accountant.**
- External accountant: 10-20h/mo, focus on clean bookkeeping + monthly close + audit prep.
- Yulia remains owner of daily treasury, accountant reviews.
- Tools: full Xero + Dext + operational Fireblocks.

### 10.3 Month 6-12

- **+ Full-time Finance Manager.**
- FM takes over daily + weekly + monthly controls under Yulia supervision.
- Yulia moves to oversight + strategic.
- External accountant continues (now as FM counterpart).
- Ideal FM profile: 5-7 years experience, preferably in broker/fintech/PSP, trilingual ES/EN/RU desirable, experience with Xero + multi-currency + crypto accounting. Salary range `[DATA: USD XX-YYK/year confirmed per Dubai market]`.

### 10.4 Year 2

- **+ Junior accountant (in-house).**
- Junior executes daily bookkeeping + data entry + receipts.
- FM moves to reporting + strategic + audit liaison.
- **+ Part-time internal auditor** (consultant or fractional hire). Function: quarterly internal audits anticipating external auditor, control testing.

### 10.5 Year 3

- **+ Dedicated CFO.**
- Structure: CFO → FM → Junior accountant.
- Full-time internal auditor.
- Tax advisor retainer.
- Corporate treasurer specialist if volume requires it.

> [!INFO]
> **CFO hire signal:** when sustained monthly EBITDA exceeds USD 500K or when there is an active capital raise / M&A process. Before that, FM + fractional external CFO advisor is more efficient.

---

## 11. Calendarized finance ceremonies

Consolidated table of all control ceremonies — what, when, who.

| Frequency | Task | Primary owner | Co-owner / reviewer | Target time |
|---|---|---|---|---|
| Daily 09:00 Dubai | Daily reconciliation 6-step checklist | Yulia / FM | Diego (dashboard) | 15-30 min |
| Daily 09:30 | Diego opens daily dashboard | Diego | — | 5 min |
| Daily end-of-day | Pepe reports dealing PnL + anomalies | Pepe | Yulia | 10 min |
| Weekly Friday 14:00 | Weekly cashflow report | Yulia / FM | Diego | 1h |
| Weekly Friday 15:00 | Weekly client activity + marketing | Yulia / FM | Diego + Angel | 1h |
| Weekly Friday 17:00 | Weekly board snapshot email | Yulia / FM | Diego | 30 min |
| Weekly Friday 16:00 | Compliance summary | Susana | Yulia | 30 min |
| Monthly first Friday | Monthly P&L + reconciliation | FM / Yulia | Diego + external accountant | Full day |
| Monthly first Monday | Diego reviews monthly dashboard | Diego | — | 1h |
| Monthly first week | Monthly board report | FM / Yulia | Diego | 4h writing |
| Quarterly last week | Strategic review offsite | Principals | — | 2 days |
| Quarterly last week | Compliance review | Susana | Principals | 3h |
| Quarterly last week | Budget reforecast | FM / Yulia | Diego | 1 day |
| Annual Q3 | Auditor engagement | Diego | FM + Susana | 2h |
| Annual Q4 | Pre-audit prep | FM + Susana | Yulia | 2 weeks |
| Annual Q1 (next year) | Audit fieldwork | External auditor | FM + Susana + Yulia | 2-4 weeks |
| Annual Q4 | Formal risk assessment | Principals + Susana | Diego | 1 day |
| Annual Q4 | Next year budget + strategy | Principals | FM | 2 days |
| Annual Q4 | Full compliance review | Susana | Principals | 3 days |

---

## 12. Placeholders `[DATA:]` — pending decisions

List of `[DATA:]` that owners complete:

| ID | Data | Owner | Recommended deadline |
|---|---|---|---|
| C-01 | Current cash position (bank + crypto) pre-launch | Yulia | Week 1 |
| C-02 | Confirmed part-time external accountant | Yulia | Week 2 |
| C-03 | Finance Manager target hire month | Diego + Yulia | Month 3 (job post) |
| C-04 | Confirmed Finance Manager salary range Dubai market | Yulia | Month 3 |
| C-05 | Confirmed external auditor year 1 | Diego + Yulia | Month 6 |
| C-06 | Formal board meeting cadence (monthly / quarterly) | Principals | Week 2 |
| C-07 | Monthly burn rate validated Q2 2026 | Yulia | Month 2 |
| C-08 | Approved year 1 budget | Principals | Pre-launch |
| C-09 | CFO target hire date year 2 | Principals | Q4 year 1 |
| C-10 | Confirmed Metabase / Looker Studio | Yulia + IT | Month 1 |
| C-11 | PagerDuty or other incident management tool | IT + Diego | Month 2 |
| C-12 | Formal whistleblower channel | Susana + Diego | Month 2 |

---

## 13. Document governance

- **Ownership:** Yulia operational owner. Diego strategic owner. FM execution owner when hired.
- **Review:** quarterly + ad-hoc when cadence, tool, or responsible party changes.
- **Versioning:** semver. 1.0 → 1.x minor changes. 2.0 major rewrite.
- **Distribution:** principals + FM + Susana + external accountant + external auditor (read-only).
- **Evidence keeping:** each executed control generates a log. Logs retained 7 years in Google Workspace + Xero audit trail + Fireblocks audit log.

---

**Related documents:**
- [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo) — macro broker view
- [`treasury-management.md`](/content/executive/treasury-management) — generic multi-wallet framework
- [`wallet-structure-neomaaa.md`](/content/executive/wallet-structure-neomaaa) — NEOMAAA specific wallet setup
- [`unit-economics-broker.md`](/content/executive/unit-economics-broker) — CAC / LTV / margin
- [`compliance/expansion-regulatoria.md`](/content/compliance/expansion-regulatoria) — AOFA Anjouan regulatory requirements
- [`executive/ab-book-policy.md`](/content/executive/ab-book-policy) — hybrid A/B book policy

---

**Last revision:** April 13, 2026 — Claude (pre-launch preparation)
**Mandatory next review:** Month 1 post-launch (validate that daily checklist was executed 20+ consecutive days without gap)
