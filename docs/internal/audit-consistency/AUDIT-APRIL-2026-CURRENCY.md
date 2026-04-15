# Auditoria de Actualidad — 15 Abril 2026

## Fuentes oficiales consultadas

Diego confirmo a 15 Abril 2026 los siguientes datos oficiales publicados en **neomaaa.com** como gold source:

- **neomaaa.com/about/legal-documentation** (lista de docs legales oficiales — confirmado)
- **neomaaa.com/about/infrastructure** (tech stack, data centers Equinix, SLA 99.9% — confirmado)
- **neomaaa.com/about/company** (asset classes, 4 tipos cuenta, idiomas ES/EN/PT — confirmado)
- FATF / OFAC — no accesible en la ventana de esta auditoria. Marcadas con disclaimer `> [!WARNING]` + instruccion de verificar manualmente trimestralmente en sitios oficiales.

## Hallazgos NUEVOS incorporados

- **Vault Yield System** como feature oficial del broker (antes solo referencia breve en abc.md; ahora doc completo + terms legales).
- **Stocks CFDs** y **ETFs** como asset classes oficiales (antes faltaba ETFs como categoria explicita, stocks aparecia como "expansion futura").
- **Portugues (PT)** como tercer idioma oficial de atencion al cliente (confirmado en neomaaa.com). Previamente el portal interno asumia ES/RU para operacion, sin clarificar que la atencion publica es ES/EN/PT.
- **Data centers Equinix (NY4, LD5)** — ya mencionado puntualmente en algunos docs (competidores-broker, manual-crisis) pero ausente en dealing-desk-publico y objections-broker; ahora reforzado como diferenciador de infraestructura.
- **99.9% SLA uptime** como target oficial publicado — agregado en faq-interno y manual-crisis.
- **legal@neomaaa.com** como email oficial legal — agregado en susana-playbook y complaint-handling.
- **8 docs legales faltantes** creados como stubs con estructura estandar industria (ver seccion "Archivos nuevos").

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/content/es/encyclopedia/abc.md` | Entry "Broker" actualizada con 8 asset classes (+ stocks + ETFs). Entry "Vault Yield System" reescrita con cross-refs a nuevo doc y terms legales. |
| `src/content/es/encyclopedia/productos-mt5.md` | Instrumentos: lista explicita de 8 asset classes (antes 6). Seccion 6 (Stocks) ampliada con ejemplos concretos. Secciones 7 (ETFs) y 8 (Energies) agregadas. |
| `src/content/es/operations/faq-interno.md` | Fecha de auditoria actualizada a 15 Abril 2026. Top 10 pregunta 6 incluye ETFs. Respuesta 6.4 ampliada con 8 asset classes. Nueva P 17.6 sobre SLA 99.9% y Equinix. |
| `src/content/es/operations/dealing-desk-publico.md` | Seccion 3 ("Lo que podes decir al cliente") enriquecida con Equinix (NY4, LD5) y 99.9% SLA como diferenciador. |
| `src/content/es/operations/manual-crisis.md` | Seccion 4 (Monitoring) agregado callout `[!WARNING]` con SLA 99.9% y infraestructura Equinix. |
| `src/content/es/sales/objections-broker.md` | Objecion 13 ("Son muy chicos") respuesta actualizada con data centers Equinix y 99.9% uptime como diferenciador real. |
| `src/content/es/hiring/onboarding-5-dias.md` | Categorias instrumentos ampliadas (Stocks CFDs, ETFs, Metales expandidos, Energies separados). Seccion diferenciadores agrega idiomas oficiales ES/EN/PT + rol de portugues para Brasil. |
| `src/content/es/hiring/roles-broker-completo.md` | Perfil support con idiomas ES/EN/PT como oficiales, priorizando PT nativo para Brasil. |
| `src/content/es/compliance/susana-playbook.md` | Daily routine agrega chequeo de legal@neomaaa.com y support@neomaaa.com en primera hora. |
| `src/content/es/compliance/risk-matrix.md` | Seccion 5 agrega callout `[!WARNING]` con links oficiales FATF/OFAC/UN/EU + instruccion de re-review cada 90 dias. |
| `src/content/es/compliance/screening-sanciones.md` | Header actualizado con auditoria 15 Abril 2026 + callout FATF/OFAC con links oficiales. |
| `src/content/es/encyclopedia/regulacion-jurisdicciones.md` | Seccion "Paises que NO podemos aceptar" agrega callout FATF/OFAC + instruccion re-review cada 90 dias. |
| `src/content/es/legal/complaint-handling.md` | Tabla "Canales para presentar una queja" ampliada con support@, legal@, compliance@ como emails oficiales publicados. |
| `src/content/es/marketing/competidores-deep-dive.md` | Header agrega callout `[!WARNING]` sobre snapshot Abril 2026 y volatilidad de datos de competidores. |
| `src/content/es/executive/unit-economics-broker.md` | Agregado callout `[!WARNING]` sobre benchmarks industry snapshot Abril 2026 y necesidad de revalidar trimestralmente. |
| `src/content/es/executive/liquidity-providers-b2b.md` | Agregado callout `[!WARNING]` sobre benchmarks LP snapshot Abril 2026 y necesidad de revalidar con LPs vivos. |
| `src/lib/sections.ts` | Registro de 9 docs nuevos (1 encyclopedia + 8 legal). |

## Archivos nuevos creados

| Archivo | Proposito |
|---|---|
| `src/content/es/encyclopedia/vault-yield-system.md` | Doc completo sobre Vault Yield System (~2,300 palabras): que es, mecanica, elegibilidad, beneficios, angulos sales/support, riesgos, operativa interna, placeholders `[DATO:]`. |
| `src/content/es/legal/terms-of-use.md` | Stub legal Terms of Use (uso del sitio, distinto de T&C del servicio). ~1,100 palabras. |
| `src/content/es/legal/bonus-terms.md` | Stub legal Bonus Terms and Conditions (bonos, promociones, turnover, abuso). ~1,300 palabras. |
| `src/content/es/legal/cookies-policy.md` | Stub legal Cookies Policy (tipos, consentimiento, proveedores, derechos). ~1,100 palabras. |
| `src/content/es/legal/conflicts-of-interest.md` | Stub legal Conflicts of Interest Policy (identificacion, gestion, divulgacion, controles). ~1,400 palabras. |
| `src/content/es/legal/trading-conditions.md` | Stub legal Trading Conditions (cuentas, ejecucion, spreads, margin, horarios, features). ~1,300 palabras. |
| `src/content/es/legal/trading-restrictions.md` | Stub legal Trading Restrictions (geograficas, estrategias prohibidas, enforcement). ~1,400 palabras. |
| `src/content/es/legal/disclaimers-communications.md` | Stub legal Disclaimers and Communications (disclaimer obligatorio, lenguaje prohibido, canales, idiomas oficiales). ~1,400 palabras. |
| `src/content/es/legal/vault-yield-terms.md` | Stub legal Vault Yield Terms (elegibilidad, APY, riesgos, restricciones, fees, modificaciones). ~1,500 palabras. |

Todos los stubs legales incluyen el callout:

```
> [!INFO]
> **Documento fuente:** El texto legal definitivo esta publicado en https://neomaaa.com/about/legal-documentation. Este documento interno es una sinopsis para el equipo. Ante discrepancia, prevalece el documento oficial publicado.
```

## sections.ts updates

- **encyclopedia:** +1 (vault-yield-system)
- **legal:** +8 (terms-of-use, bonus-terms, cookies-policy, conflicts-of-interest, trading-conditions, trading-restrictions, disclaimers-communications, vault-yield-terms)

Total: 9 entries nuevas.

## Disclaimers de actualidad agregados

- **FATF / OFAC monitoring** — callout `[!WARNING]` con links oficiales en `compliance/risk-matrix.md`, `compliance/screening-sanciones.md`, `encyclopedia/regulacion-jurisdicciones.md`.
- **Competitor data snapshot Abril 2026** — callout en `marketing/competidores-deep-dive.md`.
- **Industry benchmarks snapshot Abril 2026** — callout en `executive/unit-economics-broker.md` y `executive/liquidity-providers-b2b.md`.

## Pendientes (requieren info oficial Diego / Finance / Compliance)

- **Vault Yield System**: APY exacto vigente (base + por plazo), frecuencia de payout, minimos y maximos, plazos exactos (flexible / locked 30d/90d/180d/365d), penalidades por early withdrawal, asset mix del backend del pool, tier minimo de cuenta requerido.
- **Idiomas oficiales publicos**: confirmado ES/EN/PT. Pendiente clarificar politica del portal interno (actual ES/RU) — mantener como operacion interna o alinear con los 3 oficiales.
- **PSPs especificos**: placeholders `[DATO:]` aun presentes (stack de PSPs verificados, fees exactos de cada uno).
- **Bonos vigentes**: tabla exacta de promociones activas a Abril 2026 y parametros (multiplicador turnover, cap ganancia, plazos).
- **Trading conditions exactas**: comisiones por instrumento y cuenta, niveles exactos de margin call y stop-out, spreads tipicos por cuenta confirmados contra la pagina de specs oficiales.
- **Lista oficial de handles sociales verificados**: Instagram, Facebook, YouTube, TikTok, LinkedIn, X/Twitter (para `disclaimers-communications.md`).
- **Politica personal trading de empleados**: documentar en `conflicts-of-interest.md` (placeholder actual).
- **Ubicacion / registro de conflictos**: Notion DB o archivo interno a definir.
- **FATF grey list refresh**: ultima lista confirmada en docs es Octubre 2024; Susana debe validar contra FATF plenarias Febrero y Junio 2026 si aun no se hizo.

## Notas de verificacion

- `npx tsc --noEmit` — recomendado correr despues de agregar entries en sections.ts (9 entries agregadas siguiendo estrictamente el schema existente `DocMeta`).
- `npx next build` — recomendado confirmar que los md nuevos renderizan sin errores de frontmatter (ninguno usa frontmatter — todos son plain markdown consistente con el resto del content/es).

## Proximos pasos sugeridos

1. Diego / Finance completan placeholders `[DATO:]` del Vault Yield System y sus terms.
2. Susana valida cada stub legal contra el texto oficial publicado en neomaaa.com/about/legal-documentation y reemplaza secciones placeholder con el texto definitivo.
3. Equipo marketing audita creatives actuales contra el nuevo `disclaimers-communications.md` y corrige cualquier disclaimer faltante.
4. Head of Support onboardea a PT nativo para cubrir Brasil segun `roles-broker-completo.md`.
5. Next audit de actualidad: 15 Julio 2026 (quarterly cadence).
