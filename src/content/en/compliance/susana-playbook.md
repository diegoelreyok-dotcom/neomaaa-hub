# Compliance Playbook — Susana's daily operational guide

**Operational document — internal use**
**Neomaaa Ltd (IBC 15968) | License L15968/N | AOFA**
**Version: 1.0 | Date: April 13, 2026**
**Author: Susana (Compliance Officer)**
**For:** Susana, as first entry point each morning.

> **This is your daily menu. It is not a formal manual — it is your operational map.**
> If you have doubts, start here. From this doc you will jump to the specific SOP you need.

---

## 1. Welcome + how to use this playbook

Hello Susana. This document is **your starting point every day**. It does not have to be read in full — it is made so that you open it and **in 30 seconds you know what to do**.

How it works:

1. **You start the morning** → go to the **"My typical day"** section (section 2) and execute the checklist.
2. **A strange case comes in** → go to the **"What do I do if…"** menu (section 3), identify the situation, and the menu links you to the corresponding SOP.
3. **You need to write an email to the client** → go to **"Email templates"** (section 5), copy, edit, send.
4. **They ask you something from Sales/Support/Dealing** → go to **"Response templates for the team"** (section 6).
5. **You feel you're in over your head** → **escalate to Diego**. You are not alone. Section 10.

> **Golden rule:** when in doubt, document and escalate. Documentation + good faith = protected. Decisions without paper = exposed.

---

## 2. My typical day — Susana's daily routine

### First hour of the day (30–45 min)

```
□ Open this playbook
□ Open Sumsub dashboard → review new alerts (PEP, Sanctions, pending EDD)
□ Review compliance@neomaaa.com inbox → urgent emergents
□ Review legal@neomaaa.com inbox (official broker legal email published on neomaaa.com) → subpoenas, regulator requests, formal notifications
□ Review support@neomaaa.com inbox if there are support escalations that touch compliance
□ Review status of open EDD cases — any expired SLA?
□ Review team pings (Sales, Support, Dealing, Marketing) from the previous day
□ Review compliance-calendar.md → what's due today?
```

### During the day (on demand)

- Attend team queries about specific clients.
- Advance EDD cases: request missing info, review received docs, decide and document.
- Review alerts coming into Sumsub.
- Review unusual withdrawals if Dealing flags them.
- Update continuous monitoring of HIGH RISK accounts per the calendar.

### Emergencies (interrupt everything)

Drop everything if it occurs:

- **Confirmed sanctions match** (UN, OFAC, EU, UK, Anjouan).
- **Email or call from AOFA** (regulator).
- **Court order / subpoena.**
- **Negative press** about an active client.
- **Clear structuring** (laundering pattern in progress).

For all these → see section 3.4 (Regulatory situations) + immediate escalation to Diego.

### End of day (15 min)

```
□ Log of cases worked today (internal notebook or Notion compliance log)
□ Pending follow-ups for tomorrow (short list)
□ Mark pending Sumsub alerts → prioritize for tomorrow
□ Close compliance email with zero inbox if possible
```

> **Tip:** If you work more than 10 hours, something is off. Either you have too much load (request junior) or you are getting scattered. Compliance done well fits in 7–8h/day except for specific crises.

---

## 3. Menu — "What do I do if…"

This is **the index of real situations**. Find yours, read the quick action, and if you need more detail, follow the link to the SOP.

### 3.1 Onboarding situations

#### New client comes from restricted country

- **Quick action:** automatic rejection. No account is opened. No deposit is accepted.
- **See:** [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones) (prohibited countries list) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) section 5.
- **Email template:** template #4 (rejection) with generic wording — **never** state the specific reason.

#### New client with "clean" Sumsub (all green)

- **Quick action:** automatic approval if risk-matrix classifies LOW. Verify in Sumsub that the 3 pillars are green: ID, liveness, proof of address.
- **See:** [`/content/compliance/proceso-kyc-sumsub`](/content/compliance/proceso-kyc-sumsub) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix).
- **Expected time:** 5 minutes per client.

#### New client with Sumsub "alert" PEP

- **Quick action:** **do not auto-reject**. Open EDD case. Investigate if PEP is domestic, foreign, or international organization. Review family members and close associates.
- **See:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) section 3 + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).
- **Final decision:** requires written approval from Diego (designated Director).
- **Expected time:** 3–7 days.

#### New client with Sumsub "alert" Sanctions

- **Quick action:** IMMEDIATE. Preventive freeze. Do not process deposit. Do not respond to client with details. Escalate to Diego within the hour.
- **See:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) section 4.
- **If true positive:** mandatory SAR → [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).
- **If false positive:** document in Sumsub and release. **Always with written evidence.**

#### New client with high-risk profession

Examples: casino dealer, arms dealer, crypto OTC operator, independent MSB, cash-intensive wholesale jewelry, diamonds, high-value art.

- **Quick action:** automatic HIGH RISK category. Mandatory EDD. Documented source of funds.
- **See:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) HIGH category + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).

#### New corporate client with opaque structure

Opacity indicators: offshore trust without clear UBO, shell company in non-cooperative jurisdiction, nominee directors, several layers without commercial explanation.

- **Quick action:** mandatory EDD with identification of all UBOs >10% + explanatory letter of structure.
- **See:** [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers) + corporate EDD form.
- **Rule:** if after EDD the structure still does not make economic sense → **reject**.

#### New client referred by IB

- **Quick action:** apply normal risk-matrix to the client. **Additional:** review IB's track record (if they bring many clients with red flags, escalate IB review).
- **See:** [`/content/partners/playbook-ib`](/content/partners/playbook-ib) + [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix).

### 3.2 Existing client situations

