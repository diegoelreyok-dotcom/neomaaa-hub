# NEOMAAA Broker - Programa de Capacitacion Sales
## Transicion Propfirm a Broker | 6 Semanas

**Participantes:** Franco, Edward, Luis
**Responsables de modulos:** Pepe (producto), Susana (compliance), Diego (ventas/CRM)
**Formato:** 2 horas diarias (10am-12pm), lunes a viernes
**Evaluacion:** Examen escrito + simulacion de llamada al final de cada semana
**Ultima actualizacion:** 13 de abril 2026 (v1.1)

> [!INFO]
> La Semana 3 (Compliance) es un RESUMEN operativo para el equipo de ventas. La fuente de verdad completa es `compliance/manual-susana.md`. Esa es la autoridad para frases prohibidas/aprobadas, disclaimers, tiers, EDD, SAR timing y canal de escalamiento. Todo agent debe leer manual-susana antes del examen de Semana 3.

<div className="neo-stat-grid">
<div className="neo-stat" data-value="6" data-label="Semanas"></div>
<div className="neo-stat" data-value="30" data-label="Dias habiles"></div>
<div className="neo-stat" data-value="60h" data-label="Total capacitacion"></div>
<div className="neo-stat" data-value="85%+" data-label="Nota minima"></div>
</div>

---

## Por que esto es critico

> [!INFO]
> Vender broker NO es vender propfirm. Cambia el producto, cambia el cliente, cambia el riesgo regulatorio. Este programa existe para que el equipo haga la transicion mental completa antes del go-live.

Diferencias clave:

| Propfirm | Broker |
|----------|--------|
| El cliente paga por un "challenge" (fee unico) | El cliente deposita su propio dinero real |
| El riesgo es de la propfirm | El riesgo es del cliente |
| El pitch es "gana dinero sin arriesgar el tuyo" | El pitch es "opera en los mejores mercados con las mejores condiciones" |
| No hay regulacion estricta | Hay obligaciones regulatorias reales (KYC/AML) |
| La venta termina en el challenge | La venta es el inicio de una relacion a largo plazo |
| KPI: challenges vendidos | KPI: FTDs + retencion + depositos recurrentes |
| Objeciones: "es muy dificil pasar" | Objeciones: "no confio en brokers", "como se que no me roban" |

> [!WARNING]
> Si los agents salen a vender broker con mentalidad de propfirm, los 4 riesgos de abajo se materializan en las primeras 48 horas. Esto es lo que venimos a evitar.

**Si los agents salen a vender broker con mentalidad de propfirm, van a:**

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Promesas ilegales"><div>Prometer cosas que no pueden prometer (rendimientos, ganancias).</div></div>
<div className="neo-step" data-num="2" data-title="Falta de producto"><div>No saber explicar spreads, swap, margin call.</div></div>
<div className="neo-step" data-num="3" data-title="Riesgo regulatorio"><div>Ignorar compliance y meter a NEOMAAA en problemas regulatorios.</div></div>
<div className="neo-step" data-num="4" data-title="Perdida de clientes"><div>Perder clientes por no saber manejar objeciones de confianza.</div></div>
</div>

---

## SEMANA 1: Producto Broker - Los Fundamentales

**Instructor principal:** Pepe
**Objetivo:** Que cada agent entienda el producto que vende como si fuera trader

### DÍA 1 — Que es un broker y como gana dinero
*Lunes*
- Que es un broker forex/CFD y como funciona el modelo de negocio
- Diferencia entre broker y propfirm (modelo mental)
- Spreads: que son, como se cobran, por que varian
- NEOMAAA: 4 tipos de cuenta (Cent, Standard, Raw, Institutional)
- Ejercicio: calcular cuanto paga un cliente en spreads por 1 lote de EURUSD en cada tipo de cuenta

### DÍA 2 — Leverage, Margin y Risk
*Martes*
- Que es leverage y como funciona (1:100, 1:500, 1:1000)
- Margin, free margin, margin level - con ejemplos numericos
- Margin call y stop out - que pasa cuando el cliente pierde demasiado
- Negative balance protection - como protege al cliente
- Ejercicio: simular una operacion con $500 a 1:500 leverage, calcular margin requerido y punto de stop out

