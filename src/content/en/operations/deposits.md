# NEOMAAA — Deposit and Withdrawal Processes

**Version:** 1.0
**Date:** April 8, 2026
**Status:** Operational (with interim plan due to Finance Manager vacancy)
**Applies to:** Support, Finance, Compliance (Susana), Dealing (Pepe)
**Platform:** MetaTrader 5 | CRM: Skale | Support: Intercom

---

## Table of Contents

1. [Available Deposit Methods](#1-available-deposit-methods)
2. [Deposit Process — Step by Step](#2-deposit-process--step-by-step)
3. [Withdrawal Process — Step by Step](#3-withdrawal-process--step-by-step)
4. [Daily Reconciliation](#4-daily-reconciliation)
5. [Large Transaction Protocol](#5-large-transaction-protocol)
6. [Fraud Prevention](#6-fraud-prevention)
7. [Internal Communication Flow](#7-internal-communication-flow)
8. [Interim Plan — Without Finance Manager](#8-interim-plan--without-finance-manager)
9. [Templates and Checklists](#9-templates-and-checklists)

---

## 1. Available Deposit Methods

> **Deposit minimums:** Two minimums coexist that must be met simultaneously:
> 1. **Minimum by account type:** Cent $5 | Standard $50 | Raw $500 | Institutional $50,000 (see `operations/faq-interno.md` 3.2).
> 2. **Minimum by payment method:** Detailed in following tables. If the method has a higher minimum than the account, the method's prevails.
>
> **Broker fee:** $0 on all methods except documented exceptions. PSPs or the client's banks may apply their own fees.

### Cards
| Method | Currencies | Expected Time | Min Amount | Max Amount |
|--------|-----------|---------------|-----------|-----------|
| Visa | USD, EUR | Instant (1-5 min) | $50 | $10,000/tx |
| Mastercard | USD, EUR | Instant (1-5 min) | $50 | $10,000/tx |

### Bank Transfers
| Method | Currencies | Expected Time | Min Amount | Max Amount |
|--------|-----------|---------------|-----------|-----------|
| Wire Transfer (SWIFT) | USD, EUR | 1-3 business days | $100 | No limit |
| SEPA | EUR | 1 business day | $100 | No limit |

### Crypto
| Method | Network | Expected Time | Min Amount | Max Amount |
|--------|---------|---------------|-----------|-----------|
| USDT (Tether) | TRC-20 | 5-30 min (confirmations) | $20 | No limit |
| USDT (Tether) | ERC-20 | 5-30 min (confirmations) | $50 | No limit |
| Bitcoin | BTC | 10-60 min | $50 | No limit |

### LATAM Local Methods
| Method | Country | Local Currency | Expected Time | Min Amount | Max Amount |
|--------|---------|----------------|---------------|-----------|-----------|
| PIX | Brazil | BRL | Instant (1-5 min) | R$50 | R$50,000/day |
| PSE | Colombia | COP | 15-30 min | COP 50,000 | COP 20,000,000 |
| Nequi | Colombia | COP | Instant | COP 20,000 | COP 8,000,000 |
| SPEI | Mexico | MXN | 5-30 min | MXN 200 | MXN 500,000 |
| OXXO | Mexico | MXN | 1-24 hours (cash) | MXN 200 | MXN 10,000 |
| Yape | Peru | PEN | Instant | PEN 50 | PEN 2,000 |
| Mercado Pago | Argentina | ARS | 5-30 min | ARS 5,000 | ARS 500,000 |

### Others
| Method | Expected Time | Notes |
|--------|---------------|-------|
| Western Union | 1-3 days | Requires manual receipt |
| Skrill | Instant | |
| Neteller | Instant | |

---

## 2. Deposit Process — Step by Step

### 2.1 General Flow

```
Client initiates deposit in Client Portal
        |
        v
Selects payment method
        |
        v
PSP (Payment Service Provider) processes the transaction
        |
        v
PSP sends callback/webhook to Skale CRM
        |
        v
Skale registers deposit and marks it as "Pending" or "Completed"
        |
        v
[If completed] Automatic credit to client's MT5 account
        |
        v
Client receives confirmation email
        |
        v
[If > $5,000] Automatic notification to Finance + Dealing (Pepe)
```

### 2.2 By Method Type

#### Cards (Visa/Mastercard)
1. Client enters card data on portal (tokenized by PSP, we never touch card data)
2. PSP executes 3D Secure if applicable
3. Transaction approved or declined in seconds
4. If approved: webhook to Skale → automatic credit to MT5
5. If declined: client sees error message with code

**Common card issues:**
- **"Transaction declined"** → Client's bank blocked the transaction. Ask client to call their bank and authorize international purchases
- **"3D Secure failed"** → Client didn't complete verification. Retry or use another method
- **Deposit approved but not showing in MT5** → Check in Skale if webhook arrived. If not, escalate to Finance for manual credit
- **Amount different from requested** → Check currency conversion. The PSP may have charged in local currency

#### Bank Transfers (Wire/SEPA)
1. Client selects wire transfer on portal
2. Portal displays NEOMAAA's banking instructions (bank, SWIFT, IBAN, reference)
3. Client must include their **MT5 account number as reference** — CRITICAL
4. Client makes the transfer from their bank
5. Funds arrive at NEOMAAA's bank account (1-3 days)
6. Finance verifies the deposit in bank statement
7. Finance matches reference with client's account in Skale
8. Finance manually credits in Skale → credit to MT5

**Common wire issues:**
- **"Didn't include reference"** → Ask client for bank receipt. Finance matches by name + amount
- **"3 days have passed and it doesn't show up"** → Ask client for SWIFT confirmation. Check if funds are in transit in bank account
- **"Amount doesn't match"** → Intermediary banks charge fees. Credit the net amount received, inform the client

#### Crypto (USDT, BTC)
1. Client selects crypto on portal
2. Portal generates unique wallet address (or displays fixed address with memo/tag)
3. Client sends crypto from their wallet
4. System monitors blockchain confirmations
5. Once confirmed (TRC-20: ~20 confirmations, ERC-20: ~12, BTC: ~3): automatic credit

**Common crypto issues:**
- **"Sent to the wrong network"** → If they sent ERC-20 to a TRC-20 address (or vice versa), funds are lost. No solution. Inform the client with empathy
- **"I sent the amount but it doesn't show up"** → Ask for TX hash. Check in blockchain explorer (tronscan.org, etherscan.io). If confirmed but not credited, escalate to Finance
- **"I sent from an exchange that doesn't show my wallet"** → Ask client for screenshot of exchange transaction + TX hash
- **Crypto to USD conversion** → Record exchange rate at time of credit

#### LATAM Local Methods (PIX, PSE, SPEI, OXXO, Nequi, Yape, Mercado Pago)
1. Client selects local method on portal
2. Local PSP generates QR code (PIX, Yape, Nequi) or redirects to bank (PSE) or shows payment code (OXXO)
3. Client pays via banking app or point of sale (OXXO)
4. Local PSP confirms payment → callback to Skale → credit to MT5

**Common local method issues:**
- **OXXO: "Paid but doesn't show up"** → OXXO can take up to 24 hours. Ask for payment ticket, verify with PSP
- **PIX: "QR expired"** → Generate new deposit. PIX QRs expire in 30 minutes
- **PSE: "My bank isn't listed"** → Check with PSP if bank is enabled. Offer alternative method
- **Nequi/Yape: "Exceeded the limit"** → Inform method limits, suggest bank transfer for large amounts
- **Exchange rate** → The PSP converts from local currency to USD. Client receives USD amount after conversion

### 2.3 Notifications When Receiving a Deposit

| Amount | Who is Notified | Channel | Required Action |
|--------|-----------------|---------|-----------------|
| Any amount | Automatic system | Skale + MT5 | Automatic credit |
| > $5,000 | Finance + Pepe (Dealing) | Slack #deposits | Finance verifies, Pepe adjusts book if needed |
| > $10,000 | Finance + Susana (Compliance) + Pepe | Slack #deposits + email | EDD trigger (see section 5) |
| > $25,000 | All the above + Management | Slack + email + WhatsApp | Explicit Compliance approval before crediting |

### 2.4 When the Deposit Doesn't Show Up — Troubleshooting for Support

**Script for support agent (Intercom):**

```
Step 1: Ask the client:
   - Payment method used
   - Amount and currency
   - Date and time of transaction
   - Payment receipt (screenshot or TX hash)
   - MT5 account number

Step 2: Verify in Skale CRM:
   - Search client by email or account number
   - Go to "Deposits" section
   - Check if there's a pending, failed, or completed deposit

Step 3: Based on status:
   - "Completed" but not in MT5 → Escalate to Finance: "Deposit completed in Skale but not reflected in MT5"
   - "Pending" → Inform client it's in process, give timeframe according to method
   - "Failed" → Inform client, suggest retrying or using another method
   - No record exists → Webhook may not have arrived. Escalate to Finance with client's receipt

Step 4: If not resolved in 2 hours (instant) or 48 hours (wire):
   → Escalate to Finance with Intercom ticket
   → Finance contacts PSP to trace the payment
```

---

## 3. Withdrawal Process — Step by Step

### 3.1 General Flow

```
Client requests withdrawal in Client Portal
        |
        v
System verifies: available funds, free margin, open positions
        |
        v
[If verification fails] → Automatic rejection with reason
        |
        v
Request enters approval queue in Skale
        |
        v
┌─────────────────────────────────────────────────┐
│            APPROVAL LEVELS                       │
│                                                  │
│  < $1,000         → Auto-approved (if AML pass) │
│  $1,000 - $5,000  → Finance approves            │
│  $5,000 - $10,000 → Finance + Susana review    │
│  > $10,000        → Finance + Susana approve    │
│                     + Pepe is notified          │
│  > $50,000        → All above + Management      │
└─────────────────────────────────────────────────┘
        |
        v
Automatic AML checks:
  - Complete KYC verification
  - Same-method rule
  - Minimum trading volume verification
  - Recent deposits verification (cooling period for cards)
        |
        v
[If passes] → Finance processes withdrawal via PSP
        |
        v
Funds sent to client
        |
        v
Email confirmation to client
```

### 3.2 Same-Method Rule

**Required by AML regulation:**

The client MUST withdraw to the same method used to deposit, up to the amount deposited by that method.

**Example:**
- Client deposited $3,000 by Visa and $2,000 by USDT
- Requests $4,000 withdrawal
- First $3,000 go back to the Visa
- Remaining $1,000 go to USDT
- If there's additional profit, the client can choose method

**Exceptions:**
- Expired or canceled card → Request evidence from bank + withdrawal via wire transfer
- PSP no longer operates with that method → Withdrawal via wire transfer with Compliance approval
- Deposit was via deposit-only method (OXXO, Western Union) → Withdrawal via wire transfer to account holder

### 3.3 Processing Times by Method

| Method | Processing Time | Time Until Client Receives |
|--------|-----------------|---------------------------|
| Visa/Mastercard | 1 business day | 3-5 business days (refund to card) |
| Wire Transfer | 1 business day | 2-5 business days |
| USDT TRC-20 | Same day | 5-30 minutes after sending |
| USDT ERC-20 | Same day | 5-30 minutes after sending |
| Bitcoin | Same day | 10-60 minutes after sending |
| PIX | 1 business day | Instant once processed |
| PSE | 1 business day | 1-2 business days |
| SPEI | 1 business day | Minutes once processed |
| Nequi | 1 business day | Instant once processed |
| Mercado Pago | 1 business day | 1-2 business days |
| Skrill/Neteller | 1 business day | Instant once processed |

**Note:** "Processing time" = from internal approval to when Finance executes the send. Withdrawals are processed in batch 2x/day: 10:00 AM and 4:00 PM (server time).

### 3.4 Automatic AML Checks on Withdrawals

Before a withdrawal is approved, the system (Skale + manual review) must verify:

- [ ] **Complete KYC:** Verified identity, proof of address, card selfie (if applicable)
- [ ] **Same-method rule met:** Withdrawal goes to the same deposit method
- [ ] **Card cooling period:** Minimum 5 business days since card deposit before withdrawing (prevents chargebacks)
- [ ] **Minimum trading volume:** Client must have traded at least 1 standard lot per $5,000 deposited (prevents simple deposit-withdraw laundering)
- [ ] **No AML alerts on profile:** No previous compliance flags
- [ ] **Name matches:** Withdrawal beneficiary matches account holder

### 3.5 Crypto Withdrawals — Specific Process

1. Client enters wallet address on portal
2. **Wallet verification:** System verifies wallet is not on sanctions lists (OFAC, etc.) — use screening tool like Chainalysis or similar
3. Finance verifies amount and approves
4. Finance executes send from company wallet
5. **CRITICAL:** Always verify wallet address 3 times before sending. Crypto transactions are irreversible
6. Record TX hash in Skale as receipt
7. Send TX hash to client via email

**Company wallet security:**
- Withdrawal wallet = "hot wallet" with limited funds (maximum $50,000)
- Larger funds in "cold wallet" (hardware wallet) with access only to Finance Manager + Susana (dual signature)
- Hot wallet replenishment = as needed, approved by Finance Manager

### 3.6 When the Withdrawal Has Issues — Troubleshooting

**"My withdrawal was rejected":**
- Check reason in Skale (insufficient funds, incomplete KYC, open positions, same-method rule)
- Inform client of specific reason and how to resolve it

**"My withdrawal was approved but doesn't arrive":**
- Check in Skale if it was processed with the PSP
- If crypto: check TX hash on blockchain
- If card: inform that refunds to card take 3-5 business days
- If wire: ask client to check with their bank, provide SWIFT receipt if available

**"I want to withdraw to a different method":**
- Explain same-method rule
- If valid exception, escalate to Compliance (Susana) for approval

---

## 4. Daily Reconciliation

### 4.1 What It Is and Why It's Critical

Daily reconciliation cross-checks 3 data sources to ensure every cent is accounted for:

1. **PSP (Payment Service Providers):** What payment processors report as deposited/withdrawn
2. **Skale CRM:** What our system recorded as deposited/withdrawn
3. **MT5:** What clients see in their trading accounts

If these 3 don't match, there's a problem: unaccredited deposit, duplicated withdrawal, fraud, or system error.

### 4.2 Daily Reconciliation Checklist

**Suggested time:** 9:00 AM, before processing day's withdrawals

```
DAILY RECONCILIATION — NEOMAAA
Date: ___________
Responsible: ___________

STEP 1: PSP vs Skale
─────────────────────
[ ] Download deposits report from previous day from EACH PSP
[ ] Download deposits report from Skale CRM from previous day
[ ] Cross-check transaction by transaction:
    - Each deposit in PSP must exist in Skale
    - Each deposit in Skale must exist in PSP
    - Amounts must match (considering PSP fees)
[ ] Record discrepancies:
    - Deposits in PSP but not in Skale = failed webhook → credit manually
    - Deposits in Skale but not in PSP = possible system error → investigate

STEP 2: Skale vs MT5
─────────────────────
[ ] Generate credits/debits report in MT5 from previous day
[ ] Cross-check with Skale:
    - Each "completed" deposit in Skale must have credit in MT5
    - Each "processed" withdrawal in Skale must have debit in MT5
[ ] Record discrepancies:
    - Deposit in Skale without MT5 credit = integration failure → manual credit in MT5
    - Credit in MT5 without deposit in Skale = possible unauthorized credit → investigate URGENT

STEP 3: Total Balances
─────────────────────────
[ ] Sum day's total deposits (by PSP)
[ ] Sum day's total withdrawals (by PSP)
[ ] Verify day's net balance matches movement in bank account / wallets
[ ] Compare company crypto wallet balance with expected

STEP 4: Pending Withdrawals
───────────────────────────
[ ] List all withdrawals pending approval
[ ] Verify no withdrawal has been unprocessed for more than 48 hours
[ ] Prioritize withdrawals with close deadlines

STEP 5: Red Flags
──────────────────
[ ] Check if there are duplicate deposits (same client, same amount, minutes apart)
[ ] Check if there are withdrawals exceeding client's total deposit
[ ] Check if there are clients with deposit + immediate withdrawal without trading
[ ] Check if there are repeated "round" amount transactions ($999, $4,999 — structuring)

RESULT:
[ ] All matches — Sign and archive
[ ] There are discrepancies — Detail and escalate

Notes: _________________________________
Signature: _________________________________
```

### 4.3 Critical Red Flags

| Red Flag | Immediate Action |
|----------|------------------|
| Deposit in PSP that doesn't exist in Skale | Manual credit to client. Investigate webhook |
| Credit in MT5 without corresponding deposit | FREEZE account. Investigate unauthorized access |
| Withdrawal processed twice | Contact PSP immediately to reverse duplicate |
| Crypto wallet balance doesn't match | Freeze crypto withdrawals. Audit all transactions |
| Client with deposit-withdrawal without trading | AML flag → Escalate to Susana |
| Multiple deposits just under $10,000 | Structuring suspicion → Escalate to Susana |

---

## 5. Large Transaction Protocol

### 5.1 Enhanced Due Diligence (EDD) Triggers

> [!INFO]
> The EDD framework follows the [Risk Matrix](/content/compliance/risk-matrix) and [EDD Triggers](/content/compliance/edd-triggers). Classification is based on risk categories (LOW/MEDIUM/HIGH), not fixed monetary thresholds. Qualitative criteria are defined by Compliance Officer based on client profile, jurisdiction, and behavior patterns.

**Typical triggers that activate EDD** (qualitative criteria, escalated to Compliance for final decision):

| Trigger | Criterion | Action |
|---------|-----------|--------|
| Deposit inconsistent with declared profile | Amount not coherent with client's occupation/income | Escalate to Compliance, request SoF |
| Unusual cumulative deposit | Cumulative pattern significantly exceeding expected for profile | Risk category upgrade + EDD |
| Institutional or high net worth client | Institutional account or HNW profile | HIGH RISK default + complete EDD |
| Fast withdrawal post-deposit without trading | Potential layering red flag | Hold + EDD + possible SAR |
| New client with significant deposit first week | Accelerated pace requires validation | EDD before next deposit |
| Abrupt pattern change | Deposit/trading 3x higher than historical average | Investigation + possible re-categorization |
| PEP, sanctions match, FATF high risk jurisdiction | See [PEP+Sanctions SOP](/content/compliance/pep-sanctions-sop) | HIGH RISK + dual approval |

### 5.2 Required Documentation (Source of Funds)

When EDD is activated, request the client:

```
REQUIRED DOCUMENTATION — SOURCE OF FUNDS

Dear [client name],

To process your transaction of [amount], we need to verify the origin
of funds in accordance with our regulatory obligations.

Please provide ONE of the following:

□ Recent payslip (last 3 months)
□ Tax declaration from last year
□ Bank statement showing source of funds (last 3 months)
□ Property or vehicle sale deed
□ Inheritance or donation document
□ Employment contract or letter with salary
□ Investment statement (if funds come from another investment)

ADDITIONALLY for amounts > $25,000:
□ Signed source of funds declaration (format provided by NEOMAAA)
□ Proof of transfer from source account

You have 7 calendar days to provide this documentation.
If we don't receive it, funds will be returned to the original deposit method.

Thank you for your understanding.
```

### 5.3 Approval Flow for Large Transactions

```
Deposit/Withdrawal > $10,000 detected
        |
        v
Finance receives automatic notification (Slack #large-transactions)
        |
        v
Finance requests SOF documentation from client (via Intercom or email)
        |
        v
Client provides documentation
        |
        v
Finance reviews documentation (is it coherent with client profile?)
        |
        v
Finance sends documentation to Susana (Compliance) with evaluation
        |
        v
Susana reviews and decides:
  ├─ APPROVED → Finance proceeds with transaction
  ├─ MORE INFO → Finance requests additional documentation from client
  └─ REJECTED → Finance returns funds to client + Susana files SAR if applicable
        |
        v
Pepe (Dealing) is notified of the amount to manage the book
```

**Times:**
- Finance must review documentation in max 24 hours from receipt
- Susana must approve/reject in max 48 hours
- Client must be informed of status every 24 hours
- If client doesn't provide documentation in 7 days, return funds

### 5.4 Impact on Dealing (Pepe)

Pepe needs to know about large deposits because:
- A $50,000+ deposit can generate positions that affect broker's net exposure
- Pepe must prepare coverage (hedging) if client has history of large positions
- If client is an "A-book candidate" (consistent trader with high volume), Pepe can move client to A-book before they open positions

**Notification to Pepe:**
- Deposits > $5,000: Informative notification
- Deposits > $10,000: Pepe must review client's trading profile and prepare risk management plan
- Deposits > $50,000: Brief meeting (5 min) between Finance, Pepe, and Susana before crediting

---

## 6. Fraud Prevention

### 6.1 Chargebacks

**Chargeback is the biggest financial risk for card deposits.**

#### Prevention:
- 3D Secure mandatory on all card deposits
- 5 business day cooling period before allowing withdrawal of card-deposited funds
- Selfie with card required for card deposits > $500
- Daily limit of $10,000 per card
- Maximum 3 different cards per account

#### When We Receive a Chargeback:

```
CHARGEBACK PROTOCOL

1. PSP notifies chargeback via email/dashboard
   Responsible: Finance
   Time: Immediate upon receipt

2. Finance freezes the client's account
   - Disable trading
   - Disable withdrawals
   - Disable deposits

3. Finance collects evidence to dispute:
   - Copy of client's KYC (ID, proof of address)
   - Session IP log where deposit was made
   - Trading history (demonstrates service was provided)
   - Previous communications with client
   - 3D Secure authentication proof
   - Selfie with card if exists

4. Finance sends representment (dispute) to PSP within 5 business days

5. Susana records the incident:
   - In client profile in Skale
   - In chargebacks registry
   - Evaluates if there's a pattern (multiple chargebacks = organized fraud)

6. If chargeback is lost:
   - Loss recorded accounting-wise
   - Client permanently BANNED
   - Add to internal blacklist (name, email, IP, card)

7. If chargeback is won:
   - Unfreeze client's account
   - Reinforced monitoring for 90 days
   - Consider restricting payment methods to crypto/wire only
```

### 6.2 Stolen Card Indicators

| Indicator | Risk Level | Action |
|-----------|-----------|--------|
| Deposit IP in different country than card's country | High | Block deposit, request verification |
| Multiple cards on same account in short time | High | Freeze account, investigate |
| Name on card doesn't match name on account | Critical | Reject deposit immediately |
| Deposit followed by immediate withdrawal to crypto | Critical | Freeze account + escalate to Compliance |
| Multiple failed attempts before successful one | Medium | Request selfie with card |
| VPN or proxy detected | Medium | Request additional verification |
| Disposable email (mailinator, guerrillamail, etc.) | Medium | Reject registration |

### 6.3 Multi-Account Abuse

**Warning signals:**
- Same device/browser fingerprint on multiple accounts
- Same IP on multiple accounts
- Similar names or same address on multiple accounts
- Same card or crypto wallet used on multiple accounts
- Identical trading pattern on multiple accounts (copy trading of self)

**Actions:**
1. Detect via Skale CRM (cross-check client data)
2. Freeze all suspicious accounts
3. Investigate: Is it the same person? Is there bonus abuse motive?
4. If confirmed: close additional accounts, keep only 1
5. If fraudulent intent: close all, return net funds, ban

### 6.4 Structuring (Smurfing) Detection

**Structuring = Splitting large transactions into multiple smaller ones to evade reporting thresholds.**

**Patterns to monitor:**
- Multiple deposits of $9,000-$9,999 (just under $10,000)
- 3+ deposits same day from same client
- Repeated round amount deposits ($5,000, $5,000, $5,000...)
- Client who deposits frequently but doesn't trade (or trades minimally)
- Deposits from multiple different payment methods in short period

**Action when structuring is detected:**
1. Finance flags account for review
2. Susana executes complete AML investigation
3. If reasonable suspicion: report as SAR (Suspicious Activity Report) to corresponding authority (Anjouan)
4. Do not inform client they're under investigation (tipping off is illegal)
5. Depending on evaluation: freeze account or allow operation under reinforced monitoring

---

## 7. Internal Communication Flow

### 7.1 Channels

| Channel | Use | Participants |
|---------|-----|--------------|
| **Slack #deposits** | Notifications of deposits > $5,000 | Finance, Dealing (Pepe), Compliance (Susana) |
| **Slack #withdrawals** | Notifications of withdrawals pending approval | Finance, Compliance (Susana) |
| **Slack #large-transactions** | Deposits/withdrawals > $10,000 + AML alerts | Finance, Compliance (Susana), Dealing (Pepe), Management |
| **Slack #fraud-alerts** | Chargebacks, suspicious cards, multi-account | Finance, Compliance (Susana), Management |
| **Slack #reconciliation** | Daily reconciliation result + discrepancies | Finance, Management |
| **WhatsApp — Emergency Group** | Only for emergencies requiring immediate action outside hours | Finance, Compliance (Susana), Dealing (Pepe), Management |
| **Email** | Formal documentation, PSP communication, SAR filing | As needed |
| **Intercom** | Client communication about deposit/withdrawal status | Support |

### 7.2 Escalation

```
LEVEL 1: Support → Finance
─────────────────────────
When:
  - Client reports unaccredited deposit after 2 hours (instant) or 48 hours (wire)
  - Client asks about withdrawal pending more than 24 business hours
  - Evident error in credited amount
How:
  - Ticket in Intercom with tag "Escalated-Finance"
  - Message in Slack #deposits or #withdrawals with link to ticket
Expected response time: 2 business hours

LEVEL 2: Finance → Compliance (Susana)
───────────────────────────────────────
When:
  - Withdrawal > $5,000 needs approval
  - Deposit > $10,000 needs EDD
  - Suspicious pattern detected (structuring, multi-account, etc.)
  - Chargeback received
  - SOF documentation not convincing
How:
  - Slack #large-transactions or #fraud-alerts with summary + evidence
  - Email with attached documentation if formal
Expected response time: 4 business hours (urgent: 1 hour)

LEVEL 3: Compliance (Susana) → Management
─────────────────────────────────────────
When:
  - Transaction > $50,000 needs approval
  - SAR must be reported
  - Client ban decision
  - Request for information from regulatory authority
  - Reputational risk
How:
  - WhatsApp Emergency Group (if urgent)
  - Formal email (if for documentation)
  - In-person/video meeting (if complex)
Expected response time: Same day

SPECIAL LEVEL: Finance → Dealing (Pepe)
──────────────────────────────────────────
When:
  - Deposit > $5,000 from any client
  - Deposit > $10,000 from client with large position history
  - Withdrawal > $10,000 (Pepe must know client may close positions to withdraw)
  - VIP client makes any significant transaction
How:
  - Slack #deposits with tag @pepe
  - For urgencies: direct message
Expected response time: 1 business hour
```

### 7.3 Client Communication

**Golden rule:** The client should ALWAYS know the status of their money.

| Situation | Who Communicates | Channel | Template |
|-----------|------------------|---------|----------|
| Deposit received and credited | Automatic (Skale) | Email | "Your deposit of $X has been credited to your MT5 account #XXXXX" |
| Deposit in process | Support (if asked) | Intercom | "Your deposit is being processed. Estimated time for [method] is [time]" |
| Deposit requires additional verification | Support (instructed by Finance) | Intercom + Email | "We need to verify additional information to process your deposit..." |
| Withdrawal approved and processed | Automatic (Skale) | Email | "Your withdrawal of $X has been processed. Estimated arrival time: [time]" |
| Withdrawal under review | Support (instructed by Finance) | Intercom | "Your withdrawal request is being reviewed by our team. We'll update you in [timeframe]" |
| Withdrawal rejected | Support (instructed by Finance/Compliance) | Intercom + Email | "Your withdrawal request could not be processed because [reason]. To resolve: [steps]" |

---

## 8. Interim Plan — Without Finance Manager

### 8.1 Current Status

**The Finance Manager position is VACANT. It's hiring priority #1.**

Until hired, Finance responsibilities are distributed as follows:

### 8.2 Temporary Distribution of Responsibilities

| Task | Interim Responsible | Backup | Frequency |
|------|---------------------|--------|-----------|
| Withdrawal approval < $1,000 | Auto-approved by system | Support verifies | Continuous |
| Withdrawal approval $1,000 - $5,000 | Susana (Compliance) | Management | On demand |
| Withdrawal approval > $5,000 | Susana + Management | — | On demand |
| Daily reconciliation | Susana (simplified) | Management on Fridays | Daily |
| Manual credits to MT5 | Senior support (with Susana approval) | Management | As needed |
| Batch withdrawal processing | Susana | Management | 2x/day |
| PSP contact | Management | Susana | As needed |
| Chargeback management | Susana | Management | As needed |
| Weekly financial report | Susana (simplified) | — | Weekly |

### 8.3 Interim Plan Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Susana is overloaded (Compliance + Finance) | Delays in approvals and reconciliation | Automate everything possible in Skale. Auto-approvals up to $1,000 |
| Lack of financial expertise | Reconciliation errors, money loss | Create detailed checklists (this document). Management reviews weekly |
| Withdrawals processed with delay | Unsatisfied clients, complaints on social media | Communicate real times to client. Prioritize withdrawals by seniority |
| Lack of segregation of duties | Internal fraud risk | Management must approve any transaction > $5,000. Cross-reconciliation |
| Incomplete reconciliation | Undetected fund loss | Simplified daily reconciliation + complete weekly |

### 8.4 Simplified Reconciliation (Interim Version)

While there's no Finance Manager, Susana executes a reduced version:

```
SIMPLIFIED DAILY RECONCILIATION (15-20 minutes)
──────────────────────────────────────────────────

1. [ ] Open each PSP dashboard
2. [ ] Verify total deposits from previous day in PSP = total in Skale
3. [ ] Verify total withdrawals from previous day in PSP = total in Skale
4. [ ] If totals match (difference < $50): OK, sign and archive
5. [ ] If they don't match: identify discrepancy and escalate to Management
6. [ ] Review list of withdrawals pending > 24 hours
7. [ ] Check hot crypto wallet balance

Day: __________  Matches: YES / NO  Signature: __________
```

**Complete Weekly Reconciliation (Friday):**
Management executes complete reconciliation from Section 4.2 checklist, covering the entire week.

### 8.5 What the Finance Manager Should Do When Hired

**First 2 weeks:**
1. Receive this document and access to PSPs, Skale, MT5 Admin
2. Execute complete reconciliation of last 30 days (identify any accumulated discrepancy)
3. Take ownership of all tasks in table 8.2
4. Establish direct relationship with each PSP (contact persons, SLAs, escalation)
5. Review and improve this document based on real operation

**First month:**
6. Implement automated reconciliation dashboard (ideal: connect PSP APIs with Skale via script)
7. Establish weekly and monthly financial reports
8. Optimize withdrawal processing times
9. Negotiate better rates with PSPs based on volume

---

## 9. Templates and Checklists

### 9.1 Template — Client Response: Unaccredited Deposit (Intercom)

```
Hi [name],

Thanks for contacting us. I understand your concern about the deposit.

I've checked your account and here's what I see:
[OPTION A] Your deposit of $[amount] via [method] is in process.
Estimated time for this method is [time]. We'll notify you by email
as soon as it's credited.

[OPTION B] I can see there was an issue with your deposit.
To resolve it, I need you to provide:
- Payment receipt (screenshot or receipt)
- Exact date and time of transaction
- [If crypto] Transaction hash (TX ID)

[OPTION C] Your deposit has been successfully credited to your
MT5 account #[number]. Updated balance is $[balance]. If you don't
see it reflected, please close and reopen MT5.

Is there anything else I can help with?

Best regards,
[Agent name]
NEOMAAA Support Team
```

### 9.2 Template — Client Response: Withdrawal Under Review (Intercom)

```
Hi [name],

Your withdrawal request of $[amount] has been received and is
being reviewed by our finance team.

[IF DOCUMENTATION IS NEEDED]
To process your withdrawal, we need to verify the following:
- [Required documentation]
Please send the documents in this chat or to compliance@neomaaa.com

[IF IN NORMAL PROCESS]
Withdrawals via [method] are processed in [processing time]
and funds arrive in [arrival time] additional.

We'll send you email confirmation as soon as the withdrawal
is processed.

Do you have any other questions?

Best regards,
[Agent name]
NEOMAAA Support Team
```

### 9.3 Template — Source of Funds Request (Email)

```
Subject: NEOMAAA — Source of Funds Verification | Account #[MT5]

Dear [full name],

In accordance with our regulatory obligations and anti-money
laundering policies, we need to verify the source of funds
related to your [deposit/withdrawal] of $[amount] made on [date].

Please provide ONE of the following documents:

1. Recent payslip (last 3 months)
2. Tax declaration from last fiscal year
3. Bank statement from last 3 months
4. Sale deed (property, vehicle, etc.)
5. Inheritance or donation certificate
6. Employment letter indicating salary
7. Investment account statement

Deadline: You have 7 calendar days (until [deadline]) to
send documentation to compliance@neomaaa.com

If we don't receive documentation by the indicated deadline:
- [If deposit] Funds will be returned to your original payment method
- [If withdrawal] Withdrawal request will be canceled

If you have questions, don't hesitate to contact us.

Sincerely,
Compliance Department
NEOMAAA
compliance@neomaaa.com
```

### 9.4 Template — Internal Notification: Large Transaction (Slack)

```
🔔 LARGE TRANSACTION DETECTED

Client: [name] | MT5 Account: #[number]
Type: [DEPOSIT / WITHDRAWAL]
Amount: $[amount]
Method: [method]
Date/Time: [date time]

Client profile:
- Registration date: [date]
- Total historical deposits: $[total]
- Total historical withdrawals: $[total]
- KYC status: [Complete / Incomplete]
- Previous alerts: [Yes / No — detail]

Required action:
- [ ] Finance: Verify transaction
- [ ] Compliance (@susana): [Approve / Review SOF]
- [ ] Dealing (@pepe): Review client's exposure

Link in Skale: [URL]
```

### 9.5 Checklist — Finance Manager Onboarding

```
ONBOARDING — FINANCE MANAGER
─────────────────────────────

DAY 1:
[ ] Read this entire document (NEOMAAA-DEPOSITS-WITHDRAWALS.md)
[ ] Read the launch playbook (NEOMAAA-BROKER-LAUNCH-PLAYBOOK.md)
[ ] Access to Skale CRM (credentials + basic training)
[ ] Access to MT5 Admin (read-only initially)
[ ] Access to each PSP dashboard (PSP list + credentials)
[ ] Access to company bank accounts (read-only)
[ ] Access to crypto wallets (hot wallet read-only)
[ ] Join Slack channels: #deposits, #withdrawals, #large-transactions,
    #fraud-alerts, #reconciliation
[ ] Join WhatsApp Emergency Group

DAY 2-3:
[ ] Execute complete reconciliation of last 30 days with supervision
[ ] Identify and document any historical discrepancy
[ ] Meet each PSP: contact person, SLA, escalation process
[ ] Process 5 withdrawals under Susana supervision

DAY 4-5:
[ ] Execute daily reconciliation independently
[ ] Process withdrawals independently
[ ] Handle an escalated support case from beginning to end

WEEK 2:
[ ] Take full ownership of all Finance tasks
[ ] Susana focuses exclusively on Compliance
[ ] First weekly financial report
[ ] Identify process improvement areas

END OF MONTH 1:
[ ] Automated reconciliation dashboard (or plan to implement it)
[ ] Documented and optimized processes
[ ] Established relationships with all PSPs
[ ] First monthly financial report
```

### 9.6 Quick Decision Matrix — Withdrawals

```
Is KYC complete?
  NO → Reject withdrawal. Ask client to complete KYC.
  YES ↓

Does withdrawal meet same-method rule?
  NO → Is there valid exception? (expired card, method unavailable)
       NO → Reject. Inform client they must withdraw to same method.
       YES → Escalate to Compliance for exception approval.
  YES ↓

Is amount < $1,000?
  YES → Auto-approve (if no AML flags).
  NO ↓

Is amount between $1,000 and $5,000?
  YES → Finance approves (review basic history).
  NO ↓

Is amount between $5,000 and $10,000?
  YES → Finance + Compliance review. EDD if needed.
  NO ↓

Is amount > $10,000?
  YES → Finance + Compliance approve. EDD mandatory. Notify Pepe.
       Is > $50,000? → Also, Management approval.
```

---

## Annex: Glossary

| Term | Definition |
|------|-----------|
| **PSP** | Payment Service Provider — Company that processes payments (e.g.: card processor, crypto gateway) |
| **KYC** | Know Your Customer — Client identity verification |
| **AML** | Anti-Money Laundering |
| **EDD** | Enhanced Due Diligence — Reinforced verification for high-risk transactions |
| **SOF** | Source of Funds |
| **SAR** | Suspicious Activity Report — Report of suspicious activity to regulatory authority |
| **Same-method rule** | Obligation to withdraw funds to the same method used to deposit |
| **Cooling period** | Waiting period between deposit and withdrawal (prevents chargebacks) |
| **Structuring/Smurfing** | Splitting large transactions into small ones to evade reporting thresholds |
| **Hot wallet** | Crypto wallet with accessible funds for daily operations |
| **Cold wallet** | Offline crypto wallet for secure storage of large amounts |
| **Representment** | Process of disputing a chargeback by presenting evidence |
| **A-book** | Model where client trades are sent directly to the market |
| **B-book** | Model where broker assumes the opposite risk to client's position |

---

**Next review:** When Finance Manager is hired
**Responsible for this document:** Compliance (Susana) + Management
**Last updated:** April 8, 2026
