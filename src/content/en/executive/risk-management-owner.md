# Risk Management — Owner's View

**Strategic document — RESTRICTED ACCESS OWNERS**
**Neomaaa Ltd (IBC 15968) | AOFA License L15968/N**
**Audience:** Diego, Angel, Yulia, Stanislav
**Version:** 1.0 | Date: April 13, 2026
**Classification:** CONFIDENTIAL — exclusive use principals + Risk Committee

> [!DANGER]
> This document is the owner's consolidated risk view. It does not replace Pepe's (Head of Dealing) operational manual or Susana's (Compliance) framework. It complements both from the capital owner's perspective — which risks can destroy the company, how to measure them before they blow up, and what decisions only the principals make.

> [!INFO]
> **Purpose:** define the 8 structural risk types that NEOMAAA Ltd faces as a regulated broker, establish the formal risk register reviewed quarterly at Board, the 5 stress scenarios that must be planned before go-live, the group insurance policy, the owner's daily dashboard, the 5-step crisis playbook, the Risk Appetite Statement signed by the Board, and the 6 non-negotiable red lines. Cross-references: `executive/treasury-management.md`, `executive/financial-controls.md`, `executive/unit-economics-broker.md`, `compliance/*`.

---

## 1. Why an owner's Risk Framework exists

A retail broker lives by simultaneously managing three things: client money, market execution, and regulatory compliance. Any of the three, poorly managed, is terminal. The owner does not execute risk management day to day — that's done by Pepe, Susana and the future Head of Finance — but the owner is the one who signs the risk policy, approves limits, and takes responsibility when something blows up.

The history of the forex/CFDs industry is full of brokers that grew fast and died from a poorly dimensioned risk. Patterns repeat: a VIP client won an impossible-to-cover trade, a PSP froze $500K for 60 days, a regulator opened investigation and no one had the file, an employee moved money from Client Funds to Operating to "cover a temporary gap" that never came back. The owner informed in time has options. The owner informed late has liquidation.

This framework exists so that Diego, Angel, Yulia and Stanislav have the same risk picture at all times, with clear responsibilities, defined escalation, and quantitative limits that are not negotiated without collegiate decision.

---

## 2. The 8 main broker risk types

### 2.1 Liquidity Risk — not having cash to meet obligations

**What it is**
The inability to pay an approved withdrawal, an operation, a salary or a critical supplier at the required moment. It is not accounting insolvency — there may be enough capital on the balance sheet — it is lack of liquid cash in the correct account at the correct moment.

**How it manifests in a broker**
- Client requests $50K withdrawal, Client Funds has the balance but the PSP takes 7 days in settlement and the crypto wallet is in 48h lockup by internal policy.
- Payroll on the 5th requires $180K and Operating only has $90K because a PSP delayed weekly remittance.
- An LP asks for extra margin call due to volatility and the Margin wallet is below threshold.
- A simultaneous withdrawal spike due to social media rumor (bank run) exceeds the available withdrawal cushion.

**Key metrics**
- Daily cash ratio (available cash / next 7-day obligations) minimum 1.5x
- Reserves in months of OpEx (target 6 months minimum)
- Coverage of top 10 possible withdrawals (Client Funds ≥ top 10 client balances)
- Bank/PSP diversification (no >50% of flow in a single PSP)

**Mitigation**
- Client Funds segregated and untouchable (never used for ops, see `treasury-management.md`)
- Reserves minimum 6 months of fixed OpEx with no income
- Multi-bank: minimum 2 operational corporate banks in 2 jurisdictions
- Multi-PSP: minimum 3 PSPs with distributed volume
- Daily 7/30/90 day cashflow forecast (Yulia)
- Overflow wallet as cushion for extraordinary withdrawals
- Crypto rails as backup when fiat is delayed

**Risk owner:** Yulia (Principal Operations) with backup Diego.

---

### 2.2 Counterparty Risk — a counterparty fails

**What it is**
The risk that a critical provider (LP, bank, PSP, crypto custodian) fails to meet obligations, freezes funds, goes bankrupt, is sanctioned or is hacked. Brokers are a network of B2B relationships and any broken node breaks the chain.

**How it manifests**
- Primary LP announces bankruptcy protection (FX Primus 2019 case, Alpari UK 2015).
- Corporate bank closes the account without prior notice due to "risk policy change" (occurs routinely with offshore brokers).
- PSP freezes funds 60-90 days due to "investigation" (Stripe, PayPal, Paxum have history).
- Crypto custodian hacked (FTX 2022, Celsius 2022) or frozen by OFAC sanction.
- LP margin call impossible to cover in 24h.

**Key metrics**
- Concentration by counterparty: no >40% flow in 1 LP, no >50% deposits in 1 PSP
- Jurisdictional diversification (not everything in one jurisdiction/regulator)
- Exposed balance per counterparty in USD
- Internal tier rating of each counterparty

**Mitigation**
- Mandatory diversification: minimum 3 LPs, minimum 3 PSPs, minimum 2 banks
- Different jurisdictions (Dubai + Singapore + Europe for example)
- Annual background check on each counterparty (audits, news, credit rating if applicable)
- Contracts with short termination clause (30-90 days) to exit quickly
- Limits per counterparty reviewed quarterly at Board
- Relationship backup: 1 extra LP/PSP/bank in queue already legally onboarded even with 0% flow

**Owner:** Yulia (banks/PSPs) + Pepe (LPs).