### DÍA 3 — Swaps, Comisiones y Costos
*Miercoles*
- Que es swap y por que se cobra (rollover overnight)
- Swap-free: como funciona en NEOMAAA (hasta 2 meses post-apertura)
- Comisiones por lote (Raw: $3/lot/side, Standard: incluido en spread)
- Costos ocultos que los clientes preguntan y como responder
- Ejercicio: cliente pregunta "cuanto me cuesta mantener una posicion de 1 lote EURUSD abierta 1 semana?" - calcular

### DÍA 4 — Instrumentos y Mercados
*Jueves*
- Overview de los 2,000+ instrumentos disponibles
- Forex: majors, minors, exotics - cuales son los mas populares en LATAM
- Indices: US30, NAS100, JPN225 - por que importan
- Metals: XAUUSD (oro), XAGUSD (plata) - favoritos en LATAM
- Crypto: BTCUSD - como se tradea en MT5
- Ejercicio: armar una "cartera recomendada" para un cliente LATAM tipico

### DÍA 5 — NEOMAAA vs La Competencia
*Viernes*
- Ventajas competitivas reales de NEOMAAA (spreads, leverage, metodos de pago LATAM)
- Comparacion honesta con 3 competidores principales en LATAM
- Que NUNCA decir sobre la competencia
- Que si se puede decir y como posicionar
- **EXAMEN SEMANA 1:** 30 preguntas escritas sobre producto (deben pasar con 80%+)

---

## SEMANA 2: MetaTrader 5 - Hands On

**Instructor principal:** Pepe
**Objetivo:** Que cada agent pueda navegar MT5, abrir/cerrar operaciones, y dar soporte basico de plataforma

### DÍA 1 — Setup e Interfaz
*Lunes*
- Descargar e instalar MT5 (desktop + mobile)
- Crear cuenta demo
- Navegacion: Market Watch, Chart, Navigator, Terminal, Toolbox
- Personalizar el workspace
- Ejercicio: cada agent configura MT5 con su layout preferido

### DÍA 2 — Operaciones Basicas
*Martes*
- Abrir una orden de mercado (buy/sell)
- Ordenes pendientes: buy limit, sell limit, buy stop, sell stop
- Modificar ordenes: mover SL/TP
- Cerrar posiciones parcial y totalmente
- Ejercicio: abrir 5 operaciones de distintos tipos, modificar, cerrar

### DÍA 3 — Charts y Herramientas
*Miercoles*
- Timeframes y como cambiarlos
- Indicadores basicos que los clientes usan (MA, RSI, MACD, Bollinger)
- Dibujar lineas de tendencia y niveles
- Templates y profiles
- Ejercicio: preparar un chart "presentable" para mostrar a un prospecto

### DÍA 4 — Account Management
*Jueves*
- Historial de operaciones: como leerlo
- Balance, equity, margin, free margin - donde verlo en MT5
- Statement: como generar y leer
- Depositos y retiros desde la perspectiva del trader
- Ejercicio: generar un statement de la cuenta demo y explicar cada linea

### DÍA 5 — Troubleshooting Comun
*Viernes*
- "No me deja abrir una operacion" - razones y soluciones
- "Mi operacion se cerro sola" - margin call/stop out
- "Los precios no se mueven" - mercado cerrado, conexion
- "Como cambio mi contrasena?"
- "Como instalo un EA?"
- **EXAMEN SEMANA 2:** Demo practica - abrir, gestionar y cerrar 10 operaciones con explicacion

---

## SEMANA 3: Compliance - Lo Que Pueden y NO Pueden Decir

**Instructor principal:** Susana
**Objetivo:** Cero riesgo regulatorio por parte del equipo de ventas

