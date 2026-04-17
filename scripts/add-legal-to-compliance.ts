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
  const role = await getRole('compliance');
  if (!role) {
    console.log('❌ Rol compliance no existe');
    return;
  }
  console.log(`Antes: ${role.sections.join(', ')}`);
  if (role.sections.includes('legal')) {
    console.log('✅ Ya tenía acceso a legal');
    return;
  }
  const updated = await updateRole('compliance', {
    sections: [...role.sections, 'legal'],
  });
  console.log(`Después: ${updated?.sections.join(', ')}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
