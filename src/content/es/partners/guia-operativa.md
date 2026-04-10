# Guia Operativa -- Onboarding y Gestion de Partners

> **DOCUMENTO INTERNO -- EQUIPO DE OPERACIONES Y PRINCIPALS**
> Ultima actualizacion: Abril 2026

---

## Flujo de Onboarding de Partners

### Etapas del Proceso

```
Aplicacion → Revision → Aprobacion → Setup Cellxpert → Bienvenida → Primer Payout
```

### Etapa 1: Aplicacion

El candidato a partner completa el formulario de aplicacion que incluye:

- Datos personales y de empresa
- Tipo de programa deseado (Affiliate, Digital, IB)
- Experiencia previa como afiliado/IB
- Canales de marketing que utiliza
- Estimacion de volumen mensual de clientes
- Paises objetivo
- Referencias (opcional pero valorado)

**Responsable:** Formulario automatizado en el sitio web de partners.

### Etapa 2: Revision

| Criterio | Que Se Revisa | Tiempo Maximo |
|---|---|---|
| Identidad | Documento de identidad valido, verificacion basica | 24 horas |
| Experiencia | Historial como afiliado/IB, evidencia de trafico o clientes | 24 horas |
| Canales | Sitio web, redes sociales, canal de YouTube, lista de email | 24 horas |
| Compliance | No aparece en listas de sanciones, no tiene historial de fraude | 48 horas |
| Volumen estimado | Realismo de las proyecciones vs perfil del candidato | 24 horas |

**Responsable:** Edward y equipo de operaciones.

### Etapa 3: Aprobacion

| Tipo de Partner | Quien Aprueba | SLA |
|---|---|---|
| Affiliate Partner (cualquier tier) | Edward / equipo | 48 horas desde aplicacion completa |
| Digital Affiliate (cualquier tier) | Edward / equipo | 48 horas desde aplicacion completa |
| IB Bronze / Silver | Edward / equipo | 48 horas desde aplicacion completa |
| IB Gold | Principals | 72 horas desde aplicacion completa |
| IB Platinum | Principals | 72 horas desde aplicacion completa |
| Cualquier partner con mas de 200 clientes existentes | Principals | 72 horas |

**Regla:** Toda aprobacion IB Gold+ requiere videollamada previa con al menos un Principal.

### Etapa 4: Setup en Cellxpert

Una vez aprobado, el equipo configura la cuenta del partner en Cellxpert:

1. **Crear cuenta de partner** en Cellxpert con los datos verificados
2. **Asignar tipo de programa** (Affiliate, Digital, IB)
3. **Configurar tier inicial** y reglas de comision correspondientes
4. **Generar links de tracking** unicos para el partner
5. **Configurar sub-afiliados/sub-IBs** si aplica (habilitar niveles segun programa)
6. **Activar pixel/postback** para Digital Affiliates que usan media buying
7. **Verificar integracion** con MT5 para que la actividad de trading se reporte correctamente
8. **Enviar credenciales** al partner con guia de acceso al dashboard

**Responsable:** Equipo de operaciones.
**Tiempo maximo:** 24 horas despues de la aprobacion.

### Etapa 5: Bienvenida

- Enviar email de bienvenida (ver plantilla abajo)
- Agendar llamada de onboarding de 30 minutos
- Compartir materiales de marketing aprobados
- Explicar reglas de compliance
- Asignar punto de contacto interno

### Etapa 6: Primer Payout

- El primer pago se realiza segun el calendario del programa (mensual, semanal o diario)
- Se hace una verificacion manual del primer pago para asegurar que los montos sean correctos
- Se confirma con el partner que recibio el pago
- A partir del segundo pago, el proceso es automatizado via Cellxpert

---

## Workflow de Cellxpert

### Tareas Diarias

| Tarea | Responsable | Frecuencia |
|---|---|---|
| Revisar nuevas aplicaciones en la plataforma | Equipo de operaciones | Diario |
| Verificar que los FTDs se estan trackeando correctamente | Equipo de operaciones | Diario |
| Revisar alertas de fraude automaticas | Equipo de operaciones | Diario |
| Responder preguntas de partners sobre su dashboard | Equipo de operaciones | Diario |

