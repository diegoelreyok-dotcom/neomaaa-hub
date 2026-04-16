# Trading Restrictions — Restricciones de Trading

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 15 Abril 2026**

> [!INFO]
> **Documento fuente:** El texto legal definitivo esta publicado en https://neomaaa.com/about/legal-documentation. Este documento interno es una sinopsis para el equipo. Ante discrepancia, prevalece el documento oficial publicado.

---

## 1. Proposito

Este documento establece las **restricciones y practicas prohibidas** en las cuentas de trading de **Neomaaa Ltd**. Su cumplimiento es condicion para operar con la Empresa.

Complementa el `legal/client-agreement.md` y la `legal/order-execution-policy.md`.

---

## 2. Restricciones geograficas

### 2.1 Jurisdicciones PROHIBIDAS (no aceptamos clientes)

Por restriccion regulatoria o por politica interna:

- **Estados Unidos** (SEC / CFTC / NFA).
- **Canada** (IIROC / CSA).
- **Espacio Economico Europeo (EEA)** — incluye Espana y los 29 paises restantes (MiFID II).
- **Reino Unido** (FCA).
- **Australia** (ASIC).
- **Japon, Israel** y jurisdicciones adicionales segun politica interna definida por Compliance.

### 2.2 Jurisdicciones SANCIONADAS (rechazo automatico)

- **FATF black list / call for action:** Iran, Corea del Norte (DPRK), Myanmar.
- **OFAC comprehensive sanctions:** Cuba, Siria, Crimea / regiones ocupadas de Ucrania (Donetsk, Luhansk), Sudan (parcial).
- **Iraq:** validar caso por caso, default rechazar.
- Cualquier pais o individuo bajo sanciones UN / EU / UK / OFAC especificas.

Detalle completo y metodologia en `compliance/risk-matrix.md` seccion 5 y `compliance/screening-sanciones.md`.

### 2.3 Jurisdicciones con monitoreo elevado (FATF grey list)

Cliente residente → clasificacion **MEDIUM RISK automatica** + Source of Funds obligatorio. Lista vigente en `compliance/risk-matrix.md` seccion 5.

---

## 3. Estrategias de trading prohibidas

Las siguientes practicas **no estan permitidas** en cuentas Neomaaa Ltd. Constituyen causa de anulacion de operaciones, confiscacion de ganancias obtenidas mediante la practica, y potencial cierre de cuenta.

### 3.1 Latency arbitrage
Uso de tecnologia que explote el retraso entre el feed de precios del broker y el mercado subyacente para abrir posiciones a precios ya invalidos. Incluye:
- **Toxic flow** contra el broker con bots de latencia.
- **Arbitraje entre la cuenta del broker y un feed de terceros** cuando el broker tiene retraso.

### 3.2 Price manipulation / quote manipulation
Intento de manipular precios del broker mediante ordenes coordinadas, layering, spoofing, o wash trading.

### 3.3 Arbitraje entre cuentas relacionadas
- **Hedging entre cuentas propias** — abrir posiciones opuestas en multiples cuentas del mismo cliente o de cuentas relacionadas (familiar directo, empleado de la Empresa, misma IP reiterada) para:
  - Capturar bonos sin riesgo neto.
  - Generar turnover sinteticamente.
  - Explotar diferencias puntuales entre cuentas.
- **Hedging entre la cuenta y un broker externo** con intencion de explotar bonos o rebates.

### 3.4 Abuso de bonos
Detalle en `legal/bonus-terms.md` seccion 6. Incluye:
- Multi-accounting para reclamar bono de bienvenida repetidamente.
- Estrategias sinteticas para cumplir turnover sin riesgo genuino.
- Colusion con IB/afiliado/empleado.

### 3.5 Swap arbitrage abusivo en cuentas islamicas
Las cuentas swap-free estan destinadas a clientes con fundamento religioso. Uso de cuenta swap-free exclusivamente para evitar costos de swap en posiciones de largo plazo con intencion comercial es considerado abusivo y puede derivar en reclasificacion a cuenta standard con recalculo retroactivo.

### 3.6 Explotacion de errores de precios / "stale quotes"
Cuando un error evidente del proveedor de liquidez o de feed genere un precio fuera de mercado (off-market quote), las operaciones abiertas contra ese precio pueden ser **anuladas o ajustadas al precio justo** de mercado. Esta es practica estandar de la industria.

### 3.7 Trading de pre-open / despues de close en instrumentos ilegales para el horario
Ejecutar ordenes en micro-gaps entre cierre y apertura oficial del mercado subyacente, con intencion de capturar diferencias conocidas ex-ante, es considerado abuso.

