# Protocolo de Atencion VIP — NEOMAAA Markets

**Documento interno — Equipo de Soporte, Ventas y Account Management**
**Version:** 1.0
**Ultima actualizacion:** Abril 2026
**Aplica a:** Rocio, Marilyn (soporte/account management), Edward (sales lead)

---

## INDICE

1. [Definicion de Cliente VIP](#1-definicion-de-cliente-vip)
2. [Niveles de Servicio VIP](#2-niveles-de-servicio-vip)
3. [SLAs Diferenciados](#3-slas-diferenciados)
4. [Account Management Dedicado](#4-account-management-dedicado)
5. [Contacto Proactivo](#5-contacto-proactivo)
6. [Proceso de Onboarding VIP](#6-proceso-de-onboarding-vip)
7. [Manejo de Quejas VIP](#7-manejo-de-quejas-vip)
8. [Retencion de Clientes VIP](#8-retencion-de-clientes-vip)
9. [Herramientas y Configuracion](#9-herramientas-y-configuracion)
10. [Metricas VIP](#10-metricas-vip)

---

## 1. Definicion de Cliente VIP

### 1.1 Criterios de Clasificacion

Un cliente se clasifica como VIP cuando cumple al menos uno de los siguientes criterios:

| Criterio | Umbral | Verificacion |
|----------|--------|-------------|
| **Deposito acumulado** | $5,000 USD o mas | Skale CRM (total_deposits) |
| **Tipo de cuenta** | Institucional ($50,000+ deposito) | Skale CRM (account_type) |
| **Volumen mensual de trading** | 50+ lotes estandar/mes | MT5 Admin |
| **Referidos activos** | 5+ clientes referidos que depositaron | Programa IB en Skale |
| **Potencial estrategico** | Cliente con potencial demostrable de alto valor | Evaluacion de Edward/Principals |

### 1.2 Niveles VIP

| Nivel | Nombre | Criterio | Beneficios |
|-------|--------|----------|-----------|
| **VIP Silver** | $5,000 - $14,999 deposito acumulado | SLA mejorado, contacto preferente | Seccion 2 |
| **VIP Gold** | $15,000 - $49,999 deposito acumulado | Silver + account manager dedicado, condiciones mejoradas | Seccion 2 |
| **VIP Platinum** | $50,000+ deposito acumulado (Institucional) | Gold + condiciones personalizadas, linea directa | Seccion 2 |

### 1.3 Proceso de Activacion VIP

1. Skale CRM detecta que el cliente cruzo el umbral de deposito
2. Se agrega tag `vip` y nivel correspondiente en Intercom
3. Se notifica a Edward y al agente de soporte asignado
4. Se asigna account manager (Rocio o Marilyn)
5. Account manager realiza primer contacto VIP dentro de 24 horas
6. Se actualiza configuracion en Intercom (prioridad alta automatica)

---

## 2. Niveles de Servicio VIP

### 2.1 VIP Silver ($5K - $15K)

| Servicio | Detalle |
|----------|---------|
| **SLA de respuesta** | Primera respuesta en 10 minutos (chat), 1 hora (email) |
| **Prioridad en cola** | Tickets se posicionan al frente de la cola automaticamente |
| **Notificacion proactiva** | Aviso de mantenimiento y cambios 24h antes |
| **Seguimiento de retiros** | Confirmacion proactiva del estado cada 12 horas |
| **Contacto mensual** | 1 llamada/mensaje mensual del equipo para verificar satisfaccion |

### 2.2 VIP Gold ($15K - $50K)

| Servicio | Detalle |
|----------|---------|
| Todo Silver + | — |
| **Account manager dedicado** | Rocio o Marilyn como punto de contacto unico |
| **Linea directa de WhatsApp** | Numero del account manager para consultas directas |
| **Revision trimestral** | Llamada de 15 min para revisar experiencia y necesidades |
| **Condiciones de trading** | Revision de spreads/comisiones si el volumen lo justifica [REVISAR: Confirmar con Principals las condiciones mejoradas disponibles] |
| **Prioridad en retiros** | Procesamiento prioritario — mismo dia en horario habil |

### 2.3 VIP Platinum ($50K+)

| Servicio | Detalle |
|----------|---------|
| Todo Gold + | — |
| **Condiciones personalizadas** | Spreads, comisiones y apalancamiento negociados individualmente |
| **Gestor de cuenta dedicado** | Un solo punto de contacto para todo |
| **Linea directa con Dealing** | Acceso a Pepe para consultas de ejecucion |
| **Reportes personalizados** | Resumen mensual de actividad y rendimiento |
| **Onboarding premium** | Sesion 1-a-1 de configuracion de MT5, VPS, y herramientas |
| **Invitacion a beta features** | Primer acceso a nuevas funcionalidades |

---

## 3. SLAs Diferenciados

### 3.1 Comparativa de SLAs

| Metrica | Cliente Regular | VIP Silver | VIP Gold | VIP Platinum |
|---------|----------------|------------|----------|-------------|
| Primera respuesta (chat) | 5 min en horario | 3 min | 2 min | 1 min |
| Primera respuesta (email) | 2-4 horas | 1 hora | 30 min | 15 min |
| Resolucion de ticket standard | 24h habiles | 12h habiles | 8h habiles | 4h habiles |
| Procesamiento de retiros | 1-3 dias habiles | 1-2 dias habiles | Mismo dia habil | Mismo dia habil (prioridad maxima) |
| Tiempo de escalamiento | 15 min en L1 | 10 min | 5 min | Inmediato a L2 |

### 3.2 Protocolo de SLA Incumplido

Si un SLA VIP no se cumple:

1. Agente notifica a Edward inmediatamente
2. Edward contacta al cliente con disculpa y explicacion
3. Se documenta el incumplimiento en el registro VIP
4. Se analiza la causa raiz en la reunion semanal
5. Si es recurrente, se revisa la asignacion de recursos

---

## 4. Account Management Dedicado

### 4.1 Rol del Account Manager VIP

El account manager (Rocio o Marilyn) es el punto de contacto principal para clientes Gold y Platinum.

**Responsabilidades:**

| Responsabilidad | Frecuencia |
|----------------|-----------|
| Responder consultas directas del cliente | Diario |
| Contacto proactivo de seguimiento | Semanal (Gold), 2x semana (Platinum) |
| Verificar que retiros se procesan en tiempo | Cada solicitud |
| Coordinar con Dealing para consultas de ejecucion | Cuando sea necesario |
| Informar al cliente sobre novedades y nuevas funcionalidades | Mensual |
| Preparar y enviar reporte de actividad (Platinum) | Mensual |
| Revision trimestral con el cliente | Trimestral |
| Registrar toda interaccion en Skale CRM | Cada contacto |

### 4.2 Conocimiento del Cliente

El account manager debe mantener actualizado un perfil para cada cliente VIP:

| Dato | Donde Registrar |
|------|----------------|
| Nombre completo y pais | Skale CRM |
| Tipo de cuenta y balance actual | MT5 Admin |
| Instrumentos que opera mas | MT5 Admin (historial) |
| Estilo de trading (scalper, swing, EA) | Notas en Skale CRM |
| Horarios habituales de trading | Observacion |
| Canal preferido de comunicacion | Notas en Skale CRM |
| Historial de quejas o problemas | Intercom |
| Fecha y monto del ultimo deposito | Skale CRM |
| Fecha del ultimo contacto proactivo | Notas en Skale CRM |
| Necesidades o solicitudes especiales | Notas en Skale CRM |

### 4.3 Reglas de Interaccion

- **Personalizacion:** Conocer al cliente por nombre, saber que opera, recordar interacciones anteriores
- **Proactividad:** No esperar a que el cliente tenga un problema para contactarlo
- **Disponibilidad:** Responder dentro del SLA incluso si no tiene la respuesta — acusar recibo y dar tiempo estimado
- **Honestidad:** Si algo no se puede hacer, decirlo directamente con alternativa
- **Confidencialidad:** Nunca compartir informacion de un cliente VIP con otro cliente

---

## 5. Contacto Proactivo

### 5.1 Calendario de Touchpoints

| Evento | Accion | Responsable | Canal |
|--------|--------|-------------|-------|
| Cliente cruza umbral VIP | Bienvenida VIP + presentacion del account manager | Account manager | WhatsApp + Email |
| 7 dias despues de VIP | Verificar experiencia, ofrecer configuracion de VPS si aplica | Account manager | WhatsApp |
| Cada lunes | Revision de clientes VIP sin actividad en 5+ dias | Account manager | Interno |
| Primer dia del mes | Resumen del mes anterior + novedades (Platinum) | Account manager | Email |
| Post-deposito grande (>$5K) | Agradecimiento + verificar que todo funciona | Account manager | WhatsApp |
| Post-retiro grande | Verificar recepcion + ofrecer asistencia | Account manager | WhatsApp |
| Cumpleanos del cliente | Mensaje de felicitacion (si se tiene el dato) | Account manager | WhatsApp |
| Nueva funcionalidad lanzada | Notificacion personalizada | Account manager | Email + WhatsApp |

### 5.2 Scripts de Contacto Proactivo

**Bienvenida VIP:**
```
Hola [nombre], soy [account manager] de NEOMAAA Markets.

Queria presentarme personalmente — soy tu contacto dedicado a partir 
de ahora. Esto significa que tienes una linea directa conmigo para 
cualquier consulta, solicitud o necesidad que tengas.

Mis datos de contacto:
- WhatsApp: [numero]
- Email: [email]
- Horario: [horario]

Hay algo en lo que pueda ayudarte hoy? Si tu experiencia hasta ahora 
ha sido buena, me encantaria saberlo. Y si hay algo que mejorar, 
quiero saberlo tambien.
```

**Seguimiento semanal:**
```
Hola [nombre], soy [account manager]. 

Queria verificar que todo este funcionando bien con tu cuenta. 
Vi que [operaste activamente esta semana / no has operado en unos dias].

[Si opero:] Necesitas algo respecto a la plataforma o tus operaciones?
[Si no opero:] Todo bien? Si necesitas asistencia con algo, estoy aqui.
```

**Post-deposito grande:**
```
Hola [nombre], confirmo que tu deposito de $[monto] ha sido acreditado 
en tu cuenta MT5.

Si necesitas algun ajuste en tu configuracion (apalancamiento, VPS, 
o cualquier otra cosa), avisame y lo coordinamos.
```

---

## 6. Proceso de Onboarding VIP

### 6.1 Para Clientes que Abren Cuenta Directamente como VIP (Raw o Institucional)

**Dia 1 — Registro y KYC:**
1. Sales guia el registro con atencion personalizada
2. KYC se prioriza en Sumsub — Susana revisa manualmente si es necesario
3. Una vez aprobado, account manager se presenta dentro de 2 horas

**Dia 1-2 — Setup:**
1. Account manager verifica que MT5 esta correctamente configurado
2. Si el cliente usa EAs, se ofrece VPS y asistencia de configuracion
3. Se verifican los metodos de deposito disponibles para su pais
4. Se guia el primer deposito

**Dia 3-5 — Primera semana:**
1. Verificar que el primer trade se ejecuto correctamente
2. Ofrecer demostracion de funcionalidades avanzadas (Copy Trading, Vault)
3. Preguntar si hay dudas o necesidades adicionales

**Dia 7 — Check-in:**
1. Llamada o mensaje de seguimiento
2. Evaluar satisfaccion inicial
3. Documentar feedback

### 6.2 Para Clientes que se Convierten en VIP (Depositos Acumulados)

1. Account manager se presenta formalmente
2. Explicar beneficios del nivel VIP alcanzado
3. Ofrecer revision de condiciones de trading si aplica
4. Establecer canal de comunicacion preferido

---

## 7. Manejo de Quejas VIP

### 7.1 Diferencias con el Protocolo Regular

| Aspecto | Cliente Regular | Cliente VIP |
|---------|----------------|-------------|
| Primer contacto post-queja | Agente de soporte | Account manager (directamente) |
| Tiempo de acuse | 30 min | 15 min |
| Investigacion | Proceso estandar | Prioridad maxima |
| Comunicacion de avance | Cada SLA de actualizacion | Cada 2 horas como minimo |
| Cierre | Por Intercom | Llamada del account manager |
| Seguimiento post-resolucion | 48h despues | 24h despues + 7 dias |

### 7.2 Protocolo de Queja VIP

1. El account manager toma control del caso inmediatamente
2. Contacta al cliente directamente por su canal preferido
3. Escala internamente con maxima prioridad
4. Comunica avances cada 2 horas como minimo
5. Una vez resuelto, llama al cliente para confirmar satisfaccion
6. Documenta todo en Intercom + Skale CRM
7. Reporta el incidente a Edward

### 7.3 Recuperacion de Servicio VIP

Si un cliente VIP tuvo una experiencia negativa:

| Accion | Detalle |
|--------|---------|
| Disculpa directa del account manager | Llamada o mensaje personalizado, no template |
| Revision de causa raiz | Investigacion completa |
| Accion correctiva documentada | Que se hizo para que no vuelva a pasar |
| Compensacion de goodwill (si aplica) | Segun tabla de compensaciones en `manejo-quejas.md` |
| Seguimiento reforzado las 2 semanas siguientes | Contacto cada 3 dias |

---

## 8. Retencion de Clientes VIP

### 8.1 Senales de Alerta de Desercion

| Senal | Nivel de Alerta | Accion |
|-------|----------------|--------|
| No opera en 7+ dias (siendo activo diario) | Amarilla | Account manager contacta por WhatsApp |
| No opera en 15+ dias | Naranja | Account manager llama + Edward informado |
| Retiro de 50%+ del balance | Roja | Account manager contacta inmediatamente |
| Retiro total de fondos | Critica | Account manager llama + reporte a Edward |
| Queja grave sin resolucion satisfactoria | Roja | Escalamiento a Principals |
| Solicitud de cierre de cuenta | Critica | Edward interviene + oferta de retencion |

### 8.2 Estrategia de Reactivacion VIP

**Cuando un VIP deja de operar:**

**Dia 7 sin actividad:**
```
Hola [nombre], soy [account manager]. 

Note que no has operado recientemente. Todo bien? Si hay algo que 
pueda mejorar tu experiencia o si necesitas asistencia con algo, 
estoy aqui.

[Si aplica:] Por cierto, esta semana hay [evento de mercado relevante]. 
Podria ser un buen momento para revisar oportunidades.
```

**Dia 15 sin actividad:**
```
Hola [nombre], queria hacer un seguimiento.

Hay algo que no este funcionando como esperas? Me gustaria escuchar 
tu feedback honesto para asegurarme de que tu experiencia con 
NEOMAAA sea la mejor posible.

Si prefieres, podemos agendar una llamada de 10 minutos cuando 
te convenga.
```

**Dia 30 sin actividad:**
Llamada directa del account manager. Objetivos:
1. Entender el motivo de la inactividad
2. Si es un problema con NEOMAAA, intentar resolverlo
3. Si esta operando en otro broker, entender por que
4. Ofrecer condiciones mejoradas si Principals lo autorizan
5. Documentar feedback para mejora continua

### 8.3 Protocolo de Retiro Total / Cierre de Cuenta VIP

1. Account manager contacta al cliente antes de procesar el cierre
2. Preguntar el motivo con genuino interes (no como obstaculo)
3. Si el motivo es solucionable, ofrecer alternativa
4. Si la decision es firme, procesar con profesionalismo y respeto
5. Dejar la puerta abierta: "Si en el futuro quieres volver, estaremos encantados de recibirte"
6. Documentar el motivo del cierre en Skale CRM
7. Enviar feedback a Edward para revision

---

## 9. Herramientas y Configuracion

### 9.1 Configuracion en Intercom

| Configuracion | Detalle |
|--------------|---------|
| Atributo `vip` | Boolean, activado automaticamente por Skale sync |
| Atributo `vip_level` | Silver / Gold / Platinum |
| Regla de routing | VIP Gold/Platinum se asigna a account manager directamente |
| Prioridad automatica | Todos los VIP entran como prioridad Alta |
| Notificacion push | Ticket VIP genera notificacion push al account manager |
| Tag automatico | `vip` + `vip-silver` / `vip-gold` / `vip-platinum` |

### 9.2 Configuracion en Skale CRM

| Campo | Detalle |
|-------|---------|
| `vip_status` | Active / Inactive |
| `vip_level` | Silver / Gold / Platinum |
| `vip_since` | Fecha de activacion VIP |
| `assigned_am` | Account manager asignado |
| `last_proactive_contact` | Fecha del ultimo contacto proactivo |
| `vip_notes` | Notas de seguimiento VIP |

[REVISAR: Verificar que estos campos existan en Skale CRM o solicitar su creacion]

---

## 10. Metricas VIP

### KPIs Mensuales

| Indicador | Meta |
|-----------|------|
| Total de clientes VIP activos | Crecimiento mes a mes |
| Depositos de clientes VIP / Total depositos | >50% |
| Retencion VIP a 90 dias | >85% |
| SLA VIP cumplido | >95% |
| Contactos proactivos realizados | 100% segun calendario |
| CSAT de clientes VIP | >4.5/5 |
| Quejas VIP resueltas en SLA | 100% |
| Tasa de desercion VIP mensual | <5% |

### Reporte Semanal VIP (Account Manager)

```
REPORTE SEMANAL VIP — Semana [#]

Total VIP activos: Silver: ___ | Gold: ___ | Platinum: ___
Nuevos VIP esta semana: ___
VIP inactivos (7+ dias): ___
Contactos proactivos realizados: ___/___
Quejas VIP abiertas: ___
Retiros VIP procesados: $___

Novedades:
- [Cliente] alcanzo nivel [nivel]
- [Cliente] solicito [algo]
- [Cliente] inactivo desde [fecha] — plan: ___

Pendientes:
- ___
```

---

*Documento preparado para uso interno de NEOMAAA Markets.*
*La experiencia VIP es un diferenciador clave frente a brokers grandes.*
*Revision mensual obligatoria en reunion de equipo.* [REVISAR: Asignar fecha de primera revision]