### Tareas Semanales

| Tarea | Responsable | Frecuencia |
|---|---|---|
| Generar reporte de comisiones pendientes | Equipo de operaciones | Lunes |
| Procesar pagos semanales (Silver+, IB) | Finanzas | Martes |
| Revisar metricas de conversion por partner | Equipo de operaciones | Miercoles |
| Verificar que los sub-afiliados estan correctamente atribuidos | Equipo de operaciones | Viernes |

### Tareas Mensuales

| Tarea | Responsable | Frecuencia |
|---|---|---|
| Procesar pagos mensuales (Affiliate Partner tier) | Finanzas | Dia 5 del mes |
| Revision de tiers (upgrades/downgrades) | Equipo de operaciones + Principals | Dia 10 del mes |
| Generar reportes mensuales para partners | Cellxpert automatizado | Dia 1 del mes |
| Calcular Monthly Achievement Milestones (IB) | Finanzas | Dia 5 del mes |
| Evaluar elegibilidad 12-Month Super-Bonus | Principals | Trimestral |

### Configuracion de Reglas de Comision en Cellxpert

Para cada partner nuevo:

1. Seleccionar el plan de comision correspondiente al programa y tier
2. Configurar la estructura de revenue share o rebate por lote
3. Si es Digital Affiliate, configurar el Mini-CPA por GEO con las condiciones de calificacion (FTD minimo + volumen)
4. Si tiene sub-afiliados, configurar los niveles de override
5. Si es IB con auto-rebate, configurar el porcentaje maximo permitido
6. Documentar cualquier condicion especial acordada durante la negociacion

### Reportes Disponibles en Cellxpert

| Reporte | Uso | Frecuencia Recomendada |
|---|---|---|
| Partner Performance | Vision general de cada partner | Semanal |
| FTD Report | Nuevos clientes y depositos por partner | Diario |
| Commission Report | Comisiones generadas y pagadas | Semanal |
| Sub-Affiliate Report | Actividad de sub-redes | Mensual |
| Fraud Detection | Alertas de actividad sospechosa | Diario |
| GEO Report | Rendimiento por pais | Mensual |

---

## Revision Mensual de Partners

### Metricas a Evaluar

| Metrica | Que Indica | Umbral de Alerta |
|---|---|---|
| FTDs generados en el mes | Productividad del partner | Menos de 1 FTD en 60 dias |
| Tasa de conversion (clics a FTD) | Calidad del trafico | Menor a 2% |
| Deposito promedio de clientes referidos | Calidad de los clientes | Menor a $150 |
| Retencion de clientes referidos | Calidad y sostenibilidad | Menor a 3 meses promedio |
| Lotes por cliente por mes | Actividad de trading | Menor a 3 lotes |
| Ratio de chargebacks/disputas | Riesgo de fraude | Mayor a 5% |
| Compliance de materiales de marketing | Cumplimiento regulatorio | Cualquier infraccion |

### Criterios de Upgrade de Tier

El upgrade se revisa mensualmente y requiere:

1. Cumplimiento de los requisitos numericos del tier superior (clientes, depositos, FTDs)
2. Mantenimiento de los requisitos durante al menos 2 meses consecutivos
3. Cero infracciones de compliance en los ultimos 3 meses
4. Aprobacion del equipo (y de Principals para tiers Gold+)

### Criterios de Downgrade de Tier

El downgrade se activa cuando:

1. El partner no cumple los requisitos minimos de su tier actual durante 3 meses consecutivos
2. Se detecta una infraccion de compliance grave
3. El ratio de chargebacks supera el 10%

**Proceso:** Se notifica al partner con 30 dias de anticipacion. Se ofrece un plan de accion para recuperar el tier. Si al final de los 30 dias no hay mejora, se ejecuta el downgrade.

---

## Deteccion de Fraude

### Red Flags

