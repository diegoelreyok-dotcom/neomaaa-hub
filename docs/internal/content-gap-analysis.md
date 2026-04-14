# Content Gap Analysis — NEOMAAA Hub

_Auditoría: 13 abril 2026 — portal `neomaaa-hub` (Next.js, ES/RU)_

---

## Resumen ejecutivo

El portal tiene **46 documentos en ES** distribuidos en 11 secciones. La cobertura es **sólida en compliance (10 docs), legal (9 docs) y soporte/ventas (6+5 docs)**, lo que refleja una obsesión sana por KYC/AML y el workflow interno del día a día. La sección **encyclopedia** ya tiene cuatro piezas educativas de alto nivel (formación de precio, noticias, psicología, jurisdicciones) más el ABC — esta es la columna vertebral educativa y está en buen camino.

**Debilidades claras:**
1. **Producto / MT5 / tecnología** — casi inexistente como documento propio. Hay fragmentos en onboarding y enciclopedia-soporte pero no hay un manual de producto unificado. Dev team (Alex A, Alex B, Gleb, Dimitri) no tiene ni un doc dirigido a ellos.
2. **PSPs y dinero** — tocado superficialmente en `operations/deposits.md`, pero no hay análisis profundo de cómo funciona cada procesador, costos, routing, alternativas. Esto es crítico para un broker.
3. **Onboarding del empleado** — hay job descriptions (hiring/) pero NO hay "primer día en NEOMAAA Markets" ni un camino estructurado para que alguien nuevo entienda el negocio en 5 días. Brutal cuando estás contratando.
4. **Casos reales por mercado** — menciones sueltas a Brasil/LATAM, pero no hay perfiles de cliente tipo ("el minero peruano que deposita $50 vía Yape", "el trader profesional español que pide 50K institucional"). Esto mata conversiones y hace que soporte y ventas improvisen.
5. **Crisis y continuidad** — runbook de go-live existe (`operations/go-live-runbook.md`), pero no hay un manual de qué hacer cuando algo se rompe post-launch (MT5 cae, PSP bloquea, regulador pide auditoría sorpresa, noticia negativa viral).

**Fortaleza oculta:** la sección `encyclopedia/` tiene el formato más educativo y transversal — es el molde a replicar para el resto del hub. El resto tiene tono muy operativo/runbook, no "entender el negocio".

**Veredicto:** el portal está en ~**65% de completitud para launch operativo**, pero en **40% de completitud como plataforma educativa** donde todo el equipo entiende el negocio de punta a punta.

---

## Inventario actual

