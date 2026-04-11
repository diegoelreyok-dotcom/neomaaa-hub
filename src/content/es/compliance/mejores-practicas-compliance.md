# MEJORES PRACTICAS DE COMPLIANCE -- COMO LO HACEN LOS MEJORES BROKERS

**Documento interno -- CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Responsable: Susana (Compliance Officer)**
**Aprobado por: Principals**

---

## INDICE

1. [Por Que Estudiar a los Mejores](#1-por-que-estudiar-a-los-mejores)
2. [Exness -- Compliance Multi-Jurisdiccional a Escala](#2-exness----compliance-multi-jurisdiccional-a-escala)
3. [IC Markets -- Volumen Masivo con Compliance Robusto](#3-ic-markets----volumen-masivo-con-compliance-robusto)
4. [Pepperstone -- Estandar FCA/ASIC](#4-pepperstone----estandar-fcaasic)
5. [Stack Tecnologico de Compliance en la Industria](#5-stack-tecnologico-de-compliance-en-la-industria)
6. [Estandares de la Industria](#6-estandares-de-la-industria)
7. [Requisitos Especificos de AOFA vs Mejores Practicas](#7-requisitos-especificos-de-aofa-vs-mejores-practicas)
8. [Recomendaciones para NEOMAAA](#8-recomendaciones-para-neomaaa)
9. [Plan de Implementacion](#9-plan-de-implementacion)

---

## 1. POR QUE ESTUDIAR A LOS MEJORES

NEOMAAA opera hoy con licencia Anjouan, que tiene requisitos regulatorios menos estrictos que CySEC, FCA o ASIC. Sin embargo, hay dos razones poderosas para implementar compliance de nivel superior al minimo requerido:

1. **Preparacion para expansion:** Si NEOMAAA planea obtener licencias en Mauritius (FSC) o Seychelles (FSA), y eventualmente CySEC o FCA, necesita construir infraestructura de compliance escalable desde ahora. Retrofitting compliance es doloroso y caro.

2. **Reputacion y relaciones bancarias:** Los PSPs y bancos corresponsales evaluan el compliance del broker antes de trabajar con ellos. Un broker con compliance robusto, incluso con licencia offshore, obtiene mejores relaciones bancarias y mejores tasas.

3. **Proteccion del negocio:** Un framework de compliance solido protege a NEOMAAA de riesgos legales, reputacionales y operativos. Un solo incidente de compliance puede destruir un broker.

---

## 2. EXNESS -- COMPLIANCE MULTI-JURISDICCIONAL A ESCALA

### 2.1 Perfil

| Dato | Detalle |
|---|---|
| Fundacion | 2008 |
| Sede | Chipre (CySEC), con oficinas globales |
| Licencias | CySEC (Chipre), FCA (UK), FSA (Seychelles), FSCA (Sudafrica), FSC (Mauritius), FSC (BVI), CBCS (Curazao) |
| Clientes activos | 800,000+ (estimado) |
| Volumen mensual | $4+ trillion (2024) |
| Equipo de compliance | 100+ personas (estimado entre todas las jurisdicciones) |

### 2.2 Estructura de Compliance

Exness opera con un modelo de compliance por jurisdiccion:

- **Cada entidad regulada tiene su propio Compliance Officer (MLRO) dedicado.** No se comparte compliance entre jurisdicciones.
- **Politicas globales + adendas locales:** Tienen una politica AML global que se adapta con adendas especificas por jurisdiccion. Esto permite consistencia sin violar regulaciones locales.
- **Comite de Compliance:** Se reune mensualmente a nivel global para revisar riesgos, incidentes y cambios regulatorios.
- **Auditorias internas trimestrales** + auditorias externas anuales por cada jurisdiccion.

### 2.3 KYC y Onboarding

- **Verificacion en menos de 60 segundos** para la mayoria de clientes (Tier 1 equivalente). Usan automatizacion agresiva.
- **Tiers basados en jurisdiccion del cliente**, no solo en monto de deposito. Un cliente EU tiene requisitos diferentes que un cliente africano.
- **Liveness check obligatorio** para todos los niveles.
- **OCR + AI** para extraccion de datos de documentos.
- **Base de datos propia** para deteccion de duplicados entre entidades.

### 2.4 Screening

- **Screening propietario** complementado con bases de datos comerciales (World-Check, Dow Jones).
- **Screening en tiempo real:** Cada transaccion se escanea, no solo el onboarding.
- **Equipo dedicado de screening:** 15-20 analistas que solo hacen revision de matches.
- **False positive rate:** <5% despues de tuning de reglas durante anos.

### 2.5 Leccion para NEOMAAA

| Lo que NEOMAAA puede tomar de Exness | Cuando implementar |
|---|---|
| Politica AML con estructura modular (global + adendas) | Ahora -- preparar la estructura, incluso si hoy solo hay una jurisdiccion |
| Liveness check obligatorio en todos los tiers | Ya implementado con Sumsub |
| Deteccion de duplicados | Verificar que Sumsub lo tiene activado [VERIFICAR CON SUMSUB] |
| Comite de compliance mensual | Implementar como reunion mensual entre Susana y Principals |

---

## 3. IC MARKETS -- VOLUMEN MASIVO CON COMPLIANCE ROBUSTO

### 3.1 Perfil

| Dato | Detalle |
|---|---|
| Fundacion | 2007 |
| Sede | Sydney, Australia |
| Licencias | ASIC (Australia), CySEC (Chipre), FSA (Seychelles), SCB (Bahamas) |
| Clientes activos | 500,000+ |
| Volumen diario | $20+ billion |
| Enfoque | Raw spread trading, alto volumen |

### 3.2 Estructura de Compliance

- **Modelo centralizado con supervisores regionales.** Un MLRO global con compliance officers por jurisdiccion.
- **Sistema de compliance dedicado:** No usan spreadsheets. Tienen un sistema interno de case management para todas las decisiones de compliance.
- **Risk scoring automatizado:** Cada cliente recibe un score de riesgo basado en multiples factores (pais, profesion, deposito, patron de trading, edad, fuente de fondos). El score determina el nivel de monitoreo.

### 3.3 KYC y Onboarding

- **Tiers similares a NEOMAAA pero con umbrales diferentes** segun jurisdiccion.
- **Para ASIC (Australia):** KYC completo incluyendo TFN (Tax File Number) o equivalente desde el dia 1.
- **Para CySEC:** Cumple con la 6ta Directiva Anti-Lavado de la UE (6AMLD).
- **Para FSA (Seychelles):** Requisitos similares a los de NEOMAAA con AOFA.
- **Uso intensivo de Refinitiv World-Check** para screening de sanciones y PEPs.

### 3.4 Monitoreo de Transacciones

- **Sistema automatizado de monitoreo** que analiza:
  - Depositos y retiros por monto, frecuencia y patron.
  - Trading patterns (volumen anormal, trading a horas inusuales, spreads abusivos).
  - Relaciones entre cuentas (misma IP, misma tarjeta, misma direccion).
- **Alertas automaticas** que se clasifican por riesgo y se asignan a analistas.
- **Tasa de escalacion:** Aproximadamente 2% de alertas resultan en investigacion formal.

### 3.5 Leccion para NEOMAAA

| Lo que NEOMAAA puede tomar de IC Markets | Cuando implementar |
|---|---|
| Risk scoring por cliente | Fase 2 (cuando haya 500+ clientes). Hoy, manejar manualmente. |
| Monitoreo automatizado de transacciones | Fase 2. Hoy, monitoreo manual semanal por Susana. |
| Case management dedicado | Fase 3 (cuando spreadsheets se queden cortos, estimado 1,000+ clientes) |
| Deteccion de relaciones entre cuentas | Verificar que Sumsub tiene deteccion de duplicados [VERIFICAR CON SUMSUB] |

---

## 4. PEPPERSTONE -- ESTANDAR FCA/ASIC

### 4.1 Perfil

| Dato | Detalle |
|---|---|
| Fundacion | 2010 |
| Sede | Melbourne, Australia |
| Licencias | FCA (UK), ASIC (Australia), CySEC (Chipre), BaFin (Alemania), DFSA (Dubai), SCB (Bahamas), CMA (Kenya) |
| Clientes activos | 400,000+ |
| Enfoque | Retail y profesional, multi-regulado |

### 4.2 Estructura de Compliance

- **Estructura de "tres lineas de defensa":**
  - 1ra linea: Front office (ventas, soporte) -- identifican riesgos en su area.
  - 2da linea: Equipo de compliance -- monitorea, revisa, hace cumplir.
  - 3ra linea: Auditoria interna -- evalua la efectividad de las primeras dos lineas.
- **MLRO dedicado** para cada jurisdiccion regulada.
- **Compliance Committee** que reporta directamente al Board.
- **Cultura de compliance:** Todos los empleados reciben capacitacion AML trimestral, no solo compliance.

### 4.3 KYC Diferenciado por Regulador

| Aspecto | FCA (UK) | ASIC (Australia) | CySEC (Chipre) | BaFin (Alemania) |
|---|---|---|---|---|
| ID requerido | Pasaporte o ID gubernamental | Pasaporte, drivers license o Medicare card | Pasaporte o ID nacional | Personalausweis o pasaporte |
| PoA | Utility bill o bank statement (<3 meses) | Utility bill o bank statement (<3 meses) | Similar a FCA | Meldebescheinigung o similar |
| Evaluacion de idoneidad | Obligatoria (test de conocimiento) | Obligatoria (test de conocimiento) | Obligatoria | Obligatoria + riesgo profile |
| SoF threshold | GBP 10,000 | AUD 10,000 | EUR 15,000 | EUR 15,000 |
| EDD triggers | PEP, high risk country, high volume | PEP, high risk country | PEP, high risk country, complex structures | Todos los anteriores + regulacion BaFin |

### 4.4 Tecnologia de Compliance

- **ComplyAdvantage** para screening de sanciones en tiempo real.
- **Onfido** para verificacion de identidad (complemento a Sumsub en algunas jurisdicciones).
- **Sistema propio de case management** para gestionar decisiones de compliance.
- **Dashboards automatizados** para metricas de compliance en tiempo real.
- **API integrations** entre todos los sistemas (CRM, plataforma de trading, compliance).

### 4.5 Leccion para NEOMAAA

| Lo que NEOMAAA puede tomar de Pepperstone | Cuando implementar |
|---|---|
| Modelo de tres lineas de defensa | Adaptar a escala: ventas = 1ra linea, Susana = 2da, auditoria trimestral de Principals = 3ra |
| Capacitacion AML para TODOS los empleados | Ahora. Al menos induccion para todo el equipo. |
| Test de conocimiento/idoneidad para clientes | Fase 2. Cuando se expanda a jurisdicciones que lo requieran. |
| Dashboards automatizados | Fase 2. Hoy, Dashboard manual en Google Sheets es suficiente. |

---

## 5. STACK TECNOLOGICO DE COMPLIANCE EN LA INDUSTRIA

### 5.1 Proveedores Principales

| Categoria | Proveedor | Usado por | Costo Estimado (mensual) | Relevancia para NEOMAAA |
|---|---|---|---|---|
| **IDV + KYC** | Sumsub | NEOMAAA (actual), Exness, OKX, Bybit | $500-$5,000 (por volumen) | Ya implementado |
| **IDV + KYC** | Onfido | Pepperstone, Revolut | $1,000-$10,000 | Alternativa futura si se necesita |
| **Screening** | Refinitiv World-Check | IC Markets, muchos bancos | $5,000-$50,000/ano | Premium. Para expansion futura. |
| **Screening** | ComplyAdvantage | Pepperstone, startups fintech | $1,000-$5,000 | Buena alternativa si Sumsub no alcanza |
| **Screening** | LexisNexis Risk Solutions | Bancos tier 1, brokers grandes | $10,000+ | Overkill para el tamano actual |
| **Transaction Monitoring** | NICE Actimize | Bancos, brokers grandes | $20,000+ | Para fase avanzada |
| **Transaction Monitoring** | Chainalysis / Elliptic | Crypto exchanges, brokers con crypto | $5,000-$20,000 | Si NEOMAAA ofrece cripto depositos/retiros |
| **Case Management** | Hummingbird | Fintechs medianas | $2,000-$5,000 | Fase 2 (reemplazo de spreadsheets) |
| **CRM con compliance** | Skale CRM | NEOMAAA (actual) | Ya integrado | Ya implementado |

### 5.2 Stack Actual de NEOMAAA

| Funcion | Herramienta | Estado |
|---|---|---|
| KYC / IDV | Sumsub | Implementado |
| Screening de sanciones | Sumsub (incluido) | Implementado |
| PEP screening | Sumsub (incluido) | Implementado |
| CRM | Skale | Implementado |
| Plataforma de trading | MetaTrader 5 | Implementado |
| Registro de compliance | Google Sheets (pendiente de crear) | Por implementar |
| Monitoreo de transacciones | Manual (Susana) | Operativo pero basico |
| Case management | No hay (manual) | Pendiente (Fase 2) |
| Capacitacion | No sistematizado | Pendiente |

### 5.3 Stack Recomendado por Fase

**Fase 1 (Actual -- 0 a 500 clientes):**
- Sumsub (KYC + screening + ongoing monitoring)
- Skale CRM (gestion de clientes)
- Google Sheets (registro de compliance)
- Procesos manuales de Susana para monitoreo

**Fase 2 (500 a 2,000 clientes):**
- Todo lo de Fase 1
- Agregar: Sistema de case management (Hummingbird o similar)
- Agregar: Monitoreo semi-automatizado de transacciones (reglas en Skale o herramienta dedicada)
- Agregar: Dashboard automatizado de compliance
- Contratar: Segundo compliance analyst

**Fase 3 (2,000+ clientes o expansion a Mauritius/Seychelles):**
- Todo lo anterior
- Evaluar: Refinitiv World-Check como complemento de screening
- Implementar: Sistema de transaction monitoring dedicado
- Implementar: Programa de capacitacion formalizado con evaluaciones
- Contratar: Compliance team de 3-5 personas segun jurisdicciones

---

## 6. ESTANDARES DE LA INDUSTRIA

### 6.1 Tiempos de Respuesta

| Proceso | Estandar de la Industria (top brokers) | Meta NEOMAAA (inicio) | Meta NEOMAAA (maduro) |
|---|---|---|---|
| Verificacion KYC Tier 1 | <60 segundos (automatico) | <5 minutos | <60 segundos |
| Verificacion KYC Tier 2 | <4 horas | <24 horas | <4 horas |
| Verificacion KYC Tier 3 (EDD) | 1-3 dias habiles | 1-5 dias habiles | 1-3 dias habiles |
| Revision de sanctions hit | <4 horas | <24 horas (mismo dia para criticos) | <4 horas |
| Resolucion de false positive | <2 horas | <24 horas | <4 horas |
| Presentacion de SAR | Dentro de 24 horas de la decision | Dentro de 48 horas | Dentro de 24 horas |
| Re-verificacion periodica | Automatica con alertas | Manual con calendario | Automatica |

### 6.2 Documentacion

| Aspecto | Estandar de la Industria | Meta NEOMAAA (inicio) | Meta NEOMAAA (maduro) |
|---|---|---|---|
| Formato de registros | Sistema dedicado de compliance | Google Sheets estructurado | Sistema dedicado |
| Audit trail | Automatizado | Manual en hoja Audit_Trail | Automatizado |
| Retencion de registros | 5-10 anos segun tipo | 5-7 anos | 7-10 anos |
| Reportes al regulador | Automatizados desde el sistema | Manuales desde registros | Semi-automatizados |

### 6.3 Capacitacion

| Aspecto | Estandar de la Industria | Meta NEOMAAA |
|---|---|---|
| Capacitacion AML para compliance | Trimestral + continua | Trimestral |
| Capacitacion AML para todo el equipo | Anual minimo | Semestral |
| Induccion para nuevos empleados | Primer dia, antes de interactuar con clientes | Primer dia |
| Evaluacion post-capacitacion | Test de conocimiento obligatorio | Test basico (10 preguntas) |
| Certificaciones externas | ICA, ACAMS para compliance officers | Evaluar ACAMS para Susana [VERIFICAR CON ABOGADO si es requerido] |

### 6.4 Ratios de Personal

| Metrica | Estandar de la Industria | NEOMAAA Actual | Meta |
|---|---|---|---|
| Compliance staff por 1,000 clientes | 2-5 personas | 1 (Susana) | Adecuado hasta 500 clientes |
| Ratio analista:decisiones por dia | 30-50 decisiones manuales por analista | N/A (volumen bajo) | Monitorear |
| MLRO por jurisdiccion | 1 dedicado | 1 (Susana cubre todo) | 1 por jurisdiccion en expansion |

---

## 7. REQUISITOS ESPECIFICOS DE AOFA VS MEJORES PRACTICAS

### 7.1 Comparativa

| Requisito | AOFA (minimo requerido) | Mejores Practicas (FCA/ASIC/CySEC) | Recomendacion NEOMAAA |
|---|---|---|---|
| Politica AML escrita | Si | Si, con revision anual | Implementar con revision anual |
| KYC en onboarding | Si | Si, con tiers | Implementar tiers (ya definidos) |
| Screening de sanciones | Si | Si, con ongoing monitoring | Implementar con ongoing monitoring |
| Monitoreo de transacciones | Si (basico) | Si (automatizado) | Manual ahora, automatizado en Fase 2 |
| SARs al regulador | Si | Si, con plazos estrictos | Implementar proceso formal |
| Compliance Officer designado | Si | Si, con certificacion | Susana designada. Evaluar certificacion. |
| Capacitacion del equipo | Requerida (no especifica frecuencia) | Trimestral a anual | Semestral para todo el equipo |
| Reporte al regulador | Trimestral + anual | Similar, mas detallado | Cumplir AOFA, pero con detalle de industria |
| Evaluacion de riesgo | Requerida (basica) | Detallada, por cliente y por negocio | Implementar evaluacion por cliente (risk scoring manual) |
| Audit externo | Anual (estados financieros) | Anual (financiero + compliance) | Cumplir minimo, evaluar audit de compliance |
| Test de idoneidad del cliente | No requerido por AOFA [VERIFICAR CON ABOGADO] | Obligatorio en FCA/ASIC/CySEC | No implementar ahora, preparar para expansion |
| Proteccion de fondos del cliente | Segregacion basica [VERIFICAR CON ABOGADO] | Cuentas segregadas + ICF (Investor Compensation Fund) | Segregacion de fondos. Sin ICF en Anjouan. |
| Capital minimo | Segun licencia [VERIFICAR CON ABOGADO] | EUR 730,000 (CySEC), GBP 730,000 (FCA) | Cumplir AOFA. Planear capital para expansion. |

### 7.2 Donde NEOMAAA Debe Superar el Minimo de AOFA

| Area | Por que superar el minimo | Beneficio |
|---|---|---|
| Documentacion de decisiones | AOFA no especifica formato, pero ante auditoria es critico | Preparacion para auditorias y expansion |
| Ongoing monitoring de sanciones | Porque las listas se actualizan constantemente | Proteccion contra riesgo de sanciones |
| Capacitacion del equipo | AOFA no especifica frecuencia, pero ventas interactua con clientes | Reduccion de riesgo de incumplimiento accidental |
| Monitoreo de transacciones | AOFA pide basico, pero patrones sospechosos requieren atencion | Proteccion contra lavado y fraude |
| Evaluacion de riesgo por cliente | Permite decisiones mas informadas | Mejor gestion de riesgo |

---

## 8. RECOMENDACIONES PARA NEOMAAA

### 8.1 Acciones Inmediatas (Implementar Esta Semana)

| # | Accion | Responsable | Tiempo Estimado |
|---|---|---|---|
| 1 | Crear el Registro Maestro de Compliance (Google Sheets) segun la Guia Operativa | Susana | 4 horas |
| 2 | Verificar que Sumsub tiene activado ongoing monitoring | Susana | 1 hora [VERIFICAR CON SUMSUB] |
| 3 | Verificar que Sumsub tiene deteccion de duplicados activada | Susana | 1 hora [VERIFICAR CON SUMSUB] |
| 4 | Establecer los 3 checkpoints diarios (9:00, 13:00, 17:00) de revision | Susana | Inmediato |
| 5 | Crear carpeta de compliance en Google Drive con estructura definida | Susana | 1 hora |
| 6 | Realizar induccion AML basica para el equipo de ventas | Susana | 2 horas |

### 8.2 Acciones a Corto Plazo (Proximo Mes)

| # | Accion | Responsable | Tiempo Estimado |
|---|---|---|---|
| 7 | Implementar la reunion mensual de compliance (Susana + Principals) | Principals | Recurrente (1 hora/mes) |
| 8 | Preparar primer reporte trimestral a AOFA | Susana | 8 horas |
| 9 | Realizar capacitacion AML completa para TODO el equipo (18 personas) | Susana | 4 horas |
| 10 | Documentar los primeros 50 clientes en el Registro (retroactivo si ya hay clientes) | Susana | Variable |
| 11 | Revisar y confirmar con abogado todos los items marcados [VERIFICAR CON ABOGADO] | Principals | Variable |
| 12 | Confirmar con Sumsub todos los items marcados [VERIFICAR CON SUMSUB] | Susana | Variable |

### 8.3 Acciones a Mediano Plazo (Proximo Trimestre)

| # | Accion | Responsable |
|---|---|---|
| 13 | Evaluar certificacion ACAMS o ICA para Susana |  Principals |
| 14 | Implementar risk scoring manual por cliente (alto, medio, bajo) | Susana |
| 15 | Realizar primera auditoria interna de compliance (Principals revisan el trabajo de Susana) | Principals |
| 16 | Preparar evaluacion de riesgo anual del negocio | Susana + Principals |
| 17 | Evaluar necesidad de segundo compliance analyst segun volumen de clientes | Principals |

### 8.4 Acciones a Largo Plazo (6-12 Meses)

| # | Accion | Dependencia |
|---|---|---|
| 18 | Migrar de Google Sheets a sistema de case management | Volumen de clientes >500 |
| 19 | Implementar monitoreo automatizado de transacciones | Volumen de transacciones |
| 20 | Preparar compliance infrastructure para expansion regulatoria | Decision de expansion |
| 21 | Contratar auditoria externa de compliance | Preparacion para nueva licencia |
| 22 | Evaluar Refinitiv World-Check como complemento de Sumsub | Expansion a jurisdiccion tier 1 |

---

## 9. PLAN DE IMPLEMENTACION

### 9.1 Semana 1

| Dia | Tarea | Completado |
|---|---|---|
| Lunes | Crear Google Sheet de Registro Maestro. Configurar hojas y validaciones. | |
| Martes | Verificar configuracion de Sumsub (ongoing monitoring, duplicados, listas). | |
| Miercoles | Establecer rutina de checkpoints diarios (9:00, 13:00, 17:00). | |
| Jueves | Crear carpeta de compliance en Google Drive. Organizar documentos existentes. | |
| Viernes | Preparar material de induccion AML para el equipo. | |

### 9.2 Semana 2

| Dia | Tarea | Completado |
|---|---|---|
| Lunes | Induccion AML para equipo de ventas (Franco, Edward, Luis). | |
| Martes | Induccion AML para equipo de soporte. | |
| Miercoles | Comenzar a registrar clientes existentes retroactivamente (si aplica). | |
| Jueves | Continuar registro retroactivo. | |
| Viernes | Revisar que todos los procesos del KYC estan funcionando segun los documentos. | |

### 9.3 Semana 3

| Dia | Tarea | Completado |
|---|---|---|
| Lunes | Primera revision de Dashboard de compliance. Verificar metricas. | |
| Martes | Reconciliacion Sumsub-Skale-Registro. | |
| Miercoles | Preparar agenda para primera reunion mensual de compliance. | |
| Jueves | Revision de todos los items [VERIFICAR CON ABOGADO] -- compilar lista para consulta. | |
| Viernes | Revision de todos los items [VERIFICAR CON SUMSUB] -- compilar lista para Sumsub. | |

### 9.4 Semana 4

| Dia | Tarea | Completado |
|---|---|---|
| Lunes | Primera reunion mensual de compliance (Susana + Principals). | |
| Martes | Implementar ajustes resultantes de la reunion. | |
| Miercoles | Comenzar preparacion del primer reporte trimestral para AOFA. | |
| Jueves | Continuar reporte trimestral. | |
| Viernes | Revision general del mes. Evaluar que funciono y que necesita ajuste. | |

---

**FIN DEL DOCUMENTO**

*Ultima actualizacion: 8 de abril de 2026*
*Proxima revision programada: 8 de julio de 2026*
*Responsable: Susana (Compliance Officer)*
*Aprobado por: Principals*