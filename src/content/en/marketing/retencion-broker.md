# Retention Strategy — NEOMAAA Markets

> Internal document | Last updated: April 2026
> Applies to: NEOMAAA Markets (forex/CFD broker) | Platform: MT5 | Main market: LATAM

---

## 1. Client Lifecycle

```
REGISTRATION → KYC → FTD → ACTIVE TRADING → LOYAL/VIP
     |          |     |          |               |
     v          v     v          v               v
   Lead     Verified Funded   Engaged        Retained
```

### 1.1 Definition of Each Stage

| Stage | Criteria | Main Objective |
|-------|----------|---------------|
| Registration | Completes form, receives CRM credentials (Skale) | Advance to KYC in <24h |
| KYC | Documents approved via Sumsub | Advance to FTD in <72h |
| FTD (First Time Deposit) | First deposit confirmed | Execute at least 1 trade in <48h |
| Active Trading | 5+ trades/month, recurring deposit | Increase volume and frequency |
| Loyal/VIP | 3+ months active, high volume or recurring deposits | Maximize LTV, convert into referrer |

---

## 2. Retention Strategies by Stage

### 2.1 Registration → KYC

**Problem:** Client registers but does not upload documents. Typical conversion rate: 40-60%.

**Actions:**

| Action | Channel | Timing | Responsible |
|--------|---------|--------|-------------|
| Welcome email with step-by-step KYC guide | Automated email (Intercom) | Immediate | Marketing Automation |
| KYC pending reminder | WhatsApp + Email | +6 hours | Sales/Automation |
| Second reminder with incentive ("complete your KYC and access free signals for 7 days") | WhatsApp | +24 hours | Sales |
| Direct call from sales team | Phone | +48 hours | Sales |
| Final reminder: "Your account will be archived in 7 days" | Email | +5 days | Automation |

**NEOMAAA-specific tactics:**
- Highlight that Sumsub allows verification in <5 minutes with selfie + document
- For users coming from prop trading: "Your broker account is verified just as quickly"
- Offer live support via Intercom for KYC issues

### 2.2 KYC → FTD (First Time Deposit)

**Problem:** Verified client who does not deposit. This is the MOST CRITICAL GAP. Typical rate: 20-35%.

**Actions:**

| Action | Channel | Timing | Responsible |
|--------|---------|--------|-------------|
| "Your account is ready — deposit from $5 and start trading" | Email + WhatsApp | Immediate post-KYC | Automation |
| Local deposit methods guide (PIX, PSE, OXXO, Nequi, Yape by country) | Email segmented by country | +2 hours | Marketing |
| Video tutorial: "How to make your first deposit at NEOMAAA Markets" | WhatsApp | +24 hours | Sales |
| Highlight Cent account ($5 minimum) as risk-free entry door | All channels | Continuous | Sales + Marketing |
| Personalized onboarding call | Phone | +48 hours | Sales |
| Urgency campaign: "Deposit this week and receive premium Copy Trading access" | Email + SMS | +5 days | Marketing |

**NEOMAAA-specific tactics:**
- Segment by country and highlight the most popular payment method of each market
- For prop crossover: "You already know NEOMAAA — now trade with your own capital without prop rules"
- Emphasize that with $5 (Cent) they can try without real commitment
- Vault Yield as incentive: "Your money earns up to 5% annually even without trading"

### 2.3 FTD → Active Trading

**Problem:** Client deposited but does not trade or abandons after few trades. Typical rate: 50-65%.

**Actions:**

| Action | Channel | Timing | Responsible |
|--------|---------|--------|-------------|
| MT5 quick start guide (video + PDF) | Email | Immediate post-deposit | Automation |
| Assign to Copy Trading with a suggested signal provider | In-app + Email | +24 hours | Sales |
| Weekly webinar "Live trading session" | WhatsApp + Email | Recurring | Marketing |
| Market opportunity notifications (daily analysis) | Telegram/WhatsApp | Daily | Analysts |
| Personal check-in: "How's your first week trading?" | WhatsApp | +7 days post-FTD | Sales |

**NEOMAAA-specific tactics:**
- Copy Trading as key tool for beginners who don't know how to trade manually
- Free VPS for Raw+ accounts as activity incentive
- Educational content in Spanish adapted to LATAM

### 2.4 Active Trading → Loyal/VIP

**Problem:** Client trades but may migrate to another broker. Typical monthly churn rate: 8-15%.

**Actions:**

