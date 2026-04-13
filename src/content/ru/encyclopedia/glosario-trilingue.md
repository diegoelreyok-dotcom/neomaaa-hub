# Трёхъязычный глоссарий ES / EN / RU

Справочный глоссарий брокера NEOMAAA Markets на трёх языках: испанский (Испания), английский (US) и русский (формальный коммерческий, кириллица). Разработан для того, чтобы двуязычная команда использовала последовательную терминологию в материалах, скриптах продаж, ответах поддержки и юридических документах, а конечный клиент всегда читал один и тот же термин на своём языке.

---

## Как пользоваться глоссарием

- Термины **упорядочены по алфавиту** по испанской записи внутри каждого тематического раздела.
- Каждая строка включает: термин на трёх языках, **краткое определение** и **пример использования**.
- Русские эквиваленты даны в **кириллице** (не транслитерированы). Когда формальный русский термин отличается от разговорного употребления, это указано в примечаниях.
- Некоторые технические термины **никогда не переводятся** (spread, pip, swap, CFD, MT5): это универсальные стандарты рынка. Они помечены примечанием «заимствование».
- Для таргета LATAM добавлены заметки о вариантах, где пиренейский испанский отличается (напр. «operación» vs «operativa»).

> [!TIP]
> Когда сомневаетесь, использовать ли термин на английском или перевести его, применяйте это правило: если клиент увидит его написанным в MT5, в договоре брокера или в таблице спредов — **оставляйте английский**. Если это образовательное объяснение — **переводите**.

---

## Соглашения

| Элемент | Стандарт |
|---|---|
| Испанский | Пиренейский (Испания) по умолчанию, заметки по LATAM где применимо |
| Английский | US English за исключением регуляторных случаев (UK/EU) |
| Русский | Формальный коммерческий. Без сленга. Без арго трейдерских форумов |
| Род в ES | Использовать женский/мужской род согласно RAE («la orden», «el spread») |
| Заглавные буквы | Собственные имена платформ и продуктов: MetaTrader 5, SEPA, SWIFT |
| Аббревиатуры | Раскрывать при первом появлении; далее можно оставлять сокращёнными |

---

## 1. Trading y mercado

