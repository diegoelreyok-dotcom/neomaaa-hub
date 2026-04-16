# NEOMAAA Broker - Esquema de Comisiones para Sales Agents
## Documento para revision y aprobacion de Diego (CEO)

**Version:** 1.0 - Propuesta Inicial
**Fecha:** 8 de abril 2026
**Agentes cubiertos:** Franco, Edward, Luis
**Salario base actual:** $1,000 USD/mes cada uno

---

## Resumen Ejecutivo

Este documento propone una estructura de comisiones en 3 fases para los agentes de ventas de NEOMAAA. El objetivo es:

1. **Motivar agresivamente en el lanzamiento** (meses 1-3) cuando no hay cartera de clientes
2. **Normalizar las comisiones** (meses 4-6) cuando ya hay una base de clientes generando volumen
3. **Estabilizar en un modelo sostenible** (mes 7+) alineado con el P&L del broker

**Compensacion total objetivo:**
- Agente promedio: $1,800 - $2,200/mes
- Buen desempeno: $2,500 - $3,200/mes
- Desempeno excepcional: $3,500 - $4,000/mes

---

## 1. Estructura de Comisiones Recomendada

### Decision clave: Comision fija por FTD vs. porcentaje del FTD

| Criterio | Fija por FTD ($) | % del monto FTD |
|----------|------------------|-----------------|
| Simplicidad | Muy facil de calcular | Requiere trackear monto exacto |
| Motivacion para FTDs grandes | No la hay - misma paga por $50 o $5,000 | Si - incentiva buscar clientes con mayor capital |
| Riesgo de gaming | Menor - no hay incentivo a inflar depositos | Mayor - podrian presionar a depositar mas |
| Alineacion con el negocio | Parcial - el broker gana mas de clientes grandes | Alta - recompensa lo que mas vale para el broker |
| Predecibilidad de costos | Alta - facil presupuestar | Variable - depende del mix de clientes |

**RECOMENDACION: Modelo hibrido**

Usar una **comision fija base por FTD** + un **bono escalonado por monto depositado**. Esto combina simplicidad con incentivo a buscar clientes de mayor valor.

---

### TIER 1: Meses 1-3 (Lanzamiento)

Comisiones agresivas para compensar que no hay cartera y la conversion sera baja mientras se construye confianza en el mercado.

#### A. Comision por FTD (First Time Deposit)

| Tipo de Cuenta | Deposito Minimo | Comision Fija por FTD | Bono Adicional si FTD > Umbral |
|----------------|-----------------|----------------------|-------------------------------|
| Cent | $5 | $5 | +$3 si FTD >= $20 |
| Standard | $50 | $15 | +$10 si FTD >= $200 |
| Raw | $500 | $40 | +$20 si FTD >= $1,000 |
| Institutional | $50,000 | $200 | Negociable caso por caso |

**Formula:**
```
Comision FTD = Comision Fija (segun tipo de cuenta) + Bono Adicional (si aplica)
```

**Ejemplo:**
- Franco consigue un cliente que abre cuenta Standard y deposita $300
- Comision = $15 (fija Standard) + $10 (bono porque $300 > $200) = **$25 por ese FTD**

#### B. Bono de Volumen Mensual (Depositos Totales de su Cartera)

Este bono se calcula sobre TODOS los depositos (FTDs + re-depositos) de los clientes asignados al agente durante el mes.

| Depositos Totales del Mes | Bono |
|---------------------------|------|
| $0 - $2,999 | $0 |
| $3,000 - $6,999 | $150 |
| $7,000 - $14,999 | $350 |
| $15,000 - $29,999 | $600 |
| $30,000+ | $900 |

**Formula:**
```
Bono Volumen = Tramo correspondiente segun depositos totales del mes
```

#### C. Bono de Equipo (Team Bonus)

Si los 3 agentes en conjunto superan un umbral de FTDs en el mes, TODOS reciben un bono adicional.

| Meta de Equipo (FTDs totales entre los 3) | Bono por Agente |
|-------------------------------------------|-----------------|
| 30+ FTDs | $100 cada uno |
| 50+ FTDs | $200 cada uno |
| 75+ FTDs | $350 cada uno |

**Logica:** Esto evita que un agente "robe" leads de otro. Si colaboran y todos ganan, todos cobran mas.

---

### TIER 2: Meses 4-6 (Normalizacion)

