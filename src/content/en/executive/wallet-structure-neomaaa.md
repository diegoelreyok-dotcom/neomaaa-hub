# NEOMAAA Wallet Structure — Specific Setup

**Strategic document — RESTRICTED ACCESS OWNERS**
**Neomaaa Ltd (IBC 15968) | AOFA License L15968/N**
**Audience:** Diego (CEO), Angel, Yulia, Stanislav
**Version:** 1.0 | Date: April 13, 2026
**Classification:** CONFIDENTIAL — exclusive use principals + Head of Finance when hired

> [!DANGER]
> This document defines the **specific and executable** treasury setup of Neomaaa Ltd. The wallets described here must exist before go-live. Placeholders marked as `[DATA: ...]` are decisions requiring Diego + Yulia signatures before opening accounts. Any improvisation in this layer compromises the license, LP relationships, and credibility before PSPs.

> [!INFO]
> **Purpose:** ground the generic framework of [`treasury-management.md`](/content/executive/treasury-management) to the concrete NEOMAAA Markets case. This document answers: how many exact wallets, which bank in which jurisdiction, which crypto custodian, how much cash in each, who signs what, and in what order they are opened. It is the pre-launch + first 12 months treasury runbook.

---

## 1. Current pre-launch state

Today (April 2026) NEOMAAA Markets is in **pre-launch** phase with the following real operational state:

- **Incorporated company:** Neomaaa Ltd, IBC 15968 Anjouan, AOFA License L15968/N active.
- **Team:** 16 people between remote and Dubai hub. Principals: Diego (CEO), Angel (co-founder / CEO Spain), Yulia (ops & finance), Stanislav (equity partner). Pepe Head of Dealing, Susana Compliance.
- **Portal registrations:** ~250 pre-registered, most inherited from the Funded ecosystem.
- **Tech stack:** MT5 licensed, Skale CRM, Sumsub KYC, Intercom support, Docsify portal + Next.js hub.
- **Projected runway:** 6 weeks to phase 1 go-live (LATAM + CIS + MENA). Asia is phase 2 (+3-6 months).
- **Current treasury:** zero. No segregated corporate accounts exist yet for Neomaaa Ltd. Everything that exists today is the operating structure of NEOMAAA Funded (prop trading), a separate business with its own limited treasury.

> [!WARNING]
> **Critical pre-launch gap:** without segregated wallets opened and operating (with at least one end-to-end test transaction), **the first real client deposit cannot be accepted**. Accepting deposits before having operational segregation is de facto commingling and invalidates the license. The "operational wallets" milestone blocks go-live.

### 1.1 Prior decisions already made by principals

<div className="neo-stat-grid">

**Primary banking jurisdiction: Dubai.**
Due to Diego's physical presence, access to professional banks (Mashreq, ADCB, ENBD), AED/USD payments infrastructure, and AOFA-friendly regulatory proximity.

**Base operating currency: USD.**
MT5 is operated USD-denominated, clients from the 4 target markets are comfortable with USD, LPs quote in USD.

**Dual custody: bank + crypto.**
One foot in traditional banking (fiat) and another in institutional crypto custody (stables + BTC/ETH treasury). Reason: 40%+ of expected deposits come in USDT (LATAM + CIS + MENA use it as default).

**Multisig for Reserves and Cold.**
Main decision already made: the strategic reserve (>$500K equivalent) always lives in 3-of-3 multisig Diego/Yulia/Stanislav. No exception.

**Mandatory external audit year 1.**
Already decided that an external auditor will be engaged before closing the first fiscal year. Candidates in section 5.

</div>

### 1.2 Pending decisions blocking treasury setup

List of decisions Diego + Yulia must close in the next 2-3 weeks to avoid blocking go-live:

1. **Primary Dubai bank** — Mashreq vs ADCB vs ENBD. Corporate banking onboarding takes 4-8 weeks. Must start NOW.
2. **Crypto custodian** — Fireblocks vs BitGo vs Copper. Each has its own onboarding and different fees.
3. **Primary + secondary PSP** — each PSP generates a separate settlement account, must align with primary bank.
4. **Confirmed LPs** — affects how much margin is reserved in LP Margin wallet and with which bank it settles.
5. **Full-time Finance Manager** — today Yulia + Diego manual. At 6 months post-launch it is unsustainable.