Термины рынка, ордеров, цен, технического анализа и риск-менеджмента. Это самый критичный раздел для образовательных материалов и скриптов поддержки.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| Apalancamiento | Leverage | Кредитное плечо | Reductor del margen requerido (1/N), NO multiplicador de capital. Con 1:500 el margen requerido para 1 lote EUR/USD (~USD 115K nocionales) es ~USD 230. El broker provee el leverage recibido de su LP. | "El apalancamiento máximo en EURUSD es 1:500 — el margen requerido es el nocional dividido 500." |
| Análisis fundamental | Fundamental analysis | Фундаментальный анализ | Estudio de datos macro (tipos, empleo, PIB) y noticias para anticipar movimiento de precio. | "Hoy priorizamos análisis fundamental por el dato de NFP." |
| Análisis técnico | Technical analysis | Технический анализ | Estudio del gráfico de precios y volumen mediante indicadores y patrones. | "El análisis técnico muestra resistencia clara en 1,0950." |
| Ask | Ask | Аск | Precio al que el cliente **compra** el activo; precio de oferta del broker. | "El Ask de EURUSD está en 1,0843." |
| Backtesting | Backtesting | Бэктестинг | Simulación de una estrategia sobre datos históricos para medir su rendimiento. | "Antes de operar en real hicimos backtesting en 5 años de datos." |
| Bid | Bid | Бид | Precio al que el cliente **vende** el activo; precio de demanda del broker. | "El Bid es 1,0841, el Ask 1,0843, el spread es 0,2 pips." |
| Break-even | Break-even | Точка безубыточности | Nivel de precio al que una operación no gana ni pierde. | "Muevo el stop a break-even para no arriesgar capital." |
| Cambio de divisa | Currency exchange | Обмен валют | Conversión de una moneda a otra al tipo de cambio vigente. | "El cambio EUR/USD cotiza a 1,0842." |
| Carry trade | Carry trade | Кэрри-трейд | Estrategia de obtener rendimiento comprando divisa con tipo alto y vendiendo una con tipo bajo. | "El carry trade en JPY perdió atractivo tras la subida del BoJ." |
| CFD | CFD | CFD | Contrato por diferencia: instrumento derivado que replica el precio de un activo sin poseerlo. | "Operamos acciones como CFDs, sin recibir dividendos físicos." |
| Comprar (posición larga) | Buy (long position) | Купить (длинная позиция) | Abrir posición esperando subida de precio. | "Compré EURUSD a 1,0840 esperando 1,0900." |
| Cruce de divisas | Cross rate | Кросс-курс | Par de divisas que no incluye USD (ej. EURGBP, AUDJPY). | "Los cruces de JPY están volátiles hoy." |
| Chart | Chart | График | Representación gráfica del precio en el tiempo. | "Abre el chart de 4 horas del XAUUSD." |
| Day trading | Day trading | Дневной трейдинг | Estilo de operativa que abre y cierra posiciones en el mismo día. | "El day trading no paga swap porque no deja posiciones abiertas overnight." |
| Divergencia | Divergence | Дивергенция | Desajuste entre precio e indicador, señal de posible reversión. | "Hay divergencia bajista entre el RSI y el precio." |
| Divisa base | Base currency | Базовая валюта | Primera divisa del par; es la que se compra o vende. | "En EURUSD, el euro es la divisa base." |
| Divisa cotizada | Quote currency | Котируемая валюта | Segunda divisa del par; expresa el precio de la base. | "En EURUSD, el dólar es la divisa cotizada." |
| Drawdown | Drawdown | Просадка | Caída máxima desde un pico de capital hasta un valle. | "La estrategia tuvo un drawdown máximo del 18%." |
| ECN | ECN | ECN | Electronic Communication Network: red que conecta órdenes de traders y proveedores de liquidez sin intermediario. | "En cuentas ECN el spread es variable y bajo." |
| Equity | Equity | Эквити | Capital total de la cuenta incluyendo P&L flotante de posiciones abiertas. | "Mi equity es 10.350 €, el balance 10.000 €." |
| Gap | Gap | Гэп | Salto de precio entre el cierre de una sesión y la apertura de la siguiente. | "El lunes abrimos con un gap alcista de 40 pips en GBPUSD." |
| Hedging | Hedging | Хеджирование | Apertura de posiciones opuestas para cubrir riesgo. | "El hedging reduce exposición pero no elimina el coste del spread." |
| Indicador | Indicator | Индикатор | Cálculo matemático sobre precio/volumen que ayuda a tomar decisiones (RSI, MACD, MA). | "Configura el indicador RSI con período 14." |
| Lote | Lot | Лот | Unidad estándar de volumen de operación. 1 lote forex = 100.000 unidades de divisa base. | "Operé 0,5 lotes de EURUSD." |
| Lote estándar | Standard lot | Стандартный лот | 100.000 unidades de la divisa base. | "Un lote estándar en EURUSD mueve 10 USD por pip." |
| Margen | Margin | Маржа | Depósito bloqueado como garantía de una posición abierta. | "Esta operación requiere 1.000 € de margen." |
| Margen libre | Free margin | Свободная маржа | Equity menos margen usado; disponible para abrir nuevas posiciones. | "Tienes 8.500 € de margen libre." |
| Margen requerido | Used margin | Используемая маржа | Parte del equity retenida como garantía. | "El margen requerido sube si aumentas el lotaje." |
| Market maker | Market maker | Маркет-мейкер | Broker que provee liquidez tomando la contraparte del cliente. | "Somos híbridos: ECN/STP, no market maker puro." |
| Media móvil | Moving average | Скользящая средняя | Promedio del precio en N períodos; suaviza el ruido. | "La media móvil de 200 funciona como soporte dinámico." |
| Microlote | Micro lot | Микролот | 0,01 lotes = 1.000 unidades de la divisa base. | "Empieza con microlotes hasta dominar la estrategia." |
| Minilote | Mini lot | Мини-лот | 0,1 lotes = 10.000 unidades de la divisa base. | "Operar 1 minilote mueve 1 USD por pip en EURUSD." |
| Nivel de margen | Margin level | Уровень маржи | (Equity / Margen usado) × 100. Métrica de salud de la cuenta. | "Si el nivel de margen cae al 50%, se activa stop out." |
| Orden a mercado | Market order | Рыночный ордер | Orden que se ejecuta al precio vigente inmediato. | "Ejecuté una orden a mercado en XAUUSD." |
| Orden pendiente | Pending order | Отложенный ордер | Orden programada para activarse a un precio futuro (limit/stop). | "Dejé una orden pendiente buy limit en 1,0820." |
| Pip | Pip | Пипс | Mínima variación estándar de precio en un par forex (normalmente el cuarto decimal). | "EURUSD se movió 35 pips en la sesión europea." |
| Posición abierta | Open position | Открытая позиция | Operación en curso, no cerrada. | "Tengo 3 posiciones abiertas en el EURUSD." |
| Posición cerrada | Closed position | Закрытая позиция | Operación ya liquidada; P&L realizado. | "La posición cerrada dejó 120 € de beneficio." |
| Profit | Profit | Прибыль | Beneficio resultante de una operación o período. | "El profit de la semana fue 450 €." |
| Punto | Point | Пункт | 1/10 de pip en cotizaciones de 5 decimales; unidad mínima de MT5. | "El spread es de 2 puntos (0,2 pips)." |
| Rango | Range | Диапазон | Zona de precio donde el mercado oscila entre soporte y resistencia. | "EURUSD opera en rango 1,0800 — 1,0900." |
| Requote | Requote | Реквот | Rechazo y nueva cotización al enviar una orden por cambio de precio. | "Los requotes son típicos en market makers; en ECN son raros." |
| Resistencia | Resistance | Сопротивление | Nivel de precio donde la oferta supera a la demanda y frena la subida. | "1,0950 es la resistencia clave esta semana." |
| Reversión | Reversal | Разворот | Cambio de tendencia del precio. | "Señal de reversión confirmada tras el doble techo." |
| Scalping | Scalping | Скальпинг | Estilo de operativa de altísima frecuencia buscando pocos pips por operación. | "El scalping exige spreads bajos y ejecución rápida." |
| Sell (posición corta) | Sell (short position) | Продать (короткая позиция) | Abrir posición esperando bajada de precio. | "Vendí GBPUSD en 1,2750 con stop en 1,2790." |
| Señal | Signal | Сигнал | Recomendación de entrada o salida basada en análisis. | "El proveedor de señales envía alertas por Telegram." |
| Slippage | Slippage | Проскальзывание | Diferencia entre precio solicitado y precio real de ejecución. | "En noticias de alto impacto el slippage puede ser notable." |
| Soporte | Support | Поддержка | Nivel de precio donde la demanda supera a la oferta y frena la caída. | "1,0800 actúa como soporte psicológico." |
| Spread | Spread | Спред | Diferencia entre Bid y Ask; coste implícito de la operación. | "El spread medio del EURUSD en nuestra cuenta Raw es 0,0 pips + comisión." |
| Stop loss | Stop loss | Стоп-лосс | Orden que cierra la posición al alcanzar un precio de pérdida máxima. | "Siempre opero con stop loss, no excepción." |
| Stop out | Stop out | Стоп-аут | Cierre automático de posiciones cuando el margen cae por debajo del mínimo. | "El stop out se activa al 20% de margin level." |
| Swap | Swap | Своп | Coste/beneficio por mantener posiciones abiertas overnight. | "El swap negativo en USDTRY es alto por el diferencial de tipos." |
| Take profit | Take profit | Тейк-профит | Orden que cierra la posición al alcanzar un precio de beneficio objetivo. | "Take profit en 1,0900, stop loss en 1,0810." |
| Tendencia | Trend | Тренд | Dirección predominante del precio (alcista, bajista o lateral). | "La tendencia semanal en oro es claramente alcista." |
| Trailing stop | Trailing stop | Трейлинг-стоп | Stop dinámico que sigue al precio a una distancia fija cuando este se mueve a favor. | "Activo un trailing stop de 30 pips para asegurar beneficio." |
| Volatilidad | Volatility | Волатильность | Magnitud de las variaciones de precio en un período. | "La volatilidad del oro sube durante las noticias de EEUU." |
| Volumen | Volume | Объём | Cantidad operada en un período o instrumento. | "El volumen del EURUSD pico a la apertura de Londres." |