| Senal | Nivel de Riesgo | Descripcion |
|---|---|---|
| FTDs masivos desde la misma IP | Alto | Multiples cuentas nuevas desde una sola ubicacion |
| Depositos minimos inmediatos sin trading | Alto | Clientes que depositan exactamente el minimo y no operan |
| Patron de auto-referencia | Alto | El partner se refiere a si mismo o a familiares |
| Trafico de bots | Alto | Clics masivos sin conversiones, patrones no humanos |
| Chargebacks recurrentes | Alto | Clientes disputan los depositos despues de que el CPA se paga |
| Clientes que retiran todo en menos de 7 dias | Medio | Posible churning para generar FTDs |
| Contenido de marketing enganoso | Medio | Promesas de ganancias garantizadas, informacion falsa |
| FTDs concentrados al final del mes | Bajo-Medio | Posible manipulacion para alcanzar tier |

### Protocolo de Investigacion

1. **Deteccion automatica (Cellxpert):** La plataforma genera alertas automaticas basadas en patrones predefinidos.
2. **Revision inicial (Equipo de operaciones):** Se revisa la alerta dentro de 24 horas.
3. **Escalacion (si se confirma sospecha):** Se escala a Edward para revision detallada.
4. **Suspension preventiva:** Se suspenden los pagos del partner mientras se investiga (maximo 15 dias habiles).
5. **Decision final:**
   - Si es fraude confirmado: terminacion inmediata del acuerdo, retencion de comisiones pendientes, reporte al equipo legal.
   - Si es falsa alarma: reactivacion inmediata con disculpa formal y pago de comisiones retenidas.
   - Si es zona gris: advertencia formal, monitoreo intensificado por 90 dias.

**Quien maneja:** Edward es el punto principal. Casos graves se escalan a Principals.

---

## Requisitos de Compliance para Partners

### Lo que los Partners PUEDEN Hacer

- Promocionar NEOMAAA usando los materiales de marketing aprobados
- Compartir informacion factual sobre spreads, instrumentos disponibles y plataformas
- Ofrecer contenido educativo sobre trading (sin promesas de ganancias)
- Usar sus links de tracking en sus canales propios
- Mencionar la licencia regulatoria de NEOMAAA (Anjouan)
- Compartir testimonios reales verificados

### Lo que los Partners NO PUEDEN Hacer

- Prometer ganancias especificas o retornos garantizados
- Hacer declaraciones falsas sobre la regulacion de NEOMAAA
- Usar el logo de NEOMAAA sin aprobacion previa
- Enviar spam o comunicaciones no solicitadas masivas
- Comprar trafico de fuentes prohibidas (incentivized traffic, cookie stuffing)
- Crear sitios web que imiten o puedan confundirse con el sitio oficial de NEOMAAA
- Ofrecer bonos, cashback o incentivos que NEOMAAA no haya autorizado
- Usar tacticas de presion para que los clientes depositen
- Manejar fondos de clientes o actuar como intermediario de pagos

### Materiales de Marketing Aprobados

Todo material debe ser aprobado antes de publicarse:

- Banners y creativos: proporcionados por NEOMAAA, personalizacion con aprobacion previa
- Copy para redes sociales: templates proporcionados, modificaciones con aprobacion
- Videos: script debe ser revisado antes de publicacion
- Landing pages: deben incluir disclaimers regulatorios obligatorios

---

## Cadencia de Comunicacion

### Con Partners Activos

| Tipo de Comunicacion | Frecuencia | Canal | Responsable |
|---|---|---|---|
| Check-in operativo | Semanal | WhatsApp/Telegram | Equipo de operaciones |
| Reporte de rendimiento | Mensual | Email + Cellxpert | Automatizado + equipo |
| Llamada de revision | Mensual | Videollamada | Edward (Silver+), equipo (resto) |
| Actualizaciones de producto | Cuando haya cambios | Email | Marketing |
| Nuevos materiales de marketing | Cuando esten disponibles | Email + portal | Marketing |

### Con Partners Inactivos (0 FTDs en 30+ dias)

