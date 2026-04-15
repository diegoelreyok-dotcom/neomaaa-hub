# PEP + Sanctions Screening — Standard Operating Procedure

**Version:** 1.0
**Fecha:** 13 de abril de 2026
**Duena del documento:** Susana — Compliance Officer, Neomaaa Ltd
**Uso:** Interno — Compliance (workflow diario)

---

## 1. Que screenear y cada cuanto

Este SOP define el cronograma y la responsabilidad de cada tipo de screening AML que Neomaaa Ltd ejecuta para cumplir con FATF Recommendations 6 (Targeted Financial Sanctions), 12 (PEPs) y los requisitos de licencia AOFA.

| Tipo de screening | Fuente | Frecuencia | Responsable |
|---|---|---|---|
| PEP screening cliente nuevo | Sumsub automatico en onboarding | En cada onboarding | Sumsub + Susana valida alerts |
| PEP re-check de existentes | Sumsub monthly scan | Mensual (1er lunes del mes) | Susana valida alerts |
| Sanctions OFAC | Sumsub + manual quarterly | Mensual (Sumsub) + trimestral manual | Susana |
| Sanctions UN Consolidated | Sumsub + manual | Mensual + trimestral manual | Susana |
| Sanctions EU Consolidated | Sumsub + manual | Mensual + trimestral manual | Susana |
| Sanctions UK HM Treasury | Sumsub + manual | Mensual + trimestral manual | Susana |
| Sanctions AOFA / local Anjouan | Manual | Trimestral | Susana |
| Adverse media nuevo cliente | Manual (Google + LinkedIn) | En cada onboarding | Susana |
| Adverse media re-check HIGH RISK | Manual | Anual minimo | Susana |
| Update de FATF country lists | Manual oficial fatf-gafi.org | Cuatrimestral (post plenarias FATF) | Susana |
| Re-validacion de integracion Sumsub | Tecnica | Semestral | Susana + Tech |

> [!INFO]
> Sumsub es el screening engine principal. Pero NO es infalible. El SOP exige validacion manual mensual de las fuentes oficiales para asegurar que la base de Sumsub esta actualizada y que no hay falsos negativos sistemicos.

---

## 2. Que es PEP — definicion y ejemplos concretos

**PEP = Politically Exposed Person.** Una persona que ocupa o ocupo un cargo publico relevante y por lo tanto presenta riesgo elevado de soborno y corrupcion. FATF Recommendation 12 obliga a EDD para todos los PEPs.

### Categorias de PEP segun FATF

**Foreign PEP** (extranjero respecto a la jurisdiccion del proveedor, en nuestro caso: cualquier PEP de cualquier pais):

- Jefes de estado o de gobierno (presidentes, primeros ministros, reyes, sultanes)
- Ministros y viceministros
- Legisladores nacionales (senadores, diputados, asambleistas)
- Diplomaticos de alto rango (embajadores, encargados de negocios, consules generales)
- Jueces de cortes supremas y constitucionales
- Militares de alto rango (generales, almirantes, jefes de fuerza)
- Ejecutivos de SOEs (state-owned enterprises): CEOs, CFOs, presidentes de junta de empresas estatales
- Lideres de partidos politicos relevantes a nivel nacional
- Altos funcionarios de bancos centrales

**Domestic PEP** (local Anjouan / Union de las Comoras): mismas categorias pero a nivel local.

**International organization PEP**: directores y altos funcionarios de IMF, Banco Mundial, ONU, OCDE, BID, BIS, FATF, regional development banks, etc.

**Family members of PEP** (FATF lo categoriza igual que el PEP):
- Conyuge o pareja registrada
- Hijos y sus conyuges
- Padres
- Hermanos

**Close associates of PEP**:
- Socios de negocio conocidos
- Personas que actuan en nombre del PEP (apoderados, fiduciarios)
- Beneficiarios conjuntos de empresas o cuentas
- Personas con vinculo personal cercano y conocido publicamente

### Duracion del status PEP

