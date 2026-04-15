import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { getRole, updateRole } from '../src/lib/db';

async function main() {
  for (const roleId of ['admin', 'principal']) {
    const role = await getRole(roleId);
    if (!role) {
      console.log(`Role ${roleId} not found, skipping`);
      continue;
    }
    if (role.sections.includes('executive')) {
      console.log(`Role ${roleId} already has executive access`);
      continue;
    }
    const updated = await updateRole(roleId, {
      sections: [...role.sections, 'executive'],
    });
    console.log(`Updated role ${roleId} with executive access:`, updated?.sections);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
