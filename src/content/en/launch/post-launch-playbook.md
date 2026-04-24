# Post-Launch Playbook — Weeks 1 to 4 of NEOMAAA Markets operation

**Entity:** Neomaaa Ltd — L15968/N AOFA Anjouan
**Applies to:** Month 1 post Go-Live of the broker (MT5 + Skale + Sumsub + Intercom operational)
**Primary team:** Principals (Diego, Angel, Yulia, Stanislav) + Heads (Pepe Dealing, Susana Compliance, Edward Sales/Support, `[DATA: Finance Manager to hire]`, `[DATA: Marketing Manager to hire]`)
**Mandatory cadence:** Daily snapshot 19:00 UAE + Stand-up Monday 09:00 UAE + Retro Friday 16:00 UAE

The first four weeks after opening a broker are the ones that define whether the launch was a success, an expensive experiment, or a disaster. This document picks up where the [Day D runbook + pre-launch master checklist](/content/en/operations/go-live-runbook) ends: what to do from the morning of day 2 until the close of month 1.

It is not a suggested calendar. It is the internal operational standard for NEOMAAA Markets' first 30 days.

---

## Introduction

### Why the first 4 weeks define the launch

A broker is born with inertia: the public narrative, the team's energy, activated affiliates, the ad campaign running, the first curious clients. That inertia lasts between 20 and 40 days. In that period almost everything is defined:

- **Real CAC** — not the pitch estimate, the one the cards pay.
- **Early retention** — whether FTDs come back to deposit or are lost.
- **Network reputation** — 20 dissatisfied clients posting on Telegram do more damage than six months of content marketing.
- **Team morale** — the first 30 days define whether the 16 of NEOMAAA plug in or burn out.
- **Principals' confidence** (Diego, Angel, Yulia, Stanislav) — each week without clear data generates anxiety and rushed decisions.

If the four weeks are operated with discipline, the broker enters month 2 with a real operational playbook, targets adjusted to reality, and capacity to scale. If operated in reactive mode, month 2 starts putting out month 1 fires and the team ends up burned out before the quarter.

### Three non-negotiable principles

<div className="neo-step-list">

**Principle 1 — Measure everything from day 1.** Without real data every decision is made by gut feel. Dashboards (Skale + Google Sheets + MT5 Admin + Intercom) have to be running and capturing KPIs from the first deposit. There is no "we'll configure it next week". Owner: `[DATA: Finance Manager to hire]` or Yulia as interim.

**Principle 2 — Do not change strategy in the first week.** The temptation is enormous: an underperforming channel, an agent with weak pipeline, a landing page with low conversion. The rule is let it run. One week is not a statistical sample — it is noise. Any forced change within the first 7 days is emotion, not strategy.

**Principle 3 — Mandatory weekly retro with Principals + Heads.** Friday 16:00 UAE, no exceptions. Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward + Finance/Marketing Managers. 90 minutes. Without this fixed meeting, rhythm is lost, decisions are postponed, and departments stop being aligned.

</div>

> [!WARNING]
> The most dangerous launch temptation is to act fast without data. A pricing adjustment on day 3, a campaign paused on day 5, a role hired on day 7 "because it looks like we need it" — each of these decisions without backing data can destroy the whole plan. The discipline is: observe, measure, decide.

---

## Fixed communication cadence (month 1)

| Event | Day / Hour (UAE) | Duration | Owner | Channel | Participants |
|---|---|---|---|---|---|
| **Daily snapshot** | Every day 19:00 | 5 min async | Finance Manager (or Yulia interim) | Telegram `#launch-principals` | Principals + Heads |
| **Morning stand-up** | Mon-Fri 09:00 | 15 min | Diego | Telegram voice / video call | Pepe, Susana, Edward, Finance, Marketing |
| **Extended Monday stand-up** | Mon 09:00 | 45 min | Diego | Video | All Principals + Heads |
| **Dealing sync** | Tue/Thu 14:00 | 30 min | Pepe | Video | Pepe + Stanislav + Dealing team |
| **Compliance sync** | Wed 10:00 | 30 min | Susana | Video | Susana + Angel + Yulia |
| **Support daily** | Every day 12:00 UAE (shift overlap) | 15 min | Edward | Telegram `#support` | Rocio + Marilyn + Edward |
| **Weekly retro** | Friday 16:00 | 90 min | Angel / Diego rotating | Video | Principals + all Heads |