| Action | Channel | Timing | Responsible |
|--------|---------|--------|-------------|
| VIP program with tangible benefits (see section 4) | Email + CRM | Automatic upon meeting criteria | Operations |
| Dedicated account manager for accounts >$5,000 | Direct | Upon reaching threshold | Sales |
| Early access to new instruments or features | Exclusive email | When applicable | Product |
| Invitations to events (VIP webinars, analyst sessions) | Email + WhatsApp | Monthly | Marketing |
| Quarterly satisfaction survey | Email | Every 90 days | Support |
| Referral program with attractive commissions | Dedicated landing | Continuous | Marketing |

---

## 3. Churn Risk Indicators and Actions

### 3.1 Early Warning System

| Indicator | Risk Level | Automatic Action | Manual Action |
|-----------|-----------|-------------------|---------------|
| No login for 7 days | LOW | Email: "The market is moving — these opportunities await you" | None |
| No login for 14 days | MEDIUM | Email + WhatsApp: "We miss you — see what happened this week in the markets" | Sales reviews account, prepares offer |
| No login for 30 days | HIGH | Full reactivation campaign (see section 6) | Account manager call |
| No trades for 14 days (but with login) | MEDIUM | Push: "You have funds available — EURUSD is at a key level" | Suggest Copy Trading |
| Withdrawal of >50% of balance | HIGH | Satisfaction email + survey | Immediate manager call |
| 5+ consecutive losing trades | MEDIUM | Educational email: "Risk management — protect your capital" | Suggest demo or Cent account |
| Support ticket unresolved >24h | HIGH | Automatic escalation in Intercom | Supervisor contacts client |

### 3.2 Risk Scoring

Assign 0-100 score to each client based on:
- Login frequency (weight: 20%)
- Trading frequency (weight: 25%)
- Balance trend (growing vs declining) (weight: 20%)
- Deposit frequency (weight: 20%)
- Communication interaction (email opens, clicks) (weight: 15%)

**Thresholds:**
- 70-100: Healthy client, maintain engagement
- 40-69: Moderate risk, activate retention tactics
- 0-39: Critical risk, immediate intervention

---

## 4. VIP Program — NEOMAAA Markets Elite

### 4.1 Tier Structure

| Tier | Entry Criteria | Benefits |
|------|----------------|----------|
| **Silver** | Accumulated deposit $500+ OR monthly volume 5+ lots | Reduced spreads -10%, priority support, exclusive weekly analysis |
| **Gold** | Accumulated deposit $2,500+ OR monthly volume 25+ lots | Reduced spreads -20%, dedicated account manager, free VPS, Vault Yield +0.5% additional |
| **Platinum** | Accumulated deposit $10,000+ OR monthly volume 100+ lots | Reduced spreads -30%, reduced commissions on Raw, priority withdrawals (same day), dealing desk access, Vault Yield +1% additional |
| **Black** | Accumulated deposit $50,000+ OR monthly volume 500+ lots | Institutional Account with custom conditions, custom leverage, direct line with dealing desk, exclusive events, maximum Vault Yield |

### 4.2 Program Retention Mechanics

- Tiers reviewed monthly
- Downgrade applies after 2 consecutive months without meeting criteria (1-month grace)
- Communicate lost benefits before downgrade: "You're X lots away from keeping your Gold status"
- Gamification: visible progress bar in client area
- Account anniversary: special bonus at 6 and 12 months

---

## 5. Vault Yield as Retention Tool

### 5.1 Strategic Positioning

The Vault Yield System (up to 5% p.a.) is a unique differentiator. Position as:

**Main message:** "Your capital works for you even when you're not trading"

**Retention applications:**

| Situation | How to use Vault Yield |
|-----------|------------------------|
| Inactive client with balance | "Your money is generating yield in the Vault — see how much you've accumulated" |
| Client considering withdrawal | "Remember your balance earns up to 5% annually in the Vault — withdrawing means losing that yield" |
| KYC → FTD conversion | "Deposit and start earning yield from day 1, whether you trade or not" |
| Differentiation vs competition | "No other broker pays you to keep your capital — at NEOMAAA your money is never still" |
| VIP tier upgrade | "As Gold, your Vault Yield rises to 5.5% — deposit $1,500 more to qualify" |

### 5.2 Vault Rules for Retention

- Yield calculated daily, paid monthly (generates expectation)
- Show accumulated yield prominently on client dashboard
- Send monthly notification: "This month you earned $X.XX in your Vault"
- Do not allow partial Vault withdrawal without notice of losing accumulated monthly yield

---

## 6. Reactivation Campaigns

### 6.1 Dormant Clients (30+ days without activity)