> [!WARNING]
> Counterparty risk is the most underestimated risk in new brokers. 60% of brokers that went bankrupt in the last 10 years did so because of a single critical counterparty that failed and they had no functional backup.

---

### 2.3 Regulatory Risk — AOFA revokes, suspends or sanctions

**What it is**
The risk that the regulatory authority (in our case AOFA Anjouan) suspends, revokes, fines or conditions the broker's license. It is the most catastrophic risk because without license there is no business.

**How it manifests**
- Unforeseen regulatory audit detects material finding (commingling, weak KYC, unreported suspicious flow).
- Formal client complaint escalating to investigation.
- Regulator policy change invalidating current practices (e.g. sudden prohibition of a certain instrument).
- International sanction against complete jurisdiction (e.g. FATF pressure on Vanuatu 2020).
- Directors included in "fit & proper" review and one fails the background.

**Key metrics**
- Open compliance findings (target: 0)
- Days since last internal audit
- % of clients with appropriate KYC level (target 100%)
- SAR/STR filed and accepted by FIU
- Regulatory changes tracked and responded to in <30 days

**Mitigation**
- Compliance framework documented and operated by Susana (see `compliance/*`)
- Susana with backup (hire Compliance Junior when hit 500 KYC/month)
- Legal retainer with firm specialized in jurisdiction (Anjouan + client jurisdictions)
- Mandatory annual external audit
- Proactive relationship with AOFA (monthly reporting even if not required)
- Policy library updated at least quarterly
- Mandatory staff training (KYC/AML refresher semiannually)
- Regulatory change monitoring (FATF, IOSCO, client jurisdictions)

**Owner:** Susana (Compliance Officer), escalation Angel (CEO) + Diego.

---

### 2.4 Market Risk — B-Book exposure poorly covered

**What it is**
The risk that A-Book profitable clients earn more than the broker can cover with internal flow (when part of the flow is internalized). In a hybrid ECN/STP model like ours, part of the volume is B-Book by design.

**How it manifests**
- VIP client with breakout strategy wins $500K in a trade during macro event (NFP, FOMC, SNB 2015).
- Cluster of winning clients in same instrument in short time (EURCHF cap removal 2015 bankrupted many brokers).
- Overnight gap on index with uncovered B-Book net exposure.
- Hedging error: Pepe should have hedged but the bridge did not execute.

**Key metrics**
- Real-time net exposure per instrument in USD
- Daily / monthly B-Book P&L
- VaR (Value at Risk) portfolio
- Concentration per client (top 10 clients % of net exposure)
- Number of clients flagged A-Book vs B-Book

**Mitigation**
- Clear flow categorization policy (see `compliance/ab-book-policy.md`):
  - Consistently profitable clients → automatic A-Book (hedged with LP)
  - Small retail / non-systematic scalping → acceptable B-Book
  - High-volume VIP → mandatory A-Book with monitoring
- Automatic hedging by threshold (Pepe defines, system executes)
- B-Book exposure cap per instrument (e.g. max $2M net in EURUSD)
- Total B-Book exposure cap (e.g. max $X of reserves)
- Automatic stop-out when an instrument crosses threshold
- Daily Pepe + Diego review of open exposures
- News filter: before high-impact macro events, flatten B-Book or reduce size

**Owner:** Pepe (Head of Dealing) with Diego oversight.

---

### 2.5 Operational Risk — human errors, broken processes, internal fraud

**What it is**
Losses generated by internal process failures, human errors, internal fraud, or ineffective controls. It is the most pervasive risk because it affects all areas.

**How it manifests**
- Finance employee transfers $30K to the wrong PSP due to typo.
- Support agent refunds 100x the correct amount due to bad copy/paste.
- Employee steals by accessing shared credentials (internal fraud).
- KYC process executed inconsistently between analysts (findings in audit).
- Dev deploys during trading hours and breaks MT5 bridge.
- Someone publishes credentials on public GitHub.

**Key metrics**
- Operational incidents per month (target <2 material)
- % of formally documented processes (target >90%)
- Operational losses $ per month
- Internal audit findings per quarter
- Staff training completion %

**Mitigation**
- Mandatory dual signatures on transfers >$10K (see `financial-controls.md`)
- Complete audit trail on all systems (MT5, CRM, PSPs, banks)
- Segregation of duties: whoever executes does not approve, whoever approves does not reconcile
- Background checks on all staff with access to money or client data
- Credentials management (corporate 1Password, no shared passwords)
- Mandatory 2FA on every critical system
- Documented playbooks of critical processes (onboarding, withdrawal, hedging)
- Mandatory quarterly training
- Crime insurance (fidelity bond) when team >10 people
- Anonymous whistleblower channel

**Owner:** Yulia (operations + finance) + Angel (tech + HR).

---

### 2.6 Technology Risk — systems down, hacks, ransomware, data loss

**What it is**
The risk that technological infrastructure (MT5, CRM, web, client database, crypto wallets, bridges to LPs) fails, is compromised, or loses data.

**How it manifests**
- MT5 server goes down during Asia hours and clients cannot close positions → complaints + compensation + reputation.
- Ransomware attack encrypts CRM and client database → 72h unable to operate.
- Data breach exposes KYC of 40K clients → regulatory + legal + terminal reputation.
- DB corruption and 3-day-old backup → loss of trades, withdrawals, signups.
- DDoS attack during macro event prevents platform access.
- Insider deletes data before resigning.

