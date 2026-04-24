# Risk Management — Vista del Owner

**Documento estratégico — ACCESO RESTRINGIDO OWNERS**
**Neomaaa Ltd (IBC 15968) | Licencia AOFA L15968/N**
**Audiencia:** Diego, Angel, Yulia, Stanislav
**Versión:** 1.0 | Fecha: 13 abril 2026
**Clasificación:** CONFIDENCIAL — uso exclusivo principals + Risk Committee

> [!DANGER]
> Este documento es la vista consolidada de riesgo del owner. No reemplaza el manual operativo de Pepe (Head of Dealing) ni el framework de Susana (Compliance). Complementa ambos desde la perspectiva del dueño del capital — qué riesgos pueden destruir la empresa, cómo medirlos antes de que exploten, y qué decisiones toman solo los principals.

> [!INFO]
> **Propósito:** definir los 8 tipos de riesgo estructurales que enfrenta NEOMAAA Ltd como broker regulado, establecer el risk register formal que se revisa trimestralmente en Board, los 5 stress scenarios que deben estar planificados antes de go-live, la pólitica de insurance del grupo, el dashboard diario del owner, el crisis playbook de 5 pasos, el Risk Appetite Statement que firma el Board, y las 6 red lines innegociables. Cross-references: `executive/treasury-management.md`, `executive/financial-controls.md`, `executive/unit-economics-broker.md`, `compliance/*`.

---

## 1. Por qué un Risk Framework del owner existe

Un broker retail vive de gestionar tres cosas simultáneamente: dinero de clientes, ejecución en mercado, y cumplimiento regulatorio. Cualquiera de las tres, mal gestionada, es terminal. El owner no ejecuta risk management día a día — eso lo hacen Pepe, Susana y el futuro Head of Finance — pero el owner es el que firma la póliza de riesgo, aprueba los límites, y se hace cargo cuando algo explota.

La historia de la industria forex/CFDs está llena de brokers que crecieron rápido y murieron por un riesgo mal dimensionado. Los patrones se repiten: un cliente VIP ganó un trade imposible de cubrir, un PSP congeló $500K por 60 días, un regulador abrió investigación y nadie tenía el expediente, un empleado movió dinero de Client Funds a Operating para "cubrir un hueco temporal" que nunca volvió. El owner enterado a tiempo tiene opciones. El owner enterado tarde tiene liquidación.

Este framework existe para que Diego, Angel, Yulia y Stanislav tengan la misma foto del riesgo en todo momento, con responsabilidades claras, escalación definida, y límites cuantitativos que no se negocian sin decisión colegiada.

---

## 2. Los 8 tipos de riesgo principales del broker

### 2.1 Liquidity Risk — no tener cash para cumplir obligaciones

**Qué es**
La incapacidad de pagar un retiro aprobado, una operación, un salario o un proveedor crítico en el momento requerido. No es insolvencia contable — puede haber capital suficiente en el balance — es falta de efectivo líquido en la cuenta correcta en el momento correcto.

**Cómo se manifiesta en un broker**
- Cliente pide retiro $50K, el Client Funds tiene el balance pero el PSP tarda 7 días en settlement y el wallet crypto está en lockup de 48h por política interna.
- Nómina del 5 del mes requiere $180K y el Operating solo tiene $90K porque un PSP retrasó remesa semanal.
- Un LP pide margin call extra por volatilidad y el Margin wallet está abajo del umbral.
- Un pico de retiros simultáneo por rumor en redes (bank run) supera el colchón de retiros disponible.

**Medidas clave**
- Cash ratio diario (efectivo disponible / obligaciones próximas 7 días) mínimo 1.5x
- Reserves en meses de OpEx (target 6 meses mínimo)
- Cobertura de top 10 retiros posibles (Client Funds ≥ top 10 client balances)
- Diversificación de bancos/PSP (no >50% del flow en un PSP único)

**Mitigación**
- Client Funds segregado e intocable (nunca se usa para ops, ver `treasury-management.md`)
- Reserves mínimas 6 meses de OpEx fija sin ingresos
- Multi-bank: mínimo 2 bancos corporativos operativos en 2 jurisdicciones
- Multi-PSP: mínimo 3 PSPs con volumen distribuido
- Daily cashflow forecast 7/30/90 días (Yulia)
- Wallet Overflow como colchón de retiros extraordinarios
- Crypto rails como backup cuando fiat está demorado

**Owner del riesgo:** Yulia (Principal Operations) con backup Diego.

---

### 2.2 Counterparty Risk — una contraparte falla

**Qué es**
El riesgo de que un proveedor crítico (LP, banco, PSP, custodio crypto) incumpla sus obligaciones, congele fondos, quiebre, sea sancionado o sea hackeado. Los brokers son una red de relaciones B2B y cualquier nodo roto rompe la cadena.

**Cómo se manifiesta**
- LP principal anuncia bankruptcy protection (caso FX Primus 2019, Alpari UK 2015).
- Banco corporativo cierra la cuenta sin previo aviso por "risk policy change" (ocurre rutinariamente con brokers offshore).
- PSP congela fondos 60-90 días por "investigation" (Stripe, PayPal, Paxum tienen historial).
- Custodio crypto hackeado (FTX 2022, Celsius 2022) o congelado por OFAC sanction.
- LP margin call imposible de cubrir en 24h.

**Medidas clave**
- Concentración por contraparte: no >40% flow en 1 LP, no >50% deposits en 1 PSP
- Diversificación jurisdiccional (no todo en una jurisdicción/regulador)
- Balance expuesto por contraparte en USD
- Tier rating interno de cada contraparte

**Mitigación**
- Diversificación obligatoria: 3 LPs mínimo, 3 PSPs mínimo, 2 bancos mínimo
- Jurisdicciones distintas (Dubai + Singapore + Europa por ejemplo)
- Background check anual a cada contraparte (auditorías, noticias, rating crediticio si aplica)
- Contratos con termination clause corta (30-90 días) para poder salir rápido
- Limits por contraparte revisados trimestralmente en Board
- Relationship backup: 1 LP/PSP/bank extra en cola ya legalmente onboardado aunque con 0% flow

