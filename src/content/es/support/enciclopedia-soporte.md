# Enciclopedia de Soporte -- NEOMAAA Markets

> Base de **conocimiento de producto** para el equipo de soporte: qué responderle al cliente sobre cuentas, KYC, depositos, retiros, MT5, trading, spreads, leverage, instrumentos, reglas, seguridad y Vault Yield. Informacion oficial basada en help.neomaaa.com. Documento interno -- no compartir con clientes.
>
> Para el **proceso operativo** (Intercom, SLAs, escalacion, canned responses, metricas, handoff, checklists diarios, capacitacion) ver el **[Support Playbook](/content/es/support/playbook)**. Playbook = proceso, Enciclopedia = conocimiento.

> **Equipo:** Rocio, Marilyn (soporte/account management), Edward, Franco, Luis (ventas)

> **Ultima actualizacion:** Abril 2026

---

## INDICE

1. [Cuentas y Registro](#1-cuentas-y-registro)
2. [Verificacion KYC](#2-verificacion-kyc)
3. [Depositos](#3-depositos)
4. [Retiros](#4-retiros)
5. [Plataforma MetaTrader 5](#5-plataforma-metatrader-5)
6. [Trading -- Tipos de Ordenes](#6-trading----tipos-de-ordenes)
7. [Spreads, Comisiones y Swaps](#7-spreads-comisiones-y-swaps)
8. [Apalancamiento y Margen](#8-apalancamiento-y-margen)
9. [Instrumentos y Horarios](#9-instrumentos-y-horarios)
10. [Reglas de Trading](#10-reglas-de-trading)
11. [Seguridad](#11-seguridad)
12. [Vault Yield System](#12-vault-yield-system)
13. [Problemas Frecuentes y Soluciones](#13-problemas-frecuentes-y-soluciones)
14. [Contacto y Canales Cliente-Facing](#14-contacto-y-canales-cliente-facing)

---

## 1. Cuentas y Registro

### 1.1 Tipos de Cuenta

NEOMAAA ofrece cuatro tipos de cuenta con especificaciones diferentes:

| Tipo de Cuenta | Deposito Minimo | Apalancamiento Maximo | Spreads | Comision | Ideal Para |
|---|---|---|---|---|---|
| **Cent** | $5 | Hasta 1:1000 | Desde 1.0 pips | Ninguna | Principiantes y prueba de estrategias |
| **Standard** | $50 | Hasta 1:500 | Desde 1.0 pips | Ninguna | Trading diario |
| **Raw** | $500 | Hasta 1:200 | Desde 0.0 pips | $3 por lote por lado | Traders profesionales |
| **Institucional** | Contactar | Personalizado | Personalizado | Personalizado | Clientes institucionales |

**Que decirle al cliente:**

- "Si eres nuevo en trading, te recomendamos comenzar con una cuenta Cent -- puedes empezar con tan solo $5 y probar tus estrategias con riesgo minimo."
- "Si ya tienes experiencia, la cuenta Standard es ideal para trading diario sin comisiones adicionales."
- "Para traders profesionales que buscan los spreads mas bajos del mercado, la cuenta Raw ofrece spreads desde 0.0 pips con una comision fija de $3 por lote por lado."
- "Para instituciones o volumen alto, tenemos cuentas Institucionales con condiciones personalizadas -- coordinamos una llamada con nuestro equipo comercial."

### 1.2 Como Crear una Cuenta

**Pasos oficiales:**

1. Ir al sitio web de NEOMAAA y hacer clic en el boton "Registrarse" en la esquina superior derecha
2. Ingresar la informacion requerida:
   - Nombre legal completo (tal como aparece en la identificacion)
   - Direccion de correo electronico
   - Numero de telefono
   - Pais de residencia
   - Contrasena
3. Verificar el correo electronico haciendo clic en el enlace de confirmacion
4. Subir documentos de verificacion:
   - Identificacion oficial con foto (pasaporte, licencia de conducir o cedula nacional)
   - Comprobante de domicilio (recibo de servicios o extracto bancario, con fecha de los ultimos 3 meses)
5. Esperar la verificacion (tipicamente hasta 24 horas)
6. Una vez verificado, iniciar sesion en el Portal de Cliente y realizar el primer deposito

**Que decirle al cliente:**

- "El proceso de registro es rapido -- solo necesitas tu informacion personal y dos documentos. En menos de 24 horas tu cuenta estara lista."
- "Puedes empezar el registro desde nuestro sitio web en neomaaa.com haciendo clic en Registrarse."
- "Una vez registrado, revisa tu correo electronico para confirmar tu cuenta y luego sube tus documentos desde el Portal de Cliente."

### 1.3 Gestion de Multiples Cuentas de Trading

NEOMAAA permite abrir y administrar multiples cuentas de trading bajo un solo perfil de cliente.

**Razones para tener multiples cuentas:**
- Separar estrategias (ej. scalping vs. swing trading)
- Probar diferentes tipos de cuenta (Cent, Standard, Raw)
- Mantener trading automatizado (EA) separado del manual
- Gestionar riesgo en diferentes portafolios

**Como abrir una cuenta adicional:**

1. Iniciar sesion en el Portal de Cliente en account.neomaaa.com
2. Ir a Trading > Trading Accounts
3. En "Add a new account", la plataforma esta configurada en MetaTrader 5
4. Seleccionar el tipo de cuenta desde el menu desplegable
5. Establecer una contrasena para la nueva cuenta de trading
6. Confirmar -- la cuenta se crea de forma instantanea
7. La nueva cuenta aparece en la tabla "Your trading accounts"

**Transferencias internas entre cuentas:**

1. Ir a Payments > Internal Transfer
2. Seleccionar cuenta de origen y cuenta de destino
3. Ingresar el monto de la transferencia
4. Confirmar la transferencia

**Reglas de transferencias internas:**
- Solo disponibles entre cuentas registradas bajo el mismo perfil de cliente
- Transferencias a terceros estan estrictamente prohibidas
- Los fondos deben estar disponibles como margen libre antes de transferir
- Las transferencias no pueden completarse si reducen la cuenta por debajo del margen minimo o afectan negativamente posiciones abiertas

**Que decirle al cliente:**

- "Puedes tener varias cuentas de trading -- por ejemplo, una Cent para probar y una Standard para operar en serio. Las abres desde tu Portal de Cliente en segundos."
- "Si quieres mover fondos entre tus cuentas, ve a Pagos > Transferencia Interna. Es instantaneo y sin costo."
- "Las transferencias solo se pueden hacer entre tus propias cuentas. No es posible transferir a cuentas de otras personas."

### 1.4 Inactividad de Cuenta

**Definicion:** Una cuenta se considera inactiva si no ha habido actividad comercial (apertura, cierre o modificacion de operaciones) durante 30 dias consecutivos.

**Comisiones por inactividad:** Se pueden aplicar comisiones estandar por inactividad despues de 30 dias sin actividad de trading. Los detalles especificos estan en el Acuerdo del Cliente.

**Como reactivar una cuenta inactiva:**

1. Iniciar sesion en el Portal de Cliente
2. Contactar a Soporte para solicitar reactivacion
3. Posiblemente actualizar documentos KYC expirados
4. Realizar un deposito para llevar la cuenta por encima del saldo minimo

**Prevencion:** Realizar al menos una operacion dentro de cada periodo de 30 dias.

**Que decirle al cliente:**

- "Para mantener tu cuenta activa, solo necesitas realizar al menos una operacion cada 30 dias."
- "Si tu cuenta fue marcada como inactiva, contactanos y te ayudamos a reactivarla. Puede que necesites actualizar tus documentos si estan vencidos."
- "Si no planeas operar por un tiempo, considera cerrar posiciones y retirar fondos para evitar cargos por inactividad."

### 1.5 Cierre de Cuenta

**Antes de cerrar:**
- Cerrar todas las posiciones abiertas (no se puede cerrar con operaciones activas)
- Retirar todos los fondos mediante solicitud de retiro
- Cancelar todas las ordenes pendientes

**Como solicitar el cierre:**
- Enviar solicitud a [email protected] con el pedido de cierre

**Despues del cierre:**
- La cuenta se desactiva -- no se puede iniciar sesion en MT5 con esas credenciales
- Los fondos restantes se devuelven al metodo de deposito mas reciente
- Los datos personales se conservan segun regulaciones financieras
- Se puede abrir una nueva cuenta en el futuro si se desea

**Cierre de sub-cuentas individuales:**
- Si se cierra una de varias cuentas de trading, especificar el numero de cuenta
- El perfil del Portal de Cliente y las demas cuentas permanecen activas

**Que decirle al cliente:**

- "Para cerrar tu cuenta, primero cierra todas tus posiciones y retira tus fondos. Luego envianos un correo a [email protected] solicitando el cierre."
- "Si solo quieres cerrar una de tus cuentas de trading pero mantener las demas, indicanos el numero de cuenta especifico."
- "Tus datos se conservan por obligaciones regulatorias, pero tu cuenta quedara completamente desactivada."

### 1.6 Cambio de Contrasena

**Contrasena del Portal de Cliente:**

1. Iniciar sesion en el Portal de Cliente en account.neomaaa.com
2. Ir a Settings > Security
3. En "Change Customer Portal Password", ingresar la contrasena anterior
4. Ingresar la nueva contrasena y confirmar
5. Hacer clic en Submit

**Contrasena de Trading MT5 (desde Portal de Cliente):**

1. Iniciar sesion en el Portal de Cliente
2. Ir a Settings > Security
3. Desplazarse a "Change Trading Account Password"
4. Seleccionar la cuenta de trading desde el menu desplegable
5. Ingresar y confirmar la nueva contrasena
6. Hacer clic en Submit

**Contrasena de Trading MT5 (desde MT5):**

1. Abrir MetaTrader 5
2. Ir a Tools > Options > Server
3. Hacer clic en Change Password
4. Ingresar contrasena actual y nueva
5. Hacer clic en Accept

**Metodo alternativo:** Cambiar la contrasena de MT5 desde el Portal de Cliente en Accounts > [Tu Cuenta] > Change Password.

**Recuperacion de contrasena olvidada:**

1. Ir a la pagina de inicio de sesion de NEOMAAA
2. Hacer clic en "Olvide mi contrasena"
3. Ingresar el correo electronico registrado
4. Revisar la bandeja de entrada para el enlace de restablecimiento
5. Seguir el enlace para establecer una nueva contrasena

**Recomendaciones de seguridad:**
- Usar al menos 8 caracteres combinando mayusculas, minusculas, numeros y caracteres especiales
- No reutilizar contrasenas de otros sitios web
- Cambiar la contrasena regularmente

**Que decirle al cliente:**

- "Puedes cambiar tu contrasena del Portal de Cliente desde Settings > Security. Para la contrasena de MT5, puedes hacerlo desde el Portal o directamente desde la plataforma."
- "Si olvidaste tu contrasena, haz clic en 'Olvide mi contrasena' en la pagina de login y te enviaremos un enlace de restablecimiento a tu correo."
- "Te recomendamos usar una contrasena fuerte con al menos 8 caracteres, mezclando mayusculas, minusculas, numeros y simbolos."

**Cuando escalar:** Si el cliente no recibe el correo de restablecimiento despues de verificar spam, escalar al equipo tecnico. Si sospecha acceso no autorizado a su cuenta, escalar inmediatamente a compliance.

---

## 2. Verificacion KYC

### 2.1 Documentos Requeridos

**Documento 1: Prueba de Identidad (POI)**

Documentos aceptados (deben estar vigentes, no vencidos):
- **Pasaporte** -- mostrando nombre completo, foto, fecha de nacimiento y fecha de vencimiento
- **Licencia de conducir** -- ambos lados mostrando nombre completo y foto
- **Cedula nacional de identidad** -- ambos lados

**Requisitos de la imagen:**
- El documento debe estar vigente (no vencido)
- Las cuatro esquinas del documento deben ser visibles
- La foto y el texto deben ser claros y legibles
- Ninguna parte del documento debe estar cubierta u oculta

**Documento 2: Prueba de Domicilio (POA)**

Documentos aceptados (fechados dentro de los ultimos 3 meses / 90 dias):
- **Recibo de servicios** -- electricidad, agua, gas, internet o telefono
- **Extracto bancario** -- de banco reconocido mostrando nombre y direccion
- **Carta gubernamental** -- aviso fiscal, carta municipal u otra correspondencia oficial

**Requisitos:**
- Debe mostrar nombre completo y direccion residencial
- Debe estar fechado dentro de los ultimos 90 dias
- Debe ser emitido por una institucion reconocida
- Se aceptan capturas de pantalla de cuentas digitales si contienen toda la informacion requerida

**Documentos NO aceptados:**
- Capturas de pantalla de facturas de telefono movil sin encabezados oficiales
- Documentos escritos a mano
- Documentos en idiomas no verificables (contactar Soporte para orientacion)
- Documentos vencidos

**Que decirle al cliente:**

- "Necesitas dos documentos: una identificacion oficial con foto (pasaporte, licencia o cedula) y un comprobante de domicilio reciente (recibo de servicios o extracto bancario de los ultimos 3 meses)."
- "Asegurate de que tu identificacion este vigente y que se vean las cuatro esquinas en la foto."
- "El comprobante de domicilio debe tener tu nombre, direccion y una fecha dentro de los ultimos 90 dias."
- "Si tu recibo es digital, puedes usar una captura de pantalla siempre que muestre toda la informacion requerida."

### 2.2 Como Enviar los Documentos

**Proceso paso a paso:**

1. Iniciar sesion en el Portal de Clientes NEOMAAA
2. Navegar a la seccion Verificacion o KYC
3. Se encuentran dos areas de carga: Prueba de Identidad y Prueba de Domicilio
4. Hacer clic en Cargar para cada tipo de documento
5. Seleccionar el archivo desde el dispositivo (foto o escaneo)
6. Asegurarse de que la imagen sea clara y todas las esquinas sean visibles
7. Hacer clic en Enviar para enviar los documentos para revision

**Formatos aceptados:** JPEG/JPG, PNG, PDF

**Tamano maximo:** 10 MB por documento

**Consejos para una buena imagen:**
- Usar buena iluminacion al fotografiar documentos
- Evitar reflejos o sombras
- Asegurar que todo el texto sea legible
- Incluir las cuatro esquinas del documento en las fotos
- No usar filtros ni editar las imagenes

**Que decirle al cliente:**

- "Sube tus documentos desde el Portal de Cliente en la seccion de Verificacion. Solo acepta archivos JPEG, PNG o PDF de hasta 10 MB."
- "Toma una foto clara con buena luz, sin sombras ni reflejos. Asegurate de que se vean las cuatro esquinas del documento."
- "No edites ni apliques filtros a las imagenes -- esto puede causar que sean rechazadas."

### 2.3 Tiempos de Procesamiento de Verificacion

| Situacion | Tiempo Esperado |
|---|---|
| Documentos claros y completos | Hasta **24 horas** |
| Se necesita informacion adicional | **1-3 dias habiles** |
| Periodos de alto volumen | Hasta **48 horas** |

**Como verificar el estado:**

1. Iniciar sesion en el Portal de Cliente
2. Ir a la seccion de Verificacion
3. Ver el estado de cada documento:
   - **Pendiente** -- En revision
   - **Aprobado** -- Verificacion completada
   - **Rechazado** -- Documento no aceptado (se proporciona razon)

### 2.4 Documentos Rechazados -- Causas Comunes

- La imagen esta borrosa o ilegible
- El documento ha vencido
- El nombre en el documento no coincide con el registro de la cuenta
- La direccion no es claramente visible
- El documento no es un tipo aceptado

**Solucion:** Subir un nuevo documento que cumpla con los requisitos. El proceso de revision se reinicia.

**Que decirle al cliente:**

- "Tu documento fue rechazado por [razon]. Necesitas subir uno nuevo que cumpla con los requisitos."
- "Si la imagen estaba borrosa, intenta tomar una nueva foto con mejor iluminacion y asegurandote de que todo el texto sea legible."
- "Si tu documento vencio, necesitas subir uno vigente."
- "Si el nombre no coincide, verifica que el nombre en tu cuenta sea exactamente el mismo que aparece en tu identificacion."

### 2.5 Preguntas Frecuentes sobre KYC

**P: Puedo operar mientras se procesa mi KYC?**
R: No. Se debe completar la verificacion antes de poder depositar fondos o abrir operaciones en vivo. Sin embargo, se puede utilizar una cuenta demo durante este periodo.

**P: Mis datos personales estan seguros?**
R: Si. NEOMAAA utiliza encriptacion y almacenamiento seguro para proteger documentos y datos personales. La organizacion cumple con regulaciones de proteccion de datos y no comparte informacion con terceros no autorizados.

**P: Vivo en un pais con escritura no latina. Puedo presentar documentos en mi idioma?**
R: En la mayoria de los casos, si. Si el equipo de compliance no puede verificar documentos en un idioma especifico, pueden solicitar una traduccion certificada.

**P: Puedo verificar mi identidad usando una selfie?**
R: NEOMAAA puede solicitar una selfie sosteniendo el documento de identidad como un paso de verificacion adicional. Esto se solicita tipicamente cuando existen discrepancias o para verificacion de seguridad mejorada.

**P: Mi nombre en mi documento de identidad es diferente del nombre de mi cuenta bancaria. Es un problema?**
R: El nombre en la cuenta NEOMAAA debe coincidir con el documento de identidad. Si los datos bancarios difieren, los retiros pueden experimentar retrasos. Soporte puede ayudar a resolver discrepancias de nombre.

**Que decirle al cliente:**

- "Mientras procesamos tu verificacion, puedes usar una cuenta demo para familiarizarte con la plataforma."
- "Tus documentos estan completamente seguros. Usamos encriptacion de datos y cumplimos con todas las regulaciones de proteccion de datos."
- "Si tus documentos estan en otro idioma, en la mayoria de los casos los aceptamos. Si necesitamos una traduccion certificada, te lo haremos saber."

**Cuando escalar:**
- Si el cliente tiene documentos en idiomas inusuales o no verificables -- escalar a compliance
- Si hay discrepancias graves entre el nombre del documento y la cuenta -- escalar a compliance
- Si el cliente reporta que alguien mas abrio una cuenta con su identidad -- escalar inmediatamente a compliance y seguridad
- Si la verificacion tarda mas de 48 horas en periodo normal -- escalar al supervisor de operaciones

---

## 3. Depositos

### 3.1 Metodos de Deposito y Tiempos de Procesamiento

| Metodo | Tiempo de Procesamiento | Deposito Minimo | Comision NEOMAAA |
|---|---|---|---|
| Visa / Mastercard | Instantaneo (hasta 30 min en casos excepcionales) | Varia segun tipo de cuenta | **Gratis** |
| Billeteras electronicas (E-wallets) | Instantaneo | Varia segun tipo de cuenta | **Gratis** |
| Criptomonedas (BTC, ETH, USDT) | 1-6 confirmaciones de red (10 min a 1 hora) | Varia segun tipo de cuenta | **Gratis** |
| Transferencia bancaria internacional | 1-3 dias habiles | Varia segun tipo de cuenta | **Gratis** |
| Transferencia bancaria local | 1-2 dias habiles | Varia segun tipo de cuenta | **Gratis** |

**Deposito minimo por tipo de cuenta:**
- Cuenta Cent: $5
- Cuenta Standard: $50
- Cuenta Raw: $500

**Nota importante:** NEOMAAA no cobra comisiones de deposito en ningun metodo. Sin embargo, bancos o proveedores de pago pueden cobrar sus propias comisiones (transferencias internacionales, conversion de moneda). Estas comisiones no son controladas por NEOMAAA.

**No hay limite maximo de deposito.**

### 3.2 Como Realizar un Deposito -- Paso a Paso

1. Iniciar sesion en el Portal de Cliente NEOMAAA en account.neomaaa.com
2. Dirigirse a Payments > Deposit (o hacer clic en "+ Fondear Cuenta" en la esquina superior derecha)
3. La cuenta de trading estara preseleccionada -- cambiarla desde el menu desplegable si es necesario
4. Elegir la opcion de pago desde "Opciones de Pago Disponibles":
   - **nowPayment** -- Pagos con criptomonedas (TRC20 y otras redes)
   - **PayRetailers** -- Pasarela de pago en linea (disponibilidad regional)
5. Ingresar el monto del deposito
6. Hacer clic en "Fondear Cuenta"
7. Seguir las instrucciones del proveedor de pago para completar la transaccion

### 3.3 Notas Importantes sobre Depositos

- Todos los depositos a NEOMAAA son gratuitos
- El deposito debe provenir de una cuenta o metodo de pago registrado a nombre del cliente
- Para cuentas Cent, un deposito se convierte automaticamente a centavos (ej: $50 = 5,000 centavos)
- La disponibilidad de metodos de pago puede variar segun la jurisdiccion o ubicacion geografica
- No hay limite maximo de deposito

### 3.4 Conversion de Divisas

**Monedas base por tipo de cuenta:**
- Cuenta Cent: CNT (centavos -- $1 = 100 CNT)
- Cuenta Standard: USD
- Cuenta Raw: USD

**Al depositar en moneda diferente a USD:**
- La plataforma convierte los fondos al tipo de cambio actual usando tasas interbancarias competitivas
- Ejemplo: Depositar EUR100 desde una tarjeta en euros a un tipo de cambio de 1.10 se convierte en $110 USD en la cuenta

**Al retirar en moneda diferente a USD:**
- Se aplica la conversion al tipo de cambio vigente al momento del procesamiento

**Recomendaciones:**
- Depositar y retirar en USD cuando sea posible para evitar comisiones de conversion bancaria
- Monitorear tipos de cambio cuando se usen monedas que no sean USD
- Los depositos en criptomonedas se convierten a USD al tipo de cambio del mercado al momento de la confirmacion

### 3.5 Solucion de Problemas con Depositos

**Deposito no aparece en la cuenta:**

1. Esperar algunos minutos -- algunos metodos (especialmente criptomonedas) pueden tomar tiempo
2. Verificar el estado del pago -- confirmar que la transaccion se completo desde el banco o billetera
3. Verificar la cuenta correcta -- asegurarse de haber depositado en la cuenta de trading correcta
4. Verificar el minimo -- los montos por debajo del minimo seran rechazados

**Pago con tarjeta rechazado -- causas comunes:**
- Fondos insuficientes
- Tarjeta no habilitada para pagos en linea o internacionales
- Fallo en la autenticacion 3D Secure
- Limite de gasto diario alcanzado
- Banco bloqueo la transaccion (contactar al banco)

**Deposito de criptomonedas no acreditado:**
- Verificar confirmaciones -- la mayoria requieren 1-6 confirmaciones de red
- Verificar la red correcta -- enviar USDT en la red incorrecta (ej. ERC-20 a una direccion TRC-20) puede resultar en perdida de fondos
- Verificar la direccion de billetera -- siempre copiar la direccion desde el Portal de Cliente

**ADVERTENCIA CRITICA:** Enviar criptomonedas a la red o direccion incorrecta puede resultar en perdida permanente de fondos.

**Cargos duplicados con tarjeta:**
- Esperar 24 horas -- los cargos duplicados generalmente se revierten automaticamente

**Si el problema persiste, el cliente debe contactar soporte con:**
- Numero de cuenta
- Metodo de pago utilizado
- Monto y fecha de la transaccion
- ID de transaccion o numero de referencia
- Captura de pantalla de la confirmacion de pago

**Que decirle al cliente:**

- "Todos los depositos en NEOMAAA son gratuitos. Puedes depositar con tarjeta, criptomonedas o transferencia bancaria."
- "El deposito con tarjeta es instantaneo. Si usas criptomonedas, puede tomar de 10 minutos a 1 hora dependiendo de las confirmaciones de red."
- "Si tu deposito no aparece, primero verifica que la transaccion se completo en tu banco o billetera. Si usas cripto, verifica las confirmaciones en el blockchain."
- "Si tu tarjeta fue rechazada, contacta a tu banco para asegurarte de que este habilitada para pagos internacionales."
- "MUY IMPORTANTE: Si depositas criptomonedas, verifica que estes usando la red correcta. Enviar a la red equivocada puede resultar en perdida de fondos y no podemos recuperarlos."

**Cuando escalar:**
- Deposito no acreditado despues de 24 horas con confirmacion de pago exitoso -- escalar a finanzas
- Cliente reporta criptomonedas enviadas a red incorrecta -- escalar a finanzas (generalmente irrecuperable, documentar el caso)
- Cargos duplicados que no se revierten en 48 horas -- escalar a finanzas
- Sospechas de deposito fraudulento o con tarjeta robada -- escalar inmediatamente a compliance

---

## 4. Retiros

### 4.1 Como Retirar Fondos -- Paso a Paso

1. Iniciar sesion en el Portal de Clientes NEOMAAA
2. Ir a Withdrawal o Funds > Withdraw
3. Seleccionar la cuenta de trading desde la cual se desea retirar
4. Elegir el metodo de retiro
5. Ingresar el monto
6. Confirmar la solicitud

### 4.2 Politicas de Retiro

**Cumplimiento AML (Anti-Lavado de Dinero):**
- El primer retiro DEBE ser dirigido al mismo metodo utilizado para el deposito
- Una vez que el monto del deposito inicial se devuelve al metodo original, las ganancias se pueden retirar a cualquier metodo elegido

**Sin limite maximo de retiro.**

**Conversion en cuentas Cent:** Al retirar de una cuenta Cent, el monto se convierte automaticamente (ej: 10,000 centavos = $100 USD).

### 4.3 Tiempos de Procesamiento de Retiros

Las solicitudes de retiro se procesan durante horas habiles (lunes a viernes).

**Etapas del procesamiento:**

| Etapa | Tiempo |
|---|---|
| Procesamiento interno NEOMAAA | Hasta 1 dia habil |
| Procesamiento del proveedor de pago | Varia segun metodo |

**Tiempo total por metodo:**

| Metodo | Tiempo Total Esperado |
|---|---|
| Billeteras electronicas | 1-2 dias habiles |
| Criptomonedas | 1-2 dias habiles |
| Tarjeta de credito/debito | 1-5 dias habiles |
| Transferencia bancaria internacional | 3-5 dias habiles |

### 4.4 Comisiones de Retiro

| Metodo | Comision |
|---|---|
| Tarjetas bancarias (Visa/Mastercard) | Gratis |
| Criptomonedas | 1% (0.5% para cuentas Raw), minimo $10 |
| Transferencia bancaria internacional | $25 por retiro (primer retiro del mes gratis para Standard; primeros 3 gratis para Raw) |
| Transferencia bancaria local | Varia segun region |

### 4.5 Causas Comunes de Retraso en Retiros

**KYC no completado o vencido:** La verificacion debe estar actualizada antes de procesar retiros.

**Primer retiro no coincide con metodo de deposito:** Las regulaciones AML requieren que los retiros iniciales se devuelvan al mismo metodo de pago usado para depositar. Intentar un metodo diferente puede resultar en bloqueos.

**Margen libre insuficiente:** Si la mayor parte del saldo esta en uso por posiciones abiertas, no se puede retirar el monto completo. Cerrar posiciones o reducir tamanos de lote para liberar fondos.

**Fines de semana o dias festivos:** Las solicitudes enviadas durante dias no habiles se procesan el siguiente dia habil.

**Revision de seguridad:** Las solicitudes de retiro inusuales o grandes pueden desencadenar una revision de seguridad adicional que puede tomar 1-2 dias habiles extra.

### 4.6 Como Verificar el Estado del Retiro

1. Iniciar sesion en el Portal de Cliente
2. Ir a Withdrawal History o Transaction History
3. Verificar el estado de la solicitud:
   - **Pending** -- En espera
   - **Processing** -- En procesamiento
   - **Completed** -- Completado
   - **Rejected** -- Rechazado

### 4.7 Retiro Rechazado -- Causas Comunes

- Detalles de retiro incorrectos
- Metodo de pago no verificado
- Documentos KYC vencidos
- Exceder limites de retiro

**Solucion:** Corregir el problema y volver a enviar la solicitud, o contactar soporte.

**Que decirle al cliente:**

- "Para retirar, inicia sesion en el Portal de Cliente y ve a la seccion de Retiros. Selecciona tu cuenta, el metodo y el monto."
- "Por normativa AML, tu primer retiro debe ir al mismo metodo con el que depositaste. Una vez devuelto el deposito original, las ganancias las puedes retirar donde quieras."
- "El procesamiento interno toma hasta 1 dia habil. El tiempo total depende del metodo: criptomonedas y e-wallets son 1-2 dias, tarjetas 1-5 dias, transferencia bancaria 3-5 dias."
- "Si tu retiro fue rechazado, revisa si tus documentos KYC estan vigentes y que los datos del metodo de retiro sean correctos."
- "Si tienes posiciones abiertas que estan usando tu margen, puede que no puedas retirar el monto completo. Cierra algunas posiciones primero."

**Cuando escalar:**
- Retiro pendiente por mas de 3 dias habiles sin explicacion -- escalar a finanzas
- Cliente exige retiro urgente por emergencia -- escalar al supervisor
- Retiro rechazado sin razon clara en el sistema -- escalar a finanzas
- Solicitud de retiro a metodo diferente al de deposito y el cliente insiste -- escalar a compliance
- Retiro de monto grande (>$10,000) con revision de seguridad -- informar al cliente del plazo adicional y monitorear

---

## 5. Plataforma MetaTrader 5

### 5.1 Que es MetaTrader 5

MetaTrader 5 es una plataforma de trading multi-activos desarrollada por MetaQuotes Software. Ofrece graficos avanzados, analisis tecnico, capacidades de trading automatizado y acceso a todos los instrumentos de NEOMAAA a traves de una interfaz unificada.

**Caracteristicas principales:**
- **Graficos avanzados:** 21 marcos de tiempo, 80+ indicadores incorporados y ventanas de graficos ilimitadas
- **Tipos de ordenes:** Market, limit, stop, stop-limit y trailing stop
- **Profundidad de mercado (DOM):** Visibilidad de niveles bid/ask en tiempo real
- **One-Click Trading:** Ejecucion instantanea directamente desde graficos
- **Trading algoritmico:** Crear y ejecutar Expert Advisors (EAs) usando lenguaje de programacion MQL5
- **Calendario economico:** Calendario integrado con eventos economicos proximos
- **Probador de estrategias:** Backtesting de estrategias con datos historicos
- **Multi-dispositivo:** Disponible en Windows, macOS, iOS, Android y navegador web

**Instrumentos disponibles en MT5 con NEOMAAA:**
- Mas de 50 pares de divisas forex
- Metales (oro, plata)
- Indices (US30, US500, NAS100, GER40, UK100)
- Materias primas (petroleo, gas natural)
- Criptomonedas (BTC/USD, ETH/USD y otros)
- Acciones y ETFs (solo cuentas Raw)

### 5.2 Como Descargar e Instalar MT5

**Windows:**
1. Ir al sitio web de NEOMAAA > Platform and Tools
2. Hacer clic en "Download MetaTrader 5 for Windows"
3. Ejecutar el archivo instalador descargado
4. Seguir el asistente de instalacion
5. Abrir MT5 desde el escritorio

**macOS:**
1. Visitar el sitio web de NEOMAAA o la Mac App Store
2. Descargar MetaTrader 5 para macOS
3. Arrastrar la aplicacion a la carpeta Applications
4. Abrir y permitir permisos si macOS los solicita

**iOS (iPhone/iPad):**
1. Abrir la App Store
2. Buscar "MetaTrader 5"
3. Tocar "Get" para instalar
4. Abrir la app e iniciar sesion con las credenciales NEOMAAA

**Android:**
1. Abrir Google Play Store
2. Buscar "MetaTrader 5"
3. Tocar "Install"
4. Abrir la app e iniciar sesion

**Terminal Web (sin descarga):**
1. Ir al sitio web de NEOMAAA
2. Hacer clic en "Web Terminal" bajo Platform and Tools
3. Iniciar sesion con las credenciales de la cuenta
4. Comenzar a operar directamente en el navegador

**Que decirle al cliente:**

- "Puedes descargar MT5 desde nuestro sitio web en la seccion Platform and Tools. Esta disponible para Windows, Mac, iPhone, Android, y tambien puedes usarlo directo desde el navegador sin descargar nada."
- "Si usas Mac y te pide permisos, es normal -- solo acepta y la aplicacion funcionara correctamente."
- "Si prefieres no instalar nada, usa nuestro Web Terminal directamente desde el navegador."

### 5.3 Como Iniciar Sesion en MT5

**Primer inicio de sesion:**

1. Abrir MetaTrader 5
2. Ir a File > Login to Trade Account
3. Ingresar los datos:
   - **Login:** Numero de cuenta (visible en el Portal de Cliente bajo Trading Accounts)
   - **Password:** Contrasena de trading de MT5 (establecida al crear la cuenta)
   - **Server:** mt5.neomaaa.com (usado para cuentas Live y Demo)
4. Hacer clic en OK

Si el servidor de NEOMAAA no aparece en la lista, escribir manualmente "mt5.neomaaa.com" en el campo de servidor.

**Guardar credenciales:** Marcar "Save Password" para no ingresar credenciales cada vez. Usar esta opcion solo en dispositivos personales y seguros.

**Cambiar entre cuentas:**
1. Ir a File > Login to Trade Account
2. Ingresar las credenciales de la otra cuenta
3. Hacer clic en OK

**Nota importante:** Solo una cuenta por instancia de MT5 puede estar activa a la vez. Abrir multiples ventanas de MT5 para monitorear varias cuentas simultaneamente.

**Que decirle al cliente:**

- "Para iniciar sesion en MT5, abre la plataforma, ve a File > Login to Trade Account. Tu numero de login lo encuentras en tu Portal de Cliente bajo Trading Accounts."
- "El servidor es mt5.neomaaa.com -- si no aparece en la lista, escribelo manualmente."
- "Si quieres ver varias cuentas a la vez, abre varias ventanas de MT5 e inicia sesion con diferentes credenciales en cada una."

### 5.4 Expert Advisors (EAs)

**Que son:** Scripts escritos en el lenguaje de programacion MQL5 que automatizan estrategias de trading. Pueden analizar mercados, abrir y cerrar posiciones, gestionar riesgo y operar continuamente sin intervencion manual.

**Como instalar un EA:**

1. Descargar el archivo del EA (.ex5 o .mq5)
2. En MetaTrader 5, ir a File > Open data folder
3. Navegar a MQL5 > Experts
4. Copiar el archivo del EA en esta carpeta
5. Reiniciar MT5 o hacer clic derecho en el panel Navigator y seleccionar Refresh
6. El EA aparecera bajo Experts en el Navigator

**Como ejecutar un EA:**

1. Abrir un grafico del instrumento que el EA va a operar
2. Arrastrar el EA desde el panel Navigator al grafico
3. En la ventana de configuracion:
   - Marcar "Allow algorithmic trading"
   - Configurar los parametros de entrada del EA
4. Hacer clic en OK
5. Asegurarse de que el boton AutoTrading en la barra de herramientas este habilitado (verde)

**Notas importantes:**
- Los EAs son compatibles con todos los tipos de cuenta NEOMAAA
- Para operacion continua 24/5 del EA, considerar usar un VPS (gratis para clientes Raw calificados)
- Siempre probar el EA en una cuenta Demo o Cent antes de usarlo en Standard o Raw
- Monitorear el EA regularmente -- las condiciones del mercado cambian

**Que decirle al cliente:**

- "Si, los EAs estan permitidos en todas las cuentas de NEOMAAA. Puedes usarlos libremente."
- "Para instalar tu EA, ve a File > Open data folder en MT5, luego a MQL5 > Experts y copia el archivo ahi."
- "Asegurate de que el boton de AutoTrading este en verde y que 'Allow algorithmic trading' este marcado en las propiedades del EA."
- "Te recomendamos probar cualquier EA primero en una cuenta Demo o Cent antes de usarlo en tu cuenta principal."

### 5.5 VPS para MT5

**Que es un VPS:** Un servidor remoto que ejecuta MetaTrader 5 de forma continua. Esencial para traders que utilizan Expert Advisors o necesitan conexion ininterrumpida.

**Beneficios:**
- **Disponibilidad 24/7:** Los EAs se ejecutan continuamente sin interrupciones
- **Baja latencia:** Servidores ubicados cerca de los servidores de trading de NEOMAAA
- **Sin dependencia de energia/internet:** Funciona incluso si la conexion del cliente se interrumpe
- **Acceso desde cualquier lugar:** Conectarse desde cualquier dispositivo

**VPS gratuito para clientes de cuenta Raw que:**
- Mantengan un saldo minimo de $5,000, O
- Negocien al menos 100 lotes por mes

El acceso al VPS se habilita automaticamente cuando se cumplen los criterios.

**Como configurar:**

1. Si es elegible, recibira los detalles de acceso al VPS por correo electronico
2. Usar Escritorio Remoto (Windows) o cualquier cliente RDP para conectarse
3. Instalar MT5 en el VPS
4. Iniciar sesion con la cuenta NEOMAAA
5. Configurar los EAs y dejarlos en ejecucion

**Que decirle al cliente:**

- "Si tienes cuenta Raw y mantienes un saldo de $5,000 o negocias al menos 100 lotes mensuales, tienes VPS gratuito. Se activa automaticamente."
- "El VPS es ideal si usas EAs -- tu robot sigue operando 24/7 aunque apagues tu computadora."
- "Si no calificas para VPS gratuito, puedes contratar uno por tu cuenta -- cualquier proveedor de VPS funciona con MT5."

**Cuando escalar:**
- Problemas tecnicos con el VPS proporcionado por NEOMAAA -- escalar al equipo tecnico
- Cliente cumple los requisitos pero no ha recibido acceso al VPS -- escalar a operaciones

---

## 6. Trading -- Tipos de Ordenes

### 6.1 Ordenes de Mercado

Una orden de mercado se ejecuta inmediatamente al precio de mercado actual.

- **Compra (Buy):** Abre una posicion larga al precio de demanda (ask) actual
- **Venta (Sell):** Abre una posicion corta al precio de oferta (bid) actual

Se utilizan cuando se desea entrar en una operacion de inmediato.

### 6.2 Ordenes Pendientes

Instrucciones para abrir una posicion cuando el precio alcanza un nivel especifico:

| Tipo de Orden | Descripcion | Uso Tipico |
|---|---|---|
| **Buy Limit** | Compra a un precio POR DEBAJO del actual | Esperas que baje a un nivel y rebote hacia arriba |
| **Sell Limit** | Venta a un precio POR ENCIMA del actual | Esperas que suba a un nivel y se revierta hacia abajo |
| **Buy Stop** | Compra a un precio POR ENCIMA del actual | Esperas una ruptura por encima de resistencia |
| **Sell Stop** | Venta a un precio POR DEBAJO del actual | Esperas una ruptura por debajo de soporte |
| **Buy Stop Limit** | Combinacion: coloca un Buy Limit cuando el precio llega al nivel de stop | Estrategias avanzadas |
| **Sell Stop Limit** | Combinacion: coloca un Sell Limit cuando el precio llega al nivel de stop | Estrategias avanzadas |

**Como colocar una orden pendiente:**

1. Presionar F9 en MT5 o hacer clic en Nueva orden
2. Cambiar el tipo de "Market Execution" al tipo de orden pendiente deseado
3. Establecer el precio de entrada, stop loss y take profit
4. Opcionalmente establecer una fecha/hora de vencimiento
5. Hacer clic en Colocar

### 6.3 Stop Loss y Take Profit

**Stop Loss (SL):** Cierra automaticamente la posicion cuando el precio se mueve en contra una cierta cantidad, limitando la perdida.

- Ejemplo: Comprar EUR/USD a 1.1000 con SL en 1.0960 cierra la posicion automaticamente en ese nivel, limitando la perdida a 40 pips.

**Take Profit (TP):** Cierra automaticamente la posicion cuando el precio se mueve a favor, asegurando la ganancia.

- Ejemplo: Comprar EUR/USD a 1.1000 con TP en 1.1080 cierra la posicion con 80 pips de ganancia.

**Como establecer SL y TP:**

Al abrir ordenes nuevas:
- Completar los campos de Stop Loss y Take Profit en la ventana de Nueva Orden antes de colocar la operacion.

Para posiciones existentes:
1. Hacer clic derecho en la posicion abierta en la pestana Trade
2. Seleccionar Modify or Delete
3. Ingresar nuevos niveles de SL y TP
4. Hacer clic en Modify

**Mejores practicas:**
- Siempre usar Stop Loss en cada operacion
- Basar el Stop Loss en estructura de mercado (soporte/resistencia), no en cantidades arbitrarias de pips
- Objetivo minimo de ratio riesgo-recompensa 1:2 (ej: 40 pips SL con 80 pips TP)
- No mover el Stop Loss mas lejos de la entrada para evitar ser cerrado -- esto aumenta el riesgo

### 6.4 Como Abrir, Modificar y Cerrar Operaciones

**Abrir una operacion:**

Metodo 1 -- Ventana de Nueva Orden (F9):
1. Seleccionar el instrumento
2. Elegir el volumen (tamano del lote)
3. Establecer Stop Loss y Take Profit
4. Hacer clic en Buy o Sell

Metodo 2 -- One-Click Trading:
1. Presionar Alt+T en un grafico para habilitar One-Click Trading
2. Ingresar el volumen en el cuadro en la esquina superior izquierda del grafico
3. Hacer clic en Buy o Sell

Metodo 3 -- Clic derecho en el grafico:
1. Hacer clic derecho en el grafico
2. Seleccionar Trading > New Order

**Modificar una operacion:**

1. Ir a la pestana Trade en la caja de herramientas (Ctrl+T)
2. Hacer clic derecho en la posicion a modificar
3. Seleccionar Modify or Delete
4. Cambiar los valores de SL, TP u otros
5. Hacer clic en Modify

**Cerrar una operacion completa:**

1. Ir a la pestana Trade
2. Hacer clic derecho en la posicion
3. Seleccionar Close Position
4. Confirmar

**Cierre parcial:**

1. Hacer clic derecho en la posicion
2. Seleccionar Modify or Delete
3. Cambiar el volumen a menos que el tamano actual
4. Hacer clic en Close

La porcion restante permanece abierta como una posicion separada.

**Que decirle al cliente:**

- "Para abrir una operacion, presiona F9 en MT5, selecciona el instrumento, el volumen, y tus niveles de Stop Loss y Take Profit. Luego haz clic en Buy o Sell."
- "Si quieres operar mas rapido, activa One-Click Trading con Alt+T y podras comprar o vender con un solo clic."
- "Para cerrar una operacion, haz clic derecho en la posicion en la pestana Trade y selecciona Close Position."
- "Siempre te recomendamos usar Stop Loss en todas tus operaciones para proteger tu capital."

**Cuando escalar:**
- Cliente reporta que una operacion se cerro sola sin SL ni TP -- verificar si fue margin call/stop out y escalar a operaciones si no hay explicacion clara
- Cliente reporta que una operacion no se puede cerrar -- verificar si el mercado esta abierto para ese instrumento, si no, escalar a soporte tecnico

---

## 7. Spreads, Comisiones y Swaps

### 7.1 Que es el Spread

El spread es la diferencia entre el precio de oferta (bid - precio al cual se puede vender) y el precio de demanda (ask - precio al cual se puede comprar). Representa el costo principal en cuentas basadas en spread.

Ejemplo: Si EUR/USD bid es 1.1000 y ask es 1.1001, el spread es 1 pip (0.0001).

NEOMAAA ofrece spreads flotantes que se ajustan en tiempo real segun la liquidez y volatilidad del mercado.

### 7.2 Spreads Tipicos por Tipo de Cuenta

| Instrumento | Cent | Standard | Raw |
|---|---|---|---|
| EUR/USD | Desde 1.0 pips | Desde 1.0 pips | Desde 0.0 pips + $3/lote |
| GBP/USD | Desde 1.5 pips | Desde 1.5 pips | Desde 0.5 pips |
| USD/JPY | Desde 1.2 pips | Desde 1.2 pips | Desde 0.4 pips |
| XAU/USD (Oro) | Desde $0.30 | Desde $0.30 | Desde $0.15 |
| US30 | Desde 2.0 puntos | Desde 2.0 puntos | Desde 1.5 puntos |
| BTC/USD | Desde 0.5% | Desde 0.5% | Desde 0.3% |

### 7.3 Cuando se Amplian los Spreads

Los spreads pueden ampliarse durante:
- Publicaciones de noticias economicas
- Horas de apertura/cierre del mercado
- Periodos de baja liquidez
- Eventos de volatilidad extrema
- Gaps de fin de semana

### 7.4 Como Verificar Spreads en Vivo

En MetaTrader 5: hacer clic derecho en el panel Market Watch y seleccionar "Spread" para ver los spreads actuales por instrumento.

### 7.5 Estructura de Comisiones por Tipo de Cuenta

| Tipo de Cuenta | Comision de Trading |
|---|---|
| **Cent** | Ninguna -- todos los costos incluidos en los spreads |
| **Standard** | Ninguna -- todos los costos incluidos en los spreads |
| **Raw** | $3 por lote por lado ($6 round-turn por lote estandar) |

### 7.6 Programa de Reembolso (Rebate) para Cuenta Raw

Los traders activos de cuenta Raw reciben reembolsos basados en volumen mensual:

| Volumen Mensual | Reembolso | Costo Efectivo Round-Turn |
|---|---|---|
| 0-99 lotes | 0% | $6.00 |
| 100-499 lotes | 10% | $5.40 |
| 500-999 lotes | 20% | $4.80 |
| 1,000+ lotes | 30% | $4.20 |

Los reembolsos se acreditan en la cuenta antes del dia 5 del mes siguiente.

### 7.7 Comisiones de Swap (Overnight)

**Que es:** Un cargo o credito que se aplica cuando se mantiene una posicion de trading abierta durante la noche. Refleja las diferencias de tasas de interes entre pares de divisas o costos de financiamiento de CFDs.

**Formula:** Swap = (Tamano del lote x Tamano del contrato x Tasa de swap) / 100 / 365

**Ejemplo:** Mantener 1 lote de EUR/USD con una tasa de swap anual de 0.8% equivale aproximadamente a $2.41 por dia.

**Dias de triple swap:**
- Forex y metales: Miercoles
- Algunos indices y materias primas: Viernes

**Swap positivo vs. negativo:**
- Positivo: Se recibe dinero (posiciones largas en monedas de mayor tasa)
- Negativo: Se paga comision (posiciones largas en monedas de menor tasa)

**Las tasas de swap comienzan desde 0.7% y se actualizan diariamente.**

**Como verificar tasas de swap en MT5:**
1. Abrir el panel Market Watch
2. Hacer clic derecho en el instrumento
3. Seleccionar Specification
4. Desplazarse para ver "Swap Long" y "Swap Short"

### 7.8 Cuentas Sin Swap (Islamicas)

NEOMAAA ofrece cuentas swap-free para clientes cuyas creencias religiosas prohiben el pago o recepcion de intereses. Se aplican comisiones administrativas en lugar de swaps. Disponible bajo solicitud.

### 7.9 Comisiones Adicionales

- **Inactividad de cuenta:** Puede aplicarse despues de 30 dias sin trading
- **Depositos:** Gratis en todos los metodos
- **Retiros:** Varian segun metodo y tipo de cuenta (ver seccion 4.4)
- **Conversion de divisas:** Se aplica a tasas interbancarias para depositos/retiros en monedas no USD

**Que decirle al cliente:**

- "En las cuentas Cent y Standard no hay comisiones de trading -- todo el costo esta incluido en el spread."
- "En la cuenta Raw, el spread es casi cero pero hay una comision fija de $3 por lote por lado. Si operas mucho volumen, nuestro programa de reembolso puede reducir esa comision hasta en un 30%."
- "Los swaps se cobran cuando mantienes una operacion abierta de un dia para otro. Pueden ser positivos (te pagan) o negativos (te cobran). Los miercoles los swaps son triples para forex."
- "Si por tus creencias religiosas no puedes recibir ni pagar intereses, podemos configurarte una cuenta islamica sin swap. Contactanos para solicitarla."
- "Puedes ver los spreads en vivo y las tasas de swap directamente en MT5 en las especificaciones de cada instrumento."

**Cuando escalar:**
- Cliente cuestiona un cargo de swap inusual o muy alto -- verificar las especificaciones del instrumento y si no es claro, escalar a operaciones de trading
- Solicitud de cuenta islamica -- escalar a compliance/operaciones para activacion
- Disputa sobre comision de Raw Account -- verificar el volumen del cliente y el programa de rebate

---

## 8. Apalancamiento y Margen

### 8.1 Apalancamiento Maximo por Tipo de Cuenta e Instrumento

| Instrumento | Cent | Standard | Raw |
|---|---|---|---|
| Forex Mayores | 1:1000 | 1:500 | 1:200 |
| Forex Menores | 1:1000 | 1:500 | 1:200 |
| Forex Exoticos | 1:200 | 1:100 | 1:50 |
| Metales | 1:500 | 1:200 | 1:100 |
| Indices | 1:200 | 1:100 | 1:50 |
| Materias Primas | 1:200 | 1:100 | 1:50 |
| Criptomonedas | 1:10 | 1:10 | 1:5 |

**Por que el apalancamiento varia por instrumento:** Diferentes instrumentos tienen perfiles de volatilidad distintos. Instrumentos de mayor volatilidad como pares exoticos y criptomonedas conllevan mayor riesgo, lo que requiere apalancamiento reducido para proteccion del trader.

### 8.2 Como Cambiar el Apalancamiento

1. Iniciar sesion en el Portal de Cliente en account.neomaaa.com
2. Ir a Payments > Change Leverage
3. Seleccionar la cuenta de trading
4. Elegir el apalancamiento deseado
5. Confirmar el cambio

**Nota importante:** Los cambios de apalancamiento pueden no estar disponibles mientras hay posiciones abiertas.

### 8.3 Apalancamiento Dinamico

El apalancamiento se reduce automaticamente durante:
- Tamanos de posicion muy grandes
- Eventos economicos importantes programados
- Volatilidad extrema del mercado
- Requisitos regulatorios

Los usuarios reciben notificaciones de ajustes temporales.

### 8.4 Niveles de Margin Call y Stop Out

**Nivel de margen:** Se calcula como (Equity / Margen Utilizado) x 100%

| Tipo de Cuenta | Nivel de Margin Call | Nivel de Stop Out |
|---|---|---|
| **Cent** | 50% | 30% |
| **Standard** | 50% | 30% |
| **Raw** | 60% | 40% |

**Margin Call:** Es una advertencia de que el nivel de margen ha caido a un umbral critico. Al activarse, considerar:
- Cerrar algunas posiciones para liberar margen
- Depositar fondos adicionales
- Reducir la exposicion

**Stop Out:** Si el nivel de margen continua descendiendo, el mecanismo de Stop Out cierra automaticamente las posiciones con mayores perdidas para prevenir perdidas adicionales.

**Ejemplo practico:**
- Balance de la cuenta: $1,000
- Posicion abierta usando $220 de margen
- Margin Call al 50%: se activa cuando el equity cae a $110
- Stop Out al 30%: se activa cuando el equity cae a $66

### 8.5 Proteccion de Saldo Negativo

NEOMAAA proporciona Proteccion de Saldo Negativo en todos los tipos de cuenta. Si condiciones de mercado extremas causan que la cuenta caiga por debajo de cero, el saldo se restablece a cero automaticamente. El cliente nunca debe mas de lo que deposito.

**Que decirle al cliente:**

- "El apalancamiento maximo depende de tu tipo de cuenta y el instrumento. Por ejemplo, en cuenta Cent puedes tener hasta 1:1000 en forex, pero en criptomonedas es 1:10 por la volatilidad."
- "Puedes cambiar tu apalancamiento desde el Portal de Cliente en Payments > Change Leverage. Pero si tienes posiciones abiertas, puede que necesites cerrarlas primero."
- "Si tu margen cae por debajo del nivel de Margin Call, recibiras una advertencia. Si sigue cayendo al nivel de Stop Out, el sistema cerrara tus posiciones automaticamente para protegerte."
- "NEOMAAA tiene proteccion de saldo negativo -- si por una situacion extrema tu cuenta llega a negativo, la restablecemos a cero. Nunca debes mas de lo que depositaste."
- "Recuerda: a mayor apalancamiento, mayor es tanto la ganancia potencial como la perdida potencial. Opera con responsabilidad."

**Cuando escalar:**
- Cliente sufrio stop out y quiere reclamar -- verificar el historial de la cuenta, si no es un error de sistema, explicar que es un mecanismo automatico de proteccion
- Saldo negativo que no se ha restablecido -- escalar a finanzas/operaciones
- Cliente solicita apalancamiento superior al maximo disponible -- explicar que el maximo esta establecido por regulacion y tipo de cuenta
- Ajuste de apalancamiento dinamico que afecto al cliente sin notificacion -- escalar a operaciones

---

## 9. Instrumentos y Horarios

### 9.1 Instrumentos Disponibles

**Forex (50+ pares de divisas):**
- Pares mayores: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD
- Pares menores (cruces): EUR/GBP, GBP/JPY, AUD/NZD, EUR/CHF y mas
- Pares exoticos: USD/TRY, EUR/ZAR, USD/MXN, USD/SGD y mas

**Metales:**
- Oro (XAU/USD)
- Plata (XAG/USD)

**Indices:**
- US30 (Dow Jones)
- US500 (S&P 500)
- NAS100 (Nasdaq)
- GER40 (DAX)
- UK100 (FTSE)
- Y mas

**Materias Primas:**
- Petroleo crudo (WTI)
- Gas natural
- Y mas

**Criptomonedas:**
- BTC/USD (Bitcoin)
- ETH/USD (Ethereum)
- Otras criptomonedas principales

**Acciones y ETFs (solo cuenta Raw):**
- Mas de 100 CFDs de acciones individuales de mercados estadounidenses y europeos

### 9.2 Como Encontrar Instrumentos en MT5

1. Abrir el panel Market Watch (Ctrl+M)
2. Hacer clic derecho y seleccionar Symbols
3. Navegar por categorias o usar la barra de busqueda
4. Seleccionar los instrumentos deseados y hacer clic en Show symbol
5. Apareceran en el Market Watch

### 9.3 Horarios de Trading

**Forex:**
- Apertura: Domingo 22:00 UTC
- Cierre: Viernes 22:00 UTC
- (Los horarios pueden cambiar una hora durante transiciones de horario de verano)

**Sesiones principales de trading:**

| Sesion | Horario (UTC) | Monedas Principales |
|---|---|---|
| Asiatica (Tokio) | 00:00 - 09:00 | JPY, AUD, NZD |
| Europea (Londres) | 07:00 - 16:00 | EUR, GBP, CHF |
| Americana (Nueva York) | 12:00 - 21:00 | USD, CAD |

**Mejor horario para operar:** La superposicion Londres-Nueva York (12:00 - 16:00 UTC) tiene la mayor liquidez y los spreads mas ajustados.

**Otros instrumentos:**

| Instrumento | Horario (UTC) |
|---|---|
| Oro (XAU/USD) | Domingo 23:00 - Viernes 22:00 (pausa diaria 22:00-23:00) |
| Petroleo (WTI) | Domingo 23:00 - Viernes 22:00 (pausa diaria 22:00-23:00) |
| Indices de EE.UU. (US30, US500, NAS100) | Domingo 23:00 - Viernes 22:00 (pausas 21:15-21:30 y 22:00-23:00) |
| Criptomonedas | 24/7 (posibles pausas de mantenimiento los fines de semana) |
| Acciones/ETFs (cuenta Raw) | Sigue los horarios del mercado respectivo |

**Notas importantes:**
- Los horarios de trading se muestran en MetaTrader 5 en las especificaciones de cada instrumento
- Los spreads se amplian fuera de las horas pico
- Algunos instrumentos tienen pausas diarias de trading
- Consultar el sitio web de NEOMAAA para calendarios de trading en dias festivos

**Que decirle al cliente:**

- "El forex opera de domingo a viernes las 24 horas. Las criptomonedas operan 24/7."
- "El mejor momento para operar forex es durante la superposicion de Londres y Nueva York, entre las 12:00 y 16:00 UTC, cuando hay mayor liquidez y mejores spreads."
- "El oro y el petroleo tienen una pausa diaria entre las 22:00 y 23:00 UTC -- no podras abrir ni cerrar operaciones durante ese periodo."
- "Las acciones solo estan disponibles en la cuenta Raw y siguen los horarios del mercado donde cotizan."
- "Puedes ver los horarios exactos de cada instrumento en MT5: clic derecho en el instrumento en Market Watch > Specification."

---

## 10. Reglas de Trading

### 10.1 Politica de Scalping

**Definicion:** El scalping es una estrategia de trading en la que se abren y cierran posiciones en un marco de tiempo muy corto (segundos a minutos), con el objetivo de capturar pequenos movimientos de precio.

**Politica NEOMAAA:** El scalping esta permitido en todos los tipos de cuenta -- Cent, Standard y Raw. No hay restricciones sobre la rapidez con la que se pueden abrir y cerrar posiciones.

**Requisito de volumen importante:** Las posiciones mantenidas por menos de 2 minutos pueden no contabilizar hacia los requisitos de volumen para elegibilidad de bonus o Vault Yield. Esta politica asegura que los programas de bonus y rendimiento recompensen la actividad de trading genuina.

**Consejos para scalpers:**
- Usar la cuenta Raw para los spreads mas ajustados (critico para la rentabilidad del scalping)
- Operar durante sesiones de alta liquidez (superposicion Londres-Nueva York)
- Usar One-Click Trading (Alt+T) en MT5 para ejecucion mas rapida
- Considerar un VPS para latencia minima
- Monitorear costos de comision -- el Programa de Reembolso Raw permite a los scalpers de alto volumen reducir costos hasta en un 30%

### 10.2 Cobertura (Hedging)

**Definicion:** El hedging implica abrir una posicion en la direccion opuesta de una operacion existente en el mismo instrumento. Por ejemplo, mantener una compra de 1 lote y una venta de 0.5 lotes en EUR/USD al mismo tiempo.

**Esta permitido en NEOMAAA:** Si, completamente.

**Razones para usar hedging:**
- **Gestion de riesgo:** Asegurar la ganancia/perdida actual mientras se reevalua el mercado
- **Separacion de estrategias:** Ejecutar multiples estrategias en el mismo instrumento
- **Proteccion ante noticias:** Abrir un hedge antes de eventos de alto impacto para limitar la exposicion

**Como funciona en NEOMAAA:**
- MetaTrader 5 trata las posiciones opuestas como operaciones separadas
- Cada una tiene su propio stop loss, take profit y cargos de swap
- NEOMAAA puede ofrecer requisitos de margen reducidos para posiciones cubiertas dependiendo del instrumento

**Cierre de posiciones cubiertas con Close By:**
1. Hacer clic derecho en una posicion cubierta
2. Seleccionar Close By
3. Elegir la posicion opuesta
4. Hacer clic en Close

Esto cierra ambas posiciones simultaneamente y solo se cobra un spread en lugar de dos.

### 10.3 Expert Advisors (EAs)

Los EAs estan permitidos en todos los tipos de cuenta NEOMAAA. No hay restricciones sobre el uso de trading automatizado.

### 10.4 Que Esta Prohibido

Basado en las politicas generales del broker:
- Transferencias de fondos a terceros (solo entre cuentas propias)
- Manipulacion de precios o ejecucion
- Uso de informacion privilegiada
- Cualquier actividad que viole las regulaciones AML/KYC
- Operaciones mantenidas menos de 2 minutos NO cuentan para bonus/Vault Yield (no estan prohibidas, pero no califican)

**Que decirle al cliente:**

- "Si, el scalping esta 100% permitido en NEOMAAA. Puedes abrir y cerrar operaciones tan rapido como quieras."
- "El hedging tambien esta permitido. Puedes tener posiciones en ambas direcciones en el mismo instrumento."
- "Los Expert Advisors (robots de trading) estan permitidos en todas las cuentas."
- "Lo unico que debes saber es que operaciones de menos de 2 minutos no cuentan para los requisitos de volumen de bonus o Vault Yield."
- "Para scalping, te recomendamos la cuenta Raw por los spreads mas bajos, y si operas mucho volumen, el programa de rebate reduce las comisiones."

**Cuando escalar:**
- Si un cliente reporta que sus operaciones de scalping estan siendo bloqueadas -- escalar a operaciones de trading (no deberia ocurrir)
- Si un cliente pregunta sobre actividades no listadas aqui (arbitraje, latency trading, etc.) -- escalar a compliance para verificar la politica

---

## 11. Seguridad

### 11.1 Como NEOMAAA Protege los Fondos

**Cuentas segregadas:** Los fondos de trading se mantienen en cuentas segregadas en bancos de primer nivel, completamente separados de los fondos operacionales de NEOMAAA. El capital del cliente no puede ser utilizado para gastos de la empresa.

**Proteccion de saldo negativo:** Todos los tipos de cuenta incluyen proteccion. Si condiciones de mercado extremas causan que la cuenta caiga por debajo de cero, el saldo se restablece a cero automaticamente. El cliente nunca debe mas de lo que deposito.

**Modelo de ejecucion hibrido (ECN/STP priorizado):** Neomaaa Ltd opera bajo modelo hibrido de ejecucion (STP/ECN o principal/counterparty segun condiciones de mercado), tal como se establece en la Politica de Ejecucion de Ordenes publicada (neomaaa.com/about/legal-documentation). La ruta ECN/STP es la priorizada: los algoritmos de enrutamiento seleccionan la ruta optima para cada orden basandose en precios, velocidad y eficiencia de costos. En determinadas circunstancias, la Empresa puede actuar como principal o contraparte. Toda la ejecucion (timestamps, spread, slippage) es auditable en MetaTrader 5.

**Procesamiento seguro de pagos:** Todas las transacciones financieras se procesan a traves de canales cifrados. Los metodos de deposito y retiro se verifican contra la identidad de la cuenta para prevenir transacciones no autorizadas.

### 11.2 Mejores Practicas de Seguridad de Cuenta

**Contrasena fuerte:**
- Usar al menos 12 caracteres
- Incluir mayusculas, minusculas, numeros y caracteres especiales
- No reutilizar contrasenas de otros sitios web
- Cambiar la contrasena cada 3-6 meses

**Pregunta de recuperacion de contrasena:**
1. Ir a Settings > Informacion Personal
2. Ingresar una pregunta de recuperacion y una respuesta
3. Hacer clic en Submit

**Proteccion de credenciales de MT5:**
- No compartir el numero de acceso a MT5 ni la contrasena con nadie
- Solo guardar la contrasena en dispositivos personales y seguros
- Cerrar sesion de MT5 al usar computadoras compartidas
- Usar la contrasena de inversor (solo lectura) si se necesita compartir la vista de la cuenta

**Prevencion de phishing:**
- NEOMAAA NUNCA pedira la contrasena por correo electronico, telefono o chat
- Siempre acceder a la cuenta escribiendo la URL de NEOMAAA directamente en el navegador
- No hacer clic en enlaces en correos electronicos sospechosos que digan ser de NEOMAAA
- Reportar cualquier comunicacion sospechosa a [email protected]

**Seguridad del dispositivo:**
- Mantener el sistema operativo y navegador actualizados
- Utilizar software antivirus en los dispositivos de trading
- Evitar operar en redes Wi-Fi publicas
- Bloquear el telefono y la computadora cuando no esten en uso

### 11.3 Prevencion de Fraude

**Medidas de prevencion implementadas:**
- **Verificacion de identidad (KYC):** Garantiza que todas las cuentas sean abiertas por individuos verificados
- **Monitoreo de transacciones:** Sistemas automatizados detectan patrones inusuales en depositos, retiros y actividad de trading
- **Cumplimiento AML:** Los retiros se devuelven a la fuente original del deposito para prevenir lavado de dinero
- **Autenticacion segura:** Proteccion por contrasena, pregunta de seguridad y gestion de sesiones

**Senales de alerta de fraude:**
- Correos electronicos solicitando contrasenas o informacion personal
- Llamadas telefonicas que dicen ser de NEOMAAA solicitando credenciales de la cuenta
- Sitios web que se parecen a NEOMAAA pero con URLs diferentes
- Ofertas no solicitadas para administrar cuentas o garantizar ganancias
- Solicitudes de transferir fondos a terceros desconocidos

**Como reportar actividad sospechosa:**
1. Cambiar la contrasena inmediatamente
2. Actualizar la pregunta de seguridad en Settings > Security
3. Contactar al soporte de NEOMAAA con los detalles de la actividad
4. No responder a correos electronicos o mensajes sospechosos

**Lo que NEOMAAA NUNCA hace:**
- Solicitar contrasenas por correo electronico, telefono o chat
- Pedir a los usuarios transferir fondos a cuentas personales
- Garantizar ganancias de trading
- Solicitar la instalacion de software de acceso remoto

**Que decirle al cliente:**

- "Tus fondos estan seguros en cuentas segregadas en bancos de primer nivel, completamente separados de los fondos de la empresa."
- "Tenemos proteccion de saldo negativo -- nunca debes mas de lo que depositaste."
- "Recuerda que NEOMAAA NUNCA te pedira tu contrasena por correo, telefono o chat. Si alguien lo hace, es un intento de fraude."
- "Te recomendamos usar una contrasena de al menos 12 caracteres con letras, numeros y simbolos. Cambiala cada 3-6 meses."
- "Si recibes un correo sospechoso que dice ser de NEOMAAA, no hagas clic en ningun enlace y reportalo a [email protected]."
- "Evita operar desde redes Wi-Fi publicas y manten tu antivirus actualizado."

**Cuando escalar:**
- Cliente reporta acceso no autorizado a su cuenta -- escalar INMEDIATAMENTE a compliance y seguridad
- Deteccion de actividad de trading inusual en una cuenta -- escalar a compliance
- Cliente recibio comunicaciones fraudulentas usando la marca NEOMAAA -- documentar y escalar a compliance/legal
- Solicitud de transferencia de fondos a terceros -- rechazar y escalar a compliance
- Sospecha de uso de tarjeta robada para depositos -- escalar inmediatamente a compliance/finanzas

---

## 12. Vault Yield System

### 12.1 Que es el Vault Yield System

El Sistema Vault Yield ofrece hasta 5% anual sobre el saldo de la cuenta. Recompensa a los traders activos por mantener fondos con NEOMAAA.

### 12.2 Elegibilidad

- Disponible para titulares de cuentas Standard y Raw
- Puede haber requisitos de saldo minimo y actividad
- Consultar el sitio web de NEOMAAA o contactar al account manager para los criterios de elegibilidad actuales

### 12.3 Como Funciona

- El interes se calcula diariamente segun el saldo de la cuenta
- Se acredita periodicamente
- Los traders continuan operando normalmente mientras ganan rendimiento
- La tasa (hasta 5% anual) varia segun tipo de cuenta y saldo

### 12.4 Notas Importantes

- Opera independientemente de las ganancias o perdidas en trading
- Aplican terminos y condiciones
- Sujeto a cambios segun las condiciones del mercado
- Las posiciones mantenidas por menos de 2 minutos pueden no contabilizar hacia los requisitos de actividad

**Que decirle al cliente:**

- "Con el Vault Yield System puedes ganar hasta un 5% anual sobre tu saldo mientras sigues operando normalmente."
- "Esta disponible para cuentas Standard y Raw. El interes se calcula diariamente y se acredita a tu cuenta periodicamente."
- "Es independiente de tus resultados de trading -- ganas el rendimiento sobre tu saldo aunque tengas dias negativos."
- "Para conocer los requisitos exactos de elegibilidad y las tasas actuales, puedo verificarlos con tu account manager."

**Cuando escalar:**
- Cliente pregunta por tasas exactas o cambios en el programa -- verificar con el account manager o la pagina del programa actualizada
- Disputa sobre acreditacion de Vault Yield -- escalar a finanzas/operaciones
- Preguntas sobre por que operaciones de menos de 2 minutos no cuentan -- explicar la politica anti-abuso, si insiste, escalar al supervisor

---

## 13. Problemas Frecuentes y Soluciones

### 13.1 No Puedo Iniciar Sesion -- Portal de Cliente

**Contrasena olvidada:**
1. Hacer clic en "Olvide mi contrasena" en la pagina de inicio de sesion
2. Ingresar la direccion de correo electronico registrada
3. Revisar la bandeja de entrada (y carpeta de spam) para el enlace de restablecimiento
4. Crear una nueva contrasena e iniciar sesion

**Olvido la respuesta de recuperacion de contrasena:**
- Contactar a Soporte con la direccion de correo electronico registrada e identificacion valida para verificar la identidad
- Una vez verificado, Soporte puede restablecer la pregunta de recuperacion

**Cuenta bloqueada:**
- Despues de multiples intentos fallidos, la cuenta puede ser bloqueada temporalmente por seguridad
- Esperar 30 minutos e intentar nuevamente, o contactar a Soporte

### 13.2 No Puedo Iniciar Sesion -- MetaTrader 5

**Error "Cuenta invalida":**
- Verificar el numero de login y la contrasena
- Asegurarse de haber seleccionado el servidor NEOMAAA correcto (mt5.neomaaa.com)
- La cuenta puede haber sido desactivada -- contactar a Soporte

**Error "Sin conexion":**
- Verificar la conexion a internet
- El servidor de trading puede estar en mantenimiento -- intentar nuevamente en unos minutos
- Asegurarse de que el firewall o antivirus no este bloqueando MT5
- Intentar una conexion a internet diferente (datos moviles en lugar de Wi-Fi)

**Error "Cuenta deshabilitada":**
- La cuenta puede haber sido suspendida -- contactar a Soporte para mas informacion

### 13.3 Problemas con la Plataforma MT5

**MT5 no se abre o se bloquea:**
- Reinstalar: Desinstalar MT5 completamente, luego descargar e instalar la version mas reciente desde el sitio web de NEOMAAA
- Ejecutar como administrador: Hacer clic derecho en el icono de MT5 y seleccionar "Ejecutar como administrador"
- Actualizar el SO: Asegurar que Windows/macOS este actualizado
- Requisitos del sistema: MT5 requiere Windows 7 o posterior, o macOS 10.12+

**Graficos no se cargan o muestran "Esperando actualizacion":**
- Verificar la conexion a internet
- Hacer clic derecho en el grafico y seleccionar Actualizar
- Cerrar el grafico y abrirlo nuevamente desde Market Watch
- Verificar si el mercado esta abierto para ese instrumento

**Indicadores o EAs no funcionan:**
- Asegurarse de que AutoTrading este habilitado (boton verde en la barra de herramientas)
- Verificar la configuracion del EA: clic derecho en el grafico > Expert Advisors > Propiedades
- Asegurarse de que "Allow Algo Trading" este marcado
- Revisar la pestana Experts en la Caja de herramientas para ver mensajes de error
- Reinstalar el EA si el archivo podria estar corrupto

**Rendimiento lento de la plataforma:**
- Cerrar los graficos que no se esten utilizando activamente
- Reducir el numero de indicadores en ejecucion
- Limpiar el historial del grafico: Herramientas > Opciones > Graficos > reducir Maximo de barras en el grafico
- Cerrar otras aplicaciones que consuman muchos recursos
- Asegurar que la conexion a internet sea estable

**Notificaciones de sonido no funcionan:**
- Ir a Herramientas > Opciones > Eventos
- Asegurarse de que "Habilitar" este marcado
- Verificar que los archivos de sonido correctos esten seleccionados

### 13.4 Deposito No Aparece en Mi Cuenta

**Verificaciones inmediatas:**

1. Verificar la fuente de pago -- confirmar que la transaccion se completo exitosamente en el banco o billetera
2. Tiempos de procesamiento:
   - Tarjetas: Generalmente instantaneo, hasta 30 minutos
   - E-wallets: Generalmente instantaneo
   - Criptomonedas: Requiere 1-6 confirmaciones de red (10 min a 1 hora)
   - Transferencias bancarias: 1-3 dias habiles
3. Verificar la cuenta correcta -- asegurar que el deposito se dirigio al numero de cuenta de trading correcto
4. Verificar el minimo -- depositos por debajo del minimo para el tipo de cuenta seran rechazados

**Problemas con tarjeta:**
- Pago rechazado: Contactar al banco para autorizacion de transaccion internacional
- Fallo 3D Secure: Reintentar y completar la verificacion
- Cargo duplicado: Esperar 24 horas -- los cargos duplicados generalmente se revierten automaticamente

**Problemas con deposito cripto:**
- Verificar confirmaciones via explorador de blockchain
- Red incorrecta: Enviar criptomonedas en la red equivocada puede resultar en perdida de fondos
- Direccion incorrecta: Siempre recopiar la direccion de deposito desde el Portal de Cliente

**Si el deposito no aparece despues de las verificaciones:**
Contactar soporte con: numero de cuenta, metodo de pago, monto, fecha/hora de la transaccion, ID de transaccion/hash, y captura de pantalla de confirmacion de pago.

### 13.5 Retrasos en Retiros

**Verificaciones del agente de soporte:**

1. Verificar estado del KYC -- debe estar actualizado y aprobado
2. Verificar si es el primer retiro -- debe coincidir con el metodo de deposito
3. Verificar margen libre -- debe haber fondos suficientes no comprometidos en posiciones
4. Verificar si fue enviado en fin de semana o dia festivo
5. Verificar si el monto es inusualmente grande (puede desencadenar revision de seguridad)

**Tiempos esperados:**

| Metodo | Procesamiento NEOMAAA | Proveedor de Pago | Total |
|---|---|---|---|
| E-wallets | 1 dia habil | Mismo dia | 1-2 dias |
| Criptomonedas | 1 dia habil | 1 dia | 1-2 dias |
| Tarjeta credito/debito | 1 dia habil | 1-5 dias | 2-5 dias |
| Transferencia bancaria | 1 dia habil | 2-5 dias | 3-5 dias |

### 13.6 Ejecucion Lenta o Slippage

**Que es slippage:** Ocurre cuando una orden se ejecuta a un precio diferente al solicitado. Puede ocurrir durante alta volatilidad (eventos de noticias, aperturas de mercado), periodos de baja liquidez, u ordenes grandes que exceden la liquidez disponible en ese nivel de precio. El slippage puede ser positivo (mejor precio) o negativo (peor precio).

**Como minimizar el slippage:**
1. Operar en horas pico: La superposicion Londres-Nueva York (12:00-16:00 UTC) tiene la mayor liquidez
2. Evitar operar durante noticias: Revisar calendarios economicos antes de colocar ordenes
3. Usar ordenes limit: Reemplazar ordenes de mercado con ordenes limit para precios precisos
4. Reducir tamano de posicion: Ordenes mas pequenas se ejecutan mas confiablemente al precio deseado
5. Usar cuentas Raw: El enrutamiento ECN/STP prioritario proporciona acceso a pools de liquidez mas profundos

**Reportar problemas de ejecucion:**
- Documentar el numero de ticket de la orden del historial de trading
- Registrar los precios esperados vs. los precios reales de ejecucion
- Captura de pantalla de los detalles
- Enviar un ticket de soporte dentro de 5 dias habiles
- El equipo de compliance de NEOMAAA revisa las ejecuciones y responde con sus hallazgos

### 13.7 Errores Comunes de MT5

**"Insufficient Funds" (Fondos insuficientes):**
- Falta de margen libre suficiente para el tamano de posicion solicitado
- Soluciones: reducir tamano de lote, cerrar posiciones existentes, depositar mas fondos, verificar configuracion de apalancamiento

**"Operation Disabled" (Operacion deshabilitada):**
- La operacion no esta disponible para el instrumento seleccionado
- Causas: mercado cerrado, pausa de operacion, tipo de cuenta no soportado, instrumento suspendido

**"No Quotes" (Sin cotizaciones):**
- La plataforma no puede obtener un precio valido de ejecucion
- Ocurre durante: alta volatilidad, apertura/cierre de mercado, noticias importantes, baja liquidez
- Solucion: esperar y reintentar o probar un tipo de ejecucion diferente

**"Order Blocked" (Orden bloqueada):**
- Existe una accion pendiente en la operacion
- Solucion: esperar y reintentar

**Que decirle al cliente:**

- "Si no puedes iniciar sesion en el Portal de Cliente, usa la opcion 'Olvide mi contrasena' y te enviamos un enlace de restablecimiento. Revisa tambien la carpeta de spam."
- "Si MT5 muestra 'Cuenta invalida', verifica que estes usando el login correcto (no el email, sino el numero de cuenta) y el servidor mt5.neomaaa.com."
- "Si MT5 se bloquea, prueba reinstalar la version mas reciente desde nuestro sitio web y ejecutarlo como administrador."
- "Si tu deposito no aparece, verifica primero que la transaccion se completo en tu banco. Si es cripto, revisa las confirmaciones. Si todo esta correcto y han pasado mas de 2 horas, contactanos con los detalles de la transaccion."
- "Los retiros toman hasta 1 dia habil de procesamiento interno mas el tiempo del proveedor de pago. Si tu retiro lleva mas de 3 dias habiles, contactanos."
- "Si experimentas slippage, es algo normal durante alta volatilidad. Para minimizarlo, opera en horas de mayor liquidez y usa ordenes limit en lugar de ordenes de mercado."
- "Si ves 'Fondos insuficientes', significa que no tienes suficiente margen libre. Puedes reducir el tamano del lote o cerrar alguna posicion abierta para liberar margen."

**Cuando escalar:**
- Cuenta bloqueada que no se desbloquea despues de 30 minutos -- escalar a soporte tecnico
- Error de "Cuenta deshabilitada" sin razon conocida -- escalar a compliance (posible suspension)
- Deposito no acreditado despues de 24 horas con confirmacion de pago -- escalar a finanzas
- Retiro pendiente mas de 3 dias habiles -- escalar a finanzas
- Reclamo por slippage significativo (>5 pips en major) -- documentar y escalar a operaciones de trading
- MT5 con problemas persistentes despues de reinstalacion -- escalar a soporte tecnico

---

## 14. Contacto y Canales Cliente-Facing

Esta seccion cubre **solo lo que el cliente necesita saber** sobre como contactarnos. Para el **flujo interno de escalacion** (matriz L1/L2/L3, SLAs internos, contactos del equipo, protocolo de reclamos), ver **[Support Playbook seccion 3 - Matriz de Escalacion](/content/es/support/playbook)**.

### 14.1 Canales de Contacto Disponibles

| Canal | Detalle | Tiempo de Respuesta |
|---|---|---|
| **Chat en vivo** | Sitio web NEOMAAA - icono de chat | Instantaneo en horario |
| **Correo electronico** | [email protected] | Tipicamente 24h |
| **Centro de ayuda** | help.neomaaa.com | Autoservicio 24/7 |

### 14.2 Horario de Soporte

Lunes a viernes durante horas de mercado. Tiempos de respuesta pueden ser mas prolongados fuera de horario y en dias festivos.

### 14.3 Soporte Prioritario Raw

Clientes de cuenta Raw tienen:
- Soporte prioritario con tiempos de respuesta mas rapidos
- Account manager dedicado

### 14.4 Que Debe Incluir el Cliente al Contactar

- Numero de cuenta MT5
- Descripcion clara del problema
- Capturas de pantalla si aplica
- Fecha/hora del problema
- Mensajes de error recibidos
- Dispositivo y SO (para problemas tecnicos)

**Que decirle al cliente:**

- "Puedes contactarnos por chat en vivo en nuestro sitio web, o escribirnos a [email protected]."
- "Estamos de lunes a viernes durante horas de mercado."
- "Si tienes cuenta Raw, tienes soporte prioritario y un account manager dedicado."
- "Para ayudarte mas rapido, incluye tu numero de cuenta, descripcion del problema y capturas de pantalla."

---

## APENDICE A: Resumen Rapido por Tipo de Cuenta

**4 tipos de cuenta:** Cent ($5), Standard ($50), Raw ($500 — 0.0 pips + $3/lado), Institutional ($50,000, custom).

Tabla completa con spreads, comisiones, leverage máximo (gold source vinculante): [`encyclopedia/productos-mt5`](/content/encyclopedia/productos-mt5) sección "Tipos de cuenta".

**Parámetros operativos específicos de soporte** (no en gold source, específicos para agents):

| Caracteristica | Cent | Standard | Raw |
|---|---|---|---|
| Margin Call | 50% | 50% | 60% |
| Stop Out | 30% | 30% | 40% |
| Vault Yield | No | Si (hasta 5%) | Si (hasta 5%) |
| VPS gratuito | No | No | Si (con requisitos) |
| Soporte prioritario | No | No | Si |
| Cuenta islamica | Si | Si | Si |
| Moneda base | CNT (centavos) | USD | USD |

---

## APENDICE B: Metodos de Pago -- Resumen Completo

| Metodo | Deposito | Retiro | Comision Deposito | Comision Retiro |
|---|---|---|---|---|
| Visa/Mastercard | Instantaneo | 1-5 dias | Gratis | Gratis |
| E-wallets | Instantaneo | 1-2 dias | Gratis | Varia |
| Cripto (BTC, ETH, USDT) | 1-6 confirmaciones | 1-2 dias | Gratis | 1% (0.5% Raw), min $10 |
| Transf. bancaria internacional | 1-3 dias | 3-5 dias | Gratis | $25 (excepciones por tipo cuenta) |
| Transf. bancaria local | 1-2 dias | Varia | Gratis | Varia por region |

**Proveedores de pago disponibles en el Portal:**
- nowPayment -- Pagos con criptomonedas (TRC20 y otras redes)
- PayRetailers -- Pasarela de pago en linea (disponibilidad regional)

---

## APENDICE C: Servidores y URLs Importantes

| Recurso | URL / Direccion |
|---|---|
| Sitio web principal | neomaaa.com |
| Portal de Cliente | account.neomaaa.com |
| Centro de ayuda | help.neomaaa.com |
| Servidor MT5 | mt5.neomaaa.com |
| Email de soporte | [email protected] |

---

> Para canned responses completas (saludo inicial, verificacion de identidad, deposito no reflejado, retiro pendiente, problema MT5, cliente molesto, etc.), ver **[Support Playbook seccion 5 - Respuestas Predefinidas](/content/es/support/playbook)** (CR-01 a CR-32). No duplicamos aqui.

---

*Documento compilado con informacion oficial de help.neomaaa.com. Para actualizaciones, verificar contra los articulos originales del Centro de Ayuda.*