**Key metrics**
- MT5 uptime (target 99.95% in market hours)
- Backup recovery time (RTO target <8h)
- Recovery point (RPO target <1h)
- Open pen test findings (target: 0 high/critical)
- Cybersecurity incidents per year

**Mitigation**
- AWS multi-region (or equivalent Azure/GCP) with automatic failover
- Daily encrypted backup in 3 locations (primary, secondary region, offsite cold)
- Automated backup verification (weekly restore test)
- Annual pen testing by reputable external firm
- Continuous vulnerability scanning (Snyk, Nessus, Qualys)
- WAF + DDoS protection (Cloudflare Enterprise)
- Network segmentation (MT5 server separate from CRM, wallets on dedicated machine)
- Least-privilege access (each role only strictly necessary accesses)
- Immutable audit logs with 7-year retention
- Incident response plan documented and tested (semiannual fire drill)
- Cyber insurance (see section 5)
- Emergency contingency plan (BCP/DRP) with defined RTO/RPO

**Owner:** Angel (interim CEO/CTO) until formal CTO is hired, then CTO.

---

### 2.7 Reputational Risk — viral "NEOMAAA is scam" thread

**What it is**
Brand damage that affects the ability to acquire and retain clients. In a low-trust industry like retail forex, reputation is a fragile and asymmetric asset (years to build, days to destroy).

**How it manifests**
- Dissatisfied client opens thread on ForexPeaceArmy, Forex Factory, r/Forex, Trustpilot with scam accusation.
- Trader influencer with 500K followers makes negative review on YouTube.
- Social media complaint goes viral in 48h.
- Competitor pays targeted negative campaign.
- Public regulatory case appears in media.
- Ex-staff employee spreads negative info on LinkedIn.

**Key metrics**
- Share of voice positive / negative / neutral
- Average rating on review sites (Trustpilot, FPA, Brokerage Reviews)
- Client NPS (target >40)
- Social mentions (volume + sentiment)
- Response time to public complaint (<2h business hours)

**Mitigation**
- Scalable and competent customer service (Intercom, 2h critical SLA, 24h normal SLA)
- Continuous brand monitoring (Mention, Brandwatch, Google Alerts) with real-time alerts
- Proactive community management (NEOMAAA staff presence in critical forums)
- Legal retainer for takedowns of false defamatory content
- Formal complaint handling process (see `legal/complaint-handling.md`)
- Real testimonials + visible audits + transparency in practices (dedicated page)
- Fast and professional response to every public complaint (never ignore, never attack)
- PR agency on retainer for crisis communication
- Internal social media policy (staff does not publish from personal accounts about NEOMAAA without approval)

**Owner:** Marketing Head (future) reporting to Diego.

---

### 2.8 Concentration Risk — excessive dependence on one point

**What it is**
Risk that the company depends disproportionately on a client, geographic market, acquisition channel, product, provider or key person. Concentration turns manageable risks into existential risks.

**How it manifests**
- 1 client = 30% of monthly volume → if they leave, revenue collapses.
- 70% of FTDs come from 1 country → local regulatory change destroys pipeline.
- 80% of marketing via Meta Ads → account ban = 0 leads.
- Angel the only one with MT5 admin credentials → bus factor 1.
- 1 affiliate generates 40% of leads → renegotiates terms or goes to competition.
- 100% crypto rails with 1 provider → provider sanctioned = 0 crypto.

**Key metrics**
- Top 10 clients % of revenue (target <25%)
- Top 3 countries % of FTDs (target <60%)
- Top marketing channel % of CAC spend (target <50%)
- People with single-point-of-failure knowledge
- Top 3 affiliates % of volume (target <40%)

**Mitigation**
- Explicit caps in KYC/onboarding if a client >X% of flow (exposure is reduced with size limits)
- Programmatic geographic diversification (see `escalamiento-y-crecimiento.md`)
- Multi-channel marketing with balance (Meta, Google, YouTube, Influencer, SEO, affiliates)
- Bus factor >1 in every critical role (documentation + deputy + cross-training)
- Affiliate diversification (formal partners program)
- Multi-provider in all critical infra
- Quarterly concentration review by category

**Owner:** Diego (strategic) + Yulia (operational).

---

## 3. Formal Risk Register

The Risk Register is the single document listing all identified risks, their likelihood, impact, score, owner, mitigation and status. Reviewed quarterly at Board. Any new identified risk is added. Any score >15 requires formal remediation plan.

**Scales:**
- **Likelihood:** 1 (very unlikely, <5% in 12m) — 2 (unlikely, 5-20%) — 3 (possible, 20-50%) — 4 (probable, 50-80%) — 5 (near certainty, >80%)
- **Impact:** 1 (loss <$10K, minor operational) — 2 (loss $10-50K) — 3 (loss $50-250K, affects quarter) — 4 (loss $250K-1M, affects year) — 5 (existential, license/bankruptcy/terminal reputational damage)
- **Score:** Likelihood × Impact (range 1-25)
- **Status:** Mitigated / Acceptable · Under remediation · Critical immediate action

### 3.1 Consolidated Risk Register NEOMAAA table

