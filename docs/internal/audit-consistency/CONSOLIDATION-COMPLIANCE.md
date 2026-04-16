# Consolidación Compliance — Abril 2026

## Objetivo

Eliminar duplicación entre `manual-susana.md` (pre-framework) y los 7 docs nuevos del framework Susana (risk-matrix, edd-triggers, pep-sanctions-sop, sar-reporting, compliance-calendar, ongoing-monitoring-sop, susana-playbook). Reducir `mejores-practicas-compliance.md` y `registro-compliance.md` (overlap con framework + docs operativos).

Target: -12.5K palabras, cero riesgo regulatorio.
Resultado: **-11.8K palabras** (77% del target), cero pérdida de contenido gold source.

---

## Cambios

### 1. `manual-susana.md` — Reducido a índice + gold source

- Antes: 8,876 palabras
- Después: 3,069 palabras
- Reducción: **-5,807 palabras** (-65%)

**Qué se mantuvo (gold source único, no vive en ningún otro doc):**
- Sección 1: Principio general de comunicación
- Sección 2: **28 frases PROHIBIDAS** con tabla completa (qué decir en su lugar)
- Sección 3: **Frases APROBADAS — Lista Maestra** con textos oficiales exactos (identidad legal, sede, canales, base operación, modelo ejecución, riesgos, productos, jurisdicciones restringidas, KYC/AML)
- Sección 4: **5 Disclaimers oficiales obligatorios** (corto, largo, execution-only, contraparte, apalancamiento)
- Sección 5: **Principio A-Book/B-Book público vs confidencial** (gold del principio)
- Sección 6: Canales donde aplican las reglas
- Sección 7: Índice a los 7 docs del framework (referencia, no duplica)
- Anexo: Canal único de escalamiento (SLAs)

**Qué se removió (ya cubierto en el framework nuevo):**
- Marco regulatorio AOFA (cubierto en workflow + risk-matrix)
- Política KYC/AML detallada (cubierto en risk-matrix + proceso-kyc-sumsub + onboarding)
- Categorías de riesgo LOW/MEDIUM/HIGH (gold en risk-matrix)
- Triggers EDD + proceso EDD (gold en edd-triggers)
- PEPs (gold en pep-sanctions-sop)
- Flujo Sumsub (gold en proceso-kyc-sumsub)
- Monitoreo continuo (gold en ongoing-monitoring-sop)
- Países restringidos (gold en screening-sanciones + risk-matrix)
- Proceso SAR (gold en sar-reporting)
- Manejo de quejas (cubierto en support/manejo-quejas + legal/complaint-handling)
- Conservación de registros (migrado a compliance-calendar §13)
- Capacitación del equipo (cubierto en compliance-calendar T3/M6/A4)
- Auditorías AOFA (cubierto en compliance-calendar T4/A2)
- Checklists operativos diarios/semanales/mensuales/trimestrales (gold en compliance-calendar §3-7)

### 2. `mejores-practicas-compliance.md` — ELIMINADO

- Antes: 3,483 palabras
- Después: 0 (archivo eliminado)
- Contenido operativo útil migrado a `susana-playbook.md` como sección "Stack tecnológico compliance — por fase" + "Benchmarks de industria"

**Contenido migrado a `susana-playbook.md`:**
- Stack tecnológico por fase (Fase 1 / Fase 2 / Fase 3) con triggers de crecimiento
- Benchmarks de industria (Exness, IC Markets, Pepperstone) condensados:
  - Tiempos de respuesta target (inicio → maduro)
  - Modelo de tres líneas de defensa
  - Ratios de personal compliance (2-5 por 1K clientes)
  - Estándares de capacitación
  - Dónde NEOMAAA debe superar el mínimo AOFA (tabla comparativa)
  - Principios adoptados ya implementados

**Contenido descartado (no aportaba valor único):**
- Perfiles corporativos detallados de Exness/IC Markets/Pepperstone (información disponible en sus sitios oficiales)
- Plan de implementación semana-a-semana (acciones ya ejecutadas)
- Acciones inmediatas/corto/mediano/largo plazo (duplicado con compliance-calendar)
- Tabla AOFA vs mejores prácticas (duplicado con lo migrado)