#### Existing client has strange transaction

E.g.: deposit 10x greater than historical, wire from new bank, withdrawal to different account than original deposit.

- **Quick action:** open monitoring case. Investigate 48h. If it is explainable and documentable → close case. If not → SAR consideration.
- **See:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Existing client changed country to a high risk one

- **Quick action:** immediate re-categorization. If the new country is on FATF grey/black list or restricted → may require account closure or freeze.
- **See:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) section 5 + [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones).

#### Existing client is now PEP

Occurs when the client enters politics, wins an election, takes public office, or is discovered to always have been one.

- **Quick action:** upgrade to HIGH RISK. Open retrospective EDD. Require updated source of funds. Diego approval.
- **See:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) + [`/content/compliance/edd-triggers`](/content/compliance/edd-triggers).

#### Existing client: new sanctions match

Occurs when in a periodic re-screening the match appears.

- **Quick action:** immediate FREEZE. NO tip off. Escalate Diego within the hour. Prepare SAR.
- **See:** [`/content/compliance/pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) section 4 + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Existing client withdraws quickly post-deposit without trading

Classic layering pattern (money laundering phase 2).

- **Quick action:** hold withdrawal. Request explanation from client via generic email (without revealing suspicion). If the explanation is not coherent or they do not respond → SAR.
- **See:** [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Existing client: unusual trading patterns

E.g.: operations systematically against the market without logic, synthetic trades between accounts of the same beneficial owner, "wash trading" to move money.

- **Quick action:** deep monitoring with Pepe (Head of Dealing). Review if there is daisy-chain between accounts. SAR consideration.
- **See:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop).

### 3.3 Team situations

#### Sales agent: "can I close with this PEP client?"

- **Quick response:** "Do not auto-reject. Send me the name and country, I open EDD case. Typical process 5–7 days. If it passes, you close; if not, I let you know."
- **Response template:** see section 6.1.

#### Support: "client X says Y, does it seem strange to you?"

- **Quick response:** "Thanks for the ping. I open investigation. SLA 48h. Do not interact with the client on this until I give you green light."
- **Response template:** see section 6.2.

#### Dealing/Pepe: "strange pattern in account Z"

- **Quick response:** "I review in 24h. If it is urgent for freeze (e.g. pending withdrawal), tell me now."
- **Response template:** see section 6.3.

#### Marketing: "can we target ads in country X?"

- **Quick action:** verify `screening-sanciones.md`. If restricted → NO. If grey list → consult before big campaign.
- **See:** [`/content/compliance/screening-sanciones`](/content/compliance/screening-sanciones) + [`/content/marketing/copy-broker`](/content/marketing/copy-broker).

#### IB: "I brought 5 clients from [region]"

- **Quick action:** review IB pattern. If the 5 are LOW → ok. If there is >1 HIGH RISK → review IB quality + possible warning. If there is a repeated red flag pattern → review IB relationship.
- **See:** [`/content/partners/playbook-ib`](/content/partners/playbook-ib).

### 3.4 Regulatory situations

#### Email or call from AOFA (regulator)

- **Quick action:** immediate. Notify Diego before responding anything. Consult with external lawyer if the requirement is formal.
- **Rule:** never respond to AOFA without Diego's authorization. Never improvise. Everything in writing.
- **See:** [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar) regulatory section + section 10 of this playbook.

#### Subpoena or legal order

- **Quick action:** immediate. Notify Diego + external lawyer. Do not return affected client's funds without judicial authorization or legal advice. Do not contact the client.
- **Documentation:** archive subpoena in legal folder + create case file.

#### AOFA audit (scheduled or surprise)

- **Quick action:** prepare documentation per annual checklist of [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar).
- **Key documents to have at hand:** current AML/KYC policy, risk assessment, SAR log, training records, ongoing monitoring reports, SOPs, compliance meeting minutes.

#### Negative media coverage of a client

E.g.: the client appears in a newspaper for fraud, corruption, drug trafficking.

- **Quick action:** open monitoring case. Evaluate if preventive freeze is needed. SAR if the press gives rise to reasonable suspicion.
- **See:** [`/content/compliance/ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) + [`/content/compliance/sar-reporting`](/content/compliance/sar-reporting).

#### Change in FATF grey/black list

FATF updates lists 3 times a year (February, June, October).

- **Quick action:** update `risk-matrix.md` section 5. Re-categorize affected clients. Reassess HIGH RISK accounts with new exposure.
- **See:** [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) + [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar) quarterly section.

---

## 4. Quick links — all compliance docs

| Doc | What it is for | When I use it |
|---|---|---|
| [`risk-matrix`](/content/compliance/risk-matrix) | Categorize client LOW / MEDIUM / HIGH | On each new client |
| [`edd-triggers`](/content/compliance/edd-triggers) | EDD process + form | HIGH RISK client or trigger detected |
| [`pep-sanctions-sop`](/content/compliance/pep-sanctions-sop) | PEP + Sanctions screening | When receiving Sumsub alerts |
| [`sar-reporting`](/content/compliance/sar-reporting) | Report suspicious activity | When I detect red flag |
| [`compliance-calendar`](/content/compliance/compliance-calendar) | Periodic routine (daily/weekly/monthly/quarterly/annual) | To plan and not forget recurring tasks |
| [`ongoing-monitoring-sop`](/content/compliance/ongoing-monitoring-sop) | Post-onboarding monitoring | Monthly / trigger-based reviews |
| [`screening-sanciones`](/content/compliance/screening-sanciones) | Restricted countries list | Verify any client / country |
| [`workflow`](/content/compliance/workflow) | General compliance workflow + Sales→Compliance handoff | Process reference |
| [`manual-susana`](/content/compliance/manual-susana) | Official compliance manual (gold source) | Prohibited phrases, onboarding tiers, escalation |
| [`proceso-kyc-sumsub`](/content/compliance/proceso-kyc-sumsub) | Sumsub technical SOP | How to operate Sumsub step by step |
| [`ab-book-policy`](/content/compliance/ab-book-policy) | A-Book / B-Book policy | Dealing and regulatory queries |
| [`onboarding`](/content/compliance/onboarding) | Detailed client onboarding | Complete enrollment process |
| [`expansion-regulatoria`](/content/compliance/expansion-regulatoria) | Regulation by region | Before opening a new market |
| [`legal/aml-kyc-policy`](/content/legal/aml-kyc-policy) | Official AML/KYC policy (legal) | Formal reference for audits |
| [`legal/terms-conditions`](/content/legal/terms-conditions) | Official T&Cs | What the client accepts upon registration |

