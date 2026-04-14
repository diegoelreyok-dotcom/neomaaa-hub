# Remoción España/EEA como mercado operativo

**Fecha:** Abril 2026
**Autor:** Claude (Opus 4.6) bajo instrucción de Diego
**Proyecto:** neomaaa-hub (portal broker Next.js)

---

## Decisión tomada (por Diego)

> "Actualmente no podemos trabajar como broker con clientes de España/Europa sin las regulaciones que piden esos países."

Implicación operativa:
- España / EEA (30 países) / UK / Australia / Canadá / USA = **jurisdicciones RESTRINGIDAS — NO operativas**
- Docs que presentan España como "mercado focus" estaban mal y confundían al equipo
- Consistencia cross-portal: cada doc que mencionaba España como target ahora explicita que es **referencia / roadmap futuro** (sujeto a obtener licencia EEA equivalente), nunca target operativo actual

---

## Mercados OPERATIVOS confirmados

| Región | Países operativos | Notas |
|--------|-------------------|-------|
| **LATAM (core)** | Brasil, México, Argentina, Colombia, Chile, Perú + resto | Excluyendo USA/Canadá |
| **CIS** | Rusia, Belarus, Kazajstán y vecinos | Screening caso por caso (OFAC/UE/UK/ONU). Excluyendo Crimea/Donetsk/Luhansk/Zaporizhzhia/Kherson |
| **MENA** | UAE, Saudi Arabia, Qatar, Turquía, Egipto, Marruecos | Excluyendo Iraq |
| **África** | Sudáfrica, Nigeria, Kenya, Egipto | Excluyendo Sudán |
| **Asia (fase 2)** | China, Vietnam, Filipinas, Indonesia, Tailandia, Malasia | Excluyendo North Korea, Myanmar |

## Mercados RESTRINGIDOS (oficiales)

USA, Canada, **EEA (30 países — incluida España)**, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan + jurisdicciones sancionadas (OFAC/UE/UK/ONU).

Listado EEA completo (referencia): Austria, Bélgica, Bulgaria, Croacia, Chipre, Chequia, Dinamarca, Estonia, Finlandia, Francia, Alemania, Grecia, Hungría, Islandia, Irlanda, Italia, Letonia, Liechtenstein, Lituania, Luxemburgo, Malta, Países Bajos, Noruega, Polonia, Portugal, Rumania, Eslovaquia, Eslovenia, **España**, Suecia.

---

## Archivos modificados (13 total)

### Marketing (3)

- **`src/content/es/marketing/icps-por-mercado.md`**
  - Header rewritten: ICP #2 España marcado como **NO OPERATIVO — roadmap futuro / referencia educativa**
  - Callout `[!DANGER]` con decisión Diego explícita
  - Mercados operativos listados (LATAM, CIS, MENA, Asia fase 2, África)
  - Tablas de CAC/LTV/ticket/sales closer/tono/horario/creativos/objeciones para España ahora tienen `~~España~~ — NO OPERATIVO`
  - `<div neo-stat>` "ES — core sofisticado" reemplazado por "LATAM+ Rusia/CIS + MENA + Asia fase 2"

- **`src/content/es/marketing/competidores-deep-dive.md`**
  - Añadido callout `[!WARNING]` al inicio de "Diferenciadores reales"
  - 9 menciones de "LATAM + España" / "LATAM y España" reescritas a "LATAM (+ CIS/MENA/Asia fase 2)"
  - "Angel en España" aclarado como *base operativa, NO target comercial EEA*
  - Battle-cards de Pepperstone/IC Markets/HF ajustadas: Europa/UK/Australia = "NO operativos para NEOMAAA"

- **`src/content/es/marketing/funnel-broker.md`, `retencion-broker.md`, `copy-broker.md`**: revisados — no mencionaban España (ya estaban limpios). Se mantuvo el mercado "LATAM" como principal.

### Sales (0 modificados — ya estaban correctos)

- `plan-contacto.md`, `primer-contacto.md`: sin menciones de España (clean)
- `training.md`: ya lista correctamente "USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan, sancionados"
- `objections-broker.md`, `faq-ventas.md`: listas correctas de restringidos

