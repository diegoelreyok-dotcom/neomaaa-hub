# UX Polish — Portal NEOMAAA Hub

Fecha: 2026-04-13
Stack revisado: Next.js 14 App Router + Tailwind + TypeScript. Tema NEOMAAA (#98283A burgundy, dark #0A0A0A).

Build + typecheck post-fixes: **PASS** (`npx tsc --noEmit` OK, `next build` OK).

---

## Findings aplicados (fixed)

### Global — paginas de sistema faltantes

- `src/app/not-found.tsx` (NUEVO) — 404 con branding NEOMAAA (logo, gradiente burgundy, CTAs a /dashboard y /login, background grid + glow).
- `src/app/error.tsx` (NUEVO) — error boundary global con boton de reset + link a dashboard, logging a console.error.

Antes: 404 fallback era la pagina default de Next (fondo blanco, rompe dark theme).
Despues: experiencia consistente con el resto del portal.

### Accessibility

- `Sidebar.tsx:72` — close button `p-1` (28px tap) → `p-2.5 -mr-1.5` (40px). Cumple mejor Apple HIG 44px.
- `TopBar.tsx:28-38` — hamburger `p-1.5` (32px) → `p-2.5 -ml-1` (40px). `aria-label` localizado ES/RU.
- `SearchBar.tsx:232` — mobile trigger `p-1.5` (30px) → `p-2.5` (40px).
- `TopBar.tsx` language switcher — `aria-pressed` dinamico por lang, `role="group"` con label, flag imgs con `alt=""` (decorativas, ya hay label textual).
- `login/page.tsx` language buttons — `aria-label` + `aria-pressed`, flag imgs decorativas.
- `register/page.tsx` language buttons — `aria-pressed` en ambos botones, flag imgs decorativas.
- `change-code/page.tsx` language buttons — agregado `aria-label` + `aria-pressed` (antes sin etiqueta accesible porque solo decian "ES"/"RU").
- `login/page.tsx` error box — `role="alert"` + `aria-live="polite"`.
- `change-code/page.tsx` error box — `role="alert"` + `aria-live="polite"`.
- `register/page.tsx` error box — `role="alert"` + `aria-live="polite"`.
- `PdfDownloadButton.tsx` — flags dentro de botones con label visible → `alt=""` decorativo (evita doble lectura por screen reader).

### Navegacion (client-side routing)

- `login/page.tsx` — cambio `<a href="/register">` por `<Link>` (evita full page reload, mantiene estado JS).
- `register/page.tsx` (2 sitios) — `<a href="/login">` → `<Link>`.

### Mobile responsive

- `PortalShell.tsx:92` — footer mobile: `flex items-center justify-between` se comprimia en pantallas <400px. Cambiado a `flex-col sm:flex-row` con `text-center sm:text-left`.

---

## Findings flagged (requieren decision — no aplicados)

### Major rework — baja prioridad pero vale la pena

1. **TopBar mobile: demasiados elementos simultaneos**
   - Hamburger + search icon + lang switch (2 botones) + admin link + user avatar + logout = 7 elementos en <400px.
   - Avatar se ve pero el nombre se oculta. Si el usuario es admin, el icono admin + shield+ logout compiten por espacio.
   - **Opciones:**
     a. Agrupar user avatar + logout en un menu dropdown (drawer o popover) — reduce a 5 items visibles.
     b. Mover language switch al Sidebar (como hubo en Docsify) y dejar TopBar limpia.
     c. En mobile muy chico (<380), colapsar lang switch a un solo boton toggle.
   - **Recomendacion:** (b). Lang switch es accion poco frecuente; va bien al sidebar junto al nombre del usuario.

2. **Dashboard: stats cards solo tienen 2 KPIs — desperdicio de espacio**
   - Hay espacio para mostrar "Certificados obtenidos" y "% de ruta completada" como KPIs adicionales.
   - Actualmente esos datos viven en LearningPathCard + DashboardProgress (cards separadas mas abajo).
   - **Opciones:**
     a. Promover a 4 stats cards arriba (secciones / docs / certificados / %path).
     b. Dejar como esta (actual es limpio pero infra-aprovechado).
   - **Recomendacion:** (a) — mas dashboard-like, valida esfuerzo del usuario a primera vista.

3. **Loading skeletons ausentes en learning + certificates**
   - `DashboardProgress` tiene skeleton. `LearningPathView` no (muestra datos iniciales via SSR, OK).
   - `CertificatesList` server-renderiza todo — OK pero si la query es lenta el usuario ve blank.
   - **Flag:** agregar `loading.tsx` en `/(portal)/certificates` y `/(portal)/learning` para UX de carga consistente con Next.js conventions.

4. **MarkdownRenderer — hydration sensitivity**
   - `code` component detecta `inline` por presencia de `language-*` className o `\n`. Algunos edge cases (code multiline sin language fence) puede fallar.
   - No vi errores activos pero es un punto fragil. Flag para monitorear en produccion.

5. **Quiz Modal (1360 LOC)** — componente monolitico
   - Debe mobile-test: `max-h-[92vh]` + scroll interno OK, pero en pantallas pequenas el modal de confirmar-leave puede quedar obstruido.
   - No revise linea por linea; build pasa. Flag: merece un mobile smoke test real.

6. **PDF download en Safari**
   - `PdfDownloadButton` usa `window.open(url, '_blank')`. En Safari iOS, `_blank` a veces queda bloqueado por pop-up blocker si no es click directo.
   - El handler esta en `onClick` de un `<button>` → deberia estar OK. Flag: test real en iPhone.

### Dependencias / librerias

- **Iconos:** Hoy todos los iconos son SVG inline custom. Consistente pero verboso. Si se agregan muchos mas, considerar `lucide-react` (ya es mencionada en prompt — NO esta instalada). Decision: quedarse con inline hasta que haya razon clara para agregar dependencia.
- **html2pdf.js 0.14.0** — dep activa. En Safari desktop funciona; en Safari iOS puede fallar generacion de canvas. Alternativa: `react-pdf` o servidor-side con Puppeteer para PDFs robustos. No urgente.

---

## Bug fixes

Ninguno critico detectado en esta pasada. Build limpio.

---

## Componentes mas afectados (top 5)

1. **`src/components/TopBar.tsx`** — 4 cambios (tap target, aria-labels, aria-pressed, role group)
2. **`src/app/register/page.tsx`** — 5 cambios (Link x2, aria-pressed, role=alert, decorative flags)
3. **`src/app/login/page.tsx`** — 4 cambios (Link, aria-label/pressed, role=alert, decorative flags)
4. **`src/app/change-code/page.tsx`** — 3 cambios (aria-label/pressed, role=alert)
5. **`src/components/Sidebar.tsx`** + **`src/components/SearchBar.tsx`** — 1 cambio c/u (tap targets)

Nuevos archivos:
- `src/app/not-found.tsx`
- `src/app/error.tsx`

---

## Score de UX estimado

| Dimension | Antes | Despues |
|-----------|-------|---------|
| Visual consistency | 8/10 | 8/10 (ya estaba bien) |
| Mobile responsive | 6/10 | 7/10 (tap targets + footer) |
| Accessibility | 5/10 | 8/10 (aria-labels, aria-pressed, role=alert, tap targets) |
| Error states | 5/10 | 8/10 (error.tsx global + not-found.tsx branded) |
| Empty states | 7/10 | 7/10 (ya habia en certificates, no se tocaron) |
| Loading states | 6/10 | 6/10 (flag para certs/learning loading.tsx) |
| Keyboard nav | 7/10 | 7/10 (ya soportaba ESC/Enter/ArrowUp/Down) |
| **Total** | **~6.3/10** | **~7.3/10** |

Ganancia incremental, sin rework mayor. Los flagged items (TopBar mobile cleanup, dashboard KPIs expandidos) dan el siguiente salto.

---

## Archivos modificados

Total: 8 modificados + 2 creados.

```
modified:   src/app/(portal)/PortalShell.tsx
modified:   src/app/change-code/page.tsx
modified:   src/app/login/page.tsx
modified:   src/app/register/page.tsx
modified:   src/components/PdfDownloadButton.tsx
modified:   src/components/SearchBar.tsx
modified:   src/components/Sidebar.tsx
modified:   src/components/TopBar.tsx
new file:   src/app/error.tsx
new file:   src/app/not-found.tsx
```

## Verificacion

- `npx tsc --noEmit` → PASS (sin errores)
- `npx next build` → PASS (build completa, todas las rutas, first-load JS stable en 87-213 kB)