### 3.8 Uso de softwares prohibidos
- EAs que incluyan logica de **latency arbitrage**.
- EAs que busquen explotar rollovers de swap de manera abusiva.
- Cualquier software distribuido por terceros con garantia de "no-loss" basada en arbitraje contra el broker.

---

## 4. Restricciones de monto y exposicion

- **Deposito minimo:** segun tipo de cuenta (Cent $5 / Standard $50 / Raw $500 / Institutional $50,000).
- **Deposito maximo por operacion:** sujeto a limites del PSP y politica AML.
- **Exposicion maxima por cliente y por instrumento:** la Empresa puede imponer limites a discrecion para proteger la integridad del libro de ejecucion. Aplicado especialmente a cryptocurrencies CFDs y exoticos.
- **Limites de margen en news events o volatilidad extrema:** la Empresa puede reducir apalancamiento maximo, ampliar margen requerido o restringir apertura de nuevas posiciones durante eventos de alto riesgo (NFP, FOMC, elecciones, eventos geopoliticos). Notificacion previa cuando es posible.

---

## 5. Restricciones por producto

### 5.1 Cryptocurrencies CFDs
- Apalancamiento tipicamente menor que forex (ej. 1:10 a 1:50 segun token).
- Volumen maximo por orden puede estar capado.
- Trading 24/7 — rollover de funding distinto al swap FX.

### 5.2 Stocks / ETFs CFDs
- Solo en horario de la bolsa subyacente.
- Ajustes por dividendos y corporate actions (splits, mergers) automaticos segun ex-date.
- No hay derechos de accionista (voto, asamblea).

### 5.3 Indices, commodities, energies
- Sujetos a expiracion de contrato subyacente (rollover gestionado por el broker con notificacion previa).
- Volumen limitado en horas de baja liquidez.

---

## 6. Restricciones de retiro

- Retiros solo al **metodo de deposito original** (anti money-laundering; ver `legal/refund-policy.md`).
- Posibles retiros alternativos solo con autorizacion de Compliance tras verificacion.
- Retiros estan bloqueados mientras haya **bono activo** que no haya cumplido turnover (ver `legal/bonus-terms.md`).
- Retiros estan bloqueados mientras haya **posiciones abiertas** que consuman margen — el cliente debe cerrar primero o mantener margen libre suficiente.
- EDD puede retrasar retiros >USD 10,000 hasta verificacion completa (`compliance/edd-triggers.md`).

---

## 7. Conducta del cliente

Ademas de las restricciones tecnicas de trading, el cliente se compromete a **no**:

- Proporcionar documentacion falsa o adulterada en KYC.
- Operar en nombre de un tercero sin autorizacion formal (designated signatory documentado).
- Usar fuentes de fondos ilicitas (producto de delito, fraude, corrupcion, terrorismo).
- Usar la cuenta como vehiculo de lavado de dinero o structuring.
- Acosar, amenazar o abusar verbalmente al personal de soporte, compliance o sales.
- Difamar publicamente a la Empresa sin fundamento (reviews falsas coordinadas).

Violaciones materiales pueden resultar en cierre de cuenta, retencion de fondos para investigacion, reporte a autoridades competentes y acciones legales.

---

## 8. Enforcement

### 8.1 Deteccion
- Monitoreo automatico de patrones sospechosos (toxic flow, hedging cross-account, abuso de bonos).
- Auditoria manual por Compliance y Dealing.
- Reportes de equipo de soporte / sales.

### 8.2 Consecuencias escaladas

| Severidad | Consecuencia |
|---|---|
| Primera ofensa menor | Advertencia formal + correccion del calculo |
| Ofensa moderada o repetida | Anulacion de operaciones abusivas + remocion de bono + perdida de ganancias |
| Ofensa grave / fraude | Cierre de cuenta + retencion de fondos para investigacion + reporte a AOFA / autoridades |

### 8.3 Derecho a apelacion
El cliente afectado puede apelar via `legal/complaint-handling.md`. Compliance revisa con logs de ejecucion y comunicaciones. Si la decision se mantiene, el cliente puede escalar a AOFA.

---

## 9. Modificaciones

La Empresa puede actualizar estas restricciones en cualquier momento. La version vigente se publica en neomaaa.com. Cambios materiales se notifican por email a clientes activos con el preaviso minimo establecido segun politica interna definida por Compliance.

---

## 10. Contacto

- `compliance@neomaaa.com` — dudas sobre restricciones.
- `legal@neomaaa.com` — disputas formales.
- Direccion: Hamchako, Mutsamudu, Anjouan, Union of Comoros.

---

[PENDIENTE: texto legal final desde neomaaa.com/about/legal-documentation]
[Limites exactos de apalancamiento por instrumento en eventos de alta volatilidad, niveles exactos de margin call/stop-out y lista de EAs prohibidos: segun politica interna definida por el Head of Dealing y Compliance.]