Los agentes ya tienen cartera. La comision por FTD baja pero el bono de volumen sube para premiar retencion.

#### A. Comision por FTD

| Tipo de Cuenta | Comision Fija por FTD | Bono Adicional si FTD > Umbral |
|----------------|----------------------|-------------------------------|
| Cent | $3 | +$2 si FTD >= $20 |
| Standard | $10 | +$8 si FTD >= $200 |
| Raw | $30 | +$15 si FTD >= $1,000 |
| Institutional | $150 | Negociable |

#### B. Bono de Volumen Mensual

| Depositos Totales del Mes | Bono |
|---------------------------|------|
| $0 - $4,999 | $0 |
| $5,000 - $9,999 | $200 |
| $10,000 - $24,999 | $450 |
| $25,000 - $49,999 | $750 |
| $50,000+ | $1,100 |

*Nota: los umbrales suben pero los montos del bono tambien. Esto refleja que con cartera creciente, los re-depositos deberian aumentar.*

#### C. Bono de Equipo

| Meta de Equipo | Bono por Agente |
|----------------|-----------------|
| 40+ FTDs | $100 cada uno |
| 60+ FTDs | $200 cada uno |
| 90+ FTDs | $300 cada uno |

---

### TIER 3: Mes 7+ (Modelo Sostenible)

Estructura estable a largo plazo. Los agentes ganan mas de su cartera existente que de nuevos FTDs.

#### A. Comision por FTD

| Tipo de Cuenta | Comision Fija por FTD | Bono Adicional si FTD > Umbral |
|----------------|----------------------|-------------------------------|
| Cent | $2 | +$2 si FTD >= $30 |
| Standard | $8 | +$7 si FTD >= $250 |
| Raw | $25 | +$15 si FTD >= $1,500 |
| Institutional | $125 | Negociable |

#### B. Bono de Volumen Mensual

| Depositos Totales del Mes | Bono |
|---------------------------|------|
| $0 - $7,499 | $0 |
| $7,500 - $14,999 | $200 |
| $15,000 - $34,999 | $500 |
| $35,000 - $69,999 | $850 |
| $70,000+ | $1,200 |

#### C. Bono de Equipo

| Meta de Equipo | Bono por Agente |
|----------------|-----------------|
| 50+ FTDs | $100 cada uno |
| 80+ FTDs | $200 cada uno |
| 120+ FTDs | $350 cada uno |

#### D. Bono de Retencion (Solo Tier 3)

A partir del mes 7, se agrega un bono por retencion de clientes activos:

| Clientes Activos* del Agente | Bono Mensual |
|------------------------------|-------------|
| 20-39 clientes activos | $100 |
| 40-69 clientes activos | $250 |
| 70+ clientes activos | $400 |

*\*Cliente activo = al menos 1 trade en los ultimos 30 dias.*

---

## 2. Detalle: Comision por FTD - Formulas y Ejemplos

### Formula General

```
Comision FTD por cliente = Comision Fija (tabla segun tipo cuenta y tier) 
                         + Bono Adicional (si deposito > umbral)
                         
Comision FTD mensual total = Suma de todas las comisiones FTD del mes
```

### Ejemplo Detallado - Tier 1 (Lanzamiento)

Edward consigue estos FTDs en un mes:

| # | Tipo Cuenta | Monto FTD | Comision Fija | Bono Adicional | Total |
|---|-------------|-----------|---------------|----------------|-------|
| 1 | Cent | $10 | $5 | $0 (< $20) | $5 |
| 2 | Standard | $100 | $15 | $0 (< $200) | $15 |
| 3 | Standard | $300 | $15 | $10 (>= $200) | $25 |
| 4 | Standard | $500 | $15 | $10 (>= $200) | $25 |
| 5 | Raw | $700 | $40 | $0 (< $1,000) | $40 |
| 6 | Standard | $200 | $15 | $10 (>= $200) | $25 |
| 7 | Cent | $25 | $5 | $3 (>= $20) | $8 |
| 8 | Standard | $150 | $15 | $0 (< $200) | $15 |
| 9 | Raw | $1,500 | $40 | $20 (>= $1,000) | $60 |
| 10 | Standard | $250 | $15 | $10 (>= $200) | $25 |
| **Total** | | **$3,735** | | | **$243** |

**Comision FTD total de Edward en el mes: $243**

---

## 3. Bono de Volumen - Detalle

### Por que es importante