See section 9 for the full list of open `[DATA:]`.

---

## 2. The 5 wallets proposed for NEOMAAA

Extension of the generic framework of [`treasury-management.md`](/content/executive/treasury-management) to the concrete NEOMAAA setup. Each wallet has a regulatory purpose, defined technical infrastructure, and clear flow rules.

### 2.1 Wallet #1 — Client Funds (Segregated)

**Purpose:** exclusive custody of money deposited by clients. Everything that enters via PSP or wire/crypto from a client lands here. From here it exits **only** to (a) withdrawals to the same client, (b) margin-out to the dealing flow when the client traded (never before), (c) regulatory audit/inspection.

**NEOMAAA infrastructure:**

- **Fiat layer:** segregated corporate account labeled `NEOMAAA LTD — CLIENT FUNDS` at primary Dubai bank. `[DATA: primary bank confirmed — Mashreq / ADCB / ENBD]`. Account documented in compliance folder, loaded in Skale as settlement account.
- **Crypto layer:** dedicated sub-wallet at institutional custodian, 2-of-3 multisig Diego/Yulia/Pepe, labeled `CLIENT_FUNDS_SEGREGATED`. `[DATA: custodian confirmed — Fireblocks / BitGo / Copper]`.
- **Currency:** 100% USD (fiat) + 100% USDT/USDC stablecoins (crypto). **No speculation allowed** with this wallet. See section 6.
- **Expected effective threshold:** at peak month 6-12, equivalent to cumulative net deposits. Conservative estimate month 6: USD 1.5-3M. Month 12: USD 4-8M. `[DATA: estimate validated by Yulia post-first real month]`.

**Flow rules (inviolable):**

> [!WARNING]
> **Absolute prohibitions on Client Funds:**
> - Never transfer to Operating, under any circumstance, without an executed and settled client order.
> - Never use as collateral for anything.
> - Does not generate yield or staking. Stablecoins remain idle.
> - Not lent to LPs or partners.
> - Every outflow requires reconciliation against internal ledger within 24h.

**Reconciliation:** daily (Yulia or Finance Manager). Bank balance + crypto balance vs internal MT5 ledger (total client equity). Tolerance: <0.5% daily. Any gap >0.5% is a compliance incident, escalated to Susana and documented.

### 2.2 Wallet #2 — Operating

**Purpose:** broker's money. Pays salaries, tech vendors (MT5, Skale, Sumsub, Intercom), marketing, legal, Dubai hub rent, travel, all OPEX.

**NEOMAAA infrastructure:**

- **Fiat layer:** separate corporate account `NEOMAAA LTD — OPERATING` at the same primary bank. Can be a sub-account of the main bank but with distinct IBAN/account number and explicit label.
- **Crypto layer (operating treasury):** Fireblocks/BitGo wallet labeled `OPERATING_TREASURY` for crypto payments to vendors and collaborators who prefer USDT. Single-sig with MPC and approval rules 1-of-2 (Yulia or Diego) for amounts <USD 25K; 2-of-2 (Yulia + Diego) for amounts ≥USD 25K.
- **Currency:** mix per section 6 — 20% BTC / 60% USDT / 20% fiat USD. Reason: OPEX is expected to be paid mostly in USD/USDT; the 20% BTC is a strategic value-growth reserve.
- **Target threshold:** maintain **3 months of burn rate** covered here. `[DATA: monthly burn rate validated Q2 2026 — preliminary estimate USD 180-250K/month]`. Implies keeping USD 600-750K in Operating.

**Flow rules:**

- In: transfers from Reserves (initial funding), fees/commissions charged to client (spread markup, swap, inactivity), net B-Book flow P&L.
- Out: salaries (Wise / bank transfer), vendors, affiliates (via Affiliate Payouts after approval), transfers to Reserves when balance exceeds threshold.

