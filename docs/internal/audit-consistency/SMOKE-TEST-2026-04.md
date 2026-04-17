# Smoke Test — Abril 2026

**Portal:** neomaaa-hub (portal interno equipo)
**Fecha:** 2026-04-17
**Metodo:** Code-level review (sin browser automation)
**Build/TS:** `npx tsc --noEmit` → 0 errors. `npx next build` → OK, solo warnings eslint de unused vars.

---

## Resumen

- Issues CRITICOS: 1
- Issues HIGH: 5
- Issues MEDIUM: 6
- Issues LOW: 8
- Total: 20
- Portal ready for launch: **⚠️ CON RESERVAS** (un critico de learning path + un gap de revocacion de sesion)

---

## Issues CRITICOS (bloquean launch)

### C1: Learning paths referencian docs inexistentes — paths bloqueados permanentemente

- **Archivo:** `src/lib/learning-paths.ts:152, 263`
- **Descripcion:** Dos rutas apuntan a docs que fueron eliminados del portal:
  - `support-role` Fase 1 (foundations) referenciaba `encyclopedia/glosario-trilingue` (no existe en `src/content/es/encyclopedia/` ni en `sections.ts`). La fase tenia `requiredForNext: 4` con 4 docs pero uno invalido, entonces Soporte nunca podia completar Fase 1 → nunca desbloqueaba las siguientes → nunca obtenia badge.
  - `compliance` Fase 4 (expansion-legal) referenciaba `compliance/workflow-sales-compliance` (eliminado). Mismo patron: Susana nunca podia completar el path.
- **Repro:** Login como `susana` → /learning → completa 3 docs de Fase 1 → nunca se marca completa, Fase 2 bloqueada para siempre.
- **Fix aplicado:** Reemplace `glosario-trilingue` por `encyclopedia/regulacion-jurisdicciones` en support-role Fase 1. Elimine `workflow-sales-compliance` de compliance Fase 4 y baje `requiredForNext` de 4 a 3.
- **Status:** ✅ FIXEADO

---

## Issues HIGH (fixear antes de launch)

### H1: Middleware NO chequea `isActive` — usuarios desactivados conservan sesion hasta 1h

- **Archivo:** `src/middleware.ts` (falta el chequeo), `src/lib/auth.ts:158` (comentario miente)
- **Descripcion:** El comentario en auth.ts dice "Combined with isActive check in middleware, the effective revocation window is ~0s for page nav". Pero el middleware no chequea `isActive` en ningun momento. Resultado: cuando admin desactiva un usuario via panel, el usuario sigue navegando todo el portal hasta que el JWT expire (maxAge 1h) o cierre sesion manualmente. En caso de compromiso de credenciales esto es una ventana de 1h de acceso completo.
- **Fix sugerido:** En middleware, si `isLoggedIn`, hacer un `getUser(userId)` y si `!user.isActive`, forzar signout (redirect a /login con flag). Costo: +1 KV read por request, pero ya se hacen varios. Alternativa mas barata: revalidar isActive en el jwt callback cada N segundos (cache en memoria).

### H2: Quiz cooldown bypass — cooldown es por-doc no por-sesion, /start puede ser rate-limit evadido

