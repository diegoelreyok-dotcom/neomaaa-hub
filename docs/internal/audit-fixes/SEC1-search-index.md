# SEC1 Fix Report: Search Index + KB API Scraping

Fecha: 2026-04-14
Alcance: `neomaaa-hub`
Autor: Claude (auditoría ejecutada y aplicada)

---

## Estado ANTES

- **`public/search-index.json` expuesto:** 2.8 MB (2,914,656 bytes) con body completo de los 129 docs (65 ES + 64 RU), servido estáticamente desde `/search-index.json` sin auth, cacheado por el CDN de Vercel. `curl https://portal.neomaaa.com/search-index.json` bajaba todo el KB sin credenciales, incluyendo secciones restringidas por rol.
- **KB API rate limits:** 100/h por clave. Sin límite diario, sin detección de patrones de scraping, sin disable temporal. Una clave comprometida podía drenar la KB en ~4 h (64 docs × 2 idiomas = 128 requests, bien por debajo de 100/h × 24 h = 2,400 requests/día).
- **KB API `/list`:** devolvía `titleEs`, `titleRu`, `wordCount`, `url` por doc — metadata suficiente para reconstruir un índice alternativo aunque no dieras body.
- **Watermarking:** inexistente. Un dump filtrado no era atribuible a ninguna clave específica.

---

## Estado DESPUÉS

- **Endpoint privado:** `GET /api/search/index` — auth por sesión NextAuth (cookie), filtrado server-side por `role.sections` del usuario (admins ven todo). `Cache-Control: private, max-age=300` + `Vary: Cookie`. El index se lee server-side desde `data/search-index.json` (fuera de `public/`).
- **Build:** `scripts/build-search-index.mjs` emite a `data/search-index.json`. `data/` ignorado en `.gitignore`. `public/search-index.json` eliminado del repo (`git rm`).
- **Rate limits KB:** 100/h **y** 200/día **y** 50 paths únicos/h en `/api/kb/doc`. Cada uno dispara `temp-disable` de la clave por 24 h (flag KV con TTL).
- **Pattern detection:** `trackDocPath(keyId, docPath)` en `/api/kb/doc` usa un Redis SET con TTL 1 h. Si se cruzan 50 paths únicos se flaggea, se temp-disabla la clave, y se loguea en `console.warn` (Vercel log drain).
- **Watermark:** todas las respuestas de `/api/kb/doc` y `/api/kb/list` incluyen header `X-KB-Key-Id: {últimos 6 del id de clave}` para atribución post-hoc si hay leak.
- **`/api/kb/list` minimizado:** sólo devuelve `docPath`, `section`, `slug`, `language`. Sin títulos, sin `wordCount`, sin `url`.
- **Middleware:** `/api/search/*` NO está en `API_KEY_ROUTES` ni `PUBLIC_ROUTES`, por lo que cae en la regla default (session requerida, 401 JSON si no hay sesión). Comentario explícito añadido en `middleware.ts`.

---

## Archivos modificados

- `scripts/build-search-index.mjs`: `OUT_FILE` cambiado de `public/search-index.json` a `data/search-index.json`. Comentario actualizado.
- `src/lib/kb-search.ts`: `getIndex()` lee de `data/search-index.json` primero, con fallback a `public/search-index.json` para local dev legacy.
- `src/components/SearchBar.tsx`: `fetch('/search-index.json')` → `fetch('/api/search/index', { credentials: 'same-origin' })`. Chequea `r.ok` antes de parsear.
- `src/lib/api-keys.ts`:
  - Nuevo: `RATE_LIMIT_PER_DAY=200`, `SCRAPE_DETECT_UNIQUE_PATHS=50`, `TEMP_DISABLE_TTL_SECONDS=86400`.
  - Nuevo: `RateLimitResult` type con `reason` y `scope`.
  - Nuevo: `tempDisableKey(keyId, reason)` → set KV `apikey_disabled:{id}` con TTL 24 h.
  - Nuevo: `isTempDisabled(keyId)` → boolean.
  - `checkRateLimit()` extendido: chequea temp-disable primero, luego hora, luego día. Cualquier excedente dispara `tempDisableKey` automáticamente.
  - Nuevo: `trackDocPath(keyId, docPath)` usa KV `sadd`/`scard`/`expire` (fallback in-memory). Retorna `{ flagged, unique }`.