**Owner:** Yulia (banks/PSPs) + Pepe (LPs).

> [!WARNING]
> El counterparty risk es el riesgo más subestimado en brokers nuevos. El 60% de los brokers que quebraron en últimos 10 años lo hicieron por una sola contraparte crítica que falló y no tenían backup funcional.

---

### 2.3 Regulatory Risk — AOFA revoca, suspende o sanciona

**Qué es**
El riesgo de que la autoridad regulatoria (en nuestro caso AOFA Anjouan) suspenda, revoque, multe o condicione la licencia del broker. Es el riesgo más catastrófico porque sin licencia no hay negocio.

**Cómo se manifiesta**
- Audit regulatorio imprevisto detecta finding material (commingling, KYC débil, flow sospechoso no reportado).
- Queja formal de cliente que escala a investigación.
- Cambio de política del regulador que invalida prácticas actuales (ej. prohibición súbita de cierto instrumento).
- Sanción internacional contra jurisdicción completa (ej. presión FATF a Vanuatu 2020).
- Directores incluidos en "fit & proper" review y uno falla el background.

**Medidas clave**
- Compliance findings abiertos (target: 0)
- Días desde último audit interno
- % de clientes con KYC nivel apropiado (target 100%)
- SAR/STR presentados y accepted por FIU
- Cambios regulatorios trackeados y respondidos en <30 días

**Mitigación**
- Compliance framework documentado y operado por Susana (ver `compliance/*`)
- Susana con backup (contratar Compliance Junior al hit 500 KYC/mes)
- Legal retainer con despacho especializado en jurisdicción (Anjouan + jurisdicciones de cliente)
- Audit externo anual obligatorio
- Relación proactiva con AOFA (reporting mensual aunque no lo exija)
- Policy library actualizada mínimo trimestral
- Training obligatorio staff (KYC/AML refresher semestral)
- Monitoring de cambios regulatorios (FATF, IOSCO, jurisdicciones cliente)

**Owner:** Susana (Compliance Officer), escalación Angel (CEO) + Diego.

---

### 2.4 Market Risk — B-Book exposure mal cubierto

**Qué es**
El riesgo de que clientes A-Book clients rentables ganen más de lo que el broker puede cubrir con el flujo interno (cuando parte del flow se internaliza). En un modelo híbrido ECN/STP como el nuestro, parte del volumen es B-Book por diseño.

**Cómo se manifiesta**
- Cliente VIP con estrategia breakout gana $500K en un trade durante evento macro (NFP, FOMC, SNB 2015).
- Cluster de clientes ganadores en mismo instrumento en poco tiempo (EURCHF cap removal 2015 quebró muchos brokers).
- Gap overnight en índice con exposición neta B-Book descubierta.
- Error en hedging: Pepe debía cubrir pero el bridge no ejecutó.

**Medidas clave**
- Net exposure por instrumento en USD tiempo real
- B-Book P&L diario / mensual
- VaR (Value at Risk) portfolio
- Concentración por cliente (top 10 clients % del net exposure)
- Número de clientes en flag A-Book vs B-Book

**Mitigación**
- Flow categorization policy clara (ver `executive/ab-book-policy.md`):
  - Clientes rentables consistentes → A-Book automático (hedged con LP)
  - Clientes retail pequeños / scalping no sistemático → B-Book aceptable
  - VIP high volume → A-Book obligatorio con monitoring
- Hedging automático por threshold (Pepe define, sistema ejecuta)
- Cap B-Book exposure por instrumento (ej. max $2M net en EURUSD)
- Cap B-Book exposure total (ej. max $X del reserves)
- Stop-out automático cuando un instrumento cruza threshold
- Review diario Pepe + Diego de exposures abiertas
- News filter: antes de eventos macro high-impact, flatten B-Book o reduce size

**Owner:** Pepe (Head of Dealing) con oversight Diego.

---

### 2.5 Operational Risk — errores humanos, procesos rotos, fraude interno

**Qué es**
Pérdidas generadas por fallas en procesos internos, errores humanos, fraude interno, o controles ineficaces. Es el riesgo más pervasivo porque afecta todas las áreas.

**Cómo se manifiesta**
- Empleado finance transfiere $30K al PSP equivocado por typo.
- Support agent reembolsa 100x el monto correcto por mal copiar/pegar.
- Empleado roba accediendo a credenciales compartidas (fraud interno).
- Proceso de KYC se ejecuta inconsistente entre analistas (findings en audit).
- Dev hace deploy en horario de trading y rompe MT5 bridge.
- Alguien publica credenciales en GitHub público.

**Medidas clave**
- Incidentes operativos por mes (target <2 materiales)
- % de procesos documentados formalmente (target >90%)
- Pérdidas operativas $ por mes
- Auditoría interna findings por trimestre
- Training completion % del staff

**Mitigación**
- Dual signatures obligatorios en transferencias >$10K (ver `financial-controls.md`)
- Audit trail completo en todos los sistemas (MT5, CRM, PSPs, bancos)
- Segregation of duties: quien ejecuta no aprueba, quien aprueba no reconcilia
- Background checks a todo staff con acceso a dinero o datos clientes
- Credentials management (1Password corporativo, no shared passwords)
- 2FA obligatorio en todo sistema crítico
- Playbooks documentados de procesos críticos (onboarding, withdrawal, hedging)
- Training obligatorio trimestral
- Insurance de crime (fidelity bond) cuando team >10 personas
- Whistleblower channel anónimo

**Owner:** Yulia (operations + finance) + Angel (tech + HR).

---

### 2.6 Technology Risk — sistemas caídos, hacks, ransomware, data loss

**Qué es**
El riesgo de que la infraestructura tecnológica (MT5, CRM, web, base de datos de clientes, wallets crypto, bridges a LPs) falle, sea comprometida, o pierda data.

**Cómo se manifiesta**
- MT5 server cae durante horario Asia y clientes no pueden cerrar posiciones → quejas + compensación + reputación.
- Ataque ransomware encripta CRM y base de clientes → 72h sin poder operar.
- Data breach expone KYC de 40K clientes → regulatorio + legal + reputación terminal.
- DB corruption y backup de hace 3 días → pérdida de trades, retiros, signups.
- DDoS attack durante evento macro impide acceso a plataforma.
- Insider borra datos antes de renunciar.

