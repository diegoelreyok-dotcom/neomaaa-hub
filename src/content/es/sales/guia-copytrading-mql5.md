# Guía Copy Trading MQL5 — Paso a paso para influencers y comunidades

> Tutorial exhaustivo para configurar copy trading vía MQL5 Signals en cuentas NEOMAAA Markets. Cubre el flujo completo: signal provider (influencer), follower (audiencia), y agent de ventas que acompaña el onboarding.

---

## Introducción

### Qué vas a aprender

Esta guía te lleva de cero a tener un sistema de copy trading funcionando con NEOMAAA + MQL5 Signals. Al terminar vas a poder:

- **Si sos influencer/trader:** publicar tu estrategia como señal pagada y monetizar tu comunidad.
- **Si sos follower:** suscribirte a un signal provider y copiar sus operaciones automáticamente en tu cuenta NEOMAAA.
- **Si sos agent de ventas NEOMAAA:** acompañar a influencers en el onboarding completo, aunque no seas trader.

### Para quién es esta guía

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>Equipo de ventas NEOMAAA</strong> — la usás como manual de referencia para enseñarle a influencers, comunidades y traders con audiencia cómo montar su señal. No necesitás ser trader para entender el flujo.</div></div>
<div class="neo-step" data-num="2"><div><strong>Signal providers</strong> — el trader/influencer que quiere publicar su estrategia. Sigue Parte 1 paso a paso.</div></div>
<div class="neo-step" data-num="3"><div><strong>Followers</strong> — el cliente que quiere copiar a un signal provider. Sigue Parte 2 paso a paso.</div></div>
<div class="neo-step" data-num="4"><div><strong>Equipo interno NEOMAAA</strong> — soporte, compliance, marketing. Para entender el flujo completo y responder dudas.</div></div>
</div>

### Qué NO es esta guía

NEOMAAA NO tiene un sistema de copy trading propio. No hay un "botón de copy" en el portal del broker. Todo el copy trading se hace a través de **MQL5 Signals**, el marketplace oficial de MetaQuotes (los creadores de MetaTrader 5), que está integrado nativamente en la plataforma MT5.

Esto es una ventaja, no una limitación. Te explico por qué.

### Ventajas de MQL5 Signals vs sistemas propios

| Característica | MQL5 Signals | Sistema propio broker |
|----------------|--------------|------------------------|
| Reputación | Millones de traders a nivel mundial lo usan | Depende del broker |
| Transparencia | Track record público y verificable | Cerrado al broker |
| Ranking | Sistema de ranking global comparado con miles de signals | Solo dentro del broker |
| Reviews | Reviews públicas de followers | Limitadas |
| Pagos | Automáticos vía PayPal, Wire, WebMoney, tarjeta | Dependen del broker |
| Comisión broker extra | No hay — MQL5 es independiente | Sí, el broker cobra spread adicional |
| Portabilidad | Funciona con cualquier broker MT5 | Solo con ese broker |

> [!INFO]
> MQL5 Signals es el estándar de la industria. Traders top del mundo publican ahí. Para NEOMAAA es ideal porque le da credibilidad a cualquier influencer que publique su señal: no somos nosotros diciendo que es bueno — es el marketplace oficial de MetaTrader el que muestra las estadísticas.

---

## Cómo funciona en resumen

Hay tres actores y una plataforma:

- **Signal provider:** el trader que publica su estrategia pública. En nuestro caso, un influencer/trader con cuenta en NEOMAAA.
- **Follower:** el cliente que paga suscripción mensual para copiar las operaciones del provider.
- **MQL5 Signals:** el marketplace de MetaQuotes que conecta provider con followers.
- **MT5 (MetaTrader 5):** la plataforma donde se ejecutan las operaciones de ambos lados.

### Diagrama del flujo

```
[Signal Provider]              [MQL5 Signals]              [Followers]
   Cuenta NEOMAAA    →    Marketplace publico    →    Se suscriben
   Opera normal      →    Ranking + stats       →    Copia automatica
   Recibe fees       ←    Paga $X al mes        ←    Paga suscripcion
```

El provider opera normal en su cuenta NEOMAAA. MQL5 toma sus operaciones en tiempo real y las replica proporcionalmente en las cuentas de los followers. El follower paga suscripción mensual al provider (MQL5 retiene ~25% como fee de plataforma).

---

## PARTE 1 — PARA EL SIGNAL PROVIDER (el influencer/trader)

Esta parte es para el trader que quiere publicar su estrategia. Si sos agent de ventas, usás esta sección para onboardear a un influencer paso a paso.

### Paso 1: Tener cuenta real en NEOMAAA con trading real

**Requisito previo crítico:** MQL5 Signals solo acepta cuentas REALES con historial de trading. No sirven cuentas demo.

