# Launch Day Runbook — NEOMAAA Markets

**Document:** Operational runbook for Go-Live
**Version:** 1.1
**Classification:** [INTERNAL USE ONLY]
**Last update:** April 2026
**Entity:** Neomaaa Ltd — **L15968/N AOFA Anjouan**
**Responsible:** Principals (Diego Loyola, Angel Ortega, Yulia, Stanislav)
**Required final approval:** Diego (CEO) + Angel (CCO) + Yulia (Ops) + Susana (Compliance) + Pepe (Dealing)

---

## Objective

This document defines the minute-by-minute plan for the public launch day of NEOMAAA Markets. Covers from day-before verifications (D-1) through first-week operations. Each team member must read, understand, and **confirm via Telegram** their comprehension of the document before launch.

Reference time zone: **UAE (GMT+4)** where HQ operates (Dubai). LATAM conversions (GMT-3) indicated when applicable.

---

> [!INFO]
> **Related documents (mandatory pre-launch reading):**
> - [Post-Launch Playbook](/content/en/launch/post-launch-playbook) — weeks 1-4
> - [Crisis Manual](/content/en/operations/manual-crisis)
> - [Deposits Manual](/content/en/operations/depositos)
> - [AOFA Compliance Calendar](/content/en/compliance/compliance-calendar)
> - [A/B Book Policy](/content/en/compliance/ab-book-policy)
> - [Financial Controls](/content/en/executive/financial-controls)
> - [Support Ticket Management](/content/en/support/gestion-tickets)

---

## War Room Team

| Role | Person | Responsibility | Primary channel | Backup |
|---|---|---|---|---|
| **Final Decision / Go-No Go** | **Diego Loyola** (CEO/Founder) | Go-live approval, critical decisions, crisis | Telegram + Phone `[DATA: Diego confirms personal emergency phone]` | Angel |
| **Co-founder / CCO / Strategic compliance** | **Angel Ortega** | Second in command, compliance strategy, external communication | Telegram + Phone `[DATA: Angel confirms phone]` | Diego |
| **Operations / PSPs / Reconciliation** | **Yulia** (Operations Director) | KYC Sumsub oversight, PSPs, withdrawals, liquidity | Telegram + Phone `[DATA: Yulia confirms phone]` | Stanislav |
| **Technology / MT5 / Infra** | **Stanislav** (Principal) | MT5 servers, LP connectivity, Equinix data centers, SSL, uptime | Telegram + Phone `[DATA: Stanislav confirms phone]` | Alex A |
| **Dealing / Execution** | **Pepe** (Head of Dealing, 20+ years) | MT5 Manager, risk flow, A/B Book, LPs hedging | Telegram DM | Stanislav |
| **Operational Compliance** | **Susana** (Compliance Officer) | KYC approvals, AML flags, AOFA notifications, regulatory complaints | Telegram DM + compliance@neomaaa.com | Angel |
| **Sales Lead + Head of Support interim** | **Edward** (Head of Sales) | Franco/Luis/Rocio/Marilyn coordination, Intercom supervision | Telegram + WhatsApp | Angel |
| **Sales Agents** | **Franco, Luis** | Contact first VIP leads, objections, closing | Telegram + Skale CRM | Edward |
| **Support L1 ES** | **Rocio** | Spanish Intercom chat, KYC support, deposits | Intercom + Telegram | Marilyn |
| **Support L1 ES/EN** | **Marilyn** | English Intercom chat + ES overflow | Intercom + Telegram | Rocio |
| **Dev Team** | **Alex A, Alex B** (primary dev) | Portal, API, Skale-MT5 integration | Telegram `#dev` | Stanislav |
| **Dev Team RU** | **Gleb, Dimitri** | Backend, Sumsub integrations, PSPs | Telegram `#dev` | Alex A |
| **Finance Manager** | `[DATA: To hire — Yulia interim cover]` | PSPs reconciliation, deposits/withdrawals | Telegram | Yulia |
| **Marketing** | `[DATA: Marketing Mgr to assign/freelance]` | Paid campaigns, social media, launch emails | Telegram | Angel |