**Medidas clave**
- Uptime MT5 (target 99.95% en horario de mercado)
- Tiempo recuperación backup (RTO target <8h)
- Punto de recuperación (RPO target <1h)
- Pen test findings open (target: 0 high/critical)
- Incidents cybersecurity por año

**Mitigación**
- AWS multi-region (o equivalente Azure/GCP) con failover automático
- Backup diario encriptado en 3 ubicaciones (primary, secondary region, offsite cold)
- Backup verification automatizada (restore test semanal)
- Pen testing anual por firma externa reputada
- Vulnerability scanning continuo (Snyk, Nessus, Qualys)
- WAF + DDoS protection (Cloudflare Enterprise)
- Segmentación de red (MT5 server separado del CRM, wallets en máquina dedicada)
- Least-privilege access (cada rol solo accesos estrictamente necesarios)
- Audit logs inmutables con retención 7 años
- Incident response plan documentado y probado (fire drill semestral)
- Cyber insurance (ver sección 5)
- Plan contingencia emergencia (BCP/DRP) con RTO/RPO definidos

**Owner:** Angel (CEO/CTO interino) hasta contratar CTO formal, luego CTO.

---

### 2.7 Reputational Risk — thread viral "NEOMAAA es scam"

**Qué es**
Daño a la marca que afecta la capacidad de adquirir y retener clientes. En una industria de baja confianza como forex retail, la reputación es activo frágil y asimétrico (años construir, días destruir).

**Cómo se manifiesta**
- Cliente descontento abre thread en ForexPeaceArmy, Forex Factory, r/Forex, Trustpilot con acusación de scam.
- Influencer trader con 500K followers hace review negativa en YouTube.
- Queja en redes se vuelve viral en 48h.
- Competidor paga campaña negativa dirigida.
- Caso regulatorio público sale en medios.
- Empleado ex-staff difunde info negativa en LinkedIn.

**Medidas clave**
- Share of voice positivo / negativo / neutral
- Rating promedio en review sites (Trustpilot, FPA, Brokerage Reviews)
- NPS cliente (target >40)
- Menciones en redes (volumen + sentiment)
- Tiempo de respuesta a queja pública (<2h horario laboral)

**Mitigación**
- Customer service escalable y competente (Intercom, 2h SLA crítico, 24h SLA normal)
- Brand monitoring continuo (Mention, Brandwatch, Google Alerts) con alertas tiempo real
- Community management proactivo (presencia staff NEOMAAA en foros críticos)
- Legal retainer para takedowns de contenido difamatorio falso
- Proceso formal de complaint handling (ver `legal/complaint-handling.md`)
- Testimonios reales + auditorías visibles + transparencia en prácticas (página dedicada)
- Respuesta rápida y profesional a toda queja pública (nunca ignorar, nunca atacar)
- PR agency on retainer para crisis communication
- Policy de social media interna (staff no publica desde cuentas personales sobre NEOMAAA sin aprobación)

**Owner:** Marketing Head (futuro) con reporte Diego.

---

### 2.8 Concentration Risk — dependencia excesiva de un punto

**Qué es**
Riesgo de que la empresa dependa desproporcionadamente de un cliente, mercado geográfico, canal de adquisición, producto, proveedor o persona clave. La concentración convierte riesgos gestionables en riesgos existenciales.

**Cómo se manifiesta**
- 1 cliente = 30% del volumen mensual → si se va, revenue colapsa.
- 70% de FTDs vienen de 1 país → cambio regulatorio local destruye pipeline.
- 80% del marketing via Meta Ads → ban de cuenta = 0 leads.
- Angel único con credenciales administrativas de MT5 → bus factor 1.
- 1 afiliado genera 40% de leads → renegocia términos o se va competencia.
- 100% crypto rails en 1 provider → provider sanctioned = 0 crypto.

**Medidas clave**
- Top 10 clientes % del revenue (target <25%)
- Top 3 países % de FTDs (target <60%)
- Top canal marketing % de CAC spend (target <50%)
- Personas con single-point-of-failure knowledge
- Top 3 afiliados % del volumen (target <40%)

**Mitigación**
- Caps explícitos en KYC/onboarding si un cliente >X% del flow (se reduce exposure con límites de size)
- Diversificación geográfica programática (ver `escalamiento-y-crecimiento.md`)
- Multi-channel marketing con balance (Meta, Google, YouTube, Influencer, SEO, afiliados)
- Bus factor >1 en todo rol crítico (documentación + deputy + cross-training)
- Diversificación de afiliados (programa formal partners)
- Multi-provider en toda infra crítica
- Review trimestral de concentración por categoría

**Owner:** Diego (estratégico) + Yulia (operacional).

---

## 3. Risk Register formal

El Risk Register es el documento único que lista todos los riesgos identificados, su likelihood, impact, score, owner, mitigation y status. Se revisa trimestralmente en Board. Cualquier riesgo nuevo identificado se agrega. Cualquier score >15 requiere plan de remediación formal.

**Escalas:**
- **Likelihood:** 1 (muy improbable, <5% en 12m) — 2 (improbable, 5-20%) — 3 (posible, 20-50%) — 4 (probable, 50-80%) — 5 (casi certeza, >80%)
- **Impact:** 1 (pérdida <$10K, operacional menor) — 2 (pérdida $10-50K) — 3 (pérdida $50-250K, afecta trimestre) — 4 (pérdida $250K-1M, afecta año) — 5 (existential, licencia/quiebra/daño reputacional terminal)
- **Score:** Likelihood × Impact (rango 1-25)
- **Status:** 🟢 Mitigado / Aceptable · 🟡 En remediación · 🔴 Crítico acción inmediata

### 3.1 Tabla consolidada Risk Register NEOMAAA