| # | Risk | L | I | Score | Owner | Main mitigation | Status |
|---|--------|---|---|-------|-------|---------------------|--------|
| 1 | Primary PSP freeze $500K for 60d | 3 | 5 | 15 | Yulia | Multi-PSP setup + reserves | Under remediation |
| 2 | VIP client wins $500K in one trade | 2 | 4 | 8 | Pepe | Hedge policy + B-Book cap | Mitigated |
| 3 | Unforeseen AOFA regulator audit | 2 | 5 | 10 | Susana | Compliance framework + legal retainer | Mitigated |
| 4 | Major cyber incident (ransomware) | 2 | 5 | 10 | Angel/CTO | Backups + pen testing + cyber insurance | Under remediation |
| 5 | Major market event (flash crash) | 1 | 5 | 5 | Diego | Reserves + stress testing + hedge | Mitigated |
| 6 | Primary LP goes bankrupt | 2 | 4 | 8 | Pepe | 3 LPs diversification + margin recovery clauses | Under remediation |
| 7 | Corp bank closes account without notice | 3 | 4 | 12 | Yulia | Multi-bank + backup jurisdictions | Under remediation |
| 8 | Viral scam accusation thread | 3 | 3 | 9 | Marketing | Brand monitoring + legal takedowns + PR | Under remediation |
| 9 | Key person leaves (Pepe/Susana/Angel) | 2 | 4 | 8 | Diego | Deputy + documentation + retention | Under remediation |
| 10 | Data breach KYC 40K clients | 2 | 5 | 10 | Angel/CTO | Encryption + pen test + segmentation | Under remediation |
| 11 | Internal fraud finance employee | 2 | 4 | 8 | Yulia | Dual sig + background + audit trail | Mitigated |
| 12 | Chargeback spike >2% | 2 | 3 | 6 | Support | Strict KYC + fraud detection + reserves | Mitigated |
| 13 | Concentration 1 client >20% vol | 3 | 3 | 9 | Diego | Cap single client + diversification | Under remediation |
| 14 | FATF/OFAC sanctions on Anjouan | 1 | 5 | 5 | Susana | Backup jurisdiction explored | Mitigated |
| 15 | Meta Ads ad account ban | 3 | 3 | 9 | Marketing | Multi-channel + backup accounts | Under remediation |
| 16 | Dev deletes prod database | 1 | 5 | 5 | Angel/CTO | Verified backups + least privilege | Mitigated |

**Review cadence:** quarterly at Board Meeting. Any material change in Score or status escalates to monthly meeting.

> [!TIP]
> Adding new risks is as important as mitigating existing ones. The Board must ask the question "what new risk appeared this quarter that wasn't there" in every review.

---

## 4. The 5 Stress Scenarios — mandatory planning

The Risk Register identifies, but Stress Testing simulates. Each scenario must have: trigger, expected timeline, quantified impact, response plan, estimated cost, pre-existing requirements.

### 4.1 Scenario A — PSP freeze $500K for 60 days

**Trigger**
The primary PSP (e.g. the LATAM processing provider that handles Pix + cards) freezes the corporate account citing "investigation" or "risk review". Inbound and outbound flow interrupted.

**Estimated timeline**
- T+0: freeze notification received
- T+0 to T+7: legal contact, initial negotiation
- T+7 to T+30: escalation, possible litigation, backup PSP in warm-up
- T+30 to T+60: partial or total resolution, possible recovery with penalty

**Quantified impact**
- 10-20% of Client Funds blocked 60 days
- Withdrawals delayed 7-15 days (until migration to backup PSP)
- Reputation affected if public
- Estimated legal cost $20-50K
- Additional churn 5-10% due to withdrawal friction

**Response plan**
1. Activate secondary backup PSP (activation <48h if pre-onboarded)
2. Proactive communication to affected clients (transparency, realistic timeline, alternative)
3. Legal team daily contact with PSP
4. Pause marketing in affected region until withdrawals normalize (avoids more FTDs with complicated withdrawal)
5. Use Reserves to accelerate critical withdrawals if necessary
6. Post-mortem and strategic decision on continuing with PSP or migrating permanently

**Estimated total cost:** $30-80K (legal + communication + compensations + retention campaigns).

**Pre-existing requirements**
- Minimum 2 functional PSPs with flow share (not one with 100% flow and another dormant)
- Reserves ≥ typical 30-day withdrawal amount
- Legal retainer pre-negotiated with <24h response time
- Comm template ready for "payment provider delay" situation

---

### 4.2 Scenario B — VIP client withdraws $1M in 1 day

**Trigger**
Client with significant balance ($1-2M) decides to withdraw everything simultaneously. Cause can be: strategy change, negative rumor about NEOMAAA, opportunity at another broker, personal emergency.

**Estimated timeline**
- T+0: withdrawal request received
- T+1-3: KYC/AML checks + source of funds verification if applicable
- T+3-7: execution via PSP or wire depending on amount
- T+7-10: complete settlement

**Quantified impact**
- Temporary liquidity stress
- Signal to rest of market if client speaks negatively
- Opportunity cost (that AUM no longer generates spread/commissions)
- Possible cascade if other VIP clients follow

**Response plan**
1. Confirm segregated Client Funds has immediate capacity (should always)
2. Route withdrawal via optimal channel (wire if >$500K, split if it makes sense, crypto if client prefers)
3. Contact client proactively: understand reason, offer executive relationship management, do not pressure retention
4. Post-withdrawal: survey / exit interview to learn
5. If pattern detected (other VIPs will follow), activate aggressive retention plan

**Estimated cost:** operational (~$0 if segregated OK), reputational (depends on client and their voice).

