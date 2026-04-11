# POLITICA DE EJECUCION DE ORDENES

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 8 de abril 2026**

> DOCUMENTO DE REFERENCIA INTERNO — Requiere revision legal antes de publicacion.

---

## 1. INTRODUCCION

La presente Politica de Ejecucion de Ordenes describe como Neomaaa Ltd (IBC 15968), titular de la licencia L15968/N emitida por la Autoridad de Servicios Financieros Offshore de Anjouan (AOFA), ejecuta las ordenes de sus clientes en los instrumentos financieros disponibles a traves de la plataforma MetaTrader 5 (MT5).

El objetivo de esta politica es proporcionar transparencia sobre el proceso de ejecucion y los factores que pueden influir en la calidad de la misma.

---

## 2. MODELO DE EJECUCION

### 2.1 ECN/STP Hibrido

NEOMAAA opera bajo un modelo de ejecucion ECN/STP (Electronic Communication Network / Straight Through Processing) hibrido. Esto significa que:

- Las ordenes del cliente se enrutan a proveedores de liquidez externos (Liquidity Providers, LPs) para su ejecucion.
- La Empresa actua como intermediario entre el cliente y los proveedores de liquidez.
- La Empresa agrega liquidez de multiples proveedores para ofrecer los mejores precios disponibles.

### 2.2 Ejecucion de Mercado (Market Execution)

Todas las ordenes se ejecutan bajo el modelo de Market Execution. Esto implica que:

- Las ordenes se ejecutan al mejor precio disponible en el momento de la ejecucion.
- No hay recotizaciones (re-quotes).
- El slippage (positivo o negativo) puede ocurrir entre el precio solicitado y el precio de ejecucion.

---

## 3. FACTORES DE EJECUCION

La Empresa considera los siguientes factores al ejecutar ordenes:

| Factor | Descripcion | Prioridad |
|--------|-----------|----------|
| **Precio** | El mejor precio disponible de los proveedores de liquidez | Alta |
| **Velocidad** | Tiempo de ejecucion de la orden | Alta |
| **Probabilidad de ejecucion** | Likelihood de que la orden se complete al precio solicitado | Alta |
| **Costo total** | Spread + comision + swap aplicable | Media |
| **Tamano de la orden** | Impacto del tamano en la liquidez disponible | Media |
| **Naturaleza de la orden** | Tipo de orden (mercado, limite, stop) | Media |

---

## 4. TIPOS DE ORDENES

### 4.1 Ordenes de Mercado (Market Orders)

Se ejecutan inmediatamente al mejor precio disponible. Son las ordenes mas rapidas pero estan sujetas a slippage.

### 4.2 Ordenes Pendientes

| Tipo | Descripcion | Ejecucion |
|------|-----------|----------|
| **Buy Limit** | Compra a un precio inferior al actual | Se activa cuando el precio ask alcanza el nivel especificado |
| **Sell Limit** | Venta a un precio superior al actual | Se activa cuando el precio bid alcanza el nivel especificado |
| **Buy Stop** | Compra a un precio superior al actual | Se activa cuando el precio ask alcanza el nivel especificado |
| **Sell Stop** | Venta a un precio inferior al actual | Se activa cuando el precio bid alcanza el nivel especificado |
| **Buy Stop Limit** | Combinacion de Buy Stop y Buy Limit | Se coloca una Buy Limit cuando se alcanza el precio de activacion |
| **Sell Stop Limit** | Combinacion de Sell Stop y Sell Limit | Se coloca una Sell Limit cuando se alcanza el precio de activacion |

### 4.3 Ordenes Stop Loss y Take Profit

- **Stop Loss:** Cierra la posicion automaticamente cuando el precio alcanza un nivel predeterminado para limitar perdidas.
- **Take Profit:** Cierra la posicion automaticamente cuando el precio alcanza un nivel predeterminado para asegurar ganancias.

Estas ordenes no garantizan la ejecucion al precio exacto especificado. En condiciones de gap o alta volatilidad, pueden ejecutarse al siguiente precio disponible.

---

## 5. SLIPPAGE

### 5.1 Definicion

El slippage es la diferencia entre el precio solicitado por el cliente y el precio real de ejecucion. Puede ser:

- **Positivo:** El cliente obtiene un mejor precio del solicitado.
- **Negativo:** El cliente obtiene un peor precio del solicitado.

### 5.2 Causas del Slippage