- **Archivo:** `src/app/api/quiz/start/route.ts:77-87`
- **Descripcion:** El cooldown bloquea por (userId, docPath). Pero no hay rate limit sobre el endpoint `/api/quiz/start` en si mismo — un atacante puede crear cientos de sessions en paralelo (todas gastan KV write) para docs distintos sin limite. Cada session consume memoria KV con TTL 30min. Tambien `/api/quiz/submit` sin rate limit permite bruteforce de respuestas si algun bug permite regenerar sessions sin cooldown.
- **Fix sugerido:** Rate limit global de /api/quiz/* a 30 req/min por user.

### H3: FALLBACK_ROLES no matchean roles de `db.ts` — permisos inconsistentes en cold start

- **Archivo:** `src/app/(portal)/layout.tsx:10-19` vs `src/lib/db.ts:296-388`
- **Descripcion:** Si KV falla al resolver rol, se usa fallback hardcoded en portal layout. Pero:
  - `compliance` fallback: `['compliance', 'encyclopedia', 'support']` — DB real tiene `['compliance', 'legal', 'encyclopedia', 'support']`. Susana pierde `legal` si KV cae.
  - `dev` fallback: `SECTIONS.map(s => s.id)` — incluye `executive`. DB real no lo incluye. Dev ve ejecutivo en cold start pero no en estado normal (o al reves).
  - `support-role` fallback: `['support', 'operations', 'encyclopedia']` — coincide con DB. OK.
- **Fix sugerido:** Sincronizar FALLBACK_ROLES con la tabla seedDefaultData del db.ts, o importar de un lugar unico.

### H4: IP rate limit para registro puede ser evadido con `x-forwarded-for` spoofing en dev

- **Archivo:** `src/app/api/register/route.ts:70-79`
- **Descripcion:** `getClientIp` lee la primera IP de `x-forwarded-for`. En Vercel prod es seguro, pero si alguien corre esto detras de otro proxy/CDN o localmente, un atacante puede spoofear headers y evadir rate limit. Esto es aceptable segun el comentario, pero confirmar que solo se deploya a Vercel.
- **Fix sugerido:** Agregar comentario mas prominente o fail-closed si `VERCEL=1` no esta.

### H5: `mustChangeCode` puede ser bypasseado via PUBLIC_POST_ROUTES

- **Archivo:** `src/middleware.ts:49-52`
- **Descripcion:** El chequeo `isPublicPostRoute` (line 49) para `/api/register` se hace ANTES del chequeo `mustChangeCode` (line 73). Un usuario logueado con `mustChangeCode=true` puede seguir haciendo POST a /api/register sin rotar su codigo. No es un escalado de privilegios directo pero rompe el contrato "mustChangeCode bloquea TODO hasta rotar". Similar con `/api/auth` publico.
- **Fix sugerido:** Chequear `mustChangeCode` antes de early-return en publicRoutes si el usuario esta loggeado. Riesgo bajo porque /api/register no hace nada dañino, pero el contrato esta roto.

---

## Issues MEDIUM (nice-to-have pre-launch)

### M1: RU PDFs orfanos — `ru-compliance-workflow-sales-compliance.pdf` todavia existe

- **Archivo:** `public/pdf/ru/ru-compliance-workflow-sales-compliance.pdf`
- **Descripcion:** El doc ES fue eliminado pero el PDF RU sigue en disco. Tambien el md RU `src/content/ru/compliance/workflow-sales-compliance.md` sigue en disco. No se referencian desde sections.ts asi que no aparecen en UI, pero son dead weight. Tambien el link desde RU onboarding sigue apuntando a el.
- **Fix sugerido:** `rm src/content/ru/compliance/workflow-sales-compliance.md public/pdf/ru/ru-compliance-workflow-sales-compliance.pdf`.

### M2: Links rotos en contenido — docs referencian paths eliminados

- **Archivos con broken refs:**
  - `src/content/es/compliance/susana-playbook.md:245` → `/content/compliance/workflow-sales-compliance`
  - `src/content/ru/hiring/onboarding-5-dias.md:435` + `src/content/es/hiring/onboarding-5-dias.md:439` → mismo path
  - `src/content/es/executive/*.md` (5 archivos) → multiples refs a `treasury-management.md` / `treasury-management` (no existe en sections, ni PDF)
  - `src/content/ru/marketing/competidores-deep-dive.md:11,13` → refs a `competidores-broker.md`
  - `src/content/es/encyclopedia/vault-yield-system.md:193` → `executive/treasury-management.md`
  - `src/content/es/compliance/compliance-calendar.md:719` → mencion historica a `registro-compliance.md`
- **Descripcion:** Los links en render van a /content/{section}/{slug} y produciran paginas "Documento no encontrado" cuando el usuario clickee.
- **Fix sugerido:** Grep + edit manual. Prioridad: susana-playbook y onboarding-5-dias (visibles para staff activo).

### M3: Dashboard.md tenia link roto a `glosario-trilingue`

- **Archivo:** `src/content/es/dashboard.md:90`
- **Fix aplicado:** Eliminada la linea.
- **Status:** ✅ FIXEADO

### M4: Quiz pools faltan para varios docs → opcion "tomar quiz" no aparece

- **Archivo:** `src/content/quizzes/es/`
- **Descripcion:** No hay quiz JSON para (y por lo tanto no hay certificado disponible):
  - Executive: los 7 docs (OK si es executive-only)
  - Legal: los 15 docs
  - Encyclopedia: `knowledge-base-api`, `vault-yield-system`
  - Compliance: `susana-playbook`, `risk-matrix`, `edd-triggers`, `pep-sanctions-sop`, `sar-reporting`, `ongoing-monitoring-sop`, `compliance-calendar`, `frases-prohibidas` (8 docs)
- **Descripcion:** UX confusa — algunos docs tienen "tomar quiz" otros no. No es error tecnico pero es inconsistente.
- **Fix sugerido:** Decidir si se necesitan quizzes para todos o se documenta que solo algunos tienen cert.

### M5: RU no tiene dir `executive/` — RU users ven contenido ES fallback sin aviso

- **Archivo:** `src/lib/content.ts:37-46` (fallback), `src/content/ru/` (falta `executive/`)
- **Descripcion:** Si Yulia/Stanislav abren un doc de Executive en RU, ven silenciosamente el contenido ES. El fallback es correcto pero el usuario no sabe que esta leyendo ES. Tambien no hay PDFs RU de executive (`ru-executive-*.pdf` ausente).
- **Fix sugerido:** Agregar banner "Contenido en ES" o traducir los 7 docs. Segun memoria global, traduccion RU es al final.

### M6: Login page — boton enabled cuando `code` no cumple 6 digitos

- **Archivo:** `src/app/login/page.tsx:162-174`
- **Descripcion:** El boton se habilita con `!userId || !code` — solo requiere no-empty. Permite submit con codigo de 1 char. NextAuth luego rechaza pero es UX subopt.
- **Fix sugerido:** Validar `code.length === 6` antes de habilitar.

---

## Issues LOW (post-launch backlog)

### L1: MarkdownRenderer — el sanitize schema permite inline `className` en any tag

- **Archivo:** `src/components/MarkdownRenderer.tsx:16-53`
- **Descripcion:** El schema agrega `'className', 'id'` en `'*'` — lo que deja que un admin que edite MD injecte `class="absolute top-0 left-0 w-full h-full"` estilo phishing overlay. No es XSS pero es visual injection. Bajo riesgo porque solo admins editan MD.

### L2: `getSectionById` no valida `sectionId` contra ataque de inyeccion — no es vuln pero ruidos

- **Archivo:** `src/lib/sections.ts:174-176`
- **Descripcion:** `SECTIONS.find((s) => s.id === id)` con `id === "__proto__"` devuelve undefined (seguro), pero no hay log.

### L3: Sesion duration 1h fuerza re-login frecuente — friccion UX

- **Archivo:** `src/lib/auth.ts:160`
- **Descripcion:** maxAge=3600s. Staff tiene que re-login cada hora. Trade-off conocido (ver comentario), pero mencionar a Diego.

### L4: `PdfDownloadButton` abre PDF en `window.open` — bloqueado por popup blockers modernos

- **Archivo:** `src/components/PdfDownloadButton.tsx:40`
- **Descripcion:** `window.open(url, '_blank')` sin target link trigger. Safari/Chrome pueden bloquearlo. Usar `<a href download>` es mas robusto.

### L5: Certificate PDF usa fuente `Playfair Display` sin cargar @font-face

- **Archivo:** `src/components/Certificate.tsx:264`
- **Descripcion:** `fontFamily: "'Playfair Display', 'Georgia', serif"` — nunca se importa Playfair en `/fonts/` ni globals. En html2pdf.js cae a Georgia/serif. Nombre usuario se ve Georgia, no Playfair.

### L6: Rate limit de login es por-userId, no por-IP — DoS de un user objetivo

- **Archivo:** `src/lib/auth.ts:72-77`
- **Descripcion:** Un atacante con CAPTCHA-bypass puede hacer 5 intentos fallidos al userId "diego" y bloquearlo 15min sin limites. Fix: rate limit por (userId + IP).

### L7: `deleteCertificate` admin-only — users no pueden borrar su propio cert viejo

- **Archivo:** `src/app/api/certificates/[id]/route.ts:34-36`
- **Descripcion:** Si user quiere re-emitir cert con mejor score, no puede borrar el anterior. Ya se sobreescribe via /submit pero cert_index apunta al mismo ID.

### L8: `/api/seed` publicamente referenciado en ADMIN_ROUTES pero no esta importado — dead code?

- **Archivo:** `src/middleware.ts:18` incluye `/api/seed` pero no hay page.tsx en `src/app/api/seed/`
- **Verificacion:** ls muestra `seed` en listing de `src/app/api/`. Verificar que existe route handler.

---

## Verificaciones OK (confirmadas sin issues)

- ✅ Auth basic flow: login/logout/change-code funcionan por diseño
- ✅ Quiz session TTL 30min (QUIZ_SESSION_TTL_SECONDS)
- ✅ Quiz submit score: `score >= 7` correctamente emite cert (QUIZ_PASS_THRESHOLD)
- ✅ Quiz cooldown 1h (QUIZ_COOLDOWN_SECONDS)
- ✅ Quiz failed response redacta correctAnswer + explanation (anti-cheat)
- ✅ Cert IDOR: `/api/certificates/[id]` hace check `cert.userId !== userId` → 403
- ✅ Quiz session userId check `quizSession.userId !== userId` → 403
- ✅ Register crea pending (no user directo) con `status: 'pending'`
- ✅ Register rate limit 5/15min por IP (KV-backed)
- ✅ Login rate limit 5/15min por userId (KV-backed)
- ✅ Register endpoint GET/PATCH/DELETE gatean por `isAdmin`
- ✅ `createUser` sanitiza id con `replace(/[^a-z0-9-]/g, '')`
- ✅ `bcryptjs.hashSync` con cost 10 para codes
- ✅ `randomInt` (crypto-secure) para codes, no Math.random
- ✅ Cascade delete user: `deleteAllCertsForUser` + `deleteAllBadgesForUser` + `deleteAllProgressForUser` (users route.ts:178-191)
- ✅ Roles CRUD: delete admin role bloqueado (`db.ts:183`)
- ✅ API keys: sha256 hash, nunca plaintext en storage, plaintext returned solo once
- ✅ API keys rate limit: 100/h + 200/d + scrape detection (50 unique paths/h)
- ✅ `/api/kb/*` bypass session via middleware API_KEY_ROUTES, routes validan X-API-Key
- ✅ `/api/search/index` requiere session (SEC1)
- ✅ Search filtra por `role.sections` server-side + client-side defense in depth
- ✅ `rehype-sanitize` con allowlist (bloquea script/style/iframe/event handlers)
- ✅ Code path traversal: `safeResolve` en `/api/kb/doc`, null-byte rejection, `.md`-only
- ✅ SessionId regex-sanitized en quiz-storage
- ✅ `saveRoleBadgeIfNotExists` usa KV `nx: true` para atomic write (prev duplicates)
- ✅ `deleteUser` prevent self-delete
- ✅ `deleteRole` prevent admin role delete
- ✅ Admin role fallback is "most restrictive" (sales) para usuarios isAdmin=false — nota: confusion en portal layout
- ✅ Regenerate code rechaza codigo actual via `compareSync`
- ✅ Change-code endpoint rechaza `000000` y codigo igual al actual
- ✅ `mustChangeCode` redirect enforcement en middleware (exceptuando `/change-code`, `/api/users/change-code`, `/api/auth`)
- ✅ Login redirect de usuario loggeado mandatorio a `/change-code` si mustChangeCode
- ✅ Learning path `pathTotalDocs` dedup con Set
- ✅ Quiz sessions limpian en success Y fail (deleteQuizSession)
- ✅ TypeScript compila sin errores (0 errors)
- ✅ Next build sin errores (solo warnings de unused vars)

---

## Fixes aplicados automaticamente

- `src/content/es/dashboard.md:90` — eliminada referencia a `glosario-trilingue` (doc inexistente)
- `src/lib/learning-paths.ts:152` — reemplazado `encyclopedia/glosario-trilingue` por `encyclopedia/regulacion-jurisdicciones` en support-role Fase 1
- `src/lib/learning-paths.ts:263` — eliminado `compliance/workflow-sales-compliance` de compliance Fase 4; `requiredForNext` ajustado de 4 a 3

---

## Tests no pudo cubrir (requieren browser / prod)

- Cmd+K modal keyboard navigation (arrow keys, scroll)
- PDF download via html2pdf (Safari blob URL path)
- Certificate render fidelity (Playfair Display fallback)
- Rate limit real bajo carga concurrente
- Upstash KV behavior with `kv.set(key, val, { nx: true })` exact return value
- Session expiry 1h + middleware revalidation
- Multi-tab quiz session collision
- Mobile responsive de QuizModal (progress bar visible?)
- ROCIO/MARILYN/ALEXA/ALEXB/GLEB/DIMITRI users — verificar que roles DB vs hardcoded en fallbacks
