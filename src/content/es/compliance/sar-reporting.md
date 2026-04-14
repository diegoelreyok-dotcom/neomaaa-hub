# SAR (Suspicious Activity Report) — Proceso y Template

**Documento operativo interno — CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

> **PROPOSITO DEL DOCUMENTO**
>
> Este documento le da a Susana el proceso exacto, paso a paso, para detectar, investigar, documentar y reportar actividad sospechosa al regulador AOFA. Incluye:
>
> - Triggers claros de cuando se dispara un SAR
> - Proceso de 8 pasos desde deteccion hasta post-submision
> - Template SAR completo listo para copiar-pegar
> - Reglas criticas de tipping-off y retencion de records
>
> **Regla de oro:** Si hay duda, DOCUMENTAR y ESCALAR. Es mil veces preferible un SAR de mas que un SAR de menos.

---

## 1. Que es un SAR y por que existe

Un **Suspicious Activity Report (SAR)** — en espanol, Reporte de Actividad Sospechosa — es el mecanismo formal por el cual una entidad financiera reportada a su regulador actividad que sospecha esta relacionada con lavado de dinero, financiamiento del terrorismo, evasion fiscal u otros crimenes. Es una obligacion legal, no una opcion.

El marco viene de FATF **Recommendation 20** ("Reporting of suspicious transactions"): toda entidad financiera debe reportar a la Financial Intelligence Unit (FIU) local cualquier transaccion o actividad que sospeche razonablemente este relacionada con fondos de origen criminal. AOFA, como regulador de Neomaaa Ltd bajo la licencia L15968/N, adopta este estandar y exige SARs como condicion para mantener la licencia.

### 1.1 Por que NO reportar es peor que reportar de mas

Las consecuencias de no reportar cuando correspondia son severas y personales:

| Consecuencia | Impacto |
|---|---|
| Revocacion de licencia AOFA | El broker deja de operar legalmente |
| Multas regulatorias | Pueden llegar a cifras que destruyen la empresa |
| Responsabilidad personal del Compliance Officer | Susana puede ser inhabilitada personalmente para ejercer compliance en futuras entidades |
| Responsabilidad penal | En casos graves, prision por facilitacion de lavado |
| Reputacion destruida | Otros reguladores, bancos corresponsales, PSPs cortan relacion |

### 1.2 Por que reportar de mas NO tiene costo

El "false positive" de un SAR no tiene consecuencias negativas. AOFA recibe miles de SARs que luego se archivan como sin merito. Nadie sanciona por reportar. Si Susana reporta y resulta no ser nada, se archiva. Si Susana NO reporta y resulta ser lavado, es el fin de NEOMAAA.

> **REGLA DE ORO:** Ante la duda, SAR. Documentar. Reportar. Dormir tranquila.

---

## 2. Cuando se dispara un SAR — triggers claros

### 2.1 Criterio general

Cualquier actividad que **no tiene explicacion legitima clara** y que podria estar relacionada con:

- Lavado de dinero (money laundering)
- Financiamiento del terrorismo (terrorist financing)
- Evasion fiscal (tax evasion)
- Fraude
- Evasion de sanciones internacionales
- Cualquier "predicate crime" (crimen subyacente): narcotrafico, trata de personas, corrupcion, etc.

No hace falta tener **prueba** de que hay crimen. Alcanza con **sospecha razonable**. El estandar es: "un profesional de compliance razonable, viendo estos hechos, encontraria esto suficientemente raro como para reportarlo".

### 2.2 Red flags especificas — categorizadas

A continuacion, las senales concretas agrupadas por tipo. Si aparecen una o mas, Susana debe abrir el proceso descrito en la seccion 3.

#### 2.2.1 Red flags en DEPOSITOS

| Red flag | Por que es sospechoso |
|---|---|
| Depositos multiples pequenos en corto tiempo | "Structuring" / "smurfing" — fracciona para evitar thresholds |
| Depositos desde jurisdicciones FATF grey/black list sin explicacion | Alto riesgo de lavado |
| Fondos de fuentes no declaradas o inconsistentes con perfil | El cliente dijo A en onboarding pero los fondos vienen de B |
| Depositos equivalentes a efectivo (prepaid cards, money orders) | Mecanismos clasicos de lavado |
| Uso de multiples metodos de pago distintos en corto tiempo | Ofuscacion deliberada del origen |
| Deposito desde cuenta bancaria a nombre distinto al cliente | Tercero transfiriendo fondos |
| Deposito significativo seguido de retiro inmediato sin trading | "Rinse and repeat" clasico de lavado |

#### 2.2.2 Red flags en TRADING

