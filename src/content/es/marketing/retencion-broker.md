# Estrategia de Retencion — NEOMAAA Markets

> Documento interno | Ultima actualizacion: Abril 2026
> Aplica a: NEOMAAA Markets (broker forex/CFD) | Plataforma: MT5 | Mercado principal: LATAM

---

## 1. Ciclo de Vida del Cliente

```
REGISTRO → KYC → FTD → TRADING ACTIVO → LEAL/VIP
   |         |      |        |               |
   v         v      v        v               v
 Lead    Verificado Funded  Engaged        Retenido
```

### 1.1 Definicion de Cada Etapa

| Etapa | Criterio | Objetivo Principal |
|-------|----------|-------------------|
| Registro | Completa formulario, recibe credenciales CRM (Skale) | Avanzar a KYC en <24h |
| KYC | Documentos aprobados via Sumsub | Avanzar a FTD en <72h |
| FTD (First Time Deposit) | Primer deposito confirmado | Que ejecute al menos 1 operacion en <48h |
| Trading Activo | 5+ operaciones/mes, deposito recurrente | Incrementar volumen y frecuencia |
| Leal/VIP | 3+ meses activo, volumen alto o depositos recurrentes | Maximizar LTV, convertir en referidor |

---

## 2. Estrategias de Retencion por Etapa

### 2.1 Registro → KYC

**Problema:** El cliente se registra pero no sube documentos. Tasa tipica de conversion: 40-60%.

**Acciones:**

| Accion | Canal | Timing | Responsable |
|--------|-------|--------|-------------|
| Email de bienvenida con guia paso a paso para KYC | Email automatico (Intercom) | Inmediato | Marketing Automation |
| Recordatorio KYC pendiente | WhatsApp + Email | +6 horas | Sales/Automation |
| Segundo recordatorio con incentivo ("completa tu KYC y accede a senales gratuitas por 7 dias") | WhatsApp | +24 horas | Sales |
| Llamada directa del equipo de ventas | Telefono | +48 horas | Sales |
| Ultimo recordatorio: "Tu cuenta sera archivada en 7 dias" | Email | +5 dias | Automation |

**Tacticas especificas NEOMAAA:**
- Resaltar que Sumsub permite verificacion en <5 minutos con selfie + documento
- Para usuarios que vienen de la prop trading: "Tu cuenta de broker se verifica igual de rapido"
- Ofrecer soporte en vivo via Intercom para problemas de KYC

### 2.2 KYC → FTD (First Time Deposit)

**Problema:** Cliente verificado que no deposita. Este es el GAP MAS CRITICO. Tasa tipica: 20-35%.

**Acciones:**

| Accion | Canal | Timing | Responsable |
|--------|-------|--------|-------------|
| "Tu cuenta esta lista — deposita desde $5 y empieza a operar" | Email + WhatsApp | Inmediato post-KYC | Automation |
| Guia de metodos de deposito locales (PIX, PSE, OXXO, Nequi, Yape segun pais) | Email segmentado por pais | +2 horas | Marketing |
| Video tutorial: "Como hacer tu primer deposito en NEOMAAA Markets" | WhatsApp | +24 horas | Sales |
| Destacar cuenta Cent ($5 minimo) como puerta de entrada sin riesgo | Todos los canales | Continuo | Sales + Marketing |
| Llamada de onboarding personalizada | Telefono | +48 horas | Sales |
| Campana de urgencia: "Deposita esta semana y recibe acceso a Copy Trading premium" | Email + SMS | +5 dias | Marketing |

**Tacticas especificas NEOMAAA:**
- Segmentar por pais y destacar el metodo de pago mas popular de cada mercado
- Para prop crossover: "Ya conoces NEOMAAA — ahora opera con tu propio capital sin reglas de prop"
- Enfatizar que con $5 (Cent) pueden probar sin compromiso real
- Vault Yield como incentivo: "Tu dinero genera hasta 5% anual incluso sin operar"

### 2.3 FTD → Trading Activo

**Problema:** Cliente deposito pero no opera o abandona tras pocas operaciones. Tasa tipica: 50-65%.

**Acciones:**