El ingreso del broker no viene del FTD en si, viene de que el cliente **opere**. Un cliente que deposita $500 y tradea 50 lotes genera mucho mas ingreso que uno que deposita $2,000 y no opera. Pero para que opere, primero necesita tener saldo. Los re-depositos son la señal de que el cliente esta activo y confiando en el broker.

### Formula

```
Depositos Totales del Mes = Suma de TODOS los depositos de clientes asignados al agente
                           (incluye FTDs + re-depositos)

Bono Volumen = Valor del tramo correspondiente en la tabla del Tier activo
```

### Que cuenta como deposito

- FTDs de clientes nuevos (cuentan para FTD Y para volumen)
- Re-depositos de clientes existentes
- Depositos en cualquier metodo de pago aceptado
- **NO cuenta:** transferencias internas entre cuentas del mismo cliente
- **NO cuenta:** bonus/creditos otorgados por el broker

### Ejemplo - Tier 1

Luis tiene 15 clientes asignados. En el mes:
- 6 clientes nuevos depositan en total: $2,800 (FTDs)
- 9 clientes existentes re-depositan en total: $4,500

**Depositos totales = $2,800 + $4,500 = $7,300**

Segun tabla Tier 1: $7,000 - $14,999 = **Bono de $350**

---

## 4. Bono de Equipo - Detalle

### Mecanica

- Se calcula al cierre del mes
- Se cuentan los FTDs totales de los 3 agentes combinados
- Si se alcanza la meta, TODOS reciben el bono (no solo el que mas trajo)
- Se aplica el bono del tramo mas alto alcanzado (no es acumulativo)

### Por que funciona

En la industria de brokers, es comun que los agentes "roben" leads entre si o saboteen al equipo para quedar mejor. El team bonus crea incentivo para:

1. **Compartir tacticas** que funcionan
2. **Ayudar al compañero** que esta bajo en su cuota
3. **No pelear por leads** - si un lead llega sin asignar, lo toma quien pueda cerrarlo, no quien "lo vio primero"
4. **Celebrar logros colectivos** - cultura de equipo desde el dia 1

### Ejemplo - Tier 1

Resultados del mes:
- Franco: 18 FTDs
- Edward: 12 FTDs
- Luis: 22 FTDs
- **Total equipo: 52 FTDs**

Meta alcanzada: 50+ FTDs = **$200 por agente**

---

## 5. Escenarios Trabajados (Tier 1 - Lanzamiento)

### Escenario A: Mes Promedio

**Supuestos:**
- El agente consigue 10 FTDs en el mes
- Mix: 2 Cent ($15 avg), 6 Standard ($200 avg), 2 Raw ($600 avg)
- Re-depositos de clientes existentes: $2,000
- El equipo total llega a 35 FTDs

| Concepto | Calculo | Monto |
|----------|---------|-------|
| Salario base | Fijo | $1,000 |
| FTDs Cent (2x) | 2 x $5 | $10 |
| FTDs Standard (6x) | 3 x $15 + 3 x $25 | $120 |
| FTDs Raw (2x) | 1 x $40 + 1 x $60 | $100 |
| **Subtotal comisiones FTD** | | **$230** |
| Depositos totales | FTDs ($3,430) + Re-dep ($2,000) = $5,430 | |
| Bono Volumen | Tramo $3,000-$6,999 | **$150** |
| Bono Equipo | 35 FTDs = tramo 30+ | **$100** |
| **TOTAL COMPENSACION** | | **$1,480** |

### Escenario B: Buen Mes

**Supuestos:**
- 18 FTDs
- Mix: 3 Cent ($20 avg), 10 Standard ($250 avg), 4 Raw ($800 avg), 1 Raw ($1,200)
- Re-depositos: $5,000
- Equipo total: 55 FTDs

| Concepto | Calculo | Monto |
|----------|---------|-------|
| Salario base | Fijo | $1,000 |
| FTDs Cent (3x) | 1 x $5 + 2 x $8 | $21 |
| FTDs Standard (10x) | 2 x $15 + 8 x $25 | $230 |
| FTDs Raw (4x) | 3 x $40 + 1 x $60 | $180 |
| FTD Raw grande (1x) | $40 + $20 | $60 |
| **Subtotal comisiones FTD** | | **$491** |
| Depositos totales | FTDs (~$6,760) + Re-dep ($5,000) = $11,760 | |
| Bono Volumen | Tramo $7,000-$14,999 | **$350** |
| Bono Equipo | 55 FTDs = tramo 50+ | **$200** |
| **TOTAL COMPENSACION** | | **$2,041** |

