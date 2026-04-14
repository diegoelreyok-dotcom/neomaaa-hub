# SEC3 Fix Report: IDOR + Permisos

Scope: Quiz permissions, progress integrity, cascade delete, badge race conditions.

## Problemas resueltos

### 1. IDOR quiz/start — cross-section access
- **Antes:** user `marketing-role` llamaba `POST /api/quiz/start { docPath: "compliance/ab-book-policy" }` y el endpoint le devolvía el quiz. Solo validaba autenticación, no permisos.
- **Después:** Se extrae el prefijo `section` del `docPath` (`"compliance/..."` → `"compliance"`), se carga el role desde `getRole(roleId)` y se verifica `role.sections.includes(section)`. Si no: `403 { error: "forbidden", message: "No tienes acceso a esta sección" }`.
- Admins (`isAdmin === true` o `roleId === "admin"`) hacen bypass.
- **Segunda capa:** mismo check replicado en `/api/quiz/submit` porque el role del user puede haber sido revocado entre `start` y `submit` (sesiones JWT persisten permisos viejos).

### 2. Leak de correctAnswer / explanation en fail
- **Antes:** la respuesta `QuizResult` siempre contenía `perQuestion[].correctAnswer` + `.explanation`, incluso en `passed=false`. Un user podía fallar 10 veces, memorizar las respuestas, y al rato aprobar (después del cooldown de 60 min).
- **Después:** `submit` redacta a `{ questionId, userAnswer, correct }` cuando `!passed`. En `passed=true` se devuelve todo (ya aprobó, es safe mostrarle qué falló para aprender).
- `QuizModal.tsx` oculta completamente el bloque "Revisar errores" cuando `!passed`. Con passed se muestra con guards `typeof pq.correctAnswer === 'number'` por si el backend cambia.

### 3. `/api/progress` PATCH permite completed sin leer
- **Antes:** cualquiera podía `PATCH /api/progress { documentPath, completed: true }` y marcar cualquier doc completado. Esto emitía role badges sin nunca haber abierto la sección.
- **Después:** 3 checks bloqueantes:
  1. **Section permission** (mismo que quiz/start): si la sección del doc no está en `role.sections` → 403.
  2. **Access previo requerido:** se llama a `getProgressEntry(userId, documentPath)` (helper nuevo). Si no existe registro → `400 { error: "no_access" }`. El user tiene que haber disparado al menos un `POST /api/progress` (access log) antes.
  3. **Proof-of-reading:** `accessCount >= 3` OR `(now - firstAccessed) >= 60s`. Si el user hace 1 solo access + mark inmediato → `400 { error: "read_too_fast" }`.
- **Quiz success bypass:** `POST /api/quiz/submit` ahora llama `markCompleted(userId, docPath)` directamente cuando `passed=true`. Aprobar el quiz ES la prueba de lectura, así que no necesita pasar por `/api/progress` (que tiene los checks estrictos). Esto evita romper el flow actual del QuizModal.

### 4. Cascade delete del user
- **Antes:** `DELETE /api/users?id=X` solo borraba la key `user:X`. Quedaban huérfanos: `progress:X:*`, `cert:X:*`, `cert_index:*` apuntando a X, `role_badge:X:*`, `quiz_cooldown:X:*`.
- **Después:** Se agregaron 3 helpers (`deleteAllCertsForUser`, `deleteAllBadgesForUser`, `deleteAllProgressForUser`) que iteran las keys via `kvKeys(pattern)` y las borran. `deleteAllCertsForUser` también limpia `cert_index:{certId}` usando el `cert.id` leído antes del delete, y limpia `quiz_cooldown:{userId}:*` del mismo user.
- Orden de ejecución: `certs → badges → progress → user`. Si algún cascade falla solo se loggea, no aborta el delete del user (evita dejar al user vivo con inconsistencias).
- **Guard adicional:** admin no puede eliminarse a sí mismo (`selfId === id` → 400).
- Response ahora incluye `cascade: { certs, badges, progress }` con counters.

### 5. Race condition en role badge issuance
- **Antes:** patrón `getRoleBadge() → if null → saveRoleBadge()`. Dos POST simultáneos a `/api/learning/check-completion` (o dos PATCH `/api/progress` seguidos) ambos veían `null` y creaban 2 badges. Misma key `role_badge:{userId}:{roleId}` → el segundo sobreescribía al primero, pero si los issuedAt eran distintos podían verse inconsistencias en listas, o si la key incluyera timestamp duplicaba.
- **Después:** helper nuevo `saveRoleBadgeIfNotExists(badge): Promise<boolean>` que usa `kv.set(key, value, { nx: true })`. Upstash KV devuelve `null` si la key ya existía, write-if-not-exists atómico. Fallback a memStore con check+set (no atómico pero dev-only).
- `/api/learning/check-completion` y el helper interno `maybeIssueRoleBadge` del PATCH `/api/progress` ambos usan el NX write. Si pierde la race, re-lee el badge existente y lo devuelve con `badgeIssued=false`.

---