> [!TIP]
> «Spread», «pip», «swap», «take profit», «stop loss», «scalping» и «requote» сохраняются на английском даже в испанских и русских материалах. Это стандарты отрасли. Переводить их звучит академично и сбивает трейдера с толку.

---

## 2. Cuentas y producto broker

Типы счетов, платформы, коммерческие условия. То, что клиент видит при регистрации.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| Apalancamiento máximo | Maximum leverage | Максимальное кредитное плечо | Ratio más alto disponible en la cuenta/instrumento. Define el margen mínimo por posición (margen = nocional / leverage). Tier 1 retail lo limita a 1:30 en forex major. | "El apalancamiento máximo en forex mayor es 1:500." |
| Apertura de cuenta | Account opening | Открытие счёта | Proceso de registro y creación de una cuenta de trading. | "La apertura de cuenta tarda menos de 5 minutos." |
| Balance | Balance | Баланс | Capital de la cuenta sin considerar operaciones abiertas. | "Balance 10.000 €, equity 10.250 €." |
| Broker | Broker | Брокер | Intermediario que ejecuta órdenes del cliente en los mercados. | "NEOMAAA Markets es un broker ECN/STP híbrido." |
| Broker ECN | ECN broker | ECN-брокер | Broker que canaliza órdenes a una red electrónica sin tomar contraparte. | "En un broker ECN pagas comisión pero el spread es crudo." |
| Broker STP | STP broker | STP-брокер | Broker que envía órdenes directamente a proveedores de liquidez. | "El modelo STP elimina el conflicto de interés del market maker." |
| Comisión | Commission | Комиссия | Cargo por operación, fijo o variable, adicional al spread. | "La cuenta Raw cobra 7 USD de comisión por lote round turn." |
| Cuenta Cent | Cent account | Центовый счёт | Cuenta denominada en céntimos; 1 USD en la cuenta = 100 cents. Para practicar con riesgo bajo. | "Las cuentas Cent son ideales para validar EAs con dinero real." |
| Cuenta demo | Demo account | Демо-счёт | Cuenta virtual con dinero ficticio para practicar. | "Abre una demo antes de operar en real." |
| Cuenta islámica | Islamic account | Исламский счёт | Cuenta sin swap, cumple con la ley islámica (sharía). | "La cuenta islámica no paga ni recibe swap." |
| Cuenta Raw | Raw account | Raw-счёт | Cuenta con spreads interbancarios y comisión por lote. | "En la cuenta Raw ves el spread real del LP." |
| Cuenta real | Live account | Реальный счёт | Cuenta con dinero real del cliente. | "Pasó de demo a cuenta real tras un mes practicando." |
| Cuenta Standard | Standard account | Стандартный счёт | Cuenta con spread marcado, sin comisión. | "La cuenta Standard es la más común para principiantes." |
| Cuenta VIP | VIP account | VIP-счёт | Cuenta para clientes de alto volumen, con condiciones preferentes. | "Clientes VIP tienen gestor personal y spreads premium." |
| Depósito mínimo | Minimum deposit | Минимальный депозит | Cantidad mínima requerida para abrir la cuenta. | "El depósito mínimo en cuenta Standard es 100 USD." |
| Divisa de la cuenta | Account currency | Валюта счёта | Divisa base en la que está denominada la cuenta. | "Puedes abrir la cuenta en USD, EUR o GBP." |
| Ejecución | Execution | Исполнение | Forma en que el broker procesa la orden (market, instant, ECN). | "Ejecución ECN con latencia <30 ms." |
| Instrumento | Instrument | Инструмент | Activo negociable (par de divisas, metal, índice, cripto, acción). | "Ofrecemos más de 2.000 instrumentos en MT5." |
| Liquidity provider | Liquidity provider | Поставщик ликвидности | Entidad (banco, prime broker) que provee precios y profundidad de mercado. | "Agregamos liquidez de 8 LPs tier-1." |
| Plataforma | Platform | Платформа | Software para operar (MT5, WebTrader, app móvil). | "Nuestra plataforma principal es MetaTrader 5." |
| Proveedor de liquidez | Liquidity provider | Поставщик ликвидности | Ver Liquidity provider (traducción española). | "El proveedor de liquidez principal es tier-1." |
| Símbolo | Symbol | Символ | Código del instrumento en la plataforma (EURUSD, XAUUSD, US30). | "Agrega el símbolo XAUUSD al Market Watch." |
| Tipo de cuenta | Account type | Тип счёта | Categoría comercial de la cuenta (Standard, Raw, VIP, etc.). | "¿Qué tipo de cuenta se adapta a tu volumen?" |
| Volumen de operación | Trade volume | Объём сделки | Tamaño de la posición en lotes. | "Volumen mínimo 0,01 lotes, máximo 50 lotes por orden." |
| VPS | VPS | VPS | Virtual Private Server. Servidor remoto para alojar MT5 24/7 con baja latencia. | "Ofrecemos VPS gratuito con volumen mensual ≥ 5 lotes." |