**Primary coordination channel:** Telegram `#war-room-golive` (dedicated group)
**Principals escalation channel:** Telegram private group `#principals` (Diego + Angel + Yulia + Stanislav)
**Dealing channel:** Telegram `#dealing` (Pepe + Stanislav + dev)
**Support channel:** Telegram `#support` (Edward + Rocio + Marilyn)
**Decision authority:** **Diego has the final word.** In his absence: Angel. In the absence of both: Yulia. In the absence of all three: Stanislav.

---

## PHASE 1: Pre-Launch (D-1)

### Technology Verifications — Owner: Stanislav + Alex A/Alex B

| UAE Hour | Action | Tool / URL | Status | Owner |
|---|---|---|---|---|
| 09:00 | Verify MT5 servers operational | MT5 Admin — `[DATA: Stanislav confirms MT5 admin URL]` + Equinix DC monitoring | [ ] | Stanislav |
| 09:30 | Test demo + real account opening each type (Cent, Standard, Raw ECN) | Client Portal + Skale + MT5 Admin | [ ] | Alex A |
| 10:00 | Verify price feed connectivity with LPs (liquidity providers) | MT5 Admin > Feeders | [ ] | Pepe + Stanislav |
| 10:30 | Website online, SSL active, forms working | neomaaa.com + app.neomaaa.com | [ ] | Alex B |
| 11:00 | Complete flow: web form → Skale CRM → MT5 account created → Sumsub KYC triggered | End-to-end test with real account | [ ] | Alex A + Yulia |
| 11:30 | Intercom widget visible and functional | neomaaa.com homepage + app.neomaaa.com | [ ] | Edward |
| 12:00 | Support phone [DATA: official Dubai phone — Diego confirms] active and redirects | Test call | [ ] | Edward |
| 12:30 | Load test: simulate 50 simultaneous signups | Dev team script | [ ] | Gleb / Dimitri |
| 13:00 | Document issues found + resolution status | Notion `Work HQ > Launch > Issues Log D-1` | [ ] | Stanislav |

### PSPs and Finance Verifications — Owner: Yulia + Finance Manager

| UAE Hour | Action | Tool | Status | Owner |
|---|---|---|---|---|
| 09:00 | Confirm with each PSP (120+ deposit methods) they are ready for live | PSP account managers + dashboards | [ ] | Yulia |
| 10:00 | Test deposit $10 USD with 3+ main methods (card, crypto, wire) | Skale + PSP panels + MT5 | [ ] | Finance Mgr / Yulia |
| 11:00 | Test withdrawal $5 USD — complete flow | Skale + PSP | [ ] | Finance Mgr / Yulia |
| 12:00 | Test deposits correctly reflect in Skale CRM and MT5 | Skale ↔ MT5 sync check | [ ] | Yulia |
| 13:00 | Corporate account balances + operational liquidity | Bank statements + Fireblocks (target crypto custody) | [ ] | Yulia + Diego |

### KYC/Compliance Verifications — Owner: Susana + Angel

| UAE Hour | Action | Tool | Status | Owner |
|---|---|---|---|---|
| 09:00 | Sumsub configured and processing correctly | Sumsub dashboard | [ ] | Susana |
| 10:00 | Test KYC with test document (PEP check, sanctions screening, geo blocking) | Sumsub + Skale sync | [ ] | Susana |
| 11:00 | Legal docs published on site: Terms, Privacy, Risk Disclosure, AML Policy, Client Agreement | neomaaa.com/legal | [ ] | Susana + Angel |
| 12:00 | Signup form with AOFA L15968/N regulatory disclaimers + geo-blocking of restricted markets (USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan) | Signup portal | [ ] | Susana + Alex A |
| 12:30 | **Pre-launch AOFA notification sent** (if applicable to regulation) | Email regulator + copy legal@neomaaa.com | [ ] | Susana + Angel |
| 13:00 | Compliance calendar loaded with post-launch obligations | [Compliance Calendar](/content/en/compliance/compliance-calendar) | [ ] | Susana |

### Support Verifications — Owner: Edward

