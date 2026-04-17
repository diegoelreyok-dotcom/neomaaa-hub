# Crisis Manual — Response to operational incidents

**Version:** 1.0
**Date:** April 2026
**Audience:** Entire NEOMAAA Markets team (with clear roles per crisis type)
**Purpose:** Standard response protocol when something breaks. Do not improvise. Do not hide.

---

## Table of Contents

1. [Introduction — why this doc exists](#1-introduction)
2. [Guiding principles in crisis](#2-guiding-principles)
3. [Chain of command by crisis type](#3-chain-of-command)
4. [Essential tools](#4-essential-tools)
5. [Scenario 1 — MT5 down](#5-scenario-1--mt5-down)
6. [Scenario 2 — PSP freezes funds](#6-scenario-2--psp-freezes-funds)
7. [Scenario 3 — Phishing attack / hacked accounts](#7-scenario-3--phishing-attack)
8. [Scenario 4 — Corrupt feed / absurd prices](#8-scenario-4--corrupt-feed)
9. [Scenario 5 — Angry VIP client](#9-scenario-5--angry-vip-client)
10. [Scenario 6 — Negative news / viral review](#10-scenario-6--negative-news)
11. [Scenario 7 — Regulatory notification (AOFA)](#11-scenario-7--regulatory-notification)
12. [Scenario 8 — Internal leak / toxic employee](#12-scenario-8--internal-leak)
13. [Post-mortem template](#13-post-mortem-template)
14. [Pre-crisis preparation checklist](#14-preparation-checklist)
15. [Anti-patterns — what NOT to do ever](#15-anti-patterns)
16. [Annexes — contacts and templates](#16-annexes)

---

## 1. Introduction

In a retail forex / CFDs broker, crises are not rare events — they are part of the business. MT5 goes down. The primary PSP freezes the merchant account. Negative news goes viral on TikTok. A VIP client loses $80k and threatens to sue us. An employee leaves angry and leaks internal data.

Today, if any of this happens, we improvise. Each new crisis is resolved from scratch, the team does not know who decides, public communication comes out late or badly, and reputation damage is greater than necessary.

This document exists to change that.

The objective is not to prevent crises (impossible), it is to **respond well when they happen**. Brokers that survived 20 years are not the ones that avoided crises — they are the ones that handled them with a clear protocol.

> [!INFO]
> This manual feeds on real industry cases (FTX, Alpari UK post-CHF, Plus500 FCA suspensions, eToro outages, IC Markets massive chargebacks, prop firms that collapsed in 2024). We do not reinvent the wheel: we copy what worked and avoid what failed.

### Audience

This document is read by any NEOMAAA Markets employee. Anyone can detect a crisis first — support seeing identical complaints from 50 clients in 10 minutes, sales receiving a weird screenshot, dealing seeing an impossible spread. The person detecting does NOT need to know how to resolve the crisis. They need to know **how to escalate it correctly**.

---

## 2. Guiding principles

Four principles govern every crisis response in NEOMAAA. They are not negotiable.

### Principle 1 — Absolute internal transparency

NEVER hide a crisis from the team. There is no "the part they shouldn't know". The moment something serious is detected, it goes into the `#crisis-neomaaa` Telegram channel and the relevant team finds out.

Reasons:
- Hiding info delays solutions (the person who can fix it does not find out)
- The team finds out anyway but through informal channels (rumors, gossip)
- If there is a later investigation, "they tried to cover it up" multiplies legal damage

Internal transparency does not mean immediate external communication. First contain, then communicate publicly. But internally, day 1, hour 1.

### Principle 2 — One leader decides, the rest execute

In crisis there is no democracy. An **Incident Commander (IC)** is assigned based on the crisis type (table below), and during the crisis window that person has total decision authority over that incident.

The IC can delegate, consult, ask opinion. But the final decision is theirs. And the team executes without debate while the crisis lasts.

Post-mortem is the moment to question decisions. During the crisis, no.

### Principle 3 — Stop first, investigate after, communicate publicly last

Strict order:

<div className="neo-timeline">

1. **Contain the bleeding** — whatever is happening, stop it or limit it. If MT5 screams crazy prices, stop trading. If PSP does mass chargeback, change PSP. If a hacker is getting in, cut accesses.
2. **Investigate root cause** — with the bleeding stopped, understand what happened. Logs, timeline, evidence.
3. **Decide corrective action** — with clear cause, decide what changes. Rollback, patch, new policy, client compensation.
4. **Public communication** — ONLY when there is a clear message and concrete action. Communicating earlier only generates more panic.

</div>

The classic error is to invert this order: "we have to go out and communicate now". No. First contain. 30 minutes of silence while containing is acceptable. A confused statement without action plan is catastrophic.

### Principle 4 — Document everything from minute 1

As soon as a crisis begins, a **timestamped shared document** (Google Doc or Notion) is opened with:

- Exact time of each event
- Who detected, who decided, who executed
- What was tried and what result it gave
- Communications sent (internal and external)
- Changes in systems

This log is used for:
- Post-mortem (reconstruct what happened)
- Regulatory communication (AOFA may request timeline)
- Legal defense if there is a lawsuit
- Learning for future crises

> [!WARNING]
> If it is not documented, it did not happen. In regulatory or legal crises, lack of documentation is interpreted against the broker. Documenting while it happens is easier than reconstructing later.

---

## 3. Chain of command

<div className="neo-pyramid">
<div className="neo-pyramid-level">SEV1 — Regulatory / Security / Leak (puts broker at legal or license risk)</div>
<div className="neo-pyramid-level">SEV2 — Financial / PSP blocked / Feed corrupt (affects funds and execution)</div>
<div className="neo-pyramid-level">SEV3 — MT5 technical / Viral reputational (affects operation or public image)</div>
<div className="neo-pyramid-level">SEV4 — Angry VIP client / isolated incident (limited impact, high urgency)</div>
</div>

Each type of crisis has defined roles. The **Incident Commander (IC)** decides. The **Operational Lead** executes the technical/operational part. **Communications** handles the internal and external message.

| Crisis type | Incident Commander | Operational Lead | Communications |
|---|---|---|---|
| Technical (MT5, portal, CRM) | Dev Lead (Alex A / Gleb) | Dev team | Diego + Yulia |
| Financial (PSP, funds) | Finance Manager (or Diego if none) | Pepe + Susana | Diego |
| Regulatory (AOFA, sanction) | Susana | Diego | Diego (public) + Susana (regulator) |
| Reputational (press, social) | Diego | Marketing Manager | Diego + Marketing |
| Angry VIP client | Pepe or Head of Sales (Edward) | Support Lead | Pepe |
| Security (hack, phishing) | Diego | Dev Lead + Gleb | Diego + External Legal |
| Internal leak | Diego | Dev Lead (accesses) + Legal | Diego |
| Corrupt feed / prices | Pepe (Dealing) + Dev Lead | Dev team + Liquidity provider | Diego |

### General procedure (applies to all crises)

<div className="neo-timeline">

1. **Detection (T+0)** — Whoever detects something abnormal posts in Telegram `#crisis-neomaaa` with: what they saw, when, evidence (screenshot / log). No diagnosis needed, just report.
2. **Acknowledgment (T+5 min)** — At least one principal (Diego / Yulia / Stanislav) confirms receipt of the message. If no one responds in 5 min, escalate via WhatsApp directly to the IC of the crisis type.
3. **IC assumption (T+10 min)** — The corresponding Incident Commander formally assumes: writes in the channel "IC assumed by [name]" and takes control.
4. **War room open (T+15 min)** — The IC opens Telegram voice + shared document. Invites critical operators. Everything else (meetings, tasks) is paused.
5. **Containment (T+15 to T+60 min)** — Single objective: stop the bleeding. No public communication yet.
6. **Internal communication (T+30 min)** — Update to full team via general channel: "We are working on [X]. More info at [time]". Without operational details.
7. **External communication (when there is a plan)** — Status message on Intercom + social + base email. ALWAYS approved by IC + Diego before publishing.
8. **Resolution + final statement** — When the crisis is closed: public update, compensation if applicable, thanks to the team.
9. **Post-mortem (48h later)** — Minimum 1h session with the template from section 13.

</div>

> [!DANGER]
> External communication ALWAYS goes through IC + Diego before being published. An impulsive tweet from support, an unapproved Intercom message, an angry comment responding on Instagram — any of those can cost 6 months of brand work. Simple rule: **if Diego or the IC did not approve, it does not go out**.

---

## 4. Essential tools

What must be ready BEFORE something happens:

### Telegram channel `#crisis-neomaaa`

- All principals: Diego, Yulia, Stanislav, Pepe, Susana, Edward
- Dev leads: Alex A, Gleb
- Operational leads: Head of Support, Head of Sales, Marketing Manager, Finance Manager
- **Notifications on 24/7 for all members.** This is the only channel where silence is not an option.
- Used only for crisis. No casual chat, no general broadcasts.

### Real-time shared document

- Google Doc with pre-built template: Timeline / Current status / Decisions / Communications / Action items
- Permanent link saved in the pin of the Telegram channel
- Editable by all principals
- Each entry with timestamp (UTC + Dubai local time)

### Intercom status banner

- Pre-approved template with 3 variants: "investigating" / "identified" / "resolved"
- Activates in 30 seconds from the admin panel
- Multi-language (ES/EN/RU)

### Pre-approved communication templates

Folder `/comunicacion-crisis/` with drafts for:
- Mass email to base (3 variants: technical, financial, generic)
- Post for Instagram / X / Facebook
- Intercom message to individually affected client
- Response to press (if they contact)
- AOFA notification (if applicable)

### Monitoring and automatic alerts

- Uptime monitoring of MT5, portal, CRM (Pingdom / UptimeRobot)
- Alert on Slack / Telegram when a service is down > 2 minutes
- PSP dashboard with real-time success rate
- Social listening (Mention.com or similar) to detect negative virality

> [!WARNING]
> **Official published SLA: 99.9% uptime** (source: neomaaa.com). This equals a maximum downtime budget of ~43 minutes per month (~8.76 hours per year). Any incident that monthly accumulated exceeds this margin must be treated as **automatic SEV1** and activate proactive communication to client + formal retrospective. Breaking published SLA exposes the broker to formal claims and reputational damage. Daily tracking of consolidated uptime is Stanislav's responsibility (tech) and reported weekly to Principals.
>
> Base infrastructure: MT5 servers at Equinix (NY4, LD5), geographic redundancy, enterprise-grade failover.

> [!TIP]
> Most crises are detected 30-60 min earlier by the support or dealing team (clients report first). The dashboard helps confirm, but the **operational team's ear** is the fastest alert. Train support to escalate when they see strange patterns, not wait for instructions.

---

## 5. Scenario 1 — MT5 down

**Symptoms:**
- Clients report they cannot log in
- Orders do not execute, or execute with abnormal delay
- Ping to MT5 server does not respond
- Price feed frozen or lagging
- Support receives 10+ identical tickets in minutes

**Incident Commander:** Dev Lead (Alex A or Gleb, per who is available first).

### Immediate action (0-15 min)

<div className="neo-timeline">

1. **Verify real state** — ping MT5 server, access the Manager Terminal, check processes. Confirm it is real outage and not perception.
2. **Determine scope** — is it the main server? backup also down? a specific account type? only login or also execution?
3. **Immediate public status message** — Intercom: "We are investigating a problem with the MT5 platform. We will update in 30 minutes." Without cause, without timing.
4. **Centralize support** — support channel pauses individual responses, uses single pre-approved response. Avoid 5 agents giving 5 different versions.
5. **Escalate to MT5 provider** — open urgent ticket with MetaQuotes / the hosting provider (Equinix / Finotec / whoever applies). Call, not just email.
6. **Decide whether to stop new signups** — if MT5 is down, new signups get stuck. Better to pause the web form than generate 200 zombie accounts.

</div>

### Continuing action (15-60 min)

1. Identify root cause: is it provider side (them), our side (us), or third party (DDoS, ISP connectivity)?
2. If provider side:
   - Escalate to their L2/L3 level
   - Confirm resolution ETA
   - Communicate to client with ETA **only if the provider confirmed in writing** — never report timing based on verbal promises
3. If our side:
   - Rollback the last deployed change (if there was a recent deploy)
   - Escalate to Stanislav / Senior Dev Lead
   - Controlled restart, never "let's see if this works"
4. If it is DDoS or connectivity:
   - Activate Cloudflare / DDoS protection if applicable
   - Contact ISP
   - Get in touch with hosting providers for failover

### Post-incident action (first 48h)

1. **Public statement with real timeline** — email to the full affected base: what happened, when, how it was resolved, what we do so it does not happen again. Tone: professional, factual, zero excuses.
2. **Identify financially affected clients** — stuck orders, stop-losses not executed, etc.
3. **Case-by-case compensation:**
   - Stop-loss not executed that caused measurable loss → refund or credit
   - Open position that could not be closed → dealing review (Pepe), manual adjustment if appropriate
   - Opportunity loss (could not open trade) → generally NOT compensated (impossible to prove)
4. **Post-mortem in 48h** — use section 13 template.
5. **Technical runbook update** — lessons learned, new procedures.

### What NOT to do

> [!DANGER]
> - DO NOT publicly minimize ("it's something minor, already resolved") if it is not. Clients see reality, the gap generates permanent distrust.
> - DO NOT publicly blame the provider without documented evidence. Legal risk.
> - DO NOT let support agents improvise messages. Single channel, single message.
> - DO NOT promise resolution ETA until confirmed by who will execute the resolution.
> - DO NOT deploy new fixes in the middle of a crisis without staging testing. "Put out a fire with gasoline".

---

## 6. Scenario 2 — PSP freezes funds

**Symptoms:**
- PSP account manager (Checkout, Stripe, PagSmile, etc.) notifies hold, freeze, suspension
- Deposits rejected en masse (success rate drops >50%)
- Withdrawals to PSP returned
- Email from PSP requesting "urgent additional documentation"
- In worst case: merchant account frozen without prior notice

**Incident Commander:** Finance Manager. If the role is not yet hired: Diego directly.

### Typical causes

<div className="neo-stat-grid">

**Chargeback rate exceeded threshold** — card networks (Visa/MC) punish if chargebacks > 1% of volume. Preventive hold from PSP while investigating.

**Volume changed abruptly** — if you go from $50k/month to $500k/month in 2 weeks, PSP assumes fraud or laundering and holds to review.

**PSP KYC disputes info** — the PSP asks for updated docs (AOFA license, beneficial owners, proof of office). Not responding fast = hold.

**End client disputed with their bank** — accumulated chargebacks from 10+ clients in few days triggers automatic alarm.

**Regulatory** — PSP received authority notification about NEOMAAA (even if preliminary investigation).

**Forbidden sector / reclassification** — some PSPs change policy and stop accepting forex brokers. Hold is step prior to termination.

</div>

### Immediate action (0-30 min)

<div className="neo-timeline">

1. **Contact PSP account manager in minutes.** WhatsApp, call, email — whatever responds fastest. Do not wait for standard ticket to be answered.
2. **Request specific written reason.** "Compliance review hold" does not work. You need: what clause, what evidence, what they require, how long it lasts.
3. **Estimate financial impact:**
   - How many deposits affected ($ volume + count)
   - How many withdrawals in queue
   - Days of rolling reserve if extended
   - Individually affected clients
4. **Activate backup PSP.** NEOMAAA must always have minimum 2 PSPs per category (card / crypto / bank / local). Immediate reroute.
5. **Pause marketing campaigns** that direct to that specific payment method.
6. **Proactively communicate to affected clients** — email or Intercom with: "we detected a problem with [method]. Temporarily use [alternative]. Your balance is safe."

</div>

### Continuing action (hours to days)

1. **Negotiate with the PSP:**
   - Present compliance evidence (license, audits, KYC policy, chargeback management)
   - Offer higher rolling reserve if that resolves it
   - Propose additional monitoring that gives the PSP comfort
   - Escalate to PSP VP of compliance if account manager does not resolve
2. **If it is permanent freeze (termination):**
   - Immediate legal review to recover retained funds
   - Review contract: termination clauses, retention periods, dispute jurisdiction
   - 30/60/90 day plan to recover the money (rolling reserve liberation)
3. **Alternative routing for affected clients:**
   - Personalized communication by region (LATAM clients → PIX / SPEI / crypto)
   - Dedicated support for complex cases
   - Goodwill bonus if the client is very affected (e.g. withdrawal delay)

### Post-incident action

1. **Diversify more.** If you fell with 1 PSP, increase to minimum 3 PSPs per category.
2. **Monitor weekly chargeback rate** (not monthly). Auto alert if it passes 0.5%.
3. **Internal KYC of clients with >$10k volume** — reduces chargeback risk.
4. **Active relationship with 2-3 account managers per PSP** — not depending on a single person.

> [!WARNING]
> The worst PSP scenario is not that they cut off your service — it's that they hold $500k-1M for 180 days. Without that cashflow, many brokers do not survive 6 months. That is why it is critical to have **corporate cash reserve of 3-6 months of opex** independent of PSPs.

---

## 7. Scenario 3 — Phishing attack

**Symptoms:**
- Client reports unauthorized withdrawal from their account
- Multiple clients with same complaint in hours
- Phishing email imitating NEOMAAA domain detected (neomaaa-withdraw.com, neomaa-support.com)
- Login attempts from anomalous IPs in mass
- Password / 2FA changes without the client having done them

**Incident Commander:** Diego. **Operational Lead:** Dev Lead + Gleb (security).

### Immediate action (0-30 min)

<div className="neo-timeline">

1. **Freeze affected accounts** — suspend trading + withdrawals. Better temporary unfair freeze than stolen money.
2. **Review logs:** from what IP, what time, what actions. Identify pattern.
3. **Isolate the vector:**
   - Phishing email (imitating domain) → report to registrar for takedown
   - Credential stuffing → block IPs + aggressive rate limiting
   - Portal vulnerability → hotfix + freeze of affected functionality
   - Sim swap / SMS intercept → force 2FA via app (TOTP), not SMS
4. **Force password reset + 2FA** for all potentially affected accounts. Mass email with secure link.
5. **If it is generalized attack:** forced reset for full client base + 24h withdrawal block.
6. **Immediate public warning** — Intercom + email + social: "We detected phishing attempts imitating NEOMAAA. We will never ask for password by email / chat. Official link: neomaaamarkets.com"

</div>

### Continuing action

1. **Forensic investigation:**
   - How many accounts affected
   - What data did the attackers see (just balance? personal data? KYC documents?)
   - Exact entry vector
   - If it was targeted (specific VIP) or mass
2. **Legal breach notification** — if there is confirmed data leak affecting personal data:
   - Report to AOFA within regulatory deadline (typical 72h)
   - Individually notify affected clients
   - GDPR applies to European clients — urgent legal review
3. **Responsibility legal review:**
   - If the attacker obtained credentials via phishing (client fell for it) → limited broker liability, still compensated by goodwill in severe cases
   - If there was vulnerability in our system → complete broker liability
4. **Compensation:**
   - Stolen funds returned from the PSP if possible (confirmed fraud with evidence)
   - If not recovered via PSP → broker compensates (reputation > cost)
   - Case by case, sign NDA with the client if compensation is high

### What NOT to do

> [!DANGER]
> - DO NOT publicly deny ("nothing is happening, it's a rumor") if there is real evidence. Streisand effect guaranteed.
> - DO NOT wait to have all the info to communicate. Communicate early with what is known: "we detected attempts, we are investigating, here are the measures." Clients forgive lack of info. They do not forgive cover-up.
> - DO NOT promise "this will not happen again". Promise concrete measures taken.
> - DO NOT blame the client in the statement ("the user gave their password"). Even if true, it sounds terrible publicly.

---

## 8. Scenario 4 — Corrupt feed / absurd prices

**Symptoms:**
- EURUSD quotes at 0.5 for 3 seconds
- Spread of 500 pips where there should be 0.5
- Client executes order at impossible price (bought gold at $100/oz)
- Dealing detects unusual orders in small window
- Post-trade reports show execution prices outside market

**Incident Commander:** Pepe (Dealing) + Dev Lead jointly.

This is the **most financially dangerous scenario** in the manual. A corrupt feed without quick reaction can cost $500k-5M in minutes. Historical cases: several brokers went bankrupt or came close from similar events (SNB CHF unpeg in 2015, flash crashes, liquidity outages).

### Immediate action (0-5 min — literally minutes)

<div className="neo-timeline">

1. **PAUSE TRADING IMMEDIATELY.** Emergency stop on the MT5 server. Better 30 min without trading than losing millions. This decision is made by Pepe or Stanislav without consulting.
2. **Identify corrupt feed provider.** NEOMAAA has aggregated feed from multiple contracted liquidity providers (detailed list in `executive/liquidity-providers-b2b.md`, restricted access). Identify which gave the crazy price.
3. **Switch to backup feed.** Reroute main feed to backup. Validate backup gives normal prices.
4. **Quote back to correct feed.** Prices return to normal range before reopening trading.
5. **Snapshot of orders executed in the corrupt window.** Export from MT5 Manager all trades in the corruption period + 5 min before and after.
6. **Brief public status message:** "Platform in maintenance for feed validation. We reopen in [ETA]."

</div>

### Continuing action (minutes to hours)

1. **Reversal of fraudulent trades.** Clients who **deliberately exploited the error** (e.g. bought gold at $100/oz with size 100 lots) get their operations reversed. This is covered by "clearly erroneous trades" clause in T&Cs — validate with Susana it is active.
2. **Honor legitimate trades.** Clients who traded normally with normal prices: their trades stay. They are not touched.
3. **How to distinguish:**
   - Trade executed in normal spread, normal size → honor
   - Trade executed in impossible spread + size much higher than client's average → reversal
   - Trade in 2-second window with size 10x average → almost certain reversal
   - Borderline cases → Pepe decides case by case
4. **Communication to affected clients:**
   - Honor: "Trade X confirmed, your balance is correct."
   - Reversal: "Trade X reversed for clearly erroneous price per T&Cs clause 14.3. Your balance adjusts to pre-trade state. We apologize for the inconvenience."
5. **Legal prepared** — clients will complain about reversals. Solid T&Cs + incident documentation + clear communication = solid defense.
6. **Post-mortem with liquidity provider.** Why did it give the broken price? What compensation corresponds from their side? Contract adjustment if it repeats.

### What NOT to do

> [!DANGER]
> - DO NOT reopen trading until confirming valid prices. Worse than the loss is "relapse" 5 minutes later.
> - DO NOT reverse legitimate trades to "minimize broker losses". Clients notice, it becomes scandal, regulators investigate. Reversals ONLY when there is clear evidence of error exploitation.
> - DO NOT communicate "broken feed, sorry" without action. The statement must include what was done and what happens with trades.
> - DO NOT blame the liquidity provider publicly. Private discussion.

> [!INFO]
> The broker's legal defense in these cases rests on 3 pillars: (1) clearly erroneous trades clause in signed T&Cs, (2) timestamped event documentation, (3) consistent communication with all affected clients. If any is missing, the defense falls apart.

---

## 9. Scenario 5 — Angry VIP client

**Symptoms:**
- Client with accumulated deposit $50k-500k loses big part in days/weeks
- Threats: "I'll publish this on social media", "I'll sue", "I'll do mass chargeback"
- Tickets escalated by support to management
- On social media: already posted something or threatens to
- Requested withdrawal of remaining balance and wants to "talk to the owner"

**Incident Commander:** Pepe (Dealing) for technical review, or Diego if the threat is public/legal.

### Immediate action (first hours)

<div className="neo-timeline">

1. **Escalate to Pepe or Head of Sales (Edward) in minutes.** A junior support agent responding to this client is the worst possible scenario. Pause standard responses until the appropriate person takes over.
2. **Urgent video call with the client.** If they accept, always better than chat. Humanizes, lowers temperature. Schedule within 24h maximum.
3. **Listen to EVERYTHING before responding.** Do not defend. Do not justify. Do not explain. Just listen and take notes. The client needs to be listened to more than they need explanations.
4. **Review technical logs exhaustively BEFORE the call:**
   - Was there unfair slippage in any order?
   - Documentable execution problem?
   - System error that affected the client?
   - Abnormal spread in their critical trades?
   - Quotes outside market?
5. **Determine objective reality of the case:**
   - **A:** Client lost due to their own decision (normal trading, correct execution, their own risk management)
   - **B:** There was broker error that impacted result (bad execution, MT5 problem, unfair slippage)
   - **C:** Gray area (legal but suboptimal execution, client has valid point in communication)

</div>

### Action by classification

**Case A — Client lost due to their decision:**

- On the call: real empathy + clear data. "I see the frustration, it's difficult to lose that amount. Let's review the operations together." Show logs, execution, spreads of each trade.
- Correct execution evidence: timestamps, spread at the moment, parallel market prices.
- DO NOT offer compensation in this case. Setting precedent of "if you threaten publicly I pay you" destroys the business.
- If client still wants to publish on social media: "We understand. We commit to assisting you with what you need within our contractual responsibilities. Any formal complaint we channel via [complaints process]."
- Internal flag: toxic client, do not accept deposits again if they withdraw and want to return.

**Case B — There was broker error:**

- Acknowledge error clearly: "You are right. There was [X] that impacted your trade. We take responsibility."
- Compensation proportional to the damage: refund of the amount lost due to error, not necessarily all the loss.
- Goodwill gesture: additional bonus, commission-free trading for X time, other reasonable benefit.
- If threat passes: sign NDA + compensation agreement.
- Document internal case: process changes to avoid repetition.

**Case C — Gray area:**

- Pepe + Diego review together. Decision case by case.
- If the client has valid point (although not pure broker error), partial goodwill is usually the best decision.
- Objective: they do not stay publicly angry, even if legally nothing was owed.

### Handling specific threats

- **"I'll publish on social media"** — response: "It's your right. We are available to respond to any public query with transparency. We have X,XXX satisfied clients who can speak to service quality." Do not beg. Do not threaten back.
- **"I'll sue"** — response: "We understand. If you prefer legal channel, our legal team will respond via that channel. We suggest reviewing clause 22 of the T&Cs on dispute resolution first." Legal prepared for internal review.
- **"I'll do mass chargeback"** — response: "Each transaction has correct execution evidence. Fraudulent chargeback has legal and banking consequences for you. We prefer to resolve directly."

### What NOT to do

> [!DANGER]
> - DO NOT fight on chat. Ever. Lower the tone, be professional, even if the client is aggressive.
> - DO NOT offer compensation on first contact without reviewing evidence. Sets precedent.
> - DO NOT ignore the threat assuming they will not follow through. Assume they WILL publish, prepare response.
> - DO NOT put the case only in support's hands. Responsible management, always.
> - DO NOT respond publicly if the client posted on social media, until validating internally and preparing coordinated message.

### Systemic learning

If you have 3+ angry VIP client cases in 6 months, the problem is not the clients — it is marketing and onboarding. You attract the wrong profile, onboard without clear expectations, or there is no adequate risk management.

Review:
- Ad copy — does it promise returns or only tools?
- Onboarding — is real risk disclosure explained or signed without reading?
- Risk limits — are there alerts when client loses 30/50/70% of deposit?
- Target profile — is the client suitable for the products we offer?

---

## 10. Scenario 6 — Negative news / viral review

**Symptoms:**
- X thread / Instagram post / TikTok video accusing NEOMAAA of scam with viral views (>10k)
- Mass negative comments on NEOMAAA's social networks
- Increase in support tickets asking "is it scam?"
- Google Trends negative spike of the name
- Competitors bouncing the news

**Incident Commander:** Diego. **Operational Lead:** Marketing Manager.

### Immediate action (first hours)

<div className="neo-timeline">

1. **DO NOT respond impulsively from official account.** An emotional tweet multiplies virality 10x. Pause minimum 2 hours before public response.
2. **Evaluate the complaint:**
   - Is it real? — existing client with documentable problem
   - Is it FUD competitor? — accounts without history, repetitive pattern
   - Is it bot / automated? — abnormal activity, strange hours, copy-paste
3. **Identify author and specific allegations.** Name, handle, if client (check CRM), what they concretely say. Screenshot EVERYTHING (they may delete).
4. **Internally investigate the case if real.** Look for client in CRM, review operations, historical support, KYC, everything.
5. **Alert the team internally** — internal channel: "there is viral issue on X, we are investigating, do not respond individually, no sharing."

</div>

### Continuing action

**If the complaint has real basis:**

1. **Contact client directly (DM or email).** Offer to resolve: case review, compensation if applicable, management call.
2. **If the case is resolved:** ask them to edit or delete the post, or post an update. Many do if treated well.
3. **Public response if the post remains viral:** comment on the original post with calm tone: "Hi [name], we regret your experience. We contacted you by DM to resolve it. Any client with a complaint can write to us at [email] for direct assistance."

**If it is defamation / FUD without basis:**

1. **Legal review** — does the post contain documentable false accusations? Takedown request via legal is an option.
2. **Counter-response with data** — publish real stats: number of clients, time operating, regulation, etc. Calm tone, not defensive.
3. **Activate real testimonials** — already prepared satisfied clients respond organically. NEVER buy fake comments (detected).
4. **Amplify positive message** — existing real client content, Trustpilot reviews, etc.

**If it is bot / coordinated attack:**

1. Report accounts to platform (X, Instagram, TikTok all have report for spam/bot)
2. Activate genuine community engagement
3. Avoid emotional response — bots do not respond, just generate noise, noise dies alone in 48-72h if you do not feed it

### General principle of public response

Tone in every public response:
- Calm, never emotional
- With data, not with adjectives
- Brief, without long lists of justifications
- Grateful if there is legitimate feedback, firm if there is defamation

> [!TIP]
> The worst mistake in reputation crisis is to act as if it were personal. It is business, it is communication statistics, it is brand management. Diego or Marketing Manager respond with cool head, never from ego.

### Post-crisis action

1. **Virality analysis:** why did it scale? what trigger amplified it? influencer who bounced it?
2. **Brand strategy adjustment** if repeated patterns appeared
3. **Positive content plan** post-crisis: not to cover up, but to continue building reputation

---

## 11. Scenario 7 — Regulatory notification

**Symptoms:**
- Official email from AOFA (Anjouan Offshore Finance Authority) or parallel regulator
- Request for information (specific client, AML, operational)
- Notification of open investigation
- In worst case: precautionary license suspension
- Contact from a lawyer representing regulator or client with formal action

**Incident Commander:** Susana (Compliance Officer). **Diego** informed from minute 1.

### Immediate action (first 24h)

<div className="neo-timeline">

1. **Read the complete notification calmly.** Do not react emotionally. Regulators send many routine requests — not everything is escalation.
2. **Identify response deadline.** 7 days, 15 days, 30 days. The deadline is inflexible.
3. **DO NOT respond before consulting regulatory lawyer.** A poorly drafted response can worsen position. External lawyer before improvising.
4. **Classify notification type:**
   - Routine information request (annual AML report, specific KYC client) → standard response with docs
   - Preliminary investigation (questions about operational) → careful response, legal review, document
   - Formal investigation with allegations → external legal mandatory, defense plan
   - Precautionary action (suspension, freezing) → maximum crisis, Diego + Susana + Legal full time
5. **Gather requested info.** Exactly what was requested, no more no less. Extra info can open new fronts.
6. **Limited internal communication.** Team knows "there is regulatory request, normal process, Susana handles it". Without specific details until Susana approves sharing.

</div>

### Continuing action

1. **Formal response within deadline.** Susana + external legal draft, Diego approves, it is sent.
2. **If it is investigation:**
   - Cooperate 100% — playing against the regulator is suicide in offshore jurisdiction
   - Name single point of contact (Susana) — avoid regulator talking to 5 different people
   - External legal present in all communication
3. **Prepare public communication ONLY if the news comes out in press.** Never proactively. Template: "NEOMAAA Markets operates in full compliance with its AOFA license. We collaborate with the regulator on any routine requirement, as standard industry practice. Client funds are segregated and safe."
4. **Do not discuss details publicly** — even if you are right. Discussing with regulator in public = losing license faster.

### If there is suspension / sanction

1. **24-48h contingency plan:**
   - Communication to clients: normal operation continues if possible
   - Normal trading if regulator did not suspend
   - Normal withdrawals if regulator did not suspend
   - Prepare plan B: alternative jurisdiction already foreseen in regulatory expansion
2. **Legal plan:**
   - Formal appeal if appropriate
   - Regulatory compliance with requirements
   - Resolution timeline

### What NOT to do

> [!DANGER]
> - DO NOT respond to the regulator without regulatory lawyer. Ever.
> - DO NOT hide info from the regulator. It is detected, aggravates.
> - DO NOT publicly communicate investigation details. May be breach of legal confidentiality.
> - DO NOT allow employees to comment on the topic externally (social media, calls with clients).
> - DO NOT destroy documents post-notification. Obstruction of investigation, criminal offense.

---

## 12. Scenario 8 — Internal leak

**Symptoms:**
- Ex-employee (or current employee leaving) leaves on bad terms
- Threat to leak data / publish internal info
- Negative post on LinkedIn / Glassdoor with specific info
- Internal data appears on social networks or competition
- Evidence of massive info download before leaving

**Incident Commander:** Diego.

### Immediate action (minutes to hours)

<div className="neo-timeline">

1. **IMMEDIATE revoke of access.** Complete list:
   - CRM (Skale)
   - Intercom
   - Google Workspace (Gmail, Drive, Calendar)
   - Internal portal (Docsify)
   - Corporate VPN
   - Corporate Slack / Telegram
   - MT5 admin panel / server
   - PSPs and acquirer dashboards
   - GitHub repositories
   - Corporate password manager (1Password / LastPass)
2. **Critical password change** — admin of key systems. Not because they know the password, but in case they have open sessions on other devices.
3. **Backup of info they handled** — emails, docs, conversations. Preserve evidence.
4. **Recent access audit:**
   - What they downloaded in the 30 days prior to leaving
   - What emails they forwarded to personal
   - What docs they exported from Drive
   - Anomalous logins
5. **Legal review of signed NDA** — what clauses apply, what actions available, in what jurisdiction.

</div>

### Continuing action

**If there is no confirmed leak yet, only threat:**

1. Formal letter from external legal reminding them of NDA obligations + consequences.
2. Active monitoring of their public accounts.
3. Nothing public from our side — do not validate threat with reaction.

**If there is confirmed leak of non-sensitive data (internal process, strategy doc):**

1. Legal action for NDA breach — cease and desist letter, escalation if they do not comply.
2. Do not respond publicly to the leak — amplifies it.
3. Review that there is no more coming.

**If there is leak of sensitive client data:**

1. **Breach notification to AOFA** within regulatory deadline.
2. **Notification to affected clients** — personalized email, list of compromised data, recommended actions (password reset, fraud monitoring), dedicated support line.
3. **Aggressive legal action** — data theft is criminal in almost all jurisdictions.
4. **Public communication** — here you CANNOT hide. Acknowledge: "An ex-employee leaked internal data. We took [actions]. We contacted affected clients directly."
5. **Compliance investigation** — how did they get to that data? was it violation of internal access policy? what changes?

### Structural prevention post-event

1. **Strict need-to-know** — employees access only data they need. Granular segmentation.
2. **Rigorous offboarding checklist** — list of 40+ items to execute on departure day.
3. **Exit interview with compliance present** — NDA reminder, signed acknowledgment.
4. **Monitoring of abnormal downloads** — auto alerts if someone downloads >X files in Y time.
5. **Deleted accounts auditing** — quarterly review of accounts that should be inactive.

> [!INFO]
> The best defense against internal leak is not legal after — it is culture before. Employees who feel valued and treated with dignity do not leave on bad terms. Most leaks come from humiliating firings, unpaid salaries, or personal conflicts poorly handled. Investing in people ops is cheaper than litigating leaks.

---

## 13. Post-mortem template

After each crisis, formal minimum 1h session. Participants: IC + Operational Lead + Communications + any directly affected. Neutral facilitator if applicable.

### Post-mortem structure

**1. Reconstructed timeline (15 min)**
- Minute by minute of what happened
- When detected, who, how
- When escalated, to whom
- When IC assumed
- When contained
- When communicated externally
- When closed

**2. What went well (10 min)**
- What worked of the protocol
- Who executed well
- Systems / tools that helped
- Correct decisions under pressure

**3. What went wrong (20 min)**
- Where there was unnecessary delay
- What decisions were incorrect
- What communication failed
- What systems failed

**4. Total cost (5 min)**
- Financial: direct $ + opportunity
- Reputational: lost clients, negative mentions
- Client: how many affected, tickets, churn
- Time: team hours, opportunity of other projects

**5. Concrete changes (10 min)**
- What changes in process
- What changes in system
- What changes in people (role, responsibility)
- Owner of each change + deadline

### Post-mortem rules

- **Blameless.** No blaming people, blame systems. If a person failed, probably the system allowed them to fail. System fix.
- **Documented.** Output: formal doc with everything above, signed by IC, saved in `/crisis-postmortems/`.
- **Action items with owner.** Without owner with name + date = it will not happen.
- **Quarterly review.** Each quarter, review quarter post-mortems and validate changes were implemented.

> [!WARNING]
> Post-mortem without concrete changes is worse than not doing it. If the conclusion is "next time we do it better" without specifying WHAT changes — the crisis will repeat almost identical.

---

## 14. Preparation checklist

List of things that must be active BEFORE any crisis happens. Review quarterly.

### Response infrastructure
- [ ] Telegram channel `#crisis-neomaaa` created, all principals inside, notifications on
- [ ] Google Doc shared document with pre-built template, link in channel pin
- [ ] Primary + backup Incident Commander assigned per crisis type (table section 3)
- [ ] Intercom status message templates in 3 languages (ES/EN/RU), approved
- [ ] `/comunicacion-crisis/` folder with templates of email, social, press response
- [ ] Active uptime monitoring (MT5, portal, CRM) with auto alerts
- [ ] Social listening configured (Mention.com or similar) for NEOMAAA name

### Critical external contacts (have at hand 24/7)
- [ ] L2/L3 support from MetaQuotes / MT5 hosting provider — phone + email
- [ ] Account managers of each active PSP — phone + WhatsApp + email
- [ ] Regulatory lawyer (AOFA jurisdiction) — urgent reachability
- [ ] General lawyer (civil disputes, clients) — normal reachability
- [ ] Lawyer specialized in data breach / cybersecurity — for scenarios 3 and 8
- [ ] AOFA contact (Susana has direct access)
- [ ] PR / crisis comms agency (for scenario 6 if scales) — [DATA: evaluate contracting]

### Operational redundancy
- [ ] Active backup PSP per category: minimum 2 card, 2 crypto, 2 bank, 2 local
- [ ] Price feed with multiple liquidity providers (minimum 3)
- [ ] MT5 server with hot backup
- [ ] Corporate cash reserve of minimum 3 months of opex (for PSP freezes)
- [ ] Multi-cloud / multi-region if applicable

### Training
- [ ] Crisis drill minimum 1x per quarter — simulation with random scenario
- [ ] New employee onboarding includes reading this manual
- [ ] Operational leads (Head Support, Sales, Marketing) have annual procedure review
- [ ] Susana updates regulatory templates every 6 months

### Continuous documentation
- [ ] Post-mortems saved and accessible
- [ ] Update of this manual after every real crisis (lesson learned = new procedure)
- [ ] External contacts verified every 6 months (people change jobs)

---

## 15. Anti-patterns

What NEVER to do in crisis, regardless of momentary pressure:

1. **Hide info from the team during crisis.** Generates rumor, distrust, bad behavior. Internal transparency is non-negotiable.

2. **Respond publicly emotional.** An angry tweet destroys 12 months of brand. If you feel the need to respond now, it is the exact moment to NOT respond.

3. **Promise timing without certainty.** "Resolves in 30 min" when you do not know → you lose credibility when it is 3 hours. Better "we update in 30 min" than "we resolve in 30 min".

4. **Publicly blame without evidence.** "It was X provider's fault" without signed docs → provider lawsuit. Public defenses require documented evidence.

5. **Let a junior handle crisis without supervisor.** Junior support does not decide. Junior sales does not decide. There is always a responsible lead at their side.

6. **Ignore early signals.** "This is not serious, it will fix itself" while 20 tickets of the same type accumulate. Treat every strange cluster as potential crisis until ruled out.

7. **Post-mortem without real changes.** "Lessons learned" without concrete changes in process / system / people = guarantee of repetition.

8. **Blame a single person in post-mortem.** If a person failed, the system allowed the failure. System fix. Individual blame generates hiding culture next time.

9. **Work 72h straight in crisis.** Burned team makes bad decisions. Rotate people, send people to sleep, do not glorify overtime.

10. **Treat each crisis as isolated.** Each crisis is input to the system. Repeated patterns indicate structural problems (marketing attracting wrong clients, weak onboarding, infra without redundancy). Zoom out every 6 months.

---

## 16. Annexes

### A. Critical contacts

> [!INFO]
> This section is kept updated in separate document `/anexos-crisis/contactos-externos.md`. Mandatory quarterly review.

| Category | Contact | Internal responsible |
|---|---|---|
| MT5 Provider — L2 Support | [DATA: confirm with Stanislav] | Stanislav |
| Liquidity Provider — Primary | [DATA: confirm with Head of Dealing] | Head of Dealing |
| Liquidity Provider — Backup | [DATA: confirm with Head of Dealing] | Head of Dealing |
| Main card PSP | [DATA: confirm with Finance Manager / Diego] | Finance Manager |
| Backup card PSP | [DATA: confirm with Finance Manager / Diego] | Finance Manager |
| Crypto PSP | [DATA: confirm with Finance Manager / Diego] | Finance Manager |
| Local LATAM PSP | [DATA: confirm with Finance Manager / Diego] | Finance Manager |
| External legal — AOFA regulatory | [DATA: confirm with Susana] | Susana |
| External legal — civil disputes | [DATA: confirm with Diego] | Diego |
| External legal — cybersecurity / data breach | [DATA: contract / identify] | Diego |
| Direct AOFA contact | Susana (confidential direct contact) | Susana |
| PR / crisis comms agency | [DATA: evaluate hiring] | Marketing Manager |
| Cloudflare / DDoS protection | [DATA: confirm with Dev Lead] | Dev Lead |

### B. Communication templates

Folder `/comunicacion-crisis/` contains:

1. `email-base-generico.md` — email to whole base, neutral template
2. `email-base-tecnico.md` — outage, downtime, technical problem
3. `email-base-financiero.md` — PSP issue, affected withdrawals
4. `intercom-status-investigando.md`
5. `intercom-status-identificado.md`
6. `intercom-status-resuelto.md`
7. `social-media-outage.md` — post for X / Instagram / Facebook
8. `social-media-respuesta-difamacion.md` — calm response to public accusations
9. `respuesta-prensa-generica.md` — for when journalist contacts
10. `notificacion-cliente-individual-breach.md` — data affected case
11. `notificacion-aofa-breach.md` — regulatory template

### C. Drill plan (quarterly simulations)

**Format:** 2 hours, facilitated by a different principal each time. Random scenario from section 5-12. Participants: relevant roles to the scenario.

**Drill rules:**
- Surprise (date announced, scenario not)
- Real time (no pauses to think)
- Uses real channels (dedicated Telegram of the drill, not prod)
- Facilitator takes notes of delays, errors, lack of clarity
- Debrief at the end: what worked, what did not, what is adjusted from the manual

**Scenarios to rotate:**
- Q1: scenario 1 (MT5 down)
- Q2: scenario 5 (angry VIP)
- Q3: scenario 3 (mass phishing)
- Q4: scenario 4 (corrupt feed — most financially critical)

Other scenarios (2, 6, 7, 8) are worked via table-top exercises (guided conversation, without real simulation) in monthly management meetings.

### D. Related links

- [Go-Live Runbook](go-live-runbook.md) — launch protocol, complementary to this manual
- [Internal FAQ](faq-interno.md) — day-to-day operational questions
- [Deposits and Withdrawals](deposits.md) — for scenario 2
- [Compliance Manual](../compliance/manual-susana.md) — for scenario 7
- [Complaint Handling](../support/manejo-quejas.md) — for scenario 5
- [A-Book / B-Book Policy](../compliance/ab-book-policy.md) — relevant for scenario 4

---

**Version control:**
- v1.0 — April 2026. Initial pre-go-live version.
- Next updates: post-each-real-crisis + quarterly review + external contact adjustment.

**Reviewed by:** [DATA: signatures from Diego, Susana, Stanislav, Pepe before go-live]
