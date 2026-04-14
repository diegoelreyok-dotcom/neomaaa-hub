# FAQ Interno — NEOMAAA Markets

**Documento:** Base de conocimiento interna para todo el equipo
**Version:** 1.0
**Clasificacion:** [SOLO USO INTERNO] — No compartir con clientes sin adaptacion
**Ultima actualizacion:** Abril 2026
**Responsable:** Head of Support / Principals

---

## Instrucciones de Uso

Este documento contiene las respuestas estandarizadas a las preguntas mas frecuentes que recibira el equipo. Cada miembro debe:

1. Leer este documento completo antes de iniciar funciones.
2. Usarlo como referencia principal al atender clientes.
3. Adaptar el tono al canal (chat en vivo: breve y directo; email: mas detallado).
4. Si la pregunta no esta aqui, escalar al supervisor antes de improvisar una respuesta.
5. Las respuestas marcadas con [SOLO USO INTERNO] nunca deben compartirse textualmente con clientes.

---

## Top 10 — Referencia Rapida

| # | Pregunta | Respuesta Corta |
|---|---|---|
| 1 | Cual es el deposito minimo? | $5 USD (cuenta Cent), $50 (Standard), $500 (Raw), $50,000 (Institutional) |
| 2 | Que apalancamiento ofrecen? | Hasta 1:1000 dependiendo del tipo de cuenta e instrumento |
| 3 | Cuanto tarda un retiro? | 1-3 dias habiles segun el metodo de pago |
| 4 | Que plataforma usan? | MetaTrader 5 (escritorio, web, y movil) |
| 5 | Estan regulados? | Licencia L15968/N emitida por AOFA (Anjouan, Union of Comoros) |
| 6 | Cuantos instrumentos tienen? | Mas de 2,000 (forex, indices, commodities, acciones, cripto CFDs) |
| 7 | Como verifico mi cuenta? | Sube documento de identidad y comprobante de domicilio en el portal del cliente |
| 8 | Tienen copy trading? | Si, disponible a traves de MT5 Signals y plataformas compatibles |
| 9 | Ofrecen cuentas swap-free? | Si, disponibles para clientes que lo soliciten |
| 10 | Como contacto soporte? | Chat en vivo (Intercom), email, WhatsApp, o telefono +41 44 707 9633 |

---

## Categoria 1: General del Broker

### 1.1 Que es NEOMAAA Markets?

NEOMAAA Markets es un broker de forex y CFDs que ofrece acceso a mas de 2,000 instrumentos financieros a traves de MetaTrader 5. Operamos con un modelo hibrido ECN/STP, lo que significa que las ordenes se enrutan directamente a proveedores de liquidez sin mesa de operaciones (dealing desk). La empresa esta registrada como Neomaaa Ltd (IBC 15968) con licencia de broker en Anjouan.

### 1.2 Donde esta registrada la empresa?

Neomaaa Ltd esta registrada como International Business Company con numero IBC 15968. La licencia de broker es la L15968/N, emitida por la Anjouan Offshore Finance Authority (AOFA) en la Union de Comoros.

### 1.3 Quienes son los fundadores/directivos?

[SOLO USO INTERNO] Los Principals son Diego, Yulia, y Stanislav. No reciben salario; su compensacion es via equity. Para clientes, la respuesta es: "NEOMAAA Markets es operado por un equipo directivo con experiencia en mercados financieros y tecnologia." No dar nombres personales a clientes salvo que un Principal lo autorice.

### 1.4 En que paises operan?

NEOMAAA Markets acepta clientes de la mayoria de paises del mundo. Los mercados principales son **LATAM** (Brasil, Colombia, Mexico, Argentina, Chile, Peru, Ecuador, Republica Dominicana y el resto excluyendo USA/Canadá), **CIS** con screening caso por caso (Rusia y vecinos), **Middle East / MENA** (UAE, Saudi, Qatar, Turquía, excluyendo Iraq), **Africa** (Sudáfrica, Nigeria, Kenya, Egipto, excluyendo Sudán), y **SE Asia fase 2** (China, Vietnam, Filipinas, Indonesia, Tailandia, excluyendo North Korea y Myanmar).

**No aceptamos clientes de:**
- Restricciones regulatorias: Estados Unidos, Canada, Espacio Economico Europeo (EEA, 30 paises, **incluida España**), Reino Unido, Australia, Japon, Israel.
- Sanciones internacionales: Cuba, Irak, Iran, Corea del Norte, Myanmar, Siria, Sudan, Crimea, Donetsk, Luhansk.

**Paises con restricciones especiales (solo caso por caso con EDD completo y aprobacion de compliance):** Rusia, Venezuela, Nigeria, Pakistan, Turquia, Belarus, Afganistan, y paises en lista gris/negra de GAFI.

