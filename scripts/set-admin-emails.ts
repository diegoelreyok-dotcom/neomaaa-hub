import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { getUser, updateUser } from '../src/lib/db';

const EMAIL_MAP: Record<string, string> = {
  diego: 'dl@neomaaa.com',
  susana: 'sg@neomaaa.com',
  yulia: 'ys@neomaaa.com',
  stanislav: 'sk@neomaaa.com',
};

async function main() {
  for (const [userId, email] of Object.entries(EMAIL_MAP)) {
    const user = await getUser(userId);
    if (!user) {
      console.log(`❌ ${userId}: NO existe`);
      continue;
    }
    const updated = await updateUser(userId, { email } as any);
    console.log(`✅ ${userId}: email = ${updated?.email}`);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