| Accion | Canal | Timing | Responsable |
|--------|-------|--------|-------------|
| Guia de inicio rapido en MT5 (video + PDF) | Email | Post-deposito inmediato | Automation |
| Asignar a Copy Trading con un proveedor de senales sugerido | In-app + Email | +24 horas | Sales |
| Webinar semanal "Sesion de trading en vivo" | WhatsApp + Email | Recurrente | Marketing |
| Notificacion de oportunidades de mercado (analisis diario) | Telegram/WhatsApp | Diario | Analistas |
| Check-in personal: "Como va tu primera semana operando?" | WhatsApp | +7 dias post-FTD | Sales |

**Tacticas especificas NEOMAAA:**
- Copy Trading como herramienta clave para novatos que no saben operar manualmente
- VPS gratuito para cuentas Raw+ como incentivo de actividad
- Contenido educativo en espanol adaptado a LATAM

### 2.4 Trading Activo → Leal/VIP

**Problema:** El cliente opera pero puede migrar a otro broker. Tasa de churn mensual tipica: 8-15%.

**Acciones:**

| Accion | Canal | Timing | Responsable |
|--------|-------|--------|-------------|
| Programa VIP con beneficios tangibles (ver seccion 4) | Email + CRM | Automatico al cumplir criterios | Operations |
| Account manager dedicado para cuentas >$5,000 | Directo | Al alcanzar umbral | Sales |
| Acceso anticipado a nuevos instrumentos o features | Email exclusivo | Cuando aplique | Product |
| Invitaciones a eventos (webinars VIP, sesiones con analistas) | Email + WhatsApp | Mensual | Marketing |
| Encuesta de satisfaccion trimestral | Email | Cada 90 dias | Support |
| Programa de referidos con comisiones atractivas | Landing dedicada | Continuo | Marketing |

---

## 3. Indicadores de Riesgo de Churn y Acciones

### 3.1 Sistema de Alertas Tempranas

| Indicador | Nivel de Riesgo | Accion Automatica | Accion Manual |
|-----------|----------------|-------------------|---------------|
| Sin login por 7 dias | BAJO | Email: "El mercado se mueve — estas oportunidades te esperan" | Ninguna |
| Sin login por 14 dias | MEDIO | Email + WhatsApp: "Te extrannamos — mira lo que paso esta semana en los mercados" | Sales revisa cuenta, prepara oferta |
| Sin login por 30 dias | ALTO | Campana de reactivacion completa (ver seccion 6) | Llamada del account manager |
| Sin operaciones por 14 dias (pero con login) | MEDIO | Push: "Tienes fondos disponibles — el EUR/USD esta en un nivel clave" | Sugerir Copy Trading |
| Retiro de >50% del balance | ALTO | Email de satisfaccion + encuesta | Llamada inmediata del manager |
| 5+ operaciones perdedoras consecutivas | MEDIO | Email educativo: "Gestion de riesgo — protege tu capital" | Sugerir cuenta demo o Cent |
| Ticket de soporte sin resolver >24h | ALTO | Escalacion automatica en Intercom | Supervisor contacta al cliente |

### 3.2 Scoring de Riesgo

Asignar puntuacion de 0-100 a cada cliente basado en:
- Frecuencia de login (peso: 20%)
- Frecuencia de operaciones (peso: 25%)
- Tendencia de balance (creciente vs decreciente) (peso: 20%)
- Frecuencia de depositos (peso: 20%)
- Interaccion con comunicaciones (aperturas de email, clics) (peso: 15%)

**Umbrales:**
- 70-100: Cliente saludable, mantener engagement
- 40-69: Riesgo moderado, activar tacticas de retencion
- 0-39: Riesgo critico, intervencion inmediata

---

## 4. Programa VIP — NEOMAAA Markets Elite

### 4.1 Estructura de Tiers

| Tier | Criterio de Entrada | Beneficios |
|------|---------------------|------------|
| **Silver** | Deposito acumulado $500+ O volumen mensual 5+ lotes | Spreads reducidos -10%, soporte prioritario, analisis semanal exclusivo |
| **Gold** | Deposito acumulado $2,500+ O volumen mensual 25+ lotes | Spreads reducidos -20%, account manager dedicado, VPS gratuito, Vault Yield +0.5% adicional |
| **Platinum** | Deposito acumulado $10,000+ O volumen mensual 100+ lotes | Spreads reducidos -30%, comisiones rebajadas en Raw, retiros prioritarios (mismo dia), acceso a mesa de operaciones, Vault Yield +1% adicional |
| **Black** | Deposito acumulado $50,000+ O volumen mensual 500+ lotes | Cuenta Institucional con condiciones personalizadas, apalancamiento custom, linea directa con dealing desk, eventos exclusivos, Vault Yield maximo |