| # | Riesgo | L | I | Score | Owner | Mitigación principal | Status |
|---|--------|---|---|-------|-------|---------------------|--------|
| 1 | PSP principal freeze $500K por 60d | 3 | 5 | 15 | Yulia | Multi-PSP setup + reserves | 🟡 |
| 2 | Cliente VIP gana $500K un trade | 2 | 4 | 8 | Pepe | Hedge policy + B-Book cap | 🟢 |
| 3 | Regulator AOFA audit imprevisto | 2 | 5 | 10 | Susana | Compliance framework + legal retainer | 🟢 |
| 4 | Major cyber incident (ransomware) | 2 | 5 | 10 | Angel/CTO | Backups + pen testing + cyber insurance | 🟡 |
| 5 | Major market event (flash crash) | 1 | 5 | 5 | Diego | Reserves + stress testing + hedge | 🟢 |
| 6 | LP principal quiebra | 2 | 4 | 8 | Pepe | Diversificación 3 LPs + margin recovery clauses | 🟡 |
| 7 | Banco corp cierra cuenta sin aviso | 3 | 4 | 12 | Yulia | Multi-bank + backup jurisdicciones | 🟡 |
| 8 | Thread viral scam accusation | 3 | 3 | 9 | Marketing | Brand monitoring + legal takedowns + PR | 🟡 |
| 9 | Key person leaves (Pepe/Susana/Angel) | 2 | 4 | 8 | Diego | Deputy + documentación + retention | 🟡 |
| 10 | Data breach KYC 40K clientes | 2 | 5 | 10 | Angel/CTO | Encryption + pen test + segmentación | 🟡 |
| 11 | Fraud interno empleado finance | 2 | 4 | 8 | Yulia | Dual sig + background + audit trail | 🟢 |
| 12 | Chargeback spike >2% | 2 | 3 | 6 | Support | KYC estricto + fraud detection + reserves | 🟢 |
| 13 | Concentración 1 cliente >20% vol | 3 | 3 | 9 | Diego | Cap single client + diversificación | 🟡 |
| 14 | FATF/OFAC sanciones a Anjouan | 1 | 5 | 5 | Susana | Backup jurisdicción explorada | 🟢 |
| 15 | Ban cuenta Meta Ads (ad account) | 3 | 3 | 9 | Marketing | Multi-channel + backup accounts | 🟡 |
| 16 | Dev borra prod database | 1 | 5 | 5 | Angel/CTO | Backups verificados + least privilege | 🟢 |

**Review cadence:** trimestral en Board Meeting. Cualquier cambio material en Score o status escala a reunión mensual.

> [!TIP]
> Agregar nuevos riesgos es tan importante como mitigar existentes. El Board debe hacer la pregunta "qué riesgo nuevo apareció este trimestre que no estaba" en cada review.

---

## 4. Los 5 Stress Scenarios — planning obligatorio

El Risk Register identifica, pero el Stress Testing simula. Cada scenario debe tener: trigger, timeline esperado, impacto cuantificado, response plan, costo estimado, requirements pre-existentes.

### 4.1 Scenario A — PSP freeze $500K por 60 días

**Trigger**
El PSP principal (ej. el proveedor de procesamiento LATAM que maneja Pix + tarjetas) congela la cuenta corporativa citando "investigation" o "risk review". Flujo entrante y saliente interrumpido.

**Timeline estimado**
- T+0: notificación freeze recibida
- T+0 a T+7: contact legal, negociación inicial
- T+7 a T+30: escalación, posible litigación, backup PSP en warm-up
- T+30 a T+60: resolución parcial o total, posible recovery con penalty

**Impacto cuantificado**
- 10-20% de Client Funds bloqueados 60 días
- Retiros demorados 7-15 días (hasta migrar a backup PSP)
- Reputación afectada si se hace público
- Costo legal estimado $20-50K
- Churn adicional 5-10% por fricción retiros

**Response plan**
1. Activar backup PSP secundario (activación <48h si estaba pre-onboarded)
2. Comunicación proactiva a clientes afectados (transparencia, timeline realista, alternativa)
3. Legal team contacto diario con PSP
4. Pausar marketing en región afectada hasta normalizar retiros (evita más FTDs con retiro complicado)
5. Usar Reserves para acelerar retiros críticos si es necesario
6. Post-mortem y decisión estratégica sobre continuar con PSP o migrar permanente

**Costo estimado total:** $30-80K (legal + comunicación + compensaciones + retention campaigns).

**Requirements pre-existentes**
- Mínimo 2 PSPs funcionales con share de flow (no uno con 100% flow y otro dormido)
- Reserves ≥ monto típico de retiros 30 días
- Legal retainer pre-negociado con tiempo respuesta <24h
- Comm template listo para "payment provider delay" situation

---

### 4.2 Scenario B — Cliente VIP retira $1M en 1 día

**Trigger**
Cliente con balance significativo ($1-2M) decide retirar todo simultáneamente. Causa puede ser: cambio estrategia propia, rumor negativo sobre NEOMAAA, oportunidad en otro broker, emergencia personal.

**Timeline estimado**
- T+0: solicitud de retiro recibida
- T+1-3: KYC/AML checks + source of funds verification si aplica
- T+3-7: ejecución vía PSP o wire según monto
- T+7-10: settlement completo

**Impacto cuantificado**
- Liquidity stress temporal
- Señal al resto del mercado si el cliente habla mal
- Costo oportunidad (ese AUM ya no genera spread/commissions)
- Posible cascada si otros clientes VIP siguen

**Response plan**
1. Confirmar segregated Client Funds tiene capacity inmediata (siempre debería)
2. Rutear retiro vía canal óptimo (wire si >$500K, split si hace sense, crypto si cliente prefiere)
3. Contactar cliente proactivamente: entender razón, ofrecer executive relationship management, no presionar retención
4. Post-retiro: survey / exit interview para aprender
5. Si se detecta patrón (otros VIPs van a seguir), activar plan de retención agresivo

**Costo estimado:** operacional (~$0 si segregated OK), reputacional (depende del cliente y su voz).

**Requirements pre-existentes**
- Regla de Reserves: Client Funds segregado debe ser ≥ suma de top 10 client balances en todo momento (si un top 10 se va, no dejas descubierto al resto)
- Capacity de wire outgoing en bank corporativo (limits diarios suficientes)
- Playbook "VIP retention" listo para Account Management

