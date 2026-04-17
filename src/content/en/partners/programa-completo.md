# NEOMAAA Partners — Complete Program Architecture

> **INTERNAL DOCUMENT — DO NOT PUBLISH**
> Last updated: April 2026

---

## Overview

NEOMAAA operates **three complementary partnership programs**, each designed for a distinct partner profile. This document is the **comparative architectural view** of the three. For the daily operations of each program (scripts, onboarding, compliance, termination causes, calculation examples), see the specific playbooks:

- **IB Program** → [partners/playbook-ib](/content/partners/playbook-ib) (full operations)
- **Affiliate Partner** → [DATA: playbook pending creation]
- **Digital Affiliate** → [DATA: playbook pending creation]

All three programs share the **Cellxpert** tracking platform (used by Pepperstone, XTB, IG Group) and the **Creator Rewards Lab** rewards ecosystem (content bounties + equipment milestones per FTDs). Cellxpert delivers real-time tracking, individualized panel, automated reports, fraud detection, and sub-affiliate/sub-IB detection. Creator Rewards Lab applies to Affiliate Partner and Digital Affiliate — not to the IB Program (the IB has its own incentive stack: Monthly Achievement Milestones, 12-Month Super-Bonus, Swap Share).

---

## Master Comparative Table

| Feature | **Affiliate Partner** | **Digital Affiliate** | **IB Program** |
|---|---|---|---|
| **Profile** | Content creators, bloggers, educators, review sites | Media buyers, PPC/SEO, arbitrageurs, affiliate networks | Professional IBs with client base, regional offices, academies |
| **Commission model** | Pure Revenue Share (lifetime) | Mini-CPA + Revenue Share (lifetime) | Revenue Share OR lot Rebate |
| **Revenue Share range** | 25% – 35% (Partner / Senior / Elite) | 10% – 20% (Starter / Growth / Pro) | 30% – 50% (Bronze / Silver / Senior / Elite) — total cap 55% with boost |
| **CPA** | No | Yes — by GEO ($50 to $150 per qualified FTD) | No |
| **Lot rebate** | No | No | Yes (alternative option to Rev Share) |
| **Sub-affiliates / sub-IBs** | Up to 3 levels (5% / 7% / 10%) | 1 level (5% override) | 2 levels (70/30 master/sub-IB split) |
| **Creator Rewards Lab** | Yes (bounties + equipment milestones) | Yes (expanded, up to $800 per content piece) | No (IB's own stack) |
| **Extra bonuses/incentives** | Content bounties, podcast studio, marketing co-funding | Equipment milestones up to $10K (full studio) | Monthly Milestones, 12-Month Super-Bonus ($3K to $50K + equity), Swap Share, fixed Elite bonus $2K/month |
| **Priority GEO boost** | Included in tier | Included in differentiated CPA | +10% on Rev Share (Brazil, Mexico, Argentina, Colombia, MENA) — total cap 55% |
| **Payment frequency** | Monthly (Partner) → Weekly (Senior/Elite) | Monthly (Starter) → Weekly (Pro) | Monthly (day 15) — all tiers |
| **Payment methods** | USDT, Wire, Wise, Skrill | USDT, Wire, Wise, Skrill | USDT (TRC20/ERC20/BEP20), Wire (SWIFT), Wise, Skrill |
| **NEOMAAA margin** | 56% – 66% | 62% – 65% | 35% – 70% (Elite ~35% post-April 2026 adjustment, Bronze ~70%) |
| **Default offer** | Standalone | **Hybrid Mini-CPA + Rev Share (margin 77% – 83%)** | Standalone |

---

## Tracking and Compliance

**Cellxpert** is the single tracking platform for all three programs. Direct MT5 integration, invalid traffic detection, sub-network management, automated commission reports.

**Creator Rewards Lab** applies to Affiliate Partner and Digital Affiliate. Includes:
- **Content bounties** — $50 to $800 per approved piece (blog posts, videos, podcasts, educational guides)
- **Equipment milestones** — from basic kit ($250) to full studio ($10K) based on FTDs generated

**Non-operating markets** for any program: USA, Canada, EEA (including Spain), UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan. Leads from those jurisdictions are rejected at KYC and do NOT generate commission (see [playbook-ib](/content/partners/playbook-ib) for full detail and termination causes for workarounds).

---

> **Key architectural decisions** (April 2026):
> - IB tiers unified to Bronze / Silver / Senior / Elite (30/40/45/50). Elite variable bonuses capped at $2K/month. Approved by Diego.
> - +10% GEO boost maintained for priority markets with **total cap 55%** (base + boost does not exceed 55%).
> - Spain removed from GEO boost. EEA not operational.
> - Hybrid Mini-CPA + Rev Share model is the **default offer** for Digital Affiliate — maximizes margin (77% – 83%) combining reduced CPA with lifetime Rev Share.

For any operational detail (commission calculation, onboarding, termination causes, FAQs, numerical examples), see the specific playbook of the corresponding program.
