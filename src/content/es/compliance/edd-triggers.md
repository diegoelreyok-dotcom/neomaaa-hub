# Enhanced Due Diligence (EDD) — Triggers, Proceso y Template

**Version:** 1.0
**Fecha:** 13 de abril de 2026
**Duena del documento:** Susana — Compliance Officer, Neomaaa Ltd
**Uso:** Interno — Compliance + Direccion (para aprobacion dual)

---

## 1. Que es Enhanced Due Diligence (EDD)

Enhanced Due Diligence es el proceso reforzado de investigacion y verificacion que se aplica a clientes clasificados como HIGH RISK por la matriz de riesgo. Es **obligatorio bajo FATF Recommendation 12** para PEPs y bajo Recommendation 10 para clientes de alto riesgo en general. AOFA tambien lo exige como condicion de licencia.

EDD no es opcional. No es "verificacion mas estricta". Es un proceso documentado, con pasos, evidencia, doble aprobacion y archivo de 7 anos. Su objetivo: que ante una auditoria AOFA o un requerimiento judicial, Neomaaa Ltd pueda demostrar que **conocio realmente** al cliente antes de operar y que mantuvo monitoreo continuo durante la relacion comercial.

> [!INFO]
> Diferencia operativa simple: KYC normal pregunta "quien sos". EDD pregunta "quien sos, de donde viene tu plata, de donde viene tu patrimonio total, por que queres operar con nosotros y como vas a operar".

---

## 2. Triggers que disparan EDD obligatoriamente

### Triggers categoricos (uno solo activa EDD)

| # | Trigger | Tipo |
|---|---|---|
| 1 | PEP confirmado (nacional, extranjero, organizacion internacional) | Identidad |
| 2 | Familiar directo de PEP (conyuge, hijo, padre, hermano) | Identidad |
| 3 | Asociado cercano de PEP (socio de negocio, beneficiario conjunto) | Identidad |
| 4 | Match positivo en sanctions screening (aunque parezca false positive — revisar igual) | Identidad |
| 5 | Cliente residente en pais FATF black list | Geografia (default RECHAZAR — escalar a Director si excepcion) |
| 6 | Cliente residente en pais FATF grey list (call for action) | Geografia |
| 7 | Corporate client con estructura offshore opaca (BVI shell, trust sin documentacion clara) | Estructura |
| 8 | Cliente con adverse media negativo (fraude, investigacion, sanctions historicas) | Reputacion |

### Triggers conductuales (uno solo activa EDD)

| # | Trigger | Tipo |
|---|---|---|
| 9 | Deposito unico o acumulado >5x el perfil declarado | Comportamiento |
| 10 | Patron de trading inconsistente con perfil declarado | Comportamiento |
| 11 | Intentos de split transactions (multiples depositos pequenos para evadir thresholds) | Comportamiento |
| 12 | Uso de multiples cuentas o aliases ligados a la misma persona | Comportamiento |
| 13 | Retiros rapidos a cuentas distintas de donde se deposito (layering) | Comportamiento |
| 14 | Cliente evasivo, niega o demora informacion solicitada | Comportamiento |
| 15 | Rechaza dar informacion sobre Source of Funds | Comportamiento |
| 16 | Cambia de representante o beneficial owner sin explicacion clara | Comportamiento |

### Triggers de industria/profesion (alto riesgo AML inherente)

| # | Trigger | Tipo |
|---|---|---|
| 17 | Casino / gaming operator | Industria |
| 18 | Arms dealer / military contractor | Industria |
| 19 | Crypto exchange o OTC desk | Industria |
| 20 | Art / antique dealer (transacciones >50K USD recurrentes) | Industria |
| 21 | Precious metals dealer | Industria |
| 22 | Private banking personal / family office | Industria |
| 23 | NGO / charity con operacion en jurisdicciones de riesgo | Industria |
| 24 | Money Service Business (MSB) sin licencia clara | Industria |
| 25 | Real estate developer en jurisdiccion grey list | Industria |

> [!WARNING]
> Si un cliente combina dos o mas triggers, EDD es obligatorio incluso si individualmente uno fuera marginal. La acumulacion eleva el riesgo.

