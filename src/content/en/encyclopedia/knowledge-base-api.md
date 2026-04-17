# Knowledge Base API

Internal API to query all NEOMAAA portal content from external agents (Claude MCP, scripts, integrations).

> [!INFO]
> This API is read-only. It exposes the same documents you see while browsing the portal, but in machine-consumable JSON format.

---

## What it is

The **KB API** (Knowledge Base API) exposes three endpoints under `/api/kb/*` that let an AI agent or external script:

- **Search** across the entire knowledge base by keyword (`/api/kb/search`)
- **Download** the full markdown of a document (`/api/kb/doc`)
- **List** all available documents with metadata (`/api/kb/list`)

It is designed for:

- Claude MCP integrations that need broker context
- Agents that answer internal team questions
- Automation scripts that process documentation
- External tools (Zapier, N8N) that need to query policies

---

## How to generate an API Key

1. Log into the portal as an administrator.
2. Go to **Admin → API Keys** (left sidebar).
3. Click **"Create API Key"** and give it a descriptive name (e.g. *"Claude MCP Personal"*).
4. Copy the key immediately — **it is shown only once**.
5. Store it in a secrets manager (1Password, .env, etc).

Format: `neo_live_<32 hex chars>`

> [!WARNING]
> If you lose the key, delete it from the panel and generate a new one. Never share it over chat or leave it in public repos.

---

## Authentication

All endpoints require the `X-API-Key` header:

```bash
curl -H "X-API-Key: neo_live_abc123..." https://portal.neomaaa.com/api/kb/list
```

| Code | Meaning |
|--------|-------------|
| 200 | OK |
| 400 | Missing required parameter |
| 401 | Invalid or disabled API Key |
| 404 | Document not found (only `/doc`) |
| 429 | Rate limit exceeded |

---

## Rate limits and anti-scraping

Cumulative limits per key (the first one to be exceeded triggers the block):

| Limit | Value | Consequence |
|--------|-------|--------------|
| Requests per hour | **100** | 429 + key disabled for 24h |
| Requests per day | **200** | 429 + key disabled for 24h |
| Unique paths in `/api/kb/doc` per hour | **50** | 429 + key disabled for 24h (scraping pattern) |

If your key is temporarily disabled, the admin panel shows the reason (`scrape_pattern`, `hourly_limit_exceeded`, `daily_limit_exceeded`). After 24h the flag clears automatically. If you need immediate reactivation, ask an admin to regenerate the key.

**Watermarking:** all responses from `/api/kb/doc` and `/api/kb/list` include the header `X-KB-Key-Id: {last 6 of the id}`. If you leak KB content, we can trace back which key the dump came from.

Hourly/daily counters reset at the end of each UTC window.

---

## Endpoints

### GET `/api/kb/search`

Searches the title + body of all documents. Scoring: title (×10) + body occurrences (×1).

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `q` | string | — | Search query (required) |
| `limit` | number | 5 | Max results (cap 50) |
| `lang` | `es` \| `ru` | `es` | Language to search |

**Example:**

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

Returns the full markdown of a specific document.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | string | — | `{section}/{slug}` (required) |
| `lang` | `es` \| `ru` | `es` | Language |

**Example:**

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

If the requested language (`ru`) does not exist, it falls back to Spanish automatically.

---

### GET `/api/kb/list`

Lists all indexed documents (no body, metadata only).

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `lang` | `es` \| `ru` | `es` | Language |

**Example:**

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
> `/api/kb/list` returns ONLY `docPath`, `section`, `slug` and `language` — no titles, no previews, no URLs. To get titles and snippets, use `/api/kb/search`. This restriction reduces the endpoint's usefulness for mass scraping without breaking legitimate use cases (an agent discovers what's available and then searches for what's relevant).

Useful so an agent can explore what's available before doing specific searches.

---

## Example: Claude (Python SDK)

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

full = kb_doc("compliance/ab-book-policy")
print(full["content"][:500])
```

---

## Example: Node.js

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

## Example: Claude Desktop MCP

Recommended pattern for an MCP tool that exposes internal search to Claude:

```typescript
server.tool(
  "neomaaa_kb_search",
  "Search the internal NEOMAAA Broker knowledge base",
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

## Best practices

- **Don't share keys.** Each integration should have its own key with a descriptive name so you can revoke it without affecting others.
- **Use it from the server, not the browser.** The key should stay server-side — never expose it in public JS.
- **Monitor usage.** The admin panel shows "last used" to detect abandoned or compromised keys.
- **Revoke fast.** If you suspect a key has been leaked, disable it instantly from the admin — takes <1 second.

---

## FAQ

**Can I write to the KB via API?**
No. The API is read-only by design. Editing docs requires a PR against the repo.

**Does the API index changes automatically?**
The index is rebuilt on every deploy (`npm run build:search` runs before `next build`). Markdown changes are available after the production deploy.

**Does it respect role permissions?**
No — API Keys are global (full access to the whole KB). If you need role-based permissions, use the portal search with the user's session.

**What happens if a key goes unused for months?**
Nothing automatically, but you should disable it. Review the admin panel once a month and revoke abandoned keys.
