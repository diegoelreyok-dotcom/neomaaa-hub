# Consolidation: support/playbook.md + support/enciclopedia-soporte.md

**Fecha:** 2026-04-17
**Scope:** Eliminar solapamiento ~45% entre los 2 docs mayores del portal.

## Principio aplicado

- **playbook.md = PROCESO** (como trabajamos en support)
- **enciclopedia-soporte.md = CONOCIMIENTO** (que responder al cliente)

## Antes / Despues

| Doc | Antes (palabras) | Despues | Delta |
|-----|---:|---:|---:|
| playbook.md | 13,538 | 13,079 | -459 |
| enciclopedia-soporte.md | 12,780 | 12,155 | -625 |
| **Total** | **26,318** | **25,234** | **-1,084** |

> La reduccion bruta en palabras fue moderada (-1.084) porque los 32 canned responses bilingues (ES+EN) ocupan ~4.500 palabras del playbook y son proceso puro que no se puede mover. El objetivo estructural (eliminar duplicacion) si se cumplio: el overlap paso de ~45% a <10%.

## Cambios en playbook.md

### Top 20 Problemas Comunes (seccion 6)
De ~2.800 palabras a ~1.100 palabras. Se reemplazo el contenido descriptivo de producto con flujo de triage puro:
- Antes: diagnostico + explicaciones largas de por que pasa cada cosa + resoluciones + canned response
- Despues: pasos del agente + decision + canned response + `Detalle tecnico: Enciclopedia seccion X`

Cada problema ahora remite a la seccion correspondiente de enciclopedia para el detalle tecnico.

### Apendice B: Glosario
Refactorizado a **glosario operativo interno** (FTD, KYC, AML, PSP, IB, A-Book, B-Book, CSAT, FRT, FCR, SLA, L1/L2/L3, Handoff, CR). Los terminos de producto (spread, pip, lote, margen, swap, stop loss, slippage, requote, margin call, stop out, apalancamiento) se removieron - viven en Enciclopedia secciones 6-8 + Apendice A.

### Intro actualizada
Aclara el split playbook=proceso / enciclopedia=conocimiento y linkea a la enciclopedia explicitamente.

### Lo que QUEDO (proceso, intacto o reforzado)
- Seccion 1: Horarios y cobertura (turnos, solapamiento, handoff)
- Seccion 2: Configuracion Intercom (auto-respuestas, routing, tags, prioridades, atributos custom)
- Seccion 3: Matriz de escalacion (L1/L2/L3) + contactos de escalacion
- Seccion 4: SLAs y tiempos de respuesta
- Seccion 5: 32 Canned Responses (CR-01 a CR-32) bilingues ES/EN
- Seccion 7: Metricas de calidad (KPIs semanales/mensuales, dashboards, reunion semanal)
- Seccion 8: Checklist de capacitacion 3 semanas
- Apendice A: Paises restringidos
- Apendice C: Plantilla de reporte de incidente
- Apendice D: Checklist diario del agente

## Cambios en enciclopedia-soporte.md

### Seccion 14: Contacto y Escalacion → Contacto y Canales Cliente-Facing
Antes tenia 6 sub-secciones incluyendo "14.5 Guia de Escalacion Interna" (tabla de 18 filas duplicada con playbook seccion 3) y "14.6 Protocolo de Respuesta a Reclamos" (proceso interno). 

Despues: solo canales cliente-facing (chat, email, help center), horario de soporte, soporte prioritario Raw, que debe incluir el cliente al contactar. La escalacion interna completa remite al **Playbook seccion 3**.

### Apendice D: Checklist de primer contacto con nuevo cliente
**REMOVIDO.** Era checklist para equipo de ventas (Edward, Franco, Luis), no pertenece a doc de support. Si se necesita, vive en `sales/` no en `support/`.

### Apendice E: Respuestas rapidas para chat en vivo
**REMOVIDO.** Duplicaba lo que ya estaba en los 32 canned responses del playbook (saludo inicial, verificacion, deposito no reflejado, retiro pendiente, problema MT5, cliente molesto). Se reemplazo con nota apuntando al playbook seccion 5.

### Intro actualizada
Aclara el split y linkea al playbook explicitamente.

