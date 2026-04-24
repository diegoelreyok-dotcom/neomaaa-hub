# Knowledge Base API

API interna para consultar todo el contenido del portal NEOMAAA desde agentes externos (Claude MCP, scripts, integraciones).

> [!INFO]
> Esta API es de solo lectura. Expone los mismos documentos que ves navegando el portal, pero en formato JSON consumible por máquinas.

---

## Qué es

La **KB API** (Knowledge Base API) expone tres endpoints bajo `/api/kb/*` que permiten a un agente AI o script externo:

- **Buscar** en toda la base de conocimiento por keyword (`/api/kb/search`)
- **Descargar** el markdown completo de un documento (`/api/kb/doc`)
- **Listar** todos los documentos disponibles con metadata (`/api/kb/list`)

Está pensada para:

- Integraciones con Claude MCP que necesiten contexto del broker
- Agentes que respondan preguntas internas del equipo
- Scripts de automatización que procesen documentación
- Herramientas externas (Zapier, N8N) que necesiten consultar políticas

---

## Cómo generar una API Key

1. Entra al portal como administrador.
2. Ve a **Admin → API Keys** (sidebar izquierdo).
3. Click en **"Crear API Key"**, dale un nombre descriptivo (ej: *"Claude MCP Personal"*).
4. Copia la clave al instante — **solo se muestra una vez**.
5. Guárdala en un gestor de secretos (1Password, .env, etc).

Formato: `neo_live_<32 hex chars>`

> [!WARNING]
> Si pierdes la clave, elimínala del panel y genera una nueva. Nunca la compartas por chat ni la dejes en repos públicos.

---

## Autenticación

Todos los endpoints requieren el header `X-API-Key`:

```bash
curl -H "X-API-Key: neo_live_abc123..." https://portal.neomaaa.com/api/kb/list
```

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 400 | Falta parámetro obligatorio |
| 401 | API Key inválida o deshabilitada |
| 404 | Documento no encontrado (solo `/doc`) |
| 429 | Rate limit excedido |

---

## Rate limits y anti-scraping

Límites acumulativos por clave (el primero que se exceda dispara el bloqueo):

| Límite | Valor | Consecuencia |
|--------|-------|--------------|
| Requests por hora | **100** | 429 + clave deshabilitada 24h |
| Requests por día | **200** | 429 + clave deshabilitada 24h |
| Paths únicos en `/api/kb/doc` por hora | **50** | 429 + clave deshabilitada 24h (patrón de scraping) |

Si tu clave queda temporalmente deshabilitada, verás en el admin el motivo (`scrape_pattern`, `hourly_limit_exceeded`, `daily_limit_exceeded`). Después de 24h el flag se limpia automáticamente. Si necesitás reactivación inmediata, pedile a un admin que regenere la clave.

**Watermarking:** todas las respuestas de `/api/kb/doc` y `/api/kb/list` incluyen el header `X-KB-Key-Id: {últimos 6 del id}`. Si filtrás el contenido de la KB, podemos rastrear desde qué clave salió el dump.

Los contadores horarios/diarios se resetean al final de cada ventana UTC.

---

## Endpoints

### GET `/api/kb/search`

Busca en el título + cuerpo de todos los documentos. Scoring: título (×10) + ocurrencias en el body (×1).

**Query params:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `q` | string | — | Query de búsqueda (requerido) |
| `limit` | number | 5 | Máximo de resultados (cap 50) |
| `lang` | `es` \| `ru` | `es` | Idioma a buscar |

**Ejemplo:**

```bash
curl -H "X-API-Key: $NEO_KEY" \
  "https://portal.neomaaa.com/api/kb/search?q=kyc&limit=3&lang=es"
```

**Response:**

```json
{
  "query": "kyc",
  "lang": "es",
  "results": [
    {
      "docPath": "compliance/proceso-kyc-sumsub",
      "section": "compliance",
      "titleEs": "Proceso KYC Completo con Sumsub",
      "titleRu": "Полный процесс KYC с Sumsub",
      "url": "https://portal.neomaaa.com/content/compliance/proceso-kyc-sumsub",
      "relevance": 127,
      "snippet": "…proceso KYC de NEOMAAA se hace con Sumsub. Niveles…"
    }
  ],
  "total": 1,
  "tookMs": 4
}
```

---

### GET `/api/kb/doc`

Devuelve el markdown completo de un documento específico.

**Query params:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `path` | string | — | `{section}/{slug}` (requerido) |
| `lang` | `es` \| `ru` | `es` | Idioma |

**Ejemplo:**

```bash
curl -H "X-API-Key: $NEO_KEY" \
  "https://portal.neomaaa.com/api/kb/doc?path=compliance/proceso-kyc-sumsub"
```

**Response:**

