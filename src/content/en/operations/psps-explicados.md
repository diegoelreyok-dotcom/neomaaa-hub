# PSPs — Payment Service Providers explained

**Version:** 1.0
**Date:** April 2026
**Audience:** Finance Manager, Support, Sales, Compliance
**Purpose:** Master reference on how money flows between the client and the MT5 account

---

## Table of Contents

1. [What a PSP is](#1-what-a-psp-is)
2. [Anatomy of a deposit](#2-anatomy-of-a-deposit)
3. [PSP types](#3-psp-types)
4. [PSP economics](#4-psp-economics)
5. [Chargebacks and fraud](#5-chargebacks-and-fraud)
6. [PSP KYC](#6-psp-kyc)
7. [Why rotate PSPs](#7-why-rotate-psps)
8. [NEOMAAA current stack](#8-neomaaa-current-stack)
9. [What each role should know](#9-what-each-role-should-know)
10. [Final client FAQ](#10-final-client-faq)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. What a PSP is

A **Payment Service Provider (PSP)** is an intermediary company that connects the broker (NEOMAAA) with global payment networks: banks, card networks (Visa/Mastercard), digital wallets, blockchains and local systems (PIX, SPEI, SEPA).

Without a PSP, NEOMAAA would have to integrate **directly** with each bank, each card network, each local system — something operationally impossible. The PSP solves that complexity: one integration with the PSP and you get access to hundreds of payment methods.

### Difference between key concepts

Many people confuse these terms. It is important to understand them:

| Concept | What it is | Example |
|---|---|---|
| **PSP (Payment Service Provider)** | Company that orchestrates the complete payment process, including antifraud, settlement and reporting | Checkout.com, Stripe, Praxis |
| **Payment gateway** | Technical layer that transmits the transaction data to the processor. It is a piece of the PSP, not the complete PSP | Authorize.net, 2Checkout |
| **Acquirer (Acquiring bank)** | Bank that processes payments on behalf of the broker and receives funds from the issuer. Who really "takes" the money | Barclays, Worldpay, Elavon |
| **Issuer (Issuing bank)** | Bank that issued the client's card (BBVA, Santander, Nubank, etc.) | End client's bank |

> [!INFO]
> In practice, the broker talks to the PSP, the PSP talks to the acquirer, the acquirer talks to the issuer, and the issuer talks to the client. Four layers, each with its cost and settlement time.

### Why a broker needs multiple PSPs

A broker **never** operates with a single PSP. Reasons:

1. **Operational redundancy.** If a PSP goes down, cuts the broker's account, or unilaterally changes terms, the business cannot stop. You must have active alternatives.
2. **Geographic coverage.** No PSP covers all countries well. PagSmile dominates Brazil, DLocal dominates Mexico, Praxis dominates Europe/card. Use the best for each region.
3. **Cost mix.** Different methods have different margins. Crypto is cheap but does not reach everyone. Card is expensive but converts more. You balance.
4. **Smart routing.** You can route European cards via one PSP and Latin American ones via another, optimizing approval rate and cost.
5. **Commercial pressure.** With 3+ active PSPs you have leverage to negotiate better rates.

---

## 2. Anatomy of a deposit

We follow the complete flow from when the client clicks "Deposit" until they see the money in their MT5 account.

<div className="neo-timeline">

1. **Client initiates payment** in the NEOMAAA Client Portal. Selects amount, currency and method (card, crypto, PIX, etc.).
2. **Portal redirects to PSP.** PSP's iframe or hosted checkout loads. The client enters sensitive data (card number, CVV) on the **PSP's domain**, not ours — that is why NEOMAAA does not store card data (reduced PCI-DSS scope).
3. **PSP runs fraud check.** Transaction velocity, IP geolocation, device fingerprint, blacklists, client history. Can take milliseconds or request additional verification.
4. **3DS Challenge (if applicable).** For European cards and several LATAM countries, the issuer may request 3D Secure: OTP via SMS, bank app, push notification. Client approves.
5. **PSP requests authorization from acquirer.** The acquirer asks the issuer: "has funds? is the card valid?". Response: approve or decline.
6. **Funds leave the client.** The amount is blocked on the client's account (hold) or debited directly (depending on method).
7. **PSP sends webhook to Skale CRM.** Real-time notification: `payment.success` with transaction ID, amount, method, client.
8. **Broker credits in MT5.** Skale triggers API call to MT5 to increase account balance. Time: seconds.
9. **Client sees funds available.** Can start trading.
10. **Deferred settlement.** Hours or days later, the PSP transfers to NEOMAAA the real money (net of fees) to the corporate bank account. This is when the broker actually "collects".

</div>

### Real timeline per method

Not all deposits take the same time, and not all settle the same. Distinguishing between **client crediting** (what the client sees) and **broker settlement** (when funds enter the cash box) is critical.

| Method | Client crediting | Broker settlement |
|---|---|---|
| Visa/Mastercard card | 1–5 min | T+1 to T+3 (card networks) |
| SEPA (EUR) | 1–3 business days | Same day arrives |
| SWIFT wire (USD) | 1–5 business days | Same day arrives |
| Crypto (USDT TRC-20) | 10–30 min (3 confirmations) | T+0 (instant once confirmed) |
| PIX (Brazil) | Instant (1–5 min) | T+0 to T+1 |
| SPEI (Mexico) | 5–30 min | T+0 |
| OXXO (cash) | 1–24 hours | T+1 to T+2 |
| Skrill / Neteller | Instant | T+1 to T+3 |

> [!WARNING]
> The broker assumes the **settlement risk**: if we credit the client in seconds but the PSP pays us at T+3, in those 3 days those funds are a broker liability. That is why broker cashflow depends a lot on the PSP mix.

---

## 3. PSP types

<div className="neo-compare">
<div className="neo-compare-col neo-compare-col--pro"><div className="neo-compare-title">Card + e-Wallet</div><ul><li>High conversion (70-80%)</li><li>Zero friction, familiar</li><li>High fees (2.5%-4.5%)</li><li>High chargeback risk</li></ul></div>
<div className="neo-compare-col neo-compare-col--con"><div className="neo-compare-title">Crypto (USDT)</div><ul><li>Low fees (0.5%-1%)</li><li>Zero chargeback</li><li>Settlement T+0</li><li>Low conversion (~35%)</li></ul></div>
</div>

<div className="neo-compare">
<div className="neo-compare-col neo-compare-col--pro"><div className="neo-compare-title">Bank wire (SEPA/SWIFT)</div><ul><li>Low fees (0.5%-1.5%)</li><li>Zero chargeback</li><li>Settlement 1-5 days</li><li>Medium conversion (~40%)</li></ul></div>
<div className="neo-compare-col neo-compare-col--con"><div className="neo-compare-title">LATAM PSPs (PIX/SPEI)</div><ul><li>Local conversion 70%+</li><li>Medium fees (2%-5%)</li><li>Settlement T+0 to T+1</li><li>Critical for BMP Brazil</li></ul></div>
</div>

### 3.1 Cards (Visa, Mastercard, Amex)

The most globally used method. Also the most expensive for the broker and the riskiest.

**Typical PSPs:**
- Stripe (only accepts low-risk brokers, today does not operate with most forex brokers)
- Checkout.com
- Praxis Cashier (specialized in forex/trading)
- Skrill Connect
- Worldpay, Nuvei, Paysafe

**Typical market rates:**
- MDR (Merchant Discount Rate): 2.5% – 4.5%
- Fixed fee: $0.20 – $0.40 per transaction
- Rolling reserve: 5% – 10% retained for 6 months
- Chargeback fee: $15 – $40 per dispute

**Chargeback risk:** high. Brokers are "high-risk merchants" for card networks.

### 3.2 Bank transfers (Wire, SEPA, ACH)

Direct bank transfers. Slow but cheap and low risk.

**Typical PSPs/integrators:**
- Direct banking partner (broker's corporate account)
- Match-Trade
- iSignthis
- Volt, TrueLayer (open banking)

**Typical market rates:**
- SEPA: 0.5% – 1.5% + fixed fee EUR 1–3
- SWIFT: 0.3% – 1% + fixed fee $10–30 (correspondent bank fees)
- ACH (USA): 0.5% – 1% + $0.25–1

**Chargeback risk:** very low. Once settled, cannot be easily reversed.

### 3.3 e-Wallets

Digital wallets. Fast, popular among experienced traders.

**PSPs:**
- Skrill (widely used in forex)
- Neteller (same parent as Skrill: Paysafe Group)
- PayPal (almost never operates with forex brokers due to restrictions)
- Apple Pay, Google Pay (layer over card)

**Typical rates:** 2% – 3.5% + fixed fee

**Advantage:** high conversion, client already has wallet loaded.
**Disadvantage:** high fees, and if the broker has problems with the wallet, it cuts all clients at the same time.

### 3.4 Crypto

The cheapest method and the one with the lowest chargeback risk (chargeback does not exist on blockchain).

**Typical PSPs:**
- B2BinPay (the standard in forex brokers)
- CoinsPaid
- Crystal Blockchain
- NOWPayments
- BitPay

**Typical rates:** 0.5% – 1% flat

**Advantages:**
- Zero chargeback
- Fast settlement (T+0 once confirmed on-chain)
- Allows operating with clients from countries with restricted banking
- Low cost

**Disadvantages:**
- Volatility if not converted to stablecoin immediately
- Regulatory risk (more demanding AML, requires source wallet screening)
- Not suitable for non-tech-savvy clients

### 3.5 LATAM local PSPs

Critical for conversion in LATAM. A broker attempting to operate in Brazil only with international Visa converts 20%. With PIX converts 70%+.

| PSP | Country / Methods | Typical rates |
|---|---|---|
| **PagSmile** | Brazil (PIX, Boleto), Mexico (SPEI, OXXO), Chile, Peru, Colombia | 2% – 5% |
| **Astropay** | All LATAM, focus on virtual cards and own PSP | 3% – 5% |
| **DLocal** | LATAM + Africa + Asia (Mercado Pago, OXXO, Baloto, etc.) | 2.5% – 5% |
| **PayU** | LATAM + India + Eastern Europe | 3% – 5% |
| **EBANX** | Brazil, Mexico, Colombia, Chile, Argentina | 3% – 5% |

> [!TIP]
> For NEOMAAA, having at least **one strong PSP in Brazil with PIX and Boleto** is non-negotiable given the strategic BMP (Brazil Market Penetration) objective.

### 3.6 European APMs (Alternative Payment Methods)

European local methods, not card, not wire. Widely used in their origin markets.

| Method | Country | How it works |
|---|---|---|
| **iDeal** | Netherlands | Redirects to client's online bank, approves, debits. 60% of NL e-commerce |
| **Sofort / Klarna** | Germany, Austria | Login in online bank via Klarna, instant debit |
| **Bancontact** | Belgium | Local online payment standard |
| **Multibanco** | Portugal | Generates reference, client pays at ATM or home banking |
| **Przelewy24** | Poland | Aggregator of local banks |
| **Giropay** | Germany | Similar to Sofort |

**Rates:** 1% – 2.5%. Settlement: T+1 to T+2.

---

## 4. PSP economics

Understanding how much it REALLY costs to process a payment is what separates a broker that makes money from one that goes under due to invisible fees.

### Cost components

1. **MDR (Merchant Discount Rate).** The percentage over volume. The most visible fee.
2. **Fixed fee.** Fixed cost per transaction, typically $0.20 – $0.40. Kills the broker if average ticket is low.
3. **Monthly fee.** Fixed monthly PSP cost, $100 – $2,000.
4. **Setup fee.** One-time at integration, $500 – $10,000.
5. **Rolling reserve.** % of each payment retained by the PSP during 3–6 months to cover potential chargebacks.
6. **Chargeback fee.** Charged EVERY time there is a dispute, whether the broker wins or loses. $15 – $40.
7. **Refund fee.** Sometimes there is cost for processing refund.
8. **FX markup.** If the client pays in EUR and the broker wants USD, the PSP takes 0.5% – 2% markup on the exchange rate.

### Total cost examples per $100 USD of volume

<div className="neo-stat-grid">

**Visa Europe** — 3.5% MDR + $0.30 fixed = **~$3.80**. Plus rolling reserve of $10 retained 6 months.

**Crypto USDT (B2BinPay)** — 0.5% flat = **$0.50**. No rolling reserve, T+0 settlement.

**SEPA wire** — 1% + $1 fee = **~$2.00**. Zero chargeback risk.

**PIX Brazil (PagSmile)** — 1.5% – 2.5% MDR = **~$2.00**. T+0 settlement, low chargeback.

**Skrill e-wallet** — 2.5% MDR + $0.30 = **~$2.80**. Instant, but high fees for broker.

**OXXO Mexico** — 3% – 4% = **~$3.50**. Cash deposit, T+1 settlement.

</div>

### The conversion vs cost tradeoff

This is the central dilemma of payments strategy:

| Method | Cost for broker | Estimated conversion |
|---|---|---|
| Card | High (3.5%) | ~80% (client already has card in hand) |
| e-Wallet | Medium-high (2.5-3%) | ~70% (requires having wallet) |
| Crypto | Low (0.5%) | ~35% (only tech-savvy clients) |
| Wire | Very low (1%) | ~40% (requires going to bank, delay) |
| PIX / SPEI / local | Medium (2%) | ~85% in their country of origin |

> [!EXAMPLE]
> A $1,000 card deposit costs the broker $35. The same deposit via crypto costs $5. But if we only offered crypto, out of every 100 clients only 35 would complete the deposit. The other 65 go to competition. That is why we offer both — you optimize the mix.

### Why the client prefers card even though they are charged more

- Zero friction: already has the card.
- Trust in the brand (Visa/Mastercard).
- Can chargeback if something goes wrong.
- Does not have to learn crypto nor wait for a wire.

It costs the broker more, but the client converts more easily. The payments manager optimizes: **weighted average cost by conversion** is the real metric.

---

## 5. Chargebacks and fraud

### What a chargeback is

A chargeback is when a client disputes a transaction with their issuer bank, requesting money back. The issuer bank opens an investigation, and if it rules in favor of the client, the money is reversed — the broker loses it in addition to the product/service already delivered.

**Common chargeback reasons in forex brokers:**
1. "I do not recognize this transaction" (real fraud or friendly fraud)
2. "The service was not delivered" (client lost money trading and wants reversal)
3. "I did not authorize the payment" (real fraud or client lying)
4. "They charged more than agreed"
5. Account hacked by a third party

### Why PSPs fear them

When a chargeback arrives, the PSP:
- Must return funds to the issuer
- Pays a chargeback fee to the network ($15–40)
- Accumulates the chargeback in the merchant ratio
- If the ratio passes the threshold, the acquirer puts the broker in "monitoring program" (Visa VDMP, Mastercard Excessive Chargeback Program) with punitive fees
- Eventually the acquirer cuts the account

### Acceptable ratios

| Chargeback ratio | Status |
|---|---|
| < 0.5% | Healthy, normal business |
| 0.5% – 1% | Acceptable, attention |
| 1% – 1.5% | Alarm, PSP starts asking for mitigation plan |
| > 1.5% | VDMP / Excessive Chargeback. Penalty fees |
| > 2% | Imminent account closure |

> [!WARNING]
> Forex/CFD brokers are universally considered **high-risk**. The acceptable chargeback rate is lower than in normal e-commerce (~0.9% vs 1.5%). You must be aggressive in prevention.

### Rolling reserve: what it is and why it exists

The PSP retains 5–10% of each deposit during 6 months before settling to the broker. That money serves to cover chargebacks that could arrive later. It is a forced "cushion".

**Example:** monthly volume $500K with 7% rolling reserve = $35K/month retained, released 6 months later. The broker never sees that money circulating until half a year later.

If 6 months pass without chargebacks, the money is released. If a chargeback arrives, it is debited from the reserve first.

> [!INFO]
> A fast-growing broker has an increasingly large portion of its revenue "locked" in rolling reserves. It is a real cashflow constraint.

### Defense against chargebacks

Industry tools:

- **Verifi (Visa):** pre-dispute resolution. The broker can refund before it becomes chargeback.
- **Ethoca (Mastercard):** pre-chargeback alerts. Warns before the client disputes.
- **3DS (3D Secure):** extra authentication. If the client authenticated with 3DS, liability shift passes to the issuer — the broker almost always wins the chargeback.
- **Robust evidence:** IP logs, device fingerprint, client history, emails, chats, complete KYC, signed risk acknowledgment.
- **Pre-chargeback communication:** when the client complains, escalate fast before they go to the bank.

### Friendly fraud

This is the most frustrating chargeback: the client used their own card, deposited, traded, lost, and then disputes alleging "I did not authorize this". It is not real fraud — it is client's own fraud. It is 40–60% of chargebacks in forex brokers.

**Mitigation:**
- Mandatory 3DS (liability shift)
- Terms & Conditions signed with risk acknowledgment
- Screenshots of client trading
- Verified KYC demonstrating they ARE the holder
- Recorded communication proving intent

---

## 6. PSP KYC

Each PSP runs its own KYC/AML independent of the broker's KYC. This confuses support and clients a lot.

### Why the PSP does its own KYC

Regulatorily, the PSP is responsible to its acquirer, to the networks, to its own regulator. It cannot blindly trust the broker's KYC. So it does additional layers:

- Client screening against sanctions lists (OFAC, UN, EU)
- Device fingerprint and fraud scoring
- In some cases, additional card verification (holder name = broker KYC)
- If the amount is high, can ask for extra documentation from broker or client

### Deposits rejected with "KYC issue"

Sometimes it happens: the client has KYC approved at NEOMAAA (Sumsub), but when attempting a deposit, the PSP rejects. Reasons:

1. **Name does not match.** The card is under different name than KYC. Prohibited (3rd party payment).
2. **Card country does not match KYC country.** IP in one country, card from another, KYC from another — suspicious.
3. **The PSP has the client in internal blacklist.** Due to previous chargeback at another merchant.
4. **Amount exceeds threshold without extra documentation.** E.g.: first deposit of $10K triggers enhanced due diligence.
5. **Velocity.** The client tried 5 times in 10 minutes — fraud flag.

### PSP ↔ broker cooperation

When there is an AML investigation, the PSP and the broker share data:
- Transaction history
- KYC documents (under strict sharing agreements)
- Communication logs
- Source of funds if applicable

> [!INFO]
> Compliance officer must have direct contact with each PSP's AML team. When there is a serious issue, it is not resolved via email with support — it is resolved by escalating to the AML team.

---

## 7. Why rotate PSPs

### Do not put all eggs in one basket

If 100% of volume goes through a single PSP and that PSP cuts the account for any reason (chargebacks, risk appetite change, merger with another company), the broker is left unable to process payments. It is existential risk.

### Real cases

- **Stripe cut many forex brokers in 2020** unilaterally. Those who only had Stripe were left weeks without processing.
- **PayPal never supported forex brokers** — not even an option.
- **Banking acquirers change risk appetite** every 2–3 years.

### Smart routing

It is not just having multiple PSPs — it is using them intelligently:

<div className="neo-compare">

**By geography**
- Brazil → PagSmile PIX/Boleto
- Mexico → PagSmile or DLocal SPEI/OXXO
- Europe → Checkout.com card / SEPA
- Asia → B2BinPay crypto
- USA → ACH or crypto (forex cannot operate retail in regulated USA)

**By client type**
- Small client (<$500) → card (low friction)
- Medium client ($500-$5K) → card or wallet
- Large client (>$5K) → wire or crypto (save fees)
- VIP client → dedicated treatment, wire priority

**By approval rate**
- If a PSP starts rejecting more than 20% in a country, route to another
- Continuous A/B testing

</div>

---

## 8. NEOMAAA current stack

NEOMAAA is in pre-launch. The target stack for go-live is minimum **3 active PSPs in production** (card + LATAM local + crypto), plus direct bank wire.

| Category | Planned PSP | Status |
|---|---|---|
| Card (Visa/Mastercard) | [DATA: card PSP to confirm with Diego/Angel — candidates: Praxis Cashier, Checkout.com] | [DATA: pending] |
| LATAM local (Brazil PIX/Boleto + Mexico SPEI/OXXO) | [DATA: LATAM PSP to confirm — candidates: PagSmile, EBANX, DLocal] | [DATA: pending] |
| Crypto (USDT/BTC) | [DATA: crypto PSP to confirm — candidates: B2BinPay, CoinsPaid] | [DATA: pending] |
| Bank wire | [DATA: banking partner to confirm] | [DATA: pending] |

> **Consistency rule:** Until PSPs are confirmed, any reference to specific PSP in internal documents must use the format `[DATA: <category> PSP — confirmation pending]`. Do not invent PSPs. Do not assume Stripe, PayPal or similar are options (do not operate with forex brokers).

**Future (post go-live):**
- Skrill/Neteller (e-wallets — high demand in forex)
- European APMs (iDeal, Sofort, Bancontact) for expansion to Netherlands/Germany/Belgium
- Second card PSP for redundancy
- Astropay or similar for LATAM virtual cards

> [!WARNING]
> Until Finance Manager is hired, setup and PSP negotiation must be coordinated by Angel. PSP contracts have rolling reserve, MDR, chargeback and cancellation clauses that affect broker cashflow for years.

---

## 9. What each role should know

| Role | What they should know about PSPs |
|---|---|
| **Sales** | What methods are available per country, expected crediting times, what to say when client asks about fees. DO NOT promise exact times without knowing the method. |
| **Support** | Why a deposit may fail (PSP KYC, name does not match, 3DS, limit, fraud check). How to escalate to Finance. What info to ask the client (transaction ID, screenshot, method, exact time). |
| **Compliance (Susana)** | Joint KYC with PSP, source of funds, AML cooperation, crypto wallet screening, 3rd party payment red flags. |
| **Finance Manager** | Daily reconciliation (PSP vs Skale vs MT5 vs bank), chargeback management, total cost calculation per method, cashflow projection with rolling reserves, rate negotiation with PSPs. |
| **Dealing (Pepe)** | Does not apply directly — dealing handles MT5 execution, not money in/out. But must know if there is deposit or withdrawal freeze due to compliance to avoid generating margin problems to clients. |

---

## 10. Final client FAQ

Model responses for the 10 most frequent questions. Copy-paste friendly for support.

**1. How long does my deposit take?**
"Depends on the method. Card and PIX are instant (1–5 min). SEPA takes 1–3 days. Crypto 10–30 min after confirmations. If the times have passed and you do not see crediting, send us the receipt."

**2. Why was I charged an unexpected commission?**
"NEOMAAA does not charge commission for depositing. It may be your bank's fee for international operation or currency conversion. Check with your bank."

**3. Why was my card rejected?**
"Common causes: 1) your bank declined for security, contact them; 2) the card name does not match your account; 3) you did not complete 3DS. Retry or use another method."

**4. Can I deposit with a card not under my name?**
"No. For AML we only accept methods under the holder's name. If you try, we reject it and return it to origin."

**5. How long does my withdrawal take?**
"Internal processing: 24–48 business hours. Then depending on method: card 3–5 days, wire 1–3 days, crypto 1–2 hours, PIX minutes."

**6. Can I withdraw to a different method than I used to deposit?**
"For AML the withdrawal goes to the same method until covering the deposit. The excess (earnings) can go to another approved method in your name."

**7. Why do I have to do KYC if the PSP already verified me?**
"They are different verifications. The PSP validates payment data. NEOMAAA, as regulated broker, validates identity and source of funds for its own obligation."

**8. Can I deposit in crypto?**
"Yes. USDT (TRC-20/ERC-20), BTC and others via B2BinPay/CoinsPaid. Instant after on-chain confirmation, no broker commissions."

**9. What is the minimum deposit?**
"Card and crypto: $50. Wire: $100. LATAM local: variable (e.g. R$50 PIX)."

**10. My deposit says 'processed' but I do not see it in MT5.**
"Usually it is a delay of seconds. If more than 30 min have passed since PSP confirmation, write to us with transaction ID, amount, method and exact time."

---

## 11. Troubleshooting

### Deposit not credited

**Info to ask client:** exact method (and network if crypto), PSP transaction ID, amount/currency, time with time zone, screenshot of receipt, status confirmed by bank/PSP ("approved" vs "pending").

**Escalate:** Finance Manager → Angel (if PSP must be contacted) → Susana (if AML). Response to client: <2h. Resolution: <24h.

### Withdrawal rejected

Common causes: (1) method does not match original deposit — AML; (2) amount exceeds available; (3) KYC incomplete or expired (>12 months); (4) source of funds not documented for withdrawals >$10K; (5) compliance hold due to AML investigation.

### PSP not available in my country

Reasons: the PSP has no license in that country, broker restrictions (sanctioned/OFAC countries), or temporary PSP suspension. Response: offer available alternative methods.

---

> [!TIP]
> **Golden rule for support:** never promise an exact time. Always give a range ("between 1 and 5 business days") and communicate proactively if there is delay. Clients tolerate communicated delays; they do not tolerate silence.

---

**Document maintained by:** Finance Manager (pending hire, interim: Angel)
**Next review:** post go-live, Q3 2026
**Major changes:** update when adding/removing PSPs from the stack
