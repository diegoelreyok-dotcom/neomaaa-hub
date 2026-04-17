# Sales Team FAQ — NEOMAAA Markets

**Internal document — Sales Team**
**Last updated: April 2026**
**Classification: Confidential**

---

## Quick Reference — Top 10 Most Frequent Questions

| # | Question | Short Answer |
|---|---|---|
| 1 | What is the minimum deposit? | Cent account: $5. Standard: $50. Raw: $500. Institutional: $50,000. |
| 2 | What deposit methods do you accept? | 120+ methods: Visa, MC, crypto, PIX, PSE, OXXO, Nequi, Yape, USDT, etc. |
| 3 | How long do withdrawals take? | Crypto: hours. Bank/card: 1-5 business days. |
| 4 | What platform do you use? | MetaTrader 5 (desktop, web, mobile). |
| 5 | Are you regulated? | Neomaaa Ltd (IBC 15968), License L15968/N, AOFA of Anjouan. |
| 6 | What spreads do you offer? | Standard: competitive spreads included. Raw: from 0.0 pips + $3/lot/side. |
| 7 | What leverage do you offer? | Up to 1:1000 retail. Custom for institutional. |
| 8 | What is Copy Trading? | Automatic trade replication via MQL5 Signals (native MT5 system). NEOMAAA does not offer MAM/PAMM. |
| 9 | Do you offer a demo account? | Yes, free demo account on MT5. |
| 10 | What countries do you operate in? | LATAM, Asia, Africa, and more. Restricted: USA, Canada, EEA, UK, Australia, sanctioned. |

---

## Category Index