---

## 3. Proceso EDD completo — paso a paso

<div className="neo-step-list">

**Paso 1 — Deteccion del trigger y apertura del caso**

Triggers se detectan por tres vias:

- **Sumsub alert automatico** (PEP, Sanctions, Adverse Media)
- **Susana detecta manualmente** durante la revision de KYC o re-verificacion periodica
- **Flag de un agent interno** (ventas, soporte, dealing) que reporta comportamiento inusual

Al detectar, Susana:

1. Crea un caso EDD en el CRM Skale con ID unico (formato `EDD-YYYY-NNNN`)
2. Marca el cliente con tag `EDD_IN_PROGRESS` en Sumsub
3. **Pausa cualquier operacion** del cliente (no se aprueba deposito, no se libera retiro) hasta que el caso resuelva
4. Notifica al Director (Diego o Yulia) que se abrio caso EDD

SLA paso 1: mismo dia de detectado el trigger.

---

**Paso 2 — Solicitud inicial de documentacion**

Susana envia el email template "Solicitud de Documentacion EDD" (ver seccion 5 de este documento) al cliente requiriendo:

- Source of Wealth (origen del patrimonio total acumulado del cliente)
- Source of Funds (origen especifico de los fondos que va a depositar/operar)
- Ultimos 3 meses de extractos bancarios completos
- Ultimas 2 declaraciones fiscales presentadas
- Comprobante de ingresos principal (recibos de salario, contrato laboral, registros de utilidad de empresa propia)
- Si es PEP: declaracion del cargo publico, periodo, jurisdiccion
- Si es corporate client: organigrama legal, certificado de incorporacion, documentacion de beneficial owners (>25% ownership), comprobante de operacion del negocio (facturacion, contratos, web)

**SLA cliente para responder:** 7-14 dias habiles.

Si el cliente no responde:
- Dia 7: primer follow-up (template "Recordatorio EDD")
- Dia 14: segundo follow-up con advertencia de cierre de caso
- Dia 21: si no respondio, cerrar caso con resolucion "RECHAZADO POR FALTA DE COOPERACION" y notificar al cliente que la cuenta no puede operarse

---

**Paso 3 — Revision de documentacion**

Susana valida cada documento contra criterios objetivos:

- **Consistencia interna:** los montos en extractos bancarios, declaraciones fiscales y recibos de salario son coherentes entre si
- **Consistencia externa:** los documentos son coherentes con la profesion y residencia declaradas
- **Autenticidad:** firmas, fechas, sellos oficiales, formato esperado del pais emisor
- **Vigencia:** documentos con menos de 3-6 meses de antiguedad segun corresponda
- **Suficiencia:** los documentos cubren el monto declarado de SoW/SoF (no es coherente declarar 500K USD de patrimonio si el extracto bancario muestra 5K)
- **Red flags adicionales:** menciones a otros pagadores, transferencias inusuales, deposits desde paises de riesgo

Si los documentos son insuficientes o inconsistentes:
- Una ronda adicional de solicitud con detalle especifico de que falta
- Si la segunda ronda tampoco resuelve: rechazar el caso

---

**Paso 4 — Background check externo**

Susana ejecuta:

- **Google search del nombre completo** + cada uno de estos terminos: `fraud`, `scandal`, `investigation`, `arrested`, `lawsuit`, `bankruptcy`, `sanctions`, `money laundering`, `tax evasion`. En espanol y en ingles si aplica.
- **LinkedIn search** para validar profesion declarada (titular, empresa, anios)
- **OFAC SDN search manual** en home.treasury.gov/policy-issues/financial-sanctions
- **UN Sanctions search manual** en un.org/securitycouncil/sanctions
- **Adverse media adicional** via Google News con el nombre + pais de residencia
- **Si se contrato World-Check / Dow Jones / Refinitiv:** correr el screening completo y descargar reporte
- **Verificacion de la empresa** (si corporate): registro de empresas del pais, status de operacion, numero de empleados declarado vs realista

Documentar todas las busquedas con screenshots o copias de los resultados (positivos y negativos), fecha, keywords utilizadas.