### Escenario C: Mes Excepcional

**Supuestos:**
- 25 FTDs
- Mix: 2 Cent, 14 Standard ($300 avg), 7 Raw ($1,000 avg), 2 Raw ($2,000)
- Re-depositos: $12,000
- Equipo total: 78 FTDs

| Concepto | Calculo | Monto |
|----------|---------|-------|
| Salario base | Fijo | $1,000 |
| FTDs Cent (2x) | 2 x $8 | $16 |
| FTDs Standard (14x) | 2 x $15 + 12 x $25 | $330 |
| FTDs Raw (7x) | 2 x $40 + 5 x $60 | $380 |
| FTDs Raw grandes (2x) | 2 x $60 | $120 |
| **Subtotal comisiones FTD** | | **$846** |
| Depositos totales | FTDs (~$15,200) + Re-dep ($12,000) = $27,200 | |
| Bono Volumen | Tramo $15,000-$29,999 | **$600** |
| Bono Equipo | 78 FTDs = tramo 75+ | **$350** |
| **TOTAL COMPENSACION** | | **$2,796** |

### Resumen de Escenarios (Tier 1)

| Escenario | FTDs | Depositos Totales | Base | Comisiones | Bonos | **Total** |
|-----------|------|-------------------|------|------------|-------|-----------|
| Promedio | 10 | $5,430 | $1,000 | $230 | $250 | **$1,480** |
| Bueno | 18 | $11,760 | $1,000 | $491 | $550 | **$2,041** |
| Excepcional | 25 | $27,200 | $1,000 | $846 | $950 | **$2,796** |

### Escenario Teorico Maximo (Tier 1)

Si un agente cierra 30+ FTDs con depositos altos y el equipo supera 75:

| Concepto | Monto |
|----------|-------|
| Base | $1,000 |
| Comisiones FTD (30 FTDs, mix alto) | ~$1,100 |
| Bono Volumen ($30,000+) | $900 |
| Bono Equipo (75+) | $350 |
| **TOTAL MAXIMO REALISTA** | **$3,350** |

**Nota:** Para llegar a $4,000 en Tier 1, un agente necesitaria un volumen de depositos extraordinario o cerrar una cuenta Institutional. Es alcanzable pero no comun - y eso es lo correcto. Los $4,000 deben ser aspiracionales, no la norma.

---

## 6. Reglas Anti-Gaming

Estas reglas son **no negociables** y su violacion es causal de despido.

### 6.1 Prohibicion de Cuentas Falsas
- **Regla:** Ninguna comision se paga por cuentas que pertenezcan al agente, familiares directos (padres, hermanos, hijos, pareja), o amigos cercanos identificables.
- **Deteccion:** Cruce de datos: IP de registro, datos de KYC, metodos de pago compartidos.
- **Sancion:** Primer incidente = devolucion de la comision + suspension de bonos por 1 mes. Segundo incidente = despido.

### 6.2 Prohibicion de Churning
- **Regla:** No se permite aconsejar a un cliente que retire y re-deposite para inflar metricas de deposito.
- **Deteccion:** Ratio deposito/retiro anormal (> 3 ciclos deposito-retiro en 30 dias sin actividad de trading significativa).
- **Sancion:** Revision caso por caso. Si se confirma, devolucion de comisiones infladas.

### 6.3 Prohibicion de Presion Indebida
- **Regla:** No se permite presionar a un cliente para que deposite mas de lo que puede permitirse. Esto incluye sugerir que pida prestado, use tarjetas de credito para depositar, o deposite fondos destinados a gastos esenciales.
- **Deteccion:** Quejas del cliente, revision de conversaciones (grabadas), patron de depositos seguidos de retiros rapidos.
- **Sancion:** Primer incidente = advertencia escrita + capacitacion obligatoria. Segundo incidente = despido.

### 6.4 Prohibicion de Fragmentacion de FTDs
- **Regla:** No se permite dividir un FTD en multiples depositos pequeños para obtener mas comisiones fijas. Solo cuenta como FTD el primer deposito del cliente en NEOMAAA, no el primer deposito de cada tipo de cuenta.
- **Aclaracion:** Si un cliente abre primero una cuenta Cent y luego una Raw, solo la Cent genera comision de FTD. La Raw genera re-deposito (va al bono de volumen).
- **Excepcion:** Si pasan mas de 90 dias entre la apertura de la primera y segunda cuenta, se puede considerar como FTD independiente bajo aprobacion de Diego.

