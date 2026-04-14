# SCREENING DE SANCIONES -- PROTOCOLO INTERNO

**Documento interno -- CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

---

## INDICE

1. [Que es el Screening de Sanciones](#1-que-es-el-screening-de-sanciones)
2. [Listas de Sanciones que Verifica Sumsub](#2-listas-de-sanciones-que-verifica-sumsub)
3. [Tipos de Alertas: Sanciones, PEP, Media Adversa](#3-tipos-de-alertas-sanciones-pep-media-adversa)
4. [Arbol de Decisiones -- Que Hacer con Cada Resultado](#4-arbol-de-decisiones----que-hacer-con-cada-resultado)
5. [Protocolo de Match Verdadero (True Match)](#5-protocolo-de-match-verdadero-true-match)
6. [Protocolo de Falso Positivo (False Positive)](#6-protocolo-de-falso-positivo-false-positive)
7. [Protocolo PEP](#7-protocolo-pep)
8. [Protocolo de Media Adversa](#8-protocolo-de-media-adversa)
9. [Screening Continuo (Ongoing Monitoring)](#9-screening-continuo-ongoing-monitoring)
10. [Documentacion y Registro](#10-documentacion-y-registro)
11. [Escalamiento](#11-escalamiento)
12. [Como lo Hacen los Mejores Brokers](#12-como-lo-hacen-los-mejores-brokers)
13. [Checklist de Screening de Sanciones](#13-checklist-de-screening-de-sanciones)

---

## 1. QUE ES EL SCREENING DE SANCIONES

### 1.1 Definicion

El screening de sanciones es el proceso de verificar que un cliente (o potencial cliente) no aparece en listas de personas, entidades u organizaciones sujetas a sanciones internacionales. Es una obligacion legal para cualquier entidad financiera, incluyendo brokers de forex/CFDs.

### 1.2 Por Que es Critico

- **Obligacion legal:** Operar con personas sancionadas expone a NEOMAAA a sanciones regulatorias, multas y posible revocacion de licencia.
- **Riesgo reputacional:** Un solo caso de onboarding de persona sancionada puede destruir la reputacion del broker.
- **Riesgo penal:** En muchas jurisdicciones, facilitar transacciones a personas sancionadas es un delito penal para los directores y el compliance officer.
- **Requisito bancario:** Los bancos y PSPs que procesan pagos de NEOMAAA exigen que el broker tenga screening de sanciones robusto. Sin ello, perderemos relaciones bancarias.

### 1.3 Cuando Se Ejecuta

| Momento | Tipo de Screening | Responsable |
|---|---|---|
| Registro de nuevo cliente | Automatico (Sumsub) | Sistema |
| Upgrade de Tier (Tier 1 a 2, 2 a 3) | Automatico (Sumsub re-check) | Sistema |
| Deposito significativo (>$5,000 en una transaccion) | Manual o semi-automatico | Susana |
| Periodico (clientes existentes) | Automatico (Sumsub ongoing monitoring) | Sistema + Susana revisa alertas |
| Cuando hay sospecha o trigger de riesgo | Manual | Susana |
| Actualizacion de listas de sanciones (evento global) | Automatico re-scan de base completa | Sistema [VERIFICAR CON SUMSUB] |

---

## 2. LISTAS DE SANCIONES QUE VERIFICA SUMSUB

### 2.1 Listas Principales

| Lista | Emisor | Alcance | Relevancia para NEOMAAA |
|---|---|---|---|
| **OFAC SDN** | Departamento del Tesoro de EE.UU. | Personas, entidades y paises sujetos a sanciones de EE.UU. | Critica. Aunque no operamos en EE.UU., cualquier transaccion en USD o con nexo a EE.UU. esta sujeta a OFAC. |
| **ONU (UN Security Council)** | Naciones Unidas | Sanciones globales vinculantes para todos los estados miembros | Critica. Comoras es miembro de la ONU. |
| **UE (EU Sanctions List)** | Union Europea | Personas y entidades sancionadas por la UE | Alta. Muchos PSPs y bancos corresponsales aplican listas UE. |
| **UK (OFSI/HMT)** | Reino Unido | Sanciones del UK post-Brexit | Alta. Similar razon que UE. |
| **FATF High-Risk Jurisdictions** | GAFI | Paises con deficiencias AML | Media. No bloquea individuos, pero determina nivel de EDD. |

### 2.2 Bases de Datos Adicionales de Sumsub

| Base de Datos | Que Cubre |
|---|---|
| PEP databases | Personas Politicamente Expuestas de mas de 200 paises |
| Adverse media | Noticias y menciones negativas en medios sobre individuos |
| Watchlists de paises | Listas nacionales de sanciones (Rusia, China, etc.) |
| Interpol Red Notices | Personas buscadas internacionalmente |
| FBI Most Wanted | Lista de los mas buscados del FBI |
| Listas de terrorismo | Varias bases de datos de organizaciones terroristas designadas |

[VERIFICAR CON SUMSUB] -- Confirmar exactamente cuales bases de datos estan activadas en nuestro plan de Sumsub y si hay costo adicional por alguna.

### 2.3 Frecuencia de Actualizacion de Listas

Las listas de sanciones se actualizan constantemente. Sumsub actualiza su base de datos de la siguiente manera:

- **OFAC, ONU, UE, UK:** Actualizacion diaria o mas frecuente.
- **PEP databases:** Actualizacion semanal a mensual dependiendo del pais.
- **Adverse media:** Continua (monitoreo de medios en tiempo real).

[VERIFICAR CON SUMSUB] -- Confirmar la frecuencia exacta de actualizacion para nuestro plan.

---

## 3. TIPOS DE ALERTAS: SANCIONES, PEP, MEDIA ADVERSA

### 3.1 Alerta de Sanciones (Sanctions Hit)

**Que es:** El nombre, fecha de nacimiento, u otros datos del cliente coinciden con una entrada en una lista de sanciones.

**Gravedad:** CRITICA. Requiere accion inmediata.

**Tipos de match:**
- **Exact match:** Nombre completo y fecha de nacimiento coinciden exactamente con una entrada de la lista. Alta probabilidad de match verdadero.
- **Fuzzy match:** Nombre similar pero no identico (variaciones ortograficas, transliteraciones, nombres parciales). Requiere analisis para determinar si es match verdadero o falso positivo.
- **Partial match:** Solo parte de los datos coincide (nombre comun, mismo pais de origen). Generalmente falso positivo, pero requiere revision.

### 3.2 Alerta PEP (Politically Exposed Person)

**Que es:** El cliente (o un familiar/asociado cercano) ocupa o ha ocupado un cargo publico relevante.

**Gravedad:** ALTA, pero NO es razon para rechazo automatico.

**Tipos:**
- **PEP directo:** La persona misma ocupa/ocupo cargo publico.
- **RCA (Relative or Close Associate):** Familiar directo o asociado cercano de un PEP.
- **Ex-PEP:** Persona que dejo el cargo publico hace mas de 12 meses (riesgo reducido pero no eliminado).

### 3.3 Alerta de Media Adversa (Adverse Media)

**Que es:** Se encontraron menciones negativas del cliente en medios de comunicacion.

**Gravedad:** VARIABLE, depende del tipo de media adversa.

**Categorias:**
- **Financiera:** Fraude, lavado de dinero, evasion fiscal -- gravedad alta.
- **Violencia/Terrorismo:** Gravedad critica, tratar como potencial sancion.
- **Corrupcion:** Gravedad alta, tratar como potencial PEP.
- **Otro (delitos menores, disputas civiles):** Gravedad baja-media, evaluar caso por caso.

### 3.4 Tabla Comparativa de Alertas

| Caracteristica | Sanctions Hit | PEP Match | Adverse Media |
|---|---|---|---|
| Rechazo automatico | Si (si true match) | No | No |
| Requiere revision manual | Siempre | Siempre | Siempre |
| Puede abrirse cuenta | No (true match) | Si, con EDD | Depende de la evaluacion |
| SLA de revision | Mismo dia | 24 horas | 48 horas |
| Requiere reporte a AOFA | Si (true match) | No (salvo SAR) | No (salvo SAR) |
| Documentacion requerida | Completa, incluyendo analisis | Evaluacion EDD | Analisis de riesgo |
| Escalar a Principals | Si (siempre) | Si (PEP nivel 1) | Si (gravedad alta) |

---

## 4. ARBOL DE DECISIONES -- QUE HACER CON CADA RESULTADO

### 4.1 Screening Sin Alertas (Clean)

```
SCREENING EJECUTADO
     |
     v
SIN MATCHES EN SANCIONES, PEP NI MEDIA ADVERSA
     |
     v
RESULTADO: CLEAN
     |
     v
ACCION: Continuar con proceso KYC normal
     |
     v
REGISTRO: Sumsub guarda resultado automaticamente. No se requiere accion adicional.
```

### 4.2 Sanctions Hit

```
SCREENING EJECUTADO
     |
     v
MATCH EN LISTA DE SANCIONES DETECTADO
     |
     v
ACCION INMEDIATA: BLOQUEAR APERTURA DE CUENTA
NO PROCESAR DEPOSITOS. NO HABILITAR TRADING.
     |
     v
SUSANA REVISA EN SUMSUB DASHBOARD
     |
     +----> ES TRUE MATCH (nombres, fechas, pais, datos coinciden)
     |         |
     |         v
     |      RECHAZO DEFINITIVO
     |      - Bloquear cuenta permanentemente
     |      - Documentar analisis completo
     |      - Notificar a Principals (mismo dia)
     |      - Reportar a AOFA [VERIFICAR CON ABOGADO plazo exacto]
     |      - Retener documentacion minimo 5 anos
     |      - NO notificar al cliente la razon especifica
     |
     +----> ES FALSE POSITIVE (datos no coinciden realmente)
              |
              v
           DOCUMENTAR ANALISIS
           - Por que se concluyo que es falso positivo
           - Que datos se compararon
           - Fecha y responsable del analisis
              |
              v
           MARCAR COMO FALSE POSITIVE EN SUMSUB
              |
              v
           CONTINUAR CON PROCESO KYC NORMAL
```

### 4.3 PEP Match

```
SCREENING EJECUTADO
     |
     v
PEP MATCH DETECTADO
     |
     v
NO BLOQUEAR AUTOMATICAMENTE
     |
     v
SUSANA REVISA EN SUMSUB DASHBOARD
     |
     +----> PEP NIVEL 1 (jefe de estado, ministro, etc.)
     |         |
     |         v
     |      EDD COMPLETO + ESCALACION OBLIGATORIA A PRINCIPALS
     |      Principals deciden si aceptar o rechazar
     |
     +----> PEP NIVEL 2-4 O EX-PEP
              |
              v
           EDD ESTANDAR
           Susana evalua y decide
              |
              +----> APROBADO CON EDD
              |      - Documentar evaluacion completa
              |      - Monitoreo reforzado (trimestral)
              |      - Limites de deposito mas conservadores
              |
              +----> RECHAZADO
                     - Documentar razon
                     - Notificacion generica al cliente
```

### 4.4 Adverse Media

```
SCREENING EJECUTADO
     |
     v
MEDIA ADVERSA DETECTADA
     |
     v
SUSANA REVISA CONTENIDO DE LA MEDIA
     |
     +----> FINANCIERA (fraude, lavado, evasion)
     |         |
     |         v
     |      RIESGO ALTO -- Tratar similar a PEP nivel 1
     |      EDD completo + posible rechazo
     |
     +----> VIOLENCIA/TERRORISMO
     |         |
     |         v
     |      RIESGO CRITICO -- Tratar como potencial sanctions hit
     |      Bloquear hasta completar analisis
     |
     +----> CORRUPCION
     |         |
     |         v
     |      RIESGO ALTO -- EDD completo
     |
     +----> OTRO (delitos menores, disputas civiles)
              |
              v
           RIESGO BAJO-MEDIO -- Evaluar caso por caso
           Documentar y decidir
```

---

## 5. PROTOCOLO DE MATCH VERDADERO (TRUE MATCH)

### 5.1 Que es un True Match

Un true match ocurre cuando los datos del cliente coinciden de manera concluyente con una entrada en una lista de sanciones. Los factores que confirman un true match:

- Nombre completo identico o con variacion minima explicable (transliteracion, diferentes alfabetos).
- Fecha de nacimiento coincide.
- Pais de origen o nacionalidad coincide.
- Otros identificadores coinciden (numero de pasaporte si esta disponible en la lista).
- Foto disponible en la lista coincide con la del cliente.

### 5.2 Acciones Inmediatas (Mismo Dia)

1. **Bloquear cualquier apertura de cuenta.** Si la cuenta ya existe, congelar inmediatamente.
2. **No procesar depositos ni retiros.** Fondos quedan congelados.
3. **No ejecutar operaciones de trading.**
4. **Notificar a Principals** por el canal mas rapido disponible (llamada + email).
5. **Documentar todo** en el Registro de Compliance.

### 5.3 Acciones dentro de 24 Horas

1. **Preparar informe del incidente** que incluya:
   - Datos del cliente (nombre, fecha de nacimiento, nacionalidad, documentos presentados).
   - Lista de sanciones donde aparece el match.
   - Captura de pantalla del match en Sumsub.
   - Analisis de por que se concluye que es true match.
   - Cronologia: cuando se detecto, que acciones se tomaron.
2. **Notificar a AOFA** segun el procedimiento establecido. [VERIFICAR CON ABOGADO] -- Formato y canal de notificacion a AOFA. Plazo exacto.
3. **Consultar con abogado** sobre obligaciones adicionales (reportes a otras autoridades, manejo de fondos congelados).

### 5.4 Manejo de Fondos

- Si el cliente ya deposito fondos antes de que se detectara el match de sanciones: **los fondos quedan congelados.**
- NO devolver fondos al cliente sin autorizacion legal explicita. [VERIFICAR CON ABOGADO]
- Los fondos congelados deben manejarse segun las instrucciones de la autoridad competente.
- Documentar el monto congelado, la fecha de congelamiento y la razon.

### 5.5 Comunicacion

- **Al cliente:** NO revelar que la razon es un match de sanciones. Comunicar unicamente que "su cuenta ha sido restringida por razones de cumplimiento regulatorio" y que sera contactado si se requiere informacion adicional.
- **Al equipo interno:** Solo Susana y Principals deben conocer los detalles. El equipo de ventas y soporte recibe unicamente la instruccion de que la cuenta esta "bajo revision de compliance" y no deben dar mas informacion al cliente.
- **A AOFA:** Reporte completo segun formato requerido. [VERIFICAR CON ABOGADO]

---

## 6. PROTOCOLO DE FALSO POSITIVO (FALSE POSITIVE)

### 6.1 Que es un False Positive

Un false positive ocurre cuando el sistema de screening reporta un match, pero al analizar los datos en detalle se determina que el cliente NO es la persona que aparece en la lista de sanciones. Esto es comun, especialmente con:

- Nombres muy comunes (ej. "Mohammed Ali", "Juan Garcia").
- Nombres con transliteraciones multiples del arabe, chino, ruso, etc.
- Coincidencias parciales (mismo apellido pero diferente nombre).
- Homonimos (misma persona por nombre pero diferente persona en realidad).

### 6.2 Como Determinar que es False Positive

Susana debe comparar los siguientes datos entre el cliente y la entrada de la lista:

| Dato a Comparar | Coincide | No Coincide | Resultado |
|---|---|---|---|
| Nombre completo | Posible true match | Posible false positive | Seguir analizando |
| Fecha de nacimiento | Refuerza true match | Fuerte indicador de false positive | Si no coincide, probablemente FP |
| Pais de nacimiento/nacionalidad | Refuerza true match | Indicador de false positive | Evaluar |
| Numero de documento | Confirma true match | Indicador de false positive | Muy relevante |
| Foto (si disponible) | Confirma true match | Confirma false positive | Definitivo |
| Otros aliases en la lista | Evaluar | Evaluar | Complementario |

**Regla practica:** Si la fecha de nacimiento es diferente, en la gran mayoria de los casos es un false positive. Si nombre Y fecha coinciden, se requiere analisis mas profundo.

### 6.3 Documentacion Obligatoria para False Positives

Para CADA false positive, Susana debe documentar:

1. **Fecha del screening.**
2. **Datos del cliente:** Nombre completo, fecha de nacimiento, nacionalidad, numero de documento.
3. **Lista que genero el match:** OFAC, ONU, UE, UK, otra.
4. **Entrada de la lista que genero el match:** Nombre en la lista, datos disponibles.
5. **Analisis:** Por que se concluye que es false positive. Que datos no coinciden.
6. **Decision:** "False positive -- cliente aprobado para continuar proceso KYC."
7. **Responsable:** Nombre de quien hizo el analisis (Susana o, si fue escalado, Principals).
8. **Evidencia:** Capturas de pantalla de Sumsub mostrando el match y los datos comparados.

### 6.4 Accion en Sumsub

1. En el dashboard de Sumsub, abrir el perfil del solicitante.
2. Ir a la seccion de screening results.
3. Para el match en cuestion, seleccionar "Not a match" o "False positive" (segun la interfaz de Sumsub). [VERIFICAR CON SUMSUB] -- Confirmar la opcion exacta en la interfaz.
4. Agregar comentario con el resumen del analisis.
5. Guardar.
6. El estado del solicitante deberia actualizarse para permitir continuar el proceso KYC.

### 6.5 Riesgo Residual

Incluso despues de marcar un false positive, el cliente permanece en monitoreo continuo. Si en futuros re-screenings vuelve a generar match, se revisa nuevamente. No se asume automaticamente que sigue siendo false positive: las listas se actualizan y un homonimo puede dejar de serlo si se agregan datos a la lista.

---

## 7. PROTOCOLO PEP

### 7.1 Principio Fundamental

**La condicion de PEP no es razon para rechazar a un cliente.** Es razon para aplicar Enhanced Due Diligence (EDD). Rechazar automaticamente a todos los PEPs seria discriminatorio y contrario a las buenas practicas regulatorias.

Lo que cambia con un PEP:
- Se requiere EDD obligatorio.
- Se requiere aprobacion de nivel superior (Susana o Principals, segun nivel del PEP).
- Se aplica monitoreo reforzado.
- Se documentan mas extensivamente las razones de aceptacion.

### 7.2 Proceso de Evaluacion PEP

**Paso 1: Verificar que el PEP match es real**
- Similar al analisis de false positive para sanciones.
- Confirmar que el cliente es efectivamente la persona que aparece como PEP.
- Si es false positive (homonimo): documentar y continuar proceso normal.

**Paso 2: Clasificar el nivel de PEP**
- Nivel 1 (muy alto riesgo): Jefes de estado, ministros, legisladores nacionales, jueces supremos, directores de bancos centrales, embajadores, generales.
- Nivel 2 (alto riesgo): Gobernadores, alcaldes, funcionarios de nivel medio-alto, directores de empresas publicas.
- Nivel 3 (alto riesgo): Familiares directos de PEPs de nivel 1-2 (conyuges, hijos, padres).
- Nivel 4 (riesgo medio-alto): Asociados cercanos conocidos de PEPs.
- Ex-PEP: Persona que dejo el cargo hace mas de 12 meses.

**Paso 3: Ejecutar EDD segun nivel**

Para PEP Nivel 1:
- EDD completo (ver proceso en documento de KYC, seccion 7).
- Escalacion obligatoria a Principals.
- Principals deciden si aceptar o rechazar.
- Si se acepta: monitoreo trimestral, limites de deposito conservadores.

Para PEP Nivel 2-4 y Ex-PEP:
- EDD estandar.
- Susana puede aprobar sin escalar (salvo que identifique riesgos adicionales).
- Monitoreo semestral.

**Paso 4: Documentacion**
- Todo el analisis de PEP se documenta en el Registro de Compliance.
- Se incluye: nivel de PEP, cargo que ocupa/ocupo, pais, evaluacion de riesgo, decision, aprobador.

### 7.3 Tabla de Decisiones PEP

| Factor | Aumenta Riesgo | Disminuye Riesgo |
|---|---|---|
| Nivel del cargo | Cargo mas alto = mas riesgo | Cargo local/menor = menos riesgo |
| Pais del PEP | Pais con alta corrupcion = mas riesgo | Pais con buen gobierno = menos riesgo |
| Activo vs ex-PEP | PEP activo = mas riesgo | Ex-PEP (>12 meses) = menos riesgo |
| Fuente de fondos | Fondos no explicados = mas riesgo | Fondos claramente documentados = menos riesgo |
| Volumen esperado | Depositos altos = mas riesgo | Depositos moderados = menos riesgo |
| Actividad de trading | Patrones inusuales = mas riesgo | Trading consistente = menos riesgo |

---

## 8. PROTOCOLO DE MEDIA ADVERSA

### 8.1 Tipos de Media Adversa y Respuesta

| Tipo de Media | Accion | SLA |
|---|---|---|
| Lavado de dinero | Bloquear apertura hasta completar analisis. EDD obligatorio. Considerar rechazo. | 24 horas |
| Fraude financiero | Bloquear apertura hasta completar analisis. EDD obligatorio. | 24 horas |
| Evasion fiscal | EDD obligatorio. No bloquear automaticamente. | 48 horas |
| Terrorismo | Bloquear inmediatamente. Tratar como potencial sanctions hit. | Mismo dia |
| Corrupcion | EDD obligatorio. Evaluar si es PEP no detectado. | 48 horas |
| Trafico de drogas | Bloquear apertura hasta completar analisis. | 24 horas |
| Delitos violentos | Evaluar caso por caso. No necesariamente bloquear. | 48 horas |
| Disputas civiles/comerciales | No bloquear. Documentar. Monitoreo estandar. | 72 horas |
| Menciones en medios sin sustancia concreta | Documentar. Continuar proceso normal. | 72 horas |

### 8.2 Proceso de Evaluacion

1. **Leer las fuentes.** No confiar solo en el resumen de Sumsub. Acceder a las noticias originales.
2. **Evaluar la credibilidad de la fuente.** Un articulo en un medio reconocido (Reuters, Bloomberg, medios nacionales principales) tiene mas peso que un blog o medio desconocido.
3. **Evaluar la antiguedad.** Una noticia de hace 10 anos sobre una disputa comercial menor tiene poco peso. Una noticia reciente sobre lavado de dinero es critica.
4. **Verificar si hubo resolucion.** Si la persona fue acusada pero absuelta, el riesgo es menor (pero no cero).
5. **Documentar la evaluacion completa.**

---

## 9. SCREENING CONTINUO (ONGOING MONITORING)

### 9.1 Que es

El screening no es un evento unico al momento del onboarding. Es un proceso continuo. Razones:

- Las listas de sanciones se actualizan constantemente. Un cliente limpio hoy puede aparecer en una lista manana.
- La situacion politica de un cliente puede cambiar (se convierte en PEP).
- Pueden surgir noticias adversas sobre un cliente existente.

### 9.2 Como Funciona en Sumsub

Sumsub ofrece la funcionalidad de "Ongoing Monitoring" que:
- Re-escanea automaticamente la base de clientes aprobados contra actualizaciones de listas.
- Genera alertas cuando hay un nuevo match para un cliente existente.
- Envia webhook a Skale CRM con la alerta.

[VERIFICAR CON SUMSUB] -- Confirmar que Ongoing Monitoring esta activado en nuestro plan. Confirmar frecuencia de re-scan. Confirmar costo.

### 9.3 Protocolo Cuando un Cliente Existente Genera Alerta

**Alerta de sanciones para cliente existente:**
1. **Accion inmediata:** Congelar la cuenta. No permitir depositos, retiros ni trading.
2. Susana analiza el match (true match vs false positive).
3. Si true match:
   - Cuenta permanece congelada.
   - Fondos no se devuelven sin autorizacion legal.
   - Reportar a AOFA. [VERIFICAR CON ABOGADO]
   - Notificar a Principals.
4. Si false positive:
   - Documentar analisis.
   - Descongelar cuenta.
   - Notificar al cliente que la restriccion temporal fue levantada (sin dar detalles de compliance).

**Alerta PEP para cliente existente (cliente se convirtio en PEP):**
1. No congelar automaticamente.
2. Iniciar proceso de EDD.
3. Revisar actividad historica del cliente buscando patrones inusuales.
4. Si EDD es satisfactorio: cliente continua con monitoreo reforzado.
5. Si EDD revela problemas: considerar restriccion de cuenta.

**Alerta de media adversa para cliente existente:**
1. Evaluar gravedad segun protocolo de seccion 8.
2. Si gravedad alta: considerar restriccion temporal mientras se evalua.
3. Documentar y decidir.

### 9.4 Frecuencia de Re-Screening Manual

Ademas del screening automatico de Sumsub, Susana debe realizar:

| Tipo de Cliente | Frecuencia Manual | Accion |
|---|---|---|
| Top 20 clientes por volumen | Mensual | Re-screening manual en Sumsub + busqueda en Google |
| Clientes con EDD activo | Trimestral | Re-screening completo |
| Clientes PEP | Trimestral | Re-screening + verificacion de status PEP vigente |
| Muestra aleatoria (5% del total) | Mensual | Re-screening de control |

---

## 10. DOCUMENTACION Y REGISTRO

### 10.1 Que Documentar para CADA Screening

Sin excepcion, para cada screening de sanciones (sea limpio, con match, o con alerta), se debe documentar:

| Campo | Descripcion | Ejemplo |
|---|---|---|
| Fecha del screening | Fecha y hora exacta | 2026-04-08 09:15:00 |
| ID del cliente | Identificador unico en Skale CRM | NEOMAAA-2026-00142 |
| Nombre del cliente | Nombre completo | Juan Carlos Hernandez Lopez |
| Tipo de screening | Onboarding, upgrade de tier, periodico, por sospecha | Onboarding |
| Resultado | Clean, Sanctions Hit, PEP Match, Adverse Media | PEP Match |
| Detalles del match | Si aplica, que lista, que entrada | PEP - Gobernador de Salta, Argentina |
| Analisis | Evaluacion de Susana | True PEP match. Nivel 2. EDD iniciado. |
| Decision | Accion tomada | EDD aprobado. Cuenta abierta con monitoreo reforzado. |
| Responsable | Quien hizo el analisis y tomo la decision | Susana |
| Escalacion | Si se escalo a Principals, cuando y su decision | No requerida (PEP nivel 2) |
| Referencia en Sumsub | ID del applicant en Sumsub | SUB-ABC123456 |

### 10.2 Donde Documentar

- **Sumsub:** Contiene el registro automatico del screening y los comentarios manuales de Susana. Es la fuente primaria.
- **Registro de Compliance (spreadsheet):** Registro consolidado de todas las decisiones. Es el registro operativo del equipo.
- **Skale CRM:** Estado del cliente reflejado. Es la fuente operativa para ventas y soporte.

Los tres deben estar sincronizados. Si hay discrepancia, Sumsub es la fuente de verdad para datos de screening, y el Registro de Compliance es la fuente de verdad para decisiones.

### 10.3 Retencion de Registros

| Tipo de Registro | Retencion Minima | Formato |
|---|---|---|
| Screening results (clean) | 5 anos desde cierre de cuenta | Sumsub (automatico) + spreadsheet |
| Screening con match (cualquier tipo) | 7 anos desde cierre de cuenta | Sumsub + spreadsheet + archivo de evidencia |
| Analisis de false positive | 7 anos | Spreadsheet + capturas de pantalla |
| Analisis de true match | 10 anos | Todo lo anterior + correspondencia con regulador |
| Documentos del cliente | 5 anos desde cierre de cuenta | Sumsub (automatico) |

[VERIFICAR CON ABOGADO] -- Confirmar periodos de retencion especificos para AOFA.

---

## 11. ESCALAMIENTO

### 11.1 Cuando Susana Debe Escalar a Principals

| Situacion | Escalacion | Canal | SLA |
|---|---|---|---|
| True match de sanciones (confirmado) | Obligatoria | Llamada + email | Mismo dia |
| PEP nivel 1 | Obligatoria | Email + revision conjunta | 24 horas |
| Media adversa critica (terrorismo, lavado) | Obligatoria | Llamada + email | Mismo dia |
| Caso ambiguo que Susana no puede resolver | Recomendada | Email | 48 horas |
| Deposito de cliente PEP superior a $50,000 | Obligatoria | Email | Antes de procesar |
| Solicitud de cierre de cuenta por compliance | Obligatoria | Email | Antes de ejecutar |
| Cualquier comunicacion con AOFA sobre sanciones | Obligatoria | Email | Antes de enviar |

### 11.2 Cuando Susana Puede Decidir Sola

| Situacion | Condicion |
|---|---|
| False positive claro | Fecha de nacimiento diferente, datos claramente no coinciden |
| PEP nivel 2-4 con EDD satisfactorio | Sin banderas rojas adicionales |
| Media adversa de baja gravedad | Disputas civiles antiguas, sin relacion con finanzas |
| Re-screening periodico sin alertas | Proceso rutinario |
| Clientes en retry | Problemas tecnicos o de calidad de documentos |

### 11.3 Formato de Escalacion

Cuando Susana escala a Principals, el email debe contener:

```
ASUNTO: [URGENCIA] Escalacion Compliance - [Tipo: Sanciones/PEP/Media] - [Nombre del Cliente]

RESUMEN: [1-2 oraciones describiendo el caso]

DATOS DEL CLIENTE:
- Nombre: [nombre completo]
- ID en Skale: [ID]
- Pais: [pais]
- Tier: [tier actual]
- Deposito acumulado: [monto]

DETALLE DEL MATCH:
- Lista: [OFAC/ONU/UE/PEP/Media]
- Entrada: [datos de la lista]
- Tipo: [True match / Possible match / False positive probable]

ANALISIS DE SUSANA:
[Descripcion del analisis realizado]

RECOMENDACION:
[Que recomienda Susana: aceptar con EDD, rechazar, etc.]

DECISION REQUERIDA:
[Que necesita de Principals: aprobacion, rechazo, instruccion adicional]

ADJUNTOS:
- Captura de Sumsub
- Documentos del cliente (si relevante)
```

---

## 12. COMO LO HACEN LOS MEJORES BROKERS

### 12.1 Exness

- Utiliza un stack de compliance que incluye Sumsub para IDV y screening propietario para sanciones.
- Tiene equipos de compliance dedicados por jurisdiccion (CySEC, FCA, FSA, etc.).
- Aplica screening contra mas de 1,000 listas de sanciones y watchlists.
- Su proceso de false positive es altamente automatizado con reglas de matching avanzadas que reducen el volumen de revision manual.
- Tiempo de respuesta para sanctions hits: menos de 2 horas.

### 12.2 IC Markets

- Usa Refinitiv World-Check (ahora parte de LSEG) como fuente principal de screening.
- Proceso de PEP altamente estructurado con matrices de riesgo automatizadas.
- Re-screening de toda la base de clientes cada vez que se actualiza una lista.
- Compliance team de mas de 50 personas para 500,000+ clientes.
- Documentacion de false positives almacenada en sistema dedicado (no spreadsheets).

### 12.3 Pepperstone

- Usa ComplyAdvantage para screening de sanciones en tiempo real.
- Monitoring continuo con alertas automaticas y scoring de riesgo.
- Proceso de escalacion de 3 niveles: analista -> compliance officer -> MLRO (Money Laundering Reporting Officer).
- Auditorias externas semestrales de su proceso de screening.
- SLA de 4 horas para cualquier sanctions hit.

### 12.4 Leccion para NEOMAAA

Con Sumsub, NEOMAAA tiene acceso a una plataforma comparable a las que usan brokers medianos. La diferencia esta en:

1. **Disciplina de documentacion:** Los grandes brokers documentan CADA decision. NEOMAAA debe hacer lo mismo desde el dia uno.
2. **Velocidad de respuesta:** Un SLA de 24 horas para sanctions hits es aceptable para el tamano actual. Cuando crezcamos, debe bajar a 4 horas.
3. **Sistematizacion:** Eventualmente, los spreadsheets deben migrar a un sistema dedicado de case management. Para la etapa actual, los spreadsheets bien estructurados son suficientes.
4. **Capacitacion:** Los grandes brokers capacitan a su equipo de compliance trimestralmente. NEOMAAA debe implementar capacitacion al menos semestral.

---

## 12.5 LISTA CONSOLIDADA DE PAISES RESTRINGIDOS (GOLD SOURCE)

Esta lista es la **fuente de verdad operativa** para compliance, ventas y soporte. Es un superset (union) de las listas que aparecen en `compliance/manual-susana.md`, `legal/aml-kyc-policy.md` y `compliance/onboarding.md`. Ante cualquier discrepancia, esta es la lista vinculante.

### 12.5.1 Paises NO aceptados -- Sanciones internacionales

| Pais / region | Motivo |
|---|---|
| Cuba | Sanciones OFAC/ONU |
| Irak | Sanciones ONU/UE |
| Iran | Sanciones OFAC/ONU/UE completas |
| Corea del Norte | Sanciones ONU/OFAC completas |
| Myanmar (Birmania) | Sanciones ONU/UE/OFAC |
| Siria | Sanciones OFAC/UE |
| Sudan | Sanciones OFAC/UE |
| Crimea | Sanciones OFAC/UE (region ocupada) |
| Donetsk (region) | Sanciones OFAC/UE (region ocupada) |
| Luhansk (region) | Sanciones OFAC/UE (region ocupada) |

### 12.5.2 Paises NO aceptados -- Restricciones regulatorias

| Pais / region | Motivo |
|---|---|
| Estados Unidos (USA) | Requiere registro SEC/CFTC/NFA. Sin licencia US, no se atiende. |
| Canada | Requiere registro IIROC / provincial (OSC, BCSC, AMF). |
| Reino Unido (UK) | Requiere licencia FCA. |
| Espacio Economico Europeo (EEA) -- 30 paises | Requiere licencia MiFID II (CySEC, BaFin, etc.). Ver lista completa abajo. |
| Australia | Requiere licencia ASIC. |
| Japon | Requiere licencia FSA Japon. |
| Israel | Requiere licencia ISA. |

**Lista EEA (30 paises):** Austria, Belgica, Bulgaria, Chipre, Croacia, Dinamarca, Eslovaquia, Eslovenia, Espana, Estonia, Finlandia, Francia, Alemania, Grecia, Hungria, Irlanda, Islandia, Italia, Letonia, Liechtenstein, Lituania, Luxemburgo, Malta, Noruega, Paises Bajos, Polonia, Portugal, Republica Checa, Rumania, Suecia.

### 12.5.3 Paises con restricciones especiales (se acepta caso por caso, SIEMPRE con EDD)

Estos paises NO estan prohibidos, pero TODO cliente de estas jurisdicciones requiere EDD completo antes de aprobar cuenta. La decision final es de Susana; Principals deciden casos borderline.

- Venezuela (alta corrupcion, screening reforzado)
- Nigeria (GAFI, alta fraude/scam)
- Pakistan (GAFI gris historicamente)
- Bangladesh
- Turquia (GAFI gris, screening reforzado)
- Rusia (situacion geopolitica cambiante; caso por caso con aprobacion Principals y screening exhaustivo; [VERIFICAR CON ABOGADO] trimestralmente)
- Belarus (caso por caso; [VERIFICAR CON ABOGADO])
- Afganistan (evaluar si debe escalar a restringido; [VERIFICAR CON ABOGADO])
- Yemen
- Libia
- Somalia
- Republica Democratica del Congo
- Cualquier pais en lista gris o negra de GAFI (FATF) vigente (actualizar trimestralmente)

### 12.5.4 Criterio de rechazo

Un pais entra en la lista restringida si aparece como restringido en **cualquiera** de los siguientes:
- Sanciones OFAC/ONU/UE/UK vigentes.
- Jurisdicciones reguladas Tier 1 donde NEOMAAA no tiene licencia (USA, Canada, EEA, UK, Australia, Japon, Israel).
- Lista negra GAFI.

### 12.5.5 Excepciones y casos especiales

- **Doble nacionalidad:** Evaluar residencia ACTUAL. Si reside en pais NO restringido y puede probarlo con PoA valido, puede proceder. Documentar.
- **IP de pais restringido con documentos de pais permitido:** Investigar. Solicitar prueba de residencia actual. VPN no es razon suficiente para bloquear si la documentacion es valida.
- **Cliente con nacionalidad restringida pero residencia permitida:** Si tiene PoA de pais no restringido (contrato alquiler, factura servicios, cedula de residencia) de al menos 6 meses de antiguedad, puede proceder con EDD.

---

## 13. CHECKLIST DE SCREENING DE SANCIONES

### 13.1 Para Cada Nuevo Cliente

- [ ] Verificar que Sumsub ejecuto screening de sanciones automatico.
- [ ] Si hay match: seguir arbol de decisiones (seccion 4).
- [ ] Si es true match: ejecutar protocolo completo (seccion 5).
- [ ] Si es false positive: documentar analisis completo (seccion 6).
- [ ] Si es PEP: seguir protocolo PEP (seccion 7).
- [ ] Si es media adversa: evaluar y documentar (seccion 8).
- [ ] Registrar resultado en spreadsheet de compliance.
- [ ] Verificar que estado en Skale refleja la decision.

### 13.2 Revision Semanal

- [ ] Revisar alertas de ongoing monitoring de la semana.
- [ ] Verificar que no hay alertas sin resolver de mas de 24 horas.
- [ ] Ejecutar re-screening manual de top 20 clientes por volumen (mensual, dividido semanalmente).
- [ ] Actualizar registro de compliance con todas las decisiones de la semana.

### 13.3 Revision Mensual

- [ ] Compilar estadisticas: total de screenings, matches, false positives, true matches, PEPs.
- [ ] Verificar que la lista de paises de alto riesgo esta actualizada.
- [ ] Revisar que Sumsub tiene listas actualizadas. [VERIFICAR CON SUMSUB]
- [ ] Preparar seccion de sanciones para reporte trimestral a AOFA.

---

**FIN DEL DOCUMENTO**

*Ultima actualizacion: 8 de abril de 2026*
*Proxima revision programada: 8 de julio de 2026*
*Responsable: Susana (Compliance Officer)*
*Aprobado por: Principals*