### 2.3 Wallet #3 — Affiliate Payouts

**Purpose:** pay affiliates and IBs their monthly commissions. Separate from Operating because:
- Different rhythm (monthly batch payout vs continuous flow).
- Simpler audit (a specific ledger of commission statements).
- Affiliate KYC compliance has its own flow (each affiliate has AML check before receiving first payout).

**NEOMAAA infrastructure:**

- **Crypto layer (primary):** USDT wallet at Fireblocks/BitGo labeled `AFFILIATE_PAYOUTS`. Reason: 80%+ of NEOMAAA affiliates come from LATAM, Russia, MENA — all pay/receive in USDT. Network fees (<1% vs 3-5% fiat wire) is the economic differentiator.
- **Fiat layer (residual):** Wise Business + Airwallex for affiliates requesting wire in EUR/USD/GBP. Estimate: <20% of total payouts.
- **Currency:** 100% USDT in the crypto wallet, multi-currency fiat in Wise/Airwallex depending on destination.
- **Threshold:** monthly batch. The total calculated commissions are loaded to the wallet between days 1-3 of each month, all paid before day 7, emptied. No idle cash kept here.

**Approvals:**

- Full monthly batch <USD 100K: Yulia approves.
- Monthly batch >USD 100K: Yulia + Diego co-sign.
- Anomalous individual payout (e.g.: affiliate requests advance outside cycle): always requires explicit Diego approval.

### 2.4 Wallet #4 — LP Margin

**Purpose:** collateral deposited at Liquidity Providers to cover open positions of the A-Book (pass-through) flow. NEOMAAA operates a hybrid ECN/STP model — the A-Book portion passes to real LPs and requires margin deposited with them.

**NEOMAAA infrastructure:**

- **Structure:** **one separate wallet per LP**. NEOMAAA phase 1 target: **3 LPs** for redundancy. `[DATA: LP #1 confirmed — candidates: LMAX, CFH, Swissquote PB]` `[DATA: LP #2 confirmed]` `[DATA: LP #3 confirmed]`.
- **Account type:** institutional margin account, reports daily statement to broker.
- **Currency:** USD 100%. Stablecoins do not apply (institutional LPs do not accept USDT as margin).
- **Threshold per LP:** **USD 250-500K** per LP at start. Total 3-LP system: USD 750K - 1.5M. This is initial CAPEX exiting Reserves via Operating.

**Flow rules:**

- Initial funding: one-time transfer from Reserves at LP onboarding moment.
- Top-up: when margin utilization ratio exceeds 70%, Pepe (Head of Dealing) requests top-up from Yulia. Yulia approves <USD 100K; Yulia+Diego co-sign >USD 100K.
- Withdrawal: excess margin is withdrawn when utilization falls below 30% sustained for 2 weeks. Returns to Operating or Reserves depending on cash state.

> [!INFO]
> **LP diversification:** do not concentrate more than 50% of volume in a single LP. If an LP has a freeze/technical issue, the other two absorb. This is principal decision — non-negotiable.

### 2.5 Wallet #5 — Reserves (Cold Storage)

**Purpose:** strategic reserve for company survival. Extended runway + war chest for opportunities (e.g.: acquisition of affiliate portfolio, additional tier 1 jurisdiction license, new market expansion).

**NEOMAAA infrastructure:**

- **Fiat layer:** bank account in **jurisdiction separate from Dubai** — **Swiss bank or Liechtenstein private bank**. Reason: jurisdictional diversification against any action on the primary Dubai bank. `[DATA: reserve bank confirmed — candidates: Swissquote, Dukascopy, LGT, VP Bank]`.
- **Crypto layer:** **3-of-3 multisig** on hardware wallets — Diego / Yulia / Stanislav. Infrastructure: Gnosis Safe on Ethereum (USDT/USDC/ETH) + institutional custodian for BTC (Fireblocks cold storage or Casa multisig).
- **Currency:** mix 40% BTC / 40% (ETH + stables) / 20% fiat. See section 6 for rationale.
- **Threshold:** minimum **6 months OPEX covered** always. Year 1 target: USD 1.5-2M in Reserves. Year 2: USD 3-5M.