---

**Paso 5 — Entrevista personal (videollamada)**

Obligatoria para:
- Cualquier PEP o familiar/asociado de PEP
- Volumen declarado >100K USD
- Corporate clients
- Casos donde la documentacion deja preguntas pendientes

Opcional para otros casos HIGH si Susana considera que la documentacion es suficiente.

**Duracion:** 15-30 minutos.

**Preguntas guion:**

1. Confirmar identidad visual contra ID (cara visible, sin filtros)
2. Confirmar ocupacion actual y tiempo en el rol
3. Explicar en sus propias palabras la fuente de los fondos a depositar
4. Explicar la fuente de su patrimonio total
5. Por que eligio Neomaaa Markets / como nos conocio
6. Que estrategia de trading planea usar
7. Que volumen mensual estima operar
8. Cualquier pregunta adicional especifica del caso

**Documentar:** fecha, duracion, link de la grabacion (si el cliente consiente — GDPR/AOFA requiere consentimiento explicito), notas escritas sobre cada respuesta, observaciones del comportamiento del cliente (nervioso, evasivo, fluido, consistente).

---

**Paso 6 — Decision final**

Susana redacta su recomendacion. Director revisa. Aprueban juntos. Cuatro opciones:

| Decision | Cuando aplicar | Accion |
|---|---|---|
| **Aprobar con monitoring** | EDD satisfactorio, cliente legitimo pero alto riesgo inherente (PEP limpio, profesion alto riesgo bien documentada) | Aprobar cuenta, mantener `risk_category=HIGH`, re-verificacion trimestral, monitoreo mensual de transacciones |
| **Aprobar con limites** | EDD razonable pero con flags pendientes (volumen alto vs perfil, jurisdiccion grey) | Aprobar con cap operativo (volumen mensual maximo, deposito maximo, retiro maximo) hasta proxima re-verificacion |
| **Rechazar** | EDD insatisfactorio: inconsistencias no resueltas, documentacion insuficiente, cliente no coopera, red flags acumulados | Cerrar onboarding, devolver fondos si los hubo (siempre que no haya sospecha activa de lavado), notificar al cliente con texto neutro |
| **Reportar SAR** | Sospecha activa de lavado de dinero, financiamiento del terrorismo, fraude o actividad criminal | Activar protocolo SAR, freezear cuenta sin notificar al cliente (tipping-off es ilegal), escalar a abogado y AOFA |

**Aprobacion requiere doble firma:** Susana (Compliance) + Director (Diego Loyola o Yulia). Sin la doble firma no se puede operar la cuenta.

> [!WARNING]
> Si la decision es "Reportar SAR", NO se le devuelven fondos ni se le notifica al cliente nada hasta que el abogado externo y AOFA confirmen los pasos. Cualquier comunicacion al cliente que insinue una sospecha es tipping-off y constituye delito.

---

**Paso 7 — Documentacion y archivo**

Todo el caso EDD se archiva con:

- Tag en Sumsub: `EDD_COMPLETED` (o `EDD_REJECTED` segun corresponda)
- Carpeta dedicada en Drive/Dropbox compartido de compliance: `EDD/YYYY/EDD-YYYY-NNNN_clientID/`
- Dentro de la carpeta: formulario EDD completo (template seccion 4), documentos del cliente, screenshots de background check, notas de entrevista, decision firmada con fecha
- Tag en Skale: `risk_category=HIGH` + `edd_status=COMPLETED` + `edd_date=YYYY-MM-DD`
- Calendario: agendar re-verificacion trimestral

**Retencion minima:** 7 anos desde el cierre de la cuenta (no desde la apertura). Requisito AOFA + FATF + best practice.

</div>

---

## 4. Formulario EDD — template completo

Susana copia esta plantilla a un archivo nuevo por cada caso, lo completa, lo firma con Director, y lo archiva.

