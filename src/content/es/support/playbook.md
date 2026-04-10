# NEOMAAA Broker - Playbook de Soporte al Cliente

## Documento Operativo para el Equipo de Support

**Version:** 1.0
**Ultima actualizacion:** Abril 2026
**Herramienta de soporte:** Intercom
**CRM:** Skale
**KYC:** Sumsub
**Plataforma de trading:** MetaTrader 5

---

## INDICE

1. [Horarios y Cobertura](#1-horarios-y-cobertura)
2. [Configuracion de Intercom](#2-configuracion-de-intercom)
3. [Matriz de Escalacion](#3-matriz-de-escalacion)
4. [SLAs y Tiempos de Respuesta](#4-slas-y-tiempos-de-respuesta)
5. [Respuestas Predefinidas (Canned Responses)](#5-respuestas-predefinidas-canned-responses)
6. [Top 20 Problemas Comunes y Resolucion](#6-top-20-problemas-comunes-y-resolucion)
7. [Metricas de Calidad](#7-metricas-de-calidad)
8. [Checklist de Capacitacion para Nuevos Agentes](#8-checklist-de-capacitacion-para-nuevos-agentes)

---

## 1. Horarios y Cobertura

### Distribucion de Turnos

Con 2 agentes, el objetivo es cubrir la mayor ventana posible entre LATAM y Europa/Middle East.

| Agente | Zona | Idioma | Horario (UTC) | Horario Local | Dias |
|--------|------|--------|---------------|---------------|------|
| Agente 1 | LATAM | Espanol | 13:00 - 21:00 UTC | 8:00 AM - 4:00 PM (Colombia/Mexico) | Lunes a Viernes |
| Agente 2 | Europa / Middle East | Ingles | 06:00 - 14:00 UTC | 8:00 AM - 4:00 PM (Dubai) / 9:00 AM - 5:00 PM (Madrid) | Lunes a Viernes |

### Cobertura Resultante

```
UTC:     00  01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16  17  18  19  20  21  22  23
         [         SIN COBERTURA          ][====== AGENTE 2 ======][== AMBOS ==][==== AGENTE 1 ====][SIN COB]
```

- **Cobertura total en vivo:** 15 horas/dia (06:00 - 21:00 UTC)
- **Solapamiento (ambos agentes online):** 13:00 - 14:00 UTC (1 hora)
- **Sin cobertura en vivo:** 21:00 - 06:00 UTC (auto-respuestas activas)

### Uso del Solapamiento (13:00 - 14:00 UTC)

Esta hora diaria es critica. Usar para:
- Handoff de tickets abiertos del Agente 2 al Agente 1
- Revision rapida de tickets escalados pendientes
- Sync de 15 minutos sobre casos complejos
- Actualizar notas internas de tickets que requieren seguimiento

### Protocolo de Handoff

1. **Al terminar turno**, el agente saliente:
   - Revisa todos los tickets abiertos asignados a el
   - Agrega nota interna en Intercom con resumen del estado de cada ticket abierto
   - Reasigna tickets urgentes al agente entrante
   - Los tickets no urgentes pueden quedar asignados al agente original para continuidad

2. **Al iniciar turno**, el agente entrante:
   - Revisa la bandeja de tickets "Sin asignar"
   - Lee las notas internas de los tickets reasignados
   - Responde primero los tickets con mayor tiempo de espera

3. **Formato de nota interna de handoff:**
   ```
   HANDOFF NOTE:
   - Estado actual: [descripcion]
   - Ultima accion tomada: [descripcion]
   - Proxima accion requerida: [descripcion]
   - Urgencia: [Alta/Media/Baja]
   ```

### Cobertura de Fines de Semana

- Fines de semana: SIN cobertura en vivo (fase de lanzamiento)
- Auto-respuestas activas 24/7
- Agente on-call para emergencias (rotacion semanal): Solo responde a tickets marcados como "Urgente" por el sistema
- Revisar los sabados/domingos si hay quejas de retiros bloqueados o caidas de plataforma (15 min de revision cada dia)

### Cobertura Futura (cuando el equipo crezca)

- Agente 3: Cubrir turno nocturno o fines de semana
- Agente 4: Soporte en portugues para Brasil (mercado clave con PIX)
- Objetivo a 6 meses: cobertura 24/5 (lunes a viernes, todo el dia)

---

## 2. Configuracion de Intercom

### 2.1 Auto-Respuestas Fuera de Horario

**Configurar en:** Intercom > Settings > Messenger > Office Hours

**Mensaje fuera de horario - Espanol:**
```
Hola! Gracias por contactar a NEOMAAA.

Nuestro equipo de soporte esta disponible de lunes a viernes de 8:00 AM a 4:00 PM (hora de Colombia).

Tu mensaje es importante para nosotros. Un agente te respondera en cuanto estemos en linea.

Si tu consulta es urgente, por favor incluye tu numero de cuenta MT5 y una descripcion detallada del problema.

Tiempo estimado de respuesta: dentro de las proximas horas habiles.
```

**Mensaje fuera de horario - Ingles:**
```
Hello! Thank you for contacting NEOMAAA.

Our support team is available Monday to Friday from 8:00 AM to 4:00 PM (GMT+4 Dubai time).

Your message is important to us. An agent will respond as soon as we are back online.

If your inquiry is urgent, please include your MT5 account number and a detailed description of the issue.

Estimated response time: within the next business hours.
```

### 2.2 Reglas de Routing (Enrutamiento)

**Configurar en:** Intercom > Settings > Workflows

**Regla 1: Idioma Espanol**
- Condicion: Browser language = Spanish OR Country in [Mexico, Colombia, Chile, Peru, Argentina, Ecuador, Bolivia, Paraguay, Uruguay, Venezuela, Guatemala, Honduras, El Salvador, Costa Rica, Panama, Dominican Republic, Nicaragua, Cuba]
- Accion: Asignar a Agente 1
- Tag automatico: `lang:es`

**Regla 2: Idioma Ingles (y todo lo demas)**
- Condicion: Browser language = English OR NOT matched by Regla 1
- Accion: Asignar a Agente 2
- Tag automatico: `lang:en`

**Regla 3: Fuera de horario**
- Condicion: Outside business hours
- Accion: Enviar auto-respuesta, marcar como "Pendiente", no asignar
- Al siguiente turno: tickets se distribuyen segun Regla 1/2

**Regla 4: VIP / Alto Valor**
- Condicion: Custom attribute "account_type" = "Institutional" OR "total_deposits" > $10,000
- Accion: Tag `vip`, prioridad Alta, notificacion push al agente

### 2.3 Sistema de Tags (Etiquetas)

Cada ticket debe tener MINIMO un tag de cada categoria:

**Por Tipo de Consulta:**
| Tag | Uso |
|-----|-----|
| `kyc` | Problemas de verificacion, documentos, Sumsub |
| `deposit` | Depositos, metodos de pago, fondeo |
| `withdrawal` | Retiros, tiempos de procesamiento |
| `mt5-platform` | Problemas con MT5, login, ejecucion |
| `mt5-setup` | Instalacion, configuracion, descarga |
| `account-type` | Preguntas sobre tipos de cuenta |
| `trading` | Preguntas sobre spreads, apalancamiento, horarios |
| `complaint` | Quejas formales |
| `general` | Consultas generales |
| `ib-affiliate` | Introducing Brokers / Afiliados |
| `copy-trading` | Copy trading, MAM, PAMM |
| `swap-free` | Solicitudes de cuenta islamica |

**Por Idioma:**
| Tag | Uso |
|-----|-----|
| `lang:es` | Espanol |
| `lang:en` | Ingles |
| `lang:pt` | Portugues |
| `lang:ar` | Arabe |

**Por Prioridad:**
| Tag | Uso |
|-----|-----|
| `priority:urgent` | Dinero en riesgo, plataforma caida |
| `priority:high` | Retiros pendientes, KYC bloqueando operacion |
| `priority:medium` | Consultas operativas normales |
| `priority:low` | Preguntas informativas, pre-registro |

**Por Estado:**
| Tag | Uso |
|-----|-----|
| `escalated` | Ticket escalado a L2/L3 |
| `waiting-client` | Esperando respuesta del cliente |
| `waiting-internal` | Esperando respuesta interna (Susana, Pepe, Finance) |
| `vip` | Cliente de alto valor |
| `restricted-country` | Contacto desde pais restringido |

### 2.4 Niveles de Prioridad

| Prioridad | Criterio | SLA Primera Respuesta | Ejemplo |
|-----------|----------|----------------------|---------|
| **Urgente** | Dinero del cliente en riesgo, plataforma completamente inaccesible | 15 minutos | Deposito no acreditado >24h, no puede cerrar posicion abierta |
| **Alta** | Impide operar pero sin perdida financiera inmediata | 30 minutos | KYC rechazado, MT5 no conecta, retiro pendiente >48h |
| **Media** | Operativo pero con friccion | 2 horas | Pregunta sobre metodo de deposito, como cambiar apalancamiento |
| **Baja** | Informativo, no urgente | 4 horas | Pregunta sobre tipos de cuenta, horarios de trading, preguntas previas a registro |

### 2.5 Atributos Custom en Intercom

Configurar estos campos para cada contacto:

| Campo | Tipo | Fuente |
|-------|------|--------|
| `mt5_account_id` | String | Manual / CRM sync |
| `account_type` | Dropdown: Cent, Standard, Raw, Institutional | CRM sync |
| `kyc_status` | Dropdown: Pending, Verified, Rejected | Sumsub sync |
| `total_deposits` | Number | CRM sync |
| `country` | String | Auto-detect + manual |
| `language` | String | Auto-detect |
| `assigned_sales` | String | CRM sync |
| `vip` | Boolean | Auto-rule |

---

## 3. Matriz de Escalacion

### Regla de Oro
> **El agente de soporte resuelve lo que puede en Level 1. Si no puede resolver en 15 minutos o la consulta requiere acceso/autorizacion que no tiene, escala inmediatamente. NUNCA inventa respuestas.**

### Matriz Completa

| Tipo de Problema | Level 1 - Soporte | Level 2 - Escalar a | Level 3 - Principals | Tiempo Max en L1 |
|---|---|---|---|---|
| **KYC: Documento rechazado** | Explicar motivo del rechazo, guiar sobre documento correcto, verificar en Sumsub | Susana (Compliance) | Principals | 15 min |
| **KYC: Demora en aprobacion** | Verificar estado en Sumsub, dar timeframe estimado | Susana (Compliance) | Principals | 10 min |
| **KYC: Pais restringido** | Informar educadamente que no podemos servir esa jurisdiccion (usar canned response) | NO escalar | - | Inmediato |
| **KYC: PEP / Alerta AML** | NO responder detalles. Documentar y escalar inmediatamente | Susana (Compliance) | Principals | Inmediato |
| **Deposito: No acreditado** | Verificar estado en el panel de PSP, verificar si el monto y metodo coinciden | Finance Manager | Principals | 15 min |
| **Deposito: Metodo no disponible** | Confirmar metodos disponibles para su pais, ofrecer alternativas | Finance Manager (si es error del sistema) | - | 10 min |
| **Deposito: Error en PSP** | Documentar error, captura de pantalla, informar al cliente que se investiga | Finance Manager | Principals | 10 min |
| **Retiro: Demora >24h habiles** | Verificar estado, informar tiempo de procesamiento estandar | Finance Manager + Susana | Principals | 15 min |
| **Retiro: Rechazado** | Verificar motivo (KYC incompleto, metodo diferente al deposito, etc.) | Finance Manager + Susana | Principals | 15 min |
| **MT5: No puede hacer login** | Reset de password, verificar credenciales, verificar servidor correcto | Pepe (Dealing) | - | 15 min |
| **MT5: Plataforma no abre** | Troubleshooting basico (reinstalar, compatibilidad, firewall) | Pepe (Dealing) | - | 15 min |
| **MT5: Orden no se ejecuta** | Verificar horario de mercado, verificar margen disponible, documentar | Pepe (Dealing) | Principals (si es recurrente) | 10 min |
| **MT5: Queja de ejecucion** | Documentar: hora exacta, par, volumen, precio esperado vs ejecutado, captura | Pepe (Dealing) | Principals | Inmediato |
| **MT5: Requote / Slippage** | Documentar detalles completos, NO dar explicaciones tecnicas de ejecucion | Pepe (Dealing) | Principals | Inmediato |
| **Spreads / Comisiones** | Informar spreads tipicos segun tipo de cuenta | Pepe (si cliente reclama discrepancia) | - | 10 min |
| **Apalancamiento** | Explicar apalancamiento por tipo de cuenta | Pepe (si solicita cambio especial) | - | 10 min |
| **Tipo de cuenta** | Responder directamente, comparar opciones | Sales (Franco/Edward/Luis) | - | 5 min |
| **Upgrade de cuenta** | Dar informacion basica, transferir a sales | Sales (Franco/Edward/Luis) | - | 5 min |
| **Swap-free / Cuenta islamica** | Informar requisitos, documentar solicitud | Susana (aprobacion) + Pepe (configuracion) | - | 10 min |
| **Copy trading** | Guia basica de configuracion | Pepe (configuracion tecnica) | - | 15 min |
| **IB / Afiliados** | Informacion basica del programa | Sales (Franco/Edward/Luis) | - | 5 min |
| **Queja regulatoria** | **Documentar TODO. NO responder al fondo.** Solo confirmar recepcion. | Susana (Compliance) | Principals | **Inmediato** |
| **Amenaza legal** | **Documentar TODO. NO responder al fondo.** Solo confirmar recepcion. | Susana (Compliance) | Principals | **Inmediato** |
| **Solicitud de datos personales (GDPR/similar)** | Documentar solicitud exacta | Susana (Compliance) | Principals | Inmediato |

### Contactos de Escalacion

| Persona | Rol | Canal de Escalacion | Tiempo de Respuesta Esperado |
|---------|-----|---------------------|------------------------------|
| **Susana** | Compliance Officer | Mensaje directo en Slack + email | 1 hora (horario laboral) |
| **Pepe** | Dealing Lead (20 anos de exp.) | Mensaje directo en Slack | 30 min (horario de mercado) |
| **Finance Manager** | Finanzas | Slack canal #finance | 2 horas |
| **Franco** | Sales | Slack canal #sales | 1 hora |
| **Edward** | Sales | Slack canal #sales | 1 hora |
| **Luis** | Sales | Slack canal #sales | 1 hora |
| **Principals** | Direccion | Solo via Susana o Pepe | Caso a caso |

### Proceso de Escalacion

1. **Agente agrega nota interna** en el ticket de Intercom con:
   - Resumen del problema
   - Que ya se intento
   - Que informacion se tiene del cliente
   - Por que se escala
2. **Agente envia mensaje por Slack** al canal o persona correspondiente con el link al ticket
3. **Agente informa al cliente** que su caso ha sido escalado al equipo especializado
4. **Agente agrega tag** `escalated` al ticket
5. **Agente hace seguimiento** a las 2 horas si no ha recibido respuesta del L2

### Lo que un agente de soporte NUNCA debe hacer

- Dar consejos de trading o recomendar operaciones
- Prometer tiempos exactos de procesamiento de retiros
- Discutir la politica A-Book/B-Book de la empresa
- Dar informacion sobre la estructura interna de la empresa
- Responder a quejas regulatorias con argumentos (solo documentar y escalar)
- Garantizar que un deposito se va a acreditar
- Modificar configuraciones de MT5 sin autorizacion de Pepe
- Aprobar o rechazar KYCs (eso es Susana / Sumsub)
- Compartir informacion de un cliente con otro cliente
- Ofrecer descuentos o condiciones especiales sin aprobacion de Sales/Principals

---

## 4. SLAs y Tiempos de Respuesta

### Primera Respuesta

| Prioridad | SLA Primera Respuesta | Objetivo Interno |
|-----------|----------------------|-----------------|
| Urgente | 15 minutos | 10 minutos |
| Alta | 30 minutos | 20 minutos |
| Media | 2 horas | 1 hora |
| Baja | 4 horas | 2 horas |

### Tiempo de Resolucion

| Prioridad | SLA Resolucion | Notas |
|-----------|---------------|-------|
| Urgente | 4 horas | Si requiere L2, el L2 tiene 2h para responder |
| Alta | 12 horas habiles | Puede requerir 1-2 seguimientos |
| Media | 24 horas habiles | Resolucion normal |
| Baja | 48 horas habiles | Informativo, no bloquea al cliente |

### Tiempo de Escalacion

| Condicion | Accion |
|-----------|--------|
| Agente no puede resolver en 15 min | Escalar a L2 correspondiente |
| L2 no responde en 2 horas | Agente hace follow-up por Slack + email |
| L2 no responde en 4 horas | Agente escala a Principals via Susana |
| Ticket urgente sin resolucion en 4h | Notificar a Principals |
| Cliente escribe 3+ veces sin respuesta | Auto-tag `priority:urgent` |

### SLAs por Canal

| Canal | SLA Primera Respuesta |
|-------|----------------------|
| Chat en vivo (Intercom Messenger) | 5 minutos durante horario |
| Email / formulario | Segun prioridad (ver tabla arriba) |
| Redes sociales (si se integran) | 1 hora |

---

## 5. Respuestas Predefinidas (Canned Responses)

### Instrucciones de Uso
- Copiar la respuesta y **personalizarla** antes de enviar (nombre del cliente, numero de cuenta, etc.)
- Los campos entre `{{corchetes}}` deben reemplazarse con datos reales
- NUNCA enviar una respuesta predefinida sin revisarla primero
- Si la respuesta no aplica exactamente, adaptarla

---

### CR-01: Saludo Inicial

**ES:**
```
Hola {{nombre}}! Bienvenido/a al soporte de NEOMAAA. Mi nombre es {{agente}} y estare ayudandote hoy.

Por favor, cuentame en que puedo asistirte. Si tienes un numero de cuenta MT5, compartelo para poder revisar tu caso mas rapido.
```

**EN:**
```
Hello {{name}}! Welcome to NEOMAAA support. My name is {{agent}} and I'll be assisting you today.

Please let me know how I can help. If you have an MT5 account number, please share it so I can look into your case faster.
```

---

### CR-02: Guia de KYC - Documentos Requeridos

**ES:**
```
Hola {{nombre}}, para completar tu verificacion KYC necesitas enviar los siguientes documentos:

1. Documento de identidad (uno de los siguientes):
   - Pasaporte (pagina con la foto)
   - Documento nacional de identidad (ambos lados)
   - Licencia de conducir (ambos lados)

2. Comprobante de domicilio (maximo 3 meses de antiguedad):
   - Factura de servicios (luz, agua, gas, internet)
   - Estado de cuenta bancario
   - Documento oficial del gobierno con tu direccion

Requisitos de las imagenes:
- Fotos claras, sin cortes en los bordes
- Sin flash ni reflejos
- Formato: JPG, PNG o PDF
- Tamano maximo: 10MB por archivo

Puedes subir tus documentos directamente en el portal del cliente en la seccion "Verificacion".

Si necesitas ayuda con el proceso, estoy aqui para guiarte paso a paso.
```

**EN:**
```
Hello {{name}}, to complete your KYC verification you need to submit the following documents:

1. Proof of Identity (one of the following):
   - Passport (photo page)
   - National ID card (both sides)
   - Driver's license (both sides)

2. Proof of Address (issued within the last 3 months):
   - Utility bill (electricity, water, gas, internet)
   - Bank statement
   - Government-issued document showing your address

Image requirements:
- Clear photos, no cut edges
- No flash or glare
- Format: JPG, PNG or PDF
- Max size: 10MB per file

You can upload your documents directly in the client portal under the "Verification" section.

If you need help with the process, I'm here to guide you step by step.
```

---

### CR-03: KYC Rechazado - Documento Ilegible

**ES:**
```
Hola {{nombre}}, revisamos tu documento de verificacion y lamentablemente no pudimos aprobarlo porque la imagen no es lo suficientemente clara.

Motivo del rechazo: {{motivo_especifico}}

Para resolverlo, por favor:
- Toma una nueva foto con buena iluminacion
- Asegurate de que todo el documento sea visible (sin cortes en los bordes)
- Evita reflejos de flash
- El documento debe estar sobre una superficie oscura y plana

Puedes subir el nuevo documento en tu portal del cliente. Una vez que lo recibamos, lo revisaremos lo antes posible.
```

**EN:**
```
Hello {{name}}, we reviewed your verification document and unfortunately we were unable to approve it because the image is not clear enough.

Reason for rejection: {{specific_reason}}

To resolve this, please:
- Take a new photo with good lighting
- Make sure the entire document is visible (no cut edges)
- Avoid flash glare
- Place the document on a dark, flat surface

You can upload the new document in your client portal. Once we receive it, we'll review it as soon as possible.
```

---

### CR-04: KYC Aprobado

**ES:**
```
Hola {{nombre}}! Tu verificacion KYC ha sido aprobada exitosamente.

Tu cuenta esta completamente verificada y puedes:
- Realizar depositos y retiros sin restricciones
- Operar en tu cuenta MT5

Si necesitas ayuda con tu primer deposito o con la configuracion de tu plataforma, no dudes en escribirnos.

Bienvenido/a a NEOMAAA!
```

**EN:**
```
Hello {{name}}! Your KYC verification has been successfully approved.

Your account is now fully verified and you can:
- Make deposits and withdrawals without restrictions
- Trade on your MT5 account

If you need help with your first deposit or platform setup, don't hesitate to reach out.

Welcome to NEOMAAA!
```

---

### CR-05: Instrucciones de Deposito - General

**ES:**
```
Hola {{nombre}}, aqui tienes las instrucciones para realizar un deposito:

1. Inicia sesion en tu portal del cliente
2. Ve a la seccion "Depositar"
3. Selecciona tu metodo de pago preferido
4. Ingresa el monto a depositar
5. Sigue las instrucciones del procesador de pago

Depositos minimos por tipo de cuenta:
- Cuenta Cent: $5 USD
- Cuenta Standard: $50 USD
- Cuenta Raw: $500 USD
- Cuenta Institutional: $50,000 USD

Metodos disponibles en tu region:
{{listar_metodos_disponibles}}

La mayoria de depositos se acreditan en minutos. Si tu deposito no aparece en 30 minutos, por favor contactanos con el comprobante de pago.
```

**EN:**
```
Hello {{name}}, here are the instructions to make a deposit:

1. Log in to your client portal
2. Go to the "Deposit" section
3. Select your preferred payment method
4. Enter the amount to deposit
5. Follow the payment processor instructions

Minimum deposits by account type:
- Cent Account: $5 USD
- Standard Account: $50 USD
- Raw Account: $500 USD
- Institutional Account: $50,000 USD

Available methods in your region:
{{list_available_methods}}

Most deposits are credited within minutes. If your deposit doesn't appear within 30 minutes, please contact us with your payment receipt.
```

---

### CR-06: Deposito con PIX (Brasil/LATAM)

**ES:**
```
Hola {{nombre}}, para depositar con PIX:

1. Inicia sesion en tu portal del cliente
2. Ve a "Depositar" > selecciona "PIX"
3. Se generara un codigo QR o una clave PIX
4. Abre la app de tu banco y escanea el QR o copia la clave
5. Confirma el pago en tu app bancaria

El deposito se acredita en pocos minutos. Si en 30 minutos no ves el saldo reflejado, envianos una captura del comprobante de tu banco y tu numero de cuenta MT5.
```

**EN:**
```
Hello {{name}}, to deposit with PIX:

1. Log in to your client portal
2. Go to "Deposit" > select "PIX"
3. A QR code or PIX key will be generated
4. Open your bank app and scan the QR or copy the key
5. Confirm the payment in your banking app

The deposit is credited within minutes. If after 30 minutes you don't see the balance reflected, please send us a screenshot of your bank receipt and your MT5 account number.
```

---

### CR-07: Deposito con Crypto (USDT/BTC)

**ES:**
```
Hola {{nombre}}, para depositar con criptomonedas:

1. Inicia sesion en tu portal del cliente
2. Ve a "Depositar" > selecciona "Crypto" > elige la criptomoneda (ej: USDT)
3. Se mostrara una direccion de wallet y la red correspondiente
4. IMPORTANTE: Verifica que estas enviando por la RED CORRECTA (ej: TRC20, ERC20, BEP20)
5. Copia la direccion exacta y realiza la transferencia desde tu wallet

ATENCION:
- Enviar fondos por una red incorrecta puede resultar en perdida de fondos
- El deposito minimo para crypto es {{monto_minimo}}
- Tiempo de acreditacion: depende de confirmaciones de la red (usualmente 10-30 minutos)

Si despues de 1 hora no ves tu deposito, envianos el hash de la transaccion (TXID) y tu numero de cuenta MT5.
```

**EN:**
```
Hello {{name}}, to deposit with cryptocurrency:

1. Log in to your client portal
2. Go to "Deposit" > select "Crypto" > choose the cryptocurrency (e.g., USDT)
3. A wallet address and the corresponding network will be displayed
4. IMPORTANT: Verify you are sending on the CORRECT NETWORK (e.g., TRC20, ERC20, BEP20)
5. Copy the exact address and make the transfer from your wallet

PLEASE NOTE:
- Sending funds on the wrong network may result in loss of funds
- Minimum crypto deposit is {{minimum_amount}}
- Processing time: depends on network confirmations (usually 10-30 minutes)

If after 1 hour you don't see your deposit, please send us the transaction hash (TXID) and your MT5 account number.
```

---

### CR-08: Deposito con PSE (Colombia)

**ES:**
```
Hola {{nombre}}, para depositar con PSE:

1. Inicia sesion en tu portal del cliente
2. Ve a "Depositar" > selecciona "PSE"
3. Selecciona tu banco
4. Ingresa el monto a depositar
5. Seras redirigido a la pagina de tu banco para autorizar el pago
6. Confirma la transaccion con tu clave bancaria

El deposito se acredita generalmente en 15-30 minutos. Si tu banco confirma el debito pero no ves el saldo en tu cuenta despues de 1 hora, contactanos con el comprobante de PSE y tu numero de cuenta MT5.
```

---

### CR-09: Deposito con OXXO (Mexico)

**ES:**
```
Hola {{nombre}}, para depositar con OXXO:

1. Inicia sesion en tu portal del cliente
2. Ve a "Depositar" > selecciona "OXXO"
3. Se generara un numero de referencia de pago
4. Ve a cualquier tienda OXXO y proporciona el numero de referencia al cajero
5. Realiza el pago en efectivo
6. Guarda tu ticket de pago

IMPORTANTE:
- El deposito puede tardar entre 1 y 24 horas en acreditarse
- El monto maximo por transaccion en OXXO es de $10,000 MXN
- Guarda siempre tu comprobante de pago

Si despues de 24 horas tu deposito no aparece, envianos una foto del ticket de OXXO y tu numero de cuenta MT5.
```

---

### CR-10: Deposito con Nequi (Colombia)

**ES:**
```
Hola {{nombre}}, para depositar con Nequi:

1. Inicia sesion en tu portal del cliente
2. Ve a "Depositar" > selecciona "Nequi"
3. Sigue las instrucciones para vincular tu cuenta Nequi o usar el codigo QR
4. Confirma el pago desde tu app de Nequi
5. Guarda el comprobante de la transaccion

El deposito generalmente se acredita en minutos. Si despues de 1 hora no se refleja, contactanos con el comprobante y tu numero de cuenta MT5.
```

---

### CR-11: Estado de Retiro

**ES:**
```
Hola {{nombre}}, gracias por tu consulta sobre tu retiro.

He verificado el estado de tu solicitud:

- Numero de retiro: {{numero_retiro}}
- Monto: {{monto}}
- Estado actual: {{estado}}
- Fecha de solicitud: {{fecha}}

{{SI ESTA EN PROCESO:}}
Tu retiro esta siendo procesado. Los retiros se procesan en un plazo de 1-3 dias habiles dependiendo del metodo de pago. Retiros por crypto suelen ser mas rapidos (24 horas).

{{SI YA FUE PROCESADO:}}
Tu retiro fue procesado el {{fecha_proceso}}. Si aun no lo ves reflejado en tu cuenta/wallet, ten en cuenta que el banco/red puede tomar tiempo adicional. Si despues de {{plazo}} no lo recibes, por favor contactanos nuevamente.

Cualquier duda adicional, estoy aqui para ayudarte.
```

**EN:**
```
Hello {{name}}, thank you for your inquiry about your withdrawal.

I've checked the status of your request:

- Withdrawal number: {{withdrawal_number}}
- Amount: {{amount}}
- Current status: {{status}}
- Request date: {{date}}

{{IF IN PROCESS:}}
Your withdrawal is being processed. Withdrawals are processed within 1-3 business days depending on the payment method. Crypto withdrawals are usually faster (24 hours).

{{IF ALREADY PROCESSED:}}
Your withdrawal was processed on {{process_date}}. If you haven't seen it reflected in your account/wallet yet, please note that the bank/network may take additional time. If after {{timeframe}} you haven't received it, please contact us again.

Any other questions, I'm here to help.
```

---

### CR-12: Reset de Password MT5

**ES:**
```
Hola {{nombre}}, entiendo que necesitas resetear tu contrasena de MT5. Aqui te explico como hacerlo:

Opcion 1 - Desde el portal del cliente:
1. Inicia sesion en tu portal del cliente
2. Ve a "Mis Cuentas" > selecciona tu cuenta MT5
3. Haz clic en "Cambiar contrasena"
4. Ingresa tu nueva contrasena y confirma

Opcion 2 - Si no puedes acceder al portal:
Necesitare verificar tu identidad primero. Por favor proporcioname:
- Tu numero de cuenta MT5
- El email registrado en tu cuenta
- Tu nombre completo

Una vez verificada tu identidad, generare una nueva contrasena y te la enviaremos al email registrado.

NOTA: Recuerda que MT5 tiene dos contrasenas:
- Contrasena principal (para operar)
- Contrasena de inversor (solo lectura)
Asegurate de estar usando la contrasena correcta.
```

**EN:**
```
Hello {{name}}, I understand you need to reset your MT5 password. Here's how:

Option 1 - From the client portal:
1. Log in to your client portal
2. Go to "My Accounts" > select your MT5 account
3. Click "Change Password"
4. Enter your new password and confirm

Option 2 - If you can't access the portal:
I'll need to verify your identity first. Please provide:
- Your MT5 account number
- The email registered on your account
- Your full name

Once your identity is verified, I'll generate a new password and send it to your registered email.

NOTE: Remember that MT5 has two passwords:
- Main password (for trading)
- Investor password (read-only)
Make sure you're using the correct one.
```

---

### CR-13: Problemas de Login en MT5

**ES:**
```
Hola {{nombre}}, lamento que tengas problemas para iniciar sesion en MT5. Vamos a solucionarlo:

Verifica lo siguiente:
1. **Servidor correcto**: Asegurate de estar conectado al servidor NEOMAAA correcto:
   - Cuentas Live: {{nombre_servidor_live}}
   - Cuentas Demo: {{nombre_servidor_demo}}

2. **Credenciales correctas**:
   - Numero de cuenta (login): Es un numero, no tu email
   - Contrasena: Distingue mayusculas y minusculas
   - Asegurate de no tener espacios antes o despues de la contrasena

3. **Conexion a internet**: Verifica que tengas conexion estable

4. **Version de MT5**: Asegurate de tener la ultima version instalada

Si despues de verificar todo esto sigues sin poder acceder, proporcioname tu numero de cuenta MT5 y el mensaje de error exacto que ves, y te ayudare a resolverlo.
```

**EN:**
```
Hello {{name}}, sorry to hear you're having trouble logging into MT5. Let's fix this:

Please verify the following:
1. **Correct server**: Make sure you're connected to the correct NEOMAAA server:
   - Live accounts: {{live_server_name}}
   - Demo accounts: {{demo_server_name}}

2. **Correct credentials**:
   - Account number (login): It's a number, not your email
   - Password: It's case-sensitive
   - Make sure there are no spaces before or after the password

3. **Internet connection**: Verify you have a stable connection

4. **MT5 version**: Make sure you have the latest version installed

If after checking all this you still can't access your account, please provide your MT5 account number and the exact error message you see, and I'll help you resolve it.
```

---

### CR-14: Horarios de Trading

**ES:**
```
Hola {{nombre}}, aqui tienes los horarios de trading:

**Forex (Pares de divisas):**
- Abierto: Domingo 22:00 UTC a Viernes 22:00 UTC
- Disponible 24 horas durante dias habiles

**Metales (Oro, Plata):**
- Lunes a Viernes: 01:00 - 23:59 UTC
- Pausa diaria: 00:00 - 01:00 UTC

**Indices:**
- Varia segun el indice. Los principales (US30, SPX500, NAS100):
  - Lunes a Viernes con pausas diarias cortas

**Criptomonedas (si estan disponibles):**
- 24/7 en la mayoria de los casos

**Energia (Petroleo):**
- Lunes a Viernes: 01:00 - 22:00 UTC

NOTA: Los horarios pueden variar ligeramente. Para los horarios exactos de cada instrumento, haz clic derecho sobre el instrumento en MT5 > "Especificacion" > "Sesion de trading".

Tambien ten en cuenta que los spreads pueden ampliarse durante la apertura/cierre de mercados y en momentos de alta volatilidad.
```

**EN:**
```
Hello {{name}}, here are the trading hours:

**Forex (Currency Pairs):**
- Open: Sunday 22:00 UTC to Friday 22:00 UTC
- Available 24 hours during business days

**Metals (Gold, Silver):**
- Monday to Friday: 01:00 - 23:59 UTC
- Daily break: 00:00 - 01:00 UTC

**Indices:**
- Varies by index. Major indices (US30, SPX500, NAS100):
  - Monday to Friday with short daily breaks

**Cryptocurrencies (if available):**
- 24/7 in most cases

**Energy (Oil):**
- Monday to Friday: 01:00 - 22:00 UTC

NOTE: Hours may vary slightly. For exact hours of each instrument, right-click the instrument in MT5 > "Specification" > "Trading session".

Also note that spreads may widen during market open/close and during high volatility periods.
```

---

### CR-15: Informacion de Spreads

**ES:**
```
Hola {{nombre}}, aqui tienes la informacion de spreads segun tipo de cuenta:

| Par / Instrumento | Cuenta Cent | Cuenta Standard | Cuenta Raw | Institutional |
|---|---|---|---|---|
| EUR/USD | Desde 1.5 pips | Desde 1.2 pips | Desde 0.0 pips + comision | Desde 0.0 pips + comision |
| GBP/USD | Desde 1.8 pips | Desde 1.5 pips | Desde 0.2 pips + comision | Desde 0.0 pips + comision |
| XAU/USD (Oro) | Desde 35 puntos | Desde 25 puntos | Desde 10 puntos + comision | Desde 5 puntos + comision |

NOTA:
- Los spreads son variables y dependen de las condiciones del mercado
- Las cuentas Raw e Institutional tienen comision por lote: {{comision_por_lote}}
- Los spreads pueden ampliarse durante noticias de alto impacto y fuera del horario de mayor liquidez
- Para ver los spreads en tiempo real, abre MT5 y revisa la ventana "Market Watch"

Si necesitas mas detalles sobre spreads de un instrumento especifico, con gusto te lo consulto.
```

**EN:**
```
Hello {{name}}, here's the spread information by account type:

| Pair / Instrument | Cent Account | Standard Account | Raw Account | Institutional |
|---|---|---|---|---|
| EUR/USD | From 1.5 pips | From 1.2 pips | From 0.0 pips + commission | From 0.0 pips + commission |
| GBP/USD | From 1.8 pips | From 1.5 pips | From 0.2 pips + commission | From 0.0 pips + commission |
| XAU/USD (Gold) | From 35 points | From 25 points | From 10 points + commission | From 5 points + commission |

NOTE:
- Spreads are variable and depend on market conditions
- Raw and Institutional accounts have commission per lot: {{commission_per_lot}}
- Spreads may widen during high-impact news and outside peak liquidity hours
- To see real-time spreads, open MT5 and check the "Market Watch" window

If you need more details on spreads for a specific instrument, I'm happy to look it up for you.
```

---

### CR-16: Explicacion de Apalancamiento

**ES:**
```
Hola {{nombre}}, el apalancamiento disponible en NEOMAAA depende del tipo de cuenta:

| Tipo de Cuenta | Apalancamiento Maximo |
|---|---|
| Cent | Hasta 1:1000 |
| Standard | Hasta 1:500 |
| Raw | Hasta 1:500 |
| Institutional | Hasta 1:200 |

Que es el apalancamiento?
El apalancamiento te permite operar con un monto mayor al que tienes depositado. Por ejemplo, con apalancamiento 1:500 y un deposito de $100, puedes abrir posiciones por hasta $50,000.

IMPORTANTE:
- Mayor apalancamiento = mayor potencial de ganancia PERO tambien mayor riesgo de perdida
- Puedes perder mas de tu deposito inicial si no usas stop-loss
- Te recomendamos usar gestion de riesgo adecuada y nunca arriesgar mas de lo que puedes permitirte perder

Si deseas cambiar tu apalancamiento, puedes hacerlo desde tu portal del cliente en "Mis Cuentas" > "Configuracion" o contactarnos para que te ayudemos.
```

**EN:**
```
Hello {{name}}, the leverage available at NEOMAAA depends on your account type:

| Account Type | Maximum Leverage |
|---|---|
| Cent | Up to 1:1000 |
| Standard | Up to 1:500 |
| Raw | Up to 1:500 |
| Institutional | Up to 1:200 |

What is leverage?
Leverage allows you to trade with a larger amount than your deposit. For example, with 1:500 leverage and a $100 deposit, you can open positions worth up to $50,000.

IMPORTANT:
- Higher leverage = higher profit potential BUT also higher risk of loss
- You can lose more than your initial deposit if you don't use stop-loss
- We recommend using proper risk management and never risking more than you can afford to lose

If you'd like to change your leverage, you can do so from your client portal under "My Accounts" > "Settings" or contact us and we'll help you.
```

---

### CR-17: Comparacion de Tipos de Cuenta

**ES:**
```
Hola {{nombre}}, aqui tienes la comparacion de nuestros tipos de cuenta:

| Caracteristica | Cent | Standard | Raw | Institutional |
|---|---|---|---|---|
| Deposito minimo | $5 | $50 | $500 | $50,000 |
| Spreads | Desde 1.5 pips | Desde 1.2 pips | Desde 0.0 pips | Desde 0.0 pips |
| Comision | No | No | Si (por lote) | Si (reducida) |
| Apalancamiento max | 1:1000 | 1:500 | 1:500 | 1:200 |
| Tamano minimo de lote | 0.01 (centavos) | 0.01 | 0.01 | 0.1 |
| Ideal para | Principiantes, poco capital | Traders intermedios | Scalpers, traders activos | Gestores de fondos, alto volumen |
| Plataforma | MT5 | MT5 | MT5 | MT5 |
| Swap-free disponible | Si | Si | Si | Si |
| Copy trading | Si | Si | Si | Si |

Recomendaciones:
- Nuevo en trading? Empieza con Cent ($5)
- Operas regularmente? Standard ($50)
- Haces scalping o necesitas los mejores spreads? Raw ($500)
- Gestionas capital de terceros? Institutional ($50,000)

Si quieres que te recomiende la cuenta ideal para tu estilo de trading, cuentame mas sobre tu experiencia y objetivos.
```

**EN:**
```
Hello {{name}}, here's a comparison of our account types:

| Feature | Cent | Standard | Raw | Institutional |
|---|---|---|---|---|
| Minimum deposit | $5 | $50 | $500 | $50,000 |
| Spreads | From 1.5 pips | From 1.2 pips | From 0.0 pips | From 0.0 pips |
| Commission | No | No | Yes (per lot) | Yes (reduced) |
| Max leverage | 1:1000 | 1:500 | 1:500 | 1:200 |
| Min lot size | 0.01 (cents) | 0.01 | 0.01 | 0.1 |
| Ideal for | Beginners, small capital | Intermediate traders | Scalpers, active traders | Fund managers, high volume |
| Platform | MT5 | MT5 | MT5 | MT5 |
| Swap-free available | Yes | Yes | Yes | Yes |
| Copy trading | Yes | Yes | Yes | Yes |

Recommendations:
- New to trading? Start with Cent ($5)
- Regular trader? Standard ($50)
- Scalping or need the tightest spreads? Raw ($500)
- Managing third-party capital? Institutional ($50,000)

If you'd like a personalized recommendation for your trading style, tell me more about your experience and goals.
```

---

### CR-18: Solicitud de Cuenta Swap-Free (Islamica)

**ES:**
```
Hola {{nombre}}, entendemos que necesitas una cuenta swap-free (islamica).

Para solicitar la conversion de tu cuenta a swap-free, necesitamos:
1. Tu numero de cuenta MT5: {{cuenta}}
2. Confirmacion de que entiendes que en cuentas swap-free:
   - No se cobran ni pagan swaps (intereses nocturnos)
   - Puede aplicar un cargo administrativo en posiciones mantenidas por periodos prolongados
   - Algunas condiciones pueden diferir de las cuentas regulares

Por favor confirma que deseas proceder y nuestro equipo procesara tu solicitud en un plazo de 1-2 dias habiles.
```

**EN:**
```
Hello {{name}}, we understand you need a swap-free (Islamic) account.

To request the conversion of your account to swap-free, we need:
1. Your MT5 account number: {{account}}
2. Confirmation that you understand that on swap-free accounts:
   - No swaps (overnight interest) are charged or paid
   - An administrative fee may apply on positions held for extended periods
   - Some conditions may differ from regular accounts

Please confirm you'd like to proceed and our team will process your request within 1-2 business days.
```

---

### CR-19: Configuracion de Copy Trading

**ES:**
```
Hola {{nombre}}, para configurar el copy trading en NEOMAAA:

Como Seguidor (copiar a otro trader):
1. Inicia sesion en tu portal del cliente
2. Ve a la seccion "Copy Trading"
3. Explora los proveedores de senales disponibles
4. Selecciona al trader que deseas copiar
5. Configura los parametros:
   - Monto a asignar
   - Porcentaje de copia (ej: copiar el 50% del volumen)
   - Stop loss general (recomendado)
6. Activa la copia

Como Proveedor de Senales:
1. Contacta a nuestro equipo para activar tu perfil como proveedor
2. Se requiere un historial minimo de trading
3. Definiras tu comision por rendimiento

NOTA: El copy trading implica riesgos. Rendimientos pasados no garantizan resultados futuros. Asegurate de entender los riesgos antes de copiar a otro trader.

Si necesitas ayuda con la configuracion tecnica, estamos aqui para guiarte.
```

**EN:**
```
Hello {{name}}, to set up copy trading at NEOMAAA:

As a Follower (copy another trader):
1. Log in to your client portal
2. Go to the "Copy Trading" section
3. Browse available signal providers
4. Select the trader you want to copy
5. Configure parameters:
   - Amount to allocate
   - Copy ratio (e.g., copy 50% of volume)
   - Overall stop loss (recommended)
6. Activate copying

As a Signal Provider:
1. Contact our team to activate your provider profile
2. A minimum trading history is required
3. You'll set your performance fee

NOTE: Copy trading involves risks. Past performance does not guarantee future results. Make sure you understand the risks before copying another trader.

If you need help with the technical setup, we're here to guide you.
```

---

### CR-20: Tiempos de Procesamiento de Retiros

**ES:**
```
Hola {{nombre}}, aqui tienes los tiempos de procesamiento de retiros:

| Metodo | Tiempo de Procesamiento | Notas |
|---|---|---|
| Crypto (USDT, BTC, etc.) | 1-24 horas | Generalmente en pocas horas |
| Transferencia bancaria | 2-5 dias habiles | Depende del banco receptor |
| Tarjeta de credito/debito | 3-5 dias habiles | Depende del banco emisor |
| E-wallets (Skrill, Neteller, etc.) | 1-2 dias habiles | - |
| Metodos locales (PIX, PSE, etc.) | 1-3 dias habiles | Depende del procesador |

IMPORTANTE:
- Los retiros se procesan al mismo metodo utilizado para el deposito (politica AML)
- Tu cuenta debe estar completamente verificada (KYC aprobado)
- Los retiros se procesan en dias habiles (lunes a viernes)
- El monto minimo de retiro depende del metodo seleccionado

Si tu retiro lleva mas tiempo del indicado, contactanos con tu numero de retiro y lo revisaremos de inmediato.
```

**EN:**
```
Hello {{name}}, here are the withdrawal processing times:

| Method | Processing Time | Notes |
|---|---|---|
| Crypto (USDT, BTC, etc.) | 1-24 hours | Usually within a few hours |
| Bank wire transfer | 2-5 business days | Depends on receiving bank |
| Credit/debit card | 3-5 business days | Depends on issuing bank |
| E-wallets (Skrill, Neteller, etc.) | 1-2 business days | - |
| Local methods (PIX, PSE, etc.) | 1-3 business days | Depends on processor |

IMPORTANT:
- Withdrawals are processed to the same method used for deposit (AML policy)
- Your account must be fully verified (KYC approved)
- Withdrawals are processed on business days (Monday to Friday)
- Minimum withdrawal amount depends on the selected method

If your withdrawal is taking longer than indicated, contact us with your withdrawal number and we'll review it immediately.
```

---

### CR-21: Acuse de Recibo de Queja

**ES:**
```
Hola {{nombre}}, hemos recibido tu queja y queremos que sepas que la tomamos con total seriedad.

Numero de referencia de tu queja: {{numero_referencia}}

Tu caso ha sido registrado y sera revisado por nuestro equipo especializado. Te contactaremos con una respuesta en un plazo maximo de {{plazo}} dias habiles.

Si necesitas agregar informacion adicional a tu queja, responde a este mensaje haciendo referencia al numero {{numero_referencia}}.

Agradecemos tu paciencia y te aseguramos que trabajaremos para resolver tu situacion de la mejor manera posible.
```

**EN:**
```
Hello {{name}}, we have received your complaint and want you to know we take it very seriously.

Your complaint reference number: {{reference_number}}

Your case has been logged and will be reviewed by our specialized team. We will contact you with a response within a maximum of {{timeframe}} business days.

If you need to add any additional information to your complaint, please reply to this message referencing number {{reference_number}}.

We appreciate your patience and assure you we will work to resolve your situation in the best possible way.
```

---

### CR-22: Auto-Respuesta Fuera de Horario

**ES:**
```
Hola! Gracias por contactar a NEOMAAA.

En este momento nuestro equipo de soporte esta fuera de horario. Nuestros horarios de atencion son:

Lunes a Viernes:
- Soporte en espanol: 8:00 AM - 4:00 PM (hora Colombia/Mexico)
- Soporte en ingles: 8:00 AM - 4:00 PM (hora Dubai)

Tu mensaje ha sido registrado y un agente te respondera en cuanto estemos disponibles.

Si tu consulta es urgente (deposito no acreditado, no puedes cerrar una posicion), por favor incluye:
- Tu numero de cuenta MT5
- Descripcion detallada del problema
- Capturas de pantalla si aplica

Esto nos ayudara a atenderte mas rapido cuando volvamos.
```

**EN:**
```
Hello! Thank you for contacting NEOMAAA.

Our support team is currently offline. Our business hours are:

Monday to Friday:
- Spanish support: 8:00 AM - 4:00 PM (Colombia/Mexico time)
- English support: 8:00 AM - 4:00 PM (Dubai time)

Your message has been logged and an agent will respond as soon as we're available.

If your inquiry is urgent (deposit not credited, unable to close a position), please include:
- Your MT5 account number
- Detailed description of the issue
- Screenshots if applicable

This will help us assist you faster when we're back.
```

---

### CR-23: Transferencia entre Cuentas

**ES:**
```
Hola {{nombre}}, para transferir fondos entre tus cuentas MT5:

1. Inicia sesion en tu portal del cliente
2. Ve a "Transferencia interna"
3. Selecciona la cuenta de origen
4. Selecciona la cuenta de destino
5. Ingresa el monto a transferir
6. Confirma la transferencia

NOTAS:
- Las transferencias internas son instantaneas
- Ambas cuentas deben estar a tu nombre
- Si las cuentas estan en diferentes divisas, se aplicara el tipo de cambio vigente
- No hay comision por transferencias internas

Si no ves la opcion de transferencia o tienes algun error, proporcioname los numeros de ambas cuentas y te ayudo.
```

**EN:**
```
Hello {{name}}, to transfer funds between your MT5 accounts:

1. Log in to your client portal
2. Go to "Internal Transfer"
3. Select the source account
4. Select the destination account
5. Enter the amount to transfer
6. Confirm the transfer

NOTES:
- Internal transfers are instant
- Both accounts must be under your name
- If accounts are in different currencies, the current exchange rate will apply
- There is no fee for internal transfers

If you don't see the transfer option or encounter any error, please provide both account numbers and I'll help you.
```

---

### CR-24: Links de Descarga de Plataforma

**ES:**
```
Hola {{nombre}}, aqui tienes los links de descarga de MetaTrader 5:

- Windows: {{link_windows}}
- MacOS: {{link_mac}}
- iOS (iPhone/iPad): {{link_ios}}
- Android: {{link_android}}
- Web Terminal (sin descarga): {{link_web}}

Pasos de instalacion:
1. Descarga e instala la plataforma
2. Abre MT5 y selecciona "Conectar a una cuenta existente"
3. Busca el servidor: {{nombre_servidor}}
4. Ingresa tu numero de cuenta (login) y contrasena
5. Haz clic en "Conectar"

Si no encuentras nuestro servidor, ve a Archivo > Abrir una cuenta > escribe "NEOMAAA" en el buscador.

Si tienes problemas con la instalacion, cuentame que dispositivo usas y te guio paso a paso.
```

**EN:**
```
Hello {{name}}, here are the MetaTrader 5 download links:

- Windows: {{link_windows}}
- MacOS: {{link_mac}}
- iOS (iPhone/iPad): {{link_ios}}
- Android: {{link_android}}
- Web Terminal (no download): {{link_web}}

Installation steps:
1. Download and install the platform
2. Open MT5 and select "Connect to an existing account"
3. Search for server: {{server_name}}
4. Enter your account number (login) and password
5. Click "Connect"

If you can't find our server, go to File > Open an Account > type "NEOMAAA" in the search box.

If you have trouble installing, let me know which device you're using and I'll guide you step by step.
```

---

### CR-25: Creacion de Cuenta Demo

**ES:**
```
Hola {{nombre}}, para abrir una cuenta demo en NEOMAAA:

1. Ve a nuestro sitio web: {{url_sitio}}
2. Haz clic en "Cuenta Demo" o "Abrir Demo"
3. Completa el formulario de registro con tus datos
4. Selecciona la configuracion de tu demo:
   - Tipo de cuenta: Standard (recomendado para demo)
   - Balance virtual: $10,000 (por defecto)
   - Apalancamiento: 1:500
5. Recibiras tus credenciales de acceso por email

Con la cuenta demo puedes:
- Practicar sin riesgo con dinero virtual
- Probar la plataforma MT5
- Familiarizarte con nuestros instrumentos y condiciones
- Probar estrategias de trading

La cuenta demo no tiene limite de tiempo. Cuando estes listo/a para operar en real, solo necesitas abrir una cuenta live y verificar tu identidad.
```

**EN:**
```
Hello {{name}}, to open a demo account at NEOMAAA:

1. Go to our website: {{site_url}}
2. Click on "Demo Account" or "Open Demo"
3. Complete the registration form with your details
4. Select your demo settings:
   - Account type: Standard (recommended for demo)
   - Virtual balance: $10,000 (default)
   - Leverage: 1:500
5. You'll receive your login credentials via email

With the demo account you can:
- Practice risk-free with virtual money
- Test the MT5 platform
- Familiarize yourself with our instruments and conditions
- Test trading strategies

The demo account has no time limit. When you're ready to trade live, you just need to open a live account and verify your identity.
```

---

### CR-26: Rechazo por Pais Restringido

**ES:**
```
Hola, gracias por tu interes en NEOMAAA.

Lamentablemente, debido a restricciones regulatorias, no podemos ofrecer nuestros servicios a residentes de {{pais}}.

Los paises donde actualmente no operamos incluyen: Estados Unidos, Canada, paises del Espacio Economico Europeo (EEA), Reino Unido, Australia, Cuba, Irak, Myanmar, Corea del Norte y Sudan.

Pedimos disculpas por las molestias. Si tienes alguna pregunta adicional, estamos a tu disposicion.
```

**EN:**
```
Hello, thank you for your interest in NEOMAAA.

Unfortunately, due to regulatory restrictions, we are unable to offer our services to residents of {{country}}.

Countries where we currently do not operate include: United States, Canada, European Economic Area (EEA) countries, United Kingdom, Australia, Cuba, Iraq, Myanmar, North Korea, and Sudan.

We apologize for the inconvenience. If you have any additional questions, we're happy to help.
```

---

### CR-27: Margin Call / Stop Out

**ES:**
```
Hola {{nombre}}, entiendo tu consulta sobre el cierre de tu posicion.

Cuando el nivel de margen de tu cuenta cae por debajo del nivel de Stop Out, el sistema cierra automaticamente las posiciones con mayor perdida para proteger tu cuenta de un saldo negativo.

Niveles importantes:
- Margin Call: Se activa cuando tu margen cae al {{nivel_mc}}% - Recibes una alerta
- Stop Out: Se activa cuando tu margen cae al {{nivel_so}}% - Cierre automatico de posiciones

Esto es un mecanismo de proteccion automatico del sistema y no puede ser revertido.

Para evitar esto en el futuro:
- Usa stop-loss en todas tus posiciones
- No uses todo tu margen disponible
- Monitorea tu nivel de margen regularmente
- Considera reducir tu apalancamiento

Si crees que hubo un error en el cierre de tu posicion, proporcioname tu numero de cuenta MT5, el numero del ticket de la orden cerrada y la hora exacta, y lo revisaremos.
```

**EN:**
```
Hello {{name}}, I understand your inquiry about your position being closed.

When your account's margin level falls below the Stop Out level, the system automatically closes the positions with the largest losses to protect your account from a negative balance.

Important levels:
- Margin Call: Triggered when your margin falls to {{mc_level}}% - You receive an alert
- Stop Out: Triggered when your margin falls to {{so_level}}% - Automatic position closure

This is an automatic system protection mechanism and cannot be reversed.

To avoid this in the future:
- Use stop-loss on all your positions
- Don't use all your available margin
- Monitor your margin level regularly
- Consider reducing your leverage

If you believe there was an error in the closure of your position, please provide your MT5 account number, the closed order ticket number, and the exact time, and we'll review it.
```

---

### CR-28: Solicitud de Extracto / Historial de Cuenta

**ES:**
```
Hola {{nombre}}, puedes obtener tu historial de operaciones directamente desde MT5:

En MT5 Desktop:
1. Ve a la pestana "Historial" en la parte inferior
2. Haz clic derecho > "Periodo personalizado" > selecciona las fechas
3. Haz clic derecho > "Informe" > "Guardar como HTML" o "Guardar como XML"

En MT5 Mobile:
1. Ve a "Historial"
2. Selecciona el periodo deseado
3. Puedes hacer capturas de pantalla del historial

Si necesitas un extracto oficial firmado por NEOMAAA (por ejemplo, para fines fiscales o bancarios), por favor proporcioname:
- Tu numero de cuenta MT5
- El periodo que necesitas
- El proposito del extracto

Nuestro equipo te lo enviara en un plazo de 1-2 dias habiles.
```

**EN:**
```
Hello {{name}}, you can get your trading history directly from MT5:

On MT5 Desktop:
1. Go to the "History" tab at the bottom
2. Right-click > "Custom Period" > select the dates
3. Right-click > "Report" > "Save as HTML" or "Save as XML"

On MT5 Mobile:
1. Go to "History"
2. Select the desired period
3. You can take screenshots of the history

If you need an official statement signed by NEOMAAA (e.g., for tax or banking purposes), please provide:
- Your MT5 account number
- The period you need
- The purpose of the statement

Our team will send it to you within 1-2 business days.
```

---

### CR-29: Programa IB / Afiliados

**ES:**
```
Hola {{nombre}}, gracias por tu interes en nuestro programa de Introducing Brokers (IB).

Nuestro programa IB te permite ganar comisiones por referir clientes a NEOMAAA.

Beneficios:
- Comisiones competitivas por cada lote operado por tus referidos
- Panel de control en tiempo real para monitorear tus referidos y comisiones
- Materiales de marketing proporcionados
- Soporte dedicado para IBs
- Pagos puntuales

Para registrarte como IB:
1. Enviame tu nombre completo y email
2. Nuestro equipo de ventas te contactara con los detalles del programa
3. Una vez aprobado, recibiras tu link unico de referido y acceso al panel IB

Transferire tu solicitud a nuestro equipo comercial para que te contacten con toda la informacion.
```

**EN:**
```
Hello {{name}}, thank you for your interest in our Introducing Broker (IB) program.

Our IB program allows you to earn commissions by referring clients to NEOMAAA.

Benefits:
- Competitive commissions per lot traded by your referrals
- Real-time dashboard to monitor your referrals and commissions
- Marketing materials provided
- Dedicated IB support
- Timely payments

To register as an IB:
1. Please send me your full name and email
2. Our sales team will contact you with program details
3. Once approved, you'll receive your unique referral link and access to the IB dashboard

I'll transfer your request to our commercial team so they can reach out with full information.
```

---

### CR-30: Cierre de Cuenta

**ES:**
```
Hola {{nombre}}, lamentamos que desees cerrar tu cuenta.

Antes de proceder, me gustaria saber si hay algo que podamos hacer para mejorar tu experiencia. Si hay algun problema que podamos resolver, estaremos encantados de ayudarte.

Si deseas continuar con el cierre, necesitamos:
1. Confirmar que todas las posiciones abiertas estan cerradas
2. Confirmar que has retirado todos los fondos de tu cuenta
3. Tu solicitud formal de cierre por escrito (este mensaje puede servir)
4. Verificacion de identidad: confirma tu nombre completo y numero de cuenta MT5

Una vez confirmados estos puntos, procesaremos el cierre de tu cuenta en un plazo de 5 dias habiles.

NOTA: Si tienes fondos pendientes, primero debes solicitar un retiro. La cuenta no puede cerrarse con saldo disponible.
```

**EN:**
```
Hello {{name}}, we're sorry to hear you'd like to close your account.

Before proceeding, I'd like to know if there's anything we can do to improve your experience. If there's an issue we can resolve, we'd be happy to help.

If you'd like to proceed with closing, we need:
1. Confirmation that all open positions are closed
2. Confirmation that you've withdrawn all funds from your account
3. Your formal closure request in writing (this message can serve as such)
4. Identity verification: confirm your full name and MT5 account number

Once these points are confirmed, we'll process your account closure within 5 business days.

NOTE: If you have pending funds, you must first submit a withdrawal request. The account cannot be closed with available balance.
```

---

### CR-31: Error al Depositar / Pago Rechazado

**ES:**
```
Hola {{nombre}}, lamento que tengas problemas al realizar tu deposito.

Causas comunes de pagos rechazados:
1. **Tarjeta**: Tu banco puede estar bloqueando la transaccion internacional. Contacta a tu banco y autoriza pagos a {{nombre_procesador}}
2. **Limite excedido**: Verifica que no hayas excedido los limites diarios/mensuales de tu metodo de pago
3. **Datos incorrectos**: Verifica que los datos de pago sean correctos
4. **Metodo no disponible en tu pais**: Algunos metodos no estan disponibles en todas las regiones

Intentemos lo siguiente:
- Prueba con un metodo de pago diferente
- Si usas tarjeta, intenta con otra tarjeta o usa crypto/transferencia bancaria
- Limpia la cache de tu navegador e intenta de nuevo

Si el problema persiste, proporcioname:
- Metodo de pago que intentaste usar
- Mensaje de error exacto (captura de pantalla)
- Tu numero de cuenta MT5

Y lo investigaremos de inmediato.
```

**EN:**
```
Hello {{name}}, sorry to hear you're having trouble making your deposit.

Common causes for rejected payments:
1. **Card**: Your bank may be blocking the international transaction. Contact your bank and authorize payments to {{processor_name}}
2. **Limit exceeded**: Check that you haven't exceeded your daily/monthly payment method limits
3. **Incorrect details**: Verify your payment details are correct
4. **Method not available in your country**: Some methods aren't available in all regions

Let's try the following:
- Try a different payment method
- If using a card, try another card or use crypto/bank transfer
- Clear your browser cache and try again

If the issue persists, please provide:
- Payment method you tried to use
- Exact error message (screenshot)
- Your MT5 account number

And we'll investigate immediately.
```

---

### CR-32: Solicitud de Cambio de Datos Personales

**ES:**
```
Hola {{nombre}}, para solicitar un cambio en tus datos personales necesitamos:

1. Indicar que dato deseas cambiar (nombre, email, telefono, direccion, etc.)
2. El dato actual y el nuevo dato
3. Documentacion de soporte:
   - Cambio de nombre: documento oficial (ej: certificado de matrimonio, decreto judicial)
   - Cambio de direccion: nuevo comprobante de domicilio
   - Cambio de email: verificacion desde el email actual

NOTA: Por motivos de seguridad y cumplimiento regulatorio, ciertos cambios requieren verificacion adicional y aprobacion de nuestro equipo de compliance. El proceso puede tomar 2-5 dias habiles.

Por favor envia los documentos requeridos y procesaremos tu solicitud lo antes posible.
```

**EN:**
```
Hello {{name}}, to request a change to your personal details we need:

1. Which detail you'd like to change (name, email, phone, address, etc.)
2. The current and new information
3. Supporting documentation:
   - Name change: official document (e.g., marriage certificate, court order)
   - Address change: new proof of address
   - Email change: verification from the current email

NOTE: For security and regulatory compliance reasons, certain changes require additional verification and approval from our compliance team. The process may take 2-5 business days.

Please send the required documents and we'll process your request as soon as possible.
```

---

## 6. Top 20 Problemas Comunes y Resolucion

### Problema 1: "Mi deposito no aparece en mi cuenta"

**Frecuencia:** Muy alta (top 1)

**Diagnostico:**
1. Pedir numero de cuenta MT5, metodo de deposito, monto y hora aproximada
2. Verificar en el panel de PSP si la transaccion fue exitosa
3. Verificar en Skale si el deposito esta registrado
4. Verificar si el deposito fue a la cuenta correcta (el cliente puede tener varias)

**Resoluciones posibles:**
- PSP muestra exitoso pero no acreditado > Escalar a Finance Manager
- PSP muestra pendiente > Informar al cliente que espere (dar timeframe segun metodo)
- PSP muestra fallido > Informar al cliente que el pago no se proceso, debe reintentar
- Deposito fue a otra cuenta del cliente > Explicar y ofrecer transferencia interna
- Monto menor al minimo > Informar el deposito minimo para su tipo de cuenta

**Canned Response:** CR-05, CR-06, CR-07, CR-08, CR-09, CR-10 (segun metodo)

---

### Problema 2: "No puedo hacer login en MT5"

**Frecuencia:** Muy alta (top 2)

**Diagnostico:**
1. Verificar que use el numero de cuenta (no el email) como login
2. Verificar que este en el servidor correcto
3. Verificar que la contrasena sea correcta (case-sensitive)
4. Verificar que la cuenta no este desactivada

**Resoluciones posibles:**
- Servidor incorrecto > Guiar al servidor correcto
- Contrasena incorrecta > Ofrecer reset de contrasena
- Cuenta desactivada > Verificar en Skale el motivo, escalar si es necesario
- MT5 desactualizado > Guiar a descargar ultima version
- Problema de red > Verificar conexion, sugerir cambiar DNS o usar VPN

**Canned Response:** CR-12, CR-13, CR-24

---

### Problema 3: "Quiero retirar dinero, como lo hago?"

**Frecuencia:** Alta

**Diagnostico:**
1. Verificar que la cuenta este verificada (KYC aprobado)
2. Verificar que no tenga posiciones abiertas que consuman todo el margen
3. Verificar metodos de retiro disponibles para su pais

**Resolucion:**
- Guiar paso a paso por el portal del cliente
- Recordar politica de AML: retiro al mismo metodo del deposito
- Si no puede retirar por restriccion, verificar motivo en Skale

**Canned Response:** CR-11, CR-20

---

### Problema 4: "Mi retiro esta tardando mucho"

**Frecuencia:** Alta

**Diagnostico:**
1. Verificar fecha de solicitud y metodo
2. Comparar con tiempos estandar de procesamiento
3. Verificar si esta dentro del SLA normal
4. Verificar si hay alguna nota del equipo de finanzas

**Resoluciones posibles:**
- Dentro del plazo normal > Informar tiempos estandar y pedir paciencia
- Fuera del plazo normal > Escalar a Finance Manager
- Retenido por compliance > Escalar a Susana
- Datos bancarios incorrectos > Pedir al cliente que corrija y reenvie

**Canned Response:** CR-11, CR-20

---

### Problema 5: "Mi KYC fue rechazado"

**Frecuencia:** Alta

**Diagnostico:**
1. Verificar en Sumsub el motivo exacto del rechazo
2. Revisar la imagen/documento enviado

**Resoluciones posibles:**
- Documento ilegible > Guiar sobre como tomar una mejor foto
- Documento vencido > Solicitar documento vigente
- Documento no aceptado (tipo) > Listar documentos aceptados
- Discrepancia de datos > Verificar que nombre coincida con el registro
- Pais restringido detectado > Usar CR-26

**Canned Response:** CR-02, CR-03

---

### Problema 6: "Que tipos de cuenta tienen?"

**Frecuencia:** Alta

**Diagnostico:** Pregunta informativa, resolver directamente.

**Resolucion:** Compartir comparacion de cuentas y recomendar segun perfil del cliente.

**Canned Response:** CR-17

---

### Problema 7: "Mi posicion se cerro sola"

**Frecuencia:** Media-Alta

**Diagnostico:**
1. Verificar si fue un Stop Out (margen insuficiente)
2. Verificar si tenia un Stop Loss o Take Profit activo
3. Verificar si la orden tenia fecha de expiracion
4. Verificar si hubo un ajuste de margen (cambio de apalancamiento)

**Resoluciones posibles:**
- Stop Out > Explicar con CR-27
- SL/TP activado > Explicar que la orden se ejecuto segun configuracion
- Expiracion > Explicar tipos de ordenes
- Si nada de lo anterior aplica > Documentar y escalar a Pepe

**Canned Response:** CR-27

---

### Problema 8: "Como cambio mi apalancamiento?"

**Frecuencia:** Media

**Diagnostico:** Pregunta informativa/operativa.

**Resolucion:**
1. Guiar al portal del cliente > Mis Cuentas > Configuracion
2. Si no puede cambiarlo desde el portal, verificar si tiene posiciones abiertas (el cambio suele requerir que no haya posiciones abiertas)
3. Si necesita apalancamiento fuera del rango estandar, escalar a Pepe

**Canned Response:** CR-16

---

### Problema 9: "No puedo abrir una orden en MT5"

**Frecuencia:** Media

**Diagnostico:**
1. Verificar si el mercado esta abierto para ese instrumento
2. Verificar si tiene margen suficiente
3. Verificar si el volumen es valido (lote minimo/maximo)
4. Verificar mensaje de error exacto en MT5

**Resoluciones posibles:**
- Mercado cerrado > Informar horarios de trading (CR-14)
- Margen insuficiente > Explicar el concepto, sugerir deposito o reducir volumen
- Volumen invalido > Explicar tamanos de lote para su tipo de cuenta
- "Trade is disabled" > Verificar si la cuenta esta habilitada, escalar a Pepe
- Error de conexion > Troubleshooting de conectividad

**Canned Response:** CR-14, CR-13

---

### Problema 10: "Quiero una cuenta swap-free / islamica"

**Frecuencia:** Media (especialmente de Middle East)

**Diagnostico:** Solicitud operativa.

**Resolucion:**
1. Tomar datos del cliente y numero de cuenta
2. Informar condiciones de cuenta swap-free
3. Documentar solicitud y escalar a Susana (aprobacion) y Pepe (configuracion tecnica)

**Canned Response:** CR-18

---

### Problema 11: "Como funciona el copy trading?"

**Frecuencia:** Media

**Diagnostico:** Pregunta informativa / configuracion.

**Resolucion:** Guiar con instrucciones de copy trading. Si necesita configuracion tecnica, escalar a Pepe.

**Canned Response:** CR-19

---

### Problema 12: "No puedo instalar/descargar MT5"

**Frecuencia:** Media

**Diagnostico:**
1. Identificar dispositivo y sistema operativo
2. Verificar requisitos de compatibilidad

**Resoluciones posibles:**
- Windows: Descargar desde link oficial, ejecutar como administrador
- Mac: Usar Wine/PlayOnMac o el Web Terminal
- iOS/Android: Descargar desde App Store/Google Play
- Si no quiere instalar nada: ofrecer Web Terminal
- Problemas de antivirus/firewall: guiar para agregar excepcion

**Canned Response:** CR-24

---

### Problema 13: "Tengo un spread diferente al anunciado"

**Frecuencia:** Media

**Diagnostico:**
1. Verificar tipo de cuenta del cliente
2. Verificar hora de la consulta (spreads varian)
3. Explicar que los spreads son variables

**Resoluciones posibles:**
- Horario de baja liquidez > Explicar que spreads se amplian
- Noticias de alto impacto > Explicar volatilidad
- Si el spread parece anormalmente alto > Documentar y escalar a Pepe

**Canned Response:** CR-15

---

### Problema 14: "Quiero transferir dinero entre mis cuentas"

**Frecuencia:** Media

**Diagnostico:** Solicitud operativa.

**Resolucion:** Guiar paso a paso por el portal.

**Canned Response:** CR-23

---

### Problema 15: "Quiero abrir una cuenta IB / ser afiliado"

**Frecuencia:** Media

**Diagnostico:** Pregunta comercial.

**Resolucion:** Dar informacion basica y transferir a Sales (Franco/Edward/Luis).

**Canned Response:** CR-29

---

### Problema 16: "Quiero cerrar mi cuenta"

**Frecuencia:** Baja-Media

**Diagnostico:**
1. Entender el motivo (retencion)
2. Verificar si tiene fondos o posiciones

**Resolucion:**
1. Intentar retener: preguntar si hay algo que se pueda mejorar
2. Si insiste: seguir procedimiento de cierre
3. Documentar motivo de cierre en Skale para analytics

**Canned Response:** CR-30

---

### Problema 17: "No recibo el email de verificacion / password reset"

**Frecuencia:** Baja-Media

**Diagnostico:**
1. Verificar que el email registrado sea correcto
2. Pedir que revise carpeta de spam/junk
3. Verificar que el dominio no este bloqueado

**Resoluciones posibles:**
- En spam > Guiar para marcar como seguro
- Email incorrecto > Corregir en Skale (si verificacion de identidad es posible)
- No llega > Reenviar manualmente desde el panel, escalar a IT si es recurrente

---

### Problema 18: "Quiero cambiar mis datos personales"

**Frecuencia:** Baja

**Diagnostico:** Solicitud que requiere compliance.

**Resolucion:** Documentar solicitud y pedir documentacion de soporte. Escalar a Susana si es necesario.

**Canned Response:** CR-32

---

### Problema 19: "No soy de pais restringido pero el sistema me bloquea"

**Frecuencia:** Baja

**Diagnostico:**
1. Verificar la IP del cliente (puede estar usando VPN)
2. Verificar pais de registro vs pais de residencia actual

**Resoluciones posibles:**
- VPN activa con IP de pais restringido > Pedir que desactive VPN
- Error de geo-localizacion > Escalar a IT/Pepe para whitelist manual
- Cliente realmente en pais restringido > CR-26

---

### Problema 20: "Quiero hacer una queja formal"

**Frecuencia:** Baja (pero critica)

**Diagnostico:** ALERTA MAXIMA

**Resolucion:**
1. Documentar TODO lo que dice el cliente sin interrumpir
2. NO dar opiniones, explicaciones defensivas ni argumentar
3. Asignar numero de referencia
4. Confirmar recepcion al cliente
5. Escalar INMEDIATAMENTE a Susana
6. Tags: `complaint` + `priority:urgent` + `escalated`

**Canned Response:** CR-21

**REGLA: Un agente NUNCA responde al fondo de una queja formal. Solo documenta, confirma recepcion y escala.**

---

## 7. Metricas de Calidad

### KPIs Principales - Revisar Semanalmente

| Metrica | Objetivo | Como se Mide | Frecuencia de Revision |
|---------|----------|-------------|----------------------|
| **First Response Time (FRT)** | < 5 min (chat) / < 30 min (email) | Intercom analytics | Diario |
| **Average Resolution Time** | < 4 horas (urgente) / < 24h (normal) | Intercom analytics | Semanal |
| **Customer Satisfaction (CSAT)** | > 85% | Encuesta post-chat en Intercom | Semanal |
| **First Contact Resolution (FCR)** | > 70% | Tickets resueltos sin escalacion / total tickets | Semanal |
| **Tickets por Dia** | Baseline a establecer en mes 1 | Intercom analytics | Diario |
| **Tasa de Escalacion** | < 25% | Tickets escalados / total tickets | Semanal |
| **SLA Compliance** | > 90% | Tickets dentro de SLA / total tickets | Semanal |
| **Ticket Reopen Rate** | < 10% | Tickets reabiertos / tickets cerrados | Semanal |
| **Agent Utilization** | 60-80% | Tiempo en tickets / tiempo disponible | Semanal |

### KPIs Secundarios - Revisar Mensualmente

| Metrica | Objetivo | Notas |
|---------|----------|-------|
| **Top Categories** | Identificar tendencias | Los 5 tags mas usados del mes |
| **Peak Hours** | Optimizar cobertura | Horas con mayor volumen de tickets |
| **Language Distribution** | ES/EN split | Para decisiones de hiring |
| **Churn from Support Issues** | < 5% | Clientes que cierran cuenta despues de ticket negativo |
| **Avg Messages per Conversation** | < 8 | Eficiencia de comunicacion |
| **Bot Deflection Rate** | > 30% (cuando haya bot) | Tickets resueltos por auto-servicio |

### Dashboard Recomendado en Intercom

Crear un dashboard con las siguientes vistas:
1. **Vista en Tiempo Real**: Tickets abiertos, tiempo de espera actual, agentes online
2. **Vista Diaria**: FRT, tickets cerrados, CSAT del dia
3. **Vista Semanal**: Tendencias, comparacion con semana anterior, SLA compliance
4. **Vista por Agente**: Performance individual, tickets manejados, CSAT individual

### Reunion Semanal de Metricas (15 minutos)

Agenda:
1. Revisar numeros de la semana vs objetivos (5 min)
2. Casos problematicos o patrones nuevos (5 min)
3. Feedback de agentes sobre herramientas/procesos (3 min)
4. Action items para la proxima semana (2 min)

---

## 8. Checklist de Capacitacion para Nuevos Agentes

### Semana 1: Fundamentos del Producto

- [ ] **Dia 1: Bienvenida y Contexto**
  - [ ] Presentacion del equipo: Susana (Compliance), Pepe (Dealing), Franco/Edward/Luis (Sales)
  - [ ] Estructura de NEOMAAA: que hacemos, licencia Anjouan, mercados objetivo
  - [ ] Leer este playbook completo
  - [ ] Leer el Compliance Manual (frases prohibidas, que NO decir)

- [ ] **Dia 2: MetaTrader 5 - Basico**
  - [ ] Instalar MT5 en desktop y mobile
  - [ ] Crear cuenta demo y explorar la plataforma
  - [ ] Abrir y cerrar operaciones de practica
  - [ ] Entender: ordenes de mercado, ordenes pendientes, SL, TP
  - [ ] Navegar: Market Watch, Terminal, Historial

- [ ] **Dia 3: MetaTrader 5 - Troubleshooting**
  - [ ] Practicar reset de contrasena
  - [ ] Simular los 5 errores mas comunes de login
  - [ ] Aprender a leer el journal/log de MT5
  - [ ] Entender servidores y como cambiar de servidor

- [ ] **Dia 4: Tipos de Cuenta y Condiciones**
  - [ ] Memorizar: deposito minimo, spreads, apalancamiento de cada cuenta
  - [ ] Entender diferencia entre cuenta Cent, Standard, Raw, Institutional
  - [ ] Entender swap/swap-free
  - [ ] Entender comisiones (cuentas con y sin comision)

- [ ] **Dia 5: Depositos y Retiros**
  - [ ] Recorrer todo el flujo de deposito en el portal del cliente (cada metodo)
  - [ ] Recorrer todo el flujo de retiro
  - [ ] Entender la politica AML (retiro al mismo metodo del deposito)
  - [ ] Conocer los 120+ metodos disponibles y cuales aplican a que paises
  - [ ] Entender tiempos de procesamiento por metodo

### Semana 2: Herramientas y Procesos

- [ ] **Dia 6: Intercom - Basico**
  - [ ] Login y navegacion de la interfaz
  - [ ] Responder un ticket de practica
  - [ ] Usar canned responses (practicar con las 32 respuestas de este playbook)
  - [ ] Agregar tags correctamente
  - [ ] Escribir notas internas
  - [ ] Cambiar prioridad de un ticket

- [ ] **Dia 7: Intercom - Avanzado**
  - [ ] Configurar y personalizar su vista de bandeja
  - [ ] Practicar handoff de tickets con el otro agente
  - [ ] Usar macros y atajos de teclado
  - [ ] Buscar conversaciones anteriores de un cliente
  - [ ] Cerrar y reabrir tickets correctamente

- [ ] **Dia 8: Skale CRM**
  - [ ] Navegar el perfil de un cliente
  - [ ] Buscar clientes por nombre, email, numero de cuenta
  - [ ] Entender los campos: KYC status, depositos, tipo de cuenta, sales asignado
  - [ ] NO modificar datos en Skale sin autorizacion

- [ ] **Dia 9: Sumsub KYC**
  - [ ] Navegar el dashboard de Sumsub (solo lectura)
  - [ ] Entender los estados: pendiente, aprobado, rechazado, retry
  - [ ] Leer el motivo de rechazo de un KYC
  - [ ] Entender que documentos se aceptan y cuales no
  - [ ] Practicar explicar al cliente por que su KYC fue rechazado

- [ ] **Dia 10: Escalaciones y Comunicacion Interna**
  - [ ] Practicar el flujo completo de escalacion con un caso simulado
  - [ ] Enviar una escalacion de practica a Susana (ticket de compliance)
  - [ ] Enviar una escalacion de practica a Pepe (ticket de MT5)
  - [ ] Enviar una escalacion de practica a Sales (ticket comercial)
  - [ ] Aprender a usar Slack para comunicacion interna

### Semana 3: Practica Supervisada

- [ ] **Dias 11-12: Shadowing**
  - [ ] Observar al otro agente manejar tickets en vivo (minimo 4 horas)
  - [ ] Tomar notas de frases y enfoques que funcionan bien
  - [ ] Identificar patrones comunes en los tickets

- [ ] **Dias 13-14: Atencion Supervisada**
  - [ ] Responder tickets reales con supervision del agente senior o lider
  - [ ] Cada respuesta es revisada antes de enviar (primeros 20 tickets)
  - [ ] Feedback inmediato despues de cada interaccion
  - [ ] Enfocarse en los 5 tipos de tickets mas comunes

- [ ] **Dia 15: Evaluacion y Certificacion**
  - [ ] Examen escrito: 20 preguntas sobre producto, procesos y compliance
  - [ ] Examen practico: resolver 5 tickets simulados sin ayuda
  - [ ] Evaluacion de tono y comunicacion escrita
  - [ ] Feedback final y plan de mejora si aplica

### Criterios de Aprobacion

Para ser certificado como agente independiente:
- [ ] Examen escrito: 80% o mas
- [ ] Examen practico: resolver 4 de 5 tickets correctamente
- [ ] Ningun error critico de compliance (0 tolerancia)
- [ ] CSAT de practica supervisada: > 80%
- [ ] Aprobacion del agente senior / lider de soporte

### Post-Certificacion (Primer Mes Solo)

- [ ] Revision semanal de tickets (lider revisa 10 tickets aleatorios)
- [ ] Reunion 1-on-1 semanal de 15 minutos para feedback
- [ ] Acceso a canal de Slack #support-help para preguntas en tiempo real
- [ ] Meta del primer mes: FRT < 10 min, CSAT > 80%, FCR > 60%

---

## APENDICE A: Paises Restringidos

No se puede abrir cuenta ni operar desde los siguientes paises/jurisdicciones:

| Pais/Region | Motivo |
|-------------|--------|
| Estados Unidos (USA) | Regulacion |
| Canada | Regulacion |
| Espacio Economico Europeo (EEA) - todos los paises | Regulacion (MiFID) |
| Reino Unido (UK) | Regulacion (FCA) |
| Australia | Regulacion (ASIC) |
| Cuba | Sanciones |
| Irak | Sanciones |
| Myanmar | Sanciones |
| Corea del Norte | Sanciones |
| Sudan | Sanciones |

**Paises del EEA:** Austria, Belgica, Bulgaria, Croacia, Chipre, Chequia, Dinamarca, Estonia, Finlandia, Francia, Alemania, Grecia, Hungria, Islandia, Irlanda, Italia, Letonia, Liechtenstein, Lituania, Luxemburgo, Malta, Paises Bajos, Noruega, Polonia, Portugal, Rumania, Eslovaquia, Eslovenia, Espana, Suecia.

Si un cliente de estos paises contacta soporte, usar CR-26 (rechazo por pais restringido).

---

## APENDICE B: Glosario para Agentes

| Termino | Definicion |
|---------|-----------|
| **Spread** | Diferencia entre precio de compra (Ask) y venta (Bid). Es el costo principal de operar |
| **Pip** | Unidad minima de cambio en un par de divisas. En EUR/USD, 1 pip = 0.0001 |
| **Lote** | Unidad de volumen de trading. 1 lote estandar = 100,000 unidades de la divisa base |
| **Margen** | Cantidad de dinero requerida como garantia para abrir una posicion |
| **Margin Call** | Alerta cuando el margen disponible cae por debajo del nivel minimo |
| **Stop Out** | Cierre automatico de posiciones cuando el margen es insuficiente |
| **Apalancamiento** | Multiplicador que permite operar con mas dinero del depositado |
| **Swap** | Interes que se cobra o paga por mantener una posicion abierta de un dia a otro |
| **Stop Loss (SL)** | Orden automatica para cerrar una posicion con perdida a un precio predefinido |
| **Take Profit (TP)** | Orden automatica para cerrar una posicion con ganancia a un precio predefinido |
| **FTD** | First Time Deposit - primer deposito de un cliente nuevo |
| **KYC** | Know Your Customer - proceso de verificacion de identidad |
| **AML** | Anti-Money Laundering - politicas contra lavado de dinero |
| **PSP** | Payment Service Provider - procesador de pagos |
| **IB** | Introducing Broker - afiliado que refiere clientes |
| **A-Book** | Modelo donde las ordenes del cliente se envian directamente al mercado |
| **B-Book** | Modelo donde el broker toma la contraparte de la orden del cliente |
| **LP** | Liquidity Provider - proveedor de liquidez |
| **Slippage** | Diferencia entre el precio solicitado y el precio de ejecucion real |
| **Requote** | Cuando el broker ofrece un nuevo precio porque el original ya no esta disponible |

---

## APENDICE C: Plantilla de Reporte de Incidente

Usar esta plantilla cuando ocurra algo fuera de lo normal (caida de plataforma, problema masivo con PSP, etc.):

```
REPORTE DE INCIDENTE - NEOMAAA SUPPORT

Fecha y hora: ____________________
Agente que reporta: ____________________
Tipo de incidente: [Plataforma / PSP / KYC / Seguridad / Otro]

Descripcion del incidente:
_______________________________________________
_______________________________________________

Clientes afectados (cantidad estimada): ____
Impacto: [Critico / Alto / Medio / Bajo]

Acciones tomadas:
1. ____________________
2. ____________________
3. ____________________

Escalado a: ____________________
Estado actual: [En progreso / Resuelto / Monitoreando]

Comunicacion al cliente (que se les dijo):
_______________________________________________

Fecha/hora de resolucion: ____________________
Causa raiz (si se conoce): ____________________
Acciones preventivas recomendadas: ____________________
```

---

## APENDICE D: Checklist Diario del Agente

Al iniciar turno:
- [ ] Revisar tickets sin asignar
- [ ] Leer notas de handoff del turno anterior
- [ ] Verificar que Intercom esta online y funcional
- [ ] Verificar que MT5 esta operativo (hacer login en cuenta demo)
- [ ] Revisar si hay incidentes activos (canal #incidents en Slack)
- [ ] Responder primero los tickets con mayor tiempo de espera

Al finalizar turno:
- [ ] Todos los tickets urgentes estan resueltos o escalados
- [ ] Notas de handoff escritas para tickets abiertos
- [ ] Tickets reasignados correctamente al agente del siguiente turno
- [ ] Tags y prioridades correctamente asignados en todos los tickets del dia
- [ ] Reporte breve en Slack: # tickets manejados, # escalados, # pendientes

---

**FIN DEL PLAYBOOK**

*Este documento debe revisarse y actualizarse mensualmente o cuando haya cambios significativos en procesos, herramientas o equipo.*

*Ultima revision: Abril 2026*
*Proximo review: Mayo 2026*
*Owner del documento: Direccion de Operaciones*