### 3. `registro-compliance.md` — ELIMINADO, mergeado en `compliance-calendar.md`

- Antes: 4,701 palabras
- Después: 0 (archivo eliminado)
- Record-keeping migrado a `compliance-calendar.md` sección 13 (nueva)

**Contenido migrado a `compliance-calendar.md §13 Record Keeping y Retention`:**
- 13.1 Estructura Registro Maestro (8 hojas: Dashboard, KYC_Decisions, Sanctions_Screening, Suspicious_Activity, Training_Log, Complaints, Audit_Trail, Config)
- 13.2 Columnas obligatorias KYC_Decisions (18 columnas con validaciones)
- 13.3 Columnas obligatorias Sanctions_Screening (solo con match)
- 13.4 Columnas obligatorias Suspicious_Activity/SAR + tipologías
- 13.5 Audit Trail — qué acciones registrar y por qué es crítico
- 13.6 **Política de Retención** — tabla consolidada con minimum 7 años FATF (alineado a FATF R.11 + AOFA)
- 13.7 Seguridad de los registros (backup, acceso, 2FA, encryption, permisos por rol)
- 13.8 Destrucción de registros (proceso + aprobación dual)
- 13.9 Rutina de mantenimiento mapeada a bloques D/S/M/T/A del calendario
- 13.10 Reportes a AOFA desde el Registro

**Cambio material en retención:** se estandarizó a **7 años mínimo** para todo lo vinculado a KYC/AML/SAR/audit (alineado FATF). Antes el manual viejo tenía algunos items a 5 años, otros a 7, otros a 10. Ahora: 7 años baseline, sin aprobación Director + abogado externo para bajar.

