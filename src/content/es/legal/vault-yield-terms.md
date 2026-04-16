# Vault Yield Terms — Terminos del Sistema Vault Yield

**Neomaaa Ltd (IBC 15968) | Licencia L15968/N | AOFA**
**Version: 1.0 | Fecha: 15 Abril 2026**

> [!INFO]
> **Documento fuente:** El texto legal definitivo esta publicado en https://neomaaa.com/about/legal-documentation. Este documento interno es una sinopsis para el equipo. Ante discrepancia, prevalece el documento oficial publicado.

> [!WARNING]
> **El Vault Yield System NO es un deposito bancario garantizado. NO esta cubierto por un fondo de garantia de depositos. Es un producto de yield con riesgos operativos, de contraparte y de mercado. Lee este documento completo antes de participar.**

---

## 1. Definiciones

- **"Vault" / "Vault Yield System"** — Sistema operado por Neomaaa Ltd que permite al cliente transferir fondos a una wallet dedicada no destinada a trading con el objetivo de devengar un rendimiento (yield) anualizado.
- **"Balance Vault"** — Monto del cliente mantenido en el Vault, excluyendo yield acumulado no acreditado.
- **"APY"** — Annual Percentage Yield, rendimiento anualizado publicado para el plan del cliente.
- **"Plan flexible"** — Plan sin lock-up, retirable en cualquier momento, con APY menor.
- **"Plan locked"** — Plan con periodo de lock-up, no retirable antes del vencimiento salvo penalidad, con APY mayor.
- **"Pool"** — Conjunto agregado de fondos de todos los clientes en el Vault, gestionado por la Empresa.

---

## 2. Alcance y aceptacion

Estos Vault Yield Terms regulan la relacion entre **Neomaaa Ltd** ("la Empresa") y el cliente respecto al uso del Vault Yield System. Son adicionales al Client Agreement y a los T&C generales.

El cliente acepta expresamente estos terminos al activar el Vault desde el portal.

---

## 3. Elegibilidad

El cliente debe cumplir **todas** las siguientes condiciones:

- Ser cliente registrado con **KYC aprobado** en Neomaaa Ltd.
- **Residir** en jurisdiccion **no restringida** (ver seccion 8).
- Ser **mayor de edad** en su jurisdiccion de residencia.
- No estar bajo flag **EDD, PEP no aprobado o sanctions screening pendiente**.
- No tener la cuenta bloqueada por investigacion compliance.

La Empresa se reserva el derecho de **denegar acceso** al Vault a cualquier cliente a su discrecion, sin necesidad de justificar.

---

## 4. Operativa

### 4.1 Transferencia al Vault
El cliente transfiere fondos desde su cuenta de trading al Vault mediante el portal. La transferencia es **inmediata** y no implica fee.

### 4.2 Activo soportado
El Vault opera sobre el o los activos soportados definidos segun politica interna (tipicamente stablecoins como USDT u otros activos aprobados). El cliente debe tener el activo soportado en su cuenta para transferir al Vault.

### 4.3 Calculo del yield
- **Accrual diario** con base en el Balance Vault al corte diario establecido por la Empresa (tipicamente 00:00 UTC).
- **Formula:** `yield_diario = Balance_vault × (APY / 365)`.
- **APY vigente** publicado en la pagina del producto y en el portal del cliente. Variable, actualizable segun condiciones de mercado.

### 4.4 Pago del yield
- **Plan flexible:** acreditado segun la frecuencia publicada en la pagina del producto (tipicamente diaria o semanal) al Balance Vault o transferido a cuenta trading segun seleccione el cliente.
- **Plan locked:** acreditado al vencimiento del lock (o segun subplan) con opcion de compounding automatico si el cliente lo habilita.

### 4.5 Retiro del Vault
- **Plan flexible:** retirable en cualquier momento. Transferencia al balance de trading es inmediata.
- **Plan locked:** retiro antes del vencimiento genera **penalidad** (perdida del yield acumulado + potencialmente un fee fijo [DATO]). En casos de hardship documentado, la Empresa puede renunciar a la penalidad caso por caso.

---

## 5. APY y modificaciones

- El APY vigente se publica en la pagina del producto.
- La Empresa puede modificar el APY con **notificacion previa** segun el plazo establecido en politica interna y publicado en la pagina del producto.
- Modificaciones no afectan retroactivamente planes locked ya vigentes cuyo APY fue fijado al momento de la contratacion del plan.
- Planes flexibles ven aplicado el nuevo APY desde la fecha de efectivo del cambio.

---

## 6. Riesgos

El cliente reconoce y acepta los siguientes riesgos:

### 6.1 Riesgo de no-garantia
El Vault **NO es un deposito bancario regulado**. NO hay seguro tipo FDIC, NCUA, FSCS, FGD u otro fondo de garantia de depositos. En caso de insolvencia de Neomaaa Ltd, el cliente **es acreedor** en el proceso concursal segun el orden legal aplicable en Anjouan, sin prelacion especial.

### 6.2 Riesgo de contraparte
El pool Vault se despliega en estrategias de rendimiento que implican contrapartes: staking institucional, lending desks, protocolos DeFi whitelisted, tesoreria propia. Cada contraparte tiene un riesgo especifico de default o freeze. La Empresa hace due diligence razonable pero **no garantiza** solvencia de terceros.