- Mientras la persona ocupa el cargo
- Minimo FATF: +1 ano post-cargo
- **Politica interna Neomaaa: +3 anos post-cargo** (best practice mas conservador, en lineamiento con Wolfsberg Group)

> [!WARNING]
> Un PEP NO es automaticamente un criminal. La mayoria de PEPs son funcionarios legitimos. Lo que FATF y AOFA exigen es EDD reforzado, no exclusion. Rechazar a un PEP solo por ser PEP es ilegal en muchas jurisdicciones (discrimination claim) y operacionalmente incorrecto.

---

## 3. Proceso cuando Sumsub levanta alert PEP

<div className="neo-step-list">

**Paso 1 — Recepcion del alert**

Sumsub envia notificacion automatica por email a `compliance@neomaaa.com` (o el email definido por Susana en seccion 7) con asunto: "PEP match alert: [nombre del cliente]". El alert incluye:

- Nombre del cliente
- Score de match (porcentaje)
- Datos del PEP encontrado en la base World-Check / Sumsub
- Cargo, jurisdiccion, periodo

Susana recibe la alerta y abre el caso en Sumsub dentro de las 24 horas.

---

**Paso 2 — Validacion del match**

Susana compara cuidadosamente:

- Foto del cliente vs foto del PEP en la base
- Fecha de nacimiento exacta
- Lugar de nacimiento
- Nacionalidad
- Documentacion vinculada

**Posibles outcomes:**

- **Match real confirmado:** mismo nombre, misma fecha, misma persona -> activar EDD obligatorio
- **False positive por homonimo:** mismo nombre pero datos demograficos distintos -> documentar como false positive y cerrar
- **Match parcial dudoso:** datos parciales coinciden -> profundizar investigacion antes de cerrar
- **PEP historico expirado:** la persona fue PEP pero termino el cargo hace mas de 3 anos -> tratar como cliente normal pero documentar el historico

---

**Paso 3 — Si es match real: activar EDD**

Procedimiento:

1. Marcar en Sumsub: tag `PEP_CONFIRMED` + subcategoria (Foreign / Domestic / International Org / Family / Close Associate)
2. Marcar en Skale: `risk_category=HIGH` + `pep_status=CONFIRMED`
3. Pausar cualquier operacion del cliente
4. Abrir caso EDD formal (ver [edd-triggers.md](compliance/edd-triggers.md))
5. Notificar al Director (Diego o Yulia) en el mismo dia
6. Comenzar el proceso EDD: solicitud de documentacion, background check, entrevista, decision dual

**Nunca** rechazar al PEP automaticamente. La decision viene del proceso EDD, no del PEP-status per se.

---

**Paso 4 — Si es false positive**

Documentar exhaustivamente la justificacion en Sumsub:

```
False positive — homonym confirmed.
Match name: [nombre PEP en base]
Client name: [nombre cliente]
PEP DOB: [fecha PEP]
Client DOB: [fecha cliente]
PEP nationality: [pais PEP]
Client nationality: [pais cliente]
PEP photo vs client photo: clearly different person
Conclusion: false positive, no PEP relationship.
Reviewer: Susana
Date: YYYY-MM-DD
```

Cerrar alert en Sumsub. Continuar onboarding normal.

---

**Paso 5 — Archivo**

Toda la accion queda registrada automaticamente en Sumsub con timestamp + reviewer ID. Adicionalmente, si fue match real, el caso queda en la carpeta EDD del compliance share con todos los anexos.

</div>

---

## 4. Proceso cuando Sumsub levanta alert Sanctions

> [!WARNING]
> Sanctions alert es la situacion mas critica de compliance. Manejarla mal puede generar responsabilidad criminal personal de Susana y revocacion de licencia AOFA. Seguir este SOP exactamente.

<div className="neo-step-list">

**Paso 1 — Recepcion del alert**

Sumsub envia alert urgente por email con asunto: "SANCTIONS MATCH ALERT — [nombre cliente]". Contiene:

- Nombre del cliente
- Lista de origen del match (OFAC / UN / EU / UK)
- Identidad de la entidad sancionada en la lista
- Tipo de sancion (asset freeze, travel ban, sectoral)

Susana debe responder en menos de 4 horas habiles.

---

**Paso 2 — Validacion del match**

Mismo proceso que PEP (comparar datos demograficos, foto, identidad). Determinar:

- **Match real**: paso 3
- **False positive**: paso 4

---

**Paso 3 — Si match real: ACCION INMEDIATA**

> [!WARNING]
> Si el match es real, la cuenta del cliente queda inmediatamente bloqueada y NO se le notifica al cliente nada. Notificarle constituye tipping-off, que es delito en la mayoria de jurisdicciones bajo AML/CFT laws.

Pasos en orden:

1. **FREEZE de la cuenta en MT5 + Skale** — bloquear logins, depositos, retiros y cualquier operacion. Este paso es inmediato y prioritario.
2. **NO contactar al cliente** bajo ninguna circunstancia. Si soporte recibe consultas, se le indica que escalen a Susana sin dar informacion.
3. **Escalar al Director** (Diego y Yulia, ambos) en menos de 4 horas. Reunion urgente.
4. **Consultar al abogado externo** especializado en AML/CFT para coordinar pasos legales.
5. **Preparar SAR (Suspicious Activity Report)** si las circunstancias lo ameritan. SAR se reporta a AOFA y/o a la autoridad competente segun jurisdiccion del cliente.
6. **NO devolver fondos** hasta que la autoridad regulatoria lo autorice. Si el cliente esta sancionado, los fondos pueden estar sujetos a freeze obligatorio.
7. **Cooperar con cualquier requerimiento oficial** de AOFA, autoridades del pais del cliente, o autoridades de las listas de sanctions emisoras.
8. **Documentar absolutamente todo** con timestamps, screenshots, copias de comunicaciones internas, decisiones y aprobaciones.

**ACCIONES PROHIBIDAS (criminales):**
- Notificar al cliente del freeze o de la sospecha
- Devolver fondos sin autorizacion regulatoria
- Continuar operando la cuenta
- Eliminar evidencia o documentacion
- Borrar la cuenta del sistema (debe quedar archivada)
- Comentar el caso con cualquier persona ajena al equipo de compliance/direccion/abogado

---

**Paso 4 — Si es false positive**

Documentar con justificacion robusta y triple validacion:

1. Comparar datos demograficos como en PEP (nombre, fecha, foto, nacionalidad)
2. **Confirmar con segunda fuente:** OFAC search manual en home.treasury.gov/policy-issues/financial-sanctions
3. **Confirmar con tercera fuente** segun aplique: UN, EU, UK manual search
4. Solo cerrar como false positive si las TRES fuentes confirman que el cliente no es la persona de la lista

Documentacion en Sumsub:

```
False positive — sanctions homonym confirmed via triple-source validation.
Match list: [OFAC SDN / UN / EU / UK]
Match entity: [nombre en la lista]
Client name: [nombre cliente]
Match DOB: [fecha en lista]
Client DOB: [fecha cliente]
Match nationality: [pais en lista]
Client nationality: [pais cliente]
OFAC manual search (URL + screenshot): [link + filename]
UN manual search: [link + filename]
EU manual search: [link + filename]
Conclusion: false positive — different person.
Reviewer: Susana + Director [nombre]
Date: YYYY-MM-DD
```

Cerrar alert solo con doble revision (Susana + Director).

</div>

---

## 5. Adverse Media Screening manual

### Cuando ejecutarlo

- **Siempre** en cada onboarding de cliente nuevo (parte del checklist KYC)
- **Anual** para todos los clientes HIGH RISK
- **Cuando se dispara cualquier trigger EDD** (parte del proceso EDD paso 4)
- **Cuando un empleado interno reporta sospecha** sobre un cliente existente

### Como ejecutarlo

**Busqueda en Google con keywords:**