**Flow rules:**

> [!WARNING]
> **Reserves is untouchable without formal approval of the 3 principals (Diego + Yulia + Stanislav).** Every outflow movement requires:
> - Written email with justification.
> - Explicit approval from the 3 separately.
> - Documentation in decision log (`05-DECISIONES` Obsidian).
> - Multisig execution with 3 physical hardware wallets.

**Sole exception:** freeze of primary Dubai bank — in that case, pre-approved contingency plan can be activated to cover urgent operating. Contingency plan is a separate doc that must be signed before go-live.

---

## 3. Signatory matrix

Who can approve what amount in each wallet. This matrix is binding and replicated in banking systems (approval rules) and in Fireblocks/BitGo (policy engine).

| Wallet | <USD 10K | USD 10K-50K | USD 50K-250K | USD 250K-1M | >USD 1M |
|---|---|---|---|---|---|
| **Client Funds** | Yulia or Pepe (only client withdrawals) | Yulia + Pepe | Yulia + Pepe + log to Susana | Yulia + Pepe + Diego | The 3 principals + Susana notified |
| **Operating** | Yulia | Yulia | Yulia + Diego | Yulia + Diego | Yulia + Diego + Stanislav |
| **Affiliate Payouts** | Yulia | Yulia | Yulia + Diego | Yulia + Diego | Blocked — split into 2 batches |
| **LP Margin** | Pepe + Yulia | Pepe + Yulia | Pepe + Yulia | Yulia + Diego | The 3 principals |
| **Reserves** | N/A — no movements <USD 10K | N/A | 3 principals multisig | 3 principals multisig | 3 principals multisig + formal minute |

> [!TIP]
> **Mnemonic rule:** "10K solo / 50K double / 250K triple / 1M board". Any exception to this rule is escalated to Diego in writing.

### 3.1 Users in the banking system and Fireblocks

Each principal and operator has their own credential with defined role. **Sharing credentials prohibited** — including 2FA devices.

| User | Role | Wallets with access | Approval level |
|---|---|---|---|
| Diego (CEO) | Principal | All | Up to limit of each wallet |
| Yulia | Principal + Ops | All | Up to limit of each wallet |
| Stanislav | Principal | Reserves + Operating (view) + Client Funds (view) | Reserves multisig only |
| Angel | Co-founder | Operating (view) + reports | No signing authority |
| Pepe (Head Dealing) | Operator | LP Margin + Client Funds (margin flow) | Joint approvals with Yulia |
| Susana (Compliance) | Oversight | All read-only | No signing authority, approval on exceptions |
| `[DATA: Finance Manager when hired]` | Daily ops | Operating + Affiliate Payouts + Client Funds reconciliation | Up to USD 50K Operating, co-sign with Yulia for the rest |

---

## 4. Daily treasury ops

Who executes what in day-to-day. Separating **who does** from **who approves** is the basic internal control principle (segregation of duties).

### 4.1 Pre-launch + first 6 months (no Finance Manager)

<div className="neo-step-list">

**Yulia — operational treasury owner.**
- Daily reconciliation (30 min every morning 09:00 Dubai).
- Processes affiliate payouts the first 7 days of each month.
- Maintains internal ledger parallel to core MT5 to audit client withdrawals.
- Executes transfers <USD 50K directly.
- Escalates to Diego any movement ≥USD 50K.
- Monthly reporting to the 3 principals.

**Diego — co-approver and strategic vision.**
- Co-sign movements ≥USD 50K.
- Reviews daily dashboard (see [`financial-controls.md`](/content/executive/financial-controls)) — 5 min per day.
- Board decisions Reserves.

**Pepe — technical operator of dealing/LP flow.**
- Monitors margin utilization at each LP.
- Requests top-ups from Yulia when applicable.
- Reports to Diego any anomaly in dealing flow.

**Susana — compliance oversight.**
- Weekly reviews whether Client Funds segregation is intact (reconciliation check).
- Reviews AML/KYC of affiliates before they receive first payout.
- Validates that monthly treasury statements are consistent with client ledger.

