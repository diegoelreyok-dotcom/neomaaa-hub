# NEOMAAA Broker — Programa de Capacitación Sales
## Transición Propfirm → Broker | 6 Semanas

**Participantes:** Franco, Edward, Luis
**Responsables de módulos:** Pepe (producto), Susana (compliance), Diego (ventas/CRM)
**Formato:** 2 horas diarias (10am-12pm), lunes a viernes
**Evaluación:** Examen escrito + simulación de llamada al final de cada semana
**Última actualización:** 17 de abril 2026 (v2.0 — syllabus)

> [!INFO]
> **Este documento es el syllabus operativo.** El contenido técnico (producto, MT5, compliance) vive en los docs gold source de cada sección. Cada semana apunta a los docs de lectura obligatoria. El trainee debe leerlos ANTES de la clase. Esta página define qué se cubre, qué hace el trainee, y cómo se evalúa.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="6" data-label="Semanas"></div>
<div className="neo-stat" data-value="30" data-label="Días hábiles"></div>
<div className="neo-stat" data-value="60h" data-label="Total capacitación"></div>
<div className="neo-stat" data-value="85%+" data-label="Nota mínima"></div>
</div>

---

## Por qué este programa existe

Vender broker NO es vender propfirm. Cambia producto, cliente, riesgo regulatorio y ciclo de retención. Un agent que vende broker con mentalidad de propfirm en 48h: promete rendimientos (ilegal), no sabe explicar spreads/swap/margin, ignora compliance, y pierde clientes por no manejar objeciones de confianza.

| Propfirm | Broker |
|----------|--------|
| Cliente paga challenge (fee único) | Cliente deposita su dinero real |
| Riesgo de la propfirm | Riesgo del cliente |
| KPI: challenges vendidos | KPI: FTDs + retención + depósitos recurrentes |
| Regulación laxa | KYC/AML obligatorio |
| Venta termina en challenge | Venta inicia relación largo plazo |

---

## SEMANA 1 — Producto Broker: los fundamentales

**Instructor:** Pepe
**Objetivo:** que cada agent entienda el producto como si fuera trader.

**Lectura obligatoria (previa a la semana):**
- [`encyclopedia/abc`](/content/encyclopedia/abc) — glosario completo
- [`encyclopedia/productos-mt5`](/content/encyclopedia/productos-mt5) — especialmente sección "Tipos de cuenta" (gold source) + instrumentos + leverage + contract specs

**Temas por día:**
- **Día 1:** Qué es un broker, cómo gana dinero, diferencia broker vs propfirm. Spreads: qué son, por qué varían.
- **Día 2:** Leverage, margin, free margin, margin call, stop out, negative balance protection. Ejemplos numéricos.
- **Día 3:** Swaps, comisiones Raw vs Standard, Swap-free, costos ocultos que preguntan clientes.
- **Día 4:** Instrumentos (2,000+): forex majors/minors/exóticos, índices, metales (XAU), crypto CFDs, stocks, ETFs.
- **Día 5:** NEOMAAA vs competencia (spreads, leverage, métodos de pago LATAM). Qué sí/NO decir de competidores.

**Ejercicios prácticos (el trainee DEBE hacer):**
1. Calcular costo total (spread + comisión) de 1 lote EURUSD en cada tipo de cuenta.
2. Simular operación $500 con 1:500, calcular margin requerido y punto de stop out.
3. Calcular swap overnight para 1 lote EURUSD mantenido 1 semana.
4. Armar "cartera recomendada" para cliente LATAM típico.

**Examen Semana 1:** 30 preguntas escritas. Nota mínima: **80%**.

---

## SEMANA 2 — MetaTrader 5: hands-on

**Instructor:** Pepe
**Objetivo:** cada agent navega MT5, abre/cierra operaciones, da soporte básico de plataforma.

**Lectura obligatoria:**
- [`encyclopedia/productos-mt5`](/content/encyclopedia/productos-mt5) — tipos de órdenes, contract specs, plataformas de acceso, errores comunes
- [`support/enciclopedia-soporte`](/content/support/enciclopedia-soporte) — troubleshooting y glosario trader

**Temas por día:**
- **Día 1:** Descargar/instalar MT5 desktop + mobile. Navegación: Market Watch, Chart, Navigator, Terminal, Toolbox.
- **Día 2:** Ordenes (mercado, buy/sell limit, buy/sell stop). Modificar SL/TP. Cerrar parcial/total.
- **Día 3:** Charts, timeframes, indicadores básicos (MA, RSI, MACD, Bollinger), templates.
- **Día 4:** Account management: historial, balance/equity/margin, cómo generar statement.
- **Día 5:** Troubleshooting común — "no deja abrir", "cerró sola", contraseña, EA install.