- `"Nombre completo del cliente"`
- `"Nombre completo del cliente" + fraud`
- `"Nombre completo del cliente" + scandal`
- `"Nombre completo del cliente" + investigation`
- `"Nombre completo del cliente" + arrested`
- `"Nombre completo del cliente" + lawsuit`
- `"Nombre completo del cliente" + bankruptcy`
- `"Nombre completo del cliente" + sanctions`
- `"Nombre completo del cliente" + money laundering`
- `"Nombre completo del cliente" + tax evasion`
- `"Nombre completo del cliente" + corruption`

Repetir las busquedas en idioma local del cliente (espanol, portugues, ingles, ruso, arabe, segun aplique).

**Busqueda en LinkedIn:**
- Validar nombre, foto, profesion declarada, empresa, anios en el rol

**Google News:**
- `"Nombre completo del cliente" + pais de residencia`

### Que documentar

- Lista de keywords usadas (en cada idioma)
- Numero de resultados por busqueda
- Screenshots de cualquier resultado relevante (positivo o ambiguo)
- Fecha de la busqueda
- Conclusion: clean / requires further review / adverse found

### Cuando un adverse media positivo dispara que

- Articulos sobre fraude financiero -> EDD obligatorio
- Investigacion criminal abierta -> EDD obligatorio + posible rechazo
- Sanctions historicas -> revisar si sigue activa, EDD obligatorio
- Litigios civiles relevantes (>1M USD o reputacionales) -> EDD obligatorio
- Quiebras personales o empresariales recientes -> revisar SoF con mayor profundidad
- Vinculo con personas sancionadas u organizaciones criminales -> rechazar + posible SAR

---

## 6. Calendario operativo de compliance — checks recurrentes

Este calendario es el minimo obligatorio. Susana debe ejecutarlo y documentar cada accion en el log de compliance.

| Frecuencia | Accion | Responsable | Evidencia requerida |
|---|---|---|---|
| Diario | Revisar inbox de alerts Sumsub (PEP/Sanctions) | Susana | Capturas de cada alert + accion tomada |
| Diario | Revisar reportes internos de comportamiento sospechoso | Susana | Log de reportes + decisiones |
| Semanal (lunes) | Review de casos EDD abiertos en progreso | Susana | Reporte de status de casos abiertos |
| Mensual (1er lunes) | Re-scan completo de la base de clientes contra sanctions actualizadas | Susana | Reporte Sumsub mensual |
| Mensual (1er lunes) | Re-scan de PEP status de toda la base | Susana | Reporte Sumsub mensual |
| Mensual | Review de todos los clientes HIGH RISK (estado, actividad, alertas) | Susana | Reporte mensual HIGH RISK |
| Mensual | Review de transacciones inusuales o desvios de patron | Susana + Dealing | Reporte mensual de excepciones |
| Trimestral | Validacion manual de OFAC/UN/EU/UK contra muestra random de clientes | Susana | Documentacion de la muestra y resultados |
| Trimestral | Update de listas FATF (black y grey) en docs internos | Susana | Versionado de risk-matrix.md |
| Trimestral | Re-check PEP status de existentes (background check refresh) | Susana | Actualizacion en Skale |
| Semestral | Review de todos los clientes MEDIUM RISK | Susana | Reporte semestral MEDIUM |
| Semestral | Validacion tecnica de integracion Sumsub | Susana + Tech | Reporte de integracion |
| Anual | Review de todos los clientes LOW RISK (sample audit) | Susana | Reporte anual LOW |
| Anual | Audit interno de compliance completo | Susana + Director + Auditor externo opcional | Reporte de audit anual |
| Cuatrimestral (post plenarias FATF: feb / jun / oct + check dec) | Update oficial de FATF country lists | Susana | Capturas oficiales fatf-gafi.org |

---

## 7. Reporting interno y escalamiento

### A quien escalar y cuando