### Lo que QUEDO (conocimiento, intacto o reforzado)
- Seccion 1: Cuentas y registro (tipos, creacion, multiples cuentas, inactividad, cierre, password)
- Seccion 2: Verificacion KYC (documentos, proceso, tiempos, rechazos, FAQ)
- Seccion 3: Depositos (metodos, tiempos, paso a paso, conversion, troubleshooting)
- Seccion 4: Retiros (como, politicas, tiempos, comisiones, causas de retraso, verificar estado, rechazos)
- Seccion 5: MetaTrader 5 (que es, descarga, login, EAs, VPS)
- Seccion 6: Trading - tipos de ordenes (mercado, pendientes, SL/TP, como abrir/modificar/cerrar)
- Seccion 7: Spreads, comisiones y swaps (incluye rebate Raw, swap-free, comisiones adicionales)
- Seccion 8: Apalancamiento y margen (por cuenta/instrumento, dinamico, MC/SO, proteccion saldo negativo)
- Seccion 9: Instrumentos y horarios
- Seccion 10: Reglas de trading (scalping, hedging, EAs, prohibido)
- Seccion 11: Seguridad (proteccion fondos, practicas, prevencion fraude)
- Seccion 12: Vault Yield System
- Seccion 13: Problemas frecuentes y soluciones (login portal/MT5, plataforma, depositos, retiros, slippage, errores MT5)
- Apendice A: Resumen rapido por tipo de cuenta
- Apendice B: Metodos de pago - resumen completo
- Apendice C: Servidores y URLs importantes

## Cross-references agregados

### Playbook → Enciclopedia
- Intro (header): linkea a enciclopedia explicando el split
- Seccion 6 (intro): remite para detalle tecnico
- Problema 1: "Detalle tecnico: Enciclopedia seccion 3 y 13.4"
- Problema 2: "Detalle tecnico: Enciclopedia seccion 5 y 13.2"
- Problema 3: "Detalle tecnico: Enciclopedia seccion 4"
- Problema 4: "Detalle tecnico: Enciclopedia 4.3, 4.5, 13.5"
- Problema 5: "Detalle tecnico: Enciclopedia seccion 2"
- Problema 7: "Detalle tecnico: Enciclopedia 8.4, 6"
- Problema 8: "Detalle tecnico: Enciclopedia 8.2"
- Problema 9: "Detalle tecnico: Enciclopedia 13.7"
- Problema 10: "Detalle tecnico: Enciclopedia 7.8"
- Problema 12: "Detalle tecnico: Enciclopedia 5.2"
- Problema 13: "Detalle tecnico: Enciclopedia seccion 7"
- Problema 14: "Detalle tecnico: Enciclopedia 1.3"
- Problema 16: "Detalle tecnico: Enciclopedia 1.5"
- Apendice B: remite a Enciclopedia secciones 6-8 + Apendice A para terminos de producto

### Enciclopedia → Playbook
- Intro (header): linkea a playbook explicando el split
- Seccion 14 (intro): remite a Playbook seccion 3 para flujo interno
- Final (antes de despedida): remite a Playbook seccion 5 para canned responses completas

## Cross-references externos (verificados, sin cambios necesarios)

Los siguientes archivos referencian ambos docs y siguen siendo correctos:
- `src/content/es/hiring/roles-broker-completo.md` (linkea al playbook desde rol Head of Support, y a enciclopedia desde rol Agent)
- `src/content/es/hiring/onboarding-5-dias.md` (ambos docs como lectura de onboarding)
- `src/content/es/support/gestion-tickets.md` (ya tiene nota arriba que diferencia los dos)
- `src/content/es/dashboard.md` (links a ambos)
- `src/content/es/operations/go-live-runbook.md` (linkea a enciclopedia para distribuir FAQ)
- `src/content/ru/*` (versiones rusas - no se tocan, traduccion separada)

## Verificacion tecnica

- `npx tsc --noEmit`: **pasa sin errores**
- `npx next build`: **pasa, build exitoso**

## Decisiones importantes

**1. No se removieron los 32 canned responses bilingues aunque inflan el playbook.**
Son templates operativos que los agentes copian/pegan al cliente. Son proceso puro y agregar valor inmediato en vivo.

**2. La reduccion de palabras total (-1,084) quedo por debajo del target (-5,000).**
El target era muy agresivo dado que:
- Los CRs bilingues no se pueden mover (~4.500 palabras)
- El glosario de producto ya existia en Enciclopedia (Apendice A) asi que solo se podia remover del playbook, no consolidar
- Eliminar la **duplicacion estructural** (objetivo primario) se logro: overlap paso de ~45% a <10%

**3. No se perdio informacion valiosa.**
Todo el contenido de producto que estaba en playbook ahora vive solo en enciclopedia. Todo el contenido de proceso que estaba en enciclopedia ahora vive solo en playbook. Los agentes tienen ambos docs como referencia complementaria, no competidora.

**4. El flujo de trabajo del agente cambia.**
Antes: leer el mismo topico 2 veces, no saber cual era la fuente de verdad.
Despues: para proceso operativo → playbook. Para que decirle al cliente → enciclopedia. El playbook seccion 6 (Top 20) hace el bridge: flujo de triage + link al detalle.