| UAE Hour | Action | Tool | Status | Owner |
|---|---|---|---|---|
| 14:00 | Rocio, Marilyn, Edward, Franco, Luis with access to Intercom + Skale + Sumsub read-only + MT5 support view | Login tests | [ ] | Edward |
| 14:30 | Distribute updated Internal FAQ + [Support Encyclopedia](/content/en/support/enciclopedia-soporte) | Broker portal + Telegram `#support` | [ ] | Edward |
| 15:00 | Response drill: each agent responds 3 test scenarios (KYC, deposit, MT5 login) | Intercom test workspace | [ ] | Edward |
| 15:30 | Launch day shift schedules confirmed | See [gestion-tickets](/content/en/support/gestion-tickets) chap 0 | [ ] | Edward |
| 16:00 | Intercom macros configured (greeting, KYC, deposit, withdrawal, escalation) | Intercom Settings > Macros | [ ] | Edward |

### Marketing Verifications — Owner: Marketing Manager (or Angel interim)

| UAE Hour | Action | Status | Owner |
|---|---|---|---|
| 14:00 | Paid media campaigns ready (DO NOT activate yet): Meta, TikTok, Google Ads | [ ] | Marketing |
| 15:00 | Landing pages online + tracking pixels (Meta, Google, TikTok) | [ ] | Marketing + Alex B |
| 16:00 | Social media posts prepared (DO NOT post): LinkedIn, Instagram @neomaaamarkets, Twitter, Telegram | [ ] | Marketing |
| 17:00 | Launch email ready to send to pre-registration list (~250 current registered) | [ ] | Marketing |

### Team Briefing — Owner: Diego

| UAE Hour | Action | Participants | Status |
|---|---|---|---|
| 18:00 | Full team video call (30 min): review plan, confirm roles, resolve doubts | All 16 | [ ] |
| 18:30 | Each person confirms via Telegram `#war-room-golive`: "Ready for tomorrow — [name]" | All | [ ] |
| 19:00 | **Diego makes GO / NO-GO decision** based on verification status. **Approval signed: Diego + Angel + Yulia + Susana + Pepe** (signed message in Telegram `#principals` + email to legal@neomaaa.com) | Principals + Pepe + Susana | [ ] |

**GO criteria:**
- [ ] All technology verifications completed (MT5, portal, site)
- [ ] Primary PSPs operational (minimum 3 methods successfully tested)
- [ ] Sumsub operational + test KYC approved
- [ ] Susana confirms AOFA L15968/N compliance in order
- [ ] Pepe confirms MT5 Admin + LPs connected
- [ ] Edward confirms support team ready
- [ ] **Digital signature (Telegram vote) from Diego, Angel, Yulia, Susana, Pepe**

**NO-GO criteria (any triggers postponement):**
- Critical MT5 failure
- Main PSPs not operational (<3 methods working)
- Sumsub not functional
- Website down or invalid SSL
- Unresolved compliance issue (especially geo-blocking of restricted markets)
- Absence of any mandatory signature

---

## PHASE 2: Launch Day (D-0)

### T-60 min: Final Verifications

| UAE Hour | Owner | Action |
|---|---|---|
| 08:00 | Stanislav | Quick verification MT5 servers, site, Skale CRM, Equinix DC |
| 08:10 | Yulia / Finance Mgr | Quick PSPs operational verification (dashboard quick check) |
| 08:20 | Susana | Quick Sumsub operational verification + geo-blocking active |
| 08:30 | Edward | Confirm Rocio + Marilyn online on Intercom, EN + ES shift covered |
| 08:40 | Marketing | Confirm campaigns and posts ready for activation |
| 08:50 | All | Confirm in `#war-room-golive`: "Ready — [role] — [name]" |

### T-0: Activation (09:00 UAE)

