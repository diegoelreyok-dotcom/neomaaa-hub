# SEC4 Fix Report: XSS + CSP Headers

## Problema original

### XSS en MarkdownRenderer
`src/components/MarkdownRenderer.tsx` usaba `rehype-raw` (parsea HTML crudo dentro de markdown) seguido de un sanitizer regex-based (`sanitizeMarkdown`) con 4 reglas:

- `DANGEROUS_TAG_REGEX` — matchea `<script>...</script>` y similares
- `DANGEROUS_SELF_CLOSING_REGEX` — matchea `<img src=x>` auto-cerrantes
- `EVENT_HANDLER_REGEX` — `\s+on\w+\s*=\s*["'][^"']*["']` (requiere comillas)
- `JAVASCRIPT_URL_REGEX` — `href\s*=\s*["']\s*javascript:`

**Vectores de bypass reales:**

| Payload | Por que pasaba |
|---|---|
| `<img src=x oNerror =alert(document.cookie)>` | Espacio ANTES del `=` + sin comillas → `EVENT_HANDLER_REGEX` no matchea (exige `\s+on\w+\s*=` sin gap en el nombre + comillas) |
| `<img src=x onerror=alert(1)>` | Sin comillas → regex exige `["']` |
| `<svg onload=alert(1)>` | `svg` no esta en blocklist |
| `<math><mi//xlink:href="data:x,<script>alert(1)</script>">` | Namespacing confunde regex |
| `<a href="&#106;avascript:alert(1)">x</a>` | HTML entity encoding |
| `<IMG SRC="jav&#x0A;ascript:alert(1)">` | Entity + case |

Cualquier admin con permiso de subir .md podia inyectar payload que se ejecutaria en todos los lectores. Plataforma financiera = inaceptable.

### Sin CSP efectiva
Habia CSP, pero incluia `'unsafe-eval'` en `script-src` permanentemente — innecesario en produccion y destruye la defensa en profundidad contra XSS.

## Solucion implementada

### FIX 1 — rehype-sanitize con allowlist estricta

Archivo: `src/components/MarkdownRenderer.tsx`

**Cambios:**
1. Eliminadas funciones/regex: `DANGEROUS_TAG_REGEX`, `DANGEROUS_SELF_CLOSING_REGEX`, `EVENT_HANDLER_REGEX`, `JAVASCRIPT_URL_REGEX`, `sanitizeMarkdown()`.
2. Eliminado `useMemo(safeContent)` (ya no hay pre-procesamiento de string).
3. Agregado import: `rehypeSanitize, { defaultSchema } from 'rehype-sanitize'`.
4. Schema custom basado en `defaultSchema` extendido con lo que el portal necesita.
5. Pipeline de plugins: `[rehypeRaw, [rehypeSanitize, sanitizeSchema]]` — **el orden importa**: rehypeRaw parsea HTML a nodos HAST primero, sanitize limpia despues.

**Por que esto es mas seguro que regex:**
- Opera en el AST HAST ya parseado → no se puede evadir con espacios raros, namespacing, ni encoding
- `defaultSchema` de rehype-sanitize enforza protocolos seguros en href/src (bloquea `javascript:`, `data:` excepto imgs, `vbscript:`)
- Todos los atributos `on*` se strippean por default (allowlist, no blocklist)
- Solo tags explicitamente permitidas pasan — todo lo demas se descarta

### FIX 2 — CSP endurecida

Archivo: `next.config.mjs`

**Cambios:**
- Removido `'unsafe-eval'` en produccion (antes estaba siempre). Se deja solo en dev para HMR/react-refresh de Next.
- Agregado `https://flagcdn.com` a `img-src` (language-switcher usa banderas de ahi).
- Agregado `base-uri 'self'` — previene injection de `<base>` tag que redirija URLs relativas.
- Agregado `form-action 'self'` — forms solo postean al mismo origen.
- Agregado `object-src 'none'` — bloquea `<object>/<embed>/<applet>` como capa extra.
- `data:` agregado a `font-src` (Tailwind/Next pueden inlinear fuentes).

## Allowlist exacta

### Tags permitidos (ademas de defaultSchema)
`div`, `span`, `section`, `article`, `aside`, `figure`, `figcaption`

### Inventario real del contenido (`src/content/**/*.md`)
Tags HTML usadas en los .md: `a`, `code`, `div`, `h3`, `h4`, `li`, `p`, `span`, `strong`, `ul`

Todas estas ya estan en defaultSchema EXCEPTO `div` y `span`, que agregamos explicitamente.

Clases `neo-*` encontradas en markdown (unicas):
- `neo-stat-grid`, `neo-stat`, `neo-stat-label`, `neo-stat-value`, `neo-stat-sub`
- `neo-timeline`, `neo-timeline-step`, `neo-timeline-step-title`, `neo-timeline-step-desc`
- `neo-pyramid`, `neo-pyramid-level`
- `neo-compare`, `neo-compare-box`, `neo-compare-them`, `neo-compare-us`, `neo-compare-col`, `neo-compare-col--pro`, `neo-compare-col--con`, `neo-compare-title`
- `neo-step-list`, `neo-step`, `neo-step-num`, `neo-step-body`
- `neo-formula`

Todas se respetan porque `className` esta permitido en `div`/`span`/`*`.

### Atributos permitidos por tag