### DÍA 1 — Regulacion Basica
*Lunes*
- Identidad legal oficial: **Neomaaa Ltd, IBC 15968, Union of Comoros, licencia International Brokerage L15968/N otorgada por AOFA**. Sede en Hamchako, Mutsamudu, Autonomous Island of Anjouan.
- Base de operacion: **execution-only** (no asesoria, no gestion de portafolios). Neomaaa Ltd puede actuar como principal o counterparty.
- Productos oficiales: CFDs, Forex, Commodities, Indices, Metales, Energies, Cryptocurrencies.
- Paises restringidos - MEMORIZAR la lista: USA, Canada, EEA, UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan, sancionados internacionales.
- Por que compliance existe (proteger a NEOMAAA Y al cliente)
- Consecuencias reales de violar compliance: multas, perdida de licencia, demandas
- **Disclaimer oficial estadistico:** 70-80% de los clientes minoristas pierden dinero operando CFDs. Este dato es factual y debe aparecer en marketing y disclosures.

### DÍA 2 — FRASES PROHIBIDAS (memorizar)
*Martes*

> [!DANGER]
> NUNCA se puede decir lo de la columna izquierda. Cada frase prohibida tiene su alternativa legal a la derecha. Memorizarlas es requisito para pasar el examen.
| Prohibido | Por que | Alternativa correcta |
|-----------|---------|---------------------|
| "Te garantizo que vas a ganar dinero" | Promesa de rendimiento = ilegal | "Nuestros clientes tienen acceso a herramientas profesionales para operar los mercados" |
| "Con nosotros no vas a perder" | Falso y misleading | "Ofrecemos proteccion de balance negativo para limitar tu riesgo" |
| "Esto es mejor que un banco / inversion segura" | Comparacion enganosamasa | "El trading de CFDs es diferente a inversiones tradicionales - tiene riesgos y oportunidades distintas" |
| "Deposita mas para ganar mas" | Presion financiera | "El monto de deposito depende de tu situacion financiera y tolerancia al riesgo" |
| "Yo te digo cuando comprar y vender" | Asesoria de inversion sin licencia | "Tenemos herramientas de analisis y copy trading que pueden ayudarte a tomar decisiones" |
| "Pedi plata prestada para invertir" | Induccion a endeudamiento | "Solo opera con dinero que puedas permitirte perder" |
| "No te preocupes por el KYC, es solo un tramite" | Minimizar compliance | "El KYC protege tu cuenta y tus fondos - es un proceso de seguridad estandar" |
| Cualquier consejo fiscal | No somos asesores fiscales | "Te recomendamos consultar con un asesor fiscal en tu pais" |
| "Somos regulados por FCA / CySEC / ASIC" (o cualquier regulador que no tengamos) | AFIRMACION REGULATORIA FALSA -- solo tenemos Anjouan L15968/N | "Neomaaa Ltd, IBC 15968 registrada en Union of Comoros, licencia International Brokerage L15968/N otorgada por la Anjouan Offshore Finance Authority (AOFA)" |
| "Duplica tu dinero" / "Duplica tu cuenta en X dias" | Promesa explicita de rendimiento | "El trading es de alto riesgo. Resultados dependen de tu estrategia" |
| "[Competidor] es una estafa" / "Somos mejores que [broker X]" | Bashing directo prohibido -- riesgo legal | "Te invito a comparar condiciones punto por punto en vivo" |
| "Senales que nunca fallan" / "Sistema infalible" / "100% win rate" / "Rentabilidad asegurada" | Promesa de rendimiento disfrazada | "El rendimiento pasado no garantiza futuros. Copy trading tambien conlleva riesgo" |
| "Te puedo acelerar la verificacion" | Crea expectativa falsa -- compliance no se acelera | "La verificacion toma 24-48h estandar. Te aviso apenas Susana confirme" |
| "Apalancamiento ilimitado" / "Retiros instantaneos sin comision" / "Deposito minimo $0" | Ofertas falsas | Informar condiciones reales |

