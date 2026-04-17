# GENERAL TERMS AND CONDITIONS

**Neomaaa Ltd (IBC 15968) | License L15968/N | AOFA**
**Version: 1.0 | Date: April 8, 2026**

> INTERNAL REFERENCE DOCUMENT — Subject to legal review prior to publication.

---

## 1. DEFINITIONS

In these Terms and Conditions, the following terms shall have the meaning set forth below:

| Term | Definition |
|---------|-----------|
| **Company** | Neomaaa Ltd, a company registered as IBC 15968 in Anjouan, Union of Comoros, holder of license L15968/N issued by the AOFA. |
| **Client** | Any natural or legal person who has completed the registration and verification (KYC) process and maintains an active trading account with the Company. |
| **Trading Account** | The account opened by the Client on the MetaTrader 5 platform for executing trades in financial instruments. |
| **Platform** | MetaTrader 5 (MT5), including its desktop, web, and mobile versions. |
| **Financial Instruments** | CFDs on forex, cryptocurrencies, metals, equities, indices, ETFs, futures, and energy offered by the Company. |
| **Client Portal** | The web interface through which the Client accesses the account, manages funds, and uploads documents. |
| **AOFA** | Anjouan Offshore Finance Authority, regulator of the Company. |

---

## 2. SCOPE

2.1 These Terms and Conditions govern the relationship between the Company and the Client with respect to use of the trading services, the Client Portal, and the Platform.

2.2 By registering and opening an account, the Client represents having read, understood, and accepted these Terms and Conditions in their entirety.

2.3 The Company reserves the right to amend these Terms and Conditions at any time, notifying the Client by email or through the Client Portal at least 10 business days in advance.

---

## 3. ELIGIBILITY

3.1 To open an account with NEOMAAA, the Client must:

- Be at least 18 years of age (or the age of majority applicable in the Client's jurisdiction).
- Not be a resident or national of a restricted country (see section 15).
- Successfully complete the identity verification (KYC) process.
- Provide truthful and up-to-date information.

3.2 The Company reserves the right to refuse the opening of an account without the need to justify its decision.

---

## 4. ACCOUNT TYPES

4.1 The Company offers the following account types:

| Account | Minimum Deposit | Spread | Commission | Maximum Leverage |
|--------|----------------|--------|----------|----------------------|
| Cent | $5 USD | From 1.0 pip | $0 | Up to 1:1000 |
| Standard | $50 USD | From 1.0 pip | $0 | Up to 1:1000 |
| Raw | $500 USD | From 0.0 pips | $3/lot/side | Up to 1:500 |
| Institutional | $50,000 USD | From 0.0 pips | Negotiable | Customized |

4.2 The Company reserves the right to modify account conditions upon prior notice to the Client.

4.3 The Client may maintain multiple trading accounts, subject to the Company's prevailing policies.

---

## 5. IDENTITY VERIFICATION (KYC)

5.1 The Client is required to complete the identity verification process before depositing, trading, or withdrawing funds. This process includes:

- Valid identity document (passport, national ID, or driver's license).
- Recent proof of address (utility bill, bank statement, no older than 3 months).
- Biometric verification (selfie or liveness check) where required.

5.2 The Company uses Sumsub as its KYC verification service provider.

5.3 The Company reserves the right to request additional documentation at any time, including but not limited to source-of-funds declarations for deposits exceeding certain thresholds.

5.4 Falsification of documents or provision of false information will result in immediate account closure and return of funds in accordance with applicable regulation.

---

## 6. DEPOSITS

6.1 The Client may deposit funds through the payment methods enabled in the Client Portal, including credit/debit cards (Visa, Mastercard), bank transfers, cryptocurrencies (USDT, BTC, ETH), and local payment methods (PIX, PSE, OXXO, Nequi, Yape, Mercado Pago, among others).

6.2 Deposits are subject to the following conditions:

- The minimum deposit varies according to the selected account type.
- Funds must originate from an account or payment method in the Client's name.
- Third-party deposits are not accepted, save for documented exceptions approved by the Compliance department.
- Crediting times vary according to the payment method used.

6.3 The Company does not charge deposit fees, although intermediary payment providers may apply their own fees.

---

## 7. WITHDRAWALS

7.1 The Client may request withdrawals of funds through the Client Portal, subject to the following conditions:

- KYC verification must be approved.
- Withdrawals up to the amount of the original deposit must be made via the same method used for the deposit.
- Profits may be withdrawn via any available method.
- Withdrawals are processed within the timeframes established according to the payment method (generally within 24 business hours for processing by the Company).

7.2 The Company reserves the right to withhold a withdrawal temporarily where:

- There is suspicion of fraudulent activity or money laundering.
- Additional verification of source of funds is required.
- There are open positions that could result in an insufficient balance.
- Inconsistencies are detected in the Client's information.

7.3 In the event of a hold, the Company will notify the Client and request the information necessary to resolve the situation.

---

## 8. TRADING OPERATIONS

8.1 Trades are executed through the MetaTrader 5 platform under the conditions published for each instrument (spread, commission, swap, leverage, minimum position size). Technical details and product specifications are published at neomaaa.com and may be consulted in MT5 (Symbol Specifications). This section is complemented by the Order Execution Policy (`legal/order-execution-policy.md`).

8.2 The Company operates under a hybrid ECN/STP execution model with routing to multiple liquidity providers. Neomaaa Ltd may act as principal or counterparty to the Client's trades. Execution may be subject to slippage, latency, requotes, delayed execution, or market conditions outside the Company's control. Primary data centers are located at Equinix (NY4, LD5) with a target SLA of 99.9% uptime published at neomaaa.com.

8.3 Orders are executed at the price available at the time of execution (Market Execution). Positive or negative slippage may occur and is inherent to this execution model. There are no requotes under Market Execution save in exceptional circumstances.

8.4 **Spreads and commissions.** Variable (floating) spreads, typical minimums: Raw from 0.0 pips (with USD 7 round-turn commission per forex lot), Standard from 1.0 pips (no commission), Cent equivalent to Standard with lots expressed in cents, Institutional negotiable. Spread widening during news events, at market open/close, and during low liquidity is industry standard.

8.5 **Swap (overnight financing).** Positions open at rollover (typically 21:00 GMT) are charged or credited according to the interest rate differential. On Wednesdays, **triple swap** applies to cover the weekend. **Swap-free (Islamic) accounts** are available on request with religious grounds; an alternative administrative fee may apply.

8.6 **Order size.** Minimum volume 0.01 lots (micro lot); 0.01 in Cent is equivalent to 0.0001 standard lots. The maximum volume per order and maximum exposure per client vary by instrument and may be capped by the Company to protect book integrity (particularly in crypto CFDs and exotics).

8.7 **Margin call and stop-out.**
- **Margin call:** when the margin level falls below the threshold defined on the account specifications page, the Client receives an alert but may continue trading.
- **Stop-out:** when the stop-out threshold is reached, the system automatically closes positions starting with the largest-loss position until a healthy margin level is restored.
- **Negative balance protection:** guaranteed. If the market gaps and the balance goes negative, it is reset to zero. The Client does not owe money to the broker.

8.8 **Hours.** Forex: Sunday 22:00 GMT to Friday 22:00 GMT. Metals: similar to forex with breaks. Indices/commodities/stocks/ETFs: hours of the underlying market. Crypto CFDs: 24/7. Indices, commodities, and energies are subject to expiration and rollover of the underlying contract (managed by the broker with prior notice).

8.9 **Prohibited trading practices.** The following practices are not permitted and may result in cancellation of trades, forfeiture of profits obtained through the practice, removal of bonuses, and/or account closure:

- **Latency arbitrage** — use of technology to exploit delay between the broker's feed and the underlying market; EAs with latency arbitrage logic; toxic flow against the broker.
- **Price / quote manipulation** — coordinated orders, layering, spoofing, wash trading.
- **Arbitrage between related accounts** — hedging between the Client's own accounts, direct family members' accounts, employee accounts, or from the same repeated IP; hedging against an external broker to exploit bonuses or rebates.
- **Bonus abuse** — multi-accounting, synthetic turnover without genuine risk, collusion with IB/affiliate. See `legal/bonus-terms.md` section 6.
- **Abusive swap arbitrage** on Islamic accounts (use without religious grounds to avoid swap on long-held positions) — may result in reclassification to a standard account with retroactive recalculation.
- **Exploitation of pricing errors / stale quotes** — trades against off-market prices may be canceled or adjusted to the fair price (industry-standard practice).
- **Pre-open / post-close trading** with intent to capture micro-gaps known ex ante.
- **Use of prohibited software** — EAs employing latency arbitrage, abusive exploitation of rollovers, or third-party tools with "no-loss" guarantees based on arbitrage against the broker.

The Company maintains automated monitoring of suspicious patterns and manual audit by Compliance and Dealing. Escalated consequences: formal warning on a first minor offense; cancellation of abusive trades + removal of bonus + forfeiture of profits on a moderate or repeated offense; account closure, retention of funds, and reporting to AOFA in cases of fraud. The Client may appeal via `legal/complaint-handling.md`.

8.10 **Exposure and event restrictions.** The Company may reduce maximum leverage, widen required margin, restrict the opening of new positions, or impose exposure limits on specific instruments during high-risk events (NFP, FOMC, elections, geopolitical or liquidity disruptions). Prior notice where possible. In stocks/ETFs CFDs there are no shareholder rights; adjustments for dividends and corporate actions are automatic as of the ex-date.

8.11 The Company reserves the right to:

- Modify leverage levels with a minimum of 7 days' prior notice, save in extraordinary market circumstances.
- Adjust spreads under extreme market conditions.
- Cancel trades resulting from manifest pricing errors (error quotes).
- Limit or restrict trading in certain instruments.

---

## 9. COPY TRADING

9.1 The Copy Trading feature allows the Client to automatically replicate the trades of other traders (signal providers).

9.2 The Client acknowledges that:

- Past performance does not guarantee future results.
- The Client is solely responsible for the decision to copy a trader.
- Execution conditions may differ between the provider's account and the copier's account.
- Copying may be stopped at any time.

---

## 10. VAULT YIELD SYSTEM

10.1 The Vault Yield System allows the Client to earn a yield of up to 5% per annum on funds deposited in the vault.

10.2 The yield is not guaranteed and may vary.

10.3 The Vault Yield is not a bank deposit and is not covered by any deposit guarantee scheme.

10.4 Funds in the vault are subject to the same operational risks as funds in the trading account.

---

## 11. PROTECTION OF FUNDS

11.1 Client funds are held in segregated accounts, separated from the Company's operating funds, in accordance with AOFA regulatory requirements.

11.2 Segregation of funds does not constitute an absolute guarantee of return in the event of the Company's insolvency.

---

## 12. COMMUNICATIONS

12.1 The Company will communicate with the Client through:

- The email address registered in the account.
- Notifications on the Client Portal.
- Live chat via Intercom.
- Telephone, where necessary.

12.2 The Client is responsible for keeping contact information up to date.

12.3 Communications sent to the registered email address will be deemed duly notified.

---

## 13. CLIENT RESPONSIBILITIES

The Client undertakes to:

- Provide truthful information and keep it updated.
- Not use the Company's services for illegal activities.
- Protect access credentials and not share them with third parties.
- Comply with applicable tax and regulatory laws in the Client's jurisdiction.
- Not attempt to manipulate prices, exploit platform errors, or engage in abusive trading activity.
- Monitor open positions and margin level.

---

## 14. LIMITATION OF LIABILITY

14.1 The Company will not be liable for losses arising from:

- The Client's trading decisions.
- Technological failures outside the Company's reasonable control (internet, Client's hardware, force majeure).
- Adverse market movements.
- Execution of orders at prices different from those requested due to market conditions.
- Force majeure events (natural disasters, wars, pandemics, governmental interventions).

14.2 The Company's maximum liability in any case shall not exceed the amount of funds deposited in the Client's account at the time of the event giving rise to the claim.

---

## 15. RESTRICTED COUNTRIES

The Company's services are not available to residents of:

**Regulatory restrictions** (we do not accept clients due to regulatory or internal policy): United States of America, Canada, the European Economic Area (EEA), the United Kingdom, Australia.

**Internationally sanctioned jurisdictions** (automatic rejection): Cuba, Iraq, Myanmar, North Korea, Sudan, and any country or individual under specific UN / EU / UK / OFAC sanctions.

**Enhanced monitoring (FATF grey list):** Resident clients are classified as MEDIUM RISK and mandatory Source of Funds is required. Current list in `compliance/risk-matrix.md` section 5 and `compliance/screening-sanciones.md`.

Clients attempting to register from restricted countries will be rejected during the KYC verification process (see `legal/aml-kyc-policy.md` section 7).

---

## 16. TERMINATION

16.1 The Client may request closure of the account at any time, provided there are no open positions or outstanding obligations.

16.2 The Company may close the Client's account in the following cases:

- Breach of these Terms and Conditions.
- Suspicion of fraudulent or illegal activity.
- Provision of false information or fraudulent documentation.
- Prolonged account inactivity in accordance with the dormant accounts policy.
- Requirement of a regulatory or judicial authority.

16.3 In the event of closure, remaining funds will be returned to the Client via the same deposit method used, subject to applicable security verifications.

---

## 17. GOVERNING LAW AND DISPUTE RESOLUTION

17.1 These Terms and Conditions are governed by the laws of Anjouan, Union of Comoros.

17.2 In the event of a dispute, the parties shall attempt to resolve it amicably through the Company's complaints procedure (see Complaint Handling Policy).

17.3 If no amicable resolution is reached, the dispute shall be submitted to the jurisdiction of the competent courts of Anjouan.

---

## 18. FINAL PROVISIONS

18.1 If any clause of these Terms and Conditions is declared null or unenforceable, the remaining clauses shall continue in force.

18.2 The failure to exercise a right by the Company does not constitute a waiver of such right.

18.3 These Terms and Conditions, together with the Risk Disclosure Statement, the Privacy Policy, the Client Agreement, and other legal documents published by the Company, constitute the entire agreement between the parties.

---

**Neomaaa Ltd** | IBC 15968 | License L15968/N | AOFA, Anjouan, Union of Comoros

*Last updated: April 2026*