---

## 3. KYC, AML y compliance

Регуляторные термины. Точность обязательна: эти тексты обычно идут в договоры, формы и формальные коммуникации.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| AML | AML | ПОД/ФТ | Anti-Money Laundering. Prevención del blanqueo de capitales. En RU formal: "противодействие отмыванию доходов и финансированию терроризма". | "Todos los clientes pasan controles AML antes de operar." |
| AOFA | AOFA | AOFA | Anjouan Offshore Finance Authority. Regulador jurisdiccional del broker NEOMAAA Markets. | "Licencia emitida por la AOFA, número L15968/N." |
| Beneficiario final | Ultimate Beneficial Owner (UBO) | Бенефициарный владелец | Persona física que controla o se beneficia económicamente de una entidad. | "El formulario UBO exige declarar beneficiarios al 25% o más." |
| Comprobante de domicilio | Proof of Residence (POR) | Подтверждение адреса | Documento (factura, extracto bancario) que acredita dirección. | "Acepta factura de luz o contrato de alquiler de menos de 3 meses." |
| Compliance | Compliance | Комплаенс | Función de cumplimiento normativo. | "Compliance aprueba cada apertura de cuenta." |
| Debida diligencia | Due diligence | Надлежащая проверка | Análisis de perfil de riesgo del cliente. | "Clientes high risk requieren debida diligencia reforzada." |
| Debida diligencia reforzada | Enhanced Due Diligence (EDD) | Усиленная проверка | Controles adicionales para clientes de alto riesgo (PEP, jurisdicciones, volúmenes). | "PEP dispara EDD automáticamente." |
| Documento de identidad | ID document | Документ, удостоверяющий личность | DNI, pasaporte o carné de conducir según jurisdicción. | "Subir documento de identidad vigente por ambas caras." |
| Fuente de fondos | Source of Funds (SoF) | Источник средств | Origen del dinero depositado en la cuenta. | "Declaración de fuente de fondos: salario, ahorros, inversiones." |
| Fuente de patrimonio | Source of Wealth (SoW) | Источник благосостояния | Origen del patrimonio total del cliente (no solo del depósito). | "SoW se pide en depósitos altos o clientes EDD." |
| KYC | KYC | KYC | Know Your Customer. Proceso de identificación y verificación del cliente. En RU formal: "Знай своего клиента". | "El KYC se completa con Sumsub en menos de 10 minutos." |
| Lavado de dinero | Money laundering | Отмывание денег | Proceso de dar apariencia legal a fondos de origen ilícito. | "Detectamos patrón sospechoso de lavado y reportamos a la FIU." |
| PEP | Politically Exposed Person (PEP) | Публичное должностное лицо (PDL/PEP) | Persona con cargo público relevante o sus familiares/asociados. | "Si marcas PEP en el formulario se activa EDD." |
| Riesgo país | Country risk | Страновой риск | Nivel de riesgo asociado a la jurisdicción de residencia del cliente. | "Riesgo país alto requiere documentación adicional." |
| Sanciones | Sanctions | Санкции | Medidas restrictivas internacionales (ONU, OFAC, UE). | "Aplicamos screening contra listas OFAC, UE, ONU." |
| SAR | Suspicious Activity Report (SAR) | Сообщение о подозрительной деятельности | Reporte a la unidad de inteligencia financiera de actividad sospechosa. | "Compliance presentó un SAR por movimientos inconsistentes." |
| Screening | Screening | Скрининг | Cotejo del cliente contra listas de sanciones, PEP y medios adversos. | "El screening es automático al registro y mensual después." |
| Selfie con documento | Selfie with ID | Селфи с документом | Foto del cliente sosteniendo su documento de identidad. | "Sumsub solicita selfie con documento como prueba de vida." |
| Verificación | Verification | Верификация | Confirmación formal de la identidad y datos del cliente. | "Tu cuenta está verificada; ya puedes depositar." |