---

### 4.3 Scenario C — AOFA suspende licencia 30 días

**Trigger**
Regulador AOFA notifica suspensión temporal (30 días) por finding en audit o queja de cliente escalada. Durante suspensión: no puede onboardear nuevos clientes, no puede operar (según alcance de suspensión).

**Timeline estimado**
- T-30: warning previo si el audit fue anunciado (en casos hostil puede no haber warning)
- T+0: notificación de suspensión
- T+0 a T+30: suspensión activa, remediation plan ejecutándose
- T+30 a T+60: lifting o extensión según cumplimiento

**Impacto cuantificado**
- Dead stop del negocio si suspensión total
- Retiros pueden seguir (clientes se van en masa)
- Revenue 30 días = 0
- Costo legal + compliance consultants: $100K-500K
- Costo reputacional: potencialmente terminal si se hace público y viraliza
- Worst case: suspensión → revocación → liquidación

**Response plan**
1. Activar legal team especializado en AOFA (retainer pre-negociado) dentro de 2h
2. Armar remediation plan con timeline clara (qué corregir, cuándo, quién)
3. Comunicación a clientes: transparente sin pánico (retiros seguros, operaciones pausadas)
4. Comunicación interna: staff informado de que hacer/no hacer
5. Emergency funding si Reserves insuficientes para cubrir legal + opex 30 días
6. Plan B: evaluar migración de licencia (Comoros, Seychelles, otras offshore) en paralelo si la resolución se alarga
7. PR strategy: no ocultar pero no viralizar

**Costo estimado total:** $100K-1M+ según severidad (incluye legal, compliance consulting, staff idle, client retention, potencial relicensing).

**Requirements pre-existentes**
- Emergency fund separado del Operating (ver `treasury-management.md`), mínimo $300K disponibles 48h
- Legal retainer con despacho especialista en jurisdicción
- Backup jurisdicción explorada (no necesariamente onboardeada pero escenario evaluado)
- Client comm templates listos
- Staff awareness: qué decir / no decir externamente

---

### 4.4 Scenario D — COVID-style macro event + 3x chargebacks

**Trigger**
Evento macro tipo COVID-2020 o SVB-2023 que genera: volatilidad extrema de mercado, clientes bajo stress financiero personal, spike de chargebacks/disputas, PSPs endurecen requirements, bancos ralentizan settlements.

**Timeline estimado**
- T+0 a T+7: shock inicial, volumen de trading spike, chargebacks comienzan
- T+7 a T+30: chargebacks escalan 3-5x baseline
- T+30 a T+90: PSPs piden reservas adicionales, algunos suspenden
- T+90+: new normal, recovery gradual

**Impacto cuantificado**
- Chargeback rate sube de 0.5% a 1.5-2% (impacto directo en $)
- Reserves PSP suben (más cash inmovilizado)
- Churn 15-25% por clientes con problemas financieros
- Revenue puede ↑ temporalmente (volatilidad = más trading) pero balance real negativo
- Costo dispute management ↑

**Response plan**
1. Activar Reserves para cubrir chargebacks + reserve demands PSPs
2. Fraud detection tightened (fricción extra en deposit-to-withdrawal rapid flow)
3. Negociación inmediata con PSPs (mostrar data, proponer plan, no esperar a que pidan)
4. Slow marketing: reducir spend en canales con baja calidad (podría sobrevolar chargeback rate)
5. Focus en clientes existentes (retención) vs nuevos (CAC sube con fricción)
6. Comunicación a staff: no es el fin, es ciclo, enfocar en ejecución limpia

**Costo estimado:** $200-500K entre chargeback losses + PSP reserves + marketing inefficiency.

**Requirements pre-existentes**
- Reserves 6 meses OpEx mínimo
- Chargeback detection tooling (Stripe Radar equiv, Sift, Forter)
- Multi-PSP para no depender de políticas de uno solo
- Customer comms playbook "macro stress period"

---

### 4.5 Scenario E — Dev team borra MT5 database (catastrófico)

**Trigger**
Error humano o malicia: alguien con acceso elimina la base de datos principal de MT5 (clientes, trades históricos, balances). Puede ser: deploy mal ejecutado, rm -rf wrong env, script automation con bug, insider malicioso.

**Timeline estimado**
- T+0: detección (ojalá instantánea por monitoring)
- T+0 a T+8: restore desde backup
- T+8 a T+24: verificación y reconciliación
- T+24 a T+72: comunicación a clientes + compensaciones si aplica

**Impacto cuantificado**
- Si backup OK y RTO <8h: impacto medio, operaciones pausadas medio día, clientes molestos, compensación moderada
- Si backup no verificado o corrupt: catastrófico. Potencial pérdida de data irrecuperable
- Regulatorio: AOFA debe ser notificado (incident reportable)
- Reputacional: depende de manejo público

**Response plan**
1. Detectar → Containment: revocar todos los accesos, freezar cambios inmediatamente
2. Activar incident response team (Angel + senior dev + Yulia + Diego)
3. Restore desde último backup verificado (<1h hacia atrás idealmente)
4. Reconciliación: balances client vs backup vs PSP vs LP positions
5. Identificar gap (trades entre último backup y crash)
6. Compensar clientes afectados por gap (conservadoramente a favor del cliente)
7. Comunicación cliente y regulador
8. Post-mortem público y cambios estructurales (qué acceso cambia, qué proceso cambia)

**Costo estimado:** $50-300K en compensations + legal + consulting. Puede ser existential si backups fallan.

**Requirements pre-existentes**
- **Daily verified backups offsite** (no solo "daily backup" — verificado con restore test al menos semanal)
- RPO <1h, RTO <8h documentados y probados
- Least privilege: nadie tiene permiso de DROP DATABASE sin doble approval
- Read replica para queries, no se toca primary para analytics
- Change management con approval para cualquier migration/deploy
- Audit trail inmutable de quién hizo qué cuándo

> [!DANGER]
> Scenario E es el único de los 5 que puede matar la empresa en horas si los pre-requisitos fallan. Es el de menor probabilidad pero mayor severidad absoluta. El owner debe personalmente verificar trimestralmente que backups se están tomando Y se están verificando.