**External part-time accountant** — `[DATA: firm chosen — candidates: PKF Dubai, Crowe Dubai, BDO UAE]`.
- Monthly close bookkeeping.
- Independent monthly reconciliation review.
- Preparation for annual audit.

</div>

### 4.2 Month 6-12 (with full-time Finance Manager)

With an in-house Finance Manager (FM), Yulia is freed to focus on general company operations. Division becomes:

- **FM (full-time):** all daily treasury, reconciliation, payouts, vendor payments, bookkeeping with external accountant, preparation of monthly board report.
- **Yulia:** FM oversight, mid-size amount approval (USD 50K-250K), relationship with banks and custodian, reports to Diego and board.
- **Diego:** large amount approvals, strategy, board level.
- **Pepe:** LP margin unchanged.
- **Susana:** compliance unchanged.
- **External accountant:** remains part-time, but with FM as direct counterpart (not Yulia).

> [!INFO]
> **Finance Manager hire deadline:** `[DATA: target hire month — executive recommendation Month 5-6 post-launch]`. Delaying further overloads Yulia to an unsustainable point and generates overload errors.

### 4.3 Year 2+ (full finance team structure)

See [`financial-controls.md`](/content/executive/financial-controls) section 10 — "Scaling the finance team" — for year 2 and year 3 projection.

---

## 5. Shortlist of banking and custody providers to evaluate

Not decided in this doc. A fundamented shortlist is left so Diego + Yulia do due diligence and decide in the next 2 weeks.

### 5.1 Primary Dubai bank — 3 candidates

| Bank | Pros | Cons | Onboarding time |
|---|---|---|---|
| **Mashreq Bank** | Mature corporate banking, direct SWIFT, friendly with licensed offshore companies, NEO Biz is fintech-friendly | Requires physical visit, requires signatory's Emirates ID | 4-6 weeks |
| **ADCB (Abu Dhabi Commercial Bank)** | Very stable, good for USD settlement, good regulator reputation | More conservative with offshore IBC companies, may ask for more docs | 6-8 weeks |
| **Emirates NBD** | Large network, Wise/Airwallex integration, native multi-currency | High fee schedule vs alternatives, extensive KYC | 5-8 weeks |

**Executive recommendation:** open **two accounts in parallel** — Mashreq as primary + ADCB as secondary/redundancy. Dual setup reduces operational risk if one bank has technical freeze. Minimal incremental CAPEX, enormous benefit.

### 5.2 Reserve bank (outside Dubai) — 2 candidates

| Bank | Jurisdiction | Pros | Cons |
|---|---|---|---|
| **Swissquote Bank** | Switzerland | Fintech-friendly, crypto integration, multi-currency, solid reputation | Minimum corporate deposit USD 500K, high fees |
| **VP Bank Liechtenstein** | Liechtenstein | Premium private banking, discretion, stable, experience with crypto clients | Burdensome — very demanding compliance, requires referrals |

**Executive recommendation:** start with Swissquote due to less onboarding friction. Evaluate migration to VP Bank year 2 when Reserves exceed USD 2M.

### 5.3 Institutional crypto custody — 3 candidates

| Provider | Pros | Cons | Fees |
|---|---|---|---|
| **Fireblocks** | Industry standard, robust MPC + policy engine, ~1,800 institutional clients, native integrations with LPs/exchanges | Expensive, requires minimum volume | USD 30-100K setup + variable |
| **BitGo** | Qualified custody (NY Trust), insured up to USD 250M, strong audit trail, cheaper than Fireblocks | Fewer DeFi integrations, slower UI | USD 15-50K setup + variable |
| **Copper** | UK-based, institutional, premium service, strong OTC desk | More boutique, lower retail volume | Custom pricing, generally premium |

**Executive recommendation:** **Fireblocks** for custody tier 1 (Operating + Affiliate Payouts + Client Funds crypto). **Self-custody Gnosis Safe multisig 3-of-3** for Reserves — critical kept under the 3 principals, without third-party dependency for the most sensitive balance.