Antes de empezar con MQL5:

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Abrí tu cuenta en NEOMAAA Markets (cualquier tipo: Cent, Standard, Raw, Institucional). El tipo Standard o Raw es el más común para signal providers profesionales.</div></div>
<div class="neo-step" data-num="2"><div>Completá el KYC (subir ID + comprobante de domicilio). Esperá aprobación (24-72h típico).</div></div>
<div class="neo-step" data-num="3"><div>Depositá mínimo $100 USD. Recomendado $500+ para darle credibilidad a la señal (balances chicos generan desconfianza en followers).</div></div>
<div class="neo-step" data-num="4"><div>Operá al menos 10 operaciones reales cerradas antes de publicar. MQL5 pide un historial mínimo para verificar que sos un trader activo, no una cuenta vacía.</div></div>
<div class="neo-step" data-num="5"><div>Idealmente: tené 2-4 semanas de track record positivo antes de publicar. Las señales que se publican el día 1 sin historial tienen 0 followers.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Cuenta NEOMAAA activa en el portal del cliente, mostrando balance, estado KYC aprobado, y credenciales MT5. Censurar número de cuenta real.
> Ubicación sugerida: `/public/assets/copytrading/01-cuenta-neomaaa-activa.png`

### Paso 2: Crear cuenta en MQL5.community

MQL5.community es la red social/marketplace de MetaQuotes. Es separada del broker. Necesitás cuenta ahí para publicar señales.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Ir a <strong>https://www.mql5.com</strong></div></div>
<div class="neo-step" data-num="2"><div>Click en "Sign up" (esquina superior derecha).</div></div>
<div class="neo-step" data-num="3"><div>Completar datos:
<ul>
<li><strong>Username</strong> — público, elegí algo brandeable (ej. "ProTraderFX" o tu nombre artístico). No se puede cambiar después fácilmente.</li>
<li><strong>Email</strong> — usá el mismo que usás con NEOMAAA si es posible.</li>
<li><strong>Password</strong> — fuerte, 12+ caracteres.</li>
<li><strong>País</strong> — el de tu residencia.</li>
<li>Aceptar términos.</li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Confirmar el email haciendo click en el link que te llega.</div></div>
<div class="neo-step" data-num="5"><div>Completar tu perfil: foto, bio corta, redes sociales. Los followers revisan el perfil antes de suscribirse, así que este paso no es opcional.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Página de sign up de MQL5.com con el formulario de registro visible.
> Ubicación sugerida: `/public/assets/copytrading/02-mql5-signup.png`

> [!TIP]
> El username es tu marca en MQL5. Pensalo antes: idealmente alineado con tu handle de Instagram/YouTube/TikTok para que tu comunidad te reconozca.

### Paso 3: Registrar tu cuenta MT5 de NEOMAAA en MQL5

Este es el paso más técnico. Vas a vincular tu cuenta NEOMAAA a tu cuenta MQL5 para que el marketplace pueda leer tu historial y replicar tus trades.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En <strong>mql5.com</strong>, logueado con tu cuenta, ir a <strong>"My Account" → "Trading Accounts"</strong> (o en algunas versiones aparece como "Signals" → "Add Account").</div></div>
<div class="neo-step" data-num="2"><div>Click "Add Account" o "Register Account".</div></div>
<div class="neo-step" data-num="3"><div>Ingresar los datos de tu cuenta NEOMAAA:
<ul>
<li><strong>Broker:</strong> buscar "NEOMAAA" en el campo de búsqueda. Aparecerá como "NEOMAAA Markets" o "NEOMAAA-Live". Seleccioná ese.</li>
<li><strong>Server:</strong> el servidor MT5 que te asignaron al abrir cuenta (ej. "NEOMAAA-Live-01" o "NEOMAAA-Real-02"). Lo encontrás en el email de bienvenida o en el portal del cliente.</li>
<li><strong>Account number:</strong> tu número de cuenta MT5 (ej. 8123456).</li>
<li><strong>Investor password:</strong> el password "investor" de tu cuenta. <strong>NO el master.</strong></li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Click "Submit". MQL5 intenta conectarse a tu cuenta en modo lectura y verifica el historial.</div></div>
<div class="neo-step" data-num="5"><div>La verificación puede tardar desde unos minutos hasta 24 horas. Te llega un email cuando está lista.</div></div>
</div>

> [!WARNING]
> Usá el **INVESTOR password**, NO el master. El investor solo permite lectura del historial de trading — MQL5 no puede operar por vos, solo verificar qué hiciste. Si ponés el master por error, cambiá el password master inmediatamente por seguridad.

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Formulario "Add Trading Account" en MQL5 con los campos broker, server, account number, investor password visibles (con datos ficticios).
> Ubicación sugerida: `/public/assets/copytrading/03-mql5-add-account.png`

**¿Dónde saco el investor password de mi cuenta NEOMAAA?**

En el portal del cliente NEOMAAA: "Mis Cuentas" → click en la cuenta MT5 → "Cambiar contraseña" → hay dos opciones: Master password e Investor password. Si nunca lo configuraste, te deja generar uno nuevo.

### Paso 4: Crear tu señal (signal)

