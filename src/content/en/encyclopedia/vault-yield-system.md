# Vault Yield System — NEOMAAA Passive Yield System

**Version:** 1.0
**Date:** April 15, 2026
**Audience:** Full team (sales, support, compliance, marketing, ops)
**Classification:** Internal use — suitable for team training

> [!INFO]
> **Source document:** The feature is officially published on **neomaaa.com** as "Vault Yield System". Definitive legal terms and conditions live in `legal/vault-yield-terms.md` and at https://neomaaa.com/about/legal-documentation. This internal document is an operational/commercial guide — it does not replace the legal contract.

---

## 1. What the Vault Yield System is

The **Vault Yield System** (hereinafter, "the Vault") is an official NEOMAAA Markets feature that lets the client **deposit funds into a dedicated non-trading wallet ("vault") and earn an annualized return (yield) on the maintained balance**. It is a passive yield product, conceptually similar to:

- **Binance Earn** (Flexible Savings)
- **Crypto.com Earn**
- **Nexo Earn**
- **Coinbase Rewards (USDC Earn)**

The core idea: a client not actively trading can **put their capital to work** instead of leaving it idle in the trading account. NEOMAAA pays periodic interest on funds locked or semi-locked in the Vault.

> [!WARNING]
> **Attention:** The Vault Yield System is **NOT trading, NOT a regulated bank deposit, NOT a guaranteed IMF.** It is a yield product operated by the broker, with its own risks the client must understand before using it. See section 6 (Risks).

---

## 2. How it works — General mechanics

### 2.1 Client flow (high level)

<div className="neo-flow">
<div className="neo-step" data-num="1"><strong>The client deposits</strong> funds at NEOMAAA (via traditional PSP or crypto rail).</div>
<div className="neo-step" data-num="2"><strong>Transfers to the Vault</strong> from the client portal — chooses amount and term (flexible or locked, depending on the active plan).</div>
<div className="neo-step" data-num="3"><strong>Accrues yield</strong> daily at the rate published on the product page.</div>
<div className="neo-step" data-num="4"><strong>Withdraws or compounds</strong> — can request withdrawal of principal + interest per plan rules, or let it compound.</div>
</div>

### 2.2 Underlying asset

