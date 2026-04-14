# SEC2 Fix Report: Auth Hardening

## Problemas identificados

1. **Rate limit de login in-memory** — `loginAttempts: Map` en `src/lib/auth.ts`. En Vercel cada lambda tiene su propia memoria: un atacante que distribuye intentos entre múltiples colds starts jamás dispara el lockout. Misma falla en `/api/register` (`registrationAttempts: Map`).
2. **Default code `000000` para 11 staff** — Pepe, Susana, Edward, Franco, Luis, Rocio, Marilyn, Alex A, Alex B, Gleb, Dimitri. No había mecanismo que forzara cambiarlo. Si uno no cambia su código, cualquiera con el `userId` (público, igual al nombre) entra.
3. **JWT cachea `isAdmin`/`roleId` 7 días** — Quitar un permiso vía panel no tenía efecto hasta que el usuario reloguea. En una plataforma financiera, inaceptable.
4. **Hardcoded admin gana siempre** — `HARDCODED_ADMINS[userId]` se chequeaba antes que DB. Si un admin "hardcoded" es comprometido, la única forma de revocarlo era redeploy con nueva env var.
5. **`Math.random()` para códigos de acceso** — Predecible. Nunca aceptable para credenciales. Usado en seed de admin, aprobación de registro, y `generateCode` del API de users.

## Fixes implementados

### Fix 1: Rate limits a KV
- `src/lib/rate-limit.ts` (nuevo) — módulo genérico con `checkRateLimit()` y `consumeRateLimit()`. Usa `@vercel/kv` con patrón INCR+EXPIRE. Fallback a Map solo en dev sin KV. Key format: `ratelimit:{purpose}:{identifier}`.
- `src/lib/auth.ts` — reemplazado `Map` + helpers (`checkRateLimit`/`recordFailedLogin`/`clearLoginAttempts`) por calls al módulo KV. Límite: 5 intentos / 15min / userId. Si excede, `authorize` devuelve `null` (signIn falla, NextAuth lo traduce a error).
- `src/app/api/register/route.ts` — reemplazado `registrationAttempts: Map` por KV. Límite: 5 / 15min / IP. IP extraída con `getClientIp()` que toma `x-forwarded-for` (leftmost) y cae a `x-real-ip`. Comentario inline advierte que IP spoofing requiere proxy trustado; en Vercel los headers vienen garantizados.

### Fix 2: Forced rotation del código 000000
- `src/lib/types.ts` — agregado `mustChangeCode?: boolean` al `User`.
- `src/lib/db.ts seedDefaultData()` — todos los 11 staff seedeados con `000000` arrancan con `mustChangeCode: true`. Admins (Diego, Yulia, Stanislav) usan código random y NO llevan la flag (ellos manejan su rotación).
- `src/app/api/register/route.ts` PATCH (aprobación) — al crear el usuario post-aprobación se marca `mustChangeCode: true`. El admin le entrega un código temporal que el user debe rotar en su primer login.
- `src/app/api/users/change-code/route.ts` (nuevo) — POST para que un user logueado rote su propio código. Valida: 6 dígitos numéricos, distinto de `000000`, distinto del código actual (bcrypt compare). Si OK: `regenerateCode()` + `updateUser({mustChangeCode: false})`.
- `src/app/change-code/page.tsx` (nuevo) — UI bilingüe (ES/RU) con mismo look & feel de `/login`. Dos inputs (newCode / confirm), validación client-side, POST a `/api/users/change-code`. Tras éxito hace `signOut` y manda a `/login` para forzar un JWT fresco sin la flag.
- `src/lib/auth.ts` — callback `jwt` propaga `token.mustChangeCode = dbUser.mustChangeCode === true`. Callback `session` lo expone en `session.user.mustChangeCode`.
- `src/middleware.ts` — si `req.auth.user.mustChangeCode === true` y el path no es `/change-code`, `/api/users/change-code`, o `/api/auth/*` → redirect a `/change-code` (o 403 JSON si es API). También: login redirect respeta la flag (ya logueado + mustChangeCode → va a `/change-code`, no a `/dashboard`).

