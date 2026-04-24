# POLITICA A-BOOK / B-BOOK -- NEOMAAA MARKETS

**Documento interno -- CONFIDENCIAL**
**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**
**Responsable: Pepe (Head of Dealing)**
**Estado: BORRADOR PARA REVISION DE PEPE**

---

> **AVISO DE CONFIDENCIALIDAD:** Este documento es de uso exclusivo del Dealing Desk y los Principals de NEOMAAA Markets. Bajo NINGUNA circunstancia debe compartirse con el equipo de ventas, soporte, clientes, IBs o terceros. La divulgacion no autorizada constituye falta grave y causa de terminacion inmediata.

---

## INDICE

1. [Definiciones y Modelo de Ejecucion](#1-definiciones-y-modelo-de-ejecucion)
2. [Modelo Hibrido de NEOMAAA](#2-modelo-hibrido-de-neomaaa)
3. [Criterios de Enrutamiento de Ordenes](#3-criterios-de-enrutamiento-de-ordenes)
4. [Umbrales y Tablas de Clasificacion](#4-umbrales-y-tablas-de-clasificacion)
5. [Gestion de Riesgo y Limites de Exposicion](#5-gestion-de-riesgo-y-limites-de-exposicion)
6. [Manejo de Flujo Toxico](#6-manejo-de-flujo-toxico)
7. [Politica de Cobertura (Hedging)](#7-politica-de-cobertura-hedging)
8. [Relaciones con Proveedores de Liquidez](#8-relaciones-con-proveedores-de-liquidez)
9. [Monitoreo, Reportes y Alertas](#9-monitoreo-reportes-y-alertas)
10. [Escalamiento a Principals](#10-escalamiento-a-principals)
11. [Revision y Actualizacion del Documento](#11-revision-y-actualizacion-del-documento)

---

## 1. DEFINICIONES Y MODELO DE EJECUCION

### 1.1 A-Book (Straight Through Processing / STP)

En el modelo A-Book, las ordenes del cliente se enrutan directamente a un Proveedor de Liquidez (LP). NEOMAAA actua como intermediario puro:

- La orden del cliente se transmite al LP en tiempo real.
- NEOMAAA no toma posicion contraria al cliente.
- Los ingresos provienen exclusivamente del spread markup y/o comisiones por lote.
- El riesgo de mercado lo asume el LP, no NEOMAAA.
- El cliente recibe ejecucion a precios del mercado interbancario (con markup).

**Ventajas:** Cero riesgo de mercado para NEOMAAA. Alineacion total de intereses con el cliente.

**Desventajas:** Ingresos limitados al spread/comision. Dependencia de volumen.

### 1.2 B-Book (Internalizacion / Market Making)

En el modelo B-Book, NEOMAAA actua como contraparte de la orden del cliente:

- La orden se ejecuta internamente contra el libro de NEOMAAA.
- NEOMAAA toma la posicion opuesta al cliente.
- Los ingresos incluyen spread, comisiones Y el resultado neto de las posiciones internalizadas.
- El riesgo de mercado lo asume NEOMAAA.
- El cliente recibe ejecucion al precio cotizado por NEOMAAA (basado en feed de LPs).

**Ventajas:** Mayor rentabilidad por cliente. Control total de ejecucion.

**Desventajas:** Exposicion a riesgo de mercado. Requiere gestion activa de posiciones.

### 1.3 Modelo Hibrido (A/B Book)

NEOMAAA opera un modelo hibrido donde cada orden se clasifica y enruta segun criterios predefinidos. Algunas ordenes van al LP (A-Book) y otras se internalizan (B-Book). La decision de enrutamiento es automatica basada en reglas, con capacidad de override manual por parte de Pepe.

---

## 2. MODELO HIBRIDO DE NEOMAAA

### 2.1 Principios Operativos

1. **Rentabilidad sostenible:** El modelo debe generar ingresos predecibles sin exposicion catastrofica.
2. **Gestion de riesgo primero:** Nunca se sacrifica la estabilidad del libro por maximizar ganancia a corto plazo.
3. **Automatizacion con supervision:** Las reglas de enrutamiento son automaticas, pero Pepe tiene override total.
4. **Segregacion de informacion:** El equipo de ventas NO sabe si un cliente es A-Book o B-Book. Esta informacion es exclusiva del Dealing Desk.

### 2.2 Flujo de Decision de Enrutamiento

```
ORDEN DEL CLIENTE
       |
       v
[Motor de Reglas MT5/Bridge]
       |
       +---> Evalua perfil del cliente (clasificacion)
       +---> Evalua instrumento
       +---> Evalua tamano de la orden
       +---> Evalua condiciones de mercado
       |
       v
+------------------+     +------------------+
| CRITERIOS A-BOOK |     | CRITERIOS B-BOOK |
| - Profitable     |     | - Nuevo cliente  |
| - Trade grande   |     | - Perdedor neto  |
| - Flujo toxico   |     | - Trade pequeno  |
| - Institucional  |     | - Cent/Standard  |
+------------------+     +------------------+
       |                         |
       v                         v
   ENRUTAR A LP           INTERNALIZAR
       |                         |
       v                         v
  LP ejecuta             NEOMAAA contraparte
  (markup/comision)      (spread + P&L neto)
       |                         |
       +----------+--------------+
                  |
                  v
         [Monitoreo continuo]
         [Rebalanceo si necesario]
```

---

## 3. CRITERIOS DE ENRUTAMIENTO DE ORDENES

### 3.1 Por Tipo de Cuenta

| Tipo de Cuenta | Deposito Minimo | Enrutamiento Default | Justificacion |
|---|---|---|---|
| Cent | $5 | B-Book 100% | Trades micro, no justifica costo de LP |
| Standard | $50 | B-Book default, A-Book si cumple criterios | Volumen de clientes, rentabilidad por internalizacion |
| Raw | $500 | Hibrido (70% B / 30% A) [PEPE: DEFINIR RATIO] | Balance entre rentabilidad y riesgo |
| Institutional | $50,000 | A-Book 100% [PEPE: DEFINIR EXCEPCIONES] | Riesgo demasiado alto para internalizar |

### 3.2 Por Perfil de Rentabilidad del Cliente

La clasificacion se basa en el historial de trading del cliente medido en periodos de 30 dias:

| Clasificacion | Criterio | Enrutamiento |
|---|---|---|
| Nuevo (0-30 dias) | Sin historial suficiente | B-Book |
| Perdedor consistente | Win rate < 40% O P&L neto negativo 3 meses consecutivos | B-Book |
| Neutral | Win rate 40-55%, P&L fluctuante | B-Book con monitoreo |
| Rentable | Win rate > 55% O P&L neto positivo 3 meses consecutivos | Migracion progresiva a A-Book |
| Altamente rentable | Win rate > 65% O P&L > $5,000/mes consistente | A-Book obligatorio |
| Flujo toxico | Detectado por indicadores (ver seccion 6) | A-Book inmediato + alertas |

[PEPE: DEFINIR -- Confirmar los umbrales de win rate y P&L. Ajustar segun expectativa de la mezcla de clientes LATAM.]

### 3.3 Por Instrumento

| Categoria | Instrumentos | Enrutamiento Sugerido | Notas |
|---|---|---|---|
| Forex Majors | EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, NZD/USD, USD/CAD | Hibrido | Alta liquidez, spread competitivo con LPs |
| Forex Minors | EUR/GBP, EUR/JPY, GBP/JPY, etc. | B-Book preferente | Spread mas amplio, mayor margen |
| Forex Exotics | USD/MXN, USD/BRL, USD/TRY, USD/ZAR, etc. | B-Book [PEPE: DEFINIR] | Spread amplio pero riesgo de gaps |
| Oro (XAU/USD) | XAU/USD | Hibrido | Instrumento de alto volumen, requiere atencion especial |
| Plata (XAG/USD) | XAG/USD | B-Book preferente | Menor liquidez que oro |
| Indices | US30, US500, US100, GER40, UK100 | Hibrido | Volumen alto, correlacion con noticias |
| Crypto | BTC/USD, ETH/USD, etc. | B-Book preferente [PEPE: DEFINIR] | Alta volatilidad, spread amplio, gaps frecuentes |
| Acciones/ETFs | 1,500+ CFDs de acciones | B-Book 100% | Trades pequenos, costo de LP no justifica |
| Energia | Petroleo WTI, Brent, Gas Natural | B-Book con limites [PEPE: DEFINIR] | Volatilidad extrema en eventos |
| Futuros | Varios | [PEPE: DEFINIR COMPLETAMENTE] | Definir cuales se ofrecen y como se ejecutan |

### 3.4 Por Tamano de Orden

| Tamano de Orden (Lotes Estandar) | Enrutamiento |
|---|---|
| Micro (0.01 - 0.09) | B-Book 100% |
| Mini (0.10 - 0.99) | B-Book default |
| Estandar (1.00 - 4.99) | Hibrido (segun perfil) |
| Grande (5.00 - 19.99) | A-Book preferente |
| Muy grande (20.00+) | A-Book obligatorio |

[PEPE: DEFINIR -- Confirmar estos rangos. Considerar si el tamano relativo al equity de la cuenta tambien debe ser criterio.]

### 3.5 Por Condiciones de Mercado

| Condicion | Accion |
|---|---|
| Mercado normal | Reglas estandar de enrutamiento |
| Pre-noticias (NFP, FOMC, BCE, etc.) | [PEPE: DEFINIR] Opciones: migrar temporalmente a A-Book, ampliar spreads, limitar tamano |
| Alta volatilidad (VIX > 25) | [PEPE: DEFINIR] Aumentar porcentaje A-Book, reducir apalancamiento temporal |
| Gap de fin de semana | Cerrar exposicion B-Book pre-cierre viernes [PEPE: DEFINIR hora de corte] |
| Flash crash | Override manual de Pepe, todo a A-Book hasta estabilizar |

---

## 4. UMBRALES Y TABLAS DE CLASIFICACION

### 4.1 Clasificacion de Clientes (Score de Riesgo para Dealing)

Cada cliente recibe un score de 1-100 que determina el tratamiento:

| Factor | Peso | Metrica |
|---|---|---|
| Historial de P&L | 30% | Positivo = mayor score (mas riesgo para B-Book) |
| Win rate | 20% | Mayor win rate = mayor score |
| Tamano promedio de trade | 15% | Mayor tamano = mayor score |
| Frecuencia de trading | 10% | Mayor frecuencia = mayor score (scalpers) |
| Tiempo de retencion | 10% | Menor tiempo = mayor score (HFT/scalping) |
| Comportamiento en noticias | 10% | Trading agresivo en noticias = mayor score |
| Deposito total acumulado | 5% | Mayor deposito = mayor score |

| Rango de Score | Clasificacion | Enrutamiento |
|---|---|---|
| 0-25 | Bajo riesgo | B-Book completo |
| 26-50 | Riesgo moderado | B-Book con monitoreo |
| 51-70 | Riesgo elevado | Hibrido (50/50) [PEPE: DEFINIR RATIO] |
| 71-85 | Riesgo alto | A-Book predominante (80%+) |
| 86-100 | Flujo toxico | A-Book 100% + revision manual |

[PEPE: DEFINIR -- Validar pesos y rangos. Definir con que frecuencia se recalcula el score (sugerido: semanal).]

### 4.2 Limites de Exposicion por Instrumento (B-Book)

| Instrumento | Exposicion Maxima Neta B-Book (USD equiv.) | Alerta al 70% | Alerta al 90% |
|---|---|---|---|
| EUR/USD | [PEPE: DEFINIR] Sugerido: $500,000 | $350,000 | $450,000 |
| GBP/USD | [PEPE: DEFINIR] Sugerido: $400,000 | $280,000 | $360,000 |
| USD/JPY | [PEPE: DEFINIR] Sugerido: $400,000 | $280,000 | $360,000 |
| XAU/USD | [PEPE: DEFINIR] Sugerido: $300,000 | $210,000 | $270,000 |
| BTC/USD | [PEPE: DEFINIR] Sugerido: $200,000 | $140,000 | $180,000 |
| Indices (cada uno) | [PEPE: DEFINIR] Sugerido: $250,000 | $175,000 | $225,000 |
| Otros forex | [PEPE: DEFINIR] Sugerido: $200,000 | $140,000 | $180,000 |
| **EXPOSICION TOTAL AGREGADA** | **[PEPE: DEFINIR] Sugerido: $2,000,000** | **$1,400,000** | **$1,800,000** |

### 4.3 Limites de Exposicion por Cliente (B-Book)

| Tipo de Cuenta | Exposicion Maxima B-Book por Cliente |
|---|---|
| Cent | $500 |
| Standard | $5,000 [PEPE: DEFINIR] |
| Raw | $25,000 [PEPE: DEFINIR] |
| Institutional | N/A (siempre A-Book) |

---

## 5. GESTION DE RIESGO Y LIMITES DE EXPOSICION

### 5.1 Principios de Gestion de Riesgo

1. **Diversificacion natural:** La base de clientes LATAM tiende a ser diversificada en instrumentos y direcciones. El netting natural reduce la exposicion real.
2. **Limite de perdida diaria:** El Dealing Desk no debe exceder una perdida diaria de [PEPE: DEFINIR] en el libro B. Sugerido: $10,000 para fase inicial.
3. **Limite de perdida mensual:** No exceder [PEPE: DEFINIR]. Sugerido: $50,000 para fase inicial.
4. **Capital de reserva:** Mantener un buffer de capital de al menos [PEPE: DEFINIR]x la exposicion maxima agregada.

### 5.2 Metricas Diarias Obligatorias

Pepe debe revisar y documentar las siguientes metricas cada dia antes de las 10:00 AM (hora del servidor):

| Metrica | Frecuencia | Umbral de Alerta |
|---|---|---|
| P&L del libro B (dia anterior) | Diaria | Perdida > [PEPE: DEFINIR] |
| Exposicion neta por instrumento | Diaria | > 70% del limite |
| Exposicion neta agregada | Diaria | > 70% del limite total |
| Top 10 clientes por exposicion | Diaria | Cualquier cliente > 50% de su limite |
| Clientes con P&L positivo > $1,000 en el dia | Diaria | Revision de clasificacion |
| Ratio A-Book/B-Book del dia | Diaria | Desviacion > 15% del target |
| Volumen total por instrumento | Diaria | Picos inusuales |

### 5.3 Acciones por Nivel de Alerta

| Nivel | Condicion | Accion |
|---|---|---|
| Verde | Exposicion < 50% de limites, P&L dentro de rango | Operacion normal |
| Amarillo | Exposicion 50-70% de limites O perdida diaria > 50% del limite | Monitoreo cada 2 horas, considerar hedging parcial |
| Naranja | Exposicion 70-90% de limites O perdida diaria > 75% del limite | Hedging obligatorio de nuevas posiciones, notificar Principals |
| Rojo | Exposicion > 90% O perdida diaria alcanza limite | Todas las ordenes nuevas a A-Book, cerrar hedges, reunion de emergencia con Principals |

---

## 6. MANEJO DE FLUJO TOXICO

### 6.1 Definicion de Flujo Toxico

Flujo toxico se refiere a ordenes de clientes que consistentemente resultan en perdidas para el B-Book. Estas ordenes provienen de traders con ventaja informacional, estrategias de arbitraje, o patrones de trading que explotan latencia o ineficiencias.

### 6.2 Indicadores de Flujo Toxico

| Indicador | Descripcion | Umbral de Deteccion |
|---|---|---|
| Mark-to-Market favorable | El precio se mueve a favor del cliente dentro de los primeros segundos | > 70% de trades con MTM positivo a los 60 segundos |
| Latency arbitrage | El cliente ejecuta consistentemente en precios que cambian milisegundos despues | Patron detectado por bridge/plugin [PEPE: DEFINIR herramienta] |
| News trading agresivo | Ordenes masivas en los 30 segundos previos/posteriores a noticias | > 5 trades en ventana de noticias en un mes |
| Scalping de alta frecuencia | Trades con duracion < 60 segundos que son consistentemente rentables | > 50 trades/dia con duracion < 1 minuto y win rate > 60% |
| Correlacion con LP requotes | El cliente es rentable especificamente en momentos de spread amplio | Analisis manual requerido |
| P&L sostenido positivo | Rentabilidad consistente mes a mes | P&L positivo > $2,000/mes por 3 meses [PEPE: DEFINIR] |

### 6.3 Acciones ante Flujo Toxico Detectado

| Paso | Accion | Responsable |
|---|---|---|
| 1 | Deteccion automatica o manual del patron | Sistema / Pepe |
| 2 | Migracion inmediata de todas las ordenes del cliente a A-Book | Pepe |
| 3 | Documentar el caso: cliente, patron detectado, evidencia, fecha | Pepe |
| 4 | Revisar spread/comisiones aplicadas al cliente | Pepe |
| 5 | Evaluar si se ajustan condiciones de trading (spread, apalancamiento) | Pepe + Principals |
| 6 | Monitoreo continuo del cliente en A-Book | Pepe |
| 7 | Revision trimestral: puede reclasificarse si el patron cambia | Pepe |

**IMPORTANTE:** Bajo NINGUNA circunstancia se rechazaran ordenes o se cerraran cuentas de clientes por ser rentables. La unica accion es migrar a A-Book. El rechazo de ordenes o cierre de cuentas por rentabilidad es una practica que genera denuncias, resenas negativas y problemas regulatorios.

[PEPE: DEFINIR -- Herramientas especificas de deteccion de flujo toxico. Plugins de MT5 disponibles? Bridge con capacidad de analisis?]

---

## 7. POLITICA DE COBERTURA (HEDGING)

### 7.1 Cuando Se Realiza Hedging

| Escenario | Accion de Hedging |
|---|---|
| Exposicion neta por instrumento > 70% del limite | Hedge parcial para reducir a < 50% |
| Exposicion agregada > 70% del limite total | Hedge de las posiciones mas grandes |
| Pre-evento de alto impacto (NFP, FOMC, etc.) | Hedge de toda la exposicion B-Book o migracion temporal a A-Book |
| Cliente individual supera 50% de su limite B-Book | Hedge de la posicion de ese cliente |
| Perdida diaria supera 75% del limite | Hedge completo de toda posicion abierta B-Book |

### 7.2 Instrumentos de Hedging

[PEPE: DEFINIR -- Como se ejecutan los hedges? Opciones:]

| Metodo | Descripcion | Cuando Usar |
|---|---|---|
| LP directo | Abrir posicion opuesta con el LP primario | Hedging rapido, instrumentos liquidos |
| LP secundario | Abrir posicion con LP secundario | Si el LP primario no tiene capacidad |
| Cross-hedging | Usar instrumento correlacionado para cubrir | Instrumentos iliquidos (ej: cubrir NZD/USD con AUD/USD) |
| Netting interno | Compensar posiciones opuestas entre clientes B-Book | Siempre como primera opcion antes de hedge externo |

### 7.3 Proceso de Ejecucion de Hedge

1. **Netting automatico:** El sistema primero compensa posiciones opuestas dentro del libro B.
2. **Evaluacion de exposicion neta:** Solo la exposicion que no se compensa requiere decision.
3. **Decision de hedge:** Pepe evalua si la exposicion restante requiere cobertura externa.
4. **Ejecucion:** Se coloca la orden con el LP correspondiente.
5. **Documentacion:** Se registra el hedge en el log diario con: instrumento, tamano, LP, hora, razon.

[PEPE: DEFINIR -- Software/herramienta para tracking de hedges. Manual en spreadsheet? Plugin de MT5? Sistema separado?]

---

## 8. RELACIONES CON PROVEEDORES DE LIQUIDEZ

### 8.1 LPs Actuales

| LP | Instrumentos | Tipo de Conexion | Estado |
|---|---|---|---|
| [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] |
| [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] |
| [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] | [PEPE: COMPLETAR] |

### 8.2 Criterios de Seleccion de LP

| Criterio | Peso | Notas |
|---|---|---|
| Spreads competitivos | 25% | Comparar con feed de mercado |
| Velocidad de ejecucion | 20% | < 50ms ideal |
| Rechazo de ordenes (rejection rate) | 20% | < 1% aceptable |
| Slippage | 15% | Simetrico (positive y negative slippage) |
| Cobertura de instrumentos | 10% | Debe cubrir nuestros instrumentos principales |
| Estabilidad/uptime | 10% | > 99.9% uptime |

### 8.3 Monitoreo de LPs

- **Diario:** Verificar que el feed de precios es competitivo vs benchmarks.
- **Semanal:** Revisar estadisticas de ejecucion (fill rate, slippage, rejections).
- **Mensual:** Comparar costos totales de ejecucion entre LPs.
- **Trimestral:** Reunion con cada LP para negociar condiciones.

[PEPE: COMPLETAR -- Toda esta seccion requiere los datos reales de los LPs contratados o en negociacion.]

---

## 9. MONITOREO, REPORTES Y ALERTAS

### 9.1 Reportes Diarios (Generados por Pepe o Automatizados)

| Reporte | Contenido | Destinatario | Hora de Entrega |
|---|---|---|---|
| P&L Diario B-Book | P&L por instrumento, por cliente top 10, total | Pepe + Principals | 10:00 AM siguiente dia habil |
| Exposicion al Cierre | Posiciones abiertas B-Book, exposicion neta por instrumento | Pepe | Al cierre del mercado |
| Reporte de Ejecucion | Fill rate, slippage promedio, rejections, por LP | Pepe | 10:00 AM siguiente dia habil |
| Clientes Migrados A/B | Clientes que cambiaron de clasificacion en el dia | Pepe | Continuo (alertas) |

### 9.2 Reportes Semanales

| Reporte | Contenido | Destinatario |
|---|---|---|
| P&L Semanal Consolidado | P&L B-Book acumulado, tendencia, comparacion con semana anterior | Principals |
| Revision de Clasificacion | Clientes cuyo score cambio significativamente | Pepe |
| Analisis de Flujo | Porcentaje A-Book vs B-Book, margen bruto por tipo | Principals |

### 9.3 Reportes Mensuales

| Reporte | Contenido | Destinatario |
|---|---|---|
| P&L Mensual B-Book | P&L total, desglose por instrumento, comparacion MoM | Principals |
| Rentabilidad por Tipo de Cuenta | Revenue de A-Book (comisiones/spread) vs B-Book (P&L neto) | Principals |
| Revision de Limites | Evaluacion de si los limites actuales son adecuados | Pepe + Principals |
| Performance de LPs | Comparativo de costos y calidad de ejecucion | Pepe |

### 9.4 Sistema de Alertas en Tiempo Real

| Alerta | Condicion | Notificacion |
|---|---|---|
| Exposicion critica | > 90% de cualquier limite | Pepe: SMS + email inmediato |
| Perdida diaria excedida | P&L diario B-Book supera limite | Pepe + Principals: SMS + email |
| Cliente flujo toxico detectado | Score > 86 o patron de arbitraje | Pepe: alerta en dashboard |
| LP desconectado | Feed de precios interrumpido > 30 seg | Pepe: SMS + email inmediato |
| Orden inusualmente grande | > 20 lotes en cualquier instrumento | Pepe: alerta en dashboard |
| Pico de volatilidad | Movimiento > 2% en < 5 min en cualquier major | Pepe: alerta en dashboard |

[PEPE: DEFINIR -- Herramientas de monitoreo y alerta disponibles. Hay dashboard integrado en el bridge? Se necesita algo adicional?]

---

## 10. ESCALAMIENTO A PRINCIPALS

### 10.1 Situaciones que Requieren Escalamiento Inmediato

| Situacion | Tiempo de Escalamiento | Canal |
|---|---|---|
| Perdida diaria B-Book alcanza el limite | Inmediato | Llamada telefonica + mensaje |
| Perdida mensual B-Book alcanza 80% del limite | Inmediato | Llamada telefonica + mensaje |
| LP primario desconectado > 5 minutos | Inmediato | Mensaje + email |
| Deteccion de posible manipulacion de mercado por cliente | Dentro de 1 hora | Mensaje + reporte escrito |
| Solicitud de cuenta institucional > $100,000 | Antes de aceptar el cliente | Email con reporte |
| Cualquier incidencia tecnica que afecte ejecucion | Inmediato | Llamada telefonica |

### 10.2 Situaciones que Requieren Consulta (No Inmediatas)

| Situacion | Tiempo de Escalamiento | Canal |
|---|---|---|
| Propuesta de cambio de limites de exposicion | Siguiente reunion semanal | Email con propuesta |
| Reclasificacion de cliente institucional | Dentro de 48 horas | Email con justificacion |
| Cambio de LP o adicion de nuevo LP | Antes de implementar | Reunion dedicada |
| Actualizacion de reglas de enrutamiento | Antes de implementar | Reunion dedicada |
| Revision trimestral de la politica A/B Book | Trimestral (programada) | Reunion + documento |

### 10.3 Decision de Pepe vs Decision de Principals

| Ambito | Pepe Decide Solo | Requiere Aprobacion de Principals |
|---|---|---|
| Enrutamiento A/B de clientes individuales | Si | No |
| Hedging dentro de limites aprobados | Si | No |
| Cambio de limites de exposicion | No | Si |
| Suspension de trading de un instrumento | Temporal (< 1 hora): Si / Permanente: No | Si para permanente |
| Cambio de spreads/comisiones | No | Si |
| Cambio de LP | No | Si |
| Cambio de reglas de enrutamiento | No | Si |
| Override manual de ejecucion | Si (con documentacion) | No |

---

## 11. REVISION Y ACTUALIZACION DEL DOCUMENTO

### 11.1 Calendario de Revision

| Frecuencia | Tipo de Revision | Responsable |
|---|---|---|
| Semanal | Revision de umbrales y alertas (ajustes menores) | Pepe |
| Mensual | Revision de clasificacion de clientes y ratios A/B | Pepe |
| Trimestral | Revision completa de la politica | Pepe + Principals |
| Anual | Auditoria y actualizacion mayor | Pepe + Principals + Compliance |
| Ad hoc | Tras cualquier incidente significativo | Pepe + Principals |

### 11.2 Control de Versiones

| Version | Fecha | Cambios | Aprobado por |
|---|---|---|---|
| 1.0 (Borrador) | 8 de abril 2026 | Documento inicial para revision de Pepe | Pendiente |
| | | | |
| | | | |

---

## RESUMEN DE ITEMS PENDIENTES PARA PEPE

A continuacion se listan todos los puntos marcados como [PEPE: DEFINIR] o [PEPE: COMPLETAR] que requieren su input:

| # | Seccion | Item | Prioridad |
|---|---|---|---|
| 1 | 3.1 | Ratio B/A para cuenta Raw | Alta |
| 2 | 3.1 | Excepciones A-Book para Institucional | Alta |
| 3 | 3.2 | Umbrales de win rate y P&L para clasificacion | Alta |
| 4 | 3.3 | Enrutamiento definitivo para exoticos, crypto, energia, futuros | Alta |
| 5 | 3.4 | Confirmacion de rangos de tamano de orden | Media |
| 6 | 3.5 | Protocolo pre-noticias y alta volatilidad | Alta |
| 7 | 3.5 | Hora de corte para gaps de fin de semana | Alta |
| 8 | 4.1 | Validacion de pesos y rangos del score de riesgo | Alta |
| 9 | 4.1 | Frecuencia de recalculo del score | Media |
| 10 | 4.2 | Limites de exposicion por instrumento (todos) | Critica |
| 11 | 4.2 | Limite de exposicion total agregada | Critica |
| 12 | 5.1 | Limite de perdida diaria B-Book | Critica |
| 13 | 5.1 | Limite de perdida mensual B-Book | Critica |
| 14 | 5.1 | Capital de reserva requerido | Alta |
| 15 | 6.2 | Herramientas de deteccion de flujo toxico | Alta |
| 16 | 6.2 | Umbral de P&L sostenido positivo | Media |
| 17 | 7.2 | Metodos e instrumentos de hedging | Alta |
| 18 | 7.3 | Software para tracking de hedges | Media |
| 19 | 8.1 | Datos completos de LPs (toda la seccion) | Critica |
| 20 | 9.4 | Herramientas de monitoreo y alertas disponibles | Alta |

**Pepe: Favor revisar este documento completo, completar los campos marcados, y devolver a Principals para aprobacion final.**

---

*Documento generado el 8 de abril de 2026. Borrador v1.0 -- No implementar sin aprobacion de Pepe y Principals.*