---

## 5. Insurance y hedging financiero

Insurance en un broker cubre riesgos específicos donde la prima vale el cover. No se contrata todo — se contrata lo que tiene probabilidad material × impacto material no absorbible por reserves.

### 5.1 Professional Indemnity (errores y omisiones profesionales)

**Cobertura**
Reclamos de clientes por errores en ejecución, asesoramiento (aunque NEOMAAA no asesora formalmente), miscalculo de margin, errores de reporting regulatorio. Cubre defensa legal + settlement.

**Costo:** $5-20K/año para $1-5M cover.
**Cuándo contratar:** desde go-live. Barato para el downside cover.
**Providers típicos:** Lloyd's of London syndicates, AIG, Chubb, Hiscox (via broker especializado en financial services).

### 5.2 Cyber insurance

**Cobertura**
Response a breach (forensics, notification, legal), ransomware (cubre pago o recovery costs según póliza), business interruption por cyber incident, extortion, regulatory fines derivadas de breach (según jurisdicción).

**Costo:** $3-10K/año para $1-5M cover (sube con tamaño de dataset y headcount).
**Cuándo contratar:** al hit 5K+ clientes o antes de recibir primer audit KYC crítico.
**Providers:** Coalition, Chubb Cyber, Beazley, AIG.

**Pre-requisitos típicos:** MFA implementado, backups verificados, pen test reciente, EDR en endpoints, policy documentada.

### 5.3 D&O (Directors & Officers)

**Cobertura**
Personal liability de los directores (Diego, Angel, Yulia, Stanislav) por demandas derivadas de decisiones corporativas. Relevante si NEOMAAA opera con clientes retail en múltiples jurisdicciones (cualquier reclamo puede nombrar al director personalmente).

**Costo:** $5-15K/año para $1-3M cover.
**Cuándo contratar:** desde incorporación. Es baratísimo para proteger el patrimonio personal.
**Providers:** AIG, Chubb, Hiscox.

### 5.4 Crime / Fidelity Bond

**Cobertura**
Fraude interno de empleados, robo de fondos, social engineering fraud (employee transfers to fraudster posing as CEO).

**Costo:** $2-8K/año para $500K-2M cover.
**Cuándo contratar:** al hit 10+ empleados con acceso a dinero o pagos.

### 5.5 Counterparty credit insurance (ISDA)

**Cobertura**
Default de LP o institutional counterparty. Es complejo (ISDA agreements), caro, y típicamente no accesible hasta tener volumen significativo ($50M+/mo).

**Cuándo contratar:** post-scale, con flow institucional. Year 3+.

### 5.6 Policy-to-cover matriz sugerida año 1-3

| Insurance | Año 1 | Año 2 | Año 3 |
|-----------|-------|-------|-------|
| Professional Indemnity | ✅ $1M | ✅ $3M | ✅ $5M |
| Cyber | ✅ $1M | ✅ $3M | ✅ $5M |
| D&O | ✅ $1M | ✅ $2M | ✅ $3M |
| Crime / Fidelity | ⚪ skip si <10 staff | ✅ $500K | ✅ $1M |
| Counterparty credit | ❌ | ❌ | ✅ evaluar |

**Budget anual target insurance:** 0.5-1% del revenue (razonable para broker retail).

**[DATO: Insurance providers contratados o a contratar, broker seguros a utilizar, premiums negociados]**

---

## 6. Dashboard diario del owner — lo que Diego mira cada mañana

El owner no ejecuta el negocio día a día pero debe tener un dashboard único con los indicadores que dicen si el negocio está sano. 5 bloques, 10 minutos de lectura, cada mañana antes de todo lo demás.

### 6.1 Los 5 balances

Monto actualizado a cierre de día anterior de los 5 wallets:
1. Client Funds (segregado) — debe ser ≥ client liabilities
2. Operating — debe ser ≥ 30 días OpEx próxima
3. Reserves — debe ser ≥ 6 meses OpEx
4. Margin (parked con LPs) — cobertura actual vs exposure B-Book
5. Overflow / dividends pending — balance distribuible

Debe haber semáforo visual: 🟢 sobre target · 🟡 cerca del floor · 🔴 bajo floor.

### 6.2 LP exposure

- Exposure neto por instrumento top 10
- B-Book P&L del día anterior
- Margin utilization (actual / available)
- Alertas si algo cruza threshold

### 6.3 PSP health

- Volumen procesado últimos 7d por PSP
- Balance pending settlement por PSP
- Chargeback rate últimos 30d
- Cualquier "reserve hold" o "review" nuevo de PSP
- Tiempo promedio settlement últimos 7d

### 6.4 Compliance queue

- KYC pending count (y el más viejo, SLA)
- SAR/STR del mes
- Queues escaladas a Susana
- Next audit / reporting deadline
- Findings abiertos de último audit

### 6.5 Red alerts

Sección libre donde sistema flaggea cualquier cosa que merezca atención del owner:
- Retiro único >$100K pending approval
- Cliente con pattern sospechoso escalado por Compliance
- LP con margin call en últimas 24h
- PSP con delay anormal
- Ticket VIP escalado sin resolver
- Cualquier incident de tech (MT5 downtime, breach attempt)

> [!TIP]
> Este dashboard lo arma Angel / futuro CTO y vive en un panel único que Diego abre cada mañana. No son 5 tabs en 5 sistemas — es un solo screen. Si no existe, Diego lo ejecuta manualmente con 5 llamadas cortas (Yulia para wallets, Pepe para LPs, Yulia para PSPs, Susana para compliance, on-call para alerts).

---

## 7. Crisis Playbook Ejecutivo — los 5 pasos

Cuando algo explota, no hay tiempo para inventar el proceso. El playbook es un protocolo fijo que se activa automáticamente y nadie discute en el momento del fuego.

### 7.1 Paso 1 — Containment (primera hora)

**Objetivo:** detener la hemorragia. Prevenir que el problema escale antes de entender su tamaño.

