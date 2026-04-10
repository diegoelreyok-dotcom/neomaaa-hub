# NEOMAAA Broker - Playbook Operativo de Lanzamiento

## Master Checklist Pre Go-Live

Todo lo que tiene que estar listo ANTES de abrir las puertas a clientes reales. Ordenado por prioridad y dependencias.

---

### BLOQUE 1: Fundamentos (Semanas 1-2)
*Sin esto no se puede avanzar con nada mas.*

- [ ] **Politica A-Book / B-Book documentada** - Pepe escribe el documento interno. Define: que % se queda en B-Book, umbrales para pasar a A-Book, como se trata toxic flow, politica de hedging. Los scripts de ventas y compliance dependen de esto.
- [ ] **Esquema de comisiones cerrado** - Principals aprueban. Ver documento separado: `NEOMAAA-COMMISSION-SCHEME.md`
- [ ] **PSPs activos confirmados** - Lista final de procesadores de pago que estan live al dia 1. Minimo: 1 crypto (USDT), 1 tarjeta, 1 transferencia local LATAM (PIX/PSE/SPEI).
- [ ] **Skale CRM configurado para broker** - Campos custom: tipo de cuenta, FTD date, FTD amount, depositos totales, ultimo deposito, status KYC, assigned agent, lead source.
- [ ] **Intercom configurado** - Workflows de soporte, respuestas automaticas, horarios, routing ES/EN. Ver: `NEOMAAA-SUPPORT-PLAYBOOK.md`
- [ ] **Sumsub flows finalizados** - KYC flow broker (diferente al de prop), documentos aceptados por pais, thresholds de verificacion.

### BLOQUE 2: Capacitacion (Semanas 2-6)
*Se ejecuta en paralelo con el bloque 1.*

- [ ] **Capacitacion Sales - Semana 1/6** completada (Producto broker basico)
- [ ] **Capacitacion Sales - Semana 2/6** completada (MT5 hands-on)
- [ ] **Capacitacion Sales - Semana 3/6** completada (Compliance + que NO decir)
- [ ] **Capacitacion Sales - Semana 4/6** completada (Pitch + objeciones)
- [ ] **Capacitacion Sales - Semana 5/6** completada (CRM + flujo operativo)
- [ ] **Capacitacion Sales - Semana 6/6** completada (Simulaciones + examen)
- [ ] **Capacitacion Susana** completada (Compliance broker vs prop)
- [ ] **Capacitacion Support Agents** completada (Intercom + flujos)

### BLOQUE 3: Documentos Operativos (Semanas 3-5)
*Se pueden ir armando mientras corre la capacitacion.*

- [ ] **Sales Playbook** finalizado - Scripts, objeciones, pitch, KPIs. Ver: `NEOMAAA-SALES-TRAINING.md`
- [ ] **Compliance Manual** finalizado - KYC/AML, frases prohibidas, escalaciones. Ver: `NEOMAAA-COMPLIANCE-WORKFLOW.md`
- [ ] **Support Playbook** finalizado - Respuestas tipo, escalaciones, SLAs. Ver: `NEOMAAA-SUPPORT-PLAYBOOK.md`
- [ ] **Client Onboarding Flow** documentado - Paso a paso del cliente. Ver: `NEOMAAA-CLIENT-ONBOARDING.md`
- [ ] **Deposit/Withdrawal Process** documentado - Ver: `NEOMAAA-DEPOSITS-WITHDRAWALS.md`
- [ ] **FAQ interno** para Support + Sales (50+ preguntas frecuentes con respuestas aprobadas)

### BLOQUE 4: Hiring Critico (Semanas 1-4)
*En paralelo con todo lo anterior.*

- [ ] **Finance Manager contratado** - PRIORIDAD #1. Sin el, el broker opera a ciegas.
- [ ] **Support Agent #1 contratado** (LATAM, espanol)
- [ ] **Support Agent #2 contratado** (Europa/Middle East, ingles)
- [ ] **Marketing Manager** - decision hire vs freelance tomada y ejecutada

### BLOQUE 5: Testing Pre-Live (Semana 5-6)
*Nada sale a produccion sin testear.*

- [ ] **Test end-to-end del flujo completo**: Registro > KYC > Deposito > Abrir trade > Cerrar trade > Retiro
- [ ] **Test de cada PSP** con transaccion real (deposito + retiro)
- [ ] **Test de Intercom** - ticket de prueba recorre todo el flujo de escalacion
- [ ] **Test de CRM** - lead entra, se asigna, se trackea hasta FTD
- [ ] **Simulacion de llamada de ventas** - cada agent hace 3 llamadas mock evaluadas
- [ ] **Simulacion de KYC** - Susana procesa 10 KYCs de prueba con distintos escenarios (aprobado, retry, rechazado)
- [ ] **Load test basico** de plataforma MT5 + client portal

### BLOQUE 6: Go-Live Checklist (Dia D)

- [ ] Todos los PSPs activos y probados
- [ ] MT5 conectado al LP y operativo
- [ ] Client portal funcionando (registro, KYC, depositos, retiros)
- [ ] Intercom live con agentes logueados
- [ ] CRM recibiendo leads
- [ ] Susana disponible para aprobar KYCs en tiempo real
- [ ] Pepe monitoreando dealing desk
- [ ] Franco, Edward, Luis listos con sus listas de contactos dia 1
- [ ] Landing pages con risk disclaimers visibles
- [ ] Legal disclaimers en el footer de todo el sitio
- [ ] Metricas de dia 1 definidas: # registros, # KYC completados, # FTDs, $ depositado

---

## Cronograma Visual (6 Semanas al Go-Live)

```
Semana 1  |==FUNDAMENTOS==|  |==HIRING==|  |=SALES TRAINING S1=|
Semana 2  |==FUNDAMENTOS==|  |==HIRING==|  |=SALES TRAINING S2=|  |=SUSANA TRAINING=|
Semana 3  |===DOCS OPS====|  |==HIRING==|  |=SALES TRAINING S3=|  |=SUSANA TRAINING=|
Semana 4  |===DOCS OPS====|  |==HIRING==|  |=SALES TRAINING S4=|  |=SUPPORT TRAINING=|
Semana 5  |===TESTING=====|              |=SALES TRAINING S5=|  |=SUPPORT TRAINING=|
Semana 6  |===TESTING=====|  |GO-LIVE|  |=SALES TRAINING S6=|
```

---

## Documentos Complementarios

| Documento | Contenido | Archivo |
|-----------|-----------|---------|
| Sales Training Program | 6 semanas, dia por dia | `NEOMAAA-SALES-TRAINING.md` |
| Compliance Workflow | Susana + Sales sync + Sumsub | `NEOMAAA-COMPLIANCE-WORKFLOW.md` |
| Client Onboarding | Registro > KYC > Deposito > Trade | `NEOMAAA-CLIENT-ONBOARDING.md` |
| Support Playbook | Intercom, escalaciones, SLAs | `NEOMAAA-SUPPORT-PLAYBOOK.md` |
| Commission Scheme | Estructura de comisiones sales | `NEOMAAA-COMMISSION-SCHEME.md` |
| Deposits & Withdrawals | Proceso completo dep/retiro | `NEOMAAA-DEPOSITS-WITHDRAWALS.md` |

---

*Documento generado: 2026-04-08*
*Siguiente paso: revisar cada documento complementario en detalle.*