| Sección | # Docs | Calidad | Gap score (1-10, 10 = mayor gap) |
|---------|--------|---------|----------------------------------|
| **compliance/** | 10 | Alta. Cubre KYC, A-Book/B-Book, sanciones, Sumsub, expansión regulatoria, mejores prácticas. | 2 |
| **legal/** | 9 | Alta. Todos los docs públicos standard del broker (T&C, privacy, risk, client agreement, AML, order exec, complaints, refunds, affiliate). | 2 |
| **support/** | 6 | Alta. Playbook, enciclopedia soporte, tickets, quejas, tono, VIP. | 3 |
| **sales/** | 6 | Media-alta. Training, primer contacto, plan contacto, FAQ, comisiones, objeciones. Falta cierre/negociación avanzada. | 5 |
| **encyclopedia/** | 5 | Alta calidad educativa. ABC + 4 piezas ya escritas/en curso. | 4 (pendientes los que están en marcha) |
| **marketing/** | 4 | Media. Funnel, retención, copy, competidores. Falta canales específicos (paid, orgánico, influencers LATAM). | 6 |
| **operations/** | 3 | Media. Deposits, FAQ interno, go-live runbook. **Falta mucho:** PSPs, bancos corporativos, tesorería, crisis ops. | 8 |
| **hiring/** | 4 | Media. 4 job descriptions (Finance, Marketing, Support ES/EN). Falta onboarding del empleado, cultura, organigrama real. | 8 |
| **partners/** | 3 | Media-alta. Programa, modelo financiero, guía operativa. Falta IB playbook real, comisiones por tier, materiales para el partner. | 6 |
| **launch/** | 1 | Media. Master checklist. Falta post-launch (semanas 1-4) y KPIs de éxito medibles. | 7 |
| **dashboard.md** | 1 | Funcional como home, no es contenido educativo. | n/a |

---

## Gaps críticos (top 10, priorizados)

### Gap #1: Manual de producto NEOMAAA / MT5 unificado

- **Por qué importa:** Hay fragmentos de producto dispersos en `enciclopedia-soporte.md`, `onboarding.md` (sección "Guia de Configuracion de MT5") y `sales/faq-ventas.md`. Ningún equipo tiene un documento único que conteste: ¿qué vendemos exactamente? 4 tipos de cuenta con qué spreads reales, qué apalancamiento por instrumento, qué swap, qué comisión, qué plataformas (MT5 desktop/mobile/web), qué es WebTrader si lo tenemos, qué es el copytrading si lo vamos a tener.
- **Audiencia:** TODOS — ventas (para vender sin inventar), soporte (para resolver), dev (para construir con los mismos specs), marketing (para copy consistente), partners (para promocionar correctamente).
- **Impacto si no está:** Ventas prometen cosas que no existen, soporte contradice a ventas, dev construye cosas que no matchean el marketing. Churn y quejas.
- **Tamaño:** Grande (~6,000–8,000 palabras).
- **Outline:**
  - Los 4 tipos de cuenta (Cent, Standard, Raw, Institucional): specs completos tabla maestra
  - Spreads reales por par (EURUSD, XAUUSD, US30, BTC, etc.) por tipo de cuenta
  - Apalancamiento: tabla por clase de activo y por jurisdicción del cliente
  - Comisiones: cuándo se cobra, cuánto, cómo se calcula el ida/vuelta
  - Swaps overnight: dónde se ven, cuándo se cobran triple, islámicas
  - MT5: desktop, mobile, WebTrader — qué hace cada uno, limitaciones
  - Símbolos totales y categorías (forex, metales, indices, commodities, crypto CFD, acciones CFD)
  - Execution: ECN/STP híbrido — qué significa para el cliente
  - Horarios de mercado por instrumento + gaps de fin de semana
  - Apps oficiales y links de descarga correctos
  - Lo que NO ofrecemos todavía (copytrading, PAMM, social) — roadmap

---

### Gap #2: PSPs explicados — cómo funciona el dinero

- **Por qué importa:** `operations/deposits.md` lista 120+ métodos pero no explica POR QUÉ cada uno existe, cuánto nos cuesta, por dónde se enruta el dinero, qué pasa si uno cae. El equipo trata a los PSPs como cajas negras.
- **Audiencia:** Finance Manager (cuando se contrate), Principals, soporte senior, sales (para explicar tiempos), compliance (para AML por método).
- **Impacto si no está:** No podemos optimizar costos, cualquier caída de PSP nos descoloca, soporte inventa tiempos, sales promete "instantáneo" cuando a veces no lo es.
- **Tamaño:** Grande (~5,000 palabras).
- **Outline:**
  - Qué es un PSP, qué es un acquirer, qué es un rail bancario (conceptos base)
  - Tarjetas: Visa/MC — chargebacks, 3DS, MATCH list, MCC 6211
  - Crypto (USDT TRC20/ERC20/BEP20): wallets hot/cold, fees de red, confirmaciones, riesgo de chain reorg
  - Rails LATAM: PIX (Brasil), PSE (Colombia), OXXO/SPEI (México), Nequi, Yape, Transferencia bancaria Argentina/Chile
  - Rails EU/internacional: SEPA, SWIFT, Wise, Revolut
  - Skrill/Neteller/Perfect Money: ewallets clásicos del forex
  - Tabla maestra: método | fee proveedor | fee cliente | tiempo real | límite mínimo/máximo | disponibilidad por país | riesgo fraude
  - Cómo se rutea un depósito: CRM (Skale) → gateway → acquirer → banco corresponsal → cuenta corporativa NEOMAAA
  - Reconciliación contable: cuándo entra el dinero al balance, diferencias de timing, FX implícito
  - Políticas: mismo método depósito = mismo método retiro, por qué

---

### Gap #3: Onboarding del empleado nuevo — "NEOMAAA Markets en 5 días"

- **Por qué importa:** Vamos a contratar Finance Manager, Marketing Manager, 2 Support agents y escalar ventas. Cada nuevo depende de que Edward/Diego/Susana le cuenten el negocio oralmente. No escala. `hiring/` tiene job descriptions pero NO hay "qué hago el primer día".
- **Audiencia:** Todo nuevo joiner. Principals para garantizar consistencia.
- **Impacto si no está:** Cada contratación consume 20+ horas de un principal. Inducciones inconsistentes → calidad dispareja → se nota con clientes.
- **Tamaño:** Medio (~3,500 palabras) + checklist.
- **Outline:**
  - Bienvenida y mapa mental de NEOMAAA (Funded vs Markets, cómo se relacionan)
  - Organigrama real con nombres, roles, cómo contactar a cada uno
  - Stack de herramientas: cuentas que necesito (Intercom, Skale, Sumsub, MT5, Telegram, WhatsApp Business, Google Workspace), quién me las crea
  - Día 1: cuentas, lectura obligatoria (lista priorizada con links al propio hub)
  - Día 2: shadow con [rol correspondiente]
  - Día 3: primeras tareas asistidas
  - Día 4: evaluación de comprensión (quiz / llamada mock)
  - Día 5: autonomía supervisada
  - Cultura NEOMAAA: velocidad, zero excusas, ownership, cómo se comunica con Diego
  - Canales de comunicación por urgencia (WhatsApp = urgente, Telegram = operativo, email = formal)
  - Políticas básicas: confidencialidad, NDAs, horarios, pago, vacaciones, cómo pedir ayuda

---

### Gap #4: Perfiles de cliente por mercado (ICPs operativos)

- **Por qué importa:** Brasil es prioridad declarada, España es mercado clave, Asia es expansión. Pero no hay un documento que diga "así es un cliente típico de cada mercado". Ventas improvisa el approach, soporte no anticipa los pain points culturales.
- **Audiencia:** Ventas (pitch adaptado), soporte (empatía), marketing (targeting), partners (bajada por país).
- **Impacto si no está:** Copy genérico, conversión baja, churn temprano por desalineación cultural.
- **Tamaño:** Medio (~4,000 palabras), 6 perfiles.
- **Outline (por cada mercado):**
  - Perfil Brasil (el minero de PIX): edad, ingreso promedio, experiencia trading previa, instrumentos preferidos (XAUUSD, US30), ticket promedio, método pago dominante (PIX), objeciones típicas, qué NO decirle, competidores locales (Avenue, XP)
  - Perfil España: perfil más maduro, exige regulación CNMV-like, objeciones sobre Anjouan, prefiere SEPA, trader más técnico
  - Perfil México: OXXO/SPEI, ticket bajo, ansioso con retiros, sensible al spread
  - Perfil Colombia/Perú/Argentina: Nequi/Yape/crypto, cepo cambiario (AR), contexto macro inestable
  - Perfil Asia (expansión): cultural mindset, USDT dominante, MT5 desktop, IB relationship-heavy
  - Perfil "heredado de Funded": trader que viene de prop firm, expectativas ya formadas, cómo re-educarlo sobre broker

---

### Gap #5: Manual de crisis y continuidad operativa post-launch

- **Por qué importa:** Tenemos `go-live-runbook.md` para el día D, pero no hay qué hacer cuando algo se cae post-launch. Broker = operación 24/5, la resiliencia se define por el primer incidente mal manejado.
- **Audiencia:** Principals, Head of Support, Dealing (Pepe), Compliance.
- **Impacto si no está:** Primer incidente serio (MT5 offline, PSP bloquea, ataque DDoS, retiro masivo, noticia negativa) = improvisación, daño reputacional irreversible.
- **Tamaño:** Grande (~5,000 palabras) + árbol de decisiones.
- **Outline:**
  - Definición de incidente: Sev 0 / 1 / 2 / 3 con ejemplos
  - Cadena de mando y on-call rotation
  - MT5 down: qué hacer en los primeros 15 min, comms al cliente, fallback comms
  - PSP bloquea/cae: plan B de rails alternos, qué decir a clientes con retiros en flight
  - Banco corporativo congela cuenta: protocolo legal-compliance inmediato
  - Flash crash / slippage masivo: política de price adjustment, quién decide, cómo se comunica
  - Retiro masivo (bank run interno): liquidez, priorización, cartas tipo
  - Noticia negativa / ataque reputacional en redes: quién responde, qué NO decir, plantillas
  - Regulador pide auditoría sorpresa: qué entregamos, qué NO, a quién llamar
  - Breach de datos / hack: 72h GDPR-like para Anjouan, proceso forense
  - Post-mortem obligatorio dentro de 48h: template

---

### Gap #6: Análisis competitivo profundo (no solo tabla)

- **Por qué importa:** `marketing/competidores-broker.md` tiene tabla general pero no deep-dive por competidor. El equipo de ventas necesita saber cómo se vende cada competidor, cuáles son sus puntos débiles reales, qué ofertas activas tienen.
- **Audiencia:** Ventas (battle cards), marketing (positioning), principals (estrategia).
- **Impacto si no está:** Ventas pierde deals contra Exness/XM sin saber por qué. Marketing copia en vez de diferenciar.
- **Tamaño:** Grande (~6,000 palabras), 6-8 deep dives.
- **Outline:**
  - Exness: modelo ECN puro, spreads zero, licencias múltiples, fuerza en África/Asia, débil en LATAM retention
  - IC Markets: institucional, ASIC/CySEC, cTrader además de MT4/5, fuerte en Australia/Asia
  - XM: bonos agresivos, educación masiva, licencia CySEC, débil en innovación
  - FBS: Asia, cuentas cent, afiliados agresivos
  - RoboForex: CopyFX, cuentas cent, Belice
  - OctaFX: LATAM fuerte, simplicidad, débil producto institucional
  - HF Markets (HotForex): hybrid, Seychelles + FCA
  - Avenue/XP (Brasil): no son competidores directos pero hay que entenderlos
  - Battle card por competidor: cómo nos atacan, cómo respondemos, cuándo preferir que cliente se vaya ahí

---

### Gap #7: Guía de ejecución Dealing desk (Pepe) — versión educativa

- **Por qué importa:** `ab-book-policy.md` existe pero es confidencial solo para Pepe y Principals. Eso está bien. PERO el resto del equipo necesita una versión **sanitizada** que explique cómo funciona la ejecución sin revelar umbrales — para que ventas y soporte no digan estupideces.
- **Audiencia:** Ventas, soporte, marketing. No principals ni Pepe (ellos ya tienen el confidencial).
- **Impacto si no está:** Ventas dice "somos A-Book 100%" (mentira), cliente lo descubre, reputación dañada. Soporte no puede explicar slippage sin inventar.
- **Tamaño:** Medio (~3,000 palabras).
- **Outline:**
  - Qué es ejecución ECN/STP híbrida en lenguaje claro
  - Por qué todos los brokers grandes son híbridos (sin mencionar umbrales internos)
  - Liquidity providers: qué son, por qué tenemos varios
  - Slippage: positivo y negativo, por qué pasa, cómo lo explicamos al cliente
  - Requotes: cuándo pasan, por qué (low liquidity, news)
  - Swaps: explicación del carry trade y por qué se cobran
  - Gaps de fin de semana y noticias
  - Cómo el dealing desk defiende al cliente (anti-toxic flow de terceros, no el cliente sino bots/arbitraje)
  - Frases aprobadas y prohibidas para este tema

---

### Gap #8: Playbook IB / Partners avanzado (materiales para el partner)

- **Por qué importa:** `partners/` tiene programa, modelo financiero y guía operativa — para uso interno. Falta el material que le entregamos AL partner cuando entra: cómo promociona, copy aprobado, banners, disclaimers, qué no puede hacer, cómo mide su performance.
- **Audiencia:** Partners/IBs (externo), equipo de gestión de partners (interno).
- **Impacto si no está:** Partners improvisan copy que viola compliance, el partner promete cosas falsas, NEOMAAA se come la multa.
- **Tamaño:** Medio (~3,500 palabras).
- **Outline:**
  - Welcome kit para el IB nuevo
  - Qué puede decir el IB (copy aprobado por compliance)
  - Qué NO puede decir nunca (prohibido prometer rentabilidad, ocultar riesgo, inventar regulación)
  - Cómo ver sus métricas en Cellxpert
  - Estructura de comisiones detallada por tier
  - Materiales: banners, videos, landing pages que puede usar
  - Split entre IB master y sub-IBs (si aplica)
  - Frecuencia de payouts, métodos, mínimo
  - Causales de suspensión/terminación (fraude, bonus abuse por su red, etc.)
  - FAQ del IB: top 20 preguntas

---

### Gap #9: Post-launch playbook (semanas 1-4)

- **Por qué importa:** Hay checklist pre-launch y runbook del día D. Falta qué hacer las primeras 4 semanas post-launch: qué KPIs mirar cada día, cuándo decidir escalar ads, cuándo decidir matar una campaña, qué reportar a Principals, qué dispara una re-planificación.
- **Audiencia:** Principals, Marketing Manager (cuando entre), Head of Support, Ventas.
- **Impacto si no está:** Launch sin instrumentación, decisiones emocionales, plata quemada en paid sin feedback loop.
- **Tamaño:** Medio (~3,000 palabras).
- **Outline:**
  - KPIs diarios primeros 30 días: registros, KYC pass rate, FTD rate, FTD promedio, tickets/cliente, churn
  - KPIs semanales: CAC por canal, LTV temprano, win rate ventas, NPS soporte
  - Dashboard de Principals (qué mirar en reunión lunes)
  - Triggers de decisión: si FTD rate < X% → acción, si CAC > Y → acción
  - Retrospectiva semanal: formato, participantes, output
  - Escalamiento progresivo: cuándo abrir más países, cuándo contratar soporte extra
  - Red flags tempranos: patrones que indicaron que el launch fracasa y hay que pivotar

---

### Gap #10: Glosario bilingüe ES ↔ RU ↔ EN

- **Por qué importa:** Equipo bilingüe (ruso-hispano), portal ya está en ES y RU. Términos técnicos del broker (margen, apalancamiento, pip, slippage, drawdown, swap, lote, hedging) deben tener traducción canónica en las tres lenguas para que comms internas y con clientes no sean inconsistentes.
- **Audiencia:** Todo el equipo bilingüe (principals incluidos), soporte multi-idioma, marketing.
- **Impacto si no está:** Traducciones inconsistentes en materiales, cliente ruso lee una cosa en RU y otra en EN, confusión.
- **Tamaño:** Pequeño-medio (~2,000 palabras tabla densa).
- **Outline:**
  - Tabla: término ES | término EN | término RU | definición corta | ejemplo de uso
  - Cubrir ~150 términos: trading, producto, KYC/AML, pagos, CRM
  - Notas de uso: cuándo preferir el préstamo vs traducción (ej: "spread" vs "diferencial")
  - Frases comunes del cliente (complaint templates) en los 3 idiomas

---

## Sugerencias de reorganización

1. **Crear sección `product/`** separada de `operations/`. Hoy la info de producto está embebida en enciclopedia-soporte, onboarding, y faq-ventas. Se lo merece como sección de primer nivel: `product/cuentas.md`, `product/mt5.md`, `product/instrumentos.md`, `product/ejecucion.md`.

2. **Renombrar/dividir `encyclopedia/`** en dos conceptos distintos que hoy están mezclados:
   - `encyclopedia/` → contenido educativo transversal (formación precio, noticias, psicología, jurisdicciones, producto, PSPs) — estilo "entender el negocio".
   - `reference/` (nueva) → glosarios, ABC, cheatsheets, tablas de referencia rápida.

3. **Crear sección `people/` o `team/`** para onboarding del empleado, organigrama, cultura, políticas internas. Hoy `hiring/` solo tiene job descriptions hacia afuera; falta la mirada interna.

4. **Sacar `legal/` del navbar principal.** Son documentos públicos que no se usan día a día. Mantenerlos en una subsección "Documentos legales / referencia" o incluso en un footer. No deberían competir con el contenido operativo.

5. **Consolidar `compliance/workflow.md` y `compliance/workflow-sales-compliance.md`** — hoy son dos docs con overlap. Un solo workflow con subsecciones por equipo.

---

## Roadmap recomendado

**Semana 1 (pre-launch inmediato — alto impacto, necesario para operar):**
1. Gap #1 — Manual de producto / MT5 (sin esto ventas miente)
2. Gap #7 — Dealing desk versión educativa (sin esto ventas y soporte dicen pavadas)
3. Gap #2 — PSPs explicados (sin esto finanzas vuela a ciegas)

**Semana 2 (habilitadores de equipo):**
4. Gap #3 — Onboarding del empleado (permite escalar contrataciones sin perder calidad)
5. Gap #10 — Glosario bilingüe (rápido, habilita todos los otros docs)

**Semana 3 (ventas y mercado — para pasar de launch a crecer):**
6. Gap #4 — Perfiles de cliente por mercado
7. Gap #6 — Análisis competitivo deep-dive

**Semana 4 (operación post-launch):**
8. Gap #9 — Post-launch playbook (semanas 1-4)
9. Gap #5 — Manual de crisis

**Post-launch (mes 2):**
10. Gap #8 — Playbook IB avanzado (cuando empiece a entrar volumen de partners)

**Agrupación por sinergía:**
- Gaps #1 + #7 + #2 comparten materia "cómo funciona NEOMAAA por dentro" — se pueden escribir en paralelo por el mismo autor (Pepe o Alex A con review de Pepe).
- Gaps #3 + #10 son habilitadores de scaling — escribirlos antes que cualquier doc dirigido a externos.
- Gaps #4 + #6 son ventas/marketing — el mismo autor (Franco o Diego) con review de Angel.
- Gaps #5 + #9 son operativos/principals — escritos por Diego/Yulia/Stanislav.

**Principio de ejecución:** empezar por el Gap #1 esta misma semana. Es el que más apalanca a todos los demás — sin un manual de producto claro, cualquier otro doc hereda ambigüedad.