[SOLO USO INTERNO] La lista autoritativa y actualizada esta en `compliance/screening-sanciones.md` seccion 12.5. Consultar ahi ante cualquier duda.

### 1.4b Podemos aceptar un cliente residente en España? (PREGUNTA FRECUENTE)

**NO.** Respuesta oficial de Diego (Abril 2026): *"Actualmente no podemos trabajar como broker con clientes de España/Europa sin las regulaciones que piden esos países."*

España está en la EEA. Cualquier residente España/EEA/UK debe ser rechazado en KYC/Sumsub. El IB que intente ingresar leads España pierde comisión sobre esos FTDs y puede ser sancionado. Cuando un lead España contacta:

1. Agradecer su interés
2. Informar que **por restricción jurisdiccional** no podemos aceptar residentes EEA/UK
3. **NO** sugerir workarounds (usar pasaporte de otro país, dirección de familiar LATAM, VPN, etc.) — eso es fraude regulatorio
4. Dejar puerta abierta: "cuando obtengamos licencia EEA te contactaremos"

Excepciones: cero. Ni nacido en España residente LATAM cuenta — lo que pesa es **residencia fiscal comprobable por KYC**, no nacionalidad.

### 1.5 Cual es el horario de operacion del broker?

El trading en forex esta disponible 24 horas, 5 dias a la semana (domingo 22:00 CET a viernes 22:00 CET). Algunos instrumentos como cripto CFDs pueden operar 24/7. El soporte al cliente esta disponible en horarios definidos por turno: LATAM (9:00-18:00 COL) e ingles (9:00-18:00 CET).

### 1.6 Que modelo de ejecucion usan?

Modelo hibrido ECN/STP. Las ordenes se envian directamente a proveedores de liquidez sin intervencion de dealing desk. Esto significa que NEOMAAA no opera contra el cliente. Los precios provienen del pool de liquidez agregado.

---

## Categoria 2: Cuentas y Tipos

### 2.1 Que tipos de cuenta ofrecen?

NEOMAAA Markets ofrece 4 tipos de cuenta:

| Tipo | Deposito Minimo | Spread desde | Comision | Apalancamiento Max |
|---|---|---|---|---|
| Cent | $5 USD | 1.5 pips | Sin comision | 1:1000 |
| Standard | $50 USD | 1.0 pips | Sin comision | 1:500 |
| Raw | $500 USD | 0.0 pips | $3.5/lote/lado | 1:200 |
| Institutional | $50,000 USD | 0.0 pips | Negociable | 1:100 |

### 2.2 Cual es la diferencia entre cuenta Cent y Standard?

La cuenta Cent opera en centavos: 1 lote en Cent equivale a 0.01 lotes en Standard. Es ideal para traders principiantes que quieren operar con riesgo minimo y aprender. La cuenta Standard opera en unidades estandar con spreads desde 1.0 pip y sin comision.

### 2.3 Para quien es la cuenta Raw?

La cuenta Raw es para traders activos y con experiencia que prefieren spreads lo mas bajos posible (desde 0.0 pips) y estan dispuestos a pagar comision por lote. Es popular entre scalpers y traders algoritmicos.

### 2.4 Como funciona la cuenta Institutional?

La cuenta Institutional requiere un deposito minimo de $50,000 USD y ofrece condiciones personalizadas: spreads raw desde 0.0 pips, comisiones negociables, y un account manager dedicado. Esta disenada para fondos, gestores de capital, y traders de alto volumen. Los interesados deben contactar directamente a ventas.

### 2.5 Puedo tener mas de una cuenta?

Si. Los clientes pueden abrir multiples cuentas de trading bajo un mismo perfil. Esto es util para separar estrategias (manual vs. automatico) o probar diferentes tipos de cuenta.

### 2.6 Ofrecen cuentas demo?

Si. Las cuentas demo estan disponibles de forma gratuita con saldo virtual de $10,000 USD. Se crean directamente desde MetaTrader 5 o desde el portal del cliente. Las demos no tienen fecha de expiracion mientras se mantengan activas.

### 2.7 Que pasa si mi cuenta tiene saldo cero por mucho tiempo?

Las cuentas inactivas con saldo cero durante 90 dias consecutivos pueden ser archivadas automaticamente. El cliente puede solicitar la reactivacion contactando a soporte. No se cobra tarifa por inactividad.

---

## Categoria 3: Depositos

### 3.1 Cuales son los metodos de deposito disponibles?

NEOMAAA Markets ofrece mas de 120 metodos de deposito, incluyendo: transferencia bancaria, tarjetas de credito/debito (Visa, Mastercard), billeteras electronicas (Skrill, Neteller, Perfect Money), criptomonedas (Bitcoin, USDT, Ethereum), y metodos de pago locales segun la region del cliente.