**Acciones típicas:**
- Identificar el blast radius (qué sistemas, qué clientes, qué $)
- Revocar accesos si hay sospecha de breach
- Freezar procesos que pueden amplificar (ej. retiros en masa, trades automatizados)
- Activar war room (físico o virtual) con los 3-5 decisores clave
- Notificar a los principals dentro de 30 minutos (Diego, Angel, Yulia, Stanislav)
- Designar un Incident Commander único (default: Diego, delegable a Angel)

**Output:** decisión inicial "¿es crisis tier 1, 2 o 3?"
- Tier 1: puede costar la empresa (AOFA, breach masivo, liquidez crítica) → escalación inmediata Board + legal + PR
- Tier 2: pérdida material pero absorbible ($100K-1M) → response team, no crisis total
- Tier 3: operacional, contenible → team operativo maneja sin escalación

### 7.2 Paso 2 — Assessment (primeras 24 horas)

**Objetivo:** dimensionar el problema con datos, no intuición.

**Acciones:**
- Cuantificar pérdida potencial (min/expected/max scenarios)
- Identificar todos los stakeholders afectados (clientes, regulator, PSPs, LPs, staff, media potencial)
- Legal team evalúa exposición
- Compliance evalúa reporting obligation (AOFA, FIU, otros)
- Tech team evalúa fix timeline si aplica
- Comms team prepara drafts de mensaje (interno + cliente + regulador + media)

**Output:** documento consolidado de 1 página con: qué pasó, impacto cuantificado, acciones en ejecución, decisiones pendientes, siguiente update time.

### 7.3 Paso 3 — Response (48 horas)

**Objetivo:** ejecutar el plan de remediación de manera coordinada.

**Acciones:**
- Fix técnico si aplica (con change management acelerado pero no bypassed)
- Ejecutar reporting obligatorio a regulator (con legal review)
- Compensación a clientes afectados si corresponde
- Renegociación con contrapartes (PSPs, LPs, bancos) si el evento los afectó
- Legal actions preventivas si hay bad actor externo (takedowns, cease and desist)

### 7.4 Paso 4 — Communication

**Objetivo:** controlar la narrativa con transparencia pero sin auto-inmolación.

**Reglas de comunicación crisis:**
- **Clientes directos:** comunicar antes de que se enteren por otro lado. Factual, breve, qué va a pasar con ellos específicamente, canal de preguntas.
- **Regulador:** reporting obligatorio dentro del SLA regulatorio (AOFA típicamente 72h material incidents). Legal review obligatorio antes de enviar.
- **Media (si crisis pública):** spokesperson único designado (default Diego), mensaje acordado, no improvisación. Si necesario, PR agency on retainer.
- **Staff:** briefing interno rápido (qué pueden decir / no pueden decir). Evita rumores que leakean.
- **Redes sociales:** respuesta oficial rápida, no debate público, redirigir a canal privado.

**NO hacer:**
- Silencio total mientras clientes especulan
- Respuestas defensivas o combativas en público
- Promesas sin poder cumplir
- Culpar a empleados o proveedores en público

### 7.5 Paso 5 — Post-mortem (1 semana)

**Objetivo:** que el mismo fuego no vuelva a ocurrir.

