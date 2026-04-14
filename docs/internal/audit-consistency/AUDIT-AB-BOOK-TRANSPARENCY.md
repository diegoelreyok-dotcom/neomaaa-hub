# Alineacion A-Book/B-Book: admision oficial en docs operativos

## Decision Diego
Confirmado lenguaje "principal or counterparty" del T&C oficial de Neomaaa.com:
> "Neomaaa Ltd may act as principal or counterparty to client trades. Execution may be subject to slippage, latency, requotes, delayed execution, or market conditions beyond the Company's control."

Todos los docs internos del portal deben ser CONSISTENTES con esta admision publica.

## Frase canonica (uso en docs formales)
> "Neomaaa Ltd opera bajo modelo hibrido de ejecucion (STP/ECN o principal/counterparty segun condiciones de mercado), tal como se establece en nuestros Terminos y Condiciones (neomaaa.com/about/legal-documentation). Esta politica es estandar en brokers offshore y esta oficialmente documentada."

## Frase corta (comunicacion al cliente)
> "Operamos modelo hibrido con ejecucion ECN/STP priorizada. Los detalles estan en nuestra politica de ejecucion oficial."

## Archivos modificados (9)

1. `src/content/es/legal/terms-conditions.md` — seccion 8.2
2. `src/content/es/legal/client-agreement.md` — seccion 6.1
3. `src/content/es/sales/faq-ventas.md` — P18 (tipo de ejecucion)
4. `src/content/es/sales/objections-broker.md` — objecion 2 (scam) + objecion 18 (slippage)
5. `src/content/es/support/playbook.md` — lista "NUNCA hacer" de soporte
6. `src/content/es/support/enciclopedia-soporte.md` — 11.1 seguridad de fondos
7. `src/content/es/encyclopedia/abc.md` — entradas A-Book y B-Book

## Inconsistencias corregidas

| Archivo | Decia (FALSO) | Ahora dice |
|---|---|---|
| sales/faq-ventas.md:P18 | "sin intervencion de mesa de operaciones... NEOMAAA no opera contra el cliente" | "modelo hibrido... ECN/STP priorizado... puede actuar como principal o contraparte, auditable en MT5" |
| sales/objections-broker.md:Obj2 | "ejecucion ECN/STP donde nosotros no operamos contra ti" | "modelo hibrido de ejecucion con ECN/STP priorizado (documentado publicamente en T&C)" |
| sales/objections-broker.md:Obj2 bullet | "Ejecucion ECN/STP: no hay conflicto de interes" | "Modelo hibrido ECN/STP transparente (documentado publicamente en T&C)" |
| sales/objections-broker.md:Obj18 | "Nuestra ejecucion ECN/STP conecta directamente con proveedores de liquidez" | "Modelo hibrido con ejecucion ECN/STP priorizada — la ruta STP conecta con LPs" |
| support/playbook.md:300 | "Discutir la politica A-Book/B-Book de la empresa" (prohibido absoluto) | Permitido explicar modelo hibrido admitido en T&C; SOLO confidencial: criterios, umbrales, ratios y clasificacion individual |
| support/enciclopedia-soporte.md:1180 | "Las ordenes se dirigen directamente a proveedores de liquidez" (implicaba 100%) | "ECN/STP priorizado... en determinadas circunstancias puede actuar como principal o contraparte" |
| encyclopedia/abc.md:A-Book | No mencionaba que Neomaaa es hibrido | Agregado: "Neomaaa opera modelo hibrido A-Book/B-Book, admitido oficialmente en T&C" |
| encyclopedia/abc.md:B-Book callout | "Cero discusion publica de A-Book/B-Book con clientes" | Callout [!INFO]: permitido comunicar modelo hibrido citando T&C; solo criterios/umbrales/clasificacion individual son confidenciales |
| legal/terms-conditions.md:8.2 | "modelo de ejecucion ECN/STP, donde las ordenes se enrutan a proveedores de liquidez" | "modelo de ejecucion ECN/STP hibrido. Neomaaa Ltd puede actuar como principal o counterparty... slippage, latencia, requotes..." |
| legal/client-agreement.md:6.1 | "bajo el modelo de ejecucion ECN/STP" | "modelo de ejecucion ECN/STP hibrido. Neomaaa Ltd puede actuar como principal o counterparty" |

## Docs verificados sin cambios (ya alineados)

- `legal/order-execution-policy.md` — ya tiene seccion 2.1.1 "Actuacion como Principal o Contraparte" y seccion 173
- `legal/risk-disclosure.md` — seccion 5.3 "Riesgo de Contraparte" ya admite que el cliente entra en contrato con NEOMAAA como contraparte o con LPs
- `compliance/ab-book-policy.md` — policy interna completa, consistente
- `compliance/manual-susana.md` — secciones 8.3.bis ya tienen la frase canonica publica y distinguen lo confidencial (criterios de enrutamiento) vs lo publico (modelo hibrido)
- `operations/dealing-desk-publico.md` — ya dice explicitamente "Ninguno es 100% A-Book puro" y marca como mentira "Somos 100% A-Book"
- `sales/training.md:157` — ya dice "Neomaaa Ltd puede actuar como principal o counterparty"
- `sales/objections-broker.md:Obj4 + 532-533` — ya decia "Modelo hibrido ECN/STP... puede actuar como principal o counterparty"
- `sales/commissions.md` — menciones a B-Book son analiticas internas (ingresos esperados), no comunicacion al cliente
- `marketing/competidores-deep-dive.md:1005-1009` — explica A-Book/B-Book transparentemente, alineado
- `encyclopedia/formacion-precio.md:83` — "NEOMAAA opera bajo este modelo hibrido ECN/STP" consistente
- `encyclopedia/glosario-trilingue.md:74` — "Somos hibridos: ECN/STP, no market maker puro" OK
- `support/playbook.md:2193-2194` (glosario) — definiciones genericas de A-Book/B-Book, OK

## Lo que NO se puede decir (prohibido en todo output al cliente)
- "Somos 100% A-Book" (mentira, ningun broker retail lo es)
- "Nunca somos contraparte" (mentira segun T&C)
- "Solo pasamos ordenes al mercado" (mentira, somos hibridos)
- "No hay conflicto de interes" (matizar: existe, y se gestiona con politica publicada)
- "Sin intervencion de mesa de operaciones" (mentira, Pepe opera el Dealing Desk)

## Lo que SI se puede y DEBE decir
- "Modelo hibrido ECN/STP" (aprobado en T&C)
- "Neomaaa Ltd puede actuar como principal o counterparty, dentro de la Politica de Ejecucion de Ordenes publicada"
- "ECN/STP priorizado" (describe la ruta preferida sin mentir sobre la internalizacion)
- "Auditable en MetaTrader 5" (timestamps, spread, slippage)
- Referenciar siempre: `neomaaa.com/about/legal-documentation`

## Lo que es CONFIDENCIAL (solo Dealing Desk + Principals)
- Criterios de enrutamiento y umbrales (volumen, perfil, instrumento)
- Ratios A/B por cuenta/instrumento
- Scoring interno de clientes
- Clasificacion individual de un cliente especifico
- Porcentajes reales de A-Book vs B-Book por periodo

## Verificacion
- `npx tsc --noEmit`: pasa sin errores
- `npx next build`: pasa sin errores

## Siguiente paso (fuera de alcance de este audit)
- Revisar materiales de marketing externos (landing, copy en ads, redes) para misma consistencia
- Entrenar al equipo de ventas sobre nueva respuesta oficial a "son A-Book?"
- Actualizar scripts de Intercom (bot/macros) si existen