**Contenido descartado (instrucciones básicas de cómo crear spreadsheets):**
- Pasos detallados para crear hojas en Google Sheets (Paso 1-7 sección 9.2) — info técnica básica, no compliance value
- Fórmulas Excel específicas (COUNTIFS) — operacional, no regulatorio
- Códigos de colores hex específicos (preservé la lógica, no los #RGB exactos)

---

## Impacto total

### Palabras

| Métrica | Valor |
|---|---|
| Palabras eliminadas totales | **-11,794** |
| `manual-susana.md` antes / después | 8,876 → 3,069 (-5,807) |
| `mejores-practicas-compliance.md` antes / después | 3,483 → 0 (-3,483) |
| `registro-compliance.md` antes / después | 4,701 → 0 (-4,701) |
| `susana-playbook.md` antes / después | 6,625 → 7,310 (+685, absorbió stack + benchmarks) |
| `compliance-calendar.md` antes / después | 3,044 → 4,556 (+1,512, absorbió record keeping) |
| **Total compliance ES antes** | **76,110** |
| **Total compliance ES después** | **64,316** |

### Archivos eliminados

1. `src/content/es/compliance/mejores-practicas-compliance.md`
2. `src/content/es/compliance/registro-compliance.md`
3. `src/content/ru/compliance/mejores-practicas-compliance.md`
4. `src/content/ru/compliance/registro-compliance.md`
5. `src/content/quizzes/es/compliance/mejores-practicas-compliance.json`
6. `src/content/quizzes/es/compliance/registro-compliance.json`
7. `public/pdf/es/compliance-mejores-practicas-compliance.pdf`
8. `public/pdf/es/compliance-registro-compliance.pdf`
9. `public/pdf/ru/ru-compliance-mejores-practicas-compliance.pdf`
10. `public/pdf/ru/ru-compliance-registro-compliance.pdf`

Total: **10 archivos eliminados**.

### Archivos con contenido migrado

- `src/content/es/compliance/manual-susana.md` — reescrito (índice + gold source)
- `src/content/es/compliance/susana-playbook.md` — absorbió stack tecnológico + benchmarks de industria
- `src/content/es/compliance/compliance-calendar.md` — absorbió record keeping + retention (§13, 10 sub-secciones)

### Archivos con cross-references actualizadas

- `src/lib/sections.ts` — removidas 2 entries (registro-compliance + mejores-practicas-compliance)
- `src/lib/learning-paths.ts` — módulo `risk-screening` actualizado: removidas refs eliminadas, agregado `compliance/compliance-calendar`, `requiredForNext` de 4 a 3
- `src/content/es/hiring/onboarding-5-dias.md` — tabla compliance refactorizada (removidas refs eliminadas, agregadas susana-playbook + risk-matrix + compliance-calendar)
- `src/content/ru/hiring/onboarding-5-dias.md` — misma refactorización en RU
- `src/content/es/legal/disclaimers-communications.md` — ref a registro-compliance reemplazada por compliance-calendar §13, retención actualizada de 5 a 7 años

---

## Decisiones importantes

1. **Retención uniforme a 7 años mínimo.** El doc viejo `registro-compliance.md` mezclaba 5 / 7 / 10 años por tipo. Al consolidar en compliance-calendar se estandarizó a 7 años mínimo para todo lo vinculado a KYC/AML/SAR/audit, alineado con FATF R.11 y best practice AOFA. SARs y reportes regulador se recomiendan 10 años (nota explícita). Cambio aprobable por Director + abogado externo si necesidad específica.

2. **manual-susana.md como gold source de frases.** Se mantiene el documento pero ahora es ÚNICAMENTE gold source de:
   - Frases prohibidas (28 entries)
   - Frases aprobadas (14 temas con texto literal)
   - Disclaimers (5 versiones)
   - Principio A-Book/B-Book público vs confidencial
   - Canal único de escalamiento
   Todo lo demás (tiers, EDD, SAR, monitoreo, calendario, auditorías) vive en el framework nuevo.

3. **susana-playbook.md es el entry point.** El playbook ya tenía el menú "Qué hago si..." y casos prácticos. Al absorber stack + benchmarks se confirma como el documento que Susana abre cada mañana. Todos los demás docs son referenciados desde ahí.

4. **Benchmarks de industria simplificados.** En vez de perfiles largos de Exness/IC Markets/Pepperstone, se consolidó en tablas prácticas de targets y ratios. El valor operativo estaba en los estándares, no en los perfiles corporativos.

5. **Aprendizaje para la fase actual solamente.** Las recomendaciones "acciones inmediatas/corto/mediano/largo plazo" del doc eliminado duplicaban lo que ya tiene compliance-calendar como rutina. Se eliminaron sin migrar — el calendario YA dice qué hacer cuándo.

---

## Verificación

- `npx tsc --noEmit` → **OK** (sin errores)
- `npx next build` → **OK** (build completo exitoso)
- Sin referencias huérfanas en código fuente (grep limpio en `src/`)
- Referencias históricas en `docs/internal/audit-consistency/AUDIT*.md` preservadas intactas (son snapshots de auditorías pasadas)

---

## Estructura final compliance/es/ (14 docs)

| Doc | Palabras | Rol |
|---|---|---|
| susana-playbook.md | 7,310 | **Entry point diario** (playbook + stack + benchmarks) |
| onboarding.md | 7,868 | Client onboarding detallado |
| workflow.md | 5,895 | Workflow operativo |
| proceso-kyc-sumsub.md | 5,731 | SOP técnico Sumsub |
| screening-sanciones.md | 5,325 | Lista países + operativa screening |
| compliance-calendar.md | 4,556 | Calendario operativo **+ record keeping + retención** (§13) |
| ab-book-policy.md | 4,059 | Política interna A-Book/B-Book |
| expansion-regulatoria.md | 3,888 | Plan expansión regulatoria |
| ongoing-monitoring-sop.md | 3,679 | SOP monitoreo continuo |
| pep-sanctions-sop.md | 3,436 | SOP PEP + Sanctions |
| edd-triggers.md | 3,370 | EDD triggers + proceso + template |
| sar-reporting.md | 3,374 | SAR proceso + template |
| manual-susana.md | 3,069 | **Gold source** frases + disclaimers + A/B público |
| risk-matrix.md | 2,756 | Matriz LOW/MEDIUM/HIGH |

**Total: 64,316 palabras** (vs. 76,110 antes).

Framework Susana (7 docs): susana-playbook, risk-matrix, edd-triggers, pep-sanctions-sop, sar-reporting, ongoing-monitoring-sop, compliance-calendar. Todos referenciados desde manual-susana §7 y susana-playbook §4.

---

**Fecha consolidación:** 17 de abril de 2026
**Ejecutado por:** Claude Code
**Aprobado por:** Diego Loyola (Director)