---

## KPIs we watch

KPIs are divided into three cadence levels: daily (reviewed every day of month 1), weekly (Fridays at retrospective), monthly (month-in-review at close of month 1).

### Daily KPIs

Every day of month 1, at **19:00 UAE**, the Finance Manager (or Yulia interim) sends the daily snapshot to Telegram `#launch-principals`. Table format, no narrative.

| KPI | Ideal target | Acceptable target | Red flag | Source | Data owner |
|---|---|---|---|---|---|
| New signups | 30/day | 15/day | <5/day | Skale | Edward |
| KYC pass rate | >70% | >50% | <40% | Sumsub dashboard | Susana |
| FTD rate (from KYC approved) | >40% | >25% | <15% | Skale + PSP panels | Finance Mgr |
| Average FTD (USD) | >$150 | >$80 | <$50 | Skale | Finance Mgr |
| Tickets/active client | <0.5 | <1 | >1.5 | Intercom | Edward |
| Chat FRT | <5 min | <30 min | >2h | Intercom | Edward |
| Post-ticket NPS | >50 | >30 | <10 | Intercom CSAT | Edward |
| MT5 uptime | 100% | >99.5% | <99% | MT5 Admin + Equinix monitoring | Stanislav |
| PSP success rate | >90% | >80% | <70% | PSP panels + Skale | Yulia |
| MT5 daily volume (lots) | Tracking | — | >50% day-over-day drop | MT5 Admin | Pepe |

**Infrastructure SLA target:** 99.9% uptime MT5/portal (owner Stanislav + Equinix DC).

> [!INFO]
> These targets are realistic ranges for retail broker market for a launch. A broker with 2+ years of operation and established brand should aim higher (FTD rate >50%, retention >45%). For a NEOMAAA launch, going from "acceptable" is already a good result.

### Weekly KPIs

Reviewed Friday 16:00 UAE at retro. Each KPI compared against previous week and against monthly target.

- **CAC per channel** — SEM, paid social (Meta/TikTok), organic, IB (introducing brokers / affiliates), client referrals. Each channel tracked separately in Skale + Google Sheets. Owner: Marketing Mgr.
- **Lead-to-FTD conversion per channel** — how many leads from each channel end up depositing. Real quality filter.
- **Week 1 / Week 2 retention** — % of FTDs that came back to trade or deposit within 7 / 14 days.
- **Churn rate** — clients who closed account or inactive 14+ days over total FTDs of the period.
- **Trading volume** — lots in MT5 per instrument (FX majors/minors, indices, crypto CFDs, metals). Owner: Pepe.
- **Spread revenue vs commission revenue** — where the broker earns.
- **Cost per FTD per channel** — ad spend / attributed FTDs.
- **Early LTV (weeks 1-2)** — proxy: deposits + commissions/spread generated by cohort.

### Monthly KPIs (month 1 close)

<div className="neo-stat-grid">

**Total broker revenue** — spread + commissions + FX markup net of IB rebates. Owner: Finance Mgr / Yulia.

**Gross margin** — revenue minus PSP fees + LP fees + hedging. Measures A/B Book efficiency (see `/content/en/executive/ab-book-policy`).

**Blended CAC** — ads + sales salaries + marketing retainers / total FTDs.

**LTV:CAC ratio** — minimum 3:1. If month 1 is at 1.5:1 or worse, structural problem.

**Top 10 concentration** — % revenue from the 10 largest clients. >50% = concentration risk.

**Regulatory incidents** — ideally 0. A single one = Principals issue + possible AOFA notification.

</div>

> [!DANGER]
> LTV:CAC <1:1 sustained for 4 weeks means each new client loses money. If we reach month 1 close with that ratio, **DO NOT scale ads** — pause and rearm the strategy before burning launch cash. Automatic meeting trigger Diego + Angel + Marketing Mgr + Finance Mgr.

---

## Principals Dashboard

### What is seen at the Monday 09:00 UAE meeting