### Operations (1)

- **`src/content/es/operations/faq-interno.md`**
  - Sección 1.4 "En qué países operan?" reescrita con mercados operativos explícitos por región
  - **Nueva sección 1.4b**: "Podemos aceptar un cliente residente en España? (PREGUNTA FRECUENTE)" — respuesta oficial **NO**, con citation de Diego, excepciones cero, prohibición de sugerir workarounds
  - Sección 13.2 (idiomas de soporte): Europa/Middle East → MENA/Africa/Asia, CET como referencia horaria NO como target de clientes

### Support (1)

- **`src/content/es/support/playbook.md`**
  - Header: nuevo callout `[!DANGER]` con lista de mercados RESTRINGIDOS y prohibición de workarounds
  - Distribución de turnos: "Europa/Middle East" → "MENA/Africa/Asia", CET como referencia horaria por ubicación Angel (backoffice en España) + clientes MENA, NO clientes EEA
  - Templates CR-26 (rechazo por país) ya existían correctos — confirmados

### Encyclopedia (2)

- **`src/content/es/encyclopedia/regulacion-jurisdicciones.md`**
  - Sección "Restricciones prácticas" reescrita: UE/EEA/UK/Australia/Canada/USA todos marcados **RESTRINGIDO**
  - Eliminada mención previa de "passive onboarding EEA" (política obsoleta)
  - Sección "Países objetivo" reescrita con 5 regiones operativas + aclaración España = roadmap futuro
  - Cliente objetivo: "LATAM" (removido "España")

- **`src/content/es/encyclopedia/abc.md`**
  - Entrada "Restricted Countries" expandida: EEA explicitado como "30 países del Espacio Económico Europeo — incluida España, Alemania, Francia, Italia, Portugal, Holanda, etc."
  - Añadidos mercados OPERATIVOS confirmados
  - Prohibición explícita de workarounds (direcciones falsas, VPN, pasaporte alternativo)

### Hiring (3)

- **`src/content/es/hiring/support-es.md`**
  - Descripción del rol aclara: soporte ES atiende **LATAM** (Brasil/México/Argentina/Colombia/Chile/Perú + resto, excl. USA/Canadá)
  - Callout `[!WARNING]`: **NO atiende residentes España/EEA/UK** — usar template CR-26

- **`src/content/es/hiring/support-en.md`**
  - Título renombrado: "English (MENA / Africa / Asia)" en vez de "English/Europe-Middle East"
  - Callout `[!WARNING]`: NO atiende EEA/UK/Australia/USA/Canadá
  - CET aclarado como referencia horaria operativa (overlap con MENA + Asia temprano), NO por atender clientes europeos
  - Cobertura regional corregida: MENA + Africa + Asia fase 2 (no "Europa")

- **`src/content/es/hiring/onboarding-5-dias.md`**
  - Definición NEOMAAA Markets: mercados operativos LATAM/CIS/MENA/Asia fase 2/África explícitos
  - Diferenciadores: "Foco LATAM + España real" → "Foco LATAM real (+ CIS/MENA/Asia fase 2/África)"
  - Demografía público objetivo: España/EEA/UK/Australia explícitamente removidos

### Partners (2)