> [!TIP]
> В русском языке «AML» может появляться как AML (заимствование) или ПОД/ФТ (русская аббревиатура). В юридических текстах использовать ПОД/ФТ; во внутренних материалах и CRM допустимо оставлять AML. **Никогда** не транслитерировать в «АМЛ».

---

## 4. Pagos y PSPs

Депозиты, выводы, способы оплаты. То, что клиент видит в кошельке портала.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| Acreditación | Credit / Crediting | Зачисление | Abono del depósito en la cuenta de trading. | "La acreditación de tarjetas es instantánea." |
| Chargeback | Chargeback | Чарджбек | Disputa por la que un banco retira un cargo al comerciante. | "Los chargebacks en broker son raros pero críticos para compliance." |
| Cripto / Criptomoneda | Cryptocurrency | Криптовалюта | Activo digital usado como medio de pago (BTC, ETH, USDT). | "Depositamos y retiramos en USDT red TRC-20 y ERC-20." |
| Comisión de depósito | Deposit fee | Комиссия за депозит | Cargo aplicado al depositar. | "No cobramos comisión de depósito salvo transferencia bancaria." |
| Comisión de retiro | Withdrawal fee | Комиссия за вывод | Cargo aplicado al retirar. | "Primer retiro del mes sin comisión." |
| Depósito | Deposit | Депозит | Ingreso de fondos a la cuenta de trading. | "Depósito mínimo 100 USD, procesamiento inmediato." |
| e-Wallet | e-Wallet | Электронный кошелёк | Billetera electrónica (Skrill, Neteller, PayPal). | "Acepta e-wallets principales de LATAM y EU." |
| Gateway de pago | Payment gateway | Платёжный шлюз | Sistema que procesa el pago entre cliente y broker. | "Integramos 3 gateways redundantes para garantizar uptime." |
| IBAN | IBAN | IBAN | International Bank Account Number, código internacional de cuenta bancaria. | "Para SEPA siempre envía IBAN y BIC del beneficiario." |
| Método de pago | Payment method | Способ оплаты | Canal por el que se realiza un depósito o retiro. | "Tenemos 120+ métodos de pago locales." |
| Procesador de pagos (PSP) | Payment Service Provider (PSP) | Платёжный сервис-провайдер (PSP) | Proveedor externo que opera el rail de pago. | "El PSP para LATAM es distinto al de Europa." |
| Reconciliación | Reconciliation | Сверка | Cotejo entre registros del broker y del PSP/banco. | "Reconciliación diaria con todos los PSPs activos." |
| Retención | Rolling reserve | Резерв / Удерживаемый остаток | Porcentaje retenido por el PSP durante un período como garantía. | "El PSP aplica rolling reserve del 5% por 180 días." |
| Retiro | Withdrawal | Вывод средств | Salida de fondos desde la cuenta de trading al método de pago del cliente. | "Los retiros se procesan en menos de 24 horas hábiles." |
| SEPA | SEPA | SEPA | Single Euro Payments Area. Transferencias en euros en la UE. | "Transferencia SEPA llega en 1 día hábil, sin comisión." |
| Swift | SWIFT | SWIFT / Свифт | Red internacional de mensajería bancaria para transferencias. | "SWIFT tarda 2-5 días hábiles y suele tener comisión intermediaria." |
| Tarjeta de crédito/débito | Credit/Debit card | Кредитная / дебетовая карта | Medio de pago con tarjeta Visa, Mastercard, etc. | "Depósito con tarjeta es instantáneo." |
| Tipo de cambio | Exchange rate | Курс обмена | Precio de conversión entre dos divisas. | "Aplicamos el tipo de cambio interbancario +0,5%." |
| Transferencia bancaria | Bank transfer | Банковский перевод | Envío de fondos entre cuentas bancarias. | "Transferencia bancaria para depósitos >10.000 €." |
| 3DS | 3DS (3-D Secure) | 3DS | Protocolo de autenticación adicional para pagos con tarjeta. | "3DS obligatorio para todos los pagos con tarjeta EU." |

---

## 5. CRM, marketing y partners

