# Matriz de Riesgo de Clientes — Framework AML/KYC

**Version:** 1.0
**Fecha:** 13 de abril de 2026
**Duena del documento:** Susana — Compliance Officer, Neomaaa Ltd (IBC 15968, AOFA L15968/N)
**Uso:** Interno — Compliance, Ventas, Soporte

---

## 1. Resumen ejecutivo

Este documento es la **matriz oficial de clasificacion de riesgo AML/KYC** de Neomaaa Ltd. Permite a Compliance categorizar a cualquier cliente nuevo o existente en una de tres categorias (LOW / MEDIUM / HIGH) siguiendo criterios objetivos y reproducibles. La matriz se basa en las recomendaciones de FATF (Recomendaciones 10, 11, 12, 22) y los requisitos de licencia AOFA (Anjouan Offshore Finance Authority, licencia L15968/N).

**Quien lo usa:** Susana (Compliance Officer) como flujo de trabajo diario. Equipo de ventas y soporte como referencia para saber por que un cliente puede requerir documentacion adicional o tiempo extra de aprobacion.

**Como se usa:** Para cada cliente nuevo, recorrer el checklist operativo (seccion 3). Clasificar en categoria. Aplicar la accion correspondiente. Registrar en CRM Skale (campo `risk_category`) y en Sumsub con el tag correspondiente. Re-verificar segun frecuencia definida en seccion 6.

> [!INFO]
> Esta matriz NO reemplaza el screening automatico de Sumsub — lo complementa. Sumsub identifica PEP/Sanctions. Esta matriz determina la **categoria de riesgo global** del cliente y la documentacion/aprobacion necesarias.

---

## 2. Las tres categorias de riesgo

### LOW RISK — Cliente estandar

**Todos los criterios deben cumplirse:**

- Residente en pais NO restringido (ver seccion 5 para lista de paises prohibidos y de riesgo)
- NO es PEP (Politically Exposed Person) ni familiar directo/asociado cercano de PEP
- NO aparece en ninguna lista de sanctions (OFAC, UN, EU, UK, AOFA local)
- Profesion verificable y plausible (empleado, comerciante regular, profesional independiente, jubilado con pension documentable)
- Source of Funds plausible con la ocupacion declarada (un ingeniero declarando fondos de su salario, un dueno de pyme declarando utilidades de su negocio)
- Depositos iniciales razonables para el perfil declarado
- No tiene relacion directa con jurisdicciones de alto riesgo FATF (no reside ni recibe fondos de paises en black/grey list)
- No hay red flags conductuales (no intento de evadir preguntas, no documentacion inconsistente)

**Documentacion requerida:**

- ID oficial vigente (DNI, pasaporte o licencia de conducir del pais de residencia)
- Comprobante de domicilio con antiguedad menor a 3 meses (factura de servicios, extracto bancario, recibo de alquiler con timbre fiscal, certificado de residencia)
- Declaracion de ocupacion y fuente de ingresos (campo del formulario de Sumsub)

**Aprobacion:**

- Automatica via Sumsub con resultado `clean`
- QA review de Susana (checklist rapido de 5 min)
- SLA maximo: 24 horas habiles

**Monitoreo posterior:** revision anual automatica o ante trigger de cambio de circunstancias.

---

### MEDIUM RISK — Cliente con flags que requieren atencion

**Cualquiera de los siguientes criterios dispara MEDIUM automaticamente:**

- Residente en pais de la FATF "grey list" / increased monitoring (ver seccion 5)
- Profesion de alto manejo de efectivo: restaurante/bar, joyeria, casino empleado, crypto dealer particular, car dealer, dueno de lavadero de autos, importador/exportador pequeno sin documentacion clara
- Deposito inicial desproporcionadamente alto para el perfil declarado (regla operativa: si el cliente declara ingresos mensuales de X y deposita mas de 3X en el primer mes, MEDIUM)
- Source of Funds no completamente claro o explicacion vaga ("ahorros", "trading anterior", sin documentar)
- Patron de transacciones rapidas: multiples depositos en los primeros 30 dias sin actividad de trading correspondiente
- Cliente referido por IB con track record mixto (IB nuevo, IB con chargebacks previos, IB con clientes rechazados historicamente)
- Cambio frecuente de metodo de pago (mas de 3 metodos distintos en primeros 90 dias)
- Edad muy joven (<21) o muy mayor (>75) con volumen de trading desproporcionado al perfil de vida esperable
- Cliente no-residente operando desde pais distinto al de su documentacion (ej. ID chileno pero IP/residencia actual Emiratos)