### 6.5 Auto-Referidos
- **Regla:** Los agentes NO pueden referirse a si mismos ni a otros agentes como clientes del broker.
- **Regla adicional:** Si un agente opera con cuenta personal en NEOMAAA (lo cual esta permitido), esa cuenta NO esta vinculada a ninguna comision.

### 6.6 Auditorias Mensuales
- Cada mes, antes de pagar comisiones, el Finance Manager (o Diego en Stage 1) revisa:
  - [ ] FTDs con actividad de trading posterior (al menos 1 trade ejecutado)
  - [ ] No hay patron de deposito-retiro sin trading
  - [ ] No hay cuentas duplicadas o relacionadas
  - [ ] Ratios de conversion por agente dentro de rangos normales

---

## 7. Calendario de Pago de Comisiones

### Ciclo de Pago

| Evento | Fecha |
|--------|-------|
| Cierre del periodo de calculo | Ultimo dia del mes |
| Auditoria y verificacion | Dias 1-5 del mes siguiente |
| Aprobacion de Diego | Dia 5 del mes siguiente |
| Pago de comisiones | Dia 10 del mes siguiente |
| Salario base | Dia 1 de cada mes (como siempre) |

### Metodo de Pago

- Comisiones se pagan por el mismo metodo que el salario (transferencia bancaria)
- Se entrega un desglose detallado a cada agente con:
  - Lista de FTDs y comision por cada uno
  - Total depositos de su cartera
  - Bono de volumen alcanzado
  - Bono de equipo (si aplica)
  - Cualquier clawback aplicado (ver seccion 8)

### Transparencia

- Cada agente tiene acceso a un dashboard en el CRM (Skale) donde puede ver:
  - Sus FTDs del mes en curso
  - Los depositos totales de su cartera
  - Su progreso hacia los bonos
  - El progreso del equipo hacia el team bonus
- **El dashboard se actualiza en tiempo real.** Los agentes no deben tener que preguntar "cuanto llevo".

---

## 8. Politica de Clawback (Devolucion de Comisiones)

### Regla General

Si un cliente deposita y retira sin operar, la comision se revierte. Esto es estandar en la industria y protege al broker de clientes fantasma o fraude.

### Condiciones de Clawback

| Situacion | Se activa clawback? | Monto de devolucion |
|-----------|--------------------|--------------------|
| Cliente deposita y retira en < 7 dias sin hacer ningun trade | Si | 100% de la comision FTD |
| Cliente deposita, hace 1-2 trades minimos (< 0.1 lotes totales), retira en < 14 dias | Si | 75% de la comision FTD |
| Cliente deposita, opera normalmente por 15+ dias, luego retira | No | $0 - comision es definitiva |
| Cliente deposita, opera, pierde todo su saldo (stop out) | No | $0 - no es culpa del agente |
| Cliente pide chargeback/contracargo | Si | 100% de comision FTD + se deduce del bono de volumen |

### Periodo de Proteccion

- **Periodo de "madurez" del FTD: 14 dias**
- Durante los primeros 14 dias despues del FTD, la comision esta "en reserva"
- Si el cliente pasa 14 dias con saldo activo y al menos 0.5 lotes operados, la comision se consolida
- Esto NO retrasa el pago (las comisiones se pagan el dia 10), pero si un clawback se activa despues del pago, se descuenta del siguiente mes

### Formula de Clawback

```
Clawback = Comision FTD pagada x Porcentaje segun tabla

Se aplica contra las comisiones del mes siguiente.
Si el agente renuncia, se descuenta de su liquidacion.
```

### Limite de Clawback

- El clawback maximo en un mes no puede exceder el 30% de las comisiones totales del agente en ese mes
- Esto protege al agente de una situacion donde multiples clawbacks lo dejen en negativo
- Los clawbacks que excedan el 30% se arrastran al mes siguiente

---

## 9. Comparacion con el Estandar de la Industria (LATAM)

### Benchmarks de Brokers en LATAM