| Accion | Timing | Canal |
|---|---|---|
| Primer recordatorio | Dia 30 sin actividad | Email |
| Llamada de reactivacion | Dia 45 sin actividad | Llamada/videollamada |
| Oferta de soporte adicional | Dia 60 sin actividad | Email personalizado |
| Aviso de suspension | Dia 90 sin actividad | Email formal |
| Suspension de cuenta | Dia 120 sin actividad | Email + desactivacion en Cellxpert |

### Reportes Mensuales para Partners

El reporte mensual incluye:

- FTDs generados en el periodo
- Clientes activos totales
- Volumen de trading de su red
- Comisiones generadas (desglosadas por tipo)
- Progreso hacia el siguiente tier
- Rendimiento de sub-afiliados (si aplica)

---

## Matriz de Escalacion

### Quejas de Partners

| Tipo de Queja | Primera Linea | Escalacion | Tiempo de Respuesta |
|---|---|---|---|
| Pregunta sobre comisiones | Equipo de operaciones | Edward | 24 horas |
| Discrepancia en tracking | Equipo de operaciones | Edward | 48 horas |
| Solicitud de upgrade de tier | Edward | Principals (Gold+) | 5 dias habiles |
| Queja sobre pagos retrasados | Finanzas | Edward | 24 horas |
| Disputa de payout (monto incorrecto) | Finanzas | Edward → Principals | 48 horas |
| Solicitud de condiciones especiales | Edward | Principals | 5 dias habiles |
| Queja sobre otro partner (territorio) | Edward | Principals | 72 horas |

### Disputas de Payout

1. El partner reporta la discrepancia
2. Finanzas revisa el calculo en Cellxpert dentro de 24 horas
3. Si el error es de NEOMAAA: correccion inmediata + pago de la diferencia en el siguiente ciclo
4. Si el calculo es correcto: se proporciona desglose detallado al partner
5. Si el partner no acepta la explicacion: escalacion a Edward
6. Si persiste la disputa: revision por Principals con decision final en 5 dias habiles

### Violaciones de Compliance

| Severidad | Ejemplo | Accion | Quien Decide |
|---|---|---|---|
| Leve | Uso de logo sin aprobacion previa | Advertencia por escrito, solicitud de correccion | Equipo de operaciones |
| Media | Contenido con promesas de ganancias exageradas | Advertencia formal, 48 horas para remover contenido | Edward |
| Grave | Manejo de fondos de clientes, fraude confirmado | Suspension inmediata, investigacion formal | Principals |
| Critica | Actividad ilegal, dano reputacional | Terminacion inmediata del contrato | Principals |

---

## Plantillas de Comunicacion

### Plantilla 1: Email de Bienvenida

```
Asunto: Bienvenido al programa de partners de NEOMAAA Markets

Estimado/a [Nombre],

Nos complace confirmar tu aprobacion como [Tipo de Programa] de NEOMAAA Markets
en el tier [Tier Inicial].

Tus credenciales de acceso al portal de partners (Cellxpert):
- URL: [link al portal]
- Usuario: [email]
- Contrasena temporal: [se enviara por separado]

Tu estructura de comisiones:
- [Detalles segun programa y tier]

Proximos pasos:
1. Accede al portal y familiarizate con el dashboard
2. Descarga los materiales de marketing aprobados
3. Agenda tu llamada de onboarding con tu contacto asignado: [Nombre del contacto]

Tu link de tracking unico: [link]

Recuerda revisar las guias de compliance adjuntas antes de comenzar a promocionar.

Cualquier duda, contactanos en [email de soporte partners].

Saludos,
Equipo de Partners
NEOMAAA Markets
```

### Plantilla 2: Notificacion de Upgrade de Tier