**Ejercicios prácticos:**
1. Configurar MT5 con layout personal.
2. Abrir 5 operaciones de distintos tipos, modificar, cerrar.
3. Preparar chart presentable para mostrar a prospecto.
4. Generar statement de cuenta demo y explicar cada línea.

**Examen Semana 2:** Demo práctica — abrir, gestionar y cerrar 10 operaciones con explicación verbal.

---

## SEMANA 3 — Compliance: cero riesgo regulatorio

**Instructor:** Susana
**Objetivo:** el equipo NO pone a NEOMAAA en riesgo regulatorio.

**Lectura obligatoria (bloqueante — sin esto no se presenta al examen):**
- [`compliance/manual-susana`](/content/compliance/manual-susana) — principios + A-Book/B-Book público vs confidencial
- [`compliance/frases-prohibidas`](/content/compliance/frases-prohibidas) — **gold source** de 28 frases prohibidas + 14 aprobadas + 5 disclaimers. Memorizar.
- [`compliance/screening-sanciones`](/content/compliance/screening-sanciones) sección 12.5 — países restringidos (gold source)
- [`compliance/risk-matrix`](/content/compliance/risk-matrix) — framework LOW/MEDIUM/HIGH (gold source)

**Temas por día:**
- **Día 1:** Identidad legal Neomaaa Ltd / IBC 15968 / L15968/N / AOFA. Base execution-only. Países restringidos — gold source en screening-sanciones 12.5. Consecuencias reales de violar compliance.
- **Día 2:** Frases PROHIBIDAS (las 28 — memorizar) y sus alternativas aprobadas. Gold source: frases-prohibidas.
- **Día 3:** Disclaimers obligatorios (corto / largo / execution-only / counterparty / apalancamiento). Cómo/cuándo insertarlos. Gold source: frases-prohibidas sección 3.
- **Día 4:** KYC: rol del sales agent. Flujo Sumsub. Cómo actuar ante GREEN/YELLOW/RED/PEP/Sanctions hit. Framework 3 categorías (LOW/MEDIUM/HIGH) en risk-matrix.
- **Día 5:** Roleplay 10 escenarios — cliente pide garantías, pregunta A/B-Book, quiere saber si lo manejan contra él.

**Ejercicios prácticos:**
1. Memorizar y recitar de memoria las 28 frases prohibidas con sus alternativas.
2. Responder sin dudar la identidad legal completa.
3. Roleplay donde cliente pide "señal de entrada" y agent redirige sin violar compliance.
4. Reconocer país restringido en 5 casos límite (doble nacionalidad, residencia EEA, IP de USA con pasaporte LATAM).

**Examen Semana 3:** 25 preguntas escritas + 3 roleplays evaluados por Susana.
**Nota mínima: 90%.** Fallar = repetir la semana completa. Tolerancia cero a errores de compliance.

---

## SEMANA 4 — El arte de vender broker

**Instructor:** Diego
**Objetivo:** pitch, objeciones, cierres específicos para broker.

**Lectura obligatoria:**
- [`sales/objections-broker`](/content/sales/objections-broker) — playbook completo de objeciones
- [`sales/faq-ventas`](/content/sales/faq-ventas) — respuestas aprobadas
- [`sales/primer-contacto`](/content/sales/primer-contacto) — scripts de apertura
- [`sales/plan-contacto`](/content/sales/plan-contacto) — cadence y canales

**Temas por día:**
- **Día 1:** Estructura de pitch 3 minutos — Hook / Dolor / Solución / Prueba social / CTA.
- **Día 2:** Las 15 objeciones más comunes y sus respuestas aprobadas. Mapa de objeciones desde objections-broker.
- **Día 3:** Técnicas de cierre — asumido, alternativa, tiempo, compromiso menor.
- **Día 4:** Canales — WhatsApp templates, llamada (8-12 min ideal), email. Regla de 5 min en lead caliente.
- **Día 5:** Cadence de follow-up (día 0, 1, 3, 7, 14) y criterios para mover a nurture.