During month 1, in addition to Friday retros, **extended Monday stand-up 09:00 UAE of 45 min**. Does not replace retro: it is to start the week with the same map.

<div className="neo-step-list">

**1. Week numbers** (10 min) — summary table with the 10 daily KPIs averaged, vs previous week. Owner: **Finance Manager** (or Yulia interim).

**2. Top 3 wins + Top 3 problems** (10 min) — each Head brings:
- Pepe: dealing (execution, toxic flow, spread)
- Susana: compliance (KYC pass rate, AML flags, regulatory complaints)
- Edward: sales + support (FTD rate, pipeline, CSAT)
- Marketing: CAC, lead quality
- Finance: cash, PSPs, reconciliation

**3. Pending decisions** (10 min) — what needs Principals vote: approve new PSP, authorize hiring, adjust commissions, approve team bonus.

**4. Resource requested by department** (10 min) — money, people, time. Each Head says what they need.

**5. Review monthly OKRs** (5 min) — where we are vs month 1 goals. OKR in red → flag for Friday retro.

</div>

### Tools

**Month 1:**
- **Skale dashboards** — signup, KYC, FTD funnel by channel/affiliate
- **MT5 Admin** — volume, dealer P&L, flow analysis (Pepe)
- **Google Sheets** — consolidated P&L + CAC per channel (Finance Mgr updates manually 19:00 UAE daily)
- **Intercom Reports** — FRT, CSAT, ticket volume
- **Sumsub dashboard** — KYC funnel, rejection reasons (Susana)
- **Notion `Work HQ NEOMAAA`** — decision log, retro minutes, OKRs

**Month 2+:** evaluate Mixpanel or Amplitude when volume justifies. Not worth it before.

> [!TIP]
> The month 1 dashboard has to be ugly and functional. No one is impressed with a pretty Notion — principals want to see the numbers in 30 seconds. A Google Sheets table shared to Telegram `#launch-principals` at 19:00 UAE is better than a fancy dashboard that updates every 3 days.

---

## Week by week

<div className="neo-timeline">
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Week 1 — Survival</span><span className="neo-timeline-step-desc">Make everything work. Do not scale anything.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Week 2 — Stabilization</span><span className="neo-timeline-step-desc">Fix critical fires, start scaling what worked.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Week 3 — Optimization</span><span className="neo-timeline-step-desc">Move the needle on KPIs. Seriously optimize.</span></div>
<div className="neo-timeline-step"><span className="neo-timeline-step-title">Week 4 — Reset</span><span className="neo-timeline-step-desc">Month-in-review and month 2 plan.</span></div>
</div>

### Week 1 — Survival

**Objective:** make everything work. DO NOT scale anything.
**NEOMAAA week 1 target:** 50–100 accumulated FTDs, MT5 uptime >99.5%, chat FRT <5 min maintained.

Week 1 is pure defense. The system is stressing for the first time with real traffic.

**Day 1 (post-launch — already covered in [Day D runbook](/content/en/operations/go-live-runbook)):**
- All hands on deck: Pepe (dealing), Rocio+Marilyn (support), Susana (compliance), Edward (sales), Yulia (ops).
- 24h monitoring of: MT5 (Stanislav), PSPs (Yulia), client portal (Alex A/B dev team), Skale CRM (Yulia), Sumsub (Susana), Intercom (Edward).
- War room in Telegram `#launch` active 48h consecutive.
- Absolute rule: decision to change something = NO. Owner: Diego.

**Days 2-3 — First wave of feedback:**
- **Monday Week 1, 09:00 UAE:** Daily sync Diego + Yulia + Pepe + Susana + Edward. 30 min. MT5 status, Sumsub KYC pipeline, first Intercom tickets.
- Support (Rocio+Marilyn) starts receiving the first non-trivial tickets. Edward supervises.
- Triage of each ticket: real bug, confusing UX, lack of product understanding?
- Edward loads ALL pain points in Notion `Work HQ NEOMAAA > Support > Pain Points Log`, unfiltered.

