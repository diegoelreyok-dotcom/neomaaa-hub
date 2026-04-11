# PROCESO KYC COMPLETO CON SUMSUB -- NEOMAAA MARKETS

**Documento interno -- CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

---

## INDICE

1. [Que es Sumsub y Como Funciona para un Broker](#1-que-es-sumsub-y-como-funciona-para-un-broker)
2. [Arquitectura del Flujo KYC](#2-arquitectura-del-flujo-kyc)
3. [Tiers de Verificacion por Nivel de Deposito](#3-tiers-de-verificacion-por-nivel-de-deposito)
4. [Tipos de Documentos Aceptados](#4-tipos-de-documentos-aceptados)
5. [Resultados de Sumsub y Acciones Requeridas](#5-resultados-de-sumsub-y-acciones-requeridas)
6. [Revision Manual -- Guia para Susana](#6-revision-manual----guia-para-susana)
7. [Enhanced Due Diligence (EDD)](#7-enhanced-due-diligence-edd)
8. [Integracion Sumsub-Skale CRM-MT5](#8-integracion-sumsub-skale-crm-mt5)
9. [Monitoreo Continuo y Re-Verificacion](#9-monitoreo-continuo-y-re-verificacion)
10. [SLAs y Metricas de Compliance](#10-slas-y-metricas-de-compliance)
11. [Problemas Comunes y Soluciones](#11-problemas-comunes-y-soluciones)
12. [Checklist Diario de Compliance](#12-checklist-diario-de-compliance)

---

## 1. QUE ES SUMSUB Y COMO FUNCIONA PARA UN BROKER

### 1.1 Vision General

Sumsub es una plataforma de verificacion de identidad (IDV) y cumplimiento regulatorio utilizada por mas de 2,000 empresas de servicios financieros a nivel mundial. Para NEOMAAA, Sumsub cumple tres funciones criticas:

1. **Verificacion de identidad (KYC):** Valida que el cliente es quien dice ser mediante documentos de identidad, liveness checks y cruce de datos.
2. **Screening de sanciones y PEPs:** Compara automaticamente a cada solicitante contra listas de sanciones internacionales (OFAC, ONU, UE, UK) y bases de datos de Personas Politicamente Expuestas.
3. **Monitoreo continuo:** Una vez aprobado, Sumsub puede realizar re-screening periodico para detectar si un cliente existente aparece en nuevas listas de sanciones.

### 1.2 Como Funciona el Flujo Basico

```
CLIENTE SE REGISTRA EN WEB NEOMAAA
         |
         v
SKALE CRM CREA PERFIL DE CLIENTE
         |
         v
SKALE REDIRIGE A SUMSUB SDK (widget embebido o link)
         |
         v
SUMSUB SOLICITA DOCUMENTOS SEGUN NIVEL CONFIGURADO
         |
         v
CLIENTE SUBE DOCUMENTOS + LIVENESS CHECK
         |
         v
SUMSUB PROCESA (IA + reglas configuradas)
         |
         v
SUMSUB ENVIA WEBHOOK A SKALE CON RESULTADO
         |
         v
SKALE ACTUALIZA ESTADO DEL CLIENTE
         |
         v
SI APROBADO -> CLIENTE PUEDE DEPOSITAR Y OPERAR EN MT5
SI RECHAZADO -> BLOQUEADO HASTA RESOLUCION
```

### 1.3 Componentes Clave de Sumsub

| Componente | Descripcion | Configuracion NEOMAAA |
|---|---|---|
| **Applicant Levels** | Niveles de verificacion configurables | 3 niveles (Tier 1, Tier 2, Tier 3) |
| **Verification Steps** | Pasos dentro de cada nivel | ID check, liveness, PoA, SoF |
| **Webhooks** | Notificaciones automaticas de resultados | Conectado a Skale CRM |
| **Dashboard** | Panel de administracion para revision manual | Acceso para Susana |
| **Sanctions Screening** | Screening automatico en cada verificacion | OFAC, ONU, UE, UK, PEP |
| **AML Screening** | Busqueda de media adversa | Activado |
| **Ongoing Monitoring** | Re-screening periodico | Cada 6 meses para Tier 3 [VERIFICAR CON SUMSUB] |

---

## 2. ARQUITECTURA DEL FLUJO KYC

### 2.1 Flujo Detallado Paso a Paso

**Paso 1: Registro del Cliente**
- Cliente completa formulario en la web de NEOMAAA.
- Datos minimos requeridos: nombre completo, email, telefono, pais de residencia, fecha de nacimiento.
- Skale CRM crea el perfil del cliente con estado "Pendiente KYC".

**Paso 2: Inicio de Verificacion**
- Skale CRM abre el widget de Sumsub (SDK embebido) o envia un link de verificacion por email.
- Sumsub detecta automaticamente que nivel de verificacion aplicar segun la configuracion.
- Para el registro inicial, todos los clientes pasan por Tier 1.

**Paso 3: Captura de Documentos**
- Sumsub guia al cliente paso a paso:
  - Subir documento de identidad (frente y dorso si aplica).
  - Realizar liveness check (video selfie en tiempo real).
  - Subir documentos adicionales segun el tier.

**Paso 4: Procesamiento Automatico**
- Sumsub aplica las siguientes verificaciones automaticas:
  - OCR (lectura optica del documento).
  - Cruce de datos: nombre en documento vs nombre registrado.
  - Deteccion de manipulacion de documentos.
  - Liveness check: verificacion de que es una persona real, no una foto.
  - Screening de sanciones y PEPs.
  - Verificacion de edad (mayor de 18 anos).
  - Verificacion de pais (no esta en lista restringida).

**Paso 5: Resultado**
- Sumsub emite un resultado y envia webhook a Skale.
- Tiempo promedio de procesamiento automatico: 30 segundos a 3 minutos.
- Si requiere revision manual: hasta 24 horas (SLA interno).

**Paso 6: Accion en Skale CRM**
- Skale actualiza el estado del cliente segun el webhook recibido.
- Si aprobado: cliente puede depositar y se le asigna cuenta MT5.
- Si rechazado o pendiente: cliente queda bloqueado con razon documentada.

### 2.2 Diagrama de Estados del Cliente en Skale

| Estado en Skale | Significado | Puede Depositar | Puede Operar |
|---|---|---|---|
| Pendiente KYC | Registro completado, KYC no iniciado | No | No |
| KYC en Proceso | Documentos enviados, Sumsub procesando | No | No |
| KYC Aprobado - Tier 1 | Verificacion basica completada | Si (hasta $1,000) | Si |
| KYC Aprobado - Tier 2 | PoA verificada | Si (hasta $15,000) | Si |
| KYC Aprobado - Tier 3 | SoF/SoW verificado | Si (sin limite) | Si |
| KYC Retry | Documentos rechazados, puede reintentar | No | No |
| KYC Rechazado | Rechazo final | No | No |
| Bloqueado - Sanciones | Match de sanciones confirmado | No | No |
| Revision EDD | Enhanced Due Diligence en curso | Deposito limitado [VERIFICAR CON ABOGADO] | Limitado |

---

## 3. TIERS DE VERIFICACION POR NIVEL DE DEPOSITO

### 3.1 Tier 1 -- Verificacion Basica (depositos hasta $1,000)

**Documentos requeridos:**
- Documento de identidad valido (pasaporte, DNI, licencia de conducir).
- Liveness check (selfie en video).

**Verificaciones que ejecuta Sumsub:**
- OCR y extraccion de datos del documento.
- Comparacion facial: selfie vs foto del documento.
- Deteccion de falsificacion del documento.
- Verificacion de vigencia del documento.
- Screening de sanciones (OFAC, ONU, UE, UK).
- Screening de PEPs.
- Verificacion de edad (18+).
- Verificacion de pais de emision vs pais declarado.

**Resultado esperado:** Aprobacion automatica en 1-3 minutos para la mayoria de los casos.

**Limite operativo:** El cliente puede depositar y operar hasta un total acumulado de $1,000 USD.

### 3.2 Tier 2 -- Verificacion Intermedia (depositos hasta $15,000)

**Se activa cuando:** El cliente quiere depositar mas de $1,000 acumulados, o el sistema detecta que se acerca al limite del Tier 1.

**Documentos adicionales requeridos:**
- Prueba de domicilio (Proof of Address - PoA):
  - Factura de servicios publicos (agua, luz, gas, internet) -- no mayor a 3 meses.
  - Estado de cuenta bancario -- no mayor a 3 meses.
  - Documento fiscal o gubernamental con domicilio.
  - Carta de un banco confirmando domicilio.

**Verificaciones adicionales:**
- Cruce de nombre en PoA vs nombre en documento de identidad.
- Verificacion de que la direccion coincide con el pais declarado.
- Verificacion de que el documento de PoA no esta manipulado.

**Resultado esperado:** Aprobacion en 5-15 minutos (automatico) o hasta 24 horas si requiere revision manual.

### 3.3 Tier 3 -- Verificacion Completa (depositos superiores a $15,000)

**Se activa cuando:** El cliente quiere depositar mas de $15,000 acumulados, o se detecta actividad inusual, o el cliente es PEP.

**Documentos adicionales requeridos:**
- Source of Funds (SoF) -- Origen de los fondos especificos:
  - Estado de cuenta bancario mostrando los fondos disponibles.
  - Comprobante de venta de activos.
  - Contrato laboral o recibos de sueldo recientes.
  - Certificacion de ingresos por contador.
  
- Source of Wealth (SoW) -- Origen del patrimonio general:
  - Declaracion patrimonial o fiscal.
  - Documentacion de herencia, venta de propiedad, o ganancias empresariales.
  - Carta explicativa firmada por el cliente detallando como acumulo su patrimonio.

**Verificaciones adicionales:**
- Susana revisa manualmente TODOS los casos de Tier 3.
- Se evalua coherencia entre ingresos declarados, patrimonio y volumen de deposito.
- Se documenta la evaluacion en el Registro de Compliance.

**Resultado esperado:** Aprobacion en 1-5 dias habiles. Susana revisa cada caso individualmente.

### 3.4 Tabla Resumen de Tiers

| Aspecto | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Deposito maximo acumulado | $1,000 | $15,000 | Sin limite |
| Documento de identidad | Si | Si | Si |
| Liveness check | Si | Si | Si |
| Prueba de domicilio | No | Si | Si |
| Source of Funds | No | No | Si |
| Source of Wealth | No | No | Si |
| Revision automatica | Si | Parcial | No (manual) |
| Tiempo de aprobacion | 1-3 min | 5 min - 24 hrs | 1-5 dias |
| Revision por Susana | Solo excepciones | Si (si Sumsub flaggea) | Siempre |

---

## 4. TIPOS DE DOCUMENTOS ACEPTADOS

### 4.1 Documentos de Identidad

| Tipo de Documento | Aceptado | Notas |
|---|---|---|
| Pasaporte | Si | Preferido. Aceptado de cualquier pais no restringido. |
| DNI / Cedula de Identidad | Si | Debe mostrar foto, nombre completo, fecha de nacimiento. |
| Licencia de Conducir | Si | Solo si incluye foto y fecha de nacimiento. |
| Tarjeta de Residencia | Si | Para extranjeros residentes en pais de registro. |
| ID Militar | Caso por caso | Solo si cumple requisitos minimos de datos. Revisar manualmente. |
| Tarjeta de Estudiante | No | No es documento oficial suficiente. |
| Documentos vencidos | No | Deben tener al menos 30 dias de vigencia restante. |

### 4.2 Prueba de Domicilio (PoA)

| Tipo de Documento | Aceptado | Antiguedad Maxima |
|---|---|---|
| Factura de servicios (agua, luz, gas, internet, telefono fijo) | Si | 3 meses |
| Estado de cuenta bancario | Si | 3 meses |
| Documento fiscal gubernamental | Si | 12 meses |
| Carta de banco confirmando domicilio | Si | 3 meses |
| Contrato de alquiler registrado | Caso por caso | 12 meses |
| Factura de telefono celular | No | -- |
| Factura de tarjeta de credito | Caso por caso | 3 meses. Solo si muestra domicilio completo. |
| Carta de empleador | No | No es fuente oficial. |

### 4.3 Source of Funds (SoF) y Source of Wealth (SoW)

| Tipo de Documento | Aplica a SoF | Aplica a SoW |
|---|---|---|
| Estado de cuenta bancario (3 ultimos meses) | Si | No |
| Recibos de nomina / sueldo | Si | Si |
| Contrato laboral vigente | Si | Si |
| Declaracion de impuestos | Si | Si |
| Escritura de venta de propiedad | Si | Si |
| Documentos de herencia | No | Si |
| Estado de cuenta de inversiones | Si | Si |
| Certificacion de contador publico | Si | Si |
| Carta explicativa firmada por el cliente | Si (complemento) | Si (complemento) |

**Nota importante:** Una carta explicativa sola NO es suficiente para SoF ni SoW. Siempre debe acompanarse de documentacion de respaldo verificable.

---

## 5. RESULTADOS DE SUMSUB Y ACCIONES REQUERIDAS

### 5.1 Resultado: GREEN (Aprobado)

**Que significa:** Sumsub ha verificado automaticamente la identidad del cliente. Todos los checks pasaron correctamente. No hay matches en sanciones ni PEPs.

**Accion requerida:**
1. Skale CRM actualiza automaticamente el estado a "KYC Aprobado - Tier X".
2. El cliente recibe notificacion automatica de que puede depositar.
3. Se habilita la cuenta MT5 para operacion.
4. No se requiere intervencion de Susana.

**Registro:** Sumsub guarda automaticamente toda la evidencia. Verificar que Skale refleja el estado correcto.

### 5.2 Resultado: RETRY (Reenvio de Documentos)

**Que significa:** Los documentos no pasaron la verificacion automatica, pero el problema es subsanable. Razones comunes:
- Foto borrosa o cortada.
- Documento ilegible.
- Documento vencido.
- Selfie no coincide con foto del documento (angulo malo, poca luz).
- Datos del documento no coinciden con datos del formulario (error de tipeo).

**Accion requerida:**
1. Sumsub notifica automaticamente al cliente que debe resubir documentos.
2. Skale CRM cambia estado a "KYC Retry".
3. El cliente tiene 7 dias para reenviar documentos.
4. Susana monitorea los casos en Retry que superen 48 horas sin respuesta del cliente.
5. Si el cliente falla el retry 3 veces, Susana revisa manualmente para determinar si es un caso de fraude o simplemente documentos deficientes.

**Registro:** Documentar en el log cada intento de retry con la razon del rechazo.

**Comunicacion al cliente (template):**
> Estimado [nombre], necesitamos que vuelvas a subir tu [tipo de documento]. El motivo es: [razon especifica]. Por favor asegurate de que la imagen sea nitida, el documento este completo y vigente. Puedes hacerlo desde [link].

### 5.3 Resultado: RED (Rechazado)

**Que significa:** La verificacion ha fallado de forma que Sumsub considera NO subsanable. Razones tipicas:
- Documento falsificado o manipulado.
- Cliente en lista de sanciones (match confirmado).
- Pais de emision del documento esta en lista restringida.
- Multiples intentos fallidos con documentos inconsistentes.
- Liveness check detecta suplantacion de identidad.

**Accion requerida:**
1. **NO es rechazo final automatico.** Susana DEBE revisar cada RED antes de confirmar el rechazo.
2. Susana accede al dashboard de Sumsub y revisa:
   - Razon especifica del rechazo.
   - Imagenes de los documentos.
   - Resultado del liveness check.
   - Resultado del screening de sanciones.
3. Si Susana confirma que el rechazo es correcto:
   - Confirmar rechazo en Sumsub.
   - Actualizar estado en Skale a "KYC Rechazado".
   - Documentar en el Registro de Compliance: fecha, cliente, razon, decision, evidencia.
   - Notificar al cliente con mensaje generico (NO revelar la razon especifica de compliance).
4. Si Susana determina que fue un error (falso positivo):
   - Puede aprobar manualmente en Sumsub.
   - Documentar la razon de la aprobacion manual.
   - Escalar a Principals si tiene dudas.

**Comunicacion al cliente (rechazo):**
> Estimado [nombre], lamentamos informarte que no hemos podido verificar tu identidad con la documentacion proporcionada. Si consideras que esto es un error, puedes contactarnos en [email de soporte] para explorar opciones adicionales.

**NUNCA decir al cliente:** "Estas en una lista de sanciones", "Tu documento parece falso", "Sospechamos de lavado de dinero". Esto es requisito regulatorio -- no se revela la razon especifica de un rechazo por compliance. [VERIFICAR CON ABOGADO]

### 5.4 Resultado: PENDING (Revision Manual Necesaria)

**Que significa:** Sumsub no pudo tomar una decision automatica. Necesita revision humana. Razones comunes:
- Screening de sanciones arrojo un posible match que no es concluyente.
- PEP match detectado.
- Documento de un pais con baja cobertura de OCR.
- Inconsistencia menor entre datos que podria ser error o fraude.
- Media adversa detectada.

**Accion requerida:**
1. Susana tiene un SLA de 24 horas para revisar todos los casos PENDING.
2. En el dashboard de Sumsub, revisar:
   - Que flag causo el estado PENDING.
   - Si es sanctions hit: seguir protocolo de Screening de Sanciones (documento separado).
   - Si es PEP match: seguir protocolo de EDD (seccion 7 de este documento).
   - Si es problema de documento: evaluar si es subsanable (cambiar a RETRY) o no.
3. Tomar decision:
   - Aprobar (con documentacion de la razon).
   - Solicitar mas documentos (cambiar a RETRY con instrucciones especificas).
   - Rechazar (con documentacion de la razon).
   - Escalar a Principals (si el caso es ambiguo o de alto riesgo).

**SLA critico:** Ningun caso PENDING puede quedar sin revision mas de 24 horas. Susana debe revisar el dashboard de Sumsub al menos 3 veces al dia (9:00, 13:00, 17:00 hora local).

### 5.5 Tabla Resumen de Resultados

| Resultado Sumsub | Accion Automatica | Requiere Susana | SLA | Estado en Skale |
|---|---|---|---|---|
| GREEN | Si, cuenta aprobada | No (salvo auditoria) | Inmediato | KYC Aprobado |
| RETRY | Si, solicitud de reenvio | Si, monitoreo a las 48h | 7 dias para cliente | KYC Retry |
| RED | No, espera revision | Si, obligatoria | 24 horas | Pendiente Decision |
| PENDING | No, espera revision | Si, obligatoria | 24 horas | Pendiente Decision |

---

## 6. REVISION MANUAL -- GUIA PARA SUSANA

### 6.1 Cuando Revisar Manualmente

Susana debe intervenir en los siguientes escenarios:

| Escenario | Prioridad | Accion |
|---|---|---|
| Resultado RED de Sumsub | Alta | Revisar en 24h. Confirmar o revertir. |
| Resultado PENDING de Sumsub | Alta | Revisar en 24h. Decidir. |
| Sanctions match (cualquier nivel) | Critica | Revisar inmediatamente. Mismo dia. |
| PEP match | Alta | Revisar en 24h. Iniciar EDD si procede. |
| Cliente en RETRY por mas de 48h | Media | Contactar al cliente o escalar a ventas. |
| Cliente en RETRY 3+ intentos | Alta | Evaluar posible fraude. |
| Deposito que empuja a cliente a nuevo Tier | Media | Verificar que documentos del nuevo tier estan completos. |
| Patron de transaccion inusual (alerta de Skale) | Alta | Revisar en 24h. Posible SAR. |
| Auditoria aleatoria (5% de aprobaciones automaticas) | Baja | Revision semanal. |

### 6.2 Proceso de Revision Manual en Sumsub

**Paso 1:** Acceder al dashboard de Sumsub (https://cockpit.sumsub.com) [VERIFICAR CON SUMSUB].

**Paso 2:** Navegar a la seccion de "Applicants" y filtrar por estado:
- "Pending" para revisiones pendientes.
- "Rejected" para rechazos que necesitan confirmacion.

**Paso 3:** Abrir el perfil del solicitante y revisar:
- **Datos personales:** Nombre, fecha de nacimiento, pais, coinciden con el formulario de registro.
- **Documento de identidad:** Imagen clara, no manipulada, vigente, datos legibles.
- **Liveness check:** Video muestra persona real que coincide con foto del documento.
- **Screening de sanciones:** Si hay match, evaluar si es true match o false positive (ver documento de Screening de Sanciones).
- **Screening PEP:** Si hay match, evaluar nivel de riesgo (ver seccion 7 EDD).
- **Proof of Address (si aplica):** Documento valido, direccion coincide, dentro del periodo aceptable.

**Paso 4:** Tomar decision y documentar:
- En Sumsub: marcar como "Approved" o "Rejected" con comentario.
- En el Registro de Compliance (spreadsheet): anotar fecha, ID del cliente, decision, razon, nombre del revisor.
- En Skale CRM: actualizar estado del cliente.

### 6.3 Criterios de Decision

**Aprobar si:**
- Documentos son claros y autenticos.
- Datos son consistentes entre formulario, documento e informacion de screening.
- No hay matches de sanciones (o todos los matches son falsos positivos documentados).
- PEP match evaluado y riesgo es aceptable con EDD.

**Solicitar retry si:**
- Documento es borroso pero parece autentico.
- Falta una pagina o cara del documento.
- PoA esta vencido por pocos dias (dar oportunidad de uno nuevo).
- Inconsistencia menor que podria ser error de tipeo.

**Rechazar si:**
- Documento claramente manipulado o falsificado.
- Match confirmado de sanciones.
- Pais restringido.
- Multiples intentos con documentos inconsistentes que sugieren fraude.
- Liveness check fallido repetidamente (posible suplantacion).

**Escalar a Principals si:**
- Match de sanciones ambiguo que no se puede resolver con informacion disponible.
- PEP de alto nivel (jefe de estado, ministro, familiar directo de los anteriores).
- Depositos propuestos superiores a $50,000.
- Cualquier situacion que Susana considere que excede su autoridad.

---

## 7. ENHANCED DUE DILIGENCE (EDD)

### 7.1 Que Activa un Proceso de EDD

Enhanced Due Diligence es un nivel adicional de verificacion que se aplica cuando existe un riesgo elevado. Se activa por:

| Trigger | Fuente de Deteccion | Respuesta |
|---|---|---|
| PEP match | Sumsub screening automatico | EDD obligatorio |
| Pais de alto riesgo (no restringido, pero con riesgo elevado) | Sumsub + politica interna | EDD obligatorio |
| Deposito acumulado superior a $15,000 | Skale CRM / manual | Upgrade a Tier 3 + EDD |
| Patron de transacciones inusual | Monitoreo de Skale + manual | EDD + posible SAR |
| Media adversa detectada | Sumsub screening | EDD obligatorio |
| Profesion de alto riesgo (casinos, cambio de divisas, joyerias, arte) | Formulario de registro + evaluacion | EDD recomendado |
| Estructura corporativa compleja (si se aceptan cuentas corporativas) | Manual | EDD obligatorio [VERIFICAR CON ABOGADO] |
| Origen de fondos no claro en Tier 3 | Revision manual de Susana | EDD ampliado |

### 7.2 Paises de Alto Riesgo (No Restringidos, pero con EDD Obligatorio)

Estos paises NO estan bloqueados, pero todo cliente de estos paises requiere EDD:

- Venezuela
- Nigeria
- Pakistan
- Turquia
- Rusia (situacion cambiante -- [VERIFICAR CON ABOGADO] periodicamante)
- Iran (normalmente restringido -- [VERIFICAR CON ABOGADO])
- Afganistan (normalmente restringido -- [VERIFICAR CON ABOGADO])
- Republica Democratica del Congo
- Somalia
- Yemen
- Libia
- Paises listados en GAFI como "jurisdicciones con deficiencias estrategicas"

[VERIFICAR CON ABOGADO] -- Esta lista debe actualizarse trimestralmente segun las publicaciones del GAFI (FATF).

### 7.3 Proceso de EDD Paso a Paso

**Paso 1: Recopilacion de Informacion Adicional**
- Solicitar al cliente cuestionario EDD:
  - Proposito de la cuenta (que tipo de trading, que instrumentos, horizonte temporal).
  - Fuente de fondos para depositos especificos.
  - Fuente de patrimonio general.
  - Actividad profesional detallada.
  - Volumen esperado de depositos y retiros mensuales.
- Solicitar documentacion de respaldo:
  - Todos los documentos de Tier 3 (SoF, SoW).
  - Documentacion adicional segun el trigger del EDD.

**Paso 2: Analisis**
- Susana evalua la coherencia de la informacion:
  - Los ingresos declarados son coherentes con los depositos?
  - La profesion declarada explica la fuente de fondos?
  - Hay banderas rojas en el patron de transacciones?
- Busqueda adicional en fuentes abiertas si es necesario:
  - Google del nombre del cliente.
  - Busqueda en registros publicos del pais del cliente.
  - Verificacion de la empresa donde dice trabajar (si aplica).

**Paso 3: Decision**
- **Aceptar con EDD aprobado:** Documentar analisis completo. Cliente puede operar con monitoreo reforzado.
- **Rechazar:** Documentar analisis y razon del rechazo.
- **Escalar a Principals:** Si el riesgo no es claro o el cliente tiene perfil de muy alto riesgo.

**Paso 4: Monitoreo Reforzado**
- Clientes con EDD aprobado tienen monitoreo trimestral (en vez de semestral).
- Cualquier cambio significativo en patron de transacciones dispara re-evaluacion.
- Documentar cada revision en el Registro de Compliance.

### 7.4 PEPs -- Protocolo Especifico

**Un PEP (Persona Politicamente Expuesta) NO se rechaza automaticamente.** La condicion de PEP por si sola no es razon para negar servicio. Lo que requiere es EDD reforzado.

**Niveles de PEP:**

| Nivel | Ejemplos | Riesgo | Accion |
|---|---|---|---|
| PEP de nivel 1 | Jefes de estado, ministros, legisladores nacionales, jueces de cortes supremas, generales | Muy alto | EDD completo + aprobacion de Principals obligatoria |
| PEP de nivel 2 | Funcionarios de nivel medio, gobernadores, alcaldes | Alto | EDD completo + Susana puede aprobar |
| PEP de nivel 3 | Familiares directos de PEPs de nivel 1 y 2 | Alto | EDD completo + Susana puede aprobar |
| PEP de nivel 4 | Asociados cercanos de PEPs | Medio-Alto | EDD estandar + Susana puede aprobar |
| Ex-PEP (hace mas de 12 meses) | Personas que dejaron el cargo | Medio | EDD estandar |

[VERIFICAR CON ABOGADO] -- Confirmar que AOFA no tiene requisitos adicionales especificos para PEPs.

---

## 8. INTEGRACION SUMSUB-SKALE CRM-MT5

### 8.1 Flujo Tecnico de Integracion

```
SUMSUB                    SKALE CRM                  MT5
  |                          |                        |
  |--- webhook: approved --->|                        |
  |                          |--- crea cuenta MT5 --->|
  |                          |--- email al cliente -->|
  |                          |                        |
  |--- webhook: rejected --->|                        |
  |                          |--- bloquea perfil ---->|
  |                          |--- notifica ventas --->|
  |                          |                        |
  |--- webhook: pending ---->|                        |
  |                          |--- marca revision ---->|
  |                          |--- notifica Susana --->|
```

### 8.2 Campos Clave en Skale CRM

| Campo en Skale | Fuente | Actualizacion |
|---|---|---|
| KYC Status | Sumsub webhook | Automatica |
| KYC Tier | Configuracion interna | Manual/Semi-automatica |
| Sanctions Check Result | Sumsub webhook | Automatica |
| PEP Status | Sumsub webhook | Automatica |
| Compliance Notes | Susana | Manual |
| Last KYC Review Date | Sumsub/Manual | Automatica/Manual |
| EDD Required | Reglas internas | Manual |
| EDD Status | Susana | Manual |
| Deposit Limit | Tier del cliente | Semi-automatica |

[VERIFICAR CON SUMSUB] -- Confirmar que todos estos campos estan mapeados correctamente en la integracion actual de Skale con Sumsub.

### 8.3 Webhooks de Sumsub -- Eventos a Monitorear

| Evento | Webhook | Accion en Skale |
|---|---|---|
| applicantReviewed (approved) | reviewResult.reviewAnswer = GREEN | Aprobar, habilitar deposito |
| applicantReviewed (rejected) | reviewResult.reviewAnswer = RED | Bloquear, notificar Susana |
| applicantPending | reviewResult.reviewAnswer = pending | Marcar para revision |
| applicantReset | applicant reset | Solicitar nuevos documentos |
| applicantOnHold | applicant on hold | Mantener en espera |

---

## 9. MONITOREO CONTINUO Y RE-VERIFICACION

### 9.1 Monitoreo Continuo

Una vez que un cliente esta aprobado, el compliance no termina. Se requiere monitoreo continuo en las siguientes areas:

**Monitoreo de Transacciones:**
- Depositos inusuales (montos significativamente mayores al historico del cliente).
- Depositos seguidos de retiros rapidos sin actividad de trading.
- Multiples depositos pequenos que sumados superan umbrales (structuring).
- Depositos desde cuentas de terceros.
- Cambios bruscos en patron de trading.

**Monitoreo de Sanciones (Ongoing Screening):**
- Sumsub puede configurarse para re-screening automatico periodico. [VERIFICAR CON SUMSUB] si esta activado y con que frecuencia.
- Si un cliente existente aparece en una nueva lista de sanciones, Sumsub notificara via webhook.
- Accion inmediata: congelar la cuenta, notificar a Susana, seguir protocolo de sanciones.

**Monitoreo de Cambios en Perfil del Cliente:**
- Cliente cambia de pais de residencia a uno de alto riesgo.
- Cliente actualiza informacion profesional a actividad de alto riesgo.
- Cliente solicita cambio de datos personales significativos.

### 9.2 Re-Verificacion Periodica

| Tipo de Cliente | Frecuencia de Re-Verificacion | Que Se Revisa |
|---|---|---|
| Tier 1 (bajo riesgo) | Cada 24 meses | Documento de identidad vigente, re-screening sanciones |
| Tier 2 (riesgo medio) | Cada 12 meses | ID vigente, PoA actualizado, re-screening sanciones |
| Tier 3 (alto valor) | Cada 12 meses | ID, PoA, SoF actualizado, re-screening sanciones |
| EDD activo | Cada 6 meses | Todo Tier 3 + re-evaluacion EDD completa |
| PEP | Cada 6 meses | Todo + verificacion de status PEP vigente |

[VERIFICAR CON ABOGADO] -- Confirmar que AOFA no exige frecuencias mas estrictas.

### 9.3 Proceso de Re-Verificacion

1. Susana o el sistema identifican que un cliente necesita re-verificacion.
2. Se envia notificacion al cliente solicitando documentos actualizados.
3. Cliente tiene 30 dias para completar la re-verificacion.
4. Si no completa en 30 dias:
   - Primer aviso: recordatorio por email.
   - Dia 30 sin respuesta: restriccion de nuevos depositos.
   - Dia 45 sin respuesta: restriccion de apertura de nuevas posiciones.
   - Dia 60 sin respuesta: cierre forzado de posiciones + retiro de fondos a cuenta de origen + cierre de cuenta.
5. Documentar todo el proceso en el Registro de Compliance.

[VERIFICAR CON ABOGADO] -- Validar los plazos de restriccion progresiva.

---

## 10. SLAs Y METRICAS DE COMPLIANCE

### 10.1 SLAs Internos

| Metrica | SLA | Medicion |
|---|---|---|
| Revision de casos PENDING | 24 horas | Desde que Sumsub marca PENDING |
| Revision de casos RED | 24 horas | Desde que Sumsub marca RED |
| Revision de sanctions hit | Mismo dia | Desde la notificacion |
| Respuesta a upgrade de Tier | 48 horas | Desde que cliente sube documentos |
| Revision de SAR potencial | 24 horas | Desde la deteccion |
| Re-verificacion periodica | Dentro del mes calendario | Antes del vencimiento |
| Auditoria aleatoria (5%) | Semanal | Cada lunes |

### 10.2 Metricas Clave (KPIs de Compliance)

| KPI | Meta | Frecuencia de Reporte |
|---|---|---|
| Tasa de aprobacion automatica (Tier 1) | >85% | Mensual |
| Tiempo promedio de verificacion (Tier 1) | <5 minutos | Mensual |
| Tiempo promedio de revision manual | <12 horas | Mensual |
| Casos PENDING sin resolver >24h | 0 | Diario |
| Tasa de rechazo | <10% | Mensual |
| Tasa de retry exitoso (cliente resubmite y pasa) | >70% | Mensual |
| Falsos positivos en sanciones | Documentados al 100% | Mensual |
| Re-verificaciones completadas a tiempo | >95% | Trimestral |
| SARs presentados | Segun ocurrencia | Trimestral |

---

## 11. PROBLEMAS COMUNES Y SOLUCIONES

### 11.1 Problemas del Lado del Cliente

| Problema | Causa | Solucion |
|---|---|---|
| "No me acepta mi documento" | Foto borrosa, formato no soportado, documento vencido | Soporte envia instrucciones claras: foto con buena luz, sin flash, documento completo |
| "El selfie no funciona" | Camara de baja calidad, mala iluminacion, VPN activa | Instrucciones: desactivar VPN, usar camara frontal, buena iluminacion, sin lentes |
| "Me rechazaron pero mi documento es real" | Falso positivo de Sumsub | Susana revisa manualmente y puede aprobar |
| "No tengo factura de servicios a mi nombre" | Vive con familiares, alquiler informal | Opciones alternativas: estado de cuenta bancario, carta del banco |
| "Cuanto tarda?" | Expectativa incorrecta | Respuesta: Tier 1 en minutos, Tier 2 en horas, Tier 3 en dias |

### 11.2 Problemas Tecnicos

| Problema | Causa | Solucion |
|---|---|---|
| Webhook de Sumsub no llega a Skale | Configuracion incorrecta o servicio caido | Verificar endpoints. [VERIFICAR CON SUMSUB] que webhooks esten activos. Monitorear logs. |
| Estado en Skale no coincide con Sumsub | Webhook fallido o no procesado | Reconciliacion manual diaria: comparar dashboard Sumsub con Skale |
| Sumsub no reconoce documento de pais X | Baja cobertura de OCR para ese pais | Revision manual por Susana. Reportar a Sumsub para mejorar cobertura. |
| Liveness check falla sistematicamente para ciertos dispositivos | Incompatibilidad de browser/dispositivo | Recomendar Chrome actualizado. Si persiste, permitir verificacion por video call [VERIFICAR CON SUMSUB]. |

### 11.3 Problemas de Compliance

| Problema | Causa | Solucion |
|---|---|---|
| Alto volumen de falsos positivos en sanciones | Nombres comunes que coinciden con listas | Documentar cada falso positivo. Ajustar sensibilidad en Sumsub si es posible [VERIFICAR CON SUMSUB]. |
| Cliente aprobado en Tier 1 deposita mas de $1,000 | Control de limites no implementado en Skale | Implementar limites duros en Skale CRM [VERIFICAR CON SUMSUB]. |
| Cliente rechazado intenta registrarse de nuevo | Mulitples cuentas | Sumsub tiene deteccion de duplicados. Verificar que este activo. |

---

## 12. CHECKLIST DIARIO DE COMPLIANCE

### 12.1 Revision Matutina (9:00)

- [ ] Acceder al dashboard de Sumsub.
- [ ] Revisar todos los casos en estado PENDING -- resolver o escalar.
- [ ] Revisar todos los casos en estado RED -- confirmar o revertir.
- [ ] Verificar que no hay alertas de sanciones nuevas.
- [ ] Revisar la cola de casos en RETRY que superen 48 horas.

### 12.2 Revision de Mediodia (13:00)

- [ ] Segundo pase de casos PENDING y RED nuevos.
- [ ] Revisar depositos del dia en Skale -- verificar que ningun cliente exceda su Tier sin documentacion.
- [ ] Verificar que los webhooks estan funcionando (comparar ultimos resultados de Sumsub con Skale).

### 12.3 Revision Vespertina (17:00)

- [ ] Tercer pase de casos PENDING y RED.
- [ ] Actualizar el Registro de Compliance con todas las decisiones del dia.
- [ ] Verificar SLAs: ningun caso PENDING puede pasar de 24 horas sin accion.
- [ ] Preparar resumen diario para Principals si hubo incidentes relevantes.

### 12.4 Revision Semanal (Lunes)

- [ ] Auditoria aleatoria: seleccionar 5% de aprobaciones automaticas de la semana anterior y revisarlas.
- [ ] Revisar metricas de la semana: tasa de aprobacion, tiempos, rechazos.
- [ ] Verificar re-verificaciones vencidas o proximas a vencer.
- [ ] Revisar clientes en EDD -- alguna actualizacion necesaria?
- [ ] Preparar reporte semanal de compliance para Principals.

### 12.5 Revision Mensual (Primer Lunes del Mes)

- [ ] Compilar KPIs del mes anterior.
- [ ] Revisar y actualizar listas de paises de alto riesgo si hubo cambios del GAFI.
- [ ] Verificar que todos los registros estan completos y al dia.
- [ ] Planificar capacitaciones del equipo si es necesario.
- [ ] Preparar insumos para reporte trimestral a AOFA (si aplica).

---

**FIN DEL DOCUMENTO**

*Ultima actualizacion: 8 de abril de 2026*
*Proximo revision programada: 8 de julio de 2026*
*Responsable: Susana (Compliance Officer)*
*Aprobado por: Principals*