**Pre-existing requirements**
- Reserves rule: segregated Client Funds must be ≥ sum of top 10 client balances at all times (if a top 10 leaves, you don't leave the rest uncovered)
- Outgoing wire capacity in corporate bank (sufficient daily limits)
- "VIP retention" playbook ready for Account Management

---

### 4.3 Scenario C — AOFA suspends license 30 days

**Trigger**
AOFA regulator notifies temporary suspension (30 days) due to audit finding or escalated client complaint. During suspension: cannot onboard new clients, cannot operate (depending on scope of suspension).

**Estimated timeline**
- T-30: previous warning if audit was announced (in hostile cases there may be no warning)
- T+0: suspension notification
- T+0 to T+30: active suspension, remediation plan executing
- T+30 to T+60: lifting or extension based on compliance

**Quantified impact**
- Dead stop of business if total suspension
- Withdrawals can continue (clients leave en masse)
- Revenue 30 days = 0
- Legal + compliance consultants cost: $100K-500K
- Reputational cost: potentially terminal if public and viralizes
- Worst case: suspension → revocation → liquidation

**Response plan**
1. Activate AOFA-specialized legal team (pre-negotiated retainer) within 2h
2. Set up remediation plan with clear timeline (what to correct, when, who)
3. Communication to clients: transparent without panic (withdrawals safe, operations paused)
4. Internal communication: staff informed of what to do/not do
5. Emergency funding if Reserves insufficient to cover legal + opex 30 days
6. Plan B: evaluate license migration (Comoros, Seychelles, other offshore) in parallel if resolution extends
7. PR strategy: do not hide but do not viralize

**Estimated total cost:** $100K-1M+ depending on severity (includes legal, compliance consulting, staff idle, client retention, potential relicensing).

**Pre-existing requirements**
- Emergency fund separate from Operating (see `treasury-management.md`), minimum $300K available 48h
- Legal retainer with specialist firm in jurisdiction
- Backup jurisdiction explored (not necessarily onboarded but scenario evaluated)
- Client comm templates ready
- Staff awareness: what to say / not say externally

---

### 4.4 Scenario D — COVID-style macro event + 3x chargebacks

**Trigger**
Macro event like COVID-2020 or SVB-2023 that generates: extreme market volatility, clients under personal financial stress, chargeback/dispute spike, PSPs harden requirements, banks slow settlements.

**Estimated timeline**
- T+0 to T+7: initial shock, trading volume spike, chargebacks begin
- T+7 to T+30: chargebacks scale 3-5x baseline
- T+30 to T+90: PSPs ask for additional reserves, some suspend
- T+90+: new normal, gradual recovery

**Quantified impact**
- Chargeback rate rises from 0.5% to 1.5-2% (direct $ impact)
- PSP reserves rise (more cash immobilized)
- Churn 15-25% due to clients with financial problems
- Revenue may ↑ temporarily (volatility = more trading) but real balance negative
- Dispute management cost ↑

**Response plan**
1. Activate Reserves to cover chargebacks + PSP reserve demands
2. Tightened fraud detection (extra friction in rapid deposit-to-withdrawal flow)
3. Immediate negotiation with PSPs (show data, propose plan, do not wait for them to ask)
4. Slow marketing: reduce spend on low-quality channels (could raise chargeback rate)
5. Focus on existing clients (retention) vs new (CAC rises with friction)
6. Communication to staff: it is not the end, it is a cycle, focus on clean execution

**Estimated cost:** $200-500K between chargeback losses + PSP reserves + marketing inefficiency.

**Pre-existing requirements**
- Reserves 6 months OpEx minimum
- Chargeback detection tooling (Stripe Radar equiv, Sift, Forter)
- Multi-PSP to not depend on policies of a single one
- "Macro stress period" customer comms playbook

---

### 4.5 Scenario E — Dev team deletes MT5 database (catastrophic)

**Trigger**
Human error or malice: someone with access deletes the main MT5 database (clients, historical trades, balances). Can be: poorly executed deploy, rm -rf wrong env, automation script with bug, malicious insider.

**Estimated timeline**
- T+0: detection (hopefully instantaneous via monitoring)
- T+0 to T+8: restore from backup
- T+8 to T+24: verification and reconciliation
- T+24 to T+72: communication to clients + compensations if applicable

**Quantified impact**
- If backup OK and RTO <8h: medium impact, operations paused half day, annoyed clients, moderate compensation
- If backup unverified or corrupt: catastrophic. Potential unrecoverable data loss
- Regulatory: AOFA must be notified (reportable incident)
- Reputational: depends on public handling

**Response plan**
1. Detect → Containment: revoke all access, freeze changes immediately
2. Activate incident response team (Angel + senior dev + Yulia + Diego)
3. Restore from last verified backup (<1h back ideally)
4. Reconciliation: client balances vs backup vs PSP vs LP positions
5. Identify gap (trades between last backup and crash)
6. Compensate clients affected by gap (conservatively in client's favor)
7. Client and regulator communication
8. Public post-mortem and structural changes (what access changes, what process changes)

**Estimated cost:** $50-300K in compensations + legal + consulting. Can be existential if backups fail.

**Pre-existing requirements**
- **Daily verified offsite backups** (not just "daily backup" — verified with restore test at least weekly)
- RPO <1h, RTO <8h documented and tested
- Least privilege: no one has DROP DATABASE permission without double approval
- Read replica for queries, primary is not touched for analytics
- Change management with approval for any migration/deploy
- Immutable audit trail of who did what when

> [!DANGER]
> Scenario E is the only one of the 5 that can kill the company in hours if prerequisites fail. It is the one with lowest probability but highest absolute severity. The owner must personally verify quarterly that backups are being taken AND verified.

---

## 5. Insurance and financial hedging

Insurance in a broker covers specific risks where the premium is worth the cover. Not everything is contracted — what is contracted is what has material probability × material impact not absorbable by reserves.

### 5.1 Professional Indemnity (professional errors and omissions)

**Coverage**
Client claims for execution errors, advice (although NEOMAAA does not formally advise), margin miscalculation, regulatory reporting errors. Covers legal defense + settlement.

**Cost:** $5-20K/year for $1-5M cover.
**When to contract:** from go-live. Cheap for downside cover.
**Typical providers:** Lloyd's of London syndicates, AIG, Chubb, Hiscox (via broker specialized in financial services).

### 5.2 Cyber insurance

**Coverage**
Breach response (forensics, notification, legal), ransomware (covers payment or recovery costs per policy), business interruption due to cyber incident, extortion, regulatory fines derived from breach (per jurisdiction).

**Cost:** $3-10K/year for $1-5M cover (rises with dataset size and headcount).
**When to contract:** when hit 5K+ clients or before receiving first critical KYC audit.
**Providers:** Coalition, Chubb Cyber, Beazley, AIG.

**Typical prerequisites:** MFA implemented, verified backups, recent pen test, EDR on endpoints, documented policy.

### 5.3 D&O (Directors & Officers)

**Coverage**
Personal liability of directors (Diego, Angel, Yulia, Stanislav) for lawsuits derived from corporate decisions. Relevant if NEOMAAA operates with retail clients in multiple jurisdictions (any claim can name the director personally).

**Cost:** $5-15K/year for $1-3M cover.
**When to contract:** from incorporation. Very cheap to protect personal patrimony.
**Providers:** AIG, Chubb, Hiscox.

### 5.4 Crime / Fidelity Bond

**Coverage**
Internal employee fraud, fund theft, social engineering fraud (employee transfers to fraudster posing as CEO).

**Cost:** $2-8K/year for $500K-2M cover.
**When to contract:** when hit 10+ employees with access to money or payments.

### 5.5 Counterparty credit insurance (ISDA)

**Coverage**
LP or institutional counterparty default. It is complex (ISDA agreements), expensive, and typically not accessible until having significant volume ($50M+/mo).

**When to contract:** post-scale, with institutional flow. Year 3+.

### 5.6 Suggested policy-to-cover matrix year 1-3

| Insurance | Year 1 | Year 2 | Year 3 |
|-----------|-------|-------|-------|
| Professional Indemnity | Yes $1M | Yes $3M | Yes $5M |
| Cyber | Yes $1M | Yes $3M | Yes $5M |
| D&O | Yes $1M | Yes $2M | Yes $3M |
| Crime / Fidelity | Skip if <10 staff | Yes $500K | Yes $1M |
| Counterparty credit | No | No | Evaluate |

**Annual target insurance budget:** 0.5-1% of revenue (reasonable for retail broker).

**[DATA: Insurance providers contracted or to contract, insurance broker to use, negotiated premiums]**

---

## 6. Owner's daily dashboard — what Diego looks at every morning

The owner does not execute the business day-to-day but must have a single dashboard with the indicators that tell whether the business is healthy. 5 blocks, 10-minute reading, every morning before everything else.

### 6.1 The 5 balances

Amount updated as of previous day's close of the 5 wallets:
1. Client Funds (segregated) — must be ≥ client liabilities
2. Operating — must be ≥ 30 days next OpEx
3. Reserves — must be ≥ 6 months OpEx
4. Margin (parked with LPs) — current coverage vs B-Book exposure
5. Overflow / dividends pending — distributable balance

There must be a visual traffic light: green above target · yellow near floor · red below floor.

### 6.2 LP exposure

- Net exposure per instrument top 10
- Previous day B-Book P&L
- Margin utilization (actual / available)
- Alerts if anything crosses threshold

### 6.3 PSP health

- Last 7d processed volume per PSP
- Pending settlement balance per PSP
- Last 30d chargeback rate
- Any new PSP "reserve hold" or "review"
- Average settlement time last 7d

### 6.4 Compliance queue

- KYC pending count (and the oldest, SLA)
- Month's SAR/STR
- Queues escalated to Susana
- Next audit / reporting deadline
- Open findings from last audit

### 6.5 Red alerts

Free section where system flags anything deserving owner attention:
- Single withdrawal >$100K pending approval
- Client with suspicious pattern escalated by Compliance
- LP with margin call in last 24h
- PSP with abnormal delay
- VIP escalated ticket unresolved
- Any tech incident (MT5 downtime, breach attempt)

> [!TIP]
> This dashboard is built by Angel / future CTO and lives in a single panel that Diego opens every morning. It is not 5 tabs in 5 systems — it is a single screen. If it does not exist, Diego executes it manually with 5 short calls (Yulia for wallets, Pepe for LPs, Yulia for PSPs, Susana for compliance, on-call for alerts).

---

## 7. Executive Crisis Playbook — the 5 steps

When something blows up, there is no time to invent the process. The playbook is a fixed protocol that activates automatically and no one discusses at the moment of fire.

### 7.1 Step 1 — Containment (first hour)

**Objective:** stop the bleeding. Prevent the problem from escalating before understanding its size.

**Typical actions:**
- Identify the blast radius (which systems, which clients, which $)
- Revoke access if breach is suspected
- Freeze processes that can amplify (e.g. mass withdrawals, automated trades)
- Activate war room (physical or virtual) with the 3-5 key decision makers
- Notify principals within 30 minutes (Diego, Angel, Yulia, Stanislav)
- Designate a single Incident Commander (default: Diego, delegable to Angel)

**Output:** initial decision "is it tier 1, 2 or 3 crisis?"
- Tier 1: can cost the company (AOFA, mass breach, critical liquidity) → immediate Board + legal + PR escalation
- Tier 2: material but absorbable loss ($100K-1M) → response team, not total crisis
- Tier 3: operational, containable → operational team handles without escalation

### 7.2 Step 2 — Assessment (first 24 hours)

**Objective:** dimension the problem with data, not intuition.

**Actions:**
- Quantify potential loss (min/expected/max scenarios)
- Identify all affected stakeholders (clients, regulator, PSPs, LPs, staff, potential media)
- Legal team evaluates exposure
- Compliance evaluates reporting obligation (AOFA, FIU, others)
- Tech team evaluates fix timeline if applicable
- Comms team prepares message drafts (internal + client + regulator + media)

**Output:** consolidated 1-page document with: what happened, quantified impact, actions in execution, pending decisions, next update time.

### 7.3 Step 3 — Response (48 hours)

**Objective:** execute the remediation plan in a coordinated way.

**Actions:**
- Technical fix if applicable (with accelerated but not bypassed change management)
- Execute mandatory reporting to regulator (with legal review)
- Compensation to affected clients if applicable
- Renegotiation with counterparties (PSPs, LPs, banks) if the event affected them
- Preventive legal actions if there is external bad actor (takedowns, cease and desist)

### 7.4 Step 4 — Communication

**Objective:** control the narrative with transparency but without self-immolation.

**Crisis communication rules:**
- **Direct clients:** communicate before they find out from somewhere else. Factual, brief, what will happen to them specifically, channel for questions.
- **Regulator:** mandatory reporting within regulatory SLA (AOFA typically 72h material incidents). Mandatory legal review before sending.
- **Media (if public crisis):** designated single spokesperson (default Diego), agreed message, no improvisation. If necessary, PR agency on retainer.
- **Staff:** quick internal briefing (what they can say / cannot say). Avoids leaking rumors.
- **Social media:** quick official response, no public debate, redirect to private channel.

**DO NOT:**
- Total silence while clients speculate
- Defensive or combative responses in public
- Promises without being able to fulfill
- Blame employees or providers in public

### 7.5 Step 5 — Post-mortem (1 week)

**Objective:** that the same fire does not happen again.

**Actions:**
- Formal post-mortem meeting with all involved (48-72h after containment)
- Blameless culture (objective is to learn, not find culprits) but accountable (someone is owner of it not repeating)
- Root cause analysis (5 why's, do not stop at symptom)
- Concrete actions with owners and deadlines
- Risk Register update (does this risk have a new score?)
- Playbooks / policies update if applicable
- Presentation to Board at next monthly meeting

**[DATA: Specific NEOMAAA crisis escalation chain — call order, 24/7 phones, backup if primary does not respond, tier 1/2/3 criteria signed by Board]**

---

## 8. Risk Appetite Statement — for Board signature

The Risk Appetite Statement is the formal declaration of what risks the Board is willing to accept and under what conditions. Signed at Board Meeting, reviewed annually, and any material deviation requires collegiate decision.

### 8.1 What we accept

NEOMAAA Ltd accepts the following risks in pursuit of its commercial purpose:

- **Bounded market risk:** B-Book exposure within quantitative limits defined (see section 8.3).
- **Diversified counterparty risk:** exposure to LPs, PSPs and banks within concentration limits, with mandatory jurisdictional diversification.
- **Offshore jurisdiction regulatory risk:** we operate under AOFA L15968/N with active compliance commitment, assuming the offshore jurisdiction has different profile than Tier 1 (CySEC/FCA/ASIC).
- **Disciplined growth risk:** aggressive growth but with validated unit economics (LTV:CAC >3, payback <12m) and proportionally scaled compliance.
- **Controlled operational risk:** human errors will occur, we accept absorbable impact with dual controls (dual sig, segregation of duties, audit trail, recurring training).

### 8.2 What we reject

NEOMAAA Ltd does NOT accept:

- **Clients from restricted jurisdictions** (USA, OFAC sanctioned, FATF greylist without formally approved EDD, countries on internal prohibited list).
- **Non-verifiable source of funds** for high tier clients. Every deposit >$50K requires documented SoF.
- **Suspicious flow** exceeding detection thresholds without formal Compliance escalation.
- **Open compliance findings** more than 90 days without remediation plan executing.
- **Over-leverage** of client funds (never use client money to cover broker operations, no exception).
- **Single-source dependency** in critical infra (not 1 single PSP, not 1 single LP, not 1 single bank, not 1 single person with critical knowledge).
- **Commitments without reserves** (do not launch product/market without budget + reserve assigned).

### 8.3 Quantitative limits (the numbers that do not move without Board)

- **Max exposure single client:** ≤ 10% of total Client Funds
- **Max total B-Book net exposure:** [DATA: $ threshold to define, typical $5-20M by size]
- **Max B-Book exposure per instrument:** [DATA: $ per top liquidity instrument, typical $2-5M]
- **Reserves floor:** 6 months fixed OpEx minimum, never below this floor
- **Max chargeback rate:** 1.5% rolling 30d (above → escalation + fraud review)
- **Max PSP concentration:** ≤ 50% of flow in a single PSP
- **Max LP concentration:** ≤ 40% of flow in a single LP
- **Single bank concentration:** ≤ 60% of corporate cash in one bank
- **Max VaR portfolio:** [DATA: $ to define with Pepe]
- **Max margin utilization:** ≤ 70% of available margin with each LP

### 8.4 Approval

This Risk Appetite Statement must be signed (physically or digitally with traceability) by the 4 principals: Diego, Angel, Yulia, Stanislav. Annual review at January Board Meeting. Modifications require extraordinary Board meeting with quorum.

---

## 9. Red lines — the 6 we never cross

There are decisions that are not case-by-case analysis. They are absolute red lines. Crossing them is grounds for immediate termination of the responsible party (employee, director, partner) and, in serious cases, legal escalation.

### 9.1 Never use Client Funds to finance broker operations

Not one dollar, not one day, not with intention to return. Client Funds is economic property of the client. Commingling = license revocation + potential criminal. Includes: do not use to cover payroll, do not use to cover B-Book drawdown, do not use as collateral for corporate credits.

### 9.2 Never onboard client from restricted jurisdiction

Explicit list (USA, OFAC sanctioned, FATF greylist without approved EDD) is non-negotiable. It doesn't matter if they are a whale, it doesn't matter if they "pay more", it doesn't matter if they are referred by VIP. Onboarding them exposes the broker to multi-million regulatory fines and potential shutdown.

### 9.3 Never hide information from the regulator

In any reporting to AOFA (monthly, ad-hoc, response to audit), the information delivered is complete and precise. Omitting intentionally = regulatory fraud = criminal. If there is bad news, it is reported with context and remediation plan. It is never hidden.

### 9.4 Never give performance guarantees to clients

A retail broker does not guarantee returns. Phrases "earn X% safely", "you will recover your loss", "our system does not lose" are prohibited in all commercial communication. Massive legal exposure + client compliance. Mandatory training to sales on this.

### 9.5 Never compete with the client (inside info trading)

No one at NEOMAAA (directors, dealing, support, marketing) operates personal accounts based on information they see from client flow. Neither front-running, nor copy-trading known winners, nor using B-Book position for opportunism. Violates fiduciary duty and is criminal in multiple jurisdictions.

### 9.6 Never modify trades ex-post

Once a trade is executed in MT5 and recorded in ledger, NO ONE modifies it retroactively. Neither to "correct an error", nor to "adjust a spread", nor under pressure from VIP client. Ex-post modification = manipulation = guaranteed license revocation if detected. If there is a real error, compensate with a separate documented adjustment, but the original trade remains intact.

> [!DANGER]
> These 6 red lines are in the contract of every employee and director. Violating them is grounds for immediate termination + potential criminal report. They are not debated case-by-case. There are no "just this once" exceptions. The owner signs them and the staff signs them.

---

## 10. Review calendar and governance

| Cadence | Activity | Participants |
|---------|-----------|---------------|
| Daily | Owner dashboard (section 6) | Diego (consumption), Yulia/Pepe/Susana (input) |
| Weekly | Risk snapshot to Diego (10min bullets) | Yulia |
| Monthly | Risk Committee meeting | Diego, Pepe, Susana, Yulia, Angel |
| Quarterly | Risk Register review at Board | 4 principals + Pepe + Susana |
| Annual | Risk Appetite Statement re-sign + stress testing refresh | Board + external advisors |
| Ad-hoc | Crisis playbook activation | Per tier |

**[DATA: Specific 2026 calendar with concrete dates for each Risk Committee and Board Risk Review, signed by principals]**

---

## 11. Cross-references

- `executive/panorama-ejecutivo.md` — broker operational overview
- `executive/treasury-management.md` — multi-wallet architecture
- `executive/wallet-structure-neomaaa.md` — NEOMAAA specific implementation
- `executive/financial-controls.md` — day-to-day financial controls
- `executive/unit-economics-broker.md` — economic impact of risk decisions
- `executive/liquidity-providers-b2b.md` — LP management (counterparty risk)
- `executive/escalamiento-y-crecimiento.md` — growth risks
- `compliance/*` — operational compliance framework
- `legal/complaint-handling.md` — complaint handling (reputational risk)

---

## 12. Conclusion for the owner

Risk management is not a department. It is the owner's continuous discipline of seeing the 8 risks every day, accepting that some will happen, preparing the response before they happen, and ensuring that when they happen the team executes the protocol without improvising.

Brokers that survive 10 years are not the ones that did not have crises. They are the ones that had a playbook ready and sufficient reserves when the crisis arrived. The ones that die are the ones that trusted that "it won't happen to us" until it happened to them.

For Diego, Angel, Yulia and Stanislav: this document is the minimum floor of the framework. The ceiling is set by the discipline of reviewing it quarterly, updating it when something changes, and protecting it from the temptation to relax when the business is going well.

The worst time to read this document is when something has already blown up. The best time is every quarter, when nothing is happening.

---

*End of document. Version 1.0 — April 13, 2026. Next review: July 2026.*
