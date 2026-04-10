# WORKFLOW SALES-COMPLIANCE -- COMO TRABAJAN JUNTOS

**Documento interno -- NEOMAAA Markets**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Audiencia: Equipo de Ventas (Edward, Franco, Luis) + Compliance (Susana)**

---

## INDICE

1. [Roles y Responsabilidades](#1-roles-y-responsabilidades)
2. [Journey del Cliente -- Flowchart Completo](#2-journey-del-cliente----flowchart-completo)
3. [Registro del Cliente -- Paso a Paso](#3-registro-del-cliente----paso-a-paso)
4. [Flujo KYC -- Paso a Paso](#4-flujo-kyc----paso-a-paso)
5. [Flujo de Depositos](#5-flujo-de-depositos)
6. [Flujo de Retiros](#6-flujo-de-retiros)
7. [Red Flags -- Escalamiento Inmediato](#7-red-flags----escalamiento-inmediato)
8. [Canales de Comunicacion](#8-canales-de-comunicacion)
9. [SLAs y Tiempos de Respuesta](#9-slas-y-tiempos-de-respuesta)
10. [Reunion Semanal Sales-Compliance](#10-reunion-semanal-sales-compliance)
11. [Registro en Skale CRM](#11-registro-en-skale-crm)
12. [Matriz de Escalamiento](#12-matriz-de-escalamiento)
13. [Lo Que Ventas PUEDE y NO PUEDE Hacer](#13-lo-que-ventas-puede-y-no-puede-hacer)
14. [Scripts para Situaciones Comunes](#14-scripts-para-situaciones-comunes)

---

## 1. ROLES Y RESPONSABILIDADES

### 1.1 Equipo de Ventas (Edward, Franco, Luis)

**Funcion principal:** Atraer clientes, guiarlos en el registro y onboarding, mantener la relacion comercial.

| Responsabilidad | Descripcion |
|---|---|
| Primer contacto con el cliente | Responder consultas, explicar servicios, guiar al registro |
| Acompanar el proceso de KYC | Explicar al cliente que documentos necesita y como subirlos |
| Comunicar resultados de KYC | Informar al cliente si fue aprobado, si debe reintentar, o si fue rechazado |
| Asistir con el primer deposito | Guiar al cliente sobre metodos de pago disponibles segun su pais |
| Registrar toda interaccion en CRM | Cada llamada, mensaje, email debe quedar en Skale CRM |
| Escalar a Susana cuando corresponda | Nunca intentar resolver un tema de compliance por cuenta propia |
| Cumplir reglas de comunicacion | No usar frases prohibidas, incluir disclaimers cuando corresponda |

**Lo que ventas NO hace:**
- No aprueba ni rechaza KYC
- No aprueba depositos o retiros
- No decide si un cliente es PEP o de alto riesgo
- No responde preguntas sobre investigaciones de compliance
- No promete resultados de trading

### 1.2 Compliance (Susana)

**Funcion principal:** Garantizar que NEOMAAA cumple con todas las obligaciones regulatorias. Proteger la licencia.

| Responsabilidad | Descripcion |
|---|---|
| Verificar KYC de todos los clientes | Revisar resultados de Sumsub, aprobar/rechazar manualmente cuando sea necesario |
| Aprobar depositos que requieren revision | Depositos que activan tiers superiores, primeros depositos sospechosos |
| Aprobar retiros que requieren revision | Retiros grandes, retiros a destino diferente, primeros retiros |
| Detectar y escalar actividad sospechosa | Monitoreo continuo, SARs, congelamiento de cuentas |
| Capacitar al equipo de ventas | Sesiones trimestrales sobre reglas de comunicacion y compliance |
| Auditar registros de CRM | Verificar mensualmente que ventas cumple con documentacion |
| Reportar a AOFA | Reportes trimestrales, SARs, notificaciones |

---

## 2. JOURNEY DEL CLIENTE -- FLOWCHART COMPLETO

### 2.1 Vision General del Proceso

```
ETAPA 1         ETAPA 2         ETAPA 3          ETAPA 4          ETAPA 5          ETAPA 6
CONTACTO        REGISTRO        KYC              DEPOSITO         SETUP MT5        TRADING
                                                                                   ACTIVO
+----------+    +----------+    +------------+   +------------+   +----------+     +----------+
| Cliente  |    | Cliente  |    | Sumsub     |   | Cliente    |   | Cliente  |     | Cliente  |
| contacta |--->| completa |--->| verifica   |-->| deposita   |-->| descarga |---->| opera    |
| a ventas |    | registro |    | documentos |   | fondos     |   | MT5 y    |     | en MT5   |
+----------+    +----------+    +------------+   +------------+   | conecta  |     +----------+
     |               |              |                  |          +----------+          |
     v               v              v                  v               |               v
+---------+     +---------+    +-----------+     +-----------+        v          +---------+
| VENTAS  |     | VENTAS  |    | COMPLIANCE|     | COMPLIANCE|   +---------+    | VENTAS  |
| Edward/ |     | guia    |    | Susana    |     | aprueba   |   | SOPORTE |    | retiene |
| Franco/ |     | proceso |    | revisa    |     | si aplica |   | asiste  |    | cliente |
| Luis    |     |         |    |           |     |           |   |         |    |         |
+---------+     +---------+    +-----------+     +-----------+   +---------+    +---------+
```

### 2.2 Flowchart Detallado por Etapa con Touchpoints de Compliance

```
===================================================================================
ETAPA 1: CONTACTO INICIAL (Responsable: VENTAS)
===================================================================================

Cliente llega por:
  - Ads (Instagram, Facebook, Google, TikTok)
  - Referido
  - Organico (web, SEO)
  - IB (Introducing Broker)
       |
       v
Ventas responde consulta inicial
  - Explica servicios de NEOMAAA
  - NO promete ganancias (ver frases prohibidas)
  - Incluye disclaimer de riesgo
  - Registra contacto en Skale CRM
       |
       v
Cliente interesado? --NO--> Registrar en CRM como "no convertido", seguimiento en 7 dias
       |
      SI
       |
       v

===================================================================================
ETAPA 2: REGISTRO (Responsable: VENTAS guia, SISTEMA procesa)
===================================================================================

Ventas envia link de registro de NEOMAAA
       |
       v
Cliente completa formulario en Skale CRM:
  - Nombre completo
  - Email
  - Telefono
  - Pais de residencia
  - Fecha de nacimiento
       |
       v
Sistema verifica pais de residencia
       |
       +---> Pais RESTRINGIDO --> Sistema bloquea --> Ventas informa al cliente
       |                          (ver script en seccion 14)
       |
       +---> Pais PERMITIDO --> Cuenta creada en estado "Pendiente KYC"
                |
                v

===================================================================================
ETAPA 3: KYC (Responsable: COMPLIANCE verifica, VENTAS comunica)
===================================================================================

Sistema redirige al cliente a Sumsub
       |
       v
Cliente sube documentos:
  1. Documento de identidad (pasaporte, cedula, licencia)
  2. Prueba de domicilio (factura servicios, extracto bancario)
  3. Selfie en vivo (liveness check)
       |
       v
Sumsub procesa automaticamente (2-5 minutos)
       |
       +---> APPROVED (verde) -----------> Cuenta activada
       |     Susana: no requiere accion    Ventas: "Su cuenta esta verificada,
       |     (verificar que auto-aprobado   puede proceder a depositar"
       |      funcione correctamente)
       |
       +---> RETRY (amarillo) -----------> Susana revisa razon especifica
       |     Razon: ilegible, vencido,     Susana instruye a Ventas que decir
       |     no coincide                   Ventas contacta al cliente con
       |                                   instrucciones claras
       |                                   Cliente reintenta (max 3 veces)
       |                                        |
       |                                   3 intentos fallidos?
       |                                        |
       |                                   Susana revisa manualmente
       |                                   Decision: aprobar o rechazar
       |
       +---> REJECTED (rojo) ------------> Susana investiga razon
       |     Razon: fraude, pais                |
       |     restringido, sanciones        +---> Fraude? --> Rechazar permanente
       |                                   |     Documentar, evaluar SAR
       |                                   |     Ventas: script generico
       |                                   |
       |                                   +---> Pais restringido? --> Rechazar
       |                                   |     Ventas: "No podemos ofrecer
       |                                   |     servicios en su jurisdiccion"
       |                                   |
       |                                   +---> Error de sistema? --> Permitir
       |                                         reintento manual
       |
       +---> PENDING REVIEW (manual) ----> Susana revisa dentro de 2 horas
             PEP detectado, alerta de      Si PEP: iniciar EDD
             sanciones, inconsistencia     Si sanciones: rechazar + SAR
                                           Ventas: "La verificacion esta en
                                           proceso, le informaremos pronto"

===================================================================================
ETAPA 4: DEPOSITO (Responsable: VENTAS guia metodo, COMPLIANCE aprueba si aplica)
===================================================================================

Cliente aprobado quiere depositar
       |
       v
Ventas recomienda metodo de pago segun pais:
  - LATAM: PIX (Brasil), PSE (Colombia), OXXO (Mexico),
           Nequi (Colombia), Yape (Peru), Mercado Pago
  - Global: Visa/MC, crypto (USDT), Western Union
  - 120+ metodos disponibles
       |
       v
Cliente realiza deposito
       |
       v
Sistema evalua deposito:
       |
       +---> Deposito <= $1,000 (Tier 1)
       |     Y no hay red flags
       |     --> Procesamiento automatico
       |     --> Fondos disponibles en cuenta MT5
       |
       +---> Deposito $1,001 - $10,000 (Tier 2)
       |     --> Requiere declaracion de origen de fondos
       |     --> Susana revisa declaracion
       |     --> Si aprueba: fondos liberados
       |     --> Si no aprueba: solicitar mas info
       |     --> Ventas informa al cliente
       |
       +---> Deposito $10,001 - $50,000 (Tier 3)
       |     --> Requiere documentacion de respaldo
       |     --> Susana revisa documentacion completa
       |     --> Aprobacion dentro de 24 horas
       |     --> Ventas informa al cliente
       |
       +---> Deposito $50,001+ (Tier 4)
       |     --> Susana + Principals deben aprobar
       |     --> Posible entrevista telefonica/video
       |     --> Aprobacion dentro de 48 horas
       |
       +---> RED FLAG detectado (cualquier monto)
             --> Deposito congelado
             --> Susana investiga (ver seccion 7)
             --> Ventas NO informa al cliente la razon real
             --> Ventas: "Su deposito esta en proceso
                 de verificacion de rutina"

===================================================================================
ETAPA 5: SETUP MT5 (Responsable: SOPORTE, no involucra Compliance)
===================================================================================

Fondos acreditados en cuenta
       |
       v
Ventas/Soporte guia descarga e instalacion de MT5
  - Credenciales de acceso enviadas automaticamente
  - Guia de configuracion por email
       |
       v
Cliente conecta y verifica saldo
       |
       v

===================================================================================
ETAPA 6: TRADING ACTIVO (Responsable: VENTAS retiene, COMPLIANCE monitorea)
===================================================================================

Cliente comienza a operar
       |
       v
Ventas: touchpoints de retencion
  - Dia 1: "Como fue su primer trade?"
  - Dia 7: check-in
  - Dia 30: revision de experiencia
       |
       v
Compliance: monitoreo continuo (en background)
  - Transacciones sospechosas
  - Patrones de deposito/retiro
  - Re-screening de sanciones (trimestral)
       |
       v
Si se detecta anomalia --> Escalar segun matriz (seccion 12)
```

---

## 3. REGISTRO DEL CLIENTE -- PASO A PASO

### 3.1 Proceso para Ventas

| Paso | Accion de Ventas | Detalle |
|---|---|---|
| 1 | Enviar link de registro al cliente | Link directo al formulario de Skale CRM |
| 2 | Estar disponible para preguntas | El cliente puede necesitar ayuda con el formulario |
| 3 | Confirmar que el registro se completo | Verificar en Skale CRM que aparece el nuevo cliente |
| 4 | Guiar al cliente a la verificacion KYC | "Ahora necesitamos verificar su identidad. Es un proceso rapido de 5 minutos." |
| 5 | Registrar la interaccion en CRM | Notas: canal de adquisicion, idioma, interes del cliente, tipo de cuenta sugerida |

### 3.2 Datos del Registro

| Campo | Obligatorio | Notas |
|---|---|---|
| Nombre completo | Si | Debe coincidir EXACTAMENTE con el documento de identidad |
| Email | Si | Sera el email de la cuenta. Verificacion por email obligatoria |
| Telefono | Si | Con codigo de pais. Para comunicacion y verificacion |
| Pais de residencia | Si | Determina si puede operar y metodos de pago disponibles |
| Fecha de nacimiento | Si | Debe ser mayor de 18 anos |
| Tipo de cuenta deseado | Si | Cent, Standard, Raw, Institutional |
| Divisa de la cuenta | Si | USD recomendado. Otras segun disponibilidad |

### 3.3 Que Hacer Si el Cliente No Completa el Registro

| Situacion | Accion | Timing |
|---|---|---|
| Cliente empezo pero no termino el formulario | Enviar recordatorio por WhatsApp/email | 2 horas despues |
| No respondio al primer recordatorio | Segundo contacto | 24 horas despues |
| No respondio al segundo recordatorio | Tercer y ultimo contacto | 72 horas despues |
| No respondio en 72 horas | Marcar como "abandonado" en CRM | Dia 4 |
| Vuelve a contactar despues | Reactivar proceso sin presion | Cuando contacte |

---

## 4. FLUJO KYC -- PASO A PASO

### 4.1 Lo Que Ventas Debe Explicar al Cliente

Antes de que el cliente inicie la verificacion, ventas debe explicar:

> "Para cumplir con las regulaciones, necesitamos verificar su identidad. Es un proceso sencillo que toma aproximadamente 5 minutos. Necesitara:
> 1. Su documento de identidad vigente (pasaporte, cedula o licencia de conducir)
> 2. Un comprobante de domicilio reciente (factura de servicios de los ultimos 3 meses)
> 3. Tomarse una foto en vivo (selfie)
>
> Le llegara un link para completar la verificacion. Si tiene alguna dificultad, estoy aqui para ayudarle."

### 4.2 Proceso Paso a Paso

| Paso | Quien | Accion | Tiempo |
|---|---|---|---|
| 1 | Sistema | Envia link de Sumsub al cliente por email y/o en el portal | Automatico post-registro |
| 2 | Cliente | Abre el link de Sumsub | Variable |
| 3 | Cliente | Sube foto de documento de identidad (anverso y reverso si aplica) | 1-2 minutos |
| 4 | Sumsub | Verifica autenticidad del documento, extrae datos | 30 segundos |
| 5 | Cliente | Sube prueba de domicilio | 1 minuto |
| 6 | Sumsub | Verifica prueba de domicilio, extrae direccion | 30 segundos |
| 7 | Cliente | Realiza selfie en vivo (liveness check) | 30 segundos |
| 8 | Sumsub | Compara selfie con foto del documento | 30 segundos |
| 9 | Sumsub | Ejecuta screening de PEPs y sanciones | Automatico |
| 10 | Sumsub | Emite resultado: APPROVED, RETRY, REJECTED, o PENDING REVIEW | 2-5 minutos total |

### 4.3 Que Hace Ventas Segun el Resultado

| Resultado | Accion de Ventas | Script |
|---|---|---|
| APPROVED | Contactar al cliente para felicitarlo y guiarlo al deposito | "Su cuenta ha sido verificada exitosamente. Puede proceder a realizar su primer deposito. Le puedo ayudar a elegir el metodo de pago mas conveniente para su pais." |
| RETRY | Contactar al cliente con instrucciones especificas de lo que debe corregir | "Necesitamos que vuelva a enviar su [documento especifico]. [Razon: estaba borroso / vencido / no coincide]. Por favor intente nuevamente asegurandose de [instrucciones especificas]." |
| REJECTED (no fraude) | Contactar al cliente con la razon general | "Lamentamos informarle que no pudimos completar la verificacion. [Razon si es pais restringido]. Si cree que es un error, puede contactar a soporte." |
| REJECTED (fraude) | NO contactar al cliente con la razon real | "No pudimos completar la verificacion de su cuenta. Para mas informacion, contacte soporte@neomaaa.com." (Susana maneja internamente) |
| PENDING REVIEW | Informar al cliente que esta en proceso | "Su verificacion esta siendo revisada por nuestro equipo. Le informaremos el resultado dentro de las proximas horas. Gracias por su paciencia." |

### 4.4 Que NO Puede Hacer Ventas en el Proceso KYC

| Accion PROHIBIDA | Razon |
|---|---|
| Aprobar manualmente un KYC | Solo Susana puede aprobar manualmente |
| Decirle al cliente que "no se preocupe, lo aprobamos rapido" | No se puede prometer resultado ni tiempo |
| Aceptar documentos del cliente por WhatsApp/email y subirlos a Sumsub | El cliente debe subir sus propios documentos a traves de Sumsub |
| Sugerir al cliente que use documentos de otra persona | Fraude, causa de terminacion inmediata |
| Decirle al cliente de que pais registrarse si el suyo esta restringido | Evasion regulatoria, causa de terminacion inmediata |
| Preguntar a Susana "aprueba rapido a este cliente que quiere depositar mucho" | Compliance no se acelera por presion comercial |

---

## 5. FLUJO DE DEPOSITOS

### 5.1 Depositos Que No Requieren Aprobacion de Compliance

| Condicion | Procesamiento |
|---|---|
| Deposito Tier 1 (hasta $1,000 acumulado) | Automatico |
| Metodo de pago verificado (nombre coincide) | Automatico |
| No hay red flags activas en la cuenta | Automatico |
| Cliente con historial limpio de depositos anteriores | Automatico |

### 5.2 Depositos Que SI Requieren Aprobacion de Compliance

| Condicion | Proceso | SLA |
|---|---|---|
| Primer deposito de cualquier cliente nuevo | Susana verifica que KYC esta completo y aprobado | 2 horas |
| Deposito que supera umbral de Tier 1 ($1,000) | Susana solicita declaracion de origen de fondos | 24 horas (post-recepcion de documentos) |
| Deposito que supera umbral de Tier 2 ($10,000) | Susana solicita documentacion de respaldo | 24 horas (post-recepcion de documentos) |
| Deposito Tier 4 ($50,000+) | Susana + Principals revisan | 48 horas |
| Deposito desde metodo de pago nuevo (no usado antes) | Susana verifica que el nombre coincide con el titular | 4 horas |
| Deposito desde pais diferente a residencia del cliente | Susana investiga | 24 horas |
| Deposito crypto de monto alto (> $5,000) | Susana verifica fuente del wallet (si posible) | 24 horas |
| Cualquier red flag activa en la cuenta | Susana investiga antes de acreditar | Variable |

### 5.3 Comunicacion de Ventas Sobre Depositos

| Situacion | Lo que Ventas dice al cliente |
|---|---|
| Deposito procesado exitosamente | "Su deposito de $[monto] ha sido acreditado en su cuenta. Puede comenzar a operar." |
| Deposito en revision por compliance | "Su deposito esta siendo procesado. Normalmente toma [X] horas. Le notificaremos cuando este acreditado." |
| Se requiere documentacion adicional | "Para procesar su deposito, necesitamos documentacion adicional sobre el origen de los fondos. Le enviaremos un formulario por email." |
| Deposito rechazado (nombre no coincide) | "El deposito no pudo procesarse porque el nombre en el metodo de pago no coincide con el titular de la cuenta. Por regulacion, solo podemos aceptar depositos del mismo titular. Le devolveremos el monto a la fuente original." |

---

## 6. FLUJO DE RETIROS

### 6.1 Principios de Retiros

1. **Los retiros se procesan al mismo metodo de deposito original.** Si el cliente deposito con tarjeta Visa, el retiro va a la misma tarjeta Visa (hasta el monto depositado). Las ganancias pueden ir a otro metodo verificado.
2. **El nombre del destinatario debe coincidir con el titular de la cuenta.** No se permiten retiros a terceros.
3. **Compliance puede revisar cualquier retiro** antes de procesarlo.

### 6.2 Retiros Que Requieren Aprobacion de Compliance

| Condicion | Proceso | SLA |
|---|---|---|
| Primer retiro del cliente | Susana verifica que el destino coincide con la fuente de deposito | 4 horas |
| Retiro > $5,000 | Susana revisa la cuenta antes de procesar | 12 horas |
| Retiro a destino diferente a fuente de deposito | Susana investiga y aprueba/rechaza | 24 horas |
| Retiro total (el cliente retira todo su saldo) | Susana revisa historial de la cuenta | 12 horas |
| Retiro despues de deposito reciente sin trading | Susana investiga (posible lavado) | 24-48 horas |
| Cliente con red flag activa | Susana debe aprobar antes de procesar | Variable |
| Retiro > $25,000 | Susana + Principals aprueban | 48 horas |

### 6.3 Comunicacion de Ventas Sobre Retiros

| Situacion | Lo que Ventas dice al cliente |
|---|---|
| Retiro procesado | "Su retiro de $[monto] ha sido procesado. Dependiendo de su metodo de pago, los fondos estaran disponibles en [X] dias habiles." |
| Retiro en revision | "Su solicitud de retiro esta siendo procesada por nuestro equipo de verificacion. Le notificaremos una vez aprobada." |
| Retiro rechazado (destino diferente) | "Por politica de seguridad, los retiros deben procesarse al mismo metodo utilizado para el deposito. Por favor solicite el retiro a [metodo original]." |

---

## 7. RED FLAGS -- ESCALAMIENTO INMEDIATO

### 7.1 Situaciones Que Ventas Debe Escalar a Susana INMEDIATAMENTE

Si ventas detecta CUALQUIERA de las siguientes situaciones durante una interaccion con un cliente, debe escalar a Susana de inmediato. No intentar resolver por cuenta propia.

| # | Red Flag | Ejemplo | Que Hacer |
|---|---|---|---|
| 1 | Cliente menciona que los fondos son de otra persona | "Mi papa me va a hacer el deposito" / "Un amigo me va a pasar plata" | ESCALAR. Posible deposito de tercero |
| 2 | Cliente quiere registrarse a nombre de otra persona | "Ponle el nombre de mi esposa" / "Registra a mi socio" | ESCALAR. Posible fraude de identidad |
| 3 | Cliente pregunta como evadir impuestos | "No quiero que el gobierno sepa" / "Esto es para no pagar impuestos" | ESCALAR. Potencial evasion fiscal |
| 4 | Cliente menciona multiples cuentas | "Ya tengo otra cuenta con otro nombre" / "Puedo abrir otra?" | ESCALAR. Solo una cuenta por persona |
| 5 | Cliente tiene prisa extrema por depositar | "Necesito depositar YA, no me importa la verificacion" / Presion excesiva | ESCALAR. Comportamiento inusual |
| 6 | Cliente ofrece soborno o incentivo para acelerar procesos | "Te pago si me apruebas rapido" | ESCALAR INMEDIATAMENTE. Documentar |
| 7 | Cliente menciona que viene de un pais restringido | "Vivo en USA pero quiero usar la cuenta" / "Estoy en Canada" | ESCALAR. Verificar elegibilidad |
| 8 | Cliente pregunta por limites de reporte | "A partir de cuanto monto se reporta?" / "Cual es el maximo sin dar documentos?" | ESCALAR. Posible structuring |
| 9 | Cliente envia dinero y quiere retirarlo sin operar | Deposita y pide retiro a los pocos minutos/horas | ESCALAR. Posible lavado |
| 10 | Cliente tiene comportamiento agresivo o amenazante | Amenazas, insultos, presion extrema | ESCALAR a Susana Y a Principals |
| 11 | Cliente menciona actividad criminal o ilegal | Cualquier mencion de drogas, armas, terrorismo, etc. | ESCALAR INMEDIATAMENTE. No continuar la conversacion |
| 12 | Cliente pide que no se registre la conversacion | "Esto que te digo no lo pongas en el sistema" | ESCALAR. Registrar TODO en CRM |
| 13 | Informacion del cliente no coincide (nombre, pais, edad) | Dice una cosa por telefono pero el documento dice otra | ESCALAR. Posible fraude |
| 14 | Cliente quiere depositar desde multiples tarjetas de diferentes personas | "Voy a usar la tarjeta de mi hermano tambien" | ESCALAR. Terceros prohibidos |
| 15 | Cliente pregunta insistentemente sobre anonimato | "Es anonimo esto?" / "Nadie va a saber que opero aqui?" | ESCALAR. Evaluar motivacion |

### 7.2 Protocolo de Escalamiento

| Paso | Accion | Tiempo |
|---|---|---|
| 1 | Ventas detecta red flag durante la interaccion | Inmediato |
| 2 | Ventas NO confronta ni acusa al cliente | N/A |
| 3 | Ventas dice: "Permita me un momento, necesito verificar algo con mi equipo" | Inmediato |
| 4 | Ventas envia mensaje a Susana por canal de compliance (ver seccion 8) | Dentro de 5 minutos |
| 5 | Mensaje incluye: nombre del cliente, numero de cuenta (si tiene), red flag detectada, cita textual si es posible | N/A |
| 6 | Susana responde con instrucciones | Dentro de 30 minutos |
| 7 | Ventas sigue instrucciones de Susana al pie de la letra | Inmediato |
| 8 | Ventas registra todo el incidente en Skale CRM | Mismo dia |

### 7.3 Regla de Oro para Ventas

**"En caso de duda, escala."** Es mejor escalar una situacion que resulte ser normal que no escalar una que resulte ser problematica. Susana NUNCA va a criticar a un vendedor por escalar. Si va a criticar por no escalar cuando debia haberlo hecho.

---

## 8. CANALES DE COMUNICACION

### 8.1 Canal de Comunicacion Interna Sales-Compliance

| Tipo de Comunicacion | Canal | Tiempo de Respuesta |
|---|---|---|
| Escalamiento de red flag (URGENTE) | Grupo de WhatsApp "Compliance Urgente" + llamada a Susana | 30 minutos maximo |
| Consulta sobre KYC de un cliente especifico | Slack canal #compliance-sales | 2 horas (horario laboral) |
| Solicitud de aprobacion de deposito/retiro | Skale CRM (ticket) + Slack #compliance-sales | Segun SLA del tipo de operacion |
| Pregunta general sobre reglas de compliance | Slack canal #compliance-sales | 4 horas (horario laboral) |
| Reporte de incidente NO urgente | Email a susana@neomaaa.com + registro en CRM | 24 horas |

### 8.2 Informacion que Ventas Debe Incluir en Toda Comunicacion con Compliance

| Campo | Ejemplo |
|---|---|
| Nombre completo del cliente | Juan Carlos Rodriguez Perez |
| Numero de cuenta (si tiene) | NMKT-12345 |
| Tipo de solicitud | KYC pendiente / Deposito para aprobacion / Red flag / Consulta |
| Descripcion breve | "Cliente quiere depositar $15,000 con tarjeta, es su primer deposito" |
| Urgencia | Baja / Media / Alta / Critica |
| Acciones ya tomadas por ventas | "Le informe al cliente que su deposito esta en proceso de verificacion" |

### 8.3 Horarios de Atencion de Compliance

| Dia | Horario de Susana | Cobertura Fuera de Horario |
|---|---|---|
| Lunes a Viernes | 9:00 AM - 6:00 PM (hora local) | Urgencias: WhatsApp. Se responde en la manana siguiente para no urgentes |
| Sabado | No disponible (salvo emergencias) | Solo emergencias criticas por WhatsApp |
| Domingo | No disponible | Solo emergencias criticas por WhatsApp |

**Emergencias fuera de horario:** Unicamente para red flags criticos (mencion de terrorismo, actividad criminal, intento de fraude obvio). Todo lo demas espera al siguiente dia habil.

---

## 9. SLAS Y TIEMPOS DE RESPUESTA

### 9.1 SLAs de Compliance

| Proceso | SLA Objetivo | SLA Maximo | Escalamiento si se Excede |
|---|---|---|---|
| Aprobacion KYC automatica (Sumsub) | 2-5 minutos | 15 minutos | Soporte tecnico |
| Revision manual de KYC | 2 horas | 24 horas | Principals |
| Respuesta a RETRY (instrucciones al cliente) | 30 minutos | 4 horas | N/A |
| Aprobacion de deposito Tier 2 | 4 horas | 24 horas | Principals |
| Aprobacion de deposito Tier 3 | 12 horas | 24 horas | Principals |
| Aprobacion de deposito Tier 4 | 24 horas | 48 horas | Principals |
| Aprobacion de retiro estandar | 4 horas | 24 horas | Principals |
| Aprobacion de retiro > $25,000 | 24 horas | 48 horas | Principals |
| Respuesta a escalamiento de red flag | 30 minutos | 2 horas | Principals |
| Respuesta a consulta general | 4 horas | 24 horas | N/A |

### 9.2 SLAs de Ventas

| Proceso | SLA Objetivo | SLA Maximo |
|---|---|---|
| Registrar interaccion en CRM | Mismo dia | 24 horas |
| Contactar al cliente post-aprobacion KYC | 30 minutos | 2 horas |
| Contactar al cliente post-RETRY | 30 minutos | 2 horas |
| Responder consulta de cliente | 1 hora | 4 horas |
| Escalar red flag a Compliance | Inmediato (5 minutos) | 30 minutos |

### 9.3 Monitoreo de SLAs

- Susana revisa semanalmente el cumplimiento de SLAs.
- Se reportan incumplimientos en la reunion semanal.
- SLAs excedidos repetidamente se escalan a Principals para resolver cuellos de botella.

---

## 10. REUNION SEMANAL SALES-COMPLIANCE

### 10.1 Estructura de la Reunion

| Dato | Detalle |
|---|---|
| Frecuencia | Semanal (todos los lunes) |
| Hora | 10:00 AM (hora local) |
| Duracion | 30-45 minutos |
| Participantes obligatorios | Edward + Susana |
| Participantes opcionales | Franco, Luis (si tienen casos) |
| Formato | Videollamada o presencial |

### 10.2 Agenda Fija

| Punto | Tiempo | Descripcion |
|---|---|---|
| 1. KYC pendientes | 10 min | Revisar todos los clientes con KYC pendiente o en RETRY. Definir acciones. |
| 2. Cuentas flaggeadas | 10 min | Revisar cuentas con red flags de la semana. Estado de investigaciones. |
| 3. Depositos/retiros pendientes | 5 min | Revisar operaciones que requieren aprobacion de compliance y estan atrasadas. |
| 4. Incumplimientos de la semana | 5 min | Frases prohibidas detectadas, CRM no actualizado, SLAs excedidos. |
| 5. Actualizaciones de compliance | 5 min | Cambios en politicas, nuevas reglas, actualizaciones regulatorias. |
| 6. Preguntas de ventas | 5 min | Espacio para que ventas pregunte sobre situaciones especificas. |

### 10.3 Documentacion de la Reunion

Susana documenta cada reunion con:
- Fecha y asistentes
- Resumen de cada punto tratado
- Acciones acordadas (quien, que, cuando)
- Seguimiento de acciones de la semana anterior

El acta se comparte por email a todos los participantes + Principals dentro de las 24 horas posteriores a la reunion.

---

## 11. REGISTRO EN SKALE CRM

### 11.1 Que Debe Registrar Ventas en Skale CRM

**Obligatorio para CADA interaccion con un cliente:**

| Campo | Descripcion | Ejemplo |
|---|---|---|
| Fecha y hora | Cuando ocurrio la interaccion | 2026-04-08 14:30 |
| Canal | WhatsApp, telefono, email, chat, presencial | WhatsApp |
| Tipo de interaccion | Primer contacto, seguimiento, soporte, queja, escalamiento | Primer contacto |
| Resumen | Breve descripcion de lo hablado | "Cliente interesado en cuenta Standard. Explique servicios y envie link de registro." |
| Proxima accion | Que se debe hacer despues | "Seguimiento en 24h si no completa registro" |
| Estado del cliente | Lead, registrado, KYC pendiente, verificado, activo, inactivo | Lead |

### 11.2 Registro de Documentos en CRM

Todo documento recibido del cliente (fuera de Sumsub) debe subirse a Skale CRM:
- Declaraciones de origen de fondos
- Correspondencia por email relevante
- Cualquier documento adicional solicitado por compliance

### 11.3 Auditoria Mensual de CRM por Compliance

Susana realiza una auditoria mensual del CRM:

| Que Se Revisa | Criterio de Cumplimiento |
|---|---|
| Todas las interacciones registradas | Cada cliente activo debe tener al menos 1 registro en los ultimos 30 dias |
| Notas completas y claras | No se aceptan notas vacias o genericas como "llame al cliente" |
| Acciones de seguimiento cumplidas | Las proximas acciones registradas se ejecutaron en tiempo |
| Escalamientos documentados | Todo red flag escalado tiene registro en CRM |
| Disclaimers en comunicaciones escritas | Emails y mensajes enviados incluyen disclaimer de riesgo |

**Resultado de la auditoria:**
- Cumplimiento > 90%: satisfactorio.
- Cumplimiento 70-90%: observacion y feedback.
- Cumplimiento < 70%: advertencia escrita + capacitacion inmediata.

---

## 12. MATRIZ DE ESCALAMIENTO

### 12.1 A Quien Escalar Segun el Tipo de Situacion

| Situacion | Escalar a Susana | Escalar a Principals | Notas |
|---|---|---|---|
| KYC en RETRY -- cliente necesita instrucciones | Si | No | Susana instruye a ventas |
| KYC REJECTED por fraude | Si | No (Susana decide si escalar) | Susana maneja y decide SAR |
| Cliente de pais restringido intenta registrarse | Si | No | Susana confirma rechazo |
| Red flag durante conversacion de ventas | Si | No (salvo amenazas) | Susana investiga |
| Deposito Tier 2/3 requiere aprobacion | Si | No | Susana aprueba |
| Deposito Tier 4 ($50,000+) | Si | Si | Ambos deben aprobar |
| Sospecha de lavado de dinero | Si | Si (inmediato) | SAR posible |
| PEP detectado | Si | Si | EDD + aprobacion conjunta |
| Cliente amenaza con denuncia legal | Si | Si | Respuesta coordinada |
| Cliente amenaza con violencia | Si | Si + autoridades si necesario | Seguridad primero |
| Error tecnico en Sumsub o Skale | Si (si afecta compliance) | Si (si afecta operacion) | Soporte tecnico tambien |
| Cliente insatisfecho con ejecucion/spreads | No (soporte) | No | No es tema de compliance |
| Cliente quiere cambiar tipo de cuenta | No (soporte) | No | No es tema de compliance |
| Cliente pregunta sobre instrumentos | No (ventas resuelve) | No | No es tema de compliance |
| Cliente quiere cerrar su cuenta | Si (verificar que no hay investigaciones) | No | Susana da clearance |

### 12.2 Resumen Visual de Escalamiento

```
SITUACION DETECTADA POR VENTAS
              |
              v
     Es tema de compliance?
              |
      +-------+-------+
      |               |
     NO              SI
      |               |
      v               v
  Ventas o         Escalar
  Soporte         a SUSANA
  resuelve            |
                      v
               Susana puede
               resolver sola?
                      |
              +-------+-------+
              |               |
             SI              NO
              |               |
              v               v
         Susana            Escalar a
         resuelve         PRINCIPALS
         e informa            |
                              v
                        Principals
                        + Susana
                        deciden
```

---

## 13. LO QUE VENTAS PUEDE Y NO PUEDE HACER

### 13.1 Tabla Completa de Permisos

| Accion | PUEDE | NO PUEDE | Notas |
|---|---|---|---|
| Explicar servicios de NEOMAAA | Si | | Usando material aprobado |
| Enviar link de registro | Si | | Link oficial unicamente |
| Guiar al cliente en el proceso de KYC | Si | | Explicar que documentos y como subirlos |
| Aprobar o rechazar KYC | | No | Solo Susana/Sumsub |
| Decirle al cliente que su KYC fue aprobado | Si | | Despues de que Sumsub/Susana confirme |
| Decirle al cliente la razon de rechazo por fraude | | No | Solo script generico aprobado |
| Recomendar tipo de cuenta | Si | | Basado en guia de recomendacion |
| Recomendar metodo de deposito | Si | | Basado en guia por pais |
| Aprobar depositos o retiros | | No | Solo Compliance/Sistema |
| Prometer tiempo de aprobacion de KYC | | No | Solo dar estimados generales |
| Prometer ganancias o resultados | | No | Frase prohibida |
| Dar consejos de trading | | No | Frase prohibida |
| Ofrecer bonos o promociones | Si, solo las aprobadas | No puede crear o prometer bonos propios | Solo promociones vigentes y aprobadas |
| Registrar interacciones en CRM | Si (obligatorio) | | Todo debe quedar registrado |
| Acceder a documentos KYC del cliente | | No | Informacion confidencial de compliance |
| Informar al cliente sobre investigaciones internas | | No | Tipping off, causa de terminacion |
| Resolver quejas sobre ejecucion | | No (escalar a soporte/dealing) | No es ambito de ventas |
| Contactar a Susana para consultas | Si | | Por canales definidos |
| Presionar a Susana para acelerar procesos | | No | Compliance no se acelera |

---

## 14. SCRIPTS PARA SITUACIONES COMUNES

### 14.1 Scripts para Ventas

**Cliente nuevo - primer contacto:**
> "Bienvenido a NEOMAAA Markets. Mi nombre es [nombre] y estare acompanandole en el proceso de apertura de cuenta. NEOMAAA le ofrece acceso a mas de 2,000 instrumentos financieros a traves de MetaTrader 5, con spreads competitivos y mas de 120 metodos de deposito. Le recuerdo que el trading de CFDs y forex conlleva un alto riesgo de perdida de capital. Puedo guiarle en el proceso de registro si esta interesado."

**Cliente pregunta por garantias de ganancia:**
> "En NEOMAAA no garantizamos resultados de trading. El mercado forex y de CFDs es de alto riesgo y los resultados dependen de multiples factores, incluyendo su estrategia, gestion de riesgo y condiciones del mercado. Le recomendamos no invertir dinero que no pueda permitirse perder. Si gusta, puede comenzar con una cuenta demo gratuita para familiarizarse con la plataforma."

**Cliente de pais restringido:**
> "Agradecemos su interes en NEOMAAA. Lamentablemente, por regulaciones aplicables, no podemos ofrecer nuestros servicios a residentes de [pais]. Le pedimos disculpas por la inconveniencia."

**Cliente frustrado con tiempo de KYC:**
> "Entiendo su frustracion y le pido disculpas por la espera. La verificacion de identidad es un requisito regulatorio que nos permite proteger tanto a usted como a nuestra plataforma. Nuestro equipo esta procesando su verificacion y le informaremos el resultado lo antes posible."

**Cliente pregunta por que se piden tantos documentos:**
> "Los documentos que solicitamos son un requisito regulatorio obligatorio para todas las empresas financieras autorizadas. Esto protege a nuestros clientes contra el uso no autorizado de sus datos y garantiza la seguridad de sus fondos. Su informacion se maneja de forma confidencial y segura."

**Cliente quiere depositar con tarjeta de un familiar:**
> "Por regulacion, solo podemos aceptar depositos del titular de la cuenta. El nombre en el metodo de pago debe coincidir exactamente con el nombre de su cuenta NEOMAAA. Le sugiero utilizar un metodo de pago a su propio nombre."

**Cliente pregunta cuanto puede ganar:**
> "Los resultados de trading son completamente variables y dependen de su estrategia, capital, gestion de riesgo y condiciones del mercado. No es posible predecir ni garantizar un rendimiento especifico. Le recomendamos educarse sobre los riesgos del trading antes de operar con fondos reales."

**Retiro demorado:**
> "Su solicitud de retiro esta siendo procesada por nuestro equipo de verificacion. Este es un proceso de seguridad estandar que protege sus fondos. Le notificaremos una vez que el retiro sea aprobado. Los plazos tipicos de procesamiento son de [X] dias habiles."

**Escalamiento de red flag (lo que ventas dice al cliente mientras escala):**
> "Permita me un momento, necesito verificar algo con mi equipo. Le contactare en breve con una respuesta."

**Cliente quiere cerrar su cuenta:**
> "Lamento que quiera cerrar su cuenta. Puedo preguntar el motivo? Para procesar el cierre, primero debemos asegurarnos de que no tenga saldo pendiente. Si tiene fondos, primero debera solicitar un retiro. Una vez procesado, nuestro equipo procedera al cierre de la cuenta. Le envio las instrucciones por email."

---

## NOTA FINAL

Este documento establece las reglas de interaccion entre ventas y compliance. Su cumplimiento es obligatorio y no negociable. Cualquier duda sobre su interpretacion debe consultarse con Susana antes de actuar.

**Responsabilidad:**
- Ventas es responsable de conocer y cumplir este documento.
- Susana es responsable de supervisar el cumplimiento y capacitar al equipo.
- Principals son responsables de asegurar que tanto ventas como compliance tengan los recursos necesarios para cumplir.

**Proxima revision programada:** 8 de julio de 2026

---

*Documento generado el 8 de abril de 2026. Version 1.0.*