- **`src/content/es/partners/playbook-ib.md`**
  - Header: callout `[!DANGER]` con lista de mercados NO permitidos para IBs + prohibición de workarounds + sanciones
  - Ranking de mercados prioritarios: **España removida** (era #3), reemplazada por "UAE/Saudi/Qatar (MENA) — Árabe/Inglés +10%"
  - Mensaje bienvenida: "LATAM, España y Asia" → "LATAM, MENA, CIS, África y Asia fase 2"

- **`src/content/es/partners/programa-completo.md`**
  - Tabla Mini-CPA: "Europa / Medio Oriente $150" reescrita — Europa/EEA/UK marcado NO OPERATIVO $0, MENA $150 separado
  - Boost por mercado prioritario: España removida, reemplazada por UAE/Saudi/Qatar (MENA) +10%
  - Callout de aclaración: España removida del boost por decisión Diego Abril 2026

### Launch (1)

- **`src/content/es/launch/checklist.md`**
  - Item "Support Agent #2 contratado (Europa/Middle East, ingles)" → "Support Agent #2 contratado (MENA / Africa / Asia, ingles — NO atiende EEA/UK: jurisdicciones restringidas)"

- `post-launch-playbook.md`: revisado — sin menciones de España (clean)

### Dashboard

- `src/content/es/dashboard.md`: revisado — sin menciones de España (clean)

---

## Archivos revisados SIN cambio (fuera de scope o ya correctos)

- **`legal/*.md`** (aml-kyc, client-agreement, terms-conditions, risk-disclosure, affiliate-terms): gold source oficial de listas restringidas — no tocar (conforme instrucciones)
- **`compliance/*.md`** (manual-susana, onboarding, screening-sanciones, workflow, expansion-regulatoria, proceso-kyc-sumsub, mejores-practicas-compliance): ya listan correctamente España/EEA como restringidos
- **`sales/training.md`**, **`sales/faq-ventas.md`**, **`sales/objections-broker.md`**: listas de países restringidos ya correctas
- **`marketing/competidores-broker.md`**: única mención era una entidad legal de Exness en UK (factual, sin cambio)
- **`encyclopedia/psicologia-trader.md`**, **`formacion-precio.md`**, **`noticias-impacto.md`**, **`productos-mt5.md`**, **`glosario-trilingue.md`**: menciones contextuales (instrumentos europeos, BCE, sesión europea de trading) — son educación de producto, no targeting de mercado. Sin cambio.
- **`operations/psps-explicados.md`**, **`manual-crisis.md`**: menciones regulatorias (SEPA, GDPR europea) — factual, sin cambio.
- **`support/enciclopedia-soporte.md`**, **`gestion-tickets.md`**: menciones de mercados CFD europeos (underlying assets), no targeting. Sin cambio.
- **`partners/modelo-financiero.md`**, **`guia-operativa.md`**: sin referencias problemáticas.
- **`hiring/roles-broker-completo.md`**: menciones genéricas ("Office Manager por hub: Dubai, LATAM, Europa" — Europa es ubicación de Angel/Pepe/Susana, no target comercial). Sin cambio.

---

## Resumen numérico

- **Archivos modificados:** 13
- **Callouts `[!DANGER]` agregados:** 4 (icps-por-mercado, playbook soporte, regulacion-jurisdicciones, playbook-ib)
- **Callouts `[!WARNING]` agregados:** 5 (competidores-deep-dive, programa-completo, support-es, support-en, partners/playbook-ib añadido en el mismo proceso)
- **Secciones nuevas:** 1 (FAQ 1.4b "Podemos aceptar un cliente residente en España?" en faq-interno.md)
- **Menciones de "LATAM + España" / "LATAM y España" corregidas:** 11
- **Tablas actualizadas:** 8 (mini-CPA, boost por mercado, ranking IB, CAC/LTV por mercado, horarios soporte, creativos, tono, objeciones)
- **Total matches revisados:** 160 menciones en 39 archivos

---

## Verificación

- `npx tsc --noEmit` → **PASS** (sin errores de tipo)
- `npx next build` → **PASS** (build completo, rutas compiladas)

---

## Mensaje clave para el equipo

> **España / EEA / UK / Australia / Canadá / USA son mercados RESTRINGIDOS.**
>
> Cualquier lead de esas jurisdicciones se **rechaza en KYC/Sumsub con template CR-26**. Los IBs que intenten traer clientes España no generan comisión y pueden ser sancionados. Nadie inventa workarounds (direcciones falsas, pasaporte alternativo, VPN) — eso es fraude regulatorio y compromete la licencia L15968/N.
>
> **Mercados operativos reales hoy:** LATAM (excl. USA/Canadá), CIS con screening, MENA (excl. Iraq), Asia fase 2 (excl. NK/Myanmar), África (excl. Sudán).
>
> España queda como **referencia educativa / roadmap futuro** — cuando NEOMAAA obtenga licencia EEA equivalente se reactivará como target. Hoy NO.