**Documentacion requerida (ademas de la de LOW):**

- Source of Funds (SoF) documentado con evidencia: recibos de salario de los ultimos 3 meses, extractos bancarios, contratos laborales, declaraciones fiscales, documentacion de venta de propiedad, declaracion de herencia, etc.
- Declaracion jurada de origen de fondos (template provisto)
- Verificacion adicional de domicilio: factura de servicios publicos (luz, agua, gas) — no basta extracto bancario solo
- Si aplica trigger de IB: validacion del IB en el registro de partners

**Aprobacion:**

- Revision manual obligatoria de Susana
- SLA maximo: 48 horas habiles desde recepcion de documentacion completa
- Tag en Sumsub: `MEDIUM_RISK`
- Tag en Skale: `risk_category = MEDIUM`

**Monitoreo posterior:** revision semestral + alerta automatica si hay cambio de patron de trading o depositos inusuales.

---

### HIGH RISK — Requiere EDD (Enhanced Due Diligence)

**Cualquiera de los siguientes criterios dispara HIGH automaticamente:**

- PEP confirmado (nacional, extranjero o de organizacion internacional)
- Familiar directo de PEP (conyuge, hijos, padres, hermanos)
- Asociado cercano de PEP (socio de negocio, beneficiario conjunto, apoderado)
- Cliente residente o con fuente de fondos en pais FATF "high-risk and subject to a call for action" (black list) — en estos casos tecnicamente se **rechaza**, pero si hay razon excepcional se escala a EDD con aprobacion de Director
- Cliente residente en pais FATF "high risk + monitoring" sumado a OTRO trigger de HIGH
- Industria declarada de alto riesgo AML: casino/gaming operator, arms dealing, crypto exchange/OTC desk, private banking personal, art/antique dealer, precious metals dealer, NGO/charity en jurisdicciones de riesgo
- Match en sanctions screening (aunque se sospeche que sea false positive, hasta validar es HIGH)
- Volumen de trading claramente inconsistente con perfil declarado
- Corporate client con estructura opaca: BVI shell sin beneficial owner claro, trust sin documentacion, layered ownership sin explicacion de negocio
- Red flag de AML detectado previamente (intento de split transactions, uso de terceros, SAR previa)
- Transaccion unica o acumulada inusualmente grande para el perfil (>5x el volumen mensual esperado segun declaracion)
- Cliente intenta evitar identificacion, dar informacion incompleta, o cambia informacion entre el onboarding y la verificacion
- Adverse media detectado: noticias de fraude, investigacion criminal, casos civiles relevantes
- Referido por IB previamente problematico o fuera del programa de partners

**Documentacion requerida (ademas de la de MEDIUM):**

- Enhanced Due Diligence completo — ver documento [Enhanced Due Diligence (EDD) — Triggers, Proceso y Template](compliance/edd-triggers.md)
- Source of Wealth (patrimonio total, no solo los fondos a depositar)
- Background check profesional (opcional: contratar World-Check / Dow Jones / Refinitiv puntualmente)
- Entrevista personal en videollamada con Susana (minimo 15 min, documentada)
- Revision de la documentacion por abogado externo cuando monto o complejidad lo justifiquen
- Aprobacion DUAL obligatoria: Susana + Director (Diego Loyola o Yulia)
- Monitoreo continuo mensual durante los primeros 6 meses de relacion

**Aprobacion:**

- Susana + Director (dual signoff)
- SLA maximo: 5-10 dias habiles desde recepcion completa de documentacion
- Tag en Sumsub: `HIGH_RISK_EDD`
- Tag en Skale: `risk_category = HIGH`

**Monitoreo posterior:** revision trimestral + alertas automaticas por cualquier desviacion.

