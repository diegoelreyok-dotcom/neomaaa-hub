# VIP Customer Care Protocol — NEOMAAA Markets

**Internal document — Support, Sales and Account Management Teams**
**Version:** 1.0
**Last updated:** April 2026
**Applies to:** Rocio, Marilyn (support/account management), Edward (sales lead)

---

## TABLE OF CONTENTS

1. [VIP Client Definition](#1-vip-client-definition)
2. [VIP Service Tiers](#2-vip-service-tiers)
3. [Differentiated SLAs](#3-differentiated-slas)
4. [Dedicated Account Management](#4-dedicated-account-management)
5. [Proactive Outreach](#5-proactive-outreach)
6. [VIP Onboarding Process](#6-vip-onboarding-process)
7. [VIP Complaint Handling](#7-vip-complaint-handling)
8. [VIP Client Retention](#8-vip-client-retention)
9. [Tools and Configuration](#9-tools-and-configuration)
10. [VIP Metrics](#10-vip-metrics)

---

## 1. VIP Client Definition

### 1.1 Classification Criteria

A client is classified as VIP when they meet at least one of the following criteria:

| Criterion | Threshold | Verification |
|----------|--------|-------------|
| **Cumulative deposit** | $5,000 USD or more | Skale CRM (total_deposits) |
| **Account type** | Institutional ($50,000+ deposit) | Skale CRM (account_type) |
| **Monthly trading volume** | 50+ standard lots/month | MT5 Admin |
| **Active referrals** | 5+ referred clients who have deposited | IB program in Skale |
| **Strategic potential** | Client with demonstrable high-value potential | Edward/Principals assessment |

### 1.2 VIP Tiers

| Tier | Name | Criterion | Benefits |
|-------|--------|----------|-----------|
| **VIP Silver** | $5,000 - $14,999 cumulative deposit | Enhanced SLA, preferred contact | Section 2 |
| **VIP Gold** | $15,000 - $49,999 cumulative deposit | Silver + dedicated account manager, improved terms | Section 2 |
| **VIP Platinum** | $50,000+ cumulative deposit (Institutional) | Gold + personalized terms, direct line | Section 2 |

### 1.3 VIP Activation Process

1. Skale CRM detects when the client crosses the deposit threshold
2. `vip` tag and corresponding tier are added in Intercom
3. Edward and assigned support agent are notified
4. Account manager is assigned (Rocio or Marilyn)
5. Account manager makes first VIP contact within 24 hours
6. Intercom configuration is updated (automatic high priority)

---

## 2. VIP Service Tiers

### 2.1 VIP Silver ($5K - $15K)

| Service | Detail |
|----------|---------|
| **Response SLA** | First response within 10 minutes (chat), 1 hour (email) |
| **Queue priority** | Tickets are automatically positioned at the front of the queue |
| **Proactive notification** | Maintenance and change notices 24h in advance |
| **Withdrawal tracking** | Proactive status confirmation every 12 hours |
| **Monthly contact** | 1 monthly call/message from the team to check satisfaction |

### 2.2 VIP Gold ($15K - $50K)

| Service | Detail |
|----------|---------|
| All Silver + | — |
| **Dedicated account manager** | Rocio or Marilyn as single point of contact |
| **Direct WhatsApp line** | Account manager number for direct inquiries |
| **Quarterly review** | 15-minute call to review experience and needs |
| **Trading conditions** | Review of spreads/commissions if volume justifies it [REVIEW: Confirm with Principals the improved conditions available] |
| **Withdrawal priority** | Priority processing — same day during business hours |

### 2.3 VIP Platinum ($50K+)

| Service | Detail |
|----------|---------|
| All Gold + | — |
| **Personalized conditions** | Spreads, commissions and leverage negotiated individually |
| **Dedicated account manager** | Single point of contact for everything |
| **Direct line with Dealing** | Access to Pepe for execution inquiries |
| **Custom reports** | Monthly activity and performance summary |
| **Premium onboarding** | 1-on-1 session for MT5, VPS, and tools configuration |
| **Beta features invitation** | First access to new features |

---

## 3. Differentiated SLAs

### 3.1 SLA Comparison

| Metric | Regular Client | VIP Silver | VIP Gold | VIP Platinum |
|---------|----------------|------------|----------|-------------|
| First response (chat) | 5 min during business hours | 3 min | 2 min | 1 min |
| First response (email) | 2-4 hours | 1 hour | 30 min | 15 min |
| Standard ticket resolution | 24 business hours | 12 business hours | 8 business hours | 4 business hours |
| Withdrawal processing | 1-3 business days | 1-2 business days | Same business day | Same business day (highest priority) |
| Escalation time | 15 min at L1 | 10 min | 5 min | Immediate to L2 |

### 3.2 SLA Breach Protocol

If a VIP SLA is not met:

1. Agent notifies Edward immediately
2. Edward contacts the client with apology and explanation
3. The breach is documented in the VIP record
4. Root cause is analyzed in the weekly meeting
5. If recurring, resource allocation is reviewed

---

## 4. Dedicated Account Management

### 4.1 VIP Account Manager Role

The account manager (Rocio or Marilyn) is the primary point of contact for Gold and Platinum clients.

**Responsibilities:**

| Responsibility | Frequency |
|----------------|-----------|
| Respond to direct client inquiries | Daily |
| Proactive follow-up contact | Weekly (Gold), 2x weekly (Platinum) |
| Verify withdrawals are processed on time | Each request |
| Coordinate with Dealing for execution queries | As needed |
| Inform client about news and new features | Monthly |
| Prepare and send activity report (Platinum) | Monthly |
| Quarterly review with the client | Quarterly |
| Log every interaction in Skale CRM | Each contact |

### 4.2 Client Knowledge

The account manager must maintain an up-to-date profile for each VIP client:

| Data | Where to Record |
|------|----------------|
| Full name and country | Skale CRM |
| Account type and current balance | MT5 Admin |
| Most-traded instruments | MT5 Admin (history) |
| Trading style (scalper, swing, EA) | Notes in Skale CRM |
| Usual trading hours | Observation |
| Preferred communication channel | Notes in Skale CRM |
| History of complaints or issues | Intercom |
| Date and amount of last deposit | Skale CRM |
| Date of last proactive contact | Notes in Skale CRM |
| Special needs or requests | Notes in Skale CRM |

### 4.3 Interaction Rules

- **Personalization:** Know the client by name, know what they trade, remember past interactions
- **Proactivity:** Don't wait for the client to have a problem to reach out
- **Availability:** Respond within SLA even if you don't have the answer — acknowledge receipt and give estimated time
- **Honesty:** If something can't be done, say it directly with an alternative
- **Confidentiality:** Never share information about one VIP client with another client

---

## 5. Proactive Outreach

### 5.1 Touchpoint Calendar

| Event | Action | Owner | Channel |
|--------|--------|-------------|-------|
| Client crosses VIP threshold | VIP welcome + account manager introduction | Account manager | WhatsApp + Email |
| 7 days after VIP | Check experience, offer VPS setup if applicable | Account manager | WhatsApp |
| Every Monday | Review VIP clients with no activity for 5+ days | Account manager | Internal |
| First day of the month | Previous month summary + news (Platinum) | Account manager | Email |
| Post-large deposit (>$5K) | Thank you + verify everything works | Account manager | WhatsApp |
| Post-large withdrawal | Verify receipt + offer assistance | Account manager | WhatsApp |
| Client birthday | Congratulations message (if data available) | Account manager | WhatsApp |
| New feature launched | Personalized notification | Account manager | Email + WhatsApp |

### 5.2 Proactive Outreach Scripts

**VIP Welcome:**
```
Hi [name], I'm [account manager] from NEOMAAA Markets.

I wanted to introduce myself personally — I'm your dedicated contact 
from now on. This means you have a direct line with me for any 
inquiry, request, or need you may have.

My contact details:
- WhatsApp: [number]
- Email: [email]
- Hours: [schedule]

Is there anything I can help you with today? If your experience so far 
has been good, I'd love to hear it. And if there's something to improve, 
I want to know as well.
```

**Weekly follow-up:**
```
Hi [name], this is [account manager].

I wanted to check that everything is working well with your account.
I noticed you [traded actively this week / haven't traded in a few days].

[If traded:] Do you need anything regarding the platform or your trading?
[If not traded:] Everything okay? If you need assistance with anything, I'm here.
```

**Post-large deposit:**
```
Hi [name], confirming that your deposit of $[amount] has been credited 
to your MT5 account.

If you need any adjustment to your setup (leverage, VPS, or anything 
else), let me know and we'll coordinate.
```

---

## 6. VIP Onboarding Process

### 6.1 For Clients Who Open Accounts Directly as VIP (Raw or Institutional)

**Day 1 — Registration and KYC:**
1. Sales guides registration with personalized attention
2. KYC is prioritized in Sumsub — Susana reviews manually if needed
3. Once approved, account manager introduces themselves within 2 hours

**Day 1-2 — Setup:**
1. Account manager verifies MT5 is correctly configured
2. If the client uses EAs, VPS and setup assistance are offered
3. Available deposit methods for their country are verified
4. First deposit is guided

**Day 3-5 — First week:**
1. Verify that the first trade was executed correctly
2. Offer demonstration of advanced features (Copy Trading, Vault)
3. Ask if there are any doubts or additional needs

**Day 7 — Check-in:**
1. Follow-up call or message
2. Evaluate initial satisfaction
3. Document feedback

### 6.2 For Clients Who Become VIP (Cumulative Deposits)

1. Account manager formally introduces themselves
2. Explain benefits of the VIP tier reached
3. Offer trading conditions review if applicable
4. Establish preferred communication channel

---

## 7. VIP Complaint Handling

### 7.1 Differences from the Regular Protocol

| Aspect | Regular Client | VIP Client |
|---------|----------------|-------------|
| First contact post-complaint | Support agent | Account manager (directly) |
| Acknowledgment time | 30 min | 15 min |
| Investigation | Standard process | Highest priority |
| Progress communication | Each update SLA | Every 2 hours minimum |
| Closure | Via Intercom | Account manager call |
| Post-resolution follow-up | 48h later | 24h later + 7 days |

### 7.2 VIP Complaint Protocol

1. Account manager takes control of the case immediately
2. Contacts the client directly via their preferred channel
3. Escalates internally with top priority
4. Communicates progress every 2 hours minimum
5. Once resolved, calls the client to confirm satisfaction
6. Documents everything in Intercom + Skale CRM
7. Reports the incident to Edward

### 7.3 VIP Service Recovery

If a VIP client had a negative experience:

| Action | Detail |
|--------|---------|
| Direct apology from account manager | Personalized call or message, not template |
| Root cause review | Full investigation |
| Documented corrective action | What was done to prevent recurrence |
| Goodwill compensation (if applicable) | Per compensation table in `manejo-quejas.md` |
| Reinforced follow-up for the next 2 weeks | Contact every 3 days |

---

## 8. VIP Client Retention

### 8.1 Churn Warning Signals

| Signal | Alert Level | Action |
|-------|----------------|--------|
| No trading for 7+ days (being daily active) | Yellow | Account manager contacts via WhatsApp |
| No trading for 15+ days | Orange | Account manager calls + Edward informed |
| 50%+ balance withdrawal | Red | Account manager contacts immediately |
| Full withdrawal of funds | Critical | Account manager calls + report to Edward |
| Serious complaint without satisfactory resolution | Red | Escalate to Principals |
| Account closure request | Critical | Edward intervenes + retention offer |

### 8.2 VIP Reactivation Strategy

**When a VIP stops trading:**

**Day 7 without activity:**
```
Hi [name], this is [account manager].

I noticed you haven't traded recently. Everything okay? If there's 
anything that could improve your experience or you need assistance 
with something, I'm here.

[If applicable:] By the way, this week there's [relevant market event]. 
It could be a good time to review opportunities.
```

**Day 15 without activity:**
```
Hi [name], I wanted to follow up.

Is there something that's not working the way you expected? I'd like 
to hear your honest feedback to make sure your experience with 
NEOMAAA is the best possible.

If you prefer, we can schedule a 10-minute call whenever works for you.
```

**Day 30 without activity:**
Direct call from the account manager. Objectives:
1. Understand the reason for inactivity
2. If it's an issue with NEOMAAA, try to resolve it
3. If trading at another broker, understand why
4. Offer improved conditions if Principals authorize
5. Document feedback for continuous improvement

### 8.3 Full Withdrawal / VIP Account Closure Protocol

1. Account manager contacts the client before processing closure
2. Ask the reason with genuine interest (not as an obstacle)
3. If the reason is solvable, offer alternative
4. If the decision is firm, process with professionalism and respect
5. Leave the door open: "If you want to come back in the future, we'll be happy to have you"
6. Document the reason for closure in Skale CRM
7. Send feedback to Edward for review

---

## 9. Tools and Configuration

### 9.1 Intercom Configuration

| Setting | Detail |
|--------------|---------|
| `vip` attribute | Boolean, automatically activated by Skale sync |
| `vip_level` attribute | Silver / Gold / Platinum |
| Routing rule | VIP Gold/Platinum is assigned to account manager directly |
| Automatic priority | All VIPs enter as High priority |
| Push notification | VIP ticket generates push notification to account manager |
| Automatic tag | `vip` + `vip-silver` / `vip-gold` / `vip-platinum` |

### 9.2 Skale CRM Configuration

| Field | Detail |
|-------|---------|
| `vip_status` | Active / Inactive |
| `vip_level` | Silver / Gold / Platinum |
| `vip_since` | VIP activation date |
| `assigned_am` | Assigned account manager |
| `last_proactive_contact` | Date of last proactive contact |
| `vip_notes` | VIP follow-up notes |

[REVIEW: Verify that these fields exist in Skale CRM or request their creation]

---

## 10. VIP Metrics

### Monthly KPIs

| Indicator | Target |
|-----------|------|
| Total active VIP clients | Month-over-month growth |
| VIP client deposits / Total deposits | >50% |
| 90-day VIP retention | >85% |
| VIP SLA met | >95% |
| Proactive contacts completed | 100% per schedule |
| VIP CSAT | >4.5/5 |
| VIP complaints resolved within SLA | 100% |
| Monthly VIP churn rate | <5% |

### Weekly VIP Report (Account Manager)

```
WEEKLY VIP REPORT — Week [#]

Total active VIPs: Silver: ___ | Gold: ___ | Platinum: ___
New VIPs this week: ___
Inactive VIPs (7+ days): ___
Proactive contacts completed: ___/___
Open VIP complaints: ___
VIP withdrawals processed: $___

Highlights:
- [Client] reached [tier] level
- [Client] requested [something]
- [Client] inactive since [date] — plan: ___

Pending:
- ___
```

---

*Document prepared for NEOMAAA Markets internal use.*
*The VIP experience is a key differentiator against large brokers.*
*Mandatory monthly review at team meeting.* [REVIEW: Assign first review date]
