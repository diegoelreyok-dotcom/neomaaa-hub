/**
 * Shared auth helper for /api/kb/* routes.
 *
 * Validates the X-API-Key header, enforces rate limit, records last-used.
 * Middleware exempts /api/kb so this is the ONLY gate.
 */

import { validateApiKey, checkRateLimit, recordApiKeyUse, type ApiKey } from './api-keys';

export type KbAuthResult =
  | { valid: true; key: ApiKey }
  | { valid: false; status: number; error: string };

export async function validateKbRequest(req: Request): Promise<KbAuthResult> {
  const header = req.headers.get('x-api-key') || req.headers.get('X-API-Key');
  if (!header) {
    return { valid: false, status: 401, error: 'Missing X-API-Key header' };
  }

  const key = await validateApiKey(header.trim());
  if (!key) {
    return { valid: false, status: 401, error: 'Invalid or disabled API key' };
  }

  const rl = await checkRateLimit(key.id);
  if (!rl.allowed) {
    return {
      valid: false,
      status: 429,
      error: `Rate limit exceeded (${rl.limit}/hour). Try again next hour.`,
    };
  }

  // Fire-and-forget; don't block response on this
  recordApiKeyUse(key.id).catch(() => {});

  return { valid: true, key };
}