### 3.2 Cual es el deposito minimo?

Depende del tipo de cuenta: $5 USD (Cent), $50 USD (Standard), $500 USD (Raw), $50,000 USD (Institutional). Algunos metodos de pago pueden tener minimos propios superiores al minimo de la cuenta.

### 3.3 Cuanto tarda un deposito en reflejarse?

La mayoria de los depositos se procesan de forma instantanea o en menos de 30 minutos. Transferencias bancarias pueden tardar 1-3 dias habiles. Criptomonedas dependen del numero de confirmaciones en la red (generalmente 15-60 minutos).

### 3.4 Cobran comision por depositar?

NEOMAAA Markets no cobra comision por depositos (fee broker $0 en todos los metodos). Sin embargo, el proveedor de pago o banco del cliente puede aplicar sus propias tarifas. [SOLO USO INTERNO] Los PSPs cobran MDR al broker (ver `operations/psps-explicados.md` seccion 4); NEOMAAA absorbe este costo como parte del modelo de negocio. Si a futuro un PSP se vuelve no sostenible, podria trasladarse; comunicar al cliente solo si se aprueba oficialmente.

### 3.5 En que monedas puedo depositar?

La moneda base de las cuentas es USD. Los depositos en otras monedas se convierten automaticamente a USD al tipo de cambio vigente del PSP al momento de la transaccion. Algunas variaciones de tipo de cambio pueden aplicar.

### 3.6 Mi deposito no se ha reflejado, que hago?

El cliente debe proporcionar: metodo de pago utilizado, monto, fecha y hora aproximada, y comprobante de transaccion si lo tiene. El agente de soporte verifica en Skale CRM y en el panel del PSP correspondiente. Si el deposito no aparece en ninguno, escalar al Finance Manager con toda la informacion.

---

## Categoria 4: Retiros

### 4.1 Como solicito un retiro?

Los retiros se solicitan desde el portal del cliente en el sitio web de NEOMAAA Markets. El cliente selecciona el metodo de retiro, ingresa el monto, y confirma la solicitud. Los retiros se procesan en el orden en que se reciben.

### 4.2 Cuanto tarda un retiro?

Los retiros se procesan dentro de 1-3 dias habiles dependiendo del metodo de pago. Billeteras electronicas y criptomonedas suelen ser mas rapidas (24 horas). Transferencias bancarias pueden tardar hasta 5 dias habiles por los tiempos del banco receptor.

### 4.3 Hay monto minimo de retiro?

Si. El monto minimo de retiro depende del metodo de pago seleccionado. Guia aproximada:
- Crypto (USDT/BTC): $10 USD
- Billeteras electronicas (Skrill/Neteller): $10 USD
- Tarjeta (refund): $10 USD (sujeto a minimo del PSP card)
- Transferencia bancaria (wire/SEPA): $50 USD (los fees correspondent hacen no-economico retirar menos)
- Metodos locales LATAM (PIX/SPEI/Nequi): segun el metodo, tipicamente $10-20 USD equivalentes

El portal del cliente muestra el minimo aplicable para cada metodo al momento de la solicitud.

### 4.4 Cobran comision por retirar?

**Politica base:** NEOMAAA no cobra comision broker por retiros. El PSP o banco destino puede aplicar fees propios (wire correspondent fees, red crypto, etc.) que se descuentan del monto recibido.

[SOLO USO INTERNO] Si un PSP especifico cobra fee al broker, la politica actual es absorberlo. Consultar tabla de tarifas actualizada en `operations/psps-explicados.md`. Para el cliente: "NEOMAAA no cobra comision de retiro. El banco o procesador del metodo elegido puede aplicar tarifas propias."

### 4.5 Por que me rechazaron un retiro?

Las razones mas comunes son: KYC no completado o no aprobado, monto mayor al saldo disponible, metodo de retiro diferente al de deposito (politica AML), posiciones abiertas que reducen el margen libre, o informacion bancaria incorrecta. El agente debe verificar el motivo especifico en Skale CRM y comunicarlo al cliente.

### 4.6 Puedo retirar a un metodo diferente al que use para depositar?

Por politica AML (Anti Money Laundering), los retiros deben procesarse al mismo metodo utilizado para el deposito, hasta cubrir el monto depositado. Ganancias por encima del deposito pueden retirarse a otros metodos aprobados. Excepciones requieren aprobacion de Compliance.

---

## Categoria 5: KYC y Compliance

### 5.1 Que es KYC y por que es necesario?

KYC (Know Your Customer) es el proceso de verificacion de identidad requerido por regulacion. Es obligatorio para todos los clientes antes de poder realizar retiros y, en algunos casos, antes de depositar montos superiores a umbrales definidos. NEOMAAA utiliza Sumsub para automatizar este proceso.

