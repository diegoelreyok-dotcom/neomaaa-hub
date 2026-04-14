# POLITICA AML/KYC (VERSION PUBLICA)

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**

> DOCUMENTO DE REFERENCIA INTERNO — Requiere revision legal antes de publicacion.

---

## 1. INTRODUCCION

Neomaaa Ltd (IBC 15968), titular de la licencia L15968/N emitida por la Autoridad de Servicios Financieros Offshore de Anjouan (AOFA), esta comprometida con la prevencion del lavado de dinero (Anti-Money Laundering, AML) y el financiamiento del terrorismo (Counter-Financing of Terrorism, CFT).

Esta politica describe las medidas que la Empresa implementa para cumplir con sus obligaciones regulatorias y garantizar la integridad de sus operaciones.

---

## 2. MARCO REGULATORIO

La Empresa opera conforme a:

- Las regulaciones AML/CFT establecidas por la AOFA.
- Las recomendaciones del Grupo de Accion Financiera Internacional (GAFI/FATF).
- Las resoluciones de sanciones del Consejo de Seguridad de las Naciones Unidas.
- Las listas de sanciones aplicables (OFAC, UE, ONU).

---

## 3. POLITICA CONOZCA A SU CLIENTE (KYC)

### 3.1 Verificacion de Identidad

Todo cliente debe completar un proceso de verificacion de identidad antes de poder depositar, operar o retirar fondos. El proceso incluye:

**Documentos requeridos:**

| Documento | Finalidad | Requisitos |
|-----------|-----------|-----------|
| **Documento de identidad** | Verificar identidad del cliente | Pasaporte, cedula de identidad o licencia de conducir vigente. Debe incluir nombre completo, fecha de nacimiento, fotografia y fecha de vencimiento. |
| **Comprobante de domicilio** | Verificar direccion de residencia | Factura de servicios publicos, extracto bancario o documento oficial. No mayor a 3 meses de antiguedad. |
| **Verificacion biometrica** | Prevenir fraude de identidad | Selfie o verificacion en vivo (liveness check) a traves de la plataforma de verificacion. |

### 3.2 Clasificacion de riesgo del cliente

Neomaaa Ltd clasifica a sus clientes en 3 categorias de riesgo (LOW, MEDIUM, HIGH) segun la matriz de riesgo definida internamente. Los criterios y triggers especificos son propiedad operacional de la Compliance Office y estan documentados en la politica interna (Matriz de Riesgo AML/KYC), disponible para auditores bajo solicitud.

| Categoria | Perfil de riesgo | Documentacion requerida |
|-----------|------------------|-------------------------|
| **LOW RISK** | Cliente retail estandar, jurisdiccion no restringida, perfil consistente con declaracion | ID + Comprobante de domicilio + Verificacion biometrica |
| **MEDIUM RISK** | Triggers cualitativos definidos en Matriz de Riesgo interna | LOW RISK + Declaracion y documentacion de origen de fondos |
| **HIGH RISK** | PEP, match en listas, jurisdiccion FATF high risk, estructuras opacas u otros triggers categoricos | MEDIUM RISK + EDD completo (ver seccion 4) + aprobacion dual de Compliance + Principals |

### 3.3 Proveedor de Verificacion

La Empresa utiliza Sumsub como proveedor de servicios de verificacion KYC, que incluye:

- Reconocimiento automatico de documentos.
- Verificacion biometrica (liveness check).
- Screening automatico de sanciones internacionales.
- Screening de Personas Politicamente Expuestas (PEPs).
- Screening de medios adversos.

### 3.4 Plazos de Verificacion

- La verificacion automatica se completa en minutos en la mayoria de los casos.
- Las revisiones manuales pueden tomar entre 48 y 72 horas habiles, dependiendo de la categoria de riesgo y la calidad de la documentacion.
- En caso de documentacion insuficiente, el cliente recibira instrucciones para corregir y reintentar.

---

## 4. DEBIDA DILIGENCIA REFORZADA (EDD)

La Empresa aplica procedimientos de Debida Diligencia Reforzada conforme a FATF Recommendation 12 en clientes categorizados como HIGH RISK. Los triggers categoricos incluyen:

- PEP status (personal, familiar o asociado cercano de Persona Politicamente Expuesta).
- Match en listas de sanciones internacionales (OFAC, UN, UE).
- Jurisdicciones incluidas en la lista gris o negra de FATF/GAFI (high risk jurisdictions).
- Estructuras corporativas opacas o con beneficiario final no identificable.
- Patrones conductuales de riesgo (transacciones inconsistentes con perfil, structuring).
- Cualquier circunstancia que genere un nivel de riesgo elevado segun la Matriz de Riesgo interna.