- `src/lib/kb-auth.ts`: mensajes de error 429 diferenciados por `reason` (hour/day/temp_disabled).
- `src/app/api/kb/doc/route.ts`: awaiting `trackDocPath` antes de responder; 429 si `flagged`. Header `X-KB-Key-Id` en la respuesta.
- `src/app/api/kb/list/route.ts`: payload reducido a `docPath`, `section`, `slug`, `language`. Header `X-KB-Key-Id`.
- `src/middleware.ts`: comentario añadido explicando que `/api/search/*` NO bypasea session (defense in depth y memoria para el próximo que lea).
- `.gitignore`: agregadas entradas `data/search-index.json` y `public/search-index.json` (legacy safety).
- `src/content/es/encyclopedia/knowledge-base-api.md`: documentación actualizada — nueva tabla de rate limits, anti-scraping, watermarking, payload reducido de `/list`.

## Archivos creados

- `src/app/api/search/index/route.ts`: endpoint GET auth-gated, filtra por `role.sections`, `Cache-Control: private, max-age=300`, `Vary: Cookie`.
- `data/search-index.json`: generado por `build:search` (no trackeado, en `.gitignore`).
- `docs/internal/audit-fixes/SEC1-search-index.md`: este reporte.

## Archivos eliminados

- `public/search-index.json`: quitado del repo (`git status: deleted`).

---

## Flujo de testing manual

1. **Verificar que el index ya no es público:**
   - `curl -I https://portal.neomaaa.com/search-index.json` → esperado: 404 (o lo que Vercel retorne para un archivo ausente).
2. **Verificar el endpoint privado sin sesión:**
   - `curl -I https://portal.neomaaa.com/api/search/index` → esperado: 401 con `{"error":"Unauthorized"}`.
3. **Con sesión (cookie del user logueado):**
   - Desde el browser, abrir DevTools → Network → Cmd+K → ver request a `/api/search/index` con status 200, response JSON filtrado a las secciones del rol.
   - Validar que user con rol `sales` NO vea entries de section `compliance`.
   - Validar con admin: debe ver todas las entries.
4. **Cmd+K end-to-end:**
   - Login como usuario normal → Cmd+K → escribir keyword → resultados aparecen de secciones permitidas únicamente.
   - Navegación funcional (Enter abre el doc, Esc cierra).
5. **KB API hourly limit:**
   - Con una clave legítima, lanzar 101 requests en menos de 1 h (`for i in $(seq 1 101); do curl -H "X-API-Key: $K" .../kb/list; done`).
   - Request 101 → 429, clave queda temp-disabled 24 h.
6. **KB API daily limit:**
   - Simular 200 requests en un día (distribuidos en horas). Request 201 → 429 `daily_limit_exceeded`, key disabled.
7. **Scraping detection:**
   - Con clave legítima, pedir 51 docs diferentes en 1 h: `for slug in ...; do curl -H "X-API-Key: $K" "/api/kb/doc?path=$slug"; done`. Request 51 → 429 `scrape_pattern_detected`, key disabled.
8. **Watermark:**
   - `curl -i -H "X-API-Key: $K" "/api/kb/doc?path=encyclopedia/abc"` → ver header `X-KB-Key-Id: abc123` (últimos 6 del id).

---

## Issues conocidos / trade-offs