| Red flag | Por que es sospechoso |
|---|---|
| Trading que no tiene logica economica (perdiendo a proposito) | Transferencia de valor encubierta |
| Open/close de posiciones muy rapido sin estrategia visible | "Wash trading" o cover de movimientos |
| Patrones de trading coincidentes entre dos clientes | Posible wash trading entre cuentas |
| Volumen muy alto sin perfil que lo justifique | Cliente declaro ingreso moderado, opera millones |
| Operaciones concentradas en instrumentos exoticos o ilíquidos | Manipulacion de precio para transferir valor |
| Uso constante de apalancamiento maximo sin estrategia clara | Podria ser cover de perdida deliberada |

#### 2.2.3 Red flags en RETIROS

| Red flag | Por que es sospechoso |
|---|---|
| Retiros a cuenta DISTINTA de donde deposito | Lavado clasico: entro por A, sale por B |
| Retiros a crypto sin tiempo de trading substantivo | Conversion de fiat a crypto no trazable |
| Retiros fraccionados para evitar thresholds | Structuring inverso |
| Retiros inmediatos posterior a deposito grande sin trading | Uso de la plataforma como pass-through |
| Retiro a jurisdiccion distinta a la del cliente | Ofuscacion geografica |
| Cambio repentino del beneficiario de retiro | Posible cesion de fondos a tercero |

#### 2.2.4 Red flags de IDENTIDAD y COMPORTAMIENTO

| Red flag | Por que es sospechoso |
|---|---|
| Cliente se niega a dar info, da info falsa o cambiante | Intento de ocultar identidad real |
| Cliente opera en nombre de tercero sin autorizacion formal | Uso de "testaferro" |
| Cliente identificado como PEP post-onboarding | Cambio material de perfil de riesgo |
| Cliente aparece en adverse media (noticias negativas) | Riesgo reputacional + posible riesgo real |
| Cliente tiene match en sanctions (incluso si parece false positive) | Obligatorio investigar siempre |
| Cliente quiere cancelar urgentemente sin razon | Posible alerta por otro canal que no conocemos |
| Cliente insiste en evitar ciertos registros o reportes | Senal clarisima |

#### 2.2.5 Red flags en IB / PARTNERS / TERCEROS

| Red flag | Por que es sospechoso |
|---|---|
| IB con patron repetido de traer clientes de alto riesgo | Posible network de lavado |
| IB recibe comisiones pero sus clientes no tienen trading activity | "Cuenta zombie" para lavar via comision |
| IB opera desde jurisdiccion distinta a la declarada | Ofuscacion de identidad |
| Tercero paga los fondos de un cliente | Proxy / testaferro |

> **NOTA IMPORTANTE:** Esta lista NO es exhaustiva. Susana debe aplicar juicio profesional. Si algo "huele mal" aunque no este en la lista, el proceso se activa igual. Las listas cerradas son peligrosas — los lavadores adaptan sus tecnicas.

---

## 3. Proceso paso a paso cuando detectas algo sospechoso

<div className="neo-step-list">
<div className="neo-step" data-num="1" data-title="Documentar la sospecha"><div>Abrir inmediatamente un caso interno en Sumsub o doc Notion/Obsidian. Timeline de eventos, evidencia (screenshots, logs, extractos), observacion inicial. ANTES de decidir si es SAR, documentar para no perder evidencia.</div></div>
<div className="neo-step" data-num="2" data-title="Analisis inicial (max 48h)"><div>Susana evalua: Hay explicacion legitima posible? Encaja con el perfil del cliente? Hay red flags adicionales? Consultar historial KYC, transacciones previas, comunicaciones.</div></div>
<div className="neo-step" data-num="3" data-title="Decision interna"><div>Tres opciones: (a) NO SOSPECHOSO → documentar razon y archivar. (b) DUDOSO → solicitar info adicional al cliente sin revelar investigacion, NO SAR aun. (c) SOSPECHOSO → proceder a paso 4.</div></div>
<div className="neo-step" data-num="4" data-title="Preparar SAR"><div>Llenar el formulario SAR completo (ver seccion 4). Compilar toda la evidencia. NUNCA notificar al cliente que se esta reportando (esto es tipping off — es crimen en muchas jurisdicciones).</div></div>
<div className="neo-step" data-num="5" data-title="Aprobacion interna"><div>Director (Diego) revisa y firma el SAR. En casos complejos, consultar con abogado externo AML antes de submitir. Mantener trazabilidad de la aprobacion.</div></div>
<div className="neo-step" data-num="6" data-title="Submision a AOFA"><div>Enviar SAR al canal oficial de AOFA segun el procedimiento confirmado. [SUSANA COMPLETA: metodo de submision AOFA — email, portal, carta certificada]. Retener copia firmada + acuse de recibo.</div></div>
<div className="neo-step" data-num="7" data-title="Accion sobre la cuenta"><div>Dependiendo de severidad y orientacion de AOFA: freeze temporal pendiente resolucion, cierre permanente si AOFA lo indica, o continue monitoring si AOFA pide evidencia adicional. NUNCA devolver fondos sin autorizacion regulatoria.</div></div>
<div className="neo-step" data-num="8" data-title="Follow-up y retencion"><div>Retener SAR + toda la evidencia minimo 7 anos. Cooperar con cualquier requerimiento AOFA posterior. Review anual de SARs submitidos para identificar patrones.</div></div>
</div>