**4-touch sequence over 14 days:**

| Day | Channel | Message | CTA |
|-----|---------|---------|-----|
| 1 | Email | "It's been a while — the market doesn't wait. See the opportunities you missed this month" | Login |
| 3 | WhatsApp | "Hi [Name], I'm [Manager] from NEOMAAA Markets. I wanted to know if everything is fine with your account" | Respond |
| 7 | Email | "Exclusive offer: trade this week and receive [benefit: premium analysis, temporary reduced spread, etc.]" | Deposit |
| 14 | SMS | "Final notice: your exclusive NEOMAAA Markets benefit expires tomorrow" | Deposit |

### 6.2 Failed Deposits

| Timing | Channel | Message |
|--------|---------|---------|
| Immediate | In-app + Email | "Your deposit couldn't be processed — try another method. Here are [alternatives by country]" |
| +2 hours | WhatsApp | "Need help with your deposit? Our team can guide you step by step" |
| +24 hours | Email | "We have 120+ deposit methods — surely there's one that works for you: [list by country]" |

### 6.3 Incomplete KYC

| Timing | Channel | Message |
|--------|---------|---------|
| +6h | Email | "Your verification is almost ready — only [specific document] is missing" |
| +24h | WhatsApp | "Can I help you complete your verification right now? It only takes 3 minutes" |
| +72h | Email | "Thousands of traders in [country] already trade at NEOMAAA Markets — complete your KYC and join them" |
| +7d | SMS | "Your NEOMAAA Markets account awaits you. Complete verification in 3 minutes: [link]" |

---

## 7. Retention Metrics — KPIs

### 7.1 Primary Metrics

| Metric | Formula | Industry Benchmark | NEOMAAA Target |
|---------|---------|--------------------|----------------|
| Registration → KYC conversion rate | KYCs completed / Registrations | 40-60% | 55% |
| KYC → FTD conversion rate | FTDs / KYCs completed | 20-35% | 30% |
| FTD → Active rate (month 1) | Clients with 5+ trades / FTDs | 50-65% | 60% |
| Monthly churn rate | Inactive 30d / Active start of month | 8-15% | <10% |
| 90-day retention rate | Active at 90d / FTDs from 90 days ago | 25-35% | 30% |
| Average LTV | Total revenue / Total clients | $300-800 (offshore) | $500+ |
| Average deposit | Total deposits / Number of deposits | Varies by market | $200+ |
| Deposit frequency | Deposits / Active client / Month | 1.5-2.5 | 2.0+ |
| Net Deposit (deposits - withdrawals) | Deposits - Withdrawals | Positive | Positive growing |
| Revenue per Active Client (RPAC) | Monthly revenue / Active clients | $50-150 | $80+ |

### 7.2 Secondary Metrics

- Average KYC time (target: <2 hours)
- Average Registration → FTD time (target: <48 hours)
- Dormant reactivation rate (target: 15%+)
- Quarterly NPS (target: 40+)
- Support tickets per client/month (target: <0.5)
- Copy Trading adoption rate (target: 25% of beginners)

---

## 8. Monthly Retention Calendar

### Week 1 (Days 1-7)

| Day | Activity | Audience | Channel |
|-----|----------|----------|---------|
| Monday | Weekly markets summary email + opportunities | All active | Email |
| Tuesday | Copy Trading push: "Top traders of the week" | FTD without trading activity | In-app + Email |
| Wednesday | Educational webinar | All | WhatsApp + Email |
| Thursday | Vault Yield notification: accumulated yield | Clients with balance >$100 | Email |
| Friday | "Your week at NEOMAAA Markets summary" | Active with trades | Email |

### Week 2 (Days 8-14)

| Day | Activity | Audience | Channel |
|-----|----------|----------|---------|
| Monday | Market alert: important economic event | All active | Push + Telegram |
| Tuesday | Reactivation campaign (14d dormant) | Dormant | WhatsApp + Email |
| Wednesday | Educational content: "Strategy of the week" | Active + recent FTD | Email + Blog |
| Thursday | VIP progress: "You're X away from tier upgrade" | Silver and Gold | Email |
| Friday | Weekend offer: "Deposit and receive [benefit]" | KYC without FTD + low volume Active | Email + SMS |

### Week 3 (Days 15-21)

| Day | Activity | Audience | Channel |
|-----|----------|----------|---------|
| Monday | Mid-month analysis + outlook | Active + VIP | Email |
| Tuesday | Copy Trading spotlight: new signal provider | All | Email + In-app |
| Wednesday | Quick satisfaction survey (NPS) | Random 10% sample | Email |
| Thursday | Referral campaign: benefits reminder | VIP | WhatsApp |
| Friday | "Your performance this month vs the market" | Active with 10+ trades | Personalized email |