**Acciones:**
- Meeting formal post-mortem con todos los involucrados (48-72h después de contención)
- Blameless culture (el objetivo es aprender, no buscar culpables) pero accountable (alguien es owner de que no se repita)
- Root cause analysis (5 why's, no detenerse en síntoma)
- Acciones concretas con owners y deadlines
- Update del Risk Register (este riesgo tiene nuevo score?)
- Update de playbooks / policies si aplica
- Presentación al Board en siguiente reunión mensual

**[DATO: Crisis escalation chain específica NEOMAAA — orden de llamada, teléfonos 24/7, backup si primario no responde, criterio de tier 1/2/3 firmado por Board]**

---

## 8. Risk Appetite Statement — para firma de Board

El Risk Appetite Statement es la declaración formal de qué riesgos el Board está dispuesto a aceptar y bajo qué condiciones. Se firma en Board Meeting, se revisa anualmente, y cualquier desvío material requiere decisión colegiada.

### 8.1 Qué aceptamos

NEOMAAA Ltd acepta asumir los siguientes riesgos en la búsqueda de su propósito comercial:

- **Market risk acotado:** B-Book exposure dentro de los límites cuantitativos definidos (ver sección 8.3).
- **Counterparty risk diversificado:** exposure a LPs, PSPs y bancos dentro de límites de concentración, con diversificación jurisdiccional mandatoria.
- **Regulatory risk de jurisdicción offshore:** operamos bajo AOFA L15968/N con compromiso activo de compliance, asumiendo que la jurisdicción offshore tiene perfil distinto a Tier 1 (CySEC/FCA/ASIC).
- **Growth risk disciplinado:** crecimiento agresivo pero con unit economics validados (LTV:CAC >3, payback <12m) y compliance escalado proporcionalmente.
- **Operational risk controlado:** errores humanos ocurrirán, aceptamos impacto absorbible con controles dual (dual sig, segregation of duties, audit trail, training recurrente).

### 8.2 Qué rechazamos

NEOMAAA Ltd NO acepta:

- **Clientes de jurisdicciones restringidas** (EE.UU., sancionados OFAC, FATF greylist sin EDD aprobada formalmente, países en lista prohibida interna).
- **Source of funds no verificable** para clientes tier alto. Todo depósito >$50K requiere SoF documentado.
- **Flow sospechoso** que supere thresholds de detección sin escalación formal Compliance.
- **Compliance findings abiertos** más de 90 días sin plan de remediación ejecutándose.
- **Over-leverage** de client funds (nunca usar client money para cubrir operaciones del broker, sin excepción).
- **Single-source dependency** en infra crítica (no 1 PSP único, no 1 LP único, no 1 banco único, no 1 persona única con knowledge crítico).
- **Commitments sin reserves** (no lanzar producto/mercado sin budget + reserve asignados).

### 8.3 Limits cuantitativos (los números que no se mueven sin Board)

- **Max exposure single client:** ≤ 10% del Client Funds totales
- **Max B-Book net exposure total:** [DATO: $ threshold a definir, típico $5-20M según tamaño]
- **Max B-Book exposure por instrumento:** [DATO: $ por instrumento top liquidity, típico $2-5M]
- **Reserves floor:** 6 meses OpEx fija mínimo, nunca bajo este piso
- **Chargeback rate max:** 1.5% rolling 30d (por encima → escalation + fraud review)
- **PSP concentration max:** ≤ 50% del flow en un único PSP
- **LP concentration max:** ≤ 40% del flow en un único LP
- **Single bank concentration:** ≤ 60% del corporate cash en un banco
- **VaR portfolio max:** [DATO: $ a definir con Pepe]
- **Margin utilization max:** ≤ 70% del margin disponible con cada LP

### 8.4 Aprobación

Este Risk Appetite Statement debe estar firmado (físicamente o digitalmente con trazabilidad) por los 4 principals: Diego, Angel, Yulia, Stanislav. Review anual en Board Meeting de enero. Modificaciones requieren reunión extraordinaria de Board con quórum.

---

## 9. Red lines — las 6 que nunca cruzamos

Hay decisiones que no son análisis caso a caso. Son líneas rojas absolutas. Cruzarlas es motivo de terminación inmediata del responsable (empleado, director, socio) y, en casos graves, escalación legal.

### 9.1 Jamás usar Client Funds para financiar operaciones del broker

Ni un dólar, ni un día, ni con intención de devolver. Client Funds es propiedad económica del cliente. Commingling = revocación licencia + potencial criminal. Incluye: no usar para cubrir payroll, no usar para cubrir B-Book drawdown, no usar como colateral de créditos corporativos.

### 9.2 Jamás onboardear cliente de jurisdicción restringida

Lista explícita (EE.UU., OFAC sanctioned, FATF greylist sin EDD aprobada) es no-negotiable. No importa si es whale, no importa si "paga más", no importa si es referido de VIP. Onboardearlo expone al broker a multas regulatorias multi-millonarias y potencial shutdown.

### 9.3 Jamás ocultar información al regulador

En cualquier reporting a AOFA (mensual, ad-hoc, respuesta a audit), la información entregada es completa y precisa. Omitir intencionalmente = fraude regulatorio = criminal. Si hay mala noticia, se reporta con contexto y plan de remediación. Nunca se oculta.

### 9.4 Jamás dar garantías de rendimiento a clientes

Un broker retail no garantiza retornos. Frases "ganá X% seguro", "vas a recuperar tu pérdida", "nuestro sistema no pierde" están prohibidas en toda comunicación comercial. Exposición legal masiva + cliente compliance. Training obligatorio a sales en esto.

### 9.5 Jamás competir con el cliente (inside info trading)

Nadie en NEOMAAA (directores, dealing, support, marketing) opera cuentas personales basadas en información que ve del flow de clientes. Ni front-running, ni copy-trading de ganadores conocidos, ni usar posición B-Book para oportunismo. Viola fiduciary duty y es criminal en múltiples jurisdicciones.

### 9.6 Jamás modificar trades ex-post

Una vez ejecutado un trade en MT5 y registrado en ledger, NADIE lo modifica retroactivamente. Ni para "corregir un error", ni para "ajustar un spread", ni bajo presión de cliente VIP. Modificación ex-post = manipulación = revocación licencia garantizada si se detecta. Si hay error real, se compensa con un ajuste documentado separado, pero el trade original queda intacto.

> [!DANGER]
> Estas 6 red lines están en el contrato de todo empleado y director. Violarlas es causal de terminación inmediata + potencial denuncia criminal. No se debaten caso a caso. No hay excepciones "por esta vez". El owner las firma y el staff las firma.

---

## 10. Calendario de revisión y governance

| Cadence | Actividad | Participantes |
|---------|-----------|---------------|
| Diario | Dashboard owner (sección 6) | Diego (consumo), Yulia/Pepe/Susana (input) |
| Semanal | Risk snapshot a Diego (bullets 10min) | Yulia |
| Mensual | Risk Committee meeting | Diego, Pepe, Susana, Yulia, Angel |
| Trimestral | Risk Register review en Board | 4 principals + Pepe + Susana |
| Anual | Risk Appetite Statement re-firma + stress testing refresh | Board + external advisors |
| Ad-hoc | Crisis playbook activación | Según tier |

**[DATO: Calendario específico 2026 con fechas concretas de cada Risk Committee y Board Risk Review, firmado por principals]**

---

## 11. Cross-references

- `executive/panorama-ejecutivo.md` — vista general operativa del broker
- `executive/treasury-management.md` — arquitectura multi-wallet
- `executive/wallet-structure-neomaaa.md` — implementación específica NEOMAAA
- `executive/financial-controls.md` — controles financieros día a día
- `executive/unit-economics-broker.md` — impacto económico de decisiones de riesgo
- `executive/liquidity-providers-b2b.md` — gestión LPs (counterparty risk)
- `executive/escalamiento-y-crecimiento.md` — riesgos de growth
- `compliance/*` — framework operativo de compliance
- `legal/complaint-handling.md` — manejo de quejas (reputational risk)

---

## 12. Conclusión para el owner

El risk management no es un departamento. Es la disciplina continua del owner de ver los 8 riesgos cada día, aceptar que algunos van a pasar, preparar la respuesta antes que pase, y asegurar que cuando pase el equipo ejecuta el protocolo sin improvisar.

Los brokers que sobreviven 10 años no son los que no tuvieron crisis. Son los que tenían playbook listo y reserves suficientes cuando llegó la crisis. Los que mueren son los que confiaron que "a nosotros no nos va a pasar" hasta que les pasó.

Para Diego, Angel, Yulia y Stanislav: este documento es el piso mínimo del framework. El techo lo pone la disciplina de revisarlo trimestralmente, actualizarlo cuando algo cambia, y protegerlo de la tentación de relajarse cuando el negocio está yendo bien.

El peor momento para leer este documento es cuando ya explotó algo. El mejor momento es cada trimestre, cuando no pasa nada.

---

*Fin del documento. Versión 1.0 — 13 abril 2026. Next review: julio 2026.*