### DÍA 3 — Risk Disclaimers Obligatorios
*Miercoles*
- Cada conversacion comercial debe incluir al menos UNA vez: "El trading de CFDs conlleva un alto riesgo de perder dinero"
- Nunca minimizar el riesgo cuando el cliente lo pregunta
- Como responder a "que tan riesgoso es esto?" de forma honesta y comercial
- Disclaimers escritos que deben ir en emails, WhatsApp, materiales
- Practica: roleplay de 5 escenarios donde el cliente pide garantias

### DÍA 4 — KYC: El Rol del Sales Agent
*Jueves*
- Que es KYC y por que el sales agent tiene un rol en el proceso
- Flujo completo: cliente se registra > sube docs > Sumsub verifica > Susana aprueba/rechaza
- **Escenarios de Sumsub y como actuar:**

| Resultado Sumsub | Que pasa | Que hace Sales |
|-----------------|----------|---------------|
| GREEN (aprobado) | Cuenta activada automaticamente | Felicitar al cliente, guiar al primer deposito |
| YELLOW (retry) - Doc borroso | Sumsub pide re-subir | Contactar al cliente por WhatsApp: "Hola [nombre], necesitamos que vuelvas a subir tu [documento] porque la imagen no se ve clara. Aqui te dejo los tips para que salga bien a la primera..." |
| YELLOW (retry) - Domicilio no coincide | Sumsub pide otro doc | "Tu comprobante de domicilio necesita coincidir con la direccion que pusiste en el registro. Puede ser factura de servicios, estado de cuenta bancario, o carta oficial de los ultimos 3 meses" |
| RED (rechazado final) | Cuenta NO se activa | Escalar a Susana. NO prometer al cliente que se va a resolver. Decir: "Nuestro equipo de verificacion esta revisando tu caso, te contactaremos con una actualizacion" |
| PEP/Sanctions hit | Cuenta bloqueada | Escalar a Susana INMEDIATAMENTE. No dar ninguna explicacion al cliente. Solo: "Tu solicitud esta en revision por nuestro equipo de compliance" |

### DÍA 5 — Practica y Examen
*Viernes*
- Roleplay: 10 situaciones donde el cliente pide garantias o dice cosas que requieren respuesta de compliance
- **EXAMEN SEMANA 3:** Examen escrito de 25 preguntas + 3 roleplays evaluados por Susana
- **REQUISITO:** 90%+ para pasar. Fallar = repetir la semana.

---

## SEMANA 4: El Arte de Vender Broker

**Instructor principal:** Diego
**Objetivo:** Pitch, objeciones, y cierre especificos para broker

### DÍA 1 — El Pitch de NEOMAAA (estructura)
*Lunes*

**Estructura del pitch (max 3 minutos):**

1. **Hook** (15 seg): "Hola [nombre], te llamo de NEOMAAA. Somos un broker regulado que da acceso a mas de 2,000 instrumentos - forex, oro, indices, crypto - con las mejores condiciones para traders de LATAM."

2. **Dolor** (30 seg): "Muchos traders de la region operan con brokers que tienen spreads altos, retiros lentos, y soporte que no habla espanol. Eso te suena?"

3. **Solucion** (45 seg): "NEOMAAA fue creado para resolver exactamente eso. Tenemos spreads desde 0.0 pips, mas de 120 metodos de deposito incluyendo [PIX/Nequi/etc segun pais], retiros en horas, soporte 24/7 en espanol, y leverage hasta 1:1000."

4. **Prueba social** (30 seg): "Ya tenemos [X] traders operando con nosotros en [paises], y la razon por la que se quedan es [condicion especifica]."

5. **CTA** (30 seg): "Lo que te propongo es que abras una cuenta, que puede ser desde $5 con la cuenta Cent para probar, y veas por vos mismo. Te puedo guiar en el proceso ahora mismo si tenes 5 minutos."

### DÍA 2 — Objeciones de Broker (las 15 mas comunes)
*Martes*