### 5.4 Accounting software + ERP

| Tool | Use | Approximate cost |
|---|---|---|
| **Xero** | General corporate accounting, multi-currency, bank feed integration | USD 70-200/month |
| **Wise Business** | FX + international wires to vendors/affiliates | Per transaction fee |
| **Airwallex** | Multi-currency account + international payroll | Per transaction fee |
| **Fireblocks Workspace** | Crypto treasury control + audit trail | Included in custody |
| **Metabase / Looker Studio** | BI over CRM + treasury data | USD 0-200/month |

**Recommended stack:** Xero (central accounting) + Wise Business (FX/wires) + Airwallex (multi-currency + payroll) + Fireblocks (crypto) + Metabase (dashboards).

---

## 6. Suggested crypto treasury split

NEOMAAA has crypto exposure through two channels: (a) clients depositing/withdrawing in USDT, (b) own treasury (Operating + Reserves) that holds positions. The split per wallet is intentional.

### 6.1 Reserves — 40% BTC / 40% (ETH + stables) / 20% fiat

**Rationale:**
- 40% BTC: long-term thesis (multi-year). Low correlation with operational business, hedge against USD inflation. Hold without short-term speculation.
- 40% ETH + stables: 20% ETH (exposed to smart contract ecosystem — real optionality) + 20% USDC/USDT (immediate liquidity without having to move BTC in a bear market).
- 20% fiat: USD in Swiss bank — regulatory liquidity and M&A optionality.

> [!TIP]
> **Rebalance:** evaluate composition quarterly. If BTC rises 50%+ in a quarter and the split becomes 55/35/10, rebalance by selling part of the BTC to USDC. Do not do fine market timing — only disciplined rebalancing.

### 6.2 Operating — 20% BTC / 60% USDT / 20% fiat

**Rationale:**
- 60% USDT: most OPEX is paid in USDT (affiliates, crypto vendors, LATAM/CIS/MENA collaborators).
- 20% BTC: operational store of value. Sold proportionally when OPEX is used.
- 20% fiat USD: Dubai hub salaries, traditional vendors (MT5, Skale, Sumsub), rent, legal.

### 6.3 Client Funds — 100% stables (USDT + USDC)

> [!WARNING]
> **Zero speculation on Client Funds.** Everything entering in crypto via client deposit stays in USDT or USDC in the `CLIENT_FUNDS_SEGREGATED` sub-wallet. Not converted to BTC/ETH. No staking. No yield generation. The only relevant metric is: **1 USDT deposited = 1 USDT in wallet**. Any deviation is economic commingling.

**Stable split:** 60% USDT / 40% USDC. Reason: diversification against single-issuer risk (Tether freeze event, USDC de-peg). If one temporarily collapses, 40% of the other absorbs.

### 6.4 Affiliate Payouts — 100% USDT

Pure operational — enters from Operating day 1-3 of each month, exits day 1-7. No idle maintenance.

### 6.5 LP Margin — 100% USD fiat

Institutional LPs do not accept stablecoins as margin. USD bank wire only.

---

## 7. Compliance considerations

NEOMAAA operates under **AOFA L15968/N** and treasury structures must meet the following specific requirements.

### 7.1 Mandatory segregation of Client Funds (AOFA)

Regulatory requirement: Client Funds physically segregated from the broker's own balance. It's not "accounting" — it's operational. The bank and custodian must explicitly label the account as "Client Funds".

**Expected audit evidence:**
- Account opening docs from the bank with visible labeling.
- Transfer history demonstrating zero commingling.
- Monthly reconciliations signed by Yulia + Susana.
- Internal ledger demonstrating that wallet balance = sum of MT5 client equity.

### 7.2 7-year retention

AOFA + FATF require all transaction records, reconciliation, KYC/AML to be available for **7 years** from the transaction date.

**NEOMAAA implementation:**
- Xero automatically retains bookkeeping for 7+ years.
- Bank statements downloaded monthly to encrypted storage (Google Workspace with custom retention policy).
- Crypto audit trail: Fireblocks audit log exported monthly to storage with 7-year retention.
- Skale CRM + MT5 logs with archival configured.