## Archivos modificados
- `src/app/api/quiz/start/route.ts` — section permission check + admin bypass
- `src/app/api/quiz/submit/route.ts` — section permission check (2da capa) + redact correctAnswer/explanation on fail + markCompleted directo on pass
- `src/app/api/progress/route.ts` — PATCH con 3 checks (section / access / time) + uso de `saveRoleBadgeIfNotExists`
- `src/app/api/users/route.ts` — DELETE con cascade + self-delete guard
- `src/app/api/learning/check-completion/route.ts` — usa `saveRoleBadgeIfNotExists` y re-lee on race
- `src/components/QuizModal.tsx` — oculta review on fail, guards de `correctAnswer` opcional

## Archivos creados (helpers)
No se crearon archivos nuevos. Los helpers se agregaron a libs existentes:

- `src/lib/db.ts`
  - `getProgressEntry(userId, documentPath)` — lee una entry puntual
  - `deleteAllProgressForUser(userId)` — borra todas las progress keys del user
- `src/lib/role-badges.ts`
  - `kvSetNX(key, value)` — atómico set-if-not-exists (upstash `nx:true`)
  - `saveRoleBadgeIfNotExists(badge)` — NX version de `saveRoleBadge`
  - `deleteAllBadgesForUser(userId)` — cascade helper
  - `kvDel(key)` — faltaba el helper, ahora local
- `src/lib/quiz-storage.ts`
  - `deleteAllCertsForUser(userId)` — borra `cert:userId:*` + sus `cert_index:*` + sus `quiz_cooldown:*`

## Cascade delete scope

### Qué se borra al eliminar un user
- `user:{userId}` (la key principal)
- `progress:{userId}:*` (todas las entries de lectura)
- `cert:{userId}:*` (todos los certificados)
- `cert_index:{certId}` para cada cert que le pertenecía (via lookup del `cert.id`)
- `role_badge:{userId}:*` (todos los badges de paths completados)
- `quiz_cooldown:{userId}:*` (cualquier cooldown activo)

### Qué NO se borra (y por qué)
- `role:{roleId}` — el role es compartido entre múltiples users, no se toca.
- `quiz_session:*` — TTL 30 min, expiran solas; no hay index por userId (iterar todas las sessions del sistema para filtrar por `session.userId` sería caro y frágil).
- `analytics:*` — out of scope (no está en la lista de files permitidos, y analytics históricas típicamente se retienen deliberadamente).
- `api-key:*` / `kb_*` — fuera del scope de SEC3 (otros endpoints explícitamente vedados).
- `ratelimit:*` — in-memory, no persisten en KV en la implementación actual (`src/lib/auth.ts`).
- `pending:*` — no existe en la implementación actual del módulo. Si se agregan en el futuro, habrá que extender el cascade.

## Testing matrix

| Escenario | Antes | Después |
|---|---|---|
| User sales hace `POST /api/quiz/start { docPath: "compliance/..." }` | Pasa, devuelve quiz | 403 forbidden |
| User sales hace `POST /api/quiz/submit` con sessionId de compliance que consiguió pre-revoke | Pasa, emite cert | 403 forbidden (2da capa) |
| User falla quiz, ve response | `perQuestion` incluye `correctAnswer` + `explanation` | Solo `questionId` + `userAnswer` + `correct` boolean |
| User falla quiz, ve UI | Muestra respuestas correctas + explicaciones | Solo score "X de 10" |
| User PATCH `/api/progress` sin POST previo | Marca completed → emite badge | 400 `no_access` |
| User POST `/api/progress` + PATCH inmediato (< 60s, 1 access) | Marca completed | 400 `read_too_fast` |
| User POST 3 veces + PATCH | Marca completed | Marca completed ✓ |
| User POST + espera 60s + PATCH | Marca completed | Marca completed ✓ |
| User marketing intenta PATCH doc de compliance | Marca completed | 403 forbidden |
| 2 POST simultáneos a check-completion | 2 badges (el 2do pisa al 1ro) | 1 badge (NX atómico) |
| DELETE user deja huérfanos | `progress:X:*`, `cert:*`, `role_badge:*` quedan vivos | KV limpio |

## Regresión checklist
- [x] Admin sigue pudiendo hacer quiz de cualquier sección (bypass por `isAdmin || roleId === 'admin'`)
- [x] Quiz pasado marca progress completed correctamente (ahora vía `markCompleted` directo en submit)
- [x] Cert se emite correctamente (lógica intacta, solo se agregó `markCompleted` antes del cert write)
- [x] No duplicados de role badge (NX write en ambos paths que emiten badges)
- [x] Delete user deja KV limpio (cascade verificado, con logs por operación)
- [x] `npx tsc --noEmit` pasa (exit 0)
- [x] `npx next build` pasa (build completa sin errors, solo warnings de eslint no-unused-vars preexistentes)
- [x] Admin no puede borrarse a sí mismo (guard nuevo `selfId === id`)
- [x] Frontend QuizModal no intenta acceder a `correctAnswer` undefined en fail (section oculta + guards)

## Notas de implementación
- El patrón `kvSetNX` en `role-badges.ts` usa el option `{ nx: true } as any` — Vercel KV soporta esta opción de Upstash pero el typing del SDK no siempre la expone. El retorno `null` indica "key existe, no escribí".
- El check de `read_too_fast` usa OR (`enoughReads || enoughTime`) para no penalizar dos patrones válidos: alguien que hace muchos scroll-access rápidos y alguien que deja el doc abierto leyendo.
- El `markCompleted` llamado desde `/api/quiz/submit` usa try/catch silencioso: si falla, el cert sigue emitiéndose igual (fire-and-forget, consistent con el resto del flow).