Термины коммерческого пайплайна, партнёрской программы и бизнес-метрик.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| Adquisición | Acquisition | Привлечение клиентов | Proceso de captar nuevos clientes. | "Presupuesto de adquisición: 40% SEO, 35% ads, 25% IBs." |
| Afiliado | Affiliate | Аффилиат / Партнёр | Persona o empresa que promueve el broker a cambio de comisión. | "Registramos 120 afiliados nuevos en Q1." |
| CAC | CAC | CAC | Customer Acquisition Cost. Coste promedio de adquirir un cliente. | "El CAC en LATAM es 180 USD." |
| Conversión | Conversion | Конверсия | Acción de pasar de una fase del funnel a la siguiente (visita → registro → FTD). | "Tasa de conversión lead → FTD del 12%." |
| Comisión de afiliado | Affiliate commission | Партнёрская комиссия | Pago al afiliado por cliente referido que opere. | "Comisión CPA 350 USD por FTD calificado." |
| CPA | CPA | CPA | Cost Per Acquisition. Pago único al afiliado por cliente adquirido. | "Plan CPA: 300-500 USD según jurisdicción." |
| CPL | CPL | CPL | Cost Per Lead. Pago al afiliado por lead generado. | "En CPL pagamos 8-15 USD por lead cualificado." |
| CRM | CRM | CRM | Customer Relationship Management. Plataforma de gestión de clientes. | "Nuestro CRM principal es Skale." |
| Embudo / Funnel | Funnel | Воронка продаж | Secuencia de pasos que convierte un visitante en cliente activo. | "El funnel actual: ad → landing → lead → KYC → FTD." |
| FTD | First Time Deposit (FTD) | FTD / Первый депозит | Primer depósito real del cliente. | "El KPI principal de ventas es FTDs por mes." |
| IB | Introducing Broker (IB) | Представляющий брокер (IB) | Afiliado que refiere clientes y recibe comisión por volumen operado. | "Nuestros IBs top generan 200 FTDs al mes." |
| Landing page | Landing page | Лендинг / Посадочная страница | Página de aterrizaje diseñada para convertir un visitante en lead. | "Testeamos 3 landings distintas para el público español." |
| Lead | Lead | Лид | Contacto interesado, aún no cliente activo. | "Tenemos 8.500 leads en cola de primer contacto." |
| Lead calificado | Qualified lead | Квалифицированный лид | Lead que cumple criterios mínimos (país, presupuesto, intención). | "Ventas solo trabaja leads calificados." |
| Lifetime revenue | Lifetime revenue | Пожизненный доход | Ingreso total generado por un cliente a lo largo de su vida como cliente. | "El lifetime revenue promedio es 1.200 USD por FTD." |
| LTV | LTV | LTV / Пожизненная ценность клиента | Lifetime Value. Valor total esperado de un cliente. | "LTV/CAC objetivo mínimo 3:1." |
| Marca blanca | White label | Белая метка / White label | Acuerdo bajo el cual una empresa usa la tecnología del broker con su propia marca. | "Ofrecemos white label desde 25.000 USD de setup." |
| Mesa VIP | VIP desk | VIP-отдел | Equipo dedicado a clientes de alto volumen. | "La mesa VIP atiende al top 5% de clientes." |
| NPS | NPS | NPS / Индекс потребительской лояльности | Net Promoter Score. Métrica de lealtad del cliente. | "NPS del soporte Q1: 67." |
| Onboarding | Onboarding | Онбординг | Proceso de bienvenida y activación del cliente. | "El onboarding incluye 3 emails + llamada de bienvenida." |
| Programa de afiliados | Affiliate program | Партнёрская программа | Sistema estructurado de comisiones para afiliados. | "El programa de afiliados tiene 3 niveles: IB, Master IB, Agency." |
| Prospecto / Prospect | Prospect | Потенциальный клиент | Lead con alto potencial de conversión. | "Marca como prospect los leads con ≥50k de volumen estimado." |
| Retención | Retention | Удержание | Capacidad de mantener clientes activos. | "La retención a 90 días es del 42%." |
| Rebate | Rebate | Ребейт | Devolución parcial de spread/comisión al afiliado o cliente. | "Los IBs reciben rebate del 30% del spread generado." |
| ROI | ROI | ROI / Рентабельность инвестиций | Return On Investment. Retorno de la inversión. | "El ROI de la campaña en Instagram fue 3,2x." |
| Upsell / Venta cruzada | Upsell | Апсейл | Venta de un producto o cuenta superior al cliente existente. | "Upsell de Standard a Raw tras 3 meses activos." |

---

## 6. Tecnología y plataforma

Технические термины, которые появляются в исполнении, MT5 и продвинутой поддержке.

| Término ES | Término EN | Término RU | Definición breve | Ejemplo de uso |
|---|---|---|---|---|
| API | API | API | Application Programming Interface. Interfaz para integrar sistemas. | "El CRM se conecta al core del broker por API." |
| Aplicación móvil | Mobile app | Мобильное приложение | Versión de la plataforma para smartphone. | "MT5 tiene app iOS y Android." |
| Asesor experto (EA) | Expert Advisor (EA) | Советник (Expert Advisor) | Robot de trading automatizado en MT5. | "Permitimos EAs sin restricciones en todas las cuentas." |
| Backend | Backend | Бэкенд | Parte servidora del sistema (lógica, base de datos). | "El backend corre en AWS eu-west-1." |
| Copy trading | Copy trading | Копи-трейдинг | Replicación automática de operaciones de otro trader. En NEOMAAA se hace vía **MQL5 Signals** (marketplace nativo de MetaQuotes en MT5). NEOMAAA no opera MAM/PAMM propio. | "Nuestro copy trading corre sobre MQL5 Signals — cada follower se suscribe desde su propio MT5." |
| Dashboard | Dashboard | Панель управления | Panel de control con métricas e información. | "El dashboard del cliente muestra balance, equity e historial." |
| Ejecución | Execution | Исполнение | Procesamiento de una orden en el mercado. | "Nuestra ejecución promedio es <50 ms." |
| Frontend | Frontend | Фронтенд | Parte visible/cliente del sistema (web, app). | "El frontend del portal está en Next.js." |
| Latencia | Latency | Задержка | Tiempo que tarda una orden en llegar al servidor y ejecutarse. | "Latencia media a los LP: 12 ms." |
| MetaTrader 5 (MT5) | MetaTrader 5 (MT5) | MetaTrader 5 (MT5) | Plataforma de trading estándar del sector. | "MT5 soporta multi-asset: forex, acciones, futuros, cripto." |
| Orden rechazada | Rejected order | Отклонённый ордер | Orden no ejecutada por el servidor (precio, margen, sesión). | "Tu orden fue rechazada: margen insuficiente." |
| Servidor | Server | Сервер | Máquina que aloja la plataforma de trading. | "Servidor MT5 en Equinix LD5, Londres." |
| Uptime | Uptime | Аптайм / Время безотказной работы | Porcentaje de tiempo que el sistema está operativo. | "Uptime objetivo 99,95% mensual." |
| Webhook | Webhook | Вебхук | Notificación HTTP automática entre sistemas. | "El webhook de Sumsub actualiza el estado KYC en tiempo real." |
| WebTrader | WebTrader | Веб-терминал | Versión web del MT5 sin instalación. | "El WebTrader funciona desde cualquier navegador." |