| Situacion | Escalar a | SLA |
|---|---|---|
| Alert PEP nueva | Susana revisa, no escala salvo doble criterio | 24h |
| Match PEP confirmado | Director (Diego o Yulia) | 24h |
| Alert sanctions nueva | Susana + Director simultaneamente | 4h |
| Match sanctions confirmado | Director + Abogado externo | Inmediato (mismo dia) |
| Adverse media grave | Director | 48h |
| Cliente intenta tipping-off el sistema | Director + Abogado externo | Inmediato |
| Caso EDD que requiere decision dual | Director | 48h |
| Requerimiento oficial AOFA | Director + Abogado externo | Inmediato |
| Requerimiento de autoridad de pais del cliente | Director + Abogado externo | Inmediato |

### Comunicaciones internas

- Canal preferido: email a `compliance@neomaaa.com` con CC al Director correspondiente
- Para casos urgentes (sanctions match): llamada telefonica directa al Director + email confirmatorio
- Para casos sensibles (SAR potencial): no usar Telegram, WhatsApp ni canales no encriptados; preferir email institucional + reunion en persona/videollamada cifrada

### Que NO hacer en comunicaciones

- No mencionar nombres de clientes en chats grupales sin necesidad
- No reenviar alerts a personas ajenas al equipo de compliance
- No usar ChatGPT u otras IA externas para "analizar" casos (data privacy)
- No comentar casos con familia, amigos, otros traders o empleados ajenos

---

## 8. Prohibicion de tipping-off — explicacion detallada

> [!WARNING]
> "Tipping-off" es alertar al cliente de que esta bajo sospecha, bajo investigacion, o bajo SAR. Es **delito** bajo la mayoria de las legislaciones AML/CFT a nivel global y bajo las regulaciones AOFA. La pena puede incluir prision personal del compliance officer y revocacion de licencia para la entidad.

**Que constituye tipping-off:**

- Decirle al cliente "tu cuenta esta bloqueada porque hay sospecha"
- Insinuar que estamos haciendo SAR
- Mencionar que su nombre aparecio en una lista de sanctions
- Sugerir que retire fondos antes de ser bloqueado
- Pedirle "explicaciones" en terminos que revelan la naturaleza de la investigacion
- Cualquier comunicacion, escrita u oral, que permita al cliente inferir la sospecha

**Que NO constituye tipping-off (permitido):**

- Solicitar documentacion adicional con texto neutro ("requerimos para completar verificacion")
- Comunicar el rechazo de la cuenta sin especificar motivo
- Comunicar limites operativos sin explicar el porque
- Comunicar el cierre de cuenta sin especificar motivo

**Regla de oro:** ante la duda, no comunicar nada al cliente y consultar con el Director y/o abogado externo antes de cualquier mensaje.

---

## 9. SAR (Suspicious Activity Report) — cuando y como

### Cuando reportar SAR

SAR se reporta cuando hay sospecha razonable de:

- Lavado de dinero (predicado, layering, integracion)
- Financiamiento del terrorismo
- Fraude financiero
- Actividad criminal organizada
- Evasion fiscal a gran escala
- Trata de personas, narcotrafico, corrupcion

Sospecha razonable no requiere certeza. Si hay indicios, se reporta. La decision de no reportar tambien debe documentarse.

### A quien se reporta

- AOFA (regulador local Anjouan) — primero
- Si el cliente reside en otra jurisdiccion, puede aplicar SAR adicional al Financial Intelligence Unit (FIU) de ese pais
- Coordinar con abogado externo para definir scope exacto

### Proceso de SAR

1. Decision tomada en reunion Susana + Director + Abogado externo
2. Redaccion del SAR siguiendo formato AOFA (template a obtener del regulador)
3. Documentacion completa de la actividad sospechosa: timestamps, montos, contrapartes, screenshots, evidencia de patrones
4. Submission segun canal oficial AOFA
5. Archivo de copia firmada en compliance share
6. **Mantener freeze de la cuenta** y no comunicar al cliente
7. Esperar respuesta de AOFA antes de cualquier accion adicional sobre la cuenta

### Confidencialidad de SAR

- SAR es informacion clasificada
- Solo Susana, Director y abogado externo conocen su existencia
- No mencionar a otros empleados, ni en reuniones generales
- Retencion: 7 anos minimo

