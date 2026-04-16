# NEOMAAA -- Manual Completo de Onboarding de Clientes

**Version:** 1.0
**Fecha:** 8 de abril de 2026
**Uso interno -- Equipo de Ventas, Soporte y Compliance**

---

## INDICE

1. [Mapa del Journey del Cliente](#1-mapa-del-journey-del-cliente)
2. [Detalle por Etapa](#2-detalle-por-etapa)
3. [Guia de Recomendacion de Tipo de Cuenta](#3-guia-de-recomendacion-de-tipo-de-cuenta)
4. [Guia de Primer Deposito por Pais](#4-guia-de-primer-deposito-por-pais)
5. [Guia de Configuracion de MT5](#5-guia-de-configuracion-de-mt5)
6. [Touchpoints Post-Onboarding](#6-touchpoints-post-onboarding)
7. [Puntos de Falla y Acciones de Recuperacion](#7-puntos-de-falla-y-acciones-de-recuperacion)
8. [Anexos: Scripts y Templates](#8-anexos-scripts-y-templates)

---

## 1. MAPA DEL JOURNEY DEL CLIENTE

```
DESCUBRIMIENTO ──> REGISTRO ──> KYC ──> APROBACION ──> DEPOSITO ──> SETUP MT5 ──> 1er TRADE ──> RELACION
    |                 |           |          |             |            |             |             |
  Ads/Redes      Formulario   Sumsub    Susana        120+ metodos  Descarga     Ejecuta       Retention
  Referidos      2 minutos    ID+Proof  revisa        por pais      + login      operacion     Touchpoints
  Orgánico       Skale CRM    Auto/Man  Skale CRM     Skale CRM     MT5 app      MT5           Ongoing
    |                 |           |          |             |            |             |             |
  MARKETING      VENTAS       COMPLIANCE  COMPLIANCE   VENTAS/       SOPORTE      SOPORTE       VENTAS/
                 Franco       Susana      Susana       SOPORTE                                  SOPORTE
                 Edward
                 Luis
```

### Tiempos objetivo por etapa:

| Etapa | Tiempo objetivo | Tiempo maximo |
|-------|----------------|---------------|
| Descubrimiento -> Registro | Variable (ads, orgánico) | -- |
| Registro | 2 minutos | 5 minutos |
| KYC (envio documentos) | 5-10 minutos | 24 horas |
| Verificacion KYC (Tier 1 auto) | 1-5 minutos (auto) | 48 horas habiles (manual) |
| Verificacion KYC (Tier 2+) | 24-48 horas habiles | 5 dias habiles (EDD) |
| Aprobacion de cuenta | Inmediata post-KYC | 4 horas |
| Primer deposito | Mismo dia de aprobacion | 72 horas |
| Setup MT5 | 10 minutos | 1 hora (con soporte) |
| Primer trade | Inmediato post-setup | 7 dias |

**Meta global: De registro a primer trade en menos de 1 hora para el 60% de los clientes.**

---

## 2. DETALLE POR ETAPA

---

### ETAPA 1: DESCUBRIMIENTO

**Objetivo:** El prospecto conoce NEOMAAA y decide registrarse.

**Responsable:** Marketing + Ventas (Franco, Edward, Luis)

**Canales de adquisicion:**
- Anuncios pagados (Meta Ads, Google Ads, TikTok)
- Redes sociales organicas (Instagram, TikTok, YouTube)
- Referidos de clientes existentes
- Partnerships con educadores/influencers de trading
- ZenDM (outreach por Discord)
- SEO / contenido educativo

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| Prospecto llega pero no se registra | Retargeting con ads + landing optimizada |
| Prospecto pregunta en redes pero nadie responde | SLA de respuesta en redes: 15 minutos en horario laboral |
| Prospecto de pais restringido intenta registrarse | Geo-blocking en landing + mensaje claro de restriccion |

> [!WARNING]
> **Paises restringidos:** no aceptamos clientes de USA, Canada, EEA (todos los paises), UK, Australia, Cuba, Iraq, Myanmar, North Korea, Sudan + sancionados. Lista completa y gold source: [`compliance/screening-sanciones`](/content/compliance/screening-sanciones) seccion 12.5.

**Script de primer contacto (cuando el lead llega por DM/chat):**

> Hola [nombre]! Bienvenido a NEOMAAA. Somos un broker de forex y CFDs con MetaTrader 5, spreads desde 0.0 pips, y mas de 120 metodos de deposito para que operes desde tu pais sin complicaciones.
>
> Cuanto tiempo llevas en el trading? Asi te recomiendo la mejor cuenta para ti.

---

### ETAPA 2: REGISTRO

**Objetivo:** El prospecto crea su cuenta en menos de 2 minutos.

**Responsable:** Ventas (guia el proceso) + Sistema (Skale CRM)

**Flujo del registro:**

1. Prospecto accede a la pagina de registro (link directo o desde landing)
2. Completa formulario:
   - Nombre completo
   - Email
   - Telefono (con codigo de pais)
   - Pais de residencia
   - Contrasena
3. Acepta terminos y condiciones
4. Click en "Crear Cuenta"
5. Email de confirmacion automatico
6. Prospecto confirma email
7. Se crea perfil en Skale CRM automaticamente
8. Lead se asigna al vendedor correspondiente

**Asignacion de leads:**
| Vendedor | Region/Idioma | Horario |
|----------|---------------|---------|
| Franco | LATAM general / Espanol | 9am-6pm CST |
| Edward | LATAM general / Espanol | 9am-6pm CST |
| Luis | LATAM general / Espanol | 9am-6pm CST |

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| El email de confirmacion no llega | Revisar spam. Reenviar manualmente desde Skale. Si persiste, verificar dominio de email |
| Pais restringido seleccionado | El sistema debe bloquear automaticamente. Si pasa, Susana rechaza en KYC |
| Formulario da error tecnico | Soporte registra manualmente en Skale + escala a dev |
| Prospecto abandona formulario a la mitad | Trigger de email automatico: "Tu registro esta incompleto" a los 30 minutos |

**Template de email de bienvenida (automatico post-registro):**

> Asunto: Bienvenido a NEOMAAA -- Tu cuenta esta casi lista
>
> Hola [nombre],
>
> Gracias por registrarte en NEOMAAA. Estas a solo unos pasos de comenzar a operar con MetaTrader 5.
>
> Tu siguiente paso: Verificar tu identidad (KYC)
>
> Es rapido -- solo necesitas:
> - Una foto de tu documento de identidad (INE, cedula, pasaporte)
> - Un selfie o foto en vivo
>
> [BOTON: Verificar mi identidad]
>
> Si tienes dudas, escribe a tu asesor asignado [nombre vendedor] por WhatsApp: [numero]
>
> -- Equipo NEOMAAA

---

### ETAPA 3: VERIFICACION KYC

**Objetivo:** Verificar identidad del cliente cumpliendo regulaciones Anjouan.

**Responsable:** Sumsub (automatizado) + Susana (revision manual si es necesario)

**Documentos requeridos:**

| Tipo | Documentos aceptados | Notas |
|------|---------------------|-------|
| Documento de identidad | Pasaporte, ID nacional (INE, cedula, DNI), licencia de conducir | Debe estar vigente, foto legible |
| Prueba de identidad (selfie) | Selfie en vivo via Sumsub | Comparacion biometrica automatica |
| Prueba de domicilio (si aplica) | Recibo de servicios, estado bancario (< 3 meses) | Solo si Sumsub lo solicita o Susana lo requiere |

**Flujo KYC en Sumsub:**

1. Cliente accede al link de verificacion (desde Skale o email)
2. Sumsub muestra las instrucciones
3. Cliente sube foto de documento (frente y reverso si aplica)
4. Cliente toma selfie en vivo
5. Sumsub procesa automaticamente (1-5 minutos)
6. Resultado:
   - **APROBADO** -> pasa automaticamente a Etapa 4
   - **REVISION MANUAL** -> Susana revisa en max 48 horas habiles (SLA interno conservador)
   - **EDD requerido** (Tier 3+, PEP, pais alto riesgo) -> hasta 5 dias habiles
   - **RECHAZADO** -> Se notifica al cliente con razon y opcion de reintentar

**Criterios de rechazo:**
- Documento vencido
- Foto borrosa o cortada
- Selfie no coincide con documento
- Pais de residencia restringido
- Sospecha de documento falso
- Persona politicamente expuesta (PEP) sin documentacion adicional

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| Documento rechazado por foto borrosa | Vendedor contacta por WhatsApp: "Tu foto salio borrosa, vuelve a intentar con buena luz" |
| Cliente no tiene pasaporte/ID vigente | Aceptar otro documento valido. Si ninguno sirve, escalar a Susana |
| Sumsub pide prueba de domicilio y el cliente no la tiene | Aceptar estado de cuenta bancario, recibo de telefono, o factura de servicios (< 3 meses) |
| KYC tarda mas de 24 horas | Susana debe priorizar. Vendedor informa al cliente: "Estamos verificando, maximo 24h" |
| Cliente de Argentina con CUIL/CUIT en vez de DNI | DNI es aceptado. CUIL/CUIT no es documento de identidad |

**Script de soporte para KYC rechazado:**

> Hola [nombre], tu verificacion necesita un pequeno ajuste.
>
> El problema fue: [foto borrosa / documento vencido / selfie no coincide].
>
> Puedes volver a intentarlo aqui: [link Sumsub]
>
> Tips para que salga bien:
> - Buena iluminacion, sin flash
> - Documento completo, sin cortar esquinas
> - Selfie mirando de frente a la camara
>
> Si necesitas ayuda, estoy aqui.

---

### ETAPA 4: APROBACION DE CUENTA

**Objetivo:** Cuenta aprobada y lista para depositar.

**Responsable:** Susana (Compliance) + Sistema (Skale CRM)

**Flujo:**

1. Sumsub marca como APROBADO (o Susana aprueba manualmente)
2. Skale CRM actualiza estado del cliente a "Verificado"
3. Se genera cuenta de trading MT5 automaticamente
4. Cliente recibe email con:
   - Confirmacion de cuenta aprobada
   - Credenciales de MT5 (servidor, login, contrasena)
   - Instrucciones para depositar
   - Link de descarga de MT5
5. Vendedor asignado recibe notificacion en Skale
6. Vendedor contacta al cliente dentro de los siguientes 15 minutos

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| Credenciales de MT5 no se generan automaticamente | Soporte las genera manualmente en MT5 Admin y las envia por email |
| Email de aprobacion va a spam | Vendedor envia credenciales por WhatsApp directamente |
| Susana tiene backlog de revisiones | Priorizar por tamano de deposito potencial (Institutional > Raw > Standard > Cent) |

**Template de email post-aprobacion:**

> Asunto: Tu cuenta NEOMAAA esta aprobada -- Ya puedes operar!
>
> Hola [nombre],
>
> Tu cuenta ha sido verificada exitosamente. Aqui tienes tus datos para comenzar:
>
> **Datos de tu cuenta MT5:**
> - Servidor: [servidor NEOMAAA]
> - Login: [numero de login]
> - Contrasena: [contrasena]
> - Tipo de cuenta: [Cent/Standard/Raw/Institutional]
>
> **Siguiente paso:** Deposita fondos y comienza a operar
>
> [BOTON: Depositar ahora]
>
> **Descarga MetaTrader 5:**
> - Windows: [link]
> - Mac: [link]
> - Android: [link]
> - iOS: [link]
>
> Tu asesor [nombre vendedor] te va a contactar en breve para ayudarte con tu primer deposito.
>
> -- Equipo NEOMAAA

---

### ETAPA 5: PRIMER DEPOSITO (FTD)

**Objetivo:** El cliente deposita fondos por primera vez.

**Responsable:** Ventas (Franco, Edward, Luis) + Soporte

**Esta es la etapa mas critica. El FTD define si el lead se convierte en cliente real.**

**Minimos por tipo de cuenta:**

| Cuenta | Deposito minimo | Metodo recomendado |
|--------|----------------|-------------------|
| Cent | $5 USD | Crypto (USDT), tarjeta, pago local |
| Standard | $50 USD | Pago local, tarjeta, crypto |
| Raw | $500 USD | Transferencia bancaria, crypto, tarjeta |
| Institutional | $50,000 USD | Transferencia bancaria, crypto |

**Proceso de deposito:**

1. Cliente ingresa al portal de Skale CRM
2. Selecciona "Depositar"
3. Elige metodo de pago (120+ opciones)
4. Ingresa monto
5. Completa el pago segun el metodo
6. Fondos se acreditan:
   - Crypto: 5-30 minutos
   - Tarjeta: Instantaneo
   - Pagos locales (OXXO, PIX, PSE): 5 minutos a 24 horas
   - Transferencia bancaria: 1-3 dias habiles

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| Tarjeta rechazada | Sugerir otro metodo: crypto o pago local. Verificar con el banco si hay bloqueo de transacciones internacionales |
| Deposito no se acredita | Soporte verifica en el procesador de pagos. Si confirma pago, acreditar manualmente |
| Cliente no sabe como depositar en crypto | Vendedor envia guia paso a paso (ver Seccion 4: Argentina) |
| Monto menor al minimo de la cuenta | Sugerir cuenta Cent ($5 min) o aumentar deposito |
| Cliente quiere depositar pero tiene miedo | Vendedor usa objecion handling: "Empieza con la cuenta Cent, solo $5, sin riesgo" |

**Script para impulsar el FTD:**

> [nombre], tu cuenta ya esta lista! Solo falta el deposito para empezar a operar.
>
> Cual metodo de pago prefieres? Tenemos [metodo local de su pais], tarjeta Visa/Mastercard, y crypto.
>
> Si es tu primera vez en forex, la cuenta Cent es perfecta: empiezas desde $5 con apalancamiento 1:1000. Cero riesgo real.
>
> Te guio paso a paso?

---

### ETAPA 6: SETUP DE MT5

**Objetivo:** Cliente descarga, instala y accede a MT5 con sus credenciales.

**Responsable:** Soporte (agente LATAM o Europa-ME segun idioma)

**(Ver seccion completa en Seccion 5)**

---

### ETAPA 7: PRIMER TRADE

**Objetivo:** El cliente ejecuta su primera operacion.

**Responsable:** Soporte + Ventas (seguimiento)

**Flujo:**

1. Cliente ya tiene MT5 configurado y fondos depositados
2. Soporte/Ventas verifica que la cuenta aparece con balance
3. Si el cliente es principiante, soporte le guia para abrir su primera operacion:
   - Seleccionar par (recomendar EUR/USD por ser el mas liquido)
   - Explicar compra vs venta
   - Definir tamano del lote (para Cent: 0.01 es seguro)
   - Colocar la orden
4. Confirmar que la operacion se ejecuto
5. Marcar en Skale CRM: "Primer trade completado"

**Lo que puede salir mal:**
| Problema | Solucion |
|----------|----------|
| "No me aparecen pares" | Verificar que la cuenta esta activa y con fondos. Agregar simbolos desde Market Watch |
| "Dice margen insuficiente" | El lote es muy grande para su balance. Reducir tamano |
| "No se como poner un trade" | Soporte hace screen-share o envia video guia |
| Mercado cerrado (fin de semana) | Informar horarios: Domingo 5pm - Viernes 5pm EST |
| Spreads muy amplios | Explicar que fuera de sesion de Londres/NY los spreads se amplian |

**Mensaje de felicitacion post-primer trade:**

> Felicidades [nombre]! Ya ejecutaste tu primera operacion en NEOMAAA.
>
> Recuerda:
> - Nunca arriesgues mas del 2% de tu cuenta por trade
> - Usa stop loss siempre
> - Practica con lotes pequenos mientras aprendes
>
> Funciones que te pueden interesar:
> - Copy Trading: Copia a traders rentables automaticamente
> - VPS: Opera 24/7 sin tener tu PC encendida
> - Vault Yield: Genera rendimiento sobre tu capital estacionado
>
> Cualquier duda, estamos aqui.

---

### ETAPA 8: RELACION CONTINUA

**Objetivo:** Retener al cliente, aumentar depositos, reducir churn.

**Responsable:** Ventas + Soporte + Marketing

**(Ver detalle completo en Seccion 6: Touchpoints Post-Onboarding)**

---

## 3. GUIA DE RECOMENDACION DE TIPO DE CUENTA

### Tabla de decision rapida para vendedores:

```
PREGUNTA 1: Cuanto piensas depositar inicialmente?

  $5 - $49     -> CENT
  $50 - $499   -> STANDARD
  $500 - $49K  -> RAW
  $50K+        -> INSTITUTIONAL

PREGUNTA 2: Que experiencia tienes en trading?

  Ninguna / Principiante    -> CENT (siempre, sin importar deposito)
  Intermedio (6 meses - 2a) -> STANDARD o RAW
  Avanzado (2+ anos)        -> RAW o INSTITUTIONAL
  Profesional / Fondo       -> INSTITUTIONAL

PREGUNTA 3: Que estilo de trading usas?

  Scalping       -> RAW (spreads desde 0.0 + comision fija es mejor)
  Day trading    -> STANDARD o RAW
  Swing trading  -> STANDARD (spreads incluidos, sin comision)
  Copy Trading   -> CENT o STANDARD (bajo riesgo)
  EA / Robots    -> RAW + VPS (necesitan spreads bajos)
```

### Perfiles detallados por cuenta:

---

#### CUENTA CENT

| Caracteristica | Detalle |
|---------------|---------|
| Deposito minimo | $5 USD |
| Apalancamiento | Hasta 1:1000 |
| Spreads | Desde 1.0 pip |
| Comision | $0 |
| Tamano de lote | Micro-lotes (1 lote = 1,000 unidades) |
| Swap-free | Disponible (hasta 2 meses post-apertura) |

**Cliente ideal:**
- Primera vez en forex
- Quiere probar sin riesgo real
- Deposito inicial pequeno ($5-$50)
- Estudiante o persona con ingreso limitado
- Cliente que viene de prop firms y quiere operar real por primera vez

**Frase de venta:**
> "La cuenta Cent es perfecta para empezar. Con $5 ya estas operando con dinero real pero con riesgo minimo. Cuando te sientas listo, puedes escalar a Standard sin problema."

---

#### CUENTA STANDARD

| Caracteristica | Detalle |
|---------------|---------|
| Deposito minimo | $50 USD |
| Apalancamiento | Hasta 1:1000 |
| Spreads | Desde 1.0 pip |
| Comision | $0 |
| Tamano de lote | Standard (1 lote = 100,000 unidades) |
| Swap-free | Disponible (hasta 2 meses post-apertura) |

**Cliente ideal:**
- Trader intermedio con algo de experiencia
- Day trader o swing trader
- No quiere preocuparse por comisiones
- Deposito de $50 a $500
- Quiere simplicidad (spread todo incluido)

**Frase de venta:**
> "Standard es nuestra cuenta mas popular. Spreads competitivos, sin comisiones adicionales, y apalancamiento hasta 1:1000. Con $50 ya operas lotes completos."

---

#### CUENTA RAW

| Caracteristica | Detalle |
|---------------|---------|
| Deposito minimo | $500 USD |
| Apalancamiento | Hasta 1:200 |
| Spreads | Desde 0.0 pips |
| Comision | $3 por lote por lado ($6 round trip) |
| Tamano de lote | Standard (1 lote = 100,000 unidades) |
| Swap-free | Disponible (hasta 2 meses post-apertura) |

**Cliente ideal:**
- Trader avanzado
- Scalper o trader de alta frecuencia
- Usa EAs / robots de trading
- Necesita spreads lo mas bajos posible
- Deposito de $500 a $50K
- Entiende la estructura de comisiones

**Frase de venta:**
> "Raw te da spreads desde 0.0 pips directo del mercado. Si eres scalper o usas robots, la diferencia en spreads te ahorra mas que la comision de $3 por lado. Es la cuenta para traders serios."

**Nota importante:** El apalancamiento de Raw es 1:200 (no 1:1000). Asegurarse de que el cliente entiende esto antes de abrir.

---

#### CUENTA INSTITUTIONAL

| Caracteristica | Detalle |
|---------------|---------|
| Deposito minimo | $50,000 USD |
| Apalancamiento | Personalizado |
| Spreads | Personalizados (mejores que Raw) |
| Comision | Personalizada (negociable) |
| Tamano de lote | Standard |
| Swap-free | Negociable |

**Cliente ideal:**
- Fund manager / gestor de fondos
- Family office
- Trader profesional con capital significativo
- Empresa que necesita cobertura de divisas
- IB (Introducing Broker) grande

**Proceso especial:**
1. Lead contacta a ventas
2. Ventas recopila informacion: volumen esperado, estrategia, capital
3. Ventas escala a direccion para negociar condiciones
4. Se prepara propuesta personalizada
5. KYC reforzado (documentos corporativos si aplica)
6. Susana revisa con atencion extra
7. Onboarding personalizado con soporte dedicado

**Frase de venta:**
> "Para volumen institucional tenemos condiciones personalizadas. Me puedes compartir tu volumen mensual estimado y tu estrategia? Asi preparo una propuesta a tu medida."

---

### Arbol de decision visual para vendedores:

```
                          NUEVO LEAD
                              |
                    "Cuanto vas a depositar?"
                              |
              ________________|________________
             |          |          |            |
           <$50      $50-499   $500-49K      $50K+
             |          |          |            |
           CENT     STANDARD    RAW       INSTITUTIONAL
             |          |          |            |
       "Que experiencia tienes?"               |
             |          |          |       Escalar a
        Principiante  Intermedio  Avanzado  direccion
             |          |          |
           CENT     STANDARD    RAW
        (confirmar) (confirmar) (confirmar)
```

**Regla de oro:** En caso de duda, recomendar siempre un nivel ABAJO. Es mejor que el cliente empiece conservador y suba, a que empiece alto y pierda todo rapido.

---

## 4. GUIA DE PRIMER DEPOSITO POR PAIS

---

### MEXICO

**Metodos principales:** OXXO, SPEI, Tarjeta Visa/MC

#### Deposito por OXXO:

1. En el portal de NEOMAAA, seleccionar "Depositar"
2. Elegir metodo: "OXXO"
3. Ingresar monto en pesos mexicanos (minimo segun tipo de cuenta)
4. El sistema genera un **codigo de barras / referencia de pago**
5. Cliente va a cualquier tienda OXXO
6. Dice al cajero: "Quiero hacer un pago de servicio"
7. Muestra el codigo de barras o dicta la referencia
8. Paga en efectivo
9. Recibe ticket de comprobante
10. Fondos se acreditan en **15 minutos a 4 horas**

**Limites OXXO:** Maximo $10,000 MXN por transaccion (~$550 USD)

**Tip para el vendedor:** Si el cliente quiere depositar mas de $10,000 MXN, recomendar SPEI.

#### Deposito por SPEI:

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "SPEI / Transferencia bancaria Mexico"
3. El sistema muestra una **CLABE interbancaria** y referencia
4. Cliente abre su app bancaria (BBVA, Banorte, Santander, etc.)
5. Hace transferencia SPEI a la CLABE indicada
6. Incluye el numero de referencia en el concepto
7. Fondos se acreditan en **5 minutos a 2 horas**

**Sin limites practicos para SPEI** (depende del banco del cliente).

**Script para cliente mexicano:**

> Para depositar desde Mexico tienes dos opciones faciles:
>
> 1. **OXXO** -- Vas a cualquier tienda, pagas en efectivo con el codigo que te genera el sistema. Se acredita en menos de 4 horas. Maximo $10,000 MXN.
>
> 2. **SPEI** -- Transferencia bancaria desde tu app del banco. Se acredita en minutos. Sin limite.
>
> Cual prefieres? Te guio paso a paso.

---

### COLOMBIA

**Metodos principales:** PSE, Nequi, tarjeta Visa/MC

#### Deposito por PSE:

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "PSE"
3. Ingresar monto en pesos colombianos
4. El sistema redirige a la pasarela PSE
5. Cliente selecciona su banco (Bancolombia, Davivienda, BBVA, etc.)
6. Ingresa sus credenciales bancarias en el portal seguro del banco
7. Autoriza la transaccion
8. Fondos se acreditan en **5 minutos a 1 hora**

#### Deposito por Nequi:

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "Nequi"
3. Ingresar monto
4. El sistema muestra un codigo QR o numero de referencia
5. Cliente abre la app Nequi
6. Escanea el QR o hace el pago con la referencia
7. Confirma en la app
8. Fondos se acreditan en **5-30 minutos**

**Script para cliente colombiano:**

> En Colombia puedes depositar super facil con:
>
> 1. **PSE** -- Directo desde tu banco online (Bancolombia, Davivienda, etc.). Se acredita rapido.
> 2. **Nequi** -- Desde la app, escaneas un QR y listo.
>
> Ambos en pesos colombianos, sin complicaciones. Cual usas mas?

---

### BRASIL

**Metodo principal:** PIX

#### Deposito por PIX:

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "PIX"
3. Ingresar monto en reales brasilenhos (BRL)
4. El sistema genera un **codigo QR PIX** y una **chave PIX** (clave)
5. Cliente abre su app bancaria (Nubank, Itau, Bradesco, Banco do Brasil, etc.)
6. Selecciona "Pagar con PIX"
7. Escanea el QR o pega la chave PIX
8. Confirma el pago
9. Fondos se acreditan en **1-5 minutos** (instantaneo en la mayoria de casos)

**PIX es el metodo mas rapido de todos. Disponible 24/7 incluyendo fines de semana.**

**Script para cliente brasileno:**

> Voce pode depositar com PIX! E instantaneo, 24 horas, qualquer banco.
>
> 1. No portal NEOMAAA, clique em "Depositar"
> 2. Escolha "PIX"
> 3. Escaneie o QR Code com seu app do banco
> 4. Confirme -- o saldo aparece em menos de 5 minutos!
>
> Precisa de ajuda?

---

### PERU

**Metodo principal:** Yape, transferencia bancaria

#### Deposito por Yape:

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "Yape"
3. Ingresar monto en soles peruanos
4. El sistema genera un QR o referencia de pago
5. Cliente abre Yape en su celular
6. Escanea el QR o ingresa la referencia
7. Confirma el pago
8. Fondos se acreditan en **5-30 minutos**

**Script para cliente peruano:**

> En Peru depositas con Yape en segundos:
>
> 1. En tu portal NEOMAAA, selecciona "Depositar" y elige "Yape"
> 2. Escanea el QR con tu app Yape
> 3. Confirma y listo -- tu saldo se actualiza en minutos
>
> Tambien aceptamos transferencia bancaria si prefieres.

---

### ARGENTINA

**Metodo principal:** Crypto (USDT) -- Recomendado por restricciones bancarias / cepo cambiario

#### Deposito por USDT (Crypto):

**Nota para vendedores:** En Argentina, las transferencias internacionales en dolares estan restringidas. El metodo mas confiable y rapido es crypto (USDT).

**Paso a paso para el cliente:**

1. El cliente necesita tener USDT en un exchange o wallet
   - Si no tiene: comprar USDT en Binance, Lemon Cash, Ripio, o Buenbit con pesos argentinos
   - Si ya tiene: ir directo al paso 3

2. **Comprar USDT (si no tiene):**
   - Descargar Binance P2P, Lemon Cash, o Buenbit
   - Depositar pesos argentinos (transferencia bancaria o Mercado Pago)
   - Comprar USDT al tipo de cambio cripto (dolar crypto)

3. **Depositar USDT en NEOMAAA:**
   - En el portal, seleccionar "Depositar"
   - Elegir metodo: "Crypto" > "USDT"
   - Seleccionar red: **TRC-20 (Tron)** -- IMPORTANTE: siempre TRC-20 por comisiones bajas
   - El sistema muestra una **direccion de wallet** y un **QR**
   - En su exchange/wallet, seleccionar "Enviar USDT"
   - Pegar la direccion EXACTA (o escanear QR)
   - Seleccionar red TRC-20
   - Ingresar monto
   - Confirmar envio
   - Fondos se acreditan en **5-30 minutos**

**ADVERTENCIAS CRITICAS para crypto:**
- **SIEMPRE verificar que la red sea TRC-20** (no ERC-20 que cobra $10+ de fee)
- **NUNCA enviar a la direccion equivocada** -- los fondos no se pueden recuperar
- **Copiar y pegar la direccion, NUNCA escribirla a mano**

**Script para cliente argentino:**

> En Argentina la forma mas rapida y economica de depositar es con USDT (crypto).
>
> Si ya tenes USDT:
> 1. En tu portal NEOMAAA, selecciona Depositar > Crypto > USDT
> 2. Elegí red TRC-20 (Tron) -- importante para que la comision sea minima
> 3. Copia la direccion de wallet
> 4. Desde tu exchange (Binance, Lemon, etc.) envia USDT a esa direccion
> 5. En 5-30 minutos se acredita
>
> Si todavia no tenes USDT, podes comprar con pesos en Binance P2P o Lemon Cash. Te explico?

---

### GENERAL: TARJETA VISA / MASTERCARD

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "Tarjeta de credito/debito"
3. Ingresar monto en USD
4. Ingresar datos de la tarjeta:
   - Numero de tarjeta
   - Fecha de vencimiento
   - CVV
   - Nombre del titular
5. Confirmar pago
6. Fondos se acreditan **instantaneamente**

**Posibles problemas:**
- Banco rechaza por ser transaccion internacional -> Cliente debe llamar a su banco y autorizar
- 3D Secure falla -> Reintentar o usar otro metodo
- Limite de tarjeta alcanzado -> Usar otro metodo o esperar al siguiente ciclo

---

### GENERAL: TRANSFERENCIA BANCARIA INTERNACIONAL

1. En el portal, seleccionar "Depositar"
2. Elegir metodo: "Transferencia bancaria"
3. El sistema muestra los datos bancarios:
   - Banco beneficiario
   - Numero de cuenta / IBAN
   - Codigo SWIFT
   - Referencia de pago (IMPORTANTE incluir)
4. Cliente va a su banco y hace transferencia SWIFT
5. Incluye la referencia de pago en el concepto
6. Fondos se acreditan en **1-5 dias habiles**
7. Puede haber comisiones del banco emisor ($15-$50 USD)

**Recomendacion:** Solo para depositos grandes ($500+). Para montos menores, usar metodo local o crypto.

---

### GENERAL: USDT (CRYPTO)

(Mismo flujo descrito en la seccion de Argentina)

Red recomendada: **TRC-20 (Tron)** -- fee de ~$1 USD
Red alternativa: **ERC-20 (Ethereum)** -- fee de $5-$20 USD (NO recomendada para montos bajos)

---

## 5. GUIA DE CONFIGURACION DE MT5

**Este es el documento que ventas/soporte comparte directamente con el cliente.**

---

### PASO 1: DESCARGAR METATRADER 5

| Plataforma | Donde descargar |
|-----------|----------------|
| Windows | https://www.metatrader5.com/es/download (o link directo de NEOMAAA) |
| Mac | https://www.metatrader5.com/es/download (version Mac) |
| Android | Google Play Store: buscar "MetaTrader 5" de MetaQuotes |
| iOS (iPhone/iPad) | App Store: buscar "MetaTrader 5" de MetaQuotes |
| Web (sin descargar) | https://trade.mql5.com/trade (WebTerminal) |

**Recomendacion:** Para la mejor experiencia, usar la version de Windows o la app movil.

---

### PASO 2: INSTALAR

**Windows:**
1. Ejecutar el archivo descargado (mt5setup.exe)
2. Click en "Siguiente" en todos los pasos
3. Esperar a que se instale
4. Click en "Finalizar"
5. MT5 se abre automaticamente

**Mac:**
1. Abrir el archivo descargado (.dmg)
2. Arrastrar MetaTrader 5 a la carpeta "Aplicaciones"
3. Abrir desde Aplicaciones
4. Si aparece advertencia de seguridad: Ir a Preferencias del Sistema > Seguridad > "Abrir de todos modos"

**Android/iOS:**
1. Descargar desde la tienda
2. Abrir la app
3. Continuar al paso 3

---

### PASO 3: CONECTAR CON TU CUENTA NEOMAAA

1. Abrir MetaTrader 5
2. Ir a **Archivo > Conectar con cuenta de trading** (en PC) o tocar **"Conectar con cuenta existente"** (en movil)
3. En el buscador de servidores, buscar: **"NEOMAAA"** o el nombre exacto del servidor (proporcionado en el email de aprobacion)
4. Seleccionar el servidor correcto
5. Ingresar:
   - **Login:** Tu numero de cuenta (ejemplo: 50001234)
   - **Contrasena:** La contrasena que recibiste por email
6. Click en **"Conectar"**
7. Si la conexion es exitosa, veras tu balance en la esquina inferior derecha

**Si el servidor no aparece en la busqueda:**
1. Ir a Archivo > Abrir una cuenta
2. Seleccionar "Conectar con un servidor de trading existente"
3. En el campo de servidor, escribir la direccion IP del servidor directamente (proporcionada por soporte)
4. Click en Siguiente e ingresar credenciales

---

### PASO 4: CONFIGURACION BASICA

#### Agregar pares de divisas al Market Watch:
1. Click derecho en la ventana "Observacion de Mercado" (Market Watch)
2. Seleccionar "Simbolos"
3. Buscar el par deseado (ejemplo: EURUSD)
4. Click en "Mostrar"
5. Click en "Aceptar"
6. El par aparece en la lista

#### Abrir un grafico:
1. En Market Watch, doble click en el par deseado
2. Se abre la ventana de grafico
3. Cambiar temporalidad con los botones superiores (M1, M5, M15, H1, H4, D1)

#### Colocar tu primera orden:
1. Click derecho en el grafico > "Operacion" > "Nueva orden"
   (o presionar F9 en PC)
2. Configurar:
   - **Simbolo:** Verificar que sea el par correcto
   - **Tipo:** Ejecucion por mercado (para orden instantanea)
   - **Volumen:** 0.01 (minimo, recomendado para empezar)
   - **Stop Loss:** Precio donde quieres limitar tu perdida
   - **Take Profit:** Precio donde quieres tomar ganancia
3. Click en **"Comprar" (Buy)** si crees que el precio sube
4. Click en **"Vender" (Sell)** si crees que el precio baja
5. La operacion aparece en la pestana "Operacion" (Trade)

---

### PASO 5: FUNCIONES ADICIONALES DE NEOMAAA

#### Copy Trading:
- Disponible desde tu portal NEOMAAA
- Selecciona traders con historial verificado
- Define el monto a copiar y el riesgo maximo
- Las operaciones se replican automaticamente en tu cuenta

#### VPS (Servidor Privado Virtual):
- Para traders que usan EAs/robots 24/7
- Se solicita desde soporte
- Mantiene tu MT5 corriendo aunque apagues tu PC

#### Vault Yield System:
- Genera rendimiento sobre capital no utilizado
- Se activa desde tu portal NEOMAAA
- El capital en el Vault no se usa para trading (esta protegido)

#### Cuenta Swap-Free:
- Disponible por hasta 2 meses despues de abrir la cuenta
- Se solicita desde soporte o portal
- Sin cargos por mantener posiciones overnight
- Ideal para swing traders o traders que mantienen posiciones varios dias

---

### PROBLEMAS COMUNES DE MT5 Y SOLUCIONES:

| Problema | Solucion |
|----------|----------|
| "Cuenta invalida" al conectar | Verificar login y contrasena. Verificar servidor correcto |
| "Sin conexion" | Revisar internet. Verificar que el servidor este correcto. Reiniciar MT5 |
| No aparecen pares de divisas | Agregar desde Simbolos (Market Watch > click derecho > Simbolos) |
| "No hay suficiente dinero" al operar | Reducir volumen del lote. Verificar balance. Verificar apalancamiento |
| Grafico dice "Esperando actualizacion" | Click derecho > Actualizar. Si persiste, cerrar y reabrir el grafico |
| La app movil no encuentra el servidor | Buscar el nombre exacto del servidor. Si no aparece, contactar soporte |

---

## 6. TOUCHPOINTS POST-ONBOARDING

### Calendario de contacto obligatorio despues del FTD:

---

#### 24 HORAS POST-FTD

**Responsable:** Vendedor asignado
**Canal:** WhatsApp
**Objetivo:** Verificar que el cliente opero y no tiene problemas

**Script:**

> Hola [nombre]! Como te fue con tu primer dia en NEOMAAA?
>
> Pudiste abrir tu primera operacion?
>
> Si tienes alguna duda sobre la plataforma o tu cuenta, estoy aqui para ayudarte.

**Acciones segun respuesta:**
- Si opero exitosamente -> Felicitar, mencionar Copy Trading si es principiante
- Si no ha operado -> Guiar para su primera operacion
- Si tuvo problemas tecnicos -> Escalar a soporte inmediatamente
- Si no responde -> Reenviar a las 48 horas

---

#### 3 DIAS POST-FTD

**Responsable:** Vendedor asignado
**Canal:** WhatsApp + Email
**Objetivo:** Profundizar relacion, identificar necesidades, prevenir abandono temprano

**Script:**

> [nombre], ya llevas 3 dias como trader NEOMAAA. Como vas?
>
> Te comparto 3 tips que usan nuestros traders mas exitosos:
>
> 1. Nunca arriesgues mas del 2% por operacion
> 2. Revisa el calendario economico antes de operar (hay uno dentro de MT5)
> 3. Empieza con 1-2 pares hasta que los domines
>
> Por cierto, ya conoces nuestro Copy Trading? Puedes copiar automaticamente a traders rentables. Te interesa que te explique?

---

#### 7 DIAS POST-FTD

**Responsable:** Vendedor asignado
**Canal:** WhatsApp
**Objetivo:** Evaluar satisfaccion, incentivar segundo deposito, ofrecer upgrade de cuenta

**Script (si ha sido activo):**

> [nombre], una semana operando con NEOMAAA! Como la llevas?
>
> Revisando tu cuenta, veo que has operado [X] trades. [Si es positivo: "Vas bien!", si es negativo: "Es normal al inicio, la clave es la gestion de riesgo."]
>
> Con tu estilo de trading, te convendria considerar [subir a Standard/Raw para mejores condiciones / activar el VPS / probar Copy Trading].
>
> Tambien recuerda que tenemos swap-free disponible si mantienes posiciones por varios dias.

**Script (si NO ha operado en 7 dias):**

> [nombre], veo que no has operado desde tu deposito. Todo bien?
>
> Si necesitas ayuda con la plataforma, puedo hacer una videollamada rapida y te muestro como operar paso a paso.
>
> Tambien puedes usar nuestro Copy Trading para que las operaciones se hagan automaticamente copiando traders expertos. Asi no necesitas saber analisis tecnico.
>
> Te interesa?

---

#### 14 DIAS POST-FTD

**Responsable:** Vendedor asignado
**Canal:** WhatsApp + Email
**Objetivo:** Consolidar al cliente, empujar segundo deposito, cross-sell servicios

**Script:**

> [nombre], 2 semanas como trader NEOMAAA!
>
> Queria preguntarte:
> 1. La plataforma te funciona bien?
> 2. Hay algo que podamos mejorar?
> 3. Has considerado aumentar tu capital? Con mas balance puedes diversificar en mas pares y reducir riesgo.
>
> Tenemos [beneficio especifico: "bono de deposito" / "mejores spreads si subes a Raw" / "VPS gratis si depositas X"] disponible para ti.

**Email complementario:**

> Asunto: [nombre], tus primeras 2 semanas en NEOMAAA
>
> Hola [nombre],
>
> Queremos saber como ha sido tu experiencia hasta ahora.
>
> Resumen de tu actividad:
> - Operaciones realizadas: [X]
> - Pares mas operados: [X]
> - Resultado neto: [X]
>
> Recomendaciones personalizadas:
> [Basado en su actividad]
>
> Cualquier duda, tu asesor [nombre vendedor] esta disponible en WhatsApp.
>
> -- Equipo NEOMAAA

---

#### 30 DIAS POST-FTD

**Responsable:** Vendedor asignado
**Canal:** WhatsApp + Email + Llamada (si es cliente de alto valor)
**Objetivo:** Review completo del primer mes, retener, upgrade, referidos

**Script (WhatsApp):**

> [nombre], ya es tu primer mes como trader NEOMAAA! Felicidades por mantenerte.
>
> Me gustaria hacer un review rapido de tu cuenta para ver si puedo ayudarte a mejorar tus resultados.
>
> Tambien queria comentarte nuestro programa de referidos: por cada persona que traigas que deposite, [beneficio].
>
> Te parece si hablamos 10 minutos esta semana?

**Para clientes de alto valor ($500+ deposito):**
- Agendar llamada de 15 minutos
- Revisar su operativa
- Ofrecer upgrade de cuenta si aplica
- Ofrecer VPS gratuito como incentivo de retencion
- Presentar el Vault Yield System

**Nota sobre swap-free:** Si el cliente activo swap-free al inicio, a los 30 dias recordar que el beneficio vence a los 2 meses. Si quiere mantenerlo, evaluar caso por caso.

---

### Tabla resumen de touchpoints:

| Dia | Canal | Objetivo | Accion si no responde |
|-----|-------|----------|----------------------|
| +1 | WhatsApp | Verificar primer trade | Reenviar a las 48h |
| +3 | WhatsApp + Email | Tips + Cross-sell Copy Trading | Llamar al dia 5 |
| +7 | WhatsApp | Evaluar satisfaccion, segundo deposito | Email con incentivo al dia 10 |
| +14 | WhatsApp + Email | Consolidar, cross-sell, segundo deposito | Llamar al dia 17 |
| +30 | WhatsApp + Email + Llamada | Review mensual, referidos, upgrade | Si no responde en 3 intentos, pasar a secuencia de re-engagement |

---

## 7. PUNTOS DE FALLA Y ACCIONES DE RECUPERACION

### Mapa de abandonos y recuperacion:

---

#### FALLA 1: No completa el registro

**Senales:** Formulario a medias, email no confirmado
**Tiempo limite:** 30 minutos

**Accion automatica:**
- Email a los 30 minutos: "Tu registro esta incompleto"
- SMS a las 2 horas (si tenemos telefono)
- Retargeting ad en 24 horas

**Accion del vendedor:**
- Si tenemos WhatsApp del lead (vino por DM): Mensaje a las 2 horas

**Script:**

> Hola [nombre], vi que empezaste a registrarte en NEOMAAA pero no terminaste. Tuviste algun problema?
>
> Puedo ayudarte a completarlo en 2 minutos. Solo necesitas: [link directo al formulario].

**Tasa de recuperacion esperada:** 25-35%

---

#### FALLA 2: Registrado pero no inicia KYC

**Senales:** Cuenta creada pero KYC pendiente por mas de 2 horas
**Tiempo limite:** 24 horas

**Accion automatica:**
- Email a las 2 horas: "Verifica tu identidad para empezar a operar"
- Email a las 12 horas: "Solo te falta un paso"
- Push notification (si tiene la app)

**Accion del vendedor:**
- WhatsApp a las 4 horas: Guiar al KYC
- Llamada a las 24 horas si no ha iniciado

**Script:**

> [nombre], tu cuenta esta creada! Solo falta verificar tu identidad para que puedas depositar y operar.
>
> Es super rapido: foto de tu ID + un selfie. 5 minutos maximo.
>
> [link directo a Sumsub]
>
> Quieres que te guie por videollamada? Lo hacemos juntos en 3 minutos.

**Tasa de recuperacion esperada:** 40-50%

---

#### FALLA 3: KYC rechazado y no reintenta

**Senales:** Sumsub rechaza, cliente no vuelve a intentar en 24 horas
**Tiempo limite:** 48 horas

**Accion automatica:**
- Email inmediato con razon del rechazo + instrucciones para reintentar
- Email a las 24 horas: recordatorio

**Accion del vendedor:**
- WhatsApp inmediato con la razon especifica y solucion
- Ofrecer videollamada de asistencia
- Si el problema es documental, sugerir documentos alternativos

**Script:**

> [nombre], tu verificacion no paso porque [razon especifica].
>
> La solucion es facil: [accion especifica].
>
> Por ejemplo:
> - Si la foto salio borrosa -> Toma otra con buena luz, sin flash
> - Si el documento esta vencido -> Usa tu pasaporte o licencia de conducir
> - Si el selfie no coincidio -> Asegurate de estar bien iluminado y sin lentes/gorra
>
> Aqui puedes reintentar: [link]
>
> Te ayudo por videollamada si quieres.

**Tasa de recuperacion esperada:** 60-70%

---

#### FALLA 4: KYC aprobado pero no deposita

**Esta es LA falla mas comun y mas costosa. El lead ya paso por todo el proceso y se detiene justo antes de convertir.**

**Senales:** Cuenta aprobada, 0 depositos, mas de 24 horas
**Tiempo limite:** 72 horas criticas

**Secuencia de recuperacion:**

| Tiempo | Canal | Accion |
|--------|-------|--------|
| +2 horas | WhatsApp | "Tu cuenta esta lista! Como prefieres depositar?" |
| +6 horas | WhatsApp | Enviar guia especifica de deposito para su pais |
| +24 horas | Llamada | Llamar directamente. Identificar objecion |
| +48 horas | WhatsApp + Email | Oferta/incentivo: "Deposita hoy y recibe [beneficio]" |
| +72 horas | Llamada final | Ultima llamada. Si no deposita, pasa a nurturing |

**Script hora +2:**

> [nombre], tu cuenta NEOMAAA esta 100% aprobada y lista para operar!
>
> Te envio los metodos de deposito disponibles para [su pais]:
> [metodo 1, metodo 2, metodo 3]
>
> El minimo es solo $5 con la cuenta Cent. Cual te queda mas comodo?

**Script hora +24 (llamada):**

> Hola [nombre], soy [vendedor] de NEOMAAA. Te llamo porque tu cuenta ya esta aprobada y queria asegurarme de que no tuvieras ninguna duda.
>
> [ESCUCHAR la objecion]
>
> Respuestas a objeciones comunes:
> - "No tengo dinero ahora" -> "Puedes empezar con solo $5 en la cuenta Cent"
> - "No se como depositar" -> "Te guio ahora mismo, es rapido"
> - "Tengo miedo de perder" -> "Con $5 en Cent el riesgo es minimo. Es para que pruebes"
> - "Quiero pensarlo" -> "Que necesitas para decidirte? Puedo resolver cualquier duda"
> - "Use otro broker y me fue mal" -> "Entiendo. NEOMAAA tiene [ventaja competitiva]. Empieza pequeno"

**Script hora +48 (incentivo):**

> [nombre], quiero ofrecerte algo especial: si depositas antes de [fecha], te activo [beneficio: VPS gratis por 1 mes / acceso a senales premium / sesion de trading 1-a-1].
>
> Tu cuenta ya esta lista. Solo falta dar el paso.

**Tasa de recuperacion esperada:** 30-40% (es normal que muchos leads se pierdan aqui)

---

#### FALLA 5: Deposita pero no configura MT5

**Senales:** Deposito acreditado, pero MT5 nunca conectado
**Tiempo limite:** 24 horas

**Accion inmediata del vendedor:**
- WhatsApp con guia de MT5 (Seccion 5 de este documento)
- Ofrecer videollamada para configurar juntos

**Script:**

> [nombre], tu deposito de $[monto] ya esta acreditado! Ahora a configurar MT5.
>
> Te envio la guia rapida:
>
> 1. Descarga MT5: [link para su plataforma]
> 2. Abre MT5 y busca el servidor NEOMAAA
> 3. Tu login: [numero]
> 4. Tu contrasena: [la que recibiste por email]
>
> Si prefieres, hacemos una videollamada de 5 minutos y lo configuramos juntos. A que hora te queda bien?

**Tasa de recuperacion esperada:** 80-90% (ya deposito, esta comprometido)

---

#### FALLA 6: Configura MT5 pero no opera

**Senales:** MT5 conectado con balance, pero 0 trades en mas de 48 horas
**Tiempo limite:** 72 horas

**Accion del vendedor/soporte:**
- WhatsApp con invitacion a primera operacion guiada

**Script:**

> [nombre], tu cuenta esta lista con $[balance] esperando. Quieres que hagamos tu primera operacion juntos?
>
> Te explico en 5 minutos como abrir un trade. Puedes empezar con el lote mas pequeno (0.01) para probar sin riesgo.
>
> Tambien puedes activar Copy Trading y dejar que un trader experto opere por ti automaticamente. Te explico?

**Tasa de recuperacion esperada:** 70-80%

---

#### FALLA 7: Opera una vez y desaparece

**Senales:** 1-2 trades en los primeros dias, luego inactividad por 7+ dias
**Tiempo limite:** 7 dias de inactividad

**Accion:**
- Seguir calendario de touchpoints (Seccion 6)
- Si fue una perdida en su primer trade, abordar directamente

**Script (si perdio en su primer trade):**

> [nombre], veo que tu primera operacion no salio como esperabas. Es completamente normal -- hasta los traders mas exitosos pierden operaciones.
>
> La clave no es ganar siempre, sino ganar mas de lo que pierdes en el largo plazo.
>
> Te recomiendo:
> 1. Operar con lotes mas pequenos mientras aprendes
> 2. Siempre usar stop loss
> 3. Probar nuestro Copy Trading para aprender viendo como operan traders expertos
>
> Quieres que te conecte con un trader experto de nuestra comunidad?

**Tasa de recuperacion esperada:** 30-40%

---

### Resumen visual de puntos de falla:

```
REGISTRO  ──>  KYC  ──>  APROBADO  ──>  DEPOSITO  ──>  MT5 SETUP  ──>  1er TRADE  ──>  ACTIVO
   |            |           |              |              |               |              |
  15%          10%         5%            30%             5%             10%            15%
  drop         drop        drop          drop           drop            drop           churn
   |            |           |              |              |               |              |
  Auto         Vendedor   Vendedor      CRITICO        Soporte        Soporte       Retention
  email +      guia       incentivo     Secuencia      videollamada   guia 1-a-1    touchpoints
  retarget     KYC        deposito      4 touches      setup          Copy Trading   mensuales
```

**La mayor fuga esta en la Etapa 5 (deposito). El 30% de los leads aprobados nunca depositan. Aqui es donde el equipo de ventas debe concentrar el 50% de su esfuerzo de follow-up.**

---

## 8. ANEXOS: SCRIPTS Y TEMPLATES

### A. Checklist de onboarding para vendedores (copiar y usar por cada lead):

```
LEAD: [nombre]
FECHA: [fecha de primer contacto]
VENDEDOR: [Franco/Edward/Luis]
PAIS: [pais]
FUENTE: [como llego: ads, redes, referido, ZenDM]

[ ] Primer contacto realizado
[ ] Experiencia del cliente identificada: [principiante/intermedio/avanzado]
[ ] Cuenta recomendada: [Cent/Standard/Raw/Institutional]
[ ] Registro completado
[ ] KYC iniciado
[ ] KYC aprobado
[ ] Primer deposito realizado -- Monto: $___  Metodo: ___
[ ] MT5 descargado e instalado
[ ] MT5 conectado (verificar con soporte)
[ ] Primer trade ejecutado
[ ] Touchpoint +1 dia
[ ] Touchpoint +3 dias
[ ] Touchpoint +7 dias
[ ] Touchpoint +14 dias
[ ] Touchpoint +30 dias
[ ] Segundo deposito: SI / NO -- Monto: $___ Fecha: ___

NOTAS:
_________________________________
_________________________________
```

---

### B. Respuestas rapidas para Intercom (soporte puede copiar y pegar):

**Saludo inicial:**
> Hola! Gracias por contactar a NEOMAAA. Soy [nombre] y voy a ayudarte. En que puedo asistirte hoy?

**KYC en proceso:**
> Tu verificacion de identidad esta siendo procesada. Normalmente tarda entre 5 minutos y 2 horas. Te notificaremos por email apenas este lista. Si pasan mas de 24 horas, escribenos de nuevo.

**Credenciales de MT5:**
> Tus credenciales de MT5 fueron enviadas al email que registraste. Revisa tu bandeja de entrada y carpeta de spam. Si no las encuentras, puedo reenviarlas. Tu login es: [login] y el servidor es: [servidor].

**Deposito no acreditado:**
> Entiendo tu preocupacion. Voy a verificar el estado de tu deposito ahora mismo. Me puedes confirmar: 1) Metodo de pago usado, 2) Monto, 3) Fecha y hora aproximada del pago? Lo reviso y te respondo en minutos.

**Problema con MT5:**
> Vamos a solucionarlo. Primero verifica: 1) Que estas conectado a internet, 2) Que el servidor sea [servidor NEOMAAA], 3) Que tu login y contrasena esten correctos. Si el problema persiste, podemos hacer una videollamada rapida para resolverlo juntos.

**Solicitud de retiro:**
> Los retiros se procesan en un maximo de [X] horas habiles. El retiro se hace al mismo metodo que usaste para depositar. Si necesitas usar otro metodo, por favor contactanos.

**Swap-free:**
> La opcion swap-free esta disponible por hasta 2 meses despues de abrir tu cuenta. Para activarla, necesito verificar tu cuenta. Me confirmas tu numero de login?

---

### C. Escalamiento de problemas:

| Problema | Responsable | Tiempo de respuesta |
|----------|-------------|-------------------|
| Problema tecnico de MT5 | Soporte | 15 minutos |
| KYC rechazado o atascado | Susana (Compliance) | 2 horas max |
| Deposito no acreditado | Soporte + Procesador de pagos | 30 minutos investigacion |
| Retiro retrasado | Susana (aprobacion) + Finanzas | 4 horas max |
| Queja de cliente insatisfecho | Vendedor asignado + Soporte senior | 1 hora max |
| Sospecha de fraude/lavado | Susana (Compliance) | Inmediato |
| Bug en la plataforma/portal | Dev team | 4 horas max |
| Cliente pide condiciones especiales | Vendedor escala a Direccion | 24 horas |

---

### D. Metricas clave de onboarding a monitorear:

| Metrica | Objetivo | Como medir |
|---------|----------|-----------|
| Registro -> KYC inicio | > 80% en 24h | Skale CRM |
| KYC inicio -> Aprobacion | > 90% en 24h | Sumsub + Skale |
| Aprobacion -> FTD | > 40% en 72h | Skale CRM |
| FTD -> Primer trade | > 70% en 48h | MT5 Admin |
| Tiempo promedio registro-a-trade | < 4 horas | Skale CRM + MT5 |
| Tasa de abandono en KYC | < 15% | Sumsub |
| Tasa de abandono pre-FTD | < 30% | Skale CRM |
| Clientes activos a 30 dias | > 50% de FTDs | MT5 Admin |

---

### E. Distribucion de soporte por idioma/region:

| Agente de soporte | Cobertura | Idioma | Horario |
|-------------------|-----------|--------|---------|
| Agente LATAM | Mexico, Colombia, Peru, Argentina, Chile, Ecuador, resto LATAM | Espanol | 9am-9pm CST |
| Agente Europa-ME | Europa (no-EEA), Medio Oriente, Africa, Asia | Ingles | 9am-9pm CET |

**Fuera de horario:** Intercom bot con respuestas automaticas + ticket que se atiende al dia siguiente a primera hora.

---

**FIN DEL DOCUMENTO**

**Ultima actualizacion:** 8 de abril de 2026
**Autor:** Equipo NEOMAAA
**Proxima revision:** 8 de mayo de 2026

Para dudas sobre este manual, contactar a Direccion.