La EDD puede incluir solicitudes de documentacion adicional, entrevistas, validacion independiente de fuentes, y restricciones temporales en la cuenta hasta que se complete la revision.

---

## 5. MONITOREO DE TRANSACCIONES

### 5.1 Monitoreo Continuo

Conforme a FATF Recommendation 10, la Empresa mantiene monitoreo continuo de todas las cuentas y transacciones de clientes para detectar actividades inusuales o potencialmente sospechosas, incluyendo:

- Depositos o retiros de montos inusualmente altos.
- Depositos seguidos de retiros inmediatos sin actividad de trading significativa.
- Uso de multiples metodos de pago sin justificacion aparente.
- Transacciones inconsistentes con el perfil financiero declarado del cliente.
- Intentos de estructuracion (fraccionamiento de transacciones para evitar umbrales de reporte).

**Reviews periodicos por categoria de riesgo:**

| Categoria | Frecuencia de review |
|-----------|---------------------|
| HIGH RISK | Mensual |
| MEDIUM RISK | Trimestral |
| LOW RISK | Anual o al triggered event |

### 5.2 Reportes de Actividad Sospechosa (SARs)

Cuando la Empresa identifique actividades sospechosas, presentara un Reporte de Actividad Sospechosa (SAR) a la AOFA conforme a la regulacion aplicable. La Empresa no informara al cliente sobre la presentacion de un SAR.

---

## 6. PROHIBICION DE DEPOSITOS DE TERCEROS

6.1 Todos los depositos deben provenir de cuentas o metodos de pago a nombre del titular de la cuenta de trading.

6.2 No se aceptan depositos de terceros, salvo en circunstancias excepcionales debidamente documentadas y aprobadas por el departamento de Compliance.

6.3 Los fondos recibidos de terceros sin autorizacion previa seran devueltos al remitente.

---

## 7. PAISES RESTRINGIDOS

La Empresa no acepta clientes de las siguientes jurisdicciones:

**Sancionados internacionalmente:** Cuba, Irak, Myanmar (Birmania), Corea del Norte, Sudan, Siria, Iran, Crimea, regiones de Donetsk y Luhansk.

**Restricciones regulatorias:** Estados Unidos, Canada, Espacio Economico Europeo (30 paises), Reino Unido, Australia, Japon, Israel.

Los clientes que intenten registrarse desde paises restringidos seran rechazados automaticamente durante el proceso de verificacion.

---

## 8. SANCIONES INTERNACIONALES

8.1 La Empresa realiza screening automatico de todos los clientes contra las listas de sanciones internacionales (OFAC, ONU, UE) durante el proceso de verificacion y de forma periodica.

8.2 No se abriran cuentas ni se procesaran transacciones para personas o entidades incluidas en listas de sanciones.

8.3 Si un cliente existente es incluido en una lista de sanciones, su cuenta sera congelada inmediatamente y se notificara a las autoridades competentes.

---

## 9. CONSERVACION DE REGISTROS

La Empresa conserva todos los registros de verificacion, transacciones y comunicaciones durante un periodo minimo de 5 anos despues del cierre de la cuenta o la ultima transaccion, conforme a las exigencias de la AOFA.

---

## 10. CAPACITACION DEL PERSONAL

Todo el personal de la Empresa recibe capacitacion periodica en materia de AML/CFT, incluyendo:

- Identificacion de actividades sospechosas.
- Procedimientos de escalamiento.
- Frases prohibidas en comunicaciones con clientes.
- Actualizaciones regulatorias.

---

## 11. OFICIAL DE COMPLIANCE

La Empresa designa un Oficial de Compliance responsable de:

- Supervisar el cumplimiento de esta politica.
- Revisar y aprobar verificaciones de alto riesgo.
- Presentar SARs a la AOFA.
- Coordinar con autoridades regulatorias.
- Dirigir la capacitacion del equipo en materia AML/CFT.

---

## 12. COOPERACION CON AUTORIDADES

La Empresa cooperara plenamente con solicitudes legitimas de informacion de autoridades regulatorias, judiciales o policiales, conforme a la legislacion aplicable.

---

**Neomaaa Ltd** | IBC 15968 | Licencia L15968/N | AOFA, Anjouan, Union of Comoros

*Ultima actualizacion: Abril 2026*