```
Asunto: Felicitaciones - Has alcanzado el tier [Nuevo Tier] en NEOMAAA Markets

Estimado/a [Nombre],

Nos complace informarte que has sido promovido al tier [Nuevo Tier] dentro del
programa [Nombre del Programa] de NEOMAAA Markets.

Cambios efectivos a partir de [Fecha]:
- Revenue Share anterior: [X%] → Nuevo: [Y%]
- [Otros beneficios desbloqueados]
- [Frecuencia de pago actualizada si aplica]

Tu rendimiento en los ultimos [X] meses:
- FTDs generados: [numero]
- Clientes activos: [numero]
- Volumen total: [numero]

Siguiente objetivo: [Requisitos del proximo tier]

Sigue asi. Estamos aqui para apoyarte en tu crecimiento.

Saludos,
Equipo de Partners
NEOMAAA Markets
```

### Plantilla 3: Advertencia de Compliance

```
Asunto: Aviso importante - Revision de compliance requerida

Estimado/a [Nombre],

Durante nuestra revision periodica, hemos identificado el siguiente tema que
requiere tu atencion inmediata:

Problema detectado:
[Descripcion detallada del problema]

Ubicacion/canal:
[Donde se detecto - URL, red social, etc.]

Accion requerida:
[Que debe hacer el partner para corregir]

Plazo:
[Numero] horas/dias habiles a partir de la recepcion de este email.

De acuerdo con los terminos del programa de partners, el incumplimiento de las
guias de compliance puede resultar en [consecuencia segun severidad].

Si crees que esto es un error o necesitas aclaracion, contacta a [nombre] a
la brevedad.

Saludos,
Equipo de Compliance
NEOMAAA Markets
```

### Plantilla 4: Reactivacion de Partner Inactivo

```
Asunto: Te extraniamos - Actualicemos tu cuenta de partner

Estimado/a [Nombre],

Hemos notado que no has generado actividad en los ultimos [X] dias en tu
cuenta de partner de NEOMAAA Markets.

Queremos asegurarnos de que tengas todo lo necesario para tener exito:

- Hay nuevos materiales de marketing disponibles en tu portal
- [Mencion de cualquier actualizacion reciente del producto]
- [Oferta de soporte personalizado si aplica]

Nos gustaria agendar una llamada rapida de 15 minutos para entender como
podemos ayudarte. Puedes agendar aqui: [link de calendario]

Si tus planes han cambiado y prefieres pausar tu participacion, tambien
lo entendemos. Solo haznos saber.

Saludos,
[Nombre del contacto asignado]
Equipo de Partners
NEOMAAA Markets
```

### Plantilla 5: Aviso de Suspension por Inactividad

```
Asunto: Aviso de suspension de cuenta de partner - NEOMAAA Markets

Estimado/a [Nombre],

Despues de [X] dias sin actividad en tu cuenta de partner y varios intentos
de contacto, lamentamos informarte que procederemos a suspender tu cuenta
el [fecha].

Esto significa:
- Tus links de tracking seran desactivados
- No se generaran nuevas comisiones
- Los clientes existentes referidos por ti seguiran siendo atribuidos a tu cuenta

Si deseas reactivar tu cuenta en el futuro, solo contactanos en
[email de soporte partners] y procesaremos tu solicitud en 48 horas.

Saludos,
Equipo de Partners
NEOMAAA Markets
```

---

## Checklist de Onboarding Completo

Para verificar que cada nuevo partner esta correctamente configurado:

- [ ] Aplicacion recibida y datos verificados
- [ ] Revision de compliance completada (sin red flags)
- [ ] Aprobacion obtenida del nivel correspondiente
- [ ] Cuenta creada en Cellxpert
- [ ] Programa y tier correctamente asignados
- [ ] Reglas de comision configuradas
- [ ] Links de tracking generados y verificados
- [ ] Pixel/postback configurado (si es Digital Affiliate)
- [ ] Sub-afiliados habilitados (si aplica)
- [ ] Email de bienvenida enviado
- [ ] Credenciales de acceso enviadas
- [ ] Llamada de onboarding agendada
- [ ] Materiales de marketing compartidos
- [ ] Guias de compliance entregadas
- [ ] Punto de contacto interno asignado
- [ ] Primer check-in programado (7 dias despues del onboarding)