**Ejercicios prácticos:**
1. Cada agent graba pitch de 3 minutos y se revisa en grupo.
2. Cerrar 5 llamadas simuladas con evaluación de Diego.
3. Redactar 3 secuencias de WhatsApp (caliente, tibio, frío).
4. Manejar en roleplay las 15 objeciones top.

**Examen Semana 4:** Llamada grabada evaluada (pitch + 3 objeciones + intento de cierre) + examen escrito de objeciones.

---

## SEMANA 5 — Flujo operativo completo

**Instructor:** Diego + Pepe
**Objetivo:** cada agent ejecuta el flujo lead → FTD → retención básica sin supervisión.

**Lectura obligatoria:**
- [`sales/plan-contacto`](/content/sales/plan-contacto)
- [`operations/faq-interno`](/content/operations/faq-interno) — ops del broker desde la perspectiva de ventas
- [`compliance/onboarding`](/content/compliance/onboarding) — cómo acompañar el KYC

**Temas por día:**
- **Día 1:** Rutina diaria (8:00-17:00). KPIs diarios: 30+ contactos, 5+ conversaciones, 1+ KYC iniciado.
- **Día 2:** Acompañamiento KYC en vivo. Tips para fotos/docs que pasen a la primera. Coordinación con Susana.
- **Día 3:** Del KYC al FTD. Guiar primer depósito. Primer trade guiado.
- **Día 4:** Post-FTD: check-in 24h, 7 días, 30 días. Señales de abandono y reactivación.
- **Día 5:** KPIs individuales y de equipo. Reporte semanal. Cómo presentar números.

**Ejercicios prácticos:**
1. Simular flujo completo lead → contacto → KYC → FTD con un compañero haciendo de cliente.
2. Registrar cada interacción en Skale CRM (datos de prueba).
3. Redactar reporte semanal simulado con KPIs.
4. Identificar 5 señales de abandono en cuentas demo pre-cargadas.

**Examen Semana 5:** Ejecutar flujo completo en vivo (lead ficticio → contacto → KYC simulado → FTD).

---

## SEMANA 6 — Simulaciones finales y certificación

**Instructor:** Diego + Susana + Pepe
**Objetivo:** evaluación final — solo pasa quien demuestra dominio.

**Temas por día:**
- **Día 1-2:** 10 llamadas simuladas por agent con perfiles: principiante, experimentado, desconfiado, quiere depositar más de lo razonable, país restringido, pide consejo de inversión, KYC rechazado, frustrado con retiro, VIP potencial ($10K+), referido.
- **Día 3:** **Examen final escrito** (50 preguntas): Producto 15, MT5 10, Compliance 15, Ventas 10. Aprobación: 85% general, **95% en compliance**.
- **Día 4:** **Examen práctico final** — llamada grabada 15 min con evaluador externo.

| Criterio | Peso | Aprueba | Reprueba |
|----------|------|---------|----------|
| Compliance (nada prohibido) | 30% | 0 errores | 1+ errores |
| Conocimiento producto | 25% | Explica correctamente | Errores factuales |
| Manejo objeciones | 20% | Responde 4/5+ | Menos de 3/5 |
| Cierre | 15% | Intenta cerrar 2x+ | No intenta |
| Profesionalismo | 10% | Claro, seguro | Informal, inseguro |

- **Día 5:** Resultados. Quien no pasa: 1 semana de refuerzo. Quien pasa: certificación interna NEOMAAA + asignación de leads día 1 + kickoff.

---

## Materiales necesarios

| Material | Responsable | Cuándo |
|----------|-------------|--------|
| Cuenta demo MT5 por agent | Pepe | Antes de Semana 1 |
| Guía de producto (1-pager) | Diego | Semana 1 |
| Gold source `frases-prohibidas` impreso (laminado) | Susana | Semana 3 |
| Scripts llamada aprobados | Diego | Semana 4 |
| Templates WhatsApp aprobados | Diego + Susana | Semana 4 |
| Acceso CRM con datos prueba | Diego | Semana 5 |
| Base de leads día 1 | Diego/Marketing | Semana 6 |

---

> [!SUCCESS]
> Al completar las 6 semanas, cada agent domina producto, MT5, compliance, pitch, objeciones, flujo operativo completo y CRM. Solo los que pasen los exámenes con **85%+ (y 95%+ en compliance)** reciben la certificación interna NEOMAAA y empiezan a tomar leads el día 1 del go-live.

*Documento v2.0 — syllabus. Contenido técnico movido a docs gold source. Programa debe completarse ANTES del go-live del broker.*