> **Tip:** bookmark the first 6 docs as favorites in the browser. They are 90% of your daily consultation.

---

## 5. Email templates — ready to copy

All templates assume you sign as **Susana, Compliance Officer, Neomaaa Ltd — L15968/N**.

### 5.1 Request for additional documentation (MEDIUM or EDD)

```
Subject: Neomaaa Markets — Additional documentation required for your account

Dear [Name],

Thank you for opening your account with Neomaaa Markets.

To complete the verification of your account per our AML/KYC policies
and the requirements of our regulator (AOFA), we need additional
documentation:

[Specific list per risk-matrix, for example:]
- Proof of source of funds: last 3 payslips, sworn declaration,
  or bank statement showing origin of deposited funds.
- Updated proof of address (last 3 months): utility bill,
  bank statement or rental/property contract.
- [Other case-specific documents].

Please send the documents to compliance@neomaaa.com within the
next 7 business days.

If you have questions about what documentation works, reply to this
email and we will guide you.

Kind regards,
Susana — Compliance Officer
Neomaaa Ltd — License L15968/N (AOFA)
compliance@neomaaa.com
```

### 5.2 Follow-up if no response (day 7)

```
Subject: Re: Neomaaa Markets — Pending documentation reminder

Dear [Name],

I am writing again regarding the additional documentation requested
on [date]. We have not yet received the documents.

Without that documentation we cannot approve your account verification
nor process operations or withdrawals.

If you have any difficulty sending them, reply to this email and
we will find an alternative together.

Regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.3 Final follow-up (day 14) — before closure

```
Subject: URGENT — Neomaaa Markets — Imminent account closure

Dear [Name],

This is our last attempt to contact you regarding the documentation
pending since [date].

If we do not receive the requested documents within the next
3 business days, we must proceed to:

1. Close your account for non-compliance with regulatory requirements.
2. Return deposited funds to the original payment method, deducting
   any applicable bank charges.
3. Report to our internal records per regulatory obligations.

You can avoid this action by sending the documentation to
compliance@neomaaa.com today.

Regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.4 Approval with restrictions

```
Subject: Neomaaa Markets — Account approved

Dear [Name],

We have completed the verification of your account.

Your account has been approved with the following terms:

- Internal risk category: [MEDIUM / HIGH]
- Continuous monitoring per our AML/KYC policies.
- [Operational limits if applicable, e.g.: max monthly deposit $X
  until next review].
- Periodic re-review every [3 / 6 / 12] months.

You can begin trading from the MT5 platform. Any significant change
in your activity pattern (deposits, withdrawals, source of funds)
will be reviewed per our regulatory obligations.

If you have questions, reply to this email.

Kind regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N (AOFA)
```

### 5.5 Rejection (client did not pass EDD or final decision not to onboard)

**Important:** never give the specific reason. The law protects the broker from having to explain compliance decisions.

```
Subject: Neomaaa Markets — Verification result

Dear [Name],

We have completed our internal verification process.

We regret to inform you that we cannot proceed with opening your
account at Neomaaa Markets. This decision is based on our internal
evaluation per our AML/KYC policies and regulatory obligations,
and we cannot provide specific details.

Any deposited funds will be returned to the original payment method
within 5–10 business days. If the original payment method is not
available, we will contact you to coordinate an alternative.

We appreciate your interest in Neomaaa Markets.

Kind regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.6 Request info from existing client (ongoing monitoring / periodic review)

```
Subject: Neomaaa Markets — Periodic documentation update

Dear [Name],

As part of our periodic compliance reviews (per our regulatory
obligations under AOFA), we need to update certain documentation
of your account.

Please send the following within the next 14 business days:

- [Document 1, e.g.: updated proof of address]
- [Document 2, e.g.: source of funds for recent deposits]
- [Other per case]

This is a standard review, it does not imply any problem with your account.
You can continue trading normally while completing the update.

Kind regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.7 Account freeze (CAREFUL with tipping off)

**CRITICAL:** if the freeze is due to AML or sanctions suspicion, **DO NOT notify the client the reason**. Use generic administrative excuse. **Tipping off is a crime under any AML jurisdiction** (including Anjouan).

```
Subject: Neomaaa Markets — Account review in progress

Dear [Name],

We inform you that your account has been temporarily paused while
we conduct a routine compliance review.

During this period you will not be able to make deposits, withdrawals
or new operations. Previously open positions are maintained under
normal market conditions.

This process may take up to [X] business days. We will contact you
at the end of the review.

We appreciate your patience.

Regards,
Neomaaa Markets — Compliance
```

> **Note Susana:** sign as generic "Compliance" in this case, **not personal**. Do not give phone. If the client insists on details → standard response: "We cannot share details of the internal process."

### 5.8 Communication with AOFA (SAR or others)