- **Fallback in-memory para scraping detection:** sin KV (dev local), el Set vive en memoria del runtime y no es compartido entre workers. En Vercel serverless cada cold start resetea el in-memory fallback, pero con `@vercel/kv` configurado en producción el `sadd`/`scard` es persistente y compartido. En dev esto es aceptable; en prod requiere KV configurado (ya lo está).
- **`X-KB-Key-Id` es deducible:** publicar los últimos 6 chars del id del key en headers reduce marginalmente la entropía del lookup. Mitigación: el id es random, no el plaintext. La alternativa sería un HMAC(keyId, secret) como watermark, pero para atribución post-leak el sufijo del id es suficiente y debuggable sin secret.
- **Temp-disable sin audit trail:** cuando la clave se temp-disabla, solo queda en KV + un `console.warn`. Un futuro endpoint admin puede listar `apikey_disabled:*` para ver qué claves están en cooldown. Por ahora es suficiente con borrar el flag manualmente si es falso positivo (`kv del apikey_disabled:key_xxx`).
- **Cache 5 min en browser:** un user cuyo rol cambia tarda hasta 5 minutos en ver el índice actualizado tras un cambio de rol (hasta la próxima recarga). Aceptable para operativa interna; si fuera crítico, bajar a `max-age=60`.
- **Daily counter reset:** el contador diario usa UTC-midnight, no rolling-24h. Un atacante podría saturar a las 23:59 UTC y volver a las 00:01. Trade-off aceptado por simplicidad — el scraping detection atrapa el abuso antes que el daily cap en la mayoría de escenarios.
- **`/api/kb/list` sin `title`:** integraciones que usaban `titleEs` desde `/list` ahora deben hacer una segunda llamada a `/search` para obtenerlo. Breaking change intencional — documentado en `knowledge-base-api.md`.

---

## Impacto de performance

- **Antes:** 2.8 MB JSON estático, cacheado en CDN Vercel (tiempo de respuesta <50 ms globalmente), disponible públicamente.
- **Después:**
  - Server-side: `getIndex()` singleton (una única lectura de 2.8 MB por cold start). Filtrado O(n) en memoria, n ≈ 130.
  - Response: usuarios con rol limitado reciben ~50-70% del index filtrado (~1.5-2 MB). Admins reciben todo (2.8 MB).
  - Gzip automático de Vercel reduce ~75% el payload (a ~400-700 KB por los repetidos tokens markdown).
  - Cache privado 5 min en el browser → primera apertura Cmd+K per sesión pega el server, siguientes usan cache local.
  - Cold start ~100-200 ms extra la primera vez por leer + parsear el JSON.
- **Trade-off neto:** ligeramente más lento primera vez por sesión (vs CDN cache global antes), pero la superficie de exfiltración cae de "pública + cacheada permanentemente" a "requiere sesión válida, filtrada por rol, cacheada 5 min privado".

---

## Checklist de regresión

- [ ] Cmd+K busca OK (portal → login → Cmd+K → typeahead → Enter abre doc correcto).
- [ ] User `sales` NO ve docs de `compliance` en los resultados de búsqueda.
- [ ] User `compliance` NO ve docs de `sales` en los resultados de búsqueda.
- [ ] Admin ve todos los docs en los resultados.
- [ ] `curl /search-index.json` → 404.
- [ ] `curl /api/search/index` sin cookie → 401.
- [ ] `curl /api/search/index` con cookie de admin → 200 + JSON array.
- [ ] `npm run build` genera `data/search-index.json` y NO `public/search-index.json`.
- [ ] `npx tsc --noEmit` → sin errores.
- [ ] API key legítima sigue funcionando (<100 req/h, <200 req/día, <50 paths únicos/h).
- [ ] API key que excede 100/h recibe 429 y queda temp-disabled 24 h.
- [ ] API key que excede 200/día recibe 429 y queda temp-disabled 24 h.
- [ ] API key que hace 51 paths únicos en /api/kb/doc en 1 h queda flaggeada + disabled.
- [ ] Respuestas de /api/kb/doc y /api/kb/list incluyen header `X-KB-Key-Id`.
- [ ] `/api/kb/list` devuelve solo docPath/section/slug/language (sin title, sin wordCount, sin url).
- [ ] Documentación `knowledge-base-api.md` refleja los nuevos límites y el watermark header.