**Owner:** Susana (Compliance) — operationally responsible for retention compliance.

### 7.3 Annual external audit

NEOMAAA hires external auditor to sign off on the fiscal year. Candidates:

| Auditor | Pros | Estimated fees |
|---|---|---|
| **Baker Tilly** | Global, offshore broker experience | USD 40-60K/year |
| **BDO UAE** | Dubai presence, good AOFA knowledge | USD 50-70K/year |
| **Mazars Offshore** | Specialized offshore licensing | USD 30-50K/year |
| **Grant Thornton UAE** | Premium tier 2 | USD 60-80K/year |

`[DATA: auditor confirmed — decision pending Diego + Yulia]`.

### 7.4 AML/CFT — Source of Funds

Every client deposit ≥USD 10K automatically passes enhanced due diligence (EDD) via Sumsub. The cash flow toward Client Funds is linked to the KYC record. If source-of-funds check fails, deposit stays in holding and is escalated to Susana before crediting in MT5.

### 7.5 Sanctions screening

Every payment (in + out) passes sanctions screening (OFAC, UN, EU, UK). Implemented at PSP level + Sumsub + Fireblocks policy engine. Any hit blocks the transaction, escalates to Susana, documented.

---

## 8. Year 1 treasury milestones

Executable roadmap from today to Month 12. Each milestone has owner and deadline.

<div className="neo-timeline">

**Month 0 (pre-launch, TODAY) — Account setup**
- Opening Dubai primary bank (Mashreq + ADCB parallel). Owner: Yulia.
- Crypto custodian onboarding (Fireblocks). Owner: Yulia + Diego.
- Reserve bank opening (Swissquote). Owner: Diego.
- Wise Business + Airwallex setup. Owner: Yulia.
- 3-of-3 Gnosis Safe setup Diego/Yulia/Stanislav. Owner: Diego + tech advisor.

**Month 1 — First end-to-end transaction**
- Test client USD deposit (fiat) → reconciliation → test withdrawal. Owner: Yulia + Pepe.
- Test client USDT deposit → reconciliation → USDT test withdrawal. Owner: Yulia + Pepe.
- First LP margin load (USD 250K at each LP). Owner: Pepe.
- First month close + formal reconciliation. Owner: Yulia + external accountant.

**Month 2 — First affiliate batch**
- First full cycle payouts to affiliates. Owner: Yulia.
- First formal monthly reconciliation presented to 3 principals. Owner: Yulia.

**Month 3 — First treasury board report**
- Q1 board report with state of treasury. Owner: Yulia + Diego.
- Quarterly crypto rebalance (first iteration). Owner: Diego + Yulia.

**Month 4-5 — Finance Manager hire**
- Job description published. Owner: Diego + Yulia.
- Shortlist + interviews. Owner: Yulia.
- Hire FM + onboarding. Owner: Yulia + FM.

**Month 6 — Operational FM**
- FM assumes daily treasury. Owner: FM + Yulia oversight.
- First quarter-end with FM in control. Owner: FM.

**Month 9 — Annual audit preparation**
- Pre-audit internal review. Owner: FM + Susana.
- Audit firm engagement letter signed. Owner: Diego.

**Month 10-11 — External audit**
- Auditor on-site in Dubai (or remote with docs). Owner: FM + Susana + Yulia.
- Findings review + remediation. Owner: Diego + Yulia.

**Month 12 — Close year 1 + plan year 2**
- Audit report signed. Owner: Diego + auditor.
- Year 1 financials published to board. Owner: FM + Yulia.
- Year 2 budget + treasury plan approved. Owner: principals.

</div>

---

## 9. `[DATA:]` placeholders — pending decisions

Consolidated list of all `[DATA:]` from this document. Diego and Yulia complete before go-live.