Una vez tu cuenta está verificada en MQL5, ya podés publicar tu señal.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Ir a <strong>"My Account" → "Signals" → "My Signals"</strong> (o en el menú superior: Services → Signals → Create).</div></div>
<div class="neo-step" data-num="2"><div>Click "Create Signal" o "Publish Signal".</div></div>
<div class="neo-step" data-num="3"><div>Seleccioná la cuenta NEOMAAA que registraste en el Paso 3.</div></div>
<div class="neo-step" data-num="4"><div>Completar el formulario completo:
<ul>
<li><strong>Signal Name</strong> — el nombre público de tu señal. Ejemplo: "NEOMAAA Scalper Pro" o "Diego's Gold Strategy". Máximo ~50 caracteres.</li>
<li><strong>Description</strong> — la descripción de tu estrategia. Escribí 3-5 párrafos incluyendo: estrategia general, horarios de trading, pares favoritos, drawdown esperado, estilo de gestión. Esto es clave para conversion.</li>
<li><strong>Price per month</strong> — precio de suscripción mensual. Rango típico: $30-500 USD. Podés empezar en $0 (gratis) para ganar followers rápido, después subís.</li>
<li><strong>Trading style</strong> — elegí: Scalping / Day Trading / Swing / Positional. Sé honesto: si decís swing y hacés scalping, los followers cancelan.</li>
<li><strong>Instruments</strong> — qué trackeás (EURUSD, XAUUSD, US30, BTCUSD, etc.). Listá los principales.</li>
<li><strong>Leverage</strong> — el leverage de tu cuenta NEOMAAA. Importante para que los followers ajusten el suyo.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Subí una imagen de portada. Recomendado: logo profesional o avatar con buena calidad. Es lo primero que ven los followers.</div></div>
<div class="neo-step" data-num="6"><div>Revisá todos los campos y click "Publish".</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Formulario "Create Signal" completo en MQL5 con todos los campos llenos (nombre, descripción, precio, instrumentos, leverage).
> Ubicación sugerida: `/public/assets/copytrading/04-mql5-create-signal.png`

> [!TIP]
> Estrategia de pricing recomendada: publicá la señal **gratis los primeros 30-60 días** para acumular followers y reviews. Cuando tengas 50+ subscribers activos y 4+ estrellas, subí el precio a $50-100/mes. Cuando tengas 200+ subscribers, subí a $150-250/mes. Los signal providers top de MQL5 cobran $300-500/mes porque ya tienen reputación.

### Paso 5: Promoción en tu comunidad

Una vez publicada la señal, tu URL pública se ve así:

`https://www.mql5.com/en/signals/[tu-id-numerico]`

Este link es oro. Es lo que compartís con tu audiencia.

**Checklist de promoción:**

- Compartí el link en Instagram (historias fijas + bio).
- Link en bio de YouTube, TikTok, Twitter/X.
- Posteá en tu canal de Telegram con el paso a paso.
- Creá un post pin en tu comunidad: "Cómo suscribirse a mi señal".
- Si tenés podcast (como Traders Hub), mencionalo en cada episodio.

**Importante:** tu audiencia necesita hacer DOS pasos para copiar:

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Abrir cuenta en NEOMAAA Markets (idealmente con tu código de IB si sos afiliado).</div></div>
<div class="neo-step" data-num="2"><div>Suscribirse a tu señal en MQL5 desde su MT5.</div></div>
</div>

**Kit de onboarding recomendado** para darle a tu comunidad:

- Link de registro NEOMAAA (con tu referral si sos IB)
- Link a tu señal en MQL5
- Video tutorial de 5 minutos (o esta guía)
- Canal de Telegram de soporte donde respondés dudas

> [!INFO]
> Si sos IB de NEOMAAA además de signal provider, ganás **dos veces** por el mismo cliente:
> 1. Comisión de afiliado por cada cliente que abre cuenta usando tu código (revenue share del broker, 30-60% típico).
> 2. Suscripción mensual MQL5 Signals por cada follower que copia tu estrategia.
>
> Es el combo más rentable. Por eso empujamos tanto el modelo "influencer + IB + signal provider" para nuestras comunidades aliadas.

### Paso 6: Ver stats y cobrar

En tu dashboard MQL5 vas a ver en tiempo real:

- **Subscribers activos** — cuántos te están copiando ahora.
- **Revenue mensual** — cuánto vas a cobrar este mes (después de la fee de MQL5).
- **Reviews** — calificación de followers (1-5 estrellas + comentarios).
- **Ranking global** — posición vs otros signals del mundo.
- **Growth %** — crecimiento histórico de la cuenta.
- **Max drawdown** — peor caída histórica.
- **Sharpe ratio** — métrica de risk-adjusted return.

**Pagos:**

- MQL5 paga mensualmente. Suele ser entre el día 5 y 10 del mes siguiente.
- Métodos: PayPal, Wire Transfer, WebMoney, tarjeta bancaria.
- MQL5 retiene ~20-30% de comisión (varía según plan y antigüedad).
- Mínimo de payout: $10 USD (si no llegás, se acumula al mes siguiente).

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Dashboard de signal provider en MQL5 mostrando subscribers activos, revenue mensual, ranking, y gráfico de growth.
> Ubicación sugerida: `/public/assets/copytrading/05-mql5-dashboard-provider.png`

---

## PARTE 2 — PARA EL FOLLOWER (la comunidad que quiere copiar)

