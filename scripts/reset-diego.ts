import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { seedDefaultData, getUser, regenerateCode, createUser } from '../src/lib/db';

async function main() {
  console.log('Seeding default data (idempotent)...');
  await seedDefaultData();

  const existing = await getUser('diego');
  if (!existing) {
    console.log('Diego did not exist, creating...');
    await createUser(
      { id: 'diego', name: 'Diego', roleId: 'admin', lang: 'es', isActive: true },
      '123456'
    );
    console.log('Diego created with code 123456');
    return;
  }

  console.log('Diego exists, regenerating code to 443396...');
  const newCode = await regenerateCode('diego', '443396');
  console.log('Result:', newCode);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