| ID | Data | Owner | Recommended deadline |
|---|---|---|---|
| D-01 | Primary Dubai bank (Mashreq / ADCB / ENBD) | Diego + Yulia | Week 1 |
| D-02 | Reserve bank (Swissquote / Dukascopy / VP Bank) | Diego | Week 2 |
| D-03 | Crypto custodian (Fireblocks / BitGo / Copper) | Diego + Yulia | Week 1 |
| D-04 | LP #1 confirmed | Diego + Pepe | Week 2 |
| D-05 | LP #2 confirmed | Diego + Pepe | Week 2 |
| D-06 | LP #3 confirmed | Diego + Pepe | Week 3 |
| D-07 | Part-time external accountant (PKF / Crowe / BDO) | Yulia | Week 2 |
| D-08 | Annual external auditor (Baker Tilly / BDO / Mazars / GT) | Diego + Yulia | Month 6 |
| D-09 | Finance Manager hire — job description + start date | Diego + Yulia | Job post Month 3, hire Month 5-6 |
| D-10 | Validated monthly burn rate Q2 2026 | Yulia | Month 2 |
| D-11 | Estimated deposits threshold month 6/12 post-launch | Yulia + Diego | Month 3 |
| D-12 | Primary + secondary PSP | Angel + Diego | Week 3 |
| D-13 | Gnosis Safe multisig — addresses of the 3 hardware wallets | Diego + Yulia + Stanislav | Week 2 |
| D-14 | Monthly board meeting cadence + recurring date | Principals | Week 4 |
| D-15 | Primary bank freeze contingency plan — separate doc | Yulia + Susana | Month 1 |

> [!TIP]
> Each resolved `[DATA:]` is replaced in this document with confirmed info and an entry is signed in `05-DECISIONES` Obsidian with type `treasury-decision`.

---

## 10. Executive next steps

Concrete actions Diego + Yulia execute this week and next.

### 10.1 This week (Week 1)

1. **Diego + Yulia:** call Mashreq Bank + ADCB to start corporate banking onboarding. Ask for docs list.
2. **Diego:** email to Fireblocks sales requesting proposal + internal Gnosis Safe setup.
3. **Yulia:** prepare corporate docs folder (COI, AML policy, KYC of the 4 principals, AOFA license copy, Anjouan registry proof).
4. **Pepe:** shortlist 3 LPs with requested term sheets.
5. **Angel:** confirm primary + secondary PSPs.

### 10.2 Week 2

1. Parallel onboarding Mashreq + ADCB + Swissquote.
2. Fireblocks onboarding kickoff.
3. Gnosis Safe deployment + 3 hardware wallets configured (Ledger / Trezor).
4. Internal test: transfer USD 100 end-to-end between wallets (Operating → Affiliate Payouts → external personal wallet → returned). Document times and fees.

### 10.3 Week 3-4

1. First real client test deposit + withdrawal (internal — Diego as test client).
2. LP margin funding first LP.
3. First end-to-end reconciliation documented.
4. Review of this document with closed `[DATA:]`, commit version 1.1.

### 10.4 Document governance

- **Ownership:** Yulia is operational owner, Diego is strategic owner.
- **Review:** quarterly minimum, or ad-hoc when a wallet / provider / threshold changes.
- **Versioning:** each revision bumps semver version (1.0 → 1.1 → 2.0 if structural change).
- **Access control:** this doc lives in `/content/en/executive/` with restricted access to the 4 principals + Head of Finance (when hired) + Susana (Compliance, read-only).

---

**Related documents:**
- [`panorama-ejecutivo.md`](/content/executive/panorama-ejecutivo) — macro broker view
- [`treasury-management.md`](/content/executive/treasury-management) — generic multi-wallet framework
- [`unit-economics-broker.md`](/content/executive/unit-economics-broker) — CAC/LTV/gross margin
- [`financial-controls.md`](/content/executive/financial-controls) — daily/weekly/monthly control system
- [`executive/ab-book-policy.md`](/content/executive/ab-book-policy) — hybrid A/B book policy
- [`compliance/expansion-regulatoria.md`](/content/compliance/expansion-regulatoria) — AOFA Anjouan regulatory requirements

---

**Last review:** April 13, 2026 — Claude (pre-launch preparation)
**Next mandatory review:** week of the first real deposit (Month 1)