### 3.1 Reglas criticas durante el proceso

**NUNCA:**
- Avisar al cliente que se esta investigando o reportando (tipping off = crimen)
- Devolver fondos al cliente sin autorizacion regulatoria
- Discutir el SAR con terceros no autorizados (sales, marketing, otros clientes)
- Demorar el reporte por conveniencia comercial
- Borrar evidencia o comunicaciones sospechosas
- Firmar el SAR sin leer y entender cada linea

**SIEMPRE:**
- Documentar cada paso con timestamp
- Mantener comunicacion del caso en canal restringido (solo Susana + Director + legal)
- Conservar copias originales de toda evidencia
- Actuar con urgencia cuando hay riesgo de fuga de fondos
- Escalar a Director cualquier caso HIGH RISK

---

## 4. Template SAR completo (formulario listo para usar)

Susana solo tiene que completar los campos `[ ]`. El resto ya esta armado.

```markdown
# SUSPICIOUS ACTIVITY REPORT (SAR)

**Reporting Entity:** Neomaaa Ltd
**License:** L15968/N (AOFA International Brokerage License)
**Address:** Hamchako, Mutsamudu, Autonomous Island of Anjouan, Union of Comoros
**Reporting Officer:** Susana — Compliance Officer
**Date of report:** [DD/MM/YYYY]
**Case Reference:** NEOMAAA-SAR-[YYYY]-[###]
**Classification:** CONFIDENTIAL — NOT FOR DISCLOSURE TO SUBJECT

---

## 1. Subject of the report

### 1.a Individual client
- Full legal name: [ ]
- Date of birth: [ ]
- Nationality: [ ]
- Country of residence: [ ]
- Passport / National ID number: [ ]
- Address on file: [ ]
- Email: [ ]
- Phone: [ ]
- Account number (CRM): [ ]
- Date of account opening: [ ]
- KYC category at opening: [LOW / MEDIUM / HIGH]

### 1.b Corporate client (if applicable)
- Company name: [ ]
- Jurisdiction of incorporation: [ ]
- Registration number: [ ]
- Registered address: [ ]
- Ultimate Beneficial Owner(s) (names, % ownership): [ ]
- Directors / authorized signatories: [ ]
- Nature of business: [ ]

---

## 2. Nature of suspected activity

Marcar todas las que apliquen:
- [ ] Money laundering
- [ ] Terrorist financing
- [ ] Fraud (identity, investment, other)
- [ ] Tax evasion
- [ ] Sanctions evasion
- [ ] Structuring / smurfing
- [ ] Wash trading / market manipulation
- [ ] Unexplained source of funds
- [ ] PEP-related suspicious activity
- [ ] Other: [especificar]

---

## 3. Timeline of events (orden cronologico)

| Date | Event | Amount (if applicable) | Source / Doc ref |
|---|---|---|---|
| [DD/MM/YY] | [evento 1] | [monto + moneda] | [doc ref] |
| [DD/MM/YY] | [evento 2] | [monto + moneda] | [doc ref] |
| [DD/MM/YY] | [evento 3] | [monto + moneda] | [doc ref] |

---

## 4. Detailed narrative description

[Escribir narrativa de 500-1500 palabras cubriendo:
- Que paso, en orden cronologico
- Por que es sospechoso (referenciar red flags especificas de seccion 2 de este SOP)
- Que documentacion se reviso
- Que se intento aclarar con el cliente (si aplica) y cual fue la respuesta
- Red flags especificas detectadas
- Por que la explicacion del cliente no es satisfactoria (si la dio)
- Cualquier contexto adicional relevante (adverse media, sanctions, etc.)]

---

## 5. Evidence attached (checklist)

- [ ] Extractos bancarios del cliente
- [ ] Transactions log del CRM (periodo relevante)
- [ ] Communications con el cliente (email, chat Intercom, tickets)
- [ ] Sumsub verification file completo (ID, selfie, POA)
- [ ] Adverse media findings (links + fecha captura)
- [ ] Sanctions match detail (lista + nombre matched + porcentaje match)
- [ ] PEP match detail (si aplica)
- [ ] Screenshots de trading activity relevante
- [ ] Documentacion de Source of Funds (si fue provista)
- [ ] Otros: [especificar]

---

## 6. Prior relationship with Neomaaa Ltd

- Length of relationship: [meses / anos]
- Prior KYC category: [LOW / MEDIUM / HIGH]
- Prior issues detected: [si / no + descripcion]
- Prior SAR on same subject: [YES / NO + referencia si aplica]
- Related accounts (same UBO, familia, IP, device): [si / no + lista]

---

## 7. Current risk assessment

- New risk category recommended: [ ]
- Recommendation on account: [FREEZE / CLOSE / CONTINUE MONITORING]
- Recommended action on funds: [HOLD PENDING AOFA INSTRUCTION / OTHER]
- Proposed next review date: [ ]

---

## 8. Internal review and approval

| Role | Name | Signature | Date |
|---|---|---|---|
| Compliance Officer | Susana | _________________ | [ ] |
| Director | Diego / Yulia | _________________ | [ ] |
| External legal (if used) | [nombre] | _________________ | [ ] |

---

## 9. Submission to AOFA

- Submission method: [SUSANA COMPLETA]
- Submission date: [DD/MM/YYYY HH:MM]
- Receipt / reference number from AOFA: [ ]
- AOFA contact person (if any): [ ]
- Follow-up instruction from AOFA: [ ]

---

## 10. Post-submission log

| Date | Event / Communication | Action taken |
|---|---|---|
| [ ] | [ ] | [ ] |

---

**END OF REPORT**
**Retention period:** 7 years minimum from date of submission
**Storage location:** Compliance secure folder — access restricted to Compliance Officer and Director
```

