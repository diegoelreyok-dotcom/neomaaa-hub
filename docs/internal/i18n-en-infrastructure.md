# Infrastructura i18n EN — 2026-04-17

Tercer idioma `en` agregado al portal. Decision de Diego: EN solo afecta el sitio
(strings UI + contenido cuando exista). PDFs siguen solo ES + RU (no se genera EN).
Esta pasada cubre la INFRAESTRUCTURA; la traduccion masiva del markdown viene
despues con agentes dedicados.

## Cambios aplicados

### Types

- `src/lib/types.ts` — `Lang = 'es' | 'ru' | 'en'`.
- `Section` ahora tiene `nameEn?: string`.
- `DocMeta` ahora tiene `titleEn?: string`.
- `Role` tiene `nameEn?: string` (opcional, sin rollout todavia).

### sections.ts

Todas las secciones y documentos (80 entries) tienen `nameEn` / `titleEn`
rellenados como traducciones tentativas en ingles, marcadas con
`// TODO: EN translation`. La mayoria son traducciones literales razonables
pero requieren polish humano antes del launch final.

Helpers agregados:
- `getSectionName(section, lang)` con fallback a ES cuando falta EN.
- `getDocTitle(doc, lang)` con fallback a ES cuando falta EN.

### UI components — EN agregado

- `src/components/Sidebar.tsx` — tercer boton bandera EN en el switcher; labels
  "Home / My Path / My Certificates / Documentation" con fallback a ES.
- `src/components/TopBar.tsx` — labels EN para menu/logout.
- `src/components/SearchBar.tsx` — entry `en` en el objeto `L`, scoring soporta EN
  con fallback a titleEs cuando no hay titleEn, y **fallback a indice ES** si no
  hay entradas EN en el search-index (evita que EN user vea "0 results").
- `src/components/PdfDownloadButton.tsx` — labels EN; banner menciona "ES / RU only".
- `src/components/admin/AdminShell.tsx` — `L.en` nav labels.
- `src/components/admin/fetcher.ts` — `AdminUser.lang` y `AdminRegistration.lang`
  ampliados a `'es' | 'ru' | 'en'`.

### Páginas portal

- `src/app/login/page.tsx` — entry `labels.en` + tercer boton bandera EN.
- `src/app/register/page.tsx` — state `lang` acepta `'en'`, bloque `T` con las 3
  traducciones, tercer boton bandera. Registrations con lang=en se guardan en KV.
- `src/app/change-code/page.tsx` — entry EN en `t`, tercer boton EN.
- `src/app/(portal)/content/[section]/[slug]/page.tsx` — breadcrumbs, headings,
  previous/next, reading time y todos los error states manejan EN.
- `src/app/(portal)/content/[section]/[slug]/TableOfContents.tsx` — label EN.
- `src/app/(portal)/content/[section]/[slug]/CompletionButton.tsx` — entry `en`
  en `i18n`. **Importante:** quiz pools solo existen en ES/RU, asi que para
  usuarios EN el componente fuerza `quizLang = 'es'` al llamar a `/api/quiz/available`
  y al pasar `language` a QuizModal.
- `src/app/(portal)/PortalShell.tsx` — footer label EN.
- `src/app/(portal)/dashboard/LearningPathCard.tsx` — labels EN.
- `src/app/(portal)/learning/LearningPathView.tsx` — labels EN.
- `src/app/(portal)/certificates/CertificatesList.tsx` — entry EN.
- `src/app/(portal)/certificates/[id]/CertificateView.tsx` — entry EN.

### Admin panel

- `src/app/(admin)/layout.tsx` — `lang` se resuelve a `'en'` cuando user.lang === 'en'.
- `src/app/(admin)/admin/page.tsx` (dashboard) — `labels.en`.
- `src/app/(admin)/admin/users/page.tsx` — `labels.en`, state acepta `'en'`,
  modal de crear usuario tiene 3er boton EN.
- `src/app/(admin)/admin/roles/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/roles/[id]/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/registrations/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/progress/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/settings/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/api-keys/page.tsx` — `labels.en`.
- `src/app/(admin)/admin/certificates/page.tsx` — `t.en`.

### Backend APIs