The Vault typically operates on **stablecoins (USDT / USDC)** because:
- They are the broker's main crypto intake asset (most crypto deposits come in as USDT).
- They enable yield in regulated DeFi protocols, institutional staking, or a counterparty lending desk.
- They offer value stability (don't expose the client to crypto-spot volatility while accruing yield).

[DATA: confirm with Diego/Finance whether the Vault also accepts USD fiat, BTC, or multi-asset. As of this doc's date, the operational assumption is USDT as core.]

### 2.3 Terms

Typical industry models (NEOMAAA likely uses one or more of these):

| Plan | Lock-up | Relative yield |
|---|---|---|
| **Flexible** | No lock — 24/7 withdrawal | Lower (base) |
| **Locked 30d** | 30 days no withdrawal | +~1-2% over flexible |
| **Locked 90d** | 90 days | +~2-3% over flexible |
| **Locked 180d/365d** | 6-12 months | +3-5% over flexible |

[DATA: exact published term structure — confirm with Diego/Finance. Base rate and rates by term are variable and updated on the product's official page.]

### 2.4 Yield calculation

**General formula (industry standard):**

```
Daily_yield = Vault_balance × (APY / 365)
Accrued_yield = Sum(Daily_yield) during the period
```

- **APY** = Annual Percentage Yield, net of product fees.
- **APR vs APY:** if the yield auto-compounds (reinvests), it's expressed as APY. If paid out without compounding, it's APR.
- **Payout:** daily accrual, with payout typically daily or at the end of the lock.

[DATA: exact current APY, calculation method (APR vs APY), payout frequency, and whether there is automatic compounding — confirm on the product page.]

---

## 3. Eligibility

### 3.1 Eligible clients

- Client with a NEOMAAA Markets account **KYC approved** (full tier).
- Residence in a **non-restricted** jurisdiction (see `compliance/risk-matrix.md` section 5).
- [DATA: whether it requires a minimum account tier (Standard/Raw/Institutional) or whether Cent also has access].

### 3.2 Non-eligible clients

- Residents of **USA, Canada, EEA (including Spain), UK, Australia** (same general broker restrictions).
- OFAC comprehensive jurisdictions (Cuba, Iran, Syria, North Korea, Myanmar, Sudan, Crimea).
- Clients under unresolved EDD flag with compliance.
- Minors or corporate accounts without explicit enablement (corporate vault terms live separately).

### 3.3 Typical operational limits

- **Minimum Vault deposit:** [DATA: confirm — industry standard $100-$500 USDT].
- **Maximum per client:** [DATA: confirm — there may be a cap by tier or AML detection].
- **Maximum aggregate for the product:** decided by Finance/Treasury based on pool yield capacity.

---

## 4. Commercial benefits (sales angle)

> [!TIP]
> **Commercial use:** The Vault is a powerful **retention and LTV** lever. A client with capital in the Vault is structurally less prone to churn because there is an opportunity cost in leaving.

### For the client
- **Idle capital working** — instead of leaving the balance untraded, it generates yield.
- **Alternative to a bank fixed term** — potentially more competitive than traditional LATAM banks.
- **Flexible liquidity** (on the flexible plan) — can withdraw anytime to trade.
- **Refuge during non-trading periods** — vacations, range-bound market, psychological drawdown.

### For the broker (internal use)
- **Retention:** a client with capital in Vault is stickier.
- **Float:** the broker manages the Vault pool float, generating a spread between yield paid to the client and yield generated on the backend (see section 7).
- **Cross-sell:** the Vault is a gateway for traders coming from crypto/DeFi who prefer passive yield over active trading.

---

## 5. Angles for sales and support

### What you CAN say to the client
- "The Vault is an official NEOMAAA feature that lets you earn yield on your unused balance."
- "The current rate is published on the product page and may be updated. Legal terms are at neomaaa.com/about/legal-documentation."
- "It's a yield product, not a guaranteed bank deposit. Lock-up terms, minimums and risks are in the Vault Yield Terms."
- "You can see your balance and accrued yield in the client portal."

### What you CANNOT say to the client
- ❌ "Guaranteed yield" — the yield is published but subject to terms and may be adjusted.
- ❌ "Protected / insured" — there is NO FDIC-type deposit insurance.
- ❌ "Risk-free" — the product has operational and counterparty risks.
- ❌ "You'll earn X% for sure over the next 12 months" — the rate is variable.
- ❌ "It's the same as a bank fixed term" — it is **NOT** a regulated banking product.

### Response template (chat/email)
> *"The Vault Yield System lets your non-operating balance generate an annualized return. The current rate and conditions are published on the product page at neomaaa.com. The full legal terms are in our Vault Yield Terms. Keep in mind it's a yield product, different from a regulated bank deposit — it involves certain risks worth reading about before using. If you want I can send you the direct link to the terms or walk through a concrete example."*

---

## 6. Risks (transparency with the client and compliance)

### 6.1 Operational risks
- **It is not a guaranteed bank deposit.** No FDIC, no regulatory guarantee fund.
- **Lock-up:** on locked plans, the client cannot withdraw before maturity (or pays a penalty).
- **Rate variability:** the published APY may be adjusted with prior notification per the terms.

### 6.2 Counterparty risks
- Yield is generated because Vault pool funds are deployed into yield strategies: institutional staking, lending to desks, whitelisted DeFi protocols, or proprietary treasury. Each has a different counterparty risk.
- [DATA: pool backend composition — confirm with Finance/Treasury for internal regulatory documentation].

### 6.3 Market risks
- If the underlying asset is a stablecoin, the main risk is **de-peg** (extreme event) or regulatory **freeze** by the issuer (USDT, USDC). Monitor with Treasury.

### 6.4 Regulatory risks
- Yield products on stablecoins have drawn regulatory scrutiny (SEC in USA against BlockFi/Celsius/Gemini). The AOFA license permits this product under certain terms, but **it is not offered to EEA/USA/UK residents** to avoid being classified as a security.

### 6.5 Mandatory disclosures (sales/marketing)
Any commercial Vault communication must include the disclaimer:

> *"The Vault Yield System is a yield product operated by Neomaaa Ltd. It is NOT a guaranteed bank deposit. The published return is variable and subject to the Vault Yield Terms. The product is not available to residents of USA, Canada, EEA, UK, Australia or sanctioned jurisdictions. Past returns do not guarantee future returns. Read the full terms before participating."*

---

## 7. Internal operations (ops/finance/compliance only)

### 7.1 Pool management
- The Vault pool is a wallet segregated from the broker's trading flow (to avoid commingling client funds with the broker's trading P&L).
- [DATA: exact structure — segregated crypto wallet, dedicated bank account, or hybrid — confirm with Treasury and wallet-structure-neomaaa.md].

### 7.2 Reconciliation
- Daily: reconcile the Vault pool balance against the sum of individual client balances in Vault + accrued yield.
- Weekly: report to Principals (Diego / Yulia / Stanislav) on Vault AUM, yield paid, product net margin.
- Monthly: internal audit (Yulia) + log in Notion/compliance tracker.

### 7.3 Compliance and AML
- Large Vault deposits may trigger EDD per `compliance/edd-triggers.md` (same threshold as a regular deposit).
- Vault withdrawals to external wallets → mandatory Chainalysis/TRM screening (see `compliance/screening-sanciones.md`).
- Client moving funds Vault ↔ trading ↔ external in a suspicious pattern → escalate to Susana (possible SAR).

### 7.4 Handling a Vault complaint
- First level: Support explains the product and checks the published rate.
- Second level: Finance reviews the yield calculation in the portal.
- Third level: Compliance (if there is a claim of malpractice or incorrect yield execution) → can escalate to `legal/complaint-handling.md`.

---

## 8. Related links

- `legal/vault-yield-terms.md` — Legal terms of the Vault Yield System (official legal doc).
- `legal/client-agreement.md` — Client agreement (general contractual framework).
- `legal/terms-conditions.md` — General T&C.
- `encyclopedia/abc.md` — "Vault Yield System" glossary entry.
- `executive/wallet-structure-neomaaa.md` — Wallet structure supporting the Vault (includes float management).
- `compliance/edd-triggers.md` — EDD triggers for large Vault deposits.

---

## 9. Pending confirmations (placeholder list)

The following dataset must be confirmed with **Diego / Yulia / Stanislav / Finance** before considering this doc "locked":

- [ ] **Exact current APY** (base and by term).
- [ ] **Payout frequency** (daily accrual, monthly payout, automatic compounding).
- [ ] **Entry minimums** (in USDT or equivalent).
- [ ] **Per-client and global maximums**.
- [ ] **Terms offered** (flexible, locked 30d / 90d / 180d / 365d).
- [ ] **Backend asset mix** (staking, lending desk, whitelisted DeFi) + associated counterparty risk.
- [ ] **Exact restricted jurisdictions** for the product (beyond the broker baseline).
- [ ] **Early-withdrawal penalties** (if applicable on locked).
- [ ] **Minimum account tier** required (does Cent access, or only Standard+).
- [ ] **Direct link to the Vault Yield Terms** on neomaaa.com/about/legal-documentation.

Once these data points are confirmed, update this doc and the legal doc `legal/vault-yield-terms.md`.

---

> [!INFO]
> Last consistency audit: April 15, 2026 (currency audit against neomaaa.com).