---

## 10. Lecciones rapidas — errores comunes a evitar

| Error | Por que es problema | Que hacer en su lugar |
|---|---|---|
| Cerrar un alert PEP como false positive sin documentar | No hay evidencia ante auditoria | Siempre documentar la justificacion en Sumsub |
| Devolver fondos al cliente sancionado | Puede constituir financiamiento del terrorismo | Freeze + escalar + esperar autorizacion regulatoria |
| Decirle al cliente que esta siendo investigado | Tipping-off — delito personal y para la entidad | Texto neutro + escalamiento interno |
| Asumir que Sumsub captura todo | Sumsub puede tener gaps de cobertura | Validacion manual mensual + adverse media manual |
| No re-screenear clientes existentes | Personas se vuelven PEPs durante la relacion | Mensual obligatorio |
| Borrar registros de clientes rechazados | Violacion de retencion documental | Archivar 7 anos minimo |
| Comentar casos con personas ajenas a compliance | Confidencialidad + tipping-off potencial | Mantener compartimentado |
| Subir documentacion sensible a Drive personal | Data leak + GDPR/AOFA | Solo en compliance share institucional |
| Aprobar EDD sin firma del Director | Aprobacion invalida + violacion regla dual signoff | Esperar siempre la firma del Director |
| Hacer follow-up al cliente sancionado | Tipping-off + responsabilidad personal | No contactar bajo ninguna razon |

---

## 11. Secciones para Susana completar

- [x] **Email institucional para alerts Sumsub:** `compliance@neomaaa.com` (confirmado)
- [ ] **Confirmar configuracion Sumsub** para envio de daily alerts a ese email: [ ] OK [ ] Pendiente
- [ ] **Confirmar acceso a OFAC search web** (home.treasury.gov): [ ] OK [ ] Pendiente
- [ ] **Confirmar acceso a UN sanctions search**: [ ] OK [ ] Pendiente
- [ ] **Confirmar acceso a EU sanctions consolidated**: [ ] OK [ ] Pendiente
- [ ] **Confirmar acceso a UK HM Treasury sanctions**: [ ] OK [ ] Pendiente
- [ ] **Definir si se contrata servicio externo** complementario (World-Check / Dow Jones / Refinitiv): [ ] Si [ ] No, por ahora
- [ ] **Abogado externo de referencia AML/CFT**: nombre, jurisdiccion, contacto 24/7 para casos urgentes
- [ ] **Director default para escalamiento sanctions**: [ ] Diego [ ] Yulia [ ] Ambos en simultaneo
- [ ] **Canal de comunicacion para casos sensibles**: [ ] Email solo [ ] Email + llamada [ ] Reunion presencial
- [ ] **Path exacto del compliance share** (Drive/Dropbox): `___________________`
- [ ] **Template oficial de SAR AOFA** obtenido del regulador: [ ] Si [ ] Pendiente solicitar
- [ ] **Politica de revision de retencion documental** (auditor externo opcional): definir frecuencia

---

## 12. Referencias regulatorias

- **FATF Recommendation 6** — Targeted Financial Sanctions related to Terrorism and Terrorist Financing
- **FATF Recommendation 7** — Targeted Financial Sanctions related to Proliferation
- **FATF Recommendation 12** — Politically Exposed Persons
- **FATF Recommendation 20** — Reporting of Suspicious Transactions
- **FATF Recommendation 21** — Tipping-off and Confidentiality
- **AOFA License Conditions** — licencia L15968/N
- **OFAC Compliance Programs Framework** — Office of Foreign Assets Control (US Treasury)
- **UN Security Council Sanctions Regime**
- **Wolfsberg Group AML Principles** (best practice reference)

---

**Ultima revision:** 13 de abril de 2026
**Proxima revision obligatoria:** 13 de octubre de 2026 (semestral por criticidad)
**Owner:** Susana — Compliance Officer
**Approver:** Diego Loyola / Yulia