### 4.2 Mecanica de Retencion del Programa

- Los tiers se revisan mensualmente
- Downgrade se aplica tras 2 meses consecutivos sin cumplir criterios (gracia de 1 mes)
- Comunicar beneficios perdidos antes del downgrade: "Estas a X lotes de mantener tu status Gold"
- Gamificacion: barra de progreso visible en el area de cliente
- Aniversario de cuenta: bonus especial al cumplir 6 y 12 meses

---

## 5. Vault Yield como Herramienta de Retencion

### 5.1 Posicionamiento Estrategico

El Vault Yield System (hasta 5% p.a.) es un diferenciador unico. Posicionar como:

**Mensaje principal:** "Tu capital trabaja por ti incluso cuando no operas"

**Aplicaciones de retencion:**

| Situacion | Como usar Vault Yield |
|-----------|----------------------|
| Cliente inactivo pero con balance | "Tu dinero esta generando rendimiento en el Vault — mira cuanto has acumulado" |
| Cliente considerando retiro | "Recuerda que tu balance genera hasta 5% anual en el Vault — retirar significa perder ese rendimiento" |
| Conversion KYC → FTD | "Deposita y empieza a generar rendimiento desde el dia 1, operes o no" |
| Diferenciacion vs competencia | "Ningun otro broker te paga por mantener tu capital — en NEOMAAA tu dinero nunca esta quieto" |
| Upgrade de tier VIP | "Como Gold, tu Vault Yield sube a 5.5% — deposita $1,500 mas para calificar" |

### 5.2 Reglas del Vault para Retencion

- Rendimiento se calcula diariamente, se paga mensualmente (genera expectativa)
- Mostrar rendimiento acumulado en dashboard del cliente de forma prominente
- Enviar notificacion mensual: "Este mes ganaste $X.XX en tu Vault"
- No permitir retiro parcial del Vault sin aviso de perdida de rendimiento acumulado del mes

---

## 6. Campanas de Reactivacion

### 6.1 Clientes Dormidos (30+ dias sin actividad)

**Secuencia de 4 toques en 14 dias:**

| Dia | Canal | Mensaje | CTA |
|-----|-------|---------|-----|
| 1 | Email | "Ha pasado un tiempo — el mercado no espera. Mira las oportunidades que te perdiste este mes" | Login |
| 3 | WhatsApp | "Hola [Nombre], soy [Manager] de NEOMAAA Markets. Queria saber si todo esta bien con tu cuenta" | Responder |
| 7 | Email | "Oferta exclusiva: opera esta semana y recibe [beneficio: analisis premium, spread reducido temporal, etc.]" | Depositar |
| 14 | SMS | "Ultimo aviso: tu beneficio exclusivo en NEOMAAA Markets vence manana" | Depositar |

### 6.2 Depositos Fallidos

| Timing | Canal | Mensaje |
|--------|-------|---------|
| Inmediato | In-app + Email | "Tu deposito no pudo procesarse — prueba con otro metodo. Aqui tienes [alternativas por pais]" |
| +2 horas | WhatsApp | "Necesitas ayuda con tu deposito? Nuestro equipo puede guiarte paso a paso" |
| +24 horas | Email | "Tenemos 120+ metodos de deposito — seguro hay uno que funciona para ti: [lista por pais]" |

### 6.3 KYC Incompleto

| Timing | Canal | Mensaje |
|--------|-------|---------|
| +6h | Email | "Tu verificacion esta casi lista — solo falta [documento especifico]" |
| +24h | WhatsApp | "Puedo ayudarte a completar tu verificacion ahora mismo? Solo toma 3 minutos" |
| +72h | Email | "Miles de traders en [pais] ya operan en NEOMAAA Markets — completa tu KYC y unete" |
| +7d | SMS | "Tu cuenta en NEOMAAA Markets te espera. Completa la verificacion en 3 minutos: [link]" |

---

## 7. Metricas de Retencion — KPIs

### 7.1 Metricas Primarias