**Days 4-5 — Observation and mental adjustment:**
- Sales pipeline (Skale) starts showing patterns. Edward reports Tuesday and Thursday at dealing sync: what objections repeat, what type of client converts, what channel brings qualified leads.
- **Pepe identifies toxic flow early** (scalping/arbitrage clients). Records in MT5 Manager with `flow-review` tag. No action yet. Formal review Friday retro. See [A/B Book Policy](/content/en/executive/ab-book-policy).
- Finance Manager (or Yulia) reconciles PSPs first time: credited funds vs real settlements.

**Days 6-7 — First retrospective:**
- **Friday Week 1, 16:00 UAE, 90 min.** Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward + Marketing/Finance.
- What broke? What worked? (Not "what I would improve" — that is week 2).
- Critical fixes deploy weekend: only blocking bugs, nothing more. Dev team (Alex A/B/Gleb/Dimitri) executes.
- Week report to Principals: KPIs, wins, problems, pending decisions → Notion.

**Week 1 red flags — any triggers extraordinary meeting:**

| Red flag | NEOMAAA decision trigger | Immediate action |
|---|---|---|
| MT5 down >2h accumulated total | **Stanislav + Pepe + Diego** emergency call | Review Equinix provider + failover |
| PSP fails >20% transactions | **Yulia + Finance Mgr** call PSP account manager | Pause that PSP, activate backup |
| FTD rate <10% sustained 3 days | Automatic trigger: **meeting Diego + Angel + Edward + Marketing immediately** (<24h) | Review end-to-end funnel |
| FTDs <40 first week (below minimum) | **Trigger: meeting Diego + Angel + Edward immediately** | Review messaging + channels + ICP |
| >5 clients threaten to go to social media/regulator | **Pepe + Susana take control** | Response plan <4h. Activate [Crisis Manual](/content/en/operations/manual-crisis). |
| Any compliance incident | **Susana pauses related activity** | Report to Principals <24h. AOFA notification if applicable. |

**What NOT to do in week 1:**
- DO NOT launch new ad campaigns
- DO NOT hire new people (or accelerate existing processes)
- DO NOT change pricing, commissions, spreads, product
- DO NOT promise new features to clients
- DO NOT make "kill" decisions for a channel — too early

> [!WARNING]
> Week 1 is the most dangerous for emotional decisions. Any principal (Diego, Angel, Yulia, Stanislav) who says "this is not working, let's change X" on Tuesday must hear "let it run until Friday". No exceptions. Owner of enforcing this rule: **Angel**.

### Week 2 — Stabilization

**Objective:** fix critical fires identified week 1, start scaling what worked.
**NEOMAAA week 2 target:** accumulated FTDs 150-250, retention week 1 FTDs >35%, CSAT >80%.

**What is done:**
- Deploy critical fixes identified in Friday retro. Prioritize bugs affecting conversion/retention, not cosmetic UX. Owner: Alex A/B/Gleb/Dimitri (dev) + Stanislav (sign-off).
- Ad channel with acceptable CAC + qualified lead volume → **scale budget 20%**. Not 100%, not 50% — **20%**. Owner: Marketing Mgr.
- Ad channel not working → **PAUSE, do not kill**. Kill day 30.
- **1:1 with top 5 clients by volume** — Pepe + Edward. Qualitative feedback. 20 min each.
- Review sales funnel by agent (Franco, Luis, Rocio, Marilyn support/sales): % assigned leads convert to FTD, time to first contact, reasons for no close. Owner: Edward.
- Support: review FRT per agent, escalation rate, recurring tickets. Owner: Edward.

**Week 2 KPI focus:**
- Week 1 FTD cohort retention — first real product-market fit signal.
- Realistic CAC per channel with 2 weeks of data.
- Recurring ticket volume: same ticket 5+ times → pending product fix or FAQ.

**Week 2 red flags:**

| Red flag | NEOMAAA decision trigger |
|---|---|
| Week 1 cohort retention <30% | **Meeting Edward + Pepe + Susana + Marketing <48h.** Product, onboarding, or sold expectations problem? |
| Blended CAC > projected early LTV | Burning money. **Marketing + Finance Mgr** pause worst channels. Review messaging. |
| Ticket volume growing day over day | Product breaking or bad communication. **Root cause analysis <48h — Edward + dev team.** |
| 10+ clients with same complaint | Real bug or critical missing feature. **Dev (Alex A/B) prioritizes over everything.** Stanislav sign-off. |