| # | Objecion | Respuesta |
|---|----------|-----------|
| 1 | "No confio en brokers, todos son estafa" | "Entiendo la desconfianza. NEOMAAA esta regulado bajo licencia [L15968/N], tus fondos estan en cuentas segregadas en bancos tier-1, y podes verificar la licencia en el sitio del regulador. Ademas, todos nuestros retiros se procesan en [X tiempo]. La confianza se construye con hechos, no con promesas." |
| 2 | "Ya tengo broker, para que cambiaria?" | "No te pido que cierres tu otro broker. Muchos traders operan con 2 o 3. Proba abrir una cuenta Cent con $5 y compara las condiciones vos mismo. Si no te convence, no perdes nada." |
| 3 | "Los spreads dicen 0.0 pero despues son otros" | "En la cuenta Raw, los spreads reales son desde 0.0 con una comision fija de $3 por lote por lado. Es transparente - no hay spreads ocultos. Podes verlo en vivo en la demo antes de depositar un centavo." |
| 4 | "No tengo plata para invertir" | "Entiendo. Por eso tenemos la cuenta Cent desde $5. No es mucho, pero te permite operar en mercados reales y ver como funciona todo antes de escalar. Solo opera con lo que puedas permitirte perder." |
| 5 | "Como se que me van a pagar cuando retire?" | "Los retiros se procesan en [X tiempo]. Podes hacer un deposito chico, operar, y retirar para probarlo vos mismo antes de depositar mas. Esa es la mejor forma de verificar." |
| 6 | "No se nada de trading" | "Tenemos cuenta demo gratuita para que practiques sin riesgo, copy trading para seguir a traders experimentados, y soporte en espanol 24/7 para cualquier duda." |
| 7 | "Que pasa si pierdo todo?" | "El trading de CFDs tiene riesgo real de perder dinero - eso es importante que lo sepas. NEOMAAA ofrece proteccion de balance negativo, asi que nunca vas a deber mas de lo que depositaste. Y siempre recomendamos usar stop loss y operar con gestion de riesgo." |
| 8 | "Anjouan? Eso no es un regulador serio" | "La licencia AOFA nos permite operar legalmente y nos obliga a cumplir con KYC/AML, fondos segregados, y reportes regulatorios. Muchos brokers LATAM exitosos operan bajo licencias similares. Lo que importa es como nos comportamos: retiros rapidos, transparencia total, y soporte real." |
| 9 | "Cuanto voy a ganar?" | "No puedo decirte cuanto vas a ganar porque eso depende de tu estrategia, experiencia y gestion de riesgo. Lo que te puedo ofrecer son condiciones competitivas para operar: spreads bajos, ejecucion ECN/STP, y las herramientas que necesitas. Los resultados son responsabilidad tuya." |
| 10 | "Dejame pensarlo" | "Claro, tomate tu tiempo. Te dejo mi contacto directo. Mientras tanto, te puedo crear una cuenta demo para que vayas explorando la plataforma sin compromiso. Asi cuando estes listo, ya conoces todo." |
| 11 | "Vi reviews negativas de brokers similares" | "En la industria hay de todo. Te invito a que veas nuestra plataforma, hagas el deposito minimo, pruebes un retiro, y juzgues por vos mismo. Las acciones hablan mas que las reviews." |
| 12 | "El leverage es muy alto, es peligroso" | "Tenes razon en ser cauteloso con el leverage. En NEOMAAA podes elegir tu leverage - no es obligatorio usar 1:1000. Muchos traders experimentados usan 1:100 o menos. Te recomendamos empezar conservador." |
| 13 | "No quiero hacer KYC, es mucha info personal" | "El KYC es un proceso de seguridad estandar que protege tu cuenta. Es la misma verificacion que hace cualquier banco o fintech seria. Tus datos estan encriptados y nunca se comparten con terceros." |
| 14 | "Prefiero crypto, no forex" | "Tambien tenemos crypto - BTCUSD, ETHUSD y mas. Y con la cuenta broker podes operar crypto con leverage, algo que los exchanges no ofrecen. Ademas, podes diversificar entre crypto, forex, oro e indices desde la misma cuenta." |
| 15 | "Voy a hablar con [amigo/familiar]" | "Me parece bien. Si queres, te mando un resumen por WhatsApp con los puntos clave para que lo compartas. Y si tu [amigo/familiar] tambien se interesa, tenemos programas para traders que refieren." |

