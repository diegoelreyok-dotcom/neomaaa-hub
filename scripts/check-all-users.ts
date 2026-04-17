import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { getUser } from '../src/lib/db';

async function main() {
  const users = ['diego', 'yulia', 'stanislav', 'pepe', 'susana', 'edward', 'franco', 'luis', 'rocio', 'marilyn', 'alexa', 'alexb', 'gleb', 'dimitri'];
  for (const uid of users) {
    const u = await getUser(uid);
    if (!u) {
      console.log(`❌ ${uid}: NO EXISTE`);
      continue;
    }
    console.log(`${u.isActive ? '✅' : '⛔'} ${uid} | role=${u.roleId} | active=${u.isActive} | mustChange=${u.mustChangeCode ?? false}`);
  }
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