- `src/app/api/users/lang/route.ts` — valida `en` como idioma valido.
- `src/app/api/users/route.ts` — POST acepta `en`, PATCH lo valida tambien.
- `src/app/api/register/route.ts` — `PendingRegistration.lang` acepta `en`;
  submit lo persiste.
- `src/app/api/kb/doc/route.ts` — acepta `lang=en`, fallback a ES cuando no hay
  archivo EN, devuelve `titleEn` tambien.
- `src/app/api/kb/list/route.ts` — acepta `lang=en`.
- `src/app/api/kb/search/route.ts` — acepta `lang=en`, incluye `titleEn` en los
  resultados.
- `src/app/api/search/index/route.ts` — sin cambios directos; sirve el indice
  que ahora puede tener entries `en` (cuando se indexen).

### Libs

- `src/lib/auth.ts` — `HardcodedAdmin.lang` ampliado a `'es' | 'ru' | 'en'`.
- `src/lib/db.ts` — seed users `lang` tipado a `'es' | 'ru' | 'en'`.
- `src/lib/i18n.ts` — objeto `strings.en` con traducciones de todos los keys.
- `src/lib/kb-search.ts` — `SearchEntry` soporta `language: 'en'` + `titleEn?`;
  `scoreEntry` / `search` usan titleEn con fallback a titleEs, y si no hay EN
  indexado todavia buscan sobre ES para que el user EN vea resultados.
- `src/lib/content.ts` — `getMarkdownContent` cuando lang='en' y falta archivo,
  lee ES y PREPEND un callout `> [!INFO] English translation coming soon. Showing Spanish version.`
  para que el user EN sepa que es fallback.

### Flags + content

- `public/flags/en.svg` — bandera UK (Union Jack) inline como los otros.
- `src/content/en/README.md` — directorio EN creado vacio con nota del fallback.

### Scripts

- `scripts/i18n-coverage.ts` — reporte de cobertura ES → EN. Corre con
  `npx tsx scripts/i18n-coverage.ts`. Primera pasada da 0/80 (esperado).

## TODO para la siguiente fase (traduccion masiva)

- **nameEn / titleEn en sections.ts**: todos son traducciones literales
  tentativas con `// TODO: EN translation`. Necesitan pasada humana para
  naming consistente y profesional.
- **UI strings EN**: entregados en ingles basico "developer-grade".
  Un pase de polish por alguien con ingles nativo los va a mejorar.
- **Content markdown**: 82 docs ES, 0 EN — traduccion masiva pendiente con
  agentes. Mientras tanto el user EN ve ES con banner.
- **Quizzes EN**: los JSONs de quiz estan solo en ES; forzamos `quizLang='es'`
  para usuarios EN. Cuando se traduzcan los quizzes, cambiar esa logica.
- **Certificate PDFs**: el componente `Certificate.tsx` tiene strings EN
  en su bloque `t` pero el certificate se emite con `cert.language` que solo
  toma valores 'es' | 'ru' (QuizLanguage). Si queremos que usuarios EN
  reciban certs en ingles hay que ampliar `QuizLanguage` y el flow de quiz,
  pero con quizzes solo en ES/RU no tiene sentido hoy.

## Test manual post-deploy

- [ ] Login en EN muestra UI en ingles.
- [ ] Cambiar lang en dashboard → reload muestra UI EN.
- [ ] Doc sin traduccion EN → muestra ES con banner "English translation coming soon".
- [ ] Sidebar muestra tercer boton con bandera UK, click persiste en DB.
- [ ] Register form permite elegir EN, approved user loggea y ve UI EN.
- [ ] `/api/users/lang { lang: 'en' }` responde 200.
- [ ] `/api/users/lang { lang: 'invalid' }` responde 400.
- [ ] PDF download: usuario EN abre modal, ve opciones ES + RU (no EN).
- [ ] Search con EN user devuelve resultados (fallback a indice ES).
- [ ] Admin user create con lang=en persiste correctamente.
- [ ] PDFs: generate-pdfs.py sin tocar, sigue generando solo ES + RU.

## Verificaciones ejecutadas

- `npx tsc --noEmit` → pasa sin errores.
- `npx next build` → pasa; todas las paginas compilan (login, register, change-code
  estaticas; portal/admin dinamicas).
- `npx tsx scripts/i18n-coverage.ts` → coverage 0/80, lista 80 docs ES faltantes
  en EN.