---

## 7. Frases comunes del cliente

Буквальные фразы, появляющиеся в поддержке и продажах. Использовать эти переводы как **официальный шаблон** в скриптах.

| Frase ES | Frase EN | Frase RU | Contexto |
|---|---|---|---|
| "Quiero retirar mi dinero" | "I want to withdraw my funds" | "Я хочу вывести средства" | Inicio típico de solicitud de retiro. |
| "Mi depósito no se acreditó" | "My deposit hasn't been credited" | "Мой депозит не зачислен" | Incidencia de pago. |
| "No puedo cerrar mi posición" | "I can't close my position" | "Я не могу закрыть позицию" | Problema técnico/plataforma. |
| "El spread está muy alto" | "The spread is too high" | "Спред слишком высокий" | Queja típica durante noticias o sesión asiática. |
| "Me saltó el stop loss" | "My stop loss was triggered" | "Сработал мой стоп-лосс" | Situación emocional; el agente debe empatizar. |
| "Necesito actualizar mis documentos" | "I need to update my documents" | "Мне нужно обновить документы" | Flujo de reverificación KYC. |
| "¿Cuándo llega mi retiro?" | "When will my withdrawal arrive?" | "Когда поступит мой вывод средств?" | Seguimiento de retiro en curso. |
| "No recuerdo mi contraseña" | "I forgot my password" | "Я забыл пароль" | Reset de credenciales. |
| "¿Cuál es el apalancamiento máximo?" | "What is the maximum leverage?" | "Какое максимальное кредитное плечо?" | Pregunta de producto. |
| "¿Tienen cuenta islámica?" | "Do you offer Islamic accounts?" | "Есть ли у вас исламский счёт?" | Frecuente en MENA y clientes musulmanes. |
| "Quiero cambiar de tipo de cuenta" | "I want to change my account type" | "Я хочу сменить тип счёта" | Upsell opportunity. |
| "El bono no se aplicó" | "The bonus was not credited" | "Бонус не был зачислен" | Incidencia promocional. |
| "¿Puedo operar desde mi país?" | "Can I trade from my country?" | "Могу ли я торговать из моей страны?" | Pregunta regulatoria/jurisdicción. |
| "Necesito hablar con un humano" | "I need to speak with a human" | "Мне нужно поговорить с человеком" | Señal clara de escalar del chatbot a agente. |
| "¿Cómo calculo el tamaño de la posición?" | "How do I calculate position size?" | "Как рассчитать размер позиции?" | Educación básica. |

---

## 8. Glosario específico NEOMAAA

Внутренние термины компании и продукта.

| Término | Definición ES | Definición EN | Definición RU |
|---|---|---|---|
| **NEOMAAA Markets** | El broker (este proyecto). Neomaaa Ltd, IBC 15968, licencia Anjouan L15968/N. MT5, ECN/STP híbrido. | The broker (this project). Neomaaa Ltd, IBC 15968, Anjouan license L15968/N. MT5, hybrid ECN/STP. | Брокер (этот проект). Neomaaa Ltd, IBC 15968, лицензия Anjouan L15968/N. MT5, гибридная модель ECN/STP. |
| **NEOMAAA Funded** | Prop firm hermana. Cuentas fondeadas para traders retail. LATAM + España. | Sister prop firm. Funded accounts for retail traders. LATAM + Spain. | Сестринская проп-фирма. Фондированные счета для розничных трейдеров. LATAM + Испания. |
| **AOFA** | Anjouan Offshore Finance Authority. Regulador jurisdiccional del broker. | Anjouan Offshore Finance Authority. Jurisdictional regulator of the broker. | Anjouan Offshore Finance Authority. Юрисдикционный регулятор брокера. |
| **Pepe** | Head of Dealing. 20 años de experiencia. Responsable de mesa y ejecución. | Head of Dealing. 20 years of experience. In charge of dealing desk and execution. | Руководитель дилинга (Pepe). 20 лет опыта. Отвечает за дилинг-отдел и исполнение. |
| **Angel Ortega** | Co-fundador, CEO público, responsable tecnología y CRM. Español. | Co-founder, public CEO, in charge of technology and CRM. Spanish. | Сооснователь, публичный CEO, отвечает за технологии и CRM. Испанец. |
| **Yulia** | Principal, equity partner. Operaciones y logística. | Principal, equity partner. Operations and logistics. | Партнёр-принципал. Операции и логистика. |
| **Susana** | Compliance Officer. | Compliance Officer. | Комплаенс-офицер. |
| **Skale** | CRM principal del broker. | Main broker CRM. | Основная CRM брокера. |
| **Sumsub** | Proveedor KYC/AML de NEOMAAA. | NEOMAAA's KYC/AML provider. | Провайдер KYC/AML для NEOMAAA. |
| **Intercom** | Plataforma de soporte al cliente. | Customer support platform. | Платформа клиентской поддержки. |
| **Neomaaa-broker portal** | Portal operativo interno del broker (Docsify + Vercel). | Internal operations portal of the broker (Docsify + Vercel). | Внутренний операционный портал брокера (Docsify + Vercel). |
| **Go-live** | Lanzamiento público del broker al mercado. | Public launch of the broker to market. | Публичный запуск брокера на рынок. |