- Alta volatilidad del mercado (noticias economicas, eventos geopoliticos).
- Baja liquidez (horarios de baja actividad, instrumentos poco liquidos).
- Gaps de precio (apertura de mercado, fines de semana).
- Tamano de la orden (ordenes grandes pueden impactar la liquidez disponible).

### 5.3 Politica de Slippage

La Empresa aplica el slippage de forma simetrica: tanto el slippage positivo como el negativo se trasladan al cliente. La Empresa no manipula el slippage en beneficio propio.

---

## 6. PRECIOS Y COTIZACIONES

### 6.1 Fuente de Precios

Los precios mostrados en la plataforma MetaTrader 5 se derivan de las cotizaciones proporcionadas por los proveedores de liquidez de la Empresa. La Empresa agrega los precios de multiples fuentes para ofrecer los mejores precios bid y ask disponibles.

### 6.2 Spread

El spread (diferencia entre el precio bid y ask) es variable y depende de:

- El instrumento operado.
- Las condiciones de mercado (liquidez, volatilidad).
- El tipo de cuenta del cliente.
- El horario de operacion.

Los spreads indicativos publicados por la Empresa son promedios o minimos y pueden ampliarse en condiciones de mercado adversas.

### 6.3 Error de Cotizacion (Error Quote)

En caso de que una orden se ejecute a un precio manifiestamente erroneo debido a un error en la cotizacion del proveedor de liquidez, la Empresa se reserva el derecho de:

- Corregir el precio de ejecucion al precio correcto de mercado.
- Cancelar la operacion en su totalidad.

La Empresa notificara al cliente en caso de aplicar una correccion por error de cotizacion.

---

## 7. HORARIOS DE OPERACION

7.1 Los mercados forex operan de lunes a viernes, las 24 horas del dia (con excepcion de periodos de mantenimiento del servidor).

7.2 Los horarios de operacion varian segun el instrumento. Los horarios especificos estan disponibles en la plataforma MT5 y en el sitio web de NEOMAAA.

7.3 Durante los periodos de apertura y cierre de sesiones de mercado, la liquidez puede ser menor y los spreads mas amplios.

7.4 Las ordenes pendientes pueden no ejecutarse durante periodos de cierre de mercado o gaps de precio.

---

## 8. MARGIN CALL Y STOP OUT

### 8.1 Margin Call

Cuando el nivel de margen de la cuenta del cliente cae por debajo del nivel de Margin Call establecido, el sistema genera una alerta. El cliente debe:

- Depositar fondos adicionales, o
- Cerrar posiciones para liberar margen.

### 8.2 Stop Out

Cuando el nivel de margen cae por debajo del nivel de Stop Out, el sistema cierra automaticamente las posiciones abiertas, comenzando por la posicion con mayor perdida, hasta que el nivel de margen se recupere por encima del umbral.

Los niveles de Margin Call y Stop Out estan publicados en el sitio web y la plataforma de NEOMAAA para cada tipo de cuenta.

---

## 9. CONFLICTOS DE INTERES

### 9.1 Identificacion

La Empresa reconoce que pueden existir conflictos de interes potenciales derivados de su modelo de negocio. Estos incluyen:

- La Empresa obtiene ingresos de spreads y comisiones, lo que podria crear un incentivo para fomentar mayor volumen de operaciones.
- En determinadas circunstancias, la Empresa puede actuar como contraparte de las operaciones del cliente.

### 9.2 Mitigacion

Para mitigar los conflictos de interes, la Empresa:

- Mantiene politicas y procedimientos internos de gestion de riesgos.
- Segrega las funciones de trading, compliance y atencion al cliente.
- No incentiva a los empleados de ventas en funcion de las perdidas de los clientes.
- Proporciona transparencia en sus condiciones de operacion.
- Publica esta politica de ejecucion para informacion del cliente.

---

## 10. CIRCUNSTANCIAS EXCEPCIONALES

En circunstancias excepcionales de mercado, la Empresa puede:

- Ampliar los spreads significativamente.
- Restringir o suspender la operacion en determinados instrumentos.
- Modificar los niveles de apalancamiento.
- Suspender temporalmente la plataforma.

Estas medidas se tomaran para proteger tanto a los clientes como a la Empresa y se comunicaran en la medida de lo posible.

---

## 11. REVISION

Esta politica se revisa al menos una vez al ano o cuando se produzcan cambios significativos en las condiciones de mercado, los proveedores de liquidez o el modelo de ejecucion de la Empresa.

---

**Neomaaa Ltd** | IBC 15968 | Licencia L15968/N | AOFA, Anjouan, Union de Comoras

*Ultima actualizacion: Abril 2026*