> [!WARNING]
> Nunca rechazar automaticamente a un PEP. PEPs pueden ser clientes legitimos. Lo que FATF exige es EDD robusto, no exclusion. Rechazar sin EDD es tan problematico como aprobar sin EDD.

---

## 3. Checklist operativo — una pagina imprimible

> [!TIP]
> Imprimi esta pagina o tenela abierta en pantalla. Cada cliente nuevo pasa por este checklist antes de aprobarse.

```
=============================================================
CHECKLIST DE CLASIFICACION DE RIESGO — NEOMAAA LTD
=============================================================

Cliente: __________________________  Fecha: _____________
CRM ID: ___________________________  Pais: ______________

---- PASO 0: SCREENING DE EXCLUSION ----
[ ] Pais restringido (USA, Canada, Iran, Corea del Norte, Myanmar, Iraq, Sudan)?
    -> SI: RECHAZAR. No continuar.

---- PASO 1: TRIGGERS DE HIGH RISK ----
[ ] Sumsub devolvio PEP match positivo?                    -> HIGH
[ ] Sumsub devolvio sanctions match (OFAC/UN/EU/UK)?       -> HIGH
[ ] Profesion de alto riesgo AML (casino, arms, crypto
    OTC, art dealer, precious metals, private banking)?    -> HIGH
[ ] Corporate client con estructura opaca?                 -> HIGH
[ ] Adverse media detectado en Google search?              -> HIGH
[ ] Volumen declarado >5x perfil razonable?                -> HIGH
[ ] Cliente evasivo o info inconsistente?                  -> HIGH

---- PASO 2: TRIGGERS DE MEDIUM RISK ----
[ ] Pais FATF grey list (ver seccion 5)?                   -> MEDIUM
[ ] Profesion de alto manejo de efectivo?                  -> MEDIUM
[ ] Deposito inicial desproporcionado (>3x ingresos decl)? -> MEDIUM
[ ] SoF no documentado claramente?                         -> MEDIUM
[ ] Patron de transacciones rapidas primeros 30 dias?      -> MEDIUM
[ ] IB referrer con track record mixto?                    -> MEDIUM
[ ] Cambio frecuente de metodo de pago (>3 en 90 dias)?    -> MEDIUM
[ ] Edad extrema con volumen desproporcionado?             -> MEDIUM
[ ] Reside distinto a pais de documentacion?               -> MEDIUM

---- PASO 3: CONFIRMACION DE LOW RISK ----
[ ] Todos los triggers de HIGH y MEDIUM son NO?
[ ] Documentacion basica completa (ID + proof address + job)?
[ ] Sumsub devolvio clean?
[ ] Profesion verificable y coherente con SoF?
    -> SI a todo: LOW RISK

---- RESULTADO ----
Categoria final: [ ] LOW   [ ] MEDIUM   [ ] HIGH
Accion:          [ ] Aprobar
                 [ ] Solicitar documentacion adicional
                 [ ] Abrir caso EDD
                 [ ] Rechazar

Revisor: ________________________
Fecha revision: _________________
Firma Susana: ___________________

Si HIGH: Director approval __________________ Fecha: _____
=============================================================
```

---

## 4. Proceso paso a paso para cada cliente nuevo

<div className="neo-step-list">

**Paso 1 — Screening automatico (Sumsub)**

El cliente completa el flow de onboarding en Skale y sube su documentacion a Sumsub. Sumsub ejecuta automaticamente:

- Verificacion biometrica de ID (liveness + face match)
- Extraccion de datos de ID (nombre, fecha, numero)
- Screening contra listas PEP (World-Check o similar)
- Screening contra sanctions lists (OFAC, UN, EU, UK)
- Adverse media screening basico

Sumsub devuelve uno de tres estados: `clean`, `alert`, `review`. Susana recibe notificacion automatica por email.

---

**Paso 2 — Categorizacion por Susana**

Susana abre el expediente y aplica el checklist operativo (seccion 3). Determina la categoria final.

- Si **LOW**: aprobar en Sumsub + tagear en Skale + liberar cuenta en MT5. 30 min de trabajo promedio.
- Si **MEDIUM**: enviar email al cliente solicitando SoF y documentacion adicional. Esperar respuesta (SLA cliente: 7 dias habiles). Al recibir, validar y aprobar. 48h de SLA interno desde recepcion.
- Si **HIGH**: abrir caso EDD formal. Ver documento [edd-triggers.md](compliance/edd-triggers.md) para el proceso completo.