Esta parte es para el cliente/follower que quiere copiar a un signal provider. Si sos agent de ventas, usá esta sección para onboardear followers que llegan referidos por un influencer.

### Paso 1: Abrir cuenta en NEOMAAA

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Registrate en el portal oficial de NEOMAAA Markets (el link que te pasó tu signal provider, idealmente con su código IB).</div></div>
<div class="neo-step" data-num="2"><div>Completá los datos personales: nombre, email, país, teléfono.</div></div>
<div class="neo-step" data-num="3"><div>Completar el KYC: subí ID (DNI, pasaporte o licencia) + comprobante de domicilio (factura de servicios, extracto bancario, no más de 3 meses).</div></div>
<div class="neo-step" data-num="4"><div>Esperar aprobación. Típico: 24-72 horas. Si tarda más, escribí a soporte.</div></div>
<div class="neo-step" data-num="5"><div>Elegir el tipo de cuenta según tu perfil:
<ul>
<li><strong>Cent</strong> — para empezar con poco capital ($5-50). No recomendado para copy trading serio.</li>
<li><strong>Standard</strong> — ideal para copy trading. Spreads competitivos, mínimo $50.</li>
<li><strong>Raw</strong> — spreads casi cero + comisión por lote. Ideal si el signal provider es scalper.</li>
<li><strong>Institutional</strong> — para cuentas grandes ($10K+).</li>
</ul>
</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Portal de registro NEOMAAA Markets, pantalla de signup con campos visibles.
> Ubicación sugerida: `/public/assets/copytrading/06-neomaaa-signup.png`

### Paso 2: Depositar fondos

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En el portal del cliente NEOMAAA, ir a "Depositar".</div></div>
<div class="neo-step" data-num="2"><div>Elegir método de pago:
<ul>
<li><strong>PIX</strong> (Brasil) — instantáneo.</li>
<li><strong>Crypto USDT</strong> (TRC20 o ERC20) — 15-30 min.</li>
<li><strong>Tarjeta de crédito/débito</strong> — instantáneo pero con fees.</li>
<li><strong>Transferencia bancaria internacional</strong> — 1-3 días.</li>
<li><strong>Transferencia local LATAM</strong> — según país.</li>
</ul>
</div></div>
<div class="neo-step" data-num="3"><div>Ingresar monto. Mínimos según tipo de cuenta:
<ul>
<li>Cent: $5</li>
<li>Standard: $50</li>
<li>Raw: $500</li>
<li>Institutional: $10,000</li>
</ul>
</div></div>
<div class="neo-step" data-num="4"><div>Confirmar y esperar acreditación.</div></div>
</div>

> [!TIP]
> Recomendación para copy trading: depositá **mínimo $500-1000 USD**. Con menos, la proporcionalidad con el balance del signal provider queda muy descompensada y algunos trades no se pueden copiar por falta de margin. Si el provider tiene $10,000 y vos $100, un trade de 1 lote suyo equivaldría a 0.01 lotes tuyo — demasiado chico.

### Paso 3: Instalar MetaTrader 5

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En el portal NEOMAAA, sección "Plataformas" o "Downloads", descargar MT5 para tu sistema operativo (Windows, Mac, Android, iOS).</div></div>
<div class="neo-step" data-num="2"><div>Instalar y abrir MetaTrader 5.</div></div>
<div class="neo-step" data-num="3"><div>En la primera pantalla: "File" → "Login to Trade Account".</div></div>
<div class="neo-step" data-num="4"><div>Ingresar:
<ul>
<li><strong>Login:</strong> tu número de cuenta MT5 (te lo dan al abrir cuenta).</li>
<li><strong>Password:</strong> tu password master.</li>
<li><strong>Server:</strong> el servidor que te asignaron (ej. "NEOMAAA-Live-01"). Si no aparece en la lista, escribilo manualmente.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Verificar que la cuenta se conectó: en la esquina inferior derecha debe aparecer "Connected" y el balance correcto.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Ventana "Login to Trade Account" en MT5 con los campos login/password/server llenos (datos ficticios).
> Ubicación sugerida: `/public/assets/copytrading/07-mt5-login.png`

### Paso 4: Conectar MT5 a MQL5 Community

MT5 y MQL5.community son dos cosas distintas. El MT5 es la plataforma de trading. MQL5.community es el marketplace. Para copiar señales, tenés que conectar ambos.

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En MT5, ir a <strong>"Tools" → "Options"</strong> (o Ctrl+O).</div></div>
<div class="neo-step" data-num="2"><div>Click en la pestaña <strong>"Community"</strong>.</div></div>
<div class="neo-step" data-num="3"><div>Ingresar tu <strong>Login</strong> (username de MQL5.community) y <strong>Password</strong>.</div></div>
<div class="neo-step" data-num="4"><div>Click "OK".</div></div>
<div class="neo-step" data-num="5"><div>Si no tenés cuenta MQL5 todavía, crearla en https://mql5.com (mismo paso que el Paso 2 de Parte 1 pero ahora como follower).</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Ventana "Options" en MT5 con pestaña "Community" activa, mostrando los campos Login y Password de MQL5.
> Ubicación sugerida: `/public/assets/copytrading/08-mt5-options-community.png`