1. [Accounts](#1-accounts)
2. [Deposits and Withdrawals](#2-deposits-and-withdrawals)
3. [Trading and Platform](#3-trading-and-platform)
4. [Commissions and Spreads](#4-commissions-and-spreads)
5. [Regulation and Security](#5-regulation-and-security)
6. [KYC / Verification](#6-kyc--verification)
7. [Copy Trading](#7-copy-trading)
8. [VPS Hosting](#8-vps-hosting)
9. [Vault](#9-vault)
10. [Sensitive Questions](#10-sensitive-questions)

---

## 1. Accounts

### Q1: What account types do you offer?

We offer 4 types: **Cent** ($5, beginners), **Standard** ($50, regular retail), **Raw** ($500, scalpers — 0.0 pips + $3/side), **Institutional** ($50,000, custom). All on MT5 with ECN/STP execution.

Complete table with spreads, commissions, and maximum leverage (gold source): [`encyclopedia/productos-mt5`](/content/encyclopedia/productos-mt5) "Account types" section.

---

### Q2: Can I have more than one account?

Yes. Clients can hold multiple trading accounts under a single profile. This is useful for separating strategies, holding accounts in different currencies, or testing different leverage configurations.

---

### Q3: Can I change account type after opening one?

You can open an additional account of the type you need without closing the existing one. Direct migration between account types is not automatic — contact support to evaluate options.

---

### Q4: Do you offer a demo account?

Yes. We offer a free demo account on MetaTrader 5 so the client can practice risk-free. The demo has market conditions similar but not identical to real ones. We always recommend complementing with the Cent account ($5) for experience with real execution.

---

### Q5: What base currencies do you accept for accounts?

Available base currencies depend on the account type. Check with support for current options, as they may vary. The most common option is USD.

---

### Q6: Do you offer an Islamic / Swap-Free account?

Yes. We offer Swap-Free accounts for clients who need to trade without swap charges for religious reasons. The client must request Swap-Free activation once the account is created. [VERIFY WITH COMPLIANCE: conditions and documentation required to activate Swap-Free]

---

### Q7: Is there a cost for keeping the account open?

We do not charge a maintenance fee for active accounts. For accounts inactive over long periods, specific conditions may apply. [VERIFY WITH COMPLIANCE: exact policy on inactive accounts and potential charges]

---

## 2. Deposits and Withdrawals

### Q8: What deposit methods do you accept?

We accept more than 120 deposit methods including: Visa and Mastercard cards, international bank transfer, cryptocurrencies (USDT, BTC, ETH, and more), and local methods such as PIX (Brazil), PSE (Colombia), OXXO (Mexico), Nequi (Colombia), Yape (Peru), among others. Availability may vary depending on the client's country.

---

### Q9: How long does a deposit take to reflect?

Card and cryptocurrency deposits are generally immediate or take minutes. Bank transfers may take 1-3 business days depending on the issuing bank. Local payment methods vary by processor.

---

### Q10: How long do withdrawals take?

Processing on NEOMAAA's side is prioritized. Cryptocurrency withdrawals are typically processed in hours. Card or bank transfer withdrawals take 1-5 business days, depending on the processor and receiving bank.

---

### Q11: Is there a minimum withdrawal amount?

Minimum withdrawal amounts depend on the selected payment method. Check the client area for specific conditions for each method before processing the withdrawal.

---

### Q12: Do you charge fees on deposits or withdrawals?

Deposit and withdrawal conditions vary by payment method. Some methods have no fee from NEOMAAA, but the processor or client's bank may apply their own fees. We recommend reviewing conditions in the client area before operating.

---

### Q13: Can I withdraw to a different method than the one I used to deposit?

For security and anti-money laundering (AML) compliance reasons, withdrawals must be processed to the same method used for the deposit up to the deposited amount. Additional profits can be withdrawn via alternative methods as per current policies. [VERIFY WITH COMPLIANCE: exact withdrawal method policy]

---

### Q14: What happens if my deposit is not reflected?

The client should contact support via Intercom with the transaction receipt. The team investigates and resolves as quickly as possible. Do not promise specific resolution times.

---

## 3. Trading and Platform

### Q15: What trading platform do you use?

MetaTrader 5 (MT5), available in desktop version (Windows/Mac), web (browser), and mobile app (iOS/Android). It's the most widely used trading platform in the world, with advanced charts, Expert Advisors, and ECN execution.

---

### Q16: What instruments can I trade?

More than 2,000 instruments: forex pairs (60+), cryptocurrencies, precious metals (gold, silver, platinum), stock indices (S&P 500, NASDAQ, DAX, etc.), individual stocks (Apple, Tesla, Amazon, etc.), ETFs, futures, and energy (oil, natural gas).

---

### Q17: What leverage do you offer?

Up to 1:1000 for retail accounts (depends on account and instrument). Institutional: custom. The client can choose lower leverage than the maximum if they prefer.

**Correct concept (important to avoid confusing the client):** leverage **does not multiply your capital**. It reduces the required margin by 1/N. With 1:500, 1 lot EURUSD (~USD 115,000 notional) requires ~USD 230 margin. The client still assumes full notional exposure; all that changes is how much is tied up. Higher leverage = less free margin = smaller cushion before stop out. That's why leverage amplifies both gains and losses.

---

### Q18: What type of execution do you have?

Neomaaa Ltd operates under a hybrid execution model (STP/ECN or principal/counterparty depending on market conditions), as established in our Terms and Conditions (neomaaa.com/about/legal-documentation). ECN/STP execution is the prioritized route: orders are routed to liquidity providers whenever conditions allow. In certain circumstances, the Company may act as principal or counterparty, within its published Order Execution Policy. All execution is auditable in MetaTrader 5 (timestamps, spread, slippage).

---

### Q19: Do you allow scalping?

Yes. There are no strategy restrictions. Scalping, hedging, news trading, and Expert Advisors are allowed on all accounts.

---

### Q20: Do you allow the use of Expert Advisors (robots)?

Yes. MetaTrader 5 supports Expert Advisors natively. Clients can use their own or third-party EAs. For 24/7 execution, we recommend the VPS Hosting service.

---

### Q21: What are your trading hours?

The forex market operates 24 hours Monday through Friday. Hours for specific instruments (stocks, indices, commodities) depend on the underlying market. The client can verify the exact hours of each instrument in MetaTrader 5.

---

### Q22: Can I trade from my phone?

Yes. The MetaTrader 5 app is available for iOS and Android with full functionality: charts, order execution, position management, and access to history. It can be downloaded from the App Store or Google Play.

---

## 4. Commissions and Spreads

### Q23: What are the spreads?

Depends on account type. Cent and Standard accounts: competitive variable spreads with no additional commission. Raw account: spreads from 0.0 pips with a commission of $3 per lot per side ($6 round trip). Institutional account: custom conditions.

---

### Q24: Are there hidden fees?

No. The cost structure is transparent. The only costs are: spread (on all accounts), commission per lot (only on Raw and Institutional), and overnight swaps (industry standard, visible in MT5 before trading). There are no platform or maintenance charges.

---

### Q25: What are swaps and how do I avoid them?

Swaps are charges or credits applied when you hold a position open overnight. They are standard across the industry and depend on the interest rate differential between the currencies of the pair. If you prefer to avoid them, we offer the Swap-Free account option.

---

### Q26: Does the Raw account have any minimum monthly cost?

There is no minimum monthly cost or minimum volume charge. You only pay the $3 per lot per side commission when you execute trades. If you don't trade, you don't pay.

---

## 5. Regulation and Security

### Q27: Are you regulated?

Yes. NEOMAAA Markets operates under Neomaaa Ltd, registered as IBC 15968 with license L15968/N issued by the Anjouan Offshore Finance Authority (AOFA). The license is publicly verifiable.

---

### Q28: Are my funds safe?

Client funds are held in segregated accounts, separated from the company's operational funds. This means your money is not used for the company's operations. Additionally, our KYC process with Sumsub and AML policies protect the security of your account.

---

### Q29: What happens if there is a problem with my account?

The client can contact support via Intercom (live chat) to resolve any operational or technical issue. Disputes or formal complaints are handled through the compliance team. [VERIFY WITH COMPLIANCE: formal complaints procedure]

---

### Q30: Does NEOMAAA share my data with third parties?

Personal information is handled according to our privacy policy. KYC data is processed securely through Sumsub. We do not share personal data with third parties for marketing purposes. [VERIFY WITH COMPLIANCE: exact privacy policy and legal exceptions]

---

## 6. KYC / Verification

### Q31: What documents do I need to verify my account?

A valid ID document (passport, ID card, or driver's license) and a facial verification are required. The process is digital, managed by Sumsub, and takes less than 5 minutes. Proof of address is not required for the basic verification level. [VERIFY WITH COMPLIANCE: confirm whether proof of address is required for certain amounts or jurisdictions]

---

### Q32: How long does KYC verification take?

Sumsub's automated process is fast. Most verifications complete in minutes. In cases requiring manual review, it may take up to 24 business hours.

---

### Q33: Why are you asking for verification? Is it safe to upload my documents?

KYC verification is a mandatory regulatory requirement to prevent money laundering and fraud. Your documents are processed through Sumsub, the same provider used by platforms such as eToro, Binance, and other recognized brokers. The information is encrypted and stored securely.

---

### Q34: My verification was rejected, what do I do?

Common reasons for rejection are: blurry photo, expired document, unreadable data, or the facial photo doesn't match. The client can retry after fixing the issue. If it persists, they should contact support via Intercom for personalized assistance.

---

## 7. Copy Trading

### Q35: What is Copy Trading and how does it work?

Copy trading at NEOMAAA runs on MT5's native system: **MQL5 Signals** (MetaQuotes marketplace, https://www.mql5.com/en/signals). How it works:

1. A trader opens a NEOMAAA account and enables it as a signal provider.
2. Publishes the signal on MQL5 Signals (can charge monthly subscription; MetaQuotes keeps a share).
3. Other NEOMAAA clients subscribe from their own MT5 to that signal.
4. Provider's orders are copied proportionally to each subscriber's balance.

NEOMAAA **does not operate** its own centralized copy trading system nor does it currently offer **MAM/PAMM**. The client retains full control: can unsubscribe or pause from their MT5 at any time.

---

### Q36: Do I need experience to use Copy Trading?

Trading experience is not required. However, the client must understand that Copy Trading does not eliminate risk. The copied trader's results do not guarantee future results. We recommend diversifying across several traders and not allocating all capital to one.

---

### Q37: Is there any fee for using Copy Trading?

Normal account commissions (spread / commission per lot) apply to each copied trade as in any operation. Additionally, **the signal provider may charge a monthly subscription** (price set by the provider; MetaQuotes charges a processing fee). NEOMAAA does not add extra commissions for using MQL5 Signals.

---

## 8. VPS Hosting

### Q38: What is the VPS and what is it for?

The VPS (Virtual Private Server) is a remote server that keeps MetaTrader 5 running 24 hours a day, 7 days a week. It is essential for clients who use Expert Advisors or trading robots, as it allows automated strategies to keep running even when the client's computer is off.

---

### Q39: How much does the VPS cost?

[VERIFY WITH COMPLIANCE: current pricing of the VPS service, available plans, and access conditions (whether it's free above a certain volume or deposit)]

---

### Q40: How do I set up the VPS?

The client requests the VPS through support or the client area. Once activated, they receive credentials to connect to the remote server, install MT5, and configure their Expert Advisors. Support can assist with initial setup.

---

## 9. Vault

### Q41: What is the Vault and how does it work?

The Vault is a feature that allows the client to deposit funds they are not actively using to earn a yield of up to 5% annually (p.a.). Funds in the Vault are not used for trading and are separate from the trading balance. The client can move funds between the Vault and their trading account whenever needed.

---

### Q42: Is the Vault like a term deposit?

No. The Vault is not a banking product or term deposit. It is an internal feature of NEOMAAA Markets. It should not be compared with regulated financial products such as bank deposits. The yield is subject to conditions that should be reviewed in the service terms. [VERIFY WITH COMPLIANCE: exact terms, payment frequency, Vault withdrawal conditions]

---

### Q43: Can I withdraw funds from the Vault at any time?

The client can move funds from the Vault to their trading account or request withdrawal. Check specific conditions on timing and processing. [VERIFY WITH COMPLIANCE: whether there are lock-up periods or early withdrawal penalties]

---

## 10. Sensitive Questions

### Q44: Why should I choose you over IC Markets / Pepperstone / XM?

We respect those brokers. NEOMAAA's differential advantages are: 120+ deposit methods including local LATAM options, leverage up to 1:1000, 2,000+ instruments, native Spanish support, Vault with up to 5% p.a., and personalized attention instead of being just another number. Always invite the client to compare live with a Cent or demo account.

---

### Q45: Can I trade from the United States / Canada / Europe?

No. Residents of the United States, Canada, countries of the European Economic Area, United Kingdom, and Australia cannot open accounts with NEOMAAA Markets. This also applies to countries under international sanctions. If the client is from any of these countries, DO NOT continue the registration process.

---

### Q46: What happens if I lose all my money?

Trading carries the risk of loss, including the entire deposited capital. NEOMAAA is not responsible for the client's trading decisions. We always recommend trading with capital the client can afford to lose, using risk management, and never depositing funds needed for essential expenses.

---

### Q47: Are you a prop trading firm?

No. NEOMAAA Markets is a forex and CFD broker. Clients deposit their own capital and trade in real markets. We are not a prop trading firm, we do not offer funded accounts or evaluations. The client trades with their own money at their own risk.

---

### Q48: Can you give me financial advice or tell me what to buy?

No. NEOMAAA Markets is an execution-only broker, not a financial advisor. We do not provide investment recommendations or personalized financial advice. Copy Trading allows following other traders, but the decision and risk are the client's. If the client needs financial advice, we recommend consulting with an independent professional.

---

### Q49: What negative balance protection do I have?

[VERIFY WITH COMPLIANCE: confirm whether NEOMAAA offers negative balance protection and under what exact conditions]

---

### Q50: Can I open a corporate account or one for a company?

[VERIFY WITH COMPLIANCE: procedure for opening corporate accounts, required documentation, and whether they are currently accepted]

---

## Quick Response Guide

### When you DON'T know the answer:

1. Do not make up information
2. Tell the client: "Let me verify that with the team and get back to you shortly"
3. Check with Edward or with support
4. Respond to the client within 24 hours maximum

### When the client gets difficult:

1. Stay calm and keep a professional tone
2. Do not argue or become defensive
3. Listen to the full complaint before responding
4. If you can't resolve, escalate to Edward

### When the client asks for something you can't offer:

1. Be honest: "That's not something we currently offer"
2. Offer the closest alternative
3. Do not promise future features unless they are confirmed

---

**Document prepared for the exclusive use of the NEOMAAA Markets sales team.**
**Questions marked [VERIFY WITH COMPLIANCE] require confirmation before using the answer with clients.**
**Any doubts about the content, check with Edward (Sales Lead).**