### Week 4 (Days 22-30)

| Day | Activity | Audience | Channel |
|-----|----------|----------|---------|
| Monday | Anticipation: "Key events next week" | All | Email + Telegram |
| Tuesday | Aggressive reactivation (30d dormant) with offer | 30d+ dormant | Phone + Email + WhatsApp |
| Wednesday | VIP webinar with senior analyst | Gold+ | Exclusive invitation |
| Thursday | Monthly Vault Yield payment + notification | All with Vault | Email + In-app |
| Friday | Monthly summary: "Your month at NEOMAAA Markets" | All active | Personalized email |

---

## 9. Copy Trading as Engagement Tool

### 9.1 Strategy

Copy Trading solves the #1 retention problem: **clients who don't know how to trade and abandon**.

**Recommended flow:**
1. Client makes FTD but doesn't trade in 48h → suggest Copy Trading
2. Show signal provider ranking with transparent metrics
3. Allow copying with minimum amounts ($10-$50)
4. Send weekly copy trading performance reports

### 9.2 Copy Trading Metrics for Retention

| Metric | Target |
|--------|--------|
| Adoption rate (% of FTDs that activate copy) | 25% |
| 90d retention of copy vs manual users | Copy: 40% vs Manual: 25% |
| Additional deposit rate of copy users | 35% make 2nd deposit in 30 days |
| Revenue per copy vs manual user | Copy: +20% higher |

### 9.3 Actions

- Highlight Copy Trading in onboarding as main option for beginners
- Create content: "How to choose the best trader to copy"
- Notifications when a copied trader has a winning streak
- Gamify: "Top 10 copiers of the month" with rewards

---

## 10. Retention Budget — Suggested Allocation

### 10.1 Retention Budget Distribution (% of total marketing budget)

**General rule:** Allocate 30-40% of marketing budget to retention. The cost of retaining is 5-7x less than acquiring.

| Category | % of Retention Budget | Activities |
|----------|----------------------|-------------|
| Automated communication | 15% | Intercom, email marketing, SMS, WhatsApp Business API |
| VIP Program / Benefits | 25% | Reduced spreads, VPS, Vault bonuses |
| Content and education | 20% | Webinars, videos, analysis, blog |
| Reactivation campaigns | 15% | Special offers, re-deposit incentives |
| Premium support | 15% | Account managers, 24/5 support |
| Tools and analytics | 10% | Dashboards, scoring, CRM integrations |

### 10.2 Expected ROI

| Metric | Without strategy | With strategy | Impact |
|--------|------------------|---------------|--------|
| Monthly churn | 15% | 10% | -33% churn |
| Average LTV | $350 | $550 | +57% |
| 2nd deposit rate | 25% | 40% | +60% |
| Referrals per VIP client/year | 0.5 | 2.0 | +300% |

---

## 11. Technology Stack for Retention

| Tool | Function | Already available |
|------|----------|-------------------|
| Skale CRM | Segmentation, lifecycle tracking, reports | Yes |
| Intercom | Live chat, email automation, sequences | Yes |
| Sumsub | KYC tracking, approval rate | Yes |
| MT5 Manager API | Trading data, volume, P&L per client | Yes |
| WhatsApp Business API | Direct communication, campaigns | Implement |
| Metabase/Looker | Retention dashboards, automatic alerts | Implement |
| Customer.io or similar | Advanced behavior-based sequences | Evaluate |

---

## 12. Implementation Checklist — First 90 Days

### Month 1: Fundamentals
- [ ] Configure automatic sequences in Intercom (welcome, KYC, FTD)
- [ ] Create WhatsApp templates for each lifecycle stage
- [ ] Define churn alerts in Skale CRM
- [ ] Launch Silver/Gold VIP program (Platinum and Black in month 2)
- [ ] Configure weekly retention metrics reports

### Month 2: Optimization
- [ ] Activate reactivation campaigns for dormant
- [ ] Implement churn risk scoring
- [ ] Launch full VIP program (4 tiers)
- [ ] Create weekly educational content (webinars, analysis)
- [ ] Optimize Copy Trading as onboarding tool

### Month 3: Scale
- [ ] Implement WhatsApp Business API for automation
- [ ] Real-time retention dashboard
- [ ] A/B testing of reactivation messages and offers
- [ ] Active referral program with tracking
- [ ] Complete metrics review and strategy adjustment