---

**Paso 3 — Registro obligatorio en sistemas**

Todo caso, sin excepcion, queda registrado en:

- **Sumsub:** tag `LOW_RISK` / `MEDIUM_RISK` / `HIGH_RISK_EDD` + nota del reviewer con fecha y razon
- **Skale CRM:** campo `risk_category` con el valor + subcampo `risk_review_date` + subcampo `next_review_date` (calculado segun seccion 6)
- **Archivo de compliance:** copia en el Drive/Dropbox compartido de compliance con naming `YYYY-MM-DD_clientID_category.pdf`

Retencion minima: 7 anos desde el cierre de la cuenta (requisito AOFA + FATF).

---

**Paso 4 — Comunicacion al cliente**

Segun categoria:

- **LOW:** email automatico del CRM "Bienvenido a NEOMAAA Markets, tu cuenta esta aprobada"
- **MEDIUM:** email manual "Requerimos documentacion adicional para completar tu verificacion. Por favor remiti: [lista especifica]. Plazo: 7 dias habiles."
- **HIGH:** email manual "Tu verificacion requiere revision adicional. Un representante de compliance te contactara en 48h para coordinar los proximos pasos."

> [!WARNING]
> Nunca indicar al cliente la categoria de riesgo asignada ni los triggers detectados. Eso constituye tipping-off y es ilegal bajo AML/CFT.

</div>

---

## 5. Listas FATF y paises restringidos

> [!WARNING]
> **Las listas FATF y OFAC se actualizan trimestralmente / semanalmente respectivamente.** Verificar siempre las fuentes oficiales antes de cualquier decision critica:
> - FATF (plenarias feb / jun / oct): https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html
> - OFAC: https://ofac.treasury.gov/sanctions-programs-and-country-information
> - UN Sanctions: https://main.un.org/securitycouncil/en/sanctions
> - EU Sanctions map: https://www.sanctionsmap.eu
>
> **Fecha ultima revision interna de este documento:** 15 Abril 2026. Si hoy es mas de 90 dias despues de esta fecha y no hay nota de re-review, Susana debe auditar antes de clasificar nuevos clientes.

### Paises NO operables (RECHAZAR automatico)

**Prohibidos por politica interna de Neomaaa Ltd:**

- Estados Unidos de America (por restricciones regulatorias SEC/CFTC/NFA)
- Canada (por restricciones regulatorias IIROC/CSA)

**Prohibidos por FATF black list (call for action — CERO clientes):**

- Iran
- Corea del Norte (DPRK)
- Myanmar (incorporado a black list en octubre 2022)

**Prohibidos por sanctions OFAC comprehensive:**

- Cuba
- Siria
- Crimea / regiones ocupadas de Ucrania (Donetsk, Luhansk)
- Iraq (rerstricciones parciales — validar case by case, default rechazar)
- Sudan del Sur

### FATF Grey List (increased monitoring) — MEDIUM automatico

Cliente residente en estos paises -> MEDIUM automatico + SoF requerido. Lista actualizada a octubre 2024 (Susana debe revisar **cuatrimestralmente** la lista oficial en [fatf-gafi.org](https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html)):

| Region | Paises |
|---|---|
| Africa | Algeria, Angola, Burkina Faso, Cameroon, Cote d'Ivoire, DR Congo, Kenya, Mali, Mozambique, Namibia, Nigeria, Senegal, South Africa, South Sudan, Tanzania |
| Americas | Haiti, Venezuela |
| Asia | Nepal, Philippines, Vietnam, Yemen, Siria, Libano |
| Europa | Bulgaria, Croatia, Monaco, Turkey |

> [!INFO]
> Esta lista cambia cada plenaria de FATF (febrero, junio, octubre). Susana debe validar oficial en los tres momentos del ano + uno adicional en diciembre.

### Sanctions lists a consultar

Sumsub las consulta automaticamente, pero Susana valida cada 6 meses que la integracion siga activa:

| Lista | Jurisdiccion | URL oficial |
|---|---|---|
| OFAC SDN | Estados Unidos (Treasury) | home.treasury.gov/policy-issues/financial-sanctions |
| UN Consolidated | Naciones Unidas | un.org/securitycouncil/sanctions |
| EU Consolidated | Union Europea | webgate.ec.europa.eu/fsd |
| UK HM Treasury | Reino Unido | gov.uk/government/publications/financial-sanctions-consolidated-list |
| AOFA Local | Anjouan | (verificar con regulador si existe lista local publicada) |

---

## 6. Re-verificacion periodica

| Categoria | Frecuencia de re-verificacion | Responsable |
|---|---|---|
| LOW | Cada 12 meses (automatico) | Susana |
| MEDIUM | Cada 6 meses | Susana |
| HIGH | Cada 3 meses | Susana + Director |

**Triggers de re-verificacion inmediata (en cualquier categoria):**

- Cambio de direccion declarado por el cliente
- Cambio de profesion u ocupacion
- Actividad de trading o depositos claramente fuera de patron
- Deteccion de PEP status nuevo (persona recien asume cargo publico)
- Nuevo sanctions match por actualizacion de listas
- Chargeback o disputa de pago
- Cliente inactivo mas de 12 meses que reactiva con volumen alto
- Reporte de un empleado (ventas, soporte, dealing) marcando actividad inusual

**Proceso de re-verificacion:**

1. Abrir expediente en Sumsub y Skale
2. Re-ejecutar screening Sumsub (PEP + Sanctions actualizados)
3. Revisar patron de trading y depositos de los ultimos X meses
4. Actualizar documentacion de residencia si aplica (mayor a 12 meses de antiguedad)
5. Aplicar checklist de seccion 3 de nuevo
6. Registrar resultado en Skale con fecha

---

## 7. Secciones para Susana completar

Estos campos quedan pendientes hasta que Susana los confirme. Son datos operativos que ella define.

- [ ] **Email institucional de compliance** para PEP/SAR queries: `_______________@neomaaa.com`
- [ ] **Servicio externo de PEP/Sanctions** complementario a Sumsub (opcional, solo si contratan World-Check / Dow Jones / Refinitiv): `_______________`
- [ ] **Abogado externo de referencia** para casos EDD complejos: `Nombre ______________ Email _____________ Telefono _____________ Jurisdiccion __________`
- [ ] **Directora de aprobacion dual** para casos HIGH: [ ] Diego Loyola [ ] Yulia [ ] Ambos indistintamente
- [ ] **Lista inicial de IBs con track record limpio** (para auto-categoria LOW cuando el cliente llega referido por estos): IB1, IB2, IB3...
- [ ] **Umbral operativo de "deposito desproporcionado"** para trigger MEDIUM (default sugerido: 3x ingresos declarados, pero Susana puede ajustar): `____x`
- [ ] **Umbral operativo de "volumen claramente inconsistente"** para trigger HIGH (default sugerido: 5x volumen esperado): `____x`
- [ ] **Plantilla de Declaracion Jurada de Origen de Fondos** en pais de uso (coordinar con abogado externo el formato valido): `___________________`

---

## 8. Referencias regulatorias

Este documento se alinea con:

- **FATF 40 Recommendations** (revision 2023): especialmente R10 (Customer Due Diligence), R11 (Record Keeping), R12 (PEPs), R22 (DNFBPs)
- **FATF Guidance on Risk-Based Approach for the Securities Sector** (2018)
- **AOFA License Conditions** — Anjouan Offshore Finance Authority, licencia L15968/N
- **Anti-Money Laundering Act** de la Union de las Comoras (ley aplicable a Anjouan)
- **Basel Committee on Banking Supervision — Customer Due Diligence for Banks** (principios adoptados como best practice)

Version control: este documento se revisa minimo cada 12 meses o ante cualquier cambio regulatorio relevante.

---

**Ultima revision:** 13 de abril de 2026
**Proxima revision obligatoria:** 13 de abril de 2027
**Owner:** Susana — Compliance Officer
**Approver:** Diego Loyola / Yulia (dual signoff al publicar version nueva)