```json
{
  "docPath": "compliance/proceso-kyc-sumsub",
  "section": "compliance",
  "slug": "proceso-kyc-sumsub",
  "titleEs": "Proceso KYC Completo con Sumsub",
  "titleRu": "Полный процесс KYC с Sumsub",
  "language": "es",
  "content": "# Proceso KYC Completo con Sumsub\n\n...",
  "wordCount": 2840
}
```

Si el idioma solicitado (`ru`) no existe, cae al español automáticamente.

---

### GET `/api/kb/list`

Lista todos los documentos indexados (sin body, solo metadata).

**Query params:**

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `lang` | `es` \| `ru` | `es` | Idioma |

**Ejemplo:**

```bash
curl -H "X-API-Key: $NEO_KEY" https://portal.neomaaa.com/api/kb/list
```

**Response:**

```json
{
  "total": 64,
  "docs": [
    {
      "docPath": "encyclopedia/abc",
      "section": "encyclopedia",
      "slug": "abc",
      "language": "es"
    }
  ]
}
```

> [!INFO]
> `/api/kb/list` devuelve SOLO `docPath`, `section`, `slug` y `language` — sin títulos, sin previews, sin URLs. Para obtener títulos y snippets, usá `/api/kb/search`. Esta restricción reduce la utilidad del endpoint para scraping masivo sin dañar los casos de uso legítimos (un agente descubre qué hay y después busca lo relevante).

Útil para que un agente explore qué hay disponible antes de hacer búsquedas específicas.

---

## Ejemplo: Claude (Python SDK)

```python
import os, httpx

KEY = os.environ["NEOMAAA_KB_KEY"]
BASE = "https://portal.neomaaa.com/api/kb"

def kb_search(q: str, limit: int = 5):
    r = httpx.get(
        f"{BASE}/search",
        headers={"X-API-Key": KEY},
        params={"q": q, "limit": limit},
    )
    r.raise_for_status()
    return r.json()

def kb_doc(path: str):
    r = httpx.get(
        f"{BASE}/doc",
        headers={"X-API-Key": KEY},
        params={"path": path},
    )
    r.raise_for_status()
    return r.json()

# Usage
hits = kb_search("política A-Book")
for h in hits["results"]:
    print(h["titleEs"], h["url"])

full = kb_doc("executive/ab-book-policy")
print(full["content"][:500])
```

---

## Ejemplo: Node.js

```javascript
const KEY = process.env.NEOMAAA_KB_KEY;
const BASE = "https://portal.neomaaa.com/api/kb";

async function kbSearch(q, limit = 5) {
  const url = new URL(`${BASE}/search`);
  url.searchParams.set("q", q);
  url.searchParams.set("limit", String(limit));
  const res = await fetch(url, { headers: { "X-API-Key": KEY } });
  if (!res.ok) throw new Error(`KB ${res.status}`);
  return res.json();
}

const hits = await kbSearch("comisiones IB");
console.log(hits.results);
```

---

## Ejemplo: Claude Desktop MCP

Patrón recomendado para un MCP tool que expone búsqueda interna a Claude:

```typescript
server.tool(
  "neomaaa_kb_search",
  "Busca en la base de conocimiento interna de NEOMAAA Broker",
  { q: z.string(), limit: z.number().optional() },
  async ({ q, limit = 5 }) => {
    const r = await fetch(
      `https://portal.neomaaa.com/api/kb/search?q=${encodeURIComponent(q)}&limit=${limit}`,
      { headers: { "X-API-Key": process.env.NEO_KEY! } },
    );
    return { content: [{ type: "text", text: JSON.stringify(await r.json()) }] };
  },
);
```

---

## Buenas prácticas

- **No compartas claves.** Cada integración debe tener su propia clave con nombre descriptivo para poder revocarla sin afectar otras.
- **Úsala desde servidor, no desde browser.** La clave debe quedarse del lado server — nunca la expongas en JS público.
- **Monitorea el uso.** El panel admin muestra "último uso" para detectar claves abandonadas o comprometidas.
- **Revoca rápido.** Si sospechas que una clave se filtró, deshabilítala al instante desde el admin — tarda <1 segundo.

---

## FAQ

**¿Puedo escribir en la KB vía API?**
No. La API es solo de lectura por diseño. Editar docs requiere PR contra el repo.

**¿La API indexa los cambios automáticamente?**
El índice se rebuild en cada deploy (`npm run build:search` corre antes de `next build`). Cambios en markdown están disponibles tras el deploy a producción.

**¿Respeta permisos de rol?**
No — las API Keys son globales (acceso total a toda la KB). Si necesitas permisos por rol, usa el search del portal con la sesión del usuario.

**¿Qué pasa si una clave lleva meses sin usarse?**
Nada automáticamente, pero deberías deshabilitarla. Revisa el panel admin una vez al mes y revoca claves abandonadas.