```markdown
# EDD Case Report — Neomaaa Ltd

**Caso ID:** EDD-2026-XXXX
**Cliente:** [Nombre completo]
**Cliente CRM ID:** [Skale ID]
**Fecha apertura caso:** [DD/MM/YYYY]
**Trigger(s) disparados:** [numero(s) de la seccion 2]
**Compliance Officer asignado:** Susana
**Director aprobador:** [Diego Loyola / Yulia]

---

## 1. Informacion del cliente

- Nombre completo: ________________________
- Fecha de nacimiento: ________________________
- Nacionalidad(es): ________________________
- Pais de residencia actual: ________________________
- Direccion completa: ________________________
- Ocupacion declarada: ________________________
- Empleador o nombre del negocio propio: ________________________
- Tiempo en el rol/negocio: ________________________
- Ingreso mensual declarado: ________________________
- Patrimonio total declarado: ________________________
- Volumen mensual de trading esperado: ________________________

## 2. Trigger detection

- Trigger primario que disparo EDD: ________________________
- Triggers secundarios (si hay): ________________________
- Detectado por: [ ] Sumsub  [ ] Susana manual  [ ] Sales agent  [ ] Soporte  [ ] Dealing
- Fecha de deteccion: ________________________
- Fecha de apertura del caso EDD: ________________________

## 3. Documentacion solicitada y recibida

| Documento | Solicitado (fecha) | Recibido (fecha) | Estado |
|---|---|---|---|
| Source of Wealth | | | OK / Insuficiente / Pendiente |
| Source of Funds | | | OK / Insuficiente / Pendiente |
| Extractos bancarios 3 meses | | | OK / Insuficiente / Pendiente |
| Declaraciones fiscales 2 anios | | | OK / Insuficiente / Pendiente |
| Comprobante de ingresos | | | OK / Insuficiente / Pendiente |
| Declaracion PEP (si aplica) | | | OK / Insuficiente / N/A |
| Documentacion corporate (si aplica) | | | OK / Insuficiente / N/A |
| Beneficial owners (si corporate) | | | OK / Insuficiente / N/A |

Notas sobre la documentacion: _________________________________________

## 4. Screening adicional realizado

- Google adverse media (keywords usadas): ________________________
  - Resultados: ________________________
- LinkedIn validation: ________________________
- World-Check / Dow Jones / Refinitiv: ________________________
- OFAC manual search: ________________________
- UN/EU/UK sanctions manual: ________________________
- Adverse media social media: ________________________
- Verificacion de empresa (si corporate): ________________________

## 5. Entrevista personal (si aplica)

- Fecha: ________________________
- Duracion: ________________________
- Plataforma: ________________________
- Grabacion (con consentimiento): [ ] Si  [ ] No
- Consentimiento del cliente para grabacion: [ ] Si  [ ] No
- Observaciones generales:
- Consistencia con documentos: [ ] Alta  [ ] Media  [ ] Baja
- Comportamiento del cliente: [ ] Cooperativo  [ ] Neutro  [ ] Evasivo

Notas extensas de la entrevista:
_________________________________________________________
_________________________________________________________
_________________________________________________________

## 6. Decision final

[ ] Aprobar con monitoring (re-check trimestral)
[ ] Aprobar con limites operativos
   - Cap deposito mensual: USD ________
   - Cap retiro mensual: USD ________
   - Cap volumen trading mensual: USD ________ notional
[ ] Rechazar (cerrar onboarding, devolver fondos si aplica)
[ ] Reportar SAR (activar protocolo SAR — ver pep-sanctions-sop.md)

**Razon de la decision (minimo 3 parrafos explicativos):**

_________________________________________________________
_________________________________________________________
_________________________________________________________
_________________________________________________________
_________________________________________________________
_________________________________________________________

## 7. Firmas

- **Compliance Officer:** Susana _________________________ Fecha: __________
- **Director:** [Diego / Yulia] _________________________ Fecha: __________

## 8. Archivo

- Sumsub tag aplicado: EDD_COMPLETED / EDD_REJECTED / SAR_FILED
- Skale tag aplicado: risk_category=HIGH, edd_status=___
- Carpeta de archivo: /Compliance/EDD/2026/EDD-2026-XXXX_clientID/
- Retencion: 7 anos minimo desde cierre de cuenta
- Proxima re-verificacion: __________ (trimestral si aprobado)
```