### 5.2 Que documentos necesito para verificarme?

Se requieren dos documentos:
1. **Documento de identidad:** Pasaporte, cedula/DNI nacional, o licencia de conducir (foto frontal y reverso si aplica).
2. **Comprobante de domicilio:** Factura de servicios, estado de cuenta bancario, o documento oficial con direccion (no mayor a 3 meses de antiguedad).

### 5.3 Cuanto tarda la verificacion KYC?

Con Sumsub, la verificacion automatica puede tardar desde 1-3 minutos hasta algunas horas. Si se requiere revision manual (documentos borrosos, informacion no coincidente, flags menores), puede tardar hasta 48 horas habiles. Si aplica EDD (Tier 3/4, PEP, deposito grande), puede extenderse hasta 5 dias habiles. El cliente recibe notificacion por email del resultado.

**Regla de comunicacion al cliente:** decir "24-48 horas" como tiempo estimado estandar. No prometer "minutos" aunque la mayoria pasen automaticamente.

### 5.4 Me rechazaron un documento, que hago?

Las razones comunes de rechazo son: foto borrosa o cortada, documento vencido, informacion no legible, o el comprobante de domicilio tiene mas de 3 meses. El cliente debe subir un nuevo documento que cumpla los requisitos. El agente puede verificar el motivo especifico del rechazo en Sumsub.

### 5.5 Puedo operar sin completar KYC?

**No.** Segun politica oficial AML/KYC, ningun cliente puede depositar, operar ni retirar sin KYC base aprobado (ID + PoA + liveness). La documentacion adicional escala segun la categoria de riesgo del cliente definida por Compliance (ver [Matriz de Riesgo](/content/compliance/risk-matrix)):

- **LOW RISK**: ID + PoA + liveness (KYC estandar)
- **MEDIUM RISK**: + Source of Funds (SoF) documentado
- **HIGH RISK**: + Source of Wealth (SoW) + EDD completo + aprobacion dual (Compliance Officer + Director)

Los triggers que disparan cada categoria estan en [EDD Triggers](/content/compliance/edd-triggers). No hay umbrales monetarios fijos — la categorizacion se basa en perfil del cliente, jurisdiccion, patron de comportamiento y criterios cualitativos definidos por Compliance Office.

### 5.6 Que pasa si soy menor de edad?

NEOMAAA Markets solo acepta clientes mayores de 18 anos. Si la verificacion KYC detecta que el solicitante es menor de edad, la cuenta sera rechazada automaticamente.

---

## Categoria 6: Trading y MT5

### 6.1 Que plataforma de trading usan?

MetaTrader 5 (MT5). Esta disponible para Windows, macOS, Android, iOS, y version web (WebTrader). Se descarga desde el sitio web de NEOMAAA Markets o directamente desde las tiendas de aplicaciones.

### 6.2 Como descargo e instalo MT5?

Desde el sitio web de NEOMAAA Markets, seccion "Plataformas". Seleccionar el sistema operativo, descargar el instalador, y seguir las instrucciones. Los datos de acceso (servidor, login, password) se envian por email al crear la cuenta de trading.

### 6.3 No puedo conectarme a MT5, que hago?

Pasos de solucion: 1) Verificar conexion a internet. 2) Confirmar que esta usando el servidor correcto (proporcionado por email). 3) Verificar que login y password son correctos (distingue mayusculas). 4) Si usa VPN, intentar sin VPN. 5) Si persiste, reinstalar MT5. Si ninguno funciona, escalar al equipo tecnico con los detalles del error.

### 6.4 Que instrumentos puedo operar?

Mas de 2,000 instrumentos incluyendo: pares de forex (majors, minors, exotics), indices (S&P 500, NASDAQ, DAX, etc.), commodities (oro, plata, petroleo, gas natural), acciones CFDs de mercados globales, y criptomonedas CFDs (Bitcoin, Ethereum, y mas).

### 6.5 Puedo usar Expert Advisors (EAs)?

Si. MetaTrader 5 soporta EAs (robots de trading) y scripts personalizados en MQL5. Los clientes pueden instalar y ejecutar sus propios EAs sin restricciones. NEOMAAA Markets no proporciona EAs propios.

### 6.6 Permiten scalping?

Si. No hay restricciones sobre estilos de trading. Scalping, day trading, swing trading, y trading algoritmico estan todos permitidos.

### 6.7 Permiten hedging?

Si. MT5 en NEOMAAA Markets esta configurado para permitir hedging (posiciones opuestas en el mismo instrumento simultaneamente).

---

## Categoria 7: Spreads y Comisiones

### 7.1 Cuales son los spreads tipicos?

