# Complaint Handling Protocol — NEOMAAA Markets

**Internal document — Support, Compliance and Management Teams**
**Version:** 1.0
**Last updated:** April 2026
**Applies to:** Rocio, Marilyn (support), Susana (compliance), Edward (sales lead)

---

## TABLE OF CONTENTS

1. [Complaint Definition and Classification](#1-complaint-definition-and-classification)
2. [Formal Complaint Handling Process](#2-formal-complaint-handling-process)
3. [Severity Levels](#3-severity-levels)
4. [Complaint SLAs](#4-complaint-slas)
5. [Scripts by Complaint Type](#5-scripts-by-complaint-type)
6. [Logging and Documentation](#6-logging-and-documentation)
7. [Analysis and Prevention](#7-analysis-and-prevention)
8. [Regulatory and Legal Complaints](#8-regulatory-and-legal-complaints)
9. [Compensation and Goodwill](#9-compensation-and-goodwill)
10. [Complaint Management Metrics](#10-complaint-management-metrics)

---

## 1. Complaint Definition and Classification

### 1.1 What Is a Complaint

A complaint is any expression of dissatisfaction from a client about a service, product, process, or treatment received from NEOMAAA Markets, that requires a response or corrective action.

**Difference between inquiry and complaint:**

| Type | Example | Treatment |
|------|---------|-------------|
| **Inquiry** | "How long do withdrawals take?" | Informational response, normal support flow |
| **Operational complaint** | "My withdrawal has taken 5 days and they're not responding" | Complaint protocol level 1 |
| **Serious complaint** | "They charged me a commission that they shouldn't" | Complaint protocol level 2 |
| **Regulatory complaint** | "I'm going to report you to the regulator" | Complaint protocol level 3 — escalate to compliance immediately |

### 1.2 Classification by Category

| Category | Description | Examples |
|-----------|------------|---------|
| **Deposits/Withdrawals** | Money movement issues | Delayed withdrawal, unacknowledged deposit, unexpected fee |
| **Execution** | Trading operation issues | Excessive slippage, requotes, unexecuted orders, stop loss not respected |
| **Platform** | Technical MT5 issues | Platform crash, disconnections, login errors |
| **Customer service** | Dissatisfaction with service received | Slow response, incorrect information, inappropriate treatment |
| **KYC/Account** | Verification or configuration issues | KYC rejected without clear reason, account blocked, incorrect data |
| **Commissions/Spreads** | Cost discrepancies | Spread higher than advertised, undisclosed commissions, incorrect swaps |
| **Compliance** | Regulatory-nature complaints | Improper use of data, performance promises by an agent, undue pressure |

---

## 2. Formal Complaint Handling Process

### 2.1 The 7 Stages

```
RECEIPT → ACKNOWLEDGMENT → CLASSIFICATION → INVESTIGATION → RESOLUTION → COMMUNICATION → FOLLOW-UP
   (1)       (2)              (3)             (4)             (5)          (6)              (7)
```

### Stage 1: Receipt

**Who:** Support agent (L1)
**Time:** Immediate upon receiving complaint

**Actions:**
1. Identify that it's a complaint (not an inquiry)
2. Log in Intercom with `complaint` tag
3. Assign initial priority per severity matrix (section 3)
4. Document verbatim what the client reports — without interpreting or summarizing

**What to tell the client:**
```
Hi [name], I've received your complaint and I want you to know we take it 
very seriously. I'll document everything you've shared with me and 
make sure it receives proper attention.
```

### Stage 2: Acknowledgment of Receipt

**Who:** Support agent (L1)
**Time:** Within the first 30 minutes from receipt

**Actions:**
1. Send formal confirmation to client with case number
2. Inform estimated investigation time by severity
3. Provide follow-up channel

**Acknowledgment template:**
```
Hi [name],

Confirming receipt of your complaint related to [summarized topic].

Your case number is: #[ticket_number]

Our team is reviewing your case. I'll provide an update 
within [time per severity].

If you have additional information that could help the investigation 
(screenshots, receipts, transaction numbers), please send them here.

[Agent name]
NEOMAAA Markets — Support
```

### Stage 3: Classification

**Who:** L1 agent (level 1 complaints) or Susana/Edward (levels 2-3)
**Time:** Within 1 hour from receipt

**Actions:**
1. Assign category (section 1.2)
2. Assign severity level (section 3)
3. Determine if escalation is required
4. Assign investigation responsible
5. Update tags in Intercom: `complaint` + `complaint-[category]` + `severity-[level]`

### Stage 4: Investigation

**Who:** Assigned responsible party by category

| Category | Primary Investigator | Consult to |
|-----------|----------------------|------------|
| Deposits/Withdrawals | Finance Manager | PSP, bank |
| Execution | Pepe (Dealing) | MT5 logs, liquidity provider |
| Platform | Pepe (Dealing) | Technical team |
| Customer service | Edward (Sales Lead) | Agent involved |
| KYC/Account | Susana (Compliance) | Sumsub |
| Commissions/Spreads | Pepe (Dealing) | MT5 logs |
| Compliance | Susana (Compliance) | Agent involved, records |

**Investigation process:**
1. Gather all available evidence (logs, tickets, recordings, CRM records)
2. Obtain version from internal team involved
3. Cross-reference client information with systems (Skale, MT5, Sumsub, PSP)
4. Determine if the complaint is valid, partially valid, or invalid
5. Document findings in internal ticket note

### Stage 5: Resolution

**Who:** Investigation responsible + approval from Edward or Susana if compensation is involved

**Resolution options:**

| Outcome | Action |
|-----------|--------|
| Valid complaint — NEOMAAA error | Correct the error + apology + compensation if applicable |
| Valid complaint — third-party error (PSP, bank) | Explain to client, offer alternatives, assist with resolution |
| Partially valid complaint | Correct what's appropriate, explain what isn't |
| Invalid complaint | Explain with data and evidence why, with respectful tone |

### Stage 6: Resolution Communication

**Who:** Original support agent (to maintain continuity)
**Time:** Per severity SLA

**Resolution template:**
```
Hi [name],

I want to give you an update on your case #[number].

After investigating your complaint about [problem summary], we found 
the following:

[Clear and factual explanation of what was found]

The resolution we've applied is:
[Description of corrective action]

[If compensation applies:] 
Additionally, as a gesture for the inconvenience caused, we have [compensation 
details].

If you're not satisfied with this resolution or have additional questions, 
please respond here. Your case will remain open until you confirm 
you're satisfied.

[Agent name]
NEOMAAA Markets — Support
```

### Stage 7: Follow-up

**Who:** Support agent
**Time:** 48 hours after communicating resolution, and then at 7 days

**Actions:**
1. Contact client to confirm satisfaction
2. If client doesn't respond in 48h, send reminder
3. If client confirms satisfaction, close ticket with `complaint-resolved` tag
4. If client is not satisfied, reopen investigation or escalate to higher level
5. At 7 days, send brief satisfaction survey

**Follow-up template:**
```
Hi [name],

I wanted to verify that your case #[number] was satisfactorily 
resolved.

The solution we applied was: [brief summary].

All good or is there anything else I can do for you?
```

---

## 3. Severity Levels

| Level | Name | Criterion | Example | Responsible |
|-------|--------|----------|---------|-------------|
| **1** | Low | Minor inconvenience, doesn't involve money | Slow response to an inquiry, confusing information | L1 Agent |
| **2** | Medium | Impacts operability, involves money but no loss | Delayed withdrawal (within SLA), slow deposit, temporary technical issue | L1 + L2 Agent |
| **3** | High | Potential or actual money loss, SLA breach | Withdrawal delayed beyond SLA, deposit not credited >48h, erroneous execution | L2 + Edward |
| **4** | Critical | Legal threat, regulator mention, significant financial loss, compliance complaint | "I'm going to report to the regulator", "They promised me profits", loss >$5,000 due to platform error | Susana + Principals |

---

## 4. Complaint SLAs

### Maximum Times per Level

| Level | Acknowledgment | First Update | Final Resolution |
|-------|----------------|----------------------|-----------------|
| 1 — Low | 30 minutes | 4 hours | 24 business hours |
| 2 — Medium | 30 minutes | 2 hours | 12 business hours |
| 3 — High | 15 minutes | 1 hour | 8 business hours |
| 4 — Critical | Immediate | 30 minutes | 4 business hours (initial action) |

### Automatic Escalation

| Condition | Action |
|-----------|--------|
| Complaint without acknowledgment in 30 min | Auto-escalate to Edward |
| Complaint without update at double the SLA | Auto-escalate to Principals via Susana |
| Client sent 3+ messages without response on a complaint | Reclassify as higher level |
| Complaint mentioning regulator, lawyer, or authorities | Automatic level 4, escalate to Susana immediately |

---

## 5. Scripts by Complaint Type

### 5.1 Delayed Withdrawal

```
Hi [name], I'm sorry about the delay with your withdrawal.

I've verified your request #[number] for $[amount] and its current 
status is [status]. I'm going to prioritize the review with our finance 
team right now.

I'll confirm an update within [time]. If I need additional information 
from you, I'll request it immediately.

I understand that waiting for your money causes anxiety and I want you 
to know that resolving it is our priority.
```

### 5.2 Unacknowledged Deposit

```
Hi [name], I understand your concern. Let's resolve this.

To trace your deposit I need:
1. Payment method used
2. Exact amount deposited
3. Approximate date and time
4. Transaction receipt (screenshot or TX hash if crypto)

With this information I'll verify directly with the payment processor. 
I'll confirm the result in [time].
```

### 5.3 Execution Issue

```
Hi [name], I'm noting your report about the execution of your trade.

To investigate I need the following data:
- MT5 account number
- Order/ticket number of the trade
- Instrument traded (pair, index, etc.)
- Exact time of the trade
- What you expected vs. what happened
- Screenshot if you have one

This type of report is reviewed by our dealing team with access 
to execution logs. I'll give you a result within [time].
```

### 5.4 Inappropriate Agent Treatment

```
Hi [name], I'm sorry about the experience you describe.

I take this type of feedback very seriously. I'll review the conversation 
with the team and make sure the necessary measures are taken.

Can I help you now with what you needed to resolve originally? 
I want to make sure your inquiry is resolved in addition to addressing 
your complaint.
```

### 5.5 Unexpected Commissions or Charges

```
Hi [name], I understand your concern about the charges on your account.

I've verified your MT5 account #[number] and found the following:
[Detail the charges and their source — swap, commission, spread, etc.]

[If the charge is correct:]
This charge corresponds to [explanation]. It's a standard condition that 
applies to [circumstance]. You can verify the conditions of each 
instrument in MT5 by right-clicking > Specification.

[If the charge is incorrect:]
I've identified a discrepancy in [detail]. I'm escalating this case 
to have it corrected as soon as possible. I'll confirm when the 
adjustment is applied.
```

### 5.6 Repeat Complaint / Client Unsatisfied With Previous Resolution

```
Hi [name], I see this topic wasn't resolved to your satisfaction 
in your previous case #[number].

I want to hear directly from you what's missing for this to be 
properly resolved. I'll review your full case history and 
commit to giving you a definitive response in [time].

Your satisfaction is important to us and I don't want this to be 
left unresolved.
```

---

## 6. Logging and Documentation

### 6.1 Mandatory Data on Every Complaint

Every complaint ticket in Intercom must have:

| Field | Mandatory | Example |
|-------|-------------|---------|
| `complaint` tag | Yes | — |
| Category tag | Yes | `complaint-withdrawal`, `complaint-execution` |
| Severity tag | Yes | `severity-1`, `severity-2`, `severity-3`, `severity-4` |
| MT5 account number | Yes (if account exists) | 12345678 |
| Textual client description | Yes | Copy verbatim |
| Receipt date | Yes (automatic) | — |
| Assigned agent | Yes | Rocio |
| Investigation status | Yes | pending / in progress / resolved / closed |
| Investigation outcome | Yes (at resolution) | valid / invalid / partial |
| Corrective action applied | Yes (if applicable) | Balance adjustment, compensation, apology |
| Resolution date | Yes | — |
| Client satisfaction confirmation | Yes | Yes / No / No response |

### 6.2 Monthly Complaint Log

Edward must maintain a monthly log with:

| Data | Purpose |
|------|-----------|
| Total complaints received | Volume |
| Complaints by category | Detect problem areas |
| Complaints by severity | Measure gravity |
| Average resolution time | Efficiency |
| % of complaints resolved within SLA | Compliance |
| % of clients satisfied with resolution | Quality |
| Repeat complaints from the same client | Detect systemic issues |
| Complaints escalated to level 4 | Regulatory risk |

---

## 7. Analysis and Prevention

### 7.1 Monthly Complaint Review

**Frequency:** First Monday of each month
**Participants:** Edward, Susana, support representative
**Duration:** 30 minutes

**Agenda:**
1. Review monthly metrics (section 10)
2. Top 3 complaint categories — what's causing them?
3. Recurring complaints — is there a systemic issue?
4. Preventive actions for the following month
5. Recognize improvements achieved

### 7.2 Common Preventive Actions

| Recurring Complaint | Preventive Action |
|-----------------|-------------------|
| Delayed withdrawals | Review process with PSP, improve proactive communication |
| Unacknowledged deposits | Improve deposit guides, add automatic alerts |
| Bad execution | Review configuration with liquidity provider, audit logs |
| Incorrect agent information | Training session, update internal documentation |
| Long response time | Review workload, consider third agent |

---

## 8. Regulatory and Legal Complaints

### 8.1 Definition

A regulatory complaint is any complaint that:
- Mentions the regulator (AOFA, or any other)
- Mentions lawyers or legal actions
- Involves allegations of fraud, manipulation, or deception
- Mentions data protection or privacy
- Comes directly from the regulator or an authority

### 8.2 Immediate Protocol

1. **Stop any response on the merits.** Only confirm receipt.
2. **Document verbatim** everything the client has said/written.
3. **Escalate to Susana immediately** via Slack + email with subject: "REGULATORY COMPLAINT — [client name] — #[ticket]"
4. **Don't discuss, don't argue, don't promise.** Only acknowledge receipt.
5. **Susana takes control of the case** within the next 2 hours.

**Acknowledgment script for regulatory complaints:**
```
Hi [name],

I've received your communication and I take it with the seriousness it deserves.

Your case has been transferred to our compliance team, which will 
contact you directly. Your case number is #[number].

[Agent name]
NEOMAAA Markets
```

**What the support agent should NOT do:**
- Don't opine on whether the complaint has merit
- Don't give legal or regulatory explanations
- Don't promise compensation or resolutions
- Don't ask the client "not to escalate"
- Don't minimize the complaint

### 8.3 Complaints Before the Regulator (AOFA)

If NEOMAAA receives a formal complaint from AOFA:
1. Susana coordinates the response with Principals
2. Response deadline per AOFA requirements
3. All communication with the regulator goes through Susana
4. Documented in the compliance log separately from the operational complaint log

---

## 9. Compensation and Goodwill

### 9.1 Who Can Authorize

| Compensation Type | Maximum Amount | Who Authorizes |
|---------------------|-------------|----------------|
| Formal apology (no economic compensation) | $0 | L1 Agent |
| Commission or swap reversal | Up to $50 USD | Edward |
| Goodwill credit to account | Up to $100 USD | Edward + Susana |
| Goodwill credit > $100 | No limit | Principals |
| Balance adjustment for verified error | Amount of the error | Finance Manager + Susana |

### 9.2 Criteria for Compensation

| Criterion | Compensation Applies | Doesn't Apply |
|----------|-------------------|-----------|
| Verified NEOMAAA error (unacknowledged deposit, erroneous execution) | Yes — error amount + goodwill | — |
| Delay beyond SLA without proactive communication | Yes — proportional goodwill | — |
| Client error (sent to wrong network, bad order) | No — but assist as possible | Yes |
| Normal market conditions (slippage, gap) | No | Yes |
| Complaint about agent treatment | Formal apology, possible goodwill | — |

### 9.3 Compensation Documentation

All compensation must be logged with:
- Ticket number
- Compensated amount
- Reason for compensation
- Who authorized it
- Date

[REVIEW: Define compensation log template in Skale CRM]

---

## 10. Complaint Management Metrics

### Monthly KPIs

| Indicator | Target | Formula |
|-----------|------|---------|
| Total complaints | Descending trend | Monthly count |
| Resolution rate within SLA | >90% | Complaints resolved within SLA / Total complaints |
| Client satisfaction with resolution | >80% | Positive responses / Total responses |
| Level 4 (critical) complaints | <2 per month | Monthly count |
| Repeat complaints from same client | <5% | Clients with 2+ complaints / Total clients with complaints |
| Average resolution time | Level 1: <24h, Level 2: <12h, Level 3: <8h | Average |
| Compensation rate | Tracking (no fixed target) | Compensations / Total complaints |

### Weekly Complaint Report (Edward)

```
WEEKLY COMPLAINT REPORT — Week [#]

New complaints: ___
Resolved complaints: ___
Pending complaints: ___
Complaints escalated to level 3-4: ___

Top categories:
1. ___
2. ___
3. ___

Complaints out of SLA: ___
Compensations granted: $___

Corrective actions in progress:
- ___
```

---

*Document prepared for NEOMAAA Markets internal use.*
*Every complaint should be treated as an opportunity to improve and strengthen the client relationship.*
*Mandatory quarterly review.* [REVIEW: Schedule first quarterly review]