| UAE Hour | Owner | Action |
|---|---|---|
| **09:00** | **Diego** | **FINAL GO confirmed in `#war-room-golive`: "NEOMAAA Markets — GO LIVE"** |
| 09:01 | Stanislav + Alex A | Enable real account signup if disabled |
| 09:02 | Marketing | Activate paid media campaigns (Meta, TikTok, Google Ads) |
| 09:03 | Marketing | Publish launch announcement: LinkedIn, Instagram, Twitter, public Telegram |
| 09:05 | Marketing | Send launch email to pre-registration list (~250) |
| 09:10 | Edward | Confirm Intercom active mode + Rocio/Marilyn available |
| 09:15 | Diego | Post in `#war-room-golive`: "NEOMAAA Markets is LIVE. Week 1 target: 50-100 FTDs." |

### T+0 to T+2h: Intensive Monitoring (09:00 – 11:00 UAE)

| UAE Hour | Owner | Action |
|---|---|---|
| 09:00-11:00 | Stanislav | Monitor MT5 every 15 min: CPU, memory, active connections, LP latency |
| 09:00-11:00 | Pepe | Monitor MT5 Manager: first operations, flow, slippage |
| 09:00-11:00 | Edward | Monitor Intercom: FRT, chat volume, escalations |
| 09:15 | Stanislav / Alex A | Report in war-room: first signup received? Yes/No + Skale ID |
| 09:30 | Susana / Yulia | Report: first Sumsub KYC initiated? Yes/No |
| 09:45 | Yulia / Finance Mgr | Report: first deposit received? Yes/No + amount + PSP |
| 10:00 | **Diego** | **Check-in #1 in war-room:** general status, detected issues |
| 10:30 | Pepe / Stanislav | Report: first trading operation executed? Yes/No + instrument + size |
| 11:00 | Diego | Check-in #2: first 2 hours metrics |

**First 2 Hours Checklist (verify in war-room):**
- [ ] First Skale signup completed
- [ ] First Sumsub KYC approved
- [ ] First deposit processed + reflected in MT5
- [ ] First MT5 operation executed
- [ ] Support responding within SLA (<5 min chat)
- [ ] Zero critical platform errors
- [ ] Marketing campaigns running without errors (Meta/TikTok/Google)
- [ ] Website stable, no outages

---

## PHASE 3: First 24 Hours

### KPIs to Track (every 4 hours)

| Metric | Source | Reporting owner |
|---|---|---|
| Total signups | Skale CRM | Edward |
| KYCs initiated / approved / rejected | Sumsub dashboard | Susana |
| Deposits: count + total amount | Skale + PSP panels | Yulia / Finance Mgr |
| Withdrawals: count + total amount | Skale + PSP panels | Yulia / Finance Mgr |
| MT5 executed operations | MT5 Manager | Pepe |
| Intercom tickets: volume, FRT, CSAT | Intercom Reports | Edward |
| Platform / server errors | MT5 logs + Equinix monitoring | Stanislav |
| Web traffic: visits, bounce, conversion | Google Analytics | Marketing |
| Ad spend vs signups (preliminary CAC) | Ad platforms + Skale | Marketing |

### Escalation Plan

| Level | Trigger | Action | Decision |
|---|---|---|---|
| **L1 — Minor Incident** | Individual support ticket not resolved 30 min | Rocio/Marilyn escalates to Edward | Edward |
| **L2 — Operational Problem** | Multiple tickets same topic pattern | Edward notifies in `#war-room-golive` | Diego or Yulia |
| **L3 — Major Incident** | PSP not processing / MT5 execution errors / Sumsub down | Stanislav + Yulia + Pepe immediate diagnostic | Diego |
| **L4 — Critical** | Site down / MT5 inaccessible / security breach / AOFA regulatory issue | **Activate rollback protocol** (see PHASE 5) | **Diego (sole authority)** |

### First 24 Hours Communications

| UAE Hour | Action | Owner |
|---|---|---|
| 13:00 | Check-in #3: accumulated metrics, necessary adjustments | Diego |
| 17:00 | Check-in #4: UAE shift close, handoff to LATAM coverage (Rocio + Franco LATAM evening) | Diego + Edward |
| 21:00 | Check-in #5 (async): day summary in `#war-room-golive` | Diego |
| D+1 09:00 | Full team meeting: first 24h retrospective | All Principals + Heads |

---

## PHASE 4: First Week (D+1 to D+7)

