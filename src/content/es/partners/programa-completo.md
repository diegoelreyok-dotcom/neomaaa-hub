# NEOMAAA Partners — Arquitectura Completa de Programas

> **DOCUMENTO INTERNO — NO PUBLICAR**
> Ultima actualizacion: Abril 2026

---

## Vision general

NEOMAAA opera **tres programas de partnership complementarios**, cada uno disenado para un perfil de socio distinto. Este documento es la vista **arquitectural comparada** de los tres. Para la operativa diaria de cada programa (scripts, onboarding, compliance, causales de terminacion, ejemplos de calculo), ver los playbooks especificos:

- **IB Program** → [partners/playbook-ib](/content/partners/playbook-ib) (operativa completa)
- **Affiliate Partner** → [DATO: playbook pendiente de crear]
- **Digital Affiliate** → [DATO: playbook pendiente de crear]

Los tres programas comparten la plataforma de tracking **Cellxpert** (utilizada por Pepperstone, XTB, IG Group) y el ecosistema de recompensas **Creator Rewards Lab** (bounties por contenido + equipment milestones por FTDs). Cellxpert entrega tracking en tiempo real, panel individualizado, reportes automaticos, deteccion de fraude y deteccion de sub-afiliados/sub-IBs. Creator Rewards Lab aplica a Affiliate Partner y Digital Affiliate — no al IB Program (el IB tiene su propio stack de incentivos: Monthly Achievement Milestones, 12-Month Super-Bonus, Swap Share).

---

## Tabla maestra comparativa

| Caracteristica | **Affiliate Partner** | **Digital Affiliate** | **IB Program** |
|---|---|---|---|
| **Perfil** | Creadores de contenido, bloggers, educadores, sitios de resenas | Media buyers, PPC/SEO, arbitrajistas, redes de afiliados | IBs profesionales con base de clientes, oficinas regionales, academias |
| **Modelo de comision** | Revenue Share puro (lifetime) | Mini-CPA + Revenue Share (lifetime) | Revenue Share O Rebate por lote |
| **Rango Revenue Share** | 25% – 35% (Partner / Senior / Elite) | 10% – 20% (Starter / Growth / Pro) | 30% – 50% (Bronze / Silver / Senior / Elite) — cap total 55% con boost |
| **CPA** | No | Si — por GEO ($50 a $150 por FTD calificado) | No |
| **Rebate por lote** | No | No | Si (opcion alternativa al Rev Share) |
| **Sub-afiliados / sub-IBs** | Hasta 3 niveles (5% / 7% / 10%) | 1 nivel (5% override) | 2 niveles (split 70/30 master/sub-IB) |
| **Creator Rewards Lab** | Si (bounties + equipment milestones) | Si (ampliado, hasta $800 por contenido) | No (stack propio IB) |
| **Bonos/incentivos extra** | Content bounties, podcast studio, marketing co-funding | Equipment milestones hasta $10K (estudio completo) | Monthly Milestones, 12-Month Super-Bonus ($3K a $50K + equity), Swap Share, bono fijo Elite $2K/mes |
| **Boost GEO prioritario** | Incluido en tier | Incluido en CPA diferenciado | +10% sobre Rev Share (Brasil, Mexico, Argentina, Colombia, MENA) — cap total 55% |
| **Frecuencia de pago** | Mensual (Partner) → Semanal (Senior/Elite) | Mensual (Starter) → Semanal (Pro) | Mensual (dia 15) — todos los tiers |
| **Metodos de pago** | USDT, Wire, Wise, Skrill | USDT, Wire, Wise, Skrill | USDT (TRC20/ERC20/BEP20), Wire (SWIFT), Wise, Skrill |
| **Margen NEOMAAA** | 56% – 66% | 62% – 65% | 35% – 70% (Elite ~35% post-ajuste abril 2026, Bronze ~70%) |
| **Oferta default** | Standalone | **Hibrido Mini-CPA + Rev Share (margen 77% – 83%)** | Standalone |

---

## Tracking y compliance

**Cellxpert** es la plataforma de tracking unica para los tres programas. Integracion directa con MT5, deteccion de trafico invalido, gestion de sub-redes, reportes de comisiones automatizados.

**Creator Rewards Lab** aplica a Affiliate Partner y Digital Affiliate. Incluye:
- **Content bounties** — $50 a $800 por pieza aprobada (post blog, videos, podcasts, guias educativas)
- **Equipment milestones** — desde kit basico ($250) a estudio completo ($10K) segun FTDs generados

**Mercados NO operativos** para ningun programa: USA, Canada, EEA (incluida Espana), UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan. Leads de esas jurisdicciones son rechazados en KYC y NO generan comision (ver [playbook-ib](/content/partners/playbook-ib) para detalle completo y causales de terminacion por workarounds).

---

> **Decisiones arquitecturales clave** (abril 2026):
> - Tiers IB unificados a Bronze / Silver / Senior / Elite (30/40/45/50). Bonos variables Elite cappeados a $2K/mes. Aprobado por Diego.
> - Boost GEO +10% mantenido para mercados prioritarios con **cap total 55%** (base + boost no excede 55%).
> - Espana removida del boost GEO. EEA no operativa.
> - Modelo hibrido Mini-CPA + Rev Share es la **oferta default** para Digital Affiliate — maximiza margen (77% – 83%) combinando CPA reducido con Rev Share lifetime.

Para cualquier detalle operativo (calculo de comisiones, onboarding, causales de terminacion, FAQs, ejemplos numericos), ver el playbook especifico del programa correspondiente.