| Metrica | Rango de la Industria | NEOMAAA Propuesto (Tier 1) |
|---------|----------------------|---------------------------|
| Salario base de sales agent | $500 - $1,500 | $1,000 |
| Comision por FTD (cuenta standard) | $5 - $25 | $15 - $25 |
| Comision por FTD (cuenta premium) | $20 - $100 | $40 - $60 |
| Bono de volumen mensual | $0 - $500 (raro) | Hasta $900 |
| Team bonus | Poco comun | Incluido |
| Compensacion total top performer | $2,000 - $4,500 | $2,800 - $3,350 |
| Clawback | 60-80% de brokers lo aplican | Si, con reglas claras |
| Periodo de pago | 15-30 dias post mes | 10 dias post mes |

### Analisis de Competitividad

**Ventajas de nuestro esquema vs. la industria:**

1. **Salario base solido ($1,000):** Muchos brokers en LATAM pagan $500-$700 de base y dependen mas de comisiones. Nuestro base da estabilidad.
2. **Pago rapido (dia 10):** La industria tipicamente paga entre el 15 y 30 del mes siguiente. Pagar el 10 es una ventaja para atraer talento.
3. **Transparencia total:** Dashboard en tiempo real. La mayoria de brokers tienen sistemas opacos donde el agente no sabe cuanto va a cobrar hasta que le llega.
4. **Team bonus:** Muy poco comun en la industria. Diferencia real.
5. **Bono de volumen escalonado:** La mayoria de los brokers solo pagan por FTD. El bono de volumen incentiva retencion, que es lo que realmente genera ingreso.

**Donde estamos por debajo:**

1. **Comision fija por FTD es conservadora** para cuentas Cent/Standard comparada con brokers que pagan % del FTD (algunos pagan hasta 10% del FTD).
2. **Techo de compensacion (~$3,350)** esta en el rango medio. Algunos brokers permiten ganar $5,000+ pero con base mucho mas bajo y sin bonos de equipo.

**Conclusion:** El esquema es **competitivo y equilibrado** para LATAM. Ofrece estabilidad (base alto) + upside (bonos multiples) + cultura de equipo (team bonus). No es el esquema que mas paga, pero es el mas predecible y justo.

---

## 10. Como se Paga tu Variable — Mecanica Simplificada

### De donde sale el dinero de tus comisiones

Tu variable sale del revenue que el broker genera por la actividad de los clientes que tu traes. En resumen:

- El broker obtiene revenue a partir del **spread**, comisiones por lote operado y otros ingresos de la actividad de trading del cliente.
- De ese revenue, una **porcion definida** se destina a compensar a sales (tu variable). El resto cubre costos operativos (plataforma, liquidez, PSPs, soporte, compliance), reservas regulatorias y margen de la empresa.
- Tu responsabilidad es **traer clientes reales que depositen y operen**. A mayor actividad genuina de tu cartera, mayor tu variable.

No necesitas conocer los numeros internos del broker para calcular tu comision — tu pago depende exclusivamente de tu propio desempeno contra los targets definidos en este documento (FTDs, volumen de cartera, retencion).

### Por que el esquema es sostenible para ti

El esquema de comisiones esta calibrado para que sea **rentable para el broker y motivador para vos** en simultaneo. Algunas reglas clave:

- **FTD aislado no alcanza:** si un cliente deposita y no opera, la comision FTD se clawbackea (ver seccion 5). Esto alinea tu incentivo con el del broker: ambos queremos clientes activos, no solo depositos.
- **El bono de volumen es recurrente:** mientras tu cartera opere, vos cobras mes a mes. Mantener clientes activos es mas rentable que quemar leads en FTDs unicos.
- **Los topes de compensacion** (hasta ~$3,350-$4,000/mes segun tier y desempeno) estan definidos para que agentes top performers ganen muy bien sin comprometer la sostenibilidad del modelo.

### Que significa esto en la practica

| Si vos haces... | El broker gana... | Tu comision... |
|----|----|----|
| FTDs que no operan | Poco o nada | Se clawbackea (seccion 5) |
| FTDs que operan consistentemente | Revenue recurrente mes a mes | Cobras FTD + bono volumen + retencion |
| Cartera grande y activa | Base de revenue estable | Escalas a Tier 3 con bono retencion (hasta $400/mes extra) |
| Volumen sinteticamente inflado | Detectado en auditoria | Penalizacion + potencial cierre de vinculo |

### Regla de oro

**Tu variable es un % del valor que generas — no un regalo.** El modelo esta disenado para que ambas partes ganen cuando traes clientes de calidad. Cuando no traes clientes de calidad, ambas partes pierden — por eso existen los clawbacks y los minimos de KPI (seccion 12).