---

## 5. Post-SAR — acciones despues de enviar

Una vez submitido el SAR, la relacion con el cliente y con AOFA cambia. Susana debe seguir estas reglas hasta que AOFA cierre formalmente el caso.

### 5.1 Que HACER

- Esperar respuesta de AOFA (puede tardar semanas o meses — es normal)
- Continuar documentando cualquier evento nuevo sobre el cliente
- Si AOFA pide mas info → cooperar completamente, rapido y con evidencia
- Si AOFA indica freeze → ejecutar freeze inmediatamente y notificar a Ops/Dev
- Si AOFA libera el caso tras revisar → retomar monitoreo intensificado (HIGH RISK)
- Retener SAR + evidencia 7 anos minimo

### 5.2 Que NO hacer

- NO notificar al cliente bajo ninguna circunstancia (tipping off)
- NO discutir el caso con personas fuera del circulo autorizado
- NO devolver fondos sin instruccion de AOFA
- NO cerrar la cuenta por cuenta propia sin evaluar con Director + AOFA
- NO borrar ni modificar evidencia ni comunicaciones previas
- NO responder preguntas del cliente sobre "por que esta demorado mi retiro" con info real — usar respuesta generica tipo "revision rutinaria"

### 5.3 Guion de respuesta al cliente (si pregunta por demora)

Si el cliente llama o escribe preguntando por que su cuenta esta bloqueada o su retiro demorado, el equipo de soporte debe usar **solo** esta respuesta:

> "Tu cuenta esta bajo una revision rutinaria de compliance como parte de nuestras obligaciones regulatorias. No podemos dar detalles sobre el proceso ni su duracion. Te contactaremos en cuanto la revision concluya."

**Nunca** decir: "estas siendo investigado", "hay un SAR", "AOFA nos pidio", "te congelamos por sospechoso". Todo eso es tipping off.

---

## 6. Manejo de false positives

No todo caso investigado termina en SAR. Muchos terminan con "fue un falso positivo — todo es legitimo". Este resultado tambien se documenta.

### 6.1 Proceso si NO era SAR

1. Completar el caso interno con la razon: por que la sospecha inicial se descarto
2. Documentar que evidencia / explicacion satisfizo la duda
3. Obtener firma de aprobacion del cierre (Susana + Director)
4. Retener el record minimo 5 anos — puede ser relevante en revisiones futuras
5. No marcar al cliente como "limpio para siempre" — puede volver a aparecer red flag mas adelante

### 6.2 Estructura del record de cierre sin SAR