Los spreads varian segun el tipo de cuenta y las condiciones de mercado:
- **Cent:** desde 1.5 pips en EUR/USD
- **Standard:** desde 1.0 pips en EUR/USD
- **Raw:** desde 0.0 pips en EUR/USD (mas comision)
- **Institutional:** desde 0.0 pips (comision negociable)

Los spreads son variables y se amplian durante noticias de alto impacto, apertura de mercado, y horarios de baja liquidez.

### 7.2 Que comisiones cobran?

Las cuentas Cent y Standard no tienen comision por operacion; el costo esta incluido en el spread. La cuenta Raw cobra $3.5 USD por lote estandar por lado ($7 USD round-trip). La cuenta Institutional tiene comisiones negociables.

### 7.3 Hay comisiones ocultas?

No. Las unicas comisiones son: spread (incluido en el precio), comision por lote en cuentas Raw/Institutional, y swap (interes overnight) si se mantienen posiciones abiertas durante la noche. No se cobran tarifas de mantenimiento, inactividad, o apertura de cuenta.

### 7.4 Que son los swaps?

Los swaps son cargos o creditos por mantener posiciones abiertas durante la noche (rollover). Se calculan basados en la diferencia de tasas de interes de las divisas del par operado. Los swaps se aplican a las 00:00 hora del servidor. Los miercoles se aplica swap triple (para cubrir el fin de semana).

---

## Categoria 8: Apalancamiento y Margen

### 8.1 Que apalancamiento ofrecen?

El apalancamiento maximo depende del tipo de cuenta:
- **Cent:** hasta 1:1000
- **Standard:** hasta 1:500
- **Raw:** hasta 1:200
- **Institutional:** hasta 1:100

El apalancamiento efectivo tambien depende del instrumento: forex majors tienen el apalancamiento maximo; exoticos, indices, commodities, y cripto pueden tener apalancamiento menor.

**Importante conceptual (Pepe):** el leverage **no multiplica capital**, reduce el margen requerido por 1/N. Con 1:500 el margen para 1 lote EUR/USD (~USD 115,000 nocionales) es ~USD 230. El cliente sigue asumiendo toda la exposicion nocional; lo unico que cambia es cuanto inmoviliza en margen. Reguladores Tier 1 (FCA/ESMA) limitan el leverage retail a 1:30 en forex major precisamente por eso.

### 8.2 Puedo cambiar mi apalancamiento?

Si. El cliente puede solicitar un cambio de apalancamiento desde el portal del cliente o contactando a soporte. El cambio se aplica cuando no hay posiciones abiertas. No se puede cambiar el apalancamiento con posiciones abiertas.

### 8.3 Que es el margin call?

El margin call ocurre cuando el nivel de margen de la cuenta cae por debajo del umbral definido (generalmente 100%). Es una alerta de que la cuenta se esta acercando al stop-out. El cliente debe depositar fondos adicionales o cerrar posiciones para aumentar el nivel de margen.

### 8.4 A que nivel se ejecuta el stop-out?

El stop-out se ejecuta cuando el nivel de margen cae al 20% (puede variar por tipo de cuenta). En ese punto, las posiciones se cierran automaticamente empezando por la que tiene mayor perdida, hasta que el nivel de margen se recupere por encima del umbral. [SOLO USO INTERNO] Los niveles exactos de margin call y stop-out pueden variar. Verificar la configuracion actual con Stanislav si un cliente reporta un cierre que no esperaba.

---

## Categoria 9: Copy Trading

### 9.1 Ofrecen copy trading?

Si, vía **MQL5 Signals** — el sistema nativo de copy trading de MT5 operado por MetaQuotes. NEOMAAA no opera un sistema propio de copy trading ni MAM/PAMM actualmente. Link oficial: https://www.mql5.com/en/signals

### 9.2 Como me suscribo a un proveedor de senales?

Desde MT5, ir a la pestana "Signals", explorar los proveedores disponibles, seleccionar uno, y configurar los parametros de copia (porcentaje del saldo, riesgo maximo, etc.). Algunos proveedores cobran una tarifa de suscripcion directamente a traves de MQL5.com.

### 9.3 Puedo ser proveedor de senales?

Si. Los traders con historial verificado pueden registrarse como proveedores de senales en MQL5.com y ofrecer sus operaciones para que otros las copien. NEOMAAA Markets no administra este programa directamente; es gestionado por MetaQuotes.

---

## Categoria 10: VPS

### 10.1 Ofrecen servicio de VPS?

NEOMAAA Markets puede recomendar proveedores de VPS optimizados para trading con MT5. Un VPS permite que los Expert Advisors y las suscripciones de senales funcionen 24/7 sin necesidad de tener la computadora encendida. [SOLO USO INTERNO] Actualmente no ofrecemos VPS propio ni subsidiado. Si un cliente pregunta, recomendar proveedores de VPS de terceros reconocidos en la industria.

### 10.2 Necesito un VPS para operar?