### DÍA 3 — Tecnicas de Cierre
*Miercoles*
- El cierre asumido: "Te creo la cuenta ahora y te mando el link por WhatsApp?"
- El cierre por alternativa: "Preferis empezar con la cuenta Cent o la Standard?"
- El cierre por tiempo: "Hoy tenemos spreads especiales para cuentas nuevas"
- El cierre por compromiso menor: "Empezamos con la demo y despues vemos?"
- Practica: cada agent cierra 5 llamadas simuladas

### DÍA 4 — Canales de Comunicacion
*Jueves*
- WhatsApp: templates aprobados, frecuencia, horarios
- Llamada telefonica: estructura, duracion ideal (8-12 min)
- Email: templates para follow-up, onboarding, reactivacion
- **REGLA:** Todo primer contacto debe ser por el canal que el lead prefiera
- **REGLA:** Maximo 3 intentos de contacto antes de mover a "cold"
- **REGLA:** Responder a un lead caliente en menos de 5 minutos

### DÍA 5 — CRM y Follow-Up
*Viernes*
- Como registrar cada interaccion en Skale CRM
- Pipeline stages: New Lead > Contacted > Qualified > KYC Started > KYC Approved > FTD > Active
- Follow-up cadence:
  - Dia 0: primer contacto (< 5 min si es lead caliente)
  - Dia 1: follow-up si no contesto
  - Dia 3: segundo follow-up con valor agregado (articulo, chart, tip)
  - Dia 7: ultimo intento + oferta de demo
  - Dia 14: mover a nurture sequence
- **EXAMEN SEMANA 4:** Evaluacion de pitch (llamada grabada) + examen escrito de objeciones

---

## SEMANA 5: Flujo Operativo Completo

**Instructor principal:** Diego + Pepe
**Objetivo:** Que cada agent ejecute el flujo completo sin supervision

### DÍA 1 — El Dia a Dia del Sales Agent
*Lunes*
- Rutina diaria:
  - 8:00-8:30 - Revisar CRM: leads nuevos, follow-ups pendientes, KYCs en proceso
  - 8:30-12:00 - Bloque de contactos (minimo 15 contactos)
  - 12:00-13:00 - Almuerzo
  - 13:00-16:30 - Bloque de contactos (minimo 15 contactos)
  - 16:30-17:00 - Actualizar CRM, reportar dia a Diego
- KPIs diarios: 30+ contactos, 5+ conversaciones significativas, 1+ KYC iniciado

### DÍA 2 — Acompanamiento de KYC en Vivo
*Martes*
- Cuando un prospecto dice "si, quiero abrir cuenta" - que pasa paso a paso
- Guiar al cliente por WhatsApp/llamada durante el registro
- Tips para que el KYC salga bien a la primera (fotos claras, docs correctos)
- Que hacer cuando Sumsub pide retry
- Coordinacion con Susana en tiempo real

### DÍA 3 — Del KYC al FTD
*Miercoles*
- KYC aprobado: llamar al cliente en los siguientes 30 minutos
- Guiar el primer deposito: "Cual metodo de pago preferis?"
- Ayudar a navegar el client portal para depositar
- Primer trade: ofrecer guiar al cliente en su primera operacion
- Ejercicio: simular el flujo completo con un companero haciendo de cliente

### DÍA 4 — Post-FTD y Retencion Basica
*Jueves*
- El FTD no es el final, es el INICIO
- Contactar al cliente 24h despues del FTD: "Como te fue? Necesitas ayuda con algo?"
- Contactar a los 7 dias: "Vi que [abriste/no abriste] operaciones. Puedo ayudarte con...?"
- Contactar a los 30 dias: check-in de relacion
- Identificar senales de abandono: sin login en 7+ dias, sin operaciones, retiro total