```
Subject: [SAR-YYYY-###] — Suspicious Activity Report Submission

To: [COMPLETE: AOFA official contact email]
CC: [COMPLETE: Director Neomaaa Ltd — Diego]

Dear [AOFA Contact],

We attach Suspicious Activity Report (SAR) per our regulatory
obligations under License L15968/N granted by the Anjouan Offshore
Finance Authority (AOFA).

Internal reference: NEOMAAA-SAR-[YYYY]-[###]
Detection date: [YYYY-MM-DD]
Submission date: [YYYY-MM-DD]

Case summary:
[3–5 neutral lines describing facts, not opinions.
E.g.: "On 2026-03-10 we detected unusual activity in the account of
a retail client KYC'd in November 2025. Pattern of fractioned deposits
(12 operations <$10K in 14 days) followed by withdrawal of 80% of
funds to a different bank account than the original deposit.
Client did not respond to clarification request."]

Attached documentation:
- Complete SAR report (standard format)
- Transaction logs
- Copies of initial KYC
- Evidence of communications with the client
- Any additional relevant evidence

We remain available for any additional requirement or
complementary information.

Sincerely,
Susana [FULL LAST NAME]
Compliance Officer
Neomaaa Ltd — IBC 15968 — License L15968/N
compliance@neomaaa.com
[COMPLETE: Official phone]
```

### 5.9 Account reactivation after freeze (when review resolved favorably)

```
Subject: Neomaaa Markets — Account reactivated

Dear [Name],

We inform you that we have completed the review of your account.

Your account has been reactivated and you can continue trading normally.

[Optional — if restrictions apply:] Note the following updated
operational terms: [list].

Thank you for your patience during the process.

Kind regards,
Susana — Compliance Officer
Neomaaa Ltd — L15968/N
```

### 5.10 Generic response to client pressing for details

```
Dear [Name],

Thank you for your message. As we previously indicated, we cannot
share specific details of the internal compliance process,
per our AML/KYC policies and regulatory obligations.

We will notify you as soon as the review is complete.

We appreciate your patience.

Regards,
Neomaaa Markets — Compliance
```

---

## 6. Response templates for the team

### 6.1 For Sales asking about a client

```
Hi [agent],

I reviewed the case of [Client — name/email].

Risk category: [LOW / MEDIUM / HIGH].
Action: [can close now / needs EDD first / cannot accept].
Brief reason: [one line, without legal details].

[If EDD:] Estimated process 5–7 days. We need from the client:
[specific docs]. You can ask for them or I ask directly,
whichever you prefer.

If there are important updates in the conversation with the client
(changes in source of funds, country, structure) let me know to
re-evaluate.

Regards,
Susana
```

### 6.2 For Support reporting suspicious client

```
Hi [agent],

Thanks for the report. I open internal investigation — SLA 48h.

Meanwhile:
- DO NOT interact with the client on this topic.
- If the client writes again about the same matter, send me the
  ticket and respond with neutral message ("we are reviewing, we will
  contact you soon").
- DO NOT mention "compliance" or "investigation" to the client.

I will let you know in 48h with the decision.

Regards,
Susana
```

### 6.3 For Dealing/Pepe about strange pattern

```
Hi Pepe,

Ok, I reviewed account [ID].

[Case A — is normal pattern:]
It is consistent pattern with [explanation: scalper, swing trader, typical
client size]. No AML red flag. We close the ping here.

[Case B — is suspicious:]
It is suspicious. I open investigation. Meanwhile:
- [Freeze pending withdrawals / Limit leverage / etc. per case]
- Keep trading monitoring active on this account.
- If there are more strange movements let me know immediately (do not wait
  until end-of-day).

I will update you in [24h / 48h].

Regards,
Susana
```

### 6.4 For Marketing about geographic targeting

```
Hi [agent],

About targeting in [country]:

[Country OK:] Without restrictions. You can run normal campaign. Apply
standard disclaimers per marketing/copy-broker.md.

[FATF grey list country / medium risk:] You can run, but:
- Review copy with me before launch.
- Leads from that country come with MEDIUM flag by default.

[Restricted country:] NO. We cannot accept clients from that country.
Do not run ads or organic there.

Regards,
Susana
```

### 6.5 For IB/Partners about quality

```
Hi [IB name],

Thanks for bringing the clients. Quick review:

- LOW RISK approved clients: [count]
- Clients in EDD: [count]
- Rejected clients: [count and generic reason]

[If quality is good:] All ok, keep bringing clients with that profile.
[If there are issues:] We noticed that [X% of your leads] ended in EDD or
rejection due to [generic reason — without individual details]. We could
adjust the targeting to bring more aligned profiles. Let's talk?

Regards,
Susana
```

---

## 7. Practical cases — real examples (anonymized)

These are real cases (altered for privacy). Read them at least once to internalize patterns.

### Case 1: PEP detected during onboarding (foreign PEP)

**What happened:** Sumsub raised PEP alert on a Brazilian client during initial KYC.