| Metrica | Formula | Benchmark Industria | Objetivo NEOMAAA |
|---------|---------|--------------------|--------------------|
| Tasa de conversion Registro → KYC | KYC completados / Registros | 40-60% | 55% |
| Tasa de conversion KYC → FTD | FTDs / KYC completados | 20-35% | 30% |
| Tasa de FTD → Activo (mes 1) | Clientes con 5+ ops / FTDs | 50-65% | 60% |
| Churn rate mensual | Clientes inactivos 30d / Activos inicio mes | 8-15% | <10% |
| Retention rate 90 dias | Activos a 90d / FTDs de hace 90d | 25-35% | 30% |
| LTV promedio | Revenue total / Total clientes | $300-800 (offshore) | $500+ |
| Deposito promedio | Total depositos / Numero depositos | Varia por mercado | $200+ |
| Frecuencia de deposito | Depositos / Cliente activo / Mes | 1.5-2.5 | 2.0+ |
| Net Deposit (depositos - retiros) | Depositos - Retiros | Positivo | Positivo creciente |
| Revenue per Active Client (RPAC) | Revenue mensual / Clientes activos | $50-150 | $80+ |

### 7.2 Metricas Secundarias

- Tiempo promedio de KYC (objetivo: <2 horas)
- Tiempo promedio Registro → FTD (objetivo: <48 horas)
- Tasa de reactivacion de dormidos (objetivo: 15%+)
- NPS trimestral (objetivo: 40+)
- Tickets de soporte por cliente/mes (objetivo: <0.5)
- Copy Trading adoption rate (objetivo: 25% de novatos)

---

## 8. Calendario Mensual de Retencion

### Semana 1 (Dias 1-7)

| Dia | Actividad | Audiencia | Canal |
|-----|-----------|-----------|-------|
| Lunes | Email con resumen semanal de mercados + oportunidades | Todos los activos | Email |
| Martes | Push de Copy Trading: "Top traders de la semana" | FTD sin actividad de trading | In-app + Email |
| Miercoles | Webinar educativo | Todos | WhatsApp + Email |
| Jueves | Notificacion Vault Yield: rendimiento acumulado | Clientes con balance >$100 | Email |
| Viernes | "Resumen de tu semana en NEOMAAA Markets" | Activos con operaciones | Email |

### Semana 2 (Dias 8-14)

| Dia | Actividad | Audiencia | Canal |
|-----|-----------|-----------|-------|
| Lunes | Alerta de mercado: evento economico importante | Todos los activos | Push + Telegram |
| Martes | Campana de reactivacion (dormidos 14d) | Dormidos | WhatsApp + Email |
| Miercoles | Contenido educativo: "Estrategia de la semana" | Activos + FTD recientes | Email + Blog |
| Jueves | Progreso VIP: "Estas a X de subir de tier" | Silver y Gold | Email |
| Viernes | Oferta de fin de semana: "Deposita y recibe [beneficio]" | KYC sin FTD + Activos bajo volumen | Email + SMS |

### Semana 3 (Dias 15-21)

| Dia | Actividad | Audiencia | Canal |
|-----|-----------|-----------|-------|
| Lunes | Analisis de medio mes + perspectivas | Activos + VIP | Email |
| Martes | Copy Trading spotlight: nuevo proveedor de senales | Todos | Email + In-app |
| Miercoles | Encuesta rapida de satisfaccion (NPS) | Muestra aleatoria 10% | Email |
| Jueves | Campana de referidos: recordatorio de beneficios | VIP | WhatsApp |
| Viernes | "Tu rendimiento este mes vs el mercado" | Activos con 10+ operaciones | Email personalizado |

### Semana 4 (Dias 22-30)

| Dia | Actividad | Audiencia | Canal |
|-----|-----------|-----------|-------|
| Lunes | Anticipacion: "Eventos clave de la proxima semana" | Todos | Email + Telegram |
| Martes | Reactivacion agresiva (dormidos 30d) con oferta | Dormidos 30d+ | Telefono + Email + WhatsApp |
| Miercoles | Webinar VIP con analista senior | Gold+ | Invitacion exclusiva |
| Jueves | Pago de Vault Yield mensual + notificacion | Todos con Vault | Email + In-app |
| Viernes | Resumen mensual: "Tu mes en NEOMAAA Markets" | Todos los activos | Email personalizado |

---

## 9. Copy Trading como Herramienta de Engagement