---

## 9. Notas de uso — traducción vs préstamo

Действующие редакционные решения. Когда команда пишет новый материал, следовать этим правилам.

> [!TIP]
> **Общее правило:** если термин появляется в MT5, в договоре или в таблице спредов, он не переводится. Если это дидактическое объяснение — да.

**Никогда не переводить (обязательное заимствование):**
- Spread, pip, swap, take profit, stop loss, stop out, trailing stop, requote, slippage, scalping, CFD, MT5, ECN, STP, API, VPS, dashboard, webhook, FTD, CPA, CPL, LTV, CAC, ROI, NPS, KYC, AML, PEP, SAR, SEPA, SWIFT, 3DS, chargeback.

**Переводить всегда:**
- Leverage → apalancamiento (ES) / кредитное плечо (RU formal). В разговорном RU допускается «плечо».
- Lot → lote (ES) / лот (RU).
- Bid/Ask → сохранять на английском в таблицах цен. В пояснительном тексте — «precio de demanda/oferta» (ES) / «цена спроса/предложения» (RU).
- Drawdown → в образовательном материале можно перевести как «pérdida máxima acumulada» (ES) / «максимальная просадка» (RU). В технических отчётах — оставлять «drawdown».
- Range → rango (ES) / диапазон (RU).
- Support/Resistance → soporte/resistencia (ES) / поддержка/сопротивление (RU).

**Смешанные случаи (контекст решает):**
- Trading: НЕ переводить. В формальном RU корректно «трейдинг»; «торговля» звучит более общо.
- Broker: НЕ переводить. В RU «брокер» — стандарт.
- Equity: в MT5 остаётся «Equity» (ES и RU). В пояснительном тексте на RU можно говорить «средства счёта» или «capital» на ES.
- Hedging: предпочтительно «hedging»; «cobertura» на ES допустимо в юридическом тексте.
- Deslizamiento (ES) = slippage. Оба принимаются; в поддержке предпочитать «slippage», потому что трейдер ищет это так в Google.

**Формальный vs разговорный русский:**
- Формальный коммерческий (письма, договоры, compliance): использовать переводы полной кириллицей.
- Образовательный материал для молодого трейдера: допустимо заимствование латиницей (напр. «FTD», «CPA», «breakeven»). Избегать в юридическом тексте.
- **Никогда** не транслитерировать технические аббревиатуры принудительной кириллицей («АМЛ», «КПА») → выглядит любительски.

**Испанский: LATAM vs Испания:**
- «Operar» (Испания) / «operar» также в LATAM → ОК одинаково.
- «Ordenador» (Испания) / «computadora» (LATAM) → использовать «computadora» в материалах LATAM.
- «Retirar fondos» (нейтрально) — избегать «extraer», которое звучит странно в обоих.
- «Saldo» и «balance» — оба действительны. В Испании чаще «saldo», в LATAM чаще «balance».

---

## 10. Glosario maestro — resumen de secciones

| Sección | Términos incluidos | Uso principal |
|---|---|---|
| 1. Trading y mercado | 55 | Educación, soporte técnico, scripts de ventas |
| 2. Cuentas y producto | 25 | Página comercial, comparativa de cuentas, FAQs |
| 3. KYC/AML/Compliance | 20 | Contratos, formularios, comunicación legal |
| 4. Pagos y PSPs | 20 | Cartera del cliente, soporte de pagos |
| 5. CRM, marketing, partners | 27 | Programa afiliados, dashboards, reporting |
| 6. Tecnología | 15 | Soporte técnico, integraciones, MT5 |
| 7. Frases comunes | 15 | Plantillas de soporte multilingüe |
| 8. Glosario NEOMAAA | 12 | Onboarding interno, materiales de marca |
| **TOTAL** | **189** | — |

---

> [!TIP]
> Если вы обнаружите отсутствующий термин, который повторно появляется в тикетах поддержки или в CRM, добавьте его сюда. Этот глоссарий — живой документ: он растёт вместе с продуктом. Централизуйте до того, как каждая команда изобретёт свою версию.