Si tenes dudas sobre como se calcula tu variable en un mes especifico, el reporte mensual (enviado dia 5, pago dia 10) detalla cada concepto por cliente. Cualquier disputa se resuelve 1-a-1 con Diego en los 5 dias habiles posteriores.

---

## 11. Reglas Adicionales y FAQ

### Asignacion de Clientes

- Cada FTD se asigna al agente que lo genero (registrado en Skale CRM)
- Si un lead llega por marketing (organico, ads) sin agente asignado, se distribuye por round-robin
- Un cliente NUNCA se reasigna a otro agente sin aprobacion de Diego
- Si un agente renuncia, sus clientes se redistribuyen entre los agentes restantes. Las comisiones de volumen de esos clientes aplican a partir del mes siguiente a la redistribucion.

### Promociones de Bonus del Broker

- Si NEOMAAA hace una promocion (ej: "deposita $500 y recibe $100 de bonus"), el bonus del broker NO cuenta como deposito para calcular comisiones
- Solo cuenta el dinero real depositado por el cliente

### Disputas

- Cualquier disputa sobre comisiones se resuelve en una reunion 1-a-1 con Diego dentro de los 5 dias habiles posteriores a la publicacion del reporte mensual
- La decision de Diego es final

### Revision del Esquema

- Este esquema se revisa cada 3 meses (al cambio de Tier)
- Cualquier cambio se comunica con 15 dias de anticipacion minimo
- Los cambios no son retroactivos (las comisiones del mes en curso se pagan con el esquema vigente al inicio del mes)

---

## 12. KPIs Minimos Requeridos

Las comisiones son un incentivo, pero hay minimos que cada agente DEBE cumplir para mantener su posicion:

| KPI | Minimo Mensual | Consecuencia si no se cumple |
|-----|---------------|------------------------------|
| Contactos diarios | 30/dia (650/mes) | Advertencia verbal (1er mes), escrita (2do mes), PIP (3er mes) |
| FTDs | 8/mes minimo | Misma escala de consecuencias |
| Tasa de conversion sobre leads calificados | >= 5% | Revision de tecnica de ventas con Diego |
| Clientes activos (Tier 3+) | >= 15 | Revision de estrategia de retencion |

**PIP = Performance Improvement Plan:** 30 dias con coaching intensivo. Si no mejora, se evalua reemplazo.

---

## 13. Resumen Visual: Composicion de Compensacion por Tier

```
TIER 1 (Meses 1-3) - Lanzamiento
============================================================
Escenario Promedio:  [$1,000 BASE][====$230 FTD===][$250 BONOS] = $1,480
Escenario Bueno:     [$1,000 BASE][========$491 FTD=======][$550 BONOS] = $2,041
Escenario Excep:     [$1,000 BASE][===========$846 FTD==========][$950 BONOS] = $2,796

TIER 2 (Meses 4-6) - Normalizacion
============================================================
Nota: FTD baja ~25%, pero Volumen sube ~30% (cartera crece)
Compensacion total similar o superior al Tier 1 para buen performer

TIER 3 (Mes 7+) - Sostenible  
============================================================
Nota: Se agrega Bono de Retencion (hasta $400/mes)
Un agente con 60+ clientes activos y buen flujo de FTDs supera los $3,000/mes
```

---

## 14. Proximos Pasos para Diego

- [ ] **Revisar y aprobar** este esquema o solicitar ajustes
- [ ] **Definir quien audita** las comisiones mensuales (Finance Manager o Diego en Stage 1)
- [ ] **Configurar Skale CRM** para trackear FTDs por agente y depositos de cartera
- [ ] **Crear el dashboard** que los agentes van a ver (puede ser en Skale o un Google Sheet compartido inicialmente)
- [ ] **Comunicar a Franco, Edward y Luis** el esquema aprobado, idealmente en una reunion donde puedan hacer preguntas
- [ ] **Documentar en contrato** - agregar una adenda al contrato de trabajo con el esquema de comisiones (el abogado debe revisarlo)
- [ ] **Definir fecha de inicio** - el Tier 1 arranca el dia que el broker abre a clientes reales

---

*Documento generado como propuesta. Todas las cifras son recomendaciones basadas en benchmarks de la industria de brokers forex/CFD en LATAM. Sujeto a aprobacion y ajuste por parte de Diego.*