### Paso 5: Encontrar la señal que querés copiar

Hay dos formas de llegar a una señal:

**Forma A — Desde el link directo del signal provider (recomendado):**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>Tu influencer/signal provider te comparte su link público (ej. https://www.mql5.com/en/signals/2345678).</div></div>
<div class="neo-step" data-num="2"><div>Abrís el link en cualquier navegador.</div></div>
<div class="neo-step" data-num="3"><div>Click "Subscribe" en la página del signal.</div></div>
<div class="neo-step" data-num="4"><div>MQL5 te pide loguearte (con la misma cuenta que conectaste en MT5).</div></div>
</div>

**Forma B — Buscar dentro de MT5:**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En MT5: <strong>"View" → "Signals"</strong> (o Ctrl+L).</div></div>
<div class="neo-step" data-num="2"><div>Se abre la ventana de Signals con la lista completa del marketplace.</div></div>
<div class="neo-step" data-num="3"><div>Buscar por nombre del signal provider usando la barra de búsqueda.</div></div>
<div class="neo-step" data-num="4"><div>Click en la señal para ver los detalles completos.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Ventana "Signals" de MT5 mostrando el listado de signals con búsqueda, filtros, y una señal seleccionada con detalles (growth, drawdown, subscribers).
> Ubicación sugerida: `/public/assets/copytrading/09-mt5-signals-tab.png`

### Paso 6: Revisar la señal antes de suscribirte

**Antes de hacer click Subscribe, revisá estas 6 métricas:**

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>Drawdown máximo histórico</strong> — cuánto bajó la cuenta del provider en su peor momento. Regla: no más de lo que vos podés aguantar psicológicamente. Si tu tolerancia es 20% y la señal tiene drawdown de 60%, no es para vos.</div></div>
<div class="neo-step" data-num="2"><div><strong>Growth %</strong> — crecimiento histórico. Cuidado con números muy altos con poca antigüedad (growth 200% en 2 meses = red flag).</div></div>
<div class="neo-step" data-num="3"><div><strong>Age (antigüedad)</strong> — preferiblemente más de 6 meses. Señales nuevas no tienen data suficiente para ser confiables.</div></div>
<div class="neo-step" data-num="4"><div><strong>Subscribers activos</strong> — más de 10 subscribers es cierta validación social. Más de 50 es buena señal.</div></div>
<div class="neo-step" data-num="5"><div><strong>Reviews</strong> — leé las críticas, no solo lo positivo. Las críticas negativas te dicen los problemas reales (drawdowns inesperados, cambios de estrategia, etc.).</div></div>
<div class="neo-step" data-num="6"><div><strong>Trading style match</strong> — si la señal es scalping (trades de 5 min), tu MT5 tiene que estar conectado con baja latencia. Si es swing (trades de días), no importa tanto. Elegí según tu disponibilidad.</div></div>
</div>

> [!WARNING]
> Rentabilidades pasadas NO garantizan resultados futuros. Un signal con 200% de growth puede tener 50% de drawdown mañana. Nunca inviertas lo que no podés perder. El trading de forex/CFDs tiene alto riesgo: el 70-80% de traders retail pierden dinero.

### Paso 7: Suscribirte y configurar copy

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En la página de la señal, click <strong>"Subscribe"</strong>.</div></div>
<div class="neo-step" data-num="2"><div>Seleccionar cuenta destino: tu cuenta NEOMAAA (la que conectaste en el Paso 3).</div></div>
<div class="neo-step" data-num="3"><div>Pagar la suscripción mensual (si la señal no es gratis). MQL5 te pide método de pago: tarjeta, PayPal, o saldo MQL5.</div></div>
<div class="neo-step" data-num="4"><div>Configurar <strong>Risk Settings</strong>:
<ul>
<li><strong>Copy ratio</strong> — proporcional a tu balance vs el balance del provider. MQL5 lo calcula automático, pero podés ajustarlo. Default suele ser 1:1 proporcional.</li>
<li><strong>Max risk (% equity)</strong> — el % máximo de tu cuenta en riesgo por trade. Default 95%. Recomendado bajar a 50-70%.</li>
<li><strong>Deviation (slippage)</strong> — slippage máximo permitido en pips. Default 10. Si la latencia es alta, subí.</li>
<li><strong>Stop Loss / Take Profit limits</strong> — límites personalizados por si querés ser más conservador que el provider.</li>
<li><strong>Copy Stop Loss / Copy Take Profit</strong> — si querés que se copien los SL/TP del provider o manejarlos vos.</li>
</ul>
</div></div>
<div class="neo-step" data-num="5"><div>Click "Start" o "Subscribe" para activar la suscripción.</div></div>
</div>

> [!INFO]
> 📸 **SCREENSHOT PENDIENTE**: Pantalla de configuración de Risk Settings al suscribirse a una señal (MQL5 Copy settings con los sliders de deviation, max risk, etc.).
> Ubicación sugerida: `/public/assets/copytrading/10-mql5-risk-settings.png`

> [!TIP]
> Empezá con **risk bajo** las primeras 2-4 semanas (ej. 30-50% del equity máximo). Observá cómo se comporta la señal con tu capital real. Si los resultados son consistentes con lo que promete el provider, subí a 50-70%. **Nunca pongas 100%** — siempre dejá margen libre para fluctuaciones.

### Paso 8: Monitorear

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div>En MT5, pestaña "Trade", vas a ver las operaciones copiándose automáticamente. Cada trade abierto por el provider se abre en tu cuenta en segundos.</div></div>
<div class="neo-step" data-num="2"><div>Revisá semanalmente el performance: ganancia/pérdida, drawdown actual, trades abiertos.</div></div>
<div class="neo-step" data-num="3"><div>Si el drawdown supera tu tolerancia → desactivar copy y evaluar. Podés pausar sin cancelar la suscripción.</div></div>
<div class="neo-step" data-num="4"><div>La suscripción se renueva automáticamente cada mes. Para cancelar: dashboard MQL5 → "My Subscriptions" → "Unsubscribe".</div></div>
<div class="neo-step" data-num="5"><div>Si cancelás, los trades ABIERTOS siguen activos hasta que vos los cerrés manualmente. Nuevos trades del provider no se copian.</div></div>
</div>

---

## PARTE 3 — GUÍA DE VENTAS: CÓMO EXPLICAR ESTO A UN INFLUENCER

Esta sección es específica para el equipo de ventas NEOMAAA. La usás cuando tenés un influencer/trader con audiencia que podría ser signal provider.

### Pitch para influencers y comunidades

**Script base (adaptable según el influencer):**

> "Tenés una comunidad de [XXX] seguidores que confían en vos para trading. Con NEOMAAA + MQL5 Signals, podés monetizar de dos formas que se complementan:
>
> **1. Como signal provider en MQL5:** publicás tu estrategia, tu comunidad se suscribe, cobrás entre $50 y $500 por mes por cada seguidor. Tu comunidad gana si vos ganás. Es transparente: el historial está público.
>
> **2. Como IB de NEOMAAA:** por cada seguidor que abre cuenta usando tu código de afiliado, cobrás comisión recurrente (30-60% del revenue que genera el broker con ese cliente, de por vida).
>
> El combo te da ingresos por ambos lados: suscripción MQL5 + comisiones IB. Con 50 followers a $100/mes de suscripción son $5,000/mes pasivos. Sumale las comisiones IB y podés hacer $8,000-12,000/mes recurrentes."

### Qué SÍ puede prometer el influencer

- "Podés suscribirte a mi estrategia en MQL5."
- "Te enseño cómo configurar tu cuenta y copiar mis trades."
- "Transparencia total: mi historial está público en MQL5, todos lo ven."
- "NEOMAAA es el broker que uso yo mismo con mi capital real."
- "Si yo gano, vos ganás. Si yo pierdo, vos perdés. Estoy en la misma que vos."

### Qué NO puede prometer (prohibido por compliance)

- **"Vas a ganar $X al mes seguro"**
- **"Nunca pierdo"**
- **"Rendimiento garantizado"**
- **"Riesgo cero"**
- **"Vas a duplicar tu cuenta"**
- **"Sistema infalible"**

> [!WARNING]
> Estas promesas violan compliance de MQL5 y de NEOMAAA. Si un influencer las dice públicamente (reels, posts, videos), pueden:
> 1. Banear su señal en MQL5 (perdés todo el trabajo).
> 2. Cerrar su cuenta NEOMAAA por violación de términos.
> 3. Generar denuncias regulatorias que afecten al broker entero.
>
> Parte de nuestro trabajo como ventas es educar al influencer en qué puede y qué no puede decir. Si no lo hacemos, perdemos la cuenta y la comunidad.

### Disclaimers obligatorios

El influencer debe incluir en toda promoción pública (posts, reels, descripciones, videos):

- "El trading conlleva alto riesgo. El 70-80% de traders retail pierden dinero."
- "Rendimientos pasados no garantizan resultados futuros."
- "NEOMAAA Markets opera bajo licencia Anjouan L15968/N."
- "Esta comunicación no constituye asesoramiento financiero."

### FAQ de ventas — lo que el influencer te va a preguntar

**"¿Tengo que pagarle algo a NEOMAAA?"**

No. MQL5 Signals es un servicio independiente de MetaQuotes, no del broker. NEOMAAA solo te provee la cuenta donde operás. MQL5 retiene aproximadamente 25% de las suscripciones como fee de plataforma. Vos cobrás el 75% restante directamente de MQL5.

**"¿Cuánto puedo cobrar por suscripción?"**

Rango típico MQL5: $30-500 USD por mes. Signals top del mundo cobran $200-500. Nuestra recomendación: **empezá gratis los primeros 30-60 días**, después subí a $50-100. Cuando tengas 100+ subscribers activos y reviews sólidas, subí a $150-250.

**"¿Puedo tener múltiples cuentas y señales al mismo tiempo?"**

Sí. Podés tener varias cuentas NEOMAAA (scalping en una, swing en otra, gold en otra), cada una con su propia señal en MQL5. Algunos signal providers top tienen 3-5 señales paralelas para segmentar su audiencia.

**"¿Qué pasa si pierdo mucho y los followers me reclaman?"**

MQL5 no garantiza resultados. Los followers al suscribirse aceptan los términos donde asumen todo el riesgo. Tu responsabilidad legal es operar honestamente y no prometer lo que no podés cumplir. Reputacional: si perdés mucho, followers cancelan, tu ranking cae, y te cuesta recuperar. Por eso el **risk management es clave**.

**"¿Cuántos followers necesito para que valga la pena?"**

Matemática simple:
- 10 followers × $50/mes = $500/mes
- 50 followers × $100/mes = $5,000/mes
- 200 followers × $150/mes = $30,000/mes
- 500 followers × $200/mes = $100,000/mes

Escalable según tu audiencia. Los top providers de MQL5 generan $20-100K USD/mes solo en suscripciones.

**"¿Puedo cobrar fuera de MQL5 también?"**

Sí: comisión IB por cada follower que abre cuenta en NEOMAAA usando tu código. Eso es adicional e independiente de la suscripción MQL5. Podés también vender cursos, mentorías, etc., pero esos son aparte.

**"¿Qué pasa si mi cuenta quema (pierdo todo)?"**

Tu señal en MQL5 queda marcada con "Drawdown > 100%". Los followers cancelan automáticamente. Tu reputación en MQL5 queda dañada y es muy difícil recuperarla (crear una nueva señal arranca de cero y los followers te buscan por histórico). Por eso: **nunca arriesgues más del 1-2% por trade**, diversificá, y usá stop losses.

**"¿Puedo cambiar la estrategia sin avisar?"**

Técnicamente sí, pero los followers lo notan y cancelan si ven inconsistencia con lo que prometiste. Mejor ser transparente: si vas a cambiar de scalping a swing, avisá en la descripción y en tu comunidad.

### Cómo cerrar la venta con el influencer — proceso de 4 semanas

<div class="neo-step-list">
<div class="neo-step" data-num="1"><div><strong>Semana 1 — Pitch y preparación.</strong> Mostrale esta guía (forward el link). Respondé preguntas. Ayudalo a decidir el tipo de cuenta y monto de depósito inicial. Si es IB además, configurá su código de afiliado.</div></div>
<div class="neo-step" data-num="2"><div><strong>Semana 2 — Onboarding NEOMAAA.</strong> Lo acompañás en abrir cuenta, completar KYC, depositar, e instalar MT5. Le ayudás con las primeras operaciones de warm-up para generar historial.</div></div>
<div class="neo-step" data-num="3"><div><strong>Semana 3 — Setup MQL5.</strong> Creación de cuenta MQL5, vinculación con su cuenta NEOMAAA, publicación de la primera señal. Ayuda con copy de la descripción, pricing, selección de imagen de portada.</div></div>
<div class="neo-step" data-num="4"><div><strong>Semana 4 — Lanzamiento.</strong> Lo ayudás a armar el kit de onboarding para su comunidad (posts, reels, link en bio). Si encaja con el branding NEOMAAA, compartís su señal en nuestros canales oficiales. Seguimiento semanal los primeros 3 meses.</div></div>
</div>

### Casos de éxito conocidos (ejemplos a nivel mundial)

Los top signals de MQL5 generan revenue de $20,000 a $100,000+ USD por mes. Son casos públicos consultables en el marketplace:

- [DATO: agregar 2-3 ejemplos reales de signals exitosos con sus links de MQL5 — recomendable buscar en https://www.mql5.com/en/signals/mt5/list/rating y seleccionar 3 top performers para citar como referencia]

Estos ejemplos sirven para mostrarle al influencer que el modelo funciona a gran escala, no es teoría.

---

## PARTE 4 — DUDAS TÉCNICAS COMUNES

Estas son las preguntas que te van a hacer followers e influencers durante el setup. Respuestas cortas para usar en chat de soporte.

**"El provider tiene leverage 1:500 y yo 1:200 — ¿puedo copiar?"**

Sí, pero tu risk real va a ser mayor porque tu margen es más restrictivo. MQL5 calcula el copy ratio considerando las diferencias. Revisá bien los risk settings al suscribirte — puede que algunos trades no se copien por falta de margin. Si podés, igualá el leverage al del provider.

**"¿Puedo copiar solo algunas operaciones?"**

Sí. En los risk settings de MQL5 podés filtrar: por instrumento (ej. solo EURUSD), por horario (ej. solo mañana), por tipo de orden (ej. solo buy). Configurable al suscribirte y editable después.

**"¿El copy trading funciona con MT4 o solo MT5?"**

NEOMAAA Markets solo ofrece MT5. MQL5 Signals funciona en ambos sistemas, pero como en NEOMAAA solo tenés MT5, no es un problema. MT5 es la versión moderna y recomendada.

**"¿Qué pasa si cierro la PC? ¿Tengo que dejar MT5 abierto?"**

MQL5 Signals **no requiere que tu PC esté encendida**. Una vez que te suscribís y configurás, MQL5 ejecuta en sus servidores (virtual server). Tu PC puede estar apagada o tu MT5 cerrado — los trades se copian igual en tu cuenta en el broker.

> [!INFO]
> Para copy trading sin tu PC encendida, MQL5 ofrece un **Virtual Hosting** (VPS) opcional por ~$10-15/mes. Recomendado si querés máxima latencia baja, pero no es estrictamente necesario para la mayoría de estrategias.

**"Si el signal provider cierra su cuenta, ¿qué pasa con mis trades?"**

Los trades YA ABIERTOS siguen activos hasta que vos los cerrés manualmente (o hasta que lleguen a su SL/TP). Nuevos trades del provider no se copian porque ya no los publica. Tu suscripción se cancela automáticamente y no se te cobra más.

**"¿Hay ranking de signals?"**

Sí. MQL5 tiene ranking global por varias métricas: growth, drawdown, antigüedad, subscribers, Sharpe ratio. URL: https://www.mql5.com/en/signals

**"¿Puedo ser signal provider y follower al mismo tiempo?"**

Sí. Podés tener una cuenta que publica señal (sos provider) y otra cuenta (o la misma) que copia otras señales (sos follower). No hay conflicto.

**"¿Qué latencia hay entre el trade del provider y mi copia?"**

Típico: 0.5-3 segundos. Depende de:
- Latencia de tu conexión a internet.
- Distancia de tu servidor MT5 al de MQL5.
- Si usás VPS o no.

Para scalping intradiario puede ser un problema. Para day trading y swing, irrelevante.

**"¿MQL5 Signals es legal en mi país?"**

En la mayoría de países de LATAM y Europa, sí. El copy trading es regulado de forma similar al trading propio — vos sos responsable de tus operaciones. Algunos países (EEUU, Canadá) tienen restricciones específicas. Si tenés dudas, consultá con un abogado local.

**"¿Puedo cobrar mis ganancias del broker si estoy copiando señales?"**

Sí. Las ganancias de trading son tuyas, sin importar si vinieron de trades manuales o copiados. Retirás normal del portal NEOMAAA.

---

## Recursos oficiales

- **MQL5 Signals marketplace:** https://www.mql5.com/en/signals
- **Top signals MT5 ranking:** https://www.mql5.com/en/signals/mt5/list/rating
- **MQL5 Docs y artículos Signals:** https://www.mql5.com/en/articles/category/signals
- **MT5 Download:** desde el portal NEOMAAA Markets (sección Plataformas)
- **Broker NEOMAAA Markets:** [DATO: link oficial al portal público]
- **Términos y condiciones MQL5 Signals:** https://www.mql5.com/en/signals/info/agreement

## Soporte

Si tu influencer o follower tiene dudas técnicas durante el setup:

- **Soporte NEOMAAA:** support@neomaaa.com (respuesta 24h)
- **Soporte MQL5:** https://www.mql5.com/en/support
- **Chat interno del equipo ventas:** Telegram NEOMAAA (para escalar casos complejos a Pepe).

---

## Checklist del signal provider (primer mes)

Usá este checklist cuando onboardeás a un nuevo influencer como signal provider. Marcalo en el CRM como milestones.

- [ ] Cuenta NEOMAAA abierta y KYC aprobado
- [ ] Depósito inicial realizado (mínimo $500 recomendado)
- [ ] 10+ operaciones reales cerradas para track record
- [ ] 2-4 semanas de historial con resultados documentados
- [ ] Cuenta MQL5.community creada y email confirmado
- [ ] Perfil MQL5 completo (foto, bio, redes sociales)
- [ ] Cuenta MT5 NEOMAAA vinculada en MQL5 (con investor password)
- [ ] Verificación de cuenta MQL5 exitosa (email de confirmación recibido)
- [ ] Señal creada con nombre, descripción, pricing definidos
- [ ] Imagen de portada subida (logo profesional)
- [ ] Señal publicada y URL pública generada
- [ ] Kit de onboarding preparado para la comunidad
- [ ] Primeros 5 subscribers onboardeados con éxito
- [ ] Review semanal del performance agendado
- [ ] Disclaimers compliance incluidos en toda promoción pública

## Checklist del follower (primera suscripción)

- [ ] Cuenta NEOMAAA abierta y KYC aprobado
- [ ] Depósito inicial realizado (mínimo $500 recomendado para copy trading)
- [ ] MT5 instalado y cuenta logueada correctamente
- [ ] Cuenta MQL5.community creada
- [ ] MT5 conectado a MQL5 (Tools → Options → Community)
- [ ] Señal del provider revisada (drawdown, growth, age, reviews)
- [ ] Risk settings configurados (max risk, deviation, SL/TP limits)
- [ ] Suscripción activa y primer trade copiado exitosamente
- [ ] Plan de review semanal del performance definido

---

*Última actualización: abril 2026. Si MQL5 cambia la interfaz o el proceso, actualizar esta guía. Responsable de mantenimiento: equipo de ventas NEOMAAA + Pepe (revisión técnica).*