No. El VPS es opcional y solo recomendado para traders que usan EAs automaticos que necesitan ejecutarse continuamente, o para traders que copian senales y quieren ejecucion ininterrumpida.

---

## Categoria 11: Vault Yield

### 11.1 Que es Vault Yield?

[SOLO USO INTERNO] Vault Yield es una funcionalidad planificada que permitiria a los clientes generar rendimientos sobre fondos no utilizados en su cuenta. Actualmente NO esta disponible. Si un cliente pregunta, responder: "Esta funcionalidad esta en desarrollo y sera anunciada cuando este disponible. Le notificaremos por email." No dar fechas ni detalles del programa.

---

## Categoria 12: Cuentas Swap-Free (Islamicas)

### 12.1 Ofrecen cuentas swap-free?

Si. Los clientes que por razones religiosas no pueden recibir ni pagar intereses (swap) pueden solicitar que su cuenta sea convertida a swap-free. Se aplica una tarifa administrativa fija en lugar del swap. La solicitud se hace a traves de soporte.

### 12.2 Que condiciones tienen las cuentas swap-free?

Las cuentas swap-free no reciben cargo ni credito de swap. En su lugar, se aplica una tarifa administrativa por dia que la posicion permanezca abierta. Esta tarifa es fija por instrumento y se detalla en la tabla de condiciones del sitio web. Las demas condiciones de la cuenta (spreads, comisiones, apalancamiento) no cambian.

### 12.3 Cualquiera puede solicitar una cuenta swap-free?

La cuenta swap-free esta disponible para clientes que la soliciten. NEOMAAA Markets se reserva el derecho de revocar el estatus swap-free si se detecta abuso (uso del estatus para arbitraje de swaps positivos, por ejemplo).

---

## Categoria 13: Soporte

### 13.1 Como contacto a soporte?

Hay 4 canales disponibles:
1. **Chat en vivo** (Intercom) — disponible en el sitio web, respuesta en menos de 2 minutos en horario laboral.
2. **Email** — respuesta en menos de 1 hora en horario laboral.
3. **WhatsApp** — disponible para clientes LATAM.
4. **Telefono** — +41 44 707 9633, en horario de soporte.

### 13.2 En que idiomas atienden?

Espanol (nativo) e ingles (fluido). Soporte en espanol cubre horario LATAM (9:00-18:00 COL/MEX). Soporte en ingles cubre horario Middle East / África / Asia (9:00-18:00 GST/CET equivalente) — Europa NO es mercado operativo pero CET sigue siendo referencia de turno por ubicación de agentes.

### 13.3 Que hago si mi problema no se resuelve en soporte?

Si el agente de soporte no puede resolver el problema, lo escalara al departamento correspondiente (Finance, Compliance, Tech). El cliente recibira un numero de ticket y una estimacion de tiempo de resolucion. Los casos escalados se revisan en un maximo de 24 horas habiles.

### 13.4 Tienen oficinas fisicas?

[SOLO USO INTERNO] La empresa opera de forma 100% remota. No tenemos oficinas fisicas abiertas al publico. Para clientes: "NEOMAAA Markets opera con un equipo distribuido globalmente, lo que nos permite brindar soporte en multiples zonas horarias. Todo el soporte se maneja de forma digital para mayor eficiencia."

---

## Categoria 14: Regulacion y Seguridad Legal

### 14.1 Estan regulados?

NEOMAAA Markets opera bajo la licencia L15968/N emitida por la Anjouan Offshore Finance Authority (AOFA), Union of Comoros. Esta licencia autoriza servicios de brokerage, dealing, y gestion de carteras.

### 14.2 Que es la AOFA?

La AOFA (Anjouan Offshore Finance Authority) es el regulador financiero de la isla autonoma de Anjouan en la Union de Comoros. Supervisa y licencia entidades de servicios financieros offshore que operan desde su jurisdiccion.

### 14.3 Los fondos de los clientes estan segregados?

Si. Los fondos de los clientes se mantienen en cuentas segregadas, separadas de los fondos operativos de la empresa. Esto significa que los fondos de clientes no se utilizan para operaciones de la empresa.

### 14.4 Tienen politica de proteccion de saldo negativo?

Si. NEOMAAA Markets ofrece proteccion de saldo negativo. Si una posicion resulta en un saldo negativo en la cuenta del cliente (evento extremo de mercado), el saldo se restablece a cero. El cliente no debera dinero al broker. [SOLO USO INTERNO] Verificar con Stanislav que esta proteccion esta correctamente configurada en MT5 antes de confirmar a clientes.

### 14.5 Que documentos legales debo leer antes de operar?

Todos los clientes deben revisar antes de abrir cuenta: Terms and Conditions, Privacy Policy, Risk Disclosure, AML Policy, y Order Execution Policy. Estos documentos estan disponibles en el sitio web del broker y se presentan durante el proceso de registro.