| Tag | Atributos permitidos |
|---|---|
| `*` (todos) | defaultSchema.* + `className`, `id`, `data-value`, `data-label`, `data-title`, `data-num` |
| `div` | `className`, `id`, `data-value`, `data-label`, `data-title`, `data-num` |
| `span` | igual que div |
| `section`, `article` | `className`, `id` |
| `aside` | `className`, `id`, `role`, `ariaLabel` |
| `a` | defaultSchema.a + `target`, `rel`, `className` (href enforzado a http/https/mailto/tel por defaultSchema) |
| `img` | defaultSchema.img + `className`, `loading` |
| `code` | defaultSchema.code + `className` (para `language-xxx` del code highlighting) |
| `input` | `type`, `checked`, `disabled` (solo para GFM task list checkboxes) |

### Lo que queda bloqueado (blocklist implicita)
- `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<link>`, `<meta>`, `<base>`, `<applet>`, `<svg>` (no usado), `<math>` (no usado)
- Todos los atributos `on*` (onclick, onerror, onload, etc.)
- `javascript:`, `vbscript:`, `file:` URLs (enforcement de protocolo de defaultSchema)
- `style=` inline (no en allowlist)

## Testing

### Typecheck
`npx tsc --noEmit` → pasa sin errores en archivos tocados.

### Build
`npx next build` tiene un error PRE-EXISTENTE en `src/app/api/learning/check-completion/route.ts` (referencia a `saveRoleBadge` que no existe) — verificado con `git stash` que existe en baseline (con otro type error relacionado, `mustChangeCode`). No esta relacionado con este fix.

### Payloads de prueba (comportamiento esperado)

| Payload | Resultado |
|---|---|
| `<script>alert(1)</script>` | Tag completo strippeado |
| `<img src=x onerror=alert(1)>` | `onerror` strippeado, queda `<img src=x>` (roto pero inofensivo) |
| `<img src=x oNerror =alert(1)>` | `oNerror` strippeado (sanitize es AST-based, no regex) |
| `<a href="javascript:alert(1)">x</a>` | href removido por enforce de protocolo |
| `<a href="&#106;avascript:alert(1)">x</a>` | entity decoded por parser → mismo resultado, href removido |
| `<iframe src="evil.com">` | Tag entero strippeado (no en allowlist) |
| `<svg onload=alert(1)>` | Tag entero strippeado (svg no en allowlist) |
| `<div onclick=alert(1) className="neo-stat">x</div>` | `onclick` strippeado, `className` y contenido preservados |
| `<div className="neo-stat-grid"><div className="neo-stat">...</div></div>` | preservado intacto (caso legitimo) |

### CSP verificada (tras `next start` en prod)
```
curl -I http://localhost:3000
# HTTP/1.1 200 OK
# Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://flagcdn.com; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: camera=(), microphone=(), geolocation=()
# Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Checklist manual (ejecutar cuando esten corregidos los errores pre-existentes de build)
- [ ] Abrir `encyclopedia/abc.md` — divs neo-* renderizan
- [ ] Abrir `encyclopedia/formacion-precio.md` — pyramid/compare visibles
- [ ] Abrir `support/playbook.md` — timelines/stat-grid OK
- [ ] Callouts `[!INFO]`, `[!WARNING]`, `[!DANGER]`, etc. con colores/iconos
- [ ] Tablas GFM con zebra/hover
- [ ] Code blocks con boton copy
- [ ] Language switcher: banderas de flagcdn.com cargan (CSP permite)

## Dependencia agregada
- `rehype-sanitize@6.0.0` (~5KB gzipped, mantenido por unified.js, fundacion del stack de remark/rehype). Sin dependencias transitivas pesadas — solo HAST utilities.

## Trade-offs

1. **`'unsafe-inline'` en script-src y style-src sigue presente.** Next.js 14 App Router inlinea el hydration script y estado en cada pagina; Tailwind inyecta styles via `<style>` tags generados. Eliminar esto requiere migrar a nonce-based CSP (posible con Next.js middleware pero requiere refactor completo del rendering pipeline). Fuera de scope de este fix. Mitigacion: `script-src 'self'` evita scripts de terceros aunque permita inlines del mismo origen.

2. **Schema no permite `<svg>` inline en markdown.** Los SVGs del renderer vienen de un componente React (`<Icon>`) que no pasa por rehype-sanitize — se insertan via `components` map de react-markdown, bypass directo del sanitize. Esto es correcto: los SVGs hardcodeados en el componente son confiables, solo se sanitizan strings que vienen de markdown.

3. **`input[type=checkbox]` permitido para GFM task lists.** El `li` customizado strippea el checkbox y lo re-renderiza como span. Aun si remark-gfm generara un checkbox raro, el sanitize solo permite `type`, `checked`, `disabled` — no eventos ni src.

4. **`data:` queda en img-src.** Necesario para imgs base64 legitimas (avatars, graficos embebidos). Defensa: el parser SVG de rehype igualmente descarta SVGs (tag no en allowlist), asi que `data:image/svg+xml;base64,...` no puede inyectarse como tag.

5. **CSP reporta en modo enforcement sin `report-uri`.** Las violaciones no se loguean — si algo legitimo se rompe en prod no hay telemetria. Considerar agregar `report-uri` a un endpoint interno en un fix futuro si se quiere monitoreo.

## Files modificados
- `src/components/MarkdownRenderer.tsx`
- `next.config.mjs`
- `package.json` / `package-lock.json` (rehype-sanitize@^6.0.0 agregado)