### DÍA 5 — KPIs y Reportes
*Viernes*
- KPIs individuales: contactos/dia, KYCs iniciados, KYCs aprobados, FTDs, $ depositado
- KPIs del equipo: FTDs totales, conversion rate lead>FTD, deposito promedio
- Como leer el reporte semanal
- Reunion semanal de equipo: cada agent presenta sus numeros + 1 aprendizaje
- **EXAMEN SEMANA 5:** Ejecutar flujo completo en vivo (lead ficticio > contacto > KYC > FTD simulado)

---

## SEMANA 6: Simulaciones Finales y Certificacion

**Instructor principal:** Diego + Susana + Pepe
**Objetivo:** Evaluacion final - solo pasa quien demuestra dominio

### DÍA 1-2 — Simulaciones Intensivas
*Lunes-Martes*
- Cada agent hace 10 llamadas simuladas con distintos perfiles de cliente:
  - Cliente principiante que nunca opero
  - Trader experimentado que compara brokers
  - Cliente desconfiado que piensa que es estafa
  - Cliente que quiere depositar mas de lo recomendable
  - Cliente de pais restringido (debe rechazarlo correctamente)
  - Cliente que pide consejos de inversion (debe redirigir)
  - Cliente con KYC rechazado
  - Cliente que quiere retirar y esta frustrado
  - Cliente VIP potencial ($10K+ deposito)
  - Cliente que viene referido por un amigo

### DÍA 3 — Examen Final Escrito
*Miercoles*
- 50 preguntas que cubren:
  - Producto (15 preguntas)
  - MT5 (10 preguntas)
  - Compliance (15 preguntas) - tolerancia 0 a errores en esta seccion
  - Ventas y objeciones (10 preguntas)
- **Aprobacion: 85% general, 95% en la seccion de compliance**

### DÍA 4 — Examen Practico Final
*Jueves*
- Llamada grabada de 15 minutos con evaluador externo (alguien que no sea del equipo)
- Se evalua: presentacion, manejo de objeciones, compliance, cierre, uso de CRM
- Scoring:

| Criterio | Peso | Aprueba | Reprueba |
|----------|------|---------|----------|
| Compliance (nada prohibido) | 30% | 0 errores | 1+ errores |
| Conocimiento de producto | 25% | Explica correctamente | Errores factuales |
| Manejo de objeciones | 20% | Responde 4/5+ | Menos de 3/5 |
| Tecnica de cierre | 15% | Intenta cerrar al menos 2x | No intenta cerrar |
| Profesionalismo general | 10% | Cortes, claro, seguro | Informal, inseguro |

### DÍA 5 — Certificacion + Kickoff
*Viernes*
- Resultados de examenes
- Quien no pasa: 1 semana extra de refuerzo en las areas debiles
- Quien pasa: recibe su "certificacion interna NEOMAAA"
- Asignacion de leads dia 1
- Kickoff meeting del equipo de ventas: objetivos mes 1, expectativas, estructura de reporte

---

## Materiales Necesarios

| Material | Responsable | Cuando |
|----------|-------------|--------|
| Cuenta demo MT5 para cada agent | Pepe | Antes de Semana 1 |
| Guia de producto NEOMAAA (1 pager) | Diego | Semana 1 |
| Lista de frases prohibidas (laminated) | Susana | Semana 3 |
| Scripts de llamada aprobados | Diego | Semana 4 |
| Templates de WhatsApp aprobados | Diego + Susana | Semana 4 |
| Acceso a CRM con datos de prueba | Diego | Semana 5 |
| Base de leads dia 1 | Diego/Marketing | Semana 6 |

---

> [!SUCCESS]
> Al completar las 6 semanas, cada agent debe dominar producto, MT5, compliance, pitch, objeciones, flujo operativo completo y CRM. Solo los que pasen los examenes con 85%+ (y 95%+ en compliance) reciben la certificacion interna NEOMAAA y empiezan a tomar leads el dia 1 del go-live.

*Documento generado: 2026-04-08*
*Este programa debe completarse ANTES del go-live del broker.*