---

## Categoria 15: Seguridad de la Cuenta

### 15.1 Como protegen mi cuenta?

Las cuentas estan protegidas con: login y password cifrados, verificacion de email, y la opcion de autenticacion de dos factores (2FA). Ademas, los retiros requieren verificacion KYC completada y solo se procesan al metodo de deposito original (politica AML).

### 15.2 Que hago si creo que alguien accedio a mi cuenta?

El cliente debe: 1) Cambiar su password inmediatamente desde el portal del cliente. 2) Contactar a soporte para reportar el incidente. 3) El equipo bloqueara temporalmente la cuenta mientras se investiga. [SOLO USO INTERNO] Escalar inmediatamente a Yulia (Compliance) cualquier reporte de acceso no autorizado. Documentar hora, IP si disponible, y acciones tomadas.

### 15.3 Olvide mi password, como lo recupero?

Desde la pagina de login del portal del cliente, hacer clic en "Forgot Password" e ingresar el email registrado. Se enviara un enlace de restablecimiento. Si el cliente no tiene acceso al email registrado, debe contactar soporte con su documento de identidad para verificacion manual.

---

## Categoria 16: Programa de Afiliados / IBs

### 16.1 Tienen programa de afiliados?

Si. NEOMAAA Markets ofrece un programa de Introducing Brokers (IBs) donde partners pueden referir clientes y ganar comisiones por su actividad de trading. Los interesados deben contactar al equipo de ventas/partnerships para obtener los detalles del programa y el enlace de registro.

### 16.2 Como funciona la comision de afiliados?

[SOLO USO INTERNO] La estructura exacta de comisiones del programa IB depende del acuerdo negociado con cada partner. Generalmente incluye comision por lote operado (rebate) o CPA (costo por adquisicion). Los detalles especificos no deben compartirse publicamente. Dirigir a interesados al equipo de ventas.

### 16.3 Necesito KYC para ser afiliado?

Si. Los IBs deben completar el mismo proceso de KYC que los clientes regulares, ademas de firmar el acuerdo de IB. Esto es requerido por compliance para poder pagar comisiones.

---

## Categoria 17: Situaciones Especiales y Escalacion

### 17.1 Un cliente amenaza con reportar a un regulador, que hago?

[SOLO USO INTERNO] Mantener la calma y profesionalismo. Documentar la queja textualmente. No hacer promesas ni admitir culpa. Responder: "Entendemos su frustracion y queremos resolver su situacion. Hemos escalado su caso a nuestro equipo de compliance quien le contactara en las proximas 24 horas." Escalar inmediatamente a Yulia con el ticket completo.

### 17.2 Un cliente dice que le hackearon la cuenta y le robaron fondos, que hago?

[SOLO USO INTERNO] 1) Bloquear la cuenta inmediatamente (pedir al supervisor o Compliance que lo haga en Skale CRM). 2) Documentar todo lo que reporta el cliente. 3) Escalar a Yulia y Stanislav simultaneamente. 4) Responder al cliente: "Hemos asegurado su cuenta y nuestro equipo de seguridad esta investigando. Le contactaremos en un maximo de 24 horas con una actualizacion." No especular sobre lo que pudo haber pasado.

### 17.3 Un cliente quiere depositar un monto muy grande (>$10,000), que hago?

[SOLO USO INTERNO] Depositos superiores a $10,000 USD requieren verificacion adicional de compliance (EDD — Enhanced Due Diligence). Verificar que el KYC del cliente esta aprobado. Escalar a Yulia antes de confirmar la aceptacion del deposito. No rechazar al cliente; simplemente informar que depositos de montos elevados requieren verificaciones adicionales por regulacion.

### 17.4 El MT5 esta caido y los clientes no pueden operar, que hago?

[SOLO USO INTERNO] 1) Verificar si el issue es del lado del cliente (conexion, version de MT5) o del servidor. 2) Si es del servidor, reportar inmediatamente a Stanislav en #war-room o Slack. 3) Informar a los clientes: "Estamos experimentando una intermitencia tecnica que nuestro equipo esta resolviendo. Le actualizaremos en los proximos 30 minutos." 4) Documentar hora de inicio, hora de resolucion, y clientes afectados.

### 17.5 Un cliente quiere cerrar su cuenta y retirar todo, que hago?

Verificar que no tiene posiciones abiertas. Si las tiene, debe cerrarlas primero. Procesar el retiro del saldo completo al metodo de deposito original. Una vez procesado el retiro, marcar la cuenta como cerrada en Skale CRM. No intentar retener al cliente de forma agresiva; preguntar el motivo de forma profesional y documentarlo.

---

## Categoria 18: Datos Operativos Internos

