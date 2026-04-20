import { readFileSync } from 'fs';
import { resolve } from 'path';
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}
import { regenerateCode, updateUser, validateLogin } from '../src/lib/db';
import { kv } from '@vercel/kv';
(async () => {
  for (const id of ['yulia', 'stanislav', 'susana']) {
    await regenerateCode(id, '000000');
    await updateUser(id, { mustChangeCode: true } as any);
    await kv.del(`ratelimit:login:${id}`);
    const v = await validateLogin(id, '000000');
    console.log(`${id}: reset to 000000 + mustChangeCode=true, validates=${!!v}`);
  }
})();
