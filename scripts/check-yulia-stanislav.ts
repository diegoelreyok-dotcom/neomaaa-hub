import { readFileSync } from 'fs';
import { resolve } from 'path';
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}
import { getUser, validateLogin } from '../src/lib/db';
(async () => {
  for (const id of ['yulia', 'stanislav', 'susana']) {
    const u = await getUser(id);
    if (!u) { console.log(`${id}: NOT FOUND`); continue; }
    const valid = await validateLogin(id, '000000');
    console.log(`${id}: exists | email=${u.email || 'NO EMAIL'} | isActive=${u.isActive} | mustChangeCode=${u.mustChangeCode} | code 000000 works=${!!valid}`);
  }
})();
