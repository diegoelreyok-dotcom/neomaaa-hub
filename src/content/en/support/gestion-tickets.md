# Ticket Management Workflow — NEOMAAA Markets

**Internal document — Support Team**
**Version:** 1.1
**Last updated:** April 2026
**Tools:** Intercom (primary client channel) + Skale (client CRM view) + Sumsub (KYC) + MT5 Manager (trading)
**Applies to:** Rocio, Marilyn (support L1), Edward (Head of Sales acting as interim Head of Support), escalation to Susana (Compliance), Pepe (Dealing), Diego (CEO)
**Entity:** Neomaaa Ltd — L15968/N AOFA Anjouan

---

> [!INFO]
> **Related documents (mandatory reading on day one):**
> - [Support Playbook](/content/en/support/playbook) — full response templates, tones by language, Intercom macros
> - [Support Encyclopedia](/content/en/support/enciclopedia-soporte) — knowledge base (deposits, withdrawals, MT5, KYC)
> - [Deposits Manual](/content/en/operations/depositos) — PSPs, flows, troubleshooting
> - [Operations Internal FAQ](/content/en/operations/faq-interno) — 87 team-resolved questions
> - [Crisis Manual](/content/en/operations/manual-crisis) — protocol when normal escalation doesn't apply

---

## TABLE OF CONTENTS