```markdown
# CASO COMPLIANCE — CIERRE SIN SAR

**Case Reference:** NEOMAAA-CASE-[YYYY]-[###]
**Subject:** [nombre cliente]
**Date opened:** [ ]
**Date closed:** [ ]
**Reviewer:** Susana

## Initial suspicion
[Que disparo la investigacion]

## Evidence reviewed
[Lista de docs y fuentes consultadas]

## Client explanation (if any)
[Que dijo el cliente, que documentos aporto]

## Conclusion
[Por que se descarto como SAR]

## Actions taken
- [ ] Risk category reviewed: [mantener / ajustar a X]
- [ ] Flag interno en CRM: [si / no]
- [ ] Fecha proxima revision: [ ]

**Closed by:** Susana _________________ Date: [ ]
**Approved by:** Director _________________ Date: [ ]
```

---

## 7. Integracion con otros procesos de compliance

El SAR no es un proceso aislado. Se conecta con:

| Proceso | Relacion con SAR |
|---|---|
| Sumsub alerts | Muchas alertas de Sumsub (sanctions match, adverse media) disparan investigacion que puede terminar en SAR |
| EDD (Enhanced Due Diligence) | Si EDD no resuelve las dudas, escala a SAR |
| Monthly monitoring HIGH RISK | Patrones detectados en monitoring pueden escalar a SAR |
| Reporte a Director semanal | SARs submitidos se incluyen (solo numero, sin detalles) en weekly summary |
| Reporte mensual | Metrica agregada de SARs del mes |
| Audit anual | Revisar SARs del ano para identificar patrones y mejorar procesos |

---

## 8. Errores comunes a evitar

| Error | Consecuencia | Como evitarlo |
|---|---|---|
| Esperar "tener seguridad" antes de reportar | Nunca se alcanza seguridad total — solo sospecha razonable | Reportar en cuanto hay sospecha razonable, no esperar prueba |
| Investigar demasiado tiempo sin documentar | Se pierde evidencia, queda solo en la cabeza | Documentar desde minuto 1 en Sumsub / Notion |
| Hablar del caso con gente no autorizada | Tipping off + leak | Solo Susana + Director + legal externo si aplica |
| Usar lenguaje vago en el SAR | AOFA rechaza o pide re-submit | Ser especifico: fechas, montos, cuentas, red flags |
| No retener evidencia | Si AOFA audita, no hay soporte | Retencion 7 anos minimo, con backup |
| Borrar comunicaciones del cliente post-SAR | Destruccion de evidencia — crimen | NUNCA borrar nada |
| Notificar al cliente | Tipping off — crimen en muchas jurisdicciones | Guion generico de "revision rutinaria" |

---

## 9. Escalamiento y contactos

### 9.1 Dentro de NEOMAAA

| Nivel | Quien | Cuando contactar |
|---|---|---|
| 1 | Susana (Compliance Officer) | Todo caso compliance |
| 2 | Diego / Yulia (Directors) | Casos HIGH RISK, aprobacion SARs, freezes |
| 3 | Abogado externo AML | Casos complejos, dudas regulatorias, review SAR critico |
| 4 | Pepe (Head of Dealing) | Coordinar freeze operativo, bloqueo trading |

### 9.2 Fuera de NEOMAAA

| Contacto | Uso |
|---|---|
| AOFA (regulador) | Submision SAR + cooperacion posterior |
| FIU local (si aplica) | Algunos SARs van a FIU regional |
| Bancos corresponsales | Notificar si hay freeze en cuenta bancaria |
| PSPs | Notificar si hay freeze en metodos de pago |

---

## 10. Seccion Susana completa

Los siguientes campos requieren que Susana los valide y complete con AOFA directamente antes de que este documento quede finalizado:

- [SUSANA: confirmar metodo exacto de submision de SARs a AOFA — email, portal online, carta certificada]
- [SUSANA: obtener nombre y contacto nominal en AOFA para SARs (liaison officer si existe)]
- [SUSANA: confirmar SLA de AOFA para acusar recibo del SAR]
- [SUSANA: definir procedimiento si AOFA no responde en X dias habiles]
- [SUSANA: seleccionar y contratar abogado externo AML de confianza — nombre + datos de contacto]
- [SUSANA: confirmar si AOFA requiere formato propio de SAR o acepta template interno]
- [SUSANA: definir canal seguro de transmision de SARs (correo encriptado, portal, courier)]
- [SUSANA: confirmar idioma requerido por AOFA — ingles / frances / otro]

---

**Version:** 1.0
**Fecha:** 13 de abril 2026
**Proxima revision:** 13 de abril 2027 (anual) o ante cambio regulatorio material
**Responsable:** Susana — Compliance Officer
**Aprobado por:** Principals
