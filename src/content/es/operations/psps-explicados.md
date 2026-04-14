# PSPs — Payment Service Providers explicados

**Version:** 1.0
**Fecha:** Abril 2026
**Audiencia:** Finance Manager, Soporte, Ventas, Compliance
**Proposito:** Referencia maestra sobre como funciona el dinero entre el cliente y la cuenta MT5

---

## Tabla de Contenidos

1. [Que es un PSP](#1-que-es-un-psp)
2. [Anatomia de un deposito](#2-anatomia-de-un-deposito)
3. [Tipos de PSPs](#3-tipos-de-psps)
4. [Economia del PSP](#4-economia-del-psp)
5. [Chargebacks y fraude](#5-chargebacks-y-fraude)
6. [KYC del PSP](#6-kyc-del-psp)
7. [Por que rotar PSPs](#7-por-que-rotar-psps)
8. [NEOMAAA stack actual](#8-neomaaa-stack-actual)
9. [Que debe saber cada rol](#9-que-debe-saber-cada-rol)
10. [FAQ cliente final](#10-faq-cliente-final)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Que es un PSP

Un **Payment Service Provider (PSP)** es una empresa intermediaria que conecta al broker (NEOMAAA) con las redes de pago globales: bancos, redes de tarjetas (Visa/Mastercard), wallets digitales, blockchains y sistemas locales (PIX, SPEI, SEPA).

Sin un PSP, NEOMAAA tendria que integrarse **directamente** con cada banco, cada red de tarjeta, cada sistema local — algo imposible operativamente. El PSP resuelve esa complejidad: una integracion con el PSP y obtenes acceso a cientos de metodos de pago.

### Diferencia entre conceptos clave

Mucha gente confunde estos terminos. Es importante entenderlos:

| Concepto | Que es | Ejemplo |
|---|---|---|
| **PSP (Payment Service Provider)** | Empresa que orquesta el proceso completo de pago, incluyendo antifraude, settlement y reporting | Checkout.com, Stripe, Praxis |
| **Pasarela de pago (Gateway)** | Capa tecnica que transmite los datos de la transaccion al procesador. Es una pieza del PSP, no el PSP completo | Authorize.net, 2Checkout |
| **Acquirer (Banco adquirente)** | Banco que procesa los pagos en nombre del broker y recibe los fondos del emisor. Quien realmente "toma" la plata | Barclays, Worldpay, Elavon |
| **Issuer (Banco emisor)** | Banco que emitio la tarjeta del cliente (BBVA, Santander, Nubank, etc.) | Banco del cliente final |

> [!INFO]
> En la practica, el broker habla con el PSP, el PSP habla con el acquirer, el acquirer habla con el issuer, y el issuer habla con el cliente. Cuatro capas, cada una con su costo y su tiempo de settlement.

### Por que un broker necesita multiples PSPs

Un broker **nunca** opera con un solo PSP. Razones:

1. **Redundancia operativa.** Si un PSP se cae, se corta la cuenta del broker, o cambia terminos unilateralmente, el negocio no puede detenerse. Hay que tener alternativas activas.
2. **Cobertura geografica.** Ningun PSP cubre bien todos los paises. PagSmile domina Brasil, DLocal domina Mexico, Praxis domina Europa/card. Usas el mejor para cada region.
3. **Mix de costos.** Diferentes metodos tienen diferentes margenes. Cripto es barato pero no llega a todo el mundo. Card es caro pero convierte mas. Balanceas.
4. **Routing inteligente.** Podes mandar tarjetas europeas por un PSP y latinoamericanas por otro, optimizando approval rate y costo.
5. **Presion comercial.** Con 3+ PSPs activos tenes leverage para negociar mejores rates.

---

## 2. Anatomia de un deposito

Seguimos el flujo completo desde que el cliente hace click en "Depositar" hasta que ve el dinero en su cuenta MT5.

<div className="neo-timeline">

1. **Cliente inicia pago** en el Client Portal de NEOMAAA. Selecciona monto, moneda y metodo (card, cripto, PIX, etc.).
2. **Portal redirige al PSP.** Se carga el iframe o checkout hosted del PSP. El cliente ingresa los datos sensibles (numero de tarjeta, CVV) en el **dominio del PSP**, no en el nuestro — por eso NEOMAAA no almacena datos de tarjeta (PCI-DSS scope reducido).
3. **PSP corre fraud check.** Velocidad de la transaccion, IP geolocation, device fingerprint, blacklists, historial del cliente. Puede tardar milisegundos o solicitar verificacion adicional.
4. **3DS Challenge (si aplica).** Para tarjetas europeas y varios paises LATAM, el issuer puede pedir 3D Secure: OTP por SMS, app del banco, push notification. El cliente aprueba.
5. **PSP solicita autorizacion al acquirer.** El acquirer pregunta al issuer: "tiene fondos? es valida la tarjeta?". Respuesta: approve o decline.
6. **Fondos salen del cliente.** Se bloquea el monto en la cuenta del cliente (hold) o se debita directo (dependiendo del metodo).
7. **PSP envia webhook a Skale CRM.** Notificacion en tiempo real: `payment.success` con transaction ID, monto, metodo, cliente.
8. **Broker acredita en MT5.** Skale dispara API call a MT5 para incrementar balance de la cuenta. Tiempo: segundos.
9. **Cliente ve fondos disponibles.** Puede empezar a operar.
10. **Settlement diferido.** Horas o dias despues, el PSP le transfiere a NEOMAAA el dinero real (neto de fees) a la cuenta bancaria corporativa. Este es el momento donde el broker "cobra" de verdad.

</div>

### Timeline real por metodo

No todos los depositos tardan lo mismo, y no todos se settlean igual. Distinguir entre **acreditacion al cliente** (lo que el cliente ve) y **settlement al broker** (cuando entran los fondos a la caja) es critico.

| Metodo | Acreditacion al cliente | Settlement al broker |
|---|---|---|
| Tarjeta Visa/Mastercard | 1–5 min | T+1 a T+3 (card networks) |
| SEPA (EUR) | 1–3 dias habiles | Mismo dia que llega |
| Wire SWIFT (USD) | 1–5 dias habiles | Mismo dia que llega |
| Cripto (USDT TRC-20) | 10–30 min (3 confirmaciones) | T+0 (instant una vez confirmado) |
| PIX (Brasil) | Instantaneo (1–5 min) | T+0 a T+1 |
| SPEI (Mexico) | 5–30 min | T+0 |
| OXXO (cash) | 1–24 horas | T+1 a T+2 |
| Skrill / Neteller | Instantaneo | T+1 a T+3 |

> [!WARNING]
> El broker asume el **riesgo de settlement**: si acreditamos al cliente en segundos pero el PSP nos paga en T+3, en esos 3 dias esos fondos son un pasivo del broker. Por eso el cashflow del broker depende mucho del mix de PSPs.

---

## 3. Tipos de PSPs

<div className="neo-compare">
<div className="neo-compare-col neo-compare-col--pro"><div className="neo-compare-title">Tarjeta + e-Wallet</div><ul><li>Alta conversion (70-80%)</li><li>Friccion cero, familiar</li><li>Fees altos (2.5%-4.5%)</li><li>Chargeback risk alto</li></ul></div>
<div className="neo-compare-col neo-compare-col--con"><div className="neo-compare-title">Cripto (USDT)</div><ul><li>Fees bajos (0.5%-1%)</li><li>Zero chargeback</li><li>Settlement T+0</li><li>Conversion baja (~35%)</li></ul></div>
</div>

<div className="neo-compare">
<div className="neo-compare-col neo-compare-col--pro"><div className="neo-compare-title">Bank wire (SEPA/SWIFT)</div><ul><li>Fees bajos (0.5%-1.5%)</li><li>Zero chargeback</li><li>Settlement 1-5 dias</li><li>Conversion media (~40%)</li></ul></div>
<div className="neo-compare-col neo-compare-col--con"><div className="neo-compare-title">PSPs LATAM (PIX/SPEI)</div><ul><li>Conversion local 70%+</li><li>Fees medios (2%-5%)</li><li>Settlement T+0 a T+1</li><li>Critico para BMP Brasil</li></ul></div>
</div>

### 3.1 Tarjetas (Visa, Mastercard, Amex)

El metodo mas usado globalmente. Tambien el mas caro para el broker y el mas riesgoso.

**PSPs tipicos:**
- Stripe (solo acepta brokers low-risk, hoy no opera con la mayoria de brokers forex)
- Checkout.com
- Praxis Cashier (specializado en forex/trading)
- Skrill Connect
- Worldpay, Nuvei, Paysafe

**Rates tipicos de mercado:**
- MDR (Merchant Discount Rate): 2.5% – 4.5%
- Fixed fee: $0.20 – $0.40 por transaccion
- Rolling reserve: 5% – 10% retenido por 6 meses
- Chargeback fee: $15 – $40 por disputa

**Chargeback risk:** alto. Brokers son "high-risk merchants" para las redes de tarjeta.

### 3.2 Bank transfers (Wire, SEPA, ACH)

Transferencias bancarias directas. Lento pero barato y bajo riesgo.

**PSPs/integradores tipicos:**
- Banking partner directo (cuenta corporativa del broker)
- Match-Trade
- iSignthis
- Volt, TrueLayer (open banking)

**Rates tipicos de mercado:**
- SEPA: 0.5% – 1.5% + fee fijo EUR 1–3
- SWIFT: 0.3% – 1% + fee fijo $10–30 (correspondent bank fees)
- ACH (USA): 0.5% – 1% + $0.25–1

**Chargeback risk:** muy bajo. Una vez liquidado, no se puede revertir facilmente.

### 3.3 e-Wallets

Billeteras digitales. Rapidas, populares entre traders experimentados.

**PSPs:**
- Skrill (muy usado en forex)
- Neteller (misma matriz que Skrill: Paysafe Group)
- PayPal (casi nunca opera con brokers forex por restricciones)
- Apple Pay, Google Pay (capa sobre tarjeta)

**Rates tipicos:** 2% – 3.5% + fixed fee

**Ventaja:** alta conversion, el cliente ya tiene la wallet cargada.
**Desventaja:** fees altos, y si el broker tiene problemas con la wallet, corta a todos los clientes al mismo tiempo.

### 3.4 Cripto

El metodo mas barato y el de menor riesgo de chargeback (no existe el chargeback en blockchain).

**PSPs tipicos:**
- B2BinPay (el estandar en brokers forex)
- CoinsPaid
- Crystal Blockchain
- NOWPayments
- BitPay

**Rates tipicos:** 0.5% – 1% flat

**Ventajas:**
- Zero chargeback
- Settlement rapido (T+0 una vez confirmado on-chain)
- Permite operar con clientes de paises con banking restringido
- Bajo costo

**Desventajas:**
- Volatilidad si no se convierte a stablecoin inmediatamente
- Riesgo regulatorio (AML mas exigente, requiere screening de wallet de origen)
- No apto para clientes no tech-savvy

### 3.5 PSPs LATAM locales

Criticos para conversion en Latam. Un broker que intente operar en Brasil solo con Visa internacional convierte 20%. Con PIX convierte 70%+.

| PSP | Pais / Metodos | Rates tipicos |
|---|---|---|
| **PagSmile** | Brasil (PIX, Boleto), Mexico (SPEI, OXXO), Chile, Peru, Colombia | 2% – 5% |
| **Astropay** | Toda LATAM, foco en tarjetas virtuales y PSP propio | 3% – 5% |
| **DLocal** | LATAM + Africa + Asia (Mercado Pago, OXXO, Baloto, etc.) | 2.5% – 5% |
| **PayU** | LATAM + India + Europa del Este | 3% – 5% |
| **EBANX** | Brasil, Mexico, Colombia, Chile, Argentina | 3% – 5% |

> [!TIP]
> Para NEOMAAA, tener al menos **un PSP fuerte en Brasil con PIX y Boleto** es no-negociable dado el objetivo estrategico de BMP (Brazil Market Penetration).

### 3.6 APMs (Alternative Payment Methods) Europa

Metodos locales europeos, no card, no wire. Muy usados en sus mercados de origen.

| Metodo | Pais | Como funciona |
|---|---|---|
| **iDeal** | Holanda | Redirige al banco online del cliente, aprueba, debita. 60% del e-commerce NL |
| **Sofort / Klarna** | Alemania, Austria | Login en banco online via Klarna, debito instantaneo |
| **Bancontact** | Belgica | Estandar local de pago online |
| **Multibanco** | Portugal | Genera referencia, cliente paga en ATM o home banking |
| **Przelewy24** | Polonia | Agregador de bancos locales |
| **Giropay** | Alemania | Similar a Sofort |

**Rates:** 1% – 2.5%. Settlement: T+1 a T+2.

---

## 4. Economia del PSP

Entender cuanto cuesta REALMENTE procesar un pago es lo que separa un broker que gana plata de uno que se funde por fees invisibles.

### Componentes del costo

1. **MDR (Merchant Discount Rate).** El porcentaje sobre el volumen. Es el fee mas visible.
2. **Fixed fee.** Costo fijo por transaccion, tipicamente $0.20 – $0.40. Mata al broker si el ticket promedio es bajo.
3. **Monthly fee.** Costo mensual fijo del PSP, $100 – $2,000.
4. **Setup fee.** One-time al integrar, $500 – $10,000.
5. **Rolling reserve.** % de cada pago retenido por el PSP durante 3–6 meses para cubrir posibles chargebacks.
6. **Chargeback fee.** Cobrado CADA vez que hay una disputa, gane o pierda el broker. $15 – $40.
7. **Refund fee.** A veces hay costo por procesar refund.
8. **FX markup.** Si el cliente paga en EUR y el broker quiere USD, el PSP toma 0.5% – 2% de markup en el tipo de cambio.

### Ejemplos de costo total por $100 USD de volumen

<div className="neo-stat-grid">

**Visa Europa** — 3.5% MDR + $0.30 fixed = **~$3.80**. Mas rolling reserve de $10 retenidos 6 meses.

**Cripto USDT (B2BinPay)** — 0.5% flat = **$0.50**. Sin rolling reserve, settlement T+0.

**Wire SEPA** — 1% + $1 fee = **~$2.00**. Zero chargeback risk.

**PIX Brasil (PagSmile)** — 1.5% – 2.5% MDR = **~$2.00**. Settlement T+0, bajo chargeback.

**Skrill e-wallet** — 2.5% MDR + $0.30 = **~$2.80**. Instant, pero fees altos para el broker.

**OXXO Mexico** — 3% – 4% = **~$3.50**. Cash deposit, T+1 settlement.

</div>

### El tradeoff conversion vs costo

Este es el dilema central del payments strategy:

| Metodo | Costo para broker | Conversion estimada |
|---|---|---|
| Card | Alto (3.5%) | ~80% (cliente ya tiene tarjeta en mano) |
| e-Wallet | Medio-alto (2.5-3%) | ~70% (requiere tener wallet) |
| Cripto | Bajo (0.5%) | ~35% (solo clientes tech-savvy) |
| Wire | Muy bajo (1%) | ~40% (requiere ir al banco, demora) |
| PIX / SPEI / local | Medio (2%) | ~85% en su pais de origen |

> [!EXAMPLE]
> Un deposito de $1,000 por card le cuesta al broker $35. El mismo deposito por cripto cuesta $5. Pero si ofreciera SOLO cripto, de cada 100 clientes solo 35 completarian el deposito. Los otros 65 se van a la competencia. Por eso ofrecemos ambos — optimizas el mix.

### Por que el cliente prefiere card aunque le cobran mas

- Friccion cero: ya tiene la tarjeta.
- Confianza en la marca (Visa/Mastercard).
- Puede hacer chargeback si algo sale mal.
- No tiene que aprender cripto ni esperar un wire.

Al broker le cuesta mas, pero el cliente convierte mas facil. El payments manager optimiza: **costo medio ponderado por conversion** es la metrica real.

---

## 5. Chargebacks y fraude

### Que es un chargeback

Un chargeback es cuando un cliente disputa una transaccion con su banco emisor (issuer), pidiendo que le devuelvan el dinero. El banco emisor abre una investigacion, y si falla a favor del cliente, el dinero se reversa — el broker lo pierde ademas del producto/servicio ya entregado.

**Razones comunes de chargeback en brokers forex:**
1. "No reconozco esta transaccion" (verdadero fraude o friendly fraud)
2. "El servicio no fue entregado" (cliente perdio plata operando y quiere reversar)
3. "No autorice el pago" (fraude verdadero o cliente mintiendo)
4. "Cobraron mas de lo acordado"
5. Cuenta hackeada por un tercero

### Por que los PSPs les temen

Cuando llega un chargeback, el PSP:
- Tiene que devolver los fondos al issuer
- Paga un chargeback fee al network ($15–40)
- Acumula el chargeback en el ratio del merchant
- Si el ratio pasa el threshold, el acquirer pone al broker en "monitoring program" (Visa VDMP, Mastercard Excessive Chargeback Program) con fees punitivos
- Eventualmente el acquirer corta la cuenta

### Ratios aceptables

| Ratio chargeback | Status |
|---|---|
| < 0.5% | Healthy, negocio normal |
| 0.5% – 1% | Aceptable, atencion |
| 1% – 1.5% | Alarma, el PSP empieza a pedir plan de mitigacion |
| > 1.5% | VDMP / Excessive Chargeback. Fees penales |
| > 2% | Cierre de cuenta inminente |

> [!WARNING]
> Los brokers de forex/CFD se consideran **high-risk** universalmente. El chargeback rate aceptable es mas bajo que en e-commerce normal (~0.9% vs 1.5%). Hay que ser agresivo en prevencion.

### Rolling reserve: que es y por que existe

El PSP retiene 5–10% de cada deposito durante 6 meses antes de liquidarselo al broker. Esa plata sirve para cubrir chargebacks que podrian llegar despues. Es un "colchon" forzado.

**Ejemplo:** volumen mensual $500K con 7% rolling reserve = $35K/mes retenidos, liberados 6 meses despues. El broker nunca ve esa plata circulante hasta medio ano despues.

Si pasan 6 meses sin chargebacks, la plata se libera. Si llega un chargeback, se debita del reserve primero.

> [!INFO]
> Un broker con crecimiento rapido tiene una porcion cada vez mayor de su revenue "encerrada" en rolling reserves. Es un constraint de cashflow real.

### Defensa contra chargebacks

Herramientas de la industria:

- **Verifi (Visa):** pre-dispute resolution. El broker puede reembolsar antes de que se convierta en chargeback.
- **Ethoca (Mastercard):** alertas pre-chargeback. Avisa antes que el cliente dispute.
- **3DS (3D Secure):** authentication extra. Si el cliente autentico con 3DS, el liability shift pasa al issuer — el broker casi siempre gana el chargeback.
- **Evidencia robusta:** IP logs, device fingerprint, historial del cliente, emails, chats, KYC completo, acknowledgment de riesgos firmado.
- **Pre-chargeback communication:** cuando el cliente se queja, escalar rapido antes que vaya al banco.

### Friendly fraud

Este es el chargeback mas frustrante: el cliente uso su propia tarjeta, deposito, opero, perdio, y luego disputa alegando "no autorice esto". No es fraude real — es fraude del propio cliente. Es el 40–60% de los chargebacks en brokers forex.

**Mitigacion:**
- 3DS obligatorio (liability shift)
- Terms & Conditions firmados con acknowledgment de riesgo
- Screenshots del cliente operando
- KYC verificado que demuestre que SI es el titular
- Comunicacion grabada que prueba el intent

---

## 6. KYC del PSP

Cada PSP corre su propio KYC/AML independiente del KYC del broker. Esto confunde mucho a soporte y a clientes.

### Por que el PSP hace su propio KYC

Regulatoriamente, el PSP es responsable ante su acquirer, ante las redes, ante su propio regulador. No puede confiar ciegamente en el KYC del broker. Asi que hace capas adicionales:

- Screening del cliente contra listas de sanciones (OFAC, UN, EU)
- Device fingerprint y fraud scoring
- En algunos casos, verificacion adicional de tarjeta (nombre del titular = KYC del broker)
- Si el monto es alto, puede pedir documentacion extra al broker o al cliente

### Depositos rechazados con "KYC issue"

A veces pasa: el cliente tiene KYC aprobado en NEOMAAA (Sumsub), pero al intentar un deposito, el PSP rechaza. Razones:

1. **Nombre no coincide.** La tarjeta esta a nombre diferente al KYC. Prohibido (3rd party payment).
2. **Pais de la tarjeta no coincide con pais del KYC.** IP en un pais, tarjeta de otro, KYC de otro — sospechoso.
3. **El PSP tiene al cliente en blacklist interna.** Por chargeback previo en otro merchant.
4. **Monto supera threshold sin documentacion extra.** Ej: primer deposito de $10K triggerea enhanced due diligence.
5. **Velocity.** El cliente intento 5 veces en 10 minutos — flag de fraude.

### Cooperacion PSP ↔ broker

Cuando hay una investigacion de AML, el PSP y el broker comparten data:
- Transaction history
- KYC documents (under strict sharing agreements)
- Communication logs
- Source of funds si aplica

> [!INFO]
> Compliance officer debe tener contacto directo con el AML team de cada PSP. Cuando hay un issue serio, no se resuelve por email con soporte — se resuelve escalando al equipo AML.

---

## 7. Por que rotar PSPs

### No poner todos los huevos en una cesta

Si el 100% del volumen va por un solo PSP y ese PSP corta la cuenta por cualquier razon (chargebacks, cambio de apetito de riesgo, fusion con otra empresa), el broker se queda sin procesar pagos. Es un riesgo existencial.

### Casos reales

- **Stripe corto a muchos brokers forex en 2020** unilateralmente. Los que tenian solo Stripe se quedaron semanas sin procesar.
- **PayPal nunca soporto brokers forex** — ni siquiera es opcion.
- **Acquirers bancarios cambian apetito de riesgo** cada 2–3 anos.

### Routing inteligente

No es solo tener multiples PSPs — es usarlos inteligentemente:

<div className="neo-compare">

**Por geografia**
- Brasil → PagSmile PIX/Boleto
- Mexico → PagSmile o DLocal SPEI/OXXO
- Europa → Checkout.com card / SEPA
- Asia → B2BinPay cripto
- USA → ACH o cripto (forex no puede operar retail en USA regulado)

**Por tipo de cliente**
- Cliente chico (<$500) → card (friccion baja)
- Cliente mediano ($500-$5K) → card o wallet
- Cliente grande (>$5K) → wire o cripto (ahorrar fees)
- Cliente VIP → tratamiento dedicado, wire priority

**Por approval rate**
- Si un PSP empieza a rechazar mas del 20% en un pais, routear a otro
- A/B testing continuo

</div>

---

## 8. NEOMAAA stack actual

NEOMAAA esta en pre-lanzamiento. El stack objetivo para go-live es un minimo de **3 PSPs activos en produccion** (card + LATAM local + cripto), mas el wire bancario directo.

| Categoria | PSP planeado | Estado |
|---|---|---|
| Card (Visa/Mastercard) | [DATO: PSP card a confirmar con Diego/Angel — candidatos: Praxis Cashier, Checkout.com] | [DATO: pendiente] |
| LATAM local (Brasil PIX/Boleto + Mexico SPEI/OXXO) | [DATO: PSP LATAM a confirmar — candidatos: PagSmile, EBANX, DLocal] | [DATO: pendiente] |
| Cripto (USDT/BTC) | [DATO: PSP crypto a confirmar — candidatos: B2BinPay, CoinsPaid] | [DATO: pendiente] |
| Wire bancario | [DATO: banking partner a confirmar] | [DATO: pendiente] |

> **Regla de consistencia:** Hasta que los PSPs esten confirmados, cualquier referencia a PSP especifico en documentos internos debe usar el formato `[DATO: PSP <categoria> — pendiente confirmacion]`. No inventar PSPs. No asumir que Stripe, PayPal o similares son opciones (no operan con brokers forex).

**Futuro (post go-live):**
- Skrill/Neteller (e-wallets — alta demanda en forex)
- APMs Europa (iDeal, Sofort, Bancontact) para expansion a Holanda/Alemania/Belgica
- Segundo PSP card para redundancia
- Astropay o similar para tarjetas virtuales LATAM

> [!WARNING]
> Hasta tener Finance Manager contratado, el setup y negociacion con PSPs debe coordinarlo Angel. Los contratos con PSPs tienen clausulas de rolling reserve, MDR, chargeback y cancelacion que afectan el cashflow del broker durante anos.

---

## 9. Que debe saber cada rol

| Rol | Que debe saber sobre PSPs |
|---|---|
| **Ventas** | Que metodos hay disponibles por pais, tiempos esperados de acreditacion, que decir cuando el cliente pregunta por fees. NO prometer tiempos exactos sin conocer el metodo. |
| **Soporte** | Por que un deposito puede fallar (KYC del PSP, nombre no coincide, 3DS, limite, fraud check). Como escalar a Finance. Que info pedir al cliente (transaction ID, screenshot, metodo, hora exacta). |
| **Compliance (Susana)** | KYC conjunto con el PSP, source of funds, AML cooperation, screening de wallets cripto, red flags de 3rd party payment. |
| **Finance Manager** | Reconciliacion diaria (PSP vs Skale vs MT5 vs banco), gestion de chargebacks, calculo de costos totales por metodo, cashflow projection con rolling reserves, negociacion de rates con PSPs. |
| **Dealing (Pepe)** | No aplica directamente — dealing se encarga del ejecucion en MT5, no de money in/out. Pero debe saber si hay freeze de depositos o retiros por compliance para no generar problemas de margen a clientes. |

---

## 10. FAQ cliente final

Respuestas modelo para las 10 preguntas mas frecuentes. Copy-paste friendly para soporte.

**1. Cuanto tarda mi deposito?**
"Depende del metodo. Card y PIX son instantaneos (1–5 min). SEPA tarda 1–3 dias. Cripto 10–30 min tras confirmaciones. Si pasaron los tiempos y no ves acreditacion, mandanos el comprobante."

**2. Por que me cobraron una comision inesperada?**
"NEOMAAA no cobra comision por depositar. Puede ser fee de tu banco por operacion internacional o conversion de moneda. Revisalo con tu banco."

**3. Por que me rechazaron la tarjeta?**
"Causas comunes: 1) tu banco declino por seguridad, contactalos; 2) el nombre de la tarjeta no coincide con tu cuenta; 3) no completaste 3DS. Reintenta o usa otro metodo."

**4. Puedo depositar con tarjeta que no esta a mi nombre?**
"No. Por AML solo aceptamos metodos a nombre del titular. Si lo intentas, lo rechazamos y devolvemos al origen."

**5. Cuanto tarda mi retiro?**
"Procesamiento interno: 24–48 horas habiles. Despues depende del metodo: card 3–5 dias, wire 1–3 dias, cripto 1–2 horas, PIX minutos."

**6. Puedo retirar a un metodo distinto al que use para depositar?**
"Por AML el retiro va al mismo metodo hasta cubrir el deposito. El excedente (ganancias) puede ir a otro metodo aprobado a tu nombre."

**7. Por que tengo que hacer KYC si el PSP ya me verifico?**
"Son verificaciones distintas. El PSP valida datos de pago. NEOMAAA, como broker regulado, valida identidad y origen de fondos por su propia obligacion."

**8. Se puede depositar en cripto?**
"Si. USDT (TRC-20/ERC-20), BTC y otras via B2BinPay/CoinsPaid. Instantaneo tras confirmacion on-chain, sin comisiones del broker."

**9. Cuanto es el minimo de deposito?**
"Card y cripto: $50. Wire: $100. Locales LATAM: variable (ej R$50 PIX)."

**10. Mi deposito dice 'procesado' pero no lo veo en MT5.**
"Usualmente es delay de segundos. Si pasaron mas de 30 min desde confirmacion PSP, escribinos con transaction ID, monto, metodo y hora exacta."

---

## 11. Troubleshooting

### Deposito no acreditado

**Info a pedir al cliente:** metodo exacto (y red si es cripto), transaction ID del PSP, monto/moneda, hora con zona horaria, screenshot del comprobante, estado confirmado por el banco/PSP ("approved" vs "pending").

**Escalar:** Finance Manager → Angel (si hay que contactar al PSP) → Susana (si es AML). Respuesta a cliente: <2h. Resolucion: <24h.

### Retiro rechazado

Causas comunes: (1) metodo no coincide con el deposito original — AML; (2) monto supera lo disponible; (3) KYC incompleto o vencido (>12 meses); (4) source of funds no documentado para retiros >$10K; (5) compliance hold por investigacion AML.

### PSP no disponible en mi pais

Razones: el PSP no tiene licencia en ese pais, restricciones del broker (paises sancionados/OFAC), o suspension temporal del PSP. Respuesta: ofrecer metodos alternativos disponibles.

---

> [!TIP]
> **Regla de oro para soporte:** nunca prometas un tiempo exacto. Siempre da un rango ("entre 1 y 5 dias habiles") y comunica proactivamente si hay delay. Los clientes toleran demoras comunicadas; no toleran silencio.

---

**Documento mantenido por:** Finance Manager (pendiente de contratacion, interim: Angel)
**Proxima revision:** post go-live, Q3 2026
**Cambios mayores:** actualizar al agregar/remover PSPs del stack