### 18.1 Cual es el tamano actual del equipo?

[SOLO USO INTERNO] 12 personas activas + 4 vacantes por cubrir. Los 3 Principals (Diego, Yulia, Stanislav) no reciben salario; su compensacion es equity. La nomina actual es aproximadamente $21,000 USD/mes, proyectada a $34,000 USD/mes con el equipo completo de Stage 1.

### 18.2 Que CRM usamos?

Skale CRM. Es el sistema central para gestion de clientes, depositos, retiros, y reportes. Todos los miembros del equipo con acceso deben tener sus credenciales y conocer las funciones relevantes a su rol.

### 18.3 Que sistema de KYC usamos?

Sumsub. Es la plataforma de verificacion de identidad automatizada. Procesa documentos de identidad y comprobantes de domicilio. Los agentes de soporte pueden consultar el estado de verificacion de un cliente en el panel de Sumsub.

### 18.4 Que sistema de soporte usamos?

Intercom. Es la plataforma de chat en vivo, email, y gestion de tickets. Todos los agentes de soporte operan desde Intercom. Tambien se usa para mensajes automatizados y base de conocimiento publica (si se configura).

### 18.5 Como se manejan las escalaciones internas?

Flujo de escalacion:
1. **Soporte L1** (agente) resuelve consultas estandar.
2. Si no puede resolver, escala a **Head of Support**.
3. Si es tema financiero: escala a **Finance Manager**.
4. Si es tema de compliance/KYC: escala a **Yulia**.
5. Si es tema tecnico/MT5: escala a **Stanislav**.
6. Si requiere decision de negocio: escala a **Diego**.
Toda escalacion debe incluir: numero de ticket, resumen del problema, acciones ya tomadas, y que se necesita del siguiente nivel.

---

## Categoria 19: Marketing y Ventas (Referencia para Soporte)

### 19.1 Tenemos programa de bonos de bienvenida?

[SOLO USO INTERNO] Cualquier programa de bonos, promociones, o incentivos debe ser aprobado por los Principals y comunicado formalmente al equipo. No ofrecer bonos, descuentos, o condiciones especiales a clientes sin autorizacion explicita. Si un cliente pregunta por promociones, verificar las promociones vigentes en el canal de marketing interno.

### 19.2 Un lead pregunta por que elegir NEOMAAA sobre otro broker, que digo?

Puntos clave de diferenciacion: mas de 2,000 instrumentos, apalancamiento hasta 1:1000, cuentas desde $5 USD, ejecucion ECN/STP sin dealing desk, 120+ metodos de deposito, soporte en espanol nativo para LATAM, MetaTrader 5 (la plataforma mas avanzada), y spreads competitivos desde 0.0 pips. No hablar mal de competidores especificos.

---

## Categoria 20: Preguntas Tecnicas Frecuentes

### 20.1 Que es un pip?

Un pip (Percentage in Point) es la unidad minima de movimiento de precio en forex. Para la mayoria de pares, un pip es el cuarto decimal (0.0001). Para pares con JPY, un pip es el segundo decimal (0.01). Un pip en 1 lote estandar de EUR/USD equivale aproximadamente a $10 USD.

### 20.2 Que es un lote?

Un lote es la unidad de medida de volumen de una operacion. Un lote estandar equivale a 100,000 unidades de la moneda base. Tambien existen mini lotes (10,000), micro lotes (1,000), y en la cuenta Cent, los lotes operan en centavos.

### 20.3 Que es el spread?

El spread es la diferencia entre el precio de compra (ask) y el precio de venta (bid) de un instrumento. Es el principal costo de transaccion en cuentas sin comision. Un spread de 1.0 pip en EUR/USD significa que al abrir una operacion, el precio debe moverse 1 pip a favor antes de que la posicion sea rentable.

### 20.4 Que es el margen?

El margen es la cantidad de fondos que se reservan en la cuenta como garantia para mantener una posicion abierta. Se calcula segun el tamano de la posicion y el apalancamiento utilizado. Por ejemplo, con apalancamiento 1:100, para abrir 1 lote de EUR/USD ($100,000) se requiere $1,000 de margen.

### 20.5 Que es slippage?

El slippage ocurre cuando una orden se ejecuta a un precio diferente al solicitado. Puede ser positivo (mejor precio) o negativo (peor precio). Es comun durante noticias de alto impacto, gaps de mercado, y horarios de baja liquidez. El modelo ECN/STP de NEOMAAA minimiza el slippage pero no lo elimina completamente, ya que depende de las condiciones del mercado.

---

*Fin del documento. Este FAQ debe revisarse y actualizarse mensualmente por el Head of Support con aprobacion de los Principals. Cualquier miembro del equipo puede sugerir adiciones o correcciones a traves del canal interno designado.*