---

## 5. Templates de comunicacion al cliente

> [!INFO]
> Estos textos estan listos para copiar/pegar. Reemplazar [variables] segun el caso. NUNCA mencionar la categoria de riesgo, los triggers, ni que estamos haciendo EDD en estos terminos.

### 5.1 Email inicial — Solicitud de documentacion EDD

```
Asunto: Documentacion adicional requerida — Cuenta Neomaaa Markets

Estimado/a [Nombre],

Gracias por completar el proceso inicial de apertura de cuenta con Neomaaa Ltd.

Como parte de nuestro proceso estandar de verificacion para cuentas de [tipo de cuenta], requerimos documentacion adicional antes de activar tu cuenta.

Por favor remiti los siguientes documentos en formato PDF (o foto clara):

1. Comprobante de origen de fondos: extracto bancario de los ultimos 3 meses, recibos de salario o documentacion equivalente que demuestre el origen de los fondos a depositar
2. Declaracion fiscal: ultimas 2 declaraciones de impuestos presentadas en tu pais de residencia
3. Comprobante de ingresos: recibos de salario o documentacion de tu actividad profesional/empresarial
4. [Si PEP: declaracion del cargo publico actual o pasado, periodo, jurisdiccion]
5. [Si corporate: organigrama, certificado de incorporacion, documentacion de los beneficial owners]

Plazo para remitir la documentacion: 7 dias habiles desde la recepcion de este email.

Si tenes alguna consulta sobre el proceso, podes responder a este email directamente.

Saludos cordiales,
Compliance Department
Neomaaa Ltd
compliance@neomaaa.com
```

### 5.2 Email follow-up — Recordatorio si no respondio

```
Asunto: Recordatorio — Documentacion pendiente para tu cuenta Neomaaa Markets

Estimado/a [Nombre],

Te escribimos para recordarte que el [fecha] solicitamos documentacion adicional necesaria para activar tu cuenta en Neomaaa Markets.

A la fecha no hemos recibido los documentos requeridos:
- [listado de lo que falta]

Te pedimos remitirnos esta informacion en un plazo maximo de 7 dias habiles a partir de hoy. De no recibir la documentacion en este plazo, deberemos cerrar tu solicitud de apertura de cuenta segun nuestras politicas internas y los requerimientos regulatorios aplicables.

Si tenes consultas sobre que documentos enviar, podes responder este email.

Saludos cordiales,
Compliance Department
Neomaaa Ltd
```

### 5.3 Email aprobacion con restricciones

```
Asunto: Tu cuenta Neomaaa Markets esta activa

Estimado/a [Nombre],

Gracias por completar nuestro proceso de verificacion. Tu cuenta en Neomaaa Markets ha sido activada y ya podes comenzar a operar.

Con el objetivo de proteger la seguridad de tu cuenta y de acuerdo a nuestras politicas internas, durante los primeros 6 meses tu cuenta operara con los siguientes limites:

- Deposito maximo mensual: USD [monto]
- Retiro maximo mensual: USD [monto]
- Volumen de trading maximo mensual: USD [monto] notional

Estos limites se revisaran automaticamente despues de 6 meses de actividad y pueden ajustarse segun tu perfil operativo.

Para cualquier consulta, tu agente de cuentas es [nombre] / podes escribirnos a soporte@neomaaa.com.

Bienvenido a Neomaaa Markets.

Saludos,
Compliance Department
Neomaaa Ltd
```

### 5.4 Email de rechazo

```
Asunto: Estado de tu solicitud — Neomaaa Markets

Estimado/a [Nombre],

Lamentamos informarte que despues de revisar tu solicitud de apertura de cuenta y la documentacion presentada, no podemos en este momento activar tu cuenta en Neomaaa Markets.

Esta decision se basa en nuestras politicas internas de aceptacion de clientes y los requerimientos regulatorios aplicables a Neomaaa Ltd como entidad licenciada por la Anjouan Offshore Finance Authority (licencia L15968/N).

No estamos en posicion de proporcionar detalles especificos sobre los motivos de esta decision.

Si realizaste algun deposito, este sera reintegrado al medio de pago original en un plazo maximo de 10 dias habiles. Recibiras confirmacion por email cuando el reintegro haya sido procesado.

Agradecemos tu interes en Neomaaa Markets.

Saludos cordiales,
Compliance Department
Neomaaa Ltd
```