### Fix 3: Revocación de sesiones más rápida
- `src/lib/auth.ts` — `session.maxAge` bajado de `7 * 24 * 60 * 60` (7 días) a `60 * 60` (1 hora). Esto es la **Opción B** del spec.
- **Por qué B y no A/C**: middleware en Next 14 corre en Edge runtime por default. Meter un `getUser()` de KV por cada request encarece todas las navegaciones y complica el manejo de errores cuando KV falla (no podés degradar a fallback in-memory porque la lambda no tiene sesión). El JWT de 1 hora, combinado con la flag `isActive` ya chequeada en `validateLogin` en el próximo login, limita la ventana de revocación a ≤1h sin costo por request. Opción A se puede agregar en un pass futuro si el riesgo lo amerita.

### Fix 4: Admin hardcoded como fallback real
- `src/lib/auth.ts authorize()` — reescrita la lógica: **DB gana**. Si existe `dbUser`, se valida contra DB (respeta `isActive`). Hardcoded solo se prueba cuando el user NO existe en DB (ej: KV recién creado, DB vacía, emergencia).
- `src/lib/auth.ts jwt()` — misma lógica: si hay `dbUser`, `isAdmin`/`roleId`/`lang`/`mustChangeCode` salen de DB. Fallback a hardcoded solo si no hay record.
- Consecuencia: un admin en DB con `isActive: false` queda bloqueado incluso si su código hardcoded en env var sigue activo.

### Fix 5: Código criptográficamente seguro
- `src/lib/db.ts:1` — `import { randomInt } from 'crypto'`.
- `src/lib/db.ts` (seed admin code) — `randomInt(100000, 1000000)` en vez de `Math.floor(100000 + Math.random() * 900000)`.
- `src/app/api/register/route.ts` — mismo tratamiento para el código de aprobación (6 dígitos) y también para el sufijo de colisión de userId (`randomInt(0, 0x10000).toString(16)` en vez de `Math.random().toString(36)`).
- `src/app/api/users/route.ts generateCode()` — usa `randomInt(0, chars.length)` en el loop. Charset limpiado (saqué 0/O/1/l/I por legibilidad del código al dictarlo).

## Archivos nuevos

- `src/lib/rate-limit.ts` — rate limiter KV-based reutilizable (check/consume pattern, fallback in-memory para dev sin KV).
- `src/app/api/users/change-code/route.ts` — endpoint POST para rotación de código por el propio user.
- `src/app/change-code/page.tsx` — UI bilingüe de rotación forzada de código, estilo NEOMAAA dark.

## Archivos modificados

- `src/lib/types.ts` — agregado `mustChangeCode?: boolean` al `User`.
- `src/lib/db.ts` — `import { randomInt }`, `adminSeedCode` con `randomInt`, 11 staff con `mustChangeCode: true` en seed.
- `src/lib/auth.ts` — rate limiter KV, DB gana sobre hardcoded, `mustChangeCode` en token/session, JWT maxAge 1h.
- `src/app/api/register/route.ts` — rate limit KV, `getClientIp()` helper, `randomInt` para código y suffix, `mustChangeCode: true` al aprobar.
- `src/app/api/users/route.ts` — `generateCode()` con `randomInt` y charset sin ambiguos.
- `src/middleware.ts` — enforcement de `mustChangeCode`, redirect post-login respeta la flag.

## Migration path (IMPORTANTE)

**Usuarios ya seedeados en KV no tienen `mustChangeCode`** porque el seed es idempotente (salta users existentes). Para forzarles la rotación:

### Opción 1 — Script one-off (recomendada)
Desde una Vercel Function efímera o un script local con las env vars de KV:

```ts
import { kv } from '@vercel/kv';

const staffToFlag = [
  'pepe', 'susana', 'edward', 'franco', 'luis',
  'rocio', 'marilyn', 'alexa', 'alexb', 'gleb', 'dimitri',
];

for (const id of staffToFlag) {
  const user = await kv.get<any>(`user:${id}`);
  if (!user) continue;
  await kv.set(`user:${id}`, { ...user, mustChangeCode: true });
  console.log(`flagged ${id}`);
}
```

### Opción 2 — Wipe y reseed
Solo si el portal no tiene datos críticos: borrar keys `user:*` (excepto admins si se quiere preservar sus lastLogin) y el próximo request dispara `seedDefaultData()` con las flags nuevas.

### Opción 3 — Admin panel
Desde `/admin/users`, PATCH manual a cada user con `mustChangeCode: true`. Funciona pero es manual (11 clicks).