1. [Team Roster and Responsibilities](#0-team-roster-and-responsibilities)
2. [Ticket Lifecycle](#1-ticket-lifecycle)
3. [Creation and Classification](#2-creation-and-classification)
4. [Assignment](#3-assignment)
5. [Active Ticket Management](#4-active-ticket-management)
6. [Escalation](#5-escalation)
7. [Resolution](#6-resolution)
8. [Closure and Follow-up](#7-closure-and-follow-up)
9. [Satisfaction Survey](#8-satisfaction-survey)
10. [Queue Management and Prioritization](#9-queue-management-and-prioritization)
11. [Reports and Metrics](#10-reports-and-metrics)
12. [Ticket Hygiene](#11-ticket-hygiene)
13. [Agent Checklist (Day One + daily)](#12-agent-checklist)

---

## 0. Team Roster and Responsibilities

**NEOMAAA Markets — 16 people. Support team and immediate escalation:**

| Name | Role | Support Responsibility | Priority contact |
|---|---|---|---|
| **Rocio** | Support L1 — ES | Spanish tickets (LATAM / Spain), first contact, Intercom macros | Intercom + Telegram |
| **Marilyn** | Support L1 — ES/EN | Spanish + English tickets, broad hours coverage | Intercom + Telegram |
| **Edward** | Head of Sales (acting as interim Head of Support) | Supervision, L2 escalation, CSAT <4 review, complaint ticketing | Telegram + WhatsApp |
| **Susana** | Compliance Officer | L2 compliance: complex KYC rejections, AML flags, regulatory complaints | Telegram DM + compliance@neomaaa.com |
| **Pepe** | Head of Dealing | L2 dealing: MT5 execution, slippage, requotes, spread disputes, swap | Telegram DM |
| **Yulia** | Operations Director | L2 operations: PSPs, stuck withdrawals, reconciliations | Telegram DM |
| **Franco, Luis** | Sales Agents | Escalation for sales/VIP upgrade tickets | Telegram |
| **Alex A, Alex B, Gleb, Dimitri** | Dev Team | L3 real bugs (portal, API, integrations) | Telegram #dev |
| **Angel Ortega** | Co-founder, CCO | Critical escalation, VIP account decisions | Telegram DM |
| **Diego Loyola** | Founder & CEO | Final escalation (public complaint, crisis, regulator threat) | Telegram + phone `[DATA: Diego to confirm number for internal roster]` |

**Supported markets:** LATAM (excluding USA/Canada), CIS with screening, MENA (excluding Iraq), Asia (phase 2), Africa (excluding Sudan).
**We do NOT accept:** USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan. If a ticket arrives from these markets → respond with "no service" template + close + tag `restricted-geo`.

**Coverage hours (target):**

| Shift | Hours (UAE / GMT+4) | LATAM time (GMT-3) | Primary agent |
|---|---|---|---|
| Shift 1 — LATAM morning | 14:00–22:00 UAE | 07:00–15:00 ART | Rocio |
| Shift 2 — EU/ME + LATAM afternoon | 10:00–18:00 UAE | 03:00–11:00 ART | Marilyn |
| Shift 3 — Asia + EU morning | 04:00–12:00 UAE | `[DATA: Edward defines Asia phase 2 rotation]` | `[DATA: to be hired — Asia hiring]` |

Weekend coverage: rotating on-call Rocio/Marilyn, SLA relaxed to <30min chat / <6h email. Financial emergencies: escalate directly to Yulia.

---

## 1. Ticket Lifecycle

### 1.1 Ticket States

Every ticket in Intercom goes through the following states:

```
NEW → IN PROGRESS → WAITING → ESCALATED → RESOLVED → CLOSED
 (1)      (2)         (3)         (4)        (5)        (6)
```

| State | Definition | Who Controls It | Maximum Time in This State |
|--------|-----------|-------------------|------------------------------|
| **New** | Ticket recently created in Intercom, unassigned or without response | System / Agent | First response SLA (see 1.3) |
| **In progress** | Agent actively working | Assigned agent | Per resolution SLA by priority |
| **Waiting on client** | Agent responded, waiting for client info | Agent | 48h before reminder |
| **Waiting internal** | Agent waiting for L2 response (Susana/Pepe/Yulia/Dev) | Agent + L2 | 2h (urgent) / 4h (high) / 24h (medium) |
| **Escalated** | Transferred to Edward or directly to L2 | Edward / L2 | Per priority, see matrix 5.3 |
| **Resolved** | Issue solved, awaiting client confirmation | Agent | 48h before closing |
| **Closed** | Client confirmed or 96h timeout | System / Agent | Permanent |

### 1.2 Visual Flow

```
Client sends message via Intercom / email support@neomaaa.com / WhatsApp
        |
        v
[NEW] Ticket created in Intercom (auto-sync with Skale via contact email)
        |
        v
Automatic routing by language (lang:es → Rocio; lang:en → Marilyn)
        |
        v
Agent opens ticket → reviews contact in Skale (history, balance, Sumsub KYC status)
        |
        v
[IN PROGRESS]
        |
        +--→ Direct resolution with macro? YES → respond → [RESOLVED] → 48h → [CLOSED]
        |
        +--→ Needs client info? → [WAITING CLIENT] (48h timeout)
        |
        +--→ Needs internal info? → tag L2 via Telegram DM → [WAITING INTERNAL]
        |
        +--→ Beyond L1 scope? → [ESCALATED] to Edward/Susana/Pepe per matrix
```

### 1.3 SLAs by channel and priority (NEOMAAA TARGET)

| Channel | Priority | First Response Time (FRT) | Full Resolution Time (FRT) |
|---|---|---|---|
| **Intercom chat** (logged-in client) | Urgent | **<5 min** | <2h |
| Intercom chat | High | <10 min | <8h |
| Intercom chat | Medium | <30 min | <24h |
| Intercom chat | Low | <1h | <48h |
| **Email** (support@neomaaa.com) | Urgent | **<30 min** | <4h |
| Email | High | **<2h** | <12h |
| Email | Medium | <6h | <48h |
| Email | Low | <24h | <72h |
| **WhatsApp** (informal support) | Any | <15 min business hours | Triage → move to Intercom |

**Monthly global target metric:** Chat FRT average <5 min, email <2h, CSAT >85%, tickets/active client <0.5.

---

## 2. Creation and Classification

### 2.1 How a Ticket Is Created

| Source | Creation | Automatic Tag |
|--------|----------|---------------|
| Live chat (Intercom Messenger on app.neomaaa.com / neomaaa.com) | Automatic | `source:chat` |
| Email to support@neomaaa.com | Automatic (Intercom captures) | `source:email` |
| Email to compliance@neomaaa.com | Manual (forwarded by Susana to Intercom) | `source:compliance` |
| Web contact form | Automatic | `source:web-form` |
| WhatsApp Business NEOMAAA (agent creates) | Manual | `source:whatsapp` |
| Telegram group/DM (agent creates) | Manual | `source:telegram` |

### 2.2 Immediate Classification (first 2 min)

1. **Read full message + review contact in Skale** (balance, Sumsub KYC status, associated MT5 accounts, ticket history)
2. **Assign mandatory tags:**
   - **Type (Intercom custom tags):** `kyc`, `deposit`, `withdrawal`, `mt5-login`, `mt5-execution`, `mt5-ea`, `account-type`, `leverage-change`, `spread-issue`, `swap`, `bonus`, `ib-partner`, `complaint`, `pre-registration`
   - **Priority:** `priority:urgent` / `priority:high` / `priority:medium` / `priority:low`
   - **Language:** `lang:es` / `lang:en` / `lang:ru` / `lang:pt`
   - **Market:** `market:latam` / `market:es` / `market:mena` / `market:cis` / `market:asia`
3. **Check VIP:** `vip_tier` custom attribute in Intercom (Gold = $10k+ cumulative, Platinum = $50k+ monthly). VIP → assign to Edward directly.
4. **Review history:** search previous tickets for contact.email in Intercom + notes in Skale.

### 2.3 Priority Criteria (NEOMAAA Quick Reference)

| Priority | Criterion | Typical NEOMAAA example | SLA FRT |
|-----------|----------|------------------------|---------|
| **Urgent** | Money at risk NOW or critical compliance | Deposit >24h not credited / client can't close MT5 position / suspected fraud / client threatens regulator | <5 min chat |
| **High** | Prevents trading | Sumsub KYC rejected / MT5 won't connect / withdrawal >48h stuck / spread-off error | <10 min chat |
| **Medium** | Operable friction | Question about PSPs / leverage change / swap inquiry | <30 min chat |
| **Low** | Informational / pre-sale | Market hours / account types / pre-registration | <1h chat |

---

## 3. Assignment

### 3.1 Automatic Assignment Rules (Intercom Workflow)

| Condition | Assignment |
|-----------|-----------|
| `lang:es` | Rocio (LATAM shift) / Marilyn (EU-overlap shift) |
| `lang:en` | Marilyn |
| `lang:ru` | `[DATA: Gleb or Dimitri dev triage → passthrough to Marilyn with translation]` |
| `lang:pt` (Brazil) | Rocio with Marilyn fallback |
| VIP Gold/Platinum | Edward (direct, skip L1) |
| Formal complaint (`tag:complaint`) | Edward + copy Susana |
| `tag:kyc` with repeated rejection | Susana (direct) |
| Outside coverage hours | Queue → first agent of next shift handles |

### 3.2 Manual Reassignment

**When to reassign:**
- Original agent can't resolve + specific knowledge from another agent required
- Shift handoff (see protocol in [Support Playbook](/content/en/support/playbook))
- Client asks to speak with someone else → always respect it
- L2 or Edward escalation

**Process:**
1. Add internal note in Intercom with summary + link to Skale contact
2. Change "Assignee" in Intercom
3. Notify new agent via Telegram DM: `@name ticket [link] - 1-line summary - action required`
4. Inform client: "I'm transferring you to [name], specialist in [area]. Your case number remains #[Intercom ID]."

### 3.3 Unassigned Tickets at Start of Shift

**First 15 min of shift protocol (Rocio/Marilyn):**
1. Intercom Inbox → filter "Unassigned"
2. Sort by `created_at asc` (oldest first)
3. Filter `priority:urgent` first → respond within <10 min
4. Self-assign those of the corresponding language
5. Any unassigned urgent >15 min → alert Edward via Telegram

---

## 4. Active Ticket Management

### 4.1 First Response (the most critical — defines CSAT)

**First response checklist:**
- [ ] Greeting with client's name (Intercom shows name from Skale sync)
- [ ] Confirm understanding (paraphrase if complex)
- [ ] Give direct answer or state I'm investigating
- [ ] If investigating: give concrete estimated time ("I'll confirm in 15 min" / "before 18:00 UAE")
- [ ] Ask if there's anything else

**NEVER respond without:**
- Having opened the profile in Skale
- Having reviewed KYC status in Sumsub (if the ticket warrants it)
- Having verified associated MT5 accounts (if applicable)

### 4.2 In-Progress Updates

| Situation | Action | Frequency |
|-----------|--------|-----------|
| Investigating internally | Update to client "I'm on it" | Every 2h |
| Waiting for L2 response (Susana/Pepe/Yulia/Dev) | Update + timeframe | At escalation + every 4h |
| Process takes >1 day | Update even if no news | Every 12h |
| VIP ticket | More frequent update | Every 2h minimum |

**Update template (Intercom macro "update-in-progress"):**
```
Hi [name], I wanted to give you an update on your case #[ID].

We are [action in progress — e.g.: "verifying with the dealing team 
the execution of your MT5 order"]. We don't have a final resolution yet 
but your case is being actively handled.

Next update: [specific time].

NEOMAAA Markets Team
```

### 4.3 Internal Notes (Intercom "Note")

**Standard format:**
```
[YYYY-MM-DD HH:mm UAE] [Rocio/Marilyn/Edward]
Action: [what I did — e.g.: "verified deposit in Skale + consulted Yulia for PSP reconciliation"]
Result: [what I found — e.g.: "PSP confirms settlement on 2026-04-12, Skale didn't sync"]
Next: [what's missing — e.g.: "Yulia re-sends manual sync, ETA 2h"]
```

Each significant action → 1 internal note. No exceptions. Edward audits weekly.

---

## 5. Escalation

### 5.1 When to Escalate

- You can't resolve in 15 min with L1 tools (Intercom + Skale + Sumsub + Encyclopedia)
- Requires access you don't have (MT5 Manager admin, Fireblocks, PSP dashboard directly)
- Compliance / regulatory / legal topic
- Client asked for supervisor
- Formal complaint (see `manejo-quejas.md` and [Crisis Manual](/content/en/operations/manual-crisis))

### 5.2 Escalation Process

1. **Internal note in Intercom** with: previous attempt, available info, reason to escalate, required L2 action
2. **Communicate to L2 via Telegram DM** (not group):
   ```
   @[person] — Escalated ticket: [Intercom link]
   Client: [name] — MT5#: [number] — Skale ID: [ID]
   Issue: [1 line]
   Attempted: [summary]
   Need: [L2 action]
   Priority: [urgent/high/medium]
   SLA: respond before [time]
   ```
3. **Inform client** (Intercom macro "escalation-to-l2"):
   ```
   [name], I've transferred your case to the [compliance/dealing/ops] team 
   which has access to the necessary tools.
   I'll personally follow up with you in [time].
   Case number: #[Intercom ID].
   ```
4. **Tags:** `escalated` + `waiting-internal` + `l2:<person>`
5. **Follow-up:** L2 doesn't respond in 2h → Telegram follow-up. If 4h → escalate to Edward. If 6h (urgent) → Angel or Diego.

### 5.3 Escalation Matrix (NEOMAAA Quick Reference)

| Issue | Direct L2 | Channel | Fallback if no SLA response |
|----------|-----------|-------|-------------------------------|
| KYC rejection / AML flag / sanctions | **Susana** | Telegram DM + compliance@neomaaa.com | Angel (CCO) |
| MT5 execution / slippage / requote / spread dispute | **Pepe** | Telegram DM | Stanislav (Principal tech) |
| Deposit not credited / stuck withdrawal / PSP rejection | **Yulia** | Telegram DM | `[DATA: Finance Manager to be hired]` |
| Portal / API / Skale sync bug | **Alex A / Alex B / Gleb / Dimitri** (dev team) | Telegram `#dev` | Stanislav |
| VIP upgrade / commission scheme change | **Edward** → Franco/Luis | Telegram `#sales` | Angel |
| Regulatory complaint / legal threat | **Susana** | URGENT Telegram DM + legal@neomaaa.com | **Diego directly** |
| VIP client threatens to leave | **Edward + Pepe** personal call <24h | Phone | Diego |
| Public crisis / viral Telegram-Twitter | **Diego + Angel** | Phone | Activate [Crisis Manual](/content/en/operations/manual-crisis) |
| Anything else unresolved at L1 | **Edward** (interim Head of Support) | Telegram DM | Angel |

---

## 6. Resolution

### 6.1 What "Resolved" Means

- Question answered completely and correctly (with real Skale/MT5/Sumsub data, not generic)
- Technical issue solved + client confirmed
- Deposit/withdrawal processed and reflected in MT5
- Complaint investigated + outcome communicated
- Client has all info to proceed

### 6.2 Resolution Communication

**Closure checklist:**
- [ ] Summarize what was resolved
- [ ] Confirm satisfaction
- [ ] Ask if there's anything else
- [ ] Offer channel for future inquiries (Intercom app.neomaaa.com / support@neomaaa.com)

**Resolution template (Intercom macro "resolution"):**
```
Hi [name],

Your case #[ID] has been resolved. [Resolution summary].

[If applicable: technical detail — "your deposit of $500 USDT was credited 
to your MT5 account #5123456 at 14:32 UAE"]

If there's anything else or something wasn't entirely clear, I'm here.

NEOMAAA Markets Team — support@neomaaa.com
```

### 6.3 Unfavorably Resolved Tickets

If the resolution is unfavorable (invalid complaint, feature unavailable, regulatory restriction):

```
Hi [name],

After reviewing your case with the [compliance/dealing] team, 
[clear and honest explanation].

I understand this isn't the expected answer. [If alternative: "What I 
can offer you is..."] [If not: "I'm sorry I can't help in another way."]

If you're not satisfied, you can request additional review via 
compliance@neomaaa.com — your case will be evaluated by Susana 
(Compliance Officer) + Angel Ortega (CCO).

NEOMAAA Markets Team
```

---

## 7. Closure and Follow-up

### 7.1 Closure Process

| Step | Action | Time |
|------|--------|--------|
| 1 | Communicate resolution | Immediate |
| 2 | Wait for client confirmation | 48h |
| 3 | Confirms → close | Immediate |
| 4 | No response → reminder | At 48h |
| 5 | No response to reminder → auto-close | 48h post-reminder (96h total) |

**Pre-closure reminder template (macro "pre-close-reminder"):**
```
Hi [name], just checking that your case #[ID] was resolved. 
If there's no response in 48h I'll close it automatically. 
You can reopen it anytime from app.neomaaa.com or 
support@neomaaa.com.
```

### 7.2 Closure Tags

| Tag | Meaning |
|-----|------------|
| `resolved-l1` | Resolved by Rocio/Marilyn |
| `resolved-l2` | With intervention from Susana/Pepe/Yulia/Dev |
| `resolved-l3` | With intervention from Angel/Diego |
| `resolved-client-confirmed` | Client confirmed satisfaction |
| `resolved-no-response` | 96h timeout without response |
| `unresolved-client-choice` | Client decided not to continue |
| `complaint-resolved` | Complaint resolved |
| `restricted-geo` | Closed due to geographic restriction (USA/UK/EEA/etc) |

### 7.3 Post-Closure Follow-up (VIP + high/urgent priority)

| Follow-up | Time | Action |
|------------|--------|--------|
| First | 48h post-closure | "Is everything still fine with [topic]?" |
| CSAT survey | 24h post-closure | Automatic from Intercom |
| VIP check-in | 7 days post-closure | Edward does personal call/message |

---

## 8. Satisfaction Survey

### 8.1 Intercom Configuration

**Path:** Intercom > Settings > Messenger > Customer Satisfaction (CSAT)
**Trigger:** 24h after closure
**Question:** "How would you rate the service you received?" (5 stars)
**Open question:** "Any additional comments?"

### 8.2 Use of Results

| Rating | Action | Owner |
|-------------|--------|-------|
| 5 | Record. Consider public review with permission. | Rocio/Marilyn |
| 4 | Record without special action | — |
| 3 | **Edward reviews the ticket** to identify improvement | Edward |
| 1-2 | **Edward contacts the client** to understand dissatisfaction. Case reviewed internally with Susana/Pepe as applicable | Edward + L2 |

### 8.3 NEOMAAA CSAT Targets

- **Global target:** >85% positive CSAT (4-5 stars) monthly
- **Per-agent target:** >80% positive
- **Response rate:** >30%
- **Post-ticket NPS:** >50

---

## 9. Queue Management and Prioritization

### 9.1 Prioritization Rule

1. **Urgent** — first, no exceptions
2. **VIP Gold/Platinum** with any priority — second
3. **High priority** — third
4. **FIFO within the same level**
5. **Medium/low** — last

### 9.2 Peak Management

Queue > agent capacity:
1. Intercom auto-reply: "We received your message. An agent will assist you shortly."
2. Prioritize per 9.1
3. **>10 tickets without response → alert Edward via Telegram** (Edward can move Franco/Luis temporarily if they're free)
4. Shift overlap → both agents on queue

### 9.3 Simultaneous Ticket Limits

| Agent Type | Max Active | Max in Queue |
|---------------|-------------|-------------|
| Rocio/Marilyn (L1) | 5 simultaneous | 15 in queue |
| Edward (Head / VIP manager) | 3 simultaneous | 10 in queue |

Over the limit → Edward redistributes.

---

## 10. Reports and Metrics

### 10.1 Daily Metrics (Intercom Dashboard + Edward reports in Telegram `#war-room`)

| Metric | NEOMAAA Target | Red flag |
|---------|--------------|----------|
| Tickets received | Tracking | — |
| Tickets resolved | >80% of received | <60% |
| Chat FRT | <5 min | >15 min |
| Email FRT | <2h | >6h |
| Average resolution time | <12h | >24h |
| % escalated | <20% | >35% |
| Tickets in queue at end of shift | 0 | >5 |
| Tickets/active client | <0.5 | >1.5 |

### 10.2 Weekly Report (Edward → Principals Friday 16:00 UAE)

```
WEEKLY SUPPORT REPORT — Week [#] — NEOMAAA Markets

Total tickets: ___
Resolved: ___ (__% vs 80% target)
Pending: ___
Escalated: ___

By category:
- KYC (Sumsub): ___
- Deposits (PSPs): ___
- Withdrawals: ___
- MT5 (execution/login): ___
- Compliance/Complaints: ___
- Other: ___

SLA met: ___%
Average CSAT: ___/5.0 (target 85% positive)
NPS: ___

Tickets out of SLA: ___
Top 3 recurring issues:
1. ___
2. ___
3. ___

Required actions (owner + deadline):
- ___
```

Uploaded to Notion `Work HQ NEOMAAA > Support > Weekly Reports`.

### 10.3 Monthly Report

Everything weekly + month-over-month trends + category analysis + training needs + hiring needs + open CSAT feedback.

---

## 11. Ticket Hygiene

### 11.1 Weekly Cleanup (Friday last hour of shift)

| Action | Criterion |
|--------|----------|
| Close "Waiting on client" >7 days | Send closure template first |
| Follow up on "Waiting internal" >48h | Contact L2 again (Telegram) |
| Review assigned tickets without activity >72h | Update or close |
| Verify tags | Every ticket: type + priority + language + market |
| Clean duplicates | Merge tickets from the same client on the same topic |

### 11.2 Ticket Merging

1. Identify main ticket (most complete / oldest)
2. Copy info from duplicate to main
3. Close duplicate: note "Merged with ticket #[main]"
4. Inform client: "I've consolidated your inquiries into a single case #[ID]"

---

## 12. Agent Checklist

### First-Day Checklist (new agent — Rocio or Marilyn onboarding)

- [ ] Intercom access (owner: Edward requests from dev team)
- [ ] Skale CRM access (owner: Yulia approves)
- [ ] Sumsub dashboard read-only access (owner: Susana approves)
- [ ] MT5 Manager "Support" mode access (owner: Pepe approves, consultation only)
- [ ] Added to Telegram groups: `#war-room`, `#support`, `#sales`, `#dev`
- [ ] Added to WhatsApp NEOMAAA business account
- [ ] @neomaaa.com email created (support@ + personal alias)
- [ ] Mandatory reading:
  - [ ] This doc (gestion-tickets.md)
  - [ ] [Support Playbook](/content/en/support/playbook)
  - [ ] [Support Encyclopedia](/content/en/support/enciclopedia-soporte)
  - [ ] [Deposits Manual](/content/en/operations/depositos)
  - [ ] [Operations Internal FAQ](/content/en/operations/faq-interno)
- [ ] Simulation with Edward: 5 test tickets, live feedback
- [ ] Shadow 1 full shift with Rocio or Marilyn
- [ ] First solo shift with Edward on-call for questions

### At Start of Shift (first 15 minutes)

- [ ] Review unassigned queue in Intercom
- [ ] Read handoff notes from previous shift (Telegram `#support` + Intercom notes)
- [ ] Self-assign tickets in my language/region
- [ ] Respond to urgent first (target: <10 min first response)
- [ ] Review "Waiting internal" for L2 follow-up
- [ ] Verify active VIP tickets in Skale

### During the Shift

- [ ] Max 5 simultaneous active tickets
- [ ] Document every action in internal notes (format 4.3)
- [ ] Meet SLAs 1.3
- [ ] Escalate on time (don't hold what I can't resolve)
- [ ] Personalize every response (macros = base, not literal copy-paste)

### At End of Shift (last 15 min)

- [ ] Review all my open tickets
- [ ] Handoff note on tickets requiring continuity
- [ ] Reassign urgents to next agent (or Edward if gap)
- [ ] Update status (no ticket in "New")
- [ ] Message in Telegram `#support`: "Ending shift. X active tickets, Y pending urgent, Z escalated to [L2]."

---

*NEOMAAA Markets internal document — Neomaaa Ltd L15968/N AOFA Anjouan.*
*Complements the [Support Playbook](/content/en/support/playbook) and the [Support Encyclopedia](/content/en/support/enciclopedia-soporte).*
*Mandatory monthly review — owner: Edward. Next review: `[DATA: Edward schedules date]`.*