> [!TIP]
> The 1:1 with top 5 clients week 2 is the most valuable source of qualitative feedback in month 1. 20 min per client, fixed agenda: what worked, what broke, what did you expect, would you recommend us. **Pepe + Edward do the call together** — Pepe brings dealing credibility, Edward closes actionable feedback. Notes to Notion.

### Week 3 — Optimization

**Objective:** move the needle on KPIs. Seriously optimize.
**NEOMAAA week 3 target:** accumulated FTDs 225-400, projected LTV:CAC >2:1, stable MT5 daily volume.

**What is done:**
- A/B testing landings if there is volume (minimum 500 visits/variant/week). Owner: Marketing Mgr + Alex A/B.
- Refine ICPs based on real data: what type converts, what churns, what generates more volume. Owner: Edward + Marketing.
- Review sales commission scheme (Franco, Luis, Rocio, Marilyn): aligned with desired behavior? If we reward only FTD, it optimizes small FTD volume. If we reward FTD + 30d retention, it aligns with LTV. Owner: Edward + Angel.
- Activate referral program if not in place. Owner: Edward + `[DATA: Partner Manager to hire]`. See [partners program](/content/en/partners/programa).
- First educational retention content: "first 30 days" guide, MT5 webinar, spread/commission explainer. Owner: Marketing Mgr.

**Critical decisions (week 3 Friday retro):**

<div className="neo-step-list">

**Which channel do we definitively kill?** CAC >2x the best channel + insufficient volume for 3 weeks → turn off. Owner decision: Diego + Marketing.

**Which channel do we 2x investment?** Acceptable CAC + good lead quality + capacity to scale → double budget month 2. Owner: Diego + Angel.

**Do we hire 1 more support or wait?** Tickets/active client >1 sustained → hire. <0.5 → wait. Owner decision: Edward + Yulia.