### 6.3 Riesgo del activo subyacente (stablecoins)
Si el activo es una stablecoin (USDT, USDC u otra), hay riesgo de:
- **De-peg** — perdida parcial o total del 1:1 con el USD.
- **Freeze regulatorio** — el emisor puede congelar wallets por orden judicial o regulatoria.
- **Colapso del emisor** — riesgo de ejecucion crypto-nativo.

### 6.4 Riesgo operativo y tecnico
- Fallos en sistemas, hacks, errores de smart contracts (si aplica), errores humanos.
- Interrupciones del servicio — la Empresa mitiga con redundancia enterprise-grade y target 99.9% uptime.

### 6.5 Riesgo regulatorio
- Cambios normativos en Anjouan u otras jurisdicciones pueden forzar la **suspension o cierre** del Vault sin previo aviso prolongado.
- La Empresa hara esfuerzos razonables para devolver Balance + yield devengado al cliente, pero puede haber delay operativo.

### 6.6 Riesgo de modificacion del rendimiento
El APY es variable. Rendimientos pasados **no** garantizan rendimientos futuros.

---

## 7. Abuso y prohibiciones

Estan prohibidos:

- **Money laundering** — uso del Vault como vehiculo de lavado. Activa SAR.
- **Structuring** — fraccionar depositos para evitar thresholds EDD. Puede derivar en cierre del Vault y reporte a AOFA.
- **Cuentas multiples** — un cliente solo puede tener una posicion activa en el Vault, salvo autorizacion institucional especial.
- **Transferencia externa a wallets sancionadas** — retiros del Vault a wallets con match en screening de sancionados estan bloqueados y reportados.
- **Fraude sobre el origen de fondos** — fondos provenientes de actividad ilicita son susceptibles de retencion y reporte.

Violaciones resultan en: remocion del Vault, retencion para investigacion, cierre de cuenta trading, reporte a autoridades.

---

## 8. Restricciones geograficas

El Vault **no se ofrece** a residentes de:

- Estados Unidos, Canada, Espacio Economico Europeo (incluye Espana), Reino Unido, Australia, Japon, Israel y jurisdicciones adicionales segun politica interna definida por Compliance.
- Cuba, Iran, Corea del Norte, Myanmar, Siria, Sudan, Crimea y regiones ocupadas de Ucrania.
- Cualquier jurisdiccion con sancion OFAC comprehensive o FATF black list.

Si el cliente se muda a una jurisdiccion restringida, debera cerrar su posicion Vault conforme a los terminos del plan (incluyendo eventual penalidad si es locked). La Empresa puede forzar el cierre cumpliendo best execution.

---

## 9. Fees y costos

- **Deposito al Vault:** 0 (sin fee).
- **Retiro del Vault (plan flexible):** 0 (sin fee).
- **Retiro anticipado (plan locked):** penalidad (perdida del yield no acreditado y, cuando aplique, fee fijo) segun los terminos del plan contratado.
- **Fee administrativo:** segun los terminos del plan contratado y publicado en la pagina del producto.

El yield neto comunicado al cliente **ya es neto** de fees del producto.

---

## 10. Tratamiento fiscal

El yield generado puede constituir **ingreso imponible** segun la jurisdiccion de residencia fiscal del cliente. La Empresa **no provee asesoramiento fiscal**. El cliente es responsable de:

- Declarar el yield percibido.
- Pagar impuestos correspondientes.
- Consultar asesor fiscal en su pais.

La Empresa puede emitir **reportes de actividad** solicitados por reguladores o autoridades fiscales conforme a la ley aplicable, incluyendo reportes CRS/FATCA si fuera requerido.

---

## 11. Terminacion

### 11.1 Por el cliente
- **Plan flexible:** retiro en cualquier momento cierra la posicion.
- **Plan locked:** retiro anticipado con penalidad; al vencimiento, retiro sin penalidad.

### 11.2 Por la Empresa
La Empresa puede terminar el acceso del cliente al Vault en cualquier momento si:
- Se detecta violacion de estos terminos, del Client Agreement o de la ley aplicable.
- Cambios regulatorios asi lo requieren.
- El cliente incurre en sancion OFAC/UN/EU/UK.

En terminacion por la Empresa, se devolvera el Balance + yield acumulado neto de penalidad aplicable (si corresponde), al metodo de origen del deposito.

---

## 12. Modificacion de terminos

La Empresa puede modificar estos Vault Yield Terms con notificacion previa por email segun el plazo establecido en politica interna. El cliente que no acepte puede retirar su Balance antes de la fecha de efectividad sin penalidad.

---

## 13. Ley aplicable y disputas

- **Ley aplicable:** leyes de la Union de Comoros (licencia AOFA).
- **Resolucion:** primero via `legal/complaint-handling.md`. Si no resuelve, tribunales competentes de Anjouan.

---

## 14. Contacto

- Consultas operativas: `support@neomaaa.com`
- Compliance: `compliance@neomaaa.com`
- Disputas formales: `legal@neomaaa.com`
- Direccion: Hamchako, Mutsamudu, Anjouan, Union of Comoros.

---

[PENDIENTE: texto legal final desde neomaaa.com/about/legal-documentation]
[APY base y por plazo, penalidades exactas de early withdrawal, frecuencia de payout, minimos y maximos, y fee administrativo: segun politica interna definida por Finance y aprobada por los Principals antes de publicar la version cliente-facing.]