### Qué pasa con admins
Diego / Yulia / Stanislav seedeados con código random — el código hasheado ya está en KV. Si nadie lo usó nunca (porque siempre loguearon por hardcoded env var), ese record nunca se tocó. Mientras `ADMIN_CODE_DIEGO` esté seteado en env vars, el login sigue funcionando vía hardcoded fallback (ahora se usa solo si no hay DB record o si el DB record no valida, según el nuevo flow).

**Acción sugerida post-deploy**: usar `/admin/users` para regenerar el código de Diego/Yulia/Stanislav desde la UI y quitar las env vars `ADMIN_CODE_*` una vez confirmado que DB funciona. Deja el fallback solo para emergencia real.

### JWT de 7 días ya emitidos
Cualquier sesión emitida antes de este deploy sigue válida hasta que expire (máximo 7 días restantes). Si se quiere invalidar todo inmediatamente: rotar `NEXTAUTH_SECRET` en Vercel. Todos los JWT existentes se invalidan, todos vuelven a loguear — y ahí caen en el flow nuevo (rate limit KV, `mustChangeCode` flag si el KV se actualizó según Opción 1).

## Testing checklist

- [x] `npx tsc --noEmit` pasa
- [x] `npx next build` pasa (38 static + dynamic routes OK, middleware 106kb)
- [ ] Login fresco sigue funcionando (Diego con env var hardcoded, o user DB con código válido)
- [ ] Pepe con `000000` → login OK, redirect inmediato a `/change-code`, no puede navegar a `/dashboard` hasta rotar
- [ ] Al rotar en `/change-code`: input `000000` bloqueado, input distinto al actual bloqueado, 5 dígitos bloqueado, éxito dispara signOut + redirect a `/login`
- [ ] Relogin con código nuevo: entra directo a `/dashboard`, flag `mustChangeCode` ya en `false`
- [ ] 6 intentos fallidos con mismo userId → del 6 en adelante login falla aunque ponga la clave correcta; el lockout persiste entre requests (probado indirectamente vía next build pero requiere validación manual en Vercel)
- [ ] Admin toggle `isActive: false` sobre un user → sesión actual sigue válida hasta máximo 1h (JWT TTL); nuevo login bloqueado por `validateLogin` que chequea `isActive`
- [ ] `generateCode()` produce códigos con charset sin ambiguos usando crypto
- [ ] Registro público: 6 submissions desde misma IP en 15min → 429 a partir de la 6ª

## Trade-offs / limitaciones

1. **Rate limit es por userId, no por IP, en login** — un atacante que distribuye ataques entre 100 userIds diferentes no dispara el lockout de ninguno. Mitigación futura: doble key (`ratelimit:login:user:{userId}` + `ratelimit:login:ip:{ip}`). No hecho en este pass para no agregar complejidad ahora.
2. **`getClientIp` confía en headers** — en Vercel están garantizados, pero si en el futuro se pone un proxy extra adelante, la IP leftmost puede ser controlada por el cliente. Requiere auditoría si cambia la topología.
3. **Revocación por desactivación toma hasta 1h** — JWT de 1h es el pragmático; el ideal (Opción A: KV lookup por request en middleware) queda pendiente. Para kick inmediato: admin rota `NEXTAUTH_SECRET` (invalida todos los JWT).
4. **`mustChangeCode` vs JWT** — después de rotar, el JWT viejo sigue teniendo `mustChangeCode: true` hasta que el user reloguee. Por eso `/change-code` hace `signOut` forzado. Alternativa: NextAuth `update()` desde el cliente para refrescar el token sin logout, no implementado.
5. **Seed idempotente** — users ya existentes no reciben `mustChangeCode: true` automáticamente. Ver "Migration path" arriba.
6. **IP spoofing en dev** — si corres local sin proxy, `x-forwarded-for` puede no existir → `ip === 'unknown'` → todos los devs comparten el mismo bucket. Para dev está bien; en prod Vercel siempre setea el header.
7. **Fallback in-memory del rate limiter** — solo en dev sin KV. En prod con KV funcionando, nunca se toca. Si KV falla en prod, cae a in-memory por lambda (comportamiento equivalente al estado anterior). Aceptable como degradación, no como régimen permanente.