### 9.1 Estrategia

El Copy Trading resuelve el problema #1 de retencion: **clientes que no saben operar y abandonan**.

**Flujo recomendado:**
1. Cliente hace FTD pero no opera en 48h → sugerir Copy Trading
2. Mostrar ranking de proveedores de senales con metricas transparentes
3. Permitir copiar con montos minimos ($10-$50)
4. Enviar reportes semanales de rendimiento del copy trading

### 9.2 Metricas de Copy Trading para Retencion

| Metrica | Objetivo |
|---------|----------|
| Adoption rate (% de FTDs que activan copy) | 25% |
| Retention 90d de usuarios copy vs manual | Copy: 40% vs Manual: 25% |
| Deposito adicional rate de usuarios copy | 35% hacen 2do deposito en 30 dias |
| Revenue por usuario copy vs manual | Copy: +20% mayor |

### 9.3 Acciones

- Destacar Copy Trading en onboarding como opcion principal para principiantes
- Crear contenido: "Como elegir al mejor trader para copiar"
- Notificaciones cuando un trader copiado tiene racha positiva
- Gamificar: "Top 10 copiadores del mes" con recompensas

---

## 10. Presupuesto de Retencion — Asignacion Sugerida

### 10.1 Distribucion del Budget de Retencion (% del budget total de marketing)

**Regla general:** Asignar 30-40% del budget de marketing a retencion. El costo de retener es 5-7x menor que el de adquirir.

| Categoria | % del Budget Retencion | Actividades |
|-----------|----------------------|-------------|
| Comunicacion automatizada | 15% | Intercom, email marketing, SMS, WhatsApp Business API |
| Programa VIP / Beneficios | 25% | Spreads reducidos, VPS, bonificaciones Vault |
| Contenido y educacion | 20% | Webinars, videos, analisis, blog |
| Campanas de reactivacion | 15% | Ofertas especiales, incentivos de re-deposito |
| Soporte premium | 15% | Account managers, soporte 24/5 |
| Herramientas y analytics | 10% | Dashboards, scoring, integraciones CRM |

### 10.2 ROI Esperado

| Metrica | Sin estrategia | Con estrategia | Impacto |
|---------|---------------|----------------|---------|
| Churn mensual | 15% | 10% | -33% churn |
| LTV promedio | $350 | $550 | +57% |
| 2do deposito rate | 25% | 40% | +60% |
| Referidos por cliente VIP/ano | 0.5 | 2.0 | +300% |

---

## 11. Stack Tecnologico para Retencion

| Herramienta | Funcion | Ya disponible |
|-------------|---------|---------------|
| Skale CRM | Segmentacion, lifecycle tracking, reportes | Si |
| Intercom | Chat en vivo, email automation, secuencias | Si |
| Sumsub | KYC tracking, tasa de aprobacion | Si |
| MT5 Manager API | Datos de trading, volumen, P&L por cliente | Si |
| WhatsApp Business API | Comunicacion directa, campanas | Implementar |
| Metabase/Looker | Dashboards de retencion, alertas automaticas | Implementar |
| Customer.io o similar | Secuencias avanzadas basadas en comportamiento | Evaluar |

---

## 12. Checklist de Implementacion — Primeros 90 Dias

### Mes 1: Fundamentos
- [ ] Configurar secuencias automaticas en Intercom (bienvenida, KYC, FTD)
- [ ] Crear templates de WhatsApp para cada etapa del lifecycle
- [ ] Definir alertas de churn en Skale CRM
- [ ] Lanzar programa VIP Silver/Gold (Platinum y Black en mes 2)
- [ ] Configurar reportes semanales de metricas de retencion

### Mes 2: Optimizacion
- [ ] Activar campanas de reactivacion para dormidos
- [ ] Implementar scoring de riesgo de churn
- [ ] Lanzar programa VIP completo (4 tiers)
- [ ] Crear contenido educativo semanal (webinars, analisis)
- [ ] Optimizar Copy Trading como herramienta de onboarding

### Mes 3: Escala
- [ ] Implementar WhatsApp Business API para automatizacion
- [ ] Dashboard de retencion en tiempo real
- [ ] A/B testing de mensajes y ofertas de reactivacion
- [ ] Programa de referidos activo con tracking
- [ ] Revision completa de metricas y ajuste de estrategia
