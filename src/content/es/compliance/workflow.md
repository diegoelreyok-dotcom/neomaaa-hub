# NEOMAAA BROKER - WORKFLOW DE COMPLIANCE OPERATIVO

**Documento interno - CONFIDENCIAL**
**Licencia Anjouan: L15968/N | Regulador: AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**

---

## INDICE

1. [Plan de Capacitacion Broker para Susana](#1-plan-de-capacitacion-broker-para-susana)
2. [Flujo KYC Paso a Paso con Sumsub](#2-flujo-kyc-paso-a-paso-con-sumsub)
3. [Protocolo de Comunicacion Ventas-Compliance](#3-protocolo-de-comunicacion-ventas-compliance)
4. [Proceso de Aprobacion de Retiros](#4-proceso-de-aprobacion-de-retiros)
5. [Checklist Mensual de Compliance](#5-checklist-mensual-de-compliance)
6. [Matriz de Acciones Prohibidas por Rol](#6-matriz-de-acciones-prohibidas-por-rol)

---

## 1. PLAN DE CAPACITACION BROKER PARA SUSANA

### 1.1 Lo Que Cambia: Prop Firm vs Broker

| Concepto | Prop Firm (NEOMAAA Funded) | Broker (NEOMAAA Broker) |
|---|---|---|
| Dinero del cliente | NO - es capital de la firma | SI - depositos reales del cliente |
| Retiros | Solo profits simulados | Dinero real, requiere verificacion AML |
| Riesgo regulatorio | Bajo (no regulado como tal) | Alto - licencia AOFA, auditorias |
| KYC requerido | Basico (identidad) | Completo: ID + prueba de domicilio + source of funds |
| Monitoreo de transacciones | No aplica | OBLIGATORIO - depositos, retiros, patrones |
| Reporte a regulador | No aplica | OBLIGATORIO - SARs, reportes trimestrales AOFA |
| PEP screening | Opcional | OBLIGATORIO en cada onboarding |
| Sanciones (OFAC, UN, EU) | Opcional | OBLIGATORIO - screening continuo |
| Fondos de terceros | No relevante | PROHIBIDO - el depositante debe ser el titular |

### 1.2 Modulos de Capacitacion

**MODULO 1 - Semana 1: Marco Regulatorio (8 horas)**

- Que es la licencia Anjouan L15968/N y que obliga
- Estructura de la AOFA (Anjouan Offshore Finance Authority)
- Obligaciones de reporte: que, cuando, como
- Consecuencias de incumplimiento (multas, revocacion de licencia)
- Lectura obligatoria: Anjouan International Business Companies Act
- Lectura obligatoria: AOFA AML/CFT Guidelines

**MODULO 2 - Semana 2: AML/CFT para Brokers (10 horas)**

- Que es lavado de dinero y financiamiento del terrorismo
- Las 3 etapas: colocacion, estratificacion, integracion
- Red flags especificas de brokers forex/CFD:
  - Depositos multiples pequenos seguidos de retiro grande (structuring)
  - Deposito y retiro inmediato sin operar (pass-through)
  - Multiples cuentas desde misma IP/dispositivo
  - Depositos de terceros (nombre diferente al titular)
  - Cambios frecuentes de metodo de retiro
  - Clientes que rechazan dar source of funds
  - Volumen de trading inconsistente con perfil declarado
  - Deposito grande inmediato despues de abrir cuenta sin historial
  - Cliente de pais de alto riesgo con documentos sospechosos
  - Uso exclusivo de crypto sin conversion a fiat ni trading real

**MODULO 3 - Semana 3: KYC Operativo con Sumsub (8 horas)**

- Dashboard de Sumsub: navegacion completa
- Como interpretar cada resultado (GREEN, RED FINAL, RED RETRY, YELLOW)
- Verificacion manual cuando Sumsub no puede decidir
- Documentos aceptados por pais (IDs, pruebas de domicilio)
- Enhanced Due Diligence (EDD): cuando se activa y que hacer
- Source of Funds: que documentos pedir segun monto
- Practica: revisar 20 casos reales en sandbox de Sumsub

**MODULO 4 - Semana 4: Monitoreo de Transacciones y Retiros (8 horas)**

- Como monitorear depositos y retiros en el panel del broker
- Umbrales de alerta (definidos en seccion 4 de este documento)
- Como documentar una alerta y que hacer con ella
- Proceso de escalamiento
- Como llenar un SAR (Suspicious Activity Report)
- Simulacro: 5 escenarios con transacciones sospechosas

### 1.3 Red Flags AML Especificas de Broker (Referencia Rapida para Susana)

**RIESGO ALTO - Accion inmediata requerida:**

| # | Red Flag | Accion |
|---|---|---|
| 1 | Deposito de tercero (nombre no coincide) | BLOQUEAR deposito. Notificar al cliente. Devolver fondos al origen |
| 2 | Cliente en lista OFAC/sanciones | RECHAZAR cuenta. Reportar a AOFA en 24h |
| 3 | PEP identificado sin documentacion adicional | PAUSAR cuenta. Solicitar EDD completo |
| 4 | Deposito > $10,000 USD sin source of funds | PAUSAR deposito. Solicitar documentacion |
| 5 | Multiples cuentas misma persona | CERRAR duplicadas. Investigar intencion |
| 6 | Pais restringido detectado post-apertura | CERRAR cuenta. Devolver fondos. Reportar |

**RIESGO MEDIO - Monitoreo aumentado:**

| # | Red Flag | Accion |
|---|---|---|
| 7 | Deposito y retiro sin operar (< 3 trades) | Marcar cuenta para monitoreo. Si repite, pedir explicacion |
| 8 | Cambio frecuente de metodo de retiro | Monitorear. Despues de 3 cambios en 30 dias, pedir justificacion |
| 9 | Depositos fraccionados (multiples < $1,000 en 24h) | Sumar total. Si > $5,000, tratar como deposito grande |
| 10 | Perfil dice "ingreso bajo" pero deposita > $5,000 | Solicitar source of funds |

### 1.4 Enhanced Due Diligence (EDD) - Cuando Se Activa

EDD es obligatorio cuando:

1. El cliente es PEP (Persona Politicamente Expuesta) o familiar/asociado de PEP
2. Deposito acumulado supera $25,000 USD
3. Cliente de pais de alto riesgo (no restringido, pero alto riesgo: Venezuela, Nigeria, Pakistan, Bangladesh, etc.)
4. Actividad sospechosa detectada en monitoreo
5. Source of funds no es claro o inconsistente

**Documentos adicionales para EDD:**

- Declaracion de Source of Funds firmada (template abajo)
- Comprobante de ingresos (recibo de nomina, declaracion fiscal, estado de cuenta bancario)
- Para PEPs: declaracion patrimonial o equivalente
- Para empresas: acta constitutiva, estructura accionaria, beneficiario final

### 1.5 Source of Funds - Template de Declaracion

```
DECLARACION DE ORIGEN DE FONDOS

Yo, [NOMBRE COMPLETO], titular de la cuenta #[NUMERO],
declaro que los fondos depositados en NEOMAAA provienen de:

[ ] Salario/Ingreso laboral
    Empleador: _______________
    Cargo: _______________
    Ingreso mensual aproximado: _______________

[ ] Negocio propio
    Nombre del negocio: _______________
    Tipo de actividad: _______________
    Ingreso mensual aproximado: _______________

[ ] Inversiones / Ahorros
    Tipo de inversion: _______________
    Institucion financiera: _______________

[ ] Herencia
    Detalle: _______________

[ ] Otro: _______________

Declaro que esta informacion es veridica y me comprometo
a notificar a NEOMAAA cualquier cambio en mi situacion financiera.

Firma: _______________
Fecha: _______________
Numero de documento: _______________
```

---

## 2. FLUJO KYC PASO A PASO CON SUMSUB

### 2.1 Diagrama del Flujo Completo

```
REGISTRO EN WEB/APP
        |
        v
DATOS BASICOS (nombre, email, pais, telefono)
        |
        v
    FILTRO PAIS
   /          \
RESTRINGIDO    PERMITIDO
   |               |
RECHAZO          SUMSUB KYC
AUTOMATICO       (ID + Selfie + Proof of Address)
                    |
                    v
            RESULTADO SUMSUB
           /    |    |     \
        GREEN  YELLOW  RED     RED
                       RETRY   FINAL
```

### 2.2 Paises Restringidos (Rechazo Automatico)

Estos paises NO pueden abrir cuenta bajo ninguna circunstancia:

- Estados Unidos (USA)
- Canada
- Espacio Economico Europeo (EEA) - todos los paises
- Reino Unido (UK)
- Australia
- Cuba
- Iraq
- Myanmar
- Corea del Norte
- Sudan
- Cualquier jurisdiccion sancionada por OFAC, ONU, o UE

**Configurar en Sumsub:** Bloqueo automatico por pais de emision del documento y por IP geolocation.

### 2.3 Resultados de Sumsub y Acciones

#### GREEN (Aprobado)

**Significado:** Identidad verificada, documentos validos, no hay matches en listas de sanciones.

**Acciones:**
1. Susana revisa el resultado en el dashboard de Sumsub (no solo el color, tambien los detalles)
2. Verifica manualmente que el pais no esta restringido
3. Verifica que no haya PEP match (a veces Sumsub da GREEN con PEP flag aparte)
4. Si todo esta bien: **ACTIVAR CUENTA**
5. Tiempo maximo: **4 horas habiles** desde que Sumsub da GREEN

**Comunicacion al cliente (automatica via Intercom):**
```
Asunto: Tu cuenta NEOMAAA ha sido verificada

Hola [NOMBRE],

Tu verificacion de identidad ha sido aprobada exitosamente.
Tu cuenta esta activa y lista para operar.

Puedes depositar fondos ahora: [LINK DEPOSITO]

Si tienes preguntas, estamos aqui para ayudarte.

Equipo NEOMAAA
```

#### RED RETRY (Rechazado - Puede Reintentar)

**Significado:** Problema con el documento pero el cliente puede corregirlo. Causas comunes:
- Foto borrosa o cortada
- Documento vencido
- Proof of address con mas de 3 meses de antiguedad
- Selfie no coincide bien (lentes, gorra, mala luz)
- Documento no legible
- Tipo de documento incorrecto (ej: envio tarjeta de credito en vez de utilidad)

**Acciones:**
1. Susana revisa la razon especifica del rechazo en Sumsub
2. Clasifica si es algo que el cliente puede corregir facilmente
3. Notifica al agente de ventas asignado con la razon exacta
4. El agente de ventas contacta al cliente con instrucciones claras
5. El cliente tiene **3 intentos** para corregir
6. Si falla 3 veces: escalar a Susana para revision manual

**Razon de rechazo y mensaje al cliente:**

| Razon Sumsub | Mensaje para el cliente |
|---|---|
| Documento borroso | "Necesitamos que vuelvas a subir tu documento. Asegurate de que la foto este bien enfocada, con buena luz, y que se lean todos los datos claramente. No uses flash." |
| Documento vencido | "El documento que subiste esta vencido. Por favor sube un documento de identidad vigente." |
| Proof of address antiguo | "El comprobante de domicilio debe tener menos de 3 meses de antiguedad. Por favor sube uno mas reciente (recibo de luz, agua, gas, o estado de cuenta bancario)." |
| Selfie no coincide | "Necesitamos que tomes la selfie de nuevo. Asegurate de estar en un lugar con buena luz, sin lentes de sol ni gorra, y mirando directamente a la camara." |
| Documento incorrecto | "El documento que subiste no es valido como comprobante de domicilio. Documentos aceptados: recibo de servicios (luz, agua, gas, internet), estado de cuenta bancario, o documento fiscal. Debe mostrar tu nombre y direccion." |
| Documento cortado | "La foto de tu documento esta cortada. Asegurate de que se vean las 4 esquinas del documento completo." |

#### YELLOW (Pendiente de Revision Manual)

**Significado:** Sumsub no puede decidir automaticamente. Requiere que Susana revise manualmente.

**Causas comunes:**
- Match parcial en listas PEP
- Match parcial en listas de sanciones (homonimo)
- Documento de pais poco comun
- Discrepancia menor en datos

**Acciones:**
1. Susana revisa el caso en detalle en Sumsub (maximo **24 horas habiles**)
2. Si es homonimo PEP/sanciones: verifica con datos adicionales (fecha nacimiento, nacionalidad, etc.)
3. Si confirma que NO es la persona de la lista: aprobar manualmente con nota explicativa
4. Si no puede descartar: solicitar informacion adicional al cliente
5. Si confirma match real: RECHAZAR y reportar a AOFA
6. Documentar toda decision en Sumsub con comentarios

**SLA: 24 horas habiles para resolver un YELLOW. Si no se puede resolver, escalar a Diego.**

#### RED FINAL (Rechazado Permanentemente)

**Significado:** El cliente NO puede abrir cuenta. Causas:
- Documento fraudulento detectado
- Match confirmado en lista de sanciones
- Pais restringido
- Multiples intentos fallidos con documentos diferentes (posible fraude)
- Identidad no verificable

**Acciones:**
1. Susana confirma la razon del rechazo en Sumsub
2. NO se activa la cuenta bajo ninguna circunstancia
3. Si habia fondos depositados pre-verificacion: devolver al metodo original
4. Registrar en base de datos de rechazados
5. Si hay sospecha de fraude/lavado: reportar SAR a AOFA en 48 horas

**Comunicacion al cliente:**
```
Asunto: Resultado de tu verificacion NEOMAAA

Hola [NOMBRE],

Lamentablemente, no hemos podido verificar tu identidad
de acuerdo con nuestros requisitos regulatorios.

Si crees que esto es un error, puedes contactarnos a
compliance@neomaaa.com con documentacion adicional.

Equipo NEOMAAA
```

**IMPORTANTE: NUNCA decir la razon especifica del rechazo final al cliente. No mencionar sanciones, fraude, ni listas. Solo decir "requisitos regulatorios".**

### 2.4 SLAs de KYC

| Resultado Sumsub | Tiempo maximo para que Susana actue | Tiempo maximo para que ventas contacte al cliente |
|---|---|---|
| GREEN | 4 horas habiles | N/A (activacion automatica despues de revision) |
| RED RETRY | 2 horas habiles (revision) | 1 hora despues de que Susana notifique |
| YELLOW | 24 horas habiles | Cuando Susana indique |
| RED FINAL | 4 horas habiles (documentar y cerrar) | 2 horas (enviar mensaje de rechazo) |

**Horario de Susana:** Lunes a Viernes, 9:00 - 18:00 (hora local). Casos fuera de horario se procesan al dia siguiente.

### 2.5 Escalamiento

| Nivel | Quien | Cuando |
|---|---|---|
| Nivel 1 | Susana | Todos los casos KYC |
| Nivel 2 | Diego (Principal) | YELLOW que no se resuelve en 24h, depositos > $50K, PEP confirmado |
| Nivel 3 | AOFA | SAR, match confirmado de sanciones, fraude documentado |

---

## 3. PROTOCOLO DE COMUNICACION VENTAS-COMPLIANCE

### 3.1 Canales de Comunicacion

| Canal | Uso | Tiempo de respuesta esperado |
|---|---|---|
| Slack: #compliance-kyc | Consultas diarias de KYC, estados de verificacion, RED RETRY | 2 horas habiles |
| Slack: #compliance-urgente | PEP, sanciones, fraude sospechado, cliente enojado por bloqueo | 30 minutos habiles |
| Email: compliance@neomaaa.com | Documentacion formal, archivos de source of funds, reportes | 24 horas habiles |
| Llamada directa a Susana | Solo emergencias: deposito sospechoso grande, amenaza legal | Inmediato |

**Regla de oro: TODO queda por escrito. Si hablan por llamada, Susana debe hacer un resumen en Slack despues.**

### 3.2 Cuando Ventas Contacta a Susana (y Cuando NO)

**SI contactar a Susana:**

- Cliente lleva mas de 24 horas en KYC pendiente
- Cliente reporta que Sumsub no acepta su documento y no sabe por que
- Cliente quiere depositar mas de $10,000
- Cliente dice que es PEP o tiene cargo publico
- Cliente quiere abrir cuenta corporativa/institucional
- Cliente tiene pasaporte de pais de alto riesgo
- Cliente quiere depositar con crypto y ventas no esta seguro si es aceptable
- Retiro grande rechazado y cliente se queja

**NO contactar a Susana (ventas lo resuelve solo):**

- Cliente pregunta que documentos necesita (hay guia estandar)
- Cliente pregunta cuanto tarda la verificacion (decir 24-48 horas)
- RED RETRY por foto borrosa (ventas guia al cliente con templates de abajo)
- Cliente pregunta sobre metodos de deposito (no es tema compliance)
- Cliente pregunta sobre spreads, apalancamiento, plataforma (ventas/soporte)

### 3.3 Formato de Mensaje de Ventas a Susana (Slack)

**Para consulta de estado KYC:**
```
CONSULTA KYC
Cliente: [Nombre completo]
Email: [email]
ID Sumsub: [si lo tiene]
Cuenta #: [numero]
Problema: [descripcion breve]
Urgencia: [BAJA / MEDIA / ALTA]
Accion que necesito: [que necesitas que Susana haga]
```

**Para escalamiento de RED RETRY (3er intento fallido):**
```
ESCALAMIENTO RED RETRY
Cliente: [Nombre completo]
Email: [email]
ID Sumsub: [ID]
Intentos: 3/3
Razones de rechazo: [listar las 3]
El cliente dice: [que alega el cliente]
Solicito: Revision manual por Susana
```

**Para deposito sospechoso:**
```
ALERTA DEPOSITO
Cliente: [Nombre completo]
Cuenta #: [numero]
Monto: $[cantidad]
Metodo: [PIX/crypto/etc]
Razon de alerta: [por que te parece sospechoso]
Urgencia: ALTA
```

### 3.4 Formato de Respuesta de Susana a Ventas (Slack)

**Aprobacion:**
```
RESUELTO - KYC APROBADO
Cliente: [Nombre]
Cuenta #: [numero]
Estado: ACTIVA
Notas: [si aplica]
Fecha: [fecha y hora]
```

**Rechazo:**
```
RESUELTO - KYC RECHAZADO
Cliente: [Nombre]
Cuenta #: [numero]
Estado: RECHAZADO FINAL
Razon interna: [razon real - SOLO para equipo interno]
Mensaje para el cliente: [usar template de rechazo estandar]
NO decir al cliente: [que informacion no compartir]
Fecha: [fecha y hora]
```

**Solicitud de documentos adicionales:**
```
ACCION REQUERIDA
Cliente: [Nombre]
Cuenta #: [numero]
Necesito que el cliente envie:
1. [documento 1]
2. [documento 2]
Instrucciones para el cliente: [copiar y pegar esto al cliente]
Deadline: [fecha limite]
```

### 3.5 Templates de Ventas para Clientes con Problemas KYC

**Template 1: Documento rechazado por foto borrosa**
```
Hola [NOMBRE]! 

Tu verificacion necesita un pequeno ajuste. La foto de tu documento
no quedo clara. Te pido que la subas de nuevo con estos tips:

- Pon el documento sobre una superficie plana y oscura
- Usa buena iluminacion natural (no flash)
- Asegurate de que se vean las 4 esquinas
- Que se lean todos los textos claramente
- No tapes ninguna parte con los dedos

Puedes volver a subirlo aqui: [LINK]

Cualquier duda me dices!
```

**Template 2: Documento de domicilio rechazado**
```
Hola [NOMBRE]!

Necesitamos un comprobante de domicilio actualizado (menos de 3 meses).
Documentos que aceptamos:

- Recibo de luz, agua, gas o internet
- Estado de cuenta bancario
- Documento fiscal o gubernamental

Debe mostrar tu nombre completo y tu direccion actual.

NO aceptamos: capturas de pantalla, recibos de celular, 
contratos de alquiler, o documentos sin fecha.

Subelo aqui: [LINK]
```

**Template 3: Selfie rechazada**
```
Hola [NOMBRE]!

Necesitamos que tomes la selfie de verificacion de nuevo:

- Busca un lugar con buena luz (frente a una ventana es ideal)
- Quitate lentes de sol, gorra o cualquier accesorio
- Mira directo a la camara
- No uses filtros
- Sigue las instrucciones de la app (a veces pide girar la cabeza)

Puedes hacerlo aqui: [LINK]
```

**Template 4: Se requiere Source of Funds**
```
Hola [NOMBRE]!

Para completar la verificacion de tu cuenta, necesitamos verificar
el origen de tus fondos. Es un requisito regulatorio estandar.

Por favor envianos UNO de estos documentos:

- Ultimos 3 recibos de nomina
- Ultima declaracion de impuestos
- Estado de cuenta bancario de los ultimos 3 meses
- Documento que acredite la venta de un activo (si aplica)

Puedes enviarlo a: compliance@neomaaa.com
Asunto: Source of Funds - [tu nombre] - Cuenta #[numero]

Es un proceso rapido y tu informacion es 100% confidencial.
```

**Template 5: Cuenta rechazada (para enviar al cliente)**
```
Hola [NOMBRE],

Gracias por tu interes en NEOMAAA. Lamentablemente, despues de
revisar tu solicitud, no podemos aprobar tu cuenta en este momento
debido a nuestros requisitos regulatorios.

Si crees que esto es un error o tienes documentacion adicional
que pueda ayudar, puedes escribirnos a compliance@neomaaa.com.

Lamentamos las molestias.

Equipo NEOMAAA
```

### 3.6 Lo Que Ventas NUNCA Debe Decir

| NUNCA decir | Por que | En su lugar decir |
|---|---|---|
| "Te aprobamos la cuenta ya mismo" | Ventas NO aprueba cuentas | "Una vez que pases la verificacion, tu cuenta se activa rapidamente" |
| "No te preocupes por los documentos, es solo formalidad" | Minimiza compliance | "La verificacion es rapida y necesaria para proteger tu cuenta" |
| "Te garantizo X% de ganancia" | Ilegal, regulacion prohibe | "Los resultados dependen de tu estrategia y el mercado" |
| "No vas a perder dinero" | Ilegal | "El trading con CFDs implica riesgo de perdida" |
| "Tu deposito esta seguro/garantizado" | Falso | "Tus fondos estan en cuentas segregadas" |
| "Puedo acelerar tu verificacion" | Crea expectativa falsa | "El equipo de compliance revisa las verificaciones en 24-48 horas" |
| "Te rechazaron por sanciones/fraude" | PROHIBIDO revelar razones de rechazo | "No pudimos verificar tu cuenta por requisitos regulatorios" |
| "Usa el documento de otra persona" | Facilitar fraude | NUNCA sugerir esto bajo ninguna circunstancia |
| "Deposita con la cuenta de tu amigo/familiar" | Fondos de terceros prohibidos | "El deposito debe venir de una cuenta a tu nombre" |

---

## 4. PROCESO DE APROBACION DE RETIROS

### 4.1 Regla Fundamental

**El retiro debe ir al MISMO metodo y MISMA cuenta desde donde se deposito.** Si el cliente deposito por PIX, el retiro va por PIX a la misma cuenta. Si deposito por crypto, el retiro va a la misma wallet.

Excepciones solo con aprobacion de Susana y documentacion de la razon.

### 4.2 Umbrales de Aprobacion

| Monto del Retiro | Aprobacion | Tiempo maximo |
|---|---|---|
| Hasta $500 USD | AUTOMATICO (sistema) | 24 horas |
| $501 - $5,000 USD | Susana revisa y aprueba | 48 horas habiles |
| $5,001 - $25,000 USD | Susana revisa + aprobacion de Diego | 72 horas habiles |
| Mas de $25,000 USD | Susana revisa + Diego aprueba + documentacion EDD | 5 dias habiles |

### 4.3 Checklist de Revision de Retiro (Para Susana)

Para cada retiro que requiere revision manual ($501+):

```
CHECKLIST RETIRO - Cuenta #_______

[ ] Cliente tiene KYC completo y aprobado
[ ] El metodo de retiro coincide con metodo de deposito
[ ] El nombre del destinatario es el mismo titular de la cuenta
[ ] El cliente ha operado (no es deposito-retiro sin trading)
    - Numero de trades: ___
    - Volumen operado: ___
[ ] No hay alertas AML activas en la cuenta
[ ] Historial de depositos vs retiros es razonable
[ ] Si es >$5,000: source of funds documentado
[ ] Si es >$25,000: EDD completado

DECISION:
[ ] APROBADO
[ ] RECHAZADO - Razon: _______________
[ ] PENDIENTE - Necesito: _______________

Firma: Susana
Fecha: _______________
```

### 4.4 Red Flags en Retiros

**BLOQUEAR Y INVESTIGAR inmediatamente:**

1. **Retiro a tercero:** El nombre del destinatario no coincide con el titular de la cuenta
2. **Retiro total inmediato:** Cliente deposita y retira todo en menos de 48 horas sin operar
3. **Retiro fragmentado:** Multiples retiros justo debajo del umbral de revision ($490, $490, $490...)
4. **Cambio de metodo:** Cliente deposita por crypto y quiere retirar a banco (o viceversa) sin justificacion
5. **Retiro despues de deposito de tercero:** Alguien deposito en la cuenta del cliente y ahora el cliente quiere retirar
6. **Velocidad inusual:** Mas de 3 solicitudes de retiro en 24 horas
7. **Cuenta nueva con retiro grande:** Cuenta con menos de 7 dias y solicita retiro > $2,000

**MONITOREAR (no bloquear pero documentar):**

8. Retiro que deja la cuenta en $0
9. Retiros frecuentes y regulares (patron de "salario" - podria indicar cuenta de paso)
10. Cliente que siempre retira profits pero nunca el principal

### 4.5 Proceso Paso a Paso

```
CLIENTE SOLICITA RETIRO
         |
         v
   MONTO <= $500?
    /         \
  SI           NO
   |            |
AUTO-          SUSANA REVISA
APROBADO       (Checklist 4.3)
   |            |
   |        APROBADO?
   |       /    |    \
   |     SI   PEND.   NO
   |      |     |      |
   |   MONTO   PEDIR   RECHAZAR
   |  >$5K?   DOCS    (notificar
   |   / \     |      con razon)
   | NO  SI    |
   |  |   |    |
   |  |  DIEGO |
   |  | APRUEBA|
   |  |   |    |
   v  v   v    v
  PROCESAR   CLIENTE
  RETIRO     PROVEE DOCS
              |
              v
           SUSANA RE-EVALUA
```

### 4.6 Templates de Comunicacion de Retiros

**Retiro aprobado (>$500):**
```
Hola [NOMBRE],

Tu solicitud de retiro por $[MONTO] ha sido aprobada.
Los fondos seran enviados a [METODO] en un plazo de [24-72] horas.

Numero de referencia: [REF]

Equipo NEOMAAA
```

**Retiro pendiente de documentacion:**
```
Hola [NOMBRE],

Tu solicitud de retiro por $[MONTO] esta en revision.
Para procesarla, necesitamos la siguiente documentacion:

[LISTA DE DOCUMENTOS]

Por favor enviala a compliance@neomaaa.com
con el asunto: Retiro - [tu nombre] - Cuenta #[numero]

Una vez recibida, procesaremos tu solicitud en [plazo].

Equipo NEOMAAA
```

**Retiro rechazado (generico):**
```
Hola [NOMBRE],

Tu solicitud de retiro por $[MONTO] no pudo ser procesada.
Razon: [RAZON PERMITIDA - ver tabla abajo]

Si tienes preguntas, contactanos por el chat de soporte
o escribe a compliance@neomaaa.com.

Equipo NEOMAAA
```

**Razones permitidas para comunicar al cliente:**

| Razon real | Lo que se dice al cliente |
|---|---|
| Sospecha de lavado | "Necesitamos documentacion adicional para procesar tu retiro" |
| Tercero detectado | "El retiro debe ir a una cuenta a tu nombre. Por favor actualiza los datos del destinatario" |
| Cuenta no verificada completamente | "Tu cuenta necesita completar la verificacion antes de procesar retiros" |
| No hay suficiente actividad de trading | "Necesitamos verificar la actividad de tu cuenta antes de procesar el retiro" |
| Posible fraude | "Tu retiro esta en revision por nuestro equipo de compliance" |

---

## 5. CHECKLIST MENSUAL DE COMPLIANCE

### 5.1 Tareas Diarias de Susana

| Tarea | Hora recomendada | Tiempo estimado |
|---|---|---|
| Revisar nuevos KYC (GREEN pendientes de activacion) | 9:00 AM | 30 min |
| Revisar RED RETRY y YELLOW pendientes | 9:30 AM | 45 min |
| Revisar solicitudes de retiro pendientes (>$500) | 10:30 AM | 30 min |
| Revisar canal #compliance-kyc en Slack | 11:00 AM | 15 min |
| Segunda ronda de KYC y retiros | 2:00 PM | 45 min |
| Revisar alertas de transacciones del dia | 4:00 PM | 30 min |
| Actualizar tracker de casos pendientes | 5:00 PM | 15 min |

### 5.2 Tareas Semanales de Susana (Viernes)

| # | Tarea | Descripcion |
|---|---|---|
| 1 | Reporte semanal de KYC | Total aprobados, rechazados, pendientes. Tiempo promedio de resolucion |
| 2 | Revision de transacciones sospechosas | Revisar cuentas marcadas durante la semana, actualizar estado |
| 3 | Actualizacion de listas de sanciones | Verificar si hay actualizaciones en OFAC, UN, EU. Sumsub lo hace automatico pero verificar |
| 4 | Revision de retiros de la semana | Total procesado, rechazados, escalados |
| 5 | Sync con ventas (15 min) | Reunion rapida para resolver dudas acumuladas |

### 5.3 Tareas Mensuales de Susana (Ultimo viernes del mes)

| # | Tarea | Deadline | Entregable |
|---|---|---|---|
| 1 | Reporte mensual de compliance | Ultimo dia del mes | Documento con metricas KYC, retiros, alertas |
| 2 | Revision de cuentas de alto riesgo | Dia 25 | Lista actualizada de cuentas EDD |
| 3 | Actualizacion de base de datos de rechazados | Dia 28 | Spreadsheet actualizado |
| 4 | Revision de politicas (cambio algo?) | Dia 28 | Nota si hay cambios necesarios |
| 5 | Capacitacion a ventas (15 min) | Primer lunes del mes | Mini-sesion sobre errores comunes |
| 6 | Backup de registros compliance | Ultimo dia del mes | Copia de seguridad de todos los documentos |

### 5.4 Tareas Trimestrales (Para Reporte a AOFA)

| # | Tarea | Deadline | Entregable |
|---|---|---|---|
| 1 | Reporte trimestral AML a AOFA | 15 dias despues del cierre del trimestre | Formulario AOFA con estadisticas |
| 2 | Revision de politica AML completa | Fin de trimestre | Documento actualizado si hay cambios |
| 3 | Auditoria interna de expedientes | Fin de trimestre | Muestreo aleatorio de 10% de cuentas |
| 4 | Actualizacion de evaluacion de riesgo | Fin de trimestre | Risk assessment actualizado |
| 5 | Reporte de SARs presentados | Junto con reporte trimestral | Lista de SARs (si hubo) |

### 5.5 Template de Reporte Mensual

```
REPORTE MENSUAL DE COMPLIANCE - NEOMAAA
Mes: [MES/ANO]
Elaborado por: Susana [Apellido] - Compliance Officer

1. RESUMEN KYC
   - Solicitudes recibidas: ___
   - Aprobadas (GREEN): ___
   - Rechazadas temporales (RED RETRY): ___
   - Pendientes revision manual (YELLOW): ___
   - Rechazadas permanentes (RED FINAL): ___
   - Tiempo promedio de aprobacion: ___ horas
   - Casos escalados a Diego: ___

2. RETIROS
   - Total solicitudes de retiro: ___
   - Aprobados automaticos (<$500): ___
   - Aprobados por Susana ($500-$5K): ___
   - Aprobados por Diego (>$5K): ___
   - Rechazados: ___
   - Razon principal de rechazo: ___

3. ALERTAS AML
   - Alertas generadas: ___
   - Investigaciones abiertas: ___
   - Investigaciones cerradas: ___
   - SARs presentados a AOFA: ___
   - Cuentas bloqueadas: ___

4. EDD (Enhanced Due Diligence)
   - Cuentas con EDD activo: ___
   - Nuevas EDD este mes: ___
   - EDD resueltas este mes: ___

5. PEPs
   - PEPs identificados (total activos): ___
   - Nuevos PEPs este mes: ___

6. PAISES DE ALTO RIESGO
   - Cuentas activas de paises alto riesgo: ___
   - Desglose por pais: ___

7. INCIDENTES
   - Incidentes de compliance: ___
   - Detalle: ___

8. CAPACITACION
   - Sesiones realizadas: ___
   - Temas cubiertos: ___

9. OBSERVACIONES Y RECOMENDACIONES
   ___________________________________

Firma: _______________
Fecha: _______________
```

---

## 6. MATRIZ DE ACCIONES PROHIBIDAS POR ROL

### 6.1 Permisos por Rol

| Accion | Franco/Edward/Luis (Ventas) | Susana (Compliance) | Diego (Principal) |
|---|---|---|---|
| Aprobar KYC | NO | SI | SI |
| Rechazar KYC | NO | SI | SI |
| Activar cuenta de trading | NO | SI | SI |
| Desactivar/bloquear cuenta | NO | SI | SI |
| Aprobar retiro < $500 | NO (automatico) | Monitorea | Monitorea |
| Aprobar retiro $500-$5K | NO | SI | SI |
| Aprobar retiro $5K-$25K | NO | SI (inicia) | SI (aprueba final) |
| Aprobar retiro > $25K | NO | SI (inicia + EDD) | SI (aprueba final) |
| Ver documentos KYC del cliente | NO | SI | SI |
| Acceder a Sumsub dashboard | NO | SI | SI |
| Comunicar rechazo de KYC al cliente | SI (con template aprobado) | SI | SI |
| Explicar razon especifica de rechazo | NO | Solo internamente | Solo internamente |
| Prometer aprobacion de cuenta | NO | NO | NO |
| Prometer tiempos de retiro especificos | NO | NO | NO |
| Manejar depositos de clientes | NO | NO | NO (solo procesador de pagos) |
| Modificar datos del cliente | NO | SI (con justificacion) | SI |
| Hacer override de KYC rechazado | NO | NO | SI (documentado) |
| Presentar SAR a AOFA | NO | SI (prepara) | SI (firma y envia) |
| Comunicar al equipo sobre listas de sanciones | NO | SI | SI |
| Acceder a informacion financiera del cliente | NO | SI (para compliance) | SI |
| Ofrecer bonos/promociones | SI (aprobadas por marketing) | NO | SI (aprueba) |
| Dar consejo de inversion/trading | NO | NO | NO |
| Garantizar resultados/ganancias | NO | NO | NO |

### 6.2 Sanciones Internas por Violacion

| Nivel | Violacion | Consecuencia |
|---|---|---|
| Leve | Mensaje fuera de template, prometer tiempos no aprobados | Advertencia verbal + capacitacion |
| Media | Acceder a informacion no autorizada, saltarse proceso de escalamiento | Advertencia escrita |
| Grave | Revelar razones de rechazo al cliente, aprobar algo sin autorizacion | Suspension inmediata + revision |
| Critica | Ayudar a cliente a falsificar documentos, ignorar alerta AML | Despido inmediato + reporte a AOFA |

### 6.3 Prohibiciones Absolutas (Para TODOS)

1. **NUNCA** ayudar a un cliente a evadir controles KYC
2. **NUNCA** sugerir que use documentos de otra persona
3. **NUNCA** aceptar depositos de terceros
4. **NUNCA** revelar que un cliente fue rechazado por sanciones/PEP
5. **NUNCA** procesar un retiro a nombre de otra persona
6. **NUNCA** ignorar una alerta de transaccion sospechosa
7. **NUNCA** borrar registros o comunicaciones de compliance
8. **NUNCA** prometer resultados de trading
9. **NUNCA** operar la cuenta de un cliente
10. **NUNCA** compartir informacion de un cliente con otro cliente

---

## ANEXO A: DOCUMENTOS ACEPTADOS POR TIPO

### Identificacion (uno de estos):
- Pasaporte vigente
- Documento nacional de identidad vigente (ambos lados)
- Licencia de conducir vigente (solo si tiene foto y fecha de nacimiento)

### Prueba de Domicilio (uno de estos, menos de 3 meses):
- Recibo de servicios publicos (luz, agua, gas, internet fijo)
- Estado de cuenta bancario
- Documento fiscal o gubernamental con direccion
- Certificado de residencia emitido por autoridad local

### NO se aceptan como prueba de domicilio:
- Capturas de pantalla
- Recibos de telefono celular
- Contratos de alquiler
- Facturas de compras online
- Documentos sin fecha
- Documentos con mas de 3 meses de antiguedad

### Source of Funds (para EDD):
- Recibos de nomina (ultimos 3 meses)
- Declaracion de impuestos (ultimo ano fiscal)
- Estados de cuenta bancarios (3 meses)
- Acta de venta de propiedad/activo
- Documentos de herencia
- Estados financieros auditados (para cuentas institucionales)

---

## ANEXO B: UMBRALES POR TIPO DE CUENTA

| Tipo de Cuenta | Deposito Minimo | KYC Requerido | Source of Funds | EDD |
|---|---|---|---|---|
| Cent | $5 | ID + Selfie + Domicilio | No (salvo acumulado > $10K) | No (salvo red flags) |
| Standard | $50 | ID + Selfie + Domicilio | No (salvo acumulado > $10K) | No (salvo red flags) |
| Raw | $500 | ID + Selfie + Domicilio | Si (deposito inicial > $5K) | No (salvo red flags) |
| Institucional | $50,000 | ID + Selfie + Domicilio + Source of Funds + Documentos corporativos | Obligatorio | Obligatorio |

---

## ANEXO C: CONTACTO DE EMERGENCIA COMPLIANCE

| Situacion | Quien contactar | Como | Tiempo |
|---|---|---|---|
| Fraude en curso | Diego | Llamada + Slack #compliance-urgente | Inmediato |
| Match de sanciones confirmado | Diego + abogado externo | Email + llamada | Mismo dia |
| Requerimiento de AOFA | Diego | Email + llamada | Mismo dia |
| Brecha de datos | Diego + IT | Llamada | Inmediato |
| Cliente amenaza legal | Diego | Slack #compliance-urgente | Mismo dia |

---

## REGISTRO DE CAMBIOS

| Version | Fecha | Cambio | Autor |
|---|---|---|---|
| 1.0 | 2026-04-08 | Documento inicial | Diego / Compliance |

---

**Este documento debe ser revisado y actualizado trimestralmente o cuando haya cambios regulatorios de AOFA.**

**Todos los miembros del equipo deben firmar que han leido y entendido este documento antes de comenzar a operar.**

```
ACUSE DE RECIBO

Yo, _________________________, confirmo que he leido,
entendido y me comprometo a cumplir con el Workflow de
Compliance de NEOMAAA Broker version 1.0.

Firma: _______________
Fecha: _______________
Rol: _______________
```