**Do we open a new market?** Only if current market with retention >40% + stable FTD rate. See [progressive scaling](#progressive-scaling). Owner decision: Diego + Angel + Susana (compliance review of new market).

</div>

> [!INFO]
> Week 3 is when Principals start asking for month 2 projections. **Rule: month 2 plan is not presented until week 4 Friday, with complete month 1 data.** Any projection before that is guesswork. Angel enforces.

### Week 4 — Reset

**Objective:** first "month in review" + month 2 plan.
**NEOMAAA month 1 target:** **300–500 accumulated FTDs**, LTV:CAC >2:1, monthly MT5 uptime >99.5%, CSAT >80%, 0 regulatory incidents.

**Month 1 final deliverables:**

<div className="neo-step-list">

**1. Complete launch report** — Board presentation (20-30 slides). Monthly KPIs, complete funnel, comparison vs original plan, real unit economics. Owner: Finance Mgr + Angel.

**2. Final month KPIs vs target** — clear table: original target, real result, % achievement, gap explanation. Owner: Finance Mgr.

**3. Decisions made and pending** — complete month 1 log. Pending ones scheduled with month 2 deadline. Owner: Angel (facilitates retro).

**4. Lessons learned** — good / bad / ugly. Without diplomacy. Owner: Diego (brings tough vision).

**5. Month 2 plan with updated OKRs** — objectives by department, owner, deadline. Owner: Angel + each Head.

**6. Reassigned month 2 budget** — based on real CAC + lead quality month 1. Owner: Finance Mgr + Marketing + Diego sign-off.

</div>

**Month 2 planning meeting:**
- **Day:** Friday week 4, 10:00 UAE
- **Duration:** 4 hours
- **Participants:** Diego, Angel, Yulia, Stanislav + Pepe, Susana, Edward, Finance Mgr, Marketing Mgr
- **Output:** month 2 roadmap in Notion + numeric targets + assigned budget + OKRs with owner

> [!WARNING]
> The month 2 meeting is NOT optional and is NOT shortened. Without this formal close, the team enters month 2 with the month 1 plan that no longer applies. Skipping this close guarantees month 2 is an improvised copy of month 1. Enforcement owner: **Angel**.

---

## Critical early decisions (triggers)

During month 1, there are triggers that DO NOT wait for Friday retro. When they happen, you act.

| Trigger | NEOMAAA immediate decision | Action owner |
|---|---|---|
| FTDs <40 first week | Urgent meeting **Diego + Angel + Edward + Marketing <24h**. Pause worst channel. Review messaging. | Diego convenes |
| FTD rate <10% day 5 | Pause ads worst channel. Review funnel. Meeting dealing + sales + marketing. | Marketing + Edward |
| CAC >3x projected early LTV | Pause channel. Investigate lead quality + conversion + messaging. | Marketing + Finance |
| Support tickets >1.5/active client | Support overloaded. Options: hire agent, simplify product, improve FAQ/videos. | Edward convenes meeting |
| 10+ clients same complaint | Bug or critical missing feature. **Dev (Alex A/B) prioritizes over everything.** | Stanislav sign-off |
| Regulator contacts (AOFA or any other) | **Susana takes exclusive control.** Pause related activities. Principals informed <4h. | Susana → Angel → Diego |
| PSP blocks broker funds | Activate [Crisis Manual](/content/en/operations/manual-crisis). Backup PSP <24h. | Yulia + Finance Mgr |
| VIP client ($10k+ deposits) threatens to leave | **Pepe + Diego personal call <24h.** Retention priority #1. | Edward escalates |
| Partner/IB formally complains | **Partner Manager** or **Edward/Diego** if no PM contacts <24h. | Edward / Diego |
| Viral negative content on Telegram/Twitter/Instagram | **Marketing + Diego + Angel** set up comm plan <12h. Do not respond hot. | Marketing + Diego |
| Chargeback rate >1% weekly | **Yulia + Susana.** Review origin. Risk of losing PSP. | Yulia |

> [!DANGER]
> If 3+ triggers activate in the same week = **Principals crisis meeting <24h** (Diego + Angel + Yulia + Stanislav). It is not "bad luck", it is a structural signal. See [Crisis Manual](/content/en/operations/manual-crisis) + [Financial Controls](/content/en/executive/financial-controls).

---

## Progressive scaling

Nothing new is opened in month 1 "because it is obvious". Each expansion requires clear criteria.

### Open new geographic market

Conditions (ALL must be met):
- Current market with retention >40% and stable FTD rate 2+ weeks
- Language support resource available (1 native agent of the new market). Edward evaluates.
- Operational local PSP tested (PIX Brazil, SPEI Mexico, PSE Colombia, local banks Spain). Yulia confirms.
- New market ad plan with budget + localized landing (ES, PT-BR, RU as applicable). Marketing Mgr.
- **Compliance review of the new market** — Susana confirms: not on restricted list (USA/Canada/EEA/UK/Australia/Cuba/Iraq/Myanmar/North Korea/Sudan), KYC documentation adequate to AOFA L15968/N.

### Hire new role

- Current role working >50h/week sustained 2+ weeks
- Budget available: month 1 LTV supports the cost 6+ months. Finance Mgr validates.
- Candidate identified, ready for onboarding <2 weeks
- [Role onboarding](/content/en/hiring) documented (without doc, the hire loses the first month)

### Open new product

- Current product stable: churn <10%/month + tickets <0.5/active client
- Demand confirmed: 30+ existing clients explicitly asked (Edward validates with Skale)
- **Compliance (Susana) approved new product under AOFA L15968/N license**
- Dev team with real capacity (not "we could if..."). Alex A/B/Gleb/Dimitri commit.

> [!TIP]
> Temptation to open new things in month 1 is constant — "we have demand in Colombia", "we should offer Fireblocks crypto staking". Rule: if it does not meet ALL criteria, it is scheduled month 2 or 3. Opening something with unstable base product = fastest way to lose the launch.

---

## Failed launch red flags

If at the close of any week **THREE or more** of these signals are seen, **Principals crisis meeting** is convened (Diego + Angel + Yulia + Stanislav) and approach is rethought:

- FTD rate <10% sustained 2 consecutive weeks
- Retention <25% week 1 cohort
- NPS <0 (more detractors than promoters)
- Churn >50% at month 1
- Cost per FTD >$500 blended
- Blended CAC >$200
- Support tickets >2/active client
- Any serious compliance incident (AOFA notification, regulatory complaint, AML escalation)
- Net financial loss > planned launch burn

If **FIVE or more** are seen → rethink complete launch. Not "pivot feature" or "change messaging". Review approach: positioning, market, product, unit economics. Better honest reset at end of month 1 than dragging broken launch 3 more months.

> [!DANGER]
> Worst month 1 result is not clear failure — it is unnoticed mediocre. Clear failure forces review. Mediocre generates "let's keep trying" for 4 months burning cash. Discipline: recognize the mediocre and treat it like failure. Verdict owner: **Diego**.

---

## Weekly retrospective — standard format

**Day:** Friday 16:00 UAE (90 min, no exceptions)
**Participants:** Principals (Diego, Angel, Yulia, Stanislav) + Heads (Pepe Dealing, Susana Compliance, Edward Sales/Support, Finance Mgr, Marketing Mgr)
**Facilitator:** rotates Angel / Diego

### Fixed agenda (90 min)

| Block | Duration | Owner |
|---|---|---|
| Review KPIs vs target | 15 min | Finance Manager |
| What went well | 15 min | Rotating per Head |
| What went wrong | 20 min | Rotating per Head |
| What we'll change next week | 15 min | Facilitator (Angel/Diego) |
| Pending decisions | 15 min | Principals |
| Resource asks | 10 min | Each Head |

### Retro output

Immediately after:
- Retro doc in Notion `Work HQ NEOMAAA > Launch > Retros` (fixed template): summary, decisions, actions with owner + deadline
- Actions flag P0/P1/P2
- Adjustments to monthly targets if applicable (document change + reason)

> [!INFO]
> Friday retro = only meeting in month 1 where absence has a cost. Principal or Head who cannot attend sends delegate with decision authority. Retro without quorum → re-scheduled Saturday.

---

## Milestone celebration

Launch is not just numbers — the team (16 NEOMAAA people) needs visible wins.

| Milestone | Celebration |
|---|---|
| 100 accumulated FTDs | Team gift (premium merch + symbolic bonus) |
| $100k monthly trading volume | Monetary bonus to team (pool distributed by Head) |
| $250k monthly volume | Second bonus, larger |
| $1M monthly volume | Team trip (Dubai, Buenos Aires, destination to choose) |
| First VIP client ($50k+ monthly volume) | Public recognition to agent (Franco/Luis/Rocio/Marilyn) + retention bonus |

Announcements in Telegram `#neomaaa-general`. External communication only when numbers are comfortable to defend publicly (owner: Diego + Marketing).

---

## Month 1 close

Month 1 does not end with "live" launch. It ends with:
- Real data 30 complete days
- Documented month 2 plan (OKRs, budget, hiring, expansion)
- Team aligned with clarity of priorities
- Principals with unified vision of state

If those 4 conditions are met, month 2 starts with real momentum. If any fails, month 2 is improvised continuation of month 1 — difference between a broker that scales and one that stagnates.

Month 1 discipline is not optional. It is the foundation on which all of NEOMAAA Markets is built.

---

> [!INFO]
> **Related documents:**
> - [Go-Live Runbook + Pre-launch Master Checklist](/content/en/operations/go-live-runbook) — Day D minute by minute + 6 pre-launch blocks
> - [Crisis Manual](/content/en/operations/manual-crisis) — when triggers are not enough
> - [Financial Controls](/content/en/executive/financial-controls) — P&L dashboards and reconciliations
> - [Compliance Calendar](/content/en/compliance/compliance-calendar) — AOFA L15968/N obligations
> - [A/B Book Policy](/content/en/executive/ab-book-policy) — toxic flow and risk management
> - [Ticket Management](/content/en/support/gestion-tickets) — support SLAs
> - [Partners Program](/content/en/partners/programa) — IBs and affiliates

*Internal document of NEOMAAA Markets — Neomaaa Ltd L15968/N AOFA Anjouan.*
*Revision: after each launch. Owner: Angel Ortega + Diego Loyola.*