**Investigation:**
- Source check: he was economic advisor to the governor of São Paulo (domestic PEP figure in Brazil, **foreign PEP** from Anjouan's perspective).
- Verification in databases: LinkedIn matched, press mentions confirmed the role.
- Source of funds: provided private consulting contracts + signed sworn declaration.
- Family & associates: declared that his wife also worked in public administration (family PEP).

**Decision:** a complete EDD case was opened. Client delivered documentation in 5 days. Approved as HIGH RISK with:
- Quarterly transaction monitoring.
- Monthly deposit limit reviewed at 6 months.
- Diego's written approval archived in case file.

**Lessons:**
- Always verify PEP status + family members + close associates (spouse, adult children, business partners).
- Do not auto-reject — PEP is not crime, it is greater due diligence.
- The HIGH RISK decision is signed by Diego, not alone.

### Case 2: Sanctions match — false positive

**What happened:** Argentine client with identical name (first and second name + paternal surname) to a person sanctioned by OFAC (listed for drug trafficking).

**Investigation:**
- Argentine DNI: CUIT and date of birth did not match the OFAC record.
- Sumsub liveness photo: physically different person (age, features).
- Profession check: the client is an engineer at a mainstream company, the sanctioned had a totally different profile.
- Location: different cities.

**Decision:** documented as **false positive** in Sumsub with attached evidence (DNI vs OFAC comparison, photos, biography). Client approved LOW. Periodic screening activated as precaution.

**Lessons:**
- Common names in LATAM (José López, María García) give false positives constantly.
- ALWAYS validate with combination of: official document + photo + DOB + country.
- Document the "false positive" decision with evidence — if something appears later, you cover your back.

### Case 3: Real sanctions match — immediate action

**What happened:** newly onboarded client, $3K deposit via crypto. In weekly re-screening the following week, Sumsub raises match with UN list (multilateral sanction for evasion of sanctions to a specific regime).

**Investigation:**
- Match confirmed: same person (DOB + country + document matched).
- The client had been added to the UN list 48h after initial onboarding.

**Decision:**
1. **Immediate FREEZE** (same hour as detection).
2. Notification to Diego (Director) via Telegram + email.
3. NO communication to the client about the reason (tipping off).
4. SAR prepared and sent to AOFA in 48h.
5. Funds retained — legal consultation on how to proceed (no automatic return, depends on AOFA guidance).

**Lessons:**
- Real sanctions match = **drop everything**.
- DO NOT automatically return funds — it can be "facilitation" of crime.
- SAR is mandatory, not optional.
- Periodic re-screening is critical — the world changes after onboarding.

### Case 4: Structuring (laundering by fractionation) — SAR

**What happened:** LOW RISK client approved in January, operated normal for 2 months ($500 occasional deposits). Suddenly in March he made 22 deposits in 14 days, all between $2,000 and $4,500.

**Investigation:**
- Clear **structuring** pattern: fractionation to avoid reporting thresholds.
- The deposits came from 3 different bank accounts (beneficial owner apparently the same).
- Client attempted withdrawal of $60K to a fourth different bank account.

**Decision:**
1. Hold on the withdrawal.
2. Generic email to the client requesting "clarification on source of funds" (template 5.6, without revealing suspicion).
3. Client responded with inconsistent story (first said "crypto trading", then "car sale", then "family loan").
4. SAR submitted to AOFA.
5. Account closed, funds retained pending AOFA guidance.

**Lessons:**
- Patterns matter more than individual transactions.
- If the client gives 3 different SOF stories → huge red flag.
- Document ALL communications with the client — they are SAR evidence.
- Threshold of "many small deposits" is subjective, but drastic change vs historical behavior is signal.

### Case 5: Quick withdrawal post-deposit without trading (layering)

**What happened:** client deposited $8,000 via wire, made 2 tiny trades (0.01 lots total), and after 3 days requested withdrawal of 70% ($5,600) to a different bank account than the deposit.

**Investigation:**
- Classic **layering** pattern (second phase money laundering: move money to hinder tracing).
- Hold on the withdrawal.
- Email to client requesting explanation + documentation of the receiving account.
- Client responded "I changed banks" but could not document the new account as own (different beneficiary name).

**Decision:**
- SAR submitted.
- Account closed.
- Funds retained pending AOFA.

**Lessons:**
- Operational rule: **withdrawals must go to the same account/method as the original deposit** (first-in, first-out, same-destination). If the client requests a different destination → hold + investigation.
- Little trading + fast withdrawal = red flag.
- Escalate these cases fast. Each day that passes is more risk.

### Case 6: Corporate client with opaque structure — rejected

**What happened:** corporate account opening request: LLC in Delaware, owned by trust in Jersey, owned by another LLC in BVI, owned by "private foundation" in Liechtenstein. Final UBO declared but intermediate trust documentation not verifiable.

**Investigation:**
- 4 structure layers without evident commercial justification.
- Declared UBO was a real person with legitimate profile, but the structure seemed designed to hide.
- EDD requested: (a) constitutive contract of each layer, (b) explanatory letter of economic purpose, (c) certification of directors and nominees.
- Client delivered part, but the Jersey trust refused to provide internal documentation.

**Decision:** rejected due to inability to verify UBO end-to-end. Template 5.5 sent.

**Lessons:**
- Structures of 3+ layers without clear commercial purpose = default red flag.
- "Privacy" is not enough excuse. Neomaaa must be able to see down to the real UBO.
- Do not get impressed by complexity. If you cannot sleep peacefully with the client, rejection.

### Case 7: Negative media coverage post-onboarding

**What happened:** LOW RISK client operating for 4 months without issues. One Sunday appears on the cover of a regional newspaper as investigated for "participation in public corruption scheme".

**Investigation:**
- Source search: news appears in 3 independent media, neutral-investigative tone (not tabloid).
- There is open judicial investigation but no conviction.
- Client has not been formally charged yet.

**Decision:**
- Re-categorization to HIGH RISK (escalation trigger).
- Intensified ongoing monitoring.
- No immediate freeze (no sanction or indictment yet), but weekly monitoring.
- Case file open pending evolution.
- If formal indictment → freeze + SAR.

**Lessons:**
- Serious press = signal even without conviction.
- Do not overreact (client innocent until proven), but document and watch.
- If you do not document and later there's trouble, it looks like negligence.

---

## 8. Susana FAQ — questions you will have

**Q: Can I escalate to Diego without worrying or bothering him?**
A: **Yes, always.** For HIGH RISK decisions, sanctions matches, SARs, or communications with AOFA, Diego must sign as designated Director. It is not a nuisance — it is part of the formal regulatory process. Telegram or email, whichever is fastest for him to see. If it is urgent, Telegram + tag.

**Q: How do I know if a country is on grey or black list?**
A:
1. First: [`/content/compliance/risk-matrix`](/content/compliance/risk-matrix) section 5 — my internally updated version.
2. Second (verify source): [FATF official](https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html).
3. Third (specific sanctions): UN, OFAC (USA), EU, UK, OFSI consolidated lists.
4. **Update risk-matrix.md** every quarter (Feb, Jun, Oct) after FATF publication.

**Q: What do I do if Sales pressures me to approve quickly (they want to close the month)?**
A: **Your job is compliance, not sales.** If the case requires EDD, you complete the process fully. If Sales pressures:
1. Respond in the team channel (with copy to Diego if continues): "This case requires EDD due to [reason]. Estimated process 5–7 days. I cannot skip it."
2. If they keep pressuring, escalate to Diego directly.
3. DO NOT compromise. If you approve something you should not and it later blows up, the responsible party is legally you, not the sales agent. That is the most important thing you have to understand.

**Q: When do I hire a Compliance Junior?**
A: Triggers:
- 200+ cases/month and you are already saturated → start search.
- 500+ cases/month → urgent, you should already have them.
- Less than 200 and you have time → focus on refining SOPs, doing certifications, auditing closed cases.
- Talk to Diego with real data, not feelings.

**Q: Can I use AI (Claude, ChatGPT) for compliance?**
A:
- **For background research:** yes (e.g. "summarize FATF recommendations 10"). Do not enter personal client data.
- **To draft templates and emails:** yes.
- **For final decisions:** NO. Everything must have your documented human judgment. If an auditor asks "why did you approve this client" and your answer is "because Claude said yes", you lose.
- **Rule:** AI is assistant, not Compliance Officer.
- **Privacy:** do not paste DNIs, photos, addresses, banking data into public prompts. Use enterprise / on-premise provider if sensitive data.

**Q: What happens if I make a mistake in a decision?**
A:
- **Error with documented process + good faith = no personal penalty.** The industry understands it, regulators too. Document your reasoning always.
- **Error due to negligence (you did not do the process) = exposure.** Your personal signature is at stake.
- **Error due to fraud or collusion = jail.** Not a joke. In AML/KYC the Compliance Officer's personal responsibility is real.
- Moral: better a documented "no" than a "yes" without paper.

**Q: What exactly is "tipping off"?**
A: It is the crime of **warning the client that we are investigating them or that we submitted a SAR**. It is a crime independent of laundering. Even if the client is innocent, if you warn them of the investigation, you commit crime.
- NEVER say "we are reporting your activity to AOFA".
- NEVER say "suspicion of laundering".
- NEVER say "we submitted a SAR".
- NEVER forward internal emails to clients.
- Always use generic administrative language (template 5.7).

**Q: If a client sues me over the decision to reject or close, what happens?**
A:
- Neomaaa has the contractual right (T&C) and regulatory right to reject/close accounts for compliance reasons without detailed explanation.
- The lawsuit typically gets dismissed if you have process documentation.
- **That is why you document everything.** The case file is your defense.
- Escalate to Diego as soon as you receive legal threat — the lawyer responds, not you alone.

**Q: What do I do if I feel Diego or Angel ask me to approve something "because it's a friend" or "because it's important"?**
A:
- Write it and request in writing. "Diego, you are asking me to approve X's account without complete EDD. Can you confirm in writing?"
- If they accept → archive the email. In case of audit, it is the Director's responsibility, not yours.
- If they do not want to put it in writing → **DO NOT do it.** That is a sign they themselves know it is wrong.
- Your integrity is your asset. Losing it once = losing credibility forever with regulators and team.

**Q: Can I share case info with other teams (Sales, Support)?**
A:
- **Need-to-know basis.** Only the strictly necessary for them to do their job.
- OK example: "Client X is in EDD, do not close yet."
- NOT OK example: "Client X has PEP alert because he was advisor to the government of Y, plus his wife works at Z." (that level of detail only you need).
- In case files: complete data. In communication to the team: the minimum.

**Q: What tools must I master for sure?**
A:
1. **Sumsub** (KYC / main screening).
2. **Skale CRM** (where the clients are).
3. **MT5 back office** (see trading data for investigations).
4. **Excel / Google Sheets** (logs, SAR tracking).
5. **Notion** (internal case files, SOPs).
6. **Intercom** (reading conversations with clients when doing investigation).

### Compliance technology stack — by growth phase

**Phase 1 (current — 0 to 500 clients):**
- Sumsub (KYC + screening + ongoing monitoring).
- Skale CRM (client management).
- Google Sheets (compliance registry — see [compliance-calendar Record Keeping section](/content/compliance/compliance-calendar)).
- Susana's manual monitoring processes.

**Phase 2 (500 to 2,000 clients):**
- All of Phase 1.
- Add: case management system (Hummingbird, ComplyAdvantage or similar) when spreadsheets fall short.
- Add: semi-automated transaction monitoring (rules in Skale or dedicated tool).
- Add: automated compliance dashboard.
- Hire: second compliance analyst (see [compliance-calendar section 11](/content/compliance/compliance-calendar)).

**Phase 3 (2,000+ clients or expansion to Mauritius/Seychelles/CySEC/FCA):**
- All of the above.
- Evaluate: Refinitiv World-Check as screening complement.
- Implement: dedicated transaction monitoring system (NICE Actimize or equivalent).
- Implement: formalized training program with role-based evaluations.
- Hire: compliance team 3-5 people per jurisdictions + dedicated MLRO per regulated entity.
- Evaluate: Onfido as Sumsub backup/complement if expansion to jurisdiction requires dual provider.

### Industry benchmarks — what the best brokers do

The following standards come from benchmark of Exness (CySEC+FCA+FSCA+FSA), IC Markets (ASIC+CySEC+FSA+SCB), Pepperstone (FCA+ASIC+CySEC+BaFin+DFSA). **NEOMAAA today operates with Anjouan license (less strict requirements), but builds scalable infrastructure from now** to:

1. Prepare regulatory expansion without painful retrofitting.
2. Improve bank and PSP relationships (they evaluate robust compliance).
3. Protect the business from incidents.

**Response times — NEOMAAA target (start → mature):**

| Process | Industry standard top brokers | NEOMAAA start | NEOMAAA mature |
|---|---|---|---|
| KYC Tier 1 verification | <60 seconds (automatic) | <5 minutes | <60 seconds |
| KYC Tier 2 verification | <4 hours | <24 hours | <4 hours |
| KYC Tier 3 verification (EDD) | 1-3 business days | 1-5 business days | 1-3 business days |
| Sanctions hit review | <4 hours | <24 hours (same day critical) | <4 hours |
| False positive resolution | <2 hours | <24 hours | <4 hours |
| SAR submission | Within 24h of decision | Within 48h | Within 24h |

**Three lines of defense model (Pepperstone / FCA standard):**
- 1st line: front office (sales, support, dealing) — identify risks in their area.
- 2nd line: Susana (compliance) — monitors, reviews, enforces.
- 3rd line: quarterly audit by Principals (Diego + Yulia) — evaluates effectiveness of the first two.

**Compliance staff ratios (industry standard):**
- 2-5 compliance people per 1,000 active clients.
- NEOMAAA current: 1 person (Susana) — adequate up to ~500 clients.
- Dedicated MLRO per regulated jurisdiction (relevant when there is expansion).

**Training (industry standard):**
- Compliance officer: quarterly + continuous (self-study + certs).
- All client-facing team: semiannual minimum (NEOMAAA) / quarterly (top brokers).
- Mandatory AML induction the first day before interacting with clients.
- Post-training test with minimum 80% threshold.

**Where NEOMAAA must exceed AOFA minimum:**

| Area | Why exceed the minimum | Benefit |
|---|---|---|
| Decision documentation | AOFA does not specify format but it is critical for audit | Audit preparation + expansion |
| Ongoing sanctions monitoring | Lists are constantly updated | Protection against sanctions risk |
| Team training | AOFA does not specify frequency | Reduces risk of accidental non-compliance |
| Transaction monitoring | AOFA asks for basic | Protection against laundering / fraud |
| Risk scoring per client | Enables more informed decisions | Better risk management |

**Principles adopted from Exness / IC Markets / Pepperstone implemented in NEOMAAA:**

- AML policy with modular structure (global + jurisdiction addenda) — already prepared even though there is only one jurisdiction today.
- Mandatory liveness check in all tiers — implemented with Sumsub.
- Monthly compliance committee (Susana + Principals) — see [compliance-calendar M8](/content/compliance/compliance-calendar).
- AML training for ALL employees, not just compliance — see [compliance-calendar sections M6 + A4](/content/compliance/compliance-calendar).
- Manual risk scoring per client — see [risk-matrix](/content/compliance/risk-matrix).
- Manual dashboards in Google Sheets today, automated when volume justifies.

**Q: How often do I have to update SOPs?**
A:
- **Risk-matrix:** every time FATF updates lists (3x/year).
- **SAR procedure:** annual or when AOFA regulation changes.
- **Compliance manual:** annual, with Diego's sign-off.
- **Playbook (this doc):** monthly, adding lessons learned.
- More detail: [`/content/compliance/compliance-calendar`](/content/compliance/compliance-calendar).

**Q: What do I do if AOFA asks for info and I do not know if I can give it?**
A: **NEVER respond alone to AOFA.** The steps are:
1. Acknowledge receipt of the email / call without giving information.
2. Notify Diego immediately.
3. Consult with external lawyer if it is a formal requirement.
4. Respond only what is authorized, in writing, with Diego's sign-off.
- Rule: if you doubt whether you can say something → **do not say it**. Always better "I need to verify with my Director and respond in X hours."

---

## 9. Self-learning — your continuous training

Compliance is a role that **never stops being learned**. Whoever does not update falls behind in 12 months.

### Week 1–4 (intensive onboarding)

- [ ] Read all docs of `/content/compliance/*` in order (starting with `manual-susana.md`).
- [ ] Read `/content/legal/aml-kyc-policy.md` and `/content/legal/terms-conditions.md`.
- [ ] Shadow Diego in 3–5 compliance decisions (observe without intervening).
- [ ] Setup tools: Sumsub dashboard, OFAC + UN + EU sanctions lists bookmarks, Skale CRM, MT5 back office.
- [ ] Create your personal case file template (Notion or Excel) for daily tracking.
- [ ] Meet the team: Sales (Franco, Edward, Luis), Pepe (Dealing), Angel, Yulia.

### Month 2–3 (autonomous handling LOW/MEDIUM)

- [ ] Handle LOW and MEDIUM cases without supervision (with optional escalation to Diego).
- [ ] HIGH RISK: mandatory escalation to Diego, but you already do the prior investigation.
- [ ] First internal monthly report (cases worked, categories, alerts, trends).
- [ ] Get familiar with advanced Sumsub (custom rules, automatic re-screening).

### Month 4–6 (HIGH RISK autonomy and SARs)

- [ ] Handle HIGH RISK cases with Diego's written approval.
- [ ] First SAR (if applicable). Review the process with Diego before submit.
- [ ] Refine SOPs with lessons learned. Add to playbook and relevant docs.
- [ ] Initiate study for certification (ACAMS CAMS recommended).

### Month 6+ (senior role)

- [ ] Evaluate Junior hire if volume justifies.
- [ ] Start formal training (ACAMS or ICA — see below).
- [ ] Participate in industry updates: FATF newsletters, ACAMS webinars, AOFA updates.
- [ ] Do 1 quarterly internal audit of your own closed cases (self-review).
- [ ] Lead internal trainings for the team (Sales, Support) — 1x per quarter.

### Recommended certifications (in order of priority)

| Cert | Cost | Duration | Why |
|---|---|---|---|
| **ACAMS CAMS** (Certified Anti-Money Laundering Specialist) | ~$1,500 USD | 6 months study | Global standard. If you have ONE cert, make it this one. Gives you immediate credibility before regulators and corporate clients. |
| **ICA Diploma in Anti Money Laundering** (International Compliance Association) | ~£2,000 GBP | 9 months | More theoretical depth. Good if you plan to make a career in international compliance. |
| **FATF training modules** | Free | 10–20h total | Does not give formal cert but is gold-source. Always do them. |
| **FINRA / SEC webinars** (free) | Free | On demand | For USA regulation — useful if we expand to American market. |
| **AOFA specific training** (if it exists) | Varies | Varies | Verify with AOFA directly. |

**Proposal:** start CAMS in month 6. Complete in month 12. Then CAMS-Audit or CAMS-Risk Management specialization in year 2.

### Free useful resources (to read in dead time)

- [FATF.org](https://www.fatf-gafi.org) — recommendations, typologies, country reports.
- [Wolfsberg Group papers](https://www.wolfsberg-principles.com) — best practices private banking (applicable to retail and HNW broker).
- [ACAMS Today](https://www.acamstoday.org) — free magazine with real cases.
- [Transparency International](https://www.transparency.org) — corruption perceptions index (useful for risk-matrix).
- [OCCRP](https://www.occrp.org) — organized crime investigations (understand how laundering really works).

---

## 10. Quick contacts

| Situation | Primary contact | Backup |
|---|---|---|
| Compliance emergency (sanctions match, AOFA request, subpoena) | Diego — Telegram + email | Yulia |
| HIGH RISK or SAR approval | Diego (designated Director) | Yulia (if Diego unavailable >4h) |
| Technical KYC / Sumsub query | Sumsub support (dashboard chat) | [COMPLETE: assigned Customer Success Manager] |
| Complex legal query | [COMPLETE: name + email external lawyer] | Diego |
| Client asks about my decision | Redirect to compliance@neomaaa.com (you) | — |
| IT issues (Sumsub / Skale / MT5 back office) | [COMPLETE: IT contact / Angel] | Angel |
| AOFA official (any communication) | [COMPLETE: official AOFA email + phone] | Via external lawyer |
| Dealing / trading patterns | Pepe (Head of Dealing) | — |
| Sales team escalation | Franco / Edward / Luis (corresponding lead) | Diego |
| Marketing targeting | [Marketing lead] | Diego |
| Partners / IB issues | [Partners lead] | Diego |

---

## 11. My operational personal info

Section for Susana to complete with her data. Keep updated.

- **Official email:** compliance@neomaaa.com ✓ active
- **Backup personal email (internal):** [COMPLETE]
- **Telegram / WhatsApp for team emergencies:** [COMPLETE]
- **Official phone declared to AOFA:** [COMPLETE]
- **Designated Director (first line):** Diego Loyola
- **Backup Director (if Diego unavailable >4h):** Yulia
- **External lawyer (compliance / regulatory):** [COMPLETE: name, firm, email, phone]
- **External lawyer (litigation):** [COMPLETE]
- **My target certification next 12 months:** [COMPLETE — default recommendation: ACAMS CAMS]
- **My next review with Diego (quarterly):** [COMPLETE: date]
- **Personal folder of case files:** [COMPLETE: location — Google Drive / Notion / local encrypted]
- **Vault of compliance tools passwords:** [COMPLETE: 1Password / Bitwarden]

---

## 12. Golden rules (never forget)

1. **Document everything.** Email, decision, reasoning, evidence. Paper is defense.
2. **When in doubt, escalate.** Diego prefers 10 unnecessary escalations to 1 serious error.
3. **NO tipping off.** Never warn the client that they are under investigation or SAR.
4. **Your signature is your responsibility.** If you approve something, you are legally responsible. If you reject with good documented criteria, you are protected.
5. **Compliance does not negotiate with Sales.** The process is the process. Commercial pressure does not change regulatory risk.
6. **Patterns matter more than individual transactions.** Think trend and context, not just isolated operation.
7. **Continuous update.** What was best practice 2 years ago may today be insufficient. FATF, AOFA, OFAC change.
8. **Integrity > internal popularity.** You will say "no" more times than "yes". It is fine.
9. **Client privacy is maintained until the end.** Even when you are investigating them. Need-to-know basis.
10. **If you cannot sleep peacefully with a decision → do not make it.** Escalate or reject. Your intuition is signal.

---

**This playbook is updated monthly.** Any new case that generates important learnings → add to section 7 (practical cases). Any new team frequent question → add to section 8 (FAQ). Any template you use >3 times → add to section 5 or 6.

**Version:** 1.0 — 2026-04-13.
**Scheduled next review:** 2026-05-13.
**Approved by:** Diego (Director Neomaaa Ltd).