> [!WARNING]
> El email de rechazo NUNCA debe mencionar PEP, sanctions, money laundering, o el trigger especifico. Mencionarlo puede constituir tipping-off, violar privacidad y exponer a Neomaaa a litigio.

---

## 6. Guia rapida — que hacer cuando

| Situacion | Accion inmediata | Documento de referencia |
|---|---|---|
| Sumsub levanta PEP alert | Validar match real, abrir caso EDD | Este doc + pep-sanctions-sop.md |
| Sumsub levanta sanctions alert | FREEZE inmediato, escalar a Director, posible SAR | pep-sanctions-sop.md |
| Cliente declara profesion HIGH RISK (casino, arms, crypto) | Marcar HIGH, abrir caso EDD | risk-matrix.md + este doc |
| Cliente deposita 10x lo declarado | Pausar operaciones, abrir caso EDD comportamental | Este doc |
| Cliente reside en pais black list | Rechazar (default) o escalar a Director si excepcion | risk-matrix.md |
| Empleado interno reporta comportamiento sospechoso | Documentar el reporte, abrir caso EDD comportamental | Este doc |
| Adverse media positivo en background check | Pausar, profundizar EDD, posible SAR | Este doc + pep-sanctions-sop.md |
| Corporate client no quiere documentar UBO | EDD insuficiente, rechazar | Este doc |

---

## 7. Checklist final de calidad del caso EDD

Antes de cerrar un caso EDD, Susana valida que:

- [ ] Todos los triggers detectados estan documentados con evidencia
- [ ] Toda la documentacion solicitada fue recibida y validada
- [ ] El background check externo se realizo y se archivaron screenshots
- [ ] La entrevista (si aplico) fue documentada con notas
- [ ] La razon de la decision esta escrita en minimo 3 parrafos
- [ ] La doble firma (Susana + Director) esta presente
- [ ] El expediente esta archivado en Drive/Dropbox con naming correcto
- [ ] Los tags estan aplicados en Sumsub y Skale
- [ ] La proxima re-verificacion esta agendada en calendario
- [ ] Si la decision fue rechazo, los fondos fueron devueltos (si los hubo)
- [ ] Si la decision fue SAR, el protocolo SAR esta activado

---

## 8. Referencias regulatorias

- **FATF Recommendation 10** — Customer Due Diligence
- **FATF Recommendation 12** — Politically Exposed Persons
- **FATF Recommendation 22** — DNFBPs (Designated Non-Financial Businesses and Professions)
- **FATF Guidance on PEPs** (2013)
- **FATF Risk-Based Approach for the Securities Sector** (2018)
- **AOFA License Conditions** — licencia L15968/N
- **Wolfsberg Group AML Principles** (referencia best practice)

---

## 9. Secciones para Susana completar

- [x] **Email institucional para casos EDD:** `compliance@neomaaa.com` (confirmado)
- [ ] **Director aprobador default** (uno o ambos): [ ] Diego Loyola [ ] Yulia
- [ ] **Servicio externo de background check** contratado (opcional): `_______________`
- [ ] **Abogado externo de referencia** para casos complejos: nombre, jurisdiccion, contacto
- [ ] **Plataforma de videollamada estandar** para entrevistas EDD: [ ] Zoom [ ] Google Meet [ ] Teams
- [ ] **Politica de retencion de grabaciones de entrevistas** (si las hace): plazo y ubicacion
- [ ] **Path exacto de archivo en Drive/Dropbox** para EDD: `___________________`
- [ ] **Plantilla legal de Declaracion Jurada de SoF** validada por abogado externo

---

**Ultima revision:** 13 de abril de 2026
**Proxima revision obligatoria:** 13 de abril de 2027
**Owner:** Susana — Compliance Officer
**Approver:** Diego Loyola / Yulia