See full detail in [Post-Launch Playbook — Week 1](/content/en/launch/post-launch-playbook#week-1--survival).

### Daily Standup

**Schedule:** 09:00 UAE / 02:00 ART (Buenos Aires) / 00:00 CST (Mexico). Adjusted per LATAM team.
**Duration:** 15 min max
**Channel:** Video call + written summary in `#war-room-golive`
**Facilitator:** Diego (or Angel if Diego not available)

**Standup Agenda:**

1. **Previous day metrics (2 min)** — Signups, KYCs, deposits, withdrawals, operations, FRT + CSAT Intercom, issues + status
2. **Active problems (5 min)** — What is broken, what needs immediate attention
3. **Day actions (5 min)** — What each person is doing today, blockers
4. **Decision items (3 min)** — Decisions only Principals can make

### Daily Report Template (Telegram `#war-room-golive` 21:00 UAE)

```
DAILY REPORT — NEOMAAA Markets
Date: [DD/MM/YYYY]  |  Operation day: [D+N]
Entity: Neomaaa Ltd L15968/N AOFA Anjouan

METRICS
- Signups today: [X] | Accumulated: [X]
- KYCs approved today: [X] | Accumulated: [X] | Pass rate: [X]%
- Deposits today: [X] x $[X] USD | Accumulated: [X] x $[X] USD
- Withdrawals today: [X] x $[X] USD | Accumulated: [X] x $[X] USD
- MT5 operations today: [X] | Volume lots: [X]
- Intercom tickets today: [X] | Average FRT: [X] min
- CSAT: [X]/5 | MT5 uptime: [X]%

ACTIVE ISSUES
1. [Description] — Status: [Open/In progress/Resolved] — Owner: [Name]

ACTIONS COMPLETED TODAY
1. [Action] — [Result]

PENDING ACTIONS FOR TOMORROW
1. [Action] — Owner: [Name]

NECESSARY DECISIONS (Principals)
1. [Topic] — Context — Recommendation: [X]

NOTES / DETECTED PATTERNS
[Observations — toxic flow detected, underperforming channel, etc.]
```

Archived in Notion `Work HQ NEOMAAA > Launch > Daily Reports`.

### Issues Log

Shared Google Sheets (owner Yulia):

| ID | Date | Description | Severity | Owner | Status | Resolution | Close Date |
|---|---|---|---|---|---|---|---|
| 001 | DD/MM | ... | Critical/Major/Minor | Name | Open/Resolved | ... | DD/MM |

---

## PHASE 5: Rollback Plan

This plan is activated **ONLY on Diego's decision** (or Angel in his absence) when a critical event occurs that puts clients, funds, or the AOFA L15968/N license at risk.

### Rollback Triggers

- **MT5 servers inaccessible >30 min without solution in sight** (trigger owner: Stanislav + Pepe)
- **Confirmed security breach** — unauthorized access to client data / funds (owner: Stanislav + Angel)
- **PSPs processing transactions incorrectly** — wrong amounts, duplicates, withdrawals to wrong accounts (owner: Yulia)
- **Regulatory issue requiring immediate suspension** — AOFA contact, cease & desist, sanction (owner: Susana + Angel)
- **Critical Skale CRM error** preventing tracking clients/transactions (owner: Alex A + Yulia)
- **Corporate fund leak / Fireblocks compromised** (owner: Yulia + Diego)

### Rollback Procedure

| Step | Action | Owner | Max Time |
|---|---|---|---|
| 1 | **Diego announces ROLLBACK** in `#war-room-golive` + `#principals` + group call | Diego | Immediate |
| 2 | Disable new client signup on site | Stanislav / Alex A | 5 min |
| 3 | Pause all paid media campaigns | Marketing | 10 min |
| 4 | Publish maintenance message on neomaaa.com + app.neomaaa.com | Alex B | 15 min |
| 5 | Notify registered clients via email: "scheduled maintenance, services temporarily limited" | Edward + Marketing | 30 min |
| 6 | PSP issue → suspend deposits/withdrawals + notify PSP account manager | Yulia / Finance Mgr | 15 min |
| 7 | MT5 issue → close trading access, document open client positions | Pepe + Stanislav | 15 min |
| 8 | Compliance/regulatory issue → **Susana notifies AOFA + legal@neomaaa.com** | Susana + Angel | <2h |
| 9 | Diagnose root problem | Relevant technical team | Variable |
| 10 | Implement solution + verify in staging environment | Dev team + Stanislav sign-off | Variable |
| 11 | **Diego decides re-activation** when problem is resolved and verified | Diego + Angel | Variable |

### Communication During Rollback

- **Internally:** updates every 30 min in `#war-room-golive`. Owner: Diego.
- **To clients:** every 2h via email (support@neomaaa.com) + social (@neomaaamarkets). Generic message without technical details. Owner: Edward + Marketing.
- **To PSPs:** direct notification if involved. Owner: Yulia.
- **To regulator (AOFA)** if applicable: Susana + Angel, copy to Diego.

### Rollback Emergency Contacts

| Person | Role | Primary Channel | Emergency Channel |
|---|---|---|---|
| Diego Loyola | CEO / Final decision | Telegram | Phone `[DATA: Diego confirms phone]` |
| Angel Ortega | CCO / Co-founder | Telegram | Phone `[DATA: Angel confirms phone]` |
| Yulia | Ops Director | Telegram | Phone `[DATA: Yulia confirms phone]` |
| Stanislav | Tech Principal | Telegram | Phone `[DATA: Stanislav confirms phone]` |
| Pepe | Head of Dealing | Telegram DM | `[DATA: Pepe confirms phone]` |
| Susana | Compliance | Telegram DM + compliance@neomaaa.com | `[DATA: Susana confirms phone]` |
| Edward | Head of Sales | Telegram + WhatsApp | `[DATA: Edward confirms phone]` |

### Post-Rollback

1. Fully document incident: root cause, timeline, actions, resolution. Notion `Work HQ > Crisis Log`.
2. **Post-mortem <24h** with involved team. Owner: Angel facilitates.
3. Update this runbook with lessons learned.
4. Verify no client was financially affected; if so, resolve immediately and notify Susana (regulatory report).

---

## Consolidated Timeline — Launch Day

| UAE Hour | Phase | Action | Owner |
|---|---|---|---|
| D-1 09:00 | Pre-launch | Start of technology verifications | Stanislav + Alex A |
| D-1 09:00 | Pre-launch | Start of PSP verifications | Yulia / Finance Mgr |
| D-1 09:00 | Pre-launch | Start of compliance verifications | Susana |
| D-1 14:00 | Pre-launch | Start of support verifications | Edward |
| D-1 14:00 | Pre-launch | Start of marketing verifications | Marketing |
| D-1 18:00 | Pre-launch | General team briefing (16 people) | Diego |
| **D-1 19:00** | **Pre-launch** | **GO/NO-GO decision + signatures Diego + Angel + Yulia + Susana + Pepe** | **Principals** |
| D-0 08:00 | Go-Live | Quick final verifications | All |
| D-0 08:50 | Go-Live | "Ready" confirmation each team | All |
| **D-0 09:00** | **Go-Live** | **FINAL GO confirmed — NEOMAAA Markets LIVE** | **Diego** |
| D-0 09:01 | Go-Live | Signup enabled | Stanislav + Alex A |
| D-0 09:02 | Go-Live | Campaigns activated (Meta/TikTok/Google) | Marketing |
| D-0 09:03 | Go-Live | Social announcement (LinkedIn/IG/Twitter/Telegram) | Marketing |
| D-0 09:05 | Go-Live | Launch email to pre-registration | Marketing |
| D-0 09:10 | Go-Live | Support active mode (Rocio + Marilyn) | Edward |
| D-0 09:15 | Monitoring | First signup verified? | Stanislav / Alex A |
| D-0 09:30 | Monitoring | First KYC verified? | Susana |
| D-0 09:45 | Monitoring | First deposit verified? | Yulia |
| D-0 10:00 | Monitoring | Check-in #1 | Diego |
| D-0 10:30 | Monitoring | First operation verified? | Pepe |
| D-0 11:00 | Monitoring | Check-in #2: first 2h metrics | Diego |
| D-0 13:00 | Monitoring | Check-in #3: accumulated metrics | Diego |
| D-0 17:00 | Monitoring | Check-in #4: UAE shift close | Diego + Edward |
| D-0 21:00 | Monitoring | Async check-in #5: day summary | Diego |
| D+1 09:00 | Retrospective | Team meeting: first 24h | All |
| D+1 to D+7 | First week | Daily standups 09:00 UAE | Diego |
| D+7 16:00 | Week 1 close | First formal retro — see [Post-Launch Playbook](/content/en/launch/post-launch-playbook) | All Principals + Heads |

---

## Pre-Launch Master Checklist (6 Weeks to Go-Live)

> This is the complete checklist of requirements to meet from T-6 weeks to D-1. Complements (does not replace) the D-1 verifications described in PHASE 1 of this runbook. Blocks 1-5 must be 100% complete before the GO/NO-GO decision.

### Block 1: Fundamentals (Weeks 1-2)
*Without this, nothing else can proceed.*

- [ ] **A-Book / B-Book policy documented** (Pepe) — % B-Book, A-Book pass thresholds, toxic flow treatment, hedging policy. See [ab-book-policy](/content/en/compliance/ab-book-policy).
- [ ] **Commission scheme closed** — approved by Principals. See [commissions](/content/en/sales/commissions).
- [ ] **Confirmed active PSPs** — final list of processors live day 1. Minimum: 1 crypto (USDT), 1 card, 1 LATAM local transfer (PIX/PSE/SPEI).
- [ ] **Skale CRM configured** — custom fields: account type, FTD date/amount, total deposits, last deposit, KYC status, assigned agent, lead source.
- [ ] **Intercom configured** — support workflows, auto-responses, hours, ES/EN routing. See [support/playbook](/content/en/support/playbook).
- [ ] **Sumsub flows finalized** — broker KYC flow (different from prop), documents accepted per country, verification thresholds.

### Block 2: Training (Weeks 2-6)
*Executed in parallel with block 1.*

- [ ] **Sales Training week 1/6** completed (Basic broker product)
- [ ] **Sales Training week 2/6** completed (MT5 hands-on)
- [ ] **Sales Training week 3/6** completed (Compliance + what NOT to say)
- [ ] **Sales Training week 4/6** completed (Pitch + objections)
- [ ] **Sales Training week 5/6** completed (CRM + operational flow)
- [ ] **Sales Training week 6/6** completed (Simulations + exam)
- [ ] **Susana training** completed (Compliance broker vs prop)
- [ ] **Support Agents training** completed (Intercom + flows)

See full detail: [sales/training](/content/en/sales/training).

### Block 3: Operational Documents (Weeks 3-5)

- [ ] **Sales Playbook** finalized — scripts, objections, pitch, KPIs. See [sales/training](/content/en/sales/training).
- [ ] **Compliance Manual** finalized — KYC/AML, prohibited phrases, escalations. See [compliance/workflow](/content/en/compliance/workflow).
- [ ] **Support Playbook** finalized — canned answers, escalations, SLAs. See [support/playbook](/content/en/support/playbook).
- [ ] **Client Onboarding Flow** documented. See [compliance/onboarding](/content/en/compliance/onboarding).
- [ ] **Deposit/Withdrawal Process** documented. See [operations/deposits](/content/en/operations/deposits).
- [ ] **Internal FAQ** for Support + Sales. See [operations/faq-interno](/content/en/operations/faq-interno).

### Block 4: Critical Hiring (Weeks 1-4)

- [ ] **Finance Manager hired** — PRIORITY #1. Without them, the broker operates blind.
- [ ] **Support Agent #1 hired** (LATAM, Spanish) — Rocio
- [ ] **Support Agent #2 hired** (MENA/Africa/Asia, English — does NOT attend EEA/UK: restricted jurisdictions) — Marilyn
- [ ] **Marketing Manager** — hire vs freelance decision made and executed

### Block 5: Pre-Live Testing (Week 5-6)
*Nothing goes to production without testing.*

- [ ] **End-to-end test of complete flow**: Signup → KYC → Deposit → Open trade → Close trade → Withdrawal
- [ ] **Test each PSP** with real transaction (deposit + withdrawal)
- [ ] **Intercom test** — test ticket travels the full escalation flow
- [ ] **CRM test** — lead enters, gets assigned, is tracked to FTD
- [ ] **Sales call simulation** — each agent makes 3 mock calls evaluated
- [ ] **KYC simulation** — Susana processes 10 test KYCs with different scenarios (approved, retry, rejected)
- [ ] **Basic load test** of MT5 platform + client portal

### Visual schedule (6 weeks to Go-Live)

```
Week 1  |==FUNDAMENTALS==|  |==HIRING==|  |=SALES TRAINING W1=|
Week 2  |==FUNDAMENTALS==|  |==HIRING==|  |=SALES TRAINING W2=|  |=SUSANA TRAINING=|
Week 3  |===OPS DOCS=====|  |==HIRING==|  |=SALES TRAINING W3=|  |=SUSANA TRAINING=|
Week 4  |===OPS DOCS=====|  |==HIRING==|  |=SALES TRAINING W4=|  |=SUPPORT TRAINING=|
Week 5  |===TESTING======|              |=SALES TRAINING W5=|  |=SUPPORT TRAINING=|
Week 6  |===TESTING======|  |GO-LIVE|  |=SALES TRAINING W6=|
```

---

## Block 6: Final Signatures Checklist (D-1 19:00 UAE)

The detailed operational verifications are in PHASE 1 of this runbook (technology, PSPs, compliance, support, marketing). This block is the **final signature** of the owners after verifying that blocks 1-5 are complete.

- [ ] **Diego Loyola** (CEO) — Final go-live approval
- [ ] **Angel Ortega** (CCO) — Compliance + strategy sign-off
- [ ] **Yulia** (Ops Director) — PSPs + reconciliation + liquidity sign-off
- [ ] **Susana** (Compliance Officer) — AOFA L15968/N compliance + Sumsub + geo-blocking active
- [ ] **Pepe** (Head of Dealing) — MT5 + LPs + A/B Book + hedging sign-off
- [ ] **Stanislav** (Principal Tech) — Infra + Equinix + MT5 uptime sign-off
- [ ] **Edward** (Head of Sales/Support) — Team ready + Intercom configured

**Without all 7 signatures in Telegram `#principals` before 19:00 UAE D-1, launch is postponed.**

---

## Emergency Contacts

| Person | Role | Phone | Email | Availability |
|---|---|---|---|---|
| Diego | CEO / Final Decision | `[DATA: Diego confirms]` | diego@neomaaa.com | 24/7 Go-Live week |
| Angel | CCO / Co-founder | `[DATA: Angel confirms]` | angel@neomaaa.com | 24/7 Go-Live week |
| Yulia | Operations Director | `[DATA: Yulia confirms]` | yulia@neomaaa.com | 24/7 Go-Live week |
| Stanislav | Principal / Tech | `[DATA: Stanislav confirms]` | stanislav@neomaaa.com | 24/7 Go-Live week |
| Pepe | Head of Dealing | `[DATA: Pepe confirms]` | pepe@neomaaa.com | Market open + on-call |
| Susana | Compliance Officer | `[DATA: Susana confirms]` | compliance@neomaaa.com | Business hours + critical on-call |
| Edward | Head of Sales/Support | `[DATA: Edward confirms]` | edward@neomaaa.com | Extended business hours |
| **General Support** | NEOMAAA Markets | **[DATA: official Dubai phone — Diego confirms]** | **support@neomaaa.com** | Support hours |
| **Legal** | — | — | **legal@neomaaa.com** | Email 24/7 |
| **Compliance** | — | — | **compliance@neomaaa.com** | Email 24/7 |

---

*Internal document of Neomaaa Ltd — AOFA L15968/N Anjouan License.*
*Must be reviewed and approved by the 4 Principals + Susana + Pepe before launch.*
*Each team member must confirm via Telegram `#war-room-golive` that they have read and understood it.*
*Next revision: post-launch review D+7 (owner: Angel).*
