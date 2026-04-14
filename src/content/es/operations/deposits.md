# NEOMAAA — Procesos de Depositos y Retiros

**Version:** 1.0
**Fecha:** 8 de abril de 2026
**Estado:** Operativo (con plan interim por vacante de Finance Manager)
**Aplica a:** Support, Finance, Compliance (Susana), Dealing (Pepe)
**Plataforma:** MetaTrader 5 | CRM: Skale | Soporte: Intercom

---

## Tabla de Contenidos

1. [Metodos de Deposito Disponibles](#1-metodos-de-deposito-disponibles)
2. [Proceso de Deposito — Paso a Paso](#2-proceso-de-deposito--paso-a-paso)
3. [Proceso de Retiro — Paso a Paso](#3-proceso-de-retiro--paso-a-paso)
4. [Reconciliacion Diaria](#4-reconciliacion-diaria)
5. [Protocolo de Transacciones Grandes](#5-protocolo-de-transacciones-grandes)
6. [Prevencion de Fraude](#6-prevencion-de-fraude)
7. [Flujo de Comunicacion Interna](#7-flujo-de-comunicacion-interna)
8. [Plan Interim — Sin Finance Manager](#8-plan-interim--sin-finance-manager)
9. [Templates y Checklists](#9-templates-y-checklists)

---

## 1. Metodos de Deposito Disponibles

> **Minimos de deposito:** Conviven dos minimos que deben cumplirse simultaneamente:
> 1. **Minimo por tipo de cuenta:** Cent $5 | Standard $50 | Raw $500 | Institutional $50,000 (ver `operations/faq-interno.md` 3.2).
> 2. **Minimo por metodo de pago:** Se detalla en las tablas siguientes. Si el metodo tiene un minimo superior al de la cuenta, prevalece el del metodo.
>
> **Fee broker:** $0 en todos los metodos salvo excepciones documentadas. Los PSPs o bancos del cliente pueden aplicar sus propias comisiones.

### Tarjetas
| Metodo | Monedas | Tiempo Esperado | Monto Min | Monto Max |
|--------|---------|-----------------|-----------|-----------|
| Visa | USD, EUR | Instantaneo (1-5 min) | $50 | $10,000/tx |
| Mastercard | USD, EUR | Instantaneo (1-5 min) | $50 | $10,000/tx |

### Transferencias Bancarias
| Metodo | Monedas | Tiempo Esperado | Monto Min | Monto Max |
|--------|---------|-----------------|-----------|-----------|
| Wire Transfer (SWIFT) | USD, EUR | 1-3 dias habiles | $100 | Sin limite |
| SEPA | EUR | 1 dia habil | $100 | Sin limite |

### Crypto
| Metodo | Red | Tiempo Esperado | Monto Min | Monto Max |
|--------|-----|-----------------|-----------|-----------|
| USDT (Tether) | TRC-20 | 5-30 min (confirmaciones) | $20 | Sin limite |
| USDT (Tether) | ERC-20 | 5-30 min (confirmaciones) | $50 | Sin limite |
| Bitcoin | BTC | 10-60 min | $50 | Sin limite |

### Metodos Locales LATAM
| Metodo | Pais | Moneda Local | Tiempo Esperado | Monto Min | Monto Max |
|--------|------|--------------|-----------------|-----------|-----------|
| PIX | Brasil | BRL | Instantaneo (1-5 min) | R$50 | R$50,000/dia |
| PSE | Colombia | COP | 15-30 min | COP 50,000 | COP 20,000,000 |
| Nequi | Colombia | COP | Instantaneo | COP 20,000 | COP 8,000,000 |
| SPEI | Mexico | MXN | 5-30 min | MXN 200 | MXN 500,000 |
| OXXO | Mexico | MXN | 1-24 horas (efectivo) | MXN 200 | MXN 10,000 |
| Yape | Peru | PEN | Instantaneo | PEN 50 | PEN 2,000 |
| Mercado Pago | Argentina | ARS | 5-30 min | ARS 5,000 | ARS 500,000 |

### Otros
| Metodo | Tiempo Esperado | Notas |
|--------|-----------------|-------|
| Western Union | 1-3 dias | Requiere comprobante manual |
| Skrill | Instantaneo | |
| Neteller | Instantaneo | |

---

## 2. Proceso de Deposito — Paso a Paso

### 2.1 Flujo General

```
Cliente inicia deposito en Portal del Cliente
        |
        v
Selecciona metodo de pago
        |
        v
PSP (Payment Service Provider) procesa la transaccion
        |
        v
PSP envia callback/webhook a Skale CRM
        |
        v
Skale registra deposito y lo marca como "Pending" o "Completed"
        |
        v
[Si completado] Credito automatico a cuenta MT5 del cliente
        |
        v
Cliente recibe email de confirmacion
        |
        v
[Si > $5,000] Notificacion automatica a Finance + Dealing (Pepe)
```

### 2.2 Por Tipo de Metodo

#### Tarjetas (Visa/Mastercard)
1. Cliente ingresa datos de tarjeta en portal (tokenizado por PSP, nunca tocamos datos de tarjeta)
2. PSP ejecuta 3D Secure si aplica
3. Transaccion aprobada o rechazada en segundos
4. Si aprobada: webhook a Skale → credito automatico a MT5
5. Si rechazada: cliente ve mensaje de error con codigo

**Problemas comunes con tarjetas:**
- **"Transaccion declinada"** → El banco del cliente bloqueo la transaccion. Pedir al cliente que llame a su banco y autorice compras internacionales
- **"3D Secure fallido"** → El cliente no completo la verificacion. Reintentar o usar otro metodo
- **Deposito aprobado pero no aparece en MT5** → Verificar en Skale si el webhook llego. Si no, escalar a Finance para credito manual
- **Monto diferente al solicitado** → Verificar conversion de moneda. El PSP puede haber cobrado en moneda local

#### Transferencias Bancarias (Wire/SEPA)
1. Cliente selecciona wire transfer en portal
2. Portal muestra instrucciones bancarias de NEOMAAA (banco, SWIFT, IBAN, referencia)
3. Cliente debe incluir su **numero de cuenta MT5 como referencia** — CRITICO
4. Cliente hace la transferencia desde su banco
5. Fondos llegan a la cuenta bancaria de NEOMAAA (1-3 dias)
6. Finance verifica el deposito en el estado bancario
7. Finance cruza referencia con cuenta del cliente en Skale
8. Finance acredita manualmente en Skale → credito a MT5

**Problemas comunes con wire:**
- **"No inclui referencia"** → Pedir al cliente comprobante bancario. Finance cruza por nombre + monto
- **"Ya pasaron 3 dias y no aparece"** → Pedir SWIFT confirmation al cliente. Verificar si hay fondos en transito en la cuenta bancaria
- **"El monto no coincide"** → Los bancos intermediarios cobran comisiones. Acreditar el monto neto recibido, informar al cliente

#### Crypto (USDT, BTC)
1. Cliente selecciona crypto en portal
2. Portal genera direccion de wallet unica (o muestra la direccion fija con memo/tag)
3. Cliente envia crypto desde su wallet
4. Sistema monitorea confirmaciones en blockchain
5. Una vez confirmado (TRC-20: ~20 confirmaciones, ERC-20: ~12, BTC: ~3): credito automatico

**Problemas comunes con crypto:**
- **"Envie a la red equivocada"** → Si envio ERC-20 a direccion TRC-20 (o viceversa), los fondos se pierden. No hay solucion. Informar al cliente con empatia
- **"Envie el monto pero no aparece"** → Pedir TX hash. Verificar en blockchain explorer (tronscan.org, etherscan.io). Si confirmado pero no acreditado, escalar a Finance
- **"Envie desde exchange que no muestra mi wallet"** → Pedir al cliente screenshot de la transaccion del exchange + TX hash
- **Conversion de crypto a USD** → Registrar el tipo de cambio al momento de la acreditacion

#### Metodos Locales LATAM (PIX, PSE, SPEI, OXXO, Nequi, Yape, Mercado Pago)
1. Cliente selecciona metodo local en portal
2. PSP local genera QR code (PIX, Yape, Nequi) o redirige a banco (PSE) o muestra codigo de pago (OXXO)
3. Cliente paga en su app bancaria o en punto de venta (OXXO)
4. PSP local confirma pago → callback a Skale → credito a MT5

**Problemas comunes con metodos locales:**
- **OXXO: "Pague pero no aparece"** → OXXO puede tardar hasta 24 horas. Pedir ticket de pago, verificar con el PSP
- **PIX: "El QR expiro"** → Generar nuevo deposito. Los QR de PIX expiran en 30 minutos
- **PSE: "Mi banco no aparece"** → Verificar con el PSP si el banco esta habilitado. Ofrecer metodo alternativo
- **Nequi/Yape: "Supere el limite"** → Informar limites del metodo, sugerir transferencia bancaria para montos grandes
- **Tipo de cambio** → El PSP convierte de moneda local a USD. El cliente recibe el monto en USD despues de conversion

### 2.3 Notificaciones al Recibir un Deposito

| Monto | Quien es Notificado | Canal | Accion Requerida |
|-------|---------------------|-------|------------------|
| Cualquier monto | Sistema automatico | Skale + MT5 | Credito automatico |
| > $5,000 | Finance + Pepe (Dealing) | Slack #deposits | Finance verifica, Pepe ajusta book si necesario |
| > $10,000 | Finance + Susana (Compliance) + Pepe | Slack #deposits + email | EDD trigger (ver seccion 5) |
| > $25,000 | Todos los anteriores + Direccion | Slack + email + WhatsApp | Aprobacion explicita de Compliance antes de acreditar |

### 2.4 Cuando el Deposito No Aparece — Troubleshooting para Support

**Script para agente de soporte (Intercom):**

```
Paso 1: Pedir al cliente:
   - Metodo de pago usado
   - Monto y moneda
   - Fecha y hora de la transaccion
   - Comprobante de pago (screenshot o TX hash)
   - Numero de cuenta MT5

Paso 2: Verificar en Skale CRM:
   - Buscar al cliente por email o account number
   - Ir a la seccion "Deposits"
   - Verificar si hay un deposito pendiente, fallido, o completado

Paso 3: Segun estado:
   - "Completed" pero no en MT5 → Escalar a Finance: "Deposito completado en Skale pero no reflejado en MT5"
   - "Pending" → Informar al cliente que esta en proceso, dar timeframe segun metodo
   - "Failed" → Informar al cliente, sugerir reintentar o usar otro metodo
   - No existe registro → Posible que el webhook no llego. Escalar a Finance con comprobante del cliente

Paso 4: Si no se resuelve en 2 horas (instantaneo) o 48 horas (wire):
   → Escalar a Finance con ticket de Intercom
   → Finance contacta al PSP para rastrear el pago
```

---

## 3. Proceso de Retiro — Paso a Paso

### 3.1 Flujo General

```
Cliente solicita retiro en Portal del Cliente
        |
        v
Sistema verifica: fondos disponibles, margen libre, posiciones abiertas
        |
        v
[Si falla verificacion] → Rechazo automatico con razon
        |
        v
Solicitud entra en cola de aprobacion en Skale
        |
        v
┌─────────────────────────────────────────────────┐
│            NIVELES DE APROBACION                 │
│                                                  │
│  < $1,000         → Auto-aprobado (si pasa AML)│
│  $1,000 - $5,000  → Finance aprueba            │
│  $5,000 - $10,000 → Finance + Susana revisan   │
│  > $10,000        → Finance + Susana aprueban   │
│                     + Pepe es notificado         │
│  > $50,000        → Todo lo anterior + Direccion│
└─────────────────────────────────────────────────┘
        |
        v
Checks AML automaticos:
  - Verificacion KYC completo
  - Regla de mismo metodo (same-method rule)
  - Verificacion de volumen de trading minimo
  - Verificacion de depositos recientes (cooling period para tarjetas)
        |
        v
[Si pasa] → Finance procesa el retiro via PSP
        |
        v
Fondos enviados al cliente
        |
        v
Confirmacion por email al cliente
```

### 3.2 Regla de Mismo Metodo (Same-Method Rule)

**Obligatorio por regulacion AML:**

El cliente DEBE retirar al mismo metodo que uso para depositar, hasta el monto depositado por ese metodo.

**Ejemplo:**
- Cliente deposito $3,000 por Visa y $2,000 por USDT
- Solicita retiro de $4,000
- Los primeros $3,000 van de vuelta a la Visa
- Los restantes $1,000 van a USDT
- Si hay ganancia adicional (profit), el cliente puede elegir metodo

**Excepciones:**
- Tarjeta expirada o cancelada → Pedir evidencia del banco + retiro a wire transfer
- PSP ya no opera con ese metodo → Retiro a wire transfer con aprobacion de Compliance
- Deposito fue por metodo de solo deposito (OXXO, Western Union) → Retiro por wire transfer al titular de la cuenta

### 3.3 Tiempos de Procesamiento por Metodo

| Metodo | Tiempo de Procesamiento | Tiempo hasta que Llega al Cliente |
|--------|------------------------|----------------------------------|
| Visa/Mastercard | 1 dia habil | 3-5 dias habiles (refund a tarjeta) |
| Wire Transfer | 1 dia habil | 2-5 dias habiles |
| USDT TRC-20 | Mismo dia | 5-30 minutos despues de envio |
| USDT ERC-20 | Mismo dia | 5-30 minutos despues de envio |
| Bitcoin | Mismo dia | 10-60 minutos despues de envio |
| PIX | 1 dia habil | Instantaneo una vez procesado |
| PSE | 1 dia habil | 1-2 dias habiles |
| SPEI | 1 dia habil | Minutos una vez procesado |
| Nequi | 1 dia habil | Instantaneo una vez procesado |
| Mercado Pago | 1 dia habil | 1-2 dias habiles |
| Skrill/Neteller | 1 dia habil | Instantaneo una vez procesado |

**Nota:** "Tiempo de procesamiento" = desde aprobacion interna hasta que Finance ejecuta el envio. Los retiros se procesan en batch 2 veces al dia: 10:00 AM y 4:00 PM (hora del servidor).

### 3.4 Checks AML Automaticos en Retiros

Antes de que un retiro sea aprobado, el sistema (Skale + revision manual) debe verificar:

- [ ] **KYC completo:** Identidad verificada, prueba de direccion, tarjeta selfie (si aplica)
- [ ] **Same-method rule cumplida:** Retiro va al mismo metodo de deposito
- [ ] **Cooling period para tarjetas:** Minimo 5 dias habiles desde el deposito por tarjeta antes de retirar (previene chargebacks)
- [ ] **Volumen de trading minimo:** El cliente debe haber operado al menos 1 lote estandar por cada $5,000 depositados (evita lavado simple de depositar-retirar)
- [ ] **No hay alertas AML en el perfil:** Sin flags de compliance previos
- [ ] **Nombre coincide:** El beneficiario del retiro coincide con el titular de la cuenta

### 3.5 Retiros Crypto — Proceso Especifico

1. Cliente ingresa direccion de wallet en portal
2. **Verificacion de wallet:** El sistema verifica que la wallet no este en listas de sanciones (OFAC, etc.) — usar herramienta de screening como Chainalysis o similar
3. Finance verifica el monto y aprueba
4. Finance ejecuta el envio desde la wallet de la empresa
5. **CRITICO:** Siempre verificar la direccion de wallet 3 veces antes de enviar. Las transacciones crypto son irreversibles
6. Registrar TX hash en Skale como comprobante
7. Enviar TX hash al cliente por email

**Seguridad de wallets de la empresa:**
- Wallet de retiros = "hot wallet" con fondos limitados (maximo $50,000)
- Fondos mayores en "cold wallet" (hardware wallet) con acceso solo de Finance Manager + Susana (firma dual)
- Reposicion de hot wallet = segun necesidad, aprobada por Finance Manager

### 3.6 Cuando el Retiro Tiene Problemas — Troubleshooting

**"Mi retiro fue rechazado":**
- Verificar razon en Skale (insuficientes fondos, KYC incompleto, posiciones abiertas, same-method rule)
- Informar al cliente la razon especifica y como resolverla

**"Mi retiro fue aprobado pero no llega":**
- Verificar en Skale si se proceso con el PSP
- Si crypto: verificar TX hash en blockchain
- Si tarjeta: informar que refunds a tarjeta toman 3-5 dias habiles
- Si wire: pedir al cliente que consulte a su banco, proporcionar comprobante SWIFT si disponible

**"Quiero retirar a un metodo diferente":**
- Explicar same-method rule
- Si hay excepcion valida, escalar a Compliance (Susana) para aprobacion

---

## 4. Reconciliacion Diaria

### 4.1 Que es y Por Que es Critica

La reconciliacion diaria cruza 3 fuentes de datos para asegurar que cada centavo esta contabilizado:

1. **PSP (Payment Service Providers):** Lo que los procesadores de pago reportan como depositado/retirado
2. **Skale CRM:** Lo que nuestro sistema registro como depositado/retirado
3. **MT5:** Lo que los clientes ven en sus cuentas de trading

Si estos 3 no coinciden, hay un problema: deposito no acreditado, retiro duplicado, fraude, o error del sistema.

### 4.2 Checklist Diario de Reconciliacion

**Hora sugerida:** 9:00 AM, antes de procesar retiros del dia

```
RECONCILIACION DIARIA — NEOMAAA
Fecha: ___________
Responsable: ___________

PASO 1: PSP vs Skale
─────────────────────
[ ] Descargar reporte de depositos del dia anterior de CADA PSP
[ ] Descargar reporte de depositos de Skale CRM del dia anterior
[ ] Cruzar transaccion por transaccion:
    - Cada deposito en PSP debe existir en Skale
    - Cada deposito en Skale debe existir en PSP
    - Los montos deben coincidir (considerando comisiones del PSP)
[ ] Registrar discrepancias:
    - Depositos en PSP pero no en Skale = webhook fallido → acreditar manualmente
    - Depositos en Skale pero no en PSP = posible error del sistema → investigar

PASO 2: Skale vs MT5
─────────────────────
[ ] Generar reporte de creditos/debitos en MT5 del dia anterior
[ ] Cruzar con Skale:
    - Cada deposito "completado" en Skale debe tener un credito en MT5
    - Cada retiro "procesado" en Skale debe tener un debito en MT5
[ ] Registrar discrepancias:
    - Deposito en Skale sin credito en MT5 = fallo en la integracion → credito manual en MT5
    - Credito en MT5 sin deposito en Skale = posible credito no autorizado → investigar URGENTE

PASO 3: Balances Totales
─────────────────────────
[ ] Sumar total de depositos del dia (por PSP)
[ ] Sumar total de retiros del dia (por PSP)
[ ] Verificar que el balance neto del dia coincide con el movimiento en la cuenta bancaria / wallets
[ ] Comparar balance de wallet crypto de la empresa con lo esperado

PASO 4: Retiros Pendientes
───────────────────────────
[ ] Listar todos los retiros pendientes de aprobacion
[ ] Verificar que ningun retiro lleva mas de 48 horas sin procesar
[ ] Priorizar retiros con deadlines proximos

PASO 5: Red Flags
──────────────────
[ ] Verificar si hay depositos duplicados (mismo cliente, mismo monto, minutos de diferencia)
[ ] Verificar si hay retiros mayores al deposito total del cliente
[ ] Verificar si hay clientes con deposito + retiro inmediato sin trading
[ ] Verificar si hay transacciones en montos "redondos" repetitivos ($999, $4,999 — structuring)

RESULTADO:
[ ] Todo cuadra — Firmar y archivar
[ ] Hay discrepancias — Detallar y escalar

Notas: _________________________________
Firma: _________________________________
```

### 4.3 Red Flags Criticas

| Red Flag | Accion Inmediata |
|----------|------------------|
| Deposito en PSP que no existe en Skale | Credito manual al cliente. Investigar webhook |
| Credito en MT5 sin deposito correspondiente | CONGELAR cuenta. Investigar acceso no autorizado |
| Retiro procesado 2 veces | Contactar PSP inmediatamente para reversar el duplicado |
| Balance de wallet crypto no cuadra | Congelar retiros crypto. Auditar todas las transacciones |
| Cliente con deposito-retiro sin trading | Flag AML → Escalar a Susana |
| Multiples depositos justo debajo de $10,000 | Sospecha de structuring → Escalar a Susana |

---

## 5. Protocolo de Transacciones Grandes

### 5.1 Umbrales de Enhanced Due Diligence (EDD)

> Estos umbrales complementan los Tiers de KYC definidos en `compliance/proceso-kyc-sumsub.md` seccion 3. Tier 3 (>$10K) dispara EDD automaticamente; Tier 4 (>$50K) agrega aprobacion de Principals.

| Trigger | Umbral | Accion |
|---------|--------|--------|
| Deposito individual grande | > $10,000 | EDD requerido antes de acreditar (Tier 3) |
| Deposito acumulado | > $10,000 acumulado historico | Upgrade a Tier 3 + EDD |
| Deposito acumulado institucional | > $50,000 | Upgrade a Tier 4 + aprobacion Principals |
| Retiro grande | > $10,000 | EDD + aprobacion de Compliance |
| Cliente nuevo con deposito grande | > $5,000 en primera semana | EDD requerido |
| Cambio repentino de patron | Deposito 3x mayor que su promedio | EDD requerido |

### 5.2 Documentacion Requerida (Source of Funds)

Cuando se activa EDD, solicitar al cliente:

```
DOCUMENTACION REQUERIDA — SOURCE OF FUNDS

Estimado/a [nombre del cliente],

Para procesar su transaccion de [monto], necesitamos verificar el origen
de los fondos de acuerdo con nuestras obligaciones regulatorias.

Por favor proporcione UNO de los siguientes:

□ Recibo de nomina reciente (ultimos 3 meses)
□ Declaracion de impuestos del ultimo anio
□ Estado de cuenta bancaria mostrando la fuente de los fondos (ultimos 3 meses)
□ Escritura de venta de propiedad o vehiculo
□ Documento de herencia o donacion
□ Contrato de trabajo o carta de empleo con salario
□ Estado de cuenta de inversiones (si los fondos vienen de otra inversion)

ADICIONALMENTE para montos > $25,000:
□ Declaracion firmada de origen de fondos (formato proporcionado por NEOMAAA)
□ Comprobante de la transferencia desde la cuenta origen

Tiene 7 dias calendario para proporcionar esta documentacion.
Si no la recibimos, los fondos seran devueltos al metodo original de deposito.

Gracias por su comprension.
```

### 5.3 Flujo de Aprobacion para Transacciones Grandes

```
Deposito/Retiro > $10,000 detectado
        |
        v
Finance recibe notificacion automatica (Slack #large-transactions)
        |
        v
Finance solicita documentacion SOF al cliente (via Intercom o email)
        |
        v
Cliente proporciona documentacion
        |
        v
Finance revisa documentacion (¿es coherente con el perfil del cliente?)
        |
        v
Finance envia documentacion a Susana (Compliance) con su evaluacion
        |
        v
Susana revisa y decide:
  ├─ APROBADO → Finance procede con la transaccion
  ├─ MAS INFO → Finance solicita documentacion adicional al cliente
  └─ RECHAZADO → Finance devuelve fondos al cliente + Susana registra SAR si aplica
        |
        v
Pepe (Dealing) es notificado del monto para gestionar el book
```

**Tiempos:**
- Finance debe revisar documentacion en max 24 horas desde que la recibe
- Susana debe aprobar/rechazar en max 48 horas
- El cliente debe ser informado del status cada 24 horas
- Si el cliente no proporciona documentacion en 7 dias, devolver fondos

### 5.4 Impacto en Dealing (Pepe)

Pepe necesita saber de depositos grandes porque:
- Un deposito de $50,000+ puede generar posiciones que afecten la exposicion neta del broker
- Pepe debe preparar cobertura (hedging) si el cliente tiene historial de posiciones grandes
- Si el cliente es un "A-book candidate" (trader consistente con alto volumen), Pepe puede mover al cliente a A-book antes de que abra posiciones

**Notificacion a Pepe:**
- Depositos > $5,000: Notificacion informativa
- Depositos > $10,000: Pepe debe revisar el perfil de trading del cliente y preparar plan de gestion de riesgo
- Depositos > $50,000: Reunion breve (5 min) entre Finance, Pepe, y Susana antes de acreditar

---

## 6. Prevencion de Fraude

### 6.1 Chargebacks (Contracargos de Tarjetas)

**El chargeback es el mayor riesgo financiero para depositos con tarjeta.**

#### Prevencion:
- 3D Secure obligatorio en todos los depositos con tarjeta
- Cooling period de 5 dias habiles antes de permitir retiro de fondos depositados con tarjeta
- Selfie con tarjeta requerido para depositos con tarjeta > $500
- Limite diario de $10,000 por tarjeta
- Maximo 3 tarjetas diferentes por cuenta

#### Cuando Recibimos un Chargeback:

```
PROTOCOLO DE CHARGEBACK

1. PSP notifica chargeback via email/dashboard
   Responsable: Finance
   Tiempo: Inmediato al recibir

2. Finance congela la cuenta del cliente
   - Deshabilitar trading
   - Deshabilitar retiros
   - Deshabilitar depositos

3. Finance recopila evidencia para disputar:
   - Copia del KYC del cliente (ID, prueba de direccion)
   - Log de IP de la sesion donde se hizo el deposito
   - Historial de trading (demuestra que el servicio se presto)
   - Comunicaciones previas con el cliente
   - 3D Secure authentication proof
   - Selfie con tarjeta si existe

4. Finance envia representment (disputa) al PSP dentro de 5 dias habiles

5. Susana registra el incidente:
   - En el perfil del cliente en Skale
   - En el registro de chargebacks
   - Evalua si hay patron (multiples chargebacks = fraude organizado)

6. Si el chargeback se pierde:
   - La perdida se registra contablemente
   - El cliente queda BANNED permanentemente
   - Agregar a blacklist interna (nombre, email, IP, tarjeta)

7. Si el chargeback se gana:
   - Descongelar cuenta del cliente
   - Monitoreo reforzado por 90 dias
   - Considerar restringir metodos de pago a solo crypto/wire
```

### 6.2 Indicadores de Tarjeta Robada

| Indicador | Nivel de Riesgo | Accion |
|-----------|----------------|--------|
| IP del deposito en pais diferente al pais de la tarjeta | Alto | Bloquear deposito, solicitar verificacion |
| Multiples tarjetas en la misma cuenta en poco tiempo | Alto | Congelar cuenta, investigar |
| Nombre en tarjeta no coincide con nombre en cuenta | Critico | Rechazar deposito inmediatamente |
| Deposito seguido de retiro inmediato a crypto | Critico | Congelar cuenta + escalar a Compliance |
| Multiples intentos fallidos antes de uno exitoso | Medio | Solicitar selfie con tarjeta |
| VPN o proxy detectado | Medio | Solicitar verificacion adicional |
| Email desechable (mailinator, guerrillamail, etc.) | Medio | Rechazar registro |

### 6.3 Abuso Multi-Cuenta

**Senales de alerta:**
- Mismo dispositivo/browser fingerprint en multiples cuentas
- Mismo IP en multiples cuentas
- Nombres similares o misma direccion en multiples cuentas
- Misma tarjeta o wallet crypto usada en multiples cuentas
- Patron de trading identico en multiples cuentas (copy trading de si mismo)

**Acciones:**
1. Detectar via Skale CRM (cruzar datos de clientes)
2. Congelar todas las cuentas sospechosas
3. Investigar: ¿Es la misma persona? ¿Hay motivo de bonus abuse?
4. Si se confirma: cerrar cuentas adicionales, mantener solo 1
5. Si hay intencion fraudulenta: cerrar todas, devolver fondos netos, banear

### 6.4 Deteccion de Structuring (Smurfing)

**Structuring = Dividir transacciones grandes en multiples pequenas para evadir umbrales de reporte.**

**Patrones a monitorear:**
- Multiples depositos de $9,000-$9,999 (justo debajo de $10,000)
- 3+ depositos el mismo dia del mismo cliente
- Depositos en montos redondos repetitivos ($5,000, $5,000, $5,000...)
- Cliente que deposita frecuentemente pero no tradea (o tradea minimamente)
- Depositos desde multiples metodos de pago diferentes en periodo corto

**Accion cuando se detecta structuring:**
1. Finance marca la cuenta para revision
2. Susana ejecuta investigacion AML completa
3. Si hay sospecha razonable: reportar como SAR (Suspicious Activity Report) a la autoridad correspondiente (Anjouan)
4. No informar al cliente que esta bajo investigacion (tipping off es ilegal)
5. Dependiendo de la evaluacion: congelar cuenta o permitir operacion bajo monitoreo reforzado

---

## 7. Flujo de Comunicacion Interna

### 7.1 Canales

| Canal | Uso | Participantes |
|-------|-----|---------------|
| **Slack #deposits** | Notificaciones de depositos > $5,000 | Finance, Dealing (Pepe), Compliance (Susana) |
| **Slack #withdrawals** | Notificaciones de retiros pendientes de aprobacion | Finance, Compliance (Susana) |
| **Slack #large-transactions** | Depositos/retiros > $10,000 + alertas AML | Finance, Compliance (Susana), Dealing (Pepe), Direccion |
| **Slack #fraud-alerts** | Chargebacks, tarjetas sospechosas, multi-cuenta | Finance, Compliance (Susana), Direccion |
| **Slack #reconciliation** | Resultado de reconciliacion diaria + discrepancias | Finance, Direccion |
| **WhatsApp — Grupo Urgencias** | Solo para emergencias que requieren accion inmediata fuera de horario | Finance, Compliance (Susana), Dealing (Pepe), Direccion |
| **Email** | Documentacion formal, comunicacion con PSPs, SAR filing | Segun necesidad |
| **Intercom** | Comunicacion con clientes sobre status de depositos/retiros | Support |

### 7.2 Escalamiento

```
NIVEL 1: Support → Finance
─────────────────────────
Cuando:
  - Cliente reporta deposito no acreditado despues de 2 horas (instantaneo) o 48 horas (wire)
  - Cliente pregunta por retiro pendiente de mas de 24 horas habiles
  - Error evidente en el monto acreditado
Como:
  - Ticket en Intercom con tag "Escalado-Finance"
  - Mensaje en Slack #deposits o #withdrawals con link al ticket
Tiempo de respuesta esperado: 2 horas habiles

NIVEL 2: Finance → Compliance (Susana)
───────────────────────────────────────
Cuando:
  - Retiro > $5,000 necesita aprobacion
  - Deposito > $10,000 necesita EDD
  - Patron sospechoso detectado (structuring, multi-cuenta, etc.)
  - Chargeback recibido
  - Documentacion SOF no es convincente
Como:
  - Slack #large-transactions o #fraud-alerts con resumen + evidencia
  - Email con documentacion adjunta si es formal
Tiempo de respuesta esperado: 4 horas habiles (urgente: 1 hora)

NIVEL 3: Compliance (Susana) → Direccion
─────────────────────────────────────────
Cuando:
  - Transaccion > $50,000 necesita aprobacion
  - SAR debe ser reportado
  - Decision de banear a un cliente
  - Solicitud de informacion de autoridad regulatoria
  - Riesgo reputacional
Como:
  - WhatsApp Grupo Urgencias (si es urgente)
  - Email formal (si es para documentar)
  - Reunion presencial/videollamada (si es complejo)
Tiempo de respuesta esperado: Mismo dia

NIVEL ESPECIAL: Finance → Dealing (Pepe)
──────────────────────────────────────────
Cuando:
  - Deposito > $5,000 de cualquier cliente
  - Deposito > $10,000 de cliente con historial de posiciones grandes
  - Retiro > $10,000 (Pepe debe saber que el cliente puede cerrar posiciones para retirar)
  - Cliente VIP hace cualquier transaccion significativa
Como:
  - Slack #deposits con tag @pepe
  - Para urgencias: mensaje directo
Tiempo de respuesta esperado: 1 hora habiles
```

### 7.3 Comunicacion con el Cliente

**Regla de oro:** El cliente SIEMPRE debe saber el status de su dinero.

| Situacion | Quien Comunica | Canal | Template |
|-----------|---------------|-------|----------|
| Deposito recibido y acreditado | Automatico (Skale) | Email | "Su deposito de $X ha sido acreditado a su cuenta MT5 #XXXXX" |
| Deposito en proceso | Support (si pregunta) | Intercom | "Su deposito esta siendo procesado. El tiempo estimado para [metodo] es [tiempo]" |
| Deposito requiere verificacion adicional | Support (instruido por Finance) | Intercom + Email | "Necesitamos verificar informacion adicional para procesar su deposito..." |
| Retiro aprobado y procesado | Automatico (Skale) | Email | "Su retiro de $X ha sido procesado. Tiempo estimado de recepcion: [tiempo]" |
| Retiro en revision | Support (instruido por Finance) | Intercom | "Su solicitud de retiro esta siendo revisada por nuestro equipo. Le informaremos en [plazo]" |
| Retiro rechazado | Support (instruido por Finance/Compliance) | Intercom + Email | "Su solicitud de retiro no pudo ser procesada porque [razon]. Para resolverlo: [pasos]" |

---

## 8. Plan Interim — Sin Finance Manager

### 8.1 Estado Actual

**La posicion de Finance Manager esta VACANTE. Es la prioridad #1 de contratacion.**

Hasta que se contrate, las responsabilidades de Finance se distribuyen asi:

### 8.2 Distribucion Temporal de Responsabilidades

| Tarea | Responsable Interim | Backup | Frecuencia |
|-------|---------------------|--------|------------|
| Aprobacion de retiros < $1,000 | Auto-aprobado por sistema | Support verifica | Continuo |
| Aprobacion de retiros $1,000 - $5,000 | Susana (Compliance) | Direccion | Segun demanda |
| Aprobacion de retiros > $5,000 | Susana + Direccion | — | Segun demanda |
| Reconciliacion diaria | Susana (simplificada) | Direccion los viernes | Diaria |
| Creditos manuales a MT5 | Support senior (con aprobacion de Susana) | Direccion | Segun necesidad |
| Procesamiento de retiros batch | Susana | Direccion | 2x al dia |
| Contacto con PSPs | Direccion | Susana | Segun necesidad |
| Gestion de chargebacks | Susana | Direccion | Segun necesidad |
| Reporte financiero semanal | Susana (simplificado) | — | Semanal |

### 8.3 Riesgos del Plan Interim

| Riesgo | Impacto | Mitigacion |
|--------|---------|------------|
| Susana esta sobrecargada (Compliance + Finance) | Retrasos en aprobaciones y reconciliacion | Automatizar todo lo posible en Skale. Auto-aprobaciones hasta $1,000 |
| Falta de expertise financiera | Errores en reconciliacion, perdida de dinero | Crear checklists detallados (este documento). Direccion revisa semanalmente |
| Retiros se procesan con retraso | Clientes insatisfechos, quejas en redes | Comunicar tiempos reales al cliente. Priorizar retiros por antiguedad |
| Falta de segregacion de funciones | Riesgo de fraude interno | Direccion debe aprobar cualquier transaccion > $5,000. Reconciliacion cruzada |
| Reconciliacion incompleta | Perdida de fondos no detectada | Reconciliacion simplificada diaria + completa semanal |

### 8.4 Reconciliacion Simplificada (Version Interim)

Mientras no hay Finance Manager, Susana ejecuta una version reducida:

```
RECONCILIACION SIMPLIFICADA DIARIA (15-20 minutos)
──────────────────────────────────────────────────

1. [ ] Abrir dashboard de cada PSP
2. [ ] Verificar que el total de depositos del dia anterior en PSP = total en Skale
3. [ ] Verificar que el total de retiros del dia anterior en PSP = total en Skale
4. [ ] Si los totales cuadran (diferencia < $50): OK, firmar y archivar
5. [ ] Si no cuadran: identificar la discrepancia y escalar a Direccion
6. [ ] Revisar lista de retiros pendientes > 24 horas
7. [ ] Verificar balance de hot wallet crypto

Dia: __________  Cuadra: SI / NO  Firma: __________
```

**Reconciliacion Completa Semanal (Viernes):**
Direccion ejecuta la reconciliacion completa del checklist de la Seccion 4.2, cubriendo toda la semana.

### 8.5 Que Debe Hacer el Finance Manager Cuando se Contrate

**Primeras 2 semanas:**
1. Recibir este documento y los accesos a PSPs, Skale, MT5 Admin
2. Ejecutar reconciliacion completa de los ultimos 30 dias (identificar cualquier discrepancia acumulada)
3. Tomar ownership de todas las tareas de la tabla 8.2
4. Establecer relacion directa con cada PSP (contact persons, SLAs, escalamiento)
5. Revisar y mejorar este documento con base en la operacion real

**Primer mes:**
6. Implementar dashboard automatizado de reconciliacion (ideal: conectar PSP APIs con Skale via script)
7. Establecer reportes financieros semanales y mensuales
8. Optimizar tiempos de procesamiento de retiros
9. Negociar mejores tarifas con PSPs basado en volumen

---

## 9. Templates y Checklists

### 9.1 Template — Respuesta a Cliente: Deposito No Acreditado (Intercom)

```
Hola [nombre],

Gracias por contactarnos. Entiendo su preocupacion por el deposito.

He verificado su cuenta y esto es lo que veo:
[OPCION A] Su deposito de $[monto] via [metodo] esta en proceso.
El tiempo estimado para este metodo es [tiempo]. Le notificaremos
por email en cuanto sea acreditado.

[OPCION B] Puedo ver que hubo un inconveniente con su deposito.
Para resolverlo, necesito que me proporcione:
- Comprobante de pago (screenshot o recibo)
- Fecha y hora exacta de la transaccion
- [Si crypto] Hash de la transaccion (TX ID)

[OPCION C] Su deposito ha sido acreditado exitosamente a su cuenta
MT5 #[numero]. El saldo actualizado es $[saldo]. Si no lo ve
reflejado, por favor cierre y abra MT5 nuevamente.

¿Hay algo mas en lo que pueda ayudarle?

Saludos,
[Nombre del agente]
Equipo de Soporte NEOMAAA
```

### 9.2 Template — Respuesta a Cliente: Retiro en Revision (Intercom)

```
Hola [nombre],

Su solicitud de retiro de $[monto] ha sido recibida y esta
siendo revisada por nuestro equipo financiero.

[SI NECESITA DOCUMENTACION]
Para procesar su retiro, necesitamos verificar lo siguiente:
- [Documentacion requerida]
Por favor envie los documentos a este chat o a compliance@neomaaa.com

[SI ESTA EN PROCESO NORMAL]
Los retiros via [metodo] se procesan en [tiempo de procesamiento]
y los fondos llegan en [tiempo de llegada] adicional.

Le enviaremos una confirmacion por email en cuanto el retiro
sea procesado.

¿Tiene alguna otra pregunta?

Saludos,
[Nombre del agente]
Equipo de Soporte NEOMAAA
```

### 9.3 Template — Solicitud de Source of Funds (Email)

```
Asunto: NEOMAAA — Verificacion de Origen de Fondos | Cuenta #[MT5]

Estimado/a [nombre completo],

De acuerdo con nuestras obligaciones regulatorias y politicas de
prevencion de lavado de dinero, necesitamos verificar el origen de
los fondos relacionados con su [deposito/retiro] de $[monto]
realizado el [fecha].

Por favor proporcione UNO de los siguientes documentos:

1. Recibo de nomina reciente (ultimos 3 meses)
2. Declaracion de impuestos del ultimo anio fiscal
3. Estado de cuenta bancaria de los ultimos 3 meses
4. Escritura de venta (propiedad, vehiculo, etc.)
5. Certificado de herencia o donacion
6. Carta de empleo indicando salario
7. Estado de cuenta de inversiones

Plazo: Tiene 7 dias calendario (hasta el [fecha limite]) para
enviar la documentacion a compliance@neomaaa.com

Si no recibimos la documentacion en el plazo indicado:
- [Si deposito] Los fondos seran devueltos a su metodo de pago original
- [Si retiro] La solicitud de retiro sera cancelada

Si tiene preguntas, no dude en contactarnos.

Atentamente,
Departamento de Compliance
NEOMAAA
compliance@neomaaa.com
```

### 9.4 Template — Notificacion Interna: Transaccion Grande (Slack)

```
🔔 TRANSACCION GRANDE DETECTADA

Cliente: [nombre] | Cuenta MT5: #[numero]
Tipo: [DEPOSITO / RETIRO]
Monto: $[monto]
Metodo: [metodo]
Fecha/Hora: [fecha hora]

Perfil del cliente:
- Fecha de registro: [fecha]
- Total depositado historico: $[total]
- Total retirado historico: $[total]
- KYC status: [Completo / Incompleto]
- Alertas previas: [Si / No — detalle]

Accion requerida:
- [ ] Finance: Verificar transaccion
- [ ] Compliance (@susana): [Aprobar / Revisar SOF]
- [ ] Dealing (@pepe): Revisar exposicion del cliente

Link en Skale: [URL]
```

### 9.5 Checklist — Onboarding de Finance Manager

```
ONBOARDING — FINANCE MANAGER
─────────────────────────────

DIA 1:
[ ] Leer este documento completo (NEOMAAA-DEPOSITS-WITHDRAWALS.md)
[ ] Leer el playbook de lanzamiento (NEOMAAA-BROKER-LAUNCH-PLAYBOOK.md)
[ ] Acceso a Skale CRM (credenciales + capacitacion basica)
[ ] Acceso a MT5 Admin (solo lectura inicialmente)
[ ] Acceso a cada PSP dashboard (listado de PSPs + credenciales)
[ ] Acceso a cuentas bancarias de la empresa (solo lectura)
[ ] Acceso a wallets crypto (solo lectura de hot wallet)
[ ] Unirse a canales de Slack: #deposits, #withdrawals, #large-transactions,
    #fraud-alerts, #reconciliation
[ ] Unirse a WhatsApp Grupo Urgencias

DIA 2-3:
[ ] Ejecutar reconciliacion completa de los ultimos 30 dias con supervision
[ ] Identificar y documentar cualquier discrepancia historica
[ ] Conocer a cada PSP: persona de contacto, SLA, proceso de escalamiento
[ ] Procesar 5 retiros bajo supervision de Susana

DIA 4-5:
[ ] Ejecutar reconciliacion diaria de forma independiente
[ ] Procesar retiros de forma independiente
[ ] Manejar un caso de soporte escalado de principio a fin

SEMANA 2:
[ ] Tomar ownership completo de todas las tareas de Finance
[ ] Susana se enfoca exclusivamente en Compliance
[ ] Primer reporte financiero semanal
[ ] Identificar areas de mejora en procesos

FIN MES 1:
[ ] Dashboard de reconciliacion automatizado (o plan para implementarlo)
[ ] Procesos documentados y optimizados
[ ] Relaciones establecidas con todos los PSPs
[ ] Primer reporte financiero mensual
```

### 9.6 Matriz de Decision Rapida — Retiros

```
¿El KYC esta completo?
  NO → Rechazar retiro. Pedir al cliente que complete KYC.
  SI ↓

¿El retiro cumple la regla de mismo metodo?
  NO → ¿Hay excepcion valida? (tarjeta expirada, metodo no disponible)
       NO → Rechazar. Informar al cliente que debe retirar al mismo metodo.
       SI → Escalar a Compliance para aprobacion de excepcion.
  SI ↓

¿El monto es < $1,000?
  SI → Auto-aprobar (si no hay flags AML).
  NO ↓

¿El monto es entre $1,000 y $5,000?
  SI → Finance aprueba (revisar historial basico).
  NO ↓

¿El monto es entre $5,000 y $10,000?
  SI → Finance + Compliance revisan. EDD si es necesario.
  NO ↓

¿El monto es > $10,000?
  SI → Finance + Compliance aprueban. EDD obligatorio. Notificar a Pepe.
       ¿Es > $50,000? → Ademas, aprobacion de Direccion.
```

---

## Anexo: Glosario

| Termino | Definicion |
|---------|-----------|
| **PSP** | Payment Service Provider — Empresa que procesa pagos (ej: procesador de tarjetas, pasarela de crypto) |
| **KYC** | Know Your Customer — Verificacion de identidad del cliente |
| **AML** | Anti-Money Laundering — Prevencion de lavado de dinero |
| **EDD** | Enhanced Due Diligence — Verificacion reforzada para transacciones de alto riesgo |
| **SOF** | Source of Funds — Origen de los fondos |
| **SAR** | Suspicious Activity Report — Reporte de actividad sospechosa a la autoridad regulatoria |
| **Same-method rule** | Obligacion de retirar fondos al mismo metodo usado para depositar |
| **Cooling period** | Periodo de espera entre deposito y retiro (previene chargebacks) |
| **Structuring/Smurfing** | Dividir transacciones grandes en pequenas para evadir umbrales de reporte |
| **Hot wallet** | Wallet crypto con fondos accesibles para operaciones diarias |
| **Cold wallet** | Wallet crypto offline para almacenamiento seguro de grandes montos |
| **Representment** | Proceso de disputar un chargeback presentando evidencia |
| **A-book** | Modelo donde las operaciones del cliente se envian directamente al mercado |
| **B-book** | Modelo donde el broker asume el riesgo contrario a la posicion del cliente |

---

**Proxima revision:** Cuando se contrate Finance Manager
**Responsable de este documento:** Compliance (Susana) + Direccion
**Ultima actualizacion:** 8 de abril de 2026
